一个解码步要读取模型的所有权重与缓存的所有条目，并且大部分时间都花在等这些字节上（[[inference/batching-serving#sec-intensity]]）。因此，把每个数存进更少的位能同时带来三方面的好处：模型能放进更少的设备、旁边能腾出更多缓存，而且每一步读取的字节更少。一个含$70\times10^9$参数的模型以 bfloat16 存放需要$140$ GB，而$4$比特只需约$36$ GB——这正是两块加速器与一块加速器之间的差别，而且对访存受限的解码来说，权重读取接近四倍加速。**量化**就是用低精度的数取代高精度的数，并且让模型输出的改变尽可能小。

本章从均匀量化器及其误差（每个数$\Delta^2/12$）讲起，进而讨论缩放因子的选取（按张量、按通道、按组）。然后是**仅权重**量化：借助校准数据可以把整个层的误差最小化——源自最优脑手术（optimal brain surgeon）的 GPTQ 二阶补偿，以及 AWQ 的激活感知缩放；再讲**权重与激活联合量化**，其障碍是大模型的离群特征（LLM.int8()、SmoothQuant）。最后讲量化 KV缓存以及新近硬件的 8 比特与 4 比特浮点格式。每种方法都在小矩阵上用纯 Python 实现并实测其误差。以低精度训练是另一个主题，在[[scaling/mixed-precision]]中讨论。

## 均匀量化 {#sec-uniform}

::: definition 均匀仿射量化 {#def-quant}
**$k$比特均匀量化器**带**缩放因子**$\Delta > 0$与**零点**$z\in\mathbb{Z}$，把实数$x$映射为整数

$$
q = \operatorname{clamp}\!\big(\operatorname{round}(x/\Delta) + z,\ q_{\min},\ q_{\max}\big)
$$

并以$\hat x = \Delta(q - z)$表示它。**非对称**量化取$q\in\{0,\dots,2^k - 1\}$与一个零点，零点的选取要覆盖数据的范围$[x_{\min}, x_{\max}]$；**对称**量化取$z = 0$与$q\in\{-2^{k-1},\dots,2^{k-1} - 1\}$，取**absmax**缩放因子$\Delta = \max\lvert x\rvert/(2^{k-1} - 1)$是最简单的选择。
:::

会出现两种误差。范围内的值被**舍入**到最近的格点，误差不超过$\Delta/2$；范围外的值被**截断**到范围的端点。范围更宽意味着截断更少，但网格更粗。

::: proposition 舍入的误差 {#prop-delta12}
若一个未被截断的值的舍入误差$\epsilon = \hat x - x$在$[-\Delta/2, \Delta/2]$上均匀分布，则

$$
\E[\epsilon] = 0,\qquad \E[\epsilon^2] = \frac{\Delta^2}{12}.
$$ {#eq-delta12}

对一个均匀充满范围$[-A, A]$、以$2^k$个电平量化的信号（$\Delta = 2A/2^k$），量化信噪比为$2^{2k}$，约$6.02k$分贝：每多一位，噪声功率变为四分之一。
:::

::: proof
对$\epsilon$在$[-\Delta/2, \Delta/2]$上均匀的情形，密度为$1/\Delta$，由对称性均值为$0$，且$\E[\epsilon^2] = \frac1\Delta\int_{-\Delta/2}^{\Delta/2}\epsilon^2\,d\epsilon = \frac1\Delta\cdot\frac{2}{3}\Big(\frac\Delta2\Big)^3 = \frac{\Delta^2}{12}$。在$[-A, A]$上均匀的信号功率为$\E[x^2] = A^2/3$；取$\Delta = 2A/2^k$，噪声功率为$4A^2/(12\cdot2^{2k}) = A^2/(3\cdot2^{2k})$，故比值为$2^{2k}$，且$10\log_{10}2^{2k} = 20k\log_{10}2 = 6.02k$ dB。
:::

均匀误差假设并非对一切输入都成立的定理；当网格相对于$x$密度变化的尺度足够细、从而在每个格子内部$x$的位置大致均匀时，它是准确的。对粗糙的网格和集中在格点上的值（例如零），它会失效。下面的清单对均匀数据的$8$比特量化检验了这一假设：实测 MSE $5.173\times10^{-6}$，理论值$\Delta^2/12 = 5.166\times10^{-6}$。

::: example 把四个数量化到 4 比特 {#ex-int4}
用 absmax 缩放因子把$\mathbf{x} = (0.9, -0.3, 0.05, -1.2)$量化为对称的$4$比特整数，电平取$-7,\dots,7$。重构值与均方误差各是多少？与$\Delta^2/12$比较。
::: solution
$\Delta = 1.2/7 = 0.1714$。于是$x/\Delta = (5.25, -1.75, 0.29, -7)$，舍入得$q = (5, -2, 0, -7)$，$\hat{\mathbf{x}} = (0.857, -0.343, 0, -1.2)$。误差为$(-0.043, -0.043, -0.05, 0)$，MSE 为$(0.00184 + 0.00184 + 0.0025 + 0)/4 = 0.00154$。公式给出$\Delta^2/12 = 0.00245$：四个数里有一个恰好落在格点上（absmax 值总是如此），均匀假设只能提供粗略的指引。
:::
:::

::: widget plot
f: min(max(s*round(x/s), -s*2^(b-1)), s*(2^(b-1)-1)); x
x: -1.5, 1.5
y: -1.5, 1.5
sliders: s=0.15:0.02:0.5:0.01; b=3:2:8:1
labels: quantised value $\hat x$; $x$
caption: 步长$\Delta = s$的对称$b$比特量化器（滑条）。在范围内，$\hat x$是与$x$相差不超过$\Delta/2$的阶梯；在范围外，值被截断到最大电平。固定$b$而缩小$\Delta$会让台阶变细，但范围$[-2^{b-1}\Delta, (2^{b-1}-1)\Delta]$变窄：这就是截断与舍入之间的权衡。
:::

### 粒度：缩放因子放在哪里 {#sec-granularity}

整个权重矩阵共用一个缩放因子（**按张量**）很便宜，但它必须覆盖矩阵中最大的那个元素；于是一个离群值就会让数百万个普通权重的网格变粗。更细的粒度要用更多缩放因子。

::: definition 按张量、按通道与按组缩放因子 {#def-granularity}
对权重矩阵$W\in\mathbb{R}^{d_{\text{out}}\times d_{\text{in}}}$：**按张量**量化只用一个缩放因子；**按通道**给每个输出行一个缩放因子；**按组**（分块）量化把每行分成若干组、每组$g$个连续权重（常取$g = 32$、$64$或$128$），每组一个缩放因子（非对称时还有一个零点）。设缩放因子以$b_s$比特存储，则按组量化的开销是

$$
k + \frac{b_s}{g}\ \text{比特每权重}
$$ {#eq-bits}

（若另有零点，还要再加$b_s/g$）。
:::

::: example 量化模型的显存 {#ex-memory}
一个模型有$70\times10^9$个参数。计算其权重显存：bfloat16、按通道缩放的 int8（开销可忽略）、以及$128$个一组且缩放因子为 16 位的 int4。以合计$3.35$ TB/s 的带宽，由权重读取估算每词元解码时间的下界。
::: solution
bfloat16：$140$ GB，每词元$41.8$ ms。int8：$70$ GB，$20.9$ ms。$g = 128$的 int4：每权重$4 + 16/128 = 4.125$比特，$70\times10^9\cdot4.125/8 = 36.1$ GB，$10.8$ ms。int4 模型能装进一块$80$ GB 的加速器，还剩$44$ GB 给缓存；bfloat16 模型则需要两块。访存受限步的加速比接近字节数的缩减——前提是内核能即时反量化而不至于变成计算受限，这正是低比特内核与格式本身同等重要的原因。
:::
:::

## 仅权重量化 {#sec-weight-only}

最常见的部署只量化权重，压到$8$、$4$或$3$比特（“W4A16”），激活保持 16 位。在矩阵乘法内核里，权重以低精度载入，在片上内存中转换为 16 位，再以 16 位算术相乘。这省的是带宽和显存，不是算术——正是访存受限的解码所需要的。

把每个权重舍入到最近的格点（**就近舍入**，RTN）在$8$比特时效果很好，配小组在$4$比特时也可接受，但在大模型上$3$–$4$比特就会损失明显的精度。原因在于 RTN 最小化的是每个*权重*的误差，而真正要紧的是每层*输出*$WX$的误差，其中$X$是该层的实际输入。乘以大输入或相关输入的权重，其误差更重；而一个权重的误差可以靠调整其余权重部分抵消。

::: definition 逐层量化目标 {#def-layerwise}
给定线性层$W\in\mathbb{R}^{d_{\text{out}}\times d_{\text{in}}}$与校准输入$X\in\mathbb{R}^{d_{\text{in}}\times n}$（该层在代表性文本的$n$个词元上的输入，通常为几百个序列），**逐层训练后量化**在网格上寻找量化权重$\hat W$，使

$$
\lVert WX - \hat WX\rVert_F^2 = \sum_{r=1}^{d_{\text{out}}}(\mathbf{w}_r - \hat{\mathbf{w}}_r)\,H\,(\mathbf{w}_r - \hat{\mathbf{w}}_r)^\top,\qquad H = XX^\top.
$$ {#eq-layerwise}
:::

目标按行分离：每行都是同一矩阵$H$下该行误差的二次型——只差因子$2$便是损失的黑塞矩阵。在网格上精确最小化是整数最小二乘问题，一般是 NP 难的，于是各类方法都是贪心的。

### GPTQ：量化一列，补偿其余 {#sec-gptq}

这一思想可追溯到**最优脑手术**（Hassibi 与 Stork，1993）：从网络中移除权重，再用逆黑塞矩阵调整其余权重作为补偿。Frantar 与 Alistarh 的最优脑量化（2022）把它用于量化，**GPTQ**（Frantar、Ashkboos、Hoefler 与 Alistarh，2023）则把它做得足够快，能用于数千亿参数的模型。

::: proposition 最优补偿 {#prop-obs}
对某一行，在权重的改动$\boldsymbol\delta$下最小化$E(\boldsymbol\delta) = \boldsymbol\delta H\boldsymbol\delta^\top$，约束为坐标$j$被移到某个固定的格点值：$\delta_j = \hat w_j - w_j =: -e_j$。若$H$正定，则最小值点与最小值为

$$
\boldsymbol\delta^* = -\frac{e_j}{[H^{-1}]_{jj}}\,(H^{-1})_{j,:},\qquad E(\boldsymbol\delta^*) = \frac{e_j^2}{[H^{-1}]_{jj}}.
$$ {#eq-obs}

固定坐标$j$后，其余坐标上的同样问题的逆黑塞矩阵为

$$
\big(H_{-j,-j}\big)^{-1} = (H^{-1})_{-j,-j} - \frac{(H^{-1})_{-j,j}\,(H^{-1})_{j,-j}}{[H^{-1}]_{jj}}.
$$ {#eq-schur}
:::

::: proof
最小化$\boldsymbol\delta H\boldsymbol\delta^\top$，约束为$\boldsymbol\delta\mathbf{u}_j = -e_j$，其中$\mathbf{u}_j$是第$j$个单位列向量。拉格朗日函数$\boldsymbol\delta H\boldsymbol\delta^\top - 2\lambda(\boldsymbol\delta\mathbf{u}_j + e_j)$的梯度为$2\boldsymbol\delta H - 2\lambda\mathbf{u}_j^\top = 0$，故$\boldsymbol\delta = \lambda\mathbf{u}_j^\top H^{-1} = \lambda(H^{-1})_{j,:}$。代入约束得$\lambda[H^{-1}]_{jj} = -e_j$，于是得$\boldsymbol\delta^*$。再代入得$E = \lambda^2(H^{-1})_{j,:}H(H^{-1})_{:,j} = \lambda^2[H^{-1}]_{jj} = e_j^2/[H^{-1}]_{jj}$。由于$E$是正定二次型而约束是仿射的，这个驻点就是最小值点。至于第二点：固定$\delta_j$后，目标关于其余坐标是一个以$H_{-j,-j}$为矩阵的二次型，而用整体逆表示主子矩阵之逆的公式（舒尔补恒等式，分块求逆见 [Maths Atlas](/learn/maths/)）就是[[#eq-schur]]。
:::

::: algorithm GPTQ（单层） {#alg-gptq}
1. 由校准输入收集$H = XX^\top$，加上一个小阻尼$\lambda I$（例如对角均值的$1\%$），使其可靠可逆。
2. 固定每行或每组的缩放因子（例如用 absmax）。计算$H^{-1}$。
3. 对$j = 1,\dots,d_{\text{in}}$，**每行都用同一顺序**：把$W$的第$j$列量化到网格；一次性算出所有行的误差$e_j$；对尚未量化的列更新$W_{:,k}\mathrel{-}= \frac{e_j}{[H^{-1}]_{jj}}[H^{-1}]_{jk}$（$k > j$，[[#eq-obs]]）；把$j$从$H^{-1}$中删去（[[#eq-schur]]）。
:::

使这套方法真正可行的是三条工程洞见。其一，Frantar 等发现按固定顺序量化各列，与逐行挑选量化代价最小的列相比几乎不相上下；固定顺序后，所有行共享同一序列的逆黑塞矩阵，整个层只计算一次，而不必逐行计算。其二，更新以$128$列为一块惰性施加，从而化成矩阵–矩阵运算。其三，各步逆黑塞矩阵所需的全部行都可以从$H^{-1}$的一次 Cholesky 分解中读出，而且这在数值上比反复更新更稳定。论文在约四个 GPU 小时内把$1750$亿参数的模型量化到$3$或$4$比特，$4$比特下困惑度只有很小的上升。

清单在一个带相关校准输入的$16\times32$层上做量化：按行$4$比特时，GPTQ 的相对输出误差为$0.0040$，就近舍入为$0.0119$；$3$比特时为$0.0188$对$0.0523$——同一网格上约低三倍。

::: example 手算一步补偿 {#ex-obs}
某行的权重为$\mathbf{w} = (0.4, 0.3)$，$H = \begin{pmatrix}2&1\\1&2\end{pmatrix}$。网格步长为$0.5$，于是第一个权重舍入到$0.5$。第二个权重应变为多少？有无补偿时的输出误差各是多少？
::: solution
$H^{-1} = \frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$，故$[H^{-1}]_{11} = 2/3$，$[H^{-1}]_{12} = -1/3$。第一个权重的误差为$\hat w_1 - w_1 = 0.1$，即$e_1 = -0.1$。由[[#eq-obs]]，$\delta_2 = -\frac{e_1}{2/3}\cdot(-\tfrac13) = -0.05$，故$w_2$变为$0.25$。误差为$e_1^2/[H^{-1}]_{11} = 0.01/(2/3) = 0.015$。不作补偿时$\boldsymbol\delta = (0.1, 0)$，$E = 0.1^2\cdot2 = 0.02$。两个输入正相关（$H_{12} > 0$）意味着把第一个权重向上舍入，可以靠把第二个调低来部分抵消。接下来第二个权重本身也要舍入，舍到$0.5$或$0$；补偿已经改变了它舍入的起点。
:::
:::

### AWQ：保护那些面对大激活的权重 {#sec-awq}

Lin 等（2024）有两点观察。一小部分权重比其他权重要紧得多——即那些*激活*很大的输入通道——在他们的实验中，把约$1\%$的通道保留为 16 位，就能挽回$3$比特 RTN 所失精度的很大一部分。而且这种保护无须混合精度，靠缩放即可实现。

::: proposition 缩放一个通道能减小其相对误差 {#prop-awq}
对带缩放因子$s_j > 0$的输入通道$j$，把该层写成$W\mathbf{x} = \big(W\operatorname{diag}(\mathbf{s})\big)\big(\operatorname{diag}(\mathbf{s})^{-1}\mathbf{x}\big)$，并量化$W\operatorname{diag}(\mathbf{s})$。若包含$w_{rj}s_j$的那一组的量化步长$\Delta$不因缩放而改变，则权重$w_{rj}$对输出误差的贡献缩小为$1/s_j$。
:::

::: proof
量化$w_{rj}s_j$得$w_{rj}s_j + \epsilon$，$\lvert\epsilon\rvert\le\Delta/2$。它乘以$x_j/s_j$，因此它对输出的贡献是$(w_{rj}s_j + \epsilon)x_j/s_j = w_{rj}x_j + \epsilon x_j/s_j$：误差$\epsilon x_j/s_j$，在同样的$\Delta$下是不缩放时误差$\epsilon x_j$的$1/s_j$。
:::

若$s_j$大到使$w_{rj}s_j$成为该组的最大值、从而抬高组内所有其他权重的$\Delta$，假设便不成立。AWQ 用一个参数的搜索在这两种效应之间取得平衡：记$\bar a_j$为通道$j$的激活在校准数据上的平均幅度，取$s_j = \bar a_j^{\,\alpha}$，并在网格上挑选$\alpha\in[0, 1]$使量化层的输出误差最小。激活的缩放$\operatorname{diag}(\mathbf{s})^{-1}$被折叠进前一个运算（归一化层的权重或前一个线性层），因此推理时不花成本。AWQ 不需要二阶信息，也不更新权重，校准集只需很小，作者认为它对校准集的过拟合也更小。清单的$3$比特层中，$\alpha = 0.25$把输出误差从$0.0523$降到$0.0462$，而$\alpha = 1$使它翻倍不止：缩放过头会抬高其余权重的步长。

::: warning “4 比特量化是无损的”
关于调校得当的大模型$4$比特权重量化的公开结果，往往显示困惑度与基准平均分变化很小，但“平均而言很小”不等于“没有”。损失往往在更小的模型上、在$3$比特及以下更大——而且在若干已发表的评测中——在长上下文检索、多语言文本、代码与多步推理上，也比平均分所显示的要大。通用网络文本上的困惑度是一个无力的代理。要在模型将要承担的任务上、以 16 位模型为对照评测量化模型，并且样本要足够多，能检测出你在意的差异（[[evaluation/evaluation-statistics]]）。
:::

## 量化激活：离群值 {#sec-outliers}

要用上 8 比特整数算术——而不仅是 8 比特存储——激活也必须量化（“W8A8”）。激活比权重更难对付：它们随输入而变，所以缩放因子要么即时计算、要么从校准中固定下来；而在大型 Transformer 中，激活含有**离群特征**。

Dettmers 等（2022）发现，在他们研究的模型中，少数隐藏维度在大多数词元、大多数层上取值远大于其余维度——量级可达约$20$倍——并且这些特征随模型增大而相当突然地出现，在他们的研究中大约在$67$亿参数处。按张量量化激活时，几乎整个网格都被离群值浪费掉，其余特征被舍入到寥寥几级。他们的**LLM.int8()**方法按行（词元）量化激活、按列量化权重，并单独处理离群维度（激活幅度超过阈值$6$者）：$X$的那几列与$W$的那几行以 16 位相乘，其余一切以 int8 相乘。借助这一分解，他们报告直到$1750$亿参数，困惑度与零样本准确率均无退化，代价是一个更慢的混合精度内核。

**SmoothQuant**（Xiao 等，2023）不是把难点隔离，而是把它搬走。

::: proposition 平滑是精确的 {#prop-smooth}
对任意正向量$\mathbf{s}\in\mathbb{R}^{d}$，$XW = \big(X\operatorname{diag}(\mathbf{s})^{-1}\big)\big(\operatorname{diag}(\mathbf{s})W\big)$，其中$X$为$(T, d)$、$W$为$(d, d_{\text{out}})$。取

$$
s_j = \frac{\max_t\lvert X_{tj}\rvert^{\alpha}}{\max_k\lvert W_{jk}\rvert^{1 - \alpha}},
$$ {#eq-smooth}

平滑后激活的第$j$个通道与平滑后权重的第$j$行的最大值分别为$\max\lvert X_{:j}\rvert^{1-\alpha}\max\lvert W_{j:}\rvert^{1-\alpha}$与$\max\lvert X_{:j}\rvert^{\alpha}\max\lvert W_{j:}\rvert^{\alpha}$；$\alpha = \tfrac12$时两者都等于$\sqrt{\max\lvert X_{:j}\rvert\max\lvert W_{j:}\rvert}$。
:::

::: proof
$\operatorname{diag}(\mathbf{s})^{-1}\operatorname{diag}(\mathbf{s}) = I$，所以精确算术下乘积不变。把$X$的第$j$列除以$s_j$，最大值为$\max\lvert X_{:j}\rvert/s_j = \max\lvert X_{:j}\rvert^{1-\alpha}\max\lvert W_{j:}\rvert^{1-\alpha}$；把$W$的第$j$行乘上$s_j$，得$\max\lvert W_{j:}\rvert\,s_j = \max\lvert X_{:j}\rvert^{\alpha}\max\lvert W_{j:}\rvert^{\alpha}$。$\alpha = \tfrac12$时两者都是几何平均。
:::

把$X$的离群通道除下来，把对应的$W$的行乘上去——这些行没有离群值、本来容易量化——直到两侧都变得不太好量化。与 AWQ 的缩放一样，$\operatorname{diag}(\mathbf{s})^{-1}$离线折叠进前一层。Xiao 等对多数模型取$\alpha$在$0.5$附近，报告直到$5300$亿参数的模型上 W8A8 的精度与 16 位持平，并从 int8 矩阵乘法获得实实在在的加速。清单里，一个含有两个比其他通道大$40$倍的激活通道的$64\times64$层，在按张量缩放激活的 W8A8 下相对输出误差为$1.6\times10^{-3}$，经$\alpha = 0.5$平滑后为$8.3\times10^{-5}$——小了二十倍。

::: example 选择平滑因子 {#ex-smooth}
某激活通道在校准词元上的最大幅度为$64$，权重矩阵中对应一行的最大值为$0.25$。计算$\alpha = 0.5$时的$s_j$与新的最大值。采用按张量缩放时，若这是最大的通道、而次大通道的最大值为$4$，激活的 int8 步长会怎样？
::: solution
$s_j = 64^{0.5}/0.25^{0.5} = 8/0.5 = 16$。该激活通道的最大值变为$64/16 = 4$，权重行的最大值变为$0.25\cdot16 = 4$。若次大的激活通道最大值为$4$，按张量的激活最大值就从$64$降到$4$（假定其他通道的平滑不会把它抬高），于是 int8 步长$\max/127$缩小$16$倍，从$0.50$降到$0.031$：每个普通激活的表示都精细$16$倍。权重行的范围变大了，但权重按输出通道量化，本来余量充足。
:::
:::

::: quiz
一个模型被量化为 W4A16（4 比特权重、16 位激活）。服务它时应当预期哪些效果？（多选。）
- [x] 权重占用显存更少，给 KV缓存腾出更多空间
- [x] 若内核高效地反量化，访存受限的解码步更快
- [ ] 每词元的浮点运算更少
- [ ] 每词元的 KV缓存更小
::: solution
仅权重量化缩小权重的字节数，从而腾出显存、缩短访存受限的每一步。算术仍在 16 位上对反量化后的权重进行，FLOPs 不变（计算受限的预填充几乎不获益）。缓存由 16 位激活产生，除非单独量化它，否则不受影响。
:::
:::

## 量化缓存 {#sec-kv-quant}

在长上下文与大批量下，KV缓存可以主导显存与带宽（[[inference/kv-cache#prop-batch-kv]]），把它的字节减半，两者便同时减半。截至 2026 年，整数或浮点的 8 比特缓存已被各服务引擎广泛支持，通常几乎不损失精度。要继续压到$4$或$2$比特，就必须照顾缓存的结构。键和激活一样有离群*通道*——少数几个维度在每个词元上都很大——值则没有。因此 KIVI（Liu 等，2024）把键**按通道**量化（每个维度一个缩放因子，跨一组词元）、值**按词元**量化，最近的词元在组凑满之前保留全精度，并报告在其评测的模型与任务上$2$比特缓存只有很小的精度损失；KVQuant（Hooper 等，2024）除了别的改进之外，还增加了在施加 RoPE 之前量化键。这些都是研究结果，其在各类模型与任务上的稳健性仍待确证。

键按通道量化的原因很容易检验：设两个离群通道比其余通道大$15$倍，键的$4$比特按词元量化在*普通通道上*给出$0.43$的相对误差（每个词元的缩放因子被它的离群值决定），而按通道缩放只有$0.016$（[[#exr-kv]]）。

## 低比特浮点格式 {#sec-fp8}

整数的电平均匀分布。浮点格式则让它们几何分布：固定的尾数位数在很宽的取值范围内给出大致恒定的*相对*精度。对含大量小数值的钟形数据，这往往是更划算的交换。

::: definition FP8、FP4 与微缩放格式 {#def-fp8}
- **E4M3**与**E5M2**（Micikevicius 等，2022）是 8 比特浮点格式，分别有$4$个指数位、$3$个尾数位，或$5$个、$2$个。E4M3 的指数偏置为$7$，最大到$\pm448$，不含无穷；E5M2 遵循 IEEE 约定，最大到$\pm57{,}344$。训练中通常用 E4M3 存权重与激活、用 E5M2 存梯度。
- **E2M1**是 4 比特浮点格式，其非负取值为$0, 0.5, 1, 1.5, 2, 3, 4, 6$。
- **微缩放**（MX）格式（开放计算项目规范，2023）把$32$个低比特元素（FP8、FP6、FP4 或 INT8）作为一块，整块共享一个 8 位的 2 的幂次缩放因子；**MXFP4**的元素为 E2M1。2025 年公布的厂商变体 NVFP4 以$16$个 E2M1 元素为一块，每块一个 E4M3 缩放因子，每个张量另有一个 32 位缩放因子。
:::

硬件支持才让一种格式在速度上有用、而不只是省存储。截至 2026 年，2022 年起推出的数据中心 GPU（例如 NVIDIA 的 H100 与 AMD 的 MI300 系列）支持 FP8 矩阵乘法，2024–2025 年起推出的代际支持 4 比特浮点算术；int8 整数算术更早、也更普及。即便没有配套算术，存储格式仍可借内核中的反量化省显存和带宽——仅权重 int4 便是如此。

::: widget floatline
p: 4
emin: -2
emax: 3
value: 1.3
caption: 一个有$4$位有效位的玩具浮点系统（E4M3 存储的$3$个尾数位加上隐含的前导$1$），只画出指数$-2$到$3$。间隔每过一个 2 的幂便加倍：相对精度大致恒定（约$2^{-4}$，即在$1$处为间隔$2^{-3}$的一半），而整数网格的绝对间隔是常数。真正的 E4M3 指数覆盖$-6$到$8$，另有非规格化数。
:::

清单中，从标准正态分布抽取、并缩放到其最大值恰好映到格式最大值的数据，整体 MSE 在 int8 下（$9.8\times10^{-5}$）低于 E4M3（$6.9\times10^{-4}$）：int8 把$256$个电平均匀铺在取值所在的范围上，而 E4M3 把许多码字花在了远小于几乎所有数据取值的量级上；但对幅度小于$0.1$的值，平均相对误差 int8 为$33\%$、E4M3 只有$2.3\%$。哪个更要紧，取决于小数值是否要紧——而对偶有大值的激活（否则会被迫用粗糙的整数网格），浮点往往更宽容。

## 实现 {#sec-code}

清单用纯 Python 实现均匀量化器和本章各方法：检验$\Delta^2/12$；在一个行尺度不均、偶有大权重的权重矩阵上比较四种粒度；GPTQ 对就近舍入；AWQ 风格的缩放指数搜索；有无 SmoothQuant 的 W8A8；以及 E4M3 的模拟。

```python
import math, random
rng = random.Random(0)

def quantise(x, bits, scale, zero=0):       # 均匀仿射：q = clamp(round(x/scale)+zero)，x^ = scale*(q-zero)
    lo, hi = -(2 ** (bits - 1)) if zero == 0 else 0, (2 ** (bits - 1) - 1) if zero == 0 else 2 ** bits - 1
    q = max(lo, min(hi, round(x / scale) + zero))
    return scale * (q - zero)
def absmax_scale(xs, bits): return max(abs(x) for x in xs) / (2 ** (bits - 1) - 1)
def mse(a, b): return sum((x - y) ** 2 for x, y in zip(a, b)) / len(a)

# (1) 细网格的舍入误差是均匀的：MSE = scale^2 / 12
xs = [rng.uniform(-1, 1) for _ in range(100000)]
s = absmax_scale(xs, 8)
print(f"int8 per-tensor: MSE {mse(xs, [quantise(x, 8, s) for x in xs]):.3e}, scale^2/12 {s * s / 12:.3e}")

# (2) 粒度：一个 64x256 的权重矩阵，各行尺度不同，另加少量离群值
W = [[rng.gauss(0, 0.02 * (1 + 3 * (r % 4 == 0))) for _ in range(256)] for r in range(64)]
for _ in range(8): W[rng.randrange(64)][rng.randrange(256)] = 0.5      # 偶有大权重
flat = [w for row in W for w in row]
def q_tensor(W, bits):
    s = absmax_scale(flat, bits); return [[quantise(w, bits, s) for w in row] for row in W]
def q_channel(W, bits):
    return [[quantise(w, bits, absmax_scale(row, bits)) for w in row] for row in W]
def q_group(W, bits, g):
    out = []
    for row in W:
        r = []
        for i in range(0, len(row), g):
            s = absmax_scale(row[i:i + g], bits); r += [quantise(w, bits, s) for w in row[i:i + g]]
        out.append(r)
    return out
for name, Q in [("per-tensor", q_tensor(W, 4)), ("per-channel", q_channel(W, 4)),
                ("group 128", q_group(W, 4, 128)), ("group 32", q_group(W, 4, 32))]:
    e = mse(flat, [w for row in Q for w in row])
    print(f"int4 {name:11s}: weight MSE {e:.3e}  (relative {e / mse(flat, [0] * len(flat)):.4f})")

# (3) 单层上 GPTQ 对就近舍入，校准输入相关
d_in, d_out, n = 32, 16, 512
A = [[rng.gauss(0, 1) for _ in range(d_in)] for _ in range(d_in)]
Z = [[rng.gauss(0, 1) for _ in range(n)] for _ in range(d_in)]
X = [[sum(A[i][k] * Z[k][c] for k in range(d_in)) * (4 if i < 2 else 1) for c in range(n)]
     for i in range(d_in)]                                           # (d_in, n)：相关特征
Wl = [[rng.gauss(0, 1) for _ in range(d_in)] for _ in range(d_out)]  # (d_out, d_in)
def matmul(A, B): return [[sum(a * b for a, b in zip(r, c)) for c in zip(*B)] for r in A]
def inverse(M):                                                       # 高斯-约当消元
    m = len(M); A = [row[:] + [float(i == j) for j in range(m)] for i, row in enumerate(M)]
    for c in range(m):
        p = max(range(c, m), key=lambda r: abs(A[r][c])); A[c], A[p] = A[p], A[c]
        piv = A[c][c]; A[c] = [v / piv for v in A[c]]
        for r in range(m):
            if r != c and A[r][c] != 0:
                f = A[r][c]; A[r] = [a - f * b for a, b in zip(A[r], A[c])]
    return [row[m:] for row in A]
H = matmul(X, list(map(list, zip(*X))))                                # X X^T, (d_in, d_in)
damp = 0.01 * sum(H[i][i] for i in range(d_in)) / d_in
Hinv0 = inverse([[H[i][j] + damp * (i == j) for j in range(d_in)] for i in range(d_in)])
def gptq_row(w, bits):
    s = absmax_scale(w, bits); w = w[:]; Hi = [r[:] for r in Hinv0]; q = [0.0] * len(w)
    for j in range(len(w)):
        q[j] = quantise(w[j], bits, s)
        err = (w[j] - q[j]) / Hi[j][j]
        for k in range(j + 1, len(w)): w[k] -= err * Hi[j][k]          # 补偿其余权重
        hj = Hi[j][:]                                                  # 从 H^-1 中删去坐标 j
        Hi = [[Hi[a][b] - Hi[a][j] * hj[b] / hj[j] for b in range(len(w))] for a in range(len(w))]
    return q
def out_err(Wq):
    Y, Yq = matmul(Wl, X), matmul(Wq, X)
    return sum((a - b) ** 2 for r1, r2 in zip(Y, Yq) for a, b in zip(r1, r2)) / sum(a * a for r in Y for a in r)
for bits in (4, 3):
    rtn = [[quantise(w, bits, absmax_scale(row, bits)) for w in row] for row in Wl]
    gq = [gptq_row(row, bits) for row in Wl]
    print(f"{bits}-bit per-row: relative output error RTN {out_err(rtn):.4f}, GPTQ {out_err(gq):.4f}")

# (4) AWQ 风格的缩放：保护激活大的输入通道，搜索指数
act = [sum(abs(v) for v in X[i]) / n for i in range(d_in)]           # 每个输入通道的平均 |x|
for alpha in (0.0, 0.25, 0.5, 0.75, 1.0):
    sc = [a ** alpha for a in act]
    Ws = [[w * sc[j] for j, w in enumerate(row)] for row in Wl]        # W diag(s)
    Qs = [[quantise(w, 3, absmax_scale(row, 3)) / sc[j] for j, w in enumerate(row)] for row in Ws]
    print(f"AWQ alpha={alpha:.2f}: 3-bit relative output error {out_err(Qs):.4f}")

# (5) 激活离群值：激活按张量的 W8A8，有无 SmoothQuant 对比
T, d = 64, 64
Xa = [[rng.gauss(0, 1) * (40 if j in (3, 17) else 1) for j in range(d)] for _ in range(T)]   # (T, d)
Wa = [[rng.gauss(0, 0.1) for _ in range(d)] for _ in range(d)]                              # (d_in, d_out)
def w8a8(X, W):
    sx = absmax_scale([v for r in X for v in r], 8)
    Xq = [[quantise(v, 8, sx) for v in r] for r in X]
    Wq = [[quantise(W[i][j], 8, absmax_scale([W[k][j] for k in range(len(W))], 8))
           for j in range(len(W[0]))] for i in range(len(W))]          # 按输出通道
    return matmul(Xq, Wq)
Y = matmul(Xa, Wa)
def rel(Yq): return sum((a - b) ** 2 for r1, r2 in zip(Y, Yq) for a, b in zip(r1, r2)) / sum(a * a for r in Y for a in r)
mx = [max(abs(Xa[t][j]) for t in range(T)) for j in range(d)]     # 按输入通道
mw = [max(abs(v) for v in Wa[j]) for j in range(d)]
for alpha in (None, 0.5, 0.8):
    s = [1.0] * d if alpha is None else [mx[j] ** alpha / mw[j] ** (1 - alpha) for j in range(d)]
    Xs = [[Xa[t][j] / s[j] for j in range(d)] for t in range(T)]       # X diag(s)^-1
    Ws = [[Wa[j][k] * s[j] for k in range(d)] for j in range(d)]       # diag(s) W
    print(f"W8A8 smoothing alpha={alpha}: relative output error {rel(w8a8(Xs, Ws)):.2e}")

# (6) 钟形数据上 fp8 E4M3 对 int8：相对误差对绝对误差
def e4m3(x):
    if x == 0: return 0.0
    e = max(math.floor(math.log2(abs(x))), -6)                         # 2^-6 以下为非规格化数
    step = 2.0 ** (e - 3)                                              # 3 个尾数位
    return max(-448.0, min(448.0, round(x / step) * step))
g = [rng.gauss(0, 1) for _ in range(50000)]
s8 = absmax_scale(g, 8); s_fp = max(abs(v) for v in g) / 448
for name, f in [("int8 absmax", lambda v: quantise(v, 8, s8)), ("fp8 e4m3", lambda v: s_fp * e4m3(v / s_fp))]:
    small = [v for v in g if abs(v) < 0.1]
    print(f"{name:11s}: MSE {mse(g, [f(v) for v in g]):.2e}, "
          f"mean relative error on |x|<0.1: {sum(abs(f(v) - v) / abs(v) for v in small) / len(small):.3f}")
```

Output:

```
int8 per-tensor: MSE 5.173e-06, scale^2/12 5.166e-06
int4 per-tensor : weight MSE 3.458e-04  (relative 0.1690)
int4 per-channel: weight MSE 7.138e-05  (relative 0.0349)
int4 group 128  : weight MSE 4.698e-05  (relative 0.0230)
int4 group 32   : weight MSE 2.374e-05  (relative 0.0116)
4-bit per-row: relative output error RTN 0.0119, GPTQ 0.0040
3-bit per-row: relative output error RTN 0.0523, GPTQ 0.0188
AWQ alpha=0.00: 3-bit relative output error 0.0523
AWQ alpha=0.25: 3-bit relative output error 0.0462
AWQ alpha=0.50: 3-bit relative output error 0.0527
AWQ alpha=0.75: 3-bit relative output error 0.0702
AWQ alpha=1.00: 3-bit relative output error 0.1157
W8A8 smoothing alpha=None: relative output error 1.63e-03
W8A8 smoothing alpha=0.5: relative output error 8.25e-05
W8A8 smoothing alpha=0.8: relative output error 1.06e-04
int8 absmax: MSE 9.83e-05, mean relative error on |x|<0.1: 0.333
fp8 e4m3   : MSE 6.89e-04, mean relative error on |x|<0.1: 0.023
```

整个矩阵共用一个缩放因子时，八个$0.5$的权重定下$4$比特步长$0.071$，比大多数权重还大，大多数权重于是被舍成零：相对误差$17\%$。按通道缩放把它削减五倍，$32$个一组再削减约三倍，代价是 16 位缩放因子摊到每权重$0.5$比特。同一网格上 GPTQ 比就近舍入好约三倍；AWQ 搜索在小$\alpha$处找到有限的增益，也显示出过头的缩放坏得有多快（$\alpha = 0$ 即就近舍入）。实际方法在整个模型上逐层施加，把它前面那些已量化层的输出喂给每一层，并以模型的精度而非单层误差来评判。

::: application 量化的实践
截至 2026 年，开放权重模型普遍以量化形式分发：数据中心服务用 8 比特与 FP8，单加速器服务用 4 比特仅权重（GPTQ、AWQ 及相关方法），而 llama.cpp（自 2023 年）用一族 2–8 比特的混合分块格式在笔记本和手机上运行模型。量化还让在小硬件上微调大模型成为可能：QLoRA（Dettmers 等，2023）冻结一个 4 比特基座模型——其格式（NF4）的电平取自正态分布的分位数——并在其之上训练低秩适配（[[post-training/parameter-efficient-tuning]]）。
:::

::: history
量化与数字信号处理同龄：Bennett（1948）导出了细均匀量化器的$\Delta^2/12$噪声，Lloyd（1957 年完成、1982 年发表）与 Max（1960）导出了最优非均匀量化器。在深度学习中，Jacob 等（2018）给出纯整数算术与仿射量化之后，卷积网络的 8 比特推理成为标准。LeCun、Denker 与 Solla（1990）以及 Hassibi 与 Stork（1993）用二阶信息剪枝网络，这正是 GPTQ 背后的思想（Frantar、Ashkboos、Hoefler 与 Alistarh，ICLR 2023）。Dettmers、Lewis、Belkada 与 Zettlemoyer 描述了离群特征与 LLM.int8()（NeurIPS 2022）；Xiao、Lin、Seznec、Wu、Demouth 与 Han 提出 SmoothQuant（ICML 2023）；Lin 等提出 AWQ（MLSys 2024）。来自 NVIDIA、Arm 与 Intel 的 Micikevicius 等在 2022 年提出 FP8 格式，开放计算项目在 2023 年发布了微缩放规范。
:::

::: summary
- $k$比特**均匀量化器**把值舍入到步长为$\Delta$的网格、超出范围者截断；细网格舍入的 MSE 为$\Delta^2/12$，每多一位约增益$6$ dB。
- **粒度**以开销换精度：按张量缩放被离群值毁掉；按通道与按组缩放（$g = 32$–$128$）每权重只花几分之一的比特。
- **仅权重**量化为访存受限的解码省带宽。**GPTQ**逐列最小化层的输出误差$\lVert WX - \hat WX\rVert_F^2$，用逆黑塞矩阵补偿；**AWQ**在舍入之前把激活大的输入通道乘大。
- **激活**量化必须处理**离群特征**：LLM.int8()把它们拆出来用 16 位计算；**SmoothQuant**用一个精确的重新缩放把它们的尺度搬进权重。
- **KV缓存**量化到 8 比特已是常规操作；更低的位宽需要键按通道、值按词元。
- 配分块缩放的**FP8**（E4M3、E5M2）与**FP4**给出大致恒定的相对精度；其提速的好处取决于硬件支持。量化模型务必在真实任务上评测。
:::

## 习题

::: exercise int8 网格的噪声 {level=1 check="2.083e-6"}
某权重张量的最大幅度为$0.635$，用 absmax 缩放量化为对称 int8（电平到$127$）。预测的均方舍入误差是多少？保留四位有效数字。
::: solution
$\Delta = 0.635/127 = 0.005$，$\Delta^2/12 = 2.5\times10^{-5}/12 = 2.083\times10^{-6}$。
:::
:::

::: exercise 每权重的比特数 {level=1 check="4.5"}
权重以非对称方式按$64$个一组量化到$4$比特，每组一个 16 位缩放因子与一个 16 位零点。每权重合多少比特？
::: solution
每权重$4 + (16 + 16)/64 = 4.5$比特。
:::
:::

::: exercise 量化模型的体积 {level=1 check="36.09"}
一个含$70\times10^9$参数的模型以每权重$4.125$比特存储。合多少 GB（$10^9$字节）？保留两位小数。
::: solution
$70\times10^9\cdot4.125/8 = 3.609\times10^{10}$字节$= 36.09$ GB。
:::
:::

::: exercise 一个小向量的 MSE {level=2 check="1.543e-3"}
对[[#ex-int4]]，精确计算均方误差，保留四位有效数字。
::: solution
误差：$0.9 - 6/7 = 0.042857$，$-0.3 + 2.4/7 = 0.042857$，$0.05$，$0$。平方：$0.0018367$、$0.0018367$、$0.0025$、$0$；和为$0.0061735$；均值$1.543\times10^{-3}$。
:::
:::

::: exercise 二维的补偿 {level=2 check="0.25"}
在[[#ex-obs]]中，不用公式、直接最小化，验证：固定$\hat w_1 = 0.5$时，使$(\boldsymbol\delta)H(\boldsymbol\delta)^\top$最小的$w_2$为$0.25$。
::: solution
取$\delta_1 = 0.1$、$\delta_2 = w_2 - 0.3$：$E = 2\delta_1^2 + 2\delta_1\delta_2 + 2\delta_2^2$。令$\partial E/\partial\delta_2 = 2\delta_1 + 4\delta_2 = 0$得$\delta_2 = -\delta_1/2 = -0.05$，故$w_2 = 0.25$，且$E = 0.02 - 0.01 + 0.005 = 0.015$，与公式的预言一致。
:::
:::

::: exercise 一个平滑因子 {level=2 check="16"}
用[[#eq-smooth]]取$\alpha = 0.5$，对最大值为$64$的激活通道与最大值为$0.25$的权重行，求$s_j$。
::: solution
$s_j = \sqrt{64}/\sqrt{0.25} = 8/0.5 = 16$；两个最大值都变为$4$（[[#ex-smooth]]）。
:::
:::

::: exercise E4M3 的最大数 {level=2 check="448"}
E4M3 的指数偏置为$7$；指数字段全 1 用于普通数，除非尾数同样全 1——那表示 NaN。最大的有限值是多少？
::: solution
最大的指数字段为$15$，得$2^{15 - 7} = 2^8 = 256$。指数字段为$15$时尾数$111$是 NaN，故最大尾数为$110$，有效位为$1 + \tfrac12 + \tfrac14 = 1.75$。最大值为$1.75\cdot256 = 448$。（E5M2 保留 IEEE 的无穷，故其最大有限值为$1.75\cdot2^{15} = 57{,}344$。）
:::
:::

::: exercise 每比特的信噪比 {level=2}
一信号服从标准差为$\sigma$的正态分布，在范围$[-4\sigma, 4\sigma]$上均匀量化（忽略截断）。用$\Delta^2/12$计算$4$比特与$8$比特时的 SQNR（分贝），并解释为什么它低于$6.02k$ dB。
::: solution
$\Delta = 8\sigma/2^k$，故噪声为$64\sigma^2/(12\cdot2^{2k})$，SQNR $= 12\cdot2^{2k}/64 = 0.1875\cdot2^{2k}$。化为分贝即$6.02k - 7.27$：$4$比特时$16.8$ dB，$8$比特时$40.9$ dB。$6.02k$规则假定信号均匀充满整个范围；正态分布集中于零附近，很少用到外层电平，故其功率（$\sigma^2$）相对范围偏小（$[-4\sigma, 4\sigma]$上的均匀分布为$A^2/3 = 5.33\sigma^2$），于是付出$10\log_{10}5.33 = 7.27$ dB的代价。
:::
:::

::: exercise 最佳的截断范围 {level=3}
对标准正态数据与电平为$-7,\dots,7$的对称$4$比特网格，用模拟（纯 Python、固定种子、$200{,}000$个样本）找出使总 MSE 最小的截断值$c$（在$1$到$5$之间、以$0.05\sigma$为步长），并与 absmax 的取法比较。
::: solution
```python
import random
rng = random.Random(0)
xs = [rng.gauss(0, 1) for _ in range(200000)]
def mse_clip(c, bits=4):
    s = c / (2 ** (bits - 1) - 1)
    return sum((x - s * max(-(2 ** (bits - 1) - 1), min(2 ** (bits - 1) - 1, round(x / s)))) ** 2 for x in xs) / len(xs)
best = min((mse_clip(c / 20), c / 20) for c in range(20, 101))
print(f"absmax clip {max(map(abs, xs)):.2f}: MSE {mse_clip(max(map(abs, xs))):.4f}")
print(f"best clip {best[1]:.2f} sigma: MSE {best[0]:.4f}")
```

Output:

```
absmax clip 4.53: MSE 0.0351
best clip 2.45 sigma: MSE 0.0128
```

在约$2.45\sigma$处截断，MSE 比 absmax 的$4.53\sigma$低$2.7$倍：偶尔被截断的少数值付出的代价，小于粗网格向每个值收取的代价。位数增多时最优点向外移动（网格的代价每多一位降为四分之一，截断的代价却不降），这就是$8$比特时 absmax 尚可、$4$比特时不佳的原因。absmax 还有一个毛病：它的范围取决于单个最大的样本，因而随样本量增大而增长。
:::
:::

::: exercise 键按通道量化 {#exr-kv level=3}
从标准正态分布生成$256$个维数$64$的“键”，其中通道$5$与$40$乘以$15$。把它们量化到$4$比特（电平$-7,\dots,7$，absmax），分别取每词元一个缩放因子与每通道一个缩放因子，报告整体以及在$62$个普通通道上的相对误差。解释这一结果，以及值为什么通常按词元量化。
::: solution
```python
import random
rng = random.Random(1)
T, d = 256, 64
# 键带两个离群通道（在每个词元上都大），值没有
K = [[rng.gauss(0, 1) * (15 if j in (5, 40) else 1) for j in range(d)] for _ in range(T)]
def q(x, s, bits=4):
    m = 2 ** (bits - 1) - 1
    return s * max(-m, min(m, round(x / s)))
def per_token(M):    # 每行（词元）一个缩放因子
    return [[q(v, max(map(abs, r)) / 7) for v in r] for r in M]
def per_channel(M):  # 每列（通道）一个缩放因子
    cols = list(zip(*M)); sc = [max(map(abs, c)) / 7 for c in cols]
    return [[q(v, sc[j]) for j, v in enumerate(r)] for r in M]
def rel(A, B): return sum((a - b) ** 2 for r1, r2 in zip(A, B) for a, b in zip(r1, r2)) / sum(a * a for r in A for a in r)
def rel_small(A, B):   # 只统计普通（非离群）通道上的误差
    num = sum((A[t][j] - B[t][j]) ** 2 for t in range(T) for j in range(d) if j not in (5, 40))
    den = sum(A[t][j] ** 2 for t in range(T) for j in range(d) if j not in (5, 40))
    return num / den
for name, f in [("per-token", per_token), ("per-channel", per_channel)]:
    Kq = f(K)
    print(f"4-bit keys {name:11s}: relative error {rel(K, Kq):.4f}, on ordinary channels {rel_small(K, Kq):.4f}")
```

Output:

```
4-bit keys per-token  : relative error 0.0574, on ordinary channels 0.4291
4-bit keys per-channel: relative error 0.0132, on ordinary channels 0.0156
```

按词元时，每个词元的缩放因子都被它的离群通道决定（大约大$15$倍），于是普通通道——注意力模式的大部分细节由它们决定——分到一个与自身量级相当的步长，其能量的$43\%$损失于误差；整体数字被离群通道的能量主导，把这一点掩盖了。按通道时，每个通道得到与自己匹配的缩放因子。值没有固定的离群通道，而每个输出是值向量按词元的加权和，所以按词元的缩放（可在每个词元到达时随手算出）很适合它；键按通道缩放则要先攒齐一组词元，这正是 KIVI 把最近的词元保留全精度的原因。
:::
:::
