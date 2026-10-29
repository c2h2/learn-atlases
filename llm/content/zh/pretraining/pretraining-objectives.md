预训练语言模型从原始文本中学习，不需要人工标注。文本自带监督信号：把其中一部分藏起来，让模型把藏起来的部分复原。藏哪一部分、允许模型怎样查看其余部分，就是**预训练目标（pretraining objective）**。这个选择决定了模型日后能做什么。以预测下一个词元为目标训练出的模型，既能生成文本，也能给任意文档赋予概率。以完形填空（掩码）词为目标训练出的模型，能为整个句子构建丰富的表示，却无法流畅生成。以重建被损坏的片段为目标训练出的模型，介于两者之间。

本章准确地定义各种主要目标：带教师强制（teacher forcing）的因果语言建模、掩码语言建模、片段损坏、前缀语言建模、去噪、中间填充（fill-in-the-middle），以及作为研究方向的多词元预测。我们证明两个使下一词元预测如此有吸引力的事实：链式法则把它变成对文本概率的精确建模；而最小化它的损失就是最小化文本的编码长度，所以更好的语言模型就是更好的压缩器。各目标所配套的架构已在[[transformers/architecture-families]]中介绍；困惑度及其与交叉熵的关系见[[text-and-language/perplexity]]。

## 自监督 {#sec-self-supervision}

带标注的数据很昂贵：几百万句人工标注的文本就已是一个大型数据集。无标注文本却取之不尽：仅公共网络就有数万亿词元（[[pretraining/training-data]]）。**自监督学习**从数据本身构造输入与目标，把无标注数据变成有监督的问题。

