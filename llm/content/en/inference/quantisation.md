A decode step reads every weight of the model and every entry of the cache, and spends most of its time waiting for those bytes ([[inference/batching-serving#sec-intensity]]). Storing each number in fewer bits therefore helps three ways at once: the model fits on fewer devices, more cache fits beside it, and every step reads fewer bytes. A model with $70\times10^9$ parameters takes $140$ GB in bfloat16 but about $36$ GB at $4$ bits — the difference between two accelerators and one, and, for memory-bound decoding, close to a fourfold speed-up of the weight reads. **Quantisation** is the replacement of high-precision numbers by low-precision ones, chosen so that the model's outputs change as little as possible.

This chapter starts from the uniform quantiser and its error, $\Delta^2/12$ per number, and the choice of scales (per tensor, per channel, per group). It then treats **weight-only** quantisation, where the error of a whole layer can be minimised using calibration data — GPTQ's second-order compensation, derived from the optimal brain surgeon, and AWQ's activation-aware scaling — and **weight-and-activation** quantisation, where the outlier features of large models are the obstacle (LLM.int8(), SmoothQuant). It ends with quantised KV caches and the 8- and 4-bit floating-point formats of recent hardware. Every method is implemented in plain Python on small matrices with its error measured. Training in reduced precision is a different subject, treated in [[scaling/mixed-precision]].

## Uniform quantisation {#sec-uniform}

::: definition Uniform affine quantisation {#def-quant}
A **$k$-bit uniform quantiser** with **scale** $\Delta > 0$ and **zero point** $z\in\mathbb{Z}$ maps a real number $x$ to the integer

$$
q = \operatorname{clamp}\!\big(\operatorname{round}(x/\Delta) + z,\ q_{\min},\ q_{\max}\big)
$$

and represents it by $\hat x = \Delta(q - z)$. **Asymmetric** quantisation uses $q\in\{0,\dots,2^k - 1\}$ and a zero point chosen so that the range $[x_{\min}, x_{\max}]$ of the data is covered; **symmetric** quantisation uses $z = 0$ and $q\in\{-2^{k-1},\dots,2^{k-1} - 1\}$, with the **absmax** scale $\Delta = \max\lvert x\rvert/(2^{k-1} - 1)$ the simplest choice.
:::

Two errors arise. Values inside the range are **rounded** to the nearest grid point, an error of at most $\Delta/2$; values outside it are **clipped** to the end of the range. A larger range means less clipping but a coarser grid.

::: proposition The error of rounding {#prop-delta12}
If the rounding error $\epsilon = \hat x - x$ of an unclipped value is uniformly distributed on $[-\Delta/2, \Delta/2]$, then

$$
\E[\epsilon] = 0,\qquad \E[\epsilon^2] = \frac{\Delta^2}{12}.
$$ {#eq-delta12}

For a signal uniformly filling the range $[-A, A]$ quantised with $2^k$ levels ($\Delta = 2A/2^k$), the signal-to-quantisation-noise ratio is $2^{2k}$, about $6.02k$ decibels: each extra bit divides the noise power by $4$.
:::

::: proof
For $\epsilon$ uniform on $[-\Delta/2, \Delta/2]$, the density is $1/\Delta$, the mean is $0$ by symmetry, and $\E[\epsilon^2] = \frac1\Delta\int_{-\Delta/2}^{\Delta/2}\epsilon^2\,d\epsilon = \frac1\Delta\cdot\frac{2}{3}\Big(\frac\Delta2\Big)^3 = \frac{\Delta^2}{12}$. A signal uniform on $[-A, A]$ has power $\E[x^2] = A^2/3$; with $\Delta = 2A/2^k$ the noise power is $4A^2/(12\cdot2^{2k}) = A^2/(3\cdot2^{2k})$, so the ratio is $2^{2k}$, and $10\log_{10}2^{2k} = 20k\log_{10}2 = 6.02k$ dB.
:::

The uniform-error assumption is not a theorem about every input; it is accurate when the grid is fine compared with the scale on which the density of $x$ varies, so that within each cell $x$ is roughly uniformly placed. It fails for coarse grids and for values concentrated at grid points (zero, for instance). The listing below checks it for $8$-bit quantisation of uniform data: measured MSE $5.173\times10^{-6}$ against $\Delta^2/12 = 5.166\times10^{-6}$.

::: example Quantising four numbers to 4 bits {#ex-int4}
Quantise $\mathbf{x} = (0.9, -0.3, 0.05, -1.2)$ to symmetric $4$-bit integers with the absmax scale, using the levels $-7,\dots,7$. What are the reconstructed values and the mean squared error? Compare with $\Delta^2/12$.
::: solution
$\Delta = 1.2/7 = 0.1714$. Then $x/\Delta = (5.25, -1.75, 0.29, -7)$, rounding to $q = (5, -2, 0, -7)$ and $\hat{\mathbf{x}} = (0.857, -0.343, 0, -1.2)$. The errors are $(-0.043, -0.043, -0.05, 0)$ and the MSE is $(0.00184 + 0.00184 + 0.0025 + 0)/4 = 0.00154$. The formula gives $\Delta^2/12 = 0.00245$: with four numbers, one of which is exactly at a grid point (the absmax value always is), the uniform assumption is only a rough guide.
:::
:::

::: widget plot
f: min(max(s*round(x/s), -s*2^(b-1)), s*(2^(b-1)-1)); x
x: -1.5, 1.5
y: -1.5, 1.5
sliders: s=0.15:0.02:0.5:0.01; b=3:2:8:1
labels: quantised value $\hat x$; $x$
caption: A symmetric $b$-bit quantiser with step $\Delta = s$ (sliders). Inside the range, $\hat x$ is a staircase within $\Delta/2$ of $x$; outside it, values are clipped to the largest level. Shrinking $\Delta$ at fixed $b$ makes the steps finer but the range $[-2^{b-1}\Delta, (2^{b-1}-1)\Delta]$ narrower: the clipping–rounding trade-off.
:::

### Granularity: where the scales live {#sec-granularity}

One scale for a whole weight matrix (**per-tensor**) is cheap but forced to cover its largest entry; one outlier then coarsens the grid for millions of ordinary weights. Finer granularity uses more scales.

::: definition Per-tensor, per-channel and group-wise scales {#def-granularity}
For a weight matrix $W\in\mathbb{R}^{d_{\text{out}}\times d_{\text{in}}}$: **per-tensor** quantisation uses one scale; **per-channel** uses one scale for each output row; **group-wise** (block-wise) quantisation splits each row into groups of $g$ consecutive weights (commonly $g = 32$, $64$ or $128$) with one scale (and zero point, if asymmetric) per group. With scales stored in $b_s$ bits, group-wise quantisation costs

$$
k + \frac{b_s}{g}\ \text{bits per weight}
$$ {#eq-bits}

(plus $b_s/g$ again for a zero point).
:::

::: example The memory of a quantised model {#ex-memory}
A model has $70\times10^9$ parameters. Compute its weight memory in bfloat16, in int8 with per-channel scales (negligible overhead), and in int4 with groups of $128$ and 16-bit scales. Estimate the lower bound on decode time per token from weight reads at an aggregate $3.35$ TB/s.
::: solution
bfloat16: $140$ GB, $41.8$ ms per token. int8: $70$ GB, $20.9$ ms. int4 with $g = 128$: $4 + 16/128 = 4.125$ bits per weight, $70\times10^9\cdot4.125/8 = 36.1$ GB, $10.8$ ms. The int4 model fits on one $80$ GB accelerator with $44$ GB to spare for the cache; the bfloat16 model needs two. The speed-up of a memory-bound step is close to the reduction in bytes — provided the kernel can dequantise on the fly without becoming compute-bound, which is why low-bit kernels matter as much as the formats.
:::
:::

## Weight-only quantisation {#sec-weight-only}

The most common deployment quantises only the weights, to $8$, $4$ or $3$ bits ("W4A16"), keeping activations in 16 bits. Inside the matrix-multiply kernel the weights are loaded in low precision, converted to 16 bits in on-chip memory and multiplied in 16-bit arithmetic. This saves bandwidth and memory, not arithmetic — exactly what memory-bound decoding needs.

Rounding each weight to its nearest grid point (**round-to-nearest**, RTN) works well at $8$ bits and acceptably at $4$ with small groups, but at $3$–$4$ bits on large models it loses noticeable accuracy. The reason is that RTN minimises the error in each *weight*, while what matters is the error in each layer's *output*, $WX$, where $X$ are the layer's actual inputs. Errors in weights that multiply large or correlated inputs count more, and errors in one weight can be partly cancelled by adjusting others.

::: definition The layer-wise quantisation objective {#def-layerwise}
Given a linear layer $W\in\mathbb{R}^{d_{\text{out}}\times d_{\text{in}}}$ and calibration inputs $X\in\mathbb{R}^{d_{\text{in}}\times n}$ (the layer's inputs on $n$ tokens of representative text, typically a few hundred sequences), **layer-wise post-training quantisation** seeks quantised weights $\hat W$ on the grid minimising

$$
\lVert WX - \hat WX\rVert_F^2 = \sum_{r=1}^{d_{\text{out}}}(\mathbf{w}_r - \hat{\mathbf{w}}_r)\,H\,(\mathbf{w}_r - \hat{\mathbf{w}}_r)^\top,\qquad H = XX^\top.
$$ {#eq-layerwise}
:::

The objective separates over rows, each a quadratic form in the row's error with the same matrix $H$ — the Hessian of the loss up to a factor of $2$. Exact minimisation over the grid is an integer least-squares problem, NP-hard in general, so methods are greedy.

### GPTQ: quantise one column, compensate the rest {#sec-gptq}

The idea goes back to the **optimal brain surgeon** (Hassibi and Stork, 1993), which removed weights from a network and adjusted the others to compensate, using the inverse Hessian. Frantar and Alistarh's optimal brain quantisation (2022) applied it to quantisation, and **GPTQ** (Frantar, Ashkboos, Hoefler and Alistarh, 2023) made it fast enough for models with hundreds of billions of parameters.

::: proposition The optimal compensation {#prop-obs}
For one row, minimise $E(\boldsymbol\delta) = \boldsymbol\delta H\boldsymbol\delta^\top$ over changes $\boldsymbol\delta$ to the weights, subject to coordinate $j$ being moved to a fixed grid value: $\delta_j = \hat w_j - w_j =: -e_j$. If $H$ is positive definite, the minimiser and the minimum are

$$
\boldsymbol\delta^* = -\frac{e_j}{[H^{-1}]_{jj}}\,(H^{-1})_{j,:},\qquad E(\boldsymbol\delta^*) = \frac{e_j^2}{[H^{-1}]_{jj}}.
$$ {#eq-obs}

After coordinate $j$ is fixed, the same problem for the remaining coordinates has the inverse Hessian

$$
\big(H_{-j,-j}\big)^{-1} = (H^{-1})_{-j,-j} - \frac{(H^{-1})_{-j,j}\,(H^{-1})_{j,-j}}{[H^{-1}]_{jj}}.
$$ {#eq-schur}
:::

::: proof
Minimise $\boldsymbol\delta H\boldsymbol\delta^\top$ subject to $\boldsymbol\delta\mathbf{u}_j = -e_j$, where $\mathbf{u}_j$ is the $j$th unit column. The Lagrangian $\boldsymbol\delta H\boldsymbol\delta^\top - 2\lambda(\boldsymbol\delta\mathbf{u}_j + e_j)$ has gradient $2\boldsymbol\delta H - 2\lambda\mathbf{u}_j^\top = 0$, so $\boldsymbol\delta = \lambda\mathbf{u}_j^\top H^{-1} = \lambda(H^{-1})_{j,:}$. The constraint gives $\lambda[H^{-1}]_{jj} = -e_j$, hence $\boldsymbol\delta^*$. Then $E = \lambda^2(H^{-1})_{j,:}H(H^{-1})_{:,j} = \lambda^2[H^{-1}]_{jj} = e_j^2/[H^{-1}]_{jj}$. Since $E$ is a positive definite quadratic and the constraint is affine, this stationary point is the minimum. For the second claim: with $\delta_j$ fixed, the objective in the remaining coordinates is a quadratic with matrix $H_{-j,-j}$, and the formula for the inverse of a principal submatrix in terms of the full inverse (the Schur complement identity, [Maths Atlas](/learn/maths/) covers block inverses) is [[#eq-schur]].
:::

::: algorithm GPTQ (one layer) {#alg-gptq}
1. Collect $H = XX^\top$ from calibration inputs and add a small damping $\lambda I$ (for example $1\%$ of the mean diagonal) so that it is safely invertible.
2. Fix the scales of each row or group (for example by absmax). Compute $H^{-1}$.
3. For $j = 1,\dots,d_{\text{in}}$, in the **same order for every row**: quantise column $j$ of $W$ to the grid; compute the errors $e_j$ of all rows at once; update the not-yet-quantised columns $W_{:,k}\mathrel{-}= \frac{e_j}{[H^{-1}]_{jj}}[H^{-1}]_{jk}$ for $k > j$ ([[#eq-obs]]); remove $j$ from $H^{-1}$ ([[#eq-schur]]).
:::

Three engineering insights made this practical. First, Frantar et al. found that quantising columns in a fixed order performs almost as well as choosing, for each row, the column whose quantisation costs least; with a fixed order every row shares the same sequence of inverse Hessians, which are computed once for the whole layer instead of once per row. Second, the updates are applied lazily in blocks of $128$ columns to make them matrix–matrix operations. Third, all the needed rows of the successive inverse Hessians can be read from one Cholesky factorisation of $H^{-1}$, which is also numerically more stable than repeated updates. The paper quantised $175$-billion-parameter models to $3$ or $4$ bits in about four GPU hours, with small increases in perplexity at $4$ bits.

The listing quantises a $16\times32$ layer with correlated calibration inputs: at $4$ bits per row, GPTQ's relative output error is $0.0040$ against $0.0119$ for round-to-nearest, and at $3$ bits $0.0188$ against $0.0523$ — about three times lower for the same grid.

::: example One compensation step by hand {#ex-obs}
A row has weights $\mathbf{w} = (0.4, 0.3)$ and $H = \begin{pmatrix}2&1\\1&2\end{pmatrix}$. The grid has step $0.5$, so the first weight is rounded to $0.5$. What should the second weight become, and how much output error results, with and without compensation?
::: solution
$H^{-1} = \frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$, so $[H^{-1}]_{11} = 2/3$, $[H^{-1}]_{12} = -1/3$. The first weight's error is $\hat w_1 - w_1 = 0.1$, i.e. $e_1 = -0.1$. By [[#eq-obs]], $\delta_2 = -\frac{e_1}{2/3}\cdot(-\tfrac13) = -0.05$, so $w_2$ becomes $0.25$. The error is $e_1^2/[H^{-1}]_{11} = 0.01/(2/3) = 0.015$. Without compensation $\boldsymbol\delta = (0.1, 0)$ and $E = 0.1^2\cdot2 = 0.02$. The positive correlation of the two inputs ($H_{12} > 0$) means that rounding the first weight up can be partly offset by moving the second one down. The second weight is then itself rounded, to $0.5$ or $0$; the compensation has changed the target that it rounds from.
:::
:::

### AWQ: protect the weights that see large activations {#sec-awq}

Lin et al. (2024) made two observations. A small fraction of weights matters much more than the rest — the input channels whose *activations* are large — and keeping about $1\%$ of channels in 16 bits recovered much of the accuracy lost by $3$-bit RTN in their experiments. And this protection can be had without mixed precision, by scaling.

::: proposition Scaling a channel reduces its relative error {#prop-awq}
For input channel $j$ with scale factor $s_j > 0$, write the layer as $W\mathbf{x} = \big(W\operatorname{diag}(\mathbf{s})\big)\big(\operatorname{diag}(\mathbf{s})^{-1}\mathbf{x}\big)$ and quantise $W\operatorname{diag}(\mathbf{s})$. If the quantisation step $\Delta$ of the group containing $w_{rj}s_j$ is unchanged by the scaling, the output error contributed by weight $w_{rj}$ is divided by $s_j$.
:::

::: proof
Quantising $w_{rj}s_j$ gives $w_{rj}s_j + \epsilon$ with $\lvert\epsilon\rvert\le\Delta/2$. This multiplies $x_j/s_j$, so its contribution to the output is $(w_{rj}s_j + \epsilon)x_j/s_j = w_{rj}x_j + \epsilon x_j/s_j$: an error $\epsilon x_j/s_j$, which for the same $\Delta$ is $1/s_j$ of the error $\epsilon x_j$ without scaling.
:::

The assumption fails if $s_j$ is so large that $w_{rj}s_j$ becomes the group's maximum and inflates $\Delta$ for every other weight in the group. AWQ balances the two effects by a one-parameter search: with $\bar a_j$ the mean magnitude of channel $j$'s activations on calibration data, it sets $s_j = \bar a_j^{\,\alpha}$ and picks $\alpha\in[0, 1]$ on a grid to minimise the output error of the quantised layer. The scaling $\operatorname{diag}(\mathbf{s})^{-1}$ of the activations is folded into the preceding operation (a normalisation layer's weights or the previous linear layer), so it costs nothing at inference. AWQ needs no second-order information and no weight updates, uses a small calibration set and, the authors argued, overfits it less. In the listing's $3$-bit layer, $\alpha = 0.25$ lowers the output error from $0.0523$ to $0.0462$, while $\alpha = 1$ more than doubles it: too much scaling inflates the steps of the other weights.

::: warning "4-bit quantisation is lossless"
Reported results for well-tuned $4$-bit weight quantisation of large models often show small changes in perplexity and in average benchmark scores, but "small on average" is not "none". Losses tend to be larger for smaller models, for $3$ bits and below, and — in several published evaluations — for long-context retrieval, multilingual text, code and multi-step reasoning than for the averages suggest. Perplexity on general web text is a weak proxy. Evaluate a quantised model on the tasks it will serve, against the 16-bit model, with enough examples to detect the difference you care about ([[evaluation/evaluation-statistics]]).
:::

## Quantising activations: outliers {#sec-outliers}

To use 8-bit integer arithmetic — and not only 8-bit storage — the activations must be quantised too ("W8A8"). Activations are harder than weights: they change with every input, so their scales must be computed on the fly or fixed from calibration, and in large Transformers they contain **outlier features**.

Dettmers et al. (2022) found that, in the models they studied, a small number of hidden dimensions take values far larger than the rest — up to about $20$ times in magnitude — in most tokens and most layers, and that these features emerge rather suddenly as models grow, around $6.7$ billion parameters in their study. Per-tensor activation quantisation then wastes almost the whole grid on the outliers, and the remaining features are rounded to a handful of levels. Their **LLM.int8()** method quantises activations per row (token) and weights per column, and handles the outlier dimensions (activation magnitude above a threshold of $6$) separately: those few columns of $X$ and rows of $W$ are multiplied in 16 bits, everything else in int8. With this decomposition they reported no degradation in perplexity or zero-shot accuracy up to $175$ billion parameters, at the cost of a slower mixed-precision kernel.

**SmoothQuant** (Xiao et al., 2023) moves the difficulty instead of isolating it.

::: proposition Smoothing is exact {#prop-smooth}
For any positive vector $\mathbf{s}\in\mathbb{R}^{d}$, $XW = \big(X\operatorname{diag}(\mathbf{s})^{-1}\big)\big(\operatorname{diag}(\mathbf{s})W\big)$, where $X$ is $(T, d)$ and $W$ is $(d, d_{\text{out}})$. With

$$
s_j = \frac{\max_t\lvert X_{tj}\rvert^{\alpha}}{\max_k\lvert W_{jk}\rvert^{1 - \alpha}},
$$ {#eq-smooth}

channel $j$ of the smoothed activations and row $j$ of the smoothed weights have the maxima $\max\lvert X_{:j}\rvert^{1-\alpha}\max\lvert W_{j:}\rvert^{1-\alpha}$ and $\max\lvert X_{:j}\rvert^{\alpha}\max\lvert W_{j:}\rvert^{\alpha}$; for $\alpha = \tfrac12$ both equal $\sqrt{\max\lvert X_{:j}\rvert\max\lvert W_{j:}\rvert}$.
:::

::: proof
$\operatorname{diag}(\mathbf{s})^{-1}\operatorname{diag}(\mathbf{s}) = I$, so the product is unchanged in exact arithmetic. Dividing column $j$ of $X$ by $s_j$ gives maximum $\max\lvert X_{:j}\rvert/s_j = \max\lvert X_{:j}\rvert^{1-\alpha}\max\lvert W_{j:}\rvert^{1-\alpha}$; multiplying row $j$ of $W$ by $s_j$ gives $\max\lvert W_{j:}\rvert\,s_j = \max\lvert X_{:j}\rvert^{\alpha}\max\lvert W_{j:}\rvert^{\alpha}$. At $\alpha = \tfrac12$ both are the geometric mean.
:::

Outlier channels of $X$ are divided down and the corresponding rows of $W$ — which are easy to quantise, having no outliers — are multiplied up, until both sides are moderately hard. Like AWQ's scales, $\operatorname{diag}(\mathbf{s})^{-1}$ is folded offline into the preceding layer. Xiao et al. used $\alpha$ around $0.5$ for most models and reported W8A8 accuracy matching 16 bits on models up to $530$ billion parameters, with real speed-ups from int8 matrix multiplication. In the listing, a $64\times64$ layer with two activation channels $40$ times larger than the rest has relative output error $1.6\times10^{-3}$ under W8A8 with per-tensor activation scales, and $8.3\times10^{-5}$ after smoothing with $\alpha = 0.5$ — twenty times smaller.

::: example Choosing a smoothing factor {#ex-smooth}
An activation channel has maximum magnitude $64$ over the calibration tokens, and the matching row of the weight matrix has maximum $0.25$. Compute $s_j$ for $\alpha = 0.5$ and the new maxima. With per-tensor scales, what happens to the int8 step size of the activations if this was the largest channel and the next largest has maximum $4$?
::: solution
$s_j = 64^{0.5}/0.25^{0.5} = 8/0.5 = 16$. The activation channel's maximum becomes $64/16 = 4$, the weight row's $0.25\cdot16 = 4$. If the next largest activation channel has maximum $4$, the per-tensor activation maximum falls from $64$ to $4$ (assuming the other channels' smoothing does not raise it), so the int8 step $\max/127$ shrinks by a factor of $16$, from $0.50$ to $0.031$: every ordinary activation is represented $16$ times more finely. The weight row now has a larger range, but weights are quantised per output channel and had room to spare.
:::
:::

::: quiz
A model is quantised to W4A16 (4-bit weights, 16-bit activations). Which effects should you expect when serving it? (Select all that apply.)
- [x] Less memory for weights, leaving more room for the KV cache
- [x] Faster memory-bound decode steps, if the kernel dequantises efficiently
- [ ] Fewer floating-point operations per token
- [ ] A smaller KV cache per token
::: solution
Weight-only quantisation shrinks the bytes of the weights, which frees memory and shortens memory-bound steps. The arithmetic is still done in 16 bits on dequantised weights, so the FLOPs are unchanged (compute-bound prefill gains little). The cache is produced from 16-bit activations and is unaffected unless it is quantised separately.
:::
:::

## Quantising the cache {#sec-kv-quant}

The KV cache can dominate memory and bandwidth at long contexts and large batches ([[inference/kv-cache#prop-batch-kv]]), and halving its bytes halves both. 8-bit caches, integer or floating-point, are widely supported by serving engines as of 2026 and usually cost little accuracy. Going to $4$ or $2$ bits requires respecting the cache's structure. Keys, like activations, have outlier *channels* — a few dimensions are large in every token — while values do not. KIVI (Liu et al., 2024) therefore quantised keys **per channel** (one scale per dimension, over a group of tokens) and values **per token**, keeping the most recent tokens in full precision until a group is complete, and reported $2$-bit caches with small accuracy losses on the models and tasks it tested; KVQuant (Hooper et al., 2024) added, among other things, quantisation of keys before RoPE is applied. These are research results whose robustness across models and tasks is still being established.

The reason for per-channel keys is easy to check: with two outlier channels $15$ times larger than the rest, $4$-bit per-token quantisation of keys gives a relative error of $0.43$ *on the ordinary channels* (each token's scale is set by its outliers), against $0.016$ for per-channel scales ([[#exr-kv]]).

## Low-bit floating-point formats {#sec-fp8}

Integers space their levels evenly. Floating-point formats space them geometrically: a fixed number of mantissa bits gives roughly constant *relative* precision over a wide range of magnitudes. For bell-shaped data with many small values that is often the better trade.

::: definition FP8, FP4 and microscaling formats {#def-fp8}
- **E4M3** and **E5M2** (Micikevicius et al., 2022) are 8-bit floating-point formats with $4$ exponent and $3$ mantissa bits, or $5$ and $2$. E4M3 has exponent bias $7$, reaches $\pm448$ and has no infinities; E5M2 follows IEEE conventions and reaches $\pm57{,}344$. E4M3 is typically used for weights and activations, E5M2 for gradients in training.
- **E2M1** is a 4-bit floating-point format whose non-negative values are $0, 0.5, 1, 1.5, 2, 3, 4, 6$.
- **Microscaling** (MX) formats (Open Compute Project specification, 2023) store blocks of $32$ low-bit elements (FP8, FP6, FP4 or INT8) with one shared 8-bit power-of-two scale; **MXFP4** uses E2M1 elements. A vendor variant introduced in 2025, NVFP4, uses blocks of $16$ E2M1 elements with an E4M3 scale per block and a 32-bit scale per tensor.
:::

Hardware support is what makes a format useful for speed rather than only storage. As of 2026, FP8 matrix multiplication is supported by the data-centre GPUs introduced from 2022 onwards (for example NVIDIA's H100 and AMD's MI300 series), and 4-bit floating-point arithmetic by generations introduced from 2024–2025; integer int8 arithmetic is older and widespread. A storage format without matching arithmetic can still save memory and bandwidth through dequantisation in the kernel, as weight-only int4 does.

::: widget floatline
p: 4
emin: -2
emax: 3
value: 1.3
caption: A toy floating-point system with $4$ significand bits (the $3$ stored mantissa bits of E4M3 plus the implicit leading one), shown for exponents $-2$ to $3$ only. The gaps double from one power of two to the next: relative precision is roughly constant (about $2^{-4}$, half the gap $2^{-3}$ at $1$), while an integer grid has constant absolute gaps. Real E4M3 spans exponents $-6$ to $8$, plus subnormals.
:::

In the listing, data drawn from a standard normal distribution and scaled so that its maximum maps to the format's maximum have a lower overall MSE in int8 ($9.8\times10^{-5}$) than in E4M3 ($6.9\times10^{-4}$): int8 spreads its $256$ levels evenly over the range where the values lie, while E4M3 spends many of its codes on magnitudes far smaller than almost all of the data; but for values below $0.1$ in magnitude the mean relative error is $33\%$ in int8 and $2.3\%$ in E4M3. Which matters more depends on whether the small values matter — and for activations with occasional large values, which would otherwise force a coarse integer grid, floating point is often more forgiving.

## Implementing it {#sec-code}

The listing implements the uniform quantiser and the methods of this chapter in plain Python: the $\Delta^2/12$ check, four granularities on a weight matrix with uneven row scales and rare large weights, GPTQ against round-to-nearest, an AWQ-style scale search, W8A8 with and without SmoothQuant, and an emulation of E4M3.

```python
import math, random
rng = random.Random(0)

def quantise(x, bits, scale, zero=0):       # uniform affine: q = clamp(round(x/scale)+zero), x^ = scale*(q-zero)
    lo, hi = -(2 ** (bits - 1)) if zero == 0 else 0, (2 ** (bits - 1) - 1) if zero == 0 else 2 ** bits - 1
    q = max(lo, min(hi, round(x / scale) + zero))
    return scale * (q - zero)
def absmax_scale(xs, bits): return max(abs(x) for x in xs) / (2 ** (bits - 1) - 1)
def mse(a, b): return sum((x - y) ** 2 for x, y in zip(a, b)) / len(a)

# (1) the rounding error of a fine grid is uniform: MSE = scale^2 / 12
xs = [rng.uniform(-1, 1) for _ in range(100000)]
s = absmax_scale(xs, 8)
print(f"int8 per-tensor: MSE {mse(xs, [quantise(x, 8, s) for x in xs]):.3e}, scale^2/12 {s * s / 12:.3e}")

# (2) granularity: a 64x256 weight matrix whose rows have different scales, plus a few outliers
W = [[rng.gauss(0, 0.02 * (1 + 3 * (r % 4 == 0))) for _ in range(256)] for r in range(64)]
for _ in range(8): W[rng.randrange(64)][rng.randrange(256)] = 0.5      # rare large weights
flat = [w for row in W for w in row]
def q_tensor(W, bits):
    s = absmax_scale(flat, bits); return [[quantise(w, bits, s) for w in row] for row in W]
def q_channel(W, bits):
    return [[quantise(w, bits, absmax_scale(row, bits)) for w in row] for row in W]
def q_group(W, bits, g):
    out = []
    for row in W:
        r = []
        for i in range(0, len(row), g):
            s = absmax_scale(row[i:i + g], bits); r += [quantise(w, bits, s) for w in row[i:i + g]]
        out.append(r)
    return out
for name, Q in [("per-tensor", q_tensor(W, 4)), ("per-channel", q_channel(W, 4)),
                ("group 128", q_group(W, 4, 128)), ("group 32", q_group(W, 4, 32))]:
    e = mse(flat, [w for row in Q for w in row])
    print(f"int4 {name:11s}: weight MSE {e:.3e}  (relative {e / mse(flat, [0] * len(flat)):.4f})")

# (3) GPTQ versus round-to-nearest on one layer, with correlated calibration inputs
d_in, d_out, n = 32, 16, 512
A = [[rng.gauss(0, 1) for _ in range(d_in)] for _ in range(d_in)]
Z = [[rng.gauss(0, 1) for _ in range(n)] for _ in range(d_in)]
X = [[sum(A[i][k] * Z[k][c] for k in range(d_in)) * (4 if i < 2 else 1) for c in range(n)]
     for i in range(d_in)]                                           # (d_in, n): correlated features
Wl = [[rng.gauss(0, 1) for _ in range(d_in)] for _ in range(d_out)]  # (d_out, d_in)
def matmul(A, B): return [[sum(a * b for a, b in zip(r, c)) for c in zip(*B)] for r in A]
def inverse(M):                                                       # Gauss-Jordan
    m = len(M); A = [row[:] + [float(i == j) for j in range(m)] for i, row in enumerate(M)]
    for c in range(m):
        p = max(range(c, m), key=lambda r: abs(A[r][c])); A[c], A[p] = A[p], A[c]
        piv = A[c][c]; A[c] = [v / piv for v in A[c]]
        for r in range(m):
            if r != c and A[r][c] != 0:
                f = A[r][c]; A[r] = [a - f * b for a, b in zip(A[r], A[c])]
    return [row[m:] for row in A]
H = matmul(X, list(map(list, zip(*X))))                                # X X^T, (d_in, d_in)
damp = 0.01 * sum(H[i][i] for i in range(d_in)) / d_in
Hinv0 = inverse([[H[i][j] + damp * (i == j) for j in range(d_in)] for i in range(d_in)])
def gptq_row(w, bits):
    s = absmax_scale(w, bits); w = w[:]; Hi = [r[:] for r in Hinv0]; q = [0.0] * len(w)
    for j in range(len(w)):
        q[j] = quantise(w[j], bits, s)
        err = (w[j] - q[j]) / Hi[j][j]
        for k in range(j + 1, len(w)): w[k] -= err * Hi[j][k]          # compensate the remaining weights
        hj = Hi[j][:]                                                  # remove coordinate j from H^-1
        Hi = [[Hi[a][b] - Hi[a][j] * hj[b] / hj[j] for b in range(len(w))] for a in range(len(w))]
    return q
def out_err(Wq):
    Y, Yq = matmul(Wl, X), matmul(Wq, X)
    return sum((a - b) ** 2 for r1, r2 in zip(Y, Yq) for a, b in zip(r1, r2)) / sum(a * a for r in Y for a in r)
for bits in (4, 3):
    rtn = [[quantise(w, bits, absmax_scale(row, bits)) for w in row] for row in Wl]
    gq = [gptq_row(row, bits) for row in Wl]
    print(f"{bits}-bit per-row: relative output error RTN {out_err(rtn):.4f}, GPTQ {out_err(gq):.4f}")

# (4) AWQ-style scaling: protect input channels with large activations, search the exponent
act = [sum(abs(v) for v in X[i]) / n for i in range(d_in)]           # mean |x| per input channel
for alpha in (0.0, 0.25, 0.5, 0.75, 1.0):
    sc = [a ** alpha for a in act]
    Ws = [[w * sc[j] for j, w in enumerate(row)] for row in Wl]        # W diag(s)
    Qs = [[quantise(w, 3, absmax_scale(row, 3)) / sc[j] for j, w in enumerate(row)] for row in Ws]
    print(f"AWQ alpha={alpha:.2f}: 3-bit relative output error {out_err(Qs):.4f}")

# (5) activation outliers: W8A8 per-tensor activations, with and without SmoothQuant
T, d = 64, 64
Xa = [[rng.gauss(0, 1) * (40 if j in (3, 17) else 1) for j in range(d)] for _ in range(T)]   # (T, d)
Wa = [[rng.gauss(0, 0.1) for _ in range(d)] for _ in range(d)]                              # (d_in, d_out)
def w8a8(X, W):
    sx = absmax_scale([v for r in X for v in r], 8)
    Xq = [[quantise(v, 8, sx) for v in r] for r in X]
    Wq = [[quantise(W[i][j], 8, absmax_scale([W[k][j] for k in range(len(W))], 8))
           for j in range(len(W[0]))] for i in range(len(W))]          # per output channel
    return matmul(Xq, Wq)
Y = matmul(Xa, Wa)
def rel(Yq): return sum((a - b) ** 2 for r1, r2 in zip(Y, Yq) for a, b in zip(r1, r2)) / sum(a * a for r in Y for a in r)
mx = [max(abs(Xa[t][j]) for t in range(T)) for j in range(d)]     # per input channel
mw = [max(abs(v) for v in Wa[j]) for j in range(d)]
for alpha in (None, 0.5, 0.8):
    s = [1.0] * d if alpha is None else [mx[j] ** alpha / mw[j] ** (1 - alpha) for j in range(d)]
    Xs = [[Xa[t][j] / s[j] for j in range(d)] for t in range(T)]       # X diag(s)^-1
    Ws = [[Wa[j][k] * s[j] for k in range(d)] for j in range(d)]       # diag(s) W
    print(f"W8A8 smoothing alpha={alpha}: relative output error {rel(w8a8(Xs, Ws)):.2e}")

# (6) fp8 E4M3 against int8 on bell-shaped data: relative versus absolute error
def e4m3(x):
    if x == 0: return 0.0
    e = max(math.floor(math.log2(abs(x))), -6)                         # subnormals below 2^-6
    step = 2.0 ** (e - 3)                                              # 3 mantissa bits
    return max(-448.0, min(448.0, round(x / step) * step))
g = [rng.gauss(0, 1) for _ in range(50000)]
s8 = absmax_scale(g, 8); s_fp = max(abs(v) for v in g) / 448
for name, f in [("int8 absmax", lambda v: quantise(v, 8, s8)), ("fp8 e4m3", lambda v: s_fp * e4m3(v / s_fp))]:
    small = [v for v in g if abs(v) < 0.1]
    print(f"{name:11s}: MSE {mse(g, [f(v) for v in g]):.2e}, "
          f"mean relative error on |x|<0.1: {sum(abs(f(v) - v) / abs(v) for v in small) / len(small):.3f}")
```

Output:

```
int8 per-tensor: MSE 5.173e-06, scale^2/12 5.166e-06
int4 per-tensor : weight MSE 3.458e-04  (relative 0.1690)
int4 per-channel: weight MSE 7.138e-05  (relative 0.0349)
int4 group 128  : weight MSE 4.698e-05  (relative 0.0230)
int4 group 32   : weight MSE 2.374e-05  (relative 0.0116)
4-bit per-row: relative output error RTN 0.0119, GPTQ 0.0040
3-bit per-row: relative output error RTN 0.0523, GPTQ 0.0188
AWQ alpha=0.00: 3-bit relative output error 0.0523
AWQ alpha=0.25: 3-bit relative output error 0.0462
AWQ alpha=0.50: 3-bit relative output error 0.0527
AWQ alpha=0.75: 3-bit relative output error 0.0702
AWQ alpha=1.00: 3-bit relative output error 0.1157
W8A8 smoothing alpha=None: relative output error 1.63e-03
W8A8 smoothing alpha=0.5: relative output error 8.25e-05
W8A8 smoothing alpha=0.8: relative output error 1.06e-04
int8 absmax: MSE 9.83e-05, mean relative error on |x|<0.1: 0.333
fp8 e4m3   : MSE 6.89e-04, mean relative error on |x|<0.1: 0.023
```

With one scale for the whole matrix, the eight weights of $0.5$ set a $4$-bit step of $0.071$, larger than most weights, which are then rounded to zero: $17\%$ relative error. Per-channel scales cut it fivefold, and groups of $32$ another threefold, at $0.5$ extra bits per weight for 16-bit scales. GPTQ beats round-to-nearest on the same grid by a factor of about three; the AWQ search finds a modest gain at small $\alpha$ and shows how quickly over-scaling hurts. ($\alpha = 0$ is round-to-nearest.) Real methods are applied layer by layer to a whole model, feeding each layer the outputs of the already-quantised layers before it, and are judged by the model's accuracy, not the layer error.

::: application Quantisation in practice
As of 2026, open-weight models are widely distributed in quantised forms: 8-bit and FP8 for data-centre serving, 4-bit weight-only (GPTQ, AWQ and related methods) for single-accelerator serving, and a family of mixed 2–8-bit block formats used by llama.cpp (from 2023) for running models on laptops and phones. Quantisation also enables fine-tuning large models on small hardware: QLoRA (Dettmers et al., 2023) trained low-rank adapters ([[post-training/parameter-efficient-tuning]]) on top of a frozen 4-bit base model stored in a format (NF4) whose levels are placed at quantiles of a normal distribution.
:::

::: history
Quantisation is as old as digital signal processing: Bennett (1948) derived the $\Delta^2/12$ noise of fine uniform quantisers, and Lloyd (1957, published 1982) and Max (1960) derived optimal non-uniform quantisers. In deep learning, 8-bit inference of convolutional networks became standard after Jacob et al. (2018) described integer-only arithmetic with affine quantisation. LeCun, Denker and Solla (1990) and Hassibi and Stork (1993) used second-order information to prune networks, the idea behind GPTQ (Frantar, Ashkboos, Hoefler and Alistarh, ICLR 2023). Dettmers, Lewis, Belkada and Zettlemoyer described outlier features and LLM.int8() (NeurIPS 2022); Xiao, Lin, Seznec, Wu, Demouth and Han proposed SmoothQuant (ICML 2023); Lin and colleagues proposed AWQ (MLSys 2024). Micikevicius and colleagues from NVIDIA, Arm and Intel proposed the FP8 formats in 2022, and the Open Compute Project published the microscaling specification in 2023.
:::

::: summary
- A $k$-bit **uniform quantiser** rounds to a grid of step $\Delta$ and clips outside its range; fine rounding has MSE $\Delta^2/12$, and each bit gains about $6$ dB.
- **Granularity** trades overhead for accuracy: per-tensor scales are wrecked by outliers; per-channel and group-wise scales ($g = 32$–$128$) cost a fraction of a bit per weight.
- **Weight-only** quantisation saves bandwidth for memory-bound decoding. **GPTQ** minimises the layer's output error $\lVert WX - \hat WX\rVert_F^2$ column by column, compensating with the inverse Hessian; **AWQ** scales up input channels with large activations before rounding.
- **Activation** quantisation must handle **outlier features**: LLM.int8() splits them out into 16 bits; **SmoothQuant** moves their scale into the weights by an exact rescaling.
- The **KV cache** can be quantised to 8 bits routinely; lower bit widths need per-channel keys and per-token values.
- **FP8** (E4M3, E5M2) and **FP4** with block scales give roughly constant relative precision; their benefit for speed depends on hardware support. Always evaluate a quantised model on its real tasks.
:::

## Exercises

::: exercise The noise of an int8 grid {level=1 check="2.083e-6"}
A weight tensor has maximum magnitude $0.635$ and is quantised to symmetric int8 with the absmax scale (levels up to $127$). What is the predicted mean squared rounding error? Give four significant figures.
::: solution
$\Delta = 0.635/127 = 0.005$, and $\Delta^2/12 = 2.5\times10^{-5}/12 = 2.083\times10^{-6}$.
:::
:::

::: exercise Bits per weight {level=1 check="4.5"}
Weights are quantised to $4$ bits asymmetrically in groups of $64$, each group with a 16-bit scale and a 16-bit zero point. How many bits per weight is that?
::: solution
$4 + (16 + 16)/64 = 4.5$ bits per weight.
:::
:::

::: exercise A quantised model's size {level=1 check="36.09"}
A model with $70\times10^9$ parameters is stored at $4.125$ bits per weight. How many gigabytes ($10^9$ bytes) is that, to two decimal places?
::: solution
$70\times10^9\cdot4.125/8 = 3.609\times10^{10}$ bytes $= 36.09$ GB.
:::
:::

::: exercise The MSE of a small vector {level=2 check="1.543e-3"}
For [[#ex-int4]], compute the mean squared error exactly, to four significant figures.
::: solution
Errors: $0.9 - 6/7 = 0.042857$, $-0.3 + 2.4/7 = 0.042857$, $0.05$, $0$. Squares: $0.0018367$, $0.0018367$, $0.0025$, $0$; sum $0.0061735$; mean $1.543\times10^{-3}$.
:::
:::

::: exercise Compensation in two dimensions {level=2 check="0.25"}
In [[#ex-obs]], verify by direct minimisation (without the formula) that, with $\hat w_1 = 0.5$ fixed, the value of $w_2$ minimising $(\boldsymbol\delta)H(\boldsymbol\delta)^\top$ is $0.25$.
::: solution
With $\delta_1 = 0.1$ and $\delta_2 = w_2 - 0.3$: $E = 2\delta_1^2 + 2\delta_1\delta_2 + 2\delta_2^2$. Setting $\partial E/\partial\delta_2 = 2\delta_1 + 4\delta_2 = 0$ gives $\delta_2 = -\delta_1/2 = -0.05$, so $w_2 = 0.25$, and $E = 0.02 - 0.01 + 0.005 = 0.015$, as the formula predicted.
:::
:::

::: exercise A smoothing factor {level=2 check="16"}
Using [[#eq-smooth]] with $\alpha = 0.5$, find $s_j$ for an activation channel with maximum $64$ and a weight row with maximum $0.25$.
::: solution
$s_j = \sqrt{64}/\sqrt{0.25} = 8/0.5 = 16$; both maxima become $4$ ([[#ex-smooth]]).
:::
:::

::: exercise The largest E4M3 number {level=2 check="448"}
E4M3 has exponent bias $7$; the all-ones exponent field is used for ordinary numbers except when the mantissa is also all ones, which encodes NaN. What is the largest finite value?
::: solution
The largest exponent field is $15$, giving $2^{15 - 7} = 2^8 = 256$. With exponent field $15$ the mantissa $111$ is NaN, so the largest mantissa is $110$, a significand of $1 + \tfrac12 + \tfrac14 = 1.75$. The largest value is $1.75\cdot256 = 448$. (E5M2 keeps IEEE infinities, so its largest finite value is $1.75\cdot2^{15} = 57{,}344$.)
:::
:::

::: exercise Signal-to-noise per bit {level=2}
A signal is Gaussian with standard deviation $\sigma$ and is quantised uniformly with range $[-4\sigma, 4\sigma]$ (ignore clipping). Using $\Delta^2/12$, compute the SQNR in decibels at $4$ and $8$ bits, and explain why it is lower than $6.02k$ dB.
::: solution
$\Delta = 8\sigma/2^k$, so the noise is $64\sigma^2/(12\cdot2^{2k})$ and SQNR $= 12\cdot2^{2k}/64 = 0.1875\cdot2^{2k}$. In decibels, $6.02k - 7.27$: $16.8$ dB at $4$ bits and $40.9$ dB at $8$ bits. The $6.02k$ rule assumed a signal filling the range uniformly; a Gaussian concentrates near zero and uses the outer levels rarely, so its power ($\sigma^2$) is small relative to the range ($A^2/3 = 5.33\sigma^2$ for a uniform on $[-4\sigma, 4\sigma]$), costing $10\log_{10}5.33 = 7.27$ dB.
:::
:::

::: exercise The best clipping range {level=3}
For standard normal data and a symmetric $4$-bit grid with levels $-7,\dots,7$, find by simulation (plain Python, seeded, $200{,}000$ samples) the clipping value $c$ (in steps of $0.05\sigma$ between $1$ and $5$) that minimises the total MSE, and compare with the absmax choice.
::: solution
```python
import random
rng = random.Random(0)
xs = [rng.gauss(0, 1) for _ in range(200000)]
def mse_clip(c, bits=4):
    s = c / (2 ** (bits - 1) - 1)
    return sum((x - s * max(-(2 ** (bits - 1) - 1), min(2 ** (bits - 1) - 1, round(x / s)))) ** 2 for x in xs) / len(xs)
best = min((mse_clip(c / 20), c / 20) for c in range(20, 101))
print(f"absmax clip {max(map(abs, xs)):.2f}: MSE {mse_clip(max(map(abs, xs))):.4f}")
print(f"best clip {best[1]:.2f} sigma: MSE {best[0]:.4f}")
```

Output:

```
absmax clip 4.53: MSE 0.0351
best clip 2.45 sigma: MSE 0.0128
```

Clipping at about $2.45\sigma$ gives an MSE $2.7$ times lower than absmax at $4.53\sigma$: the rare clipped values cost less than the coarser grid would cost every value. The optimum moves outward with more bits (the grid's cost falls by $4$ per bit while the clipping cost does not), which is why absmax is fine at $8$ bits and poor at $4$. Absmax has another flaw: its range depends on the single largest sample, so it grows with the sample size.
:::
:::

::: exercise Per-channel keys {#exr-kv level=3}
Generate $256$ "keys" of dimension $64$ from a standard normal distribution, with channels $5$ and $40$ multiplied by $15$. Quantise them to $4$ bits (levels $-7,\dots,7$, absmax) with one scale per token and with one scale per channel, and report the relative error overall and on the $62$ ordinary channels. Explain the result, and why values are usually quantised per token.
::: solution
```python
import random
rng = random.Random(1)
T, d = 256, 64
# keys with two outlier channels (large in every token), values without
K = [[rng.gauss(0, 1) * (15 if j in (5, 40) else 1) for j in range(d)] for _ in range(T)]
def q(x, s, bits=4):
    m = 2 ** (bits - 1) - 1
    return s * max(-m, min(m, round(x / s)))
def per_token(M):    # one scale per row (token)
    return [[q(v, max(map(abs, r)) / 7) for v in r] for r in M]
def per_channel(M):  # one scale per column (channel)
    cols = list(zip(*M)); sc = [max(map(abs, c)) / 7 for c in cols]
    return [[q(v, sc[j]) for j, v in enumerate(r)] for r in M]
def rel(A, B): return sum((a - b) ** 2 for r1, r2 in zip(A, B) for a, b in zip(r1, r2)) / sum(a * a for r in A for a in r)
def rel_small(A, B):   # error on the ordinary (non-outlier) channels only
    num = sum((A[t][j] - B[t][j]) ** 2 for t in range(T) for j in range(d) if j not in (5, 40))
    den = sum(A[t][j] ** 2 for t in range(T) for j in range(d) if j not in (5, 40))
    return num / den
for name, f in [("per-token", per_token), ("per-channel", per_channel)]:
    Kq = f(K)
    print(f"4-bit keys {name:11s}: relative error {rel(K, Kq):.4f}, on ordinary channels {rel_small(K, Kq):.4f}")
```

Output:

```
4-bit keys per-token  : relative error 0.0574, on ordinary channels 0.4291
4-bit keys per-channel: relative error 0.0132, on ordinary channels 0.0156
```

Per token, every token's scale is set by its outlier channels (about $15$ times larger), so the ordinary channels — which determine most of the attention pattern's detail — get a step comparable to their own size and lose $43\%$ of their energy to error; the overall figure, dominated by the outliers' energy, hides this. Per channel, each channel gets a scale fitted to it. Values have no consistent outlier channels, and each output is a weighted sum over tokens of value vectors, so per-token scales (which can be computed as each token arrives) work well for them; per-channel scales for keys need a group of tokens to be collected first, which is why KIVI keeps the most recent tokens in full precision.
:::
:::
