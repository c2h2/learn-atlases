循环网络一次处理序列的一步，这让它在并行硬件上训练缓慢；而它的非线性状态更新又使长程学习变得困难（[[sequence-models/long-range-dependencies]]）。注意力避免了这两个问题，代价是开销随上下文长度按二次增长，而且它需要的一种记忆——键值缓存（KV缓存）——在生成期间按线性增长（[[transformers/attention-complexity]]）。这一章讲另外两个系列的序列模型，它们都力求兼得注意力的训练并行性与循环网络的常数大小状态。

**时间卷积网络**（TCN）使用因果卷积，配以指数增长的空洞率层层叠加，使寥寥几层就能回看几千步。**线性递归**与**状态空间模型**（SSM）则去掉了递推中的非线性。仅此一改，递推就等价于一次卷积——本章的中心定理——于是既能并行训练，又能在生成时当作 RNN 来运行。S4 使这类模型能够在极长的序列上训练；**Mamba** 让参数依赖于输入，恢复了时不变模型所缺的基于内容的选择；线性注意力、RWKV 及相关模型原来也是同一家族的成员。我们用纯 Python 实现这一对偶、一次并行扫描与一条选择性递推，最后谈谈截至 2026 年，关于这些模型与 Transformer 的比较哪些已知、哪些未知。

## 时间卷积 {#sec-tcn}

