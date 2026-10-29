[[sequence-models/decoding-basics]]介绍了每个语言模型都会用到的解码规则：贪心解码、束搜索、温度、top-$k$与核（top-$p$）采样。本章把它们视为当然，转而观察发生在推理服务系统内部的解码。请求以提示到来；系统先把网络在整个提示上跑一遍，然后每生成一个词元再跑一遍；网络的输出与被采出的词元之间横着一条由对 logits 的小变换组成的链——偏置、惩罚、温度、截断——其顺序大有讲究；而结果理应是可复现的，这在并行硬件上常常做不到。

我们讲生成的两个阶段（**预填充**与**解码**）以及它们为何代价悬殊；讲带着惩罚与偏置的 **logits 处理流水线**；核采样之后提出的几条**截断规则**（min-$p$、$\eta$采样与典型采样）；**对比解码**；采样对模型概率**校准**的影响；最后是**确定性**：为什么“温度 $0$”不保证两次输出一样，要怎样才能做到。

## 两个阶段：预填充与解码 {#sec-phases}

自回归模型计算$p_\theta(x_t\mid x_{<t})$。给定提示$x_1,\dots,x_P$，第一个新词元需要网络在位置$P$的输出，它依赖每一层里全部$P$个提示位置的键和值。这些东西在提示上一趟算完、位置之间并行，与训练时完全一样。此后每个新词元只需要再多一个位置：它自己的查询、键和值，以及之前一切存下来的键和值（[[inference/kv-cache]]）。

