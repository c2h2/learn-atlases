某个实验得到数据点$(0, 1)$、$(1, 3)$、$(2, 4)$和$(3, 4)$，而理论表明这些量之间的关系应当是一条直线$y = c + mx$。一条经过全部四个点的直线需要满足

$$
\begin{aligned} c + 0m &= 1,\\ c + 1m &= 3,\\ c + 2m &= 4,\\ c + 3m &= 4, \end{aligned}
\qquad\text{即}\qquad
\begin{pmatrix}1&0\\1&1\\1&2\\1&3\end{pmatrix}\begin{pmatrix}c\\m\end{pmatrix} = \begin{pmatrix}1\\3\\4\\4\end{pmatrix}.
$$

四个方程，两个未知数，没有解：这些点不共线——真实的测量数据从来不会恰好共线。然而，显然存在一条与数据拟合得很好的直线。**最小二乘**法把这一点说得精确：选取未知数，使误差的平方和尽可能小。从几何上看，这是一个最近点问题——向量$A\mathbf{x}$应当尽可能接近$\mathbf{b}$——而上一章正是用正交投影来解决最近点问题的。

本章把这一观察转化为**正规方程**$A\T A\hat{\mathbf{x}} = A\T\mathbf{b}$，研究投影矩阵，并把这种方法用于以直线、多项式和其他曲线拟合数据。最后讨论计算方面的问题：为什么在实际计算中QR分解比正规方程更受青睐。最小二乘法是整个应用数学中使用最广泛的技术，从它的发源地天文学，到统计学、计量经济学、信号处理和机器学习，无处不在。

## 最小二乘解与正规方程

