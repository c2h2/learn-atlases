从零预训练一个模型要花上几个月，其算力也只有少数机构负担得起。因此多数专门化的模型并不是从零训练的：它们从一个预训练好的检查点出发，在新数据上**继续预训练**——生物医学论文、源代码、数学、原始模型很少见过的语言，或者教它使用更长上下文的长文档。继续预训练使用与原始运行相同的目标与相同的循环（[[pretraining/training-loop]]）；它之所以自成一章，是因为它必须在**不破坏已有能力**的前提下增添新东西。

本章覆盖三种最常见的适配。**领域自适应预训练**把模型朝某个领域的文本移动，它的主要风险是**灾难性遗忘**（catastrophic forgetting）——我们用二次近似来分析它，并用**重放**（replay）与学习率**重新预热**来应对。**上下文长度扩展**让一个只在几千词元上训练过的模型能处理几万甚至几十万词元；我们逐步推导位置插值、NTK 感知缩放与 YaRN 的旋转位置编码数学。**分词器扩展**为词表增添新的语言或领域。监督微调与偏好训练改变的是模型的行为而非知识，属于[[post-training]]。

## 领域自适应预训练 {#sec-dapt}

::: definition 继续预训练 {#def-continued}
**继续预训练**从一个预训练模型的参数 $\theta_0$ 出发，在新数据分布 $q$ 上最小化预训练损失（[[pretraining/pretraining-objectives#def-objective]]）——$q$ 是一个领域语料，并可能与来自原始分布 $p$ 的**重放**数据混合：

$$
\mathcal{L}_{\text{CPT}}(\theta) = (1-\rho)\,\E_{\mathbf x\sim q}\big[\mathcal L(\theta;\mathbf x)\big] + \rho\,\E_{\mathbf x\sim p}\big[\mathcal L(\theta;\mathbf x)\big],\qquad0\le\rho<1.
$$

**领域自适应预训练**（DAPT）使用来自目标领域的大规模语料库；**任务自适应预训练**（TAPT）使用某个特定任务训练集的未标注文本。
:::

Gururangan 等（2020）在四个领域——生物医学论文、计算机科学论文、新闻与产品评论——上对 RoBERTa（[[pretraining/model-families#sec-encoders]]）继续预训练，并在八个分类任务上评测。领域自适应预训练改善了每个领域内的所有任务，而在**无关**领域上预训练往往有害；使用少得多的任务文本的任务自适应预训练也有帮助，两者结合效果最好。他们的论文标题"Don't stop pretraining"（不要停止预训练）成了这一实践的概括。

许多专门化的语言模型都是这样造出来的。Minerva（Lewkowycz 等，2022）在 $38.5$ 亿词元的数学网页与 arXiv 论文上对 PaLM 继续预训练；Code Llama（Rozière 等，2023）在 $5000$ 亿词元以代码为主的数据上对 Llama 2 继续预训练；Llemma（Azerbayev 等，2023）在数学语料库 Proof-Pile-2 上对 Code Llama 继续预训练。与从零训练相比，继续预训练复用了基础模型的通用知识与语言能力，只需要一小部分算力；代价是结果继承了基础模型的分词器、架构以及它的一切弱点。

::: example 继续预训练划算吗？ {#ex-cpt-cost}
一个团队有一个在 $2$ 万亿词元上训练的 $70$ 亿参数基础模型，以及 $500$ 亿词元的法律文本。比较以下两者的算力：(a) 在法律文本上继续预训练两个轮次，并按 $25\%$ 的比例混合重放数据；(b) 在包含这些法律文本的 $2$ 万亿词元上从零训练一个新模型。
::: solution
(a) $500$ 亿法律词元的两个轮次是 $1000$ 亿词元；若重放占 $25\%$，它占整个继续运行的 $75\%$，因此该运行共有 $1330$ 亿词元：$6\cdot7\times10^9\cdot1.33\times10^{11} = 5.6\times10^{21}$ FLOPs（[[pretraining/training-loop#prop-6nd]]）。(b) $6\cdot7\times10^9\cdot2\times10^{12} = 8.4\times10^{22}$ FLOPs，多 $15$ 倍。继续预训练的成本约为一次新运行的 $7\%$——这就是为什么它是默认选择，除非基础模型的分词器或架构不合适。
:::
:::

## 灾难性遗忘 {#sec-forgetting}

在新分布上训练会把参数移动到新的低损失处，而新损失不会把参数留在旧损失的低损失处。这时神经网络可能很快就丢掉旧的能力——**灾难性遗忘**（McCloskey 与 Cohen，1989）。对语言模型而言，在代码上继续预训练会损害它的散文写作，在一门新语言上预训练会损害它的英语。

::: proposition 二阶意义下的遗忘 {#prop-forgetting}
设 $\theta_0$ 是旧损失 $\mathcal L_p$ 的极小点，其黑塞矩阵为 $H_p = \nabla^2\mathcal L_p(\theta_0)$（半正定）。若继续预训练把参数移到 $\theta_0 + \Delta$，则

$$
\mathcal L_p(\theta_0 + \Delta) - \mathcal L_p(\theta_0) = \tfrac12\,\Delta^\top H_p\,\Delta + O(\norm{\Delta}^3).
$$ {#eq-forgetting}

因此，当更新大体落在旧损失的低曲率方向上时遗忘很小，当它沿高曲率方向移动时遗忘很大；对小更新来说，遗忘随步长二次增长。
:::

::: proof
对三次可微的损失，泰勒定理在 $\theta_0$ 处给出 $\mathcal L_p(\theta_0 + \Delta) = \mathcal L_p(\theta_0) + \nabla\mathcal L_p(\theta_0)^\top\Delta + \tfrac12\Delta^\top H_p\Delta + O(\norm\Delta^3)$。在极小点处梯度为零，只剩[[#eq-forgetting]]。把 $\Delta = \sum_k c_k\mathbf u_k$ 按 $H_p$ 的特征向量展开，特征值为 $\lambda_k\ge0$，二次项即 $\tfrac12\sum_k\lambda_kc_k^2$：沿高曲率方向的分量占主导；把 $\Delta$ 放大 $a$ 倍，该项放大 $a^2$ 倍。
:::

这个命题引出了主要的补救措施。**向 $\theta_0$ 正则化**惩罚沿对旧任务重要方向上的移动：弹性权重巩固（EWC；Kirkpatrick 等，2017）添加 $\frac\lambda2\sum_iF_i(\theta_i - \theta_{0,i})^2$，其中 $F_i$ 是曲率的对角估计（Fisher 信息），这恰好是把[[#eq-forgetting]]中的 $H_p$ 换成对角近似。**重放**把旧损失留在目标里：只要[[#def-continued]]中 $\rho > 0$，一旦更新开始抬高 $\mathcal L_p$，它的梯度就会把参数拉回来。**小步数或短步长**限制 $\norm\Delta$。对大语言模型来说，重放是最简单、使用最广的办法；EWC 式惩罚需要为数十亿参数估计曲率，在大规模下很少使用。

::: example 曲率与遗忘 {#ex-curvature}
在 $\theta_0$ 附近，一个两参数模型的旧损失有黑塞矩阵 $H_p = \operatorname{diag}(10, 0.1)$。两次继续预训练运行分别结束于 $\Delta_1 = (0.1, 0)$ 与 $\Delta_2 = (0, 1)$。由[[#eq-forgetting]]，哪一次遗忘得更多？
::: solution
$\tfrac12\Delta_1^\top H_p\Delta_1 = \tfrac12\cdot10\cdot0.01 = 0.05$；$\tfrac12\Delta_2^\top H_p\Delta_2 = \tfrac12\cdot0.1\cdot1 = 0.05$。两者遗忘一样多，尽管 $\Delta_2$ 长十倍：在刚性方向上的一小步与在平坦方向上的一大步代价相同。重放或 EWC 惩罚会把更新引向平坦方向。
:::
:::

### 重放与重新预热 {#sec-replay}

继续预训练通常从一个学习率已经衰减到接近零的检查点开始。为了学习新分布，学习率必须再次升高——**重新预热**——然后再衰减——**重新衰减**。Gupta 等（2023）发现，重新预热最初会抬高原始数据上的损失（无论预热长度如何），但会改善新数据上的最终损失。Ibrahim 等（2024）表明，重新预热、重新衰减再配上对一部分原始数据的重放——新旧数据相近时取百分之几，像新语言这样的强偏移则最多到四分之一左右——结合三者只花一小部分算力，就能达到在数据并集上从头再训练的性能。若基础运行的调度没有末尾衰减段，例如预热–平稳–衰减（[[pretraining/training-loop#def-schedules]]），继续起来更方便，因为可以从学习率仍然很高的平稳阶段检查点分出支路。

下面的清单在最简单的设定中让遗忘与重放清晰可见：[[pretraining/pretraining-objectives#sec-code]]中的字符二元模型，先在狄更斯选段上"预训练"，再在麦尔维尔《白鲸》（Moby-Dick，1851，同样已进入公版）的开头继续预训练，并改变重放狄更斯的比例。

```python
import math, random

old = ("it was the best of times, it was the worst of times, it was the age of "
       "wisdom, it was the age of foolishness, it was the epoch of belief, it was "
       "the epoch of incredulity, it was the season of light, it was the season of "
       "darkness, it was the spring of hope, it was the winter of despair")   # 狄更斯，1859
new = ("call me ishmael. some years ago, never mind how long precisely, having little "
       "or no money in my purse, and nothing particular to interest me on shore, i "
       "thought i would sail about a little and see the watery part of the world")  # 麦尔维尔，1851
chars = sorted(set(old + new)); V = len(chars)
enc = lambda s: [chars.index(c) for c in s]
old_ids, new_ids = enc(old), enc(new)

def pairs(ids): return list(zip(ids[:-1], ids[1:]))
def loss(W, P):
    t = 0.0
    for a, b in P:
        m = max(W[a]); t -= W[a][b] - m - math.log(sum(math.exp(z - m) for z in W[a]))
    return t / len(P)
def sgd(W, P, steps, lr, rng, batch=64):
    for _ in range(steps):
        B = [rng.choice(P) for _ in range(batch)]
        for a, b in B:
            m = max(W[a]); e = [math.exp(z - m) for z in W[a]]; s = sum(e)
            for j in range(V): W[a][j] -= lr * (e[j] / s - (j == b)) / batch
    return W

rng = random.Random(0)
W0 = sgd([[0.0] * V for _ in range(V)], pairs(old_ids), 3000, 5.0, rng)    # 在狄更斯选段上"预训练"
print(f"V = {V}; after pretraining:   old {loss(W0, pairs(old_ids)):.3f}   new {loss(W0, pairs(new_ids)):.3f}")
for replay in [0.0, 0.1, 0.25, 0.5]:
    W = [row[:] for row in W0]
    r = random.Random(1)
    n_old = int(round(replay * 1000))
    mix = [r.choice(pairs(old_ids)) for _ in range(n_old)] + [r.choice(pairs(new_ids)) for _ in range(1000 - n_old)]
    W = sgd(W, mix, 3000, 5.0, r)                                             # 继续预训练
    print(f"replay {replay:4.0%}:  old {loss(W, pairs(old_ids)):.3f}   new {loss(W, pairs(new_ids)):.3f}")
```

```text
V = 25; after pretraining:   old 1.420   new 4.329
replay   0%:  old 3.075   new 1.844
replay  10%:  old 2.550   new 1.880
replay  25%:  old 2.114   new 1.968
replay  50%:  old 1.761   new 2.248
```

"预训练"之后模型拟合了狄更斯的文本（每字符损失 $1.42$ nats），对麦尔维尔则很差（$4.33$，比均匀分布的 $\ln25 = 3.22$ 还差，因为它在自信地预测狄更斯的字符对）。只在麦尔维尔上继续训练把麦尔维尔的损失减半到 $1.84$，却把狄更斯的损失不止翻倍地抬到 $3.08$：灾难性遗忘。重放 $10\%$ 的狄更斯，在旧文本上找回了失去部分的三分之一，而在新文本上只付出 $0.04$ nats；$25\%$ 的重放把旧损失保持在 $2.11$，在新文本上付出 $0.12$ nats。这一权衡是连续的，合适的比例取决于两个分布各有多重要。二元模型的参数太少，两个文本直接争夺同一张表的条目；大模型多得多的备用容量使它们每个新词元遗忘得更少——但它们确实会遗忘，同样的权衡也出现在 Ibrahim 等的结果中。

::: warning 新领域上损失低本身并不是目标
一次继续预训练运行很容易用新领域上的损失来判断，因为它下降得很快。但那个数字说明不了丢掉了什么。在适配前后，要在领域指标之外评测基础模型的通用能力——留出的网页文本、代码、推理与知识基准、它原来服务的语言（[[pretraining/in-training-evaluation]]）。一个在领域题上进步 $2$ 分、在其他一切上退步 $10$ 分的领域模型，很少是人们真正想要的，而且这种回退在领域损失上可能根本看不见。
:::

## 扩展上下文长度 {#sec-context}

模型预训练主要使用几千词元的序列，因为注意力的代价随长度增长（[[pretraining/training-loop#sec-flops]]），而长文档稀缺。更长的上下文放在最后，用长文档做一次继续预训练来加入。障碍在于位置编码：使用旋转位置编码（RoPE，[[transformers/positional-encoding#def-rope]]）的模型只见过直到训练长度 $L$ 的相对旋转，超出之后注意力行为不可预测——直接把更长的输入喂进去（"外推"）通常会让损失爆炸。

回顾 RoPE 在位置 $m$ 处把查询与键坐标的每一对 $i = 0, \dots, d/2-1$ 按角度 $m\theta_i$ 旋转，其中频率为

$$
\theta_i = b^{-2i/d},\qquad\lambda_i = \frac{2\pi}{\theta_i} = 2\pi\,b^{2i/d},
$$ {#eq-rope-freq}

这里 $b$ 是**底数**（常取 $10{,}000$），$\lambda_i$ 是以词元计的**波长**。位置 $m$ 与 $n$ 之间的打分取决于角度 $(m - n)\theta_i$（[[transformers/positional-encoding#prop-rope]]）。

::: example 哪些频率见过一整圈？ {#ex-wavelengths}
头维度 $d = 128$、底数 $b = 10{,}000$、训练长度 $L = 4096$，计算最短、中间与最长的波长，并数一数波长超过 $L$ 的词元对有多少个。
::: solution
$\lambda_0 = 2\pi = 6.28$ 词元；$\lambda_{32} = 2\pi\cdot10{,}000^{1/2} = 628$；$\lambda_{63} = 2\pi\cdot10{,}000^{126/128} = 54{,}410$ 词元。当 $10{,}000^{2i/128} > 4096/2\pi = 651.9$ 时波长超过 $4096$，即 $2i/128 > \log_{10}651.9/4 = 0.7036$，$i > 45.03$：第 $46$ 到 $63$ 对，$64$ 对中有 $18$ 对。对这些低频词元对来说，训练中从未出现一整圈旋转；在超过 $L$ 的位置上它们产生模型从未见过的角度，外推正是在这里失效。
:::
:::

::: widget plot
f: log10(2*pi*b^(2*x/128)); log10(4096) + 0*x
x: 0, 63
y: 0, 7
sliders: b=10000:10000:1000000:10000
labels: $\log_{10}\lambda_i$, wavelength of pair $i$; training length $4096$
caption: $d = 128$ 时 $64$ 对 RoPE 频率的波长，画在对数尺度上，并与训练长度 $L = 4096$（水平线）对照。位于线上方的词元对在训练中永远转不完一圈。提高底数 $b$——Code Llama 用了 $10^6$——会把所有波长拉长，使更多的对变化得慢一些；这是让模型为更长上下文做准备的最简单办法之一。
:::

::: definition 位置插值（Chen 等，2023） {#def-pi}
要把在长度 $L$ 上训练的 RoPE 模型扩展到 $L' = sL$（$s > 1$），**位置插值**在计算旋转之前把每个位置 $m$ 换成 $m/s$——等价地把每个频率都除以 $s$：$\theta_i' = \theta_i/s$。随后在长序列上对模型做简短的训练。
:::

::: proposition 插值把角度保持在范围内 {#prop-pi}
在因子为 $s = L'/L$ 的位置插值下，每一对频率在每个相对距离 $\lvert m - n\rvert < L'$ 处的角度都满足 $\lvert m - n\rvert\,\theta_i' < L\theta_i$：所有相对旋转都落在训练时见过的范围内。若不做插值，直到 $L'$ 的距离会产生大至 $s$ 倍的角度。
:::

::: proof
$\lvert m - n\rvert\theta_i' = \lvert m - n\rvert\theta_i/s < L'\theta_i/s = L\theta_i$；而训练期间相对距离取遍 $0, \dots, L - 1$，角度取遍 $[0, (L-1)\theta_i]$；插值后的角度落在 $[0, L\theta_i)$ 内，与训练过的范围至多相差 $\theta_i$ 的一步。不做插值时最大角度为 $(L'-1)\theta_i\approx sL\theta_i$。
:::

Chen 等用插值加约 $1000$ 步微调把 LLaMA 模型从 $2048$ 扩展到最高 $32{,}768$ 词元，并表明插值后的注意力打分比外推时的上界紧得多。插值有代价：它把**高**频也压缩了，原本由最短波长区分的相邻词元变得 $s$ 倍难以分辨。两项改进针对这一点。

::: definition NTK 感知缩放与 YaRN {#def-yarn}
**NTK 感知缩放**（2023 年在开源讨论中提出，Peng 等作了分析）改底数而不改位置：$b' = b\,s^{d/(d-2)}$。**YaRN**（Peng 等，2024）按波长逐对决定插值：令 $r_i = L/\lambda_i$（训练上下文中转过的整圈数），斜坡函数 $\gamma(r)$ 在 $r < \alpha$ 时为 $0$、$r > \beta$ 时为 $1$、中间线性（对 LLaMA 系列模型取 $\alpha = 1$、$\beta = 32$），

$$
\theta_i' = \big(1 - \gamma(r_i)\big)\,\frac{\theta_i}{s} + \gamma(r_i)\,\theta_i,
$$

于是高频词元对（许多圈）保持不变，低频词元对（不足一圈）被完全插值。YaRN 还把注意力 logits 除以温度 $t$，其中 $\sqrt{1/t} = 0.1\ln s + 1$。
:::

::: proposition NTK 感知缩放只插值最低的频率 {#prop-ntk}
取 $b' = b\,s^{d/(d-2)}$，最高频率保持不变，$\theta_0' = \theta_0 = 1$；最低频率恰被除以 $s$，$\theta_{d/2-1}' = \theta_{d/2-1}/s$，与位置插值相同；中间的频率被除以 $s^{2i/(d-2)}$，在两者之间平滑过渡。
:::

::: proof
$\theta_i' = (b')^{-2i/d} = b^{-2i/d}s^{-(d/(d-2))(2i/d)} = \theta_i\,s^{-2i/(d-2)}$。$i = 0$ 时因子为 $1$；$i = d/2 - 1$ 时指数为 $-(d-2)/(d-2) = -1$，因子为 $1/s$。
:::

::: example 选择缩放方式 {#ex-scaling}
把[[#ex-wavelengths]]中的模型从 $4096$ 扩展到 $32{,}768$ 词元。给出缩放因子、位置插值与 NTK 感知缩放下第一对与最后一对的频率、新的 NTK 底数，以及 YaRN 的温度因子。
::: solution
$s = 8$。位置插值把所有频率除以 $8$：$\theta_0' = 0.125$（波长从 $6.3$ 变成 $50$ 词元），$\theta_{63}' = \theta_{63}/8$。NTK 感知：$b' = 10{,}000\cdot8^{128/126} = 82{,}685$；$\theta_0' = 1$ 不变，$\theta_{63}' = \theta_{63}/8$，与[[#prop-ntk]]一致。YaRN：$\sqrt{1/t} = 0.1\ln8 + 1 = 1.208$，于是 logits 乘以 $1/t = 1.459$——实现上把查询与键各乘 $1.208$——以锐化注意力，抵消注意更多词元带来的稀释。位置插值会模糊局部词序；NTK 感知缩放与 YaRN 保留它。
:::
:::

::: widget plot
f: 1/s + 0*x; s^(-2*x/126); (1 - min(1, max(0, (4096/(2*pi*10000^(2*x/128)) - 1)/31)))/s + min(1, max(0, (4096/(2*pi*10000^(2*x/128)) - 1)/31))
x: 0, 63
y: 0, 1.05
sliders: s=8:2:32:1
labels: position interpolation; NTK-aware; YaRN (NTK-by-parts)
caption: 把一个 $d = 128$、$b = 10{,}000$、$L = 4096$ 的模型扩展 $s$ 倍时，每个 RoPE 频率乘上的因子 $\theta_i'/\theta_i$。位置插值把每个频率缩小 $1/s$；NTK 感知缩放对最高频（$i$ 接近 $0$）几乎不动、对最低频缩小 $1/s$，中间平滑过渡；YaRN 对训练上下文中转过超过 $32$ 圈的那些对完全不碰，对不足一圈的完全插值，其余在两者之间线性过渡。
:::

实践中，若干方法通过改变底数并继续训练来实现：Code Llama 把底数从 $10{,}000$ 提到 $1{,}000{,}000$，并在 $16$K 词元的序列上训练；Xiong 等（2023）为长上下文的 Llama 2 模型使用 $500{,}000$ 的底数；Llama 3.1 分六个阶段、在约 $8000$ 亿词元上把上下文从 $8$K 扩展到 $128$K 词元。Fu 等（2024）发现，只要**在每个来源内部**对长文档**上采样**、保持领域配比不变，几十亿词元的继续预训练就够了——只把恰好长文档多的来源（比如书籍）整体上采样会改变配比，反而有害。长上下文能力必须用需要整个上下文的任务来评测：在长输入的任意位置放入一条事实再把它找出来（"大海捞针"，needle in a haystack）只是最低要求，RULER（Hsieh et al., 2024）这类评测套件还会测试多跳检索与聚合——因为长文档上的困惑度可能在改善，而模型其实忽略了大部分上下文。服务长上下文另有自己的成本（[[inference/long-context]]）。

::: quiz
一个在 $4096$ 词元上训练的 RoPE 模型用位置插值扩展到 $16{,}384$。哪些说法是正确的？（多选）
- [x] 距离小于 $16{,}384$ 处的一切相对旋转角度都落在训练见过的范围内。
- [x] 相邻词元在最高频的那些对上变得更难区分。
- [ ] 不需要进一步训练就能有好的表现。
- [ ] 每个词元的注意力代价与 $4096$ 词元时相同。
::: solution
插值把所有频率除以 $s = 4$，把角度保持在范围内（[[#prop-pi]]），但同时也压缩了编码局部次序的最高频率。Chen 等人仍然微调了约 $1000$ 步，而且随着在长数据上训练质量继续提升。对四倍多的词元做注意力，每个词元的代价约为原来的四倍。
:::
:::

## 扩展分词器 {#sec-tokeniser}

主要在英语上训练的分词器会把其他文字系统的文本切成许多短片段：一门低资源语言的一个句子，可能需要比其英译多几倍的词元（[[text-and-language/tokenisation]]）。这让这类语言处理起来更慢、更贵，缩短了它们的有效上下文，还可能损害质量。在把模型适配到新语言或新领域时，一种补救办法是**添加词元**。

::: algorithm 词表扩展 {#alg-vocab}
1. 在目标语言（或目标领域）的文本上训练一个子词分词器，选出不在原词表中的新词元，通常为几千到几万。
2. 把它们追加到词表末尾，在输入嵌入矩阵和输出层中为它们添加相应的行。
3. 初始化每一新行——常用的做法是取新词元对应的字符串在原来分词下各片段之嵌入的平均，使模型最初把新词元当作它原来的分解来对待（随机或零初始化也可以，但需要更多训练）。
4. 在目标语言数据上连同重放继续预训练；也可以先只训练嵌入，再训练全部参数。
:::

Cui 等（2023）在 LLaMA 的 $32{,}000$ 词元词表中加入了约 $20{,}000$ 个中文词元，使编码中文文本所需的词元数大约减半，并在中文语料上继续预训练。词表扩展有代价：新嵌入一开始没有经过训练，输出 softmax 变大了，而且模型在新语言上原本靠旧分解学到的能力必须转移到新词元上。究竟是扩展词表，还是保留原分词器直接继续预训练，是一个经验性的选择，取决于原分词器把那门语言切得有多碎。

::: example 新词元的代价与收益 {#ex-vocab}
一个 $d = 4096$、输入输出嵌入不共享的模型增加了 $20{,}000$ 个词元。新增了多少参数？若目标语言文本的每字符词元数从 $2.0$ 降到 $1.1$，每字符的训练与推理成本降为原来的几分之几，$4096$ 词元的上下文又能多容纳几分之几的文本？
::: solution
参数：$2\cdot20{,}000\cdot4096 = 163{,}840{,}000$——约是一个 $70$ 亿参数模型的 $2.4\%$。每字符的计算量随每字符词元数变化（对固定模型，[[pretraining/training-loop#prop-6nd]]），因此降为 $2.0/1.1 = 1.82$ 分之一。$4096$ 词元的上下文原来容纳 $2048$ 个字符，现在容纳 $3724$ 个，多 $1.82$ 倍。每字符的注意力代价降得更多，因为注意力随序列长度的平方增长。
:::
:::

::: history
灾难性遗忘由 McCloskey 与 Cohen（1989）以及 Ratcliff（1990）描述，French（1999）作了综述；Kirkpatrick 等（2017）提出弹性权重巩固，重放（排练）可追溯到 Robins（1995）。对预训练语言模型，领域特定的继续预训练产生了 BioBERT（Lee 等，2019）与 SciBERT（Beltagy 等，2019），Gururangan 等（2020）把领域自适应与任务自适应预训练系统化。大规模的例子包括 Minerva（2022）、Code Llama（2023）与 Llemma（2023）。Gupta 等（2023）与 Ibrahim 等（2024）研究了大模型继续预训练中的重新预热与重放。关于上下文扩展，Chen 等（2023）提出位置插值；NTK 感知缩放来自 2023 年的开源实验；Peng 等（2023，2024 年发表）提出 YaRN；Xiong 等（2023）与 Fu 等（2024）研究了长上下文继续预训练的底数与数据。Cui 等（2023）为中文扩展了 LLaMA 的词表。
:::

::: summary
- **继续预训练**复用基础模型，用预训练损失在新数据上训练它，成本只有新运行的一次运行的几个百分点；**领域自适应**与**任务自适应**预训练能提升领域内表现（Gururangan 等，2020）。
- **灾难性遗忘**在二阶意义下是 $\frac12\Delta^\top H_p\Delta$：沿旧损失高曲率方向移动代价最大。对原始数据的**重放**、学习率的**重新预热与重新衰减**以及 EWC 式惩罚都能加以限制；在大规模下重放是标准做法。
- RoPE 模型的**上下文扩展**必须把旋转角度保持在训练过的范围内：**位置插值**把所有频率除以 $s$；**NTK 感知缩放**（$b' = bs^{d/(d-2)}$）只插值低频；**YaRN** 按波长插值并重新缩放注意力；常用的做法是提高底数并在长文档上训练（长文档在每个来源内部上采样）。
- 评测长上下文要用需要整个上下文的任务，不能只看困惑度。
- **分词器扩展**为新语言或新领域添加词元，用其旧分解初始化，以新增的未训练嵌入为代价降低每字符词元数。
- 永远要测量这种适配在基础模型的通用能力上**损失**了什么，而不是只看它在目标上得到了什么。
:::

## 习题

::: exercise 重放比例 {level=1 check="40"}
一次继续预训练运行共有 $2000$ 亿词元，其中 $20\%$ 是重放。重放了多少亿词元的原始数据？
::: solution
$0.2\cdot200 = 40$ 亿词元。
:::
:::

::: exercise 插值因子 {level=1 check="16"}
一个在 $8192$ 词元上训练的 RoPE 模型用位置插值扩展到 $131{,}072$ 词元。频率被除以的因子 $s$ 是多少？
::: solution
$s = 131{,}072/8192 = 16$。
:::
:::

::: exercise 遗忘估计 {level=1 check="0.065"}
旧损失在 $\theta_0$ 处的黑塞矩阵为 $H_p = \operatorname{diag}(4, 1)$，继续预训练把参数移动了 $\Delta = (0.1, 0.3)$。用[[#eq-forgetting]]估计旧损失的增长。
::: solution
$\tfrac12\Delta^\top H_p\Delta = \tfrac12(4\cdot0.1^2 + 1\cdot0.3^2) = \tfrac12(0.04 + 0.09) = 0.065$。沿平坦方向的较大移动比沿刚性方向的较小移动贡献多出一倍还多。
:::
:::

::: exercise NTK 底数 {level=2 check="1.75e5"}
头维度 $d = 64$、底数 $b = 10{,}000$、扩展因子 $s = 16$，计算 NTK 感知底数 $b' = bs^{d/(d-2)}$，保留三位有效数字。
::: solution
$d/(d-2) = 64/62 = 1.0323$；$16^{1.0323} = e^{1.0323\cdot2.7726} = e^{2.8620} = 17.50$；$b' = 10{,}000\cdot17.50 = 175{,}000$（更精确地为 $174{,}970$）。指数略大于 $1$，正使最低频率恰好下降 $16$ 倍。
:::
:::

::: exercise 超出上下文的波长 {level=2 check="45"}
在[[#ex-wavelengths]]中，波长大于 $L = 4096$ 的是 $i > 45.03$ 的那些对。波长不超过 $4096$ 的最大下标 $i$ 是多少？
::: solution
$i = 45$：$\lambda_{45} = 2\pi\cdot10{,}000^{90/128} = 2\pi\cdot649.4 = 4080$ 词元，略小于 $4096$；$\lambda_{46} = 2\pi\cdot10{,}000^{92/128} = 2\pi\cdot749.9 = 4712$。
:::
:::

::: exercise YaRN 的斜坡 {level=2}
对[[#ex-wavelengths]]中的模型（$L = 4096$）取 $\alpha = 1$、$\beta = 32$，按 YaRN 的斜坡判断 $i = 0$、$20$、$35$、$50$ 这四对：哪些保持不变，哪些被完全插值，哪些部分插值？
::: solution
$r_i = L/\lambda_i = 4096/(2\pi\cdot10{,}000^{2i/128})$。$i = 0$：$r = 652$，高于 $\beta$，保持不变。$i = 20$：$\lambda = 2\pi\cdot10{,}000^{0.3125} = 2\pi\cdot17.78 = 111.7$，$r = 36.7 > 32$，保持不变。$i = 35$：$\lambda = 2\pi\cdot10{,}000^{0.5469} = 2\pi\cdot153.9 = 967$，$r = 4.24$，介于 $1$ 与 $32$ 之间：$\gamma = (4.24 - 1)/31 = 0.104$，大部分被插值。$i = 50$：$\lambda = 2\pi\cdot10{,}000^{0.78125} = 2\pi\cdot1333.5 = 8379$，$r = 0.49 < 1$，完全插值。
:::
:::

::: exercise 嵌入初始化 {level=2}
一个新词元 "tion" 原来被切成 "ti" 与 "on"，它们的输入嵌入为 $\mathbf e_{\text{ti}}$ 与 $\mathbf e_{\text{on}}$。解释为什么把新嵌入初始化为 $\frac12(\mathbf e_{\text{ti}} + \mathbf e_{\text{on}})$ 比随机向量更好，以及输出嵌入上还剩下什么问题。
::: solution
模型已经学会把 "on" 接在 "ti" 之后当作字符串 "tion" 来处理；经过最初的几层之后，它对这样一个词元对的表示携带着 "tion" 的含义。两个嵌入的平均并不等同于那次两词元的计算，但它落在模型所熟悉的嵌入空间区域内，携带着两个片段的特征，于是最初几次前向传播就能得到合理的表示，新词元也能被迅速修正；随机向量起初只是尺度都不对的无意义噪声。对输出层来说，新行的作用决定 "tion" 被预测的频率：按与输入相同的方式初始化时，它会与旧片段 "ti"、"on" 竞争，模型必须学会在分词器如今会产出它的地方偏好这个单独的新词元。在此之前，新词元的概率是失真的——这也是词表扩展需要继续预训练、而不能只换一个分词器的原因之一。
:::
:::

::: exercise 作为混合的重放 {level=3}
证明[[#def-continued]]中 $\mathcal{L}_{\text{CPT}}$ 在 $\theta_0$（旧损失的极小点）处的梯度为 $(1-\rho)\nabla\mathcal L_q(\theta_0)$，因而重放不会减慢适配的开始；然后用[[#prop-forgetting]]解释为什么重放之后仍能限制遗忘。在清单中，$0\%$ 与 $25\%$ 重放之间，新领域损失与旧领域损失各如何变化？
::: solution
$\nabla\mathcal L_{\text{CPT}} = (1-\rho)\nabla\mathcal L_q + \rho\nabla\mathcal L_p$，而在极小点处 $\nabla\mathcal L_p(\theta_0) = 0$，只剩 $(1-\rho)\nabla\mathcal L_q(\theta_0)$：最初的步子朝新损失的方向走，只是略微缩短。随着参数移动 $\Delta$，$\nabla\mathcal L_p(\theta_0 + \Delta)\approx H_p\Delta$ 逐渐增长，恰好沿[[#eq-forgetting]]所说的代价高昂的高曲率方向把参数拉回。运行最终停在 $(1-\rho)\nabla\mathcal L_q = -\rho H_p\Delta$ 处，这是一个在旧损失的刚性方向上移动更少的折中。在清单中，$25\%$ 的重放把新领域损失从 $1.844$ 抬到 $1.968$（$+0.12$），把旧领域损失从 $3.075$ 降到 $2.114$（$-0.96$）。
:::
:::

::: exercise 规划一次长上下文扩展 {level=3}
一个团队想把一个 $70$ 亿参数的模型从 $8$K 扩展到 $64$K 词元，用 $50$ 亿词元做继续预训练。使用每词元 $C\approx(6N + 6n_{\text{layer}}Td)$，取 $n_{\text{layer}} = 32$、$d = 4096$（[[pretraining/training-loop#prop-6nd]]），估计 $T = 65{,}536$ 时的算力，并与 $T = 8192$ 时相同词元数的算力比较。然后描述它应当使用什么数据、如何评测。
::: solution
$T = 65{,}536$ 时：每词元 $6\cdot7\times10^9 + 6\cdot32\cdot65{,}536\cdot4096 = 4.2\times10^{10} + 5.15\times10^{10} = 9.35\times10^{10}$ FLOPs；对 $5\times10^9$ 个词元共 $4.7\times10^{20}$ FLOPs。$T = 8192$ 时：$4.2\times10^{10} + 6.4\times10^9 = 4.84\times10^{10}$ 每词元，总计 $2.4\times10^{20}$。长序列使每词元代价几乎翻倍，但总量仍远低于基础模型预训练的成本（$2$ 万亿词元是 $8.4\times10^{22}$）。数据：在基础配比之上，在每个来源内部对长文档上采样（书籍、长网页、按项目拼接的代码仓库），再重放一些短数据以保留短上下文能力；提高 RoPE 底数或应用 YaRN。评测：前后对比短上下文基准（以检测遗忘）、长文档中损失随位置的变化、不同深度与长度的"大海捞针"检索，以及 RULER 这类更难的长上下文评测套件。
:::
:::
