$n$ 元模型（[[text-and-language/ngram-models]]）用最近 $n - 1$ 个词元构成的窗口预测下一个词元，窗口之前的一切都被忘掉。把窗口加宽是没有出路的：可能的上下文数目按 $\lvert\mathcal{V}\rvert^{n-1}$ 增长，所以几乎所有长上下文都不曾出现过。前馈神经语言模型借助嵌入在相似上下文之间共享统计强度，但它的窗口仍然是固定的。**循环神经网络**（RNN）走的是另一条路：一次读入一个词元，并携带一个**隐藏状态**——一个固定长度的向量，每一步都被更新，意在概括到目前为止读到的一切。每个位置使用同一套权重，因此一个网络就能处理任意长度的序列，它的预测原则上可以依赖任意久远的词元。

本章定义简单（Elman）循环网络，把它展开成一个普通的计算图，改造成语言模型，并从[[neural-networks/backpropagation]]的反向传播导出它的训练算法——**随时间反向传播**（BPTT）。这一推导暴露出一个雅可比矩阵的乘积，其大小决定了早期词元的信息到底能不能影响学习；这个乘积会出什么问题、门控单元如何补救，正是下一章[[sequence-models/long-range-dependencies]]的主题。最后我们给出一个用纯 Python 写成、经过梯度检查的完整 RNN 语言模型，它在玩具语料上的失败预告了那个问题。

## 循环递推 {#sec-recurrence}

把输入序列写成向量 $\mathbf{x}_1, \dots, \mathbf{x}_T\in\R^{d}$——对文本来说就是词元的嵌入（或独热向量，此时输入权重矩阵**就是**嵌入表）。

