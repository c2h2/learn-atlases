Type `the mock turtle sang about soup` into a Boolean engine over the $800$ paragraphs of *Alice* and you must choose. As a conjunction the query matches nothing: `sang` occurs in only two paragraphs, neither of which mentions soup. As a disjunction it matches $654$ paragraphs — every paragraph containing `the` — in no particular order. What the user wants is neither: a short list of the paragraphs that match the query *best*, with the Mock Turtle singing "Beautiful Soup" near the top, and paragraphs that merely contain `the` nowhere at all.

**Ranked retrieval** replaces the set-valued answer of [[information-retrieval/inverted-indexes]] with a **score** for each document and returns the top $k$. This chapter develops the classical way of scoring, the **vector space model**: documents and queries are vectors of term weights, a term's weight grows with its frequency in the document (**tf**) and with its rarity in the collection (**idf**), and the score is the **cosine** of the angle between query and document. We derive tf–idf, prove the geometric facts that make cosine ranking work, and meet its main weakness, the treatment of document length. The second half is about speed: scoring every document is wasteful when only the top $10$ matter, and the **MaxScore** and **WAND** algorithms skip, provably without changing the answer, most of the documents that cannot make the top $k$. The probabilistic models of [[information-retrieval/probabilistic-retrieval]] will later replace tf–idf by BM25 but keep the query-processing machinery of this chapter unchanged.

## Term weighting

### Term frequency

A first idea is to count matches: score a document by how many query terms it contains. That ignores *how often* each term occurs. A paragraph mentioning the Mock Turtle five times is more about the Mock Turtle than one that mentions it once.

