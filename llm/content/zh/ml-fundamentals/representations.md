本课程到目前为止的每个模型，对其特征都是线性的：$h(\mathbf{x}) = \mathbf{w}^\top\boldsymbol\phi(\mathbf{x})$，分类时再过一道 sigmoid 或 softmax。线性模型被理解得很透彻——凸损失、封闭形式、干净的统计——但它们能学到什么，完全由**特征**$\boldsymbol\phi(\mathbf{x})$决定。在原始像素强度上做线性分类器认不出猫；在合适的特征上，它能。本章讲特征从哪里来。在机器学习的多半段历史里，特征是手工**工程**出来的。**核**方法让人可以仅凭内积就隐式地使用巨大乃至无穷的特征空间。**非参数**方法，如近邻法与决策树，直接从数据构造灵活的函数。而当今占统治地位的做法——包括每一个语言模型——是把特征**学**出来：神经网络就是一个学出来的特征映射再加一个线性模型，而**嵌入**就是一个离散符号的学得的表示。

本章建立在逻辑回归（[[ml-fundamentals/logistic-regression]]）、岭回归（[[ml-fundamentals/linear-regression#def-ridge]]）与[[ml-fundamentals/generalisation]]的偏差-方差观点之上。它停在下一批课程开始的地方：学到的非线性特征见[[neural-networks/perceptrons-mlps]]，词的学得的表示见[[text-and-language/word-embeddings]]。

## 工程化的特征 {#sec-engineering}

::: definition 特征映射 {#def-feature-map}
**特征映射**是从原始输入（可以是数、类别、字符串、图像）到向量的函数$\boldsymbol\phi\colon\mathcal{X}\to\R^p$。特征上的线性模型用$\mathbf{w}^\top\boldsymbol\phi(\mathbf{x})$预测；它对$\mathbf{w}$是线性的，对$\mathbf{x}$却可以任意非线性。
:::

有些特征映射只是记账，另一些则携带对问题的真知。

- **标准化**把每个数值特征重新缩放为均值$0$、方差$1$（统计量只从训练集来）。它不改变线性模型所能表示的东西，却让梯度下降性态良好（[[ml-fundamentals/linear-regression#prop-gd]]），并让惩罚公平地对待各个特征。
- **独热编码**用$K$个示性特征表示一个取$K$个值的类别变量，其中恰有一个为$1$。若改用整数$1, \dots, K$给类别编码，就硬加了一个并不存在的顺序与间距。
- **词袋**把一篇文档表示成每个词表词的出现次数（或是否出现、或 tf–idf 权重），这是一个维度为$\lvert\mathcal{V}\rvert$、几乎全是零的向量。词袋特征上的线性分类器曾做了几十年的标准文本分类器（[[text-and-language/text-classification]]）。
- **变换与交互**：价格一类偏斜量的对数、多项式项（[[ml-fundamentals/linear-regression#sec-basis]]），以及让一个特征的效果依赖另一个特征的乘积$x_ix_j$。

::: example 一个词袋 {#ex-bow}
词表为 *(the, cat, dog, sat, on, mat)*。给出 *the cat sat on the mat* 与 *the dog sat* 的词袋计数向量及其内积。这种表示丢了什么？
::: solution
第一句的计数为$(2, 1, 0, 1, 1, 1)$，第二句为$(1, 0, 1, 1, 0, 0)$。内积为$2\cdot1 + 1\cdot1 = 3$，来自共同的词 *the* 与 *sat*。这种表示丢了词序——*dog bites man* 与 *man bites dog* 得到同一个向量——还把 *cat* 与 *dog* 看作和 *cat* 与 *on* 一样不相干：任何两个不同词都正交。学得的嵌入（[[#sec-embeddings]]）解决后一个局限，序列模型解决前一个。
:::
:::

### 线性模型做不到的事 {#sec-xor}

任何在原始输入上的线性分类器都表示不了的模式，经典例子是**异或**（XOR）。

::: proposition XOR 不是线性可分的 {#prop-xor}
不存在$\mathbf{w}\in\R^2$与$b\in\R$，用规则$[\mathbf{w}^\top\mathbf{x} + b > 0]$把四点$(0, 0)$、$(1, 1)$（标签$0$）与$(1, 0)$、$(0, 1)$（标签$1$）全部分对。加上额外特征$x_1x_2$，线性分类器就能做到。
:::

::: proof
设这样的$w_1, w_2, b$存在。两个标签为$1$的点给出$w_1 + b > 0$与$w_2 + b > 0$；相加得$w_1 + w_2 + 2b > 0$。两个标签为$0$的点给出$b\le0$与$w_1 + w_2 + b\le0$；相加得$w_1 + w_2 + 2b\le0$。两个结论互相矛盾。改用特征$(x_1, x_2, x_1x_2)$，打分$x_1 + x_2 - 2x_1x_2 - \frac12$在按所列顺序的四点上依次为$-\frac12$、$-\frac12$、$\frac12$、$\frac12$，正好分对。
:::

Minsky 与 Papert 在《Perceptrons》（1969）中对这类局限的分析，常被归咎为1970年代神经网络研究兴趣的衰落。出路就在证明里：合适的特征让问题变线性。问题是怎么在事先不知道正确特征的情况下得到它们。

::: widget contour
f: x*y
x: -1.5, 1.5
y: -1.5, 1.5
levels: 12
point: 0.5, 0.5
caption: 乘积特征$x_1x_2$作为平面上的函数，此处$x = x_1$、$y = x_2$。它在第一、三象限为正，在另外两个象限为负——恰是以零为中心输入的 XOR 模式。在单一特征$x_1x_2$上的线性分类器用门限$0$就把两类分开，而原平面内没有一条直线做得到。拖动那个点：梯度显示该特征对每个坐标如何响应，除原点外它从不为零。
:::

### 显式特征的代价 {#sec-curse}

最显然的通用策略——把所有次数不超过某个值的特征乘积都放进去——很快就会撞上数字。

::: proposition 数多项式特征 {#prop-count}
$d$个变量中总次数不超过$k$的单项式$x_1^{a_1}\cdots x_d^{a_d}$（含常数项）的个数为$\binom{d + k}{k}$。
:::

::: proof
次数不超过$k$的单项式对应一组非负整数$a_1, \dots, a_d$，$a_1 + \dots + a_d\le k$；等价地，添一个松弛变量$a_0 = k - \sum_ia_i\ge0$，就是和恰为$k$的非负整数$a_0, \dots, a_d$。由隔板法的论证，把$k$个星与$d$个板排成一排的排法与这样的解一一对应（板把星切成$d + 1$组），排法数为$\binom{d + k}{d} = \binom{d + k}{k}$。
:::

$d = 100$个原始特征时，二次给$\binom{102}2 = 5151$个特征，三次给$\binom{103}3 = 176{,}851$个。对一幅$256\times256$像素的图像，仅二次特征就超过二十亿。而高维空间有一种坑人的怪异：在立方体$[-1, 1]^d$中，落在略小的立方体$[-0.95, 0.95]^d$内的体积占比是$0.95^d$，$d = 100$时只有$0.006$——几乎全部体积都贴近边界，随机点之间的距离向一个公共值集中。这一族效应就是**维度灾难**（Bellman 的用语，1957）。核方法绕开了显式特征；学得的表示绕开了高维的原始空间。

## 核 {#sec-kernels}

再看一遍带特征$\boldsymbol\phi$的岭回归。设$\Phi\in\R^{n\times p}$是以$\boldsymbol\phi(\mathbf{x}_i)^\top$为行的矩阵，$p$可能巨大。

::: proposition 岭回归只依赖内积 {#prop-kernel-ridge}
岭估计$\hat{\mathbf{w}} = (\Phi^\top\Phi + \lambda I_p)^{-1}\Phi^\top\mathbf{y}$可写成$\hat{\mathbf{w}} = \Phi^\top\boldsymbol\alpha$，其中

$$
\boldsymbol\alpha = (K + \lambda I_n)^{-1}\mathbf{y},\qquad K_{ij} = \boldsymbol\phi(\mathbf{x}_i)^\top\boldsymbol\phi(\mathbf{x}_j),
$$

而它在新输入处的预测为$\hat f(\mathbf{x}) = \sum_{i=1}^n\alpha_i\,\boldsymbol\phi(\mathbf{x}_i)^\top\boldsymbol\phi(\mathbf{x})$。需要的只是特征向量之间的内积。
:::

::: proof
展开即知恒等式$\Phi^\top(\Phi\Phi^\top + \lambda I_n) = (\Phi^\top\Phi + \lambda I_p)\Phi^\top$成立。$\lambda > 0$时两个括号中的矩阵都可逆，于是$(\Phi^\top\Phi + \lambda I_p)^{-1}\Phi^\top = \Phi^\top(\Phi\Phi^\top + \lambda I_n)^{-1}$。两边作用于$\mathbf{y}$，并注意$\Phi\Phi^\top = K$，即得$\hat{\mathbf{w}} = \Phi^\top\boldsymbol\alpha$。于是$\hat{\mathbf{w}}^\top\boldsymbol\phi(\mathbf{x}) = \boldsymbol\alpha^\top\Phi\boldsymbol\phi(\mathbf{x}) = \sum_i\alpha_i\boldsymbol\phi(\mathbf{x}_i)^\top\boldsymbol\phi(\mathbf{x})$。
:::

如今的计算涉及的是$n\times n$的方程组而不是$p\times p$的，而特征只通过$k(\mathbf{x}, \mathbf{x}') = \boldsymbol\phi(\mathbf{x})^\top\boldsymbol\phi(\mathbf{x}')$出现。如果这个内积不用真造出$\boldsymbol\phi$就能算，特征空间想多大就可以有多大。这就是**核技巧**。

::: definition 半正定核 {#def-kernel}
函数$k\colon\mathcal{X}\times\mathcal{X}\to\R$称为**（半正定）核**，如果它对称，并且对每个有限输入集$\mathbf{x}_1, \dots, \mathbf{x}_m$，**Gram 矩阵**$K_{ij} = k(\mathbf{x}_i, \mathbf{x}_j)$都是半正定的。$\R^d$上的标准例子：

- **多项式核**$k(\mathbf{x}, \mathbf{z}) = (1 + \mathbf{x}^\top\mathbf{z})^k$；
- **高斯核**或**RBF**（径向基函数）核$k(\mathbf{x}, \mathbf{z}) = \exp(-\gamma\lVert\mathbf{x} - \mathbf{z}\rVert^2)$，$\gamma > 0$。
:::

每个特征内积都是一个核，因为$\mathbf{a}^\top K\mathbf{a} = \lVert\sum_ia_i\boldsymbol\phi(\mathbf{x}_i)\rVert^2\ge0$。反过来才是深刻的事实：由 Moore–Aronszajn 定理（Aronszajn，1950），每个半正定核都是某个映射到希尔伯特空间的特征映射的内积$\langle\boldsymbol\phi(\mathbf{x}), \boldsymbol\phi(\mathbf{x}')\rangle$，那个空间称为它的**再生核希尔伯特空间**（RKHS）；对紧集上的连续核，Mercer 定理（1909）把特征给出为特征函数。多项式核对应一切次数不超过$k$的单项式（带特定的权重）——$\binom{d + k}k$个特征，计算只需$O(d)$时间。RBF 核对应一个*无穷*维的特征空间。

::: example 多项式核的特征 {#ex-poly-kernel}
对$\mathbf{x}, \mathbf{z}\in\R^2$，把$(1 + \mathbf{x}^\top\mathbf{z})^2$展开，求出一个满足$\boldsymbol\phi(\mathbf{x})^\top\boldsymbol\phi(\mathbf{z}) = (1 + \mathbf{x}^\top\mathbf{z})^2$的特征映射$\boldsymbol\phi$。对$\mathbf{x} = (1, 2)$、$\mathbf{z} = (3, -1)$把两边都算出来。
::: solution
$(1 + x_1z_1 + x_2z_2)^2 = 1 + 2x_1z_1 + 2x_2z_2 + x_1^2z_1^2 + x_2^2z_2^2 + 2x_1x_2z_1z_2$。于是

$$
\boldsymbol\phi(\mathbf{x}) = \big(1,\ \sqrt2x_1,\ \sqrt2x_2,\ x_1^2,\ x_2^2,\ \sqrt2x_1x_2\big)
$$

可行：六个特征，其中就有解 XOR 的那个乘积$x_1x_2$。对所给向量，$\mathbf{x}^\top\mathbf{z} = 3 - 2 = 1$，核值为$(1 + 1)^2 = 4$。显式地，$\boldsymbol\phi(\mathbf{x}) = (1, \sqrt2, 2\sqrt2, 1, 4, 2\sqrt2)$，$\boldsymbol\phi(\mathbf{z}) = (1, 3\sqrt2, -\sqrt2, 9, 1, -3\sqrt2)$，内积为$1 + 6 - 4 + 9 + 4 - 12 = 4$。
:::
:::

[[#prop-kernel-ridge]]是一条一般原理的特例，即**表示定理**（Kimeldorf 与 Wahba，1971；Schölkopf、Herbrich 与 Smola，2001）：对任意损失、任意随 RKHS 范数增大的惩罚，正则化经验风险的极小化者都有形式$\hat f(\mathbf{x}) = \sum_i\alpha_ik(\mathbf{x}_i, \mathbf{x})$——以训练点为中心的核的加权和。于是核逻辑回归以及**支持向量机**（hinge 损失加$\ell_2$惩罚；Boser、Guyon 与 Vapnik，1992；Cortes 与 Vapnik，1995）也同样化约到$n$个系数。对 RBF 核，$\hat f$是训练点上高斯形小丘之和：标签的光滑插值，其宽度$1/\sqrt\gamma$像多项式次数那样在偏差与方差之间做权衡。

::: example 手算核岭回归 {#ex-kernel-ridge}
两个训练点，$x_1 = 0$配$y_1 = 1$、$x_2 = 1$配$y_2 = -1$，用 RBF 核$k(x, z) = e^{-(x - z)^2}$与$\lambda = 0.1$作核岭回归。求$\boldsymbol\alpha$以及在$x = 0$、$0.5$、$2$与$5$处的预测。
::: solution
$k(0, 1) = e^{-1} = 0.368$，故$K + \lambda I = \begin{pmatrix}1.1 & 0.368\\ 0.368 & 1.1\end{pmatrix}$，行列式$1.21 - 0.135 = 1.075$。解$(K + \lambda I)\boldsymbol\alpha = (1, -1)$得$\alpha_1 = (1.1 + 0.368)/1.075 = 1.366$，由对称性$\alpha_2 = -1.366$。预测为$\hat f(x) = 1.366\,(e^{-x^2} - e^{-(x - 1)^2})$：$x = 0$处为$1.366(1 - 0.368) = 0.863$（被惩罚从标签$1$缩了下来），$x = 0.5$处由对称性为$0$，$x = 2$处为$1.366(0.018 - 0.368) = -0.478$，$x = 5$处约为$10^{-7}$。远离所有训练点时每个核项都消失，RBF 模型预测$0$：它在数据之间插值，数据之外却无话可说。
:::
:::

从1990年代末到2010年代初，核方法是许多分类问题的领先方法，训练是凸的，理论也强。它的弱点在规模：Gram 矩阵有$n^2$个元素，与它相关的求解代价是$O(n^3)$，几万个样例以上若不用随机特征一类的近似（Rahimi 与 Recht，2007；习题10）就望而却步。而且核与手工设计的特征映射一样，是选出来的，不是学出来的。

## 不用参数的学习：近邻与树 {#sec-nonparametric}

另有两个家族不用固定的特征映射、直接从数据构造灵活的预测器。

::: algorithm $k$-最邻近 {#alg-knn}
在$\mathbf{x}$处预测：找离$\mathbf{x}$最近的$k$个训练输入（通常在标准化特征上用欧氏距离）；分类就返回其中的多数标签，回归就返回平均。
:::

根本不训练——模型就是数据——预测需要搜索训练集。近邻个数$k$控制偏差-方差权衡（[[ml-fundamentals/generalisation#ex-knn]]）：$k = 1$跟着每个带噪标签跑，$k$大则平均到了大到不均匀的区域。Cover 与 Hart（1967）证明，当$n\to\infty$时，两类问题中 1-最邻近规则的错误率$R_{1\text{NN}}$满足$R^*\le R_{1\text{NN}}\le2R^*(1 - R^*)$，其中$R^*$是贝叶斯风险：数据无限时，一个近邻至多比最优分类器差大约一倍。然而在高维中，随着距离的集中，“最近”失去了意义（[[#sec-curse]]），所需数据随维数指数增长——除非数据落在低维结构附近，或一个好的表示把它们放到那里。

**决策树**用单特征上的门限（“收入超过$40{,}000$吗？”，接着“年龄小于$30$吗？”）递归地切分输入空间，每个切分都选得让分出的组尽量纯净，再用每个叶的多数标签或均值预测（CART，Breiman、Friedman、Olshen 与 Stone，1984；ID3 与 C4.5，Quinlan，1986 与 1993）。一棵深树偏差低、方差极高。把许多在自助样本上、以随机特征子集长出的树平均起来——**随机森林**（Breiman，2001）——降低方差；**梯度提升**（Friedman，2001）一次添加一棵小树去拟合集成至今的残差误差，降低偏差。在列异质、各有含义的表格数据上，截至2026年树集成与神经网络相比仍很有竞争力（例如 Grinsztajn、Oyallon 与 Varoquaux，2022）；在图像、音频与文本上，学得的表示已把它们取代。

## 在 XOR 上比较 {#sec-code}

下面的清单生成$200$个在正方形$[-1, 1]^2$上均匀分布的训练点，标签为 XOR 的$[x_1x_2 > 0]$，并以概率$0.05$翻转（于是贝叶斯准确率为$0.95$），然后比较：原始特征上的逻辑回归、加上乘积特征的逻辑回归、$\pm1$标签上分别用线性核与 RBF 核的核岭回归，以及$k$-最邻近，全部在$1000$个测试点上度量。

```python
import math, random

rng = random.Random(8)

def sample(n):
    """XOR pattern: x uniform on [-1, 1]^2, label 1 when x1 * x2 > 0, flipped with probability 0.05."""
    D = []
    for _ in range(n):
        x = (rng.uniform(-1, 1), rng.uniform(-1, 1))
        y = int(x[0] * x[1] > 0)
        if rng.random() < 0.05:
            y = 1 - y
        D.append((x, y))
    return D

train, test = sample(200), sample(1000)
acc = lambda predict, D: sum(predict(x) == y for x, y in D) / len(D)

def logistic(feats, D, eta=0.5, steps=3000):
    """Logistic regression by gradient descent on the features feats(x) (first feature = 1)."""
    w = [0.0] * len(feats(D[0][0]))
    for _ in range(steps):
        g = [0.0] * len(w)
        for x, y in D:
            f = feats(x)
            z = sum(a * b for a, b in zip(w, f))
            p = 1 / (1 + math.exp(-z))
            for j in range(len(w)):
                g[j] += (p - y) * f[j] / len(D)
        w = [wj - eta * gj for wj, gj in zip(w, g)]
    return lambda x: int(sum(a * b for a, b in zip(w, feats(x))) > 0)

raw = lambda x: [1.0, x[0], x[1]]
product = lambda x: [1.0, x[0], x[1], x[0] * x[1]]
print("logistic, raw features      test acc", acc(logistic(raw, train), test))
print("logistic, + x1*x2 feature   test acc", acc(logistic(product, train), test))

def solve(A, b):
    m = len(A); M = [r[:] + [v] for r, v in zip(A, b)]
    for k in range(m):
        q = max(range(k, m), key=lambda i: abs(M[i][k])); M[k], M[q] = M[q], M[k]
        for i in range(k + 1, m):
            c = M[i][k] / M[k][k]
            for j in range(k, m + 1): M[i][j] -= c * M[k][j]
    x = [0.0] * m
    for k in reversed(range(m)):
        x[k] = (M[k][m] - sum(M[k][j] * x[j] for j in range(k + 1, m))) / M[k][k]
    return x

def kernel_ridge(k, D, lam):
    """Kernel ridge regression on labels +-1: alpha = (K + lam I)^-1 y, f(x) = sum_i alpha_i k(x_i, x)."""
    K = [[k(xi, xj) + (lam if i == j else 0) for j, (xj, _) in enumerate(D)] for i, (xi, _) in enumerate(D)]
    alpha = solve(K, [2 * y - 1 for _, y in D])
    return lambda x: int(sum(a * k(xi, x) for a, (xi, _) in zip(alpha, D)) > 0)

rbf = lambda gamma: (lambda u, v: math.exp(-gamma * ((u[0] - v[0]) ** 2 + (u[1] - v[1]) ** 2)))
linear = lambda u, v: u[0] * v[0] + u[1] * v[1] + 1
for name, k in [("linear kernel", linear), ("RBF, gamma=5", rbf(5.0))]:
    print(f"kernel ridge, {name:14s} test acc", acc(kernel_ridge(k, train, lam=0.1), test))

def knn(D, kk):
    def predict(x):
        near = sorted(D, key=lambda e: (e[0][0] - x[0]) ** 2 + (e[0][1] - x[1]) ** 2)[:kk]
        return int(2 * sum(y for _, y in near) > kk)
    return predict

for kk in (1, 5, 25, 101):
    print(f"{kk:3d}-nearest neighbours       test acc", acc(knn(train, kk), test))
```

```text
logistic, raw features      test acc 0.501
logistic, + x1*x2 feature   test acc 0.922
kernel ridge, linear kernel  test acc 0.501
kernel ridge, RBF, gamma=5   test acc 0.917
  1-nearest neighbours       test acc 0.898
  5-nearest neighbours       test acc 0.911
 25-nearest neighbours       test acc 0.901
101-nearest neighbours       test acc 0.748
```

在原始特征上，逻辑回归与线性核（同一个模型类）都停在瞎猜的水平，正像[[#prop-xor]]预言的那样。一个工程化的特征把逻辑回归抬到$0.922$；拟合出的$x_1x_2$权重很大（$18.3$），而$x_1$与$x_2$上由噪声驱动的小权重让分界线微微倾斜，这就是它够不上贝叶斯规则$[x_1x_2 > 0]$（在这份测试集上得$0.959$）的原因。RBF 核在*没人告诉它*乘积的情况下到了$0.917$：它的无穷维特征空间里含有一个够好的近似。$k = 5$的近邻法也几乎一样好；$k = 1$更噪（错误率$0.102$接近 Cover–Hart 下界$2\cdot0.05\cdot0.95 = 0.095$），而$k = 101$——半个训练集——把象限之间一平均，模式就丢了。在二维里，每个灵活方法都行。它们的分别出现在图像、文本这类高维输入上：手工特征无从得知，核与近邻受维度灾难所困，学得的表示胜出。

::: quiz
用 RBF 核对$n = 10^5$个样例做核岭回归。哪条陈述正确？
- [ ] 特征空间是无穷维的，所以代价与$n$无关
- [x] 它需要$n\times n$的 Gram 矩阵（$10^{10}$个元素），精确求解要$n^3$量级的运算
- [ ] 它等价于原始特征上的逻辑回归
- [ ] 岭回归是线性的，所以它拟合不了非线性函数
::: solution
由[[#prop-kernel-ridge]]，解需要$(K + \lambda I)^{-1}\mathbf{y}$，其中$K$是$n\times n$的：$10^{10}$个元素（双精度约$80$ GB），直接求解$O(n^3) = 10^{15}$次运算。无穷维特征空间从未被造出来，代价却按$n$付掉了。模型在 RKHS 特征中是线性的，而这些特征是输入的非线性函数，所以它拟合非线性函数。
:::
:::

## 学得的表示 {#sec-learned}

神经网络把固定的特征映射换成带参数的$\boldsymbol\phi_\theta$，并让它与上层的线性模型一道训练：

$$
h(\mathbf{x}) = W\boldsymbol\phi_\theta(\mathbf{x}) + \mathbf{b},\qquad\text{例如}\quad\boldsymbol\phi_\theta(\mathbf{x}) = g(A\mathbf{x} + \mathbf{c}),\ \theta = (A, \mathbf{c}),
$$

其中$g$是像$\max(0, \cdot)$那样逐元素作用的非线性函数。叠上若干这样的层，$\boldsymbol\phi_\theta$就是一个深度网络，而最后一层恰是[[ml-fundamentals/logistic-regression]]的逻辑回归或 softmax 回归，只不过作用在特征上——那些特征之所以被学出来，正是为了让最后这个线性问题变得好解。代价是凸性：损失作为$\theta$的函数不再凸，本课程的所有封闭形式统统失效。收获是特征不必再靠人发明了。一个小网络自己学出一个类似乘积的特征，就解掉了 XOR（[[neural-networks/perceptrons-mlps]]）；卷积网络在第一层学出边缘检测器，更深的层学出物体部件（[[neural-networks/convolutional-networks]]）。

学得的特征还是**可迁移的**。在一个大而通用的任务上——网络文本上的下一词元预测、几百万张图像的分类——训练出的网络，其特征对许多别的任务同样有用。冻结$\boldsymbol\phi_\theta$、只在一个小的带标签集合上训练一个新的线性头（**线性探针**），常常出奇地好；再微调整个网络则更好。线性探针也是一种提问手段，问一个表示里装了什么（[[interpretability/probing-attribution]]）：若一个线性分类器能从语言模型的隐状态里读出某个词的词性，那份信息就以线性可及的形式存在于那里——尽管模型未必用它。

### 嵌入 {#sec-embeddings}

语言模型的输入是离散词元的序列。词元的独热编码是维度为$\lvert\mathcal{V}\rvert$——几万到几十万——的向量，其中任何两个词元都正交、等距。模型的第一层把它换成一个稠密的、学得的向量。

::: definition 嵌入 {#def-embedding}
有限集$\mathcal{V} = \{1, \dots, V\}$在$\R^d$中的一个**嵌入**是一个矩阵$E\in\R^{V\times d}$，其第$i$行$\mathbf{e}_i$是代表第$i$个对象的向量。**嵌入查表**把对象$i$映为$\mathbf{e}_i$。$E$的元素是参数，随模型的其余部分一道学习。
:::

::: proposition 嵌入查表就是独热向量上的线性层 {#prop-embedding}
若$\mathbf{o}_i\in\R^V$是对象$i$的独热向量，则$\mathbf{o}_i^\top E = \mathbf{e}_i$。因此作用在独热输入上的线性层就是一个嵌入，而损失关于$E$的梯度，除输入中出现的对象对应的行外，处处为零。
:::

::: proof
$(\mathbf{o}_i^\top E)_j = \sum_k(\mathbf{o}_i)_kE_{kj} = E_{ij}$，因为$\mathbf{o}_i$只有第$i$个分量非零。关于梯度：输出只通过输入所选中的那些行依赖于$E$，所以对其余分量的偏导都消失；由线性层法则（[[math-for-ml/gradients#prop-linear-grad]]），梯度为$\mathbf{o}_i\mathbf{g}^\top$，其中$\mathbf{g}$是关于$\mathbf{e}_i$的梯度，故只有第$i$行非零。
:::

所以嵌入并不是一类新东西：它是一个线性映射，只是实现成查表，因为乘以独热向量会白费$V$倍的功。让嵌入强有力的，是训练在它身上做的事。因为模型的预测依赖嵌入，数据中表现相似的对象——按 Harris（1954）与 Firth（1957）的**分布式假说**，出现在相似上下文中的词——会得到相似的向量，于是一个对象上学到的东西会转移到别的对象上。Word2vec（Mikolov 等人，2013）用一个“由邻词预测词”的浅层模型学这样的向量，并发现嵌入空间中的方向编码着关系（从 *man* 到 *woman* 的向量大致平行于从 *king* 到 *queen* 的向量）；[[text-and-language/word-embeddings]]对此展开。在 Transformer 里，词元嵌入只是第一个表示；每一层都算出一个新的、依赖上下文的表示（[[sequence-models/contextual-embeddings]]），而输出层之前的隐状态，就是学得的$\boldsymbol\phi_\theta(x_{<t})$，[[ml-fundamentals/logistic-regression#sec-lm-head]]的 softmax 回归在它上面预测下一个词元。

::: example 相似的向量 {#ex-embeddings}
$\R^3$中的玩具嵌入为$\mathbf{e}_{\textit{cat}} = (0.8, 0.1, 0.3)$、$\mathbf{e}_{\textit{dog}} = (0.7, 0.2, 0.4)$、$\mathbf{e}_{\textit{on}} = (-0.1, 0.9, 0.0)$。计算 *cat* 与 *dog*、与 *on* 的余弦相似度，并与独热向量对照。
::: solution
$\mathbf{e}_{\textit{cat}}\cdot\mathbf{e}_{\textit{dog}} = 0.56 + 0.02 + 0.12 = 0.70$，范数为$\sqrt{0.74} = 0.860$与$\sqrt{0.69} = 0.831$，故余弦为$0.70/0.715 = 0.979$。$\mathbf{e}_{\textit{cat}}\cdot\mathbf{e}_{\textit{on}} = -0.08 + 0.09 + 0 = 0.01$，而$\lVert\mathbf{e}_{\textit{on}}\rVert = 0.906$，故余弦为$0.013$。*cat* 与 *dog* 近乎平行，*cat* 与 *on* 近乎正交。换成独热向量，三个余弦都会是$0$：那种表示表达不出猫和狗的相像。（真实的嵌入有数百乃至数千维，是学出来的而非挑出来的；余弦相似度的定义在[[math-for-ml/vectors-matrices#eq-cosine]]。）
:::
:::

::: warning 特征会漏答案
用标签、或用未来的信息算出的特征，会让模型评测时出色、使用时拉胯。经典案例：医院病历模型用“已给予的治疗”去预测引发该治疗的诊断；欺诈模型用调查人员事后填写的字段；图像分类器记住了某一类图片来源的水印或扫描仪；文本分类器依赖于标注者的排版习惯。学得的表示也逃不掉——网络会抓住数据允许的任何捷径（Geirhos 等人，2020）——反而让它更难被发现。对每个输入都问一句：在预测时刻，它是否也以同样的含义可得？并在训练集之外独立收集的数据上测试。
:::

::: history
Ronald Fisher 的判别函数（1936）与 Frank Rosenblatt 的感知器（1958）在给定特征上是线性的；Marvin Minsky 与 Seymour Papert 的《Perceptrons》（1969）分析了这类模型算不了什么。最邻近分类可追溯到 Fix 与 Hodges（1951），其渐近分析出自 Thomas Cover 与 Peter Hart（1967）。把核当作特征空间中的内积，见于 Aizerman、Braverman 与 Rozonoer（1964）的“势函数”方法；Bernhard Boser、Isabelle Guyon 与 Vladimir Vapnik 在1992年把它与最大间隔分类器结合，Corinna Cortes 与 Vapnik 的软间隔支持向量机（1995）让核方法成为主流。Leo Breiman 等人的 CART（1984）、Breiman 的随机森林（2001）与 Jerome Friedman 的梯度提升（2001）确立了树集成。用反向传播学习内部表示由 David Rumelhart、Geoffrey Hinton 与 Ronald Williams（1986）演示；学得的词向量随 Yoshua Bengio 等人的神经语言模型（2003）进入语言建模，并随 word2vec（Tomas Mikolov 等人，2013）广为流传；Bengio、Aaron Courville 与 Pascal Vincent 的综述“Representation learning”（2013）为这个领域定了名。
:::

::: summary
- 线性模型的好坏超不过它的特征：工程化的特征（标准化、独热、词袋、交互项）编码对问题的了解；XOR 展示了原始特征可能漏掉什么。
- 显式的高阶特征按组合爆炸式增长，$\binom{d + k}k$，而高维空间让基于距离的直觉失灵（维度灾难）。
- **核**隐式地在大或无穷的特征空间中算内积；核岭回归解$(K + \lambda I)\boldsymbol\alpha = \mathbf{y}$，表示定理让每个这样的模型都成为训练点上核的加权和，代价随$n^2$到$n^3$增长。
- **最邻近**与**树集成**是灵活的非参数替代；1-NN 渐近地在贝叶斯风险的两倍之内，树集成在表格数据上依然强劲。
- **神经网络学特征映射**，上面再放一个线性（softmax）模型；学得的特征跨任务迁移。**嵌入**是从独热符号到稠密向量的一个学得的线性映射，相似的对象得到相似的向量。
:::

## 习题

::: exercise 独热的维数 {level=1 check="23"}
一张表有三个类别列，可能取值各为$4$、$7$、$12$个。独热编码产生多少个特征？
::: solution
$4 + 7 + 12 = 23$。（若模型带截距，每列有一个示性变量是冗余的，因为每列的示性变量之和为$1$；每列去一后为$20$。）
:::
:::

::: exercise 二次特征 {level=1 check="66"}
$d = 10$个变量中，次数不超过$2$的单项式（含常数）有多少个？
::: solution
由[[#prop-count]]，$\binom{12}2 = 66$：常数、$10$个一次项、$10$个平方项与$\binom{10}2 = 45$个乘积项。
:::
:::

::: exercise 一个 RBF 核的值 {level=1 check="exp(-1)"}
计算$k(\mathbf{x}, \mathbf{z}) = \exp(-\gamma\lVert\mathbf{x} - \mathbf{z}\rVert^2)$在$\mathbf{x} = (0, 0)$、$\mathbf{z} = (1, 1)$、$\gamma = 0.5$处的值。
::: solution
$\lVert\mathbf{x} - \mathbf{z}\rVert^2 = 2$，故$k = e^{-0.5\cdot2} = e^{-1}\approx0.368$。
:::
:::

::: exercise 一个多项式核的值 {level=1 check="9"}
计算$\mathbf{x} = (2, 1)$与$\mathbf{z} = (1, 0)$处的$(1 + \mathbf{x}^\top\mathbf{z})^2$，并用[[#ex-poly-kernel]]的特征映射验证。
::: solution
$\mathbf{x}^\top\mathbf{z} = 2$，核值为$9$。由$\boldsymbol\phi(\mathbf{x}) = (1, 2\sqrt2, \sqrt2, 4, 1, 2\sqrt2)$、$\boldsymbol\phi(\mathbf{z}) = (1, \sqrt2, 0, 1, 0, 0)$，内积为$1 + 4 + 0 + 4 + 0 + 0 = 9$。
:::
:::

::: exercise 超立方体的边 {level=2 check="0.95^100"}
$[-1, 1]^{100}$的体积有多大比例落在$[-0.95, 0.95]^{100}$里？
::: solution
体积之比为$(1.9/2)^{100} = 0.95^{100}\approx0.0059$。立方体超过$99\%$的体积，在至少一个坐标上距边界不到$0.05$。在这样的空间里，一个要包含固定比例数据的“邻域”，必须在每个坐标上铺过大半的取值范围，于是“近邻”并不近。
:::
:::

::: exercise 嵌入的参数 {level=2 check="32000*4096"}
一个语言模型词表有$32{,}000$个词元，模型宽度$d = 4096$。它的输入嵌入矩阵有多少个参数？在一个含$3000$个不同词元的训练批次中，它的多少行收到非零梯度？
::: solution
$32{,}000\times4096 = 131{,}072{,}000$个参数，约$1.31$亿。由[[#prop-embedding]]，只有批次中出现的$3000$个词元对应的行拿到梯度；其余$29{,}000$行在这一步无动于衷（权重衰减若施加则除外）。
:::
:::

::: exercise 不带常数的核 {level=2}
证明$\R^2$上的$k(\mathbf{x}, \mathbf{z}) = (\mathbf{x}^\top\mathbf{z})^2$是特征$\boldsymbol\psi(\mathbf{x}) = (x_1^2, \sqrt2x_1x_2, x_2^2)$的内积。把[[#prop-xor]]的输入改编码为$\pm1$后，$\boldsymbol\psi$上的线性分类器能解 XOR 问题吗？
::: solution
$(x_1z_1 + x_2z_2)^2 = x_1^2z_1^2 + 2x_1x_2z_1z_2 + x_2^2z_2^2 = \boldsymbol\psi(\mathbf{x})^\top\boldsymbol\psi(\mathbf{z})$。输入为$(\pm1, \pm1)$时，XOR 把“符号不同”标为$1$；在这些输入上$x_1^2 = x_2^2 = 1$，且$\sqrt2x_1x_2 = \pm\sqrt2$，符号恰在标签为$1$处为负。于是分类器$[-\sqrt2x_1x_2 > 0]$——它在$\boldsymbol\psi$中是线性的——在四个点上全对。
:::
:::

::: exercise Cover–Hart 界 {level=2 check="0.095"}
一个两类问题的贝叶斯风险为$R^* = 0.05$。按 Cover 与 Hart 的结果，1-最邻近规则的渐近错误率最大是多少？
::: solution
$2R^*(1 - R^*) = 2\cdot0.05\cdot0.95 = 0.095$。XOR 清单恰好有这个贝叶斯风险，而它的 1-NN 测试错误率——只有$200$个训练点时是$0.102$——离这个界不远。
:::
:::

::: exercise 构造核 {level=3}
设$k_1$与$k_2$是$\mathcal{X}$上的核。证明$k_1 + k_2$、$ck_1$（$c\ge0$）与$k_1k_2$都是核。由此推出$(1 + \mathbf{x}^\top\mathbf{z})^k$对每个正整数$k$都是核。
::: solution
对称性每种情形都显然。对有有限输入集、Gram 矩阵为$K_1$、$K_2$的情形：$\mathbf{a}^\top(K_1 + K_2)\mathbf{a} = \mathbf{a}^\top K_1\mathbf{a} + \mathbf{a}^\top K_2\mathbf{a}\ge0$，且$\mathbf{a}^\top(cK_1)\mathbf{a}\ge0$。对乘积，Gram 矩阵是按元素（Hadamard）乘积$K_1\circ K_2$。把$K_2$写成$\sum_r\lambda_r\mathbf{v}_r\mathbf{v}_r^\top$，$\lambda_r\ge0$（谱定理，[[math-for-ml/matrix-decompositions#thm-spectral]]）。于是$\mathbf{a}^\top(K_1\circ K_2)\mathbf{a} = \sum_r\lambda_r\sum_{i,j}a_iv_{r,i}(K_1)_{ij}a_jv_{r,j} = \sum_r\lambda_r\,\mathbf{b}_r^\top K_1\mathbf{b}_r\ge0$，其中$b_{r,i} = a_iv_{r,i}$（这就是 Schur 乘积定理）。现在$\mathbf{x}^\top\mathbf{z}$是核（一个内积），常数$1$是核（特征映射$\phi(\mathbf{x}) = 1$），所以$1 + \mathbf{x}^\top\mathbf{z}$是核，再对乘积归纳，它的$k$次幂也是核。
:::
:::

::: exercise RBF 核的随机特征 {level=3}
对$\boldsymbol\omega\sim\Normal(\mathbf{0}, 2\gamma I)$、$b$服从$[0, 2\pi]$上的均匀分布，可以证明$\E[2\cos(\boldsymbol\omega^\top\mathbf{u} + b)\cos(\boldsymbol\omega^\top\mathbf{v} + b)] = \exp(-\gamma\lVert\mathbf{u} - \mathbf{v}\rVert^2)$（Rahimi 与 Recht，2007）。在清单后附加代码：取$D = 100$个如下特征$z_j(\mathbf{x}) = \sqrt{2/D}\cos(\boldsymbol\omega_j^\top\mathbf{x} + b_j)$，$\gamma = 5$；对某一对点比较$\mathbf{z}(\mathbf{u})^\top\mathbf{z}(\mathbf{v})$与核值；并在这些特征上拟合普通的岭回归（$\lambda = 0.1$）。为什么对大的$n$这比核岭回归便宜？
::: solution
接在清单后面的代码：

```python
# RBF 核 exp(-gamma |u - v|^2) 的随机傅里叶特征：omega ~ N(0, 2 gamma I)
gamma, D_feat, lam = 5.0, 100, 0.1
om = [(rng.gauss(0, math.sqrt(2 * gamma)), rng.gauss(0, math.sqrt(2 * gamma))) for _ in range(D_feat)]
ph = [rng.uniform(0, 2 * math.pi) for _ in range(D_feat)]
z = lambda x: [math.sqrt(2 / D_feat) * math.cos(o[0] * x[0] + o[1] * x[1] + b) for o, b in zip(om, ph)]
u, v = (0.1, 0.2), (0.3, -0.1)
print("kernel", round(rbf(gamma)(u, v), 3), " features", round(sum(a * b for a, b in zip(z(u), z(v))), 3))
Z = [z(x) for x, _ in train]                                       # (200, 100)
G = [[sum(r[i] * r[j] for r in Z) + (lam if i == j else 0) for j in range(D_feat)] for i in range(D_feat)]
w = solve(G, [sum(r[i] * (2 * y - 1) for r, (_, y) in zip(Z, train)) for i in range(D_feat)])
print("ridge on 100 random features  test acc", acc(lambda x: int(sum(a * b for a, b in zip(w, z(x))) > 0), test))
```

输出为

```text
kernel 0.522  features 0.458
ridge on 100 random features  test acc 0.919
```

特征内积$0.458$是核值$0.522$的一个带噪估计（误差按$1/\sqrt D$缩小），但用$100$个随机特征建成的分类器与精确的核岭回归（$0.919$对$0.917$）一样准。它的代价是带$D$个特征的岭回归的代价：时间$O(nD^2 + D^3)$、空间$O(nD)$，对$n$是线性的，而不是 Gram 矩阵的$O(n^3)$时间与$O(n^2)$空间。随机特征就是一个固定的、随机的第一层加一个训练出来的线性层——一个隐层不学习的神经网络。
:::
:::
