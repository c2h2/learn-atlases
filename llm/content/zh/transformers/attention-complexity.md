把 Transformer 输入的长度加倍，除一处之外每一层的工作量都随之加倍：注意力的开销会变为四倍。对早期模型的短序列这几乎无关紧要，但如今语言模型要阅读文档、代码库和动辄数万、数十万词元的对话，而 $T^2$ 项决定了什么是可行的。开销有两种形式。一是算术——浮点运算，即 FLOPs；二是访存：每个头的注意力矩阵有 $T^2$ 个元素，把它搬进搬出 GPU 主存的时间可能比计算它本身还长。

本章两种都要算。它导出注意力何时开始主导模型的计算量，引入能判断一次计算究竟受算术还是受内存带宽限制的**屋顶线模型（roofline model）**，并展示 **FlashAttention** 如何在不存储注意力矩阵的情况下算出与标准注意力完全相同的结果——把矩阵切成小块，并即时归一化 softmax。

## FLOPs 计数 {#sec-flops}

由 [[transformers/transformer-block#prop-block-params]]，一个块约有 $12d^2$ 个权重，前向传播中每个权重每词元花费 $2$ FLOPs。注意力分数与值的加权和每条序列另加 $4T^2d$，即每词元 $4Td$（[[transformers/multi-head-attention#eq-mha-flops]]）。

::: proposition 注意力何时占主导 {#prop-crossover}
在宽度为 $d$、前馈宽度为 $4d$（或 SwiGLU 取 $\tfrac83d$）的 Transformer 块的前向传播中，处理长度为 $T$ 词元的序列时，注意力分数与加权值的 FLOPs 除以所有权值矩阵的 FLOPs 为

$$
\frac{4T^2d}{24Td^2} = \frac{T}{6d}.
$$

当 $T > 6d$ 时，注意力的算术开销超过块中其余部分之和。
:::

::: proof
权重矩阵每词元花费 $2\cdot12d^2 = 24d^2$ FLOPs，整条序列即 $24Td^2$。分数 $QK^\top$ 在所有头上合计花费 $2T^2d$，与 $V$ 的乘积同样多，共 $4T^2d$。两者之比为 $4T^2d/(24Td^2) = T/(6d)$。
:::

对 $d = 4096$ 的模型，拐点是 $T = 24{,}576$ 个词元；对 GPT-2 small（$d = 768$）是 $4608$。拐点以下权重占主导，注意力只是不大的开销；远高于拐点时，注意力成了大头。因果掩码省掉一半有用的分数计算，高效的核会跳过被掩掉的那一半，于是拐点移到约 $12d$——但并不改变平方增长。

::: widget plot
f: 24*d^2/1e9; 4*d*x/1e9
x: 0, 100000
sliders: d=4096:768:8192:256
labels: weight matrices $24d^2$; attention $4Td$
caption: 宽度为 $d$ 的单个 Transformer 块，每词元前向 FLOPs（以十亿计）随上下文长度 $T$ 的变化。权重矩阵的开销对每个词元都相同；注意力的开销随被注意的词元数增长。两条线在 $T = 6d$ 处相交——$d = 4096$ 时是 $24{,}576$ 个词元。
:::

::: example 拐点在哪里 {#ex-crossover}
对 $d = 4096$、$32$ 层的模型，计算 $T = 8192$ 时每词元权重矩阵与注意力的前向 FLOPs，以及这一长度下单条序列的注意力总 FLOPs。若峰值算力为 $989$ TFLOP/s，这些计算各需多久？
::: solution
每词元每层：权重 $24d^2 = 24\cdot4096^2\approx4.03\times10^8$，注意力 $4Td = 4\cdot8192\cdot4096\approx1.34\times10^8$——是权重开销的三分之一，与 $T/(6d) = 1/3$ 的预测一致。对 $32$ 层上的整条序列，注意力花费 $4T^2d\cdot32 = 4\cdot8192^2\cdot4096\cdot32\approx3.5\times10^{13}$ FLOPs，在 $989\times10^{12}$ FLOP/s 下若硬件全速运行需 $0.036$ 秒。真实的注意力核只能达到峰值的一部分，本章余下部分解释原因。
:::
:::

## 访存量计数 {#sec-memory}

算术只是一半的故事。要计算 softmax，直白的实现会先算出分数矩阵 $S = QK^\top/\sqrt{d_k}$ 写入内存，再读回来算出 $P = \operatorname{softmax}(S)$ 并写入，再读入 $P$ 来计算 $PV$。训练时还要为反向传播保留 $P$。

::: example 注意力矩阵的大小 {#ex-memory}
一个 $h = 32$ 个头的模型处理一条 $T = 32{,}768$ 词元的序列。一层注意力矩阵在 bfloat16（每元素两字节）下占多少内存？与一块 $80$ GB GPU 的显存相比如何？
::: solution
$h\cdot T^2 = 32\cdot32{,}768^2 = 3.4\times10^{10}$ 个元素，每元素两字节即 $68{,}719{,}476{,}736$ 字节 $= 64$ GiB——仅一条序列的一层。要像朴素的反向传播那样为每一层都存上它，无异于天方夜谭。即便只存一层，这个矩阵也会占满大半个 GPU——这正是若不借助从不物化它的实现，长上下文训练就无从谈起的原因。
:::
:::

即便矩阵放得下，把它写出再读回也要花时间。GPU 有一小块极快的片上存储（SRAM：寄存器与共享内存，NVIDIA A100 上每个流式多处理器约 $192$ KB，总共约 $20$ MB），以及大而慢得多的主存（HBM：A100 上 $40$–$80$ GB）。算术只对 SRAM 中的数据发生；别的一切都必须先搬进 SRAM，结果再搬回去。

::: definition 算术强度 {#def-intensity}
一次计算的**算术强度**是它在主存与处理器之间每搬运一字节所执行的浮点运算数：

$$
I = \frac{\text{FLOPs}}{\text{读写的字节数}}.
$$
:::

::: definition 屋顶线模型 {#def-roofline}
峰值算术吞吐为 $\pi$（FLOP/s）、内存带宽为 $\beta$（字节/秒）的处理器执行强度为 $I$ 的计算时，速率至多为

$$
\text{可达吞吐} = \min(\pi,\ \beta I).
$$

强度 $I < \pi/\beta$ 的计算是**访存受限**的：它们在等数据。$I > \pi/\beta$ 的是**计算受限**的。值 $\pi/\beta$ 称为**脊点**。
:::

按 NVIDIA 公布的数据，A100（80 GB）稠密 bfloat16 算术的 $\pi = 312$ TFLOP/s、$\beta = 2.04$ TB/s，脊点约为每字节 $153$ FLOPs；H100 SXM 为 $989$ TFLOP/s 与 $3.35$ TB/s，脊点约为 $295$。每一代处理器的脊点都在*升高*：算术变便宜的速度快于内存带宽的增长，于是越来越多的计算变成访存受限。

::: widget plot
f: min(989, 3.35x); min(312, 2.04x)
x: 0, 500
y: 0, 1050
labels: H100 SXM (989 TFLOP/s, 3.35 TB/s); A100 80 GB (312 TFLOP/s, 2.04 TB/s)
points: 1.25, 4.2; 120, 402
vlines: 153; 295
caption: 两款 GPU 的屋顶线：可达 TFLOP/s 随算术强度（每字节 FLOPs）的变化。脊点（虚线）以左，计算受内存带宽限制；以右受算术限制。标出的两个点是 H100 上的逐元素 softmax（强度约 $1.25$），以及 $T = 4096$、$d_k = 128$ 下单个头的分数乘积 $QK^\top$（约 $120$）；一个大的方阵乘积强度约 $1365$，远在平坦段的右侧。
:::

::: example 注意力中的算术强度 {#ex-intensity}
以 bfloat16 计算下列各量的算术强度：(a) 一个头 $T = 4096$、$d_k = 128$ 的分数乘积 $S = QK^\top$（$S$ 写入内存）；(b) 读入 $S$、写出 $P$ 的按行 softmax；(c) 两个 $4096\times4096$ 矩阵的乘积。哪些在 H100 上是访存受限的？
::: solution
(a) FLOPs $2T^2d_k = 2\cdot4096^2\cdot128\approx4.29\times10^9$。字节：读 $Q$ 与 $K$ 共 $2\cdot4096\cdot128\cdot2\approx2.1\times10^6$，写 $S$ 需 $4096^2\cdot2\approx3.36\times10^7$。强度 $\approx4.29\times10^9/3.57\times10^7\approx120$ FLOPs/字节——低于 H100 的脊点 $295$，因为写出大输出的开销占主导。

(b) softmax 每个元素大约做五次运算（减去最大值、取指数、求和、相除，加上找最大值），而每元素读写共四字节：约 $5/4\approx1.25$ FLOPs/字节，深度访存受限。

(c) $2\cdot4096^3\approx1.37\times10^{11}$ FLOPs，字节数 $3\cdot4096^2\cdot2\approx10^8$：约 $1365$ FLOPs/字节，稳稳的计算受限。

于是，注意力矩阵让标准注意力里连矩阵乘法都成了访存受限，softmax 更是远甚。只有大矩阵乘法——Transformer 的权重矩阵——才能让算术单元保持忙碌。
:::
:::

## FlashAttention {#sec-flash}

出路是永远不把 $S$ 或 $P$ 写进主存。把键和值切成小到足以放进 SRAM 的块，逐块处理、边处理边累加输出。障碍在 softmax：一个键的权重取决于对*所有*键求和的 $\sum_j e^{s_j}$，在最后一块被看到之前它并不已知。解决方案是**在线 softmax**（Milakov 与 Gimelshein，2018）：维护滚动统计量，一旦出现更大的分数就修正先前的部分结果。

::: proposition 在线 softmax {#prop-online}
设一行分数分成若干块 $\mathbf{s}^{(1)}, \mathbf{s}^{(2)}, \dots$，对应的值分成 $V^{(1)}, V^{(2)}, \dots$。从 $m = -\infty$、$\ell = 0$、$\mathbf{o} = \mathbf{0}$ 开始，对每块 $b$ 作更新

$$
\begin{aligned}
m' &= \max\big(m,\ \max_j s^{(b)}_j\big), \\
\ell' &= \ell\,e^{m - m'} + \textstyle\sum_j e^{s^{(b)}_j - m'}, \\
\mathbf{o}' &= \mathbf{o}\,e^{m - m'} + \textstyle\sum_j e^{s^{(b)}_j - m'}\,\mathbf{v}^{(b)}_j.
\end{aligned}
$$

最后一块处理完后，$m = \max_js_j$，$\ell = \sum_je^{s_j - m}$，而 $\mathbf{o}/\ell = \sum_j\operatorname{softmax}(\mathbf{s})_j\mathbf{v}_j$，正是精确的注意力输出。
:::

::: proof
用归纳法证明：处理完第 $1, \dots, b$ 块后，$m$ 是迄今的最大分数，$\ell = \sum e^{s_j - m}$，$\mathbf{o} = \sum e^{s_j - m}\mathbf{v}_j$，其中和式跑过迄今见到的全部分数。初始时两个和都为空。设第 $b$ 块之前断言成立。新最大值为 $m'$。把旧和乘以 $e^{m - m'}$ 就把每一项 $e^{s_j - m}$ 变成 $e^{s_j - m'}$，而新块贡献的项本就以 $m'$ 为基准；于是 $\ell'$ 与 $\mathbf{o}'$ 是迄今全部分数关于 $m'$ 的和。最后，$\mathbf{o}/\ell = \sum_je^{s_j - m}\mathbf{v}_j/\sum_je^{s_j - m}$，因子 $e^{-m}$ 相消，得到 softmax 加权平均。（当 $m = -\infty$ 时因子 $e^{m - m'}$ 为 $0$，正好丢弃空和。）
:::

::: example 手工执行一次在线 softmax {#ex-online}
一行分数 $(1, 3, 2, 0)$ 分两块到达：$(1, 3)$ 与 $(2, 0)$。跟踪 $m$ 与 $\ell$，并用直接求和 $\sum_je^{s_j - \max s}$ 验证 $\ell$。
::: solution
块 1：$m = 3$，$\ell = e^{1-3} + e^{3-3} = 0.1353 + 1 = 1.1353$。块 2：$m' = \max(3, 2) = 3$，所以旧和乘以 $e^0 = 1$，$\ell' = 1.1353 + e^{2-3} + e^{0-3} = 1.1353 + 0.3679 + 0.0498 = 1.5530$。直接计算：$e^{-2} + e^0 + e^{-1} + e^{-3} = 1.5530$。若两块换了顺序，块 1 给出 $m = 2$，$\ell = 1 + e^{-2} = 1.1353$；接着块 2 把最大值抬到 $3$，把旧和按 $e^{2-3} = 0.3679$ 重缩放为 $0.4177$，再加上 $e^{1-3} + e^0 = 1.1353$，结果又是 $1.5530$。
:::
:::

FlashAttention（Dao et al., 2022）把在线 softmax 与分块结合起来。对每个放在 SRAM 中的查询块，它让键值块流过 SRAM，算出这一块的分数，更新 $m$、$\ell$ 与输出累加器，然后丢弃这一块。最终输出、以及每个查询行的 $m$ 与 $\ell$ 两个数，是唯一写回主存的东西。

::: algorithm FlashAttention 前向传播（单个头） {#alg-flash}
1. 把 $Q$ 切成行块 $Q_i$，把 $K$、$V$ 切成行块 $K_j$、$V_j$，块大小选到能让几个块放进 SRAM。
2. 对每个查询块 $Q_i$：载入 SRAM，并置 $\mathbf{m} = -\infty$、$\boldsymbol\ell = 0$、$O_i = 0$（每个查询一个元素或一行）。
3. 对每个键值块 $j$：载入 $K_j$、$V_j$；计算块分数 $S_{ij} = Q_iK_j^\top/\sqrt{d_k}$（必要时施加因果掩码，并跳过全被掩掉的块）；按 [[#prop-online]] 更新 $\mathbf{m}$、$\boldsymbol\ell$ 与 $O_i$。
4. 把 $O_i/\boldsymbol\ell$ 以及统计量 $\mathbf{m}$、$\boldsymbol\ell$ 写回主存。
:::

在 NumPy 里，把各块当作普通的数组切片，这个算法只要十几行，并且与标准注意力在舍入误差内一致：

```python
import numpy as np

def attention(Q, K, V):                                  # 标准实现：物化 S 和 P
    S = Q @ K.T / np.sqrt(Q.shape[1])                    # (T, T)
    P = np.exp(S - S.max(1, keepdims=True))
    return (P / P.sum(1, keepdims=True)) @ V             # (T, d_v)

def tiled_attention(Q, K, V, block=4):                   # 从不构造完整的 (T, T) 矩阵
    T, d = Q.shape
    O = np.zeros((T, V.shape[1]))                        # 输出累加器 (T, d_v)
    m = np.full(T, -np.inf)                              # 逐行滚动最大值 (T,)
    l = np.zeros(T)                                      # 逐行滚动和 (T,)
    for j in range(0, K.shape[0], block):
        S = Q @ K[j:j+block].T / np.sqrt(d)              # 一块分数 (T, block)
        m_new = np.maximum(m, S.max(1))
        P = np.exp(S - m_new[:, None])                   # (T, block)
        scale = np.exp(m - m_new)                        # 修正旧的统计量
        l = l * scale + P.sum(1)
        O = O * scale[:, None] + P @ V[j:j+block]
        m = m_new
    return O / l[:, None]

rng = np.random.default_rng(0)
Q, K, V = (rng.standard_normal((10, 8)) for _ in range(3))
print(np.allclose(tiled_attention(Q, K, V), attention(Q, K, V)))   # True
```

真正的实现还会对查询分块，并把各循环收进同一个 GPU 核里，让各个块留在 SRAM 中；算术完全相同。

反向传播需要注意力权重，而 FlashAttention 没有存它们。它从 $Q$、$K$ 和保存下来的统计量 $m$、$\ell$ 出发，逐块把权重重新算出来。这增加了 FLOPs，却在访存上省下多得多的时间，与梯度检查点（Chen et al., 2016）是同一类权衡。Dao 等人证明，标准注意力在 HBM 与 SRAM 之间搬运 $\Theta(Td + T^2)$ 个数，而对大小为 $M$ 的 SRAM，FlashAttention 搬运 $\Theta(T^2d^2/M)$——在典型的头维数与 SRAM 大小下要少得多——并且对一切 $M$，没有精确的注意力算法能在渐近意义上一致地更好。除输入输出之外所需的内存从 $O(T^2)$ 降为 $O(T)$。

::: quiz
与标准注意力相比，FlashAttention 改变了什么？（多选。）
- [x] GPU 主存与片上存储之间搬运的字节数
- [x] 前向与反向传播所需的内存，从关于 $T$ 的二次改为线性
- [ ] 浮点运算的次数——它使次数减少了
- [ ] 结果——它给出的是注意力的一次近似
::: solution
FlashAttention 减少的是访存流量与内存占用。它并不减少算术——反向传播甚至要重算注意力权重，反而增加了 FLOPs——其结果在浮点舍入的意义下是精确的，不像 [[transformers/efficient-attention]] 中的那些近似方法。它更快，是因为标准注意力受内存带宽限制，而非受算术限制。
:::
:::

::: warning 精确不等于便宜
FlashAttention 有时与稀疏、线性方法并称为"高效注意力"。它们其实是两类东西：它以完全相同的 $O(T^2d)$ 算术*精确地*计算标准注意力，只是围绕存储层次重新组织了计算。它能把注意力在实际中加快数倍，但并不改变开销的二次增长；读十倍长的上下文，注意力的算术开销仍要贵上一百倍。改变模型的近似方法是 [[transformers/efficient-attention]] 的主题。
:::

在实践中，FlashAttention 让注意力快了数倍，也让长上下文成为可行：原论文报告在序列长度 $1024$ 下 GPT-2 训练加速 $3\times$，并在 $16{,}384$ 与 $65{,}536$ 词元的序列上训练了模型。FlashAttention-2（Dao，2023）重新组织了 GPU 线程之间的分工，达到 A100 峰值吞吐的 $50$–$73\%$；FlashAttention-3（Shah et al., 2024）利用 H100 的异步特性，在 16 位精度下达到其峰值的约 $75\%$。这类融合的注意力核如今已是深度学习库的默认选择；PyTorch 的 `scaled_dot_product_attention` 只要可以就会分派给它们之一。

## 生成时的注意力 {#sec-decode}

生成文本的开销结构不同。解码器产出下一个词元时，只计算一个新的查询，并对所有已有词元存下来的键和值作注意力（[[inference/kv-cache]]）。每词元每层的工作量是 $O(Td)$，随上下文线性增长，但它要把整个缓存从内存里读一遍，而每读一个数只作 $2$ 次 FLOP——算术强度约为 $1$，远低于任何脊点。因此生成由内存带宽和缓存大小主导，这也正是 [[transformers/efficient-attention]] 中那些缩小缓存的方法——多查询注意力与分组查询注意力——对推理服务如此之重要的原因。

::: history
Vaswani et al.（2017）早已用表格列出自注意力 $O(T^2d)$ 的开销，与循环层和卷积层对照。屋顶线模型由 Williams、Waterman 与 Patterson（2009）提出，用于解释计算在多核处理器上的性能。Chen et al.（2016）表明，在反向传播中重算激活是用少量算术换大量内存的节省。Milakov 与 Gimelshein（2018）发表了在线 softmax，一趟即可算出归一化因子；Rabe 与 Staats（2021）用同一思想计算自注意力，使内存的增长远慢于 $T^2$。Dao、Fu、Ermon、Rudra 与 Ré（2022）把在线 softmax、分块与重算组合成 FlashAttention，分析了它的 IO 复杂度并发行了高速 GPU 核；FlashAttention-2（Dao，2023）与 FlashAttention-3（Shah et al., 2024）使它适配了更新的硬件。
:::

::: summary
- 注意力在权值矩阵的 $24d^2$ 之外，每词元每层另加 $4Td$ FLOPs；当 $T > 6d$ 时它主导算术（跳过被掩的块后约为 $12d$）。
- 注意力矩阵每层有 $hT^2$ 个元素；长上下文下它存不下，而且把它搬进搬出 GPU 主存比算术更费时间。
- 屋顶线模型把吞吐限制在 $\min(\pi, \beta I)$；强度低于脊点 $\pi/\beta$（当前 GPU 上约为每字节 $150$–$300$ FLOPs）的计算是访存受限的，标准注意力和生成都属此类。
- 在线 softmax 维护滚动的最大值与和，并对先前的部分结果重缩放，从而能逐块精确地算出 softmax 加权和。
- FlashAttention 让 $Q$、$K$、$V$ 分块流过片上存储，从不存储注意力矩阵，并在反向传播中重算它；它是精确的，只用 $O(T)$ 的额外内存，快数倍，但算术仍按 $T^2$ 增长。
:::

## 习题

::: exercise 小模型的拐点 {level=1 check="4608"}
按 [[#prop-crossover]]，在什么上下文长度下，GPT-2 small（$d = 768$）的注意力 FLOPs 与权值矩阵的 FLOPs 相等？
::: solution
$T = 6d = 6\cdot768 = 4608$ 个词元。GPT-2 small 的最大上下文长度 $1024$ 远低于此，所以注意力只是其开销的小头。
:::
:::

::: exercise 一个头的分数矩阵 {level=1 check="256"}
在 32 位浮点下，$T = 8192$ 时单个头的分数矩阵占多少 Mebibyte？
::: solution
$8192^2\cdot4 = 268{,}435{,}456$ 字节 $= 256$ MiB。
:::
:::

::: exercise 一个脊点 {level=1 check="312/2.04"}
由 $\pi = 312$ TFLOP/s 与 $\beta = 2.04$ TB/s 计算 A100（80 GB）的脊点。强度为每字节 $100$ FLOPs 的计算在其上是访存受限的吗？
::: solution
$\pi/\beta = 312/2.04\approx153$ FLOPs/字节。强度 $100$ 低于它，所以该计算是访存受限的：最好也只能跑到 $2.04\times10^{12}\cdot100 = 204$ TFLOP/s，为峰值的三分之二。
:::
:::

::: exercise 矩阵乘积的算术强度 {level=2 check="4096/3"}
证明：以 16 位格式相乘两个 $n\times n$ 矩阵，读入两个输入、写出一次输出，其算术强度为每字节 $n/3$ FLOPs。计算 $n = 4096$ 时的值。要在 H100（脊点 $295$）上让这个乘积计算受限，$n$ 必须多大？
::: solution
FLOPs：$n^3$ 次乘加，即 $2n^3$。字节：三个 $n\times n$ 矩阵各两字节，$6n^2$。强度 $2n^3/6n^2 = n/3$；$n = 4096$ 时为 $4096/3\approx1365$。当 $n/3 > 295$、即 $n > 885$ 时乘积计算受限。这就是大矩阵乘法——从而也包括大模型的权值矩阵——能跑到接近峰值，而瘦长或很小的乘积不能的原因。
:::
:::

::: exercise 带值的在线 softmax {level=2 check="(2*exp(-2) + exp(0) + 4*exp(-1))/(exp(-2)+exp(0)+exp(-1)+exp(-3))"}
给 [[#ex-online]] 加上一维值 $v = (2, 1, 4, 0)$，分数仍为 $(1, 3, 2, 0)$。跟踪累加器 $o$ 走完两块，并给出最终输出 $o/\ell$。
::: solution
块 1（$m = 3$）：$o = e^{-2}\cdot2 + e^0\cdot1 = 0.2707 + 1 = 1.2707$，$\ell = 1.1353$。块 2（$m$ 保持 $3$，缩放为 $1$）：$o = 1.2707 + e^{-1}\cdot4 + e^{-3}\cdot0 = 1.2707 + 1.4715 = 2.7422$，$\ell = 1.5530$。输出 $2.7422/1.5530\approx1.766$，恰等于 $\sum_j\operatorname{softmax}(\mathbf{s})_jv_j = (2e^{-2} + 1 + 4e^{-1})/(e^{-2} + 1 + e^{-1} + e^{-3})$。
:::
:::

::: exercise 因果掩码省下的计算 {level=2}
在因果掩码下，$T^2$ 个分数元素中需要多少个？证明跳过被掩的元素约能把注意力的 FLOPs 减半，并由此求出高效因果模型的 [[#prop-crossover]] 拐点。
::: solution
只需要 $j\le i$ 的 $T(T+1)/2$ 个元素，约 $T^2/2$；跳过完全位于对角线以上的块的核，大约只做一半的分数与值工作，$\approx2T^2d$ 而不是 $4T^2d$。与权重 FLOPs 之比变为 $2T^2d/(24Td^2) = T/(12d)$，于是拐点移到 $T = 12d$——$d = 4096$ 时约 $49{,}000$ 个词元。
:::
:::

::: exercise 标准注意力的访存流量 {level=2 check="128"}
一个朴素的注意力实现写出 $S$、读回、写出 $P$、再读回，全部用 bfloat16。对 $T = 4096$ 的单头（不计 $Q$、$K$、$V$ 与输出），这造成多少 Mebibyte 的主存流量？在 $3.35$ TB/s 下这些流量需要多久？与 $d_k = 128$ 时该头 $4T^2d_k$ FLOPs 在 $989$ TFLOP/s 下所需的时间相比如何？
::: solution
每遍搬运 $T^2\cdot2 = 32$ MiB，共四遍：$128$ MiB，即 $1.34\times10^8$ 字节，耗时 $1.34\times10^8/3.35\times10^{12}\approx40\ \mu$s。算术量为 $4\cdot4096^2\cdot128\approx8.6\times10^9$ FLOPs，峰值下耗时 $8.6\times10^9/989\times10^{12}\approx8.7\ \mu$s。访存流量约为算术时间的五倍——把它消除，正是 FlashAttention 速度的来源。
:::
:::

::: exercise FlashAttention 存了什么 {level=3}
对 $T = 8192$ 的单个头，比较反向传播需要从前向传播取用的值的个数：标准注意力（权重矩阵 $P$）与 FlashAttention（输出——两者都要存——外加每行的统计量 $m$ 与 $\ell$）。比值是多少？解释为什么能从 $Q$、$K$、$m$、$\ell$ 精确重算出 $P$。
::: solution
标准注意力保留 $P$，$T^2 = 67{,}108{,}864$ 个数。FlashAttention 只保留 $m$ 与 $\ell$，$2T = 16{,}384$ 个数：少 $4096$ 倍。重算方法：对任一块重新构造 $S_{ij} = Q_iK_j^\top/\sqrt{d_k}$；然后逐行取 $P_{ij} = \exp(S_{ij} - m_i)/\ell_i$，因为 $m_i$ 与 $\ell_i$ 恰是第 $i$ 行对*所有*键的最大值与归一化因子。无需对行再扫第二遍。
:::
:::

::: exercise 生成的屋顶线 {level=3}
生成期间，一个维数 $d_k = 128$ 的新查询对每个头注意存有 $T$ 个键和值的缓存，缓存以 bfloat16 存储。证明这一注意力的算术强度约为每字节 $1$ FLOP，与 $T$ 无关。在 H100 上它能达到峰值算术的多大比例？这对加速生成最有效的手段意味着什么？
::: solution
FLOPs：分数 $2Td_k$，加权值 $2Td_k$，共 $4Td_k$。字节：缓存共 $2Td_k$ 个数、每个两字节，即 $4Td_k$ 字节（查询与输出可忽略）。强度 $4Td_k/4Td_k = 1$。可达吞吐为 $3.35\times10^{12}\cdot1$ FLOP/s，约为 $989$ TFLOP/s 峰值的 $0.3\%$。因此生成受限于必须读取多少字节的缓存：缩小缓存（更少的键值头、量化缓存）或一次为许多请求读取它（批处理）有帮助，而更快的算术没有。
:::
:::

::: exercise 对查询也分块 {level=3}
[[#sec-flash]] 中的 `tiled_attention` 函数只对键和值分块，同时保留全部 $T$ 个查询的统计量。把它改成也对查询块循环（外层循环查询块，内层循环键块），加上因果掩码，并跳过完全位于某个查询块之后的键块。与带因果掩码的 `attention` 对照检验结果。
::: solution
```python
import numpy as np

def causal_attention(Q, K, V):
    T = Q.shape[0]
    S = Q @ K.T / np.sqrt(Q.shape[1]) + np.triu(np.full((T, T), -np.inf), 1)
    P = np.exp(S - S.max(1, keepdims=True))
    return (P / P.sum(1, keepdims=True)) @ V

def flash_causal(Q, K, V, bq=3, bk=4):
    T, d = Q.shape
    O = np.zeros((T, V.shape[1]))
    for i in range(0, T, bq):                              # 查询块 i .. i+bq-1
        q = Q[i:i+bq]; rows = np.arange(i, min(i + bq, T))
        o = np.zeros((len(rows), V.shape[1])); m = np.full(len(rows), -np.inf); l = np.zeros(len(rows))
        for j in range(0, rows[-1] + 1, bk):               # 跳过完全位于未来的键块
            cols = np.arange(j, min(j + bk, T))
            S = q @ K[cols].T / np.sqrt(d)
            S = np.where(cols[None, :] > rows[:, None], -np.inf, S)   # 块内因果掩码
            m_new = np.maximum(m, S.max(1)); P = np.exp(S - m_new[:, None]); scale = np.exp(m - m_new)
            l = l * scale + P.sum(1); o = o * scale[:, None] + P @ V[cols]; m = m_new
        O[i:i+bq] = o / l[:, None]
    return O

rng = np.random.default_rng(1)
Q, K, V = (rng.standard_normal((11, 8)) for _ in range(3))
print(np.allclose(flash_causal(Q, K, V), causal_attention(Q, K, V)))   # True
```

内层循环停在包含本块最后一个查询的那个键块上，从而跳过了对角线以上的块；在跨对角线的块内，掩码把未来的分数置为 $-\infty$。每一行至少保留自己的键不被掩掉，所以任何一行都不会为空。
:::
:::
