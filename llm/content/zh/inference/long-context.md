语言模型的上下文窗口从2020年的$2048$个词元增长到$2024$–$2025$年若干模型家族的$10^5$–$10^6$个词元。长上下文让模型能在一次提示中读完一个代码库、一份合同或一本书。它也改变了推理的成本：注意力的算术量随提示长度的平方增长，KV缓存随其长度增长，而两者最终都会压过权重。而且，窗口长并不等于模型*用得好*它。

本章从四个角度看待长上下文推理。**成本**：在预填充与解码中，二次项分别在何处超过线性项。**规模化下的精确注意力**：FlashAttention 的分块与在线 softmax，用纯 Python 推导并实现；解码用的**拆键**（split-key）形式；以及把一条序列铺到多块设备上的**环形注意力**（ring attention）。**近似注意力**：滑动窗口，以及交错局部层与全局层的模型。**评测与替代方案**："大海捞针"式测试与 RULER 风格的基准测到了什么、漏掉了什么，以及何时检索比长上下文更值当。模型如何被*训练*去接受更长位置——位置插值、NTK 感知缩放、YaRN——在[[pretraining/continued-pretraining#sec-context]]中讲过，此处不复述。

## 长上下文的代价 {#sec-cost}

由[[inference/decoding-sampling#prop-phases]]，一个含$N$个参数、$L$层、宽度为$d$的稠密模型，预填充$P$个词元约花$2NP + 2LdP^2$个 FLOPs，在上下文为$t$时每个解码步约花$2N + 4Ldt$个 FLOPs。

::: proposition 注意力何时反超 {#prop-crossover-len}
预填充中，注意力 FLOPs 在提示长度$P^* = N/(Ld)$处追平权重 FLOPs；解码中，在上下文$t^* = N/(2Ld)$处追平。对$N\approx12Ld^2$的模型（Transformer 块的常见参数量，[[transformers/attention-complexity#sec-flops]]），$P^*\approx12d$、$t^*\approx6d$。
:::

::: proof
预填充：由$2LdP^2 = 2NP$得$P = N/(Ld)$。解码：由$4Ldt = 2N$得$t = N/(2Ld)$。代入$N = 12Ld^2$得$12d$与$6d$。
:::

对一个$8\times10^9$参数、$L = 32$、$d = 4096$的模型（此时$N/(Ld) = 61{,}000$），在$8$千词元处注意力只占预填充算术的少数，超过约$61$千词元后成为多数。显存遵循同样的规律：一条序列的缓存每词元增长$2Lh_{kv}d_kb$字节（[[inference/kv-cache#prop-batch-kv]]），而且由于每一步都要整个读一遍，在长上下文时它超过权重，成为解码内存流量的大头。

::: example 一条128k词元的提示 {#ex-128k}
对上面的模型（$N = 8\times10^9$、$L = 32$、$d = 4096$、$8$个维数为$128$的键值头、bfloat16），估算在实得$593$ TFLOP/s 下预填充一条$131{,}072$词元提示所需的 FLOPs 与时间，以及之后在实得$2.68$ TB/s 下单个解码步的时间。
::: solution
预填充：权重$2NP = 2.10\times10^{15}$，注意力$2LdP^2 = 2\cdot32\cdot4096\cdot131{,}072^2 = 4.50\times10^{15}$，总计$6.60\times10^{15}$个 FLOPs，其中$68\%$来自注意力：$11.1$ s。解码：缓存为$131{,}072\cdot131{,}072$字节$= 17.2$ GB，超过了权重的$16$ GB；两者都读一遍要$(16 + 17.2)\times10^9/2.68\times10^{12} = 12.4$ ms 每词元，是短上下文步长的两倍。每步的注意力算术量$4Ldt = 6.9\times10^{10}$个 FLOPs，是权重$1.6\times10^{10}$的四倍，但对应的计算时间仍远追不上内存读取所需的时间。第二个请求若带着同一条长提示，缓存流量翻倍；批处理摊薄不了它（[[inference/batching-serving#prop-attn-intensity]]）。
:::
:::

::: widget plot
f: x/(61035 + x); 2*x/(61035 + 2*x)
x: 0, 262144
y: 0, 1
labels: share of prefill FLOPs in attention; share of decode FLOPs in attention
vlines: 61035; 30518
caption: 注意力占 FLOPs 的比例，随提示长度$P$（预填充，$LdP/(N + LdP)$）或上下文长度$t$（解码，$2Ldt/(N + 2Ldt)$）的变化，取$N = 8\times10^9$、$L = 32$、$d = 4096$。虚线标出[[#prop-crossover-len]]中的交叉点$N/(Ld)$与$N/(2Ld)$。越过它们，注意力就成了主要开销，而它在预填充中的二次增长决定了长文档的首词元时间。
:::

## 精确注意力，逐块进行 {#sec-flash}

标准注意力会构造$T\times T$的分数矩阵，把它写进内存，为 softmax 再读回来，写出概率，再读一遍。$T = 131{,}072$时，这个矩阵每头有$1.7\times10^{10}$个条目——16 位精度下$34$ GB——根本存不下；即使存得下，搬动它也会很慢。**FlashAttention**（Dao 等，2022）从不存储这个矩阵就能算出精确注意力：把键分块处理，维护滚动统计量。[[transformers/attention-complexity#sec-flash]]介绍过它；这里我们把它推导成一个同时给出解码变体与多设备变体的形式。

::: definition 部分注意力状态 {#def-partial}
设查询为$\mathbf{q}$，$S$为键值位置的一个集合，分数$s_j = \mathbf{q}^\top\mathbf{k}_j/\sqrt{d_k}$。$S$的**部分状态**是三元组

$$
\sigma(S) = \big(m_S,\ \ell_S,\ \mathbf{o}_S\big),\qquad m_S = \max_{j\in S}s_j,\quad\ell_S = \sum_{j\in S}e^{s_j - m_S},\quad\mathbf{o}_S = \sum_{j\in S}e^{s_j - m_S}\,\mathbf{v}_j.
$$

在$S$上的注意力输出为$\mathbf{o}_S/\ell_S$。
:::

::: proposition 合并部分状态 {#prop-merge}
对不相交的集合$A$与$B$，记$m = \max(m_A, m_B)$，

$$
\sigma(A\cup B) = \Big(m,\ \ \ell_Ae^{m_A - m} + \ell_Be^{m_B - m},\ \ \mathbf{o}_Ae^{m_A - m} + \mathbf{o}_Be^{m_B - m}\Big) =: \sigma(A)\oplus\sigma(B).
$$ {#eq-merge}

运算$\oplus$满足结合律与交换律。因此，把一个任意划分下各部分的状态以任意顺序、任意方式结合，都能得到精确的注意力输出；在线 softmax（[[transformers/attention-complexity#prop-online]]）就是把键块一个一个并进运行状态的特例。
:::

::: proof
$m_{A\cup B} = \max(m_A, m_B) = m$。对和式，$\ell_{A\cup B} = \sum_{j\in A}e^{s_j - m} + \sum_{j\in B}e^{s_j - m}$，而$\sum_{j\in A}e^{s_j - m} = e^{m_A - m}\sum_{j\in A}e^{s_j - m_A} = e^{m_A - m}\ell_A$，对$B$与$\mathbf{o}$同理。交换律由对称的公式一目了然。结合律：注意$\sigma(A)\oplus\sigma(B)$等于$\sigma(A\cup B)$，只依赖于集合$A\cup B$；于是$(\sigma(A)\oplus\sigma(B))\oplus\sigma(C) = \sigma(A\cup B\cup C) = \sigma(A)\oplus(\sigma(B)\oplus\sigma(C))$。（空集的状态是$(-\infty, 0, \mathbf{0})$，其中$e^{-\infty} = 0$，它正是单位元。）
:::

这一节的全部结论都由这一个恒等式而来。FlashAttention 把每个查询块放进片上快速内存，再把键块顺序地合并进运行状态。**拆键解码**（"Flash-Decoding"，Dao 等，2023）处理相反的形状——一个查询、一条很长的缓存——把不同的键块交给不同的处理器，并行算出它们的部分状态，再用一棵规约树合并；没有它，单个查询只能占用 GPU 的一小部分。**环形注意力**（下文）合并的是从其他设备到来的状态。

::: algorithm 带因果跳块的 FlashAttention 前向传播 {#alg-flash-causal}
1. 把查询切成每块$B_r$行的块，把键与值切成每块$B_c$行的块。
2. 对每个查询块$i$：把每一行的状态都初始化为$(-\infty, 0, \mathbf{0})$。
3. 对每个键块$j$：若块$j$里的每个键都排在块$i$里每个查询之后，**跳过**这一整块（全被掩码）。否则算出这一块的分数，把键位置大于查询位置的条目掩去，并按[[#eq-merge]]把这一块的部分状态合并进每一行的状态。
4. 为每一行写出$\mathbf{o}/\ell$；若反向传播会用到统计量$(m, \ell)$，还要把它们写出。
:::

::: example 手工合并两块 {#ex-merge}
某个查询对键值（标量）为$(2, 0)$的两个键的分数是$(1, 3)$，对键值为$(4, 8)$的两个键的分数是$(2, 0)$。分别算出每一块的部分状态，把它们合并，并与直接做 softmax 加权平均对照。
::: solution
块$A$：$m_A = 3$，$\ell_A = e^{-2} + e^0 = 1.1353$，$o_A = 2e^{-2} + 0 = 0.2707$。块$B$：$m_B = 2$，$\ell_B = 1 + e^{-2} = 1.1353$，$o_B = 4 + 8e^{-2} = 5.0827$。合并：$m = 3$，$B$的因子为$e^{2 - 3} = 0.3679$，于是$\ell = 1.1353 + 0.4177 = 1.5530$、$o = 0.2707 + 1.8698 = 2.1405$；输出$2.1405/1.5530 = 1.3783$。直接算：权重$\propto(e^1, e^3, e^2, e^0) = (2.718, 20.086, 7.389, 1)$，和为$31.193$；加权值$(2\cdot2.718 + 0 + 4\cdot7.389 + 8)/31.193 = 42.99/31.193 = 1.3783$。
:::
:::

FlashAttention 的算术量仍是$O(T^2d)$——加上因果跳块，约为完整平方的一半——但除输入之外的内存只是$O(Td)$，内存流量也少得多（[[transformers/attention-complexity#sec-flash]]）。它是数学上精确的；在浮点下，它与标准计算只差舍入误差，因为加法的顺序不同。

## 把一条序列铺到多块设备上 {#sec-ring}

对几十万词元的提示，即便有 FlashAttention，单块设备也可能太慢（预填充时间随$P^2$增长）或太小（装不下一条序列的激活值与缓存）。**上下文并行**把序列本身切到多块设备上。最有名的方案是**环形注意力**（ring attention；Liu、Zaharia 与 Abbeel，2024）。

::: definition 环形注意力 {#def-ring}
把序列切成$D$个连续块，一块一设备，设备$k$持有块$k$的查询、键与值。设备连成一个环。在$D$轮中的每一轮，每台设备对自己的查询在当前持有的键值块上算出部分注意力状态，合并进运行状态（[[#eq-merge]]），然后把这个键值块传给下一台设备，同时从上一台接回一块。$D$轮之后，每个查询块都见过每个键值块（在因果掩码下，则见过每个更早的块）。
:::

若传一块不比用它计算更慢，通信就被藏住。

::: proposition 环形注意力的通信隐藏条件 {#prop-ring}
设查询块与键块各有$c$个词元，$h$个查询头，$h_{kv}$个维数为$d_k$的键值头，每个数占$b$字节，实得算术速率为$\pi$、链路带宽为$\beta_{\text{link}}$。键值块的传输能被其上的计算完全掩盖，只要

$$
c\ \ge\ \frac{\pi\,h_{kv}\,b}{2\,h\,\beta_{\text{link}}}.
$$
:::

::: proof
每层上，一对块的计算量是$4c^2hd_k$个 FLOPs（$c$个查询对$c$个键打分并对$c$个值作加权和，$h$个头），耗时$4c^2hd_k/\pi$。传输一个块的键与值是$2ch_{kv}d_kb$字节，耗时$2ch_{kv}d_kb/\beta_{\text{link}}$。要求前者不小于后者，两边除以$2cd_k$得$2ch/\pi\ge h_{kv}b/\beta_{\text{link}}$，整理即得结论。
:::

这个条件只依赖于硬件之比$\pi/\beta_{\text{link}}$和分组查询注意力之比$h_{kv}/h$，与总长度无关，所以只要块有几两千词元，环就可以按需要扩到任意多台设备。Liu 等报告用这种方式在长达数百万词元的序列上做了训练与推理。加上因果掩码后负载不均——持第一块的设备几乎无事可做——实现里会重排块的次序来平衡。环形注意力是精确的：它就是分布在环上的 FlashAttention 合并。

## 长上下文的近似注意力 {#sec-window}

精确注意力的开销不会低于它要打分的（查询，键）对数。近似方案减少这个数目，但改变了模型；它们必须纳入训练，而不能在推理时临时打开。

**滑动窗口注意力**把每个查询限制在最近$w$个键上（[[transformers/efficient-attention#def-window]]）。它把缓存封顶在每层$w$个词元、解码开销封顶在每层$O(wd)$，而堆叠的窗口在原理上可回溯约$Lw$个词元（[[transformers/efficient-attention#prop-reach]]）——只是原理上，因为信息必须逐层经由中间位置接力传递。Mistral 7B（2023）在全部$32$层中都用$w = 4096$。

**交错**在大量滑动窗口层之间保留少数全局注意力层，让多数层廉价，同时保留精确的长程访问。Gemma 2（2024）按发表的设计让局部层（窗口$4096$）与全局层交替；Gemma 3（2025）每个全局层配五个局部层（窗口$1024$）。缓存随之几乎按局部层所占的比例缩小：

::: example 交错层布局模型的缓存 {#ex-interleave}
一个$48$层模型有$8$个维数为$128$的键值头、bfloat16，服务$131{,}072$词元的上下文。比较一条序列的缓存：全部层都是全局层；全部用$4096$的窗口；每个全局层配五个局部层（窗口$1024$）。
::: solution
每层每词元的缓存为$2\cdot8\cdot128\cdot2 = 4096$字节。全全局：$48\cdot131{,}072\cdot4096$字节$= 24$ GiB。全窗口：$48\cdot4096\cdot4096$字节$= 0.75$ GiB。交错：$8$个全局层存$131{,}072$个词元、$40$个局部层各存$1024$个：$(8\cdot131{,}072 + 40\cdot1024)\cdot4096$字节$= 4.16$ GiB，是全全局缓存的$17\%$，而六分之一的层仍能精确地看到整个上下文。
:::
:::

其他近似——把注意力汇聚点与近期窗口并用、重要词元淘汰（[[inference/kv-cache#sec-evict]]）、线性注意力与状态空间层（[[sequence-models/state-space-models]]）、把它们与少数注意力层混在一起的混合架构——都是用精确性换有界的内存。每种都有牺牲：一个词元一旦被淘汰或被压缩，模型之后就再也无法逐字把它取回，而这正是下一节的评测要考察的。

::: warning "百万词元的窗口意味着模型能用上一百万词元"
宣传的窗口是模型不出错接受的长度，通常是其最后训练阶段所用的最长长度。它是否*使用*窗口中任意位置的信息，是另一个经验问题。长上下文基准反复发现**有效**长度短于标称长度，性能取决于相关信息落在上下文的哪个位置，而当任务需要组合多处相距遥远的内容（而不是找到一处）时表现会退化。在依赖窗口之前，先在你的任务上测一测。
:::

## 评测长上下文 {#sec-eval}

最简单的测试是**大海捞针**（needle in a haystack）：在一篇很长的填充文档中选定的深度插入一条事实（"魔法数是 7341"），然后提问；扫描深度与总长度，把准确率画成网格。它在 2023 年开源社区评测商用模型时流行起来，暴露了真实的失败——早期长上下文模型在大长度与某些深度上准确率下降——截至 2026 年，它出现在许多模型报告中。它的弱点与其结果同样有教益。

- **它很容易。**针通常用词独特、与草堆毫无关联，模型靠词面匹配就能找到它；接近满分的分数变得常见，也就不再有区分力。
- **只有一条事实，没有推理。**真实任务需要多条事实、比较、聚合或跨文档的多步追踪。
- **没有干扰项。**真实文档里含有与答案近似重复的内容。

Liu 等（2024）用多文档问答表明准确率可以强烈依赖于位置：在他们测试的模型中，位于上下文开头或结尾的信息比中间的信息用得好得多（"迷失在中间"，lost in the middle），呈 U 形曲线。**RULER**（Hsieh 等，2024）把针测试推广成一个可配置的综合基准——多键、多值、带干扰针的检索；多跳变量追踪；高频词的聚合；以及带干扰段落的问题解答——并发现它所评测的多数模型早在达到其标称上下文长度之前就跌破了固定的性能阈值；它为每个模型报告了一个"有效长度"。

::: definition 有效上下文长度 {#def-effective}
对一个基准家族和一个性能阈值$\tau$，模型的**有效上下文长度**是满足"在不超过$T$的每个受测长度上得分都不低于$\tau$"的最大长度$T$。（RULER 用参考模型在短长度上的得分作阈值。）
:::

综合基准可控、不受数据污染、便宜；但它们也窄。结果依赖于填充文本、任务配比、提示模板与阈值；一个模型可能在综合检索上得分很高，却读不好一份长合同或对不上一个代码库。自然的长文档基准（书籍问答、摘要、仓库级代码任务）与之互补，但构造和评分都更贵（[[evaluation/benchmarks]]）。报告测试的长度分布、相关信息的所在位置，以及多次运行之间的方差（[[evaluation/evaluation-statistics]]）。

::: quiz
某模型在长达$10^6$词元的单针测试中，每个深度上都得$100\%$。这确立了什么？
- [ ] 它在任何任务上的有效上下文长度都是$10^6$词元
- [x] 它能在这种上下文的任意位置检索出一条独特的事实；对多事实推理或现实的干扰项则知之甚少
- [ ] 它在问答上不受"迷失在中间"效应的影响
- [ ] 它的注意力在整个上下文上是精确的
::: solution
单条独特的针只检验逐字检索。多键检索、聚合、多跳追踪与带干扰项的自然任务更难，RULER 式的测试常常为通过单针测试的模型测出短得多的有效长度。问答中的位置效应要靠另外的测量，而这个测试对注意力如何实现一无所知。
:::
:::

## 长上下文还是检索？ {#sec-rag}

检索增强生成（[[prompting-rag/retrieval-augmented-generation]]）只把与查询相关的段落放进提示。长上下文把一切都放进去，让注意力去挑。这一取舍的代价一侧容易算，质量一侧必须测。

::: example 通读的代价 {#ex-rag}
就一个$400{,}000$词元的文档集合提问。比较（a）把整个集合放进提示与（b）检索$4000$词元的相关段落，在实得$593$ TFLOP/s 下上面那个$80$亿参数模型的预填充 FLOPs 与时间。然后（c）设集合的缓存由前缀缓存保留，并提很多问题：每个后续问题花费多少，缓存占多少内存？
::: solution
（a）$2NP + 2LdP^2 = 6.4\times10^{15} + 4.19\times10^{16} = 4.83\times10^{16}$个 FLOPs：预填充$81$ s。（b）$6.4\times10^{13} + 4.2\times10^{12} = 6.8\times10^{13}$个 FLOPs：$0.11$ s，少约$700$倍。（c）集合已缓存时（[[inference/kv-cache#def-prefix]]），一个$100$词元的问题要花$2N\cdot100 + 4Ld\cdot100\cdot400{,}000 = 2.3\times10^{13}$个 FLOPs，与检索式提示相当；但缓存是$400{,}000\cdot131{,}072$字节$= 52$ GB，对一个文档集而言占去一块加速器内存的大部分，而每生成一个词元都要把它整个读一遍。长上下文加缓存适合就一个固定语料问很多个问题；检索适合大而多变的语料与众多用户。
:::
:::

质量方面，已发表的比较莫衷一是，结论随模型、任务与检索器而变。Xu 等（2024）发现检索能提高长短上下文模型在其长文档问答任务上的成绩；Li 等（2024）发现资源不受限时，较新的长上下文模型平均优于检索，而检索便宜得多，并提出把每个查询路由到两者之一。检索可能漏掉排名不靠前的段落，尤其当问题需要通读整篇文档（摘要、计数、全局结构）时；长上下文可能漏掉中间的信息，或被无关文本带偏。截至 2026 年，两者并用——大方地检索、装进长上下文——已是常见做法。

## 实现 {#sec-code}

下面的清单用纯 Python 实现带因果跳块的 FlashAttention，并与朴素注意力对照检验；为一个查询做拆键解码、用两种不同的合并次序；并评估[[#ex-interleave]]三种层布局的缓存。

```python
import math, random
rng = random.Random(0)
T, d = 50, 8
Q = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(T)]
K = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(T)]
V = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(T)]
dot = lambda a, b: sum(x * y for x, y in zip(a, b))

def naive_attention(Q, K, V, causal=True):              # forms the full (T, T) score matrix
    out = []
    for i, q in enumerate(Q):
        s = [dot(q, k) / math.sqrt(d) if (j <= i or not causal) else -math.inf for j, k in enumerate(K)]
        m = max(s); p = [math.exp(v - m) for v in s]; z = sum(p)
        out.append([sum(p[j] * V[j][c] for j in range(len(K))) / z for c in range(d)])
    return out

def flash_attention(Q, K, V, Br=8, Bc=8, causal=True):
    """Tiled exact attention: per query block keep running max m, sum l and output o;
    stream key/value blocks, rescale old statistics when the max grows. Never stores T x T."""
    out, tiles, skipped = [None] * len(Q), 0, 0
    for i0 in range(0, len(Q), Br):
        rows = range(i0, min(i0 + Br, len(Q)))
        m = {i: -math.inf for i in rows}; l = {i: 0.0 for i in rows}; o = {i: [0.0] * d for i in rows}
        for j0 in range(0, len(K), Bc):
            if causal and j0 > rows[-1]: skipped += 1; continue      # tile entirely above the diagonal
            tiles += 1
            cols = range(j0, min(j0 + Bc, len(K)))
            for i in rows:
                s = [dot(Q[i], K[j]) / math.sqrt(d) for j in cols if not causal or j <= i]
                if not s: continue
                m_new = max(m[i], max(s))
                scale = math.exp(m[i] - m_new) if m[i] > -math.inf else 0.0
                p = [math.exp(v - m_new) for v in s]
                l[i] = l[i] * scale + sum(p)
                o[i] = [o[i][c] * scale + sum(pj * V[j][c] for pj, j in zip(p, cols)) for c in range(d)]
                m[i] = m_new
        for i in rows: out[i] = [v / l[i] for v in o[i]]
    return out, tiles, skipped

ref = naive_attention(Q, K, V)
fa, tiles, skipped = flash_attention(Q, K, V)
err = max(abs(a - b) for r1, r2 in zip(ref, fa) for a, b in zip(r1, r2))
print(f"max |flash - naive| = {err:.2e}; tiles computed {tiles}, skipped by the causal mask {skipped}")

# split-K ("flash-decoding"): one query, keys split into chunks processed independently, then merged
def partial(q, Ks, Vs):                                   # returns (m, l, unnormalised o) for one chunk
    s = [dot(q, k) / math.sqrt(d) for k in Ks]; m = max(s); p = [math.exp(v - m) for v in s]
    return m, sum(p), [sum(pj * v[c] for pj, v in zip(p, Vs)) for c in range(d)]
def merge(a, b):                                          # associative combination of two partials
    (ma, la, oa), (mb, lb, ob) = a, b; m = max(ma, mb)
    fa, fb = math.exp(ma - m), math.exp(mb - m)
    return m, la * fa + lb * fb, [x * fa + y * fb for x, y in zip(oa, ob)]
q = Q[-1]
parts = [partial(q, K[c:c + 13], V[c:c + 13]) for c in range(0, T, 13)]   # 4 chunks of <= 13 keys
left = parts[0]
for p_ in parts[1:]: left = merge(left, p_)                               # ((p0 p1) p2) p3
tree = merge(merge(parts[0], parts[1]), merge(parts[2], parts[3]))       # (p0 p1)(p2 p3)
for name, (m_, l_, o_) in [("left fold", left), ("tree", tree)]:
    e = max(abs(o_[c] / l_ - ref[-1][c]) for c in range(d))
    print(f"split-K decode, {name:9s}: max error vs full attention {e:.2e}")

# sliding window and interleaved local/global layers: cache per sequence (GiB) at 128k context
per_tok_layer = 2 * 8 * 128 * 2                          # bytes: K and V, 8 kv heads, d_k 128, bf16
T_ctx, L = 131072, 48
for name, layers in [("all global", [T_ctx] * L),
                     ("all window 4096", [4096] * L),
                     ("5 local (1024) : 1 global", [1024 if i % 6 < 5 else T_ctx for i in range(L)])]:
    print(f"{name:26s}: {sum(layers) * per_tok_layer / 2**30:6.2f} GiB")
```

Output:

```
max |flash - naive| = 2.22e-16; tiles computed 28, skipped by the causal mask 21
split-K decode, left fold: max error vs full attention 4.16e-17
split-K decode, tree     : max error vs full attention 5.55e-17
all global                :  24.00 GiB
all window 4096           :   0.75 GiB
5 local (1024) : 1 global :   4.16 GiB
```

分块计算与朴素计算在双精度下一个舍入误差之内一致；把$50$个词元切成每块$8$个、排成$7\times7$的块阵，它只计算对角线上及其下方的$28$块，跳过$21$块。拆键解码的两种合并次序在舍入误差内给出同样的输出，这正是结合律（[[#prop-merge]]）所要求的；两者之间微小的差别就是[[inference/decoding-sampling#prop-fp]]说的浮点加法不满足结合律——这也正是拆键内核在分块数不同时输出不会逐位相同的原因。

::: history
长上下文最初受限于注意力的二次内存：稀疏模式（Child 等，2019）、带全局词元的滑动窗口（Longformer，Beltagy 等，2020；BigBird，Zaheer 等，2020）与线性注意力（Katharopoulos 等，2020）用近似注意力把长度推到几千词元。Rabe 与 Staats（2021）以及 Dao、Fu、Ermon、Rudra 与 Ré（FlashAttention，NeurIPS 2022）证明精确注意力只需线性内存，用的是 Milakov 与 Gimelshein（2018）的在线 softmax；Dao 等人的 Flash-Decoding（2023）把解码沿键并行，Liu、Zaharia 与 Abbeel 的环形注意力（ICLR 2024）则沿设备并行。位置插值与 YaRN（2023）扩展了训练好的窗口（[[pretraining/continued-pretraining]]）。评测从针测试（2023）演进到"迷失在中间"（Liu 等，TACL 2024）与 RULER（Hsieh 等，COLM 2024）。
:::

::: summary
- 注意力在预填充 FLOPs 中于$P^* = N/(Ld)$（约$12d$）处超过权重，在解码中于$N/(2Ld)$处超过；在长上下文下，缓存在内存流量上超过权重。
- **部分注意力状态**$(m, \ell, \mathbf{o})$可按结合律合并（[[#eq-merge]]）。正是这一个恒等式给出了**FlashAttention**（顺序合并键块、跳过因果掩码块）、**拆键解码**（并行合并）与**环形注意力**（跨设备合并）。
- 环形注意力在块至少含$\pi h_{kv}b/(2h\beta_{\text{link}})$个词元时能藏住通信，与总长度无关。
- **滑动窗口**给缓存封顶；**交错**少数全局层以几分之一的内存保留精确的长程访问。近似必须纳入训练。
- 标称窗口不是**有效**长度：单针测试很容易；多键、多跳与聚合任务（RULER）、位置效应与自然任务透露的信息多得多。
- **检索**每问便宜得多；长上下文加前缀缓存适合就一个语料多次提问；两者并用已是常态。
:::

## 习题

::: exercise 注意力在预填充中的占比 {level=1 check="0.349"}
$N = 8\times10^9$、$L = 32$、$d = 4096$时，一条$32{,}768$词元提示的预填充 FLOPs 中注意力占多大比例？保留三位小数。
::: solution
$LdP/(N + LdP)$，其中$LdP = 32\cdot4096\cdot32{,}768 = 4.295\times10^9$：$4.295/(8 + 4.295) = 0.349$。
:::
:::

::: exercise 带窗口的缓存 {level=1 check="512"}
一个$32$层模型有$8$个维数为$128$的键值头、bfloat16，每层都用$4096$词元的窗口。一条序列无论多长，需要多少 MiB 的缓存？
::: solution
每词元$2\cdot32\cdot8\cdot128\cdot2 = 131{,}072$字节，乘$4096$个词元$= 512$ MiB。
:::
:::

::: exercise 堆叠窗口的作用范围 {level=1 check="131040"}
按[[transformers/efficient-attention#prop-reach]]，一个$32$层、窗口$4096$的模型，其输出最远能依赖于往前多少个位置的输入？
::: solution
$L(w - 1) = 32\cdot4095 = 131{,}040$个位置。
:::
:::

::: exercise 交错层布局的缓存 {level=2 check="0.1732"}
某模型每个全局层配五个窗口为$1024$的局部层。在$131{,}072$词元的上下文下，它需要全全局缓存的多大比例？保留四位小数。
::: solution
每$6$层一组：$(5\cdot1024 + 131{,}072)/(6\cdot131{,}072) = 136{,}192/786{,}432 = 0.1732$。
:::
:::

::: exercise 环形注意力的块大小 {level=2 check="1484"}
设备的实得算术速率为$593.4$ TFLOP/s，互连带宽$100$ GB/s。模型有$32$个查询头与$8$个键值头，bfloat16。环形注意力要藏住通信，最小的整数块大小$c$是多少？
::: solution
由[[#prop-ring]]，$c\ge593.4\times10^{12}\cdot8\cdot2/(2\cdot32\cdot100\times10^9) = 1483.5$，故$c = 1484$个词元。若是完整多头注意力（$h_{kv} = 32$），这个下界会大四倍。
:::
:::

::: exercise 合并的单位元 {level=2}
证明$(-\infty, 0, \mathbf{0})$是$\oplus$的单位元，并把一个状态与自身合并得到的*不是*某个集合的状态（解释它是什么）。这对那些误把键切成有重叠的分块的实现意味着什么？
::: solution
$m_B = -\infty$时，$m = m_A$，因子$e^{m_B - m} = 0$、$e^{m_A - m} = 1$，结果就是$(m_A, \ell_A, \mathbf{o}_A)$。把$\sigma(A)$与自身合并得$(m_A, 2\ell_A, 2\mathbf{o}_A)$，其输出$\mathbf{o}/\ell$不变——但这是$A$中每个键都被数了两次的多重集的状态，不是任何集合的状态。分块有重叠时，重叠里的键被数了两次，softmax 权重就错了（除非重叠恰好是全集）；最终输出可能看着合理，实际却不对。划分必须不相交。
:::
:::

::: exercise 长提示的预填充时间 {level=2 check="81.5"}
对[[#ex-rag]]的模型，在实得$593.4$ TFLOP/s 下，预填充$400{,}000$个词元要多少秒？保留一位小数。
::: solution
$2NP + 2LdP^2 = 6.4\times10^{15} + 2\cdot32\cdot4096\cdot1.6\times10^{11} = 6.4\times10^{15} + 4.194\times10^{16} = 4.834\times10^{16}$个 FLOPs；除以$5.934\times10^{14}$，得$81.5$ s。
:::
:::

::: exercise 更好的"草堆" {level=2}
设计一个模型无法靠词面匹配通过、并且必须组合两处相距遥远的事实才能回答的长上下文测试。说明你要变化什么、报告什么。
::: solution
例如：伪造一份很长的、在许多命名实体之间发生的事件日志，其中埋着这样一条链——深度$10\%$处写"A 把钥匙交给了 B"，$60\%$处写"B 把钥匙留在了 12 号房间"，再配上"C 把一把钥匙交给了 D"之类的干扰句。然后问："A 交出去的那把钥匙在哪个房间？"答案要求经实体把两条事实连起来，而每个句子都和问题共享词面。变化总长度、两条事实的深度与干扰链的数目；报告准确率随长度、随每个深度的变化，在许多随机实例上给出置信区间，并与只给出相关句子和少量干扰句的短上下文对照组比较。RULER 的变量追踪任务就是这一思路的已发表版本。
:::
:::

::: exercise 因果跳块的开销 {level=3}
一条$T = nB$个词元的序列，查询与键都切成$n$个大小为$B$的块，[[#alg-flash-causal]]要计算多少个块对？占完整$n^2$的多大比例？所计算的块中有多少需要逐条目掩码？与清单里打印的数目核对。
::: solution
查询块$i$（从$1$到$n$）需要键块$1,\dots,i$，所以总数是$\sum_{i=1}^ni = n(n + 1)/2$，占$n^2$的$(n + 1)/(2n)$，趋于$\tfrac12$。只有对角线上的$n$个块同时含允许与被掩的条目；其余$n(n - 1)/2$个块完全允许。清单里$T = 50$、每块$8$个词元，得$n = 7$（最后一块不满）：计算$28$块、跳过$49 - 28 = 21$块，与打印一致。
:::
:::

::: exercise 因果掩码下的环形注意力 {level=3}
$D$台设备的环形注意力加上因果掩码，设备$k$（持有块$k$，$k = 1,\dots,D$）只需要键块$1,\dots,k$。(a) 若每台设备只计算自己需要的块，最忙的设备要算多少个块？整个环平均每轮总共算多少个块？(b) 证明让每台设备持有两个半块——分别来自序列的两端（$2D$个半块中的第$k$与第$2D + 1 - k$块）——即可平衡负载。
::: solution
(a) 设备$D$算$D$个块，设备$1$只算$1$个；环仍要$D$轮，于是总工作量$\sum_kk = D(D + 1)/2$摊在$D\cdot D$个设备·轮上，平均利用率$(D + 1)/(2D)\approx\tfrac12$。(b) 把序列切成$2D$个半块，设备$k$持有查询半块$k$与$2D + 1 - k$，分别需要$k$与$2D + 1 - k$个键半块：每台设备都是$2D + 1$个半块的计算量，与$k$无关。负载就此平衡——这正是因果模型的上下文并行实现按这种方式重排序列的原因。
:::
:::
