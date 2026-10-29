训练神经网络，就是调整数以百万、十亿计的数字，让单一的一个数——损失——降下来。要知道每个权重该往哪个方向调，我们需要同时得到损失对每一个权重的导数：**梯度**。一个有$7\times10^9$个参数的语言模型，每个训练步都需要$7\times10^9$个偏导数，而它的代价只相当于几次前向传播——靠的是一个思想：链式法则，沿着计算过程反向作用回去。这个过程叫**反向传播**（backpropagation），每个深度学习库都会自动实现它。

自动并不意味着不透明。你将阅读论文里的梯度、为新层推导梯度、在训练发散时调试它们、并估算其代价。本章建立所需的微积分：偏导数与梯度、作为向量值映射之导数的雅可比矩阵、多元链式法则、矩阵微积分的几个恒等式，以及两个每个从业者都应当能在纸上完成的推导——线性层的梯度，与 softmax 交叉熵损失的梯度。数学图谱中关于[偏导数](/learn/maths/lesson.php?c=multivariable&l=partial-derivatives)、[梯度](/learn/maths/lesson.php?c=multivariable&l=gradient)与[链式法则](/learn/maths/lesson.php?c=calculus-1&l=chain-rule)的课程给出背后的分析。

## 偏导数与梯度 {#sec-gradient}

