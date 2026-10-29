小模型通常训练平滑。大模型则不然——它们以能用的最高学习率训练：损失连降数日，然后几步之内突然上跳——一次**损失尖峰**——此后损失可能恢复、停在一个更差的值上，或**发散**为 NaN。大型运行的报告中满是这类事件。PaLM（Chowdhery 等，2022）见到约二十次尖峰；OPT-175B 团队（Zhang 等，2022）公开的日志记录了数十次降低学习率后的重启；BLOOM 的开发者在测试中出现不稳定后，在嵌入层之后加了一个归一化层。一场花费数百万美元的训练中出现尖峰代价高昂，因此补救措施成了现代每一个配方的组成部分。

本章解释已被理解的机制——注意力 logits 的增长与注意力熵的坍缩、输出 logits 的漂移、Adam 二阶矩估计与突发梯度的相互作用、以及低精度算术的极限——并推导它们给出的补救：QK 归一化、z 损失、更低的$\beta_2$、谨慎的初始化与归一化、以及带缩放的数值格式。章末介绍$\mu$P——一种让超参数跨模型宽度迁移的研究性参数化——以及应对尖峰的操作流程。不稳定与其说是一套理论，不如说是一堆故障模式；这里的命题解释的是具体机制，而某次运行中究竟哪种机制占上风是个经验问题。

## 损失尖峰与发散 {#sec-spikes}

