线性模型只能在给定的特征之间画出直的边界。[[ml-fundamentals/representations]]展示了这个后果——没有线性分类器能计算异或（XOR）——以及两条出路：手工设计更好的特征，或让核隐式地提供它们。**神经网络**走的是第三条路。它把若干层简单单元叠在一起——每层是一个线性映射后面接一个固定的非线性函数——并且一次性拟合所有层，于是前面的层会去学最后一层所需要的特征。本章从这种思想最古老的形式——1958年的感知机——出发，一路搭到每个 Transformer 模块内部都有的多层感知机（MLP），并追问这样的网络在原理上能表示什么。

我们假定读者已经具备[[ml-fundamentals/logistic-regression]]中逻辑模型与 softmax 模型的知识，包括交叉熵损失及其梯度。多层网络的权重究竟如何拟合——反向传播——是下一章[[neural-networks/backpropagation]]的主题；这里我们只固定架构，研究它能计算什么。

## 人工神经元 {#sec-neuron}

基本构件是一个向量的函数：先取加权和，再把它送入一个标量函数。

::: definition 人工神经元 {#def-neuron}
带权重$\mathbf{w}\in\R^d$、偏置$b\in\R$与**激活函数**$\phi\colon\R\to\R$的**人工神经元**（或**单元**）把输入$\mathbf{x}\in\R^d$映射为

$$
h = \phi(z),\qquad z = \mathbf{w}^\top\mathbf{x} + b.
$$

数$z$称为单元的**预激活值**，$h$称为它的**激活值**（或输出）。
:::

取$\phi = \sigma$（逻辑函数）时，单个神经元*就是*逻辑回归（[[ml-fundamentals/logistic-regression#def-logistic]]）。取$\phi$为阶跃函数$[z\ge 0]$时，它就是1943年 McCulloch 与 Pitts 用来为生物神经元建模的阈值单元：当加权证据超过阈值$-b$时它“激发”。他们观察到这样的单元能计算逻辑函数——输入取$\{0, 1\}$时，权重$(1, 1)$、偏置$-1.5$给出与（AND），偏置$-0.5$给出或（OR），权重$-1$、偏置$0.5$给出非（NOT）——所以由它们组成的网络能计算任意布尔函数。他们缺少的是一种*学习*权重的方法。

生物学类比应当放得松一些。真实的神经元有数千个突触，随时间发放脉冲，还有复杂的树突计算；人工单元只保留了“对加权输入求和并作非线性响应”这一个思想。最好把现代网络看作是为可微分、可优化而建造的参量化函数，而不是大脑的模型。

## 感知机 {#sec-perceptron}

Rosenblatt 的**感知机**（1958）是第一个带有学习规则的神经元。取标签$y\in\{-1, +1\}$，通过给每个输入添上常数特征$1$把偏置吸收进$\mathbf{w}$，并预测$\hat y = \sgn(\mathbf{w}^\top\mathbf{x})$。

::: algorithm 感知机学习规则 {#alg-perceptron}
输入：样例$(\mathbf{x}_1, y_1), \dots, (\mathbf{x}_n, y_n)$，其中$y_i\in\{-1, +1\}$。

1. 置$\mathbf{w}\leftarrow\mathbf{0}$。
2. 反复扫描数据。对每个样例$i$：若$y_i\mathbf{w}^\top\mathbf{x}_i\le0$（一次**错误**，落在边界上的点算错），则更新$\mathbf{w}\leftarrow\mathbf{w} + y_i\mathbf{x}_i$。
3. 在某一轮没有出错之后停止。
:::

这条更新很容易读：一个分错的正例被加到$\mathbf{w}$上，使它的得分增加$\lVert\mathbf{x}_i\rVert^2$；一个分错的负例则被减去。它正是损失$\max(0, -y\mathbf{w}^\top\mathbf{x})$取学习率$1$的随机梯度一步，也是逻辑回归一步的“取整”版本（[[ml-fundamentals/logistic-regression]]的习题8）。值得注意的是，只要数据能被一个超平面分开，这条规则就总能找到一个，而且沿途所犯错误的个数被一个量界住，这个量只依赖数据的几何，不依赖点的个数或维数。

::: theorem 感知机收敛定理（Novikoff，1962）{#thm-novikoff}
设对所有$i$有$\lVert\mathbf{x}_i\rVert\le R$，且某个单位向量$\mathbf{u}$（$\lVert\mathbf{u}\rVert = 1$）以**间隔**$\gamma > 0$把数据分开：

$$
y_i\,\mathbf{u}^\top\mathbf{x}_i\ge\gamma\qquad\text{对所有 } i.
$$

则感知机以任意顺序（可重复）处理样例时，至多犯$(R/\gamma)^2$次错误。特别地，它在有限轮之后停止，并给出一个分隔的$\mathbf{w}$。
:::

::: proof
记$\mathbf{w}_k$为第$k$次犯错之后的权重向量，于是$\mathbf{w}_0 = \mathbf{0}$，且对引起第$k$次错误的样例$(\mathbf{x}, y)$有$\mathbf{w}_k = \mathbf{w}_{k-1} + y\mathbf{x}$。我们从下方界住$\mathbf{u}^\top\mathbf{w}_k$，从上方界住$\lVert\mathbf{w}_k\rVert$。

*沿$\mathbf{u}$方向的进展。* $\mathbf{u}^\top\mathbf{w}_k = \mathbf{u}^\top\mathbf{w}_{k-1} + y\,\mathbf{u}^\top\mathbf{x}\ge\mathbf{u}^\top\mathbf{w}_{k-1} + \gamma$，故由归纳法$\mathbf{u}^\top\mathbf{w}_k\ge k\gamma$。

*范数增长缓慢。* $\lVert\mathbf{w}_k\rVert^2 = \lVert\mathbf{w}_{k-1}\rVert^2 + 2y\,\mathbf{w}_{k-1}^\top\mathbf{x} + \lVert\mathbf{x}\rVert^2\le\lVert\mathbf{w}_{k-1}\rVert^2 + R^2$，因为更新只发生在犯错时，而此时$y\,\mathbf{w}_{k-1}^\top\mathbf{x}\le0$。由归纳法$\lVert\mathbf{w}_k\rVert^2\le kR^2$。

*合并。* 由柯西-施瓦茨不等式与$\lVert\mathbf{u}\rVert = 1$，$k\gamma\le\mathbf{u}^\top\mathbf{w}_k\le\lVert\mathbf{w}_k\rVert\le\sqrt k\,R$。除以$\sqrt k\,\gamma$得$\sqrt k\le R/\gamma$，即$k\le(R/\gamma)^2$。由于每一个没有终止算法的轮都至少含一次错误，总的轮数至多为$(R/\gamma)^2 + 1$，而最后一轮证实$\mathbf{w}$把每个样例都分对了。
:::

证明揭示了其中的机制：每次错误把$\mathbf{w}$沿理想方向$\mathbf{u}$推进固定的距离$\gamma$，却至多以长度不超过$R$、*与$\mathbf{u}$成直角或更斜*的一步把它拉长，于是长度按$\sqrt k$增长而投影按$k$增长。$\mathbf{w}_k$与$\mathbf{u}$之间的夹角因此必须缩小，而它不可能永远缩小下去。这个界与尺度无关：把每个输入乘以$10$，$R$与$\gamma$都乘以$10$，$(R/\gamma)^2$保持不变。

::: example 手跑一遍感知机 {#ex-perceptron}
不带偏置，在四个样例$\big((1, 2), +1\big)$、$\big((2, -1), -1\big)$、$\big((-1, 1), +1\big)$、$\big((1, 0), -1\big)$上按此顺序运行感知机。
::: solution
从$\mathbf{w} = (0, 0)$开始。样例1：$y\mathbf{w}^\top\mathbf{x} = 0\le0$，出错，故$\mathbf{w}\leftarrow(1, 2)$。样例2：$y\mathbf{w}^\top\mathbf{x} = -(2 - 2) = 0$，出错，故$\mathbf{w}\leftarrow(1, 2) - (2, -1) = (-1, 3)$。样例3：$+1\cdot(1 + 3) = 4 > 0$，正确。样例4：$-1\cdot(-1) = 1 > 0$，正确。第二轮检查样例1（$-1 + 6 = 5 > 0$）与样例2（$-(-2 - 3) = 5 > 0$），没有错误，于是算法在犯$2$次错误后以$\mathbf{w} = (-1, 3)$停止。与[[#thm-novikoff]]比较：$R = \sqrt5$（样例1和样例2），单位向量$\mathbf{u} = (-1, 1)/\sqrt2$在四个样例上的间隔为$1/\sqrt2$、$3/\sqrt2$、$2/\sqrt2$与$1/\sqrt2$，故$\gamma = 1/\sqrt2$，界为$(R/\gamma)^2 = 5\cdot2 = 10$次错误。（这里没有哪个方向能做得更好；界用的是最好的间隔，但任何分隔的$\mathbf{u}$都给出有效的界，可能更弱一些。）感知机自己的答案$(-1, 3)/\sqrt{10}$在样例4上的间隔只有$1/\sqrt{10}$：它确实分开了数据，但分得并不宽裕。
:::
:::

下面的清单在单位圆盘内的$500$个随机点上运行感知机（$R\le1$），标签取点所在的、法向量为$\mathbf{u} = (0.6, 0.8)$的直线的那一侧，并预先丢弃到该直线距离小于$\gamma$的点。

```python
import math, random

rng = random.Random(0)

def make_separable(n, gamma):
    """Points in the unit disc labelled by the sign of u.x, keeping only margin >= gamma."""
    u = (0.6, 0.8)                                      # 真实边界的单位法向量
    data = []
    while len(data) < n:
        x = (rng.uniform(-1, 1), rng.uniform(-1, 1))
        if x[0] ** 2 + x[1] ** 2 > 1:                   # 留在单位圆盘内：R <= 1
            continue
        m = u[0] * x[0] + u[1] * x[1]
        if abs(m) >= gamma:                             # 强制满足间隔
            data.append((x, 1 if m > 0 else -1))
    return data

def perceptron(data, max_epochs=1000):
    w = [0.0, 0.0]
    mistakes = 0
    for epoch in range(max_epochs):
        clean = True
        for x, y in data:
            if y * (w[0] * x[0] + w[1] * x[1]) <= 0:    # 出错（或恰在边界上）
                w = [w[0] + y * x[0], w[1] + y * x[1]]
                mistakes += 1
                clean = False
        if clean:
            return w, mistakes, epoch + 1
    return w, mistakes, max_epochs

for gamma in [0.2, 0.1, 0.05, 0.02]:
    data = make_separable(500, gamma)
    R = max(math.hypot(*x) for x, _ in data)
    w, k, epochs = perceptron(data)
    print(f"gamma {gamma:4.2f}  mistakes {k:4d}  bound (R/gamma)^2 = {(R / gamma) ** 2:7.1f}  "
          f"epochs {epochs:3d}  w/|w| = ({w[0] / math.hypot(*w):.3f}, {w[1] / math.hypot(*w):.3f})")
```

```text
gamma 0.20  mistakes    3  bound (R/gamma)^2 =    24.9  epochs   2  w/|w| = (0.641, 0.767)
gamma 0.10  mistakes    6  bound (R/gamma)^2 =    99.8  epochs   2  w/|w| = (0.601, 0.799)
gamma 0.05  mistakes    9  bound (R/gamma)^2 =   399.7  epochs   2  w/|w| = (0.586, 0.810)
gamma 0.02  mistakes    2  bound (R/gamma)^2 =  2482.9  epochs   2  w/|w| = (0.618, 0.786)
```

错误次数远低于这个界——界是对具有给定$R$与$\gamma$的所有排序、所有数据集的最坏情形——学出的方向也很接近$\mathbf{u}$。注意定理*没有*承诺什么：最终的超平面只是*一个*分隔面，而不是间隔最大的那一个；而且数据不可分时这条规则永不定型——它会永远循环下去。这两个缺点后来分别由支持向量机与光滑损失（如逻辑损失）解决了。

### 单层做不到的事 {#sec-xor}

感知机和一切线性分类器一样，用一个超平面划分输入空间，因此不能表示XOR（[[ml-fundamentals/representations#prop-xor]]）。Minsky 与 Papert 的《感知机》（*Perceptrons*，1969）把一整类问题的这类局限讲得十分精确：例如，每个单元只看有限个输入像素的单层感知机无法判定一个图形是否连通，而$n$位的奇偶性要求有一个一次看全部$n$位的单元。他们的结论针对的是单层的可训练权重；他们知道多层网络更强，只是当时没有人知道如何训练它们。

## 多层感知机 {#sec-mlp}

解决办法是把层复合起来。每层施加一个仿射映射和一个逐元素激活；一层的输出是下一层的输入。

::: definition 多层感知机 {#def-mlp}
带$L$层、宽度$d_0, d_1, \dots, d_L$与激活函数$\phi$的**多层感知机**（MLP，或全连接前馈网络）从$\mathbf{h}_0 = \mathbf{x}\in\R^{d_0}$出发，按

$$
\mathbf{a}_\ell = W_\ell\mathbf{h}_{\ell-1} + \mathbf{b}_\ell,\qquad\mathbf{h}_\ell = \phi(\mathbf{a}_\ell)\quad(\ell = 1, \dots, L - 1),\qquad\mathbf{h}_L = W_L\mathbf{h}_{L-1} + \mathbf{b}_L,
$$ {#eq-mlp}

计算$f(\mathbf{x}) = \mathbf{h}_L$，其中$W_\ell\in\R^{d_\ell\times d_{\ell-1}}$，$\mathbf{b}_\ell\in\R^{d_\ell}$，$\phi$逐坐标作用。层$1, \dots, L-1$称为**隐藏层**；最后一层是线性的，它的输出是**logits**（分类时送入 softmax 与交叉熵损失）或预测值（回归时）。参数为$\theta = (W_1, \mathbf{b}_1, \dots, W_L, \mathbf{b}_L)$，其个数为$\sum_{\ell=1}^L d_\ell(d_{\ell-1} + 1)$。
:::

计数约定并不统一：只有一个隐藏层的网络，有的作者称之为“两层”（两个权重矩阵），有的称之为“一个隐藏层”或“浅”网络。这里$L$数的是权重矩阵的个数。

MLP分类器的最后一层恰好就是 softmax 回归（[[ml-fundamentals/logistic-regression#def-softmax-regression]]），只不过作用在学得的特征$\mathbf{h}_{L-1}$上而不是原始输入上。按[[ml-fundamentals/representations#def-feature-map]]的意义，隐藏层是一个学出的特征映射$\mathbf{x}\mapsto\mathbf{h}_{L-1}$，与使用它的分类器一道训练。

实践中输入以**小批量**到达。把$B$个输入堆成$X\in\R^{B\times d_0}$的各行，一层计算$H_\ell = \phi(H_{\ell-1}W_\ell^\top + \mathbf{1}\mathbf{b}_\ell^\top)$，形状为$(B, d_\ell)$——每层一次矩阵乘法，这正是 GPU 做得最快的事。程序库把权重存成形状$(d_{\ell-1}, d_\ell)$的$W_\ell^\top$，或形状$(d_\ell, d_{\ell-1})$的$W_\ell$（PyTorch 的`nn.Linear`用后者，计算$XW^\top + \mathbf{b}$）；数学是同一套。

::: example 用两个隐藏单元实现 XOR {#ex-xor}
证明网络$\mathbf{h} = \operatorname{ReLU}(W_1\mathbf{x} + \mathbf{b}_1)$，$f(\mathbf{x}) = \mathbf{w}_2^\top\mathbf{h}$，其中

$$
W_1 = \begin{pmatrix}1&1\\1&1\end{pmatrix},\qquad\mathbf{b}_1 = \begin{pmatrix}0\\-1\end{pmatrix},\qquad\mathbf{w}_2 = \begin{pmatrix}1\\-2\end{pmatrix}
$$

在$\{0, 1\}^2$上计算 XOR，其中$\operatorname{ReLU}(a) = \max(0, a)$。
::: solution
两个隐藏单元都看到$s = x_1 + x_2$；第一个输出$\operatorname{ReLU}(s)$，第二个输出$\operatorname{ReLU}(s - 1)$，于是$f = \operatorname{ReLU}(s) - 2\operatorname{ReLU}(s - 1)$。

| $\mathbf{x}$ | $s$ | $\mathbf{h}$ | $f(\mathbf{x})$ |
|---|---|---|---|
| $(0, 0)$ | $0$ | $(0, 0)$ | $0$ |
| $(1, 0)$ | $1$ | $(1, 0)$ | $1$ |
| $(0, 1)$ | $1$ | $(1, 0)$ | $1$ |
| $(1, 1)$ | $2$ | $(2, 1)$ | $0$ |

隐藏层把四个输入映到特征空间中的三个点$(0, 0)$、$(1, 0)$、$(2, 1)$，两个 XOR 为正的输入落在同一点上；在那里一个线性函数就能把它们分开。这是 Goodfellow、Bengio 与 Courville（2016，§6.1）的例子。从随机初值出发的梯度下降通常会找到另一个等价但不同的解。
:::
:::

::: example 数参数 {#ex-params}
一个 MLP 用两个宽度为$512$的隐藏层把$28\times28$的灰度数字图像分到$10$类。它有多少个参数？一批$64$张图像的各层激活是什么形状？
::: solution
输入是展平的图像，$d_0 = 784$。三层分别有$784\cdot512 + 512 = 401{,}920$、$512\cdot512 + 512 = 262{,}656$与$512\cdot10 + 10 = 5{,}130$个参数，共$669{,}706$个。激活：$X$是$(64, 784)$，$H_1$与$H_2$是$(64, 512)$，logits 是$(64, 10)$。大多数参数在第一层，因为输入很宽；在 Transformer 的前馈模块里，同样的计数给出每个模块$2\cdot d_{\text{model}}\cdot d_{\text{ff}}$个权重，原始设计中$d_{\text{ff}} = 4d_{\text{model}}$（[[transformers/transformer-block#def-ffn]]）。
:::
:::

### 为什么非线性必不可少 {#sec-why-nonlinear}

::: proposition 没有激活函数，深度毫无增益 {#prop-collapse}
若$\phi$是恒等映射，则MLP[[#eq-mlp]]计算的是一个仿射映射$f(\mathbf{x}) = W\mathbf{x} + \mathbf{b}$，其中$W = W_LW_{L-1}\cdots W_1$，且$\rank W\le\min_\ell d_\ell$。
:::

::: proof
归纳证明$\mathbf{h}_\ell = W_\ell\cdots W_1\mathbf{x} + \mathbf{c}_\ell$对某个常向量$\mathbf{c}_\ell$成立：$\ell = 1$时成立；而$W_{\ell+1}(W_\ell\cdots W_1\mathbf{x} + \mathbf{c}_\ell) + \mathbf{b}_{\ell+1}$有同样的形式。乘积的秩不超过每个因子的秩，且$\rank W_\ell\le\min(d_\ell, d_{\ell-1})$。
:::

因此，一个*线性*深网络不比单个线性层更有表达能力——若某个隐藏层很窄则反而更差，因为此时$W$是低秩的。（它的*训练动力学*却并不平凡，这使线性深网络成为有用的理论模型；Saxe、McClelland 与 Ganguli，2014。）深度带来的全部额外能力，都来自层与层之间的非线性。

## 激活函数 {#sec-activations}

选哪种非线性？随着把更深的网络训练起来的诉求日益清晰，这个选择几十年间一直在变。

::: definition 常用激活函数 {#def-activations}
- **逻辑 sigmoid** $\sigma(z) = 1/(1 + e^{-z})$，满足$\sigma' = \sigma(1 - \sigma)\le\frac14$。
- **双曲正切** $\tanh z = (e^z - e^{-z})/(e^z + e^{-z}) = 2\sigma(2z) - 1$，满足$\tanh' = 1 - \tanh^2\le1$。
- **线性整流单元**（ReLU）$\operatorname{ReLU}(z) = \max(0, z)$，导数为$[z > 0]$（在$0$处无定义；程序库取$0$）。
- **Leaky ReLU**：对小的$\alpha$（如$0.01$）取$\max(\alpha z, z)$。
- **GELU**（高斯误差线性单元）$\operatorname{GELU}(z) = z\,\Phi(z) = \tfrac z2\big(1 + \operatorname{erf}(z/\sqrt2)\big)$，其中$\Phi$是标准正态分布函数。
- **SiLU**（或**Swish**）$\operatorname{SiLU}(z) = z\,\sigma(z)$。
:::

::: widget plot
f: 1/(1 + exp(-x)); tanh(x); max(0, x); 0.5*x*(1 + erf(x/sqrt(2))); x/(1 + exp(-x))
x: -4, 4
y: -1.5, 3
labels: $\sigma(z)$; $\tanh z$; $\operatorname{ReLU}(z)$; $\operatorname{GELU}(z)$; $\operatorname{SiLU}(z)$
tangent: 0.5
caption: 五个激活函数。sigmoid 与 tanh 会饱和：远离$0$处它们几乎是平的，导数接近零。ReLU、GELU 与 SiLU 在正输入上线性增长，导数保持在$1$附近；GELU 与 SiLU 是 ReLU 的光滑版本，在负输入处略微低于零。沿 sigmoid 拖动切线，看看离开原点后它的斜率有多小——从不超过$\frac14$。
:::

这份清单的历史就是一部梯度的历史。隐藏单元的权重按$\phi'(a)$的比例学习（链式法则把这个因子塞进穿过该单元的每一个梯度，[[neural-networks/backpropagation]]会讲到），所以导数在其大部分取值范围上都小的激活函数会减慢学习，而许多层上许多小导数的乘积会让梯度消失（[[neural-networks/initialisation-normalisation]]）。sigmoid 是1980与1990年代的默认选择，处处$\sigma'\le\frac14$，而且不以零为中心，这会使下一层梯度的符号产生偏差。tanh 以零为中心、在原点处斜率为$1$，因此更受青睐（LeCun 等，1998）。**ReLU**由 Nair 与 Hinton（2010）以及 Glorot、Bordes 与 Bengio（2011）在深网络中推广，并被用于 AlexNet（2012）：它在激活一侧的导数恰为$1$，计算便宜，还产生稀疏的激活；它让十层以上的网络用最朴素的梯度下降也变得可以训练。

GELU（Hendrycks 与 Gimpel，2016）与 SiLU（Elfwing、Uchibe 与 Doya，2018；Ramachandran、Zoph 与 Le，2017，以“Swish”之名）光滑而非单调：在适度为负的输入处略微取负。GELU 是 BERT 与 GPT-2 的激活函数；带门的变体 SwiGLU 把一个 SiLU 单元与另一个线性单元相乘，用于许多近年的开放语言模型（[[transformers/transformer-block#def-swiglu]]）。ReLU、GELU 与 SiLU 之间效果上的差距真实存在但并不大，而且是经验确立的；没有定理说哪一个最好。

::: example 激活函数及其斜率 {#ex-slopes}
计算各激活函数及其导数在$z = 1$与$z = -1$处的值。哪些单元在$z = -1$时能传递梯度？
::: solution
$\sigma(1) = 0.731$，$\sigma(-1) = 0.269$，且$\sigma'(\pm1) = 0.731\cdot0.269 = 0.197$。$\tanh(\pm1) = \pm0.762$，且$\tanh'(\pm1) = 1 - 0.580 = 0.420$。$\operatorname{ReLU}(1) = 1$，斜率$1$；$\operatorname{ReLU}(-1) = 0$，斜率$0$。$\operatorname{GELU}(1) = \Phi(1) = 0.841$，$\operatorname{GELU}(-1) = -\Phi(-1) = -0.159$；它的导数$\Phi(z) + z\varphi(z)$（$\varphi$是正态密度）在$1$处为$0.841 + 0.242 = 1.083$，在$-1$处为$0.159 - 0.242 = -0.083$。$\operatorname{SiLU}(1) = 0.731$，$\operatorname{SiLU}(-1) = -0.269$。在$z = -1$处，除 ReLU 外每个单元都传递一些梯度；一个预激活在所有输入上都是负的 ReLU 单元什么梯度都不传，而且永远无法恢复（见下面的警告）。
:::
:::

::: warning 饱和与死亡的单元
两种失效模式直接来自$\phi$的形状。预激活绝对值很大的 sigmoid 或 tanh 单元是**饱和**的：它的输出几乎不变、导数接近零，于是进入它的权重停止学习——输入没有标准化、或权重初始化得过大，常有这样的后果。在所有训练输入上预激活都为负的 ReLU 单元是**死亡**的：它的输出与梯度处处为零，任何更新都永远无法让它复活。死亡单元通常由大到足以把某个单元的偏置甩到很负的学习率造成。监视一个批次上处于激活（或饱和）状态的单元比例，是一种廉价的诊断手段；Leaky ReLU、GELU 与 SiLU 通过在负输入上保留一点斜率，避免了彻底的死亡。
:::

::: quiz
一个网络有三个宽度为$100$的隐藏层，但激活函数取恒等映射。哪句话是对的？
- [ ] 它能表示 XOR，因为它有隐藏层
- [x] 它计算输入的一个仿射函数，因此不能表示 XOR
- [ ] 它等价于一个宽度$300$、用 ReLU 激活的单隐藏层
- [ ] 它的表达能力随层数增长
::: solution
由[[#prop-collapse]]，仿射映射的复合是仿射的，无论多深多宽；仿射函数后面再接一个阈值就是线性分类器，不能表示 XOR。让隐藏层有用的正是非线性激活函数。
:::
:::

## MLP 能表示什么：万能逼近 {#sec-universal}

一个只有单个隐藏层的网络，若可以任意宽，能表示多少东西？答案是：在有界区域上，基本能以任意精度逼近任何连续函数。我们先在一维对 ReLU 给出构造性证明——那里的构造一目了然——再推广到高维，最后陈述经典定理。

::: proposition 一维 ReLU 网络 {#prop-relu-1d}
设$a = t_0 < t_1 < \dots < t_m = b$，$\ell$是$[a, b]$上以$t_k$为折点、在$[t_k, t_{k+1}]$上斜率为$s_k$的连续分段线性函数。则对所有$x\in[a, b]$

$$
\ell(x) = \ell(a) + \sum_{k=0}^{m-1}v_k\operatorname{ReLU}(x - t_k),\qquad v_0 = s_0,\quad v_k = s_k - s_{k-1}\ (k\ge1),
$$ {#eq-relu-sum}

这正是带$m$个 ReLU 隐藏单元的单隐藏层网络。因此$[a, b]$上每个连续$f$都是这类网络的一致极限：对每个$\varepsilon > 0$，存在某个单隐藏层 ReLU 网络$g$，使对所有$x\in[a, b]$有$\lvert f(x) - g(x)\rvert < \varepsilon$。
:::

::: proof
[[#eq-relu-sum]]右端连续、分段线性，折点只可能在$t_k$处。在$x = a = t_0$处每个 ReLU 项为零，故它等于$\ell(a)$。在$(t_k, t_{k+1})$上，起作用的项是那些$j\le k$的项，于是它的斜率为$\sum_{j\le k}v_j = s_0 + \sum_{j=1}^k(s_j - s_{j-1}) = s_k$。两个连续函数在$a$处相等、在每个子区间上导数相同，它们在$[a, b]$上就相等。

关于逼近：$f$在紧区间$[a, b]$上一致连续，故存在$\delta > 0$，只要$\lvert x - x'\rvert\le\delta$就有$\lvert f(x) - f(x')\rvert < \varepsilon$。取折点间距不超过$\delta$，让$\ell$在折点上插值$f$。对$x\in[t_k, t_{k+1}]$，$\ell(x)$是$f(t_k)$与$f(t_{k+1})$的凸组合，二者与$f(x)$的距离都不到$\varepsilon$，故$\lvert\ell(x) - f(x)\rvert < \varepsilon$。由第一部分，$\ell$是一个 ReLU 网络。
:::

这个构造告诉我们的比存在性更多。对二阶可导的$f$，间距为$h$的线性插值误差不超过$h^2\max\lvert f''\rvert/8$，因此一维中$m$个单元达到$1/m^2$量级的误差。逼近$[0, 2\pi]$上的$\sin$：

```python
import math

def relu(a):
    return max(0.0, a)

def relu_interpolant(f, a, b, m):
    """One-hidden-layer ReLU network g(x) = c + sum_k v_k relu(x - t_k) that
    interpolates f linearly between m + 1 equally spaced knots on [a, b]."""
    t = [a + (b - a) * k / m for k in range(m + 1)]                 # 节点
    s = [(f(t[k + 1]) - f(t[k])) / (t[k + 1] - t[k]) for k in range(m)]  # 斜率
    v = [s[0]] + [s[k] - s[k - 1] for k in range(1, m)]             # (m,) 输出权重
    c = f(t[0])
    return lambda x: c + sum(vk * relu(x - tk) for vk, tk in zip(v, t[:m]))

f = math.sin
for m in [4, 8, 16, 32, 64]:
    g = relu_interpolant(f, 0.0, 2 * math.pi, m)
    err = max(abs(f(x) - g(x)) for x in [2 * math.pi * i / 10000 for i in range(10001)])
    h = 2 * math.pi / m
    print(f"hidden units {m:3d}  max error {err:.5f}  bound h^2/8 = {h * h / 8:.5f}")
```

```text
hidden units   4  max error 0.21051  bound h^2/8 = 0.30843
hidden units   8  max error 0.07038  bound h^2/8 = 0.07711
hidden units  16  max error 0.01885  bound h^2/8 = 0.01928
hidden units  32  max error 0.00479  bound h^2/8 = 0.00482
hidden units  64  max error 0.00120  bound h^2/8 = 0.00120
```

宽度每翻倍一次，误差就缩小到四分之一，与界的预言一致。在$n$维中，间距为$h$的网格需要大约$h^{-n}$个格子；而对任何固定光滑度的方法，一般的逼近都需要同$n$指数增长的参数——这就是[[ml-fundamentals/representations#sec-curse]]的维数灾难。万能逼近说的是“可能”，不是“高效”。

::: theorem 用 ReLU 单元的万能逼近 {#thm-uat-relu}
设$K\subset\R^n$紧，$f\colon K\to\R$连续。对每个$\varepsilon > 0$，存在$N$、$\mathbf{w}_j\in\R^n$、$b_j, c_j\in\R$与$c_0\in\R$，使得

$$
\Big\lvert f(\mathbf{x}) - c_0 - \sum_{j=1}^Nc_j\operatorname{ReLU}(\mathbf{w}_j^\top\mathbf{x} + b_j)\Big\rvert < \varepsilon\qquad\text{对所有 }\mathbf{x}\in K.
$$
:::

::: proof
*第1步：线性函数的指数就够了。*记$\mathcal{A}$为函数$e^{\mathbf{v}^\top\mathbf{x}}$（$\mathbf{v}\in\R^n$）的有限线性组合限制在$K$上所得的集合。它对乘法封闭，因为$e^{\mathbf{v}^\top\mathbf{x}}e^{\mathbf{v}'^\top\mathbf{x}} = e^{(\mathbf{v} + \mathbf{v}')^\top\mathbf{x}}$；它含有常数函数（$\mathbf{v} = \mathbf{0}$）；它还分离点：若$\mathbf{x}\ne\mathbf{x}'$，取$\mathbf{v} = \mathbf{x} - \mathbf{x}'$，则$\mathbf{v}^\top\mathbf{x}\ne\mathbf{v}^\top\mathbf{x}'$，从而$e^{\mathbf{v}^\top\mathbf{x}}\ne e^{\mathbf{v}^\top\mathbf{x}'}$。由斯通-魏尔斯特拉斯（Stone–Weierstrass）定理，$\mathcal{A}$在$C(K)$中稠密：存在$E(\mathbf{x}) = \sum_{i=1}^r\alpha_ie^{\mathbf{v}_i^\top\mathbf{x}}$，在$K$上使$\lvert f - E\rvert < \varepsilon/2$。

*第2步：每个指数都是一维问题。*对每个$i$，当$\mathbf{x}$取遍$K$时，$t = \mathbf{v}_i^\top\mathbf{x}$落在某个紧区间$[a_i, b_i]$上。由[[#prop-relu-1d]]，存在一维 ReLU 网络$g_i(t) = \gamma_i + \sum_kv_{ik}\operatorname{ReLU}(t - t_{ik})$，在$[a_i, b_i]$上满足$\lvert e^t - g_i(t)\rvert < \varepsilon/(2r\max(1, \lvert\alpha_i\rvert))$。代入$t = \mathbf{v}_i^\top\mathbf{x}$，每一项$\operatorname{ReLU}(\mathbf{v}_i^\top\mathbf{x} - t_{ik})$都是权重为$\mathbf{v}_i$、偏置为$-t_{ik}$的 ReLU 单元。

*第3步：合并。*函数$G(\mathbf{x}) = \sum_i\alpha_ig_i(\mathbf{v}_i^\top\mathbf{x})$有所要求的形状——所有$g_i$的全部单元都在同一个隐藏层里——且在$K$上$\lvert E - G\rvert\le\sum_i\lvert\alpha_i\rvert\,\varepsilon/(2r\max(1, \lvert\alpha_i\rvert)) \le \varepsilon/2$。于是$\lvert f - G\rvert < \varepsilon$。
:::

对几乎任何能想到的激活函数，同样的结论都成立。经典的陈述如下。

::: theorem 万能逼近（Cybenko 1989；Hornik 1991；Leshno 等 1993）{#thm-uat}
记$\mathcal{N}_\phi$为$\R^n$上形如$\mathbf{x}\mapsto\sum_{j=1}^Nc_j\phi(\mathbf{w}_j^\top\mathbf{x} + b_j)$的函数之全体，其中$N$与参数任意。

1. （Cybenko，1989。）若$\phi$连续且是**sigmoid 型**的——$t\to\infty$时$\phi(t)\to1$，$t\to-\infty$时$\phi(t)\to0$——则$\mathcal{N}_\phi$在一致范数下于$C([0, 1]^n)$中稠密：单位立方体上的每个连续函数都能在每一点上以任意$\varepsilon > 0$逼近。
2. （Hornik，1991。）若$\phi$连续、有界且不恒为常数，则对每个紧集$K\subset\R^n$，$\mathcal{N}_\phi$在一致范数下于$C(K)$中稠密；若$\phi$有界且不恒为常数，则对$\R^n$上每个有限测度$\mu$，它在$L^p(\mu)$（$1\le p < \infty$）中稠密。
3. （Leshno、Lin、Pinkus 与 Schocken，1993。）若$\phi$局部有界且分段连续，则对每个紧集$K$，$\mathcal{N}_\phi$在$C(K)$中稠密，**当且仅当**$\phi$（几乎处处）不是多项式。
:::

Cybenko 的证明不具构造性：它用哈恩-巴拿赫（Hahn–Banach）定理说明，在$\mathcal{N}_\phi$上为零的连续线性泛函必为零，因此$\mathcal{N}_\phi$不可能落在一个真闭子空间里。Hornik、Stinchcombe 与 White（1989）同年为挤压函数证明了密切相关的一个结果。第3条是最干净的形式：ReLU、GELU、tanh 与 sigmoid 都符合条件，多项式恰是例外，因为带$p$次多项式激活的单隐藏层网络只能计算次数不超过$p$的多项式（习题9）。

::: warning 万能逼近没有说什么
定理保证在足够宽的网络里*存在*一个好的逼近。它没有说要多宽（可能宽得离谱）、梯度下降会不会找到它，也没有说按有限个样本拟合的网络会在新输入上泛化。查数表也是万能逼近器。定理排除的是一种担心——架构在原理上太弱——但对深网络在实践中为何有效几乎不给解释；那取决于优化、架构的归纳偏置以及真实数据的结构。
:::

### 深度为何有用 {#sec-depth}

既然原理上一个隐藏层就够，为什么还要堆很多层？因为有些函数深网络算得很省，浅网络却要大得离谱。一个干净的例子用**帐篷映射**$t(x) = 2\operatorname{ReLU}(x) - 4\operatorname{ReLU}(x - \tfrac12)$：它在$[0, 1]$上于$[0, \frac12]$从$0$线性升到$1$，在$[\frac12, 1]$落回$0$。

::: proposition 深度可以指数级更高效 {#prop-depth}
$L$重复合$t^{(L)} = t\circ\cdots\circ t$在$[0, 1]$上由$L$个宽度为$2$的隐藏层的 ReLU 网络计算，是一个有$2^L$个线性段的锯齿函数。任何*单个*隐藏层带$m$个 ReLU 单元的网络在$\R$上计算的分段线性函数至多有$m + 1$个线性段，所以要在$[0, 1]$上等于$t^{(L)}$就需要$m\ge2^L - 1$个单元。
:::

::: proof
每层用两个单元对上一层的输出计算$t$，而$t$把$[0, 1]$映入$[0, 1]$，所以复合在$[0, 1]$上定义良好。归纳设$t^{(L-1)}$在$[0, 1]$上有$2^{L-1}$个线性段。在$[0, \frac12]$上，$t$是到$[0, 1]$的递增线性双射；在$[\frac12, 1]$上是递减的双射；于是$t^{(L)} = t^{(L-1)}\circ t$限制在两个半区间上，各是压进该半区间（第二个半区间还经过翻转）的一份$t^{(L-1)}$的拷贝，各含$2^{L-1}$段，共$2^L$段。相邻段的斜率为$\pm2^L$且异号，所以没有两段会合并。至于浅网络，$c_0 + \sum_jc_j\operatorname{ReLU}(w_jx + b_j)$除至多$m$个点$x = -b_j/w_j$外是线性的（$w_j = 0$的单元是常数），故至多有$m + 1$段。
:::

::: widget plot
f: 1 - abs(2*x - 1); 1 - abs(2*(1 - abs(2*x - 1)) - 1); 1 - abs(2*(1 - abs(2*(1 - abs(2*x - 1)) - 1)) - 1)
x: 0, 1
y: -0.1, 1.1
labels: $t$; $t\circ t$; $t\circ t\circ t$
caption: 帐篷映射$t$及其复合：每加一个宽度为$2$的层，线性段的数目就翻倍——$2$、$4$、$8$。单个隐藏层要每个折点配一个 ReLU 单元——$L$次复合要$2^L - 1$个——所以对这个函数，深度换来的是指数的节省。
:::

Telgarsky（2016）把这变成一个分离定理：存在由深度$O(k^3)$、宽度为常数的 ReLU 网络计算的函数，深度$O(k)$的任何网络要逼近它都必须动用$\Omega(2^k)$个单元。这类结论解释了深度在原理上*为何有用*；至于视觉与语言中出现的函数恰好具有深度所利用的复合结构，那是靠经验支持的假设，不是定理。

## 从 MLP 到现代网络 {#sec-modern}

本图谱里的每种架构都由 MLP 加别的东西搭建。卷积网络（[[neural-networks/convolutional-networks]]）把权重矩阵限制为在各位置间共享权重；循环网络沿序列一步步施加同一个 MLP（[[sequence-models]]）；Transformer 交替使用注意力（在各位置之间混合信息）与逐位置作用的两层 MLP（[[transformers/transformer-block#def-ffn]]）。在大语言模型里，约三分之二的参数就在这些 MLP 中。让这样的堆叠变得可训练的诸要素——由反向传播计算梯度、自适应优化器、精心的初始化、归一化与残差连接——正是本课程其余部分的主题。

::: history
McCulloch 与 Pitts 的《神经活动中内在思想的逻辑演算》（“A logical calculus of the ideas immanent in nervous activity”，1943）提出了阈值神经元，并表明由这种单元组成的网络能计算逻辑函数。Hebb 的《行为的组织》（*The Organization of Behavior*，1949）提出，当神经元共同激发时连接会增强。Rosenblatt 的感知机（1958）在康奈尔航空实验室以硬件形式建成 Mark I Perceptron，是第一台这类学习机器；收敛定理由 Novikoff（1962）等人证明。Widrow 与 Hoff 的 ADALINE（1960）用梯度下降在平方误差上训练线性单元，即“delta 规则”。Minsky 与 Papert 的《感知机》（*Perceptrons*，1969）分析了单层网络的局限；人们常把1970年代神经网络经费的萎缩归咎于这本书——尽管这种说法有所简化。用反向传播训练的多层网络（Rumelhart、Hinton 与 Williams，1986）使领域复兴，而 Hornik、Stinchcombe 与 White（1989）、Cybenko（1989）与 Hornik（1991）的万能逼近定理回答了表达能力之问。2010–2012年前后从 sigmoid 转向 ReLU，是让深网络变得可训练的转变之一。
:::

::: summary
- **人工神经元**计算$\phi(\mathbf{w}^\top\mathbf{x} + b)$：配逻辑激活就是逻辑回归，配阶跃就是 McCulloch–Pitts 阈值单元。
- **感知机**规则把分错的样例加进权重。在间隔为$\gamma$、半径为$R$的可分数据上至多犯$(R/\gamma)^2$次错误（Novikoff），但它在不可分数据上永不定型，也不能表示 XOR。
- **多层感知机**交替施加仿射映射与逐元素激活；它的隐藏层是学出的特征映射，最后一层是线性（softmax）分类器。没有非线性激活，深度就坍缩为一个仿射映射。
- **激活函数**从会饱和的 sigmoid 与 tanh，移向 ReLU，再移向光滑的近亲 GELU 与 SiLU；导数小会减慢学习，ReLU 单元会死亡。
- **万能逼近**：任何非多项式激活的单隐藏层都能在紧集上一致逼近任意连续函数（Cybenko、Hornik、Leshno 等）；对 ReLU 证明是构造性的。存在性对宽度、可训练性与泛化什么都不保证。
- **深度**可以比宽度指数级更高效：$L$层宽度$2$计算出的锯齿函数，单个隐藏层需要$2^L - 1$个单元。
:::

## 习题

::: exercise 单个神经元 {level=1 check="1/(1+exp(0.4))"}
一个 sigmoid 神经元的权重为$\mathbf{w} = (0.5, -1, 2)$，偏置为$0.1$。计算它对$\mathbf{x} = (1, 2, 0.5)$的输出。
::: solution
$z = 0.5 - 2 + 1 + 0.1 = -0.4$，故$h = \sigma(-0.4) = 1/(1 + e^{0.4})\approx0.401$。若改用 ReLU 激活，输出将是$0$。
:::
:::

::: exercise 数参数 {level=1 check="7753"}
宽度为$100, 50, 50, 3$的 MLP 有多少个参数（权重与偏置）？
::: solution
$100\cdot50 + 50 = 5{,}050$、$50\cdot50 + 50 = 2{,}550$与$50\cdot3 + 3 = 153$，共$7{,}753$个。
:::
:::

::: exercise 一个错误界 {level=1 check="2500"}
输入满足$\lVert\mathbf{x}_i\rVert\le5$，且某个单位向量以间隔$0.1$把数据分开。感知机至多犯多少次错误？若把每个输入乘以$2$，这个界会怎样？
::: solution
$(R/\gamma)^2 = (5/0.1)^2 = 2{,}500$。把所有输入翻倍，$R$与$\gamma$同时翻倍，界不变；感知机的错误次数不依赖数据的尺度。
:::
:::

::: exercise tanh 与 sigmoid {level=2}
证明$\tanh z = 2\sigma(2z) - 1$。由此推出：用 tanh 单元的单隐藏层网络与用 sigmoid 单元的网络（配以不同的参数）计算的函数完全相同。
::: solution
$2\sigma(2z) - 1 = \dfrac{2}{1 + e^{-2z}} - 1 = \dfrac{1 - e^{-2z}}{1 + e^{-2z}}$，分子分母同乘$e^z$得$(e^z - e^{-z})/(e^z + e^{-z}) = \tanh z$。tanh 单元$c\tanh(\mathbf{w}^\top\mathbf{x} + b)$等于$2c\,\sigma(2\mathbf{w}^\top\mathbf{x} + 2b) - c$，即权重与偏置加倍、再加一个常数的 sigmoid 单元，那个常数会被输出层的偏置吸收；反过来$\sigma(z) = \frac12\big(1 + \tanh(z/2)\big)$。两类函数集相同。两种激活在训练上不同——tanh 以零为中心，在$0$处的斜率是 sigmoid 的四倍——但在能表示什么上没有不同。
:::
:::

::: exercise 用神经元拼逻辑门 {level=2}
输入取$\{0, 1\}$、激活为阶跃$[z\ge0]$，给出 AND、OR 与 NOT 的权重与偏置，并把它们拼成一个计算 XOR 的两层阈值网络。
::: solution
AND：$\mathbf{w} = (1, 1)$，$b = -1.5$。OR：$\mathbf{w} = (1, 1)$，$b = -0.5$。NOT：$w = -1$，$b = 0.5$。XOR 就是“OR 且非 AND”：隐藏单元$h_1 = \text{OR}(x_1, x_2)$与$h_2 = \text{AND}(x_1, x_2)$，输出单元$[h_1 - h_2 - 0.5\ge0]$，它恰在$h_1 = 1$且$h_2 = 0$时激发，也就是恰有一个输入为$1$时。
:::
:::

::: exercise 锯齿的段数 {level=2 check="32"}
$t^{(5)}$在$[0, 1]$上有多少个线性段，其中$t$是[[#prop-depth]]中的帐篷映射？用单个隐藏层的网络精确表示它需要多少个 ReLU 单元？深的构造用了多少个？
::: solution
$2^5 = 32$段。浅网络至少需要$2^5 - 1 = 31$个单元，每个折点一个。深的构造用$5$层、每层$2$个单元，共$10$个。
:::
:::

::: exercise 绝对值与最大值 {level=2}
用带一个隐藏层的 ReLU 网络精确写出$\lvert x\rvert$与$\max(x_1, x_2)$。利用第二个，描述一个用两个隐藏层计算$\max(x_1, x_2, x_3, x_4)$的 ReLU 网络。
::: solution
$\lvert x\rvert = \operatorname{ReLU}(x) + \operatorname{ReLU}(-x)$。至于最大值，$\max(x_1, x_2) = x_2 + \operatorname{ReLU}(x_1 - x_2)$，再把$x_2 = \operatorname{ReLU}(x_2) - \operatorname{ReLU}(-x_2)$写开，这就是一个隐藏层三个单元的网络，输出权重$(1, -1, 1)$分别配在$\operatorname{ReLU}(x_2)$、$\operatorname{ReLU}(-x_2)$、$\operatorname{ReLU}(x_1 - x_2)$上。四个输入时，第一隐藏层为$m_1 = \max(x_1, x_2)$与$m_2 = \max(x_3, x_4)$算出六个单元；由于$m_1$与$m_2$是这些单元的线性组合，第二隐藏层能算$\operatorname{ReLU}(m_2)$、$\operatorname{ReLU}(-m_2)$与$\operatorname{ReLU}(m_1 - m_2)$，输出即$\max(m_1, m_2)$。一般地，一棵深度$\lceil\log_2n\rceil$的树计算$n$个数的最大值——最大池化就是一个 ReLU 网络。
:::
:::

::: exercise 给定精度要多宽？ {level=2 check="71"}
对满足$\lvert f''\rvert\le M$的函数作间距$h$的线性插值，误差不超过$Mh^2/8$。用等间距的[[#prop-relu-1d]]，多少个 ReLU 单元足以在$10^{-3}$之内逼近$[0, 2\pi]$上的$\sin$？
::: solution
取$M = 1$，需要$h^2/8\le10^{-3}$，即$h\le\sqrt{0.008} = 0.0894$。区间个数$m = 2\pi/h\ge70.2$，故$m = 71$个单元够用（每个区间贡献一个，即在其左端点切换的那个单元）。[[#sec-universal]]中的实验证实了这个标度：$64$个单元给出误差$0.0012$。
:::
:::

::: exercise 多项式激活不是万能的 {level=3}
设$\phi$是$p$次多项式。证明每个网络$\sum_jc_j\phi(\mathbf{w}_j^\top\mathbf{x} + b_j)$都是$\mathbf{x}$的次数不超过$p$的多项式，并推出这类网络在$C([0, 1])$中不稠密。增加隐藏*层数*会改变结论吗？
::: solution
$\mathbf{w}_j^\top\mathbf{x} + b_j$是$\mathbf{x}$的次数不超过$1$的多项式，对它作用$\phi$后次数不超过$p$，而次数不超过$p$的多项式的线性组合仍不超过$p$次。$[0, 1]$上次数不超过$p$的多项式构成$C([0, 1])$的有限维——因而闭的——子空间，且它是真子空间（不含$x^{p+1}$），所以不稠密：例如$x^{p+1}$到该子空间的距离是一个正数，任何网络都到不了那么近。带$L$个隐藏层时网络是次数不超过$p^L$的多项式，对固定深度仍是固定的有限维空间，所以固定深度的多项式网络也不万能；只有让深度任意增长，次数才能增长。这就是[[#thm-uat]]第3条要排除多项式的原因。
:::
:::

::: exercise 感知机在不可分数据上 {level=3}
证明若数据（在添加常数特征后、对原点）线性不可分，感知机就犯无穷多次错误。再证明若按循环顺序访问样例，权重向量保持有界——可以直接使用*感知机循环定理*（Block 与 Levin，1970），它说的正是这件事——并解释为什么对所有步的权重取平均（Freund 与 Schapire，1999的“平均感知机”）是个合理的补救。
::: solution
若感知机只犯有限多次错误，那么最后一次之后，权重向量在其后的每一轮都会把所有样例都分对，它就是分隔向量——与不可分矛盾。于是每一轮都有错误，错误有无穷多次。循环定理说迭代点保持在有界集内，因此它们在权重空间的有限个区域之间游走，每个区域都有一些样例被分错，而最终的迭代点取决于算法恰好停在哪里。平均$\bar{\mathbf{w}} = \frac1T\sum_t\mathbf{w}_t$给每个访问过的向量以“它无错误存活了多久”为权重，这偏爱把许多样例分对的向量，而且随停止时刻的波动小得多。Freund 与 Schapire 对这个平均（或“投票”）感知机给出了以错误个数表述的泛化界。像逻辑损失这样的光滑损失彻底避免了这个问题，因为无论数据可分与否，它的极小点都定义良好（可分时要配上惩罚项）。
:::
:::
