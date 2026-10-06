矩阵$A = \begin{pmatrix}3&1\\1&3\end{pmatrix}$的特征值为$4$和$2$，对应的特征向量为$(1,1)$和$(1,-1)$。这两个特征向量互相垂直——这并非偶然。$A$是**对称**的，即$A\T = A$，而对称矩阵是线性代数中性质最好的矩阵：它们的特征值总是实数，特征向量总可以选成标准正交的，因此它们总可以通过坐标轴的旋转（或反射）对角化。这就是**谱定理**。

对称矩阵也是应用中最常见的矩阵之一。最小二乘中的矩阵$A\T A$是对称的；统计学中的协方差矩阵、最优化中由二阶导数构成的黑塞矩阵、力学中的惯性张量、工程中的刚度矩阵以及无向网络的邻接矩阵也都是对称的。它们每一个都描述一个**二次型**——形如$3x^2 + 2xy + 3y^2$的函数——而谱定理告诉我们，坐标的旋转可以消去交叉项$xy$，从而显露出二次型的真实形状。本章将证明这个定理，用它对二次型和圆锥曲线进行分类，刻画正定矩阵，并解决二次型在单位球面上的最大化问题。

## 对称矩阵的特征值与特征向量

对称矩阵的关键性质在于，它可以从点积的一侧移到另一侧：

