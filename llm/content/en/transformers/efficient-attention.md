FlashAttention ([[transformers/attention-complexity]]) computes exact attention without storing the attention matrix, but it does not change two hard facts. Training and processing a prompt still cost arithmetic that grows like $T^2$; and while a model generates text, it must keep the keys and values of every earlier token in memory — the **KV cache** — and read all of them for every new token. For a model of the 70-billion-parameter class with full multi-head attention, that cache takes $10$ GiB for a single sequence of $4096$ tokens.

This chapter covers the two families of remedies. The first changes *which* pairs of tokens interact: sparse patterns, sliding windows and kernelised "linear" attention reduce the $T^2$ term by approximating or restricting attention. The second changes *how much is stored per token*: multi-query and grouped-query attention share keys and values between heads and shrink the cache several-fold, at little cost in quality. Today's long-context models combine ideas from both.

## The KV cache {#sec-kv}

When a decoder generates token $t + 1$, the keys and values of positions $1, \dots, t$ have not changed since they were computed — the causal mask guarantees it ([[transformers/multi-head-attention#prop-causal]]) — so they are stored and reused. Each generated token adds one key and one value vector per head and per layer.

::: proposition The size of the KV cache {#prop-kv-size}
A decoder with $L$ layers, $h_{kv}$ key–value heads of dimension $d_k$, storing numbers of $b$ bytes, needs

$$
2\cdot L\cdot h_{kv}\cdot d_k\cdot b \quad\text{bytes per token}
$$

of KV cache, and $T$ times that for a context of $T$ tokens, for each sequence being generated.
:::

::: proof
For every token, every layer stores one key and one value vector of length $d_k$ for each of its $h_{kv}$ key–value heads: $2h_{kv}d_k$ numbers per layer, $2Lh_{kv}d_k$ numbers per token, each of $b$ bytes.
:::

In standard multi-head attention $h_{kv} = h$, the number of query heads, and $h_{kv}d_k = d_{\text{model}}$. The cache then grows with the model's width, its depth and the context — and it is read in full for every generated token, which makes generation memory-bound ([[transformers/attention-complexity#sec-decode]]).

## Sharing keys and values between heads {#sec-gqa}

Shazeer (2019) observed that the query heads need not each have their own keys and values.

::: definition Multi-query and grouped-query attention {#def-gqa}
In **grouped-query attention** (GQA) the $h$ query heads are divided into $g$ groups of $h/g$ heads, and all heads in a group share one key head and one value head, so $h_{kv} = g$. **Multi-query attention** (MQA) is the case $g = 1$: one key head and one value head shared by all query heads. Standard multi-head attention is the case $g = h$.
:::

Each query head still computes its own attention pattern from its own queries; only the keys and values it consults are shared within its group. The cache shrinks by the factor $h/g$, and so does the memory read per generated token. The projections $W_K$ and $W_V$ shrink in the same proportion, from $d\times d$ to $d\times gd_k$.

::: example Caches of a 70-billion-parameter model {#ex-kv}
Llama 2 70B has $L = 80$ layers and $64$ query heads of dimension $d_k = 128$, and uses GQA with $8$ key–value heads. Compute its KV cache per token and for a $4096$-token sequence in bfloat16, and compare with full multi-head attention and with MQA.
::: solution
By [[#prop-kv-size]] with $h_{kv} = 8$: $2\cdot80\cdot8\cdot128\cdot2 = 327{,}680$ bytes $= 320$ KiB per token, and $4096\cdot320$ KiB $= 1.25$ GiB per sequence. With $64$ key–value heads (full MHA) the cache would be eight times larger: $2.5$ MiB per token and $10$ GiB per sequence. With MQA it would be $40$ KiB per token. Serving a batch of $16$ conversations of $4096$ tokens takes $20$ GiB of cache with GQA and $160$ GiB — more than any single GPU — with full MHA.
:::
:::

How much quality is lost? Ainslie et al. (2023) found that MQA lowered quality noticeably and could make training unstable, while GQA with a handful of key–value heads came close to multi-head attention at nearly the speed of MQA. They also showed that an existing multi-head model can be converted ("uptrained") to GQA by averaging the key and value heads within each group and continuing training for about $5\%$ of the original pretraining compute. GQA is now standard: Llama 2 70B and every Llama 3 model, Mistral 7B and many others use it.

::: widget plot
f: 2*80*64*128*2*x/2^30; 2*80*g*128*2*x/2^30
x: 0, 32768
sliders: g=8:1:64:1
labels: full multi-head ($64$ KV heads); grouped-query ($g$ KV heads)
caption: KV cache (GiB) of one sequence against its length, for a model with $80$ layers and heads of dimension $128$ in bfloat16. The cache grows linearly with the context. With $g = 8$ key–value heads it is an eighth of the multi-head cache: $10$ GiB instead of $80$ GiB at $32{,}768$ tokens.
:::

::: quiz
A model has $32$ query heads and uses grouped-query attention with $4$ key–value heads. Compared with full multi-head attention, what are its KV cache and the FLOPs of its attention scores?
- [x] The cache is $8$ times smaller; the score FLOPs are unchanged
- [ ] Both are $8$ times smaller
- [ ] The cache is $4$ times smaller; the score FLOPs are $8$ times smaller
- [ ] The cache is unchanged; only the parameters shrink
::: solution
The cache holds $h_{kv} = 4$ heads instead of $32$, a factor of $8$. Every one of the $32$ query heads still computes its own $T\times T$ scores (against its group's shared keys), so the attention FLOPs stay the same; only the key and value projections, and the memory read per token, shrink. GQA helps generation, which is memory-bound, far more than it helps prefill, which is compute-bound.
:::
:::

In code, GQA needs one change to multi-head attention: compute $g$ key and value heads, and let query head $i$ use key–value head $\lfloor i/(h/g)\rfloor$. The simplest way is to repeat each key–value head $h/g$ times along the head axis before the ordinary attention computation; optimised kernels index the shared heads directly instead of copying them.

```python
import torch, torch.nn.functional as F

B, T, h, g, d_k = 2, 10, 8, 2, 16                  # 8 query heads share 2 key-value heads
q = torch.randn(B, h, T, d_k)                       # (B, h, T, d_k)
k, v = torch.randn(B, g, T, d_k), torch.randn(B, g, T, d_k)   # (B, g, T, d_k): the cached tensors
k_rep = k.repeat_interleave(h // g, dim=1)          # (B, h, T, d_k): heads 0-3 use group 0, 4-7 group 1
v_rep = v.repeat_interleave(h // g, dim=1)
out = F.scaled_dot_product_attention(q, k_rep, v_rep, is_causal=True)   # (B, h, T, d_k)
print(out.shape, k.numel() / k_rep.numel())         # torch.Size([2, 8, 10, 16]) 0.25
```

Only `k` and `v`, a quarter of the size of `k_rep` and `v_rep` here, need to be stored in the cache.

DeepSeek-V2 (2024) went further with **multi-head latent attention**, which stores a single compressed latent vector per token and layer, from which the keys and values of all heads are reconstructed; the authors reported a KV cache $93\%$ smaller than that of their earlier dense model with multi-head attention. Other approaches quantise the cache to $8$ or fewer bits ([[inference/quantisation]]).

## Restricting who attends to whom {#sec-sparse}

The second family attacks the $T^2$ pairs. The simplest restriction is locality.

::: definition Sliding-window attention {#def-window}
In **sliding-window attention** with window $w$, the query at position $i$ may attend only to keys at positions $j$ with $i - w < j\le i$: itself and the $w - 1$ preceding tokens. The cost per layer is $O(Twd)$ instead of $O(T^2d)$, and the KV cache never needs more than the last $w$ tokens.
:::

A single layer with a window sees only $w$ tokens back, but layers compose: what position $i - w + 1$ saw in the previous layer reaches position $i$ in this one.

::: proposition The reach of stacked windows {#prop-reach}
In a stack of $L$ causal sliding-window attention layers with window $w$, the output at position $i$ can depend on the input at positions $j\ge i - L(w - 1)$, and on no earlier ones.
:::

::: proof
By induction on $L$. One layer lets position $i$ read positions $i - (w - 1), \dots, i$. If after $L$ layers position $p$ depends on inputs back to $p - L(w - 1)$, then in layer $L + 1$ position $i$ reads positions back to $i - (w - 1)$, each of which depends on inputs back to $i - (w - 1) - L(w - 1) = i - (L + 1)(w - 1)$. No input earlier than that can reach position $i$, because each layer moves information at most $w - 1$ positions forward.
:::

Mistral 7B (Jiang et al., 2023) used a window of $w = 4096$ in each of its $32$ layers, for a theoretical reach of about $32\cdot4096 = 131{,}072$ tokens. Gemma 2 and later models interleave sliding-window layers with ordinary global-attention layers, so that the cheap local layers do most of the work while a few global layers keep long-range access exact.

::: widget graph
nodes: t1@0,0; t2@1,0.8; t3@2,0; t4@3,0.8; t5@4,0; t6@5,0.8
edges: t1>t2; t1>t3; t2>t3; t2>t4; t3>t4; t3>t5; t4>t5; t4>t6; t5>t6
algorithm: bfs
start: t1
caption: Sliding-window attention with $w = 3$ (each token sees itself and the two before it). An arrow means "can attend to". Run the breadth-first search from $t_1$: its distance to each token is the number of layers needed for information from $t_1$ to reach that token — $t_6$ is three hops away, so it needs three layers, as [[#prop-reach]] predicts with $w - 1 = 2$ positions per layer.
:::

::: example The cost of a window {#ex-window}
A causal model processes $T = 32{,}768$ tokens with a window of $w = 4096$. What fraction of the (query, key) pairs of full causal attention does it compute?
::: solution
Full causal attention computes $T(T + 1)/2 = 536{,}887{,}296$ pairs. With the window, position $i$ computes $\min(i, w)$ pairs, $125{,}831{,}168$ in total: about $23\%$ of the full count. The saving grows with $T$: the window's cost is linear in $T$, so at $131{,}072$ tokens it would compute about $6\%$ of the pairs.
:::
:::

::: warning A wide reach is not a long memory
[[#prop-reach]] gives an upper bound: information *can* travel $L(w-1)$ positions, but every hop squeezes it through a fixed-size representation and competes with everything else in each window. Models with sliding windows typically retrieve a fact from $100{,}000$ tokens back far less reliably than models with global attention. That is why recent models keep some global layers rather than relying on windows alone.
:::

A practical detail matters when a window slides past the start of a long stream. Trained models place a large share of attention on the first few tokens of a sequence, whatever they contain — **attention sinks** that absorb weight when no other key is relevant — and evicting them from the cache makes generation collapse. Xiao et al. (2023) showed that keeping the first four tokens in the cache alongside a sliding window restores stable generation over millions of tokens, a method they called StreamingLLM ([[inference/long-context]]).

Before windows became standard, researchers explored many sparse patterns. The Sparse Transformer (Child et al., 2019) combined local attention with attention to every $\sqrt T$-th position, giving $O(T\sqrt T)$ cost. Longformer (Beltagy et al., 2020) added a few **global** tokens that attend to and are attended by every position, and BigBird (Zaheer et al., 2020) combined windows, global tokens and random connections and proved that such sparse patterns preserve the expressive power of full attention. Reformer (Kitaev et al., 2020) grouped similar queries and keys by hashing, and Linformer (Wang et al., 2020) projected the keys and values along the sequence to a fixed length. These ideas proved most useful for encoders over long documents; for large decoders, FlashAttention made exact attention fast enough that most fixed sparse patterns were not worth their loss in quality.

## Linear attention {#sec-linear}

A different idea removes the $T^2$ term by changing the similarity function. Softmax attention weights each value by $\exp(\mathbf{q}_i\cdot\mathbf{k}_j/\sqrt{d_k})$; suppose instead the weight were a dot product of **feature maps**, $\phi(\mathbf{q}_i)\cdot\phi(\mathbf{k}_j)$, with $\phi\colon\R^{d_k}\to\R^{r}_{>0}$.

::: definition Linear attention {#def-linear}
With a feature map $\phi$ with positive values, **linear attention** computes, for each query,

$$
\mathbf{y}_i = \frac{\sum_j\big(\phi(\mathbf{q}_i)\cdot\phi(\mathbf{k}_j)\big)\mathbf{v}_j}{\sum_j\phi(\mathbf{q}_i)\cdot\phi(\mathbf{k}_j)} = \frac{\phi(\mathbf{q}_i)^\top\Big(\sum_j\phi(\mathbf{k}_j)\mathbf{v}_j^\top\Big)}{\phi(\mathbf{q}_i)^\top\Big(\sum_j\phi(\mathbf{k}_j)\Big)},
$$

with the sums over all keys (or, causally, over $j\le i$). Katharopoulos et al. (2020) used $\phi(\mathbf{x}) = \operatorname{elu}(\mathbf{x}) + 1$.
:::

The second form is the point: by associativity, $\big(\phi(Q)\phi(K)^\top\big)V = \phi(Q)\big(\phi(K)^\top V\big)$. The matrix $\phi(K)^\top V$ has size $r\times d_v$ and is computed once, in $O(Trd_v)$ operations, instead of the $T\times T$ matrix of weights. The cost becomes linear in $T$.

::: proposition Causal linear attention is a recurrent network {#prop-linear-rnn}
With the causal sums $\sum_{j\le i}$, define the state $S_i = \sum_{j\le i}\phi(\mathbf{k}_j)\mathbf{v}_j^\top\in\R^{r\times d_v}$ and $\mathbf{z}_i = \sum_{j\le i}\phi(\mathbf{k}_j)\in\R^r$. Then

$$
S_i = S_{i-1} + \phi(\mathbf{k}_i)\mathbf{v}_i^\top, \qquad \mathbf{z}_i = \mathbf{z}_{i-1} + \phi(\mathbf{k}_i), \qquad \mathbf{y}_i = \frac{\phi(\mathbf{q}_i)^\top S_i}{\phi(\mathbf{q}_i)^\top\mathbf{z}_i},
$$

with $S_0 = 0$ and $\mathbf{z}_0 = \mathbf{0}$. Generating a token costs $O(rd_v)$ time and memory, independent of the context length.
:::

::: proof
The recurrences hold because each sum gains exactly the term for $j = i$. Substituting the sums into [[#def-linear]] with $j\le i$ gives $\mathbf{y}_i$. Each step updates an $r\times d_v$ matrix and an $r$-vector and takes one product with $\phi(\mathbf{q}_i)$, so its cost does not depend on $i$.
:::

So causal linear attention is an RNN with a matrix-valued state, and it needs no growing cache. The price is expressiveness: the whole past is compressed into $S_i$, and softmax attention's ability to pick out one key sharply among thousands is lost. Performer (Choromanski et al., 2020) chose random features that approximate the softmax kernel itself (exercise 10), but in language modelling linear attention fell short of softmax attention in quality. Arora et al. (2023) traced much of the gap to *associative recall* — retrieving the value that followed a particular key earlier in the context — which a fixed-size state handles poorly once the context holds more key–value pairs than the state can separate. Its ideas live on in a family of recurrent architectures that add gating or decay to the state — RetNet (Sun et al., 2023), gated linear attention, and the selective state-space model Mamba ([[sequence-models/state-space-models]]) — and in hybrid models that combine such layers with a few attention layers.

::: example Linear attention by hand {#ex-linear}
Take $\phi$ to be the identity (all vectors below are positive) and two tokens with queries $\mathbf{q}_1 = (1, 0)$, $\mathbf{q}_2 = (1, 1)$, keys $\mathbf{k}_1 = (1, 1)$, $\mathbf{k}_2 = (2, 0)$ and one-dimensional values $v_1 = 1$, $v_2 = 3$. Compute the causal outputs both from [[#def-linear]] and with the recurrence of [[#prop-linear-rnn]].
::: solution
Directly: the scores are $\mathbf{q}_1\cdot\mathbf{k}_1 = 1$ for token 1, and $\mathbf{q}_2\cdot\mathbf{k}_1 = 2$, $\mathbf{q}_2\cdot\mathbf{k}_2 = 2$ for token 2, so $y_1 = 1\cdot1/1 = 1$ and $y_2 = (2\cdot1 + 2\cdot3)/(2 + 2) = 2$.

Recurrently: $S_1 = \mathbf{k}_1v_1 = (1, 1)^\top$, $\mathbf{z}_1 = (1, 1)$, so $y_1 = \mathbf{q}_1\cdot S_1/\mathbf{q}_1\cdot\mathbf{z}_1 = 1/1 = 1$. Then $S_2 = (1, 1)^\top + (2, 0)^\top\cdot3 = (7, 1)^\top$ and $\mathbf{z}_2 = (3, 1)$, so $y_2 = (7 + 1)/(3 + 1) = 2$. The two computations agree, but the recurrent one kept only a $2\times1$ state and a $2$-vector, however long the sequence grows.
:::
:::

::: example How much linear attention saves {#ex-linear-cost}
For one head with $T = 32{,}768$ and $d_k = d_v = r = 128$, compare the arithmetic of softmax attention ($\approx T^2d$ multiply–adds for scores and as many for values) with that of linear attention ($\approx Trd_v$ for $\phi(K)^\top V$ and as many for the products with $\phi(Q)$).
::: solution
Softmax attention: $2T^2d = 2\cdot32{,}768^2\cdot128\approx2.7\times10^{11}$ multiply–adds. Linear attention: $2Trd = 2\cdot32{,}768\cdot128^2\approx1.1\times10^9$. The ratio is $T/d = 256$. The saving grows linearly with the context, which is why linear and state-space layers are attractive for very long inputs — if the loss in quality can be tolerated or compensated.
:::
:::

::: history
Shazeer (2019) proposed multi-query attention to speed up incremental decoding, and Ainslie et al. (2023) introduced grouped-query attention and showed how to uptrain existing models; Llama 2 (2023) brought GQA to widely used open models. Sparse attention patterns were explored by the Sparse Transformer (Child et al., 2019), Longformer (Beltagy, Peters and Cohan, 2020) and BigBird (Zaheer et al., 2020), while Reformer (Kitaev, Kaiser and Levskaya, 2020) used locality-sensitive hashing and Linformer (Wang et al., 2020) low-rank projections. Katharopoulos et al. (2020) showed that kernelised attention is linear in $T$ and recurrent ("Transformers are RNNs"), and Choromanski et al. (2020) approximated the softmax kernel with positive random features in the Performer. Mistral 7B (Jiang et al., 2023) combined sliding windows with GQA; Gemma 2 (2024) interleaved local and global layers; DeepSeek-V2 (2024) introduced multi-head latent attention. Gated recurrent alternatives — RetNet (2023), Mamba (Gu and Dao, 2023) — and hybrids such as Jamba (2024) continue the search for attention that scales better with context.
:::

::: summary
- During generation each token's keys and values are cached; the cache takes $2Lh_{kv}d_kb$ bytes per token and is read in full for every new token.
- Grouped-query attention shares each key–value head among a group of query heads, shrinking the cache and the memory read per token by $h/g$ with little loss of quality; multi-query attention is the extreme $g = 1$.
- Sliding-window attention costs $O(Twd)$ per layer and caches only $w$ tokens; stacked windows reach $L(w-1)$ positions back, but long-range recall is weaker than with global attention, so models interleave local and global layers.
- Sparse patterns (strided, global tokens, random links) reduce the $T^2$ pairs; they mattered most for long-document encoders.
- Linear attention replaces $\exp(\mathbf{q}\cdot\mathbf{k})$ with $\phi(\mathbf{q})\cdot\phi(\mathbf{k})$; associativity makes it linear in $T$, and its causal form is an RNN with a matrix state — cheaper, but less able to retrieve sharply.
:::

## Exercises

::: exercise A multi-head cache {level=1 check="524288"}
A model with $32$ layers, $32$ heads of dimension $128$ and full multi-head attention stores its cache in bfloat16. How many bytes of KV cache does it need per token, and how many gibibytes for $4096$ tokens?
::: solution
$2\cdot32\cdot32\cdot128\cdot2 = 524{,}288$ bytes $= 512$ KiB per token; for $4096$ tokens $2$ GiB. This is the configuration of the LLaMA and Llama 2 7B models.
:::
:::

::: exercise The GQA factor {level=1 check="1/8"}
A model has $64$ query heads and uses GQA with $8$ groups. What fraction of the full multi-head KV cache does it need?
::: solution
$h_{kv}/h = 8/64 = 1/8$.
:::
:::

::: exercise A window's reach {level=1 check="131072"}
By [[#prop-reach]], how far back can information travel through $32$ sliding-window layers with $w = 4096$? Give the number of positions (use $L\cdot w$, as Mistral's paper does, since $w - 1\approx w$).
::: solution
$L(w - 1) = 32\cdot4095 = 131{,}040$ positions, usually quoted as $32\cdot4096 = 131{,}072$.
:::
:::

::: exercise Linear versus quadratic {level=1 check="256"}
By what factor does linear attention reduce the arithmetic of one head for $T = 32{,}768$ and $d = r = 128$, according to [[#ex-linear-cost]]?
::: solution
$T/d = 32{,}768/128 = 256$.
:::
:::

::: exercise A batch of conversations {level=2 check="20"}
Using [[#ex-kv]], how many gibibytes of KV cache does Llama 2 70B need to serve $16$ conversations of $4096$ tokens at once? How many such conversations would fit in $80$ GiB of cache if the model used full multi-head attention?
::: solution
$16\cdot1.25 = 20$ GiB with GQA. With full MHA each conversation needs $10$ GiB, so only $8$ would fit — and the model's own weights, about $140$ GB in bfloat16, would have to live elsewhere.
:::
:::

::: exercise Pairs in a window {level=2 check="21"}
How many (query, key) pairs does causal sliding-window attention with $w = 3$ compute for $T = 8$? Compare with full causal attention.
::: solution
Position $i$ sees $\min(i, 3)$ keys: $1 + 2 + 3\cdot6 = 21$ pairs, against $36$ for full causal attention.
:::
:::

::: exercise The parameters of GQA {level=2 check="150994944"}
With $d = 8192$, $64$ query heads of dimension $128$ and $8$ key–value heads, how many weights does one attention layer have (no biases)? Compare with full multi-head attention.
::: solution
$W_Q$ and $W_O$ are $8192\times8192$ each, $134{,}217{,}728$ together; $W_K$ and $W_V$ are $8192\times1024$ each, $16{,}777{,}216$ together. Total $150{,}994{,}944$, against $4\cdot8192^2 = 268{,}435{,}456$ for MHA — about $44\%$ fewer. Models using GQA usually spend the saved parameters elsewhere, for example on a wider feed-forward layer.
:::
:::

::: exercise Linear attention recurrence {level=2}
Prove that the outputs of causal linear attention computed by the recurrence of [[#prop-linear-rnn]] equal those computed by the quadratic formula $\mathbf{y} = \big(M\odot\phi(Q)\phi(K)^\top\big)V$ divided row-wise by $\big(M\odot\phi(Q)\phi(K)^\top\big)\mathbf{1}$, where $M$ is the lower-triangular matrix of ones. Then check it numerically in PyTorch for random inputs with $\phi = \operatorname{elu} + 1$.
::: solution
Row $i$ of $M\odot\phi(Q)\phi(K)^\top$ is $\big(\phi(\mathbf{q}_i)\cdot\phi(\mathbf{k}_j)\big)_{j\le i}$ (zeros beyond $i$), so the numerator is $\sum_{j\le i}(\phi(\mathbf{q}_i)\cdot\phi(\mathbf{k}_j))\mathbf{v}_j = \phi(\mathbf{q}_i)^\top S_i$ and the denominator $\phi(\mathbf{q}_i)^\top\mathbf{z}_i$, by linearity.

```python
import torch, torch.nn.functional as F
torch.manual_seed(0)
T, d_k, d_v = 6, 4, 3
q, k, v = torch.randn(T, d_k), torch.randn(T, d_k), torch.randn(T, d_v)
Q, K = F.elu(q) + 1, F.elu(k) + 1                    # positive features (T, d_k)
A = torch.tril(Q @ K.T)                               # masked weights (T, T)
quadratic = (A @ v) / A.sum(1, keepdim=True)          # (T, d_v)
S, z, out = torch.zeros(d_k, d_v), torch.zeros(d_k), []
for t in range(T):                                    # O(d_k d_v) work per token
    S, z = S + torch.outer(K[t], v[t]), z + K[t]
    out.append((Q[t] @ S) / (Q[t] @ z))
print(torch.allclose(quadratic, torch.stack(out), atol=1e-5))   # True
```
:::
:::

::: exercise Choosing for a long context {level=3}
A chat model must handle contexts of $128{,}000$ tokens. It has $L = 32$ layers and $32$ query heads of dimension $128$. Compute its KV cache per sequence in bfloat16 with (a) full MHA, (b) GQA with $8$ key–value heads, (c) GQA with $8$ heads in $8$ global layers and a sliding window of $4096$ in the other $24$. Discuss what each design gives up.
::: solution
(a) $2\cdot32\cdot32\cdot128\cdot2 = 524{,}288$ bytes per token, $128{,}000$ tokens: $6.7\times10^{10}$ bytes $\approx62.5$ GiB. (b) A quarter: $\approx15.6$ GiB. (c) The global layers cache all tokens, $8$ layers $\cdot2\cdot8\cdot128\cdot2 = 32{,}768$ bytes per token, $\approx3.9$ GiB; the window layers cache only $4096$ tokens each, $24\cdot2\cdot8\cdot128\cdot2\cdot4096\approx0.4$ GiB; total $\approx4.3$ GiB. Design (a) keeps every head's own view of the past but is impractical to serve; (b) loses a little quality from shared keys and values; (c) also gives up exact long-range access in three quarters of the layers, relying on the eight global layers for retrieval across the whole context — usually a good trade for long chats, but one that must be checked with long-context evaluations.
:::
:::

::: exercise Random features for the softmax kernel {level=3}
Let $\mathbf{w}\sim\mathcal{N}(\mathbf{0}, I_d)$ and define $\phi_{\mathbf{w}}(\mathbf{x}) = \exp\big(\mathbf{w}\cdot\mathbf{x} - \tfrac12\lVert\mathbf{x}\rVert^2\big)$. Show that $\E_{\mathbf{w}}\big[\phi_{\mathbf{w}}(\mathbf{q})\,\phi_{\mathbf{w}}(\mathbf{k})\big] = \exp(\mathbf{q}\cdot\mathbf{k})$. Explain how averaging over $r$ random vectors $\mathbf{w}$ gives a feature map for linear attention that approximates softmax attention, and why it uses positive features. (Use $\E[e^{\mathbf{w}\cdot\mathbf{u}}] = e^{\lVert\mathbf{u}\rVert^2/2}$ for a standard normal $\mathbf{w}$.)
::: solution
$\phi_{\mathbf{w}}(\mathbf{q})\phi_{\mathbf{w}}(\mathbf{k}) = \exp\big(\mathbf{w}\cdot(\mathbf{q} + \mathbf{k}) - \tfrac12\lVert\mathbf{q}\rVert^2 - \tfrac12\lVert\mathbf{k}\rVert^2\big)$. Taking expectations, $\E[e^{\mathbf{w}\cdot(\mathbf{q}+\mathbf{k})}] = e^{\lVert\mathbf{q} + \mathbf{k}\rVert^2/2}$, and $\tfrac12\lVert\mathbf{q} + \mathbf{k}\rVert^2 - \tfrac12\lVert\mathbf{q}\rVert^2 - \tfrac12\lVert\mathbf{k}\rVert^2 = \mathbf{q}\cdot\mathbf{k}$. So the expectation is $\exp(\mathbf{q}\cdot\mathbf{k})$. With $r$ independent samples $\mathbf{w}_1, \dots, \mathbf{w}_r$, the vector $\phi(\mathbf{x}) = r^{-1/2}\big(\phi_{\mathbf{w}_1}(\mathbf{x}), \dots, \phi_{\mathbf{w}_r}(\mathbf{x})\big)$ satisfies $\phi(\mathbf{q})\cdot\phi(\mathbf{k})\approx\exp(\mathbf{q}\cdot\mathbf{k})$, the unnormalised softmax weight (with $\mathbf{q}$, $\mathbf{k}$ scaled by $d_k^{-1/4}$ to include the $1/\sqrt{d_k}$). Positive features keep every estimated weight positive, so the normaliser in [[#def-linear]] cannot be near zero or negative; features built from sines and cosines, which can be negative, make the estimate unstable. A numerical check with $200{,}000$ samples gave $1.2256$ against the exact $1.2273$ for a random pair.
:::
:::