一维卷积（[[neural-networks/convolutional-networks#def-conv]]）把一个含 $k$ 个抽头的核沿序列滑动。用于序列建模时它必须是**因果的**：第 $t$ 步的输出只能依赖不晚于 $t$ 的输入，这样它才能充当语言模型。

::: definition 因果空洞卷积 {#def-causal-conv}
核大小为 $k$、**空洞率**为 $d$ 的**因果卷积**把序列 $\mathbf{x}_1, \dots, \mathbf{x}_T\in\R^{c}$ 映射为

$$
\mathbf{y}_t = \sum_{i=0}^{k-1}W_i\,\mathbf{x}_{t - d\,i} + \mathbf{b},
$$

其中 $W_i\in\R^{c'\times c}$，且对 $s\le0$ 取 $\mathbf{x}_s = \mathbf{0}$（左侧补零）。**时间卷积网络**（TCN）把这样的层与非线性、残差连接一起堆叠，空洞率通常取 $1, 2, 4, \dots, 2^{L-1}$。
:::

::: proposition 空洞堆叠的感受野 {#prop-receptive}
$L$ 层核大小为 $k$、空洞率为 $d_1, \dots, d_L$ 的因果卷积堆叠，其感受野为 $1 + (k - 1)\sum_{\ell=1}^Ld_\ell$ 个时间步。取 $d_\ell = 2^{\ell-1}$ 时它是 $1 + (k - 1)(2^L - 1)$，随深度指数增长；不用空洞（$d_\ell = 1$）时它是 $1 + (k - 1)L$，随深度线性增长。
:::

::: proof
对 $L$ 归纳。一层空洞率为 $d_1$ 的卷积读取 $\mathbf{x}_{t-d_1(k-1)}, \dots, \mathbf{x}_t$，跨度为 $1 + (k - 1)d_1$ 步。若前 $L - 1$ 层在第 $s$ 步的输出依赖于 $s - R_{L-1} + 1, \dots, s$ 各时刻的输入，那么第 $L$ 层组合第 $t, t - d_L, \dots, t - (k - 1)d_L$ 步的这些输出，于是它的输出依赖从 $t - (k - 1)d_L - R_{L-1} + 1$ 到 $t$ 的输入，跨度 $R_L = R_{L-1} + (k - 1)d_L$。展开即得 $R_L = 1 + (k - 1)\sum_\ell d_\ell$，并用 $\sum_{\ell=1}^L2^{\ell-1} = 2^L - 1$。
:::

::: widget graph
nodes: x1@0,0; x2@1,0; x3@2,0; x4@3,0; x5@4,0; x6@5,0; x7@6,0; x8@7,0; a2@1,1; a4@3,1; a6@5,1; a8@7,1; b4@3,2; b8@7,2; c8@7,3
edges: c8>b8; c8>b4; b8>a8; b8>a6; b4>a4; b4>a2; a8>x8; a8>x7; a6>x6; a6>x5; a4>x4; a4>x3; a2>x2; a2>x1
algorithm: bfs
start: c8
caption: 三层核大小为 $2$、空洞率为 $1$、$2$、$4$ 的因果卷积堆叠中，单个输出 $c_8$ 的依赖关系（层 $a$、$b$、$c$；只画出 $c_8$ 依赖的那些单元，箭头从一个单元指向它读取的输入）。从 $c_8$ 出发宽度优先搜索，在第 $3$ 层到达全部八个输入：感受野为 $1 + (2 - 1)(2^3 - 1) = 8$，正如 [[#prop-receptive]] 所说。若不用空洞，三层只能回看到四个输入。
:::

**WaveNet**（van den Oord et al., 2016）就用这种方式生成原始音频——每秒 $16{,}000$ 个采样，每个采样由一个在 $256$ 个量化幅度等级上的 softmax 预测——把十层空洞率 $1, 2, \dots, 512$ 的模块重复堆叠若干次，使用门控激活 $\tanh(W_f * \mathbf{x})\odot\sigma(W_g * \mathbf{x})$（相当于卷积里的 LSTM 式门），并带残差连接和跳跃连接。在文本方面，ByteNet（Kalchbrenner et al., 2016）和 Gehring 等人（2017）的卷积序列到序列模型把空洞或堆叠卷积用于翻译；Bai、Kolter 和 Koltun（2018）发现，一个通用的 TCN 在一大片序列建模基准上追平或超过了规模相当的 LSTM 与 GRU，且有效记忆更长。

::: example WaveNet 的感受野 {#ex-wavenet}
一个十层、核大小 $2$、空洞率 $1, 2, \dots, 512$ 的模块重复三次。以采样数计、以及在 $16$ kHz 下以毫秒计，感受野是多大？
::: solution
一个模块：$1 + (2 - 1)(1 + 2 + \dots + 512) = 1 + 1{,}023 = 1{,}024$ 个采样。三个模块在最初的 $1$ 之上再加 $3\cdot1{,}023$：$3{,}070$ 个采样，$3{,}070/16{,}000 = 0.19$ 秒。三十层看到 $192$ 毫秒的音频；一个不含空洞的三十层堆叠只能看到 $31$ 个采样，约 $2$ 毫秒。
:::
:::

卷积可以并行训练——每个输出位置同时算出——但它的记忆受限于由架构定死的感受野，而且生成仍是一步一步的：每个新样本都要在一个新位置上运行一遍堆叠（若缓存中间激活则代价很低）。本章其余部分的模型保住并行训练，同时让记忆原则上不受限制。

## 线性递归 {#sec-linear}

$\tanh(W_{hh}\mathbf{h}_{t-1} + W_{xh}\mathbf{x}_t)$ 里的非线性正是让 RNN 成为顺序计算的原因：没有 $\mathbf{h}_{t-1}$ 就求不出 $\mathbf{h}_t$。把它去掉。

::: definition 线性循环层 {#def-linear-rnn}
状态大小为 $N$ 的**线性循环层**按下式把输入 $u_1, \dots, u_T$ 映射为输出 $y_1, \dots, y_T$：

$$
\mathbf{x}_t = \bar A\,\mathbf{x}_{t-1} + \bar B\,u_t,\qquad y_t = C\,\mathbf{x}_t + D\,u_t,\qquad \mathbf{x}_0 = \mathbf{0},
$$ {#eq-linear-rnn}

其中 $\bar A\in\R^{N\times N}$（或 $\C^{N\times N}$）、$\bar B\in\R^{N\times1}$、$C\in\R^{1\times N}$、$D\in\R$，对应单个输入通道；$c$ 通道的层使用 $c$ 个这样的系统（或一个 $\bar B$、$C$ 取矩阵值的系统）。若 $\bar A, \bar B, C, D$ 不依赖 $t$，则称其为**时不变的**（LTI）。非线性与通道混合**用在这样的层之间**，绝不放在递推内部。
:::

用逐位置的 MLP 隔开的线性循环层的堆叠仍然是非线性序列模型——正如卷积网络虽每个卷积都是线性的、整体却是非线性的。线性性被限制在时间方向上，它换来三样好处。

::: theorem 递归-卷积对偶 {#thm-duality}
对 LTI 层[[#eq-linear-rnn]]，输出是输入与核 $\bar K = (\bar K_0, \bar K_1, \dots)$、$\bar K_j = C\bar A^j\bar B$ 的因果卷积：

$$
y_t = \sum_{j=0}^{t-1}\bar K_j\,u_{t-j} + D\,u_t = \sum_{j=0}^{t-1}C\bar A^j\bar B\,u_{t-j} + D\,u_t .
$$ {#eq-duality}
:::

::: proof
用归纳法证明 $\mathbf{x}_t = \sum_{j=0}^{t-1}\bar A^j\bar Bu_{t-j}$。$t = 1$ 时，$\mathbf{x}_1 = \bar A\mathbf{x}_0 + \bar Bu_1 = \bar Bu_1$，正是只含 $j = 0$ 一项的和。若对 $t$ 成立，则

$$
\mathbf{x}_{t+1} = \bar A\sum_{j=0}^{t-1}\bar A^j\bar Bu_{t-j} + \bar Bu_{t+1} = \sum_{j=0}^{t-1}\bar A^{j+1}\bar Bu_{t-j} + \bar A^0\bar Bu_{t+1} = \sum_{j'=0}^{t}\bar A^{j'}\bar Bu_{t+1-j'},
$$

其中在求和中换元 $j' = j + 1$，并把最后一项认作 $j' = 0$。再作用 $C$ 并加上 $Du_t$ 即得[[#eq-duality]]。时不变性必不可少：无论窗口摆在何处，每个幂 $\bar A^j$ 都是同一个矩阵，这正是 $\bar K$ 能成为单个核的原因。
:::

这个定理给出计算同一函数的两种方式。**作为递推**，该层每步花费 $O(N^2)$（对角 $\bar A$ 时为 $O(N)$），只需要当前状态——适合一次一个词元的生成，内存不随上下文增长。**作为卷积**，所有输出一次算完：先造出长度 $T$ 的核 $\bar K$，再做卷积，用快速傅里叶变换需 $O(T\log T)$——适合在整段序列上并行训练。第三个好处是线性动力系统可以被**分析**：记忆、稳定性、时间尺度都是 $\bar A$ 的特征值的性质。

::: example 两种算法手算 {#ex-duality}
一个标量 LTI 层有 $\bar a = 0.5$、$\bar b = 1$、$c = 1$、$D = 0$。对 $u = (1, 2, 0)$，分别用递推和卷积计算 $y_1, y_2, y_3$。
::: solution
递推：$x_1 = 1$，$x_2 = 0.5\cdot1 + 2 = 2.5$，$x_3 = 0.5\cdot2.5 + 0 = 1.25$，所以 $y = (1, 2.5, 1.25)$。核：$\bar K_j = 0.5^j$，即 $(1, 0.5, 0.25)$。卷积：$y_1 = 1\cdot1 = 1$；$y_2 = 1\cdot2 + 0.5\cdot1 = 2.5$；$y_3 = 1\cdot0 + 0.5\cdot2 + 0.25\cdot1 = 1.25$。数字完全相同：递推在 $x_t$ 里存下的，恰是卷积显式算出的加权和。
:::
:::

### 并行扫描 {#sec-scan}

即便没有卷积形式——下面的时变模型就没有——线性递推也可以并行计算，因为仿射映射的复合满足结合律。

::: proposition 线性递归是结合律扫描 {#prop-scan}
把 $\mathbf{x}_t = \bar A_t\mathbf{x}_{t-1} + \mathbf{b}_t$ 的第 $t$ 步表示为对 $e_t = (\bar A_t, \mathbf{b}_t)$，即映射 $\mathbf{x}\mapsto\bar A_t\mathbf{x} + \mathbf{b}_t$，并定义 $(A_1, \mathbf{b}_1)\bullet(A_2, \mathbf{b}_2) = (A_2A_1, A_2\mathbf{b}_1 + \mathbf{b}_2)$（"先作用第一个，再作用第二个"）。则 $\bullet$ 满足结合律，且 $\mathbf{x}_t$ 是 $e_1\bullet e_2\bullet\dots\bullet e_t$ 的第二个分量（取 $\mathbf{x}_0 = \mathbf{0}$）。于是全部 $T$ 个状态可由并行前缀扫描在 $O(\log T)$ 个顺序轮次内算出。
:::

::: proof
$(A_1, \mathbf{b}_1)\bullet(A_2, \mathbf{b}_2)$ 表示复合 $\mathbf{x}\mapsto A_2(A_1\mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2 = A_2A_1\mathbf{x} + (A_2\mathbf{b}_1 + \mathbf{b}_2)$，而函数的复合满足结合律，所以 $\bullet$ 也满足。把复合映射 $e_1\bullet\dots\bullet e_t$ 作用在 $\mathbf{x}_0 = \mathbf{0}$ 上得到它的平移部分，按递推的定义那正是 $\mathbf{x}_t$。对结合律算子，所有前缀乘积可用递归加倍计算——第 $r$ 轮把每个元素与前面第 $2^{r-1}$ 个元素组合——共需 $\lceil\log_2T\rceil$ 轮，每轮内部完全并行（Blelloch, 1990 给出总运算量 $O(T)$ 的工作最优版本）。
:::

Martin 和 Cundy（2018）用这一点沿序列长度并行训练线性循环网络，S5、Mamba 等时变 SSM 也正是这样训练的。对对角 $\bar A_t$，每次组合花费 $O(N)$，与一次顺序迈步相同。

## 状态空间模型 {#sec-ssm}

$\bar A$、$\bar B$ 和 $C$ 应当怎么选？随机初始化的线性递推要么几步就忘光，要么发散。状态空间模型通过离散化一个连续时间线性系统来获得它们，这给参数一个解释，也给出一个有原理的初始化。

::: definition 状态空间模型 {#def-ssm}
（连续时间、线性）**状态空间模型**通过状态 $\mathbf{x}(t)\in\C^N$ 把输入信号 $u(t)$ 映射为输出 $y(t)$：

$$
\mathbf{x}'(t) = A\mathbf{x}(t) + Bu(t),\qquad y(t) = C\mathbf{x}(t) + Du(t).
$$ {#eq-ssm}

给定**步长** $\Delta > 0$，**零阶保持**（ZOH）离散化——假设 $u$ 在每个长度为 $\Delta$ 的区间上取常数——为

$$
\bar A = e^{\Delta A},\qquad \bar B = (\Delta A)^{-1}\big(e^{\Delta A} - I\big)\Delta B ,
$$ {#eq-zoh}

**双线性**离散化则为 $\bar A = (I - \frac\Delta2A)^{-1}(I + \frac\Delta2A)$，$\bar B = (I - \frac\Delta2A)^{-1}\Delta B$。无论哪种都得到一个线性循环层[[#eq-linear-rnn]]，其中样本 $t$ 对应时间 $t\Delta$。
:::

::: proposition 零阶保持是精确的，以及稳定性 {#prop-zoh}
(1) 若 $u$ 在 $(t\Delta - \Delta, t\Delta]$ 上恒等于 $u_t$，则[[#eq-ssm]]的解精确满足 $\mathbf{x}(t\Delta) = \bar A\,\mathbf{x}(t\Delta - \Delta) + \bar Bu_t$，其中 $\bar A, \bar B$ 取自[[#eq-zoh]]（$A$ 可逆）。(2) 对对角 $A = \operatorname{diag}(\lambda_1, \dots, \lambda_N)$，$\lvert\bar a_n\rvert = e^{\Delta\operatorname{Re}\lambda_n}$，所以对一切 $\Delta > 0$ 离散递推都稳定（$\lvert\bar a_n\rvert < 1$）当且仅当 $\operatorname{Re}\lambda_n < 0$，且第 $n$ 个模态以 $1/(\Delta\lvert\operatorname{Re}\lambda_n\rvert)$ 步的时间常数遗忘。
:::

::: proof
(1) 由常数变易法，$\mathbf{x}(s + \Delta) = e^{\Delta A}\mathbf{x}(s) + \int_0^\Delta e^{(\Delta - \tau)A}B\,u(s + \tau)\,d\tau$。$u = u_t$ 为常数时，积分等于 $\big(\int_0^\Delta e^{\sigma A}d\sigma\big)Bu_t = A^{-1}(e^{\Delta A} - I)Bu_t$，即 $(\Delta A)^{-1}(e^{\Delta A} - I)\Delta Bu_t$。(2) $e^{\Delta\lambda} = e^{\Delta\operatorname{Re}\lambda}e^{i\Delta\operatorname{Im}\lambda}$ 的模为 $e^{\Delta\operatorname{Re}\lambda}$，它对一切 $\Delta > 0$ 都小于 $1$ 恰当 $\operatorname{Re}\lambda < 0$。经过 $k$ 步，一个模态被乘上 $e^{-k\Delta\lvert\operatorname{Re}\lambda\rvert}$，在 $k = 1/(\Delta\lvert\operatorname{Re}\lambda\rvert)$ 处降到 $e^{-1}$。
:::

因此步长就是一个时间尺度：小的 $\Delta$ 让一个模态记住许多步，大的 $\Delta$ 让它很快遗忘。$\lambda$ 的虚部使模态振荡，于是核 $\bar K_j = \sum_nc_n\bar a_n^j\bar b_n$ 是阻尼振荡之和——在这组基下，长而光滑的核只需少量参数就能表示。

::: example 离散化一个模态 {#ex-zoh}
对 $\lambda = -1$、$B = 1$、$\Delta = 0.1$，分别用 ZOH 和双线性法则计算 $\bar a$ 与 $\bar b$。这个模态能记住多少步？
::: solution
ZOH：$\bar a = e^{-0.1} = 0.904837$，$\bar b = (e^{-0.1} - 1)/(-1) = 0.095163$。双线性：$\bar a = (1 - 0.05)/(1 + 0.05) = 0.904762$，$\bar b = 0.1/1.05 = 0.095238$。两式四位小数一致，$\Delta\lvert\lambda\rvert$ 很小时本应如此。两者都有 $\bar a + \bar b\approx1$：常数输入 $u$ 会把状态驱动到 $u$，所以这个模态是一个时间常数为 $1/(\Delta\lvert\lambda\rvert) = 10$ 步的指数滑动平均。
:::
:::

::: widget plot
f: exp(d*a*x)*cos(d*w*x)
x: 0, 200
y: -1, 1
sliders: a=-0.5:-3:0:0.05; w=3.14:0:20:0.01; d=0.1:0.005:1:0.005
hlines: 0
caption: 一个对角模态对 SSM 核的贡献 $\operatorname{Re}\,\bar a^j = e^{\Delta\operatorname{Re}\lambda\,j}\cos(\Delta\operatorname{Im}\lambda\,j)$，横轴为滞后 $j$，取 $\lambda = a + iw$、步长 $\Delta = d$。实部决定模态遗忘的快慢，虚部决定振荡的快慢，步长则把两者拉伸或压缩。一层的核是 $N$ 个这样的模态的学习线性组合；把 $\Delta$ 取小可以在不加参数的前提下延长记忆。
:::

### S4 及其后继 {#sec-s4}

早期的线性状态空间层实验（Gu et al., 2021）使用由 **HiPPO** 理论（Gu, Dao, Ermon, Rudra and Ré, 2020）导出的特殊矩阵 $A$。在该理论下，状态 $\mathbf{x}(t)$ 装着输入全部历史的最优多项式逼近的系数——一种有原理可依的长期记忆。障碍在计算上：从稠密的 $N\times N$ 矩阵 $\bar A$ 计算核 $\bar K$ 需要 $T$ 个矩阵幂。**S4**（Gu, Goel and Ré, ICLR 2022）这样解决：把 HiPPO 矩阵写成正规矩阵加低秩修正，从而把核的计算归结为几次柯西核（Cauchy kernel）求值，并按通道学习 $\Delta$。在以序列长 $1{,}000$ 到 $16{,}000$ 个元素为特点的 Long Range Arena 基准（Tay et al., 2021）上，S4 对所有此前模型都有大幅改进，并是第一个在 $16{,}384$ 步的图像路径任务 Path-X 上胜过随机猜测的模型。

更简单的版本紧随其后，并表明 S4 的许多机器其实可以拆掉。DSS（Gupta, Gu and Berant, 2022）与 **S4D**（Gu, Gupta, Goel and Ré, 2022）使用带复特征值的**对角** $A$——例如 $\lambda_n = -\frac12 + i\pi n$，即下面清单采用的 "S4D-Lin" 初始化——并把核直接算成几何序列之和。S5（Smith, Warrington and Linderman, 2023）用并行扫描代替卷积来运行多输入对角 SSM。Orvieto 等人的 **LRU**（2023）表明，一个普通的线性循环层，只要权重是对角复数、参数化保证 $\lvert\bar a_n\rvert < 1$、初始化靠近单位圆，就能在 Long Range Arena 上与 S4 打平——所以本质成分是线性、对角（复）结构、稳定的参数化、初始化时衰减够慢，而未必是连续时间推导这一来路。H3（Fu, Dao et al., 2023）与 Hyena（Poli et al., 2023）这类带长隐式核的卷积模型，则在语言上探索了对偶的卷积一侧。

## 选择性：Mamba {#sec-mamba}

时不变模型有一个根本限制。由[[#thm-duality]]，LTI 层在每个位置都用**同一个**核：它记住 $j$ 步之前那个词元多少，只取决于 $j$，而与那个词元**是什么**毫无关系。它无法决定存下重要的词元、忽略填充内容，而**选择性复制**（把序列中被标记的词元复述出来，无论间隔多远）和**联想回忆**（associative recall；在"… $k$ $v$ …"之后，用 $k$ 查询时答出 $v$）这类合成任务恰恰需要这种能力，注意力则靠基于内容的查找提供它。在语言建模上，LTI SSM 落后于同等规模的 Transformer。

::: definition 选择性状态空间模型 {#def-selective}
**选择性** SSM 让离散化步长以及输入、输出映射都成为当前输入的函数：对每个位置 $t$，以 $\mathbf{u}_t\in\R^c$ 表示该层的输入，

$$
\Delta_t = \operatorname{softplus}(\mathbf{w}_\Delta^\top\mathbf{u}_t + b_\Delta),\quad B_t = W_B\mathbf{u}_t,\quad C_t = W_C\mathbf{u}_t,\qquad
\mathbf{x}_t = e^{\Delta_tA}\mathbf{x}_{t-1} + \Delta_tB_t\,u_t,\quad y_t = C_t\mathbf{x}_t ,
$$ {#eq-selective}

逐通道进行，其中 $A$ 为对角、实对角元为负，并采用简化的输入离散化 $\bar B_t\approx\Delta_tB_t$。递推关于 $\mathbf{x}$ 是线性的但时变，因此没有卷积形式；它由并行扫描（[[#prop-scan]]）计算。
:::

::: proposition 步长就是一个门 {#prop-gate}
对标量模态 $A = a < 0$ 与 ZOH 输入 $\bar b_t = (1 - e^{\Delta_ta})/(-a)\cdot b$，记 $g_t = 1 - e^{\Delta_ta}\in(0, 1)$。则 $x_t = (1 - g_t)x_{t-1} + g_t\,(b/(-a))\,u_t$。当 $\Delta_t\to0$ 时 $g_t\to0$，状态原样保留，$u_t$ 被忽略；当 $\Delta_t\to\infty$ 时 $g_t\to1$，状态被重置为（当前输入的倍数）。
:::

::: proof
记 $\bar a_t = e^{\Delta_ta}$，则 $1 - \bar a_t = g_t$，而 ZOH 的输入系数为 $\bar b_t = (\bar a_t - 1)b/a = g_t\,b/(-a)$，于是 $x_t = \bar a_tx_{t-1} + \bar b_tu_t$ 化为所声称的形式。由于 $a < 0$，$e^{\Delta_ta}$ 当 $\Delta_t\to0$ 时趋于 $1$，当 $\Delta_t\to\infty$ 时趋于 $0$。
:::

这正是 GRU 的插值 $\mathbf{h}_t = \mathbf{z}_t\odot\mathbf{h}_{t-1} + (1 - \mathbf{z}_t)\odot\tilde{\mathbf{h}}_t$（[[sequence-models/long-range-dependencies#def-gru]]），只是门只由输入算出、候选是**线性**的——衰减 $e^{\Delta_ta}$ 就是一个遗忘门。Gu 和 Dao（2023）把这个模型命名为 **Mamba**。它的模块把选择性 SSM 与一段短因果卷积、一个门控分支以及扩展与输出投影组合在一起，堆叠时不用注意力也不设单独的 MLP 层。由于递推时变，训练要用并行扫描，实现为融合的 GPU 核函数，把展开后的状态留在快速的片上内存里，而不是写进主存。论文报告 Mamba 解出了 LTI 模型无法解决的选择性复制与归纳头任务；在语言建模上，按作者们的预训练与下游评测，一个 $30$ 亿参数的 Mamba 与规模约为它两倍的 Transformer 相当，而生成吞吐量高出数倍。**Mamba-2**（Dao and Gu, 2024）把每个头上的 $A$ 限制为标量乘以单位阵，并证明所得模型可以写成一种掩码线性注意力——所谓"状态空间对偶"（state space duality）——从而能用矩阵乘法训练。

::: example 状态对缓存 {#ex-state}
一个假想的层模型宽度 $2{,}560$，扩展为 $5{,}120$ 个内部通道，每个通道有 $N = 16$ 的 SSM 状态。在 $100{,}000$ 词元的上下文下，把它的循环状态与同宽度注意力层（每个词元的键和值各 $2{,}560$ 个数）的键值缓存作比较。
::: solution
SSM 状态是每层 $5{,}120\cdot16 = 81{,}920$ 个数（外加短卷积缓冲区的几千个），与上下文长度无关。KV缓存每个词元增加 $2\cdot2{,}560 = 5{,}120$ 个数：$16$ 个词元后就追平 SSM 状态，在 $100{,}000$ 词元处则是它的 $100{,}000\cdot5{,}120/81{,}920 = 6{,}250$ 倍。这就是长上下文下循环层的诱人之处——也是它的局限：$81{,}920$ 个数必须概括 $100{,}000$ 个词元，而缓存把每个词元都原样留着（[[transformers/efficient-attention]]）。
:::
:::

## 同一家族：线性注意力与 RWKV {#sec-family}

其他几条研究线索也从不同方向抵达了线性递归。

**线性注意力。** Katharopoulos 等人（2020）用核特征映射 $\phi$ 取代因果注意力中的 softmax，使 $\mathbf{o}_t = \sum_{s\le t}\phi(\mathbf{q}_t)^\top\phi(\mathbf{k}_s)\mathbf{v}_s/\dots$。对过去的求和便可积累在一个矩阵值状态 $S_t = S_{t-1} + \phi(\mathbf{k}_t)\mathbf{v}_t^\top$ 里，由查询读出——一个带外积更新的 RNN（[[transformers/efficient-attention#prop-linear-rnn]]）。加上衰减 $S_t = \gamma S_{t-1} + \mathbf{k}_t\mathbf{v}_t^\top$ 便得到 RetNet（Sun et al., 2023）；让衰减依赖于数据便得到门控线性注意力（Yang et al., 2024），它与 Mamba-2 很接近。

**RWKV**（Peng et al., 2023）的设计目标是"一个有 Transformer 级表现的 RNN"：它的时间混合层逐通道维护 $e^{k_s}v_s$ 与 $e^{k_s}$ 的指数衰减滑动和，衰减率学出来，再取二者之比——相当于逐通道衰减的归一化线性注意力；它像 Transformer 一样并行训练，生成时则作为 RNN 运行；RWKV 模型训练到了 $140$ 亿参数。更早之前，准循环网络（quasi-recurrent network，Bradbury et al., 2017）与简单循环单元（simple recurrent unit，Lei et al., 2018）就已在卷积层或线性层之后使用带门的**逐元素**线性递推来加速 RNN 训练；xLSTM（Beck et al., 2024）则用指数门和矩阵记忆重新审视了 LSTM。

它们的共同形式是一条**带门线性递推** $\mathbf{x}_t = \mathbf{a}_t\odot\mathbf{x}_{t-1} + \mathbf{b}_t$（或其矩阵状态版本）：衰减 $\mathbf{a}_t$ 要么固定（LTI SSM、RetNet），要么由输入算出（Mamba、门控线性注意力、RWKV 的后期版本），而状态由当前输入的一个投影读出。各模型的差别在状态的大小与结构、衰减的参数化方式，以及各自硬件高效的训练算法。

| 模型 | 训练 | 每词元生成代价 | 对过去的记忆 |
|---|---|---|---|
| RNN / LSTM | 顺序，$O(T)$ 步 | $O(H^2)$，恒定 | 固定大小的状态 |
| 因果 CNN / TCN | 并行 | 带缓存时 $O(\text{层数}\cdot k)$ | 有限的感受野 |
| softmax 注意力 | 并行，$O(T^2)$ | $O(T)$，缓存增长 | 每个历史词元 |
| LTI SSM（S4、S4D） | 并行，卷积 $O(T\log T)$ | 每通道 $O(N)$，恒定 | 固定大小的状态，与内容无关 |
| 选择性 SSM（Mamba）、门控线性注意力 | 并行扫描或分块矩阵乘法 | 恒定 | 固定大小的状态，与内容相关 |

::: quiz
为什么 Mamba 这样的选择性 SSM 不能用单个卷积计算，而 S4 可以？
- [ ] 因为 Mamba 在递推内部使用了非线性。
- [x] 因为它的参数 $\Delta_t, B_t, C_t$ 依赖输入，递推因此时变，不存在单个核。
- [ ] 因为 Mamba 的状态比 S4 的大。
- [ ] 因为卷积无法在 GPU 上计算。
::: solution
[[#thm-duality]]需要时不变性：核 $C\bar A^j\bar B$ 必须在每个位置都相同。选择性 SSM 里矩阵随 $t$ 改变，$u_s$ 对 $y_t$ 的影响是 $C_t\bar A_t\cdots\bar A_{s+1}\bar B_s$，它分别依赖 $s$ 和 $t$。递推关于状态仍是**线性**的，所以并行扫描依然可用（[[#prop-scan]]）；其内部并没有非线性。
:::
:::

## 实现这一对偶 {#sec-code}

下面的清单构建一个 $N = 4$ 个模态、用 S4D-Lin 初始化的对角复 SSM，用 ZOH 离散化，并对一个随机输入既按递推、又按与[[#thm-duality]]的核作卷积来计算输出。然后它用[[#prop-scan]]的结合律扫描（以递归加倍、按顺序方式写出）计算同样的状态，最后运行一条步长依赖输入的标量**选择性**递推。

```python
import cmath, math, random

rng = random.Random(0)
N, L = 4, 64                                   # 状态大小（对角、复数），序列长度
# 连续时间对角 SSM：x'(t) = A x + B u, y = Re(C x); A = diag(lam), Re(lam) < 0
lam = [complex(-0.5, math.pi * n) for n in range(N)]         # S4D-Lin 式初始化
B = [1.0 + 0j] * N
C = [complex(rng.gauss(0, 0.5), rng.gauss(0, 0.5)) for _ in range(N)]
dt = 0.1

# 零阶保持：A_bar = exp(dt*lam), B_bar = (exp(dt*lam) - 1) / lam * B
Ab = [cmath.exp(dt * l) for l in lam]
Bb = [(cmath.exp(dt * l) - 1) / l * b for l, b in zip(lam, B)]

u = [rng.gauss(0, 1) for _ in range(L)]        # 输入序列

# (1) 作为递推：工作量 O(L N)，内存 O(N)，顺序
x, y_rec = [0j] * N, []
for t in range(L):
    x = [a * xi + b * u[t] for a, xi, b in zip(Ab, x, Bb)]
    y_rec.append(sum(c * xi for c, xi in zip(C, x)).real)

# (2) 作为卷积，核为 K[j] = Re(sum_n C_n A_bar_n^j B_bar_n)
K = [sum(c * a ** j * b for c, a, b in zip(C, Ab, Bb)).real for j in range(L)]
y_conv = [sum(K[j] * u[t - j] for j in range(t + 1)) for t in range(L)]
print("max |recurrence - convolution| =", max(abs(a - b) for a, b in zip(y_rec, y_conv)))
print("kernel K[0..5] =", [round(k, 4) for k in K[:6]], " |A_bar| =", [round(abs(a), 4) for a in Ab])

# (3) 用结合律扫描计算同一递推：元素 (a, b) 表示 x -> a*x + b
def combine(e1, e2):                           # 先作用 e1，再作用 e2
    (a1, b1), (a2, b2) = e1, e2
    return (a2 * a1, a2 * b1 + b2)
def scan(elems):                               # 包含式扫描，递归加倍
    out, step = list(elems), 1
    while step < len(out):                     # log2(L) 轮；每轮内部完全并行
        out = [out[i] if i < step else combine(out[i - step], out[i]) for i in range(len(out))]
        step *= 2
    return out
n0 = [scan([(Ab[0], Bb[0] * u[t]) for t in range(L)])[t][1] for t in range(L)]
x0, err = 0j, 0.0
for t in range(L):
    x0 = Ab[0] * x0 + Bb[0] * u[t]; err = max(err, abs(x0 - n0[t]))
print("max |sequential - scan| for state 0 =", err)

# (4) 一条选择性（依赖输入）的标量递推：步长 dt_t 依赖于 u_t
def scalar_ssm(u, dts, a=-1.0):                         # ZOH 且取 B = -a，故 B_bar = 1 - A_bar
    x, ys = 0.0, []
    for ut, d in zip(u, dts):
        ab = math.exp(d * a)                            # 衰减落在 (0, 1)：一个遗忘门
        x = ab * x + (1 - ab) * ut
        ys.append(x)
    return ys
softplus = lambda v: math.log1p(math.exp(v))
seq = [0.1, 3.0, 0.1, -0.2, 0.1, 0.0, 0.2, -0.1]
sel = [softplus(2.0 * abs(v) - 4.0) for v in seq]      # |u| 大 -> 步长大：写入
print("input           ", seq)
print("selective dt    ", [round(d, 3) for d in sel])
print("selective output", [round(v, 3) for v in scalar_ssm(seq, sel)])
for d in (0.05, 1.0):                                   # 时不变：所有步共用一个 dt
    print(f"LTI dt={d:<4}     ", [round(v, 3) for v in scalar_ssm(seq, [d] * len(seq))])
```

输出：

```
max |recurrence - convolution| = 1.249000902703301e-16
kernel K[0..5] = [-0.0097, 0.0212, 0.0316, 0.0275, 0.026, 0.037]  |A_bar| = [0.9512, 0.9512, 0.9512, 0.9512]
max |sequential - scan| for state 0 = 1.6653345369377348e-16
input            [0.1, 3.0, 0.1, -0.2, 0.1, 0.0, 0.2, -0.1]
selective dt     [0.022, 2.127, 0.022, 0.027, 0.022, 0.018, 0.027, 0.022]
selective output [0.002, 2.643, 2.587, 2.513, 2.46, 2.416, 2.357, 2.303]
LTI dt=0.05      [0.005, 0.151, 0.148, 0.131, 0.13, 0.124, 0.127, 0.116]
LTI dt=1.0       [0.063, 1.92, 0.769, 0.157, 0.121, 0.044, 0.143, -0.011]
```

递推、卷积与扫描在舍入误差（$10^{-16}$）内一致，这正是[[#thm-duality]]与[[#prop-scan]]的上场演示；每个模态都有 $\lvert\bar a\rvert = e^{-0.05} = 0.9512$，与[[#prop-zoh]]对 $\operatorname{Re}\lambda = -0.5$、$\Delta = 0.1$ 的预言一致。最后三行显示了选择性买到了什么。选择性递推在大输入 $3.0$ 处迈一大步（$\Delta = 2.1$），几乎把它整个写进状态（$2.64$），而在小输入处迈极小的步（$\Delta\approx0.02$），于是把这个值**保持**住：再过六步它仍读到 $2.30$。任何时不变的选择都做不到两头兼顾：$\Delta = 0.05$ 时状态几乎没记下那个重要输入（$0.15$），$\Delta = 1$ 时记下了（$1.92$）却三步之内就忘掉。

::: warning "状态空间模型已经取代了 Transformer"——或者"它们毫无竞争力"
截至 2026 年，两种说法都得不到已发表证据的支持。选择性 SSM 与门控线性注意力模型在已发表的研究中，于许多语言建模基准上追平了同等规模的 Transformer，且每个生成词元的内存恒定。但受控比较也发现了系统性的弱点：在需要从长上下文中检索或复制特定信息的任务上——联想回忆（Arora et al., 2023）、复制长字符串（Jelassi et al., 2024）、某些少样本评测——固定大小的状态处理得不如保留每个词元的缓存。Waleffe 等人（2024）的大规模研究发现，一个 $80$ 亿参数的纯 Mamba-2 模型在这类任务上落后于 Transformer，而其中注意力层只占很小比例的**混合**模型，在他们评测的标准任务上与之持平或超出它。若干公开发布的模型（例如 Jamba，Lieber et al., 2024）把 SSM 层与注意力层组合起来。有公开文档的前沿语言模型目前大多仍是基于 Transformer 的，而循环层能在多大程度上取代注意力，仍是一个开放的研究问题。评判每个说法要看它的评测：哪些任务、多大规模、多长上下文。
:::

::: history
线性状态空间模型是控制理论与信号处理的通用语言：卡尔曼（Kalman）的状态空间表述（1960）与卡尔曼滤波，以及线性时不变系统的理论——其脉冲响应就是一个卷积核。在深度学习中，卷积序列模型于 2016–2017 年兴起：WaveNet（van den Oord et al., 2016）、ByteNet 与卷积翻译（Gehring et al., 2017），以及 Bai、Kolter 和 Koltun（2018）"卷积应当是序列任务的默认选择"的主张。线性递归则因速度被重新研究——准 RNN（2017）、SRU（2018），以及 Martin 和 Cundy 的并行扫描（2018）。斯坦福大学的 Albert Gu 与合作者们发展了 HiPPO（2020）与线性状态空间层（2021），S4（2021 年 10 月挂出，ICLR 2022）让 SSM 能在极长序列上工作；对角变体（DSS、S4D、S5、LRU）在 2022–2023 年接踵而至。线性注意力（2020）、RetNet 与 RWKV（2023）从注意力一侧逼近同一批模型。Albert Gu 与 Tri Dao 的 Mamba（2023 年 12 月）引入选择性与硬件感知的扫描，Mamba-2（2024）通过状态空间对偶把 SSM 与注意力连通。把这些层与注意力混合的架构，在 2024–2026 年一直是活跃的开发方向。
:::

::: summary
- 空洞率为 $1, 2, 4, \dots$ 的**时间卷积**用 $L$ 层达到 $1 + (k - 1)(2^L - 1)$ 步的感受野；它们并行训练，但记忆有界（WaveNet、TCN）。
- **线性递归** $\mathbf{x}_t = \bar A\mathbf{x}_{t-1} + \bar Bu_t$、$y_t = C\mathbf{x}_t$ 把非线性放在层间而非时间内部。若它时不变，就**等于一个卷积**，核为 $\bar K_j = C\bar A^j\bar B$：训练时当卷积（FFT），生成时当 RNN。
- 任何线性递归，无论时变与否，都是一个**结合律扫描**，可在 $O(\log T)$ 个并行轮次内算出。
- **状态空间模型**用步长 $\Delta$ 离散化 $\mathbf{x}' = A\mathbf{x} + Bu$；ZOH 对分段常数输入是精确的，稳定性要求 $\operatorname{Re}\lambda < 0$，$\Delta$ 定出时间尺度。S4 使它们能在极长序列上训练；对角版本（S4D、LRU）更简单也一样好。
- **选择性 SSM**（Mamba）由输入计算 $\Delta_t, B_t, C_t$；衰减 $e^{\Delta_ta}$ 充当遗忘门，带来依赖内容的记忆，代价是失去卷积形式。
- 线性注意力、RetNet、门控线性注意力与 RWKV 也都是**带门线性递推**。截至 2026 年，它们和 SSM 在许多基准上有竞争力、对长上下文高效，但在长上下文的精确回忆上较弱，常与注意力搭配用作混合架构。
:::

## 习题

::: exercise 一个感受野 {level=1 check="1+2*(1+2+4+8+16)"}
一个因果卷积堆叠的核大小为 $3$，空洞率为 $1, 2, 4, 8, 16$。它的感受野是多大？
::: solution
$1 + (3 - 1)(1 + 2 + 4 + 8 + 16) = 1 + 2\cdot31 = 63$ 步。
:::
:::

::: exercise 一个核元素 {level=1 check="0.8^3*2"}
一个标量 LTI 层有 $\bar a = 0.8$、$\bar b = 2$、$c = 1$。核元素 $\bar K_3$ 是多少？
::: solution
$\bar K_3 = c\,\bar a^3\,\bar b = 0.512\cdot2 = 1.024$。
:::
:::

::: exercise 模态的时间常数 {level=1 check="1/(0.01*0.5)"}
一个对角 SSM 模态有 $\lambda = -0.5 + 3i$，步长 $\Delta = 0.01$。经过多少步，它的幅度衰减为原来的 $1/e$？
::: solution
每步 $\lvert\bar a\rvert = e^{\Delta\operatorname{Re}\lambda} = e^{-0.005}$，所以幅度在 $1/(\Delta\lvert\operatorname{Re}\lambda\rvert) = 1/0.005 = 200$ 步后衰减为 $1/e$。虚部不影响衰减，只影响振荡，周期为 $2\pi/(\Delta\cdot3)\approx209$ 步。
:::
:::

::: exercise 复合两步 {level=2}
对标量步 $e_1 = (0.5, 1)$ 与 $e_2 = (0.2, 3)$，计算 $e_1\bullet e_2$，并验证把它作用在 $x_0 = 0$ 上得到的 $x_2$ 与走一遍递推相同。再对 $e_3 = (2, -1)$ 计算 $(e_1\bullet e_2)\bullet e_3$ 与 $e_1\bullet(e_2\bullet e_3)$。
::: solution
$e_1\bullet e_2 = (0.2\cdot0.5, 0.2\cdot1 + 3) = (0.1, 3.2)$；作用在 $0$ 上得 $3.2$。递推：$x_1 = 0.5\cdot0 + 1 = 1$，$x_2 = 0.2\cdot1 + 3 = 3.2$。接着，$(0.1, 3.2)\bullet(2, -1) = (0.2, 6.4 - 1) = (0.2, 5.4)$。又 $e_2\bullet e_3 = (0.4, 6 - 1) = (0.4, 5)$，所以 $e_1\bullet(0.4, 5) = (0.4\cdot0.5, 0.4\cdot1 + 5) = (0.2, 5.4)$。两者相等，符合结合律；$x_3 = 5.4$。
:::
:::

::: exercise ZOH 与欧拉法 {level=2 check="1-0.1*2"}
$x' = \lambda x + u$ 的前向欧拉离散化为 $\bar a = 1 + \Delta\lambda$、$\bar b = \Delta$。对 $\lambda = -2$、$\Delta = 0.1$，计算 $\bar a$ 并与 ZOH 比较。$\Delta$ 取何值时欧拉法失稳而 ZOH 仍稳定？
::: solution
欧拉法：$\bar a = 1 - 0.2 = 0.8$；ZOH：$e^{-0.2} = 0.8187$。欧拉法在 $\lvert1 + \Delta\lambda\rvert > 1$ 即此处 $\Delta > 2/\lvert\lambda\rvert = 1$ 时失稳；ZOH 对一切 $\Delta > 0$ 都有 $\lvert\bar a\rvert = e^{-2\Delta} < 1$。选择性 SSM 要把 $\Delta_t$ 取大来重置状态，所以无条件稳定的离散化很重要。
:::
:::

::: exercise 递推还是卷积？ {level=2}
对一个对角 $\bar A$（大小 $N$）、序列长 $T$、单通道的 LTI 层，比较 (a) 递推、(b) 先算核再直接卷积、(c) 先算核再用 FFT 卷积的算术量。在 GPU 上训练长序列、以及一次只生成一个词元，各以哪种最好？
::: solution
(a) $O(TN)$ 次运算，但要 $T$ 个顺序步。(b) 核 $O(TN)$，直接卷积 $O(T^2)$，完全并行。(c) 核 $O(TN)$ 加上 FFT 卷积 $O(T\log T)$，并行。训练长序列时，(c)——或者并行扫描，在 $O(\log T)$ 轮内完成 $O(TN)$ 总工作——用上了 GPU 的并行性；顺序递推会让它空转。生成时，每个新词元只需一次递推迈步，$O(N)$，与之前来过多少词元无关，所以 (a) 最好。
:::
:::

::: exercise LTI 层做不到的事 {level=2}
证明 LTI 层无法在任意间隔下完成如下任务：输入是一个全是零的序列，只在未知位置 $s$ 有一个带标记的值 $v$，并在最后一个位置 $T$ 有一个查询；$T$ 处的输出必须是 $v$。选择性模型改变了什么？
::: solution
由[[#thm-duality]]，$y_T = \sum_j\bar K_ju_{T-j} + Du_T$。忽略查询自身的贡献，唯一的非零输入是位置 $s$ 处的 $v$，于是 $y_T = \bar K_{T-s}v + (\text{查询项})$，输出把 $v$ 乘上一个依赖未知距离 $T - s$ 的因子。除非 $\bar K_j$ 对所有 $j$ 都相同——那是一个从不遗忘的层，于是也会把其他一切积累起来——否则对大多数间隔答案都是错的。选择性模型可以在带标记的位置把 $\Delta_t$ 取大（写入 $v$）、在别处取极小（保持它），如清单最后几行所示，于是 $T$ 处的状态就是 $v$，与 $s$ 无关。
:::
:::

::: exercise 作为线性递归的线性注意力 {level=3}
对不归一化的因果线性注意力 $\mathbf{o}_t = \sum_{s\le t}(\mathbf{q}_t^\top\mathbf{k}_s)\mathbf{v}_s$，证明 $\mathbf{o}_t = S_t^\top\mathbf{q}_t$，其中 $S_t = S_{t-1} + \mathbf{k}_t\mathbf{v}_t^\top$。把状态更新写成[[#prop-scan]]意义下的一个扫描元素，并说明衰减 $\gamma\in(0, 1)$ 如何把它变成 RetNet 的递推。对 $d_k = d_v = 128$，状态有多大？与 $T$ 个词元之后的 KV缓存比较。
::: solution
展开得 $S_t = \sum_{s\le t}\mathbf{k}_s\mathbf{v}_s^\top$，于是 $S_t^\top\mathbf{q}_t = \sum_s\mathbf{v}_s\mathbf{k}_s^\top\mathbf{q}_t = \sum_s(\mathbf{q}_t^\top\mathbf{k}_s)\mathbf{v}_s = \mathbf{o}_t$。更新即 $S_t = I\cdot S_{t-1} + \mathbf{k}_t\mathbf{v}_t^\top$：一个作用在矩阵状态上的扫描元素 $(I, \mathbf{k}_t\mathbf{v}_t^\top)$，其"衰减"是单位阵。RetNet 用 $S_t = \gamma S_{t-1} + \mathbf{k}_t\mathbf{v}_t^\top$，即元素 $(\gamma, \mathbf{k}_t\mathbf{v}_t^\top)$，由[[#thm-duality]]（逐分量作用）它等于 $\mathbf{o}_t = \sum_s\gamma^{t-s}(\mathbf{q}_t^\top\mathbf{k}_s)\mathbf{v}_s$——带指数衰减掩码的注意力。状态每头 $d_kd_v = 16{,}384$ 个数，与 $T$ 无关；KV缓存每头 $(d_k + d_v)T = 256T$ 个数，在 $64$ 个词元后就超过状态。
:::
:::

::: exercise 选择性扫描仍是扫描 {level=3}
把清单里的 `scan` 改造成计算第 (4) 部分的选择性递推——扫描元素 $(\bar a_t, (1 - \bar a_t)u_t)$，$\bar a_t = e^{-\Delta_t}$——并验证它复现打印出的 "selective output"。然后解释为什么时变模型需要扫描（或顺序循环）而不能用核 $\bar K$。
::: solution
```python
abar = [math.exp(-d) for d in sel]
out = scan([(a, (1 - a) * ut) for a, ut in zip(abar, seq)])
print([round(b, 3) for _, b in out])
# [0.002, 2.643, 2.587, 2.513, 2.46, 2.416, 2.357, 2.303]
```
前缀复合的第二个分量就是状态，与循环的输出相同，因为复合法则正是递推本身（[[#prop-scan]] 不需要时不变性）。核要求 $u_s$ 对 $y_t$ 的影响只依赖 $t - s$；这里它是 $\big(\prod_{r=s+1}^t\bar a_r\big)(1 - \bar a_s)$，依赖其间所有的步长——也就是依赖序列的内容——所以固定的 $\bar K$ 不存在。
:::
:::
