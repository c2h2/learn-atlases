Every number in a neural network is stored in a finite number of bits, and the fewer bits, the cheaper everything becomes. A 16-bit number takes half the memory of a 32-bit one, half the bandwidth to move, and — because matrix units can pack more small multipliers into the same silicon — the arithmetic runs several times faster: an H100's dense bf16 tensor-core throughput is about fifteen times its rate for ordinary (non-tensor-core) fp32 arithmetic, and fp8 doubles it again ([[scaling/accelerators]]). Large language models have been trained in 16-bit formats since about 2018, and in 8-bit formats for much of their arithmetic since 2023–2024. The price is numerical: fewer bits mean a coarser grid of representable values and a narrower range, so small updates vanish, large activations overflow and long sums drift.

This chapter is about paying that price safely. It defines binary floating-point formats exactly and derives their range and precision; proves the rounding error bounds that explain which operations need more bits; derives why loss scaling works and why bf16 makes it unnecessary; defines the two fp8 formats and the scaling schemes that make them usable; proves that stochastic rounding is unbiased and shows what it buys; and closes with quantisation-aware training. The basics — the three common formats, the fp32 master copy, why updates below half a unit in the last place are lost, and simple loss scaling — are in [[neural-networks/training-practice]]; stability problems that low precision can trigger are in [[pretraining/training-stability]].

## Floating-point formats {#sec-formats}