::: definition 预训练目标 {#def-objective}
设$\mathbf{x} = (x_1, \dots, x_T)$为词表$\mathcal{V}$上的一个词元序列，来自分布为$p_{\text{data}}$的语料库。**预训练目标**由一个（可随机的）**损坏**$c$指定：$c$把$\mathbf{x}$映为模型输入$\tilde{\mathbf{x}}$，并给出一组目标位置$\mathcal{T}$及目标词元$y_i$，$i \in \mathcal{T}$。模型$p_\theta$被训练去最小化目标在给定输入下的期望交叉熵，

$$
\mathcal{L}(\theta) = \E_{\mathbf{x}\sim p_{\text{data}}}\,\E_{c}\Big[-\sum_{i\in\mathcal{T}}\log p_\theta\big(y_i \mid \tilde{\mathbf{x}}, \text{第 }i\text{ 个预测可见的上下文}\big)\Big].
$$ {#eq-objective}

实践中，期望用对小型批量取平均来代替，损失再除以目标个数作归一化。
:::

本章的各个目标只在三个选择上有所不同：**藏什么**（下一个词元、随机词元、随机片段、文档的中间部分）、**每个预测允许看什么**（只看左侧、两侧都看、双向的前缀），以及**每条序列产生多少个目标**。最后一点事关效率：输入的每个词元都要花算力，所以让每个位置都成为目标的目标函数，每 FLOP 能榨出更多信号。

## 因果语言建模 {#sec-causal}

最简单的损坏是藏起未来。在位置$t$，模型看到$x_1, \dots, x_t$，必须预测$x_{t+1}$。

::: definition 因果语言建模 {#def-clm}
**因果语言模型**对每个$t$定义$\mathcal{V}$上的条件分布$p_\theta(x_t \mid x_{<t})$，其中$x_{<t} = (x_1, \dots, x_{t-1})$（当$t=1$时上下文为空，或为一个序列起始词元）。一条序列的**因果语言建模损失**是逐词元的下一词元交叉熵的平均

$$
\mathcal{L}_{\text{CLM}}(\theta; \mathbf{x}) = -\frac{1}{T}\sum_{t=1}^{T}\log p_\theta(x_t \mid x_{<t}).
$$ {#eq-clm}
:::

有两个事实使这一目标与众不同。第一，它不是近似：它精确地建模了整个序列的概率。

::: proposition 链式法则分解 {#prop-chain}
对长度$T$的序列上的任意联合分布$p$，

$$
p(x_1, \dots, x_T) = \prod_{t=1}^{T} p(x_t \mid x_{<t}),
$$ {#eq-chain}

因此$T\cdot\mathcal{L}_{\text{CLM}}(\theta; \mathbf{x}) = -\log p_\theta(\mathbf{x})$：求和后的因果损失恰是序列在模型联合分布下的负对数似然。反过来，任何一族各自都是概率分布的条件分布$p_\theta(\cdot\mid x_{<t})$，都按[[#eq-chain]]定义一个合法联合分布。
:::

::: proof
由条件概率的定义，只要右端有定义，就有$p(x_1, \dots, x_t) = p(x_t\mid x_{<t})\,p(x_1, \dots, x_{t-1})$。对$t = T, T-1, \dots, 2$依次使用并相乘，即得[[#eq-chain]]（这就是[[math-for-ml/probability#prop-chain-rule]]）。取对数把乘积变成[[#eq-clm]]中的求和。反过来的构造：令$q(\mathbf{x}) = \prod_t p_\theta(x_t\mid x_{<t})$。它非负；并且先对$x_T$求和、再对$x_{T-1}$求和，如此下去，每个内部和式$\sum_{x_t}p_\theta(x_t\mid x_{<t})$都等于$1$，所以$\sum_{\mathbf{x}}q(\mathbf{x}) = 1$。
:::

第二个事实是：这一目标有正确的最小点。只要模型类足够丰富，最好的模型就是数据分布本身。

::: proposition 交叉熵在数据分布处取最小 {#prop-minimiser}
固定上下文$x_{<t}$，设$p^\star = p_{\text{data}}(\cdot\mid x_{<t})$，$q$为$\mathcal{V}$上任意分布，则

$$
\E_{x_t\sim p^\star}\big[-\log q(x_t)\big] = H(p^\star) + D_{\mathrm{KL}}(p^\star\,\Vert\,q) \;\ge\; H(p^\star),
$$ {#eq-ce-decomp}

等号成立当且仅当$q = p^\star$。因此，期望因果损失恰在模型的每个条件分布都吻合数据的条件分布时取最小，其最小值是数据的条件熵，任何模型都无法低于它。
:::

::: proof
把$-\log q(x) = -\log p^\star(x) + \log\big(p^\star(x)/q(x)\big)$写出，在$p^\star$下取期望：第一项给出熵$H(p^\star)$，第二项给出 Kullback–Leibler 散度。由吉布斯（Gibbs）不等式（[[math-for-ml/information-theory#thm-gibbs]]），该散度非负，且仅在$q = p^\star$时为零。对上下文取的期望损失是诸如此类各项的加权和，每项可分别最小化。
:::

不可约的那部分$H(p^\star)$解释了语言模型的损失为何永远到不了零：文本本身就真不确定。缩放定律（[[scaling/scaling-laws]]）把损失建模为这个下限加上随模型规模与数据而缩小的项，训练能压低的只有后者。

### 教师强制 {#sec-teacher-forcing}

训练期间，模型的条件永远是**真实**的前文词元，而不是它自己的预测。

::: definition 教师强制 {#def-teacher-forcing}
**教师强制**在训练序列模型时，为每个$x_t$的预测馈入真实前缀$x_{<t}$作为上下文，而不管模型自己会生成什么。对长度为$T+1$的词元 id 序列，输入是前$T$个词元，目标是后$T$个词元，错开一个位置。
:::

配上因果掩码（[[transformers/multi-head-attention#def-causal-mask]]），教师强制让 Transformer 用**一次**前向传播算出全部$T$个条件分布：位置$t$的输出只依赖输入$1, \dots, t$（[[transformers/multi-head-attention#prop-causal]]），因此可以在不泄露答案的情况下与目标$x_{t+1}$比较。循环网络也用教师强制，却仍必须逐位置顺序处理（[[sequence-models/recurrent-networks]]）。这种并行性是 Transformer 在预训练中取代循环网络的很大原因。

::: example 一次训练步的形状 {#ex-shapes}
一个批次含$B = 8$条序列，每条$T+1 = 2049$个词元 id，词表大小$\lvert\mathcal{V}\rvert = 50{,}257$。给出输入、目标、logits 与损失的形状，以及批中预测目标的个数。
::: solution
输入是每行的前$2048$个 id，目标是后$2048$个：二者形状都是$(B, T) = (8, 2048)$。模型返回形状$(B, T, \lvert\mathcal{V}\rvert) = (8, 2048, 50257)$的 logits——约$8.2\times10^8$个数，bfloat16 下$1.6$ GB——这就是实现要么分块计算交叉熵、要么把它与输出层融合的原因。在目标处对 log-softmax 取值，得到形状$(8, 2048)$的逐词元损失，再平均成一个标量。每个位置都是目标：每批$8\cdot2048 = 16{,}384$个目标。
:::
:::

::: example 手算因果损失 {#ex-loss-hand}
一个模型读入四词元序列 *the cat sat down*，并赋予概率$p(\textit{the}) = 0.05$、$p(\textit{cat}\mid\textit{the}) = 0.01$、$p(\textit{sat}\mid\textit{the cat}) = 0.2$、$p(\textit{down}\mid\textit{the cat sat}) = 0.4$。计算该序列的对数概率、每词元的因果损失（纳特与比特），以及困惑度。
::: solution
由[[#prop-chain]]，$\log p(\mathbf{x}) = \ln0.05 + \ln0.01 + \ln0.2 + \ln0.4 = -2.996 - 4.605 - 1.609 - 0.916 = -10.127$纳特，于是$p(\mathbf{x}) = 4\times10^{-5}$（确实$0.05\cdot0.01\cdot0.2\cdot0.4 = 4\times10^{-5}$）。每词元损失为$10.127/4 = 2.532$纳特，即$2.532/\ln2 = 3.652$比特（由未四舍五入的$2.5317$纳特算出）。困惑度为$e^{2.532} = 12.6$：平均而言，模型的不确定程度等同于在约$12.6$个词元之间均匀选择。
:::
:::

::: warning 教师强制掩盖了模型自己的错误
训练损失低，意味着**上下文是真实文本时**模型预测下一个词元预测得好。生成时，上下文是模型自己的输出，其中可能包含训练时从未见过的错误；这种不匹配称为**暴露偏差**（exposure bias，Ranzato 等，2016）。让模型在自己的样本上训练的方案（如课程采样，Bengio 等，2015）确实存在，但大语言模型的预训练用的就是朴素的教师强制，而暴露偏差在大规模下影响几何仍有争论。不要把低困惑度读作长生成文本必然保持连贯的保证。
:::

### 把下一词元预测看作压缩 {#sec-compression}

香农（Shannon）的信源编码定理（[[math-for-ml/information-theory#thm-source-coding]]）说：对服从分布$p$的符号，最好的码平均为符号$x$花费约$-\log_2 p(x)$比特，而算术编码（arithmetic coding）能把整个消息的开销压到只差几个比特。把它连同语言模型逐词元地用，因果损失就成了一种码长。

::: proposition 损失等于码长 {#prop-compression}
用因果模型$p_\theta$配合算术编码对$T$个词元的序列$\mathbf{x}$编码，编码器与解码器都运行模型以获得每个条件分布。编码长度至多为$-\log_2 p_\theta(\mathbf{x}) + 2$比特，即$T\cdot\mathcal{L}_{\text{CLM}}/\ln 2 + 2$比特。若文本有$n_{\text{bytes}}$个字节，则压缩率为

$$
\text{每字节比特数} = \frac{\mathcal{L}_{\text{CLM}}}{\ln 2}\cdot\frac{T}{n_{\text{bytes}}}.
$$ {#eq-bpb}
:::

::: proof
用模型概率$q(\mathbf{x})$作算术编码，把消息对应到$[0, 1)$内宽度为$q(\mathbf{x})$的一个区间，而任何宽度为$w$的区间都包含一个至多有$\lceil-\log_2 w\rceil + 1 \le -\log_2 w + 2$个二进制位的二进制小数，它可以唯一地标识这条消息。取$q(\mathbf{x}) = p_\theta(\mathbf{x}) = \prod_tp_\theta(x_t\mid x_{<t})$（由[[#prop-chain]]），区间宽度就是$p_\theta(\mathbf{x})$，且由[[#eq-clm]]，$-\log_2p_\theta(\mathbf{x}) = T\mathcal{L}_{\text{CLM}}/\ln2$。解码器能重建同样的区间，因为它对已经解出的词元运行同一个模型。除以字节数即得[[#eq-bpb]]。
:::

每字节比特数是公平比较不同分词器下模型的办法：每词元的损失取决于一个词元装了多少文本（[[text-and-language/tokenisation]]），而按原始文本每字节的损失则不然。Delétang 等（2024）把大语言模型用作包括图像与音频（按字节馈入）在内的通用压缩器，让压缩这一视角变得具体。这一视角还解释了为什么下一词元预测能教会模型那么多东西：要把关于化学、翻译或程序的文本压缩好，模型就必须抓住化学、翻译与编程的规律。这是预期它能学到东西的一个理由，而不是某种特定能力必然出现的证明。

::: widget plot
f: -log2(x)
x: 0.001, 1
y: 0, 10
points: 0.5,1; 0.25,2; 0.125,3; 0.01,6.644
labels: code length $-\log_2 p$ in bits
caption: 模型赋予概率$p$的词元的理想码长。以$\frac12$的概率被预测出的词元花费一比特，概率$\frac18$的词元花费三比特，而模型认为几乎不可能的词元（$p = 0.01$）花费$6.6$比特。这条曲线在文本上的平均就是比特计的因果损失，所以训练模型提高实际出现的下一个词元的概率，就是在训练它压缩。
:::

::: example 每字节比特数 {#ex-bpb}
一个模型在英语文本上达到每词元$2.0$纳特的验证损失，它的分词器平均每个词元对应$4.2$个字节。它的压缩率合每字节多少比特？与在英语文本上通常能达到每字节约$2$到$3$比特的通用压缩器相比如何？
::: solution
$2.0/\ln2 = 2.885$比特每词元，由[[#eq-bpb]]，$2.885/4.2 = 0.687$比特每字节——大约比典型通用压缩器好三到四倍。这个比较并不完全公平，因为解码器还得保存整个模型，那是好几个 GB；压缩视角说的是模型预测得有多好，并不是存储文件的实用办法。
:::
:::

### 一个极小的因果语言模型 {#sec-code}

下面的程序训练最小的因果语言模型——一个**二元模型**（bigram），上下文只有前一个字符——语料是狄更斯（Dickens）的一段公版文字，办法是对[[#eq-clm]]的损失配合教师强制做梯度下降。一张$V\times V$的 logits 表$W$给出$p_\theta(x_{t+1}\mid x_t) = \operatorname{softmax}(W_{x_t,:})$，交叉熵对 logits 的梯度是预测分布减去 one-hot 目标（[[math-for-ml/gradients#prop-softmax-ce]]）。

```python
import math, random

text = ("it was the best of times, it was the worst of times, it was the age of "
        "wisdom, it was the age of foolishness, it was the epoch of belief, it was "
        "the epoch of incredulity, it was the season of light, it was the season of "
        "darkness, it was the spring of hope, it was the winter of despair, we had "
        "everything before us, we had nothing before us, we were all going direct to "
        "heaven, we were all going direct the other way")   # 狄更斯，1859 年：公有领域
chars = sorted(set(text)); V = len(chars)
ids = [chars.index(c) for c in text]                # 词元序列 x_1..x_T
inputs, targets = ids[:-1], ids[1:]                 # 教师强制：由 x_t 预测 x_{t+1}
print(f"T = {len(ids)} characters, vocabulary V = {V}, ln V = {math.log(V):.4f}")

rng = random.Random(0)
W = [[rng.gauss(0, 0.01) for _ in range(V)] for _ in range(V)]   # logits 表，形状 (V, V)

def loss_and_grad(W):
    G = [[0.0] * V for _ in range(V)]
    total = 0.0
    for a, b in zip(inputs, targets):
        row = W[a]; m = max(row)
        e = [math.exp(z - m) for z in row]; s = sum(e)
        total += -(row[b] - m - math.log(s))         # -log p(b | a)
        for j in range(V):
            G[a][j] += e[j] / s                      # 损失对 logit 的导数 = p - onehot
        G[a][b] -= 1.0
    n = len(targets)
    return total / n, [[g / n for g in r] for r in G]

lr, curve = 20.0, []
for step in range(301):
    L, G = loss_and_grad(W)
    curve.append(L)
    if step % 50 == 0:
        print(f"step {step:3d}  loss {L:.4f} nats/char  = {L / math.log(2):.3f} bits/char")
    for i in range(V):
        for j in range(V):
            W[i][j] -= lr * G[i][j]

# 二元模型在这段文本上能做到的极限：由计数得到的条件熵
from collections import Counter
pair, first = Counter(zip(inputs, targets)), Counter(inputs)
H = -sum(c * math.log(c / first[a]) for (a, b), c in pair.items()) / len(targets)
print(f"count-based optimum {H:.4f} nats/char = {H / math.log(2):.3f} bits/char")
print("bits to encode the text:", round(len(targets) * curve[-1] / math.log(2)),
      "vs", round(len(targets) * math.log2(V)), "uniform")
```

```text
T = 416 characters, vocabulary V = 24, ln V = 3.1781
step   0  loss 3.1782 nats/char  = 4.585 bits/char
step  50  loss 1.7263 nats/char  = 2.491 bits/char
step 100  loss 1.6655 nats/char  = 2.403 bits/char
step 150  loss 1.6456 nats/char  = 2.374 bits/char
step 200  loss 1.6362 nats/char  = 2.361 bits/char
step 250  loss 1.6308 nats/char  = 2.353 bits/char
step 300  loss 1.6273 nats/char  = 2.348 bits/char
count-based optimum 1.6115 nats/char = 2.325 bits/char
bits to encode the text: 974 vs 1903 uniform
```

损失从$\ln V = 3.178$出发——预测接近均匀时必然如此——并逼近基于计数的最优值$1.6115$：它是这段文本中给定当前字符时下一个字符的条件熵，由[[#prop-minimiser]]，这是任何二元模型的下限（计数就是二元模型的最大似然估计，[[math-for-ml/estimation#ex-bigram]]）。按压缩来读（[[#prop-compression]]），训练好的模型编码这$415$个被预测的字符大约只需$974$比特，而不是对$24$个符号用均匀编码的$1903$比特。这只是在一段极小文本上的训练损失，所以说明不了任何泛化能力；要点在于机制，而这些机制与词表$10^5$个词元、上下文$10^4$长的 Transformer 完全相同——改变的只是产出 logits 的那个函数。

::: widget plot
f: 1.6115 + 0*x; 3.1781 + 0*x
x: 0, 300
y: 1.4, 3.3
points: 0,3.178; 20,1.873; 40,1.755; 60,1.707; 80,1.681; 100,1.666; 120,1.655; 140,1.648; 160,1.643; 180,1.639; 200,1.636; 220,1.634; 240,1.632; 260,1.630; 280,1.629; 300,1.627
labels: count-based optimum $1.6115$; uniform $\ln 24$
caption: 程序中的二元模型的训练损失（纳特每字符，每$20$步一个点）。它先迅速离开均匀损失$\ln V$，然后缓缓爬向二元模型在这段文本上能达到的最好损失。剩下的差距是优化误差；下限本身是单一字符上下文下文本的条件熵，上下文更长的模型可以更低。
:::

## 掩码语言建模 {#sec-mlm}

因果模型只向左读。对于拿到整段文本的任务——分类、给词打标签、为检索做嵌入——让每个位置看到两侧是自然的。但双向模型不能被训练去预测下一个词元，因为下一个词元就在它眼前。BERT（Devlin 等，2019）通过藏词元而不是藏未来解决了这个问题。

::: definition 掩码语言建模（BERT） {#def-mlm}
**掩码语言建模**随机选取$15\%$的位置作为目标。每个被选中的词元以概率$0.8$替换为特殊的 `[MASK]` 词元，以概率$0.1$替换为均匀随机的词元，以概率$0.1$保持不变。双向编码器读取损坏后的序列，只在目标位置上用原始词元的交叉熵训练：

$$
\mathcal{L}_{\text{MLM}} = -\frac{1}{\lvert\mathcal{T}\rvert}\sum_{i\in\mathcal{T}}\log p_\theta(x_i\mid\tilde{\mathbf{x}}).
$$
:::

80/10/10 规则及其道理在[[transformers/architecture-families#def-mlm]]讨论过：`[MASK]` 在真实输入中从不出现，必须防止模型只在带掩码的位置上学到好的表示。BERT 还使用了第二个目标——**下一句预测**（句子 B 是句子 A 的真实续篇吗？）——RoBERTa（Liu 等，2019）发现它并无必要；RoBERTa 还在每次见到一条序列时重新抽取掩码（**动态掩码**），并用更多数据训练久得多。**整词掩码**把一个词的所有子词片段一起遮掉，使模型不能从 *play* 轻而易举地恢复出 *##ing*。

掩码语言建模为双向性付两次账。它每条序列提供的目标只有因果建模的$15\%$（[[transformers/architecture-families#prop-targets]]）；它的条件分布的乘积不是联合分布，模型既不能生成文本，也不能直接给文档打分。为什么不多遮一些？遮得太多，剩下的上下文就不足以把预测定义良好；遮得太少，每条序列产生的目标又太少。Wettig 等（2023）发现，对大型 BERT 式模型，$40\%$左右的遮罩率可能比$15\%$更好，所以$15\%$是一个惯例而非最优值。

::: widget distribution
dist: binomial
params: n=128, p=0.15
a: 15
b: 23
caption: 在$128$词元的序列中，当每个位置以$0.15$的独立概率成为目标时，被遮位置的个数：均值$19.2$，标准差$\sqrt{128\cdot0.15\cdot0.85} = 4.04$。改变$p$来看这个权衡——每条序列的目标更多，但每个目标可见的上下文更少。实现常常改为固定个数，恰好遮$\operatorname{round}(0.15\,T)$个位置。
:::

**ELECTRA**（Clark 等，2020）用另一种方式找回损失的信号。一个小生成器往被遮的位置填入看似合理的词元，主模型——**判别器**——对*每个*位置预测其词元是原始的还是被替换的。现在每个位置都是一个（二分类）目标，而 ELECTRA 用 RoBERTa 一小部分的训练算力就达到了它的下游精度。**XLNet**（Yang 等，2019）走了第三条路：在位置的随机排列上做因果目标，既保留合法的联合分布，又让每个词元平均获得双向上下文。

## 片段损坏与去噪 {#sec-spans}

遮单个词元教模型从邻居恢复单词。藏更长的**片段**要求更高：必须根据上下文重建一个短语或从句。有了编码器–解码器（[[transformers/architecture-families#sec-encdec]]），输出不必与输入等长，于是输入可以更短，答案也可以是变长的。

::: definition 片段损坏（T5） {#def-span-corruption}
**片段损坏**（Raffel 等，2020）选出比例为$r$的词元（T5 用$r = 0.15$），以连续片段的形式选取，片段平均长度$\mu$（T5：$\mu = 3$）。输入中每个片段替换为一个**哨兵（sentinel）**词元，各片段互不相同（论文里是 `<X>`、`<Y>`、……；发布词表里是 `<extra_id_0>`、`<extra_id_1>`、……）。目标序列依次列出每个哨兵及其替换掉的词元，并以一个终止哨兵结尾。编码器读取损坏的输入；解码器用因果损失生成目标。
:::

以句子 *Thank you for inviting me to your party last week* 为例，去掉 *for inviting* 与 *last*，输入为 *Thank you `<X>` me to your party `<Y>` week*，目标为 *`<X>` for inviting `<Y>` last `<Z>`*。解码器的损失是短目标上的因果损失，所以每个目标词元——包括哨兵——都参与训练。

::: example 片段损坏的数量 {#ex-span}
一条$T = 512$词元的 T5 训练样例，损坏率$r = 0.15$，片段平均长度$\mu = 3$。估计片段个数、编码器输入长度与解码器目标长度，并与掩码语言建模比较开销。
::: solution
被损坏的词元：$0.15\cdot512 = 76.8$个，平均分成$76.8/3 = 25.6$个片段。编码器输入保留$512 - 76.8 = 435.2$个词元，外加每个片段一个哨兵，共$435.2 + 25.6 = 460.8$个词元。目标含每个片段一个哨兵、$76.8$个被去掉的词元和一个终止哨兵：$25.6 + 76.8 + 1 \approx 103.4$个词元。所以片段损坏使输入比原文短约$10\%$，目标只有原文的五分之一长——Raffel 等把这记作相对重建全文的目标的一条速度优势。与掩码语言建模一样，只有约$15\%$的原始词元是预测目标。
:::
:::

::: definition 去噪自编码器目标（BART） {#def-denoising}
**去噪**目标用一个或多个加噪函数损坏文档，训练一个模型——在 BART（Lewis 等，2020）中是编码器–解码器——以因果损失输出**整个原始文档**。BART 比较了词元遮罩、词元删除、**文本填充**（每段长度取自$\lambda = 3$的泊松分布的片段各替换为一个 `[MASK]`，长度可以为零）、句子重排与文档旋转；其最终模型采用文本填充（遮$30\%$的词元）加句子重排。
:::

因为解码器必须复现整个文档，BART 的目标类似于以带噪副本为条件的因果语言建模，这使它擅长摘要等生成任务。Raffel 等在同一预算下比较了众多此类变体，发现合理损坏方案之间的差别很小；架构的选择与数据量更紧要。UL2（Tay 等，2023）提出在**去噪器混合**上训练一个模型——短片段、重损坏的长片段，以及一个类前缀 LM 的顺序去噪器——并用一个词元告诉模型当前处于哪种模式。

::: definition 前缀语言建模 {#def-prefix-lm}
**前缀语言模型**在某个点$P$把每条序列分成前缀$x_{\le P}$与后续$x_{>P}$。前缀内部注意力是双向的，其后是因果的，损失只在续篇上取因果损失：

$$
\mathcal{L}_{\text{prefix}} = -\frac{1}{T-P}\sum_{t=P+1}^{T}\log p_\theta(x_t\mid x_{<t}).
$$
:::

前缀 LM（UniLM 采用，Dong 等，2019；T5 也作为变体使用）读输入时像编码器，写输出时像解码器，参数只有一套栈。它的弱点是所有条件目标共有的那一个：前缀中的位置不是目标，所以取序列中间的分界点，训练信号比起因果建模就少一半。

::: quiz
对$T = 1000$个词元的序列，哪个目标每次前向传播给出最多的预测目标？
- [x] 因果语言建模
- [ ] 遮罩率$15\%$的掩码语言建模
- [ ] 遮罩率$15\%$、平均片段长$3$的片段损坏
- [ ] 分界点$P = 500$的前缀语言模型
::: solution
因果建模让每个位置都成为目标：$1000$个。掩码建模平均给出$150$个；片段损坏在目标里约有$150$个被去掉的词元加约$51$个哨兵；前缀 LM 给出$500$个。这就是因果预训练的效率论据（[[transformers/architecture-families#prop-targets]]），尽管目标并不同样难：两侧都有上下文的被遮词元，比预测下一个词元更容易。
:::
:::

## 中间填充 {#sec-fim}

因果模型在文本末尾生成，但许多用法需要插入：在源文件中间补全一个函数体，光标上下都有代码。Bavarian 等（2022）表明，因果模型只需一个简单数据变换、不改架构也不改损失，就能学会这件事。

::: definition 中间填充变换 {#def-fim}
以概率$\rho$（**FIM 比率**），把训练文档在两个均匀随机选取的位置切开，分为前缀、中间与后缀。在**PSM**（前缀–后缀–中间，prefix–suffix–middle）格式中，文档被重排为

`<PRE>` 前缀 `<SUF>` 后缀 `<MID>` 中间 `<EOT>`

其中 `<PRE>` 等为特殊哨兵词元，并用通常的因果损失在整个重排后的序列上训练。**SPM**变体则把后缀放在最前。以概率$1-\rho$，文档保持原样。推理时把 `<PRE>` 前缀 `<SUF>` 后缀 `<MID>` 喂给模型，让它生成中间部分，遇到 `<EOT>` 停止。
:::

因为中间部分排在重排序列的最后，生成它就是普通的从左到右生成，只是同时以前缀和后缀为条件。Bavarian 等训练了 FIM 比率高达$0.9$的模型，并报告其从左到右的表现基本不变——他们称之为“FIM 免费午餐”（FIM-for-free）——而模型学会了填充；他们建议在字符层面切分，而不是在词元边界切分，这样模型能学会补全不完整的词元。此后发布的许多代码模型在预训练中使用了 FIM，比率通常在$0.5$左右。

::: example 一条 FIM 训练样例 {#ex-fim}
对代码行 `def area(r): return 3.14159 * r * r` 施加 PSM 变换，切点分别在 `def area(r):` 之后和 `return` 之后。推理时要模型补全函数体，它看到什么？
::: solution
前缀 `def area(r):`，中间 ` return`，后缀 ` 3.14159 * r * r`。训练序列是 `<PRE>def area(r):<SUF> 3.14159 * r * r<MID> return<EOT>`，因果损失施加在整个序列上——包括前缀和后缀的词元，它们像普通文本一样被从左到右预测。推理时模型收到 `<PRE>def area(r):<SUF> 3.14159 * r * r<MID>`，应当生成 ` return<EOT>`。在单词内部切分——比如在 `ret` 与 `urn` 之间——就能教模型续写不完整的词元。
:::
:::

## 多词元预测（研究方向） {#sec-mtp}

因果目标一次只要求一个词元。**多词元预测**要求模型在每个位置预测若干个未来词元：$x_{t+1}, x_{t+2}, \dots, x_{t+k}$。

::: definition 多词元预测 {#def-mtp}
视野为$k$的**多词元预测**模型计算$x_{\le t}$的共享表示$\mathbf{h}_t$，并带$k$个输出头，第$j$个头给出分布$p^{(j)}_\theta(x_{t+j}\mid x_{\le t})$。它以$k$个交叉熵之和训练

$$
\mathcal{L}_{\text{MTP}} = -\frac{1}{T}\sum_{t}\sum_{j=1}^{k}\log p^{(j)}_\theta(x_{t+j}\mid x_{\le t}).
$$

第$1$头就是普通的下一词元预测器，标准生成用的就是它。
:::

Gloeckle 等（2024）在共享主干上训练了带$k = 4$个独立头的模型，报告代码生成基准上的收益随模型规模增长，并利用额外的头起草词元做**自投机解码**（self-speculative decoding，[[inference/speculative-decoding]]）来加速推理。DeepSeek-V3（DeepSeek-AI，2024）使用了一个变体：小顺序模块各再预测一个词元。更早的相关想法包括分块并行解码（Stern 等，2018）与 ProphetNet（Qi 等，2020）。截至 2026 年，多词元预测仍是一个活跃的研究话题，不是定论的标准：报告中的收益依赖于规模与领域，在小模型上甚至可能有害。

## 选择目标 {#sec-choosing}

| 目标 | 目标位置可见的上下文 | 每$T$词元的目标数 | 是否定义$p(\mathbf{x})$？ | 典型架构 |
|---|---|---|---|---|
| 因果 LM | 仅左侧 | $T$ | 是 | 解码器 |
| 掩码 LM | 两侧（被损坏） | $\approx0.15\,T$ | 否 | 编码器 |
| 片段损坏 | 两侧，片段被移除 | $\approx0.15\,T$ 加哨兵 | 否 | 编码器–解码器 |
| 去噪（BART） | 全文的带噪副本 | $T$（重建） | 否 | 编码器–解码器 |
| 前缀 LM | 双向前缀，然后左侧 | $T - P$ | 有条件地 | 带前缀掩码的解码器 |
| 中间填充 | 前缀与后缀 | $T$（重排后） | 是，重排文本的 | 解码器 |
| 多词元 | 仅左侧 | $kT$（研究） | 第 $1$ 头：是 | 带额外头的解码器 |

大约自 2020 年起，作为通用模型使用的模型几乎都是因果目标训练的解码器，代码常辅以中间填充；Wang 等（2022）发现，仅经预训练的因果解码器在零样本使用下最强。理由就是本章的这些：每个词元都是目标，一个机制同时负责给文本打分和生成文本，而损失是有清晰解释的压缩率。掩码与片段目标对于用作嵌入与分类的编码器仍是正确选择（[[prompting-rag/text-embeddings]]），并在[[pretraining/model-families]]中再次比较。

::: history
语言模型的自监督预训练脱胎于语言建模本身，它可以追溯到香农（Shannon）1951 年关于预测英语字母的实验。Bengio 等（2003）训练了神经语言模型；Collobert 与 Weston（2008）以及 word2vec（Mikolov 等，2013）从上下文预测任务学习词向量。Dai 与 Le（2015）在微调前把循环网络预训练为语言模型，ELMo（Peters 等，2018）使用了双向循环语言模型。2018 年，Radford 等（GPT）以因果目标预训练了 Transformer 解码器，Devlin 等（BERT，发表于 NAACL 2019）引入了掩码语言建模，其灵感来自 Taylor（1953）的完形填空（cloze test）。2019 年带来了 RoBERTa、XLNet、UniLM 以及 T5 对目标的系统比较（Raffel 等，JMLR 2020）和 BART（Lewis 等，ACL 2020）；ELECTRA（Clark 等，2020）引入了被替换词元检测。Bavarian 等（2022）为因果模型引入了中间填充，Tay 等（2023）提出 UL2 的去噪器混合，Gloeckle 等（2024）在大模型上重新唤起多词元预测。教师强制得名于 Williams 与 Zipser（1989）。
:::

::: summary
- 预训练目标损坏文本，并用交叉熵训练模型复原被藏起来的部分；各目标的差别在于藏什么、每个预测允许看什么、一条序列产生多少目标。
- **因果语言建模**用**教师强制**由前文预测每个词元；由链式法则，其求和损失恰为$-\log p_\theta(\mathbf{x})$，每个位置都是目标，且因果 Transformer 一次前向传播算出全部$T$个预测。
- 期望交叉熵等于数据熵加 KL散度，因此它在数据分布处取最小，且永不低于文本的熵。
- 配合算术编码，因果损失是一种**码长**：每字节比特数$=(\mathcal{L}/\ln2)\cdot(\text{词元数}/\text{字节数})$，与分词器无关。
- **掩码 LM**（BERT：$15\%$，80/10/10）给出双向表示，但目标更少、没有联合概率；**片段损坏**（T5：$15\%$，平均片段$3$，哨兵）与**去噪**（BART）训练编码器–解码器；**前缀 LM** 在一套参数里合并两种掩码。
- **中间填充**把文档重排为前缀–后缀–中间，让因果模型学会填充而几乎不损失从左到右的能力；**多词元预测**是一个结果依赖规模的研究方向。
:::

## 习题

::: exercise 一个序列的概率 {level=1 check="0.0012"}
一个模型给三词元序列的各词元的条件概率为$0.1$、$0.03$与$0.4$。该序列的概率是多少？
::: solution
由链式法则[[#eq-chain]]，$0.1\cdot0.03\cdot0.4 = 0.0012$。
:::
:::

::: exercise 比特计的损失 {level=1 check="3.652"}
直接由四个概率出发，计算[[#ex-loss-hand]]中序列的每词元损失（比特每词元），保留三位小数。
::: solution
以比特计，$-\tfrac14(\log_20.05 + \log_20.01 + \log_20.2 + \log_20.4) = \tfrac14(4.3219 + 6.6439 + 2.3219 + 1.3219) = 14.6096/4 = 3.652$比特每词元——与把纳特计损失$2.5317$除以$\ln2$的结果相同。
:::
:::

::: exercise 初始损失 {level=1 check="10.8249"}
一个词表$50{,}257$个词元的因果 Transformer 被初始化到预测接近均匀。第一个训练步应报告纳特计的损失是多少？保留四位小数。
::: solution
均匀预测给每个目标的概率都是$1/50257$，所以损失是$\ln50257 = 10.8249$纳特。首步损失与此值相差甚远，说明初始化或目标的错位有 bug，见[[neural-networks/training-practice#prop-initial-loss]]。
:::
:::

::: exercise 每字节比特数 {level=2 check="0.687"}
在[[#ex-bpb]]中，把压缩率算到每字节多少比特（保留三位小数）。第二个模型用不同的分词器，在每词元$4.9$个字节时达到每词元$2.3$纳特：哪个模型压缩得更好？
::: solution
第一个模型：$2.0/(0.6931\cdot4.2) = 0.687$比特每字节。第二个：$2.3/(0.6931\cdot4.9) = 0.677$比特每字节。第二个模型压缩得略好，尽管它每词元的损失更高，因为它的每个词元覆盖更多文本。这就是不同分词器之间的每词元损失不应直接比较的原因。
:::
:::

::: exercise 片段损坏的长度 {level=2 check="460.8"}
用[[#ex-span]]的期望值，$512$词元的样例在$r = 0.15$、$\mu = 3$下，编码器输入长度的期望是多少？若$r$不变而$\mu = 10$，编码器与解码器长度如何变化？
::: solution
$\mu = 3$时：$512 - 76.8 + 25.6 = 460.8$个词元。$\mu = 10$时：$76.8/10 = 7.68$个片段，于是输入为$512 - 76.8 + 7.68 = 442.9$个词元，目标为$7.68 + 76.8 + 1 = 85.5$个词元。更长的片段让两个序列都更短，也让每个预测更难，因为必须重建的连续文本更多了。
:::
:::

::: exercise 交叉熵的分解 {level=2 check="0.0253"}
某上下文之后的下一个词元的数据分布为三个词元上的$p^\star = (0.5, 0.3, 0.2)$，模型预测$q = (0.4, 0.4, 0.2)$。以纳特计算熵$H(p^\star)$、期望交叉熵与 KL散度，并验证[[#eq-ce-decomp]]。KL散度保留四位小数。
::: solution
$H(p^\star) = -(0.5\ln0.5 + 0.3\ln0.3 + 0.2\ln0.2) = 0.3466 + 0.3612 + 0.3219 = 1.0297$。交叉熵：$-(0.5\ln0.4 + 0.3\ln0.4 + 0.2\ln0.2) = 0.4581 + 0.2749 + 0.3219 = 1.0549$。KL：$0.5\ln(0.5/0.4) + 0.3\ln(0.3/0.4) + 0.2\ln1 = 0.11157 - 0.08630 = 0.0253$纳特，确实$1.0297 + 0.0253 = 1.0550 \approx 1.0549$（舍入）。模型为错置$0.1$的概率，在每个词元上多付出$0.0253$纳特，超出了不可避免的那份熵。
:::
:::

::: exercise FIM 比率与从左到右的数据 {level=2 check="0.5"}
一个代码模型以$0.5$的 FIM 比率（按文档施加）在$10^{12}$个词元上预训练。多大比例的文档以朴素从左到右的顺序被看到？尽管如此，为什么实际上每个词元仍获得因果训练信号？解释原因。
::: solution
比例$1-\rho = 0.5$。在变换后的文档里，重排后的序列仍在每个位置上以因果损失训练，所以每个词元——无论属于前缀、后缀还是中间——仍由重排顺序中它前面的词元来预测。改变的是上下文：后缀词元在跳过前缀之后被预测，中间部分则在两侧都可见的情况下被预测。Bavarian 等发现，这几乎不损失从左到右的能力。
:::
:::

::: exercise 实现片段损坏 {level=3}
写一个纯 Python 函数 `span_corrupt(tokens, rate, mean_len, rng)`，返回[[#def-span-corruption]]的编码器输入与解码器目标，哨兵为 `<0>`、`<1>`、……。取被损坏词元数$n = \operatorname{round}(\text{rate}\cdot T)$、片段数$s = \max(1, \operatorname{round}(n/\mu))$，把$n$随机拆成$s$个正整数片段长度，并与$s$段随机保留的片段交错排列。在 T5 的例句上运行它。
::: solution
```python
import random

def random_partition(total, parts, rng):
    """Split `total` into `parts` positive integers, uniformly over compositions."""
    cuts = sorted(rng.sample(range(1, total), parts - 1))
    return [b - a for a, b in zip([0] + cuts, cuts + [total])]

def span_corrupt(tokens, rate, mean_len, rng):
    T = len(tokens)
    n = max(1, round(rate * T))
    s = max(1, round(n / mean_len))
    noise = random_partition(n, s, rng)                 # 被去掉的片段长度
    keep = random_partition(T - n, s, rng)              # 每个片段之前保留段的长度
    inp, tgt, i = [], [], 0
    for k in range(s):
        inp += tokens[i:i + keep[k]]; i += keep[k]
        inp.append(f"<{k}>"); tgt.append(f"<{k}>")
        tgt += tokens[i:i + noise[k]]; i += noise[k]
    tgt.append(f"<{s}>")
    return inp, tgt

rng = random.Random(1)
words = "Thank you for inviting me to your party last week .".split()
inp, tgt = span_corrupt(words, 0.25, 2, rng)
print(" ".join(inp)); print(" ".join(tgt))
```

```text
Thank you for inviting me <0> your party last <1>
<0> to <1> week . <2>
```

这里$T = 11$，$n = \operatorname{round}(2.75) = 3$，$s = \operatorname{round}(1.5) = 2$：被去掉的片段是 *to* 和 *week .*。每段保留的文本都排在某个片段之前，所以在这个简化版本里文本总以片段结尾（T5 的实现还允许末尾保留一段）。编码器输入有$T - n + s = 10$个词元，目标有$n + s + 1 = 6$个，与[[#ex-span]]的计数一致。
:::
:::

::: exercise 为什么 MLM 的乘积不是概率 {level=3}
两个二元词元上的掩码模型预测$q(x_1\mid x_2)$与$q(x_2\mid x_1)$。设两个条件分布都说“以$0.9$的概率照抄另一个词元”。证明乘积$q(x_1\mid x_2)\,q(x_2\mid x_1)$对全部四条序列求和不等于$1$，并求出一个与两个条件分布都相容的联合分布。为什么因果分解不会出现这种事？
::: solution
乘积在序列$00$与$11$上是$0.81$，在$01$与$10$上是$0.01$，总和为$1.64\ne1$，所以它不是分布。取$p(00) = p(11) = 0.45$、$p(01) = p(10) = 0.05$的联合分布，其条件分布$p(x_1 = x_2\mid x_2) = 0.45/0.5 = 0.9$，与两者都相容；条件分布的乘积根本不是拼出联合分布的方式。因果分解$p(x_1)p(x_2\mid x_1)$用的是对**嵌套**上下文的条件分布，[[#prop-chain]]表明任何这样的乘积都对全体序列求和为$1$。
:::
:::

::: exercise 每次 FLOP 的目标数 {level=3}
把一个训练步的开销建模为与处理的输入位置数（编码器加解码器）成正比。比较每个被处理位置的预测目标数：在$T = 512$词元上的因果解码器；遮罩$15\%$、$512$词元的 BERT；以及用[[#ex-span]]数字、计入解码器目标的 T5 片段损坏。这个比较遗漏了什么？
::: solution
因果：$512$个位置$512$个目标，比值$1$。BERT：$512$个位置$76.8$个目标，比值$0.15$。T5：解码器约有$\approx103.4$个目标；被处理位置为$460.8 + 103.4 = 564.2$，比值$0.18$。因果解码器每单位算力获得的目标是它的五到七倍。这个比较遗漏了：目标在难度与有用性上并不相同——以双向为条件的预测可能教出因果预测教不出的表示——而且目标是数量，下游质量才是目的。Raffel 等与 Wang 等（2022）都发现，哪个目标最好取决于模型将如何被使用。
:::
:::

::: exercise 二元模型中的暴露偏差 {level=2}
用[[#sec-code]]的二元模型反复从$p_\theta(\cdot\mid x_t)$采样下一个字符来生成文本。解释为什么它生成的文本看上去局部可信、整体上却毫无意义；这一失败中哪些部分源于上下文太短而不是教师强制。
::: solution
每个字符都从训练文本中跟随前一个字符的那个分布抽出，所以每一对相邻字符都可信（*th*、*he*、*e␣*），但没有任何东西把某个字符与两个以上位置之前的内容拴在一起，于是词和短语都保不住。这一失败源于模型只有一个字符的上下文：即使训练得完美，二元模型也无法表示更长的依赖。暴露偏差是另一回事：一个长上下文的模型若只在真实前文上训练，当上下文包含它自己不同寻常的样本时可能会漂移。在二元模型里这两件事恰好重合，因为它的“上下文”就是刚采出的那个字符，看起来永远像真实文本。
:::
:::
