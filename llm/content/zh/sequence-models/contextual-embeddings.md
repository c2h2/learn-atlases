word2vec 与 GloVe 这类词嵌入（[[text-and-language/word-embeddings]]）给每个词**型**一个向量，从大语料上学一次，然后在每个任务里复用。它们是 NLP 中第一种广泛成功的迁移学习形式。但同一个词在不同句子里意思不同——“the bank of the river”里的 bank 和“the bank raised its rates”里的 bank——而一个静态向量要应付所有情况。本课程的网络作为一个副产品算出了更好的东西：循环语言模型在某个词位置上的隐藏状态，是一个同时取决于该词*与其上下文*的向量。**上下文嵌入**就是这样随上下文而变的向量，取自一个在未标注文本上预训练的网络，再复用于其他任务。

本章说明静态嵌入为什么会模糊词义，定义上下文表示，并介绍 **ELMo**（Peters et al., 2018）——它从一个双向 LSTM 语言模型取出这些向量，在一大批任务上刷新了最先进水平。一个用纯 Python 写的小双向语言模型说明为什么两个方向都需要。然后我们比较转移一个预训练网络的两种方式——抽取特征或微调——以及用来研究表示里含有什么信息的方法，最后停在迈向 BERT 和 GPT 的一步：它们用 Transformer 取代 LSTM，是[[pretraining]]的主题。

## 静态嵌入与一词多义 {#sec-static}

静态嵌入给每个词型 $w$ 指派一个向量 $\mathbf{e}_w$，无论上下文如何。对一个多义词，训练目标把 $\mathbf{e}_w$ 同时拉向它所有词义的上下文，结果是一个折中。

