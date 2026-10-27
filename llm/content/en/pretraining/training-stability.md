Small models usually train smoothly. Large ones, trained at the highest learning rate that works, often do not: the loss falls for days and then jumps upward in a few steps — a **loss spike** — after which it may recover, settle at a worse value, or **diverge** to NaN. The reports of large runs are full of such episodes. PaLM (Chowdhery et al., 2022) saw about twenty spikes; the OPT-175B team (Zhang et al., 2022) published a logbook recording dozens of restarts with lowered learning rates; BLOOM's developers added a normalisation layer after the embeddings when instabilities appeared in their tests. A spike in a run that costs millions of dollars is expensive, and the remedies are therefore part of every modern recipe.

This chapter explains the mechanisms that are understood — growth of attention logits and collapse of attention entropy, drift of the output logits, the interaction of Adam's second-moment estimate with sudden gradients, and the limits of low-precision arithmetic — and derives the fixes they suggest: QK-normalisation, the z-loss, a lower $\beta_2$, careful initialisation and normalisation, and scaled number formats. It closes with $\mu$P, a research parametrisation that makes hyperparameters transfer across model widths, and with the operational procedure for handling a spike. Instability is less a theory than a collection of failure modes; the propositions here explain specific mechanisms, and which of them dominates in a given run is an empirical question.

## Loss spikes and divergence {#sec-spikes}

