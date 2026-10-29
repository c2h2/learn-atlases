语言模型输出的不是一个词。它输出的是整个词表上的一个**概率分布**——也许 “cat” 是$0.53$，“dog” 是$0.32$，其余各词摊上一点——而你读到的文本，就是从这个分布中一次一个词元地**采样**出来的。它的训练数据被当作来自文本上某个未知分布的样本，它的损失是在随机的迷你批次上取的平均，它的权重起初是随机数，它的许多评测结果都是带着误差线的估计。概率，正是陈述这一切的语言。

本章汇集整个图谱要用的概率：随机变量及其分布、期望与方差、联合概率与条件概率、把语言模型变成逐词元预测之乘积的链式法则、贝叶斯公式、高斯（Gauss）分布以及方差如何穿过一层，还有如何用模拟来采样与估计。严格的发展——概率空间、密度、极限定理——在数学图谱的[概率课程](/learn/maths/lesson.php?c=probability&l=probability-spaces)里；这里的重点是机器学习所依赖的那部分。

## 随机变量与分布 {#sec-rv}

**随机变量**是一个取值由机会决定的量：下一个词元、随机抽到的训练样本的标签、随机初始化权重的取值。形式上它是概率空间上的一个函数，但在实践中，它被自己的**分布**完全描述：它取哪些值，各以多大的概率。

