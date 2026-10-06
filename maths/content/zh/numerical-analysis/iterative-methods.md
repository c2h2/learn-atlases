受热金属板中的温度、油藏中的压力、电路板周围的电势：在$1000\times1000$的网格上将这类问题离散化，就得到一个有一百万个未知数的线性方程组，其中每个方程只涉及少数几个相邻的未知数。这个矩阵是**稀疏**的：在它的$10^{12}$个元素中，只有大约$5\times10^6$个非零。高斯消去法（[[numerical-analysis/direct-methods]]）会破坏这种稀疏性——分解因子中会出现大量填充——即使利用带状结构，也需要大约$10^{12}$次浮点运算，并要存储数十亿个数。

**迭代法**走的是另一条路：从一个猜测值出发，反复加以改进，而矩阵只通过代价低廉的矩阵-向量乘积参与计算。每次迭代的运算量是非零元个数的几倍；如果迭代收敛得快，总运算量就远低于分解的代价。本章前半部分研究雅可比迭代、高斯-赛德尔迭代和 SOR 迭代这几种经典迭代法，并确切地证明它们何时收敛：答案由迭代矩阵的**谱半径**决定。后半部分转向特征值问题$A\mathbf v = \lambda\mathbf v$，它只能用迭代来求解——五次及五次以上的特征多项式的根没有有限的公式。我们将介绍**幂法**（它是谷歌 PageRank 的基础）和**QR 算法**（它能算出矩阵的全部特征值，是二十世纪最伟大的算法之一）。

## 矩阵分裂迭代法

把矩阵写成差$A = M - N$，其中$M$可逆，并且以$M$为系数矩阵的方程组容易求解。于是$A\mathbf x = \mathbf b$等价于$M\mathbf x = N\mathbf x + \mathbf b$，这就提示我们采用迭代

