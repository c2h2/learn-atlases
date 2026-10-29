*Dog bites man*（狗咬人）和 *man bites dog*（人咬狗）包含同样的三个词，报告的确是大不相同的事件。只读词集合的模型无法区分两者——而这恰恰是自注意力读到的东西：按 [[transformers/self-attention#prop-permutation]]，打乱输入词元只是同样打乱输出。必须告诉 Transformer 每个词元在哪里。

方案大体分两类。**绝对**方案给每个词元附上一个标识其位置 $1, 2, 3, \dots$ 的向量，让网络由这些向量自行算出距离。**相对**方案改变注意力分数，使其依赖于两个词元相隔多远——对语言要紧的通常正是距离：形容词修饰*紧挨着它*的名词，无论这对词出现在文本何处。本章按历史顺序展开主要方法——可学习嵌入与正弦嵌入、相对偏置、当前大多数开放模型使用的旋转位置编码（RoPE），以及 ALiBi——最后讲模型如何被拉伸到比训练时更长的上下文。

## 绝对位置嵌入 {#sec-absolute}

最简单的做法是每个位置学一个向量。上下文长度为 $T_{\max}$ 的模型保存一张矩阵 $P\in\R^{T_{\max}\times d_{\text{model}}}$，第一层在位置 $t$ 的输入是词元嵌入加上 $P$ 的第 $t$ 行：

$$
\mathbf{x}_t = E[\text{token}_t] + P[t].
$$

BERT 学了 $512$ 个这样的向量，GPT-2 学了 $1024$ 个。可学习嵌入很灵活，但有两个弱点：超出 $T_{\max}$ 的位置根本没有嵌入可用，而训练中很少出现的位置（若大多数训练文本很短，长上下文的最后几百个位置就是如此）只能得到训练很差的向量。

原始 Transformer 改用由正弦函数构造的固定向量。

::: definition 正弦位置编码 {#def-sinusoidal}
对位置 $\text{pos}\in\{0, 1, 2, \dots\}$ 和偶数模型维数 $d$，**正弦编码** $\operatorname{PE}(\text{pos})\in\R^d$ 在 $i = 0, 1, \dots, d/2 - 1$ 处为

$$
\operatorname{PE}(\text{pos})_{2i} = \sin(\omega_i\,\text{pos}), \qquad \operatorname{PE}(\text{pos})_{2i+1} = \cos(\omega_i\,\text{pos}), \qquad \omega_i = 10000^{-2i/d}.
$$

它被加到网络输入端的词元嵌入上。
:::

每一对坐标是一支以各自速度 $\omega_i$ 转动的时钟指针：第一对每 $2\pi\approx 6.3$ 个位置转一圈，最后一对每 $2\pi\cdot10000\approx 62{,}832$ 个位置转一圈。它们合起来给每个位置一个独一无二的图案，有点像混合进位制中一个数的各位数字：快的"数字"记录精细位置，慢的记录粗略位置。

::: example 头几个编码 {#ex-sinusoid}
对 $d = 4$ 写出 $\operatorname{PE}(0)$ 和 $\operatorname{PE}(1)$。
::: solution
$d = 4$ 时频率为 $\omega_0 = 1$、$\omega_1 = 10000^{-1/2} = 0.01$，于是

$$
\operatorname{PE}(0) = (0, 1, 0, 1), \qquad \operatorname{PE}(1) = (\sin 1, \cos 1, \sin 0.01, \cos 0.01) = (0.841, 0.540, 0.010, 1.000).
$$

第一对已经转过一弧度；第二对几乎没动。在几百个位置上，第二对会明显移动，而第一对已经转过许多圈。
:::
:::

::: widget plot
f: sin(x/10000^(j/32)); cos(x/10000^(j/32))
x: 0, 200
y: -1.2, 1.2
sliders: j=0:0:31:1
labels: $\operatorname{PE}_{2j}$; $\operatorname{PE}_{2j+1}$
caption: $d = 64$ 的正弦编码第 $2j$ 与 $2j+1$ 个坐标随位置变化的图像。$j$ 小则振荡快，能区分相邻位置；$j$ 大则变化慢，能区分文本中相距很远的区域。没有任何两个位置的全部 $32$ 对取值相同。
:::

Vaswani 等人选择正弦函数，是希望模型能够轻易地按*相对*位置施加注意力，而且这个希望有一个确切的理由。

::: proposition 平移即旋转 {#prop-shift}
对每个偏移 $k$，存在一个与 $\text{pos}$ 无关的矩阵 $M_k$，使得对一切 $\text{pos}$ 有 $\operatorname{PE}(\text{pos} + k) = M_k\,\operatorname{PE}(\text{pos})$。它是分块对角的，$2\times2$ 块为

$$
\begin{pmatrix}\cos\omega_ik & \sin\omega_ik\\ -\sin\omega_ik & \cos\omega_ik\end{pmatrix}, \qquad i = 0, \dots, d/2 - 1.
$$
:::

::: proof
对其中一对，写 $a = \omega_i\,\text{pos}$、$b = \omega_ik$。由加法公式

$$
\begin{pmatrix}\sin(a + b)\\ \cos(a + b)\end{pmatrix} = \begin{pmatrix}\sin a\cos b + \cos a\sin b\\ \cos a\cos b - \sin a\sin b\end{pmatrix} = \begin{pmatrix}\cos b & \sin b\\ -\sin b & \cos b\end{pmatrix}\begin{pmatrix}\sin a\\ \cos a\end{pmatrix}.
$$

矩阵经由 $b$ 依赖于 $k$，却不依赖 $\text{pos}$。把 $d/2$ 对叠起来就得到 $M_k$。
:::

因此沿序列移动 $k$ 个位置是一个固定的线性映射，学到的投影原则上可以利用它。但实践中，加在输入上的绝对编码在之后的每一层都与词元内容相互纠缠，相对信息并不能干净地供注意力使用。这促使人们把距离直接写进注意力分数。

## 相对位置偏置 {#sec-relative}

Shaw、Uszkoreit 和 Vaswani（2018）让查询 $i$ 与键 $j$ 的分数依赖于截断距离 $j - i$ 的一个可学习向量；Transformer-XL（Dai et al., 2019）用正弦相对项改进了这一想法。T5 模型（Raffel et al., 2019）用了最简单的版本：一个可学习的标量偏置，每个头、每个相对距离**桶**一个，加到分数上，

$$
s_{ij} = \frac{\mathbf{q}_i\cdot\mathbf{k}_j}{\sqrt{d_k}} + b_{\text{bucket}(j - i)}.
$$

T5 用了 $32$ 个桶：每个小距离自成一桶，更大的距离共享对数加宽的桶，超过 $128$ 个词元的一律落入最后一桶。例如在 T5 的解码器里，距离 $0$ 到 $15$ 各有自己的桶，其余 $16$ 个桶按对数刻度覆盖 $16$ 到 $127$ 的距离：模型分得清*往前三个*词元和*往前四个*词元，却分不清 $100$ 和 $101$——后者很少需要。这类偏置完全不碰词元表示，只改变谁注意谁。

## 旋转位置编码 {#sec-rope}

RoPE（Su et al., 2021）用一个优雅的把戏实现相对注意力：不是加位置向量，而是把查询向量和键向量**旋转**与各自位置成比例的角。旋转两个相同的角不改变它们的点积，于是分数里只剩角度的*差*——相对位置。

::: definition 旋转位置编码（RoPE） {#def-rope}
设 $d_k$ 为偶数，$\theta_i = b^{-2i/d_k}$，$i = 0, \dots, d_k/2 - 1$，底数为 $b$（通常取 $10000$）。对位置 $m$，令 $R_m\in\R^{d_k\times d_k}$ 为分块对角矩阵，$2\times2$ 旋转块为

$$
R_m = \operatorname{diag}\big(\rho(m\theta_0), \dots, \rho(m\theta_{d_k/2-1})\big), \qquad \rho(\alpha) = \begin{pmatrix}\cos\alpha & -\sin\alpha\\ \sin\alpha & \cos\alpha\end{pmatrix}.
$$

**RoPE** 在计算分数之前，于每个注意力层中把位置 $m$ 的查询换成 $R_m\mathbf{q}_m$、位置 $n$ 的键换成 $R_n\mathbf{k}_n$。值不旋转。
:::

::: proposition RoPE 分数只依赖相对位置 {#prop-rope}
对所有 $\mathbf{q}, \mathbf{k}\in\R^{d_k}$ 和位置 $m, n$，

$$
(R_m\mathbf{q})\cdot(R_n\mathbf{k}) = \mathbf{q}\cdot(R_{n-m}\mathbf{k}).
$$
:::

::: proof
$(R_m\mathbf{q})\cdot(R_n\mathbf{k}) = \mathbf{q}^\top R_m^\top R_n\mathbf{k}$。各块都是旋转，故 $\rho(\alpha)^\top = \rho(-\alpha)$ 且 $\rho(-\alpha)\rho(\beta) = \rho(\beta - \alpha)$。逐块来看，$R_m^\top R_n = \operatorname{diag}\big(\rho((n - m)\theta_i)\big) = R_{n-m}$。
:::

旋转还保持长度，所以 RoPE 既不改变查询的范数，也不改变键的范数——只改变它们相遇的夹角。因此同一对词元在位置 $(3, 5)$ 与在 $(1003, 1005)$ 得到完全相同的分数，这正是相对方案追求的平移不变性；而顺序依然要紧：$(5, 3)$ 的分数与 $(3, 5)$ 不同。

::: widget transform2d
matrix: cos(pi/6), -sin(pi/6); sin(pi/6), cos(pi/6)
vector: 2,1
caption: RoPE 下的一对坐标：当 $m\theta_i = \pi/6$ 时，位置 $m$ 施加的是绕 $\alpha = \pi/6$ 的旋转。播放动画：网格刚性转动，每个向量长度不变，任意两个向量之间的夹角也不变。于是旋转 $m\theta_i$ 的查询与旋转 $n\theta_i$ 的键，相遇的夹角只依赖于 $n - m$。
:::

::: example 二维中的 RoPE {#ex-rope}
取 $d_k = 2$、单一频率 $\theta = 0.5$、查询 $\mathbf{q} = (1, 0)$、键 $\mathbf{k} = (1, 1)$。计算位置 $(m, n) = (3, 5)$、$(10, 12)$ 和 $(5, 3)$ 的 RoPE 分数。
::: solution
由 [[#prop-rope]]，分数是 $\mathbf{q}\cdot\rho((n - m)\theta)\mathbf{k}$。对 $(3, 5)$ 和 $(10, 12)$，$n - m = 2$，角为 $1$ 弧度：

$$
\rho(1)\begin{pmatrix}1\\1\end{pmatrix} = \begin{pmatrix}\cos1 - \sin1\\ \sin1 + \cos1\end{pmatrix} = \begin{pmatrix}-0.301\\1.382\end{pmatrix}, \qquad \text{分数} = \cos1 - \sin1 = -0.301.
$$

两组位置都恰得 $-0.301$。对 $(5, 3)$，角为 $-1$，$\rho(-1)\mathbf{k} = (\cos1 + \sin1,\ \cos1 - \sin1) = (1.382, -0.301)$，于是分数是 $1.382$：位于查询*之前*两格的键与位于*之后*两格的键得分大不相同。（有了因果掩码，只使用不晚于查询的键，所以解码器看到的就是这种不对称。）
:::
:::

在代码里，RoPE 通过把坐标配对、逐对旋转来实现；用复数表示时，绕 $\alpha$ 旋转就是乘以 $e^{\mathrm{i}\alpha}$，由此得到一个紧凑的实现。

```python
import torch

def rope(x, base=10000.0):
    # x: (B, h, T, d_k) 查询或键，d_k 为偶数
    B, h, T, d_k = x.shape
    theta = base ** (-torch.arange(0, d_k, 2).float() / d_k)          # (d_k/2,)
    angles = torch.arange(T).float()[:, None] * theta[None, :]          # (T, d_k/2)：m * theta_i
    rot = torch.polar(torch.ones_like(angles), angles)                  # e^{i m theta_i}，(T, d_k/2)
    xc = torch.view_as_complex(x.float().reshape(B, h, T, d_k // 2, 2)) # 把每对看成复数
    return torch.view_as_real(xc * rot).reshape(B, h, T, d_k)           # 旋转，再化回实数对

torch.manual_seed(0)
q, k = torch.randn(1, 1, 16, 8), torch.randn(1, 1, 16, 8)
q[..., 3, :], k[..., 7, :] = q[..., 9, :], k[..., 13, :]                # 内容相同，平移 6 格
s = rope(q) @ rope(k).transpose(-2, -1)                                  # (1, 1, 16, 16) 分数
print(torch.allclose(s[0, 0, 3, 7], s[0, 0, 9, 13], atol=1e-5))           # True：偏移相同，分数相同
```

底数 $b$ 决定最慢的频率。$d_k = 128$、$b = 10000$ 时，最慢的一对约每 $2\pi\cdot10000^{126/128}\approx54{,}000$ 个位置转一圈，所以远在几千个位置之外的位置在慢对里仍有可区分的角度，而快对每隔几个词元就重复一次。对各对取平均后，一个查询与一个与它相似的键之间的分数随距离增大总体下降——这就是 Su 等人指出的"长期衰减"。

RoPE 与真实系统相遇时有两个实际细节要紧。其一，键的旋转只依赖它自己的位置，所以生成期间每个键只旋转一次，旋转好存进 KV缓存（[[inference/kv-cache]]）；每个新查询先按自己的位置旋转，再与它们比较。其二，有些模型只旋转每个头的一部分维度：GPT-J 对每个头 $256$ 维中的 $64$ 维施加 RoPE，GPT-NeoX-20B 只对四分之一，其余维度留作不问位置、只比内容之用。

::: widget plot
f: sum(cos(x*b^(-k/16)), k, 0, 15)/16
x: 0, 400
y: -0.4, 1.05
sliders: b=10000:100:1000000:100
labels: score of $\mathbf{q} = \mathbf{k} = \mathbf{1}$, normalised
caption: 查询与键都是 $d_k = 32$ 维全 1 向量时的 RoPE 分数（作归一化使距离 $0$ 处为 $1$）随两者距离变化的图像，底数为 $b$。分数随距离增长呈波纹状下降，因为快对先失同步。增大底数会减慢所有旋转，这是长上下文模型调整 RoPE 的一种办法。
:::

::: quiz
下列位置方案中，哪些完全不碰值向量、只影响查询与键的比较方式？（多选）
- [x] RoPE
- [x] T5 的相对偏置桶
- [x] ALiBi
- [ ] 加到输入嵌入上的正弦编码
::: solution
RoPE 只旋转查询和键；T5 偏置和 ALiBi 往分数上加项。加到输入上的编码改变词元表示本身，于是在每一层里都会流进查询、键*和*值。
:::
:::

::: warning RoPE 不是输入嵌入
一个常见的实现错误是把 RoPE 像正弦编码那样只作用一次、加到词元嵌入上。RoPE 必须在每个注意力层投影之后，作用于该层的查询和键——而且不作用于值。作用在输入上，它会被投影搅混，失去 [[#prop-rope]] 的性质；作用在值上，则会让*输出*依赖于绝对位置。
:::

## ALiBi：对距离的线性惩罚 {#sec-alibi}

Press、Smith 和 Lewis（2021）提出了一个更简单的相对方案，既没有位置向量，也没有可学习参数。

::: definition ALiBi {#def-alibi}
**带线性偏置的注意力**从每个分数中减去一个与查询 $i$ 和键 $j\le i$ 之间距离成正比的惩罚：

$$
s_{ij} = \frac{\mathbf{q}_i\cdot\mathbf{k}_j}{\sqrt{d_k}} - m_h\,(i - j),
$$

头 $h$ 有固定的斜率 $m_h$。$H$ 个头时，斜率构成等比数列 $2^{-8/H}, 2^{-16/H}, \dots, 2^{-8}$；$H = 8$ 时为 $\tfrac12, \tfrac14, \dots, \tfrac1{256}$。
:::

斜率陡的头只看近处；斜率缓的头能望得很远。作者证明，用 ALiBi 在 $1024$ 词元序列上训练的模型，测试时在更长的序列上仍然工作——可学习嵌入和正弦编码都做不到这一点——论文标题就是《Train Short, Test Long》（训练用短，测试用长）。BLOOM 等 2022–2023 年的模型用过 ALiBi，不过此后更常见的选择已是 RoPE。

::: example ALiBi 的偏置 {#ex-alibi}
在一个 $8$ 个头、使用 ALiBi 的模型里，计算比查询早 $10$ 个位置的键的分数被加上的偏置，分别看头 $1$ 和头 $8$。与原始分数相同、距离为 $0$ 的键相比，该键的权重缩小了多少？
::: solution
头 1 的斜率为 $\tfrac12$，偏置是 $-\tfrac12\cdot10 = -5$，权重相对距离 $0$ 的键乘以 $e^{-5}\approx0.0067$：这个头在几个词元之外几乎什么都看不见。头 8 的斜率为 $\tfrac1{256}$，偏置 $-10/256 = -0.039$，因子 $e^{-0.039}\approx0.96$：这个头几乎不在乎距离。
:::
:::

并非所有模型都需要显式的位置。在*因果*解码器里，位置 $t$ 恰好注意 $t$ 个键，仅此一点就泄漏了位置信息：Haviv et al.（2022）发现，完全不使用位置编码（"NoPE"）训练的解码器学起位置来与用编码的几乎一样好。习题 11 展示了原理。

## 比训练时更长的上下文 {#sec-extend}

在长序列上预训练很昂贵，所以模型通常在中等长度（例如 $4096$ 词元）上预训练，之后再作适配。对 RoPE 来说，超出训练范围的位置会在慢对里产生模型从未见过的旋转角，质量随之崩溃。**位置插值**（Chen et al., 2023）改为重新缩放位置：要把上下文从 $L$ 扩展到 $sL$ 个词元，位置 $m$ 就按位置 $m/s$ 的角度旋转。于是所有角度都留在训练过的范围内，代价是位置被压得更密，再作一小段微调——原始实验中约一千步——模型就能适应。后续的改进改变底数 $b$ 或不均匀地缩放频率（例如 Peng et al., 2023 的 YaRN），让编码局部顺序的快对几乎原封不动。[[inference/long-context]] 会回到这些方法。

更长的窗口并不保证模型真会用满。Liu et al.（2023）发现，语言模型检索放在长输入开头或末尾的信息远比检索放在中间的信息可靠。因此评测长上下文模型时，要把关键事实放在不同长度的输入的不同深度上，而不是引用窗口的标称大小（[[evaluation/benchmarks]]）。

::: example 可学习还是旋转 {#ex-params}
GPT-2 small（$T_{\max} = 1024$，$d_{\text{model}} = 768$）的可学习位置嵌入有多少参数？RoPE 给模型增加了多少参数？在位置 $1500$ 处各自会发生什么？
::: solution
可学习的表有 $1024\times768 = 786{,}432$ 个参数。RoPE 一个参数也不加：它的角度是位置固定的函数。在位置 $1500$，GPT-2 根本无从查起，连输入都无法形成；RoPE 模型倒能算出旋转，但若只在 $1024$ 以内训练过，慢对会到达它从未见过的角度，质量下降——除非按上文所述对位置作插值。
:::
:::

::: history
位置嵌入最早是在 Gehring et al.（2017）的卷积序列到序列模型中学习的；Transformer 论文（Vaswani et al., 2017）提出了正弦编码，并报告它与可学习嵌入一样好用。然而 BERT（2018）和 GPT-2（2019）仍用了可学习的绝对嵌入。相对位置由 Shaw、Uszkoreit 和 Vaswani（2018）引入注意力，在 Transformer-XL（Dai et al., 2019）中得到发展，并在 T5（Raffel et al., 2019）中化简为可学习的标量偏置。苏剑林（Jianlin Su）及其同事在 RoFormer 论文（2021）中提出旋转位置编码；它先被 EleutherAI 的 GPT-J（2021）和 GPT-NeoX-20B（2022）采用，又被 PaLM 和 LLaMA 采用，如今是开放模型的默认做法。Press、Smith 和 Lewis 于 2021 年发表了 ALiBi。Haviv et al.（2022）证明因果解码器不需要任何编码就能学到位置。Chen et al.（2023）为扩展 RoPE 模型提出位置插值，Peng et al.（2023）提出 YaRN 这一族频率缩放方法。
:::

::: summary
- 自注意力不辨顺序，所以必须注入位置信息。绝对方案给每个位置贴标签；相对方案让分数依赖距离。
- 可学习的绝对嵌入（BERT、GPT-2）无法表示超出其表的范围；正弦编码使用速度按几何间隔的时钟，平移 $k$ 个位置是编码的一个固定旋转。
- RoPE 在每个作用层把查询与键的每对坐标旋转与位置成比例的角；分数 $(R_m\mathbf{q})\cdot(R_n\mathbf{k}) = \mathbf{q}\cdot R_{n-m}\mathbf{k}$ 只依赖偏移，值不受触动。
- ALiBi 从分数中减去头特定的线性惩罚 $m_h(i - j)$，不添加参数；T5 则按距离桶添加可学习偏置。
- 通过在超过训练长度时对 RoPE 位置作插值或重新缩放其频率，再辅以简短的微调，可以扩展上下文。
:::

## 习题

::: exercise 最慢的时钟 {level=1 check="2*pi*10000"}
对大的 $d$，[[#def-sinusoidal]] 的正弦编码最短和最长的波长（以位置计）各是多少？给出最长的那个。
::: solution
第 $i$ 对的波长为 $2\pi/\omega_i = 2\pi\cdot10000^{2i/d}$。最短的是 $2\pi\approx6.28$（在 $i = 0$ 处）；最长的在 $i = d/2 - 1$ 处，为 $2\pi\cdot10000^{(d-2)/d}$，当 $d$ 很大时趋于 $2\pi\cdot10000\approx62{,}832$。
:::
:::

::: exercise 零号位置 {level=1 check="4"}
对 $d = 8$ 写出 $\operatorname{PE}(0)$。各分量之和是多少？
::: solution
每一对中 $\sin0 = 0$、$\cos0 = 1$：$\operatorname{PE}(0) = (0, 1, 0, 1, 0, 1, 0, 1)$，和为 $4$。
:::
:::

::: exercise 位置表 {level=1 check="786432"}
某模型有覆盖 $T_{\max} = 1024$ 个位置、$d_{\text{model}} = 768$ 的可学习绝对位置嵌入。那是多少个参数？
::: solution
$1024\cdot768 = 786{,}432$。
:::
:::

::: exercise ALiBi 的惩罚 {level=1 check="-5"}
在 $8$ 个头、使用 ALiBi 的模型中，头 $1$ 给比查询早 $10$ 个位置的键的分数加上什么偏置？
::: solution
头 $1$ 的斜率为 $2^{-8/8} = \tfrac12$，所以偏置是 $-\tfrac12\cdot10 = -5$，与 [[#ex-alibi]] 相同。
:::
:::

::: exercise 平移可复合 {level=2}
利用 [[#prop-shift]] 证明 $M_kM_l = M_{k+l}$ 且 $M_k^\top = M_{-k}$，并推出 $\operatorname{PE}(\text{pos})\cdot\operatorname{PE}(\text{pos} + k)$ 不依赖于 $\text{pos}$。这个点积在 $k = 0$ 时是多少？
::: solution
$M_k$ 的每个块是绕 $-\omega_ik$ 的旋转（按 [[#prop-shift]] 的取向），而绕 $\alpha$ 与绕 $\beta$ 的旋转复合为绕 $\alpha + \beta$ 的旋转，故 $M_kM_l = M_{k+l}$；旋转的转置是其逆，故 $M_k^\top = M_{-k}$。于是 $\operatorname{PE}(\text{pos})\cdot\operatorname{PE}(\text{pos} + k) = \operatorname{PE}(\text{pos})^\top M_k\operatorname{PE}(\text{pos})$，在每一对中这是 $\cos(\omega_ik)(\sin^2a + \cos^2a) = \cos(\omega_ik)$（$\sin$ 项相消），与 $\text{pos}$ 无关。求和得 $\operatorname{PE}(\text{pos})\cdot\operatorname{PE}(\text{pos}+k) = \sum_i\cos(\omega_ik)$，$k = 0$ 时为 $d/2$——即每个编码的长度平方。
:::
:::

::: exercise 相同偏移，相同分数 {level=2 check="cos(1)-sin(1)"}
在 [[#ex-rope]] 中，直接按定义（把 $\mathbf{q}$ 旋转 $10\theta$、$\mathbf{k}$ 旋转 $12\theta$）计算位置 $(m, n) = (10, 12)$ 的 RoPE 分数，确认它等于 [[#prop-rope]] 给出的值。
::: solution
$\rho(5)\mathbf{q} = (\cos5, \sin5)$，$\rho(6)\mathbf{k} = (\cos6 - \sin6,\ \sin6 + \cos6)$。它们的点积为 $\cos5\cos6 - \cos5\sin6 + \sin5\sin6 + \sin5\cos6 = \cos(6 - 5) - \sin(6 - 5) = \cos1 - \sin1\approx-0.301$，其中用到 $\cos5\cos6 + \sin5\sin6 = \cos1$ 与 $\sin5\cos6 - \cos5\sin6 = \sin(5 - 6) = -\sin1$。这与 [[#ex-rope]] 一致。
:::
:::

::: exercise 最慢的旋转对 {level=2 check="2*pi*10000^(126/128)"}
对 $d_k = 128$、底数 $10000$ 的 RoPE，求最慢一对的角频率 $\theta_{63}$ 及其以位置计的波长。
::: solution
$\theta_{63} = 10000^{-126/128}\approx1.155\times10^{-4}$ 弧度每位置，于是波长为 $2\pi/\theta_{63} = 2\pi\cdot10000^{126/128}\approx54{,}410$ 个位置。
:::
:::

::: exercise 相加还是拼接？ {level=2}
正弦编码是被*加*到词元嵌入上的，而不是与它们拼接。论证相加损失很小：(a) 证明若词元嵌入与编码落在 $\R^d$ 的相互正交的子空间中，一个线性映射就能从它们的和分别恢复两者；(b) 解释为什么在高维中，学到的嵌入与固定编码即便未被强制，也几乎正交。拼接的代价是什么？
::: solution
(a) 若 $\mathbf{e}\in U$ 且 $\mathbf{p}\in U^\perp$，正交投影 $\Pi_U$ 与 $\Pi_{U^\perp}$ 是线性的，给出 $\Pi_U(\mathbf{e} + \mathbf{p}) = \mathbf{e}$、$\Pi_{U^\perp}(\mathbf{e} + \mathbf{p}) = \mathbf{p}$；投影 $W_Q$、$W_K$、$W_V$ 可以学会包含这样的映射。(b) 高维中两个不相干的向量夹角余弦接近 $0$（随机方向下量级为 $1/\sqrt d$），所以模型几乎可以独立使用这两个信号。拼接固然可以避免一切干扰，却会撑大每一个表示和每一个读取它的权重矩阵，抬高参数和 FLOPs，收益却很少。
:::
:::

::: exercise 用复数看 RoPE {level=3}
把每一对 $(x_{2i}, x_{2i+1})$ 等同于复数 $z_i = x_{2i} + \mathrm{i}\,x_{2i+1}$。证明绕 $\alpha$ 旋转就是乘以 $e^{\mathrm{i}\alpha}$，两个向量的实点积是 $\operatorname{Re}\sum_i\overline{z_i}w_i$，并用这两个事实给 [[#prop-rope]] 一个一行证明。
::: solution
$e^{\mathrm{i}\alpha}(a + \mathrm{i}b) = (a\cos\alpha - b\sin\alpha) + \mathrm{i}(a\sin\alpha + b\cos\alpha)$，这正是向量 $\rho(\alpha)(a, b)$。对向量 $\mathbf{x}\leftrightarrow(z_i)$ 与 $\mathbf{y}\leftrightarrow(w_i)$，$\overline{z_i}w_i = (a - \mathrm{i}b)(c + \mathrm{i}d)$ 的实部为 $ac + bd$，即第 $i$ 对 $\mathbf{x}\cdot\mathbf{y}$ 的贡献。于是

$$
(R_m\mathbf{q})\cdot(R_n\mathbf{k}) = \operatorname{Re}\sum_i\overline{e^{\mathrm{i}m\theta_i}q_i}\,e^{\mathrm{i}n\theta_i}k_i = \operatorname{Re}\sum_i\overline{q_i}\,e^{\mathrm{i}(n - m)\theta_i}k_i = \mathbf{q}\cdot(R_{n-m}\mathbf{k}).
$$

[[#sec-rope]] 中的代码正是这样计算 RoPE 的。
:::
:::

::: exercise 对位置作插值 {level=3}
一个 RoPE 模型在 $L = 4096$ 词元的上下文上训练，位置插值把它扩展到 $16{,}384$。(a) 使用的缩放因子 $s$ 是多少？位置 $10{,}000$ 被映到哪个"虚拟"位置？(b) 对最快的一对（$\theta_0 = 1$），插值前后相邻两个词元的角度各相差多少？(c) 这为什么会造成伤害？YaRN 一类方法如何应对？
::: solution
(a) $s = 16384/4096 = 4$；位置 $10{,}000$ 按位置 $2500$ 旋转，落在训练过的范围内。(b) 插值前，最快一对里相邻词元相差 $\theta_0 = 1$ 弧度；插值后相差 $1/4$ 弧度。(c) 快对携带精细的局部顺序，模型在那里已学会读取约一弧度的差；把它们压缩四倍会模糊相邻位置，在微调之前损害质量。因此 YaRN 及相关方法对慢对（否则会离开训练范围）施加强烈的缩放，而对快对（在训练长度内已循环许多圈）几乎不缩放。
:::
:::

::: exercise 没有编码的位置 {level=3}
一个因果解码器没有位置编码，但其输入总以一个特殊的起始词元开头，该词元的嵌入在某个坐标上取 $1$，而每个其他词元在该坐标上取 $0$。构造一个注意力头，使它在位置 $t$ 的输出包含数 $1/t$，并解释为什么后面的层由此能恢复位置。
::: solution
用查询投影和键投影都是零的头，于是每个分数都是 $0$，位置 $t$ 的因果注意力在键 $1, \dots, t$ 上均匀分布，各权重 $1/t$。再让值投影复制那个特殊坐标：值在起始词元处为 $1$，其余为 $0$。于是位置 $t$ 的输出为 $\frac1t\cdot1 + \frac1t\cdot0 + \dots = 1/t$。这个数在每个位置都不同，后面的层（配合前馈非线性）就能把它变成所需的任何位置特征。若没有因果掩码，每个位置都会看见全部 $T$ 个键而得到 $1/T$，处处相同——这就是 "NoPE" 在解码器里行得通、在双向编码器里行不通的原因。
:::
:::
