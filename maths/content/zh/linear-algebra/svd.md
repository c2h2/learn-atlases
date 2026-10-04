对于可对角化的方阵，特征值告诉了我们关于它的一切；但许多矩阵不可对角化，而长方矩阵——比如一个$1000$行$20$列的数据表——根本没有特征值。然而，每个矩阵都有一个极为简洁优美的几何描述。把$A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$作用于单位圆：像是一个椭圆，其最长半轴为$3\sqrt5\approx 6.71$，最短半轴为$\sqrt5\approx 2.24$。两个互相垂直的单位向量$\mathbf{v}_1, \mathbf{v}_2$被映到椭圆的两条轴上：$A\mathbf{v}_1 = 3\sqrt5\,\mathbf{u}_1$，$A\mathbf{v}_2 = \sqrt5\,\mathbf{u}_2$，其中$\mathbf{u}_1, \mathbf{u}_2$也是互相垂直的单位向量。

这对任意维数的每个矩阵都成立：存在输入空间的标准正交基$\mathbf{v}_1, \dots, \mathbf{v}_n$和输出空间的标准正交基$\mathbf{u}_1, \dots, \mathbf{u}_m$，使得$A\mathbf{v}_i = \sigma_i\mathbf{u}_i$。数$\sigma_i\ge 0$称为**奇异值**，而这一结论写成矩阵形式就是**奇异值分解**$A = U\Sigma V\T$：每个线性映射都是先作一个旋转，再沿相互垂直的轴伸缩，最后再作一个旋转。奇异值分解（SVD）或许是应用线性代数中最有用的矩阵分解。它揭示矩阵的秩和四个基本子空间，度量矩阵的大小及其对误差的敏感程度，给出数据压缩和统计学中使用的最佳低秩逼近，并通过伪逆求解一切最小二乘问题。

## 奇异值

