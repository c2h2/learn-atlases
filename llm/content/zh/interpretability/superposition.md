如果网络的每个神经元都恰好对输入的某一个有意义的性质作出反应，可解释性就只是给神经元编目录的事。有些神经元确实如此——一个曲线检测器、一个对 base64 文本作出反应的神经元——但许多不是。视觉模型里的单个神经元可能对猫脸、汽车前脸和猫腿都作出反应；语言模型里的一个神经元可能在学术引用、对话、以及某一特定语言的文本上激发。这样的神经元是**多义的**（polysemantic），而且常见到让对语言模型的逐神经元分析大体失败。本章解释原因。

居主导地位的解释是**叠加**（superposition）：网络能表征比它的维数多得多的特征——给它们分配*近乎*正交的方向，接受特征之间的一些干扰来换取容量。当特征**稀疏**时——任何一个输入只含其中少数几个——这是有利的，因为干扰只在特征共现时才产生。本章分三步展开这一想法。几何：高维空间含有指数多个近乎正交的方向，我们用联合界（union bound）证明这一点并用数值检验，同时给出与之匹配的下界，说明 $N$ 个向量最多能有多正交。Elhage 等人（2022）的《叠加的玩具模型》（*Toy Models of Superposition*）：线性模型可证明从不使用叠加，而带 ReLU 输出的模型会用，其间有由稀疏度与重要性支配的相变——我们在最小的情形把它推出来，并用训练复现它。最后是推论：多义神经元、作为过完备基中方向的特征，以及 [[interpretability/sparse-features]] 中稀疏字典的动机。

## 特征作为方向 {#sec-features}

**特征**（feature）一词被非正式地用来指网络所表征的输入的一个性质——“这个词元是法语”、“主语是复数”、“这是一条 DNA 序列”。机制可解释性多数工作的工作假说是，这样的特征以**线性**方式被表征。