$$
(A\mathbf{x})\cdot\mathbf{y} = (A\mathbf{x})\T\mathbf{y} = \mathbf{x}\T A\T\mathbf{y} = \mathbf{x}\T A\mathbf{y} = \mathbf{x}\cdot(A\mathbf{y}) \qquad\text{对所有 }\mathbf{x}, \mathbf{y}\in\R^n.
$$ {#eq-self-adjoint}

（反之，具有这一性质的矩阵是对称的：取$\mathbf{x} = \mathbf{e}_i$，$\mathbf{y} = \mathbf{e}_j$，即得$a_{ji} = a_{ij}$。）一般内积空间上具有性质[[#eq-self-adjoint]]的算子称为**自伴**算子。

::: theorem 特征值是实数 {#thm-real-eigenvalues}
实对称矩阵的每个特征值都是实数，并且有实的特征向量。
:::

::: proof
设$A$是实对称矩阵，$A\mathbf{z} = \lambda\mathbf{z}$，其中$\lambda\in\C$，$\mathbf{z}\in\C^n$，$\mathbf{z}\neq\mathbf{0}$。用$\bar{\mathbf{z}}$表示对各分量取复共轭所得的向量，考虑数$q = \bar{\mathbf{z}}\T A\mathbf{z}$。由于$A$是实对称的，且$1\times 1$矩阵等于它的转置，

$$
\bar q = \mathbf{z}\T A\bar{\mathbf{z}} = (\mathbf{z}\T A\bar{\mathbf{z}})\T = \bar{\mathbf{z}}\T A\T\mathbf{z} = \bar{\mathbf{z}}\T A\mathbf{z} = q,
$$

所以$q$是实数。又$q = \bar{\mathbf{z}}\T(\lambda\mathbf{z}) = \lambda\,\bar{\mathbf{z}}\T\mathbf{z} = \lambda\sum_i\abs{z_i}^2$，且$\sum\abs{z_i}^2 > 0$。因此$\lambda = q/\sum\abs{z_i}^2$是实数。于是$A - \lambda I$是实的奇异矩阵，所以它的零空间中有非零的实向量，这就是一个实的特征向量。
:::

::: theorem 特征向量的正交性 {#thm-orthogonal-eigenvectors}
若$A$是对称矩阵，$\mathbf{v}_1, \mathbf{v}_2$是属于不同特征值$\lambda_1\neq\lambda_2$的特征向量，则$\mathbf{v}_1\perp\mathbf{v}_2$。
:::

::: proof
利用[[#eq-self-adjoint]]，$\lambda_1(\mathbf{v}_1\cdot\mathbf{v}_2) = (A\mathbf{v}_1)\cdot\mathbf{v}_2 = \mathbf{v}_1\cdot(A\mathbf{v}_2) = \lambda_2(\mathbf{v}_1\cdot\mathbf{v}_2)$。所以$(\lambda_1 - \lambda_2)(\mathbf{v}_1\cdot\mathbf{v}_2) = 0$，又因为$\lambda_1\neq\lambda_2$，故$\mathbf{v}_1\cdot\mathbf{v}_2 = 0$。
:::

没有对称性，这两个定理都不成立：旋转矩阵$\begin{pmatrix}0&-1\\1&0\end{pmatrix}$的特征值为$\pm i$；而$\begin{pmatrix}1&1\\0&2\end{pmatrix}$的特征向量$(1,0)$和$(1,1)$并不垂直。

## 谱定理

::: definition 可正交对角化 {#def-orth-diag}
如果存在正交矩阵$Q$（$Q\T Q = I$，从而$Q^{-1} = Q\T$）和对角矩阵$D$，使得$A = QDQ\T$，则称实方阵$A$是**可正交对角化**的。等价地说，$\R^n$有一组由$A$的特征向量构成的标准正交基——即$Q$的各列。
:::

::: theorem 实对称矩阵的谱定理 {#thm-spectral}
实$n\times n$矩阵可正交对角化当且仅当它是对称矩阵。
:::

::: proof
若$A = QDQ\T$，则$A\T = (Q\T)\T D\T Q\T = QDQ\T = A$，因为对角矩阵是对称的。所以可正交对角化的矩阵是对称的。

反过来，我们对$n$用归纳法；当$n = 1$时，每个矩阵都是对角矩阵。设$A$是$n\ge 2$阶对称矩阵。由[[#thm-real-eigenvalues]]，它有一个实特征值$\lambda_1$及相应的实特征向量，把这个特征向量单位化为单位向量$\mathbf{q}_1$。把$\mathbf{q}_1$扩充为$\R^n$的标准正交基$\mathbf{q}_1, \mathbf{u}_2, \dots, \mathbf{u}_n$（先扩充为任意一组基，再应用格拉姆-施密特（Gram–Schmidt）正交化，[[linear-algebra/inner-products#thm-gram-schmidt]]），令$Q_1$是以这些向量为列的正交矩阵。$Q_1\T AQ_1$的第一列是$Q_1\T A\mathbf{q}_1 = \lambda_1Q_1\T\mathbf{q}_1 = \lambda_1\mathbf{e}_1$。而$Q_1\T AQ_1$是对称的（它的转置是$Q_1\T A\T Q_1$），所以它的第一行也是$\lambda_1\mathbf{e}_1\T$：

$$
Q_1\T AQ_1 = \begin{pmatrix}\lambda_1 & \mathbf{0}\T\\ \mathbf{0} & B\end{pmatrix},
$$

其中$B$是$(n-1)\times(n-1)$对称矩阵。由归纳假设，$B = Q_2D_2Q_2\T$，其中$Q_2$是正交矩阵，$D_2$是对角矩阵。令

$$
Q = Q_1\begin{pmatrix}1&\mathbf{0}\T\\\mathbf{0}&Q_2\end{pmatrix}, \qquad D = \begin{pmatrix}\lambda_1&\mathbf{0}\T\\\mathbf{0}&D_2\end{pmatrix}.
$$

$Q$是正交矩阵的乘积，因而是正交矩阵，并且$Q\T AQ = \begin{pmatrix}1&\mathbf{0}\T\\\mathbf{0}&Q_2\T\end{pmatrix}\begin{pmatrix}\lambda_1&\mathbf{0}\T\\\mathbf{0}&B\end{pmatrix}\begin{pmatrix}1&\mathbf{0}\T\\\mathbf{0}&Q_2\end{pmatrix} = \begin{pmatrix}\lambda_1&\mathbf{0}\T\\\mathbf{0}&Q_2\T BQ_2\end{pmatrix} = D$。所以$A = QDQ\T$。
:::

这个证明表明，在[[linear-algebra/eigenvalues#ex-defective]]中遇到的障碍——特征向量太少——对于对称矩阵是绝不会出现的。把我们现在关于实对称$n\times n$矩阵$A$所知道的结论汇总如下：

- 它有$n$个实特征值（按重数计算）；
- 对每个特征值，特征空间的维数等于代数重数；
- 属于不同特征值的特征空间两两正交，它们合在一起充满整个$\R^n$。

实际中对$A$进行正交对角化的步骤是：求出特征值；对每个特征值求出其特征空间的一组基，并把它化为标准正交基（如果特征空间的维数是$2$或更大，就用格拉姆-施密特正交化）；把所有这些向量作为$Q$的列。把$A = QDQ\T$按列展开，就得到**谱分解**

$$
A = \lambda_1\mathbf{q}_1\mathbf{q}_1\T + \lambda_2\mathbf{q}_2\mathbf{q}_2\T + \dots + \lambda_n\mathbf{q}_n\mathbf{q}_n\T.
$$ {#eq-spectral-decomposition}

每个$\mathbf{q}_i\mathbf{q}_i\T$都是到过$\mathbf{q}_i$的直线上的正交投影的矩阵（[[linear-algebra/least-squares#eq-proj-matrix]]）：对称矩阵是到若干相互垂直的方向上的投影的加权和，权就是特征值。（特征值的集合称为$A$的**谱**，定理的名称即由此而来。）

::: example 一个2×2对称矩阵 {#ex-spectral-2}
将$A = \begin{pmatrix}3&1\\1&3\end{pmatrix}$正交对角化，并写出它的谱分解。
::: solution
$p(\lambda) = \lambda^2 - 6\lambda + 8 = (\lambda - 4)(\lambda - 2)$。对$\lambda = 4$，由$A - 4I = \begin{pmatrix}-1&1\\1&-1\end{pmatrix}$得$(1,1)$；对$\lambda = 2$，由$A - 2I = \begin{pmatrix}1&1\\1&1\end{pmatrix}$得$(1,-1)$。正如[[#thm-orthogonal-eigenvectors]]所保证的，它们是正交的；单位化后得

$$
Q = \frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}, \qquad D = \begin{pmatrix}4&0\\0&2\end{pmatrix}, \qquad A = QDQ\T.
$$

谱分解为

$$
A = 4\cdot\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix} + 2\cdot\frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix} = \begin{pmatrix}2&2\\2&2\end{pmatrix} + \begin{pmatrix}1&-1\\-1&1\end{pmatrix} = \begin{pmatrix}3&1\\1&3\end{pmatrix}.
$$

从几何上看，$A$沿直线$y = x$伸长为$4$倍，沿与之垂直的直线$y = -x$伸长为$2$倍。
:::
:::

::: widget transform2d
matrix: 3,1; 1,3
eigen: true
caption: [[#ex-spectral-2]]中的对称矩阵。它的两条特征向量直线互相垂直，所以与它们对齐的单位正方形会被映成一个矩形：$A$是沿相互垂直的轴的纯伸缩，沿$y = x$伸长为$4$倍，沿$y = -x$伸长为$2$倍。现在把矩阵改成非对称的（比如把$a_{12}$改为$2$），观察两条特征向量直线如何不再垂直。
:::

::: example 重特征值 {#ex-spectral-3}
将$A = \begin{pmatrix}2&1&1\\1&2&1\\1&1&2\end{pmatrix}$正交对角化。
::: solution
$A = I + J$，其中$J$是元素全为1的矩阵。由于$J(1,1,1) = 3(1,1,1)$，且当$x_1 + x_2 + x_3 = 0$时$J\mathbf{x} = \mathbf{0}$，$A$的特征值为$4$（特征向量为$(1,1,1)$）和$1$，后者的特征空间是平面$x_1 + x_2 + x_3 = 0$，维数为$2$。（验证：$\tr A = 6 = 4 + 1 + 1$。）

该平面的一组基是$\mathbf{x}_1 = (1,-1,0)$，$\mathbf{x}_2 = (1,0,-1)$，但它们不正交。在特征空间内作格拉姆-施密特正交化：$\mathbf{v}_2 = \mathbf{x}_2 - \frac{\mathbf{x}_2\cdot\mathbf{x}_1}{\mathbf{x}_1\cdot\mathbf{x}_1}\mathbf{x}_1 = (1,0,-1) - \frac12(1,-1,0) = \left(\frac12, \frac12, -1\right)$，把它放缩为$(1, 1, -2)$。它仍然是属于$1$的特征向量，因为它位于该特征空间中。这两个向量都自动与$(1,1,1)$正交。单位化后得

$$
Q = \begin{pmatrix}\frac{1}{\sqrt3}&\frac{1}{\sqrt2}&\frac{1}{\sqrt6}\\[5pt] \frac{1}{\sqrt3}&-\frac{1}{\sqrt2}&\frac{1}{\sqrt6}\\[5pt] \frac{1}{\sqrt3}&0&-\frac{2}{\sqrt6}\end{pmatrix}, \qquad D = \begin{pmatrix}4&0&0\\0&1&0\\0&0&1\end{pmatrix}.
$$

在这个$2$维特征空间内，**任何**一组标准正交基都可以：有重特征值时，$Q$不是唯一的。
:::
:::

::: warning 可对角化不等于可正交对角化
非对称矩阵也可能是可对角化的——$\begin{pmatrix}1&1\\0&2\end{pmatrix}$有互异的特征值$1$和$2$——但它的特征向量$(1,0)$和$(1,1)$不垂直，所以没有**正交**矩阵$Q$能把它对角化。另外，对于有重特征值的对称矩阵，用消元法求出的特征向量在特征空间内一般是不正交的；记得像[[#ex-spectral-3]]那样，先在特征空间内作格拉姆-施密特正交化，再单位化。
:::

::: remark 复矩阵
对复矩阵而言，转置的角色由**共轭转置**$A^* = \bar A\T$来扮演。满足$A^* = A$的矩阵称为**埃尔米特（Hermite）矩阵**；[[#thm-real-eigenvalues]]的证明表明它的特征值都是实数，并且以**酉矩阵**$U$（$U^*U = I$）代替$Q$后谱定理成立：$A = UDU^*$。更一般地，复矩阵可酉对角化当且仅当它是**正规矩阵**，即$AA^* = A^*A$；酉矩阵和反埃尔米特矩阵都属于这一类。在量子力学中，可观测量是埃尔米特算子，它们可能的测量值就是特征值。完整的复谱定理和实谱定理参见阿克斯勒（Axler）的《线性代数应该这样学》（*Linear Algebra Done Right*）。
:::

::: quiz
下列矩阵中哪些在$\R$上可正交对角化？（选出所有正确的选项。）
- [x] $\begin{pmatrix}1&2\\2&1\end{pmatrix}$
- [ ] $\begin{pmatrix}1&2\\0&3\end{pmatrix}$
- [ ] $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$
- [x] $\begin{pmatrix}5&0&0\\0&-1&0\\0&0&2\end{pmatrix}$
::: solution
由[[#thm-spectral]]，恰好是其中的对称矩阵：第一个和最后一个（对角矩阵本身已经是对角的，取$Q = I$即可）。第二个可对角化（特征值$1$和$3$互异），但不能正交对角化，因为它的特征向量$(1,0)$和$(1,1)$不垂直。那个旋转矩阵根本没有实特征值。
:::
:::

## 二次型

::: definition 二次型 {#def-quadratic-form}
$\R^n$上的**二次型**是形如$Q(\mathbf{x}) = \mathbf{x}\T A\mathbf{x} = \sum_{i,j}a_{ij}x_ix_j$的函数，其中$A$是$n\times n$对称矩阵，称为该**二次型的矩阵**。
:::

每个二次齐次多项式都是一个二次型，并且对应唯一的对称矩阵：把$x_i^2$的系数放在对角线上，把每个交叉项$x_ix_j$的系数**平分**给元素$a_{ij}$和$a_{ji}$。例如

$$
5x_1^2 - 4x_1x_2 + 8x_2^2 = \begin{pmatrix}x_1&x_2\end{pmatrix}\begin{pmatrix}5&-2\\-2&8\end{pmatrix}\begin{pmatrix}x_1\\x_2\end{pmatrix}.
$$

交叉项使二次型难以理解。谱定理可以消去它们。

::: theorem 主轴定理 {#thm-principal-axes}
设$A = QDQ\T$是对称矩阵$A$的正交对角化，其中$D = \diag(\lambda_1, \dots, \lambda_n)$。变量替换$\mathbf{x} = Q\mathbf{y}$把二次型化为不含交叉项的形式：

$$
\mathbf{x}\T A\mathbf{x} = \lambda_1y_1^2 + \lambda_2y_2^2 + \dots + \lambda_ny_n^2.
$$

新的坐标轴——即$Q$的各列——称为该二次型的**主轴**。
:::

::: proof
$\mathbf{x}\T A\mathbf{x} = (Q\mathbf{y})\T QDQ\T(Q\mathbf{y}) = \mathbf{y}\T(Q\T Q)D(Q\T Q)\mathbf{y} = \mathbf{y}\T D\mathbf{y} = \sum_i\lambda_iy_i^2$。
:::

由于$Q$是正交矩阵，这个变量替换是一个旋转（可能还复合一个反射）：它保持长度和角度不变，所以等值集$\mathbf{x}\T A\mathbf{x} = c$的**形状**可以不失真地显现出来。在两个变量的情形，$\lambda_1y_1^2 + \lambda_2y_2^2 = c$（$c > 0$）当两个特征值都为正时是椭圆，当它们异号时是双曲线。

::: example 椭圆的轴 {#ex-ellipse}
判断曲线$5x_1^2 - 4x_1x_2 + 8x_2^2 = 36$的类型，并求出它的轴。
::: solution
矩阵$A = \begin{pmatrix}5&-2\\-2&8\end{pmatrix}$满足$\tr A = 13$，$\det A = 36$，所以$p(\lambda) = \lambda^2 - 13\lambda + 36 = (\lambda - 4)(\lambda - 9)$。对$\lambda = 4$：$A - 4I = \begin{pmatrix}1&-2\\-2&4\end{pmatrix}$，特征向量为$(2, 1)$。对$\lambda = 9$：$A - 9I = \begin{pmatrix}-4&-2\\-2&-1\end{pmatrix}$，特征向量为$(1, -2)$。取$Q = \frac{1}{\sqrt5}\begin{pmatrix}2&1\\1&-2\end{pmatrix}$，令$\mathbf{x} = Q\mathbf{y}$，方程化为

$$
4y_1^2 + 9y_2^2 = 36, \qquad\text{即}\qquad \frac{y_1^2}{9} + \frac{y_2^2}{4} = 1.
$$

这条曲线是椭圆，沿方向$(2,1)$的半轴长为$3$，沿方向$(1, -2)$的半轴长为$2$。较长的轴对应较小的特征值：在二次型增长得慢的方向上，要走得更远才能达到水平$36$。
:::
:::

::: widget contour
f: 5x^2 - 4x*y + 8y^2
x: -4, 4
y: -4, 4
levels: 10
gradient: true
point: 1.2, 0.6
caption: [[#ex-ellipse]]中二次型的等值线。它们是一族同心椭圆，其轴沿着矩阵的特征向量$(2,1)$和$(1,-2)$的方向。拖动该点：梯度$2A\mathbf{x}$垂直于等值线；当且仅当$\mathbf{x}$位于某条主轴上——也就是$A\mathbf{x}$与$\mathbf{x}$平行——时，梯度正对着原点或背离原点。
:::

### 正定性

特征值的符号决定了二次型的定性行为。

::: definition 正定 {#def-pos-def}
如果对每个$\mathbf{x}\neq\mathbf{0}$都有$\mathbf{x}\T A\mathbf{x} > 0$，就称对称矩阵$A$（或它的二次型）是**正定**的；如果对每个$\mathbf{x}$都有$\mathbf{x}\T A\mathbf{x}\ge 0$，就称它是**半正定**的。如果$-A$是正定（半正定）的，就称$A$是**负定（半负定）**的；如果二次型既取正值又取负值，就称它是**不定**的。
:::

::: theorem 正定性的判别 {#thm-pos-def}
对实对称$n\times n$矩阵$A$，下列条件等价：

1. $A$是正定的；
2. $A$的所有特征值都是正的；
3. 存在列线性无关的矩阵$R$，使得$A = R\T R$；
4. 所有**顺序主子式**都是正的：对$k = 1, \dots, n$有$\det A_k > 0$，其中$A_k$是$A$左上角的$k\times k$子矩阵。
:::

::: proof
(1$\Leftrightarrow$2)由[[#thm-principal-axes]]，$\mathbf{x}\T A\mathbf{x} = \sum\lambda_iy_i^2$，其中$\mathbf{y} = Q\T\mathbf{x}$；当$\mathbf{x}$取遍所有非零向量时，$\mathbf{y}$也取遍所有非零向量。若每个$\lambda_i > 0$，则对$\mathbf{y}\neq\mathbf{0}$该和为正。反之，取$\mathbf{x} = \mathbf{q}_i$得$\mathbf{x}\T A\mathbf{x} = \lambda_i$，它必须是正的。

(2$\Rightarrow$3)令$D^{1/2} = \diag(\sqrt{\lambda_1}, \dots, \sqrt{\lambda_n})$，$R = D^{1/2}Q\T$。则$R\T R = QD^{1/2}D^{1/2}Q\T = A$，且$R$可逆，所以它的列线性无关。

(3$\Rightarrow$1)$\mathbf{x}\T R\T R\mathbf{x} = \norm{R\mathbf{x}}^2\ge 0$，等号仅当$R\mathbf{x} = \mathbf{0}$时成立，而由于$R$的列线性无关，这意味着$\mathbf{x} = \mathbf{0}$。

(1$\Rightarrow$4)对$\mathbf{x} = (\mathbf{x}', \mathbf{0})$（其中$\mathbf{x}'\in\R^k$），$\mathbf{x}\T A\mathbf{x} = \mathbf{x}'^{\mathsf T}A_k\mathbf{x}'$；所以$A_k$是正定的，由(1$\Rightarrow$2)，它的特征值都是正的，从而它们的乘积$\det A_k$是正的。

(4$\Rightarrow$1)对$n$用归纳法；当$n = 1$时，$A = (a_{11})$，$a_{11} > 0$。当$n\ge 2$时，写$A = \begin{pmatrix}A_{n-1}&\mathbf{b}\\\mathbf{b}\T&c\end{pmatrix}$。$A_{n-1}$的顺序主子式都是$A$的顺序主子式，所以由归纳假设，$A_{n-1}$是正定的，特别地是可逆的。令$s = c - \mathbf{b}\T A_{n-1}^{-1}\mathbf{b}$，$E = \begin{pmatrix}I&A_{n-1}^{-1}\mathbf{b}\\\mathbf{0}\T&1\end{pmatrix}$。直接相乘（利用$A_{n-1}^{-1}$的对称性）可以验证

$$
A = E\T\begin{pmatrix}A_{n-1}&\mathbf{0}\\\mathbf{0}\T&s\end{pmatrix}E.
$$

两边取行列式得$\det A = \det A_{n-1}\cdot s$（因为$\det E = 1$），所以$s > 0$。现在对$\mathbf{x}\neq\mathbf{0}$，令$\mathbf{y} = E\mathbf{x} = (\mathbf{y}', y_n)\neq\mathbf{0}$（$E$可逆）；则$\mathbf{x}\T A\mathbf{x} = \mathbf{y}'^{\mathsf T}A_{n-1}\mathbf{y}' + sy_n^2 > 0$。
:::

判别法4（**西尔维斯特（Sylvester）判据**）对小矩阵很方便，因为它不需要求特征值。一个密切相关的判别法是：$A$正定当且仅当不作行交换的高斯消元只产生正的主元，因为第$k$个主元等于$\det A_k/\det A_{k-1}$。这时消元给出**楚列斯基（Cholesky）分解**$A = R\T R$，其中$R$是上三角矩阵——这是求解系数矩阵为正定矩阵的方程组的标准方法，计算量只有$LU$分解的一半。

::: example 判别正定性 {#ex-definite}
用三种不同的方法证明$A = \begin{pmatrix}2&-1&0\\-1&2&-1\\0&-1&2\end{pmatrix}$是正定的。
::: solution
**主子式：**$\det A_1 = 2$，$\det A_2 = 4 - 1 = 3$，$\det A_3 = 2(4 - 1) - (-1)(-2 - 0) = 6 - 2 = 4$。全都是正的，所以由[[#thm-pos-def]]，$A$是正定的。主元为$2$、$\frac32$、$\frac43$——即相邻主子式之比$\frac21, \frac32, \frac43$。

**特征值：**它们是$2 - \sqrt2$、$2$、$2 + \sqrt2$，全都是正的。（验证：它们的和为$6 = \tr A$，乘积为$(4 - 2)\cdot 2 = 4 = \det A$。）

**平方和：**二次型为

$$
2x_1^2 + 2x_2^2 + 2x_3^2 - 2x_1x_2 - 2x_2x_3 = x_1^2 + (x_1 - x_2)^2 + (x_2 - x_3)^2 + x_3^2,
$$

除非$x_1 = x_1 - x_2 = x_2 - x_3 = x_3 = 0$，即$\mathbf{x} = \mathbf{0}$，它总是正的。这个矩阵（“二阶差分”矩阵）在把$-u''$离散化时总会出现，例如在热方程中（[[pde/heat-equation]]）。
:::
:::

::: widget surface
f: a*x^2 + 2*b*x*y + c*y^2
x: -2, 2
y: -2, 2
sliders: a=1:-2:3:0.1; b=0:-2:2:0.1; c=1:-2:3:0.1
contours: true
caption: 矩阵为$\begin{pmatrix}a&b\\b&c\end{pmatrix}$的二次型的图像。当$a > 0$且$ac - b^2 > 0$（两个主子式都为正）时，它是一个开口向上的碗：正定。增大$b$直到$b^2 > ac$：碗变成马鞍面，二次型不定，有一个特征值变成了负数。恰好在$b^2 = ac$时，曲面是一道槽——半正定，沿属于特征值$0$的特征向量有一整条零值直线。
:::

::: quiz
$Q(x, y) = x^2 + 6xy + y^2$是哪一类二次型？
- [ ] 正定
- [ ] 半正定但非正定
- [x] 不定
- [ ] 负定
::: solution
它的矩阵是$\begin{pmatrix}1&3\\3&1\end{pmatrix}$，$\det = 1 - 9 = -8 < 0$，所以两个特征值（$4$和$-2$）异号。例如$Q(1,1) = 8 > 0$，但$Q(1,-1) = -4 < 0$。注意两个对角元都是正的：对角元为正并不能推出正定。
:::
:::

## 二次型的最大值

在单位球面上，特征值恰好就是二次型的极值。

::: theorem 瑞利（Rayleigh）原理 {#thm-rayleigh}
设对称矩阵$A$的特征值为$\lambda_1\ge\lambda_2\ge\dots\ge\lambda_n$，相应的标准正交特征向量为$\mathbf{q}_1, \dots, \mathbf{q}_n$。则

$$
\max_{\norm{\mathbf{x}} = 1}\mathbf{x}\T A\mathbf{x} = \lambda_1, \qquad \min_{\norm{\mathbf{x}} = 1}\mathbf{x}\T A\mathbf{x} = \lambda_n,
$$

分别在$\mathbf{x} = \mathbf{q}_1$和$\mathbf{x} = \mathbf{q}_n$处取到。等价地说，**瑞利商**$\dfrac{\mathbf{x}\T A\mathbf{x}}{\mathbf{x}\T\mathbf{x}}$（$\mathbf{x}\neq\mathbf{0}$）介于$\lambda_n$和$\lambda_1$之间。
:::

::: proof
令$\mathbf{y} = Q\T\mathbf{x}$；由于$Q$是正交矩阵，$\norm{\mathbf{y}} = \norm{\mathbf{x}} = 1$。由主轴定理，

$$
\mathbf{x}\T A\mathbf{x} = \sum_i\lambda_iy_i^2\le\lambda_1\sum_iy_i^2 = \lambda_1,
$$

同理$\sum\lambda_iy_i^2\ge\lambda_n$。值$\lambda_1$在$\mathbf{x} = \mathbf{q}_1$处取到，因为$\mathbf{q}_1\T A\mathbf{q}_1 = \lambda_1\mathbf{q}_1\T\mathbf{q}_1 = \lambda_1$；同样，$\lambda_n$在$\mathbf{q}_n$处取到。
:::

例如，在单位圆上，$3x^2 + 2xy + 3y^2$（[[#ex-spectral-2]]中的二次型）在$\pm\frac{1}{\sqrt2}(1,1)$处取最大值$4$，在$\pm\frac{1}{\sqrt2}(1,-1)$处取最小值$2$。若再限制$\mathbf{x}$与$\mathbf{q}_1$正交，则得到下一个最大值$\lambda_2$，依此类推：对称矩阵的特征值是一列约束最大值。用[[multivariable/extrema]]一章中的拉格朗日乘数法也能得到同样的结论：条件$\nabla(\mathbf{x}\T A\mathbf{x}) = \mu\nabla(\mathbf{x}\T\mathbf{x})$就是$2A\mathbf{x} = 2\mu\mathbf{x}$，这是一个特征值方程。

::: application 主成分分析
设$\R^n$中由$N$个点构成的数据集已经中心化，使其均值为$\mathbf{0}$；它的**协方差矩阵**为$C = \frac{1}{N-1}\sum_k\mathbf{x}_k\mathbf{x}_k\T$，这是一个对称半正定矩阵。数据在单位向量$\mathbf{u}$方向上的方差为$\mathbf{u}\T C\mathbf{u}$，所以由[[#thm-rayleigh]]，方差最大的方向——**第一主成分**——是$C$的属于最大特征值的特征向量，下一个是属于第二大特征值的特征向量，依此类推。把数据投影到前几个主成分上，是在尽可能多地保留数据变化的同时降低数据维数的标准方法。在实际中，它是用奇异值分解（[[linear-algebra/svd]]）来计算的。
:::

::: application 二阶导数判别法
在光滑函数$f\colon\R^n\to\R$的临界点$\mathbf{a}$附近，泰勒定理给出$f(\mathbf{a} + \mathbf{h})\approx f(\mathbf{a}) + \frac12\mathbf{h}\T H\mathbf{h}$，其中$H$是由二阶偏导数构成的对称的**黑塞矩阵**。若$H$正定，则$f$在$\mathbf{a}$处取局部极小值；若$H$负定，则取局部极大值；若$H$不定，则$\mathbf{a}$是鞍点。当$n = 2$时，判别条件“$f_{xx} > 0$且$f_{xx}f_{yy} - f_{xy}^2 > 0$”正是西尔维斯特判据。参见[[multivariable/extrema]]。
:::

::: history
对称矩阵最初是以二次型的形式出现的：出现在欧拉（Euler）和拉格朗日（Lagrange）的力学中（转动和惯性的主轴），也出现在通过旋转到主轴来对圆锥曲线和二次曲面进行分类的问题中。奥古斯丁-路易·柯西（Augustin-Louis Cauchy）于1829年证明了对称矩阵的特征根都是实数，并证明了主轴变换在任意维数下都适用。詹姆斯·约瑟夫·西尔维斯特（James Joseph Sylvester）于1852年发表了“惯性定律”：无论用怎样的可逆变量替换把一个二次型化为平方和，其中正平方项和负平方项的个数总是相同的。“谱”（*spectrum*）一词在1897年已由威廉·维尔丁格（Wilhelm Wirtinger）使用，20世纪初大卫·希尔伯特（David Hilbert）用它来称呼积分算子的特征值；而它恰好也描述了原子的谱线——20世纪20年代的量子力学表明，谱线的频率正比于某个自伴算子的特征值之差（即原子的能级之差）——这是一个美妙的巧合。
:::

## 后续内容

谱定理是通向奇异值分解的大门：把它应用于对称半正定矩阵$A\T A$，就能得到与**任意**矩阵$A$相适应的标准正交基（[[linear-algebra/svd]]）。正定矩阵恰好就是$\R^n$上内积的矩阵（[[#exr-inner-product]]），它们是最优化（[[multivariable/extrema]]）、统计学（协方差矩阵）以及楚列斯基分解（[[numerical-analysis/direct-methods]]）和共轭梯度法（[[numerical-analysis/iterative-methods]]）等数值方法的基础。在无穷维情形，自伴算子的谱定理是傅里叶级数和[[pde/sturm-liouville]]一章中施图姆-刘维尔（Sturm–Liouville）理论的基础，在那里，微分算子的特征函数构成函数空间的一组标准正交基。曲面的弯曲程度也由一个对称矩阵决定——即形算子，它的特征值就是主曲率（[[differential-geometry/surface-curvature]]）。

::: summary
- 对于对称矩阵，$(A\mathbf{x})\cdot\mathbf{y} = \mathbf{x}\cdot(A\mathbf{y})$；因此它的特征值都是实数（[[#thm-real-eigenvalues]]），属于不同特征值的特征向量相互正交（[[#thm-orthogonal-eigenvectors]]）。
- 谱定理：$A$对称当且仅当$A = QDQ\T$，其中$Q$是正交矩阵，$D$是对角矩阵（[[#thm-spectral]]）；在重特征值的特征空间内要使用格拉姆-施密特正交化。
- 谱分解：$A = \sum\lambda_i\mathbf{q}_i\mathbf{q}_i\T$，即到相互垂直的直线上的投影的加权和。
- 在主轴坐标$\mathbf{x} = Q\mathbf{y}$下，二次型$\mathbf{x}\T A\mathbf{x}$化为$\sum\lambda_iy_i^2$（[[#thm-principal-axes]]）；圆锥曲线按特征值的符号分类。
- 正定$\iff$所有特征值为正$\iff A = R\T R$（$R$的列线性无关）$\iff$所有顺序主子式为正（[[#thm-pos-def]]）。
- 在单位球面上，$\mathbf{x}\T A\mathbf{x}$的取值范围恰好介于最小特征值和最大特征值之间，这两个值在相应的特征向量处取到（[[#thm-rayleigh]]）。
:::

## 习题

::: exercise 正交对角化 {level=1}
将$A = \begin{pmatrix}1&2\\2&1\end{pmatrix}$正交对角化，并写出它的谱分解。
::: solution
$p(\lambda) = \lambda^2 - 2\lambda - 3 = (\lambda - 3)(\lambda + 1)$；属于$3$的特征向量为$(1,1)$，属于$-1$的特征向量为$(1,-1)$。所以$Q = \frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$，$D = \diag(3, -1)$，且

$$
A = 3\cdot\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix} - 1\cdot\frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$
:::
:::

::: exercise 二次型的矩阵 {level=1}
把$Q(\mathbf{x}) = 3x_1^2 + 2x_2^2 - x_3^2 + 4x_1x_2 - 6x_2x_3$写成$\mathbf{x}\T A\mathbf{x}$的形式（$A$对称），并用两种方法计算$Q(1, 1, 1)$。
::: solution
把每个交叉项系数平分：$A = \begin{pmatrix}3&2&0\\2&2&-3\\0&-3&-1\end{pmatrix}$。直接计算，$Q(1,1,1) = 3 + 2 - 1 + 4 - 6 = 2$；而$A(1,1,1) = (5, 1, -4)$，所以$\mathbf{x}\T A\mathbf{x} = 5 + 1 - 4 = 2$。
:::
:::

::: exercise 在圆上的最小值 {level=1 check="1"}
证明$2x^2 + 4xy + 5y^2$是正定的，并求它在单位圆$x^2 + y^2 = 1$上的最小值。
::: solution
矩阵$\begin{pmatrix}2&2\\2&5\end{pmatrix}$的顺序主子式为$2 > 0$和$10 - 4 = 6 > 0$，所以它是正定的。它的特征值满足$\lambda^2 - 7\lambda + 6 = 0$，所以特征值为$1$和$6$。由[[#thm-rayleigh]]，在单位圆上的最小值为$1$，在$\pm\frac{1}{\sqrt5}(2,-1)$（属于$1$的特征向量）处取到。
:::
:::

::: exercise 双曲线 {level=2 check="1"}
判断曲线$x^2 + 4xy + y^2 = 3$的类型，求出它的主轴，并求原点到曲线上的点的最小距离。
::: solution
矩阵$\begin{pmatrix}1&2\\2&1\end{pmatrix}$的特征值为$3$（特征向量为$(1,1)$）和$-1$（特征向量为$(1,-1)$）。在坐标$\mathbf{x} = Q\mathbf{y}$（其中$Q = \frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$）下，曲线为$3y_1^2 - y_2^2 = 3$，即$y_1^2 - \frac{y_2^2}{3} = 1$：这是一条主轴沿$y = x$和$y = -x$的双曲线。由于$Q$保持长度不变，到原点的距离为$\sqrt{y_1^2 + y_2^2} = \sqrt{1 + \frac43y_2^2}$，当$y_2 = 0$时最小：最小距离为$1$，在顶点$\pm\frac{1}{\sqrt2}(1,1)$处取到。
:::
:::

::: exercise 一族矩阵 {level=2 check="1/sqrt(2)"}
当实数$k$取何值时，$\begin{pmatrix}1&k&0\\k&1&k\\0&k&1\end{pmatrix}$是正定的？求最大的$c$，使得该矩阵对所有$\abs{k} < c$都是正定的。
::: solution
顺序主子式为$1$、$1 - k^2$和$\det A = 1\cdot(1 - k^2) - k\cdot(k - 0) = 1 - 2k^2$。它们全为正当且仅当$k^2 < \frac12$（这也保证了$1 - k^2 > 0$）。所以$A$正定当且仅当$\abs{k} < \frac{1}{\sqrt2}$，从而$c = \frac{1}{\sqrt2}$。
:::
:::

::: exercise 矩阵的平方根 {level=2}
求一个对称正定矩阵$B$，使得$B^2 = \begin{pmatrix}5&4\\4&5\end{pmatrix}$。
::: hint
在谱分解中对特征值取平方根。
:::
::: solution
$A = \begin{pmatrix}5&4\\4&5\end{pmatrix}$的特征值为$9$（特征向量为$(1,1)$）和$1$（特征向量为$(1,-1)$），所以$A = 9P_1 + 1P_2$，其中$P_1 = \frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$，$P_2 = \frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$。由于$P_1^2 = P_1$，$P_2^2 = P_2$，且$P_1P_2 = P_2P_1 = O$，矩阵$B = 3P_1 + 1P_2 = \begin{pmatrix}2&1\\1&2\end{pmatrix}$满足$B^2 = 9P_1 + P_2 = A$。它是对称的，特征值为$3, 1 > 0$。验证：$\begin{pmatrix}2&1\\1&2\end{pmatrix}^2 = \begin{pmatrix}5&4\\4&5\end{pmatrix}$。
:::
:::

::: exercise 二次型的最大值 {level=2 check="3"}
在约束$x_1^2 + x_2^2 + x_3^2 = 1$下，求$x_1^2 + x_2^2 + x_3^2 + 2x_1x_2 + 2x_1x_3 + 2x_2x_3$的最大值，以及取到最大值的一个点。
::: solution
这个二次型就是$(x_1 + x_2 + x_3)^2$，其矩阵为$J$，即元素全为1的$3\times 3$矩阵。$J$有特征值$3$，对应的特征向量为$(1,1,1)$；在平面$x_1 + x_2 + x_3 = 0$上有特征值$0$。由[[#thm-rayleigh]]，最大值为$3$，在$\pm\frac{1}{\sqrt3}(1,1,1)$处取到；最小值为$0$。（柯西-施瓦茨（Cauchy–Schwarz）不等式给出同样的结果：$(x_1 + x_2 + x_3)^2\le 3(x_1^2 + x_2^2 + x_3^2)$。）
:::
:::

::: exercise 对称且幂零 {level=3}
证明：若实对称矩阵$A$对某个$k\ge 1$满足$A^k = O$，则$A = O$。
::: solution
写$A = QDQ\T$。则$A^k = QD^kQ\T = O$迫使$D^k = O$，所以每个特征值都满足$\lambda_i^k = 0$，即$\lambda_i = 0$。因此$D = O$，$A = QOQ\T = O$。（不用谱定理，对$k = 2$的情形：对每个$\mathbf{x}$，$\norm{A\mathbf{x}}^2 = \mathbf{x}\T A\T A\mathbf{x} = \mathbf{x}\T A^2\mathbf{x} = 0$。）对称性是必不可少的：$\begin{pmatrix}0&1\\0&0\end{pmatrix}$的平方是$O$。
:::
:::

::: exercise 格拉姆矩阵 {level=3}
设$A$是任意实$m\times n$矩阵。证明$A\T A$是半正定的；它正定当且仅当$A$的列线性无关；并且它的所有特征值都$\ge 0$。
::: solution
$A\T A$是对称的，且$\mathbf{x}\T A\T A\mathbf{x} = \norm{A\mathbf{x}}^2\ge 0$，所以它是半正定的。它正定当且仅当对每个$\mathbf{x}\neq\mathbf{0}$有$A\mathbf{x}\neq\mathbf{0}$，即当且仅当$\operatorname{Nul}(A) = \{\mathbf{0}\}$，也就是当且仅当各列线性无关。若$A\T A\mathbf{v} = \lambda\mathbf{v}$且$\norm{\mathbf{v}} = 1$，则$\lambda = \mathbf{v}\T A\T A\mathbf{v} = \norm{A\mathbf{v}}^2\ge 0$。这些特征值的平方根就是$A$的奇异值（[[linear-algebra/svd]]）。
:::
:::

::: exercise 内积就是正定矩阵 {level=3 #exr-inner-product}
证明：若$A$是$n\times n$对称正定矩阵，则$\inner{\mathbf{x}}{\mathbf{y}}_A = \mathbf{x}\T A\mathbf{y}$是$\R^n$上的内积；并且$\R^n$上的每个内积都具有这种形式，且对应的这样的$A$恰有一个。
::: solution
关于$\mathbf{x}$的线性是显然的；对称性：$\mathbf{y}\T A\mathbf{x} = (\mathbf{y}\T A\mathbf{x})\T = \mathbf{x}\T A\T\mathbf{y} = \mathbf{x}\T A\mathbf{y}$；正性正是正定的定义。反之，给定一个内积，令$a_{ij} = \inner{\mathbf{e}_i}{\mathbf{e}_j}$。则$A$是对称的，并且由双线性，$\inner{\mathbf{x}}{\mathbf{y}} = \sum_{i,j}x_iy_j\inner{\mathbf{e}_i}{\mathbf{e}_j} = \mathbf{x}\T A\mathbf{y}$；内积的正性就是说对$\mathbf{x}\neq\mathbf{0}$有$\mathbf{x}\T A\mathbf{x} > 0$，所以$A$是正定的。$A$是唯一的，因为它的元素是确定的：$a_{ij} = \mathbf{e}_i\T A\mathbf{e}_j = \inner{\mathbf{e}_i}{\mathbf{e}_j}$。
:::
:::
