试读句子 *The animal didn't cross the street because it was too tired*（那只动物没有过马路，因为它太累了）。要理解其中的 *it*，读者必须回头去看，断定它指的是 *the animal*（动物）而不是 *the street*（街道）。只改动一个词——改成 *because it was too wide*（因为它太宽了）——答案就翻转了。一个词的意义取决于其他词，有时是相距很远的词，而哪些词重要取决于句子的内容，而不是固定的位置。

循环网络让隐藏状态从一个词传到下一个词来处理这件事，于是关于 *the animal* 的信息要经过七步更新才能到达 *it*。自注意力走的是直接路线：每个位置都从自己的内容出发，计算其他每个位置与自己有多相关，再对那些位置提供的内容取加权平均。任意两个词元之间只隔一步，而且所有位置都是一起处理的。本章从一个想法出发构建这一机制——一种返回平均值而不是单个条目的查表——并解释使它得以奏效的各个细节，其中最重要的就是除以 $\sqrt{d_k}$。

## 软化的字典查找 {#sec-lookup}

Python 字典存储（键，值）对。查询与每个键比较，返回恰好匹配的键所对应的值。注意力从两个方面放松这一做法：键和查询都是向量，用相似度分数比较而不是检验相等；查表也不返回单个值，而是返回所有值的加权平均，权重取决于每个键匹配得有多好。这些权重来自 softmax 函数。

