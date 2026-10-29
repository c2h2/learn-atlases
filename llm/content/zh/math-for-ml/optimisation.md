本图谱中每个模型的训练方式都相同：写下一个损失$\mathcal{L}(\theta)$，度量参数$\theta$拟合数据的糟糕程度；用反向传播算出它的梯度；朝下坡方向迈一小步。然后把这件事重复几十万次。这样一个简单的过程，能在数十亿变量的非凸函数上找到好的参数，是深度学习的意外收获之一，而且至今没有被完全解释清楚。*真正*被透彻理解的，是梯度下降在更简单的函数上的性态，而这部分理论解释了实践者关心的大多数事情：学习率为什么必须低于由曲率定下的阈值；病态问题为什么慢；随机梯度为什么需要递减或很小的步长；动量和 Adam 又是干什么用的。

本章把这套理论展开，证明只要够短就全部给出：凸性、$L$-光滑函数的下降引理、梯度下降在非凸与凸情形下的收敛、二次函数上的精确分析，然后是训练语言模型所用的随机方法与自适应方法——SGD、动量、Adam 与 AdamW，并逐条给出更新公式。最后讲约束优化与拉格朗日乘数，结果会看到，softmax 的来历恰好能被它解释。关于多元函数极值的背景，见数学图谱的[多元函数的极值](/learn/maths/lesson.php?c=multivariable&l=extrema)一课；关于一般的迭代方法，见[迭代法](/learn/maths/lesson.php?c=numerical-analysis&l=iterative-methods)。

## 问题 {#sec-problem}

