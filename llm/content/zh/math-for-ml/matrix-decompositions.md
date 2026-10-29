一个$4096\times4096$的权重矩阵存储着近一千七百万个数。它们真的每一个都需要吗？微调语言模型时，每个权重都会改变一点，可实践中，这一变化往往能用一个仅由几千个数构造的矩阵来刻画；而$768$维空间中上百万个嵌入向量构成的云团，常常只需几十个方向就能以很好的精度描述。这两个观察说的都是**秩**，而度量并利用秩的工具，正是**奇异值分解**。

本章展开机器学习用得最多的两种分解。特征分解用一个方阵只做拉伸的那些方向来描述它；对对称矩阵——协方差矩阵、黑塞矩阵、格拉姆（Gram）矩阵——这些方向彼此正交，图像格外干净。奇异值分解把这一想法推广到任何矩阵——无论是不是方阵——并给出矩阵的最佳低秩近似，这正是主成分分析、模型压缩以及 LoRA 等低秩适配器背后的结果。数学图谱中关于[特征值](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues)、[谱定理](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)和 [SVD](/learn/maths/lesson.php?c=linear-algebra&l=svd) 的课给出完整理论；这里的重点，是这些分解对数据与权重说明了什么。

## 特征值与特征向量 {#sec-eigen}

