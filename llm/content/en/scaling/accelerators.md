The previous chapter counted the work of a training step: about $6N$ floating-point operations per token, plus memory for weights, optimiser state and activations. This chapter asks how fast that work can be done. The answer is rarely "as fast as the advertised peak". An accelerator can multiply numbers far faster than it can fetch them from its main memory, so whether an operation runs at the speed of the arithmetic units or at the speed of memory depends on how many operations it performs per byte it moves. That single ratio — **arithmetic intensity** — together with the **roofline model** built on it, explains why matrix multiplications run near peak while normalisation layers crawl, why decoding one token at a time leaves most of the hardware idle, and why fused kernels such as FlashAttention matter.

We first describe what an accelerator is made of, with the memory hierarchy that determines its behaviour; then derive the roofline bounds and apply them to the operations of a Transformer; then explain systolic arrays, the hardware structure behind matrix units; and finally survey device generations and the interconnects that join them, with figures dated and taken from vendors' published specifications. The roofline and arithmetic intensity were introduced for attention in [[transformers/attention-complexity]]; here they are developed for the whole model and the whole machine.

## Throughput machines {#sec-throughput}

A central processing unit (CPU) is designed for **latency**: it runs a few threads of complicated, branching code as quickly as possible, with large caches, branch prediction and out-of-order execution. An accelerator for deep learning is designed for **throughput**: it runs the same simple operation over millions of numbers, and spends its transistors on arithmetic units rather than control logic. Two designs dominate.

A **graphics processing unit** (GPU), in its datacentre form, consists of many **streaming multiprocessors** (SMs) — $108$ in an NVIDIA A100, $132$ in an H100 SXM — each containing scalar and vector arithmetic units, special **tensor cores** that multiply small matrix tiles in a single instruction, a large register file, and a fast on-chip scratchpad (shared memory). Thousands of threads, grouped into warps of $32$ that execute in lock-step, hide memory latency by switching between warps while some wait for data. AMD's datacentre GPUs have the same broad structure (compute units with matrix cores).

A **tensor processing unit** (TPU), designed by Google, is built around a few large **matrix-multiply units** (MXUs) — systolic arrays of $128\times128$ multiply–accumulate cells in recent generations — alongside vector and scalar units and on-chip vector memory. It runs code compiled ahead of time by the XLA compiler, which schedules data movement explicitly rather than relying on thousands of threads.

The details differ, but both are organised around the same facts: matrix multiplication is the dominant operation; special units perform it at very high rates in reduced precision; and keeping those units fed with data is the hard part.

## The memory hierarchy {#sec-hierarchy}

