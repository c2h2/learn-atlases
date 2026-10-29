搜索引擎过去靠匹配词语。查询 *how do I reset my password*（如何重置我的密码）会找到包含 *reset* 与 *password* 的文档，却错过标题为 *Recovering access to your account*（找回账户访问权限）的帮助页。要按含义查找文本，我们需要一种表示：含义相近的文本在其中彼此靠近，无论它们用了什么词。**文本嵌入**正是这样一种表示：一个把句子、段落或问题映成向量的函数，其训练目标是让两个向量的相似度反映两段文本的相关程度。

词嵌入（[[text-and-language/word-embeddings]]）对单个词做过这件事。本章把这一思想扩展到整段文本。它解释为什么预训练 Transformer 的上下文向量开箱即用地充当句子嵌入效果很差，用 InfoNCE 损失做**对比训练**如何修复这一点，以及主导神经检索的两种架构：**双编码器**独立嵌入查询与文档，使文档可以提前建索引；**交叉编码器**把查询与文档放在一起读，打分更准，但贵得多。最后讲嵌入如何评测、挑选时要留心什么。下一章 [[prompting-rag/vector-search]] 讲如何在数以百万计的这类向量上快速检索。

## 从词元向量到文本向量 {#sec-pooling}

BERT 这样的编码器（[[transformers/architecture-families#def-encoder]]）把一段 $T$ 个词元的文本变成 $T$ 个上下文向量 $\mathbf{h}_1, \dots, \mathbf{h}_T\in\R^{d}$。整段文本的单个向量由**池化**得到。

::: definition 文本嵌入与池化 {#def-embedding}
**文本嵌入模型**是一个函数 $f\colon\text{文本}\to\R^{d}$。对产生 $\mathbf{h}_1, \dots, \mathbf{h}_T$ 的编码器，常用的池化选择有：取特殊首词元（**CLS 池化**）的向量、取**平均** $\frac1T\sum_t\mathbf{h}_t$，以及对解码器模型取**最后一个词元**的向量——它是唯一看过整段文本的词元（[[transformers/architecture-families#sec-decoders]]）。嵌入通常归一化为单位长度 $f(x)/\lVert f(x)\rVert$，两段文本用**余弦相似度**比较（[[math-for-ml/vectors-matrices#eq-cosine]]），对单位向量而言它就是点积。
:::

::: example 手算平均池化 {#ex-pooling}
一段两个词元的文本，上下文向量为 $(1, 0, 2)$ 与 $(3, 2, 0)$；另一段三个词元的文本，向量为 $(2, 1, 1)$、$(0, 1, 3)$ 与 $(1, 1, 2)$。计算二者平均池化后的嵌入及余弦相似度。
::: solution
均值分别为 $(2, 1, 1)$ 与 $(1, 1, 2)$。点积为 $2 + 1 + 2 = 5$，两者范数都是 $\sqrt6$，故余弦为 $5/6 = 0.833$。平均池化让长度不同的文本可比，且每个词元都有贡献；CLS 池化只各取一个向量、无视其余，除非训练已教会 CLS 位置做总结。
:::
:::

对预训练模型的向量直接池化，得到的嵌入很差。Reimers 与 Gurevych（2019）发现，平均化的 BERT 向量以及 BERT 的 CLS 向量，在语义相似度基准上的表现竟不如简单地平均 GloVe 词向量。原因之一是**各向异性**：Ethayarajh（2019）表明，预训练模型的上下文向量占据一个狭窄的锥体，以至于随机取来的两段文本本来就有很高的余弦相似度，而承载语义的差异与所有向量共有的部分相比显得很小。掩码语言建模从未要求**距离**有意义的向量。

::: example 一个共享方向淹没了语义 {#ex-anisotropy}
两段文本的嵌入为 $\mathbf{u} = \mathbf{c} + \mathbf{a}$ 与 $\mathbf{v} = \mathbf{c} + \mathbf{b}$，其中 $\mathbf{c}$ 是所有文本共享的方向、$\lVert\mathbf{c}\rVert = 2$，$\mathbf{a}$、$\mathbf{b}$ 是承载各自内容的单位向量，彼此正交且与 $\mathbf{c}$ 正交。计算它们的余弦，再计算减去均值方向 $\mathbf{c}$ 之后的余弦。
::: solution
$\mathbf{u}\cdot\mathbf{v} = \lVert\mathbf{c}\rVert^2 = 4$，且 $\lVert\mathbf{u}\rVert = \lVert\mathbf{v}\rVert = \sqrt{4 + 1} = \sqrt5$，故余弦为 $4/5 = 0.8$，尽管两段内容毫不相干。中心化之后，向量变为 $\mathbf{a}$ 与 $\mathbf{b}$，余弦为 $0$。事后补救如中心化与白化有帮助，但为这一用途直接训练嵌入的帮助大得多。
:::
:::

## 对比训练 {#sec-contrastive}

一个嵌入应当做到什么？对查询 $q$ 与能回答它的段落 $d^+$，相似度 $s(q, d^+)$ 应当大于对不能回答的段落 $d^-$ 的 $s(q, d^-)$。**对比学习**把这变成一个分类问题：在一个正例与若干负例之中，认出那个正例。

::: definition InfoNCE 损失 {#def-infonce}
设 $s(q, d) = f(q)^\top g(d)$ 为相似度分数（嵌入单位归一化时即余弦），$\tau > 0$ 为**温度**，$d_0 = d^+, d_1, \dots, d_n$ 是查询 $q$ 的一个正例段落与 $n$ 个负例。**InfoNCE 损失**为

$$
\mathcal{L}(q) = -\log\frac{\exp\!\big(s(q, d^+)/\tau\big)}{\sum_{j=0}^{n}\exp\!\big(s(q, d_j)/\tau\big)},
$$ {#eq-infonce}

再对训练批次中的所有查询取平均。
:::

InfoNCE 是化了妆的交叉熵。把 $n + 1$ 个候选看成一个 softmax 分类器的类别，其 logits 是缩放后的相似度 $s(q, d_j)/\tau$，正确类别是 $0$；那么 [[#eq-infonce]] 恰是那个分类器的交叉熵损失（[[ml-fundamentals/logistic-regression#def-softmax-regression]]）。其导数随之而来。

::: proposition InfoNCE 的梯度 {#prop-infonce-grad}
设 $p_j = \operatorname{softmax}\big(s(q, d_0)/\tau, \dots, s(q, d_n)/\tau\big)_j$。则

$$
\frac{\partial\mathcal{L}}{\partial s(q, d^+)} = -\frac{1 - p_0}{\tau}, \qquad \frac{\partial\mathcal{L}}{\partial s(q, d_j)} = \frac{p_j}{\tau}\quad(j\ge1).
$$

损失把正例的分数往上推，把每个负例的分数往下压，压力与模型当前赋予它的概率成正比：本来就得分很低的负例几乎得不到梯度。
:::

::: proof
记 $z_j = s(q, d_j)/\tau$。则 $\mathcal{L} = -z_0 + \log\sum_k e^{z_k}$，于是 $\partial\mathcal{L}/\partial z_j = -\mathbb{1}[j = 0] + e^{z_j}/\sum_ke^{z_k} = p_j - \mathbb{1}[j = 0]$。由链式法则 $\partial z_j/\partial s(q, d_j) = 1/\tau$，即得两个公式。
:::

::: example 带困难负例的 InfoNCE {#ex-infonce}
某个查询与它的正例余弦相似度为 $0.8$，与三个负例分别为 $0.5$、$0.3$、$0.1$。计算 $\tau = 1$ 与 $\tau = 0.05$ 时的损失。再设第一个负例的相似度不是 $0.5$ 而是 $0.85$，在 $\tau = 0.05$ 下重新计算损失与梯度。
::: solution
$\tau = 1$ 时，$(0.8, 0.5, 0.3, 0.1)$ 的 softmax 为 $(0.352, 0.260, 0.213, 0.175)$，$\mathcal{L} = -\ln0.352 = 1.045$，与瞎猜的水平 $\ln4 = 1.386$ 相差不远：余弦被限制在 $[-1, 1]$ 内时，温度为 $1$ 无法让 softmax 变得自信。$\tau = 0.05$ 时 logits 为 $(16, 10, 6, 2)$，$p_0 = 0.9975$，$\mathcal{L} = 0.0025$：这个查询已经解决。换上困难负例后 logits 变为 $(16, 17, 6, 2)$，$p = (0.269, 0.731, 0.00001, \dots)$，$\mathcal{L} = 1.313$。由 [[#prop-infonce-grad]]，正例分数上的梯度为 $-(1 - 0.269)/0.05 = -14.6$，困难负例上为 $0.731/0.05 = 14.6$，其余两个几乎为零。几乎全部学习信号来自那个被模型与正例混淆的负例。
:::
:::

::: widget plot
f: -log(exp(x/t)/(exp(x/t) + n))
x: -1, 1
y: 0, 6
sliders: t=0.1:0.02:1:0.01; n=7:1:255:1
labels: $\mathcal{L}$ against the margin $s^+ - s^-$
caption: InfoNCE 损失对"正例战胜 $n$ 个得分相同的负例的间隔 $s(q, d^+) - s(q, d^-)$"的曲线，温度为 $\tau$。有 $n$ 个负例时，间隔为零的代价是 $\log(n + 1)$。温度小时，间隔一旦为正损失几乎为零，一旦为负则几乎线性、斜率为 $1/\tau$——接近合页损失。温度大时到处斜率平缓：即便余弦允许的最大间隔 $2$，也留下 $\log(1 + ne^{-2/\tau})$ 的损失，$\tau = 1$、$n = 7$ 时为 $0.67$。
:::

两个实用点子让对比训练真正有效。

**批内负例。**在 $B$ 个（查询，正例）对组成的批次里，其余 $B - 1$ 个查询的正例可直接充当每个查询的负例，不花额外的编码代价：分数矩阵 $f(q_i)^\top g(d_j)$（$B\times B$）用一次矩阵乘即可算出，损失是每一行以对角线为正确类别的交叉熵。更大的批次提供更多负例，这是嵌入模型用数千对样本做批训练的原因之一。

**困难负例。**随机负例大多太容易，由 [[#prop-infonce-grad]]，容易的负例教不了什么。**困难负例**——看起来相关实则不然的段落，比如关键词检索的前几名里那些不含答案的段落——才提供梯度。挑选它们必须小心：一个实际上能回答查询的"负例"（**假负例**，由于相关性标注不完整而常见）会训练模型把正确答案推开。

::: remark
Oord et al.（2018）提出了 InfoNCE 这个名字，并证明以合适方式取 $N = n + 1$ 个候选时，$\log N - \mathcal{L}$ 是查询与正例之间互信息（[[math-for-ml/information-theory#def-mutual]]）的下界；Poole et al.（2019）分析了这一族下界。一个推论是这个界永不可能超过 $\log N$，这也是负例多多益善的又一个理由。
:::

下面这段代码计算批内 InfoNCE 损失及其对查询嵌入的梯度，对梯度做数值校验，并走几步梯度下降。

```python
import math, random
random.seed(0)
B, d, tau = 4, 8, 0.1
def unit(v):
    n = math.sqrt(sum(x*x for x in v)); return [x/n for x in v]
D = [unit([random.gauss(0, 1) for _ in range(d)]) for _ in range(B)]      # B x d 段落
Q = [unit([a + random.gauss(0, 1) for a in D[i]]) for i in range(B)]      # 带噪查询
dot = lambda a, b: sum(x*y for x, y in zip(a, b))

def loss_and_grad(Q):
    L, G = 0.0, []
    for i in range(B):                      # 查询 i：正例 D[i]，负例 D[j]，j != i
        s = [dot(Q[i], D[j]) / tau for j in range(B)]
        m = max(s); e = [math.exp(x - m) for x in s]; Z = sum(e)
        p = [x / Z for x in e]              # 对批次做 softmax
        L += -math.log(p[i]) / B
        # dL/dq_i = (1/(tau*B)) * (sum_j p_j d_j - d_i)
        G.append([(sum(p[j]*D[j][k] for j in range(B)) - D[i][k]) / (tau*B) for k in range(d)])
    return L, G

L, G = loss_and_grad(Q)
h = 1e-6; Qp = [row[:] for row in Q]; Qp[2][5] += h          # 有限差分校验
print(f"loss {L:.4f}  analytic dL/dq[2][5] {G[2][5]:.6f}  numeric {(loss_and_grad(Qp)[0]-L)/h:.6f}")
for step in range(1, 31):                                    # 对查询做梯度下降
    L, G = loss_and_grad(Q)
    Q = [unit([q - 0.05*g for q, g in zip(Q[i], G[i])]) for i in range(B)]
    if step % 10 == 0: print(f"step {step:2d}  loss {L:.4f}")
print("chance level log B =", round(math.log(B), 4))
```

```text
loss 1.1389  analytic dL/dq[2][5] 0.277884  numeric 0.277885
step 10  loss 0.0494
step 20  loss 0.0268
step 30  loss 0.0189
chance level log B = 1.3863
```

梯度公式 $\frac{1}{\tau B}\big(\sum_jp_j\mathbf{d}_j - \mathbf{d}_i\big)$ 就是 [[#prop-infonce-grad]] 配上 $\partial s/\partial\mathbf{q}_i = \mathbf{d}_j/\tau$：它把每个查询推向它的正例、推离候选者的概率加权平均。在真实模型里，梯度会继续流入编码器的参数，段落也随之移动。

## 双编码器与交叉编码器 {#sec-architectures}

编码器 $f$ 与 $g$ 从何而来？两种设计的工作分配方式截然不同。

::: definition 双编码器与交叉编码器 {#def-bi-cross}
**双编码器**（bi-encoder，亦称双塔编码器）把查询与文档分开嵌入，$s(q, d) = f(q)^\top g(d)$，其中 $f = g$（**孪生**网络，用于对称任务），或使用分开的、加不同前缀提示的编码器（用于问答这类非对称任务）。**交叉编码器**把拼接串 `[query] [SEP] [document]` 喂给一个 Transformer，再把它输出的表示映成相关性分数 $s(q, d) = h(\operatorname{Enc}(q\oplus d))$，于是每个查询词元都能注意每个文档词元。
:::

双编码器的相似度是两个向量的点积，可以在查询到来**之前**就算好：整个语料库嵌入一遍、存下向量，查询时只需嵌入查询、再检索最近的文档向量。交叉编码器一起看查询与文档，因而更准——它能核对查询里特定的实体、日期或否定是否与文档相符——但它对每个（查询，文档）对都要跑一整个 Transformer，什么也无法预计算。

::: example 交叉编码器的代价 {#ex-cost}
一个语料库有一百万个段落。交叉编码器为（查询，段落）对打分（按批次处理）需 $1$ ms 的加速卡时间；双编码器嵌入一个查询需 $1$ ms，而把一个 $768$ 维查询向量与全部存储的段落向量比较需要 $7.7\times10^8$ 次乘加。每个查询各花多长时间？实践中如何把两者结合？
::: solution
交叉编码器扫全库：$10^6\cdot1$ ms $= 1000$ 秒，每次查询约 $17$ 分钟，绝不现实。双编码器：嵌入 $1$ ms 加上 $10^6\cdot768 = 7.7\times10^8$ 次乘加，在现代处理器上即便硬算也只要几毫秒，配上索引更快（[[prompting-rag/vector-search]]）。标准流水线两者都用：双编码器（或关键词检索）**检索**出前 $100$ 个左右候选，交叉编码器对它们**重排序**，按 $100\cdot1$ ms $= 0.1$ s 计。重排序在 [[prompting-rag/retrieval-augmented-generation]] 中展开。
:::
:::

**Sentence-BERT。**Reimers 与 Gurevych（2019）让 BERT 成为实用的双编码器。他们把 BERT 放进孪生网络，对输出做平均池化，在自然语言推理对（SNLI 与 MultiNLI，约一百万条标有蕴含、矛盾或中立的句子对）上用分类器微调——分类器接在 $(\mathbf{u}, \mathbf{v}, \lvert\mathbf{u} - \mathbf{v}\rvert)$ 上——之后用池化向量配余弦相似度。在一万个句子里找最相似的一对，用 BERT 作交叉编码器要给 $\binom{10{,}000}{2} = 49{,}995{,}000$ 对打分，他们估计约需 $65$ 小时；用 SBERT 只需 $10{,}000$ 次编码加一个余弦矩阵，约 $5$ 秒。

**稠密段落检索。**Karpukhin 等人（2020）为开放域问答训练了双编码器——两个 BERT-base 编码器，一个编问题、一个编 $100$ 词的维基百科段落，$768$ 维向量用点积比较——用带批内负例的 InfoNCE，外加每个问题一个取自 BM25 检索首位的困难负例。在 Natural Questions 上，$78.4\%$ 问题的正确段落出现在检索前 $20$ 名之内，BM25 关键词检索（[[prompting-rag/vector-search#sec-bm25]]）则为 $59.1\%$；在前 $100$ 名中两个数字是 $85.4\%$ 与 $73.7\%$。DPR 成了最早的检索增强生成器（[[prompting-rag/retrieval-augmented-generation]]）所用的检索器。

::: example DPR 批次中的负例 {#ex-dpr-batch}
DPR 的训练批次含 $B$ 个问题，每个问题带一个正例段落和一个 BM25 困难负例段落，批次里的每个段落都是每个问题的候选。当 $B = 128$，每个问题看到多少候选、多少负例？批次编码多少段落？
::: solution
批次含 $2B = 256$ 个段落，每个编码一次。每个问题把全部 $256$ 个当候选：它自己的正例和 $255$ 个负例——另外 $127$ 个问题的正例、它自己的困难负例、以及 $127$ 个别人的困难负例。分数矩阵是 $128\times256$，一次矩阵乘。
:::
:::

后来的模型把这些思想做了扩展。SimCSE（Gao et al., 2021）表明，即便把同一个句子用不同的 dropout 掩码两次通过编码器，也能产生有用的正例对；E5（Wang et al., 2022）及类似模型先在数亿条自然配对的文本（标题与正文、问题与答案）上做对比预训练，再在带标签数据上微调；能遵循指令的嵌入器（Su et al., 2023）把任务描述连同文本一起接收；而从 2023–2024 年起，经过对比微调、用最后词元或平均池化的解码器大模型也成了有竞争力的嵌入器。俄罗斯套娃表示学习（Matryoshka representation learning，Kusupati et al., 2022）训练的嵌入，其前 $k$ 个坐标对若干 $k$ 而言本身就是一只好嵌入，于是可以截断向量以节省内存。

::: warning 查询和文档不是同一种文本
许多检索嵌入器是**非对称的**：它们训练时一边是短问题、另一边是段落，查询常带 `query: ` 这样的前缀或一条指令。把查询按模型期望文档的方式嵌入（或漏掉模型期望的前缀）会明显拉低检索质量，而用非对称模型比较两个查询，测量的东西根本不是它被训练来测的。读模型的文档，并在你自己的查询上做评测。
:::

::: quiz
为什么双编码器能在几毫秒内检索一百万篇文档，而交叉编码器不能？
- [ ] 双编码器用更小的 Transformer。
- [x] 文档向量提前一次算好存下，查询只需一次编码加快速的向量比较；交叉编码器必须在每个（查询，文档）对上运行。
- [ ] 交叉编码器无法在加速卡上运行。
- [ ] 双编码器只比较每段文本的第一个词元。
::: solution
双编码器的分数分解为 $f(q)^\top g(d)$，所以 $g(d)$ 可预计算存储，查询只编码一次。交叉编码器的分数依赖查询与文档的联合编码，无法预计算。两者可以用同样规模的 Transformer；差别在架构。
:::
:::

## 评测与挑选嵌入 {#sec-mteb}

嵌入好不好总是**对某个任务**而言：为问题检索段落、给工单聚类、发现重复提问、配一个轻量模型做分类。**大规模文本嵌入基准**（MTEB；Muennighoff et al., 2023）收集了 $58$ 个数据集、$8$ 种任务类型——平行文本挖掘、分类、聚类、配对分类、重排序、检索、语义文本相似度与摘要——覆盖 $112$ 种语言，发现没有任何一种嵌入方法在所有任务上都是最好的。它的公开榜单成了标准参照；多语版本 MMTEB（2025）把它扩展到 $500$ 多种任务。截至 2026 年，榜首更迭频繁，许多名列前茅的模型是数十亿参数的解码器大模型搭成的，而且榜单所用的评测集可能与模型的训练数据重叠——所以名列前茅只是一个起点，不是结论。

挑选嵌入模型是一个工程权衡：

- **在你自己的数据上的质量。**建一个只含你自己的查询与相关文档的小标注集，直接测量检索质量（[[prompting-rag/rag-evaluation]]）；公共基准很少契合法律、医学或源代码这样的领域。
- **维数与存储。**内存随 $d$ 线性增长；量化与截断用质量换体积。
- **速度。**每篇文档要在建索引时编码，每个查询要在检索时编码；大模型两头都抬高。
- **上下文长度与语言。**超过模型最大输入长度的文本会被悄悄截断；多语检索需要覆盖相关语言的模型。
- **稳定性。**更换嵌入模型会使索引作废：每个存储的向量都必须重算，因为不同模型的向量不可比较。

::: example 索引的存储 {#ex-storage}
一千万个段落用 $1024$ 维模型嵌入。这些向量用 32 位浮点需要多少内存？16 位浮点呢？截断（套娃式）到 $256$ 维再存 16 位浮点呢？
::: solution
$10^7\cdot1024\cdot4$ 字节 $= 4.1\times10^{10}$ 字节，约 $41$ GB；16 位浮点是它的一半，$20.5$ GB；截断后 $10^7\cdot256\cdot2 = 5.1\times10^9$ 字节，约 $5$ GB。乘积量化（[[prompting-rag/vector-search#sec-pq]]）还能进一步压缩到每个向量几十字节。
:::
:::

::: history
文档的分布式表示可追溯到潜在语义分析（Deerwester et al., 1990），它用词项–文档矩阵的截断 SVD（[[math-for-ml/matrix-decompositions#sec-svd]]）嵌入文档。神经句子嵌入紧随 word2vec 而来：段落向量（Le 和 Mikolov, 2014）、skip-thought 向量（Kiros et al., 2015）、在自然语言推理上训练的 InferSent（Conneau et al., 2017），以及通用句子编码器（Universal Sentence Encoder，Cer et al., 2018）。对比目标发展自度量学习与自监督视觉；Oord et al.（2018）为 InfoNCE 损失命名。Sentence-BERT（Reimers 和 Gurevych, 2019）让 BERT 成为实用的句子编码器，DPR（Karpukhin et al., 2020）则表明训练过的稠密检索在开放域问答上胜过 BM25。用 BERT 做交叉编码器重排序由 Nogueira 和 Cho（2019）引入。此后是 SimCSE（2021）、大规模对比预训练（E5, 2022 等）、MTEB 基准（Muennighoff et al., 2023）与基于大模型的嵌入器（2023 年起）。
:::

::: summary
- 文本嵌入把文本映成向量，它与其他向量的相似度反映相关程度；池化（平均、CLS 或最后词元）把词元向量变成一个向量，通常归一化后用余弦比较。
- 预训练编码器不再进一步训练就给不出好嵌入；其向量各向异性，共享一个淹没语义的方向。
- 用 InfoNCE 做对比训练，就是以缩放相似度为 logits、在一个正例与许多负例上做交叉熵；其梯度集中在困难负例上，温度控制集中的尖锐程度。
- 批内负例廉价地提供大量负例；困难负例提供有用的梯度；假负例是隐患。
- 双编码器预计算文档向量、检索快；交叉编码器把查询与文档放在一起读、更准，但每对要付一次前向传播。用前者检索，用后者重排序。
- Sentence-BERT（2019）与 DPR（2020）确立了这一路线；截至 2026 年 MTEB 是标准基准，但一定要在你自己的数据上测量。
:::

## 习题

::: exercise 索引的存储 {level=1 check="4.096"}
一百万个 $1024$ 维的 32 位浮点嵌入占多少吉字节（$10^9$ 字节）？
::: solution
$10^6\cdot1024\cdot4 = 4.096\times10^9$ 字节，即 $4.096$ GB。
:::
:::

::: exercise 批内负例 {level=1 check="255"}
一个由 $256$ 个（查询，正例）对组成的批次只用批内负例训练。每个查询看到多少个负例？
::: solution
其余 $255$ 个查询的正例：$B - 1 = 255$。
:::
:::

::: exercise 中等温度下的 InfoNCE {level=1 check="0.056"}
用 [[#ex-infonce]] 中的相似度 $0.8$（正例）与 $0.5$、$0.3$、$0.1$，计算 $\tau = 0.1$ 时的 InfoNCE 损失，保留三位小数。
::: solution
logits 为 $(8, 5, 3, 1)$。正例的 softmax 概率为 $e^8/(e^8 + e^5 + e^3 + e^1) = 2981.0/(2981.0 + 148.4 + 20.1 + 2.7) = 0.9457$，故 $\mathcal{L} = -\ln0.9457 = 0.056$。
:::
:::

::: exercise 交叉编码器的对数 {level=1 check="1249975000"}
要在 $50{,}000$ 个句子里找出最相似的一对，交叉编码器必须给多少个无序对打分？
::: solution
$\binom{50{,}000}{2} = 50{,}000\cdot49{,}999/2 = 1{,}249{,}975{,}000$，是一万个句子情形的二十五倍——计数按二次增长。
:::
:::

::: exercise 更强的共享方向 {level=2 check="0.9"}
把 [[#ex-anisotropy]] 中的 $\lVert\mathbf{c}\rVert = 2$ 换成 $\lVert\mathbf{c}\rVert = 3$ 重算一遍。当共享分量增大时，不相关文本的余弦会发生什么？
::: solution
$\mathbf{u}\cdot\mathbf{v} = 9$ 且 $\lVert\mathbf{u}\rVert^2 = \lVert\mathbf{v}\rVert^2 = 10$，故余弦为 $0.9$。一般地，$\lVert\mathbf{c}\rVert = c$ 时它是 $c^2/(c^2 + 1)$，趋于 $1$：当共享分量占主导，所有文本都长得像，余弦之间的差变得微小。
:::
:::

::: exercise 正例上的梯度 {level=2 check="-14.62"}
在 [[#ex-infonce]] 的困难负例情形（logits $16, 17, 6, 2$）中，用未取整的概率计算 $\partial\mathcal{L}/\partial s(q, d^+)$，保留两位小数。
::: solution
$p_0 = e^{16}/(e^{16} + e^{17} + e^{6} + e^{2}) = 0.26894$。由 [[#prop-infonce-grad]]，$\partial\mathcal{L}/\partial s(q, d^+) = -(1 - 0.26894)/0.05 = -14.62$。
:::
:::

::: exercise 小温度极限 {level=3}
设 $\Delta = \max_{j\ge1}s(q, d_j) - s(q, d^+)$。证明 $\tau\to0$ 时 $\tau\mathcal{L}\to\max(0, \Delta)$。解释这个极限，并说明为什么在极小的温度下训练，表现得像在最难的那个负例上优化合页损失。
::: solution
记 $s_j = s(q, d_j)$，$M = \max_j s_j$ 对所有候选（含正例）取。则 $\tau\mathcal{L} = -s_0 + \tau\log\sum_je^{s_j/\tau} = -s_0 + M + \tau\log\sum_je^{(s_j - M)/\tau}$。最后的和式介于 $1$（$s_j = M$ 的那一项）与 $n + 1$ 之间，故末项介于 $0$ 与 $\tau\log(n + 1)\to0$ 之间。于是 $\tau\mathcal{L}\to M - s_0 = \max(0, \Delta)$。正例战胜所有负例时极限为零，否则它恰等于最难的那个负例领先的幅度：一个在最难负例上间隔为零的合页损失。温度极小时只有得分最高的负例得到梯度——对精确率有用，但噪声大，且当那个负例是假负例时反而有害；适中的温度（实践中用余弦分数时约 $0.01$–$0.1$）把梯度分摊到几个困难负例上。
:::
:::

::: exercise 一个对称的损失 {level=2}
批内 InfoNCE 把 $B\times B$ 分数矩阵的每一行当作"在段落中给查询分类"。写出对称变体，让每个段落也在查询中分类（用于图像与文本配对嵌入的那种），并说明它对文本检索何时适用。
::: solution
记 $S_{ij} = f(q_i)^\top g(d_j)/\tau$：

$$
\mathcal{L} = \frac{1}{2B}\sum_{i=1}^{B}\Big[-\log\frac{e^{S_{ii}}}{\sum_je^{S_{ij}}} - \log\frac{e^{S_{ii}}}{\sum_je^{S_{ji}}}\Big],
$$

即按行（查询到段落）与按列（段落到查询）两个交叉熵的平均。当检索的两个方向都会用到，或两侧可以互换（重复提问检测、同义句挖掘）时，它适用。只做查询到段落的检索时，测试时只有按行的那项要紧，不过按列的那项仍可作为正则项。
:::
:::

::: exercise 为重排序器做预算 {level=2}
一个搜索系统必须在 $300$ ms 内回答。双编码器检索耗时 $20$ ms，交叉编码器按批次为 $32$ 个（查询，段落）对打分耗时 $40$ ms。在留出 $60$ ms 给其余环节的前提下，预算内能重排序多少个候选？为什么重排序更少的候选反而更好？
::: solution
重排序可用 $300 - 20 - 60 = 220$ ms；即 $5$ 个 $32$ 对的批次（$200$ ms），共 $160$ 个候选。更少可能更好，因为重排序的收益主要来自重排前几十个，长尾里很少有被第一阶段排得很低的相关段落；负载下的延迟尖峰也支持留有余量。用第一阶段在不同深度处的召回率（[[prompting-rag/rag-evaluation]]）来选深度。
:::
:::

::: exercise 穿过归一化的梯度 {level=3}
上面那段代码把查询向量当作自由变量，每步之后再归一化。若改为对无约束的 $\mathbf{u}$ 取 $\mathbf{q} = \mathbf{u}/\lVert\mathbf{u}\rVert$，证明 $\partial\mathcal{L}/\partial\mathbf{u} = \frac{1}{\lVert\mathbf{u}\rVert}\big(I - \mathbf{q}\mathbf{q}^\top\big)\,\partial\mathcal{L}/\partial\mathbf{q}$，并解释这个投影。
::: solution
映射 $\mathbf{u}\mapsto\mathbf{u}/\lVert\mathbf{u}\rVert$ 的雅可比矩阵是 $\frac{1}{\lVert\mathbf{u}\rVert}\big(I - \mathbf{q}\mathbf{q}^\top\big)$：对 $u_i/\lVert\mathbf{u}\rVert$ 关于 $u_j$ 求导得 $\delta_{ij}/\lVert\mathbf{u}\rVert - u_iu_j/\lVert\mathbf{u}\rVert^3$。该矩阵对称，故由链式法则 $\partial\mathcal{L}/\partial\mathbf{u} = \frac{1}{\lVert\mathbf{u}\rVert}(I - \mathbf{q}\mathbf{q}^\top)\partial\mathcal{L}/\partial\mathbf{q}$。这个投影去掉了梯度沿 $\mathbf{q}$ 方向的分量：改变 $\mathbf{u}$ 的长度不改变归一化后的向量，所以只有梯度中与球面相切、把 $\mathbf{q}$ 在球面上转动的部分有效果。因此基于余弦的训练让嵌入在单位球面上移动，而因子 $1/\lVert\mathbf{u}\rVert$ 意味着未归一化向量越长，学得越慢。
:::
:::