::: definition 损失尖峰与发散 {#def-spike}
**损失尖峰**指训练损失在几步到几百步内突然升高、远超步间噪声，通常伴随梯度范数的跳升。若损失不再回到尖峰前的趋势，或变成无穷大、NaN，则称运行**发散**。
:::

PaLM 报告中的两个观察界定了问题。尖峰是在开启梯度裁剪的情况下发生的。而且它们并非任何简单意义上的“坏数据”所致：从更早的检查点重放尖峰前后的批次时，尖峰并没有出现。尖峰来自模型与优化器当前状态同数据之间的相互作用，而不是单独来自数据。PaLM 的补救是操作性的：从尖峰前约$100$步的检查点重启，并跳过$200$到$500$个批次。

Wortsman 等（2023）使这个问题变得可以研究：他们证明小模型在高学习率下能复现大模型的不稳定，而**学习率敏感度**——学习率偏离最优值时最终损失的恶化程度——是一个有用的稳定性度量。他们的研究中突出的两种故障模式，此前都已在大模型中被研究过：注意力 logits 的增长，以及输出 logits 的发散。

## 注意力 logits 与熵坍缩 {#sec-attention}

一个查询的注意力权重是$\operatorname{softmax}(\mathbf{z})$，其中$z_j = \mathbf{q}\cdot\mathbf{k}_j/\sqrt{d_k}$（[[transformers/self-attention#def-attention]]）。若查询与键的范数在训练中增长，所有 logits 都乘上一个不断增大的因子，softmax 随之变锐。

::: definition 注意力熵 {#def-attention-entropy}
权重为$\mathbf{p} = \operatorname{softmax}(\mathbf{z})$、对$T$个键的查询的**注意力熵**为$H(\mathbf{p}) = -\sum_jp_j\log p_j$，介于$0$（权重全在一个键上）与$\log T$（均匀）之间。**熵坍缩**指许多头的注意力熵在训练中向$0$跌落。
:::

::: proposition 缩放 logits 会降低熵 {#prop-entropy}
对固定打分$\mathbf{z}$与逆温度$\beta > 0$，令$\mathbf{p}(\beta) = \operatorname{softmax}(\beta\mathbf{z})$，则

$$
\frac{d}{d\beta}H\big(\mathbf{p}(\beta)\big) = -\beta\,\Var_{\mathbf{p}(\beta)}(z),
$$ {#eq-entropy}

其中$\Var_{\mathbf{p}}(z) = \sum_jp_jz_j^2 - \big(\sum_jp_jz_j\big)^2$。因此只要并非所有$z_j$相等，熵就随$\beta$增大严格递减，并趋于$\log m$，其中$m$是达到$\max_jz_j$的键的个数。
:::

::: proof
记$\log Z(\beta) = \log\sum_je^{\beta z_j}$，则$\log p_j = \beta z_j - \log Z$，且$H = \log Z - \beta\sum_jp_jz_j = \log Z - \beta\,\E_{\mathbf p}[z]$。两个导数是标准的：$\frac{d}{d\beta}\log Z = \sum_jz_je^{\beta z_j}/Z = \E_{\mathbf p}[z]$；以及$\frac{d}{d\beta}\E_{\mathbf p}[z] = \sum_jz_j\frac{dp_j}{d\beta}$，其中$\frac{dp_j}{d\beta} = p_j(z_j - \E_{\mathbf p}[z])$，得到$\E_{\mathbf p}[z^2] - \E_{\mathbf p}[z]^2 = \Var_{\mathbf p}(z)$。于是$\frac{dH}{d\beta} = \E_{\mathbf p}[z] - \E_{\mathbf p}[z] - \beta\Var_{\mathbf p}(z) = -\beta\Var_{\mathbf p}(z)$。除非$\mathbf{p}$集中在打分相同的键上——当$\beta > 0$时只有所有$z_j$相等才会如此——方差都是正的。当$\beta\to\infty$时，$\mathbf{p}$趋于最大者集合上的均匀分布，熵为$\log m$。
:::

坍缩的害处有两重。注意力模式退化成近 one-hot，该头便不再混合信息；而饱和 softmax 的梯度除胜出键外处处极小（[[transformers/self-attention#prop-softmax-jacobian]]），该头再也学不出来，同时胜出分数上的微小变化就可能翻转胜负、引起大的跳变。Zhai 等（2023）把视觉、语音与语言 Transformer 的不稳定同熵坍缩联系起来；Dehghani 等（2023）训练一个$220$亿参数的视觉 Transformer 时，观察到注意力 logits 无界增长、几千步后损失发散。

::: definition QK 归一化 {#def-qk-norm}
**QK 归一化**在查询与键做点积之前对它们施加归一化（LayerNorm 或 RMSNorm，按头进行）：

$$
z_j = \frac{\operatorname{Norm}(\mathbf{q})\cdot\operatorname{Norm}(\mathbf{k}_j)}{\sqrt{d_k}}。
$$
:::

::: proposition QK 归一化给 logits 设界 {#prop-qk-bound}
使用带增益$\boldsymbol\gamma_q, \boldsymbol\gamma_k\in\R^{d_k}$的 RMSNorm 时，无论查询与键多大，每个注意力 logit 都满足$\lvert z_j\rvert\le\sqrt{d_k}\,\max_i\lvert\gamma_{q,i}\gamma_{k,i}\rvert$。
:::

::: proof
RMSNorm 把$\mathbf{q}$映为$\boldsymbol\gamma_q\odot\hat{\mathbf q}$，其中$\hat{\mathbf q} = \mathbf{q}/\operatorname{rms}(\mathbf q)$，于是$\sum_i\hat q_i^2 = d_k$（[[transformers/transformer-block#def-rmsnorm]]）；$\mathbf{k}$同理。于是$\lvert\sum_i\gamma_{q,i}\gamma_{k,i}\hat q_i\hat k_i\rvert\le\max_i\lvert\gamma_{q,i}\gamma_{k,i}\rvert\sum_i\lvert\hat q_i\hat k_i\rvert\le\max_i\lvert\gamma_{q,i}\gamma_{k,i}\rvert\cdot d_k$，用到柯西-施瓦茨不等式$\sum_i\lvert\hat q_i\hat k_i\rvert\le\norm{\hat{\mathbf q}}\norm{\hat{\mathbf k}} = d_k$。再除以$\sqrt{d_k}$即得所求上界。
:::

logits 仍然可以增长，但只能通过增益——参数量少、受权重衰减约束、变化缓慢——而不是通过整个投影矩阵的范数。Dehghani 等发现 QK 归一化消除了他们$220$亿参数模型的发散；Wortsman 等发现它大幅降低了小模型的学习率敏感度；其后若干语言模型采用了它（例如 OLMo 2 与 Chameleon，均为 2024）。

::: example 注意力头增长时的熵 {#ex-entropy}
一个查询对三个键的打分为$\mathbf{z} = (2, 1, 0)$。计算$\beta = 1$与$\beta = 4$时的注意力权重与熵，并检验[[#eq-entropy]]在$\beta = 1$处的符号。
::: solution
$\beta = 1$时：$e^2, e^1, e^0 = 7.389, 2.718, 1$，和$11.107$，故$\mathbf{p} = (0.665, 0.245, 0.090)$，$H = -(0.665\ln0.665 + 0.245\ln0.245 + 0.090\ln0.090) = 0.271 + 0.345 + 0.217 = 0.832$ nats（最大值为$\ln3 = 1.099$）。$\beta = 4$时：$e^8, e^4, 1 = 2981, 54.6, 1$，故$\mathbf{p} = (0.9817, 0.0180, 0.0003)$，$H = 0.018 + 0.072 + 0.003 = 0.093$ nats。$\beta = 1$时，$\E_{\mathbf p}[z] = 1.330 + 0.245 = 1.575$，$\E_{\mathbf p}[z^2] = 2.660 + 0.245 = 2.905$，$\Var = 2.905 - 2.481 = 0.424$，故$dH/d\beta = -0.424 < 0$。把 logits 乘以四，已把这个头从软混合逼成近乎硬选择。
:::
:::

## 输出 logits 与 z 损失 {#sec-zloss}

输出层有一个精确的对称性：给所有 logits 加上同一常数$c$，softmax 不变，因而交叉熵也不变。因此损失并不决定 logits 的整体水平，也没有任何东西阻止它漂移。低精度下大输出 logits 是危险的——对数配分函数$\log Z = \log\sum_ie^{z_i}$由指数算出，其舍入误差随其大小增长——Wortsman 等在不用权重衰减的小模型中观察到输出 logits 发散这一独立的不稳定模式。

::: definition z 损失 {#def-zloss}
**z 损失**（Chowdhery 等，2022）在每个位置的交叉熵上，加一个对输出 logits$\mathbf{z}$的对数配分函数的惩罚：

$$
\mathcal{L} = \mathcal{L}_{\text{CE}} + \lambda_z\,(\log Z)^2,\qquad\log Z = \log\sum_{i\in\mathcal V}e^{z_i},
$$

PaLM 取$\lambda_z = 10^{-4}$。
:::

::: proposition z 损失固定自由平移 {#prop-zloss}
设$\mathbf{p} = \operatorname{softmax}(\mathbf{z})$，$y$为目标。组合损失对 logits 的梯度为

$$
\frac{\partial\mathcal{L}}{\partial z_i} = p_i - \mathbb{1}[i = y] + 2\lambda_z\log Z\cdot p_i。
$$

交叉熵部分对$i$求和为零，所以它从不改变平均 logit；z 损失部分求和为$2\lambda_z\log Z$，于是梯度下降把所有 logits 一起推向使$\log Z$靠近$0$的方向。
:::

::: proof
交叉熵梯度为$p_i - \mathbb 1[i = y]$（[[math-for-ml/gradients#prop-softmax-ce]]），且$\sum_i(p_i - \mathbb 1[i = y]) = 1 - 1 = 0$，所以一个梯度步对 logits 的改动是一个零和向量，其平均值不变。惩罚项方面，$\partial(\log Z)/\partial z_i = e^{z_i}/Z = p_i$，故$\partial\lambda_z(\log Z)^2/\partial z_i = 2\lambda_z\log Z\,p_i$，它对$i$求和为$2\lambda_z\log Z$。因此一步大小为$\eta$、沿负梯度方向的更新在$\log Z > 0$时把 logits 之和降低$2\eta\lambda_z\log Z$，在$\log Z < 0$时抬高它，一阶上使$\lvert\log Z\rvert$减小。
:::

::: example 手算 z 损失梯度 {#ex-zloss}
某位置的输出 logits 为三词元词表上的$\mathbf{z} = (2, 1, 0)$，目标为第一个词元。计算交叉熵梯度、$\lambda_z = 10^{-4}$的 z 损失梯度、以及各自的和。
::: solution
$Z = e^2 + e + 1 = 11.107$，$\log Z = 2.408$，$\mathbf p = (0.665, 0.245, 0.090)$。交叉熵梯度：$\mathbf{p} - \mathbf{e}_1 = (-0.335, 0.245, 0.090)$，和为$0$。z 损失梯度：$2\cdot10^{-4}\cdot2.408\cdot\mathbf p = (3.20, 1.18, 0.43)\times10^{-4}$，和为$4.8\times10^{-4} = 2\lambda_z\log Z$。z 损失项比交叉熵项小一千倍，但它是唯一和不为零的：只有它把三个 logits 一起往下推，朝$\log Z = 0$去。
:::
:::

当$\log Z\approx0$时，logits 本身就是对数概率，把它们保持在数值上舒适的范围内。系数足够小，惩罚几乎不影响交叉熵。z 损失也被用于混合专家模型的路由器（Zoph 等，2022，路由器 z 损失），那里大的路由器 logits 会引起类似的问题。

## Adam 与突发梯度 {#sec-adam}

Adam 把一阶矩估计除以二阶矩的平方根（[[neural-networks/optimisers#prop-adam]]）。若某个参数的梯度长期很小，它的二阶矩估计$v$就小；突发的大梯度会在$v$跟上之前产生一次大更新。这是尖峰的一种候选机制（Molybog 等，2023），也解释了一条惯例。

::: proposition 平静期后的第一个 Adam 更新 {#prop-adam-burst}
设某参数在一段梯度可忽略的时期后矩为$m\approx0$、$v\approx0$（偏差修正因而$\approx1$），此时来了梯度$g\neq0$。下一个 Adam 更新（以学习率的倍数计）为

$$
\frac{\lvert m\rvert}{\sqrt{v}} = \frac{(1-\beta_1)\lvert g\rvert}{\sqrt{(1-\beta_2)g^2}} = \frac{1-\beta_1}{\sqrt{1-\beta_2}},
$$

与$g$的大小无关。$\beta_1 = 0.9$时，$\beta_2 = 0.95$下为$0.447$，$\beta_2 = 0.99$下为$1.0$，$\beta_2 = 0.999$下为$3.16$。
:::

::: proof
从$m = v = 0$按更新规则$m\leftarrow\beta_1m + (1-\beta_1)g$与$v\leftarrow\beta_2v + (1-\beta_2)g^2$出发，得$m = (1-\beta_1)g$、$v = (1-\beta_2)g^2$；约去$\lvert g\rvert$即得比值。（$\epsilon > 0$时更新略小。）
:::

稳态下 Adam 每参数的更新至多约$1$个学习率；$\beta_2 = 0.999$时，突然收到梯度的参数一步跨出的距离是稳态的三倍以上——更糟的是，随之而来的大$v$又会在接下来的几千步里压制它的更新。$\beta_2 = 0.95$时，二阶矩约$20$步就能适应，突发不足正常步长的一半。这就是多数大语言模型配方取$\beta_2 = 0.95$的通常解释（[[pretraining/training-loop#sec-schedules]]）；相关的补救是更大的$\epsilon$，它在$v$极小时给更新封顶（Wortsman 等，2023 在大尺度上研究了$\epsilon$的影响）。

::: widget plot
f: 0.1/sqrt(1 - x); 1 + 0*x
x: 0.9, 0.9995
y: 0, 5
vlines: 0.95; 0.999
labels: first update after quiet period, $(1-\beta_1)/\sqrt{1-\beta_2}$; steady-state scale
caption: $\beta_1 = 0.9$时[[#prop-adam-burst]]给出的长时间平静期后第一个大梯度的 Adam 更新大小（以学习率计），随$\beta_2$变化。竖线标出语言模型预训练常用的$0.95$与库默认值$0.999$。$\beta_2$很高时，不常激活的参数——比如罕见词元的嵌入——会做出过大的跳跃。
:::

::: example 罕见词元的嵌入 {#ex-rare-token}
某词元在$20{,}000$步后首次出现在一个批次中。其嵌入分量大小约$0.02$，学习率$3\times10^{-4}$，$\beta_1 = 0.9$。$\beta_2 = 0.999$与$\beta_2 = 0.95$时，第一步中每个分量相对其大小移动多远？
::: solution
由[[#prop-adam-burst]]，$\beta_2 = 0.999$时步长为$3.16\cdot3\times10^{-4} = 9.5\times10^{-4}$，一步相对变化$4.7\%$；$\beta_2 = 0.95$时为$0.447\cdot3\times10^{-4} = 1.3\times10^{-4}$，$0.7\%$。罕见词元、以及更一般地梯度时有时无的参数，正是高$\beta_2$造成大而突兀的变化之处。
:::
:::

## 大规模下的初始化与归一化 {#sec-init}

若干如今标准的架构选择都是出于稳定性而采用的。

- **前归一化。**把归一化放在每个子层之前、残差分支内部，使残差流保持一条恒等通路（[[transformers/transformer-block#prop-identity]]）；Xiong 等（2020）证明最初的后归一化设计在初始化时输出附近梯度很大、必须靠预热才能训练。多数大语言模型使用前归一化，通常配合 RMSNorm。
- **缩放的残差初始化。**每个残差分支的输出投影以标准差缩小$1/\sqrt{2L}$倍初始化（$L$为块数；GPT-2），使残差流的方差不随深度增长（[[neural-networks/initialisation-normalisation#ex-gpt2-scaling]]）。
- **嵌入层的处理。**BLOOM（2022）在嵌入层之后加了 LayerNorm；GLM-130B（Zeng 等，2022）缩小了流入嵌入层的梯度。两者都针对源自嵌入层的不稳定。
- **减少能无界增长的参数。**去掉偏置、对多数矩阵施加权重衰减、归一化查询与键，都在限制那些损失不加约束的量的增长。

::: warning 梯度裁剪防不住尖峰
裁剪限制每步梯度的范数，但尖峰通常不是一次巨大的梯度：它是网络状态的一次改变——饱和的注意力、漂移的 logits、陈旧的二阶矩——使随后许多步连续出错。PaLM 的尖峰发生在开启裁剪的情况下。更糟的是，几乎每步都在裁剪的运行实际上是用一个更小的归一化学习率在训练，可能症状被掩盖而病根在生长。要盯着裁剪触发的频率，把频繁裁剪当作降低学习率或修改架构的信号。
:::

## 数值格式 {#sec-formats}

默认做法是 bfloat16 混合精度训练、float32 主权重（[[neural-networks/training-practice#sec-precision]]）。Bfloat16 有与 float32 相同的范围，溢出罕见，但精度只有$8$位。对舍入敏感的操作——softmax 与 log-sum-exp、归一化统计量、长求和的归约、损失本身——即便在 bfloat16 模型内部也要用 float32 完成。

截至 2026 年，若干大型运行已用 **8 位浮点**（FP8）做主矩阵乘法，在支持的硬件上峰值吞吐再度翻倍。Micikevicius 等（2022）提出了两种 FP8 格式：**E4M3**（指数$4$位、尾数$3$位、最大有限值$448$）用于权重与激活，**E5M2**（指数$5$位、尾数$2$位、最大值$57{,}344$）以更大范围用于梯度。位数如此之少，数值必须先**缩放**到可表示范围内再转格式。

::: definition 带缩放的低精度转换 {#def-scaled-cast}
要把张量$X$转为最大有限值为$F_{\max}$的格式，取缩放因子$s = F_{\max}/\operatorname{amax}(X)$（$\operatorname{amax}$为绝对值最大元素，按整个张量、或按分块划分的每一块计算），把$\operatorname{round}(sX)$存入低精度格式、并以更高精度存储$s$，再把每个矩阵乘积的结果乘上缩放因子的倒数。**按张量**缩放每个张量用一个$s$；**细粒度**（按块）缩放每个小块用一个。
:::

::: widget floatline
p: 4
emin: -6
emax: 8
value: 300
caption: 一个有效位$4$位（尾数存$3$位）、指数从$-6$到$8$的格式，即 FP8 E4M3 的布局。$256$与$512$之间可表示的数间隔$32$，所以$300$舍入到$288$。这个玩具格式的最大值是$480$；真正的 E4M3 保留那个位模式表示 NaN，所以最大有限值是$448$。更大的数一律溢出——这就是张量要先缩放到范围内再转换的原因。
:::

细粒度缩放之所以重要，是因为单个离群值会决定整个张量的缩放因子：若某一个激活比其他大$100$倍，按张量缩放就把其余值推向相对精度很差的范围低端（或推向次正规数）。DeepSeek-V3（2024）报告了 FP8 训练：激活按$1\times128$小块、权重按$128\times128$块设置缩放因子，累加在更高精度中进行，与 bfloat16 基线的相对损失差在$0.25\%$以下。激活中的离群特征随模型规模增长（Dettmers 等，2022），这是低精度训练对大模型更难的原因之一；它们在量化推理中影响更大（[[inference/quantisation]]）。

::: example 缩放到 FP8 范围 {#ex-fp8}
某张量绝对值最大元素$\operatorname{amax} = 1373.3$。什么按张量缩放因子把它映射到 E4M3 范围？元素$888.6$在不缩放与缩放之下分别会怎样？
::: solution
$s = 448/1373.3 = 0.3262$。不缩放时，$888.6 > 448$饱和到$448$（或变成 NaN，取决于转换模式），误差接近$50\%$。缩放后，$888.6s = 289.9$，落在$[256, 512)$内——E4M3 在此间隔$32$——舍入到$288$，除以$s$得$882.9$，误差$0.6\%$——约是$3$位尾数所能达到的水平。
:::
:::

## 一个数值实验室 {#sec-code}

下面的清单用纯 Python 检验本章的四个论断：缩放下的熵坍缩（[[#prop-entropy]]）、Adam 突发的规模（[[#prop-adam-burst]]）、z 损失对$\log Z$的作用（[[#prop-zloss]]）、以及有无缩放时的 FP8 舍入（[[#ex-fp8]]）。

```python
import math, random
rng = random.Random(0)

# 1. 随 logits 增大，注意力熵坍缩
def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]
def entropy(p): return -sum(q * math.log(q) for q in p if q > 0)
z = [rng.gauss(0, 1) for _ in range(512)]            # 一个查询对 512 个键的打分
print("logit scale  entropy (nats)  max weight")
for beta in [0.5, 1, 2, 4, 8, 16]:
    p = softmax([beta * v for v in z])
    print(f"{beta:6.1f}       {entropy(p):6.3f}         {max(p):.3f}")
print(f"uniform: ln 512 = {math.log(512):.3f}")

# 2. 平静期后 Adam 的第一个更新：突发梯度下 m/sqrt(v) 的大小
for b2 in [0.95, 0.99, 0.999]:
    m = v = 0.0
    for _ in range(10_000):                           # 漫长的平静期：梯度极小
        g = rng.gauss(0, 1e-4); m = 0.9 * m + 0.1 * g; v = b2 * v + (1 - b2) * g * g
    g = 1e-2                                          # 一个比平时大 100 倍的梯度
    m = 0.9 * m + 0.1 * g; v = b2 * v + (1 - b2) * g * g
    print(f"beta2 = {b2}: update / lr = {m / (math.sqrt(v) + 1e-12):.3f}"
          f"   bound (1-b1)/sqrt(1-b2) = {0.1 / math.sqrt(1 - b2):.3f}")

# 3. 没有东西固定 log Z 时它会漂移；z 损失固定它
def run(zcoef, steps=2000, lr=0.5):
    r = random.Random(1)
    logits = [0.0] * 8; target = 3
    for _ in range(steps):
        p = softmax(logits); lse = max(logits) + math.log(sum(math.exp(v - max(logits)) for v in logits))
        common = r.gauss(0, 0.05)                     # 对所有 logits 同等作用的噪声
        grad = [p[i] - (i == target) + 2 * zcoef * lse * p[i] + common for i in range(8)]
        logits = [l - lr * g for l, g in zip(logits, grad)]
    p = softmax(logits)
    lse = max(logits) + math.log(sum(math.exp(v - max(logits)) for v in logits))
    return -math.log(p[target]), lse
for c in [0.0, 1e-4, 1e-2]:
    ce, lse = run(c)
    print(f"z-loss coefficient {c:g}: cross-entropy {ce:.4f}, log Z = {lse:+.2f}")

# 4. 按张量缩放的 FP8 E4M3 舍入（最大有限值 448）
def e4m3(x):
    if x == 0: return 0.0
    s, a = (1, x) if x > 0 else (-1, -x)
    a = min(a, 448.0)
    e = max(math.floor(math.log2(a)), -6)            # 2^-6 以下为次正规数
    step = 2.0 ** (e - 3)                            # 3 位尾数
    return s * round(a / step) * step
vals = [rng.gauss(0, 1) * 1000 for _ in range(6)]
amax = max(abs(v) for v in vals); scale = 448 / amax
print("values   ", [round(v, 1) for v in vals])
print("no scale ", [e4m3(v) for v in vals])
print("scaled   ", [round(e4m3(v * scale) / scale, 1) for v in vals], f"(scale {scale:.4f})")
```

```text
logit scale  entropy (nats)  max weight
   0.5        6.097         0.010
   1.0        5.647         0.039
   2.0        3.987         0.245
   4.0        0.965         0.831
   8.0        0.029         0.997
  16.0        0.000         1.000
uniform: ln 512 = 6.238
beta2 = 0.95: update / lr = 0.454   bound (1-b1)/sqrt(1-b2) = 0.447
beta2 = 0.99: update / lr = 0.970   bound (1-b1)/sqrt(1-b2) = 1.000
beta2 = 0.999: update / lr = 3.029   bound (1-b1)/sqrt(1-b2) = 3.162
z-loss coefficient 0: cross-entropy 0.0009, log Z = +6.94
z-loss coefficient 0.0001: cross-entropy 0.0016, log Z = +6.26
z-loss coefficient 0.01: cross-entropy 0.0097, log Z = +0.45
values    [1373.3, -176.0, 888.6, 480.1, 285.7, -128.6]
no scale  [448.0, -176.0, 448.0, 448.0, 288.0, -128.0]
scaled    [1373.3, -171.7, 882.9, 490.5, 294.3, -122.6] (scale 0.3262)
```

把$512$个标准正态注意力打分乘以$8$后，$99.7\%$的权重落在一个键上。Adam 的突发与[[#prop-adam-burst]]的公式吻合，误差来自此前带噪声梯度的微小贡献。logit 实验中，交叉熵里没有任何东西固定八个 logits 的共同水平（它只随注入的共模噪声移动），而当目标概率逼近$1$时，$\log Z$攀升到约$7$；$10^{-4}$的 z 损失在$2000$步里也只缓慢地把它拉回，而$10^{-2}$把它按在$0$附近，只花一点点交叉熵代价。真实模型中，z 损失在几十万步里对每个批次的每个位置都起作用，所以 PaLM 的小系数就够用。最后，不缩放时超过$448$的值饱和；按张量缩放后每个值都保住约两位有效数字。

## 可迁移的超参数：μP（研究） {#sec-mup}

稳定性与学习率的选择是连在一起的：最有效的学习率通常恰好在训练开始不稳定那个值之下；而在标准参数化下，这个门槛随模型变宽而移动，小模型上调好的学习率并不能迁移。**最大更新参数化**（$\mu$P；Yang 等，2021）改变初始化、学习率与若干乘子随宽度的缩放方式，使在无穷宽极限下每一层的特征每步的变化保持一阶量级——既不爆炸也不冻结。

::: definition μP 对 Adam 的规则（简化） {#def-mup}
对隐层宽度相对调好参的基模型放大$m$倍的模型，$\mu$P 配 Adam 与标准参数化相比规定：隐层权重矩阵按方差$\propto1/\text{fan-in}$初始化（照旧），但其**学习率**乘以$1/m$；**输出 logits**乘以$1/m$（或等价地相应地初始化和缩放输出层）；输入嵌入的学习率不缩放；注意力 logits 用$\mathbf{q}\cdot\mathbf{k}/d_k$而非$/\sqrt{d_k}$。
:::

::: example 用 μP 迁移学习率 {#ex-mup}
一个宽度$256$的基模型在$\mu$P下调参，得到隐层 Adam 学习率$10^{-2}$、输出乘子$1$。宽度$4096$时$\mu$P规定的隐层学习率与输出乘子是多少？标准参数化又会怎样？
::: solution
宽度比$m = 4096/256 = 16$，于是隐层学习率变为$10^{-2}/16 = 6.25\times10^{-4}$，输出 logits 乘以$1/16$；嵌入学习率保持调好的值。标准参数化下每层用同一个全局学习率，而且不得不在宽度$4096$时重新扫描，因为最优点随宽度移动——通常下移。
:::
:::

Yang 等报告，在$\mu$P下最优学习率与初始化尺度跨宽度几乎不变；他们用“$\mu$迁移”演示：在一个$4000$万参数的替身模型上调参，把超参数迁移到一个$67$亿参数、GPT-3 风格的模型上，结果达到或超过已发表模型。其后若干模型报告使用了$\mu$P或其变体（例如 Cerebras-GPT 与 MiniCPM）。截至 2026 年，$\mu$P仍是一个活跃的研究方向而非普遍标准：它在自己的假设下保证跨宽度迁移，而跨深度、批量大小与训练长度的迁移需要扩展；不使用它的大型团队的成果也说明，仔细扫描加外推同样可行。

## 实践中应对尖峰 {#sec-practice}

::: algorithm 应对损失尖峰 {#alg-spike}
1. **检测**：损失超过其近期滑动平均若干个标准差、或梯度范数跳升时报警；记下步数与涉及的批次。
2. **稍等片刻**：许多尖峰会在几百步内自行恢复；若损失回到趋势上，继续训练并记录在案。
3. **回卷并跳过**：否则，从尖峰开始前的一个检查点重启，并跳过尖峰前后的批次（PaLM：回退约$100$步、跳过$200$–$500$个批次），让模型在该状态下遇到不同的数据。
4. **降低学习率**：尖峰反复出现时暂时或永久降低学习率（OPT 的日志记录了多次下调）。
5. **检查内部状态**：逐层的最大注意力 logit 与熵、输出 logits 范数、逐层梯度范数、Adam 的二阶矩统计量，以及肇事批次里的数据。
6. **修改下一次运行的配方**：若找到了机制，就改用 QK 归一化、z 损失、更低的$\beta_2$或更大的$\epsilon$、嵌入归一化、更高精度的归约。
:::

::: quiz
一次运行的损失出现尖峰，$300$步内恢复，又在$2000$步之后以同样学习率再次出现尖峰。哪些应对是合理的？（多选。）
- [x] 回退到第二次尖峰之前的检查点并跳过前后的批次。
- [x] 检查尖峰前后逐层的最大注意力 logit。
- [ ] 把这些批次从数据集中永久删除，因为尖峰由坏数据引起。
- [x] 尖峰不断复发时考虑降低学习率。
::: solution
回卷并跳过批次、检查注意力 logit、降低学习率都是标准应对。删除批次假定数据有问题，而 PaLM 的重放实验表明同样的批次从不同的模型状态出发并不会引发尖峰；病因通常是状态与数据的相互作用。
:::
:::

::: history
Transformer 训练中的不稳定从一开始就有记录：最初的 Transformer 就需要学习率预热，Xiong 等（2020）把它归因于后归一化。Micikevicius 等（2018）引入带损失缩放的混合精度训练，Kalamkar 等（2019）研究了 bfloat16。GPT-2（2019）使用前归一化与缩放的残差初始化。Henry 等（2020）为机器翻译提出查询-键归一化。Yang 等（2021）提出$\mu$P。2022 年，大型运行报告——OPT（Zhang 等）、BLOOM、GLM-130B（Zeng 等）与 PaLM（Chowdhery 等，引入 z 损失与回卷跳过流程）——把不稳定变成中心议题；Micikevicius 等（2022）定义了 FP8 格式。Dehghani 等（2023）用 QK 归一化训练了$220$亿参数的视觉 Transformer，Zhai 等（2023）分析了注意力熵坍缩，Wortsman 等（2023）在小模型中复现了大规模不稳定，Molybog 等（2023）分析了 Adam 的角色。DeepSeek-V3（2024）报告了带细粒度缩放的大规模 FP8 训练。
:::

::: summary
- **损失尖峰**是突然的损失上升，可能恢复也可能导致发散；它来自模型状态、优化器状态与数据的相互作用，即便开着梯度裁剪也会发生。
- 注意力 logits 乘以$\beta$使注意力熵以$\beta\Var_{\mathbf p}(z)$的速率下降，导致**熵坍缩**；**QK 归一化**把 logits 限制在$\sqrt{d_k}$乘以增益之内。
- 交叉熵让输出 logits 的共同水平自由漂移；**z 损失**$10^{-4}(\log Z)^2$把$\log Z$固定在$0$附近。
- 平静期后 Adam 的第一个更新为$(1-\beta_1)/\sqrt{1-\beta_2}$个学习率——$\beta_2 = 0.999$时是$3.16$，$0.95$时是$0.45$——这是语言模型配方取低$\beta_2$的原因之一。
- 前归一化、缩放的残差初始化、嵌入归一化与权重衰减是稳定性选择。
- 训练用 bfloat16 加 float32 主权重，敏感操作用 float32；**FP8**（E4M3，最大$448$；E5M2，最大$57{,}344$）需要**缩放**，由于离群值最好按块进行。
- **$\mu$P**使超参数跨宽度迁移（研究）；实践中尖峰靠回卷、跳过批次、降低学习率处理，并在下一次运行中修复机制。
:::

## 习题

::: exercise Adam 的突发 {level=1 check="1"}
$\beta_1 = 0.9$、$\beta_2 = 0.99$时，长时间平静期后 Adam 的第一个更新有多大（以学习率计）？据[[#prop-adam-burst]]。
::: solution
$(1-0.9)/\sqrt{1-0.99} = 0.1/0.1 = 1$。
:::
:::

::: exercise z 损失的一个数值 {level=1 check="0.0009"}
某位置的输出 logits 有$\log Z = 3$。PaLM 的系数$\lambda_z = 10^{-4}$给损失加上多少 z 损失？
::: solution
$10^{-4}\cdot3^2 = 9\times10^{-4}$，与约$2$的典型交叉熵相比微不足道。
:::
:::

::: exercise FP8 缩放因子 {level=1 check="0.0448"}
某张量绝对值最大元素为$10{,}000$。什么按张量缩放因子把它映射到 E4M3 范围？
::: solution
$s = 448/10{,}000 = 0.0448$。
:::
:::

::: exercise 两个键的熵 {level=2 check="0.0901"}
一个查询对打分$z = (\beta, 0)$的两个键做注意力。计算$\beta = 4$时的注意力熵（单位 nats，保留四位小数）。
::: solution
$p_1 = 1/(1 + e^{-4}) = 0.98201$，$p_2 = 0.01799$。于是$p_1\ln(1/p_1) = 0.98201\cdot0.018152 = 0.017826$，$p_2\ln(1/p_2) = 0.01799\cdot4.01815 = 0.072287$，故$H = 0.0901$ nats，最大值为$\ln2 = 0.6931$。
:::
:::

::: exercise QK 上界 {level=2 check="11.3137"}
RMSNorm QK 归一化、$d_k = 128$、所有增益都为$1$时，最大的可能注意力 logit 是多少（保留四位小数）？此时一个键对$T - 1 = 4095$个 logit 为$-11.3137$的键至多能获得多大的 softmax 权重？
::: solution
由[[#prop-qk-bound]]，$\sqrt{128} = 11.3137$。一个 logit 为$+11.31$、另外$4095$个为$-11.31$时，权重为$1/(1 + 4095e^{-22.63}) = 1 - 6.1\times10^{-7}$。这个上界并不阻止一个头接近 one-hot；它阻止 logits 继续增长，从而使梯度与舍入误差有界。增益可学习时，上界只随增益增长。
:::
:::

::: exercise 稳态的 Adam 更新 {level=2}
证明若某参数的梯度恒定，对所有$t$有$g_t = g\neq0$，则 Adam 偏差修正后的更新$\hat m_t/\sqrt{\hat v_t}$对每个$t$都等于$\operatorname{sign}(g)$（取$\epsilon = 0$）。对照$\beta_2 = 0.999$的[[#prop-adam-burst]]：为什么突发的梯度比恒定的梯度产生更大的步长？
::: solution
梯度恒定时$m_t = (1-\beta_1^t)g$、$v_t = (1-\beta_2^t)g^2$，于是$\hat m_t = g$、$\hat v_t = g^2$，得$\hat m_t/\sqrt{\hat v_t} = g/\lvert g\rvert = \operatorname{sign}(g)$，步长恰为一个学习率。[[#prop-adam-burst]]中矩在训练后期接近$0$，此时偏差修正约为$1$、起不到补偿作用；一阶矩里装着$(1-\beta_1)g$，二阶矩里只装着$(1-\beta_2)g^2$，而$\beta_2 = 0.999$时$1-\beta_2$远比$(1-\beta_1)^2$小（$0.001$对$0.01$），比值因而大于$1$。二阶矩对平静期的“记忆”比一阶矩更长。
:::
:::

::: exercise 尖峰的处理流程 {level=2}
尖峰从第$120{,}350$步开始。检查点每$500$步保存一次。按 PaLM 的流程，你应从哪个检查点重启？若跳过$400$个批次，跳过哪些？数据加载器必须支持什么才能做到？
::: solution
至少早于尖峰$100$步的最后一个检查点：第$120{,}000$步（$120{,}500$的检查点在尖峰之后；$120{,}000$早它$350$步）。从那里重启，并跳过本来会在第$120{,}250$到$120{,}650$步之间消费的批次，使模型带着不同的数据到达尖峰区域。数据加载器必须是确定且可定位的——能从数据流中给定位置恢复、能跳过给定的批次区间——且其状态必须包含在检查点里（[[pretraining/training-loop#sec-checkpoints]]）。
:::
:::

::: exercise 数值验证熵的导数 {level=3}
写一个纯 Python 函数，用中心差分为$\mathbf{z} = (2, 1, 0)$在$\beta = 1$处估计$dH/d\beta$，并与[[#ex-entropy]]的$-\beta\Var_{\mathbf p}(z)$比较。
::: solution
```python
import math
def H(beta, z=(2, 1, 0)):
    e = [math.exp(beta * v) for v in z]; s = sum(e); p = [x / s for x in e]
    return -sum(q * math.log(q) for q in p), p
h = 1e-5
numeric = (H(1 + h)[0] - H(1 - h)[0]) / (2 * h)
p = H(1)[1]; mean = sum(q * v for q, v in zip(p, (2, 1, 0)))
var = sum(q * v * v for q, v in zip(p, (2, 1, 0))) - mean ** 2
print(f"numeric {numeric:.6f}   formula {-1 * var:.6f}")
```

```text
numeric -0.424405   formula -0.424405
```

两者六位小数一致，证实了[[#eq-entropy]]。
:::
:::

::: exercise logits 的自由平移为何会漂移 {level=3}
[[#prop-zloss]]中交叉熵梯度零和。尽管如此，解释在一个用 Adam 训练、输出层关闭权重衰减的真实模型中，输出 logits 的平均值为何仍会漂移；以及既然$\lambda_z$微乎其微，z 损失的推力为何有效。
::: solution
零和性质是对 logits 的梯度而言的。logits 为$\mathbf{z} = W\mathbf{h} + \mathbf{b}$；朴素 SGD 下一步梯度把$W$改动$-\eta\,(\mathbf{p} - \mathbf{e}_y)\mathbf{h}^\top$，保持$W$的列和不变——但 Adam 对每个分量各除以自己的$1/\sqrt{v}$，破坏了零和结构，而隐藏向量$\mathbf h$本身也在变，于是共同分量$\frac{1}{\lvert\mathcal V\rvert}\sum_iz_i$无人看管、四处漂移（若有权重衰减，只会微弱地把它拉向$0$）。正因为损失在这个方向上完全平坦，任何推力——哪怕是$\lambda_z = 10^{-4}$时的$2\lambda_z\log Z$——都不受主损失阻碍，并在几十万步里对每个位置持续累积；这里没有可以倾斜的此消彼长，只有一个需要固定的中性方向。
:::
:::

::: exercise 离群值与按张量缩放 {level=3}
某张量有$1023$个大小约$1$的元素和一个大小为$1000$的离群值。按张量 E4M3 缩放时，缩放因子是多少？典型元素缩放后变成什么？大致保住多少相对精度？（E4M3 的最小正规数为$2^{-6} = 0.0156$，其下次正规数间隔$2^{-9}$。）按$128$个元素分块缩放有何帮助？
::: solution
$s = 448/1000 = 0.448$；典型元素变成约$0.448$，落在$[0.25, 0.5)$——E4M3 数在此间隔$2^{-2-3} = 0.03125$——相对精度最差约$7\%$，与该格式的常规精度相当。所以这里离群值损失不大，因为$0.448$仍是正规数。若离群值为$10^5$，则$s = 0.00448$，典型元素变成$0.0045$，低于最小正规数$0.0156$，落入间隔$2^{-9} = 0.00195$的次正规区：它们被表示成$0.0039$或$0.0059$，误差$\pm30\%$以上。按$128$个元素分块时，只有含离群值的那一块用小缩放因子；其余七块用$s = 448$，保住完整相对精度。这正是 DeepSeek-V3 采用细粒度缩放的动机（[[#sec-formats]]）。
:::
:::