对任意实$m\times n$矩阵$A$，$n\times n$矩阵$A\T A$是对称半正定的：$\mathbf{x}\T A\T A\mathbf{x} = \norm{A\mathbf{x}}^2\ge 0$。由谱定理（[[linear-algebra/spectral-theorem#thm-spectral]]），它有一组由特征向量构成的标准正交基，并且它的特征值都是非负的。

::: definition 奇异值 {#def-singular-values}
设$A$是实$m\times n$矩阵，$\lambda_1\ge\lambda_2\ge\dots\ge\lambda_n\ge 0$是$A\T A$的特征值。$A$的**奇异值**定义为$\sigma_i = \sqrt{\lambda_i}$，于是$\sigma_1\ge\sigma_2\ge\dots\ge\sigma_n\ge 0$。
:::

若$\mathbf{v}_i$是$A\T A$的属于$\lambda_i$的单位特征向量，则$\norm{A\mathbf{v}_i}^2 = \mathbf{v}_i\T A\T A\mathbf{v}_i = \lambda_i$：**奇异值$\sigma_i$就是$A\mathbf{v}_i$的长度**。还有更多的结论成立。

::: lemma 特征向量的像 {#lem-svd}
设$\mathbf{v}_1, \dots, \mathbf{v}_n$是$\R^n$的一组由$A\T A$的特征向量构成的标准正交基，按特征值递减的顺序排列，并设$\sigma_1, \dots, \sigma_r > 0$，而$\sigma_{r+1} = \dots = \sigma_n = 0$。则$A\mathbf{v}_1, \dots, A\mathbf{v}_n$两两正交，当$i > r$时$A\mathbf{v}_i = \mathbf{0}$，并且

$$
\mathbf{u}_i = \frac{1}{\sigma_i}A\mathbf{v}_i \qquad (i = 1, \dots, r)
$$

构成$\operatorname{Col}(A)$的一组标准正交基。特别地，$r = \rank A$：秩等于非零奇异值的个数。
:::

::: proof
当$i\neq j$时，$(A\mathbf{v}_i)\cdot(A\mathbf{v}_j) = \mathbf{v}_i\T A\T A\mathbf{v}_j = \lambda_j\,\mathbf{v}_i\cdot\mathbf{v}_j = 0$，并且$\norm{A\mathbf{v}_i}^2 = \lambda_i = \sigma_i^2$。因此当$\sigma_i = 0$时$A\mathbf{v}_i = \mathbf{0}$，且$\mathbf{u}_1, \dots, \mathbf{u}_r$是标准正交的。$\operatorname{Col}(A)$中的每个向量都可写成$A\mathbf{x}$，其中$\mathbf{x} = \sum c_i\mathbf{v}_i$，所以$A\mathbf{x} = \sum_{i\le r}c_i\sigma_i\mathbf{u}_i$：这些$\mathbf{u}_i$张成$\operatorname{Col}(A)$，而且由于它们标准正交，它们线性无关（[[linear-algebra/inner-products#thm-orthogonal-coords]]）。所以它们构成一组基，且$\rank A = \dim\operatorname{Col}(A) = r$。
:::

## 奇异值分解

::: theorem 奇异值分解 {#thm-svd}
设$A$是秩为$r$的实$m\times n$矩阵，其非零奇异值为$\sigma_1\ge\dots\ge\sigma_r > 0$。则

$$
A = U\Sigma V\T,
$$

其中$U$是$m\times m$正交矩阵，$V$是$n\times n$正交矩阵，$\Sigma$是$m\times n$矩阵，它的前$r$个对角元为$\sigma_1, \dots, \sigma_r$，其余元素全为$0$。
:::

::: proof
取[[#lem-svd]]中的$\mathbf{v}_1, \dots, \mathbf{v}_n$和$\mathbf{u}_1, \dots, \mathbf{u}_r$，并把$\mathbf{u}_1, \dots, \mathbf{u}_r$扩充为$\R^m$的标准正交基$\mathbf{u}_1, \dots, \mathbf{u}_m$（先扩充为一组基，再应用格拉姆-施密特（Gram–Schmidt）正交化，[[linear-algebra/inner-products#thm-gram-schmidt]]）。令$V$和$U$是分别以这些向量为列的正交矩阵。则

$$
AV = \begin{pmatrix}A\mathbf{v}_1 & \cdots & A\mathbf{v}_r & A\mathbf{v}_{r+1} & \cdots & A\mathbf{v}_n\end{pmatrix} = \begin{pmatrix}\sigma_1\mathbf{u}_1 & \cdots & \sigma_r\mathbf{u}_r & \mathbf{0} & \cdots & \mathbf{0}\end{pmatrix} = U\Sigma,
$$

这是因为$U\Sigma$的第$j$列当$j\le r$时为$\sigma_j\mathbf{u}_j$，否则为$\mathbf{0}$。两边右乘$V^{-1} = V\T$即得$A = U\Sigma V\T$。
:::

$U$的列$\mathbf{u}_i$称为**左奇异向量**，$V$的列$\mathbf{v}_i$称为**右奇异向量**。奇异值由$A$唯一确定（它们是$A\T A$的特征值的平方根），但奇异向量不是唯一的：可以同时改变$\mathbf{v}_i$和$\mathbf{u}_i$的符号；当奇异值有重复时，还可以在相应的特征空间内自由选取。由于$A\T = V\Sigma\T U\T$，矩阵$A\T$有相同的非零奇异值；而$AA\T = U\Sigma\Sigma\T U\T$表明各$\mathbf{u}_i$是$AA\T$的特征向量。

去掉与零相乘的那些列，就得到两种经常使用的紧凑形式：

$$
A = U_r\Sigma_rV_r\T = \sigma_1\mathbf{u}_1\mathbf{v}_1\T + \sigma_2\mathbf{u}_2\mathbf{v}_2\T + \dots + \sigma_r\mathbf{u}_r\mathbf{v}_r\T,
$$ {#eq-svd-sum}

其中$U_r$和$V_r$分别由前$r$列构成，$\Sigma_r = \diag(\sigma_1, \dots, \sigma_r)$。第二种形式把$A$写成$r$个秩为1的矩阵之和，按重要性递减排列。

::: intuition 旋转、伸缩、再旋转
从右往左读$A\mathbf{x} = U\Sigma V\T\mathbf{x}$。首先，正交矩阵$V\T$把$\mathbf{x}$旋转（或反射），把右奇异向量$\mathbf{v}_i$转到坐标轴上。然后$\Sigma$把第$i$条轴伸缩$\sigma_i$倍（如果$m\neq n$，还要增加或删去一些坐标）。最后$U$把这些轴旋转到左奇异向量$\mathbf{u}_i$上。所以$\R^n$中的单位球面被映为$\operatorname{Col}(A)$中的一个椭球面，其半轴为$\sigma_1\mathbf{u}_1, \dots, \sigma_r\mathbf{u}_r$——在$\sigma_i = 0$的方向上则被完全压扁。
:::

::: widget svd
matrix: 3,0; 4,5
caption: [[#ex-svd-2x2]]中$A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$的奇异值分解，逐个因子地展示。$V\T$旋转单位圆，使右奇异向量落在坐标轴上；$\Sigma$分别按$\sigma_1 = 3\sqrt5$和$\sigma_2 = \sqrt5$伸缩；$U$再把结果旋转到位。编辑矩阵元素并观察椭圆——它的半轴总是奇异值，而$A$的特征值（这里是$3$和$5$）则完全是另一回事。
:::

::: example 2×2矩阵的奇异值分解 {#ex-svd-2x2}
求$A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$的奇异值分解。
::: solution
$A\T A = \begin{pmatrix}3&4\\0&5\end{pmatrix}\begin{pmatrix}3&0\\4&5\end{pmatrix} = \begin{pmatrix}25&20\\20&25\end{pmatrix}$，其特征值为$45$和$5$，单位特征向量为$\mathbf{v}_1 = \frac{1}{\sqrt2}(1, 1)$，$\mathbf{v}_2 = \frac{1}{\sqrt2}(1,-1)$。所以$\sigma_1 = \sqrt{45} = 3\sqrt5$，$\sigma_2 = \sqrt5$。接着，

$$
\mathbf{u}_1 = \frac{1}{\sigma_1}A\mathbf{v}_1 = \frac{1}{3\sqrt5}\cdot\frac{1}{\sqrt2}\begin{pmatrix}3\\9\end{pmatrix} = \frac{1}{\sqrt{10}}\begin{pmatrix}1\\3\end{pmatrix}, \qquad \mathbf{u}_2 = \frac{1}{\sigma_2}A\mathbf{v}_2 = \frac{1}{\sqrt5}\cdot\frac{1}{\sqrt2}\begin{pmatrix}3\\-1\end{pmatrix} = \frac{1}{\sqrt{10}}\begin{pmatrix}3\\-1\end{pmatrix}.
$$

正如引理所保证的，它们是正交的。因此

$$
A = U\Sigma V\T = \frac{1}{\sqrt{10}}\begin{pmatrix}1&3\\3&-1\end{pmatrix}\begin{pmatrix}3\sqrt5&0\\0&\sqrt5\end{pmatrix}\frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}.
$$

**验证：**$\sigma_1\sigma_2 = 15 = \abs{\det A}$（面积的缩放因子），且$\sigma_1^2 + \sigma_2^2 = 50 = 9 + 0 + 16 + 25$，即各元素的平方和；这两个恒等式一般都成立（[[#exr-det-sv]]和[[#thm-norms]]）。
:::
:::

::: example 长方矩阵的奇异值分解 {#ex-svd-rect}
求$A = \begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}$的奇异值分解。
::: solution
这里$A\T A$是$3\times 3$矩阵，而$AA\T = \begin{pmatrix}2&1\\1&2\end{pmatrix}$只是$2\times 2$矩阵，并且二者有相同的非零特征值（$AA\T = U\Sigma\Sigma\T U\T$）。所以用$AA\T$来计算：它的特征值为$3$和$1$，单位特征向量为$\mathbf{u}_1 = \frac{1}{\sqrt2}(1,1)$，$\mathbf{u}_2 = \frac{1}{\sqrt2}(1,-1)$。于是$\sigma_1 = \sqrt3$，$\sigma_2 = 1$，右奇异向量可由$\mathbf{v}_i = \frac{1}{\sigma_i}A\T\mathbf{u}_i$求得（对$A\mathbf{v}_i = \sigma_i\mathbf{u}_i$两边作用$A\T$）：

$$
\mathbf{v}_1 = \frac{1}{\sqrt3}\cdot\frac{1}{\sqrt2}\begin{pmatrix}1\\2\\1\end{pmatrix} = \frac{1}{\sqrt6}\begin{pmatrix}1\\2\\1\end{pmatrix}, \qquad \mathbf{v}_2 = \frac{1}{\sqrt2}\begin{pmatrix}1\\0\\-1\end{pmatrix}.
$$

第三个右奇异向量张成$\operatorname{Nul}(A)$：解$x_1 + x_2 = 0$，$x_2 + x_3 = 0$得$\mathbf{v}_3 = \frac{1}{\sqrt3}(1,-1,1)$。所以

$$
A = \frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}\begin{pmatrix}\sqrt3&0&0\\0&1&0\end{pmatrix}\begin{pmatrix}\frac{1}{\sqrt6}&\frac{2}{\sqrt6}&\frac{1}{\sqrt6}\\[5pt] \frac{1}{\sqrt2}&0&-\frac{1}{\sqrt2}\\[5pt] \frac{1}{\sqrt3}&-\frac{1}{\sqrt3}&\frac{1}{\sqrt3}\end{pmatrix}.
$$

$\R^3$中的单位球面沿$\mathbf{v}_3$方向被压扁，映满$\R^2$中以$\sqrt3\,\mathbf{u}_1$和$\mathbf{u}_2$为半轴的整个椭圆（包括其内部）。
:::
:::

::: warning 不要分别独立地计算U和V
人们很容易想到取$A\T A$的单位特征向量作为$\mathbf{v}_i$，再另外取$AA\T$的单位特征向量作为$\mathbf{u}_i$。但每个特征向量只确定到相差一个符号（在重特征值的特征空间内还只确定到相差一个旋转），所以两边的选取未必相互匹配，这时$U\Sigma V\T\neq A$。在[[#ex-svd-2x2]]中，向量$-\frac{1}{\sqrt{10}}(3,-1)$与$\mathbf{u}_2$同样是$AA\T$的单位特征向量，但用它会得到$\begin{pmatrix}0&3\\5&4\end{pmatrix}$而不是$A$。应当像例题中那样，由一组向量算出另一组——$\mathbf{u}_i = A\mathbf{v}_i/\sigma_i$或$\mathbf{v}_i = A\T\mathbf{u}_i/\sigma_i$——并把结果乘出来加以验证。
:::

奇异值分解同时给出了全部四个基本子空间的标准正交基——这是秩定理的一种精细形式。

::: corollary 由奇异值分解得到四个子空间 {#cor-four-subspaces}
若$A = U\Sigma V\T$的秩为$r$，则$\mathbf{v}_1, \dots, \mathbf{v}_r$是$\operatorname{Row}(A)$的标准正交基，$\mathbf{v}_{r+1}, \dots, \mathbf{v}_n$是$\operatorname{Nul}(A)$的标准正交基，$\mathbf{u}_1, \dots, \mathbf{u}_r$是$\operatorname{Col}(A)$的标准正交基，$\mathbf{u}_{r+1}, \dots, \mathbf{u}_m$是$\operatorname{Nul}(A\T)$的标准正交基。
:::

::: proof
由[[#lem-svd]]，$\mathbf{u}_1, \dots, \mathbf{u}_r$是$\operatorname{Col}(A)$的一组基，且当$i > r$时$A\mathbf{v}_i = \mathbf{0}$。$n - r$个向量$\mathbf{v}_{r+1}, \dots, \mathbf{v}_n$线性无关，且位于维数为$n - r$的$\operatorname{Nul}(A)$中；所以它们构成一组基。它们的正交补由$\mathbf{v}_1, \dots, \mathbf{v}_r$张成，即$\operatorname{Nul}(A)^\perp = \operatorname{Row}(A)$（[[linear-algebra/inner-products#thm-fundamental]]和[[linear-algebra/inner-products#cor-complement]]）。类似地，$\mathbf{u}_{r+1}, \dots, \mathbf{u}_m$张成$\operatorname{Col}(A)^\perp = \operatorname{Nul}(A\T)$。
:::

所以$A$把行空间的标准正交基$\mathbf{v}_1, \dots, \mathbf{v}_r$映为列空间的正交基$\sigma_1\mathbf{u}_1, \dots, \sigma_r\mathbf{u}_r$，并把零空间映为零：在行空间与列空间之间，每个矩阵都不过是一个乔装打扮的对角矩阵。

::: quiz
$A = \begin{pmatrix}0&-2\\1&0\end{pmatrix}$的奇异值是什么？
- [ ] $\pm i\sqrt2$
- [x] $2$和$1$
- [ ] $\sqrt2$和$\sqrt2$
- [ ] $2$和$0$
::: solution
$A\T A = \begin{pmatrix}0&1\\-2&0\end{pmatrix}\begin{pmatrix}0&-2\\1&0\end{pmatrix} = \begin{pmatrix}1&0\\0&4\end{pmatrix}$，所以奇异值为$\sqrt4 = 2$和$\sqrt1 = 1$。$A$的特征值是$\pm i\sqrt2$（由$\lambda^2 + 2 = 0$得到），但奇异值总是非负实数。从几何上看，$A$先把$y$方向伸长为$2$倍，再旋转$90^\circ$；单位圆变成半轴为$2$和$1$的椭圆。
:::
:::

::: remark 奇异值与特征值
对于对称矩阵$A = QDQ\T$，有$A\T A = QD^2Q\T$，所以奇异值就是特征值的绝对值；对于半正定矩阵，奇异值就是特征值。一般情况下二者不同，但它们之间有联系：若$A\mathbf{v} = \lambda\mathbf{v}$且$\norm{\mathbf{v}} = 1$，则$\abs{\lambda} = \norm{A\mathbf{v}}$介于最小和最大伸缩因子之间，即$\sigma_n\le\abs\lambda\le\sigma_1$。对于$\begin{pmatrix}3&0\\4&5\end{pmatrix}$，特征值$3$和$5$介于$\sigma_2\approx 2.24$和$\sigma_1\approx 6.71$之间。特征值描述的是**反复**作用$A$时发生的情况（幂、动力系统）；奇异值描述的是**单次**作用的大小和形状。
:::

## 范数与最佳低秩逼近

一个矩阵有多大？有两种标准的度量。**算子范数**（或称谱范数）是$A$把向量伸长的最大倍数；**弗罗贝尼乌斯（Frobenius）范数**则把$A$看作由其元素排成的一个长向量：

$$
\norm{A} = \max_{\norm{\mathbf{x}} = 1}\norm{A\mathbf{x}}, \qquad \norm{A}_F = \Bigl(\sum_{i,j}a_{ij}^2\Bigr)^{1/2} = \sqrt{\tr(A\T A)}.
$$

::: theorem 用奇异值表示范数 {#thm-norms}
对每个矩阵，$\norm{A} = \sigma_1$，$\norm{A}_F^2 = \sigma_1^2 + \sigma_2^2 + \dots + \sigma_r^2$。
:::

::: proof
$\norm{A\mathbf{x}}^2 = \mathbf{x}\T(A\T A)\mathbf{x}$，由瑞利原理（[[linear-algebra/spectral-theorem#thm-rayleigh]]），它在单位向量上的最大值是$A\T A$的最大特征值$\lambda_1 = \sigma_1^2$，在$\mathbf{v}_1$处取到。对于弗罗贝尼乌斯范数，$\tr(A\T A)$是$A\T A$的特征值之和（[[linear-algebra/eigenvalues#prop-trace-det]]），即$\sum\sigma_i^2$。
:::

现在来看最核心的应用。把和式[[#eq-svd-sum]]截断到前$k$项，得到一个秩为$k$的矩阵

$$
A_k = \sigma_1\mathbf{u}_1\mathbf{v}_1\T + \dots + \sigma_k\mathbf{u}_k\mathbf{v}_k\T,
$$

而且它是该秩下可能达到的最佳逼近。

::: theorem 埃卡特-杨（Eckart–Young）定理 {#thm-eckart-young}
设$A$的秩为$r$，$k < r$。则$\norm{A - A_k} = \sigma_{k+1}$，并且对每个秩不超过$k$的矩阵$B$，

$$
\norm{A - B}\ge\sigma_{k+1}.
$$

同一个矩阵$A_k$也是弗罗贝尼乌斯范数意义下的最佳秩$k$逼近，误差为$\norm{A - A_k}_F = \sqrt{\sigma_{k+1}^2 + \dots + \sigma_r^2}$。
:::

::: proof
$A - A_k = \sum_{i=k+1}^r\sigma_i\mathbf{u}_i\mathbf{v}_i\T$已经是奇异值分解的形式，其最大奇异值为$\sigma_{k+1}$；所以由[[#thm-norms]]，$\norm{A - A_k} = \sigma_{k+1}$。

现在设$\rank B\le k$。由秩-零化度定理，$\dim\operatorname{Nul}(B)\ge n - k$，而$W = \Span(\mathbf{v}_1, \dots, \mathbf{v}_{k+1})$的维数为$k + 1$。由于$(n - k) + (k + 1) > n$，这两个子空间有一个公共的单位向量$\mathbf{x}$（[[linear-algebra/basis-dimension#thm-sum-dim]]）。写$\mathbf{x} = \sum_{i\le k+1}c_i\mathbf{v}_i$，其中$\sum c_i^2 = 1$。则$B\mathbf{x} = \mathbf{0}$，并且

$$
\norm{(A - B)\mathbf{x}}^2 = \norm{A\mathbf{x}}^2 = \Bigl\lVert\sum_{i\le k+1}c_i\sigma_i\mathbf{u}_i\Bigr\rVert^2 = \sum_{i\le k+1}c_i^2\sigma_i^2\ge\sigma_{k+1}^2\sum_{i\le k+1}c_i^2 = \sigma_{k+1}^2.
$$

所以$\norm{A - B}\ge\sigma_{k+1}$。关于弗罗贝尼乌斯范数的结论可以用类似但更长的论证来证明（米尔斯基（Mirsky），1960）；参见霍恩（Horn）和约翰逊（Johnson）的《矩阵分析》（*Matrix Analysis*）。
:::

::: example 最佳秩1逼近 {#ex-rank-one}
求$A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$的最佳秩1逼近$A_1$及其误差。
::: solution
由[[#ex-svd-2x2]]，

$$
A_1 = \sigma_1\mathbf{u}_1\mathbf{v}_1\T = 3\sqrt5\cdot\frac{1}{\sqrt{10}}\begin{pmatrix}1\\3\end{pmatrix}\frac{1}{\sqrt2}\begin{pmatrix}1&1\end{pmatrix} = \frac{3\sqrt5}{\sqrt{20}}\begin{pmatrix}1&1\\3&3\end{pmatrix} = \begin{pmatrix}\frac32&\frac32\\ \frac92&\frac92\end{pmatrix}.
$$

误差为$A - A_1 = \begin{pmatrix}\frac32&-\frac32\\-\frac12&\frac12\end{pmatrix} = \sigma_2\mathbf{u}_2\mathbf{v}_2\T$，$\norm{A - A_1} = \sigma_2 = \sqrt5$，而$\norm{A - A_1}_F = \sqrt{\frac94 + \frac94 + \frac14 + \frac14} = \sqrt5$也与之相同（因为它的秩为1）。由[[#thm-eckart-young]]，没有哪个秩为1的矩阵比它更接近$A$。
:::
:::

::: application 图像压缩与数据约简
一幅灰度图像就是一个由像素亮度构成的$m\times n$矩阵。存储秩$k$逼近$A_k$只需要$k$个向量$\mathbf{u}_i$、$k$个向量$\mathbf{v}_i$和$k$个数$\sigma_i$：共$k(m + n + 1)$个数，而不是$mn$个。对于$1000\times 1000$的图像和$k = 50$，这大约是$100\,000$个数，而不是一百万个；并且由于真实图像的奇异值衰减得很快，图像通常仍然非常容易辨认。把同样的思想应用于以观测为行的数据矩阵，就是**主成分分析**：把各列中心化之后，右奇异向量就是主成分，$\sigma_i^2/(N-1)$就是沿这些方向的方差（[[linear-algebra/spectral-theorem]]）。这类低秩矩阵分解也是Netflix大奖赛（2006—2009年，预测用户对影片的评分）获胜方案的核心。
:::

::: example 五个点的主成分 {#ex-pca}
点$(-2,-1)$、$(-1,-1)$、$(0,0)$、$(1,1)$、$(2,1)$的均值为$(0,0)$。求过原点、使各点到它的**垂直**距离的平方和最小的直线，并把它与$y$关于$x$的最小二乘回归直线作比较。
::: solution
设$X$是以这些点为行的$5\times 2$矩阵，$\mathbf{u}$是沿候选直线方向的单位向量。点$\mathbf{x}_k$到该直线的垂直距离的平方为$\norm{\mathbf{x}_k}^2 - (\mathbf{x}_k\cdot\mathbf{u})^2$（勾股定理），所以总和为$\norm{X}_F^2 - \norm{X\mathbf{u}}^2$。使它最小就是使$\norm{X\mathbf{u}}^2 = \mathbf{u}\T X\T X\mathbf{u}$最大，由瑞利原理，答案是$X$的第一个右奇异向量$\mathbf{v}_1$。这里

$$
X\T X = \begin{pmatrix}10&6\\6&4\end{pmatrix}, \qquad \lambda = 7\pm3\sqrt5\approx 13.71,\ 0.29.
$$

对$\lambda_1 = 7 + 3\sqrt5$，$X\T X - \lambda_1I$的第一行为$(3 - 3\sqrt5,\ 6)$，所以$\mathbf{v}_1$平行于$(6,\ 3\sqrt5 - 3)$，即平行于$(2, \sqrt5 - 1)$。最佳直线的斜率为$\frac{\sqrt5 - 1}{2}\approx 0.618$——黄金比的倒数——而垂直距离平方和的最小值为$\sigma_2^2 = 7 - 3\sqrt5\approx 0.29$。回归直线的斜率则是$S_{xy}/S_{xx} = \frac{6}{10} = 0.6$（[[linear-algebra/least-squares#eq-slope]]）：它最小化的是**竖直**距离，把$x$的值视为精确的；而主成分对两个坐标一视同仁（这也称为**总体最小二乘**）。第一主成分承载了数据总变差的$\sigma_1^2/(\sigma_1^2 + \sigma_2^2) = 13.71/14\approx 98\%$。
:::
:::

::: widget regression
points: -2,-1; -1,-1; 0,0; 1,1; 2,1
degree: 1
residuals: true
x: -3, 3
y: -2.5, 2.5
caption: [[#ex-pca]]中的点及其最小二乘直线$y = 0.6x$；残差是竖直的。由奇异值分解求出的第一主方向略陡一些，斜率为$0.618$，因为它度量的是垂直于直线的距离。竖直拖动外侧的点：回归斜率随数据线性变化，而主方向总是沿着点云的长轴。
:::

## 伪逆与最小二乘

奇异值分解可以求解一切最小二乘问题，包括$A$的列线性相关、正规方程有无穷多个解的情形。

::: definition 伪逆 {#def-pseudoinverse}
若$A = U\Sigma V\T$的秩为$r$，则它的**伪逆**（又称穆尔-彭罗斯（Moore–Penrose）伪逆）是$n\times m$矩阵

$$
A^+ = V\Sigma^+U\T = \frac{1}{\sigma_1}\mathbf{v}_1\mathbf{u}_1\T + \dots + \frac{1}{\sigma_r}\mathbf{v}_r\mathbf{u}_r\T,
$$

其中$\Sigma^+$是$n\times m$矩阵，其对角元为$1/\sigma_1, \dots, 1/\sigma_r$，其余元素均为零。
:::

伪逆在能够逆转的地方逆转$A$的作用——它把$\mathbf{u}_i$映回$\mathbf{v}_i/\sigma_i$——并把$A$永远到达不了的$\operatorname{Nul}(A\T)$映为$\mathbf{0}$。若$A$可逆，则$A^+ = A^{-1}$；若$A$的列线性无关，则$A^+ = (A\T A)^{-1}A\T$（见[[#exr-pinv-formula]]）。

::: theorem 最小范数最小二乘解 {#thm-pinv}
对每个$\mathbf{b}\in\R^m$，向量$\mathbf{x}^+ = A^+\mathbf{b}$是$A\mathbf{x} = \mathbf{b}$的最小二乘解，并且它的长度比其他任何最小二乘解都小。
:::

::: proof
用正交矩阵作坐标变换：令$\mathbf{y} = V\T\mathbf{x}$，$\mathbf{c} = U\T\mathbf{b}$。正交矩阵保持长度不变，所以

$$
\norm{\mathbf{b} - A\mathbf{x}}^2 = \norm{U\T(\mathbf{b} - U\Sigma V\T\mathbf{x})}^2 = \norm{\mathbf{c} - \Sigma\mathbf{y}}^2 = \sum_{i=1}^r(c_i - \sigma_iy_i)^2 + \sum_{i=r+1}^m c_i^2.
$$

它取最小值当且仅当对$i\le r$有$y_i = c_i/\sigma_i$，而坐标$y_{r+1}, \dots, y_n$可以任意：这样的$\mathbf{x} = V\mathbf{y}$就是全部最小二乘解。由于$\norm{\mathbf{x}} = \norm{\mathbf{y}}$，其中最短的解满足$y_{r+1} = \dots = y_n = 0$，即$\mathbf{y} = \Sigma^+\mathbf{c}$，$\mathbf{x} = V\Sigma^+U\T\mathbf{b} = A^+\mathbf{b}$。
:::

::: example 单个方程的最短解 {#ex-pinv}
用伪逆求$x_1 + x_2 + x_3 = 3$的最短解。
::: solution
$A = (1\ \ 1\ \ 1)$满足$AA\T = (3)$，所以$\sigma_1 = \sqrt3$，$\mathbf{u}_1 = (1)$，$\mathbf{v}_1 = \frac{1}{\sqrt3}A\T\mathbf{u}_1 = \frac{1}{\sqrt3}(1,1,1)$。因此

$$
A^+ = \frac{1}{\sigma_1}\mathbf{v}_1\mathbf{u}_1\T = \frac{1}{\sqrt3}\cdot\frac{1}{\sqrt3}\begin{pmatrix}1\\1\\1\end{pmatrix} = \frac13\begin{pmatrix}1\\1\\1\end{pmatrix}, \qquad \mathbf{x}^+ = A^+(3) = \begin{pmatrix}1\\1\\1\end{pmatrix}.
$$

该方程的所有解构成一个平面，而$(1,1,1)$是这个平面上离原点最近的点——即垂足，它位于行空间中，正如[[linear-algebra/least-squares#exr-shortest]]所预言的那样。
:::
:::

### 敏感性与条件数

如果$A$可逆，而数据$\mathbf{b}$含有误差，那么$A\mathbf{x} = \mathbf{b}$的解会错到什么程度？奇异值分解精确地回答了这个问题。

::: proposition 条件数 {#prop-condition}
设$A$可逆，$A\mathbf{x} = \mathbf{b}\neq\mathbf{0}$，$A(\mathbf{x} + \delta\mathbf{x}) = \mathbf{b} + \delta\mathbf{b}$。则

$$
\frac{\norm{\delta\mathbf{x}}}{\norm{\mathbf{x}}}\le\kappa(A)\,\frac{\norm{\delta\mathbf{b}}}{\norm{\mathbf{b}}}, \qquad \kappa(A) = \frac{\sigma_1}{\sigma_n},
$$

并且对适当的$\mathbf{b}$和$\delta\mathbf{b}$，这个界可以达到。数$\kappa(A)$称为$A$的**条件数**。
:::

::: proof
$\delta\mathbf{x} = A^{-1}\delta\mathbf{b}$，而$A^{-1} = V\Sigma^{-1}U\T$的最大奇异值为$1/\sigma_n$，所以$\norm{\delta\mathbf{x}}\le\norm{\delta\mathbf{b}}/\sigma_n$。又$\norm{\mathbf{b}} = \norm{A\mathbf{x}}\le\sigma_1\norm{\mathbf{x}}$，即$1/\norm{\mathbf{x}}\le\sigma_1/\norm{\mathbf{b}}$。把这两个不等式相乘即得结论。当$\mathbf{x} = \mathbf{v}_1$（从而$\mathbf{b} = \sigma_1\mathbf{u}_1$）且$\delta\mathbf{b}$是$\mathbf{u}_n$的倍数时，等号成立。
:::

条件数为$10^k$意味着求解方程组时可能损失多达$k$位有效数字。由于$A\T A$的奇异值为$\sigma_i^2$，它的条件数是$\kappa(A)^2$——这正是正规方程比QR方法多损失一倍有效数字的确切原因（[[linear-algebra/least-squares#ex-lauchli]]）。相比之下，行列式不是衡量矩阵接近奇异程度的好指标：$\frac{1}{10}I$（$100\times 100$）的行列式为$10^{-100}$，但条件数为$1$。

::: widget svd
matrix: 2,1.9; 1,1
caption: 一个接近奇异的矩阵。它的两列几乎平行，所以单位圆被压成一个细长的椭圆：$\sigma_1\approx 3.10$，而$\sigma_2\approx 0.032$，条件数约为$96$。矩阵元素的微小变化可能使$\sigma_2$剧烈变化——试着把$1.9$改为$2$，矩阵就变成奇异的，$\sigma_2 = 0$。衡量矩阵有多接近奇异的可靠尺度是这个很小的奇异值，而不是行列式：由[[#thm-eckart-young]]，$\sigma_2$恰好就是到最近的奇异矩阵的距离。
:::

::: remark 奇异值分解的计算
构造$A\T A$再求它的特征向量，用于手算没有问题，但与正规方程一样，这会使条件数平方。库函数的做法是先用正交（豪斯霍尔德（Householder））变换把$A$化为双对角矩阵，再应用QR特征值算法的一种变体——戈卢布-卡汉-赖因施（Golub–Kahan–Reinsch）方法；对于$m\ge n$的$m\times n$矩阵，其计算量为$mn^2$量级的运算次数。对于巨型矩阵，迭代法和随机化方法只计算最大的少数几个奇异值和奇异向量，而这正是低秩逼近所需要的全部。
:::

::: quiz
$5\times 3$矩阵$A$的奇异值为$4$、$2$、$0$。下列哪些说法正确？（选出所有正确的选项。）
- [x] $\rank A = 2$
- [x] $\norm{A} = 4$
- [x] $\dim\operatorname{Nul}(A) = 1$
- [ ] $\norm{A}_F = 6$
::: solution
秩等于非零奇异值的个数，即$2$（[[#lem-svd]]）；算子范数为$\sigma_1 = 4$（[[#thm-norms]]）；由秩-零化度定理得$\dim\operatorname{Nul}(A) = 3 - 2 = 1$（由$\mathbf{v}_3$张成）。弗罗贝尼乌斯范数是$\sqrt{16 + 4 + 0} = \sqrt{20}$，而不是$4 + 2$。
:::
:::

::: history
奇异值分解由欧金尼奥·贝尔特拉米（Eugenio Beltrami，1873年）和卡米尔·若尔当（Camille Jordan，1874年）各自独立发现，他们证明了实双线性型可以通过两次正交的变量替换化为对角形；詹姆斯·约瑟夫·西尔维斯特（James Joseph Sylvester）于1889年又针对实方阵重新发现了它。埃哈德·施密特（Erhard Schmidt，1907年）发展了积分算子的相应理论，其中包括低秩逼近性质；埃米尔·皮卡（Émile Picard，1910年）引入了“奇异值”（*singular values*）这一名称。心理测量学家卡尔·埃卡特（Carl Eckart）和盖尔·杨（Gale Young）（1936年）处理了一般的长方矩阵，并证明了以他们的名字命名的矩阵逼近定理；伪逆归功于E. H. 穆尔（E. H. Moore，1920年）和罗杰·彭罗斯（Roger Penrose，1955年）。直到吉恩·戈卢布（Gene Golub）和威廉·卡汉（William Kahan）于1965年提出稳定的算法，并由戈卢布和克里斯蒂安·赖因施（Christian Reinsch）于1970年加以改进，奇异值分解才成为实用的工具；这一算法在计算过程中从不构造$A\T A$。
:::

## 后续内容

奇异值分解是数值线性代数、统计学和数据科学中的主力工具：它能可靠地计算秩和零空间，求解秩亏的最小二乘问题，度量问题的条件（[[numerical-analysis/direct-methods]]），并且是主成分分析、潜在语义索引和推荐系统的基础。在无穷维情形，紧算子也具有同样的结构，它是积分方程理论的出发点。把奇异值分解的各因子换一种方式组合，就得到**极分解**$A = (UV\T)(V\Sigma V\T)$，即一个正交矩阵乘以一个半正定矩阵（[[#exr-polar]]）——这是把复数写成$re^{i\theta}$的矩阵类比。对于不可对角化的方阵，这些结果在特征值方面的对应物是若尔当标准形（[[linear-algebra/jordan-form]]）。

::: summary
- $A$的奇异值$\sigma_1\ge\dots\ge\sigma_n\ge 0$是$A\T A$的特征值的平方根；$\sigma_i = \norm{A\mathbf{v}_i}$，非零奇异值的个数等于秩（[[#lem-svd]]）。
- 每个矩阵都有奇异值分解$A = U\Sigma V\T$，其中$U, V$是正交矩阵：$A\mathbf{v}_i = \sigma_i\mathbf{u}_i$（[[#thm-svd]]）。几何上：旋转，沿坐标轴伸缩，再旋转；单位球面变为半轴为$\sigma_i$的椭球面。
- $A = \sum_{i\le r}\sigma_i\mathbf{u}_i\mathbf{v}_i\T$；奇异向量给出全部四个基本子空间的标准正交基。
- $\norm{A} = \sigma_1$，$\norm{A}_F^2 = \sum\sigma_i^2$（[[#thm-norms]]）。
- 埃卡特-杨定理：把奇异值分解截断到前$k$项，得到最佳秩$k$逼近，误差为$\sigma_{k+1}$（[[#thm-eckart-young]]）。
- 伪逆$A^+ = V\Sigma^+U\T$给出最短的最小二乘解$A^+\mathbf{b}$（[[#thm-pinv]]）。
- 条件数$\sigma_1/\sigma_n$界定了相对误差的放大倍数；$A\T A$的条件数为$\kappa(A)^2$。
:::

## 习题

::: exercise 对角矩阵的例子 {level=1 check="3"}
求$A = \begin{pmatrix}2&0\\0&-3\end{pmatrix}$的奇异值和一个奇异值分解。$\sigma_1$是多少？
::: solution
$A\T A = \diag(4, 9)$，所以$\sigma_1 = 3$，$\sigma_2 = 2$。取$\mathbf{v}_1 = \mathbf{e}_2$，$\mathbf{v}_2 = \mathbf{e}_1$，得$\mathbf{u}_1 = A\mathbf{e}_2/3 = -\mathbf{e}_2$，$\mathbf{u}_2 = A\mathbf{e}_1/2 = \mathbf{e}_1$，所以

$$
A = \begin{pmatrix}0&1\\-1&0\end{pmatrix}\begin{pmatrix}3&0\\0&2\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix}.
$$

奇异值就是对角元的绝对值按从大到小排列；负号被吸收到$U$中。
:::
:::

::: exercise 算子范数 {level=1 check="sqrt(2)"}
对$A = \begin{pmatrix}1&1\\0&0\end{pmatrix}$求$\norm{A}$，以及取到它的一个单位向量。
::: solution
$A\T A = \begin{pmatrix}1&1\\1&1\end{pmatrix}$的特征值为$2$和$0$，所以$\sigma_1 = \sqrt2$，$\norm{A} = \sqrt2$，在$\mathbf{v}_1 = \frac{1}{\sqrt2}(1,1)$处取到：确实，$A\mathbf{v}_1 = (\sqrt2, 0)$。
:::
:::

::: exercise 用两种方法求弗罗贝尼乌斯范数 {level=1 check="5"}
一个$3\times 2$矩阵的奇异值为$3$和$4$。它的弗罗贝尼乌斯范数是多少？对$A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$验证公式$\norm{A}_F^2 = \sum\sigma_i^2$。
::: solution
由[[#thm-norms]]，$\norm{A}_F = \sqrt{9 + 16} = 5$。对于给定的$2\times 2$矩阵，各元素的平方和为$9 + 0 + 16 + 25 = 50$，而$\sigma_1^2 + \sigma_2^2 = 45 + 5 = 50$。
:::
:::

::: exercise 完全奇异值分解 {level=2}
求$A = \begin{pmatrix}1&1\\1&1\\0&0\end{pmatrix}$的一个完全奇异值分解及其伪逆。
::: solution
$A\T A = \begin{pmatrix}2&2\\2&2\end{pmatrix}$的特征值为$4$和$0$，对应$\mathbf{v}_1 = \frac{1}{\sqrt2}(1,1)$，$\mathbf{v}_2 = \frac{1}{\sqrt2}(1,-1)$。所以$\sigma_1 = 2$，$r = 1$，$\mathbf{u}_1 = \frac12A\mathbf{v}_1 = \frac{1}{\sqrt2}(1,1,0)$。用$\mathbf{u}_2 = \frac{1}{\sqrt2}(1,-1,0)$和$\mathbf{u}_3 = (0,0,1)$扩充为$\R^3$的标准正交基：

$$
A = \begin{pmatrix}\frac{1}{\sqrt2}&\frac{1}{\sqrt2}&0\\[5pt] \frac{1}{\sqrt2}&-\frac{1}{\sqrt2}&0\\[5pt]0&0&1\end{pmatrix}\begin{pmatrix}2&0\\0&0\\0&0\end{pmatrix}\frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}.
$$

于是$A^+ = \frac12\mathbf{v}_1\mathbf{u}_1\T = \frac12\cdot\frac12\begin{pmatrix}1\\1\end{pmatrix}\begin{pmatrix}1&1&0\end{pmatrix} = \frac14\begin{pmatrix}1&1&0\\1&1&0\end{pmatrix}$。
:::
:::

::: exercise 秩1矩阵的伪逆 {level=2 check="1/25"}
设$A = \begin{pmatrix}1&2\\2&4\end{pmatrix}$。求$A^+$以及$A\mathbf{x} = (1, 0)$的最短最小二乘解。$A^+$的$(1,1)$元是多少？
::: solution
$A = \mathbf{w}\mathbf{w}\T$，其中$\mathbf{w} = (1, 2)$，所以$A = 5\,\mathbf{u}\mathbf{u}\T$，其中$\mathbf{u} = \frac{1}{\sqrt5}(1,2)$是单位向量：这就是一个奇异值分解，$\sigma_1 = 5$，$\mathbf{u}_1 = \mathbf{v}_1 = \mathbf{u}$。因此$A^+ = \frac15\mathbf{u}\mathbf{u}\T = \frac{1}{25}\begin{pmatrix}1&2\\2&4\end{pmatrix}$，其$(1,1)$元为$\frac1{25}$。最短的最小二乘解为$A^+(1,0) = \frac{1}{25}(1, 2)$。验证：它位于$\operatorname{Row}(A) = \Span\bigl((1,2)\bigr)$中，并且$A\mathbf{x}^+ = \frac15(1,2)$是$(1,0)$在$\operatorname{Col}(A) = \Span\bigl((1,2)\bigr)$上的投影。
:::
:::

::: exercise 条件数的计算 {level=2 check="3"}
求$A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$和$A\T A$的条件数。
::: solution
由[[#ex-svd-2x2]]，$\kappa(A) = \sigma_1/\sigma_2 = 3\sqrt5/\sqrt5 = 3$。矩阵$A\T A = \begin{pmatrix}25&20\\20&25\end{pmatrix}$是对称正定矩阵，特征值为$45$和$5$，它们也是它的奇异值，所以$\kappa(A\T A) = 9 = \kappa(A)^2$。
:::
:::

::: exercise 截断长方矩阵的奇异值分解 {level=2 check="1"}
求$A = \begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}$（见[[#ex-svd-rect]]）的最佳秩1逼近$A_1$及误差$\norm{A - A_1}$。
::: solution
$A_1 = \sigma_1\mathbf{u}_1\mathbf{v}_1\T = \sqrt3\cdot\frac{1}{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix}\frac{1}{\sqrt6}\begin{pmatrix}1&2&1\end{pmatrix} = \frac12\begin{pmatrix}1&2&1\\1&2&1\end{pmatrix}$。由[[#thm-eckart-young]]，误差为$\norm{A - A_1} = \sigma_2 = 1$；确实，$A - A_1 = \frac12\begin{pmatrix}1&0&-1\\-1&0&1\end{pmatrix} = \sigma_2\mathbf{u}_2\mathbf{v}_2\T$。
:::
:::

::: exercise 行列式与奇异值 {level=2 #exr-det-sv}
证明：对每个方阵，$\abs{\det A} = \sigma_1\sigma_2\cdots\sigma_n$，并且$A$可逆当且仅当$\sigma_n > 0$。举出一个行列式极小、但奇异值全都相等的矩阵的例子。
::: solution
由于正交矩阵的行列式为$\pm1$，$\det A = \det U\det\Sigma\det V\T = (\pm1)(\sigma_1\cdots\sigma_n)(\pm1)$。所以$\abs{\det A} = \prod\sigma_i$，它非零当且仅当每个$\sigma_i > 0$，也就是当且仅当$\sigma_n > 0$。（从几何上看：椭球的体积是单位球体积的$\prod\sigma_i$倍。）例子：$A = 0.1\,I_{10}$的$\det A = 10^{-10}$，但所有奇异值都等于$0.1$，且$\kappa(A) = 1$——完全良态。
:::
:::

::: exercise 列线性无关时的伪逆 {level=3 #exr-pinv-formula}
证明：若$A$的列线性无关，则$A^+ = (A\T A)^{-1}A\T$；若$A$可逆，则$A^+ = A^{-1}$。
::: solution
各列线性无关意味着$r = n$，所以$\Sigma = \begin{pmatrix}\Sigma_n\\O\end{pmatrix}$，其中$\Sigma_n = \diag(\sigma_1, \dots, \sigma_n)$可逆。于是$A\T A = V\Sigma\T\Sigma V\T = V\Sigma_n^2V\T$，$(A\T A)^{-1} = V\Sigma_n^{-2}V\T$，所以

$$
(A\T A)^{-1}A\T = V\Sigma_n^{-2}V\T V\Sigma\T U\T = V\Sigma_n^{-2}\Sigma\T U\T = V\Sigma^+U\T = A^+,
$$

这是因为$\Sigma_n^{-2}\Sigma\T = (\Sigma_n^{-1}\ \ O) = \Sigma^+$。若$A$是可逆方阵，则$(A\T A)^{-1}A\T = A^{-1}(A\T)^{-1}A\T = A^{-1}$。
:::
:::

::: exercise 极分解 {level=3 #exr-polar}
证明：每个实方阵都可以写成$A = QS$，其中$Q$是正交矩阵，$S$是对称半正定矩阵，并且$S = \sqrt{A\T A}$（唯一的半正定平方根）。求$\begin{pmatrix}3&0\\4&5\end{pmatrix}$的极分解。
::: solution
设$A = U\Sigma V\T$（$A$是方阵，所以$\Sigma$是对角矩阵），写$A = (UV\T)(V\Sigma V\T)$。$Q = UV\T$是正交矩阵，$S = V\Sigma V\T$是对称矩阵，其特征值$\sigma_i$非负；并且$S^2 = V\Sigma^2V\T = A\T A$。对于这个例子，取$V = \frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$，$\Sigma = \diag(3\sqrt5, \sqrt5)$：

$$
S = V\Sigma V\T = \frac{\sqrt5}{2}\begin{pmatrix}4&2\\2&4\end{pmatrix} = \sqrt5\begin{pmatrix}2&1\\1&2\end{pmatrix}, \qquad Q = AS^{-1} = \frac{1}{\sqrt5}\begin{pmatrix}2&-1\\1&2\end{pmatrix}.
$$

$Q$是一个旋转（转角为$\arctan\frac12$），并且确实有$QS = \begin{pmatrix}2&-1\\1&2\end{pmatrix}\begin{pmatrix}2&1\\1&2\end{pmatrix} = \begin{pmatrix}3&0\\4&5\end{pmatrix}$。（半正定平方根的唯一性由谱定理得出：这样的平方根在$A\T A$的每个特征空间上必然作用为乘以$\sqrt{\lambda}$。）
:::
:::