我们要最小化一个可微函数$f\colon\R^d\to\R$——在机器学习中，它就是训练集上的平均损失$f(\theta) = \frac1N\sum_n\ell(\theta; x_n)$。若$f(\theta^*)\le f(\theta)$对一切$\theta$成立，则$\theta^*$是**全局最小值点**；若只需对$\theta^*$附近的$\theta$成立，则是**局部最小值点**。可微函数的任何局部最小值点处梯度为零，$\nabla f(\theta^*) = \mathbf{0}$；梯度为零的点称为**驻点**，其中也包括极大值点和**鞍点**——函数在某些方向向上弯、在另一些方向向下弯。二阶图景由**黑塞矩阵**$\nabla^2f$给出，它是由二阶偏导数构成的对称矩阵：在驻点处，黑塞矩阵正定意味着严格局部极小，特征值有正有负意味着鞍点（[[math-for-ml/matrix-decompositions#def-psd]]）。

基本的算法就是柯西（Cauchy）1847 年提出的那一个。

::: algorithm 梯度下降 {#alg-gd}
输入：起始点$\theta_0$和**学习率**（步长）$\eta > 0$。对$k = 0, 1, 2, \dots$：

$$
\theta_{k+1} = \theta_k - \eta\,\nabla f(\theta_k).
$$
:::

由[[math-for-ml/gradients#prop-steepest]]，$-\nabla f$是局部下降最快的方向。朝这个方向迈一步究竟能不能让$f$变小，取决于线性近似能信到什么程度——这是一个关于曲率的问题。

## 凸性 {#sec-convex}

::: definition 凸函数 {#def-convex}
若对所有$\mathbf{x}, \mathbf{y}$和$t\in[0, 1]$，

$$
f\big(t\mathbf{x} + (1 - t)\mathbf{y}\big)\le tf(\mathbf{x}) + (1 - t)f(\mathbf{y}):
$$

函数图像都落在每条弦的下方，则称$f\colon\R^d\to\R$是**凸**的。若$f(\mathbf{x}) - \frac\mu2\lVert\mathbf{x}\rVert^2$是凸的，则称$f$是**$\mu$-强凸**的（$\mu > 0$）。
:::

::: proposition 一阶刻画；局部即全局 {#prop-convex}
设$f$可微。则$f$凸当且仅当

$$
f(\mathbf{y})\ge f(\mathbf{x}) + \nabla f(\mathbf{x})\cdot(\mathbf{y} - \mathbf{x})\qquad\text{对一切 }\mathbf{x}, \mathbf{y}:
$$ {#eq-tangent}

即每个切平面都在图像下方。因此，对凸的可微$f$，每个驻点都是全局最小值点。二阶可导的$f$凸当且仅当其黑塞矩阵处处半正定。
:::

::: proof
若$f$凸，则对$t\in(0, 1]$，$f(\mathbf{x} + t(\mathbf{y} - \mathbf{x}))\le f(\mathbf{x}) + t\big(f(\mathbf{y}) - f(\mathbf{x})\big)$；减去$f(\mathbf{x})$、除以$t$再令$t\to0$：左边趋于方向导数$\nabla f(\mathbf{x})\cdot(\mathbf{y} - \mathbf{x})$，即得[[#eq-tangent]]。反过来，若[[#eq-tangent]]成立，令$\mathbf{z} = t\mathbf{x} + (1 - t)\mathbf{y}$，在$\mathbf{z}$处分别朝$\mathbf{x}$和朝$\mathbf{y}$使用它；把第一个不等式乘$t$、第二个乘$1 - t$再相加，梯度项相消，剩下$tf(\mathbf{x}) + (1 - t)f(\mathbf{y})\ge f(\mathbf{z})$。若$\nabla f(\mathbf{x}) = \mathbf{0}$，[[#eq-tangent]]就化为对一切$\mathbf{y}$有$f(\mathbf{y})\ge f(\mathbf{x})$。至于黑塞判据，把一维结论（$g'' \ge 0$当且仅当$g$凸）用在$g(t) = f(\mathbf{x} + t\mathbf{u})$上，它的二阶导数是$\mathbf{u}^\top\nabla^2f\,\mathbf{u}$。
:::

凸问题没有多余（虚假）的局部极小，任何方法找到的驻点就是答案。线性回归与逻辑回归、固定特征映射的 softmax 回归，以及把交叉熵损失看作 logits 的函数，都是凸的。神经网络不是：把一层里隐藏单元的编号置换一下，就得到一个不同的参数向量而损失完全一样，所以任何最小值点都有大量复制品，而两个复制品的平均——它们连线（弦）上的点——通常是个糟糕得多的网络。因此凸理论是*局部*行为以及超参影响的一份指南，而不是关于训练网络的保证。

::: example 凸还是不凸？ {#ex-convex}
判断下面各函数是否凸：(a) $f(\mathbf{x}) = \lVert A\mathbf{x} - \mathbf{b}\rVert^2$；(b) 交叉熵$-\log\operatorname{softmax}(\mathbf{z})_y$作为$\mathbf{z}$的函数；(c) 两层线性“网络”（权重为标量）的损失$(w_2w_1 - 1)^2$。
::: solution
(a) 黑塞矩阵$2A^\top A$，半正定（[[math-for-ml/matrix-decompositions#prop-psd]]）：凸。(b) $-z_y + \log\sum_ke^{z_k}$是线性项加 log-sum-exp，后者的黑塞矩阵$\diag(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$半正定：凸。(c) 在$(w_1, w_2) = (0, 0)$处梯度为零，黑塞矩阵是$\begin{pmatrix}0&-2\\-2&0\end{pmatrix}$，特征值$\pm2$：鞍点，所以函数不凸。它的最小值点构成双曲线$w_1w_2 = 1$，而两个最小值点$(1, 1)$与$(-1, -1)$的中点是损失为$1$的鞍点$(0, 0)$——正是上面那个对称性论证的微缩版。
:::
:::

## 光滑性与下降引理 {#sec-smooth}

::: definition $L$-光滑函数 {#def-smooth}
若可微函数$f$的梯度是$L$-利普希茨（Lipschitz）的：对所有$\mathbf{x}, \mathbf{y}$都有$\lVert\nabla f(\mathbf{x}) - \nabla f(\mathbf{y})\rVert\le L\lVert\mathbf{x} - \mathbf{y}\rVert$，则称$f$是**$L$-光滑**的。对二阶可导的$f$，这等价于黑塞矩阵的每个特征值处处落在$[-L, L]$中。
:::

$L$给曲率设了界：我们移动时，梯度能变化多快，$L$说了算。它把线性近似变成一个上界。

::: lemma 下降引理 {#lem-descent}
若$f$是$L$-光滑的，则对所有$\mathbf{x}, \mathbf{y}$，

$$
f(\mathbf{y})\le f(\mathbf{x}) + \nabla f(\mathbf{x})\cdot(\mathbf{y} - \mathbf{x}) + \frac L2\lVert\mathbf{y} - \mathbf{x}\rVert^2.
$$ {#eq-descent}

特别地，取$\eta = 1/L$走一步梯度，$f$至少下降$\frac1{2L}\lVert\nabla f(\mathbf{x})\rVert^2$。
:::

::: proof
令$\mathbf{h} = \mathbf{y} - \mathbf{x}$，$g(t) = f(\mathbf{x} + t\mathbf{h})$，则$g'(t) = \nabla f(\mathbf{x} + t\mathbf{h})\cdot\mathbf{h}$。于是

$$
f(\mathbf{y}) - f(\mathbf{x}) - \nabla f(\mathbf{x})\cdot\mathbf{h} = \int_0^1\big(\nabla f(\mathbf{x} + t\mathbf{h}) - \nabla f(\mathbf{x})\big)\cdot\mathbf{h}\,dt\le\int_0^1Lt\lVert\mathbf{h}\rVert^2\,dt = \frac L2\lVert\mathbf{h}\rVert^2,
$$

其中在积分号内用了柯西-施瓦茨（Cauchy–Schwarz）不等式和利普希茨界。对这一步，取$\mathbf{y} = \mathbf{x} - \frac1L\nabla f(\mathbf{x})$：[[#eq-descent]]右边化为$f(\mathbf{x}) - \frac1L\lVert\nabla f\rVert^2 + \frac1{2L}\lVert\nabla f\rVert^2 = f(\mathbf{x}) - \frac1{2L}\lVert\nabla f\rVert^2$。
:::

更一般地，长度为$\eta$的一步至多让$f$变化$-\eta(1 - \frac{L\eta}2)\lVert\nabla f\rVert^2$：只要$\eta < 2/L$，这就是有保证的下降，且在$\eta = 1/L$处降得最多。下面两个收敛定理，几行就能推出来。

::: theorem 光滑函数上的梯度下降 {#thm-gd-nonconvex}
设$f$是$L$-光滑的、下有界$f_{\inf}$，取$\eta = 1/L$运行梯度下降。则$f(\theta_k)$不增，且$K$步之后

$$
\min_{0\le k<K}\lVert\nabla f(\theta_k)\rVert^2\le\frac{2L\big(f(\theta_0) - f_{\inf}\big)}{K}.
$$
:::

::: proof
由[[#lem-descent]]，每个$k$都有$f(\theta_{k+1})\le f(\theta_k) - \frac1{2L}\lVert\nabla f(\theta_k)\rVert^2$，故函数值递减。对$k = 0, \dots, K - 1$求和，左边错位相消：

$$
\frac1{2L}\sum_{k=0}^{K-1}\lVert\nabla f(\theta_k)\rVert^2\le f(\theta_0) - f(\theta_K)\le f(\theta_0) - f_{\inf}.
$$

$K$个数的最小值不超过它们的平均，这就给出了界。
:::

这是没有凸性时唯一成立的保证，而且很弱：它只承诺一个近似**驻点**、而不是极小值点，速度还是平方梯度范数$1/K$这样慢的速率。它不排除鞍点，尽管对一般的起始点，梯度下降几乎必然不会收敛到严格鞍点（Lee 等人，2016）。有了凸性，我们就能对函数值本身得到保证。

::: theorem 光滑凸函数上的梯度下降 {#thm-gd-convex}
设$f$凸且$L$-光滑、存在最小值点$\theta^*$，取$\eta = 1/L$运行梯度下降。则

$$
f(\theta_K) - f(\theta^*)\le\frac{L\lVert\theta_0 - \theta^*\rVert^2}{2K}.
$$
:::

::: proof
记$\mathbf{g}_k = \nabla f(\theta_k)$。先用[[#lem-descent]]，再在$\mathbf{y} = \theta^*$处用[[#eq-tangent]]：

$$
f(\theta_{k+1})\le f(\theta_k) - \frac1{2L}\lVert\mathbf{g}_k\rVert^2\le f(\theta^*) + \mathbf{g}_k\cdot(\theta_k - \theta^*) - \frac1{2L}\lVert\mathbf{g}_k\rVert^2.
$$

配平方，$\mathbf{g}_k\cdot(\theta_k - \theta^*) - \frac1{2L}\lVert\mathbf{g}_k\rVert^2 = \frac L2\big(\lVert\theta_k - \theta^*\rVert^2 - \lVert\theta_k - \theta^* - \tfrac1L\mathbf{g}_k\rVert^2\big)$，而$\theta_k - \frac1L\mathbf{g}_k = \theta_{k+1}$。于是

$$
f(\theta_{k+1}) - f(\theta^*)\le\frac L2\big(\lVert\theta_k - \theta^*\rVert^2 - \lVert\theta_{k+1} - \theta^*\rVert^2\big).
$$

对$k = 0, \dots, K - 1$求和，右边错位相消后不超过$\frac L2\lVert\theta_0 - \theta^*\rVert^2$。又因$f(\theta_k)$不增，$K\big(f(\theta_K) - f(\theta^*)\big)\le\sum_{k=1}^K\big(f(\theta_k) - f(\theta^*)\big)$，除以$K$即得结论。
:::

如果$f$还$\mu$-强凸，收敛就变成**线性**（几何）的：取$\eta = 1/L$时有$\lVert\theta_k - \theta^*\rVert^2\le(1 - \mu/L)^k\lVert\theta_0 - \theta^*\rVert^2$。比值$\kappa = L/\mu$称为问题的**条件数**，达到给定精度所需的步数与它成正比。一个二次函数能把这一切看得清清楚楚。

## 二次模型 {#sec-quadratic}

在极小值点附近，任何光滑损失长得都像一个二次函数：$f(\theta)\approx f(\theta^*) + \frac12(\theta - \theta^*)^\top H(\theta - \theta^*)$，其中$H$是极小值点处的黑塞矩阵。所以梯度下降在$f(\theta) = \frac12\theta^\top A\theta$（$A$对称正定）上的行为，正是梯度下降处处具有的局部行为。

::: proposition 二次函数上的梯度下降 {#prop-quadratic}
设$f(\theta) = \frac12\theta^\top A\theta$，$A$的特征值满足$0 < \mu = \lambda_d\le\dots\le\lambda_1 = L$。步长为$\eta$的梯度下降给出$\theta_k = (I - \eta A)^k\theta_0$，且$\theta_k$沿特征向量$\mathbf{q}_i$的分量每步乘以$1 - \eta\lambda_i$。于是

1. 迭代对每个$\theta_0$都收敛，当且仅当$0 < \eta < 2/L$；
2. 误差每步按因子$\rho(\eta) = \max_i\lvert1 - \eta\lambda_i\rvert$收缩；
3. 最佳固定步长是$\eta^* = 2/(L + \mu)$，此时$\rho(\eta^*) = (\kappa - 1)/(\kappa + 1)$，$\kappa = L/\mu$。
:::

::: proof
$\nabla f = A\theta$，故$\theta_{k+1} = (I - \eta A)\theta_k$。在[[math-for-ml/matrix-decompositions#thm-spectral]]的特征基下，$I - \eta A = Q\diag(1 - \eta\lambda_i)Q^\top$，所以第$i$个坐标每步乘以$1 - \eta\lambda_i$。每个坐标都缩小，当且仅当对所有$i$有$\lvert1 - \eta\lambda_i\rvert < 1$，即$0 < \eta\lambda_i < 2$，而起约束作用的是最大特征值$L$。最差的因子是$\max(\lvert1 - \eta\mu\rvert, \lvert1 - \eta L\rvert)$，因为$\lvert1 - \eta\lambda\rvert$在取值区间的端点处最大；当二者相等时它被最小化，即$1 - \eta\mu = \eta L - 1$，解得$\eta^* = 2/(L + \mu)$，$\rho = (L - \mu)/(L + \mu)$。
:::

::: example 狭长碗形上的学习率 {#ex-quadratic}
对$f(x, y) = \frac12(x^2 + 10y^2)$，从$(1, 1)$出发，预测$\eta = 0.1$、$\eta = 2/11$、$\eta = 0.19$与$\eta = 0.21$时梯度下降的行为，并跑$30$步验证。
::: solution
特征值为$\mu = 1$与$L = 10$，$\kappa = 10$，步长上限为$2/L = 0.2$。每步的因子$(1 - \eta, 1 - 10\eta)$分别是：$\eta = 0.1$：$(0.9, 0)$——$y$一步解决，$x$慢慢缩小；$\eta = 2/11$：$(0.818, -0.818)$——最佳的平衡；$\eta = 0.19$：$(0.81, -0.9)$——$y$左右振荡；$\eta = 0.21$：$(0.79, -1.1)$——$y$以越来越大的幅度振荡，迭代发散。$30$步后到最小值点的距离应约为$0.9^{30} = 0.042$、$\sqrt2(9/11)^{30} = 0.0034$、$0.9^{30} = 0.042$与$1.1^{30} = 17.4$：

```python
import math

def grad(x, y):                 # f(x, y) = (x^2 + 10 y^2) / 2，故 L = 10，mu = 1
    return x, 10 * y

def run(eta, beta=0.0, steps=30):
    x, y = 1.0, 1.0             # 起点
    vx, vy = 0.0, 0.0           # 动量缓冲区（重球法）
    for _ in range(steps):
        gx, gy = grad(x, y)
        vx, vy = beta * vx - eta * gx, beta * vy - eta * gy
        x, y = x + vx, y + vy
    return math.hypot(x, y)     # 到最小值点 (0, 0) 的距离

for eta in (0.1, 2 / 11, 0.19, 0.21):
    print(f"GD        eta={eta:.4f}  distance after 30 steps: {run(eta):.3e}")
k = 10.0
beta = ((math.sqrt(k) - 1) / (math.sqrt(k) + 1)) ** 2
eta = 4 / (1 + math.sqrt(k)) ** 2       # mu = 1、L = 10 时最优的重球法参数
print(f"momentum  eta={eta:.4f} beta={beta:.4f}  distance after 30 steps: {run(eta, beta):.3e}")
```

```text
GD        eta=0.1000  distance after 30 steps: 4.239e-02
GD        eta=0.1818  distance after 30 steps: 3.436e-03
GD        eta=0.1900  distance after 30 steps: 4.243e-02
GD        eta=0.2100  distance after 30 steps: 1.745e+01
momentum  eta=0.2309 beta=0.2699  distance after 30 steps: 1.440e-07
```

最后一行预告了[[#sec-momentum]]：配上选得好的动量，同样$30$步能再近上四个数量级。
:::
:::

::: widget gradientdescent
f: 0.5*(x^2 + 10*y^2)
start: 1, 1
rate: 0.19
steps: 30
x: -1.5, 1.5
y: -1.5, 1.5
caption: 从$(1, 1)$出发、以$\eta = 0.19$在$\frac12(x^2 + 10y^2)$上做梯度下降，$\eta$略低于上限$2/L = 0.2$：迭代点在窄的方向上弹来弹去，同时沿着宽的方向缓慢挪动。把学习率调过$0.2$，它们就飞出去了；调到$0.1$，弹跳消失，但沿$x$的进展很慢。把方法切换成动量对比一下。
:::

这个二次模型解释了训练中最重要的一条事实：**学习率受损失最陡方向的限制，而进展受最平方向的限制。**对网络来说，$L$是黑塞矩阵的最大特征值（“尖锐度”），而 Cohen 等人（2021）的一个经验发现是：全量批训练往往会把尖锐度一路推高、直到它在$2/\eta$附近徘徊——所谓“稳定边缘（edge of stability）”——而不是稳妥地留在其下，长期来看损失呈非单调下降。真实的训练动力学比二次图景丰富得多，但阈值$2/L$是肉眼可见地在起作用。

::: warning 定理没有说到的部分
[[#thm-gd-nonconvex]]与[[#thm-gd-convex]]假定了固定且已知的光滑常数、精确的梯度，并且对后一个定理还假定了凸性。训练语言模型这些一个都不满足：损失非凸，曲率在训练中途一直在变，梯度是随机的，更新一旦进入曲率很大的区域，损失还可能飙升。理论解释的是良好实践的*形状*——学习率要低于曲率阈值、曲率高且不确定的时候做预热、收尾时衰减以降低噪声——但具体数值来自实验。而且，把训练损失降到很低本身不是目标：对新数据的泛化是另一个问题。
:::

## 随机梯度 {#sec-sgd}

计算$f(\theta) = \frac1N\sum_n\ell(\theta; x_n)$的完整梯度要遍历全部$N$个样本；对$10^{12}$词元的预训练语料来说，每一步都这么做是不可想象的。于是每一步改用一个由$B$个样本组成的随机**小批量**$\mathcal{B}$。

::: definition 随机梯度下降 {#def-sgd}
**随机梯度下降**（SGD）的更新为

$$
\theta_{k+1} = \theta_k - \eta_k\,\mathbf{g}_k,\qquad\mathbf{g}_k = \frac1B\sum_{n\in\mathcal{B}_k}\nabla\ell(\theta_k; x_n),
$$

其中小批量$\mathcal{B}_k$是随机抽取的，$\eta_k$是第$k$步的学习率。
:::

若小批量是均匀抽出的，$\mathbf{g}_k$就是$\nabla f(\theta_k)$的一个**无偏**估计：$\E[\mathbf{g}_k] = \nabla f(\theta_k)$。它的协方差是逐样本梯度协方差的$1/B$（有放回抽样时；[[math-for-ml/probability#prop-linearity]]），所以批量翻倍，梯度噪声的方差减半，代价是每步成本翻倍。噪声从本质上改变了收敛图景的一处：学习率恒定时，SGD 并不收敛到最小值点，而是在一个大小正比于$\eta$乘以噪声的区域内持续涨落（习题 9）。Robbins 与 Monro（1951）证明，满足

$$
\sum_k\eta_k = \infty\qquad\text{且}\qquad\sum_k\eta_k^2 < \infty,
$$

的步长（例如$\eta_k\propto1/k$）能在噪声存在时仍保证收敛：第一个条件让迭代点走得动任意远的距离，第二个让累积的噪声保持有限。现代训练用的调度大体是同一思路——训练大部分时间用大学习率，结尾衰减到零（例如余弦衰减）——前面通常再配一小段**预热**，让学习率从零线性爬升。

::: example 小批量梯度中的信号与噪声 {#ex-batch-noise}
对某一个参数，逐样本梯度的均值为$0.1$、标准差为$2$——这种参数很典型：平均梯度与样本之间的波动相比很小。求批量大小$B = 32$与$B = 1024$时小批量梯度的标准差及其信噪比（均值除以标准差），以及信噪比达到$1$时需要的批量。
::: solution
小批量均值的标准差是$2/\sqrt B$：$B = 32$时为$2/\sqrt{32} = 0.354$，$B = 1024$时为$2/\sqrt{1024} = 0.0625$。信噪比分别为$0.1/0.354 = 0.28$与$0.1/0.0625 = 1.6$。$B = 32$时，单步梯度方向弄反的概率相当大（噪声近似正态时约$39\%$），进展要靠许多步平均出来；$B = 1024$时多数步的方向是对的。信噪比为$1$当$\sqrt B = 2/0.1 = 20$，即$B = 400$。过了这个点，更大的批量主要买的是优化器并不需要的精度——临界批量大小背后的直觉就在这里。
:::
:::

梯度噪声也不全是麻烦。它让 SGD 得以逃离鞍点和尖锐区域；学习率与批量大小之比相当于这种噪声的温度；经验上，在一个取决于问题的“临界批量”之内，同时放大批量与学习率，能用更少的步数得到几乎相同的结果（McCandlish 等人，2018）。这些是训练的经验规律，不是定理。

## 动量与 Adam {#sec-momentum}

在病态问题上，朴素的梯度下降在窄方向上之字形来回横跳，在平方向上寸步挪腾。**动量**累积过去梯度的滑动平均，让来回振荡的分量互相抵消、方向一致的分量累加放大。

::: definition 重球动量 {#def-momentum}
取动量系数$\beta\in[0, 1)$、速度$\mathbf{v}_0 = \mathbf{0}$，**Polyak 的重球法**更新为

$$
\mathbf{v}_{k+1} = \beta\mathbf{v}_k - \eta\,\mathbf{g}_k,\qquad\theta_{k+1} = \theta_k + \mathbf{v}_{k+1}.
$$
:::

梯度恒为$\mathbf{g}$时，速度趋于$-\eta\mathbf{g}/(1 - \beta)$：在常用的$\beta = 0.9$下，有效学习率放大十倍；而逐步翻转符号的梯度则大体相互抵消。在强凸二次函数上，取$\eta = 4/(\sqrt L + \sqrt\mu)^2$、$\beta = \big((\sqrt\kappa - 1)/(\sqrt\kappa + 1)\big)^2$，误差的渐近收缩因子从$(\kappa - 1)/(\kappa + 1)$改善为每步$(\sqrt\kappa - 1)/(\sqrt\kappa + 1)$：对条件数的依赖从$\kappa$变成$\sqrt\kappa$（Polyak，1964）。Nesterov 的加速梯度法（1983）对一切光滑强凸函数（而不仅限于二次函数）都带保证地达到$\sqrt\kappa$速率。

如今几乎每个语言模型都用同一个优化器训练，它更进一步，让每个参数都有自己的步长。

::: algorithm Adam 与 AdamW {#alg-adam}
超参数：学习率$\eta$、衰减率$\beta_1, \beta_2\in[0, 1)$、很小的$\epsilon > 0$、权重衰减$\lambda\ge0$。初始化$\mathbf{m}_0 = \mathbf{v}_0 = \mathbf{0}$。第$t = 1, 2, \dots$步，随机梯度为$\mathbf{g}_t$，所有运算逐元素进行：

1. $\mathbf{m}_t = \beta_1\mathbf{m}_{t-1} + (1 - \beta_1)\mathbf{g}_t$（一阶矩，梯度的滑动平均）；
2. $\mathbf{v}_t = \beta_2\mathbf{v}_{t-1} + (1 - \beta_2)\mathbf{g}_t^2$（二阶矩，梯度平方的滑动平均）；
3. $\hat{\mathbf{m}}_t = \mathbf{m}_t/(1 - \beta_1^t)$，$\hat{\mathbf{v}}_t = \mathbf{v}_t/(1 - \beta_2^t)$（偏差校正）；
4. $\theta_t = \theta_{t-1} - \eta\Big(\dfrac{\hat{\mathbf{m}}_t}{\sqrt{\hat{\mathbf{v}}_t} + \epsilon} + \lambda\theta_{t-1}\Big)$。

$\lambda = 0$时这就是**Adam**（Kingma 与 Ba，2015）。$\lambda > 0$且按第 4 步那样、在自适应缩放之外施加时，就是**AdamW**（Loshchilov 与 Hutter，2019）。Adam 论文的默认值是$\beta_1 = 0.9$、$\beta_2 = 0.999$、$\epsilon = 10^{-8}$；许多已发表的语言模型配方使用$\beta_2 = 0.95$。
:::

每一步，每个参数大约移动$\eta$乘上“它的平均梯度与梯度均方根之比”——无论梯度是什么尺度，这个比值的量级至多约为$1$。梯度持续偏小的参数，能迈出和梯度大的参数一样大的步子，这在 Transformer 里很要紧：嵌入、注意力投影与归一化增益收到的梯度大小悬殊。偏差校正弥补了把两个平均初始化为零的缺陷：不加校正，早期的平均值会偏小$1 - \beta_1^t$和$1 - \beta_2^t$这些因子。AdamW 的解耦权重衰减每步把所有权重缩同样的比例$\eta\lambda$；若是把$\lambda\lVert\theta\rVert^2$加进损失，惩罚的梯度会经过自适应缩放，梯度历史大的参数反而衰减得少——这就不是[[math-for-ml/estimation#prop-weight-decay]]的那个 MAP 先验了，而且经验上正则化效果更差。

::: example Adam 的第一步，以及 Adam 的显存 {#ex-adam}
(a) 证明 Adam 的第一次更新是$-\eta\,\mathbf{g}_1/(\lvert\mathbf{g}_1\rvert + \epsilon)\approx-\eta\operatorname{sign}(\mathbf{g}_1)$，并求出$\beta_1 = 0.9$、$\beta_2 = 0.999$时，不作偏差校正的第一步有多大。(b) 一个有$7\times10^9$个参数、以 32 位浮点存储的模型，Adam 的两个矩缓冲区需要多少内存？
::: solution
(a) $\mathbf{m}_1 = (1 - \beta_1)\mathbf{g}_1$，$\mathbf{v}_1 = (1 - \beta_2)\mathbf{g}_1^2$，所以$\hat{\mathbf{m}}_1 = \mathbf{g}_1$，$\hat{\mathbf{v}}_1 = \mathbf{g}_1^2$，更新就是$-\eta\,\mathbf{g}_1/(\lvert\mathbf{g}_1\rvert + \epsilon)$：每个梯度非零的坐标都正好迈出$\eta$这么大。若不作校正，这一步会是$-\eta(1 - \beta_1)\mathbf{g}_1/(\sqrt{1 - \beta_2}\lvert\mathbf{g}_1\rvert) = -\eta\cdot0.1/0.0316\cdot\operatorname{sign}(\mathbf{g}_1)$，也就是大了$3.16$倍——偏偏就在训练最开头，大步为害最烈的时候。

(b) 两个各含$7\times10^9$个数的缓冲区、每个数$4$字节：$2\cdot4\cdot7\times10^9 = 5.6\times10^{10}$字节 $= 56$ GB，是权重本身按 16 位精度存储所需$14$ GB 的四倍。优化器状态是训练显存的大头，而把它切分到多块设备上、或用更少的比特存放它的那些方法，针对的正是这一点。
:::
:::

::: quiz
在$f(x, y) = \frac12(x^2 + 10y^2)$上从$(1, 1)$出发，Adam（$\eta = 0.1$）的迭代点每步都满足$x_t = y_t$。为什么？
- [ ] 因为 Adam 算的是精确的牛顿步
- [x] 因为 Adam 把每个坐标的梯度除以它自身尺度的滑动估计，所以对某个坐标的梯度做常数缩放毫无影响
- [ ] 因为动量把两个坐标平均了
- [ ] 因为偏差校正让所有坐标相等
::: solution
这里$g_y = 10y$，$g_x = x$；若$x = y$，则每步$g_y$恰好是$10g_x$，而$m_y/\sqrt{v_y} = 10m_x/\sqrt{100v_x} = m_x/\sqrt{v_x}$（忽略$\epsilon$）。于是两个坐标收到完全相同的更新，始终保持相等。Adam 对单个坐标的缩放具有不变性，这就是它能对付拖慢梯度下降的对角病态的原因；它对旋转没有不变性，所以沿非坐标轴方向的病态仍然会伤到它。在这个问题上跑 Adam，一步后得$(0.9, 0.9)$，十步后得$(0.0762, 0.0762)$（习题 10）。
:::
:::

## 约束优化 {#sec-constrained}

有时变量必须满足约束：概率之和要为一，范数要有界。对等式约束，经典工具是**拉格朗日乘数**：设$\mathbf{x}^*$是$f$在约束$h(\mathbf{x}) = 0$下的最小值点，若$\nabla h(\mathbf{x}^*)\ne\mathbf{0}$，则存在数$\lambda$使得

$$
\nabla f(\mathbf{x}^*) = \lambda\nabla h(\mathbf{x}^*):
$$ {#eq-lagrange}

即目标函数的梯度垂直于约束曲面，因此任何允许的到一阶的方向都不能让$f$减小。加上不等式约束，这推广为 Karush–Kuhn–Tucker 条件，还有对偶理论（Boyd 与 Vandenberghe，第 5 章）。在深度学习中，约束通常处理得更简单——用自动满足约束的参数化（softmax 给出概率；指数给出正数）、每步之后做投影，或者用罚函数。有一个约束问题值得完整解一遍，因为它的答案就是 softmax 本身。

::: proposition softmax 最大化熵正则化的得分 {#prop-softmax-variational}
对得分$\mathbf{z}\in\R^K$和温度$\tau > 0$，在$K$种结果的一切分布$\mathbf{p}$中，

$$
\max_{\mathbf{p}\in\Delta^{K-1}}\Big[\sum_ip_iz_i + \tau H(\mathbf{p})\Big] = \tau\log\sum_ie^{z_i/\tau},
$$

且最大值在$\mathbf{p} = \operatorname{softmax}(\mathbf{z}/\tau)$处唯一取得。
:::

::: proof
令$\mathbf{s} = \operatorname{softmax}(\mathbf{z}/\tau)$，则$z_i = \tau\log s_i + \tau\log Z$，其中$Z = \sum_ie^{z_i/\tau}$。于是对任意$\mathbf{p}$，

$$
\sum_ip_iz_i + \tau H(\mathbf{p}) = \tau\sum_ip_i\log s_i + \tau\log Z - \tau\sum_ip_i\log p_i = \tau\log Z - \tau\operatorname{KL}(\mathbf{p}\,\Vert\,\mathbf{s}).
$$

由吉布斯（Gibbs）不等式（[[math-for-ml/information-theory#thm-gibbs]]），该散度$\ge0$，且仅在$\mathbf{p} = \mathbf{s}$时取等。
:::

::: widget contour
f: x^2 + y^2
x: -3, 3
y: -3, 3
constraint: x + 2y - 3
point: 1, 1
caption: 在直线$x + 2y = 3$上最小化$x^2 + y^2$。在条件极小值点$(0.6, 1.2)$处，等高圆与直线相切，目标的梯度与约束的法向量$(1, 2)$平行，正如[[#eq-lagrange]]所要求；而直线上的任何其他点处，梯度沿直线有分量，沿着它移动就能降低目标。
:::

这样，softmax 就是“得分最高同时尽可能保持不确定”的那个分布，温度设定着得分与熵之间的兑换率：$\tau\to0$给出硬 argmax，$\tau\to\infty$给出均匀分布。同样的计算，把熵换成一个参考分布，就得到 KL 正则化奖励目标的最优策略$\pi^*(y)\propto\pi_{\text{ref}}(y)\,e^{r(y)/\beta}$——[[post-training]]中的直接偏好优化正是建立在这一目标之上。

::: history
柯西（Cauchy）于 1847 年为求解天文学中出现的方程组提出了最速下降法。拉格朗日（Lagrange）在《分析力学》（Mécanique analytique，1788）中引入了他的乘数；Karush（1939）以及 Kuhn 与 Tucker（1951）将其推广到不等式约束。Robbins 与 Monro（1951）创立了随机逼近，Kiefer 与 Wolfowitz（1952）把它用于极小化问题。Polyak 于 1964 年提出重球法，Nesterov 的加速梯度法（1983）达到了光滑凸问题的最优收敛速率。随后是为大规模学习而生的逐坐标自适应方法：AdaGrad（Duchi、Hazan 与 Singer，2011）、RMSProp（Geoffrey Hinton 在 2012 年的一门课中讲授），以及 Adam（Kingma 与 Ba，发表于 ICLR 2015）；其权重衰减解耦的变体 AdamW（Loshchilov 与 Hutter，2019）成为 Transformer 的标准优化器。
:::

::: summary
- 训练是在最小化一个非凸损失；凸性能让每个驻点都成为全局最小值，切平面不等式[[#eq-tangent]]给出它的刻画。神经网络并不凸，但凸理论描述了它们的局部行为。
- 对$L$-光滑函数，下降引理用一个二次函数控制$f$，于是$\eta < 2/L$的步子能让$f$下降。取$\eta = 1/L$，梯度下降以$\min\lVert\nabla f\rVert^2\le2L(f(\theta_0) - f_{\inf})/K$的速率找到近似驻点；在凸函数上，$f(\theta_K) - f^*\le L\lVert\theta_0 - \theta^*\rVert^2/2K$。
- 在二次函数上，每个特征方向按$\lvert1 - \eta\lambda_i\rvert$收缩：最陡的方向限制学习率，最平的方向限制进展，最佳速率是$(\kappa - 1)/(\kappa + 1)$。
- SGD 使用无偏的小批量梯度，其方差按$1/B$下降；步长恒定时它只在极小值附近徘徊，所以学习率要衰减。
- 动量平均梯度，把对$\kappa$的依赖改善到$\sqrt\kappa$；Adam 按各坐标的梯度均方根为它定尺度，并带偏差校正；AdamW 把权重衰减解耦出来。Adam 每个参数要多存两个数，占训练显存的很大一块。
- 拉格朗日乘数处理约束；softmax 是单纯形上一个熵正则化最大化问题的解。
:::

## 习题

::: exercise 一个稳定性阈值 {level=1 check="2/400"}
某损失在极小值附近的黑塞矩阵最大特征值为$400$。学习率超过多少，梯度下降在此处就会失稳？
::: solution
由[[#prop-quadratic]]，一旦$\eta > 2/L = 2/400 = 0.005$，迭代就会在最陡的方向上发散。
:::
:::

::: exercise 手算三步 {level=1 check="0.375"}
在$f(x) = x^2$上从$x_0 = 3$出发、以$\eta = 0.25$做梯度下降。$x_3$是多少？
::: solution
$f'(x) = 2x$，所以$x_{k+1} = x_k - 0.5x_k = 0.5x_k$。于是$x_1 = 1.5$，$x_2 = 0.75$，$x_3 = 0.375$。这里$L = 2$，收缩因子$1 - \eta L = 0.5$；若$\eta = 0.5$，方法一步就跳到$0$；若$\eta = 1$，它将在$3$与$-3$之间永远振荡下去。
:::
:::

::: exercise 优化器的内存 {level=1 check="104"}
一个有$13\times10^9$个参数、以 32 位精度存储的模型，Adam 的一阶与二阶矩缓冲区共占多少吉字节（$10^9$字节）？
::: solution
$2\cdot4\cdot13\times10^9 = 1.04\times10^{11}$字节 $= 104$ GB。
:::
:::

::: exercise 它是凸的吗？ {level=2 check="-1"}
$f(x, y) = x^2 + 3xy + y^2$是凸的吗？给出它黑塞矩阵的最小特征值。
::: solution
黑塞矩阵是$\begin{pmatrix}2&3\\3&2\end{pmatrix}$，特征值$2\pm3$，即$5$和$-1$。它不是半正定的，所以$f$不凸：沿$(1, -1)$方向，$f(t, -t) = -t^2$无界地减小。原点是一个鞍点。最小特征值是$-1$。
:::
:::

::: exercise 需要多少步？ {level=2 check="8000"}
某损失是$4$-光滑的，初值比下确界高出$10$，梯度下降取$\eta = 1/4$。按[[#thm-gd-nonconvex]]，要保证某个迭代点满足$\lVert\nabla f\rVert^2\le0.01$，需要多少步？
::: solution
需要$2L(f(\theta_0) - f_{\inf})/K\le0.01$，即$K\ge2\cdot4\cdot10/0.01 = 8000$。
:::
:::

::: exercise 病态的代价 {level=2 check="346"}
一个二次问题的条件数为$\kappa = 100$。用最佳固定步长，梯度下降要多少步才能把误差缩小$1000$倍？用重球动量、按它的渐近速率$(\sqrt\kappa - 1)/(\sqrt\kappa + 1)$又需多少步？
::: solution
梯度下降每步收缩$99/101$：$k\ge\ln10^{-3}/\ln(99/101) = 345.4$，所以$346$步。动量每步收缩$9/11$：$k\ge\ln10^{-3}/\ln(9/11) = 34.4$，约$35$步——少了十倍，正是因子$\sqrt\kappa$。
:::
:::

::: exercise 动量等效为有效学习率 {level=2 check="10"}
用重球动量（[[#def-momentum]]），梯度$\mathbf{g}$恒定，证明$\mathbf{v}_k\to-\eta\mathbf{g}/(1 - \beta)$。对$\beta = 0.9$，步长被放大为多少倍？
::: solution
由$\mathbf{v}_k = \beta\mathbf{v}_{k-1} - \eta\mathbf{g}$且$\mathbf{v}_0 = \mathbf{0}$，得$\mathbf{v}_k = -\eta\mathbf{g}(1 + \beta + \dots + \beta^{k-1}) = -\eta\mathbf{g}(1 - \beta^k)/(1 - \beta)\to-\eta\mathbf{g}/(1 - \beta)$。$\beta = 0.9$时倍数为$1/(1 - 0.9) = 10$。这就是改了$\beta$不调$\eta$就等于改了有效学习率的原因。
:::
:::

::: exercise 一个条件极小值 {level=2 check="1"}
用[[#eq-lagrange]]在约束$\mathbf{a}^\top\mathbf{x} = b$下最小化$\lVert\mathbf{x}\rVert^2$，并对$\mathbf{a} = (1, 2, 2)$、$b = 3$求极小值。
::: solution
取$h(\mathbf{x}) = \mathbf{a}^\top\mathbf{x} - b$，条件为$2\mathbf{x} = \lambda\mathbf{a}$，故$\mathbf{x} = \frac\lambda2\mathbf{a}$；代入约束得$\frac\lambda2\lVert\mathbf{a}\rVert^2 = b$，所以$\mathbf{x}^* = b\,\mathbf{a}/\lVert\mathbf{a}\rVert^2$，极小值为$b^2/\lVert\mathbf{a}\rVert^2$。对给定数值，$\lVert\mathbf{a}\rVert^2 = 9$，$\mathbf{x}^* = (1/3, 2/3, 2/3)$，极小值为$9/9 = 1$。几何上，$\mathbf{x}^*$是平面$\mathbf{a}^\top\mathbf{x} = b$上离原点最近的点，位置就在法向量$\mathbf{a}$的方向上。
:::
:::

::: exercise SGD 的噪声球 {level=3 check="0.1/1.9"}
用含噪梯度$g_k = ax_k + \xi_k$最小化$f(x) = \frac a2x^2$，其中$\xi_k$相互独立、均值为$0$、方差为$\sigma^2$，采用常数步长$\eta$且$0 < \eta a < 2$。证明$\E x_k\to0$，且$\Var x_k$收敛到$\eta\sigma^2/\big(a(2 - \eta a)\big)$。对$a = 1$、$\eta = 0.1$、$\sigma^2 = 1$求该极限。
::: solution
$x_{k+1} = (1 - \eta a)x_k - \eta\xi_k$。取期望，$\E x_{k+1} = (1 - \eta a)\E x_k\to0$，因为$\lvert1 - \eta a\rvert < 1$。由于$\xi_k$与$x_k$独立，$\Var x_{k+1} = (1 - \eta a)^2\Var x_k + \eta^2\sigma^2$，这个线性递推收敛到不动点$V = \eta^2\sigma^2/\big(1 - (1 - \eta a)^2\big) = \eta^2\sigma^2/\big(\eta a(2 - \eta a)\big) = \eta\sigma^2/\big(a(2 - \eta a)\big)$。对给定数值，$V = 0.1/1.9 = 0.0526$。$\eta$很小时，平稳方差约为$\eta\sigma^2/2a$：与学习率成正比——这就是训练末期衰减学习率能压低损失的原因。
:::
:::

::: exercise 用原生 Python 实现 Adam {level=3}
用朴素 Python 实现[[#alg-adam]]（取$\lambda = 0$），在$f(x, y) = \frac12(x^2 + 10y^2)$上从$(1, 1)$出发以$\eta = 0.1$跑$100$步，打印第$1$、$2$、$10$、$100$步的迭代点。与取最佳固定步长的梯度下降比较，并解释结果。
::: solution
```python
import math

def adam(grad, theta, eta=0.1, b1=0.9, b2=0.999, eps=1e-8, steps=100):
    m = [0.0] * len(theta)                     # 一阶矩，形状与 theta 相同
    v = [0.0] * len(theta)                     # 二阶矩
    for t in range(1, steps + 1):
        g = grad(theta)
        m = [b1 * mi + (1 - b1) * gi for mi, gi in zip(m, g)]
        v = [b2 * vi + (1 - b2) * gi * gi for vi, gi in zip(v, g)]
        mhat = [mi / (1 - b1 ** t) for mi in m]           # 偏差校正
        vhat = [vi / (1 - b2 ** t) for vi in v]
        theta = [th - eta * mh / (math.sqrt(vh) + eps)
                 for th, mh, vh in zip(theta, mhat, vhat)]
        if t in (1, 2, 10, 100):
            print(t, [round(th, 4) for th in theta])
    return theta

grad = lambda th: [th[0], 10 * th[1]]          # f = (x^2 + 10 y^2) / 2
adam(grad, [1.0, 1.0])
```

```text
1 [0.9, 0.9]
2 [0.8004, 0.8004]
10 [0.0762, 0.0762]
100 [0.0029, 0.0029]
```

第一步在每个坐标上的大小恰好是$\eta = 0.1$，正如[[#ex-adam]]所预言，两个坐标始终相等（上面的小测验解释了原因）：Adam 看不见曲率之间那个因子$10$。梯度下降取$\eta = 2/11$时$30$步走到距离$0.0034$（[[#ex-quadratic]]）；Adam 要到$100$步才到$0.0029$：它的归一化步长不随梯度按比例缩小，所以$\beta_1 = 0.9$时会冲过最小值（大约第$20$步冲到$-0.27$附近），随后绕着它以缓慢衰减的幅度振荡。Adam 的优势在于对病态尺度的参数稳健，而不是在这个小而明了的二次函数上跑得快；实践中它的学习率同样要做衰减。
:::
:::
