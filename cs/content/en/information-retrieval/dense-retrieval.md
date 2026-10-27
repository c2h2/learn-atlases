A user asks `how do I repair a punctured bicycle tyre`, and the best page in the collection is titled "Fixing a flat on your bike" and never uses the words *repair*, *punctured*, *bicycle* or *tyre*. Every ranking function so far — Boolean matching, tf–idf, BM25, query likelihood — scores a document by the query terms it contains, so this page scores zero. This is the **vocabulary mismatch** problem, as old as the field: stemming ([[information-retrieval/text-processing]]) fixes `repair`/`repairs` but not `repair`/`fix`, and query expansion and relevance feedback ([[information-retrieval/vector-space]]) help only when the first results are good. What is needed is a representation in which texts with similar *meanings* are close, whatever words they use.

**Dense retrieval** represents queries and documents as vectors of a few hundred real numbers, **embeddings**, produced by a neural network trained so that a query's vector lies near the vectors of documents relevant to it, and retrieves by **nearest-neighbour search**. This chapter treats the parts of the subject that belong to information retrieval. How the encoder networks work and how they are pre-trained are subjects of the LLM Atlas ([text embeddings](/learn/llm/lesson.php?c=prompting-rag&l=text-embeddings), [transformers](/learn/llm/lesson.php?c=transformers&l=self-attention)), so we introduce learned representations only briefly — the bi-encoder architecture and the contrastive loss used to train it — and concentrate on what happens after: reducing maximum inner-product search to nearest-neighbour search, the **approximate nearest-neighbour** indexes that make search over millions of vectors fast (inverted-file indexes, product quantisation and graph-based search, each implemented and measured on synthetic data), combining dense and lexical retrieval, re-ranking with cross-encoders, and evaluation. The chapter closes with retrieval for language models.

## Embeddings and the bi-encoder

