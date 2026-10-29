现代网络常常参数比训练样例还多，能把训练集完美拟合——哪怕标签被换成随机噪声。经典理论说这样的模型会严重过拟合。深度网络常常并不如此，理解为什么是本领域核心的未决问题之一。答案的一部分是显式的**正则化**，也就是本章讲的这些技术：dropout、权重衰减、标签平滑、数据增强与提前停止。另一部分是**隐式**正则化：优化器、架构与训练过程本身就更偏爱某些解，哪怕损失里没有要求它们这样做。

基本工具已在[[ml-fundamentals/regularisation]]中为线性模型介绍过——罚化风险、作为权重衰减的 $\ell_2$ 惩罚（[[ml-fundamentals/regularisation#prop-decay]]）、作为谱滤波的提前停止、输入噪声与数据增强等价于岭回归——泛化的经典与现代图景见[[ml-fundamentals/generalisation]]。本章问的是深度网络里有什么不同：只有对它才成立的方法（dropout）、常见方法行为不同的地方（权重衰减遇上归一化层）、为输出层设计的方法（标签平滑），以及关于隐式正则化已经知道——和尚不知道——的东西。

## 网络能够记住 {#sec-memorise}

Zhang、Bengio、Hardt、Recht 与 Vinyals（2017）在 CIFAR-10 上训练标准图像分类器，把标签换成一致的随机标签。网络达到了零训练误差——它们记住了 $50{,}000$ 个任意的标签——只比真实标签多花一个小因子。同样的网络在真实标签上泛化得很好。所以这个架构能够表示严重过拟合的函数，而只依赖函数类的复杂度度量（如[[ml-fundamentals/generalisation#sec-bounds]]的 VC 界）解释不了它通常为什么找到的是泛化好的函数。在他们的实验里，显式正则器有些帮助，但对好的测试准确率既非必要也非充分。让深度网络泛化的东西，主要是*它们如何在真实数据上训练*的性质，而不只是模型类的性质。

还有两项实证发现界定了本章余下的内容。其一，测试误差随模型大小可以呈现**双下降**：先下降，在模型恰好能插值训练数据的大小附近上升，越过之后再下降（Belkin、Hsu、Ma 与 Mandal，2019；Nakkiran 等，2020，他们还观察到它随训练时间的同样形状）。其二，对在远超其记忆能力的巨大语料上大约只过一遍的语言模型来说，经典意义上的过拟合很少是起作用的约束；那里的正则化多半是为了优化稳定，以及在数据开始不够用时把数据用到极致（[[#sec-llms]]）。

## Dropout {#sec-dropout}

**Dropout**（Hinton 等，2012；Srivastava 等，2014）在训练期间随机关掉单元，使任何单元都不能依赖某些特定同伴的存在。

::: definition Dropout {#def-dropout}
训练期间，率为 $p\in[0, 1)$ 的 dropout 层把 $\mathbf{h}\in\R^d$ 映为

$$
\tilde{\mathbf{h}} = \frac{\mathbf{m}\odot\mathbf{h}}{1 - p},\qquad m_j\overset{\text{iid}}{\sim}\operatorname{Bernoulli}(1 - p),
$$

每个样例、每一步都换一个全新的掩码 $\mathbf{m}$；测试时它是恒等映射。（这是“倒置”dropout，在训练期间重标定；最初的表述是测试时把权重乘 $1 - p$，两者等价。）
:::

::: proposition Dropout 保持均值 {#prop-dropout-mean}
对固定的 $\mathbf{h}$，$\E_{\mathbf{m}}[\tilde{\mathbf{h}}] = \mathbf{h}$ 且 $\Var(\tilde h_j) = \frac{p}{1 - p}h_j^2$。于是对任何线性函数 $\mathbf{w}^\top\tilde{\mathbf{h}}$，训练时输出对掩码取平均恰等于测试时的输出 $\mathbf{w}^\top\mathbf{h}$。
:::

::: proof
$\E m_j = 1 - p$，故 $\E\tilde h_j = (1 - p)h_j/(1 - p) = h_j$。$\Var m_j = p(1 - p)$，故 $\Var\tilde h_j = p(1 - p)h_j^2/(1 - p)^2 = \frac{p}{1 - p}h_j^2$。最后一句由期望的线性得出。
:::

经过非线性之后，测试时的网络只是对 dropout 抽出的 $2^d$ 个“瘦”网络取平均的一个近似；Srivastava 等人发现这个近似在实践中很好。它的用意是阻止**协同适配**：一个单元不能指望某个特定伙伴在场，就必须在许多场合都有用。另一种看法是 dropout 在训练一个共享权重的、规模呈指数大的集成。对线性模型这个效果可以精确算出，而结果是眼熟的惩罚。

::: proposition 线性模型上的 dropout 是数据相关的岭惩罚 {#prop-dropout-ridge}
对回归的输入施加率为 $p$ 的 dropout，$\hat y = \mathbf{w}^\top\tilde{\mathbf{x}}$。平方损失对掩码取期望、对数据求和，得

$$
\E_{\mathbf{m}}\sum_{i=1}^n\big(y_i - \mathbf{w}^\top\tilde{\mathbf{x}}_i\big)^2 = \lVert\mathbf{y} - X\mathbf{w}\rVert^2 + \frac{p}{1 - p}\sum_{j=1}^dw_j^2\,(X^\top X)_{jj},
$$ {#eq-dropout-ridge}

这是一个岭惩罚，每个权重按其特征大小的平方成比例地受罚。其极小点满足 $\big(X^\top X + \frac{p}{1 - p}\operatorname{diag}(X^\top X)\big)\mathbf{w} = X^\top\mathbf{y}$。
:::

::: proof
单个样例上，$\E[(y - \hat y)^2] = (y - \E\hat y)^2 + \Var\hat y$。由[[#prop-dropout-mean]]，$\E\hat y = \mathbf{w}^\top\mathbf{x}$；又因各 $m_j$ 相互独立，$\Var\hat y = \sum_jw_j^2\Var(\tilde x_j) = \frac p{1 - p}\sum_jw_j^2x_j^2$。对样例求和，$\sum_ix_{ij}^2 = (X^\top X)_{jj}$。目标是凸二次函数；令其梯度 $-2X^\top(\mathbf{y} - X\mathbf{w}) + \frac{2p}{1 - p}\operatorname{diag}(X^\top X)\mathbf{w}$ 为零即得正规方程。
:::

::: example 单特征的 dropout {#ex-dropout-one}
一个回归只有一个特征、没有截距，最小二乘解为 $w_{\text{LS}} = \sum_ix_iy_i/\sum_ix_i^2$。求率为 $p$ 的期望 dropout 损失的极小点，并在 $w_{\text{LS}} = 2$、$p = 0.2$ 处求值。
::: solution
$d = 1$ 时，[[#prop-dropout-ridge]]给出 $\big(\sum_ix_i^2 + \frac{p}{1 - p}\sum_ix_i^2\big)w = \sum_ix_iy_i$，故 $w = w_{\text{LS}}\big/\big(1 + \frac{p}{1 - p}\big) = (1 - p)\,w_{\text{LS}}$。$w_{\text{LS}} = 2$、$p = 0.2$ 时 $w = 1.6$。收缩因子 $1 - p$ 完全不依赖数据——这是 dropout 惩罚在最简单形式下的尺度不变性。特征相关且不止一个时，收缩不再是一个单一因子，下面的清单会显示这一点。
:::
:::

这个结果（Srivastava 等，2014，§9；Wager、Wang 与 Liang，2013）把效果说得明明白白：dropout 收缩权重，如岭回归所为，但它按特征尺度对每个权重相对地惩罚，所以特征重新缩放时结果不变——不像普通岭回归，它对尺度小的特征的权重罚得最重。下面的清单用带 dropout 掩码的 SGD 验证这个预言。

```python
import math, random

rng = random.Random(0)
n, d, p = 200, 3, 0.5                          # 样例数、特征数、dropout 概率

# 特征尺度不同的数据：x = (z1, 2 z2, z1 + 0.5 z3)
X, y = [], []
for _ in range(n):
    z = [rng.gauss(0, 1) for _ in range(3)]
    x = [z[0], 2 * z[1], z[0] + 0.5 * z[2]]
    X.append(x); y.append(1.0 * x[0] - 0.5 * x[1] + 1.0 * x[2] + rng.gauss(0, 0.5))

def solve(A, b):                               # 小型线性方程组的高斯消元
    M = [row[:] + [bi] for row, bi in zip(A, b)]
    k = len(b)
    for i in range(k):
        piv = max(range(i, k), key=lambda r: abs(M[r][i])); M[i], M[piv] = M[piv], M[i]
        for r in range(k):
            if r != i:
                f = M[r][i] / M[i][i]
                M[r] = [a - f * c for a, c in zip(M[r], M[i])]
    return [M[i][k] / M[i][i] for i in range(k)]

XtX = [[sum(x[i] * x[j] for x in X) for j in range(d)] for i in range(d)]
Xty = [sum(x[i] * t for x, t in zip(X, y)) for i in range(d)]
w_ols = solve(XtX, Xty)
lam = p / (1 - p)                              # dropout 的惩罚：lam * sum_j w_j^2 (X^T X)_jj
A = [[XtX[i][j] + (lam * XtX[i][i] if i == j else 0.0) for j in range(d)] for i in range(d)]
w_pred = solve(A, Xty)

# 对输入做倒置 dropout 的 SGD：x_j -> x_j * m_j / (1 - p)，m_j ~ Bernoulli(1 - p)
w = [0.0] * d
T = 400000
for t in range(T):
    x, target = X[t % n], y[t % n]
    xd = [xj * (rng.random() >= p) / (1 - p) for xj in x]
    r = sum(wj * xj for wj, xj in zip(w, xd)) - target
    lr = 0.01 * (1 - t / T)                    # 线性衰减到零，消去噪声下限
    w = [wj - lr * r * xj for wj, xj in zip(w, xd)]

fmt = lambda v: "(" + ", ".join(f"{a:6.3f}" for a in v) + ")"
print("least squares            ", fmt(w_ols))
print("predicted dropout optimum", fmt(w_pred))
print("SGD with dropout         ", fmt(w))

# 标签平滑：平滑交叉熵的极小点 logits 有限
K, eps = 10, 0.1
q = [1 - eps + eps / K] + [eps / K] * (K - 1)  # 类别 0 的平滑目标
z = [0.0] * K
for step in range(20000):                      # 在 logits 上做梯度下降：梯度 = p - q
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e)
    z = [zi - 0.5 * (ei / s - qi) for zi, ei, qi in zip(z, e, q)]
print(f"label smoothing: logit gap {z[0] - z[1]:.4f}, predicted log(q0/q1) = {math.log(q[0] / q[1]):.4f}")
```

```text
least squares             ( 1.018, -0.496,  0.965)
predicted dropout optimum ( 0.705, -0.268,  0.626)
SGD with dropout          ( 0.709, -0.267,  0.614)
label smoothing: logit gap 4.5109, predicted log(q0/q1) = 4.5109
```

带 dropout 的 SGD 与[[#eq-dropout-ridge]]预言的最优值相差约 $0.01$，离最小二乘解则远得多：$p = 0.5$ 时惩罚系数为 $1$，权重收缩了大约三分之一。（输出的最后一行属于[[#sec-label-smoothing]]。）

::: example dropout 注入了多少噪声？ {#ex-dropout-noise}
一个 $512$ 个单元、激活全为 $1$ 的层接到一个权重全为 $0.01$ 的单元。dropout 取 $p = 0.1$，求训练时该单元输入的均值与标准差，以及保留的单元数。
::: solution
保留数是二项分布 $\operatorname{Binomial}(512, 0.9)$：均值 $460.8$，标准差 $\sqrt{512\cdot0.9\cdot0.1} = 6.79$。该单元的输入为 $0.01\cdot(\text{保留数})/0.9$，均值为 $0.01\cdot512 = 5.12$——由[[#prop-dropout-mean]]，正是测试时的值——标准差为 $0.01\cdot6.79/0.9 = 0.0754$，约为均值的 $1.5\%$。$p = 0.5$ 时标准差将是 $0.01\cdot\sqrt{128}/0.5 = 0.226$，为均值的 $4.4\%$。对单个单元来说噪声不大，但它每一步、每个样例都不同。
:::
:::

::: widget distribution
dist: binomial
params: n=512, p=0.9
a: 450
b: 472
caption: $512$ 个单元的层用率 $p = 0.1$ 的 dropout 时保留的单元数：二项分布 $\operatorname{Binomial}(512, 0.9)$，均值 $460.8$，标准差 $6.8$。阴影区间约为均值 $\pm1.6$ 个标准差。改变保留概率，看看 dropout 率接近 $0.5$ 时噪声如何增大。
:::

实践中全连接层常用的 dropout 率为 $0.1$ 到 $0.5$；AlexNet 在它的两个大全连接层用 $0.5$。单元在空间上相关的卷积层从逐单元 dropout 受益较少，改用结构化的变体，如整个通道或整块区域一起丢。最初的 Transformer 对每个子层输出在残差相加之前、对注意力权重、对嵌入都施加 $0.1$ 的 dropout。dropout 也可以在测试时保持*开启*，对掩码把预测平均起来，得到不确定性的粗略估计（“Monte Carlo dropout”，Gal 与 Ghahramani，2016）。**随机深度**（stochastic depth，Huang 等，2016）在训练时随机丢弃整个残差分支——只有仗着恒等通路才可能——是深视觉模型的标准成分。

::: warning 训练模式与评估模式
dropout 与批归一化在训练和测试时行为不同，各框架用一个全局开关切换两者（PyTorch 的 `model.train()` 与 `model.eval()`）。留在训练模式的模型做评估，会得到带噪、系统偏差的预测；留在评估模式的模型做训练，会悄悄禁用 dropout 并冻结批量统计量。两种错误都会给出看着挺合理的数字。相关的坑：数值检查梯度时（[[neural-networks/backpropagation#sec-gradcheck]]），两次求值之间必须固定 dropout 掩码，否则检查毫无意义。
:::

## 深度网络中的权重衰减 {#sec-weight-decay}

权重衰减每步把每个权重乘 $1 - \eta\lambda$；对 SGD 它就是惩罚 $\frac\lambda2\lVert\theta\rVert^2$ 的梯度，对 Adam 则应以解耦形式施加（[[neural-networks/optimisers#prop-decoupled]]）。在没有归一化的网络中，它像在模型里一样把权重向零收缩。在*带*归一化的网络中，它的作用很不一样：多数权重都接在归一化层之前，而损失根本不看它们的尺度（[[neural-networks/initialisation-normalisation#prop-scale-invariance]]）。收缩这样的权重改变不了网络所计算的函数。它改变的是**有效学习率**。

::: proposition 权重衰减与尺度不变损失的均衡 {#prop-equilibrium}
设损失关于权重向量 $\mathbf{w}$ 尺度不变，故 $\nabla\mathcal{L}(\mathbf{w})\perp\mathbf{w}$ 且 $\lVert\nabla\mathcal{L}(\mathbf{w})\rVert = G/\lVert\mathbf{w}\rVert$，其中 $G$ 是同一方向上单位范数处的梯度大小。设带权重衰减的 SGD $\mathbf{w}\leftarrow(1 - \eta\lambda)\mathbf{w} - \eta\nabla\mathcal{L}(\mathbf{w})$ 在 $G$ 近似恒定时运行。则范数收敛到均衡值

$$
\lVert\mathbf{w}\rVert^4 = \frac{\eta G^2}{\lambda(2 - \eta\lambda)}\approx\frac{\eta G^2}{2\lambda},
$$

此时每步把 $\mathbf{w}$ 转过相对量 $\eta\lVert\nabla\mathcal{L}\rVert/\lVert\mathbf{w}\rVert\approx\sqrt{2\eta\lambda}$，与 $G$ 无关。
:::

::: proof
梯度与 $\mathbf{w}$ 正交，故 $\lVert\mathbf{w}'\rVert^2 = (1 - \eta\lambda)^2\lVert\mathbf{w}\rVert^2 + \eta^2G^2/\lVert\mathbf{w}\rVert^2$。记 $u = \lVert\mathbf{w}\rVert^2$；映射 $u\mapsto(1 - \eta\lambda)^2u + \eta^2G^2/u$ 有不动点 $u^2\big(1 - (1 - \eta\lambda)^2\big) = \eta^2G^2$，即 $u^2 = \eta^2G^2/(\eta\lambda(2 - \eta\lambda)) = \eta G^2/(\lambda(2 - \eta\lambda))$；映射在该点的导数是 $(1 - \eta\lambda)^2 - \eta^2G^2/u^2 = 2(1 - \eta\lambda)^2 - 1$，$\eta\lambda > 0$ 很小时其绝对值小于 $1$，所以不动点是吸引的。均衡处相对步长为 $\eta(G/\lVert\mathbf{w}\rVert)/\lVert\mathbf{w}\rVert = \eta G/u\approx\eta G\sqrt{2\lambda/(\eta G^2)} = \sqrt{2\eta\lambda}$。
:::

取 $\eta = 0.1$、$\lambda = 0.01$、$G = 1$ 的模拟停在 $\lVert\mathbf{w}\rVert = 1.4955$，正是公式的值。结论初看惊人：在归一化网络里，权重衰减不直接正则化函数，而是阻止权重增长，从而阻止有效学习率衰减（[[neural-networks/initialisation-normalisation#sec-normalisation]]），每步的旋转量由 $\sqrt{\eta\lambda}$ 定下（van Laarhoven，2017；Wan 等，2021 详细分析了这一动力学）。学习率与权重衰减因此是耦合的超参数。权重衰减通常不用于偏置与归一化增益，它们的尺度确实要紧。

## 标签平滑 {#sec-label-smoothing}

交叉熵损失在模型对观察到的类别预测概率 $1$ 时被最小化，而这要求正确 logit 以无穷间隔超过其余全部。在可分数据上 logits 因此无限增长（[[ml-fundamentals/logistic-regression#prop-separable]]），网络变得过度自信。**标签平滑**（Szegedy 等，2016）取消这种激励。

::: definition 标签平滑 {#def-label-smoothing}
$K$ 个类别、平滑参数 $\varepsilon\in(0, 1)$ 时，把独热目标 $\mathbf{e}_y$ 换成

$$
\mathbf{q} = (1 - \varepsilon)\mathbf{e}_y + \frac\varepsilon K\mathbf{1},
$$

并最小化 $\mathbf{q}$ 与预测 $\mathbf{p} = \operatorname{softmax}(\mathbf{z})$ 之间的交叉熵 $-\sum_kq_k\log p_k$。
:::

::: proposition 标签平滑给 logit 间隔设界 {#prop-ls-optimum}
单个样例上，平滑损失恰在 $\mathbf{p} = \mathbf{q}$ 处取到极小。极小点处每个错误类别的 logit 比正确 logit 低

$$
z_y - z_k = \log\frac{1 - \varepsilon + \varepsilon/K}{\varepsilon/K},
$$

一个有限的数。等价地说，平滑损失等于 $(1 - \varepsilon)\,\mathrm{CE}(\mathbf{e}_y, \mathbf{p}) + \varepsilon\,\mathrm{CE}(\mathbf{u}, \mathbf{p})$，其中 $\mathbf{u}$ 是均匀分布：普通交叉熵，加上对远离均匀的预测的惩罚。
:::

::: proof
交叉熵 $-\sum_kq_k\log p_k$ 等于 $H(\mathbf{q}) + \mathrm{KL}(\mathbf{q}\,\Vert\,\mathbf{p})$；由于 KL 散度非负、只在两分布相等时为零（[[math-for-ml/information-theory]]），它对分布 $\mathbf{p}$ 恰在 $\mathbf{p} = \mathbf{q}$ 处最小。它对 logits 的梯度 $\mathbf{p} - \mathbf{q}$ 在那里为零。softmax 给出 $p_y/p_k = e^{z_y - z_k}$，所以 $\mathbf{p} = \mathbf{q}$ 意味着 $z_y - z_k = \log(q_y/q_k)$，即所给公式。分解式由交叉熵对第一个宗量的线性得出：$\mathbf{q} = (1 - \varepsilon)\mathbf{e}_y + \varepsilon\mathbf{u}$。
:::

::: example 十个类别上的标签平滑 {#ex-label-smoothing}
$K = 10$、$\varepsilon = 0.1$ 时，给出平滑目标、最优 logit 间隔，以及一个把概率 $0.999$ 压给正确类别、其余平均分给的预测的损失。
::: solution
$\mathbf{q}$ 在正确类别上是 $0.9 + 0.01 = 0.91$，其余九个各 $0.01$。最优间隔为 $\log(0.91/0.01) = \log91 = 4.511$，即清单中数值算出的值。那个过度自信的预测有 $p_y = 0.999$、$p_k = 0.000111$，损失为 $-0.91\log0.999 - 9\cdot0.01\log0.000111 = 0.00091 + 0.09\cdot9.106 = 0.820$；而最小值 $H(\mathbf{q}) = -0.91\log0.91 - 0.09\log0.01 = 0.0858 + 0.4145 = 0.500$，由不那么自信的 $\mathbf{p} = \mathbf{q}$ 达到。不作平滑的交叉熵才会偏好那个自信的预测（$0.001$ 对 $0.094$）。
:::
:::

::: widget plot
f: (1 - e/2)*ln(1 + exp(-x)) + (e/2)*ln(1 + exp(x)); ln(1 + exp(-x))
x: -2, 10
y: 0, 2
sliders: e=0.1:0:0.5:0.01
labels: smoothed cross-entropy; ordinary cross-entropy
caption: 两类损失作为 logit 间隔 $z = z_y - z_{\text{other}}$ 的函数。普通交叉熵随间隔增大一直下降，所以训练把 logits 无止境地推远。平滑为 $\varepsilon$ 时损失在 $z = \log\big((2 - \varepsilon)/\varepsilon\big)$ 处取极小——$\varepsilon = 0.1$ 时约 $2.94$——越过之后又上升。
:::

标签平滑最初为图像分类而引入，并用在最初的 Transformer 里（$\varepsilon = 0.1$），Vaswani 等人当时就注意到它损害困惑度、却提高准确率与 BLEU 分数。Müller、Kornblith 与 Hinton（2019）发现它改善校准，但会让同一类别不同样例的倒数第二层表示挤得很紧，这有损从平滑模型做知识蒸馏。语言模型预训练配方一般不用它，因为下一词元分布本质上就不确定，而困惑度正是要优化的量。

## 数据增强 {#sec-augmentation}

最有效的正则器是更多数据，而**数据增强**用不该改变标签的变换造出数据来。[[ml-fundamentals/regularisation#prop-noise]]表明对回归加输入噪声等价于岭回归；对深度网络，这些变换编码的是领域知识，不是噪声那么简单。

- **图像。**随机裁剪与缩放、水平翻转、颜色抖动；更强的策略组合多种这样的操作（AutoAugment，Cubuk 等，2019；RandAugment，2020）。**Cutout**（DeVries 与 Taylor，2017）擦除随机小块。**Mixup**（Zhang、Cisse、Dauphin 与 Lopez-Paz，2018）在凸组合 $\lambda\mathbf{x}_i + (1 - \lambda)\mathbf{x}_j$ 上训练，目标为 $\lambda\mathbf{e}_{y_i} + (1 - \lambda)\mathbf{e}_{y_j}$，$\lambda\sim\operatorname{Beta}(\alpha, \alpha)$；**CutMix**（Yun 等，2019）把一张图的一块贴进另一张，按面积比例混合标签。
- **音频。**对频谱图做时间与频率掩蔽（SpecAugment，Park 等，2019）、变速与加噪扰动。
- **文本。**保持标签的文本变换不好找：某些任务用回译（译成另一语言再译回来；Sennrich、Haddow 与 Birch，2016）与词元级噪声；但语言模型预训练的主流策略干脆就是更多、更干净、更多样的数据（[[pretraining]]）。

::: example 一个 mixup 目标 {#ex-mixup}
mixup 抽到 $\lambda = 0.7$，把一张猫（类别 $1$）与一张狗（类别 $2$）混在一起。训练目标是什么？若模型对混合图像预测 $(0.9, 0.1)$，损失是多少？哪个预测使损失最小？
::: solution
输入是 $0.7\mathbf{x}_{\text{猫}} + 0.3\mathbf{x}_{\text{狗}}$，目标是 $(0.7, 0.3)$。预测 $(0.9, 0.1)$ 的交叉熵为 $-0.7\ln0.9 - 0.3\ln0.1 = 0.074 + 0.691 = 0.765$。它被预测目标本身 $(0.7, 0.3)$ 最小化，损失等于目标的熵：$-0.7\ln0.7 - 0.3\ln0.3 = 0.611$。与标签平滑一样，mixup 惩罚自信的预测，只不过它是在训练样例*之间*的输入上这么做，而不是在样例本身上。
:::
:::

增强编码一种不变性：在翻转图像上训练的网络学到对翻转近似不变。当这种不变性能够确切地内置到架构里——卷积网络的平移等变性（[[neural-networks/convolutional-networks]]）——通常比从增强数据学习更省。

::: quiz
只把操作施加在直接接层归一化的那些权重上，下列哪一项**不**改变网络计算的函数？
- [ ] 在这些权重的输入上加 dropout
- [x] 用一个正的常数重新缩放这些权重，如权重衰减的一步
- [ ] 给这些权重加高斯噪声
- [ ] 把它们换成自己的符号
::: solution
由[[neural-networks/initialisation-normalisation#prop-scale-invariance]]的尺度不变性，把权重乘正常数不改变归一化的输出，所以权重衰减的一步只通过它对后续梯度步的影响来改变函数（[[#prop-equilibrium]]）。其余操作改变权重的方向、或它们的输入，因而改变函数。
:::
:::

## 提前停止与隐式正则化 {#sec-implicit}

**提前停止**——保留验证损失最好那一步的参数——是网络最老、最便宜的正则器，而对线性模型，它的作用像一个强度随训练时间减小的 $\ell_2$ 惩罚（[[ml-fundamentals/regularisation#prop-early-stopping]]）。对深度网络没有同样精确的结论，但定性图景相似：训练早期网络拟合数据的宽泛结构，后期拟合特例与噪声。带噪标签时效果非常显著：网络先学会干净的样例，很晚才记住标错的那些（Arpit 等，2017），所以提前停能除去大部分伤害。

除提前停止之外，训练过程本身就在众多拟合数据的解之间做选择。

- **梯度下降的隐式偏置。**在欠定回归上，从零出发的梯度下降收敛到最小范数插值（[[ml-fundamentals/generalisation#prop-min-norm]]）；在可分分类上，它的方向收敛到最大间隔分隔面。对某些简化的网络（深线性网络、齐次网络）有类似结论；对实际架构，它们是由实验支持的猜想。
- **随机噪声与平坦性。**Keskar 等（2017）发现非常大的批量往往泛化更差、最后落在“更尖”的极小值里，并认为 SGD 的噪声把它引向平坦区域。平坦性不是参数化不变的（Dinh 等，2017 表明尖极小值可以通过缩放变得平坦），并且把学习率缩放得当时，大并班的差距大部分会缩小，所以这是一个活跃的研究领域，不是定论。
- **架构。**权重共享、归一化、残差结构以及激活函数的选择，全都偏向哪些函数容易到达。卷积网络在图像上、Transformer 在文本上的成功，很大程度上说的就是这些归纳偏置。

## 大语言模型的正则化 {#sec-llms}

语言模型的预训练有一个非典型的情形。在远超其记忆能力的词元数上训练大约一个轮次，几乎每个例子只被见到一次，所以 dropout 与增强所对付的经典过拟合几乎不出现：下一批数据上的训练损失是测试损失的无偏估计。已发表的配方反映了这一点。截至 2026 年，有记录的预训练配置常用 AdamW、权重衰减约 $0.1$、梯度裁剪；dropout 常常干脆不用（例如已发表的 LLaMA 配方里就没有；Touvron 等，2023），而在小数据集上微调时 dropout 仍然常见。

高质量数据用完时，重复就成了问题。Muennighoff 等（2023）在重复数据上训练，发现重复到大约四个轮次为止，损失与新数据几乎相同，再往上价值迅速衰减——这是适用于其设定的一条经验规律，可用于规划数据受限的训练。这时正则化重新变得要紧，训练语料的去重也一样——它能减少对重复段落的记忆。

::: history
神经网络的权重 decay 至少可上溯到 Hinton 在 1980 年代的工作，以及 Krogh 与 Hertz 的《A simple weight decay can improve generalization》（1992）；提前停止由 Morgan 与 Bourlard（1990）等人研究过。数据增强是 LeCun 等的数字识别器与 Simard、Steinkraus 与 Platt（2003）的弹性畸变的核心。Geoffrey Hinton 与同事在 2012 年的预印本中引入 dropout，Nitish Srivastava、Hinton、Alex Krizhevsky、Ilya Sutskever 与 Ruslan Salakhutdinov 于 2014 年发表了完整研究；AlexNet 在 2012 年的胜利同时用了 dropout 与大力增强。Christian Szegedy 与同事在 Inception-v3 论文（2016）中引入标签平滑。Chiyuan Zhang 与同事的随机标签实验（2017），以及 Mikhail Belkin 与同事（2019）、Preetum Nakkiran 与同事（2020）的双下降曲线，为过参数化模型重新打开了泛化理论。
:::

::: summary
- 深度网络能记住随机标签，所以它的泛化是在真实数据上训练的性质，不只是模型类的性质；测试误差随模型大小可呈**双下降**。
- **Dropout** 以概率 $p$ 把每个单元置零、再除以 $1 - p$；它保持均值、注入乘性噪声，对线性模型等于按每个特征大小缩放的岭惩罚。测试时关掉。
- 在归一化网络中**权重衰减**无法直接改变函数；它平衡权重范数的增长，把每步的有效旋转固定在约 $\sqrt{2\eta\lambda}$。
- **标签平滑**把独热目标与均匀分布混合；最优解有有限的 logit 间隔 $\log\big((1 - \varepsilon + \varepsilon/K)/(\varepsilon/K)\big)$，从而防止过度自信。
- **数据增强**（裁剪、翻转、mixup、CutMix、SpecAugment、回译）编码不变性；**提前停止**与优化器、架构的**隐式偏置**不加任何显式项就起到正则化作用。
- 大约一个轮次的 LLM 预训练使用权重衰减与裁剪，但常常不用 dropout；数据有限时，几个轮次的重复代价很小。
:::

## 习题

::: exercise 手算倒置 dropout {level=1 check="3.75"}
dropout 率 $p = 0.2$，某单元的激活 $3$ 被保留。倒置 dropout 传下去的是什么值？测试时传什么？
::: solution
训练时 $3/(1 - 0.2) = 3.75$（该单元被丢时传 $0$）；测试时传 $3$。对掩码取平均是 $0.8\cdot3.75 = 3$。
:::
:::

::: exercise 一个平滑目标 {level=1 check="0.92"}
$K = 5$ 个类别、$\varepsilon = 0.1$ 时，平滑目标给正确类别多大概率？每个其他类别呢？
::: solution
正确类别 $1 - 0.1 + 0.1/5 = 0.92$，其余四个各 $0.1/5 = 0.02$；五个数之和为 $1$。
:::
:::

::: exercise 保留的单元数 {level=1 check="460.8"}
$512$ 个单元的层用 $p = 0.1$ 的 dropout。一个样例上保留单元数的期望是多少？
::: solution
$512\cdot0.9 = 460.8$，标准差 $\sqrt{512\cdot0.9\cdot0.1}\approx6.79$（[[#ex-dropout-noise]]）。
:::
:::

::: exercise 一个 dropout 惩罚 {level=2 check="200"}
在[[#prop-dropout-ridge]]中，某特征满足 $\sum_ix_{ij}^2 = 50$，其权重 $w_j = 2$。$p = 0.5$ 时它对惩罚贡献多少？若把特征乘 $10$、权重除以 $10$（预测不变），贡献如何变化？
::: solution
$\frac{p}{1 - p}w_j^2\sum_ix_{ij}^2 = 1\cdot4\cdot50 = 200$。重新缩放后，$\sum_ix_{ij}^2$ 变成 $5{,}000$、$w_j^2$ 变成 $0.04$，贡献仍是 $200$：dropout 惩罚对特征重新缩放不变，不像普通岭回归，其惩罚 $\lambda w_j^2$ 会从 $4\lambda$ 掉到 $0.04\lambda$。
:::
:::

::: exercise 大词表下的 logit 间隔 {level=2 check="ln(9001)"}
$K = 1{,}000$ 类的 softmax、$\varepsilon = 0.1$，使平滑损失最小的正确类与其他任一类之间的 logit 间隔是多少？
::: solution
$q_y = 0.9 + 0.0001 = 0.9001$，$q_k = 0.0001$，间隔为 $\log(0.9001/0.0001) = \log9001\approx9.105$。间隔像 $\log K$ 那样增长：类别很多时，平滑允许更大的 logits，但仍然给它设了上界。
:::
:::

::: exercise 均衡的权重范数 {level=2 check="(0.01/(0.1*1.999))^(1/4)"}
一个尺度不变的权重向量以 $\eta = 0.01$、$\lambda = 0.1$ 训练，单位范数处的大小 $G = 1$。用[[#prop-equilibrium]]求均衡范数与每步的相对旋转。填入范数。
::: solution
$\lVert\mathbf{w}\rVert^4 = 0.01/(0.1\cdot(2 - 0.001)) = 0.01/0.1999 = 0.05003$，故 $\lVert\mathbf{w}\rVert = 0.05003^{1/4}\approx0.473$。相对步长为 $\eta G/\lVert\mathbf{w}\rVert^2 = 0.01/0.2237 = 0.0447$，与 $\sqrt{2\eta\lambda} = \sqrt{0.002} = 0.0447$ 接近。
:::
:::

::: exercise 作为惩罚的标签平滑 {level=2}
证明平滑损失等于 $(1 - \varepsilon)\mathrm{CE}(\mathbf{e}_y, \mathbf{p}) + \varepsilon\big(\log K + \mathrm{KL}(\mathbf{u}\,\Vert\,\mathbf{p})\big)$，并解释第二项。$\varepsilon\to1$ 时会怎样？
::: solution
$\mathrm{CE}(\mathbf{q}, \mathbf{p}) = -\sum_kq_k\log p_k$ 对 $\mathbf{q}$ 线性，所以 $\mathbf{q} = (1 - \varepsilon)\mathbf{e}_y + \varepsilon\mathbf{u}$ 时它分解为 $(1 - \varepsilon)\mathrm{CE}(\mathbf{e}_y, \mathbf{p}) + \varepsilon\,\mathrm{CE}(\mathbf{u}, \mathbf{p})$，而 $\mathrm{CE}(\mathbf{u}, \mathbf{p}) = H(\mathbf{u}) + \mathrm{KL}(\mathbf{u}\,\Vert\,\mathbf{p}) = \log K + \mathrm{KL}(\mathbf{u}\,\Vert\,\mathbf{p})$。第二项以权重 $\varepsilon$ 惩罚那些不肯给任何类别多少概率的预测——正是自信预测所为。$\varepsilon\to1$ 时目标变成均匀，最优解是均匀预测，把标签整个忽略。
:::
:::

::: exercise 高斯 dropout {level=3}
不用伯努利掩码，而把线性模型的每个输入乘以独立噪声 $\xi_j\sim\Normal(1, \alpha)$。证明期望平方损失等于最小二乘损失加 $\alpha\sum_jw_j^2(X^\top X)_{jj}$，并求与率为 $p$ 的伯努利 dropout 相匹配的 $\alpha$。
::: solution
单个样例上，$\hat y = \sum_jw_jx_j\xi_j$ 均值为 $\mathbf{w}^\top\mathbf{x}$、方差为 $\sum_jw_j^2x_j^2\alpha$，故 $\E(y - \hat y)^2 = (y - \mathbf{w}^\top\mathbf{x})^2 + \alpha\sum_jw_j^2x_j^2$；对样例求和即得所述形式。与[[#eq-dropout-ridge]]相匹配要求 $\alpha = p/(1 - p)$，这也正是倒置伯努利掩码 $m_j/(1 - p)$ 的方差。这种“高斯 dropout”由 Srivastava 等（2014）提出，与伯努利 dropout 有相同的头两个矩。
:::
:::

::: exercise 均衡处每步的旋转 {level=3 check="0.01"}
由[[#prop-equilibrium]]证明均衡处每步的相对旋转不依赖 $G$，并在 $\eta = 0.1$、$\lambda = 5\times10^{-4}$（ImageNet 上 SGD 的典型取值）处求值。这对把 $\eta$ 与 $\lambda$ 分开调意味着什么？
::: solution
均衡处 $u = \lVert\mathbf{w}\rVert^2 = G\sqrt{\eta/(\lambda(2 - \eta\lambda))}$，于是相对步长 $\eta G/u = \sqrt{\eta\lambda(2 - \eta\lambda)}\approx\sqrt{2\eta\lambda}$：$G$ 约掉了。$\eta = 0.1$、$\lambda = 5\times10^{-4}$ 时，$\sqrt{2\cdot5\times10^{-5}} = \sqrt{10^{-4}} = 0.01$：每步旋转 $1\%$。对尺度不变的权重，均衡时只有乘积 $\eta\lambda$ 要紧；$\eta$ 翻倍、$\lambda$ 减半给出相同的稳态动力学（虽然到达它所需的时间不同，约 $1/(\eta\lambda)$ 步）。这是学习率与权重衰减应当一起调的原因之一。
:::
:::

::: exercise 两点之间的 mixup {level=3}
mixup 以 $\lambda\sim\operatorname{Beta}(\alpha, \alpha)$ 在点 $\lambda\mathbf{x}_1 + (1 - \lambda)\mathbf{x}_2$ 上以软标签 $\lambda$ 训练一个两类逻辑模型，$\mathbf{x}_1$ 属类别 $1$、$\mathbf{x}_2$ 属类别 $0$。证明：若模型给出的 $\Prob(y = 1\mid\mathbf{x})$ 沿线段线性变化，则其 mixup 损失的梯度在某种意义下为零（把意义说明确），并解释 mixup 因此为什么鼓励在学习样例之间线性变化的预测。
::: solution
用 $\lambda\in[0, 1]$ 为线段参数化，点为 $\mathbf{x}(\lambda) = \lambda\mathbf{x}_1 + (1 - \lambda)\mathbf{x}_2$。$\lambda$ 处的 mixup 损失是软目标 $(\lambda, 1 - \lambda)$ 与预测 $(p(\lambda), 1 - p(\lambda))$ 之间的交叉熵，对 $p$ 取极小恰在 $p(\lambda) = \lambda$（[[#prop-ls-optimum]]的论证：预测等于目标时交叉熵最小）。所以对 $\lambda$ 平均后的损失，被任何沿线段把预测概率从 $\mathbf{x}_2$ 处的 $0$ 线性升到 $\mathbf{x}_1$ 处的 $1$ 的模型最小化，其他模型都在线段上某处付出正的 KL 惩罚。于是 mixup 要求网络在不同类的学习样例之间*按概率线性*插值，抑制其间尖锐的跳变与过度自信的预测——一个平滑先验。逻辑模型沿一条直线只能给出 sigmoid 形（而非线性）的概率，所以只能近似做到这一点，表现为向更小权重的拉力。
:::
:::
