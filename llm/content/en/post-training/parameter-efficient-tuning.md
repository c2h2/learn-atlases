Full fine-tuning updates every parameter of a model. For a model with billions of parameters this is expensive twice over. Training needs memory for gradients and optimiser states as well as weights — about $16$ bytes per parameter with mixed-precision Adam, so more than $100$ GB for a $7$-billion-parameter model before any activations. And every fine-tuned version is a full copy of the model: a hundred customers with a hundred fine-tunes need a hundred copies. **Parameter-efficient fine-tuning** (PEFT) freezes the pretrained weights and trains a small number of new or selected parameters instead, typically well under $1\%$ of the total, while matching full fine-tuning on many tasks.

This chapter covers the main families: **adapters** inserted between layers; **prefix and prompt tuning**, which learn continuous inputs; methods that tune a selected subset such as biases or scaling vectors; and **LoRA**, which learns a low-rank update to each weight matrix, introduced in [[math-for-ml/matrix-decompositions#def-lora]]. It derives the LoRA gradients and what the first steps of training do, counts parameters for a realistic model, and explains **QLoRA**, which combines LoRA with a $4$-bit **NormalFloat** quantisation of the frozen weights so that large models can be fine-tuned on a single accelerator. PEFT is used for instruction tuning ([[post-training/instruction-tuning]]) and preference optimisation alike; the quantisation it relies on is treated in depth in [[inference/quantisation]].

## The cost of full fine-tuning {#sec-cost}

::: definition Parameter-efficient fine-tuning {#def-peft}
Let $\theta_0\in\R^N$ be the parameters of a pretrained model. A **parameter-efficient fine-tuning** method chooses a parametrisation $\theta = g(\theta_0, \phi)$ with **trainable** parameters $\phi\in\R^M$, $M\ll N$, and $g(\theta_0, \phi_0) = \theta_0$ (or a function with the same outputs) at initialisation, and minimises the task loss over $\phi$ with $\theta_0$ frozen. Only $\phi$ needs gradients and optimiser states, and only $\phi$ is stored per task.
:::

::: example Memory for full fine-tuning and for PEFT {#ex-memory}
Estimate the memory for model states when fine-tuning a $6.74$-billion-parameter model (the size of Llama 2 7B) with mixed-precision Adam: (a) fully; (b) with $40$ million trainable parameters and the base frozen in bf16; (c) as in (b) but with the base stored in $4$ bits. Ignore activations.
::: solution
(a) $16$ bytes per parameter ([[neural-networks/training-practice#ex-memory]]): $6.74\times10^9\cdot16 = 108$ GB. (b) Frozen base at $2$ bytes: $13.5$ GB; trainable: $4\times10^7\cdot16 = 0.64$ GB; total about $14.1$ GB. (c) Base at about $4.13$ bits per parameter including quantisation constants (see [[#sec-qlora]]): $6.74\times10^9\cdot4.13/8 = 3.5$ GB; plus $0.64$ GB: about $4.1$ GB. The trainable parameters are now a small part of the memory; activations, which PEFT does not reduce, often dominate.
:::
:::

::: widget plot
f: 16*x; 2*x + 0.1*x; 0.516*x + 0.1*x
x: 0, 80
y: 0, 200
hlines: 80
labels: full fine-tuning (16 bytes per parameter); LoRA, bf16 base; QLoRA, 4-bit base
caption: Memory for model states (GB, excluding activations) against model size in billions of parameters, assuming LoRA adapters with about $0.6\%$ as many parameters as the base, trained with Adam at $16$ bytes each. The horizontal line is $80$ GB, a common accelerator memory. Full fine-tuning exceeds it at about $5$ billion parameters; LoRA on a bf16 base at about $38$ billion; QLoRA at well over $100$ billion — which is how Dettmers et al. fine-tuned a $65$-billion-parameter model on a single $48$ GB device.
:::

## Adapters {#sec-adapters}

The first PEFT method for Transformers added small networks inside each layer.

::: definition Bottleneck adapter (Houlsby et al., 2019) {#def-adapter}
An **adapter** with bottleneck width $m\ll d$ maps a hidden vector $\mathbf{h}\in\R^d$ to

$$
\mathbf{h} + W_{\text{up}}\,f\big(W_{\text{down}}\mathbf{h} + \mathbf{b}_{\text{down}}\big) + \mathbf{b}_{\text{up}},\qquad W_{\text{down}}\in\R^{m\times d},\ W_{\text{up}}\in\R^{d\times m},
$$

with a non-linearity $f$. Houlsby et al. inserted two adapters per Transformer layer, after the attention and after the feed-forward sublayer, initialised close to the identity map, and trained the adapters and the layer norms. Each adapter has $2md + m + d$ parameters.
:::

On the GLUE benchmark Houlsby et al. reported results within $0.4\%$ of full fine-tuning of BERT while adding $3.6\%$ of the parameters per task. Because the adapter is a residual branch initialised near zero, the network starts as the pretrained model, and since the base is frozen, many tasks can share it, each with its own adapters. The drawback is at inference time: adapters are extra sequential computations in every layer and add latency, which matters for generation at small batch sizes. Later variants placed adapters in parallel with sublayers rather than in series (He et al., 2022, who also showed that several PEFT methods can be written in one common form).

## Prefix and prompt tuning {#sec-prompts}

A pretrained model can be steered by its input, as prompting shows ([[prompting-rag/prompt-design]]). Prompt-based PEFT methods optimise the input directly — not as discrete tokens but as continuous vectors.

::: definition Prompt tuning and prefix tuning {#def-prompt-tuning}
**Prompt tuning** (Lester et al., 2021) prepends $p$ trainable vectors $P\in\R^{p\times d}$, a **soft prompt**, to the token embeddings of every input; only $P$ is trained ($pd$ parameters). **Prefix tuning** (Li and Liang, 2021) instead prepends trainable key and value vectors to the attention of **every** layer: in layer $\ell$, the keys and values attended over are $[P_K^{(\ell)}; K]$ and $[P_V^{(\ell)}; V]$ with $P_K^{(\ell)}, P_V^{(\ell)}\in\R^{p\times d}$, giving $2pdL$ parameters for $L$ layers. Li and Liang reparametrised the prefixes through a small MLP during training for stability and kept only the resulting vectors.
:::

Prefix tuning acts on every layer and so has more influence than a soft prompt at the input. Li and Liang reported results comparable to full fine-tuning for table-to-text generation and summarisation while training about $0.1\%$ of the parameters, and better results in low-data settings. Lester et al. found that prompt tuning on T5 was well below full fine-tuning for small models but closed the gap as the model grew to around $10$ billion parameters — the larger the model, the more a few input vectors can steer it. Deep prompt tuning across layers (P-tuning v2, Liu et al., 2022) made the approach competitive at smaller scales. The cost of both is context: the $p$ prefix positions occupy attention at every step.

::: example Counting prompt parameters {#ex-prompt}
For a model with $d = 4096$ and $L = 32$ layers, count the trainable parameters of prompt tuning with $p = 20$ and of prefix tuning with $p = 20$.
::: solution
Prompt tuning: $pd = 20\cdot4096 = 81{,}920$ parameters — about $0.001\%$ of a $6.7$-billion-parameter model. Prefix tuning: $2pdL = 2\cdot20\cdot4096\cdot32 = 5{,}242{,}880$, about $0.08\%$. Prefix tuning has $64$ times as many parameters, all of them acting directly inside the attention of every layer.
:::
:::

**Selective** methods tune a small, chosen subset instead of adding anything. **BitFit** (Ben Zaken et al., 2022) trains only the bias terms, a fraction of a per cent of BERT's parameters, and was competitive on small to medium datasets. **(IA)³** (Liu et al., 2022) learns vectors that rescale the keys, values and feed-forward activations elementwise — $d$ numbers per rescaled activation per layer — and reported strong few-shot results with very few parameters.

## LoRA {#sec-lora}

Low-rank adaptation (Hu et al., ICLR 2022) learns, for each chosen weight matrix $W_0\in\R^{d_{\text{out}}\times d_{\text{in}}}$, an update of rank at most $r$:

$$
W = W_0 + sBA,\qquad B\in\R^{d_{\text{out}}\times r},\ A\in\R^{r\times d_{\text{in}}},\ s = \frac{\alpha}{r},
$$ {#eq-lora}

with $A$ initialised randomly (for example Gaussian) and $B$ initialised to zero, so that $W = W_0$ at the start ([[math-for-ml/matrix-decompositions#def-lora]]). The layer computes $W_0\mathbf{x} + s\,B(A\mathbf{x})$: the extra cost is two thin matrix products, $2r(d_{\text{in}} + d_{\text{out}})$ FLOPs per token instead of $2d_{\text{in}}d_{\text{out}}$.

::: proposition Parameter count and rank of a LoRA update {#prop-lora-count}
A LoRA adapter on one matrix has $r(d_{\text{in}} + d_{\text{out}})$ trainable parameters, a fraction $r\big(\frac{1}{d_{\text{in}}} + \frac{1}{d_{\text{out}}}\big)$ of the matrix, and its update $sBA$ has rank at most $r$. After training the update can be **merged**, $W = W_0 + sBA$, so the fine-tuned model has exactly the architecture and inference cost of the original.
:::

::: proof
$B$ and $A$ have $d_{\text{out}}r$ and $rd_{\text{in}}$ entries; divide by $d_{\text{in}}d_{\text{out}}$ for the fraction. The column space of $BA$ lies in that of $B$, which has at most $r$ columns, so $\rank(BA)\le r$. Merging is matrix addition, after which the layer is an ordinary linear map with weight $W$.
:::

Hu et al. applied LoRA to the attention projections of GPT-3 ($175$ billion parameters) and reported reducing the number of trainable parameters by a factor of about $10{,}000$ and the accelerator memory of training by about $3$ times compared with full fine-tuning with Adam, at comparable or better quality on the tasks studied; with rank $4$ on the query and value projections, a task checkpoint shrank from about $350$ GB to about $35$ MB. They found small ranks sufficient for those tasks and studied the learned updates, finding that $\Delta W$ amplified directions that were present but not emphasised in $W_0$.

::: example LoRA on a 7B-class model {#ex-lora-count}
For a decoder with $d = 4096$, $32$ layers and a SwiGLU feed-forward block of width $d_{\text{ff}} = 11{,}008$ (the dimensions of Llama 2 7B), count the trainable parameters of LoRA with rank $8$ on the query and value projections only, and with rank $16$ on all seven projection matrices of each layer.
::: solution
Query and value: each $4096\times4096$, so $8\cdot(4096 + 4096) = 65{,}536$ per matrix, $2\cdot32\cdot65{,}536 = 4.19$ million in all — $0.062\%$ of $6.74$ billion. All seven matrices at rank $16$: four attention matrices at $16\cdot8192 = 131{,}072$ each, and three feed-forward matrices ($4096\times11008$ or its transpose) at $16\cdot(4096 + 11008) = 241{,}664$ each, per layer $4\cdot131{,}072 + 3\cdot241{,}664 = 1{,}249{,}280$, and $32$ times that is $39.98$ million — $0.59\%$. These are the numbers printed by the listing in [[#sec-code]].
:::
:::

### The LoRA gradients {#sec-lora-grad}

Training LoRA is ordinary backpropagation through [[#eq-lora]], but writing the gradients out shows how LoRA relates to full fine-tuning.

::: proposition Gradients of the LoRA factors {#prop-lora-grad}
Let $G = \partial\mathcal{L}/\partial W$ be the gradient of the loss with respect to the effective weight $W = W_0 + sBA$ (for one input $\mathbf{x}$ with output gradient $\boldsymbol\delta = \partial\mathcal{L}/\partial\mathbf{y}$, $G = \boldsymbol\delta\mathbf{x}^\top$; for a batch, the sum of these). Then

$$
\frac{\partial\mathcal{L}}{\partial B} = s\,G A^\top,\qquad \frac{\partial\mathcal{L}}{\partial A} = s\,B^\top G.
$$ {#eq-lora-grad}
:::

::: proof
A small change of the factors changes the weight by $dW = s(dB\,A + B\,dA)$. To first order $d\mathcal{L} = \tr(G^\top dW) = s\tr(G^\top dB\,A) + s\tr(G^\top B\,dA)$. By the cyclic property of the trace, $\tr(G^\top dB\,A) = \tr(AG^\top dB) = \tr\big((GA^\top)^\top dB\big)$ and $\tr(G^\top B\,dA) = \tr\big((B^\top G)^\top dA\big)$. Reading off the coefficients of $dB$ and $dA$ in the Frobenius inner product gives [[#eq-lora-grad]] ([[math-for-ml/gradients#prop-linear-grad]]).
:::

::: corollary The first step of LoRA {#cor-first-step}
At initialisation, $B = 0$, so $\partial\mathcal{L}/\partial A = 0$ and only $B$ moves. After one gradient-descent step with learning rate $\eta$, $B_1 = -\eta sGA^\top$, and the weight changes by

$$
\Delta W_1 = sB_1A = -\eta s^2\,G\,A^\top A.
$$

This is the full fine-tuning step $-\eta G$ with its input side restricted to the row space of $A$, an $r$-dimensional subspace of $\R^{d_{\text{in}}}$: for any input direction $\mathbf{u}$ orthogonal to the rows of $A$, $\Delta W_1\mathbf{u} = \mathbf{0}$. If the entries of $A$ are independent with mean $0$ and variance $\sigma^2$, then $\E[A^\top A] = r\sigma^2I$, so on average the step is a scaled copy of the full gradient step.
:::

::: proof
Substitute $B = 0$ into [[#eq-lora-grad]], then $B_1 = 0 - \eta sGA^\top$. For $\mathbf{u}$ orthogonal to the rows of $A$, $A\mathbf{u} = \mathbf{0}$, so $\Delta W_1\mathbf{u} = -\eta s^2GA^\top(A\mathbf{u}) = \mathbf{0}$. Finally $(A^\top A)_{jk} = \sum_{i=1}^{r}A_{ij}A_{ik}$ has expectation $r\sigma^2$ when $j = k$ and $0$ otherwise.
:::

So LoRA begins as gradient descent in a random low-dimensional subspace of input directions, and then, as $A$ also starts to receive gradients, adapts the subspace. The product structure also makes the effective learning rate depend on the scale $s$ and on the initialisation of $A$; the choice $s = \alpha/r$ was meant to make results less sensitive to $r$, and later work argued that $s = \alpha/\sqrt r$ (rsLoRA, Kalajdzievski, 2023) keeps updates stable as the rank grows, and that $A$ and $B$ benefit from different learning rates (LoRA+, Hayou et al., 2024).

If the update that full fine-tuning would make were known, the best LoRA approximation of it would be its truncated SVD.

::: proposition The best rank-$r$ update {#prop-best-rank}
For a target update $\Delta\in\R^{d_{\text{out}}\times d_{\text{in}}}$ with singular values $\sigma_1\ge\sigma_2\ge\dots$, the minimum of $\lVert\Delta - sBA\rVert_F$ over $B\in\R^{d_{\text{out}}\times r}$ and $A\in\R^{r\times d_{\text{in}}}$ is $\big(\sum_{i>r}\sigma_i^2\big)^{1/2}$, attained when $sBA$ is the truncated SVD $\Delta_r$.
:::

::: proof
The matrices $sBA$ are exactly the matrices of rank at most $r$ (any such matrix factors as $U_r(\Sigma_rV_r^\top)$, and $s$ can be absorbed into $B$). The Eckart–Young theorem ([[math-for-ml/matrix-decompositions#thm-eckart-young]]) gives the minimum over that set.
:::

The proposition explains when LoRA should work: when the updates that a task needs have rapidly decaying singular values. That is an empirical property of the task and the model, not a theorem. Biderman et al. (2024) compared LoRA with full fine-tuning on code and mathematics with large datasets and found that LoRA **learned less** — reaching lower target-domain performance than full fine-tuning — and **forgot less**, better preserving the base model's other abilities; they also found that the weight updates of full fine-tuning had a rank far higher than typical LoRA ranks. For adapting behaviour and format, as in much instruction tuning, low ranks are usually enough; for absorbing large amounts of new knowledge they may not be.

::: warning Merged and unmerged LoRA are the same model only in exact arithmetic
"Merging the adapter costs nothing" is true in exact arithmetic. In practice the frozen base is often stored in low precision (bf16, or $4$ bits with QLoRA), and adding a small update $sBA$ to a bf16 weight can be lost to rounding when the update is much smaller than the weight's spacing ([[neural-networks/training-practice#prop-swamping]]), while merging into a $4$-bit base requires re-quantising the sum, which changes it. If a merged model behaves differently from the adapter model it was evaluated as, compare their outputs on the same inputs before deploying, or serve the adapter unmerged.
:::

### Serving many adapters {#sec-serving}

Unmerged, one copy of the base model can serve many fine-tunes: each request carries the identifier of its adapter, and the server computes $W_0\mathbf{x}$ once for the batch and $sB_iA_i\mathbf{x}$ for each request's adapter. Systems such as S-LoRA (Sheng et al., 2024) batch requests for thousands of adapters this way. Variants modify the parametrisation: **DoRA** (Liu et al., 2024) decomposes each weight into a magnitude vector and a direction and applies LoRA to the direction; others share or prune ranks across layers. As of 2026 plain LoRA on all linear layers, with ranks of roughly $8$ to $64$, remains a common default.

## QLoRA {#sec-qlora}

LoRA removes the optimiser states of the base model, but its weights must still be stored, at $2$ bytes per parameter in bf16. **QLoRA** (Dettmers et al., 2023) stores the frozen base in $4$ bits, dequantises each weight block to bf16 on the fly for the matrix products, and backpropagates through the quantised base into LoRA adapters kept in bf16. Three ingredients made this work without losing quality.

**4-bit NormalFloat (NF4).** Pretrained weights are roughly normally distributed within a block. A uniform $4$-bit grid wastes levels in the sparse tails and has too few near zero, where most weights are. NF4 places its $16$ levels at **quantiles of the standard normal distribution**, so that each level is used about equally often by normally distributed data — the paper calls this information-theoretically optimal for normal weights.

::: definition NF4 data type {#def-nf4}
The **NF4** levels are obtained by taking $8$ equally spaced probabilities on the positive half and $7$ on the negative half of the standard normal distribution, mapping them through the inverse normal CDF $\Phi^{-1}$, adding an exact $0$, and normalising the $16$ values to $[-1, 1]$; probabilities near $0$ and $1$ are offset slightly so that the extreme quantiles are finite. A block of $64$ weights is stored as $16$ four-bit indices into this table and one **absmax** scale $c = \max_i\lvert w_i\rvert$; a weight is dequantised as $c\cdot q_{\text{index}}$.
:::

The asymmetry — one more positive level than negative — gives an exact representation of zero while using all $16$ codes. The levels, computed in the listing below, are denser near zero and sparser in the tails.

::: widget plot
f: exp(-x^2/2)/sqrt(2*pi)
x: -2.2, 2.2
y: 0, 0.45
points: -1.848,0.0723; -1.287,0.1743; -0.970,0.2491; -0.730,0.3057; -0.526,0.3475; -0.342,0.3763; -0.168,0.3933; 0.000,0.3989; 0.147,0.3946; 0.297,0.3817; 0.455,0.3597; 0.624,0.3283; 0.814,0.2863; 1.040,0.2324; 1.336,0.1634; 1.848,0.0723
labels: standard normal density
caption: The $16$ NF4 levels in standard-deviation units (dots, placed on the normal density): normalised NF4 levels times $\Phi^{-1}(0.9677) = 1.848$. They are quantiles of the normal distribution, so each interval between neighbouring levels holds a similar share of normally distributed weights — closely spaced near $0$, where weights are dense, and widely spaced in the tails. A uniform $4$-bit grid would have equal spacing.
:::

**Double quantisation.** With one $32$-bit scale per block of $64$ weights, the scales cost $32/64 = 0.5$ bits per parameter. QLoRA quantises the scales themselves to $8$ bits, in blocks of $256$ with one $32$-bit second-level scale each, reducing the overhead to $8/64 + 32/(64\cdot256) = 0.127$ bits per parameter.

**Paged optimisers.** Memory spikes during training with long sequences can exceed the device memory; QLoRA used unified memory to page optimiser states to CPU memory when needed.

With these, Dettmers et al. fine-tuned a $65$-billion-parameter model on a single $48$ GB accelerator, and reported that QLoRA with adapters on all linear layers matched $16$-bit full fine-tuning and $16$-bit LoRA on the benchmarks they tested; they noted that applying LoRA to all linear layers, not just attention, was needed to match full fine-tuning. Their Guanaco models, trained this way on a small, high-quality instruction dataset, were competitive with commercial chat systems of the time in their (model- and human-judged) evaluations.

::: example Storage of a 65B model in QLoRA {#ex-qlora}
Compute the memory of a $65$-billion-parameter base model in NF4 with double quantisation, and compare with bf16.
::: solution
Indices: $65\times10^9\cdot4/8 = 32.5$ GB. Quantisation constants: $65\times10^9\cdot0.127/8 = 1.03$ GB. Total about $33.5$ GB, against $130$ GB in bf16. Without double quantisation the constants would take $65\times10^9\cdot0.5/8 = 4.1$ GB. Adding adapters, their optimiser states and activations, the run fits in $48$ GB — but only just, which is what the paged optimiser is for.
:::
:::

## Counting and quantising in code {#sec-code}

The listing counts LoRA parameters for the 7B-class configuration of [[#ex-lora-count]], builds the NF4 table, and compares its error with a symmetric uniform $4$-bit grid when quantising normally distributed weights in blocks of $64$ with absmax scaling.

```python
import math, random
from statistics import NormalDist

# 1. LoRA parameter counts for a 7B-class decoder (the dimensions of Llama 2 7B)
d, L, d_ff, V = 4096, 32, 11008, 32000
attn = 4 * d * d                                  # W_q, W_k, W_v, W_o
mlp = 3 * d * d_ff                                # gate, up, down (SwiGLU)
total = L * (attn + mlp + 2 * d) + 2 * V * d + d  # + RMSNorm weights, embeddings, output layer
print(f"base parameters: {total / 1e9:.3f} B")

def lora_params(r, targets):
    shapes = {"q": (d, d), "k": (d, d), "v": (d, d), "o": (d, d),
              "gate": (d, d_ff), "up": (d, d_ff), "down": (d_ff, d)}
    return L * sum(r * (shapes[t][0] + shapes[t][1]) for t in targets)

for r, targets in [(8, ["q", "v"]), (8, ["q", "k", "v", "o"]),
                   (16, ["q", "k", "v", "o", "gate", "up", "down"]), (64, ["q", "k", "v", "o", "gate", "up", "down"])]:
    n = lora_params(r, targets)
    print(f"r = {r:3d} on {'+'.join(targets):24s} {n / 1e6:8.2f} M trainable = {100 * n / total:.3f}% of the base")

# 2. The NF4 grid: quantiles of N(0, 1), with an exact zero, normalised to [-1, 1]
N = NormalDist()
offset = 0.9677083                                # as in the reference implementation
pos = [N.inv_cdf(offset + (0.5 - offset) * i / 8) for i in range(8)]     # 8 positive levels
neg = [-N.inv_cdf(offset + (0.5 - offset) * i / 7) for i in range(7)]    # 7 negative levels
grid = sorted(pos + [0.0] + neg)
grid = [g / max(abs(x) for x in grid) for g in grid]
print("NF4 levels:", " ".join(f"{g:.4f}" for g in grid))
int4 = [i / 7 for i in range(-7, 8)] + [-1.0]     # symmetric 4-bit integer grid (absmax), 15 levels used
int4 = sorted(set(int4))

def quantise(block, levels):
    s = max(abs(w) for w in block)                # absmax scale of the block
    return [s * min(levels, key=lambda q: abs(w / s - q)) for w in block]

rng = random.Random(0)
weights = [rng.gauss(0, 0.02) for _ in range(64 * 2000)]   # normally distributed weights
for name, levels in (("int4 absmax", int4), ("NF4", grid)):
    err = 0.0
    for b in range(0, len(weights), 64):                   # blocks of 64, one scale each
        block = weights[b:b + 64]
        err += sum((w - q) ** 2 for w, q in zip(block, quantise(block, levels)))
    rmse = math.sqrt(err / len(weights))
    print(f"{name:12s} RMS error {rmse:.6f}  ({100 * rmse / 0.02:.1f}% of the weight s.d.)")
```

```text
base parameters: 6.738 B
r =   8 on q+v                          4.19 M trainable = 0.062% of the base
r =   8 on q+k+v+o                      8.39 M trainable = 0.124% of the base
r =  16 on q+k+v+o+gate+up+down        39.98 M trainable = 0.593% of the base
r =  64 on q+k+v+o+gate+up+down       159.91 M trainable = 2.373% of the base
NF4 levels: -1.0000 -0.6962 -0.5251 -0.3949 -0.2844 -0.1848 -0.0910 0.0000 0.0796 0.1609 0.2461 0.3379 0.4407 0.5626 0.7230 1.0000
int4 absmax  RMS error 0.002146  (10.7% of the weight s.d.)
NF4          RMS error 0.001830  (9.1% of the weight s.d.)
```

The base count, $6.738$ billion, matches the published size of Llama 2 7B. Even rank $64$ on every projection trains under $2.4\%$ of the parameters. On normally distributed weights NF4 has about $15\%$ lower RMS error than a uniform $4$-bit grid with the same block scaling — a modest but free gain, since both use $4$ bits. Real weight distributions have heavier tails and outliers, which is why block size and outlier handling matter as much as the grid ([[inference/quantisation]]).

::: quiz
Which statements about LoRA are correct?
- [x] At initialisation the adapted model computes exactly the same function as the base model.
- [x] After training, the update can be added into the weight so that inference costs nothing extra.
- [ ] During the first gradient step both $A$ and $B$ change.
- [ ] LoRA reduces the memory needed for activations as much as for optimiser states.
::: solution
$B = 0$ makes $W = W_0$ at the start, and merging gives an ordinary weight matrix ([[#prop-lora-count]]). At $B = 0$ the gradient of $A$ is $sB^\top G = 0$, so only $B$ changes in the first step ([[#cor-first-step]]). Activations still flow through the full network and must be stored for backpropagation, so LoRA saves optimiser and gradient memory but not activation memory.
:::
:::

::: history
Transfer by fine-tuning a few layers is as old as deep learning on images. Rebuffi et al. (2017) introduced residual adapters for multi-domain image classification, and Houlsby et al. (ICML 2019) brought bottleneck adapters to Transformers for NLP. In 2021 Li and Liang introduced prefix tuning and Lester et al. prompt tuning, building on discrete prompt search; Aghajanyan et al. (2020) measured the low intrinsic dimension of fine-tuning, and Hu et al. (arXiv 2021, ICLR 2022) proposed LoRA. BitFit (Ben Zaken et al., 2022), (IA)³ (Liu et al., 2022) and a unified view of PEFT methods (He et al., 2022) followed, and the Hugging Face PEFT library made the methods widely accessible. Dettmers et al. (NeurIPS 2023) introduced QLoRA with NF4 and double quantisation, building on earlier block-wise $8$-bit optimiser and inference quantisation by the same group. From 2023, LoRA variants (DoRA, rsLoRA, LoRA+), multi-adapter serving (S-LoRA, Punica) and studies of what LoRA learns and forgets (Biderman et al., 2024) refined the picture.
:::

::: summary
- Full fine-tuning with Adam needs about $16$ bytes per parameter and a full copy per task; **PEFT** freezes the base and trains $M\ll N$ parameters, stored per task.
- **Adapters** add bottleneck MLPs in each layer ($2md + m + d$ parameters each) and add inference latency; **prompt tuning** learns $pd$ input vectors and **prefix tuning** $2pdL$ per-layer key–value vectors, both costing context; **BitFit** and **(IA)³** tune biases or scaling vectors.
- **LoRA** learns $W_0 + \frac\alpha rBA$ with $r(d_{\text{in}} + d_{\text{out}})$ parameters per matrix, rank at most $r$, mergeable at no inference cost; a 7B-class model with rank $16$ on all projections trains about $40$ million parameters ($0.6\%$).
- Its gradients are $\partial\mathcal{L}/\partial B = sGA^\top$ and $\partial\mathcal{L}/\partial A = sB^\top G$; the first step is the full gradient restricted to the random row space of $A$. The best rank-$r$ update is a truncated SVD, so LoRA works when the needed update has fast-decaying singular values — an empirical property; LoRA learns less and forgets less than full fine-tuning.
- **QLoRA** stores the base in **NF4** (normal-quantile levels with an exact zero, block absmax scaling), uses **double quantisation** ($0.127$ instead of $0.5$ bits of overhead per parameter) and paged optimisers, and fine-tuned a $65$B model on one $48$ GB device.
:::

## Exercises

::: exercise A LoRA adapter's size {level=1 check="98304"}
How many trainable parameters does a rank-$16$ LoRA adapter on a $4096\times2048$ matrix have?
::: solution
$r(d_{\text{in}} + d_{\text{out}}) = 16\cdot(4096 + 2048) = 98{,}304$ — $1.17\%$ of the matrix's $8{,}388{,}608$ entries.
:::
:::

::: exercise An adapter's size {level=1 check="528448"}
How many parameters does one bottleneck adapter ([[#def-adapter]]) with $d = 4096$ and $m = 64$ have?
::: solution
$2md + m + d = 2\cdot64\cdot4096 + 64 + 4096 = 524{,}288 + 4{,}160 = 528{,}448$. With two adapters per layer over $32$ layers that is about $33.8$ million parameters, $0.5\%$ of a $6.7$-billion-parameter model.
:::
:::

::: exercise Double quantisation {level=1 check="0.127"}
Using $8$-bit first-level scales for blocks of $64$ weights and one $32$-bit second-level scale per $256$ first-level scales, compute the overhead in bits per parameter to three decimal places.
::: solution
$8/64 + 32/(64\cdot256) = 0.125 + 0.00195 = 0.127$ bits per parameter, against $32/64 = 0.5$ with plain $32$-bit scales.
:::
:::

::: exercise The break-even rank {level=2 check="2048"}
For a square $d\times d$ matrix with $d = 4096$, at what rank does a LoRA adapter have as many parameters as the matrix itself? What does this say about the meaning of "low rank"?
::: solution
$r\cdot2d = d^2$ gives $r = d/2 = 2048$. At ranks of a few hundred the adapter is already a sizeable fraction of the matrix (rank $256$: $12.5\%$); LoRA's efficiency rests on ranks being a tiny fraction of $d$, typically $8$ to $64$.
:::
:::

::: exercise Memory of QLoRA for a 33B model {level=2 check="17"}
Estimate the memory in GB (to the nearest GB) for the frozen base of a $33$-billion-parameter model stored in NF4 with double quantisation (about $4.127$ bits per parameter).
::: solution
$33\times10^9\cdot4.127/8 = 1.70\times10^{10}$ bytes, about $17$ GB, against $66$ GB in bf16.
:::
:::

::: exercise The first LoRA step {level=2}
A layer has $d_{\text{in}} = 3$, $d_{\text{out}} = 2$ and LoRA rank $r = 1$ with $A = (1, 0, 0)$, $B = 0$, $s = 1$. The gradient with respect to the effective weight is $G = \begin{pmatrix}1 & 2 & 0\\ 0 & 1 & 3\end{pmatrix}$. Compute $\partial\mathcal{L}/\partial A$, $\partial\mathcal{L}/\partial B$, and the weight change after one step with $\eta = 0.1$. Which parts of the full gradient step does it miss?
::: solution
$\partial\mathcal{L}/\partial A = sB^\top G = 0$. $\partial\mathcal{L}/\partial B = sGA^\top = G(1, 0, 0)^\top = (1, 0)^\top$. Then $B_1 = -0.1\cdot(1, 0)^\top$ and $\Delta W_1 = B_1A = \begin{pmatrix}-0.1 & 0 & 0\\ 0 & 0 & 0\end{pmatrix}$. The full step would be $-0.1G = \begin{pmatrix}-0.1 & -0.2 & 0\\ 0 & -0.1 & -0.3\end{pmatrix}$: LoRA keeps only the first column, the component along the row space of $A$ (the first input direction), as [[#cor-first-step]] says. Inputs along the second and third coordinates are unaffected until $A$ starts to move.
:::
:::

::: exercise Prefix tuning versus LoRA {level=2}
For the model of [[#ex-prompt]] ($d = 4096$, $L = 32$), compare the trainable parameters of prefix tuning with $p = 32$ and of LoRA with rank $8$ on the four attention projections. Which one increases the cost of every forward pass, and by how much in attention positions?
::: solution
Prefix tuning: $2pdL = 2\cdot32\cdot4096\cdot32 = 8.39$ million. LoRA: $4\cdot32\cdot8\cdot8192 = 8.39$ million — the same, by coincidence of the numbers ($2p = 4\cdot2r$). Prefix tuning adds $32$ positions to every attention computation in every layer, permanently; LoRA adds a small matrix product per projection during training and nothing after merging.
:::
:::

::: exercise LoRA and the truncated SVD {level=3}
Write a plain-Python experiment: build a $64\times64$ target update $\Delta = \sum_{i=1}^{64}\sigma_i\mathbf{u}_i\mathbf{v}_i^\top$ with random orthonormal $\mathbf{u}_i, \mathbf{v}_i$ and $\sigma_i = i^{-1}$, fit $BA$ of rank $r = 4$ by gradient descent on $\lVert\Delta - BA\rVert_F^2$ from the LoRA initialisation ($B = 0$, $A$ small random), and compare the final error with the Eckart–Young bound of [[#prop-best-rank]].
::: solution
The bound is $\big(\sum_{i=5}^{64}i^{-2}\big)^{1/2}$. Numerically $\sum_{i=5}^{64}i^{-2} = 0.2058$, so the bound is $0.4537$. A listing:

```python
import math, random
rng = random.Random(0)
n, r = 64, 4
def orthonormal(n):                       # Gram-Schmidt on random vectors
    Q = []
    while len(Q) < n:
        v = [rng.gauss(0, 1) for _ in range(n)]
        for q in Q:
            c = sum(a * b for a, b in zip(v, q)); v = [a - c * b for a, b in zip(v, q)]
        s = math.sqrt(sum(a * a for a in v)); Q.append([a / s for a in v])
    return Q
U, Vt = orthonormal(n), orthonormal(n)
D = [[sum((1 / (k + 1)) * U[k][i] * Vt[k][j] for k in range(n)) for j in range(n)] for i in range(n)]
B = [[0.0] * r for _ in range(n)]
A = [[rng.gauss(0, 0.1) for _ in range(n)] for _ in range(r)]
for step in range(1500):
    P = [[sum(B[i][k] * A[k][j] for k in range(r)) for j in range(n)] for i in range(n)]
    E = [[P[i][j] - D[i][j] for j in range(n)] for i in range(n)]          # G = dLoss/dW (up to 2)
    gB = [[sum(E[i][j] * A[k][j] for j in range(n)) for k in range(r)] for i in range(n)]   # G A^T
    gA = [[sum(B[i][k] * E[i][j] for i in range(n)) for j in range(n)] for k in range(r)]   # B^T G
    B = [[B[i][k] - 0.5 * gB[i][k] for k in range(r)] for i in range(n)]
    A = [[A[k][j] - 0.5 * gA[k][j] for j in range(n)] for k in range(r)]
err = math.sqrt(sum(E[i][j] ** 2 for i in range(n) for j in range(n)))
print(f"LoRA fit error {err:.4f}   Eckart-Young bound {math.sqrt(sum(1 / k ** 2 for k in range(5, n + 1))):.4f}")
```

```text
LoRA fit error 0.4537   Eckart-Young bound 0.4537
```

Gradient descent on the factored problem reaches the optimum: the low-rank matrix factorisation objective has no spurious local minima in this setting, and from the LoRA initialisation the fit converges to the truncated SVD. With $\sigma_i = i^{-1}$ the residual $0.454$ is large compared with $\lVert\Delta\rVert_F = 1.276$: slowly decaying spectra are where LoRA falls short.
:::
:::

::: exercise Choosing a PEFT method {level=3}
A company must offer $200$ customer-specific variants of a $13$-billion-parameter model, each fine-tuned on a few thousand examples of the customer's documents and style, served from a shared cluster with strict latency requirements. Recommend a PEFT design — method, which layers, rank, precision of the base for training and for serving, and whether to merge — and justify each choice with the trade-offs of this chapter. What would make you switch to full fine-tuning for some customers?
::: solution
LoRA on all linear layers (attention and feed-forward), rank around $16$, trained with a bf16 base, or with QLoRA if training hardware is limited — the QLoRA study found adapters on all linear layers necessary to match full fine-tuning, and a few thousand examples of style and format adaptation are well within what low ranks capture. Each adapter has roughly $0.6\%$ of the base's parameters (about $80$ million, $160$ MB in bf16), so $200$ adapters take about $32$ GB, less than one copy of the model. Serve **unmerged** with multi-adapter batching (S-LoRA style) on a shared base, since merging would require $200$ full copies; the extra LoRA products add a small latency, far less than adapters in series or long prefixes would, which rules out bottleneck adapters and prefix tuning under strict latency. Serve the base in bf16 (or a carefully evaluated quantised format) and evaluate each adapter in exactly the serving configuration ([[#sec-lora]], warning on merging and precision). Switch to full fine-tuning (or much higher ranks) for a customer whose task requires substantial new knowledge or capability, with large data, where LoRA's "learns less" limitation shows up as a quality gap on held-out evaluations — accepting the cost of a dedicated model copy.
:::
:::
