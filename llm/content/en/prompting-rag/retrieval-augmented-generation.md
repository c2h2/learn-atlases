A language model knows what was in its training data, as of the date the data were collected, in a compressed and unreliable form. It does not know this morning's news, a company's internal handbook or the contents of a contract it has never seen, and when asked about such things it may answer fluently anyway. **Retrieval-augmented generation** (RAG) addresses all three problems with one move: before the model answers, search a collection of documents for passages relevant to the question, put them in the prompt, and ask the model to answer from them — and to say which passage supports each claim.

The idea is simple, and a minimal system fits in a page of code. Making it work well is not: the answer can only be as good as the passages retrieved, the passages must be cut, ranked and placed so that the model uses them, and the model must be persuaded to rely on them rather than on its memory. This chapter starts with the original formulation of RAG as a probabilistic model, derives how a retriever can be trained through the generator, and then builds the practical pipeline — chunking, retrieval, reranking, prompt construction and citation — together with its characteristic failures. Embeddings and search are covered in [[prompting-rag/text-embeddings]] and [[prompting-rag/vector-search]]; measuring a RAG system is the subject of [[prompting-rag/rag-evaluation]].

## Parametric and non-parametric memory {#sec-memory}

Lewis et al. (2020) described a language model's weights as **parametric memory** and a searchable document collection as **non-parametric memory**. The two have complementary properties.

| | parametric (weights) | non-parametric (index) |
|---|---|---|
| updating | retraining or fine-tuning | add or delete documents |
| provenance | none: a fact cannot be traced to a source | each passage has a source |
| capacity | fixed by model size | grows with the collection |
| access | fast, implicit, in every forward pass | an explicit search per query |
| failure | confident recall of something false | retrieving the wrong passage |

RAG combines them: the index supplies facts and provenance, and the model supplies language, reasoning and the ability to combine passages into an answer.

