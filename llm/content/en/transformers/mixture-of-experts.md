A Transformer applies every one of its parameters to every token: the word *the* passes through the same feed-forward weights as a line of Python or a Chinese idiom. A **mixture of experts** (MoE) breaks this link. It replaces the feed-forward network of a block with many alternative networks — the **experts** — and a small **router** that sends each token to only a few of them. The model then has the parameters of a large network but spends the computation of a small one on each token. Mixtral 8×7B, for example, holds about $47$ billion parameters but uses about $13$ billion per token; DeepSeek-V3 holds $671$ billion and uses $37$ billion.

This conditional computation is not free. Experts must all be stored in memory, tokens must be moved between devices to reach their experts, and a router left to itself sends most tokens to a few favourite experts while the rest learn nothing. This chapter defines the MoE layer, counts its parameters and FLOPs, and explains the load-balancing losses and capacity limits that make it trainable.

## Sparse expert layers {#sec-layer}

An MoE layer takes the place of the feed-forward network in some or all Transformer blocks; attention is unchanged.

::: definition Mixture-of-experts layer with top-$k$ routing {#def-moe}
Let $E_1, \dots, E_N$ be $N$ expert networks $\R^d\to\R^d$ (usually feed-forward networks of the kind in [[transformers/transformer-block#def-ffn]]), and $W_r\in\R^{d\times N}$ the router's weights. For a token with representation $\mathbf{x}$, let $\mathbf{z} = \mathbf{x}W_r$ be its router logits and $\mathcal{T}\subset\{1, \dots, N\}$ the indices of its $k$ largest logits. The **MoE layer** outputs

$$
\operatorname{MoE}(\mathbf{x}) = \sum_{i\in\mathcal{T}} g_i(\mathbf{x})\,E_i(\mathbf{x}), \qquad g_i(\mathbf{x}) = \frac{e^{z_i}}{\sum_{j\in\mathcal{T}}e^{z_j}},
$$

so the gate weights are a softmax over the selected experts only. Only the $k$ selected experts are evaluated.
:::

Variants differ in details: some models compute the softmax over all $N$ logits and keep the top $k$ values without renormalising, and some add one or more **shared experts** that every token uses in addition to its routed ones. The essential features are the same — a learned, token-dependent choice of a few experts, and a weighted sum of their outputs.

The router is trained by the same gradient descent as everything else, through the gate weights $g_i$: an expert that helps a token's loss receives a larger logit for similar tokens next time. The choice of *which* experts to evaluate is discrete and has no gradient, but the weights given to the chosen ones do.

::: example Routing one token {#ex-router}
A layer has $N = 4$ experts and top-$2$ routing. A token's router logits are $\mathbf{z} = (2.0, 1.0, 0.5, -1.0)$, and the selected experts output, along one coordinate, $E_1(\mathbf{x}) = 1$ and $E_2(\mathbf{x}) = 3$. Compute the gate weights and the output. What would the weights be if the softmax were taken over all four logits without renormalising?
::: solution
The two largest logits are $z_1 = 2$ and $z_2 = 1$, so $\mathcal{T} = \{1, 2\}$ and

$$
g_1 = \frac{e^2}{e^2 + e^1} = \frac{1}{1 + e^{-1}} = 0.731, \qquad g_2 = 0.269.
$$

The output is $0.731\cdot1 + 0.269\cdot3 = 1.538$. Experts $3$ and $4$ are never evaluated. Over all four logits the softmax is $(0.610, 0.224, 0.136, 0.030)$; keeping the top two without renormalising gives weights $0.610$ and $0.224$, which sum to $0.834$, so the output would be scaled down by the weight lost to unselected experts. Renormalising, as Mixtral does, keeps the output on the same scale as a single dense network.
:::
:::

::: widget graph
nodes: t1@0,0; t2@0,1; t3@0,2; t4@0,3; E1@3,-0.3; E2@3,0.9; E3@3,2.1; E4@3,3.3
edges: t1>E1; t1>E2; t2>E2; t2>E4; t3>E1; t3>E3; t4>E2; t4>E3
caption: Top-$2$ routing of four tokens among four experts: each token is sent to the two experts with the largest router logits. Expert $E_2$ receives three tokens and $E_4$ only one — an imbalance that, left unchecked, tends to grow during training. The tokens' outputs are recombined in their original order after the experts have run.
:::

## Parameters versus computation {#sec-count}

The appeal of MoE is that parameters and computation come apart.

::: proposition Active parameters {#prop-active}
In a model whose feed-forward networks are replaced by MoE layers with $N$ experts of $P_e$ parameters each and top-$k$ routing, the expert parameters stored per layer are $NP_e$, while the expert parameters applied to each token are $kP_e$. The forward FLOPs per token depend on $k$, not on $N$.
:::

::: proof
All $N$ experts must be stored, since any token may be routed to any of them. A given token is processed by exactly $k$ experts, each costing about $2P_e$ FLOPs (two per weight), plus the router's $2dN$, which is small. Increasing $N$ with $k$ fixed adds stored parameters but not per-token FLOPs, apart from the router.
:::

::: example Mixtral 8×7B, counted {#ex-mixtral}
Mixtral 8×7B has $L = 32$ layers with $d = 4096$, attention with $32$ query heads and $8$ key–value heads of dimension $128$, and in every layer $8$ SwiGLU experts with $d_{\text{ff}} = 14{,}336$ and top-$2$ routing; its vocabulary has $32{,}000$ tokens, with separate input and output embeddings. Count its total and its active parameters.
::: solution
Per layer: attention $2\cdot4096^2 + 2\cdot4096\cdot1024 = 41{,}943{,}040$; each expert $3\cdot4096\cdot14{,}336 = 176{,}160{,}768$, so eight experts $1{,}409{,}286{,}144$; router $4096\cdot8 = 32{,}768$; two RMSNorm gains $8192$. Total per layer $1{,}451{,}270{,}144$, and for $32$ layers $46{,}440{,}644{,}608$. Adding the embeddings, $2\cdot32{,}000\cdot4096 = 262{,}144{,}000$, and the final norm, $4096$, gives $46{,}702{,}792{,}704$ — the "47B" of the Mixtral paper.

Active per token: the same, but with two experts per layer instead of eight: $32\cdot(41{,}943{,}040 + 2\cdot176{,}160{,}768 + 32{,}768 + 8192) + 262{,}144{,}000 + 4096 = 12{,}879{,}925{,}248$, the "13B". Each token is processed by about $28\%$ of the model.
:::
:::

::: warning "8×7B" is not 56 billion
The name Mixtral 8×7B suggests eight copies of a 7-billion-parameter model, $56$ billion parameters. Only the feed-forward networks are replicated: attention, embeddings and normalisation are shared by all experts, which is why the total is $46.7$ billion. Likewise, an MoE model with "$13$B active parameters" does not fit in the memory of a 13B dense model — all $47$B must be loaded, because any token may need any expert. MoE saves computation per token, not memory.
:::

So, at equal computation per token, an MoE model can have many times the parameters of a dense model. Empirically this buys quality: the Switch Transformer reached the quality of its dense T5 baseline several times faster in pretraining, and Mixtral matched or exceeded Llama 2 70B on most of the benchmarks its authors reported while using about a fifth of the active parameters. The cost moves elsewhere — into memory, communication and the difficulty of training.

## Load balancing {#sec-balance}

A freshly initialised router has a self-reinforcing failure mode. Experts that happen to receive more tokens early on improve faster, which makes the router prefer them further, until a few experts process almost everything and the rest are wasted. Two mechanisms counter this.

The first is an auxiliary loss that rewards balanced routing.

::: definition Load-balancing loss {#def-aux-loss}
For a batch of $B$ tokens routed among $N$ experts, let $f_i$ be the fraction of tokens dispatched to expert $i$ (for top-$k$ routing, the fraction of the $kB$ assignments) and $P_i$ the mean router probability of expert $i$ over the batch, $P_i = \frac1B\sum_{\text{tokens}}\operatorname{softmax}(\mathbf{z})_i$. The **load-balancing loss** of the Switch Transformer is

$$
\mathcal{L}_{\text{aux}} = \alpha\,N\sum_{i=1}^{N} f_i\,P_i,
$$

added to the language-modelling loss with a small weight such as $\alpha = 0.01$.
:::

The fractions $f_i$ come from discrete choices and have no gradient; the loss trains the router through the probabilities $P_i$, lowering the probability of experts that are already receiving many tokens. Why this form?

::: proposition Balance minimises the loss {#prop-balance}
If the dispatch fractions equal the mean probabilities, $f_i = P_i$ for all $i$, then $\mathcal{L}_{\text{aux}} = \alpha N\sum_if_i^2\ge\alpha$, with equality exactly when the routing is uniform, $f_i = 1/N$ for every $i$.
:::

::: proof
With $f_i = P_i$, the loss is $\alpha N\sum_if_i^2$. By the Cauchy–Schwarz inequality, $1 = \big(\sum_i f_i\cdot1\big)^2\le\big(\sum_if_i^2\big)\big(\sum_i1^2\big) = N\sum_if_i^2$, so $N\sum_if_i^2\ge1$, with equality if and only if $(f_1, \dots, f_N)$ is proportional to $(1, \dots, 1)$, that is, every $f_i = 1/N$.
:::

::: widget plot
f: 2*(x^2 + (1 - x)^2)
x: 0, 1
y: 0.9, 2.1
points: 0.5, 1
caption: The load-balancing loss (with $\alpha = 1$) for two experts, when a fraction $x$ of the tokens goes to expert 1 and its mean router probability is also $x$. The loss is smallest, $1$, for an even split, and grows to $2$ when one expert takes everything.
:::

::: example An auxiliary loss {#ex-aux}
A batch is routed among $N = 4$ experts with dispatch fractions $\mathbf{f} = (0.4, 0.3, 0.2, 0.1)$ and mean router probabilities $\mathbf{P} = (0.35, 0.3, 0.2, 0.15)$. Compute $\mathcal{L}_{\text{aux}}/\alpha$ and compare with balanced routing.
::: solution
$\sum_if_iP_i = 0.14 + 0.09 + 0.04 + 0.015 = 0.285$, so $\mathcal{L}_{\text{aux}}/\alpha = 4\cdot0.285 = 1.14$. Balanced routing gives $4\cdot4\cdot\tfrac14\cdot\tfrac14 = 1$. The gradient with respect to $P_1$ is proportional to $f_1 = 0.4$, the largest, so the loss pushes the router to lower expert 1's probabilities most.
:::
:::

The second mechanism is a hard limit. On parallel hardware, each expert processes a fixed-size buffer of tokens per batch.

::: definition Expert capacity {#def-capacity}
With $B$ tokens per batch, $N$ experts, top-$k$ routing and a **capacity factor** $c\ge1$, each expert accepts at most

$$
C = c\cdot\frac{kB}{N}
$$

token assignments per batch. Assignments beyond the capacity are **dropped**: the token skips that expert and continues through the residual connection.
:::

A capacity factor slightly above $1$ (the Switch Transformer used $1$ to $1.25$) leaves room for imbalance; dropping tokens is wasteful but keeps every expert's work, and hence the step time, bounded.

::: example Capacity and dropped tokens {#ex-capacity}
A layer with $N = 8$ experts and top-$2$ routing processes batches of $B = 4096$ tokens with capacity factor $c = 1.25$. What is each expert's capacity? If $1500$ assignments go to one expert, how many are dropped?
::: solution
$C = 1.25\cdot2\cdot4096/8 = 1280$. An expert that receives $1500$ assignments processes $1280$ and drops $220$; those tokens get only the output of their other expert (and their residual stream). With perfect balance each expert would receive $1024$ assignments, well within capacity.
:::
:::

More recent models refine both mechanisms. ST-MoE (Zoph et al., 2022) added a **router z-loss**, which penalises large router logits,

$$
\mathcal{L}_z = \frac1B\sum_{\text{tokens}}\Big(\log\sum_{j=1}^{N}e^{z_j}\Big)^2,
$$

with a small weight; keeping the logits small keeps the router's softmax out of the range where rounding errors in low precision become large, and it markedly improved training stability. *Expert-choice* routing (Zhou et al., 2022) inverts the selection: each expert picks its top tokens, which balances load by construction. DeepSeek-V3 (2024) balanced its $256$ fine-grained experts mostly without an auxiliary loss, by adding to each expert's logit a bias that is raised when the expert is under-used and lowered when it is overloaded; the bias affects only which experts are selected, not the gate weights.

::: quiz
Which statements about a trained MoE model with $8$ experts and top-$2$ routing are true? (Select all that apply.)
- [x] All eight experts must be held in memory during inference
- [x] Its per-token FLOPs in the expert layers are about those of a dense model with two experts' worth of feed-forward parameters
- [ ] Each expert specialises in a recognisable topic, such as mathematics or biology
- [ ] Doubling the number of experts doubles the per-token FLOPs
::: solution
Any token may be routed to any expert, so all must be stored; per-token computation depends on $k = 2$, not on $N$ ([[#prop-active]]), so doubling $N$ adds parameters and router cost but not expert FLOPs. Studies of trained models, including the Mixtral paper, found that routing often follows surface features — syntax, token types, position — rather than clean topics; experts are not human-readable specialists by design.
:::
:::

What do experts learn, then? In their routing analysis, the Mixtral authors found no obvious assignment of experts by subject — text about biology, philosophy and mathematics used much the same experts — but clear syntactic patterns: the word *self* in Python and indentation in code were consistently sent to particular experts, and consecutive tokens were often routed alike. Specialisation emerges, but along lines that suit the model rather than a librarian.

## Systems and trade-offs {#sec-systems}

Large MoE models are trained with **expert parallelism** ([[scaling/model-parallelism]]): different experts live on different devices, and each MoE layer performs an *all-to-all* exchange that sends every token's representation to the devices holding its experts and brings the results back. This communication, absent in dense models, is often the bottleneck, and it grows with $k$ and with $d$. Inference has the mirror-image problem: all experts must be resident in memory even though each token uses few of them, so MoE models are memory-hungry to serve, and batches must be large enough to keep every expert busy.

Where to place the MoE layers is itself a design choice. GShard and the Switch Transformer replaced every other feed-forward network with an MoE layer, Mixtral replaces all of them, and DeepSeek-V3 keeps its first three layers dense, where token representations are still close to the raw embeddings. At inference, routing varies from token to token, so a batch of $B$ tokens touches up to $\min(N, kB)$ different experts in each layer. With small batches, many experts' weights are read from memory to process only a token or two each — the memory-bound regime of [[transformers/attention-complexity#def-roofline]] — so MoE models are most economical when serving many requests at once, and on machines with little GPU memory the idle experts are often kept in slower memory and loaded on demand.

Two design trends stand out. **Fine-grained experts** split each expert into several smaller ones and route each token to proportionally more of them, keeping FLOPs fixed while vastly increasing the number of possible expert combinations; DeepSeekMoE (Dai et al., 2024) combined this with **shared experts** that every token uses, to hold common knowledge that routed experts need not duplicate. And as models grew, the fraction of active parameters fell: DeepSeek-V3 activates $37$ of its $671$ billion parameters, about $5.5\%$, compared with Mixtral's $28\%$.

::: history
Jacobs, Jordan, Nowlan and Hinton (1991) introduced adaptive mixtures of local experts, in which a gating network learns to assign each input to one of several networks, and Jordan and Jacobs (1994) made the mixtures hierarchical. Shazeer et al. (2017) revived the idea at scale with the *sparsely gated* mixture-of-experts layer, using noisy top-$k$ gating between recurrent layers to train language models with up to $137$ billion parameters. GShard (Lepikhin et al., 2020) brought top-$2$ experts to Transformers for a $600$-billion-parameter translation model, and the Switch Transformer (Fedus, Zoph and Shazeer, 2021) simplified routing to a single expert and passed a trillion parameters. GLaM (Du et al., 2021) and ST-MoE (Zoph et al., 2022) improved quality and stability, and Zhou et al. (2022) proposed expert-choice routing. Mixtral 8×7B (Jiang et al., 2024) made a strong open MoE model widely available, and DeepSeekMoE (Dai et al., 2024) and DeepSeek-V3 (2024) developed fine-grained and shared experts and auxiliary-loss-free balancing.
:::

::: summary
- An MoE layer replaces a feed-forward network with $N$ experts and a router; each token is processed by its top $k$ experts, weighted by a softmax over their logits.
- Stored parameters grow with $N$, per-token FLOPs with $k$: Mixtral 8×7B stores $46.7$B parameters but applies $12.9$B per token.
- Without help, routing collapses onto a few experts. A load-balancing loss $\alpha N\sum_if_iP_i$, minimal under uniform routing, and a per-expert capacity $C = ckB/N$ with token dropping keep the load even and the step time bounded.
- Refinements include the router z-loss, expert-choice routing, fine-grained and shared experts, and bias-based balancing without an auxiliary loss.
- MoE trades computation for memory and communication: all experts must be stored, and expert parallelism requires all-to-all exchanges between devices.
:::

## Exercises

::: exercise Stored and used {level=1 check="1/4"}
An MoE layer has $8$ experts of equal size and top-$2$ routing. What fraction of the layer's expert parameters is applied to each token?
::: solution
$k/N = 2/8 = 1/4$. (Across the whole of Mixtral, with attention and embeddings counted as well, the fraction is about $28\%$.)
:::
:::

::: exercise Two gates {level=1 check="exp(1)/(exp(1)+1)"}
A token's two largest router logits are $1.5$ and $0.5$. With top-$2$ routing and the renormalised softmax of [[#def-moe]], what weight does the first expert receive?
::: solution
$e^{1.5}/(e^{1.5} + e^{0.5}) = 1/(1 + e^{-1}) = e/(e + 1)\approx0.731$. Only the difference of the two logits matters.
:::
:::

::: exercise A capacity {level=1 check="1280"}
Compute the expert capacity of [[#ex-capacity]]: $8$ experts, top-$2$, $4096$ tokens per batch, capacity factor $1.25$.
::: solution
$C = 1.25\cdot2\cdot4096/8 = 1280$ assignments per expert.
:::
:::

::: exercise The balanced value {level=1 check="1"}
What is $\mathcal{L}_{\text{aux}}/\alpha$ when $N = 16$ experts each receive exactly $1/16$ of the assignments and have mean router probability $1/16$?
::: solution
$16\cdot16\cdot\tfrac1{16}\cdot\tfrac1{16} = 1$, the minimum of [[#prop-balance]], whatever $N$ is.
:::
:::

::: exercise Mixtral's total {level=2 check="46702792704"}
Reproduce the total parameter count of [[#ex-mixtral]]. What would it be if Mixtral used full multi-head attention ($32$ key–value heads) instead of $8$?
::: solution
As in the example, $46{,}702{,}792{,}704$. Full multi-head attention would make $W_K$ and $W_V$ $4096\times4096$ instead of $4096\times1024$, adding $2\cdot4096\cdot3072 = 25{,}165{,}824$ per layer, $805{,}306{,}368$ in total: about $47.5$ billion. The experts dominate either way.
:::
:::

::: exercise Mixtral's active parameters {level=2 check="12879925248"}
Reproduce the active parameter count of [[#ex-mixtral]] and estimate the forward FLOPs per token, using $2$ FLOPs per active non-embedding weight.
::: solution
$32\cdot(41{,}943{,}040 + 2\cdot176{,}160{,}768 + 32{,}768 + 8192) + 262{,}144{,}000 + 4096 = 12{,}879{,}925{,}248$. The input embedding is a table lookup, not a matrix product, so the per-token FLOPs come from the $32$ layers ($12{,}617{,}777{,}152$ weights) and the output layer ($131{,}072{,}000$): about $2\cdot1.275\times10^{10}\approx2.5\times10^{10}$ FLOPs, plus attention scores — comparable to a dense 13B model, for a model of 47B parameters.
:::
:::

::: exercise Proving balance {level=2}
Complete the proof of [[#prop-balance]] by showing directly, without Cauchy–Schwarz, that $\sum_{i=1}^Nf_i^2 - \frac1N = \sum_{i=1}^N\big(f_i - \frac1N\big)^2$ when $\sum_if_i = 1$. What does this identity say about how the loss grows with imbalance?
::: solution
$\sum_i(f_i - \tfrac1N)^2 = \sum_if_i^2 - \tfrac2N\sum_if_i + N\cdot\tfrac1{N^2} = \sum_if_i^2 - \tfrac2N + \tfrac1N = \sum_if_i^2 - \tfrac1N$. Hence $\mathcal{L}_{\text{aux}}/\alpha = N\sum_if_i^2 = 1 + N\sum_i(f_i - \tfrac1N)^2$: the loss exceeds its minimum by $N$ times the squared distance of the routing distribution from uniform, so small imbalances cost little and large ones a lot.
:::
:::

::: exercise What the gradient sees {level=2}
In $\mathcal{L}_{\text{aux}} = \alpha N\sum_if_iP_i$, the fractions $f_i$ are counts of discrete choices. Explain why no gradient flows through $f_i$, compute $\partial\mathcal{L}_{\text{aux}}/\partial P_i$, and describe how this changes the router logits of an over-used expert.
::: solution
$f_i$ is obtained by counting how many tokens selected expert $i$ in a top-$k$ operation; a small change of the logits leaves the counts unchanged (or changes them by a jump), so its derivative is zero almost everywhere and is treated as a constant. Then $\partial\mathcal{L}_{\text{aux}}/\partial P_i = \alpha Nf_i$. Gradient descent lowers $P_i$ in proportion to $f_i$: the most over-used experts get the strongest push to lower probabilities, which, through the softmax, lowers their logits for the tokens in the batch and makes them less likely to be selected next time.
:::
:::

::: exercise Communication cost {level=3 check="32768"}
With expert parallelism, each token's $d$-dimensional representation is sent to the devices holding its $k$ experts and the $k$ results are sent back. For $d = 4096$, $k = 2$ and bfloat16, how many bytes per token and per MoE layer cross the network in the worst case (every expert on another device)? For a batch of $10^6$ tokens and $32$ layers, how many terabytes is that per forward pass?
::: solution
Out: $k\cdot d\cdot2 = 16{,}384$ bytes; back: the same; total $32{,}768$ bytes per token and layer. For $10^6$ tokens and $32$ layers: $32{,}768\cdot10^6\cdot32\approx1.05\times10^{12}$ bytes, about $1$ TB per forward pass, and about twice as much again in the backward pass. This is why MoE training needs fast interconnects and why systems try to place experts so that much of the traffic stays within a node.
:::
:::

::: exercise A routed layer in code {level=3}
Implement an MoE layer with $N = 4$ small SiLU experts and top-$2$ routing in PyTorch that, for each expert, gathers the tokens routed to it, runs the expert once on that batch, and scatters the weighted outputs back. Check it against a slow loop that, for each token, sums $g_i(\mathbf{x})E_i(\mathbf{x})$ over its two experts.
::: solution
```python
import torch, torch.nn as nn

torch.manual_seed(0)
B, d, N, k, hidden = 5, 8, 4, 2, 16
x = torch.randn(B, d)                                   # (B, d): five tokens
W_r = torch.randn(d, N)                                 # router weights
experts = [nn.Sequential(nn.Linear(d, hidden), nn.SiLU(), nn.Linear(hidden, d)) for _ in range(N)]

top, idx = (x @ W_r).topk(k, dim=-1)                    # (B, k) logits and expert indices
g = top.softmax(dim=-1)                                 # (B, k) renormalised gates
y = torch.zeros_like(x)
for e in range(N):                                      # one batched call per expert
    rows, slot = (idx == e).nonzero(as_tuple=True)      # tokens routed to expert e, and in which slot
    if len(rows):
        y[rows] += g[rows, slot, None] * experts[e](x[rows])

slow = torch.stack([sum(g[b, s] * experts[int(idx[b, s])](x[b]) for s in range(k)) for b in range(B)])
print(torch.allclose(y, slow, atol=1e-6))               # True
```

The batched version is what real implementations do (with capacity limits and, across devices, all-to-all communication): each expert sees one dense batch of its tokens, which keeps the matrix products efficient.
:::
:::

::: exercise Fine-grained experts {level=3 check="488526937079580"}
A layer has $8$ experts with top-$2$ routing. Splitting each expert into $8$ smaller ones (each an eighth of the size) and routing each token to $16$ of the resulting $64$ keeps the parameters and the FLOPs per token unchanged. How many different expert combinations can a token choose before and after the split? Why might more combinations help?
::: solution
Before: $\binom82 = 28$ combinations. After: $\binom{64}{16} = 488{,}526{,}937{,}079{,}580$, about $4.9\times10^{14}$. Each expert's parameters and the active fraction are unchanged ($16$ eighth-size experts equal $2$ full-size ones), but the router can now assemble a far more specific mixture for each token, so knowledge can be split more finely across experts with less duplication. This was the motivation of DeepSeekMoE's fine-grained experts, which add shared experts so that common knowledge is not replicated in every combination.
:::
:::
