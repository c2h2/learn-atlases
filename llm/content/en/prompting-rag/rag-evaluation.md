A retrieval-augmented system has many moving parts — chunking, embedding, indexing, retrieval, reranking, prompting, generation — and a change to any of them can make answers better or worse in ways that are invisible from a handful of examples. A new embedding model may retrieve better passages for most questions and lose the one that matters for a common query; a new prompt may make answers more fluent and less faithful. Without measurement, a RAG system is tuned by anecdote.

This chapter builds the measurements. It starts with the retriever, which can be evaluated with the classic metrics of information retrieval — recall and precision at $k$, mean reciprocal rank and normalised discounted cumulative gain — computed by hand and in code; it then evaluates answers, with exact match and token overlap where there is a short reference, and with faithfulness and relevance where there is not. Much of the latter is done today by language models acting as judges, so the chapter treats their biases and how to validate them against human labels, and closes with the statistics needed to tell a real improvement from noise. The general theory of evaluating search is in the Computer Science Atlas ([evaluating search](/learn/cs/lesson.php?c=information-retrieval&l=evaluation)); this chapter concentrates on what is specific to retrieval for language models.

## Evaluate the parts separately {#sec-principle}

The first rule is structural. An answer can be wrong because the right passage was not retrieved, because it was retrieved but ranked too low to reach the prompt, or because the generator ignored or misread it. These failures call for different fixes, so measure them separately.

