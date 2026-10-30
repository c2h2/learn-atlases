通常把 Transformer 画成一座由模块堆叠而成的塔，每个模块接收前一个模块的输出并产出下一个。对可解释性而言，另一幅图景更有用：每个注意力头与每个前馈层都从每个位置共享的一个向量中*读取*，这个向量就是**残差流**（residual stream），而它们把自己的输出*加*回去。除了加法，什么都不会被覆写。最终的 logit 是最终流的线性函数，因此它就是曾经写入它的每一个组件之贡献的和。而当这些组件是注意力头、其间没有非线性前馈层时，整个模型就展开成一个**路径**（path）之和——信息从词元嵌入流向输出所经过的头序列——每条路径都可以单独研究。

本章沿这一视角展开，遵循 Elhage 等人（2021）的《Transformer 回路的数学框架》（*A Mathematical Framework for Transformer Circuits*）。它把残差流写成各条组件写入之和，说明这个流没有特权基（privileged basis），并把每个注意力头分解为一个**QK 回路**——决定在哪里注意——与一个**OV 回路**——决定搬运什么。它推导零层、单层与两层仅注意力 Transformer 的**路径展开**（path expansion）——二元统计、跳跃三元组（skip-trigram），以及头与头之间复合成的*虚拟头*——然后是**直接 logit 归因**（direct logit attribution），它把一个输出 logit 拆分到写出它的各个组件上，并把最终归一化的处理明确讲清楚。[[interpretability/probing-attribution#def-lens]] 的 logit 透镜在此作为"解码一个部分和"的特例重新出现。这套框架是 [[interpretability/circuits]] 中那些回路的基础。

## 作为和的残差流 {#sec-sum}

我们使用 [[transformers/transformer-block]] 的预归一化（pre-norm）模块，并采用行向量约定：$T$ 个位置上的流是一个矩阵 $X\in\R^{T\times d}$，组件读取 $X$（经由一次归一化），并写回一个同样形状的矩阵。

::: definition 残差流与组件 {#def-stream}
设 $X_0 = E + P$ 为词元嵌入 $E$（第 $t$ 行是 $W_E[x_t]$，其中 $W_E\in\R^{\lvert\mathcal{V}\rvert\times d}$）加上位置嵌入 $P$。一个具有组件 $c_1, c_2, \dots, c_K$ 的 Transformer——第 $1$ 层的各个注意力头，接着第 $1$ 层的前馈层，接着第 $2$ 层的头，依此类推——计算
$$
X_k = X_{k-1} + c_k(X_{k-1})\quad\text{（同一层的各个头都读取同一个 } X\text{）},
$$
而最后一个组件之后的**残差流**为 $X_K = X_0 + \sum_{k=1}^Kc_k(\cdot)$。输出 logit 为 $\operatorname{Norm}(X_K)\,W_U$，其中解嵌入 $W_U\in\R^{d\times\lvert\mathcal{V}\rvert}$。
:::

由于这个流是一个和，任何组件的输出都会原封不动地供之后的每个组件使用，并且既直接到达输出，也经由一切下游计算到达。Elhage 等人把这个流描述为一个**通信信道**：组件之间并不直接对话，而是通过一个共享的 $d$ 维空间中的子空间对话。一个组件写入某个子空间，若之后没有任何组件读取该子空间，那么除了通过输出之外它不起任何作用；两个组件写入同一个子空间则会相互干扰。这个信道很拥挤：GPT-2 small 有 $144$ 个注意力头和 $12$ 个前馈层写入 $768$ 个维度，所以组件必须共享维度，而且有些组件似乎在充当"内存管理"，写入早先输出的负向量来腾出空间。

### 没有特权基 {#sec-basis}

关于这个流的一个基本事实是，它的坐标本身毫无意义。

::: definition 特权基 {#def-privileged}
若模型的计算对该表示的正交基变换不是不变的，则该表示有一个**特权基**——通常是因为对它施加了某个逐元素运算（ReLU、GELU、逐元素增益），这使得坐标轴变得特殊。
:::

::: proposition 残差流没有特权基 {#prop-rotation}
考虑一个归一化为 RMSNorm、且其逐元素增益已折叠进其后各权重矩阵的 Transformer。设 $R\in\R^{d\times d}$ 正交。把 $W_E$ 换成 $W_ER$（并把 $P$ 换成 $PR$）；把每个从流读取的矩阵 $W$（查询、键、值与各前馈层的第一个矩阵）换成 $R\T W$；把每个向流写入的矩阵 $W'$（各个头的输出矩阵与前馈层的输出矩阵）换成 $W'R$；并把 $W_U$ 换成 $R\T W_U$。新模型计算出完全相同的 logit，而它在每一层的残差流是 $X_kR$。
:::

::: proof
对 $k$ 归纳，新流是 $X_kR$。$k = 0$ 时这就是定义。设它对 $k - 1$ 成立。无增益的 RMSNorm 是逐行的 $\operatorname{Norm}(\mathbf{x}) = \mathbf{x}/\operatorname{RMS}(\mathbf{x})$，而 $\operatorname{RMS}(\mathbf{x}R) = \lVert\mathbf{x}R\rVert/\sqrt d = \lVert\mathbf{x}\rVert/\sqrt d$，所以 $\operatorname{Norm}(X_{k-1}R) = \operatorname{Norm}(X_{k-1})R$。一次读取把它乘上 $R\T W$，得到 $\operatorname{Norm}(X_{k-1})RR\T W = \operatorname{Norm}(X_{k-1})W$：每个查询、键、值与前馈预激活都不变，于是注意力模式、乘 $W_O$ 之前的头输出、以及神经元激活也都不变。一次写入把一个未变的量乘上 $W'R$，所以该组件的贡献是其旧贡献乘上 $R$。相加得 $X_k R$。最后 $\operatorname{Norm}(X_KR)R\T W_U = \operatorname{Norm}(X_K)W_U$。
:::

LayerNorm 还要减去坐标的均值，这单独挑出了方向 $\mathbf{1}$，所以对 LayerNorm 模型，这条命题对固定 $\mathbf{1}$ 的旋转成立（在把中心化折叠进权重之后——正如各个可解释性库所做的那样——它在剩下的 $d - 1$ 个维度上成立）。证明还指出了*什么*才是特权的：前馈层的神经元——那里施加了逐元素的非线性——以及注意力模式——它是位置上的一个概率分布。这就是为什么可解释性在前馈层里寻找有意义的*神经元*、在残差流里寻找有意义的*方向*，也是为什么——正如 [[interpretability/superposition]] 所解释的——即便神经元也常常谈不上有意义。

## 注意力头作为 QK 回路与 OV 回路 {#sec-qkov}

单个注意力头 $h$ 带有矩阵 $W_Q^h, W_K^h, W_V^h\in\R^{d\times d_k}$ 与 $W_O^h\in\R^{d_k\times d}$（[[transformers/multi-head-attention]]），它读取（归一化后的）流 $X$ 并写入

$$
h(X) = A^h\,X\,W_V^hW_O^h,\qquad A^h = \operatorname{softmax}\Bigl(\operatorname{mask}\bigl(XW_Q^h(XW_K^h)\T/\sqrt{d_k}\bigr)\Bigr).
$$ {#eq-head}

矩阵只以两个乘积的形式出现。

::: definition QK 回路与 OV 回路 {#def-qkov}
头 $h$ 的 **QK 矩阵**是 $W_{QK}^h = W_Q^h(W_K^h)\T\in\R^{d\times d}$，从位置 $i$ 到位置 $j$ 的注意力分数是 $\mathbf{x}_iW_{QK}^h\mathbf{x}_j\T/\sqrt{d_k}$。**OV 矩阵**是 $W_{OV}^h = W_V^hW_O^h\in\R^{d\times d}$，而该头向位置 $i$ 写入 $\sum_jA^h_{ij}\,\mathbf{x}_jW_{OV}^h$。两者的秩都不超过 $d_k$。与嵌入、解嵌入复合后，它们给出词元级的 **QK 回路** $W_EW_{QK}^hW_E\T\in\R^{\lvert\mathcal{V}\rvert\times\lvert\mathcal{V}\rvert}$（一个查询词元多么想注意某个键词元）与 **OV 回路** $W_EW_{OV}^hW_U\in\R^{\lvert\mathcal{V}\rvert\times\lvert\mathcal{V}\rvert}$（注意某个词元如何改变 logit）。
:::

这一分解把注意力图混淆在一起的两个问题分开了（[[interpretability/probing-attribution#sec-attention]]）：QK 回路决定模式 $A^h$，即信息*从哪里*搬出；OV 回路决定*搬运什么*，与搬去哪里无关。$W_Q^h$ 与 $W_K^h$ 单独都没有含义——对任何可逆的 $M$，把它们换成 $W_Q^hM$ 与 $W_K^hM^{-\mathsf{T}}$ 都不改变 $W_{QK}^h$——所以只有这些乘积才是可解释的对象。

::: example 形状与秩 {#ex-shapes}
在 GPT-2 small（$d = 768$，每层 $12$ 个头，$d_k = 64$，$\lvert\mathcal{V}\rvert = 50{,}257$）中，给出 $W_{QK}^h$、$W_{OV}^h$ 与词元级 OV 回路的形状和最大秩，并把存放 $W_{QK}^h$ 所用的参数与一个完整的 $d\times d$ 矩阵的参数作比较。
::: solution
$W_{QK}^h$ 与 $W_{OV}^h$ 是 $768\times768$、秩至多 $64$ 的矩阵。词元级 OV 回路是 $50{,}257\times50{,}257$——约 $2.5\times10^9$ 个条目——秩同样至多 $64$，因此它从不被显式构造；人们经由它的因子或少数几行来研究它。$W_Q^h$ 与 $W_K^h$ 共有 $2\times768\times64 = 98{,}304$ 个参数，而一个完整矩阵需要 $768^2 = 589{,}824$ 个：每个头都是一个低秩双线性型，这是各个头走向特化的原因之一。
:::
:::

## 仅注意力 Transformer 的路径展开 {#sec-paths}

前馈层是非线性的，不会展开成路径。因此 Elhage 等人研究了**仅注意力**（attention-only）Transformer——去掉所有 MLP——并在普通文本上训练；它们是更弱的模型，却几乎可以被完全理解。我们也去掉归一化（或把它们的尺度当作每个位置固定的，如 [[#sec-dla]] 中那样）与位置嵌入，这两点 Elhage 等人是另行处理的。

**零层。** 没有任何组件时，$\text{logits} = X_0W_U$，位置 $t$ 上的预测只依赖当前词元：$W_EW_U$ 的第 $x_t$ 行。用下一词元预测训练这样的模型，会让 $W_EW_U$ 逼近**二元模型的对数似然**（[[text-and-language/ngram-models]]），每行至多差一个常数；当 $d < \lvert\mathcal{V}\rvert$ 时它是后者的一个秩 $d$ 近似。

**单层。** 单层中有头 $h\in\mathcal{H}$，

::: proposition 单层仅注意力 Transformer 的路径展开 {#prop-one}
对固定的注意力模式 $A^h$，
$$
\text{logits} = \underbrace{X_0W_U}_{\text{直连路径}} + \sum_{h\in\mathcal{H}}\underbrace{A^h\,X_0\,W_{OV}^hW_U}_{\text{经由头 }h\text{ 的路径}},
$$ {#eq-one}
并且，把 $X_0 = E$ 写成一热行乘以 $W_E$，头 $h$ 在位置 $i$ 对词元 $v$ 贡献的 logit 是 $\sum_{j\le i}A^h_{ij}\,\bigl[W_EW_{OV}^hW_U\bigr]_{x_j, v}$，其中对 $j\le i$ 有 $A^h_{ij}\propto\exp\bigl([W_EW_{QK}^hW_E\T]_{x_i,x_j}/\sqrt{d_k}\bigr)$。
:::

::: proof
由 [[#eq-head]] 有 $X_1 = X_0 + \sum_hA^hX_0W_{OV}^h$，乘上 $W_U$ 并由分配律即得 [[#eq-one]]。把 $X_0 = OW_E$ 写出，$O$ 为一热行矩阵，则 $A^hOW_EW_{OV}^hW_U$ 的第 $i$ 行是 $A^h_{ij}$ 乘以 OV 回路的第 $x_j$ 行之和。分数为 $X_0W_{QK}^hX_0\T = O\,(W_EW_{QK}^hW_E\T)\,O\T$，其 $(i,j)$ 条目就是词元对 $(x_i, x_j)$ 的 QK 回路条目。
:::

这条命题说，单层仅注意力模型是一张二元统计表，加上对每个头的一对 $\lvert\mathcal{V}\rvert\times\lvert\mathcal{V}\rvert$ 表：QK 表在当前词元给定的条件下选出该注意哪个较早的词元，OV 表则说那个较早的词元会抬高哪些输出。Elhage 等人把得到的统计量称为**跳跃三元组**（skip-trigram）：形如"$a\ldots b\to c$"的模式，当前词元 $b$ 回头注意较早的 $a$ 并预测 $c$。检视这两张表里最大的条目，他们发现了一些几乎只做**复制**的头：OV 回路抬高被注意词元自身的 logit（正特征值占主导），于是一个早先见过的词元再次变得更可能——例如"… keep … in → mind"与"… keep … in → keep"并列出现。这一模式也暴露了架构的局限：跳跃三元组"keep … in → mind"无法与"keep … at → bay"分开而不同时产生"keep … in → bay"，因为这些表是相加的。

::: example 手算一条跳跃三元组 {#ex-skip}
一个单层模型的词表为 $\{A, B, C\}$，$W_E = W_U = I_3$（于是 $d = 3$），且只有一个头。它的 QK 回路除以下事实外全为零：查询 $C$ 给键 $A$ 打 $2$ 分（已经过 $\sqrt{d_k}$ 缩放）；它的 OV 回路除 $[OV]_{A, B} = 3$ 外全为零。对序列 $A\,B\,C$，计算最后一个位置上的 logit。
::: solution
在位置 $3$（词元 $C$），对键 $A, B, C$ 的分数是 $(2, 0, 0)$，于是 $A^h_{3,\cdot} = \operatorname{softmax}(2, 0, 0) = (0.787, 0.107, 0.107)$。该头加上 $0.787\times(\text{OV 回路的第 } A\text{ 行}) = 0.787\times(0, 3, 0) = (0, 2.361, 0)$；OV 回路的 $B$ 行与 $C$ 行为零。直连路径加上 $W_EW_U$ 的第 $C$ 行 $(0, 0, 1)$。logit 为 $(0, 2.361, 1)$：模型预测 $B$，实现了跳跃三元组"$A\ldots C\to B$"。若 $A$ 没有出现，该头就什么也不贡献，二元路径会偏向 $C$。
:::
:::

**两层。** 在第二层中，头读取 $X_1 = X_0 + \sum_{h}h(X_0)$，其中包含第一层各个头的输出。它可以在三个地方用上它们，Elhage 等人称之为三种**复合**（composition）：

- **Q-复合**：查询 $X_1W_Q$ 包含了第一层的输出，于是第二层的头*注意哪里*可以依赖于早先某个头找到了什么；
- **K-复合**：键也如此——某个位置上的键可以描述早先某个头搬到了那里的东西，例如它前面是哪个词元；
- **V-复合**：值包含第一层的输出，于是第二层的头可以搬运早先某个头已经搬运过的信息。

V-复合给出精确的路径。把头的公式应用两次，

::: proposition 虚拟注意力头 {#prop-virtual}
对固定的注意力模式，第二层头 $h_2$ 的输出为
$$
h_2(X_1) = A^{h_2}X_0W_{OV}^{h_2} + \sum_{h_1}\bigl(A^{h_2}A^{h_1}\bigr)\,X_0\,\bigl(W_{OV}^{h_1}W_{OV}^{h_2}\bigr),
$$ {#eq-virtual}
于是每一对 $(h_1, h_2)$ 都像一个额外的头——一个**虚拟注意力头**——其注意力模式为 $A^{h_2}A^{h_1}$，OV 矩阵为 $W_{OV}^{h_1}W_{OV}^{h_2}$。一个 $L$ 层、每层 $H$ 个头的仅注意力模型，从嵌入到输出共有 $(1 + H)^L$ 条这样的路径。
:::

::: proof
$h_2(X_1) = A^{h_2}X_1W_{OV}^{h_2}$，其中 $X_1 = X_0 + \sum_{h_1}A^{h_1}X_0W_{OV}^{h_1}$；用分配律展开。计数方面，$L$ 层中的每一层都要么经由残差连接、要么经由它的 $H$ 个头之一通过，各层独立，于是从 $X_0$ 到 $X_L$ 共有 $(1+H)^L$ 个 OV 矩阵的乘积（相应地也有注意力模式的乘积）；乘上 $W_U$ 就得到 logit 路径。
:::

然而，第二层的注意力模式并不是固定的：它们通过 Q-复合与 K-复合依赖 $X_1$，而分数 $X_1W_{QK}^{h_2}X_1\T$ 展开后会出现对第一层输出*二次*的项，形如 $X_0W_{OV}^{h_1\mathsf{T}}\cdots$。两层模型正是在这里获得了性质上的新能力。[[interpretability/circuits]] 的**归纳头**就是一个 K-复合回路：第一层的"前词元头"把每个词元的前驱身份写进它所在的位置，第二层的头把这个信息用作键，去寻找当前词元早先出现之后的那个位置。Elhage 等人用一个**复合得分**来度量两个头复合的程度，对 K-复合是 $\lVert W_{QK}^{h_2\mathsf{T}}W_{OV}^{h_1}\rVert_F\bigl/\bigl(\lVert W_{QK}^{h_2}\rVert_F\lVert W_{OV}^{h_1}\rVert_F\bigr)$，对 Q-复合与 V-复合类似，并与随机矩阵的取值作比较。

::: example 有多少条路径？ {#ex-paths}
一个具有 GPT-2 small 形状（$12$ 层，每层 $12$ 个头）的仅注意力模型，从嵌入到输出共有多少条路径？恰好由两个头组成的虚拟头有多少个？
::: solution
$(1 + 12)^{12} = 13^{12} = 23{,}298{,}085{,}122{,}481\approx2.3\times10^{13}$ 条路径。恰好经由两个头的路径要从 $12$ 层中选出两层、并在每层各选一个头：$\binom{12}{2}\cdot12^2 = 66\times144 = 9504$ 个虚拟头。长路径的穷举是不可能的，这就是为什么各种分析都依赖"多数路径可以忽略"这一点：Elhage 等人发现，在他们的小模型里重要的路径都很短。
:::
:::

## 直接 logit 归因 {#sec-dla}

和的结构为任何预测给出了一个简单的归因。取最后一个位置 $i$，以及候选词元 $a$ 与竞争词元 $b$ 之间的 logit 差——正是这个量决定谁胜出，并且它对全体 logit 加上同一常数保持不变。设 $\mathbf{x} = \mathbf{x}_0 + \sum_k\mathbf{c}_k$ 为位置 $i$ 的最终残差流，即嵌入与各组件在此处写入之和。使用最终的 RMSNorm 时，$\operatorname{Norm}(\mathbf{x}) = \mathbf{x}/\sigma(\mathbf{x})$，其中 $\sigma(\mathbf{x}) = \operatorname{RMS}(\mathbf{x})$。

::: proposition 直接 logit 归因 {#prop-dla}
设 $\Delta\mathbf{u} = W_U[:, a] - W_U[:, b]$ 为 **logit 差方向**。则
$$
\text{logit}_a - \text{logit}_b = \frac{\mathbf{x}_0\cdot\Delta\mathbf{u}}{\sigma(\mathbf{x})} + \sum_k\frac{\mathbf{c}_k\cdot\Delta\mathbf{u}}{\sigma(\mathbf{x})},
$$ {#eq-dla}
而 $\operatorname{DLA}_k = \mathbf{c}_k\cdot\Delta\mathbf{u}/\sigma(\mathbf{x})$ 这一项就是组件 $k$ 的**直接 logit 归因**。对 LayerNorm，把每个 $\mathbf{c}_k$ 换成其中心化版本 $\mathbf{c}_k - \bar c_k\mathbf{1}$（并把增益折叠进 $W_U$）；分解依然是精确的。
:::

::: proof
$\text{logit}_a - \text{logit}_b = \operatorname{Norm}(\mathbf{x})\cdot\Delta\mathbf{u} = (\mathbf{x}\cdot\Delta\mathbf{u})/\sigma(\mathbf{x})$，而点积对 $\mathbf{x} = \mathbf{x}_0 + \sum_k\mathbf{c}_k$ 是线性的。对 LayerNorm，$\operatorname{Norm}(\mathbf{x}) = (\mathbf{x} - \bar x\mathbf{1})/\sigma(\mathbf{x})\odot\boldsymbol{\gamma} + \boldsymbol{\beta}$；偏置 $\boldsymbol\beta$ 给 logit 差加上一个常数，增益逐元素地乘到 $\Delta\mathbf{u}$ 上，而中心化是一个在求和上可分配的线性映射。
:::

两个注意事项决定了 DLA 该怎么读。第一，尺度 $\sigma(\mathbf{x})$ 依赖于所有组件整体，所以 DLA 对实际的输入是精确的，但它不是*移除*一个组件的效应——移除还会改变 $\sigma$。只有在把尺度冻结在其观测值上时它才是线性的，这也是通行的约定。第二，也是更重要的，DLA 只度量**直接**效应：组件输出中不经过任何后续组件就到达 logit 的那部分。一个头的输出被后来的头读取、再由后者写下答案时，它的 DLA 很小而总效应很大；而后来的组件也可能抵消更早组件的直接贡献。回路研究的文献两者都发现了：*后备*（backup）头在某个头被消融时接管，*负*头则压制回路算出的答案（Wang 等人，2023；McDougall 等人，2023，关于复制抑制）。总效应需要干预（[[interpretability/causal-interventions]]）。

::: example 带归一化的直接 logit 归因 {#ex-dla}
在最后一个位置上，嵌入贡献 $\mathbf{x}_0 = (1, 0, 1)$，两个头分别贡献 $\mathbf{c}_1 = (2, 1, 0)$ 与 $\mathbf{c}_2 = (-1, 1, 1)$。最终归一化是无增益的 RMSNorm，且 $\Delta\mathbf{u} = (1, -1, 0.5)$。计算各部分的 DLA 并检验其和。
::: solution
$\mathbf{x} = (2, 2, 2)$，于是 $\sigma = \sqrt{(4 + 4 + 4)/3} = 2$。与 $\Delta\mathbf{u}$ 的点积：嵌入 $1 + 0 + 0.5 = 1.5$，头 $1$：$2 - 1 + 0 = 1$，头 $2$：$-1 - 1 + 0.5 = -1.5$。除以 $\sigma$：$0.75$、$0.5$ 与 $-0.75$，其和为 $0.5$。直接计算 $\mathbf{x}\cdot\Delta\mathbf{u}/\sigma = (2 - 2 + 1)/2 = 0.5$。头 $2$ 在逆着 $a$ 推；但若移除头 $2$，$\mathbf{x}$ 会变成 $(3, 1, 1)$，$\sigma = 1.915$，logit 差为 $2.5/1.915 = 1.31$，而不是 $0.5 + 0.75 = 1.25$，因为尺度变了。
:::
:::

DLA 是一个投影，下图展示了它在二维中的几何：一个组件的贡献，是它的写入在 logit 差方向上的投影（带符号）长度乘上那个方向的长度。

::: widget projection
u: 3,1
v: 1,2
caption: 直接 logit 归因作为投影。设 $\mathbf{u}$ 为 logit 差方向 $\Delta\mathbf{u}$，$\mathbf{v}$ 为某组件向残差流的写入。DLA（除以归一化尺度之前）为 $\mathbf{v}\cdot\mathbf{u} = \lVert\mathbf{u}\rVert$ 乘以投影的带符号长度。$\mathbf{v}$ 的正交分量对这个 logit 差没有直接影响，尽管后续的组件可能读取它。
:::

### 作为部分和的 logit 透镜 {#sec-lens}

logit 透镜（[[interpretability/probing-attribution#def-lens]]）把 $X_k$——嵌入与前 $k$ 个组件写入之和——当作最终流来解码。用路径的语言说，它保留所有终结于组件 $k + 1$ 之前的路径，并通过最终的归一化与 $W_U$ 读出它们。这在中间层常常给出合理的预测，是关于训练好的模型的一个经验事实：各个组件倾向于沿与解嵌入对齐的方向写入，细化一个已经部分在场的预测。当它失败时——比如在有些模型家族上——中间层的流处于一个输出头不读取的基之下，这正是校准透镜的动机。DLA 与 logit 透镜是互补的：DLA 问每个组件*添加*给最终 logit 差的到底是什么，透镜问这个滚动累加*预测*了什么。

::: quiz
在一个 $12$ 层的模型中，第 $3$ 层的一个头对正确答案的直接 logit 归因接近零，但消融它却使正确 logit 大幅下降。最可能的解释是什么？
- [ ] 计算 DLA 时把 $\Delta\mathbf{u}$ 的符号取错了。
- [x] 该头是间接影响答案的：后来的组件读取它写入的东西，由那些组件写下了答案。
- [ ] 消融不可靠，应当忽略。
- [ ] 该头只写入最后位置以外的位置，所以不可能有影响。
::: solution
DLA 只度量从头直达 logit 的路径。一个输出被后来的头或 MLP 读取的头——例如一个为归纳头供信息的前词元头——直接效应小而间接效应大。（只写入更早的位置也不能阻止效应：最后位置上的后续头可以读取那些位置。）
:::
:::

### 前馈层 {#sec-mlp}

前馈层在一个位置上计算 $\phi(\mathbf{x}W_{\text{in}})W_{\text{out}}$；它的写入是对神经元 $n$ 求和，每项为激活 $\phi(\cdot)_n$ 乘上第 $n$ 行 $W_{\text{out}}[n]$，所以每个神经元写入一个由其激活缩放的固定方向。DLA 对每个神经元都适用，把 $W_{\text{out}}[n]$ 投影到解嵌入上，就得到该神经元抬高的那些词元。Geva 等人（2021，2022）以这种方式把前馈层读作**键值记忆**（key–value memories），其值向量投影到词表后常常抬高一些可解释的词元集合。非线性意味着不存在穿过 MLP 的精确路径展开：或者把每层的输出当作不透明的组件，或者在观测到的输入处把它线性化，或者把它换成一个更可解释的近似——[[interpretability/sparse-features]] 的转码器正是为此设计的。

::: warning 线性分解掩盖非线性依赖
路径展开与 DLA 是精确的——*对观测到的注意力模式与归一化尺度而言*。而这些量本身是整个流的函数，所以"头 $h$ 给 logit 差贡献 $+2.3$"这句话，是在这个输入上、其余一切保持原样时才成立。改动任何上游组件都会改变模式与尺度，从而改变每一项。要把分解读作"输出在这一个输入上如何组装起来"的说明，而关于*如果*某个东西变了会怎样的论断，要用干预来检验。
:::

## 一个数值实验室 {#sec-code}

清单用纯 Python 以随机权重搭出一个极小的仅注意力 Transformer——词表 $5$，$d = 4$，$d_k = 2$，第 $1$ 层两个头、第 $2$ 层一个头，没有归一化——并从数值上检验本章的各个恒等式：单层路径展开 [[#eq-one]]、第 $2$ 层头输出的虚拟头展开 [[#eq-virtual]]（连同它实际的注意力模式）、直接 logit 归因 [[#eq-dla]]，以及 [[#prop-rotation]] 的旋转不变性。

```python
import math, random
rng = random.Random(3)

V, D, DK = 5, 4, 2                                   # 词表、残差宽度、头宽
def mat(r, c): return [[rng.gauss(0, 1) for _ in range(c)] for _ in range(r)]
def mm(A, B): return [[sum(a * b for a, b in zip(row, col)) for col in zip(*B)] for row in A]
def tr(A): return [list(r) for r in zip(*A)]
def add(A, B): return [[a + b for a, b in zip(r, s)] for r, s in zip(A, B)]
def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; t = sum(e); return [v / t for v in e]

W_E, W_U = mat(V, D), mat(D, V)                      # (V, D), (D, V)
def head_params(): return mat(D, DK), mat(D, DK), mat(D, DK), mat(DK, D)   # W_Q, W_K, W_V, W_O
H1 = [head_params(), head_params()]                  # 第 1 层：两个头
H2 = [head_params()]                                 # 第 2 层：一个头

def attn_pattern(X, WQ, WK):                         # 因果 softmax 模式，(T, T)
    S = mm(mm(X, WQ), tr(mm(X, WK)))
    return [softmax([S[i][j] / math.sqrt(DK) for j in range(i + 1)]) + [0.0] * (len(X) - i - 1)
            for i in range(len(X))]
def head_out(X, p, A=None):                          # A X W_V W_O, (T, D)
    WQ, WK, WV, WO = p
    A = A or attn_pattern(X, WQ, WK)
    return mm(A, mm(mm(X, WV), WO)), A

tokens = [0, 3, 1, 3]
X0 = [W_E[t] for t in tokens]                        # (T, D)

# 单层：logits = (X0 + sum_h h(X0)) W_U 与 直连路径 + 各头路径
outs = [head_out(X0, p) for p in H1]
X1 = X0
for o, _ in outs: X1 = add(X1, o)
logits = mm(X1, W_U)                                 # (T, V)
recon = mm(X0, W_U)
for (o, A), p in zip(outs, H1): recon = add(recon, mm(A, mm(X0, mm(mm(p[2], p[3]), W_U))))
err = max(abs(a - b) for r, s in zip(logits, recon) for a, b in zip(r, s))
print("1-layer: max |logits - (direct + head paths)| =", f"{err:.1e}")

# 头 1.0 的词元级回路，各为 (V, V)
WQ, WK, WV, WO = H1[0]
QK = mm(mm(W_E, mm(WQ, tr(WK))), tr(W_E))            # 查询词元 x 键词元
OV = mm(mm(W_E, mm(WV, WO)), W_U)                    # 被注意词元 -> logit
print("head 1.0 OV circuit, row for token 3:", [round(v, 2) for v in OV[3]])
print("  the token it most boosts when attending to 3:", OV[3].index(max(OV[3])))

# 最后位置上 logit(a) - logit(b) 的直接 logit 归因
a, b = 2, 4
def dla(vec): return sum(v * (W_U[k][a] - W_U[k][b]) for k, v in enumerate(vec))
parts = {"embedding": dla(X0[-1])}
for h, (o, _) in enumerate(outs): parts[f"head 1.{h}"] = dla(o[-1])
print("DLA at last position:", {k: round(v, 3) for k, v in parts.items()},
      " sum", round(sum(parts.values()), 3), " logit diff", round(logits[-1][a] - logits[-1][b], 3))

# 两层：头 2.0 输出 = 直连 OV 路径 + 虚拟头 (A2 A1, W_OV1 W_OV2)
o2, A2 = head_out(X1, H2[0])
OV2 = mm(H2[0][2], H2[0][3])
virtual = mm(A2, mm(X0, OV2))
for (o, A), p in zip(outs, H1):
    virtual = add(virtual, mm(mm(A2, A), mm(X0, mm(mm(p[2], p[3]), OV2))))
err2 = max(abs(x - y) for r, s in zip(o2, virtual) for x, y in zip(r, s))
print("2-layer: max |head 2.0 output - sum of its OV paths| =", f"{err2:.1e}")

# 没有特权基：用正交矩阵 R 旋转残差流
th = 0.7
R = [[math.cos(th), -math.sin(th), 0, 0], [math.sin(th), math.cos(th), 0, 0],
     [0, 0, math.cos(2 * th), -math.sin(2 * th)], [0, 0, math.sin(2 * th), math.cos(2 * th)]]
W_E_r, W_U_r = mm(W_E, R), mm(tr(R), W_U)
H1_r = [(mm(tr(R), q), mm(tr(R), k), mm(tr(R), v), mm(o, R)) for q, k, v, o in H1]
X0r = [W_E_r[t] for t in tokens]
X1r = X0r
for p in H1_r: X1r = add(X1r, head_out(X0r, p)[0])
err3 = max(abs(x - y) for r, s in zip(mm(X1r, W_U_r), logits) for x, y in zip(r, s))
print("rotated model: max |logit change| =", f"{err3:.1e}")
```

```text
1-layer: max |logits - (direct + head paths)| = 3.6e-15
head 1.0 OV circuit, row for token 3: [0.94, 1.73, 0.61, -1.07, 1.54]
  the token it most boosts when attending to 3: 1
DLA at last position: {'embedding': -0.97, 'head 1.0': -4.005, 'head 1.1': -5.988}  sum -10.963  logit diff -10.963
2-layer: max |head 2.0 output - sum of its OV paths| = 4.4e-15
rotated model: max |logit change| = 3.6e-15
```

所有恒等式都在舍入误差内成立。这个随机头的 OV 回路不是复制回路——注意词元 $3$ 最抬高的是词元 $1$ 的 logit，还压低了词元 $3$ 自己的 logit——这正是人们在训练好的头的 OV 回路上读出的那类性质（最后一道习题问如何量化复制）。

::: history
残差连接随 ResNet（He 等人，2015）进入深度学习；"残差网络的行为像许多较浅路径的集成"这一观点由 Veit、Wilber 与 Belongie（2016）提出。对 Transformer，Anthropic 的 Elhage、Nanda、Olsson 与合作者（2021）在 Transformer Circuits 专栏（Thread）上发表《Transformer 回路的数学框架》，引入了作为通信信道的残差流、QK/OV 分解、路径展开、三种复合与虚拟头，并研究了零层、单层与两层的仅注意力模型；他们关于归纳头的姊妹论文于 2022 年跟进。nostalgebraist 的 logit 透镜（2020）与 Geva 等人在词表空间对前馈层的读取（2021，2022）利用了同样的线性结构；Dar 等人（2023）把整个权重矩阵投影到词表。直接 logit 归因成为 Wang 等人的间接宾语识别研究（2023）这类回路分析中的标准第一步，而 TransformerLens（Nanda 与 Bloom，2022）这样的库让这些分解变成了例行操作。
:::

::: summary
- **残差流**是一个和：$X_K = X_0 + \sum_kc_k$，每个组件从中读取、并向它加上；logit 是其归一化终值的线性函数。
- 这个流**没有特权基**：旋转它、并对每次读取与写入作补偿性改动，模型的功能不变（对 RMSNorm 是精确的）。神经元与注意力模式是特权的；残差特征是**方向**。
- 一个头分解为 **QK 回路** $W_Q W_K\T$（在哪里注意）与 **OV 回路** $W_VW_O$（搬运什么），秩都不超过 $d_k$；词元级则是 $W_EW_{QK}W_E\T$ 与 $W_EW_{OV}W_U$。
- 零层模型是一张**二元**表；单层仅注意力模型是一张二元表加上每个头各自的**跳跃三元组**表。两层中，头经由查询、键与值**复合**；V-复合给出**虚拟头** $A^{h_2}A^{h_1}$、$W_{OV}^{h_1}W_{OV}^{h_2}$，$L$ 层 $H$ 头共有 $(1+H)^L$ 条路径。
- **直接 logit 归因**把一个 logit 差按组件拆成 $\mathbf{c}_k\cdot\Delta\mathbf{u}/\sigma$，对冻结的归一化尺度是精确的；它只度量**直接**效应。**logit 透镜**解码部分和。
:::

## 习题

::: exercise 数虚拟头 {level=1 check="1728"}
一个仅注意力模型有 $3$ 层、每层 $12$ 个头。从嵌入到输出的路径中，有多少条恰好经过三个层中每层的一个头？
::: solution
每层各选一个头，相互独立：$12^3 = 1728$。（路径总数是 $13^3 = 2197$。）
:::
:::

::: exercise 一次直接 logit 归因 {level=1 check="3/sqrt(2)"}
某个位置的最终残差流为 $\mathbf{x} = \mathbf{x}_0 + \mathbf{c}_1 + \mathbf{c}_2$，其中 $\mathbf{x}_0 = (0, 1)$，$\mathbf{c}_1 = (1, 1)$，$\mathbf{c}_2 = (1, -2)$。最终归一化是无增益的 RMSNorm，且 $\Delta\mathbf{u} = (2, 1)$。计算 $\mathbf{c}_1$ 的 DLA。
::: solution
$\mathbf{x} = (2, 0)$，于是 $\sigma = \sqrt{(4 + 0)/2} = \sqrt2$。于是 $\mathbf{c}_1\cdot\Delta\mathbf{u} = 2 + 1 = 3$，$\operatorname{DLA}_1 = 3/\sqrt2\approx2.121$。（作为比较，嵌入贡献 $1/\sqrt2$，$\mathbf{c}_2$ 贡献 $0$；总和为 $4/\sqrt2 = \mathbf{x}\cdot\Delta\mathbf{u}/\sigma$。）
:::
:::

::: exercise QK 矩阵的不变性 {level=1}
证明当 $M\in\R^{d_k\times d_k}$ 可逆时，把 $W_Q$ 换成 $W_QM$、把 $W_K$ 换成 $W_KM^{-\mathsf{T}}$ 不改变注意力模式，并给出 $W_V$ 与 $W_O$ 的类似不变性。
::: solution
$W_QM(W_KM^{-\mathsf{T}})\T = W_QMM^{-1}W_K\T = W_QW_K\T$，所以分数、以及模式都不变。同样 $W_VM\cdot M^{-1}W_O = W_VW_O$。只有 $W_{QK}$ 与 $W_{OV}$ 由函数决定，所以一个头单独的查询、键、值或输出维度没有内在含义。
:::
:::

::: exercise 零层模型 {level=2}
证明：若一个 $d\ge\lvert\mathcal{V}\rvert$ 的零层 Transformer 在语料上用交叉熵训练到收敛，则 $W_EW_U$ 第 $v$ 行的 softmax 就是跟在 $v$ 后面的词元的经验分布。当 $d < \lvert\mathcal{V}\rvert$ 时会有什么变化？
::: solution
损失为 $-\sum_t\log\operatorname{softmax}(\mathbf{z}_{x_t})_{x_{t+1}}$，其中 $\mathbf{z}_v$ 是 $Z = W_EW_U$ 的第 $v$ 行；把各项按当前词元归组，第 $v$ 行出现在 $-\sum_{w}n(v,w)\log\operatorname{softmax}(\mathbf{z}_v)_w$ 中，这是下一词元的经验计数与 $\operatorname{softmax}(\mathbf{z}_v)$ 之间的交叉熵，当 $\operatorname{softmax}(\mathbf{z}_v)_w = n(v,w)/\sum_{w'}n(v,w')$ 时达到最小（未见的词元对的 logit 趋于 $-\infty$ 而逼近）。当 $d\ge\lvert\mathcal{V}\rvert$ 时任何矩阵 $Z$ 都可写成乘积 $W_EW_U$，所以最优值可以取到。当 $d < \lvert\mathcal{V}\rvert$ 时，$Z$ 的秩至多为 $d$，模型学到的是这种交叉熵意义下最好的秩 $d$ 近似：一个因子化的二元模型，就像 [[text-and-language/word-embeddings]] 的词嵌入。
:::
:::

::: exercise 一个复制头 {level=2}
在 [[#ex-skip]] 中把 OV 回路改成 $3I_3$（每个被注意的词元抬高自己的 logit $3$）。计算 $A\,B\,C$ 最后一个位置上的 logit，并描述该头的行为。
::: solution
该头加上 $0.787(3, 0, 0) + 0.107(0, 3, 0) + 0.107(0, 0, 3) = (2.361, 0.320, 0.320)$；直连路径加上 $(0, 0, 1)$。logit 为 $(2.361, 0.320, 1.320)$：模型预测 $A$，即它所注意的那个词元。OV 回路接近单位矩阵正倍数的头是一个**复制**（copying）头：它抬高早先出现过的词元的概率，这正是 [[interpretability/circuits]] 归纳机制的基础。
:::
:::

::: exercise DLA 对比消融 {level=2}
在 [[#ex-dla]] 中计算移除头 $1$ 后的 logit 差，并把变化与头 $1$ 的 DLA 作比较。解释这一差异。
::: solution
没有头 $1$ 时，$\mathbf{x} = (1, 0, 1) + (-1, 1, 1) = (0, 1, 2)$，$\sigma = \sqrt{5/3} = 1.291$，且 $\mathbf{x}\cdot\Delta\mathbf{u} = 0 - 1 + 1 = 0$，于是 logit 差变为 $0$。变化量 $0.5$ 恰等于头 $1$ 的 DLA $0.5$——但这只是因为剩下的分子恰好为零，新的尺度什么也没乘掉。改为移除头 $2$，logit 差从 $0.5$ 变为 $1.31$，变化 $0.81$，而它的 DLA 是 $-0.75$（[[#ex-dla]]）：一般地，移除一个组件时尺度 $\sigma$ 会变，DLA 并不是消融的效应。
:::
:::

::: exercise 旋转与 LayerNorm {level=3}
LayerNorm（无增益）计算 $(\mathbf{x} - \bar x\mathbf{1})/\sigma$，其中 $\sigma$ 是坐标的标准差。证明它与正交矩阵 $R$ 交换（即对一切 $\mathbf{x}$ 有 $\operatorname{LN}(\mathbf{x}R) = \operatorname{LN}(\mathbf{x})R$）当且仅当 $\mathbf{1}R = \pm\mathbf{1}$（$d\ge2$），并指出 [[#prop-rotation]] 对 LayerNorm 模型在哪些旋转下成立。
::: solution
把中心化投影写成 $P = I - \tfrac1d\mathbf{1}\T\mathbf{1}$（从右侧作用在行向量上），于是 $\operatorname{LN}(\mathbf{x}) = \sqrt d\,\mathbf{x}P/\lVert\mathbf{x}P\rVert$。若 $\mathbf{1}R = \pm\mathbf{1}$，则 $R$ 把 $\mathbf{1}$ 张成的直线映到自身，又因其正交，也把它的正交补——中心化子空间——映到自身；于是 $PR = RP$，$\lVert\mathbf{x}RP\rVert = \lVert\mathbf{x}PR\rVert = \lVert\mathbf{x}P\rVert$，从而 $\operatorname{LN}(\mathbf{x}R) = \operatorname{LN}(\mathbf{x})R$。反过来，设 LN 与 $R$ 交换，取任何非零的中心化 $\mathbf{x}$（$\mathbf{x}P = \mathbf{x}$）。则 $\operatorname{LN}(\mathbf{x})R = \sqrt d\,\mathbf{x}R/\lVert\mathbf{x}\rVert$，而 $\operatorname{LN}(\mathbf{x}R) = \sqrt d\,\mathbf{x}RP/\lVert\mathbf{x}RP\rVert$ 与 $\mathbf{1}$ 正交。两者相等迫使 $\mathbf{x}R\perp\mathbf{1}$。所以 $R$ 把中心化子空间映到自身，从而也把它的正交补、$\mathbf{1}$ 所在的直线映到自身：$\mathbf{1}R = \pm\mathbf{1}$。因此 [[#prop-rotation]] 对 LayerNorm 模型恰在 $(d-1)$ 维中心化子空间的旋转（$\mathbf{1}$ 固定或反向）下成立。
:::
:::

::: exercise 度量复制 {level=3}
提出一个标度量，用来度量一个头的 OV 回路 $M = W_EW_{OV}W_U$ 在多大程度上"复制"，并对 [[#sec-code]] 的随机头计算它（修改清单）。Elhage 等人用了 $M$ 的特征值：为什么特征值在这里是自然的？为什么可以对一个行与列都由词元索引的矩阵取特征值？
::: solution
$M$ 把一个词元（被注意的那个）映到词元上的 logit，所以行与列由同一个集合索引，$M$ 是词元空间到自身的线性映射；它的特征向量是该头映到自身倍数的词元组合。复制头会抬高它所注意的东西的 logit，所以 $M\approx\lambda I$ 加上较小的项，且 $\lambda > 0$：它的特征值的实部大多为正。Elhage 等人用 $\sum_i\lambda_i/\sum_i\lvert\lambda_i\rvert$ 来概括这一点：特征值全正时为 $+1$，全负时为 $-1$。由于 $M = (W_EW_V)(W_OW_U)$ 的秩至多为 $d_k$，它的非零特征值就是小的 $d_k\times d_k$ 矩阵 $(W_OW_U)(W_EW_V)$ 的非零特征值（$AB$ 与 $BA$ 的非零特征值相同），对真实词表就是这样计算的。更直接的诊断是考察这样一个词元 $v$ 的占比：当该头注意 $v$ 时，$v$ 自己的 logit 正是被抬得最高的那个，即 $[M_{v,v} = \max_wM_{v,w}]$。在清单末尾加上

```python
print("tokens most boosted by attending to themselves:", sum(OV[v][v] == max(OV[v]) for v in range(V)), "of", V)
S = mm(mm(WO, W_U), mm(W_E, WV))                   # (DK, DK)：与 OV 有相同的非零特征值
t, det = S[0][0] + S[1][1], S[0][0] * S[1][1] - S[0][1] * S[1][0]
disc = t * t - 4 * det                             # 此处为实数；复根需要 cmath
lam = [(t + math.sqrt(disc)) / 2, (t - math.sqrt(disc)) / 2]
print("non-zero eigenvalues:", [round(l, 3) for l in lam])
print("copying score:", round(sum(lam) / sum(abs(l) for l in lam), 3))
```

打印出 `0 of 5`、特征值 $15.683$ 与 $-3.352$、以及得分 $0.648$。两个诊断意见相左：没有任何词元在被注意时最抬高自己，可特征值得分却明显为正，因为那个大的正特征值属于某个词元*组合*，而不属于单个词元。回路的汇总统计量是在许多头之间筛选的有用过滤器，但"某个头在复制"的论断要在对角线上、在实际输入上核验。一个训练好的归纳头两项检验都通过。
:::
:::
