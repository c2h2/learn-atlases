对单个用户以每秒$200$词元的速度生成，模型算得快。但一个服务必须同时回应数千用户，每个人都在期待一秒之内拿到第一个词元、之后是源源不断的输出，而加速器数量固定——这是另一个问题。[[inference/decoding-sampling]]表明单条解码流受内存带宽限制、算术单元几乎闲置；[[inference/kv-cache]]表明每个运行中的请求都按其长度成比例地占用显存。本章就在这两个事实之上搭建一个推理服务系统。

计划是定量的。我们导出批量解码步的**算术强度**，并在屋顶线上看清批处理如何把闲置的算术变成吞吐量——对权重成立，对缓存却不成立。我们比较**静态**与**连续**批处理，再看把生成的两个阶段分开的两项改进：**分块预填充**把两者审慎地混进同一步，**预填充—解码分离**把它们放到不同的机器上跑。最后引入**排队论**：利特尔法则（Little's law）把并发量、吞吐量与延迟连在一起；M/M/1 队列解释了为什么服务器逼近满载时延迟会爆炸。我们还定义推理服务据此接受考核的**服务水平目标**。

## 批处理为何有效：算术强度 {#sec-intensity}

Transformer 的算术量绝大部分花在权重矩阵上。考虑一个权重为$W\in\mathbb{R}^{d_{\text{in}}\times d_{\text{out}}}$的线性层，作用在一批$B$个词元向量上——解码步里的$B$条序列，或预填充里的$B$个提示词元。