::: definition 预填充与解码 {#def-phases}
从$P$个词元的提示生成有两个阶段。

- **预填充**：在$P$个提示词元上并行做一次前向传播，存下每一层的键和值，并给出第一个新词元的分布。
- **解码**：一个循环。每轮把最近生成的词元作为单个新位置喂入，把它的键和值追加到缓存，产出下一个分布，并从中选一个词元。循环在遇到序列结束词元、停止序列或长度上限时停止。

**首词元时间**（TTFT）由预填充主导；**每输出词元时间**（TPOT）是一轮解码的耗时。
:::

两个阶段每词元的算术量相同，瓶颈却相反。

::: proposition 两个阶段的代价 {#prop-phases}
设稠密解码器含$N$个参数（不含嵌入）、$L$层宽度为$d$、每参数存$b$字节。忽略低阶项，

1. 预填充$P$个词元约花费$2NP + 2LdP^2$个 FLOP，把权重读一遍，$Nb$字节；
2. 上下文长度为$t$的一个解码步约花费$2N + 4Ldt$个 FLOP，把权重*和*整个缓存都读一遍，$Nb$字节外加缓存。

于是预填充每读一字节权重约做$2P/b$个 FLOP，解码步只有约$2/b$：16 位精度下每字节一个 FLOP。
:::

::: proof
每个权重对经过它的每个词元参与一次乘一次加，每词元$2N$个 FLOP，$P$个词元即$2NP$。注意力另加：每层每个查询，对$t$个键打分$2td$个 FLOP，对值作加权和$2td$个，合计$4td$（[[transformers/attention-complexity#sec-flops]]）。预填充中查询$i$在因果掩码下看到$i$个键；对$i = 1,\dots,P$求和$4di$，每层约$2dP^2$。解码步中一个查询面对$t$个键，每层$4dt$。预填充时权重只加载一次、供全部$P$个词元使用（它们乘的是一个$(P, d)$的激活矩阵）；解码时加载它们只为处理一个词元。FLOPs 除以权重字节数即得两个比值。
:::

每字节一个 FLOP 的比值远低于当今任何加速器的脊点——峰值算术与内存带宽之比，近几代 GPU 为每字节$150$–$300$个 FLOP（[[transformers/attention-complexity#def-roofline]]）。因此单条解码流受内存带宽限制，算术单元几乎闲着。就是这一个事实驱动了本课程的多数内容：批处理（[[inference/batching-serving]]）让每次权重读取在多条流之间分摊，量化（[[inference/quantisation]]）少读字节，投机解码（[[inference/speculative-decoding]]）每次权重读取检验多个词元。

::: example 80 亿参数模型的预填充与解码 {#ex-phases}
一个含$N = 8\times10^9$参数的稠密模型以 bfloat16 跑在一块加速器上，厂商公布的稠密 16 位算术峰值为$989$ TFLOP/s、内存带宽$3.35$ TB/s（H100 SXM）。以$50\%$的峰值算术估算$2000$词元提示的预填充时间，并给出忽略注意力时单请求每输出词元时间的一个下界。
::: solution
预填充：$2NP = 2\cdot8\times10^9\cdot2000 = 3.2\times10^{13}$个 FLOP；按$0.5\cdot989\times10^{12}$ FLOP/s 需$0.065$ s。解码：每步必须读完全部$Nb = 1.6\times10^{10}$字节权重；按$3.35\times10^{12}$ B/s 至少要$4.8$ ms，单条流超不过每秒约$209$个词元。解码步的算术量$1.6\times10^{10}$个 FLOP，满峰值只需$16$ µs：这一步的耗时约为算术所需的$300$倍。生成$500$个词元约花$2.4$ s 解码，对比$0.065$ s 预填充——尽管提示的词元数是输出的四倍。
:::
:::

解码循环的几个工程细节不改变数学，却关乎用户体验。

- **停止。**除了序列结束词元和最大长度，接口还接受**停止序列**：生成到它即止的字符串。停止串可能横跨多个词元，或终止在某个词元中间，所以必须在去分词后的文本上匹配，而不是在词元 id 上匹配。
- **流式去分词。**字节级分词器（[[text-and-language]]）可能把一个多字节 UTF-8 字符拆到几个词元里，一些分词器还把空格附着在后一个词元上。流式服务器因此要扣住文本直到它们拼成完整的字符，并对近期词元的一个滑动窗口作解码，而不是逐个词元单独解。
- **每个提示多个样本。**需要同一个提示的$n$个样本时（为了自洽性，[[reasoning/self-consistency]]，或为了给出几个回复供挑选），提示只预填充一次，其缓存在$n$条解码流之间共享。

## logits 处理流水线 {#sec-pipeline}

在网络的输出$\mathbf{z}\in\mathbb{R}^{\lvert\mathcal{V}\rvert}$与被选中的词元之间，推理服务系统会依次施加一串**logits 处理器**，每一个都是关于 logits 与已生成词元的函数。

::: definition logits 处理器与采样流水线 {#def-pipeline}
**logits 处理器**是一个映射$\mathbf{z}\mapsto f(\mathbf{z}, x_{<t})$，返回修改后的 logits，其中某些分量可以置为$-\infty$以禁止某个词元。**采样流水线**按固定顺序施加：

1. 改变分数的处理器：logit 偏置、重复惩罚、频率与存在惩罚、文法掩码；
2. 温度：$\mathbf{z}\mapsto\mathbf{z}/\tau$；
3. 截断：top-$k$、top-$p$、min-$p$等，把被排除词元的 logits 置为$-\infty$；

然后从结果的$\operatorname{softmax}$中抽取$x_t$（$\tau\to0$时取其 argmax）。
:::

顺序之所以要紧，是因为这些步骤不交换。温度施于 top-$p$之前，会改变核里有哪些词元；施于其后，只是重新塑造已经选定的词元。惩罚施于截断之后，救不回截断扔掉的词元。各实现的默认顺序互不相同，这也是同样的名义参数在不同系统上给出不同输出的原因之一。

### logit 偏置与惩罚 {#sec-penalties}

::: definition logit 偏置、频率与存在惩罚 {#def-penalties}
设$c_v$为词元$v$在已生成文本中出现的次数（有些实现把提示也算进去）。

- **logit 偏置**加上一个固定向量：$z_v\mapsto z_v + b_v$。$-\infty$的偏置封禁一个词元；很大的正偏置几乎强迫它出现。
- **频率惩罚**$\alpha_f$与**存在惩罚**$\alpha_p$减去
$$
z_v\mapsto z_v - \alpha_f\,c_v - \alpha_p\,\mathbb{1}[c_v > 0].
$$ {#eq-penalty}
- Keskar 等（2019）的**重复惩罚**则把已见词元的正 logits 除以$\theta > 1$、负 logits 乘以$\theta$（[[sequence-models/decoding-basics#sec-degeneration]]）。
:::

加法形式在概率空间里有干净的语义。

::: proposition 加法惩罚给概率重新加权 {#prop-reweight}
对 logits 施加偏置$\mathbf{b}$、再在温度$1$下作 softmax，得

$$
q(v) = \frac{p(v)\,e^{b_v}}{\sum_u p(u)\,e^{b_u}},
$$

其中$p = \operatorname{softmax}(\mathbf{z})$。特别地，频率与存在惩罚把出现过$c$次的词元的概率先乘以$e^{-\alpha_fc - \alpha_p}$、再归一化，且结果与给所有 logits 加同一常数无关。乘法式的重复惩罚两条性质都没有。
:::

::: proof
$q(v) = e^{z_v + b_v}/\sum_ue^{z_u + b_u}$。分子分母同除以$\sum_ue^{z_u}$：分子成为$p(v)e^{b_v}$，分母成为$\sum_up(u)e^{b_u}$。给每个$z_v$加常数$c$不改变$p$，也就不改变$q$。对乘法惩罚，logit $z > 0$的已见词元变成$z/\theta$，改变量为$-z(1 - 1/\theta)$，依赖于$z$本身；把所有 logits 平移一个常数会改变$z$，从而改变这个改变量，进而改变$q$。
:::

于是$\alpha_f = 0.5$的频率惩罚，把已出现三次的词元相对于未出现词元的几率乘以$e^{-1.5}\approx0.22$——不管那是个什么词元。这很粗糙：它同等地惩罚 “the” 的重复、代码里变量名的重复和论文主语的重复。惩罚是靠眼睛调的启发式；对后训练（[[post-training]]）之后本就很少死循环的聊天模型，它们常常被留在零值。

::: example 手算惩罚与封禁 {#ex-penalties}
八个词元 “the”、“a”、“his”、“Paris”、“London”、“it”、“banana”、“zebra” 的 logits 为$(2.0, 1.6, 0.9, 0.7, 0.3, 0.0, -1.5, -3.0)$，故$p = (0.380, 0.255, 0.127, 0.104, 0.069, 0.051, 0.011, 0.003)$。(a) “the” 已生成三次、“a” 一次；施加$\alpha_f = 0.5$、$\alpha_p = 0.4$。(b) 改为给 “banana” 加$+5$的 logit 偏置、给 “zebra” 加$-\infty$。
::: solution
(a) “the” 减去$0.5\cdot3 + 0.4 = 1.9$，降到$0.1$；“a” 减去$0.5 + 0.4 = 0.9$，降到$0.7$。新的 logits $(0.1, 0.7, 0.9, 0.7, 0.3, 0.0, -1.5, -3.0)$给出$(0.108, 0.197, 0.241, 0.197, 0.132, 0.098, 0.022, 0.005)$：“his” 成了最可能的词元，“the” 从第一跌到第四。(b) “banana” 的 logit 变$3.5$，“zebra” 变$-\infty$：$(0.141, 0.095, 0.047, 0.039, 0.026, 0.019, 0.633, 0)$。$+5$的偏置把 “banana” 相对任何其他词元的几率乘以$e^5\approx148$，把一个$1\%$的词元变成$63\%$的词元。偏置用于封禁词元（比如绝不该出现在用户可见文本中的特殊词元）、把分类器的回答限制在少数标签词元上，以及受约束解码（[[prompting-rag/structured-output]]）。
:::
:::

::: widget plot
f: exp(2-a*x)/(exp(2-a*x)+12.049)
x: 0, 10
y: 0, 0.5
sliders: a=0.5:0:2:0.05
labels: probability of "the" after $c$ occurrences
caption: [[#ex-penalties]]中首位词元的概率随其出现次数$c$的变化，频率惩罚$\alpha_f$可调（滑块；其余七个 logits 固定，其指数和为$12.05$）。$\alpha_f = 0$时保持$0.38$；$\alpha_f = 0.5$时三次出现后跌破$0.1$。若换成存在惩罚，则表现为$c = 1$处的一次性下坠。
:::

### 核采样之后的截断规则 {#sec-truncation}

核采样保留总质量至少为$p$的最小头部（[[sequence-models/decoding-basics#def-top-p]]）。它的弱点在于分界由*累计*质量定义：分布一平，$0.9$的核可能包含成千上万个概率极小的词元。有几个提案改按单个词元的概率来切。它们是带着特定模型和任务上的评测发表出来的变体，不是公认的改进；我们给出精确定义，因为它们已被广泛实现。

::: definition min-p、epsilon、eta 与典型采样 {#def-truncation}
设$p$为下一词元分布，$H(p) = -\sum_vp(v)\ln p(v)$为其熵。每条规则保留一个集合$S$，从限制在$S$上并归一化的$p$中采样。

- **$\varepsilon$-采样**（Hewitt、Manning 与 Liang，2022）：$S = \{v : p(v) > \varepsilon\}$。
- **$\eta$-采样**（同一篇论文）：$S = \{v : p(v) > \eta\}$，阈值依赖熵：$\eta = \min\big(\varepsilon,\ \sqrt{\varepsilon}\,e^{-H(p)}\big)$。
- **min-$p$采样**（Nguyen 等，2024）：$S = \{v : p(v)\ge p_{\text{base}}\cdot\max_up(u)\}$，阈值与首位概率成正比。
- **局部典型采样**（Meister、Pimentel、Wiher 与 Cotterell，2023）：按$\lvert-\ln p(v) - H(p)\rvert$——惊讶度与期望惊讶度之差——给词元排序，保留该次序下质量至少为$\tau_{\text{typ}}$的最短前缀。
:::

每条规则背后都有一个假设。Hewitt 等把训练好的模型看作真实分布的平滑版本：平滑会给每个词元都抹上一点质量，所以某个绝对概率之下的词元多半是噪声；而当分布确属平坦（高熵）时阈值就该放松——这就是$\eta$的由来。min-$p$让阈值随模型的自信程度缩放：首词元有$0.9$时，$0.05$的词元可疑；首词元只有$0.1$时，它就是真正的候选。典型采样的动机来自一个信息论观点——人类文本的信息率贴近其期望值——当某个词元远比平均“不足为奇”时，它甚至能*排除最可能的词元*。

::: example 四个截断规则对同一个分布 {#ex-truncation}
对[[#ex-penalties]]的分布（$H = 1.617$纳特），求 min-$p$（$p_{\text{base}} = 0.2$）、$\eta$-采样（$\varepsilon = 0.02$）、典型采样（$\tau_{\text{typ}} = 0.9$）与 top-$p$（$p = 0.9$）各自的保留集合。
::: solution
min-$p$：阈值$0.2\cdot0.380 = 0.076$；保留 “the”、“a”、“his”、“Paris”（$4$个词元，质量$0.865$）。$\eta$：$\sqrt{0.02}\,e^{-1.617} = 0.1414\cdot0.1985 = 0.028$，故$\eta = \min(0.02, 0.028) = 0.02$；保留高于$0.02$的六个词元（质量$0.986$）。典型：惊讶度$-\ln p$为$0.97, 1.37, 2.07, 2.27, 2.67, 2.97, 4.47, 5.97$；与$1.617$的距离为$0.65, 0.25, 0.45, 0.65, 1.05, 1.35, 2.85, 4.35$。按距离排序：“a”（$0.255$）、“his”（$0.382$），随后 “the” 与 “Paris” 几乎并列于$0.65$（两个都取，$0.866$），再是 “London”（$0.935\ge0.9$）：共五个词元。top-$p$：累计$0.380, 0.635, 0.762, 0.866, 0.935$：也是五个词元。在这个中等平坦的分布上各规则只差一两个词元；它们的分歧出现在极尖或极平的分布上（[[#exr-minp]]）。
:::
:::

每条截断规则都会改变被采样的分布，而改变的量有一个简单形式。

::: proposition 截断的散度 {#prop-trunc-kl}
若$q$是$p$限制在集合$S$上再归一化，保留质量$Z = \sum_{v\in S}p(v)$，则

$$
\operatorname{KL}(q\,\|\,p) = -\ln Z.
$$ {#eq-trunc-kl}
:::

::: proof
$v\in S$时$q(v) = p(v)/Z$，其余$q(v) = 0$。于是$\operatorname{KL}(q\|p) = \sum_{v\in S}q(v)\ln\frac{q(v)}{p(v)} = \sum_{v\in S}q(v)\ln\frac1Z = -\ln Z$，因为$\sum_{v\in S}q(v) = 1$。
:::

截断到$90\%$的质量，代价是每词元与模型分布相差$-\ln0.9 = 0.105$纳特的散度——单个词元看着小，但在长输出上会累积，这就是排除尾部的价格。（反向散度$\operatorname{KL}(p\|q)$只要有词元被排除就是无穷大：截断后的采样器永远产不出模型认为可能的文本。）

### 对比解码 {#sec-contrastive}

另辟蹊径的办法用两个模型。大模型的毛病——重复、泛泛而谈、短而无味的续写——常常也是一个小得多的模型的毛病，而且它只会让这些毛病更糟。**对比解码**（Li 等，2023）偏爱那些大“专家”模型比对小“业余”模型更喜欢的词元。

::: definition 对比解码 {#def-contrastive}
给定同一词表上的专家分布$p_{\text{E}}$与业余分布$p_{\text{A}}$，以及合理性阈值$\alpha\in(0, 1]$，定义头部$V_{\text{head}} = \{v : p_{\text{E}}(v)\ge\alpha\max_up_{\text{E}}(u)\}$，并选择

$$
x_t = \operatorname*{arg\,max}_{v\in V_{\text{head}}}\ \big[\ln p_{\text{E}}(v\mid x_{<t}) - \ln p_{\text{A}}(v\mid x_{<t})\big].
$$ {#eq-contrastive}
:::

合理性约束不可或缺。没有它，一个两个模型都认为几乎不可能的词元可能反而胜出，因为业余模型觉得它*更加*不可能：胡言乱语的对数概率差反而很大。头部就是专家的 min-$p$集合，原论文取$\alpha = 0.1$；在其中，这个分数奖励大模型知道而小模型不知道的东西。Li 等报告，在 OPT 与 GPT-2 家族的开放式生成的人工与自动评测中，它优于贪心解码和核采样；O'Brien 与 Lewis（2023）报告它在某些推理基准上有提升。代价是每个词元多跑一遍业余模型的前向。一个相关的变体 DoLa（Chuang 等，2024）不用第二个模型，而是拿单个模型的最后层与更早某层作对比。（**对比搜索**，Su 等 2022，名字相近却是另一种方法：它惩罚隐藏状态与较早词元相似的候选。）

::: example 手算对比解码 {#ex-contrastive}
专家是[[#ex-penalties]]的分布；业余的 logits 为$(2.2, 1.9, 0.2, -0.5, -0.4, 0.4, -1.0, -2.5)$，故$p_{\text{A}}\approx(0.448, 0.332, 0.061, 0.030, 0.033, 0.074, 0.018, 0.004)$。$\alpha = 0.1$的对比解码选哪个词元？
::: solution
头部：$p_{\text{E}}\ge0.1\cdot0.380 = 0.038$，保留前六个词元。分数$\ln p_{\text{E}} - \ln p_{\text{A}} = \ln(p_{\text{E}}/p_{\text{A}})$：“the” $\ln(0.380/0.448) = -0.16$，“a” $-0.26$，“his” $0.74$，“Paris” $1.24$，“London” $0.74$，“it” $-0.36$。对比解码选 “Paris”——那个小模型低估了的具体续写——而贪心解码会选 “the”。“banana” 与 “zebra” 的比值小于$1$，反正被头部排除；但一对专家—业余模型完全可能把一个两边都给近乎零分的胡闹词元顶成最大比值，这正是头部要防的。
:::
:::

## 采样与校准 {#sec-calibration}

若模型给出概率$0.8$的所有事件里约$80\%$真的发生，就称模型是**校准**的（[[ml-fundamentals/evaluation-metrics]]）。用交叉熵预训练会奖励下一词元分布的校准，Kadavath 等（2022）发现，当把答案字母的概率读出来时，大型预训练模型在选择题上校准良好。推理时有两件事会破坏这一点。

第一，后训练（[[post-training]]）优化的是讨人喜欢的输出而非似然，若干模型家族的公开报告（例如 GPT-4 技术报告，OpenAI 2023）都显示答案概率的校准在其后劣化。第二件事则完全在解码器自己的掌控之中：*采样参数会改变被采样的分布本身*。

::: proposition 温度扭曲校准过的概率 {#prop-temp-calib}
设模型在二元问题上是校准的：只要它给答案 A 赋概率$\pi$，A 正确的概率就是$\pi$。在温度$\tau$下采样，产出 A 的概率为

$$
q_\tau(\pi) = \frac{\pi^{1/\tau}}{\pi^{1/\tau} + (1 - \pi)^{1/\tau}},
$$ {#eq-temp-calib}

当$\tau < 1$时过度自信（比$\pi$更远离$\tfrac12$），$\tau > 1$时自信不足。
:::

::: proof
设 logits 为$(z_A, z_B)$、$\pi = e^{z_A}/(e^{z_A} + e^{z_B})$，则比值$\pi/(1 - \pi) = e^{z_A - z_B}$。温度$\tau$下几率变为$e^{(z_A - z_B)/\tau} = \big(\pi/(1 - \pi)\big)^{1/\tau}$，即 [[#eq-temp-calib]]。$\pi > \tfrac12$时几率大于$1$，取$1/\tau > 1$次幂后更大，故$q_\tau(\pi) > \pi$；$\pi < \tfrac12$时则更小。$\tau > 1$时各不等号反向。
:::

所以，一个回答在多次样本中出现的*频率*，只有在$\tau = 1$、不加截断、且底层模型校准良好时，才是其正确性的校准估计。$\tau = 0.5$时，校准的$80\%$信念有$94\%$的采样频率：反复重跑查询、几乎每次看到同一答案的用户，会被模型的确信程度误导。截断有同样的效果，因为它砍掉了尾部中的少数答案。

::: widget plot
f: x^(1/t)/(x^(1/t)+(1-x)^(1/t)); x
x: 0, 1
y: 0, 1
sliders: t=0.5:0.1:3:0.05
labels: frequency of answer A at temperature $\tau$; calibrated probability
caption: 校准的模型以概率$\pi$相信答案 A（横轴）。在温度$\tau$（滑块）下采样，按曲线上的频率产出 A，见[[#eq-temp-calib]]。$\tau < 1$时，曲线在$\pi > \tfrac12$一侧呈位于对角线上方的 S 形：样本夸大了模型的自信。$\tau = 1$时就是对角线。
:::

这对从样本读置信度的方法影响重大。自洽性（[[reasoning/self-consistency]]）使用最频繁的答案和一致率；**语义熵**（Kuhn、Gal 与 Farquhar，2023；Farquhar 等，2024）采出若干答案，把含义相同的归为一组，用含义分布上的熵来标记可能的胡编（[[prompting-rag/hallucination]]）。两者都应在让分布贴近模型本身的采样参数下运行——通常$\tau = 1$或略低、截断温和——并且参数一变，其阈值就要重新校准。

::: warning “温度 0 给出模型最自信也最准确的答案”
贪心解码每步返回最可能的*下一词元*，不是最可能的*答案*，当然更不是最准确的答案。对要用许多词元作答的问题（一段推理后跟一个数值），把所有推理路径边缘化之后最可能的答案，可能不同于贪心路径到达的答案——这就是在许多推理基准上样本多数表决胜过贪心解码的原因（Wang 等，2023）。低温度还会掩盖不确定性（[[#prop-temp-calib]]）。把温度$0$用于可复现性和短小的封闭形式输出；不要把它的输出读成一句置信宣言。
:::

## 确定性与可复现性 {#sec-determinism}

用户和评测者常常希望同一个提示给出同样的输出：为了调试、公平比较、缓存结果。变异有两个彼此独立的来源，其一才是随机性。

### 可复现的采样

采样需要随机数；种子把它们固定。在一台同时处理许多请求的服务器里，单一的全局生成器会让每个请求的抽取取决于此前跑过哪些别的请求，所以可复现的服务器为**每个请求单设一个生成器**，用请求本身播种。想把随机性绑到位置上而不是计算顺序上，有一个漂亮的办法：**Gumbel-max 技巧**。

::: proposition Gumbel-max 采样 {#prop-gumbel}
设$U_1,\dots,U_n$独立且服从$(0, 1)$上的均匀分布，$G_i = -\ln(-\ln U_i)$，它们是独立的标准化 Gumbel 变量。对任意 logits $\mathbf{a}\in\mathbb{R}^n$，

$$
\Prob\Big(\operatorname*{arg\,max}_i\,(a_i + G_i) = k\Big) = \frac{e^{a_k}}{\sum_je^{a_j}}.
$$
:::

::: proof
$\Prob(G\le g) = \Prob\big(-\ln U\ge e^{-g}\big) = \Prob(U\le e^{-e^{-g}}) = e^{-e^{-g}}$，故$G$的 CDF 为$F(g) = \exp(-e^{-g})$，密度为$f(g) = e^{-g}\exp(-e^{-g})$。编号$k$胜出，当且仅当对每个$j\ne k$都有$a_j + G_j < a_k + G_k$。以$G_k = g$为条件并利用独立性，

$$
\begin{aligned}
\Prob(k\text{胜出}) &= \int_{-\infty}^{\infty}f(g)\prod_{j\ne k}F(g + a_k - a_j)\,dg
= \int_{-\infty}^{\infty}e^{-g}\exp\Big(-e^{-g}\sum_{j}e^{a_j - a_k}\Big)\,dg,
\end{aligned}
$$

其中来自$f$的因子$\exp(-e^{-g})$补上了求和中$j = k$的那一项。记$S = \sum_je^{a_j - a_k}$，作代换$u = e^{-g}$、$du = -e^{-g}\,dg$：积分成为$\int_0^\infty e^{-Su}\,du = 1/S = e^{a_k}/\sum_je^{a_j}$。
:::

配合温度取$a_i = z_i/\tau$；$\tau\to0$时噪声可以忽略，规则趋于 argmax。若均匀数由一个以（种子、请求、位置、词元）为键的计数器式生成器产生，一个样本仅凭它的位置就能复现，与请求如何组批、如何排序无关。

### 浮点非确定性

第二个变异来源在温度$0$下依然存在。浮点加法满足交换律但**不满足结合律**：双精度下$(0.1 + 0.2) + 0.3 = 0.6000000000000001$，而$0.1 + (0.2 + 0.3) = 0.6$。GPU 上$d$个数的和由许多线程按一棵树计算，树的形状取决于内核、分块大小，有时还取决于线程完成的先后；形状不同，舍入就不同。

::: proposition 依赖顺序的舍入 {#prop-fp}
在单位舍入为$u$的浮点运算下（bfloat16 约$3.9\times10^{-3}$，float32 约$6\times10^{-8}$，float64 约$1.1\times10^{-16}$），$x_1,\dots,x_d$的任何一种求和顺序返回的值$\hat s$都满足

$$
\lvert\hat s - s\rvert\le(d - 1)\,u\sum_i\lvert x_i\rvert + O(u^2),
$$

而不同的顺序一般返回该界内的不同值。
:::

::: proof
每次浮点加法返回$(a + b)(1 + \delta)$，$\lvert\delta\rvert\le u$，这是浮点运算的标准模型，[Maths Atlas](/learn/maths/)中有所处理。无论哪种顺序，和都由$d - 1$次加法构成，而每个$x_i$至多穿过其中$d - 1$次，故$\hat s = \sum_ix_i\prod_{k}(1 + \delta_{ik})$，每项至多$d - 1$个因子。展开得$\lvert\hat s - s\rvert\le\sum_i\lvert x_i\rvert\big((1 + u)^{d-1} - 1\big) = (d - 1)u\sum_i\lvert x_i\rvert + O(u^2)$。出现哪些$\delta$取决于形成了哪些部分和，所以不同顺序给出不同误差。
:::

误差极小——logit 末位的几个单位——但解码是不连续的：当前两名 logits 相差就在那点幅度之内时，不同的求和顺序会选不同的词元，此后两个输出便再无任何相同之处。数百个词元下来，接近平局的情形很常见。

服务器里不同的顺序从何而来？大多不是线程之间的竞争：矩阵乘法和注意力的标准内核对给定的输入形状是确定性的。来源是**批依赖**。一个请求的 logits 是在一个批次里连同当时在跑的其他请求一起算出的（[[inference/batching-serving]]），而内核会针对不同批量和序列长度挑选不同策略——分块大小、是否把归约维度切分到多个处理器上。于是同一个请求会随服务器忙闲走上不同的求和顺序。Thinking Machines Lab 的 He 等人 2025 年的一份技术报告，把一个流行的开源推理服务引擎在温度$0$下的非确定性归因于这种**批不变性**的缺失，并展示了按同一求和顺序对每种批量写成的内核（对矩阵乘法、归一化层和注意力）能让输出跨运行逐位一致，代价是吞吐量有所损失。其他来源还包括带每批容量上限的混合专家路由——某个词元是否被丢弃可能取决于它的批内同伴（[[transformers/mixture-of-experts]]）——以及部署之间硬件、库版本或并行布局的差异。

::: definition 批不变性 {#def-batch-invariance}
若一个推理计算为每个请求算出的输出，与共享其批次的其他请求无关、也与它自己在批次中的位置无关、逐位一致，就称它是**批不变**的。
:::

::: quiz
一个团队在同一台服务器上以温度$0$跑了两次评测，$3\%$的题目答案不同。哪个解释最可能？
- [ ] 服务器无视了温度设置
- [x] 两次运行的批次不同，内核以不同顺序求和，接近平局的词元发生了翻转
- [ ] 贪心解码是一个随机化算法
- [ ] 两次运行之间模型权重被更新过
::: solution
给定精确的 logits，贪心解码是确定性的。在服务器里，logits 的末几位取决于请求在哪个批次中计算，源于依赖顺序的舍入（[[#prop-fp]]）；接近平局者随之翻转，输出从此分道扬镳。逐题单独运行，或使用批不变内核，可消除这一效应。权重被更新过原则上可能，但会被记录在案；这里没有任何迹象。
:::
:::

## 实现 {#sec-code}

清单用纯 Python 实现了本章各处理器在八词元示例上的行为、对比解码、以模拟检验 Gumbel-max 技巧，并演示同组数的三种求和顺序互不一致。

```python
import math, random

def softmax(z, T=1.0):
    m = max(z); e = [math.exp((v - m) / T) if v > -math.inf else 0.0 for v in z]
    s = sum(e); return [v / s for v in e]

def entropy(p): return -sum(q * math.log(q) for q in p if q > 0)

# --- logits 处理器：每个都是 (logits, 历史) -> logits 的映射 ----------------
def logit_bias(z, bias):                       # bias: {词元 id: 加性偏置}
    return [v + bias.get(i, 0.0) for i, v in enumerate(z)]

def freq_presence(z, hist, alpha_f, alpha_p):  # 加性频率与存在惩罚
    c = [hist.count(i) for i in range(len(z))]
    return [v - alpha_f * c[i] - alpha_p * (c[i] > 0) for i, v in enumerate(z)]

def renorm(p, keep):
    s = sum(p[i] for i in keep)
    return [p[i] / s if i in keep else 0.0 for i in range(len(p))]

def min_p(p, ratio):                           # 保留 p >= ratio * 最大 p 的词元
    t = ratio * max(p); return renorm(p, {i for i, q in enumerate(p) if q >= t})

def eta_sampling(p, eps):                      # 保留 p > min(eps, sqrt(eps) * exp(-H))
    t = min(eps, math.sqrt(eps) * math.exp(-entropy(p)))
    return renorm(p, {i for i, q in enumerate(p) if q > t})

def typical(p, mass):                          # 按 |-log p - H| 排序，保留质量 >= mass 的最小集合
    H = entropy(p)
    order = sorted((i for i in range(len(p)) if p[i] > 0), key=lambda i: abs(-math.log(p[i]) - H))
    keep, tot = set(), 0.0
    for i in order:
        keep.add(i); tot += p[i]
        if tot >= mass: break
    return renorm(p, keep)

def contrastive(z_exp, z_ama, alpha):          # Li 等 2023：合理性头部，再取差值
    pe, pa = softmax(z_exp), softmax(z_ama)
    head = [i for i, q in enumerate(pe) if q >= alpha * max(pe)]
    return max(head, key=lambda i: math.log(pe[i]) - math.log(pa[i]))

words  = ["the", "a", "his", "Paris", "London", "it", "banana", "zebra"]
logits = [2.0, 1.6, 0.9, 0.7, 0.3, 0.0, -1.5, -3.0]
p = softmax(logits)
print("p      :", " ".join(f"{q:.3f}" for q in p), f" H={entropy(p):.3f}")
for name, q in [("min-p .2", min_p(p, 0.2)), ("eta .02 ", eta_sampling(p, 0.02)),
                ("typ .9  ", typical(p, 0.9))]:
    kept = sum(v > 0 for v in q)
    Z = sum(p[i] for i in range(len(p)) if q[i] > 0)
    print(name, ":", " ".join(f"{v:.3f}" for v in q), f" kept={kept} KL(q||p)={-math.log(Z):.4f}")

hist = [0, 0, 1, 0]                            # "the" 生成了 3 次，"a" 一次
z2 = freq_presence(logits, hist, 0.5, 0.4)
print("penalised p:", " ".join(f"{q:.3f}" for q in softmax(z2)))
z3 = logit_bias(logits, {6: 5.0, 7: -math.inf})
print("biased p   :", " ".join(f"{q:.3f}" for q in softmax(z3)))

amateur = [2.2, 1.9, 0.2, -0.5, -0.4, 0.4, -1.0, -2.5]
print("contrastive pick:", words[contrastive(logits, amateur, 0.1)],
      "| greedy pick:", words[max(range(8), key=lambda i: logits[i])])

# --- Gumbel-max：argmax(z/T + G) 是从 softmax(z/T) 的一次抽样 -----------------
def gumbel_sample(z, T, rng):
    return max(range(len(z)), key=lambda i: z[i] / T - math.log(-math.log(rng.random())))
rng = random.Random(1234)
N = 200000; counts = [0] * 8
for _ in range(N): counts[gumbel_sample(logits, 1.0, rng)] += 1
print("Gumbel-max freq:", " ".join(f"{c / N:.3f}" for c in counts))

# --- 浮点加法不满足结合律 ----------------------------------------------
print((0.1 + 0.2) + 0.3 == 0.1 + (0.2 + 0.3), (0.1 + 0.2) + 0.3, 0.1 + (0.2 + 0.3))
r = random.Random(0)
xs = [r.gauss(0, 1) * 10 ** r.randint(-3, 3) for _ in range(4096)]
s_seq = 0.0
for x in xs: s_seq += x
def tree(v): return v[0] if len(v) == 1 else tree(v[:len(v)//2]) + tree(v[len(v)//2:])
def chunked(v, c): return sum(sum(v[i:i+c]) for i in range(0, len(v), c))
print(f"sequential {s_seq!r}\ntree       {tree(xs)!r}\nchunks 256 {chunked(xs, 256)!r}\nexact      {math.fsum(xs)!r}")
```

Output:

```
p      : 0.380 0.255 0.127 0.104 0.069 0.051 0.011 0.003  H=1.617
min-p .2 : 0.439 0.295 0.146 0.120 0.000 0.000 0.000 0.000  kept=4 KL(q||p)=0.1449
eta .02  : 0.386 0.258 0.128 0.105 0.070 0.052 0.000 0.000  kept=6 KL(q||p)=0.0141
typ .9   : 0.407 0.273 0.135 0.111 0.074 0.000 0.000 0.000  kept=5 KL(q||p)=0.0677
penalised p: 0.108 0.197 0.241 0.197 0.132 0.098 0.022 0.005
biased p   : 0.141 0.095 0.047 0.039 0.026 0.019 0.633 0.000
contrastive pick: Paris | greedy pick: the
Gumbel-max freq: 0.381 0.255 0.127 0.104 0.069 0.052 0.011 0.002
False 0.6000000000000001 0.6
sequential -27959.426371129703
tree       -27959.426371129695
chunks 256 -27959.42637112969
exact      -27959.42637112969
```

截断结果与[[#ex-truncation]]吻合，打印出的散度正是[[#prop-trunc-kl]]的$-\ln Z$（min-$p$保留质量$0.865$，$-\ln0.865 = 0.145$）。Gumbel-max 的频率与$p$在$200{,}000$次抽样的抽样误差（约$\pm0.001$）内一致。同样$4096$个数的三种求和，即使在双精度下末位也互不相同。内核通常用 float32 累加，其单位舍入比 float64 大$10^8$倍以上，而它们产出的 logits 在几百个解码步中接近平局的次数已足够多，末位的差异足以翻转一个词元。

::: application 实践中如何挑参数
对有唯一正解的任务——抽取、分类、必须通过测试的代码——通常选贪心解码或低温度加固定种子，配上停止序列，格式要紧时再上受约束解码。开放式写作常用$\tau$在$0.7$到$1$之间，配 top-$p$或 min-$p$截断。从样本读不确定性的方法，让$\tau$贴近$1$。无论怎么选，都要把整条流水线——处理器、它们的顺序和参数、种子和软件版本——作为结果的一部分记录下来；单写一个“温度 $0.7$”定不下被采样的分布。
:::

::: history
重复惩罚经 Keskar、McCann、Varshney、Xiong 与 Socher（2019）的 CTRL 模型进入神经生成；加性频率与存在惩罚以及 logit 偏置约从 2020 年起成为商用与开源生成接口的标准参数。核采样（Holtzman 等，2020）之后，Hewitt、Manning 与 Liang 把截断表述为“去平滑”，并提出$\varepsilon$-与$\eta$-采样（Findings of EMNLP 2022）；Meister、Pimentel、Wiher 与 Cotterell 提出局部典型采样（TACL 2023）；Nguyen 等提出 min-$p$（2024，ICLR 2025）。Li、Holtzman、Fried、Liang、Eisner、Hashimoto、Zettlemoyer 与 Lewis 引入对比解码（ACL 2023）。Gumbel-max 技巧可追溯到 Gumbel 的极值分布（1954）和经济学中的离散选择模型；它在机器学习里作为采样手段的流行归功于 Maddison、Tarlow 与 Minka（2014）以及 Jang、Gu 与 Poole（2017）的 Gumbel-softmax。对可复现推理的关切随大规模评测而起，最终落到批不变内核上（He 等，2025）。
:::

::: summary
- 生成有一个**预填充**阶段（整个提示并行，约$2NP$个 FLOP，计算受限）和一个**解码**阶段（每步一个词元，约$2N$个 FLOP 但要读遍权重和缓存，16 位下约每字节一个 FLOP，访存受限）。
- logits 与词元之间横着一条处理器**流水线**——偏置、惩罚、温度、截断——顺序改变结果。
- **加性惩罚与偏置**把概率乘以$e^{b_v}$再归一化；乘法式重复惩罚不具有平移不变性。所有惩罚都是启发式。
- **min-$p$、$\varepsilon$/$\eta$与典型采样**是提出的截断变体；任何截断到保留质量$Z$的代价是$\operatorname{KL}(q\|p) = -\ln Z$。
- **对比解码**在专家的合理性头部内最大化$\ln p_{\text{E}} - \ln p_{\text{A}}$。
- 低于$1$的温度和截断会令采出的答案相对校准模型**过度自信**；基于样本的置信度需要$\tau\approx1$。
- **可复现性**需要按请求播种的随机性（Gumbel-max 把抽样绑到位置上）和**批不变**内核，因为浮点加法不满足结合律，而批次的组成会改变求和顺序。
:::

## 习题

::: exercise min-p 的保留集合 {level=1 check="3"}
一个分布的概率为$0.5, 0.2, 0.15, 0.1, 0.05$。$p_{\text{base}} = 0.25$的 min-$p$保留多少个词元？
::: solution
阈值是$0.25\cdot0.5 = 0.125$。满足$p\ge0.125$的词元是$0.5$、$0.2$和$0.15$：三个词元，保留质量$0.85$。
:::
:::

::: exercise 一个核的代价 {level=1 check="0.1054"}
top-$p$采样保留总质量$0.9$的词元。$\operatorname{KL}(q\|p)$是多少纳特（保留四位小数）？
::: solution
由[[#prop-trunc-kl]]，$-\ln0.9 = 0.1054$纳特每词元。
:::
:::

::: exercise 受惩罚的概率 {level=1 check="0.6225"}
两个词元的 logits 为$(3, 1)$。第一个已出现$4$次；施加$\alpha_f = 0.25$、$\alpha_p = 0.5$。它的新概率是多少（保留四位小数）？
::: solution
它的 logit 下降$0.25\cdot4 + 0.5 = 1.5$，降到$1.5$。概率为$e^{1.5}/(e^{1.5} + e^1) = 1/(1 + e^{-0.5}) = 0.6225$，从$1/(1 + e^{-2}) = 0.881$落下来。
:::
:::

::: exercise 过度自信的样本 {level=2 check="0.7704"}
一个校准的模型在二元问题上给答案 A 概率$0.7$。在$\tau = 0.7$下采样，以多大频率产出 A？保留四位小数。
::: solution
由[[#eq-temp-calib]]，$q = 0.7^{1/0.7}/(0.7^{1/0.7} + 0.3^{1/0.7})$。$1/0.7 = 1.4286$；$0.7^{1.4286} = e^{1.4286\ln0.7} = e^{-0.5095} = 0.6008$，$0.3^{1.4286} = e^{-1.7200} = 0.1791$。故$q = 0.6008/0.7799 = 0.7704$：模型的$70\%$信念有$77\%$的采样频率。
:::
:::

::: exercise 更大模型的解码时间 {level=2 check="20.9"}
一个$70\times10^9$参数的稠密模型以 bfloat16 分布在若干加速器上，合计内存带宽$6.7$ TB/s。忽略缓存和一切开销，单请求每输出词元的最短可能时间是多少毫秒（保留一位小数）？
::: solution
权重占$70\times10^9\cdot2 = 1.4\times10^{11}$字节，每个词元全部读一遍：$1.4\times10^{11}/6.7\times10^{12} = 0.02090$ s，即$20.9$ ms，至多每秒约$48$个词元。实践中设备间通信和缓存还会在此之上追加。
:::
:::

::: exercise 尖峰与平坦分布上的 min-p {#exr-minp level=2}
比较$p = 0.9$的 top-$p$与$p_{\text{base}} = 0.1$的 min-$p$在（a）一个词元占$0.85$、其余$0.15$平均分给$3000$个词元的分布；（b）$20$个词元各占$0.04$、另外$0.2$平均分给$10{,}000$个词元的分布上的表现。它们各保留多少词元，哪个表现更好？
::: solution
(a) top-$p$：首词元$0.85 < 0.9$，核必须不断添上每个$5\times10^{-5}$的尾部词元直到$0.9$：要$0.05/5\times10^{-5} = 1000$个，共$1001$个词元，归一化后$5.6\%$的质量落在噪声上。min-$p$：阈值$0.085$，只保留首词元。（b）top-$p$：那二十个词元共占$0.8$；要凑到$0.9$还需$0.1/2\times10^{-5} = 5000$个尾部词元，共$5020$个。min-$p$：阈值$0.004$，保留那二十个。两种情形里，top-$p$都被它按累计质量截断的定义逼进平坦尾部深处，而 min-$p$保住了肉眼可辨的头部。min-$p$也会反过来失效：若合理的续写本身概率悬殊（首词元$0.6$，另有几个$0.05$的好候选），它会把后者扔掉。
:::
:::

::: exercise 典型采样可能排除首词元 {level=2}
构造一个分布，使$\tau_{\text{typ}} = 0.5$的局部典型采样不保留最可能的词元，并解释该方法的作者为什么认为这可以接受。
::: solution
取一个词元占$0.4$，另外$600$个词元各占$0.001$。熵为$H = -0.4\ln0.4 - 600\cdot0.001\ln0.001 = 0.3665 + 4.1447 = 4.511$纳特。首词元的惊讶度$-\ln0.4 = 0.916$，与$H$相距$3.60$；每个小词元惊讶度$6.908$，相距$2.40$。小词元排在典型序的前面；$500$个就凑到质量$0.5$，首词元被排除。Meister 等争辩说，这种情况下首词元承载的信息远少于模型对一个典型下一词元的期望，而人类文本的信息量有贴近期望值的倾向；这能否改善文本是一个实证问题，他们用故事生成与摘要作了检验。这个例子也说明了实现里为什么常加一条“总保留首词元”之类的下限。
:::
:::

::: exercise 带温度的 Gumbel-max {level=2}
证明$\operatorname{arg\,max}_i(z_i/\tau + G_i)$从$\operatorname{softmax}(\mathbf{z}/\tau)$中抽样，且当$\tau\to0$时趋于$\operatorname{arg\,max}_iz_i$（设最大值唯一）。$\operatorname{arg\,max}_i(z_i + \tau G_i)$是同一条规则吗？
::: solution
以$a_i = z_i/\tau$应用[[#prop-gumbel]]。$\tau\to0$时，最大与次大缩放 logits 之差$(z_{(1)} - z_{(2)})/\tau$无界增长，而噪声$G_i - G_j$的分布固定，于是噪声翻转排序的概率趋于$0$。而$\operatorname{arg\,max}_i(z_i + \tau G_i) = \operatorname{arg\,max}_i(z_i/\tau + G_i)$，因为所有项同乘$1/\tau > 0$保持 argmax：这是同一条规则，只不过写成了在$\tau = 0$处也有意义的形式。
:::
:::

::: exercise 截断之下的校准 {level=3}
一个校准的模型用三个选项回答问题，概率为$0.6$、$0.3$和$0.1$。(a) $p = 0.85$的 top-$p$采样以多大频率产出每个答案？(b) 在许多这样的同分布问题上，采出的答案有多大比例是正确的，与$\tau = 1$不加截断相比如何？(c) 用两个独立样本的一致率来估计置信度的用户，在两种情形下各会看到什么？
::: solution
(a) 累计$0.6, 0.9$：核是前两个答案，归一化为$2/3$和$1/3$。(b) 模型校准，故答案$i$以概率$p_i$正确。不加截断：准确率$\sum_ip_i^2 = 0.36 + 0.09 + 0.01 = 0.46$。截断后：$\tfrac23\cdot0.6 + \tfrac13\cdot0.3 = 0.5$。截断在这里提高了准确率（它剔除了一个偏错选项）——而总是选第一个的贪心解码会给$0.6$。(c) 两个样本一致的概率是$\sum_iq_i^2$：不加截断$0.46$，截断后$\tfrac49 + \tfrac19 = 0.556$。一致率上升了，尽管模型的知识没有变：在截断之下测得的样本一致率夸大了确定性，采样参数一变，任何施加于它的阈值都必须重新校准。
:::
:::

::: exercise 玩具内核中的批依赖 {level=3}
写一个纯 Python 的“矩阵—向量内核”：每个输出算成长度$d = 1024$的点积，每个乘积和每个部分和都舍入到 float32（用 `struct` 模拟），并把归约切成若干块先求和、再合并：批量只有一个请求时用一整块，否则以$64$为一块（好比内核对不同批量可能用不同的归约切分）。做$200$轮固定种子的试验，每轮$8$条几乎相同的权重行（使$8$个 logits 接近平局），数一数两种情形下有多少输出不同、argmax 翻转多少次。
::: solution
```python
import random, struct
f32 = lambda x: struct.unpack('f', struct.pack('f', x))[0]
def dot(w, x, c):                      # 分块归约，全程舍入到 float32
    total = 0.0
    for i in range(0, len(w), c):
        part = 0.0
        for a, b in zip(w[i:i+c], x[i:i+c]): part = f32(part + f32(a * b))
        total = f32(total + part)
    return total
rng = random.Random(0); d = 1024; flips = differ = 0; trials = 200
for trial in range(trials):
    x = [rng.gauss(0, 1) for _ in range(d)]
    base = [rng.gauss(0, 1) for _ in range(d)]
    W = [[b + 1e-5 * rng.gauss(0, 1) for b in base] for _ in range(8)]   # 8 条几乎相同的行
    alone   = [dot(w, x, d) for w in W]      # 批量为 1：单块
    batched = [dot(w, x, 64) for w in W]     # 批量更大：切分归约
    differ += sum(a != b for a, b in zip(alone, batched))
    flips += max(range(8), key=alone.__getitem__) != max(range(8), key=batched.__getitem__)
print(f"outputs that differ: {differ}/{8 * trials}, argmax flips: {flips}/{trials}")
```

Output:

```
outputs that differ: 1502/1600, argmax flips: 8/200
```

几乎每个输出在两种归约顺序下的末位都不同，$4\%$的试验里选中的词元变了——在真实解码中，那就是两次生成彻底分道扬镳的起点。解药是一种无论批量多大都用同一归约顺序的内核——批不变性（[[#def-batch-invariance]]）。只提高精度只能让翻转更少发生而已。
:::
:::
