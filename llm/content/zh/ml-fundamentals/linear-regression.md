线性回归是至今仍每天在用的最古老的学习算法，也是把[[ml-fundamentals/learning-problem]]的每一个思想都看个明白、毫无遮掩的最佳场所。假设空间是线性函数的集合，损失是平方误差，经验风险最小化有一个由线性方程组给出的精确解，即**正规方程**。对这个解的三种解读——几何的（正交投影）、概率的（高斯（Gauss）噪声下的最大似然）与贝叶斯的（配上高斯先验便得到**岭回归**）——贯穿机器学习的始终。而且，由于同一个目标函数也能用梯度下降来极小化，线性回归还是展示步长与数据形状如何支配优化的最干净的例子。

神经网络的几乎每一层——包括 Transformer 内部的投影——都是一个线性映射后面再接别的东西；回归网络的最后一层*就是*在学得的特征上做线性回归（[[ml-fundamentals/representations]]）。这里用到的线性代数——矩阵乘积、秩、正交投影、对称矩阵的特征值——在[[math-for-ml/vectors-matrices]]与[[math-for-ml/matrix-decompositions]]中；数学图谱的[最小二乘](/learn/maths/lesson.php?c=linear-algebra&l=least-squares)一课对几何着墨更多；它的[回归](/learn/maths/lesson.php?c=statistics&l=regression)一课涵盖经典统计的内容。

## 模型 {#sec-model}

每个样例有$d$个实值**特征**$x_1, \dots, x_d$——建筑面积、房间数、到车站的距离——收在向量$\mathbf{x}\in\R^d$里，还有一个实标签$y$。