::: definition 最小二乘解 {#def-least-squares}
设$A$是$m\times n$矩阵，$\mathbf{b}\in\R^m$。$A\mathbf{x} = \mathbf{b}$的**最小二乘解**是指满足下式的向量$\hat{\mathbf{x}}\in\R^n$：

$$
\norm{\mathbf{b} - A\hat{\mathbf{x}}}\le\norm{\mathbf{b} - A\mathbf{x}} \qquad\text{对所有 } \mathbf{x}\in\R^n.
$$

向量$\mathbf{r} = \mathbf{b} - A\hat{\mathbf{x}}$称为**残差**，$\norm{\mathbf{r}}$称为**最小二乘误差**。
:::

这个名称来自把范数的平方写开：$\norm{\mathbf{b} - A\mathbf{x}}^2 = \sum_{i=1}^m\bigl(b_i - (A\mathbf{x})_i\bigr)^2$是$m$个方程的误差的平方和。如果方程组相容，那么它的精确解就是最小二乘解，误差为$0$。

当$\mathbf{x}$取遍$\R^n$时，向量$A\mathbf{x}$取遍列空间$\operatorname{Col}(A)$。所以我们要找的是$\operatorname{Col}(A)$中离$\mathbf{b}$最近的点，由[[linear-algebra/inner-products#thm-best-approx]]，它就是正交投影$\hat{\mathbf{b}} = \proj_{\operatorname{Col}(A)}\mathbf{b}$。最小二乘解恰好就是$A\mathbf{x} = \hat{\mathbf{b}}$的解。由于我们手头通常没有$\operatorname{Col}(A)$的正交基来计算$\hat{\mathbf{b}}$，我们换一种方式来刻画这些解。

::: theorem 正规方程 {#thm-normal}
$A\mathbf{x} = \mathbf{b}$的最小二乘解恰好就是下面的**正规方程**的解：

$$
A\T A\,\hat{\mathbf{x}} = A\T\mathbf{b}.
$$ {#eq-normal}

特别地，最小二乘解总是存在的，并且$\hat{\mathbf{x}}$是最小二乘解当且仅当残差$\mathbf{b} - A\hat{\mathbf{x}}$与$\operatorname{Col}(A)$正交。
:::

::: proof
由[[linear-algebra/inner-products#thm-decomposition]]和[[linear-algebra/inner-products#thm-best-approx]]，$\norm{\mathbf{b} - A\mathbf{x}}$取最小值当且仅当$A\mathbf{x} = \hat{\mathbf{b}}$，而$\hat{\mathbf{b}}$可以刻画为$\operatorname{Col}(A)$中满足$\mathbf{b} - \hat{\mathbf{b}}\perp\operatorname{Col}(A)$的唯一向量。由于$A\mathbf{x}$总在$\operatorname{Col}(A)$中，向量$\hat{\mathbf{x}}$是最小二乘解当且仅当$\mathbf{b} - A\hat{\mathbf{x}}\in\operatorname{Col}(A)^\perp$。由[[linear-algebra/inner-products#thm-fundamental]]，$\operatorname{Col}(A)^\perp = \operatorname{Nul}(A\T)$，所以这等价于$A\T(\mathbf{b} - A\hat{\mathbf{x}}) = \mathbf{0}$，也就是[[#eq-normal]]。最小二乘解之所以存在，是因为$\hat{\mathbf{b}}\in\operatorname{Col}(A)$，从而$A\mathbf{x} = \hat{\mathbf{b}}$是相容的。
:::

“正规”（normal）这一名称指的正是这种正交性：残差是列空间的“法向”（normal），即与列空间垂直。注意这里操作上的妙处：用$A\T$左乘不相容的方程组$A\mathbf{x} = \mathbf{b}$，就把它变成了一个总是相容的$n\times n$方阵方程组。

::: theorem 唯一性 {#thm-unique-ls}
对任意矩阵$A$，$\operatorname{Nul}(A\T A) = \operatorname{Nul}(A)$。因此$A\T A$可逆当且仅当$A$的列线性无关，此时最小二乘解是唯一的：

$$
\hat{\mathbf{x}} = (A\T A)^{-1}A\T\mathbf{b}.
$$
:::

::: proof
若$A\mathbf{x} = \mathbf{0}$，则$A\T A\mathbf{x} = \mathbf{0}$。反之，若$A\T A\mathbf{x} = \mathbf{0}$，则

$$
0 = \mathbf{x}\T A\T A\mathbf{x} = (A\mathbf{x})\T(A\mathbf{x}) = \norm{A\mathbf{x}}^2,
$$

所以$A\mathbf{x} = \mathbf{0}$。方阵$A\T A$可逆当且仅当它的零空间是$\{\mathbf{0}\}$（[[linear-algebra/matrices#thm-imt]]），即当且仅当$\operatorname{Nul}(A) = \{\mathbf{0}\}$，也就是当且仅当$A$的列线性无关。此时[[#eq-normal]]恰有一个解。
:::

当$A$的列线性相关时，最小二乘解有无穷多个——它们都有相同的$A\hat{\mathbf{x}} = \hat{\mathbf{b}}$，彼此相差$\operatorname{Nul}(A)$中的向量。其中有唯一一个长度最小的解，[[linear-algebra/svd]]一章中的伪逆正是把它挑了出来。

::: intuition 用微积分推导
正规方程也可以通过令导数为零得到。把误差平方展开为$\mathbf{x}$的函数，

$$
f(\mathbf{x}) = \norm{\mathbf{b} - A\mathbf{x}}^2 = \mathbf{b}\T\mathbf{b} - 2\mathbf{x}\T A\T\mathbf{b} + \mathbf{x}\T A\T A\mathbf{x},
$$

这是$n$个变量$x_1, \dots, x_n$的二次函数。它的梯度为$\nabla f = 2A\T A\mathbf{x} - 2A\T\mathbf{b}$，梯度为零当且仅当$\mathbf{x}$是正规方程的解。二阶导数矩阵为$2A\T A$，而$\mathbf{v}\T(2A\T A)\mathbf{v} = 2\norm{A\mathbf{v}}^2\ge 0$，所以临界点都是极小值点——这是半正定二次型的碗状图像，[[linear-algebra/spectral-theorem]]一章将研究这类二次型（可与[[multivariable/extrema]]一章中的二阶导数判别法相比较）。借助投影的几何论证不用任何微积分就得到同样的结论，并且直接表明最小值是能取到的。
:::

::: example 四个点的最佳拟合直线 {#ex-line}
对本章开头的数据$(0,1)$、$(1,3)$、$(2,4)$、$(3,4)$，求最小二乘直线$y = c + mx$。
::: solution
取$A$和$\mathbf{b}$如本章开头所示，

$$
A\T A = \begin{pmatrix}1&1&1&1\\0&1&2&3\end{pmatrix}\begin{pmatrix}1&0\\1&1\\1&2\\1&3\end{pmatrix} = \begin{pmatrix}4&6\\6&14\end{pmatrix}, \qquad A\T\mathbf{b} = \begin{pmatrix}1 + 3 + 4 + 4\\ 0 + 3 + 8 + 12\end{pmatrix} = \begin{pmatrix}12\\23\end{pmatrix}.
$$

正规方程$4c + 6m = 12$，$6c + 14m = 23$的系数行列式为$56 - 36 = 20$，解为

$$
c = \frac{14\cdot 12 - 6\cdot 23}{20} = \frac32, \qquad m = \frac{4\cdot 23 - 6\cdot 12}{20} = 1.
$$

最小二乘直线为$y = \frac32 + x$。其残差为$\mathbf{r} = \mathbf{b} - A\hat{\mathbf{x}} = (1 - \frac32,\ 3 - \frac52,\ 4 - \frac72,\ 4 - \frac92) = \left(-\frac12, \frac12, \frac12, -\frac12\right)$，所以误差平方和为$1$。正如[[#thm-normal]]所预言的，$\mathbf{r}$与两列都正交：$-\frac12 + \frac12 + \frac12 - \frac12 = 0$，$0 + \frac12 + 1 - \frac32 = 0$。
:::
:::

::: widget regression
points: 0,1; 1,3; 2,4; 3,4
degree: 1
residuals: true
x: -1, 5
y: -1, 6
caption: [[#ex-line]]中的数据，以及最小二乘直线$y = \tfrac32 + x$和它的残差。拖动一个点，观察直线如何随之变化：它使以竖直残差为边的正方形的总面积最小（打开“平方”开关即可看到这些正方形）。注意这条直线总是经过数据的重心$(\bar x, \bar y)$；而把一个点移到很远的地方（离群点），整条直线都会被它拖着走——平方使大误差的代价非常高。
:::

::: example 一个无解的方程组 {#ex-inconsistent}
设$A = \begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}$，$\mathbf{b} = (1, 1, 0)$，求$A\mathbf{x} = \mathbf{b}$的最小二乘解，并从几何上解释其误差。
::: solution
方程组$x_1 = 1$，$x_2 = 1$，$x_1 + x_2 = 0$显然不相容。正规方程为

$$
A\T A = \begin{pmatrix}2&1\\1&2\end{pmatrix}, \quad A\T\mathbf{b} = \begin{pmatrix}1\\1\end{pmatrix}, \qquad \begin{pmatrix}2&1\\1&2\end{pmatrix}\hat{\mathbf{x}} = \begin{pmatrix}1\\1\end{pmatrix}\ \Longrightarrow\ \hat{\mathbf{x}} = \begin{pmatrix}\frac13\\\frac13\end{pmatrix}.
$$

所以$A\hat{\mathbf{x}} = (\frac13, \frac13, \frac23)$，残差为$\mathbf{r} = (\frac23, \frac23, -\frac23)$，最小二乘误差为$\norm{\mathbf{r}} = \frac{2}{\sqrt3}$。从几何上看，$\operatorname{Col}(A)$是法向量为$\mathbf{n} = (1,1,-1)$的平面$x + y - z = 0$，残差是$\mathbf{n}$的倍数，而$\frac{2}{\sqrt3} = \frac{\abs{\mathbf{b}\cdot\mathbf{n}}}{\norm{\mathbf{n}}}$正是$\mathbf{b}$到该平面的距离。
:::
:::

::: warning 最小二乘不是“先解了再说”
有两种诱人的捷径会给出错误的答案。删去一些方程，直到方程组变成可解的方阵方程组，这样做忽略了被丢弃的数据。对$A\mathbf{x} = \mathbf{b}$作行化简只能揭示它不相容；行变换不保持最小二乘解，因为它们会改变长度。正确的做法是在求解**之前**先写出正规方程（或使用下文的QR方法）。
:::

::: quiz
$A$的列线性无关，$\mathbf{b}\notin\operatorname{Col}(A)$，$\hat{\mathbf{x}}$是$A\mathbf{x} = \mathbf{b}$的最小二乘解。下列哪些说法正确？（选出所有正确的选项。）
- [x] $\hat{\mathbf{x}}$是唯一的。
- [x] $\mathbf{b} - A\hat{\mathbf{x}}$与$A$的每一列都正交。
- [ ] $A\hat{\mathbf{x}} = \mathbf{b}$。
- [x] $A\hat{\mathbf{x}}$是$\mathbf{b}$在$\operatorname{Col}(A)$上的正交投影。
::: solution
各列线性无关保证了唯一性（[[#thm-unique-ls]]）；残差垂直于$\operatorname{Col}(A)$，且$A\hat{\mathbf{x}} = \proj_{\operatorname{Col}(A)}\mathbf{b}$（[[#thm-normal]]）。但$A\hat{\mathbf{x}}\neq\mathbf{b}$，因为$\mathbf{b}$不在列空间中——否则方程组就是相容的了。
:::
:::

## 投影矩阵

当$A$的列线性无关时，把[[#thm-unique-ls]]与$\hat{\mathbf{b}} = A\hat{\mathbf{x}}$结合起来，就可以把任意$\mathbf{b}$在$\operatorname{Col}(A)$上的投影表示成一个矩阵乘以$\mathbf{b}$：

$$
\proj_{\operatorname{Col}(A)}\mathbf{b} = P\mathbf{b}, \qquad P = A(A\T A)^{-1}A\T.
$$ {#eq-proj-matrix}

当$A$只有一列$\mathbf{a}$时，它就是$P = \dfrac{\mathbf{a}\mathbf{a}\T}{\mathbf{a}\T\mathbf{a}}$，即到一条直线上的投影。如果$A$的列是标准正交的（$A = Q$，$Q\T Q = I$），它就化为$P = QQ\T$，这与[[linear-algebra/inner-products]]一章中得到的结果一致。

::: theorem 正交投影的刻画 {#thm-projection}
方阵$P$是到其列空间上的正交投影的矩阵，当且仅当

$$
P^2 = P \qquad\text{且}\qquad P\T = P.
$$

矩阵[[#eq-proj-matrix]]具有这两个性质；此时$I - P$是到$\operatorname{Col}(P)^\perp$上的正交投影。
:::

::: proof
设$P^2 = P = P\T$。对任意$\mathbf{v}$，写$\mathbf{v} = P\mathbf{v} + (\mathbf{v} - P\mathbf{v})$。第一部分在$\operatorname{Col}(P)$中。第二部分与$\operatorname{Col}(P)$正交：对列空间中的每个向量$P\mathbf{w}$，

$$
(\mathbf{v} - P\mathbf{v})\T P\mathbf{w} = \mathbf{v}\T P\mathbf{w} - \mathbf{v}\T P\T P\mathbf{w} = \mathbf{v}\T P\mathbf{w} - \mathbf{v}\T P^2\mathbf{w} = 0.
$$

由[[linear-algebra/inner-products#thm-decomposition]]中的唯一性，$P\mathbf{v}$就是$\mathbf{v}$在$\operatorname{Col}(P)$上的正交投影。反之，正交投影$P$满足$P^2 = P$（投影两次不会带来任何改变）；并且对所有$\mathbf{v}, \mathbf{w}$，由于$\mathbf{w} - P\mathbf{w}\perp P\mathbf{v}$且$\mathbf{v} - P\mathbf{v}\perp P\mathbf{w}$，

$$
(P\mathbf{v})\cdot\mathbf{w} = (P\mathbf{v})\cdot(P\mathbf{w}) = \mathbf{v}\cdot(P\mathbf{w}),
$$

这就是说$P\T = P$。对于[[#eq-proj-matrix]]，由于$A\T A$对称，$P\T = A\bigl((A\T A)^{-1}\bigr)\T A\T = A(A\T A)^{-1}A\T = P$，并且$P^2 = A(A\T A)^{-1}(A\T A)(A\T A)^{-1}A\T = P$。最后，$I - P$是对称的，且$(I - P)^2 = I - 2P + P^2 = I - P$；它把$\mathbf{v}$映为分量$\mathbf{v} - P\mathbf{v}$，而这个分量位于$\operatorname{Col}(P)^\perp$中。
:::

::: example 三维空间中的投影矩阵 {#ex-proj-matrix}
求到由$(1,0,1)$和$(0,1,1)$张成的平面上的正交投影的矩阵，并用它重新求出[[#ex-inconsistent]]中的$A\hat{\mathbf{x}}$。
::: solution
取$A$如[[#ex-inconsistent]]中所示，则$(A\T A)^{-1} = \frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$，所以

$$
P = A(A\T A)^{-1}A\T = \frac13\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix} = \frac13\begin{pmatrix}2&-1&1\\-1&2&1\\1&1&2\end{pmatrix}.
$$

它是对称的，其迹为$2 = \dim\operatorname{Col}(A)$（对投影而言这总是成立的：[[#exr-proj-trace]]）。把它作用于$\mathbf{b} = (1,1,0)$得到$\frac13(1, 1, 2)$，与$A\hat{\mathbf{x}}$一致。此外，$I - P = \frac13\begin{pmatrix}1&1&-1\\1&1&-1\\-1&-1&1\end{pmatrix} = \frac{\mathbf{n}\mathbf{n}\T}{\mathbf{n}\T\mathbf{n}}$，其中$\mathbf{n} = (1,1,-1)$：这是到法线上的投影。
:::
:::

::: quiz
下列矩阵中哪些是（到其列空间上的）正交投影？（选出所有正确的选项。）
- [x] $\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$
- [ ] $\begin{pmatrix}1&1\\0&0\end{pmatrix}$
- [x] $\begin{pmatrix}1&0\\0&0\end{pmatrix}$
- [ ] $\begin{pmatrix}0&1\\1&0\end{pmatrix}$
::: solution
由[[#thm-projection]]，需要$P^2 = P = P\T$。第一个（到直线$y = x$上的投影）和第三个（到$x$轴上的投影）符合要求。第二个满足$P^2 = P$，但不对称：它是一个**斜**投影，沿一个不垂直的方向把$(0,1)$映到$(1,0)$。第四个是对称的，但$P^2 = I\neq P$：它是关于直线$y = x$的反射。
:::
:::

## 数据的曲线拟合

这种方法可以拟合任何未知参数以**线性**方式出现的模型，即使模型是$x$的非线性函数。

### 直线

对于数据$(x_1, y_1), \dots, (x_m, y_m)$和模型$y = \beta_0 + \beta_1x$，**设计矩阵**$X$的各行为$(1, x_i)$，正规方程$X\T X\boldsymbol\beta = X\T\mathbf{y}$为

$$
\begin{aligned} m\beta_0 + \Bigl(\sum x_i\Bigr)\beta_1 &= \sum y_i,\\ \Bigl(\sum x_i\Bigr)\beta_0 + \Bigl(\sum x_i^2\Bigr)\beta_1 &= \sum x_iy_i. \end{aligned}
$$

第一个方程除以$m$得$\beta_0 = \bar y - \beta_1\bar x$，其中$\bar x$、$\bar y$是均值：**最小二乘直线经过重心$(\bar x, \bar y)$**。代入第二个方程并化简，得

$$
\beta_1 = \frac{S_{xy}}{S_{xx}}, \qquad S_{xy} = \sum_{i=1}^m(x_i - \bar x)(y_i - \bar y), \quad S_{xx} = \sum_{i=1}^m(x_i - \bar x)^2.
$$ {#eq-slope}

在[[#ex-line]]中：$\bar x = \frac32$，$\bar y = 3$，$S_{xx} = \frac94 + \frac14 + \frac14 + \frac94 = 5$，$S_{xy} = (-\frac32)(-2) + (-\frac12)(0) + \frac12(1) + \frac32(1) = 5$，所以$\beta_1 = 1$，$\beta_0 = 3 - \frac32 = \frac32$，与前面的结果相同。由于全由1组成的那一列与残差正交，当模型含有常数项时，**残差之和总是零**。

### 多项式与其他线性模型

要拟合$y = \beta_0 + \beta_1x + \dots + \beta_dx^d$，就用各行为$(1, x_i, x_i^2, \dots, x_i^d)$的设计矩阵。像$y = \beta_0 + \beta_1\cos t + \beta_2\sin t$（季节性数据）或$y = \beta_1x + \beta_2\ln x$这样的模型也用同样的方法处理：每个基函数贡献设计矩阵的一列。

::: remark 为什么用平方？
为什么要使误差的**平方**和最小，而不是比如说使误差的绝对值之和最小？平方给出欧几里得距离$\norm{\mathbf{b} - A\mathbf{x}}$，所以问题具有投影的几何结构；答案来自一个**线性**方程组；当各列线性无关时解是唯一的；而且正如高斯（Gauss）所证明的，当误差服从正态分布时，它是可能性最大的答案。代价是对离群点敏感，因为一个大误差经过平方后可能在和中占据主导地位。改为使$\sum\abs{b_i - (A\mathbf{x})_i}$最小（“最小绝对偏差”）更稳健，但它没有公式解，必须用线性规划来求解。
:::

::: example 用正交基拟合抛物线 {#ex-parabola-fit}
用$y = \beta_0 + \beta_1x + \beta_2x^2$拟合数据$(1, 1)$、$(2, 2)$、$(3, 4)$、$(4, 9)$。
::: solution
设计矩阵就是[[linear-algebra/inner-products#ex-qr]]中的矩阵$A$，我们在那里已经把它的列正交化了：$\operatorname{Col}(A)$有正交基$\mathbf{v}_1 = (1,1,1,1)$，$\mathbf{v}_2 = (-3,-1,1,3)$，$\mathbf{v}_3 = (1,-1,-1,1)$，它们分别是多项式$1$、$2x - 5$和$x^2 - 5x + 5$在$x = 1, 2, 3, 4$处的值。有了正交基，计算投影就不需要解方程组（[[linear-algebra/inner-products#eq-projection]]）：对$\mathbf{y} = (1, 2, 4, 9)$，

$$
\frac{\mathbf{y}\cdot\mathbf{v}_1}{\mathbf{v}_1\cdot\mathbf{v}_1} = \frac{16}{4} = 4, \qquad \frac{\mathbf{y}\cdot\mathbf{v}_2}{\mathbf{v}_2\cdot\mathbf{v}_2} = \frac{26}{20} = \frac{13}{10}, \qquad \frac{\mathbf{y}\cdot\mathbf{v}_3}{\mathbf{v}_3\cdot\mathbf{v}_3} = \frac44 = 1.
$$

所以拟合多项式为

$$
4 + \tfrac{13}{10}(2x - 5) + (x^2 - 5x + 5) = x^2 - \tfrac{12}{5}x + \tfrac52,
$$

拟合值为$(1.1, 1.7, 4.3, 8.9)$，残差为$(-0.1, 0.3, -0.3, 0.1)$。残差与全部三列都正交，这是必然的。（直接解正规方程也得到同样的系数$\beta = (\frac52, -\frac{12}{5}, 1)$，只是计算量更大。）
:::
:::

::: widget regression
points: 1,1; 2,2; 3,4; 4,9
degree: 2
residuals: true
x: 0, 5
y: -1, 11
caption: [[#ex-parabola-fit]]中的最小二乘抛物线$y = x^2 - 2.4x + 2.5$。拖动这些点：四个点、三个参数，拟合通常不是精确的，而残差总是相互抵消，使它们的和（以及分别以$x_i$和$x_i^2$为权的加权和）为零。拖动一个点，使数据落在一条抛物线上，残差就消失了。
:::

::: example 指数增长 {#ex-exponential}
在时刻$t = 0, 1, 2$小时测量一个细菌培养物，计数（以千为单位）分别为$1$、$3$和$8$。拟合模型$y = Ce^{kt}$。
::: solution
这个模型关于$C$和$k$不是线性的，但它的对数是：$\ln y = \ln C + kt$。所以对点$(t_i, \ln y_i) = (0, 0)$、$(1, \ln 3)$、$(2, \ln 8)$拟合一条直线。这里$\bar t = 1$，$S_{tt} = 2$，由[[#eq-slope]]，

$$
k = \frac{(-1)(0 - \bar z) + 0 + (1)(\ln 8 - \bar z)}{2} = \frac{\ln 8}{2} = \tfrac32\ln 2\approx 1.04,
$$

其中$\bar z = \frac13(\ln 3 + \ln 8)$被消去了。于是$\ln C = \bar z - k\bar t = \frac13\ln 24 - \frac32\ln 2\approx 0.020$，所以$C\approx 1.02$，$y\approx 1.02\,e^{1.04t}$。注意，这里最小化的是$\ln y$的误差平方，而不是$y$的误差平方，这相对加大了小计数的权重——对增长数据而言这往往是合适的，因为这类数据的误差往往与测量值的大小成正比。
:::
:::

::: application 统计学中的最小二乘
在统计模型$\mathbf{y} = X\boldsymbol\beta + \boldsymbol\eps$中，若误差$\eps_i$相互独立、均值为$0$且方差相等，则最小二乘估计$\hat{\boldsymbol\beta} = (X\T X)^{-1}X\T\mathbf{y}$是$\boldsymbol\beta$的最佳线性无偏估计量（高斯-马尔可夫定理）；如果误差还服从正态分布，它也是最大似然估计。正交分解$\mathbf{y} = \hat{\mathbf{y}} + \mathbf{r}$（其中$\hat{\mathbf{y}}\perp\mathbf{r}$）由勾股定理给出方差分析恒等式，决定系数$R^2$正是以它为基础的。参见[[statistics/regression]]。
:::

## 计算最小二乘解：QR方法

正规方程是**思考**最小二乘问题的自然方式，也是手工求解小规模问题的自然方法。但在计算机上它们有一个弱点：构造$A\T A$会使问题的“条件数”平方（[[linear-algebra/svd]]一章将使这一点精确化），因此因舍入而损失的有效数字大约会翻倍。如果$A$的列几乎线性相关——例如在高次多项式拟合中，列$x^k$和$x^{k+1}$看起来很相像——这可能会彻底毁掉答案。

解决办法是[[linear-algebra/inner-products#thm-qr]]中的QR分解。


::: theorem 用QR分解求最小二乘解 {#thm-ls-qr}
若$A$的列线性无关，$A = QR$是它的QR分解，则$A\mathbf{x} = \mathbf{b}$的最小二乘解就是下面这个三角方程组的唯一解：

$$
R\hat{\mathbf{x}} = Q\T\mathbf{b}.
$$
:::

::: proof
把$A = QR$代入正规方程，并利用$Q\T Q = I$：$A\T A = R\T Q\T QR = R\T R$，$A\T\mathbf{b} = R\T Q\T\mathbf{b}$。于是正规方程成为$R\T R\hat{\mathbf{x}} = R\T Q\T\mathbf{b}$。矩阵$R\T$可逆（它是对角元为正的三角矩阵），所以这等价于$R\hat{\mathbf{x}} = Q\T\mathbf{b}$。
:::

::: example 用QR分解拟合抛物线 {#ex-ls-qr}
利用[[linear-algebra/inner-products#ex-qr]]中求得的分解$A = QR$，重做[[#ex-parabola-fit]]。
::: solution
在那里，$R = \begin{pmatrix}2&5&15\\0&\sqrt5&5\sqrt5\\0&0&2\end{pmatrix}$，$Q$的各列为$\frac12(1,1,1,1)$、$\frac{1}{2\sqrt5}(-3,-1,1,3)$、$\frac12(1,-1,-1,1)$。对$\mathbf{y} = (1,2,4,9)$：

$$
Q\T\mathbf{y} = \left(\tfrac{16}{2},\ \tfrac{26}{2\sqrt5},\ \tfrac42\right) = \left(8,\ \tfrac{13}{\sqrt5},\ 2\right).
$$

对$R\boldsymbol\beta = Q\T\mathbf{y}$回代：由$2\beta_2 = 2$得$\beta_2 = 1$；由$\sqrt5\beta_1 + 5\sqrt5\beta_2 = \frac{13}{\sqrt5}$得$\beta_1 = \frac{13}{5} - 5 = -\frac{12}{5}$；由$2\beta_0 + 5\beta_1 + 15\beta_2 = 8$得$2\beta_0 = 8 + 12 - 15 = 5$，所以$\beta_0 = \frac52$。系数与前面相同，而整个过程从未构造$A\T A$。
:::
:::

::: example 正规方程失效的情形 {#ex-lauchli}
设$\delta = 10^{-8}$，$A = \begin{pmatrix}1&1\\\delta&0\\0&\delta\end{pmatrix}$，$\mathbf{b} = (2, \delta, \delta)$。证明该方程组相容，其解为$(1,1)$；并解释为什么一台用大约$16$位有效数字进行计算的计算机无法通过正规方程求出这个解。
::: solution
$A(1,1) = (2, \delta, \delta) = \mathbf{b}$，所以$\hat{\mathbf{x}} = (1,1)$，误差为零；$A$的列线性无关，所以它是唯一的最小二乘解。但是

$$
A\T A = \begin{pmatrix}1 + \delta^2 & 1\\ 1 & 1 + \delta^2\end{pmatrix}, \qquad \delta^2 = 10^{-16}.
$$

在双精度运算中，数$1 + 10^{-16}$被舍入为恰好等于$1$（$1$与下一个可表示的数之间的间隔约为$2.2\times10^{-16}$）。因此计算得到的$A\T A$是$\begin{pmatrix}1&1\\1&1\end{pmatrix}$，它是奇异的：区分这两列的信息在求解开始之前就已经被舍入掉了。QR分解直接处理$A$本身。用豪斯霍尔德（Householder）反射（见下面的注记）得到$R\approx\begin{pmatrix}1&1\\0&\sqrt2\,\delta\end{pmatrix}$（至多相差符号），它完全可逆，而$R\hat{\mathbf{x}} = Q\T\mathbf{b}$以完全的精度给出$(1, 1)$。普通的格拉姆-施密特（Gram–Schmidt）正交化求得的$R$相同，但这里计算出的$\mathbf{q}_2$与$\mathbf{q}_1$并不精确正交，由计算出的$Q\T\mathbf{b}$得到的反而是$(2, 0)$——这正是程序库更青睐豪斯霍尔德反射的原因之一。（用[[linear-algebra/svd]]一章的语言来说：$A$的条件数约为$1.4\times 10^8$，无伤大雅；而$A\T A$的条件数是它的平方，约为$2\times10^{16}$，超出了运算的精度。）
:::
:::

::: remark 实际中的做法
库函数计算QR分解时用的不是格拉姆-施密特方法，而是数值上更稳定的**豪斯霍尔德反射**（MATLAB的反斜杠运算符对长方形方程组就是这样做的）；或者使用奇异值分解，它在各列几乎线性相关时也能应对（`numpy.linalg.lstsq`用的就是这种方法）。非常大的稀疏问题用迭代法求解。参见[[numerical-analysis/direct-methods]]和[[numerical-analysis/iterative-methods]]。
:::

::: history
最小二乘法由阿德里安-马里·勒让德（Adrien-Marie Legendre）于1805年发表，见于一篇关于彗星轨道的论文的附录；他在其中把这种方法作为平衡许多互不相容的方程的误差的一种简便手段提出。卡尔·弗里德里希·高斯（Carl Friedrich Gauss）于1809年在《天体运动论》（*Theoria motus corporum coelestium*）中发表了他的论述，并声称自1795年起就一直在使用这种方法——这一说法引发了一场激烈的优先权之争。高斯给出了概率论上的论证（假定误差服从正态分布），并用系统的消元法求解正规方程；人们常把这一方法与他1801年对矮行星谷神星位置的著名预测联系在一起。1821—1823年间，他证明了现在所称的高斯-马尔可夫定理。“回归”（*regression*）一词出现得更晚，来自弗朗西斯·高尔顿（Francis Galton）19世纪80年代对遗传的研究：在他的研究中，异常高大的父母所生的子女，身高往往没有那么极端——他们的身高向均值“回归”。
:::

## 后续内容

最小二乘就是投影，后面各章将进一步细化这幅图景。谱定理（[[linear-algebra/spectral-theorem]]）研究像$A\T A$这样的对称矩阵，其二次型$\mathbf{x}\T A\T A\mathbf{x} = \norm{A\mathbf{x}}^2$永远不取负值。奇异值分解（[[linear-algebra/svd]]）通过伪逆，即使在$A$的列线性相关时也能求解最小二乘问题，并通过条件数解释数值上的敏感性。在统计学中，最小二乘是线性回归、方差分析以及机器学习中许多方法的基础（[[statistics/regression]]）；在数值分析中，它是数据拟合和函数逼近的基础（[[numerical-analysis/interpolation]]）。

::: summary
- 最小二乘解使$\norm{\mathbf{b} - A\mathbf{x}}$（误差平方和的平方根）达到最小；$A\hat{\mathbf{x}}$是$\mathbf{b}$在$\operatorname{Col}(A)$上的投影。
- $\hat{\mathbf{x}}$是最小二乘解，当且仅当残差与$\operatorname{Col}(A)$正交，也当且仅当它是正规方程$A\T A\hat{\mathbf{x}} = A\T\mathbf{b}$的解；正规方程总是相容的（[[#thm-normal]]）。
- $\operatorname{Nul}(A\T A) = \operatorname{Nul}(A)$；当各列线性无关时，$\hat{\mathbf{x}} = (A\T A)^{-1}A\T\mathbf{b}$是唯一的（[[#thm-unique-ls]]）。
- 到$\operatorname{Col}(A)$上的投影的矩阵为$P = A(A\T A)^{-1}A\T$；一个矩阵是正交投影当且仅当$P^2 = P = P\T$（[[#thm-projection]]）。
- 任何关于参数为线性的模型都可以拟合：直线（$\beta_1 = S_{xy}/S_{xx}$，经过$(\bar x, \bar y)$）、多项式、三角模型以及经过变换的模型。
- 列正交时拟合变得非常简单；一般情形下，QR方法$R\hat{\mathbf{x}} = Q\T\mathbf{b}$避免了构造$A\T A$所造成的精度损失（[[#thm-ls-qr]]）。
:::

## 习题

::: exercise 正规方程 {level=1}
求方程组$2x_1 = 1$，$x_2 = 0$，$x_1 + x_2 = 3$的最小二乘解及残差向量。
::: solution
$A = \begin{pmatrix}2&0\\0&1\\1&1\end{pmatrix}$，$\mathbf{b} = (1, 0, 3)$，$A\T A = \begin{pmatrix}5&1\\1&2\end{pmatrix}$，$A\T\mathbf{b} = (5, 3)$。行列式为$9$，所以$\hat{\mathbf{x}} = \frac19\begin{pmatrix}2&-1\\-1&5\end{pmatrix}\begin{pmatrix}5\\3\end{pmatrix} = \left(\frac79, \frac{10}{9}\right)$。于是$A\hat{\mathbf{x}} = \left(\frac{14}{9}, \frac{10}{9}, \frac{17}{9}\right)$，$\mathbf{r} = \left(-\frac59, -\frac{10}{9}, \frac{10}{9}\right)$。验证：$\mathbf{r}\cdot(2,0,1) = -\frac{10}{9} + \frac{10}{9} = 0$，$\mathbf{r}\cdot(0,1,1) = 0$。
:::
:::

::: exercise 最小二乘直线 {level=1 check="3/2"}
求点$(1,2)$、$(2,3)$、$(3,5)$的最小二乘直线$y = \beta_0 + \beta_1x$。斜率是多少？
::: solution
$\bar x = 2$，$\bar y = \frac{10}{3}$，$S_{xx} = 1 + 0 + 1 = 2$，$S_{xy} = (-1)(2 - \frac{10}{3}) + 0 + (1)(5 - \frac{10}{3}) = \frac43 + \frac53 = 3$。所以$\beta_1 = \frac32$，$\beta_0 = \frac{10}{3} - 3 = \frac13$：直线为$y = \frac13 + \frac32x$。
:::
:::

::: exercise 到直线上的投影 {level=1 check="1"}
求$\R^3$到由$(1,2,2)$张成的直线上的正交投影的矩阵$P$，以及它的迹。
::: solution
$P = \dfrac{\mathbf{a}\mathbf{a}\T}{\mathbf{a}\T\mathbf{a}} = \dfrac19\begin{pmatrix}1&2&2\\2&4&4\\2&4&4\end{pmatrix}$，其迹为$\frac{1 + 4 + 4}{9} = 1$，即这条直线的维数。
:::
:::

::: exercise 四个点的抛物线拟合 {level=2 check="3/4"}
用最小二乘法以$y = \beta_0 + \beta_1x + \beta_2x^2$拟合$(-1, 1)$、$(0, 0)$、$(1, 1)$、$(2, 3)$。$\beta_2$等于多少？
::: solution
设计矩阵的各行为$(1, x, x^2)$，其中$x = -1, 0, 1, 2$，并且

$$
X\T X = \begin{pmatrix}4&2&6\\2&6&8\\6&8&18\end{pmatrix}, \qquad X\T\mathbf{y} = \begin{pmatrix}5\\6\\14\end{pmatrix}.
$$

（例如$\sum x_i^2 = 1 + 0 + 1 + 4 = 6$，$\sum x_i^2y_i = 1 + 0 + 1 + 12 = 14$。）用消元法求解得$\boldsymbol\beta = \left(\frac{3}{20}, -\frac{1}{20}, \frac34\right)$，所以$y = 0.15 - 0.05x + 0.75x^2$，$\beta_2 = \frac34$。验证第一个正规方程：$4(0.15) + 2(-0.05) + 6(0.75) = 0.6 - 0.1 + 4.5 = 5$。
:::
:::

::: exercise 增长率 {level=2 check="3*ln(2)/2"}
在[[#ex-exponential]]中，对拟合点$(0, 0)$、$(1, \ln 3)$、$(2, \ln 8)$的直线$z = \ln C + kt$写出并求解正规方程，以验证$k$的值。
::: solution
设计矩阵的各行为$(1, 0)$、$(1, 1)$、$(1, 2)$，所以$X\T X = \begin{pmatrix}3&3\\3&5\end{pmatrix}$，$X\T\mathbf{z} = (\ln 3 + \ln 8,\ \ln 3 + 2\ln 8)$。用第二个正规方程减去第一个，得$2k = \ln 8$，所以$k = \frac12\ln 8 = \frac32\ln 2\approx 1.040$。于是$3\ln C = \ln 3 + \ln 8 - 3k = \ln 3 - \frac32\ln 2$，即$\ln C = \frac13\ln 3 - \frac12\ln 2$。
:::
:::

::: exercise 数据的勾股定理 {level=2}
设$\hat{\mathbf{x}}$是$A\mathbf{x} = \mathbf{b}$的最小二乘解，$\mathbf{r} = \mathbf{b} - A\hat{\mathbf{x}}$。证明$\norm{\mathbf{b}}^2 = \norm{A\hat{\mathbf{x}}}^2 + \norm{\mathbf{r}}^2$，并且$\norm{\mathbf{r}}^2 = \mathbf{b}\T\mathbf{b} - \mathbf{b}\T A\hat{\mathbf{x}}$。
::: solution
$A\hat{\mathbf{x}}\in\operatorname{Col}(A)$，且由[[#thm-normal]]，$\mathbf{r}\perp\operatorname{Col}(A)$，所以对$\mathbf{b} = A\hat{\mathbf{x}} + \mathbf{r}$应用勾股定理就得到第一个恒等式。对于第二个，由于$\mathbf{r}\perp A\hat{\mathbf{x}}$，$\norm{\mathbf{r}}^2 = \mathbf{r}\T(\mathbf{b} - A\hat{\mathbf{x}}) = \mathbf{r}\T\mathbf{b} - \mathbf{r}\T A\hat{\mathbf{x}} = \mathbf{r}\T\mathbf{b}$；而$\mathbf{r}\T\mathbf{b} = \mathbf{b}\T\mathbf{b} - \hat{\mathbf{x}}\T A\T\mathbf{b} = \mathbf{b}\T\mathbf{b} - \mathbf{b}\T A\hat{\mathbf{x}}$。（在[[#ex-line]]中：$\mathbf{b}\T\mathbf{b} = 42$，$\mathbf{b}\T A\hat{\mathbf{x}} = 1\cdot\frac32 + 3\cdot\frac52 + 4\cdot\frac72 + 4\cdot\frac92 = 41$，确实有$\norm{\mathbf{r}}^2 = 1$。）
:::
:::

::: exercise 加权最小二乘 {level=2}
给定权$w_1, \dots, w_m > 0$，证明使$\sum_{i=1}^m w_i\bigl(b_i - (A\mathbf{x})_i\bigr)^2$最小的向量$\mathbf{x}$恰好是$A\T WA\mathbf{x} = A\T W\mathbf{b}$的解，其中$W = \diag(w_1, \dots, w_m)$。
::: solution
令$W^{1/2} = \diag(\sqrt{w_1}, \dots, \sqrt{w_m})$。则$\sum w_i(b_i - (A\mathbf{x})_i)^2 = \norm{W^{1/2}\mathbf{b} - W^{1/2}A\mathbf{x}}^2$，这是关于矩阵$W^{1/2}A$和向量$W^{1/2}\mathbf{b}$的普通最小二乘问题。由[[#thm-normal]]，它的解就是$(W^{1/2}A)\T(W^{1/2}A)\mathbf{x} = (W^{1/2}A)\T W^{1/2}\mathbf{b}$的解；由于$(W^{1/2})\T W^{1/2} = W$，这就是$A\T WA\mathbf{x} = A\T W\mathbf{b}$。（等价地说：我们使用的是[[linear-algebra/inner-products]]一章中的加权内积。）
:::
:::

::: exercise 投影矩阵的迹 {level=3 #exr-proj-trace}
设$P$是$\R^m$到$k$维子空间$W$上的正交投影的矩阵。证明$\tr P = \rank P = k$。
::: solution
取$W$的一组标准正交基$\mathbf{q}_1, \dots, \mathbf{q}_k$，令$Q = (\mathbf{q}_1\ \cdots\ \mathbf{q}_k)$，则$P = QQ\T$。利用$\tr(XY) = \tr(YX)$（[[linear-algebra/matrices#exr-trace]]；同样的证明对长方矩阵$X, Y$也成立），$\tr P = \tr(QQ\T) = \tr(Q\T Q) = \tr I_k = k$。$P$的列空间是$W$（每个$P\mathbf{v}$都在$W$中，并且对$\mathbf{w}\in W$有$P\mathbf{w} = \mathbf{w}$），所以$\rank P = \dim W = k$。
:::
:::

::: exercise 最短解 {level=3 #exr-shortest}
设$A\mathbf{x} = \mathbf{b}$相容。证明它恰有一个位于$\operatorname{Row}(A)$中的解$\mathbf{x}^+$，并且$\mathbf{x}^+$是长度最小的解。对单个方程$x_1 + x_2 + x_3 = 3$求出这个解。
::: hint
把任一解分解为$\mathbf{x} = \mathbf{x}_r + \mathbf{x}_n$，其中$\mathbf{x}_r\in\operatorname{Row}(A)$，$\mathbf{x}_n\in\operatorname{Nul}(A) = \operatorname{Row}(A)^\perp$。
:::
::: solution
设$\mathbf{x}$是任一解，按提示把它分解为$\mathbf{x} = \mathbf{x}_r + \mathbf{x}_n$（[[linear-algebra/inner-products#thm-fundamental]]和[[linear-algebra/inner-products#thm-decomposition]]）。由于$A\mathbf{x}_n = \mathbf{0}$，有$A\mathbf{x}_r = \mathbf{b}$，所以$\mathbf{x}_r$是$\operatorname{Row}(A)$中的一个解。若$\mathbf{x}', \mathbf{x}''$是$\operatorname{Row}(A)$中的两个解，则它们的差属于$\operatorname{Row}(A)\cap\operatorname{Nul}(A) = \{\mathbf{0}\}$；所以$\mathbf{x}^+ = \mathbf{x}_r$是唯一的。每个解都具有$\mathbf{x}^+ + \mathbf{h}$的形式，其中$\mathbf{h}\in\operatorname{Nul}(A)\perp\mathbf{x}^+$，所以$\norm{\mathbf{x}^+ + \mathbf{h}}^2 = \norm{\mathbf{x}^+}^2 + \norm{\mathbf{h}}^2\ge\norm{\mathbf{x}^+}^2$，等号仅当$\mathbf{h} = \mathbf{0}$时成立。对于$x_1 + x_2 + x_3 = 3$，$\operatorname{Row}(A)$由$(1,1,1)$张成；解$t(1,1,1)$需满足$3t = 3$，所以$\mathbf{x}^+ = (1,1,1)$，其长度为$\sqrt3$。
:::
:::

::: exercise AᵀA的秩 {level=3}
证明$\rank(A\T A) = \rank A$，且$\operatorname{Col}(A\T A) = \operatorname{Col}(A\T)$。由此不借助投影推出正规方程总是相容的。
::: solution
由[[#thm-unique-ls]]，$\operatorname{Nul}(A\T A) = \operatorname{Nul}(A)$；两个矩阵都有$n$列，所以由秩-零化度定理，$\rank(A\T A) = n - \dim\operatorname{Nul}(A) = \rank A$。其次，由于$A\T A\mathbf{x} = A\T(A\mathbf{x})$，有$\operatorname{Col}(A\T A)\subseteq\operatorname{Col}(A\T)$，而两个空间的维数都是$\rank A = \rank A\T$；所以它们相等。由于$A\T\mathbf{b}\in\operatorname{Col}(A\T) = \operatorname{Col}(A\T A)$，方程组$A\T A\mathbf{x} = A\T\mathbf{b}$是相容的。
:::
:::
