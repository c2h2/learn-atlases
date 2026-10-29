一次预训练运行是一个重复执行几十万个回合的循环：取出一个词元序列的批次，计算[[pretraining/pretraining-objectives#def-clm]]中的损失，反向传播，裁剪梯度，按调度规定的学习率走一步优化器，记录日志，并不时保存一个检查点。每个要素都已在[[neural-networks/optimisers]]与[[neural-networks/training-practice]]中见过。预训练改变的是规模。一个批次包含数百万词元；模型及其优化器状态放不下一块加速器；运行要在数千台设备上花上数周，其中一些设备还会出故障；而且通常只有一次做对的机会，因为完整运行太昂贵、无法重来。

本章来做支配这样一次运行的算术。我们推导出训练对$N$个参数、$D$个词元大约花费$6ND$次浮点运算的法则，通过**模型 FLOPs 利用率**把它转化为训练时间估计，定义实践中使用的学习率调度，解释数据并行、张量并行与流水线并行并推导 ZeRO 与 FSDP 分片省下的显存，再算出硬件出故障时应当多久保存一次检查点。章末用一段带检查点恢复功能的纯 Python 迷你完整循环收尾。系统层面——互连、内核、并行调度的细节——在[[scaling/flops-memory]]、[[scaling/data-parallelism]]与[[scaling/model-parallelism]]中讨论。

## 词元批次 {#sec-batches}

::: definition 全局批次 {#def-batch}
一个训练步处理一个由$B$条长度为$T$的序列组成的**全局批次**，即每批$B\cdot T$个**词元**（在因果目标下每个词元都是一个预测目标）。全局批次的构成是

$$
B = b_{\text{micro}}\times A\times n_{\text{DP}},
$$

其中$b_{\text{micro}}$条序列（**微批次（micro-batch）**）恰好能一次通过一台设备上的模型，每个更新之前累积$A$个微批次（[[neural-networks/training-practice#sec-accumulation]]），而$n_{\text{DP}}$个数据并行副本各自处理自己的微批次。$D$个词元的一次运行需要$S = D/(BT)$个优化器步。
:::

文档很少恰好有$T$个词元。预训练流水线会把它们**打包**：文档首尾相连、中间插入文档结束词元，再把流切成每行$T$个词元，从而不在填充上浪费算力。注意力可以跨过文档边界（简单且常见），也可以在每篇文档内部加掩码；两种做法都有使用，训练长上下文时掩码更为重要。

::: example 批次算术 {#ex-batch}
一次运行使用$T = 4096$个词元的序列、微批次$b_{\text{micro}} = 4$、$A = 2$步累积以及$n_{\text{DP}} = 128$个数据并行副本。一个批次有多少词元？$D = 2$万亿词元的预算需要多少步？
::: solution
$B = 4\cdot2\cdot128 = 1024$条序列，每批$BT = 1024\cdot4096 = 4{,}194{,}304\approx420$万词元。步数：$2\times10^{12}/4{,}194{,}304 = 476{,}837$，约五十万步。已发表的运行与此量级相同：Llama 2（2023）以$400$万词元的批次训练$2$万亿词元；Llama 3最大的模型开始时每批$400$万词元，训练后期增加到$1600$万。
:::
:::

为什么批次这么大？小批量的梯度噪声按$1/\sqrt{B}$下降，而在**临界批大小**（McCandlish 等，2018）之内，更大的批次允许学习率几乎按比例增大、步数几乎按比例减少，从而在更多设备上更快完成运行。超过它之后，再增批次收效甚微。临界批大小随损失下降而增长，这正是有些运行以较小的批次开始再**逐步加大**的原因之一：GPT-3 在前$40$到$120$亿词元内把批次从$3.2$万词元增加到完整的$320$万词元。

## 一步的代价：6ND {#sec-flops}

与$d_{\text{out}}\times d_{\text{in}}$权重矩阵相乘的矩阵-向量积花费$d_{\text{out}}d_{\text{in}}$次乘法和同样多次的加法，即**每权重 2 FLOP**（[[math-for-ml/vectors-matrices#prop-flops]]）。Transformer 的参数几乎全都位于这样的矩阵里，由此得到大规模训练中最有用的公式。

::: proposition 训练算力约为 6ND {#prop-6nd}
设一个 Transformer 的权重矩阵（不含词嵌入查表）有$N$个参数、$n_{\text{layer}}$层、宽度$d$、上下文长度$T$。在$D$个词元上训练大约花费

$$
C\approx6ND + 6\,n_{\text{layer}}\,T\,d\,D\ \text{FLOPs},
$$ {#eq-6nd}

当$T\ll N/(n_{\text{layer}}d)$时第一项占主导，对大模型即$C\approx6ND$。
:::

::: proof
**前向传播。**每个词元与每个权重矩阵相乘一次，每参数花费$2$ FLOP：每词元$2N$。注意力加上$QK^\top$的乘积与值的加权和，这些不是参数乘法。位置$t$上的查询要与$t$个键比较——各头合计宽度$d$（$2td$ FLOPs）——并混合$t$个宽度为$d$的值向量（$2td$ FLOPs）。有因果掩码时，$t$在一条序列各位置上的平均值约为$T/2$，所以平均代价是每词元每层$2Td$、每词元$2n_{\text{layer}}Td$——即 Kaplan 等（2020）的$2n_{\text{layer}}n_{\text{ctx}}d_{\text{attn}}$一项。（先算出完整$T\times T$打分矩阵再加掩码的内核会做两倍于此的工作量。）归一化、激活与 softmax 每词元每层花费$O(d)$，可忽略不计。

**反向传播。**对线性层$\mathbf{y} = W\mathbf{x}$，反向传播计算对输入的梯度$W^\top\bar{\mathbf{y}}$和对权重的梯度$\bar{\mathbf{y}}\mathbf{x}^\top$（[[math-for-ml/gradients#prop-linear-grad]]）；两者各自与前向乘积等价。所以反向传播花费前向的两倍，前向加反向是前向的三倍：每词元$3\cdot(2N + 2n_{\text{layer}}Td) = 6N + 6n_{\text{layer}}Td$。乘以$D$个词元即得[[#eq-6nd]]。两项之比为$n_{\text{layer}}Td/N$；由$N\approx12n_{\text{layer}}d^2$（[[transformers/transformer-block#prop-block-params]]）它是$T/(12d)$，当上下文比$12d$短得多时很小。
:::

优化器步每步花费$O(N)$ FLOPs 而不是每词元，可忽略不计。这个估计只数模型必需的计算；**激活重计算**（[[#sec-memory]]）会重复前向的一部分，加上$6ND$没有计入的工作量。

::: example 一个70亿参数运行的算力 {#ex-compute}
一个$N = 7\times10^9$个参数、$n_{\text{layer}} = 32$、$d = 4096$、$T = 4096$的模型在$D = 2\times10^{12}$个词元上训练。计算$6ND$与注意力修正项。
::: solution
$6ND = 6\cdot7\times10^9\cdot2\times10^{12} = 8.4\times10^{22}$ FLOPs。每词元的注意力项为$6\cdot32\cdot4096\cdot4096 = 3.2\times10^9$ FLOPs，对比$6N = 4.2\times10^{10}$，即增加$7.7\%$——与$T/(12d) = 4096/49152 = 8.3\%$一致，因为该模型的$N$接近$12n_{\text{layer}}d^2 = 6.4\times10^9$。若上下文为$3.2$万词元，修正项将超过$60\%$，这就是长上下文训练昂贵的原因。
:::
:::

## 利用率与训练时间 {#sec-mfu}

加速器以**峰值**吞吐标称——稠密 16 位矩阵乘法，2020 年代中期的数据中心加速器约为每设备$10^{15}$ FLOP/s（$1$ PFLOP/s）。真实训练只能达到其中一部分：时间花在通信、访存受限的操作（归一化、softmax、逐元素函数）、流水线气泡与重计算上。

::: definition 模型 FLOPs 利用率 {#def-mfu}
一次训练运行的**模型 FLOPs 利用率**（MFU；Chowdhery 等，2022）为

$$
\text{MFU} = \frac{6N\cdot(\text{每秒处理的词元数})}{n_{\text{dev}}\cdot\text{每设备峰值 FLOP/s}},
$$

即硬件峰值中花在模型所严格必需的 FLOPs 上的比例（可选择把[[#eq-6nd]]的注意力项也算进去）。**硬件 FLOPs 利用率**统计实际执行的全部 FLOPs（含重计算），因此更高。
:::

因为 MFU 只数必需的工作，它在不同实现之间可比：重计算激活的运行不会因重计算而得到加分。大稠密模型的已发表值通常在$30\%$到$55\%$之间；PaLM 为其$5400$亿参数的模型报告了$46.2\%$（2022），Llama 3 报告为其$4050$亿参数的模型在多达$16{,}384$台加速器上达到$38$–$43\%$（2024）。

::: proposition 训练时间 {#prop-time}
$n_{\text{dev}}$台设备上一次$C = 6ND$ FLOPs 的运行，设备峰值吞吐为$F$ FLOP/s、利用率为$U$时，需要

$$
t = \frac{6ND}{n_{\text{dev}}\,F\,U}\ \text{秒}。
$$ {#eq-time}
:::

::: proof
由[[#def-mfu]]，运行每秒完成$n_{\text{dev}}FU$个模型 FLOPs，而它必须完成$6ND$个。
:::

::: example 由吞吐测量得到 MFU {#ex-mfu}
[[#ex-compute]]中$70$亿参数的模型在$1024$台加速器上训练，每台峰值$10^{15}$稠密 bfloat16 FLOP/s，日志报告每秒$10^7$词元。MFU 是多少（忽略注意力项）？$2\times10^{12}$词元的运行要多久？
::: solution
模型 FLOP/s：$6\cdot7\times10^9\cdot10^7 = 4.2\times10^{17}$。峰值：$1024\cdot10^{15} = 1.024\times10^{18}$。MFU $= 4.2/10.24 = 41\%$。时间：$2\times10^{12}/10^7 = 2\times10^5$秒，$2.3$天，与[[#eq-time]]给出的一致：$8.4\times10^{22}/(1.024\times10^{18}\cdot0.41) = 2.0\times10^5$秒。若把注意力项计入，MFU 将为$41\%\cdot1.077 = 44\%$；报告应当说明采用哪种口径。
:::
:::

::: widget plot
f: 8.4e22/(n*1e15*x)/86400
x: 0.1, 0.7
y: 0, 30
sliders: n=1024:128:8192:128
labels: training days for $6ND = 8.4\times10^{22}$ FLOPs
caption: 对$n$台每台峰值$10^{15}$ FLOP/s 的设备，[[#ex-compute]]那次运行按[[#eq-time]]得到的训练天数，横轴为 MFU。利用率翻倍，时间与成本都减半，这就是大量工程量花在通信重叠与融合内核上的原因。增加设备只有在 MFU 不下降时才有用，而实际上随着通信增长 MFU 会缓慢下降。
:::

## 学习率调度 {#sec-schedules}

预训练使用 AdamW（[[neural-networks/optimisers#sec-adamw]]），其超参数已成为惯例：$\beta_1 = 0.9$、$\beta_2 = 0.95$（低于默认的$0.999$，使二阶矩对梯度尺度变化的适应更快）、权重衰减$0.1$、全局梯度范数裁剪于$1.0$（[[neural-networks/optimisers#def-clipping]]）；GPT-3 与 LLaMA 系列都报告了这些值。学习率遵循一条调度。

::: definition 预训练调度 {#def-schedules}
设峰值学习率$\eta_{\max}$、预热长度$S_w$步、总长度$S$：

- **线性预热**：$t\le S_w$时$\eta_t = \eta_{\max}\,t/S_w$。
- **余弦衰减**至下限$\eta_{\min}$（常取$0.1\,\eta_{\max}$）：$S_w < t\le S$时$\eta_t = \eta_{\min} + \tfrac12(\eta_{\max} - \eta_{\min})\big(1 + \cos\big(\pi\frac{t - S_w}{S - S_w}\big)\big)$。
- **预热–平稳–衰减**（WSD）：预热之后保持$\eta_t = \eta_{\max}$直到第$S - S_d$步，然后在最后$S_d$步内（通常是全程的$10$–$20\%$）衰减（线性，或用另一条短曲线）到$\eta_{\min}$。
:::

预热之所以重要，是因为早期梯度很大，而 Adam 的二阶矩估计在未见过许多步之前并不可靠；第$1$步的高学习率可能把模型推进一个再也回不来的糟糕区域（[[pretraining/training-stability]]）。余弦衰减多年间是标准做法；Hoffmann 等（2022）发现余弦周期应当与运行长度匹配——按更长运行设定、提前中止的余弦调度给出的损失更差——这使得最终长度事先未知时余弦不便使用。**WSD**（Hu 等，2024；Hägele 等，2024 分析）消除了这个问题：平稳阶段可以想延长多久就延长多久，并且可以从任意检查点分出一个衰减段得到成品模型——在特殊数据上退火也正是这样做的（[[pretraining/data-mixtures#def-annealing]]）。Hägele 等发现，冷却段约为$20\%$的 WSD 在相同算力下与余弦调度相当。

::: widget plot
f: max(0, min(x/5, 0.1 + 0.45*(1 + cos(pi*(x - 5)/95)))); max(0, min(x/5, 1, 0.1 + 0.9*(100 - x)/d))
x: 0, 100
y: 0, 1.1
sliders: d=20:5:60:1
labels: warm-up then cosine to $10\%$; WSD with decay over the last $d\%$
caption: 一次运行中学习率占$\eta_{\max}$的比例随步数（步数的百分比）的变化，预热占$5\%$。余弦从预热结束时开始衰减；WSD 保持峰值、在最后$d\%$线性衰减。WSD 运行的损失在平稳阶段高于余弦运行，在衰减段急剧下降，最终落点大致相同——所以 WSD 的中间检查点会低估成品模型的质量，训练过程中做评测时要记住这一点（[[pretraining/in-training-evaluation]]）。
:::

峰值学习率通常在小模型上扫描选定，再向外外推；它随模型规模下降（GPT-3 对$1.25$亿参数的模型用$6\times10^{-4}$，对$1750$亿参数的模型用$0.6\times10^{-4}$）。$\mu$P 这类参数化力图让最优点随宽度平移（[[pretraining/training-stability#sec-mup]]）。

## 并行与显存 {#sec-memory}

用混合精度 Adam 训练一个$N$参数的模型，在存入任何一个激活之前，就要为参数、梯度和优化器状态预留显存。

::: proposition 每参数十六字节 {#prop-16-bytes}
权重与梯度用 bfloat16、权重保留 float32 主副本、Adam 矩用 float32 时，训练状态占每参数$16$字节：权重$2N$字节、梯度$2N$、优化器状态$12N$。
:::

::: proof
按参数计：bfloat16 的工作权重$2$字节；bfloat16 的梯度$2$字节；float32 主权重——更新施加在它上面才不会丢失微小增量（[[neural-networks/training-practice#prop-swamping]]）——$4$字节；Adam 的一阶、二阶矩各 float32 $4$字节。总和$2 + 2 + 4 + 4 + 4 = 16$；后三项即“优化器状态”的$12$字节。（这套记账出自 Rajbhandari 等，2020，以及[[neural-networks/training-practice#ex-memory]]。）
:::

一个$700$亿参数的模型因此需要$1.12$ TB 训练状态，超过单台加速器显存的十倍。三种并行方式把工作量分开。

::: definition 数据并行、张量并行与流水线并行 {#def-parallelism}
- **数据并行**（DP）：模型的$n_{\text{DP}}$个副本各处理全局批次的不同部分；反向传播之后梯度经**全规约**（all-reduce）平均，于是每个副本走相同的一步。
- **张量并行**（TP；Shoeybi 等，2019，Megatron-LM）：每个权重矩阵切分到$n_{\text{TP}}$台设备上——在前馈块中第一个矩阵按列、第二个按行切——于是每台设备持有该层的$1/n_{\text{TP}}$，代价是每个注意力和前馈块的前向与反向都要对激活做一次全规约。
- **流水线并行**（PP；Huang 等，2019，GPipe）：层被划分到不同设备上的$p$个连续**阶段**；每个微批次依次流过各阶段，$m$个微批次流水化，使各阶段同时处理不同的微批次。
:::

三者组合使用（“3D 并行”）：服务器内部用张量并行（那里链路最快），跨几台服务器用流水线并行，其余方向用数据并行，于是$n_{\text{dev}} = n_{\text{DP}}n_{\text{TP}}p$。混合专家模型再加**专家并行**，把不同的专家放在不同设备上（[[transformers/mixture-of-experts#sec-systems]]）。

::: proposition 流水线气泡 {#prop-bubble}
在同步流水线调度中，$p$个阶段、每步$m$个微批次、每阶段每微批次耗时相同为$t$（前向与反向合计），每步耗时$(m + p - 1)t$，设备空闲时间占比（**气泡**）为

$$
\frac{p - 1}{m + p - 1}。
$$
:::

::: proof
第一个微批次经过$p - 1$个阶段时间到达最后一个阶段；此后每个阶段时间有一个微批次流出流水线，所以$m$个中的最后一个在$(p - 1) + m$个阶段时间后完成（前向与反向合计，反向传播的调度与之镜像）。每阶段在$(m + p - 1)t$中忙$mt$，故空闲比例为$(p - 1)/(m + p - 1)$。
:::

::: example 选择微批次数 {#ex-bubble}
一个模型被切成$p = 8$个流水线阶段。每步$m = 8$与$m = 32$个微批次时气泡各是多少？
::: solution
$m = 8$：$7/15 = 47\%$空闲——近一半硬件被浪费。$m = 32$：$7/39 = 18\%$。微批次更多能缩小气泡，但需要更大的全局批次（或更小的微批次，硬件利用率更低）。交错调度让每台设备持有若干不相邻的阶段（Narayanan 等，2021），可进一步缩小气泡。
:::
:::

**分片状态。**朴素数据并行在每个副本上存全部$16N$字节，是冗余的：每个副本持有完全相同的优化器状态。**ZeRO**（Rajbhandari 等，2020）把它划分到$n_{\text{DP}}$个副本上，每个副本只保留自己更新的那一片。

::: proposition ZeRO 每设备显存 {#prop-zero}
按[[#prop-16-bytes]]的记账，$N$个参数、$n_{\text{DP}}$台数据并行设备下，每设备的训练状态为

| 阶段 | 分片内容 | 每设备字节数 |
|---|---|---|
| 无（朴素 DP） | — | $16N$ |
| ZeRO-1 | 优化器状态 | $4N + 12N/n_{\text{DP}}$ |
| ZeRO-2 | 优化器状态、梯度 | $2N + 14N/n_{\text{DP}}$ |
| ZeRO-3 / FSDP | 优化器状态、梯度、权重 | $16N/n_{\text{DP}}$ |
:::

::: proof
每个阶段完整保留未分片的项，分片的项保留$1/n_{\text{DP}}$。ZeRO-1 保留权重与梯度（$2N + 2N$），把$12N$优化器状态分片。ZeRO-2 保留权重（$2N$），把梯度与优化器状态（$2N + 12N = 14N$）分片：梯度经 **reduce-scatter** 规约分散，每台设备只收到自己那片上的平均梯度，通信量不高于一次全规约。ZeRO-3 把一切分片；权重在前向与反向将要用到之前逐层 **all-gather** 聚合，用完即弃，使数据并行通信增加约$50\%$。PyTorch 的全分片数据并行（FSDP；Zhao 等，2023）实现的就是 ZeRO-3 方案。
:::

::: example 装下一个700亿参数模型 {#ex-zero}
取$N = 7\times10^{10}$、$n_{\text{DP}} = 64$，计算不分片以及各 ZeRO 阶段下每设备的训练状态。
::: solution
朴素 DP：$16\cdot7\times10^{10} = 1120$ GB。ZeRO-1：$4N + 12N/64 = 280 + 13.1 = 293$ GB。ZeRO-2：$2N + 14N/64 = 140 + 15.3 = 155$ GB。ZeRO-3：$1120/64 = 17.5$ GB。只有完全分片（或分片配合张量并行与流水线并行）才能把训练状态装进单台加速器的显存，并给激活留下余地。
:::
:::

**激活。**反向传播需要前向的激活，长序列大批次时它们可能超过训练状态本身。**激活检查点**（重计算；Chen 等，2016）只存每个块的输入，反向传播时重算其余部分，用一次额外前向换显存——若全部重计算约多花三分之一的算力（$8ND$而非$6ND$）；只**选择性**重计算注意力分数这类“便宜但吃显存”的部分（Korthikanti 等，2022）则少一些。

::: quiz
下面哪些能减少每设备上 Adam 矩估计所需的显存？
- [ ] 梯度累积
- [x] ZeRO 第一阶段
- [ ] 激活检查点
- [x] 张量并行
::: solution
ZeRO-1 把优化器状态分片到各数据并行副本上；张量并行把每个权重矩阵——连同它的优化器状态——切开分到各设备。梯度累积靠更小的微批次减少每步的激活显存，激活检查点靠重计算减少激活显存；两者都不改变优化器状态。
:::
:::

## 检查点与故障 {#sec-checkpoints}

在数千台设备上运行数周必然会被打断。Llama 3 报告（2024）记录：在多达$16{,}384$台加速器上为期$54$天的预训练中发生$466$次作业中断，其中$419$次是意外的——多数是硬件故障——依靠自动化仍然达到$90\%$以上的有效训练时间。防线是**检查点**：精确恢复所需的一切——权重（通常是 float32 主副本）、优化器矩、步数计数器与调度器状态、随机数生成器状态、数据流中的位置（[[neural-networks/training-practice#sec-reproducibility]]）。对$700$亿参数的模型，这约是每参数$12$字节，$840$ GB。

多久存一次？保存要花时间；存得少，则每次故障损失的工作多。

::: proposition 最优检查点间隔（Young，1974） {#prop-young}
设保存一个检查点耗时$\delta$，故障随机发生、平均无故障时间$M\gg\delta$，故障后从最后一个检查点恢复。若每$\tau$单位计算时间存一次，损失的时间比例近似为

$$
f(\tau) = \frac{\delta}{\tau} + \frac{\tau}{2M},
$$ {#eq-young}

在$\tau^\ast = \sqrt{2\delta M}$处最小，此时$f(\tau^\ast) = \sqrt{2\delta/M}$。
:::

::: proof
每$\tau$的生产时间额外花费$\delta$用于保存，即比例$\delta/\tau$。故障在区间内大致均匀地到来，所以平均损失自上次检查点以来的$\tau/2$个工作量；故障率为$1/M$，故单位时间的期望损失为$\tau/(2M)$（忽略重启时间与保存期间的故障，当$\tau, \delta\ll M$时这是准确的）。令$f'(\tau) = -\delta/\tau^2 + 1/(2M) = 0$得$\tau^\ast = \sqrt{2\delta M}$；$f'' > 0$，故为最小值，代回得$\delta/\sqrt{2\delta M} + \sqrt{2\delta M}/(2M) = 2\sqrt{\delta/(2M)} = \sqrt{2\delta/M}$。
:::

::: example 多久存一次检查点 {#ex-young}
取 Llama 3 的数字蕴含的故障率——$54$天$419$次意外中断，$M = 54\cdot24/419 = 3.1$小时——以及一次阻塞训练$\delta = 5$分钟的保存。什么间隔使损失最小？损失比例是多少？若异步保存把阻塞时间降到$1$分钟呢？
::: solution
$\delta = 5/60$小时：$\tau^\ast = \sqrt{2\cdot0.0833\cdot3.09} = 0.72$小时，约$43$分钟，且$f = \sqrt{2\cdot0.0833/3.09} = 23\%$的时间被损失——实在太多。$\delta = 1$分钟时：$\tau^\ast = 19$分钟，$f = 10\%$。重启时间还要另加。因此大型运行采用异步保存（把状态拷入主机内存后在后台写盘）、在对端设备上保留内存副本，并投入快速检测和替换故障节点的机制，这些合起来使有效训练时间超过$90\%$。
:::
:::

**监控。**除检查点外，一次运行每步记录训练损失、裁剪前的梯度范数、学习率、吞吐量与 MFU；每隔一段时间记录各领域的验证损失与下游评测（[[pretraining/in-training-evaluation]]）；以及预警不稳定的统计量，例如最大注意力 logit 与输出 logits 的范数（[[pretraining/training-stability]]）。

::: warning 平滑的损失曲线不能证明数据流水线是对的
预训练中最昂贵的一些错误在损失曲线上是看不见的：数据加载器悄悄重复某一个分片、乱序 bug 使各领域成块喂入、训练与评测的分词器不一致、恢复的运行把数据流从头开始、文档被截断到固定长度。这些情况下损失照样下降。要记录每一步消费了哪些数据，把实际配比与计划比对（[[pretraining/data-mixtures#sec-code]]），并比较各领域验证损失而不是只看汇总值。
:::

## 一个迷你循环 {#sec-code}

下面的清单在玩具规模上把各部件拼在一起：[[pretraining/pretraining-objectives#sec-code]]中的二元模型，在狄更斯选段上训练，随机批次为$B = 32$条$T = 8$字符的序列（每步$256$个目标），AdamW 取$\beta_2 = 0.95$、权重衰减$0.1$，全局范数裁剪于$1.0$，预热$20$步后余弦衰减到$10\%$。最后$56$个字符留作验证。最后它在$150$步后保存检查点、“崩溃”、恢复，并检查结果与不中断的运行完全一致。

```python
import copy, math, random

text = ("it was the best of times, it was the worst of times, it was the age of "
        "wisdom, it was the age of foolishness, it was the epoch of belief, it was "
        "the epoch of incredulity, it was the season of light, it was the season of "
        "darkness, it was the spring of hope, it was the winter of despair, we had "
        "everything before us, we had nothing before us, we were all going direct to "
        "heaven, we were all going direct the other way")   # 狄更斯，1859：公版书
chars = sorted(set(text)); V = len(chars)
ids = [chars.index(ch) for ch in text]
train, val = ids[:360], ids[360:]                         # 最后 56 个字符留作验证

def lr_at(step, peak=0.1, warmup=20, total=300, floor=0.1):   # 预热 + 余弦衰减到 10%
    if step < warmup: return peak * (step + 1) / warmup
    p = (step - warmup) / (total - warmup)
    return peak * (floor + (1 - floor) * 0.5 * (1 + math.cos(math.pi * p)))

def loss_grad(W, pairs):
    G = [[0.0] * V for _ in range(V)]; L = 0.0
    for a, b in pairs:
        m = max(W[a]); e = [math.exp(z - m) for z in W[a]]; s = sum(e)
        L -= W[a][b] - m - math.log(s)
        for j in range(V): G[a][j] += e[j] / s / len(pairs)
        G[a][b] -= 1 / len(pairs)
    return L / len(pairs), G

def new_state(seed):
    rng = random.Random(seed)
    return {"step": 0, "W": [[rng.gauss(0, 0.02) for _ in range(V)] for _ in range(V)],
            "m": [[0.0] * V for _ in range(V)], "v": [[0.0] * V for _ in range(V)],
            "rng": rng.getstate(), "log": []}

def train_steps(state, n, B=32, T=8, b1=0.9, b2=0.95, eps=1e-8, wd=0.1, clip=1.0, total=300):
    rng = random.Random(); rng.setstate(state["rng"])
    W, m, v = state["W"], state["m"], state["v"]
    for _ in range(n):
        t = state["step"]
        starts = [rng.randrange(len(train) - T) for _ in range(B)]       # B 条长度为 T+1 的序列
        pairs = [(train[s + i], train[s + i + 1]) for s in starts for i in range(T)]
        L, G = loss_grad(W, pairs)                                        # B*T = 256 个目标
        gnorm = math.sqrt(sum(g * g for row in G for g in row))
        scale = min(1.0, clip / (gnorm + 1e-12))                          # 全局范数裁剪
        lr = lr_at(t, total=total)
        for i in range(V):
            for j in range(V):
                g = G[i][j] * scale
                m[i][j] = b1 * m[i][j] + (1 - b1) * g
                v[i][j] = b2 * v[i][j] + (1 - b2) * g * g
                mh, vh = m[i][j] / (1 - b1 ** (t + 1)), v[i][j] / (1 - b2 ** (t + 1))
                W[i][j] -= lr * (mh / (math.sqrt(vh) + eps) + wd * W[i][j])   # AdamW
        state["step"] = t + 1
        if (t + 1) % 25 == 0 or t == 0:
            vl, _ = loss_grad(W, list(zip(val[:-1], val[1:])))
            state["log"].append((t + 1, round(L, 4), round(vl, 4), round(gnorm, 3), round(lr, 4)))
    state["rng"] = rng.getstate()
    return state

run = train_steps(new_state(0), 300)
print("step  train   val     grad-norm  lr")
for row in run["log"]: print(*row, sep="  ")

# 150 步后保存检查点、“崩溃”、从检查点恢复：结果相同
a = train_steps(new_state(0), 150)
ckpt = copy.deepcopy(a)                   # 权重、Adam 矩、步数、数据随机数状态
b = train_steps(ckpt, 150)
print("resumed run matches uninterrupted run:", b["W"] == run["W"])
```

```text
step  train   val     grad-norm  lr
1  3.1797  3.172  0.132  0.005
25  1.9263  2.4806  0.087  0.1
50  1.482  2.5551  0.048  0.0976
75  1.5471  2.6199  0.044  0.092
100  1.5344  2.6845  0.045  0.0835
125  1.6085  2.7953  0.047  0.0727
150  1.6062  2.8471  0.057  0.0605
175  1.6465  2.8967  0.046  0.048
200  1.489  2.9175  0.055  0.0359
225  1.4939  2.9647  0.048  0.0254
250  1.5709  3.0027  0.044  0.0172
275  1.589  3.0146  0.06  0.0119
300  1.6453  3.0338  0.051  0.01
resumed run matches uninterrupted run: True
```

第一个损失是$\ln 24 = 3.18$，符合预期。训练损失在批次之间围绕$1.5$–$1.6$波动，因为每个批次都是$256$个二元组的不同随机样本；而验证损失在第$25$步附近到达最小值$2.48$，随后一路上升：到第$300$步，模型已经从这个$360$字符的文本中看过$76{,}800$个目标，超过$200$个轮次（epoch），正在把它背下来——这是[[pretraining/data-mixtures#sec-epochs]]讨论的重复的极端情形。梯度范数从未超过$1$，所以裁剪在这里从未触发；大型运行中裁剪主要在尖峰期间起作用。恢复的运行逐位相同，因为检查点里有优化器矩、步数计数器（它决定学习率与 Adam 的偏差修正）以及数据采样器的状态；缺其中任何一项，两次运行就会分道扬镳。

::: history
大批量同步数据并行因 Goyal 等（2017）而变得可行——他们用线性学习率缩放与预热在一小时内训练了一个图像模型。Shoeybi 等（2019）引入 Megatron-LM 的张量并行，Huang 等（2019）带来 GPipe 的流水线并行；Narayanan 等（2021）把它们与数据并行组合，训练出万亿参数的模型。Rajbhandari 等（2020）提出 ZeRO（在 DeepSpeed 中实现），PyTorch 的 FSDP（Zhao 等，2023）把同样的分片带进主流框架。Chen 等（2016）提出激活检查点。Kaplan 等（2020）普及了$6ND$的训练算力估计，Chowdhery 等（2022）在 PaLM 报告中定义了 MFU，Hoffmann 等（2022）研究了余弦调度与运行长度的匹配；Hu 等（2024）随 MiniCPM 引入 WSD 调度。Young（1974）早在神经网络需要它之前，就算出了长计算的最优检查点间隔。
:::

::: summary
- 一步处理$B\cdot T$个词元，$B = b_{\text{micro}}\cdot A\cdot n_{\text{DP}}$；文档被打包成定长行；一次运行需要$D/(BT)$步，通常是数十万步、每批数百万词元。
- 训练花费$C\approx6ND$ FLOPs：前向每词元$2N$、反向为其两倍，另有相对大小约$T/(12d)$的注意力项。
- **MFU** 是模型 FLOPs 每秒除以峰值；训练时间为$6ND/(n_{\text{dev}}FU)$，大型运行报告的 MFU 约$30$–$55\%$。
- AdamW（$\beta_2 = 0.95$、权重衰减$0.1$、裁剪于$1$）配**预热**与**余弦**或 **WSD** 衰减是标准配方；WSD 允许从任意检查点分出衰减段。
- 混合精度 Adam 需要**每参数 16 字节**；**数据、张量与流水线并行**分担工作（流水线气泡$(p-1)/(m+p-1)$），**ZeRO/FSDP** 把状态分片到每设备$16N/n_{\text{DP}}$字节；激活检查点用算力换激活显存。
- **检查点**必须保存精确恢复所需的一切；故障平均间隔$M$小时、保存耗时$\delta$时，最佳间隔约为$\sqrt{2\delta M}$，这促使大型运行采用快速的异步保存。
:::

## 习题

::: exercise 每批词元数 {level=1 check="2097152"}
一个批次装$512$条$4096$词元的序列。一共有多少词元？
::: solution
$512\cdot4096 = 2{,}097{,}152$，约$210$万词元。
:::
:::

::: exercise 训练算力 {level=1 check="3.15e23"}
用$C = 6ND$，在$7500$亿词元上训练一个$700$亿参数的模型需要多少 FLOPs？保留三位有效数字。
::: solution
$6\cdot7\times10^{10}\cdot7.5\times10^{11} = 3.15\times10^{23}$ FLOPs。
:::
:::

::: exercise 流水线气泡 {level=1 check="0.2"}
$p = 5$个阶段、$m = 16$个微批次的流水线，空闲时间占多大比例？
::: solution
$(p-1)/(m+p-1) = 4/20 = 0.2$，由[[#prop-bubble]]。
:::
:::

::: exercise MFU {level=2 check="0.45"}
一个$130$亿参数的模型在$1000$台峰值$10^{15}$ FLOP/s 的设备上以$5.77\times10^6$词元/秒训练。忽略注意力项，计算其 MFU（保留两位小数）。
::: solution
$6\cdot1.3\times10^{10}\cdot5.77\times10^6 = 4.50\times10^{17}$模型 FLOP/s，除以峰值$10^{18}$：MFU $= 0.45$。
:::
:::

::: exercise ZeRO-2 显存 {level=2 check="30.47"}
某模型有$N = 1.25\times10^{10}$个参数，在$n_{\text{DP}} = 32$台数据并行设备上训练。ZeRO-2 下每台设备持有多少 GB（$10^9$字节）训练状态？保留两位小数。
::: solution
$2N + 14N/32 = 25 + 5.46875 = 30.47$ GB。（不分片则为$16N = 200$ GB。）
:::
:::

::: exercise 步数与预热 {level=2}
一次$3$万亿词元的运行使用$600$万词元的批次和$2000$步的预热。需要多少步？预热花掉多少词元，占全程几分之几？GPT-3 的预热历时$3.75$亿词元；比较一下。
::: solution
$3\times10^{12}/6\times10^6 = 500{,}000$步。预热：$2000\cdot6\times10^6 = 1.2\times10^{10}$词元，占全程的$0.4\%$。GPT-3 的$3.75$亿词元约占其$3000$亿的$0.1\%$。两种情况下预热都很短；它的目的是度过最初的不稳定阶段，而不是塑造整个运行。
:::
:::

::: exercise 检查点间隔 {level=2 check="0.4"}
故障平均每$M = 8$小时发生一次，一次阻塞式检查点耗时$\delta = 0.01$小时。由[[#prop-young]]求最优间隔$\tau^\ast$（小时）与损失比例。
::: solution
$\tau^\ast = \sqrt{2\cdot0.01\cdot8} = \sqrt{0.16} = 0.4$小时（$24$分钟）；$f = \sqrt{2\cdot0.01/8} = 0.05$，即$5\%$的时间损失在保存与重算上。
:::
:::

::: exercise 注意力项 {level=2}
对$d = 8192$、$n_{\text{layer}} = 80$（$N\approx12n_{\text{layer}}d^2$）的模型，[[#eq-6nd]]的注意力项在什么上下文长度下等于$6N$的$25\%$？讨论这对长上下文预训练意味着什么。
::: solution
比值为$n_{\text{layer}}Td/N = T/(12d)$，在$T = 3d = 24{,}576$词元时等于$0.25$。$T = 8192$时该项增加$8\%$，$128$K 词元时增加$130\%$。因此长上下文训练只在运行的一小部分词元上进行（并配合避免显式构造$T\times T$打分矩阵的注意力内核，[[transformers/attention-complexity#sec-flash]]）；多数词元只在几千词元的上下文上处理（[[pretraining/continued-pretraining]]）。
:::
:::

::: exercise 全规约通信量 {level=3}
在$n$台设备的环形全规约中，每台设备发送与接收的量都是缓冲区大小的$2(n-1)/n$倍。对$70$亿参数模型、bfloat16 梯度的朴素数据并行，$n = 64$时每台设备每步发送多少字节？若每台设备的链路可持续$50$ GB/s、每步计算耗时$1.5$秒，能否靠与反向传播重叠把通信隐藏？ZeRO-3 如何改变通信量？
::: solution
缓冲区：$2\cdot7\times10^9 = 14$ GB。通信量：$2\cdot(63/64)\cdot14 = 27.6$ GB 每设备每步，耗时$27.6/50 = 0.55$秒。这少于$1.5$秒的计算；而且由于靠后层的梯度在反向传播早期就绪，可以在靠前层还在求导时按桶全规约已就绪的梯度，因此大部分可以被隐藏。ZeRO-3 用梯度的 reduce-scatter（通信量减半，$13.8$ GB）取代全规约，加上前向与反向中对权重的 all-gather（$2\cdot13.8$ GB），合计约$41$ GB，是原来的$1.5$倍——这就是只存$1/64$状态的代价。
:::
:::

::: exercise 由反向传播推出 6 {level=3}
对单个线性层$Y = XW$，$X\in\R^{n\times d_{\text{in}}}$、$W\in\R^{d_{\text{in}}\times d_{\text{out}}}$，计算前向乘积、$\bar X = \bar YW^\top$与$\bar W = X^\top\bar Y$的 FLOPs，并证明合计为$X$的每行每参数$6$个 FLOP。网络第一层的两个反向乘积中哪一个可以跳过？为什么这不会明显改变$6ND$？
::: solution
三个乘积各自的内维为$d_{\text{in}}$、$d_{\text{out}}$或$n$，各花费$2nd_{\text{in}}d_{\text{out}}$ FLOPs：前向$XW$（$n\times d_{\text{in}}$乘$d_{\text{in}}\times d_{\text{out}}$）、$\bar YW^\top$（$n\times d_{\text{out}}$乘$d_{\text{out}}\times d_{\text{in}}$）、$X^\top\bar Y$（$d_{\text{in}}\times n$乘$n\times d_{\text{out}}$）。合计$6nd_{\text{in}}d_{\text{out}}$，即每参数每行（词元）$6$个 FLOP。第一层不需要对输入的梯度——其输入是从表中查出的嵌入，其梯度由把$\bar X$分散写入得到，或者是数据——所以那里可以跳过$\bar X$。这为数百个矩阵中的一个省下$2nd_{\text{in}}d_{\text{out}}$，占$6ND$的比例可忽略。
:::
:::
