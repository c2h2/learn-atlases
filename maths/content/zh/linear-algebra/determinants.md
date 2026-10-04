$2\times 2$矩阵$\begin{pmatrix}a&b\\c&d\end{pmatrix}$可逆当且仅当$ad - bc\neq 0$（[[linear-algebra/matrices#thm-inverse-2x2]]）。对于$n\times n$矩阵，是否也有一个数能以同样的方式判定可逆性？答案是肯定的：这就是**行列式**$\det A$。它有一个引人注目的几何意义——$\abs{\det A}$是映射$\mathbf{x}\mapsto A\mathbf{x}$使面积和体积放大的倍数，而$\det A$的符号记录了该映射是保持还是反转定向。矩阵奇异当且仅当它把空间压扁，也就是当且仅当体积的放大倍数为零。

行列式可以通过一个有$n!$项、令人望而生畏的公式来引入。我们走一条更有启发性的路：列出任何“有向体积”概念都必须具有的三条简单性质，证明恰好只有一个函数具有这些性质，然后从这些性质推导出其余的一切——行变换的效果、乘积法则$\det(AB) = \det A\det B$、代数余子式展开、克拉默法则以及体积解释。

## 平面上的有向面积

设$2\times 2$矩阵的两列$\mathbf{v} = (a, c)$和$\mathbf{w} = (b, d)$张成一个平行四边形。它的面积是$\abs{ad - bc}$，值得仅从性质出发来看看这是为什么。用$D(\mathbf{v}, \mathbf{w})$表示**有向面积**：若从$\mathbf{v}$转到$\mathbf{w}$是逆时针方向，则面积取正号；若是顺时针方向，则取负号。于是：

1. $D$**对每个变元都是线性的**。把$\mathbf{w}$固定作为底边，有向面积等于底边长乘以$\mathbf{v}$相对于$\mathbf{w}$所在直线的有向高度，而有向高度是$\mathbf{v}$的线性函数。对$\mathbf{w}$也类似。
2. $D(\mathbf{v}, \mathbf{v}) = 0$：两条边相同的平行四边形是扁平的。
3. $D(\mathbf{e}_1, \mathbf{e}_2) = 1$：单位正方形的面积为$1$。

由(1)和(2)，$0 = D(\mathbf{v} + \mathbf{w}, \mathbf{v} + \mathbf{w}) = D(\mathbf{v},\mathbf{w}) + D(\mathbf{w},\mathbf{v})$，所以交换两个变元时$D$变号。现在展开：

$$
D(a\mathbf{e}_1 + c\mathbf{e}_2,\ b\mathbf{e}_1 + d\mathbf{e}_2) = ab\,D(\mathbf{e}_1, \mathbf{e}_1) + ad\,D(\mathbf{e}_1,\mathbf{e}_2) + cb\,D(\mathbf{e}_2,\mathbf{e}_1) + cd\,D(\mathbf{e}_2,\mathbf{e}_2) = ad - bc.
$$

所以这三条性质**迫使**公式只能是$ad - bc$。同样的思路在任何维数下都适用。

::: widget transform2d
matrix: 2,1; 1,3
caption: 单位正方形（面积为$1$）被映成由列向量$(2,1)$和$(1,3)$张成的平行四边形，其面积为$\det A = 2\cdot 3 - 1\cdot 1 = 5$。每个区域都被放大同样的倍数$5$。编辑矩阵元素：当两列变得平行时（试试$\begin{pmatrix}2&4\\1&2\end{pmatrix}$），平行四边形塌缩，行列式为$0$；当两列交换顺序时，正方形被翻转过来，行列式变为负数。
:::

## 行列式：定义、存在性与唯一性

我们把$n\times n$矩阵的函数看作其各行$\mathbf{r}_1, \dots, \mathbf{r}_n$的函数（用行来处理与消元法相吻合；我们将会看到，用列也同样可行）。

::: definition 行列式函数 {#def-det}
函数$D\colon M_n(\F)\to\F$称为**行列式函数**，如果它满足：

1. **（多重线性）**当其余各行固定时，它对每一行都是线性的：对每个$i$，
   $D(\dots, a\mathbf{r} + b\mathbf{s}, \dots) = a\,D(\dots,\mathbf{r},\dots) + b\,D(\dots,\mathbf{s},\dots)$，其中写出的变元是第$i$行；
2. **（交错性）**只要$A$有两行相等，就有$D(A) = 0$；
3. **（规范性）**$D(I) = 1$。
:::

在证明这样的函数存在之前，我们先推导它在行变换下必然如何变化。

::: lemma 行变换与行列式函数 {#lem-row-ops}
设$D$满足[[#def-det]]中的条件1和2。则

1. 交换两行使$D(A)$乘以$-1$；
2. 把一行的倍数加到另一行上，$D(A)$不变；
3. 把某一行乘以$c$，$D(A)$也乘以$c$；
4. 若$A$有一行为零，则$D(A) = 0$。
:::

::: proof
1. 在第$i$个和第$j$个位置上都放$\mathbf{r}_i + \mathbf{r}_j$，再利用多重线性展开：
   $$
   0 = D(\dots,\mathbf{r}_i + \mathbf{r}_j,\dots,\mathbf{r}_i + \mathbf{r}_j,\dots) = D(\dots,\mathbf{r}_i,\dots,\mathbf{r}_i,\dots) + D(\dots,\mathbf{r}_i,\dots,\mathbf{r}_j,\dots) + D(\dots,\mathbf{r}_j,\dots,\mathbf{r}_i,\dots) + D(\dots,\mathbf{r}_j,\dots,\mathbf{r}_j,\dots).
   $$
   由交错性，第一项和最后一项为零，所以中间两项互为相反数。
2. $D(\dots,\mathbf{r}_i + c\mathbf{r}_j,\dots,\mathbf{r}_j,\dots) = D(\dots,\mathbf{r}_i,\dots,\mathbf{r}_j,\dots) + c\,D(\dots,\mathbf{r}_j,\dots,\mathbf{r}_j,\dots)$，而最后一项为$0$。
3. 这就是对一行的线性。
4. 零行等于它自身的$0$倍，所以由第3部分，$D(A) = 0\cdot D(A) = 0$。
:::

为了写出公式，我们需要置换。$\{1, \dots, n\}$的一个**置换**是这个集合到自身的一个双射$\sigma$；这样的置换共有$n!$个，它们构成集合$S_n$。每个置换有一个**符号**$\sgn\sigma\in\{1, -1\}$：若$\sigma$可以写成$k$个对换（交换两个元素）的复合，则符号等于$(-1)^k$。我们要用到三个标准事实，它们在[[abstract-algebra/permutation-groups]]中有证明：符号是良定义的（把$\sigma$写成对换之积的所有方式都有相同的奇偶性）；$\sgn(\sigma\tau) = \sgn\sigma\,\sgn\tau$；从而$\sgn(\sigma^{-1}) = \sgn\sigma$，并且与一个对换复合会改变符号。

::: theorem 行列式的存在性与唯一性 {#thm-det-unique}
$M_n(\F)$上存在唯一的行列式函数。它称为**行列式**，记作$\det A$或$\abs{A}$，由**莱布尼茨公式**给出：

$$
\det A = \sum_{\sigma\in S_n}\sgn(\sigma)\,a_{1\sigma(1)}\,a_{2\sigma(2)}\cdots a_{n\sigma(n)}.
$$ {#eq-leibniz}
:::

::: proof
*唯一性*。设$D$是一个行列式函数。$A$的第$i$行是$\mathbf{r}_i = \sum_{j} a_{ij}\mathbf{e}_j\T$。利用多重线性把每一行都展开，得

$$
D(A) = \sum_{j_1 = 1}^n\cdots\sum_{j_n = 1}^n a_{1j_1}a_{2j_2}\cdots a_{nj_n}\,D(\mathbf{e}_{j_1}\T, \dots, \mathbf{e}_{j_n}\T).
$$

若指标$j_1, \dots, j_n$中有两个相同，则以$\mathbf{e}_{j_1}\T, \dots, \mathbf{e}_{j_n}\T$为行的矩阵有两行相等，该项为零。留下来的是那些对某个置换$\sigma$有$(j_1, \dots, j_n) = (\sigma(1), \dots, \sigma(n))$的项。以$\mathbf{e}_{\sigma(1)}\T, \dots, \mathbf{e}_{\sigma(n)}\T$为行的矩阵$P_\sigma$是把单位矩阵的行重新排列所得的矩阵；把$\sigma$写成$k$个对换之积，则$P_\sigma$可以经过$k$次行交换变成$I$，所以由[[#lem-row-ops]]，$D(P_\sigma) = (-1)^kD(I) = \sgn\sigma$。因此$D(A)$等于[[#eq-leibniz]]的右端：行列式函数至多有一个。

*存在性*。用[[#eq-leibniz]]定义$\det A$，然后验证三个条件。*规范性*：对$A = I$，乘积$a_{1\sigma(1)}\cdots a_{n\sigma(n)}$仅当对所有$i$都有$\sigma(i) = i$时才非零，所以$\det I = \sgn(\mathrm{id}) = 1$。*多重线性*：每一项都恰好含有第$i$行的一个元素作为因子，所以每一项——从而它们的和——对第$i$行是线性的。*交错性*：设第$k$行与第$l$行（$k\neq l$）相等，令$\tau$为交换$k$与$l$的对换。映射$\sigma\mapsto\sigma\tau$把$S_n$中的置换两两配对（$\sigma\tau\neq\sigma$，且$(\sigma\tau)\tau = \sigma$）。在$\sigma\tau$对应的项中，来自第$k$行和第$l$行的因子是$a_{k\sigma(l)}a_{l\sigma(k)}$，由于这两行相等，它等于$a_{l\sigma(l)}a_{k\sigma(k)}$；其余因子都与$\sigma$对应的项中的因子相同。所以这两项的乘积相同而符号相反（$\sgn(\sigma\tau) = -\sgn\sigma$），整个和式两两抵消，结果为$0$。
:::

当$n = 2$时，公式有$2$项：$a_{11}a_{22} - a_{12}a_{21}$；当$n = 3$时有$6$项：

$$
\begin{vmatrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}\end{vmatrix} = a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31} - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33}.
$$ {#eq-det3}

当$n = 10$时它有$3\,628\,800$项，所以这个公式是一个理论工具，而不是计算方法。下面是它的第一个推论。

::: theorem 三角矩阵 {#thm-triangular}
三角矩阵的行列式等于其对角元的乘积。
:::

::: proof
设$A$是上三角矩阵。在[[#eq-leibniz]]中，$\sigma$对应的项仅当对所有$i$都有$a_{i\sigma(i)}\neq 0$时才非零，这要求对每个$i$都有$\sigma(i)\ge i$。于是$\sigma(n) = n$，从而$\sigma(n-1) = n - 1$（值$n$已被取过），依此类推：$\sigma$是恒等置换。所以只有对角项$a_{11}a_{22}\cdots a_{nn}$留了下来。下三角的情形相同，只是条件换成$\sigma(i)\le i$。
:::

## 用消元法计算行列式

[[#lem-row-ops]]和[[#thm-triangular]]给出了实用的方法。只用倍加变换和行交换把$A$化为阶梯形$U$。倍加变换不改变行列式，每次行交换改变它的符号，所以

$$
\det A = (-1)^{s}\,u_{11}u_{22}\cdots u_{nn},
$$ {#eq-det-pivots}

其中$s$是行交换的次数：**不计符号，行列式就是各主元的乘积**。这大约需要$\tfrac23n^3$次运算，与消元法本身相当。

::: example 用消元法计算4×4行列式 {#ex-det4}
对$A = \begin{pmatrix}1&2&0&1\\2&4&1&3\\-1&0&2&1\\3&5&1&0\end{pmatrix}$，计算$\det A$。
::: solution
用倍加变换消去第一列（行列式不变）：

$$
\det A = \begin{vmatrix}1&2&0&1\\0&0&1&1\\0&2&2&2\\0&-1&1&-3\end{vmatrix} \quad(R_2 - 2R_1,\ R_3 + R_1,\ R_4 - 3R_1).
$$

$(2,2)$元为$0$，所以交换第2行和第3行，这会改变符号：

$$
\det A = -\begin{vmatrix}1&2&0&1\\0&2&2&2\\0&0&1&1\\0&-1&1&-3\end{vmatrix} = -\begin{vmatrix}1&2&0&1\\0&2&2&2\\0&0&1&1\\0&0&2&-2\end{vmatrix} = -\begin{vmatrix}1&2&0&1\\0&2&2&2\\0&0&1&1\\0&0&0&-4\end{vmatrix},
$$

这里先用了$R_4 + \tfrac12R_2$，再用$R_4 - 2R_3$。最后一个矩阵是三角矩阵，所以$\det A = -(1\cdot 2\cdot 1\cdot(-4)) = 8$。
:::
:::

::: widget rowreduce
matrix: 1,2,0,1; 2,4,1,3; -1,0,2,1; 3,5,1,0
augmented: false
caption: [[#ex-det4]]中的矩阵。逐步进行消元时，随时记录：每次行交换使行列式乘以$-1$，每次倍乘$R_i\to cR_i$使它乘以$c$，倍加变换则不改变它。由于化简后的形式是$I$（行列式为$1$），根据这份记录就能还原出$\det A = 8$。
:::

消元法还能证明行列式最重要的一些性质。

::: theorem 行列式判定可逆性 {#thm-det-invertible}
方阵$A$可逆当且仅当$\det A\neq 0$。
:::

::: proof
把$A$行化简为简化阶梯形$R$。由[[#lem-row-ops]]，每个初等行变换都使行列式乘以一个非零数（$-1$、$1$或$c\neq 0$），所以对某个$k\neq 0$有$\det A = k\det R$。若$A$可逆，则$R = I$，$\det A = k\neq 0$。若$A$不可逆，则$R$的主元少于$n$个，所以它的最后一行为零，$\det R = 0$，从而$\det A = 0$。
:::

::: theorem 乘积法则 {#thm-product}
对所有$n\times n$矩阵$A$和$B$，有$\det(AB) = \det A\,\det B$。
:::

::: proof
若$\det B = 0$，则$B$奇异，所以存在$\mathbf{x}\neq\mathbf{0}$使$B\mathbf{x} = \mathbf{0}$；于是$AB\mathbf{x} = \mathbf{0}$，所以$AB$奇异，两边都等于$0$。

若$\det B\neq 0$，定义$D(A) = \det(AB)/\det B$。$AB$的第$i$行是（$A$的第$i$行）$\,B$，它线性地依赖于$A$的第$i$行；所以$D$关于$A$的各行是多重线性的。若$A$有两行相等，则$AB$也有两行相等，从而$D(A) = 0$。最后，$D(I) = \det B/\det B = 1$。由[[#thm-det-unique]]中的唯一性，$D = \det$，即$\det(AB)/\det B = \det A$。
:::

下面是一些推论，每个都只需一行就能得到：若$A$可逆，则$\det(A^{-1}) = 1/\det A$（因为$\det A\det A^{-1} = \det I = 1$）；$\det(A^k) = (\det A)^k$；以及相似矩阵有相同的行列式：

$$
\det(P^{-1}AP) = \det(P^{-1})\det A\det P = \det A.
$$

所以有限维空间上线性算子$T$的行列式是良定义的：它就是任意一组基$\mathcal{B}$下$[T]_{\mathcal{B}}$的行列式（见[[linear-algebra/linear-maps#thm-change-basis]]）。注意，对于和**没有**这样的法则：一般地，$\det(A + B)\neq\det A + \det B$。

::: theorem 转置 {#thm-det-transpose}
对每个方阵，$\det A\T = \det A$。
:::

::: proof
对$A\T$应用[[#eq-leibniz]]（$A\T$的$(i,j)$元是$a_{ji}$），得

$$
\det A\T = \sum_{\sigma\in S_n}\sgn(\sigma)\,a_{\sigma(1)1}\cdots a_{\sigma(n)n}.
$$

把每个乘积按行指标重新排列：当$i$取遍$1, \dots, n$时，$j = \sigma(i)$也取遍这些值，且$a_{\sigma(i)i} = a_{j\sigma^{-1}(j)}$。所以$\sigma$对应的项等于$\sgn(\sigma)\,a_{1\sigma^{-1}(1)}\cdots a_{n\sigma^{-1}(n)}$，这正是$\det A$的公式中$\sigma^{-1}$对应的项（回忆$\sgn\sigma^{-1} = \sgn\sigma$）。当$\sigma$取遍$S_n$时，$\sigma^{-1}$也取遍$S_n$，所以两个和相等。
:::

因此，关于行的每个命题对列也成立：行列式对各列是多重线性和交错的，交换两列改变它的符号，把一列的倍数加到另一列上不改变它。

::: quiz
$A$是$3\times 3$矩阵，$\det A = 5$。$\det(2A)$是多少？
- [ ] $10$
- [ ] $30$
- [x] $40$
- [ ] $25$
::: solution
$2A$是把$A$的$3$行中的每一行都乘以$2$得到的，而每次这样的乘法都使行列式加倍（[[#lem-row-ops]]）。所以$\det(2A) = 2^3\det A = 40$。一般地，对$n\times n$矩阵有$\det(cA) = c^n\det A$——这是一个常见的出错之处。
:::
:::

## 代数余子式展开

无论是手算小型行列式，还是用于理论推导，按某一行或某一列展开都很有用。

::: definition 余子式与代数余子式 {#def-cofactor}
对$n\times n$矩阵$A$和指标$i, j$，令$A_{ij}$为删去$A$的第$i$行和第$j$列所得的$(n-1)\times(n-1)$矩阵。数$\det A_{ij}$称为$A$的一个**余子式**，而

$$
C_{ij} = (-1)^{i+j}\det A_{ij}
$$

称为$(i,j)$**代数余子式**。符号$(-1)^{i+j}$构成棋盘状的图案，左上角为$+$。
:::

::: theorem 代数余子式展开（拉普拉斯展开） {#thm-laplace}
对每个固定的行$i$和每个固定的列$j$，

$$
\det A = \sum_{k=1}^n a_{ik}C_{ik} \qquad\text{以及}\qquad \det A = \sum_{k=1}^n a_{kj}C_{kj}.
$$
:::

::: proof
$A$的第$i$行是$\sum_k a_{ik}\mathbf{e}_k\T$，所以由对第$i$行的线性，$\det A = \sum_k a_{ik}\det B_k$，其中$B_k$是把$A$的第$i$行换成$\mathbf{e}_k\T$所得的矩阵。剩下只需证明$\det B_k = C_{ik}$。

通过$i - 1$次相邻行的交换，把$B_k$的第$i$行移到最上面；再通过$k - 1$次相邻列的交换，把第$k$列移到最左边。每次交换都改变符号（对于列，由[[#thm-det-transpose]]），而其余各行各列的相对顺序保持不变。结果得到的矩阵第一行是$\mathbf{e}_1\T$，右下角的$(n-1)\times(n-1)$子块是$A_{ik}$。减去第一行的适当倍数，可以消去第一列的其余元素而不改变行列式，得到$\begin{pmatrix}1&\mathbf{0}\T\\\mathbf{0}&A_{ik}\end{pmatrix}$。$(n-1)\times(n-1)$矩阵上的函数$M\mapsto\det\begin{pmatrix}1&\mathbf{0}\T\\\mathbf{0}&M\end{pmatrix}$对$M$的各行是多重线性和交错的，并且在$M = I$处等于$1$，所以由[[#thm-det-unique]]，它就是$\det M$。综上，$\det B_k = (-1)^{(i-1)+(k-1)}\det A_{ik} = C_{ik}$。对$A\T$应用按行展开，即得按列展开。
:::

当某一行或某一列含有许多零时，展开是高效的——就选那一行或那一列。

::: example 按含零的行展开 {#ex-cofactor}
用代数余子式展开计算$\det\begin{pmatrix}2&0&1\\1&3&-1\\0&5&4\end{pmatrix}$，并用[[#eq-det3]]验证。
::: solution
按第一行展开（符号依次为$+, -, +$）；中间一项为零：

$$
\det A = 2\begin{vmatrix}3&-1\\5&4\end{vmatrix} - 0 + 1\begin{vmatrix}1&3\\0&5\end{vmatrix} = 2(12 + 5) + (5 - 0) = 39.
$$

用六项公式验证：$2\cdot3\cdot4 + 0\cdot(-1)\cdot0 + 1\cdot1\cdot5 - 1\cdot3\cdot0 - 2\cdot(-1)\cdot5 - 0\cdot1\cdot4 = 24 + 0 + 5 - 0 + 10 - 0 = 39$。
:::
:::

::: example 范德蒙德行列式 {#ex-vandermonde}
证明$\begin{vmatrix}1&a&a^2\\1&b&b^2\\1&c&c^2\end{vmatrix} = (b - a)(c - a)(c - b)$。
::: solution
从第2行和第3行中减去第1行（行列式不变），然后按第一列展开：

$$
\begin{vmatrix}1&a&a^2\\0&b - a&b^2 - a^2\\0&c-a&c^2 - a^2\end{vmatrix} = \begin{vmatrix}b - a&(b-a)(b+a)\\c - a&(c - a)(c + a)\end{vmatrix}.
$$

从第一行提出因子$b - a$，从第二行提出因子$c - a$（对每一行的线性）：

$$
(b - a)(c - a)\begin{vmatrix}1&b + a\\1&c + a\end{vmatrix} = (b-a)(c-a)\bigl((c + a) - (b + a)\bigr) = (b-a)(c-a)(c-b).
$$

所以该行列式非零当且仅当$a, b, c$互不相同。这个矩阵正是“求过$x$坐标分别为$a, b, c$的三个点的抛物线”这一问题的系数矩阵（比较[[linear-algebra/linear-systems#ex-parabola]]，那里$a, b, c = 1, 2, 3$，行列式为$1\cdot2\cdot1 = 2$），这就证实了这样的抛物线总是存在且唯一。一般的$n\times n$情形见[[#exr-vandermonde]]。
:::
:::

## 克拉默法则与逆矩阵

行列式给出了系数矩阵为方阵的方程组的解以及逆矩阵的显式公式。对向量$\mathbf{b}$，用$A_i(\mathbf{b})$表示把$A$的第$i$列换成$\mathbf{b}$所得的矩阵。

::: theorem 克拉默法则 {#thm-cramer}
若$A$是可逆的$n\times n$矩阵，则$A\mathbf{x} = \mathbf{b}$的唯一解为

$$
x_i = \frac{\det A_i(\mathbf{b})}{\det A}, \qquad i = 1, \dots, n.
$$
:::

::: proof
令$I_i(\mathbf{x})$为把单位矩阵的第$i$列换成$\mathbf{x}$所得的矩阵。则$A\,I_i(\mathbf{x})$的各列为$A\mathbf{e}_1, \dots, A\mathbf{x}, \dots, A\mathbf{e}_n$，即$A\,I_i(\mathbf{x}) = A_i(\mathbf{b})$。把$\det I_i(\mathbf{x})$按第$i$行展开（该行唯一的非零元是位于$(i,i)$处的$x_i$），得$\det I_i(\mathbf{x}) = x_i\det I_{n-1} = x_i$。由乘积法则，$\det A\cdot x_i = \det A_i(\mathbf{b})$；两边除以$\det A\neq 0$即可。
:::

::: theorem 伴随矩阵公式 {#thm-adjugate}
设$A$的**伴随矩阵**$\operatorname{adj}A$是代数余子式矩阵的转置：$(\operatorname{adj}A)_{ij} = C_{ji}$。则

$$
A\,\operatorname{adj}(A) = \operatorname{adj}(A)\,A = (\det A)\,I,
$$

所以若$\det A\neq 0$，则$A^{-1} = \dfrac{1}{\det A}\operatorname{adj}A$。
:::

::: proof
$A\operatorname{adj}(A)$的$(i,k)$元是$\sum_j a_{ij}C_{kj}$。当$k = i$时，这就是$\det A$按第$i$行的展开。当$k\neq i$时，它是把$A$的第$k$行换成第$i$行的副本所得矩阵按第$k$行的展开（代数余子式$C_{kj}$与第$k$行无关）；该矩阵有两行相等，所以这个和为$0$。因此$A\operatorname{adj}(A) = (\det A)I$。另一个乘积可用按列展开来处理。
:::

对$2\times 2$矩阵，伴随矩阵是$\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$，这就重新得到了[[linear-algebra/matrices#eq-inv2]]。

::: example 克拉默法则的应用 {#ex-cramer}
用克拉默法则解方程组$x_1 + 2x_2 + x_3 = 1$，$x_2 + 3x_3 = 5$，$2x_1 + x_2 = 1$。
::: solution
按第一列展开，系数矩阵的行列式为

$$
\det A = \begin{vmatrix}1&2&1\\0&1&3\\2&1&0\end{vmatrix} = 1\begin{vmatrix}1&3\\1&0\end{vmatrix} - 0 + 2\begin{vmatrix}2&1\\1&3\end{vmatrix} = (0 - 3) + 2(6 - 1) = 7.
$$

依次把各列换成$\mathbf{b} = (1, 5, 1)$：

$$
\det A_1(\mathbf{b}) = \begin{vmatrix}1&2&1\\5&1&3\\1&1&0\end{vmatrix} = 7,\qquad
\det A_2(\mathbf{b}) = \begin{vmatrix}1&1&1\\0&5&3\\2&1&0\end{vmatrix} = -7,\qquad
\det A_3(\mathbf{b}) = \begin{vmatrix}1&2&1\\0&1&5\\2&1&1\end{vmatrix} = 14.
$$

（例如，把第一个行列式按第1行展开：$1(0 - 3) - 2(0 - 3) + 1(5 - 1) = -3 + 6 + 4 = 7$。）因此$\mathbf{x} = (7, -7, 14)/7 = (1, -1, 2)$。*验证*：$1 - 2 + 2 = 1$，$-1 + 6 = 5$，$2 - 1 = 1$。
:::
:::

::: warning 公式不等于算法
克拉默法则和伴随矩阵公式在理论上很有价值——例如，它们表明$A^{-1}$的元素是$A$的元素的有理函数，因而在$\det A\neq 0$处都是连续的。但对于超过$3\times 3$的矩阵，用它们来计算是毫无希望的：克拉默法则需要计算$n + 1$个行列式，而用代数余子式展开计算一个行列式大约需要$n!$次运算——当$n = 20$时超过$2\times 10^{18}$次。消元法完成全部工作只需大约$\tfrac23n^3$次运算，当$n = 20$时也就几千次。
:::

::: quiz
对方阵进行下列哪些运算可能改变其行列式的值？（选出所有正确的选项。）
- [x] 交换两行
- [ ] 把第$1$行的$5$倍加到第$3$行
- [x] 把某一行乘以$5$
- [ ] 把矩阵转置
::: solution
行交换使行列式乘以$-1$（除非行列式为$0$，否则其值会改变），把一行乘以$5$使行列式乘以$5$。倍加变换和转置从不改变行列式（[[#lem-row-ops]]和[[#thm-det-transpose]]）。
:::
:::

## 行列式与体积

我们回到几何。对向量$\mathbf{a}_1, \dots, \mathbf{a}_n\in\R^n$，它们张成的**平行多面体**是

$$
\mathcal{P}(\mathbf{a}_1, \dots, \mathbf{a}_n) = \set{t_1\mathbf{a}_1 + \dots + t_n\mathbf{a}_n : 0\le t_i\le 1}.
$$

当$n = 2$时它是平行四边形，当$n = 3$时它是一个倾斜的盒子。

::: theorem 体积 {#thm-volume}
若$A$是以$\mathbf{a}_1, \dots, \mathbf{a}_n$为列的$n\times n$实矩阵，则$\abs{\det A}$是$\mathcal{P}(\mathbf{a}_1, \dots, \mathbf{a}_n)$的$n$维体积。更一般地，线性映射$\mathbf{x}\mapsto A\mathbf{x}$把每个区域的体积乘以$\abs{\det A}$。
:::

::: proof
（概要。）用$V(\mathbf{a}_1, \dots, \mathbf{a}_n)$表示平行多面体的体积。初等几何表明：(i) 把一个张成向量的倍数加到另一个上不改变体积——这是一个剪切变换，它把立体的各个薄片沿平行于某个面的方向滑动，而不改变薄片的大小（卡瓦列里（Cavalieri）原理）；(ii) 把一个向量乘以$c$，体积乘以$\abs{c}$；(iii) 重新排列各向量不改变体积；(iv) 单位立方体的体积为$1$。把[[#lem-row-ops]]应用于列可知，$\abs{\det A}$对相应的列变换作出完全相同的反应。对$A$作列化简：若$A$奇异，则各列线性相关，平行多面体是扁平的（它位于一个超平面内），两个量都为$0$；否则$A$化简为$I$，此时两个量都为$1$，而把化简过程倒过来进行，就说明两者对$A$也相等。对一般的区域，用小立方体来逼近它：每个小立方体被映成一个平行多面体，其体积是原立方体体积的$\abs{\det A}$倍。使这种逼近严格化属于重积分理论的内容；见[[multivariable/change-of-variables]]。
:::

$\det A$的符号也有含义：当映射保持**定向**时（从$\mathbf{e}_1$到$\mathbf{e}_2$的逆时针转动仍是逆时针的，右手仍是右手），它为正；当映射像镜子那样反转定向时，它为负。旋转的行列式为$1$；反射的行列式为$-1$。

::: widget transform2d
matrix: 1,2; 2,1
caption: 这里$\det A = 1 - 4 = -3$。单位正方形的像面积为$3$，但它被翻转了：从$\mathbf{e}_1$的像转到$\mathbf{e}_2$的像现在是顺时针转动。把非对角元调小，观察行列式在变为正值的途中经过$0$——正是正方形塌缩成线段的那一刻。
:::

::: example 面积与体积 {#ex-volume}
(a) 求以$(1,1)$，$(4,2)$，$(2,5)$为顶点的三角形的面积。(b) 求由$(1,0,1)$，$(2,1,0)$，$(0,3,1)$张成的平行六面体的体积。
::: solution
(a) 从$(1,1)$出发的两条边是$(3, 1)$和$(1, 4)$。它们张成一个面积为$\abs{\det\begin{pmatrix}3&1\\1&4\end{pmatrix}} = \abs{12 - 1} = 11$的平行四边形，而三角形是它的一半：面积为$\tfrac{11}{2}$。

(b) 把这些向量作为列，按第一行展开：

$$
\begin{vmatrix}1&2&0\\0&1&3\\1&0&1\end{vmatrix} = 1(1 - 0) - 2(0 - 3) + 0 = 7.
$$

体积为$7$。由于行列式为正，这三个向量（按此顺序）构成右手系。
:::
:::

::: application 积分的变量替换
可微映射$\mathbf{u}\mapsto\mathbf{x}(\mathbf{u})$在每一点附近看起来都像它的导数——一个线性映射，其矩阵就是**雅可比矩阵**。由[[#thm-volume]]，小区域的面积被乘以该矩阵行列式的绝对值，这就是变量替换公式中$dx\,dy = \abs{\det J}\,du\,dv$的由来。对极坐标$x = r\cos\theta$，$y = r\sin\theta$，雅可比行列式为$\cos\theta\cdot r\cos\theta - (-r\sin\theta)\sin\theta = r$，由此得到熟悉的$dx\,dy = r\,dr\,d\theta$。见[[multivariable/change-of-variables]]。
:::

::: history
行列式比矩阵更古老。日本的关孝和（Seki Takakazu）于1683年、德国的戈特弗里德·威廉·莱布尼茨（Gottfried Wilhelm Leibniz）于1693年（在一封信中）在从方程组中消去未知数时，各自独立地引入了行列式。加布里埃尔·克拉默（Gabriel Cramer）于1750年发表了他的法则。18世纪70年代，亚历山大-泰奥菲勒·范德蒙德（Alexandre-Théophile Vandermonde）把行列式本身作为函数来研究，皮埃尔-西蒙·拉普拉斯（Pierre-Simon Laplace）则引入了按子式展开的方法（1772年）。奥古斯丁-路易·柯西（Augustin-Louis Cauchy）1812年的论文给出了第一个系统的理论，确定了“行列式”（*determinant*）一词的现代含义，并证明了乘积法则；雅克·比内（Jacques Binet）同时也发现了这一法则。1841年，卡尔·雅可比（Carl Jacobi）使导数构成的行列式——雅可比行列式——成为一种标准工具。我们用作定义的、以多重线性、交错性和规范性来刻画行列式的方法，可以追溯到卡尔·魏尔斯特拉斯（Karl Weierstrass）和利奥波德·克罗内克（Leopold Kronecker）的讲课，并于1903年发表。
:::

## 后续内容

行列式给出特征多项式$\det(A - \lambda I)$，其根就是$A$的特征值（[[linear-algebra/eigenvalues]]）；乘积法则表明相似矩阵有相同的特征多项式。体积的缩放是重积分变量替换公式的基础（[[multivariable/change-of-variables]]），而行列式的符号给出了定向的概念，这一概念用于曲面以及[[multivariable/stokes-divergence]]。在数值计算中，行列式由$LU$分解按[[#eq-det-pivots]]算出，但在判断矩阵是否接近奇异时，它很少是合适的工具；[[linear-algebra/svd]]中的奇异值才是。乘法性$\det(AB) = \det A\det B$说明$\det$是从可逆矩阵群到非零标量构成的群的同态，其核是特殊线性群（[[abstract-algebra/homomorphisms]]）。

::: summary
- 行列式是各行的唯一一个多重线性、交错且在$I$处等于$1$的函数（[[#thm-det-unique]]）；它由含$n!$项的莱布尼茨公式给出。
- 行交换改变符号，把一行乘以$c$使行列式乘以$c$，倍加变换不改变行列式；所以$\det A = \pm$各主元之积（[[#eq-det-pivots]]）。
- $A$可逆当且仅当$\det A\neq 0$；$\det(AB) = \det A\det B$；$\det A\T = \det A$；$\det(cA) = c^n\det A$。
- 相似矩阵的行列式相等，所以线性算子的行列式是良定义的。
- 可以按任意一行或一列作代数余子式展开（[[#thm-laplace]]）；它只对小矩阵或稀疏矩阵才高效。
- 克拉默法则和$A^{-1} = \operatorname{adj}(A)/\det A$是显式公式，但计算代价高昂。
- $\abs{\det A}$是由各列张成的平行多面体的体积，也是$A$缩放体积的倍数；符号记录定向（[[#thm-volume]]）。
:::

## 习题

::: exercise 一个3×3行列式 {level=1 check="-3"}
计算$\det\begin{pmatrix}1&2&3\\4&5&6\\7&8&10\end{pmatrix}$。
::: solution
按第一行展开：$1(5\cdot10 - 6\cdot8) - 2(4\cdot10 - 6\cdot7) + 3(4\cdot8 - 5\cdot7) = 1\cdot2 - 2\cdot(-2) + 3\cdot(-3) = 2 + 4 - 9 = -3$。（若把$10$换成$9$，行列式就是$0$：那个著名矩阵的各行线性相关。）
:::
:::

::: exercise 三角矩阵 {level=1 check="-3"}
求$\det\begin{pmatrix}2&5&1&7\\0&-1&4&2\\0&0&3&9\\0&0&0&\frac12\end{pmatrix}$。
::: solution
该矩阵是上三角矩阵，所以由[[#thm-triangular]]，行列式为$2\cdot(-1)\cdot 3\cdot\tfrac12 = -3$。
:::
:::

::: exercise 运用法则 {level=1 check="-4/3"}
$A$和$B$是$3\times 3$矩阵，$\det A = 2$，$\det B = -3$。求$\det(AB^{-1}A\T)$。
::: solution
由乘积法则和[[#thm-det-transpose]]，$\det(AB^{-1}A\T) = \det A\cdot\frac{1}{\det B}\cdot\det A = 2\cdot\left(-\tfrac13\right)\cdot 2 = -\tfrac43$。
:::
:::

::: exercise 何时奇异？ {level=2 check="sqrt(2)"}
求使$\begin{pmatrix}k&1&0\\1&k&1\\0&1&k\end{pmatrix}$奇异的正数$k$。
::: solution
按第一行展开：$\det = k(k^2 - 1) - 1(k - 0) = k^3 - 2k = k(k^2 - 2)$。它在$k = 0$和$k = \pm\sqrt2$时为零；其中的正值是$k = \sqrt2$。
:::
:::

::: exercise 用克拉默法则只求一个未知数 {level=2 check="-1/2"}
对方程组$2x_1 + x_2 = 1$，$x_1 + 3x_2 + x_3 = 0$，$x_2 + 2x_3 = 1$，用克拉默法则只求$x_2$。
::: solution
$\det A = \begin{vmatrix}2&1&0\\1&3&1\\0&1&2\end{vmatrix} = 2(6 - 1) - 1(2 - 0) + 0 = 8$，并且

$$
\det A_2(\mathbf{b}) = \begin{vmatrix}2&1&0\\1&0&1\\0&1&2\end{vmatrix} = 2(0 - 1) - 1(2 - 0) + 0 = -4.
$$

所以$x_2 = -4/8 = -\tfrac12$。（完整的解是$(\tfrac34, -\tfrac12, \tfrac34)$。）
:::
:::

::: exercise 三角形的面积 {level=2 check="11/2"}
求以$(1,2)$，$(4,3)$和$(2,6)$为顶点的三角形的面积。
::: solution
从$(1,2)$出发的两条边是$(3,1)$和$(1,4)$，所以面积为$\tfrac12\abs{\det\begin{pmatrix}3&1\\1&4\end{pmatrix}} = \tfrac12\cdot 11 = \tfrac{11}{2}$。
:::
:::

::: exercise 四面体的体积 {level=2 check="13/6"}
以$\mathbf{0}$，$\mathbf{a}$，$\mathbf{b}$，$\mathbf{c}$为顶点的四面体的体积为$\tfrac16\abs{\det(\mathbf{a}\ \mathbf{b}\ \mathbf{c})}$。当$\mathbf{a} = (1,2,0)$，$\mathbf{b} = (0,1,3)$，$\mathbf{c} = (2,0,1)$时，求这个体积。
::: solution
$\det\begin{pmatrix}1&0&2\\2&1&0\\0&3&1\end{pmatrix} = 1(1 - 0) - 0 + 2(6 - 0) = 13$，所以体积为$\tfrac{13}{6}$。（因子$\tfrac16$来自对平行六面体的分割：一个立方体可以分成六个体积相等的四面体。）
:::
:::

::: exercise 奇数阶反对称矩阵 {level=3}
证明：当$n$为奇数时，每个$n\times n$实反对称矩阵（$A\T = -A$）都是奇异的。举例说明当$n$为偶数时这一结论可能不成立。
::: solution
利用[[#thm-det-transpose]]和$\det(cA) = c^n\det A$，对奇数$n$有

$$
\det A = \det A\T = \det(-A) = (-1)^n\det A = -\det A
$$

所以$2\det A = 0$，$\det A = 0$。对$n = 2$，反对称矩阵$\begin{pmatrix}0&1\\-1&0\end{pmatrix}$的行列式为$1$。
:::
:::

::: exercise 范德蒙德行列式 {level=3 #exr-vandermonde}
对$n$用归纳法证明

$$
\det\begin{pmatrix}1&x_1&x_1^2&\cdots&x_1^{n-1}\\1&x_2&x_2^2&\cdots&x_2^{n-1}\\\vdots&&&&\vdots\\1&x_n&x_n^2&\cdots&x_n^{n-1}\end{pmatrix} = \prod_{1\le i<j\le n}(x_j - x_i).
$$
::: hint
从最后一列开始直到第二列，依次从每一列中减去其左侧相邻列的$x_1$倍。
:::
::: solution
当$n = 1$时两边都等于$1$（空积）。设公式对$n - 1$成立。对$k = n, n-1, \dots, 2$（按此顺序，使每一步用到的都是原来的第$k-1$列）施行列变换$C_k\to C_k - x_1C_{k-1}$；这些变换不改变行列式。第$i$行变为

$$
\bigl(1,\ x_i - x_1,\ x_i(x_i - x_1),\ \dots,\ x_i^{n-2}(x_i - x_1)\bigr),
$$

所以第一行是$(1, 0, \dots, 0)$。按这一行展开，行列式等于以$(x_i - x_1)(1, x_i, \dots, x_i^{n-2})$（$i = 2, \dots, n$）为行的$(n-1)\times(n-1)$行列式。从每一行中提出因子$x_i - x_1$（多重线性），剩下的是$x_2, \dots, x_n$的范德蒙德行列式，由归纳假设，它等于$\prod_{2\le i<j\le n}(x_j - x_i)$。综上，行列式等于$\prod_{j=2}^n(x_j - x_1)\cdot\prod_{2\le i<j\le n}(x_j - x_i) = \prod_{1\le i<j\le n}(x_j - x_i)$。
:::
:::

::: exercise 整数矩阵的逆 {level=3}
证明：若$A$的元素都是整数，则$A^{-1}$存在且其元素都是整数当且仅当$\det A = \pm1$。用$A = \begin{pmatrix}2&1&3\\1&0&1\\1&2&4\end{pmatrix}$加以说明。
::: solution
若$A$和$A^{-1}$的元素都是整数，则它们的行列式都是整数（莱布尼茨公式只用到元素的和与积），且$\det A\det A^{-1} = \det I = 1$；乘积为$1$的整数只有$\pm1$，所以$\det A = \pm1$。反之，若$\det A = \pm1$，则由[[#thm-adjugate]]，$A^{-1} = \pm\operatorname{adj}A$，而代数余子式是整数矩阵的行列式，因而是整数。

对于这个例子，按第2行展开：$\det A = -1\cdot\begin{vmatrix}1&3\\2&4\end{vmatrix} + 0 - 1\cdot\begin{vmatrix}2&1\\1&2\end{vmatrix} = -1\cdot(-2) - 3 = -1$。由代数余子式得$\operatorname{adj}A = \begin{pmatrix}-2&2&1\\-3&5&1\\2&-3&-1\end{pmatrix}$，所以$A^{-1} = -\operatorname{adj}A = \begin{pmatrix}2&-2&-1\\3&-5&-1\\-2&3&1\end{pmatrix}$，其元素都是整数。（验证：$A$的第1行乘以$A^{-1}$的第1列得$4 + 3 - 6 = 1$。）
:::
:::