::: definition Component and end-to-end evaluation {#def-levels}
For a RAG system evaluated on a set of queries, **retrieval evaluation** compares the ranked chunks returned for each query with relevance judgements; **generation evaluation** assesses each answer given the chunks it received — whether it is supported by them and responsive to the question; **end-to-end evaluation** compares the final answer with a reference or with the needs of the user, regardless of how it was produced.
:::

An evaluation set therefore needs, for each query, some of: the **relevant chunks** (or documents), with graded relevance if possible; a **reference answer**; and the **context actually passed** to the generator, logged at evaluation time. Collections built this way are called **test collections**. Public ones — Natural Questions (Kwiatkowski et al., 2019), the zero-shot retrieval benchmark BEIR (Thakur et al., 2021), the knowledge-intensive tasks of KILT (Petroni et al., 2021), which include provenance — are useful for comparing methods, but the evaluation that decides a deployment is built from the system's own users and documents: a few hundred real queries, judged carefully, usually say more than any leaderboard.

Relevance judgements are expensive, and nobody can judge every document in a collection for every query. The TREC evaluations made **pooling** standard: judge only the union of the top results of several systems, and treat everything unjudged as non-relevant. The pool is then biased towards the systems that formed it, and a new system that finds relevant documents nobody judged is penalised; when you change retrievers, judge the new system's unjudged top results too.

## Retrieval metrics {#sec-retrieval-metrics}

Let a query have a set $\mathrm{Rel}$ of relevant chunks, $\lvert\mathrm{Rel}\rvert = R$, and let the retriever return a ranked list $d_1, d_2, \dots$.

::: definition Recall, precision and reciprocal rank {#def-recall}
At a cut-off $k$,

$$
\operatorname{recall@}k = \frac{\lvert\{d_1, \dots, d_k\}\cap\mathrm{Rel}\rvert}{R}, \qquad \operatorname{precision@}k = \frac{\lvert\{d_1, \dots, d_k\}\cap\mathrm{Rel}\rvert}{k}.
$$

The **hit rate**@$k$ is $1$ if at least one relevant chunk is in the top $k$ and $0$ otherwise. The **reciprocal rank** is $1/r$, where $r$ is the rank of the first relevant chunk ($0$ if there is none), and the **mean reciprocal rank** (MRR) is its average over queries. Each metric is averaged over the queries of the evaluation set.
:::

For RAG, **recall@$k$ at the number of chunks passed to the generator** is the most important single retrieval number: a relevant chunk outside the top $k$ never reaches the model. Precision@$k$ matters too, because irrelevant chunks distract the generator ([[prompting-rag/prompt-design#sec-position]]). MRR rewards putting *a* relevant result first and suits questions with one answer.

::: example Metrics for one query {#ex-recall}
A query has three relevant chunks. The retriever's top five are, in order, irrelevant, relevant, irrelevant, relevant, irrelevant, and the third relevant chunk is at rank $9$. Compute recall@5, precision@5, hit rate@1 and the reciprocal rank. If two other queries have their first relevant chunk at ranks $1$ and $4$, what is the MRR over the three?
::: solution
Two relevant chunks in the top five: recall@5 $= 2/3 = 0.667$, precision@5 $= 2/5 = 0.4$. The top result is irrelevant, so hit rate@1 $= 0$. The first relevant chunk is at rank $2$: reciprocal rank $1/2$. MRR $= (1/2 + 1 + 1/4)/3 = 0.583$. If the generator receives five chunks, a third of the relevant material never reaches it for this query.
:::
:::

Recall and precision treat the top $k$ as a set. **Discounted cumulative gain** uses the order and graded relevance: highly relevant chunks are worth more, and a chunk is worth less the lower it is ranked (Järvelin and Kekäläinen, 2002).

::: definition Normalised discounted cumulative gain {#def-ndcg}
Let $g_i\ge0$ be the gain of the chunk at rank $i$ — commonly $g_i = 2^{\mathrm{rel}_i} - 1$ for a graded relevance $\mathrm{rel}_i\in\{0, 1, 2, 3\}$, or $g_i = \mathrm{rel}_i$. Then

$$
\operatorname{DCG@}k = \sum_{i=1}^{k}\frac{g_i}{\log_2(i + 1)}, \qquad \operatorname{nDCG@}k = \frac{\operatorname{DCG@}k}{\operatorname{IDCG@}k},
$$ {#eq-ndcg}

where $\operatorname{IDCG@}k$ is the DCG of the **ideal** ranking, all judged chunks sorted by decreasing gain.
:::

::: proposition nDCG lies in $[0, 1]$ {#prop-ndcg}
Among all orderings of a fixed multiset of gains, DCG@$k$ is maximised by sorting the gains in decreasing order. Consequently $0\le\operatorname{nDCG@}k\le1$, with equality at $1$ exactly when the ranking's top $k$ gains are as large, position by position, as the ideal ones.
:::

::: proof
The discounts $w_i = 1/\log_2(i + 1)$ are strictly decreasing in $i$. If some ranking has $g_i < g_j$ with $i < j$, swapping the two changes DCG by $(w_i - w_j)(g_j - g_i) > 0$, so it increases. Starting from any ranking, repeated swaps of such inversions reach the sorted order (each swap reduces the number of inversions), and DCG never decreases along the way; hence the sorted order is a maximum. The ideal ranking sorts all judged chunks, including any not retrieved, so its top $k$ gains dominate those of any retrieved list and $\operatorname{DCG@}k\le\operatorname{IDCG@}k$. All terms are non-negative, so $\operatorname{nDCG@}k\ge0$.
:::

::: example nDCG by hand {#ex-ndcg}
The top five chunks for a query have graded relevance $2, 0, 3, 1, 0$, and no other chunk is relevant. Compute nDCG@5 with gains $2^{\mathrm{rel}} - 1$.
::: solution
The gains are $3, 0, 7, 1, 0$ and the discounts $1, 0.631, 0.5, 0.431, 0.387$. DCG $= 3 + 0 + 3.5 + 0.431 + 0 = 6.931$. The ideal order of relevances is $3, 2, 1, 0, 0$, with gains $7, 3, 1$: IDCG $= 7 + 3\cdot0.631 + 1\cdot0.5 = 9.393$. So nDCG@5 $= 6.931/9.393 = 0.738$. Putting the most relevant chunk third instead of first costs a quarter of the score; with linear gains ($g = \mathrm{rel}$) the same ranking scores $3.931/4.762 = 0.825$, so always say which gain you use.
:::
:::

::: widget plot
f: 1/(log(x + 1)/log(2)); 1/x
x: 1, 20
y: 0, 1.05
labels: DCG discount $1/\log_2(i + 1)$; reciprocal rank $1/i$
points: 1,1; 2,0.631; 3,0.5
caption: How much a relevant result is worth at rank $i$ under DCG and under reciprocal rank. Reciprocal rank falls off steeply — a relevant result at rank $2$ is worth half of one at rank $1$ — and it counts only the first relevant result. The DCG discount falls slowly ($0.63$ at rank $2$, $0.5$ at rank $3$, $0.29$ at rank $10$) and counts all of them, which suits RAG, where several chunks are read by the generator.
:::

The listing simulates two retrievers on $40$ queries, each with three relevant documents among $200$, computes the three metrics, and estimates a paired bootstrap interval for the difference in MRR.

```python
import math, random
rng = random.Random(11)
Q, D, R = 40, 200, 3                     # queries, documents per query, relevant per query

def run(mu):                             # simulated retriever: relevant docs score higher by mu
    out = []
    for q in range(Q):
        scores = [(rng.gauss(mu if d < R else 0, 1), d) for d in range(D)]   # docs 0..R-1 relevant
        out.append([d for _, d in sorted(scores, reverse=True)])
    return out

def recall_at(rank, k): return sum(d < R for d in rank[:k]) / R
def rr(rank): return next((1 / (i + 1) for i, d in enumerate(rank) if d < R), 0.0)
def ndcg_at(rank, k):
    dcg = sum(1 / math.log2(i + 2) for i, d in enumerate(rank[:k]) if d < R)
    idcg = sum(1 / math.log2(i + 2) for i in range(min(R, k)))
    return dcg / idcg

A, B = run(2.0), run(2.5)
for name, runs in (("A", A), ("B", B)):
    print(f"{name}: recall@10 {sum(recall_at(r, 10) for r in runs)/Q:.3f}  "
          f"MRR {sum(map(rr, runs))/Q:.3f}  nDCG@10 {sum(ndcg_at(r, 10) for r in runs)/Q:.3f}")

diff = [rr(b) - rr(a) for a, b in zip(A, B)]          # paired per-query differences
boots = sorted(sum(diff[rng.randrange(Q)] for _ in range(Q)) / Q for _ in range(2000))
print(f"MRR difference B - A {sum(diff)/Q:+.3f}, 95% bootstrap interval "
      f"[{boots[49]:+.3f}, {boots[1949]:+.3f}]")
```

```text
A: recall@10 0.575  MRR 0.636  nDCG@10 0.493
B: recall@10 0.808  MRR 0.788  nDCG@10 0.708
MRR difference B - A +0.153, 95% bootstrap interval [+0.023, +0.281]
```

Retriever B is better on all three metrics, and the paired interval for the MRR difference excludes zero — but only just, with $40$ queries, although B's simulated advantage is substantial. The interval's width, about $0.26$, is the honest statement of how much $40$ queries can tell. Pairing matters: both retrievers face the same queries, and resampling queries keeps their results together ([[prompting-rag/prompt-design#sec-testing]] uses the same idea for prompts).

## Answer metrics with a reference {#sec-reference}

When questions have short reference answers — names, numbers, dates — answers can be scored automatically against them. The extractive question-answering tradition of SQuAD (Rajpurkar et al., 2016) defined the two standard measures.

::: definition Exact match and token F1 {#def-em-f1}
Normalise the predicted and reference answers by lower-casing and removing punctuation and the articles *a*, *an*, *the*, and split them into tokens. **Exact match** (EM) is $1$ if the token sequences are identical and $0$ otherwise. **Token F1** is the harmonic mean of precision (the fraction of predicted tokens that occur in the reference, counted with multiplicity) and recall (the fraction of reference tokens that occur in the prediction). With several references, take the maximum over them.
:::

::: example EM and F1 {#ex-f1}
The reference answer is *Eiffel Tower*. Score the predictions *The Eiffel Tower.*, *the Eiffel Tower in Paris* and *Tower of London*.
::: solution
After normalisation the reference is (*eiffel*, *tower*). *The Eiffel Tower.* becomes (*eiffel*, *tower*): EM $1$, F1 $1$. *the Eiffel Tower in Paris* becomes (*eiffel*, *tower*, *in*, *paris*): EM $0$; precision $2/4$, recall $2/2$, F1 $= 2\cdot0.5\cdot1/1.5 = 0.667$. *Tower of London* becomes (*tower*, *of*, *london*): precision $1/3$, recall $1/2$, F1 $= 0.4$ — partial credit for a wrong answer that shares a word.
:::
:::

EM is too strict for generated answers, which are full sentences ("The tower in question is the Eiffel Tower, completed in 1889"), and F1 rewards word overlap rather than correctness. Generative evaluations therefore often check whether the reference answer *appears in* the response, or ask a model to judge whether the response and the reference agree — which leads to judges.

## Answer metrics without a reference {#sec-faithfulness}

Many RAG questions have no short reference: *Summarise our travel policy for contractors.* Two properties can still be assessed against the retrieved context and the question.

::: definition Faithfulness and answer relevance {#def-faithfulness}
Decompose an answer into atomic **claims** $c_1, \dots, c_m$. Its **faithfulness** (or groundedness) is the fraction of claims supported by — entailed by — the context passed to the generator:

$$
\operatorname{faithfulness} = \frac{\lvert\{j : \text{context}\models c_j\}\rvert}{m}.
$$

Its **answer relevance** is the degree to which it addresses the question asked, regardless of correctness. The context can be scored in the same spirit: **context precision**, the fraction of retrieved chunks relevant to the question, and **context recall**, the fraction of the claims in a reference answer that are supported by the retrieved chunks.
:::

These definitions follow frameworks such as RAGAS (Es et al., 2024), which implement each step — claim extraction, entailment checks, relevance — with LLM prompts, and FActScore (Min et al., 2023) for factual precision of long generations ([[prompting-rag/hallucination#sec-measuring]]). Faithfulness is the generation-side counterpart of hallucination: an unfaithful claim is an intrinsic or extrinsic hallucination with respect to the context ([[prompting-rag/hallucination#def-intrinsic]]).

::: example Faithfulness of an answer {#ex-faithfulness}
An answer about remote work makes five claims: (1) staff may work from home two days a week; (2) more days need written approval; (3) the approver is the line manager; (4) approval usually takes a week; (5) the office opens at 8 am. The context supports (1), (2), (3) and (5). Compute the faithfulness, and comment on claim (5).
::: solution
Four of five claims are supported: faithfulness $4/5 = 0.8$. Claim (4) is an extrinsic hallucination. Claim (5) is faithful but irrelevant to a question about remote work, which lowers answer relevance, not faithfulness — the two metrics are deliberately separate, and a system can score perfectly on one and poorly on the other.
:::
:::

Note what faithfulness does *not* measure: whether the context itself is correct and complete. A faithful answer built on an outdated policy is still wrong, which is why context recall and end-to-end correctness are measured too.

## Language models as judges {#sec-judges}

Claim extraction, entailment and relevance can be judged by people, but people are slow and expensive. Using a strong language model as the judge — **LLM-as-a-judge** — makes evaluation cheap enough to run on every change. Zheng et al. (2023) found that a strong model's pairwise preferences between chatbot answers agreed with human experts' over $80\%$ of the time, about as often as the experts agreed with each other, and documented systematic biases. [[evaluation/model-judges]] treats judges in general; the points that matter most for RAG are these.

- **Position bias**: in pairwise comparisons, judges favour the answer shown first (or second). Evaluate both orders and count only consistent verdicts, or average.
- **Verbosity bias**: longer answers are preferred even when they add nothing. Control length, or instruct and check the judge against short correct answers.
- **Self-preference**: judges may favour outputs of their own model family. Use a judge from a different family where possible, and validate.
- **Leniency on unsupported claims**: a judge may accept a claim that is true in the world but not in the context. Ask explicitly about support *by the given context*, one claim at a time, and require the judge to quote the supporting passage.
- **Drift**: a judge served by an external provider can change without notice; pin versions where you can and re-validate when the judge changes.

A judge is a measuring instrument, and an instrument must be calibrated against a standard. Label a sample of a few hundred items by humans, run the judge on the same items, and measure agreement beyond chance.

::: definition Cohen's kappa {#def-kappa}
Two raters label the same $n$ items with categories. Let $p_o$ be the fraction of items on which they agree, and $p_e = \sum_c p_c^{(1)}p_c^{(2)}$ the agreement expected by chance, where $p_c^{(r)}$ is the fraction of items rater $r$ puts in category $c$. **Cohen's kappa** is

$$
\kappa = \frac{p_o - p_e}{1 - p_e},
$$

which is $1$ for perfect agreement and $0$ for agreement no better than chance.
:::

::: example Validating a faithfulness judge {#ex-kappa}
On $100$ answers, a judge and a human expert both label "faithful" $60$ times and both "unfaithful" $20$ times; the judge says faithful and the human unfaithful $15$ times, and the reverse $5$ times. Compute the agreement and kappa. What does the disagreement pattern suggest?
::: solution
$p_o = 80/100 = 0.8$. The judge says faithful $75\%$ of the time, the human $65\%$, so $p_e = 0.75\cdot0.65 + 0.25\cdot0.35 = 0.4875 + 0.0875 = 0.575$, and $\kappa = (0.8 - 0.575)/(1 - 0.575) = 0.529$, moderate agreement. The disagreements are lopsided: $15$ of the $20$ are answers the judge passed and the human failed. The judge is lenient, so its faithfulness scores overestimate the truth. Tighten its prompt (claim-by-claim checks with quotations) and re-measure; or correct the judge's aggregate score using the human-labelled sample, as statistical methods such as prediction-powered inference do (used for RAG evaluation by Saad-Falcon et al., 2024).
:::
:::

::: warning A metric can be optimised away from what it measures
Once a metric — an LLM judge's faithfulness score, say — is used to choose prompts, chunk sizes and models, the system is optimised against the metric's quirks as well as its intent. A generator tuned to please a lenient judge learns to write answers the judge passes; one tuned for token F1 learns to be terse. Keep a human-labelled set that is never used for tuning, re-check the judge's agreement with it periodically, and read failures, not only averages.
:::

::: quiz
A team switches embedding models. Retrieval recall@5 rises from $0.72$ to $0.81$ on their evaluation set, but end-to-end answer correctness, judged by humans, does not change. Which explanation should they investigate first?
- [ ] Recall@5 is not a valid metric for retrieval.
- [ ] The new embedding model must be worse.
- [x] The generator may not be using the additional relevant chunks — for instance because of their position in the prompt, conflicting chunks, or because the questions it got wrong were not the ones whose retrieval improved.
- [ ] End-to-end metrics are always noisier than retrieval metrics, so nothing can be concluded.
::: solution
Retrieval improved, so the bottleneck may now be generation. Look at the questions whose retrieval improved: did their answers change? If the right chunk is now present but the answer is still wrong, examine position, distractors and the instructions. It is also worth checking the uncertainty of both numbers, but "nothing can be concluded" is not the first step.
:::
:::

## How many queries? {#sec-statistics}

Every metric above is an average over queries and has sampling error. For a proportion — hit rate, the fraction of answers judged correct — measured on $n$ independent queries, the standard error is $\sqrt{p(1 - p)/n}$, and a $95\%$ interval is roughly $\pm1.96$ standard errors (better, the Wilson interval of [[ml-fundamentals/evaluation-metrics#def-wilson]]).

::: example The width of an interval {#ex-interval}
An end-to-end evaluation on $200$ questions finds $70\%$ of answers correct. What is the approximate $95\%$ interval? How many questions would halve its width?
::: solution
$1.96\sqrt{0.7\cdot0.3/200} = 1.96\cdot0.0324 = 0.064$: about $70\% \pm 6.4$ points. The width falls like $1/\sqrt n$, so halving it needs four times as many questions, $800$. A change of three points measured on $200$ questions is well inside the noise unless the comparison is paired (same questions, both systems) and analysed with a paired test, which removes the variation between questions.
:::
:::

::: widget plot
f: 1.96*sqrt(p*(1 - p)/x)
x: 20, 2000
y: 0, 0.25
sliders: p=0.7:0.05:0.95:0.05
labels: half-width of a $95\%$ interval for a proportion
points: 200,0.0635; 800,0.0318
caption: The approximate half-width $1.96\sqrt{p(1 - p)/n}$ of a $95\%$ confidence interval for an accuracy $p$ measured on $n$ independent queries. At $p = 0.7$, $200$ queries give $\pm6.4$ points and $800$ give $\pm3.2$, as in [[#ex-interval]]. The curve flattens: each further halving of the interval needs four times the data, so paired designs, which reduce the variance itself, are worth more than brute numbers.
:::

Three further cautions apply. Queries are rarely independent — many may be paraphrases of a few information needs — so effective sample sizes are smaller than counts. Several metrics and many variants compared on the same set invite false discoveries; confirm the winner on held-out queries. And a system's quality differs across kinds of query: report results by category (short factual, multi-hop, unanswerable, by product or language), because an average can hide a category that got much worse.

::: history
Systematic evaluation of retrieval began with the Cranfield experiments of Cleverdon in the 1960s, which introduced test collections of documents, queries and relevance judgements and the measures of recall and precision. The Text REtrieval Conference (TREC), run by NIST from 1992, scaled the method with pooling and shared tasks, including question answering from 1999. Voorhees (1999) used mean reciprocal rank in TREC question answering, and Järvelin and Kekäläinen (2002) introduced cumulative gain measures for graded relevance. Rajpurkar et al. (2016) defined exact match and token F1 for SQuAD; Natural Questions (2019), BEIR (2021) and KILT (2021) became the standard benchmarks for neural retrieval and knowledge-intensive tasks. With generative answers, evaluation turned to faithfulness and attribution (Rashkin et al., 2023; Min et al., 2023), to LLM judges (Zheng et al., 2023) and to RAG-specific frameworks such as RAGAS (Es et al., 2024) and ARES (Saad-Falcon et al., 2024).
:::

::: summary
- Evaluate retrieval, generation and the end-to-end answer separately; each failure has its own fix.
- Recall@$k$ at the number of chunks passed to the generator is the key retrieval number; precision@$k$, hit rate, MRR and nDCG complete the picture. nDCG uses graded gains and logarithmic discounts and lies in $[0, 1]$ because sorted gains maximise DCG.
- With short references, exact match and token F1 score answers, but both are crude for generated text.
- Without references, faithfulness (the fraction of claims supported by the context) and answer relevance assess generation; context precision and recall assess what the generator was given.
- LLM judges make evaluation cheap but have position, verbosity and self-preference biases and can be lenient; validate them against human labels with chance-corrected agreement such as Cohen's kappa.
- Every metric has sampling error that shrinks like $1/\sqrt n$; compare systems on the same queries with paired methods, report by category, and keep a held-out human-labelled set.
:::

## Exercises

::: exercise Recall at five {level=1 check="0.4"}
A query has five relevant chunks; two of them appear in the retriever's top five. What is recall@5? What is precision@5?
::: solution
Recall@5 $= 2/5 = 0.4$, and precision@5 $= 2/5 = 0.4$ as well (a coincidence of $R = k = 5$).
:::
:::

::: exercise Mean reciprocal rank {level=1 check="0.4583"}
For four queries, the first relevant chunk is at ranks $1$, $3$, $2$ and nowhere in the list. Compute the MRR to four decimal places.
::: solution
$(1 + 1/3 + 1/2 + 0)/4 = 1.8333/4 = 0.4583$.
:::
:::

::: exercise nDCG by hand {level=2 check="0.661"}
The top four chunks have relevance $0, 3, 1, 2$, and no other chunk is relevant. Compute nDCG@4 with gains $2^{\mathrm{rel}} - 1$, to three decimal places.
::: solution
Gains $0, 7, 1, 3$; discounts $1, 0.631, 0.5, 0.431$. DCG $= 0 + 4.417 + 0.5 + 1.292 = 6.209$. Ideal relevances $3, 2, 1, 0$ with gains $7, 3, 1, 0$: IDCG $= 7 + 1.893 + 0.5 = 9.393$. nDCG@4 $= 6.209/9.393 = 0.661$.
:::
:::

::: exercise Token F1 {level=1 check="0.4"}
The reference answer is *Eiffel Tower* and the prediction is *Tower of London*. Compute the token F1 after normalisation, and explain why this score is misleading.
::: solution
Prediction tokens (*tower*, *of*, *london*), reference (*eiffel*, *tower*): one common token, precision $1/3$, recall $1/2$, F1 $= 2\cdot\frac13\cdot\frac12/(\frac13 + \frac12) = 0.4$. The answer is simply wrong, yet it earns $40\%$ credit because it shares a word with the reference; F1 measures overlap, not correctness.
:::
:::

::: exercise Kappa when one label dominates {level=2 check="0.377"}
On $100$ answers a judge and a human both say "faithful" $70$ times and both "unfaithful" $10$ times; the judge alone says faithful $12$ times and the human alone $8$ times. Compute $p_o$ and kappa to three decimal places, and compare with [[#ex-kappa]].
::: solution
$p_o = 0.8$, as before. The judge says faithful $82\%$ of the time, the human $78\%$, so $p_e = 0.82\cdot0.78 + 0.18\cdot0.22 = 0.6396 + 0.0396 = 0.6792$ and $\kappa = (0.8 - 0.6792)/(1 - 0.6792) = 0.377$. The raw agreement is the same as in [[#ex-kappa]], but because both raters say "faithful" so often, much of that agreement is expected by chance; kappa is lower. Raw agreement flatters judges on imbalanced labels.
:::
:::

::: exercise Faithfulness {level=1 check="0.75"}
An answer contains eight atomic claims, six of which are supported by the retrieved context. What is its faithfulness? If two of the six supported claims do not address the question, which other metric is affected?
::: solution
$6/8 = 0.75$. Supported but off-topic claims do not lower faithfulness; they lower answer relevance.
:::
:::

::: exercise Swapping a judge's order {level=2}
A pairwise judge compares answers from systems A and B on $200$ questions, always with A shown first, and prefers A $62\%$ of the time. Rerun with B first, A is preferred $48\%$ of the time. What can you conclude about the judge and about the systems, and how should the comparison be reported?
::: solution
The order affects the verdict: on the same pairs, moving A from first to second lowers its win rate by $14$ points, so the judge has a position bias favouring the first answer. Averaging both orders gives A a win rate of about $55\%$, a weaker preference than either run suggests; better still, count only questions on which the judge prefers the same system in both orders, and treat inconsistent ones as ties. Report the consistent-verdict rate, the win rate on consistent questions with a confidence interval, and the fraction of inconsistent verdicts, which measures how much the judge can be trusted for this pair.
:::
:::

::: exercise The sorted order maximises DCG {level=2}
Show that for any decreasing positive weights $w_1 > w_2 > \dots > w_k$ and gains $g_1, \dots, g_k\ge0$, exchanging an adjacent inverted pair ($g_i < g_{i+1}$) increases $\sum_iw_ig_i$, and deduce that the number of exchanges needed to sort is the number of inversions. Why does this argument also show that MRR is maximised by putting a relevant chunk first?
::: solution
Exchanging positions $i$ and $i + 1$ changes the sum by $w_ig_{i+1} + w_{i+1}g_i - w_ig_i - w_{i+1}g_{i+1} = (w_i - w_{i+1})(g_{i+1} - g_i) > 0$. Each adjacent exchange of an inverted pair removes exactly one inversion (pairs $i < j$ with $g_i < g_j$) and creates none, so bubble sort reaches the sorted order in as many exchanges as there are inversions, increasing the sum each time. For MRR, the reciprocal rank depends only on the position of the first relevant chunk, $1/r$, which is largest at $r = 1$; it is the special case of a "DCG" with weights $1/i$ in which only the first relevant item counts.
:::
:::

::: exercise EM and F1 in code {level=3}
Implement SQuAD-style normalisation, exact match and token F1 in plain Python, taking the maximum over several reference answers, and test it on *The Eiffel Tower.*, *the Eiffel Tower in Paris*, *Tower of London* and *Louvre* against the references *Eiffel Tower* and *the Eiffel Tower*.
::: solution
```python
import re, string
from collections import Counter
def normalise(s):                       # SQuAD-style: lower case, drop punctuation and articles
    s = "".join(ch for ch in s.lower() if ch not in string.punctuation)
    return re.sub(r"\b(a|an|the)\b", " ", s).split()
def exact_match(pred, gold): return float(normalise(pred) == normalise(gold))
def f1(pred, gold):
    p, g = normalise(pred), normalise(gold)
    common = sum((Counter(p) & Counter(g)).values())
    if common == 0: return 0.0
    prec, rec = common / len(p), common / len(g)
    return 2 * prec * rec / (prec + rec)
def best(pred, golds, metric): return max(metric(pred, g) for g in golds)

golds = ["Eiffel Tower", "the Eiffel Tower"]
for pred in ["The Eiffel Tower.", "the Eiffel Tower in Paris", "Tower of London", "Louvre"]:
    print(f"{pred!r:30s} EM {best(pred, golds, exact_match):.0f}  F1 {best(pred, golds, f1):.3f}")
```

```text
'The Eiffel Tower.'            EM 1  F1 1.000
'the Eiffel Tower in Paris'    EM 0  F1 0.667
'Tower of London'              EM 0  F1 0.400
'Louvre'                       EM 0  F1 0.000
```

The results agree with [[#ex-f1]]. The `Counter` intersection counts repeated tokens correctly (a token appearing twice in both counts twice), and normalisation makes the two references equivalent.
:::
:::

::: exercise Building an evaluation set {level=3}
You are asked to evaluate a RAG assistant over a company's engineering documentation before launch. Describe how you would build the evaluation set (sources of questions, labels, size), which metrics you would report for each component, how you would validate any LLM judge, and how you would decide whether a proposed change is an improvement.
::: solution
Questions: sample real questions from support tickets, chat logs and search logs (anonymised), add questions written by engineers for important documents, and deliberately include multi-hop questions, questions about recent changes, and unanswerable ones; deduplicate paraphrases into information needs. Labels: for each question, the relevant chunks (judged from a pool of several retrievers' top results, with graded relevance), a reference answer, and the answerability flag. Size: several hundred questions per important category, guided by the interval widths of [[#sec-statistics]]; split into a development set used for tuning and a held-out set. Metrics: retrieval recall@$k$ at the generator's $k$, MRR and nDCG@10; generation faithfulness and answer relevance on the logged context; end-to-end correctness against references, and the abstention rate on unanswerable questions; all by category. Judges: label a few hundred items by humans for each judged metric, measure kappa and the direction of disagreements, fix the judge prompt until agreement is adequate, and re-validate when the judge model changes. Decisions: compare systems on the same questions with paired bootstrap intervals or McNemar's test, require improvement on the held-out set, check that no category regresses beyond its noise, and read a sample of changed answers before shipping.
:::
:::