::: definition Memory hierarchy {#def-hierarchy}
An accelerator's **memory hierarchy** is the sequence of storage levels between the arithmetic units and the rest of the system, ordered from small, fast and close to large, slow and far: registers; on-chip SRAM (shared memory or L1 cache, and an L2 cache on GPUs; vector memory on TPUs); **high-bandwidth memory** (HBM), DRAM stacked beside the processor in the same package; host DRAM, reached over PCIe or a similar link; and storage. Each level is characterised by its **capacity** and its **bandwidth** to the level above.
:::

For concreteness, the NVIDIA H100 SXM (announced 2022), as published by NVIDIA, has $256$ KB of registers and $256$ KB of combined L1 cache and shared memory per SM, a $50$ MB L2 cache, and $80$ GB of HBM3 delivering $3.35$ TB/s. On-chip SRAM bandwidth is an order of magnitude higher than HBM bandwidth, but its capacity is about a thousand times smaller than HBM's. Host memory is reached over PCIe Gen5 at about $64$ GB/s in each direction for a 16-lane link — fifty times slower than HBM.

The practical consequence is that every tensor used in training lives in HBM, and every operation must bring its operands from HBM into on-chip memory, compute, and write results back. If an operation does little arithmetic per byte brought in, the arithmetic units wait.

## The roofline model {#sec-roofline}

::: definition Arithmetic intensity and roofline {#def-roofline}
The **arithmetic intensity** $I$ of a computation is the number of FLOPs it performs divided by the number of bytes it moves between HBM and the chip. A device with peak throughput $\pi$ FLOP/s and memory bandwidth $\beta$ bytes/s executes it at no more than

$$
R(I) = \min(\pi,\ \beta I)\ \text{FLOP/s}.
$$ {#eq-roofline}

The **ridge point** $I^\ast = \pi/\beta$ separates **memory-bound** computations ($I < I^\ast$), limited by bandwidth, from **compute-bound** ones ($I > I^\ast$).
:::

The bound follows from two facts: the arithmetic cannot go faster than $\pi$, and a computation moving $M$ bytes takes at least $M/\beta$ seconds, during which it performs $IM$ FLOPs. Real kernels fall below the roof — latency, imperfect overlap of memory and compute, and on-chip bottlenecks all cost something — but well-written ones come close, and the roofline tells you which resource to optimise. On a log–log plot it is a sloped line (memory-bound) meeting a horizontal one (compute-bound) at the ridge.

::: widget plot
f: log10(min(989, 3.35*10^x)); log10(min(312, 2.039*10^x)); log10(min(p, b*10^x))
x: -1, 4
y: -1, 3.3
sliders: p=500:100:2500:10; b=2:0.5:8:0.1
vlines: 2.47; 2.18
labels: H100 SXM (bf16 dense); A100 SXM; your device: $p$ TFLOP/s, $b$ TB/s
caption: Rooflines on log–log axes: $\log_{10}$ of attainable TFLOP/s against $\log_{10}$ of arithmetic intensity (FLOPs per byte), using the vendors' published peak dense bf16 throughput and HBM bandwidth (A100 SXM 80 GB, 2020; H100 SXM, 2022). The vertical lines mark their ridge points, $153$ and $295$ FLOPs per byte. Raising $p$ without raising $b$ moves the ridge right: more of the workload becomes memory-bound.
:::

The ridge point has risen with each generation, because arithmetic throughput has grown faster than memory bandwidth: from about $153$ FLOPs per byte for the A100 to about $295$ for the H100. More and more operations that were once compute-bound are now memory-bound.

::: proposition Intensity of a matrix product {#prop-intensity-matmul}
Multiplying an $m\times k$ matrix by a $k\times n$ matrix, reading both operands and writing the result once at $p$ bytes per element, has arithmetic intensity

$$
I = \frac{2mkn}{p\,(mk + kn + mn)}.
$$

For square matrices ($m = k = n$) in a 16-bit format ($p = 2$), $I = n/3$. For a linear layer applied to $b$ tokens ($m = b$, $k = n = d$) with $b\ll d$, $I\approx b$ in 16-bit.
:::

::: proof
The FLOPs are $2mkn$ by [[scaling/flops-memory#prop-matmul]]; the bytes moved are $p$ times the number of elements of the two inputs and the output. With $m = k = n$ and $p = 2$: $2n^3/(2\cdot3n^2) = n/3$. With $m = b$ and $k = n = d$: $2bd^2/(2(bd + d^2 + bd)) = bd/(d + 2b)$, which tends to $b$ when $b\ll d$.
:::

So a matrix product's intensity grows with its smallest dimension. Large square products are deeply compute-bound; a product in which one dimension is small — the number of tokens in a decoding batch, for instance — is memory-bound, because each weight is fetched from HBM and used only $b$ times.

::: example Matrix product against element-wise operation {#ex-roofline}
On an H100 SXM ($\pi = 989$ TFLOP/s dense bf16, $\beta = 3.35$ TB/s), estimate the time of (a) multiplying two $4096\times4096$ bf16 matrices, and (b) applying GeLU element-wise to one $4096\times4096$ bf16 matrix, counting about $10$ FLOPs per element.
::: solution
(a) FLOPs $2\cdot4096^3 = 1.37\times10^{11}$; bytes $3\cdot4096^2\cdot2 = 1.0\times10^8$; $I = 1365$ FLOPs/byte, far above the ridge of $295$, so compute-bound: at least $1.37\times10^{11}/9.89\times10^{14} = 0.14$ ms. (b) Bytes: read and write $4096^2$ elements at $2$ bytes, $6.7\times10^7$ bytes; FLOPs $1.7\times10^8$; $I = 2.5$ FLOPs/byte, far below the ridge, so memory-bound: at least $6.7\times10^7/3.35\times10^{12} = 0.020$ ms. The GeLU does $0.12\%$ of the matrix product's arithmetic but takes $14\%$ of its time — and operations like it (norms, residual additions, activations, softmax) are why Transformer layers fall short of peak.
:::
:::

**Fusion** is the main remedy. If the GeLU is applied to the output of the preceding matrix product while that output is still in on-chip memory — in the product's **epilogue** — it costs almost nothing: no extra round trip through HBM. Compilers (XLA, TorchInductor) and hand-written kernels fuse chains of element-wise operations, and FlashAttention fuses the whole of attention, keeping the score matrix in SRAM ([[transformers/attention-complexity]]). Fusion reduces bytes moved; it does not reduce FLOPs.

::: example Why decoding is memory-bound {#ex-decode}
A model with $70$ billion parameters in bf16 ($140$ GB of weights) generates text with a batch of $b$ sequences. Each decoding step multiplies every weight matrix by a $b\times d$ activation. Estimate the time per step on hardware with aggregate bandwidth $3.35$ TB/s per device (say the weights are split over two such devices, $6.7$ TB/s together, with peak $1.98$ PFLOP/s together), for $b = 1$ and $b = 256$, ignoring the KV cache.
::: solution
Each step must read all $140$ GB of weights: at least $140/6700 = 21$ ms regardless of $b$. The arithmetic is $2Nb$ FLOPs: for $b = 1$, $1.4\times10^{11}$ FLOPs, which at peak would take $0.07$ ms — the device is computing $0.3\%$ of the time. For $b = 256$, $3.6\times10^{13}$ FLOPs, $18$ ms at peak — now comparable to the memory time. By [[#prop-intensity-matmul]], the intensity is about $b$ FLOPs per byte, and the ridge is $295$: below a batch of a few hundred, decoding is memory-bound and throughput grows almost linearly with batch at constant latency. This is why serving systems batch requests aggressively, and why the KV cache, which must also be read every step, matters so much ([[scaling/flops-memory#prop-kv]]).
:::
:::

::: widget plot
f: min(1, 3.35*x*d/(d + 2*x)/989)
x: 1, 1024
y: 0, 1.05
sliders: d=8192:1024:16384:1024
labels: fraction of peak for a $b\times d$ by $d\times d$ product
caption: The best fraction of H100 peak (dense bf16) that a linear layer can reach when applied to $b$ tokens, from the roofline [[#eq-roofline]] and the intensity $bd/(d + 2b)$ of [[#prop-intensity-matmul]]. Below the ridge, utilisation is proportional to $b$: training, with many thousands of tokens per matrix product, sits on the flat part; single-sequence decoding sits at the far left.
:::

## Systolic arrays {#sec-systolic}

How do matrix units achieve such high throughput? The key is **data reuse inside the unit**: in an $n\times n$ product each input element is used $n$ times, and a well-designed unit fetches it once and passes it from cell to cell rather than fetching it $n$ times.

::: definition Systolic array {#def-systolic}
A **systolic array** (Kung and Leiserson, 1978) is a grid of identical processing elements (PEs), each connected only to its neighbours, through which data flow in a regular rhythm: on every clock cycle each PE takes inputs from its neighbours, performs one operation, and passes data on. In an **output-stationary** $s\times s$ array computing $C = AB$, PE $(i, j)$ accumulates $c_{ij}$; the entries of row $i$ of $A$ enter at the left of row $i$ and move right one PE per cycle, and the entries of column $j$ of $B$ enter at the top of column $j$ and move down. **Weight-stationary** arrays, used in TPUs, instead preload a tile of one operand into the PEs and stream the other through.
:::

For the products to meet at the right PE at the right time, the inputs are **skewed**: row $i$ of $A$ enters $i$ cycles late, column $j$ of $B$ enters $j$ cycles late.

::: theorem Timing of an output-stationary systolic array {#thm-systolic}
With the skewed schedule — $a_{il}$ entering row $i$ at cycle $i + l$ and $b_{lj}$ entering column $j$ at cycle $l + j$ (all indices from $0$) — PE $(i, j)$ receives $a_{il}$ and $b_{lj}$ together at cycle $i + j + l$. Computing the product of an $s\times k$ and a $k\times s$ matrix therefore takes $k + 2s - 2$ cycles, during which the array performs $s^2k$ multiply–accumulates, a utilisation of

$$
\frac{k}{k + 2s - 2}.
$$

Each element of $A$ and $B$ is read from outside the array once, and used $s$ times.
:::

::: proof
The element $a_{il}$ enters PE $(i, 0)$ at cycle $i + l$ and moves one PE right per cycle, so it is in PE $(i, j)$ at cycle $i + l + j$. The element $b_{lj}$ enters PE $(0, j)$ at cycle $l + j$ and moves one PE down per cycle, so it is in PE $(i, j)$ at cycle $l + j + i$. They coincide, and PE $(i, j)$ adds $a_{il}b_{lj}$ to its accumulator at cycle $i + j + l$. For fixed $(i, j)$, as $l$ runs from $0$ to $k - 1$ these are distinct cycles, so each PE does at most one multiply–accumulate per cycle and ends with exactly $\sum_l a_{il}b_{lj} = c_{ij}$. The earliest operation is at cycle $0$ (PE $(0,0)$, $l = 0$) and the latest at cycle $(s - 1) + (s - 1) + (k - 1)$ (PE $(s-1, s-1)$, $l = k - 1$), so the computation spans $k + 2s - 2$ cycles. Each of the $s^2$ PEs performs $k$ operations, $s^2k$ in total, out of $s^2(k + 2s - 2)$ available slots. Each $a_{il}$ is used by the $s$ PEs of row $i$ and each $b_{lj}$ by the $s$ PEs of column $j$, having been read once at the boundary.
:::

The utilisation tends to $1$ when $k\gg s$: the fill and drain of the pipeline ($2s - 2$ cycles) are amortised over a long inner dimension. And the external bandwidth needed is only $2s$ elements per cycle for $s^2$ multiply–accumulates — the array's own data reuse is what lets it outrun memory. The program below simulates an output-stationary array cycle by cycle and checks both the result and the timing.

```python
import random

def systolic_matmul(A, B):
    """Output-stationary s x s systolic array computing C = A B (A: s x k, B: k x s).
    Row i of A enters from the left delayed by i cycles; column j of B enters from
    the top delayed by j cycles. Each cycle every cell multiplies the pair it holds,
    adds the product to its accumulator, and passes a right and b down."""
    s, k = len(A), len(A[0])
    acc = [[0] * s for _ in range(s)]
    a_reg = [[None] * s for _ in range(s)]          # value held by cell (i, j) this cycle
    b_reg = [[None] * s for _ in range(s)]
    cycle, macs, busy_last = 0, 0, 0
    while True:
        # shift: a moves right, b moves down (iterate from the far end)
        for i in range(s):
            for j in reversed(range(s)):
                a_reg[i][j] = a_reg[i][j - 1] if j > 0 else (
                    A[i][cycle - i] if 0 <= cycle - i < k else None)
        for j in range(s):
            for i in reversed(range(s)):
                b_reg[i][j] = b_reg[i - 1][j] if i > 0 else (
                    B[cycle - j][j] if 0 <= cycle - j < k else None)
        busy = 0
        for i in range(s):
            for j in range(s):
                if a_reg[i][j] is not None and b_reg[i][j] is not None:
                    acc[i][j] += a_reg[i][j] * b_reg[i][j]
                    busy += 1
        macs += busy
        cycle += 1
        if busy:
            busy_last = cycle
        elif cycle > k + 2 * s:
            break
    return acc, busy_last, macs

random.seed(0)
for s, k in ((4, 4), (4, 64), (16, 16), (16, 1024)):
    A = [[random.randint(-9, 9) for _ in range(k)] for _ in range(s)]
    B = [[random.randint(-9, 9) for _ in range(s)] for _ in range(k)]
    C, cycles, macs = systolic_matmul(A, B)
    ref = [[sum(A[i][l] * B[l][j] for l in range(k)) for j in range(s)] for i in range(s)]
    print(f"s={s:2d} k={k:4d}  correct={C == ref}  cycles={cycles}  k+2s-2={k + 2*s - 2}"
          f"  MACs={macs}  utilisation={macs / (cycles * s * s):.3f}")
```

```text
s= 4 k=   4  correct=True  cycles=10  k+2s-2=10  MACs=64  utilisation=0.400
s= 4 k=  64  correct=True  cycles=70  k+2s-2=70  MACs=1024  utilisation=0.914
s=16 k=  16  correct=True  cycles=46  k+2s-2=46  MACs=4096  utilisation=0.348
s=16 k=1024  correct=True  cycles=1054  k+2s-2=1054  MACs=262144  utilisation=0.972
```

The first TPU (Jouppi et al., 2017) had a single weight-stationary array of $256\times256$ 8-bit multiply–accumulate cells running at $700$ MHz: $65{,}536\cdot2\cdot7\times10^8 = 9.2\times10^{13}$ operations per second, the published $92$ TOPS. Later TPUs use several $128\times128$ arrays per core in bf16. GPU tensor cores are much smaller matrix units — each multiplies small tiles per instruction — replicated across all SMs, with the reuse that a single large array gets from its size obtained instead through shared memory and registers. Both reach their peak only when the matrices are large enough to keep every unit busy, and when their dimensions are multiples of the tile sizes; a dimension of $4097$ instead of $4096$ can cost a whole extra tile of wasted work.

::: warning Peak FLOP/s is not a performance figure
Datasheets quote peak throughput for the most favourable case: dense matrix multiplication in the lowest supported precision, at maximum clock, sometimes with structured sparsity (which doubles the quoted figure for matrices with two zeros in every four values). No real training run reaches it. A run that achieves $40\%$ of the dense bf16 peak is doing well ([[scaling/large-runs]]). When comparing devices, compare like with like — dense against dense, the same precision — and look at memory bandwidth and capacity too, which for many workloads, inference in particular, matter more than peak arithmetic.
:::

## Device generations {#sec-generations}

The table lists datacentre accelerators widely used for training language models between 2020 and 2024, with figures as published by their vendors: peak dense (non-sparse) bf16 throughput, HBM capacity and bandwidth. They are peak figures for one device and are given only to show orders of magnitude and the trend; newer generations announced in 2024–2026 (as of 2026, NVIDIA's Blackwell family, AMD's later Instinct parts and Google's sixth- and seventh-generation TPUs, among others) raise all of them further and should be taken from current datasheets.

| device (vendor, year announced) | dense bf16 | HBM | bandwidth | ridge point |
|---|---|---|---|---|
| A100 SXM 80 GB (NVIDIA, 2020) | $312$ TFLOP/s | $80$ GB | $2.04$ TB/s | $153$ |
| TPU v4 (Google, 2021) | $275$ TFLOP/s | $32$ GB | $1.2$ TB/s | $229$ |
| H100 SXM (NVIDIA, 2022) | $989$ TFLOP/s | $80$ GB | $3.35$ TB/s | $295$ |
| TPU v5e (Google, 2023) | $197$ TFLOP/s | $16$ GB | $0.82$ TB/s | $241$ |
| TPU v5p (Google, 2023) | $459$ TFLOP/s | $95$ GB | $2.77$ TB/s | $166$ |
| Instinct MI300X (AMD, 2023) | $1307$ TFLOP/s | $192$ GB | $5.3$ TB/s | $247$ |

Three trends are visible across generations and are expected to continue. Peak arithmetic grows fastest, especially in low precision: H100 doubles its bf16 rate in fp8, and newer parts add 6- and 4-bit formats ([[scaling/mixed-precision]]). Memory bandwidth grows more slowly, so ridge points stay high or rise. Memory capacity per device has grown substantially, which matters most for inference and for reducing the amount of model parallelism needed in training.

::: example What a new generation buys {#ex-generations}
Using the table, compare the attainable throughput of an A100 and an H100 on (a) a compute-bound matrix product with $I = 1000$ FLOPs per byte and (b) a memory-bound kernel with $I = 50$.
::: solution
(a) Both are above their ridge points, so each runs at peak: $989/312 = 3.2$ times faster on the H100. (b) Both are below: A100 $2.04\cdot50 = 102$ TFLOP/s, H100 $3.35\cdot50 = 168$ TFLOP/s, a speed-up of only $1.64$ — the ratio of bandwidths. A workload's speed-up from new hardware depends on where it sits on the roofline: training dominated by large matrix products gains roughly the ratio of peaks, small-batch inference roughly the ratio of bandwidths.
:::
:::

A single device is never the whole story: what limits a large training run is usually the system — how many devices can be joined, and how fast.

## Interconnects {#sec-interconnects}

::: definition The latency–bandwidth model {#def-alpha-beta}
Sending a message of $M$ bytes over a link takes approximately

$$
t(M) = \alpha + \frac{M}{\beta_{\text{link}}},
$$ {#eq-alpha-beta}

where $\alpha$ is the **latency** (fixed cost per message, from microseconds within a server to tens of microseconds across a network) and $\beta_{\text{link}}$ the **bandwidth** of the link. Small messages are latency-bound, large ones bandwidth-bound; the crossover is at $M = \alpha\beta_{\text{link}}$.
:::

Accelerators are joined at three levels, each about an order of magnitude slower than the one before.

- **Within a server**, typically of $8$ devices, by a dedicated high-bandwidth fabric: NVIDIA's NVLink with NVSwitch gives each H100 $900$ GB/s of total bidirectional bandwidth ($450$ GB/s each way) to any other GPU in the server; AMD's Infinity Fabric links the MI300X devices of a server. Newer systems (as of 2026) extend such fabrics across racks of tens of devices.
- **Between servers**, by a network of switches: InfiniBand or Ethernet with RDMA (RoCE), commonly one $400$ Gb/s ($50$ GB/s) network interface per accelerator in 2023–2024 clusters, arranged in multi-level fat-tree or "rail-optimised" topologies in which the $k$-th device of every server connects to the same set of leaf switches.
- **TPU pods** use a different design: chips are joined directly to their neighbours by inter-chip interconnect links in a **torus** — a 3D torus of $4096$ chips for TPU v4, with **optical circuit switches** that can reconfigure the topology and route around failed parts (Jouppi et al., 2023).

The ratio between levels shapes everything in the next three chapters. An H100's HBM delivers $3.35$ TB/s; its NVLink, $450$ GB/s each way; its network interface, $50$ GB/s. Communication-heavy parallelism (tensor parallelism, which exchanges activations in every layer) is therefore kept within a server, and communication-light parallelism (data parallelism, which exchanges gradients once per step and can overlap it with computation) spans the network.

::: example Moving a gradient {#ex-interconnect}
A $7$-billion-parameter model has $14$ GB of bf16 gradients. How long does it take to send them once (a) between two GPUs in a server over NVLink at $450$ GB/s, (b) between servers at $50$ GB/s, (c) from GPU to host over PCIe Gen5 at $64$ GB/s? Take $\alpha$ as negligible.
::: solution
(a) $14/450 = 31$ ms. (b) $14/50 = 0.28$ s. (c) $14/64 = 0.22$ s. A training step of this model on one device might take a second or two; a factor of nine in link speed decides whether the exchange can hide behind computation. The all-reduce algorithms of [[scaling/data-parallelism]] move about twice the gradient size per device, independently of the number of devices.
:::
:::

::: quiz
A kernel performs $10^{10}$ FLOPs and moves $10^9$ bytes on a device with $\pi = 10^{15}$ FLOP/s and $\beta = 2\times10^{12}$ bytes/s. Which statements are true?
- [x] Its arithmetic intensity is $10$ FLOPs per byte.
- [x] It is memory-bound, and takes at least $0.5$ ms.
- [ ] Doubling the device's peak FLOP/s would halve its run time.
- [x] Fusing it with the next operation, so that its output is not written to HBM, could speed it up.
::: solution
$I = 10^{10}/10^9 = 10$, far below the ridge $\pi/\beta = 500$, so it is memory-bound and needs at least $10^9/(2\times10^{12}) = 0.5$ ms (the arithmetic alone would take $0.01$ ms). More peak arithmetic does not help a memory-bound kernel; fewer bytes moved does.
:::
:::

::: history
Systolic arrays were proposed by H. T. Kung and Charles Leiserson in 1978 for regular computations such as matrix multiplication. GPUs became general-purpose processors with NVIDIA's CUDA (2007), and Krizhevsky, Sutskever and Hinton's AlexNet (2012), trained on two consumer GPUs, made them the engine of deep learning. NVIDIA introduced tensor cores with the V100 (2017); Google described the first TPU, an inference chip with a $256\times256$ systolic array, in Jouppi et al. (2017), and later generations added bf16 training and pods of thousands of chips joined by a torus interconnect, with optical circuit switching in TPU v4 (Jouppi et al., 2023). The roofline model was introduced by Williams, Waterman and Patterson (2009) for multicore CPUs and has become the standard way to reason about accelerator kernels. Dao et al. (2022) showed with FlashAttention that reorganising attention to reduce memory traffic, not FLOPs, gave large speed-ups — an argument straight from the roofline.
:::

::: summary
- Accelerators are throughput machines: many arithmetic units, dedicated **matrix units** (tensor cores, MXUs), and a **memory hierarchy** from registers and SRAM to HBM, host memory and storage.
- The **roofline** bounds throughput by $\min(\pi, \beta I)$; computations below the ridge $\pi/\beta$ (about $150$–$300$ FLOPs per byte for recent devices) are **memory-bound**.
- Large matrix products have intensity $n/3$ (square, 16-bit) and are compute-bound; element-wise operations, norms and small-batch decoding ($I\approx b$) are memory-bound. **Fusion** removes HBM round trips.
- A **systolic array** reuses each input $s$ times; an $s\times s$ output-stationary array computes an $s\times k$ by $k\times s$ product in $k + 2s - 2$ cycles.
- Peak figures from datasheets are upper bounds for dense, low-precision matrix work; compare like with like and look at bandwidth and capacity.
- Interconnects step down by roughly an order of magnitude from HBM to in-server links (NVLink, ICI) to the network; parallelism strategies are mapped onto this hierarchy.
:::

## Exercises

::: exercise Ridge point {level=1 check="295"}
Using the published figures for the H100 SXM ($989$ TFLOP/s dense bf16, $3.35$ TB/s), compute the ridge point in FLOPs per byte, to the nearest whole number.
::: solution
$9.89\times10^{14}/3.35\times10^{12} = 295$ FLOPs per byte.
:::
:::

::: exercise Square matrix intensity {level=1 check="2048"}
What is the smallest square matrix size $n$ for which a bf16 product $n\times n$ by $n\times n$ has arithmetic intensity at least $682.67$ FLOPs per byte?
::: solution
$I = n/3\ge682.67$ gives $n\ge2048$.
:::
:::

::: exercise Systolic utilisation {level=1 check="0.8"}
A $128\times128$ output-stationary systolic array computes a product with inner dimension $k = 1016$. What fraction of its multiply–accumulate slots are used?
::: solution
$k/(k + 2s - 2) = 1016/(1016 + 254) = 1016/1270 = 0.8$.
:::
:::

::: exercise A memory-bound kernel {level=2 check="0.24"}
A residual addition reads two bf16 tensors of shape $8\times4096\times4096$ and writes one. On a device with $3.35$ TB/s, what is the minimum time in milliseconds? Give two significant figures.
::: solution
Bytes: $3\cdot8\cdot4096^2\cdot2 = 8.05\times10^8$; time $8.05\times10^8/3.35\times10^{12} = 2.4\times10^{-4}$ s $= 0.24$ ms. It performs only $1.3\times10^8$ FLOPs, which at peak would take $0.14\,\mu$s: the device spends almost all of the time waiting for memory.
:::
:::

::: exercise Linear layer at small batch {level=2 check="0.2134"}
A $8192\times8192$ bf16 weight matrix is applied to $b = 64$ tokens. Using [[#prop-intensity-matmul]] and the H100 figures, what fraction of peak can the product reach at most? Give four decimal places.
::: solution
$I = bd/(d + 2b) = 64\cdot8192/(8192 + 128) = 63.015$ FLOPs/byte. Attainable fraction $3.35\times10^{12}\cdot63.015/9.89\times10^{14} = 0.2134$, about a fifth of peak.
:::
:::

::: exercise Latency or bandwidth? {level=2 check="250000"}
A link has latency $\alpha = 5\,\mu$s and bandwidth $50$ GB/s. For what message size in bytes do latency and transfer time contribute equally? Why do communication libraries bucket many small gradient tensors into larger messages?
::: solution
$M = \alpha\beta_{\text{link}} = 5\times10^{-6}\cdot5\times10^{10} = 2.5\times10^5$ bytes ($250$ KB). Messages much smaller than this are dominated by latency; sending a model's hundreds of separate parameter tensors one by one would pay $\alpha$ hundreds of times, so they are concatenated into buckets of tens of megabytes.
:::
:::

::: exercise Decode throughput {level=2}
A model with $8$ billion parameters in bf16 is served on one device with $3.35$ TB/s and $989$ TFLOP/s. Ignoring the KV cache, estimate the minimum time per decoding step and the maximum tokens per second for batches of $1$, $64$ and $512$ sequences. At what batch does arithmetic become the limit?
::: solution
Weights: $16$ GB, read once per step: at least $16/3350 = 4.8$ ms. Arithmetic per step: $2\cdot8\times10^9\cdot b$ FLOPs, which at peak takes $0.016b$ ms. For $b = 1$: $4.8$ ms, $210$ tokens/s. For $b = 64$: arithmetic $1.0$ ms $<4.8$ ms, still $4.8$ ms, $13{,}400$ tokens/s. For $b = 512$: arithmetic $8.3$ ms $>4.8$ ms, so about $8.3$ ms and $62{,}000$ tokens/s. The crossover is at $0.016b = 4.8$, $b\approx295$ — the ridge point, as [[#prop-intensity-matmul]] predicts. In practice the KV cache adds memory traffic that grows with batch and context, moving the crossover.
:::
:::

::: exercise Peak of the first TPU {level=2 check="9.175e13"}
Verify the peak throughput of a $256\times256$ systolic array of 8-bit multiply–accumulate cells at $700$ MHz, counting each multiply–accumulate as two operations. Give four significant figures.
::: solution
$256^2\cdot2\cdot7\times10^8 = 65{,}536\cdot1.4\times10^9 = 9.175\times10^{13}$ operations per second, the published $92$ TOPS.
:::
:::

::: exercise Tiles and waves {level=3}
A GPU with $132$ SMs computes a product whose output is divided into tiles of $128\times256$, one tile per SM at a time. For an output of $4096\times4096$, how many tiles are there and how many "waves" of $132$ tiles are needed? What fraction of the last wave is idle, and what is the overall efficiency loss? Repeat for $4224\times4096$ and comment.
::: solution
$4096/128 = 32$ by $4096/256 = 16$: $512$ tiles. $512/132 = 3.88$, so $4$ waves, the last with $512 - 396 = 116$ tiles and $16$ SMs idle ($12\%$ of that wave). Efficiency: $512/(4\cdot132) = 97.0\%$. For $4224\times4096$: $33\cdot16 = 528$ tiles $= 4\cdot132$ exactly, four full waves, $100\%$. A $3\%$ larger matrix runs in the same time. This **wave quantisation**, together with tile quantisation (dimensions not divisible by the tile), is why model dimensions are chosen as multiples of $64$ or $128$ and why throughput can vary non-monotonically with size.
:::
:::

::: exercise A roofline for a whole layer {level=3}
For a Transformer block of width $d = 4096$ with $d_{\text{ff}} = 4d$ processing $B\cdot n = 8192$ tokens in bf16, estimate the time of its matrix products and of its memory-bound operations on an H100 (ignore attention scores; assume the memory-bound operations — two norms, the activation function, two residual additions — each read and write the $Bn\times d$ activation once, the activation function on the $Bn\times4d$ tensor). Which dominates, and what does fusing the element-wise operations into neighbouring products save?
::: solution
Matrix products: $24\cdot8192\cdot4096^2 = 3.30\times10^{12}$ FLOPs, compute-bound (smallest dimension $4096$, intensity in the thousands): at least $3.3\times10^{12}/9.89\times10^{14} = 3.3$ ms. Memory-bound operations: each $Bn\times d$ read-and-write moves $2\cdot8192\cdot4096\cdot2 = 134$ MB; four such ($2$ norms, $2$ residual additions) and one on $4d$ ($537$ MB): $1.07$ GB, at least $0.32$ ms. So arithmetic dominates, but the memory-bound part adds about $10\%$; with fusion into the epilogues and prologues of the adjacent products most of those round trips disappear. At smaller widths or with more element-wise operations (dropout, biases, rotary embeddings) the memory-bound share grows.
:::
:::