::: definition 离散分布与连续分布 {#def-distribution}
在可数集$\mathcal{X}$中取值的**离散**随机变量$X$有一个**概率质量函数**$p(x) = \Prob(X = x)$，满足$p(x)\ge0$且$\sum_{x\in\mathcal{X}}p(x) = 1$。$\R^d$上的**连续**随机变量有一个**概率密度**$p(\mathbf{x})\ge0$，满足$\int p(\mathbf{x})\,d\mathbf{x} = 1$，从而$\Prob(X\in A) = \int_Ap(\mathbf{x})\,d\mathbf{x}$。实值随机变量的**累积分布函数**是$F(x) = \Prob(X\le x)$。
:::

本图谱里最重要的分布是最简单的那一个：一个有限的概率列表。

::: definition 类别分布 {#def-categorical}
随机变量$X$取值于$\{1, \dots, K\}$，若$\Prob(X = k) = p_k$，其中$p_k\ge0$且$\sum_kp_k = 1$，则称$X$服从以$\mathbf{p} = (p_1, \dots, p_K)$为参数的**类别分布**，记作$X\sim\operatorname{Cat}(\mathbf{p})$。所有这样的$\mathbf{p}$构成的集合是**概率单纯形**$\Delta^{K-1}$。$K = 2$的情形是**伯努利**（Bernoulli）分布，$\Prob(X = 1) = p$，$\Prob(X = 0) = 1 - p$。
:::

语言模型的下一个词元预测$p_\theta(\cdot\mid x_{<t})$就是$K = \lvert\mathcal{V}\rvert$个词元上的类别分布，通常由 logits 向量经$\operatorname{softmax}(\mathbf{z})$产生；softmax 恰好是从$\R^K$到单纯形内部的满射。还有几个分布出现得足够频繁，值得列在一处：

| 分布 | 取值 | 概率或密度 | 均值 | 方差 |
|---|---|---|---|---|
| 伯努利$(p)$ | $\{0, 1\}$ | $p^x(1-p)^{1-x}$ | $p$ | $p(1-p)$ |
| 二项$(n, p)$ | $\{0, \dots, n\}$ | $\binom nkp^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| 均匀$(a, b)$ | $[a, b]$ | $1/(b - a)$ | $(a + b)/2$ | $(b - a)^2/12$ |
| 正态$\Normal(\mu, \sigma^2)$ | $\R$ | $\frac{1}{\sqrt{2\pi}\sigma}e^{-(x-\mu)^2/2\sigma^2}$ | $\mu$ | $\sigma^2$ |
| 指数$(\lambda)$ | $[0, \infty)$ | $\lambda e^{-\lambda x}$ | $1/\lambda$ | $1/\lambda^2$ |

二项分布（Binomial）数的是$n$次独立伯努利试验中成功的次数——比如，若模型答对每道基准题的概率都是$p$，那么$n$道基准题里它答对了多少道。正态分布（也称高斯分布）是连续噪声的默认模型，也是初始权重的惯用分布。

::: widget distribution
dist: binomial
params: n=40, p=0.7
a: 24
b: 32
normal: true
caption: 一个模型在每道题上以$0.7$的概率相互独立地答对，$40$道题中答对题数的分布：均值$28$，标准差$\sqrt{40\cdot0.7\cdot0.3} = 2.9$。阴影区域是$\Prob(24\le X\le32)$。打开正态近似，你就能明白为什么小基准上的准确率会有几个百分点的浮动。
:::

::: warning 密度不是概率
概率质量至多为$1$，但概率密度可以是任意非负数：$[0, 0.1]$上的均匀密度在整个区间上都是$10$。只有密度的积分才是概率，而且对连续变量，每个单独的$x$都有$\Prob(X = x) = 0$。比较似然时这一点很重要：连续模型的对数密度可以为正，连续模型与离散模型的对数似然不在同一个尺度上。
:::

## 期望与方差 {#sec-expectation}

::: definition 期望、方差与协方差 {#def-expectation}
随机变量$X$的函数$g$的**期望**（均值）为

$$
\E[g(X)] = \sum_xg(x)\,p(x)\quad\text{或}\quad\E[g(X)] = \int g(x)\,p(x)\,dx.
$$

**方差**是$\Var(X) = \E\big[(X - \E X)^2\big] = \E[X^2] - (\E X)^2$，其平方根称为**标准差**；$X$与$Y$的**协方差**是$\Cov(X, Y) = \E\big[(X - \E X)(Y - \E Y)\big] = \E[XY] - \E X\,\E Y$。对随机向量$\mathbf{X}\in\R^d$，**协方差矩阵**的元素为$\Sigma_{ij} = \Cov(X_i, X_j)$。
:::

机器学习里满是期望。训练目标是一个期望损失$\E_{(x, y)\sim\text{数据}}[\ell(\theta; x, y)]$；小批量平均是它的一个随机估计；损失的梯度是逐样本梯度的期望。让这一切变得可处理的是下面两条法则。

::: proposition 期望的线性性；和的方差 {#prop-linearity}
对随机变量$X_1, \dots, X_n$与常数$a_1, \dots, a_n$，

$$
\E\Big[\sum_ia_iX_i\Big] = \sum_ia_i\E[X_i],
$$

无论$X_i$之间是否独立都成立。若它们两两不相关（特别地，若它们相互独立），则

$$
\Var\Big(\sum_ia_iX_i\Big) = \sum_ia_i^2\Var(X_i).
$$
:::

::: proof
线性性成立，是因为和与积分是线性的：$\E[aX + bY] = \sum_{x, y}(ax + by)p(x, y) = a\sum_xx\,p(x) + b\sum_yy\,p(y)$，这里用到把联合质量沿一个变量求和就得到另一个变量的边缘分布。对方差，记$\mu_i = \E X_i$；于是

$$
\Var\Big(\sum_ia_iX_i\Big) = \E\Big[\Big(\sum_ia_i(X_i - \mu_i)\Big)^2\Big] = \sum_{i, j}a_ia_j\Cov(X_i, X_j),
$$

若$i\ne j$的协方差都为零，就只剩下$a_i^2\Var(X_i)$这些项。独立蕴含零协方差，因为对独立变量有$\E[X_iX_j] = \E X_i\,\E X_j$。
:::

第二个公式有一个贯穿整个机器学习的推论：$X$的$n$份独立拷贝的平均$\bar X = \frac1n\sum_iX_i$的方差是$\Var(X)/n$，所以它的标准差按$1/\sqrt n$缩小。样本多采$100$倍，估计只精确$10$倍。这就是为什么小批量梯度随批次增大、噪声降得很慢，也是为什么一个基准要出上千道题，才能把准确率测到百分点以内。

::: example 类别变量的均值与方差 {#ex-mean-var}
一个模型的下一个词元以概率$0.5$、$0.3$、$0.2$分别取 “cat”、“dog” 或 “car”。设$X$为采样所得单词中元音字母的个数，$L$为“词元是 cat”这一事件的示性变量。求$\E L$与$\Var L$，以及$n = 400$份独立样本中 “cat” 所占比例的均值与方差。
::: solution
每个单词恰好有一个元音，所以$X = 1$恒成立：$\E X = 1$，$\Var X = 0$——随机变量可以是常数。$L$是$p = 0.5$的伯努利变量：$\E L = 0.5$，$\Var L = 0.5\cdot0.5 = 0.25$。$400$份样本中 “cat” 的比例$\bar L$均值为$0.5$、方差为$0.25/400 = 0.000625$，标准差$0.025$：反复做$400$份样本，观察到的比例通常落在$0.45$到$0.55$之间。
:::
:::

## 联合概率与条件概率 {#sec-conditional}

::: definition 联合分布、边缘分布与条件分布 {#def-conditional}
对两个随机变量$X$与$Y$，**联合分布**$p(x, y) = \Prob(X = x, Y = y)$给出每一对取值的概率。$X$的**边缘分布**是$p(x) = \sum_yp(x, y)$。当$p(x) > 0$时，给定$X = x$时$Y$的**条件分布**是

$$
p(y\mid x) = \frac{p(x, y)}{p(x)}.
$$

若对所有$x, y$都有$p(x, y) = p(x)\,p(y)$，即$p(y\mid x) = p(y)$，则称$X$与$Y$**独立**。（对连续变量，把质量换成密度、把求和换成积分。）
:::

条件化正是语言模型每一步都在做的操作：它报告**给定**此前词元时下一个词元的分布。把定义重新排列得$p(x, y) = p(x)\,p(y\mid x)$，反复运用这一事实，就得到自回归语言建模赖以成立的恒等式。

::: proposition 概率的链式法则 {#prop-chain-rule}
对随机变量$X_1, \dots, X_T$，

$$
p(x_1, x_2, \dots, x_T) = \prod_{t=1}^Tp(x_t\mid x_1, \dots, x_{t-1}) = \prod_{t=1}^Tp(x_t\mid x_{<t}),
$$ {#eq-chain-rule}

只要各条件概率有定义（$t = 1$的因子就是$p(x_1)$）。
:::

::: proof
对$T$归纳。$T = 1$时无需证明。若公式对$T - 1$成立，把条件概率的定义用于对$(X_{<T}, X_T)$，得$p(x_{<T}, x_T) = p(x_{<T})\,p(x_T\mid x_{<T})$，再把归纳假设代入$p(x_{<T})$，即得[[#eq-chain-rule]]。
:::

链式法则不含任何近似：**任何**序列上的分布都可以写成逐词元分布的乘积。因此语言模型$p_\theta(x_t\mid x_{<t})$定义了一个关于文本的完整概率分布，它可以逐位置训练，却仍然是在对整个序列建模。近似在别处——在模型有限的容量和上下文长度里，而不在因式分解里。更早的$n$元语法（n-gram）模型把$p(x_t\mid x_{<t})$近似为只条件于最后$n - 1$个词元，这就是所谓的**马尔可夫假设**。

::: example 一个句子的概率 {#ex-sentence}
某个模型在文本开头给 “the” 的概率$p(\textit{the}) = 0.05$，且$p(\textit{cat}\mid\textit{the}) = 0.01$、$p(\textit{sat}\mid\textit{the cat}) = 0.2$。它给三词文本 “the cat sat” 的概率是多少？其对数概率呢？
::: solution
由[[#eq-chain-rule]]，$p = 0.05\cdot0.01\cdot0.2 = 10^{-4}$。对数概率为$\ln0.05 + \ln0.01 + \ln0.2 = -2.996 - 4.605 - 1.609 = -9.210$。许多概率的乘积会迅速下溢——一篇$1000$词的文本的概率很容易小于$10^{-1000}$，比任何浮点数都小得多——所以模型总是在对数概率之和上工作。每个词元的平均负对数概率，这里是$9.210/3 = 3.07$纳特（nats），就是[[math-for-ml/information-theory]]中的交叉熵损失。
:::
:::

::: quiz
两个随机变量$X$与$Y$满足$\Cov(X, Y) = 0$。哪条陈述必定正确？
- [ ] $X$与$Y$独立
- [x] $\Var(X + Y) = \Var(X) + \Var(Y)$
- [ ] 对所有$x$和$y$，$p(y\mid x) = p(y)$
- [ ] $\E[XY] = 0$
::: solution
$\Var(X + Y) = \Var X + \Var Y + 2\Cov(X, Y)$，所以协方差为零恰好是方差可加所需的条件。协方差为零不蕴含独立（习题 6 给出一个反例），且$\E[XY] = \E X\,\E Y$，只有当均值为零时它才为零。
:::
:::

### 贝叶斯公式 {#sec-bayes}

::: theorem 贝叶斯公式 {#thm-bayes}
若$p(y) > 0$，则

$$
p(x\mid y) = \frac{p(y\mid x)\,p(x)}{p(y)} = \frac{p(y\mid x)\,p(x)}{\sum_{x'}p(y\mid x')\,p(x')}.
$$ {#eq-bayes}
:::

::: proof
由条件概率的定义，$p(x\mid y)p(y)$与$p(y\mid x)p(x)$都等于联合概率$p(x, y)$；两边除以$p(y)$。分母是边缘概率$p(y) = \sum_{x'}p(x', y)$，用同一个恒等式写出而已。
:::

贝叶斯公式反转一个条件：从每个假设$x$下证据$y$有多可能（**似然**）、以及每个假设事先有多可能（**先验**），它给出看到证据之后每个假设有多可能（**后验**）。它是[[math-for-ml/estimation]]中MAP 估计的基础，也是关于分类器与滤波器的推理的基础——在这类推理里，它纠正一个极常见的错误。

::: example 内容过滤器与基率 {#ex-bayes}
一个分类器负责标记有害请求。它标记$90\%$的有害请求（灵敏度），并误标$5\%$的无害请求（特异度为$95\%$）。每一百个请求中有一个是有害的。若一个请求被标记了，它有害的概率是多少？
::: solution
设$H$表示“有害”，$F$表示“被标记”。由[[#eq-bayes]]，

$$
\Prob(H\mid F) = \frac{\Prob(F\mid H)\Prob(H)}{\Prob(F\mid H)\Prob(H) + \Prob(F\mid\neg H)\Prob(\neg H)} = \frac{0.9\cdot0.01}{0.9\cdot0.01 + 0.05\cdot0.99} = \frac{0.009}{0.0585} = 0.154.
$$

被标记的请求中只有约$15\%$真正有害，尽管分类器在有害请求上是“$90\%$准确”的：无害请求要多得多，它们$5\%$的误报数反而以五比一以上的优势压过真正命中的数量。用自然频次来说：$10{,}000$个请求中有$100$个是有害的，其中$90$个被标记；而$9{,}900$个无害请求中也有$495$个被标记。
:::
:::

::: widget bayes
mode: test
prevalence: 0.01
sensitivity: 0.9
specificity: 0.95
caption: [[#ex-bayes]]的自然频次视图。调高流行率，被标记的请求就大多是真阳性；调低它，即使是出色的分类器也大多产生误报。把$\Prob(F\mid H)$与$\Prob(H\mid F)$混为一谈，就是基率谬误。
:::

## 高斯分布与方差穿过一层 {#sec-gaussian}

::: definition 多元正态分布 {#def-gaussian}
随机向量$\mathbf{X}\in\R^d$服从**多元正态分布**$\Normal(\boldsymbol{\mu}, \Sigma)$（均值$\boldsymbol{\mu}$、协方差$\Sigma$正定），若其密度为

$$
p(\mathbf{x}) = \frac{1}{(2\pi)^{d/2}\det(\Sigma)^{1/2}}\exp\Big(-\tfrac12(\mathbf{x} - \boldsymbol{\mu})^\top\Sigma^{-1}(\mathbf{x} - \boldsymbol{\mu})\Big).
$$

**标准正态分布**是$\Normal(\mathbf{0}, I)$，其各坐标是相互独立的$\Normal(0, 1)$变量。
:::

高斯分布对网络所做的运算是封闭的：若$\mathbf{X}\sim\Normal(\boldsymbol{\mu}, \Sigma)$，则$A\mathbf{X} + \mathbf{b}\sim\Normal(A\boldsymbol{\mu} + \mathbf{b}, A\Sigma A^\top)$；高斯分布的边缘分布和条件分布仍是高斯的。密度的等值面是椭球，其轴就是$\Sigma$的特征向量（[[math-for-ml/matrix-decompositions]]）。中心极限定理——许多独立的微小效应之和近似服从正态分布——解释了为什么高斯分布是如此好用的默认选择。

方差在深度学习中最直接的用途，是确定随机初始权重的尺度。

::: proposition 方差穿过线性层 {#prop-init}
设$y = \sum_{j=1}^nW_jx_j$，其中权重$W_j$相互独立、均值为$0$、方差为$\sigma_w^2$，且与输入$x_j$独立，输入满足$\E[x_j^2] = v$。则$\E y = 0$，且

$$
\Var(y) = n\,\sigma_w^2\,v.
$$

当$\sigma_w^2 = 1/n$时，输出与输入有相同的二阶矩。
:::

::: proof
$\E[W_jx_j] = \E W_j\,\E x_j = 0$，故$\E y = 0$。各项$W_jx_j$不相关：当$j\ne k$时，$\E[W_jx_jW_kx_k] = \E W_j\,\E[x_jW_kx_k] = 0$，因为$W_j$与其余一切独立且均值为零。由[[#prop-linearity]]，$\Var y = \sum_j\Var(W_jx_j) = \sum_j\E[W_j^2]\E[x_j^2] = n\sigma_w^2v$。
:::

若不作这一缩放，信号每过一层就会按因子$n\sigma_w^2$增长或缩小，随深度成倍地爆炸或消失。取$\sigma_w^2 = 1/n_{\text{in}}$就是**LeCun 初始化**；Glorot 与 Bengio（2010）提出$2/(n_{\text{in}} + n_{\text{out}})$来平衡前向与反向传播；He 等人（2015）对 ReLU 网络使用$2/n_{\text{in}}$，因为 ReLU 会把对称输入的一半置零，从而把其二阶矩减半。

::: example GPT-2 宽度下的初始权重 {#ex-init}
对一个有$n_{\text{in}} = 768$个输入的层，LeCun 初始化与 He 初始化下权重的标准差应是多少？GPT-2 从$\Normal(0, 0.02^2)$抽取初始权重；对单位方差的输入，这给出多大的输出方差？
::: solution
LeCun：$\sigma_w = 1/\sqrt{768} = 0.0361$。He：$\sigma_w = \sqrt{2/768} = 0.0510$。取$\sigma_w = 0.02$，由[[#prop-init]]得$\Var y = 768\cdot0.0004\cdot1 = 0.307$：单看这样一层，它把信号的方差缩到约三分之一。在 Transformer 中这并不要紧，因为[[transformers/transformer-block]]中的残差连接与归一化层无论如何都会把残差流的尺度控制住。
:::
:::

## 采样与蒙特卡洛 {#sec-sampling}

要生成文本，模型必须从$\operatorname{Cat}(\mathbf{p})$中抽一个词元。标准方法只需要均匀随机数。

::: algorithm 类别分布的逆累积分布函数采样 {#alg-sample}
输入：和为$1$的概率$p_1, \dots, p_K$。

1. 从$[0, 1)$中均匀抽取$U$。
2. 返回满足$U < p_1 + \dots + p_k$的最小$k$。

结果的分布正是$\operatorname{Cat}(\mathbf{p})$，因为$U$落在长度为$p_k$的区间$[p_1 + \dots + p_{k-1},\ p_1 + \dots + p_k)$内的概率恰为$p_k$。
:::

解码策略在采样之前先重塑$\mathbf{p}$：**温度**$\tau$把 logits $\mathbf{z}$换成$\mathbf{z}/\tau$，$\tau < 1$时分布变尖锐，$\tau > 1$时变平缓；top-$k$与 top-$p$采样把尾部置零再重新归一化。下面的代码在两个温度下各采样$10{,}000$个词元，把观察频率与概率作比较。

```python
import math, random

def softmax(z, tau=1.0):
    m = max(z)
    e = [math.exp((v - m) / tau) for v in z]
    s = sum(e)
    return [v / s for v in e]

def sample(p, rng):
    # 从类别分布 p（和为 1 的列表）做逆累积分布函数采样
    u, c = rng.random(), 0.0              # u 是 [0, 1) 上的均匀变量
    for i, pi in enumerate(p):
        c += pi                            # c 是 i 处的累积分布函数值
        if u < c:
            return i
    return len(p) - 1                      # 防止最后一个区间因舍入被漏掉

vocab = ["cat", "dog", "car", "sky"]
z = [2.0, 1.5, 0.5, -1.0]                  # logits，形状 (|V|,) = (4,)
rng = random.Random(0)
for tau in (1.0, 0.5):
    p = softmax(z, tau)
    n = 10000
    counts = [0] * len(z)
    for _ in range(n):
        counts[sample(p, rng)] += 1
    print("tau", tau, "p", [round(x, 3) for x in p], "freq", [c / n for c in counts])
```

```text
tau 1.0 p [0.532, 0.323, 0.119, 0.026] freq [0.5301, 0.3276, 0.1173, 0.025]
tau 0.5 p [0.704, 0.259, 0.035, 0.002] freq [0.7034, 0.2566, 0.0379, 0.0021]
```

在$\tau = 0.5$下，不大可能的词元 “sky” 几乎消失（$0.2\%$），最可能的词元占了$70\%$。频率与概率之差在$\sqrt{p(1 - p)/n}$的量级——对$p = 0.53$、$n = 10{,}000$约为$0.005$——正如[[#prop-linearity]]所预言的。同一条法则支配着每一个**蒙特卡洛估计**：用随机样本上函数的平均，来代替无法精确计算的期望；这种估计是无偏的，其标准误差为$\sigma/\sqrt n$。

::: example 需要多少样本？ {#ex-monte-carlo}
某个验证集上，逐词元损失在各词元之间的标准差约为$2$纳特。要把平均损失估到标准误差$0.02$纳特，需要多少个独立词元？而对一个准确率接近$70\%$的基准，要出多少道题，才能使其标准误差为$1$个百分点？
::: solution
标准误差是$\sigma/\sqrt n$，所以$n = (\sigma/0.02)^2 = (2/0.02)^2 = 10{,}000$个词元——对损失来说轻而易举，它是在数百万词元上度量的。对准确率，每道题是一个$\sigma = \sqrt{0.7\cdot0.3} = 0.458$的伯努利变量，所以$n = (0.458/0.01)^2 = 2100$道题。一个$200$题的基准，标准误差为$\sqrt{0.21/200} = 3.2$个百分点；两个模型在上面对分之差为$3$分时无法可靠区分（见[[math-for-ml/estimation]]）。
:::
:::

::: widget clt
dist: bernoulli
n: 50
samples: 2000
caption: 每根柱子统计的是$n$次伯努利抽取的平均——一个每题答对概率为$0.2$的模型在$n$题基准上的准确率——在$2000$次模拟基准中取各个值的次数。散布按$1/\sqrt n$收缩，形状向中心极限定理预言的正态曲线靠拢。调大$n$，观察直方图如何变窄。
:::

::: application 训练中的随机性
随机性从好几处进入训练，每一处都有自己的分布：初始权重（高斯分布或均匀分布，按[[#prop-init]]缩放）、数据顺序与每个小批量的构成（不放回的均匀抽样）、dropout 掩码（独立的伯努利变量），以及在基于反馈的强化学习中，模型自身被采样出的回答。固定随机数生成器的种子，能让一次运行在相同的硬件与软件上可复现；但换不同种子的两次运行，在小规模评测上仍可能明显不同——运行间方差本身就是值得测量和报告的量。
:::

::: history
概率始于赌局：1654年帕斯卡（Pascal）与费马（Fermat）的通信，讨论的是如何平分一场被打断的赌局的赌注。雅各布·伯努利（Jacob Bernoulli）的《猜度术》（Ars Conjectandi，1713年出版）证明了第一个大数定律，棣莫弗（de Moivre）找到了二项分布的正态近似（1733），托马斯·贝叶斯（Thomas Bayes）关于逆概率的论文由理查德·普赖斯（Richard Price）在其去世后的1763年发表；拉普拉斯（Laplace）发展了贝叶斯推理与中心极限定理，见于其《概率的解析理论》（Théorie analytique des probabilités，1812）。马尔可夫（Markov）（1913）用以他命名的链分析了普希金（Pushkin）诗体小说《叶甫盖尼·奥涅金》中元音与辅音的序列——这是最早的文本统计模型。柯尔莫哥洛夫（Kolmogorov）的公理（1933）把概率建立在测度论的地基上；蒙特卡洛方法则由乌拉姆（Ulam）、冯·诺依曼（von Neumann）与梅特罗波利斯（Metropolis）在1940年代末命名并发展。
:::

::: summary
- 语言模型的输出是词表上的类别分布，通常就是 logits 的$\operatorname{softmax}(\mathbf{z})$；密度描述连续变量，其值可以超过$1$。
- 期望是线性的；不相关变量的方差可加，于是$n$份独立样本的平均的标准差为$\sigma/\sqrt n$。
- $p(y\mid x) = p(x, y)/p(x)$。链式法则$p(x_{1:T}) = \prod_tp(x_t\mid x_{<t})$是精确的，是自回归语言建模的根基；工作时要使用对数概率。
- 贝叶斯公式把似然与先验变成后验；先验很小时，即使是准确的检测器也大多产生误报。
- 线性层把输入的方差乘以$n\sigma_w^2$，这决定了初始权重的尺度。类别变量用逆累积分布函数采样；蒙特卡洛估计的标准误差为$\sigma/\sqrt n$。
:::

## 习题

::: exercise 均值与方差 {level=1 check="0.61"}
随机变量以概率$0.5$、$0.3$、$0.2$取值$0$、$1$、$2$。求它的均值与方差。
::: solution
$\E X = 0 + 0.3 + 0.4 = 0.7$，$\E X^2 = 0 + 0.3 + 0.8 = 1.1$，故$\Var X = 1.1 - 0.49 = 0.61$。
:::
:::

::: exercise 文本的对数概率 {level=1 check="log(0.1)+log(0.02)+log(0.5)+log(0.3)"}
一个模型对一篇文本的四个词元给出的下一个词元概率依次为$0.1$、$0.02$、$0.5$和$0.3$。这篇文本的自然对数概率是多少？每个词元的平均负对数概率呢？
::: solution
由[[#eq-chain-rule]]，对数概率为$\ln0.1 + \ln0.02 + \ln0.5 + \ln0.3 = -2.303 - 3.912 - 0.693 - 1.204 = -8.112$，所以这篇文本的概率为$0.1\cdot0.02\cdot0.5\cdot0.3 = 3\times10^{-4}$，平均负对数概率为每词元$2.028$纳特。
:::
:::

::: exercise 组合的方差 {level=1 check="21"}
$X$与$Y$独立，$\Var X = 1$，$\Var Y = 3$。$\Var(3X - 2Y)$是多少？
::: solution
由[[#prop-linearity]]，$\Var(3X - 2Y) = 9\Var X + 4\Var Y = 9 + 12 = 21$。负号不会减小方差：系数要平方。
:::
:::

::: exercise 检测器的精确率 {level=2 check="0.019/(0.019+0.098)"}
一个机器生成文本检测器会标记$95\%$的机器生成文章和$10\%$的人类撰写文章。某个文集里$2\%$的文章是机器生成的。被标记的文章中，机器生成的占多大比例？
::: solution
由[[#eq-bayes]]，$\Prob(G\mid F) = \dfrac{0.95\cdot0.02}{0.95\cdot0.02 + 0.10\cdot0.98} = \dfrac{0.019}{0.019 + 0.098} = 0.162$。被标记的文章中六分之五以上是人工撰写的——这有力地说明，不应把这种检测器对单篇文章的判定当作证据。
:::
:::

::: exercise 宽层的初始化 {level=2 check="1/64"}
一个线性层有$4096$个输入，每个输入的二阶矩为$1$。要使输出方差为$1$，相互独立、零均值的权重的标准差必须是多少？若权重标准差改为$0.02$，输出方差又是多少？
::: solution
由[[#prop-init]]，需要$4096\,\sigma_w^2 = 1$，所以$\sigma_w = 1/64 = 0.015625$。取$\sigma_w = 0.02$时输出方差为$4096\cdot0.0004 = 1.6384$。
:::
:::

::: exercise 不相关但相依 {level=2}
设$X$在$\{-1, 0, 1\}$上均匀分布，$Y = X^2$。证明$\Cov(X, Y) = 0$，但$X$与$Y$不独立。
::: solution
$\E X = 0$，$\E[XY] = \E[X^3] = (-1 + 0 + 1)/3 = 0$，故$\Cov(X, Y) = \E[XY] - \E X\,\E Y = 0$。但$\Prob(X = 0, Y = 1) = 0$，而$\Prob(X = 0)\Prob(Y = 1) = \frac13\cdot\frac23 = \frac29$，所以它们不独立：$Y$甚至就是$X$的函数。协方差只度量*线性*相依。
:::
:::

::: exercise 一个尾部概率 {level=2 check="(1-erf(1/sqrt(2)))/2"}
某层的预激活服从$\Normal(2, 9)$。它们有多大比例超过$5$？（对标准正态$Z$使用$\Prob(Z > z) = \frac12\big(1 - \operatorname{erf}(z/\sqrt2)\big)$。）
::: solution
标准化：$(5 - 2)/3 = 1$，所以比例为$\Prob(Z > 1) = \frac12(1 - \operatorname{erf}(1/\sqrt2)) = 0.1587$，约六分之一——即熟悉的“均值之上一个标准差以外”。
:::
:::

::: exercise 比较所需样本量 {level=2 check="22500"}
某个模型的逐样本损失标准差为$1.5$。要使平均损失的标准误差为$0.01$，需要多少个独立样本？
::: solution
由$1.5/\sqrt n = 0.01$得$\sqrt n = 150$，所以$n = 22{,}500$。
:::
:::

::: exercise 全方差公式 {level=3}
证明$\Var(Y) = \E\big[\Var(Y\mid X)\big] + \Var\big(\E[Y\mid X]\big)$。就小批量训练的梯度噪声解释它的含义：其中$X$是训练样本的选择，$Y$是在带 dropout 时计算的逐样本梯度的某个坐标。
::: solution
记$m(X) = \E[Y\mid X]$。则$\E[Y^2\mid X] = \Var(Y\mid X) + m(X)^2$，两边取期望（塔式法则$\E[\E[\,\cdot\mid X]] = \E[\,\cdot\,]$）得$\E Y^2 = \E[\Var(Y\mid X)] + \E[m(X)^2]$。又有$\E Y = \E[m(X)]$，所以$\Var Y = \E Y^2 - (\E m(X))^2 = \E[\Var(Y\mid X)] + \big(\E[m(X)^2] - (\E m(X))^2\big)$，最后那个括号就是$\Var(m(X))$。就训练而言，总梯度噪声分成两部分：固定样本下 dropout 带来的噪声（第一项），以及期望梯度随样本的变化（第二项）；加大批次取平均能同时减小两者，但只有第一项能靠关掉 dropout 来消除。
:::
:::

::: exercise Gumbel-max 技巧 {level=3}
设$G_1, \dots, G_K$相互独立，都服从标准 Gumbel 分布，$\Prob(G\le g) = \exp(-e^{-g})$。证明对 logits $z_1, \dots, z_K$，

$$
\Prob\Big(\arg\max_k(z_k + G_k) = j\Big) = \frac{e^{z_j}}{\sum_ke^{z_k}}.
$$

这对从 softmax 采样意味着什么？
::: solution
$G$的密度为$f(g) = e^{-g}\exp(-e^{-g})$。下标$j$获胜是指$z_j + G_j = s$且其余每个$z_k + G_k < s$；对$s$积分，

$$
\Prob(j\text{ 获胜}) = \int_{-\infty}^\infty f(s - z_j)\prod_{k\ne j}\exp\big(-e^{-(s - z_k)}\big)\,ds = \int_{-\infty}^\infty e^{z_j}e^{-s}\exp\Big(-e^{-s}\sum_ke^{z_k}\Big)\,ds,
$$

其中$f(s - z_j)$带来的因子$\exp(-e^{-(s - z_j)})$已并入乘积。作代换$t = e^{-s}$，$dt = -e^{-s}\,ds$，积分化为$\int_0^\infty e^{z_j}\exp(-tS)\,dt = e^{z_j}/S$，其中$S = \sum_ke^{z_k}$。所以，从$\operatorname{softmax}(\mathbf{z})$采样等价于给 logits 加上独立的 Gumbel 噪声再取 argmax——不需要归一化，也不需要累积和。这在加速器上的并行采样中有所应用；把它松弛化后，还能对离散选择求导（Gumbel-softmax）。
:::
:::

::: exercise 匹配目标值的温度 {level=3}
对 logits $(2, 0)$，求使较可能的词元概率恰好为$0.8$的温度$\tau$，并用朴素 Python 以$20{,}000$个样本模拟，检验其频率是否接近$0.8$。
::: solution
两个 logits 时概率为$1/(1 + e^{-2/\tau})$。令其等于$0.8$得$e^{-2/\tau} = 0.25$，即$2/\tau = \ln4$，$\tau = 2/\ln4 = 1/\ln2\approx1.443$。

```python
import math, random

tau = 1 / math.log(2)
p0 = 1 / (1 + math.exp(-2 / tau))          # 第一个词元的概率
rng = random.Random(1)
n = 20000
hits = sum(rng.random() < p0 for _ in range(n))
print(round(tau, 4), round(p0, 4), hits / n)
```

```text
1.4427 0.8 0.7985
```

频率的标准误差为$\sqrt{0.8\cdot0.2/20000} = 0.0028$，观察到的$0.7985$与$0.8$相距约半个标准误差。
:::
:::
