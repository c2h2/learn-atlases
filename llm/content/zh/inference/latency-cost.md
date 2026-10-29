前面各章各自拆掉了一个瓶颈：批处理摊薄权重读取，分页与量化为更多请求腾出空间，投机解码把闲置的算术变成词元，FlashAttention 让长提示变得可行。本章把它们汇成用户与运营者关心的三个数字——**多快**（首词元时间与每输出词元时间）、**多少**（吞吐量，从而每词元成本）与**多少能耗**——并汇成一套改进它们的方法。

思路仍是本课程一以贯之的：先估算，再测量；先测量，再优化。我们从内存带宽推出设备词元速率的最好情形，用屋顶线的步时间模型搭出一个部署的**吞吐—延迟曲线**，并说明每个批量都是一个帕累托最优的取舍；再把吞吐量换算成**每百万词元成本**与**每词元能耗**——所用的价格与功率都是标明仅供示意的数字；最后给出一张清单，把每种瓶颈对应到前面各章的技术。所有硬件数字都注明年份、仅作示例；价格尤其变得快、各家不同，下文的是**示意性假设，不是报价**。

## 从第一性原理看延迟 {#sec-latency}

由[[inference/batching-serving#def-slo]]，一个有$n$个输出词元的请求，端到端延迟为$\text{TTFT} + (n - 1)\,\text{TPOT}$。每一项都有一个由硬件定下的下界。

::: proposition 词元速率的带宽上界 {#prop-bandwidth}
一个解码步要读$W$字节的权重，并为$B$条序列（平均上下文$\bar t$）各读$s_{\text{KV}}\bar t$字节的缓存。在带宽为$\beta$的内存上，它至少要

$$
\text{TPOT}\ \ge\ \frac{W + Bs_{\text{KV}}\bar t}{\beta}.
$$

因此单条流（$B = 1$、短上下文）不可能超过$\beta/W$词元每秒；总吞吐量$B/\text{TPOT}$无论批量多大都不可能超过$\beta/(s_{\text{KV}}\bar t)$，在实得算术速率$\pi$下也不可能超过$\pi/(2N)$（$N$为稠密模型的参数量）。
:::

::: proof
每一步都必须读出全部权重和每条序列缓存中的每个键与值，在带宽$\beta$下至少要上面那么多时间（与算术的重叠能藏住算术，藏不住读取）。$B = 1$且缓存可忽略时，速率至多$1/\text{TPOT}\le\beta/W$。一般地$B/\text{TPOT}\le B\beta/(W + Bs_{\text{KV}}\bar t) < \beta/(s_{\text{KV}}\bar t)$。另一头，每步至少做$2NB$个 FLOPs，故$\text{TPOT}\ge2NB/\pi$、$B/\text{TPOT}\le\pi/(2N)$。
:::

第一条界是推理里最快的估算：**每条流的每秒词元数$\approx$带宽除以权重的字节数**。一个$700$亿参数的模型量化到约$35$ GB，放在$3.35$ TB/s 的设备上，单个用户不可能超过约$96$词元每秒，软件再好也不行；16 位精度、两台这样的设备做张量并行（[[scaling/model-parallelism]]）时，$140$ GB 除以$6.7$ TB/s，约$48$。真实系统只达到这些界的一部分——小批量下优化良好的解码内核通常能过一半，而计入通信、采样与调度开销后会更低。

首词元时间受类似的界定：$P$词元提示的预填充算术$2NP/\pi$（还要加上随$P$二次增长的注意力，[[inference/long-context#prop-crossover-len]]）；而在有负载的系统里，还要加上排队的时间——利用率逼近$1$时它无界增长（[[inference/batching-serving#prop-mm1]]）。

::: example 一次聊天回复的延迟预算 {#ex-budget}
在[[inference/batching-serving#ex-roofline]]的加速器上（实得$593$ TFLOP/s 与$2.68$ TB/s），一个$80$亿参数模型以 bfloat16 服务一个请求：提示$1500$词元、回复$400$词元，批量$64$、上下文约$2000$。忽略排队，估算 TTFT、TPOT 与端到端延迟。哪一项占大头？
::: solution
预填充：$2\cdot8\times10^9\cdot1500/593.4\times10^{12} = 40$ ms，再加上它所在的那一步。TPOT：$12.4$ ms（[[inference/batching-serving#ex-roofline]]）。端到端：$0.04 + 399\cdot0.0124 = 5.0$ s，其中$99\%$是解码。聊天场景下，输出长度与 TPOT 占大头；只有"提示长、答案短"时 TTFT 才占大头（分类、抽取、答案只有一行的检索增强问答）。
:::
:::

## 吞吐—延迟曲线 {#sec-pareto}

抬大批量提高吞吐量，也拖慢每一条流。用[[inference/batching-serving#def-step-model]]的步时间模型，对固定的配置（模型、精度、硬件）与上下文，记$\tau(B)$为批量$B$时的解码步时间，$R(B) = B/\tau(B)$为吞吐量。

::: proposition 每个批量都是帕累托最优的工作点 {#prop-pareto}
若$\tau(B) = \max\big(a + bB,\ cB\big) + \tau_0$且$a, b, c, \tau_0 > 0$（内存项$a + bB$，计算项$cB$，固定开销$\tau_0$），则$\tau(B)$与$R(B)$都随$B$严格增大。于是没有任何批量能在延迟与吞吐量上同时优于另一个：点$(\tau(B), R(B))$构成一条**帕累托前沿**，选$B$就是选一个取舍。吞吐量向$\min(1/b, 1/c)$攀升。
:::

::: proof
$\tau$是$B$的若干增函数的最大值再加常数，故严格增大。看吞吐量$R(B) = B/\tau(B)$。在内存段上，$R = B/(a + \tau_0 + bB)$，其导数$(a + \tau_0)/(a + \tau_0 + bB)^2$为正。在计算段上，$R = B/(cB + \tau_0)$，导数$\tau_0/(cB + \tau_0)^2 > 0$。由于$\tau$连续而$R$在两段上各自增大，$R$整体增大。若$B_1 < B_2$，则$\tau(B_1) < \tau(B_2)$且$R(B_1) < R(B_2)$：谁也不支配谁。$B\to\infty$时，$R$在内存段趋于$1/b$、在计算段趋于$1/c$，取决于哪一段先到。
:::

::: definition 支配与部署前沿 {#def-frontier}
工作点是一套配置（模型、精度、并行方式、硬件、调度器设置）加上一个批量上限，在固定负载上由延迟$\ell$（例如 p99 TPOT）与每词元成本$\kappa$刻画。若$\ell_A\le\ell_B$且$\kappa_A\le\kappa_B$、且至少一个不等式严格，就称点$A$**支配**点$B$。**部署前沿**是不被任何其他点支配的点的集合；延迟目标$\ell^*$下的最佳部署，是前沿上满足$\ell\le\ell^*$且成本最低的点。
:::

但*不同*配置之间，确实存在谁支配谁：量化后的模型可能在每个批量上既步长更短、又吞吐量更高。因此有用的对象是**配置之间的前沿**：对每个延迟目标，取给出最高吞吐量（等价于最低每词元成本）的配置与批量。其上工作点的选取则交给延迟 SLO 与负载。

## 每词元成本 {#sec-cost}

若$D$块加速器的部署每加速器·时花费$p$、产出$R$词元每秒，则

$$
\text{每百万词元成本} = \frac{pD}{3600\,R}\cdot10^6.
$$ {#eq-cost}

这里假设部署被用满。按峰值定容的服务平均利用率$u$较低，闲置容量的成本摊到实际交付的词元上：有效成本要把上式除以$u$。

::: example 每百万词元成本（示意） {#ex-cost}
**仅为示意假设**：加速器租金$\$3.00$每小时——是个整数，不是报价；截至 2026 年，数据中心加速器的价格因供应商、合约与硬件代际相差数倍。对[[#ex-budget]]的模型与加速器，计算批量为$1$、$16$、$64$时每百万输出词元的成本，以及批量$64$、平均利用率$40\%$时的成本。再与满负荷下的预填充（输入）词元比较。
::: solution
吞吐量取自[[inference/batching-serving#ex-roofline]]与下面的清单：$160$、$2068$与$5149$词元/秒。按[[#eq-cost]]、$D = 1$：每百万输出词元$\$3/(3600\cdot160)\cdot10^6 = \$5.22$、$\$0.40$与$\$0.16$。批量$64$时每词元成本是单条流的三十二分之一。利用率$40\%$时：$\$0.16/0.4 = \$0.40$。预填充是计算受限的，约$\pi/(2N) = 37{,}000$词元/秒，故满负荷下输入词元每百万$\$0.0225$，约为$B = 64$时输出词元的七分之一。这一不对称——输入词元因并行处理而便宜，输出词元因访存受限而昂贵——正是截至 2026 年许多商用接口把输出词元定价为输入词元的数倍、已缓存的输入词元再低一档的原因（[[inference/kv-cache#sec-prefix]]）。
:::
:::

::: widget plot
f: p*1e6/3600*(max(16e9*x/593.4e12, (16e9 + x*2000*131072)/2.68e12) + 2e-4)/x
x: 1, 228
y: 0, 2
sliders: p=3:0.5:10:0.25
labels: cost per million output tokens (illustrative dollars)
caption: 每百万输出词元成本随批量的变化，按[[#eq-cost]]与步时间模型计算：$80$亿参数 bfloat16 模型、上下文$2000$、单块加速器，每小时价格$p$美元（滑块；默认的$\$3$是示意性假设，不是价格）。成本起初急剧下降（权重读取被摊薄），随后随缓存读取占主导而趋平；曲线止于$B = 228$，那里缓存显存耗尽。$B = 1$时的成本（$p = 3$时为$\$5.2$）超出图的上沿。
:::

实际中有两处修正。其一，**词元不是词**：分词器各有不同，同一段文本在不同分词器下词元数可能相差$20$–$50\%$，在分词器训练数据中代表性不足的语言与文字里差距更大（[[text-and-language]]）。按词元报价，只有先换算成每单位文本或每任务的成本，才能比较模型。其二，**任务决定词元数**：先长长地生成隐藏的推理链再作答的模型（[[reasoning/test-time-scaling]]），输出词元可比可见答案多出许多倍；按*任务*计价——每任务词元数乘以每词元成本——才是诚实的比较。

::: example 用张量并行买延迟 {#ex-tp}
用下面的清单，对 bfloat16 模型比较一块加速器与两块张量并行的加速器，在$B = 1$与$B = 64$时的步时间与每百万词元的示意成本。什么时候第二块加速器花得值？
::: solution
$B = 1$时：一块设备$6.27$ ms、每百万$\$5.22$；两块$3.43$ ms、$\$5.72$。$B = 64$时：$12.43$ ms、$\$0.16$对$6.52$ ms、$\$0.17$。切开权重使每块设备读取的字节减半，于是步长几乎减半，但两块设备每小时贵一倍、还要为通信损失一点，所以每词元成本上升$3$–$10\%$。当延迟目标否则无法达成（比如 bfloat16 下$5$ ms 的 TPOT），或模型根本放不进一块设备时，第二块设备花得值；它不是降成本的办法。在这个模型里，一块设备上的量化模型以三分之一的成本达到$1.9$ ms——前提是质量可接受。
:::
:::

## 每词元能耗 {#sec-energy}

同一组吞吐量数字还能给出能耗估算。若部署中每块加速器服务时功率为$P_{\text{dev}}$、产出$R$词元每秒，

$$
E_{\text{token}} = \frac{D\,P_{\text{dev}}}{R}\quad\text{焦耳每词元（仅加速器）},
$$ {#eq-energy}

而主机处理器、内存、网络与冷却还要在其上叠加设施开销，常用电能使用效率（PUE，全设施总功率与 IT 设备功率之比）来概括。

::: example 每词元能耗（示意） {#ex-energy}
[[#ex-budget]]的加速器公布的功率上限为$700$ W；假设服务时就取到这个值。估算批量$1$与$64$时每输出词元的加速器能耗、批量$64$下一条$500$词元回复的能耗（瓦时），以及设施 PUE 为$1.2$的影响。
::: solution
$B = 1$：$700/160 = 4.4$ J 每词元。$B = 64$：$700/5149 = 0.136$ J 每词元。$B = 64$下一条$500$词元的回复：在加速器处为$68$ J $= 0.019$ Wh，按 PUE $1.2$为$0.023$ Wh——还没算主机、预填充的能量、闲置容量，以及该请求分摊的训练能耗。仅批量一项就能让估算移动一个数量级以上，模型规模、精度、硬件与输出长度还会让它移动更多。
:::
:::

::: widget plot
f: w*(max(16e9*x/593.4e12, (16e9 + x*2000*131072)/2.68e12) + 2e-4)/x
x: 1, 228
y: 0, 1.5
sliders: w=700:300:1200:10
labels: accelerator energy per output token (J)
caption: 每输出词元的加速器能耗随批量的变化，模型同[[#ex-energy]]，假设功率为$w$瓦（滑块；$700$ W 是示例加速器公布的功率上限，实际功耗通常更低）。与成本一样，每词元能耗随批处理急剧下降——从$B = 1$时的$4.4$ J（超出图幅）到$B = 64$时的$0.14$ J——并在缓存读取占主导后趋平。
:::

已发表的推理能耗测量相差好几个数量级，因为上述每一项、以及统计边界（只算加速器、整台服务器、整个数据中心、算不算空闲）都各不相同；估算永远应当写明边界与假设。这些数字的环境与社会面——电力来源、水、推理在总足迹中的份额——见[[llm-society/environmental-cost]]。

::: warning "每词元成本是模型的属性"
同一个模型，每词元成本随批量、精度、硬件、利用率、上下文长度与服务软件的不同，可以相差$30$倍（[[#ex-cost]]）。"模型 X 每百万词元成本 $c$"这样的说法，描述的是某个时刻的某个具体部署。比较模型的效率，需要同样的硬件、同样的负载（提示与输出长度分布、到达模式）与同样的延迟目标——何况按词元计价还掩盖了分词器之间、以及完成任务所需词元数之间的差别。
:::

## 实现 {#sec-code}

清单在这块示意加速器上评估$80$亿参数模型的四种配置——bfloat16；4 位权重（含分组缩放因子约$4.5$位，[[inference/quantisation#eq-bits]]）；4 位权重加 8 位缓存；以及 bfloat16 经张量并行切到两块设备、带一点通信开销——在若干批量下，直到缓存装满内存的批量为止。它打印步时间、吞吐量、示意成本与每词元的加速器能耗，以及全部配置上的帕累托前沿。

```python
# Throughput-latency trade-off, cost and energy per token from a roofline step-time model.
# Hardware figures are illustrative: an accelerator with published peaks of 989 TFLOP/s (16-bit)
# and 3.35 TB/s, 80 GB of memory, 700 W at full load; achieved 60% / 80% of peak.
PI, BETA, MEM, WATTS = 989e12 * 0.6, 3.35e12 * 0.8, 80e9, 700.0
PRICE = 3.00                       # ILLUSTRATIVE accelerator-hour price in dollars, not a quote
N, CTX = 8e9, 2000                 # 8B-parameter dense model, mean context 2000 tokens

configs = {   # name: (bytes per weight, cache bytes per token, devices for tensor parallelism)
    "bf16, bf16 cache":       (2.0, 131072, 1),
    "int4 weights, bf16 cache": (0.5625, 131072, 1),    # 4.5 bits incl. group scales
    "int4 weights, int8 cache": (0.5625, 65536, 1),
    "bf16, 2-way tensor par.": (2.0, 131072, 2),
}
def step(B, wbytes, kv, dev):
    W = N * wbytes
    flops, bytes_ = 2 * N * B, W + B * CTX * kv
    t = max(flops / (PI * dev), bytes_ / (BETA * dev)) + 2e-4
    if dev > 1: t += 2e-4                         # communication between devices: illustrative 0.2 ms per step
    return t

points = []
for name, (wb, kv, dev) in configs.items():
    Bmax = int((MEM * dev - N * wb - 4e9 * dev) // (CTX * kv))            # cache memory limit
    print(f"{name:25s} max batch {Bmax:4d}")
    for B in (1, 4, 16, 64, 256):
        if B > Bmax: continue
        t = step(B, wb, kv, dev); thr = B / t                             # tokens/s for the deployment
        usd = PRICE * dev / 3600 / thr * 1e6                              # $ per million output tokens
        joule = WATTS * dev / thr                                         # accelerator energy per token
        points.append((name, B, t * 1e3, thr, usd, joule))
        print(f"   B={B:3d}: TPOT {t * 1e3:6.2f} ms, {thr:7.0f} tok/s, ${usd:6.3f}/M tokens, {joule:6.3f} J/token")

# Pareto frontier over all configurations: lowest cost for each latency
front = [p for p in points if not any(q[2] <= p[2] and q[4] <= p[4] and q != p for q in points)]
print("Pareto-optimal points (lowest cost at each TPOT):")
for n, b, t, _, c, _ in sorted(front, key=lambda p: p[2]): print(f"   {n}, B={b}: {t:.2f} ms, ${c:.3f}/M")

# prefill (input) tokens: compute-bound, so their cost per token is set by FLOP/s
thr_prefill = PI / (2 * N)
print(f"prefill: {thr_prefill:.0f} tok/s, ${PRICE / 3600 / thr_prefill * 1e6:.4f}/M input tokens at full use")
```

Output:

```
bf16, bf16 cache          max batch  228
   B=  1: TPOT   6.27 ms,     160 tok/s, $ 5.223/M tokens,  4.388 J/token
   B=  4: TPOT   6.56 ms,     610 tok/s, $ 1.367/M tokens,  1.148 J/token
   B= 16: TPOT   7.74 ms,    2068 tok/s, $ 0.403/M tokens,  0.338 J/token
   B= 64: TPOT  12.43 ms,    5149 tok/s, $ 0.162/M tokens,  0.136 J/token
int4 weights, bf16 cache  max batch  272
   B=  1: TPOT   1.98 ms,     506 tok/s, $ 1.647/M tokens,  1.384 J/token
   B=  4: TPOT   2.27 ms,    1762 tok/s, $ 0.473/M tokens,  0.397 J/token
   B= 16: TPOT   3.44 ms,    4646 tok/s, $ 0.179/M tokens,  0.151 J/token
   B= 64: TPOT   8.14 ms,    7863 tok/s, $ 0.106/M tokens,  0.089 J/token
   B=256: TPOT  26.92 ms,    9510 tok/s, $ 0.088/M tokens,  0.074 J/token
int4 weights, int8 cache  max batch  545
   B=  1: TPOT   1.93 ms,     519 tok/s, $ 1.607/M tokens,  1.350 J/token
   B=  4: TPOT   2.07 ms,    1928 tok/s, $ 0.432/M tokens,  0.363 J/token
   B= 16: TPOT   2.66 ms,    6011 tok/s, $ 0.139/M tokens,  0.116 J/token
   B= 64: TPOT   5.01 ms,   12777 tok/s, $ 0.065/M tokens,  0.055 J/token
   B=256: TPOT  14.40 ms,   17779 tok/s, $ 0.047/M tokens,  0.039 J/token
bf16, 2-way tensor par.   max batch  518
   B=  1: TPOT   3.43 ms,     291 tok/s, $ 5.723/M tokens,  4.808 J/token
   B=  4: TPOT   3.58 ms,    1117 tok/s, $ 1.492/M tokens,  1.253 J/token
   B= 16: TPOT   4.17 ms,    3839 tok/s, $ 0.434/M tokens,  0.365 J/token
   B= 64: TPOT   6.52 ms,    9823 tok/s, $ 0.170/M tokens,  0.143 J/token
   B=256: TPOT  15.91 ms,   16095 tok/s, $ 0.104/M tokens,  0.087 J/token
Pareto-optimal points (lowest cost at each TPOT):
   int4 weights, int8 cache, B=1: 1.93 ms, $1.607/M
   int4 weights, int8 cache, B=4: 2.07 ms, $0.432/M
   int4 weights, int8 cache, B=16: 2.66 ms, $0.139/M
   int4 weights, int8 cache, B=64: 5.01 ms, $0.065/M
   int4 weights, int8 cache, B=256: 14.40 ms, $0.047/M
prefill: 37088 tok/s, $0.0225/M input tokens at full use
```

每种配置内部，步时间与吞吐量随$B$同步上升，正如[[#prop-pareto]]所说。配置之间，这个模型里带量化缓存的量化模型支配其余：它在每个批量上都既快又省，因为访存受限的一步，时间就是字节。张量并行在小批量下让步长减半（$B = 1$时从$6.3$ ms 到$3.4$ ms），代价是每词元成本更高（两块设备，加上通信）；它买的是延迟，不是效率。这个模型忽略了三件事，它们可能改变排序：量化模型的*质量*，它必须实测（[[inference/quantisation#sec-weight-only]]）；内核中反量化的算术开销，它能让低比特内核比模型预言的更早变成计算受限；以及张量并行的通信开销，这里假设它是每步固定的$0.2$ ms。

::: quiz
某部署正以批量$16$运行，TPOT 有余量地满足目标。运营者想在不添置硬件的前提下降低每词元成本。最直接的改法是什么？
- [ ] 缩小批量，把 TPOT 进一步压低
- [x] 准入更多并发请求（加大批量），直到 TPOT 目标或显存先到界
- [ ] 改用两路张量并行
- [ ] 关掉前缀缓存以腾出内存
::: solution
由[[#prop-pareto]]，增大$B$提高吞吐量，从而降低每词元成本，代价是 TPOT 变高；富余的延迟预算正是这笔交易的本钱。缩小批量与张量并行都会抬高每词元成本。前缀缓存省下的是预填充的活，关掉它反而更贵。
:::
:::

## 优化推理的方法 {#sec-method}

本课程的各项技术，各缓解一种具体的瓶颈。下表从症状给出对策。

| 症状（测量所得） | 瓶颈 | 对策（章节） |
|---|---|---|
| 解码步长$\approx$权重字节数除以带宽；算术闲置 | 内存带宽，权重 | 更大的批量（[[inference/batching-serving]]）；权重量化（[[inference/quantisation]]）；投机解码（[[inference/speculative-decoding]]）；更小或蒸馏的模型（[[inference/model-compression]]） |
| 步长随上下文总量增长 | 内存带宽，缓存 | GQA/MLA 模型、缓存量化（[[inference/kv-cache]]、[[inference/quantisation]]）；滑动窗口或交错层布局的模型（[[inference/long-context]]） |
| 批量受内存限制、请求排队 | 内存容量 | 分页缓存、缓存量化、权重量化、卸载（[[inference/kv-cache]]） |
| 长提示的 TTFT 高 | 预填充算术、注意力 | FlashAttention 内核、前缀缓存、分块预填充、上下文并行（[[inference/long-context]]） |
| 提示到达时 TPOT 出现尖峰 | 预填充干扰 | 分块预填充、预填充—解码分离（[[inference/batching-serving]]） |
| 峰值负载时延迟陡增 | 排队（$\rho\to1$） | 更多副本、准入控制、优先级调度（[[inference/batching-serving#sec-queueing]]） |
| 同样的运行输出却不一致 | 依赖批量的内核 | 每请求种子、批量无关内核（[[inference/decoding-sampling#sec-determinism]]） |

::: algorithm 优化一个部署 {#alg-optimise}
1. **定义负载与目标**：提示与输出长度的分布、到达模式与峰值速率、TTFT 与 TPOT 各分位数的 SLO，以及真实任务上的质量门槛。
2. **估算**边界：权重与缓存的字节数、带宽受限的 TPOT、计算受限的预填充时间、内存封顶的批量（[[#prop-bandwidth]]、[[inference/kv-cache#prop-batch-kv]]）。
3. **测量**真实负载下的基线：用长度分布与到达过程正确的回放或合成负载轨迹，预热之后，报告吞吐量、有效吞吐与延迟各分位数。
4. **定位**瓶颈：把测量与边界对照（上表）。
5. **只改一处**，重测性能*与*质量；只有当它在目标 SLO 上抬高了前沿、又未跌破质量门槛时才保留。
6. **重复**下去；然后在测得的前沿与预期负载上选出工作点（批量上限、副本数），并为峰值留出余量（[[inference/batching-serving#ex-little]]）。
:::

::: application 为产品挑选模型规模
设某产品要求 TPOT 不超过$50$ ms，且在其自有测试集上质量高于某个门槛。较大的模型可能以更少的重试或更短的输出过线，较小的模型可能需要投机解码或检索才过线。决定要按 SLO 下的*每次成功任务成本*来做：对每个候选配置，在测试集上测成功率与每任务词元数，并测满足$50$ ms 的前沿点上的每词元成本。每词元最便宜的模型与基准上最好的模型，未必是每次成功最便宜的。
:::

::: history
对 Transformer 推理开销的系统分析始于超大模型的服务：Pope 等（"Efficiently Scaling Transformer Inference"，MLSys 2023）从第一性原理分析了切分推理的延迟与吞吐量，包括多查询注意力与访存受限的状态。Kwon 等的 vLLM（2023）、Zhong 等的 DistServe（2024）与 Agrawal 等的 Sarathi-Serve（2024）把延迟目标下的有效吞吐立为服务系统的标准度量。对推理能耗的测量，如 Samsi 等（2023）与 Luccioni、Jernite 与 Strubell（FAccT 2024），显示出随模型、硬件与任务而变的巨大差异。《How to Scale Your Model》（Austin 等，2025）这类材料把屋顶线式的推理估算汇成了教学材料。
:::

::: summary
- **每条流的每秒词元数$\le$带宽除以每步读取的字节数**：小批量时读权重，大批量时读权重加缓存；吞吐量还受$\pi/(2N)$封顶。
- 对单一配置，步时间与吞吐量都随批量增大，所以每个批量都是**帕累托最优**的；配置之间则有的支配别的（常是量化的配置，以质量为前提）。
- **每百万词元成本** $= pD\cdot10^6/(3600R)$，再除以利用率；输出词元比输入词元贵，因为解码访存受限而预填充计算受限。此处价格仅为示意。
- **每词元能耗** $= DP_{\text{dev}}/R$（在加速器处），再加工设施开销；仅批量一项就能让它变化一个数量级以上。
- 比较部署，要在同样的负载与 SLO 下；比较模型，要按任务而不是按词元。
- 优化的做法：估算边界、在真实负载下测量、定位瓶颈、施用对应的技术，并时时检验质量。
:::

## 习题

::: exercise 单条流的上界 {level=1 check="95.7"}
某模型的权重占$35$ GB，从带宽$3.35$ TB/s 的内存中读取。忽略缓存，单条流的每秒词元数上界是多少？保留一位小数。
::: solution
$3.35\times10^{12}/35\times10^9 = 95.7$词元每秒（[[#prop-bandwidth]]）。
:::
:::

::: exercise 每百万词元成本 {level=1 check="0.1667"}
一块加速器的部署（示意地）每小时$\$3.00$，满负荷下产出$5000$词元每秒。每百万词元成本是多少？保留四位小数。
::: solution
$3/(3600\cdot5000)\cdot10^6 = \$0.1667$。
:::
:::

::: exercise 每词元能耗 {level=1 check="0.14"}
一台加速器功率$700$ W，产出$5000$词元每秒。每词元的加速器能耗是多少焦耳？
::: solution
$700/5000 = 0.14$ J 每词元。
:::
:::

::: exercise 闲置容量的成本 {level=2 check="0.5556"}
成本那题的部署按峰值负载定容，平均利用率$30\%$。每个实际交付词元的有效成本是多少？保留四位小数。
::: solution
$0.16667/0.3 = \$0.5556$。提高平均利用率（在服务之间共享容量、随负载伸缩副本、在低谷期跑批处理任务）往往才是最大的降本杠杆。
:::
:::

::: exercise 分词器效率 {level=2 check="1.231"}
两个模型每个词元收费相同。在你的文档上，模型 A 每词$1.3$个词元，模型 B 每词$1.6$个。按每词计，B 贵多少倍？保留三位小数。
::: solution
$1.6/1.3 = 1.231$：每词元价格相同时，每词贵$23\%$。若文字在分词器的训练数据中代表性不足，差距还会大得多。
:::
:::

::: exercise 隐藏的推理词元 {level=2 check="7.667"}
某推理模型产生$2000$个推理词元与$300$词元的可见答案，全部按输出计费。某非推理模型以同样的每词元价格用$300$个词元作答。按每任务的输出成本，推理模型贵多少倍？保留三位小数。
::: solution
$(2000 + 300)/300 = 7.667$。值不值取决于成功率：若推理模型成功$90\%$的任务、另一个成功$40\%$，则重试到成功为止时，每次成功的期望成本分别是$7.667/0.9 = 8.5$与$1/0.4 = 2.5$个单位，仍偏向便宜的模型——除非失败还有重试之外的代价。
:::
:::

::: exercise 预填充与解码之比 {level=2}
用清单里的数字：满负荷、bfloat16、$B = 64$时，输入（预填充）词元比输出词元便宜多少倍？这个比值对很长的提示为什么会缩小？
::: solution
预填充$37{,}088$词元/秒，解码$5149$词元/秒，故输入词元便宜$37{,}088/5149 = 7.2$倍。提示很长时注意力项$2LdP^2$随二次增长（[[inference/long-context#prop-crossover-len]]），每输入词元的成本随$P$上升——$P = 131{,}072$时每词元预填充 FLOPs 约为短提示的三倍——而每输出词元的解码成本只随缓存读取线性增长，涨得慢些。
:::
:::

::: exercise 帕累托论证 {level=2}
在[[#prop-pareto]]中，改设$\tau_0 = 0$且每步总是计算受限：$\tau(B) = cB$。吞吐—延迟的取舍会怎样？这说明固定开销与内存项各起了什么作用？
::: solution
此时$R(B) = B/(cB) = 1/c$为常数：更大的批量只添延迟、不添吞吐量，于是$B = 1$是唯一合理的选择，其余点全被支配。取舍之所以存在，是因为一步之中有不随批量增长的成本——权重读取$a$与固定开销$\tau_0$——批处理摊薄的正是它们。计算受限区已无东西可摊薄，这也是投机解码在那儿不再帮忙的原因（[[inference/speculative-decoding#sec-speedup]]）。
:::
:::

::: exercise 确定集群规模 {level=3}
某服务预计峰值$50$请求每秒，每请求平均$400$个输出词元，要求 TPOT 不超过$15$ ms。用清单里的各配置：每块加速器选哪个配置、批量多大？峰值需要多少块加速器（忽略预填充与排队）？峰值时的示意成本是每小时多少？这个估算还缺什么？
::: solution
需求：$50\cdot400 = 20{,}000$输出词元每秒。满足$15$ ms 的配置：bfloat16 到$B = 64$（$12.4$ ms、$5149$词元/秒）；int4 权重加 bf16 缓存到$B = 64$（$8.1$ ms、$7863$词元/秒）；int4 权重加 int8 缓存到$B = 256$（$14.4$ ms、$17{,}779$词元/秒）；两块设备的 bfloat16 配置在$B = 64$（$6.5$ ms，两块设备合计$9823$词元/秒）。最便宜的是 int4 权重加 int8 缓存、$B = 256$：$\lceil20{,}000/17{,}779\rceil = 2$块加速器（示意价格下每小时$\$6$），而 bfloat16 要$\lceil20{,}000/5149\rceil = 4$块（$\$12$）。缺的：预填充负载，它添算术、还干扰 TPOT；排队余量，因为在$\rho\approx1$附近运行延迟会爆炸（[[inference/batching-serving#prop-mm1]]）——通常留$20$–$40\%$的余量；量化模型的质量；上下文长度的波动（批量上限取决于它）；以及故障时的冗余。
:::
:::

::: exercise 投机解码的前沿 {level=3}
往步时间模型里加上投机解码：批量$B$下，每轮迭代先由一个规模为目标模型十分之一的草稿模型跑$\gamma$步（步时用同一公式取$N/10$、权重$W/10$），再让目标模型对$B(\gamma + 1)$个位置过一遍（FLOPs $2N B(\gamma + 1)$，字节数与普通一步相同），每序列产出$(1 - \alpha^{\gamma+1})/(1 - \alpha)$个词元，其中$\alpha = 0.8$。对 bfloat16 配置，计算$\gamma = 4$时$B = 1$与$B = 64$的有效 TPOT 与吞吐量，并与普通解码比较。
::: solution
```python
PI, BETA, N, CTX, KV = 989e12 * 0.6, 3.35e12 * 0.8, 8e9, 2000, 131072
def step(B, N, W, pos=1):
    return max(2 * N * B * pos / PI, (W + B * CTX * KV) / BETA) + 2e-4
a, g = 0.8, 4
tok = (1 - a ** (g + 1)) / (1 - a)
for B in (1, 64):
    plain = step(B, N, 2 * N)
    it = g * step(B, N / 10, 2 * N / 10) + step(B, N, 2 * N, pos=g + 1)
    print(B, round(plain * 1e3, 2), round(it / tok * 1e3, 2), round(B / plain), round(B * tok / it))
```

Output:

```
1 6.27 2.93 160 341
64 12.43 12.1 5149 5291
```

每轮迭代产出$3.36$个词元，有效 TPOT 在$B = 1$时从$6.27$ ms 降到$2.93$ ms，单条流的速率翻了一倍还多。$B = 64$时收益几乎消失（$12.43$到$12.10$ ms）：在这个简化的模型里，每个草稿步都要按目标模型的每词元字节（$16.8$ GB）读全部$64$条序列的缓存，于是四个草稿步花掉几乎相当于它们本可省下的那次目标验证。草稿模型若带自己的小得多的缓存会好一些，但批量再大时，对$5$个位置的目标验证会变成计算受限，收益照样缩小（[[inference/speculative-decoding#sec-speedup]]）。投机解码移动的是前沿的小批量一端——更低的延迟——远多于大批量一端。这个模型还忽略了被拒词元留在缓存里的代价，以及树验证。
:::
:::
