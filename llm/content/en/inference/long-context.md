Context windows of language models grew from $2048$ tokens in 2020 to $10^5$–$10^6$ tokens in several model families by 2024–2025. A long context lets a model read a codebase, a contract or a book in one prompt. It also changes what inference costs: attention arithmetic grows with the square of the prompt length, the KV cache with its length, and both eventually dominate the weights. And a long window is not the same as a model that *uses* it well.

This chapter treats long-context inference from four angles. **Cost**: where the quadratic term overtakes the linear one, in prefill and in decode. **Exact attention at scale**: FlashAttention's tiling and online softmax, derived and implemented in plain Python, its split-key form for decoding, and ring attention, which spreads one sequence over many devices. **Approximate attention**: sliding windows and models that interleave local and global layers. **Evaluation and alternatives**: what needle-in-a-haystack tests and RULER-style benchmarks measure and miss, and when retrieval is a better use of tokens than a long context. How a model is *trained* to accept longer positions — position interpolation, NTK-aware scaling, YaRN — is covered in [[pretraining/continued-pretraining#sec-context]] and not repeated here.

## What a long context costs {#sec-cost}

From [[inference/decoding-sampling#prop-phases]], a dense model with $N$ parameters, $L$ layers and width $d$ spends about $2NP + 2LdP^2$ FLOPs to prefill $P$ tokens and $2N + 4Ldt$ FLOPs per decode step at context $t$.

::: proposition Where attention dominates {#prop-crossover-len}
Attention FLOPs equal the weight FLOPs at a prompt length of $P^* = N/(Ld)$ in prefill, and at a context of $t^* = N/(2Ld)$ in decode. For a model with $N\approx12Ld^2$ (the usual parameter count of a Transformer block, [[transformers/attention-complexity#sec-flops]]), $P^*\approx12d$ and $t^*\approx6d$.
:::

::: proof
Prefill: $2LdP^2 = 2NP$ gives $P = N/(Ld)$. Decode: $4Ldt = 2N$ gives $t = N/(2Ld)$. Substituting $N = 12Ld^2$ gives $12d$ and $6d$.
:::

For a model of $8\times10^9$ parameters with $L = 32$ and $d = 4096$ (so $N/(Ld) = 61{,}000$), attention is a minority of the prefill arithmetic at $8$ thousand tokens and the majority beyond about $61$ thousand. Memory follows the same pattern: the cache of one sequence grows by $2Lh_{kv}d_kb$ bytes per token ([[inference/kv-cache#prop-batch-kv]]) and, read at every step, overtakes the weights as the main memory traffic of decoding at long contexts.

::: example A 128k-token prompt {#ex-128k}
For the model above ($N = 8\times10^9$, $L = 32$, $d = 4096$, $8$ key–value heads of dimension $128$, bfloat16), estimate the prefill FLOPs and time of a $131{,}072$-token prompt at an achieved $593$ TFLOP/s, and the time of one decode step afterwards at an achieved $2.68$ TB/s.
::: solution
Prefill: weights $2NP = 2.10\times10^{15}$, attention $2LdP^2 = 2\cdot32\cdot4096\cdot131{,}072^2 = 4.50\times10^{15}$, total $6.60\times10^{15}$ FLOPs, $68\%$ attention: $11.1$ s. Decode: the cache is $131{,}072\cdot131{,}072$ bytes $= 17.2$ GB, more than the $16$ GB of weights; reading both takes $(16 + 17.2)\times10^9/2.68\times10^{12} = 12.4$ ms per token, twice the short-context step. The attention arithmetic per step, $4Ldt = 6.9\times10^{10}$ FLOPs, is four times the weights' $1.6\times10^{10}$, but still far below what the memory traffic allows. A second request with the same long prompt doubles the cache traffic; batching does not amortise it ([[inference/batching-serving#prop-attn-intensity]]).
:::
:::

::: widget plot
f: x/(61035 + x); 2*x/(61035 + 2*x)
x: 0, 262144
y: 0, 1
labels: share of prefill FLOPs in attention; share of decode FLOPs in attention
vlines: 61035; 30518
caption: The fraction of FLOPs spent in attention, against the prompt length $P$ (prefill, $LdP/(N + LdP)$) or the context length $t$ (decode, $2Ldt/(N + 2Ldt)$), for $N = 8\times10^9$, $L = 32$, $d = 4096$. The dashed lines mark the crossovers $N/(Ld)$ and $N/(2Ld)$ of [[#prop-crossover-len]]. Beyond them, attention is the main cost, and its quadratic growth in prefill sets the time to first token for long documents.
:::

## Exact attention, tile by tile {#sec-flash}

Standard attention forms the $T\times T$ score matrix, writes it to memory, reads it back for the softmax, writes the probabilities and reads them again. At $T = 131{,}072$ that matrix has $1.7\times10^{10}$ entries per head — $34$ GB in 16 bits — so it cannot be stored, and moving it would be slow even if it could. **FlashAttention** (Dao et al., 2022) computes exact attention without ever storing it, by processing keys in blocks and maintaining running statistics. [[transformers/attention-complexity#sec-flash]] introduced it; here we derive it in a form that also gives the decoding and multi-device variants.

::: definition Partial attention state {#def-partial}
For a query $\mathbf{q}$ and a set $S$ of key–value positions, with scores $s_j = \mathbf{q}^\top\mathbf{k}_j/\sqrt{d_k}$, the **partial state** of $S$ is the triple

$$
\sigma(S) = \big(m_S,\ \ell_S,\ \mathbf{o}_S\big),\qquad m_S = \max_{j\in S}s_j,\quad\ell_S = \sum_{j\in S}e^{s_j - m_S},\quad\mathbf{o}_S = \sum_{j\in S}e^{s_j - m_S}\,\mathbf{v}_j.
$$

The attention output over $S$ is $\mathbf{o}_S/\ell_S$.
:::

::: proposition Merging partial states {#prop-merge}
For disjoint sets $A$ and $B$, with $m = \max(m_A, m_B)$,

$$
\sigma(A\cup B) = \Big(m,\ \ \ell_Ae^{m_A - m} + \ell_Be^{m_B - m},\ \ \mathbf{o}_Ae^{m_A - m} + \mathbf{o}_Be^{m_B - m}\Big) =: \sigma(A)\oplus\sigma(B).
$$ {#eq-merge}

The operation $\oplus$ is associative and commutative. Hence the partial states of any partition of the keys can be combined in any order and grouping to give the exact attention output; the online softmax ([[transformers/attention-complexity#prop-online]]) is the special case of merging one block at a time into a running state.
:::

::: proof
$m_{A\cup B} = \max(m_A, m_B) = m$. For the sums, $\ell_{A\cup B} = \sum_{j\in A}e^{s_j - m} + \sum_{j\in B}e^{s_j - m}$, and $\sum_{j\in A}e^{s_j - m} = e^{m_A - m}\sum_{j\in A}e^{s_j - m_A} = e^{m_A - m}\ell_A$, likewise for $B$ and for $\mathbf{o}$. Commutativity is clear from the symmetric formula. For associativity, note that $\sigma(A)\oplus\sigma(B)$ equals $\sigma(A\cup B)$, a function of the set $A\cup B$ alone; so $(\sigma(A)\oplus\sigma(B))\oplus\sigma(C) = \sigma(A\cup B\cup C) = \sigma(A)\oplus(\sigma(B)\oplus\sigma(C))$. (The empty set has state $(-\infty, 0, \mathbf{0})$, with $e^{-\infty} = 0$, which is the identity.)
:::

Everything in this section follows from this one identity. FlashAttention merges key blocks sequentially into a running state for each query block held in fast on-chip memory. **Split-key decoding** ("Flash-Decoding", Dao et al., 2023) handles the opposite shape — one query, a very long cache — by giving different key blocks to different processors, computing their partial states in parallel and merging them with a reduction tree; without it, a single query could occupy only a small part of a GPU. **Ring attention** (below) merges states arriving from other devices.

::: algorithm FlashAttention forward pass with causal tile skipping {#alg-flash-causal}
1. Split queries into blocks of $B_r$ rows and keys/values into blocks of $B_c$ rows.
2. For each query block $i$: initialise every row's state to $(-\infty, 0, \mathbf{0})$.
3. For each key block $j$: if every key in block $j$ comes after every query in block $i$, **skip** it (fully masked). Otherwise compute the tile of scores, mask entries with key position greater than query position, and merge the tile's partial state into each row's state by [[#eq-merge]].
4. Write $\mathbf{o}/\ell$ for each row, and the statistics $(m, \ell)$ if a backward pass will need them.
:::

::: example Merging two chunks by hand {#ex-merge}
A query has scores $(1, 3)$ against keys with scalar values $(2, 0)$, and $(2, 0)$ against keys with values $(4, 8)$. Compute each chunk's partial state, merge them, and check the output against the direct softmax average.
::: solution
Chunk $A$: $m_A = 3$, $\ell_A = e^{-2} + e^0 = 1.1353$, $o_A = 2e^{-2} + 0 = 0.2707$. Chunk $B$: $m_B = 2$, $\ell_B = 1 + e^{-2} = 1.1353$, $o_B = 4 + 8e^{-2} = 5.0827$. Merge: $m = 3$, the factor for $B$ is $e^{2 - 3} = 0.3679$, so $\ell = 1.1353 + 0.4177 = 1.5530$ and $o = 0.2707 + 1.8698 = 2.1405$; output $2.1405/1.5530 = 1.3783$. Directly: weights $\propto(e^1, e^3, e^2, e^0) = (2.718, 20.086, 7.389, 1)$, sum $31.193$; weighted values $(2\cdot2.718 + 0 + 4\cdot7.389 + 8)/31.193 = 42.99/31.193 = 1.3783$.
:::
:::

The cost of FlashAttention is still $O(T^2d)$ arithmetic — with causal skipping, about half the full square — but only $O(Td)$ memory beyond the inputs, and far less memory traffic ([[transformers/attention-complexity#sec-flash]]). It is exact in exact arithmetic; in floating point it differs from the standard computation only by rounding, because the order of additions differs.

## Spreading one sequence over many devices {#sec-ring}

For prompts of hundreds of thousands of tokens, even with FlashAttention a single device may be too slow (prefill time grows like $P^2$) or too small (the activations and cache of one sequence). **Context parallelism** splits the sequence itself across devices. The best-known scheme is **ring attention** (Liu, Zaharia and Abbeel, 2024).

::: definition Ring attention {#def-ring}
The sequence is split into $D$ contiguous blocks, one per device, and device $k$ holds the queries, keys and values of block $k$. The devices form a ring. In each of $D$ rounds, every device computes the partial attention state of its queries against the key–value block it currently holds, merges it into its running state ([[#eq-merge]]), and passes that key–value block to the next device while receiving one from the previous. After $D$ rounds every query block has seen every key–value block (or, with a causal mask, every earlier one).
:::

The communication is hidden if passing a block takes no longer than computing with it.

::: proposition Overlap condition for ring attention {#prop-ring}
With query and key blocks of $c$ tokens, $h$ query heads and $h_{kv}$ key–value heads of dimension $d_k$, values of $b$ bytes, achieved arithmetic rate $\pi$ and link bandwidth $\beta_{\text{link}}$, the transfer of a key–value block is hidden behind the computation on it when

$$
c\ \ge\ \frac{\pi\,h_{kv}\,b}{2\,h\,\beta_{\text{link}}}.
$$
:::

::: proof
Per layer, the computation of one block pair is $4c^2hd_k$ FLOPs ($c$ queries against $c$ keys, scores and weighted values, for $h$ heads), taking $4c^2hd_k/\pi$. The transfer of the block's keys and values is $2ch_{kv}d_kb$ bytes, taking $2ch_{kv}d_kb/\beta_{\text{link}}$. Requiring the first to be at least the second and dividing by $2cd_k$ gives $2ch/\pi\ge h_{kv}b/\beta_{\text{link}}$, which rearranges to the claim.
:::

The condition depends only on the hardware ratio $\pi/\beta_{\text{link}}$ and on grouped-query attention's ratio $h_{kv}/h$, not on the total length, so with blocks of a few thousand tokens the ring can grow to as many devices as needed. Liu et al. reported training and inference on sequences millions of tokens long this way. With a causal mask the work is unbalanced — the device holding the first block has little to do — and implementations reorder blocks to balance it. Ring attention is exact: it is FlashAttention's merge distributed over a ring.

## Approximate attention for long contexts {#sec-window}

Exact attention's cost cannot fall below the number of (query, key) pairs it scores. Approximate schemes reduce that number, changing the model; they must be part of its training, not switched on at inference.

**Sliding-window attention** restricts each query to the last $w$ keys ([[transformers/efficient-attention#def-window]]). It caps the cache at $w$ tokens per layer and the decode cost at $O(wd)$ per layer, and stacked windows reach about $Lw$ tokens back in principle ([[transformers/efficient-attention#prop-reach]]) — in principle only, since information must be relayed through intermediate positions layer by layer. Mistral 7B (2023) used $w = 4096$ in all $32$ layers.

**Interleaving** keeps a few global-attention layers among many sliding-window layers, so that most layers are cheap while exact long-range access remains possible. The Gemma 2 models (2024), as published, alternated local layers (window $4096$) with global layers; Gemma 3 (2025) used five local layers (window $1024$) per global layer. The cache then shrinks almost in proportion to the fraction of local layers:

::: example Cache of an interleaved model {#ex-interleave}
A $48$-layer model with $8$ key–value heads of dimension $128$ in bfloat16 serves a $131{,}072$-token context. Compare the cache of one sequence when all layers are global, when all use a $4096$ window, and with five local layers (window $1024$) per global layer.
::: solution
Per token and layer the cache is $2\cdot8\cdot128\cdot2 = 4096$ bytes. All global: $48\cdot131{,}072\cdot4096$ B $= 24$ GiB. All windowed: $48\cdot4096\cdot4096$ B $= 0.75$ GiB. Interleaved: $8$ global layers hold $131{,}072$ tokens and $40$ local layers $1024$: $(8\cdot131{,}072 + 40\cdot1024)\cdot4096$ B $= 4.16$ GiB, $17\%$ of the all-global cache, while one layer in six still sees the whole context exactly.
:::
:::

Other approximations — attention sinks with a recent window, heavy-hitter eviction ([[inference/kv-cache#sec-evict]]), linear attention and state-space layers ([[sequence-models/state-space-models]]), hybrids mixing them with a few attention layers — trade exactness for bounded memory. Each gives up something: a model that has evicted or compressed a token cannot retrieve it verbatim later, which is exactly what the evaluations of the next section probe.

::: warning "A 1-million-token window means the model can use 1 million tokens"
The advertised window is the length a model accepts without error, usually the longest length used in its final training phase. Whether it *uses* information from anywhere in that window is a separate, empirical question. Long-context benchmarks repeatedly find an **effective** length shorter than the advertised one, performance that depends on where in the context the relevant information sits, and degradation when the task requires combining several distant pieces rather than finding one. Test the window on tasks like yours before relying on it.
:::

## Evaluating long contexts {#sec-eval}

The simplest test is the **needle in a haystack**: insert a fact ("the magic number is 7341") at a chosen depth in a long filler document and ask for it; sweep the depth and the total length and plot accuracy as a grid. Popularised in 2023 in open-source testing of commercial models, it revealed real failures — in early long-context models accuracy fell at large lengths and at particular depths — and as of 2026 it appears in many model reports. Its weaknesses are as instructive as its results.

- **It is easy.** The needle is usually lexically distinctive and unrelated to the haystack, so a model can find it by matching words; near-perfect scores became common and stopped discriminating between models.
- **One fact, no reasoning.** Real tasks need several facts, comparisons, aggregation or multi-step tracing across the document.
- **No distractors.** Real documents contain near-duplicates of the answer.

Liu et al. (2024) showed with multi-document question answering that accuracy can depend strongly on position: in the models they tested, information at the beginning or the end of the context was used better than information in the middle ("lost in the middle"), a U-shaped curve. **RULER** (Hsieh et al., 2024) generalised needle tests into a configurable synthetic benchmark — retrieval with multiple keys, multiple values and distracting needles; multi-hop variable tracing; aggregation of the most frequent words; and question answering with distractor paragraphs — and found that most of the models it evaluated fell below a fixed performance threshold well before their claimed context length; it reported an "effective length" for each.

::: definition Effective context length {#def-effective}
For a benchmark family and a performance threshold $\tau$, a model's **effective context length** is the largest length $T$ such that its score is at least $\tau$ at every tested length up to $T$. (RULER used the score of a reference model at short length as its threshold.)
:::

Synthetic benchmarks are controllable, uncontaminated and cheap; they are also narrow. Results depend on the filler text, the task mix, the prompt template and the threshold, and a model can score well on synthetic retrieval while failing at reading a long contract or reasoning over a codebase. Natural long-document benchmarks (question answering over books, summarisation, repository-level code tasks) complement them but are costlier to build and to grade ([[evaluation/benchmarks]]). Report the length distribution of the test, the positions of the relevant information, and the variance across runs ([[evaluation/evaluation-statistics]]).

::: quiz
A model scores $100\%$ on a single-needle test at every depth up to $10^6$ tokens. What does this establish?
- [ ] Its effective context length on any task is $10^6$ tokens
- [x] It can retrieve a single distinctive fact anywhere in such contexts; little about multi-fact reasoning or realistic distractors
- [ ] It does not suffer from the lost-in-the-middle effect on question answering
- [ ] Its attention is exact over the whole context
::: solution
A single distinctive needle tests verbatim retrieval only. Multi-key retrieval, aggregation, multi-hop tracing and natural tasks with distractors are harder, and RULER-style tests often find much shorter effective lengths for models that pass single-needle tests. Position effects on question answering are a separate measurement, and the test says nothing about how attention is implemented.
:::
:::

## Long context or retrieval? {#sec-rag}

Retrieval-augmented generation ([[prompting-rag/retrieval-augmented-generation]]) puts only the passages relevant to a query into the prompt. A long context puts everything there and lets attention choose. The trade-off has a cost side that is easy to compute and a quality side that must be measured.

::: example The price of reading everything {#ex-rag}
A question is asked about a $400{,}000$-token document collection. Compare the prefill FLOPs and time, for the $8$-billion-parameter model above at $593$ TFLOP/s, of (a) putting the whole collection in the prompt and (b) retrieving $4000$ tokens of relevant passages. Then (c) suppose the collection's cache is kept by prefix caching and many questions are asked: what does each further question cost, and what memory does the cache occupy?
::: solution
(a) $2NP + 2LdP^2 = 6.4\times10^{15} + 4.19\times10^{16} = 4.83\times10^{16}$ FLOPs: $81$ s of prefill. (b) $6.4\times10^{13} + 4.2\times10^{12} = 6.8\times10^{13}$ FLOPs: $0.11$ s, about $700$ times less. (c) With the collection cached ([[inference/kv-cache#def-prefix]]), a $100$-token question costs $2N\cdot100 + 4Ld\cdot100\cdot400{,}000 = 2.3\times10^{13}$ FLOPs, comparable to the retrieval prompt; but the cache is $400{,}000\cdot131{,}072$ bytes $= 52$ GB, most of an accelerator's memory for one document set, and every generated token reads all of it. Long context with caching suits many questions about one fixed corpus; retrieval suits large, changing corpora and many users.
:::
:::

On quality, published comparisons disagree in ways that depend on models, tasks and retrievers. Xu et al. (2024) found that retrieval improved the results of both short- and long-context models on their long-document question-answering tasks; Li et al. (2024) found that recent long-context models outperformed retrieval on average when resources were not a constraint, while retrieval was far cheaper, and proposed routing each query to one or the other. Retrieval can miss passages the retriever does not rank highly, especially for questions that need the whole document (summaries, counts, global structure); long context can miss information in the middle or be distracted by irrelevant text. As of 2026, combining them — retrieve generously into a long context — is common practice.

## Implementing it {#sec-code}

The listing implements FlashAttention with causal tile skipping in plain Python and checks it against naive attention; computes split-key decoding for one query with two different merge orders; and evaluates the cache of the three layer layouts of [[#ex-interleave]].

```python
import math, random
rng = random.Random(0)
T, d = 50, 8
Q = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(T)]
K = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(T)]
V = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(T)]
dot = lambda a, b: sum(x * y for x, y in zip(a, b))

def naive_attention(Q, K, V, causal=True):              # forms the full (T, T) score matrix
    out = []
    for i, q in enumerate(Q):
        s = [dot(q, k) / math.sqrt(d) if (j <= i or not causal) else -math.inf for j, k in enumerate(K)]
        m = max(s); p = [math.exp(v - m) for v in s]; z = sum(p)
        out.append([sum(p[j] * V[j][c] for j in range(len(K))) / z for c in range(d)])
    return out

def flash_attention(Q, K, V, Br=8, Bc=8, causal=True):
    """Tiled exact attention: per query block keep running max m, sum l and output o;
    stream key/value blocks, rescale old statistics when the max grows. Never stores T x T."""
    out, tiles, skipped = [None] * len(Q), 0, 0
    for i0 in range(0, len(Q), Br):
        rows = range(i0, min(i0 + Br, len(Q)))
        m = {i: -math.inf for i in rows}; l = {i: 0.0 for i in rows}; o = {i: [0.0] * d for i in rows}
        for j0 in range(0, len(K), Bc):
            if causal and j0 > rows[-1]: skipped += 1; continue      # tile entirely above the diagonal
            tiles += 1
            cols = range(j0, min(j0 + Bc, len(K)))
            for i in rows:
                s = [dot(Q[i], K[j]) / math.sqrt(d) for j in cols if not causal or j <= i]
                if not s: continue
                m_new = max(m[i], max(s))
                scale = math.exp(m[i] - m_new) if m[i] > -math.inf else 0.0
                p = [math.exp(v - m_new) for v in s]
                l[i] = l[i] * scale + sum(p)
                o[i] = [o[i][c] * scale + sum(pj * V[j][c] for pj, j in zip(p, cols)) for c in range(d)]
                m[i] = m_new
        for i in rows: out[i] = [v / l[i] for v in o[i]]
    return out, tiles, skipped

ref = naive_attention(Q, K, V)
fa, tiles, skipped = flash_attention(Q, K, V)
err = max(abs(a - b) for r1, r2 in zip(ref, fa) for a, b in zip(r1, r2))
print(f"max |flash - naive| = {err:.2e}; tiles computed {tiles}, skipped by the causal mask {skipped}")

# split-K ("flash-decoding"): one query, keys split into chunks processed independently, then merged
def partial(q, Ks, Vs):                                   # returns (m, l, unnormalised o) for one chunk
    s = [dot(q, k) / math.sqrt(d) for k in Ks]; m = max(s); p = [math.exp(v - m) for v in s]
    return m, sum(p), [sum(pj * v[c] for pj, v in zip(p, Vs)) for c in range(d)]
def merge(a, b):                                          # associative combination of two partials
    (ma, la, oa), (mb, lb, ob) = a, b; m = max(ma, mb)
    fa, fb = math.exp(ma - m), math.exp(mb - m)
    return m, la * fa + lb * fb, [x * fa + y * fb for x, y in zip(oa, ob)]
q = Q[-1]
parts = [partial(q, K[c:c + 13], V[c:c + 13]) for c in range(0, T, 13)]   # 4 chunks of <= 13 keys
left = parts[0]
for p_ in parts[1:]: left = merge(left, p_)                               # ((p0 p1) p2) p3
tree = merge(merge(parts[0], parts[1]), merge(parts[2], parts[3]))       # (p0 p1)(p2 p3)
for name, (m_, l_, o_) in [("left fold", left), ("tree", tree)]:
    e = max(abs(o_[c] / l_ - ref[-1][c]) for c in range(d))
    print(f"split-K decode, {name:9s}: max error vs full attention {e:.2e}")

# sliding window and interleaved local/global layers: cache per sequence (GiB) at 128k context
per_tok_layer = 2 * 8 * 128 * 2                          # bytes: K and V, 8 kv heads, d_k 128, bf16
T_ctx, L = 131072, 48
for name, layers in [("all global", [T_ctx] * L),
                     ("all window 4096", [4096] * L),
                     ("5 local (1024) : 1 global", [1024 if i % 6 < 5 else T_ctx for i in range(L)])]:
    print(f"{name:26s}: {sum(layers) * per_tok_layer / 2**30:6.2f} GiB")
```

Output:

```
max |flash - naive| = 2.22e-16; tiles computed 28, skipped by the causal mask 21
split-K decode, left fold: max error vs full attention 4.16e-17
split-K decode, tree     : max error vs full attention 5.55e-17
all global                :  24.00 GiB
all window 4096           :   0.75 GiB
5 local (1024) : 1 global :   4.16 GiB
```

The tiled computation agrees with the naive one to within one rounding error in double precision, and with $7\times7$ tiles of $8$ it computes only the $28$ on or below the diagonal, skipping $21$. The two merge orders of split-key decoding give the same output to rounding, as associativity ([[#prop-merge]]) requires; the tiny difference between them is the floating-point non-associativity of [[inference/decoding-sampling#prop-fp]], which is why split-key kernels with different chunk counts are not bitwise identical.

::: history
Long contexts were first limited by quadratic attention memory: sparse patterns (Child et al., 2019), sliding windows with global tokens (Longformer, Beltagy et al., 2020; BigBird, Zaheer et al., 2020) and linear attention (Katharopoulos et al., 2020) approximated attention to reach thousands of tokens. Rabe and Staats (2021) and Dao, Fu, Ermon, Rudra and Ré (FlashAttention, NeurIPS 2022) showed that exact attention needs only linear memory, using the online softmax of Milakov and Gimelshein (2018); Dao and colleagues' Flash-Decoding (2023) parallelised decoding over the keys, and Liu, Zaharia and Abbeel's ring attention (ICLR 2024) over devices. Position interpolation and YaRN (2023) extended trained windows ([[pretraining/continued-pretraining]]). Evaluation moved from needle tests (2023) to "lost in the middle" (Liu et al., TACL 2024) and RULER (Hsieh et al., COLM 2024).
:::

::: summary
- Attention overtakes the weights in prefill FLOPs at $P^* = N/(Ld)$ (about $12d$) and in decode at $N/(2Ld)$; the cache overtakes the weights in memory traffic at long contexts.
- A **partial attention state** $(m, \ell, \mathbf{o})$ can be merged associatively ([[#eq-merge]]). This one identity gives **FlashAttention** (blocks merged sequentially, causal tiles skipped), **split-key decoding** (merged in parallel) and **ring attention** (merged across devices).
- Ring attention hides communication when blocks have at least $\pi h_{kv}b/(2h\beta_{\text{link}})$ tokens, independent of the total length.
- **Sliding windows** cap the cache; **interleaving** a few global layers keeps exact long-range access at a fraction of the memory. Approximations must be part of training.
- The advertised window is not the **effective** length: single-needle tests are easy; multi-key, multi-hop and aggregation tasks (RULER), position effects and natural tasks reveal more.
- **Retrieval** is far cheaper per query; long context with prefix caching suits many questions about one corpus; combining them is common.
:::

## Exercises

::: exercise Attention's share of prefill {level=1 check="0.349"}
For $N = 8\times10^9$, $L = 32$ and $d = 4096$, what fraction of the prefill FLOPs of a $32{,}768$-token prompt is attention? Give three decimal places.
::: solution
$LdP/(N + LdP)$ with $LdP = 32\cdot4096\cdot32{,}768 = 4.295\times10^9$: $4.295/(8 + 4.295) = 0.349$.
:::
:::

::: exercise A windowed cache {level=1 check="512"}
A $32$-layer model with $8$ key–value heads of dimension $128$ in bfloat16 uses a $4096$-token window in every layer. How many MiB of cache does one sequence need, however long it is?
::: solution
$2\cdot32\cdot8\cdot128\cdot2 = 131{,}072$ bytes per token, times $4096$ tokens $= 512$ MiB.
:::
:::

::: exercise Reach of stacked windows {level=1 check="131040"}
By [[transformers/efficient-attention#prop-reach]], how far back can the output of a $32$-layer model with window $4096$ depend on its input?
::: solution
$L(w - 1) = 32\cdot4095 = 131{,}040$ positions.
:::
:::

::: exercise An interleaved cache {level=2 check="0.1732"}
A model has five local layers with a $1024$-token window for every global layer. At a context of $131{,}072$ tokens, what fraction of the all-global cache does it need? Give four decimal places.
::: solution
Per group of six layers: $(5\cdot1024 + 131{,}072)/(6\cdot131{,}072) = 136{,}192/786{,}432 = 0.1732$.
:::
:::

::: exercise The ring's block size {level=2 check="1484"}
Devices achieve $593.4$ TFLOP/s and are linked at $100$ GB/s. The model has $32$ query heads and $8$ key–value heads, in bfloat16. What is the smallest integer block size $c$ that hides communication in ring attention?
::: solution
By [[#prop-ring]], $c\ge593.4\times10^{12}\cdot8\cdot2/(2\cdot32\cdot100\times10^9) = 1483.5$, so $c = 1484$ tokens. With full multi-head attention ($h_{kv} = 32$) the bound would be four times larger.
:::
:::

::: exercise The identity of merging {level=2}
Show that $(-\infty, 0, \mathbf{0})$ is an identity for $\oplus$, and that merging a state with itself does *not* give the state of a set (explain what it gives). Why does this matter for implementations that split keys into overlapping chunks by mistake?
::: solution
With $m_B = -\infty$, $m = m_A$, the factor $e^{m_B - m} = 0$ and $e^{m_A - m} = 1$, so the result is $(m_A, \ell_A, \mathbf{o}_A)$. Merging $\sigma(A)$ with itself gives $(m_A, 2\ell_A, 2\mathbf{o}_A)$, whose output $\mathbf{o}/\ell$ is unchanged — but this is the state of a multiset in which every key of $A$ counts twice, not of any set. With overlapping chunks, keys in the overlap are counted twice and the softmax weights are wrong (unless the overlap is the whole set); the final output can look plausible while being incorrect. Partitions must be disjoint.
:::
:::

::: exercise Prefill time for a long prompt {level=2 check="81.5"}
For the model of [[#ex-rag]] at $593.4$ TFLOP/s, how many seconds does prefilling $400{,}000$ tokens take? Give one decimal place.
::: solution
$2NP + 2LdP^2 = 6.4\times10^{15} + 2\cdot32\cdot4096\cdot1.6\times10^{11} = 6.4\times10^{15} + 4.194\times10^{16} = 4.834\times10^{16}$ FLOPs; divided by $5.934\times10^{14}$, $81.5$ s.
:::
:::

::: exercise A better haystack {level=2}
Design a long-context test that a model could not pass by lexical matching, and that requires combining at least two facts placed far apart. State what you would vary and what you would report.
::: solution
For example: a long synthetic log of events among many named entities, with a chain such as "A handed the key to B" at depth $10\%$, "B left the key in room 12" at $60\%$, and distractors such as "C handed a key to D". Ask "in which room is the key A handed over?" The answer requires linking two facts by an entity, and every sentence shares vocabulary with the question. Vary the total length, the depths of both facts and the number of distractor chains; report accuracy against length and against each depth, with confidence intervals over many random instances, and compare with a short-context control in which only the relevant sentences and a few distractors are given. RULER's variable-tracing task is a published version of this idea.
:::
:::

::: exercise The cost of causal tiles {level=3}
For a sequence of $T = nB$ tokens split into $n$ blocks of size $B$ for both queries and keys, how many tiles does [[#alg-flash-causal]] compute, and what fraction of the full $n^2$ is that? Of the computed tiles, how many need per-entry masking? Check against the listing's counts.
::: solution
Query block $i$ (from $1$ to $n$) needs key blocks $1,\dots,i$, so the count is $\sum_{i=1}^ni = n(n + 1)/2$, a fraction $(n + 1)/(2n)$ of $n^2$, which tends to $\tfrac12$. Only the $n$ diagonal tiles contain both allowed and masked entries; the other $n(n - 1)/2$ are fully allowed. In the listing $T = 50$ with blocks of $8$ gives $n = 7$ (the last block partial): $28$ computed and $49 - 28 = 21$ skipped, as printed.
:::
:::

::: exercise Ring attention with a causal mask {level=3}
In ring attention with $D$ devices and a causal mask, device $k$ (holding block $k$, $k = 1,\dots,D$) needs only key blocks $1,\dots,k$. (a) If each device computes only the blocks it needs, how many block computations does the busiest device perform, and how many does the whole ring perform on average per round? (b) Show that assigning to each device two half-blocks, one from each end of the sequence (blocks $k$ and $2D + 1 - k$ of $2D$ half-blocks), balances the work.
::: solution
(a) Device $D$ computes $D$ blocks and device $1$ only one; the ring still takes $D$ rounds, so the total work $\sum_kk = D(D + 1)/2$ is spread over $D\cdot D$ device-rounds, an average utilisation of $(D + 1)/(2D)\approx\tfrac12$. (b) With $2D$ half-blocks, device $k$ holds query half-blocks $k$ and $2D + 1 - k$, which need $k$ and $2D + 1 - k$ key half-blocks respectively: $2D + 1$ half-block computations for every device, independent of $k$. The work is balanced, which is why implementations of context parallelism for causal models reorder the sequence this way.
:::
:::