::: definition 特征值与特征向量 {#def-eigen}
设$A\in\R^{n\times n}$。若非零向量$\mathbf{v}$满足

$$
A\mathbf{v} = \lambda\mathbf{v},
$$

则称$\mathbf{v}$是$A$的一个**特征向量**，$\lambda$称为对应的**特征值**。特征值是**特征多项式**$\det(A - \lambda I)$的根，这是个$n$次多项式。若$A$有$n$个线性无关的特征向量，把它们作为列排成$V$，则$A = V\Lambda V^{-1}$，其中$\Lambda = \diag(\lambda_1, \dots, \lambda_n)$：这就是一个**特征分解**。
:::

特征向量是这个映射不会转动的方向：它只被$\lambda$倍拉伸（$\lambda < 0$时再反向）。在特征向量构成的基下，矩阵逐坐标地作用，这使得求幂变得容易：$A^k = V\Lambda^kV^{-1}$，于是$A$反复作用时，第$i$个特征坐标乘以$\lambda_i^k$。沿$\lvert\lambda\rvert > 1$的特征值方向的分量会爆炸，沿$\lvert\lambda\rvert < 1$方向的分量会消失——这正是深层网络与循环网络中信号爆炸与消失的线性代数内核。

::: example 一个对称$2\times2$矩阵的特征值 {#ex-eigen22}
求$A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$的特征值与特征向量，并不用连乘十个矩阵计算$A^{10}(1, 0)^\top$。
::: solution
$\det(A - \lambda I) = (2-\lambda)^2 - 1 = (\lambda - 3)(\lambda - 1)$，所以$\lambda_1 = 3$，$\lambda_2 = 1$。对$\lambda = 3$：$(A - 3I)\mathbf{v} = \mathbf{0}$给出$-v_1 + v_2 = 0$，故$\mathbf{v}_1 = (1, 1)/\sqrt2$。对$\lambda = 1$：$v_1 + v_2 = 0$，故$\mathbf{v}_2 = (1, -1)/\sqrt2$。两者正交。

把$(1, 0)$写成$(1, 0) = \frac1{\sqrt2}\mathbf{v}_1 + \frac1{\sqrt2}\mathbf{v}_2$。于是

$$
A^{10}\begin{pmatrix}1\\0\end{pmatrix} = \frac{3^{10}}{\sqrt2}\mathbf{v}_1 + \frac{1}{\sqrt2}\mathbf{v}_2 = \frac12\begin{pmatrix}3^{10} + 1\\3^{10} - 1\end{pmatrix} = \begin{pmatrix}29525\\29524\end{pmatrix}.
$$

十步之后，向量几乎正好指向$\mathbf{v}_1$，即最大特征值对应的方向。
:::
:::

::: widget transform2d
matrix: 2,1; 1,2
eigen: true
caption: [[#ex-eigen22]]的映射。图中画出了特征向量所在的直线：沿$(1,1)$方向的向量被拉伸$3$倍，沿$(1,-1)$方向的向量保持不变，其余任何向量都会被转向$(1,1)$方向。可以试试一个剪切矩阵，比如$\begin{pmatrix}1&1\\0&1\end{pmatrix}$，它只有一个特征向量方向；或者一个旋转矩阵，它在实平面上没有任何特征向量。
:::

并非每个矩阵都如此规矩。平面绕原点旋转$90^\circ$完全没有实特征向量（它的特征值是$\pm i$），剪切矩阵$\begin{pmatrix}1&1\\0&1\end{pmatrix}$只有单个特征值$1$且只有一个特征向量方向，因此不存在特征分解。对称矩阵则从不出这类问题。

### 对称矩阵 {#sec-symmetric}

::: theorem 谱定理 {#thm-spectral}
若$A\in\R^{n\times n}$对称（$A^\top = A$），则它的所有特征值都是实数，且存在一个正交矩阵$Q$（满足$Q^\top Q = I$），其各列都是$A$的特征向量：

$$
A = Q\Lambda Q^\top = \sum_{i=1}^n\lambda_i\mathbf{q}_i\mathbf{q}_i^\top.
$$ {#eq-spectral}
:::

完整证明见[数学图谱](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)。有一小部分足够短，可以在这里给出：对称矩阵属于不同特征值的特征向量彼此正交，因为若$A\mathbf{u} = \lambda\mathbf{u}$且$A\mathbf{v} = \mu\mathbf{v}$，则$\lambda\,\mathbf{u}\cdot\mathbf{v} = (A\mathbf{u})\cdot\mathbf{v} = \mathbf{u}\cdot(A\mathbf{v}) = \mu\,\mathbf{u}\cdot\mathbf{v}$，而$\lambda\ne\mu$迫使$\mathbf{u}\cdot\mathbf{v} = 0$。

式[[#eq-spectral]]把一个对称矩阵写成一组秩一投影之和，投影方向彼此正交，每一项按自己的特征值加权。对称矩阵在机器学习中无处不在：数据集的协方差矩阵、成对点积构成的格拉姆矩阵$XX^\top$、损失的黑塞矩阵（二阶导数矩阵，见[[math-for-ml/optimisation]]）。它们大多还有一个额外的性质。

::: definition 半正定 {#def-psd}
若对称矩阵$A$对所有$\mathbf{x}$都有$\mathbf{x}^\top A\mathbf{x}\ge0$，则称$A$**半正定**（PSD）；若对所有$\mathbf{x}\ne\mathbf{0}$都有$\mathbf{x}^\top A\mathbf{x} > 0$，则称**正定**。由[[#thm-spectral]]，等价于所有特征值$\ge0$（相应地$> 0$）。
:::

::: proposition 协方差矩阵与格拉姆矩阵半正定 {#prop-psd}
对任意$X\in\R^{N\times d}$，矩阵$X^\top X$与$XX^\top$都是半正定的。特别地，中心化数据矩阵$\tilde X$的协方差矩阵$C = \frac1N\tilde X^\top\tilde X$半正定，且$\mathbf{u}^\top C\mathbf{u}$是数据在单位向量$\mathbf{u}$上投影的方差。
:::

::: proof
$\mathbf{x}^\top X^\top X\mathbf{x} = (X\mathbf{x})\cdot(X\mathbf{x}) = \lVert X\mathbf{x}\rVert^2\ge0$，把$X$换成$X^\top$同样处理$XX^\top$。对协方差矩阵，第$n$个中心化数据点$\tilde{\mathbf{x}}_n$在$\mathbf{u}$上的投影是数$\tilde{\mathbf{x}}_n\cdot\mathbf{u}$，即$\tilde X\mathbf{u}$的第$n$个分量。这些数的均值为$0$，所以其方差为$\frac1N\sum_n(\tilde{\mathbf{x}}_n\cdot\mathbf{u})^2 = \frac1N\lVert\tilde X\mathbf{u}\rVert^2 = \mathbf{u}^\top C\mathbf{u}$。
:::

二次型$\mathbf{x}^\top A\mathbf{x}$有一个干净的最值刻画，这正是主成分分析的数学内核。

::: proposition 瑞利商 {#prop-rayleigh}
设$A$对称，特征值$\lambda_1\ge\lambda_2\ge\dots\ge\lambda_n$，标准正交特征向量为$\mathbf{q}_1, \dots, \mathbf{q}_n$。则

$$
\max_{\lVert\mathbf{u}\rVert = 1}\mathbf{u}^\top A\mathbf{u} = \lambda_1,
$$

最大值在$\mathbf{u} = \mathbf{q}_1$处取得；而在与$\mathbf{q}_1, \dots, \mathbf{q}_{k-1}$都正交的单位向量上，最大值为$\lambda_k$，在$\mathbf{q}_k$处取得。
:::

::: proof
把$\mathbf{u}$展开为$\mathbf{u} = \sum_ic_i\mathbf{q}_i$；由于$Q$正交，$\lVert\mathbf{u}\rVert^2 = \sum_ic_i^2 = 1$。由[[#eq-spectral]]，$\mathbf{u}^\top A\mathbf{u} = \sum_i\lambda_ic_i^2$，这是特征值的一个加权平均，权重$c_i^2$之和为$1$。它不超过$\lambda_1$，当全部权重落在$i = 1$（或落在等于$\lambda_1$的特征值）上时取等。若$\mathbf{u}$与$\mathbf{q}_1, \dots, \mathbf{q}_{k-1}$正交，则$c_1 = \dots = c_{k-1} = 0$，这个平均不超过$\lambda_k$。
:::

### 幂迭代 {#sec-power}

[[#ex-eigen22]]其实已经包含了一个算法：把任一起始向量反复乘以$A$，它就会与最大特征值的特征向量对齐。

::: algorithm 幂迭代 {#alg-power}
输入：对称矩阵$A$，其绝对值最大的特征值$\lambda_1$的绝对值严格大于其余特征值；起始向量$\mathbf{v}_0$满足$\mathbf{v}_0\cdot\mathbf{q}_1\ne0$。

1. 对$k = 1, 2, \dots$：令$\mathbf{w} = A\mathbf{v}_{k-1}$，$\mathbf{v}_k = \mathbf{w}/\lVert\mathbf{w}\rVert$。
2. 用瑞利商$\lambda^{(k)} = \mathbf{v}_k^\top A\mathbf{v}_k$估计特征值。
3. 当$\lambda^{(k)}$不再变化时停止。

$\mathbf{v}_k$沿每个其他特征向量的分量（相对于沿$\mathbf{q}_1$的分量），每步按因子$\lvert\lambda_i/\lambda_1\rvert$缩小。
:::

每步的成本是一次矩阵–向量乘法，因此幂迭代适用于从不显式存储的超大矩阵——只需要乘积$A\mathbf{v}$。神经网络损失的黑塞矩阵最大特征值在实践中就是这样估计的：黑塞–向量乘积可以通过自动微分计算，而无须真正造出黑塞矩阵。下面是用朴素 Python 写成的算法，作用在下面[[#ex-pca]]中出现的协方差矩阵上：

```python
import math

def power_iteration(A, steps):
    # A：(n, n) 对称矩阵，按行存放的列表；返回（特征值，特征向量）
    n = len(A)
    v = [1.0] * n                                    # (n,) 起始向量
    for k in range(1, steps + 1):
        w = [sum(A[i][j] * v[j] for j in range(n)) for i in range(n)]  # A v
        norm = math.sqrt(sum(x * x for x in w))
        v = [x / norm for x in w]                    # 归一化为长度 1
        Av = [sum(A[i][j] * v[j] for j in range(n)) for i in range(n)]
        lam = sum(v[i] * Av[i] for i in range(n))    # 瑞利商 v.Av
        print(k, round(lam, 6), [round(x, 6) for x in v])
    return lam, v

C = [[2.0, 2.4],
     [2.4, 3.2]]                                     # 协方差矩阵 (2, 2)
power_iteration(C, 4)
```

```text
1 5.073817 [0.617822, 0.786318]
2 5.073863 [0.615472, 0.788159]
3 5.073863 [0.615414, 0.788204]
4 5.073863 [0.615412, 0.788205]
```

这里的特征值之比是$\lambda_2/\lambda_1 = 0.126/5.074 = 0.025$，所以每迭代一步，向量的正确数字就多出不止一位。

## 奇异值分解 {#sec-svd}

特征向量要求矩阵是方阵，而且未必存在；权重矩阵$W\in\R^{d_{\text{out}}\times d_{\text{in}}}$通常是长方形的。奇异值分解问的是另一个问题：哪些相互正交的输入方向会被映成相互正交的输出方向？

::: definition 奇异值分解 {#def-svd}
$A\in\R^{m\times n}$的一个**奇异值分解**是指分解

$$
A = U\Sigma V^\top = \sum_{i=1}^r\sigma_i\mathbf{u}_i\mathbf{v}_i^\top,
$$ {#eq-svd}

其中$U\in\R^{m\times m}$与$V\in\R^{n\times n}$正交，$\Sigma\in\R^{m\times n}$除对角线上的**奇异值**$\sigma_1\ge\sigma_2\ge\dots\ge\sigma_r > 0$外全为零，$r$是$A$的秩。各列$\mathbf{v}_i$与$\mathbf{u}_i$称为右、左**奇异向量**：$A\mathbf{v}_i = \sigma_i\mathbf{u}_i$。
:::

把[[#eq-svd]]从右往左读，它说的是：**任何**线性映射都是一个旋转（或反射）$V^\top$，接着把每个坐标轴按$\sigma_i$倍拉伸（并改变维数），再来一个旋转$U$。单位球被映成一个椭球，其半轴长为$\sigma_i$，指向$\mathbf{u}_i$。

::: theorem SVD 的存在性 {#thm-svd}
每个实矩阵都有奇异值分解。$\sigma_i^2$是$A^\top A$（以及$AA^\top$）的非零特征值，$\mathbf{v}_i$是$A^\top A$的对应标准正交特征向量，且$\mathbf{u}_i = A\mathbf{v}_i/\sigma_i$。
:::

::: proof
$A^\top A$对称且半正定（[[#prop-psd]]），故由[[#thm-spectral]]它有标准正交特征向量$\mathbf{v}_1, \dots, \mathbf{v}_n$，对应特征值$\mu_1\ge\dots\ge\mu_n\ge0$。设$r$为正的$\mu_i$的个数，对$i\le r$令$\sigma_i = \sqrt{\mu_i}$，$\mathbf{u}_i = A\mathbf{v}_i/\sigma_i$。这些$\mathbf{u}_i$标准正交：$\mathbf{u}_i\cdot\mathbf{u}_j = \mathbf{v}_i^\top A^\top A\mathbf{v}_j/(\sigma_i\sigma_j) = \mu_j\,\mathbf{v}_i\cdot\mathbf{v}_j/(\sigma_i\sigma_j)$，当$i = j$时为$1$，否则为$0$。对$i > r$，$\lVert A\mathbf{v}_i\rVert^2 = \mu_i = 0$，故$A\mathbf{v}_i = \mathbf{0}$。于是$i\le r$时$A\mathbf{v}_i = \sigma_i\mathbf{u}_i$，其余情形$A\mathbf{v}_i = \mathbf{0}$，这正说明$AV = U\Sigma$——只要把$\mathbf{u}_1, \dots, \mathbf{u}_r$扩充成$\R^m$的一组标准正交基。右乘$V^\top$即得。秩为$r$，因为$A$的像由$\mathbf{u}_1, \dots, \mathbf{u}_r$张成。
:::

::: example 手算一个 SVD {#ex-svd}
求$A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$的奇异值分解。
::: solution
$A^\top A = \begin{pmatrix}3&4\\0&5\end{pmatrix}\begin{pmatrix}3&0\\4&5\end{pmatrix} = \begin{pmatrix}25&20\\20&25\end{pmatrix}$，特征值为$45$和$5$（迹$50$，行列式$625 - 400 = 225$），特征向量$\mathbf{v}_1 = (1, 1)/\sqrt2$，$\mathbf{v}_2 = (-1, 1)/\sqrt2$。于是$\sigma_1 = \sqrt{45} = 3\sqrt5\approx6.708$，$\sigma_2 = \sqrt5\approx2.236$。进而

$$
\mathbf{u}_1 = \frac{A\mathbf{v}_1}{\sigma_1} = \frac{(3, 9)/\sqrt2}{3\sqrt5} = \frac{(1, 3)}{\sqrt{10}},\qquad \mathbf{u}_2 = \frac{A\mathbf{v}_2}{\sigma_2} = \frac{(-3, 1)/\sqrt2}{\sqrt5} = \frac{(-3, 1)}{\sqrt{10}}.
$$

验证：$\sigma_1\sigma_2 = 3\sqrt5\cdot\sqrt5 = 15 = \lvert\det A\rvert$，这本来就该如此，因为旋转不改变面积。
:::
:::

::: widget svd
matrix: 3,0; 4,5
caption: [[#ex-svd]]的 SVD，分三步看：单位圆先被$V^\top$旋转，再被拉伸成半轴为$\sigma_1 = 6.71$和$\sigma_2 = 2.24$的椭圆，最后被$U$旋转。编辑矩阵并观察奇异值；把两行改成成比例的，椭圆就塌成一条线段（$\sigma_2 = 0$，秩一）。
:::

::: warning 特征值不是奇异值
对对称半正定矩阵，两者重合；但一般而言它们不同，对非对称矩阵，二者甚至可能讲述完全不同的故事。矩阵$\begin{pmatrix}0&100\\0&0\end{pmatrix}$的两个特征值都是$0$——它的幂从$A^2$起全为零——可它最大的奇异值是$100$：一步就能把某个向量拉伸一百倍。$A\mathbf{x}$的大小由奇异值控制（$\lVert A\mathbf{x}\rVert\le\sigma_1\lVert\mathbf{x}\rVert$）；$A^k$的长期性态由特征值控制。另外注意，奇异向量只能确定到符号（奇异值有重根时还只能确定到该子空间内的一个旋转），所以两个软件库可能给出不同但同样正确的$U$与$V$。
:::

最大奇异值就是**谱范数**$\lVert A\rVert_2 = \max_{\lVert\mathbf{x}\rVert = 1}\lVert A\mathbf{x}\rVert = \sigma_1$，即这个映射对任何向量的最大拉伸倍数。**弗罗贝尼乌斯（Frobenius）范数**$\lVert A\rVert_F = \sqrt{\sum_{ij}A_{ij}^2}$度量各元素的整体大小；由于正交矩阵不改变它，$\lVert A\rVert_F^2 = \lVert\Sigma\rVert_F^2 = \sum_i\sigma_i^2$。可逆方阵的比值$\kappa = \sigma_1/\sigma_r$称为**条件数**：它度量这个映射把形状扭曲到什么程度，而[[math-for-ml/optimisation]]将表明，它决定了梯度下降在一个二次函数上收敛得多快。

## 最佳低秩近似 {#sec-eckart-young}

把和式[[#eq-svd]]截取前$k$项，就得到一个秩$k$的矩阵，

$$
A_k = \sum_{i=1}^k\sigma_i\mathbf{u}_i\mathbf{v}_i^\top.
$$ {#eq-truncated}

它保留了$A$拉伸最厉害的那$k$个方向，舍弃其余。任何秩$k$的矩阵都做不过它。

::: theorem Eckart–Young 定理 {#thm-eckart-young}
设$A$的奇异值为$\sigma_1\ge\sigma_2\ge\dots$，$A_k$为截取[[#eq-truncated]]。对每个秩不超过$k$的矩阵$B$，

$$
\lVert A - B\rVert_2\ge\lVert A - A_k\rVert_2 = \sigma_{k+1}\qquad\text{且}\qquad\lVert A - B\rVert_F\ge\lVert A - A_k\rVert_F = \Big(\sum_{i>k}\sigma_i^2\Big)^{1/2}.
$$
:::

::: proof
截取的误差由$A - A_k = \sum_{i>k}\sigma_i\mathbf{u}_i\mathbf{v}_i^\top$立得，它本身已是 SVD 形式，奇异值为$\sigma_{k+1}, \sigma_{k+2}, \dots$；其谱范数是最大的那个$\sigma_{k+1}$，弗罗贝尼乌斯范数是平方和的平方根。

谱范数下的最优性：设$B$的秩不超过$k$。$B$的核的维数至少$n - k$，而$\mathbf{v}_1, \dots, \mathbf{v}_{k+1}$的张成空间维数为$k + 1$；$\R^n$中两个维数之和超过$n$的子空间必共享一个非零向量，于是存在单位向量$\mathbf{w} = \sum_{i\le k+1}c_i\mathbf{v}_i$使得$B\mathbf{w} = \mathbf{0}$且$\sum_ic_i^2 = 1$。于是

$$
\lVert(A - B)\mathbf{w}\rVert^2 = \lVert A\mathbf{w}\rVert^2 = \Big\lVert\sum_{i\le k+1}c_i\sigma_i\mathbf{u}_i\Big\rVert^2 = \sum_{i\le k+1}c_i^2\sigma_i^2\ge\sigma_{k+1}^2,
$$

故$\lVert A - B\rVert_2\ge\sigma_{k+1}$。弗罗贝尼乌斯范数的情形需要对每个奇异值轮流套用同一想法（Mirsky，1960），此处从略。
:::

这个定理把“这个矩阵有多大的压缩余地？”变成了“它的奇异值衰减得有多快？”。$A_k$保住的弗罗贝尼乌斯范数平方所占的比例是$\sum_{i\le k}\sigma_i^2/\sum_i\sigma_i^2$；若少数几个奇异值占支配地位，低秩近似就几乎不损失什么。

::: example 最佳秩一近似 {#ex-rank-one}
利用[[#ex-svd]]，求$A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$的最佳秩一近似及其误差。
::: solution
$A_1 = \sigma_1\mathbf{u}_1\mathbf{v}_1^\top = 3\sqrt5\cdot\frac{1}{\sqrt{10}}\begin{pmatrix}1\\3\end{pmatrix}\cdot\frac{1}{\sqrt2}(1, 1) = \frac{3\sqrt5}{\sqrt{20}}\begin{pmatrix}1&1\\3&3\end{pmatrix} = \begin{pmatrix}1.5&1.5\\4.5&4.5\end{pmatrix}$。

误差为$A - A_1 = \begin{pmatrix}1.5&-1.5\\-0.5&0.5\end{pmatrix}$，且$\lVert A - A_1\rVert_F^2 = 2.25 + 2.25 + 0.25 + 0.25 = 5 = \sigma_2^2$，与定理预言一致。由于$\lVert A\rVert_F^2 = 9 + 16 + 25 = 50 = \sigma_1^2 + \sigma_2^2$，这个秩一矩阵保住了$90\%$的平方范数。
:::
:::

## 主成分分析 {#sec-pca}

主成分分析（PCA）就是把瑞利商用在一组数据上：找出数据变化最剧烈的方向。

::: definition 主成分 {#def-pca}
设$\mathbf{x}_1, \dots, \mathbf{x}_N\in\R^d$的均值为$\bar{\mathbf{x}}$，让$\tilde X\in\R^{N\times d}$以中心化的点$\mathbf{x}_n - \bar{\mathbf{x}}$为行，设$C = \frac1N\tilde X^\top\tilde X$为协方差矩阵，其特征值$\lambda_1\ge\dots\ge\lambda_d\ge0$，标准正交特征向量$\mathbf{q}_1, \dots, \mathbf{q}_d$。各$\mathbf{q}_i$称为**主方向**，投影$\tilde{\mathbf{x}}_n\cdot\mathbf{q}_i$称为**主成分**（得分），$\lambda_i/\sum_j\lambda_j$称为第$i$个成分**解释的方差比例**。
:::

由[[#prop-psd]]，数据沿单位向量$\mathbf{u}$的方差是$\mathbf{u}^\top C\mathbf{u}$；由[[#prop-rayleigh]]，它沿$\mathbf{q}_1$最大，值为$\lambda_1$；第二个主方向是与第一个正交的方向中的最佳者，依此类推。等价地，若$\tilde X = U\Sigma V^\top$，则$C = V(\Sigma^\top\Sigma/N)V^\top$，所以主方向就是中心化数据的右奇异向量，且$\lambda_i = \sigma_i^2/N$。各软件库正是通过这个 SVD 计算 PCA 的，这比先造出$C$更精确。由[[#thm-eckart-young]]，把数据投影到前$k$个主方向，得到的是中心化数据的秩$k$近似中总平方误差最小的那个：PCA 既是“最大化保住的方差”，也是“最小化重构误差”。

::: example 五个点的主成分分析 {#ex-pca}
求点$(1, 2)$、$(2, 3)$、$(3, 3)$、$(4, 5)$、$(5, 7)$的第一主方向，以及它解释的方差比例。
::: solution
均值为$(3, 4)$，中心化的点为$(-2,-2)$、$(-1,-1)$、$(0,-1)$、$(1,1)$、$(2,3)$。各项和除以$N = 5$：

$$
C = \frac15\begin{pmatrix}4+1+0+1+4 & 4+1+0+1+6\\ 4+1+0+1+6 & 4+1+1+1+9\end{pmatrix} = \begin{pmatrix}2&2.4\\2.4&3.2\end{pmatrix}.
$$

其迹为$5.2$，行列式为$6.4 - 5.76 = 0.64$，所以$\lambda = 2.6\pm\sqrt{2.6^2 - 0.64} = 2.6\pm2.474$：$\lambda_1 = 5.074$，$\lambda_2 = 0.126$。对应$\lambda_1$的特征向量与$(2.4, \lambda_1 - 2) = (2.4, 3.074)$成比例，归一化后即$\mathbf{q}_1 = (0.615, 0.788)$——正是上面幂迭代找到的结果。第一个成分解释了$5.074/5.2 = 97.6\%$的方差：这些点几乎落在过$(3, 4)$、方向为$\mathbf{q}_1$的直线附近，它们的一维得分为$-2.81, -1.40, -0.79, 1.40, 3.60$。
:::
:::

::: warning 先把数据中心化
PCA 找的是*围绕均值*方差最大的方向。不中心化直接做 SVD，找到的其实是二阶矩最大的方向；对远离原点的数据，这多半就是均值本身的方向——一个只是指向数据云团的“第一成分”。尺度也要紧：对不同单位的特征做 PCA，数值最大的特征说了算，所以特征常常要先标准化。而且 PCA 是线性的：它找的是最佳平直子空间，对落在弯曲曲面上的数据，这可能是一个很糟的概括。
:::

::: application 嵌入向量的可视化
语言模型把词元、句子和内部状态表示成几百几千维的向量。把它们投影到前两三个主成分上，是最简单的观察方式，而且常常能看出结构——相关词聚成的簇、能追踪某种特性（如情感或时态）的方向。可解释性研究经常使用这类线性投影，以及它们的局限；非线性映射（t-SNE、UMAP）能更好地展示局部邻域，但会扭曲全局距离。
:::

::: quiz
$\R^{100}$中一组中心化数据的协方差特征值为$50, 30, 10, 4$，其余$96$个都是$0.0625$。前两个主成分解释了多少比例的方差？
- [ ] $50\%$
- [x] $80\%$
- [ ] $84\%$
- [ ] $2\%$，因为$100$个方向里占两个就是$2\%$
::: solution
总方差是特征值之和（$C$的迹）：$50 + 30 + 10 + 4 + 96\cdot0.0625 = 94 + 6 = 100$。前两个成分承载$50 + 30 = 80$，即$80\%$。方差是按特征值分布的，不是按维数计数的，所以屈指可数的方向就能承载绝大部分方差。
:::
:::

## 语言模型中的低秩 {#sec-lowrank}

把秩$r$矩阵$W\in\R^{m\times n}$存成乘积$W = BA$，其中$B\in\R^{m\times r}$、$A\in\R^{r\times n}$，只需$r(m + n)$个数而不是$mn$个；乘以向量的成本也从$2mn$ FLOPs 降到$2r(m + n)$。当$r$远小于$m$和$n$时，这是一笔可观的节省，机器学习以两种方式利用它。

**压缩训练好的权重。**把训练好的$W$换成截断 SVD $W_k$。由[[#thm-eckart-young]]，这是弗罗贝尼乌斯范数与谱范数下最佳的秩$k$替代，尽管对网络的损失未必如此。早期压缩网络的工作（Denil 等人，2013；Denton 等人，2014）发现，许多权重矩阵都可以这样分解而精度损失很小。在大型语言模型中，预训练权重矩阵的奇异值往往衰减得不够快，不重新训练就激进截断会损失太多；低秩这一想法反而在权重*更新量*上最有用武之地。

**低秩适配。**微调把预训练矩阵$W_0$调整为$W_0 + \Delta W$。Hu 等人（2021）提出了 **LoRA**：冻结$W_0$，把更新量以因子化形式来学习。

::: definition 低秩适配器（LoRA） {#def-lora}
对冻结权重$W_0\in\R^{d_{\text{out}}\times d_{\text{in}}}$和秩$r\ll\min(d_{\text{in}}, d_{\text{out}})$，一个 **LoRA** 层计算

$$
\mathbf{y} = W_0\mathbf{x} + \frac{\alpha}{r}BA\mathbf{x},\qquad B\in\R^{d_{\text{out}}\times r},\ A\in\R^{r\times d_{\text{in}}},
$$

只训练$A$与$B$（共$r(d_{\text{in}} + d_{\text{out}})$个参数）。$B$初始化为零，所以训练恰好从预训练模型出发；$\alpha$是固定的缩放系数。
:::

这一方法依托的是一个**经验的**观察，而非定理：把大型预训练模型适配到某个任务所需的权重改变，似乎具有较低的“内在维度”（Aghajanyan、Zettlemoyer 与 Gupta，2020）；Hu 等人报告，在他们研究的任务上，小至$r = 1$到$8$的秩就能媲美完整微调。低秩够不够用，取决于任务与模型现有能力的差距有多大；当必须学习大量新知识时，LoRA 可能不及完整微调。

::: example 一个 LoRA 适配器的大小 {#ex-lora}
对一个$4096\times4096$的投影施加$r = 8$的 LoRA。这个适配器有多少可训练参数？占完整矩阵的多少？训练之后，如何把适配器的开销从推理成本中彻底去掉？
::: solution
$r(d_{\text{in}} + d_{\text{out}}) = 8\cdot(4096 + 4096) = 65{,}536$个参数，而完整矩阵有$4096^2 = 16{,}777{,}216$个：占$0.39\%$。更新量$\frac{\alpha}{r}BA$是一个普通的、秩至多$8$的$4096\times4096$矩阵，所以训练结束后可以把它直接加进权重，$W = W_0 + \frac{\alpha}{r}BA$，模型的运行成本与原来分毫不差。反过来，让$A$与$B$保持分离，就能让多个任务的不同适配器共享同一份$W_0$。
:::
:::

同样的算术还解释了图谱中的其他设计：多查询注意力与分组查询注意力在各注意力头之间共享键投影与值投影，有些模型则把嵌入矩阵经由一个窄瓶颈分解。每一种情形都是用瘦矩阵的乘积替换一个大矩阵，拿表达能力换内存与算力。

::: history
特征值源于力学与二次型：柯西（Cauchy）在 1829 年证明了对称矩阵的特征值都是实数。奇异值分解由 Eugenio Beltrami（1873）与若尔当（Jordan，1874）各自独立发现，Sylvester（1889）又重新发现了它。Erhard Schmidt（1907）证明了积分算子的最佳逼近性质，Carl Eckart 与 Gale Young（1936）受心理学中因子分析的推动把它推广到矩阵；Leon Mirsky（1960）进一步推广到一切酉不变范数。主成分分析可追溯到 Karl Pearson 的《最佳拟合线与平面》（On lines and planes of closest fit，1901）以及 Harold Hotelling（1933）的工作。Richard von Mises 与 Hilda Pollaczek-Geiringer 在 1929 年描述了幂迭代，Gene Golub 与 William Kahan（1965）给出了今天各软件库计算 SVD 所依赖的稳定方法。在深度学习中，Hu 等人于 2021 年提出 LoRA，它成为参数高效微调中使用最广的方法之一。
:::

::: summary
- 特征向量是方阵只做拉伸的方向；幂$A^k$作用在特征坐标上就是乘以$\lambda_i^k$。对称矩阵有实特征值和标准正交特征向量基，$A = Q\Lambda Q^\top$。
- 协方差矩阵、格拉姆矩阵与黑塞矩阵都是对称矩阵；前两者总是半正定的。$\mathbf{u}^\top A\mathbf{u}$在单位向量上的最大值是$\lambda_1$，幂迭代只靠矩阵–向量乘法就能找到它。
- 每个矩阵都有 SVD $A = U\Sigma V^\top$：先旋转，按奇异值拉伸，再旋转。$\sigma_1$是谱范数，$\sum\sigma_i^2$是弗罗贝尼乌斯范数的平方。
- 由 Eckart–Young 定理，截断 SVD 给出最佳秩$k$近似，误差为$\sigma_{k+1}$（谱范数）或$\big(\sum_{i>k}\sigma_i^2\big)^{1/2}$（弗罗贝尼乌斯范数）。
- PCA 就是中心化数据的 SVD：主方向最大化方差，也最小化重构误差。LoRA 把权重更新学成两个瘦矩阵的乘积，其依据是一个经验发现：这类更新具有低的内在秩。
:::

## 习题

::: exercise 手算特征值 {level=1 check="5"}
求$\begin{pmatrix}4&1\\2&3\end{pmatrix}$的特征值，并给出较大特征值的一个特征向量。较大的特征值是多少？
::: solution
$\det\begin{pmatrix}4-\lambda&1\\2&3-\lambda\end{pmatrix} = \lambda^2 - 7\lambda + 10 = (\lambda - 5)(\lambda - 2)$。对$\lambda = 5$：$-v_1 + v_2 = 0$，所以$(1, 1)$是特征向量；验证$(4 + 1, 2 + 3) = 5(1, 1)$。较大的特征值是$5$。（对应$2$的特征向量是$(1, -2)$，它与$(1,1)$不正交——这个矩阵不是对称的。）
:::
:::

::: exercise 零特征值，非零奇异值 {level=1 check="2"}
求$N = \begin{pmatrix}0&2\\0&0\end{pmatrix}$的特征值与奇异值。它最大的奇异值是多少？
::: solution
$N$是三角矩阵、对角线全为零，所以两个特征值都是$0$。$N^\top N = \begin{pmatrix}0&0\\0&4\end{pmatrix}$的特征值为$4$和$0$，所以奇异值为$2$和$0$。事实上$N(0, 1)^\top = (2, 0)^\top$把某个单位向量的长度变成了两倍，尽管$N^2 = 0$。
:::
:::

::: exercise 长方形矩阵上的 LoRA {level=1 check="241664"}
对一个投影$W_0\in\R^{11008\times4096}$，秩$r = 16$的 LoRA 适配器增加多少个可训练参数？
::: solution
$r(d_{\text{in}} + d_{\text{out}}) = 16\cdot(4096 + 11008) = 241{,}664$，约占$W_0$的$45{,}088{,}768$个元素的$0.54\%$。
:::
:::

::: exercise 分解什么时候划算？ {level=1 check="2048"}
把秩$r$矩阵$W\in\R^{m\times n}$存成$BA$需要$r(m + n)$个数。对$4096\times4096$的矩阵，秩$r$低于多少才开始省内存？
::: solution
当$r(m + n) < mn$，即$r < mn/(m + n) = 4096^2/8192 = 2048$时，分解形式更小。秩低于$2048$时因子化形式就更小；在秩$8$处，它小了$256$倍。
:::
:::

::: exercise 截断误差 {level=2 check="sqrt(5)"}
某矩阵的奇异值为$10, 5, 2, 1$。它的最佳秩二近似的弗罗贝尼乌斯误差是多少？该近似保住了多大比例的弗罗贝尼乌斯范数平方？
::: solution
由[[#thm-eckart-young]]，误差为$\sqrt{2^2 + 1^2} = \sqrt5\approx2.236$（谱范数误差为$\sigma_3 = 2$）。范数平方为$100 + 25 + 4 + 1 = 130$，近似保住了$125/130\approx96.2\%$。
:::
:::

::: exercise 一团对称数据的主成分 {level=2 check="0.6"}
求六个点$(2, 0)$、$(0, 2)$、$(-2, 0)$、$(0, -2)$、$(1, 1)$、$(-1, -1)$的主方向，以及第一个成分解释的方差比例。
::: solution
均值为$(0, 0)$。取$N = 6$：$C_{11} = (4 + 0 + 4 + 0 + 1 + 1)/6 = 10/6$，$C_{22} = 10/6$，$C_{12} = (0 + 0 + 0 + 0 + 1 + 1)/6 = 2/6$。对形如$\begin{pmatrix}a&b\\b&a\end{pmatrix}$的矩阵，特征向量是$(1, 1)/\sqrt2$和$(1, -1)/\sqrt2$，特征值为$a\pm b$：这里是$12/6 = 2$和$8/6 = 4/3$。第一主方向是对角线方向$(1, 1)/\sqrt2$——最后两个点恰好偏向它——它解释了$2/(2 + 4/3) = 0.6$的方差。
:::
:::

::: exercise 迹与行列式 {level=2}
设$A$对称，特征值$\lambda_1, \dots, \lambda_n$。用[[#thm-spectral]]证明$\tr A = \sum_i\lambda_i$，$\det A = \prod_i\lambda_i$，并由此推出：数据集的总方差$\sum_iC_{ii}$等于协方差特征值之和。（可用$\tr(XY) = \tr(YX)$。）
::: solution
$\tr A = \tr(Q\Lambda Q^\top) = \tr(\Lambda Q^\top Q) = \tr\Lambda = \sum_i\lambda_i$；$\det A = \det Q\det\Lambda\det Q^\top = \det\Lambda\,(\det Q)^2 = \prod_i\lambda_i$，因为$(\det Q)^2 = 1$。对协方差矩阵，$C_{ii}$是第$i$个特征的方差，所以各特征方差之和等于$\sum_i\lambda_i$：旋转到主方向只是把总方差在各成分之间重新分配，并不改变它。这就是“解释的方差比例”要除以迹的原因。
:::
:::

::: exercise 幂迭代的快慢 {level=3 check="132"}
在[[#alg-power]]中，设最大两个特征值之比$\lvert\lambda_2/\lambda_1\rvert = 0.9$，起始向量沿$\mathbf{q}_1$与沿$\mathbf{q}_2$的分量相等。证明$k$步之后，沿$\mathbf{q}_2$的分量与沿$\mathbf{q}_1$的分量之比至多为$0.9^k$（忽略其他特征向量），并求使其降到$10^{-6}$以下的最小$k$。
::: solution
归一化给两个分量乘以同一个因子，不改变它们的比。不作归一化，$A^k\mathbf{v}_0 = c_1\lambda_1^k\mathbf{q}_1 + c_2\lambda_2^k\mathbf{q}_2 + \dots$，当$c_1 = c_2$时，第二分量与第一分量之比为$\lvert\lambda_2/\lambda_1\rvert^k = 0.9^k$。需要$0.9^k < 10^{-6}$，即$k > \ln10^{-6}/\ln0.9 = 131.1$，所以$k = 132$。对比[[#sec-power]]中例子的比值$0.025$：那里只需$4$步。特征值顶端分离得好，幂迭代就快；分离不好，就慢。
:::
:::

::: exercise 代码里的秩一近似 {level=3}
写一个朴素 Python 函数，通过对$A^\top A$做幂迭代求矩阵$A\in\R^{m\times n}$的最佳秩一近似，并用[[#ex-svd]]的矩阵测试。为什么对$A^\top A$迭代得到的是$\mathbf{v}_1$？$\sigma_1$与$\mathbf{u}_1$如何恢复？
::: solution
```python
import math

def matvec(A, v):
    return [sum(a * x for a, x in zip(row, v)) for row in A]

def rank_one(A, steps=50):
    # 对 A^T A (n, n) 做幂迭代，求 A (m, n) 的最佳秩一近似
    At = [list(c) for c in zip(*A)]                  # (n, m)
    v = [1.0] * len(At)                              # (n,)
    for _ in range(steps):
        w = matvec(At, matvec(A, v))                 # A^T A v
        nw = math.sqrt(sum(x * x for x in w))
        v = [x / nw for x in w]
    Av = matvec(A, v)                                # (m,) 等于 sigma_1 u_1
    sigma = math.sqrt(sum(x * x for x in Av))
    u = [x / sigma for x in Av]
    A1 = [[sigma * ui * vj for vj in v] for ui in u] # (m, n)
    return sigma, A1

sigma, A1 = rank_one([[3.0, 0.0], [4.0, 5.0]])
print(round(sigma, 6), [[round(x, 6) for x in row] for row in A1])
```

```text
6.708204 [[1.5, 1.5], [4.5, 4.5]]
```

由[[#thm-svd]]，对称半正定矩阵$A^\top A$的特征向量就是右奇异向量，特征值为$\sigma_i^2$，所以幂迭代收敛到$\mathbf{v}_1$（每步的收敛速度是$(\sigma_2/\sigma_1)^2$）。再由$A\mathbf{v}_1 = \sigma_1\mathbf{u}_1$得$\sigma_1 = \lVert A\mathbf{v}_1\rVert$，$\mathbf{u}_1 = A\mathbf{v}_1/\sigma_1$。输出与[[#ex-rank-one]]一致。注意代码交替乘以$A$与$A^\top$，从不真正造出$A^\top A$。
:::
:::

::: exercise 谱范数控制一切拉伸 {level=3}
用 SVD 证明对一切$\mathbf{x}$有$\lVert A\mathbf{x}\rVert\le\sigma_1\lVert\mathbf{x}\rVert$，且$\mathbf{x} = \mathbf{v}_1$时取等，并证明$\lVert AB\rVert_2\le\lVert A\rVert_2\lVert B\rVert_2$。一个网络施加$L = 24$个线性层，每层谱范数$1.1$，没有其他运算。给它能把输入拉伸的倍数一个上界，并解释这与信号爆炸的关系。
::: solution
把$\mathbf{x}$写成$\mathbf{x} = \sum_ic_i\mathbf{v}_i$，$\sum_ic_i^2 = \lVert\mathbf{x}\rVert^2$。则$A\mathbf{x} = \sum_ic_i\sigma_i\mathbf{u}_i$，且$\lVert A\mathbf{x}\rVert^2 = \sum_ic_i^2\sigma_i^2\le\sigma_1^2\sum_ic_i^2$，当全部权重落在$\mathbf{v}_1$上时取等。于是$\lVert AB\mathbf{x}\rVert\le\lVert A\rVert_2\lVert B\mathbf{x}\rVert\le\lVert A\rVert_2\lVert B\rVert_2\lVert\mathbf{x}\rVert$。对这个网络，拉伸至多$1.1^{24}\approx9.85$倍；若谱范数为$1.5$，拉伸可达$1.5^{24}\approx16{,}834$倍；若为$0.9$，信号可能缩到$0.9^{24}\approx0.08$。许多矩阵连乘会把对范数$1$的微小偏离几何式放大，这就是初始化方案、归一化层与残差连接都力求把每层增益保持在$1$附近的原因。
:::
:::