::: definition Loss spike and divergence {#def-spike}
A **loss spike** is a sudden increase of the training loss, well beyond the step-to-step noise, over a few to a few hundred steps, typically accompanied by a jump in the gradient norm. A run **diverges** if the loss does not return to its pre-spike trend, or becomes infinite or NaN.
:::

Two observations from the PaLM report frame the problem. The spikes occurred although gradient clipping was on. And they were not caused by "bad data" in any simple sense: when the batches around a spike were replayed starting from an earlier checkpoint, no spike occurred. Spikes arise from an interaction between the current state of the model and optimiser and the data, not from the data alone. PaLM's remedy was operational: restart from a checkpoint about $100$ steps before the spike and skip $200$ to $500$ batches.

Wortsman et al. (2023) made the problem studyable by showing that small models reproduce the instabilities of large ones when trained at high learning rates, and that the **learning-rate sensitivity** — how much the final loss degrades as the learning rate moves away from its optimum — is a useful measure of stability. Two failure modes stood out in their study, both studied earlier in large models: growth of attention logits, and divergence of the output logits.

## Attention logits and entropy collapse {#sec-attention}

The attention weights of a query are $\operatorname{softmax}(\mathbf{z})$, where $z_j = \mathbf{q}\cdot\mathbf{k}_j/\sqrt{d_k}$ ([[transformers/self-attention#def-attention]]). If the norms of queries and keys grow during training, all logits are multiplied by a growing factor, and the softmax sharpens.

::: definition Attention entropy {#def-attention-entropy}
The **attention entropy** of a query with weights $\mathbf{p} = \operatorname{softmax}(\mathbf{z})$ over $T$ keys is $H(\mathbf{p}) = -\sum_jp_j\log p_j$, between $0$ (all weight on one key) and $\log T$ (uniform). **Entropy collapse** is a fall of the attention entropy in many heads towards $0$ during training.
:::

::: proposition Scaling the logits lowers the entropy {#prop-entropy}
For fixed scores $\mathbf{z}$ and an inverse temperature $\beta > 0$, let $\mathbf{p}(\beta) = \operatorname{softmax}(\beta\mathbf{z})$. Then

$$
\frac{d}{d\beta}H\big(\mathbf{p}(\beta)\big) = -\beta\,\Var_{\mathbf{p}(\beta)}(z),
$$ {#eq-entropy}

where $\Var_{\mathbf{p}}(z) = \sum_jp_jz_j^2 - \big(\sum_jp_jz_j\big)^2$. Hence the entropy strictly decreases as $\beta$ grows (unless all $z_j$ are equal), tending to $\log m$, where $m$ is the number of keys attaining $\max_jz_j$.
:::

::: proof
Write $\log Z(\beta) = \log\sum_je^{\beta z_j}$, so that $\log p_j = \beta z_j - \log Z$ and $H = \log Z - \beta\sum_jp_jz_j = \log Z - \beta\,\E_{\mathbf p}[z]$. Two derivatives are standard: $\frac{d}{d\beta}\log Z = \sum_jz_je^{\beta z_j}/Z = \E_{\mathbf p}[z]$, and $\frac{d}{d\beta}\E_{\mathbf p}[z] = \sum_jz_j\frac{dp_j}{d\beta}$ with $\frac{dp_j}{d\beta} = p_j(z_j - \E_{\mathbf p}[z])$, giving $\E_{\mathbf p}[z^2] - \E_{\mathbf p}[z]^2 = \Var_{\mathbf p}(z)$. Hence $\frac{dH}{d\beta} = \E_{\mathbf p}[z] - \E_{\mathbf p}[z] - \beta\Var_{\mathbf p}(z) = -\beta\Var_{\mathbf p}(z)$. The variance is positive unless $\mathbf{p}$ is concentrated on keys with equal scores, which for $\beta > 0$ happens only if all $z_j$ are equal. As $\beta\to\infty$, $\mathbf{p}$ tends to the uniform distribution on the maximisers, with entropy $\log m$.
:::

Collapse is harmful twice over. The attention pattern degenerates to near one-hot, so the head stops mixing information; and the gradient of a saturated softmax is tiny except on the winning key ([[transformers/self-attention#prop-softmax-jacobian]]), so the head can no longer learn its way out, while small changes in the winning score can flip which key wins and cause large jumps. Zhai et al. (2023) linked entropy collapse to instability in Transformers for vision, speech and language, and Dehghani et al. (2023), training a $22$-billion-parameter vision Transformer, observed attention logits growing without bound and the loss diverging after a few thousand steps.

::: definition QK-normalisation {#def-qk-norm}
**QK-normalisation** applies a normalisation (LayerNorm or RMSNorm, per head) to the query and key vectors before their dot product:

$$
z_j = \frac{\operatorname{Norm}(\mathbf{q})\cdot\operatorname{Norm}(\mathbf{k}_j)}{\sqrt{d_k}}.
$$
:::

::: proposition QK-normalisation bounds the logits {#prop-qk-bound}
With RMSNorm with gains $\boldsymbol\gamma_q, \boldsymbol\gamma_k\in\R^{d_k}$, every attention logit satisfies $\lvert z_j\rvert\le\sqrt{d_k}\,\max_i\lvert\gamma_{q,i}\gamma_{k,i}\rvert$, whatever the size of the queries and keys.
:::

::: proof
RMSNorm maps $\mathbf{q}$ to $\boldsymbol\gamma_q\odot\hat{\mathbf q}$ with $\hat{\mathbf q} = \mathbf{q}/\operatorname{rms}(\mathbf q)$, so that $\sum_i\hat q_i^2 = d_k$ ([[transformers/transformer-block#def-rmsnorm]]); likewise for $\mathbf{k}$. Then $\lvert\sum_i\gamma_{q,i}\gamma_{k,i}\hat q_i\hat k_i\rvert\le\max_i\lvert\gamma_{q,i}\gamma_{k,i}\rvert\sum_i\lvert\hat q_i\hat k_i\rvert\le\max_i\lvert\gamma_{q,i}\gamma_{k,i}\rvert\cdot d_k$, using the Cauchy–Schwarz inequality $\sum_i\lvert\hat q_i\hat k_i\rvert\le\norm{\hat{\mathbf q}}\norm{\hat{\mathbf k}} = d_k$. Dividing by $\sqrt{d_k}$ gives the bound.
:::

The logits can still grow, but only through the gains, which are few parameters subject to weight decay and move slowly, rather than through the norms of whole projection matrices. Dehghani et al. found that QK-normalisation removed the divergence of their $22$-billion-parameter model, Wortsman et al. that it greatly reduced learning-rate sensitivity in small models, and several later language models use it (for example OLMo 2 and Chameleon, both 2024).

::: example Entropy of a growing attention head {#ex-entropy}
A query has scores $\mathbf{z} = (2, 1, 0)$ against three keys. Compute the attention weights and entropy at $\beta = 1$ and at $\beta = 4$, and check the sign of [[#eq-entropy]] at $\beta = 1$.
::: solution
At $\beta = 1$: $e^2, e^1, e^0 = 7.389, 2.718, 1$, sum $11.107$, so $\mathbf{p} = (0.665, 0.245, 0.090)$ and $H = -(0.665\ln0.665 + 0.245\ln0.245 + 0.090\ln0.090) = 0.271 + 0.345 + 0.217 = 0.832$ nats (the maximum is $\ln3 = 1.099$). At $\beta = 4$: $e^8, e^4, 1 = 2981, 54.6, 1$, so $\mathbf{p} = (0.9817, 0.0180, 0.0003)$ and $H = 0.018 + 0.072 + 0.003 = 0.093$ nats. At $\beta = 1$, $\E_{\mathbf p}[z] = 1.330 + 0.245 = 1.575$, $\E_{\mathbf p}[z^2] = 2.660 + 0.245 = 2.905$, $\Var = 2.905 - 2.481 = 0.424$, so $dH/d\beta = -0.424 < 0$. Multiplying the logits by four has driven the head from a soft mixture to almost a hard choice.
:::
:::

## Output logits and the z-loss {#sec-zloss}

The output layer has an exact symmetry: adding the same constant $c$ to all logits leaves the softmax, and therefore the cross-entropy, unchanged. The level of the logits is thus not determined by the loss, and nothing stops it from drifting. Large output logits are dangerous in low precision — the log-partition function $\log Z = \log\sum_ie^{z_i}$ is computed from exponentials, and its rounding error grows with its magnitude — and Wortsman et al. observed output-logit divergence as a distinct instability in small models without weight decay.

::: definition z-loss {#def-zloss}
The **z-loss** (Chowdhery et al., 2022) adds to the cross-entropy at every position a penalty on the log-partition function of the output logits $\mathbf{z}$:

$$
\mathcal{L} = \mathcal{L}_{\text{CE}} + \lambda_z\,(\log Z)^2,\qquad\log Z = \log\sum_{i\in\mathcal V}e^{z_i},
$$

with $\lambda_z = 10^{-4}$ in PaLM.
:::

::: proposition The z-loss fixes the free shift {#prop-zloss}
Let $\mathbf{p} = \operatorname{softmax}(\mathbf{z})$ and $y$ the target. The gradient of the combined loss with respect to the logits is

$$
\frac{\partial\mathcal{L}}{\partial z_i} = p_i - \mathbb{1}[i = y] + 2\lambda_z\log Z\cdot p_i.
$$

The cross-entropy part sums to zero over $i$, so it never changes the mean logit; the z-loss part sums to $2\lambda_z\log Z$, and gradient descent therefore moves all logits together in the direction that brings $\log Z$ towards $0$.
:::

::: proof
The cross-entropy gradient is $p_i - \mathbb 1[i = y]$ ([[math-for-ml/gradients#prop-softmax-ce]]), and $\sum_i(p_i - \mathbb 1[i = y]) = 1 - 1 = 0$, so a gradient step changes the logits by a vector with zero sum, leaving their mean unchanged. For the penalty, $\partial(\log Z)/\partial z_i = e^{z_i}/Z = p_i$, so $\partial\lambda_z(\log Z)^2/\partial z_i = 2\lambda_z\log Z\,p_i$, whose sum over $i$ is $2\lambda_z\log Z$. A step of size $\eta$ along the negative gradient therefore lowers the sum of the logits by $2\eta\lambda_z\log Z$ when $\log Z > 0$ and raises it when $\log Z < 0$, decreasing $\lvert\log Z\rvert$ to first order.
:::

::: example A z-loss gradient by hand {#ex-zloss}
The output logits at one position are $\mathbf{z} = (2, 1, 0)$ over a three-token vocabulary and the target is the first token. Compute the cross-entropy gradient, the z-loss gradient with $\lambda_z = 10^{-4}$, and the sum of each.
::: solution
$Z = e^2 + e + 1 = 11.107$, $\log Z = 2.408$, $\mathbf p = (0.665, 0.245, 0.090)$. Cross-entropy gradient: $\mathbf{p} - \mathbf{e}_1 = (-0.335, 0.245, 0.090)$, summing to $0$. z-loss gradient: $2\cdot10^{-4}\cdot2.408\cdot\mathbf p = (3.20, 1.18, 0.43)\times10^{-4}$, summing to $4.8\times10^{-4} = 2\lambda_z\log Z$. The z-loss term is a thousand times smaller than the cross-entropy term, but it is the only one with a non-zero sum: it alone pushes all three logits down together, towards $\log Z = 0$.
:::
:::

When $\log Z\approx0$, the logits are themselves log-probabilities, which keeps them in a numerically comfortable range. The coefficient is small enough that the penalty barely affects the cross-entropy. The z-loss is also used for the router of mixture-of-experts models (Zoph et al., 2022, router z-loss), where large router logits cause similar problems.

## Adam and sudden gradients {#sec-adam}

Adam divides the first-moment estimate by the square root of the second ([[neural-networks/optimisers#prop-adam]]). If a parameter has had small gradients for a long time, its second-moment estimate $v$ is small; a sudden large gradient then produces a large update before $v$ catches up. This is one proposed mechanism for spikes (Molybog et al., 2023), and it explains a convention.

::: proposition The first Adam update after a quiet period {#prop-adam-burst}
Suppose a parameter's moments are $m\approx0$, $v\approx0$ after a long period of negligible gradients (so that bias corrections are $\approx1$), and a gradient $g\neq0$ arrives. The next Adam update, as a multiple of the learning rate, is

$$
\frac{\lvert m\rvert}{\sqrt{v}} = \frac{(1-\beta_1)\lvert g\rvert}{\sqrt{(1-\beta_2)g^2}} = \frac{1-\beta_1}{\sqrt{1-\beta_2}},
$$

independent of the size of $g$. For $\beta_1 = 0.9$ it is $0.447$ for $\beta_2 = 0.95$, $1.0$ for $\beta_2 = 0.99$ and $3.16$ for $\beta_2 = 0.999$.
:::

::: proof
After the update rules $m\leftarrow\beta_1m + (1-\beta_1)g$ and $v\leftarrow\beta_2v + (1-\beta_2)g^2$ from $m = v = 0$, we have $m = (1-\beta_1)g$ and $v = (1-\beta_2)g^2$; the ratio follows by cancelling $\lvert g\rvert$. (With $\epsilon > 0$ the update is slightly smaller.)
:::

In steady state, Adam's update per parameter is about $1$ learning rate at most; with $\beta_2 = 0.999$ a parameter that suddenly receives gradient moves more than three times as far as it would in steady state, and — worse — the large $v$ that results then suppresses its updates for thousands of steps. With $\beta_2 = 0.95$ the second moment adapts in about $20$ steps and the burst is less than half a normal step. This is the usual explanation for the $\beta_2 = 0.95$ of most large language-model recipes ([[pretraining/training-loop#sec-schedules]]); a related remedy is a larger $\epsilon$, which caps the update when $v$ is tiny (Wortsman et al., 2023, studied the effect of $\epsilon$ at scale).

::: widget plot
f: 0.1/sqrt(1 - x); 1 + 0*x
x: 0.9, 0.9995
y: 0, 5
vlines: 0.95; 0.999
labels: first update after quiet period, $(1-\beta_1)/\sqrt{1-\beta_2}$; steady-state scale
caption: The size of Adam's update (in units of the learning rate) for the first large gradient after a long quiet period, from [[#prop-adam-burst]] with $\beta_1 = 0.9$, against $\beta_2$. The vertical lines mark the values $0.95$ common in language-model pretraining and $0.999$, the library default. With high $\beta_2$, rarely active parameters — embeddings of rare tokens, for instance — make outsized jumps.
:::

::: example A rare token's embedding {#ex-rare-token}
A token appears in a batch for the first time in $20{,}000$ steps. Its embedding entries are of size about $0.02$, the learning rate is $3\times10^{-4}$ and $\beta_1 = 0.9$. How far does each entry move in the first step for $\beta_2 = 0.999$ and for $\beta_2 = 0.95$, relative to its size?
::: solution
By [[#prop-adam-burst]], the step is $3.16\cdot3\times10^{-4} = 9.5\times10^{-4}$ with $\beta_2 = 0.999$, a relative change of $4.7\%$ in one step; with $\beta_2 = 0.95$ it is $0.447\cdot3\times10^{-4} = 1.3\times10^{-4}$, $0.7\%$. Rare tokens, and more generally parameters whose gradients are intermittent, are where a high $\beta_2$ produces large and sudden changes.
:::
:::

## Initialisation and normalisation at scale {#sec-init}

Several architectural choices that are now standard were adopted for stability.

- **Pre-normalisation.** Placing the normalisation before each sub-layer, inside the residual branch, keeps the residual stream an identity path ([[transformers/transformer-block#prop-identity]]); Xiong et al. (2020) showed that the original post-normalisation design has large gradients near the output at initialisation and needs a warm-up to train at all. Most large language models use pre-normalisation, usually RMSNorm.
- **Scaled residual initialisation.** The output projections of each residual branch are initialised with a standard deviation reduced by a factor $1/\sqrt{2L}$ for $L$ blocks (GPT-2), so that the variance of the residual stream does not grow with depth ([[neural-networks/initialisation-normalisation#ex-gpt2-scaling]]).
- **Embedding treatment.** BLOOM (2022) added a LayerNorm after the embedding layer; GLM-130B (Zeng et al., 2022) scaled down the gradient flowing into the embeddings. Both responded to instabilities that originated in the embedding layer.
- **Fewer parameters that can grow without bound.** Removing biases, applying weight decay to most matrices, and normalising queries and keys all limit the growth of quantities that the loss does not constrain.

::: warning Gradient clipping does not prevent spikes
Clipping caps the norm of each update's gradient, but a spike is usually not a single huge gradient: it is a change in the state of the network — saturated attention, drifting logits, a stale second moment — that makes many consecutive steps go wrong. PaLM's spikes happened with clipping enabled. Worse, a run whose gradient is clipped at almost every step is effectively training with a smaller, normalised learning rate and may hide the symptom while the cause grows. Watch how often clipping is active, and treat frequent clipping as a sign to lower the learning rate or fix the architecture.
:::

## Numerical formats {#sec-formats}

Mixed-precision training in bfloat16 with float32 master weights ([[neural-networks/training-practice#sec-precision]]) is the default. Bfloat16 has float32's range, so overflow is rare, but only $8$ bits of precision. Operations that are sensitive to rounding — softmax and log-sum-exp, normalisation statistics, reductions over long sums, the loss itself — are therefore done in float32 even inside a bfloat16 model.

As of 2026, several large runs perform the main matrix multiplications in **8-bit floating point** (FP8), which doubles peak throughput again on hardware that supports it. Two FP8 formats were proposed by Micikevicius et al. (2022): **E4M3** (4 exponent bits, 3 mantissa bits, largest finite value $448$), used for weights and activations, and **E5M2** (5 exponent bits, 2 mantissa bits, largest $57{,}344$), with more range for gradients. With so few bits, values must be **scaled** into the representable range before casting.

::: definition Scaled low-precision cast {#def-scaled-cast}
To cast a tensor $X$ to a format with largest finite value $F_{\max}$, choose a scale $s = F_{\max}/\operatorname{amax}(X)$ (where $\operatorname{amax}$ is the largest absolute entry, computed over the whole tensor, or over each block of a tiled partition), store $\operatorname{round}(sX)$ in the low-precision format together with $s$ in higher precision, and multiply the result of each matrix product by the inverse scales. **Per-tensor** scaling uses one $s$ per tensor; **fine-grained** (block-wise) scaling uses one per tile.
:::

::: widget floatline
p: 4
emin: -6
emax: 8
value: 300
caption: A format with a $4$-bit significand (three stored mantissa bits) and exponents from $-6$ to $8$, the layout of FP8 E4M3. Between $256$ and $512$ representable numbers are $32$ apart, so $300$ rounds to $288$. The toy format's largest value is $480$; the real E4M3 format reserves that bit pattern for NaN, so its largest finite value is $448$. Everything larger overflows — which is why tensors are scaled into range before casting.
:::

Fine-grained scaling matters because a single outlier sets the scale for the whole tensor: if one activation is $100$ times larger than the rest, per-tensor scaling pushes the others towards the bottom of the range where relative precision is poor (or into subnormals). DeepSeek-V3 (2024) reported FP8 training with scales per $1\times128$ tile of activations and per $128\times128$ block of weights, with accumulation in higher precision, and a relative loss difference from a bfloat16 baseline below $0.25\%$. Outlier features in activations, which grow with model scale (Dettmers et al., 2022), are one reason low-precision training is harder for large models; they matter even more for quantised inference ([[inference/quantisation]]).

::: example Scaling into FP8 range {#ex-fp8}
A tensor has largest absolute entry $\operatorname{amax} = 1373.3$. What per-tensor scale maps it onto E4M3's range, and what happens to an entry of $888.6$ without scaling and with it?
::: solution
$s = 448/1373.3 = 0.3262$. Without scaling, $888.6 > 448$ saturates to $448$ (or becomes NaN, depending on the cast mode), an error of almost $50\%$. With scaling, $888.6s = 289.9$, which lies in $[256, 512)$ where E4M3 values are $32$ apart; it rounds to $288$, and dividing by $s$ gives $882.9$, an error of $0.6\%$ — about what three mantissa bits allow.
:::
:::

## A numerical laboratory {#sec-code}

The listing checks four claims of this chapter in plain Python: entropy collapse under scaling ([[#prop-entropy]]), the size of Adam's burst ([[#prop-adam-burst]]), the effect of the z-loss on $\log Z$ ([[#prop-zloss]]), and FP8 rounding with and without a scale ([[#ex-fp8]]).

```python
import math, random
rng = random.Random(0)

# 1. attention entropy collapses as the logits grow
def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]
def entropy(p): return -sum(q * math.log(q) for q in p if q > 0)
z = [rng.gauss(0, 1) for _ in range(512)]            # scores of one query against 512 keys
print("logit scale  entropy (nats)  max weight")
for beta in [0.5, 1, 2, 4, 8, 16]:
    p = softmax([beta * v for v in z])
    print(f"{beta:6.1f}       {entropy(p):6.3f}         {max(p):.3f}")
print(f"uniform: ln 512 = {math.log(512):.3f}")

# 2. Adam's first update after a quiet period: size of m/sqrt(v) for a sudden gradient
for b2 in [0.95, 0.99, 0.999]:
    m = v = 0.0
    for _ in range(10_000):                           # long quiet period: tiny gradients
        g = rng.gauss(0, 1e-4); m = 0.9 * m + 0.1 * g; v = b2 * v + (1 - b2) * g * g
    g = 1e-2                                          # a gradient 100x the usual size
    m = 0.9 * m + 0.1 * g; v = b2 * v + (1 - b2) * g * g
    print(f"beta2 = {b2}: update / lr = {m / (math.sqrt(v) + 1e-12):.3f}"
          f"   bound (1-b1)/sqrt(1-b2) = {0.1 / math.sqrt(1 - b2):.3f}")

# 3. log Z drifts when nothing pins it; z-loss pins it
def run(zcoef, steps=2000, lr=0.5):
    r = random.Random(1)
    logits = [0.0] * 8; target = 3
    for _ in range(steps):
        p = softmax(logits); lse = max(logits) + math.log(sum(math.exp(v - max(logits)) for v in logits))
        common = r.gauss(0, 0.05)                     # noise that shifts all logits alike
        grad = [p[i] - (i == target) + 2 * zcoef * lse * p[i] + common for i in range(8)]
        logits = [l - lr * g for l, g in zip(logits, grad)]
    p = softmax(logits)
    lse = max(logits) + math.log(sum(math.exp(v - max(logits)) for v in logits))
    return -math.log(p[target]), lse
for c in [0.0, 1e-4, 1e-2]:
    ce, lse = run(c)
    print(f"z-loss coefficient {c:g}: cross-entropy {ce:.4f}, log Z = {lse:+.2f}")

# 4. FP8 E4M3 rounding with a per-tensor scale (max finite value 448)
def e4m3(x):
    if x == 0: return 0.0
    s, a = (1, x) if x > 0 else (-1, -x)
    a = min(a, 448.0)
    e = max(math.floor(math.log2(a)), -6)            # subnormals below 2^-6
    step = 2.0 ** (e - 3)                            # 3 mantissa bits
    return s * round(a / step) * step
vals = [rng.gauss(0, 1) * 1000 for _ in range(6)]
amax = max(abs(v) for v in vals); scale = 448 / amax
print("values   ", [round(v, 1) for v in vals])
print("no scale ", [e4m3(v) for v in vals])
print("scaled   ", [round(e4m3(v * scale) / scale, 1) for v in vals], f"(scale {scale:.4f})")
```

```text
logit scale  entropy (nats)  max weight
   0.5        6.097         0.010
   1.0        5.647         0.039
   2.0        3.987         0.245
   4.0        0.965         0.831
   8.0        0.029         0.997
  16.0        0.000         1.000
uniform: ln 512 = 6.238
beta2 = 0.95: update / lr = 0.454   bound (1-b1)/sqrt(1-b2) = 0.447
beta2 = 0.99: update / lr = 0.970   bound (1-b1)/sqrt(1-b2) = 1.000
beta2 = 0.999: update / lr = 3.029   bound (1-b1)/sqrt(1-b2) = 3.162
z-loss coefficient 0: cross-entropy 0.0009, log Z = +6.94
z-loss coefficient 0.0001: cross-entropy 0.0016, log Z = +6.26
z-loss coefficient 0.01: cross-entropy 0.0097, log Z = +0.45
values    [1373.3, -176.0, 888.6, 480.1, 285.7, -128.6]
no scale  [448.0, -176.0, 448.0, 448.0, 288.0, -128.0]
scaled    [1373.3, -171.7, 882.9, 490.5, 294.3, -122.6] (scale 0.3262)
```

Multiplying $512$ standard-normal attention scores by $8$ leaves $99.7\%$ of the weight on one key. Adam's burst matches the formula of [[#prop-adam-burst]] up to the small contribution of the earlier noisy gradients. In the logit experiment, nothing in the cross-entropy fixes the common level of the eight logits (it moves only with the injected common-mode noise), and as the target's probability approaches $1$, $\log Z$ climbs to about $7$; a z-loss of $10^{-4}$ pulls it back only slowly over $2000$ steps, while $10^{-2}$ holds it near $0$ at a small cost in cross-entropy. In a real model the z-loss acts at every position of every batch over hundreds of thousands of steps, so the small PaLM coefficient suffices. Finally, values above $448$ saturate without scaling; with the per-tensor scale every value keeps about two significant digits.

## Hyperparameters that transfer: μP (research) {#sec-mup}

Stability and the choice of learning rate are linked: the most efficient learning rate is usually just below the one at which training becomes unstable, and in the standard parametrisation that threshold moves as the model gets wider, so learning rates tuned on small models do not transfer. **Maximal update parametrisation** ($\mu$P; Yang et al., 2021) changes how initialisation, learning rates and some multipliers scale with width so that, in the limit of infinite width, every layer's features keep changing by an amount of order one per step — neither exploding nor freezing.

::: definition μP rules for Adam (simplified) {#def-mup}
For a model whose hidden width is multiplied by a factor $m$ relative to a tuned base model, $\mu$P with Adam prescribes, compared with the standard parametrisation: initialise hidden weight matrices with variance $\propto1/\text{fan-in}$ (as usual) but scale their **learning rate** by $1/m$; multiply the **output logits** by $1/m$ (or equivalently initialise and scale the output layer accordingly); keep the input embedding's learning rate unscaled; and use attention logits $\mathbf{q}\cdot\mathbf{k}/d_k$ instead of $/\sqrt{d_k}$.
:::

::: example Transferring a learning rate with μP {#ex-mup}
A base model of width $256$ is tuned under $\mu$P, giving a hidden-layer Adam learning rate of $10^{-2}$ and an output multiplier of $1$. What hidden-layer learning rate and output multiplier does $\mu$P prescribe at width $4096$? What would the standard parametrisation do?
::: solution
The width ratio is $m = 4096/256 = 16$, so the hidden-layer learning rate becomes $10^{-2}/16 = 6.25\times10^{-4}$ and the output logits are multiplied by $1/16$; embedding learning rates stay at their tuned value. In the standard parametrisation every layer would use the same global learning rate, and one would have to sweep it again at width $4096$ because the optimum moves — typically downwards — with width.
:::
:::

Yang et al. reported that the optimal learning rate and initialisation scale stayed nearly constant across widths under $\mu$P, and demonstrated "$\mu$Transfer" by tuning a $40$-million-parameter proxy and transferring its hyperparameters to a $6.7$-billion-parameter GPT-3-style model, which matched or exceeded the published model's results. Some later models report using $\mu$P or variants (for example Cerebras-GPT and MiniCPM). As of 2026, $\mu$P is an active research area rather than a universal standard: it guarantees transfer across width under its assumptions, while transfer across depth, batch size and training length needs extensions, and the results of large teams that do not use it show that careful sweeps and extrapolation also work.

## Handling a spike in practice {#sec-practice}

::: algorithm Responding to a loss spike {#alg-spike}
1. **Detect**: alert when the loss exceeds its recent moving average by several standard deviations, or the gradient norm jumps; record the step and the batches involved.
2. **Wait briefly**: many spikes recover by themselves within a few hundred steps; if the loss returns to trend, continue and note it.
3. **Rewind and skip**: otherwise, restart from a checkpoint before the spike began and skip the batches around it (PaLM: about $100$ steps back, $200$–$500$ batches skipped), so that the model meets different data in that state.
4. **Reduce the learning rate** temporarily or permanently if spikes recur (the OPT logbook records repeated reductions).
5. **Inspect the internals**: maximum attention logits and entropies per layer, output-logit norms, per-layer gradient norms, Adam's second-moment statistics, and the data in the offending batches.
6. **Change the recipe for the next run** if a mechanism is identified: QK-normalisation, z-loss, lower $\beta_2$ or larger $\epsilon$, embedding normalisation, higher-precision reductions.
:::

::: quiz
A run's loss spikes, recovers within $300$ steps, and spikes again $2000$ steps later at the same learning rate. Which responses are reasonable? (Select all that apply.)
- [x] Rewind to a checkpoint before the second spike and skip the surrounding batches.
- [x] Examine the maximum attention logits per layer around the spikes.
- [ ] Remove the batches from the dataset permanently, since bad data caused the spikes.
- [x] Consider lowering the learning rate if spikes keep recurring.
::: solution
Rewinding with skipped batches, inspecting attention logits and lowering the learning rate are all standard responses. Removing the batches assumes the data are at fault, but PaLM's replay experiment showed that the same batches did not cause a spike from a different model state; the cause is usually the interaction of state and data.
:::
:::

::: history
Instabilities in Transformer training were documented from the start: the original Transformer needed learning-rate warm-up, which Xiong et al. (2020) traced to post-normalisation. Micikevicius et al. (2018) introduced mixed-precision training with loss scaling, and Kalamkar et al. (2019) studied bfloat16. GPT-2 (2019) used pre-normalisation and scaled residual initialisation. Henry et al. (2020) proposed query–key normalisation for translation. Yang et al. (2021) introduced $\mu$P. In 2022 the large-run reports — OPT (Zhang et al.), BLOOM, GLM-130B (Zeng et al.) and PaLM (Chowdhery et al.), which introduced the z-loss and the rewind-and-skip procedure — made instability a central topic, and Micikevicius et al. (2022) defined the FP8 formats. Dehghani et al. (2023) used QK-normalisation to train a $22$-billion-parameter vision Transformer, Zhai et al. (2023) analysed attention entropy collapse, Wortsman et al. (2023) reproduced large-scale instabilities in small models, and Molybog et al. (2023) analysed Adam's role. DeepSeek-V3 (2024) reported large-scale FP8 training with fine-grained scaling.
:::

::: summary
- **Loss spikes** are sudden loss increases that may recover or lead to divergence; they arise from the interaction of model state, optimiser state and data, and happen even with gradient clipping.
- Scaling attention logits by $\beta$ lowers attention entropy at rate $\beta\Var_{\mathbf p}(z)$, leading to **entropy collapse**; **QK-normalisation** bounds the logits by $\sqrt{d_k}$ times the norm gains.
- The cross-entropy leaves the common level of output logits free; the **z-loss** $10^{-4}(\log Z)^2$ pins $\log Z$ near $0$.
- After a quiet period Adam's first update is $(1-\beta_1)/\sqrt{1-\beta_2}$ learning rates — $3.16$ for $\beta_2 = 0.999$, $0.45$ for $0.95$ — one reason for the low $\beta_2$ of language-model recipes.
- Pre-normalisation, scaled residual initialisation, embedding normalisation and weight decay are stability choices.
- Training is done in bfloat16 with float32 master weights and sensitive operations in float32; **FP8** (E4M3, max $448$; E5M2, max $57{,}344$) requires **scaling**, ideally per block, because of outliers.
- **$\mu$P** makes hyperparameters transfer across width (research); in practice spikes are handled by rewinding, skipping batches, lowering the learning rate and fixing mechanisms in the next run.
:::

## Exercises

::: exercise Adam's burst {level=1 check="1"}
With $\beta_1 = 0.9$ and $\beta_2 = 0.99$, how large (in learning rates) is Adam's first update after a long quiet period, by [[#prop-adam-burst]]?
::: solution
$(1-0.9)/\sqrt{1-0.99} = 0.1/0.1 = 1$.
:::
:::

::: exercise A z-loss value {level=1 check="0.0009"}
At one position the output logits have $\log Z = 3$. What z-loss does PaLM's coefficient $\lambda_z = 10^{-4}$ add to the loss?
::: solution
$10^{-4}\cdot3^2 = 9\times10^{-4}$, tiny compared with a typical cross-entropy of about $2$.
:::
:::

::: exercise FP8 scale {level=1 check="0.0448"}
A tensor's largest absolute entry is $10{,}000$. What per-tensor scale maps it onto the E4M3 range?
::: solution
$s = 448/10{,}000 = 0.0448$.
:::
:::

::: exercise Entropy of two keys {level=2 check="0.0901"}
A query attends to two keys with scores $z = (\beta, 0)$. Compute the attention entropy in nats at $\beta = 4$, to four decimal places.
::: solution
$p_1 = 1/(1 + e^{-4}) = 0.98201$, $p_2 = 0.01799$. Then $p_1\ln(1/p_1) = 0.98201\cdot0.018152 = 0.017826$ and $p_2\ln(1/p_2) = 0.01799\cdot4.01815 = 0.072287$, so $H = 0.0901$ nats, against the maximum $\ln2 = 0.6931$.
:::
:::

::: exercise QK bound {level=2 check="11.3137"}
With RMSNorm QK-normalisation, $d_k = 128$ and all gains equal to $1$, what is the largest possible attention logit, to four decimal places? What softmax weight can one key then receive at most against $T - 1 = 4095$ keys with logit $-11.3137$?
::: solution
$\sqrt{128} = 11.3137$ by [[#prop-qk-bound]]. With one logit at $+11.31$ and $4095$ at $-11.31$, the weight is $1/(1 + 4095e^{-22.63}) = 1 - 6.1\times10^{-7}$. The bound does not stop a head from being nearly one-hot; it stops the logits from growing further, which keeps gradients and rounding errors bounded. With gains learned, the bound grows only as the gains grow.
:::
:::

::: exercise Steady-state Adam updates {level=2}
Show that if a parameter's gradient is constant, $g_t = g\neq0$ for all $t$, then Adam's bias-corrected update $\hat m_t/\sqrt{\hat v_t}$ equals $\operatorname{sign}(g)$ for every $t$ (with $\epsilon = 0$). Contrast with [[#prop-adam-burst]] for $\beta_2 = 0.999$: why does a sudden gradient produce a larger step than a constant one?
::: solution
With constant $g$, $m_t = (1-\beta_1^t)g$ and $v_t = (1-\beta_2^t)g^2$, so $\hat m_t = g$ and $\hat v_t = g^2$, giving $\hat m_t/\sqrt{\hat v_t} = g/\lvert g\rvert = \operatorname{sign}(g)$, a step of exactly one learning rate. In [[#prop-adam-burst]] the moments start near $0$ late in training, where bias correction is $\approx1$ and does not compensate; the first moment then holds $(1-\beta_1)g$ while the second holds only $(1-\beta_2)g^2$, and since $1-\beta_2$ is much smaller than $(1-\beta_1)^2$ when $\beta_2 = 0.999$ ($0.001$ against $0.01$), the ratio exceeds $1$. The second moment "remembers" the quiet period longer than the first moment does.
:::
:::

::: exercise Pipeline of a spike {level=2}
A spike starts at step $120{,}350$. Checkpoints are saved every $500$ steps. Following PaLM's procedure, from which checkpoint would you restart, and which batches would you skip if you skip $400$? What must the data loader support for this to be possible?
::: solution
The last checkpoint at least $100$ steps before the spike: step $120{,}000$ (the checkpoint at $120{,}500$ is after the spike; $120{,}000$ is $350$ steps before it). Restart there and skip the batches that would have been consumed at steps roughly $120{,}250$ to $120{,}650$, so the model reaches the spike region with different data. The data loader must be deterministic and seekable — able to resume at a given position in the stream and to skip a given range of batches — and its state must be part of the checkpoint ([[pretraining/training-loop#sec-checkpoints]]).
:::
:::

::: exercise Proving the entropy derivative numerically {level=3}
Write a plain-Python function that estimates $dH/d\beta$ by a central difference for $\mathbf{z} = (2, 1, 0)$ at $\beta = 1$ and compare it with $-\beta\Var_{\mathbf p}(z)$ from [[#ex-entropy]].
::: solution
```python
import math
def H(beta, z=(2, 1, 0)):
    e = [math.exp(beta * v) for v in z]; s = sum(e); p = [x / s for x in e]
    return -sum(q * math.log(q) for q in p), p
h = 1e-5
numeric = (H(1 + h)[0] - H(1 - h)[0]) / (2 * h)
p = H(1)[1]; mean = sum(q * v for q, v in zip(p, (2, 1, 0)))
var = sum(q * v * v for q, v in zip(p, (2, 1, 0))) - mean ** 2
print(f"numeric {numeric:.6f}   formula {-1 * var:.6f}")
```

```text
numeric -0.424405   formula -0.424405
```

The two agree to six decimals, confirming [[#eq-entropy]].
:::
:::

::: exercise Why a free logit shift can drift {level=3}
In [[#prop-zloss]] the cross-entropy gradient has zero sum. Explain why, nevertheless, the mean of the output logits can drift in a real model trained with Adam and weight decay switched off for the output layer, and why the z-loss's push is effective even though $\lambda_z$ is tiny.
::: solution
The zero-sum property holds for the gradient with respect to the logits. The logits are $\mathbf{z} = W\mathbf{h} + \mathbf{b}$; a gradient step changes $W$ by $-\eta\,(\mathbf{p} - \mathbf{e}_y)\mathbf{h}^\top$, which keeps the column sums of $W$ fixed in plain SGD — but Adam rescales each entry separately by $1/\sqrt{v}$, destroying the zero-sum structure, and the hidden vectors $\mathbf h$ themselves change, so the common component $\frac{1}{\lvert\mathcal V\rvert}\sum_iz_i$ is free to wander with nothing pulling it back (weight decay, if present, would pull it weakly towards $0$). Because the loss is exactly flat in this direction, any push at all — even $2\lambda_z\log Z$ with $\lambda_z = 10^{-4}$ — is unopposed by the main loss and accumulates over hundreds of thousands of steps at every position; there is no trade-off to tip, only a neutral direction to stabilise.
:::
:::

::: exercise Outliers and per-tensor scaling {level=3}
A tensor has $1023$ entries of magnitude about $1$ and one outlier of magnitude $1000$. With per-tensor E4M3 scaling, what scale is used, what do the typical entries become after scaling, and roughly what relative precision do they keep? (E4M3's smallest normal number is $2^{-6} = 0.0156$, with subnormals spaced $2^{-9}$ apart below it.) How does block-wise scaling over blocks of $128$ entries help?
::: solution
$s = 448/1000 = 0.448$; typical entries become about $0.448$, which lies in $[0.25, 0.5)$, where E4M3 numbers are $2^{-2-3} = 0.03125$ apart — a relative precision of about $7\%$ at worst, similar to the format's normal precision. So here the outlier costs little, because $0.448$ is still a normal number. With an outlier of $10^5$, $s = 0.00448$, typical entries become $0.0045$, below the smallest normal $0.0156$, in the subnormal range with spacing $2^{-9} = 0.00195$: they are represented as $0.0039$ or $0.0059$, errors of $\pm30\%$ or more. With blocks of $128$ entries, only the block containing the outlier gets the small scale; the other seven blocks use $s = 448$ and keep full relative precision. This is the motivation for the fine-grained scaling of DeepSeek-V3 ([[#sec-formats]]).
:::
:::