$$
M\mathbf x^{(k+1)} = N\mathbf x^{(k)} + \mathbf b, \qquad\text{即}\qquad \mathbf x^{(k+1)} = G\mathbf x^{(k)} + M^{-1}\mathbf b, \quad G = M^{-1}N = I - M^{-1}A .
$$ {#eq-splitting}

$G$称为**迭代矩阵**。等价地，$\mathbf x^{(k+1)} = \mathbf x^{(k)} + M^{-1}\mathbf r^{(k)}$，其中$\mathbf r^{(k)} = \mathbf b - A\mathbf x^{(k)}$是残差：每一步都用残差方程的一个近似解来修正当前的猜测值。按$A = D + L + U$把矩阵分裂为对角部分、严格下三角部分和严格上三角部分。

::: definition 雅可比迭代、高斯-赛德尔迭代与 SOR 迭代 {#def-jacobi-gs}
设所有$a_{ii} \ne 0$。**雅可比迭代法**取$M = D$：每个分量都只用旧的值来更新，

$$
x_i^{(k+1)} = \frac{1}{a_{ii}}\Bigl(b_i - \sum_{j\ne i}a_{ij}x_j^{(k)}\Bigr).
$$

**高斯-赛德尔迭代法**取$M = D + L$：按顺序更新各分量，每个分量都使用当前可得的最新值，

$$
x_i^{(k+1)} = \frac{1}{a_{ii}}\Bigl(b_i - \sum_{j<i}a_{ij}x_j^{(k+1)} - \sum_{j>i}a_{ij}x_j^{(k)}\Bigr).
$$

参数为$\omega$的**逐次超松弛迭代法**（SOR）沿高斯-赛德尔方向走得更远：$x_i^{(k+1)} = (1 - \omega)x_i^{(k)} + \omega\,\tilde x_i$，其中$\tilde x_i$是高斯-赛德尔迭代给出的值；这相当于取$M = \frac1\omega D + L$。当$\omega = 1$时，它就是高斯-赛德尔迭代法。
:::

```python
import numpy as np

def gauss_seidel(A, b, x, tol=1e-10, maxit=10_000, omega=1.0):
    """SOR 迭代（omega = 1 时即高斯-赛德尔迭代）；相对残差足够小时停止。"""
    n = len(b)
    for k in range(maxit):
        for i in range(n):
            s = A[i, :i] @ x[:i] + A[i, i+1:] @ x[i+1:]
            x[i] = (1 - omega) * x[i] + omega * (b[i] - s) / A[i, i]
        if np.linalg.norm(b - A @ x) <= tol * np.linalg.norm(b):
            return x, k + 1
    return x, maxit
```

对于稀疏矩阵，内层求和只需遍历每一行的非零元素，所以一轮扫描的运算量大约是非零元个数的两倍。

::: example 雅可比迭代与高斯-赛德尔迭代的比较 {#ex-jacobi-gs}
从$\mathbf x^{(0)} = \mathbf 0$出发，求解$\begin{pmatrix}4 & -1 & 0\\ -1 & 4 & -1\\ 0 & -1 & 4\end{pmatrix}\mathbf x = \begin{pmatrix}2\\ 4\\ 10\end{pmatrix}$，其解为$\mathbf x = (1, 2, 3)\T$。
::: solution
雅可比迭代的一步是$x_1 \leftarrow \frac{2 + x_2}{4}$，$x_2 \leftarrow \frac{4 + x_1 + x_3}{4}$，$x_3 \leftarrow \frac{10 + x_2}{4}$，右端全部使用旧值。第一步得到$(0.5, 1, 2.5)$，第二步得到$(0.75, 1.75, 2.75)$。高斯-赛德尔迭代在更新$x_2$时立即使用新的$x_1 = 0.5$，得$x_2 = \frac{4 + 0.5 + 0}{4} = 1.125$，然后得$x_3 = \frac{10 + 1.125}{4} = 2.781\,25$。最大误差如下：

| $k$ | $1$ | $2$ | $3$ | $4$ | $6$ | $8$ | $10$ |
|---|---|---|---|---|---|---|---|
| 雅可比 | $1.0$ | $0.25$ | $0.13$ | $0.031$ | $3.9\times10^{-3}$ | $4.9\times10^{-4}$ | $6.1\times10^{-5}$ |
| 高斯-赛德尔 | $0.88$ | $0.22$ | $0.027$ | $3.4\times10^{-3}$ | $5.3\times10^{-5}$ | $8.3\times10^{-7}$ | $1.3\times10^{-8}$ |

两者都线性收敛。雅可比迭代的误差平均每步缩小为原来的$\frac{1}{2\sqrt2} \approx 0.354$倍（每两步缩小为$\frac18$），高斯-赛德尔迭代的误差每步缩小为$\frac18$：在这里高斯-赛德尔迭代的速度是雅可比迭代的两倍。下一节将解释这些数字。
:::
:::

::: widget iterative
matrix: 4,1; 2,3
b: 1,2
method: jacobi
start: 0,0
caption: 方程组$4x + y = 1$，$2x + 3y = 2$（解为$(0.1, 0.6)$）的雅可比迭代点，画在这两条直线上。雅可比迭代的每一步都用旧值同时移动两个坐标：虚线辅助线分别水平地通向第一条直线、竖直地通向第二条直线，新的点把这两个移动合在一起，于是路径曲折地趋向交点。右侧的残差历史曲线平均每步按因子$\rho = 1/\sqrt6 \approx 0.41$下降。切换到高斯-赛德尔迭代：路径改为在两条直线之间交替移动，残差每步按$\rho^2 = \frac16$下降。
:::

## 定常迭代的收敛性

设$\mathbf x^*$是精确解。从[[#eq-splitting]]中减去$\mathbf x^* = G\mathbf x^* + M^{-1}\mathbf b$，可知误差$\mathbf e^{(k)} = \mathbf x^{(k)} - \mathbf x^*$满足$\mathbf e^{(k+1)} = G\mathbf e^{(k)}$，所以

$$
\mathbf e^{(k)} = G^k\mathbf e^{(0)} .
$$

一切都取决于幂$G^k$是否趋于零，以及趋于零的速度有多快。

::: definition 谱半径 {#def-spectral-radius}
方阵$G$的**谱半径**为$\rho(G) = \max\set{\abs\lambda : \lambda \text{ 是 } G \text{ 的特征值}}$，即它的（可能为复数的）特征值的绝对值的最大值。
:::

::: theorem 收敛判据 {#thm-spectral}
迭代$\mathbf x^{(k+1)} = G\mathbf x^{(k)} + \mathbf c$对每个初始向量都收敛到$\mathbf x = G\mathbf x + \mathbf c$的解，当且仅当$\rho(G) < 1$。此外，若对某个诱导矩阵范数有$\norm G < 1$，则$\norm{\mathbf e^{(k)}} \le \norm G^k\norm{\mathbf e^{(0)}}$。
:::

::: proof
**范数界。**$\norm{\mathbf e^{(k)}} = \norm{G\mathbf e^{(k-1)}} \le \norm G\norm{\mathbf e^{(k-1)}}$，由归纳法即得这个界；当$\norm G < 1$时它趋于$0$。（这就是[[numerical-analysis/root-finding#thm-contraction]]中的压缩映射定理在$\R^n$中的形式。）

**必要性。**设$G$有特征值$\lambda$，$\abs\lambda \ge 1$，对应的特征向量为$\mathbf v$。若$\lambda$是实数，取初始误差$\mathbf e^{(0)} = \mathbf v$：则$\mathbf e^{(k)} = \lambda^k\mathbf v \not\to\mathbf 0$。若$\lambda$是复数，则$\mathbf v = \mathbf p + i\mathbf q$，其中$\mathbf p, \mathbf q$是实向量；由于$G^k\mathbf v = \lambda^k\mathbf v \not\to \mathbf 0$，$G^k\mathbf p$与$G^k\mathbf q$中至少有一个不趋于$\mathbf 0$，相应的实向量就是一个使迭代失败的初始误差。

**充分性。**先设$G$可对角化，$G = V\Lambda V^{-1}$：则$G^k = V\Lambda^kV^{-1}$，而由于每个$\abs{\lambda_i} < 1$，有$\Lambda^k \to 0$。对于一般的$G$，利用若尔当标准形$G = VJV^{-1}$（[[linear-algebra/jordan-form]]）：特征值为$\lambda$的若尔当块的幂的元素为$\binom{k}{j}\lambda^{k-j}$，当$\abs\lambda < 1$时它们趋于$0$，因为几何衰减因子压倒了多项式因子$\binom kj \le k^j$（[[calculus-2/sequences#thm-ratio-seq]]）。所以在任何情形下都有$G^k \to 0$。
:::

证明还给出了**收敛速度**：渐近地看，误差每迭代一次缩小为原来的$\rho(G)$倍，所以要把误差缩小为原来的$10^{-d}$，大约需要$\frac{d}{-\log_{10}\rho(G)}$次迭代。谱半径为$0.9$时，每获得一位数字需要$22$次迭代；谱半径为$0.999$时则需要$2300$次。

计算$\rho(G)$与求解原问题一样困难，所以我们希望找到能保证收敛的、关于$A$的条件。其中最有用的是对角占优。

::: theorem 对角占优矩阵 {#thm-diag-dominant}
若$A$**严格对角占优**，即对每个$i$都有$\abs{a_{ii}} > \sum_{j\ne i}\abs{a_{ij}}$，则对每个初始向量，雅可比迭代和高斯-赛德尔迭代都收敛。
:::

::: proof
**雅可比迭代。**$G_J = -D^{-1}(L + U)$的非对角元为$-a_{ij}/a_{ii}$，对角元为零，所以它的最大绝对行和为$\norm{G_J}_\infty = \max_i\sum_{j\ne i}\frac{\abs{a_{ij}}}{\abs{a_{ii}}} < 1$。由[[#thm-spectral]]，迭代收敛。

**高斯-赛德尔迭代。**设$\lambda$是$G_{GS} = -(D + L)^{-1}U$的特征值，$\mathbf v$是对应的特征向量，并适当缩放使得$\max_j\abs{v_j} = \abs{v_i} = 1$。由$-U\mathbf v = \lambda(D + L)\mathbf v$，其第$i$行为$-\sum_{j>i}a_{ij}v_j = \lambda\bigl(a_{ii}v_i + \sum_{j<i}a_{ij}v_j\bigr)$。取绝对值并利用$\abs{v_j} \le 1 = \abs{v_i}$，得

$$
\abs\lambda\Bigl(\abs{a_{ii}} - \sum_{j<i}\abs{a_{ij}}\Bigr) \le \sum_{j>i}\abs{a_{ij}} .
$$

由严格对角占优，括号中的量是正的，并且大于右端，所以$\abs\lambda < 1$。因此$\rho(G_{GS}) < 1$。
:::

[[#ex-jacobi-gs]]中的矩阵是严格对角占优的（$4 > 1 + 1$）。第二个经典结果涵盖了另一类重要的矩阵：若$A$**对称正定**，则高斯-赛德尔迭代收敛，而且对每个$0 < \omega < 2$，SOR 迭代也收敛（奥斯特洛夫斯基-赖希（Ostrowski–Reich）定理；见 Golub 和 Van Loan 的《矩阵计算》（Matrix Computations）第11.2节）。对任何矩阵，区间$0 < \omega < 2$都不能再扩大：

::: proposition SOR 迭代的卡汉（Kahan）界 {#prop-kahan}
对每个对角元均非零的矩阵，SOR 迭代矩阵$G_\omega$满足$\rho(G_\omega) \ge \abs{\omega - 1}$。因此，只有当$0 < \omega < 2$时，SOR 迭代才可能对所有初始向量都收敛。
:::

::: proof
由$M = \frac1\omega D + L$和$N = M - A = \left(\frac1\omega - 1\right)D - U$，得$G_\omega = (D + \omega L)^{-1}\bigl((1 - \omega)D - \omega U\bigr)$。两个因子都是三角矩阵，所以它们的行列式等于对角元的乘积：$\det G_\omega = \frac{(1-\omega)^n\det D}{\det D} = (1 - \omega)^n$。行列式是$n$个特征值的乘积，所以至少有一个特征值满足$\abs\lambda \ge \abs{1 - \omega}$。
:::

::: example 由矩阵预测收敛性 {#ex-predict}
对$A = \begin{pmatrix}4 & 1\\ 2 & 3\end{pmatrix}$（上面图中的方程组），验证雅可比迭代和高斯-赛德尔迭代都收敛，并算出它们确切的收敛速度。
::: solution
$A$严格对角占优（$4 > 1$且$3 > 2$），所以由[[#thm-diag-dominant]]，两种方法都收敛。雅可比迭代矩阵为$G_J = -D^{-1}(L + U) = \begin{pmatrix}0 & -\frac14\\ -\frac23 & 0\end{pmatrix}$，其特征多项式为$\lambda^2 - \frac16$，所以$\rho(G_J) = \frac{1}{\sqrt6} \approx 0.408$；它的行和范数$\norm{G_J}_\infty = \frac23$是一个较粗的界。对于高斯-赛德尔迭代，$G_{GS} = -(D + L)^{-1}U = \begin{pmatrix}0 & -\frac14\\ 0 & \frac16\end{pmatrix}$，其特征值为$0$和$\frac16$。所以高斯-赛德尔迭代每一步把误差缩小为原来的$\frac16$，恰好是雅可比迭代因子的平方：每步约得到$0.8$位正确数字，而雅可比迭代只有$0.4$位。
:::
:::

::: quiz
某迭代矩阵的特征值为$0.5$、$-0.9$和$0.3 \pm 0.4i$。下列哪个说法是正确的？
- [ ] 迭代发散，因为有一个负特征值。
- [x] 迭代收敛，误差渐近地每步缩小为原来的约$0.9$倍。
- [ ] 迭代收敛，误差每步缩小为原来的约$0.5$倍。
- [ ] 迭代发散，因为复特征值会引起振荡。
::: solution
谱半径为$\max(0.5, 0.9, \abs{0.3 \pm 0.4i}) = \max(0.5, 0.9, 0.5) = 0.9 < 1$，所以由[[#thm-spectral]]，迭代收敛，其速度由绝对值最大的特征值决定：每获得一位十进制数字大约需要$22$次迭代。负号和复数值只会使误差在衰减的过程中振荡。
:::
:::

### 模型问题

标准测试问题上的收敛速度既显示了经典迭代法的长处，也显示了它们的局限。

::: example 一维模型问题 {#ex-model}
用$n$个内部网格点在$(0, 1)$上将$-u'' = f$离散化，得到对角元为$2$、两侧相邻元素为$-1$的三对角矩阵。要把误差缩小为原来的$10^{-6}$，雅可比迭代、高斯-赛德尔迭代和取最优松弛因子的 SOR 迭代各需要多少次迭代？
::: solution
雅可比迭代矩阵的特征值为$\cos\frac{k\pi}{n+1}$，$k = 1, \dots, n$（[[#exr-model-eigen]]），所以

$$
\rho_J = \cos\frac{\pi}{n+1} \approx 1 - \frac{\pi^2}{2(n+1)^2}, \qquad \rho_{GS} = \rho_J^2, \qquad \rho_{\mathrm{SOR}} = \omega_* - 1 \ \text{ 其中 } \ \omega_* = \frac{2}{1 + \sqrt{1 - \rho_J^2}} ,
$$

后两个等式由扬（Young）的相容次序矩阵理论得到。把误差缩小为原来的$10^{-6}$所需的迭代次数如下：

| $n$ | $\rho_J$ | 雅可比 | 高斯-赛德尔 | 最优$\omega_*$ | SOR |
|---|---|---|---|---|---|
| $10$ | $0.9595$ | $335$ | $168$ | $1.560$ | $24$ |
| $100$ | $0.999\,516$ | $28\,555$ | $14\,278$ | $1.940$ | $223$ |
| $1000$ | $0.999\,995$ | $2\,805\,206$ | $1\,402\,603$ | $1.994$ | $2\,202$ |

高斯-赛德尔迭代恰好比雅可比迭代快一倍，而参数调得好的 SOR 迭代则要快上一个与$n$成正比的倍数。但随着网格加密，三者都会变慢，因为$\rho \to 1$：在网格上变化缓慢的误差分量几乎不会被局部更新所减小。
:::
:::

现代求解器的表现要好得多。共轭梯度法所需的迭代次数只像$\sqrt{\kappa(A)}$那样增长（在这里与$n$成正比），好的预处理还能进一步减少迭代次数；而多重网格法（它先用几轮高斯-赛德尔扫描使误差光滑，再在更粗的网格上校正缓慢变化的部分）所需的迭代次数几乎与$n$无关。

::: widget iterative
matrix: 4,1; 2,3
b: 1,2
method: sor
omega: 1.2
start: 0,0
caption: 对同一方程组作$\omega = 1.2$的 SOR 迭代。超松弛把每次高斯-赛德尔更新推得比它所瞄准的直线更远一点。对于这个强对角占优的小型方程组，高斯-赛德尔迭代本身已经很快，最优的$\omega$接近$1$；试试$\omega = 1.9$和$\omega = 0.5$，并比较残差历史曲线。由[[#prop-kahan]]，$\omega \ge 2$时迭代总是失败。
:::

::: warning 迭代收敛不等于结果精确
迭代求解器用诸如$\norm{\mathbf r^{(k)}} \le \text{tol}\cdot\norm{\mathbf b}$这样的判据来终止。由[[numerical-analysis/direct-methods]]一章中关于残差的界，此时相对误差仍可能大到$\kappa(A)\cdot\text{tol}$。同样，当$\rho(G)$接近$1$时，变化量$\norm{\mathbf x^{(k+1)} - \mathbf x^{(k)}}$小并不意味着误差小：误差可能约为最后一步步长的$\frac{\rho}{1-\rho}$倍，当$\rho = 0.9995$时就是$2000$倍。
:::

## 幂法

特征值决定了结构的振动频率、平衡点的稳定性（[[ode/linear-systems]]）、马尔可夫链的长期行为（[[probability/markov-chains]]）以及数据的主成分。通过特征多项式来计算特征值，在数值上是毫无希望的：多项式的根对系数极其敏感。我们转而直接用矩阵本身进行迭代。最简单的想法是用$A$反复去乘一个向量。

::: algorithm 幂法 {#alg-power}
选取$\mathbf x^{(0)} \ne \mathbf 0$。对$k = 0, 1, 2, \dots$：令$\mathbf y = A\mathbf x^{(k)}$，$\mathbf x^{(k+1)} = \mathbf y/\norm{\mathbf y}$，并用**瑞利商**$\mu_{k+1} = \dfrac{(\mathbf x^{(k+1)})\T A\mathbf x^{(k+1)}}{(\mathbf x^{(k+1)})\T\mathbf x^{(k+1)}}$估计特征值。
:::

::: theorem 幂法的收敛性 {#thm-power}
设$A$可对角化，其特征值满足$\abs{\lambda_1} > \abs{\lambda_2} \ge \cdots \ge \abs{\lambda_n}$，对应的特征向量为$\mathbf v_1, \dots, \mathbf v_n$，并设$\mathbf x^{(0)} = \sum_ic_i\mathbf v_i$，其中$c_1 \ne 0$。则$\mathbf x^{(k)}$的方向收敛到$\mathbf v_1$的方向，并且

$$
\mathbf x^{(k)} = \pm\frac{\mathbf v_1 + O\bigl(\abs{\lambda_2/\lambda_1}^k\bigr)}{\norm{\mathbf v_1 + O(\abs{\lambda_2/\lambda_1}^k)}}, \qquad \mu_k = \lambda_1 + O\left(\abs{\frac{\lambda_2}{\lambda_1}}^k\right),
$$

若$A$对称，则$\mu_k = \lambda_1 + O\left(\abs{\lambda_2/\lambda_1}^{2k}\right)$。
:::

::: proof
规范化只改变向量的长度，所以$\mathbf x^{(k)}$是下面这个向量的倍数：

$$
A^k\mathbf x^{(0)} = \sum_ic_i\lambda_i^k\mathbf v_i = c_1\lambda_1^k\Bigl(\mathbf v_1 + \sum_{i\ge2}\frac{c_i}{c_1}\Bigl(\frac{\lambda_i}{\lambda_1}\Bigr)^k\mathbf v_i\Bigr) .
$$

每个比值都满足$\abs{\lambda_i/\lambda_1} \le \abs{\lambda_2/\lambda_1} < 1$，所以括号中的向量为$\mathbf v_1 + O(\abs{\lambda_2/\lambda_1}^k)$，这就给出了第一个结论；瑞利商是方向的连续函数，在$\mathbf v_1$处$\mu = \lambda_1$，而且它是可微的，所以它继承了同样的收敛速度。若$A$对称，可以取$\mathbf v_i$为标准正交的（[[linear-algebra/spectral-theorem]]）。记$\mathbf x^{(k)} \propto \sum_ia_i\mathbf v_i$，其中$a_1 = 1$，$a_i = O(\abs{\lambda_2/\lambda_1}^k)$，则

$$
\mu_k = \frac{\sum_i\lambda_ia_i^2}{\sum_ia_i^2} = \lambda_1 + \frac{\sum_{i\ge2}(\lambda_i - \lambda_1)a_i^2}{\sum_ia_i^2} = \lambda_1 + O\Bigl(\abs{\frac{\lambda_2}{\lambda_1}}^{2k}\Bigr).
$$
:::

::: example 手算幂法 {#ex-power}
从$\mathbf x^{(0)} = (1, 0)\T$出发，对$A = \begin{pmatrix}2 & 1\\ 1 & 3\end{pmatrix}$应用幂法。
::: solution
特征值为$\frac{5 \pm\sqrt5}{2}$：$\lambda_1 = 3.618\,034$，$\lambda_2 = 1.381\,966$，二者之比为$0.382$。最初几个乘积为$A(1, 0)\T = (2, 1)\T$，然后是$A(2, 1)\T = (5, 5)\T$，再然后是$(15, 20)\T \propto (3, 4)\T$，依此类推。瑞利商及其误差$\lambda_1 - \mu_k$如下：

| $k$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $8$ | $10$ |
|---|---|---|---|---|---|---|---|---|
| $\mu_k$ | $2$ | $3$ | $3.5$ | $3.6$ | $3.615\,385$ | $3.617\,647$ | $3.618\,032\,79$ | $3.618\,033\,963$ |
| 误差 | $1.6$ | $0.62$ | $0.12$ | $0.018$ | $2.6\times10^{-3}$ | $3.9\times10^{-4}$ | $1.2\times10^{-6}$ | $2.6\times10^{-8}$ |

误差每步大约缩小为原来的$0.146 = (0.382)^2$倍，这正是对于对称矩阵所预言的比值的平方；而方向趋近于特征向量$(0.5257, 0.8507)\T$。
:::
:::

::: widget transform2d
matrix: 2, 1; 1, 3
eigen: true
vector: 1, 0
caption: 矩阵$\begin{pmatrix}2 & 1\\ 1 & 3\end{pmatrix}$及其特征向量。作用$A$时，$\mathbf v_1$方向被拉伸$3.618$倍，而$\mathbf v_2$方向只被拉伸$1.382$倍。拖动向量，并设想反复作用$A$：无论初始方向如何（除非它恰好沿着$\mathbf v_2$），$\mathbf v_1$分量都增长得最快，向量逐渐转向$\mathbf v_1$。这就是幂法。
:::

两个简单的改进可以大大扩展这一方法的用途。**反幂法**（逆迭代）把幂法应用于$(A - \sigma I)^{-1}$，其特征值为$\frac{1}{\lambda_i - \sigma}$；其中模最大的那个对应于**最接近位移**$\sigma$的特征值$\lambda_i$，收敛因子为$\frac{\abs{\lambda_i - \sigma}}{\abs{\lambda_j - \sigma}}$，其中$\lambda_j$是第二接近$\sigma$的特征值。每一步都要求解一个系数矩阵相同的线性方程组，所以只需作一次 LU 分解。如果每一步都用当前的瑞利商来更新位移，就得到**瑞利商迭代**，对于对称矩阵，它是**三次**收敛的。

::: application PageRank
谷歌最初的网页排序方法模拟了一个随机浏览者：他随机地点击链接，偶尔跳转到一个随机的网页。一个网页的重要性就是它在长期中被访问的概率，即这个马尔可夫链（[[probability/markov-chains]]）的巨大随机矩阵对应于特征值$1$的主特征向量。网页数以十亿计，任何分解都无法进行，但幂法只需要稀疏的矩阵-向量乘积；而随机跳转（在布林（Brin）和佩奇（Page）1998年的原始论文中，跳转的概率为$0.15$）保证了$\abs{\lambda_2} \le 0.85$，所以几十次迭代就足够了。
:::

## QR 算法

幂法只能求出一个特征值。要求出全部特征值，就把幂法同时应用于许多向量，并保持它们标准正交——然后把计算重新组织成一种极其简单的形式。回忆一下，每个方阵都有**QR 分解**$A = QR$，其中$Q$是正交矩阵（$Q\T Q = I$），$R$是上三角矩阵；它可以用豪斯霍尔德（Householder）反射稳定地计算出来（格拉姆-施密特正交化（[[linear-algebra/inner-products]]）在精确运算下给出相同的因子（至多相差符号），但在浮点运算中，当$A$病态时，它算出的$Q$会丧失正交性——修正形式的情况较轻，但丧失的程度仍与$\kappa(A)$成正比）。

::: algorithm QR 算法 {#alg-qr}
令$A_0 = A$。对$k = 0, 1, 2, \dots$：作分解$A_k = Q_kR_k$，并令$A_{k+1} = R_kQ_k$。
:::

把两个因子的次序颠倒过来，看上去像是一个随意的技巧，但它保持特征值不变，并逐渐把它们显露出来。

::: theorem QR 迭代的性质 {#thm-qr}
1. 每个$A_{k+1} = Q_k\T A_kQ_k$都与$A_k$正交相似，所以所有$A_k$都与$A$有相同的特征值；若$A$对称，则每个$A_k$也都对称。
2. 记$\mathcal Q_k = Q_0Q_1\cdots Q_{k-1}$，$\mathcal R_k = R_{k-1}\cdots R_1R_0$，则$A^k = \mathcal Q_k\mathcal R_k$，且$A_k = \mathcal Q_k\T A\,\mathcal Q_k$。
3. 若$A$是实矩阵，其特征值的绝对值互不相同：$\abs{\lambda_1} > \abs{\lambda_2} > \cdots > \abs{\lambda_n} > 0$（并且特征向量满足一个较弱的条件），则$A_k$趋于上三角形式：它的对角元收敛到$\lambda_1, \dots, \lambda_n$，对角线以下的元素趋于$0$，其中元素$(A_k)_{i+1,i}$像$\abs{\lambda_{i+1}/\lambda_i}^k$一样趋于$0$。（对角线以上的元素未必收敛，它们可能每一步都改变符号。）
:::

::: proof
1. 由$A_k = Q_kR_k$得$R_k = Q_k\T A_k$，所以$A_{k+1} = R_kQ_k = Q_k\T A_kQ_k$，这是一个相似变换，其中$Q_k^{-1} = Q_k\T$。相似矩阵有相同的特征值，而$(Q\T SQ)\T = Q\T S\T Q$表明对称性得以保持。

2. 反复利用第1条，得$A_k = \mathcal Q_k\T A\,\mathcal Q_k$，即$\mathcal Q_kA_k = A\mathcal Q_k$。对第一个等式用归纳法：$A^1 = Q_0R_0$；若$A^k = \mathcal Q_k\mathcal R_k$，则

$$
A^{k+1} = A\,\mathcal Q_k\mathcal R_k = \mathcal Q_kA_k\mathcal R_k = \mathcal Q_kQ_kR_k\mathcal R_k = \mathcal Q_{k+1}\mathcal R_{k+1}.
$$

3. **证明概要。**由第2条，$\mathcal Q_k\mathcal R_k$是$A^k$的 QR 分解；特别地，$\mathcal Q_k$的前$j$列构成$A^k$前$j$列所张成的子空间的一组标准正交基，而这个子空间就是$A^k$作用于$\mathbf e_1, \dots, \mathbf e_j$所张成的子空间的像。把[[#thm-power]]的论证应用于子空间（“同时迭代”），可知这个子空间以$\abs{\lambda_{j+1}/\lambda_j}^k$的速度收敛到$\lambda_1, \dots, \lambda_j$的特征向量所张成的子空间。于是对每个$j$，$A_k = \mathcal Q_k\T A\mathcal Q_k$都趋于分块上三角形式，也就是说，趋于上三角形式。细节见 Trefethen 和 Bau 的《数值线性代数》（Numerical Linear Algebra）第28—29讲。
:::

::: example 对称矩阵上的 QR 算法 {#ex-qr}
对$A = \begin{pmatrix}2 & 1 & 0\\ 1 & 3 & 1\\ 0 & 1 & 4\end{pmatrix}$运行 QR 算法，它的特征值为$3 + \sqrt3 = 4.732\,051$、$3$和$3 - \sqrt3 = 1.267\,949$。
::: solution
迭代矩阵始终保持对称三对角。它们的对角元和次对角元的大小如下：

| $k$ | $A_k$的对角元 | $\abs{(A_k)_{21}}$ | $\abs{(A_k)_{32}}$ |
|---|---|---|---|
| $0$ | $2,\ 3,\ 4$ | $1$ | $1$ |
| $1$ | $3,\ 3,\ 3$ | $1.10$ | $1.34$ |
| $3$ | $4.157,\ 3.488,\ 1.355$ | $0.83$ | $0.42$ |
| $5$ | $4.606,\ 3.123,\ 1.270$ | $0.45$ | $0.066$ |
| $8$ | $4.723\,3,\ 3.008\,7,\ 1.267\,96$ | $0.12$ | $4.8\times10^{-3}$ |
| $12$ | $4.731\,82,\ 3.000\,23,\ 1.267\,949$ | $0.020$ | $1.5\times10^{-4}$ |

对角元按递减的次序收敛到各特征值。元素$(A_k)_{32}$每步大约缩小为原来的$\frac{\lambda_3}{\lambda_2} = 0.42$倍，$(A_k)_{21}$大约缩小为$\frac{\lambda_2}{\lambda_1} = 0.63$倍，与[[#thm-qr]]的预言完全一致。一旦$(A_k)_{32}$小到可以忽略，就可以读出$\lambda_3$，并把问题**收缩**（降阶）到左上角的$2\times2$子块。
:::
:::

当各特征值的大小相近时，基本算法收敛很慢，而且每一步的运算量为$O(n^3)$。实用的算法增加了三个要素。第一，先用正交相似变换把$A$一次性地化为**海森伯格（Hessenberg）形**（第一条次对角线以下的元素全为零；若$A$对称，则为三对角形）；QR 迭代保持这种形式，于是每一步只需$O(n^2)$次浮点运算（对称情形只需$O(n)$次）。第二，**位移**：作分解$A_k - \sigma_kI = Q_kR_k$，并令$A_{k+1} = R_kQ_k + \sigma_kI$，它仍与$A_k$相似；当$\sigma_k$接近某个特征值时——例如取由右下角$2\times2$子块算出的威尔金森位移——最后一个次对角元二次收敛，在对称情形下则三次收敛。第三，**收缩**把已经收敛的特征值分离出去。有了这些改进，只需$O(n^3)$次浮点运算就能求出$n\times n$矩阵的全部特征值，通常每个特征值只需两三次迭代；`numpy.linalg.eig`和`eigvalsh`正是通过 LAPACK 这样做的。

::: quiz
对特征值为$1$、$2$和$4$的矩阵应用位移为$\sigma = 2.5$的反幂法。求得的是哪个特征值？每步的收敛因子是多少？
- [ ] $4$，收敛因子为$\frac12$
- [x] $2$，收敛因子为$\frac13$
- [ ] $1$，收敛因子为$\frac23$
- [ ] $2$，收敛因子为$\frac12$
::: solution
$(A - 2.5I)^{-1}$的特征值为$\frac{1}{-1.5}$、$\frac{1}{-0.5}$和$\frac{1}{1.5}$，绝对值分别为$0.667$、$2$和$0.667$。模最大的特征值$-2$对应于$\lambda = 2$，即最接近位移的特征值。收敛因子是第二大的绝对值与最大的绝对值之比：$\frac{0.667}{2} = \frac13$，即$\frac{\abs{2 - 2.5}}{\abs{1 - 2.5}} = \frac{0.5}{1.5}$。
:::
:::

::: history
卡尔·弗里德里希·高斯（Carl Friedrich Gauss）在1823年致克里斯蒂安·路德维希·格尔林（Christian Ludwig Gerling）的一封信中，描述了一种求解最小二乘正规方程的迭代方法，并说这种方法在“半睡半醒”时也能进行；卡尔·古斯塔夫·雅可比（Carl Gustav Jacobi）于1845年发表了他的方法，菲利普·路德维希·冯·赛德尔（Philipp Ludwig von Seidel）则于1874年发表了他的方法。戴维·扬（David Young）1950年的博士论文创立了 SOR 的理论，与斯坦利·弗兰克尔（Stanley Frankel）的工作相互独立。幂法由理查德·冯·米泽斯（Richard von Mises）和希尔达·波拉切克-盖林格（Hilda Pollaczek-Geiringer）于1929年提出。海因茨·鲁蒂斯豪泽（Heinz Rutishauser）的 LR 算法（1958年）引出了 QR 算法，后者由约翰·弗朗西斯（John Francis）和薇拉·库布拉诺夫斯卡娅（Vera Kublanovskaya）于1961年各自独立地发现；经过上面所述的改进，它成为特征值问题的标准方法，常被列为二十世纪最重要的算法之一。
:::

## 后续内容

求解对称正定方程组的现代迭代法是**克雷洛夫（Krylov）子空间方法**，其中最重要的是赫斯特尼斯（Hestenes）和施蒂费尔（Stiefel）的共轭梯度法（1952年）：它在$\mathbf b, A\mathbf b, A^2\mathbf b, \dots$所张成的子空间中构造最佳近似，其收敛速度取决于$\sqrt{\kappa(A)}$；配合预处理（用近似分解或几次多重网格循环作为$M$），这些方法可以求解来自偏微分方程的大型方程组（[[pde/laplace-equation]]）。在特征值方面，对称 QR 算法与奇异值分解（[[linear-algebra/svd]]）是近亲，而克雷洛夫方法（兰乔斯（Lanczos）方法、阿诺尔迪（Arnoldi）方法）能求出巨型稀疏矩阵的少数几个特征值。在[[numerical-analysis/numerical-odes]]一章中，谱半径还决定着微分方程时间步进方法的稳定性。

::: summary
- 分裂$A = M - N$给出迭代$\mathbf x^{(k+1)} = M^{-1}(N\mathbf x^{(k)} + \mathbf b)$；雅可比迭代取$M = D$，高斯-赛德尔迭代取$M = D + L$，SOR 迭代取$M = \frac1\omega D + L$。每轮扫描的运算量为$O(\text{非零元个数})$。
- 误差满足$\mathbf e^{(k)} = G^k\mathbf e^{(0)}$；迭代对每个初值都收敛当且仅当$\rho(G) < 1$，而$\rho(G)$就是渐近意义下每步误差的缩小因子。
- 严格对角占优保证雅可比迭代和高斯-赛德尔迭代收敛；对于对称正定矩阵，高斯-赛德尔迭代和$0 < \omega < 2$的 SOR 迭代收敛；在任何情况下，SOR 迭代都需要$0 < \omega < 2$。
- 在模型问题上，随着网格加密，$\rho \to 1$；最优 SOR 迭代、共轭梯度法和多重网格法比雅可比迭代和高斯-赛德尔迭代快得多。
- 幂法以$\abs{\lambda_2/\lambda_1}$的速度收敛到主特征向量（对称矩阵的瑞利商则以其平方的速度收敛）；带位移的反幂法求出最接近位移的特征值。
- QR 算法$A_k = Q_kR_k$，$A_{k+1} = R_kQ_k$产生一系列正交相似的矩阵，它们收敛到三角形式；配合海森伯格化简、位移和收缩，它能用$O(n^3)$次浮点运算求出全部特征值。
:::

## 习题

::: exercise 一步雅可比迭代 {level=1 check="5/2"}
对于[[#ex-jacobi-gs]]中的方程组，从$\mathbf x^{(0)} = \mathbf 0$出发，计算雅可比迭代的第一个迭代向量。$x_3^{(1)}$等于多少？
::: solution
由于所有旧值都为零，$x_i^{(1)} = b_i/a_{ii}$：$\mathbf x^{(1)} = \left(\frac24, \frac44, \frac{10}{4}\right) = (0.5, 1, 2.5)$，所以$x_3^{(1)} = \frac52$。
:::
:::

::: exercise 雅可比迭代矩阵的谱半径 {level=1 check="1/sqrt(6)"}
求$A = \begin{pmatrix}3 & 1\\ 1 & 2\end{pmatrix}$的雅可比迭代矩阵的谱半径。
::: solution
$G_J = -D^{-1}(L + U) = \begin{pmatrix}0 & -\frac13\\ -\frac12 & 0\end{pmatrix}$，其特征多项式为$\lambda^2 - \frac16$。所以$\lambda = \pm\frac{1}{\sqrt6}$，$\rho(G_J) = \frac{1}{\sqrt6} \approx 0.408$。
:::
:::

::: exercise 计算瑞利商 {level=1 check="7/2"}
对$A = \begin{pmatrix}2 & 1\\ 1 & 3\end{pmatrix}$，计算$\mathbf x = (1, 1)\T$的瑞利商。
::: solution
$\mathbf x\T A\mathbf x = 2 + 1 + 1 + 3 = 7$，$\mathbf x\T\mathbf x = 2$，所以$\mu = \frac72 = 3.5$——这正是[[#ex-power]]中的$\mu_2$，因为$(1, 1)\T \propto (5, 5)\T$。
:::
:::

::: exercise 高斯-赛德尔迭代矩阵的谱半径 {level=2 check="1/6"}
对上上一道习题中的矩阵$A = \begin{pmatrix}3 & 1\\ 1 & 2\end{pmatrix}$，计算$\rho(G_{GS})$，并与$\rho(G_J)^2$比较。
::: solution
$G_{GS} = -(D + L)^{-1}U$，其中$D + L = \begin{pmatrix}3 & 0\\ 1 & 2\end{pmatrix}$，$U = \begin{pmatrix}0 & 1\\ 0 & 0\end{pmatrix}$。于是$(D + L)^{-1} = \begin{pmatrix}\frac13 & 0\\ -\frac16 & \frac12\end{pmatrix}$，$G_{GS} = -\begin{pmatrix}0 & \frac13\\ 0 & -\frac16\end{pmatrix} = \begin{pmatrix}0 & -\frac13\\ 0 & \frac16\end{pmatrix}$。其特征值为$0$和$\frac16$，所以$\rho(G_{GS}) = \frac16 = \rho(G_J)^2$：一步高斯-赛德尔迭代抵得上两步雅可比迭代。
:::
:::

::: exercise 估计迭代次数 {level=2 check="132"}
某迭代的$\rho(G) = 0.9$。大约需要多少次迭代才能把误差缩小为原来的$10^{-6}$？（用渐近收敛速度估计。）
::: solution
需要$0.9^k \le 10^{-6}$，即$k \ge \frac{6}{-\log_{10}0.9} = \frac{6}{0.045\,76} = 131.1$，所以$k = 132$。
:::
:::

::: exercise 带位移的反幂法 {level=2 check="1/3"}
某对称矩阵的特征值为$1$、$2$和$4$。位移为$\sigma = 2.5$的反幂法的渐近收敛因子是多少？$[1, 4]$中的哪个位移能使反幂法以因子$\frac{1}{10}$收敛到特征值$4$？（输入$\sigma = 2.5$时的收敛因子。）
::: solution
与前面的小测验一样，收敛因子为$\frac{\abs{2 - 2.5}}{\abs{1 - 2.5}} = \frac13$。要以因子$\frac1{10}$收敛到$4$，需要$\frac{\abs{4 - \sigma}}{\min(\abs{2 - \sigma}, \abs{1 - \sigma})} = \frac{1}{10}$。当$\sigma$介于$2$和$4$之间时，最近的其他特征值是$2$，所以$\frac{4 - \sigma}{\sigma - 2} = \frac{1}{10}$，解得$\sigma = \frac{42}{11} \approx 3.818$。
:::
:::

::: exercise QR 迭代保持结构 {level=2}
证明：若$A_k$对称，则$A_{k+1} = R_kQ_k$也对称；若$A_k$可逆，则$A_{k+1} = R_kA_kR_k^{-1}$。为什么 QR 算法不能一步就算出特征值？
::: solution
由[[#thm-qr]]，$A_{k+1} = Q_k\T A_kQ_k$；若$A_k$对称，则$(Q_k\T A_kQ_k)\T = Q_k\T A_k\T Q_k = A_{k+1}$。此外，当$R_k$可逆时（$A_k$可逆时即是如此），$Q_k = A_kR_k^{-1}$，所以$A_{k+1} = R_kQ_k = R_kA_kR_k^{-1}$，这又是一个相似变换。一般来说，任何有限步这样的运算都不可能精确地给出特征值：否则就能得到用算术运算和平方根表示任意次多项式的根的公式，而阿贝尔-鲁菲尼（Abel–Ruffini）定理排除了$5$次及$5$次以上的情形（[[abstract-algebra/fields-galois]]）。特征值算法必然是迭代的。
:::
:::

::: exercise 模型问题的特征值 {level=3 #exr-model-eigen}
设$T$是对角元为$2$、上下次对角元为$-1$的$n\times n$三对角矩阵。证明：对$k = 1, \dots, n$，分量为$(\mathbf v_k)_j = \sin\frac{jk\pi}{n+1}$（$j = 1, \dots, n$）的向量$\mathbf v_k$是$T$的特征向量，对应的特征值为$2 - 2\cos\frac{k\pi}{n+1}$；并由此推出雅可比迭代矩阵$G_J = I - \frac12T$的谱半径为$\cos\frac{\pi}{n+1}$。
::: solution
令$\theta = \frac{k\pi}{n+1}$，$s_j = \sin(j\theta)$；注意$s_0 = 0$，$s_{n+1} = \sin(k\pi) = 0$。$T\mathbf v_k$的第$j$行为$-s_{j-1} + 2s_j - s_{j+1}$（由于$s_0 = s_{n+1} = 0$，这对$j = 1$和$j = n$也成立）。由恒等式$\sin((j-1)\theta) + \sin((j+1)\theta) = 2\sin(j\theta)\cos\theta$，它等于$(2 - 2\cos\theta)s_j$。这些向量非零（例如$s_1 = \sin\theta \ne 0$），所以它们是特征向量，对应$n$个互不相同的特征值$2 - 2\cos\frac{k\pi}{n+1}$。由于$D = 2I$，$G_J = I - D^{-1}T = I - \frac12T$的特征值为$1 - (1 - \cos\frac{k\pi}{n+1}) = \cos\frac{k\pi}{n+1}$，$k = 1, \dots, n$，其中绝对值最大的是$\cos\frac{\pi}{n+1}$（在$k = n$时也取到，只是带负号）。
:::
:::

::: exercise 范数判据与事后误差界 {level=3}
设在某个诱导范数下$\norm G < 1$，$\mathbf x^{(k)}$是迭代$\mathbf x^{(k+1)} = G\mathbf x^{(k)} + \mathbf c$的迭代向量，其极限为$\mathbf x^*$。证明$\norm{\mathbf x^{(k)} - \mathbf x^*} \le \frac{\norm G}{1 - \norm G}\norm{\mathbf x^{(k)} - \mathbf x^{(k-1)}}$。对[[#ex-jacobi-gs]]中的雅可比迭代，在$\infty$-范数下计算这个因子。
::: solution
与标量情形（[[numerical-analysis/root-finding#thm-contraction]]）一样：$\mathbf x^{(k)} - \mathbf x^* = G(\mathbf x^{(k-1)} - \mathbf x^*)$，并且$\mathbf x^{(k-1)} - \mathbf x^* = (\mathbf x^{(k-1)} - \mathbf x^{(k)}) + (\mathbf x^{(k)} - \mathbf x^*)$。因此$\norm{\mathbf x^{(k-1)} - \mathbf x^*} \le \norm{\mathbf x^{(k)} - \mathbf x^{(k-1)}} + \norm G\norm{\mathbf x^{(k-1)} - \mathbf x^*}$，所以$\norm{\mathbf x^{(k-1)} - \mathbf x^*} \le \frac{1}{1 - \norm G}\norm{\mathbf x^{(k)} - \mathbf x^{(k-1)}}$，再乘以$\norm G$即得结论。对于[[#ex-jacobi-gs]]中的雅可比迭代矩阵，$G_J$各行元素绝对值之和为$\frac14$、$\frac12$、$\frac14$，所以$\norm{G_J}_\infty = \frac12$，因子为$\frac{1/2}{1/2} = 1$：误差不超过最后一步的步长。
:::
:::
