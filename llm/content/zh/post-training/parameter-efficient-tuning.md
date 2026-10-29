全量微调会更新模型的每一个参数。对一个有数十亿参数的模型，这在两方面都很昂贵。其一，训练需要的不只是权重，还有梯度和优化器状态——混合精度 Adam 下每参数约 $16$ 字节，一个 70 亿参数的模型光模型状态就要超过 $100$ GB，这还没有计入任何激活。其二，每个微调出的版本都是模型的一份完整拷贝：一百个客户、一百个微调，就需要一百份拷贝。**参数高效微调**（parameter-efficient fine-tuning，PEFT）冻结预训练权重，转而训练少量新增或被选中的参数——通常远少于参数总数的 $1\%$——却在许多任务上与全量微调不相上下。

本章介绍几个主要家族：插在层与层之间的**适配器**（adapter）；学习连续输入的**前缀微调与提示微调**；微调被选中的子集（如偏置项或缩放向量）的方法；以及 **LoRA**——为每个权重矩阵学习一个低秩更新，[[math-for-ml/matrix-decompositions#def-lora]]中已经引入过它。本章推导 LoRA 的梯度与训练最初几步的效果，为一个贴近真实的模型清点参数，并讲解 **QLoRA**——把 LoRA 与冻结权重的 $4$ 比特 **NormalFloat** 量化相结合，让大模型能在单台加速器上微调。指令微调（[[post-training/instruction-tuning]]）与偏好优化都用 PEFT；它所依赖的量化在[[inference/quantisation]]中有详细讨论。

## 全量微调的代价 {#sec-cost}

::: definition 参数高效微调 {#def-peft}
设 $\theta_0\in\R^N$ 为预训练模型的参数。一个**参数高效微调**方法选取参数化 $\theta = g(\theta_0, \phi)$，其**可训练**参数 $\phi\in\R^M$，$M\ll N$，且初始化时 $g(\theta_0, \phi_0) = \theta_0$（或输出完全相同的函数），再在 $\theta_0$ 冻结的情况下对 $\phi$ 最小化任务损失。只有 $\phi$ 需要梯度与优化器状态，每个任务也只存储 $\phi$。
:::

::: example 全量微调与 PEFT 的内存 {#ex-memory}
用混合精度 Adam 微调一个 67.4 亿参数的模型（Llama 2 7B 的规模）时，估算模型状态所需的内存：(a) 全量微调；(b) 可训练参数 $4000$ 万、基座以 bf16 冻结；(c) 与 (b) 相同，但基座以 $4$ 比特存储。忽略激活。
::: solution
(a) 每参数 $16$ 字节（[[neural-networks/training-practice#ex-memory]]）：$6.74\times10^9\cdot16 = 108$ GB。(b) 冻结基座每参数 $2$ 字节：$13.5$ GB；可训练部分：$4\times10^7\cdot16 = 0.64$ GB；合计约 $14.1$ GB。(c) 基座连同量化常数约每参数 $4.13$ 比特（见[[#sec-qlora]]）：$6.74\times10^9\cdot4.13/8 = 3.5$ GB；加上 $0.64$ GB：约 $4.1$ GB。这时可训练参数只占内存的一小部分；而 PEFT 省不掉的激活常常才是大头。
:::
:::

::: widget plot
f: 16*x; 2*x + 0.1*x; 0.516*x + 0.1*x
x: 0, 80
y: 0, 200
hlines: 80
labels: full fine-tuning (16 bytes per parameter); LoRA, bf16 base; QLoRA, 4-bit base
caption: 模型状态内存（GB，不含激活）随模型规模（以十亿参数计）的变化，假设 LoRA 适配器的参数量约为基座的 $0.6\%$，用 Adam 训练、每个可训练参数 $16$ 字节。水平线是 $80$ GB，一种常见的加速器内存。全量微调在约 $50$ 亿参数处越过它；bf16 基座上的 LoRA 在约 $380$ 亿处；QLoRA 则在远超 $1000$ 亿处——Dettmers 等正是据此在一台 $48$ GB 的设备上微调了一个 650 亿参数的模型。
:::

## 适配器 {#sec-adapters}

第一个用于 Transformer 的 PEFT 方法在每一层内部添加小网络。

::: definition 瓶颈适配器（Houlsby 等，2019）{#def-adapter}
瓶颈宽度 $m\ll d$ 的**适配器**把隐向量 $\mathbf{h}\in\R^d$ 映射为

$$
\mathbf{h} + W_{\text{up}}\,f\big(W_{\text{down}}\mathbf{h} + \mathbf{b}_{\text{down}}\big) + \mathbf{b}_{\text{up}},\qquad W_{\text{down}}\in\R^{m\times d},\ W_{\text{up}}\in\R^{d\times m},
$$

其中 $f$ 为非线性函数。Houlsby 等在每个 Transformer 层插入两个适配器——分别在注意力子层之后与前馈子层之后——初始化接近恒等映射，并训练适配器与层归一化。每个适配器有 $2md + m + d$ 个参数。
:::

在 GLUE 基准上，Houlsby 等报告的结果与 BERT 的全量微调相差不超过 $0.4\%$，而每个任务只增加 $3.6\%$ 的参数。适配器是一条初始化接近零的残差分支，网络起步时就是预训练模型；又因为基座冻结，许多任务可以共享它，各自带自己的适配器。缺点在推理时：适配器是每层额外的顺序计算，会增加延迟，这在批量较小的生成场景里很要紧。后来的变体把适配器与子层并联而非串联（He 等，2022；该文还表明若干 PEFT 方法可以写进一个统一形式）。

## 前缀微调与提示微调 {#sec-prompts}

预训练模型可以被它的输入左右，提示设计已经说明了这一点（[[prompting-rag/prompt-design]]）。基于提示的 PEFT 方法直接优化输入——优化的不是离散词元，而是连续向量。

::: definition 提示微调与前缀微调 {#def-prompt-tuning}
**提示微调**（prompt tuning，Lester 等，2021）在每个输入的词元嵌入之前拼接 $p$ 个可训练向量 $P\in\R^{p\times d}$，即**软提示**（soft prompt）；只训练 $P$（$pd$ 个参数）。**前缀微调**（prefix tuning，Li 与 Liang，2021）则在**每一**层的注意力之前拼接可训练的键向量与值向量：第 $\ell$ 层中，被注意的键与值为 $[P_K^{(\ell)}; K]$ 与 $[P_V^{(\ell)}; V]$，其中 $P_K^{(\ell)}, P_V^{(\ell)}\in\R^{p\times d}$，$L$ 层共 $2pdL$ 个参数。Li 与 Liang 在训练期间用一个小 MLP 重新参数化前缀以求稳定，只保留最终得到的向量。
:::

前缀微调作用于每一层，因而比只在输入端的软提示更有影响。Li 与 Liang 报告，在表格到文本生成与摘要任务上，只训练约 $0.1\%$ 的参数就取得与全量微调相当的结果，低数据情形下还更好。Lester 等发现，在 T5 上做提示微调，小模型远逊于全量微调，但随着模型长到约 100 亿参数，差距逐渐缩小——模型越大，几个输入向量能左右的东西就越多。跨层的深层提示微调（P-tuning v2，Liu 等，2022）让这条路线在较小规模上也有竞争力。两者的代价都在上下文：那 $p$ 个前缀位置在每一步都占据注意力。

::: example 数一数提示类方法的参数 {#ex-prompt}
对一个 $d = 4096$、$L = 32$ 层的模型，数一数 $p = 20$ 的提示微调与 $p = 20$ 的前缀微调各有多少可训练参数。
::: solution
提示微调：$pd = 20\cdot4096 = 81{,}920$ 个参数——约为 67 亿参数模型的 $0.001\%$。前缀微调：$2pdL = 2\cdot20\cdot4096\cdot32 = 5{,}242{,}880$，约 $0.08\%$。前缀微调的参数多 $64$ 倍，而且全部直接在每一层的注意力内部起作用。
:::
:::

**选择性**方法什么都不添加，只微调精心选出的小部分。**BitFit**（Ben Zaken 等，2022）只训练偏置项——占 BERT 参数不到一个百分点——在中小数据集上很有竞争力。**(IA)³**（Liu 等，2022）学习逐元素缩放键、值与前馈激活的向量——每层每个被缩放的激活 $d$ 个数——以极少的参数报告了很强的少样本结果。

## LoRA {#sec-lora}

低秩适配（LoRA，Hu 等，ICLR 2022）为每个被选中的权重矩阵 $W_0\in\R^{d_{\text{out}}\times d_{\text{in}}}$ 学习一个秩至多 $r$ 的更新：

$$
W = W_0 + sBA,\qquad B\in\R^{d_{\text{out}}\times r},\ A\in\R^{r\times d_{\text{in}}},\ s = \frac{\alpha}{r},
$$ {#eq-lora}

其中 $A$ 随机初始化（例如高斯分布），$B$ 初始化为零，于是开始时 $W = W_0$（[[math-for-ml/matrix-decompositions#def-lora]]）。该层计算 $W_0\mathbf{x} + s\,B(A\mathbf{x})$：额外开销是两个瘦矩阵乘法，每个词元 $2r(d_{\text{in}} + d_{\text{out}})$ FLOPs，而不是 $2d_{\text{in}}d_{\text{out}}$。

::: proposition LoRA 更新的参数量与秩 {#prop-lora-count}
加在一个矩阵上的 LoRA 适配器有 $r(d_{\text{in}} + d_{\text{out}})$ 个可训练参数，占该矩阵的 $r\big(\frac{1}{d_{\text{in}}} + \frac{1}{d_{\text{out}}}\big)$，其更新 $sBA$ 的秩至多 $r$。训练之后可以把更新**合并**，$W = W_0 + sBA$，于是微调后的模型与原模型在架构和推理开销上完全相同。
:::

::: proof
$B$ 与 $A$ 分别有 $d_{\text{out}}r$ 与 $rd_{\text{in}}$ 个元素；除以 $d_{\text{in}}d_{\text{out}}$ 即得占比。$BA$ 的列空间含于 $B$ 的列空间，而 $B$ 至多有 $r$ 列，故 $\rank(BA)\le r$。合并就是矩阵加法，之后该层就是一个带权重 $W$ 的普通线性映射。
:::

Hu 等把 LoRA 用在 GPT-3（17500 亿参数）的注意力投影上，报告与使用 Adam 的全量微调相比，可训练参数约减少 $10{,}000$ 倍、训练显存约减少 $3$ 倍，而在所研究的任务上质量相当或更好；在查询与值投影上用秩 $4$，任务检查点从约 $350$ GB 缩小到约 $35$ MB。他们发现小秩对这些任务已经足够，并研究了学到的更新，发现 $\Delta W$ 放大了 $W_0$ 中原本存在但不受强调的方向。

::: example 7B 级模型上的 LoRA {#ex-lora-count}
对一个 $d = 4096$、$32$ 层、SwiGLU 前馈块宽度 $d_{\text{ff}} = 11{,}008$ 的解码器（Llama 2 7B 的维度），数一数两种配置的可训练参数：秩 $8$ 只加在查询与值投影上；秩 $16$ 加在每层全部七个投影矩阵上。
::: solution
查询与值：每个矩阵 $4096\times4096$，于是每个矩阵 $8\cdot(4096 + 4096) = 65{,}536$，总共 $2\cdot32\cdot65{,}536 = 419$ 万——占 67.4 亿的 $0.062\%$。七个矩阵全部上秩 $16$：四个注意力矩阵每个 $16\cdot8192 = 131{,}072$；三个前馈矩阵（$4096\times11008$ 或其转置）每个 $16\cdot(4096 + 11008) = 241{,}664$；每层 $4\cdot131{,}072 + 3\cdot241{,}664 = 1{,}249{,}280$，乘以 $32$ 得 $3998$ 万——$0.59\%$。这些正是[[#sec-code]]中清单打印出的数字。
:::
:::

### LoRA 的梯度 {#sec-lora-grad}

训练 LoRA 就是沿[[#eq-lora]]做普通反向传播，但把梯度写出来能看清 LoRA 与全量微调的关系。

::: proposition LoRA 两个因子的梯度 {#prop-lora-grad}
设 $G = \partial\mathcal{L}/\partial W$ 为损失对有效权重 $W = W_0 + sBA$ 的梯度（对单个输入 $\mathbf{x}$、输出梯度 $\boldsymbol\delta = \partial\mathcal{L}/\partial\mathbf{y}$，有 $G = \boldsymbol\delta\mathbf{x}^\top$；对一个批次，就是这些项的和）。则

$$
\frac{\partial\mathcal{L}}{\partial B} = s\,G A^\top,\qquad \frac{\partial\mathcal{L}}{\partial A} = s\,B^\top G.
$$ {#eq-lora-grad}
:::

::: proof
因子的小扰动使权重改变 $dW = s(dB\,A + B\,dA)$。到一阶，$d\mathcal{L} = \tr(G^\top dW) = s\tr(G^\top dB\,A) + s\tr(G^\top B\,dA)$。由迹的循环性，$\tr(G^\top dB\,A) = \tr(AG^\top dB) = \tr\big((GA^\top)^\top dB\big)$，且 $\tr(G^\top B\,dA) = \tr\big((B^\top G)^\top dA\big)$。在 Frobenius 内积下读出 $dB$ 与 $dA$ 的系数即得[[#eq-lora-grad]]（[[math-for-ml/gradients#prop-linear-grad]]）。
:::

::: corollary LoRA 的第一步 {#cor-first-step}
初始化时 $B = 0$，故 $\partial\mathcal{L}/\partial A = 0$，只有 $B$ 动。以学习率 $\eta$ 走一步梯度下降后，$B_1 = -\eta sGA^\top$，权重改变

$$
\Delta W_1 = sB_1A = -\eta s^2\,G\,A^\top A.
$$

这就是全量微调的一步 $-\eta G$ 被限制在 $A$ 的行空间上的结果，即限制在 $\R^{d_{\text{in}}}$ 的一个 $r$ 维子空间内：对任何与 $A$ 的行正交的输入方向 $\mathbf{u}$，$\Delta W_1\mathbf{u} = \mathbf{0}$。若 $A$ 的元素独立同分布、均值 $0$、方差 $\sigma^2$，则 $\E[A^\top A] = r\sigma^2I$，于是平均而言这一步是全梯度一步的缩放副本。
:::

::: proof
把 $B = 0$ 代入[[#eq-lora-grad]]，再代 $B_1 = 0 - \eta sGA^\top$。对与 $A$ 的行正交的 $\mathbf{u}$，$A\mathbf{u} = \mathbf{0}$，故 $\Delta W_1\mathbf{u} = -\eta s^2GA^\top(A\mathbf{u}) = \mathbf{0}$。最后，$(A^\top A)_{jk} = \sum_{i=1}^{r}A_{ij}A_{ik}$ 在 $j = k$ 时期望为 $r\sigma^2$，否则为 $0$。
:::

于是 LoRA 起初是在输入方向的一个随机低维子空间里做梯度下降，随后随着 $A$ 也开始收到梯度，把这个子空间自适应地调整。乘积结构还使有效学习率依赖于缩放 $s$ 与 $A$ 的初始化；取 $s = \alpha/r$ 本是为了让结果对 $r$ 不那么敏感；后来的工作主张 $s = \alpha/\sqrt r$（rsLoRA，Kalajdzievski，2023）能让更新随秩增大保持稳定，还主张 $A$ 与 $B$ 适合用不同的学习率（LoRA+，Hayou 等，2024）。

如果全量微调将要做出的更新是已知的，那么 LoRA 对它的最佳逼近就是该更新的截断 SVD。

::: proposition 最佳的秩 $r$ 更新 {#prop-best-rank}
设目标更新 $\Delta\in\R^{d_{\text{out}}\times d_{\text{in}}}$ 的奇异值为 $\sigma_1\ge\sigma_2\ge\dots$，则 $\lVert\Delta - sBA\rVert_F$ 在 $B\in\R^{d_{\text{out}}\times r}$ 与 $A\in\R^{r\times d_{\text{in}}}$ 上的最小值为 $\big(\sum_{i>r}\sigma_i^2\big)^{1/2}$，当 $sBA$ 为截断 SVD $\Delta_r$ 时取到。
:::

::: proof
矩阵 $sBA$ 恰是全体秩至多 $r$ 的矩阵（任何这样的矩阵都可分解为 $U_r(\Sigma_rV_r^\top)$，且 $s$ 可以被吸收进 $B$）。在该集合上取最小由 Eckart–Young 定理（[[math-for-ml/matrix-decompositions#thm-eckart-young]]）给出。
:::

这条结论说明了 LoRA 何时应当奏效：当任务需要的更新的奇异值衰减很快时。这是任务与模型的经验性质，不是定理。Biderman 等（2024）在代码与数学上、用大数据集比较了 LoRA 与全量微调，发现 LoRA **学得更少**——在目标领域达到的性能低于全量微调——**忘得更少**——更好地保住了基座模型的其他能力；他们还发现全量微调的权重更新的秩远高于典型的 LoRA 秩。对于行为与格式的适配——正如许多指令微调那样——小秩通常够用；要吸收大量新知识则未必。

::: warning 只有精确算术下，合并前后才是同一个模型
“合并适配器不花任何代价”在精确算术下成立。实践中冻结基座常以低精度存储（bf16，或 QLoRA 下的 $4$ 比特），把一个很小的更新 $sBA$ 加到 bf16 权重上可能被舍入吞掉——当更新远小于权重的间距时（[[neural-networks/training-practice#prop-swamping]]）；而合并进 $4$ 比特基座需要对和重新量化，这会改变它。若合并后的模型与当初评估适配器时表现不同，部署前请在相同输入下比较两者输出，或者直接不合并、带适配器服务。
:::

### 服务许多适配器 {#sec-serving}

不合并时，一份基座模型就能服务多个微调版本：每个请求带上自己适配器的标识，服务器对批次算一次 $W_0\mathbf{x}$，再对每个请求的适配器算 $sB_iA_i\mathbf{x}$。S-LoRA（Sheng 等，2024）这类系统就以此方式把数千个适配器的请求做批处理。变体修改参数化：**DoRA**（Liu 等，2024）把每个权重分解成一个幅度向量与一个方向，只对方向施加 LoRA；另有一些变体跨层共享或剪掉秩。截至 2026 年，在所有线性层上、取大约 $8$ 到 $64$ 的秩的朴素 LoRA 仍是常见的默认选择。

## QLoRA {#sec-qlora}

LoRA 去掉了基座模型的优化器状态，但它的权重仍要存储，bf16 下每参数 $2$ 字节。**QLoRA**（Dettmers 等，2023）把冻结基座存成 $4$ 比特，做矩阵乘法时把每个权重块即时反量化为 bf16，并穿过量化基座反传到以 bf16 保存的 LoRA 适配器上。三个要素让这套办法不损失质量地成立。

**4 比特 NormalFloat（NF4）。** 预训练权重在每个块内近似服从正态分布。均匀的 $4$ 比特网格把档位浪费在稀疏的尾部，而在多数权重所在的零附近档位太少。NF4 把它的 $16$ 个档位放在**标准正态分布的分位数**上，使正态数据用到每个档位的次数大致相同——论文称这对正态权重是信息论意义下最优的。

::: definition NF4 数据类型 {#def-nf4}
**NF4** 的档位这样得到：在标准正态分布的正半轴取 $8$ 个等间隔概率、负半轴取 $7$ 个，经逆正态分布函数 $\Phi^{-1}$ 映到分位数，再加上精确的 $0$，最后把 $16$ 个值归一化到 $[-1, 1]$；靠近 $0$ 与 $1$ 的概率稍作平移，使两端极端的分位数有限。$64$ 个权重的块存储为 $16$ 个四比特索引（指向这张表）和一个 **absmax** 缩放因子 $c = \max_i\lvert w_i\rvert$；反量化时权重还原为 $c\cdot q_{\text{index}}$。
:::

不对称——正档位比负档位多一个——既用满全部 $16$ 个编码，又给出零的精确表示。下面清单算出的档位在近零处更密、在尾部更疏。

::: widget plot
f: exp(-x^2/2)/sqrt(2*pi)
x: -2.2, 2.2
y: 0, 0.45
points: -1.848,0.0723; -1.287,0.1743; -0.970,0.2491; -0.730,0.3057; -0.526,0.3475; -0.342,0.3763; -0.168,0.3933; 0.000,0.3989; 0.147,0.3946; 0.297,0.3817; 0.455,0.3597; 0.624,0.3283; 0.814,0.2863; 1.040,0.2324; 1.336,0.1634; 1.848,0.0723
labels: standard normal density
caption: 以标准差为单位的 $16$ 个 NF4 档位（圆点，画在正态密度上）：归一化 NF4 档位乘以 $\Phi^{-1}(0.9677) = 1.848$。它们是正态分布的分位数，所以相邻档位之间的区间容纳大致相同份额的正态权重——在权重密集的 $0$ 附近间距很小，在尾部间距很大。若是均匀的 $4$ 比特网格，间距就会处处相等。
:::

**双重量化。** 每 $64$ 个权重配一个 $32$ 比特缩放因子时，缩放因子花费 $32/64 = 0.5$ 比特每参数。QLoRA 把缩放因子本身量化到 $8$ 比特：每 $256$ 个一级缩放因子为一块、各配一个 $32$ 比特的二级缩放因子，把额外开销降为 $8/64 + 32/(64\cdot256) = 0.127$ 比特每参数。

**分页优化器。** 长序列训练期间的内存尖峰可能超出设备内存；QLoRA 使用统一内存，在需要时把优化器状态分页换入 CPU 内存。

有了这些，Dettmers 等在一台 $48$ GB 加速器上微调了一个 650 亿参数的模型，并报告：在他们测试的基准上，把所有线性层都加上适配器的 QLoRA 与 16 比特全量微调、16 比特 LoRA 打平；他们指出，必须把 LoRA 加到所有线性层而不只是注意力上，才能追平全量微调。他们的 Guanaco 模型以此方式在一个小规模高质量指令数据集上训练，在其评估（模型评审与人类评审）中与当时的商业聊天系统不相上下。

::: example 65B 模型在 QLoRA 下的存储 {#ex-qlora}
计算 650 亿参数基座模型在带双重量化的 NF4 下的内存占用，并与 bf16 比较。
::: solution
索引：$65\times10^9\cdot4/8 = 32.5$ GB。量化常数：$65\times10^9\cdot0.127/8 = 1.03$ GB。合计约 $33.5$ GB，而 bf16 下是 $130$ GB。若不做双重量化，常数要占 $65\times10^9\cdot0.5/8 = 4.1$ GB。再加上适配器、其优化器状态与激活，这一次运行能装进 $48$ GB——但只是勉强装下，这正是分页优化器的用途。
:::
:::

## 用代码清点与量化 {#sec-code}

下面的清单为[[#ex-lora-count]]中 7B 级配置清点 LoRA 参数，构建 NF4 表，并在以 $64$ 为一块、absmax 缩放量化正态分布权重时，把它与对称的均匀 $4$ 比特网格的误差作比较。

```python
import math, random
from statistics import NormalDist

# 1. 7B 级解码器的 LoRA 参数计数（Llama 2 7B 的维度）
d, L, d_ff, V = 4096, 32, 11008, 32000
attn = 4 * d * d                                  # W_q, W_k, W_v, W_o
mlp = 3 * d * d_ff                                # gate, up, down（SwiGLU）
total = L * (attn + mlp + 2 * d) + 2 * V * d + d  # 另有 RMSNorm 权重、嵌入与输出层
print(f"base parameters: {total / 1e9:.3f} B")

def lora_params(r, targets):
    shapes = {"q": (d, d), "k": (d, d), "v": (d, d), "o": (d, d),
              "gate": (d, d_ff), "up": (d, d_ff), "down": (d_ff, d)}
    return L * sum(r * (shapes[t][0] + shapes[t][1]) for t in targets)

for r, targets in [(8, ["q", "v"]), (8, ["q", "k", "v", "o"]),
                   (16, ["q", "k", "v", "o", "gate", "up", "down"]), (64, ["q", "k", "v", "o", "gate", "up", "down"])]:
    n = lora_params(r, targets)
    print(f"r = {r:3d} on {'+'.join(targets):24s} {n / 1e6:8.2f} M trainable = {100 * n / total:.3f}% of the base")

# 2. NF4 网格：N(0, 1) 的分位数，含精确的零，归一化到 [-1, 1]
N = NormalDist()
offset = 0.9677083                                # 与参考实现一致
pos = [N.inv_cdf(offset + (0.5 - offset) * i / 8) for i in range(8)]     # 8 个正档位
neg = [-N.inv_cdf(offset + (0.5 - offset) * i / 7) for i in range(7)]    # 7 个负档位
grid = sorted(pos + [0.0] + neg)
grid = [g / max(abs(x) for x in grid) for g in grid]
print("NF4 levels:", " ".join(f"{g:.4f}" for g in grid))
int4 = [i / 7 for i in range(-7, 8)] + [-1.0]     # 对称 4 比特整数网格（absmax），用到 15 个档位
int4 = sorted(set(int4))

def quantise(block, levels):
    s = max(abs(w) for w in block)                # 块的 absmax 缩放
    return [s * min(levels, key=lambda q: abs(w / s - q)) for w in block]

rng = random.Random(0)
weights = [rng.gauss(0, 0.02) for _ in range(64 * 2000)]   # 正态分布的权重
for name, levels in (("int4 absmax", int4), ("NF4", grid)):
    err = 0.0
    for b in range(0, len(weights), 64):                   # 每块 64 个、各一个缩放
        block = weights[b:b + 64]
        err += sum((w - q) ** 2 for w, q in zip(block, quantise(block, levels)))
    rmse = math.sqrt(err / len(weights))
    print(f"{name:12s} RMS error {rmse:.6f}  ({100 * rmse / 0.02:.1f}% of the weight s.d.)")
```

```text
base parameters: 6.738 B
r =   8 on q+v                          4.19 M trainable = 0.062% of the base
r =   8 on q+k+v+o                      8.39 M trainable = 0.124% of the base
r =  16 on q+k+v+o+gate+up+down        39.98 M trainable = 0.593% of the base
r =  64 on q+k+v+o+gate+up+down       159.91 M trainable = 2.373% of the base
NF4 levels: -1.0000 -0.6962 -0.5251 -0.3949 -0.2844 -0.1848 -0.0910 0.0000 0.0796 0.1609 0.2461 0.3379 0.4407 0.5626 0.7230 1.0000
int4 absmax  RMS error 0.002146  (10.7% of the weight s.d.)
NF4          RMS error 0.001830  (9.1% of the weight s.d.)
```

基座计数 $67.38$ 亿与 Llama 2 7B 公布的规模相符。即使秩 $64$ 加在每个投影上，训练的也只不到 $2.4\%$ 的参数。在正态权重上，NF4 的 RMS 误差比块缩放相同的均匀 $4$ 比特网格低约 $15\%$——收益不大却是白得的，因为两者都用 $4$ 比特。真实权重分布有更重的尾部与离群值，这正是块大小与离群值处理与网格本身同样要紧的原因（[[inference/quantisation]]）。

::: quiz
关于 LoRA，哪些说法是正确的？
- [x] 初始化时，加了适配的模型与基座模型计算的函数完全相同。
- [x] 训练之后，可以把更新加进权重，推理便不花额外代价。
- [ ] 第一个梯度步中 $A$ 与 $B$ 都会改变。
- [ ] LoRA 减少激活内存的程度与减少优化器内存的程度相同。
::: solution
$B = 0$ 使开始时 $W = W_0$，合并后得到普通权重矩阵（[[#prop-lora-count]]）。$B = 0$ 时 $A$ 的梯度 $sB^\top G = 0$，故第一步只有 $B$ 改变（[[#cor-first-step]]）。激活仍要流过完整网络并为反向传播保存，所以 LoRA 省下的是优化器与梯度内存，省不掉激活内存。
:::
:::

::: history
用微调少数层来迁移知识和深度学习的历史一样长。Rebuffi 等（2017）为多域图像分类引入残差适配器，Houlsby 等（ICML 2019）把瓶颈适配器带进 Transformer 的 NLP 任务。2021 年，Li 与 Liang 提出前缀微调，Lester 等提出提示微调，其基础是离散提示搜索；Aghajanyan 等（2020）测出了微调的低内在维度；Hu 等（arXiv 2021，ICLR 2022）提出 LoRA。随后有 BitFit（Ben Zaken 等，2022）、(IA)³（Liu 等，2022）与 PEFT 方法的统一视角（He 等，2022），Hugging Face PEFT 库让这些方法触手可及。Dettmers 等（NeurIPS 2023）提出带 NF4 与双重量化的 QLoRA，建立在同一团队早先分块 $8$ 比特优化器与推理量化的工作之上。2023 年起，LoRA 变体（DoRA、rsLoRA、LoRA+）、多适配器服务（S-LoRA、Punica），以及关于 LoRA 学到什么、忘掉什么的研究（Biderman 等，2024）细化了这幅图景。
:::

::: summary
- 用 Adam 做全量微调需要每参数约 $16$ 字节，且每个任务一份完整拷贝；**PEFT** 冻结基座、只训练 $M\ll N$ 个参数，按任务存储的就是这些参数。
- **适配器**在每层加入瓶颈 MLP（每个 $2md + m + d$ 个参数），会增加推理延迟；**提示微调**学 $pd$ 个输入向量，**前缀微调**学 $2pdL$ 个逐层键值向量，两者都消耗上下文；**BitFit** 与 **(IA)³** 微调偏置或缩放向量。
- **LoRA** 学 $W_0 + \frac\alpha rBA$，每个矩阵 $r(d_{\text{in}} + d_{\text{out}})$ 个参数，秩至多 $r$，可合并且推理零开销；7B 级模型在所有投影上取秩 $16$，训练约 $4000$ 万参数（$0.6\%$）。
- 其梯度为 $\partial\mathcal{L}/\partial B = sGA^\top$ 与 $\partial\mathcal{L}/\partial A = sB^\top G$；第一步是全梯度被限制在 $A$ 的随机行空间上。最佳的秩 $r$ 更新是截断 SVD，所以 LoRA 在所需更新的奇异值衰减快时奏效——这是经验性质；LoRA 比全量微调学得更少、忘得更少。
- **QLoRA** 把基座存成 **NF4**（正态分位数档位、含精确的零、块 absmax 缩放），使用**双重量化**（每参数额外开销 $0.127$ 比特而非 $0.5$ 比特）与分页优化器，在一台 $48$ GB 设备上微调了一个 650 亿参数模型。
:::

## 习题

::: exercise 一个 LoRA 适配器的大小 {level=1 check="98304"}
秩 $16$ 的 LoRA 适配器加在一个 $4096\times2048$ 的矩阵上，有多少可训练参数？
::: solution
$r(d_{\text{in}} + d_{\text{out}}) = 16\cdot(4096 + 2048) = 98{,}304$——占该矩阵 $8{,}388{,}608$ 个元素的 $1.17\%$。
:::
:::

::: exercise 一个适配器的大小 {level=1 check="528448"}
一个 $d = 4096$、$m = 64$ 的瓶颈适配器（[[#def-adapter]]）有多少参数？
::: solution
$2md + m + d = 2\cdot64\cdot4096 + 64 + 4096 = 524{,}288 + 4{,}160 = 528{,}448$。每层两个适配器、共 $32$ 层，约 $3380$ 万参数，占 67 亿参数模型的 $0.5\%$。
:::
:::

::: exercise 双重量化 {level=1 check="0.127"}
每 $64$ 个权重配 $8$ 比特的一级缩放因子，每 $256$ 个一级缩放因子再配一个 $32$ 比特的二级缩放因子，计算每参数的额外开销（比特），保留三位小数。
::: solution
$8/64 + 32/(64\cdot256) = 0.125 + 0.00195 = 0.127$ 比特每参数，而直接用 $32$ 比特缩放因子时是 $32/64 = 0.5$。
:::
:::

::: exercise 盈亏平衡的秩 {level=2 check="2048"}
对 $d = 4096$ 的 $d\times d$ 方阵，LoRA 适配器的秩到达多少时，其参数量与矩阵本身相同？这说明“低秩”一词意味着什么？
::: solution
$r\cdot2d = d^2$ 给出 $r = d/2 = 2048$。秩到了几百时，适配器就已经占矩阵的相当比例（秩 $256$：$12.5\%$）；LoRA 的效率建立在秩只是 $d$ 的极小比例之上，通常是 $8$ 到 $64$。
:::
:::

::: exercise 33B 模型的 QLoRA 内存 {level=2 check="17"}
估算一个 330 亿参数模型的冻结基座以带双重量化的 NF4（约每参数 $4.127$ 比特）存储时的内存（GB，取整）。
::: solution
$33\times10^9\cdot4.127/8 = 1.70\times10^{10}$ 字节，约 $17$ GB，而 bf16 下是 $66$ GB。
:::
:::

::: exercise LoRA 的第一步 {level=2}
某层 $d_{\text{in}} = 3$、$d_{\text{out}} = 2$，LoRA 秩 $r = 1$，$A = (1, 0, 0)$，$B = 0$，$s = 1$。对有效权重的梯度为 $G = \begin{pmatrix}1 & 2 & 0\\ 0 & 1 & 3\end{pmatrix}$。计算 $\partial\mathcal{L}/\partial A$、$\partial\mathcal{L}/\partial B$，以及以 $\eta = 0.1$ 走一步后的权重改变。这一步漏掉了全梯度步的哪些部分？
::: solution
$\partial\mathcal{L}/\partial A = sB^\top G = 0$。$\partial\mathcal{L}/\partial B = sGA^\top = G(1, 0, 0)^\top = (1, 0)^\top$。于是 $B_1 = -0.1\cdot(1, 0)^\top$，$\Delta W_1 = B_1A = \begin{pmatrix}-0.1 & 0 & 0\\ 0 & 0 & 0\end{pmatrix}$。完整的一步是 $-0.1G = \begin{pmatrix}-0.1 & -0.2 & 0\\ 0 & -0.1 & -0.3\end{pmatrix}$：LoRA 只保留第一列，即沿 $A$ 的行空间（第一个输入方向）的分量，正如[[#cor-first-step]]所述。沿第二个与第三个坐标的输入在 $A$ 开始移动之前不受影响。
:::
:::

::: exercise 前缀微调对 LoRA {level=2}
对[[#ex-prompt]]中的模型（$d = 4096$，$L = 32$），比较 $p = 32$ 的前缀微调与秩 $8$ 加在四个注意力投影上的 LoRA 的可训练参数。哪一个会抬高每次前向传播的开销？在注意力位置上抬多少？
::: solution
前缀微调：$2pdL = 2\cdot32\cdot4096\cdot32 = 839$ 万。LoRA：$4\cdot32\cdot8\cdot8192 = 839$ 万——数字巧合（$2p = 4\cdot2r$）使两者相同。前缀微调给每一层的每一次注意力计算永久地增加 $32$ 个位置；LoRA 训练时每个投影只多一个小矩阵乘法，合并之后什么都不多。
:::
:::

::: exercise LoRA 与截断 SVD {level=3}
写一个纯 Python 实验：构造 $64\times64$ 的目标更新 $\Delta = \sum_{i=1}^{64}\sigma_i\mathbf{u}_i\mathbf{v}_i^\top$，其中 $\mathbf{u}_i, \mathbf{v}_i$ 为随机的标准正交向量组，$\sigma_i = i^{-1}$；从 LoRA 初始化（$B = 0$，$A$ 为小随机矩阵）出发，对 $\lVert\Delta - BA\rVert_F^2$ 做梯度下降，拟合秩 $r = 4$ 的 $BA$，并把最终误差与[[#prop-best-rank]]的 Eckart–Young 下界比较。
::: solution
下界是 $\big(\sum_{i=5}^{64}i^{-2}\big)^{1/2}$。数值上 $\sum_{i=5}^{64}i^{-2} = 0.2058$，故下界为 $0.4537$。一个清单：

```python
import math, random
rng = random.Random(0)
n, r = 64, 4
def orthonormal(n):                       # 对随机向量做 Gram-Schmidt
    Q = []
    while len(Q) < n:
        v = [rng.gauss(0, 1) for _ in range(n)]
        for q in Q:
            c = sum(a * b for a, b in zip(v, q)); v = [a - c * b for a, b in zip(v, q)]
        s = math.sqrt(sum(a * a for a in v)); Q.append([a / s for a in v])
    return Q
U, Vt = orthonormal(n), orthonormal(n)
D = [[sum((1 / (k + 1)) * U[k][i] * Vt[k][j] for k in range(n)) for j in range(n)] for i in range(n)]
B = [[0.0] * r for _ in range(n)]
A = [[rng.gauss(0, 0.1) for _ in range(n)] for _ in range(r)]
for step in range(1500):
    P = [[sum(B[i][k] * A[k][j] for k in range(r)) for j in range(n)] for i in range(n)]
    E = [[P[i][j] - D[i][j] for j in range(n)] for i in range(n)]          # G = dLoss/dW（差因子 2）
    gB = [[sum(E[i][j] * A[k][j] for j in range(n)) for k in range(r)] for i in range(n)]   # G A^T
    gA = [[sum(B[i][k] * E[i][j] for i in range(n)) for j in range(n)] for k in range(r)]   # B^T G
    B = [[B[i][k] - 0.5 * gB[i][k] for k in range(r)] for i in range(n)]
    A = [[A[k][j] - 0.5 * gA[k][j] for j in range(n)] for k in range(r)]
err = math.sqrt(sum(E[i][j] ** 2 for i in range(n) for j in range(n)))
print(f"LoRA fit error {err:.4f}   Eckart-Young bound {math.sqrt(sum(1 / k ** 2 for k in range(5, n + 1))):.4f}")
```

```text
LoRA fit error 0.4537   Eckart-Young bound 0.4537
```

对因子化问题的梯度下降到达了最优：在这一设定下，低秩矩阵分解目标没有虚假的局部极小，从 LoRA 初始化出发，拟合收敛到截断 SVD。当 $\sigma_i = i^{-1}$ 时，残差 $0.454$ 相对于 $\lVert\Delta\rVert_F = 1.276$ 很大：谱衰减慢，正是 LoRA 力不从心的地方。
:::
:::

::: exercise 选择 PEFT 方法 {level=3}
一家公司必须为一个 130 亿参数的模型提供 $200$ 个客户专属变体，每个变体在客户自己的文档与风格的几千个样例上微调，由共享集群提供服务，且延迟要求严格。请推荐一套 PEFT 设计——方法、加在哪些层、秩、训练与服务时基座的精度、是否合并——并依照本章的种种权衡为每个选择给出理由。什么情形会让你对某些客户改用全量微调？
::: solution
在所有线性层（注意力与前馈）上加 LoRA，秩取 $16$ 上下，训练时基座用 bf16，训练硬件紧张就用 QLoRA——QLoRA 的研究发现，所有线性层都要加适配器才能追平全量微调，而风格与格式适配的几千个样例完全在低秩能装下的范围内。每个适配器约占基座参数的 $0.6\%$（约 $8000$ 万，bf16 下 $160$ MB），$200$ 个适配器共约 $32$ GB，还不到模型一份拷贝的大小。服务时**不合并**，在共享基座上做单适配器批处理（S-LoRA 风格），因为合并意味着 $200$ 份完整拷贝；多出的 LoRA 矩阵乘只增加很小的延迟，远小于串联适配器或长前缀，这在严格延迟要求下排除了瓶颈适配器与前缀微调。基座以 bf16 服务（或经仔细评估的量化格式），每个适配器都要在与线上完全一致的配置下评估（[[#sec-lora]]，关于合并与精度的警告）。若某客户的任务需要大量新知识或新能力、数据又多——LoRA“学得更少”的局限会在留出评估上表现为质量差距——就为该客户改用全量微调（或高得多的秩），并接受专养一份模型拷贝的成本。
:::
:::