::: definition 线性回归模型 {#def-linear-model}
带**权重**$\mathbf{w}\in\R^d$与**截距**（或偏置）$b\in\R$的**线性预测器**为

$$
h(\mathbf{x}) = \mathbf{w}^\top\mathbf{x} + b = w_1x_1 + \dots + w_dx_d + b.
$$

对$n$个样例，**设计矩阵**$X\in\R^{n\times p}$以特征向量为行，标签构成$\mathbf{y}\in\R^n$。截距可以通过给每一行添上首元素$1$来吸收，于是$p = d + 1$，$\boldsymbol\beta = (b, w_1, \dots, w_d)^\top\in\R^p$，预测向量为$X\boldsymbol\beta$。
:::

模型是“线性”的，含义很精确：预测对**参数**$\boldsymbol\beta$是线性的。特征本身可以是原始输入的任意固定函数——$x$、$x^2$与$\sin x$，或价格的对数，或类别的示性变量——模型仍是线性回归。[[#sec-basis]]中会回到这种自由。

::: definition 最小二乘 {#def-least-squares}
**最小二乘**估计极小化平方损失下的经验风险，

$$
\mathcal{L}(\boldsymbol\beta) = \frac1n\sum_{i=1}^n\big(y_i - \mathbf{x}_i^\top\boldsymbol\beta\big)^2 = \frac1n\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2,
$$ {#eq-mse}

即**均方误差**（MSE）。向量$\mathbf{r} = \mathbf{y} - X\boldsymbol\beta$是**残差**向量，$\operatorname{RSS} = \lVert\mathbf{r}\rVert^2$是**残差平方和**。
:::

为什么用平方？会出现三个答案：平方使问题成为一个有封闭形式极小点的二次函数；当噪声是高斯的时候它是正确的损失（[[#sec-probabilistic]]）；而平方损失下使风险最小的预测器是条件均值$\E[y\mid\mathbf{x}]$（[[ml-fundamentals/learning-problem#prop-bayes]]），所以最小二乘估计的是条件均值的最佳线性逼近。代价是对离群点敏感：一个残差为$10$的异常点的贡献，抵得上一百个残差为$1$的点。

## 正规方程 {#sec-normal}

::: theorem 正规方程 {#thm-normal}
$\mathcal{L}$是$\boldsymbol\beta$的凸二次函数，梯度为

$$
\nabla\mathcal{L}(\boldsymbol\beta) = \frac2nX^\top(X\boldsymbol\beta - \mathbf{y}).
$$ {#eq-grad}

向量$\hat{\boldsymbol\beta}$极小化$\mathcal{L}$当且仅当它满足**正规方程**

$$
X^\top X\,\hat{\boldsymbol\beta} = X^\top\mathbf{y}.
$$ {#eq-normal}

解总是存在。若$X$列满秩$p$（这要求$n\ge p$），则$X^\top X$可逆，极小点唯一：$\hat{\boldsymbol\beta} = (X^\top X)^{-1}X^\top\mathbf{y}$。
:::

::: proof
展开$n\mathcal{L}(\boldsymbol\beta) = \mathbf{y}^\top\mathbf{y} - 2\boldsymbol\beta^\top X^\top\mathbf{y} + \boldsymbol\beta^\top X^\top X\boldsymbol\beta$。由线性型与二次型的梯度法则（[[math-for-ml/gradients]]），梯度是$\frac1n(-2X^\top\mathbf{y} + 2X^\top X\boldsymbol\beta)$，即[[#eq-grad]]。黑塞矩阵是$\frac2nX^\top X$，而$\mathbf{v}^\top X^\top X\mathbf{v} = \lVert X\mathbf{v}\rVert^2\ge0$，所以它半正定、$\mathcal{L}$是凸的；对可微凸函数，极小点恰是梯度为零的点（[[math-for-ml/optimisation#prop-convex]]），这就是[[#eq-normal]]。

关于存在性，一个直接的论证说明得更多。列空间$\operatorname{col}(X)$是$\R^n$的子空间，因此对某个$\hat{\boldsymbol\beta}$，$\mathbf{y}$在它上面有正交投影$\hat{\mathbf{y}} = X\hat{\boldsymbol\beta}$，且$\mathbf{y} - \hat{\mathbf{y}}$与每一列正交：$X^\top(\mathbf{y} - X\hat{\boldsymbol\beta}) = \mathbf{0}$，这正是[[#eq-normal]]。对任意$\boldsymbol\beta$，向量$X(\hat{\boldsymbol\beta} - \boldsymbol\beta)$属于$\operatorname{col}(X)$，故由勾股定理

$$
\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2 = \lVert\mathbf{y} - X\hat{\boldsymbol\beta}\rVert^2 + \lVert X(\hat{\boldsymbol\beta} - \boldsymbol\beta)\rVert^2\ \ge\ \lVert\mathbf{y} - X\hat{\boldsymbol\beta}\rVert^2.
$$

最后，若$X$列满秩，则$X\mathbf{v} = \mathbf{0}$仅当$\mathbf{v} = \mathbf{0}$，于是$\mathbf{v}\ne\mathbf{0}$时$\mathbf{v}^\top X^\top X\mathbf{v} = \lVert X\mathbf{v}\rVert^2 > 0$：$X^\top X$正定，从而可逆，[[#eq-normal]]恰有一个解。
:::

证明里包含着值得记住的几何图景。拟合值$\hat{\mathbf{y}} = X\hat{\boldsymbol\beta}$是列空间中离$\mathbf{y}$最近的点，而残差向量与这个空间垂直。

::: proposition 投影与残差 {#prop-projection}
若$X$列满秩，则$\hat{\mathbf{y}} = P\mathbf{y}$，其中**帽子矩阵**$P = X(X^\top X)^{-1}X^\top$对称且满足$P^2 = P$：它就是到$\operatorname{col}(X)$上的正交投影。残差与$X$的每一列正交。特别地，若模型带截距，残差之和为零，且拟合的超平面经过均值点$(\bar{\mathbf{x}}, \bar y)$。
:::

::: proof
因为$X^\top X$对称，$P^\top = X(X^\top X)^{-1}X^\top = P$，且$P^2 = X(X^\top X)^{-1}X^\top X(X^\top X)^{-1}X^\top = P$。残差的正交性就是[[#eq-normal]]改写成$X^\top\mathbf{r} = \mathbf{0}$。有截距时，$X$有一列全为$1$，它与$\mathbf{r}$的内积为$\sum_ir_i = 0$。把$\sum_i(y_i - \hat b - \hat{\mathbf{w}}^\top\mathbf{x}_i) = 0$除以$n$，得$\bar y = \hat b + \hat{\mathbf{w}}^\top\bar{\mathbf{x}}$。
:::

只有一个特征时，正规方程可以手算。记$S_{xx} = \sum_i(x_i - \bar x)^2$与$S_{xy} = \sum_i(x_i - \bar x)(y_i - \bar y)$，解为

$$
\hat w = \frac{S_{xy}}{S_{xx}},\qquad\hat b = \bar y - \hat w\bar x,
$$ {#eq-simple}

即$x$与$y$的样本协方差除以$x$的样本方差（习题7给出推导）。

::: example 三个点的手算 {#ex-three-points}
用解正规方程的方法给三个点$(1, 2)$、$(2, 3)$、$(3, 5)$拟合$y = b + wx$，并验证[[#prop-projection]]。
::: solution
以$(1, x_i)$为行，

$$
X^\top X = \begin{pmatrix}3 & 6\\ 6 & 14\end{pmatrix},\qquad X^\top\mathbf{y} = \begin{pmatrix}2 + 3 + 5\\ 2 + 6 + 15\end{pmatrix} = \begin{pmatrix}10\\ 23\end{pmatrix}.
$$

行列式为$42 - 36 = 6$，故$\hat b = (14\cdot10 - 6\cdot23)/6 = 2/6 = 1/3$，$\hat w = (3\cdot23 - 6\cdot10)/6 = 9/6 = 3/2$。公式[[#eq-simple]]结果一致：$\bar x = 2$，$\bar y = 10/3$，$S_{xy} = (-1)(-4/3) + 0 + (1)(5/3) = 3$，$S_{xx} = 2$，故$\hat w = 3/2$，$\hat b = 10/3 - 3 = 1/3$。

拟合值为$1.833, 3.333, 4.833$；残差$1/6, -1/3, 1/6$之和为零，且与$(1, 2, 3)$正交：$1/6 - 2/3 + 1/2 = 0$。残差平方和为$1/36 + 1/9 + 1/36 = 1/6$。
:::
:::

::: widget regression
points: 1,2; 2,3; 3,5
degree: 1
residuals: true
x: 0, 4
y: 0, 7
caption: [[#ex-three-points]]的三个点及其最小二乘直线$y = \tfrac13 + \tfrac32x$，并画出残差。拖动一个点：直线会移动以保持残差与列$(1, 1, 1)$和$(x_1, x_2, x_3)$正交——所以它们总是和为零——且直线总是经过均值点。把一个点拖得很远，看看单个离群点对平方误差拟合的拉力有多大。
:::

拟合得好不好？残差平方和依赖于$y$的单位；一个与尺度无关的汇总量，是把它与$y$绕其均值的波动相比。

::: definition 决定系数 {#def-r2}
对带截距的最小二乘拟合，**总平方和**为$\operatorname{TSS} = \sum_i(y_i - \bar y)^2$，**决定系数**为

$$
R^2 = 1 - \frac{\operatorname{RSS}}{\operatorname{TSS}},
$$

即模型解释了样本中$y$的波动的多大比例。在训练数据上它落在$[0, 1]$内，因为预测常数$\bar y$也是可选模型之一。
:::

在[[#ex-three-points]]中，$\operatorname{TSS} = 16/9 + 1/9 + 25/9 = 14/3$，故$R^2 = 1 - (1/6)/(14/3) = 27/28\approx0.964$。两个提醒。增加一个特征绝不会降低训练数据上的$R^2$——旧模型仍然可选——所以训练$R^2$高并不是好模型的证据（[[ml-fundamentals/generalisation]]）。而在新的数据上，$R^2$可以为负，当模型预测得还不如均值时。

## 概率视角 {#sec-probabilistic}

上面选择最小二乘只是因为方便。数据的概率模型说明它何时还是*对的*，并让我们能说清估计有多大不确定性。

::: proposition 最小二乘就是最大似然 {#prop-mle}
设$y_i = \mathbf{x}_i^\top\boldsymbol\beta + \varepsilon_i$，噪声$\varepsilon_i\sim\Normal(0, \sigma^2)$独立同分布。则$\boldsymbol\beta$的最大似然估计就是最小二乘估计，无论$\sigma$是多少；而噪声方差的最大似然估计是均方残差，$\hat\sigma^2 = \operatorname{RSS}/n$。
:::

::: proof
对数似然为$-\frac n2\log(2\pi\sigma^2) - \frac1{2\sigma^2}\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2$。对每个固定的$\sigma^2$，它关于$\boldsymbol\beta$的最大化就是平方和的最小化，而极小点不依赖于$\sigma^2$。再对$\sigma^2$最大化结果，得$\hat\sigma^2 = \operatorname{RSS}/n$；这就是[[math-for-ml/estimation#prop-gaussian-mle]]及其关于未知噪声的习题。
:::

这个模型还告诉我们，换一份样本，估计会变化多少。固定设计$X$，只让噪声是随机的。

::: proposition 最小二乘估计的均值与协方差 {#prop-unbiased}
若$\mathbf{y} = X\boldsymbol\beta + \boldsymbol\varepsilon$，$X$固定且列满秩，$\E\boldsymbol\varepsilon = \mathbf{0}$，$\Cov(\boldsymbol\varepsilon) = \sigma^2I$，则

$$
\E\hat{\boldsymbol\beta} = \boldsymbol\beta,\qquad\Cov(\hat{\boldsymbol\beta}) = \sigma^2(X^\top X)^{-1}.
$$ {#eq-cov}
:::

::: proof
$\hat{\boldsymbol\beta} = (X^\top X)^{-1}X^\top(X\boldsymbol\beta + \boldsymbol\varepsilon) = \boldsymbol\beta + A\boldsymbol\varepsilon$，其中$A = (X^\top X)^{-1}X^\top$。于是$\E\hat{\boldsymbol\beta} = \boldsymbol\beta + A\,\E\boldsymbol\varepsilon = \boldsymbol\beta$，且$\Cov(\hat{\boldsymbol\beta}) = A\Cov(\boldsymbol\varepsilon)A^\top = \sigma^2(X^\top X)^{-1}X^\top X(X^\top X)^{-1} = \sigma^2(X^\top X)^{-1}$。
:::

这里不需要正态性，只需要不相关、方差恒定的噪声。在同样的假设下，**高斯-马尔可夫（Gauss–Markov）定理**（此处只陈述、不予证明；见 Hastie、Tibshirani 与 Friedman，2009，§3.2.2）说：在所有对$\mathbf{y}$*线性*的*无偏*估计量中，最小二乘的方差最小。“无偏”二字要紧：[[#sec-ridge]]放弃无偏性来降低方差，而且常常赢。

公式[[#eq-cov]]指明了估计精确性的来源。只有一个特征且带截距时，斜率的方差是$\sigma^2/S_{xx}$：输入铺得开，斜率就被钉牢；输入挤在一起，斜率就悬而不定。多个特征时，接近共线的列使$X^\top X$接近奇异，$(X^\top X)^{-1}$的某些特征值巨大，对应的系数组合几乎无法确定。

::: example 一个标准误 {#ex-se}
噪声标准差为$\sigma = 2$，输入为$x = 0, 1, \dots, 9$，各观测一次。拟合斜率的标准差是多少？在$x = 0$与$x = 9$两个输入处各做多少次观测，才能达到同样的精确度？
::: solution
$\bar x = 4.5$且$S_{xx} = \sum_{k=0}^9(k - 4.5)^2 = 82.5$，故$\operatorname{sd}(\hat w) = \sigma/\sqrt{S_{xx}} = 2/\sqrt{82.5} = 0.220$。若在两端各观测$m$次，则$S_{xx} = 2m\cdot4.5^2 = 40.5m$，取$m\approx2$即等于$82.5$：两端各两次的四个观测，就有十个均匀铺开的观测那样的精确度。把输入放得开，是估计斜率的最佳设计——*前提是*关系真是线性的，而两团点恰恰验证不了这一点。
:::
:::

## 基函数 {#sec-basis}

因为模型对参数是线性的，特征完全可以是原始输入的非线性函数。选取**基函数**$\phi_1, \dots, \phi_p$，对$\boldsymbol\phi(x) = (\phi_1(x), \dots, \phi_p(x))$做回归：设计矩阵的元素为$\Phi_{ij} = \phi_j(x_i)$，上面的一切原样适用。取$\phi_j(x) = x^{j-1}$，这就是$p - 1$次**多项式回归**。

::: example 多项式特征 {#ex-polynomial}
给四个点$(-1, 2)$、$(0, 1)$、$(1, 2)$、$(2, 6)$拟合二次函数$y = \beta_0 + \beta_1x + \beta_2x^2$。
::: solution
$\Phi$的行为$(1, x, x^2)$：$(1, -1, 1)$、$(1, 0, 0)$、$(1, 1, 1)$、$(1, 2, 4)$。于是

$$
\Phi^\top\Phi = \begin{pmatrix}4 & 2 & 6\\ 2 & 6 & 8\\ 6 & 8 & 18\end{pmatrix},\qquad\Phi^\top\mathbf{y} = \begin{pmatrix}11\\ 12\\ 28\end{pmatrix},
$$

解出$\hat{\boldsymbol\beta} = (17/20, 1/20, 5/4) = (0.85, 0.05, 1.25)$。残差为$-0.05, 0.15, -0.15, 0.05$，平方和为$0.05$。三次多项式四个参数配四个点，会精确拟合它们——而[[ml-fundamentals/generalisation]]解释了为什么这不算改进。
:::
:::

基函数是贯穿本课程的一个思想的第一个实例：一个线性方法配上选得好的特征，就能表示非常非线性的函数。手工挑选特征叫**特征工程**；用内积取代显式特征得到**核**；从数据中学习特征正是神经网络在做的事（[[ml-fundamentals/representations]]）。

## 岭回归 {#sec-ridge}

特征很多或接近共线时，$X^\top X$奇异或性态极差，最小二乘解不唯一或剧烈波动，系数还可能巨大得离谱——在两个几乎相同的特征上一正一负的大权重，在训练数据上恰好抵消。Hoerl 与 Kennard（1970）提出的办法是惩罚大权重。

::: definition 岭回归 {#def-ridge}
对$\lambda > 0$，**岭**估计极小化

$$
\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2 + \lambda\lVert\boldsymbol\beta\rVert^2,
$$

并由下式给出

$$
\hat{\boldsymbol\beta}_\lambda = (X^\top X + \lambda I)^{-1}X^\top\mathbf{y}.
$$ {#eq-ridge}
:::

这个公式由令梯度$2X^\top(X\boldsymbol\beta - \mathbf{y}) + 2\lambda\boldsymbol\beta$为零得到。矩阵$X^\top X + \lambda I$总是可逆的，因为$\mathbf{v}\ne\mathbf{0}$时$\mathbf{v}^\top(X^\top X + \lambda I)\mathbf{v} = \lVert X\mathbf{v}\rVert^2 + \lambda\lVert\mathbf{v}\rVert^2 > 0$，所以即使$p > n$岭回归也有唯一解。$\lambda\to0$时它趋于最小二乘（不唯一时取极小范数解）；$\lambda\to\infty$时权重缩为零。实践中截距不惩罚——把所有标签平移一个常数应当平移预测，而不是改变斜率——做法是先把特征与标签中心化，或者在$\lambda I$中略去截距对应的对角元。

这个惩罚项看起来像工程上的修补，却有一个有原则的解读：它是一条权重应当很小的先验信念。

::: proposition 岭回归是 MAP 估计 {#prop-ridge-map}
设$\mathbf{y}\mid\boldsymbol\beta\sim\Normal(X\boldsymbol\beta, \sigma^2I)$，先验为$\boldsymbol\beta\sim\Normal(\mathbf{0}, \tau^2I)$。则后验是高斯的，其众数（也是均值）是取$\lambda = \sigma^2/\tau^2$的岭估计。
:::

::: proof
由贝叶斯公式，对数后验在对数似然上加对数先验，再差一个常数：

$$
\log p(\boldsymbol\beta\mid\mathbf{y}) = -\frac1{2\sigma^2}\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2 - \frac1{2\tau^2}\lVert\boldsymbol\beta\rVert^2 + \text{const} = -\frac1{2\sigma^2}\Big(\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2 + \frac{\sigma^2}{\tau^2}\lVert\boldsymbol\beta\rVert^2\Big) + \text{const}.
$$

最大化它就等价于以$\lambda = \sigma^2/\tau^2$极小化岭目标。指数部分是$\boldsymbol\beta$的二次函数，二次项负定，故后验是高斯的；高斯分布的众数等于均值。
:::

这就是回归设定下的[[math-for-ml/estimation#prop-weight-decay]]。它教我们怎么想$\lambda$：数据噪声大（$\sigma$大）或先验把握足（$\tau$小），都要求更强的收缩。实际上$\sigma$与$\tau$都不知道，$\lambda$由验证集挑选（[[ml-fundamentals/generalisation#sec-cv]]）；[[ml-fundamentals/regularisation]]研究会惩罚在特征空间各个方向上的作用，以及它与神经网络中的早停和权重衰减的关系。

::: example 中心化数据上的岭回归 {#ex-ridge}
把[[#ex-three-points]]的数据中心化，再用$\lambda = 1$的岭回归拟合斜率（截距不惩罚）。
::: solution
中心化后$x = -1, 0, 1$，$y = -4/3, -1/3, 5/3$。只有一个中心化特征时，[[#eq-ridge]]化为$\hat w_\lambda = \sum_ix_iy_i/(\sum_ix_i^2 + \lambda) = 3/(2 + 1) = 1$，而最小二乘斜率是$3/2$。截距按原坐标为$\bar y - \hat w_\lambda\bar x = 10/3 - 2 = 4/3$。斜率按因子$S_{xx}/(S_{xx} + \lambda) = 2/3$收缩了：只有三个点时惩罚很强，若有三百个点就无关紧要了。
:::
:::

## 用梯度下降拟合 {#sec-gd}

正规方程组造出$X^\top X$要花费$O(np^2)$次运算，解出要$O(p^3)$次，对几千个特征没问题，对几百万个就不行了，而且它推广不到其他损失。**梯度下降**（[[math-for-ml/optimisation]]）只需要梯度[[#eq-grad]]：

$$
\boldsymbol\beta_{t+1} = \boldsymbol\beta_t - \eta\,\frac2nX^\top(X\boldsymbol\beta_t - \mathbf{y}).
$$

每步代价是$O(np)$：一趟算预测，一趟把残差乘回去。**随机**梯度下降把整体平均换成随机小批量，所有大模型都是这么训练的；对线性回归、每步一个样例，它就是 Widrow 与 Hoff（1960）的最小均方（LMS）规则。

::: proposition 最小二乘上的梯度下降 {#prop-gd}
设$H = \frac2nX^\top X$为$\mathcal{L}$的黑塞矩阵，其特征值为$0\le\mu_{\min}\le\dots\le\mu_{\max}$，$\hat{\boldsymbol\beta}$为一个极小点。则

$$
\boldsymbol\beta_{t+1} - \hat{\boldsymbol\beta} = (I - \eta H)(\boldsymbol\beta_t - \hat{\boldsymbol\beta}).
$$

若$\mu_{\min} > 0$且$0 < \eta < 2/\mu_{\max}$，迭代收敛到$\hat{\boldsymbol\beta}$，且误差沿特征值$\mu$的特征向量的分量每步乘以$1 - \eta\mu$。若$\eta > 2/\mu_{\max}$，迭代从几乎每个初始点都发散。
:::

::: proof
由$X^\top X\hat{\boldsymbol\beta} = X^\top\mathbf{y}$，梯度为$\frac2nX^\top X(\boldsymbol\beta_t - \hat{\boldsymbol\beta}) = H(\boldsymbol\beta_t - \hat{\boldsymbol\beta})$，于是得到递推。$H$对称，所以在它的特征向量构成的标准正交基下（[[math-for-ml/matrix-decompositions#thm-spectral]]），递推逐坐标解耦：误差的每个坐标都乘以$1 - \eta\mu$。所有这些因子的绝对值都小于$1$，当且仅当每个特征值都满足$0 < \eta\mu < 2$，即（在$\mu_{\min} > 0$的前提下）$\eta < 2/\mu_{\max}$。若$\eta\mu_{\max} > 2$，最大特征向量的因子绝对值超过$1$，该分量就会增长，除非它恰好从零开始。这就是[[math-for-ml/optimisation#prop-quadratic]]作用于最小二乘二次函数。
:::

最慢的分量每步缩小$1 - \eta\mu_{\min}$，取最大的稳定步长$\eta\approx1/\mu_{\max}$时约为$1 - 1/\kappa$，其中$\kappa = \mu_{\max}/\mu_{\min}$是$X^\top X$的**条件数**。尺度相差悬殊或强相关的特征会使$\kappa$很大、梯度下降很慢。**标准化**每个特征——减去均值、除以标准差——是最便宜的解药，习题9表明仅仅中心化就能大幅压低$\kappa$。

::: example 三个点的步长 {#ex-gd}
对[[#ex-three-points]]的数据，求最大的稳定学习率，以及$\eta = 0.15$时最慢方向的收敛因子。
::: solution
$H = \frac23X^\top X = \begin{pmatrix}2 & 4\\ 4 & 28/3\end{pmatrix}$，迹为$34/3$，行列式为$56/3 - 16 = 8/3$。特征值满足$\mu^2 - \frac{34}3\mu + \frac83 = 0$：$\mu_{\max}\approx11.09$，$\mu_{\min}\approx0.240$，故$\kappa\approx46$。最大稳定学习率为$2/11.09\approx0.180$。$\eta = 0.15$时，最慢方向每步缩小$1 - 0.15\cdot0.240 = 0.964$：$30$步后该方向上初始误差还剩$0.964^{30}\approx0.33$，而快方向（因子$1 - 0.15\cdot11.09 = -0.66$）早已消亡，一路振荡变号。
:::
:::

::: widget gradientdescent
f: (38 + 3x^2 + 14y^2 - 20x - 46y + 12x*y)/3
start: 2.5, 0
rate: 0.15
steps: 30
x: -1, 3
y: -1, 3
caption: [[#ex-three-points]]的均方误差作为截距（$x$轴）与斜率（$y$轴）的函数，最小值在$(1/3, 3/2)$。细长狭窄的山谷就是[[#ex-gd]]中$\kappa\approx46$的条件数：梯度下降很快到达谷底，然后沿谷底爬行。把学习率提高到大约$0.18$以上，迭代就横着之字形穿越山谷并发散；试试牛顿法，它利用黑塞矩阵，一步就落到最小值上。
:::

::: quiz
对一个最小二乘问题做梯度下降，能收敛，但非常慢。哪种改动最可能在不改变解的前提下帮忙？
- [ ] 把步长加倍直到损失爆炸，再取一半
- [x] 拟合之前把特征标准化为零均值、单位方差
- [ ] 往设计矩阵里加一列 $1$
- [ ] 把平方损失换成绝对值损失
::: solution
收敛慢来自$X^\top X$的大条件数（[[#prop-gd]]）。标准化特征通常能大幅压低它，而且拟合的预测不变：缩放一个特征只是缩放它的权重；带截距时，平移一个特征只改变截距。步长超过$2/\mu_{\max}$就无能为力；加一列常数是截距所需，但特征不中心化时反而恶化条件数；换损失则换了问题。
:::
:::

## 一个完整的实现 {#sec-code}

下面的清单用三种方法给$100$个合成点拟合一个两特征加截距的模型，真系数为$(1, 2, -3)$，噪声标准差$0.5$：用高斯消元解正规方程；用梯度下降；以及取三个$\lambda$值的岭回归。只使用 Python 标准库；用 NumPy 的话，`np.linalg.lstsq(X, y)`一行就能完成第一部分，而且更稳定。

```python
import random, math

rng = random.Random(1)
n, sigma = 100, 0.5
w_true = [1.0, 2.0, -3.0]                       # 截距、两个斜率

X = [[1.0, rng.random(), rng.random()] for _ in range(n)]          # (n, 3)，第一列 = 1
y = [sum(a * b for a, b in zip(row, w_true)) + rng.gauss(0, sigma) for row in X]

def solve(A, b):
    """Solve A x = b by Gaussian elimination with partial pivoting."""
    m = len(A)
    M = [row[:] + [bi] for row, bi in zip(A, b)]
    for k in range(m):
        p = max(range(k, m), key=lambda i: abs(M[i][k]))
        M[k], M[p] = M[p], M[k]
        for i in range(k + 1, m):
            f = M[i][k] / M[k][k]
            for j in range(k, m + 1):
                M[i][j] -= f * M[k][j]
    x = [0.0] * m
    for k in reversed(range(m)):
        x[k] = (M[k][m] - sum(M[k][j] * x[j] for j in range(k + 1, m))) / M[k][k]
    return x

def gram(X):                                    # X^T X，形状 (3, 3)
    d = len(X[0])
    return [[sum(r[i] * r[j] for r in X) for j in range(d)] for i in range(d)]

def xty(X, y):                                  # X^T y，形状 (3,)
    return [sum(r[i] * yi for r, yi in zip(X, y)) for i in range(len(X[0]))]

def predict(X, w):
    return [sum(a * b for a, b in zip(r, w)) for r in X]

# 1. 正规方程
w_ols = solve(gram(X), xty(X, y))
res = [yi - fi for yi, fi in zip(y, predict(X, w_ols))]
rss = sum(r * r for r in res)
ybar = sum(y) / n
r2 = 1 - rss / sum((yi - ybar) ** 2 for yi in y)
print("OLS  w =", [round(v, 3) for v in w_ols], " R^2 =", round(r2, 3),
      " sigma_hat =", round(math.sqrt(rss / n), 3))

# 2. 对均方误差做梯度下降，从 w = 0 出发
w, eta = [0.0, 0.0, 0.0], 0.5
for t in range(1, 5001):
    r = [fi - yi for fi, yi in zip(predict(X, w), y)]            # 残差 (n,)
    g = [2 / n * sum(ri * row[j] for ri, row in zip(r, X)) for j in range(3)]
    w = [wj - eta * gj for wj, gj in zip(w, g)]
    if t in (10, 100, 1000, 5000):
        print(f"GD step {t:4d}  w =", [round(v, 3) for v in w])

# 3. 岭回归（不惩罚截距）：(X^T X + lam * D) w = X^T y，D = diag(0, 1, 1)
for lam in (1.0, 10.0, 100.0):
    G = gram(X)
    for j in (1, 2):
        G[j][j] += lam
    print(f"ridge lam={lam:5.1f}  w =", [round(v, 3) for v in solve(G, xty(X, y))])
```

```text
OLS  w = [1.134, 2.128, -3.157]  R^2 = 0.827  sigma_hat = 0.477
GD step   10  w = [0.663, 1.345, -1.504]
GD step  100  w = [1.131, 2.129, -3.152]
GD step 1000  w = [1.134, 2.128, -3.157]
GD step 5000  w = [1.134, 2.128, -3.157]
ridge lam=  1.0  w = [1.062, 1.885, -2.779]
ridge lam= 10.0  w = [0.801, 0.932, -1.337]
ridge lam=100.0  w = [0.615, 0.154, -0.216]
```

最小二乘估计与真值相差约$0.16$，与这一设计下[[#eq-cov]]的预言相符，$\hat\sigma = 0.477$也接近$0.5$（略偏低，正如最大似然方差估计应得的：它除以$n$而不是$n - p$）。这一设计的黑塞矩阵$H$的特征值从约$0.11$到$3.0$，所以$\eta = 0.5$是稳定的（$< 2/3.0$），最慢的误差分量每步约缩小$1 - 0.5\cdot0.11 = 0.94$：$100$步后梯度下降与精确解已吻合到小数点后两位，$1000$步后吻合到所有显示位数。岭回归随$\lambda$增大把斜率向零收缩，而不被惩罚的截距朝$\bar y$移动以作补偿。

::: warning 系数不是重要性，更不是原因
人们很想把$\hat w_j$读成“$x_j$有多重要”。但系数取决于它的特征的单位（面积改用平方厘米度量，它的权重立刻缩小$10^4$倍）、取决于模型里还有哪些其他特征（有两个近乎重复的特征时，权重可以按任何比例摊在它们身上），也取决于数据的抽样。最重要的是，它描述的是数据中的关联，而不是*干预*$x_j$的效果：房价对卫生间数量正回归，部分是因为大房子两样都多。因果结论需要实验设计或明确的因果假设，而不是回归表。
:::

::: history
勒让德（Legendre）1805年发表了最小二乘法，作为彗星轨道附录的一部分；高斯（Gauss）声称自1795年起就在使用它，并于1809年假设误差服从正态分布而给出概率论证——即[[#prop-mle]]的论证——又在1821–23年证明了如今以他与马尔可夫（Markov）命名的最优化结果。“回归”一词源自高尔顿（Galton）对遗传的研究（1886）：异常高大的父母的孩子平均矮于父母，他们的身高“回归”到均值。吉洪诺夫（Tikhonov）对不适定问题的正则化（1943，1963）以及 Arthur Hoerl 与 Robert Kennard 的岭回归（1970）添上了二次惩罚。Widrow 与 Hoff 的最小均方规则（1960）逐个样例地拟合线性模型——平方损失上的随机梯度下降——用于自适应滤波器与 ADALINE 神经元。
:::

::: summary
- 线性回归预测$\mathbf{x}^\top\boldsymbol\beta$，对参数是线性的；特征可以是输入的任意固定函数（基函数）。
- 最小二乘极小化$\frac1n\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2$，一个凸二次函数。它的极小点满足**正规方程**$X^\top X\boldsymbol\beta = X^\top\mathbf{y}$，$X$列满秩时解唯一。
- 几何上，拟合值是$\mathbf{y}$到列空间的正交投影；残差与每个特征正交，带截距时和为零。
- 高斯噪声下最小二乘就是最大似然；估计无偏，协方差为$\sigma^2(X^\top X)^{-1}$，所以铺开、不相关的特征给出精确的估计。
- **岭回归**$(X^\top X + \lambda I)^{-1}X^\top\mathbf{y}$总有唯一解，是高斯先验下的 MAP 估计，$\lambda = \sigma^2/\tau^2$。
- 梯度下降在$\eta < 2/\mu_{\max}$时收敛，速率由$X^\top X$的条件数决定；标准化特征能让它变快。
:::

## 习题

::: exercise 用公式求斜率 {level=1 check="5/2"}
用[[#eq-simple]]给三个点$(0, 1)$、$(1, 2)$、$(2, 6)$拟合$y = b + wx$。$\hat w$是多少？
::: solution
$\bar x = 1$，$\bar y = 3$，$S_{xy} = (-1)(-2) + 0\cdot(-1) + (1)(3) = 5$，$S_{xx} = 2$，故$\hat w = 5/2$，$\hat b = 3 - 5/2 = 1/2$。
:::
:::

::: exercise 它的决定系数 {level=1 check="25/28"}
对上一题的拟合，计算残差、RSS、TSS 与 $R^2$。
::: solution
拟合值为$0.5, 3, 5.5$，残差为$0.5, -1, 0.5$（必然和为零），$\operatorname{RSS} = 0.25 + 1 + 0.25 = 1.5$。$\operatorname{TSS} = 4 + 1 + 9 = 14$。故$R^2 = 1 - 1.5/14 = 25/28\approx0.893$。
:::
:::

::: exercise 一维岭回归 {level=1 check="11/6"}
不带截距，用$\lambda = 1$的岭回归给两个点$(1, 2)$、$(2, 4.5)$拟合$y = wx$。$\hat w_\lambda$是多少？最小二乘斜率又是多少？
::: solution
只有一个特征、没有截距时，[[#eq-ridge]]给出$\hat w_\lambda = \sum x_iy_i/(\sum x_i^2 + \lambda) = (2 + 9)/(5 + 1) = 11/6\approx1.833$。最小二乘斜率为$11/5 = 2.2$。
:::
:::

::: exercise 最大的稳定学习率 {level=2 check="3/14"}
梯度下降在输入$x = 1, 2, 3$上极小化$\frac1n\sum_i(y_i - wx_i)^2$（一个权重，无截距）。学习率超过多少就发散？
::: solution
黑塞矩阵是二阶导数$\frac2n\sum_ix_i^2 = \frac23\cdot14 = 28/3$。由[[#prop-gd]]，$\eta < 2/(28/3) = 3/14\approx0.214$时迭代收敛，超过就发散。取$\eta = 3/28$（极限的一半）时一步收敛，因为此时$1 - \eta\mu = 0$。
:::
:::

::: exercise 先验的强度 {level=2 check="1/16"}
测量带有标准差$\sigma = 0.5$的高斯噪声，先验经验提示系数大致服从$\Normal(0, 2^2)$。岭惩罚$\lambda$（对目标$\lVert\mathbf{y} - X\boldsymbol\beta\rVert^2 + \lambda\lVert\boldsymbol\beta\rVert^2$）取多少给出 MAP 估计？
::: solution
由[[#prop-ridge-map]]，$\lambda = \sigma^2/\tau^2 = 0.25/4 = 1/16$。若目标是*均方*误差加$\lambda'\lVert\boldsymbol\beta\rVert^2$，对应的值就是$\lambda' = \lambda/n$，随数据增多而缩小。
:::
:::

::: exercise 斜率的精确度 {level=2 check="1/sqrt(10)"}
在$x = -2, -1, 0, 1, 2$处各观测一次，噪声独立、标准差$\sigma = 1$。最小二乘斜率的标准差是多少？
::: solution
带截距时，[[#eq-cov]]给出$\Var(\hat w) = \sigma^2/S_{xx}$，其中$S_{xx} = 4 + 1 + 0 + 1 + 4 = 10$。故$\operatorname{sd}(\hat w) = 1/\sqrt{10}\approx0.316$。（这里$\bar x = 0$，于是$X^\top X = \operatorname{diag}(5, 10)$，截距与斜率的估计不相关。）
:::
:::

::: exercise 简单回归 {level=2}
一般地解$y = b + wx$的正规方程，推出[[#eq-simple]]。
::: solution
以$(1, x_i)$为行，正规方程是$nb + w\sum x_i = \sum y_i$与$b\sum x_i + w\sum x_i^2 = \sum x_iy_i$。第一式给出$b = \bar y - w\bar x$。代入第二式得$w(\sum x_i^2 - n\bar x^2) = \sum x_iy_i - n\bar x\bar y$。而$\sum x_i^2 - n\bar x^2 = \sum(x_i - \bar x)^2 = S_{xx}$，$\sum x_iy_i - n\bar x\bar y = \sum(x_i - \bar x)(y_i - \bar y) = S_{xy}$，故$w = S_{xy}/S_{xx}$，前提是$S_{xx} > 0$——即并非所有$x_i$相等，这正是满秩条件。
:::
:::

::: exercise 岭回归作为增广数据上的最小二乘 {level=2}
证明岭回归等于对增广数据$\tilde X = \begin{pmatrix}X\\ \sqrt\lambda I_p\end{pmatrix}$与$\tilde{\mathbf{y}} = \begin{pmatrix}\mathbf{y}\\ \mathbf{0}\end{pmatrix}$作通常的最小二乘。解释多出来的那些行。
::: solution
$\lVert\tilde{\mathbf{y}} - \tilde X\boldsymbol\beta\rVert^2 = \lVert\mathbf{y} - X\boldsymbol\beta\rVert^2 + \lVert\mathbf{0} - \sqrt\lambda\boldsymbol\beta\rVert^2$，正是岭目标。等价地，$\tilde X^\top\tilde X = X^\top X + \lambda I$且$\tilde X^\top\tilde{\mathbf{y}} = X^\top\mathbf{y}$，所以增广问题的正规方程就是[[#eq-ridge]]。多出的$p$行是假想的观测，每个系数一条，大意是“只有特征$j$出现时，响应为$0$，强度为$\sqrt\lambda$”。它们把每个系数都向零拉，而且对任何$X$，$\tilde X$都列满秩，这又是岭回归必有唯一解的另一个证明。
:::
:::

::: exercise 中心化改善条件性态 {level=3}
对带截距的输入$x = 1, 2, 3$，计算中心化（$x\mapsto x - 2$）前后$X^\top X$的条件数。然后一般地解释：为什么把一个特征中心化只改变拟合的截距。
::: solution
中心化前，$X^\top X = \begin{pmatrix}3 & 6\\ 6 & 14\end{pmatrix}$，特征值为$(17\pm\sqrt{265})/2$，约$16.64$与$0.360$：$\kappa\approx46$，与[[#ex-gd]]相同。中心化后输入为$-1, 0, 1$，$X^\top X = \operatorname{diag}(3, 2)$，故$\kappa = 1.5$，取$\eta = 1/\mu_{\max}$的梯度下降几步之内就消去大部分误差。一般地，列$\mathbf{x} - \bar x\mathbf{1}$是旧列$\mathbf{x}$与$\mathbf{1}$的组合，所以列空间——从而投影$\hat{\mathbf{y}}$——不变；把$b + w(x - \bar x) = (b - w\bar x) + wx$写开，可见斜率相同、只是截距换了表达。中心化移除了截距列与特征之间的相关性，而正是它让$X^\top X$病态。
:::
:::

::: exercise 帽子矩阵与无偏的噪声估计 {level=3}
设$X\in\R^{n\times p}$列满秩，$\mathbf{y} = X\boldsymbol\beta + \boldsymbol\varepsilon$，$\E\boldsymbol\varepsilon = \mathbf{0}$，$\Cov(\boldsymbol\varepsilon) = \sigma^2I$。证明[[#prop-projection]]的帽子矩阵满足$\operatorname{tr}P = p$，残差为$(I - P)\boldsymbol\varepsilon$，且$\E[\operatorname{RSS}] = (n - p)\sigma^2$。$\sigma^2$的哪个估计量是无偏的？
::: solution
由迹的循环性，$\operatorname{tr}P = \operatorname{tr}\big(X(X^\top X)^{-1}X^\top\big) = \operatorname{tr}\big((X^\top X)^{-1}X^\top X\big) = \operatorname{tr}I_p = p$。残差为$\mathbf{y} - P\mathbf{y} = (I - P)(X\boldsymbol\beta + \boldsymbol\varepsilon) = (I - P)\boldsymbol\varepsilon$，因为$PX = X$。由于$I - P$对称且幂等，$\operatorname{RSS} = \boldsymbol\varepsilon^\top(I - P)\boldsymbol\varepsilon$，而对任何固定矩阵$A$，$\E[\boldsymbol\varepsilon^\top A\boldsymbol\varepsilon] = \operatorname{tr}(A\Cov(\boldsymbol\varepsilon)) = \sigma^2\operatorname{tr}A$。于是$\E[\operatorname{RSS}] = \sigma^2(n - p)$，$\operatorname{RSS}/(n - p)$无偏，而最大似然估计$\operatorname{RSS}/n$偏低——每拟合一个参数就“用掉”噪声的一个维度。这推广了[[math-for-ml/estimation]]的$N - 1$修正，那是$p = 1$（常数模型）的情形。
:::
:::

::: exercise 手算多项式最小二乘 {level=3 check="5/4"}
验证[[#ex-polynomial]]：对四个点$(-1, 2)$、$(0, 1)$、$(1, 2)$、$(2, 6)$写出$\Phi^\top\Phi$与$\Phi^\top\mathbf{y}$，精确地解正规方程。$x^2$的系数是多少？
::: solution
各和为$\sum1 = 4$，$\sum x = 2$，$\sum x^2 = 6$，$\sum x^3 = 8$，$\sum x^4 = 18$，$\sum y = 11$，$\sum xy = -2 + 0 + 2 + 12 = 12$，$\sum x^2y = 2 + 0 + 2 + 24 = 28$，得到例中的矩阵。第一式的$\frac12$从第二式减去、第一式的$\frac32$从第三式减去：$5\beta_1 + 5\beta_2 = 6.5$与$5\beta_1 + 9\beta_2 = 11.5$。两式相减得$4\beta_2 = 5$，故$\beta_2 = 5/4$；于是$\beta_1 = 1.3 - 1.25 = 0.05$；再由$4\beta_0 + 2\beta_1 + 6\beta_2 = 11$得$\beta_0 = (11 - 0.1 - 7.5)/4 = 0.85$.用清单里的`solve`跑这些矩阵，得到同样的值。
:::
:::
