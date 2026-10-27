The previous chapters gave the ingredients of a training run: a network, a loss, gradients by backpropagation, an optimiser with a schedule, an initialisation and normalisation that keep the signals well scaled, and regularisers. This chapter is about putting them together and making the run work — and, when it does not, finding out why. Much of what follows is craft rather than theory, but the craft rests on facts that can be stated exactly: what the loss should be at step zero, what averaging over micro-batches does to a gradient, how many bits a bfloat16 number has and what that means for a weight update, and why two runs with the same seed can still differ.

The emphasis is on habits that catch problems early. A training run that silently does the wrong thing is the most expensive kind of bug: it may take days to show, and its symptoms — a loss that is a little too high — look like a modelling problem. As Karpathy (2019) put it in a widely read checklist, neural-network training "fails silently". The defences are to check every stage against a number you can predict, to start small, and to change one thing at a time.

## The data pipeline {#sec-data}

Training data pass through a **pipeline**: read from storage, decode (images, audio, text), transform (tokenise, crop, augment, standardise), shuffle, group into batches and copy to the accelerator. Three properties of the pipeline matter for correctness.

- **Splits.** Training, validation and test data must be separated before anything is fitted, including the statistics used for standardisation and the tokeniser's vocabulary ([[ml-fundamentals/generalisation#def-splits]]). Near-duplicates across splits — the same image resized, the same document scraped twice — leak test information into training and inflate results; large corpora are deduplicated for this reason and to reduce memorisation.
- **Shuffling.** SGD's analysis assumes batches are random samples. Data stored in order (all cats, then all dogs; one website, then the next) must be shuffled, at least approximately, or each batch is biased and the loss curve shows periodic structure. With data too large to shuffle in memory, a **shuffle buffer** holds a window of examples and samples from it, which only mixes examples that are stored near each other — so the files themselves should be shuffled too.
- **Standardisation.** Inputs should have comparable scales, typically zero mean and unit variance per feature or channel, computed on the training set. For a linear model the condition number of the loss — and hence the speed of gradient descent ([[math-for-ml/optimisation#sec-quadratic]]) — depends directly on the scales of the features; normalisation layers reduce, but do not remove, the sensitivity of deep networks to this.

Throughput matters as well: if the accelerator waits for data, nothing else in this chapter helps. Loaders run in parallel worker processes and **prefetch** the next batches while the current one is being processed; a useful first measurement is the time per step with the model replaced by a no-op.

## Batching sequences {#sec-batching}

Sequences — sentences, documents, audio clips — have different lengths, but a batch is a rectangular tensor. The standard remedy is to **pad** each sequence to the length of the longest one in the batch with a dummy token, and to pass a **mask** marking which positions are real. The mask has two jobs: in attention it stops real tokens from attending to padding ([[transformers/self-attention]]), and in the loss it removes padded positions from the average.

::: example The cost of padding {#ex-padding}
A batch holds four sequences of lengths $100$, $250$, $500$ and $1{,}000$ tokens, padded to $1{,}000$. What fraction of the computation is spent on padding, and what are two ways to reduce it?
::: solution
The batch has $4\cdot1{,}000 = 4{,}000$ positions, of which $100 + 250 + 500 + 1{,}000 = 1{,}850$ are real: $1 - 1{,}850/4{,}000 = 53.75\%$ of the positions are padding, and with attention, whose cost grows quadratically with length, the waste is larger still. **Bucketing** groups sequences of similar length into the same batch, so each is padded only a little. **Packing** concatenates several sequences, separated by an end-of-document token, into rows of fixed length with no padding at all; language-model pretraining usually packs, optionally with an attention mask that stops tokens from attending across document boundaries.
:::
:::

### Gradient accumulation {#sec-accumulation}

When the batch that the optimiser should see does not fit in memory, it is split into $k$ **micro-batches**, each run forward and backward in turn while the gradients accumulate (in PyTorch, `.backward()` adds into `.grad`; [[neural-networks/automatic-differentiation#sec-systems]]), and the optimiser steps once at the end. Done correctly this gives exactly the large-batch gradient, but "correctly" has a subtlety.

::: proposition Accumulating per-token averages {#prop-accumulation}
Let a batch of $N = \sum_{i=1}^kn_i$ tokens be split into micro-batches with $n_i$ tokens and per-token mean losses $\mathcal{L}_i = \frac1{n_i}\sum_{t\in\text{micro-batch }i}\ell_t$. The gradient of the full-batch per-token mean $\mathcal{L} = \frac1N\sum_t\ell_t$ is

$$
\nabla\mathcal{L} = \sum_{i=1}^k\frac{n_i}{N}\nabla\mathcal{L}_i,
$$

which equals the naive average $\frac1k\sum_i\nabla\mathcal{L}_i$ for all losses only when all $n_i$ are equal.
:::

::: proof
$\mathcal{L} = \frac1N\sum_i\sum_{t\in i}\ell_t = \frac1N\sum_in_i\mathcal{L}_i$, and the gradient is linear. If every $n_i = N/k$, the weights $n_i/N$ are all $1/k$. If not, choose losses with $\nabla\mathcal{L}_1\ne\nabla\mathcal{L}_2$ and the two weightings differ.
:::

With padded or packed sequences of varying length the micro-batches *do* have different numbers of real tokens, and averaging their means over-weights the tokens in short micro-batches. The fix is to sum token losses in each micro-batch and divide by the total token count $N$ of the whole batch. Bugs of exactly this kind have been found and fixed in widely used training libraries, which is a reason to test accumulation against a single large batch on a small model.

::: example A biased accumulation {#ex-accumulation}
Two micro-batches have $100$ and $900$ real tokens with mean losses $2.0$ and $3.0$. What is the correct full-batch loss, and what does naive averaging report?
::: solution
Correct: $(100\cdot2.0 + 900\cdot3.0)/1{,}000 = 2.9$. Naive: $(2.0 + 3.0)/2 = 2.5$. The naive gradient gives each of the $100$ tokens in the first micro-batch nine times the weight of a token in the second — a systematic bias towards whatever short sequences contain.
:::
:::

## Mixed precision {#sec-precision}

Accelerators compute much faster in 16-bit than in 32-bit floating point, and 16-bit numbers halve the memory and bandwidth of activations. Training in **mixed precision** does most arithmetic in a 16-bit format while keeping what needs accuracy in 32 bits.

::: definition Floating-point formats used in training {#def-formats}
A binary floating-point format with $e$ exponent bits and $m$ explicit mantissa (fraction) bits represents normal numbers $\pm(1.f_1f_2\dots f_m)_2\times2^E$; its **machine epsilon** $2^{-m}$ is the gap between $1$ and the next representable number. The formats in use:

| format | sign / exponent / mantissa bits | largest finite value | smallest normal | epsilon $2^{-m}$ |
|---|---|---|---|---|
| float32 (FP32) | $1/8/23$ | $3.4\times10^{38}$ | $1.2\times10^{-38}$ | $1.2\times10^{-7}$ |
| float16 (FP16) | $1/5/10$ | $65{,}504$ | $6.1\times10^{-5}$ | $9.8\times10^{-4}$ |
| bfloat16 (BF16) | $1/8/7$ | $3.4\times10^{38}$ | $1.2\times10^{-38}$ | $7.8\times10^{-3}$ |

Float16 additionally has subnormal numbers down to $6.0\times10^{-8}$.
:::

Float16 has more precision but a narrow range: activations above $65{,}504$ overflow to infinity, and gradients below about $10^{-7}$ underflow to zero. Bfloat16 ("brain floating point", from Google Brain) keeps float32's exponent, so it has float32's range, at the cost of only $8$ bits of precision (counting the implicit leading $1$). The figure shows a toy format with a $4$-bit significand, the same structure at a scale where every representable number is visible.

::: widget floatline
p: 4
emin: -2
emax: 2
value: 1.3
caption: All numbers of a toy binary floating-point format with a $4$-bit significand. The spacing doubles at every power of two, so the relative precision is constant while the absolute gaps grow. Bfloat16 has an $8$-bit significand: between $1$ and $2$ its numbers are $1/128$ apart, and between $256$ and $512$ they are $2$ apart.
:::

The precision of bfloat16 is the reason weights are kept in float32. An optimiser step typically changes a weight by a relative amount of $10^{-3}$ to $10^{-5}$ — below bfloat16's epsilon.

::: proposition Updates below half an ulp are lost {#prop-swamping}
Let $w > 0$ be representable in a floating-point format with epsilon $2^{-m}$, with $2^E\le w < 2^{E+1}$, so that the spacing of representable numbers just above $w$ is $u = 2^{E-m}$ (one **ulp**). If $0 < \Delta < u/2$, then $w + \Delta$ rounds to $w$ under round-to-nearest. In particular, repeated updates smaller than half an ulp never change the stored weight, however many there are.
:::

::: proof
The representable numbers nearest to $w + \Delta$ are $w$ and $w + u$ (since $w + \Delta < w + u/2 < 2^{E+1}$ keeps us in the same binade, where the spacing is $u$). Its distance to $w$ is $\Delta < u/2$ and to $w + u$ is $u - \Delta > u/2$, so it rounds to $w$. Each repetition starts again from $w$ and rounds back to it.
:::

For $w = 1$ in bfloat16, $u = 2^{-7} = 0.0078$, so any update smaller than $0.0039$ is lost. Mixed-precision training therefore keeps a float32 **master copy** of the weights, to which the updates are applied, and casts it to 16 bits for the forward and backward passes; the optimiser state is kept in float32 too.

**Loss scaling.** With float16, small gradients underflow. Micikevicius et al. (2018) multiply the loss by a scale factor $S$ (such as $2^{16}$) before backpropagation, which by linearity multiplies every gradient by $S$ and lifts them into float16's range, and divide by $S$ in float32 before the update. **Dynamic loss scaling** starts with a large $S$, halves it whenever an overflow (infinity or NaN) appears in the gradients — skipping that step — and doubles it after a run of steps without overflow. With bfloat16 the range is that of float32 and loss scaling is unnecessary, which is the main reason bfloat16 became the default for training large models (Kalamkar et al., 2019). As of 2026, some large training runs also use 8-bit floating-point formats (E4M3 and E5M2; Micikevicius et al., 2022) for parts of the matrix multiplications, with per-tensor or per-block scale factors.

::: example A softmax that overflows {#ex-overflow}
A float16 attention or output layer computes $\operatorname{softmax}(\mathbf{z})$ for logits $\mathbf{z} = (12, 3, -1)$ by exponentiating directly. What happens, and how do implementations avoid it?
::: solution
$e^{12} = 162{,}755$ exceeds float16's largest value $65{,}504$ (whose logarithm is $11.09$), so it becomes infinity, the sum is infinite, and the output is $\infty/\infty = $ NaN for the first entry — after which the NaN spreads through every later computation and every gradient. Subtracting the maximum first, $\operatorname{softmax}(\mathbf{z}) = \operatorname{softmax}(\mathbf{z} - 12)$, exponentiates $(0, -9, -13)$, all at most $1$, and gives $(0.99987, 0.00012, 0.0000023)$ safely. Libraries also compute softmax and log-sum-exp internally in float32 even when the inputs are 16-bit. Any logit above about $11$ is enough to overflow a naive float16 softmax.
:::
:::

::: example Memory per parameter {#ex-memory}
Estimate the memory needed for the weights, gradients and Adam state of a $7\times10^9$-parameter model trained in mixed precision with bfloat16 weights and gradients, float32 master weights and float32 Adam moments. Activations are extra.
::: solution
Per parameter: $2$ bytes (bfloat16 weight) $+ 2$ (bfloat16 gradient) $+ 4$ (float32 master weight) $+ 4 + 4$ (Adam's two moments) $= 16$ bytes. For $7\times10^9$ parameters: $1.12\times10^{11}$ bytes $= 112$ GB, more than one accelerator typically holds, before a single activation is stored. This $16$-bytes-per-parameter accounting is the one used by Rajbhandari et al. (2020), whose ZeRO method shards these buffers across data-parallel devices so that each holds only a fraction ([[inference]] and [[scaling]] treat the systems side).
:::
:::

## Debugging a training run {#sec-debugging}

### Predict the first loss {#sec-first-loss}

The single most useful check costs nothing: compute the loss before the first step and compare it with what an untrained model should give.

::: proposition The loss at initialisation {#prop-initial-loss}
If a $K$-way softmax classifier outputs logits $z_1, \dots, z_K$ that are independent with mean $0$ and small variance $\sigma^2$, independent of the label, its expected cross-entropy is

$$
\E\,\mathcal{L}\approx\ln K + \frac{\sigma^2}2\Big(1 - \frac1K\Big),
$$

and exactly $\ln K$ when all logits are equal.
:::

::: proof
The loss is $\operatorname{lse}(\mathbf{z}) - z_y$ with $\operatorname{lse}(\mathbf{z}) = \ln\sum_ke^{z_k}$. If all logits are equal to $c$, it is $\ln(Ke^c) - c = \ln K$. In general, expand $\operatorname{lse}$ to second order around $\mathbf{0}$: its gradient there is $\mathbf{1}/K$ and its Hessian $\frac1KI - \frac1{K^2}\mathbf{1}\mathbf{1}^\top$ ([[ml-fundamentals/logistic-regression#prop-softmax-grad]]), so $\operatorname{lse}(\mathbf{z})\approx\ln K + \bar z + \frac1{2K}\sum_k(z_k - \bar z)^2$ with $\bar z$ the mean logit. Taking expectations, $\E\bar z = 0$, $\E z_y = 0$, and $\E\sum_k(z_k - \bar z)^2 = (K - 1)\sigma^2$, which gives the formula.
:::

So a $10$-class classifier should start near $\ln10 = 2.303$, a binary one near $0.693$, and a language model with a $50{,}257$-token vocabulary near $10.82$. A much higher initial loss means the logits are too large — the output layer's initialisation is too big, or the inputs are not standardised — and the first few hundred steps will be wasted shrinking them ("the hockey-stick loss curve"). A much lower one usually means a bug: labels leaking into the inputs, or the loss averaged over the wrong axis. If the classes are imbalanced, the ideal starting point is the entropy of the class frequencies, which can be reached by initialising the output biases to the log frequencies.

### A sequence of checks {#sec-checks}

::: algorithm Bringing up a new training run {#alg-bringup}
1. **Inspect the data.** Look at decoded examples and their labels after the whole pipeline, exactly as the model sees them, including augmentation and tokenisation.
2. **Check the initial loss** against [[#prop-initial-loss]], and check the gradients numerically on a tiny model ([[neural-networks/backpropagation#sec-gradcheck]]).
3. **Overfit one batch.** Train on a single small batch with regularisation off; the training loss should go to nearly zero. If it does not, the model, the loss or the optimiser is broken — no amount of data will fix it.
4. **Find a learning rate.** Run short trainings over a logarithmic grid of learning rates (or one run whose learning rate grows exponentially, the "range test" of Smith, 2017) and pick a value somewhat below the point where the loss stops improving or diverges.
5. **Scale up gradually**: more data, a larger model, regularisation on, longer schedules — one change at a time, with a baseline to compare against.
6. **Monitor** training and validation loss, the learning rate, the global gradient norm, and a few activation and weight statistics per layer throughout.
:::

The listing applies steps 2 and 4 to the disc-and-ring problem of [[neural-networks/backpropagation#sec-code]], with a $2$-$16$-$2$ tanh network and full-batch gradient descent, and then repeats the best learning rate with five seeds.

```python
import math, random

def make_rings(n, rng):                       # class 0: disc of radius 1, class 1: ring 1.3-2
    data = []
    for i in range(n):
        t = i % 2
        r = rng.uniform(0, 1) if t == 0 else rng.uniform(1.3, 2)
        a = rng.uniform(0, 2 * math.pi)
        data.append(((r * math.cos(a), r * math.sin(a)), t))
    return data

def train(lr, steps, seed, data, hidden=16):
    """Full-batch gradient descent on a 2-16-2 tanh MLP; returns the loss curve."""
    rng = random.Random(seed)
    W1 = [[rng.gauss(0, 1 / math.sqrt(2)) for _ in range(2)] for _ in range(hidden)]
    b1 = [0.0] * hidden
    W2 = [[rng.gauss(0, 1 / math.sqrt(hidden)) for _ in range(hidden)] for _ in range(2)]
    b2 = [0.0, 0.0]
    curve = []
    for step in range(steps):
        gW1 = [[0.0, 0.0] for _ in range(hidden)]; gb1 = [0.0] * hidden
        gW2 = [[0.0] * hidden for _ in range(2)]; gb2 = [0.0, 0.0]
        loss = 0.0
        for (x0, x1), y in data:
            h = [math.tanh(W1[j][0] * x0 + W1[j][1] * x1 + b1[j]) for j in range(hidden)]
            z = [sum(W2[k][j] * h[j] for j in range(hidden)) + b2[k] for k in range(2)]
            m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e)
            loss += m + math.log(s) - z[y]
            dz = [e[k] / s - (k == y) for k in range(2)]
            for k in range(2):
                gb2[k] += dz[k]
                for j in range(hidden):
                    gW2[k][j] += dz[k] * h[j]
            for j in range(hidden):
                da = (dz[0] * W2[0][j] + dz[1] * W2[1][j]) * (1 - h[j] ** 2)
                gb1[j] += da; gW1[j][0] += da * x0; gW1[j][1] += da * x1
        n = len(data)
        curve.append(loss / n)
        if not math.isfinite(loss):
            break
        for j in range(hidden):
            b1[j] -= lr * gb1[j] / n
            for i in range(2):
                W1[j][i] -= lr * gW1[j][i] / n
        for k in range(2):
            b2[k] -= lr * gb2[k] / n
            for j in range(hidden):
                W2[k][j] -= lr * gW2[k][j] / n
    return curve

data = make_rings(200, random.Random(0))
print("learning-rate sweep, 300 full-batch steps (loss at steps 1 / 30 / 100 / 300):")
for lr in [0.01, 0.1, 1.0, 3.0, 10.0, 30.0]:
    c = train(lr, 300, seed=1, data=data)
    pts = [c[i] if i < len(c) else float("nan") for i in (0, 29, 99, 299)]
    print(f"  lr {lr:5.2f}: " + "  ".join(f"{v:7.4f}" for v in pts))
print("same lr 1.0, five seeds (loss at step 300):",
      " ".join(f"{train(1.0, 300, seed=s, data=data)[-1]:.4f}" for s in range(5)))
```

```text
learning-rate sweep, 300 full-batch steps (loss at steps 1 / 30 / 100 / 300):
  lr  0.01:  0.6932   0.6875   0.6790   0.6618
  lr  0.10:  0.6932   0.6627   0.5722   0.2699
  lr  1.00:  0.6932   0.2826   0.0614   0.0178
  lr  3.00:  0.6932   0.1113   0.0268   0.0073
  lr 10.00:  0.6932   0.0021   0.0007   0.0002
  lr 30.00:  0.6932   6.1836   0.5337   0.4483
same lr 1.0, five seeds (loss at step 300): 0.0236 0.0178 0.0230 0.0171 0.0181
```

The initial loss is $0.6932$, matching $\ln2 = 0.6931$ as [[#prop-initial-loss]] predicts. Across learning rates spanning a factor of $3{,}000$ the outcome ranges from barely moving ($0.01$) to excellent ($10$) to broken ($30$: the loss jumps to $6.2$ and the network ends stuck at $0.45$, probably with saturated tanh units). The usable range covers two orders of magnitude and the best value sits just below the edge of instability — typical of learning-rate sweeps, and the reason they are done on a logarithmic grid. Different seeds at the same learning rate give final losses from $0.017$ to $0.024$: a $40\%$ spread from initialisation alone, which is why one run is not evidence that one setting beats another.

### Reading loss curves {#sec-curves}

| symptom | likely causes |
|---|---|
| loss NaN or infinite | learning rate too high; overflow in float16; $\log0$ or division by zero in a hand-written loss; bad input values |
| loss flat from the start | learning rate far too low; gradients not reaching the parameters (detached graph, frozen layers, wrong optimiser parameter list); dead or saturated units |
| loss decreases, then rises steadily | learning rate too high for the later phase; missing decay; instability building up |
| validation loss rises while training loss falls | overfitting: more data, augmentation, regularisation, or early stopping |
| validation loss *below* training loss | dropout or augmentation active only in training; or validation data easier than (or leaked from) training data |
| sudden isolated spikes | an unusual batch, a large update in a high-curvature region, growing attention logits; Adam with too small $\beta_2$ or $\epsilon$ |
| periodic pattern in the loss | data not shuffled; epoch boundaries; a recurring bad shard |

**Loss spikes** are a characteristic problem of large Transformer runs. Mitigations reported in the literature include gradient clipping ([[neural-networks/optimisers#def-clipping]]), lower learning rates, QK-normalisation to bound attention logits ([[transformers/transformer-block]]), and operational fixes: the PaLM team (Chowdhery et al., 2022) restarted from a checkpoint about $100$ steps before a spike and skipped roughly $200$ to $500$ batches, after finding that the spikes were not caused by individual bad examples alone. The **global gradient norm** is the most sensitive early warning: it often rises before the loss does.

::: warning Silent failures
The worst bugs do not crash. Some that have cost real projects weeks: labels shuffled independently of their inputs (the model learns the class frequencies and nothing else, so the loss stays at the entropy of the labels); a data-loader seed reused by every worker, so each "random" augmentation is applied identically several times; validation run in training mode, with dropout on; a learning-rate schedule defined in epochs but stepped every batch, so the learning rate reaches zero almost immediately; a `softmax` applied before a loss function that expects raw logits, so it is applied twice; and an evaluation metric computed on a padded batch without the mask. Each produces a model that trains, just worse. Comparing against a predicted number at every stage, and against a simple baseline, is the defence.
:::

::: quiz
A $1{,}000$-class image classifier starts training with a loss of $45$. What is the most likely explanation?
- [ ] The learning rate is too low
- [ ] The model is too small for the task
- [x] The output logits are far too large at initialisation, for example because the last layer's weights or the inputs are badly scaled
- [ ] Nothing is wrong; large initial losses are normal
::: solution
By [[#prop-initial-loss]] an untrained $1{,}000$-class model should start near $\ln1000 = 6.91$. A loss of $45$ means the network is confidently wrong: some logits exceed the correct one by tens of units. The usual causes are an output layer initialised with too large a scale or unnormalised inputs (pixels in $0$–$255$ rather than standardised). The learning rate and model size cannot affect the loss before the first step.
:::
:::

## Reproducibility {#sec-reproducibility}

A result that cannot be reproduced cannot be debugged, compared or trusted. Reproducibility has two levels: **re-running** the same code on the same hardware should give the same numbers, and **replicating** a result with fresh randomness should give the same conclusion.

**Seeds.** Every source of randomness needs a seed: Python's and NumPy's generators, the framework's (on every device), the data loader's shuffling and each worker's augmentation. Setting a single global seed often misses some of these.

**Non-determinism in parallel arithmetic.** Even with all seeds fixed, many GPU kernels are not deterministic, because they accumulate sums with atomic operations whose order depends on thread scheduling, and floating-point addition is not associative: in float32, $(10^8 + 1) - 10^8 = 0$ while $(10^8 - 10^8) + 1 = 1$, because the spacing of float32 numbers near $10^8$ is $8$ (by [[#prop-swamping]]). Frameworks offer deterministic modes (in PyTorch, `torch.use_deterministic_algorithms(True)`) at some cost in speed. Distributed training adds further sources: the order of reductions across devices, and different numbers of devices changing how a batch is split.

The listing illustrates the numerical points of this chapter: bfloat16 and float16 rounding, updates lost below half an ulp, a float32 sum whose value depends on the order of its terms, and initial losses against $\ln K$.

```python
import math, random, struct

# 1. rounding to bfloat16 and float16 (round to nearest even), emulated with struct
def to_bf16(x):
    b = struct.unpack("<I", struct.pack("<f", x))[0]          # float32 bit pattern
    b = (b + 0x7FFF + ((b >> 16) & 1)) & 0xFFFF0000           # keep 8 exponent + 7 mantissa bits
    return struct.unpack("<f", struct.pack("<I", b))[0]
def to_fp16(x):
    try:
        return struct.unpack("<e", struct.pack("<e", x))[0]   # IEEE half precision
    except OverflowError:
        return math.inf

print("value      bf16        fp16")
for v in [1.0 + 1e-3, 3.14159265, 1e-8, 70000.0]:
    print(f"{v:<10.8g} {to_bf16(v):<11.8g} {to_fp16(v):.8g}")

# 2. small updates vanish in low precision: add 1e-3 a thousand times to 1.0
w_bf16, w_fp32 = 1.0, 1.0
for _ in range(1000):
    w_bf16 = to_bf16(w_bf16 + 1e-3)
    w_fp32 = struct.unpack("<f", struct.pack("<f", w_fp32 + 1e-3))[0]
print(f"1 + 1000 * 1e-3:  bf16 weights {w_bf16},  fp32 weights {w_fp32:.6f}")

# 3. floating-point addition is not associative: the order of a sum changes the result
rng = random.Random(0)
xs = [rng.gauss(0, 1) * 10 ** rng.randint(-3, 3) for _ in range(10000)]
def f32_sum(values):
    s = 0.0
    for v in values:
        s = struct.unpack("<f", struct.pack("<f", s + v))[0]  # accumulate in float32
    return s
a, b = f32_sum(xs), f32_sum(sorted(xs))
print(f"float32 sum in two orders: {a:.6f} vs {b:.6f}  (exact {math.fsum(xs):.6f})")

# 4. the loss at initialisation: K-way softmax with small random logits
for K in [10, 1000, 50257]:
    losses = []
    for _ in range(200):
        z = [rng.gauss(0, 0.02) for _ in range(K)]
        m = max(z); lse = m + math.log(sum(math.exp(v - m) for v in z))
        losses.append(lse - z[0])
    print(f"K = {K:6d}: mean initial loss {sum(losses) / len(losses):.4f}   ln K = {math.log(K):.4f}")
```

```text
value      bf16        fp16
1.001      1           1.0009766
3.1415927  3.140625    3.140625
1e-08      1.0011718e-08 0
70000      70144       inf
1 + 1000 * 1e-3:  bf16 weights 1.0,  fp32 weights 2.000047
float32 sum in two orders: -48778.687500 vs -48778.699219  (exact -48778.617850)
K =     10: mean initial loss 2.3031   ln K = 2.3026
K =   1000: mean initial loss 6.9098   ln K = 6.9078
K =  50257: mean initial loss 10.8231   ln K = 10.8249
```

Bfloat16 cannot tell $1.001$ from $1$, but it keeps $10^{-8}$ and $70{,}000$ (to within its $8$-bit precision), which float16 flushes to zero and overflows respectively. A thousand updates of $10^{-3}$ leave a bfloat16 weight at exactly $1$ — each is below half the ulp of $0.0078$, as [[#prop-swamping]] says — while the float32 master copy reaches $2.000047$ (itself slightly off, from float32 rounding). The same $10{,}000$ numbers summed in float32 in two orders differ in the fifth significant digit, and neither equals the exact sum. The initial losses agree with [[#prop-initial-loss]] within sampling noise.

**Record everything.** A run is reproducible only if its full configuration is: the code version (commit hash), all hyperparameters, the data version and preprocessing, library and driver versions, hardware, and the seeds. **Checkpoints** should hold not just the weights but the optimiser state, the learning-rate scheduler, the random-generator states and the position in the data stream, so that a resumed run continues exactly where it stopped; resuming with fresh optimiser moments or restarting the data order is a common source of loss spikes after restarts.

**Variance across seeds.** Finally, replication requires knowing how much results vary for reasons that have nothing to do with the change being tested. Report the mean and spread over several seeds, and treat differences smaller than the seed-to-seed spread as noise. The five seeds of the learning-rate experiment above differ by $40\%$ in final loss on a toy problem; published comparisons have repeatedly shrunk or vanished when re-run with more seeds and equal tuning effort for the baselines.

::: history
Much of the practical knowledge of training was long passed on informally. Yann LeCun, Léon Bottou, Genevieve Orr and Klaus-Robert Müller's "Efficient BackProp" (1998) collected advice on input standardisation, initialisation and learning rates; Léon Bottou's "Stochastic gradient descent tricks" and Yoshua Bengio's "Practical recommendations for gradient-based training of deep architectures" (both 2012) updated it for the deep-learning era. Leslie Smith's learning-rate range test (2017) and Andrej Karpathy's "A recipe for training neural networks" (2019) became standard references for practitioners. Mixed-precision training with loss scaling was described by Paulius Micikevicius and colleagues (2018); bfloat16, introduced for Google's TPUs, was analysed for deep-learning training by Dhiraj Kalamkar and colleagues (2019). Samyam Rajbhandari and colleagues' ZeRO (2020) addressed the memory of optimiser state in data-parallel training, and reports of large runs such as PaLM (2022) documented operational practice such as handling loss spikes.
:::

::: summary
- The **pipeline** must keep splits separate (including preprocessing statistics), shuffle properly, standardise inputs, and keep the accelerator fed.
- Variable-length sequences are **padded and masked**, or bucketed or **packed**; the loss must average over real tokens only. **Gradient accumulation** equals large-batch training only if micro-batch losses are weighted by their token counts.
- **Mixed precision** computes in bfloat16 (float32's range, $8$-bit precision) or float16 (narrow range, needs **loss scaling**), keeping float32 master weights because updates below half an ulp are lost; with Adam this costs about $16$ bytes per parameter.
- **Debug by prediction**: the initial loss of a $K$-class model is $\approx\ln K$; overfit one batch; sweep the learning rate on a logarithmic grid; monitor losses, gradient norms and activation statistics; read the symptoms of loss curves.
- **Reproducibility** needs every seed, deterministic kernels where possible (floating-point addition is not associative), complete configurations and checkpoints, and results reported over several seeds.
:::

## Exercises

::: exercise An expected initial loss {level=1 check="ln(100)"}
A $100$-class classifier is initialised so that its logits are nearly zero. What loss should it report before training?
::: solution
$\ln100\approx4.605$ nats, by [[#prop-initial-loss]].
:::
:::

::: exercise Padding waste {level=1 check="1-(30+60+90+120)/(4*120)"}
Four sequences of lengths $30$, $60$, $90$ and $120$ are padded to $120$. What fraction of positions is padding?
::: solution
Real tokens: $300$ of $480$ positions, so the padding fraction is $1 - 300/480 = 0.375$.
:::
:::

::: exercise Bytes per parameter {level=1 check="16*1.3e10"}
Using the accounting of [[#ex-memory]], how many bytes do the weights, gradients and Adam state of a $13\times10^9$-parameter model take?
::: solution
$16\cdot1.3\times10^{10} = 2.08\times10^{11}$ bytes, about $208$ GB.
:::
:::

::: exercise The ulp of bfloat16 {level=2 check="2^(-7)*256"}
What is the spacing of bfloat16 numbers between $256$ and $512$? What is the smallest update that changes a weight of $300$? Enter the spacing.
::: solution
With $m = 7$ mantissa bits the spacing in $[2^E, 2^{E+1})$ is $2^{E-7}$; for $E = 8$ it is $2^{1} = 2$, which is $2^{-7}\cdot256$. By [[#prop-swamping]] updates smaller than half of it, $1$, are lost (an update of exactly $1$ is a tie, resolved by rounding to even). So a weight of $300$ cannot be changed by any update smaller than $1$ in bfloat16 — a relative change of $0.33\%$.
:::
:::

::: exercise Correct accumulation {level=2 check="(50*1.5+150*2.5+300*2)/500"}
Three micro-batches have $50$, $150$ and $300$ real tokens with mean losses $1.5$, $2.5$ and $2.0$. What is the full-batch loss, and what does naive averaging give? Enter the full-batch loss.
::: solution
Correct: $(50\cdot1.5 + 150\cdot2.5 + 300\cdot2.0)/500 = (75 + 375 + 600)/500 = 2.1$. Naive: $(1.5 + 2.5 + 2.0)/3 = 2.0$.
:::
:::

::: exercise Loss scaling {level=2}
A gradient component is $3\times10^{-9}$. Show that it underflows to zero in float16, and that with loss scaling by $S = 2^{16}$ it is represented. What constraint does overflow put on $S$ if the largest gradient component is $0.5$?
::: solution
Float16's smallest positive (subnormal) value is $2^{-24}\approx6.0\times10^{-8}$; $3\times10^{-9}$ is below half of it and rounds to $0$. Scaled by $2^{16} = 65{,}536$ it becomes $1.97\times10^{-4}$, above the smallest normal $6.1\times10^{-5}$, so it is represented with full precision, and dividing by $S$ in float32 recovers it. The largest scaled component must stay below $65{,}504$: $0.5\,S < 65{,}504$, so $S < 131{,}008$, that is $S\le2^{16}$ among powers of two. Dynamic loss scaling finds this boundary automatically by backing off on overflow.
:::
:::

::: exercise Imbalanced classes {level=2 check="-(0.9*ln(0.9)+0.1*ln(0.1))"}
In a binary problem $90\%$ of examples are negative. What loss does a model with zero logits start at, what is the best loss achievable without looking at the input, and how should the output bias be initialised to start there? Enter the best input-independent loss.
::: solution
Zero logits give $p = \frac12$ and loss $\ln2 = 0.693$. The best input-independent prediction is the class frequency, with loss equal to its entropy, $-(0.9\ln0.9 + 0.1\ln0.1) = 0.325$. Setting the output bias to the log-odds $\ln(0.1/0.9) = -2.197$ (for a single logit for the positive class) starts the model there, so that training spends no steps learning the class frequencies.
:::
:::

::: exercise Non-associativity {level=2}
In float32 (epsilon $2^{-23}$), compute $(2^{24} + 1) - 2^{24}$ and $(2^{24} - 2^{24}) + 1$. Explain why a parallel sum of a million float32 numbers can change from run to run, and why accumulating in float32 is still the norm for bfloat16 matrix multiplications.
::: solution
Near $2^{24}$ the spacing of float32 numbers is $2^{24-23} = 2$, so $2^{24} + 1$ is a tie between $2^{24}$ and $2^{24} + 2$, broken to the even significand, $2^{24}$; the first expression gives $0$, the second $1$. A parallel reduction adds partial sums in an order that depends on scheduling, and each order rounds differently, so the result can differ in the last few bits between runs; through training, such differences are amplified by the chaotic dynamics of optimisation, and runs diverge measurably after many steps. Accumulating products in float32 keeps the rounding error of a length-$n$ dot product around $n\cdot2^{-24}$ in relative terms instead of $n\cdot2^{-8}$, which would be unacceptable for $n$ in the thousands; hardware therefore multiplies in bfloat16 and accumulates in float32.
:::
:::

::: exercise A deterministic data order {level=3}
A training job is preempted at step $40{,}000$ of an epoch of $100{,}000$ steps and resumed from a checkpoint containing the weights and optimiser state but not the data-loader state; the loader reshuffles from its seed and starts the epoch again. What goes wrong, and how should data order be made resumable?
::: solution
The resumed run revisits the $40{,}000$ batches already seen in this epoch (if the shuffle is the same) or a random mix of seen and unseen ones (if not), so some examples are seen twice and others not at all before the epoch ends; at large scale this biases training towards the repeated data and can show as a dip in training loss and a small rise in validation loss. Worse, if each restart reshuffles differently, the set of examples seen becomes uncontrolled. The fix is to make the data order a deterministic function of (seed, epoch, step) — for example a permutation computed from the seed and epoch, indexed by the step — and to save the step counter (and any shuffle-buffer state) in the checkpoint, so that resuming skips exactly the consumed batches.
:::
:::

::: exercise How many seeds? {level=3 check="2*0.003/sqrt(5)*sqrt(2)"}
Two configurations are each run with $n = 5$ seeds. The seed-to-seed standard deviation of the final accuracy is $0.003$ for both. Approximately how large must the difference of the mean accuracies be to exceed two standard errors of the difference? How does the answer change with $n = 20$ seeds?
::: solution
Each mean has standard error $0.003/\sqrt5$, and the difference of two independent means has standard error $\sqrt2\cdot0.003/\sqrt5 = 0.0019$. Two standard errors is $2\sqrt2\cdot0.003/\sqrt5\approx0.0038$, so differences below about $0.4$ percentage points are not distinguishable from seed noise. With $20$ seeds the threshold halves to about $0.0019$. Many published improvements are of this size, which is why results should come with their seed variance (and why the evaluation methods of [[evaluation]] matter).
:::
:::
