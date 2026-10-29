多头注意力让每个位置从其他位置收集信息，但它本身只是一个很弱的构件：它的输出是值的平均，而把平均再堆叠起来并不会产生新的特征。因此，Transformer 在注意力与另一种层——按位置分别作用的、小型的**前馈网络**——之间交替，并用**残差连接**与**归一化**把两者包裹起来，使得几十个这样的块能够堆叠在一起并得到训练。GPT-2 small 有 $12$ 个块，LLaMA-7B 有 $32$ 个，已发表的最大模型大约有上百个。

本章逐件组装这个块：贯穿整个网络的残差流、在用的两种归一化（LayerNorm 与 RMSNorm）、前馈层及其门控变体 SwiGLU，以及把模型的形状换算成参数量的记账工作。读完本章，你将能用十几行 PyTorch 写下一个块，并精确算出一个已发表模型的参数量。

## 残差流 {#sec-residual}

目前几乎所有语言模型都采用**前置归一化（pre-norm）**结构：每个子层读取当前表示的一个归一化副本，再把自己的输出*加*回去。

::: definition 前置归一化 Transformer 块 {#def-block}
设 $\mathbf{x}\in\R^{T\times d}$ 为进入一个块的表示。**前置归一化 Transformer 块**计算

$$
\begin{aligned}
\mathbf{h} &= \mathbf{x} + \operatorname{MHA}\big(\operatorname{Norm}_1(\mathbf{x})\big),\\
\mathbf{y} &= \mathbf{h} + \operatorname{FFN}\big(\operatorname{Norm}_2(\mathbf{h})\big),
\end{aligned}
$$ {#eq-block}

其中 $\operatorname{MHA}$ 是因果多头注意力（[[transformers/multi-head-attention]]），$\operatorname{FFN}$ 是按位置独立施加的前馈网络（[[#def-ffn]]），$\operatorname{Norm}$ 是 LayerNorm 或 RMSNorm（[[#sec-norm]]）。模型把 $L$ 个这样的块依次作用在词元嵌入上，然后做一次最终归一化，再接输出（解嵌入）层。
:::

把 [[#eq-block]] 沿所有层展开，就能看出网络在计算什么。若 $\mathbf{x}_0$ 是嵌入，$2L$ 个子层各自加上自己的输出 $\mathbf{u}_k$，则

$$
\mathbf{x}_{\text{final}} = \mathbf{x}_0 + \sum_{k=1}^{2L}\mathbf{u}_k.
$$

这个表示是一个不断累加的和——**残差流**——每个子层都从中读取（经过一次归一化）并向其中写入。早期层放进流里的信息原封不动地留在那里，供之后每一层读取，除非某个层主动覆盖它。这一视角由可解释性工作推广开来（[[interpretability/residual-stream]]），也是深层 Transformer 究竟为何能够训练的关键。

::: proposition 恒等路径 {#prop-identity}
设 $\mathbf{x}_{\ell+1} = \mathbf{x}_\ell + F_\ell(\mathbf{x}_\ell)$，$\ell = 0, \dots, L-1$，其中 $F_\ell$ 可微，$\mathcal{L}$ 是由 $\mathbf{x}_L$ 算出的损失。则

$$
\frac{\partial\mathbf{x}_L}{\partial\mathbf{x}_\ell} = \prod_{k=\ell}^{L-1}\big(I + J_k\big) = I + \sum_{k=\ell}^{L-1} J_k + (\text{两个或更多 } J\text{ 的乘积}),
$$

其中 $J_k$ 是 $F_k$ 在 $\mathbf{x}_k$ 处的雅可比矩阵。特别地，梯度 $\partial\mathcal{L}/\partial\mathbf{x}_\ell$ 中总含有 $\partial\mathcal{L}/\partial\mathbf{x}_L$ 本身这一项，原封不动地传回。
:::

::: proof
由链式法则 $\partial\mathbf{x}_{k+1}/\partial\mathbf{x}_k = I + J_k$，而从第 $\ell$ 层到第 $L$ 层复合映射的雅可比就是这些因子（按层的顺序）的乘积。展开乘积，每个因子都取 $I$ 的那一项就是 $I$；恰含一个 $J_k$ 的项给出那个和；其余各项含有两个或更多 $J$。乘以 $\partial\mathcal{L}/\partial\mathbf{x}_L$ 即得第 $\ell$ 层的梯度，其第一项就是 $\partial\mathcal{L}/\partial\mathbf{x}_L$。
:::

若没有残差连接，雅可比将是 $L - \ell$ 个矩阵 $J_k$ 的乘积，随深度呈几何级数缩小或爆炸——即 [[neural-networks/initialisation-normalisation]] 中的梯度消失与梯度爆炸。有了残差连接，无论网络多深，每一层都通过恒等项直接收到损失梯度。

最初的 Transformer 把归一化放在加法*之后*，$\mathbf{x}_{\ell+1} = \operatorname{Norm}(\mathbf{x}_\ell + F_\ell(\mathbf{x}_\ell))$。在这种**后置归一化（post-norm）**结构中，流本身每一层都要经过一次归一化，于是 [[#prop-identity]] 中干净的恒等路径不复存在；这样的模型只有配合精心的学习率预热才能训练好。GPT-2 把归一化移到每个子层的输入端，并在最后一个块之后再加一次；Xiong 等人（2020）证明前置归一化模型在初始化时梯度表现良好，可以不用预热训练。前置归一化是今天的标准。新的变体仍不断出现：Gemma 2 对每个子层的输入和输出都作归一化，最近一些模型还在点积之前对查询和键作归一化（"QK-norm"，Dehghani 等人（2023）在 ViT-22B 中大规模使用），以防注意力 logits 在训练中增长。

::: quiz
在 [[#def-block]] 的前置归一化块中，第一个残差连接把什么加到 $\mathbf{x}$ 上？
- [x] $\operatorname{MHA}(\operatorname{Norm}(\mathbf{x}))$
- [ ] $\operatorname{Norm}(\mathbf{x} + \operatorname{MHA}(\mathbf{x}))$
- [ ] $\operatorname{MHA}(\mathbf{x})$，随后再对求和结果作归一化
- [ ] $\operatorname{Norm}(\operatorname{MHA}(\mathbf{x}))$
::: solution
在前置归一化块中，子层读取一个归一化副本，其输出加到未归一化的流上：$\mathbf{x} + \operatorname{MHA}(\operatorname{Norm}(\mathbf{x}))$。第二个选项是最初 Transformer 的后置归一化块。流本身在堆叠内部从不归一化——只在输出层之前的最终归一化处归一化。
:::
:::

## 归一化 {#sec-norm}

深层网络中的激活在训练过程中尺度会漂移，输入尺度不断变化的层必须不停重新调整。归一化在子层读取每个词元的表示之前，把它重新缩放到标准大小。

::: definition 层归一化 {#def-layernorm}
对向量 $\mathbf{x}\in\R^d$（一个词元的表示），记 $\mu = \frac1d\sum_ix_i$，$\sigma^2 = \frac1d\sum_i(x_i - \mu)^2$。带学习到的增益 $\boldsymbol\gamma\in\R^d$ 与偏置 $\boldsymbol\beta\in\R^d$ 的 **LayerNorm（层归一化）**为

$$
\operatorname{LayerNorm}(\mathbf{x})_i = \gamma_i\,\frac{x_i - \mu}{\sqrt{\sigma^2 + \varepsilon}} + \beta_i,
$$

其中 $\varepsilon$ 是保证数值安全的小常数（如 $10^{-5}$）。
:::

::: definition RMS 归一化 {#def-rmsnorm}
**RMSNorm** 省去中心化与偏置：记 $\operatorname{RMS}(\mathbf{x}) = \sqrt{\frac1d\sum_ix_i^2}$，

$$
\operatorname{RMSNorm}(\mathbf{x})_i = \gamma_i\,\frac{x_i}{\sqrt{\operatorname{RMS}(\mathbf{x})^2 + \varepsilon}}.
$$
:::

两者都逐词元工作，在该词元的 $d$ 个特征维上进行。RMSNorm（Zhang 与 Sennrich，2019）稍微便宜些，实践中效果同样好；LLaMA、Mistral 和大多数最近的开放模型都使用它。

::: example 手工计算两种归一化 {#ex-norms}
用 LayerNorm 与 RMSNorm 分别归一化 $\mathbf{x} = (1, 2, 3, 6)$，取 $\boldsymbol\gamma = \mathbf{1}$、$\boldsymbol\beta = \mathbf{0}$、$\varepsilon = 0$。
::: solution
LayerNorm：$\mu = 12/4 = 3$，$\sigma^2 = \big((-2)^2 + (-1)^2 + 0^2 + 3^2\big)/4 = 14/4 = 3.5$，故 $\sigma = 1.871$，

$$
\operatorname{LayerNorm}(\mathbf{x}) = \frac{(-2, -1, 0, 3)}{1.871} = (-1.069,\ -0.535,\ 0,\ 1.604).
$$

结果均值为 $0$、方差为 $1$。RMSNorm：$\operatorname{RMS}(\mathbf{x}) = \sqrt{(1 + 4 + 9 + 36)/4} = \sqrt{12.5} = 3.536$，于是

$$
\operatorname{RMSNorm}(\mathbf{x}) = (0.283,\ 0.566,\ 0.849,\ 1.697).
$$

它的均方根为 $1$，但均值为 $0.849$：RMSNorm 只固定向量的大小，而不移动它的中心。
:::
:::

::: warning LayerNorm 不是 BatchNorm
BatchNorm 在卷积网络中很常见，它用*在整个批次的样本上*统计出的量对每个特征作归一化。LayerNorm 与 RMSNorm 则对每个词元*在自己的特征维上*作归一化，从来看不到其他词元或其他序列。这就是为什么它们在训练和生成中行为一致、能在批次大小为 $1$ 时工作、且不会在批内序列之间泄漏信息——这些对语言模型都必不可少。
:::

## 前馈层 {#sec-ffn}

注意力在位置之间搬运信息；前馈网络则在每个位置内部变换信息。它是同一个小型两层网络，独立地作用于每个词元。

::: definition 逐位置前馈网络 {#def-ffn}
设权重 $W_1\in\R^{d\times d_{\text{ff}}}$、$W_2\in\R^{d_{\text{ff}}\times d}$，偏置 $\mathbf{b}_1, \mathbf{b}_2$，以及逐元素施加的非线性激活 $\phi$。**前馈网络**把每个词元的向量 $\mathbf{x}\in\R^d$ 映射为

$$
\operatorname{FFN}(\mathbf{x}) = \phi(\mathbf{x}W_1 + \mathbf{b}_1)\,W_2 + \mathbf{b}_2.
$$

隐层宽度通常取 $d_{\text{ff}} = 4d$。
:::

最初的 Transformer 使用 ReLU 激活 $\max(0, x)$；GPT 与 BERT 改用 **GELU**，$\operatorname{GELU}(x) = x\,\Phi(x)$，其中 $\Phi$ 是标准正态分布函数；后来的许多模型使用 **SiLU**（或 Swish），$\operatorname{SiLU}(x) = x\,\sigma(x) = x/(1 + e^{-x})$。两者都是 ReLU 的光滑版本，允许少量负信号通过。

::: widget plot
f: max(0, x); 0.5x(1 + erf(x/sqrt(2))); x/(1 + exp(-x))
x: -4, 4
y: -1, 4
labels: ReLU; GELU $x\,\Phi(x)$; SiLU $x\,\sigma(x)$
caption: 三种激活函数。对很大的负输入三者都接近 $0$，对很大的正输入都接近 $x$。GELU 与 SiLU 光滑，且略微下探到零以下（约到 $-0.17$ 和 $-0.28$），因此负输入仍能通过一点梯度；ReLU 在 $0$ 处有折角，负输入上完全没有梯度。
:::

前馈网络占据了模型的大部分参数，而且可以被读作一个存储器。$W_1$ 的行充当"键"，负责检测输入表示中的模式；激活决定每个模式被激发得多强；$W_2$ 的行则是按比例加到流上的"值"。Geva 等人（2021）发现，许多这样的键会对输入中可辨认的模式作出响应，而对应的值会提升合理的下一个词元——这是事实性知识存放位置的一种图景。

大多数当前模型改用了**门控（gated）**前馈层。

::: definition SwiGLU 前馈网络 {#def-swiglu}
设 $W_1, W_3\in\R^{d\times d_{\text{ff}}}$、$W_2\in\R^{d_{\text{ff}}\times d}$（无偏置），**SwiGLU** 网络为

$$
\operatorname{FFN}_{\text{SwiGLU}}(\mathbf{x}) = \big(\operatorname{SiLU}(\mathbf{x}W_1)\odot\mathbf{x}W_3\big)\,W_2,
$$

其中 $\odot$ 是逐元素乘积。分支 $\operatorname{SiLU}(\mathbf{x}W_1)$ 充当门，对线性分支 $\mathbf{x}W_3$ 的每个隐单元作缩放。
:::

::: example 手工计算一个 SwiGLU 单元 {#ex-swiglu}
取 $d = d_{\text{ff}} = 2$，输入 $\mathbf{x} = (1, 2)$，

$$
W_1 = \begin{pmatrix}1&0\\0&-1\end{pmatrix}, \qquad W_3 = \begin{pmatrix}1&1\\1&0\end{pmatrix}, \qquad W_2 = I.
$$

计算 $\operatorname{FFN}_{\text{SwiGLU}}(\mathbf{x})$。
::: solution
门控分支为 $\mathbf{x}W_1 = (1, -2)$，$\operatorname{SiLU}(1, -2) = (0.731, -0.238)$；线性分支为 $\mathbf{x}W_3 = (3, 1)$。两者的逐元素乘积为 $(0.731\cdot3,\ -0.238\cdot1) = (2.193, -0.238)$，$W_2 = I$ 保持其不变。第一个隐单元的门是开着的（其预激活为正），因此通过大部分线性信号；第二个单元的门几乎关闭，只让一小部分变号的信号通过。与 ReLU 单元（其输出就是激活本身）不同，门控单元是把一个*内容*信号乘以一个另行算出的*门*。
:::
:::

Shazeer（2020）比较了多种这样的门控变体，发现在同样开销下它们能降低 Transformer 语言模型的损失；SwiGLU 被 PaLM 与 LLaMA 采用，如今是最常见的选择。门控网络有三个矩阵而不是两个，为保持参数量不变，其隐层宽度要相应缩小。

::: proposition 参数量对齐 {#prop-swiglu}
取 $d_{\text{ff}} = 4d$ 的 ReLU 或 GELU 前馈网络，与取 $d_{\text{ff}} = \tfrac83d$ 的 SwiGLU 网络，权重数相同，都是 $8d^2$。
:::

::: proof
标准网络有 $W_1$ 与 $W_2$，共 $2\cdot d\cdot 4d = 8d^2$ 个权重。SwiGLU 网络有三个 $d\times d_{\text{ff}}$ 的矩阵，即 $3d\,d_{\text{ff}}$ 个权重，恰在 $d_{\text{ff}} = 8d/3$ 时等于 $8d^2$。
:::

实践中 $8d/3$ 会向上取整到对硬件方便的数。LLaMA-7B 的 $d = 4096$，故 $8d/3 = 10{,}922.7$，向上取整到 $11{,}008 = 43\cdot256$。

::: widget plot
f: heaviside(x); 0.5(1 + erf(x/sqrt(2))) + x exp(-x^2/2)/sqrt(2pi); (1 + exp(-x))^(-1) (1 + x (1 - (1 + exp(-x))^(-1)))
x: -4, 4
y: -0.3, 1.3
labels: ReLU$'$; GELU$'$; SiLU$'$
caption: 三种激活的导数。ReLU 的导数是一个阶跃：负输入全为 $0$，因此恒为负的单元从此不再学习（"死亡"的 ReLU）。GELU 与 SiLU 的导数光滑，在原点附近从不恰为 $0$，且在中等正输入处略超过 $1$。
:::

## 参数计数 {#sec-count}

模型的大小由几个数决定：宽度 $d$、块数 $L$、前馈宽度和词表大小 $\lvert\mathcal{V}\rvert$。

::: proposition 一个块的参数 {#prop-block-params}
忽略偏置与归一化增益，模型宽度为 $d$、前馈网络含 $8d^2$ 个权重（$d_{\text{ff}} = 4d$，或 SwiGLU 取 $d_{\text{ff}} = 8d/3$）的 Transformer 块有 $12d^2$ 个参数：注意力中 $4d^2$，前馈网络中 $8d^2$。
:::

::: proof
由 [[transformers/multi-head-attention#prop-params]]，注意力有 $4d^2$ 个权重；由 [[#prop-swiglu]]，前馈网络有 $8d^2$ 个。
:::

于是 $L$ 个块的模型，块内约有 $12Ld^2$ 个参数，加上词元嵌入的 $\lvert\mathcal{V}\rvert d$ 个；若输入输出嵌入没有**绑定（tied）**（两处共用同一矩阵，如 GPT-2），还要加上输出层的另一个 $\lvert\mathcal{V}\rvert d$。每个块的三分之二都在前馈网络里。

::: example 精确计算 GPT-2 small {#ex-gpt2}
GPT-2 small 有 $L = 12$，$d = 768$，$d_{\text{ff}} = 3072$，词表 $50{,}257$ 个词元，$1024$ 个可学习位置，输入输出嵌入绑定，每个线性层都有偏置，每个子层之前与最后一个块之后各有一个带增益和偏置的 LayerNorm。计算它的参数量。
::: solution
每块：两个 LayerNorm，$2\cdot2\cdot768 = 3072$；注意力，合并的 $Q, K, V$ 投影 $768\cdot2304 + 2304$，输出投影 $768\cdot768 + 768$，合计 $2{,}362{,}368$；前馈，$768\cdot3072 + 3072 + 3072\cdot768 + 768 = 4{,}722{,}432$。每块合计：$7{,}087{,}872$，$12$ 个块共 $85{,}054{,}464$。

嵌入：词元 $50{,}257\cdot768 = 38{,}597{,}376$，位置 $1024\cdot768 = 786{,}432$。最终 LayerNorm：$1536$。输出层复用词元嵌入。总计：

$$
85{,}054{,}464 + 38{,}597{,}376 + 786{,}432 + 1536 = 124{,}439{,}808,
$$

即通常所说的"124M"。近三分之一的参数在词元嵌入里，这是小模型配大词表的典型情形。
:::
:::

::: example 精确计算 LLaMA-7B {#ex-llama}
LLaMA-7B 有 $L = 32$，$d = 4096$，SwiGLU 网络取 $d_{\text{ff}} = 11{,}008$，词表 $32{,}000$，RoPE（无位置参数），RMSNorm（只有增益），无偏置，输入输出嵌入分开。计算它的参数量。
::: solution
每块：注意力 $4\cdot4096^2 = 67{,}108{,}864$；前馈 $3\cdot4096\cdot11{,}008 = 135{,}266{,}304$；两个 RMSNorm 增益共 $8192$；合计 $202{,}383{,}360$。$32$ 个块：$6{,}476{,}267{,}520$。嵌入：$2\cdot32{,}000\cdot4096 = 262{,}144{,}000$。最终 RMSNorm：$4096$。总计：

$$
6{,}476{,}267{,}520 + 262{,}144{,}000 + 4096 = 6{,}738{,}415{,}616,
$$

即 LLaMA 论文中的"6.7B"。这里的嵌入只占总数 $4\%$：模型越大，块越占主导。
:::
:::

由 [[#prop-block-params]] 可得一条有用的经验法则。前向传播把每个词元的向量与每个权重矩阵各乘一次，每个权重花费 $2$ FLOPs，所以一个有 $N$ 个非嵌入参数的模型，前向传播每词元约需 $2N$ FLOPs，再加上 [[transformers/multi-head-attention#eq-mha-flops]] 的注意力分数开销。反向传播约为前向的两倍，于是得到 [[scaling/flops-memory]] 通篇使用的每训练词元 $6N$ FLOPs。

::: example LLaMA-7B 一个词元的开销 {#ex-flops}
估算 LLaMA-7B（$6.48\times10^9$ 个非嵌入参数，$L = 32$，$d = 4096$）在 $T = 2048$ 词元上下文下每词元的前向 FLOPs，以及每词元的训练 FLOPs。
::: solution
权重矩阵每词元花费 $2N = 2\cdot6.476\times10^9\approx1.30\times10^{10}$ FLOPs。注意力分数与加权值每层每词元另加 $4Td$（[[transformers/multi-head-attention#eq-mha-flops]] 除以 $T$）：$4\cdot2048\cdot4096\cdot32\approx1.07\times10^9$，约多 $8\%$。输出层 $2\lvert\mathcal{V}\rvert d = 2\cdot32{,}000\cdot4096\approx2.6\times10^8$，再加约 $2\%$。于是前向传播每词元约 $1.4\times10^{10}$ FLOPs，训练约为它的三倍，即每词元约 $4\times10^{10}$ FLOPs。在这一上下文长度下 $2N$ 法则的精度约为百分之十；在长得多的上下文下，注意力项随 $T$ 成比例增长，不再可以忽略。
:::
:::

## 代码实现 {#sec-code}

```python
import torch, torch.nn as nn, torch.nn.functional as F

class RMSNorm(nn.Module):
    def __init__(self, d, eps=1e-6):
        super().__init__()
        self.g, self.eps = nn.Parameter(torch.ones(d)), eps
    def forward(self, x):                                  # x: (B, T, d)
        return x * torch.rsqrt(x.pow(2).mean(-1, keepdim=True) + self.eps) * self.g

class Block(nn.Module):
    def __init__(self, d, h, d_ff):
        super().__init__()
        self.h = h
        self.norm1, self.norm2 = RMSNorm(d), RMSNorm(d)
        self.qkv = nn.Linear(d, 3 * d, bias=False)          # W_Q、W_K、W_V 并排存放
        self.out = nn.Linear(d, d, bias=False)               # W_O
        self.w1 = nn.Linear(d, d_ff, bias=False)             # 门控分支
        self.w3 = nn.Linear(d, d_ff, bias=False)             # 线性分支
        self.w2 = nn.Linear(d_ff, d, bias=False)
    def forward(self, x):                                    # x: (B, T, d)
        B, T, d = x.shape
        q, k, v = self.qkv(self.norm1(x)).split(d, dim=-1)   # each (B, T, d)
        q, k, v = (t.view(B, T, self.h, d // self.h).transpose(1, 2) for t in (q, k, v))
        a = F.scaled_dot_product_attention(q, k, v, is_causal=True)   # (B, h, T, d_k)
        x = x + self.out(a.transpose(1, 2).reshape(B, T, d))           # 残差 1
        z = self.norm2(x)
        return x + self.w2(F.silu(self.w1(z)) * self.w3(z))            # 残差 2（SwiGLU）

d, h = 192, 6
block = Block(d, h, d_ff=8 * d // 3)                         # d_ff = 512
n = sum(p.numel() for p in block.parameters())
print(n, 12 * d * d + 2 * d)                                 # 442752 442752
print(block(torch.randn(2, 10, d)).shape)                    # torch.Size([2, 10, 192])
```

位置信息（RoPE，[[transformers/positional-encoding]]）会在调用注意力之前作用于 `q` 和 `k`；这里略去，以保持块的简短。

::: warning 别忘了最终归一化
在前置归一化的堆叠中，残差流在各个块内部从不归一化，而且由于每层不断向其中相加，它的尺度通常随深度增长。因此输出层之前的最终归一化不是可有可无的：没有它，logits 的尺度就取决于深度，训练常常发散。移植模型时，请检查最后这个归一化是否存在、位置是否正确。
:::

::: history
残差连接来自用于图像识别的 ResNet（He et al., 2015）；层归一化由 Ba、Kiros 与 Hinton（2016）为循环网络引入。最初的 Transformer（Vaswani et al., 2017）把两者结合成后置归一化结构，配以宽度 $4d$ 的 ReLU 前馈层。GELU（Hendrycks 与 Gimpel，2016）被 GPT 与 BERT 采用。GPT-2（Radford et al., 2019）把归一化移到每个子层的输入端并加了最后一次；Xiong et al.（2020）分析了这种前置归一化结构训练更稳定的原因。Zhang 与 Sennrich（2019）提出了 RMSNorm。门控线性单元可追溯到 Dauphin et al.（2017）；Shazeer（2020）表明 SwiGLU 等变体能改进 Transformer 的前馈层，而 PaLM（2022）与 LLaMA（Touvron et al., 2023）把前置归一化 RMSNorm、SwiGLU 与 RoPE 的组合变成了标准配方。Geva et al.（2021）提出把前馈层读作键值存储器。
:::

::: summary
- 前置归一化块计算 $\mathbf{h} = \mathbf{x} + \operatorname{MHA}(\operatorname{Norm}(\mathbf{x}))$ 与 $\mathbf{y} = \mathbf{h} + \operatorname{FFN}(\operatorname{Norm}(\mathbf{h}))$；模型以一次最终归一化收尾。
- 残差流是每个子层都读取并写入的累加和；它的恒等路径把损失梯度送到每一层，这正是深层堆叠得以训练的原因。
- LayerNorm 对每个词元的特征做中心化与重新缩放；RMSNorm 只重新缩放。与 BatchNorm 不同，两者都逐词元作用。
- 前馈网络独立地变换每个位置，隐层宽度通常取 $4d$（GELU）或 $\tfrac83d$（SwiGLU），占每个块参数的三分之二。
- 一个块约有 $12d^2$ 个参数；加上嵌入即可得到像 $124{,}439{,}808$（GPT-2 small）与 $6{,}738{,}415{,}616$（LLaMA-7B）这样的精确总数，以及前向传播每词元约 $2N$ FLOPs。
:::

## 习题

::: exercise 手工计算 LayerNorm {level=1 check="-2/sqrt(3.5)"}
取 $\boldsymbol\gamma = \mathbf{1}$、$\boldsymbol\beta = \mathbf{0}$、$\varepsilon = 0$，计算 $\operatorname{LayerNorm}(1, 2, 3, 6)$ 的第一个分量。
::: solution
$\mu = 3$，$\sigma^2 = 3.5$，故第一个分量为 $(1 - 3)/\sqrt{3.5} = -2/\sqrt{3.5}\approx-1.069$，如 [[#ex-norms]]。
:::
:::

::: exercise 手工计算 RMSNorm {level=1 check="1/sqrt(12.5)"}
取 $\boldsymbol\gamma = \mathbf{1}$、$\varepsilon = 0$，计算 $\operatorname{RMSNorm}(1, 2, 3, 6)$ 的第一个分量。
::: solution
$\operatorname{RMS} = \sqrt{50/4} = \sqrt{12.5}$，故第一个分量为 $1/\sqrt{12.5}\approx0.283$。
:::
:::

::: exercise 一个块的参数量 {level=1 check="12582912"}
一个 $d = 1024$、$d_{\text{ff}} = 4096$ 的 Transformer 块有多少个权重（忽略偏置与归一化增益）？
::: solution
由 [[#prop-block-params]]，$12\cdot1024^2 = 12{,}582{,}912$：注意力中 $4{,}194{,}304$，前馈网络中 $8{,}388{,}608$。
:::
:::

::: exercise SwiGLU 的宽度 {level=1 check="8*5120/3"}
一个 $d = 5120$ 的模型使用 SwiGLU。隐层宽度 $d_{\text{ff}}$ 取多少，才能恰与 $4d$ 的 ReLU 网络的参数量相同？LLaMA-13B 用的是 $13{,}824$；它是多少、被取整到了什么？
::: solution
$d_{\text{ff}} = 8\cdot5120/3 = 13{,}653.3$。向上取整到 $256$ 的下一个倍数，即 $54\cdot256 = 13{,}824$，正是 LLaMA-13B 使用的宽度。
:::
:::

::: exercise 归一化忽略了什么 {level=2}
证明 LayerNorm 的归一化部分 $(\mathbf{x} - \mu\mathbf{1})/\sigma$ 均值为 $0$、方差为 $1$，并且当 $\mathbf{x}$ 被换成 $a\mathbf{x} + c\mathbf{1}$（$a > 0$，忽略 $\varepsilon$）时它保持不变。RMSNorm 具有这两个不变性中的哪一个？这对一个读取归一化流的子层意味着什么？
::: solution
记 $\hat x_i = (x_i - \mu)/\sigma$。则 $\sum_i\hat x_i = (\sum_ix_i - d\mu)/\sigma = 0$，且 $\frac1d\sum_i\hat x_i^2 = \sigma^2/\sigma^2 = 1$。对 $\mathbf{x}' = a\mathbf{x} + c\mathbf{1}$，$\mu' = a\mu + c$，$\sigma' = a\sigma$，故 $(x'_i - \mu')/\sigma' = a(x_i - \mu)/(a\sigma) = \hat x_i$。RMSNorm 除以 $\operatorname{RMS}(a\mathbf{x}) = a\operatorname{RMS}(\mathbf{x})$，因此它对 $a > 0$ 的缩放不变，但对加 $c\mathbf{1}$ 不然。因此，读取归一化流的子层只看到表示的*方向*（在 LayerNorm 情形下还有它相对均值的偏差）；随深度增长的残差流整体大小对它没有影响。（当 $\varepsilon > 0$ 时，这一不变性在极小误差下仍成立。）
:::
:::

::: exercise 数一数 GPT-2 small 的参数 {level=2 check="124439808"}
复现 [[#ex-gpt2]] 的计数。若输出层*不*与词元嵌入绑定，总数会如何变化？
::: solution
如例中所示，$12\cdot7{,}087{,}872 + 50{,}257\cdot768 + 1024\cdot768 + 2\cdot768 = 124{,}439{,}808$。不绑定的输出层会再增加 $50{,}257\cdot768 = 38{,}597{,}376$ 个权重（若带偏置还有 $50{,}257$ 个偏置），总计约 $1.63$ 亿。
:::
:::

::: exercise 数一数 LLaMA-7B 的参数 {level=2 check="6738415616"}
复现 [[#ex-llama]] 的计数。LLaMA-7B 的参数中有多大比例在前馈网络里？
::: solution
如 [[#ex-llama]]：$32\cdot202{,}383{,}360 + 2\cdot32{,}000\cdot4096 + 4096 = 6{,}738{,}415{,}616$。前馈网络占 $32\cdot135{,}266{,}304 = 4{,}328{,}521{,}728$，即总数的 $64\%$——接近 [[#prop-block-params]] 所说的三分之二，差额主要来自嵌入。
:::
:::

::: exercise 一个块的 FLOPs {level=2 check="24"}
证明一个含 $12d^2$ 个权重的块，前向传播中除注意力分数外每词元约花费 $24d^2$ FLOPs，并且无论前馈网络用宽度 $4d$ 的 GELU 还是宽度 $\tfrac83d$ 的 SwiGLU，结果都相同。$d^2$ 前的系数是多少？
::: solution
每个权重每词元参与一次乘加，即 $2$ FLOPs，所以 $12d^2$ 个权重每词元花费 $24d^2$ FLOPs。细算：四个注意力投影花费 $4\cdot2d^2 = 8d^2$；GELU 网络花费 $2\cdot2\cdot d\cdot4d = 16d^2$，SwiGLU 同样花费 $3\cdot2\cdot d\cdot\frac83d = 16d^2$（逐元素的门与激活可忽略）。系数是 $24$。
:::
:::

::: exercise 穿过残差流的梯度 {level=3}
考虑两层块的网络 $\mathbf{x}_1 = \mathbf{x}_0 + F_0(\mathbf{x}_0)$，$\mathbf{x}_2 = \mathbf{x}_1 + F_1(\mathbf{x}_1)$，并设在初始化时雅可比很小，$J_0 = J_1 = \eta A$，其中 $A$ 是满足 $\lVert A\rVert = 1$ 的固定矩阵，$\eta = 0.01$。(a) 精确计算 $\partial\mathbf{x}_2/\partial\mathbf{x}_0$。(b) 与具有同样雅可比的无残差网络 $\mathbf{x}_2 = F_1(F_0(\mathbf{x}_0))$ 比较。(c) 当深度增至 $L$ 个块时，两者各会发生什么？
::: solution
(a) $(I + \eta A)(I + \eta A) = I + 2\eta A + \eta^2A^2$，其范数接近 $1$。(b) 没有残差时雅可比为 $J_1J_0 = \eta^2A^2$，范数至多 $10^{-4}$：到达 $\mathbf{x}_0$ 的梯度比输出处小一万倍。(c) 有残差时，$(I + \eta A)^L$ 的范数大约介于 $1$ 与 $(1 + \eta)^L$ 之间，当 $L\eta$ 为一阶量级时保持温和；没有残差时，$\eta^LA^L$ 的范数至多为 $\eta^L$，按几何级数消失。这正是 [[#prop-identity]] 的缩影，也是残差连接在深层网络中不可或缺的原因。
:::
:::

::: exercise 从零搭一个块 {level=3}
运行 [[#sec-code]] 中的 `Block` 并确认其参数量 $12d^2 + 2d$。然后 (a) 把 SwiGLU 网络换成宽度 $4d$ 的 GELU 网络，检查参数量仍为 $12d^2 + 2d$；(b) 验证因果性：只改变位置 $5$ 的输入，确认位置 $0$–$4$ 的输出不变。
::: solution
```python
import torch, torch.nn as nn, torch.nn.functional as F
# 使用章中的 Block、RMSNorm，以及 d = 192, h = 6
class GeluBlock(Block):
    def __init__(self, d, h):
        super().__init__(d, h, d_ff=4 * d)
        del self.w3                                            # GELU 只用两个矩阵
    def forward(self, x):
        B, T, d = x.shape
        q, k, v = self.qkv(self.norm1(x)).split(d, dim=-1)
        q, k, v = (t.view(B, T, self.h, d // self.h).transpose(1, 2) for t in (q, k, v))
        a = F.scaled_dot_product_attention(q, k, v, is_causal=True)
        x = x + self.out(a.transpose(1, 2).reshape(B, T, d))
        return x + self.w2(F.gelu(self.w1(self.norm2(x))))

g = GeluBlock(d, h)
print(sum(p.numel() for p in g.parameters()) == 12 * d * d + 2 * d)      # True
x = torch.randn(1, 10, d); y = block(x)
x2 = x.clone(); x2[0, 5] += 1.0; y2 = block(x2)
print(torch.allclose(y[0, :5], y2[0, :5]), torch.allclose(y[0, 5:], y2[0, 5:]))   # True False
```

(a) 两个 $d\times4d$ 矩阵给出 $8d^2$，与三个 $d\times\frac83d$ 矩阵相同；增益另加 $2d$。(b) 改动词元 $5$ 会改变位置 $5$ 及之后的输出，但不改变 $0$–$4$，正如 [[transformers/multi-head-attention#prop-causal]] 所要求的那样。
:::
:::

::: exercise post-norm 与 pre-norm {level=3}
在后置归一化网络中，$\mathbf{x}_{\ell+1} = \operatorname{Norm}(\mathbf{x}_\ell + F_\ell(\mathbf{x}_\ell))$。写出雅可比矩阵 $\partial\mathbf{x}_{\ell+1}/\partial\mathbf{x}_\ell$，并解释为什么 [[#prop-identity]] 的恒等项不再原封不动地到达早期各层。为什么这使得学习率预热变得重要？
::: solution
$\partial\mathbf{x}_{\ell+1}/\partial\mathbf{x}_\ell = N_\ell\,(I + J_\ell)$，其中 $N_\ell$ 是归一化在 $\mathbf{x}_\ell + F_\ell(\mathbf{x}_\ell)$ 处的雅可比矩阵。沿层的乘积为 $N_{L-1}(I + J_{L-1})\cdots N_\ell(I + J_\ell)$，于是即便其中的"恒等"部分也是归一化雅可比的乘积 $N_{L-1}\cdots N_\ell$，它在每一层都要重新缩放并作投影（去掉均值方向）。于是靠近输出的梯度远大于靠近输入的梯度——Xiong et al.（2020）证明，后置归一化 Transformer 在初始化时最后几层的梯度很大——所以一开始就用全量学习率，会在较低层还没学到任何东西之前就把较高的层带偏。预热把最初的步长压小，直到网络进入条件更好的区域；前置归一化保持恒等路径干净，在很大程度上免除了预热的必要。
:::
:::