::: definition Bag of words and term frequency {#def-tf}
In the **bag-of-words** model a document is represented only by how many times each term occurs in it, ignoring order. The **term frequency** $\mathrm{tf}_{t,d}$ is the number of occurrences of term $t$ in document $d$. The **log-frequency weight** is
$$
\mathrm{wf}_{t,d} = \begin{cases} 1 + \log_{10} \mathrm{tf}_{t,d} & \text{if } \mathrm{tf}_{t,d} > 0,\\ 0 & \text{otherwise.}\end{cases}
$$ {#eq-logtf}
:::

The bag of words forgets that "the Queen sentenced the Knave" and "the Knave sentenced the Queen" mean different things, and still works remarkably well for retrieval, because what a document is *about* is mostly determined by which words it uses and how often. Positions, when needed, come from a positional index ([[information-retrieval/inverted-indexes#def-positional]]).

Why the logarithm? Relevance does not grow linearly with repetition: a paragraph with $20$ occurrences of `turtle` is more about turtles than one with $2$, but not ten times more. With [[#eq-logtf]] the weights for $\mathrm{tf} = 1, 2, 10, 100$ are $1, 1.3, 2, 3$. Each extra occurrence matters less than the previous one — a **diminishing return** that BM25 later builds in more carefully through **saturation** ([[information-retrieval/probabilistic-retrieval]]).

::: widget plot
f: x; 1 + log10(x); 2.2*x/(1.2 + x)
x: 1, 30
y: 0, 8
labels: \text{raw tf}; 1+\log_{10}\mathrm{tf}; \text{saturating } \frac{(k+1)\,\mathrm{tf}}{k+\mathrm{tf}},\ k=1.2
caption: Three ways of turning a term frequency into a weight. Raw counts let one repeated word dominate a score; the logarithm grows without bound but slowly; the saturating function used by BM25 approaches a ceiling of $k + 1 = 2.2$. Read off how much the tenth occurrence of a word adds under each.
:::

### Inverse document frequency

Raw counts also ignore how *informative* a term is. Every paragraph contains `the`, so its frequency in a paragraph says nothing about relevance; `sang` occurs in two paragraphs, and a paragraph containing it is very likely to be about singing. Karen Spärck Jones argued in 1972 that a term's value for retrieval falls as the number of documents containing it rises, and proposed weighting it by the logarithm of the inverse of that number.

::: definition Inverse document frequency {#def-idf}
For a collection of $N$ documents in which term $t$ occurs in $\mathrm{df}_t$ documents, the **inverse document frequency** of $t$ is
$$
\mathrm{idf}_t = \log_{10} \frac{N}{\mathrm{df}_t}.
$$ {#eq-idf}
:::

A term in every document has $\mathrm{idf} = 0$; a term in one document of a million has $\mathrm{idf} = 6$. In *Alice*'s $800$ paragraphs:

```text
the 643 0.095
mock 54 1.171
turtle 52 1.187
sang 2 2.602
about 84 0.979
soup 10 1.903
```

(term, document frequency, idf). The base of the logarithm only scales all weights by the same factor, so it does not affect rankings. One interpretation is informational: if a document is chosen at random, the probability that it contains $t$ is $\mathrm{df}_t / N$, so $\mathrm{idf}_t = -\log_{10} \Prob(t \in d)$ measures how surprising it is to see $t$ in a document. A more precise justification, under explicit assumptions, comes from the probabilistic model of [[information-retrieval/probabilistic-retrieval]], where an idf-like weight appears as the log-odds of a term occurring in relevant against non-relevant documents.

::: widget plot
f: log10(N/x)
sliders: N=100:100:10000
x: 1, 1000
y: 0, 4
labels: \mathrm{idf} = \log_{10}(N/\mathrm{df})
caption: Inverse document frequency against document frequency for a collection of $N$ documents. The weight falls steeply among rare terms and flattens among common ones: going from $\mathrm{df} = 1$ to $\mathrm{df} = 10$ costs a whole unit, as does going from $100$ to $1000$. Increase $N$ and every curve shifts up by $\log_{10}$ of the factor, leaving differences — and hence rankings — unchanged.
:::

::: definition tf–idf weight {#def-tfidf}
The **tf–idf weight** of term $t$ in document $d$ is
$$
w_{t,d} = \mathrm{wf}_{t,d} \cdot \mathrm{idf}_t = \bigl(1 + \log_{10} \mathrm{tf}_{t,d}\bigr) \log_{10} \frac{N}{\mathrm{df}_t} \quad (\mathrm{tf}_{t,d} > 0),
$$
and $0$ if $t$ does not occur in $d$. It is large when $t$ occurs often in $d$ and rarely in the collection.
:::

Many variants exist — raw tf instead of log tf, $\log((N - \mathrm{df}_t)/\mathrm{df}_t)$ or $\log(1 + N/\mathrm{df}_t)$ for idf, different normalisations — and the SMART system of Gerard Salton's group gave them a three-letter notation: tf component, df component, normalisation. Common letters are `n` (natural: raw tf, or no idf), `l` (logarithmic tf), `t` (idf) and `c` (cosine normalisation). A scheme is written `ddd.qqq`, document weights then query weights. The standard example `lnc.ltc` weights documents by log tf without idf, with cosine normalisation, and queries by log tf times idf, with cosine normalisation; we use it below. Leaving idf out of document weights means document vectors need not change when the collection grows and idf values drift.

## The vector space model

::: definition Vector space model {#def-vsm}
Fix the vocabulary $t_1, \dots, t_V$. A document $d$ is represented by the vector $\vec{d} = (w_{t_1,d}, \dots, w_{t_V,d}) \in \R^V$ of its term weights, and a query $q$ by a vector $\vec{q}$ computed the same way (with its own weighting scheme). The **cosine similarity** of query and document is
$$
\cos(\vec q, \vec d) = \frac{\vec q \cdot \vec d}{\norm{\vec q}\,\norm{\vec d}} = \frac{\sum_{t} q_t\, d_t}{\sqrt{\sum_t q_t^2}\,\sqrt{\sum_t d_t^2}},
$$ {#eq-cosine}
and documents are ranked by decreasing cosine similarity.
:::

The vectors live in a space with one dimension per term — millions of dimensions — but each document vector is **sparse**, with non-zero entries only for the terms the document contains, and the query vector has a handful of non-zero entries. The dot product therefore runs over the query terms only, which is exactly what the inverted index makes cheap. (Inner products, norms and angles are developed in [Maths Atlas: inner products](/learn/maths/lesson.php?c=linear-algebra&l=inner-products).)

Why the cosine rather than the dot product or the Euclidean distance? Suppose we append a document to a copy of itself. Its vector doubles, $\vec{d}' = 2\vec{d}$, though its content is the same. The dot product with any query doubles, so long documents would win merely by being long; the Euclidean distance $\norm{\vec q - \vec d'}$ changes too. The cosine depends only on direction: $\cos(\vec q, 2\vec d) = \cos(\vec q, \vec d)$.

::: proposition Cosine, normalisation and Euclidean distance {#prop-cosine}
Let $\hat u = \vec u/\norm{\vec u}$ denote the unit vector in the direction of a non-zero vector $\vec u$. Then
1. $\cos(\vec q, \vec d) = \hat q \cdot \hat d$, and $\cos(\vec q, \lambda \vec d) = \cos(\vec q, \vec d)$ for every $\lambda > 0$;
2. if all weights are non-negative, $0 \le \cos(\vec q, \vec d) \le 1$, with $\cos = 1$ exactly when $\vec d$ is a positive multiple of $\vec q$;
3. $\norm{\hat q - \hat d}^2 = 2 - 2\cos(\vec q, \vec d)$, so ranking by decreasing cosine is the same as ranking the normalised vectors by increasing Euclidean distance from $\hat q$.
:::

::: proof
(1) Dividing numerator and denominator of [[#eq-cosine]] by $\norm{\vec q}\norm{\vec d}$ gives $\hat q \cdot \hat d$; replacing $\vec d$ by $\lambda\vec d$ multiplies numerator and denominator by $\lambda$. (2) With non-negative weights every term of the dot product is non-negative, so $\cos \ge 0$; the Cauchy–Schwarz inequality $\abs{\vec q \cdot \vec d} \le \norm{\vec q}\norm{\vec d}$ gives $\cos \le 1$, with equality exactly when the vectors are parallel, and with non-negative weights and positive dot product that means $\vec d = \lambda \vec q$ with $\lambda > 0$. (3) Expanding, $\norm{\hat q - \hat d}^2 = \hat q\cdot\hat q - 2\,\hat q\cdot\hat d + \hat d\cdot\hat d = 1 - 2\cos + 1$. Since $2 - 2c$ is decreasing in $c$, larger cosine means smaller distance.
:::

Part 3 links ranked retrieval to **nearest-neighbour search**: the best documents are the normalised vectors closest to the normalised query. With sparse tf–idf vectors the inverted index computes this exactly; with dense learned vectors of a few hundred dimensions it becomes the approximate nearest-neighbour problem of [[information-retrieval/dense-retrieval]].

::: example Cosine scores by hand {#ex-cosine}
A collection has four documents: $d_1$ = "rabbit hole rabbit rabbit", $d_2$ = "queen rabbit garden", $d_3$ = "queen queen tarts", $d_4$ = "garden party tea". Rank them for the query `rabbit queen` with the `lnc.ltc` scheme.
::: solution
*Document frequencies and idf* ($N = 4$): `rabbit`, `queen` and `garden` occur in $2$ documents each, so $\mathrm{idf} = \log_{10} 2 = 0.301$; `hole`, `tarts`, `party`, `tea` occur once, $\mathrm{idf} = \log_{10} 4 = 0.602$.

*Query* (`ltc`): both terms have $\mathrm{tf} = 1$, so weight $1 \times 0.301$ each; normalising, $\hat q = (0.707, 0.707)$ on (`rabbit`, `queen`).

*Documents* (`lnc`: log tf, no idf, normalised):
- $d_1$: `rabbit` $\mathrm{tf} = 3$, weight $1 + \log_{10} 3 = 1.477$; `hole` weight $1$. Length $\sqrt{1.477^2 + 1} = 1.784$, so $\hat d_1$ has `rabbit` $0.828$, `hole` $0.561$.
- $d_2$: three terms of weight $1$, each $1/\sqrt{3} = 0.577$.
- $d_3$: `queen` $1 + \log_{10} 2 = 1.301$, `tarts` $1$; length $1.641$, giving $0.793$ and $0.609$.
- $d_4$: no query terms.

*Scores* (only query terms contribute): $\cos(q, d_1) = 0.707 \times 0.828 = 0.586$; $\cos(q, d_2) = 0.707 \times 0.577 + 0.707 \times 0.577 = 0.816$; $\cos(q, d_3) = 0.707 \times 0.793 = 0.561$; $\cos(q, d_4) = 0$. The ranking is $d_2, d_1, d_3, d_4$: the document with both query terms wins, and $d_1$, which repeats `rabbit` three times, edges out $d_3$, which repeats `queen` twice. A short Python program computing the same weights prints `cos 0.5855`, `0.8165`, `0.5606` and `0.0`.
:::
:::

### Ranking *Alice*

The same computation over the $800$ paragraphs, with an inverted index whose postings carry term frequencies:

```python
import re, math, heapq
from collections import Counter, defaultdict

tokenize = lambda s: re.findall(r"[a-z]+(?:'[a-z]+)?", s.lower())
N = len(paras)                                   # the 800 paragraphs, as before
postings = defaultdict(list)                     # term -> [(docID, tf)], docIDs increasing
for d, p in enumerate(paras):
    for t, tf in sorted(Counter(tokenize(p)).items()):
        postings[t].append((d, tf))
idf = {t: math.log10(N / len(pl)) for t, pl in postings.items()}
norm = [0.0] * N                                 # Euclidean length of each document vector
for t, pl in postings.items():
    for d, tf in pl:
        norm[d] += (1 + math.log10(tf)) ** 2
norm = [math.sqrt(x) for x in norm]

def weight(t, d, tf):                            # lnc: log tf, no idf, cosine-normalised
    return (1 + math.log10(tf)) / norm[d]

def query_vector(q):                             # ltc: log tf times idf, cosine-normalised
    w = {t: (1 + math.log10(tf)) * idf[t] for t, tf in Counter(tokenize(q)).items() if t in idf}
    length = math.sqrt(sum(x * x for x in w.values()))
    return {t: x / length for t, x in w.items()}
```

Scoring then walks the posting list of each query term, adding contributions into one **accumulator** per document:

```python
def taat(q, k=5):                                # term-at-a-time with accumulators
    qv, acc = query_vector(q), defaultdict(float)
    for t, qw in qv.items():
        for d, tf in postings[t]:
            acc[d] += qw * weight(t, d, tf)
    return heapq.nlargest(k, ((s, d) for d, s in acc.items())), len(acc)

top, n_acc = taat("the mock turtle sang about soup")
```
```text
accumulators 654
0.341 doc 516: `It's the thing Mock Turtle Soup is made from,' ...
0.266 doc 544: `And washing?' said the Mock Turtle. ...
0.266 doc 538: `You did,' said the Mock Turtle. ...
0.258 doc 585: `Turn a somersault in the sea!' cried the Mock ...
0.247 doc 623: `Explain all that,' said the Mock Turtle. ...
```

The top result is the Queen's explanation of what the Mock Turtle is ("It's the thing Mock Turtle Soup is made from"), a sensible answer. But the next four are one-line paragraphs that contain `mock` and `turtle` and almost nothing else: cosine normalisation divides by the document length, so a very short paragraph that contains two query terms has a large cosine. The two verses of the song "Beautiful Soup", which are what the user probably wanted, rank only $28$th and $42$nd: they repeat `soup` but never name the Mock Turtle, and the paragraph introducing the song ("Oh, a song, please, if the Mock Turtle would be so kind") is $10$th.

### Document length and pivoted normalisation

This is a systematic effect. Amit Singhal, Chris Buckley and Mandar Mitra (1996) compared, on TREC collections, the probability that a document of a given length is retrieved by cosine-normalised tf–idf with the probability that it is relevant: short documents were retrieved more often than their share of relevant documents warranted, long documents less often. Long documents are more likely to be relevant to a given topic simply because they cover more. Their remedy, **pivoted length normalisation**, divides by
$$
(1 - s)\cdot \mathit{pivot} + s \cdot \norm{\vec d}
$$
instead of $\norm{\vec d}$, where $\mathit{pivot}$ is the average document length and the **slope** $s < 1$, tuned on training queries, tilts the normalisation so that documents shorter than average are penalised a little more and longer ones a little less. The same idea, a document-length normalisation interpolated between "none" and "full" by a parameter, is the $b$ of BM25 ([[information-retrieval/probabilistic-retrieval]]).

::: warning The vector space model is a heuristic, not a theory of relevance
Nothing in linear algebra says that relevance is the cosine of an angle between tf–idf vectors. The model treats terms as orthogonal dimensions, so `rabbit` and `rabbits` (without stemming) or `car` and `automobile` are as unrelated as `rabbit` and `tax`; it has no notion of term dependence, order or meaning; and its weighting formulas were found by experiment. Its success is empirical: across decades of evaluations, well-tuned tf–idf with length normalisation is a strong baseline. Do not read more into the geometry than that — and treat claims that one weighting variant is "correct" with suspicion until they are tested on queries and relevance judgements ([[information-retrieval/evaluation]]).
:::

### Relevance feedback

The vector picture suggests a way to improve a query: move it towards documents the user marks as relevant. **Rocchio's algorithm** (1971) replaces $\vec q$ by
$$
\vec q\,' = \alpha \vec q + \frac{\beta}{\abs{D_r}} \sum_{\vec d \in D_r} \vec d - \frac{\gamma}{\abs{D_{n}}} \sum_{\vec d \in D_{n}} \vec d,
$$
where $D_r$ and $D_n$ are the documents judged relevant and non-relevant, with typical weights such as $\alpha = 1$, $\beta = 0.75$, $\gamma = 0.15$, and negative components set to zero. The new query contains terms the user never typed — for `mock turtle`, perhaps `soup`, `gryphon` and `lobster` from relevant paragraphs. Users rarely give explicit feedback, so **pseudo-relevance feedback** simply assumes the top few results of the first query are relevant and expands the query with their strongest terms. It improves average effectiveness on many test collections, but it can drift badly when the first results are off-topic.

::: example One round of Rocchio feedback {#ex-rocchio}
In the collection of [[#ex-cosine]], the user issues `rabbit queen` and marks $d_2$ relevant and $d_1$ non-relevant. Using raw term-frequency vectors for simplicity and $\alpha = 1$, $\beta = 0.75$, $\gamma = 0.15$, compute the modified query.
::: solution
On the terms (`rabbit`, `queen`, `garden`, `hole`): $\vec q = (1, 1, 0, 0)$, $\vec d_2 = (1, 1, 1, 0)$, $\vec d_1 = (3, 0, 0, 1)$. Then
$$
\vec q\,' = (1, 1, 0, 0) + 0.75\,(1, 1, 1, 0) - 0.15\,(3, 0, 0, 1) = (1.3,\ 1.75,\ 0.75,\ -0.15),
$$
and clipping the negative component gives $(1.3, 1.75, 0.75, 0)$. The new query has gained the term `garden` from the relevant document, and `queen` now outweighs `rabbit` because the non-relevant document was full of rabbits. Re-ranking with $\vec q\,'$ raises $d_4$ ("garden party tea") from a score of zero to a positive one — feedback can retrieve documents that share no word with the original query, which is both its strength and, when the feedback is wrong, its danger.
:::
:::

::: quiz
A document is a copy of document $d$ appended to itself. With cosine similarity on tf–idf vectors using **raw** term frequencies, how does its score for a query compare with the score of $d$? And with log-tf weights?
- [x] Raw tf: identical. Log tf: different in general.
- [ ] Raw tf: doubled. Log tf: identical.
- [ ] Identical in both cases.
- [ ] Doubled in both cases.
::: solution
With raw tf, every weight doubles, so the vector is $2\vec d$ and the cosine is unchanged ([[#prop-cosine]]). With log tf, a weight $1 + \log_{10}\mathrm{tf}$ becomes $1 + \log_{10} 2\mathrm{tf} = 1.301 + \log_{10}\mathrm{tf}$, which is not a fixed multiple of the original — terms with $\mathrm{tf} = 1$ gain $30\%$, terms with $\mathrm{tf} = 10$ gain $15\%$ — so the direction changes and the cosine changes, usually only slightly.
:::
:::

## Computing the top $k$ efficiently

A query is answered by computing scores for documents that contain at least one query term and returning the $k$ best. Two orders of traversal are possible.

- **Term-at-a-time** (TAAT): process the posting lists one after another, adding each term's contribution to an accumulator per document, as in `taat` above. Simple, and each list is read sequentially, but the accumulators can number in the millions — $654$ of $800$ paragraphs here, because `the` touches almost all of them.
- **Document-at-a-time** (DAAT): open a cursor on every query term's list and advance them in step, like a multi-way merge, completing the score of one document before moving on to the next. It needs only the current top $k$, kept in a heap, and it is the order in which skipping is possible.

::: algorithm Top-$k$ selection with a min-heap {#alg-topk}
Maintain a min-heap $H$ of at most $k$ pairs $(\mathit{score}, d)$. For each scored document $d$ with score $s$: if $\abs{H} < k$, insert $(s, d)$; otherwise, if $s > \min H$, replace the minimum by $(s, d)$. At the end, sort $H$ in decreasing order of score. The value $\theta = \min H$ when $\abs{H} = k$ (and $\theta = 0$ before) is the **threshold**: a document must score more than $\theta$ to enter the top $k$.
:::

::: proposition Cost of top-$k$ selection {#prop-topk-heap}
Selecting the top $k$ of $n$ scored documents with [[#alg-topk]] takes $O(n \log k)$ time and $O(k)$ space, against $O(n \log n)$ for sorting all scores. The threshold $\theta$ never decreases.
:::

::: proof
Each document causes at most one heap insertion or replacement, costing $O(\log k)$ ([[data-structures/heaps]]), or a single comparison with the minimum; the final sort costs $O(k \log k)$. The heap holds at most $k$ entries. Once the heap is full its minimum can only be replaced by a larger score, after which the new minimum is the smaller of the new score and the remaining $k - 1$ entries, all of which were at least the old minimum; so $\theta$ never decreases.
:::

Because $\theta$ only grows, a document that cannot score more than the *current* $\theta$ can never enter the top $k$ — and that is the basis of safe pruning.

## Safe dynamic pruning: MaxScore and WAND

Assume the score is a sum of non-negative contributions, one per query term, $s(d) = \sum_{t \in q} c_t(d)$, where $c_t(d) = 0$ if $t \notin d$. This holds for cosine with precomputed normalised weights, $c_t(d) = \hat q_t\, \hat d_t$, and for BM25 and language-model scores. For each term precompute an **upper bound**
$$
U_t = \max_{d} c_t(d),
$$
stored in the dictionary. For the query of the running example the bounds are

```text
the     df=643 upper bound 0.015
about   df= 84 upper bound 0.092
sang    df=  2 upper bound 0.127
turtle  df= 52 upper bound 0.129
mock    df= 54 upper bound 0.156
soup    df= 10 upper bound 0.165
```

`the` can add at most $0.015$ to any score. Once the threshold exceeds $0.015$, a paragraph containing *only* `the` can never make the top $k$, and its entry in the longest list need never be scored.

### MaxScore

Howard Turtle and James Flood's **MaxScore** (1995) sorts the query terms by increasing upper bound, $U_{t_1} \le \dots \le U_{t_m}$, and calls the shortest prefix $t_1, \dots, t_j$ with $U_{t_1} + \dots + U_{t_j} \le \theta$ the **non-essential** terms. A document containing only non-essential terms scores at most $\theta$, so candidates are generated only from the **essential** lists $t_{j+1}, \dots, t_m$; for each candidate, the non-essential lists are probed (by skipping to the candidate's docID), and scoring stops as soon as the partial score plus the bounds of the unprobed terms falls to $\theta$ or below. As $\theta$ grows, more terms become non-essential and fewer documents are generated. In the example, as soon as $\theta > 0.015 + 0.092 = 0.107$, both `the` and `about` are non-essential and the $643$-entry list of `the` is only probed, never traversed.

::: example A MaxScore trace {#ex-maxscore}
Run MaxScore with $k = 1$ on the three lists of [[#ex-wand]] below ($U_B = 1 \le U_A = 2 \le U_C = 3$), scoring each candidate from the essential lists and then probing non-essential lists in decreasing order of bound, stopping as soon as the partial score plus the bounds of the unprobed terms is at most $\theta$.
::: solution
A small implementation prints one line per candidate:

```text
theta=0.0: essential BAC, candidate 1, probed -, score 1.0
theta=1.0: essential AC, candidate 3, probed B, score 3.0
theta=3.0: essential C, candidate 6, probed AB, score 5.5
theta=5.5: essential C, candidate 9, probed -, score 1.0
```

At first every term is essential and document $1$ scores $1$. Now $\theta = 1 \ge U_B$, so $B$ is non-essential and candidates come from $A$ and $C$ only: document $2$, which contains only $B$, is never generated. Candidate $3$ scores $2$ from $A$, and probing $B$ adds $1$. With $\theta = 3 \ge U_B + U_A$, only $C$ is essential, and its list has just two entries: candidate $6$ (score $3$, then probing $A$ adds $1.5$ and $B$ adds $1$) and candidate $9$, whose partial score $1$ plus $U_A + U_B = 3$ is at most $5.5$, so no list is probed for it. MaxScore finds document $6$ after touching four candidates, while documents $5$, $7$ and $8$ were never candidates at all.
:::
:::

### WAND

Andrei Broder, David Carmel, Michael Herscovici, Aya Soffer and Jason Zien's **WAND** ("weak AND", 2003) makes the same decision per document instead of per term.

::: algorithm WAND {#alg-wand}
Keep one cursor per query term, pointing to its current posting, and the top-$k$ heap with threshold $\theta$.
1. Sort the cursors by their current docID (exhausted cursors last).
2. Find the **pivot**: the first cursor, in this order, at which the running sum of upper bounds $U_t$ of the cursors so far exceeds $\theta$. If there is none, stop.
3. Let $p$ be the pivot's docID. If the first cursor is also at $p$ (so all cursors before the pivot are at $p$), fully score $p$ by summing $c_t(p)$ over all cursors at $p$, offer it to the heap, and advance every cursor at $p$ to the next posting.
4. Otherwise advance one cursor that is before $p$ (for example the first) to the first posting $\ge p$, using galloping search ([[information-retrieval/inverted-indexes#alg-gallop]]) or skip pointers.
5. Repeat from step 1.
:::

::: theorem WAND is safe {#thm-wand}
If every contribution satisfies $0 \le c_t(d) \le U_t$, WAND returns the same top $k$ scores as exhaustive evaluation (with ties at the threshold broken in favour of documents scored earlier).
:::

::: proof
A document is either fully scored and offered to the heap, or skipped when some cursor jumps over it. We show that a skipped document $d$ has $s(d) \le \theta$ at the moment it is skipped. Since $\theta$ never decreases ([[#prop-topk-heap]]) and a document enters the heap only with a score greater than $\theta$, a skipped document could not have entered the top $k$ later either.

Consider an iteration with pivot docID $p$ and threshold $\theta$, and a document $d < p$ that has not yet been scored. Which terms can $d$ contain? A cursor never passes a document without either scoring it or skipping it as part of this argument, so every term whose cursor currently points beyond $d$ does not have $d$ in the part of its list still ahead of it — and the part behind it contains only documents already processed. Hence $d$ can contain only terms whose cursors point at docIDs $\le d < p$. In the sorted order these cursors all come strictly before the pivot (the pivot and everything after it are at docIDs $\ge p$). By the choice of the pivot, the sum of the upper bounds of the cursors strictly before it is at most $\theta$. Therefore $s(d) \le \sum_{t \text{ before pivot}} U_t \le \theta$.

Step 4 moves a cursor from a docID below $p$ to the first posting $\ge p$, so the documents it jumps over are all $< p$ and are covered by this argument. Step 3 scores $p$ exactly, because every term containing $p$ has its cursor at $p$: cursors before the pivot are at $p$ (the first is, and the order is sorted), and a cursor after the pivot at a docID $\ne p$ is beyond $p$ and, by the same reasoning, does not contain $p$. Finally, when no pivot exists, the sum of the bounds of all unexhausted cursors is at most $\theta$, and every remaining document can contain only those terms, so none can enter the top $k$.
:::

::: example A WAND trace {#ex-wand}
Three terms have contributions (docID: contribution) $A$: $1{:}1.0,\ 3{:}2.0,\ 6{:}1.5,\ 8{:}0.5$; $B$: $2{:}1,\ 3{:}1,\ 5{:}1,\ 6{:}1,\ 7{:}1,\ 8{:}1$; $C$: $6{:}3.0,\ 9{:}1.0$. Find the top $k = 1$ document with WAND, recording each step.
::: solution
The upper bounds are $U_A = 2$, $U_B = 1$, $U_C = 3$. Each line shows the cursors sorted by docID, the threshold and the action; a short program implementing [[#alg-wand]] prints:

```text
A@1 B@2 C@6            theta=0.0: pivot A, doc 1: score 1.0
B@2 A@3 C@6            theta=1.0: pivot A at doc 3; move B to 3
A@3 B@3 C@6            theta=1.0: pivot A, doc 3: score 3.0
B@5 A@6 C@6            theta=3.0: pivot C at doc 6; move B to 6
A@6 B@6 C@6            theta=3.0: pivot C, doc 6: score 5.5
B@7 A@8 C@9            theta=5.5: pivot C at doc 9; move B to inf
A@8 C@9 B@inf          theta=5.5: no pivot, stop
```

Line 2: the bound of $B$ alone ($1$) does not exceed $\theta = 1$, but $B$ and $A$ together ($3$) do, so the pivot is $A$ at document $3$, and document $2$ (only $B$, score at most $1$) is skipped. Line 4: $U_B + U_A = 3$ does not exceed $\theta = 3$, so document $5$, which contains only $B$, is skipped and the pivot moves to $C$ at $6$. Line 6: with $\theta = 5.5$, all three bounds together give $6 > 5.5$, so the pivot is $C$ at $9$; documents $7$ and $8$ (score at most $U_B + U_A = 3$) are skipped. Line 7: the remaining cursors $A$ and $C$ sum to $5 \le 5.5$, so the search stops without scoring $9$. The answer is document $6$ with score $5.5$; only $3$ of the $9$ documents that contain a query term were scored.
:::
:::

On the *Alice* query `the mock turtle sang about soup`, a WAND implementation over the same postings (with $k = 5$) fully scores $125$ of the $654$ paragraphs that contain some query term and returns exactly the five results of the exhaustive term-at-a-time run — the program checks that the two lists are equal:

```text
fully scored 125 of 800 documents
[(0.341, 516), (0.266, 544), (0.266, 538), (0.258, 585), (0.247, 623)]
True
```

The savings grow with collection size and with the imbalance of list lengths, because a long list of a low-weight term is skipped in large jumps. The weakness of WAND and MaxScore is that a single global bound $U_t$ is loose: one paragraph in which `the` is a large fraction of the text sets the bound for all. **Block-Max WAND** (Shuai Ding and Torsten Suel, 2011) stores the maximum contribution for each block of, say, $128$ postings in the block directory of the compressed list ([[information-retrieval/index-compression]]) and uses these local bounds to skip whole blocks; block-max variants of WAND and MaxScore are used for top-$k$ processing in open-source engines such as Lucene as of 2026.

::: quiz
In WAND, the cursors sorted by docID are at $B@4$, $A@9$, $C@12$ with bounds $U_B = 2$, $U_A = 1$, $U_C = 5$, and $\theta = 2.5$. What happens next?
- [ ] Document $4$ is fully scored.
- [x] The pivot is $A$ at document $9$, and cursor $B$ is advanced to its first posting $\ge 9$.
- [ ] The pivot is $C$ at $12$, and both $B$ and $A$ are advanced to $12$.
- [ ] The algorithm stops, because $U_B < \theta$.
::: solution
The running sums of the bounds are $U_B = 2 \le 2.5$ and then $U_B + U_A = 3 > 2.5$, so the pivot is the cursor of $A$, at document $9$. The first cursor ($B$, at $4$) is not at $9$, so step 4 advances $B$ to its first posting $\ge 9$. Documents $4$ to $8$ can contain only $B$ among the query terms, so they score at most $U_B = 2 \le \theta$ and are safely skipped. Stopping is wrong: the bounds of all three cursors sum to $8 > \theta$.
:::
:::

## Faster but not safe: inexact top $k$

When even safe pruning is too slow, engines give up exactness. **Champion lists** keep, for each term, only the $r$ documents with the highest weights for that term, and score only the union of the champion lists of the query terms. **Impact-ordered** indexes sort each posting list by decreasing contribution instead of docID, so that query processing can read the high-impact postings of every term first and stop early when the remaining impacts are too small to matter (Anh and Moffat developed such methods in the early 2000s); the price is that docID-ordered intersection and gap compression no longer apply directly. **Tiered indexes** put the "best" documents (by some query-independent quality score, such as the PageRank of [[information-retrieval/web-search]]) in a first tier and consult lower tiers only if the first does not yield $k$ good results. And large engines rank in **stages**: a cheap function (BM25 with WAND) selects a few hundred or thousand candidates, and expensive models — learned rankers ([[information-retrieval/learning-to-rank]]) and neural re-rankers ([[information-retrieval/dense-retrieval]]) — reorder only those. Whether a shortcut is acceptable is an empirical question: measure the loss in effectiveness on test queries ([[information-retrieval/evaluation]]).

::: history
Hans Peter Luhn proposed in 1957 that the frequency of a word in a document measures its significance, and Gerard Salton at Harvard and then Cornell built the SMART retrieval system from the early 1960s, collected in *The SMART Retrieval System: Experiments in Automatic Document Processing* (1971), the volume that also contains J. J. Rocchio's relevance-feedback method. Karen Spärck Jones's "A statistical interpretation of term specificity and its application in retrieval" (*Journal of Documentation*, 1972) introduced inverse document frequency. Salton, Andrew Wong and Chung-Shu Yang described the vector space model in "A vector space model for automatic indexing" (*Communications of the ACM*, 1975), and Salton and Chris Buckley's "Term-weighting approaches in automatic text retrieval" (1988) compared hundreds of weighting combinations. Singhal, Buckley and Mitra's "Pivoted document length normalization" appeared at SIGIR 1996. On the efficiency side, Howard Turtle and James Flood described MaxScore in 1995, Broder and colleagues WAND at CIKM 2003, and Ding and Suel Block-Max WAND at SIGIR 2011.
:::

## Where this leads

The vector space model is the first answer to "how relevant is this document?". [[information-retrieval/probabilistic-retrieval]] derives a different answer from probability theory — the probability ranking principle, the binary independence model, BM25 and language models — which turns out to justify idf and to explain how tf and length normalisation should interact. [[information-retrieval/evaluation]] makes "better ranking" measurable. The query-processing algorithms of this chapter apply unchanged to any score that is a sum of per-term contributions, which includes BM25. And the geometric view — documents as vectors, relevance as closeness — returns in dense form in [[information-retrieval/dense-retrieval]], where vectors are learned and have a few hundred dense dimensions rather than millions of sparse ones.

::: summary
- Ranked retrieval scores documents and returns the top $k$, avoiding the all-or-nothing behaviour of Boolean queries.
- Term weights combine **term frequency**, usually dampened as $1 + \log \mathrm{tf}$ ([[#def-tf]]), with **inverse document frequency** $\log(N/\mathrm{df})$ ([[#def-idf]]): **tf–idf** ([[#def-tfidf]]).
- The **vector space model** ([[#def-vsm]]) ranks by the cosine between query and document vectors; cosine ignores vector length and, for unit vectors, is equivalent to Euclidean distance ([[#prop-cosine]]).
- Cosine normalisation over-favours short documents; **pivoted normalisation** corrects this with a slope parameter, an idea BM25 inherits.
- Rocchio's **relevance feedback** moves the query towards relevant documents; pseudo-relevance feedback assumes the top results are relevant.
- **Document-at-a-time** evaluation with a top-$k$ **min-heap** ([[#alg-topk]]) costs $O(n \log k)$ and yields a non-decreasing threshold $\theta$ ([[#prop-topk-heap]]).
- **MaxScore** and **WAND** ([[#alg-wand]]) use per-term upper bounds to skip documents that cannot beat $\theta$, provably without changing the top $k$ ([[#thm-wand]]); block-max variants tighten the bounds per block.
:::

## Exercises

::: exercise An idf value {level=1 check="2"}
A collection has $N = 1\,000\,000$ documents and a term occurs in $10\,000$ of them. What is its idf, with base-$10$ logarithms? (Enter the idf.)
::: solution
$\log_{10}(10^6 / 10^4) = \log_{10} 100 = 2$.
:::
:::

::: exercise A tf–idf weight {level=1 check="(1 + log10(20)) * log10(800/52)"}
In *Alice*'s paragraphs ($N = 800$), `turtle` occurs in $52$ paragraphs. What is its tf–idf weight ([[#def-tfidf]]) in a paragraph where it occurs $20$ times? (Enter the weight.)
::: solution
$\mathrm{wf} = 1 + \log_{10} 20 = 2.301$ and $\mathrm{idf} = \log_{10}(800/52) = 1.187$, so $w = 2.301 \times 1.187 \approx 2.731$.
:::
:::

::: exercise Cosine of two short documents {level=1 check="1/2"}
With raw term frequencies and no idf, compute the cosine similarity of "rabbit rabbit queen" and "rabbit queen queen". Then compute it for "rabbit queen" and "rabbit tarts". (Enter the second cosine.)
::: solution
First pair: vectors $(2, 1)$ and $(1, 2)$ on (`rabbit`, `queen`); dot product $4$, lengths $\sqrt{5}$ each, cosine $4/5 = 0.8$. Second pair: vectors $(1, 1, 0)$ and $(1, 0, 1)$ on (`rabbit`, `queen`, `tarts`); dot product $1$, lengths $\sqrt 2$, cosine $1/2$.
:::
:::

::: exercise The dot product without normalisation {level=2}
Show by an example that ranking by the unnormalised dot product $\vec q\cdot\vec d$ with tf–idf weights can prefer a long, off-topic document to a short, on-topic one. Then show that the cosine cannot be increased by concatenating a document with itself when raw tf is used, but can be when log tf is used.
::: solution
Query `rabbit` (one term, query weight $1$). A short on-topic note "rabbit hole" has $\mathrm{tf}_{\text{rabbit}} = 1$; a long legal text of $10\,000$ words that mentions "rabbit" $5$ times in passing has $\mathrm{tf} = 5$. With log-tf weights the dot products are $1 \cdot \mathrm{idf}$ and $(1 + \log_{10} 5)\mathrm{idf} = 1.7\,\mathrm{idf}$, so the long document wins. Its cosine, however, divides by its length, which is huge because of its thousands of other terms, so the short note wins under cosine. For the second part: with raw tf, concatenation doubles every weight and leaves the cosine unchanged by [[#prop-cosine]]. With log tf, weights $1 + \log\mathrm{tf}$ become $1 + \log 2 + \log\mathrm{tf}$; terms that occur once grow relatively more than frequent terms, so the direction moves towards the "flat" vector of rare terms, and the cosine with a query consisting of such terms increases slightly.
:::
:::

::: exercise SMART notation {level=2}
Recompute [[#ex-cosine]] with the `ltc.ltc` scheme (idf in the document weights as well). Does the ranking change?
::: solution
Document weights are now $(1 + \log_{10}\mathrm{tf})\cdot\mathrm{idf}$ before normalisation. $d_1$: `rabbit` $1.477 \times 0.301 = 0.445$, `hole` $1 \times 0.602 = 0.602$; length $0.749$; normalised `rabbit` $0.594$. $d_2$: `queen`, `rabbit`, `garden` each $0.301$; normalised $0.577$ each. $d_3$: `queen` $1.301 \times 0.301 = 0.392$, `tarts` $0.602$; length $0.718$; normalised `queen` $0.545$. Scores: $d_1$: $0.707 \times 0.594 = 0.420$; $d_2$: $0.816$; $d_3$: $0.707 \times 0.545 = 0.385$. The order $d_2, d_1, d_3$ is unchanged, but $d_1$ and $d_3$ have dropped, because their non-query terms `hole` and `tarts` are rarer and now carry more weight in the normalisation.
:::
:::

::: exercise MaxScore partition {level=2}
For the query of the running example, with the upper bounds listed in the text, which terms are non-essential when $\theta = 0.25$? Which lists must still be traversed to generate candidates?
::: solution
Sorted by bound: `the` $0.015$, `about` $0.092$, `sang` $0.127$, `turtle` $0.129$, `mock` $0.156$, `soup` $0.165$. Prefix sums: $0.015$, $0.107$, $0.234$, $0.363, \dots$. The longest prefix with sum $\le 0.25$ is `the`, `about`, `sang` (sum $0.234$). So those three are non-essential: a paragraph containing only some of them scores at most $0.234 < 0.25$. Candidates come from the lists of `turtle`, `mock` and `soup` ($52 + 54 + 10$ postings at most), and the three non-essential lists are probed only for those candidates.
:::
:::

::: exercise Heap threshold {level=2 check="5"}
Top-$k$ selection with $k = 3$ processes documents with scores $5, 1, 4, 2, 8, 3, 7$ in that order using [[#alg-topk]]. What is the final threshold $\theta$? (Enter $\theta$.) How many heap replacements occur after the heap is full?
::: solution
After $5, 1, 4$ the heap is $\set{1, 4, 5}$ and $\theta = 1$. Then $2 > 1$: replace, heap $\set{2, 4, 5}$, $\theta = 2$. $8 > 2$: replace, $\set{4, 5, 8}$, $\theta = 4$. $3 \le 4$: no change. $7 > 4$: replace, $\set{5, 7, 8}$, $\theta = 5$. The final threshold is $5$, after $3$ replacements, and the top $3$ are $8, 7, 5$. The threshold took the values $1, 2, 4, 4, 5$ — never decreasing, as [[#prop-topk-heap]] says.
:::
:::

::: exercise WAND with a tighter bound {level=3}
Prove that WAND remains safe if the global bounds $U_t$ are replaced by any values $U'_t$ with $U'_t \ge c_t(d)$ for every document $d$ that is still ahead of the cursor of $t$, and explain how this justifies Block-Max WAND, where the bound used for a cursor is the maximum contribution in its current block. Why must Block-Max WAND check the block bounds of the *pivot's* document in all lists, not only the bounds of the blocks the cursors are in?
::: solution
The proof of [[#thm-wand]] used only that a skipped document $d$ satisfies $c_t(d) \le U_t$ for each term $t$ whose cursor is before the pivot, and $d$ lies ahead of (or at) those cursors. Any bound valid for the documents ahead of the cursor serves equally, and the argument goes through word for word with $U'_t$. In Block-Max WAND the current block of a cursor covers documents from the cursor up to the block's last docID, so the block maximum bounds $c_t(d)$ for those documents — but not for documents in later blocks. A skipped document $d < p$ might lie beyond the end of a cursor's current block, where the block maximum says nothing. So Block-Max WAND first finds a pivot with the global bounds (safe for all documents), then checks, for the candidate $p$, the maxima of the blocks *that contain $p$* in each list; if their sum is at most $\theta$, it can skip $p$ (and everything up to the nearest block boundary) without decompressing any block. Using block bounds only for the cursors' current blocks would bound the wrong documents.
:::
:::

::: exercise Implement document-at-a-time scoring {level=3}
Write a function `daat(q, k)` that scores documents in docID order by advancing one cursor per query term (no pruning), keeps a top-$k$ heap, and returns the same results as `taat`. What is its time complexity in terms of the list lengths $L_1, \dots, L_m$ and $k$?
::: solution
```python
def daat(q, k=5):
    qv = query_vector(q)
    lists = [(qv[t], postings[t]) for t in qv]
    pos = [0] * len(lists)
    heap = []
    while True:
        d = min((pl[i][0] for (_, pl), i in zip(lists, pos) if i < len(pl)), default=None)
        if d is None:
            return sorted(heap, reverse=True)
        s = 0.0
        for j, ((qw, pl), i) in enumerate(zip(lists, pos)):
            if i < len(pl) and pl[i][0] == d:          # this term occurs in d
                s += qw * weight(None, d, pl[i][1]); pos[j] += 1
        if len(heap) < k: heapq.heappush(heap, (s, d))
        elif s > heap[0][0]: heapq.heapreplace(heap, (s, d))
```
Each iteration finds the smallest current docID ($O(m)$), scores that document and advances the cursors on it. There is one iteration per distinct document in the union, at most $\sum_i L_i$, so the time is $O(m \sum_i L_i + n\log k)$ where $n$ is the number of distinct documents; keeping the cursors in a heap keyed by docID reduces the $m$ factor to $\log m$. The function `weight` above ignores its first argument, so passing `None` is harmless; on the running query `daat(...) == taat(...)[0]` holds. (Floating-point sums can differ in the last bit between the two orders of addition, which could in principle swap two nearly tied documents; comparing scores with a tolerance avoids false alarms.)
:::
:::
