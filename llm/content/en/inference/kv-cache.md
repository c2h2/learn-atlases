The key–value cache was introduced in [[transformers/efficient-attention#sec-kv]]: during generation, the keys and values of earlier tokens never change, so they are stored and reused, and their size is $2Lh_{kv}d_kb$ bytes per token ([[transformers/efficient-attention#prop-kv-size]]). That chapter also showed how multi-query and grouped-query attention shrink it. This chapter looks at the cache as a serving system sees it — as the largest and most dynamic consumer of accelerator memory — and covers the techniques built around it: the exact equivalence of cached and uncached decoding, how the cache competes with the weights for memory, **multi-head latent attention**, **paged** storage, **prefix caching** across requests, and approximate **eviction** policies that keep only part of the cache.

The central quantity is simple. For a serving system, memory holds the weights, which are fixed, and the caches of all running requests, which grow by one token per request per decode step and vanish when a request finishes. How many requests fit at once — and so how many tokens the system produces per second — is decided by how many bytes each token of cache costs and how little of the memory is wasted.

## Incremental decoding {#sec-incremental}

::: definition Incremental (cached) decoding {#def-incremental}
For each layer $\ell$ the **KV cache** of a sequence at step $t$ is the pair of matrices $K^{(\ell)}_{\le t}, V^{(\ell)}_{\le t}\in\mathbb{R}^{t\times h_{kv}d_k}$ holding the keys and values of positions $1,\dots,t$. **Incremental decoding** processes a new token at position $t + 1$ by computing only its own query, key and value in each layer, appending the key and value to the cache, and attending from the new query to the whole cache.
:::

::: proposition Cached decoding is exact {#prop-cache-exact}
In a decoder-only Transformer with causal attention, the hidden state of every layer at position $i$ depends only on the tokens $x_1,\dots,x_i$. Hence the keys and values computed for position $i$ when it was the newest token equal those that a full forward pass over $x_1,\dots,x_t$ (for any $t\ge i$) would compute, and incremental decoding produces exactly the same next-token distributions as recomputing the whole prefix at every step.
:::

::: proof
By induction on the layer. The input to layer $1$ at position $i$ is the embedding of $x_i$ plus position information for $i$, a function of $x_i$ and $i$ only. Suppose the input to layer $\ell$ at every position $j$ depends only on $x_{\le j}$. The layer's output at position $i$ is a position-wise function (normalisation, MLP, residual additions) of its input at $i$ and of the attention output at $i$; under the causal mask, attention at $i$ is a weighted sum over positions $j\le i$ with weights and values computed from the inputs at $j\le i$ ([[transformers/multi-head-attention#prop-causal]]). All of these depend only on $x_{\le i}$, which completes the induction. A key or value at position $i$ is a linear map of the layer input at $i$, so it is the same whichever later tokens exist.
:::

Two caveats keep this from being literally true in practice. In floating point, a prefill kernel processing $i$ tokens at once and a decode kernel processing one may sum in different orders and round differently ([[inference/decoding-sampling#prop-fp]]): the results agree to rounding error, not bit for bit. And anything that breaks causality breaks the equivalence — bidirectional attention, as in encoder models, or position schemes that rescale earlier positions once the sequence grows.

What the cache buys is arithmetic. Without it, step $t$ reprocesses the whole prefix, about $2Nt$ FLOPs for a model with $N$ parameters, and generating $T$ tokens costs about $\sum_{t\le T}2Nt\approx NT^2$. With it, each step costs about $2N$ plus attention, $2NT$ in total: a saving by a factor of about $T/2$, which is $1000$ for a $2000$-token sequence. The price is memory, and that is the rest of this chapter.

## How big is the cache? {#sec-size}

::: proposition KV-cache memory of a batch {#prop-batch-kv}
A model with $L$ layers, $h_{kv}$ key–value heads of dimension $d_k$, storing each number in $b$ bytes, serving $B$ sequences of lengths $T_1,\dots,T_B$, needs

$$
M_{\text{KV}} = 2\,L\,h_{kv}\,d_k\,b\sum_{i=1}^{B}T_i
$$ {#eq-kv-batch}

bytes of cache. With $M$ bytes of accelerator memory, weights of $W$ bytes and other buffers (activations, workspace) of $A$ bytes, at most $\big\lfloor(M - W - A)/(2Lh_{kv}d_kb)\big\rfloor$ tokens of cache fit, shared among all running sequences.
:::

::: proof
Per token and layer, one key and one value of $h_{kv}d_k$ numbers each are stored, $2h_{kv}d_kb$ bytes; times $L$ layers; summed over all tokens of all sequences. The second statement divides the memory left after weights and buffers by the bytes per token.
:::

The factor $2$ counts keys and values; $L$ and $h_{kv}d_k$ are architecture choices; $b$ is the storage format, $2$ bytes for 16-bit numbers and $1$ or less when the cache is quantised ([[inference/quantisation]]). The count of tokens is what the serving workload decides, and it is the total over all running sequences, not the length of any one.

::: example Cache against weights for an 8-billion-parameter model {#ex-kv-weights}
A model with $8\times10^9$ parameters has $L = 32$ layers, $32$ query heads and $h_{kv} = 8$ key–value heads of dimension $d_k = 128$, and is served in bfloat16 on an accelerator with $80$ GB of memory. (a) How many bytes of cache per token? (b) At what total number of cached tokens does the cache equal the weights? (c) With $4$ GB reserved for activations and workspace, how many concurrent sequences of $8192$ tokens fit?
::: solution
(a) $2\cdot32\cdot8\cdot128\cdot2 = 131{,}072$ bytes $= 128$ KiB per token. (b) The weights take $1.6\times10^{10}$ bytes; $1.6\times10^{10}/131{,}072\approx122{,}000$ tokens — fifteen sequences of $8192$ tokens. (c) $80 - 16 - 4 = 60$ GB remain, $6\times10^{10}/131{,}072\approx457{,}800$ tokens, and $457{,}800/8192 = 55.9$: $55$ sequences. With full multi-head attention ($h_{kv} = 32$) it would be $13$; with multi-query attention ($h_{kv} = 1$), $447$. Beyond a modest batch, the cache, not the weights, dominates memory.
:::
:::

::: widget plot
f: 60e9/(16384*g*1000*x); 60e9/(16384*32*1000*x)
x: 1, 32
y: 0, 200
sliders: g=8:1:32:1
labels: grouped-query ($g$ key–value heads); full multi-head ($32$ heads)
caption: The number of concurrent sequences that fit in $60$ GB of cache memory against their length in thousands of tokens, for the model of [[#ex-kv-weights]] ($32$ layers, heads of dimension $128$, bfloat16). The count falls like $1/T$; dividing the number of key–value heads by $g$ multiplies it by $g$. Long contexts quickly leave room for only a handful of users per device.
:::

The cache is also *read* in full at every decode step. Reading $128$ KiB for each of $8192$ tokens is $1$ GiB per sequence per step; for $55$ sequences it is $55$ GiB per step, over three times the weights. At long contexts and large batches, decode time is set by cache bandwidth as much as by weight bandwidth ([[inference/batching-serving]]), which is why every byte removed from the cache pays twice: in capacity and in speed.

## Shrinking the cache per token {#sec-shrink}

Three architectural levers reduce $2Lh_{kv}d_k$: share keys and values among heads, compress them, or share them among layers. They are decided when the model is designed (or by continued training, below); a serving system can only exploit them.

**Multi-query attention** (MQA; Shazeer, 2019) keeps a single key head and value head shared by all query heads, $h_{kv} = 1$. **Grouped-query attention** (GQA; Ainslie et al., 2023) shares one key–value head among each group of query heads, $1 < h_{kv} < h$ ([[transformers/efficient-attention#def-gqa]]). Ainslie et al. found GQA with a few groups close to multi-head quality at nearly multi-query speed, and showed that a multi-head checkpoint can be **uptrained** into GQA by mean-pooling the key and value heads of each group and continuing training for about $5\%$ of the original compute. As of 2026, most openly documented large decoders use GQA with $8$ key–value heads, or a smaller number.

### Multi-head latent attention {#sec-mla}

DeepSeek-V2 (DeepSeek-AI, 2024) introduced **multi-head latent attention** (MLA), which caches a low-dimensional latent vector per token instead of per-head keys and values. We describe it as published.

::: definition Multi-head latent attention {#def-mla}
Let $\mathbf{h}_t\in\mathbb{R}^d$ be the input to an attention layer at position $t$, with $n_h$ heads of dimension $d_h$. MLA computes a **latent** $\mathbf{c}_t = W^{DKV}\mathbf{h}_t\in\mathbb{R}^{d_c}$ with $d_c\ll n_hd_h$, and from it the keys and values of every head $i$:

$$
\mathbf{k}^C_{t,i} = W^{UK}_i\mathbf{c}_t,\qquad \mathbf{v}_{t,i} = W^{UV}_i\mathbf{c}_t,\qquad W^{UK}_i, W^{UV}_i\in\mathbb{R}^{d_h\times d_c}.
$$

Because rotary position embeddings ([[transformers/positional-encoding#def-rope]]) cannot be applied to $\mathbf{c}_t$ without spoiling the trick below, position enters through a separate **decoupled** key $\mathbf{k}^R_t = \operatorname{RoPE}(W^{KR}\mathbf{h}_t)\in\mathbb{R}^{d_h^R}$, shared by all heads, which is concatenated to each head's key; each query likewise has a content part and a rotary part. The cache stores only $\mathbf{c}_t$ and $\mathbf{k}^R_t$: $d_c + d_h^R$ numbers per token and layer.
:::

The trick is that the up-projections need never be applied at decode time.

::: proposition Absorbing the up-projections {#prop-absorb}
For a query head $i$ with content query $\mathbf{q}^C_{t,i}\in\mathbb{R}^{d_h}$, the content score against position $s$ is

$$
\mathbf{q}^{C\top}_{t,i}\,\mathbf{k}^C_{s,i} = \big(W^{UK\top}_i\mathbf{q}^C_{t,i}\big)^{\!\top}\mathbf{c}_s,
$$

and the attention output of head $i$, followed by its block $W^O_i$ of the output projection, is $W^O_iW^{UV}_i\sum_sa_{ts}\mathbf{c}_s$. So scores and outputs can be computed directly from the cached latents, with $W^{UK}_i$ folded into the query projection and $W^{UV}_i$ into the output projection.
:::

::: proof
The first identity is associativity of matrix products: $\mathbf{q}^\top(W\mathbf{c}) = (W^\top\mathbf{q})^\top\mathbf{c}$. For the output, $\sum_sa_{ts}\mathbf{v}_{s,i} = \sum_sa_{ts}W^{UV}_i\mathbf{c}_s = W^{UV}_i\sum_sa_{ts}\mathbf{c}_s$ by linearity, and multiplying by $W^O_i$ gives the claim. If a position-dependent rotation $R_s$ were applied to the keys, the score would be $\mathbf{q}^\top R_s W^{UK}_i\mathbf{c}_s$ (after rotating the query too, $\mathbf{q}^\top R_{s-t}W^{UK}_i\mathbf{c}_s$), and the matrix between $\mathbf{q}$ and $\mathbf{c}_s$ would depend on $s$, so no single matrix could be absorbed; hence the separate rotary part.
:::

::: example The cache of multi-head latent attention {#ex-mla}
DeepSeek-V2, as published, has $60$ layers, $n_h = 128$ heads of dimension $d_h = 128$, latent dimension $d_c = 512$ and rotary key dimension $d_h^R = 64$. Compute its cache per token in 16-bit precision, and compare with full multi-head attention of the same shape and with GQA.
::: solution
MLA: $(512 + 64)\cdot60\cdot2 = 69{,}120$ bytes $= 67.5$ KiB per token. Full MHA with $128$ heads of $128$: $2\cdot60\cdot128\cdot128\cdot2 = 3{,}932{,}160$ bytes $= 3.75$ MiB per token, $57$ times more ($1.8\%$ of it). GQA stores $2h_{kv}d_h = 256h_{kv}$ numbers per token and layer, so MLA's $576$ equals GQA with $h_{kv} = 2.25$ — a cache smaller than two-group GQA's next size up while keeping $128$ distinct key and value heads. The paper reported a $93.3\%$ smaller cache than the authors' earlier dense 67B model, and quality comparable to or better than MHA in their ablations; whether that holds generally is an empirical question still being studied.
:::
:::

**Cross-layer sharing** is a third lever, studied in research rather than standard practice: cross-layer attention (Brandon et al., 2024) lets adjacent layers share one set of keys and values, halving the cache again in their experiments at a small cost in perplexity. Models that interleave sliding-window layers with full-attention layers ([[inference/long-context]]) reduce the cache differently, by capping the length the window layers must store.

## Paged attention {#sec-paged}

Before 2023, serving systems typically stored each request's cache in one contiguous region, reserved for the maximum length the request might reach because its final length is unknown when it starts. Kwon et al. (2023) identified three kinds of waste in this scheme: **reservation** (slots reserved for tokens not yet generated), **internal fragmentation** (slots reserved for tokens that will never be generated, because the request stops early) and **external fragmentation** (gaps between regions of different sizes). They measured that in the systems they studied as little as about $20$–$40\%$ of the cache memory held actual token states.

Their remedy borrows virtual memory from operating systems.

::: definition Paged KV cache {#def-paged}
A **paged** KV cache divides cache memory into fixed-size **blocks**, each holding the keys and values of $B_s$ consecutive tokens (in all layers or per layer). Each sequence has a **block table** mapping its logical blocks $0, 1, 2,\dots$ to physical blocks anywhere in memory. A new physical block is allocated only when the last one is full, and blocks are returned to a free list when the sequence ends. The attention kernel (**PagedAttention**) reads keys and values through the block table.
:::

::: proposition Waste of a paged cache {#prop-paged-waste}
A sequence of length $n$ occupies $\lceil n/B_s\rceil$ blocks, so it wastes $B_s\lceil n/B_s\rceil - n\le B_s - 1$ slots, and nothing else is wasted: there is no external fragmentation, since all blocks are interchangeable. If $n\bmod B_s$ is uniformly distributed, the expected waste is $(B_s - 1)/2$ slots per sequence.
:::

::: proof
Blocks are allocated only when needed, so all blocks of a sequence are full except possibly the last, which holds $n - B_s(\lceil n/B_s\rceil - 1)\ge1$ tokens; the empty slots number $B_s\lceil n/B_s\rceil - n\in\{0,\dots,B_s - 1\}$. Any free block can serve any sequence, so free memory is never unusable because of its position. If the remainder $r = n\bmod B_s$ is uniform on $\{0,\dots,B_s - 1\}$, the waste is $0$ for $r = 0$ and $B_s - r$ otherwise, with mean $\frac1{B_s}\sum_{r=1}^{B_s-1}(B_s - r) = \frac{B_s - 1}{2}$.
:::

With $B_s = 16$ — the default in the paper's system — the waste is at most $15$ token slots per sequence, under $1\%$ for sequences of a few thousand tokens. Small blocks waste less but make the kernel gather many small pieces; Kwon et al. found block sizes of $16$ to $32$ a good compromise on their hardware. They reported throughput $2$–$4$ times that of the earlier systems they compared against at the same latency, almost all from fitting larger batches into the freed memory. Their open-source system, vLLM (2023), made paging the norm; as of 2026, the widely used open-source serving engines all store the cache in pages or blocks.

Paging also makes **sharing** cheap. Physical blocks carry reference counts, and two sequences may map logical blocks to the same physical block. When $n$ samples are drawn from one prompt, all $n$ block tables point at the prompt's blocks; when a sample writes into a shared, partially filled last block, that block is first copied (**copy-on-write**). Beam search, whose hypotheses share long prefixes, benefits the same way.

::: quiz
A paged cache uses blocks of $32$ tokens. Which statement is correct?
- [ ] A request of $1000$ tokens wastes $1000\bmod32 = 8$ slots
- [x] A request of $1000$ tokens wastes $24$ slots
- [ ] Paging removes all waste, so larger blocks are always better
- [ ] Paging requires each request's cache to be contiguous in memory
::: solution
$1000 = 31\cdot32 + 8$: the request fills $31$ blocks and $8$ slots of a $32$nd, wasting $32 - 8 = 24$ slots ([[#prop-paged-waste]]). Larger blocks waste more per request (up to $B_s - 1$); paging's point is that the blocks of one request can lie anywhere.
:::
:::

## Prefix caching {#sec-prefix}

Many requests share a beginning: a long system prompt, a set of few-shot examples, a document asked several questions, or the earlier turns of a conversation. [[#prop-cache-exact]] says that the keys and values of a prefix depend only on the prefix. They can therefore be computed once and reused by every request that starts with exactly the same tokens.

::: definition Prefix caching {#def-prefix}
A **prefix cache** keeps the KV blocks of completed or running requests after they are no longer needed, indexed by the token sequence they encode. A new request looks up the longest cached prefix of its prompt (at block granularity), maps those blocks into its block table, and prefills only the remaining tokens. Blocks are evicted, typically least recently used first, when memory is needed.
:::

Two indexing schemes are common. One keys each full block by a hash of *all* tokens from the start of the sequence up to the end of that block (the hash must cover the whole prefix, since a block's keys depend on everything before it); a lookup walks the prompt's blocks until the first miss. The other, RadixAttention in the SGLang system (Zheng et al., 2024), stores cached sequences in a radix tree whose edges are token runs, so that the longest shared prefix is found by walking down the tree and eviction removes least-recently-used leaves.

::: example A shared system prompt {#ex-prefix}
An application sends every request with the same $1200$-token system prompt followed by a user message averaging $300$ tokens. With prefix caching in blocks of $16$, what fraction of prefill computation is saved once the prompt is cached? If the application instead puts a timestamp at the *start* of the system prompt, what is saved?
::: solution
$1200 = 75\cdot16$, so all $75$ blocks of the system prompt are reused and each request prefills only its $300$ new tokens: $1200/1500 = 80\%$ of prefill tokens saved (somewhat more of the prefill FLOPs, since the attention cost of the new tokens against the cached prefix remains but the quadratic part within the prefix does not). With a timestamp first, the very first block differs between requests, and since every later block's key covers the whole prefix, nothing matches: $0\%$ saved. Variable content belongs at the end of a prompt.
:::
:::

Prefix caching changes both cost and time to first token. Several commercial interfaces, as of 2026, expose it to users as "prompt caching", billing cached input tokens at a reduced rate; open-source engines enable it by default or by a flag. Its correctness rests on exactness ([[#prop-cache-exact]]), so a cache entry is valid only for the same model weights, the same adapter (for models served with several fine-tuned adapters, [[post-training/parameter-efficient-tuning]]), and the same position offsets.

::: warning "Prefix caching changes the model's output"
It does not, beyond floating-point rounding: by [[#prop-cache-exact]] the reused keys and values are exactly those the request would have computed. What *does* change outputs are the approximate methods of the next section, which drop or merge cache entries. The two are often confused because both are described as "KV-cache optimisation". Ask of any method whether the attention it computes is exact.
:::

## Keeping only part of the cache {#sec-evict}

When the cache of one long sequence will not fit, or reading it is too slow, a system can keep only some entries. Every such method approximates attention: queries can no longer attend to evicted tokens. They are research methods with published evaluations on particular models and tasks, not general-purpose replacements for the full cache.

::: definition Sliding-window, attention-sink and heavy-hitter eviction {#def-evict}
Each policy keeps a set $S_t$ of cached positions of size at most a budget $k$, and attention at step $t$ runs over $S_t$ only.

- **Sliding window**: $S_t = \{t - k + 1,\dots,t\}$.
- **Attention sinks** (StreamingLLM; Xiao et al., 2024): $S_t$ = the first $s$ positions (typically $s = 4$) together with the most recent $k - s$.
- **Heavy hitters** (H2O; Zhang et al., 2023): a recent window together with the positions whose accumulated attention weight, summed over the queries so far, is largest.
:::

Xiao et al. made an empirical observation that explains why a plain window fails. Trained models put a large share of attention, in many heads and layers, on the first few tokens, whatever those tokens are. Their explanation is that the softmax forces each query's weights to sum to $1$; when a head has nothing useful to attend to, it needs somewhere harmless to put the mass, and the initial tokens — visible to every query from the start of training — become that **sink**. Evict them, as a sliding window eventually does, and the remaining weights are renormalised onto tokens that were never meant to receive them; the authors observed perplexity rising sharply as soon as the initial tokens left the window. Keeping the first $4$ tokens plus a recent window kept perplexity stable on streams of up to $4$ million tokens in their experiments, with the positions of cached tokens assigned by their place in the cache rather than in the original text. They also found that training with a dedicated learnable sink token at the start makes a single sink sufficient.

::: example A bounded cache for a long stream {#ex-stream}
The model of [[#ex-kv-weights]] ($128$ KiB per token) runs a conversation that has reached $100{,}000$ tokens. Compare the cache of full attention with that of StreamingLLM keeping $4$ sink tokens and a $4092$-token window, and the attention reads per generated token.
::: solution
Full attention: $100{,}000\cdot128$ KiB $= 12.2$ GiB, all read at every step, and growing by $128$ KiB per token. StreamingLLM: $4096\cdot128$ KiB $= 512$ MiB, fixed for ever — $24$ times less memory and $24$ times less cache read per step, and the per-step cost no longer grows. But a question about something said $50{,}000$ tokens ago can be answered only if the answer is still within the $4096$ kept tokens; otherwise the model has no access to it at all.
:::
:::

The point to remember is what StreamingLLM does *not* do: it does not let the model use information older than the window. It makes generation stable, not long-range. Heavy-hitter methods try to keep the informative old tokens too, using attention scores as a proxy for importance; H2O reported keeping $20\%$ of the cache with small quality loss on the tasks it evaluated, and later methods such as SnapKV (Li et al., 2024) select entries from attention patterns observed at the end of the prompt. Two cautions apply to all of them: the token that will matter later (a fact asked about only at the end) may receive little attention until then, and score-based selection needs the attention weights, which fused kernels such as FlashAttention do not return ([[transformers/attention-complexity#sec-flash]]). Tests that place a single relevant fact deep in a long context ([[inference/long-context]]) are designed to expose exactly this failure.

Systems also move rather than drop the cache: **offloading** keeps cold blocks (an idle conversation, a cached prefix) in host memory or on fast storage and copies them back when needed, trading transfer time for capacity, and quantising the cache to $8$ or $4$ bits ([[inference/quantisation]]) halves or quarters every figure in this chapter.

## Implementing it {#sec-code}

The first listing builds one attention layer in plain Python and decodes $12$ tokens twice — recomputing the prefix at every step, and with a cache — then evaluates the cache-size formula, simulates contiguous and paged allocation for $200$ requests, and runs a block-hashed prefix cache over $50$ requests that share a $600$-token system prompt.

```python
import math, random
rng = random.Random(0)
d, T = 8, 12                                         # width, sequence length
def mat(r, c): return [[rng.gauss(0, 1 / math.sqrt(r)) for _ in range(c)] for _ in range(r)]
def vecmat(x, W): return [sum(x[i] * W[i][j] for i in range(len(x))) for j in range(len(W[0]))]
Wq, Wk, Wv = mat(d, d), mat(d, d), mat(d, d)
X = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(T)]    # (T, d) token states

def attend(q, Ks, Vs):                               # one query against cached keys/values
    s = [sum(a * b for a, b in zip(q, k)) / math.sqrt(d) for k in Ks]
    m = max(s); w = [math.exp(v - m) for v in s]; z = sum(w)
    return [sum(w[j] * Vs[j][i] for j in range(len(Vs))) / z for i in range(d)]

# (1) no cache: at every step recompute keys and values of the whole prefix
macs_nocache, out_nocache = 0, []
for t in range(T):
    Ks = [vecmat(x, Wk) for x in X[:t + 1]]; Vs = [vecmat(x, Wv) for x in X[:t + 1]]
    macs_nocache += 2 * (t + 1) * d * d + d * d
    out_nocache.append(attend(vecmat(X[t], Wq), Ks, Vs))
# (2) with a cache: compute one new key and value per step and append
macs_cache, out_cache, Kc, Vc = 0, [], [], []
for t in range(T):
    Kc.append(vecmat(X[t], Wk)); Vc.append(vecmat(X[t], Wv)); macs_cache += 3 * d * d
    out_cache.append(attend(vecmat(X[t], Wq), Kc, Vc))
diff = max(abs(a - b) for r1, r2 in zip(out_nocache, out_cache) for a, b in zip(r1, r2))
print(f"max |difference| = {diff:.1e}; projection MACs: no cache {macs_nocache}, cache {macs_cache}")

# KV-cache size: 2 * L * h_kv * d_k * T * bytes
def kv_bytes(L, h_kv, d_k, T, b=2): return 2 * L * h_kv * d_k * T * b
for name, L, hkv, dk in [("MHA 32x32x128", 32, 32, 128), ("GQA 32x8x128", 32, 8, 128),
                         ("MQA 32x1x128", 32, 1, 128)]:
    print(f"{name}: {kv_bytes(L, hkv, dk, 1) // 1024} KiB/token, "
          f"{kv_bytes(L, hkv, dk, 32768) / 2**30:.1f} GiB at 32k tokens")
print("MLA (60 layers, 512+64 per token):", 60 * (512 + 64) * 2 / 1024, "KiB/token;",
      "MHA equivalent:", kv_bytes(60, 128, 128, 1) / 1024, "KiB/token")

# (3) paged versus contiguous allocation of the cache, for 200 requests
lengths = [rng.randint(50, 2000) for _ in range(200)]          # final lengths, tokens
max_len = 2048
contig_reserved = len(lengths) * max_len
for bs in (1, 16, 128):
    pages = sum(-(-n // bs) for n in lengths)                  # ceil(n / bs) pages each
    print(f"block {bs:3d}: used {sum(lengths)} slots, allocated {pages * bs}, "
          f"waste {100 * (pages * bs - sum(lengths)) / (pages * bs):.1f}%")
print(f"contiguous max_len reservation: waste {100 * (1 - sum(lengths) / contig_reserved):.1f}%")

# (4) prefix caching: blocks keyed by the hash of all tokens up to and including the block
def block_keys(tokens, bs):
    return [hash(tuple(tokens[:i + bs])) for i in range(0, len(tokens) - len(tokens) % bs, bs)]
system = [rng.randrange(32000) for _ in range(600)]            # shared 600-token system prompt
cache, hits = set(), 0
for r in range(50):
    prompt = system + [rng.randrange(32000) for _ in range(rng.randint(20, 200))]
    keys = block_keys(prompt, 16)
    for k in keys:
        if k in cache: hits += 1
        else: break                                             # first miss ends the shared prefix
    cache.update(keys)
print(f"prefix cache: {hits} of {50 * (600 // 16)} system-prompt blocks reused "
      f"({hits * 16} tokens of prefill skipped)")
```

Output:

```
max |difference| = 0.0e+00; projection MACs: no cache 10752, cache 2304
MHA 32x32x128: 512 KiB/token, 16.0 GiB at 32k tokens
GQA 32x8x128: 128 KiB/token, 4.0 GiB at 32k tokens
MQA 32x1x128: 16 KiB/token, 0.5 GiB at 32k tokens
MLA (60 layers, 512+64 per token): 67.5 KiB/token; MHA equivalent: 3840.0 KiB/token
block   1: used 206093 slots, allocated 206093, waste 0.0%
block  16: used 206093 slots, allocated 207616, waste 0.7%
block 128: used 206093 slots, allocated 218752, waste 5.8%
contiguous max_len reservation: waste 49.7%
prefix cache: 1813 of 1850 system-prompt blocks reused (29008 tokens of prefill skipped)
```

The cached and uncached outputs agree exactly (here even bitwise, since both paths do the same arithmetic in the same order), while the projections cost $2304$ multiply–accumulates instead of $10{,}752$; the gap grows linearly with $T$. Blocks of $16$ waste $0.7\%$ of the cache, close to the $7.5$ slots per request of [[#prop-paged-waste]] ($200\cdot7.5 = 1500$ against $1523$ observed), while reserving the maximum length wastes half. Every request after the first reuses all $37$ full blocks of the system prompt; the last $8$ prompt tokens fall in a block shared with user text and are recomputed.

The second listing illustrates attention sinks on synthetic data: a key at position $0$ aligned with the common direction of the queries, carrying a null value, as Xiao et al. describe for trained models. It compares the attention output over a $64$-token budget with and without that sink, against full attention over $1000$ positions.

```python
import math, random
rng = random.Random(0)
def attn(q, Ks, Vs, keep):                 # attention of q over the kept positions only
    s = [sum(a * b for a, b in zip(q, Ks[j])) for j in keep]
    m = max(s); w = [math.exp(v - m) for v in s]; z = sum(w)
    return [sum(w[i] * Vs[j][c] for i, j in enumerate(keep)) / z for c in range(len(Vs[0]))], w[0] / z
n, dd = 1000, 16
mu = [0.6] * dd                                               # queries share a common direction
Ks = [[rng.gauss(0, 0.3) for _ in range(dd)] for _ in range(n)]
Vs = [[rng.gauss(0, 1) for _ in range(dd)] for _ in range(n)]
Ks[0] = [0.8] * dd; Vs[0] = [0.0] * dd                        # token 0: a sink, aligned key, null value
policies = {"recent 64": list(range(n - 64, n)),
            "sink + recent 63": [0] + list(range(n - 63, n))}
err = {k: 0.0 for k in policies}; ratio = {k: 0.0 for k in policies}; sinkw = 0.0
for trial in range(100):
    q = [m + rng.gauss(0, 0.5) for m in mu]
    full, w0 = attn(q, Ks, Vs, range(n)); sinkw += w0 / 100
    norm = math.sqrt(sum(x * x for x in full))
    for k, keep in policies.items():
        approx, _ = attn(q, Ks, Vs, keep)
        err[k] += math.sqrt(sum((a - b) ** 2 for a, b in zip(full, approx))) / norm / 100
        ratio[k] += math.sqrt(sum(x * x for x in approx)) / norm / 100
print(f"attention on the sink in full attention: {sinkw:.2f}")
for k in policies: print(f"{k:17s} relative error {err[k]:.2f}, output norm / full norm {ratio[k]:.2f}")
```

Output:

```
attention on the sink in full attention: 0.56
recent 64         relative error 20.71, output norm / full norm 20.90
sink + recent 63  relative error 1.12, output norm / full norm 0.65
```

Full attention puts $56\%$ of its mass on the sink. Dropping it renormalises all that mass onto $64$ recent tokens, and the output is about $21$ times too large — the kind of distribution shift that, layer after layer, makes a trained model's perplexity explode. Keeping the sink keeps the output on the right scale, but its relative error is still about $1$: the content of the $936$ evicted tokens is gone. That is the honest summary of StreamingLLM — stability, not memory.

::: history
Caching keys and values is as old as autoregressive Transformer decoding; the original Tensor2Tensor and fairseq implementations of 2017–2019 already did it. Shazeer (2019) proposed multi-query attention explicitly to reduce the memory bandwidth of incremental decoding, and Pope et al. (2022), analysing inference of very large models, showed how it allows long contexts and large batches. Ainslie, Lee-Thorp, de Jong, Zemlyanskiy, Lebrón and Sanghai introduced grouped-query attention and uptraining (EMNLP 2023). Kwon, Li, Zhuang, Sheng, Zheng, Yu, Gonzalez, Zhang and Stoica introduced PagedAttention and vLLM (SOSP 2023). Zheng and colleagues' SGLang (2024) organised prefix reuse in a radix tree. Zhang and colleagues' H2O (NeurIPS 2023) and Xiao, Tian, Chen, Han and Lewis's StreamingLLM (ICLR 2024) started the line of work on evicting cache entries. DeepSeek-AI's DeepSeek-V2 (2024) introduced multi-head latent attention.
:::

::: summary
- With causal attention, the keys and values of position $i$ depend only on $x_{\le i}$, so **cached decoding is exact** and saves a factor of about $T/2$ in arithmetic.
- The cache of a batch is $2Lh_{kv}d_kb\sum_iT_i$ bytes. Beyond a modest number of tokens it exceeds the weights, and it caps the number of concurrent requests.
- **MQA and GQA** share key–value heads; **MLA** caches a latent of $d_c + d_h^R$ numbers per token and layer and absorbs the up-projections into the query and output projections; RoPE is handled by a separate shared rotary key.
- A **paged** cache allocates fixed-size blocks through a block table, wasting under $B_s$ slots per request, and enables copy-on-write sharing.
- **Prefix caching** reuses the exact keys and values of a shared prompt prefix; only an exact token prefix matches, so variable text belongs at the end.
- **Eviction** (sliding windows, attention sinks, heavy hitters) approximates attention. Attention sinks keep long streams stable, but no eviction policy retains information it has evicted.
:::

## Exercises

::: exercise Cache per token {level=1 check="160"}
A model has $40$ layers, $8$ key–value heads of dimension $128$, and stores its cache in 16-bit precision. How many KiB of cache does one token need?
::: solution
$2\cdot40\cdot8\cdot128\cdot2 = 163{,}840$ bytes $= 160$ KiB.
:::
:::

::: exercise Waste in a paged cache {level=1 check="8"}
With blocks of $16$ tokens, how many slots does a sequence of $1000$ tokens waste?
::: solution
$\lceil1000/16\rceil = 63$ blocks hold $1008$ slots; $1008 - 1000 = 8$ are empty.
:::
:::

::: exercise Equivalent number of groups {level=1 check="2.25"}
An MLA layer caches $d_c = 512$ latent and $d_h^R = 64$ rotary numbers per token. A GQA layer with heads of dimension $128$ caches $2\cdot128\cdot h_{kv}$ numbers per token. For what $h_{kv}$ are the caches equal?
::: solution
$576 = 256h_{kv}$ gives $h_{kv} = 2.25$.
:::
:::

::: exercise Concurrent sequences {level=2 check="59"}
After loading the weights and reserving buffers, $40$ GB ($4\times10^{10}$ bytes) of memory remain for the cache of a model needing $160$ KiB ($163{,}840$ bytes) per token. How many sequences of $4096$ tokens fit at once?
::: solution
Each sequence needs $163{,}840\cdot4096 = 6.71\times10^8$ bytes. $4\times10^{10}/6.71\times10^8 = 59.6$, so $59$ sequences fit.
:::
:::

::: exercise Sharing a prompt among samples {level=2 check="2.5"}
Four samples are drawn from one $2000$-token prompt, each generating $500$ tokens. Ignoring block granularity, by what factor does a paged cache with shared prompt blocks reduce the cache memory compared with four independent copies?
::: solution
Independent copies: $4\cdot2500 = 10{,}000$ tokens. Shared: $2000 + 4\cdot500 = 4000$ tokens (plus at most one copied partial block per sample). The factor is $10{,}000/4000 = 2.5$.
:::
:::

::: exercise Prefix-cache savings {level=2 check="0.8"}
Every request has a $1200$-token shared prefix and $300$ tokens of its own; blocks hold $16$ tokens. Once the prefix is cached, what fraction of prompt tokens no longer needs prefilling?
::: solution
$1200$ is a multiple of $16$, so the whole prefix is reused: $1200/1500 = 0.8$ of the prompt tokens ([[#ex-prefix]]). Had the prefix been $1210$ tokens, the last $10$ would share a block with request-specific text and be recomputed.
:::
:::

::: exercise The arithmetic saved by caching {level=2}
Show that generating $T$ tokens from an empty prompt without a cache costs about $NT^2$ FLOPs in the weight matrices, against $2NT$ with a cache, and that the attention arithmetic is about $\tfrac23LdT^3$ without a cache and $2LdT^2$ with one.
::: solution
Without a cache, step $t$ runs a full forward pass over $t$ tokens: $2Nt$ weight FLOPs and $2Ldt^2$ attention FLOPs ([[inference/decoding-sampling#prop-phases]]). Summing, $\sum_{t=1}^T2Nt = NT(T + 1)\approx NT^2$ and $\sum_{t=1}^T2Ldt^2\approx\tfrac23LdT^3$. With a cache, step $t$ costs $2N + 4Ldt$, summing to $2NT + 2LdT(T + 1)\approx2NT + 2LdT^2$. The ratio of weight FLOPs is $T/2$; that of attention FLOPs is $T/3$.
:::
:::

::: exercise Why MLA needs a decoupled rotary key {level=3}
Suppose RoPE were applied to the MLA keys, $\mathbf{k}_{s,i} = R_sW^{UK}_i\mathbf{c}_s$, and to the queries, $\tilde{\mathbf{q}}_{t,i} = R_t\mathbf{q}_{t,i}$, where $R_p$ is the block-diagonal rotation for position $p$. Show that the score is $\mathbf{q}^\top_{t,i}R_{s-t}W^{UK}_i\mathbf{c}_s$, explain why this prevents absorption, and compute how many extra numbers per token the decoupled design caches compared with storing only $\mathbf{c}_s$.
::: solution
Rotations satisfy $R_t^\top R_s = R_{s-t}$ (they are commuting rotations by angles proportional to position, [[transformers/positional-encoding#prop-rope]]). So $\tilde{\mathbf{q}}^\top\mathbf{k} = \mathbf{q}^\top R_t^\top R_sW^{UK}_i\mathbf{c}_s = \mathbf{q}^\top R_{s-t}W^{UK}_i\mathbf{c}_s$. Absorption requires a fixed matrix $M_i$ with score $(M_i^\top\mathbf{q})^\top\mathbf{c}_s$ for all $s$; here the matrix $R_{s-t}W^{UK}_i$ changes with the offset $s - t$, so one would have to recompute the full keys $R_sW^{UK}_i\mathbf{c}_s$ for every cached position at every step, or cache them — losing the saving. The decoupled design caches one shared rotary key of $d_h^R = 64$ numbers per token and layer, $12.5\%$ on top of the $512$-number latent.
:::
:::

::: exercise Expected waste with long-tailed lengths {level=3}
Requests have lengths uniformly distributed on $\{1,\dots,4096\}$. Compute the expected fraction of allocated cache slots wasted (a) by contiguous reservation of $4096$ slots per request and (b) by paging with $B_s = 16$. Then explain why paging also enables a scheduler to admit more requests without knowing their final lengths.
::: solution
(a) Expected length $(4096 + 1)/2 = 2048.5$, so the expected used fraction is $2048.5/4096 = 0.5001$ and about $50\%$ is wasted. (b) Since $4096$ is a multiple of $16$, $n\bmod16$ is exactly uniform, and the expected waste is $7.5$ slots ([[#prop-paged-waste]]); the expected allocation is $2048.5 + 7.5 = 2056$ slots, so the waste fraction is $7.5/2056 = 0.36\%$. Because a paged system allocates as a request grows, it can admit requests according to the memory they use *now*, and if memory runs short it preempts a request — freeing its blocks and later recomputing or swapping them back — instead of having to reserve the worst case for every request in advance.
:::
:::

::: exercise A heavy-hitter policy {level=3}
Extend the second listing with an H2O-style policy: keep a recent window of $32$ positions plus the $32$ older positions with the largest attention weight under the current query. Run it and compare its relative error and norm ratio with the two policies in the listing. Why is selecting by the *current* query's weights optimistic compared with what a real system can do?
::: solution
```python
def h2o(q, Ks, Vs, recent=32, heavy=32):
    s = [sum(a * b for a, b in zip(q, k)) for k in Ks]
    old = sorted(range(len(Ks) - recent), key=lambda j: -s[j])[:heavy]
    return sorted(old) + list(range(len(Ks) - recent, len(Ks)))
```
Add `policies["heavy 32 + recent 32"] = h2o(q, Ks, Vs)` at the start of the trial loop (and an entry for it in `err` and `ratio`). With the same seed the output gains the line

```
heavy 32 + recent 32 relative error 1.00, output norm / full norm 1.31
```

The sink is the heaviest hitter and is always kept, so the output keeps roughly the right scale; but the error is no better than that of the sink plus a window. In this synthetic data the $999$ ordinary keys are random, so the attention mass outside the sink is spread almost evenly and no small set of old tokens carries much of it: there are no heavy hitters to find. Heavy-hitter methods work to the extent that trained models concentrate attention on few tokens, which H2O documented empirically for the models it studied. The experiment is also optimistic in another way: it selects with the *current* query, whereas a real system must evict *before* future queries are known, using attention accumulated from past ones. A token ignored so far may be exactly what a later question needs.
:::
:::
