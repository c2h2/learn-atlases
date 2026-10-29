键值缓存最早在 [[transformers/efficient-attention#sec-kv]] 引入：生成期间，较早词元的键和值从不改变，于是被存下来重复使用，其大小为每词元$2Lh_{kv}d_kb$字节（[[transformers/efficient-attention#prop-kv-size]]）。那一章还展示了多查询注意力与分组查询注意力如何缩小缓存。本章从推理服务系统的视角看待缓存——把它视作加速器显存最大、也最动态的消费者——并介绍围绕它发展的技术：有缓存与无缓存解码的精确等价性、缓存如何与权重争夺显存、**多头潜在注意力**、**分页**存储、跨请求的**前缀缓存**，以及只保留部分缓存的近似**淘汰**策略。

核心量很简单。对推理服务系统而言，显存里放着两类东西：固定不变的权重，以及所有运行中请求的缓存——每个解码步每请求增长一个词元，请求结束即消失。系统同时能容纳多少请求——从而每秒产出多少词元——由每词元缓存耗费多少字节、显存浪费得有多小决定。

## 增量解码 {#sec-incremental}

::: definition 增量（带缓存）解码 {#def-incremental}
对每层$\ell$，序列在步$t$的**KV缓存**是矩阵对$K^{(\ell)}_{\le t}, V^{(\ell)}_{\le t}\in\mathbb{R}^{t\times h_{kv}d_k}$，其中保存着位置$1,\dots,t$的键和值。**增量解码**处理位置$t + 1$的新词元时，每层只计算这个新词元自己的查询、键和值，把键和值追加到缓存，并让新查询对整个缓存作注意力。
:::

::: proposition 带缓存的解码是精确的 {#prop-cache-exact}
在带因果注意力的仅解码 Transformer 中，位置$i$处每一层的隐藏状态只依赖于词元$x_1,\dots,x_i$。因此，位置$i$当时作为最新词元所算出的键和值，等于对$x_1,\dots,x_t$（任意$t\ge i$）做一次完整前向传播会算出的键和值；增量解码产生的下一词元分布，与每步重算整个前缀所得的分布完全相同。
:::

::: proof
对层数归纳。第$1$层在位置$i$的输入是$x_i$的嵌入加上位置$i$的位置信息，只是$x_i$与$i$的函数。假设第$\ell$层在每个位置$j$的输入只依赖于$x_{\le j}$。该层在位置$i$的输出，是它在$i$处的输入与在$i$处的注意力输出的逐位置函数（归一化、MLP、残差相加）；在因果掩码之下，位置$i$的注意力是对位置$j\le i$的加权求和，权重和值都由$j\le i$处的输入算出（[[transformers/multi-head-attention#prop-causal]]）。这些全都只依赖于$x_{\le i}$，归纳完成。位置$i$的键或值是该层输入在$i$处的线性映射，因此无论其后存在哪些词元，它都一模一样。
:::

有两点保留使它在实践中并非字面上成立。其一，在浮点运算下，一次处理$i$个词元的预填充内核与一次处理一个词元的解码内核可能以不同顺序求和、以不同方式舍入（[[inference/decoding-sampling#prop-fp]]）：两者在舍入误差意义下一致，而非逐位一致。其二，任何破坏因果性的东西都会破坏这个等价性——编码器模型里的双向注意力，或者序列变长后重新缩放较早位置的位置方案。

缓存换来的是算术量。没有缓存，步$t$要重新处理整个前缀，对一个含$N$个参数的模型约需$2Nt$个 FLOPs，生成$T$个词元共约$\sum_{t\le T}2Nt\approx NT^2$。有了缓存，每步约需$2N$加上注意力，总共$2NT$：节省约$T/2$倍，对一条$2000$词元的序列就是一千倍。代价是显存，这正是本章余下内容的主题。

## 缓存有多大？ {#sec-size}

::: proposition 一批请求的 KV缓存显存 {#prop-batch-kv}
一个有$L$层、$h_{kv}$个维数为$d_k$的键值头、每个数存$b$字节的模型，服务长度分别为$T_1,\dots,T_B$的$B$条序列，需要

$$
M_{\text{KV}} = 2\,L\,h_{kv}\,d_k\,b\sum_{i=1}^{B}T_i
$$ {#eq-kv-batch}

字节的缓存。设加速器显存共$M$字节、权重占$W$字节、其余缓冲（激活值、工作区）占$A$字节，则至多$\big\lfloor(M - W - A)/(2Lh_{kv}d_kb)\big\rfloor$个词元的缓存放得下，由所有运行中的序列共享。
:::

::: proof
每词元每层存一个键和一个值，各含$h_{kv}d_k$个数，即$2h_{kv}d_kb$字节；乘上$L$层；再对所有序列的所有词元求和。第二句是拿权重和缓冲之后剩下的显存除以每词元字节数。
:::

因子$2$数的是键和值；$L$与$h_{kv}d_k$是架构选择；$b$是存储格式，16 位数为$2$字节，缓存量化后可以只占$1$字节甚至更少（[[inference/quantisation]]）。词元的个数由服务负载决定，而且是所有运行中序列的总和，不是其中任何一条的长度。

::: example 显存之争：80 亿参数模型的缓存与权重 {#ex-kv-weights}
一个含$8\times10^9$参数的模型有$L = 32$层、$32$个查询头和$h_{kv} = 8$个维数$d_k = 128$的键值头，以 bfloat16 在显存$80$ GB 的加速器上服务。(a) 每词元多少字节的缓存？(b) 缓存词元总数达到多少时，缓存恰好等于权重？(c) 给激活值和工作区预留$4$ GB，能容纳多少条并发的$8192$词元序列？
::: solution
(a) $2\cdot32\cdot8\cdot128\cdot2 = 131{,}072$字节$= 128$ KiB 每词元。(b) 权重占$1.6\times10^{10}$字节；$1.6\times10^{10}/131{,}072\approx122{,}000$个词元——十五条$8192$词元的序列。(c) 剩下$80 - 16 - 4 = 60$ GB，$6\times10^{10}/131{,}072\approx457{,}800$个词元，而$457{,}800/8192 = 55.9$：$55$条序列。若用完整多头注意力（$h_{kv} = 32$）只有$13$条；用多查询注意力（$h_{kv} = 1$）则有$447$条。批量超过适中规模之后，主导显存的是缓存而非权重。
:::
:::

::: widget plot
f: 60e9/(16384*g*1000*x); 60e9/(16384*32*1000*x)
x: 1, 32
y: 0, 200
sliders: g=8:1:32:1
labels: grouped-query ($g$ key–value heads); full multi-head ($32$ heads)
caption: $60$ GB 缓存显存中能容纳的并发序列条数随序列长度（以千词元计）的变化，模型同 [[#ex-kv-weights]]（$32$层、头维$128$、bfloat16）。条数按$1/T$下降；把键值头个数除以$g$，条数就乘以$g$。长上下文很快就让每块设备只剩几席之位。
:::

缓存每一步还被完整地*读取*一遍。每条序列$8192$个词元、每词元读$128$ KiB，就是每条序列每步$1$ GiB；$55$条序列就是每步$55$ GiB，是权重读取量的三倍多。在长上下文与大批量下，解码时间由缓存带宽决定，其程度不亚于权重带宽（[[inference/batching-serving]]）。这就是缓存里省下的每一个字节都有双重回报的原因：既换来容量，又换来速度。

## 缩小每词元的缓存 {#sec-shrink}

缩小$2Lh_{kv}d_k$有三个架构杠杆：让键和值在头之间共享、把它们压缩、或者在层之间共享。它们在设计模型时决定（或通过下文的继续训练决定）；推理服务系统只能加以利用。

**多查询注意力**（multi-query attention，MQA；Shazeer，2019）只保留一个键头和一个值头，由所有查询头共享，$h_{kv} = 1$。**分组查询注意力**（grouped-query attention，GQA；Ainslie 等，2023）让每一组查询头共享一个键值头，$1 < h_{kv} < h$（[[transformers/efficient-attention#def-gqa]]）。Ainslie 等发现，只要少数几个分组的 GQA 就能以几乎等于 MQA 的速度逼近多头注意力的质量，并证明一个既有的多头检查点可以被**提升**（uptrain）为 GQA：把每组内的键头和值头取平均，再继续训练约$5\%$的原计算量即可。截至 2026 年，多数有公开文档的大型解码器都使用$8$个键值头或更少键值头的 GQA。

### 多头潜在注意力 {#sec-mla}

DeepSeek-V2（DeepSeek-AI，2024）引入了**多头潜在注意力**（multi-head latent attention，MLA），它每词元缓存一个低维潜向量，而不是每头的键和值。我们按论文原始表述介绍它。

::: definition 多头潜在注意力 {#def-mla}
设$\mathbf{h}_t\in\mathbb{R}^d$为位置$t$处某个注意力层的输入，该层有$n_h$个维数为$d_h$的头。MLA 计算**潜向量**$\mathbf{c}_t = W^{DKV}\mathbf{h}_t\in\mathbb{R}^{d_c}$，其中$d_c\ll n_hd_h$，并由它得到每个头$i$的键和值：

$$
\mathbf{k}^C_{t,i} = W^{UK}_i\mathbf{c}_t,\qquad \mathbf{v}_{t,i} = W^{UV}_i\mathbf{c}_t,\qquad W^{UK}_i, W^{UV}_i\in\mathbb{R}^{d_h\times d_c}.
$$

由于旋转位置嵌入（[[transformers/positional-encoding#def-rope]]）不能直接施加到$\mathbf{c}_t$上（否则下面的技巧就失效了），位置信息经由一个单独的**解耦**键$\mathbf{k}^R_t = \operatorname{RoPE}(W^{KR}\mathbf{h}_t)\in\mathbb{R}^{d_h^R}$进入，它由所有头共享，并拼接到每个头的键上；每个查询同样有内容部分和旋转部分。缓存只存$\mathbf{c}_t$和$\mathbf{k}^R_t$：每词元每层$d_c + d_h^R$个数。
:::

妙处在于：解码时根本不必施加那些上投影。

::: proposition 吸收上投影 {#prop-absorb}
对内容查询为$\mathbf{q}^C_{t,i}\in\mathbb{R}^{d_h}$的查询头$i$，它对位置$s$的内容打分为

$$
\mathbf{q}^{C\top}_{t,i}\,\mathbf{k}^C_{s,i} = \big(W^{UK\top}_i\mathbf{q}^C_{t,i}\big)^{\!\top}\mathbf{c}_s,
$$

而头$i$的注意力输出再接上输出投影中属于它的分块$W^O_i$，等于$W^O_iW^{UV}_i\sum_sa_{ts}\mathbf{c}_s$。因此打分和输出都可以直接由缓存的潜向量算出：把$W^{UK}_i$折进查询投影，把$W^{UV}_i$折进输出投影。
:::

::: proof
第一个恒等式就是矩阵乘法的结合律：$\mathbf{q}^\top(W\mathbf{c}) = (W^\top\mathbf{q})^\top\mathbf{c}$。对于输出，由线性性，$\sum_sa_{ts}\mathbf{v}_{s,i} = \sum_sa_{ts}W^{UV}_i\mathbf{c}_s = W^{UV}_i\sum_sa_{ts}\mathbf{c}_s$，再乘上$W^O_i$即得结论。倘若对键施加依赖位置的旋转$R_s$，打分就会变成$\mathbf{q}^\top R_s W^{UK}_i\mathbf{c}_s$（把查询也旋转后则为$\mathbf{q}^\top R_{s-t}W^{UK}_i\mathbf{c}_s$），$\mathbf{q}$与$\mathbf{c}_s$之间的矩阵将依赖于$s$，于是没有任何单一矩阵能被吸收；这就是要单独设旋转部分的原因。
:::

::: example 多头潜在注意力的缓存 {#ex-mla}
按论文，DeepSeek-V2 有$60$层、$n_h = 128$个维数$d_h = 128$的头、潜维$d_c = 512$、旋转键维$d_h^R = 64$。计算它 16 位精度下每词元的缓存，并与同形状的完整多头注意力和 GQA 比较。
::: solution
MLA：$(512 + 64)\cdot60\cdot2 = 69{,}120$字节$= 67.5$ KiB 每词元。$128$个头、头维$128$的完整 MHA：$2\cdot60\cdot128\cdot128\cdot2 = 3{,}932{,}160$字节$= 3.75$ MiB 每词元，多了$57$倍（MLA 只是它的$1.8\%$）。GQA 每词元每层存$2h_{kv}d_h = 256h_{kv}$个数，所以 MLA 的$576$相当于$h_{kv} = 2.25$的 GQA——缓存比两个分组的 GQA 的下一档还小，却保留了$128$个互不相同的键头和值头。论文报告其缓存比作者早期的稠密 67B 模型小$93.3\%$，在其消融实验里质量与 MHA 相当或更好；这一结论是否普遍成立，仍是正在研究的实证问题。
:::
:::

**跨层共享**是第三个杠杆，目前还在研究阶段、不是标准实践：跨层注意力（Brandon 等，2024）让相邻层共用一套键和值，在他们的实验中把缓存再次减半，而困惑度只略有损失。把滑动窗口层与全注意力层交错的模型（[[inference/long-context]]）则用另一种方式缩小缓存：为窗口层限定了必须存储的长度。

## 分页注意力 {#sec-paged}

2023 年以前，推理服务系统通常把每个请求的缓存存在一段连续区域里，并按该请求可能达到的最大长度预留——因为请求开始时并不知道它最终的长度。Kwon 等（2023）指出这种方案有三类浪费：**预留**（为尚未生成的词元占着的槽位）、**内部碎片**（为永远不会生成的词元占着的槽位，因为请求提前结束）和**外部碎片**（不同大小的区域之间的空隙）。他们测得，在所研究的系统中，真正存放词元状态的缓存内存只占约$20$–$40\%$。

他们的解法从操作系统借来了虚拟内存。

::: definition 分页 KV缓存 {#def-paged}
**分页** KV缓存把缓存显存划分成固定大小的**块**，每块存放$B_s$个连续词元（所有层，或按层）的键和值。每条序列有一张**块表**，把它的逻辑块$0, 1, 2,\dots$映射到内存中任意位置的物理块。只有当最后一块写满时才分配新的物理块，序列结束时块被归还给空闲表。注意力内核（**PagedAttention**）经由块表读取键和值。
:::

::: proposition 分页缓存的浪费 {#prop-paged-waste}
长度为$n$的序列占$\lceil n/B_s\rceil$块，因此浪费$B_s\lceil n/B_s\rceil - n\le B_s - 1$个槽位，此外别无浪费：不存在外部碎片，因为所有块都可以互换。若$n\bmod B_s$均匀分布，则期望浪费为每条序列$(B_s - 1)/2$个槽位。
:::

::: proof
块只在需要时才分配，所以一条序列的块除最后一块外都是满的，而最后一块至少含$n - B_s(\lceil n/B_s\rceil - 1)\ge1$个词元；空槽数为$B_s\lceil n/B_s\rceil - n\in\{0,\dots,B_s - 1\}$。任何空闲块都能服务任何序列，空闲内存绝不会因为它所在的位置而不可用。若余数$r = n\bmod B_s$在$\{0,\dots,B_s - 1\}$上均匀，则$r = 0$时浪费为$0$，否则为$B_s - r$，其均值为$\frac1{B_s}\sum_{r=1}^{B_s-1}(B_s - r) = \frac{B_s - 1}{2}$。
:::

取论文系统中的默认值$B_s = 16$时，每条序列至多浪费$15$个词元槽位；对几千词元的序列不足$1\%$。小块浪费更少，但让内核要拼凑许多小碎片；Kwon 等发现$16$到$32$的块大小在他们的硬件上是不错的折中。他们报告在相同延迟下吞吐量是对比的旧系统的$2$–$4$倍，提升几乎全部来自把更大的批量装进腾出来的显存。他们的开源系统 vLLM（2023）让分页成了常态；截至 2026 年，广泛使用的开源推理服务引擎都以页或块存放缓存。

分页还让**共享**变得廉价。物理块带有引用计数，两条序列可以把各自的逻辑块映射到同一个物理块。当从同一个提示抽取$n$个样本时，全部$n$张块表都指向提示的块；当某个样本要写入共享的、尚未写满的最后一块时，先复制该块（**写时复制**）。束搜索——它的各条假设共享很长的前缀——同样受益。

::: quiz
一个分页缓存以$32$个词元为一块。哪句话是对的？
- [ ] $1000$词元的请求浪费$1000\bmod32 = 8$个槽位
- [x] $1000$词元的请求浪费$24$个槽位
- [ ] 分页消除了所有浪费，所以块越大越好
- [ ] 分页要求每个请求的缓存在内存中连续
::: solution
$1000 = 31\cdot32 + 8$：请求填满$31$块和第$32$块里的$8$个槽，浪费$32 - 8 = 24$个槽位（[[#prop-paged-waste]]）。块越大每个请求浪费越多（至多$B_s - 1$）；分页的要点恰恰是一个请求的块可以放在任意位置。
:::
:::

## 前缀缓存 {#sec-prefix}

许多请求共享开头：一段很长的系统提示、一组少样本示例、被反复提问的同一篇文档，或者对话更早的轮次。[[#prop-cache-exact]]说前缀的键和值只依赖于前缀。因此它们可以只计算一次，供每个以完全相同的词元开头的请求复用。

::: definition 前缀缓存 {#def-prefix}
**前缀缓存**在已完成或运行中的请求不再需要其缓存之后，仍保留这些 KV 块，并按它们所编码的词元序列建立索引。新请求查找其提示的最长已缓存前缀（以块为粒度），把这些块映射进自己的块表，只对剩余词元做预填充。需要内存时块被淘汰，通常按最久未用优先。
:::

常见的索引方案有两种。一种把每个完整块以*从序列开头直到该块末尾*的全部词元的哈希为键（哈希必须覆盖整个前缀，因为一个块的键依赖于它之前的一切）；查找时沿着提示的块逐块比对，直到第一次未命中。另一种是 SGLang 系统（Zheng 等，2024）中的 RadixAttention：它把已缓存的词元序列存放在一棵基数树里，树的边是词元串，沿树下行即可找到最长共享前缀，淘汰则删除最久未用的叶。

::: example 共享的系统提示 {#ex-prefix}
某应用发送的每个请求都带着同样的$1200$词元系统提示，后接平均$300$词元的用户消息。用$16$词元一块的前缀缓存，提示一旦缓存，预填充计算量省下多少？如果应用改为把时间戳放在系统提示的*开头*，省下的又是多少？
::: solution
$1200 = 75\cdot16$，所以系统提示的全部$75$块都能复用，每个请求只预填充自己那$300$个新词元：省下$1200/1500 = 80\%$的预填充词元（预填充 FLOPs 省得还要稍多，因为新词元对已缓存前缀的注意力开销仍在，但前缀内部的二次部分没有了）。若时间戳排在最前，第一个块就在各请求之间不同，而之后每个块的键都覆盖整个前缀，于是一无所获：省$0\%$。易变的内容应当放在提示的末尾。
:::
:::

前缀缓存既改变成本，也改变首词元时间。截至 2026 年，若干商用接口把它以“提示缓存”的名义提供给用户，已缓存的输入词元按优惠价计费；开源引擎默认开启或用开关启用。它的正确性建立在精确性（[[#prop-cache-exact]]）之上，因此缓存条目只对相同的模型权重、相同的适配器（对以多个微调适配器服务的模型，[[post-training/parameter-efficient-tuning]]）以及相同的位置偏移有效。

::: warning “前缀缓存会改变模型的输出”
不会——浮点舍入之外不会：由 [[#prop-cache-exact]]，复用的键和值正是该请求本来会算出的键和值。*确实*会改变输出的，是下一节的近似方法，它们丢弃或合并缓存条目。两者经常被混为一谈，因为都被称为“KV缓存优化”。对任何方法都要问一句：它计算的注意力是精确的吗？
:::

## 只保留部分缓存 {#sec-evict}

当一条长序列的缓存放不下、或者读它太慢时，系统可以只保留其中一部分。每种这样的方法都在近似注意力：查询再也无法注意被淘汰的词元。它们是研究方法，带有在特定模型和任务上发表的评测，不是完整缓存的通用替代品。

::: definition 滑动窗口、注意力汇聚点与重要词元淘汰 {#def-evict}
每种策略保留一个大小不超过预算$k$的缓存位置集合$S_t$，步$t$的注意力只在$S_t$上进行。

- **滑动窗口**：$S_t = \{t - k + 1,\dots,t\}$。
- **注意力汇聚点**（StreamingLLM；Xiao 等，2024）：$S_t$ = 最开头的$s$个位置（通常$s = 4$）加上最近的$k - s$个。
- **重要词元**（heavy hitters；H2O；Zhang 等，2023）：一个近期窗口，加上累积注意力权重（对已有的查询求和）最大的那些位置。
:::

Xiao 等的一个实证观察解释了为什么朴素的窗口会失败。训练好的模型会在许多头和层上，把很大一部分注意力放在最初的几个词元上，无论那些词元是什么。他们的解释是：softmax 迫使每个查询的权重总和为$1$；当一个头没有值得注意的东西时，它需要一个无害的地方安放这份权重，而最初的词元——从训练一开始就被每个查询看到——就成了这个**汇聚点**。把它们淘汰掉——滑动窗口迟早会如此——剩下的权重就被重新归一化到本不该得到它们的词元上；作者观察到，最初的词元一离开窗口，困惑度便急剧上升。在他们的实验中，保留最初的$4$个词元加上一个近期窗口，能让困惑度在多达$400$万词元的输入流上保持稳定，其中缓存词元的位置编号按其在缓存中的次序、而非在原文中的次序赋予。他们还发现，训练时在开头放一个专门的可学习汇聚词元，单个汇聚点就够用了。

::: example 长流的有界缓存 {#ex-stream}
[[#ex-kv-weights]]的模型（每词元$128$ KiB）运行一场已达$100{,}000$词元的对话。比较完整注意力的缓存、保留$4$个汇聚词元和一个$4092$词元窗口的 StreamingLLM 的缓存，以及每个生成词元所需的注意力读取量。
::: solution
完整注意力：$100{,}000\cdot128$ KiB$= 12.2$ GiB，每步全部读取，且每词元增长$128$ KiB。StreamingLLM：$4096\cdot128$ KiB$= 512$ MiB，永远固定——显存少$24$倍，每步的缓存读取也少$24$倍，每步的代价不再增长。但对$50{,}000$词元之前说过的内容提问，只有当答案仍在那保留的$4096$个词元之内时才答得上来；否则模型根本无从接触它。
:::
:::

要记住的要点是 StreamingLLM *不*做什么：它并不能让模型利用窗口之外的旧信息。它换来的是生成的稳定，不是长程的记忆。重要词元方法还想留住有信息量的旧词元，用注意力分数充当重要性的代理；H2O 报告在所评测的任务上只保留$20\%$的缓存而质量损失很小，后来的方法如 SnapKV（Li 等，2024）则根据提示末尾观察到的注意力模式来挑选条目。两条告诫适用于所有这类方法：将来才会重要的词元（直到最后才被问到的那个事实）在此之前可能得不到多少注意力；而按分数选择需要注意力权重，FlashAttention 这类融合内核并不返回它们（[[transformers/attention-complexity#sec-flash]]）。那些把单条相关信息埋进长上下文深处的测试（[[inference/long-context]]），正是为了暴露这种失败。

系统也会把缓存移走而不是丢弃：**卸载**（offloading）把冷的块（闲置的对话、缓存的前缀）放进主机内存或快速存储，需要时再复制回来，用传输时间换容量；把缓存量化到$8$位或$4$位（[[inference/quantisation]]），则把本章的每一个数字减半或减到四分之一。

## 实现 {#sec-code}

第一段清单用纯 Python 搭一个注意力层，把$12$个词元解码两遍——每步重算前缀，以及带缓存——然后检验缓存大小公式、为$200$个请求模拟连续分配与分页分配，并在$50$个共享$600$词元系统提示的请求上运行一个按块哈希的前缀缓存。

```python
import math, random
rng = random.Random(0)
d, T = 8, 12                                         # 宽度、序列长度
def mat(r, c): return [[rng.gauss(0, 1 / math.sqrt(r)) for _ in range(c)] for _ in range(r)]
def vecmat(x, W): return [sum(x[i] * W[i][j] for i in range(len(x))) for j in range(len(W[0]))]
Wq, Wk, Wv = mat(d, d), mat(d, d), mat(d, d)
X = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(T)]    # (T, d) 词元状态

def attend(q, Ks, Vs):                               # 单个查询对已缓存的键值作注意力
    s = [sum(a * b for a, b in zip(q, k)) / math.sqrt(d) for k in Ks]
    m = max(s); w = [math.exp(v - m) for v in s]; z = sum(w)
    return [sum(w[j] * Vs[j][i] for j in range(len(Vs))) / z for i in range(d)]

# (1) 无缓存：每一步重算整个前缀的键和值
macs_nocache, out_nocache = 0, []
for t in range(T):
    Ks = [vecmat(x, Wk) for x in X[:t + 1]]; Vs = [vecmat(x, Wv) for x in X[:t + 1]]
    macs_nocache += 2 * (t + 1) * d * d + d * d
    out_nocache.append(attend(vecmat(X[t], Wq), Ks, Vs))
# (2) 带缓存：每步只算一个新键和一个值并追加
macs_cache, out_cache, Kc, Vc = 0, [], [], []
for t in range(T):
    Kc.append(vecmat(X[t], Wk)); Vc.append(vecmat(X[t], Wv)); macs_cache += 3 * d * d
    out_cache.append(attend(vecmat(X[t], Wq), Kc, Vc))
diff = max(abs(a - b) for r1, r2 in zip(out_nocache, out_cache) for a, b in zip(r1, r2))
print(f"max |difference| = {diff:.1e}; projection MACs: no cache {macs_nocache}, cache {macs_cache}")

# KV缓存大小：2 * L * h_kv * d_k * T * bytes
def kv_bytes(L, h_kv, d_k, T, b=2): return 2 * L * h_kv * d_k * T * b
for name, L, hkv, dk in [("MHA 32x32x128", 32, 32, 128), ("GQA 32x8x128", 32, 8, 128),
                         ("MQA 32x1x128", 32, 1, 128)]:
    print(f"{name}: {kv_bytes(L, hkv, dk, 1) // 1024} KiB/token, "
          f"{kv_bytes(L, hkv, dk, 32768) / 2**30:.1f} GiB at 32k tokens")
print("MLA (60 layers, 512+64 per token):", 60 * (512 + 64) * 2 / 1024, "KiB/token;",
      "MHA equivalent:", kv_bytes(60, 128, 128, 1) / 1024, "KiB/token")

# (3) 分页分配与连续分配缓存的对比，200 个请求
lengths = [rng.randint(50, 2000) for _ in range(200)]          # 最终长度，词元数
max_len = 2048
contig_reserved = len(lengths) * max_len
for bs in (1, 16, 128):
    pages = sum(-(-n // bs) for n in lengths)                  # 每个请求 ceil(n / bs) 页
    print(f"block {bs:3d}: used {sum(lengths)} slots, allocated {pages * bs}, "
          f"waste {100 * (pages * bs - sum(lengths)) / (pages * bs):.1f}%")
print(f"contiguous max_len reservation: waste {100 * (1 - sum(lengths) / contig_reserved):.1f}%")

# (4) 前缀缓存：以“从开头直到该块末尾（含）”全部词元的哈希为块键
def block_keys(tokens, bs):
    return [hash(tuple(tokens[:i + bs])) for i in range(0, len(tokens) - len(tokens) % bs, bs)]
system = [rng.randrange(32000) for _ in range(600)]            # 共享的 600 词元系统提示
cache, hits = set(), 0
for r in range(50):
    prompt = system + [rng.randrange(32000) for _ in range(rng.randint(20, 200))]
    keys = block_keys(prompt, 16)
    for k in keys:
        if k in cache: hits += 1
        else: break                                             # 第一次未命中即终结共享前缀
    cache.update(keys)
print(f"prefix cache: {hits} of {50 * (600 // 16)} system-prompt blocks reused "
      f"({hits * 16} tokens of prefill skipped)")
```

Output:

```
max |difference| = 0.0e+00; projection MACs: no cache 10752, cache 2304
MHA 32x32x128: 512 KiB/token, 16.0 GiB at 32k tokens
GQA 32x8x128: 128 KiB/token, 4.0 GiB at 32k tokens
MQA 32x1x128: 16 KiB/token, 0.5 GiB at 32k tokens
MLA (60 layers, 512+64 per token): 67.5 KiB/token; MHA equivalent: 3840.0 KiB/token
block   1: used 206093 slots, allocated 206093, waste 0.0%
block  16: used 206093 slots, allocated 207616, waste 0.7%
block 128: used 206093 slots, allocated 218752, waste 5.8%
contiguous max_len reservation: waste 49.7%
prefix cache: 1813 of 1850 system-prompt blocks reused (29008 tokens of prefill skipped)
```

带缓存与不带缓存的输出完全一致（这里甚至逐位一致，因为两条路径以同样的顺序做同样的算术），而投影的代价从$10{,}752$次乘加降到$2304$次；差距随$T$线性增长。$16$词元的块只浪费$0.7\%$的缓存，接近[[#prop-paged-waste]]算出的每请求$7.5$个槽位（$200\cdot7.5 = 1500$，实测$1523$）；而按最大长度预留的连续方案浪费了一半。第一个请求之后的每个请求都复用系统提示的全部$37$个满块；最后$8$个提示词元落在与用户文本共享的块里，要重新计算。

第二段清单在合成数据上演示注意力汇聚点：位置$0$处放一个与查询公共方向对齐的键、配上零值，正如 Xiao 等对训练好模型的描述。它在$64$词元预算下比较带与不带汇聚点的注意力输出，并与$1000$个位置上的完整注意力对照。

```python
import math, random
rng = random.Random(0)
def attn(q, Ks, Vs, keep):                 # 只在保留位置上的注意力
    s = [sum(a * b for a, b in zip(q, Ks[j])) for j in keep]
    m = max(s); w = [math.exp(v - m) for v in s]; z = sum(w)
    return [sum(w[i] * Vs[j][c] for i, j in enumerate(keep)) / z for c in range(len(Vs[0]))], w[0] / z
n, dd = 1000, 16
mu = [0.6] * dd                                               # 查询共享一个公共方向
Ks = [[rng.gauss(0, 0.3) for _ in range(dd)] for _ in range(n)]
Vs = [[rng.gauss(0, 1) for _ in range(dd)] for _ in range(n)]
Ks[0] = [0.8] * dd; Vs[0] = [0.0] * dd                        # 词元 0：汇聚点，键对齐、值为零
policies = {"recent 64": list(range(n - 64, n)),
            "sink + recent 63": [0] + list(range(n - 63, n))}
err = {k: 0.0 for k in policies}; ratio = {k: 0.0 for k in policies}; sinkw = 0.0
for trial in range(100):
    q = [m + rng.gauss(0, 0.5) for m in mu]
    full, w0 = attn(q, Ks, Vs, range(n)); sinkw += w0 / 100
    norm = math.sqrt(sum(x * x for x in full))
    for k, keep in policies.items():
        approx, _ = attn(q, Ks, Vs, keep)
        err[k] += math.sqrt(sum((a - b) ** 2 for a, b in zip(full, approx))) / norm / 100
        ratio[k] += math.sqrt(sum(x * x for x in approx)) / norm / 100
print(f"attention on the sink in full attention: {sinkw:.2f}")
for k in policies: print(f"{k:17s} relative error {err[k]:.2f}, output norm / full norm {ratio[k]:.2f}")
```

Output:

```
attention on the sink in full attention: 0.56
recent 64         relative error 20.71, output norm / full norm 20.90
sink + recent 63  relative error 1.12, output norm / full norm 0.65
```

完整注意力把$56\%$的权重放在了汇聚点上。把它扔掉，这整份权重就被重新归一化到$64$个近期词元上，输出大约大了$21$倍——正是这种分布偏移，一层层累积，让训练好的模型的困惑度爆掉。保留汇聚点让输出保持在正确的尺度上，但它的相对误差仍约为$1$：被淘汰的$936$个词元的内容已经没了。这就是对 StreamingLLM 诚实的总结——是稳定，不是记忆。

::: history
缓存键和值与自回归 Transformer 解码同龄；2017–2019 年的 Tensor2Tensor 与 fairseq 原始实现就做了这件事。Shazeer（2019）提出多查询注意力，正是为了降低增量解码的显存带宽；Pope 等（2022）分析超大模型的推理，展示了它如何换来长上下文与大批量。Ainslie、Lee-Thorp、de Jong、Zemlyanskiy、Lebrón 与 Sanghai 提出了分组查询注意力与 uptraining（EMNLP 2023）。Kwon、Li、Zhuang、Sheng、Zheng、Yu、Gonzalez、Zhang 与 Stoica 提出了 PagedAttention 与 vLLM（SOSP 2023）。Zheng 等人的 SGLang（2024）用基数树组织前缀复用。Zhang 等人的 H2O（NeurIPS 2023）以及 Xiao、Tian、Chen、Han 与 Lewis 的 StreamingLLM（ICLR 2024）开启了淘汰缓存条目这条研究线。DeepSeek-AI 的 DeepSeek-V2（2024）引入了多头潜在注意力。
:::

::: summary
- 在因果注意力下，位置$i$的键和值只依赖于$x_{\le i}$，所以**带缓存的解码是精确的**，并在算术量上省下约$T/2$倍。
- 一批请求的缓存为$2Lh_{kv}d_kb\sum_iT_i$字节。词元数超过适中规模后它就超过权重，并封顶了并发请求的数量。
- **MQA 与 GQA** 共享键值头；**MLA** 每词元每层缓存$d_c + d_h^R$个数的潜向量，并把上投影吸收进查询投影和输出投影；RoPE 由一个单独的共享旋转键处理。
- **分页**缓存通过块表分配定长块，每请求浪费不足$B_s$个槽位，并支持写时复制的共享。
- **前缀缓存**复用共享提示前缀的精确键和值；只有逐字相同的前缀才能命中，所以易变的文本要放在末尾。
- **淘汰**（滑动窗口、注意力汇聚点、重要词元）是对注意力的近似。注意力汇聚点让长输入流保持稳定，但没有任何淘汰策略能留住它已淘汰的信息。
:::

## 习题

::: exercise 每词元的缓存 {level=1 check="160"}
一个模型有$40$层、$8$个维数为$128$的键值头，缓存以 16 位精度存储。一个词元需要多少 KiB 的缓存？
::: solution
$2\cdot40\cdot8\cdot128\cdot2 = 163{,}840$字节$= 160$ KiB。
:::
:::

::: exercise 分页缓存的浪费 {level=1 check="8"}
块大小为$16$个词元时，一条$1000$词元的序列浪费多少个槽位？
::: solution
$\lceil1000/16\rceil = 63$块共$1008$个槽位；$1008 - 1000 = 8$个是空的。
:::
:::

::: exercise 等效的分组数 {level=1 check="2.25"}
某个 MLA 层每词元缓存$d_c = 512$个潜数和$d_h^R = 64$个旋转数。一个头维为$128$的 GQA 层每词元缓存$2\cdot128\cdot h_{kv}$个数。$h_{kv}$取何值时两者缓存相等？
::: solution
由$576 = 256h_{kv}$得$h_{kv} = 2.25$。
:::
:::

::: exercise 并发序列数 {level=2 check="59"}
装入权重并预留缓冲后，一个每词元需要$160$ KiB（$163{,}840$字节）缓存的模型还剩$40$ GB（$4\times10^{10}$字节）显存给缓存。能同时容纳多少条$4096$词元的序列？
::: solution
每条序列需要$163{,}840\cdot4096 = 6.71\times10^8$字节。$4\times10^{10}/6.71\times10^8 = 59.6$，故可容纳$59$条序列。
:::
:::

::: exercise 样本之间共享提示 {level=2 check="2.5"}
从同一个$2000$词元的提示抽取$4$个样本，每个生成$500$个词元。忽略块的粒度，与四份独立拷贝相比，带共享提示块的分页缓存把缓存显存缩小到几分之一（缩小倍数为多少）？
::: solution
独立拷贝：$4\cdot2500 = 10{,}000$个词元。共享：$2000 + 4\cdot500 = 4000$个词元（每个样本至多另有一个被复制的未满块）。倍数为$10{,}000/4000 = 2.5$。
:::
:::

::: exercise 前缀缓存的节省 {level=2 check="0.8"}
每个请求都有$1200$词元的共享前缀和$300$个自己的词元；块可容纳$16$个词元。前缀一旦缓存，多大比例的提示词元不再需要预填充？
::: solution
$1200$是$16$的倍数，整个前缀都能复用：$1200/1500 = 0.8$的提示词元（[[#ex-prefix]]）。若前缀是$1210$词元，最后$10$个会与请求各自的文本挤在同一块里，必须重新计算。
:::
:::

::: exercise 缓存省下的算术量 {level=2}
证明：从空提示生成$T$个词元，无缓存时权重矩阵约花费$NT^2$个 FLOPs，带缓存则是$2NT$；并证明注意力的算术量无缓存约为$\tfrac23LdT^3$，带缓存为$2LdT^2$。
::: solution
无缓存时步$t$要在$t$个词元上做一次完整前向传播：权重 FLOPs 为$2Nt$，注意力 FLOPs 为$2Ldt^2$（[[inference/decoding-sampling#prop-phases]]）。求和得$\sum_{t=1}^T2Nt = NT(T + 1)\approx NT^2$、$\sum_{t=1}^T2Ldt^2\approx\tfrac23LdT^3$。带缓存时步$t$花费$2N + 4Ldt$，求和为$2NT + 2LdT(T + 1)\approx2NT + 2LdT^2$。权重 FLOPs 之比为$T/2$；注意力 FLOPs 之比为$T/3$。
:::
:::

::: exercise 为什么 MLA 需要解耦的旋转键 {level=3}
设 RoPE 施加在 MLA 的键上，$\mathbf{k}_{s,i} = R_sW^{UK}_i\mathbf{c}_s$，也施加在查询上，$\tilde{\mathbf{q}}_{t,i} = R_t\mathbf{q}_{t,i}$，其中$R_p$是位置$p$的分块对角旋转。证明打分等于$\mathbf{q}^\top_{t,i}R_{s-t}W^{UK}_i\mathbf{c}_s$，解释为什么这妨碍了吸收，并计算解耦设计相比只存$\mathbf{c}_s$每词元多缓存多少个数。
::: solution
旋转满足$R_t^\top R_s = R_{s-t}$（它们是可交换的、角度与位置成正比的旋转，[[transformers/positional-encoding#prop-rope]]）。于是$\tilde{\mathbf{q}}^\top\mathbf{k} = \mathbf{q}^\top R_t^\top R_sW^{UK}_i\mathbf{c}_s = \mathbf{q}^\top R_{s-t}W^{UK}_i\mathbf{c}_s$。吸收要求存在固定矩阵$M_i$，使打分对所有$s$都等于$(M_i^\top\mathbf{q})^\top\mathbf{c}_s$；而这里矩阵$R_{s-t}W^{UK}_i$随偏移$s - t$改变，所以每步都得对每个缓存位置重算完整的键$R_sW^{UK}_i\mathbf{c}_s$，或者把它们存下来——节省就没了。解耦设计每词元每层多缓存一个共享旋转键，$d_h^R = 64$个数，相当于在$512$个数的潜向量之上再加$12.5\%$。
:::
:::

::: exercise 长尾长度下的期望浪费 {level=3}
请求长度在$\{1,\dots,4096\}$上均匀分布。计算被分配的缓存槽位的期望浪费比例：(a) 连续预留、每请求预留$4096$个槽位；(b) 分页、$B_s = 16$。然后解释为什么分页还让调度器在不知道请求最终长度的情况下准入更多请求。
::: solution
(a) 期望长度$(4096 + 1)/2 = 2048.5$，期望已用比例为$2048.5/4096 = 0.5001$，约$50\%$被浪费。(b) 由于$4096$是$16$的倍数，$n\bmod16$恰好均匀，期望浪费为$7.5$个槽位（[[#prop-paged-waste]]）；期望分配为$2048.5 + 7.5 = 2056$个槽位，浪费比例$7.5/2056 = 0.36\%$。因为分页系统是随请求增长而分配的，它可以按请求*此刻*占用的内存来准入；内存吃紧时它抢占一个请求——释放它的块，稍后重算或换回——而不必事先为每个请求预留最坏情形的量。
:::
:::

::: exercise 重要词元策略 {level=3}
给第二段清单加上一个 H2O 风格的策略：保留$32$个位置的近期窗口，加上更老位置中在当前查询下注意力权重最大的$32$个。运行它，并把相对误差和范数比与清单里的两个策略比较。为什么用*当前*查询的权重来挑选，相比真实系统所能做到的是一种乐观？
::: solution
```python
def h2o(q, Ks, Vs, recent=32, heavy=32):
    s = [sum(a * b for a, b in zip(q, k)) for k in Ks]
    old = sorted(range(len(Ks) - recent), key=lambda j: -s[j])[:heavy]
    return sorted(old) + list(range(len(Ks) - recent, len(Ks)))
```
在试验循环开头加上 `policies["heavy 32 + recent 32"] = h2o(q, Ks, Vs)`（并在 `err` 和 `ratio` 里为它补上条目）。用同一种子，输出会多出这一行

```
heavy 32 + recent 32 relative error 1.00, output norm / full norm 1.31
```

汇聚点是最重的“重击者”，总被保留，所以输出大致保持正确的尺度；但误差并不比汇聚点加窗口更好。在这份合成数据里，$999$个普通键都是随机的，汇聚点之外的注意力权重几乎均匀摊开，没有任何一小撮老词元承载其中的大部分：没有重要词元可找。重要词元方法的有效性取决于训练好的模型把注意力集中到少数词元上，H2O 对它研究的模型给出了实证。这个实验还有另一重乐观：它用*当前*查询挑选，而真实系统必须在未来的查询已知*之前*淘汰，只能用过去查询累积下来的注意力。一个至今被冷落的词元，可能恰恰是后来那个问题所需要的。
:::
:::