::: definition Softmax {#def-softmax}
对分数向量 $\mathbf{z} = (z_1, \dots, z_n)\in\R^n$，**softmax** 是概率向量

$$
\operatorname{softmax}(\mathbf{z})_i = \frac{e^{z_i}}{\sum_{j=1}^{n} e^{z_j}}, \qquad i = 1, \dots, n.
$$

带**温度** $\tau > 0$ 时，它是 $\operatorname{softmax}(\mathbf{z}/\tau)$。
:::

softmax 把任意实数分数变成和为 $1$ 的正权重，保持它们的顺序，并把差距放大：分数每高一个单位，权重就变成 $e \approx 2.7$ 倍。给所有分数加上同一个常数不改变任何东西，因为因子 $e^c$ 在分子与分母之间约掉了；实现利用这一点，在取指数前先减去 $\max_j z_j$，从而避免上溢。温度控制权重有多果断：当 $\tau\to 0$ 时，softmax 把全部权重放到最大的分数上（硬查表）；当 $\tau\to\infty$ 时，它趋于均匀平均。

::: example 手算一次 softmax {#ex-softmax}
计算 $\operatorname{softmax}(2, 1, 0)$，并对同一组分数取温度 $\tau = 0.5$ 与 $\tau = 2$。
::: solution
$e^2 = 7.389$，$e^1 = 2.718$，$e^0 = 1$，和为 $11.107$，于是

$$
\operatorname{softmax}(2,1,0) = (0.665,\ 0.245,\ 0.090).
$$

$\tau = 0.5$ 时分数变为 $(4, 2, 0)$，权重为 $(0.867, 0.117, 0.016)$：几乎全部权重落在第一个分量上。$\tau = 2$ 时它们变为 $(1, 0.5, 0)$，权重为 $(0.507, 0.307, 0.186)$，接近均匀得多。排序从不改变，改变的只是它的陡峭程度。
:::
:::

## 缩放点积注意力 {#sec-sdpa}

把查询作为矩阵 $Q$ 的行、键作为 $K$ 的行、值作为 $V$ 的行堆叠起来。查询 $i$ 与键 $j$ 的相似度是它们的点积 $\mathbf{q}_i\cdot\mathbf{k}_j$，于是所有相似度一次构成矩阵 $QK^\top$。

::: definition 缩放点积注意力 {#def-attention}
设 $Q\in\R^{n\times d_k}$ 存放 $n$ 个查询，$K\in\R^{m\times d_k}$ 存放 $m$ 个键，$V\in\R^{m\times d_v}$ 存放相应的值。**缩放点积注意力**为

$$
\operatorname{Attention}(Q, K, V) = \operatorname{softmax}\!\Big(\frac{QK^\top}{\sqrt{d_k}}\Big)\,V \in \R^{n\times d_v},
$$ {#eq-attention}

其中 softmax 对每一行分别施加。矩阵 $A = \operatorname{softmax}(QK^\top/\sqrt{d_k})\in\R^{n\times m}$ 称为**注意力矩阵**；它的元素 $A_{ij}$ 是查询 $i$ 分给键 $j$ 的权重。
:::

输出的第 $i$ 行是 $\sum_j A_{ij}\mathbf{v}_j$：值按查询 $i$ 所赋权重的平均。查询与键必须有相同的维数 $d_k$，否则无法比较；值可以取不同的维数 $d_v$，它就是输出维数。缩放因子 $1/\sqrt{d_k}$ 看似细节，实则必不可少；[[#sec-scaling]] 解释原因。

点积 $\mathbf{q}\cdot\mathbf{k} = \lVert\mathbf{q}\rVert\,\lVert\mathbf{k}\rVert\cos\theta$ 当两个向量指向同一方向时很大，垂直时为零，彼此背离时为负。因此查询在键空间中"询问"一个方向，位于该方向上的键回应最强。

::: widget projection
u: 3,1
v: 1,2
caption: 设 $\mathbf{u}$ 是键、$\mathbf{v}$ 是查询。它们的分数 $\mathbf{u}\cdot\mathbf{v}$ 是 $\mathbf{v}$ 在 $\mathbf{u}$ 上投影的长度乘以 $\lVert\mathbf{u}\rVert$。拖动 $\mathbf{v}$ 转一圈：查询沿键的方向时分数最大，垂直时为零，背离时为负。拉长任一向量都会按比例缩放分数——这就是大向量给出尖锐注意力的原因。
:::

## 自注意力 {#sec-self}

在**自注意力**中，查询、键和值都来自同一个序列。每个词元的表示由三个学到的矩阵分别投影三次，进入询问者、广告者和内容三种角色。

::: definition 自注意力 {#def-self-attention}
设 $X\in\R^{T\times d_{\text{model}}}$ 逐行存放 $T$ 个词元的表示。给定学到的矩阵 $W_Q, W_K\in\R^{d_{\text{model}}\times d_k}$ 与 $W_V\in\R^{d_{\text{model}}\times d_v}$，令

$$
Q = XW_Q, \qquad K = XW_K, \qquad V = XW_V,
$$

并输出 $\operatorname{Attention}(Q, K, V)\in\R^{T\times d_v}$。注意力矩阵是 $T\times T$ 的：每个位置注意每个位置，包括它自己。
:::

为什么是三次投影，而不是直接比较词元向量？若 $Q = K = V = X$，词元与它自己的分数 $\lVert\mathbf{x}_i\rVert^2$ 通常最大，于是每个词元几乎只注意自己，而且词元寻找的东西与它包含的东西被绑在一起。分开投影可以让一个代词去搜寻名词（$W_Q$），让名词标榜自己是名词（$W_K$），并让它们传递完全不同的东西，例如它们的含义（$W_V$）。三个矩阵都与网络的其余部分一起由梯度下降学习。

::: example 三个词元的手算 {#ex-three-tokens}
三个词元的查询、键、值为（$d_k = d_v = 2$）

$$
Q = K = \begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}, \qquad V = \begin{pmatrix}1&0\\0&1\\2&2\end{pmatrix}.
$$

计算注意力矩阵和输出。
::: solution
分数为

$$
QK^\top = \begin{pmatrix}1&0&1\\0&1&1\\1&1&2\end{pmatrix}, \qquad \frac{QK^\top}{\sqrt2} = \begin{pmatrix}0.707&0&0.707\\0&0.707&0.707\\0.707&0.707&1.414\end{pmatrix}.
$$

第 1 行：$e^{0.707} = 2.028$，于是权重为 $(2.028, 1, 2.028)/5.056 = (0.401, 0.198, 0.401)$。第 2、3 行同样计算：

$$
A = \begin{pmatrix}0.401&0.198&0.401\\0.198&0.401&0.401\\0.248&0.248&0.504\end{pmatrix}, \qquad AV = \begin{pmatrix}1.203&1.000\\1.000&1.203\\1.255&1.255\end{pmatrix}.
$$

例如输出的第 1 行是 $0.401(1,0) + 0.198(0,1) + 0.401(2,2) = (1.203, 1.000)$。词元 1 忽略词元 2（键与它的查询垂直），但听取词元 3（其键与它的查询重叠）；词元 3 的查询与它自己的键匹配最好，因此给自己的权重最大。$A$ 的每行之和为 $1$。
:::
:::

::: quiz
某个自注意力层里所有 $T$ 个键恰好完全相同。每个位置的输出是什么？
- [ ] 该位置自身的值
- [x] 所有值向量的平均，每个位置都相同
- [ ] 范数最大的那个值向量
- [ ] 取决于查询，它们仍然互不相同
::: solution
若每个键都是同一向量 $\mathbf{k}$，则每一行分数都是常向量 $(\mathbf{q}_i\cdot\mathbf{k}, \dots, \mathbf{q}_i\cdot\mathbf{k})$，而常向量的 softmax 是均匀分布，处处为 $1/T$。因此无论查询是什么，输出的每一行都是 $\frac1T\sum_j\mathbf{v}_j$。查询只有在键互不相同时才分辨得出差别。
:::
:::

## 注意力是加权平均 {#sec-average}

因为每行权重为正且和为 $1$，每个输出都是值向量的**凸组合**：它落在这些值的凸包之内。注意力不能外推也不能放大，只能挑选和混合。这一层在这种混合之外对表示所做的一切，都来自那些投影和随后的前馈层（见 [[transformers/transformer-block]]）。

还有一条性质，它塑造了整个架构的其余部分。[[#def-self-attention]] 中没有一处提到位置 $1, \dots, T$——这一计算把输入当作集合。

::: proposition 自注意力是置换等变的 {#prop-permutation}
设 $P$ 是 $T\times T$ 置换矩阵，于是 $PX$ 以另一个顺序列出 $X$ 的各行。则

$$
\operatorname{SelfAttention}(PX) = P\,\operatorname{SelfAttention}(X).
$$

置换词元只是以同样的方式置换输出，其他一切都不变。
:::

::: proof
投影给出 $(PX)W_Q = PQ$，同理有 $PK$ 和 $PV$。分数变为 $(PQ)(PK)^\top = P\,QK^\top P^\top$：同一个矩阵置换了行与列。逐行 softmax 与置换行可交换（每行独立处理），也与置换每行内部的分量可交换（softmax 对称地对待其输入），所以 $\operatorname{softmax}(P S P^\top/\sqrt{d_k}) = P A P^\top$。于是输出为 $PAP^\top\,PV = PA(P^\top P)V = PAV$，因为 $P^\top P = I$。
:::

::: warning 自注意力不知道词序
由 [[#prop-permutation]]，*dog bites man* 与 *man bites dog* 产生同样的三个输出向量，只是顺序不同。因此必须告诉 Transformer 每个词元在哪里；这正是 [[transformers/positional-encoding]] 中位置信息的职责。忘掉它是从零实现时的经典 bug：模型照样训练，却把文本当作词袋。
:::

softmax 使每个权重依赖于所在行的全部分数：抬高一个键的分数就压低其他每个键的权重。下图展示三个键之间的这种竞争。

::: widget plot
f: exp(x/t)/(exp(x/t)+exp(1/t)+1); exp(1/t)/(exp(x/t)+exp(1/t)+1); 1/(exp(x/t)+exp(1/t)+1)
x: -4, 6
y: 0, 1
sliders: t=1:0.1:5:0.1
labels: key 1 (score $x$); key 2 (score $1$); key 3 (score $0$)
caption: 分数为 $x$、$1$、$0$ 的三个键的注意力权重随 $x$ 的变化，温度为 $t$。三条曲线之和恒为 $1$。调低 $t$，权重逼近对最大分数的硬性选择；调高 $t$，它们被压平趋向简单平均 $1/3$。
:::

## 为什么除以维数的平方根 {#sec-scaling}

假设查询和键的分量表现得像均值为 $0$、方差为 $1$ 的独立随机数——训练开始时大致就是这种情形，此时投影是随机的，其输入经过归一化。

::: proposition 点积的方差 {#prop-variance}
设 $\mathbf{q}, \mathbf{k}\in\R^{d}$ 的分量相互独立，每个均值为 $0$、方差为 $1$。则 $\mathbf{q}\cdot\mathbf{k}$ 的均值为 $0$、方差为 $d$，于是 $\mathbf{q}\cdot\mathbf{k}/\sqrt{d}$ 的均值为 $0$、方差为 $1$。
:::

::: proof
$\mathbf{q}\cdot\mathbf{k} = \sum_{i=1}^{d} q_ik_i$。由独立性 $\E[q_ik_i] = \E[q_i]\E[k_i] = 0$，且 $\Var(q_ik_i) = \E[q_i^2k_i^2] - 0 = \E[q_i^2]\E[k_i^2] = 1$。$d$ 个乘积相互独立，方差相加：$\Var(\mathbf{q}\cdot\mathbf{k}) = d$。除以 $\sqrt d$ 使方差除以 $d$。
:::

因此若不作缩放，$d_k = 64$ 的头的分数标准差约为 $8$，分数之间的差距通常有好几个单位。这为什么糟糕？看看 softmax 对其输入中的微小变化作何反应。

::: proposition softmax 的雅可比 {#prop-softmax-jacobian}
设 $\mathbf{p} = \operatorname{softmax}(\mathbf{z})$。则

$$
\frac{\partial p_i}{\partial z_j} = p_i(\delta_{ij} - p_j), \qquad\text{即}\qquad J = \operatorname{diag}(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top,
$$

其中 $\delta_{ij}$ 当 $i = j$ 时为 $1$，否则为 $0$。
:::

::: proof
写 $p_i = e^{z_i}/S$，其中 $S = \sum_k e^{z_k}$，于是 $\partial S/\partial z_j = e^{z_j}$。由商法则，

$$
\frac{\partial p_i}{\partial z_j} = \frac{\delta_{ij}e^{z_i}S - e^{z_i}e^{z_j}}{S^2} = p_i\delta_{ij} - p_ip_j.
$$
:::

若 $\mathbf{p}$ 接近 one-hot——一个分量接近 $1$，其余接近 $0$——则 $J$ 的每个元素都接近 $0$：对角线上 $p_i(1 - p_i)\approx 0$，非对角 $p_ip_j\approx 0$。softmax **饱和**了，几乎没有任何梯度穿过它流回查询和键，于是它们停止学习。缩放因子 $1/\sqrt{d_k}$ 使分数无论头的维数如何都保持单位量级的散布，从而让 softmax 从它的灵敏区间起步。

::: example 饱和的数值 {#ex-saturation}
$d_k = 64$ 的头对某个查询产生原始分数 $(8, 0, -8)$——两边各一个标准差量级的典型散布。比较有缩放因子 $1/\sqrt{64} = 1/8$ 与没有它时的 softmax 及其最大雅可比元素。
::: solution
未缩放：$\operatorname{softmax}(8, 0, -8) = (0.99966, 0.00034, 0.0000001)$。$J$ 的最大元素是 $p_1(1 - p_1)\approx 0.00034$。

缩放后：分数变为 $(1, 0, -1)$，权重为 $(0.665, 0.245, 0.090)$，最大雅可比元素为 $p_1(1-p_1) = 0.223$——大了约 $660$ 倍。未缩放时，能到达查询和键投影的梯度小了几百倍，训练恰恰在最需要学会该注意哪些词元的地方停滞。
:::
:::

同样的道理也解释了训练好的模型采样文本时 softmax 温度为何重要（见 [[inference/decoding-sampling]]）：分数除以小数字使分布变尖，除以大数字使它变平。

## 计算自注意力 {#sec-code}

在代码里，自注意力就是三次矩阵乘法、一次 softmax 和再一次乘法。真正的实现一次处理 $B$ 条序列的批次，张量形状为 $(B, T, d)$。

```python
import numpy as np

def softmax(z, axis=-1):
    z = z - z.max(axis=axis, keepdims=True)      # 平移以保证数值安全
    e = np.exp(z)
    return e / e.sum(axis=axis, keepdims=True)

def self_attention(X, W_q, W_k, W_v):
    # X: (B, T, d_model); W_q, W_k: (d_model, d_k); W_v: (d_model, d_v)
    Q = X @ W_q                                  # (B, T, d_k)
    K = X @ W_k                                  # (B, T, d_k)
    V = X @ W_v                                  # (B, T, d_v)
    d_k = Q.shape[-1]
    S = Q @ K.transpose(0, 2, 1) / np.sqrt(d_k)  # (B, T, T) 分数
    A = softmax(S, axis=-1)                      # (B, T, T) 每行和为 1
    return A @ V, A                              # (B, T, d_v), (B, T, T)

rng = np.random.default_rng(0)
B, T, d_model, d_k = 2, 5, 16, 4
X = rng.standard_normal((B, T, d_model))
W_q, W_k, W_v = (rng.standard_normal((d_model, d_k)) / np.sqrt(d_model) for _ in range(3))
out, A = self_attention(X, W_q, W_k, W_v)
print(out.shape, A.shape, np.allclose(A.sum(-1), 1))   # (2, 5, 4) (2, 5, 5) True
```

随机初始化中按 $1/\sqrt{d_{\text{model}}}$ 的缩放使 $Q$、$K$、$V$ 的元素保持单位量级，这正是 [[#prop-variance]] 背后的假设。深度学习库为最后三行提供了融合函数——在 PyTorch 中是 `torch.nn.functional.scaled_dot_product_attention`——它以更快的速度和更少的内存算出同样结果；[[transformers/attention-complexity]] 解释其原理。

::: example 现实规模层的尺寸 {#ex-sizes}
GPT-2 small 使用 $d_{\text{model}} = 768$，头的维数 $d_k = d_v = 64$，上下文长达 $T = 1024$ 个词元。对一个头、一条满长序列，给出 $W_Q$、$Q$ 和 $A$ 的形状、$A$ 的元素个数，以及 $QK^\top$ 所需的乘加运算次数。
::: solution
$W_Q$ 是 $768\times64$（即 $49{,}152$ 个参数），$Q$ 是 $1024\times 64$，$A$ 是 $1024\times1024$，有 $1{,}048{,}576$ 个元素。$QK^\top$ 的每个元素是长度 $64$ 的点积，所以 $QK^\top$ 花费 $1024\cdot1024\cdot64 = 67{,}108{,}864$ 次乘加。值的乘积 $AV$ 花费同样多。两者都按 $T^2$ 增长：上下文加倍使它们变为四倍，而投影只随 $T$ 线性增长。
:::
:::

## 注意力为何取代了循环 {#sec-why}

采纳自注意力不是因为它更便宜——对长序列并不是——而是因为信息的传播方式。原始 Transformer 论文比较了在长度 $T$、宽度 $d$ 的序列上构建一个层的三种做法：

| 层类型 | 每层计算量 | 顺序步数 | 两个位置之间的最长路径 |
|---|---|---|---|
| 自注意力 | $O(T^2 d)$ | $O(1)$ | $O(1)$ |
| 循环 | $O(T d^2)$ | $O(T)$ | $O(T)$ |
| 卷积，宽度 $w$ | $O(w\,T d^2)$ | $O(1)$ | $O(\log_w T)$ |

循环层必须一个接一个地处理词元，因此训练无法摊到一条序列的各个位置上，相距很远的词元之间的依赖必须经多次更新传递，梯度正是在这里消失。自注意力把每对位置直接相连，全部用矩阵乘法一次算完，而 GPU 执行矩阵乘法非常高效。代价是 $T^2$ 项，即 [[transformers/attention-complexity]] 与 [[transformers/efficient-attention]] 的主题。

::: warning 注意力权重不是解释
把注意力矩阵读成预测的原因很诱人：*模型注意了你输入里的 "animal" 这个词，所以这就是它把 "it" 解开的原因*。Jain 和 Wallace（2019）表明，很不相同的注意力模式常常产生同样的预测；Wiegreffe 和 Pinter（2019）则表明这个问题需要仔细的实验而不是查看。注意力权重只说明值在某一层某个头里如何被混合；输出还取决于值本身、其他头以及之后的每一层。把注意力图当线索使用，并用 [[interpretability/causal-interventions]] 的干预来检验因果论断。
:::

::: history
注意力作为翻译模型回看输入的手段进入神经网络。Bahdanau、Cho 和 Bengio（2014）用一个小网络给每个编码器状态对解码器状态打分（"加法"注意力），Luong、Pham 和 Manning（2015）则用点积（"乘法"注意力）。同一时期，记忆增强网络——Graves、Wayne 和 Danihelka（2014）的神经图灵机（Neural Turing Machine）以及 Weston、Chopra 和 Bordes（2014）的记忆网络——按内容寻址从内存读取，而键值记忆网络（Miller et al., 2016）把用于匹配的向量与返回的向量分开。序列对自身作注意力（"内部注意力"，intra-attention）被 Cheng、Dong 和 Lapata（2016）、Parikh et al.（2016）与 Lin et al.（2017）用于阅读理解与句子表示。Vaswani et al.（2017）把这些线索汇成缩放点积自注意力，带着 [[#prop-variance]] 的论证引入了 $1/\sqrt{d_k}$ 因子，并且只用注意力造出了 Transformer。
:::

::: summary
- 注意力是软字典查找：每个查询给每个键打分，softmax 把分数变成权重，输出是值的加权平均。
- $\operatorname{Attention}(Q, K, V) = \operatorname{softmax}(QK^\top/\sqrt{d_k})\,V$；在自注意力中 $Q$、$K$、$V$ 是同一序列的三个学习投影，注意力矩阵是 $T\times T$ 的，每行和为 $1$。
- 每个输出都是值的凸组合，且自注意力是置换等变的：不提供位置信息，它就无视词序。
- $d_k$ 维向量的点积按 $\sqrt{d_k}$ 增长；除以 $\sqrt{d_k}$ 使 softmax 不进入其雅可比 $\operatorname{diag}(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$ 消失的饱和区。
- 自注意力一步之内连接任意两个位置，并沿序列并行运行，代价按 $T^2$ 增长。
:::

## 习题

::: exercise 三个分数的 softmax {level=1 check="exp(2)/(exp(2)+exp(1)+1)"}
用 $e$ 精确写出 $\operatorname{softmax}(2, 1, 0)$。它的第一个分量是什么？
::: solution
$\operatorname{softmax}(2,1,0) = \dfrac{(e^2, e, 1)}{e^2 + e + 1}$。第一个分量是 $e^2/(e^2 + e + 1) \approx 7.389/11.107 \approx 0.665$。
:::
:::

::: exercise 数一数元素 {level=1 check="100"}
某个自注意力层收到 $T = 10$ 个词元，$d_{\text{model}} = 512$，使用 $d_k = d_v = 64$。给出 $W_Q$、$Q$、$K^\top$、$A$ 和输出的形状。注意力矩阵有多少个元素？
::: solution
$W_Q$ 是 $512\times64$，$Q$ 是 $10\times64$，$K^\top$ 是 $64\times10$，$A = \operatorname{softmax}(QK^\top/8)$ 是 $10\times10$，输出 $AV$ 是 $10\times64$。注意力矩阵有 $10\cdot10 = 100$ 个元素——每对有序位置各一个。
:::
:::

::: exercise 平移分数 {level=1}
证明对每个实数 $c$ 有 $\operatorname{softmax}(\mathbf{z} + c\mathbf{1}) = \operatorname{softmax}(\mathbf{z})$，并解释为什么实现要在取指数前减去 $\max_j z_j$。若用 32 位浮点数朴素地计算 $\operatorname{softmax}(100, 101)$ 会发生什么？
::: solution
$e^{z_i + c}/\sum_j e^{z_j + c} = e^ce^{z_i}/(e^c\sum_je^{z_j}) = e^{z_i}/\sum_je^{z_j}$。减去最大值使每个指数 $\le 0$，于是没有 $e^{z}$ 会上溢，而最大项恰为 $1$。若朴素计算，$e^{100}\approx 2.7\times10^{43}$ 已超过 32 位浮点数的最大值（约 $3.4\times10^{38}$），两个指数都成了无穷大，结果是 $\infty/\infty$，即 NaN。平移后输入是 $(-1, 0)$，答案是 $(0.269, 0.731)$。
:::
:::

::: exercise 原始分数的散布 {level=1 check="4"}
查询和键有 $d_k = 16$ 个独立分量，均值 $0$、方差 $1$。原始分数 $\mathbf{q}\cdot\mathbf{k}$ 的标准差是多少？缩放后的分数呢？
::: solution
由 [[#prop-variance]]，原始分数的方差为 $16$，标准差 $\sqrt{16} = 4$；缩放分数 $\mathbf{q}\cdot\mathbf{k}/4$ 的标准差为 $1$。
:::
:::

::: exercise 键全相同时 {level=2 check="2"}
在有三个词元的自注意力层里，每个键都是同一向量，值为 $(2, 0)$、$(4, 2)$ 和 $(0, 4)$。求每个位置的输出。它的第一个分量是什么？
::: solution
相同的键使每个位置的分数行都是常向量，于是所有权重都是 $1/3$（如前面的小题）。每个输出都等于值的平均，$\frac13\big((2,0) + (4,2) + (0,4)\big) = (2, 2)$。无论查询是什么，它的第一个分量都是 $2$。
:::
:::

::: exercise 一个查询，两个键 {level=2 check="10*exp(sqrt(2))/(1+exp(sqrt(2)))"}
查询 $\mathbf{q} = (2, 0)$ 注意键 $\mathbf{k}_1 = (1, 0)$ 与 $\mathbf{k}_2 = (0, 1)$，值分别为 $\mathbf{v}_1 = (10, 0)$ 与 $\mathbf{v}_2 = (0, 10)$；这里 $d_k = 2$。计算注意力权重和输出。输出的第一个分量是什么？
::: solution
原始分数 $(2, 0)$，除以 $\sqrt2$ 缩放：$(\sqrt2, 0)$。权重为 $\big(e^{\sqrt2}, 1\big)/(e^{\sqrt2} + 1) = (0.804, 0.196)$，于是输出为 $0.804(10, 0) + 0.196(0, 10) = (8.04, 1.96)$。第一个分量是 $10e^{\sqrt2}/(1 + e^{\sqrt2})\approx 8.04$。
:::
:::

::: exercise 温度的极限 {level=2}
设 $\mathbf{z}\in\R^n$ 有唯一的最大分量 $z_m$。证明 $\tau\to0^+$ 时 $\operatorname{softmax}(\mathbf{z}/\tau)$ 趋于 one-hot 向量 $\mathbf{e}_m$，而 $\tau\to\infty$ 时趋于均匀向量 $(1/n, \dots, 1/n)$。这两个极限对注意力意味着什么？
::: solution
分子分母同除以 $e^{z_m/\tau}$：$p_i = e^{(z_i - z_m)/\tau}/\sum_je^{(z_j - z_m)/\tau}$。对 $i\ne m$，$z_i - z_m < 0$，故 $\tau\to0^+$ 时 $e^{(z_i - z_m)/\tau}\to0$，而 $j = m$ 的项为 $1$；于是 $p_m\to1$ 且 $p_i\to0$。$\tau\to\infty$ 时每个指数趋于 $0$，每项趋于 $1$，$p_i\to1/n$。对注意力而言，$\tau\to0$ 是返回最匹配键的值的硬查表，$\tau\to\infty$ 则忽略查询、平均所有值。学到的注意力处在两者之间，缩放因子 $1/\sqrt{d_k}$ 使它从中间起步。
:::
:::

::: exercise 用矩阵验证等变性 {level=2}
在 [[#ex-three-tokens]] 的例子上验证 [[#prop-permutation]]：交换词元 1 和 2（于是 $P$ 交换前两行），重新计算注意力矩阵，确认它等于 $PAP^\top$，且输出是 [[#ex-three-tokens]] 的输出交换第 1、2 行的结果。
::: solution
交换后 $Q = K = \begin{pmatrix}0&1\\1&0\\1&1\end{pmatrix}$，$V = \begin{pmatrix}0&1\\1&0\\2&2\end{pmatrix}$。分数为 $\begin{pmatrix}1&0&1\\0&1&1\\1&1&2\end{pmatrix}$——巧合地是同一个模式，因为前两个词元地位对称——于是

$$
A' = \begin{pmatrix}0.401&0.198&0.401\\0.198&0.401&0.401\\0.248&0.248&0.504\end{pmatrix} = PAP^\top,
$$

$A$ 在前两行两列的对称性也印证了这一点。输出为 $A'V' = \begin{pmatrix}1.000&1.203\\1.203&1.000\\1.255&1.255\end{pmatrix}$，正是 $AV$ 交换前两行的结果。这一层丝毫没有察觉词元被挪动了。
:::
:::

::: exercise softmax 的雅可比 {level=3}
利用 [[#prop-softmax-jacobian]] 证明：(a) $J$ 的每一行和为 $0$，并解释原因；(b) 对角元素满足 $0 < J_{ii}\le\frac14$；(c) $J$ 对称且半正定。关于对所有键的分数同加一个量的平移，(a) 对梯度说了什么？
::: solution
(a) $\sum_j J_{ij} = p_i\sum_j(\delta_{ij} - p_j) = p_i(1 - 1) = 0$。等价地 $J\mathbf{1} = \mathbf{0}$：给每个分数同加一个量不改变任何东西（习题 3），所以沿方向 $\mathbf{1}$ 的导数为零。

(b) $J_{ii} = p_i(1 - p_i)$，其中 $0 < p_i < 1$，而 $x(1 - x)\le\frac14$，当 $x = \frac12$ 时取等。

(c) $J = \operatorname{diag}(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$ 对称。对任意 $\mathbf{u}$，$\mathbf{u}^\top J\mathbf{u} = \sum_ip_iu_i^2 - \big(\sum_ip_iu_i\big)^2$，它是 $u$ 在分布 $\mathbf{p}$ 下的方差，因而 $\ge0$。

所以穿过 softmax 回传的梯度永远不会把所有分数一起平移，只改变它们的差；而当 $\mathbf{p}$ 接近 one-hot 时，任意 $\mathbf{u}$ 在 $\mathbf{p}$ 下的方差接近 $0$，这就是 [[#ex-saturation]] 的饱和。
:::
:::

::: exercise 注意力作为核平滑 {level=3}
把点积分数换成高斯相似度，$A_{ij}\propto\exp\big(-\lVert\mathbf{q}_i - \mathbf{k}_j\rVert^2/2\big)$。证明

$$
\operatorname{softmax}_j\Big(-\tfrac12\lVert\mathbf{q}_i - \mathbf{k}_j\rVert^2\Big) = \operatorname{softmax}_j\Big(\mathbf{q}_i\cdot\mathbf{k}_j - \tfrac12\lVert\mathbf{k}_j\rVert^2\Big),
$$

并推出当所有键有相同的范数时，高斯注意力与点积注意力重合。（这就是统计学中的 Nadaraya–Watson 核回归：输出是值的局部加权平均。）
::: solution
展开 $-\frac12\lVert\mathbf{q}_i - \mathbf{k}_j\rVert^2 = -\frac12\lVert\mathbf{q}_i\rVert^2 + \mathbf{q}_i\cdot\mathbf{k}_j - \frac12\lVert\mathbf{k}_j\rVert^2$。第一项不依赖 $j$，是第 $i$ 行的常数平移，在 softmax 中约去（习题 3）。若所有 $\lVert\mathbf{k}_j\rVert$ 相等，末项也与 $j$ 无关而同样约去，剩下 $\operatorname{softmax}_j(\mathbf{q}_i\cdot\mathbf{k}_j)$。因此注意力可以被读作一个平滑器：它平均离查询最近的键的值，而由投影来学习"近"意味着什么。
:::
:::

::: exercise 批量实现 {level=3}
用 `torch.einsum` 把 [[#sec-code]] 中的 `self_attention` 改写成作用于 PyTorch 张量的形式，并在形状 $(B, T, d_k) = (2, 5, 4)$ 的随机输入上数值检验它与 `torch.nn.functional.scaled_dot_product_attention(Q, K, V)` 一致。
::: solution
```python
import torch, torch.nn.functional as F

def attention(Q, K, V):
    # Q, K: (B, T, d_k); V: (B, T, d_v)
    S = torch.einsum('btd,bsd->bts', Q, K) / Q.shape[-1] ** 0.5   # (B, T, T)
    A = S.softmax(dim=-1)                                         # 每行和为 1
    return torch.einsum('bts,bsd->btd', A, V)                     # (B, T, d_v)

torch.manual_seed(0)
Q, K, V = (torch.randn(2, 5, 4) for _ in range(3))
print(torch.allclose(attention(Q, K, V), F.scaled_dot_product_attention(Q, K, V), atol=1e-6))  # True
```

einsum `'btd,bsd->bts'` 对每个批次 $b$、查询位置 $t$、键位置 $s$ 收缩掉特征下标 $d$，这恰好是每条序列的 $QK^\top$；第二个 einsum 是值的加权和。库函数默认使用同样的 $1/\sqrt{d_k}$ 缩放。
:::
:::
