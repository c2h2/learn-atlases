线性方程组$A\mathbf x = \mathbf b$是科学计算的主力。将微分方程离散化、用模型拟合数据、计算样条（[[numerical-analysis/interpolation]]）、执行多元牛顿法的一步、分析电路网络或桥梁结构——最后都归结为一个线性方程组，未知数常常多达数千乃至数百万个。计算机应当怎样求解它们？

当然不是用克拉默法则。按代数余子式展开计算行列式大约需要$n!$次运算，因此一个含$20$个方程的方程组大约需要$20! \approx 2.4\times10^{18}$次运算——即使在高速处理器上也要算几十年。你在[[linear-algebra/linear-systems]]一章中学过的**高斯消去法**大约只需要$\frac23n^3$次运算：$n = 1000$时还不到十亿次运算，只需不到一秒。本章把消去法重新表述为一种**分解**$A = LU$，统计它的运算量，说明为什么必须配合**选主元**才能可靠，并引入**条件数**——它告诉我们计算出的解中有几位数字是可信的。对于对称正定矩阵，**楚列斯基分解**只用一半的运算量就能完成同样的工作。

本章中，$A$始终是$n\times n$实矩阵，**flop**指一次浮点运算（$+$、$-$、$\times$或$/$）。

## 作为矩阵分解的高斯消去法

高斯消去法逐列地从主元行下方的各行中减去主元行的倍数，直到矩阵变为上三角矩阵；然后用回代求出解。在第$k$步，记当前的元素为$a_{ij}^{(k)}$，**乘数**为

$$
\ell_{ik} = \frac{a_{ik}^{(k)}}{a_{kk}^{(k)}}, \qquad i = k+1, \dots, n,
$$

并用第$i$行减去第$k$行的$\ell_{ik}$倍来代替第$i$行。数$a_{kk}^{(k)}$称为第$k$个**主元**。把这些乘数记录下来，消去法就变成了一种矩阵分解。

