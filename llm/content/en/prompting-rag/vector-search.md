An embedding model ([[prompting-rag/text-embeddings]]) turns every passage of a collection into a vector, and a query into one more. Retrieval is then a geometric question: which stored vectors are closest to the query vector? With a thousand passages the answer is a loop. With a hundred million passages of $768$ dimensions, the loop reads $300$ GB of memory for every query, and a search engine that must answer in milliseconds cannot afford it.

This chapter is about answering that question fast. It starts with exact search and proves that, for normalised vectors, the three common similarity measures — cosine, dot product and Euclidean distance — rank results identically. It then builds the main families of **approximate nearest-neighbour** (ANN) indexes: inverted files that search only the most promising clusters, product quantisation that compresses vectors to a few bytes, and the HNSW graph that dominates vector databases. A plain-Python experiment measures the trade-off between recall and work. The last part returns to words: the BM25 ranking function, computed by hand, and **hybrid search**, which combines keyword and vector rankings with reciprocal rank fusion. The Computer Science Atlas treats the indexing side in more depth — [inverted indexes](/learn/cs/lesson.php?c=information-retrieval&l=inverted-indexes), [BM25 and probabilistic retrieval](/learn/cs/lesson.php?c=information-retrieval&l=probabilistic-retrieval) and [dense retrieval](/learn/cs/lesson.php?c=information-retrieval&l=dense-retrieval), with its own implementations of IVF, PQ and graph search — and this chapter links there rather than repeating it.

## Exact search and the choice of similarity {#sec-exact}