::: definition Bi-encoder dense retrieval {#def-biencoder}
A **dense retriever** consists of a query encoder $E_Q$ and a document encoder $E_D$ (often the same network) mapping text to vectors in $\R^d$, typically with $d$ between $128$ and $4\,096$. The relevance score is the inner product
$$
s(q, d) = E_Q(q) \cdot E_D(d)
$$
(or the cosine, which is the inner product of normalised vectors). Document vectors are computed **offline**, once per document, and stored in an index; at query time the system encodes the query and returns the $k$ documents with the largest scores. Because query and document are encoded separately, the architecture is called a **bi-encoder** (or dual encoder).
:::

The vectors are **dense**: almost every coordinate is non-zero, and no coordinate corresponds to a word. This is the opposite of the tf–idf vectors of [[information-retrieval/vector-space#def-vsm]], which have one dimension per term and are almost entirely zero. Dense vectors can place "fix a flat" near "repair a puncture" because the encoder has learned, from vast amounts of text, that these phrases are used in similar contexts. The idea is older than neural networks: **latent semantic indexing** (Deerwester and colleagues, 1990) took the truncated singular value decomposition of the term–document matrix, obtaining dense document vectors in a space of a few hundred "concepts" ([Maths Atlas: the SVD](/learn/maths/lesson.php?c=linear-algebra&l=svd)). Neural encoders, starting with Sentence-BERT (Reimers and Gurevych, 2019) and Dense Passage Retrieval (DPR; Karpukhin and colleagues, 2020), made the approach competitive with BM25 and then, on many benchmarks, better.

### Training with a contrastive loss

The encoders are trained on pairs $(q, d^+)$ of queries and relevant passages — from question-answering data sets, click logs, or pairs mined from the web, such as titles and bodies. For each pair, a set of **negatives** $d^-_1, \dots, d^-_{n-1}$ is drawn, and the model is trained to pick out the positive.

::: definition Contrastive (InfoNCE) loss {#def-infonce}
For a query $q$ with one positive $d_1 = d^+$ and negatives $d_2, \dots, d_n$, with scores $s_j = s(q, d_j)$ and a **temperature** $\tau > 0$, let $p_j = e^{s_j/\tau}/\sum_{l=1}^n e^{s_l/\tau}$. The **contrastive loss** is
$$
L = -\log p_1 = -\frac{s_1}{\tau} + \log\sum_{l=1}^{n} e^{s_l/\tau}.
$$
:::

::: proposition Gradient of the contrastive loss {#prop-infonce-grad}
$\dfrac{\partial L}{\partial s_j} = \dfrac{1}{\tau}\bigl(p_j - \mathbf 1[j = 1]\bigr)$. Hence the loss raises the positive's score with force $(1 - p_1)/\tau$ and lowers each negative's score with force $p_j/\tau$: negatives the model currently scores highly, the **hard** negatives, are pushed hardest.
:::

::: proof
Differentiate: $\partial(-s_1/\tau)/\partial s_j = -\mathbf 1[j = 1]/\tau$, and $\partial \log\sum_l e^{s_l/\tau}/\partial s_j = \frac{e^{s_j/\tau}/\tau}{\sum_l e^{s_l/\tau}} = p_j/\tau$. Adding gives the result. Since $\sum_j p_j = 1$, the forces on the negatives sum to the force on the positive.
:::

This is the softmax cross-entropy of ListNet ([[information-retrieval/learning-to-rank]]) with a single relevant document, and of multinomial logistic regression. Two practical points follow from the gradient. **In-batch negatives**: with a batch of $B$ query–positive pairs, the positives of the other $B - 1$ queries serve as negatives, giving many negatives at no extra encoding cost. **Hard negatives**: random negatives are easy and soon have $p_j \approx 0$, contributing nothing; negatives retrieved by BM25 or by the current model are harder and teach more, but some of them are actually relevant documents that were never labelled, and pushing them away harms the model. Training recipes for embedding models — the choice of data, negatives, temperature, model size — change quickly; the [LLM Atlas](/learn/llm/lesson.php?c=prompting-rag&l=text-embeddings) discusses them.

::: example A contrastive loss by hand {#ex-infonce}
A query scores its positive at $0.8$ and three negatives at $0.5$, $0.3$ and $0.1$ (cosine similarities). Compute $p_1$, the loss and the forces for $\tau = 0.1$, then for $\tau = 0.05$.
::: solution
With $\tau = 0.1$ the exponents are $8, 5, 3, 1$, so $p = (e^8, e^5, e^3, e^1)/(e^8 + e^5 + e^3 + e) = (0.9457, 0.0471, 0.0064, 0.0009)$ and $L = -\ln 0.9457 = 0.0558$. The force on the positive is $(1 - 0.9457)/0.1 = 0.54$, shared among the negatives as $0.47$, $0.06$ and $0.01$: almost all of it falls on the hardest negative, the one at $0.5$. With $\tau = 0.05$ the exponents double, $p_1 = 0.9975$ and $L = 0.0025$; the loss is nearly satisfied. A smaller temperature sharpens the distribution, so that a fixed margin between positive and negatives counts for more; temperatures between about $0.01$ and $0.1$ are common for cosine scores.
:::
:::

::: widget plot
f: 1/(1 + (n - 1)*exp(-x/t))
sliders: n=2:1:256; t=0.01:0.01:0.5
x: 0, 1
y: 0, 1
labels: p_{+} \text{ when the positive beats every negative by } \Delta
caption: The probability the contrastive loss assigns to the positive when it scores $\Delta$ higher (the horizontal axis) than each of $n - 1$ equally scored negatives, $p_+ = 1/(1 + (n-1)e^{-\Delta/\tau})$. With more negatives the model needs a larger margin for the same $p_+$; with a smaller temperature a small margin suffices. Set $n = 256$ (a large batch) and compare $\tau = 0.05$ with $\tau = 0.5$.
:::

## From maximum inner product to nearest neighbours

Retrieval with a bi-encoder is **maximum inner-product search** (MIPS): given $\vec q$, find the stored vectors $\vec x$ maximising $\vec q \cdot \vec x$. Exact search computes all $N$ inner products, $\Theta(Nd)$ operations per query — for $N = 10^8$ passages and $d = 768$, about $10^{11}$ multiply–adds, far too slow for interactive search on one machine. Approximate methods were largely developed for **nearest-neighbour search** in Euclidean distance, so we first connect the two problems.

If all vectors are normalised to unit length, there is nothing to do: by [[information-retrieval/vector-space#prop-cosine]], $\norm{\vec q - \vec x}^2 = 2 - 2\,\vec q\cdot\vec x$, so the largest inner products are the smallest distances. Many embedding models produce normalised vectors for this reason. For unnormalised vectors a simple augmentation works.

::: theorem Reducing MIPS to nearest-neighbour search {#thm-mips}
Let every stored vector satisfy $\norm{\vec x} \le M$. Map each stored vector to $\vec x' = \bigl(\vec x,\ \sqrt{M^2 - \norm{\vec x}^2}\bigr) \in \R^{d+1}$ and the query to $\vec q' = (\vec q, 0)$. Then
$$
\norm{\vec q' - \vec x'}^2 = \norm{\vec q}^2 + M^2 - 2\,\vec q\cdot\vec x,
$$
so the stored vector nearest to $\vec q'$ in Euclidean distance is the one with the largest inner product with $\vec q$.
:::

::: proof
Every augmented stored vector has $\norm{\vec x'}^2 = \norm{\vec x}^2 + M^2 - \norm{\vec x}^2 = M^2$, and $\vec q'\cdot\vec x' = \vec q\cdot\vec x + 0$. Expanding, $\norm{\vec q' - \vec x'}^2 = \norm{\vec q'}^2 - 2\vec q'\cdot\vec x' + \norm{\vec x'}^2 = \norm{\vec q}^2 - 2\vec q\cdot\vec x + M^2$. The first and last terms do not depend on $\vec x$, so minimising the distance maximises $\vec q\cdot\vec x$.
:::

::: example Inner product is not distance {#ex-mips}
Stored vectors are $\vec x_1 = (3, 0)$, $\vec x_2 = (1, 1)$, $\vec x_3 = (0, 2)$ and the query is $\vec q = (1, 2)$. Find the best match by inner product, by plain Euclidean distance, and by Euclidean distance after the augmentation of [[#thm-mips]] with $M = 3$.
::: solution
Inner products: $3$, $3$, $4$; the best is $\vec x_3$. Squared distances $\norm{\vec q - \vec x}^2$: $(1-3)^2 + 2^2 = 8$, $0 + 1 = 1$, $1 + 0 = 1$ — a tie between $\vec x_2$ and $\vec x_3$, so plain nearest-neighbour search can return the wrong answer. Augmented: $\vec x_1' = (3, 0, 0)$, $\vec x_2' = (1, 1, \sqrt7)$, $\vec x_3' = (0, 2, \sqrt5)$ and $\vec q' = (1, 2, 0)$; squared distances $8$, $8$, $6$, which are $\norm{\vec q}^2 + M^2 - 2\vec q\cdot\vec x = 14 - 2 \times (3, 3, 4)$. The nearest is $\vec x_3$, as required.
:::
:::

## Approximate nearest-neighbour search

Exact nearest-neighbour search in high dimensions resists clever indexing: tree structures such as $k$-d trees degrade to scanning almost everything once $d$ exceeds a few tens, and lower bounds suggest that no exact method can do much better than a scan in the worst case. Practical systems therefore accept **approximate** answers, measured by **recall@$k$**: the fraction of the true $k$ nearest neighbours that the method returns. Three families dominate, each trading recall against time and memory; the first, **locality-sensitive hashing**, with random-hyperplane hash functions, was met in [[information-retrieval/web-search#thm-hyperplane]]. The other two are clustering and graphs.

To measure them we use synthetic data: $N = 10\,000$ unit vectors in $d = 16$ dimensions, drawn around $50$ random cluster centres, and $50$ queries that are perturbed copies of stored vectors. The true top $10$ of each query is computed by exhaustive search. Real embeddings have hundreds of dimensions and millions of vectors, so the numbers below are **observations** on a toy problem that show the shape of the trade-offs, not benchmarks.

```python
import math, random, heapq
rng = random.Random(2026)
d, n, nq, k = 16, 10000, 50, 10
def unit(v):
    s = math.sqrt(sum(x * x for x in v)); return [x / s for x in v]
centres = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(50)]
data = [unit([c + rng.gauss(0, 0.6) for c in rng.choice(centres)]) for _ in range(n)]
queries = [unit([x + rng.gauss(0, 0.3) for x in rng.choice(data)]) for _ in range(nq)]
dot = lambda u, v: sum(a * b for a, b in zip(u, v))
def exact(q, k=k):
    return [i for _, i in heapq.nlargest(k, ((dot(q, x), i) for i, x in enumerate(data)))]
truth = [set(exact(q)) for q in queries]
```

### Inverted-file indexes

::: algorithm IVF search {#alg-ivf}
*Build.* Cluster the stored vectors into $C$ cells with $k$-means, giving centroids $\vec c_1, \dots, \vec c_C$, and store each vector in the **inverted list** of its nearest centroid.
*Search.* For a query $\vec q$, find the $n_{\mathrm{probe}}$ centroids with the largest $\vec q\cdot\vec c_j$, scan the vectors in those cells exactly, and return the best $k$.
:::

This is an inverted index ([[information-retrieval/inverted-indexes]]) whose "terms" are cluster centroids. With $C$ cells of roughly equal size, a query costs about $Cd$ for the centroids plus $n_{\mathrm{probe}}(N/C)d$ for the lists, minimised near $C \approx \sqrt{N n_{\mathrm{probe}}}$. Errors occur when a true neighbour lies in a cell whose centroid is not among the $n_{\mathrm{probe}}$ closest — typically a vector near a cell boundary. With $C = 100$ cells:

```text
  nprobe= 1  recall@10=0.560  vectors scanned=  1.3%
  nprobe= 2  recall@10=0.732  vectors scanned=  2.3%
  nprobe= 4  recall@10=0.850  vectors scanned=  4.2%
  nprobe= 8  recall@10=0.946  vectors scanned=  8.3%
  nprobe=16  recall@10=0.990  vectors scanned= 16.2%
  nprobe=32  recall@10=1.000  vectors scanned= 32.3%
```

Probing one cell finds only $56\%$ of the true neighbours; probing $8$ of $100$ finds $95\%$ while scanning $8\%$ of the vectors. (Cells are unequal in size, which is why the fraction scanned is not exactly $n_{\mathrm{probe}}/C$.) The parameter $n_{\mathrm{probe}}$ is a dial from fast-and-rough to slow-and-exact, chosen at query time.

### Product quantisation

Memory is the other constraint. $10^8$ vectors of $768$ $32$-bit floats occupy $307$ GB. **Product quantisation** (PQ; Jégou, Douze and Schmid, 2011) compresses each vector to a few bytes.

::: definition Product quantisation {#def-pq}
Split $\R^d$ into $m$ subspaces of dimension $d/m$, writing $\vec x = (\vec x^{(1)}, \dots, \vec x^{(m)})$. For each subspace $s$, learn a **codebook** of $K$ centroids $\vec c^{(s)}_1, \dots, \vec c^{(s)}_K$ by $k$-means on the subvectors. Encode $\vec x$ as the $m$ indices $\bigl(i_1, \dots, i_m\bigr)$ of the nearest centroid in each subspace, using $m\log_2 K$ bits; the vector is approximated by $\tilde{\vec x} = (\vec c^{(1)}_{i_1}, \dots, \vec c^{(m)}_{i_m})$.
:::

The approximation set has $K^m$ points — with $m = 8$ and $K = 256$, $2^{64}$ — though only $mK$ centroids are stored. Scores can be computed without decompressing.

::: proposition Asymmetric distance computation {#prop-adc}
For a query $\vec q$ and an encoded vector with codes $(i_1, \dots, i_m)$,
$$
\vec q\cdot\tilde{\vec x} = \sum_{s=1}^{m} \vec q^{(s)}\cdot\vec c^{(s)}_{i_s}, \qquad \norm{\vec q - \tilde{\vec x}}^2 = \sum_{s=1}^{m}\norm{\vec q^{(s)} - \vec c^{(s)}_{i_s}}^2.
$$
After precomputing a table of the $mK$ values $\vec q^{(s)}\cdot\vec c^{(s)}_i$ (cost $O(Kd)$ per query), each encoded vector is scored with $m$ table look-ups and additions.
:::

::: proof
Both the inner product and the squared Euclidean norm are sums over coordinates, and the coordinates are partitioned among the $m$ subspaces, so each splits into a sum over subspaces. The table has one entry for each subspace $s$ and centroid $i$, computed by $K$ inner products of length $d/m$ in each of $m$ subspaces, $Kd$ multiplications in all.
:::

It is "asymmetric" because the query is used exactly and only the stored vectors are quantised. With $K = 16$ centroids per subspace ($4$ bits per code) and $m = 4, 8, 16$ subspaces, on the synthetic data, scoring all vectors with PQ and then (optionally) re-scoring the best $100$ exactly:

```text
m= 4: 16 bits/vector (vs 512)  recall@10 PQ only 0.200  after re-ranking 100: 0.638
m= 8: 32 bits/vector (vs 512)  recall@10 PQ only 0.326  after re-ranking 100: 0.918
m=16: 64 bits/vector (vs 512)  recall@10 PQ only 0.632  after re-ranking 100: 1.000
```

PQ scores alone are coarse — the quantisation error is comparable to the differences between near neighbours — but they are good enough to pick $100$ candidates that contain most of the true top $10$, which exact scores then sort out. With $8$ bytes per vector instead of $64$, recall after re-ranking is perfect here. Production systems combine the two ideas, **IVF-PQ**: an inverted file to choose cells, PQ codes (often of the residual $\vec x - \vec c_j$ from the cell centroid) within them, and exact re-ranking of a short list from full vectors stored elsewhere. The FAISS library (Johnson, Douze and Jégou, 2017) made these methods widely available, including on GPUs.

::: example Sizing a vector index {#ex-sizing}
A collection of $N = 10^8$ passages is embedded with $d = 768$. Estimate the memory for (a) $32$-bit float vectors, (b) PQ codes with $m = 64$ subspaces and $K = 256$, and (c) the cost of scoring one query against all codes by asymmetric distance.
::: solution
(a) $10^8 \times 768 \times 4$ bytes $= 3.07 \times 10^{11}$ bytes, about $307$ GB (or $286$ GiB). (b) Each vector takes $64$ codes of $8$ bits, $64$ bytes: $6.4$ GB in all, a compression factor of $48$, plus the codebooks, $64 \times 256$ centroids of $12$ dimensions, about $0.8$ MB. (c) The look-up table costs $Kd = 256 \times 768 \approx 2 \times 10^5$ multiplications; scoring then needs $64$ look-ups and additions per vector, $6.4 \times 10^9$ in all — still a lot for one query, which is why PQ is combined with an inverted file that scans only a few per cent of the codes.
:::
:::

### Graph-based search

The most widely used ANN indexes as of 2026 are **graph-based**: every stored vector is a node, linked to some of its near neighbours, and a query is answered by walking the graph towards the query.

::: algorithm Greedy beam search on a proximity graph {#alg-beam}
Input: a graph on the stored vectors, an entry node $e$, a query $\vec q$ and a beam width $\mathit{ef} \ge k$.
1. $\mathit{visited} \gets \set{e}$; a max-priority queue $F$ of nodes to expand and a bounded set $B$ of the $\mathit{ef}$ best nodes found, both initialised with $e$ and its similarity to $\vec q$.
2. While $F$ is non-empty: remove the most similar node $u$ from $F$. If $B$ is full and $u$ is less similar than the worst node of $B$, stop. Otherwise, for each unvisited neighbour $v$ of $u$: mark it visited, compute its similarity, and if $B$ is not full or $v$ beats the worst of $B$, insert $v$ into $F$ and $B$ (evicting the worst of $B$ if it overflows).
3. Return the $k$ best nodes of $B$.
:::

The search computes similarities only for the nodes it visits — a few hundred out of millions in a good graph. Its quality depends on the graph. A pure $k$-nearest-neighbour graph links each node only to nodes very near it, so on clustered data it is badly connected between clusters and the walk gets stuck in the cluster of the entry point. **Navigable small-world** graphs (Malkov and colleagues, 2014) are built incrementally, linking each newly inserted vector to its nearest neighbours among those already inserted; the earliest nodes, inserted when the graph was sparse, receive long-range links that let a search cross the space quickly. On $2\,000$ of the synthetic vectors, with $8$ links per node (for simplicity the neighbours at insertion are found by exhaustive search, where real builders use the search algorithm itself) and the search started from node $0$:

```text
k-NN graph              ef=10  recall@10=0.138  similarities=  67.4 of 2000
k-NN graph              ef=40  recall@10=0.490  similarities= 173.6 of 2000
k-NN graph              ef=80  recall@10=0.778  similarities= 293.8 of 2000
incremental (NSW) graph ef=10  recall@10=0.702  similarities= 154.9 of 2000
incremental (NSW) graph ef=40  recall@10=0.932  similarities= 253.9 of 2000
incremental (NSW) graph ef=80  recall@10=0.972  similarities= 365.9 of 2000
```

The incremental graph reaches $93\%$ recall after computing about $250$ of $2\,000$ similarities; the $k$-NN graph, with the same number of links, reaches only $49\%$ with comparable effort. **HNSW** (hierarchical navigable small world; Malkov and Yashunin, 2016, journal version 2020) adds a hierarchy: each node is assigned a random level with exponentially decreasing probability, upper levels contain few nodes with long links, and a search descends greedily from the top level to the bottom, like a skip list in many dimensions. It also prunes each node's neighbour list with a heuristic that prefers diverse directions. HNSW gives high recall at low latency but keeps full vectors and graph links in memory; disk-based graph indexes and combinations with quantisation address larger collections.

::: quiz
An IVF index has $C = 1\,000$ cells over $N = 10^7$ vectors of dimension $d$. With $n_{\mathrm{probe}} = 10$, roughly how many vectors does a query scan, and what is the main cause of missed neighbours?
- [ ] $10^7$; IVF only saves memory
- [x] About $10^5$; neighbours that lie in cells whose centroids are not among the $10$ nearest to the query
- [ ] About $10$; the centroids themselves are returned
- [ ] About $10^5$; quantisation error in the stored vectors
::: solution
Each cell holds about $N/C = 10^4$ vectors, so $10$ cells hold about $10^5$, $1\%$ of the collection, plus $1\,000$ centroid comparisons. IVF itself stores exact vectors, so errors come only from the choice of cells: a true neighbour near a cell boundary may be assigned to a cell not probed. Quantisation error arises when IVF is combined with PQ.
:::
:::

## Combining dense and lexical retrieval

Dense retrieval does not replace lexical matching. Embeddings capture topical similarity well but can miss exact requirements: a product code, a rare name, a specific error message or a number. In the BEIR benchmark (Thakur and colleagues, 2021), which tests retrievers on collections they were not trained on, BM25 was a strong baseline, and several dense models of the time scored below it on many of the collections — a reminder that a model trained on one kind of query may not transfer to another. Most systems therefore combine the two.

**Hybrid retrieval** runs BM25 and dense retrieval in parallel and merges the result lists. Scores from different models are on incomparable scales, so a robust choice merges by rank.

::: definition Reciprocal rank fusion {#def-rrf}
Given rankings $\pi_1, \dots, \pi_m$ from different systems, **reciprocal rank fusion** (Cormack, Clarke and Büttcher, 2009) scores each document by
$$
\mathrm{RRF}(d) = \sum_{i=1}^{m} \frac{1}{\kappa + \pi_i(d)},
$$
where $\pi_i(d)$ is the rank of $d$ in the $i$-th list (a document absent from a list contributes $0$) and $\kappa$ is a constant, $60$ in the original paper.
:::

::: example Fusing two rankings {#ex-rrf}
BM25 returns $d_1, d_2, d_3, d_4$ and a dense retriever returns $d_3, d_1, d_5, d_6$. Fuse them with RRF and $\kappa = 60$.
::: solution
$d_1$: $\frac{1}{61} + \frac{1}{62} = 0.03252$. $d_3$: $\frac{1}{63} + \frac{1}{61} = 0.03227$. $d_2$: $\frac{1}{62} = 0.01613$. $d_5$: $\frac{1}{63} = 0.01587$. $d_4$ and $d_6$: $\frac{1}{64} = 0.01563$ each. The fused ranking is $d_1, d_3, d_2, d_5$, then $d_4$ and $d_6$ tied. Documents found by both systems rise to the top; with $\kappa = 60$ the difference between ranks $1$ and $2$ is small, so agreement between systems matters more than a top position in one. Smaller $\kappa$ rewards top positions more.
:::
:::

**Learned sparse retrieval** takes a different route to the same goal. Models such as DeepCT, doc2query and SPLADE (Formal and colleagues, 2021) use a neural network to assign weights to terms — including terms that do not occur in the document but are likely to be searched for, such as `fix` for a page about repairs — and store the result in an ordinary inverted index. Query processing is then the WAND or MaxScore of [[information-retrieval/vector-space]], with all the efficiency of lexical search.

## Re-ranking with cross-encoders

A bi-encoder must compress a whole document into one vector before seeing the query. A **cross-encoder** reads the query and the document *together*, as one input to a transformer, and outputs a single relevance score; every word of the query can attend to every word of the document. Cross-encoders are much more accurate than bi-encoders of the same size, and much more expensive: nothing can be precomputed, and each (query, document) pair costs a full forward pass of the network. They are therefore used to **re-rank** the top $k$ candidates — typically $50$ to $1\,000$ — of a first-stage retriever, the multi-stage architecture of [[information-retrieval/learning-to-rank]] with a neural last stage.

Between the two lies **late interaction**. ColBERT (Khattab and Zaharia, 2020) stores one vector per *token* of each document and scores by
$$
s(q, d) = \sum_{i \in q} \max_{j \in d} \vec q_i \cdot \vec d_j,
$$
the sum, over query tokens, of the best match among document tokens — a soft, learned version of term matching. It is more accurate than single-vector bi-encoders and much cheaper than cross-encoders, at the cost of storing tens to hundreds of vectors per document, which are usually compressed.

::: warning Similar is not the same as relevant, or true
A dense retriever returns the passages whose embeddings are closest to the query's, and closeness reflects whatever the training data taught. Passages that *look* like answers — same topic, same vocabulary, confident tone — score highly whether or not they answer the question, and a question with a false premise retrieves passages that seem to support it. Negation is a well-known weakness: "drugs that do not interact with warfarin" may retrieve passages about drugs that do. Embeddings also inherit the biases of their training text. Evaluate retrieval with relevance judgements on your own queries ([[information-retrieval/evaluation]]), not with impressions of a few examples, and when retrieved passages feed a language model, evaluate the final answers too.
:::

## Retrieval for language models

**Retrieval-augmented generation** (RAG; Lewis and colleagues, 2020) gives a language model access to a collection: for each user request, retrieve the most relevant passages and include them in the model's input, so that the model can answer from current, specific and citable sources rather than only from what it memorised in training. Every part of this course is involved. Documents are split into passages of a few hundred tokens (the **chunking** decision is the choice of retrieval unit of [[information-retrieval/text-processing#def-collection]]); passages are indexed lexically, densely or both; retrieval is hybrid and re-ranked; and the result is judged both as retrieval (did the relevant passages appear in the top $k$?) and as generation (is the answer supported by them?). The generation side — how models use retrieved context, hallucination, citation and the evaluation of RAG systems — is developed in the [LLM Atlas](/learn/llm/lesson.php?c=prompting-rag&l=retrieval-augmented-generation), and vector databases in [LLM Atlas: vector search](/learn/llm/lesson.php?c=prompting-rag&l=vector-search).

::: history
Scott Deerwester, Susan Dumais, George Furnas, Thomas Landauer and Richard Harshman introduced latent semantic indexing in "Indexing by latent semantic analysis" (*Journal of the American Society for Information Science*, 1990). Piotr Indyk and Rajeev Motwani's locality-sensitive hashing (1998) and Hervé Jégou, Matthijs Douze and Cordelia Schmid's "Product quantization for nearest neighbor search" (*IEEE TPAMI*, 2011) were landmarks of approximate search; Yury Malkov and Dmitry Yashunin's HNSW appeared as a preprint in 2016 and in *IEEE TPAMI* in 2020, and Jeff Johnson, Douze and Jégou released FAISS in 2017. Gordon Cormack, Charles Clarke and Stefan Büttcher proposed reciprocal rank fusion at SIGIR 2009. In the neural era, the MS MARCO passage-ranking data set (Nguyen and colleagues, 2016) provided training data at scale; Nils Reimers and Iryna Gurevych's Sentence-BERT (2019), Rodrigo Nogueira and Kyunghyun Cho's BERT re-ranker (2019), Vladimir Karpukhin and colleagues' Dense Passage Retrieval (2020), Omar Khattab and Matei Zaharia's ColBERT (2020) and Patrick Lewis and colleagues' retrieval-augmented generation (2020) established the architectures, and Nandan Thakur and colleagues' BEIR benchmark (2021) tested how well they generalise.
:::

## Where this leads

Dense retrieval completes the arc of this course from exact matching of words to learned matching of meanings, but it reuses almost every earlier idea: the choice of retrieval unit and tokenisation, inverted lists (now of clusters), compression (now of vectors), top-$k$ selection and pruning, probabilistic scoring as a strong baseline, evaluation with judgements and significance tests, near-duplicate removal by hashing, and multi-stage ranking. The encoders themselves, contrastive training, vector databases and retrieval for language models continue in the LLM Atlas ([text embeddings](/learn/llm/lesson.php?c=prompting-rag&l=text-embeddings), [retrieval-augmented generation](/learn/llm/lesson.php?c=prompting-rag&l=retrieval-augmented-generation)). Distributing a vector index across machines raises the partitioning questions of [[distributed-systems/distributed-storage]], and running ANN search on GPUs is an application of [[parallel-computing/gpu-programming]].

::: summary
- A **bi-encoder** ([[#def-biencoder]]) maps queries and documents separately to dense vectors and scores by inner product; document vectors are computed offline, so retrieval is a nearest-neighbour search. It addresses vocabulary mismatch.
- Encoders are trained with a **contrastive loss** ([[#def-infonce]]) whose gradient pushes hardest on high-scoring negatives ([[#prop-infonce-grad]]); in-batch and hard negatives matter, and unlabelled positives among the negatives hurt.
- **MIPS** reduces to Euclidean nearest-neighbour search by one extra coordinate ([[#thm-mips]]); for unit vectors the two coincide.
- **IVF** ([[#alg-ivf]]) scans only the cells nearest the query; **product quantisation** ([[#def-pq]]) compresses vectors to a few bytes and scores them by table look-ups ([[#prop-adc]]); **graph search** ([[#alg-beam]]) on navigable small-world graphs such as HNSW visits a few hundred nodes. All trade recall@$k$ against time and memory, measured empirically.
- Dense and lexical retrieval are complementary; **reciprocal rank fusion** ([[#def-rrf]]) merges them robustly, and learned sparse models put neural term weights into an inverted index.
- **Cross-encoders** re-rank a short list accurately but expensively; late interaction (ColBERT) is a middle ground.
- Retrieval-augmented generation applies the whole pipeline to feeding language models, and must be evaluated as retrieval and as generation.
:::

## Exercises

::: exercise Exhaustive search cost {level=1 check="10^6 * 384"}
How many multiply–add operations does exhaustive inner-product search over $10^6$ vectors of dimension $384$ take per query? (Enter the number.)
::: solution
One inner product of length $384$ per stored vector: $10^6 \times 384 = 3.84 \times 10^8$ multiply–adds. At an effective $10^{10}$ per second on one CPU core with SIMD this is about $40$ ms — acceptable for a million vectors, too slow for a billion.
:::
:::

::: exercise PQ code size {level=1 check="96"}
Vectors of dimension $768$ are product-quantised with $m = 96$ subspaces and $K = 256$ centroids each. How many bytes does each code occupy? (Enter the number of bytes.)
::: solution
Each subspace index needs $\log_2 256 = 8$ bits, one byte, so a code is $96$ bytes, against $768 \times 4 = 3\,072$ bytes for the float vector: compression by $32$. Each subspace has dimension $768/96 = 8$.
:::
:::

::: exercise RRF with three lists {level=1}
Three systems rank document $d$ at positions $1$, $10$ and (absent). Document $e$ is at $3$, $3$, $3$. With $\kappa = 60$, which ranks higher after reciprocal rank fusion?
::: solution
$\mathrm{RRF}(d) = 1/61 + 1/70 = 0.01639 + 0.01429 = 0.03068$. $\mathrm{RRF}(e) = 3/63 = 0.04762$. Document $e$, found consistently by all three systems, wins clearly over $d$, which one system placed first. RRF rewards consensus.
:::
:::

::: exercise The contrastive loss with many negatives {level=2}
A query's positive scores $0.6$ and each of $n - 1$ negatives scores $0.4$, with $\tau = 0.05$. Compute $p_+$ for $n = 2$ and $n = 1024$. What margin would make $p_+ = 0.9$ with $1024$ candidates?
::: solution
$p_+ = 1/(1 + (n - 1)e^{-\Delta/\tau})$ with $\Delta = 0.2$, $\Delta/\tau = 4$, $e^{-4} = 0.0183$. For $n = 2$: $p_+ = 1/1.0183 = 0.982$. For $n = 1024$: $p_+ = 1/(1 + 1023 \times 0.0183) = 1/19.74 = 0.0507$. For $p_+ = 0.9$ we need $(n-1)e^{-\Delta/\tau} = 1/9$, so $\Delta = \tau\ln(9 \times 1023) = 0.05 \times 9.13 = 0.457$. With many negatives the model must separate positives by a much larger margin, which is one reason large batches give better embeddings.
:::
:::

::: exercise IVF parameters {level=2 check="sqrt(10^8 * 16)"}
For an IVF index over $N = 10^8$ vectors with $n_{\mathrm{probe}} = 16$, the cost per query is about $C + n_{\mathrm{probe}}N/C$ vector comparisons. Which number of cells $C$ minimises it? (Enter $C$.)
::: solution
Minimising $f(C) = C + n_{\mathrm{probe}}N/C$: $f'(C) = 1 - n_{\mathrm{probe}}N/C^2 = 0$ gives $C = \sqrt{n_{\mathrm{probe}}N} = \sqrt{1.6 \times 10^9} = 40\,000$. The cost is then $2C = 80\,000$ comparisons, $0.08\%$ of the collection. In practice $C$ is often chosen larger than this optimum and the centroids are themselves searched with a small index, because cell sizes are unequal and the recall at fixed $n_{\mathrm{probe}}$ improves with finer cells only up to a point.
:::
:::

::: exercise Unit vectors {level=2}
Prove that for unit vectors $\vec q$ and $\vec x$, ranking by inner product, by cosine and by Euclidean distance give the same order, and show by example that for non-unit vectors ranking by cosine and by inner product can differ.
::: solution
For unit vectors the cosine equals the inner product, and $\norm{\vec q - \vec x}^2 = 2 - 2\,\vec q\cdot\vec x$ is a decreasing function of it ([[information-retrieval/vector-space#prop-cosine]]). For non-unit vectors take $\vec q = (1, 0)$, $\vec x_1 = (1, 0)$ and $\vec x_2 = (3, 3)$. Inner products: $1$ and $3$, so $\vec x_2$ ranks first. Cosines: $1$ and $3/(3\sqrt2) = 0.707$, so $\vec x_1$ ranks first. A model trained with inner products may use vector length to encode something (popularity, or confidence), which normalisation would discard; the choice of similarity must match training.
:::
:::

::: exercise Why does the k-NN graph fail? {level=3}
Explain why greedy search on a pure $k$-nearest-neighbour graph of clustered data can fail to find the query's neighbours even with a large beam, and why inserting points incrementally (NSW) helps. Suggest two other remedies.
::: solution
In a $k$-NN graph each node links only to its $k$ closest points, which for clustered data lie in its own cluster. Edges between clusters arise only for the few points near cluster boundaries, and some clusters may not be connected to others at all. Greedy search moves to neighbours that are more similar to the query; starting in the wrong cluster, it can reach the right one only through boundary points, and if none of the visited nodes leads there, it stops at a local optimum — a beam widens the search but may still exhaust the starting cluster first, as the recall of $0.78$ at $\mathit{ef} = 80$ showed. In the incremental construction, the first nodes are inserted into a nearly empty graph, so their "nearest" earlier neighbours are far away; these long-range edges form a sparse backbone that greedy search can use to cross between clusters in a few hops, as in a small-world network. Other remedies: (1) start from several entry points, or from the centroid of each cluster (an IVF-style first step); (2) add explicit long-range links, for example random edges, or HNSW's hierarchy, whose upper layers contain few nodes with long links; (3) prune neighbour lists for diversity of direction, as HNSW does, which keeps a few links pointing out of the cluster.
:::
:::

::: exercise Implement product-quantised search {level=3}
Using the `build_pq` and `pq_scores` functions of this chapter's listings as a guide, write a function that searches an IVF index whose lists store PQ codes of the **residuals** $\vec x - \vec c_j$ (where $\vec c_j$ is the cell centroid), and explain why residual coding is more accurate than coding $\vec x$ itself for the same number of bits.
::: solution
For a vector in cell $j$, store the PQ code of $\vec r = \vec x - \vec c_j$. For a query, $\vec q\cdot\vec x = \vec q\cdot\vec c_j + \vec q\cdot\vec r \approx \vec q\cdot\vec c_j + \sum_s \vec q^{(s)}\cdot\vec c^{(s)}_{i_s}$, so the score is the cell's centroid score plus PQ look-ups with the *same* table for every cell (for inner products; for Euclidean distance the table depends on the cell).

```python
def ivf_pq_search(q, nprobe, cent, lists, books, m, sub, k=10):
    """lists[j]: list of (docID, codes of the residual x - cent[j])."""
    table = [[dot(q[s * sub:(s + 1) * sub], c) for c in books[s]] for s in range(m)]
    cells = heapq.nlargest(nprobe, range(len(cent)), key=lambda j: dot(q, cent[j]))
    scored = ((dot(q, cent[j]) + sum(table[s][code[s]] for s in range(m)), doc)
              for j in cells for doc, code in lists[j])
    return [doc for _, doc in heapq.nlargest(k, scored)]
```

Residuals are more accurate because they are smaller and more alike: the cell centroid removes the large, cell-specific part of each vector, and the codebooks — trained on residuals of all cells — need only describe the spread of vectors *around* their centroids, which has much smaller variance than the vectors themselves. With the same $K^m$ reconstruction points spread over a smaller region, quantisation error falls. Jégou, Douze and Schmid's IVFADC used exactly this design.
:::
:::
