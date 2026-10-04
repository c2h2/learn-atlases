两个盛有盐水的容器由管道相连，盐分在两者之间相互流动；两个质点由弹簧相连，彼此相互牵拉；在平衡点附近，捕食者和它的猎物各自影响着对方的增长率。在所有这些情形中，几个量同时变化，而每个量的变化率都依赖于所有这些量。把状态记为$\mathbf{x}(t) = (x_1(t), \dots, x_n(t))$，这类模型中最简单的是**线性微分方程组**

$$
\mathbf{x}' = A\,\mathbf{x},
$$ {#eq-system}

其中$A$是$n\times n$矩阵。当$n = 1$时，它就是$x' = ax$，其解为$x = e^{at}x_0$。人们自然希望[[#eq-system]]的解是“$\mathbf{x} = e^{At}\mathbf{x}_0$”——事实正是如此，只要我们先弄清楚矩阵的指数是什么意思。

本章把线性代数与微分方程结合起来。我们先证明[[#eq-system]]的解构成一个$n$维向量空间，并推广朗斯基行列式。然后由$A$的特征值和特征向量（[[linear-algebra/eigenvalues]]）求出显式解，包括复特征值和亏损的情形；接着定义矩阵指数并证明它的性质；最后对平面方程组可能出现的相图进行分类。这一分类将是[[ode/nonlinear-systems]]一章研究非线性系统的基础。

## 线性方程组的矩阵形式

::: definition 线性方程组 {#def-system}
一阶方程构成的**线性方程组**是指

$$
\mathbf{x}'(t) = A(t)\,\mathbf{x}(t) + \mathbf{f}(t),
$$ {#eq-linear-system}

其中$A(t)$是$n\times n$矩阵，$\mathbf{f}(t)$是向量，它们的元素都在区间$I$上连续。若$\mathbf{f}\equiv\mathbf{0}$，则称方程组是**齐次**的；若$A$不依赖于$t$，则称它是**常系数**的。初值问题还要附加条件$\mathbf{x}(t_0) = \mathbf{x}_0$。
:::

方程组包含了所有的高阶线性方程。给定$y^{(n)} + a_{n-1}y^{(n-1)} + \dots + a_1y' + a_0y = g$，令$x_1 = y$，$x_2 = y'$，……，$x_n = y^{(n-1)}$。则当$k < n$时$x_k' = x_{k+1}$，而方程本身给出$x_n'$，所以

$$
\mathbf{x}' = \begin{pmatrix} 0 & 1 & & \\ & \ddots & \ddots & \\ & & 0 & 1 \\ -a_0 & -a_1 & \cdots & -a_{n-1}\end{pmatrix}\mathbf{x} + \begin{pmatrix}0\\ \vdots\\ 0 \\ g\end{pmatrix}.
$$

这个矩阵称为该方程的**友矩阵**，它的特征多项式（在相差一个符号的意义下）就是方程的特征多项式。例如，$y'' + 3y' + 2y = 0$变为$\mathbf{x}' = \begin{pmatrix}0 & 1\\ -2 & -3\end{pmatrix}\mathbf{x}$，其特征值$-1$和$-2$正是$r^2 + 3r + 2$的根。反过来，许多（但不是全部）方程组可以通过消元化为单个高阶方程，不过方程组的观点通常更清晰。

::: theorem 线性方程组解的存在唯一性 {#thm-eu-system}
若$A(t)$和$\mathbf{f}(t)$在开区间$I$上连续，则对每个$t_0\in I$和$\mathbf{x}_0\in\R^n$，初值问题$\mathbf{x}' = A(t)\mathbf{x} + \mathbf{f}(t)$，$\mathbf{x}(t_0) = \mathbf{x}_0$恰有一个解，并且该解在整个$I$上有定义。
:::

::: proof
取包含$t_0$的闭区间$J = [\alpha,\beta]\subseteq I$，在$\R^n$上使用欧几里得范数，在矩阵上使用相应的算子范数。令$L = \max_J\norm{A(t)}$，$K = \max_J\norm{A(t)\mathbf{x}_0 + \mathbf{f}(t)}$，由连续性，二者都是有限的。定义皮卡迭代$\mathbf{x}_0(t)\equiv\mathbf{x}_0$以及

$$
\mathbf{x}_{k+1}(t) = \mathbf{x}_0 + \int_{t_0}^t\bigl(A(s)\mathbf{x}_k(s) + \mathbf{f}(s)\bigr)\,ds .
$$

利用$\norm{\int\mathbf{v}}\le\lvert\int\norm{\mathbf{v}}\rvert$和$\norm{A(s)(\mathbf{x}_{k} - \mathbf{x}_{k-1})}\le L\norm{\mathbf{x}_k - \mathbf{x}_{k-1}}$，[[ode/existence-uniqueness#thm-picard]]中的归纳法给出：在$J$上$\norm{\mathbf{x}_{k+1}(t) - \mathbf{x}_k(t)}\le KL^k\lvert t - t_0\rvert^{k+1}/(k+1)!$。由魏尔斯特拉斯M判别法，迭代序列在$J$上一致收敛于一个连续函数$\mathbf{x}$，它满足积分方程，从而满足初值问题；对$\norm{\mathbf{x} - \mathbf{z}}$应用格朗沃尔（Gronwall）不等式（[[ode/existence-uniqueness#lem-gronwall]]）即得唯一性。这恰好就是把[[ode/existence-uniqueness#thm-global]]中的绝对值换成范数。由于$J$是任意的，解在整个$I$上存在。
:::

## 解空间的结构

从现在起，我们研究齐次方程组$\mathbf{x}' = A(t)\mathbf{x}$。由线性性，解的任意线性组合仍是解；所有解构成一个向量空间。它的维数等于方程的个数。

::: theorem 解空间的维数 {#thm-dimension}
$\mathbf{x}' = A(t)\mathbf{x}$在$I$上的解构成一个$n$维向量空间$S$。对任意$t_0\in I$，求值映射$E\colon S\to\R^n$，$E(\mathbf{x}) = \mathbf{x}(t_0)$是线性同构。因此，解$\mathbf{x}^{(1)},\dots,\mathbf{x}^{(n)}$构成$S$的一组基，当且仅当对某个（等价地，对每个）$t_0$，向量$\mathbf{x}^{(1)}(t_0),\dots,\mathbf{x}^{(n)}(t_0)$线性无关。
:::

::: proof
$E$是线性的。它是满射，因为对每个$\mathbf{x}_0$，满足$\mathbf{x}(t_0) = \mathbf{x}_0$的初值问题都有解；它是单射，因为由唯一性（[[#thm-eu-system]]），满足$\mathbf{x}(t_0) = \mathbf{0}$的解只有零解。同构把基映成基，这就给出了其余的结论；又由于$t_0$是任意的，在某一个$t_0$处线性无关就意味着在每个$t$处都线性无关。
:::

::: definition 基解矩阵 {#def-fundamental}
$\mathbf{x}' = A(t)\mathbf{x}$的**基解矩阵**是一个$n\times n$矩阵函数$\Phi(t)$，它的各列是$n$个线性无关的解。此时$\Phi' = A\Phi$，$\Phi(t)$对每个$t$都可逆，每个解都可以写成$\mathbf{x}(t) = \Phi(t)\mathbf{c}$（$\mathbf{c}$为常向量），而满足$\mathbf{x}(t_0) = \mathbf{x}_0$的解为

$$
\mathbf{x}(t) = \Phi(t)\,\Phi(t_0)^{-1}\,\mathbf{x}_0 .
$$
:::

行列式$\det\Phi(t)$称为这$n$个解的**朗斯基行列式**。对于由二阶方程得到的方程组，它恰好就是[[ode/second-order-linear#def-wronskian]]中的朗斯基行列式，而阿贝尔公式可以推广如下。

::: theorem 刘维尔公式 {#thm-liouville}
若$\Phi$是基解矩阵（或$\Phi' = A(t)\Phi$的任一矩阵解），则

$$
\det\Phi(t) = \det\Phi(t_0)\,\exp\left(\int_{t_0}^t\tr A(s)\,ds\right).
$$ {#eq-liouville}
:::

::: proof
设$\boldsymbol{\varphi}_1,\dots,\boldsymbol{\varphi}_n$是$\Phi$的各**行**。行列式对每一行分别是线性的，所以由乘积法则

$$
(\det\Phi)' = \sum_{i=1}^n\det\bigl(\Phi\text{ 的第 } i \text{ 行换成 } \boldsymbol{\varphi}_i'\bigr).
$$

由于$\Phi' = A\Phi$，$\Phi'$的第$i$行为$\boldsymbol{\varphi}_i' = \sum_ja_{ij}\boldsymbol{\varphi}_j$。利用第$i$个行列式对第$i$行的线性性将其展开，其中$j\neq i$的每一项都有两行相等，因而为零，只剩下$a_{ii}\det\Phi$。因此$(\det\Phi)' = \bigl(\sum_ia_{ii}\bigr)\det\Phi = \tr A(t)\,\det\Phi$，这是一个标量线性方程，其解就是[[#eq-liouville]]。
:::

特别地，与二阶方程的情形一样，$n$个解的朗斯基行列式要么处处不为零，要么恒等于零。对于二阶方程$y'' + py' + qy = 0$，友矩阵的迹为$-p$，而[[#eq-liouville]]化为阿贝尔公式（[[ode/second-order-linear#thm-abel]]）。

## 特征值法

对常数矩阵$A$，可以显式地求出解。试探$\mathbf{x}(t) = e^{\lambda t}\mathbf{v}$，其中$\mathbf{v}\neq\mathbf{0}$是常向量。则$\mathbf{x}' = \lambda e^{\lambda t}\mathbf{v}$，$A\mathbf{x} = e^{\lambda t}A\mathbf{v}$，所以

$$
e^{\lambda t}\mathbf{v}\text{ 是解} \iff A\mathbf{v} = \lambda\mathbf{v}.
$$

**直线解就是特征向量。**从几何上看，$e^{\lambda t}\mathbf{v}$沿着过$\mathbf{v}$的直线运动：若$\lambda < 0$，则趋向原点；若$\lambda > 0$，则远离原点。

::: theorem 特征值法 {#thm-eigen}
若常数矩阵$A$有$n$个线性无关的特征向量$\mathbf{v}_1,\dots,\mathbf{v}_n$，对应的特征值为$\lambda_1,\dots,\lambda_n$（不必互不相同），则$\mathbf{x}' = A\mathbf{x}$的通解为

$$
\mathbf{x}(t) = c_1e^{\lambda_1t}\mathbf{v}_1 + c_2e^{\lambda_2t}\mathbf{v}_2 + \dots + c_ne^{\lambda_nt}\mathbf{v}_n .
$$
:::

::: proof
每个$e^{\lambda_it}\mathbf{v}_i$都是解，而它们在$t = 0$处的值$\mathbf{v}_1,\dots,\mathbf{v}_n$线性无关，所以由[[#thm-dimension]]，它们构成解空间的一组基。
:::

特别地，当$A$有$n$个互不相同的特征值时（因为属于不同特征值的特征向量线性无关），以及当$A$是对称矩阵时（由谱定理，[[linear-algebra/spectral-theorem]]），这一定理都适用。

::: example 鞍点 {#ex-saddle}
求解$\mathbf{x}' = \begin{pmatrix}1 & 1\\ 4 & 1\end{pmatrix}\mathbf{x}$，$\mathbf{x}(0) = \begin{pmatrix}2\\0\end{pmatrix}$。
::: solution
特征多项式为$(1 - \lambda)^2 - 4 = (\lambda - 3)(\lambda + 1)$。对$\lambda = 3$，$(A - 3I)\mathbf{v} = \mathbf{0}$即$-2v_1 + v_2 = 0$，所以$\mathbf{v}_1 = (1, 2)$。对$\lambda = -1$，由$2v_1 + v_2 = 0$得$\mathbf{v}_2 = (1,-2)$。通解为

$$
\mathbf{x}(t) = c_1e^{3t}\begin{pmatrix}1\\2\end{pmatrix} + c_2e^{-t}\begin{pmatrix}1\\-2\end{pmatrix},
$$

由$\mathbf{x}(0) = (2,0)$得$c_1 + c_2 = 2$，$2c_1 - 2c_2 = 0$，所以$c_1 = c_2 = 1$。从过$(1,-2)$的直线上出发的解趋于原点；其他所有解最终都沿$(1,2)$方向被推向远处。原点是一个**鞍点**：它沿一条直线吸引，沿另一条直线排斥。
:::
:::

::: widget phaseplane
matrix: 1, 1; 4, 1
x: -3, 3
y: -3, 3
points: 2, 0; 0.5, -1; -0.5, 1; -2, 0.2
caption: [[#ex-saddle]]中的鞍点。两条直线解分别沿特征向量$(1,2)$（不稳定，$\lambda = 3$）和$(1,-2)$（稳定，$\lambda = -1$）。点击可以从新的初始点出发画出轨线：只有恰好从稳定直线上出发的轨线才会到达原点。试着把左下角的元素改为负数，看鞍点如何变成焦点。
:::

### 复特征值

实矩阵可能有复特征值，它们成共轭对出现。复解$e^{\lambda t}\mathbf{v}$仍然是解，而实解就隐藏在其中。

::: proposition 由复特征值得到实解 {#prop-complex}
设$A$是实矩阵，$A\mathbf{v} = \lambda\mathbf{v}$，其中$\lambda = \alpha + i\beta$，$\beta\neq0$，$\mathbf{v} = \mathbf{a} + i\mathbf{b}$，$\mathbf{a},\mathbf{b}\in\R^n$。则

$$
\mathbf{x}_1(t) = e^{\alpha t}\bigl(\mathbf{a}\cos\beta t - \mathbf{b}\sin\beta t\bigr), \qquad \mathbf{x}_2(t) = e^{\alpha t}\bigl(\mathbf{a}\sin\beta t + \mathbf{b}\cos\beta t\bigr)
$$

是$\mathbf{x}' = A\mathbf{x}$的两个线性无关的实解。
:::

::: proof
由欧拉公式，$e^{\lambda t}\mathbf{v} = e^{\alpha t}(\cos\beta t + i\sin\beta t)(\mathbf{a} + i\mathbf{b}) = \mathbf{x}_1 + i\,\mathbf{x}_2$。由于$A$是实矩阵，复解$\mathbf{z} = e^{\lambda t}\mathbf{v}$的实部和虚部分别满足$\mathbf{x}_1' + i\mathbf{x}_2' = A\mathbf{x}_1 + iA\mathbf{x}_2$两边实部和虚部相等所给出的方程。在$t = 0$处，它们的值为$\mathbf{a}$和$\mathbf{b}$。这两个向量线性无关：$\bar{\mathbf{v}} = \mathbf{a} - i\mathbf{b}$是属于$\bar\lambda\neq\lambda$的特征向量，所以$\mathbf{v},\bar{\mathbf{v}}$在$\C$上线性无关，而$\mathbf{a} = \frac12(\mathbf{v} + \bar{\mathbf{v}})$，$\mathbf{b} = \frac{1}{2i}(\mathbf{v} - \bar{\mathbf{v}})$张成同一个二维空间。由[[#thm-dimension]]，这两个解线性无关。
:::

::: example 焦点 {#ex-spiral}
求$\mathbf{x}' = \begin{pmatrix}-1 & 2\\ -2 & -1\end{pmatrix}\mathbf{x}$的通解，并描述其轨线。
::: solution
特征多项式$(\lambda + 1)^2 + 4$的根为$\lambda = -1\pm2i$。对$\lambda = -1 + 2i$，由$(A - \lambda I)\mathbf{v} = \begin{pmatrix}-2i & 2\\ -2 & -2i\end{pmatrix}\mathbf{v} = \mathbf{0}$得$\mathbf{v} = (1, i)$，所以$\mathbf{a} = (1,0)$，$\mathbf{b} = (0,1)$。由[[#prop-complex]]，

$$
\mathbf{x}(t) = c_1e^{-t}\begin{pmatrix}\cos 2t\\ -\sin 2t\end{pmatrix} + c_2e^{-t}\begin{pmatrix}\sin 2t\\ \cos 2t\end{pmatrix}.
$$

每个解都是角速度为$2$的旋转与衰减因子$e^{-t}$的结合：轨线是盘旋进入原点的螺线，原点是**稳定焦点**（或称螺旋汇）。旋转方向可以从向量场中的一个向量读出：在$(1,0)$处，$\mathbf{x}' = (-1,-2)$指向下方，所以螺线按顺时针方向旋转。
:::
:::

### 重特征值

如果代数重数为$m$的特征值$\lambda$只有少于$m$个线性无关的特征向量，[[#thm-eigen]]就提供不了足够多的解。缺少的解含有$t$的幂，这与[[ode/second-order-linear#thm-constant]]中特征根为重根的情形一样，并且要用到**广义特征向量**（[[linear-algebra/jordan-form]]）。

::: proposition 由广义特征向量得到的解 {#prop-generalised}
若$(A - \lambda I)\mathbf{v} = \mathbf{0}$且$(A - \lambda I)\mathbf{w} = \mathbf{v}$，则$\mathbf{x}(t) = e^{\lambda t}(t\,\mathbf{v} + \mathbf{w})$是$\mathbf{x}' = A\mathbf{x}$的解，并且当$\mathbf{v}\neq\mathbf{0}$时它与$e^{\lambda t}\mathbf{v}$线性无关。
:::

::: proof
$\mathbf{x}' = \lambda e^{\lambda t}(t\mathbf{v} + \mathbf{w}) + e^{\lambda t}\mathbf{v}$，而$A\mathbf{x} = e^{\lambda t}(tA\mathbf{v} + A\mathbf{w}) = e^{\lambda t}\bigl(t\lambda\mathbf{v} + \lambda\mathbf{w} + \mathbf{v}\bigr)$。二者相等。在$t = 0$处，两个解的值分别为$\mathbf{w}$和$\mathbf{v}$，它们线性无关：若$\mathbf{w} = c\mathbf{v}$，则$(A - \lambda I)\mathbf{w} = \mathbf{0}\neq\mathbf{v}$。
:::

::: example 亏损矩阵 {#ex-defective}
求解$\mathbf{x}' = \begin{pmatrix}1 & -1\\ 1 & 3\end{pmatrix}\mathbf{x}$。
::: solution
特征多项式为$(1-\lambda)(3 - \lambda) + 1 = (\lambda - 2)^2$，所以$\lambda = 2$是二重特征值。而$A - 2I = \begin{pmatrix}-1 & -1\\ 1 & 1\end{pmatrix}$的秩为1，所以只有一个线性无关的特征向量$\mathbf{v} = (1,-1)$。解$(A - 2I)\mathbf{w} = \mathbf{v}$：$-w_1 - w_2 = 1$，所以可以取$\mathbf{w} = (-1, 0)$。由[[#prop-generalised]]，通解为

$$
\mathbf{x}(t) = c_1e^{2t}\begin{pmatrix}1\\-1\end{pmatrix} + c_2e^{2t}\begin{pmatrix}t - 1\\ -t\end{pmatrix}.
$$

所有解都离开原点，并且当$t\to\pm\infty$时，每个解都变得与唯一的特征方向$(1,-1)$相切：原点是一个**非正常结点**（退化结点）。
:::
:::

::: widget phaseplane
matrix: 1, -1; 1, 3
x: -3, 3
y: -3, 3
points: 0.1, 0.1; -0.1, 0.2; 0.2, -0.05; -0.2, -0.1
caption: [[#ex-defective]]中的非正常结点。只有一条直线解，沿$(1,-1)$方向；其他每条轨线都与它相切地离开原点，并在远处转向，变得与它平行。把两个对角元再拉开一些，二重特征值就分裂为两个实特征值，并出现第二个特征方向（结点）；把它们靠近一些，特征值就变为复数（焦点）。
:::

## 矩阵指数

特征值法需要分情形讨论。矩阵指数给出一个涵盖所有情形的公式，并且它是理论研究中的恰当对象。

::: definition 矩阵指数 {#def-expm}
对方阵$M$，**矩阵指数**定义为

$$
e^{M} = \sum_{k=0}^\infty\frac{M^k}{k!} = I + M + \frac{M^2}{2!} + \frac{M^3}{3!} + \cdots .
$$
:::

::: theorem 矩阵指数给出方程组的解 {#thm-expm}
设$A$是$n\times n$矩阵。

1. $e^{At}$的级数对每个$t$都绝对收敛，并且在有界区间上一致收敛。
2. $\dfrac{d}{dt}e^{At} = Ae^{At} = e^{At}A$，且$e^{A\cdot0} = I$。
3. 对每个$\mathbf{x}_0$，$\mathbf{x}' = A\mathbf{x}$，$\mathbf{x}(0) = \mathbf{x}_0$的唯一解为$\mathbf{x}(t) = e^{At}\mathbf{x}_0$。因此$e^{At}$是满足$\Phi(0) = I$的基解矩阵。
:::

::: proof
1. 对于算子范数，$\norm{M^k}\le\norm M^k$，所以当$\lvert t\rvert\le T$时，第$k$项满足$\norm{A^kt^k/k!}\le(\norm AT)^k/k!$。由于$\sum(\norm AT)^k/k! = e^{\norm AT} < \infty$，由魏尔斯特拉斯M判别法（逐个元素地应用，每个元素都以范数为界），级数在$[-T,T]$上绝对且一致收敛。

2. 逐项求导，$\frac{d}{dt}\frac{A^kt^k}{k!} = A\,\frac{A^{k-1}t^{k-1}}{(k-1)!}$，求导后的级数是$A$乘以原级数，由第1部分，它在有界区间上一致收敛。一个由可导函数组成的收敛级数，如果其导函数级数一致收敛，就可以逐项求导（[[real-analysis/uniform-convergence]]）。因此$\frac{d}{dt}e^{At} = Ae^{At}$；把$A$提到右边作同样的计算，就得到$e^{At}A$。

3. 由第2部分，$\mathbf{x}(t) = e^{At}\mathbf{x}_0$满足$\mathbf{x}' = Ae^{At}\mathbf{x}_0 = A\mathbf{x}$及$\mathbf{x}(0) = \mathbf{x}_0$；唯一性即[[#thm-eu-system]]。
:::

::: proposition 矩阵指数的性质 {#prop-expm}
设$A$、$B$为方阵，$P$为可逆矩阵：

1. 对所有$s, t$，$e^{A(t+s)} = e^{At}e^{As}$；特别地，$e^{At}$可逆，其逆为$e^{-At}$。
2. 若$AB = BA$，则$e^{(A+B)t} = e^{At}e^{Bt}$。
3. $e^{PDP^{-1}t} = P\,e^{Dt}\,P^{-1}$；对$D = \diag(d_1,\dots,d_n)$，$e^{Dt} = \diag(e^{d_1t},\dots,e^{d_nt})$。
:::

::: proof
1. 固定$s$。$X(t) = e^{A(t+s)}$和$Y(t) = e^{At}e^{As}$都满足$X' = AX$且$X(0) = e^{As}$，所以由唯一性，它们逐列相等。取$s = -t$，得$e^{At}e^{-At} = e^{0} = I$。

2. 若$B$与$A$可交换，则$B$与$e^{At}$的级数的每个部分和都可交换，从而与$e^{At}$可交换。令$Y(t) = e^{At}e^{Bt}$。则$Y' = Ae^{At}e^{Bt} + e^{At}Be^{Bt} = (A + B)Y$且$Y(0) = I$，而这也正是刻画$e^{(A+B)t}$的性质；由唯一性即得二者相等。

3. $(PDP^{-1})^k = PD^kP^{-1}$（中间的因子相消），所以$e^{PDP^{-1}t}$的每个部分和都等于$P(e^{Dt}\text{ 的部分和})P^{-1}$；令项数趋于无穷即可。对于对角矩阵$D$，$D^k = \diag(d_i^k)$，级数逐个元素求和得到$\diag(e^{d_it})$。
:::

::: warning 不可交换矩阵的指数
对于数，$e^{a+b} = e^ae^b$；但对于矩阵，当$AB\neq BA$时这可能不成立。取$A = \begin{pmatrix}0&1\\0&0\end{pmatrix}$，$B = \begin{pmatrix}0&0\\1&0\end{pmatrix}$，则$e^Ae^B = \begin{pmatrix}2&1\\1&1\end{pmatrix}$，而$e^{A+B} = \begin{pmatrix}\cosh1&\sinh1\\ \sinh1&\cosh1\end{pmatrix}$（[[#exr-6-7]]）。在拆分指数之前，务必先检查可交换性。
:::

计算$e^{At}$的三种实用方法：

- **可对角化的$A$**：若$A = PDP^{-1}$，则$e^{At} = Pe^{Dt}P^{-1}$——这就是矩阵形式的特征值法。
- **幂零部分**：若$A = \lambda I + N$，其中$N^m = 0$，则$\lambda I$与$N$可交换，且$e^{At} = e^{\lambda t}\bigl(I + Nt + \dots + N^{m-1}t^{m-1}/(m-1)!\bigr)$，这是一个**有限**和。每个矩阵都相似于由这样的块组成的分块对角矩阵（若尔当标准形）。
- **特殊结构**：直接利用级数，如下例所示。

::: example 用对角化计算矩阵指数 {#ex-expm-diag}
对[[#ex-saddle]]中的鞍点矩阵$A = \begin{pmatrix}1&1\\4&1\end{pmatrix}$，计算$e^{At}$。
::: solution
由[[#ex-saddle]]，$A = PDP^{-1}$，其中$P = \begin{pmatrix}1&1\\2&-2\end{pmatrix}$（以特征向量为列），$D = \diag(3,-1)$。于是$P^{-1} = \begin{pmatrix}1/2&1/4\\1/2&-1/4\end{pmatrix}$，且

$$
e^{At} = P\begin{pmatrix}e^{3t}&0\\0&e^{-t}\end{pmatrix}P^{-1} = \begin{pmatrix}\tfrac12\bigl(e^{3t} + e^{-t}\bigr) & \tfrac14\bigl(e^{3t} - e^{-t}\bigr)\\ e^{3t} - e^{-t} & \tfrac12\bigl(e^{3t} + e^{-t}\bigr)\end{pmatrix}.
$$

验证：在$t = 0$处它等于$I$；它的第一列$e^{At}(1,0)$是从$(1,0)$出发的解，正是[[#ex-saddle]]中所求之解的一半，由线性性这理应如此。
:::
:::

::: example 两个矩阵指数 {#ex-expm}
计算$e^{At}$，其中(a) $A = \begin{pmatrix}2&1\\0&2\end{pmatrix}$；(b) $A = \begin{pmatrix}0&-\omega\\ \omega&0\end{pmatrix}$。
::: solution
(a) $A = 2I + N$，其中$N = \begin{pmatrix}0&1\\0&0\end{pmatrix}$，$N^2 = 0$，且$2I$与$N$可交换。由[[#prop-expm]]，$e^{At} = e^{2t}e^{Nt} = e^{2t}(I + Nt)$：

$$
e^{At} = e^{2t}\begin{pmatrix}1 & t\\ 0 & 1\end{pmatrix}.
$$

(b) 这里$A^2 = -\omega^2I$，所以$A^{2k} = (-1)^k\omega^{2k}I$，$A^{2k+1} = (-1)^k\omega^{2k}A$。把级数分成偶数项和奇数项，

$$
e^{At} = \sum_k\frac{(-1)^k(\omega t)^{2k}}{(2k)!}I + \frac{1}{\omega}\sum_k\frac{(-1)^k(\omega t)^{2k+1}}{(2k+1)!}A = \cos\omega t\,I + \frac{\sin\omega t}{\omega}A = \begin{pmatrix}\cos\omega t & -\sin\omega t\\ \sin\omega t & \cos\omega t\end{pmatrix}.
$$

无穷小旋转的指数是一个旋转：$\mathbf{x}' = A\mathbf{x}$的解以角速度$\omega$沿圆周运动。
:::
:::

::: quiz
当$A = \begin{pmatrix}0&1\\0&0\end{pmatrix}$时，$e^{At}$是什么？
- [ ] $\begin{pmatrix}1&e^t\\0&1\end{pmatrix}$
- [x] $\begin{pmatrix}1&t\\0&1\end{pmatrix}$
- [ ] $\begin{pmatrix}e^t&e^t\\0&e^t\end{pmatrix}$
- [ ] $\begin{pmatrix}1&0\\0&1\end{pmatrix}$，因为$A^2 = 0$
::: solution
$A^2 = 0$，所以级数在两项之后就终止了：$e^{At} = I + At = \begin{pmatrix}1&t\\0&1\end{pmatrix}$。这就是方程组$x_1' = x_2$，$x_2' = 0$：速度不变，位置线性增长。逐个元素取指数（第一和第三个选项）是常见的错误。
:::
:::

矩阵指数也能求解非齐次方程组，所用的积分因子技巧与[[ode/first-order#thm-linear]]中相同。

::: theorem 方程组的常数变易法 {#thm-vop-system}
若$\mathbf{f}$连续，则$\mathbf{x}' = A\mathbf{x} + \mathbf{f}(t)$，$\mathbf{x}(0) = \mathbf{x}_0$的解为

$$
\mathbf{x}(t) = e^{At}\mathbf{x}_0 + \int_0^te^{A(t-s)}\,\mathbf{f}(s)\,ds .
$$ {#eq-vop-system}
:::

::: proof
乘以“积分因子”$e^{-At}$。由[[#thm-expm]]和乘积法则，对任一解有$\bigl(e^{-At}\mathbf{x}\bigr)' = e^{-At}\mathbf{x}' - e^{-At}A\mathbf{x} = e^{-At}\mathbf{f}(t)$。从$0$到$t$积分，得$e^{-At}\mathbf{x}(t) - \mathbf{x}_0 = \int_0^te^{-As}\mathbf{f}(s)\,ds$，再乘以$e^{At}$（利用[[#prop-expm]]，$e^{At}e^{-As} = e^{A(t-s)}$）即得[[#eq-vop-system]]。反过来，对[[#eq-vop-system]]求导可知它确实是解。
:::

其中的积分是强迫项与矩阵“脉冲响应”$e^{At}$的卷积，这与[[ode/laplace-transform#thm-convolution]]完全一样；事实上$\mathcal{L}\{e^{At}\} = (sI - A)^{-1}$。

::: example 受迫旋转 {#ex-forced-system}
求解$\mathbf{x}' = \begin{pmatrix}0&1\\-1&0\end{pmatrix}\mathbf{x} + \begin{pmatrix}0\\1\end{pmatrix}$，$\mathbf{x}(0) = \mathbf{0}$。
::: solution
由[[#ex-expm]]的(b)（取$\omega = -1$），$e^{At} = \begin{pmatrix}\cos t&\sin t\\-\sin t&\cos t\end{pmatrix}$。由[[#eq-vop-system]]，

$$
\mathbf{x}(t) = \int_0^t\begin{pmatrix}\cos(t-s)&\sin(t-s)\\-\sin(t-s)&\cos(t-s)\end{pmatrix}\begin{pmatrix}0\\1\end{pmatrix}ds = \int_0^t\begin{pmatrix}\sin(t-s)\\ \cos(t-s)\end{pmatrix}ds = \begin{pmatrix}1 - \cos t\\ \sin t\end{pmatrix}.
$$

这个方程组其实就是$x_1'' + x_1 = 1$（$x_2 = x_1'$），而答案正是无阻尼振子在常力作用下熟悉的响应$1 - \cos t$：围绕新平衡点$(1,0)$、半径为$1$的圆。
:::
:::

## 平面上的相图

对于$\det A\neq0$的$2\times2$实矩阵$A$，原点是$\mathbf{x}' = A\mathbf{x}$唯一的平衡点，而平面上所有轨线构成的图景——**相图**——由特征值决定。记$\tau = \tr A$，$\Delta = \det A$，则特征多项式为$\lambda^2 - \tau\lambda + \Delta$，所以

$$
\lambda_{1,2} = \frac{\tau\pm\sqrt{\tau^2 - 4\Delta}}{2}, \qquad \lambda_1 + \lambda_2 = \tau, \qquad \lambda_1\lambda_2 = \Delta .
$$

| 条件 | 特征值 | 原点 |
|---|---|---|
| $\Delta < 0$ | 实数，异号 | 鞍点（不稳定） |
| $\Delta > 0$，$\tau^2 > 4\Delta$，$\tau < 0$ | 实数，均为负 | 稳定结点 |
| $\Delta > 0$，$\tau^2 > 4\Delta$，$\tau > 0$ | 实数，均为正 | 不稳定结点 |
| $\Delta > 0$，$\tau^2 = 4\Delta$ | 实数，二重 | 退化结点或星形结点 |
| $\Delta > 0$，$\tau^2 < 4\Delta$，$\tau < 0$ | 复数，$\operatorname{Re} < 0$ | 稳定焦点 |
| $\Delta > 0$，$\tau^2 < 4\Delta$，$\tau > 0$ | 复数，$\operatorname{Re} > 0$ | 不稳定焦点 |
| $\Delta > 0$，$\tau = 0$ | 纯虚数 | 中心（稳定，但不是渐近稳定） |

在**迹-行列式平面**上，这些区域被轴$\Delta = 0$、它上方的半轴$\tau = 0$以及抛物线$\tau^2 = 4\Delta$分隔开。鞍点、结点和焦点充满开区域，它们是稳健的：$A$的微小改变不会改变类型。中心和退化结点位于曲线上，最轻微的扰动就会把它们变成别的类型。

::: widget phaseplane
matrix: -1, 2; -2, -1
x: -3, 3
y: -3, 3
points: 2.5, 0; -2.5, 1; 0, 2.5
caption: [[#ex-spiral]]中的稳定焦点。用各元素的滑块在迹-行列式平面上巡游：把两个对角元都设为$0$，得到中心（闭合的椭圆）；使对角元为正，螺线的方向就会反转；使两个非对角元同号，就得到实特征值——结点，或者当$\det A < 0$时得到鞍点。面板会显示每一步的特征值和类型。
:::

对于$n\times n$方程组，同一个问题——是否所有解都衰减？——由特征值实部的符号来回答。

::: theorem 线性方程组的稳定性 {#thm-linear-stability}
设$A$是$n\times n$实矩阵。

1. 若$A$的每个特征值都具有负实部，则存在常数$C\ge1$和$\alpha > 0$，使得当$t\ge0$时$\norm{e^{At}}\le Ce^{-\alpha t}$。因此$\mathbf{x}' = A\mathbf{x}$的每个解都以指数速度趋于$\mathbf{0}$，原点是**渐近稳定**的。
2. 若某个特征值具有正实部，则存在从任意接近$\mathbf{0}$的点出发、且满足$\norm{\mathbf{x}(t)}\to\infty$的解；原点是**不稳定**的。
:::

::: proof
1. 由若尔当标准形（[[linear-algebra/jordan-form]]），存在可逆复矩阵$P$使$A = PJP^{-1}$，其中$J$是分块对角矩阵，其对角块为$\lambda I + N$，$N$幂零。由[[#prop-expm]]和[[#ex-expm]]中的计算，$e^{Jt}$的每个元素都形如$t^ke^{\lambda t}/k!$，其中$\lambda$是某个特征值，$k < n$；并且$e^{At} = Pe^{Jt}P^{-1}$。取$\alpha > 0$，使它小于每个特征值的$\lvert\operatorname{Re}\lambda\rvert$。则$\lvert t^ke^{\lambda t}\rvert e^{\alpha t} = t^ke^{(\operatorname{Re}\lambda + \alpha)t}\to0$，所以每个这样的项在$[0,\infty)$上都不超过某个常数乘以$e^{-\alpha t}$，从而$\norm{e^{At}}$也是如此。于是$\norm{\mathbf{x}(t)}\le\norm{e^{At}}\norm{\mathbf{x}_0}\le Ce^{-\alpha t}\norm{\mathbf{x}_0}$。

2. 设$A\mathbf{v} = \lambda\mathbf{v}$，$\operatorname{Re}\lambda = \mu > 0$。若$\lambda$是实数，则$\mathbf{x}(t) = \eps e^{\lambda t}\mathbf{v}$是从$\eps\mathbf{v}$出发的解，这个初始点可以任意接近$\mathbf{0}$，而$\norm{\mathbf{x}(t)}\to\infty$。若$\lambda = \mu + i\beta$，$\beta\ne0$，则利用[[#prop-complex]]中的$\mathbf{x}_1$：由于$\mathbf{a}, \mathbf{b}$线性无关，$\norm{\mathbf{x}_1(t)}\ge e^{\mu t}m$，其中$m = \min_\theta\norm{\mathbf{a}\cos\theta - \mathbf{b}\sin\theta} > 0$；然后像前面一样乘以$\eps$。
:::

::: quiz
判断$\mathbf{x}' = \begin{pmatrix}2&3\\-1&-2\end{pmatrix}\mathbf{x}$的原点类型。
- [x] 鞍点
- [ ] 中心，因为迹为零
- [ ] 稳定焦点
- [ ] 不稳定结点
::: solution
$\tau = 0$，但$\Delta = -4 + 3 = -1 < 0$，所以特征值是异号的实数（$\pm1$）：原点是鞍点。只有当$\Delta > 0$时，迹为零才给出中心。
:::
:::

::: application 耦合振子与简正模
两个质量相等的质点，分别用相同的弹簧与墙壁相连，彼此之间也用同样的弹簧相连，它们满足$x_1'' = -2x_1 + x_2$，$x_2'' = x_1 - 2x_2$（取适当的单位），即$\mathbf{x}'' = K\mathbf{x}$，其中$K = \begin{pmatrix}-2&1\\1&-2\end{pmatrix}$。试探$\mathbf{x} = \cos(\omega t)\mathbf{v}$，得$K\mathbf{v} = -\omega^2\mathbf{v}$：$K$的特征向量就是**简正模**$(1,1)$（两个质点同向运动，$\omega = 1$）和$(1,-1)$（反向运动，$\omega = \sqrt3$），而每个运动都是这两个简正模的叠加。对成千上万个质点作同样的分析，就得到分子、桥梁和飞机机翼的振动模态；而在质点个数趋于无穷的极限下，就导出了[[pde/wave-equation]]一章中的波动方程。
:::

::: history
线性微分方程组在18世纪出现于天体力学和微小振动的研究中，拉格朗日（Lagrange）在1788年的《分析力学》（*Mécanique analytique*）中，把力学系统在平衡位置附近的运动化为相互独立的简正模。方程组的特征方程——即“久期方程”，之所以这样称呼，是因为它支配着行星轨道的长期（久期）摄动——由拉格朗日和拉普拉斯（Laplace）研究过，而柯西（Cauchy）在1829年证明了对称矩阵的特征值都是实数。关于方程组的朗斯基行列式的刘维尔（Liouville）公式可以追溯到1838年。现代的矩阵语言，包括指数$e^{At}$和若尔当标准形（卡米尔·若尔当（Camille Jordan），1870年），在20世纪成为标准，这在很大程度上要归功于控制理论。
:::

## 后续内容

平面相图的分类是[[ode/nonlinear-systems]]一章的出发点：在那里，非线性方程组在平衡点附近用它的线性化$\mathbf{x}' = J\mathbf{x}$来近似，其中$J$是雅可比矩阵，而[[#thm-linear-stability]]在大多数情形下决定了稳定性。对大型矩阵可靠地计算$e^{At}$是数值线性代数的一个经典问题（[[numerical-analysis/iterative-methods]]），而刚性方程组——其特征值的大小相差悬殊——需要专门的方法（[[numerical-analysis/numerical-odes]]）。把热方程这样的偏微分方程在空间上离散化，会得到一个巨大的线性方程组$\mathbf{u}' = A\mathbf{u}$，它的特征向量近似于[[pde/heat-equation]]一章中的傅里叶模式。

::: summary
- $n$阶线性方程等价于以友矩阵为系数矩阵的一阶方程组；线性方程组有唯一的整体解（[[#thm-eu-system]]）。
- $\mathbf{x}' = A(t)\mathbf{x}$的解构成$n$维空间；$n$个解构成一组基，当且仅当它们在某一时刻的值线性无关（[[#thm-dimension]]）；$\det\Phi$满足刘维尔公式$\det\Phi(t) = \det\Phi(t_0)e^{\int\tr A}$。
- 对常数矩阵$A$：特征对给出解$e^{\lambda t}\mathbf{v}$；共轭复特征对给出$e^{\alpha t}(\mathbf{a}\cos\beta t - \mathbf{b}\sin\beta t)$，……；亏损特征值给出$e^{\lambda t}(t\mathbf{v} + \mathbf{w})$。
- $e^{At} = \sum A^kt^k/k!$是满足$\Phi(0) = I$的基解矩阵；仅当$AB = BA$时才有$e^{(A+B)t} = e^{At}e^{Bt}$；$e^{PDP^{-1}t} = Pe^{Dt}P^{-1}$。
- 受迫方程组：$\mathbf{x}(t) = e^{At}\mathbf{x}_0 + \int_0^te^{A(t-s)}\mathbf{f}(s)\,ds$。
- 平面相图按$\tau = \tr A$和$\Delta = \det A$分类：鞍点（$\Delta < 0$）、结点、焦点、中心；所有解都衰减，当且仅当每个特征值都具有负实部（[[#thm-linear-stability]]）。
:::

## 习题

::: exercise 友矩阵 {level=1}
把$y''' - 2y'' - y' + 2y = 0$写成一阶方程组，并求其矩阵的特征值。原方程的通解是什么？
::: solution
令$x_1 = y$，$x_2 = y'$，$x_3 = y''$：

$$
\mathbf{x}' = \begin{pmatrix}0&1&0\\0&0&1\\-2&1&2\end{pmatrix}\mathbf{x}.
$$

特征值是$r^3 - 2r^2 - r + 2 = (r-1)(r+1)(r-2)$的根，即$1, -1, 2$。因此$y = c_1e^t + c_2e^{-t} + c_3e^{2t}$。
:::
:::

::: exercise 对称方程组 {level=1 check="5"}
求解$\mathbf{x}' = \begin{pmatrix}2&1\\1&2\end{pmatrix}\mathbf{x}$，$\mathbf{x}(0) = \begin{pmatrix}1\\0\end{pmatrix}$，并计算$x_1(\ln 2)$。
::: solution
特征值为$3$（特征向量$(1,1)$）和$1$（特征向量$(1,-1)$）。由$(1,0) = \frac12(1,1) + \frac12(1,-1)$，得

$$
\mathbf{x}(t) = \tfrac12e^{3t}\begin{pmatrix}1\\1\end{pmatrix} + \tfrac12e^{t}\begin{pmatrix}1\\-1\end{pmatrix}.
$$

所以$x_1(t) = \frac12(e^{3t} + e^t)$，$x_1(\ln2) = \frac12(8 + 2) = 5$。
:::
:::

::: exercise 分类 {level=1}
判断$\mathbf{x}' = A\mathbf{x}$的原点类型，其中(a) $A = \begin{pmatrix}1&2\\3&-4\end{pmatrix}$；(b) $A = \begin{pmatrix}-3&1\\-1&-1\end{pmatrix}$；(c) $A = \begin{pmatrix}1&-5\\1&-1\end{pmatrix}$。
::: solution
(a) $\Delta = -4 - 6 = -10 < 0$：鞍点（特征值为$2$和$-5$）。
(b) $\tau = -4$，$\Delta = 3 + 1 = 4$，$\tau^2 = 16 = 4\Delta$：二重特征值$-2$，只有一个特征向量$(1,1)$，原点是稳定的退化结点。
(c) $\tau = 0$，$\Delta = -1 + 5 = 4 > 0$：特征值为$\pm2i$，原点是中心。
:::
:::

::: exercise 复特征值 {level=2 check="exp(-pi)"}
求解$\mathbf{x}' = \begin{pmatrix}0&1\\-5&-2\end{pmatrix}\mathbf{x}$，$\mathbf{x}(0) = \begin{pmatrix}1\\0\end{pmatrix}$，并计算$x_1(\pi)$。
::: solution
由$\lambda^2 + 2\lambda + 5 = 0$得$\lambda = -1\pm2i$。对$\lambda = -1 + 2i$，$(A - \lambda I)\mathbf{v} = \mathbf{0}$的第一行为$(1 - 2i)v_1 + v_2 = 0$，所以$\mathbf{v} = (1, -1 + 2i)$，$\mathbf{a} = (1,-1)$，$\mathbf{b} = (0, 2)$。实解为

$$
\mathbf{x}_1 = e^{-t}\begin{pmatrix}\cos2t\\ -\cos 2t - 2\sin 2t\end{pmatrix}, \qquad \mathbf{x}_2 = e^{-t}\begin{pmatrix}\sin 2t\\ -\sin 2t + 2\cos 2t\end{pmatrix}.
$$

在$t = 0$处：由$c_1(1,-1) + c_2(0,2) = (1,0)$得$c_1 = 1$，$c_2 = \frac12$。因此$x_1(t) = e^{-t}\bigl(\cos 2t + \frac12\sin 2t\bigr)$，$x_1(\pi) = e^{-\pi}$。（这个方程组是$y'' + 2y' + 5y = 0$的友矩阵形式，且$x_1 = y$。）
:::
:::

::: exercise 受迫方程组 {level=2 check="2"}
对$A = \begin{pmatrix}0&1\\0&0\end{pmatrix}$，用[[#eq-vop-system]]求解$\mathbf{x}' = A\mathbf{x} + \begin{pmatrix}0\\1\end{pmatrix}$，$\mathbf{x}(0) = \mathbf{0}$，并计算$x_1(2)$。
::: solution
$e^{A(t-s)} = \begin{pmatrix}1 & t - s\\ 0 & 1\end{pmatrix}$，所以

$$
\mathbf{x}(t) = \int_0^t\begin{pmatrix}1&t-s\\0&1\end{pmatrix}\begin{pmatrix}0\\1\end{pmatrix}ds = \int_0^t\begin{pmatrix}t - s\\1\end{pmatrix}ds = \begin{pmatrix}t^2/2\\ t\end{pmatrix}.
$$

这是从静止开始的匀加速运动。$x_1(2) = 2$。
:::
:::

::: exercise 刘维尔公式 {level=2 check="e"}
设$\Phi$是$\mathbf{x}' = A(t)\mathbf{x}$在$t > -1$上的基解矩阵，其中$A(t) = \begin{pmatrix}1 & t\\ \sin t & -\frac{1}{1+t}\end{pmatrix}$，并设$\det\Phi(0) = 2$。求$\det\Phi(1)$。
::: solution
$\tr A(t) = 1 - \frac{1}{1+t}$，所以由[[#thm-liouville]]

$$
\det\Phi(1) = 2\exp\int_0^1\left(1 - \frac{1}{1+t}\right)dt = 2e^{1 - \ln 2} = 2\cdot\frac e2 = e .
$$
:::
:::

::: exercise 不可交换矩阵的指数 {level=3}
设$A = \begin{pmatrix}0&1\\0&0\end{pmatrix}$，$B = \begin{pmatrix}0&0\\1&0\end{pmatrix}$。计算$e^A$、$e^B$、$e^Ae^B$和$e^{A+B}$，并由此得出$e^{A+B}\neq e^Ae^B$。为什么[[#prop-expm]]不适用？
::: solution
$A^2 = B^2 = 0$，所以$e^A = I + A = \begin{pmatrix}1&1\\0&1\end{pmatrix}$，$e^B = \begin{pmatrix}1&0\\1&1\end{pmatrix}$，从而$e^Ae^B = \begin{pmatrix}2&1\\1&1\end{pmatrix}$。其次，$C = A + B = \begin{pmatrix}0&1\\1&0\end{pmatrix}$满足$C^2 = I$，所以把级数分成偶数项和奇数项，

$$
e^{C} = \Bigl(\sum_k\frac{1}{(2k)!}\Bigr)I + \Bigl(\sum_k\frac{1}{(2k+1)!}\Bigr)C = \begin{pmatrix}\cosh 1&\sinh1\\ \sinh1&\cosh1\end{pmatrix}.
$$

由于$\cosh 1\approx1.543\neq2$，二者不同。[[#prop-expm]]要求$AB = BA$，但$AB = \begin{pmatrix}1&0\\0&0\end{pmatrix}\neq\begin{pmatrix}0&0\\0&1\end{pmatrix} = BA$。
:::
:::

::: exercise 矩阵指数的行列式 {level=3}
证明对每个方阵$A$都有$\det e^{A} = e^{\tr A}$，并由此推出$e^A$总是可逆的。
::: solution
$\Phi(t) = e^{At}$满足$\Phi' = A\Phi$，$\Phi(0) = I$（[[#thm-expm]]）。对常数矩阵$A$应用刘维尔公式（[[#thm-liouville]]），得

$$
\det e^{At} = \det I\cdot\exp\left(\int_0^t\tr A\,ds\right) = e^{t\tr A}.
$$

令$t = 1$，得$\det e^A = e^{\tr A}$，它永不为零，所以$e^A$可逆（其逆为$e^{-A}$）。
:::
:::

::: exercise 平面稳定性判据 {level=3}
设$A$是$2\times2$实矩阵。证明：当$t\to\infty$时$\mathbf{x}' = A\mathbf{x}$的每个解都趋于$\mathbf{0}$，当且仅当$\tr A < 0$且$\det A > 0$。
::: solution
设$\lambda_1,\lambda_2$为特征值，$\lambda_1 + \lambda_2 = \tau = \tr A$，$\lambda_1\lambda_2 = \Delta = \det A$。

($\Leftarrow$) 若特征值是复数，则它们为$\frac\tau2\pm i\beta$，实部$\frac\tau2 < 0$。若它们是实数，则$\lambda_1\lambda_2 = \Delta > 0$意味着它们同号，而$\lambda_1 + \lambda_2 = \tau < 0$意味着这个符号为负。无论哪种情形，两个实部都是负的，于是由[[#thm-linear-stability]]，每个解都趋于$\mathbf{0}$。

($\Rightarrow$) 若每个解都趋于$\mathbf{0}$，则没有特征值具有正实部（[[#thm-linear-stability]]第2部分），也没有特征值具有零实部：特征值$0$给出常数解$\mathbf{v}$，而$\pm i\beta$给出[[#prop-complex]]中$\alpha = 0$时不衰减的解。所以两个实部都是负的，从而$\tau = \lambda_1 + \lambda_2 < 0$（实部相加），且$\Delta = \lambda_1\lambda_2 > 0$（两个负数之积，或者对共轭复特征对为$\lvert\lambda\rvert^2$）。
:::
:::

::: exercise 简正模 {level=2 check="sqrt(3)"}
对于上面应用中的耦合质点$x_1'' = -2x_1 + x_2$，$x_2'' = x_1 - 2x_2$，求满足$x_1(0) = 1$，$x_2(0) = 0$，$x_1'(0) = x_2'(0) = 0$的解。较高的简正模频率是多少？
::: solution
$K = \begin{pmatrix}-2&1\\1&-2\end{pmatrix}$的特征值为$-1$（特征向量$(1,1)$）和$-3$（特征向量$(1,-1)$），所以在初速度为零时$\mathbf{x}(t) = c_1\cos t\,(1,1) + c_2\cos\sqrt3t\,(1,-1)$。由$\mathbf{x}(0) = (1,0)$得$c_1 = c_2 = \frac12$：

$$
x_1 = \tfrac12\bigl(\cos t + \cos\sqrt3t\bigr), \qquad x_2 = \tfrac12\bigl(\cos t - \cos\sqrt3t\bigr).
$$

简正模频率为$1$和$\sqrt3$，较高的是$\sqrt3$。由于$\sqrt3$是无理数，运动永远不会严格周期：能量在两个质点之间永无休止地来回转移。
:::
:::
