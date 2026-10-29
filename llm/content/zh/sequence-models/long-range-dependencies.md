[[sequence-models/recurrent-networks]]的简单循环网络原则上可以让信息跨越任意距离，但要训练它这样做就是另一回事了。那个本该教会它把一个词元记住 $t - k$ 步的梯度，会被 $t - k$ 个雅可比连乘（[[sequence-models/recurrent-networks#prop-jacobian]]），而这样的乘积几乎总是按几何速率缩小或增大。前一种情形，网络永远学不会长程依赖；后一种情形，训练变得不稳定。

本章把问题说精确，先给出对付爆炸情形的标准疗法——**梯度裁剪**——然后发展主导了序列模型二十年的、对付消失情形的疗法：**门控**循环单元。**长短期记忆网络**（LSTM）增加一个记忆细胞，它的更新靠加法而不是靠矩阵乘法，于是沿这条细胞通路，雅可比是若干对角门值之积，而网络能把这些门保持在接近 1 的位置；**门控循环单元**（GRU）用更少的参数达到类似效果。我们推导这两种单元，用纯 Python 实现 LSTM 的前向与反向传播并做梯度检查，测量究竟有多少梯度能抵达序列开头。这条“加法通路免于反复相乘”的思想，会在残差网络和[[sequence-models/state-space-models]]的状态空间模型中再次出现。

## 梯度消失与梯度爆炸 {#sec-vanishing}

回顾设定：$\mathbf{h}_s = \tanh(\mathbf{a}_s)$，其中 $\mathbf{a}_s = W_{hh}\mathbf{h}_{s-1} + W_{xh}\mathbf{x}_s + \mathbf{b}$，$D_s = \operatorname{diag}(1 - \mathbf{h}_s^2)$。第 $t$ 步的损失通过

$$
\frac{\partial\mathbf{h}_t}{\partial\mathbf{h}_k} = D_tW_{hh}\,D_{t-1}W_{hh}\cdots D_{k+1}W_{hh} .
$$ {#eq-product}

抵达更早的状态。$\ell_t$ 对 $W_{hh}$ 的梯度是对 $k\le t$ 的、以 $\big(\partial\mathbf{h}_t/\partial\mathbf{h}_k\big)^{\!\top}$ 加权的外积之和，所以学习信号中的长程部分——$t - k$ 很大的那些项——由[[#eq-product]]控制。[[sequence-models/recurrent-networks#prop-jacobian]]把它的范数界成 $(\gamma\sigma_{\max})^{t-k}$，其中 $\sigma_{\max}$ 是 $W_{hh}$ 的最大奇异值，$\gamma\le1$ 界住 tanh 斜率。由此得出两条结论，Pascanu、Mikolov 和 Bengio（2013）以这种形式把它们陈述为充要条件。

::: proposition 消失与爆炸的条件 {#prop-conditions}
设 $\gamma$ 是激活函数导数的界（tanh 取 $\gamma = 1$，逻辑 sigmoid 取 $\gamma = \frac14$）。

1. **消失的充分条件。** 若 $\sigma_{\max}(W_{hh}) < 1/\gamma$，则 $\lVert\partial\mathbf{h}_t/\partial\mathbf{h}_k\rVert\le\eta^{t-k}$，其中 $\eta = \gamma\sigma_{\max} < 1$，于是长程项按几何速率趋于零。
2. **爆炸的必要条件。** 若长程项在 $t - k\to\infty$ 时无界，则 $\sigma_{\max}(W_{hh}) > 1/\gamma$。
:::

::: proof
(1) 就是[[sequence-models/recurrent-networks#prop-jacobian]]的界，取 $\eta = \gamma\sigma_{\max}$：由谱范数的次乘性，$\lVert\prod_sD_sW_{hh}\rVert\le\prod_s\lVert D_s\rVert\lVert W_{hh}\rVert\le(\gamma\sigma_{\max})^{t-k}$，而 $\eta < 1$ 时 $\eta^{t-k}\to0$。(2) 是 (1) 的逆否命题加上边界情形：若 $\sigma_{\max}\le1/\gamma$，乘积以 $1$ 为界，因此无界增长要求 $\sigma_{\max} > 1/\gamma$。
:::

(2) 中的条件是必要而非充分的：很大的 $W_{hh}$ 通常把单元推进饱和区，那里 $D_s\approx0$，梯度照样消失。因此梯度爆炸是阵发式的，出现在参数空间中动力学接近分岔、权重稍有改动就使轨迹面目全非的区域。Bengio、Simard 和 Frasconi（1994）为“消失才是常态”给出了更锋利的论证：网络要**鲁棒地**存储一个比特——输入的小扰动抹不掉它——其状态必须坐在动力学压缩的区域里，而恰恰在这些区域 $\lVert\partial\mathbf{h}_t/\partial\mathbf{h}_k\rVert\to0$。鲁棒的记忆与长程的梯度流，在简单 RNN 里朝相反的方向拉扯。Hochreiter 的 1991 年文凭论文通过分析误差信号随时间的缩放，得出了同样的诊断。

::: example 信号消失得有多快 {#ex-decay}
一个简单 RNN 有 $\sigma_{\max}(W_{hh}) = 1.2$，其单元平均每步的 tanh 斜率为 $0.6$（把这个界当作典型值）。第 $t$ 步损失的梯度传到第 $t - 50$ 步缩小了多少倍？要让倍数为 $1$ 需要什么？
::: solution
每步因子至多 $0.6\cdot1.2 = 0.72$，$50$ 步后是 $0.72^{50}\approx7.4\times10^{-8}$。第 $t$ 步的损失关于“网络 50 步之前本该怎么做”提供的信息只有亿分之七——被加到同一批权重上的短程依赖梯度彻底淹没。要把倍数保持为 $1$，需要恰好 $\gamma\sigma_{\max} = 1$**并且**各雅可比彼此对齐使界恰好取到——这是训练不会维持的刀锋。LSTM 的回答是造一条通路，让这条通路上的倍数是学出来的、接近 $1$ 的门值，而不是矩阵范数与斜率的乘积。
:::
:::

## 梯度裁剪 {#sec-clipping}

爆炸情形有一种粗暴但有效的疗法。Pascanu 等人（2013）观察到，RNN 的损失曲面有陡峭的“悬崖”：一片狭窄的区域，损失在其中剧变，于是在那里算出的梯度巨大，沿着它迈出一步会把参数甩到远处，毁掉先前的进展。这个梯度的方向仍然有信息量，大小却没有。

::: definition 按范数裁剪 {#def-clip}
给定梯度 $\mathbf{g}$ 和阈值 $c > 0$，**按范数裁剪**把它替换为

$$
\mathbf{g}\leftarrow\min\Big(1, \frac{c}{\lVert\mathbf{g}\rVert}\Big)\,\mathbf{g} .
$$

裁剪后的向量方向不变，范数为 $\min(\lVert\mathbf{g}\rVert, c)$。把它作用在全部参数梯度的拼接上，就是**全局范数**裁剪，即[[neural-networks/optimisers#def-clipping]]描述的形式。
:::

Mikolov 在他的 RNN 语言模型里早先用的是更粗糙的逐元素裁剪；Pascanu 等人分析了按范数裁剪并使其流行，从此它成为一切循环网络训练配方的标准部件（[[sequence-models/recurrent-networks#sec-code]]的清单裁剪到 $5$）。典型阈值取 $1$ 到 $10$：看几百步内梯度范数的分布，把 $c$ 定在典型值稍高处。裁剪对梯度消失无能为力——它只会让梯度变小。

::: example 裁剪一个梯度 {#ex-clip}
一个批次产生梯度：循环权重的 $\mathbf{g}_1 = (30, 0)$，输出权重的 $\mathbf{g}_2 = (0, 40)$，均已展平。把全局范数裁剪到 $c = 5$。若改为每个张量各自裁剪到 $5$ 会怎样？
::: solution
全局范数是 $\sqrt{30^2 + 40^2} = 50$，两者都乘 $5/50 = 0.1$：$\mathbf{g}_1 = (3, 0)$，$\mathbf{g}_2 = (0, 4)$。两部分之间 $3 : 4$ 的比例保持不变。把每个张量单独裁剪到范数 $5$ 则得 $(5, 0)$ 和 $(0, 5)$：循环部分被缩了 $1/6$，输出部分被缩了 $1/8$，更新的方向改变了。全局裁剪是通常的选择，因为它只改变步长。
:::
:::

## LSTM 单元 {#sec-lstm}

要学长程依赖，网络需要一条沿时间的通路，其上的雅可比保持在单位矩阵附近——Hochreiter 和 Schmidhuber（1997）称之为**常数误差回转**（constant error carousel）。他们的构造是一个记忆细胞 $\mathbf{c}_t$：对它只**做加法**，而不是乘以权重矩阵，外面由乘法**门**把关，决定写什么、留什么、展示什么。

::: definition LSTM 单元 {#def-lstm}
隐藏维度为 $H$、输入维度为 $d$ 的**LSTM** 单元保存一个**细胞状态** $\mathbf{c}_t\in\R^H$ 和一个隐藏状态 $\mathbf{h}_t\in\R^H$。记 $\mathbf{u}_t = [\mathbf{h}_{t-1}; \mathbf{x}_t]\in\R^{H+d}$，它计算

$$
\begin{aligned}
\mathbf{i}_t &= \sigma(W_i\mathbf{u}_t + \mathbf{b}_i) &&\text{输入门}\\
\mathbf{f}_t &= \sigma(W_f\mathbf{u}_t + \mathbf{b}_f) &&\text{遗忘门}\\
\mathbf{o}_t &= \sigma(W_o\mathbf{u}_t + \mathbf{b}_o) &&\text{输出门}\\
\mathbf{g}_t &= \tanh(W_g\mathbf{u}_t + \mathbf{b}_g) &&\text{候选}\\
\mathbf{c}_t &= \mathbf{f}_t\odot\mathbf{c}_{t-1} + \mathbf{i}_t\odot\mathbf{g}_t\\
\mathbf{h}_t &= \mathbf{o}_t\odot\tanh(\mathbf{c}_t)
\end{aligned}
$$ {#eq-lstm}

其中 $W_i, W_f, W_o, W_g\in\R^{H\times(H+d)}$，$\sigma$ 是逻辑函数，$\odot$ 是逐分量乘积。它有 $4\big(H(H + d) + H\big)$ 个参数。
:::

从中间往外读这个单元。候选 $\mathbf{g}_t$ 就是简单 RNN 会算出的东西。LSTM 不用它覆盖状态，而是把它**加进**细胞：先由遗忘门 $\mathbf{f}_t\in(0, 1)^H$ 按比例缩放旧内容，再由输入门 $\mathbf{i}_t\in(0, 1)^H$ 逐单元缩放后加进来。一个 $f\approx1$、$i\approx0$ 的单元，只要门保持如此，数值就一直不变。输出门决定（压扁后的）细胞内容有多大比例暴露为 $\mathbf{h}_t$，而 $\mathbf{h}_t$ 正是各个门、候选以及网络其余部分所看到的东西。

::: widget plot
f: 1/(1+exp(-(x+b))); exp(-(x+b))/(1+exp(-(x+b)))^2; 1-tanh(x)^2
x: -8, 8
y: 0, 1.05
sliders: b=0:-4:6:0.1
labels: \text{门 } \sigma(a + b); \text{门的斜率 } \sigma'(a + b); \text{tanh 斜率 } 1 - \tanh^2 a
caption: 门是其预激活 $a$ 的逻辑函数，这里再平移一个偏置 $b$。它取值于 $(0, 1)$，起软开关的作用：接近 $0$ 就阻断，接近 $1$ 就放行。它的斜率至多 $\frac14$，是**门自身**的梯度所看到的东西——门完全打开或完全关闭时很小。在回转通路上乘到细胞误差上的是门的值而非门的斜率，所以一个完全打开的遗忘门几乎原封不动地传递细胞的梯度，哪怕它自己学得很慢。
:::

1997 年的原始细胞没有遗忘门：$\mathbf{c}_t = \mathbf{c}_{t-1} + \mathbf{i}_t\odot\mathbf{g}_t$，是一条沿细胞雅可比恰为 $I$ 的精确回转。Gers、Schmidhuber 和 Cummins（2000）发现，在绵延不断的输入流上细胞内容会无界增长，于是加上遗忘门让细胞可以被重置；今天说“LSTM”指的就是带遗忘门的[[#eq-lstm]]。Gers 和 Schmidhuber（2000）还提出了**窥孔**（peephole）连接，让门能直接看见 $\mathbf{c}_{t-1}$；后来的比较发现在多数任务上收益不大。

::: theorem 细胞通路 {#thm-carousel}
在 LSTM 的展开图中，只考虑从 $\mathbf{c}_k$ 到 $\mathbf{c}_t$、沿途只经过细胞状态的路径（$\mathbf{c}_k\to\mathbf{c}_{k+1}\to\dots\to\mathbf{c}_t$）。它们对 $\partial\mathbf{c}_t/\partial\mathbf{c}_k$ 的贡献是

$$
\prod_{s=k+1}^{t}\operatorname{diag}(\mathbf{f}_s) = \operatorname{diag}\Big(\prod_{s=k+1}^{t}\mathbf{f}_s\Big),
$$ {#eq-cell-path}

一个对角矩阵，其中没有权重矩阵，也没有激活斜率。在反向传播中，细胞上的误差按 $\bar{\mathbf{c}}_{s-1}\mathrel{+}=\mathbf{f}_s\odot\bar{\mathbf{c}}_s$ 传播。
:::

::: proof
按链式法则的路径和形式（[[neural-networks/backpropagation#thm-backprop]]的证明），$\partial\mathbf{c}_t/\partial\mathbf{c}_k$ 是从 $\mathbf{c}_k$ 到 $\mathbf{c}_t$ 的每条有向路径上局部雅可比乘积之和。边 $\mathbf{c}_{s-1}\to\mathbf{c}_s$ 来自[[#eq-lstm]]中的项 $\mathbf{f}_s\odot\mathbf{c}_{s-1}$，固定门时它对 $\mathbf{c}_{s-1}$ 的偏导数是 $\operatorname{diag}(\mathbf{f}_s)$。只用这些边的路径恰有一条，其乘积即[[#eq-cell-path]]；对角矩阵相乘可交换，所以乘积就是对逐分量乘积取对角。反向传播的法则就是同一条边的向量-雅可比乘积。
:::

当然还有别的路径——$\mathbf{c}_{s-1}$ 也影响 $\mathbf{h}_{s-1}$，并经它影响第 $s$ 步的全部四个门——那些路径上照旧带着权重矩阵与斜率的乘积，所以完整的雅可比并不是对角的。但梯度是对路径的**求和**，细胞通路不会因其他路径缩小而被抵消：只要网络对某个单元 $j$ 保持 $f_{s,j}\approx1$，该单元的误差就原封不动地传回去。细胞通路到底带不带信号，如今由网络学出来的值——遗忘门——决定，而不是由一个必须恰好坐在 $1$ 上的矩阵范数决定。

::: example 手算一步 LSTM {#ex-lstm-step}
一个单单元 LSTM 有 $c_{t-1} = 0.8$，第 $t$ 步各门的预激活为 $a_i = 0$、$a_f = 2$、$a_o = 1$、$a_g = 0.5$。计算 $c_t$ 和 $h_t$。若 $\partial\mathcal{L}/\partial h_t = 1$ 且没有别的梯度到达 $c_t$，沿细胞通路传到 $c_{t-1}$ 的误差是多少？
::: solution
$i = \sigma(0) = 0.5$，$f = \sigma(2) = 0.880797$，$o = \sigma(1) = 0.731059$，$g = \tanh(0.5) = 0.462117$。
$c_t = 0.880797\cdot0.8 + 0.5\cdot0.462117 = 0.704638 + 0.231059 = 0.935696$。
$h_t = 0.731059\cdot\tanh(0.935696) = 0.731059\cdot0.733239 = 0.536040$。

反向：$\bar c_t = \bar h_t\,o\,(1 - \tanh^2c_t) = 0.731059\cdot(1 - 0.537639) = 0.338013$，细胞通路传出 $\bar c_{t-1} = f\,\bar c_t = 0.880797\cdot0.338013 = 0.297721$。每步因子就是 $f = 0.88$。沿十条这样的步，细胞上的误差会被乘上 $0.88^{10}\approx0.28$；而经过一个 tanh 斜率为 $0.46$、权重为单位的简单 RNN，就只剩 $0.46^{10}\approx4\times10^{-4}$。
:::
:::

### 遗忘门偏置 {#sec-forget-bias}

初始化时，门的预激活就在偏置附近，故 $\mathbf{f}\approx\sigma(\mathbf{b}_f)$。取 $\mathbf{b}_f = \mathbf{0}$ 时每个遗忘门从 $0.5$ 起步，[[#thm-carousel]]的细胞通路每步乘 $0.5$——衰减比一个像样的简单 RNN 还快。Gers 等人（2000）当时就推荐正的遗忘偏置；Jozefowicz、Zaremba 和 Sutskever（2015）在对循环架构的大规模搜索中发现，把 $\mathbf{b}_f$ 初始化到 $1$，就弥合了 LSTM 与他们找到的最佳替代方案之间的大部分差距。更大的偏置设定更长的初始记忆。

::: widget plot
f: log10(1/(1+exp(-b)))*x; log10(g*s)*x
x: 0, 200
y: -10, 0
sliders: b=1:0:6:0.1; g=0.6:0.2:1:0.01; s=1.2:0.5:2:0.01
labels: \text{LSTM 细胞通路 } \sigma(b_f)^{k}; \text{简单 RNN 的界 } (\gamma\sigma_{\max})^{k}
caption: 初始化时，误差信号向回传播 $k$ 步（横轴）后被乘上的倍数，取 $\log_{10}$ 尺度。蓝色：遗忘门全为 $\sigma(b_f)$ 的 LSTM 细胞通路。橙色：平均 tanh 斜率 $\gamma$、$\sigma_{\max}(W_{hh}) = s$ 的简单 RNN 的界。$b_f = 1$ 时细胞通路不比 RNN 好；$b_f = 5$ 时遗忘门达 $0.993$，一半信号能活过 $100$ 步。此后训练再把每个单元的门调到它需要的时间尺度上。
:::

::: example 遗忘偏置的记忆时间 {#ex-forget-time}
设所有遗忘门都在 $\sigma(b_f)$、不再写入，则细胞内容经 $k$ 步后为 $\sigma(b_f)^kc_0$。$b_f = 0, 1, 3, 5$ 时，100 步后各剩多少？$b_f = 5$ 的半衰期是多少？
::: solution
$\sigma(0)^{100} = 0.5^{100}\approx7.9\times10^{-31}$；$\sigma(1)^{100} = 0.7311^{100}\approx2.5\times10^{-14}$；$\sigma(3)^{100} = 0.9526^{100}\approx7.8\times10^{-3}$；$\sigma(5)^{100} = 0.99331^{100}\approx0.51$。$b_f = 5$ 的半衰期为 $\ln0.5/\ln0.99331\approx103$ 步。一个好用的经验：当 $f$ 接近 $1$ 时，记忆时间常数约为 $1/(1 - f)$ 步——这里 $1/0.0067\approx149$。
:::
:::

## GRU {#sec-gru}

Cho 等人（2014）在引入 RNN 编码器-解码器（[[sequence-models/seq2seq]]）的论文里提出了一种更简单的门控单元，即现在的**门控循环单元**。它没有单独的细胞状态，门也从三个减到两个。

::: definition 门控循环单元 {#def-gru}
隐藏维度为 $H$ 的 **GRU** 由 $\mathbf{h}_{t-1}$ 和 $\mathbf{x}_t$ 计算

$$
\begin{aligned}
\mathbf{z}_t &= \sigma(W_z\mathbf{x}_t + U_z\mathbf{h}_{t-1} + \mathbf{b}_z) &&\text{更新门}\\
\mathbf{r}_t &= \sigma(W_r\mathbf{x}_t + U_r\mathbf{h}_{t-1} + \mathbf{b}_r) &&\text{重置门}\\
\tilde{\mathbf{h}}_t &= \tanh\big(W\mathbf{x}_t + U(\mathbf{r}_t\odot\mathbf{h}_{t-1}) + \mathbf{b}\big) &&\text{候选}\\
\mathbf{h}_t &= \mathbf{z}_t\odot\mathbf{h}_{t-1} + (1 - \mathbf{z}_t)\odot\tilde{\mathbf{h}}_t
\end{aligned}
$$ {#eq-gru}

其中 $W_\bullet\in\R^{H\times d}$，$U_\bullet\in\R^{H\times H}$。它有 $3\big(H(H + d) + H\big)$ 个参数。
:::

新状态是旧状态与候选的逐分量凸组合：更新门扮演着 LSTM 遗忘门的角色，$1 - \mathbf{z}_t$ 扮演其输入门的角色，两者绑在一起，保留与写入互相取舍。重置门让候选可以无视旧状态，使单元得以从头开始。与[[#thm-carousel]]完全类似，第一项给出的直接通路 $\mathbf{h}_{t-1}\to\mathbf{h}_t$ 的雅可比是 $\operatorname{diag}(\mathbf{z}_t)$，所以 $z\approx1$ 的单元原封不动地传出自己的值和梯度。

各家写法不同，读代码时这很要紧。Cho 等人的更新式如上；有些教科书把 $\mathbf{z}_t$ 与 $1 - \mathbf{z}_t$ 的角色对调。PyTorch 和 cuDNN 在插值上用 Cho 的约定，但把重置门作用在矩阵乘积**之后**，$\tanh\big(W\mathbf{x}_t + \mathbf{b} + \mathbf{r}_t\odot(U\mathbf{h}_{t-1} + \mathbf{b}')\big)$，以便把三个 $U$ 乘积并成一次矩阵乘法。

::: example 手算一步 GRU {#ex-gru-step}
一个单单元 GRU 有 $h_{t-1} = 0.5$，第 $t$ 步更新门预激活为 $-1$、重置门预激活为 $1$、候选预激活为 $0.3 + 0.8\,(r\,h_{t-1})$（即 $Wx + b = 0.3$，$U = 0.8$）。计算 $h_t$。
::: solution
$z = \sigma(-1) = 0.268941$，$r = \sigma(1) = 0.731059$。候选：$0.3 + 0.8\cdot0.731059\cdot0.5 = 0.592423$，$\tilde h = \tanh(0.592423) = 0.531636$。于是 $h_t = 0.268941\cdot0.5 + 0.731059\cdot0.531636 = 0.134471 + 0.388657 = 0.523128$。$z = 0.27$ 时单元主要采纳候选；这一步传回 $h_{t-1}$ 的直接梯度通路只带 $0.27$ 的因子，而经过候选的通路带 $(1 - z)(1 - \tilde h^2)\,U\,r$，再叠上穿过各门的导数。
:::
:::

::: quiz
关于 LSTM，下列说法哪个正确？
- [ ] LSTM 避免了梯度爆炸，因此不需要裁剪。
- [ ] 完整雅可比 $\partial\mathbf{c}_t/\partial\mathbf{c}_{t-1}$ 等于 $\operatorname{diag}(\mathbf{f}_t)$。
- [x] 沿细胞通路，反向误差被乘上遗忘门的值，而网络可以学会把这些门保持在 $1$ 附近。
- [ ] 把所有遗忘门偏置设为 $0$，能使刚初始化的 LSTM 记忆最长。
::: solution
[[#thm-carousel]]只讲细胞通路；经 $\mathbf{h}$ 与各门的其他路径添上带权重矩阵的项，所以完整雅可比不是对角的，梯度依然可能爆炸——LSTM 语言模型历来都配着裁剪训练。遗忘偏置为零让每个门从 $0.5$ 起步，每步把细胞信号减半；正偏置（$1$ 以上）起步记忆更长。
:::
:::

## 实现 LSTM {#sec-code}

下面的清单实现[[#eq-lstm]]，在最后的隐藏状态上接一个分类器，并给出由它推导的反向传播和梯度检查。反向传播按前向公式逆序进行：$\mathbf{h}_t$ 上的误差分裂到输出门和细胞上，细胞误差累加来自未来的回转项，每个门的预激活误差等于其输出误差乘以逻辑函数或 tanh 的斜率。

```python
import math, random

def sig(a): return 1 / (1 + math.exp(-a))
def mv(M, v): return [sum(m * x for m, x in zip(row, v)) for row in M]

def init_lstm(H, d, K, rng, forget_bias=1.0):
    s = 1 / math.sqrt(H + d)
    W = {g: [[rng.gauss(0, s) for _ in range(H + d)] for _ in range(H)] for g in "ifog"}
    b = {g: [forget_bias if g == "f" else 0.0] * H for g in "ifog"}
    Wy = [[rng.gauss(0, 1 / math.sqrt(H)) for _ in range(H)] for _ in range(K)]
    return {"W": W, "b": b, "Wy": Wy, "by": [0.0] * K}

def lstm_loss_grad(P, xs, y):
    """xs: list of T input vectors (d,); y: target class at the last step."""
    H = len(P["b"]["i"]); h, c = [0.0] * H, [0.0] * H
    cache = []
    for x in xs:                                              # 前向
        u = h + x                                             # [h_{t-1}; x_t]  (H+d,)
        a = {g: [p + q for p, q in zip(mv(P["W"][g], u), P["b"][g])] for g in "ifog"}
        i, f, o = ([sig(v) for v in a[g]] for g in "ifo")
        gg = [math.tanh(v) for v in a["g"]]
        c_new = [fj * cj + ij * gj for fj, cj, ij, gj in zip(f, c, i, gg)]   # 细胞状态
        tc = [math.tanh(v) for v in c_new]
        h_new = [oj * t for oj, t in zip(o, tc)]                             # 隐藏状态
        cache.append((u, i, f, o, gg, c, tc)); h, c = h_new, c_new
    z = [p + q for p, q in zip(mv(P["Wy"], h), P["by"])]
    m = max(z); e = [math.exp(v - m) for v in z]; p = [v / sum(e) for v in e]
    loss = -math.log(p[y])
    G = {"W": {g: [[0.0] * len(r) for r in P["W"][g]] for g in "ifog"},
         "b": {g: [0.0] * H for g in "ifog"},
         "Wy": [[0.0] * H for _ in P["Wy"]], "by": [0.0] * len(z)}
    dz = p[:]; dz[y] -= 1.0
    for k in range(len(z)):
        G["by"][k] = dz[k]
        for j in range(H): G["Wy"][k][j] = dz[k] * h[j]
    dh = [sum(P["Wy"][k][j] * dz[k] for k in range(len(z))) for j in range(H)]
    dc = [0.0] * H
    for (u, i, f, o, gg, c_prev, tc) in reversed(cache):      # 沿时间反向传播
        do = [d * t for d, t in zip(dh, tc)]
        dc = [dcj + d * oj * (1 - t * t) for dcj, d, oj, t in zip(dc, dh, o, tc)]
        da = {"i": [d * gj * ij * (1 - ij) for d, gj, ij in zip(dc, gg, i)],
              "f": [d * cp * fj * (1 - fj) for d, cp, fj in zip(dc, c_prev, f)],
              "o": [d * oj * (1 - oj) for d, oj in zip(do, o)],
              "g": [d * ij * (1 - gj * gj) for d, ij, gj in zip(dc, i, gg)]}
        du = [0.0] * len(u)
        for g in "ifog":
            for r in range(H):
                G["b"][g][r] += da[g][r]
                for col in range(len(u)):
                    G["W"][g][r][col] += da[g][r] * u[col]
                    du[col] += P["W"][g][r][col] * da[g][r]
        dh = du[:H]                                           # 传给 h_{t-1}
        dc = [d * fj for d, fj in zip(dc, f)]                 # 传给 c_{t-1}：常数误差回转
    return loss, G

if __name__ == "__main__":
    rng = random.Random(1)
    H, d, K, T = 4, 3, 2, 6
    P = init_lstm(H, d, K, rng)
    xs = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(T)]
    loss, G = lstm_loss_grad(P, xs, 1)
    for g, r, col in [("f", 0, 1), ("i", 2, 5), ("g", 3, 0), ("o", 1, 6)]:
        old = P["W"][g][r][col]; eps = 1e-5
        P["W"][g][r][col] = old + eps; lp = lstm_loss_grad(P, xs, 1)[0]
        P["W"][g][r][col] = old - eps; lm = lstm_loss_grad(P, xs, 1)[0]
        P["W"][g][r][col] = old
        print(f"W_{g}[{r}][{col}]  bptt {G['W'][g][r][col]: .9f}  numeric {(lp - lm) / (2 * eps): .9f}")
```

输出：

```
W_f[0][1]  bptt  0.000214333  numeric  0.000214333
W_i[2][5]  bptt -0.000056913  numeric -0.000056913
W_g[3][0]  bptt  0.023102620  numeric  0.023102620
W_o[1][6]  bptt  0.010254727  numeric  0.010254727
```

四个门的梯度都与中心差分在九位小数上吻合。注意 `dc = [d * fj ...]` 这一行：它就是代码形式的[[#thm-carousel]]，也是细胞误差从一步传到前一步的唯一位置。

### 有多少梯度传到了开头 {#sec-measure}

为了看到细胞通路的效果，把同样的函数扩展为返回 $\partial\ell/\partial\mathbf{x}_1$——最后一步损失对**第一个**输入的梯度——任务目标是记住 $T$ 个独热符号中的第一个（其余都是噪声）。下表给出 $\log_{10}\lVert\partial\ell/\partial\mathbf{x}_1\rVert$ 在 $20$ 次随机初始化（种子 $0$–$19$）上的平均，$H = 8$，在初始化时刻——学习开始之前。

| $T$ | 简单 RNN（$W_{hh}$ 标准差 $1/\sqrt H$） | LSTM, $b_f = 0$ | LSTM, $b_f = 1$ | LSTM, $b_f = 3$ | LSTM, $b_f = 5$ |
|---|---|---|---|---|---|
| $10$ | $-1.9$ | $-3.1$ | $-2.0$ | $-1.3$ | $-1.2$ |
| $50$ | $-8.1$ | $-10.4$ | $-4.8$ | $-2.1$ | $-1.7$ |
| $100$ | $-15.4$ | $-19.6$ | $-8.0$ | $-2.6$ | $-2.8$ |

$T = 100$ 时，简单 RNN 大约只把 $10^{-15}$ 的信号传回；$b_f = 0$ 的 LSTM **更糟**，因为它的遗忘门每步把细胞减半；$b_f = 3$ 或 $5$ 时约剩 $10^{-2.7}$——比 RNN 多了大约 $10^{13}$ 倍。（损失的梯度不是成功的概率，表格也丝毫没有说训练能否找到解；它说的是学习信号是否存在。）

::: warning 有了门不等于 LSTM 记得住
门让长记忆**可学**，并不让它自动发生。遗忘偏置为零、刚刚初始化的 LSTM 忘得比简单 RNN 还快（上表），遗忘门必须被训练着在需要它的单元上打开，而细胞通路只是梯度中若干条通路之一。反过来说，在简单任务上——穿过干净噪声记住单个符号——一个初始化得当的简单 RNN 可以把信息锁进一个饱和单元，撑过几十步。LSTM 的优势在“既要长期保存信息、又要继续处理新输入”时显露得最清楚，而这正是语言的要求。它的记忆也是有限的：$H$ 维细胞在压缩过去，而[[sequence-models/attention-mechanism]]用另一种方式拆掉了这个瓶颈。
:::

## 单元的选择 {#sec-comparison}

LSTM 成功之后，人们提出了许多变体，还有若干项大规模研究做了经验比较。

- Chung、Gulcehre、Cho 和 Bengio（2014）在多音音乐与语音信号建模上比较 LSTM 与 GRU，发现两者都明显好于简单 tanh RNN，彼此之间则无稳定胜负。
- Jozefowicz、Zaremba 和 Sutskever（2015）通过变异生成了上万个架构逐一评估。他们找到少数在个别任务上略胜 LSTM 的单元，但没有谁的决定性占优；而遗忘偏置为 $1$ 的 LSTM 已与其中的最佳者不相上下。
- Greff 等人（《LSTM：搜索空间漫游》，“LSTM: A search space odyssey”，2017）在语音、手写与音乐上比较八种 LSTM 变体，发现没有一个显著优于标准单元；遗忘门与输出激活是它最重要的部件，把输入门与遗忘门耦合（如 GRU 所做）或去掉窥孔都无损。

实践中人们按成本做选择：同样的 $H$ 下，GRU 的参数和计算只有 LSTM 的四分之三，而 LSTM 多一个独立的细胞，有时在最长的依赖上帮忙。其他稳定简单 RNN 的思路——把 $W_{hh}$ 初始化为单位矩阵并用 ReLU 单元（Le, Jaitly and Hinton, 2015），或约束它为正交（幺正）矩阵（Arjovsky, Shah and Bengio, 2016）——表明消失问题也可以直接从循环矩阵本身下手，这个思想在状态空间模型精心参数化的递推中卷土重来。

::: example LSTM 与 GRU 的参数和代价 {#ex-lstm-gru-params}
输入维度 $d = 256$、隐藏维度 $H = 512$，数一数 LSTM 层和 GRU 层的参数，以及每步的乘加次数。
::: solution
一组门结构有 $H(H + d) + H = 512\cdot768 + 512 = 393{,}728$ 个参数。LSTM 有四组：$1{,}574{,}912$。GRU 有三组：$1{,}181{,}184$。每步以矩阵乘法为主：LSTM 约 $4\cdot512\cdot768 = 1{,}572{,}864$ 次乘加，GRU 为 $1{,}179{,}648$ 次，再加上 $O(H)$ 的逐分量运算。实现中，四（或三）组门矩阵堆成一个 $4H\times(H + d)$ 的矩阵，每步一次矩阵乘法算完。
:::
:::

::: application 门控思想走出循环网络
学习到的门可以让信号绕过一次变换——这个想法的传播范围远超 RNN。**高速公路网络**（Highway networks，Srivastava, Greff and Schmidhuber, 2015）把 LSTM 式的门用在深前馈网络的**层**之间，$\mathbf{y} = T(\mathbf{x})\odot F(\mathbf{x}) + (1 - T(\mathbf{x}))\odot\mathbf{x}$，训练出了上百层的网络；残差网络（He et al., 2016）扔掉门、只留恒等通路，这就是每个 Transformer 块采用的形式（[[neural-networks/initialisation-normalisation#def-residual]]）。门控线性单元——包括当今许多语言模型里的 SwiGLU 前馈层——把一个投影乘以一个经 sigmoid 或 Swish 门控的另一个投影。而[[sequence-models/state-space-models]]的选择性状态空间模型，实际上是让衰减扮演遗忘门角色的线性递推。
:::

::: history
Sepp Hochreiter 的文凭论文（慕尼黑工业大学，1991，导师 Jürgen Schmidhuber）分析了循环网络中误差信号为何消失或爆炸；Bengio、Simard 和 Frasconi 的《用梯度下降学习长期依赖是困难的》（“Learning long-term dependencies with gradient descent is difficult”，IEEE Transactions on Neural Networks，1994）证明了鲁棒存储与梯度流之间的张力。Hochreiter 和 Schmidhuber 的《长短期记忆》（“Long short-term memory”，Neural Computation，1997）引入了带输入门与输出门的记忆细胞，解决了时滞超过一千步的人工任务。Gers、Schmidhuber 和 Cummins 加上了遗忘门（《学会遗忘》，“Learning to forget”，Neural Computation，2000）。Alex Graves 在 2000 年代末用连接时序分类训练双向 LSTM 做手写与语音识别；LSTM 成为深度学习复兴期的默认序列模型：谷歌的语音识别器、Sutskever、Vinyals 和 Le 的翻译系统以及谷歌神经机器翻译（2016）都基于 LSTM。Pascanu、Mikolov 和 Bengio 的《论训练循环神经网络的困难》（“On the difficulty of training recurrent neural networks”，ICML 2013）让梯度裁剪成为标准做法。Cho 等人在 2014 年引入了 GRU。
:::

::: summary
- 简单 RNN 的长程梯度含乘积 $\prod_sD_sW_{hh}$；$\gamma\sigma_{\max}(W_{hh}) < 1$ 时它们消失，且只有 $\sigma_{\max} > 1/\gamma$ 时才可能爆炸。鲁棒存储要求压缩的动力学，这使消失成为常态。
- **梯度裁剪**把（全局）范数超过阈值的梯度整体缩放、方向不变；它治的是阵发的爆炸，治不了消失。
- **LSTM** 增加细胞 $\mathbf{c}_t = \mathbf{f}_t\odot\mathbf{c}_{t-1} + \mathbf{i}_t\odot\mathbf{g}_t$，并暴露 $\mathbf{h}_t = \mathbf{o}_t\odot\tanh\mathbf{c}_t$。沿细胞通路，雅可比是 $\operatorname{diag}(\prod\mathbf{f}_s)$——常数误差回转——于是接近 $1$ 的学习遗忘门让误差走得很远。
- 遗忘偏置决定初始记忆：$k$ 步后剩 $\sigma(b_f)^k$，时间常数约 $1/(1 - f)$。偏置为零忘得快；$b_f\ge1$ 是标准做法。
- **GRU** 做插值 $\mathbf{h}_t = \mathbf{z}_t\odot\mathbf{h}_{t-1} + (1 - \mathbf{z}_t)\odot\tilde{\mathbf{h}}_t$，候选里带一个重置门；参数量是 LSTM 的 $3/4$，已发表的比较中表现相当。
- 门让长记忆可学，但不保证；状态仍是固定容量的瓶颈。
:::

## 习题

::: exercise 数 LSTM 的参数 {level=1 check="4*(128*(128+64)+128)"}
输入维度 $64$、隐藏维度 $128$ 的 LSTM 层有多少个参数（权重和偏置）？
::: solution
$4\big(H(H + d) + H\big) = 4(128\cdot192 + 128) = 4\cdot24{,}704 = 98{,}816$。
:::
:::

::: exercise 裁剪 {level=1 check="1.2"}
一个梯度的全局范数为 $25$，它的第一个分量是 $6$。裁剪到范数 $c = 5$ 后，第一个分量是多少？
::: solution
缩放因子是 $5/25 = 0.2$，第一个分量变成 $6\cdot0.2 = 1.2$。方向不变，范数变为 $5$。
:::
:::

::: exercise 遗忘门与半衰期 {level=1 check="log(0.5)/log(1/(1+exp(-2)))"}
一个 LSTM 的所有遗忘门都在 $\sigma(2)$，输入门全部关闭。多少步后细胞内容减半？
::: solution
$\sigma(2) = 0.880797$；$k$ 步后内容为 $0.880797^kc_0$，半衰期 $\ln0.5/\ln0.880797\approx5.47$ 步。光靠 $2$ 的偏置对长记忆远远不够；对存储信息的单元，网络必须学会更大的遗忘门预激活。
:::
:::

::: exercise 没有遗忘门的 LSTM {level=2}
1997 年的 LSTM 是 $\mathbf{c}_t = \mathbf{c}_{t-1} + \mathbf{i}_t\odot\mathbf{g}_t$。证明沿细胞通路雅可比恰为单位矩阵，并解释在绵延不断的输入流上细胞内容为什么会无界增长。输出的非线性 $\tanh(\mathbf{c}_t)$ 为什么救不了这个问题？
::: solution
细胞通路的边局部雅可比为 $\partial\mathbf{c}_t/\partial\mathbf{c}_{t-1} = I$（固定门时），任意多步的乘积仍是 $I$：一条精确的回转。每步加上分量在 $(-1, 1)$ 内的 $\mathbf{i}_t\odot\mathbf{g}_t$；在持续输入流上这些加法不断累积，若符号一致，细胞就随时间线性增长。输出 $\tanh(\mathbf{c}_t)$ 虽有界，可一旦 $\lvert c\rvert$ 很大它就饱和于 $\pm1$，$\mathbf{h}_t$ 不再反映细胞的内容，且其导数 $1 - \tanh^2c_t\approx0$ 把输出通往细胞的梯度堵死。细胞变得毫无用处，直到被重置——这正是遗忘门允许的事（Gers et al., 2000）。
:::
:::

::: exercise GRU 退化为简单 RNN {level=2}
证明 $\mathbf{z}_t\equiv\mathbf{0}$、$\mathbf{r}_t\equiv\mathbf{1}$ 的 GRU 就是一个简单 RNN，并证明 $\mathbf{z}_t\equiv\mathbf{1}$ 的 GRU 无视自己的输入。怎样的门值给出泄漏积分器 $\mathbf{h}_t = \lambda\mathbf{h}_{t-1} + (1 - \lambda)\tilde{\mathbf{h}}_t$？
::: solution
$\mathbf{z} = \mathbf{0}$ 时，若 $\mathbf{r} = \mathbf{1}$ 则 $\mathbf{h}_t = \tilde{\mathbf{h}}_t = \tanh(W\mathbf{x}_t + U\mathbf{h}_{t-1} + \mathbf{b})$：恰是 Elman 更新。$\mathbf{z} = \mathbf{1}$ 时，一切 $t$ 都有 $\mathbf{h}_t = \mathbf{h}_{t-1}$：状态冻结，输入不起作用。恒定的更新门 $\mathbf{z}_t = \lambda\mathbf{1}$（比如用大权重把 $\sigma$ 推到固定值，或取极限令 $U_z = W_z = 0$、$\mathbf{b}_z = \operatorname{logit}\lambda$）就得到泄漏积分器——候选的指数滑动平均，时间常数 $1/(1 - \lambda)$。
:::
:::

::: exercise 穿过输出门的反向传播 {level=2}
对[[#eq-lstm]]，给定 $\bar{\mathbf{h}}_t$ 以及从第 $t + 1$ 步到达的细胞误差 $\bar{\mathbf{c}}_t^{\text{未来}} = \mathbf{f}_{t+1}\odot\bar{\mathbf{c}}_{t+1}$，推出输出门预激活上、$\mathbf{c}_t$ 上、遗忘门预激活上的误差。与清单对照。
::: solution
由 $\mathbf{h}_t = \mathbf{o}_t\odot\tanh\mathbf{c}_t$：$\bar{\mathbf{o}}_t = \bar{\mathbf{h}}_t\odot\tanh\mathbf{c}_t$，所以输出门的预激活收到 $\bar{\mathbf{h}}_t\odot\tanh\mathbf{c}_t\odot\mathbf{o}_t\odot(1 - \mathbf{o}_t)$。细胞收到两份贡献（扇出）：$\bar{\mathbf{c}}_t = \bar{\mathbf{h}}_t\odot\mathbf{o}_t\odot(1 - \tanh^2\mathbf{c}_t) + \mathbf{f}_{t+1}\odot\bar{\mathbf{c}}_{t+1}$。由 $\mathbf{c}_t = \mathbf{f}_t\odot\mathbf{c}_{t-1} + \dots$：$\bar{\mathbf{f}}_t = \bar{\mathbf{c}}_t\odot\mathbf{c}_{t-1}$，遗忘门的预激活收到 $\bar{\mathbf{c}}_t\odot\mathbf{c}_{t-1}\odot\mathbf{f}_t\odot(1 - \mathbf{f}_t)$。这些正是清单里的 `do`、`dc` 和 `da["f"]` 各行，其中回转项已在上一轮循环末尾折进了 `dc`。
:::
:::

::: exercise sigmoid 单元的消失界 {level=2 check="(0.25*3)^20"}
一个简单 RNN 以逻辑 sigmoid 为激活，$\sigma_{\max}(W_{hh}) = 3$。给 $\lVert\partial\mathbf{h}_{t}/\partial\mathbf{h}_{t-20}\rVert$ 一个界。这个网络的梯度可能爆炸吗？
::: solution
sigmoid 的斜率至多 $\gamma = \frac14$，于是界为 $(\frac14\cdot3)^{20} = 0.75^{20}\approx3.2\times10^{-3}$。由于 $\sigma_{\max} = 3 < 1/\gamma = 4$，[[#prop-conditions]]的 (1) 适用：长程项按几何速率消失；且由 (2) 它们不可能爆炸。要爆炸需要 $\sigma_{\max} > 4$。
:::
:::

::: exercise 复现测量 {level=3}
修改清单，让 `lstm_loss_grad` 同时返回 $\lVert\partial\ell/\partial\mathbf{x}_1\rVert$；生成[[#sec-measure]]那种“记住第一个符号”的序列（第一个符号取 $0$ 或 $1$，其后 $T - 1$ 个符号取自 $\{2, 3\}$，独热编码，目标为第一个符号），并复现表格中 LSTM 各列在 $T = 10, 50, 100$ 的趋势。再推出一个粗略预言：遗忘门停在 $f = \sigma(b_f)$、梯度以细胞通路为主时，$\log_{10}\lVert\partial\ell/\partial\mathbf{x}_1\rVert$ 应随 $T$ 怎样变化？
::: solution
在反向循环里，最后一轮（即第一个时间步）的切片 `du[H:]` 就是 $\partial\ell/\partial\mathbf{x}_1$；把它留下并返回范数。用 `init_lstm(8, 4, 2, random.Random(seed), forget_bias=b)` 对种子 $0$–$19$ 求范数 $\log_{10}$ 的平均，即得表中的数字（确切值取决于从生成器取序列的方式）。预言：若细胞通路主导，误差每步约乘 $f$，故 $\log_{10}\lVert\cdot\rVert\approx\text{常数} + (T - 1)\log_{10}\sigma(b_f)$。$b_f = 1$ 时 $\log_{10}0.731 = -0.136$ 每步，预言 $T = 10$ 到 $T = 50$ 下降约 $5.4$；实测降幅 $2.8$，更平缓，因为门并不恰好停在 $\sigma(b_f)$——输入也进入预激活，一些遗忘门更大。$b_f = 3$ 时预言每步 $-0.021$，$T = 10$ 到 $50$ 降 $0.84$，与实测的 $0.8$ 很接近。
:::
:::

::: exercise 鲁棒性-梯度的两难 {level=3}
考虑标量 RNN $h_t = \tanh(wh_{t-1} + x_t)$，$w = 2$，$t = 1$ 之后不再有输入。数值求 $h = \tanh(2h)$ 的非零不动点，证明它们稳定，并计算不动点处的因子 $\partial h_{t}/\partial h_{t-1}$。把结果与 Bengio、Simard 和 Frasconi（1994）的论证联系起来。
::: solution
从 $h = 1$ 迭代 $h\leftarrow\tanh(2h)$ 得 $h^*\approx\pm0.9575$。映射的导数是 $2(1 - \tanh^2(2h^*)) = 2(1 - h^{*2}) = 2(1 - 0.9168) = 0.1664$，小于 $1$，所以不动点稳定：网络可以把一个比特存在 $h$ 的符号里，小扰动每步按 $0.17$ 衰减。但同一个因子也乘在梯度上：在不动点处经过 $10$ 步，$\partial h_t/\partial h_{t-10}\approx0.1664^{10}\approx1.6\times10^{-8}$。让记忆对噪声鲁棒的那个稳定性，恰恰让后来损失的梯度消失——这就是 Bengio 等人形式化的两难。LSTM 绕开了它：把信息存在一个细胞里，保留与否由门控制，而不是由压缩的动力学控制。
:::
:::
