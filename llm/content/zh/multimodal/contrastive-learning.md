[[multimodal/vision-transformers]] 中的视觉 Transformer 训练来预测一个固定标签集中的某一个标签——ImageNet 的 $1000$ 个类别，或 JFT 的 $18{,}000$ 个。这样的标签收集起来昂贵，而且它们教给模型的是一份封闭的词表：在 ImageNet 上训练的分类器对“夜晚拥挤的电车”或“手绘的细胞示意图”没有输出。与此同时，网络上存有数十亿张自带人们所写文本的图像——说明文字、替代文本、标题、周围的句子。这些文本嘈杂而不完整，但它用开放的语言描述图像，而且数量巨大。

**图文对比学习**把这些对子变成监督信号。两个编码器，一个管图像、一个管文本，把各自的输入映进一个共享的向量空间；训练把每张图像拉向它自己的说明文字，并把它从其他图像的说明文字推开。Radford 等人 (2021) 在 $4$ 亿个图文对上训练了这样一个模型 **CLIP**，并展示了它的共享空间能够把图像分类到从未显式训练过的类别——**零样本分类**——只需把类别名嵌成文本。本章从 [[prompting-rag/text-embeddings#def-infonce]] 的 InfoNCE 损失出发推导 CLIP 的目标，解释可学习温度的作用，说明零样本分类与检索如何工作，然后转向 SigLIP 的 sigmoid 损失、这些模型的训练数据，以及共享空间的几何与失效方式。CLIP 式的编码器是多数视觉-语言模型（[[multimodal/vision-language-models]]）的眼睛，也是许多图像生成器（[[multimodal/image-generation]]）的文本条件，因此它能表示什么、不能表示什么，其意义远不止分类。

## 共享的嵌入空间 {#sec-shared}

::: definition 图文双编码器 {#def-dual}
**双编码器**（dual encoder）由一个图像编码器 $f_\theta$（ViT 或卷积网络）和一个文本编码器 $g_\phi$（Transformer）组成，二者之后各接一个投影到公共维数 $d$ 的线性层，并归一化为单位长度：

$$
\mathbf{u} = \frac{W_I f_\theta(x)}{\lVert W_I f_\theta(x)\rVert},\qquad \mathbf{v} = \frac{W_T g_\phi(t)}{\lVert W_T g_\phi(t)\rVert}.
$$

图像 $x$ 与文本 $t$ 的相似度是余弦 $\mathbf{u}^\top\mathbf{v}\in[-1, 1]$。
:::

两个编码器既不共享权重，也从不注意对方的输入：计算图像嵌入时看不到文本，反之亦然。这正是 [[prompting-rag/text-embeddings#def-bi-cross]] 的双编码器设计，它带来同样的优点——一百万张图像的嵌入可以一次算好、供文本查询检索——也带来同样的弱点：词与画面之间的细粒度交互，只能靠一个点积来捕捉。

在 CLIP 中，图像编码器要么是经过改版的 ResNet，要么是 ViT，图像嵌入取自 CLS 输出；文本编码器是一个 $12$ 层、宽 $512$、约 $6300$ 万参数的 Transformer，使用 $49{,}152$ 个词元的字节级 BPE 词表、上下文 $77$ 个词元，文本嵌入取它在文本结束词元处的输出。两者都从零开始训练。

## CLIP 的目标 {#sec-clip}

训练以 $B$ 个图文对 $(x_i, t_i)$ 组成的批量进行。每张图像的正确说明文字就是与它同来的那一条；批中其余 $B - 1$ 条充当负例——即 [[prompting-rag/text-embeddings#sec-contrastive]] 的批内负例。与“为查询检索段落”不同，这个任务是对称的：每条说明文字也要在 $B$ 张图像中认出自己的那一张。

::: definition 带可学习温度的对称对比损失 {#def-clip-loss}
设 $\mathbf{u}_i$、$\mathbf{v}_j$ 是一个批量中归一化后的嵌入，$S_{ij} = \mathbf{u}_i^\top\mathbf{v}_j$ 是由余弦构成的 $B\times B$ 矩阵，$s = 1/\tau > 0$ 是可学习的 **logit 尺度**（逆温度）。**CLIP 损失**是两个交叉熵的平均：对 $sS$ 的行做图像到文本，对其列做文本到图像：

$$
\mathcal{L} = \frac{1}{2B}\sum_{i=1}^{B}\left[\Big(\log\sum_{j=1}^{B}e^{sS_{ij}} - sS_{ii}\Big) + \Big(\log\sum_{j=1}^{B}e^{sS_{ji}} - sS_{ii}\Big)\right].
$$ {#eq-clip}

CLIP 参数化为 $s = e^{\vartheta}$，用梯度下降训练 $\vartheta$，初始取 $s = 1/0.07 \approx 14.3$，并把 $s$ 截断在 $100$。
:::

每个括号都是一个 InfoNCE 损失（[[prompting-rag/text-embeddings#def-infonce]]）：行项在 $B$ 条说明文字中为图像 $i$ 分类，列项在 $B$ 张图像中为说明文字 $i$ 分类。因为整个批量的分数一次矩阵乘法就能算出，负例数量随批量增大而代价几乎没有增加；CLIP 用了 $B = 32{,}768$。Radford 等人发现对比目标比他们尝试过的替代方案高效得多：用 Transformer 语言模型预测确切的说明文字，其零样本 ImageNet 分类的学习速度约为预测说明文字词袋的三分之一，而词袋又比对比训练慢约四倍。预测*哪一条*说明文字属于某张图像，比预测它的用词容易，而这正是一个共享空间所需要的全部。

### 温度 {#sec-temperature}

余弦被限制在 $[-1, 1]$，logit 尺度取 $1$ 时 softmax 无法足够“自信”：即使 $S_{ii} = 1$、$S_{ij} = 0$ 的完美模型，损失也有 $\log(e + B - 1) - 1$，在 $B = 32{,}768$ 时约为 $9.4$。logit 尺度把余弦拉伸成足够大的 logit，让 softmax 得以集中。让它被学习而不是手工调节，模型就能随着嵌入的改进不断锐化 softmax。

::: proposition 关于 logit 尺度的梯度 {#prop-scale-grad}
设 $p_{ij} = e^{sS_{ij}}/\sum_ke^{sS_{ik}}$（行 softmax），$q_{ji} = e^{sS_{ji}}/\sum_ke^{sS_{ki}}$（列 softmax）。则

$$
\frac{\partial\mathcal{L}}{\partial s} = \frac{1}{2B}\sum_{i=1}^{B}\Big[\Big(\sum_j p_{ij}S_{ij} - S_{ii}\Big) + \Big(\sum_j q_{ji}S_{ji} - S_{ii}\Big)\Big].
$$ {#eq-scale-grad}

每一项把模型在自己的 softmax 下的期望相似度与正确对的相似度相比较。当每个正确对的余弦都是其所在行与列的最大值时，每一项都为负，梯度下降会无界地增大 $s$；只有当某些负例得分高到与正例相当时，才存在有限的 optimum。
:::

::: proof
对单独一行，$\frac{\partial}{\partial s}\big(\log\sum_je^{sS_{ij}} - sS_{ii}\big) = \frac{\sum_jS_{ij}e^{sS_{ij}}}{\sum_je^{sS_{ij}}} - S_{ii} = \sum_jp_{ij}S_{ij} - S_{ii}$，列同理；再取平均。一行元素的凸组合至多为该行的最大值，等号成立仅当全部权重都落在最大元素上；所以若 $S_{ii}$ 是其行的严格最大值，则对一切有限的 $s$ 有 $\sum_jp_{ij}S_{ij} < S_{ii}$。若这对所有行与列都成立，则处处 $\partial\mathcal{L}/\partial s < 0$，损失随 $s\to\infty$ 向 $0$ 递减。
:::

这正是 CLIP 把 $s$ 截断在 $100$ 的原因：在模型已经能分开的训练批上，损失奖励越来越大的尺度，使 softmax 无限尖锐、穿过嵌入的梯度不稳定。而在真实的批上——其中总有易混淆的对子和嘈杂的说明文字——学到的尺度会稳定在有限值——在 CLIP 中，它在训练期间升到了上限。

::: example 三个温度下的损失 {#ex-clip-temp}
下面的代码构造 $B = 8$ 个对子，其图像与文本嵌入由一个共享的“含义”向量加独立噪声而成，使正例对的余弦平均为 $0.63$、负例对约为 $0$。读出 $s = 1$、$14.3$ 与 $100$ 时的损失，并解释这一规律。
::: solution
代码输出 $s = 1$ 时为 $1.587$，$s = 14.3$ 时为 $0.210$，$s = 100$ 时为 $0.780$；作比较，随机水平为 $\ln8 = 2.079$。$s = 1$ 时嵌入已经分开了对子，但 softmax 太平，无法表达这种分开。$s = 14.3$ 时损失接近极小：数值导数 $\partial\mathcal{L}/\partial s = -0.004$ 几乎为零。$s = 100$ 时损失回升，因为少数含噪的对子中有负例压过或几乎压过正例，而大尺度放大了这些错误——[[#prop-scale-grad]] 中出现了一些正的项。
:::
:::

```python
import math, random
random.seed(1)
d, B = 16, 8
def unit(v):
    n = math.sqrt(sum(x * x for x in v)); return [x / n for x in v]
dot = lambda a, b: sum(x * y for x, y in zip(a, b))
def lse(z):
    m = max(z); return m + math.log(sum(math.exp(x - m) for x in z))

# B 个成对嵌入：共享的“含义”加模态特有噪声
meaning = [[random.gauss(0, 1) for _ in range(d)] for _ in range(B)]
I = [unit([m + 0.8 * random.gauss(0, 1) for m in v]) for v in meaning]   # 图像侧
T = [unit([m + 0.8 * random.gauss(0, 1) for m in v]) for v in meaning]   # 文本侧
S = [[dot(I[i], T[j]) for j in range(B)] for i in range(B)]                 # B x B 的余弦

def clip_loss(S, s):                     # logit 尺度 s = 1/tau 的对称 InfoNCE
    rows = sum(lse([s * x for x in S[i]]) - s * S[i][i] for i in range(B)) / B
    cols = sum(lse([s * S[j][i] for j in range(B)]) - s * S[i][i] for i in range(B)) / B
    return (rows + cols) / 2

def siglip_loss(S, t, b):                # 逐对 sigmoid 损失，对角线 z = +1
    L = 0.0
    for i in range(B):
        for j in range(B):
            z = 1 if i == j else -1
            L += math.log1p(math.exp(-z * (t * S[i][j] + b)))
    return L / B

print("mean cosine, matched %.3f  unmatched %.3f" % (
    sum(S[i][i] for i in range(B)) / B,
    sum(S[i][j] for i in range(B) for j in range(B) if i != j) / (B * B - B)))
for s in (1, 1 / 0.07, 100):
    print(f"logit scale {s:7.2f}: CLIP loss {clip_loss(S, s):.4f}   (chance log B = {math.log(B):.4f})")
h = 1e-5; s = 1 / 0.07
print("dL/ds numeric %.5f" % ((clip_loss(S, s + h) - clip_loss(S, s - h)) / (2 * h)))
print("SigLIP loss  t=10,b=-10: %.4f   t=10,b=0: %.4f" % (siglip_loss(S, 10, -10), siglip_loss(S, 10, 0)))

# 零样本分类：3 个类的“提示”嵌入，300 张带噪测试图像
classes = [unit([random.gauss(0, 1) for _ in range(d)]) for _ in range(3)]
correct = 0
for n in range(300):
    y = n % 3
    img = unit([c + 0.9 * random.gauss(0, 1) for c in classes[y]])
    pred = max(range(3), key=lambda k: dot(img, classes[k]))
    correct += pred == y
print("zero-shot accuracy:", correct / 300)
```

```text
mean cosine, matched 0.631  unmatched 0.014
logit scale    1.00: CLIP loss 1.5873   (chance log B = 2.0794)
logit scale   14.29: CLIP loss 0.2103   (chance log B = 2.0794)
logit scale  100.00: CLIP loss 0.7799   (chance log B = 2.0794)
dL/ds numeric -0.00404
SigLIP loss  t=10,b=-10: 3.7323   t=10,b=0: 8.9386
zero-shot accuracy: 0.7
```

::: widget plot
f: -log(exp(x*a)/(exp(x*a) + exp(x*h) + (n-2)*exp(x*c)))
x: 0, 100
y: 0, 4
sliders: a=0.3:-0.2:0.6:0.01; h=0.25:-0.2:0.6:0.01; c=0.05:-0.2:0.3:0.01; n=256:2:32768:2
labels: row loss against the logit scale $s$
caption: 批量为 $n$ 时，一行 CLIP 损失随 logit 尺度 $s$ 的变化，其中正例余弦为 $a$、一个困难负例余弦为 $h$、$n - 2$ 个简单负例余弦为 $c$。当 $a > h$ 时，损失随 $s$ 增大而趋向零（[[#prop-scale-grad]]）。把 $h$ 调到超过 $a$——对应一个标错的对子，或一条更贴合另一张图像的说明文字——损失就在有限尺度处出现极小，越过它后线性增长。注意这些余弦有多小：训练好的 CLIP 模型给正例对的余弦约为 $0.3$。
:::

## 零样本分类与检索 {#sec-zero-shot}

共享空间把分类变成了检索。要在 $K$ 个类别中为图像分类，把每个类别写成一句话，用文本编码器嵌入这些句子，取句子与图像最接近的那个类别。

::: definition 零样本分类 {#def-zero-shot}
给定类别名 $c_1, \dots, c_K$ 和一个**提示模板**，如 "a photo of a {}."。设 $\mathbf{w}_k$ 是把类别 $k$ 填入模板后得到的归一化文本嵌入。零样本分类器把嵌入为 $\mathbf{u}$ 的图像 $x$ 分到

$$
\hat y = \arg\max_k\ \mathbf{u}^\top\mathbf{w}_k, \qquad p(k\mid x) = \operatorname{softmax}_k\big(s\,\mathbf{u}^\top\mathbf{w}_k\big).
$$ {#eq-zero-shot}

若用多个模板，则 $\mathbf{w}_k$ 取该类各模板嵌入的平均再归一化（**提示集成**）。
:::

文本嵌入 $\mathbf{w}_1, \dots, \mathbf{w}_K$ 恰是一个线性分类器权重矩阵的行，只不过这些权重由文本编码器生成，而不是从带标签的图像学来。Radford 等人发现，光秃秃的类别名不如一个句子——网络上的说明文字很少只有一个词，而 "crane" 或 "boxer" 这样的词本身就有歧义——并且模板 "A photo of a {label}." 比裸类别名带来 $1.3$ 个百分点的 ImageNet 准确率，再对 $80$ 个模板（"a blurry photo of a {}."、"a drawing of a {}." 等）取平均又多出 $3.5$ 个。其中最大的模型是一个在 $336$ 像素上微调的 ViT-L/14，在 ImageNet 上达到 $76.2\%$ 的零样本 top-1 准确率——相当于用 ImageNet 的 $128$ 万张带标签图像训练的 ResNet-50——却一张那些图像都没有用。在素描与风格化等分布偏移的变体上，零样本 CLIP 的准确率损失也远小于在 ImageNet 上训练的监督模型，这说明监督的 ImageNet 模型多少学到了其数据集的一些怪癖。

::: example 手算零样本分类 {#ex-zero-shot}
一张图像的嵌入为 $\mathbf{u} = (0.6, 0.8, 0)$。“狗”“猫”“汽车”的提示嵌入分别为 $(0.8, 0.6, 0)$、$(0, 0.6, 0.8)$ 与 $(0.6, 0, 0.8)$。为这张图像分类，并用 $s = 10$ 计算各类的概率。
::: solution
余弦依次为 $0.48 + 0.48 = 0.96$、$0.48$ 与 $0.36$，所以预测是“狗”。logit 为 $9.6$、$4.8$、$3.6$，softmax 给出“狗” $1/(1 + e^{-4.8} + e^{-6}) = 0.989$、“猫” $0.008$、“汽车” $0.002$。若用训练好的尺度 $s = 100$，概率几乎就是 $1$ 和 $0$：对比模型的 softmax 十分尖锐，不经进一步调整并不是校准过的概率。
:::
:::

同一个空间还支持两个方向的**检索**：文本到图像（找出与查询句子最接近的图像）与图像到文本（找出与图像最接近的说明文字）。评测用 **recall@K**，即正确项出现在前 $K$ 个结果中的查询占比，数据集如每张图像五条说明文字的 MS-COCO 与 Flickr30k。图像与说明文字之间的余弦也被用作衡量生成图像与提示词匹配程度的自动分数（CLIPScore，Hessel 等人，2021），并被用于为训练其他模型过滤网络数据。

::: warning 对比模型的余弦既不是概率，也不是绝对分数
图像与其正确说明文字之间的 CLIP 余弦为 $0.3$ 是平常事，无关的对子也可能得 $0.1$ 到 $0.2$ 分。只有同一查询内部的比较有意义：对这张图像，说明文字 A 是否胜过说明文字 B。像数据过滤器那样跨查询对原始余弦取阈值（“保留相似度高于 $0.28$ 的对子”），会把依赖图像和依赖文本的偏移混在一起；而 [[#eq-zero-shot]] 的 softmax 概率在训练好的尺度下过度自信。把两者当置信度使用之前，先在有标签数据上校准。
:::

::: quiz
用 CLIP 模型配合模板 "a photo of a {}." 在 $10$ 个类别上分类图像。哪种改动只改变分类器的权重，不改变图像嵌入？
- [x] 对遥感数据集改用 "a satellite photo of a {}." 模板
- [ ] 在带标签样例上微调图像编码器
- [ ] 把输入分辨率从 $224$ 提高到 $336$ 像素
- [ ] 把图像按中心裁剪
::: solution
零样本分类中，类嵌入 $\mathbf{w}_k$ 构成分类器，只依赖文本一侧，所以改提示词改变的是分类器，图像嵌入纹丝不动。其余选项都会改变图像嵌入。选择提示词是把零样本分类器适配到某个领域的廉价办法。
:::
:::

## 规模与数据 {#sec-data}

CLIP 的 $4$ 亿对（私有的 WIT 数据集）这样收集：以 $500{,}000$ 个查询搜索图像，查询由维基百科条目标题和常见词组合构成，每个查询至多取 $20{,}000$ 对以平衡分布。训练最大的 ViT 用了 $256$ 块 V100 GPU、$32$ 个轮次、$12$ 天。后来的若干项目把这一配方做了扩大或开放：

- **ALIGN**（Jia 等人，2021）用了 $18$ 亿图像-alt文本对，只做基于词频的简单过滤，图像编码器用 EfficientNet、文本编码器用 BERT，结果追平或超过 CLIP：规模弥补了噪声。
- **LAION-400M** 与 **LAION-5B**（Schuhmann 等人，2021、2022）是用现成 CLIP 模型的余弦过滤网络图文对得到的开放数据集，被用来训练开放的 **OpenCLIP** 模型；Cherti 等人 (2023) 用它们为对比训练拟合缩放定律，发现零样本准确率与检索性能随模型规模、数据量与算力呈幂律提升（一种经验规律，与 [[scaling/scaling-laws]] 类似）。2023 年 12 月的一次审计发现 LAION-5B 含有指向儿童性侵内容的链接；数据集被撤回，并在删除违规链接后以 Re-LAION-5B 之名于 2024 年重新发布——这是 [[llm-society/copyright-provenance]] 讨论的出处与同意问题的一个实例。
- **LiT**（Zhai 等人，2022）冻结一个预训练的图像编码器，只对比训练文本编码器（“锁图像微调”），在图像编码器已经很强时既便宜又有效。
- 数据整备本身成了研究课题：DataComp（Gadre 等人，2023）固定模型与算力、比较各种过滤策略；MetaCLIP（Xu 等人，2024）在公开数据上复现了 CLIP 的查询平衡。过滤得更好的数据，用更少的对子就能训练出更好的模型。

## Sigmoid 损失 {#sec-siglip}

[[#eq-clip]] 中的 softmax 要在整个批量上归一化：每一行都需要每一列。当 $32{,}768$ 对的批量拆分到许多加速器上时，每台设备都需要整批的文本嵌入来算自己那些行的归一化因子，而 $B\times B$ 矩阵本身就有 $10^9$ 个元素。Zhai 等人 (2023) 把 softmax 换成对每一对的独立二分类。

::: definition Sigmoid 对比损失（SigLIP） {#def-siglip}
给定余弦 $S_{ij}$、可学习的尺度 $t > 0$ 与可学习的偏置 $b$，令 $i = j$（配对成功）时 $z_{ij} = +1$，否则 $z_{ij} = -1$。**SigLIP 损失**为

$$
\mathcal{L} = -\frac{1}{B}\sum_{i=1}^{B}\sum_{j=1}^{B}\log\sigma\big(z_{ij}(tS_{ij} + b)\big) = \frac1B\sum_{i,j}\log\big(1 + e^{-z_{ij}(tS_{ij} + b)}\big),
$$ {#eq-siglip}

其中 $\sigma(a) = 1/(1 + e^{-a})$。Zhai 等人取初始值 $t = 10$、$b = -10$。
:::

每一对贡献一个不依赖其他任何一对的逻辑回归项（[[ml-fundamentals/logistic-regression]]），于是损失可以分块计算：设备之间沿环形交换文本嵌入，每台设备一次只计算自己的图像与一块文本之间的损失，从不需要持有完整矩阵或全局归一化因子。偏置之所以要紧，是因为类别极端不平衡：每一行里只有一个正例和 $B - 1$ 个负例。

::: proposition 最优初始偏置 {#prop-siglip-bias}
设初始化时所有 logit $tS_{ij}$ 都是零。则使 [[#eq-siglip]] 最小的偏置为 $b^\star = -\log(B - 1)$，此时模型对每一对预测的正是基率 $\sigma(b^\star) = 1/B$。
:::

::: proof
logit 为零时，每行贡献 $\ell(b) = \log(1 + e^{-b}) + (B - 1)\log(1 + e^{b})$。于是 $\ell'(b) = -\sigma(-b) + (B - 1)\sigma(b) = -\frac{1}{1 + e^{b}} + (B - 1)\frac{e^{b}}{1 + e^{b}}$，当 $(B - 1)e^{b} = 1$ 即 $b = -\log(B - 1)$ 时为零；又 $\ell''(b) = B\,\sigma(b)\sigma(-b) > 0$，故这是极小值。此时 $\sigma(b^\star) = \frac{1/(B-1)}{1 + 1/(B-1)} = \frac1B$，正是正例对所占的比例。
:::

对 $B = 32{,}768$，$b^\star = -10.40$，与论文里的 $-10$ 十分接近。若从 $b = 0$ 出发，第一步每行就要多付约 $(B - 1)\log 2$ 的损失——模型一开始要把它的梯度花在“大多数对子是负例”这件事上。

::: example 偏置的作用 {#ex-siglip-bias}
设 $B = 32{,}768$ 且初始 logit 为零，计算 $b = 0$、$b = -10$ 与 $b^\star$ 处的每行损失 $\ell(b)$。
::: solution
$\ell(0) = 32{,}768\log2 = 22{,}713$。$\ell(-10) = \log(1 + e^{10}) + 32{,}767\log(1 + e^{-10}) = 10.0000 + 32{,}767\cdot4.54\times10^{-5} = 11.488$。$\ell(b^\star) = 11.397$。论文的初始化与最优常数预测器相差不到 $1\%$；零偏置则差了三个数量级。
:::
:::

::: widget plot
f: log(1 + exp(-x)) + (n-1)*log(1 + exp(x))
x: -15, 5
y: 0, 40
sliders: n=1024:2:32768:1
vlines: -10
labels: per-row SigLIP loss at zero logits
caption: 批量为 $n$ 时，初始化（所有 logit 为零）的一行 SigLIP 损失随偏置 $b$ 的变化。极小在 $b = -\log(n - 1)$（[[#prop-siglip-bias]]）；竖线标出论文的 $b = -10$。零的右侧，损失按 $(n - 1)\,b$ 增长。
:::

Zhai 等人发现 sigmoid 损失追平或胜过 softmax 损失，优势在批量小于约 $16{,}000$ 时最明显；两种损失的收益都在批量约 $32{,}000$ 处趋于饱和。冻结图像编码器（SigLiT）时，他们用了 $4$ 块 TPU-v4 芯片、两天时间达到 $84.5\%$ 的 ImageNet 零样本准确率。SigLIP 的图像编码器成了开放视觉-语言模型常见的视觉塔。SigLIP 2（Tschannen 等人，2025）在 sigmoid 损失之上加入描述生成解码器、自蒸馏与掩码预测，用多语言数据训练，并提供接受原始宽高比的变体。

## 共享空间的几何 {#sec-geometry}

共享一个空间，并不意味着图像与说明文字在其中混在一起。Liang 等人 (2022) 观察到**模态差距**：在 CLIP 和其他对比模型中，图像嵌入与文本嵌入各占据球面上两个分开的区域（两个窄锥），图像质心与文本质心之间的距离，与每个模态内部的散布相比很大。差距在初始化时就已存在——随机的深度网络本来就把所有输入映进一个窄锥，每个编码器的锥各不相同——低温的对比训练并不能消除它，因为损失只依赖一行或一列之内的*相对*相似度。

::: proposition 损失看不到的东西 {#prop-gap}
考虑 logit 为 $s\,\mathbf{u}_i^\top\mathbf{v}_j$ 的未归一化嵌入。给每个图像嵌入都加上同一个常向量 $\mathbf{g}$，[[#eq-clip]] 的文本到图像（列）项不变；给每个文本嵌入都加上 $\mathbf{g}$，图像到文本（行）项不变。
:::

::: proof
对第 $j$ 列，logit 为 $s(\mathbf{u}_i + \mathbf{g})^\top\mathbf{v}_j = s\mathbf{u}_i^\top\mathbf{v}_j + s\mathbf{g}^\top\mathbf{v}_j$，$i = 1, \dots, B$；多出的项不依赖 $i$，而给 softmax 的所有输入加上同一个常数不改变其输出。行的情形对称。
:::

有归一化时该结论只是近似成立，但道理相同：一个模态的整体平移几乎逃过损失的眼睛，于是没有任何力量把两团点推到一处。Liang 等人表明，平移嵌入以缩小这个差距，会按任务不同使零样本准确率和公平性指标向任一个方向变化。当两种模态的嵌入需要混合使用时，这个差距在实践上就有影响——例如用文本嵌入代替图像嵌入去条件一个生成器；DALL·E 2 处理这种替代的办法，是学一个把文本嵌入映到图像嵌入的“先验”（Ramesh 等人，2022）。

### 对比模型捕捉不到的东西 {#sec-limits}

独立算出的两个向量之间只有一次点积，这限制了模型能表达的东西。为探测组合性而设计的基准暴露了后果：

- **词序与关系。** Winoground（Thrush 等人，2022）把两张图像与两条用相同词、不同顺序写成的说明文字配成对（"some plants surrounding a lightbulb" 对 "a lightbulb surrounding some plants"）；CLIP 式模型的成绩在随机水平附近甚至更低。Yuksekgonul 等人 (2023) 表明对比模型常常表现得像**词袋**，并论证学习目标本身很少要求更多：在随机批里，通常只凭名词就能找到正确的说明文字。
- **计数、否定与空间关系**因同样的原因而薄弱。
- **排版攻击。** Goh 等人 (2021) 发现 CLIP 过分阅读图像中的文字：一个贴着“iPod”手写标签的苹果被分类成了 iPod。模型是从书写文字与被摄物体共现的网络数据里学来的。
- **社会偏见。** Radford 等人报告，当标签集合包含与犯罪及非人类相关的类别时，人物图像被误分到这些类别的比率随种族与年龄而异，而且标签集的选择会强烈改变这些比率。零样本分类器继承了网络文本中的联想（[[llm-society/bias-fairness]]）。

补救办法包括：训练中使用交换词语的困难负例、在对比目标之外加入描述生成目标，以及——最重要的——下一章的视觉-语言模型，其中语言模型对每个图块嵌入做注意力，而不是只比较一个池化向量。

::: example 手算提示集成 {#ex-ensemble}
类别“狗”的两个模板给出嵌入 $(0.6, 0.8, 0)$ 与 $(0.8, 0.6, 0)$。计算集成后的类嵌入，以及图像 $\mathbf{u} = (0, 1, 0)$ 与每个模板、与集成结果的余弦。
::: solution
平均是 $(0.7, 0.7, 0)$，范数 $0.990$；归一化得 $(0.707, 0.707, 0)$。图像与两个模板的余弦是 $0.8$ 和 $0.6$，与集成结果是 $0.707$。平均会抹平单个说法的怪癖：集成的余弦落在两个模板的余弦之间；对模板很多的类别，它近似于类名在各种说法之间共享的方向。
:::
:::

::: history
从伴随文本学习视觉表示，至少可追溯到 Mori 等人 (1999)——他们从图像区域预测说明文字的用词——以及 DeViSE（Frome 等人，2013）——把图像映进预训练的词嵌入空间做零样本识别。对比损失来自度量学习与自监督视觉（Oord 等人，2018，命名为 InfoNCE；SimCLR，Chen 等人，2020）；ConVIRT（Zhang 等人，2020）把对称的图文对比损失用到胸部 X 光片与其报告上。CLIP（Radford 等人，2021）把这一想法扩展到 $4$ 亿个网络图文对，并使零样本分类风行开来；ALIGN（Jia 等人，2021）把它扩展到 $18$ 亿个含噪对。LAION 与 OpenCLIP（2021–2023）使这一配方可复现，LiT (2022) 展示了锁定图像编码器的价值，SigLIP（Zhai 等人，2023）用 sigmoid 替换 softmax，SigLIP 2 (2025) 融合了多个目标。截至 2026 年，CLIP 式与 SigLIP 式编码器仍是开放视觉-语言模型最常用的视觉塔。
:::

::: summary
- 双编码器把图像与文本各自独立地映成同一空间中的单位向量；相似度就是余弦。
- CLIP 损失是 $B\times B$ 余弦矩阵上的对称 InfoNCE：行为图像到文本、列为文本到图像，带可学习的 logit 尺度 $s = 1/\tau$（初始 $1/0.07$，截断在 $100$）。
- 关于 $s$ 的梯度把模型 softmax 下的期望相似度与正确对的相似度相比较；在可分的批上它会无界地增大 $s$。
- 零样本分类为每个类别嵌入一条提示词并取最近的；提示词与集成很重要。CLIP ViT-L/14@336 在 ImageNet 上零样本达到 $76.2\%$。
- SigLIP 把批量 softmax 换成每一对独立的 sigmoid 项；偏置应始自约 $-\log(B - 1)$，即基率的对数几率。
- 图像与文本嵌入分居两个锥（模态差距），损失几乎看不到它；池化点积应付不了词序、计数与关系，而且模型会读图像里的文字。
:::

## 习题

::: exercise 初始 logit 尺度 {level=1 check="14.29"}
CLIP 把温度初始化为 $\tau = 0.07$。初始 logit 尺度 $s$ 是多少？保留两位小数。
::: solution
$s = 1/0.07 = 14.29$。
:::
:::

::: exercise 随机水平的损失 {level=1 check="10.397"}
初始化时所有余弦相等，批量为 $32{,}768$ 对时的 CLIP 损失是多少？保留三位小数。
::: solution
每个行、列 softmax 都是均匀分布，所以每一项都是 $\log B = \ln32{,}768 = 15\ln2 = 10.397$，它们的平均也是。
:::
:::

::: exercise 相似度矩阵的大小 {level=1 check="4.295"}
完整的 $32{,}768\times32{,}768$ 相似度矩阵用 32 位浮点数存放，占多少吉字节（$10^9$ 字节）？保留三位小数。
::: solution
$32{,}768^2 = 1{,}073{,}741{,}824$ 个元素，乘以 $4$ 字节，得 $4.295\times10^9$ 字节，即 $4.295$ GB——这还只是一份拷贝，不含 softmax 及其梯度。实践中每台设备只计算自己那块行，但 softmax 损失仍要求每台设备都有每一列的嵌入。
:::
:::

::: exercise 最优初始偏置 {level=1 check="-6.930"}
初始化时，批量为 $1024$ 对的最小化 SigLIP 损失的偏置是多少？保留三位小数。
::: solution
由 [[#prop-siglip-bias]]，$b^\star = -\ln1023 = -6.930$。
:::
:::

::: exercise 召回率@1 {level=2 check="2/3"}
三张图像与它们的三条说明文字的余弦矩阵为（行为图像，列为说明文字）
$$
S = \begin{pmatrix}0.30 & 0.10 & 0.20\\ 0.25 & 0.20 & 0.10\\ 0.00 & 0.10 & 0.35\end{pmatrix}.
$$
计算图像到文本的 recall@1（要填入的答案）与文本到图像的 recall@1。
::: solution
图像到文本：第 $1$ 行的最大值在第 $1$ 列（正确）；第 $2$ 行的最大值 $0.25$ 在第 $1$ 列（错误，正确的说明文字得 $0.20$）；第 $3$ 行的最大值在第 $3$ 列（正确）。Recall@1 为 $2/3$。文本到图像：第 $1$ 列的最大值 $0.30$ 在第 $1$ 行，第 $2$ 列的最大值 $0.20$ 在第 $2$ 行，第 $3$ 列的最大值 $0.35$ 在第 $3$ 行——全部正确，recall@1 $= 1$。两个方向的结果可以不同，因为行最大值与列最大值涉及的是不同的元素。
:::
:::

::: exercise 手算一次 SigLIP 损失 {level=2 check="1.037"}
设 $B = 2$，余弦 $S = \begin{pmatrix}0.5 & 0.1\\0.2 & 0.4\end{pmatrix}$，$t = 10$、$b = -5$，计算 SigLIP 损失 [[#eq-siglip]]，保留三位小数。
::: solution
logit $tS_{ij} + b$ 依次为 $0$、$-4$、$-3$、$-1$。正例（对角线，$z = 1$）贡献 $\log(1 + e^{0}) = 0.6931$ 与 $\log(1 + e^{1}) = 1.3133$；负例（$z = -1$）贡献 $\log(1 + e^{-4}) = 0.0181$ 与 $\log(1 + e^{-3}) = 0.0486$。总和为 $2.0731$，除以 $B = 2$ 得 $1.037$。代价最高的是余弦为 $0.4$ 的正例对：在这个偏置下，余弦要 $0.5$ 才够得上概率 $\tfrac12$。
:::
:::

::: exercise 经过 log 尺度的梯度 {level=2}
CLIP 学习的是 $\vartheta = \log s$ 而不是 $s$。(a) 用 [[#eq-scale-grad]] 表示 $\partial\mathcal{L}/\partial\vartheta$。(b) 给出这种参数化的两条理由。(c) 代码中 $s = 14.29$ 处的数值 $\partial\mathcal{L}/\partial s$ 为 $-0.00404$；此处 $\partial\mathcal{L}/\partial\vartheta$ 是多少？梯度下降会把温度往哪个方向推？
::: solution
(a) $\partial\mathcal{L}/\partial\vartheta = s\,\partial\mathcal{L}/\partial s$。(b) 这种参数化无需额外约束就保证 $s$ 为正，并让步长变成乘法的：$\vartheta$ 走一步，$s$ 就乘上一个固定的比例，这适合合理取值横跨多个数量级（约 $1$ 到 $100$）的量。(c) $14.29\cdot(-0.00404) = -0.0577$。导数为负，梯度下降增大 $\vartheta$，因而也增大 $s$：温度略微下降。幅度很小，与 [[#ex-clip-temp]] 中极小值点附近应有的情形一致。
:::
:::

::: exercise 还原出线性分类器 {level=2}
证明零样本分类 [[#eq-zero-shot]] 是图像嵌入上的一个线性分类器，并说明：若每个类别有少量带标签样例，如何在不训练编码器的情况下改进它。每个类别只有一两个样例时，这种“线性探针”有什么风险？
::: solution
分数 $s\,\mathbf{u}^\top\mathbf{w}_k$ 恰是以各类嵌入为行的 $K\times d$ 矩阵 $W$ 之 $s\,W\mathbf{u}$ 的分量，所以分类器关于 $\mathbf{u}$ 线性且没有偏置。有了带标签的图像，可以在冻结的图像嵌入上训练逻辑回归分类器 $W'\mathbf{u} + \mathbf{c}$，可把初始值取为 $W' = sW$ 并加正则项把它拉向 $sW$。样例极少时，从头训练的探针会过拟合，可能还不如零样本——Radford 等人发现，零样本 CLIP 平均与每类约四个样例训练出的线性探针相当——所以从文本生成的权重出发初始化、或惩罚与它的距离，是更稳妥的选择。
:::
:::

::: exercise 模态差距不妨碍单一方向内的检索 {level=3}
(a) 用 [[#prop-gap]] 证明：对未归一化的嵌入，把所有图像嵌入都平移 $\mathbf{g}$，固定文本查询下图像的排序不变。(b) 证明：固定图像下说明文字的排序在图像嵌入平移时*可能*改变，并给出一个二维例子。(c) 这对跨查询比较分数说明了什么？
::: solution
(a) 对查询 $j$，分数变为 $\mathbf{u}_i^\top\mathbf{v}_j + \mathbf{g}^\top\mathbf{v}_j$；多出的一项对所有 $i$ 相同，所以图像的次序不变。

(b) 对图像 $i$，说明文字 $j$ 得 $\mathbf{u}_i^\top\mathbf{v}_j + \mathbf{g}^\top\mathbf{v}_j$ 分，平移量 $\mathbf{g}^\top\mathbf{v}_j$ 依赖 $j$。例子：$\mathbf{u} = (1, 0)$，说明文字 $\mathbf{v}_1 = (1, 0)$、$\mathbf{v}_2 = (0, 2)$：分数为 $1$ 和 $0$。取 $\mathbf{g} = (0, 1)$，平移后的图像 $(1, 1)$ 得 $1$ 和 $2$ 分，次序翻转。

(c) 一个模态的平移，在单个文本查询内部加的是一个与查询无关的常数，在不同说明文字之间加的是随说明文字而变的偏移；因此分数只在同一查询、同一方向内可比——这正是 [[#sec-zero-shot]] 那条警告从几何角度的翻版。
:::
:::

::: exercise SigLIP 的梯度 {level=3}
对 [[#eq-siglip]] 求 $\partial\mathcal{L}/\partial S_{ij}$，并与 [[prompting-rag/text-embeddings#prop-infonce-grad]] 的 InfoNCE 梯度比较。在两种损失下，哪些负例拿到的梯度最多？sigmoid 作用在一个负例上的梯度如何依赖于同一行中其余的负例？
::: solution
令 $a_{ij} = tS_{ij} + b$，该项为 $\log(1 + e^{-z_{ij}a_{ij}})$，它对 $a_{ij}$ 的导数是 $-z_{ij}\sigma(-z_{ij}a_{ij})$。于是 $\partial\mathcal{L}/\partial S_{ij} = -\frac{t}{B}z_{ij}\,\sigma(-z_{ij}a_{ij})$：正例处为 $-\frac tB\big(1 - \sigma(a_{ii})\big)$；负例处为 $+\frac tB\,\sigma(a_{ij})$，即模型当前认为该对匹配的概率。InfoNCE 中负例的梯度是 $p_j/\tau$，即它在该行 softmax 中占的份额，所以其他负例得分高时它变小——负例在争夺一份概率。sigmoid 损失中，每个负例的梯度只依赖自己的 logit，与本行其余元素无关。两种损失都把最多的梯度给高分（困难）负例；但 sigmoid 版本会对每一个模型当前“确信”的错误独立地继续施力，且一行上的总梯度不被 $1/\tau$ 封顶。
:::
:::