::: definition Binary floating-point format {#def-float}
A binary floating-point format with $e$ exponent bits and $m$ stored mantissa bits, with exponent **bias** $b = 2^{e-1} - 1$, encodes a sign $s$, a biased exponent field $E\in\{0,\dots,2^e - 1\}$ and a fraction $f\in\{0,\dots,2^m - 1\}$. In the IEEE 754 convention:

- $0 < E < 2^e - 1$: a **normal** number $(-1)^s\,(1 + f/2^m)\,2^{E - b}$;
- $E = 0$: a **subnormal** number $(-1)^s\,(f/2^m)\,2^{1 - b}$ (zero when $f = 0$);
- $E = 2^e - 1$: infinity ($f = 0$) or NaN ($f\ne0$).

The **precision** is $p = m + 1$ significand bits, the **unit roundoff** under round-to-nearest is $u = 2^{-p} = 2^{-(m+1)}$, and the gap between $1$ and the next larger number is $2u = 2^{-m}$.
:::

::: proposition Range of a format {#prop-range}
In the IEEE convention the largest finite value is $(2 - 2^{-m})\,2^{b}$, the smallest positive normal value is $2^{1 - b}$, and the smallest positive subnormal is $2^{1 - b - m}$. For the common formats:

| format | $e/m$ | largest finite | smallest normal | smallest subnormal | $u$ |
|---|---|---|---|---|---|
| fp32 | $8/23$ | $3.40\times10^{38}$ | $1.18\times10^{-38}$ | $1.4\times10^{-45}$ | $6.0\times10^{-8}$ |
| fp16 | $5/10$ | $65{,}504$ | $6.10\times10^{-5}$ | $5.96\times10^{-8}$ | $4.9\times10^{-4}$ |
| bf16 | $8/7$ | $3.39\times10^{38}$ | $1.18\times10^{-38}$ | $9.2\times10^{-41}$ | $3.9\times10^{-3}$ |
:::

::: proof
The largest normal has $E = 2^e - 2$, so exponent $2^e - 2 - b = b$ (since $2b = 2^e - 2$), and the largest fraction $f = 2^m - 1$, giving $(1 + (2^m - 1)/2^m)\,2^b = (2 - 2^{-m})\,2^b$. The smallest normal has $E = 1$, $f = 0$: $2^{1-b}$. The smallest subnormal has $E = 0$, $f = 1$: $2^{-m}\,2^{1-b}$. For fp16, $b = 15$: $(2 - 2^{-10})\,2^{15} = 65{,}504$, $2^{-14}$ and $2^{-24}$. For bf16, $b = 127$: $(2 - 2^{-7})\,2^{127}\approx3.39\times10^{38}$, $2^{-126}$ and $2^{-133}$. For fp32, $b = 127$ and $m = 23$.
:::

Range is set by the exponent bits, precision by the mantissa bits. Bf16 — the "brain floating point" format introduced at Google Brain — is fp32 with the last $16$ mantissa bits dropped: the same range, a third of a percent relative precision. Fp16 trades range for three more bits of precision. The figure shows how the relative spacing of representable numbers varies across magnitudes.

::: widget plot
f: log10(2^(max(floor(3.32193*x), -14) - 10)) - x; log10(2^(max(floor(3.32193*x), -126) - 7)) - x; log10(2^(max(floor(3.32193*x), -6) - 3)) - x
x: -9, 5
y: -4, 1
vlines: 4.816; 2.651
labels: fp16; bf16; fp8 E4M3
caption: Relative spacing of representable numbers ($\log_{10}$ of ulp$/x$) against $\log_{10}x$. Within the normal range the spacing is a constant fraction of $x$ — a sawtooth between $2^{-m}$ and $2^{-m-1}$ — so the relative error of rounding is at most $u = 2^{-(m+1)}$. Below the smallest normal number ($6.1\times10^{-5}$ for fp16, $2^{-6}$ for E4M3) the spacing stops shrinking and relative precision degrades through the subnormals. The vertical lines mark the largest finite values of fp16 ($65{,}504$) and E4M3 ($448$); bf16's range extends far beyond the plot in both directions.
:::

## Rounding errors {#sec-rounding}

::: proposition The standard model of rounding {#prop-rounding}
If $x$ lies within the normal range of a format with unit roundoff $u$, then round-to-nearest gives $\operatorname{fl}(x) = x(1 + \delta)$ with $\lvert\delta\rvert\le u$. In particular, for representable $a, b$ whose exact sum or product is in range, $\operatorname{fl}(a\circ b) = (a\circ b)(1 + \delta)$, $\lvert\delta\rvert\le u$.
:::

::: proof
Let $2^E\le\lvert x\rvert < 2^{E+1}$. In that binade representable numbers are spaced $2^{E-m}$ apart, so the nearest one is within $2^{E-m-1}$ of $x$. Hence $\lvert\operatorname{fl}(x) - x\rvert\le2^{E-m-1}\le2^{-m-1}\lvert x\rvert = u\lvert x\rvert$. The statement for operations follows because IEEE arithmetic returns the correctly rounded exact result.
:::

Individual roundings are small; the trouble is accumulation. A dot product of length $k$ — every entry of a matrix product — is a sum of $k$ terms.

::: theorem Error of recursive summation {#thm-summation}
Let $s = \sum_{i=1}^{n}x_i$ be computed as $\hat s_1 = x_1$, $\hat s_i = \operatorname{fl}(\hat s_{i-1} + x_i)$. Then, to first order in $u$,

$$
\lvert\hat s_n - s\rvert\le(n - 1)\,u\sum_{i=1}^{n}\lvert x_i\rvert.
$$ {#eq-summation}
:::

::: proof
By [[#prop-rounding]], $\hat s_i = (\hat s_{i-1} + x_i)(1 + \delta_i)$ with $\lvert\delta_i\rvert\le u$. Unrolling, $\hat s_n = \sum_{i=1}^{n}x_i\prod_{j=\max(i,2)}^{n}(1 + \delta_j)$: the term $x_i$ is multiplied by the factors of every addition from step $\max(i, 2)$ to $n$, at most $n - 1$ of them. Each product equals $1 + \theta_i$ with $\lvert\theta_i\rvert\le(n-1)u + O(u^2)$. So $\hat s_n - s = \sum_i x_i\theta_i$, whose magnitude is at most $(n-1)u\sum_i\lvert x_i\rvert$ to first order.
:::

The bound grows linearly with $n$, and for bf16 ($u = 2^{-8}$) it is useless beyond a few hundred terms: with $n = 4096$, $(n - 1)u = 16$. The bound is pessimistic for random signs — errors partly cancel, growing more like $\sqrt n\,u$ — but for sums of positive terms, such as the squared norms inside RMSNorm, it is close to the truth: once the running sum is large, each new small term is below half its ulp and is lost entirely. This is why **matrix units multiply in low precision but accumulate in fp32**, and why reductions (norms, softmax denominators, losses) are computed in fp32 even in "16-bit" training.

## Mixed-precision training {#sec-mixed}

::: algorithm Mixed-precision training step {#alg-mixed}
State: fp32 **master weights** $\theta$, fp32 optimiser state, a loss scale $S$ (for fp16; $S = 1$ for bf16).
1. Cast $\theta$ to the 16-bit format: $\theta_{16} = \operatorname{fl}_{16}(\theta)$.
2. Run the forward pass with $\theta_{16}$: matrix products with 16-bit inputs and fp32 accumulation; softmax, norms and the loss in fp32; activations stored in 16-bit.
3. Backpropagate $S\cdot\mathcal{L}$ to obtain 16-bit gradients $\mathbf{g}_{16}$ of the scaled loss.
4. Convert to fp32 and unscale: $\mathbf{g} = \mathbf{g}_{16}/S$. If any entry is infinite or NaN, skip the update (and reduce $S$; [[#alg-dynamic-scaling]]).
5. Clip, and apply the optimiser update to the fp32 master weights and state.
:::

The fp32 master copy exists because of [[neural-networks/training-practice#prop-swamping]]: an update smaller than half an ulp of the weight is rounded away, and in bf16 half an ulp is a fraction $2^{-8}$ of the weight — larger than most individual updates. The memory cost is the $16$ bytes per parameter of [[scaling/flops-memory#prop-bytes]].

**Loss scaling.** Fp16's smallest subnormal is $5.96\times10^{-8}$, and Micikevicius et al. (2018) found that a large share of the activation gradients in some networks fell below it and became zero. Multiplying the loss by $S$ multiplies every gradient by $S$, lifting them into range.

::: proposition Power-of-two loss scaling is exact {#prop-loss-scaling}
Let $S = 2^k$. For any representable $x$ such that $Sx$ and $x$ are both normal numbers in range, $\operatorname{fl}(Sx) = Sx$ exactly, and dividing by $S$ recovers $x$ exactly. Consequently, scaling the loss by $2^k$ changes the rounding of a backward pass only for values that would otherwise underflow (which it rescues) or that overflow after scaling (which it destroys).
:::

::: proof
Multiplying $(1 + f/2^m)\,2^{E}$ by $2^k$ gives $(1 + f/2^m)\,2^{E+k}$, which has the same significand and is representable as long as $E + k$ stays within the normal exponent range. So no rounding occurs, and the division by $2^k$ likewise only changes the exponent. Backpropagation is linear in the upstream gradient, so every intermediate gradient is multiplied by $S$; where all values stay within the normal range, each rounded operation sees the same significands as without scaling and rounds identically, shifted by $k$ in the exponent.
:::

::: example Choosing a scale {#ex-loss-scale}
In an fp16 network, the smallest activation gradients that matter are about $10^{-9}$ and the largest about $2$. Is there a power-of-two scale that keeps all of them in range? What does the listing below show for a gradient of $2\times10^{-8}$?
::: solution
The values need $S\cdot10^{-9}\ge6.1\times10^{-5}$ (to be normal) and $S\cdot2\le65{,}504$. The first gives $S\ge6.1\times10^4$, the second $S\le3.3\times10^4$: no single scale keeps everything normal. Accepting subnormals for the smallest values ($S\cdot10^{-9}\ge6\times10^{-8}$, i.e. $S\ge60$) leaves a wide window; $S = 2^{14} = 16{,}384$ puts $10^{-9}$ at $1.6\times10^{-5}$ (subnormal, about $8$ significant bits) and $2$ at $32{,}768$. In the listing, $2\times10^{-8}$ rounds to $0$ in fp16, but $2\times10^{-8}\cdot2^{16} = 1.3\times10^{-3}$ is a normal number, and unscaling gives $1.9994\times10^{-8}$.
:::
:::

::: algorithm Dynamic loss scaling {#alg-dynamic-scaling}
Parameters: initial scale $S_0$ (commonly $2^{16}$), back-off factor $1/2$, growth factor $2$, growth interval $K$ (commonly $2000$ steps).
1. At each step, compute gradients of $S\cdot\mathcal{L}$.
2. If any gradient is infinite or NaN: skip the update, set $S\leftarrow S/2$, reset the counter.
3. Otherwise apply the update; increment the counter; if it reaches $K$, set $S\leftarrow2S$ and reset it.
:::

The scale settles just below the largest value that does not overflow, probing upwards every $K$ steps; occasional skipped steps are the cost. Because bf16 has fp32's range, gradients neither underflow nor overflow in practice, and bf16 training needs no loss scaling — the main reason it replaced fp16 for large models once hardware supported it (Kalamkar et al., 2019). Fp16 remains useful where bf16 is unavailable, and its extra precision is occasionally preferred for inference.

## Eight-bit floating point {#sec-fp8}

::: definition FP8 formats {#def-fp8}
Micikevicius et al. (2022) proposed two 8-bit formats, later standardised in the Open Compute Project's OFP8 specification:

- **E4M3**: $4$ exponent bits (bias $7$), $3$ mantissa bits. It has **no infinities**: only the patterns with all exponent and mantissa bits set are NaN, so the top exponent is used for finite values. Largest finite value $1.75\times2^8 = 448$; smallest normal $2^{-6}$; smallest subnormal $2^{-9}$.
- **E5M2**: $5$ exponent bits (bias $15$), $2$ mantissa bits, following IEEE conventions with infinities and NaNs. Largest finite value $1.75\times2^{15} = 57{,}344$; smallest normal $2^{-14}$; smallest subnormal $2^{-16}$.
:::

::: example Where 448 comes from {#ex-e4m3}
Derive the largest finite values of E4M3 and E5M2, and compare their dynamic range (largest over smallest normal) with fp16's.
::: solution
E4M3: the top exponent field $1111$ is allowed for finite numbers, so the largest exponent is $15 - 7 = 8$; the mantissa $111$ is reserved for NaN, so the largest is $110$: $(1 + 6/8)\,2^8 = 1.75\cdot256 = 448$. E5M2: as in IEEE, the top field $11111$ is reserved, so the largest exponent is $30 - 15 = 15$, with mantissa $11$: $(1 + 3/4)\,2^{15} = 57{,}344$. Dynamic ranges: E4M3 $448/2^{-6} = 28{,}672\approx2^{14.8}$; E5M2 $57{,}344/2^{-14}\approx9.4\times10^8\approx2^{29.8}$, the same as fp16 ($65{,}504/2^{-14}\approx2^{30}$). E4M3 has more precision and E5M2 more range; the usual recipe uses E4M3 for weights and activations in the forward pass and E5M2, or E4M3 in some recipes, for gradients.
:::
:::

::: widget floatline
p: 3
emin: -3
emax: 3
value: 5.5
caption: Every number of a toy format with a $3$-bit significand (two stored mantissa bits, as in E5M2) and exponents from $-3$ to $3$. Each binade holds only four values, so the gap doubles at every power of two: between $4$ and $8$ the values are $4, 5, 6, 7$. Move the value and watch how far it is from its nearest neighbour — up to $12.5\%$ of the value at the bottom of each binade, the precision E5M2 offers. E4M3 has one more mantissa bit and half the relative gap.
:::

With $u = 2^{-4}$ (E4M3) or $2^{-3}$ (E5M2), FP8 can represent each value only to within $6$–$12\%$, and its range is so narrow that tensors must be **scaled** into it. A tensor $X$ is stored as an fp8 tensor $\tilde X$ and a higher-precision scale $\sigma$ with $X\approx\sigma\tilde X$. Several schemes are in use (as of 2026):

- **Per-tensor scaling**: one $\sigma$ per tensor, chosen from the largest absolute value (**amax**) so that it maps onto the format's maximum. **Delayed scaling**, used in NVIDIA's Transformer Engine, sets $\sigma$ from a history of amax values of previous steps, avoiding an extra pass over the data; **current scaling** computes amax of the tensor itself first.
- **Per-block scaling**: one $\sigma$ per block of elements. DeepSeek-V3 (DeepSeek-AI, 2024) used scales per $1\times128$ tile of activations and per $128\times128$ block of weights, promoted partial sums to fp32 at regular intervals because the hardware's fp8 accumulation was of limited precision, and reported a loss within $0.25\%$ of a bf16 baseline.
- **Microscaling (MX) formats** (Open Compute Project specification, 2023; Rouhani et al., 2023): blocks of $32$ elements share an 8-bit power-of-two scale (E8M0), with elements in fp8, fp6, fp4 or int8. Hardware support for MX formats arrived with accelerator generations announced from 2024.

Block scaling matters because of **outliers**. A single large value in a tensor sets the per-tensor scale, pushing every other element towards the bottom of the range, where relative precision collapses into the subnormals (the left side of the figure above). Language-model activations are known to contain a few feature dimensions with much larger magnitudes than the rest, growing with scale (Dettmers et al., 2022), which is exactly this situation.

::: example One outlier, two scaling schemes {#ex-outlier}
A row of $128$ activations has typical magnitude $0.01$ and one entry of $100$. With one per-tensor scale for E4M3 (mapping amax to $448$), where do the typical entries land? With per-block scales of $32$ elements, what happens in the three blocks without the outlier?
::: solution
Per-tensor: $\sigma = 100/448$, so typical entries become $0.01\cdot4.48 = 0.0448$. E4M3's smallest normal is $2^{-6} = 0.0156$, so they are normal, with spacing $2^{-5-3} = 0.0039$ in $[2^{-5}, 2^{-4})$, a relative precision of about $9\%$ — tolerable here, but entries ten times smaller ($0.001\to0.0045$) would be subnormal with spacing $2^{-9} = 0.00195$, about $40\%$ of their value. Per-block: the three blocks without the outlier have amax around $0.03$, so each gets its own scale mapping $0.03$ to $448$; their entries land in the upper part of the range with the full $3$-bit precision ($\le6\%$ error). Only the block containing the outlier pays.
:::
:::

What runs in fp8 is typically only the large matrix products of the linear layers (forward, and the two backward products). Attention's softmax, normalisation, the loss, the optimiser, master weights and often the gradient all-reduce remain in bf16 or fp32. Matrix multiplication in fp8 doubles peak throughput over bf16 on hardware that supports it; the end-to-end speed-up of a training step is smaller, because the rest of the step does not change.

## Stochastic rounding {#sec-stochastic}

Round-to-nearest is deterministic, and its errors can be systematically biased: the tiny update that rounds to zero rounds to zero every time ([[neural-networks/training-practice#prop-swamping]]). **Stochastic rounding** randomises the direction so that errors cancel in expectation.

::: definition Stochastic rounding {#def-stochastic}
Let $x$ lie between consecutive representable numbers $x_- < x < x_+$. **Stochastic rounding** returns

$$
\operatorname{SR}(x) = \begin{cases} x_+ & \text{with probability } \dfrac{x - x_-}{x_+ - x_-},\\[2mm] x_- & \text{otherwise.}\end{cases}
$$
:::

::: proposition Stochastic rounding is unbiased {#prop-sr}
$\E[\operatorname{SR}(x)] = x$ and $\Var[\operatorname{SR}(x)] = (x - x_-)(x_+ - x)\le\tfrac14(x_+ - x_-)^2$. If a weight $w$ receives $n$ updates $\Delta_1,\dots,\Delta_n$, each applied as $w\leftarrow\operatorname{SR}(w + \Delta_i)$ with independent randomness, then $\E[w_n] = w_0 + \sum_i\Delta_i$ exactly, as long as no value leaves the format's range.
:::

::: proof
Write $h = x_+ - x_-$ and $q = (x - x_-)/h\in(0, 1)$. Then $\E[\operatorname{SR}(x)] = qx_+ + (1 - q)x_- = x_- + qh = x$. The variance of a two-point distribution with gap $h$ and probability $q$ is $q(1 - q)h^2 = (x - x_-)(x_+ - x)$, which is maximised at $q = \tfrac12$, giving $h^2/4$. For the sequence, $\E[w_i\mid w_{i-1}] = w_{i-1} + \Delta_i$ by the first part, so by the tower property $\E[w_i] = \E[w_{i-1}] + \Delta_i$, and induction gives the claim.
:::

The listing below implements both roundings for any binary format in plain Python and checks four of this chapter's claims: that $10{,}000$ updates of $0.001$ to a bf16 weight of $1$ are all lost under round-to-nearest but survive in expectation under stochastic rounding; that a 16-bit accumulator ruins a long sum of positive terms; that loss scaling rescues an fp16 underflow; and that stochastic rounding into E4M3 is unbiased.

```python
import math, random, struct

def round_float(x, man_bits, emin, emax_finite, stochastic=False, rng=None):
    """Round x to a binary format with man_bits stored mantissa bits, smallest normal
    exponent emin and largest finite value emax_finite (saturating), with subnormals."""
    if x == 0:
        return 0.0
    s, a = (-1.0 if x < 0 else 1.0), abs(x)
    e = max(math.floor(math.log2(a)), emin)       # binade (subnormals share emin's)
    ulp = 2.0 ** (e - man_bits)
    q = a / ulp
    lo = math.floor(q)
    if stochastic:                                # round up with probability q - lo
        r = lo + (1 if rng.random() < q - lo else 0)
    else:                                         # round to nearest, ties to even
        r = lo + (1 if (q - lo > 0.5 or (q - lo == 0.5 and lo % 2)) else 0)
    return s * min(r * ulp, emax_finite)

bf16 = lambda x, **k: round_float(x, 7, -126, 3.3895e38, **k)
fp16 = lambda x, **k: round_float(x, 10, -14, 65504.0, **k)
e4m3 = lambda x, **k: round_float(x, 3, -6, 448.0, **k)
fp32 = lambda x: struct.unpack("f", struct.pack("f", x))[0]

# 1. Many small updates to a weight of 1.0
rng = random.Random(0)
w_rn = w_sr = 1.0
w32 = fp32(1.0)
for _ in range(10000):
    w_rn = bf16(w_rn + 1e-3)
    w_sr = bf16(w_sr + 1e-3, stochastic=True, rng=rng)
    w32 = fp32(w32 + 1e-3)
print(f"1 + 10000 x 0.001: exact 11.0  fp32 {w32:.4f}  bf16-nearest {w_rn}  bf16-stochastic {w_sr}")

# 2. Sum of squares of 4096 bf16 numbers (as in a norm) with 16- and 32-bit accumulators
rng = random.Random(1)
xs = [bf16(rng.gauss(0, 1)) for _ in range(4096)]
exact = math.fsum(x * x for x in xs)              # products of bf16 values are exact here
acc16 = acc32 = 0.0
for x in xs:
    acc16 = bf16(acc16 + x * x)
    acc32 = fp32(acc32 + x * x)
print(f"sum of squares: exact {exact:.3f}  bf16 accumulator {acc16}  fp32 accumulator {acc32:.3f}")

# 3. A small gradient in fp16, with and without loss scaling
g = 2.0e-8
print(f"fp16({g}) = {fp16(g)}   fp16({g} * 2**16) / 2**16 = {fp16(g * 2**16) / 2**16:.4e}")

# 4. Unbiasedness of stochastic rounding into E4M3
rng = random.Random(2)
x = 300.0
samples = [e4m3(x, stochastic=True, rng=rng) for _ in range(100000)]
print(f"E4M3 nearest({x}) = {e4m3(x)}   mean of stochastic roundings = {sum(samples)/len(samples):.2f}")
```

```text
1 + 10000 x 0.001: exact 11.0  fp32 11.0008  bf16-nearest 1.0  bf16-stochastic 11.125
sum of squares: exact 4065.752  bf16 accumulator 1936.0  fp32 accumulator 4065.737
fp16(2e-08) = 0.0   fp16(2e-08 * 2**16) / 2**16 = 1.9994e-08
E4M3 nearest(300.0) = 288.0   mean of stochastic roundings = 299.97
```

Under round-to-nearest the bf16 weight never moves from $1$; under stochastic rounding it reaches $11.125$, two bf16 ulps ($0.0625$ each at that magnitude) from the exact $11$ — the randomness costs variance, not bias. Even fp32 accumulates a small error ($11.0008$) over $10{,}000$ additions. The bf16 accumulator loses more than half of a sum of $4096$ squares: past $1024$ its ulp is $8$, and most squares are smaller than $4$. And E4M3 round-to-nearest maps $300$ to $288$, a $4\%$ error every time, while stochastic rounding averages to $299.97$.

::: example Stochastic rounding of an update {#ex-sr}
A bf16 weight equals $1$ (the next representable values are $1 - 2^{-8}$ below and $1 + 2^{-7}$ above). An update of $\Delta = 10^{-3}$ is applied with stochastic rounding. What are the possible results and their probabilities, and what is the standard deviation of the result?
::: solution
$x = 1.001$ lies between $x_- = 1$ and $x_+ = 1.0078125$, gap $h = 0.0078125$. $q = 0.001/0.0078125 = 0.128$: the result is $1.0078125$ with probability $0.128$ and $1$ with probability $0.872$. Mean $1 + 0.128\cdot0.0078125 = 1.001$. Standard deviation $h\sqrt{q(1-q)} = 0.0078125\cdot0.334 = 0.0026$, more than twice the update itself — the noise is large step by step, but it averages out over many steps, and stochastic gradient descent tolerates noise of this kind.
:::
:::

Stochastic rounding was used by Gupta et al. (2015) to train networks in 16-bit fixed point, and several accelerators implement it in hardware. It makes pure low-precision training — without an fp32 master copy — viable in some settings, saving memory (Zamirai et al., 2020 studied bf16 training with stochastic rounding of weight updates). For the largest language-model runs reported as of 2026, an fp32 or higher-precision master copy with round-to-nearest remains the standard; stochastic rounding is used more often for low-precision gradient or optimiser-state storage and in some fp8 and fp4 recipes.

::: warning "Trained in fp8" does not mean every number was fp8
Reports of fp8 or fp4 training describe which matrix products used those formats. The master weights, optimiser state and accumulations are kept in higher precision; normalisation, softmax and the loss usually run in bf16 or fp32; and often the first and last layers, or the attention computation, are excluded. When comparing claims, ask which operations, which scaling granularity, which accumulation precision, and whether the result was checked against a higher-precision baseline at the same scale — instabilities from low precision can appear only late in long runs.
:::

## Quantisation-aware training {#sec-qat}

Low precision in training is mainly about speed. A different goal is a model that will be **deployed** in very low precision — int8, int4 or fp4 weights — for cheaper inference ([[inference/quantisation]]). Rounding a trained model's weights after training (**post-training quantisation**) works well at 8 bits but loses accuracy at 4 bits and below. **Quantisation-aware training** (QAT) exposes the model to the rounding during training so that it can adapt.

::: definition Fake quantisation and the straight-through estimator {#def-qat}
In **fake quantisation**, the forward pass uses $\hat w = \sigma\cdot\operatorname{clip}\big(\operatorname{round}(w/\sigma), -q, q\big)$ in place of each weight $w$ (computed in higher precision), so the network sees exactly the values it will have after quantisation. Rounding has derivative zero almost everywhere, so the backward pass uses the **straight-through estimator** (STE; Bengio, Léonard and Courville, 2013): $\partial\hat w/\partial w$ is taken to be $1$ inside the clipping range and $0$ outside, and the gradient updates the higher-precision $w$.
:::

The STE is a heuristic: it treats rounding as the identity for the purpose of the gradient, which is wrong locally but works well in practice, because the high-precision weight accumulates small updates until it crosses a rounding boundary. Jacob et al. (2018) established QAT for integer-only inference of vision networks; for language models it is applied either during the last part of pretraining or in a shorter fine-tuning phase, often with the model's own generations as data (LLM-QAT; Liu et al., 2023). Most of the detail belongs to inference and is treated in [[inference/quantisation]].

::: quiz
A run is moved from fp16 with dynamic loss scaling to bf16. Which statements are true?
- [x] Loss scaling is no longer needed, because bf16 has the same exponent range as fp32.
- [ ] The fp32 master weights can be dropped without effect, because bf16 has the same range as fp32.
- [x] Each stored 16-bit value is now about eight times less precise.
- [ ] Matrix products should now accumulate in bf16.
::: solution
Bf16's $8$ exponent bits give fp32's range, so gradients do not underflow. But its precision is $3$ mantissa bits worse than fp16's ($u = 2^{-8}$ against $2^{-11}$), so small updates are lost even more readily: the master copy matters more, not less. Accumulation stays in fp32 ([[#thm-summation]]).
:::
:::

::: history
Courbariaux, Bengio and David (2014) and Gupta, Agrawal, Gopalakrishnan and Narayanan (2015) showed that networks could be trained with low-precision arithmetic, the latter using stochastic rounding. Micikevicius and colleagues at NVIDIA and Baidu (*Mixed Precision Training*, 2017, published at ICLR 2018) introduced the recipe of fp16 arithmetic, fp32 master weights and loss scaling. Google's TPUs used bf16, and Kalamkar et al. (2019) showed that bf16 matched fp32 across a range of models without loss scaling. Bengio et al. (2013) introduced the straight-through estimator and Jacob et al. (2018) quantisation-aware training for integer inference. Micikevicius et al. (2022) proposed the E4M3 and E5M2 formats, showing fp8 training of language models up to $175$ billion parameters matching 16-bit baselines; the Open Compute Project standardised them and, in 2023, the microscaling (MX) block formats. DeepSeek-V3 (2024) described a large-scale fp8 training recipe with fine-grained block scaling.
:::

::: summary
- A binary format with $e$ exponent and $m$ mantissa bits has range up to $(2 - 2^{-m})2^{b}$ and unit roundoff $u = 2^{-(m+1)}$; **exponent bits set range, mantissa bits precision**.
- Each rounding has relative error at most $u$, but recursive sums can accumulate error up to $(n-1)u\sum\lvert x_i\rvert$: **accumulate in fp32**.
- **Mixed-precision training** keeps fp32 master weights and optimiser state, runs matrix products in 16-bit with fp32 accumulation, and keeps reductions in fp32.
- **Loss scaling** by a power of two is exact except at the range limits; dynamic scaling halves on overflow and doubles after a run of good steps; **bf16** needs none.
- **FP8**: E4M3 (max $448$) and E5M2 (max $57{,}344$) need **scaling** — per tensor, per block, or MX blocks of $32$ — because of narrow range and activation outliers.
- **Stochastic rounding** is unbiased, $\E[\operatorname{SR}(x)] = x$, with variance at most $h^2/4$: it preserves small updates in expectation.
- **Quantisation-aware training** uses fake quantisation and the straight-through estimator to prepare models for low-bit deployment.
:::

## Exercises

::: exercise Largest fp16 value {level=1 check="65504"}
Compute the largest finite fp16 value from [[#prop-range]].
::: solution
$(2 - 2^{-10})\cdot2^{15} = 65{,}536 - 32 = 65{,}504$.
:::
:::

::: exercise Unit roundoff of bf16 {level=1 check="0.00390625"}
What is the unit roundoff $u$ of bf16 under round-to-nearest?
::: solution
$u = 2^{-(m+1)} = 2^{-8} = 0.00390625$.
:::
:::

::: exercise Spacing in E4M3 {level=1 check="32"}
What is the spacing between consecutive E4M3 values in the interval $[256, 448]$?
::: solution
In the binade $[2^8, 2^9)$ the spacing is $2^{8-3} = 32$: the values are $256, 288, 320, 352, 384, 416, 448$.
:::
:::

::: exercise Smallest E5M2 subnormal {level=2 check="1.52587890625e-5"}
Derive the smallest positive subnormal of E5M2.
::: solution
Bias $15$, so subnormals are $(f/4)\cdot2^{1-15}$; the smallest, $f = 1$, is $2^{-2}\cdot2^{-14} = 2^{-16} = 1.52587890625\times10^{-5}$.
:::
:::

::: exercise A summation bound {level=2 check="0.03076"}
Sixty-four positive numbers summing to $\sum\lvert x_i\rvert = 1$ are added in fp16 ($u = 2^{-11}$). What does [[#thm-summation]] give as a first-order bound on the absolute error? Give four significant figures, then compare with the same sum in bf16 ($u = 2^{-8}$).
::: solution
$(n - 1)u\sum\lvert x_i\rvert = 63\cdot2^{-11} = 63/2048 = 0.03076$ in fp16, about $3\%$ of the sum; in bf16 it is $63/256 = 0.2461$, about a quarter of the sum. Both are worst cases, but for positive terms the actual error can approach them.
:::
:::

::: exercise Stochastic rounding probability {level=2 check="0.4"}
A value $x = 1.003125$ is rounded stochastically to bf16, whose neighbours are $1$ and $1.0078125$. With what probability is it rounded up?
::: solution
$q = (x - x_-)/(x_+ - x_-) = 0.003125/0.0078125 = 0.4$.
:::
:::

::: exercise Dynamic loss scaling {level=2}
A run starts with $S = 2^{16}$, growth interval $K = 2000$, and overflows at steps $1$, $2$ and $3$ and then not again until step $10{,}000$. What is $S$ after step $3$, at step $5003$, and how many updates were skipped? Why is the scale allowed to grow again at all?
::: solution
Each overflow halves $S$ and skips the step: after step $3$, $S = 2^{13}$, with $3$ updates skipped. From step $4$ the counter runs; after $2000$ good steps (step $2003$) $S = 2^{14}$, after step $4003$ $S = 2^{15}$, and so it is $2^{15}$ at step $5003$ (it reaches $2^{16}$ at step $6003$ and, if no overflow occurs, keeps doubling every $2000$ steps). Growth is needed because the gradient distribution shifts during training — typically gradients shrink — and a scale fixed after an early overflow would leave small gradients underflowing later.
:::
:::

::: exercise Per-tensor scale {level=2 check="0.224"}
A tensor has amax $2000$. Before casting to E4M3 it is multiplied by $1/\sigma$, where $\sigma$ is chosen so that the amax maps onto E4M3's largest finite value. What is the multiplier $1/\sigma$? Give three significant figures. What happens to an entry of $3$?
::: solution
$1/\sigma = 448/2000 = 0.224$ (so $\sigma = 4.46$). An entry of $3$ becomes $0.672$, in the binade $[0.5, 1)$ where E4M3's spacing is $2^{-1-3} = 0.0625$; it rounds to $0.6875$, which unscales to $3.07$, a $2.3\%$ error.
:::
:::

::: exercise Variance of a stochastic sum {level=3}
A weight starts at $w_0 = 1$ in a format with spacing $h$ around $1$ and receives $n$ updates of size $\Delta\ll h$, each applied with stochastic rounding. Assuming the weight stays in the same binade, show that the number of upward steps is binomial and find the mean and standard deviation of $w_n - w_0$. For bf16 ($h = 2^{-7}$), $\Delta = 10^{-4}$, $n = 10{,}000$, compare the standard deviation with the mean.
::: solution
While the weight sits on a grid point, $w + \Delta$ lies between that point and the next, and rounds up with probability $q = \Delta/h$, independently each step; so $w_n - w_0 = hK$ with $K\sim\Bin(n, q)$, as long as no step crosses into another binade. Mean $hnq = n\Delta$, as [[#prop-sr]] requires; standard deviation $h\sqrt{nq(1 - q)}\approx\sqrt{nh\Delta}$. Numerically: mean $1$; $q = 10^{-4}\cdot128 = 0.0128$, standard deviation $2^{-7}\sqrt{10{,}000\cdot0.0128\cdot0.9872} = 0.0078\cdot11.24 = 0.088$, about $9\%$ of the mean (in practice the weight crosses into the next binade, where $h$ doubles, but the conclusion is similar). Under round-to-nearest the change would be exactly $0$.
:::
:::

::: exercise Blocked accumulation {level=3}
A dot product of length $n = 4096$ is computed by splitting it into $n/c$ blocks of length $c$, summing each block in a low-precision accumulator with unit roundoff $u_\ell$, and adding the block sums in fp32 ($u_h = 2^{-24}$). Using [[#thm-summation]], bound the first-order error and choose $c$ to make the low-precision part at most $1\%$ of $\sum\lvert x_i\rvert$ when $u_\ell = 2^{-14}$. Relate this to promoting partial sums to fp32 at fixed intervals.
::: solution
Each block's sum has error at most $(c - 1)u_\ell\sum_{\text{block}}\lvert x_i\rvert$; summing over blocks gives at most $(c - 1)u_\ell\sum\lvert x_i\rvert$. The fp32 sum of $n/c$ block sums adds at most $(n/c - 1)u_h\sum\lvert x_i\rvert$ (to first order, since the block sums' absolute values sum to at most $\sum\lvert x_i\rvert$). Total: $\big((c - 1)u_\ell + (n/c - 1)u_h\big)\sum\lvert x_i\rvert$. For $(c - 1)2^{-14}\le0.01$, $c\le164.8$, so $c = 128$ (a hardware-friendly size) gives $127\cdot2^{-14} = 0.78\%$, while the fp32 part is $31\cdot2^{-24}\approx2\times10^{-6}$. Without blocking, $4095\cdot2^{-14} = 25\%$. This is the reasoning behind promoting fp8 partial sums to fp32 every $128$ elements, as DeepSeek-V3 reported.
:::
:::
