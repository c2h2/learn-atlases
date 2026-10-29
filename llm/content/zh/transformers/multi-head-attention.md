单个注意力头对每个位置只算一个加权平均，所以每个词元一次只能遵循一种相关模式。语言却同时需要好几种。在 *the keys to the cabinet are on the table* 中，动词 *are* 需要它的主语（是 *keys* 而不是 *cabinet*，否则数对不上），名词 *keys* 被 *to the cabinet* 修饰，而每个词都有仅仅因为相邻就重要的邻居。对位置做一次 softmax，就得在这几种关系之间折中。

**多头注意力**让若干注意力头并排运行，每个头都有自己通往较小空间的投影，再把它们的结果合并。不同的头可以自由地学到不同的关系——训练好的模型里许多头确实如此。本章定义这一层，说明把它分成头并不多花参数，再加上让语言模型能同时用序列的每个位置训练的**因果掩码**，并走完一个真实实现中各张量的形状与开销。

## 多头并行 {#sec-heads}

思路是把模型维数 $d_{\text{model}}$ 切成 $h$ 个大小 $d_k = d_{\text{model}}/h$ 的切片，在每个切片中独立地跑注意力，最后再用一个线性映射把切片混合起来。

::: definition 多头注意力 {#def-mha}
设 $X\in\R^{T\times d_{\text{model}}}$，并设 $h$ 整除 $d_{\text{model}}$，$d_k = d_v = d_{\text{model}}/h$。对每个头 $i = 1, \dots, h$ 取学到的矩阵 $W_Q^{(i)}, W_K^{(i)}, W_V^{(i)}\in\R^{d_{\text{model}}\times d_k}$，计算

$$
\text{head}_i = \operatorname{Attention}\big(XW_Q^{(i)},\, XW_K^{(i)},\, XW_V^{(i)}\big)\in\R^{T\times d_k}.
$$

**多头注意力**把各头沿特征轴拼接，再作用输出矩阵 $W_O\in\R^{d_{\text{model}}\times d_{\text{model}}}$：

$$
\operatorname{MHA}(X) = \big[\text{head}_1\ \text{head}_2\ \cdots\ \text{head}_h\big]\,W_O\in\R^{T\times d_{\text{model}}}.
$$ {#eq-mha}
:::

实践中，$h$ 个查询矩阵并排存成一个 $d_{\text{model}}\times d_{\text{model}}$ 矩阵 $W_Q = [W_Q^{(1)}\cdots W_Q^{(h)}]$，键和值同理，于是投影只是三次普通的矩阵乘法；分成头不过是一次 reshape。原始 Transformer 用 $d_{\text{model}} = 512$、$h = 8$ 个大小 $64$ 的头；GPT-2 small 用 $768 = 12\times 64$。头的维数以 $64$ 或 $128$ 最为常见。

::: example 两个头，两种关系 {#ex-two-heads}
三个词元有 $4$ 维表示

$$
\mathbf{x}_1 = (1, 0, 1, 0), \qquad \mathbf{x}_2 = (0, 1, 1, 0), \qquad \mathbf{x}_3 = (1, 0, 0, 1).
$$

头 1 读前两个坐标，头 2 读后两个：对每个头取 $W_Q^{(i)} = W_K^{(i)}$ 为到它的两个坐标上的投影，于是 $d_k = 2$。计算两个注意力矩阵。
::: solution
头 1 看到 $\mathbf{x}_1\mapsto(1,0)$、$\mathbf{x}_2\mapsto(0,1)$、$\mathbf{x}_3\mapsto(1,0)$。词元 1 的缩放分数为 $(1, 0, 1)/\sqrt2$，得权重 $(0.401, 0.198, 0.401)$，整个矩阵为

$$
A^{(1)} = \begin{pmatrix}0.401&0.198&0.401\\0.248&0.503&0.248\\0.401&0.198&0.401\end{pmatrix}.
$$

头 2 看到 $(1,0)$、$(1,0)$、$(0,1)$：现在词元 1 和 2 彼此匹配，且

$$
A^{(2)} = \begin{pmatrix}0.401&0.401&0.198\\0.401&0.401&0.198\\0.248&0.248&0.503\end{pmatrix}.
$$

词元 1 在头 1 中与词元 3 配对，在头 2 中与词元 2 配对。若用一个头处理全部四个坐标，就得把这些偏好混成一团；两个头让它们各归各，而 $W_O$ 让下一层同时利用两者。
:::
:::

分成头在参数上是免费的。

::: proposition 多头注意力层的规模 {#prop-params}
不含偏置时，模型维数为 $d$ 的多头注意力层有 $4d^2$ 个参数，与头数 $h$ 无关。
:::

::: proof
每个头有三个 $d\times d_k$ 矩阵，$h$ 个头共 $3h\cdot d\cdot d_k = 3d\cdot(hd_k) = 3d^2$ 个参数，因为 $hd_k = d$。输出矩阵 $W_O$ 再添 $d^2$。总数 $4d^2$ 与 $h$ 无关。
:::

给四个投影加上偏置，计数为 $4d^2 + 4d$；对 GPT-2 small，$4\cdot768^2 + 4\cdot768 = 2{,}362{,}368$。头更多只意味着头更小，而不是层更大。

输出矩阵也可以按头分块。把 $W_O$ 写成 $h$ 个行块 $W_O^{(1)}, \dots, W_O^{(h)}\in\R^{d_k\times d}$。拼接矩阵乘以按行分块的矩阵给出乘积之和，所以

$$
\operatorname{MHA}(X) = \sum_{i=1}^{h} \text{head}_i\,W_O^{(i)}.
$$ {#eq-mha-sum}

因此每个头各自算出自己那份宽度为 $d_{\text{model}}$ 的贡献，再由这一层把它们加起来。这是可解释性研究采取的视角（[[interpretability/residual-stream]]）：每个头从共享表示中读取，并把自己的项写回去，与同一层里其他头无关。

## 因果掩码 {#sec-causal}

语言模型的训练目标是用前面的词元预测每个词元。给定序列 $x_1, \dots, x_T$，它应当在每个位置 $t$ 只用 $x_1, \dots, x_t$ 输出关于 $x_{t+1}$ 的一个分布。若位置 $t$ 能注意位置 $t + 1$，模型只要把答案抄下来就行。**因果掩码**禁止注意后面的位置。

::: definition 因果掩码 {#def-causal-mask}
长度为 $T$ 的**因果掩码**是矩阵 $M\in\R^{T\times T}$，其中

$$
M_{ij} = \begin{cases}0 & \text{若 } j\le i,\\ -\infty & \text{若 } j > i.\end{cases}
$$

**因果注意力**在 softmax 之前把它加到分数上：

$$
\operatorname{softmax}\!\Big(\frac{QK^\top}{\sqrt{d_k}} + M\Big)\,V.
$$
:::

因为 $e^{-\infty} = 0$，被掩的元素得权重零，softmax 把余下的重新归一化：位置 $t$ 把全部注意力分给位置 $1, \dots, t$。注意力矩阵变成下三角，允许的元素从 $T^2$ 个变为 $T(T+1)/2$ 个。

::: proposition 因果注意力只往后看 {#prop-causal}
在因果注意力层的堆叠中，每层都与逐位置运算（前馈层、归一化、残差连接）结合，则位置 $t$ 的输出只依赖位置 $1, \dots, t$ 的输入。
:::

::: proof
对层数归纳。设第 $\ell$ 层之后位置 $s$ 的表示对每个 $s$ 只依赖输入 $1, \dots, s$。在第 $\ell + 1$ 层，位置 $t$ 只注意满足 $s\le t$ 的位置，那些表示只依赖输入 $1, \dots, s\subseteq 1, \dots, t$；它的查询和逐位置运算只用位置 $t$ 自身。所以 $t$ 处的新表示只依赖输入 $1, \dots, t$。基础情形是输入层：位置 $t$ 只持有词元 $t$。
:::

这条命题正是 Transformer 高效训练的原因。对一条 $T$ 词元序列的一次前向传播产生 $T$ 个预测——每个前缀之后的那个词元——没有一个能看见自己的答案。循环网络也得到同样的 $T$ 个预测，却必须逐个计算；因果 Transformer 一次并行算完，这就是它能在数万亿词元上训练的原因。同样的结构也让逐词元生成文本成为可能，并复用早先的计算（[[inference/kv-cache]]）。

具体说，一条序列的训练损失是 $T$ 个交叉熵的平均，

$$
\mathcal{L} = -\frac{1}{T}\sum_{t=1}^{T}\log p_\theta(x_{t+1}\mid x_{\le t}),
$$

其中 $p_\theta(\cdot\mid x_{\le t})$ 从位置 $t$ 的输出读出（最后一个位置预测序列之后的词元，它同样取自数据）。训练文本的每个词元恰好当一次目标，这就是仅解码器模型相对 [[transformers/architecture-families]] 的掩码目标能从每条序列榨取如此多信号的原因。训练时模型总是以*真实*的前一批词元为条件——这叫**教师强制**——而生成时以自己的早期采样为条件；这种错配的成因在 [[sequence-models/decoding-basics]] 讨论。

::: widget graph
nodes: t1@0,0; t2@1,1.3; t3@2,1.8; t4@3,1.3; t5@4,0
edges: t1>t2; t1>t3; t1>t4; t1>t5; t2>t3; t2>t4; t2>t5; t3>t4; t3>t5; t4>t5
algorithm: topo
caption: 五个词元上因果注意力的信息流：从 $t_i$ 到 $t_j$ 的箭头表示位置 $j$ 可以注意位置 $i$（每个位置也可以注意自己）。此图没有环，因此可以把位置排成一个顺序，使每个只依赖比它早的位置——逐步走完这个拓扑排序。若没有掩码，图就是完全图，$t_4$ 就能看见 $t_5$，即它本要预测的词元。
:::

::: example 一行掩码 {#ex-masked-row}
在四词元序列的位置 $3$，对键 $1, \dots, 4$ 的缩放分数为 $(1, 0.5, 2, 3)$。计算有因果掩码与没有时的注意力权重。
::: solution
无掩码：$\operatorname{softmax}(1, 0.5, 2, 3) = (0.085, 0.052, 0.232, 0.631)$，多数权重落在键 $4$——未来词元上。

有掩码时分数变为 $(1, 0.5, 2, -\infty)$。最后一个权重为 $0$，其余在自身之间重新归一化：$\operatorname{softmax}(1, 0.5, 2) = (0.231, 0.140, 0.629)$。掩码并非简单删掉键 $4$ 的份额；余下的权重被重新缩放，使它们再次和为 $1$。
:::
:::

::: warning 掩码加在分数上，不是权重上
掩码必须加在 softmax *之前*的分数上。在 softmax *之后*把被禁的权重置零，会留下不再和为一的行——在 [[#ex-masked-row]] 中该行会变成 $(0.085, 0.052, 0.232, 0)$，和为 $0.369$——更糟的是，余下的权重是在分母含未来分数的情况下算出的，于是来自未来的信息仍然泄漏其中。半精度运算中常把 $-\infty$ 换成可表示的最负数，效果相同。
:::

批次中的序列很少一样长，较短的用补齐词元填满。**补齐掩码**以同样方式把补齐键的分数设为 $-\infty$，使真实词元绝不让位给补齐。掩码可以相加合并。有一种情形需要小心：若某行被完全掩掉——比如因果层里的一个补齐查询——每个分数都是 $-\infty$，而 $e^{-\infty}/\sum e^{-\infty} = 0/0$ 无定义（NaN）。实现要么永不掩掉位置自己的键，要么显式地把这样的行置零来避免。

## 形状与实现 {#sec-shapes}

整层就是矩阵乘法与 reshape。对 $B$ 条序列的批次：

1. 投影：$XW_Q$、$XW_K$、$XW_V$，各为 $(B, T, d_{\text{model}})$。
2. 沿最后一轴分成头：$(B, T, h, d_k)$，再交换轴到 $(B, h, T, d_k)$，于是每个头是一批独立的矩阵。
3. 分数 $QK^\top/\sqrt{d_k}$：$(B, h, T, T)$；加上掩码；沿最后轴 softmax。
4. 与 $V$ 的加权求和：$(B, h, T, d_k)$。
5. 换回 $(B, T, h, d_k)$，合并最后两轴到 $(B, T, d_{\text{model}})$——即 [[#eq-mha]] 的拼接——再乘以 $W_O$。

```python
import torch

def multi_head_attention(X, W_q, W_k, W_v, W_o, h, causal=True):
    # X: (B, T, d); 所有权重矩阵：(d, d)
    B, T, d = X.shape
    d_k = d // h
    def split(Y):                                   # (B, T, d) -> (B, h, T, d_k)
        return Y.view(B, T, h, d_k).transpose(1, 2)
    Q, K, V = split(X @ W_q), split(X @ W_k), split(X @ W_v)
    S = Q @ K.transpose(-2, -1) / d_k ** 0.5        # (B, h, T, T)
    if causal:
        future = torch.triu(torch.ones(T, T, dtype=torch.bool), diagonal=1)
        S = S.masked_fill(future, float('-inf'))    # 在 softmax 之前掩码
    A = S.softmax(dim=-1)                           # (B, h, T, T)
    O = A @ V                                       # (B, h, T, d_k)
    O = O.transpose(1, 2).reshape(B, T, d)          # 拼接各头
    return O @ W_o                                  # (B, T, d)

torch.manual_seed(0)
B, T, d, h = 2, 6, 16, 4
X = torch.randn(B, T, d)
W_q, W_k, W_v, W_o = (torch.randn(d, d) / d ** 0.5 for _ in range(4))
print(multi_head_attention(X, W_q, W_k, W_v, W_o, h).shape)   # torch.Size([2, 6, 16])
```

::: example GPT-2 small 中的形状 {#ex-shapes}
让 $B = 8$ 条 $T = 1024$ 词元的序列走过 GPT-2 small（$d_{\text{model}} = 768$，$h = 12$）的一个注意力层。给出每个中间形状，以及分数张量的元素数。
::: solution
$X$：$(8, 1024, 768)$。每个投影：$(8, 1024, 768)$；分成头：$(8, 1024, 12, 64)$，转置为 $(8, 12, 1024, 64)$。分数与权重：$(8, 12, 1024, 1024)$，即 $8\cdot12\cdot1024^2 = 100{,}663{,}296$ 个数。加权值：$(8, 12, 1024, 64)$；合并：$(8, 1024, 768)$；过 $W_O$ 后：$(8, 1024, 768)$。每个头，分数张量的元素数是值张量的 $T/d_k = 1024/64 = 16$ 倍，这就是它在长上下文时主宰显存的原因。
:::
:::

最后这点值得给几个数，因为它解释了 [[transformers/attention-complexity]] 中大量的工程。

::: example 分数张量的显存 {#ex-score-memory}
一个 $h = 32$ 个头的模型以 bfloat16（每个数两字节）处理 $B = 8$ 条 $T = 4096$ 词元的批次。若把一层的分数张量真正存出来，它占用多少显存？
::: solution
$B\cdot h\cdot T^2 = 8\cdot32\cdot4096^2 = 4{,}294{,}967{,}296$ 个数，每个 $2$ 字节即 $8{,}589{,}934{,}592$ 字节 $= 8$ GiB——仅为单独一层，还没算反向传播要一并存下的注意力权重。现代内核从不把这个张量真正存出来；[[transformers/attention-complexity]] 说明如何做到。
:::
:::

## 算一算开销 {#sec-cost}

把一个乘加算作两次浮点运算（FLOPs）。$T\times d$ 矩阵乘 $d\times d$ 矩阵花费 $2Td^2$ FLOPs，于是四个投影花费 $8Td^2$。每个头从 $T\times d_k$ 的因子算出 $T\times T$ 分数矩阵，花费 $2T^2d_k$，与 $V$ 的乘积再花同样的；对所有头合计 $4T^2d$。每层每序列，

$$
\text{FLOPs}(\operatorname{MHA}) \approx 8Td^2 + 4T^2d.
$$ {#eq-mha-flops}

按词元计，投影花费恒定的 $8d^2$，而注意力部分花费 $4Td$，随上下文增长。两者在 $T = 2d$ 处相等。有了因果掩码，高效内核可以跳过被掩的那一半分数，但对 $T$ 的增长趋势仍在。

::: widget plot
f: 8*d^2/1e6; 4*d*x/1e6
x: 0, 8192
sliders: d=768:256:4096:128
labels: projections $8d^2$; scores and values $4Td$
caption: 单个多头注意力层每个词元的前向 FLOPs（百万计），随上下文长度 $T$ 增长，模型宽度为 $d$。投影对每个词元花费相同；注意力计算随被注意的词元数线性增长。两条曲线在 $T = 2d$ 处相交——$d = 768$ 时在 $T = 1536$。
:::

::: quiz
某个模型 $d_{\text{model}} = 2048$。一种设计用 $16$ 个大小 $128$ 的头，另一种用 $32$ 个大小 $64$ 的头。它们的注意力层如何比较？
- [x] 参数数量相同，FLOPs 基本相同；区别在于分数如何划分
- [ ] 32 头的层参数多一倍
- [ ] 32 头的层分数矩阵 FLOPs 多一倍
- [ ] 16 头的层无法使用因果掩码
::: solution
由 [[#prop-params]]，两者都有 $4d^2$ 个参数。分数计算每个头花费 $2T^2d_k$，于是 $h\cdot2T^2d_k = 2T^2d$ 两种情况相同，值亦然。变化的是 32 头的层从 $64$ 维比较算出 $32$ 个各自独立的 $T\times T$ 权重矩阵，另一种从 $128$ 维算出 $16$ 个——更多模式，每个来自更低维的视角。掩码对任何头数都适用。
:::
:::

## 各个头在做什么？ {#sec-what}

训练目标里没有任何东西告诉头 $i$ 该注意什么，而不同的头最终做了不同的事。对训练好模型的研究发现：有的头注意前一个或后一个词元；有的头把动词连到它的宾语、或把代词连到它的先行词；还有的头主要注意分隔符或序列起始词元，在没有别的相关时充当"空操作"（Clark et al., 2019；Voita et al., 2019）。在语言模型中，**归纳头**寻找当前词元的更早一次出现并复制它后面跟随的东西，这是许多上下文学习背后的机制（[[interpretability/circuits]]）。

头也是冗余的。Michel、Levy 和 Neubig（2019）在测试时移除了训练好的翻译与 BERT 模型的多数头，准确率损失很小；Voita et al.（2019）发现少数专门的头干了大部分活。一个相关的极限是**低秩瓶颈**：每个头的分数矩阵 $Q_iK_i^\top$ 是 $T\times d_k$ 与 $d_k\times T$ 矩阵的乘积，因此它的秩至多为 $d_k$（Bhojanapalli et al., 2020）。当 $d_k$ 远小于 $T$ 时，单个头无法表达任意的注意力模式——这也是模型变大而头维数却不降到 $64$ 以下的原因之一。

::: warning 头不是带标签的功能模块
"指代消解头"之类的描述只是概括某个头在某些输入上倾向于做什么。头并非为了执行某个命名功能而训练，同一个头常常做好几件事，而功能又经常散布在好几个头和层上。把这些标签当作待检验的假设，如 [[interpretability/causal-interventions]] 所做。
:::

::: history
Vaswani et al.（2017）随 Transformer 引入多头注意力，理由是它让模型能够"在不同位置同时注意来自不同表示子空间的信息"；他们的基座模型用 $8$ 个大小 $64$ 的头，大模型用 $16$ 个。因果掩码随同一篇论文的解码器而来，并成为 GPT（Radford et al., 2018）及此后每一个仅解码器语言模型的基础。关于头学到什么的分析紧随而至：Voita et al.（2019）在翻译模型里发现专门的位置、句法和罕见词头，Clark et al.（2019）研究了 BERT 的头，Michel、Levy 和 Neubig（2019）追问"十六个头真的比一个好吗？"并剪掉了大多数。Bhojanapalli et al.（2020）指出小头的低秩瓶颈，Olsson et al.（2022）把归纳头连到上下文学习。为在推理时省显存，Shazeer（2019）让所有头共享一个键值头（多查询注意力），这一思想被精炼成分组查询注意力（[[transformers/efficient-attention]]）。
:::

::: summary
- 多头注意力并行运行 $h$ 个大小 $d_k = d_{\text{model}}/h$ 的注意力头，拼接它们并作用 $W_O$；无论 $h$ 多少都有 $4d^2$ 个参数。
- 输出是逐头贡献 $\text{head}_i W_O^{(i)}$ 之和，每一份都独立写进模型的表示。
- 因果掩码在 softmax 前给未来位置的分数加 $-\infty$，于是位置 $t$ 只依赖词元 $1, \dots, t$；一次前向传播便并行训练 $T$ 个下一词元预测。
- 一个实现就是三次投影、reshape 到 $(B, h, T, d_k)$、对 $(B, h, T, T)$ 分数作带掩码 softmax、加权求和、reshape 回来、再乘 $W_O$。
- 这一层大约花费 $8Td^2 + 4T^2d$ 个 FLOPs；注意力项在 $T = 2d$ 处超过投影，而分数张量在长上下文时主宰显存。
:::

## 习题

::: exercise 头的大小 {level=1 check="64"}
某个模型 $d_{\text{model}} = 1024$，有 $16$ 个头。头维数 $d_k$ 是多少，$W_Q^{(i)}$ 和 $W_O$ 的形状是什么？
::: solution
$d_k = 1024/16 = 64$。每个 $W_Q^{(i)}$ 是 $1024\times64$；$W_O$ 是 $1024\times1024$（等价地，$16$ 个大小 $64\times1024$ 的行块）。
:::
:::

::: exercise 注意力层的参数 {level=1 check="2359296"}
$d_{\text{model}} = 768$、$12$ 个头的多头注意力层，不含偏置有多少参数？改用 $24$ 个头答案如何变化？
::: solution
由 [[#prop-params]]，$4\cdot768^2 = 2{,}359{,}296$，用 $24$ 个头（大小 $32$）也一样。
:::
:::

::: exercise 允许的对数 {level=1 check="21"}
长度为 $T = 6$ 的因果掩码允许多少个（查询，键）对？这是 $T^2$ 对的多大比例，大 $T$ 时该比例趋于什么？
::: solution
位置 $i$ 可以注意 $i$ 个键，所以总数是 $1 + 2 + \dots + 6 = 21$，占 $36$ 中的 $21/36 = 7/12$。一般地 $\frac{T(T+1)/2}{T^2} = \frac{T+1}{2T}\to\frac12$。
:::
:::

::: exercise 带掩码的 softmax {level=2 check="exp(2)/(exp(1)+exp(0.5)+exp(2))"}
在 [[#ex-masked-row]] 中，精确写出因果掩码下位置 $3$ 分给它自己键的权重。
::: solution
允许的分数是 $(1, 0.5, 2)$，所以键 $3$ 上的权重是 $e^2/(e^1 + e^{0.5} + e^2)\approx 7.389/11.756\approx0.629$。
:::
:::

::: exercise 掩码即重新归一化 {level=2}
设 $\mathbf{z}\in\R^n$，$S\subseteq\{1, \dots, n\}$ 非空。定义 $\mathbf{m}$ 为 $j\in S$ 时 $m_j = 0$，否则 $m_j = -\infty$。证明 $j\notin S$ 时 $\operatorname{softmax}(\mathbf{z} + \mathbf{m})_j = 0$，而 $j\in S$ 时它等于只含分数 $(z_k)_{k\in S}$ 的 softmax。若 $S$ 为空会怎样？
::: solution
$j\notin S$ 时分子为 $e^{z_j - \infty} = 0$。$j\in S$ 时分母为 $\sum_ke^{z_k + m_k} = \sum_{k\in S}e^{z_k}$，因为其余各项消失，于是 $\operatorname{softmax}(\mathbf{z} + \mathbf{m})_j = e^{z_j}/\sum_{k\in S}e^{z_k}$，即 $S$ 上的 softmax。若 $S$ 为空，分母也为 $0$，得 $0/0$：完全掩掉的行的 NaN。
:::
:::

::: exercise 哪一项占主导？ {level=2 check="0.25"}
对一条 $T = 2048$ 词元、$d_{\text{model}} = 4096$ 的序列，计算 [[#eq-mha-flops]] 的投影 FLOPs $8Td^2$ 与注意力 FLOPs $4T^2d$。注意力对投影 FLOPs 之比是多少？
::: solution
$8\cdot2048\cdot4096^2 = 274{,}877{,}906{,}944\approx2.7\times10^{11}$，$4\cdot2048^2\cdot4096 = 68{,}719{,}476{,}736\approx6.9\times10^{10}$。比值为 $\frac{4T^2d}{8Td^2} = \frac{T}{2d} = \frac{2048}{8192} = 0.25$：在这个宽度投影仍占主导，注意力项要到 $T = 8192$ 才追上来。
:::
:::

::: exercise 分数的显存 {level=2 check="8"}
重做 [[#ex-score-memory]]：对 $B = 8$、$h = 32$、$T = 4096$、bfloat16，一层的分数张量占多少吉字节（GiB）？上下文翻倍时它按什么倍数增长？
::: solution
$8\cdot32\cdot4096^2\cdot2$ 字节 $= 2^{33}$ 字节 $= 8$ GiB。$T$ 翻倍使 $T^2$ 乘 $4$：$32$ GiB。
:::
:::

::: exercise 再看两个头 {level=2 check="exp(1/sqrt(2))/(2+exp(1/sqrt(2)))"}
在 [[#ex-two-heads]] 中精确推出 $A^{(1)}$ 的第二行。词元 2 在头 1 中给自己多少权重？
::: solution
在头 1，词元 2 有查询 $(0, 1)$，键为 $(1,0)$、$(0,1)$、$(1,0)$，于是原始分数为 $(0, 1, 0)$，缩放后为 $(0, 1/\sqrt2, 0)$。权重为 $(1, e^{1/\sqrt2}, 1)/(2 + e^{1/\sqrt2})，给自己的权重是 $e^{1/\sqrt2}/(2 + e^{1/\sqrt2})\approx2.028/4.028\approx0.503$。
:::
:::

::: exercise 低秩瓶颈 {level=3}
证明每个头的分数矩阵 $Q_iK_i^\top\in\R^{T\times T}$ 的秩至多为 $d_k$。然后解释为什么当 $d_k < T$ 时，单个头无法产生每一种可能的注意力权重模式——例如为什么它一般无法让 $T\times T$ 分数矩阵等于任意目标矩阵。softmax 能帮忙吗？
::: solution
$Q_i$ 是 $T\times d_k$，$K_i^\top$ 是 $d_k\times T$；$Q_iK_i^\top$ 的列空间落在 $Q_i$ 的列空间中，后者维数至多 $d_k$。所以分数矩阵的秩至多 $d_k$，而秩大于 $d_k$ 的矩阵（例如 $T > d_k$ 时的单位矩阵）不能当分数矩阵。softmax 逐行施加且非线性，所以权重矩阵本身可以有更高的秩；但决定它的分数由 $Q_i$ 与 $K_i$ 的 $2Td_k$ 个元素锁定，而不是 $T^2$ 个自由数。这就是瓶颈：许多极小的头无法表达尖锐、任意的模式，这是 $d_k$ 保持在 $64$ 或更高的原因之一。
:::
:::

::: exercise 校验一个实现 {level=3}
用第二种方式计算同一结果，来校验 [[#sec-shapes]] 的函数 `multi_head_attention`：把投影后的 $Q$、$K$、$V$ 按列切成头，对每个切片调用 `torch.nn.functional.scaled_dot_product_attention(..., is_causal=True)`，拼接输出并乘以 $W_O$。解释为什么两种计算必然一致。
::: solution
```python
import torch, torch.nn.functional as F
# 复用章节里的 X、W_q、W_k、W_v、W_o、h、d 和 multi_head_attention
d_k = d // h
Q, K, V = X @ W_q, X @ W_k, X @ W_v
heads = [F.scaled_dot_product_attention(Q[..., i*d_k:(i+1)*d_k], K[..., i*d_k:(i+1)*d_k],
                                        V[..., i*d_k:(i+1)*d_k], is_causal=True) for i in range(h)]
ref = torch.cat(heads, dim=-1) @ W_o
print(torch.allclose(multi_head_attention(X, W_q, W_k, W_v, W_o, h), ref, atol=1e-5))   # True
```

$XW_Q$ 的第 $i d_k, \dots, (i+1)d_k - 1$ 列恰为 $XW_Q^{(i)}$，正是 `view(B, T, h, d_k)` 为头 $i$ 所选的东西；causal 标志施加同样的掩码；在 $W_O$ 之前拼接各头正是最后那次 `reshape` 所做的。该检验运行后输出 `True`。
:::
:::

::: exercise 补齐与空行 {level=3}
一个批次含一条长度 $3$ 补齐到长度 $5$ 的序列，这一层同时用因果掩码和一个挡住键 $4$、$5$ 的补齐掩码。写出合并后的 $5\times5$ 允许（查询，键）对模式。哪些行被完全掩掉？为什么把补齐放在*左边*（挡住键 $1$、$2$）会给查询 $1$、$2$ 带来麻烦？
::: solution
右补齐时，查询 $i$ 能看见 $j\le i$ 且 $j\le3$ 的键：行 $1$–$3$ 允许 $\{1\}$、$\{1,2\}$、$\{1,2,3\}$，行 $4$ 和 $5$（补齐查询）允许 $\{1,2,3\}$。没有空行；补齐位置的输出直接被损失忽略。

左补齐时，真实词元坐在位置 $3$–$5$，键 $1$、$2$ 被挡。查询 $1$ 只能看见键 $1$（因果），而键 $1$ 是补齐，于是它的行为空，查询 $2$ 亦然：它们的 softmax 是 $0/0$ 并产生 NaN，会蔓延进损失和梯度。因此实现要么让补齐查询看见某种无害的东西，要么在 softmax 之后把这样的行换成零。
:::
:::
