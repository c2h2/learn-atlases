向学习模型提出的大多数问题只有有限个答案：是不是垃圾邮件，十个数字中的哪一个，五万个词元中的哪一个接在后面。本章为这类问题构造标准的线性模型。它的关键一步，不是预测标签而是给每个标签一个**概率**：把一个线性得分送入逻辑函数（两类时）或 softmax 函数（多类时），再用最大似然来拟合——那恰恰意味着极小化**交叉熵损失**。这样得到的逻辑回归有一个凸的损失和一个简单的梯度——预测减目标，再乘输入——而这个梯度逐行逐字地就是每一个神经网络分类器和每一个语言模型的输出层的梯度。

本章使用[[ml-fundamentals/linear-regression]]的最小二乘机制、[[math-for-ml/information-theory]]的交叉熵与KL散度，以及[[math-for-ml/gradients#prop-softmax-ce]]的 softmax 梯度（不再重新推导）。凸性、以及它为何使梯度下降可靠，见[[math-for-ml/optimisation]]。

## 从得分到概率 {#sec-scores}

设标签$y\in\{0, 1\}$。完全可以直接对$0/1$标签做最小二乘，并在拟合值超过$1/2$时预测$1$。作为分类器它勉强能用，但拟合值不是概率——它们会低于$0$、高于$1$——而且平方损失会惩罚一个预测正确却*过于*自信的样本：标签为$1$、得分为$5$的点平方损失是$16$，于是少数几个离边界很远的简单样本就会把边界从难样本那里撬开。我们想要的是一个线性的**得分**$z = \mathbf{w}^\top\mathbf{x} + b$，它可以是任意实数，再单调地映进$(0, 1)$。

::: definition 逻辑函数 {#def-sigmoid}
**逻辑函数**（**sigmoid**函数）为

$$
\sigma(z) = \frac1{1 + e^{-z}} = \frac{e^z}{1 + e^z}.
$$

它从$0$单调升到$1$，$\sigma(0) = 1/2$，并满足$\sigma(-z) = 1 - \sigma(z)$与$\sigma'(z) = \sigma(z)(1 - \sigma(z))$。它的反函数是**logit**，即对数几率（log-odds），$\sigma^{-1}(p) = \log\dfrac{p}{1 - p}$。
:::

两个恒等式各只需一行：$\sigma(-z) = 1/(1 + e^z) = e^{-z}/(e^{-z} + 1) = 1 - \sigma(z)$；对$(1 + e^{-z})^{-1}$求导得$e^{-z}/(1 + e^{-z})^2 = \sigma(z)\cdot(1 - \sigma(z))$。解方程$p = 1/(1 + e^{-z})$求$z$就得到 logit。

::: definition 逻辑回归 {#def-logistic}
对$y\in\{0, 1\}$的**逻辑回归**模型为

$$
\Prob(y = 1\mid\mathbf{x}) = \sigma(\mathbf{w}^\top\mathbf{x} + b),
$$

等价地，类别$1$的对数几率对特征是线性的：$\log\dfrac{\Prob(y = 1\mid\mathbf{x})}{\Prob(y = 0\mid\mathbf{x})} = \mathbf{w}^\top\mathbf{x} + b$。作为分类器，它在$\Prob(y = 1\mid\mathbf{x}) > 1/2$时预测$1$，亦即$\mathbf{w}^\top\mathbf{x} + b > 0$时：**决策边界**是超平面$\mathbf{w}^\top\mathbf{x} + b = 0$。
:::

权重向量垂直于决策边界并指向类别$1$，得分随到边界的距离增长：与边界带符号距离为$\delta$的点得分为$z = \lVert\mathbf{w}\rVert\delta$。所以$\lVert\mathbf{w}\rVert$决定了离开边界后预测概率从$1/2$走向近乎确定的速度——是陡峭的过渡还是平缓的过渡。

::: widget plot
f: 1/(1 + exp(-(w*x + b)))
x: -6, 6
y: 0, 1
sliders: w=1:-4:4:0.1; b=0:-5:5:0.1
hlines: 0.5
labels: $\sigma(wx + b)$
caption: 单个特征下逻辑模型$\Prob(y = 1\mid x) = \sigma(wx + b)$的图像。曲线在决策边界$x = -b/w$处穿过$1/2$；$b$使它平移，$\lvert w\rvert$决定它有多陡，负的$w$把它翻转。当$\lvert w\rvert\to\infty$时曲线变成台阶：一个不表达任何不确定性的硬分类器。
:::

::: example 读一个逻辑模型 {#ex-odds}
一个判断邮件是否垃圾的模型截距为$b = -3$，链接数的权重为$0.8$，发件人未知这一示性变量的权重为$2.0$。求一封来自未知发件人、含$2$个链接的邮件的垃圾概率，并解释权重$0.8$。
::: solution
得分为$z = -3 + 0.8\cdot2 + 2.0\cdot1 = 0.6$，故$\Prob(\text{垃圾}) = \sigma(0.6) = 1/(1 + e^{-0.6}) = 0.646$。对数几率是线性的，所以每多一个链接，对数几率增加$0.8$，**几率**（odds）$p/(1 - p)$就乘以$e^{0.8} = 2.23$，无论其他特征是什么。从$0.646$（几率$1.82$）出发，第三个链接使几率变为$4.06$、概率变为$0.802$。每个链接带来的*概率*变化并不恒定——在$p = 1/2$附近最大、在$0$或$1$附近很小——这就是逻辑模型的系数要报成几率比（odds ratio）的原因。
:::
:::

## 最大似然与交叉熵损失 {#sec-likelihood}

模型为每个标签指定了一个伯努利（Bernoulli）分布，因此可以用最大似然来拟合（[[math-for-ml/estimation#def-mle]]）。记$p_i = \sigma(z_i)$，$z_i = \mathbf{w}^\top\mathbf{x}_i + b$；与线性回归一样，我们用一个常数特征把$b$吸收进$\mathbf{w}$。

::: proposition 逻辑损失 {#prop-logistic-loss}
逻辑回归的平均负对数似然是**二元交叉熵**

$$
\mathcal{L}(\mathbf{w}) = -\frac1n\sum_{i=1}^n\Big[y_i\log p_i + (1 - y_i)\log(1 - p_i)\Big].
$$ {#eq-bce}

把标签改写为$\tilde y_i = 2y_i - 1\in\{-1, +1\}$后，它是$\frac1n\sum_i\log\big(1 + e^{-\tilde y_iz_i}\big)$，即间隔$\tilde y_iz_i$的逻辑损失（[[ml-fundamentals/learning-problem#sec-surrogates]]）。
:::

::: proof
$y_i$的伯努利概率是$p_i^{y_i}(1 - p_i)^{1 - y_i}$；取负对数再平均即[[#eq-bce]]。$y_i = 1$时该项为$-\log\sigma(z_i) = \log(1 + e^{-z_i})$；$y_i = 0$时为$-\log(1 - \sigma(z_i)) = -\log\sigma(-z_i) = \log(1 + e^{z_i})$；两者都是$\log(1 + e^{-\tilde y_iz_i})$。
:::

式[[#eq-bce]]就是观测标签（看成把全部质量放在$y_i$上的分布）与预测的伯努利$(p_i)$分布之间的交叉熵——语言模型极小化的是同一个量，只不过两类换成整个词表。它重罚自信的错误：真实标签为$1$却预测$p = 0.01$，代价是$-\log0.01 = 4.6$纳特（nats）；而对不置可否的$p = 1/2$只需$0.69$。

::: proposition 逻辑损失的梯度与黑塞矩阵 {#prop-logistic-grad}
$$
\nabla\mathcal{L}(\mathbf{w}) = \frac1n\sum_{i=1}^n(p_i - y_i)\,\mathbf{x}_i = \frac1nX^\top(\mathbf{p} - \mathbf{y}),
\qquad
\nabla^2\mathcal{L}(\mathbf{w}) = \frac1n\sum_{i=1}^np_i(1 - p_i)\,\mathbf{x}_i\mathbf{x}_i^\top = \frac1nX^\top SX,
$$ {#eq-logistic-grad}

其中$S = \operatorname{diag}\big(p_i(1 - p_i)\big)$。
:::

::: proof
对单个样本，$\ell = -y\log\sigma(z) - (1 - y)\log(1 - \sigma(z))$。用$\sigma' = \sigma(1 - \sigma)$，

$$
\frac{\partial\ell}{\partial z} = -y\frac{\sigma(1 - \sigma)}{\sigma} + (1 - y)\frac{\sigma(1 - \sigma)}{1 - \sigma} = -y(1 - \sigma) + (1 - y)\sigma = \sigma(z) - y.
$$

由$z = \mathbf{w}^\top\mathbf{x}$，链式法则给出$\nabla_{\mathbf{w}}\ell = (\sigma(z) - y)\mathbf{x}$，取平均即得梯度。对$(\sigma(\mathbf{w}^\top\mathbf{x}) - y)\mathbf{x}$再求一次导，得$\sigma'(z)\mathbf{x}\mathbf{x}^\top = p(1 - p)\mathbf{x}\mathbf{x}^\top$。
:::

与最小二乘对比，它的梯度是$\frac2nX^\top(X\mathbf{w} - \mathbf{y})$：两种情形都是**（预测 − 目标）× 输入**。这不是巧合——两者都是用“正则”链接、以最大似然拟合的广义线性模型——而这正是反向传播在分类器输出端起步的模式。

::: theorem 逻辑损失是凸的 {#thm-convex}
$\mathcal{L}$对$\mathbf{w}$是凸的。若$X$列满秩，则它严格凸，因而至多有一个极小点，且任何驻点都是全局最小值。
:::

::: proof
对任意$\mathbf{v}$，$\mathbf{v}^\top\nabla^2\mathcal{L}\,\mathbf{v} = \frac1n\sum_ip_i(1 - p_i)(\mathbf{x}_i^\top\mathbf{v})^2\ge0$，故黑塞矩阵处处半正定，$\mathcal{L}$凸。每个$p_i$都严格介于$0$与$1$之间，所以每个权重$p_i(1 - p_i)$为正，而该和为零仅当所有$\mathbf{x}_i^\top\mathbf{v} = 0$，即$X\mathbf{v} = \mathbf{0}$。列满秩时这迫使$\mathbf{v} = \mathbf{0}$：黑塞矩阵正定，$\mathcal{L}$严格凸。严格凸函数至多有一个极小点；而对可微凸函数，每个驻点都是极小点（[[math-for-ml/optimisation#prop-convex]]）。
:::

与最小二乘不同，令梯度为零给不出封闭形式：$\mathbf{p}$非线性地依赖于$\mathbf{w}$。逻辑回归只能迭代拟合——用梯度下降，或牛顿法；后者对这个模型叫作**迭代再加权最小二乘**，因为每个牛顿步都解一个以$S$为权重的加权最小二乘问题（习题9）。凸性保证两种方法只要执行得当，都找到全局最小值。

::: example 手算一个梯度步 {#ex-step}
两个样本，带常数特征：$\mathbf{x}_1 = (1, 1)$配$y_1 = 1$，$\mathbf{x}_2 = (1, -1)$配$y_2 = 0$。从$\mathbf{w} = \mathbf{0}$出发，取$\eta = 1$走一个梯度步，并比较前后的损失。
::: solution
$\mathbf{w} = \mathbf{0}$时两个概率都是$\sigma(0) = 1/2$，损失为$\log2 = 0.693$。由[[#eq-logistic-grad]]，

$$
\nabla\mathcal{L} = \tfrac12\big[(\tfrac12 - 1)(1, 1) + (\tfrac12 - 0)(1, -1)\big] = \tfrac12\big[(-\tfrac12, -\tfrac12) + (\tfrac12, -\tfrac12)\big] = (0, -\tfrac12).
$$

于是$\mathbf{w}\leftarrow\mathbf{0} - 1\cdot(0, -\frac12) = (0, \frac12)$。现在$z_1 = 0.5$、$z_2 = -0.5$，故$p_1 = \sigma(0.5) = 0.622$、$p_2 = 0.378$；每个样本的损失为$-\log0.622 = 0.474$，平均值从$0.693$降到$0.474$。截距的梯度为零，因为类别$1$的预测比例$(p_1 + p_2)/2 = 1/2$已经与观测到的比例相符。
:::
:::

### 最大值不存在的时候 {#sec-separable}

严格凸只说明极小点*至多*一个。有时一个也没有。

::: proposition 可分数据没有最大似然估计 {#prop-separable}
设数据**线性可分**：存在$\mathbf{u}$，使得$y_i = 1$时恒有$\mathbf{u}^\top\mathbf{x}_i > 0$，$y_i = 0$时恒有$\mathbf{u}^\top\mathbf{x}_i < 0$。则$\inf_{\mathbf{w}}\mathcal{L}(\mathbf{w}) = 0$，但对每个$\mathbf{w}$都有$\mathcal{L}(\mathbf{w}) > 0$：下确界取不到，且任何极小化序列都满足$\lVert\mathbf{w}\rVert\to\infty$。
:::

::: proof
用间隔形式，每一项都是$\log(1 + e^{-m_i})$，$m_i = \tilde y_i\mathbf{w}^\top\mathbf{x}_i$，对每个有限的$m_i$都为正，故$\mathcal{L}(\mathbf{w}) > 0$。对$\mathbf{w} = c\mathbf{u}$，所有间隔都是正数的$c$倍，于是$c\to\infty$时每项趋于$0$，$\mathcal{L}(c\mathbf{u})$也趋于$0$；故下确界为$0$。在$\mathbf{w}$的任何有界集上间隔有界，$\mathcal{L}$在那里被一个正的常数从下方控制；因此满足$\mathcal{L}\to0$的序列必定离开每个有界集。
:::

在可分数据上，梯度下降不断让分类器更自信：损失朝零下降，权重无界地增长（很慢，像$\log t$），预测概率逼近$0$和$1$。Soudry 等人（2018）证明*方向*$\mathbf{w}_t/\lVert\mathbf{w}_t\rVert$收敛到最大间隔分隔面的方向，即硬间隔支持向量机的解——优化器**隐式偏置**的一例，[[ml-fundamentals/generalisation]]会再回到它。[[#ex-step]]是可分的，所以那些梯度步若一直走下去就永不停歇。实用的解药是加惩罚项$\frac\lambda2\lVert\mathbf{w}\rVert^2$，它使损失严格凸、极小点有限（[[ml-fundamentals/regularisation]]）。

::: widget plot
f: ln(1 + exp(-x)) + l*x^2
x: -2, 10
y: 0, 2
sliders: l=0.02:0:0.3:0.005
labels: $\log(1 + e^{-w}) + \lambda w^2$
caption: 一个可正确分类的样本的损失作为沿分隔方向的权重$w$的函数，加上惩罚项$\lambda w^2$。$\lambda = 0$时曲线永远下降、没有最小值，正如[[#prop-separable]]所说；任何$\lambda > 0$都造出一个有限的极小点，它随$\lambda$缩小而外移。
:::

::: warning 完美的训练准确率可能意味着过度自信的概率
当逻辑模型（或神经网络）把训练数据分开时，最大似然就奖励把每个训练概率做成$0$或$1$，不加正则的训练就会朝那里漂移。决策边界或许仍然合理，概率却不合理：靠近边界的一个测试点可能被赋予$0.999$。软件报告“收敛警告”或某些系数给出巨大标准误，往往正是在提示可分性。请施加惩罚、提早停止，或两者都用，并在留出数据上检查校准（[[ml-fundamentals/evaluation-metrics]]）。
:::

## 逻辑模型从何而来 {#sec-generative}

逻辑形式并非任意。它恰恰是贝叶斯公式从一个关于每类输入如何生成的简单模型中产出的结果。

::: proposition 高斯类别给出逻辑后验 {#prop-lda}
设类别$k\in\{0, 1\}$的先验概率为$\pi_k$，类别$k$的输入服从$\Normal(\boldsymbol\mu_k, \Sigma)$，两类共用同一个协方差$\Sigma$。则$\Prob(y = 1\mid\mathbf{x}) = \sigma(\mathbf{w}^\top\mathbf{x} + b)$，其中

$$
\mathbf{w} = \Sigma^{-1}(\boldsymbol\mu_1 - \boldsymbol\mu_0),\qquad b = -\tfrac12\big(\boldsymbol\mu_1^\top\Sigma^{-1}\boldsymbol\mu_1 - \boldsymbol\mu_0^\top\Sigma^{-1}\boldsymbol\mu_0\big) + \log\frac{\pi_1}{\pi_0}.
$$
:::

::: proof
由贝叶斯公式（[[math-for-ml/probability#thm-bayes]]），对数几率为$\log\frac{\pi_1}{\pi_0} + \log\mathcal{N}(\mathbf{x};\boldsymbol\mu_1, \Sigma) - \log\mathcal{N}(\mathbf{x};\boldsymbol\mu_0, \Sigma)$。归一化常数相等而相消，剩下$-\frac12(\mathbf{x} - \boldsymbol\mu_1)^\top\Sigma^{-1}(\mathbf{x} - \boldsymbol\mu_1) + \frac12(\mathbf{x} - \boldsymbol\mu_0)^\top\Sigma^{-1}(\mathbf{x} - \boldsymbol\mu_0)$。二次项$\mathbf{x}^\top\Sigma^{-1}\mathbf{x}$相消，利用$\Sigma^{-1}$的对称性，剩下$(\boldsymbol\mu_1 - \boldsymbol\mu_0)^\top\Sigma^{-1}\mathbf{x} - \frac12(\boldsymbol\mu_1^\top\Sigma^{-1}\boldsymbol\mu_1 - \boldsymbol\mu_0^\top\Sigma^{-1}\boldsymbol\mu_0)$。加上先验项再作用$\sigma$即得结论。
:::

从数据中估计$\boldsymbol\mu_k$、$\Sigma$与$\pi_k$再代回去，就是费希尔（Fisher）的**线性判别分析**（LDA），一种*生成式*方法：它建模$\mathbf{x}$如何产生。逻辑回归是*判别式*的：它只建模$\Prob(y\mid\mathbf{x})$，对$\mathbf{x}$的分布不作任何假设。高斯假设成立时，LDA 更高效地利用数据；假设失败时（二元特征、偏斜分布、离群点），逻辑回归更稳健，因为逻辑后验也从许多其他类别条件分布中产生——例如带类别相关概率的独立二元特征，或以$\mathbf{x}$自身为充分统计量的任何指数族。Ng 与 Jordan（2001）比较了两者，发现生成式模型更快地逼近它的（较高的）渐近误差，判别式模型则随数据增多达到更低的误差。

下面的清单用梯度下降把逻辑回归拟合到从正是这个模型抽出的$200$个点——两个单位方差的二元高斯云、中心在$(0, 0)$与$(2, 2)$、先验相等——然后再拟合到两团相距足够远、可以分开的云。由[[#prop-lda]]，真实的后验满足$\mathbf{w} = (2, 2)$、$b = -4$。

```python
import math, random

rng = random.Random(2)

def make_data(n, shift):
    """Two Gaussian clouds in 2D: class 1 centred at (shift, shift), class 0 at (0, 0)."""
    data = []
    for i in range(n):
        y = i % 2
        c = shift if y else 0.0
        data.append(([1.0, c + rng.gauss(0, 1), c + rng.gauss(0, 1)], y))  # x = (1, x1, x2)
    return data

def sigmoid(z):
    return 1 / (1 + math.exp(-z)) if z >= 0 else math.exp(z) / (1 + math.exp(z))

def loss_and_grad(w, data):
    """Mean cross-entropy and its gradient (1/n) sum (p - y) x."""
    L, g = 0.0, [0.0] * len(w)
    for x, y in data:
        z = sum(a * b for a, b in zip(w, x))
        p = sigmoid(z)
        # y = 1 时用 -log p，y = 0 时用 -log(1 - p)，以 softplus 形式稳定计算
        L += math.log1p(math.exp(-abs(z))) + max(z, 0) - y * z
        for j in range(len(w)):
            g[j] += (p - y) * x[j]
    n = len(data)
    return L / n, [gj / n for gj in g]

def accuracy(w, data):
    return sum((sum(a * b for a, b in zip(w, x)) > 0) == y for x, y in data) / len(data)

def train(data, eta, steps, report):
    w = [0.0, 0.0, 0.0]
    for t in range(1, steps + 1):
        L, g = loss_and_grad(w, data)
        w = [wj - eta * gj for wj, gj in zip(w, g)]
        if t in report:
            L, _ = loss_and_grad(w, data)
            norm = math.sqrt(w[1] ** 2 + w[2] ** 2)
            print(f"  step {t:5d}  loss {L:.4f}  acc {accuracy(w, data):.3f}  "
                  f"w = {[round(v, 2) for v in w]}  |w| = {norm:.2f}")
    return w

print("overlapping classes (shift 2):")
train_set, test_set = make_data(200, 2.0), make_data(2000, 2.0)
w = train(train_set, eta=0.5, steps=2000, report={10, 100, 2000})
print("  test accuracy", accuracy(w, test_set))

print("separable classes (shift 6):")
train(make_data(200, 6.0), eta=0.5, steps=20000, report={100, 1000, 20000})
```

```text
overlapping classes (shift 2):
  step    10  loss 0.3417  acc 0.875  w = [-0.57, 0.62, 0.75]  |w| = 0.97
  step   100  loss 0.2073  acc 0.915  w = [-2.46, 1.27, 1.59]  |w| = 2.03
  step  2000  loss 0.1935  acc 0.910  w = [-3.78, 1.84, 2.2]  |w| = 2.87
  test accuracy 0.915
separable classes (shift 6):
  step   100  loss 0.0350  acc 1.000  w = [-3.3, 0.74, 0.71]  |w| = 1.02
  step  1000  loss 0.0050  acc 1.000  w = [-6.27, 1.19, 1.21]  |w| = 1.70
  step 20000  loss 0.0005  acc 1.000  w = [-11.04, 2.01, 2.15]  |w| = 2.95
```

在类别重叠时，估计$(-3.78, 1.84, 2.20)$接近真值$(-4, 2, 2)$，测试准确率$0.915$也接近理论最好：贝叶斯分类器的边界垂直平分两个均值之间的线段，而两均值相距$2\sqrt2$个噪声标准差，所以它的错误率为$\Phi(-\sqrt2)\approx0.079$，任何分类器的准确率都无法超过约$0.921$。损失收敛到一个正值。在类别可分时，损失持续朝零下降，权重持续增大——$|\mathbf{w}|$在第$1000$步到第$20{,}000$步之间从$1.7$升到$2.95$，大致按对数增长——正像[[#prop-separable]]所预言的。`sigmoid`和损失都取了不会出现大正数`exp`的形式；朴素的公式对自信预测要么溢出，要么给出$\log0$。

## 多类别：softmax 回归 {#sec-softmax}

有$K$个类别时，模型给每个类别各自的线性得分，即 logit $z_k = \mathbf{w}_k^\top\mathbf{x} + b_k$，再把$K$个 logit 变成一个概率向量。

::: definition softmax 回归 {#def-softmax-regression}
带权重矩阵$W\in\R^{K\times d}$与偏置$\mathbf{b}\in\R^K$的**softmax回归**（又称多项 logistic 回归）预测

$$
\Prob(y = k\mid\mathbf{x}) = \operatorname{softmax}(\mathbf{z})_k = \frac{e^{z_k}}{\sum_{j=1}^Ke^{z_j}},\qquad\mathbf{z} = W\mathbf{x} + \mathbf{b}\in\R^K,
$$

并用极小化平均**交叉熵**$\mathcal{L} = -\frac1n\sum_i\log\operatorname{softmax}(\mathbf{z}_i)_{y_i}$来拟合，即分类分布模型（categorical）的负对数似然。
:::

::: proposition softmax 回归的梯度 {#prop-softmax-grad}
对一个概率为$\mathbf{p} = \operatorname{softmax}(\mathbf{z})$、独热（one-hot）目标为$\mathbf{e}_y$的样本，

$$
\nabla_{\mathbf{z}}\ell = \mathbf{p} - \mathbf{e}_y,\qquad\nabla_W\ell = (\mathbf{p} - \mathbf{e}_y)\,\mathbf{x}^\top,\qquad\nabla_{\mathbf{b}}\ell = \mathbf{p} - \mathbf{e}_y.
$$

损失对$(W, \mathbf{b})$是凸的。往$W$的每一行加上同一个向量（并往每个$b_k$加上同一个常数）不改变任何预测。
:::

::: proof
对 logits 的梯度见[[math-for-ml/gradients#prop-softmax-ce]]；对$W$与$\mathbf{b}$的梯度由$\mathbf{z} = W\mathbf{x} + \mathbf{b}$按线性层法则（[[math-for-ml/gradients#prop-linear-grad]]）得到。至于凸性，$\ell = \log\sum_je^{z_j} - z_y$；log-sum-exp 函数是凸的（其黑塞矩阵为$\operatorname{diag}(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$半正定，因为$\mathbf{v}^\top(\operatorname{diag}\mathbf{p} - \mathbf{p}\mathbf{p}^\top)\mathbf{v} = \sum_jp_jv_j^2 - (\sum_jp_jv_j)^2$是一个方差），$z_y$是线性的，$\mathbf{z}$对参数是线性的，故$\ell$对参数凸。最后，往每个 logit 加上$\mathbf{c}^\top\mathbf{x} + c_0$，等于把 softmax 的分子分母同乘因子$e^{\mathbf{c}^\top\mathbf{x} + c_0}$。
:::

最后这句话意味着参数不可辨识：只有 logit 之差要紧，损失是凸的但不是严格凸的。$K = 2$时只有$z_1 - z_0$要紧，softmax 回归就化为$\mathbf{w} = \mathbf{w}_1 - \mathbf{w}_0$的逻辑回归（习题10）。实践中没人去消除这种冗余；一个小权重惩罚会挑出一个解。

::: example 一个 softmax 步 {#ex-softmax}
一个三分类模型对一个真实类别为第二个的输入给出 logits $\mathbf{z} = (2.0, 1.0, 0.1)$。计算概率、损失以及对 logits 的梯度。
::: solution
$e^{2} = 7.389$，$e^{1} = 2.718$，$e^{0.1} = 1.105$，总和$11.212$，故$\mathbf{p} = (0.659, 0.242, 0.099)$。损失为$-\log0.242 = 1.417$。梯度为$\mathbf{p} - \mathbf{e}_2 = (0.659, -0.758, 0.099)$：一个梯度步会抬高真实类别的 logit，并按各自概率压低其余的。各分量之和为零，正反映了[[#prop-softmax-grad]]的平移不变性。
:::
:::

### 语言模型的输出层 {#sec-lm-head}

语言模型的最后一层就是 softmax 回归。网络算出一个概括上下文$x_{<t}$的隐向量$\mathbf{h}_t\in\R^{d_{\text{model}}}$，一张**解嵌入**（unembedding）矩阵$W_U\in\R^{\lvert\mathcal{V}\rvert\times d_{\text{model}}}$把它变成 logits $\mathbf{z}_t = W_U\mathbf{h}_t$，词表中每个词元一个；下一词元分布是$\operatorname{softmax}(\mathbf{z}_t)$，损失是真实下一词元处的交叉熵。[[#prop-softmax-grad]]里的一切在$\mathbf{x} = \mathbf{h}_t$、$K = \lvert\mathcal{V}\rvert$下原样适用——只不过$\mathbf{h}_t$本身也是学出来的，这使整个问题不再凸。

::: example 输出层的规模 {#ex-lm-head}
GPT-2 small 的$d_{\text{model}} = 768$，词表有$50{,}257$个词元。它的解嵌入矩阵有多少个参数？每个词元要花费多少次乘加？一个词元对应的梯度$\nabla_{\mathbf{z}}\ell$有多大？
::: solution
$W_U$有$50{,}257\times768 = 38{,}597{,}376$个元素——约$3900$万，占模型约$1.24$亿参数的近三分之一（GPT-2 让这张矩阵与输入嵌入共享，这一做法叫权重绑定（weight tying））。计算 logits 每个词元同样要花费这么多乘加。对 logits 的梯度是长$50{,}257$的向量$\mathbf{p} - \mathbf{e}_y$，而且是稠密的，因为 softmax 给每个词元正概率：每一步，每个词元的 logit 都被压低一点点，只有真实的那个被抬高。
:::
:::

::: quiz
一个 softmax 分类器当前对一个属于类别 $3$ 的训练样本给出概率$(0.7, 0.2, 0.1)$。关于交叉熵对 logits 的梯度，哪个说法正确？
- [ ] 它是 $(0, 0, -1)$：只有真实类别的 logit 会改变
- [x] 它是 $(0.7, 0.2, -0.9)$：梯度下降压低类别 1 与 2 的 logit，抬高类别 3 的
- [ ] 它是 $(-0.7, -0.2, 0.9)$，因此梯度下降会压低真实类别的 logit
- [ ] 它是零，因为概率已经加起来等于 $1$
::: solution
由[[#prop-softmax-grad]]，梯度是$\mathbf{p} - \mathbf{e}_y = (0.7, 0.2, 0.1 - 1)$。梯度下降把 logits 沿它的$-\eta$倍移动：$z_3$抬高$0.9\eta$，并按类别$1$、$2$错误占据的概率成比例压低$z_1$与$z_2$。
:::
:::

## 用概率做分类 {#sec-decisions}

概率化分类器把两个问题分开：*每个类别有多可能？*（模型的职责）与*对此该怎么办？*（一个决策）。预测最可能的类别使期望0–1损失最小（[[ml-fundamentals/learning-problem#prop-bayes]]），但错误的代价常常不相等——漏掉一个肿瘤比一次虚惊更糟——这时阈值就该挪动。若一次假阳性（false positive）的代价为$c_{\text{FP}}$、一次假阴性（false negative）的代价为$c_{\text{FN}}$，则预测阳性（positive）的期望代价是$(1 - p)c_{\text{FP}}$，预测阴性（negative）的是$pc_{\text{FN}}$，于是使代价最小的规则在$p > c_{\text{FP}}/(c_{\text{FP}} + c_{\text{FN}})$时预测阳性。取$c_{\text{FN}} = 9c_{\text{FP}}$，阈值就是$0.1$。这一切只有在概率“名副其实”时才管用，而这正是**校准**（calibration）的问题，[[ml-fundamentals/evaluation-metrics]]将展开讨论。

::: history
逻辑曲线由 Pierre-François Verhulst（1838，1845）提出，作为受资源限制的人口增长模型。Joseph Berkson 为剂量-反应数据提出用 logit 替代 probit（1944）并为之命名；David Cox 的“The regression analysis of binary sequences”（1958）确立了逻辑回归作为一般方法的地位。Nelder 与 Wedderburn（1972）把它同线性回归、泊松（Poisson）回归一起安放进用迭代再加权最小二乘拟合的广义线性模型家族。多项版本经由 Daniel McFadden 描述离散选择的条件 logit 模型（1974）进入计量经济学。在神经网络中，“softmax”这个名称归于 John Bridle（1990），他把网络输出解释为概率；罗森布拉特（Rosenblatt）的感知机（1958）用的则是硬阈值。费希尔（Fisher）的线性判别（1936）是[[#prop-lda]]的生成式对应物。
:::

::: summary
- 逻辑回归建模$\Prob(y = 1\mid\mathbf{x}) = \sigma(\mathbf{w}^\top\mathbf{x} + b)$：对数几率是线性的，决策边界是超平面，每个权重是一个对数几率比。
- 最大似然极小化二元**交叉熵**，等价于间隔的逻辑损失。它的梯度是$\frac1nX^\top(\mathbf{p} - \mathbf{y})$——预测减目标，再乘输入。
- 黑塞矩阵$\frac1nX^\top SX$半正定，故损失是凸的（特征满秩时严格凸）；没有封闭形式，但梯度下降与牛顿法都能找到全局最小值。
- 线性可分的数据上最大似然估计不存在：权重无界增长，除非施加正则，概率会变得过度自信。
- 共享协方差的高斯类别恰好给出逻辑后验（LDA）；逻辑回归直接建模后验，而不假设输入的分布。
- **softmax回归**以梯度$(\mathbf{p} - \mathbf{e}_y)\mathbf{x}^\top$推广到$K$类；它是每一个语言模型的输出层，一个词元一个类别。
:::

## 习题

::: exercise 一个预测概率 {level=1 check="1/(1+exp(-1.5))"}
一个逻辑模型有$\mathbf{w} = (2, -1)$、$b = 0.5$。它对$\mathbf{x} = (1, 1)$给类别$1$多大概率？
::: solution
$z = 2 - 1 + 0.5 = 1.5$，故$\Prob(y = 1\mid\mathbf{x}) = \sigma(1.5) = 1/(1 + e^{-1.5})\approx0.818$。
:::
:::

::: exercise 一个几率比 {level=1 check="exp(0.7)"}
在一个逻辑模型中，特征$x_3$的权重为$0.7$。当$x_3$增加$1$而其余特征保持不变时，类别$1$的几率乘以多少？
::: solution
对数几率增加$0.7$，所以几率乘以$e^{0.7}\approx2.01$——大约翻倍——无论起点是多少。
:::
:::

::: exercise 一个交叉熵 {level=1 check="-(ln(0.9)+ln(0.8)+ln(0.6))/3"}
一个模型对标签为$1, 0, 1$的三个样本预测$\Prob(y = 1) = 0.9, 0.2, 0.6$。以纳特为单位计算平均二元交叉熵。
::: solution
各项为$-\ln0.9 = 0.105$、$-\ln(1 - 0.2) = 0.223$与$-\ln0.6 = 0.511$，故平均值为$0.839/3 = 0.280$纳特。
:::
:::

::: exercise 一个样本上的一个梯度步 {level=2 check="1/(1+exp(-2.5))"}
设$\mathbf{w} = \mathbf{0}$，只有一个训练样本$\mathbf{x} = (1, 2)$（第一个分量是常数特征）配$y = 1$，取$\eta = 1$走一个梯度步。更新后的模型给这个样本多大概率？
::: solution
$p = \sigma(0) = 1/2$，故由[[#eq-logistic-grad]]，梯度为$(1/2 - 1)(1, 2) = (-0.5, -1)$，新权重为$(0.5, 1)$。新得分为$0.5 + 2 = 2.5$，概率为$\sigma(2.5)\approx0.924$。
:::
:::

::: exercise 一个 softmax 损失 {level=2 check="ln(exp(2)+exp(1)+1)-1"}
一个三分类模型给一个属于第二个类别的样本输出 logits $(2, 1, 0)$。精确计算它的交叉熵损失，并求对 logits 的梯度。
::: solution
损失为$-\log\big(e^1/(e^2 + e^1 + e^0)\big) = \ln(e^2 + e + 1) - 1\approx1.408$。概率为$(0.665, 0.245, 0.090)$，梯度为$\mathbf{p} - \mathbf{e}_2 = (0.665, -0.755, 0.090)$。
:::
:::

::: exercise 先验不等的判别函数 {level=2 check="1+ln(3)/2"}
在一维情形，类别$0$为$\Normal(0, 1)$，类别$1$为$\Normal(2, 1)$，类别$1$的先验概率为$1/4$。用[[#prop-lda]]求逻辑参数与决策边界。
::: solution
$w = (2 - 0)/1 = 2$，$b = -\frac12(4 - 0) + \log\frac{1/4}{3/4} = -2 - \ln3$。边界$2x - 2 - \ln3 = 0$位于$x = 1 + \frac{\ln3}2\approx1.549$。若先验相等，边界会是中点$x = 1$；更稀有的类别$1$需要更强的证据，所以它的区域从更远处开始。
:::
:::

::: exercise 一维中的可分性 {level=2}
两个不带截距的样本：$x = 1$配$y = 1$，$x = -1$配$y = 0$。写出$\mathcal{L}(w)$并证明它没有极小点。然后加上惩罚项$\frac\lambda2w^2$，证明极小点$w_\lambda$满足$\sigma(-w_\lambda) = \lambda w_\lambda$。$\lambda\to0$时$w_\lambda$如何？
::: solution
两个间隔都等于$w$，故$\mathcal{L}(w) = \log(1 + e^{-w})$，它为正、严格递减且极限为$0$：没有极小点，正如[[#prop-separable]]所说。加惩罚后，导数为$-e^{-w}/(1 + e^{-w}) + \lambda w = -\sigma(-w) + \lambda w$，令其为零得$\sigma(-w_\lambda) = \lambda w_\lambda$。左边在$w = 0$处为$1/2$并递减趋于$0$，右边从$0$递增，所以解恰有一个；而且目标严格凸，故它就是极小点。$\lambda\to0$时右边变平、交点外移：$w_\lambda\to\infty$，大致像$\log(1/\lambda)$，因为$w$大时条件就是$e^{-w}\approx\lambda w$。
:::
:::

::: exercise 感知机与逻辑梯度 {level=2}
证明：若把每个预测概率都舍入到$0$或$1$（$p_i$换成$[z_i > 0]$），随机梯度步$\mathbf{w}\leftarrow\mathbf{w} - \eta(p_i - y_i)\mathbf{x}_i$就变成罗森布拉特（Rosenblatt）的感知机规则：样本分类正确时不做改变，错分时$\mathbf{w}\leftarrow\mathbf{w}\pm\eta\mathbf{x}_i$。逻辑回归对分类正确的样本做了什么不同的事？
::: solution
以$\hat y_i = [z_i > 0]$，因子$\hat y_i - y_i$在预测正确时为$0$，假阳性时为$+1$（减去$\eta\mathbf{x}_i$），假阴性时为$-1$（加上$\eta\mathbf{x}_i$）：这就是感知机更新。逻辑回归用的是$p_i - y_i$，它对正确的预测也不为零；靠近边界（$p_i$接近$1/2$）但分类正确的点仍然推动权重，其幅度随间隔增大而消退。正是这一点使逻辑损失光滑、在不可分数据上有唯一极小点，并使它能给出概率。
:::
:::

::: exercise 牛顿法就是再加权最小二乘 {level=3}
证明逻辑回归的牛顿步$\mathbf{w}^+ = \mathbf{w} - (X^\top SX)^{-1}X^\top(\mathbf{p} - \mathbf{y})$可以写成加权最小二乘解$\mathbf{w}^+ = (X^\top SX)^{-1}X^\top S\mathbf{u}$，其中“工作响应”$\mathbf{u} = X\mathbf{w} + S^{-1}(\mathbf{y} - \mathbf{p})$。哪些样本得到的权重最大？
::: solution
由[[#prop-logistic-grad]]，牛顿步使用黑塞矩阵$\frac1nX^\top SX$与梯度$\frac1nX^\top(\mathbf{p} - \mathbf{y})$；因子$\frac1n$相消。把$\mathbf{w}$写成$(X^\top SX)^{-1}X^\top SX\mathbf{w}$；于是$\mathbf{w}^+ = (X^\top SX)^{-1}\big(X^\top SX\mathbf{w} + X^\top(\mathbf{y} - \mathbf{p})\big) = (X^\top SX)^{-1}X^\top S\big(X\mathbf{w} + S^{-1}(\mathbf{y} - \mathbf{p})\big)$，这正是加权正规方程$X^\top SX\mathbf{w}^+ = X^\top S\mathbf{u}$的解，即$\sum_is_i(u_i - \mathbf{x}_i^\top\mathbf{w}^+)^2$的极小点。权重$s_i = p_i(1 - p_i)$在当前模型觉得不确定的样本（$p_i\approx1/2$）处最大（$1/4$），对自信分类的样本则微乎其微。每次迭代都用新的权重与响应重解一个最小二乘问题——故名“迭代再加权最小二乘”。（这要求所有$s_i > 0$，对有限的$\mathbf{w}$成立。）
:::
:::

::: exercise 两类 softmax 就是逻辑回归 {level=3}
证明$K = 2$、权重行为$\mathbf{w}_0, \mathbf{w}_1$、偏置为$b_0, b_1$的 softmax 回归，给出与$\mathbf{w} = \mathbf{w}_1 - \mathbf{w}_0$、$b = b_1 - b_0$的逻辑回归相同的概率，并证明两者的交叉熵损失相同。为什么两类 softmax 的损失对$(\mathbf{w}_0, \mathbf{w}_1, b_0, b_1)$不可能严格凸？
::: solution
$\operatorname{softmax}(\mathbf{z})_1 = e^{z_1}/(e^{z_0} + e^{z_1}) = 1/(1 + e^{-(z_1 - z_0)}) = \sigma(z_1 - z_0)$，且$z_1 - z_0 = (\mathbf{w}_1 - \mathbf{w}_0)^\top\mathbf{x} + (b_1 - b_0)$。类别$0$的概率是$1 - \sigma(z_1 - z_0)$。交叉熵只依赖这些概率，故两个损失相同。沿“往$\mathbf{w}_0$与$\mathbf{w}_1$加同一个向量（往$b_0$与$b_1$加同一个常数）”的方向损失不变，所以损失沿一条直线是常数，而严格凸函数不可能沿直线为常数。$K$类时同样的话对$d + 1$个方向成立：即[[#prop-softmax-grad]]的平移不变性。
:::
:::