::: definition 简单循环网络 {#def-elman}
隐藏维度为 $H$ 的**简单循环网络**（Elman 网络）带有参数 $W_{xh}\in\R^{H\times d}$、$W_{hh}\in\R^{H\times H}$、$\mathbf{b}_h\in\R^H$、$W_{hy}\in\R^{K\times H}$、$\mathbf{b}_y\in\R^K$ 和初始状态 $\mathbf{h}_0$（通常取 $\mathbf{0}$）。对 $t = 1, \dots, T$，它计算

$$
\mathbf{a}_t = W_{hh}\mathbf{h}_{t-1} + W_{xh}\mathbf{x}_t + \mathbf{b}_h,\qquad
\mathbf{h}_t = \tanh(\mathbf{a}_t),\qquad
\mathbf{z}_t = W_{hy}\mathbf{h}_t + \mathbf{b}_y ,
$$ {#eq-elman}

其中 $\tanh$ 逐分量作用。向量 $\mathbf{h}_t\in\R^H$ 称为第 $t$ 步的**隐藏状态**，$\mathbf{z}_t\in\R^K$ 是第 $t$ 步的输出（logits）。
:::

有三条性质使它成为深度学习的基本序列模型。

- **沿时间共享权重。** 每一步起作用的都是同一套 $W_{hh}$、$W_{xh}$、$W_{hy}$，就像卷积在每个位置使用同一个核（[[neural-networks/convolutional-networks]]）。参数个数 $H^2 + Hd + HK + H + K$ 不依赖 $T$。
- **固定长度的状态。** 网络关于 $\mathbf{x}_1, \dots, \mathbf{x}_t$ 所能用到的一切都必须装进 $H$ 个数里。这既是瓶颈也是优点：每一步的代价不随过去的长度增长。
- **顺序计算。** $\mathbf{h}_t$ 需要 $\mathbf{h}_{t-1}$，所以一个序列的 $T$ 步无法并行计算。一步之内的矩阵乘法、以及一个批次中不同的序列，可以。

这个更新是一个由输入驱动的非线性动力系统。它的表达能力原则上相当强：Siegelmann 和 Sontag（1995）证明，一个取有理权重、饱和线性激活、数值精度不受限制的循环网络可以模拟任何图灵机。在有限精度和有限训练数据之下，这个结论对训练出来的网络实际会做什么几乎什么也没有说，而后者才是本课程关心的实际问题。

::: example 手工做一次前向传播 {#ex-forward}
取标量 RNN（$H = d = 1$），$w_{hh} = 0.5$、$w_{xh} = 1$、$b_h = 0$、$h_0 = 0$，输入 $x = (1, -1, 2)$。计算 $h_1, h_2, h_3$。
::: solution
$h_1 = \tanh(0.5\cdot0 + 1) = \tanh 1 = 0.761594$。
$h_2 = \tanh(0.5\cdot0.761594 - 1) = \tanh(-0.619203) = -0.550573$。
$h_3 = \tanh(0.5\cdot(-0.550573) + 2) = \tanh(1.724714) = 0.938428$。

第 3 步的状态依赖于全部三个输入，但越往回权重越小：改变 $x_1$ 只能通过两次乘以 $w_{hh} = 0.5$ 和两次 tanh 斜率去改变 $h_3$。这就是[[#sec-jacobians]]将要研究的衰减的第一次显露。
:::
:::

### 展开 {#sec-unrolling}

对给定长度 $T$，这个递推可以写成一个前馈计算图，其中每个时间步放一份该单元的拷贝、共 $T$ 份，全部共享同一套参数。这个**展开**后的图（[[neural-networks/backpropagation#def-graph]]）是无环的，所以我们关于反向传播知道的一切都适用于它；唯一新的特点是，一个参数要喂给许多节点。

::: widget graph
nodes: h0@0,1; x1@1,0; h1@1,1; y1@1,2; x2@2,0; h2@2,1; y2@2,2; x3@3,0; h3@3,1; y3@3,2; L@4,2.6
edges: h0>h1; x1>h1; h1>y1; h1>h2; x2>h2; h2>y2; h2>h3; x3>h3; h3>y3; y1>L; y2>L; y3>L
algorithm: topo
start: h0
caption: 在三个时间步上展开的 RNN。每个 $h_t$ 都由同一个单元从 $h_{t-1}$ 和 $x_t$ 算出，每个输出 $y_t$（logits 与该步的损失）由 $h_t$ 算出，总损失 $L$ 把各步损失相加。按拓扑排序逐步走一遍：前向传播必须依次访问 $h_1, h_2, h_3$。随时间反向传播则逆序访问它们，而 $h_1$ 有两个孩子（$y_1$ 和 $h_2$），所以它的梯度既从自己的输出收集一份贡献，也从未来收集一份。
:::

展开还显示了同一个单元支持的几种计算形态。**多对一**网络读入整个序列，只用 $\mathbf{h}_T$（情感分类）。**多对多**网络每一步都输出（给每个词标注词性，或预测下一个词元）。**一对多**网络从单个输入出发——早期的图像描述生成模型把图像嵌入作为 $\mathbf{h}_0$——输出一段序列。[[sequence-models/seq2seq]] 的编码器-解码器把一个多对一的读者和一个一对多的写作者串联起来。

## 循环语言模型 {#sec-lm}

语言模型用链式法则把词元序列的概率分解为 $p(x_1, \dots, x_T) = \prod_tp(x_t\mid x_{<t})$。RNN 用它的状态给出每一个条件概率。

::: definition RNN 语言模型 {#def-rnnlm}
词表为 $\mathcal{V}$ 的**RNN 语言模型**把每个词元的嵌入 $\mathbf{x}_t = E[x_t]$ 送入有 $K = \lvert\mathcal{V}\rvert$ 个输出的递推[[#eq-elman]]，并从 logits 的 softmax 读出下一个词元的分布：

$$
p_\theta(x_{t+1} = v\mid x_{\le t}) = \operatorname{softmax}(\mathbf{z}_t)_v .
$$

它的训练是最小化训练序列的交叉熵之和，

$$
\mathcal{L}(\theta) = \sum_{t=1}^{T}\ell_t,\qquad \ell_t = -\log p_\theta(x_{t+1}\mid x_{\le t}),
$$ {#eq-lm-loss}

评测则用留出文本上的困惑度 $\exp(\mathcal{L}/T)$（[[text-and-language/perplexity]]）。
:::

训练时第 $t + 1$ 步的输入是数据里的真实词元 $x_{t+1}$，而不是模型自己的预测；这就是**教师强制**，它让一次对序列的前向传播就得到全部 $T$ 个损失。生成时没有数据可用：模型从自己的分布采样 $x_{t+1}$ 并喂回给自己。这两种机制之间的错位称为**暴露偏差**，在[[sequence-models/seq2seq]]与[[sequence-models/decoding-basics]]中讨论。

$n$ 元模型需要为每个上下文单独计数，而 RNN 共享一切：嵌入把相似的词元放在附近，递推把相似的历史映成相似的状态。Mikolov 等人（2010）报告，循环语言模型相比平滑的 $n$ 元模型大幅降低了困惑度，并在语音识别中降低了词错误率；直到 Transformer 出现之前，RNN（后来是 LSTM）一直是标准的神经语言模型。

::: example 数一数参数 {#ex-params}
一个词级 RNN 语言模型有 $\lvert\mathcal{V}\rvert = 10{,}000$、嵌入维度 $d = 256$、$H = 512$。它一共有多少参数，分别在哪里？
::: solution
嵌入 $E$：$10{,}000\times256 = 2{,}560{,}000$。循环单元：$W_{xh}$ 是 $512\times256 = 131{,}072$，$W_{hh}$ 是 $512^2 = 262{,}144$，$\mathbf{b}_h$ 是 $512$，合计 $393{,}728$。输出层：$W_{hy}$ 是 $10{,}000\times512 = 5{,}120{,}000$，外加 $10{,}000$ 个偏置。总计 $8{,}083{,}728$。

递推本身还占不到模型的 $5\%$，按词表规模取胜的输入、输出矩阵才是大头。这正是**权重绑定**（weight tying，把 $E$ 用作输出矩阵，需要 $H = d$ 或加一个投影；Press and Wolf, 2017；Inan et al., 2017）能省下这么多的原因。作为对比，同一词表上的三元模型有 $10^{12}$ 种可能的“上下文-接续”组合，语料库能填上的只是其中迅速趋于零的一部分。
:::
:::

## 随时间反向传播 {#sec-bptt}

训练需要 $\partial\mathcal{L}/\partial\theta$。由于展开后的网络是一张普通计算图，对它施加反向传播——名为**随时间反向传播**（Werbos, 1990；Rumelhart, Hinton and Williams, 1986）——就能精确算出梯度。有意思的是结果的结构。

记 $\boldsymbol\delta_t = \partial\mathcal{L}/\partial\mathbf{a}_t\in\R^H$ 为第 $t$ 步预激活处的误差，$\mathbf{g}_t = \partial\ell_t/\partial\mathbf{z}_t = \mathbf{p}_t - \mathbf{e}_{x_{t+1}}$ 为第 $t$ 步的输出误差（预测减去独热目标，[[neural-networks/backpropagation#thm-mlp-backprop]]）。

::: theorem 随时间反向传播 {#thm-bptt}
对网络[[#eq-elman]]与损失[[#eq-lm-loss]]，定义 $\boldsymbol\delta_{T+1} = \mathbf{0}$，并对 $t = T, T - 1, \dots, 1$ 令

$$
\bar{\mathbf{h}}_t = W_{hy}^\top\mathbf{g}_t + W_{hh}^\top\boldsymbol\delta_{t+1},\qquad
\boldsymbol\delta_t = \bar{\mathbf{h}}_t\odot\big(1 - \mathbf{h}_t\odot\mathbf{h}_t\big).
$$ {#eq-bptt}

于是梯度是沿时间的和，

$$
\frac{\partial\mathcal{L}}{\partial W_{hy}} = \sum_{t=1}^T\mathbf{g}_t\mathbf{h}_t^\top,\quad
\frac{\partial\mathcal{L}}{\partial W_{hh}} = \sum_{t=1}^T\boldsymbol\delta_t\mathbf{h}_{t-1}^\top,\quad
\frac{\partial\mathcal{L}}{\partial W_{xh}} = \sum_{t=1}^T\boldsymbol\delta_t\mathbf{x}_t^\top,\quad
\frac{\partial\mathcal{L}}{\partial\mathbf{b}_h} = \sum_{t=1}^T\boldsymbol\delta_t,
$$ {#eq-bptt-grads}

且 $\partial\mathcal{L}/\partial\mathbf{b}_y = \sum_t\mathbf{g}_t$。对嵌入输入，把 $\partial\mathcal{L}/\partial\mathbf{x}_t = W_{xh}^\top\boldsymbol\delta_t$ 加到 $E$ 的第 $x_t$ 行上。
:::

::: proof
把[[neural-networks/backpropagation#thm-backprop]]按逆拓扑序作用到展开图上。隐藏状态 $\mathbf{h}_t$ 有两个孩子：logits $\mathbf{z}_t = W_{hy}\mathbf{h}_t + \mathbf{b}_y$，以及下一个预激活 $\mathbf{a}_{t+1} = W_{hh}\mathbf{h}_t + W_{xh}\mathbf{x}_{t+1} + \mathbf{b}_h$（当 $t < T$）。由扇出法则，它的伴随是两个向量-雅可比乘积之和：$\bar{\mathbf{h}}_t = W_{hy}^\top\bar{\mathbf{z}}_t + W_{hh}^\top\bar{\mathbf{a}}_{t+1}$。只有 $\ell_t$ 依赖 $\mathbf{z}_t$，故 $\bar{\mathbf{z}}_t = \mathbf{g}_t$；而 $\bar{\mathbf{a}}_{t+1} = \boldsymbol\delta_{t+1}$，当 $t = T$ 时为 $\mathbf{0}$，因为最后一步之后什么都不接。其次，$\mathbf{h}_t = \tanh(\mathbf{a}_t)$ 逐分量作用，且 $\tanh' = 1 - \tanh^2$，所以 $\boldsymbol\delta_t = \bar{\mathbf{h}}_t\odot(1 - \mathbf{h}_t^2)$。按 $t = T, \dots, 1$ 的这个次序处理，可保证计算 $\bar{\mathbf{h}}_t$ 时 $\boldsymbol\delta_{t+1}$ 已经知道。

对权重：每个参数每一步使用一次，所以它的伴随是各步局部贡献之和。在第 $t$ 步，$\mathbf{a}_t$ 通过 $W_{hh}\mathbf{h}_{t-1}$ 依赖 $W_{hh}$，它与 $\boldsymbol\delta_t$ 的向量-雅可比乘积是外积 $\boldsymbol\delta_t\mathbf{h}_{t-1}^\top$（与线性层相同）；类似地，$W_{xh}$ 得 $\boldsymbol\delta_t\mathbf{x}_t^\top$，$\mathbf{b}_h$ 得 $\boldsymbol\delta_t$，$W_{hy}$ 得 $\mathbf{g}_t\mathbf{h}_t^\top$，$\mathbf{b}_y$ 得 $\mathbf{g}_t$。对 $t$ 求和即得[[#eq-bptt-grads]]。
:::

递推[[#eq-bptt]]本身是第二个循环网络，沿时间倒着运行：它的状态 $\boldsymbol\delta_t$ 由输出误差 $\mathbf{g}_t$ 驱动，被转置后的循环矩阵传播，每一步再被 tanh 斜率门控。它用到的一切——所有 $t$ 的 $\mathbf{h}_t$——都来自前向传播，所以 BPTT 必须存下隐藏状态的完整序列：除前向与反向两趟 $O(TH^2 + TH\lvert\mathcal{V}\rvert)$ 的算术之外，每个序列还要 $O(TH)$ 的内存。

::: example 手算一次 BPTT {#ex-bptt-scalar}
在[[#ex-forward]]中，只在最后一步放损失 $\mathcal{L} = \frac12(h_3 - y)^2$，$y = 0.5$。按[[#thm-bptt]]计算 $\partial\mathcal{L}/\partial w_{hh}$，并做数值检验。
::: solution
标量情形下 $\bar h_t = g_t + w_{hh}\delta_{t+1}$，其中 $g_3 = h_3 - y = 0.438428$，$g_1 = g_2 = 0$。

- $t = 3$：$\bar h_3 = 0.438428$，$\delta_3 = 0.438428\,(1 - 0.938428^2) = 0.052328$；贡献 $\delta_3h_2 = 0.052328\cdot(-0.550573) = -0.028810$。
- $t = 2$：$\bar h_2 = 0.5\cdot0.052328 = 0.026164$，$\delta_2 = 0.026164\,(1 - 0.550573^2) = 0.018233$；贡献 $\delta_2h_1 = 0.018233\cdot0.761594 = 0.013886$。
- $t = 1$：$\bar h_1 = 0.5\cdot0.018233 = 0.009116$，$\delta_1 = 0.003829$；贡献 $\delta_1h_0 = 0$。

所以 $\partial\mathcal{L}/\partial w_{hh} = -0.028810 + 0.013886 + 0 = -0.014924$。步长 $10^{-6}$ 的中心差分给出 $-0.0149242$，二者吻合。注意误差在回溯途中如何缩小：$\delta_3 = 0.052$、$\delta_2 = 0.018$、$\delta_1 = 0.0038$——每一步都把它乘上 $w_{hh}$ 和一个 tanh 斜率。两项贡献还符号相反：调低 $w_{hh}$，从 $h_2$ 对 $h_3$ 的直接影响看是帮忙，从它对 $h_2$ 自身的影响看却是拆台。
:::
:::

### 雅可比乘积 {#sec-jacobians}

把递推[[#eq-bptt]]展开，就显示出路上的第 $t$ 步损失如何抵达更早的第 $k$ 步状态。记 $D_s = \operatorname{diag}(1 - \mathbf{h}_s^2)$ 为第 $s$ 步的 tanh 斜率；则 $\partial\mathbf{h}_s/\partial\mathbf{h}_{s-1} = D_sW_{hh}$。

::: proposition 长程梯度是雅可比乘积 {#prop-jacobian}
对 $k < t$，

$$
\frac{\partial\ell_t}{\partial\mathbf{h}_k} = \Big(\prod_{s=k+1}^{t}D_sW_{hh}\Big)^{\!\top}\frac{\partial\ell_t}{\partial\mathbf{h}_t},\qquad
\Big\lVert\frac{\partial\mathbf{h}_t}{\partial\mathbf{h}_k}\Big\rVert\le\big(\gamma\,\sigma_{\max}(W_{hh})\big)^{t-k},
$$ {#eq-jacobian}

其中乘积按后来的步在左边的次序排列，$\sigma_{\max}$ 是最大奇异值，$\gamma = \max_s\max_i(1 - h_{s,i}^2)\le1$ 是 tanh 斜率的上界。
:::

::: proof
$\mathbf{h}_t$ 只通过链 $\mathbf{h}_k\to\mathbf{h}_{k+1}\to\dots\to\mathbf{h}_t$ 依赖 $\mathbf{h}_k$，所以链式法则给出 $\partial\mathbf{h}_t/\partial\mathbf{h}_k = \prod_{s=k+1}^{t}\partial\mathbf{h}_s/\partial\mathbf{h}_{s-1}$，而对 $\tanh(W_{hh}\mathbf{h}_{s-1} + \dots)$ 求导可知每个因子都是 $D_sW_{hh}$。梯度就是转置雅可比作用在 $\partial\ell_t/\partial\mathbf{h}_t$ 上。对界而言，谱范数次乘性成立，对角矩阵满足 $\lVert D_s\rVert = \max_i(1 - h_{s,i}^2)\le\gamma$，且 $\lVert W_{hh}\rVert = \sigma_{\max}(W_{hh})$。
:::

关于 $W_{hh}$ 的总梯度是对所有满足 $k\le t$ 的配对求和，每一项都含有这个 $t - k$ 个因子的乘积。若 $\gamma\sigma_{\max} < 1$，联系相距很远的两步的那些项按几何速率缩小：网络几乎收不到任何信号，告诉它要把第 $k$ 步的信息留到第 $t\gg k$ 步用。这就是**梯度消失**问题。若该乘积反而增长——当 $\sigma_{\max} > 1$ 且单元不饱和时是可能的——梯度就会**爆炸**。Hochreiter（1991）以及 Bengio、Simard 和 Frasconi（1994）指出了这两种情形；[[sequence-models/long-range-dependencies]] 展开分析并给出补救办法。下图展示线性标量递推 $h_t = \lambda h_{t-1}$ 的基本算术，此时因子恰为 $\lambda^{t-k}$。

::: widget plot
f: log10(abs(lam)^x); log10(abs(lam)^x*g^x)
x: 0, 100
y: -12, 6
sliders: lam=0.95:0.5:1.5:0.01; g=0.8:0.3:1:0.01
labels: \log_{10}\lvert\lambda\rvert^{t-k}\ \text{（线性）}; \text{每步再乘 tanh 斜率 } g
hlines: 0
caption: 第 $k$ 步与第 $t$ 步之间的梯度因子随距离 $t - k$（横轴）的变化，取对数尺度。$\lvert\lambda\rvert = 0.95$ 时，$100$ 步后的因子是 $0.95^{100}\approx0.006$；$\lambda = 1.05$ 时约为 $131$。平均 tanh 斜率 $g < 1$ 会再乘上去，把曲线压得更低。只有每步因子恰为 $1$，才能让远处的梯度保持原样——这正是 LSTM 细胞状态背后的思想。
:::

## 代价与截断 {#sec-truncation}

对长度 $T$ 的序列做一次前向加一次反向传播，需要 $O\big(T(Hd + H^2 + H\lvert\mathcal{V}\rvert)\big)$ 的算术，并存储 $O(T(H + \lvert\mathcal{V}\rvert))$ 的激活（概率 $\mathbf{p}_t$ 可以重新计算）。对一篇长文档——一本书有数百万词元——内存和“每份文档才更新一次”的延迟都难以接受。

::: definition 截断 BPTT {#def-tbptt}
窗口为 $T_w$ 的**截断随时间反向传播**把长序列切成一连串 $T_w$ 个词元的窗口。前向传播连续地跑，把隐藏状态从一个窗口的末尾带入下一个窗口的开头；反向传播和参数更新则对每个窗口单独进行，并把带入的状态当作常数（它的梯度不往回传到上一个窗口）。
:::

截断让前向计算保持精确——状态仍然跨越窗口边界携带信息——但梯度无法传回当前窗口起点之前。因此，比 $T_w$ 更长的依赖只有当某个因短程原因学到的东西恰好把它保留下来时才可能被**用上**；梯度永远不会要求网络去存储它。Williams 和 Peng（1990）分析了这类方案；2010 年代的 RNN 语言模型通常使用几十个到几百个词元的窗口（Zaremba, Sutskever and Vinyals, 2014 用的是 $35$）。另一种办法**实时循环学习**（real-time recurrent learning，Williams and Zipser, 1989）把完整导数 $\partial\mathbf{h}_t/\partial\theta$ 一路向前携带、不需要反向传播，但稠密网络每步要 $O(H^4)$，所以很少使用。

::: example 一个训练步的代价 {#ex-cost}
对[[#ex-params]]的模型，估计每个词元的前向 FLOPs，以及 $T_w = 35$、批次 $32$ 条序列在 32 位浮点下存储 $\mathbf{h}_t$ 和 logits $\mathbf{z}_t$ 所需的激活内存。
::: solution
每次乘加按 $2$ 个 FLOPs 计，一个词元的前向要 $2(Hd + H^2 + H\lvert\mathcal{V}\rvert) = 2(131{,}072 + 262{,}144 + 5{,}120{,}000)\approx1.10\times10^7$ FLOPs，约 $11$ MFLOPs——又是输出层占大头。反向传播约需两倍的量（[[neural-networks/backpropagation#prop-flops]]）。内存：$32\cdot35 = 1{,}120$ 个位置，每个位置 $512 + 10{,}000$ 个 4 字节浮点数，约 $47$ MB。只存隐藏状态的话只需 $2.3$ MB；昂贵的是 logits，所以实现里常把 softmax 损失分块计算。
:::
:::

::: quiz
截断 BPTT 取窗口 $T_w = 20$，隐藏状态跨过窗口边界被携带。下列说法哪个正确？
- [ ] 模型完全无法使用 20 个词元以前的任何信息。
- [x] 前向传播能把 20 个词元以前的信息带过来，但没有任何梯度教网络去保留这样的信息。
- [ ] 只要隐藏状态被携带过来，梯度就是精确的。
- [ ] 截断只改变训练速度，不改变能学到的东西。
::: solution
被携带的状态是整个过去的函数，所以信息可以跨过边界存活；但反向传播停在窗口起点，把进入的状态当作常数。这个梯度属于另一个**目标函数**，在那个目标里，长于窗口的依赖不带任何学习信号。[[#sec-code]]的清单显示了后果。
:::
:::

## 实现 {#sec-code}

下面的清单用纯 Python 在一个两句话的语料上训练一个字符级 RNN 语言模型。它直接实现[[#thm-bptt]]，把三个梯度分量与中心差分对照检查，并用截断 BPTT（$T_w = 16$）、朴素 SGD 和全局梯度范数到 $5$ 的裁剪（[[neural-networks/optimisers#def-clipping]]）训练。

```python
import math, random

text = "the cat sat on the mat. the dog sat on the log. "
chars = sorted(set(text)); V = len(chars)
ix = {c: i for i, c in enumerate(chars)}
data = [ix[c] for c in text * 2]              # 一条周期流

H = 16                                     # 隐藏维度
rng = random.Random(0)
def mat(r, c, s): return [[rng.gauss(0, s) for _ in range(c)] for _ in range(r)]
P = {"Wxh": mat(H, V, 0.1),                # (H, V)  输入权重
     "Whh": mat(H, H, 1 / math.sqrt(H)),   # (H, H)  循环权重
     "Why": mat(V, H, 0.1),                # (V, H)  输出权重
     "bh": [0.0] * H, "by": [0.0] * V}

def mv(M, v): return [sum(m * x for m, x in zip(row, v)) for row in M]

def forward_backward(P, xs, ys, h0):
    """xs, ys: lists of T token ids; h0: (H,). Returns loss, grads, last h."""
    hs, ps, loss = {-1: h0}, {}, 0.0
    for t, (x, y) in enumerate(zip(xs, ys)):              # 前向
        a = [P["Wxh"][i][x] + w + b for i, (w, b) in
             enumerate(zip(mv(P["Whh"], hs[t - 1]), P["bh"]))]
        hs[t] = [math.tanh(v) for v in a]                  # (H,)
        z = [u + b for u, b in zip(mv(P["Why"], hs[t]), P["by"])]   # (V,)
        m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e)
        ps[t] = [v / s for v in e]                         # softmax (V,)
        loss -= math.log(ps[t][y])
    G = {k: ([[0.0] * len(v[0]) for _ in v] if isinstance(v[0], list)
             else [0.0] * len(v)) for k, v in P.items()}
    dh_next = [0.0] * H                                    # W_hh^T delta_{t+1}
    for t in reversed(range(len(xs))):                     # 沿时间反向传播
        dz = ps[t][:]; dz[ys[t]] -= 1.0                    # g_t = p_t - e_y  (V,)
        for k in range(V):
            G["by"][k] += dz[k]
            for j in range(H): G["Why"][k][j] += dz[k] * hs[t][j]
        dh = [sum(P["Why"][k][j] * dz[k] for k in range(V)) + dh_next[j]
              for j in range(H)]                           # h-bar_t  (H,)
        da = [d * (1 - h * h) for d, h in zip(dh, hs[t])]  # delta_t  (H,)
        for i in range(H):
            G["bh"][i] += da[i]; G["Wxh"][i][xs[t]] += da[i]
            for j in range(H): G["Whh"][i][j] += da[i] * hs[t - 1][j]
        dh_next = [sum(P["Whh"][i][j] * da[i] for i in range(H)) for j in range(H)]
    return loss, G, hs[len(xs) - 1]

# --- 在一个短窗口上做梯度检查 ---------------------------------------
xs, ys = data[:8], data[1:9]
loss, G, _ = forward_backward(P, xs, ys, [0.0] * H)
for name, i, j in [("Whh", 3, 5), ("Wxh", 0, ix["t"]), ("Why", 2, 7)]:
    old = P[name][i][j]; eps = 1e-5
    P[name][i][j] = old + eps; lp = forward_backward(P, xs, ys, [0.0] * H)[0]
    P[name][i][j] = old - eps; lm = forward_backward(P, xs, ys, [0.0] * H)[0]
    P[name][i][j] = old
    num = (lp - lm) / (2 * eps)
    print(f"{name}[{i}][{j}]  bptt {G[name][i][j]: .8f}  numeric {num: .8f}")

# --- 训练：连续窗口上的截断 BPTT，SGD + 裁剪 ------------
T, lr, h, hist = 16, 0.1, [0.0] * H, []
print(f"V = {V}, initial loss per char = {loss / len(xs):.3f} (log V = {math.log(V):.3f})")
for step in range(3003):
    p = (step * T) % len(text)                              # 窗口首尾相接
    loss, G, h = forward_backward(P, data[p:p + T], data[p + 1:p + T + 1], h)
    norm = math.sqrt(sum(g * g for v in G.values() for r in v
                         for g in (r if isinstance(r, list) else [r])))
    c = min(1.0, 5.0 / norm)                                # 全局范数裁剪到 5
    for k in P:
        if isinstance(P[k][0], list):
            for r, gr in zip(P[k], G[k]):
                for j in range(len(r)): r[j] -= lr * c * gr[j]
        else:
            for j in range(len(P[k])): P[k][j] -= lr * c * G[k][j]
    hist.append(loss / T)
    if step % 1000 == 2:                                    # 一遍（3 个窗口）上的均值
        m = sum(hist[-3:]) / 3
        print(f"step {step:4d}  loss/char {m:.3f}  perplexity {math.exp(m):.2f}")

# --- 给定前缀后的贪心生成 -----------------------------------------
def step_h(h, x):
    a = [P["Wxh"][i][x] + w + b for i, (w, b) in enumerate(zip(mv(P["Whh"], h), P["bh"]))]
    return [math.tanh(v) for v in a]
for prompt in ["the cat sat on the ", "the dog sat on the "]:
    h = [0.0] * H
    for ch in prompt: h = step_h(h, ix[ch])
    z = [u + b for u, b in zip(mv(P["Why"], h), P["by"])]
    e = [math.exp(v - max(z)) for v in z]
    print(f"after {prompt!r}: p(m) = {e[ix['m']] / sum(e):.3f}, p(l) = {e[ix['l']] / sum(e):.3f}")
    out = prompt
    for _ in range(12):
        z = [u + b for u, b in zip(mv(P["Why"], h), P["by"])]
        x = max(range(V), key=lambda k: z[k])               # 最可能的下一个字符
        out += chars[x]; h = step_h(h, x)
    print(repr(out))
```

它的输出（Python 3，约十秒）：

```
Whh[3][5]  bptt  0.09506486  numeric  0.09506486
Wxh[0][13]  bptt  0.11786848  numeric  0.11786848
Why[2][7]  bptt  0.03650066  numeric  0.03650066
V = 14, initial loss per char = 2.622 (log V = 2.639)
step    2  loss/char 2.528  perplexity 12.53
step 1002  loss/char 0.038  perplexity 1.04
step 2002  loss/char 0.035  perplexity 1.04
step 3002  loss/char 0.034  perplexity 1.03
after 'the cat sat on the ': p(m) = 0.451, p(l) = 0.541
'the cat sat on the log. the cat'
after 'the dog sat on the ': p(m) = 0.451, p(l) = 0.541
'the dog sat on the log. the cat'
```

梯度与有限差分在打印出的全部八位数字上都一致，初始损失接近 $\log V$——对于输出起初几乎均匀的网络，这正是应有的表现（[[neural-networks/training-practice#prop-initial-loss]]）。训练把损失降到每字符 $0.034$ 纳特，但没有降到零，生成的文本说明了原因：在 “the cat sat on the ” 之后和 “the dog sat on the ” 之后，模型给 “m” 和 “l” 的概率完全相同。主语出现在决定之前 $14$ 个字符处，而按清单里窗口的对齐方式（窗口从 $48$ 字符文本的第 $0$、$16$、$32$ 个字符开始），主语和决策点永远落在**不同**的窗口里。梯度从未把两者连在一起，于是网络从未学会把主语保持在状态中——正是上面测验的情形。一个对文本里两处二选一（“mat”/“log”，以及句号之后的 “cat”/“dog”）都瞎猜的模型，每字符付 $2\ln2/48\approx0.029$ 纳特，接近观察到的下限。

::: warning 循环网络拥有“无限的上下文”
递推让 $\mathbf{h}_t$ 可以依赖每一个更早的词元，于是很容易下结论说 RNN 用到了它全部的上下文。实际上它**能**用到的东西受三样东西限制：$H$ 维状态的容量、长程梯度的消失（[[#prop-jacobian]]）、以及训练的截断窗口。对训练好的 LSTM 语言模型的测量发现，它们大约用到最近 $200$ 个词元的上下文，语序方面则主要在最近 $50$ 个词元之内（Khandelwal et al., 2018）。“原则上无限”与“实际用到”是两个不同的说法。
:::

## 更深与双向的网络 {#sec-variants}

[[#def-elman]]的两个推广在 RNN 时代是标准做法，并在[[sequence-models/contextual-embeddings]]中再度出现。

**堆叠。** 一个**深层**（堆叠）RNN 把第 $\ell$ 层的隐藏状态作为第 $\ell + 1$ 层的输入：$\mathbf{h}^{(\ell)}_t = \tanh\big(W^{(\ell)}_{hh}\mathbf{h}^{(\ell)}_{t-1} + W^{(\ell)}_{xh}\mathbf{h}^{(\ell-1)}_t + \mathbf{b}^{(\ell)}\big)$，其中 $\mathbf{h}^{(0)}_t = \mathbf{x}_t$。典型层数是两到四层；Sutskever, Vinyals and Le（2014）做翻译用的是四层 LSTM。深度给每一步增加计算，时间给序列方向增加计算——一张单元的网格。

**双向化。** 当整个输入都可得时——标注、分类、为翻译而编码一个句子——没有任何理由强迫模型只从左往右读。**双向**RNN（Schuster and Paliwal, 1997）让一个 RNN 正向运行，从 $\mathbf{x}_1, \dots, \mathbf{x}_t$ 得到 $\overrightarrow{\mathbf{h}}_t$；另一个反向运行，从 $\mathbf{x}_T, \dots, \mathbf{x}_t$ 得到 $\overleftarrow{\mathbf{h}}_t$；再用拼接 $[\overrightarrow{\mathbf{h}}_t; \overleftarrow{\mathbf{h}}_t]$ 表示位置 $t$，它依赖于整个序列。双向网络不能充当从左到右的语言模型：位置 $t$ 的表示已经看见了 $x_{t+1}$。

::: example 一个双向表示 {#ex-birnn}
一个每个方向 $H = 256$ 的双向编码器读入 $T = 12$ 个词元的句子。它输出的形状是什么？词元 5 的表示依赖哪些输入？
::: solution
每个方向产生 $12$ 个长度 $256$ 的向量；拼接后，编码器输出是一个 $(12, 512)$ 的矩阵（若一个批次有 $B$ 个句子，则是 $(B, 12, 512)$）。词元 5 的向量 $[\overrightarrow{\mathbf{h}}_5; \overleftarrow{\mathbf{h}}_5]$ 的前半依赖词元 1–5，后半依赖词元 5–12——总共十二个都依赖。两半的计算彼此独立，所以可以并行运行，尽管每一半沿 $t$ 仍是顺序的。
:::
:::

::: history
循环连接和神经网络一样古老——McCulloch 和 Pitts（1943）就允许环路——Hopfield（1982）把对称循环网络用作联想记忆。在序列处理方面，Michael Jordan（1986）把网络的输出回送为输入；Jeffrey Elman 的《在时间中寻找结构》（“Finding Structure in Time”，Cognitive Science，1990）回送隐藏层，训练网络预测简单句子的下一个词，并发现其隐藏状态把词聚成了名词与动词、有生命与无生命几类——这是“预测下一个词会诱导出语言结构”的一次早期演示。用展开来训练由 Rumelhart、Hinton 和 Williams（1986）描述，Paul Werbos（《随时间反向传播：它在做什么、如何做》，Proceedings of the IEEE，1990）做了详述；Williams 和 Zipser（1989）给出了实时循环学习。Sepp Hochreiter 的 1991 年文凭论文（慕尼黑）以及 Bengio、Simard 和 Frasconi（1994）解释了为什么这种训练在长程依赖上会失败，由此引出了 LSTM。二十年之后，有了 GPU、梯度裁剪和更好的初始化，循环语言模型全面超过了 $n$ 元模型（Mikolov et al., 2010），Sutskever、Martens 和 Hinton（2011）与 Graves（2013）一次生成一个字符，写出了出人意料的流畅文本。
:::

::: summary
- **简单循环网络**用固定长度的隐藏状态 $\mathbf{h}_t = \tanh(W_{hh}\mathbf{h}_{t-1} + W_{xh}\mathbf{x}_t + \mathbf{b}_h)$ 更新，每一步使用同一套权重；每一步的代价不依赖于过去的长度，但各步是顺序的。
- **RNN 语言模型**预测 $p(x_{t+1}\mid x_{\le t}) = \operatorname{softmax}(W_{hy}\mathbf{h}_t + \mathbf{b}_y)$，用教师强制对交叉熵之和训练；其参数由按词表规模取胜的输入、输出矩阵主导。
- **随时间反向传播**就是反向传播作用在展开图上：一个反向递推 $\boldsymbol\delta_t = (W_{hy}^\top\mathbf{g}_t + W_{hh}^\top\boldsymbol\delta_{t+1})\odot(1 - \mathbf{h}_t^2)$，权重梯度沿时间求和。它要存下全部隐藏状态。
- 连接两步 $k < t$ 的梯度含有雅可比乘积 $\prod D_sW_{hh}$，被 $(\gamma\sigma_{\max})^{t-k}$ 控制：它随距离按几何速率消失或爆炸。
- **截断 BPTT** 让前向传播保持连续，但梯度在窗口边界处停止，于是长于窗口的依赖得不到学习信号。
- **堆叠** RNN 增加深度；**双向** RNN 用一个前向状态和一个后向状态表示每个位置、看得见整个输入，因此不能充当从左到右的语言模型。
:::

## 习题

::: exercise 参数计数 {level=1 check="6740"}
一个简单 RNN 的输入维度 $d = 20$、隐藏维度 $H = 64$、输出 $K = 20$ 个。它一共有多少参数，两个偏置向量都算上（$\mathbf{h}_0$ 不算）？
::: solution
$W_{xh}$：$64\cdot20 = 1{,}280$；$W_{hh}$：$64^2 = 4{,}096$；$\mathbf{b}_h$：$64$；$W_{hy}$：$20\cdot64 = 1{,}280$；$\mathbf{b}_y$：$20$。总计 $1{,}280 + 4{,}096 + 64 + 1{,}280 + 20 = 6{,}740$。这里循环矩阵 $W_{hh}$ 独占参数的 $61\%$，因为词表极小；换成现实的词表，输出层才是大头（[[#ex-params]]）。
:::
:::

::: exercise 展开后的深度 {level=1}
一个堆叠 $L = 3$ 层的 RNN 读入 $T = 50$ 个词元的序列。前向传播要做多少次循环单元的计算？展开图上从 $\mathbf{x}_1$ 到第 50 步输出的最长路径有多长？第二个数为什么对训练要紧？
::: solution
共有 $L\cdot T = 150$ 次单元计算。从 $\mathbf{x}_1$ 到 $\mathbf{z}_{50}$ 的最长路径沿三层向上、再沿时间前行：$3 + 49 = 52$ 次单元计算（竖向移动与横向移动的先后不影响计数）。第 50 步损失的梯度要传回 $\mathbf{x}_1$，就要经过约 $52$ 个雅可比的乘积，所以对这个依赖而言，展开后的网络深达 52 层前馈网络，带着同样的消失与爆炸风险——只不过是把同一个矩阵 $W_{hh}$ 沿时间重复使用，而不是彼此独立的各层。
:::
:::

::: exercise 两步前向传播 {level=1 check="tanh(0.5*tanh(1)+1)"}
标量 RNN 满足 $w_{hh} = 0.5$、$w_{xh} = 1$、$b_h = 0$、$h_0 = 0$，两个输入都等于 $1$。计算 $h_2$。
::: solution
$h_1 = \tanh(1) = 0.761594$，$h_2 = \tanh(0.5\cdot0.761594 + 1) = \tanh(1.380797) = 0.881$。
:::
:::

::: exercise 每步都有损失时的梯度 {level=2}
在[[#ex-forward]]中，令损失为 $\mathcal{L} = \frac12\sum_{t=1}^3(h_t - y_t)^2$，$y = (0, 0, 0.5)$。计算 $\delta_3$、$\delta_2$、$\delta_1$ 和 $\partial\mathcal{L}/\partial w_{hh}$。
::: solution
现在 $g_t = h_t - y_t$：$g_1 = 0.761594$、$g_2 = -0.550573$、$g_3 = 0.438428$。反向：
$\delta_3 = 0.438428\cdot(1 - 0.938428^2) = 0.052328$。
$\bar h_2 = g_2 + 0.5\,\delta_3 = -0.550573 + 0.026164 = -0.524409$，$\delta_2 = -0.524409\cdot(1 - 0.303131) = -0.365445$。
$\bar h_1 = g_1 + 0.5\,\delta_2 = 0.761594 - 0.182723 = 0.578871$，$\delta_1 = 0.578871\cdot(1 - 0.580026) = 0.243111$。
于是 $\partial\mathcal{L}/\partial w_{hh} = \delta_3h_2 + \delta_2h_1 + \delta_1h_0 = -0.028810 - 0.278321 + 0 = -0.307131$。中间各步的损失现在占了主导：$\delta_2$ 主要是第 2 步自身的误差，而不是从第 3 步传回来的误差。
:::
:::

::: exercise 爆炸与消失的因子 {level=2 check="log(1e-6)/log(0.9)"}
线性递推 $\mathbf{h}_t = W\mathbf{h}_{t-1}$ 中 $W$ 对称、特征值最大模为 $0.9$。经过多少步（取实数），$\lVert\partial\mathbf{h}_t/\partial\mathbf{h}_0\rVert$ 的界会跌到 $10^{-6}$？若最大特征值是 $1.1$ 又会怎样？
::: solution
对称矩阵有 $\lVert W^n\rVert = 0.9^n$，在 $n = \ln10^{-6}/\ln0.9\approx131.1$ 步处等于 $10^{-6}$。最大特征值为 $1.1$ 时 $\lVert W^n\rVert = 1.1^n$，在 $\ln10^6/\ln1.1\approx145$ 步后超过 $10^{6}$：第 $t$ 步还是 $1$ 的梯度，到第 $0$ 步就成了以一百万计。真实的 RNN 还带着 tanh 斜率，只会让因子更小；这就是为什么梯度爆炸需要单元工作在它的线性区间内。
:::
:::

::: exercise 为什么概率相等 {level=2}
在[[#sec-code]]的输出里，两个前缀给出的概率 $p(\text{m}) = 0.451$ 到小数点后三位完全相同。解释为什么这与网络的训练方式是一致的，并提出两种训练程序的改动，使模型能够学到这个依赖。
::: solution
两个前缀唯一的差别是第 4 个位置的 “c” 与 “d”，而决策发生在 $14$ 步之后。训练中，主语每次出现都和对应的决策落在截断 BPTT 的不同窗口里，所以梯度从不奖励把主语向前携带的行为；网络学到的是会忘记这一区别的动力学（它的状态是压缩的，14 步之后两条轨迹已经收敛到打印位数以内的舍入误差）。改动方案：(1) 使用足够长、能把每个依赖装进去的窗口，或让窗口的起点错开，使某些窗口同时包含主语和决策；(2) 改用长程梯度更好的单元，如 LSTM（[[sequence-models/long-range-dependencies]]），并与 (1) 配合。单纯训练更久不会有帮助，因为被优化的目标里根本不包含这个依赖。
:::
:::

::: exercise 完整 BPTT 的内存 {level=2 check="floor(2^30/(4*(1024+50000)))"}
一个 $H = 1{,}024$、$\lvert\mathcal{V}\rvert = 50{,}000$ 的 RNN 语言模型对一条序列以 32 位浮点存储 $\mathbf{h}_t$ 和 logits $\mathbf{z}_t$。1 GiB（$2^{30}$ 字节）装得下多少个位置？若反向传播时重新计算 logits，答案如何改变？
::: solution
每个位置需要 $4(1{,}024 + 50{,}000) = 204{,}096$ 字节，$2^{30}/204{,}096 = 5{,}260.96$，所以装得下 $5{,}260$ 个完整位置。若反向传播时由 $\mathbf{h}_t$ 重算 logits（每步多一次输出矩阵乘法），每个位置只需 $4\cdot1{,}024 = 4{,}096$ 字节，约 $262{,}144$ 个位置——多了五十倍。这种取舍的一般形式是梯度检查点（[[neural-networks/training-practice]]）。
:::
:::

::: exercise 对嵌入表的梯度 {level=2}
对使用嵌入 $\mathbf{x}_t = E[x_t]$ 的 RNN 语言模型，证明 $\mathcal{L}$ 对 $E$ 的第 $v$ 行的梯度是 $\sum_{t\,:\,x_t = v}W_{xh}^\top\boldsymbol\delta_t$。这对罕见词元意味着什么？
::: solution
$E$ 的第 $v$ 行恰好在所有满足 $x_t = v$ 的步骤被使用，每次都通过 $W_{xh}\mathbf{x}_t$ 进入 $\mathbf{a}_t$。该线性映射与 $\boldsymbol\delta_t$ 的向量-雅可比乘积是 $W_{xh}^\top\boldsymbol\delta_t$，按扇出法则各次使用相加，得到对出现位置的求和。一个在批次中没出现的词元完全得不到梯度，罕见词元得到的更新也很少——它的嵌入长时间停留在初始化附近，这正是子词分词（[[text-and-language/tokenisation]]）有帮助的原因之一。
:::
:::

::: exercise 对角递推 {level=3}
设 $W_{hh} = \operatorname{diag}(\lambda_1, \dots, \lambda_H)$，并设所有单元都在 tanh 的线性区间内工作（斜率 $\approx1$）。证明 $\mathbf{h}_t\approx\sum_{k=1}^{t}\Lambda^{t-k}W_{xh}\mathbf{x}_k$（取 $\mathbf{h}_0 = \mathbf{0}$、$\mathbf{b}_h = \mathbf{0}$、$\Lambda = W_{hh}$），并把每个隐藏单元解释成一个有自己的时间尺度的指数滑动平均。$\lambda_i$ 取何值时，单元 $i$ 能把一个输入记住大约 100 步（因子 $e^{-1}$）？
::: solution
激活取恒等映射时，$\mathbf{h}_t = \Lambda\mathbf{h}_{t-1} + W_{xh}\mathbf{x}_t$；展开得 $\mathbf{h}_t = \Lambda^t\mathbf{h}_0 + \sum_{k=1}^t\Lambda^{t-k}W_{xh}\mathbf{x}_k$，且 $\mathbf{h}_0 = \mathbf{0}$ 消去第一项。由于 $\Lambda$ 是对角矩阵，单元 $i$ 为 $h_{t,i} = \sum_k\lambda_i^{t-k}u_{k,i}$，其中 $u_k = W_{xh}\mathbf{x}_k$：过去输入以几何衰减 $\lambda_i^{t-k}$ 加权和——一个时间常数为 $-1/\ln\lambda_i$ 的（未归一化）指数滑动平均。要 100 步后剩 $e^{-1}$，需 $\lambda_i^{100} = e^{-1}$，即 $\lambda_i = e^{-0.01}\approx0.990$。$\lambda_i$ 接近 $1$ 的单元记得久，$\lambda_i$ 小的单元反应快。恰恰是这种对角线性递推，是[[sequence-models/state-space-models]]中状态空间模型的出发点。
:::
:::

::: exercise 实现沿时间的梯度检查 {level=3}
修改[[#sec-code]]的清单，对 $T = 16$ 个字符的窗口，只用最后一步的损失，计算 $\lVert\partial\ell_{16}/\partial\mathbf{h}_k\rVert$，$k = 15, 14, \dots, 1$。描述你预期在初始化时和训练后各看到什么，并解释结果与[[#prop-jacobian]]的关系。
::: solution
先跑前向传播，再跑[[#thm-bptt]]的反向递推，取 $t < 16$ 时 $\mathbf{g}_t = \mathbf{0}$、$\mathbf{g}_{16} = \mathbf{p}_{16} - \mathbf{e}_{y}$；每步算出 $\bar{\mathbf{h}}_k$ 后记下它的范数（在清单里就是第 `t` 步施加 tanh 斜率之前的 `dh`）。每一步都乘上 $W_{hh}^\top D_{k+1}$，所以这些范数遵循雅可比乘积。初始化时 $W_{hh}$ 元素的标准差为 $1/\sqrt H$，其谱半径约为 $1$，又因 tanh 斜率小于 $1$，范数只会缓慢衰减。用清单里的随机种子运行，以 $\lVert\bar{\mathbf{h}}_{16}\rVert$ 为基准，往回 $15$ 步的范数在初始化时是 $0.51$，而在 $3{,}003$ 个训练步之后只有 $1.5\times10^{-3}$：训练出的网络学到了强烈压缩的动力学，与它遗忘主语的行为一致（具体数字取决于种子和窗口）。把 $\log\lVert\bar{\mathbf{h}}_k\rVert$ 对 $16 - k$ 作图，大致是一条直线，其斜率就是每步平均的对数压缩率，即[[#prop-jacobian]]中 $\log(\gamma\sigma_{\max})$ 的经验对应物。
:::
:::