::: theorem LU 分解 {#thm-lu}
设对$A$作不交换行的高斯消去，得到的主元$u_{11}, \dots, u_{nn}$都非零（完成消去只需要$u_{11}, \dots, u_{n-1,n-1}$非零）。则$A = LU$，其中$U$是消去所得的上三角矩阵，$L$是对角线下方的元素为乘数$\ell_{ik}$的**单位下三角**矩阵（对角元全为$1$）。
:::

::: proof
消去的第$k$步相当于用$M_k = I - \mathbf m_k\mathbf e_k\T$左乘$A^{(k)}$，其中$\mathbf m_k = (0, \dots, 0, \ell_{k+1,k}, \dots, \ell_{nk})\T$，$\mathbf e_k$是第$k$个单位向量。由于$\mathbf e_k\T\mathbf m_k = 0$，有$(I - \mathbf m_k\mathbf e_k\T)(I + \mathbf m_k\mathbf e_k\T) = I - \mathbf m_k(\mathbf e_k\T\mathbf m_k)\mathbf e_k\T = I$，所以$M_k^{-1} = I + \mathbf m_k\mathbf e_k\T$。消去过程给出$M_{n-1}\cdots M_1A = U$，因此

$$
A = M_1^{-1}M_2^{-1}\cdots M_{n-1}^{-1}U = \left(I + \mathbf m_1\mathbf e_1\T\right)\cdots\left(I + \mathbf m_{n-1}\mathbf e_{n-1}\T\right)U .
$$

把乘积展开，凡是含有两个或更多个因子（形如$\mathbf m_j\mathbf e_j\T\mathbf m_k\mathbf e_k\T$，$j < k$）的项都为零，因为$\mathbf e_j\T\mathbf m_k = 0$（向量$\mathbf m_k$的第$1, \dots, k$个分量都是零）。所以乘积等于$I + \sum_k\mathbf m_k\mathbf e_k\T = L$：各个乘数恰好落到对角线下方各自的位置上。
:::

一旦知道了$A = LU$，就可以分两个三角步骤求解$A\mathbf x = \mathbf b$：先用**前代**求解$L\mathbf y = \mathbf b$，再用**回代**求解$U\mathbf x = \mathbf y$。

::: example 手算 LU 分解 {#ex-lu}
求$A = \begin{pmatrix}2 & 1 & 1\\ 4 & -6 & 0\\ -2 & 7 & 2\end{pmatrix}$的 LU 分解，并求解$A\mathbf x = (5, -2, 9)\T$。
::: solution
**第1列。**主元为$2$；乘数为$\ell_{21} = \frac42 = 2$和$\ell_{31} = \frac{-2}{2} = -1$。从第2行减去$2\times$第1行，从第3行减去$-1\times$第1行，得到两行$(0, -8, -2)$和$(0, 8, 3)$。

**第2列。**主元为$-8$；$\ell_{32} = \frac{8}{-8} = -1$，第3行变为$(0, 0, 1)$。因此

$$
L = \begin{pmatrix}1 & 0 & 0\\ 2 & 1 & 0\\ -1 & -1 & 1\end{pmatrix}, \qquad U = \begin{pmatrix}2 & 1 & 1\\ 0 & -8 & -2\\ 0 & 0 & 1\end{pmatrix},
$$

乘出来即可验证$LU = A$。

**前代**$L\mathbf y = \mathbf b$：$y_1 = 5$，$y_2 = -2 - 2\cdot5 = -12$，$y_3 = 9 + 5 + (-12) = 2$。

**回代**$U\mathbf x = \mathbf y$：$x_3 = 2$；由$-8x_2 - 2\cdot2 = -12$得$x_2 = 1$；由$2x_1 + 1 + 2 = 5$得$x_1 = 1$。所以$\mathbf x = (1, 1, 2)\T$，而且确实有$A\mathbf x = (5, -2, 9)\T$。
:::
:::

::: widget rowreduce
matrix: 2,1,1,5; 4,-6,0,-2; -2,7,2,9
augmented: true
caption: 对[[#ex-lu]]的增广矩阵作高斯消去，每次一个行变换，用精确的分数计算。向下消去过程中用到的乘数（$2$、$-1$，然后是$-1$）恰好就是$L$的元素；此时得到的三角矩阵就是$U$。图中继续化到简化行阶梯形，而数值程序从不计算简化行阶梯形——回代的代价更低。
:::

这种分解什么时候存在？由于$A = LU$左上角的$k\times k$子块等于$L$与$U$左上角$k\times k$子块的乘积，它的行列式是$u_{11}u_{22}\cdots u_{kk}$。因此，所有主元都非零当且仅当所有**顺序主子式**$\det A_k$（$k = 1, \dots, n$）都非零，并且此时分解是唯一的（[[#exr-lu-unique]]）。

### 运算量

::: theorem 运算量 {#thm-flops}
计算$n\times n$矩阵的 LU 分解需要$\frac23n^3 + O(n^2)$次浮点运算。前代和回代各需要$n^2 + O(n)$次浮点运算。
:::

::: proof
第$k$步时，主元下方有$n - k$行。对其中每一行，用一次除法求出乘数，而更新其余$n - k$个元素时，每个元素需要一次乘法和一次减法。所以这一步需要$(n - k) + 2(n - k)^2$次浮点运算；令$j = n - k$，对$k = 1, \dots, n-1$求和，得

$$
\sum_{j=1}^{n-1}\left(2j^2 + j\right) = \frac{(n-1)n(2n-1)}{3} + \frac{(n-1)n}{2} = \frac23n^3 + O(n^2).
$$

回代计算$x_i = \left(y_i - \sum_{j > i}u_{ij}x_j\right)/u_{ii}$，需要$2(n - i) + 1$次浮点运算；对$i$求和得$n^2$。前代的情形相同，只是没有除法。
:::

运算量主要花在分解上，而分解只需做一次：此后每增加一个右端项，只需$2n^2$次浮点运算。$n$加倍，时间就变为原来的$8$倍。$n = 10\,000$的稠密方程组大约需要$7\times10^{11}$次浮点运算，在现代笔记本电脑上只需几秒钟。

::: warning 不要计算逆矩阵
求解$A\mathbf x = \mathbf b$时，绝不要先算出$A^{-1}$再作乘法。计算$A^{-1}$大约需要$2n^3$次浮点运算，是 LU 分解的三倍，而且所得的$A^{-1}\mathbf b$通常精度**更差**。公式中的$A^{-1}\mathbf b$应理解为“求解一个线性方程组”；在程序中应使用`numpy.linalg.solve(A, b)`，或者`scipy.linalg.lu_factor`与`lu_solve`。$A^{-1}B$也是如此：对$A$分解一次，再对$B$的每一列分别求解。
:::

利用矩阵的结构可以大大降低运算量。对于**三对角**矩阵（例如[[numerical-analysis/interpolation#thm-spline]]中的样条方程组），消去只涉及三条对角线，需要$O(n)$次浮点运算（即**托马斯算法**，又称追赶法）；对于带宽为$p$的带状矩阵，运算量为$O(np^2)$。由微分方程产生的稀疏矩阵则用稀疏分解或[[numerical-analysis/iterative-methods]]一章中的迭代法来处理。

## 选主元

即使$A$可逆，不交换行的消去也可能失败：$\begin{pmatrix}0 & 1\\ 1 & 1\end{pmatrix}$的第一个主元为零。更糟糕的是，一个**很小的**主元可能在毫无预警的情况下毁掉计算的精度。

::: example 极小的主元 {#ex-tiny-pivot}
在双精度下求解$\begin{pmatrix}10^{-20} & 1\\ 1 & 1\end{pmatrix}\begin{pmatrix}x_1\\ x_2\end{pmatrix} = \begin{pmatrix}1\\ 2\end{pmatrix}$，分别考虑交换两行与不交换两行的情形。
::: solution
精确解为$x_1 = \frac{1}{1 - 10^{-20}} \approx 1$，$x_2 = \frac{1 - 2\cdot10^{-20}}{1 - 10^{-20}} \approx 1$，而且这个矩阵是非常良态的。

**不交换。**乘数为$\ell_{21} = 10^{20}$。于是$u_{22} = 1 - 10^{20}$被舍入为$-10^{20}$，右端变为$2 - 10^{20}$，它也被舍入为$-10^{20}$。回代得$x_2 = 1$，进而$x_1 = \frac{1 - x_2}{10^{-20}} = 0$。答案$x_1 = 0$完全错误。元素$a_{22} = 1$所含的信息被第$1$行的巨大倍数淹没了。

**交换。**交换两行后，主元为$1$，乘数为$10^{-20}$。于是$u_{22} = 1 - 10^{-20}$被舍入为$1$，右端$1 - 2\cdot10^{-20}$被舍入为$1$，所以$x_2 = 1$，$x_1 = 2 - x_2 = 1$：达到了完全的精度。
:::
:::

补救的办法是**部分选主元**（即列主元消去法）：在第$k$步消去之前，把第$k$行与$i \ge k$的各行中使$\abs{a_{ik}^{(k)}}$最大的那一行交换。这样所有乘数都满足$\abs{\ell_{ik}} \le 1$。

```python
import numpy as np

def lu_partial_pivoting(A):
    """返回 perm、L、U，使 A[perm] = L @ U（杜利特尔形式，部分选主元）。"""
    U = np.array(A, dtype=float)
    n = U.shape[0]
    L = np.eye(n)
    perm = np.arange(n)
    for k in range(n - 1):
        p = k + np.argmax(np.abs(U[k:, k]))          # 主元行
        if p != k:                                   # 交换第 k 行与第 p 行
            U[[k, p], k:] = U[[p, k], k:]
            L[[k, p], :k] = L[[p, k], :k]
            perm[[k, p]] = perm[[p, k]]
        L[k+1:, k] = U[k+1:, k] / U[k, k]            # 乘数，|l| <= 1
        U[k+1:, k:] -= np.outer(L[k+1:, k], U[k, k:])
    return perm, L, np.triu(U)
```

::: theorem 列主元 LU 分解 {#thm-plu}
对每个可逆矩阵$A$，都存在置换矩阵$P$、所有元素满足$\abs{\ell_{ij}} \le 1$的单位下三角矩阵$L$以及可逆上三角矩阵$U$，使得$PA = LU$。
:::

::: proof {collapsed}
**证明概要。**在第$k$步，当前矩阵具有分块形式$\begin{pmatrix}U_{11} & *\\ 0 & S\end{pmatrix}$，其中$U_{11}$是可逆上三角矩阵；这个矩阵是由$A$经可逆的行变换得到的。如果$S$的第一列全为零，这个矩阵——从而$A$——就是奇异的。所以$S$的第一列有非零元素，选取其中绝对值最大者作为主元，于是所有乘数的绝对值都不超过$1$。每一步都是$M_kP_k$，其中$P_k$交换某两个序号$\ge k$的行。可以验证，当$j > k$时$P_jM_k = \tilde M_kP_j$，其中$\tilde M_k$是把$M_k$中的两个乘数互换后得到的矩阵，因此所有置换都可以移到右边：$\tilde M_{n-1}\cdots\tilde M_1P_{n-1}\cdots P_1A = U$。令$P = P_{n-1}\cdots P_1$，$L = (\tilde M_{n-1}\cdots\tilde M_1)^{-1}$，就和[[#thm-lu]]一样得到$PA = LU$。细节见 Trefethen 和 Bau 的著作第21讲。
:::

对于[[#ex-lu]]中的矩阵，部分选主元首先交换第$1$行和第$2$行（主元取$4$而不是$2$），得到$L = \begin{pmatrix}1 & 0 & 0\\ 0.5 & 1 & 0\\ -0.5 & 1 & 1\end{pmatrix}$和$U = \begin{pmatrix}4 & -6 & 0\\ 0 & 4 & 1\\ 0 & 0 & 1\end{pmatrix}$。这正是`scipy.linalg.lu`返回的结果；`numpy.linalg.solve`所调用的 LAPACK 子程序`getrf`也是这样做的。

所得结果有多好？威尔金森（Wilkinson）的分析表明，列主元高斯消去法在实践中是向后稳定的，只有一点需要注意：**增长因子**$\rho_n = \max\abs{u_{ij}}/\max\abs{a_{ij}}$。

::: theorem 高斯消去法的向后稳定性 {#thm-ge-backward}
在浮点运算中用列主元高斯消去法算出的$A\mathbf x = \mathbf b$的解$\hat{\mathbf x}$满足$(A + \Delta A)\hat{\mathbf x} = \mathbf b$，其中

$$
\frac{\norm{\Delta A}_\infty}{\norm{A}_\infty} \le c\,n^3\rho_n\,u,
$$

这里$c$是一个不大的常数，$u$是单位舍入。
:::

::: proof {collapsed}
**证明概要。**在每一步都使用标准模型$\operatorname{fl}(x\circ y) = (x\circ y)(1 + \delta)$（[[numerical-analysis/floating-point#ax-standard-model]]），可以证明计算出的因子满足$\hat L\hat U = PA + E$，其中逐元素地有$\abs{E} \le \gamma_n\abs{\hat L}\abs{\hat U}$；还可以证明，三角方程组的求解在同样的逐分量意义下是向后稳定的，正如[[numerical-analysis/floating-point]]一章习题中的内积那样。把这些结合起来，就得到$(A + \Delta A)\hat{\mathbf x} = \mathbf b$，其中$\abs{\Delta A} \le \gamma_{3n}\abs{\hat L}\abs{\hat U}$（不计置换）。采用部分选主元时$\abs{\hat\ell_{ij}} \le 1$，而$\hat U$的元素以$\rho_n\max\abs{a_{ij}}$为界，由此便得到范数形式的界。参见 Higham 的《数值算法的精度与稳定性》（Accuracy and Stability of Numerical Algorithms）第9章。
:::

采用部分选主元时$\rho_n \le 2^{n-1}$，而且这个界是可以达到的：对于对角线和最后一列的元素都是$1$、对角线下方的元素全是$-1$的$10\times10$矩阵，增长因子恰好是$2^9 = 512$。这样的矩阵在实践中极为罕见，实际问题的增长因子几乎总是很小。因此部分选主元是普遍采用的默认做法；计算出的解是某个方程组的精确解，而该方程组的矩阵与$A$大约在第十六位数字上才有差别。这是否足够好，取决于问题本身——这就引出了问题的条件。

::: quiz
为什么部分选主元要选取绝对值**最大**的元素作为主元？
- [ ] 为了使行列式尽可能大
- [x] 为了使所有乘数的绝对值都不超过$1$，从而避免某一行的大倍数淹没其他元素
- [ ] 因为最大的元素最精确
- [ ] 为了使矩阵$U$对称
::: solution
用可选的最大元素作除数，就保证了$\abs{\ell_{ik}} \le 1$。大的乘数会把一行的巨大倍数加到另一行上，另一行原有的信息就在舍入中丢失了，正如[[#ex-tiny-pivot]]那样。选主元除了可能改变行列式的符号之外，并不改变行列式；而且$U$也不是对称的。
:::
:::

## 范数与条件数

为了度量向量和矩阵的误差，我们使用范数。对$\mathbf x \in \R^n$，常用的**向量范数**有$\norm{\mathbf x}_1 = \sum\abs{x_i}$、$\norm{\mathbf x}_2 = \sqrt{\sum x_i^2}$和$\norm{\mathbf x}_\infty = \max\abs{x_i}$。

::: definition 矩阵范数与条件数 {#def-cond}
对于向量范数$\norm\cdot$，**诱导矩阵范数**（算子范数）定义为

$$
\norm A = \max_{\mathbf x \ne \mathbf 0}\frac{\norm{A\mathbf x}}{\norm{\mathbf x}},
$$

即$A$把向量拉伸的最大倍数。可逆矩阵的**条件数**为$\kappa(A) = \norm A\,\norm{A^{-1}}$。
:::

诱导范数满足$\norm{A\mathbf x} \le \norm A\norm{\mathbf x}$和$\norm{AB} \le \norm A\norm B$。当$p = 1$和$p = \infty$时它们很容易计算：$\norm A_\infty$是各**行**元素绝对值之和的最大值，$\norm A_1$是各**列**元素绝对值之和的最大值（[[#exr-inf-norm]]）；$\norm A_2$是最大奇异值（[[linear-algebra/svd]]）。由于$1 = \norm I = \norm{AA^{-1}} \le \norm A\norm{A^{-1}}$，任何条件数都至少是$1$。

::: theorem 线性方程组的敏感性 {#thm-perturbation}
设$A$可逆，$A\mathbf x = \mathbf b$，且$\mathbf b \ne \mathbf 0$。

1. 若$A(\mathbf x + \delta\mathbf x) = \mathbf b + \delta\mathbf b$，则$\dfrac{\norm{\delta\mathbf x}}{\norm{\mathbf x}} \le \kappa(A)\dfrac{\norm{\delta\mathbf b}}{\norm{\mathbf b}}$。
2. 若$(A + \delta A)(\mathbf x + \delta\mathbf x) = \mathbf b$，则$\dfrac{\norm{\delta\mathbf x}}{\norm{\mathbf x + \delta\mathbf x}} \le \kappa(A)\dfrac{\norm{\delta A}}{\norm A}$。
:::

::: proof
1. 与$A\mathbf x = \mathbf b$相减得$A\,\delta\mathbf x = \delta\mathbf b$，所以$\norm{\delta\mathbf x} = \norm{A^{-1}\delta\mathbf b} \le \norm{A^{-1}}\norm{\delta\mathbf b}$。又$\norm{\mathbf b} = \norm{A\mathbf x} \le \norm A\norm{\mathbf x}$，即$\frac{1}{\norm{\mathbf x}} \le \frac{\norm A}{\norm{\mathbf b}}$。把这两个不等式相乘即得结论。

2. 展开得$A\mathbf x + A\,\delta\mathbf x + \delta A(\mathbf x + \delta\mathbf x) = \mathbf b = A\mathbf x$，所以$\delta\mathbf x = -A^{-1}\delta A\,(\mathbf x + \delta\mathbf x)$，从而$\norm{\delta\mathbf x} \le \norm{A^{-1}}\norm{\delta A}\norm{\mathbf x + \delta\mathbf x} = \kappa(A)\frac{\norm{\delta A}}{\norm A}\norm{\mathbf x + \delta\mathbf x}$。
:::

这两个界都是可以达到的，所以$\kappa(A)$恰好就是相对误差在最坏情形下的放大倍数。把第2部分与[[#thm-ge-backward]]结合起来，就得到数值线性代数的基本经验法则：

$$
\frac{\norm{\hat{\mathbf x} - \mathbf x}}{\norm{\mathbf x}} \lesssim \kappa(A)\,u .
$$

在双精度下（$u \approx 10^{-16}$），预计十六位数字中大约会损失$\log_{10}\kappa(A)$位。

::: example 近奇异的方程组 {#ex-nearly-singular}
设$A = \begin{pmatrix}1 & 1\\ 1 & 1.0001\end{pmatrix}$。计算$\kappa_\infty(A)$，并比较$\mathbf b = (2, 2.0001)\T$与$\mathbf b = (2, 2.0002)\T$时的解。
::: solution
$\det A = 0.0001$，$A^{-1} = 10^4\begin{pmatrix}1.0001 & -1\\ -1 & 1\end{pmatrix}$。最大行和分别为$\norm A_\infty = 2.0001$和$\norm{A^{-1}}_\infty = 20\,001$，所以$\kappa_\infty(A) = 2.0001\times20\,001 \approx 40\,004$。

当$\mathbf b = (2, 2.0001)\T$时，解为$\mathbf x = (1, 1)\T$；当$\mathbf b = (2, 2.0002)\T$时，解为$(0, 2)\T$。$\mathbf b$的相对变化只有$5\times10^{-5}$，解却变化了$100\%$，放大倍数为$2\times10^4$，在界$4\times10^4$之内。从几何上看，这两个方程表示两条几乎平行的直线，其中一条直线的微小平移就会使交点移动很远。
:::
:::

::: widget transform2d
matrix: 1, 1; 1, 1.05
editable: true
eigen: false
caption: 近奇异矩阵$\begin{pmatrix}1 & 1\\ 1 & 1.05\end{pmatrix}$把单位正方形压扁成一个狭长的平行四边形（面积$= \det A = 0.05$）：它把一个方向拉伸约$2$倍，把另一个方向压缩约$40$倍，所以$\kappa_2 \approx 80$。求解$A\mathbf x = \mathbf b$就是要撤销这一变换，而这会把被压扁方向上的小误差极大地放大。编辑矩阵元素，使两列更接近平行或更远离平行，观察面积的变化。
:::

::: example 希尔伯特矩阵 {#ex-hilbert}
**希尔伯特矩阵**$H_n$的元素为$h_{ij} = \frac{1}{i + j - 1}$。对若干个$n$，在双精度下求解$H_n\mathbf x = H_n\mathbf 1$（精确解为$\mathbf 1 = (1, \dots, 1)\T$）。
::: solution
用`numpy.linalg.solve`（列主元 LU 分解）求解，结果如下：

| $n$ | $4$ | $6$ | $8$ | $10$ | $12$ | $14$ |
|---|---|---|---|---|---|---|
| $\kappa_2(H_n)$ | $1.6\times10^4$ | $1.5\times10^7$ | $1.5\times10^{10}$ | $1.6\times10^{13}$ | $1.7\times10^{16}$ | $6\times10^{17}$ |
| 相对误差$\norm{\hat{\mathbf x} - \mathbf 1}_\infty$ | $6.6\times10^{-14}$ | $2.4\times10^{-10}$ | $1.2\times10^{-7}$ | $1.7\times10^{-4}$ | $0.70$ | $8.9$ |
| 相对残差 | $0$ | $1.8\times10^{-16}$ | $8.2\times10^{-17}$ | $1.5\times10^{-16}$ | $1.4\times10^{-16}$ | $1.4\times10^{-16}$ |

误差与$\kappa_2(H_n)\,u$吻合得非常好；当$n \ge 12$时，没有一位数字是正确的。然而残差$\norm{\mathbf b - H_n\hat{\mathbf x}}/\norm{\mathbf b}$始终处于舍入误差的水平：算法是向后稳定的，已经完美地完成了它的任务。在双精度下，这个问题本身就毫无希望。
:::
:::

::: warning 残差小并不意味着误差小
残差$\mathbf r = \mathbf b - A\hat{\mathbf x}$是可以计算的，误差$\mathbf x - \hat{\mathbf x}$则不能。由于$\mathbf x - \hat{\mathbf x} = A^{-1}\mathbf r$，[[#thm-perturbation]]的第1部分给出$\frac{\norm{\mathbf x - \hat{\mathbf x}}}{\norm{\mathbf x}} \le \kappa(A)\frac{\norm{\mathbf r}}{\norm{\mathbf b}}$，而希尔伯特矩阵的例子表明，因子$\kappa(A)$是实实在在的。在相信一个残差很小的解之前，一定要先估计条件数（LAPACK 和`numpy.linalg.cond`都能做到这一点）。同样，行列式小并不意味着病态：$10^{-1}I_{100}$的行列式为$10^{-100}$，条件数却是$1$。
:::

## 楚列斯基分解

应用中的许多矩阵是**对称正定**（SPD）的：$A = A\T$，且对所有$\mathbf x \ne \mathbf 0$有$\mathbf x\T A\mathbf x > 0$。协方差矩阵、最小二乘问题的正规方程矩阵$A\T A$、结构力学中的刚度矩阵以及离散化的扩散算子都是对称正定的。对于这类矩阵，存在 LU 分解的一种对称形式，它不需要选主元，运算量也只有一半。

::: theorem 楚列斯基分解 {#thm-cholesky}
实对称矩阵$A$正定，当且仅当它可以写成$A = LL\T$，其中$L$是对角元为正的下三角矩阵。这种分解是唯一的。
:::

::: proof
若$A = LL\T$且$L$可逆，则对$\mathbf x \ne \mathbf 0$有$\mathbf x\T A\mathbf x = \norm{L\T\mathbf x}_2^2 > 0$，所以$A$对称正定。

反之，设$A$对称正定，我们对$n$用归纳法。当$n = 1$时，$A = (a_{11})$，其中$a_{11} > 0$，取$L = (\sqrt{a_{11}})$即可。当$n > 1$时，记

$$
A = \begin{pmatrix}a_{11} & \mathbf w\T\\ \mathbf w & B\end{pmatrix}, \qquad a_{11} = \mathbf e_1\T A\mathbf e_1 > 0 .
$$

令$\alpha = \sqrt{a_{11}}$，$S = B - \frac{1}{a_{11}}\mathbf w\mathbf w\T$。直接相乘可以验证

$$
A = \begin{pmatrix}\alpha & \mathbf 0\T\\ \mathbf w/\alpha & I\end{pmatrix}\begin{pmatrix}1 & \mathbf 0\T\\ \mathbf 0 & S\end{pmatrix}\begin{pmatrix}\alpha & \mathbf w\T/\alpha\\ \mathbf 0 & I\end{pmatrix}.
$$

$S$是对称的，而且是正定的：对$\mathbf y \ne \mathbf 0$，取$\mathbf x = \left(-\frac{\mathbf w\T\mathbf y}{a_{11}}, \mathbf y\right)$，经过简单的计算可得$\mathbf x\T A\mathbf x = \mathbf y\T S\mathbf y$，它是正的。由归纳假设，$S = L_1L_1\T$，其中$L_1$是对角元为正的下三角矩阵，于是$L = \begin{pmatrix}\alpha & \mathbf 0\T\\ \mathbf w/\alpha & L_1\end{pmatrix}$满足$A = LL\T$。

唯一性：若$L_1L_1\T = L_2L_2\T$，则$L_2^{-1}L_1 = L_2\T L_1^{-\mathsf T}$既是下三角矩阵又是上三角矩阵，因而是对角矩阵，记为$D$，并且$D = D^{-\mathsf T} = D^{-1}$；所以$D^2 = I$，而对角元为正迫使$D = I$。
:::

逐列比较$A = LL\T$两边的元素，就得到算法：对$j = 1, \dots, n$，

$$
\ell_{jj} = \sqrt{a_{jj} - \sum_{k<j}\ell_{jk}^2}, \qquad \ell_{ij} = \frac{1}{\ell_{jj}}\left(a_{ij} - \sum_{k<j}\ell_{ik}\ell_{jk}\right) \quad (i > j).
$$

它需要$\frac13n^3 + O(n^2)$次浮点运算，是 LU 分解的一半，因为对称性使工作量减半；它不需要选主元，因为$\sum_k\ell_{ik}^2 = a_{ii}$使$L$的每个元素都以$\sqrt{\max a_{ii}}$为界，所以不会出现元素增长；而且它是向后稳定的。如果计算中遇到对非正数开平方，就说明矩阵不是正定的——在实践中，这是检验正定性最省事的方法。

::: example 计算楚列斯基分解 {#ex-cholesky}
求$A = \begin{pmatrix}4 & 2 & -2\\ 2 & 10 & 2\\ -2 & 2 & 6\end{pmatrix}$的楚列斯基因子。
::: solution
第1列：$\ell_{11} = \sqrt4 = 2$，$\ell_{21} = \frac22 = 1$，$\ell_{31} = \frac{-2}{2} = -1$。第2列：$\ell_{22} = \sqrt{10 - 1^2} = 3$，$\ell_{32} = \frac{2 - (-1)(1)}{3} = 1$。第3列：$\ell_{33} = \sqrt{6 - (-1)^2 - 1^2} = 2$。所以

$$
L = \begin{pmatrix}2 & 0 & 0\\ 1 & 3 & 0\\ -1 & 1 & 2\end{pmatrix},
$$

乘出来即可验证$LL\T = A$。所有被开平方的数都是正数，这就证明了$A$是正定的。
:::
:::

::: quiz
在双精度下求解$\kappa(A) = 10^{12}$的方程组$A\mathbf x = \mathbf b$，下列哪个说法是正确的？
- [ ] 列主元高斯消去法通常能给出大约$16$位正确数字。
- [x] 只能期望大约$4$位正确数字，尽管残差会非常小。
- [ ] 计算出的解会有很大的残差。
- [ ] 改用楚列斯基分解代替 LU 分解就能解决问题。
::: solution
由经验法则，相对误差约为$\kappa u \approx 10^{12}\times10^{-16} = 10^{-4}$：大约有四位正确数字。算法是向后稳定的，所以残差处于舍入误差的水平，与希尔伯特矩阵的例子一样。任何分解都无法克服问题本身的病态性（何况楚列斯基分解只适用于对称正定矩阵）。
:::
:::

::: application 模拟相关的随机变量
要模拟均值为$\mathbf 0$、协方差矩阵为$\Sigma$（对称正定）的随机向量，先一次性算出楚列斯基分解$\Sigma = LL\T$，再生成由相互独立的标准正态变量组成的向量$\mathbf z$，并令$\mathbf x = L\mathbf z$。则$\Cov(\mathbf x) = L\,\Cov(\mathbf z)\,L\T = LL\T = \Sigma$。金融中正是这样模拟相关的资产价格的，统计中也是这样对高斯过程进行抽样的（[[probability/joint-distributions]]）。
:::

::: history
消去法见于中国古代经典《九章算术》（约成书于公元前1世纪至公元1世纪），其第八章通过对算筹排成的各列进行运算来求解多元线性方程组。卡尔·弗里德里希·高斯（Carl Friedrich Gauss）在用最小二乘法计算行星轨道时（1809—1810年）系统地使用了消去法。法国军事大地测量学家安德烈-路易·楚列斯基（André-Louis Cholesky）在1910年前后提出了他的分解方法；在他于第一次世界大战中去世之后，贝努瓦（Benoît）少校于1924年将其发表。计算机出现以后，约翰·冯·诺伊曼（John von Neumann）和赫尔曼·戈德斯坦（Herman Goldstine）（1947年）以及艾伦·图灵（Alan Turing）（1948年）分析了消去法中的舍入误差；图灵既提出了 LU 分解的表述，也引入了“条件数”这一术语。詹姆斯·威尔金森（James Wilkinson）的向后误差分析（1961年）解释了列主元消去法为什么如此有效，而 LAPACK 程序库（1992年）则使稳定的实现得以普遍使用。
:::

## 后续内容

对于大型稀疏方程组，分解过程会把零元素填充为非零元素，代价变得过高；这时就轮到[[numerical-analysis/iterative-methods]]一章中的迭代法登场了。由正交变换构造的 QR 分解是求解最小二乘问题（[[linear-algebra/least-squares]]）的稳定工具，也是计算特征值的 QR 算法的基础。条件数$\kappa_2(A) = \sigma_{\max}/\sigma_{\min}$可以用奇异值分解（[[linear-algebra/svd]]）来解释。求解刚性微分方程的隐式方法在每一步都要解一个线性方程组，通常是对雅可比矩阵作 LU 分解（[[numerical-analysis/numerical-odes]]）。

::: summary
- 高斯消去法就是分解$A = LU$，乘数存放在单位下三角矩阵$L$中；然后用前代和回代求解$A\mathbf x = \mathbf b$。
- 分解需要$\frac23n^3$次浮点运算，每次求解需要$2n^2$次；绝不要计算$A^{-1}$。带状和三对角方程组的运算量为$O(n)$。
- 很小的主元会破坏精度；部分选主元（$PA = LU$，$\abs{\ell_{ij}} \le 1$）使消去法在实践中向后稳定（只要增长因子允许）。
- 条件数$\kappa(A) = \norm A\norm{A^{-1}}$给出了$\mathbf b$和$A$中相对误差放大倍数的上界；预计相对误差为$\kappa(A)u$量级。
- 只有当$\kappa(A)$不太大时，残差小才能保证误差小；希尔伯特矩阵是经典的反例。
- 对称正定矩阵有唯一的楚列斯基分解$A = LL\T$，无须选主元即可用$\frac13n^3$次浮点运算稳定地算出。
:::

## 习题

::: exercise 2×2矩阵的分解 {level=1 check="1"}
求$\begin{pmatrix}2 & 3\\ 4 & 7\end{pmatrix}$的 LU 分解（不选主元）。$u_{22}$等于多少？
::: solution
乘数为$\ell_{21} = 2$，$u_{22} = 7 - 2\cdot3 = 1$。所以$L = \begin{pmatrix}1 & 0\\ 2 & 1\end{pmatrix}$，$U = \begin{pmatrix}2 & 3\\ 0 & 1\end{pmatrix}$。
:::
:::

::: exercise 无穷范数 {level=1 check="7"}
对$A = \begin{pmatrix}1 & -2\\ 3 & 4\end{pmatrix}$，计算$\norm A_\infty$和$\norm A_1$。
::: solution
各行元素绝对值之和为$1 + 2 = 3$和$3 + 4 = 7$，所以$\norm A_\infty = 7$。各列之和为$1 + 3 = 4$和$2 + 4 = 6$，所以$\norm A_1 = 6$。
:::
:::

::: exercise 规模增大 {level=1 check="8"}
在某台计算机上，分解一个$1000\times1000$的稠密矩阵需要$0.05$秒。对于$2000\times2000$的矩阵，所需时间大约变为原来的多少倍？
::: solution
运算量为$\frac23n^3$次浮点运算，所以$n$加倍时运算量变为原来的$2^3 = 8$倍（约$0.4$秒），这里假定计算机在两种规模下的运行速度相同。
:::
:::

::: exercise 手工选主元 {level=2 check="2/3"}
用部分选主元计算$A = \begin{pmatrix}1 & 2\\ 3 & 4\end{pmatrix}$的分解$PA = LU$。$u_{22}$等于多少？
::: solution
第一列中最大的元素是$3$，所以交换两行：$PA = \begin{pmatrix}3 & 4\\ 1 & 2\end{pmatrix}$。于是$\ell_{21} = \frac13$，$u_{22} = 2 - \frac13\cdot4 = \frac23$。所以$L = \begin{pmatrix}1 & 0\\ \frac13 & 1\end{pmatrix}$，$U = \begin{pmatrix}3 & 4\\ 0 & \frac23\end{pmatrix}$，$P = \begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}$。
:::
:::

::: exercise 计算条件数 {level=2 check="2.0001*20001"}
对$A = \begin{pmatrix}1 & 1\\ 1 & 1.0001\end{pmatrix}$，精确计算$\kappa_\infty(A)$。
::: solution
与[[#ex-nearly-singular]]一样，$\norm A_\infty = 2.0001$，$\norm{A^{-1}}_\infty = \frac{2.0001}{0.0001} = 20\,001$，所以$\kappa_\infty(A) = 2.0001\times20\,001 = 40\,004.0001$。
:::
:::

::: exercise 2×2矩阵的楚列斯基因子 {level=2 check="2"}
求$\begin{pmatrix}4 & 2\\ 2 & 5\end{pmatrix}$的楚列斯基因子。$\ell_{22}$等于多少？
::: solution
$\ell_{11} = 2$，$\ell_{21} = \frac22 = 1$，$\ell_{22} = \sqrt{5 - 1} = 2$。所以$L = \begin{pmatrix}2 & 0\\ 1 & 2\end{pmatrix}$，而且$LL\T = \begin{pmatrix}4 & 2\\ 2 & 5\end{pmatrix}$。
:::
:::

::: exercise LU 分解的唯一性 {level=2 #exr-lu-unique}
证明：若$A$可逆，且$A = L_1U_1 = L_2U_2$，其中$L_1, L_2$是单位下三角矩阵，$U_1, U_2$是上三角矩阵，则$L_1 = L_2$，$U_1 = U_2$。
::: solution
四个因子都可逆（$\det L_i = 1$；又由于$\det A \ne 0$，$\det U_i \ne 0$）。由$L_1U_1 = L_2U_2$得$L_2^{-1}L_1 = U_2U_1^{-1}$。左边是单位下三角矩阵（单位下三角矩阵的逆和乘积仍是单位下三角矩阵），右边是上三角矩阵。同时具有这两种形式的矩阵只能是单位矩阵：它是对角元全为$1$的对角矩阵。所以$L_1 = L_2$，进而$U_1 = L_1^{-1}A = U_2$。
:::
:::

::: exercise 无穷范数等于最大行和 {level=3 #exr-inf-norm}
证明：由$\norm\cdot_\infty$诱导的矩阵范数为$\norm A_\infty = \max_i\sum_j\abs{a_{ij}}$。
::: solution
令$R = \max_i\sum_j\abs{a_{ij}}$。对任意$\mathbf x$，$\abs{(A\mathbf x)_i} = \abs{\sum_ja_{ij}x_j} \le \sum_j\abs{a_{ij}}\norm{\mathbf x}_\infty \le R\norm{\mathbf x}_\infty$，所以$\norm A_\infty \le R$。为证反向不等式，选取达到最大值的一行$k$，令$x_j = \sgn(a_{kj})$（若$a_{kj} = 0$，则取$x_j = 1$）。则$\norm{\mathbf x}_\infty = 1$（设$A \ne 0$），且$(A\mathbf x)_k = \sum_j\abs{a_{kj}} = R$，所以$\norm{A\mathbf x}_\infty \ge R$。因此$\norm A_\infty = R$。
:::
:::

::: exercise 正定矩阵的主元 {level=3}
设$A$对称正定。证明：不选主元的高斯消去法永远不会遇到零主元，所有主元都是正的，并且$A = LDL\T$，其中$D$是由主元构成的对角矩阵，$L$是单位下三角矩阵。这与楚列斯基因子有什么关系？
::: hint
对称正定矩阵的顺序主子矩阵$A_k$也是对称正定的。
:::
::: solution
对$\mathbf y \in \R^k$，$\mathbf y \ne \mathbf 0$，用零把它补成$\mathbf x \in \R^n$；则$\mathbf y\T A_k\mathbf y = \mathbf x\T A\mathbf x > 0$，所以每个$A_k$都对称正定，特别地$\det A_k > 0$（它的特征值都是正的）。由于$\det A_k = u_{11}\cdots u_{kk}$（见[[#ex-lu]]之后的讨论），用归纳法可得$u_{kk} = \det A_k/\det A_{k-1} > 0$：没有零主元，而且主元全为正。所以$A = LU$；记$U = D\tilde U$，其中$D = \diag(u_{11}, \dots, u_{nn})$，$\tilde U$是单位上三角矩阵，则$A = LD\tilde U$。取转置得$A = A\T = \tilde U\T DL\T$，由 LU 分解的唯一性（$\tilde U\T$是单位下三角矩阵，$DL\T$是上三角矩阵）得$L = \tilde U\T$。因此$A = LDL\T$，而楚列斯基因子就是$LD^{1/2}$，它的对角元为$\sqrt{u_{kk}}$。
:::
:::

::: exercise 由残差给出误差界 {level=3}
$A\mathbf x = \mathbf b$的计算解$\hat{\mathbf x}$的残差为$\mathbf r = \mathbf b - A\hat{\mathbf x}$。证明$\dfrac{1}{\kappa(A)}\dfrac{\norm{\mathbf r}}{\norm{\mathbf b}} \le \dfrac{\norm{\mathbf x - \hat{\mathbf x}}}{\norm{\mathbf x}} \le \kappa(A)\dfrac{\norm{\mathbf r}}{\norm{\mathbf b}}$，并解释这两个不等式在实践中意味着什么。
::: solution
我们有$\mathbf e = \mathbf x - \hat{\mathbf x} = A^{-1}\mathbf r$。上界：$\norm{\mathbf e} \le \norm{A^{-1}}\norm{\mathbf r}$，$\norm{\mathbf b} \le \norm A\norm{\mathbf x}$；两式相乘即可。下界：$\norm{\mathbf r} = \norm{A\mathbf e} \le \norm A\norm{\mathbf e}$，$\norm{\mathbf x} = \norm{A^{-1}\mathbf b} \le \norm{A^{-1}}\norm{\mathbf b}$，所以$\frac{\norm{\mathbf r}}{\norm{\mathbf b}} \le \norm A\norm{A^{-1}}\frac{\norm{\mathbf e}}{\norm{\mathbf x}}$。在实践中：对于良态矩阵（$\kappa \approx 1$），相对残差是相对误差的可靠估计；对于病态矩阵，真实误差可能落在残差附近一个宽度为$\kappa^2$的范围内的任何位置，残差小几乎说明不了什么。
:::
:::