::: definition Retrieval-augmented generation pipeline {#def-rag}
A **retrieval-augmented generation** system consists of

- an **index** built offline: documents are split into **chunks**, each chunk is represented for search (an embedding, a sparse term vector, or both) and stored with its source;
- a **retriever** that, for a query $x$, returns the top $k$ chunks $z_1, \dots, z_k$ by a score $s(x, z)$;
- optionally a **reranker** that reorders the retrieved chunks with a more accurate, more expensive model;
- a **generator**, a language model that receives a prompt containing the query and the selected chunks and produces an answer $y$, usually with references to the chunks it used.
:::

::: widget graph
nodes: docs@0,2; chunk@1,2; embed@2,2; index@3,2; query@2,0; retrieve@4,1; rerank@5,1; prompt@6,1; generate@7,1; answer@8,1
edges: docs>chunk; chunk>embed; embed>index; index>retrieve; query>retrieve; retrieve>rerank; rerank>prompt; query>prompt; prompt>generate; generate>answer
algorithm: topo
start: docs
caption: The RAG pipeline as a dependency graph. The top row runs offline, once per document: chunk, embed and index. The rest runs per query: retrieve candidates, rerank them, build a prompt from the query and the best chunks, generate an answer with citations. A topological order, stepped through here, is an order in which the stages can run. Each stage can fail independently, which is why [[prompting-rag/rag-evaluation]] measures them separately.
:::

## RAG as a latent-variable model {#sec-model}

Lewis et al. made the retrieved document a **latent variable**: the model does not know which passage is right, so it averages over the retrieved ones, weighting each by the retriever's belief. The retriever gives a distribution over passages,

$$
p_\eta(z\mid x) = \frac{\exp s_\eta(x, z)}{\sum_{z'\in\operatorname{top-}k(x)}\exp s_\eta(x, z')},
$$ {#eq-retriever}

with $s_\eta(x, z)$ the dense-retrieval score of DPR ([[prompting-rag/text-embeddings#sec-architectures]]), and the generator $p_\theta(y_i\mid x, z, y_{<i})$ is a sequence-to-sequence model conditioned on the query and one passage.

::: definition RAG-Sequence and RAG-Token {#def-rag-models}
**RAG-Sequence** uses the same passage for the whole output and marginalises at the level of sequences:

$$
p(y\mid x) = \sum_{z}p_\eta(z\mid x)\prod_{i}p_\theta(y_i\mid x, z, y_{<i}).
$$

**RAG-Token** may use a different passage for each output token, marginalising at every step:

$$
p(y\mid x) = \prod_{i}\sum_{z}p_\eta(z\mid x)\,p_\theta(y_i\mid x, z, y_{<i}).
$$

In both, the sum runs over the top $k$ retrieved passages.
:::

::: example Two passages, two tokens {#ex-rag-models}
The retriever gives two passages probabilities $0.7$ and $0.3$. Given passage $z_1$, the generator assigns the answer's first token probability $0.9$ and its second $0.2$; given $z_2$, $0.4$ and $0.9$. Compute $p(y\mid x)$ under both models.
::: solution
RAG-Sequence: $0.7\cdot0.9\cdot0.2 + 0.3\cdot0.4\cdot0.9 = 0.126 + 0.108 = 0.234$. RAG-Token: $(0.7\cdot0.9 + 0.3\cdot0.4)(0.7\cdot0.2 + 0.3\cdot0.9) = 0.75\cdot0.41 = 0.3075$. RAG-Token gives the answer more probability because it can take the first token "from" $z_1$, which supports it, and the second from $z_2$; RAG-Sequence must explain the whole answer with one passage, and neither passage supports both tokens well. RAG-Token suits answers that combine facts from several passages; RAG-Sequence keeps each answer attributable to one source.
:::
:::

In Lewis et al.'s system the retriever was DPR, the generator BART-large, and the index a December 2018 Wikipedia dump split into $21$ million passages of $100$ words, searched by inner product. The query encoder and the generator were fine-tuned jointly on question–answer pairs by maximising $\log p(y\mid x)$; the document encoder was kept fixed so that the index did not have to be rebuilt during training. The models set the state of the art at the time on three open-domain question-answering benchmarks, and the authors showed that swapping the index for a newer Wikipedia dump changed the model's answers about world leaders accordingly — knowledge updated without retraining.

### Training a retriever through the generator

How can the retriever learn which passages help, without labels saying which passage is correct? Through the marginal likelihood. REALM (Guu et al., 2020) used exactly this to train a retriever during masked-language-model pretraining: a passage is "good" for a query if conditioning on it makes the masked tokens more predictable.

::: proposition Gradient of the marginal likelihood {#prop-realm}
Let $p(z\mid x) = \operatorname{softmax}_z s(x, z)$ over a candidate set and $p(y\mid x) = \sum_z p(z\mid x)\,p(y\mid x, z)$. Then

$$
\nabla\log p(y\mid x) = \sum_{z}\big[p(z\mid x, y) - p(z\mid x)\big]\nabla s(x, z) + \sum_z p(z\mid x, y)\,\nabla\log p(y\mid x, z),
$$ {#eq-realm}

where $p(z\mid x, y) = p(z\mid x)p(y\mid x, z)/p(y\mid x)$ is the posterior over passages given the answer. The first sum is the retriever's gradient: it raises the score of every passage whose posterior exceeds its prior — passages that explain the answer better than the retriever expected — and lowers the others.
:::

::: proof
By the identity $\nabla\log f = \nabla f/f$,

$$
\nabla\log p(y\mid x) = \sum_z\frac{p(z\mid x)p(y\mid x, z)}{p(y\mid x)}\Big[\nabla\log p(z\mid x) + \nabla\log p(y\mid x, z)\Big] = \sum_z p(z\mid x, y)\Big[\nabla\log p(z\mid x) + \nabla\log p(y\mid x, z)\Big].
$$

For the softmax, $\log p(z\mid x) = s(x, z) - \log\sum_{z'}e^{s(x, z')}$, so $\nabla\log p(z\mid x) = \nabla s(x, z) - \sum_{z'}p(z'\mid x)\nabla s(x, z')$. Summing against $p(z\mid x, y)$, which sums to one, gives $\sum_z p(z\mid x, y)\nabla s(x, z) - \sum_{z'}p(z'\mid x)\nabla s(x, z')$, the first sum of [[#eq-realm]].
:::

::: example Which passage gets credit? {#ex-realm}
Three candidate passages have retrieval scores $(2, 1, 0)$ and make the target answer probable to degrees $p(y\mid x, z) = (0.1, 0.8, 0.1)$. Compute the coefficients $p(z\mid x, y) - p(z\mid x)$ of the retriever gradient.
::: solution
The prior is $\operatorname{softmax}(2, 1, 0) = (0.665, 0.245, 0.090)$. The marginal is $0.665\cdot0.1 + 0.245\cdot0.8 + 0.090\cdot0.1 = 0.271$, so the posterior is $(0.0665, 0.196, 0.009)/0.271 = (0.245, 0.722, 0.033)$. The coefficients are $(-0.420, +0.477, -0.057)$: the second passage, which the retriever ranked second but which actually explains the answer, has its score pushed up, and the top-ranked but unhelpful passage is pushed down. Repeated over many examples, the retriever learns to rank passages by usefulness.
:::
:::

REALM had to cope with the index going stale as the document encoder changed: it re-embedded the corpus asynchronously every few hundred training steps. Later systems explored other placements of retrieval. Fusion-in-Decoder (Izacard and Grave, 2021) encodes each retrieved passage separately with the query and lets the decoder attend to all of them at once, which scales well to $100$ passages. RETRO (Borgeaud et al., 2022) retrieves neighbours for chunks of the input during pretraining from a database of $2$ trillion tokens; its authors reported performance comparable to models with about $25$ times more parameters on a language-modelling benchmark. Atlas (Izacard et al., 2023) showed that a jointly trained retriever and generator learn knowledge-intensive tasks from few examples. Most RAG systems built on general-purpose LLMs in 2026, however, train neither component end to end: an off-the-shelf retriever and a frozen instruction-tuned model are connected by a prompt, and the engineering moves to the pipeline.

## Chunking {#sec-chunking}

Documents are too long to embed or to put in a prompt whole, so they are split into **chunks**. The choice matters more than it seems: a chunk is the unit that is retrieved, scored and shown to the model, so it should be large enough to carry a self-contained piece of information and small enough to be specific.

::: proposition Number of chunks with overlap {#prop-chunks}
Splitting a text of $L$ tokens into windows of $c$ tokens whose starts are $c - o$ tokens apart (overlap $o < c$), with the last window allowed to be shorter, produces

$$
n = \Big\lceil\frac{L - c}{c - o}\Big\rceil + 1 \qquad (L > c)
$$

chunks, and stores about $c/(c - o)$ times as many tokens as the text itself.
:::

::: proof
Window $j$ starts at $j(c - o)$ for $j = 0, 1, \dots$, and the windows must cover the text, so we need the smallest $J$ with $J(c - o) + c\ge L$, that is $J = \lceil(L - c)/(c - o)\rceil$, and windows $0, \dots, J$ make $J + 1$. Each token apart from those near the ends lies in about $c/(c - o)$ windows, since a window of length $c$ starts every $c - o$ tokens.
:::

::: example Chunking a report {#ex-chunks}
A $10{,}000$-token report is split into $512$-token chunks with $64$ tokens of overlap. How many chunks are there, and how much larger is the index text than the report?
::: solution
$\lceil(10{,}000 - 512)/448\rceil + 1 = \lceil21.18\rceil + 1 = 23$ chunks. The overlap stores each token about $512/448 = 1.14$ times, $14\%$ more text — the price of making sure that a sentence cut at a chunk boundary appears whole in at least one chunk.
:::
:::

::: widget plot
f: (L - x)/(x - o) + 1
x: 100, 2000
y: 0, 120
sliders: L=10000:2000:50000:1000; o=64:0:90:2
labels: number of chunks $n$ against chunk size $c$
points: 512,22.18
caption: The number of chunks of [[#prop-chunks]] (before rounding up) against the chunk size $c$, for a document of $L$ tokens and overlap $o$; the marked point is [[#ex-chunks]], which rounds up to $23$. Small chunks are specific but numerous and may lose context ("it", "the above"); large chunks carry context but dilute the embedding with unrelated content and fill the prompt quickly. Increasing the overlap raises the count only slightly while $o$ is small compared with $c$.
:::

Fixed windows ignore structure. Better splitters respect it — sections, paragraphs, sentences, table rows, functions in code — and attach **metadata** to each chunk: the document title, section heading, date and access permissions. A chunk that says *The limit is 500 euros* is useless without knowing it comes from the travel policy; prepending the title and heading to the chunk before embedding (sometimes with a model-written summary of the surrounding document) restores that context. Many systems also index small chunks for precise retrieval but pass the surrounding larger section to the model. There is no universally best chunk size; it depends on the documents, the embedding model's training and the questions, and should be chosen by measuring retrieval quality ([[prompting-rag/rag-evaluation]]).

## Retrieval and reranking {#sec-retrieval}

The first-stage retriever must be fast over the whole collection and is tuned for **recall**: the relevant chunk should be somewhere in the top $50$ or $100$. Dense retrieval, BM25, or both fused by reciprocal rank fusion ([[prompting-rag/vector-search#def-rrf]]) are standard. The second stage is tuned for **precision** on a short list: a **cross-encoder reranker** ([[prompting-rag/text-embeddings#def-bi-cross]]) reads the query with each candidate and rescores it, and the best few go to the model. Nogueira and Cho (2019) showed large gains from reranking BM25 candidates with BERT this way; late-interaction models such as ColBERT (Khattab and Zaharia, 2020), which compare every query token embedding with every document token embedding, sit between bi- and cross-encoders in cost and accuracy. LLMs themselves can be prompted to rerank, at higher cost.

Several query-side techniques help when the user's question is a poor search query:

- **Query rewriting**: have a model turn a conversational turn ("and what about for contractors?") into a self-contained query, or split a multi-part question into several.
- **Hypothetical document embeddings** (HyDE; Gao et al., 2023): have a model write a plausible answer, possibly wrong, and retrieve with its embedding, which resembles relevant passages more than the question does.
- **Iterative retrieval** for multi-hop questions: retrieve, reason, retrieve again with what was learned (for instance Trivedi et al., 2023, interleave retrieval with chain-of-thought steps). Agents ([[agents/agent-loops]]) generalise this to search as a tool.
- **Diversity**: near-duplicate chunks waste the context; maximal marginal relevance (an exercise) trades relevance against redundancy.
- **Filters**: restrict by metadata — date, product, language and, essentially, the user's access rights, so that the model never sees a document the user may not read.

## Building the prompt and citing sources {#sec-prompt}

The chunks that survive reranking go into the prompt, and here the lessons of [[prompting-rag/prompt-design]] apply directly: delimit the sources and number them, instruct the model to answer only from them and to cite them, tell it what to do when they do not contain the answer, and mind the position effects of [[prompting-rag/prompt-design#sec-position]] by putting the strongest chunks at the start or end.

::: example A context budget {#ex-budget}
A model has an $8192$-token context. The system instructions take $500$ tokens, the question $100$, and $800$ are reserved for the answer. How many $512$-token chunks fit?
::: solution
$8192 - 500 - 100 - 800 = 6792$ tokens remain, and $6792/512 = 13.3$, so $13$ chunks. With a $128{,}000$-token context the budget would allow some $240$ chunks, but more is not automatically better: irrelevant chunks distract the model and cost latency and money on every call, so the number of chunks should be chosen by measured answer quality, not by capacity.
:::
:::

The listing builds a complete, if tiny, retrieval pipeline in plain Python: word-window chunking with overlap, BM25 retrieval over chunks ([[prompting-rag/vector-search#def-bm25]]), a prompt with numbered, attributed sources, and a crude check of the citations in an answer.

```python
import math, re
DOCS = {
  "handbook.txt": "Staff may work from home on up to two days per week. Requests for more "
                  "remote days need written approval from a line manager. The office opens at "
                  "8 am and closes at 7 pm on weekdays.",
  "it-policy.txt": "Laptops must be encrypted. Passwords are rotated every 90 days. Lost "
                   "devices must be reported to the IT desk within 24 hours.",
  "travel.txt": "Train travel is reimbursed in second class. Flights need approval from a "
                "line manager when the fare exceeds 500 euros.",
}
def tokenize(s): return re.findall(r"[a-z0-9]+", s.lower())

def chunk(text, size=12, overlap=4):            # fixed-size word windows with overlap
    w = text.split(); out = []
    for start in range(0, max(len(w) - overlap, 1), size - overlap):
        out.append(" ".join(w[start:start + size]))
    return out

chunks = [(src, i, c) for src, t in DOCS.items() for i, c in enumerate(chunk(t))]
toks = [tokenize(c) for _, _, c in chunks]
N = len(chunks); avgdl = sum(map(len, toks)) / N
def bm25(q, j, k1=1.2, b=0.75):
    K = k1 * (1 - b + b * len(toks[j]) / avgdl); s = 0.0
    for t in set(tokenize(q)):
        n = sum(t in d for d in toks); tf = toks[j].count(t)
        if tf: s += math.log(1 + (N - n + 0.5) / (n + 0.5)) * tf * (k1 + 1) / (tf + K)
    return s

def build_prompt(question, k=3):
    top = sorted(range(N), key=lambda j: -bm25(question, j))[:k]
    sources = "\n".join(f"[{n}] ({chunks[j][0]}#{chunks[j][1]}) {chunks[j][2]}"
                        for n, j in enumerate(top, 1))
    return ("Answer the question using only the numbered sources. Cite sources as [n] "
            "after each claim. If the sources do not contain the answer, say so.\n\n"
            f"Sources:\n{sources}\n\nQuestion: {question}\nAnswer:"), top

print(f"{N} chunks from {len(DOCS)} documents")
prompt, top = build_prompt("How many days per week can I work from home?")
print(prompt)

def check_citations(answer, top, min_overlap=0.5):  # crude lexical support check
    for sent in re.split(r"(?<=[.!?])\s+", answer.strip()):
        cited = [int(n) for n in re.findall(r"\[(\d+)\]", sent)]
        words = set(tokenize(re.sub(r"\[\d+\]", "", sent)))
        if not cited:
            print("  NO CITATION :", sent); continue
        for n in cited:
            if not 1 <= n <= len(top):
                print(f"  BAD SOURCE [{n}]:", sent); continue
            src = set(toks[top[n - 1]])
            frac = len(words & src) / len(words)
            print(f"  [{n}] overlap {frac:.2f}", "ok  " if frac >= min_overlap else "WEAK", ":", sent)

check_citations("You may work from home up to two days per week [1]. "
                "More remote days need written approval [2]. "
                "Approval is usually granted within a week [3]. Managers decide [4].", top)
```

```text
10 chunks from 3 documents
Answer the question using only the numbered sources. Cite sources as [n] after each claim. If the sources do not contain the answer, say so.

Sources:
[1] (handbook.txt#0) Staff may work from home on up to two days per week.
[2] (handbook.txt#1) two days per week. Requests for more remote days need written approval
[3] (handbook.txt#2) days need written approval from a line manager. The office opens at

Question: How many days per week can I work from home?
Answer:
  [1] overlap 0.91 ok   : You may work from home up to two days per week [1].
  [2] overlap 1.00 ok   : More remote days need written approval [2].
  [3] overlap 0.29 WEAK : Approval is usually granted within a week [3].
  BAD SOURCE [4]: Managers decide [4].
```

The answer passed to the checker stands in for a model's output. Its first two claims are supported by the sources they cite; the third cites a real source that does not say it — a fabricated detail dressed in a citation — and the fourth cites a source that does not exist. Word overlap is far too crude for production (it misses paraphrases and is fooled by negation); real systems check support with an entailment model or an LLM judge ([[prompting-rag/rag-evaluation]]). Note also that the small chunks have cut the handbook mid-sentence: chunk $2$ alone does not say *who* must approve, which is exactly the context problem of [[#sec-chunking]].

Citations are what make a RAG answer checkable, but they are not automatically honest. Liu, Zhang and Liang (2023) audited four generative search engines and found that on average only about half of the generated sentences were fully supported by their citations, and about three-quarters of the citations supported the sentence they were attached to; benchmarks such as ALCE (Gao et al., 2023) measure citation quality systematically. [[prompting-rag/hallucination]] discusses why models add unsupported details and how to reduce it.

::: warning Retrieval does not make the model use the sources
Putting the right passage in the prompt does not guarantee an answer that follows it. A model may prefer its parametric memory when the passage contradicts what it learned — especially for well-known facts — or blend the two; it may also over-trust a retrieved passage that is wrong or out of date. Studies of knowledge conflicts (for example Longpre et al., 2021; Xie et al., 2024) found both behaviours, depending on the model and on how convincing the passage is. Instruct the model explicitly, test it with passages that contradict its likely prior, and keep the index current: a RAG system is only as correct as its documents.
:::

::: quiz
A RAG system answers a question about the current parental-leave policy incorrectly. The correct policy document is in the index. Which check should come first?
- [ ] Switch to a larger generator model.
- [x] Check whether the correct chunk was among the retrieved (and reranked) chunks for this question.
- [ ] Increase the temperature so the model explores more answers.
- [ ] Remove the citation instruction from the prompt.
::: solution
The generator cannot use a passage it never saw. If the correct chunk was not retrieved, the problem is in chunking, the query or the retriever; if it was retrieved but the answer is still wrong, look at its position in the prompt, conflicting chunks (an older policy?) and the instructions. Measuring retrieval and generation separately is the first rule of [[prompting-rag/rag-evaluation]].
:::
:::

## Failure modes and design choices {#sec-failures}

Most RAG failures fall into a few categories, each with its own remedy.

| failure | symptom | typical remedies |
|---|---|---|
| retrieval miss | right document exists, not retrieved | hybrid search, better chunking, query rewriting, fine-tuned embeddings |
| ranking error | retrieved, but too low to be used | reranking, more chunks, ordering by relevance at the ends |
| missing context in chunk | chunk lacks the subject or condition | structure-aware chunking, titles and headings in chunks, parent sections |
| conflicting or stale sources | old and new versions both retrieved | metadata filters, deduplication, dates in the prompt |
| unsupported generation | answer adds details not in sources | citation instructions, verification, abstention ([[prompting-rag/hallucination]]) |
| unanswerable question | answer invented when sources are silent | explicit "not found" option, measured refusal rate |

Two broader design choices recur. **RAG or long context?** By 2026 some models accept a million tokens, and for a small, stable collection it can be simpler to put everything in the prompt. Comparisons such as Li et al. (2024) found that long-context models, given enough budget, can match or exceed RAG on some benchmarks, while RAG remains far cheaper per query; position effects and distraction also grow with context length. Retrieval scales to collections no context can hold, enforces access control per document, and gives provenance. **RAG or fine-tuning?** Fine-tuning teaches a model formats, styles and skills; it is a poor way to add facts that change, and gives no provenance. They are complements: models can be fine-tuned to use retrieved context better, for instance to cite and to abstain (Asai et al., 2024, trained models to decide when to retrieve and to critique their own use of passages).

::: history
Open-domain question answering over retrieved text predates neural networks: the TREC question-answering track ran from 1999, and IBM's Watson combined search and answer scoring to win at *Jeopardy!* in 2011. Chen et al. (2017) built DrQA from a TF–IDF retriever and a neural reader over Wikipedia; Lee, Chang and Toutanova (2019) trained a retriever from question–answer pairs alone (ORQA). In 2020 REALM (Guu et al.) trained a retriever during pretraining, DPR (Karpukhin et al.) made dense retrieval standard, and Lewis et al. named retrieval-augmented generation and formulated RAG-Sequence and RAG-Token. Fusion-in-Decoder (Izacard and Grave, 2021), RETRO (Borgeaud et al., 2022) and Atlas (Izacard et al., 2023) explored architectures. From 2022–2023, retrieval connected to instruction-tuned LLMs by prompts became the dominant pattern for question answering over private and current documents, with work on citation (Gao et al., 2023), adaptive retrieval (Asai et al., 2024) and agentic search following.
:::

::: summary
- RAG pairs a model's parametric memory with a searchable non-parametric index: documents are chunked and indexed offline, and for each query the top chunks are retrieved, reranked and put in the prompt with an instruction to answer from them and cite them.
- Lewis et al. (2020) treated the retrieved passage as a latent variable: RAG-Sequence marginalises over passages for the whole answer, RAG-Token at every token.
- The retriever can be trained through the generator: the gradient of the marginal likelihood raises the scores of passages whose posterior exceeds their prior (REALM).
- Chunk size and structure decide what can be retrieved; overlap of $o$ in chunks of $c$ costs a factor $c/(c - o)$ in storage; titles and headings restore lost context.
- A fast, recall-oriented first stage (dense, BM25 or hybrid) followed by a precise cross-encoder reranker is the standard retrieval design; query rewriting, HyDE and iterative retrieval help with hard queries.
- Citations make answers checkable but are often incomplete or wrong; verify support, and give the model a way to say the sources are silent.
- Diagnose failures stage by stage: miss, ranking, chunk context, conflicting sources, unsupported generation, unanswerable questions.
:::

## Exercises

::: exercise Counting chunks {level=1 check="13"}
A $5000$-token document is split into $500$-token chunks with an overlap of $100$ tokens. How many chunks are there?
::: solution
$\lceil(5000 - 500)/400\rceil + 1 = \lceil11.25\rceil + 1 = 13$.
:::
:::

::: exercise A larger context budget {level=1 check="35"}
A model has a $16{,}384$-token context; instructions and question take $1384$ tokens and $1000$ are reserved for the answer. How many $400$-token chunks fit?
::: solution
$16{,}384 - 1384 - 1000 = 14{,}000$ tokens, and $14{,}000/400 = 35$ chunks exactly.
:::
:::

::: exercise RAG-Sequence by hand {level=1 check="0.29"}
Two passages have retrieval probabilities $0.5$ each. Given $z_1$ the generator assigns the two answer tokens probabilities $0.8$ and $0.5$; given $z_2$, $0.2$ and $0.9$. Compute $p(y\mid x)$ under RAG-Sequence.
::: solution
$0.5\cdot0.8\cdot0.5 + 0.5\cdot0.2\cdot0.9 = 0.2 + 0.09 = 0.29$.
:::
:::

::: exercise RAG-Token by hand {level=1 check="0.35"}
For the numbers of the previous exercise, compute $p(y\mid x)$ under RAG-Token.
::: solution
$(0.5\cdot0.8 + 0.5\cdot0.2)(0.5\cdot0.5 + 0.5\cdot0.9) = 0.5\cdot0.7 = 0.35$, higher than RAG-Sequence's $0.29$ because each token can lean on the passage that supports it.
:::
:::

::: exercise Storage overhead of overlap {level=1 check="1.143"}
By what factor does an overlap of $64$ tokens in $512$-token chunks multiply the amount of text stored in the index, to three decimal places?
::: solution
$c/(c - o) = 512/448 = 1.143$.
:::
:::

::: exercise A retriever gradient {level=2 check="0.477"}
In [[#ex-realm]], verify the coefficient of the second passage, $p(z_2\mid x, y) - p(z_2\mid x)$, to three decimal places. What would the coefficients be if all three passages explained the answer equally well?
::: solution
$p(z_2\mid x) = e/(e^2 + e + 1) = 0.2447$; the marginal is $0.2713$, so $p(z_2\mid x, y) = 0.2447\cdot0.8/0.2713 = 0.7216$, and the coefficient is $0.7216 - 0.2447 = 0.477$. If $p(y\mid x, z)$ is the same for all passages, the posterior equals the prior and every coefficient is zero: the answer gives no evidence about which passage is better, so the retriever is not changed.
:::
:::

::: exercise When the two RAG models agree {level=2}
Show that RAG-Sequence and RAG-Token give the same $p(y\mid x)$ when (a) only one passage is retrieved, or (b) the generator's distribution does not depend on the passage. Can they differ for an output of a single token?
::: solution
(a) With one passage $p(z\mid x) = 1$, both formulas reduce to $\prod_ip_\theta(y_i\mid x, z, y_{<i})$. (b) If $p_\theta(y_i\mid x, z, y_{<i}) = g_i$ for every $z$, RAG-Sequence gives $\sum_zp(z\mid x)\prod_ig_i = \prod_ig_i$ and RAG-Token $\prod_i\sum_zp(z\mid x)g_i = \prod_ig_i$. For a single-token output the two formulas are identical, $\sum_zp(z\mid x)p_\theta(y_1\mid x, z)$, so no example exists: they can only differ when the output has at least two tokens and different tokens are best supported by different passages, as in [[#ex-rag-models]].
:::
:::

::: exercise Diagnosing a pipeline {level=2}
Users report that a RAG assistant over product manuals often answers "the manual does not say" for questions whose answers are in tables of specifications. Propose three hypotheses at different stages of the pipeline and a test for each.
::: solution
(1) *Chunking/extraction*: tables are flattened into text that loses the row–column structure, or split across chunks so that the value and its header are separated. Test: inspect the chunks of a few affected manuals; try table-aware extraction that writes each row with its headers. (2) *Retrieval*: embeddings of number-heavy rows are poor matches for natural-language questions, and exact model numbers are missed. Test: measure whether the right chunk appears in the top $k$ for a labelled set of such questions, with dense, BM25 and hybrid retrieval. (3) *Generation*: the chunk is retrieved, but the model fails to read the value from a linearised table or the instruction to abstain is too strong. Test: give the model the gold chunk directly and measure its accuracy; vary the table format (Markdown table, one row per line) and the abstention wording. Each test isolates one stage.
:::
:::

::: exercise Maximal marginal relevance {level=3}
**Maximal marginal relevance** (MMR; Carbonell and Goldstein, 1998) selects chunks one at a time, each time taking the candidate $d$ that maximises $\lambda\,\mathrm{sim}(q, d) - (1 - \lambda)\max_{d'\in S}\mathrm{sim}(d, d')$, where $S$ is the set already selected. Implement it in plain Python on a candidate set containing three near-duplicates of one passage and two other relevant passages, and compare $\lambda = 1$, $0.7$ and $0.5$.
::: solution
```python
import math, random
rng = random.Random(3)
def unit(v): n = math.sqrt(sum(x*x for x in v)); return [x/n for x in v]
def cos(a, b): return sum(x*y for x, y in zip(a, b))
q = unit([1, 1, 0, 0])
base = {"A": [1, 0.3, 0, 0], "B": [0.2, 1, 0.3, 0], "C": [0.6, 0.6, 0, 0.8]}
cands = {}
for name, v in base.items():                       # A has three near-duplicates
    for r in range(3 if name == "A" else 1):
        cands[f"{name}{r}"] = unit([x + rng.gauss(0, 0.03) for x in v])

def mmr(q, cands, k, lam):
    chosen, rest = [], dict(cands)
    while rest and len(chosen) < k:
        def score(n):
            red = max((cos(cands[n], cands[c]) for c in chosen), default=0.0)
            return lam * cos(q, cands[n]) - (1 - lam) * red
        best = max(rest, key=score); chosen.append(best); del rest[best]
    return chosen

print({n: round(cos(q, v), 3) for n, v in cands.items()})
print("lambda=1.0:", mmr(q, cands, 3, 1.0))
print("lambda=0.7:", mmr(q, cands, 3, 0.7))
print("lambda=0.5:", mmr(q, cands, 3, 0.5))
```

```text
{'A0': 0.895, 'A1': 0.877, 'A2': 0.889, 'B0': 0.811, 'C0': 0.704}
lambda=1.0: ['A0', 'A2', 'A1']
lambda=0.7: ['A0', 'B0', 'A2']
lambda=0.5: ['A0', 'B0', 'C0']
```

With $\lambda = 1$, MMR is plain ranking by relevance and fills all three slots with copies of passage A, which add nothing after the first. At $\lambda = 0.7$ the redundancy penalty brings in B; at $\lambda = 0.5$ the three slots hold three different passages. The right $\lambda$ is a trade-off: too low and genuinely relevant but similar passages (two parts of one procedure) are dropped. Deduplicating near-identical chunks at indexing time removes the most common case at no query cost.
:::
:::

::: exercise Access control {level=3}
A company indexes all its documents for a RAG assistant, but each employee may read only some of them. Explain why filtering *after* generation (checking the answer for confidential content) is inadequate, describe where access control must be enforced, and say how it interacts with approximate vector search.
::: solution
Once a confidential chunk is in the prompt, the model may paraphrase, summarise or combine it with other information, and no output filter can reliably recognise every such leak; the answer may also reveal the document's existence. Access control must therefore be enforced at retrieval: every chunk carries the permissions of its document, and the retriever returns only chunks the requesting user may read — the generator never sees anything else. With approximate search, filtering after retrieving the top $k$ can leave too few results (if most near neighbours are forbidden), so systems either search with the filter built in (indexes that support filtered search, or separate indexes per permission group) or retrieve many more candidates before filtering; in both cases the recall of the filtered search must be measured. Permissions must also be kept in sync with the source systems, since a document whose access is revoked must disappear from the index promptly.
:::
:::