::: proposition 线性层的算术强度 {#prop-linear-intensity}
把$(B, d_{\text{in}})$的激活矩阵与$(d_{\text{in}}, d_{\text{out}})$的权重矩阵相乘，所有数以$b$字节存储，要做$2Bd_{\text{in}}d_{\text{out}}$个 FLOP，并至少搬运$b\,(d_{\text{in}}d_{\text{out}} + Bd_{\text{in}} + Bd_{\text{out}})$字节，于是它的算术强度是

$$
I(B) = \frac{2Bd_{\text{in}}d_{\text{out}}}{b\,(d_{\text{in}}d_{\text{out}} + B(d_{\text{in}} + d_{\text{out}}))}\approx\frac{2B}{b}\qquad(B\ll d_{\text{in}}, d_{\text{out}}).
$$ {#eq-intensity}
:::

::: proof
$Bd_{\text{out}}$个输出中每一个都是长度$d_{\text{in}}$的点积：$d_{\text{in}}$次乘法与$d_{\text{in}}$次加法（把首次加到零之上也算作加法），共$2Bd_{\text{in}}d_{\text{out}}$个 FLOP。至少要权重读一遍、输入读一遍、输出写一遍。相除即得公式；当$B$远小于两个维度时，分母由权重项主导，$I\approx2Bd_{\text{in}}d_{\text{out}}/(bd_{\text{in}}d_{\text{out}}) = 2B/b$。
:::

权重每步只读一遍，无论多少词元与它共享，所以直到强度达到屋顶线的脊点$\pi/\beta$（[[transformers/attention-complexity#def-roofline]]）之前，批量里每多一条序列都几乎不花额外算术。16 位精度（$b = 2$）下，线性层在批量约为$B^* = \pi/\beta$个词元时变成计算受限。

解码步里的注意力部分表现不同，因为缓存不与别的序列共享。

::: proposition 解码注意力不从批处理中获益 {#prop-attn-intensity}
解码步中，每条序列读取自己$t$个词元的缓存，每层$2t\,h_{kv}d_kb$字节，并在其上做$4t\,hd_k$个 FLOP（$h$个查询头，每个计算$t$个分数并对$t$个值作加权和）。强度是

$$
I_{\text{attn}} = \frac{2h}{h_{kv}\,b},
$$

与批量大小和$t$都无关。
:::

::: proof
FLOPs：每个查询头，打分$2td_k$，值的加权和$2td_k$。字节：$h_{kv}$个头在$t$个位置的键和值。相除得$4thd_k/(2th_{kv}d_kb) = 2h/(h_{kv}b)$。批量里的第二条序列带来自己的缓存和自己的查询，FLOPs 和字节都翻倍。
:::

$32$个查询头、$8$个键值头、bfloat16 时，$I_{\text{attn}} = 4$ FLOPs 每字节，比任何脊点低两个数量级。分组查询注意力恰恰是靠这个$h/h_{kv}$因子帮忙；调度器做什么都帮不上忙。于是解码步有两部分，脾性各不相同：权重读取被批处理摊薄，缓存读取则随缓存词元总数成正比增长。

::: definition 一步时间的模型 {#def-step-model}
对一个含$N$个参数（权重$W = Nb$字节）、每词元缓存$s_{\text{KV}}$字节的稠密模型，一步同时给$B$条上下文长度分别为$t_1,\dots,t_B$的序列各解码一个词元、又预填充$P$个提示词元，耗时近似为

$$
\tau_{\text{step}} = \max\!\left(\frac{2N(B + P)}{\pi_{\text{eff}}},\ \frac{W + s_{\text{KV}}\big(\sum_it_i + P\big)}{\beta_{\text{eff}}}\right) + \tau_0,
$$ {#eq-step}

其中$\pi_{\text{eff}}$与$\beta_{\text{eff}}$是实际达到的算术速率和带宽（标称峰值的某个百分比），$\tau_0$是每步固定的开销（内核启动、调度、采样）。
:::

这个模型忽略了注意力 FLOPs（对这些长度来说很小，[[inference/decoding-sampling#prop-phases]]）以及内存传输与算术的重叠，但它抓住了两种状态，下文每个数字都由它算出。

::: example 解码的屋顶线 {#ex-roofline}
把[[inference/kv-cache#ex-kv-weights]]的模型（$N = 8\times10^9$，$W = 16$ GB，$s_{\text{KV}} = 128$ KiB）服务在标称峰值$989$ TFLOP/s、$3.35$ TB/s 的加速器（H100 SXM）上，假设两者分别达到其$60\%$与$80\%$，且$\tau_0 = 0.2$ ms。(a) 批量多大时，仅权重读取就不再是瓶颈？(b) 计算$B = 1, 8, 64, 256$条、上下文$2000$时的步时间与吞吐量。
::: solution
(a) 按有效速率，$\pi_{\text{eff}}/\beta_{\text{eff}} = 593.4/2.68 = 221$ FLOPs 每字节，所以$2B/2\ge221$要求每步$B\ge221$个词元（按标称峰值则为$295$）。(b) 每条序列添上$2000\cdot131{,}072 = 262$ MB 的缓存读取。$B = 1$：字节数$16.26$ GB，$6.07$ ms $+ 0.2 = 6.27$ ms，$160$词元/秒。$B = 8$：$18.1$ GB，$6.95$ ms，$1151$词元/秒。$B = 64$：$32.8$ GB，$12.43$ ms，$5149$词元/秒。$B = 256$：$83.1$ GB，$31.2$ ms，$8202$词元/秒，而算术只需$6.9$ ms。从$B = 1$到$B = 256$，批处理把吞吐量乘了$51$倍，但在这一上下文长度上这一步始终没有变成计算受限：缓存读取从权重手中接管，而批处理对它无可奈何（[[#prop-attn-intensity]]）。每个用户的词元速率从每秒$160$个跌到$32$个。
:::
:::

::: widget plot
f: x/(max(16e9*x/593.4e12, (16e9 + x*t*131072)/2.68e12) + 2e-4)
x: 1, 512
y: 0, 16000
sliders: t=2000:100:32000:100
labels: decode throughput (tokens/s) at context $t$
caption: 解码步的吞吐量随批量$B$的变化，按[[#eq-step]]的步时间模型计算，模型与加速器同[[#ex-roofline]]，每条序列都在上下文$t$（滑块）。短上下文时吞吐量几乎线性增长（权重读取主导），随后随缓存读取接管而弯折；$t = 32{,}000$时早早饱和。更大的批量在这里总是抬高吞吐量，但每步变慢，每个用户拿到词元反而更慢——即[[inference/latency-cost]]的吞吐—延迟权衡。
:::

## 静态与连续批处理 {#sec-continuous}

批处理得先有请求可批，而请求随机到达，想要的输出词元数又各不相同。

::: definition 静态与连续批处理 {#def-batching}
- **静态**（请求级）批处理从等待队列中凑一个至多$B$个请求的批次，运行预填充和解码，直到批次里*每个*请求都完成，才开始组下一批。提前完成的请求留下闲置槽位（填充），其间接到的请求则一直等待。
- **连续**（迭代级）批处理由 Orca（Yu 等，2022）引入，每个解码步都重新调度：完成的请求立刻离开批次，等待的请求加入批次，上限由显存决定。
:::

::: proposition 静态批次的利用率 {#prop-static-util}
生成$n_1,\dots,n_B$个词元的$B$请求静态批次要跑$\max_in_i$个解码步，其中比例为

$$
U = \frac{\sum_in_i}{B\max_in_i}
$$

的词元槽位在做有用功。若$n_i$独立且在$[0, n_{\max}]$上均匀分布，则$\E\big[\max_in_i\big] = \frac{B}{B+1}n_{\max}$，且$U\approx\frac{B+1}{2B}$，大批量时趋于$\tfrac12$。
:::

::: proof
槽位$i$在$\max_jn_j$步中忙碌$n_i$步；对槽位求和即得公式。对$[0, n_{\max}]$上的独立均匀变量，最大值$M$满足$\Prob(M\le x) = (x/n_{\max})^B$，故$\E M = \int_0^{n_{\max}}\big(1 - (x/n_{\max})^B\big)dx = n_{\max}B/(B + 1)$，而$\E\sum_in_i = Bn_{\max}/2$。期望之比为$(B + 1)/(2B)$；$B$大时最大值集中在$n_{\max}$附近，期望之比也就成了$\E U$的一个良好近似。
:::

还不算等待，光长度的波动就浪费了一半容量。连续批处理把这两笔损失都去掉了。Orca 的第二个想法**选择性批处理**让它得以实现：一步之内的各请求上下文长度不同，它们的注意力做不成一个矩形的批量乘积，但其余每个操作（线性层、MLP、归一化）都是逐位置的，可以把这一步的词元当作一个形状$(\sum\text{tokens}, d)$的扁平矩阵。注意力按请求计算——如今由直接读取各请求分页缓存的内核完成（[[inference/kv-cache#def-paged]]）。截至 2026 年，大语言模型的推理服务引擎基本上个个都是连续批处理。

::: quiz
一个静态批次里有四个请求，分别生成$100$、$200$、$300$和$400$个词元。多大比例的解码槽位在做有用功？
- [ ] $1$
- [x] $0.625$
- [ ] $0.25$
- [ ] $0.5$
::: solution
批次跑$400$步、$4$个槽位，共$1600$个槽步，其中$100 + 200 + 300 + 400 = 1000$个产出了词元：$1000/1600 = 0.625$（[[#prop-static-util]]）。连续批处理会把腾出的三个槽位交给等待中的请求。
:::
:::

### 分块预填充 {#sec-chunked}

连续批处理引出一个新问题：请求加入时必须预填充它的提示。把预填充作为单独一步来跑，全体运行中的请求会被它拖住那么久；把它和解码塞进同一步，这一步就会变长。无论哪种做法，只要有长提示到来，运行中请求的每输出词元时间都会出现一次尖峰。

::: definition 分块预填充 {#def-chunked}
**分块预填充**（Agrawal 等，2023；2024）为每一步固定一个**词元预算**$C$。每步先给每个解码中的请求放一个词元，再用加入请求的提示词元填满预算的剩余，把长提示切成若干块、在连续的几步里依次预填充（每块对此前各块的缓存作注意力）。
:::

预算限定了每一步的长度，也就限定了词元之间的间隔。它还提高效率：纯解码步访存受限、算术闲置，而预填充词元恰恰是能用上这些算术的重计算活。由[[#eq-step]]，往访存受限的解码步里添加提示词元几乎免费，直到这一步变成计算受限。Agrawal 等把这描述为让解码“搭便车”于预填充之上。代价是长提示的首词元时间略有变长，因为它现在摊在了几步里。

### 预填充—解码分离 {#sec-disagg}

两个阶段想要的东西不同：预填充计算受限，它的延迟是 TTFT；解码访存受限，它的延迟是 TPOT。挤在同一块加速器上意味着彼此干扰，而且双方都必须用同一套并行配置。**分离**把它们放到各自的加速器池：预填充实例处理提示，把得到的 KV缓存传给解码实例，由它生成输出。DistServe（Zhong 等，2024）与 Splitwise（Patel 等，2024）表明，当 TTFT 与 TPOT 目标都收得较紧时，为两个阶段分别挑选并行度和实例数，就能在目标之内用每块加速器服务更多请求。代价是缓存的传输和更复杂的调度。

::: example 搬运缓存的代价 {#ex-transfer}
[[#ex-roofline]]的模型预填充完一个$2000$词元的提示后，预填充实例经由一条可维持$50$ GB/s 的链路把缓存发给解码实例。传输需要多久，与预填充、与一个解码步相比如何？
::: solution
缓存为$2000\cdot131{,}072 = 262$ MB，传输需$262\times10^6/50\times10^9 = 5.2$ ms。预填充约需$2\cdot8\times10^9\cdot2000/593.4\times10^{12} = 54$ ms，解码步$6$–$30$ ms。传输给 TTFT 添加约$10\%$，而且可以逐层与预填充重叠。若模型的每词元缓存大十倍（更大模型的完整多头注意力）或链路更慢，传输便与预填充同量级，此时分离只有在干扰带来的损失更大时才划算。
:::
:::

### 一个模拟 {#sec-sim}

清单在[[#ex-roofline]]的步时间模型下模拟一台加速器，服务按泊松过程到达的$2000$个请求：提示长度在$100$–$1000$词元间均匀分布，输出长度在$10$–$500$词元间均匀分布，并发上限$64$条（由缓存显存决定）。它比较三种策略：静态批处理；连续批处理、提示在加入的那一步整体预填充；以及连续批处理加分块预填充、每步预算$512$个词元。它还检验利特尔法则（见下文）和 M/M/1 公式。

```python
import math, random

# 一台加速器服务 80 亿参数模型（bfloat16）的步时间模型
PI, BETA = 989e12 * 0.6, 3.35e12 * 0.8     # 可达 FLOP/s 与字节/秒（峰值的 60% 与 80%）
N, W, KV = 8e9, 16e9, 131072               # 参数量、权重字节数、每词元缓存字节数
def step_time(decode_ctx, prefill_tokens=0):
    """decode_ctx: 本步解码一个词元的各序列的上下文长度；
    prefill_tokens: 同步处理的提示词元数。"""
    flops = 2 * N * (len(decode_ctx) + prefill_tokens)
    bytes_ = W + KV * (sum(decode_ctx) + prefill_tokens)      # 权重读一次，缓存读/写
    return max(flops / PI, bytes_ / BETA) + 2e-4                # 外加每步固定开销

for B in (1, 8, 64, 256):
    t = step_time([2000] * B)
    print(f"decode batch {B:3d}: step {t * 1e3:6.2f} ms, {B / t:8.0f} tokens/s")

def make_requests(n, rate, seed):
    rng = random.Random(seed); t = 0.0; reqs = []
    for i in range(n):
        t += rng.expovariate(rate)                              # 泊松到达
        reqs.append({"arrive": t, "prompt": rng.randint(100, 1000), "out": rng.randint(10, 500)})
    return reqs

def simulate(reqs, policy, max_batch=64, chunk=512):
    clock, queue, running, done, i, gaps = 0.0, [], [], [], 0, []
    while len(done) < len(reqs):
        while i < len(reqs) and reqs[i]["arrive"] <= clock: queue.append(reqs[i]); i += 1
        if not running and not queue:                            # 空闲：跳到下一个到达
            clock = reqs[i]["arrive"]; continue
        if policy != "static" or not running:                    # 静态：只补满空批次
            while queue and len(running) < max_batch:
                r = queue.pop(0); r["pf"], r["gen"] = r["prompt"], 0; running.append(r)
        dec = [r for r in running if r["pf"] == 0 and "finish" not in r]
        pad = [r for r in running if "finish" in r]              # 静态：已完成但仍被计算
        budget = chunk - len(dec) if policy == "chunked" else math.inf
        pre = {}
        for r in running:                                        # 本步要预填充的提示词元
            if r["pf"] > 0 and budget > 0:
                pre[id(r)] = min(r["pf"], budget); budget -= pre[id(r)]
        dt = step_time([r["prompt"] + r["gen"] for r in dec + pad], sum(pre.values()))
        clock += dt
        for r in running:
            if id(r) in pre:
                r["pf"] -= pre[id(r)]
                if r["pf"] == 0: r["gen"], r["first"], r["last"] = 1, clock, clock
        for r in dec:
            r["gen"] += 1; gaps.append(clock - r["last"]); r["last"] = clock
            if r["gen"] >= r["out"]: r["finish"] = clock
        if policy == "static":
            if all("finish" in r for r in running): done += running; running = []
        else:
            done += [r for r in running if "finish" in r]
            running = [r for r in running if "finish" not in r]
    return clock, done, sorted(gaps)

def in_system_average(done, end):           # 由事件时刻求 (已到达 - 已完成) 的时间平均
    ev = sorted([(r["arrive"], 1) for r in done] + [(r["finish"], -1) for r in done])
    area, n, last = 0.0, 0, 0.0
    for t, step in ev: area += n * (t - last); n += step; last = t
    return area / end

for rate in (8.0, 20.0):
    for policy in ("static", "continuous", "chunked"):
        reqs = make_requests(2000, rate, seed=1)
        end, done, gaps = simulate(reqs, policy)
        lat = sorted(r["finish"] - r["arrive"] for r in done)
        ttft = sorted(r["first"] - r["arrive"] for r in done)
        W_mean = sum(lat) / len(lat)
        print(f"rate {rate:2.0f}/s {policy:10s}: {sum(r['out'] for r in done) / end:4.0f} tok/s | "
              f"latency mean {W_mean:5.2f} s | TTFT p50 {ttft[len(ttft) // 2]:6.3f} s | "
              f"TPOT p99 {1e3 * gaps[int(0.99 * len(gaps))]:5.1f} ms | "
              f"L {in_system_average(done, end):5.1f} = lambda*W {len(done) / end * W_mean:5.1f}")

# M/M/1 队列：模拟的平均系统内时间 对 1/(mu - lambda)
rng = random.Random(7); mu = 1.0
for rho in (0.5, 0.8, 0.9):
    lam, t, free_at, total, n = rho * mu, 0.0, 0.0, 0.0, 1000000
    for _ in range(n):
        t += rng.expovariate(lam)
        start = max(t, free_at); free_at = start + rng.expovariate(mu)
        total += free_at - t
    print(f"rho={rho}: simulated W = {total / n:5.2f}, formula 1/(mu-lambda) = {1 / (mu - lam):5.2f}")
```

Output:

```
decode batch   1: step   6.27 ms,      160 tokens/s
decode batch   8: step   6.95 ms,     1151 tokens/s
decode batch  64: step  12.43 ms,     5149 tokens/s
decode batch 256: step  31.21 ms,     8202 tokens/s
rate  8/s static    : 1985 tok/s | latency mean  4.32 s | TTFT p50  2.450 s | TPOT p99   7.8 ms | L  33.5 = lambda*W  33.5
rate  8/s continuous: 2012 tok/s | latency mean  1.87 s | TTFT p50  0.020 s | TPOT p99  23.5 ms | L  14.7 = lambda*W  14.7
rate  8/s chunked   : 2012 tok/s | latency mean  1.83 s | TTFT p50  0.023 s | TPOT p99  14.0 ms | L  14.3 = lambda*W  14.3
rate 20/s static    : 3121 tok/s | latency mean 34.57 s | TTFT p50 32.874 s | TPOT p99   8.8 ms | L 420.8 = lambda*W 420.8
rate 20/s continuous: 4933 tok/s | latency mean  2.51 s | TTFT p50  0.026 s | TPOT p99  30.2 ms | L  48.3 = lambda*W 48.3
rate 20/s chunked   : 4935 tok/s | latency mean  2.29 s | TTFT p50  0.028 s | TPOT p99  14.0 ms | L  44.0 = lambda*W 44.0
rho=0.5: simulated W =  2.00, formula 1/(mu-lambda) =  2.00
rho=0.8: simulated W =  5.01, formula 1/(mu-lambda) =  5.00
rho=0.9: simulated W = 10.15, formula 1/(mu-lambda) = 10.00
```

每秒$8$个请求（约合$2000$词元/秒的需求）时，三种策略都跟得上，但静态批处理让每个请求等批次凑齐、又等整批跑完：TTFT 中位数$2.45$ s 对$20$ ms。每秒$20$个请求时，约$5100$词元/秒的需求超出了静态批处理所能交付的（$3121$）：它的队列整场都在增长，平均延迟达到$35$ s；而连续批处理交出$4933$词元/秒，平均延迟$2.5$ s。静态批处理的词元流最平滑（TPOT p99 为$8.8$ ms），因为没有新请求插进运行中的批次；整提示预填充的连续批处理 p99 间隔为$30$ ms——那是提示挤进来的那些步；分块预填充把它压到$14$ ms，TTFT 几乎不变。每一轮运行中，系统内请求数的时间平均值都等于到达率乘以平均延迟，下一节将证明它必须如此。

## 排队论：利特尔法则与 M/M/1 队列 {#sec-queueing}

推理服务系统就是一个队列：请求到达、等待、被服务、离开。排队论的两个结论解释了其中观测到的大部分现象。

::: theorem 利特尔法则（Little's law） {#thm-little}
考虑任意有请求进出、在$[0, \mathcal{T}]$上观察、且在时刻$0$和$\mathcal{T}$都为空的系统。设到达$n$个请求，请求$i$在系统中停留$W_i$，$N(t)$为时刻$t$系统中的请求数。则

$$
\underbrace{\frac1{\mathcal{T}}\int_0^{\mathcal{T}}N(t)\,dt}_{\bar L} = \underbrace{\frac{n}{\mathcal{T}}}_{\bar\lambda}\cdot\underbrace{\frac1n\sum_{i=1}^nW_i}_{\bar W}.
$$ {#eq-little}

若当$\mathcal{T}\to\infty$时到达率与平均停留时间收敛到$\lambda$与$W$，则系统内平均请求数收敛到$L = \lambda W$。
:::

::: proof
写出$N(t) = \sum_i\mathbb{1}[a_i\le t < a_i + W_i]$，其中$a_i$是请求$i$的到达时刻。由于每个请求都在$[0, \mathcal{T}]$之内到达并离开，逐项积分得$\int_0^{\mathcal{T}}N(t)\,dt = \sum_i\int_0^{\mathcal{T}}\mathbb{1}[a_i\le t < a_i + W_i]\,dt = \sum_iW_i$。两边除以$\mathcal{T}$，并把$\sum_iW_i/\mathcal{T}$写成$(n/\mathcal{T})(\sum_iW_i/n)$。极限断言由把该式用于长区间得到（两端时刻正在处理中的请求带来的边界项，当$W_i$与$\mathcal{T}$相比很小时可以忽略）。
:::

这则法则对到达、服务时间或调度不作任何假设，这使它成为容量规划的第一件工具：**并发量 = 吞吐量 × 延迟**。它在任何层面都成立——服务器里的请求、飞行中的词元、占着缓存显存的序列。

::: example 用利特尔法则确定部署规模 {#ex-little}
一个聊天服务峰值预期每秒$30$个请求。每个请求平均在系统里停留$4$ s（排队、预填充和约$300$个输出词元）。系统里平均有多少个请求？若每台加速器能容纳$55$个并发请求的缓存（[[inference/kv-cache#ex-kv-weights]]），至少需要多少台加速器？
::: solution
$L = \lambda W = 30\cdot4 = 120$个请求平均在系统内。按每台$55$个，仅为承担平均值就至少要$\lceil120/55\rceil = 3$台加速器。由于系统内数量在均值附近波动，而满载附近延迟陡增（见下文），实际部署会明显多配一些，并且还要核查每台加速器也能在 TPOT 目标之内支撑词元吞吐量$30\cdot300/3 = 3000$词元/秒。
:::
:::

利特尔法则只涉及平均值；要看延迟如何依赖负载，需要给随机性一个模型。最简单的是 M/M/1 队列：到达率$\lambda$的泊松到达（“M” 指无记忆），参数$\mu$的指数服务时间，一台服务器，先到先服务。

::: proposition M/M/1 队列的延迟 {#prop-mm1}
若$\rho = \lambda/\mu < 1$，M/M/1 队列有平稳分布$\Prob(N = n) = (1 - \rho)\rho^n$（$n = 0, 1, 2,\dots$），系统内平均数量$L = \rho/(1 - \rho)$，平均停留时间

$$
W = \frac{1}{\mu - \lambda} = \frac{1/\mu}{1 - \rho}.
$$ {#eq-mm1}
:::

::: proof
系统中的数量是一个生灭马尔可夫链：以速率$\lambda$加一，为正时以速率$\mu$减一。在平稳分布$\pi$中，跨过$n$与$n + 1$之间切面的概率流平衡：$\lambda\pi_n = \mu\pi_{n+1}$，故$\pi_n = \rho^n\pi_0$。归一化时$\sum_n\rho^n\pi_0 = \pi_0/(1 - \rho) = 1$要求$\rho < 1$，并给出$\pi_0 = 1 - \rho$。于是$L = \sum_nn(1 - \rho)\rho^n = \rho/(1 - \rho)$，用到$\sum_nn\rho^n = \rho/(1 - \rho)^2$。由利特尔法则，$W = L/\lambda = \frac{\rho}{\lambda(1 - \rho)} = \frac1{\mu(1 - \rho)} = \frac1{\mu - \lambda}$。
:::

$1/(1 - \rho)$这个因子就是教训：利用率$50\%$时，一个请求花在系统里的时间是服务时间的两倍；$90\%$时是十倍；$\rho\to1$时延迟无界。推理服务系统并不是 M/M/1 队列——它同时服务许多请求，服务速率还取决于批次——但只要到达是随机的，这个定性形状在任何排队模型里都还在：负载逼近容量时延迟无界增长，而最后几个百分点的利用率要用延迟的大幅上涨来换。模拟中每秒$20$个请求的静态批处理展示了极端情形：$\rho > 1$，队列径直增长。

::: widget plot
f: 1/(1-x); log(100)/(1-x)
x: 0, 0.95
y: 0, 60
labels: mean time in system $W\mu$; 99th percentile ($\ln 100/(1-\rho)$)
vlines: 0.8
caption: M/M/1 队列在系统内的停留时间，以服务时间均值$1/\mu$为单位，随利用率$\rho$的变化。均值为$1/(1-\rho)$（[[#prop-mm1]]）；停留时间服从指数分布，故其 99 分位数为均值的$\ln 100\approx4.6$倍。运营者会把利用率压在远低于$1$的水平——常常低于$0.8$处的虚线——以约束尾部延迟。
:::

## 服务水平目标 {#sec-slo}

用户感受到的是一串词元，单个延迟数字描述不了一个语言模型服务。

::: definition 延迟指标与有效吞吐 {#def-slo}
对生成$n$个输出词元的请求：

- **首词元时间**（TTFT）：从到达到第一个输出词元；包含排队与预填充。
- **每输出词元时间**（TPOT，或词元间延迟）：第一个词元之后相邻输出词元之间的平均间隔；其尾部（间隔的 99 分位数）度量卡顿。
- **端到端延迟**：$\text{TTFT} + (n - 1)\,\text{TPOT}$。

**服务水平目标**（SLO）为这些量设定目标，通常定在分位数上（例如 p99 TTFT 低于$1$ s、p99 TPOT 低于$50$ ms）。**有效吞吐**（goodput）是能使既定比例的请求满足全部 SLO 的最高请求速率（Zhong 等，2024）。
:::

只谈吞吐量，等于奖励那些攒起巨大批次、让每个用户干等的系统；有效吞吐只计算在目标之内交付的工作，分块预填充与分离正是为抬高它而生。目标取决于应用。聊天界面要求 TTFT 远小于$1$秒、TPOT 快过阅读速度（人眼大约每秒读$4$–$8$个词元，每词元$50$–$100$ ms 即可胜任）；补全一行的编程助手要求整个输出都快；夜间为文档做摘要的批处理任务只在乎每词元成本（[[inference/latency-cost]]）。

::: example 满足 TPOT 目标的最大批量 {#ex-tpot}
对[[#ex-roofline]]的模型与加速器，每条序列都在上下文$4000$，步时间保持在 TPOT 目标$30$ ms 之内的最大解码批量是多少？给定$60$ GB 缓存显存，显存容得下吗？
::: solution
这一步是访存受限的（$B\approx120$时的计算项不到$4$ ms），所以需要$(16\times10^9 + B\cdot4000\cdot131{,}072)/2.68\times10^{12} + 0.2\text{ ms}\le30$ ms，即$16\times10^9 + 5.24\times10^8B\le7.99\times10^{10}$，$B\le121.8$：$121$条序列。但$60$ GB 只装得下$6\times10^{10}/131{,}072 = 457{,}800$个词元，仅够$114$条$4000$词元的序列。显存先收紧：$B = 114$时步长$28.5$ ms，加速器交出约$4000$词元/秒。更紧的 TPOT 目标，比如$15$ ms，会把批量砍到$B\le45$，吞吐量随之而落——延迟目标与显存容量一起定下了工作点。
:::
:::

::: warning “更高的吞吐量意味着更好的推理服务系统”
吞吐量（每块加速器的每秒词元数）总能靠加大批次、多放请求来抬高——直到显存放不下——而所有人的延迟一起变差。比较两个系统，必须在同样的负载、同样的延迟目标之下比，最好用有效吞吐或吞吐—延迟曲线，而不是峰值吞吐。凡是只报吞吐量、不报请求到达模式、提示与输出长度和延迟分位数的基准，都不可比。
:::

### 显存压力下的调度

连续批处理按显存准入请求，但输出在不断变长而最终长度未知，系统可能在生成中途用尽缓存块。惯用的补救是**抢占**：暂停一个或多个请求（通常是最晚准入的那些），释放它们的块，稍后再恢复——要么把它们的缓存**换出**到主机内存再换回，要么对提示加已生成词元重新预填充以**重算**——重算往往更便宜，因为预填充效率很高（[[inference/decoding-sampling#prop-phases]]）。调度器还会限制排队请求的数量（准入控制：宁可返回错误，也不接受一个注定满足不了 SLO 的请求），让交互流量优先于批处理流量，并把共享前缀的请求路由到同一个副本，让前缀缓存（[[inference/kv-cache#def-prefix]]）命中。

### 推理服务引擎

截至 2026 年，本章的技术由若干开源推理服务引擎实现，其中包括 vLLM（2023 年起，引入了分页注意力）、Hugging Face Text Generation Inference（2023 年起）、NVIDIA TensorRT-LLM（2023 年起）、SGLang（2024 年起，带基数树前缀缓存），以及面向本地与 CPU 推理的 llama.cpp（2023 年起）。它们共享这里描述的架构：HTTP 前端；在分页缓存上运行连续批处理的调度器；可选的分块预填充与前缀缓存；面向分页缓存与量化权重的注意力内核（[[inference/quantisation]]）；当模型权重放不进单块加速器时，按张量并行或流水线并行切分模型的支持（[[scaling/model-parallelism]]）。它们的相对性能随版本而变、取决于负载，所以要测，不能猜。

::: application 为服务切分模型
模型按张量并行切到$k$块加速器上时，每步从每块设备读取$1/k$的权重，于是访存受限的解码步在同样批量下至多快$k$倍——代价是每一层都要跨设备通信。流水线并行则不会缩短单个请求的单个步；它靠让若干微批次同时在飞来提高吞吐量。交互式服务通常在机内高速互连的条件下选择张量并行；见[[scaling/model-parallelism]]。
:::

::: history
把请求凑批以共享权重读取，和神经网络在 GPU 上提供服务同龄；自回归模型特有的问题——请求长度不可预测——由 Orca（Yu、Jeong、Kim、Kim 与 Chun，OSDI 2022）处理，它提出了迭代级调度与选择性批处理。PagedAttention（Kwon 等，SOSP 2023）移除了限制批量的显存浪费。Agrawal 等提出分块预填充（“Sarathi”，2023，及 Sarathi-Serve，OSDI 2024）；Zhong 等的 DistServe（OSDI 2024）与 Patel 等的 Splitwise（ISCA 2024）把预填充与解码分开，并把 SLO 之下的有效吞吐立为目标。排队结论是经典成果：Erlang（1909）研究了泊松到达的电话交换台，Kendall（1953）引入了 A/S/c 记号，Little（1961）证明了$L = \lambda W$。
:::

::: summary
- $B$个词元上线性层的算术强度约为$2B/b$：批处理摊薄了权重读取，各层要到批量接近脊点（当前 GPU 上 16 位约$200$–$300$个词元）才变成计算受限。
- 解码注意力的强度是$2h/(h_{kv}b)$，与批量无关：缓存读取永远摊不薄，长上下文时它主导整步。
- **静态批处理**把槽位浪费在填充上（均匀长度下利用率约$\tfrac12$），还让请求干等；**连续批处理**每步都调度，已是天下通用。
- **分块预填充**用词元预算给每步封顶，把重计算的提示块混进访存受限的解码步；**分离**把预填充与解码放到各自的池上并传输缓存。
- **利特尔法则**$L = \lambda W$对任何系统都成立；M/M/1 队列给出$W = 1/(\mu - \lambda)$，利用率逼近$1$时延迟爆炸。
- 服务的好坏以**TTFT**、**TPOT**及其相对 SLO 的分位数、以**有效吞吐**论，而不以裸吞吐量论。
:::

## 习题

::: exercise 利特尔法则 {level=1 check="120"}
一台服务器在稳态下每秒完成$30$个请求，每个请求在它里面停留$4$ s。服务器里平均有多少个请求？
::: solution
$L = \lambda W = 30\cdot4 = 120$。
:::
:::

::: exercise 一台 M/M/1 服务器 {level=1 check="0.5"}
请求以每秒$8$个的速率到达，服务器以每秒$10$个的速率完成（服务时间指数分布）。平均系统内时间是多少秒？
::: solution
$W = 1/(\mu - \lambda) = 1/(10 - 8) = 0.5$ s，是平均服务时间$0.1$ s 的五倍，因为$\rho = 0.8$。
:::
:::

::: exercise 端到端延迟 {level=1 check="10.3"}
一个请求的 TTFT 为$0.3$ s、TPOT 为$25$ ms，生成$401$个词元。它的端到端延迟是多少秒？
::: solution
$0.3 + 400\cdot0.025 = 10.3$ s。第一个词元包含在 TTFT 里；其余$400$个各占一个 TPOT。
:::
:::

::: exercise 小批量的精确强度 {level=2 check="15.88"}
计算（保留两位小数）：一个$4096\times4096$的线性层作用在$16$个词元的批量上、16 位精度时的算术强度（[[#eq-intensity]]）。
::: solution
FLOPs：$2\cdot16\cdot4096^2 = 5.37\times10^8$。字节：$2(4096^2 + 16\cdot8192) = 2(16{,}777{,}216 + 131{,}072) = 33{,}816{,}576$。比值：$536{,}870{,}912/33{,}816{,}576 = 15.88$ FLOPs 每字节，略低于近似值$2B/b = 16$。
:::
:::

::: exercise 脊点批量 {level=2 check="295"}
一台加速器的峰值为$989$ TFLOP/s 与$3.35$ TB/s。用$b = 2$的$I\approx2B/b$，按标称速率，批量从多大（取最近整数）起，解码步的线性层变成计算受限？
::: solution
脊点为$989/3.35 = 295.2$ FLOPs 每字节，而 16 位精度下$I = B$，故$B\approx295$。换成 8 位权重（权重$b = 1$）强度加倍、脊点批量减半——这是量化既帮显存又帮吞吐量的原因之一。
:::
:::

::: exercise GQA 下的注意力强度 {level=2 check="4"}
一个模型有$32$个查询头和$8$个键值头，缓存以 bfloat16 保存。解码注意力的算术强度是多少 FLOPs 每字节？若是 8 位缓存呢？
::: solution
$2h/(h_{kv}b) = 2\cdot32/(8\cdot2) = 4$ FLOPs 每字节（[[#prop-attn-intensity]]）。8 位缓存时$b = 1$，强度为$8$：同样的算术，每步读取的字节数减半。
:::
:::

::: exercise M/M/1 队列的尾部延迟 {level=2}
M/M/1 队列中，一个请求的系统内时间服从参数$\mu - \lambda$的指数分布（可假定此结论）。导出它的$q$分位数，并计算$\mu = 10$/s、$\lambda = 8$/s 时的 99 分位数。要让它减半，$\lambda$必须缩小到原来的多少？
::: solution
$\Prob(W > w) = e^{-(\mu - \lambda)w}$；令其等于$1 - q$得$w_q = \ln\frac{1}{1 - q}/(\mu - \lambda)$。$q = 0.99$时：$\ln100/2 = 2.30$ s，而均值是$0.5$ s。要减半需把$\mu - \lambda$加倍到$4$：$\lambda = 6$/s，负载缩小为原来的$0.75$才能让尾延迟减半。
:::
:::

::: exercise 挑选块大小 {level=3 check="670"}
在[[#ex-roofline]]的步时间模型下，一步解码$64$条上下文$2000$的序列，同时预填充$C$个提示词元。TPOT 目标为每步$20$ ms。满足它的最大整数$C$是多少？
::: solution
内存项为$(16\times10^9 + 131{,}072(64\cdot2000 + C))/2.68\times10^{12}$，约$12.2$ ms 加每个提示词元$0.05$ µs，所以题目所问的任何$C$都让内存项保持在$20$ ms 以下。计算项为$2\cdot8\times10^9(64 + C)/593.4\times10^{12}$。计入固定开销后，步长满足$20$ ms 要求$1.6\times10^{10}(64 + C)/593.4\times10^{12}\le19.8\times10^{-3}$，即$64 + C\le734.4$，$C\le670$。（$C = 670$时内存项约$12.3$ ms，决定性的仍是$19.8$ ms 的计算项。）模拟里$512$的预算为更长的上下文留了余量。
:::
:::

::: exercise 分离何时划算 {level=3}
按下述方式给一个混合（未分离）服务器建模：每次预填充$P$个词元耗时$t_p$，其间全体运行中的解码都被延迟$t_p$（不分块）。分离的一对实例则给 TTFT 添上缓存传输时间$t_x = Ps_{\text{KV}}/\beta_{\text{link}}$，且从不延迟解码。设提示以每个解码实例$\lambda$的速率到达：写出混合服务器中解码被迫停摆的时间比例，并导出分离在不把平均 TTFT 抬高超过$1 + \epsilon$倍的条件下降低平均 TPOT 的条件。用$\lambda = 8$/s 和[[#ex-transfer]]的数字计算它。
::: solution
混合服务器中，预填充占据$\lambda t_p$的时间比例（$\lambda t_p < 1$），其间一个解码词元也不产出，于是平均 TPOT 相比纯解码服务器被抬高约$1/(1 - \lambda t_p)$倍。分离彻底去除了停摆（解码在自己那台实例上跑），并把 TTFT 抬高$t_x$，所以 TTFT 的条件是$t_x\le\epsilon\,\text{TTFT}\approx\epsilon\,t_p$，即$Ps_{\text{KV}}/\beta_{\text{link}}\le\epsilon t_p$。代入$t_p = 54$ ms、$t_x = 5.2$ ms、$\lambda = 8$/s：混合服务器$8\cdot0.054 = 43\%$的时间在停摆，TPOT 被抬高$1/0.57 = 1.76$倍；分离把 TTFT 抬高$5.2/54 = 9.6\%$，因此只要 TTFT 增加约$10\%$可以接受，分离就划算。这个粗略模型忽略了分块预填充无需任何传输就能减少停摆，也忽略了分离需要足够的负载让两个池都忙碌；真实的比较（DistServe、Splitwise、Sarathi-Serve）是在真实记录的负载上测量 SLO 之下的有效吞吐。
:::
:::

::: exercise 带上限长度的静态批处理 {level=3}
在[[#prop-static-util]]中，改设输出长度服从均值$m$、上限$n_{\max} = 8m$的指数分布。用模拟（固定种子的纯 Python）估计$B = 32$的静态批次的利用率，并解释它为什么比均匀长度的情形低。
::: solution
```python
import random
rng = random.Random(0); m, B, trials = 100, 32, 20000
u = 0.0
for _ in range(trials):
    n = [min(rng.expovariate(1 / m), 8 * m) for _ in range(B)]
    u += sum(n) / (B * max(n)) / trials
print(round(u, 3))    # 0.261
```
利用率约为$0.26$。截断指数分布的均值约为$m$，但$B$个指数变量最大值的期望是$m\sum_{k\le B}1/k$，$B = 32$时为$4.06m$，所以$U\approx1/4$（模拟得到的比值均值$0.261$略高于均值之比）。长尾的输出长度——实践中很常见，因为少数请求生成的词元远多于其余——使静态批处理比均匀情形的$\tfrac12$糟糕得多，而连续批处理不受尾部影响。
:::
:::
