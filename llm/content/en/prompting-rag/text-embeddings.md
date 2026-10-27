Search engines used to match words. A query for *how do I reset my password* found documents containing *reset* and *password*, and missed the help page titled *Recovering access to your account*. To find text by its meaning we need a representation in which texts that mean similar things are close together, whatever words they use. A **text embedding** is such a representation: a function that maps a sentence, a paragraph or a question to a vector, trained so that the similarity of two vectors reflects how related the texts are.

Word embeddings ([[text-and-language/word-embeddings]]) did this for single words. This chapter extends the idea to whole texts. It explains why the contextual vectors of a pretrained Transformer are poor sentence embeddings out of the box, how **contrastive training** with the InfoNCE loss fixes that, and the two architectures that dominate neural retrieval: the **bi-encoder**, which embeds queries and documents independently so that documents can be indexed in advance, and the **cross-encoder**, which reads a query and a document together and scores them more accurately but far more expensively. It ends with how embeddings are evaluated and what to watch for when choosing one. The next chapter, [[prompting-rag/vector-search]], shows how to search millions of such vectors quickly.

## From token vectors to text vectors {#sec-pooling}

An encoder such as BERT ([[transformers/architecture-families#def-encoder]]) turns a text of $T$ tokens into $T$ contextual vectors $\mathbf{h}_1, \dots, \mathbf{h}_T\in\R^{d}$. A single vector for the whole text is obtained by **pooling**.

::: definition Text embedding and pooling {#def-embedding}
A **text embedding model** is a function $f\colon\text{texts}\to\R^{d}$. With an encoder producing $\mathbf{h}_1, \dots, \mathbf{h}_T$, common pooling choices are the vector of a special first token (**CLS pooling**), the **mean** $\frac1T\sum_t\mathbf{h}_t$, and, for decoder models, the vector of the **last token**, the only one that has seen the whole text ([[transformers/architecture-families#sec-decoders]]). The embedding is usually normalised to unit length, $f(x)/\lVert f(x)\rVert$, and two texts are compared by **cosine similarity** ([[math-for-ml/vectors-matrices#eq-cosine]]), which for unit vectors is the dot product.
:::

::: example Mean pooling by hand {#ex-pooling}
A text of two tokens has contextual vectors $(1, 0, 2)$ and $(3, 2, 0)$; another of three tokens has $(2, 1, 1)$, $(0, 1, 3)$ and $(1, 1, 2)$. Compute their mean-pooled embeddings and cosine similarity.
::: solution
The means are $(2, 1, 1)$ and $(1, 1, 2)$. Their dot product is $2 + 1 + 2 = 5$ and both norms are $\sqrt6$, so the cosine is $5/6 = 0.833$. Mean pooling makes texts of different lengths comparable, and every token contributes; CLS pooling would use one vector from each text and ignore the rest unless training has taught the CLS position to summarise.
:::
:::

Pooling a pretrained model's vectors gives a poor embedding. Reimers and Gurevych (2019) found that averaged BERT vectors, and BERT's CLS vector, did worse on semantic-similarity benchmarks than simply averaging GloVe word vectors. One reason is **anisotropy**: Ethayarajh (2019) showed that contextual vectors of pretrained models occupy a narrow cone, so that randomly chosen texts already have high cosine similarity, and the differences that carry meaning are small compared with what all vectors share. Masked language modelling never asked for vectors whose *distances* mean anything.

::: example A shared direction swamps meaning {#ex-anisotropy}
Two texts have embeddings $\mathbf{u} = \mathbf{c} + \mathbf{a}$ and $\mathbf{v} = \mathbf{c} + \mathbf{b}$, where $\mathbf{c}$ is a direction shared by all texts with $\lVert\mathbf{c}\rVert = 2$, and $\mathbf{a}$, $\mathbf{b}$ are unit vectors carrying their content, orthogonal to each other and to $\mathbf{c}$. Compute their cosine, before and after subtracting the mean direction $\mathbf{c}$.
::: solution
$\mathbf{u}\cdot\mathbf{v} = \lVert\mathbf{c}\rVert^2 = 4$ and $\lVert\mathbf{u}\rVert = \lVert\mathbf{v}\rVert = \sqrt{4 + 1} = \sqrt5$, so the cosine is $4/5 = 0.8$, although the contents are unrelated. After centring, the vectors are $\mathbf{a}$ and $\mathbf{b}$, with cosine $0$. Post-hoc fixes such as centring and whitening help, but training the embedding for the purpose helps much more.
:::
:::

## Contrastive training {#sec-contrastive}

What should an embedding achieve? For a query $q$ and a passage $d^+$ that answers it, the similarity $s(q, d^+)$ should be larger than $s(q, d^-)$ for passages $d^-$ that do not. **Contrastive learning** turns this into a classification problem: among one positive and several negatives, identify the positive.

::: definition InfoNCE loss {#def-infonce}
Let $s(q, d) = f(q)^\top g(d)$ be a similarity score (with unit-normalised embeddings, a cosine), $\tau > 0$ a **temperature**, and $d_0 = d^+, d_1, \dots, d_n$ a positive passage and $n$ negatives for a query $q$. The **InfoNCE loss** is

$$
\mathcal{L}(q) = -\log\frac{\exp\!\big(s(q, d^+)/\tau\big)}{\sum_{j=0}^{n}\exp\!\big(s(q, d_j)/\tau\big)},
$$ {#eq-infonce}

averaged over the queries of a training batch.
:::

InfoNCE is cross-entropy in disguise. Treat the $n + 1$ candidates as the classes of a softmax classifier whose logits are the scaled similarities $s(q, d_j)/\tau$, and whose correct class is $0$; then [[#eq-infonce]] is exactly the cross-entropy loss of that classifier ([[ml-fundamentals/logistic-regression#def-softmax-regression]]). The derivative follows.

::: proposition Gradient of InfoNCE {#prop-infonce-grad}
Let $p_j = \operatorname{softmax}\big(s(q, d_0)/\tau, \dots, s(q, d_n)/\tau\big)_j$. Then

$$
\frac{\partial\mathcal{L}}{\partial s(q, d^+)} = -\frac{1 - p_0}{\tau}, \qquad \frac{\partial\mathcal{L}}{\partial s(q, d_j)} = \frac{p_j}{\tau}\quad(j\ge1).
$$

The loss pushes the positive score up and each negative score down in proportion to the probability the model currently gives it: negatives that already score low receive almost no gradient.
:::

::: proof
Write $z_j = s(q, d_j)/\tau$. Then $\mathcal{L} = -z_0 + \log\sum_k e^{z_k}$, so $\partial\mathcal{L}/\partial z_j = -\mathbb{1}[j = 0] + e^{z_j}/\sum_ke^{z_k} = p_j - \mathbb{1}[j = 0]$. By the chain rule $\partial z_j/\partial s(q, d_j) = 1/\tau$, which gives both formulas.
:::

::: example InfoNCE with a hard negative {#ex-infonce}
A query has cosine similarities $0.8$ with its positive and $0.5$, $0.3$, $0.1$ with three negatives. Compute the loss at $\tau = 1$ and $\tau = 0.05$. Then suppose the first negative's similarity is $0.85$ instead of $0.5$, and recompute at $\tau = 0.05$ with the gradients.
::: solution
At $\tau = 1$ the softmax of $(0.8, 0.5, 0.3, 0.1)$ is $(0.352, 0.260, 0.213, 0.175)$ and $\mathcal{L} = -\ln0.352 = 1.045$, close to the value $\ln4 = 1.386$ of a random guess: with cosines confined to $[-1, 1]$, a temperature of $1$ cannot make the softmax confident. At $\tau = 0.05$ the logits are $(16, 10, 6, 2)$, $p_0 = 0.9975$ and $\mathcal{L} = 0.0025$: this query is solved. With the hard negative the logits become $(16, 17, 6, 2)$, $p = (0.269, 0.731, 0.00001, \dots)$, and $\mathcal{L} = 1.313$. By [[#prop-infonce-grad]] the gradient is $-(1 - 0.269)/0.05 = -14.6$ on the positive score, $0.731/0.05 = 14.6$ on the hard negative, and essentially zero on the other two. Nearly all of the learning signal comes from the negative the model confuses with the positive.
:::
:::

::: widget plot
f: -log(exp(x/t)/(exp(x/t) + n))
x: -1, 1
y: 0, 6
sliders: t=0.1:0.02:1:0.01; n=7:1:255:1
labels: $\mathcal{L}$ against the margin $s^+ - s^-$
caption: InfoNCE loss against the margin $s(q, d^+) - s(q, d^-)$ by which the positive beats $n$ equally scored negatives, for temperature $\tau$. With $n$ negatives a margin of zero costs $\log(n + 1)$. A small temperature makes the loss nearly zero once the margin is positive and nearly linear, with slope $1/\tau$, once it is negative — close to a hinge. A large temperature gives a gentle slope everywhere: even the largest margin cosines allow, $2$, leaves a loss of $\log(1 + ne^{-2/\tau})$, which is $0.67$ for $\tau = 1$ and $n = 7$.
:::

Two practical ideas make contrastive training effective.

**In-batch negatives.** In a batch of $B$ (query, positive) pairs, the positives of the other $B - 1$ queries serve as negatives for each query at no extra encoding cost: the $B\times B$ matrix of scores $f(q_i)^\top g(d_j)$ is computed with one matrix product, and the loss is the cross-entropy of each row with the diagonal as the correct class. Larger batches give more negatives, which is one reason embedding models are trained with batches of thousands of pairs.

**Hard negatives.** Random negatives are mostly easy, and by [[#prop-infonce-grad]] easy negatives teach little. **Hard negatives** — passages that look relevant but are not, such as the top results of a keyword search that do not contain the answer — supply the gradient. They must be chosen with care: a "negative" that actually answers the query (a **false negative**, common because relevance labels are incomplete) trains the model to push away a correct answer.

::: remark
Oord et al. (2018) introduced the name InfoNCE and showed that, with $N = n + 1$ candidates drawn appropriately, $\log N - \mathcal{L}$ is a lower bound on the mutual information between the query and the positive ([[math-for-ml/information-theory#def-mutual]]); Poole et al. (2019) analysed this family of bounds. One consequence is that the bound can never exceed $\log N$, another reason why many negatives help.
:::

The following listing computes the in-batch InfoNCE loss and its gradient with respect to the query embeddings, checks the gradient numerically, and takes a few gradient steps.

```python
import math, random
random.seed(0)
B, d, tau = 4, 8, 0.1
def unit(v):
    n = math.sqrt(sum(x*x for x in v)); return [x/n for x in v]
D = [unit([random.gauss(0, 1) for _ in range(d)]) for _ in range(B)]      # B x d passages
Q = [unit([a + random.gauss(0, 1) for a in D[i]]) for i in range(B)]      # noisy queries
dot = lambda a, b: sum(x*y for x, y in zip(a, b))

def loss_and_grad(Q):
    L, G = 0.0, []
    for i in range(B):                      # query i: positive D[i], negatives D[j], j != i
        s = [dot(Q[i], D[j]) / tau for j in range(B)]
        m = max(s); e = [math.exp(x - m) for x in s]; Z = sum(e)
        p = [x / Z for x in e]              # softmax over the batch
        L += -math.log(p[i]) / B
        # dL/dq_i = (1/(tau*B)) * (sum_j p_j d_j - d_i)
        G.append([(sum(p[j]*D[j][k] for j in range(B)) - D[i][k]) / (tau*B) for k in range(d)])
    return L, G

L, G = loss_and_grad(Q)
h = 1e-6; Qp = [row[:] for row in Q]; Qp[2][5] += h          # finite-difference check
print(f"loss {L:.4f}  analytic dL/dq[2][5] {G[2][5]:.6f}  numeric {(loss_and_grad(Qp)[0]-L)/h:.6f}")
for step in range(1, 31):                                    # gradient descent on the queries
    L, G = loss_and_grad(Q)
    Q = [unit([q - 0.05*g for q, g in zip(Q[i], G[i])]) for i in range(B)]
    if step % 10 == 0: print(f"step {step:2d}  loss {L:.4f}")
print("chance level log B =", round(math.log(B), 4))
```

```text
loss 1.1389  analytic dL/dq[2][5] 0.277884  numeric 0.277885
step 10  loss 0.0494
step 20  loss 0.0268
step 30  loss 0.0189
chance level log B = 1.3863
```

The gradient formula $\frac{1}{\tau B}\big(\sum_jp_j\mathbf{d}_j - \mathbf{d}_i\big)$ is [[#prop-infonce-grad]] combined with $\partial s/\partial\mathbf{q}_i = \mathbf{d}_j/\tau$: it moves each query towards its positive and away from the probability-weighted average of the candidates. In a real model the gradient flows on into the encoder's parameters, and the passages move too.

## Bi-encoders and cross-encoders {#sec-architectures}

Where do the encoders $f$ and $g$ come from? Two designs share the work very differently.

::: definition Bi-encoder and cross-encoder {#def-bi-cross}
A **bi-encoder** (or dual encoder) embeds the query and the document separately, $s(q, d) = f(q)^\top g(d)$, with $f = g$ (a **siamese** network, for symmetric tasks) or with separate or differently prompted encoders (for asymmetric tasks such as question and passage). A **cross-encoder** feeds the concatenation `[query] [SEP] [document]` to one Transformer and maps its output to a relevance score $s(q, d) = h(\operatorname{Enc}(q\oplus d))$, so that every query token can attend to every document token.
:::

The bi-encoder's similarity is a dot product of vectors that can be computed **before** the query arrives: embed the whole collection once, store the vectors, and at query time embed the query and search for the nearest document vectors. The cross-encoder sees query and document together, which makes it more accurate — it can check that the specific entity, date or negation in the query matches the document — but it must run the full Transformer once for every (query, document) pair, and nothing can be precomputed.

::: example The cost of a cross-encoder {#ex-cost}
A collection has one million passages. A cross-encoder scores a (query, passage) pair in $1$ ms of accelerator time (batched); a bi-encoder embeds a query in $1$ ms, and comparing a $768$-dimensional query vector with all stored passage vectors takes $7.7\times10^8$ multiply–adds. How long does each take per query, and how are they combined in practice?
::: solution
Cross-encoder over the whole collection: $10^6\cdot1$ ms $= 1000$ s, about $17$ minutes per query, which is out of the question. Bi-encoder: $1$ ms to embed plus $10^6\cdot768 = 7.7\times10^8$ multiply–adds, a few milliseconds on a modern processor even by brute force, and less with an index ([[prompting-rag/vector-search]]). The standard pipeline uses both: a bi-encoder (or keyword search) **retrieves** the top $100$ or so candidates, and a cross-encoder **reranks** them, at $100\cdot1$ ms $= 0.1$ s. Reranking is developed in [[prompting-rag/retrieval-augmented-generation]].
:::
:::

**Sentence-BERT.** Reimers and Gurevych (2019) made BERT a practical bi-encoder. They put BERT in a siamese network, mean-pooled its outputs, and fine-tuned it on natural-language-inference pairs (SNLI and MultiNLI, about a million sentence pairs labelled entailment, contradiction or neutral) with a classifier on $(\mathbf{u}, \mathbf{v}, \lvert\mathbf{u} - \mathbf{v}\rvert)$, then used the pooled vectors with cosine similarity. Finding the most similar pair in a collection of $10{,}000$ sentences with BERT as a cross-encoder requires scoring $\binom{10{,}000}{2} = 49{,}995{,}000$ pairs, which they estimated at about $65$ hours; with SBERT it takes $10{,}000$ encodings and a matrix of cosines, about $5$ seconds.

**Dense passage retrieval.** Karpukhin et al. (2020) trained a bi-encoder for open-domain question answering — two BERT-base encoders, one for questions and one for $100$-word Wikipedia passages, with $768$-dimensional vectors compared by dot product — using InfoNCE with in-batch negatives plus one hard negative per question taken from the top BM25 results. On Natural Questions, the correct passage was among the top $20$ retrieved for $78.4\%$ of questions, against $59.1\%$ for BM25 keyword search ([[prompting-rag/vector-search#sec-bm25]]); at the top $100$ the figures were $85.4\%$ and $73.7\%$. DPR became the retriever of the first retrieval-augmented generators ([[prompting-rag/retrieval-augmented-generation]]).

::: example Negatives in a DPR batch {#ex-dpr-batch}
DPR's training batches contain $B$ questions, each with one positive and one BM25 hard negative passage, and every passage in the batch serves as a candidate for every question. With $B = 128$, how many candidates and negatives does each question see, and how many passages does the batch encode?
::: solution
The batch contains $2B = 256$ passages, each encoded once. Each question sees all $256$ as candidates: its own positive and $255$ negatives — $127$ other questions' positives, its own hard negative and $127$ other hard negatives. The score matrix is $128\times256$, one matrix product.
:::
:::

Later models scaled these ideas. SimCSE (Gao et al., 2021) showed that even passing the same sentence twice through an encoder with different dropout masks yields useful positive pairs; E5 (Wang et al., 2022) and similar models pretrained contrastively on hundreds of millions of naturally occurring pairs (titles and bodies, questions and answers) before fine-tuning on labelled data; instruction-following embedders (Su et al., 2023) take a task description with the text; and, from 2023–2024, decoder LLMs fine-tuned contrastively with last-token or mean pooling became competitive embedders. Matryoshka representation learning (Kusupati et al., 2022) trains embeddings whose first $k$ coordinates are themselves a good embedding for several $k$, so that vectors can be truncated to save memory.

::: warning Queries and documents are not the same kind of text
Many retrieval embedders are **asymmetric**: they were trained with short questions on one side and passages on the other, often with a prefix such as `query: ` or an instruction for the query. Embedding queries the way the model expects documents (or omitting the expected prefix) can noticeably lower retrieval quality, and comparing two queries with an asymmetric model measures something it was not trained for. Read the model's documentation, and evaluate on your own queries.
:::

::: quiz
Why can a bi-encoder search a million documents in milliseconds while a cross-encoder cannot?
- [ ] The bi-encoder uses a smaller Transformer.
- [x] Document vectors are computed once in advance, so a query needs one encoding and fast vector comparisons; a cross-encoder must run on every (query, document) pair.
- [ ] Cross-encoders cannot be run on accelerators.
- [ ] Bi-encoders compare only the first token of each text.
::: solution
The bi-encoder's score factorises as $f(q)^\top g(d)$, so $g(d)$ is precomputed and stored and the query is encoded once. A cross-encoder's score depends on the joint encoding of query and document, which cannot be precomputed. The two can use the same size of Transformer; the difference is architectural.
:::
:::

## Evaluating and choosing embeddings {#sec-mteb}

An embedding is good *for a task*: retrieval of passages for questions, clustering of support tickets, detecting duplicate questions, classification with a light model on top. The **Massive Text Embedding Benchmark** (MTEB; Muennighoff et al., 2023) collected $58$ datasets in $8$ task types — bitext mining, classification, clustering, pair classification, reranking, retrieval, semantic textual similarity and summarisation — across $112$ languages, and found that no single embedding method was best across all tasks. Its public leaderboard became the standard reference; a multilingual successor (MMTEB, 2025) extended it to more than $500$ tasks. As of 2026 the leaders change often, many top entries are built from decoder LLMs with billions of parameters, and evaluation sets used for the leaderboard may overlap with models' training data — so a high average rank is a starting point, not a decision.

Choosing an embedding model is an engineering trade-off:

- **Quality on your data.** Build a small labelled set of your own queries and relevant documents and measure retrieval quality directly ([[prompting-rag/rag-evaluation]]); public benchmarks rarely match a domain such as law, medicine or source code.
- **Dimension and storage.** Memory grows linearly with $d$; quantisation and truncation trade quality for size.
- **Speed.** Every document must be encoded at indexing time and every query at search time; a large model raises both.
- **Context length and languages.** Texts longer than the model's maximum input are truncated silently; multilingual retrieval needs a model trained on the languages involved.
- **Stability.** Changing the embedding model invalidates the index: every stored vector must be recomputed, because vectors from different models are not comparable.

::: example Index storage {#ex-storage}
A collection of $10$ million passages is embedded with a $1024$-dimensional model. How much memory do the vectors need in 32-bit floats, in 16-bit floats, and when truncated (Matryoshka-style) to $256$ dimensions in 16-bit floats?
::: solution
$10^7\cdot1024\cdot4$ bytes $= 4.1\times10^{10}$ bytes, about $41$ GB; half of that, $20.5$ GB, in 16-bit floats; and $10^7\cdot256\cdot2 = 5.1\times10^9$ bytes, about $5$ GB, after truncation. Product quantisation ([[prompting-rag/vector-search#sec-pq]]) can reduce it further, to tens of bytes per vector.
:::
:::

::: history
Distributed representations of documents go back to latent semantic analysis (Deerwester et al., 1990), which embedded documents by a truncated SVD of the term–document matrix ([[math-for-ml/matrix-decompositions#sec-svd]]). Neural sentence embeddings followed word2vec: paragraph vectors (Le and Mikolov, 2014), skip-thought vectors (Kiros et al., 2015), InferSent (Conneau et al., 2017), trained on natural-language inference, and the Universal Sentence Encoder (Cer et al., 2018). Contrastive objectives were developed in metric learning and self-supervised vision; Oord et al. (2018) named the InfoNCE loss. Sentence-BERT (Reimers and Gurevych, 2019) made BERT a practical sentence encoder, and DPR (Karpukhin et al., 2020) showed that trained dense retrieval beats BM25 for open-domain question answering. Cross-encoder reranking with BERT was introduced by Nogueira and Cho (2019). SimCSE (2021), large-scale contrastive pretraining (E5, 2022, and others), the MTEB benchmark (Muennighoff et al., 2023) and LLM-based embedders (from 2023) followed.
:::

::: summary
- A text embedding maps a text to a vector whose similarity to others reflects relatedness; pooling (mean, CLS or last token) turns token vectors into one vector, usually normalised and compared by cosine.
- Pretrained encoders give poor embeddings without further training; their vectors are anisotropic, sharing a direction that swamps meaning.
- Contrastive training with InfoNCE is cross-entropy over one positive and many negatives with scaled similarities as logits; its gradient concentrates on hard negatives, and the temperature controls how sharply it does.
- In-batch negatives supply many negatives cheaply; hard negatives supply the useful gradient; false negatives are a hazard.
- Bi-encoders precompute document vectors and search fast; cross-encoders read query and document together and are more accurate but cost one forward pass per pair. Retrieve with the first, rerank with the second.
- Sentence-BERT (2019) and DPR (2020) established the approach; MTEB is the standard benchmark as of 2026, but measure on your own data.
:::

## Exercises

::: exercise Storage of an index {level=1 check="4.096"}
How many gigabytes ($10^9$ bytes) do one million $1024$-dimensional embeddings in 32-bit floats occupy?
::: solution
$10^6\cdot1024\cdot4 = 4.096\times10^9$ bytes, that is $4.096$ GB.
:::
:::

::: exercise In-batch negatives {level=1 check="255"}
A batch of $256$ (query, positive) pairs is trained with in-batch negatives only. How many negatives does each query see?
::: solution
The other $255$ queries' positives: $B - 1 = 255$.
:::
:::

::: exercise InfoNCE at moderate temperature {level=1 check="0.056"}
Using the similarities $0.8$ (positive) and $0.5$, $0.3$, $0.1$ of [[#ex-infonce]], compute the InfoNCE loss at $\tau = 0.1$, to three decimal places.
::: solution
The logits are $(8, 5, 3, 1)$. The softmax probability of the positive is $e^8/(e^8 + e^5 + e^3 + e^1) = 2981.0/(2981.0 + 148.4 + 20.1 + 2.7) = 0.9457$, so $\mathcal{L} = -\ln0.9457 = 0.056$.
:::
:::

::: exercise Pairs for a cross-encoder {level=1 check="1249975000"}
How many unordered pairs must a cross-encoder score to find the most similar pair among $50{,}000$ sentences?
::: solution
$\binom{50{,}000}{2} = 50{,}000\cdot49{,}999/2 = 1{,}249{,}975{,}000$, twenty-five times the $10{,}000$-sentence case — the count grows quadratically.
:::
:::

::: exercise A stronger shared direction {level=2 check="0.9"}
Repeat [[#ex-anisotropy]] with $\lVert\mathbf{c}\rVert = 3$. What happens to the cosine of unrelated texts as the shared component grows?
::: solution
$\mathbf{u}\cdot\mathbf{v} = 9$ and $\lVert\mathbf{u}\rVert^2 = \lVert\mathbf{v}\rVert^2 = 10$, so the cosine is $0.9$. In general it is $c^2/(c^2 + 1)$ for $\lVert\mathbf{c}\rVert = c$, which tends to $1$: when the shared component dominates, all texts look alike and cosine differences become tiny.
:::
:::

::: exercise The gradient on the positive {level=2 check="-14.62"}
In the hard-negative case of [[#ex-infonce]] (logits $16, 17, 6, 2$), compute $\partial\mathcal{L}/\partial s(q, d^+)$ to two decimal places, using the unrounded probability.
::: solution
$p_0 = e^{16}/(e^{16} + e^{17} + e^{6} + e^{2}) = 0.26894$. By [[#prop-infonce-grad]], $\partial\mathcal{L}/\partial s(q, d^+) = -(1 - 0.26894)/0.05 = -14.62$.
:::
:::

::: exercise The small-temperature limit {level=3}
Let $\Delta = \max_{j\ge1}s(q, d_j) - s(q, d^+)$. Show that $\tau\mathcal{L}\to\max(0, \Delta)$ as $\tau\to0$. Interpret the limit, and explain why training at a very small temperature behaves like optimising a hinge loss on the hardest negative.
::: solution
Write $s_j = s(q, d_j)$ and $M = \max_j s_j$ over all candidates, including the positive. Then $\tau\mathcal{L} = -s_0 + \tau\log\sum_je^{s_j/\tau} = -s_0 + M + \tau\log\sum_je^{(s_j - M)/\tau}$. The last sum lies between $1$ (the term with $s_j = M$) and $n + 1$, so the last term lies between $0$ and $\tau\log(n + 1)\to0$. Hence $\tau\mathcal{L}\to M - s_0 = \max(0, \Delta)$. The limit is zero when the positive beats every negative, and otherwise equals the amount by which the hardest negative wins: a hinge with margin zero on the hardest negative. With a very small temperature only the top-scoring negative gets gradient — useful for precision, but noisy and harmful when that negative is a false negative; moderate temperatures (around $0.01$–$0.1$ with cosine scores, in practice) spread the gradient over several hard negatives.
:::
:::

::: exercise A symmetric loss {level=2}
In-batch InfoNCE treats each row of the $B\times B$ score matrix as a classification of a query among passages. Write down the symmetric variant that also classifies each passage among the queries (as used for paired image and text embeddings), and say when it is appropriate for text retrieval.
::: solution
With $S_{ij} = f(q_i)^\top g(d_j)/\tau$:

$$
\mathcal{L} = \frac{1}{2B}\sum_{i=1}^{B}\Big[-\log\frac{e^{S_{ii}}}{\sum_je^{S_{ij}}} - \log\frac{e^{S_{ii}}}{\sum_je^{S_{ji}}}\Big],
$$

the average of the row-wise (query-to-passage) and column-wise (passage-to-query) cross-entropies. It is appropriate when both directions of retrieval are used, or when the two sides are interchangeable (duplicate-question detection, paraphrase mining). For question-to-passage retrieval only the row-wise term matters at test time, although the column term can still act as a regulariser.
:::
:::

::: exercise Budgeting a reranker {level=2}
A search system must answer within $300$ ms. Bi-encoder retrieval takes $20$ ms, and a cross-encoder scores $32$ (query, passage) pairs in a batch in $40$ ms. How many candidates can be reranked within the budget, leaving $60$ ms for everything else? Why might reranking fewer candidates be the better choice?
::: solution
$300 - 20 - 60 = 220$ ms remain for reranking; that is $5$ batches of $32$ ($200$ ms), so $160$ candidates. Fewer may be better because the gain from reranking comes mostly from reordering the top few dozen, and the long tail rarely contains relevant passages that the first stage ranked very low; latency spikes under load also argue for headroom. Measure recall of the first stage at different depths ([[prompting-rag/rag-evaluation]]) to choose the depth.
:::
:::

::: exercise Gradients through normalisation {level=3}
The listing treats the query vectors as free and renormalises after each step. If instead $\mathbf{q} = \mathbf{u}/\lVert\mathbf{u}\rVert$ for an unconstrained $\mathbf{u}$, show that $\partial\mathcal{L}/\partial\mathbf{u} = \frac{1}{\lVert\mathbf{u}\rVert}\big(I - \mathbf{q}\mathbf{q}^\top\big)\,\partial\mathcal{L}/\partial\mathbf{q}$, and interpret the projection.
::: solution
The Jacobian of $\mathbf{u}\mapsto\mathbf{u}/\lVert\mathbf{u}\rVert$ is $\frac{1}{\lVert\mathbf{u}\rVert}\big(I - \mathbf{q}\mathbf{q}^\top\big)$: differentiating $u_i/\lVert\mathbf{u}\rVert$ with respect to $u_j$ gives $\delta_{ij}/\lVert\mathbf{u}\rVert - u_iu_j/\lVert\mathbf{u}\rVert^3$. The matrix is symmetric, so by the chain rule $\partial\mathcal{L}/\partial\mathbf{u} = \frac{1}{\lVert\mathbf{u}\rVert}(I - \mathbf{q}\mathbf{q}^\top)\partial\mathcal{L}/\partial\mathbf{q}$. The projection removes the component of the gradient along $\mathbf{q}$: changing the length of $\mathbf{u}$ does not change the normalised vector, so only the tangential part of the gradient, which rotates $\mathbf{q}$ on the sphere, has any effect. Cosine-based training therefore moves embeddings on the unit sphere, and the factor $1/\lVert\mathbf{u}\rVert$ means that long unnormalised vectors learn slowly.
:::
:::