::: definition 线性表征、叠加、多义性 {#def-superposition}
一层的激活 $\mathbf{h}\in\R^m$ **线性表征**特征 $f_1,\dots,f_n$（在某个给定输入上取值 $x_i\ge0$），若
$$
\mathbf{h}\approx\sum_{i=1}^nx_i\,\mathbf{w}_i + \mathbf{b}
$$
对固定的**特征方向** $\mathbf{w}_i\in\R^m$ 成立。若 $n > m$，方向便不可能正交，此时称该层以**叠加**方式存储这些特征。一个神经元（特权基的一个坐标，[[interpretability/residual-stream#def-privileged]]）若只对单个特征作出反应就是**单义的**，若对若干互不相关的特征作出反应就是**多义的**。
:::

线性表征之所以有吸引力，是因为后续各层用线性映射加非线性来读取激活：沿某个方向存储的特征可以用一次点积读出来。支持它们的证据相当多——词嵌入的向量偏移（[[text-and-language/word-embeddings]]）、能读出许多性质的线性探针（[[interpretability/probing-attribution]]）、加上一个方向来引导（[[interpretability/causal-interventions]]）——还有一批工作把这一假说形式化（Park、Choe 与 Veitch，2023）。但它是假说，不是定律：Engels 等人（2024）发现了不可约化为多维的特征，比如在 GPT-2 与 Mistral 7B 中，星期与月份表征在圆上；Csordás 等人（2024）则发现小的循环网络用基于幅值的非线性编码来存储序列。叠加假说关心的是线性情形。

网络为什么要把比维数更多的特征存进去？因为世界值得表征的性质远比一层的维数为多——一个 $d = 4096$ 的模型可能有用得跟踪几十万个概念——而且其中大多数很罕见：在任何一个词元上，它们几乎全都不在场。叠加用一点干扰换取大量容量。这一权衡立足于几何。

## 近乎正交的方向 {#sec-geometry}

在 $\R^m$ 中，恰好正交的向量至多有 $m$ 个。若只要求每对满足 $\lvert\cos\rvert\le\varepsilon$，个数就会随 $m$ 指数增长。最干净的证明用随机符号向量与霍夫丁（Hoeffding）不等式：对独立随机符号 $s_1,\dots,s_m\in\{\pm1\}$，$\Prob(s_k = 1) = \tfrac12$，及 $t > 0$，
$$
\Prob\Bigl(\Bigl\lvert\sum_{k=1}^ms_k\Bigr\rvert\ge t\Bigr)\le2\exp\bigl(-t^2/(2m)\bigr).
$$ {#eq-hoeffding}

::: theorem 指数多个近乎正交的向量 {#thm-jl}
对每个 $\varepsilon\in(0, 1)$ 与每个满足 $N\ge2$、$N\le\exp(m\varepsilon^2/4)$ 的整数，存在单位向量 $\mathbf{u}_1,\dots,\mathbf{u}_N\in\R^m$，使得一切 $i\ne j$ 都有 $\lvert\mathbf{u}_i\cdot\mathbf{u}_j\rvert<\varepsilon$。随机符号向量 $\mathbf{u}_i = \mathbf{s}_i/\sqrt m$，$\mathbf{s}_i$ 在 $\{\pm1\}^m$ 中独立均匀分布，以大于 $0$ 的概率具有这一性质。
:::

::: proof
对 $i\ne j$，$\mathbf{u}_i\cdot\mathbf{u}_j = \frac1m\sum_ks_{ik}s_{jk}$，而乘积 $s_{ik}s_{jk}$ 是独立的均匀符号（固定 $\mathbf{s}_i$，把独立均匀符号乘上固定符号，它们仍是均匀独立的）。由 [[#eq-hoeffding]] 取 $t = m\varepsilon$，$\Prob(\lvert\mathbf{u}_i\cdot\mathbf{u}_j\rvert\ge\varepsilon)\le2\exp(-m\varepsilon^2/2)$。对 $\binom N2 < N^2/2$ 个配对使用联合界，某一对失败的概率小于 $N^2\exp(-m\varepsilon^2/2)\le\exp(m\varepsilon^2/2)\exp(-m\varepsilon^2/2) = 1$，这里用到 $N^2\le\exp(m\varepsilon^2/2)$。所以以正概率没有任何一对失败，这样一组向量必然存在。
:::

这正是 Johnson–Lindenstrauss 引理（Johnson 与 Lindenstrauss，1984）背后的计数事实：该引理断言 $N$ 个点可以映射进 $O(\log N/\varepsilon^2)$ 维、使所有成对距离保持在 $1\pm\varepsilon$ 的因子之内；驱动两者的同样是测度的集中。Elhage 等人把它引为叠加之所以能如此高效的原因。一条下界表明，这个界对 $m$ 的依赖本质上也是紧的。

::: proposition Welch 界 {#prop-welch}
若 $\mathbf{u}_1,\dots,\mathbf{u}_N$ 是 $\R^m$ 中的单位向量且 $N > m$，则
$$
\max_{i\ne j}\lvert\mathbf{u}_i\cdot\mathbf{u}_j\rvert\ge\sqrt{\frac{N - m}{m(N - 1)}}.
$$ {#eq-welch}
:::

::: proof
设 $G$ 为 $N\times N$ 的 Gram 矩阵，$G_{ij} = \mathbf{u}_i\cdot\mathbf{u}_j$。它对称、半正定，秩 $r\le m$，迹为 $N$。其非零特征值 $\lambda_1,\dots,\lambda_r$ 满足 $\sum\lambda_k = N$，所以由柯西-施瓦茨（Cauchy–Schwarz）不等式，$\lVert G\rVert_F^2 = \sum\lambda_k^2\ge N^2/r\ge N^2/m$。另一方面 $\lVert G\rVert_F^2 = \sum_iG_{ii}^2 + \sum_{i\ne j}G_{ij}^2\le N + N(N - 1)\mu^2$，其中 $\mu$ 是 $i\ne j$ 上 $\lvert G_{ij}\rvert$ 的最大值。合并得 $N + N(N - 1)\mu^2\ge N^2/m$，即 $\mu^2\ge(N/m - 1)/(N - 1) = (N - m)/(m(N - 1))$。
:::

当 $N\gg m$ 时，Welch 界趋于 $1/\sqrt m$，而两个随机单位向量之间 $\lvert\cos\rvert$ 的典型大小也正是这个（其均值接近 $\sqrt{2/(\pi m)}$）。于是随机方向达到的是界所允许的*典型*干扰，但它们*最差*的一对要差上 $\sqrt{\log N}$ 量级的倍数；实验室部分把两者都量了出来。

::: example 装得下多少特征？ {#ex-capacity}
一条残差流有 $m = 4096$ 个维数。[[#thm-jl]] 保证存在多少个成对 $\lvert\cos\rvert<0.1$ 的方向？$\lvert\cos\rvert<0.2$ 呢？若一个词元上有 $k = 20$ 个取值为 $1$ 的特征激活，各自沿一个随机方向存储，用一个点积读出某一个特征时的干扰有多大？
::: solution
$\exp(4096\times0.01/4) = \exp(10.24)\approx28{,}000$ 个方向（$\varepsilon = 0.1$），$\exp(4096\times0.04/4) = \exp(40.96)\approx6\times10^{17}$ 个（$\varepsilon = 0.2$）——远超任何网络所需，尽管这个保证是保守的。用 $\mathbf{u}_i\cdot\mathbf{h}$ 读特征 $i$ 得到 $x_i + \sum_{j\ne i}x_j\,\mathbf{u}_i\cdot\mathbf{u}_j$。对随机方向，每个余弦均值为 $0$、方差约为 $1/m$，所以另外 $19$ 个激活特征带来的干扰标准差约为 $\sqrt{19/4096} = 0.068$：与信号 $1$ 相比很小。若有 $k = 2000$ 个激活特征，噪声将是 $\sqrt{2000/4096} = 0.70$，与信号一样大。叠加之所以行得通，正因为特征是稀疏的。
:::
:::

## 一个玩具模型 {#sec-toy}

Elhage 等人（2022）问：由梯度下降训练的网络究竟何时真正选择叠加？他们用的模型小到可以可视化。

::: definition 叠加的玩具模型 {#def-toy}
输入 $\mathbf{x}\in\R^n$ 的各个坐标相互独立：每个 $x_i$ 以概率 $1 - p$ 为 $0$（**稀疏度**为 $S = 1 - p$），否则服从 $[0, 1]$ 上的均匀分布。特征 $i$ 有一个**重要性** $I_i > 0$。一个有 $m < n$ 个隐层维度、权重为 $W\in\R^{m\times n}$（列 $\mathbf{w}_i$ 是特征 $i$ 的方向）的模型计算
$$
\mathbf{h} = W\mathbf{x},\qquad\hat{\mathbf{x}} = \operatorname{ReLU}(W\T\mathbf{h} + \mathbf{b}),
$$
并以最小化 $\mathcal{L} = \E\bigl[\sum_iI_i(x_i - \hat x_i)^2\bigr]$ 为目标训练。**线性**变体去掉 ReLU：$\hat{\mathbf{x}} = W\T W\mathbf{x} + \mathbf{b}$。
:::

隐层是一个压缩瓶颈，问题在于哪些特征能穿过它存活、以何种方式存活。当 $\lVert\mathbf{w}_i\rVert$ 接近 $1$ 时称特征 $i$ 被*表征*，接近 $0$ 时被*丢弃*；若 $\mathbf{w}_i\cdot\mathbf{w}_j\ne0$，则两个被表征的特征相互*干扰*。

### 线性模型不叠加 {#sec-linear}

::: theorem 线性玩具模型正交地存储最重要的特征 {#thm-linear}
在线性变体中，设 $v_i = \E[x_i^2] - (\E x_i)^2$ 为特征 $i$ 的方差，并把特征排序使得 $I_1v_1\ge I_2v_2\ge\cdots\ge I_nv_n$。$\mathcal{L}$ 在 $W\in\R^{m\times n}$ 与 $\mathbf{b}$ 上的最小值等于 $\sum_{i>m}I_iv_i$；当 $W$ 的各列 $\mathbf{w}_1,\dots,\mathbf{w}_m$ 标准正交、$i > m$ 时 $\mathbf{w}_i = \mathbf{0}$、且 $\mathbf{b}$ 复现各特征的均值时取到这个最小值。若 $I_mv_m > I_{m+1}v_{m+1}$，则每个最小元都恰好正交地、无干扰地表征特征 $1,\dots,m$。
:::

::: proof
对固定的 $W$，最优偏置使 $\hat{\mathbf{x}}$ 在均值上正确：$\mathbf{b} = (I - M)\boldsymbol\mu$，其中 $M = W\T W$、$\boldsymbol\mu = \E\mathbf{x}$；此时损失就是中心化变量的损失 $\mathcal{L} = \E\lVert D^{1/2}(I - M)(\mathbf{x} - \boldsymbol\mu)\rVert^2$，其中 $D = \operatorname{diag}(I_i)$。特征相互独立，协方差为 $\Sigma = \operatorname{diag}(v_i)$，且 $\mathcal{L} = \operatorname{tr}\bigl(D^{1/2}(I - M)\Sigma(I - M)\T D^{1/2}\bigr) = \lVert A - D^{1/2}M\Sigma^{1/2}\rVert_F^2$，其中 $A = D^{1/2}\Sigma^{1/2} = \operatorname{diag}(\sqrt{I_iv_i})$。由于 $D^{1/2}M\Sigma^{1/2}$ 的秩至多为 $m$，Eckart–Young 定理（[[math-for-ml/matrix-decompositions]]）给出 $\mathcal{L}\ge\sum_{i>m}I_iv_i$，即对角矩阵 $A$ 除最大的 $m$ 个之外其余奇异值的平方和。当 $M = \operatorname{diag}(1,\dots,1,0,\dots,0)$（$m$ 个 1）时取到这个界；对 $W = [\,I_m\ \ 0\,]$——或任何前 $m$ 列标准正交、其余为零的 $W$——$W\T W$ 恰好给出这个矩阵。当第 $m$ 与第 $(m+1)$ 个奇异值互异时，最佳秩 $m$ 逼近唯一，所以 $D^{1/2}M\Sigma^{1/2}$ 必为截断的 $A$，从而迫使 $M$ 是那个对角投影；于是 $i\le m$ 时 $\lVert\mathbf{w}_i\rVert^2 = M_{ii}$ 为 $1$、否则为 $0$，且 $i\ne j$ 时 $\mathbf{w}_i\cdot\mathbf{w}_j = M_{ij} = 0$。
:::

::: example 线性模型保留哪个特征？ {#ex-linear}
一个 $m = 1$ 的线性玩具模型有两个特征：重要性为 $1$、以概率 $p = 0.1$ 出现的特征 $A$；以及重要性为 $0.5$、总是出现（$p = 1$）的特征 $B$。两者出现时都服从 $[0, 1]$ 上的均匀分布。最优模型保留哪一个？它的损失是多少？
::: solution
以概率 $p$ 出现的特征，方差为 $\E x^2 - (\E x)^2 = p/3 - p^2/4$。对 $A$：$0.0333 - 0.0025 = 0.0308$，故 $I_Av_A = 0.0308$。对 $B$：$1/3 - 1/4 = 1/12 = 0.0833$，故 $I_Bv_B = 0.0417$。由 [[#thm-linear]]，模型保留 $B$，那个*不那么重要*的特征，因为它的方差更大；其损失为 $I_Av_A = 0.0308$（特征 $A$ 被它的均值 $0.05$ 取代）。稀疏特征携带的方差很少，所以线性模型最先牺牲的正是它们——恰恰是叠加所能拯救的那些特征。
:::
:::

线性模型的表现就像按重要性加权的主成分分析：保留最重要的 $m$ 个特征，丢弃其余。任何干扰都会得不偿失，因为线性读出无法压制干扰。ReLU 改变了这一点：负的干扰项被截为零，所以不在场的特征不受负串扰之害。

### 一维中的两个特征 {#sec-two}

取 $n = 2$、$m = 1$，$I_1 = 1$、$I_2 = r\le1$。比较两种配置。

- **专用（dedicated）：** $W = (1, 0)$，$b_1 = 0$，$b_2 = c$。特征 $1$ 被精确重构；特征 $2$ 被常数 $\operatorname{ReLU}(c)$ 取代，该常数最好取为它的均值 $p/2$，损失为 $r\,v_2 = r(p/3 - p^2/4)$（因为 $\E x_2^2 = p/3$）。
- **对跖（antipodal）：** $W = (1, -1)$，$\mathbf{b} = \mathbf{0}$。此时 $W\T W\mathbf{x} = (x_1 - x_2,\ x_2 - x_1)$，$\hat{\mathbf{x}} = (\operatorname{ReLU}(x_1 - x_2),\ \operatorname{ReLU}(x_2 - x_1))$。若只有一个特征激活，它就被*精确*重构——ReLU 消去了对另一个特征的负干扰。

::: proposition 两种配置之间的相变 {#prop-phase}
在 [[#def-toy]] 的输入下，对跖配置的损失为 $(1 + r)p^2/6$，专用配置的损失为 $r(p/3 - p^2/4)$。对跖配置——叠加——损失更低，当且仅当
$$
p < p^* = \frac{4r}{2 + 5r}.
$$ {#eq-phase}
:::

::: proof
对跖：至多一个特征激活时，误差为零。两个都激活的概率为 $p^2$，此时 $x_1, x_2$ 独立且服从 $[0,1]$ 上的均匀分布。若 $x_1 > x_2$，则 $\hat x_1 = x_1 - x_2$ 且 $\hat x_2 = 0$，于是误差为 $x_2$ 与 $x_2$；$x_2 > x_1$ 时对称同理。加权平方误差为 $(1 + r)\min(x_1, x_2)^2$。两个独立均匀变量最小值的密度为 $[0, 1]$ 上的 $2(1 - t)$，所以 $\E\min^2 = \int_0^12(1 - t)t^2\,dt = 2(\tfrac13 - \tfrac14) = \tfrac16$，得损失 $(1 + r)p^2/6$。专用：常数预测 $p/2 = \E x_2$ 留下方差 $\E x_2^2 - (\E x_2)^2 = p/3 - p^2/4$，再乘以权重 $r$。比较两者，$(1 + r)p^2/6 < r(p/3 - p^2/4)$ 当且仅当（除以 $p > 0$ 并乘以 $12$）$2(1 + r)p + 3rp < 4r$，即 $p < 4r/(2 + 5r)$。
:::

重要性相等时，$p^* = 4/7\approx0.57$：一旦每个特征的出现时间不超过约 $57\%$，共享一个维数就胜过丢弃一个特征。若第二个特征不那么重要，阈值随之下降——$r = 0.2$ 时 $p^* = 0.267$——因为干扰必须更罕见才划得来。Elhage 等人正是这样绘出理论相图的：在重要性与密度上比较若干候选配置的损失，并发现训练运行与它们高度吻合、转变尖锐。这一比较是在候选者之间做的，而不是在全体模型上做的：在边界附近，训练出的模型还会找到胜过两种候选的中间解（不等的权重与正的偏置），实验室部分对此有所展示。

::: widget plot
f: r*(x/3 - x^2/4); (1 + r)*x^2/6
x: 0, 1
y: 0, 0.3
sliders: r=0.05:0.05:1
labels: \text{专用（丢弃特征 2）}; \text{对跖（叠加）}
caption: [[#prop-phase]] 中两种配置的损失，作为特征密度 $p$（横轴）的函数，重要性比为 $r$。叠加在交叉点 $p^* = 4r/(2 + 5r)$ 的左侧胜出。把第二个特征的重要性调低：交叉点左移，因此叠加要求特征更稀疏。
:::

::: example 检验对跖配置 {#ex-antipodal}
在对跖配置中，计算 $\mathbf{x} = (0.8, 0)$、$(0, 0.5)$ 与 $(0.8, 0.5)$ 的 $\hat{\mathbf{x}}$，以及 $r = 1$ 时各自的损失。
::: solution
$\mathbf{h} = x_1 - x_2$，且 $\hat{\mathbf{x}} = (\operatorname{ReLU}(h), \operatorname{ReLU}(-h))$。对 $(0.8, 0)$：$h = 0.8$，$\hat{\mathbf{x}} = (0.8, 0)$，损失 $0$。对 $(0, 0.5)$：$h = -0.5$，$\hat{\mathbf{x}} = (0, 0.5)$，损失 $0$。对 $(0.8, 0.5)$：$h = 0.3$，$\hat{\mathbf{x}} = (0.3, 0)$，误差为 $0.5$ 与 $0.5$，损失 $0.5$。这一个隐层数字以符号编码*哪个*特征在激活、以大小编码*激活了多少*；它只在两者同现时失效——而对稀疏特征来说，这很罕见。
:::
:::

### 玩具模型展示了什么 {#sec-findings}

在更多的特征与维数下，Elhage 等人报告了以下发现（作为其训练运行的经验发现）：

- **随稀疏度的相变。** 特征稠密时，ReLU 模型表现得像线性模型：最重要的 $m$ 个特征得到正交方向，其余被丢弃。随着稀疏度增大，越来越多的特征被塞进来，先是成**对跖对**，然后是更大的结构。转变是尖锐的。
- **几何。** 被表征的特征组织成小的正则构型——对跖对（*digon*）、三角形、二维中的五边形（*pentagon*）、四面体及其他一致多胞体——每个特征占据一个维数的确定份额，用一个**特征维数** $D_i = \lVert\mathbf{w}_i\rVert^2/\sum_j(\hat{\mathbf{w}}_i\cdot\mathbf{w}_j)^2$ 来度量。这些维数值聚集在 $1$、$\tfrac12$、$\tfrac23$、$\tfrac25$ 这类“黏性”分数附近。
- **正相关的特征**更倾向被放在正交方向上（它们共现，干扰会很频繁），负相关的则被放到对跖方向。
- **叠加中的计算。** 一个带 ReLU 隐层的变体，被训练去计算稀疏输入的绝对值，其计算也在叠加中进行，而不只是存储。
- **特权基。** 当隐层自身带有 ReLU——从而它的基是特权的——处于叠加中的特征便摊在多个神经元上，神经元对多个特征作出反应：**多义性**作为叠加的后果出现。特征少时它们趋于与神经元对齐，特征多时便混合起来。

作者们明确表示这些是玩具模型，为可处理性而选，特征独立、幅值均匀、目标是重构；真实模型是否处于同一区间是一个经验问题。支持“是”的证据包括：语言模型中对许多不相关特征作出反应的神经元；稀疏探针研究（Gurnee 等人，2023，《大海捞针找神经元》*Finding Neurons in a Haystack*）发现有些层里单个神经元编码特定特征、另一些层里是分布式、叠加式的编码；尤其是稀疏字典学习从多义激活中恢复可解释方向的成功（[[interpretability/sparse-features]]）。

::: quiz
在 $n = 10$ 个特征、$m = 3$ 个维数、各方差相同、重要性为 $I_i = 0.9^i$ 的线性玩具模型中，最优模型表征哪些特征？如何表征？
- [ ] 全部十个，处于叠加之中，因为 $10 > 3$。
- [x] 特征 $1$、$2$ 与 $3$，沿标准正交方向；其余七个被丢弃。
- [ ] 三个最不重要的特征，因为它们混合时造成的伤害最小。
- [ ] 取决于稀疏度：稀疏特征会以叠加方式存储。
::: solution
由 [[#thm-linear]]，无论稀疏度如何，线性模型都正交地保留 $I_iv_i$ 最大的 $m$ 个特征——这里是三个最重要的——并丢弃其余。只有当输出 ReLU 一类的非线性能够滤除干扰时，稀疏度才起作用。
:::
:::

## 从多义神经元到特征 {#sec-poly}

叠加对神经元出了什么毛病给出了确切说明。一个神经元是特权基的一个坐标；若一层把 $n\gg m$ 个特征存储为与坐标不对齐的方向 $\mathbf{w}_i$，那么神经元 $k$ 的预激活就是 $\sum_iw_{ik}x_i$，是所有第 $k$ 个分量非零的特征的混合。在任何一个输入上只有少数特征激活，于是这个神经元看上去对“一张猫脸*或*一个汽车前脸*或*……”作出反应——取决于它的哪些特征在场。这样逐个研究神经元，就好比研究一组对感兴趣变量所作的线性组合，而且无法单凭一个神经元把组合撤销。

玩具模型提示的补救办法是换基：找出那个过完备的方向集 $\{\mathbf{w}_i\}$，使激活在其下是稀疏组合，$\mathbf{h}\approx\sum_ix_i\mathbf{w}_i$ 且只有少数 $x_i$ 非零。这是一个**稀疏字典学习**问题，是信号处理与神经科学中的老问题（Olshausen 与 Field，1996），也是下一章的主题。Elhage 等人还讨论了两种替代思路：训练避免叠加的模型（例如使用 softmax 线性单元（SoLU），Elhage 等人在 2022 年发现它能让更多神经元变得可解释，同时也报告了证据，表明有些特征会以其他方式——部分经由其后的归一化——被藏起来）；以及接受叠加、用别的方式分析它。

::: warning 叠加是关于真实模型的假说：有支持，未被证明
玩具模型证明的是叠加*可以*最优，并展示了它的签名。它们没有证明某个给定的语言模型在用它，也没有证明模型的特征按玩具模型的意义是一维的、独立的、稀疏的。当一项分析假定叠加成立时——例如把稀疏自编码器找到的方向解释为模型的特征——应当把这个假定讲明。还存在竞争或互补的说法：特征可能是多维的（对周期量是圆形的）、表征可能部分是非线性的，而一些表面上的多义性可能反映的是真正相关的概念，而不是被硬塞在一起的不相关特征。
:::

::: example 读一个多义神经元 {#ex-neuron}
一个有 $m = 2$ 个神经元的隐层以单位范数在角度 $0^\circ, 72^\circ, 144^\circ, 216^\circ, 288^\circ$ 上存储五个特征（一个五边形）。神经元 $1$（第一个坐标）对哪些特征正向反应？权重各是多少？
::: solution
神经元 $1$ 作用在特征 $i$ 上的权重是 $\cos\theta_i$：$\cos0^\circ = 1$，$\cos72^\circ = 0.309$，$\cos144^\circ = -0.809$，$\cos216^\circ = -0.809$，$\cos288^\circ = 0.309$。它对特征 $1$、$2$、$5$ 正向反应——对 $1$ 强，对 $2$ 与 $5$ 弱——对 $3$ 与 $4$ 负向反应。研究者看激活最高的输入，会先看到特征 $1$ 的例子，然后是特征 $2$ 与 $5$ 的混合：一个多义神经元。而在特征基下，每个方向都是干净的。
:::
:::

## 一个数值实验室 {#sec-code}

下面的清单用纯 Python 与 Adam 训练 [[#def-toy]] 的玩具模型：先是在若干密度下训练 $n = 2$ 个特征、$m = 1$ 个维数、重要性为 $(1, 0.2)$ 的模型，与 [[#eq-phase]] 给出的 $p^* = 0.267$ 对比；然后是 $n = 5$ 个特征、$m = 2$ 个维数、重要性为 $0.7^i$ 的模型，报告存下了哪些特征、角度如何；最后把随机符号向量的两两余弦与 Welch 界 [[#eq-welch]] 以及 [[#thm-jl]] 的保证做比较。运行约需 $15$ 秒。

```python
import math, random

def train_toy(n, m, p, imp, steps=3000, batch=64, lr=0.01, seed=0):
    """Toy model of superposition: x' = ReLU(W^T W x + b), W (m, n), b (n,), trained with
    Adam on loss sum_i imp_i (x'_i - x_i)^2. Each feature is active with probability p,
    uniform on [0, 1] when active."""
    rng = random.Random(seed)
    W = [[rng.gauss(0, 0.5) for _ in range(n)] for _ in range(m)]
    b = [0.0] * n
    mW, vW = [[0.0] * n for _ in range(m)], [[0.0] * n for _ in range(m)]   # Adam 矩
    mb, vb = [0.0] * n, [0.0] * n
    def adam(mo, va, k, grad, t):                     # 返回单个元素的 Adam 步长
        mo[k] = 0.9 * mo[k] + 0.1 * grad
        va[k] = 0.999 * va[k] + 0.001 * grad * grad
        return lr * (mo[k] / (1 - 0.9 ** t)) / (math.sqrt(va[k] / (1 - 0.999 ** t)) + 1e-8)
    for t in range(1, steps + 1):
        gW = [[0.0] * n for _ in range(m)]; gb = [0.0] * n
        for _ in range(batch):
            x = [rng.random() if rng.random() < p else 0.0 for _ in range(n)]
            h = [sum(W[r][j] * x[j] for j in range(n)) for r in range(m)]            # (m,)
            pre = [sum(W[r][i] * h[r] for r in range(m)) + b[i] for i in range(n)]    # (n,)
            g = [2 * imp[i] * (max(0.0, pre[i]) - x[i]) * (pre[i] > 0) / batch for i in range(n)]
            gh = [sum(W[r][i] * g[i] for i in range(n)) for r in range(m)]
            for r in range(m):
                for j in range(n): gW[r][j] += g[j] * h[r] + gh[r] * x[j]
            for i in range(n): gb[i] += g[i]
        for r in range(m):
            for j in range(n): W[r][j] -= adam(mW[r], vW[r], j, gW[r][j], t)
        for i in range(n): b[i] -= adam(mb, vb, i, gb[i], t)
    return W, b

# 1. 两个特征，一维；特征 2 的重要性 r = 0.2。
#    两种配置的对比预测：在 p* = 4r/(2 + 5r) = 0.267 以下出现叠加。
for p in [0.6, 0.4, 0.3, 0.2, 0.1]:
    W, b = train_toy(2, 1, p, [1.0, 0.2])
    w1, w2 = W[0]
    kind = "antipodal (superposition)" if w1 * w2 < -0.25 else "feature 2 dropped"
    print(f"n=2, m=1, p={p}: W = ({w1:+.2f}, {w2:+.2f}), b = ({b[0]:+.2f}, {b[1]:+.2f})  -> {kind}")

# 2. 五个特征，两维，重要性 0.7^i：存下的特征，以及它们的角度。
for p in [1.0, 0.3, 0.05]:
    W, b = train_toy(5, 2, p, [0.7 ** i for i in range(5)], steps=4000, seed=1)
    norms = [math.hypot(W[0][j], W[1][j]) for j in range(5)]
    stored = [j for j in range(5) if norms[j] > 0.5]
    ang = sorted(round(math.degrees(math.atan2(W[1][j], W[0][j])) % 360) for j in stored)
    print(f"n=5, m=2, p={p}: norms {[round(v, 2) for v in norms]}, {len(stored)} stored, angles {ang}")

# 3. R^m 中 N 个随机符号向量能有多接近正交？
rng = random.Random(5)
for m, N in [(50, 400), (200, 400), (200, 1600)]:
    vs = [rng.getrandbits(m) for _ in range(N)]             # 整数的第 k 个比特 = 第 k 个符号
    cs = [abs(m - 2 * bin(vs[i] ^ vs[j]).count("1")) / m    # |<u, v>| = |m - 2 倍汉明距离| / m
          for i in range(N) for j in range(i)]
    welch = math.sqrt((N - m) / (m * (N - 1)))             # 任意 N 个单位向量都无法更好
    guarantee = math.sqrt(4 * math.log(N) / m)            # N <= exp(m eps^2 / 4) 即已足够
    print(f"m={m:3d} N={N:4d}: mean |cos| {sum(cs) / len(cs):.3f}, max |cos| {max(cs):.3f}; "
          f"Welch bound {welch:.3f}, guaranteed eps {guarantee:.3f}")
```

```text
n=2, m=1, p=0.6: W = (+1.00, -0.01), b = (+0.00, +0.30)  -> feature 2 dropped
n=2, m=1, p=0.4: W = (+1.00, +0.01), b = (-0.00, +0.19)  -> feature 2 dropped
n=2, m=1, p=0.3: W = (+1.04, -0.67), b = (+0.02, +0.10)  -> antipodal (superposition)
n=2, m=1, p=0.2: W = (+1.02, -0.91), b = (-0.00, +0.03)  -> antipodal (superposition)
n=2, m=1, p=0.1: W = (+1.00, -1.00), b = (-0.01, +0.00)  -> antipodal (superposition)
n=5, m=2, p=1.0: norms [1.0, 1.0, 0.02, 0.02, 0.01], 2 stored, angles [16, 286]
n=5, m=2, p=0.3: norms [1.01, 1.03, 0.99, 0.03, 0.91], 4 stored, angles [41, 133, 221, 311]
n=5, m=2, p=0.05: norms [1.12, 1.08, 1.13, 1.13, 0.96], 5 stored, angles [37, 115, 174, 240, 319]
m= 50 N= 400: mean |cos| 0.113, max |cos| 0.600; Welch bound 0.132, guaranteed eps 0.692
m=200 N= 400: mean |cos| 0.056, max |cos| 0.330; Welch bound 0.050, guaranteed eps 0.346
m=200 N=1600: mean |cos| 0.056, max |cos| 0.360; Welch bound 0.066, guaranteed eps 0.384
```

两个特征的运行在 $p = 0.4$ 与 $p = 0.3$ 之间从“专用”切换到“对跖”，与预测的 $0.267$ 相差不远；$p = 0.3$ 那次是上文提到的中间解之一（$\lvert w_2\rvert < \lvert w_1\rvert$、正偏置）。对稠密特征（$p = 1$），五个特征的模型把最重要的两个特征保持成直角（$286^\circ - 16^\circ = 270^\circ$，即 $90^\circ$）并丢弃其余，正如 [[#thm-linear]] 对线性模型的预测；在 $p = 0.3$ 时它存下四个，成两对互相垂直的对跖对（$41^\circ/221^\circ$ 与 $133^\circ/311^\circ$）；在 $p = 0.05$ 时存下全部五个，构成近似正五边形，间隔约 $72^\circ$。对随机向量而言，平均 $\lvert\cos\rvert$ 与 $\sqrt{2/(\pi m)}$ 吻合（$0.113$ 与 $0.056$），最大值介于 Welch 下界与联合界的保证之间，而把 $N$ 从 $400$ 翻两番到 $1600$，最大值也只从 $0.330$ 升到 $0.360$。

::: history
分布式表征——用大量单元上的模式来编码概念——是连接主义（connectionism）的核心（Hinton、McClelland 与 Rumelhart，1986），而自然图像的稀疏编码（Olshausen 与 Field，1996）表明，带稀疏系数的过完备字典能给出可解释的、局部化的特征。Nguyen、Yosinski 与 Clune（2016）以及 Olah 等人（2017、2020）在视觉模型中记录了多义神经元。Arora 等人（2018）表明词嵌入是可用稀疏编码恢复的词义的线性叠加。Elhage 等人（2022）在 Transformer Circuits Thread 上的《叠加的玩具模型》给出了系统性的论述：相变、几何、叠加中的计算，以及与多义性的联系；《Softmax 线性单元》论文（Elhage 等人，2022）则尝试从架构上减少多义性。Gurnee 等人（2023）在语言模型中对神经元做叠加探针，Park 等人（2023）形式化了线性表征假说，Engels 等人（2024）发现了多维的圆形特征。Johnson–Lindenstrauss 引理出自 1984 年，Welch 界出自 1974 年，霍夫丁（Hoeffding）不等式出自 1963 年。
:::

::: summary
- 人们认为网络把**特征**表征为**方向**；存储多于维数个特征就是**叠加**，当特征与神经元基不对齐时，它使神经元**多义**。
- $\R^m$ 中至少含有 $\exp(m\varepsilon^2/4)$ 个两两 $\lvert\cos\rvert<\varepsilon$ 的单位向量（随机符号向量加联合界）；而任何 $N > m$ 个单位向量都不可能让所有 $\lvert\cos\rvert$ 都低于 $\sqrt{(N - m)/(m(N - 1))}$（Welch）。$k$ 个激活的随机特征带来的干扰大小约为 $\sqrt{k/m}$，所以叠加需要**稀疏性**。
- 在玩具模型 $\hat{\mathbf{x}} = \operatorname{ReLU}(W\T W\mathbf{x} + \mathbf{b})$ 中，**线性**变体可证明地以正交方式保留最重要的 $m$ 个特征（Eckart–Young）；有了 ReLU，稀疏特征会被塞进**对跖对**与多胞体，并出现**相变**：对一维中的两个特征，当 $p < 4r/(2 + 5r)$ 时叠加胜过丢弃特征。
- 玩具模型的结果是简化设定下的经验发现；真实模型显示出相容的证据，也存在多维或非线性的特征。
- 叠加促使我们去寻找特征方向的过完备稀疏**字典**——[[interpretability/sparse-features]]。
:::

## 习题

::: exercise 平面中的三个向量 {level=1 check="0.5"}
用 Welch 界求 $\R^2$ 中三个单位向量的 $\max_{i\ne j}\lvert\mathbf{u}_i\cdot\mathbf{u}_j\rvert$ 的最小可能值，并给出达到该值的一组向量。
::: solution
$\sqrt{(3 - 2)/(2\cdot2)} = 0.5$。三个两两成 $120^\circ$ 的单位向量，两两余弦为 $\cos120^\circ = -0.5$，达到该界。
:::
:::

::: exercise 一个容量保证 {level=1 check="exp(10)"}
[[#thm-jl]] 保证了 $\R^{1000}$ 中有多少个两两 $\lvert\cos\rvert<0.2$ 的单位向量？
::: solution
$\exp(1000\times0.04/4) = \exp(10)\approx22{,}026$。
:::
:::

::: exercise 线性玩具模型的损失 {level=1 check="0.0667"}
一个线性玩具模型有 $n = 4$ 个特征，方差都等于 $1/12$（总是激活的 $[0, 1]$ 均匀分布），重要性为 $1, 0.8, 0.5, 0.3$，$m = 2$。最小损失是多少？给出四位小数。
::: solution
由 [[#thm-linear]]，模型保留最重要的两个特征，损失为 $\sum_{i>2}I_iv_i = (0.5 + 0.3)/12 = 0.0667$。
:::
:::

::: exercise 相边界 {level=2 check="4/9"}
对 $n = 2$、$m = 1$、重要性比 $r = 0.5$，计算使对跖配置胜过专用配置的密度 $p^*$。然后预测在 $p = 0.5$ 下训练的模型是否会使用叠加，并解释训练实际展示的结果（可以修改清单来检验：用 `imp = [1.0, 0.5]` 训练）。
::: solution
$p^* = 4(0.5)/(2 + 2.5) = 2/4.5 = 4/9\approx0.444$。在 $p = 0.5 > p^*$ 处，两种配置的对比预测专用配置。以重要性 $(1, 0.5)$ 训练，在 $p = 0.5$ 时得到 $W = (+1.04, -0.68)$、$\mathbf{b} = (+0.06, +0.21)$——部分叠加——而在 $p = 0.6$ 时得到 $W = (+1.00, -0.01)$（特征 $2$ 被丢弃）。训练出的模型进入叠加的密度比预测的*更高*一些，因为边界附近中间配置（更短的 $\mathbf{w}_2$ 加正偏置）胜过两个候选；两候选分析给出的是叠加开始划算之处的下界，而不是精确最优。
:::
:::

::: exercise 两个均匀变量的最小值 {level=2}
推导独立的 $x_1, x_2$ 服从 $[0, 1]$ 上均匀分布时 $\min(x_1, x_2)$ 的密度，并验证 $\E\min^2 = 1/6$。然后计算当激活特征改为 $[0, 2]$ 上的均匀分布、$r = 1$ 时对跖配置的损失。
::: solution
$\Prob(\min > t) = (1 - t)^2$，所以密度为 $2(1 - t)$，且 $\E\min^2 = \int_0^12(1 - t)t^2\,dt = 2(\tfrac13 - \tfrac14) = \tfrac16$。对 $[0, 2]$ 上的均匀分布，$\min$ 按 $2$ 缩放，故 $\E\min^2 = 4/6 = 2/3$，损失为 $p^2\cdot2\cdot\tfrac23 = \tfrac43p^2$（两个特征权重均为 $1$）。一切都按幅值的平方缩放，所以相边界不变：专用配置的损失同样按 $4$ 缩放。
:::
:::

::: exercise 干扰噪声 {level=2}
一个宽度 $m = 1024$ 的层沿随机单位方向存储特征。每个 token 激活 $k$ 个值为 $1$ 的特征。估计用点积读取某个激活特征时干扰的标准差，分别取 $k = 10$ 与 $k = 100$，并求使它保持在 $0.25$ 以下的最大 $k$。
::: solution
干扰是 $k - 1$ 个余弦的和，每个的方差约为 $1/m$，所以其标准差约为 $\sqrt{(k - 1)/m}$：$k = 10$ 时为 $\sqrt{9/1024} = 0.094$，$k = 100$ 时为 $\sqrt{99/1024} = 0.31$。要使 $\sqrt{(k - 1)/1024} < 0.25$，需要 $k - 1 < 64$，即 $k\le64$。带负偏置的 ReLU 读出可以像玩具模型里那样消去剩余干扰的大部分，所以真实网络能容忍的略多些。
:::
:::

::: exercise 单纯形达到 Welch 界 {level=3}
证明当 $N = m + 1$ 时 Welch 界等于 $1/m$，并证明以原点为中心的正单纯形的 $m + 1$ 个顶点归一化为单位长度后，两两内积都等于 $-1/m$。为什么玩具模型中会出现四面体（三维、四个特征）与三角形（二维、三个特征）？
::: solution
$\sqrt{(m + 1 - m)/(m\cdot m)} = 1/m$。对单纯形，$\sum_i\mathbf{u}_i = \mathbf{0}$（中心化），故 $0 = \lVert\sum_i\mathbf{u}_i\rVert^2 = (m + 1) + \sum_{i\ne j}\mathbf{u}_i\cdot\mathbf{u}_j$；由对称性，全部 $m(m + 1)$ 个非对角内积相等，为 $-(m + 1)/(m(m + 1)) = -1/m$。在 Welch 界上取等要求所有 $\lvert\cos\rvert$ 相等（即 $\sum_{i\ne j}G_{ij}^2\le N(N-1)\mu^2$ 取等），且 Gram 矩阵有 $m$ 个相等的非零特征值（即柯西-施瓦茨取等），单纯形满足这两点。当 $m$ 个维数中有 $m + 1$ 个同等重要的稀疏特征时，使最坏干扰最小的配置就是单纯形，而且它的干扰全部为*负*，在一个特征单独激活时会被 ReLU 消去——于是玩具模型稀疏区间中出现 $\R^2$ 中的三角形与 $\R^3$ 中的四面体。
:::
:::

::: exercise 特权基中的多义性 {level=3}
考虑带 $m$ 个神经元隐层 ReLU 的玩具模型变体：$\mathbf{h} = \operatorname{ReLU}(W\mathbf{x})$，$\hat{\mathbf{x}} = \operatorname{ReLU}(W\T\mathbf{h} + \mathbf{b})$。(a) 证明若 $n\le m$ 且特征沿不同的坐标轴存储（$\mathbf{w}_i = \mathbf{e}_{k(i)}$），则重构精确，且每个被使用的神经元都是单义的。(b) 若 $n = 2m$ 并用对跖技巧，每个神经元能存下两个特征吗？神经元的可解释性会发生什么？
::: solution
(a) $\mathbf{h} = \operatorname{ReLU}(\sum_ix_i\mathbf{e}_{k(i)})$ 有 $h_{k(i)} = x_i\ge0$、其余为零；$W\T\mathbf{h}$ 在第 $i$ 个坐标返回 $x_i$，所以 $\mathbf{b} = \mathbf{0}$ 时重构精确，且神经元 $k(i)$ 只对特征 $i$ 反应。(b) 在输出 ReLU 的玩具模型中，对跖对可行是因为隐值 $x_1 - x_2$ 可以为负。而隐层带 ReLU 时，$\operatorname{ReLU}(x_1 - x_2)$ 把 $x_2$ 完全丢掉，所以单个神经元存不下一对对跖特征；训练出的模型转而把特征摊到*多个*神经元上——例如两个神经元在两个特征上分别取权重 $(1, -1)$ 与 $(-1, 1)$ 就能恢复两者，而特征数超过神经元数时，每个神经元对多个特征都带正权重。于是每个神经元都会对若干互不相关的特征之一放电：它是多义的，其含义只能靠跨神经元找出特征方向来恢复——这正是稀疏字典学习的任务。
:::
:::

::: exercise 读一个五边形 {level=2}
在 [[#ex-neuron]] 中，特征 $1$ 以值 $1$ 激活，其余特征都不激活。对全部五个特征计算隐向量，以及 $\mathbf{b} = \mathbf{0}$ 时的重构 $\operatorname{ReLU}(W\T\mathbf{h})$。哪些重构是错的？偏置能如何修正它们？
::: solution
$\mathbf{h} = \mathbf{w}_1 = (1, 0)$，而 $W\T\mathbf{h}$ 的各个分量为 $\mathbf{w}_i\cdot\mathbf{w}_1 = \cos\theta_i$：$1, 0.309, -0.809, -0.809, 0.309$。经过 ReLU 后为 $(1, 0.309, 0, 0, 0.309)$。特征 $1$ 被精确重构，特征 $3, 4$ 正确地重构为 $0$，但特征 $2$ 与 $5$ 因正干扰得到 $0.309$ 的虚假值。在每个输出上加偏置 $b_i = -0.309$ 可将其消除（ReLU 把 $0.309 - 0.309 = 0$ 截掉），代价是真正激活的特征的输出也减少 $0.309$；把权重稍微放大即可补偿。训练出的玩具模型确实在稀疏区间学出了负偏置。
:::
:::