::: definition $k$-nearest-neighbour search {#def-knn}
Given a collection $X = \{\mathbf{x}_1, \dots, \mathbf{x}_N\}\subset\R^{d}$, a query $\mathbf{q}\in\R^{d}$ and a score $s(\mathbf{q}, \mathbf{x})$ (larger is better), **$k$-nearest-neighbour search** returns the indices of the $k$ vectors with the largest scores. The usual scores are the **inner product** $\mathbf{q}^\top\mathbf{x}$, the **cosine** $\mathbf{q}^\top\mathbf{x}/(\lVert\mathbf{q}\rVert\lVert\mathbf{x}\rVert)$ and the **negative Euclidean distance** $-\lVert\mathbf{q} - \mathbf{x}\rVert$. When the score is the inner product without normalisation, the problem is called **maximum inner-product search** (MIPS).
:::

Exact search by brute force computes all $N$ scores and keeps the best $k$ with a heap, at a cost of $Nd$ multiply–adds per query. Its great virtues are that it is exact, trivial to update and embarrassingly parallel: on an accelerator, the scores of a batch of queries are one matrix product.

::: example The cost of brute force {#ex-brute}
A collection has $N = 10^7$ passages embedded in $d = 768$ dimensions. How much memory do the vectors take as 32-bit floats, how many floating-point operations does one query need, and how long does it take if memory bandwidth of $500$ GB/s is the limit?
::: solution
Memory: $10^7\cdot768\cdot4 = 3.07\times10^{10}$ bytes, about $30.7$ GB. Operations: $2Nd = 1.54\times10^{10}$ FLOPs (a multiply and an add per coordinate). Each query must read all $30.7$ GB, so at $500$ GB/s it takes about $61$ ms — bandwidth, not arithmetic, is the bottleneck ([[math-for-ml/vectors-matrices#prop-flops]] discusses arithmetic intensity). Batching $64$ queries reads the data once for all of them, which is why brute force is competitive for batch workloads and small collections, and why interactive search over large collections needs an index.
:::
:::

Which score to use is decided by how the embedding model was trained, but for normalised vectors the choice does not matter.

::: proposition Equivalence of similarities for unit vectors {#prop-equivalence}
If $\lVert\mathbf{q}\rVert = 1$ and $\lVert\mathbf{x}_i\rVert = 1$ for all $i$, then

$$
\lVert\mathbf{q} - \mathbf{x}_i\rVert^2 = 2 - 2\,\mathbf{q}^\top\mathbf{x}_i,
$$ {#eq-l2-dot}

so ranking by increasing Euclidean distance, by decreasing inner product and by decreasing cosine give the same order. If only the query is normalised, inner product and cosine still agree with each other only when all $\lVert\mathbf{x}_i\rVert$ are equal.
:::

::: proof
Expand: $\lVert\mathbf{q} - \mathbf{x}\rVert^2 = \lVert\mathbf{q}\rVert^2 - 2\mathbf{q}^\top\mathbf{x} + \lVert\mathbf{x}\rVert^2 = 2 - 2\mathbf{q}^\top\mathbf{x}$ for unit vectors. The map $t\mapsto\sqrt{2 - 2t}$ is strictly decreasing on $[-1, 1]$, so a larger inner product means a smaller distance, and the orders coincide; for unit vectors the cosine *is* the inner product. Without normalisation of the $\mathbf{x}_i$, $\mathbf{q}^\top\mathbf{x}_i = \lVert\mathbf{x}_i\rVert\cos\theta_i$, which orders like $\cos\theta_i$ for all queries only if the norms are equal.
:::

::: widget plot
f: sqrt(2 - 2*cos(x))
x: 0, pi
y: 0, 2.1
piticks: true
labels: $\lVert\mathbf{q} - \mathbf{x}\rVert$ for unit vectors at angle $\theta$
points: 0.6435,0.6325
caption: Euclidean distance between two unit vectors against the angle between them, $\sqrt{2 - 2\cos\theta}$ by [[#eq-l2-dot]]. It increases strictly with the angle, so for normalised embeddings nearest in distance, largest in inner product and largest in cosine are the same thing. The marked point is a cosine of $0.8$ ($\theta = 0.644$), at distance $0.632$.
:::

When an index supports only Euclidean distance but the model was trained for unnormalised inner products, a simple transformation reduces MIPS to nearest-neighbour search.

::: proposition Reducing MIPS to Euclidean search {#prop-mips}
Let $M\ge\max_i\lVert\mathbf{x}_i\rVert$. Map each stored vector to $\tilde{\mathbf{x}}_i = \big(\mathbf{x}_i,\ \sqrt{M^2 - \lVert\mathbf{x}_i\rVert^2}\big)\in\R^{d+1}$ and the query to $\tilde{\mathbf{q}} = (\mathbf{q}, 0)$. Then $\lVert\tilde{\mathbf{q}} - \tilde{\mathbf{x}}_i\rVert^2 = \lVert\mathbf{q}\rVert^2 + M^2 - 2\mathbf{q}^\top\mathbf{x}_i$, so the Euclidean nearest neighbours of $\tilde{\mathbf{q}}$ are the vectors of largest inner product with $\mathbf{q}$.
:::

::: proof
Every $\tilde{\mathbf{x}}_i$ has squared norm $\lVert\mathbf{x}_i\rVert^2 + M^2 - \lVert\mathbf{x}_i\rVert^2 = M^2$, and $\tilde{\mathbf{q}}^\top\tilde{\mathbf{x}}_i = \mathbf{q}^\top\mathbf{x}_i$ because the extra coordinate of $\tilde{\mathbf{q}}$ is zero. Expanding as before, $\lVert\tilde{\mathbf{q}} - \tilde{\mathbf{x}}_i\rVert^2 = \lVert\mathbf{q}\rVert^2 + M^2 - 2\mathbf{q}^\top\mathbf{x}_i$. The first two terms do not depend on $i$, so minimising the distance maximises the inner product.
:::

## Inverted files {#sec-ivf}

The first idea for avoiding a full scan is to cluster. If the collection is partitioned into cells, each with a representative centroid, a query need only be compared with the vectors in the few cells whose centroids are closest. This is the same idea as an inverted index for words ([inverted indexes](/learn/cs/lesson.php?c=information-retrieval&l=inverted-indexes)), with clusters in place of terms, and so it has the same name.

::: algorithm Inverted-file (IVF) index {#alg-ivf}
**Build.** Run $k$-means on (a sample of) the collection to obtain $n_{\text{list}}$ centroids $\mathbf{c}_1, \dots, \mathbf{c}_{n_{\text{list}}}$. Assign each vector to its nearest centroid and store, for each centroid, the list of its vectors.

**Search** with parameter $n_{\text{probe}}$. Compare $\mathbf{q}$ with all centroids; take the $n_{\text{probe}}$ closest; compute exact scores for the vectors in their lists; return the best $k$.
:::

A query costs $n_{\text{list}}$ centroid comparisons plus about $N\,n_{\text{probe}}/n_{\text{list}}$ vector comparisons if the cells are balanced. With $n_{\text{list}}\approx\sqrt N$ both terms are about $\sqrt N\cdot n_{\text{probe}}$, so a collection of $10^6$ vectors needs a few thousand comparisons per probe rather than a million. The price is accuracy: a true neighbour that lies just across a cell boundary, in a cell that was not probed, is missed. The quality of an approximate index is measured against exact search.

::: definition Recall of an approximate index {#def-ann-recall}
For a query $\mathbf{q}$, let $T(\mathbf{q})$ be the exact top-$k$ set and $R(\mathbf{q})$ the set returned by the index. The index's **recall@$k$** is the average over queries of $\lvert T(\mathbf{q})\cap R(\mathbf{q})\rvert/k$. (This measures agreement with exact search; whether the results are *relevant* to a user is a separate question, treated in [[prompting-rag/rag-evaluation]].)
:::

The listing builds a brute-force searcher and an IVF index over $4000$ clustered unit vectors in plain Python, and measures recall@$10$ and the fraction of the collection scanned for several values of $n_{\text{probe}}$.

```python
import math, random
rng = random.Random(42)
N, d, k, nlist = 4000, 16, 10, 40

def unit(v):
    n = math.sqrt(sum(x*x for x in v)); return [x/n for x in v]
def dot(a, b): return sum(x*y for x, y in zip(a, b))

# clustered unit vectors: 25 topics, each vector = topic direction + noise
topics = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(25)]
def sample(): t = rng.choice(topics); return unit([a + rng.gauss(0, 0.7) for a in t])
X = [sample() for _ in range(N)]                       # N x d database
Qs = [sample() for _ in range(50)]                     # 50 queries

def brute_force(q, k):                                 # exact top-k by inner product
    return sorted(range(N), key=lambda i: -dot(q, X[i]))[:k]

# IVF: k-means on the unit sphere (spherical k-means), then inverted lists
cent = [X[i][:] for i in rng.sample(range(N), nlist)]
for it in range(8):
    assign = [max(range(nlist), key=lambda c: dot(x, cent[c])) for x in X]
    for c in range(nlist):
        members = [X[i] for i in range(N) if assign[i] == c]
        if members: cent[c] = unit([sum(col) for col in zip(*members)])
lists = [[] for _ in range(nlist)]
for i, c in enumerate(assign): lists[c].append(i)

def ivf_search(q, k, nprobe):
    probe = sorted(range(nlist), key=lambda c: -dot(q, cent[c]))[:nprobe]
    cand = [i for c in probe for i in lists[c]]
    return sorted(cand, key=lambda i: -dot(q, X[i]))[:k], len(cand)

truth = [set(brute_force(q, k)) for q in Qs]
print(f"N={N} d={d} nlist={nlist}  list sizes min {min(map(len, lists))} max {max(map(len, lists))}")
for nprobe in (1, 2, 4, 8, 16):
    rec = scanned = 0
    for q, t in zip(Qs, truth):
        res, n = ivf_search(q, k, nprobe)
        rec += len(t & set(res)) / k; scanned += n
    print(f"nprobe {nprobe:2d}: recall@{k} {rec/len(Qs):.3f}   vectors scanned {scanned/len(Qs)/N:6.1%}")
```

```text
N=4000 d=16 nlist=40  list sizes min 15 max 173
nprobe  1: recall@10 0.802   vectors scanned   3.1%
nprobe  2: recall@10 0.942   vectors scanned   5.3%
nprobe  4: recall@10 0.986   vectors scanned  10.2%
nprobe  8: recall@10 0.998   vectors scanned  20.2%
nprobe 16: recall@10 1.000   vectors scanned  39.9%
```

Probing one cell finds $80\%$ of the true neighbours while scanning $3\%$ of the collection; four cells find $98.6\%$ at a tenth of the work. Every point on this curve is a legitimate operating point, and choosing one is the **recall–latency trade-off** that every ANN index exposes through a parameter like $n_{\text{probe}}$. Two features of the output deserve notice. The cells are unbalanced (from $15$ to $173$ vectors), because $k$-means follows the data's clusters, so the work per query depends on where the query lands. And the data have cluster structure; on structureless random vectors IVF does much worse at the same $n_{\text{probe}}$, as an exercise shows. Real embeddings are clustered by topic, which is why IVF works on them.

::: example Sizing an IVF index {#ex-ivf-size}
For $N = 10^7$ vectors, a common rule of thumb chooses $n_{\text{list}}\approx4\sqrt N$. How many cells is that, how many vectors does each hold on average, and how many comparisons does a query make with $n_{\text{probe}} = 32$?
::: solution
$4\sqrt{10^7}\approx12{,}650$ cells, about $790$ vectors each. A query compares with all $12{,}650$ centroids and then with $32\cdot790\approx25{,}300$ vectors — about $38{,}000$ comparisons instead of $10^7$, a $260$-fold reduction. The recall at $n_{\text{probe}} = 32$ must be measured on held-out queries, as in the listing.
:::
:::

## Product quantisation {#sec-pq}

IVF saves time but not memory: the full vectors are still stored. **Product quantisation** (PQ; Jégou, Douze and Schmid, 2011) compresses them.

::: definition Product quantisation {#def-pq}
Split $\R^{d}$ into $m$ subspaces of dimension $d/m$, so that $\mathbf{x} = (\mathbf{x}^{(1)}, \dots, \mathbf{x}^{(m)})$. For each subspace $j$, learn by $k$-means a **codebook** of $K$ centroids $\mathbf{c}^{(j)}_1, \dots, \mathbf{c}^{(j)}_K\in\R^{d/m}$ (typically $K = 256$). Encode $\mathbf{x}$ by the $m$ indices of the nearest centroid in each subspace; its reconstruction is $\hat{\mathbf{x}} = (\mathbf{c}^{(1)}_{i_1}, \dots, \mathbf{c}^{(m)}_{i_m})$. With $K = 256$ each index is one byte, so a code takes $m$ bytes.
:::

Distances to compressed vectors can be computed without decompressing them, because squared Euclidean distance splits over subspaces:

$$
\lVert\mathbf{q} - \hat{\mathbf{x}}\rVert^2 = \sum_{j=1}^{m}\big\lVert\mathbf{q}^{(j)} - \mathbf{c}^{(j)}_{i_j}\big\rVert^2.
$$ {#eq-adc}

For each query, compute once the table of $m\times K$ distances $\lVert\mathbf{q}^{(j)} - \mathbf{c}^{(j)}_c\rVert^2$; then the distance to any stored code is the sum of $m$ table look-ups. This is **asymmetric distance computation**: the query is exact, only the database is quantised. Inner products split over subspaces in the same way.

::: example Compressing a collection {#ex-pq}
Vectors of dimension $768$ are product-quantised with $m = 96$ subspaces and $K = 256$ centroids each. What is the code size, the compression ratio against 32-bit floats, the size of the codebooks, and the cost of one distance computation?
::: solution
Each code is $96$ bytes, against $768\cdot4 = 3072$ bytes: $32$ times smaller, so $10^7$ vectors take $0.96$ GB instead of $30.7$ GB. The codebooks hold $96\cdot256$ centroids of $8$ dimensions, $96\cdot256\cdot8\cdot4 = 786{,}432$ bytes, negligible. Per query, building the table costs $96\cdot256\cdot8\approx197{,}000$ multiply–adds, once; each distance then costs $96$ look-ups and additions instead of $768$ multiply–adds.
:::
:::

PQ distances are approximate, so systems retrieve a few hundred candidates by PQ distance and **re-rank** them with exact vectors, if those are kept elsewhere (on disk, say). Combined with an inverted file, quantising the residual $\mathbf{x} - \mathbf{c}$ from the cell centroid, this gives IVF-PQ, the workhorse for collections of billions of vectors; the open-source FAISS library (Johnson, Douze and Jégou, 2017) made these methods widely available. Cruder compressions are common too: 8-bit scalar quantisation of each coordinate (four times smaller) and binary codes (one bit per coordinate, $32$ times smaller), whose distances are Hamming distances.

## Graph indexes and HNSW {#sec-hnsw}

A different idea is to connect each vector to some of its neighbours and search by walking the graph: from an entry point, repeatedly move to the neighbour closest to the query, until no neighbour is closer. On a well-built graph, a walk of a few dozen hops reaches the neighbourhood of the query from anywhere. The difficulty is to build graphs on which greedy walks neither stall in local minima nor take too many steps.

**Hierarchical navigable small-world graphs** (HNSW; Malkov and Yashunin, arXiv 2016, IEEE TPAMI published online 2018) solve both problems with a hierarchy like a skip list. Every vector is inserted into layer $0$; a random subset also into layer $1$, a smaller subset into layer $2$, and so on. Upper layers are sparse, so their links are long and a greedy walk crosses the collection in a few steps; lower layers are dense, so the walk can refine its position.

::: definition HNSW {#def-hnsw}
Each inserted element draws a **level** $\ell = \lfloor -\ln(U)\,m_L\rfloor$ with $U$ uniform on $(0, 1]$ and $m_L = 1/\ln M$, and is inserted into layers $0, \dots, \ell$. In each layer it is linked to up to $M$ near neighbours (up to $2M$ in layer $0$), found by searching the graph built so far with a candidate list of size $ef_{\text{construction}}$ and chosen with a heuristic that prefers neighbours in diverse directions. **Search** starts from the entry point in the top layer, walks greedily to the closest element in each layer and descends; in layer $0$ it runs a best-first search keeping the $ef_{\text{search}}\ge k$ best candidates found, and returns the top $k$.
:::

::: proposition The level distribution {#prop-levels}
With $m_L = 1/\ln M$, an element reaches layer $\ell$ or higher with probability $M^{-\ell}$. Among $N$ elements, the expected number in layers $\ge\ell$ is $NM^{-\ell}$, so the expected number of non-empty layers is about $\log_M N$.
:::

::: proof
$\lfloor -\ln(U)m_L\rfloor\ge\ell$ exactly when $-\ln(U)m_L\ge\ell$, that is $U\le e^{-\ell/m_L} = e^{-\ell\ln M} = M^{-\ell}$, which for uniform $U$ has probability $M^{-\ell}$. By linearity of expectation $N$ elements contribute $NM^{-\ell}$ to layer $\ell$ and above. This is below $1$ once $\ell > \log_MN$.
:::

::: example Layers of a million-vector index {#ex-hnsw}
An HNSW index holds $N = 10^6$ vectors with $M = 16$. How many vectors are expected in layers $\ge1, 2, 3, 4, 5$? How much memory do the links of layer $0$ take with $4$-byte identifiers?
::: solution
$NM^{-\ell}$: $62{,}500$, $3906$, $244$, $15$ and about $1$. So the index has about $5$ layers, $\log_{16}10^6 = 4.98$, and a search visits a handful of elements in each upper layer before the work in layer $0$. Layer $0$ has up to $2M = 32$ links per element: $10^6\cdot32\cdot4 = 128$ MB, on top of the $3$ GB of $768$-dimensional vectors. HNSW keeps both in memory, which is its main cost; disk-based graph indexes and graphs over compressed vectors address larger collections.
:::
:::

::: widget graph
nodes: e@0,2; a@2,3; b@4,2.6; c@1,1; f@3,1.2; g@5,1; h@2,0; q@4.5,0
edges: e-a:2.2; a-b:2; e-c:1.4; c-f:2; a-f:2.1; b-g:1.9; f-g:2; c-h:1.4; f-h:1.6; g-q:1.1; f-q:1.9
algorithm: dijkstra
start: e
caption: A small proximity graph in two dimensions, with edge weights equal to distances; $q$ is the element nearest a query. HNSW search walks greedily: from the entry point $e$ it moves to whichever neighbour is closest to the query, here $e\to c\to f\to q$, and stops when no neighbour is closer. Dijkstra's algorithm, stepped through here, explores the same graph exhaustively; a greedy walk visits only a few nodes, which is what makes graph search fast — and long-range links in upper layers are what keep the number of hops small in large graphs.
:::

The parameters expose the familiar trade-off: larger $M$ and $ef_{\text{construction}}$ build a better graph, more slowly and with more memory; larger $ef_{\text{search}}$ raises recall at the cost of latency. On public benchmarks (such as ANN-Benchmarks, Aumüller et al., 2020) graph indexes give among the best recall at a given speed for in-memory search. As of 2026, most vector databases and search engines with vector support offer HNSW, usually together with IVF and quantisation options; which index is best depends on collection size, memory, update rate and the recall the application needs, and should be measured.

::: warning A fast index can hide a recall problem
An ANN index trades exactness for speed silently: it returns $k$ results whatever happens, and nothing in the output says that the true nearest neighbour was missed. Measure the index's recall against brute force on a sample of real queries whenever you change its parameters, the embedding model or the collection, and do not confuse it with the relevance of the results — an index with perfect recall over a poor embedding still returns poor results. Filtering (for example "only documents from 2025") interacts badly with some indexes: if the filter is applied after an approximate search, few or no results may survive.
:::

::: quiz
For unit-normalised embeddings, a system switches its index from inner-product search to Euclidean-distance search. What happens to the results?
- [x] Nothing: by [[#eq-l2-dot]] the two rank the vectors identically.
- [ ] The order reverses, because distances are minimised and inner products maximised.
- [ ] Results change unless the index is rebuilt with a different number of cells.
- [ ] Euclidean search returns the vectors with the largest norms first.
::: solution
For unit vectors $\lVert\mathbf{q} - \mathbf{x}\rVert^2 = 2 - 2\mathbf{q}^\top\mathbf{x}$, a decreasing function of the inner product, so the smallest distances are exactly the largest inner products. (Approximate indexes may still return slightly different sets, because their internal structures differ, but the exact answers are the same.)
:::
:::

## Keyword search: BM25 {#sec-bm25}

Dense embeddings are not always the best retriever. They can miss exact matches that matter — a product code, a rare surname, an error message — because the embedding spreads meaning across dimensions and treats rare strings as noise. Keyword ranking functions match terms exactly and need no training. The most widely used is **BM25** (Robertson and colleagues in the 1990s; reviewed by Robertson and Zaragoza, 2009), derived from a probabilistic model of relevance in the [Computer Science Atlas](/learn/cs/lesson.php?c=information-retrieval&l=probabilistic-retrieval).

::: definition BM25 {#def-bm25}
For a query $q$ and a document $d$ of length $\mathrm{dl}_d$ tokens, in a collection of $N$ documents with average length $\mathrm{avgdl}$, where term $t$ occurs $\mathrm{tf}_{t,d}$ times in $d$ and in $n_t$ documents overall,

$$
\operatorname{BM25}(q, d) = \sum_{t\in q}\operatorname{idf}(t)\cdot\frac{(k_1 + 1)\,\mathrm{tf}_{t,d}}{\mathrm{tf}_{t,d} + k_1\big(1 - b + b\,\mathrm{dl}_d/\mathrm{avgdl}\big)},\qquad \operatorname{idf}(t) = \ln\!\Big(1 + \frac{N - n_t + 0.5}{n_t + 0.5}\Big),
$$ {#eq-bm25}

with parameters typically $k_1\in[1.2, 2]$ and $b = 0.75$. (The original Robertson–Spärck Jones weight $\ln\frac{N - n_t + 0.5}{n_t + 0.5}$ is negative for terms in more than half the documents; the "$1 +$" form, used by Lucene and many other engines, avoids that.)
:::

The fraction saturates: the first occurrence of a term counts most, further occurrences less, approaching the limit $k_1 + 1$; $k_1$ sets how fast. The factor $1 - b + b\,\mathrm{dl}/\mathrm{avgdl}$ penalises long documents, which contain more terms by chance; $b$ sets how strongly.

::: example BM25 by hand {#ex-bm25}
Five documents: $d_1$ *the cat sat on the mat* ($6$ tokens), $d_2$ *the dog chased the cat* ($5$), $d_3$ *dogs and cats are pets* ($5$), $d_4$ *a mat for a dog* ($5$), $d_5$ *the cat and the other cat* ($6$). Rank them for the query *cat mat* with $k_1 = 1.2$, $b = 0.75$.
::: solution
$N = 5$ and $\mathrm{avgdl} = 27/5 = 5.4$. The term *cat* occurs in $d_1$, $d_2$, $d_5$ ($n = 3$), *mat* in $d_1$, $d_4$ ($n = 2$):

$$
\operatorname{idf}(\textit{cat}) = \ln\!\big(1 + \tfrac{2.5}{3.5}\big) = 0.539, \qquad \operatorname{idf}(\textit{mat}) = \ln\!\big(1 + \tfrac{3.5}{2.5}\big) = 0.875.
$$

The length factor $K = 1.2(0.25 + 0.75\,\mathrm{dl}/5.4)$ is $1.3$ for $6$ tokens and $1.133$ for $5$. Then:

- $d_1$: $0.539\cdot\frac{2.2}{1 + 1.3} + 0.875\cdot\frac{2.2}{1 + 1.3} = 0.516 + 0.837 = 1.353$;
- $d_4$: $0.875\cdot\frac{2.2}{1 + 1.133} = 0.903$;
- $d_5$: $0.539\cdot\frac{2.2\cdot2}{2 + 1.3} = 0.719$;
- $d_2$: $0.539\cdot\frac{2.2}{1 + 1.133} = 0.556$;
- $d_3$: $0$.

The ranking is $d_1, d_4, d_5, d_2, d_3$. The rarer term *mat* weighs more than *cat*; $d_5$'s two occurrences of *cat* score less than twice one occurrence; and $d_3$, about cats, scores zero because *cats* is not the token *cat* — a vocabulary mismatch that stemming would fix and that dense retrieval handles naturally.
:::
:::

## Hybrid search {#sec-hybrid}

Keyword and dense retrieval fail differently: BM25 misses paraphrases, embeddings miss exact identifiers and rare words. Combining them is often better than either alone, and on the BEIR benchmark of zero-shot retrieval (Thakur et al., 2021) BM25 remained a strong baseline that many dense retrievers of the time did not beat outside their training domain. The two scores live on different scales — BM25 is unbounded, cosines lie in $[-1, 1]$ — so adding them requires normalisation that is fragile across queries. **Reciprocal rank fusion** sidesteps scores altogether.

::: definition Reciprocal rank fusion {#def-rrf}
Given rankings $r_1, \dots, r_m$ of a set of documents, where $r_j(d)$ is the rank (starting at $1$) of $d$ in ranking $j$, **reciprocal rank fusion** (RRF; Cormack, Clarke and Büttcher, 2009) scores

$$
\operatorname{RRF}(d) = \sum_{j=1}^{m}\frac{1}{k + r_j(d)},
$$

with a constant $k$, usually $k = 60$; a document absent from ranking $j$ contributes nothing for that ranking. Documents are returned in decreasing order of $\operatorname{RRF}(d)$.
:::

::: example Fusing two rankings {#ex-rrf}
For the query *cat mat*, BM25 ranks $d_1, d_4, d_5, d_2$ (from [[#ex-bm25]], omitting $d_3$, which scored zero). A dense retriever ranks $d_3, d_1, d_2, d_5$. Fuse them with $k = 60$.
::: solution
$d_1$: $\frac1{61} + \frac1{62} = 0.03252$. $d_5$: $\frac1{63} + \frac1{64} = 0.03150$. $d_2$: $\frac1{64} + \frac1{63} = 0.03150$. $d_3$: $\frac1{61} = 0.01639$. $d_4$: $\frac1{62} = 0.01613$. The fused order is $d_1$, then $d_5$ and $d_2$ tied, then $d_3$, then $d_4$. Documents that both retrievers rank reasonably well rise to the top. The large constant $k$ flattens the reward for being first: rank $1$ in one list ($0.0164$) is worth little more than rank $3$ ($0.0159$), so agreement between lists matters more than a single top position.
:::
:::

Other combinations exist: a weighted sum of normalised scores, learned fusion, and **learned sparse retrieval** such as SPLADE (Formal et al., 2021), which uses a Transformer to produce a sparse vector of weighted vocabulary terms (including related terms that do not occur in the text), searchable with an inverted index. As of 2026 many search engines and vector databases support hybrid retrieval natively, typically with RRF as the default fusion.

::: history
Nearest-neighbour search is old: $k$-d trees (Bentley, 1975) work well in low dimensions but degrade towards linear scans in high ones, the "curse of dimensionality". Locality-sensitive hashing (Indyk and Motwani, 1998) gave the first sublinear approximate methods with guarantees. Jégou, Douze and Schmid (2011) introduced product quantisation and the IVF-ADC index, and the FAISS library (Johnson, Douze and Jégou, 2017) made billion-scale search on GPUs practical. Graph-based search grew from navigable small-world graphs (Malkov et al., 2014) to HNSW (Malkov and Yashunin, 2016), with disk-based graph indexes (DiskANN, Subramanya et al., 2019) following. Shrivastava and Li (2014) and Bachrach et al. (2014) gave reductions of MIPS to nearest-neighbour search. On the lexical side, inverse document frequency goes back to Spärck Jones (1972) and BM25 to the Okapi system of Robertson and colleagues in the 1990s; Cormack, Clarke and Büttcher (2009) proposed reciprocal rank fusion, and dense–sparse hybrids became standard in retrieval for language models from about 2021.
:::

::: summary
- Exact $k$-nearest-neighbour search costs $Nd$ per query and is bandwidth-bound; it is exact and simple, and suffices for small collections and batches.
- For unit vectors, $\lVert\mathbf{q} - \mathbf{x}\rVert^2 = 2 - 2\mathbf{q}^\top\mathbf{x}$, so Euclidean, inner-product and cosine rankings coincide; unnormalised MIPS reduces to Euclidean search by appending one coordinate.
- IVF clusters the collection and probes the $n_{\text{probe}}$ nearest cells; recall rises and speed falls with $n_{\text{probe}}$, and cluster structure in the data is what makes it work.
- Product quantisation stores $m$ bytes per vector and computes distances by table look-ups; re-ranking with exact vectors restores precision.
- HNSW builds a layered proximity graph with levels drawn so that $NM^{-\ell}$ elements reach layer $\ell$, and searches greedily from the top; it gives excellent recall–speed trade-offs at a memory cost.
- Always measure an ANN index's recall against brute force; recall is not relevance.
- BM25 ranks by saturated, length-normalised term frequencies weighted by idf; hybrid search fuses keyword and vector rankings, most simply by reciprocal rank fusion.
:::

## Exercises

::: exercise Memory for exact search {level=1 check="30.72"}
How many gigabytes ($10^9$ bytes) do $10^7$ vectors of dimension $768$ occupy as 32-bit floats?
::: solution
$10^7\cdot768\cdot4 = 3.072\times10^{10}$ bytes, that is $30.72$ GB.
:::
:::

::: exercise Distance from cosine {level=1 check="0.632"}
Two unit vectors have cosine similarity $0.8$. What is their Euclidean distance, to three decimal places?
::: solution
By [[#eq-l2-dot]], $\sqrt{2 - 2\cdot0.8} = \sqrt{0.4} = 0.632$.
:::
:::

::: exercise Vectors scanned by IVF {level=1 check="80000"}
An IVF index holds $10^7$ vectors in $1000$ balanced cells. About how many vectors does a query with $n_{\text{probe}} = 8$ compare with, besides the centroids?
::: solution
Each cell holds $10^4$ vectors, and $8$ cells hold $8\cdot10^4 = 80{,}000$, $0.8\%$ of the collection.
:::
:::

::: exercise A PQ code {level=1 check="64"}
Vectors of dimension $1024$ are product-quantised into $64$ subvectors with $256$ centroids each. How many bytes is each code, and what is the compression factor against 32-bit floats?
::: solution
One byte per subvector: $64$ bytes, against $4096$ bytes — a factor of $64$.
:::
:::

::: exercise HNSW upper layers {level=2 check="31250"}
An HNSW index with $M = 32$ holds $10^6$ vectors. How many are expected in layer $1$ or above? About how many layers does the index have?
::: solution
By [[#prop-levels]], $10^6/32 = 31{,}250$ in layers $\ge1$, $977$ in $\ge2$, $31$ in $\ge3$ and about $1$ in $\ge4$: about $4$ layers ($\log_{32}10^6 = 3.99$).
:::
:::

::: exercise Another BM25 score {level=2 check="1.806"}
In the collection of [[#ex-bm25]], compute $\operatorname{BM25}(\textit{dog mat}, d_4)$, to three decimal places. Which document ranks second for this query?
::: solution
*dog* occurs in $d_2$ and $d_4$ ($n = 2$; *dogs* in $d_3$ does not match), so $\operatorname{idf}(\textit{dog}) = \ln(1 + 3.5/2.5) = 0.875$, the same as *mat*. For $d_4$ ($5$ tokens, $K = 1.133$) each term contributes $0.875\cdot2.2/2.133 = 0.903$, total $1.806$. Second is $d_2$ with $0.903$ (only *dog*), just ahead of $d_1$ with $0.837$ (only *mat*, but in a longer document).
:::
:::

::: exercise Rank fusion {level=1 check="0.0307"}
A document is ranked first by one retriever and tenth by another. What is its RRF score with $k = 60$, to four decimal places? Would it beat a document ranked fourth by both?
::: solution
$\frac1{61} + \frac1{70} = 0.01639 + 0.01429 = 0.0307$. A document ranked fourth by both scores $2/64 = 0.03125$, slightly more: RRF rewards consistent agreement.
:::
:::

::: exercise IVF on structureless data {level=2}
Change the listing so that every vector is drawn uniformly from the unit sphere (normalise a vector of independent standard normal coordinates) instead of from $25$ topics. Run it and compare recall at each $n_{\text{probe}}$. Explain the difference.
::: solution
Replace the sampling function by `def sample(): return unit([rng.gauss(0, 1) for _ in range(d)])`. The output is

```text
N=4000 d=16 nlist=40  list sizes min 79 max 119
nprobe  1: recall@10 0.312   vectors scanned   2.5%
nprobe  2: recall@10 0.484   vectors scanned   5.0%
nprobe  4: recall@10 0.666   vectors scanned  10.0%
nprobe  8: recall@10 0.844   vectors scanned  19.9%
nprobe 16: recall@10 0.978   vectors scanned  39.8%
```

The cells are now balanced, but recall at the same work is far lower: $31\%$ instead of $80\%$ with one probe. Uniform data have no clusters, so the cells are arbitrary slices of the sphere, and in $16$ dimensions a query's nearest neighbours are spread across many neighbouring cells. With clustered data a query and its neighbours usually fall in the same cluster. High-dimensional uniform data are the worst case for every ANN method; real embeddings are far from uniform, which is why indexes work in practice — but it is also why recall must be measured on real data.
:::
:::

::: exercise Normalisation matters {level=2}
Find two vectors $\mathbf{x}_1$, $\mathbf{x}_2$ and a unit query $\mathbf{q}$ in $\R^2$ for which the largest inner product and the largest cosine pick different vectors, and say which of the two the smallest Euclidean distance agrees with. What does this mean for a model trained with unnormalised inner products?
::: solution
Take $\mathbf{q} = (1, 0)$, $\mathbf{x}_1 = (1, 0)$ and $\mathbf{x}_2 = (3, 3)$. Inner products: $1$ and $3$, so inner product picks $\mathbf{x}_2$. Cosines: $1$ and $0.707$, so cosine picks $\mathbf{x}_1$. Distances: $0$ and $\sqrt{4 + 9} = 3.61$, so Euclidean distance picks $\mathbf{x}_1$, agreeing with cosine here. Inner product favours long vectors; when a model was trained with unnormalised inner products, the norm carries information (for example popularity or confidence), and normalising at search time changes the results.
:::
:::

::: exercise The MIPS reduction in practice {level=3}
Apply [[#prop-mips]] to $\mathbf{x}_1 = (1, 0)$, $\mathbf{x}_2 = (3, 3)$ with $M = \sqrt{18}$ and the query $\mathbf{q} = (1, 0)$. Verify that Euclidean search on the transformed vectors returns the inner-product winner. Then explain why the transformation tends to hurt approximate indexes when the norms vary widely.
::: solution
$\tilde{\mathbf{x}}_1 = (1, 0, \sqrt{17})$, $\tilde{\mathbf{x}}_2 = (3, 3, 0)$, $\tilde{\mathbf{q}} = (1, 0, 0)$. Squared distances: $0 + 0 + 17 = 17$ and $4 + 9 + 0 = 13$, so Euclidean search returns $\mathbf{x}_2$, the inner-product winner ($3 > 1$), as the formula $1 + 18 - 2\mathbf{q}^\top\mathbf{x}_i$ predicts ($17$ and $13$). When norms vary widely, most vectors are short and get a large extra coordinate, so they crowd together near the "pole" of the new coordinate, while the query has none; all distances become large and similar ($\lVert\mathbf{q}\rVert^2 + M^2$ dominates), the relative differences that clustering and graph construction rely on shrink, and approximate indexes lose recall. Normalising embeddings at training time avoids the problem.
:::
:::