::: definition 偏导数与梯度 {#def-gradient}
设$f\colon\R^n\to\R$。$f$在$\mathbf{x}$处对$x_i$的**偏导数**为

$$
\frac{\partial f}{\partial x_i}(\mathbf{x}) = \lim_{h\to0}\frac{f(\mathbf{x} + h\mathbf{e}_i) - f(\mathbf{x})}{h},
$$

即其余坐标固定不动时关于$x_i$的通常导数。**梯度**是所有偏导数组成的向量，

$$
\nabla f(\mathbf{x}) = \Big(\frac{\partial f}{\partial x_1}, \dots, \frac{\partial f}{\partial x_n}\Big)\in\R^n.
$$

若当$\mathbf{h}\to\mathbf{0}$时$f(\mathbf{x} + \mathbf{h}) = f(\mathbf{x}) + \nabla f(\mathbf{x})\cdot\mathbf{h} + o(\lVert\mathbf{h}\rVert)$，则称$f$在$\mathbf{x}$处**可导**。
:::

最后一行才是关键：在$\mathbf{x}$附近，可导函数近似于线性，而梯度正是描述这个线性近似的向量。走一小步$\mathbf{h}$，$f$大约改变$\nabla f\cdot\mathbf{h}$。一切基于梯度的训练方法都建立在这个一阶近似之上；而步长过大时它的失效，正是[[math-for-ml/optimisation]]的主题。

::: proposition 梯度是最速上升方向 {#prop-steepest}
设$f$在$\mathbf{x}$处可导且$\nabla f(\mathbf{x})\ne\mathbf{0}$。$f$沿单位向量$\mathbf{u}$的**方向导数**是$D_{\mathbf{u}}f(\mathbf{x}) = \nabla f(\mathbf{x})\cdot\mathbf{u}$。在所有单位向量中，它在$\mathbf{u} = \nabla f/\lVert\nabla f\rVert$处最大，最大值为$\lVert\nabla f(\mathbf{x})\rVert$；在相反方向上最小。它在与梯度垂直的方向上为零，而这些方向恰与$f$过$\mathbf{x}$的等值集相切。
:::

::: proof
由可导性，$f(\mathbf{x} + t\mathbf{u}) = f(\mathbf{x}) + t\,\nabla f\cdot\mathbf{u} + o(t)$，所以$t\mapsto f(\mathbf{x} + t\mathbf{u})$在$t = 0$处的导数是$\nabla f\cdot\mathbf{u}$。由柯西-施瓦茨不等式（[[math-for-ml/vectors-matrices#prop-cauchy-schwarz]]），对单位向量$\mathbf{u}$有$-\lVert\nabla f\rVert\le\nabla f\cdot\mathbf{u}\le\lVert\nabla f\rVert$；右边取等号当且仅当$\mathbf{u}$是$\nabla f$的正倍数，左边取等号当且仅当$\mathbf{u}$是其负倍数。
:::

因此梯度下降沿$-\nabla f$迈步，即损失**局部**下降最快的方向。“局部”二字要紧：在一条狭长的山谷里，最速方向多半指向横穿山谷而非沿着山谷，这正是朴素梯度下降来回振荡的原因，也是[[math-for-ml/optimisation]]中的优化器要加上动量和逐坐标缩放的原因。

::: example 等高线图上的梯度 {#ex-contour}
对$f(x, y) = x^2 + 2y^2$，求$\nabla f(1, 1)$、该点处最速上升的速率，以及指向原点方向的方向导数。
::: solution
$\nabla f = (2x, 4y)$，所以$\nabla f(1, 1) = (2, 4)$，长度$\sqrt{20} = 4.472$：没有哪个方向能让$f$以超过每单位步长$4.47$的速率上升。指向原点的单位向量是$\mathbf{u} = -(1, 1)/\sqrt2$，$D_{\mathbf{u}}f = -(2 + 4)/\sqrt2 = -4.243$。通往最小值的直路是个不错的下降方向，却不是最陡的：$-\nabla f$沿$-(1, 2)$，比起原点更偏向$x$轴，因为$f$在$y$方向上升得更快。
:::
:::

::: widget contour
f: x^2 + 2y^2
x: -2, 2
y: -2, 2
point: 1,1
gradient: true
caption: $f(x, y) = x^2 + 2y^2$的等值线，以及在一个可拖动点处的梯度。梯度总是垂直于等值线并指向高处；它的长度就是最速上升的速率。拖动这个点，注意$-\nabla f$一般**并不**指向位于原点的最小值点。
:::

## 雅可比矩阵 {#sec-jacobian}

网络的一层把向量映成向量，所以需要向量值函数的导数。

::: definition 雅可比矩阵 {#def-jacobian}
设$\mathbf{f}\colon\R^n\to\R^m$的分量为$f_1, \dots, f_m$。它在$\mathbf{x}$处的**雅可比矩阵**（Jacobian）是$m\times n$矩阵

$$
J_{\mathbf{f}}(\mathbf{x}) = \frac{\partial\mathbf{f}}{\partial\mathbf{x}} = \begin{pmatrix}\dfrac{\partial f_1}{\partial x_1}&\cdots&\dfrac{\partial f_1}{\partial x_n}\\\vdots&&\vdots\\\dfrac{\partial f_m}{\partial x_1}&\cdots&\dfrac{\partial f_m}{\partial x_n}\end{pmatrix},
$$

于是$\mathbf{f}(\mathbf{x} + \mathbf{h})\approx\mathbf{f}(\mathbf{x}) + J_{\mathbf{f}}(\mathbf{x})\mathbf{h}$。第$i$行是$f_i$的梯度（写成行向量）；当$m = 1$时，雅可比矩阵就是行向量$\nabla f^\top$。
:::

三个雅可比矩阵就覆盖了神经网络的绝大部分：

- **线性映射**$\mathbf{f}(\mathbf{x}) = W\mathbf{x} + \mathbf{b}$的$J = W$，在每一点都如此：线性映射的最佳线性近似就是它自己。
- **逐元素激活**$\mathbf{f}(\mathbf{x}) = (\phi(x_1), \dots, \phi(x_n))$有对角雅可比矩阵$J = \diag(\phi'(x_1), \dots, \phi'(x_n))$，因为输出$i$只依赖输入$i$。对 ReLU，$\phi'(x)$在$x > 0$时为$1$、在$x < 0$时为$0$：雅可比矩阵是一个掩码，让梯度通过活跃的单元，在不活跃的单元处挡住它们。
- **softmax**$\mathbf{p} = \operatorname{softmax}(\mathbf{z})$有稠密雅可比矩阵$\diag(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$，将在下面[[#prop-softmax-ce]]中推导，并在[[transformers/self-attention]]中用来解释$1/\sqrt{d_k}$这个缩放因子的由来。

::: example 一个小映射的雅可比矩阵 {#ex-jacobian}
求$\mathbf{f}(x, y) = (xy,\ x + y^2,\ e^x)$在$(0, 1)$处的雅可比矩阵，并用它近似$\mathbf{f}(0.1, 0.9)$。
::: solution
$$
J = \begin{pmatrix}y&x\\1&2y\\e^x&0\end{pmatrix},\qquad J(0, 1) = \begin{pmatrix}1&0\\1&2\\1&0\end{pmatrix}.
$$

它是$3\times2$的：三个输出，两个输入。由$\mathbf{f}(0, 1) = (0, 1, 1)$与$\mathbf{h} = (0.1, -0.1)$，$J\mathbf{h} = (0.1, -0.1, 0.1)$，所以$\mathbf{f}(0.1, 0.9)\approx(0.1, 0.9, 1.1)$。精确值是$(0.09, 0.91, 1.105)$：误差约$0.01$，量级为$\lVert\mathbf{h}\rVert^2$，正符合线性近似的承诺。
:::
:::

## 链式法则 {#sec-chain}

::: theorem 多元链式法则 {#thm-chain}
设$\mathbf{g}\colon\R^n\to\R^k$在$\mathbf{x}$处可导，$\mathbf{f}\colon\R^k\to\R^m$在$\mathbf{g}(\mathbf{x})$处可导。则$\mathbf{f}\circ\mathbf{g}$在$\mathbf{x}$处可导，且

$$
J_{\mathbf{f}\circ\mathbf{g}}(\mathbf{x}) = J_{\mathbf{f}}\big(\mathbf{g}(\mathbf{x})\big)\,J_{\mathbf{g}}(\mathbf{x}),
$$ {#eq-chain}

这是一个$(m\times k)(k\times n)$矩阵乘积。按分量，$\dfrac{\partial f_i}{\partial x_j} = \displaystyle\sum_{l=1}^k\frac{\partial f_i}{\partial g_l}\frac{\partial g_l}{\partial x_j}$。
:::

证明的思路是：两个近似线性映射的复合，近似等于这两个线性映射的复合，而线性映射的复合就是矩阵乘法（[[math-for-ml/vectors-matrices#def-matmul]]）；数学图谱在[梯度一课](/learn/maths/lesson.php?c=multivariable&l=gradient)中仔细证明了这一点。分量形式有一个有用的读法：$x_j$对$f_i$的影响，就是对每个中间量$g_l$、把沿该路径传递的影响求和。

深度网络是一个很长的复合：$\mathbf{x}\mapsto\mathbf{h}_1\mapsto\mathbf{h}_2\mapsto\dots\mapsto\mathbf{h}_L\mapsto\mathcal{L}$，最后落在一个标量损失上。由[[#eq-chain]]，损失对输入的导数是一串雅可比矩阵的乘积，

$$
\frac{\partial\mathcal{L}}{\partial\mathbf{x}} = \underbrace{\frac{\partial\mathcal{L}}{\partial\mathbf{h}_L}}_{1\times d_L}\ \underbrace{\frac{\partial\mathbf{h}_L}{\partial\mathbf{h}_{L-1}}}_{d_L\times d_{L-1}}\cdots\underbrace{\frac{\partial\mathbf{h}_1}{\partial\mathbf{x}}}_{d_1\times d_0}.
$$ {#eq-product}

矩阵乘法满足结合律，所以这个乘积可以按任意顺序计算——而顺序对代价的影响是巨大的。

### 前向模式与反向模式 {#sec-modes}

从右往左计算[[#eq-product]]（**前向模式**）会把雅可比矩阵互相相乘，$d_1\times d_0$乘$d_2\times d_1$，如此等等，把一张$d_\ell\times d_0$的完整矩阵一路向前携带。从左往右计算（**反向模式**）则从$1\times d_L$行向量$\partial\mathcal{L}/\partial\mathbf{h}_L$出发，一次只乘一个雅可比矩阵；每个中间结果都是单独一个行向量，$\partial\mathcal{L}/\partial\mathbf{h}_\ell$。行向量乘矩阵是一个**向量-雅可比乘积**，它根本不需要造出雅可比矩阵：对线性层它是$\boldsymbol{\delta}^\top W$，对逐元素激活它是一个逐元素乘积。

::: proposition 廉价梯度原理 {#prop-cheap-gradient}
设$f\colon\R^n\to\R$由一个初等运算组成的程序算出，代价为$C$。反向模式自动微分算出整个梯度$\nabla f\in\R^n$的代价是$C$的一个小常数倍（实践中约为$C$的两到三倍），与$n$无关；代价是要存下前向计算的中间值。前向模式对每个输入方向需要一遍，因此要算出完整梯度需要$n$遍。
:::

::: proof
**证明概要。**反向模式把程序里每个初等运算按相反顺序再访问一次。运算$v = \psi(u_1, \dots, u_q)$收到伴随量$\bar v = \partial f/\partial v$，并把$\bar v\,\partial\psi/\partial u_i$加到每个$\bar u_i$上；由[[#thm-chain]]的分量形式，一旦用到$u_i$的所有运算都被访问过，累计的$\bar u_i$就恰好是$\partial f/\partial u_i$。初等运算的偏导数至多花费该运算本身的常数倍，所以反向扫描的代价是$C$的常数倍。每个伴随量都需要$\partial\psi/\partial u_i$取值所在的前向值$u_i$，这就是必须保存它们的原因。一个精细的上界（Baur 与 Strassen，1983；Griewank 与 Walther，2008）对算术运算给出的常数至多约为$5$。
:::

这正是深度学习得以存在的原因。当$n = 7\times10^9$个参数时，前向模式每步要算几十亿遍；反向模式只需相当于约两遍。代价是内存：前向传播的每个激活值都要保留到反向传播用完为止，这就是训练时内存被激活值占据的原因，也是激活检查点（对部分激活值重新计算而不是存储）等技术存在的原因。

::: warning 梯度的形状与被求导的对象相同
对标量损失$\mathcal{L}$和权重矩阵$W\in\R^{m\times n}$，梯度$\partial\mathcal{L}/\partial W$也是$m\times n$矩阵，其$(i, j)$元素等于$\partial\mathcal{L}/\partial W_{ij}$；这正是更新$W\leftarrow W - \eta\,\partial\mathcal{L}/\partial W$得以成立的原因。对于“向量对向量的导数”究竟是$m\times n$（本文采用的“分子布局”）还是它的转置，各家文献意见不一，从采用另一种布局的文献里抄来的公式会得到转置了的结果。安全法则：写出每个量的形状，并检查公式里的形状相乘合法、且结果的形状与参数的一致。
:::

## 线性层的梯度 {#sec-linear-grad}

网络的反向传播主要由一个计算构成，对每个线性层重复一遍。

::: proposition 线性层的梯度 {#prop-linear-grad}
设$\mathbf{y} = W\mathbf{x} + \mathbf{b}$，其中$W\in\R^{m\times n}$，$\mathcal{L}$是依赖$\mathbf{y}$的标量，**上游梯度**为$\boldsymbol{\delta} = \partial\mathcal{L}/\partial\mathbf{y}\in\R^m$。则

$$
\frac{\partial\mathcal{L}}{\partial W} = \boldsymbol{\delta}\mathbf{x}^\top\in\R^{m\times n},\qquad \frac{\partial\mathcal{L}}{\partial\mathbf{b}} = \boldsymbol{\delta},\qquad \frac{\partial\mathcal{L}}{\partial\mathbf{x}} = W^\top\boldsymbol{\delta}\in\R^n.
$$ {#eq-linear-grad}

对批次$Y = XW^\top + \mathbf{1}\mathbf{b}^\top$，其中$X\in\R^{N\times n}$，上游梯度为$\Delta = \partial\mathcal{L}/\partial Y\in\R^{N\times m}$，

$$
\frac{\partial\mathcal{L}}{\partial W} = \Delta^\top X = \sum_{s=1}^N\boldsymbol{\delta}_s\mathbf{x}_s^\top,\qquad \frac{\partial\mathcal{L}}{\partial\mathbf{b}} = \Delta^\top\mathbf{1},\qquad \frac{\partial\mathcal{L}}{\partial X} = \Delta W.
$$
:::

::: proof
$y_i = \sum_jW_{ij}x_j + b_i$，故$\partial y_i/\partial W_{kl} = [i = k]\,x_l$。由链式法则$\partial\mathcal{L}/\partial W_{kl} = \sum_i\delta_i\,[i = k]\,x_l = \delta_kx_l$，即$\boldsymbol{\delta}\mathbf{x}^\top$的$(k, l)$元素。类似地，由$\partial y_i/\partial b_k = [i = k]$得$\delta_k$；由$\partial y_i/\partial x_l = W_{il}$得$\partial\mathcal{L}/\partial x_l = \sum_iW_{il}\delta_i = (W^\top\boldsymbol{\delta})_l$。对批次而言，损失通过$Y$的每一行依赖$W$，各行的贡献相加：$\sum_s\boldsymbol{\delta}_s\mathbf{x}_s^\top$，由[[math-for-ml/vectors-matrices#prop-views]]的外积视角即$\Delta^\top X$。其余两式逐行同理。
:::

权重梯度是一个外积：输入乘以上游梯度。那些把强活跃的输入与损失敏感的输出处连接起来的权重，梯度就大——这是“一起放电的神经元连在一起”的精确版本，驱动它的是误差而不仅仅是共同活动。对输入的梯度$W^\top\boldsymbol{\delta}$，则把误差沿着前向权重的转置往回送；这就是反向传播（backpropagation）中“反向”二字的含义。

批次公式还给出代价。前向：$XW^\top$花费$2Nmn$次 FLOPs。反向：$\Delta^\top X$与$\Delta W$各花费$2Nmn$。因此训练大约花费前向传播的三倍——这就是“训练每参数每词元$6N$次 FLOPs、推理$2N$次”这一标准估算的由来（习题 5）。

## softmax 与交叉熵损失 {#sec-softmax-ce}

语言模型以一个 **logits** 向量$\mathbf{z}\in\R^{\lvert\mathcal{V}\rvert}$收尾，把它变成词表上的分布$\mathbf{p} = \operatorname{softmax}(\mathbf{z})$，然后用正确的下一个词元$y$的**交叉熵损失**$\mathcal{L} = -\log p_y$来训练（为什么是这个损失，在[[math-for-ml/information-theory]]中解释）。这个组合的梯度简洁得出奇。

::: proposition softmax 交叉熵的梯度 {#prop-softmax-ce}
设$\mathbf{p} = \operatorname{softmax}(\mathbf{z})$，其中$p_i = e^{z_i}/\sum_ke^{z_k}$。则

1. softmax 的雅可比矩阵是$\dfrac{\partial p_i}{\partial z_j} = p_i(\delta_{ij} - p_j)$，即$J = \diag(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$；
2. 对损失$\mathcal{L} = -\log p_y$，以$\mathbf{e}_y$为目标词元的独热向量，

$$
\frac{\partial\mathcal{L}}{\partial\mathbf{z}} = \mathbf{p} - \mathbf{e}_y.
$$ {#eq-softmax-ce}

更一般地，对目标分布$\mathbf{q}$与$\mathcal{L} = -\sum_iq_i\log p_i$，梯度是$\mathbf{p} - \mathbf{q}$。
:::

::: proof
(1) 记$S = \sum_ke^{z_k}$，则$\partial S/\partial z_j = e^{z_j}$。由商法则$\partial p_i/\partial z_j = (\delta_{ij}e^{z_i}S - e^{z_i}e^{z_j})/S^2 = p_i\delta_{ij} - p_ip_j$。

(2) 直接求导比套用(1)更容易：$-\log p_y = -z_y + \log S$，于是

$$
\frac{\partial\mathcal{L}}{\partial z_j} = -\delta_{jy} + \frac{e^{z_j}}{S} = p_j - \delta_{jy}.
$$

对一般目标，$-\sum_iq_i\log p_i = -\sum_iq_iz_i + \big(\sum_iq_i\big)\log S$，而$\sum_iq_i = 1$，故对$z_j$的导数是$-q_j + p_j$。
:::

梯度是“预测减目标”。它的分量之和为零；它把正确的 logit 抬高$1 - p_y$，把其余每个 logit 按各自的概率$p_j$压低，所以模型错误偏爱的词元被压得最狠。它是有界的——每个分量都落在$[-1, 1]$内——无论模型错得有多离谱都是如此，这有助于训练稳定；它只在模型把概率$1$全部押在目标词元上时才为零。这个推导还解释了一条数值规则：绝不要分两步算$\log(\operatorname{softmax}(\mathbf{z}))$，因为极小的$p_y$会舍入为零，其对数就成了$-\infty$。程序库会直接算$-z_y + \log\sum_ke^{z_k}$，在 log-sum-exp 内部先减去最大值，并把反向传播融合成$\mathbf{p} - \mathbf{e}_y$。

::: example 手算交叉熵梯度 {#ex-ce-grad}
一个词表只有三个词元的模型输出 logits $\mathbf{z} = (2, 1, 0)$，正确的词元是第二个。求损失及其对 logits 的梯度。
::: solution
$\mathbf{p} = \operatorname{softmax}(2, 1, 0) = (0.665, 0.245, 0.090)$（计算见[[transformers/self-attention]]）。损失为$-\log0.245 = 1.408$纳特（nats）。由[[#eq-softmax-ce]]

$$
\frac{\partial\mathcal{L}}{\partial\mathbf{z}} = (0.665,\ 0.245 - 1,\ 0.090) = (0.665,\ -0.755,\ 0.090).
$$

梯度下降一步要减去这个向量的倍数：正确的 logit 上升，第一个 logit——模型错误的最爱——下降最多，且各分量之和为$0$，这与“给所有 logits 加上同一个常数不改变任何东西”这一事实一致。
:::
:::

::: quiz
对损失$\mathcal{L} = -\log p_y$，其中$\mathbf{p} = \operatorname{softmax}(\mathbf{z})$，下列哪条陈述正确？
- [ ] $\partial\mathcal{L}/\partial z_y = -1/p_y$
- [x] 对每个$j\ne y$，$\partial\mathcal{L}/\partial z_j = p_j$
- [ ] 当$p_y\to0$时梯度无界增长
- [ ] 只要$y$是最可能的词元，梯度就为零
::: solution
由[[#prop-softmax-ce]]，梯度是$\mathbf{p} - \mathbf{e}_y$，所以$j\ne y$时为$p_j$。对$p_y$的导数是$-1/p_y$，但对 logit $z_y$的导数是$p_y - 1\in(-1, 0)$，有界。梯度为零仅当$p_y = 1$；光是“最可能的词元”还不够。
:::
:::

## 手推反向传播 {#sec-backprop}

把这些部件拼起来，放在一个小到能把每个数字都看清的网络上。

::: example 反向传播穿过一个两层网络 {#ex-backprop}
一个网络把$\mathbf{x}\in\R^2$映成三个 logits：$\mathbf{a} = W_1\mathbf{x}$，$\mathbf{h} = \operatorname{ReLU}(\mathbf{a})$，$\mathbf{z} = W_2\mathbf{h}$，损失$\mathcal{L} = -\log\operatorname{softmax}(\mathbf{z})_y$，其中

$$
W_1 = \begin{pmatrix}1&-1\\0.5&1\end{pmatrix},\quad W_2 = \begin{pmatrix}0.4&0.2\\-0.2&0.4\\0.3&-0.2\end{pmatrix},\quad\mathbf{x} = (1, 2),\quad y = 1\ (\text{第一个类别}).
$$

计算损失以及对$W_2$和$W_1$的梯度。
::: solution
**前向。**$\mathbf{a} = (1 - 2,\ 0.5 + 2) = (-1, 2.5)$；$\mathbf{h} = (0, 2.5)$；$\mathbf{z} = W_2\mathbf{h} = (0.5, 1.0, -0.5)$。softmax 为$(1.6487, 2.7183, 0.6065)/4.9735 = (0.3315, 0.5465, 0.1220)$，且$\mathcal{L} = -\log0.3315 = 1.1041$。

**反向。**由[[#eq-softmax-ce]]，$\boldsymbol{\delta}_z = \mathbf{p} - \mathbf{e}_1 = (-0.6685, 0.5465, 0.1220)$。由[[#eq-linear-grad]]，

$$
\frac{\partial\mathcal{L}}{\partial W_2} = \boldsymbol{\delta}_z\mathbf{h}^\top = \begin{pmatrix}0&-1.6713\\0&1.3664\\0&0.3049\end{pmatrix},\qquad \boldsymbol{\delta}_h = W_2^\top\boldsymbol{\delta}_z = (-0.3401,\ 0.0605).
$$

$\partial\mathcal{L}/\partial W_2$的第一列为零，因为$h_1 = 0$：从静默单元出发的权重收不到梯度。由于$a_1 < 0 < a_2$，ReLU 的雅可比矩阵是$\diag(0, 1)$，所以$\boldsymbol{\delta}_a = (0, 0.0605)$，于是

$$
\frac{\partial\mathcal{L}}{\partial W_1} = \boldsymbol{\delta}_a\mathbf{x}^\top = \begin{pmatrix}0&0\\0.0605&0.1211\end{pmatrix}.
$$

第一行为零：单元$1$不活跃，它上游的任何东西都无法从这个样本学习——这是“ReLU 死亡”效应的微缩版。
:::
:::

下面的代码用朴素的 Python 做同样的计算，并把两个梯度元素与**中心差商**$\big(\mathcal{L}(w + \varepsilon) - \mathcal{L}(w - \varepsilon)\big)/2\varepsilon$对照检验。这样的梯度检查，是手写反向传播的标准测试。

```python
import math

def forward(W1, W2, x, y):
    # x: (2,), W1: (2, 2), W2: (3, 2), y: 目标类别，取值于 {0, 1, 2}
    a = [sum(W1[i][j] * x[j] for j in range(2)) for i in range(2)]   # (2,) 预激活
    h = [max(0.0, ai) for ai in a]                                   # (2,) ReLU
    z = [sum(W2[k][i] * h[i] for i in range(2)) for k in range(3)]   # (3,) logits
    m = max(z)
    s = sum(math.exp(zk - m) for zk in z)
    p = [math.exp(zk - m) / s for zk in z]                           # (3,) softmax
    loss = -math.log(p[y])                                           # 交叉熵
    return a, h, z, p, loss

def backward(W1, W2, x, y):
    a, h, z, p, loss = forward(W1, W2, x, y)
    dz = [p[k] - (1.0 if k == y else 0.0) for k in range(3)]         # (3,) dL/dz = p - y
    dW2 = [[dz[k] * h[i] for i in range(2)] for k in range(3)]       # (3, 2) 外积
    dh = [sum(W2[k][i] * dz[k] for k in range(3)) for i in range(2)] # (2,) W2^T dz
    da = [dh[i] * (1.0 if a[i] > 0 else 0.0) for i in range(2)]      # (2,) ReLU 门
    dW1 = [[da[i] * x[j] for j in range(2)] for i in range(2)]       # (2, 2) 外积
    return loss, dW1, dW2

W1 = [[1.0, -1.0], [0.5, 1.0]]
W2 = [[0.4, 0.2], [-0.2, 0.4], [0.3, -0.2]]
x, y = [1.0, 2.0], 0
loss, dW1, dW2 = backward(W1, W2, x, y)
print("loss", round(loss, 6))
print("dW1", [[round(g, 6) + 0.0 for g in row] for row in dW1])
print("dW2", [[round(g, 6) + 0.0 for g in row] for row in dW2])

# 用中心差商检验每个梯度的一个元素
eps = 1e-5
for W, G, (i, j) in [(W1, dW1, (1, 0)), (W2, dW2, (1, 1))]:
    W[i][j] += eps;  lp = forward(W1, W2, x, y)[4]
    W[i][j] -= 2 * eps; lm = forward(W1, W2, x, y)[4]
    W[i][j] += eps
    print("numeric", round((lp - lm) / (2 * eps), 6), "analytic", round(G[i][j], 6))
```

```text
loss 1.104131
dW1 [[0.0, 0.0], [0.060529, 0.121058]]
dW2 [[0.0, -1.671253], [0.0, 1.366373], [0.0, 0.304879]]
numeric 0.060529 analytic 0.060529
numeric 1.366373 analytic 1.366373
```

（Python 的类别下标从$0$开始，所以`y = 0`就是例子中的第一个类别。）PyTorch、JAX 等程序库做的正是这套记账，而且完全自动：每个运算记下如何计算自己的向量-雅可比乘积，调用`backward()`就把它们按相反顺序执行。

::: example 差商有多精确？ {#ex-finite-diff}
在双精度下，分别用向前差商$(f(x + h) - f(x))/h$与中心差商$(f(x + h) - f(x - h))/2h$近似$e^x$在$x = 1$处的导数（精确值为$e = 2.71828\ldots$），取几个不同的$h$。
::: solution
误差为：

| $h$ | 向前 | 中心 |
|---|---|---|
| $10^{-1}$ | $1.4\times10^{-1}$ | $4.5\times10^{-3}$ |
| $10^{-3}$ | $1.4\times10^{-3}$ | $4.5\times10^{-7}$ |
| $10^{-5}$ | $1.4\times10^{-5}$ | $5.9\times10^{-11}$ |
| $10^{-8}$ | $6.6\times10^{-9}$ | $6.6\times10^{-9}$ |
| $10^{-11}$ | $3.3\times10^{-5}$ | $1.0\times10^{-5}$ |

当$h$适中时，向前差商的误差按$h$缩小，中心差商的按$h^2$缩小，正如泰勒定理的预言。而当$h$非常小时，两者反而变得**更差**：$f(x + h)$与$f(x)$几乎每一位都相同，其差被量级为$10^{-16}/h$的舍入误差支配。因此梯度检查要用双精度下$h$取$10^{-5}$左右的中心差商——而且绝不要在$16$位精度下运行，那里的舍入误差约为$10^{-3}$。
:::
:::

::: warning 导数不存在的点
ReLU 在$0$处不可导，max 池化的最大值在两个输入打平时不可导，绝对值在$0$处不可导。程序库只是取一个值（对 ReLU，$0$处的导数取$0$），这无伤大雅，因为实值输入撞上这些点的概率几乎为零。不过，一个横跨这样的拐折点的差商检查，会与解析梯度不相符；当检查只在少数几个元素上失败时，先去找靠近拐折点的输入。
:::

## 矩阵微积分的几个恒等式 {#sec-identities}

下面这些标量函数的梯度反反复复地出现；每一个都只要把函数按分量写出来再求导即可得到，如同[[#prop-linear-grad]]的证明那样。

| 函数$f$ | 梯度 | 出现场合 |
|---|---|---|
| $\mathbf{a}^\top\mathbf{x}$ | $\mathbf{a}$ | 线性模型 |
| $\mathbf{x}^\top A\mathbf{x}$ | $(A + A^\top)\mathbf{x}$；$A$对称时为$2A\mathbf{x}$ | 二次损失、黑塞矩阵 |
| $\lVert A\mathbf{x} - \mathbf{b}\rVert^2$ | $2A^\top(A\mathbf{x} - \mathbf{b})$ | 最小二乘 |
| $\lVert\mathbf{x}\rVert$ | $\mathbf{x}/\lVert\mathbf{x}\rVert$（$\mathbf{x}\ne\mathbf{0}$时） | 归一化、梯度裁剪 |
| $\log\sum_ie^{x_i}$ | $\operatorname{softmax}(\mathbf{x})$ | 对数配分函数、交叉熵 |
| $\tr(AW)$（对$W$） | $A^\top$ | 矩阵值参数 |
| $\mathbf{u}^\top W\mathbf{v}$（对$W$） | $\mathbf{u}\mathbf{v}^\top$ | 双线性型、注意力分数 |

让最小二乘的梯度为零，就得到**正规方程**$A^\top A\mathbf{x} = A^\top\mathbf{b}$，即线性回归的封闭形式解（见数学图谱的[最小二乘](/learn/maths/lesson.php?c=linear-algebra&l=least-squares)一课）。log-sum-exp 那一行说明 softmax 本身就是一个梯度，这就是它的雅可比矩阵$\diag(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$对称的原因：它是 log-sum-exp 的黑塞矩阵。

::: history
莱布尼茨（Leibniz）在1670年代的微积分里就用过链式法则，柯西（Cauchy）在1847年提出了最速下降法。自动微分始于前向模式：Robert Wengert 的《一种简单的自动求导程序》（A simple automatic derivative evaluation program，1964）。Seppo Linnainmaa 在1970年研究舍入误差的硕士论文里描述了反向模式的导数累加，并给出了实现；Paul Werbos 在1974年的博士论文中提出用它训练神经网络。Bert Speelpenning 在1980年造出了一个反向模式编译器，Baur 与 Strassen（1983）证明了有理函数的梯度至多花费函数本身代价的常数倍。Rumelhart、Hinton 与 Williams（1986）在《自然》（Nature）上发表文章，证明反向传播能让多层网络学到有用的内部表示，方法由此在神经网络研究中传开。自动构建反向传播的程序库——Theano（2010），以及后来的 TensorFlow、PyTorch 与 JAX——把反向传播从一次推导变成了一次函数调用。
:::

::: summary
- 梯度列出所有偏导数；它给出函数的最佳线性近似，并指向最速上升方向。
- $\mathbf{f}\colon\R^n\to\R^m$的雅可比矩阵是$m\times n$的；线性层的雅可比矩阵是$W$，逐元素激活的是对角矩阵，softmax 的是$\diag(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$。
- 链式法则把雅可比矩阵相乘。反向模式（反向传播）从损失出发、用向量-雅可比乘积按反序计算这个乘积，只花前向传播几倍的代价就得到整个梯度，代价是保存激活值。
- 线性层的梯度是$\boldsymbol{\delta}\mathbf{x}^\top$（一个外积）、$\boldsymbol{\delta}$与$W^\top\boldsymbol{\delta}$；训练大约相当于三次前向传播。
- softmax 配交叉熵的梯度是$\mathbf{p} - \mathbf{e}_y$，预测减目标。手写的梯度要用双精度下的中心差商检查。
:::

## 习题

::: exercise 一个方向导数 {level=1 check="28/5"}
对$f(x, y) = x^2y + 3y$，计算$\nabla f(1, 2)$，以及在$(1, 2)$处沿$(3, 4)$方向的方向导数。
::: solution
$\nabla f = (2xy,\ x^2 + 3)$，所以$\nabla f(1, 2) = (4, 4)$。单位向量是$(3, 4)/5$，$D_{\mathbf{u}}f = (12 + 16)/5 = 28/5 = 5.6$。最速速率为$\lVert(4, 4)\rVert = 4\sqrt2\approx5.66$，只高出一点，因为$(3, 4)$已经很接近梯度方向。
:::
:::

::: exercise sigmoid 的雅可比矩阵 {level=1 check="7/16"}
sigmoid $\sigma(z) = 1/(1 + e^{-z})$满足$\sigma' = \sigma(1 - \sigma)$。把它逐元素作用在$\mathbf{z} = (0, \ln3)$上。它在那里的雅可比矩阵是什么？该雅可比矩阵的迹是多少？
::: solution
$\sigma(0) = 1/2$，$\sigma(\ln3) = 1/(1 + 1/3) = 3/4$。雅可比矩阵是对角的，$\diag\big(\tfrac12\cdot\tfrac12,\ \tfrac34\cdot\tfrac14\big) = \diag(1/4, 3/16)$，迹为$7/16$。由于$\sigma'\le1/4$，每个 sigmoid 层都把梯度至少缩小四倍——这是深层 sigmoid 网络梯度消失的经典原因。
:::
:::

::: exercise 一个交叉熵梯度 {level=1 check="exp(1)/(exp(2)+exp(1)+1)-1"}
对 logits $(2, 1, 0)$ 与目标类别$2$（即 logit $1$），给出交叉熵对 logits 的梯度。它的第二个分量是多少？
::: solution
由[[#prop-softmax-ce]]，梯度是$\mathbf{p} - \mathbf{e}_2 = (0.665,\ 0.245 - 1,\ 0.090)$，与[[#ex-ce-grad]]完全一致。第二个分量是$e/(e^2 + e + 1) - 1\approx-0.755$。
:::
:::

::: exercise 解一个二次函数 {level=2 check="1/5"}
设$f(\mathbf{x}) = \tfrac12\mathbf{x}^\top A\mathbf{x} - \mathbf{b}^\top\mathbf{x}$，其中$A = \begin{pmatrix}2&1\\1&3\end{pmatrix}$，$\mathbf{b} = (1, 2)$。求$\nabla f$以及它为零的点。该点的第一个坐标是多少？
::: solution
由[[#sec-identities]]的表（$A$对称），$\nabla f = A\mathbf{x} - \mathbf{b}$。它在$A\mathbf{x} = \mathbf{b}$处为零：由$\det A = 5$，$A^{-1} = \frac15\begin{pmatrix}3&-1\\-1&2\end{pmatrix}$，$\mathbf{x} = \frac15(3 - 2,\ -1 + 4) = (0.2, 0.6)$。由于$A$正定（特征值$(5\pm\sqrt5)/2 > 0$），这是唯一的最小值点。第一个坐标是$1/5$。
:::
:::

::: exercise 训练的代价 {level=2 check="6"}
用[[#prop-linear-grad]]，数一批线性层$Y = XW^\top$（$X\in\R^{N\times n}$，$W\in\R^{m\times n}$）前向与反向传播的 FLOPs。一个训练步对每个权重每个样本要花费多少次 FLOPs？对一个网络的第一层，反向传播中的哪个乘积可以省掉？
::: solution
前向：$XW^\top$是$(N\times n)(n\times m)$，$2Nmn$次 FLOPs。反向：$\partial\mathcal{L}/\partial W = \Delta^\top X$是$(m\times N)(N\times n)$，$2Nmn$；$\partial\mathcal{L}/\partial X = \Delta W$是$(N\times m)(m\times n)$，$2Nmn$。合计$6Nmn$，即每个权重每个样本（词元）$6$次 FLOPs，而推理是$2$次。第一层不需要对输入的梯度（输入是数据，不是参数），所以$\Delta W$可以省掉——在一个深网络里这点节省无足轻重。
:::
:::

::: exercise log-sum-exp {level=2}
设$g(\mathbf{x}) = \log\sum_{i=1}^ne^{x_i}$。证明$\nabla g = \operatorname{softmax}(\mathbf{x})$；$g$的黑塞矩阵是$\diag(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$，其中$\mathbf{p} = \operatorname{softmax}(\mathbf{x})$；以及$\max_ix_i\le g(\mathbf{x})\le\max_ix_i + \log n$。
::: solution
$\partial g/\partial x_j = e^{x_j}/\sum_ie^{x_i} = p_j$。再求一次导，由[[#prop-softmax-ce]]的第(1)部分，得$\partial p_j/\partial x_k = p_j(\delta_{jk} - p_k)$。对不等式，记$M = \max_ix_i$：$e^M\le\sum_ie^{x_i}\le ne^M$；取对数。所以 log-sum-exp 是最大值的光滑版本（所谓“softmax”其实是一个软的*argmax*），与最大值相差不超过$\log n$。黑塞矩阵半正定（它是一个协方差：$\mathbf{u}^\top H\mathbf{u}$是$u$在$\mathbf{p}$下的方差），故$g$是凸的——这也使交叉熵损失对 logits 是凸的。
:::
:::

::: exercise 二元交叉熵 {level=2}
一个二分类器输出$p = \sigma(z)$，用$\mathcal{L} = -y\log p - (1 - y)\log(1 - p)$对标签$y\in\{0, 1\}$训练。证明$\partial\mathcal{L}/\partial z = p - y$，并解释它与[[#prop-softmax-ce]]的关系。
::: solution
$\log p = -\log(1 + e^{-z})$，故$\partial\log p/\partial z = e^{-z}/(1 + e^{-z}) = 1 - p$；又$\log(1 - p) = \log p - z$，故$\partial\log(1 - p)/\partial z = (1 - p) - 1 = -p$。于是$\partial\mathcal{L}/\partial z = -y(1 - p) + (1 - y)p = p - y$。sigmoid 就是两类、logits 为$(z, 0)$的 softmax：$e^z/(e^z + 1) = \sigma(z)$，一般结果$\mathbf{p} - \mathbf{e}_y$在第一个坐标上就化为$p - y$。
:::
:::

::: exercise 差商的最佳步长 {level=3}
对光滑的$f$，泰勒定理给出中心差商的误差约为$\tfrac16\lvert f'''\rvert h^2$；把每个函数值舍入到相对精度$u$，则添上约$u\lvert f\rvert/h$的误差。对$h$最小化二者之和，并对$f = \exp$、$x = 1$、双精度（$u = 2^{-52}\approx2.2\times10^{-16}$）计算最优的$h$。与[[#ex-finite-diff]]中的表比较。
::: solution
在$x = 1$处$f = f''' = e$，总误差为$E(h) = \tfrac e6h^2 + \tfrac{ue}{h}$。由$E'(h) = \tfrac e3h - \tfrac{ue}{h^2} = 0$得$h^3 = 3u$，故$h = (3u)^{1/3}\approx(6.7\times10^{-16})^{1/3}\approx8.7\times10^{-6}$，误差$E\approx\tfrac e6(8.7\times10^{-6})^2 + 2.2\times10^{-16}e/(8.7\times10^{-6})\approx3.4\times10^{-11} + 6.9\times10^{-11}\approx1\times10^{-10}$。表中$h = 10^{-5}$给出$5.9\times10^{-11}$，与这一估计相符；$10^{-3}$（截断误差主导）与$10^{-8}$（舍入误差主导）都更差。
:::
:::

::: exercise 带偏置的梯度，用代码 {level=3}
给[[#sec-backprop]]的代码加上偏置向量$\mathbf{b}_1\in\R^2$、$\mathbf{b}_2\in\R^3$（$\mathbf{a} = W_1\mathbf{x} + \mathbf{b}_1$，$\mathbf{z} = W_2\mathbf{h} + \mathbf{b}_2$），取$\mathbf{b}_1 = (1.5, 0)$、$\mathbf{b}_2 = \mathbf{0}$，报告对$\mathbf{b}_1$与$\mathbf{b}_2$的梯度。为什么第一个单元现在能学习了？
::: solution
由[[#eq-linear-grad]]，偏置的梯度就是上游梯度本身：$\partial\mathcal{L}/\partial\mathbf{b}_2 = \boldsymbol{\delta}_z$，$\partial\mathcal{L}/\partial\mathbf{b}_1 = \boldsymbol{\delta}_a$。

```python
import math

def grads(W1, b1, W2, b2, x, y):
    a = [sum(W1[i][j] * x[j] for j in range(2)) + b1[i] for i in range(2)]  # (2,)
    h = [max(0.0, ai) for ai in a]                                          # (2,)
    z = [sum(W2[k][i] * h[i] for i in range(2)) + b2[k] for k in range(3)]  # (3,)
    m = max(z); s = sum(math.exp(v - m) for v in z)
    p = [math.exp(v - m) / s for v in z]                                    # (3,)
    dz = [p[k] - (k == y) for k in range(3)]                                # dL/db2
    dh = [sum(W2[k][i] * dz[k] for k in range(3)) for i in range(2)]
    da = [dh[i] * (a[i] > 0) for i in range(2)]                             # dL/db1
    return -math.log(p[y]), da, dz

W1 = [[1.0, -1.0], [0.5, 1.0]]; W2 = [[0.4, 0.2], [-0.2, 0.4], [0.3, -0.2]]
loss, db1, db2 = grads(W1, [1.5, 0.0], W2, [0.0, 0.0, 0.0], [1.0, 2.0], 0)
print(round(loss, 4), [round(g, 4) for g in db1], [round(g, 4) for g in db2])
```

```text
0.9444 [-0.2986, 0.0406] [-0.6111, 0.475, 0.1361]
```

由于$b_{1,1} = 1.5$，第一个预激活是$a_1 = -1 + 1.5 = 0.5 > 0$，第一个单元活跃，它的 ReLU 门开着，$W_1$的第一行和$b_{1,1}$都收到了梯度。损失也更低（$0.944$而不是$1.104$），因为活跃的第一个单元抬高了正确的 logit。
:::
:::