::: proposition 静态向量对词义取平均 {#prop-average}
设某个词有词义 $1, \dots, m$，出现频率为 $f_1, \dots, f_m$（$\sum_if_i = 1$），且词义 $i$ 的理想向量为 $\mathbf{u}_i$。使期望平方误差 $\sum_if_i\lVert\mathbf{e} - \mathbf{u}_i\rVert^2$ 最小的单个向量是频率加权均值 $\mathbf{e}^* = \sum_if_i\mathbf{u}_i$。
:::

::: proof
目标关于 $\mathbf{e}$ 是凸二次函数，梯度为 $2\sum_if_i(\mathbf{e} - \mathbf{u}_i) = 2(\mathbf{e} - \sum_if_i\mathbf{u}_i)$，用到 $\sum_if_i = 1$。它只在 $\mathbf{e}^* = \sum_if_i\mathbf{u}_i$ 处为零，因此这就是最小值。
:::

平方误差模型是一种简化，但结论与观察相符：Arora 等人（2018）发现，多义词的 word2vec 和 GloVe 向量可以很好地由词义向量的线性叠加近似、权重为频率，而词义向量可用稀疏编码恢复。罕见词义被稀释：静态向量贴着占优势的词义，下游模型只能自己从周围的词里恢复罕见词义。

::: example 每个词义还剩多少 {#ex-senses}
“Bank” 有 $80\%$ 的时间用于金融义，$20\%$ 用于河流义。把两个词义向量建模为单位向量 $\mathbf{u}_{\text{money}}$、$\mathbf{u}_{\text{river}}$，它们之间的余弦为 $0.1$。计算静态向量 $\mathbf{e}^*$ 与每个词义的余弦。
::: solution
$\mathbf{e}^* = 0.8\mathbf{u}_{\text{money}} + 0.2\mathbf{u}_{\text{river}}$，且 $\lVert\mathbf{e}^*\rVert^2 = 0.64 + 0.04 + 2\cdot0.8\cdot0.2\cdot0.1 = 0.712$，故 $\lVert\mathbf{e}^*\rVert = 0.8438$。于是 $\cos(\mathbf{e}^*, \mathbf{u}_{\text{money}}) = (0.8 + 0.2\cdot0.1)/0.8438 = 0.972$，$\cos(\mathbf{e}^*, \mathbf{u}_{\text{river}}) = (0.8\cdot0.1 + 0.2)/0.8438 = 0.332$。静态向量几乎就是金融义；在 “the bank of the river” 里，模型看到一个与它需要的含义余弦只有 $0.33$ 的向量。
:::
:::

::: widget plot
f: (x + (1-x)*c)/sqrt(x^2 + (1-x)^2 + 2*x*(1-x)*c); (x*c + (1-x))/sqrt(x^2 + (1-x)^2 + 2*x*(1-x)*c)
x: 0, 1
y: -0.2, 1.05
sliders: c=0.1:-0.5:0.9:0.05
labels: \cos(\mathbf{e}^*, \mathbf{u}_1); \cos(\mathbf{e}^*, \mathbf{u}_2)
vlines: 0.8
caption: 两个词义的词的静态向量 $\mathbf{e}^* = f\mathbf{u}_1 + (1 - f)\mathbf{u}_2$，横轴是词义 $1$ 的频率 $f$，词义向量是单位向量、余弦为 $c$（滑块）。在 $f = 0.8$（虚线）、$c = 0.1$ 处，向量靠近词义 $1$ 而远离词义 $2$，正如[[#ex-senses]]。只有当两个词义相似（$c$ 接近 $1$）时，一个向量才能两者都应付得好。上下文嵌入在每个句子里算出不同的向量，从而避开这种折中。
:::

## 上下文表示 {#sec-contextual}

::: definition 上下文嵌入 {#def-contextual}
**上下文嵌入**模型是一个函数 $F$，把词元序列 $x_1, \dots, x_n$ 映为向量 $\mathbf{r}_1, \dots, \mathbf{r}_n$，其中 $\mathbf{r}_t = F(x_1, \dots, x_n)_t$ 可以依赖序列的每个词元。同一个词型在不同上下文里得到不同的向量。$F$ 在一个未标注文本能提供监督的任务（通常是语言建模）上**预训练**，然后冻结或微调后复用于其他任务。
:::

本课程的每个网络都是这样的函数：RNN 语言模型（[[sequence-models/recurrent-networks#def-rnnlm]]）的隐藏状态依赖左上下文，双向编码器的状态依赖全句。2015–2018 年间的问题是：哪种预训练任务产生的状态迁移得最好。Dai 和 Le（2015）把 LSTM 预训练成语言模型或序列自编码器，再为文本分类微调。McCann 等人（2017）取一个基于注意力的翻译模型的编码器，把它的状态——他们称为 **CoVe**（context vectors，上下文向量）——作为额外的输入用于其他任务。Peters 等人（2017）把预训练语言模型的状态加到一个序列标注器上（TagLM），提升了命名实体识别和短语组块。翻译需要平行数据，很稀缺；语言建模只需要文本，取之不尽。ELMo 最终选定了语言模型。

## ELMo {#sec-elmo}

### 双向语言模型 {#sec-bilm}

从左到右的语言模型在第 $t$ 位的状态没见过 $t$ 之后的词，而右上下文常常决定语义（“the bank *of the river*”）。再自然不过的修法——训练一个双向 RNN 去预测每个词元——却行不通，因为它会看到要它预测的那个词元。

::: proposition 双向预测泄漏目标 {#prop-leakage}
设 $\mathbf{r}_t = [\overrightarrow{\mathbf{h}}_t; \overleftarrow{\mathbf{h}}_t]$ 是双向 RNN 的输出，其中 $\overrightarrow{\mathbf{h}}_t$ 读过 $x_1, \dots, x_t$，$\overleftarrow{\mathbf{h}}_t$ 读过 $x_n, \dots, x_t$。若在 $\mathbf{r}_{t-1}$ 上训练一个分类器去预测 $x_t$，后向那一半已经读过 $x_t$，于是交叉熵可以被一个把输入词元抄到输出的网络压到零，什么上下文都没学到。
:::

::: proof
$\overleftarrow{\mathbf{h}}_{t-1} = f(\overleftarrow{\mathbf{h}}_t, x_{t-1})$ 与 $\overleftarrow{\mathbf{h}}_t = f(\overleftarrow{\mathbf{h}}_{t+1}, x_t)$ 依赖 $x_t$。后向 RNN 可以把最近输入的身份存进状态（例如，输入权重把 one-hot 词元写进一个子空间，循环权重一步之后把它挪到另一个子空间），线性分类器再放大输出权重，就能以任意高的置信度把它读出来。于是对每条训练序列损失都趋于 $0$，而这个解既然唾手可得，目标里就没有任何东西迫使表示去对上下文建模。
:::

ELMo 的答法是训练两个分开的语言模型，一个方向一个，训练结束后才把状态合起来。（一年之后 BERT 的答法是藏起被预测的词元——掩码语言建模，[[pretraining/pretraining-objectives]]。）

::: definition 双向语言模型 {#def-bilm}
**双向语言模型**（biLM）由一个前向语言模型（状态 $\overrightarrow{\mathbf{h}}_{t,j}$，层 $j = 1, \dots, L$，从左到右读）和一个后向语言模型（状态 $\overleftarrow{\mathbf{h}}_{t,j}$，从右到左读）组成。它们共享词元表示 $\mathbf{x}_t$（第 $0$ 层）和输出 softmax，并一起训练以最大化

$$
\sum_{t=1}^n\Big(\log p(x_t\mid x_1, \dots, x_{t-1};\ \Theta_x, \overrightarrow\Theta, \Theta_s) + \log p(x_t\mid x_{t+1}, \dots, x_n;\ \Theta_x, \overleftarrow\Theta, \Theta_s)\Big),
$$ {#eq-bilm}

其中 $\Theta_x$ 与 $\Theta_s$ 是共享的词元表示参数与 softmax 参数，$\overrightarrow\Theta$、$\overleftarrow\Theta$ 是两个方向的 LSTM。对 $x_t$ 的前向预测用 $\overrightarrow{\mathbf{h}}_{t-1,L}$，后向预测用 $\overleftarrow{\mathbf{h}}_{t+1,L}$，两个方向都看不到自己的目标。
:::

::: widget graph
nodes: x1@0,0; x2@1,0; x3@2,0; x4@3,0; x5@4,0; f1@0,1; f2@1,1; f3@2,1; f4@3,1; f5@4,1; b1@0,2; b2@1,2; b3@2,2; b4@3,2; b5@4,2
edges: x1>f1; x2>f2; x3>f3; x4>f4; x5>f5; f1>f2; f2>f3; f3>f4; f4>f5; x1>b1; x2>b2; x3>b3; x4>b4; x5>b5; b5>b4; b4>b3; b3>b2; b2>b1
algorithm: bfs
start: x5
caption: 五个词元上 biLM 的信息流：前向状态 $f_t$（中间一行）从左到右读，后向状态 $b_t$（上面一行）从右到左读。从最后一个词元 $x_5$ 出发的广度优先搜索能到达 $f_5$ 和每个后向状态，却到不了 $f_5$ 之前的任何前向状态：位置 $3$ 处 “bank” 的前向表示无从知道后面是什么。改从 $x_1$ 出发即可看到镜像。ELMo 把 $f_t$ 和 $b_t$ 拼接，所以它在位置 $3$ 的向量依赖全部五个词元——而两个语言模型都没有看到自己预测的词元。
:::

ELMo 的 biLM 每个方向有两层 LSTM、$4{,}096$ 个细胞，输出投影到 $512$ 维，第一层到第二层有残差连接。它的词元表示由字符算出——字符嵌入上的卷积网络，宽度 $1$ 到 $7$ 的滤波器共 $2{,}048$ 个，两层 highway 层，再投影到 $512$——所以没有词表外词。它在 One Billion Word Benchmark（Chelba et al., 2014）上训练，那是一个新闻句子的语料。

::: example ELMo 的 9360 万参数在哪里 {#ex-elmo-params}
数一数上面所述 biLM 的参数，不含输出 softmax（它在预训练之后被丢弃）。用这些数字：$262$ 个字符、尺寸 $16$ 的字符嵌入；宽度 $1, \dots, 7$ 的卷积滤波器各 $32, 32, 64, 128, 256, 512, 1{,}024$ 个（共 $2{,}048$ 个，各带偏置）；两层宽度 $2{,}048$ 的 highway 层（每层两个 $2{,}048\times2{,}048$ 矩阵和偏置）；一个带偏置的 $2{,}048\to512$ 投影；四层 LSTM（每方向两层），每层 $4{,}096$ 个细胞、输入尺寸 $512$、循环输入尺寸 $512$（投影后的输出）、一个不带偏置的 $4{,}096\to512$ 投影。
::: solution
字符嵌入：$262\cdot16 = 4{,}192$。滤波器：$16\sum_ww\,n_w + 2{,}048 = 16\cdot12{,}320 + 2{,}048 = 199{,}168$。Highway：$2\cdot2\cdot(2{,}048^2 + 2{,}048) = 16{,}785{,}408$。投影：$2{,}048\cdot512 + 512 = 1{,}049{,}088$。一层 LSTM：门 $4\big(4{,}096\cdot(512 + 512) + 4{,}096\big) = 16{,}793{,}600$，投影 $4{,}096\cdot512 = 2{,}097{,}152$，合计 $18{,}890{,}752$；四层 $75{,}563{,}008$。总计 $4{,}192 + 199{,}168 + 16{,}785{,}408 + 1{,}049{,}088 + 75{,}563{,}008 = 93{,}600{,}864$——就是通常引用的 ELMo 的 $93.6$ 百万。五分之四在 LSTM 里；基准大约 $800{,}000$ 词词表上的 softmax 在训练时还要再加几亿。
:::
:::

### 组合各层 {#sec-mix}

预训练之后，biLM 为每个词元提供 $2L + 1$ 个向量：词元层，以及每个 LSTM 层的前向和后向状态。记 $\mathbf{h}^{\text{LM}}_{t,0} = [\mathbf{x}_t; \mathbf{x}_t]$，$j\ge1$ 时 $\mathbf{h}^{\text{LM}}_{t,j} = [\overrightarrow{\mathbf{h}}_{t,j}; \overleftarrow{\mathbf{h}}_{t,j}]$。

::: definition ELMo 表示 {#def-elmo}
对下游任务，词元 $t$ 的 **ELMo** 向量是 biLM 各层的、随任务学习的加权和

$$
\mathbf{ELMo}_t^{\text{task}} = \gamma^{\text{task}}\sum_{j=0}^{L}s^{\text{task}}_j\,\mathbf{h}^{\text{LM}}_{t,j},\qquad \mathbf{s}^{\text{task}} = \operatorname{softmax}(\mathbf{w}^{\text{task}}),
$$ {#eq-elmo}

其中 $\mathbf{w}^{\text{task}}\in\R^{L+1}$ 和缩放 $\gamma^{\text{task}}$ 与任务模型一起训练，而 biLM 冻结。任务模型用 $[\mathbf{x}^{\text{task}}_t; \mathbf{ELMo}_t^{\text{task}}]$ 取代通常的输入嵌入 $\mathbf{x}^{\text{task}}_t$（有些任务还在输出处也加 ELMo）。
:::

标量混合让每个任务自选深度。Peters 等人发现不同的层编码不同的东西：词性标注上，第一层 LSTM 上的探针优于第二层；词义消歧上第二层更好——低层更句法，高层更语义。用学习到的权重对所有层取平均优于只用顶层。

::: example 手算标量混合 {#ex-mix}
某个 biLM 给一个词元三个层向量 $\mathbf{h}_0 = (1, 0)$、$\mathbf{h}_1 = (0, 1)$、$\mathbf{h}_2 = (1, 1)$（为了例子只用两维）。某个任务学到了 $\mathbf{w} = (0, 1, -1)$ 和 $\gamma = 2$。计算 ELMo 向量。
::: solution
$\mathbf{s} = \operatorname{softmax}(0, 1, -1) = (e^0, e^1, e^{-1})/(1 + e + e^{-1}) = (0.2447, 0.6652, 0.0900)$。混合为 $0.2447(1, 0) + 0.6652(0, 1) + 0.0900(1, 1) = (0.3348, 0.7553)$，乘以 $\gamma = 2$ 得 $(0.6695, 1.5105)$。这个任务主要依赖第一层 LSTM。若 $\mathbf{w} = \mathbf{0}$，混合就是三层的简单平均。
:::
:::

收益又大又广。把 ELMo 加到已有模型上，在六个基准——问答（SQuAD）、文本蕴含（SNLI）、语义角色标注、共指消解、命名实体识别和情感分类（SST-5）——上改进了最先进水平，相对误差降低约 $6\%$ 到 $20\%$，且标注训练集越小帮助越大。这篇论文获 NAACL 2018 最佳论文奖，几个月内几乎每个 NLP 系统都用上了预训练的上下文表示。

## 为什么两个方向都需要 {#sec-code}

下面的清单在一个玩具语料上做出不泄漏的 biLM。句子形如 “the S went to the bank to V .”，主语和动词都会透露 “bank” 的词义——河流义配 “fisherman”、“boatman” 和 “fish”、“row”；金融义配 “banker”、“clerk” 和 “pay”、“save”——只有主语 “man” 和 “woman” 两种词义都会出现。分别训练前向和后向的简单 RNN 语言模型，然后从各自的状态里读出 “bank” 的表示。

```python
import math, random

rng = random.Random(0)
SENSE = {"river": (["fisherman", "boatman"], ["fish", "row"]),
         "money": (["banker", "clerk"], ["pay", "save"])}
def sentence(sense, subj=None):
    subjects, verbs = SENSE[sense]
    s = subj or rng.choice(subjects)
    return ["the", s, "went", "to", "the", "bank", "to", rng.choice(verbs), "."]
# 训练语料：无歧义主语，以及两种词义都出现的 "man"/"woman"
train = [sentence(rng.choice(["river", "money"])) for _ in range(300)]
train += [sentence(rng.choice(["river", "money"]), rng.choice(["man", "woman"])) for _ in range(100)]
vocab = sorted({w for s in train for w in s}); V = len(vocab); ix = {w: i for i, w in enumerate(vocab)}

H = 16
def mat(r, c, s): return [[rng.gauss(0, s) for _ in range(c)] for _ in range(r)]
def mv(M, v): return [sum(m * x for m, x in zip(row, v)) for row in M]
def new_lm():
    return {"Wxh": mat(H, V, 0.3), "Whh": mat(H, H, 1 / math.sqrt(H)), "bh": [0.0] * H,
            "Why": mat(V, H, 0.1), "by": [0.0] * V}

def states(P, xs):                                 # 每个词元之后的隐藏状态
    h, hs = [0.0] * H, []
    for x in xs:
        h = [math.tanh(P["Wxh"][i][x] + w + b) for i, (w, b) in
             enumerate(zip(mv(P["Whh"], h), P["bh"]))]
        hs.append(h)
    return hs

def sgd_step(P, xs, lr=0.1):                       # 一个句子，完整 BPTT
    hs = [[0.0] * H] + states(P, xs[:-1]); loss = 0.0
    G = {k: ([[0.0] * len(v[0]) for _ in v] if isinstance(v[0], list) else [0.0] * len(v))
         for k, v in P.items()}
    dnext = [0.0] * H
    for t in range(len(xs) - 1, 0, -1):            # h_t 预测 xs[t]
        z = [u + b for u, b in zip(mv(P["Why"], hs[t]), P["by"])]
        m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); p = [v / s for v in e]
        loss -= math.log(p[xs[t]]); p[xs[t]] -= 1
        for k in range(V):
            G["by"][k] += p[k]
            for j in range(H): G["Why"][k][j] += p[k] * hs[t][j]
        dh = [sum(P["Why"][k][j] * p[k] for k in range(V)) + dnext[j] for j in range(H)]
        da = [d * (1 - h * h) for d, h in zip(dh, hs[t])]
        for i in range(H):
            G["bh"][i] += da[i]; G["Wxh"][i][xs[t - 1]] += da[i]
            for j in range(H): G["Whh"][i][j] += da[i] * hs[t - 1][j]
        dnext = [sum(P["Whh"][i][j] * da[i] for i in range(H)) for j in range(H)]
    for k in P:
        if isinstance(P[k][0], list):
            for r, g in zip(P[k], G[k]):
                for j in range(len(r)): r[j] -= lr * g[j]
        else:
            for j in range(len(P[k])): P[k][j] -= lr * G[k][j]
    return loss / (len(xs) - 1)

fwd, bwd = new_lm(), new_lm()
for epoch in range(15):                            # 前向 LM 从左到右读，
    tot = 0.0                                      # 后向 LM 从右到左读
    for s in train:
        ids = [ix[w] for w in s]
        tot += sgd_step(fwd, ids) + sgd_step(bwd, ids[::-1])
    if epoch % 7 == 0 or epoch == 14:
        print(f"epoch {epoch:2d}  mean loss per token (fwd + bwd) / 2 = {tot / (2 * len(train)):.3f}")

def bank_vectors(s):                               # "bank"（位置 5）的表示
    ids = [ix[w] for w in s]
    f = states(fwd, ids)[5]
    b = states(bwd, ids[::-1])[len(ids) - 1 - 5]
    return {"forward": f, "backward": b, "concat": f + b}

def cos(u, v): return sum(a * b for a, b in zip(u, v)) / math.sqrt(sum(a * a for a in u) * sum(b * b for b in v) + 1e-30)
allv = [bank_vectors(s) for s in train]                # "bank" 向量的均值，用于中心化
mean = {k: [sum(v[k][j] for v in allv) / len(allv) for j in range(len(allv[0][k]))] for k in allv[0]}
def centred(v): return {k: [a - m for a, m in zip(v[k], mean[k])] for k in v}
mk = lambda verb: ["the", "man", "went", "to", "the", "bank", "to", verb, "."]
for a, b in [("fish", "pay"), ("fish", "row")]:
    va, vb = bank_vectors(mk(a)), bank_vectors(mk(b)); ca, cb = centred(va), centred(vb)
    print(f"bank|{a} vs bank|{b}: " + "  ".join(
        f"{k} raw {cos(va[k], vb[k]):.4f} centred {cos(ca[k], cb[k]): .3f}" for k in ["forward", "backward"]))

# 主语有歧义的句子中 "bank" 的词义最近质心分类
cent = {}
for sense in SENSE:
    vs = [centred(bank_vectors(sentence(sense))) for _ in range(50)]
    cent[sense] = {k: [sum(v[k][j] for v in vs) / 50 for j in range(len(vs[0][k]))] for k in vs[0]}
test = [(sense, sentence(sense, subj)) for sense in SENSE for subj in ["man", "woman"] for _ in range(25)]
for k in ["forward", "backward", "concat"]:
    ok = sum(max(SENSE, key=lambda c: cos(centred(bank_vectors(s))[k], cent[c][k])) == sense
             for sense, s in test)
    print(f"sense of 'bank' from {k:8s} state: {ok}/{len(test)} correct")
```

输出（约二十秒）：

```
epoch  0  mean loss per token (fwd + bwd) / 2 = 0.440
epoch  7  mean loss per token (fwd + bwd) / 2 = 0.408
epoch 14  mean loss per token (fwd + bwd) / 2 = 0.388
bank|fish vs bank|pay: forward raw 1.0000 centred  1.000  backward raw 0.9995 centred -0.992
bank|fish vs bank|row: forward raw 1.0000 centred  1.000  backward raw 1.0000 centred  0.980
sense of 'bank' from forward  state: 50/100 correct
sense of 'bank' from backward state: 100/100 correct
sense of 'bank' from concat   state: 100/100 correct
```

对 “the man went to the bank to …”，“bank” 处的前向状态在两种词义下*完全相同*——它读过同样五个词——所以任何分类器都无法从中恢复词义，最近质心分类等于瞎猜（$50/100$）。后向状态读过 “… to fish” 或 “… to pay”，把两种词义完美分开；ELMo 所用的拼接继承了这一点。中间几行还有第二课。两种词义的后向向量之间的*原始*余弦是 $0.9995$：训练好的 RNN 的单元对每次 “bank” 都同样大多在 $\pm1$ 附近饱和，这些共享分量主导了余弦。只有减去 “bank” 的均值向量之后，两种词义才表现为相反的方向（$-0.992$），而同一词义的两个动词仍然相似（$0.980$）。上下文向量之间的原始余弦会严重误导，这一点在[[#sec-analysis]]中展开。

## 使用预训练表示 {#sec-transfer}

复用预训练网络迎接新任务有两种方式。

- **特征抽取。** 冻结预训练网络，算出它的表示，在表示之上训练任务模型。ELMo 就是这样用的：只训练 $\mathbf{w}$、$\gamma$ 和任务模型。表示可以算一次存下来；一个预训练网络服务许多任务。
- **微调。** 用预训练网络初始化任务模型，然后在任务上继续训练*全部*参数，通常再加一个小的任务专属输出层。Howard 和 Ruder 的 **ULMFiT**（2018）把一个预训练 LSTM 语言模型（AWD-LSTM，Merity、Keskar 和 Socher，2018）先微调到目标领域的文本、再微调到分类任务，配合逐层学习率、先预热后衰减的调度和逐层解冻，在若干文本分类基准上把误差降低 $18$–$24\%$。

微调改造表示本身，任务数据充足时通常迁移得更好；特征抽取更便宜，并保持预训练网络原封不动。GPT（Radford et al., 2018）和 BERT（Devlin et al., 2019）都采纳了微调，它成为标准，直到对超大模型使用提示（[[prompting-rag]]）提供了第三条路：完全不做梯度更新。

::: example 两种方式的费用 {#ex-transfer-cost}
一位实践者有 $5$ 个分类任务和一个 $1$ 亿参数的预训练网络。微调时，五个部署中的模型一共要存多少个参数？特征抽取呢，每个任务头 $1$ 百万参数？每种方式每一步的代价（相对预训练网络的一次前向传播）大约是多少？
::: solution
微调产生五份独立的拷贝：$5\cdot100 = 500$ 百万参数（外加五个小任务头）。特征抽取只存一份网络加任务头：$100 + 5\cdot1 = 105$ 百万。每一步上，微调需要整个网络的一次前向加一次反向，约等于三次前向传播（[[neural-networks/backpropagation#prop-flops]]）；特征抽取只需要前向传播（特征存下来就一次都不要）加任务头的小开销。存储上的差距后来由 adapters、LoRA 这类参数高效微调方法补上（[[post-training]]）。
:::
:::

::: quiz
为什么 ELMo 训练两个分开的单向语言模型，而不是一个双向 RNN 来预测每个词元？
- [ ] 两个单向模型参数更少。
- [ ] 双向 RNN 无法用随时间反向传播训练。
- [x] 双向 RNN 某个位置的表示已经读过要被预测的词元，预测变得毫无难度。
- [ ] 后向模型只在预训练期间使用，之后丢掉。
::: solution
由[[#prop-leakage]]，双向 RNN 的后向一半在产生用来预测 $x_t$ 的状态之前就读了 $x_t$，网络大可直接照抄。把每个方向作为自己的语言模型来训练，每次预测都看不到自己的目标；两个方向的状态只在事后合并。两个方向都被保留、都用进 ELMo 向量。
:::
:::

## 上下文表示里有什么 {#sec-analysis}

上下文向量是学出来的，不是设计出来的，所以它们编码了什么必须靠测量。

::: definition 探针分类器 {#def-probe}
针对某个语言学属性（词性、句法深度、实体类型、词义）的**探针**是一个简单分类器——通常是线性的——在冻结的表示 $\mathbf{r}_t$ 上训练来预测词元 $t$ 的该属性。留出数据上探针的高准确率被当作该属性（线性地）可从表示中解码的证据。
:::

对 ELMo 和 BERT 的探针研究发现一个大致的层次：词性在低层最可解码，句法结构在中层，共指这类语义性质在更高的层——Tenney、Das 和 Pavlick（2019）把这总结为 BERT “重新发现了经典 NLP 流水线”。Hewitt 和 Manning（2019）表明，对 BERT 和 ELMo 向量做一个线性变换，平方距离就近似句法分析树中的距离（“结构探针”）。

::: warning 探针能解码的，模型就在用
探针表明信息*存在*且*可提取*，并不表明网络在自己的预测中用了它。强大的探针还能自己学会任务本身：Hewitt 和 Liang（2019）引入**对照任务**——给每个词型一个随机但一致的标签——发现容量足够的探针在上面也拿高分，所以准确率必须与对照比较（他们的“选择性”）。上下文向量之间的相似度也要小心解读：Ethayarajh（2019）发现 ELMo、BERT 和 GPT-2 的表示是**各向异性**的——它们占据一个窄锥，以至不相关的词之间余弦也很高——正是清单里原始余弦见到的现象。解读相似度之前，先把向量中心化或与基线比较。
:::

Ethayarajh 还测量了向量有多“上下文”。定义一个词在第 $\ell$ 层的**自相似**为它在不同上下文中的表示之间的平均余弦。在三个模型中它都在更高层递减：上层产生更随上下文而变的表示。他发现，平均而言一个词的上下文表示的方差中不到 $5\%$ 能由单个静态向量（它们的第一主成分）解释——上下文嵌入不是静态嵌入加噪声。

::: example 自相似 {#ex-self-sim}
一个词在三个上下文中得到（为了说明用两维）表示 $(1, 0.2)$、$(0.9, 0.4)$ 和 $(0.2, 1)$。计算它的自相似。
::: solution
三个两两余弦是 $\cos(\mathbf{r}_1, \mathbf{r}_2) = (0.9 + 0.08)/(1.0198\cdot0.9849) = 0.976$、$\cos(\mathbf{r}_1, \mathbf{r}_3) = (0.2 + 0.2)/(1.0198\cdot1.0198) = 0.385$、$\cos(\mathbf{r}_2, \mathbf{r}_3) = (0.18 + 0.4)/(0.9849\cdot1.0198) = 0.577$。自相似是它们的均值 $0.646$。前两个上下文大概共享一个词义，第三个不同。在真实分析中，对*不同*词的随机词对做同样的计算，就是这个数应当与之比较的各向异性基线。
:::
:::

## 从 ELMo 到 BERT 和 GPT {#sec-next}

ELMo 很快被超越了，但超越它的模型保留了它的核心思想——在未标注文本上预训练一个深网络、复用它的上下文表示——改变的是架构和迁移方式。

- **GPT**（Radford、Narasimhan、Salimans 和 Sutskever，2018）在一个图书语料上把一个十二层 Transformer 解码器预训练成从左到右的语言模型，再用一个小输出层和任务专属的输入格式在每个任务上微调。它是单向的，像 ELMo 的前向一半，但更深，且用注意力取代循环。
- **BERT**（Devlin、Chang、Lee 和 Toutanova，2019）用**掩码语言模型**目标预训练一个 Transformer*编码器*：藏起约 $15\%$ 的词元，从两边预测它们。掩码正是[[#prop-leakage]]的修法——掩码位置的表示没法抄一个它没见过的词元——并且在每一层都带来深层双向性，而不像 ELMo 那样把两个方向浅浅地拼在一起。微调后的 BERT 在 2018 年底一大批基准上刷新了纪录。

架构的比较见[[transformers/architecture-families]]，预训练目标与数据见[[pretraining/pretraining-objectives]]和[[pretraining]]。迁移的词汇表——预训练表示、特征抽取与微调之争、探针——来自本章描述的时期。

::: history
用未标注文本为监督任务学表示由来已久：Brown 聚类（Brown et al., 1992）按上下文给词分组，是标注器里的标准特征；Collobert 和 Weston（2008；Collobert et al., 2011）用神经模型预训练词向量并跨任务使用。Word2vec（Mikolov et al., 2013）和 GloVe（Pennington、Socher 和 Manning，2014）让静态嵌入无处不在。上下文预训练出现在 2015 到 2018 年间：Dai 和 Le 的半监督序列学习（2015）、CoVe（McCann et al., 2017）、TagLM（Peters et al., 2017），然后是 ELMo——Matthew Peters、Mark Neumann、Mohit Iyyer、Matt Gardner、Christopher Clark、Kenton Lee 和 Luke Zettlemoyer 的《深度上下文词表示》（"Deep contextualized word representations"，NAACL 2018），来自 Allen 人工智能研究所和华盛顿大学——与 ULMFiT（Howard 和 Ruder，ACL 2018）、GPT（2018 年 6 月）一起。BERT（2018 年 10 月预印本，NAACL 2019）推广了这一思路，2018 常被称为迁移学习进入 NLP 的一年。ELMo 和 BERT 还开了一轮以《芝麻街》角色命名的风气（ERNIE、Big Bird、Grover）。
:::

::: summary
- **静态嵌入**给一个词一个向量；对多义词它近似各词义按频率加权的平均，罕见词义因此表征很差。
- **上下文嵌入** $\mathbf{r}_t = F(x_1, \dots, x_n)_t$ 依赖整个序列；它取自一个通常以语言建模在未标注文本上预训练的网络。
- 训练去预测词元的单个双向网络会**泄漏**目标；ELMo 分别训练前向和后向的 LSTM 语言模型（**biLM**），共享词元表示和 softmax。
- **ELMo** 向量是 biLM 各层的任务专属 softmax 加权混合，乘 $\gamma$ 后加进任务模型的输入；低层多句法，高层多语义。ELMo 在六个各不相同的基准上把相对误差降低 $6$–$20\%$。
- 预训练网络的复用方式：**特征抽取**（冻结，如 ELMo）或**微调**（全部权重更新，如 ULMFiT、GPT、BERT）。
- **探针**测量什么是可解码的，须与对照任务比较；上下文向量是**各向异性**的，所以原始余弦需要基线。BERT 的掩码目标让每一层的表示都双向。
:::

## 习题

::: exercise 词义的加权平均 {level=1 check="0.7*1+0.3*(-1)"}
一个词有两个词义，一维理想向量 $u_1 = 1$、$u_2 = -1$，使用频率分别为 $70\%$ 和 $30\%$。[[#prop-average]]的最优静态向量是什么？
::: solution
$e^* = 0.7\cdot1 + 0.3\cdot(-1) = 0.4$。它指向多数词义，却丢了大半长度，而且离两个词义都远：平方误差为 $0.7\cdot0.36 + 0.3\cdot1.96 = 0.84$。
:::
:::

::: exercise 标量混合的权重 {level=1 check="1/(1+2*exp(-2))"}
一个 biLM 有三层，某个任务学到 $\mathbf{w} = (2, 0, 0)$。词元层（$j = 0$）分到多少权重？
::: solution
$s_0 = e^2/(e^2 + 1 + 1) = 1/(1 + 2e^{-2}) = 0.787$。另外两层各 $0.106$。
:::
:::

::: exercise biLM 的层向量 {level=1}
在 ELMo 中，词元层写成 $\mathbf{h}^{\text{LM}}_{t,0} = [\mathbf{x}_t; \mathbf{x}_t]$，把词元表示重复一遍。为什么要重复？按 ELMo 的尺寸，各 $\mathbf{h}^{\text{LM}}_{t,j}$ 的维数是多少？
::: solution
LSTM 层是前向与后向状态的拼接，投影后各 $512$ 维，所以 $j = 1, 2$ 时 $\mathbf{h}^{\text{LM}}_{t,j}\in\R^{1024}$。加权和[[#eq-elmo]]要求所有层同尺寸，于是把 $512$ 维的词元表示复制成 $1{,}024$ 维。每个 ELMo 向量因此是 $1{,}024$ 维。
:::
:::

::: exercise 前向状态不知道的事 {level=2}
在清单的语料里，哪些句子让前向语言模型在 “bank” 处的状态足以确定词义，哪些不够？预测在*无歧义*主语的测试句上前向状态的分类准确率，并解释为什么在歧义主语上测得的 $50/100$ 恰等于瞎猜。
::: solution
“bank” 处的前向状态读过 “the S went to the bank”。当 $S\in\{\text{fisherman}, \text{boatman}, \text{banker}, \text{clerk}\}$ 时主语决定词义，前向语言模型有充分理由把它记着，因为它要预测后面的动词；这类句子上准确率应接近 $100\%$。当 $S\in\{\text{man}, \text{woman}\}$ 时两种词义的前缀相同，状态在河流句与金融句上就是同一个向量；分类器给 $50$ 条 “man” 测试句全打一个标签、$50$ 条 “woman” 句全打一个标签，而每组一半河流、一半金融，恰有 $25 + 25 = 50$ 条对。
:::
:::

::: exercise 实践中的泄漏 {level=2}
一个学生训练双向 LSTM，从 $[\overrightarrow{\mathbf{h}}_t; \overleftarrow{\mathbf{h}}_t]$（*在*位置 $t$ 的状态）预测 $x_t$，报告训练困惑度 $1.02$。解释这个结果，并给出从语言建模获得双向表示的两种正确做法。
::: solution
两半都读过 $x_t$ 本身，网络可以把输入抄到输出：困惑度接近 $1$ 是泄漏的招牌（[[#prop-leakage]]），不是模型好的标志。正确的替代：(1) ELMo 的 biLM，前向模型用 $\overrightarrow{\mathbf{h}}_{t-1}$ 预测 $x_t$、后向模型用 $\overleftarrow{\mathbf{h}}_{t+1}$，作为两个分开的目标训练；(2) 掩码语言建模，把输入中的 $x_t$ 换成掩码词元，用位置 $t$ 的双向表示预测它（BERT）。第三种是从 $[\overrightarrow{\mathbf{h}}_{t-1}; \overleftarrow{\mathbf{h}}_{t+1}]$ 预测 $x_t$，它同样见不到目标，只是更深的层要仔细设计，免得两个方向混在一起。
:::
:::

::: exercise 特征的存储 {level=2 check="1000000*30*1024*2"}
一位实践者把 ELMo 向量（$1{,}024$ 维）为一个含 $100$ 万条、平均 $30$ 词元的训练集缓存下来，用 16 位浮点。最终混合向量的缓存要多少字节？若保留全部三层、使标量混合仍可学习，又是多少？
::: solution
只存混合结果：$10^6\cdot30\cdot1{,}024\cdot2$ 字节 $= 6.144\times10^{10}$ 字节，约 $61$ GB。保留三层则翻三倍，约 $184$ GB。只有许多训练轮复用同样特征时缓存才划算；否则现算更省存储，代价是每轮每句一次 biLM 前向传播。
:::
:::

::: exercise 中心化与余弦相似度 {level=2}
证明若所有表示共享一个大公共分量，$\mathbf{r}_i = \mathbf{m} + \boldsymbol\epsilon_i$ 且 $\lVert\mathbf{m}\rVert\gg\lVert\boldsymbol\epsilon_i\rVert$，则无论 $\boldsymbol\epsilon$ 如何都有 $\cos(\mathbf{r}_i, \mathbf{r}_j)\to1$，并证明减去 $\mathbf{m}$ 可恢复 $\cos(\boldsymbol\epsilon_i, \boldsymbol\epsilon_j)$。把它与清单的输出联系起来。
::: solution
$\mathbf{r}_i^\top\mathbf{r}_j = \lVert\mathbf{m}\rVert^2 + \mathbf{m}^\top(\boldsymbol\epsilon_i + \boldsymbol\epsilon_j) + \boldsymbol\epsilon_i^\top\boldsymbol\epsilon_j$，且 $\lVert\mathbf{r}_i\rVert^2 = \lVert\mathbf{m}\rVert^2 + 2\mathbf{m}^\top\boldsymbol\epsilon_i + \lVert\boldsymbol\epsilon_i\rVert^2$。分子分母同除以 $\lVert\mathbf{m}\rVert^2$，除首位的 $1$ 之外每一项都是 $O(\lVert\boldsymbol\epsilon\rVert/\lVert\mathbf{m}\rVert)$，余弦趋于 $1$。减去 $\mathbf{m}$ 后向量就是 $\boldsymbol\epsilon_i$ 与 $\boldsymbol\epsilon_j$，它们的余弦只反映差异。清单里，后向 “bank” 向量共享接近 $\pm1$ 的饱和分量（公共部分），跨词义的原始余弦为 $0.9995$，减去经验均值后为 $-0.992$：词义住在小的偏差里。
:::
:::

::: exercise 探针与它的对照 {level=3}
第二层向量上的线性探针以 $97\%$ 准确率预测词性；同一个探针在对照任务（给每个词型从同一标签集里分配一个随机但一致的标签）上训练达到 $92\%$。第 $0$ 层（词元）向量上的探针在词性上 $95\%$，对照上 $93\%$。计算各自的“选择性”（任务准确率减对照准确率），并说明能得出什么结论、不能得出什么结论。
::: solution
第二层：$97 - 92 = 5$ 个百分点；第 $0$ 层：$95 - 93 = 2$ 个百分点。词元层记住“每个词型一个标签”几乎和预测真标签一样好，所以它的高词性准确率除了说明“多数词只有一个典型词性”之外说明不了什么；第二层更有选择性，与它编码随上下文而变的句法信息（把 “run” 这类歧义词分辨成名词或动词）相符。不能得出的结论：模型在语言建模中*用了*这些信息；或非线性探针会给出同样的层次排序。第一个说法需要干预——沿探针方向改变表示、观察模型预测的变化。
:::
:::

::: exercise 实现标量混合 {level=3}
给清单加上面向词义任务的 ELMo 式混合：用 $\gamma\big(s_0[\mathbf{x}; \mathbf{x}] + s_1[\overrightarrow{\mathbf{h}}; \overleftarrow{\mathbf{h}}]\big)$ 表示 “bank”，其中 $\mathbf{x}$ 是每个语言模型的输入嵌入列 $W_{xh}[:, x]$，并在无歧义句子的词义标签上把 $\mathbf{w}$ 和 $\gamma$ 与一个逻辑回归头一起训练。预测混合会学到什么权重，为什么。
::: solution
“bank” 的词元层在每句话里都是同一个向量（一个词型），不携带词义信息；词义全在 LSTM 层里——歧义句里在后向一半，其他情况下两半都有。于是逻辑损失上的梯度下降会抬高 $w_1$ 相对 $w_0$ 的比例，推动 $s_1\to1$，并增大 $\gamma$ 使逻辑输出更锐利（直到正则化或学习率停下）。实现：算 $\mathbf{s} = \operatorname{softmax}(\mathbf{w})$ 和混合向量 $\mathbf{m}$；头输出 $\sigma(\mathbf{a}^\top\mathbf{m} + c)$；对数损失 $\ell$ 的梯度是 $\partial\ell/\partial\mathbf{m} = (p - y)\mathbf{a}$、$\partial\ell/\partial\gamma = (\partial\ell/\partial\mathbf{m})^\top\mathbf{m}/\gamma$、$\partial\ell/\partial w_j = s_j\big(g_j - \sum_ks_kg_k\big)$，其中 $g_j = \gamma(\partial\ell/\partial\mathbf{m})^\top\mathbf{h}_j$（softmax 反向法则）。对 $w_0$ 和 $\gamma$ 做差分检查即可验证梯度。
:::
:::
