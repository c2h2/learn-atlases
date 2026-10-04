对角化是最理想的情形：在由特征向量构成的基下，矩阵变成对角矩阵，于是矩阵的幂、指数以及微分方程都变得容易处理。但有些矩阵没有足够多的特征向量。剪切矩阵$\begin{pmatrix}1&1\\0&1\end{pmatrix}$只有一个特征向量方向；[[linear-algebra/eigenvalues#ex-defective]]中的矩阵$B$有一个重特征值，而它的特征空间只有一维。通过基变换，**每个**方阵所能化成的最简形式是什么？

答案是**若尔当标准形**：在复数域上，每个方阵都相似于一个分块对角矩阵，其中的块形如

$$
J_3(\lambda) = \begin{pmatrix}\lambda&1&0\\0&\lambda&1\\0&0&\lambda\end{pmatrix},
$$

即对角线上是一个特征值，紧挨在对角线上方的元素都是$1$。对角矩阵就是所有块都是$1\times 1$的情形。若尔当标准形在不计块的次序的意义下是唯一的，因此它完全回答了两个矩阵何时相似的问题。在此过程中，我们还会遇到两个本身就很重要的结果：**凯莱-哈密顿（Cayley–Hamilton）定理**，它说每个矩阵都满足自己的特征方程；以及**极小多项式**，它能准确地判别可对角化性。本章中$A$始终是域$\F$上的$n\times n$矩阵；对于若尔当标准形本身，我们需要特征多项式能分解为一次因式的乘积，这在$\C$上是自动成立的。

## 矩阵多项式与凯莱-哈密顿定理

对多项式$q(t) = c_0 + c_1t + \dots + c_dt^d$，定义$q(A) = c_0I + c_1A + \dots + c_dA^d$。由于$A$的各次幂彼此可交换，$A$的多项式的运算与普通多项式一样：$(q + r)(A) = q(A) + r(A)$，$(qr)(A) = q(A)r(A) = r(A)q(A)$。若$A\mathbf{v} = \lambda\mathbf{v}$，则$A^k\mathbf{v} = \lambda^k\mathbf{v}$，从而

$$
q(A)\mathbf{v} = q(\lambda)\mathbf{v}.
$$ {#eq-poly-eigen}

空间$M_n(\F)$的维数为$n^2$，所以$n^2 + 1$个矩阵$I, A, A^2, \dots, A^{n^2}$线性相关：**存在**某个次数不超过$n^2$的非零多项式把$A$零化。值得注意的是，总存在一个次数仅为$n$的这样的多项式。

::: theorem 凯莱-哈密顿定理 {#thm-cayley-hamilton}
每个方阵都满足它的特征方程：若$p_A(t) = \det(A - tI)$，则$p_A(A) = O$。
:::

::: proof
设$C(t) = \operatorname{adj}(A - tI)$是$A - tI$的伴随矩阵（[[linear-algebra/determinants#thm-adjugate]]）。它的元素是$A - tI$的代数余子式，因而是$t$的次数不超过$n - 1$的多项式，所以可以写成$C(t) = C_0 + C_1t + \dots + C_{n-1}t^{n-1}$，其中$C_k$是常数矩阵。写$p_A(t) = c_0 + c_1t + \dots + c_nt^n$。由伴随矩阵公式，对每个$t$，

$$
(A - tI)(C_0 + C_1t + \dots + C_{n-1}t^{n-1}) = (c_0 + c_1t + \dots + c_nt^n)I.
$$

两边都是以矩阵为系数的$t$的多项式；它们对无穷多个$t$值相等，所以它们的系数逐个元素相等。比较$1, t, \dots, t^n$的系数：

$$
AC_0 = c_0I,\quad AC_1 - C_0 = c_1I,\quad \dots,\quad AC_{n-1} - C_{n-2} = c_{n-1}I,\quad -C_{n-1} = c_nI.
$$

把这些等式分别左乘$I, A, A^2, \dots, A^n$再相加。左边逐项相消：$AC_0 + (A^2C_1 - AC_0) + \dots + (A^nC_{n-1} - A^{n-1}C_{n-2}) - A^nC_{n-1} = O$，而右边相加得$c_0I + c_1A + \dots + c_nA^n = p_A(A)$。所以$p_A(A) = O$。
:::

::: warning 一个诱人的错误证明
“把$t = A$代入$p_A(t) = \det(A - tI)$，得到$\det(A - A) = \det O = 0$。”这个论证错了两次：对每个数量$t$，$\det(A - tI)$是一个**数**，在行列式里用矩阵代替$t$，与计算多项式$p_A$在$A$处的值不是一回事；而且结论“$= 0$”是一个数量，而$p_A(A)$是一个**矩阵**，我们要证明的是它为零矩阵。这个定理确实是深刻的，这就是上面的证明需要用到伴随矩阵的原因。
:::

::: example 凯莱-哈密顿定理的应用 {#ex-cayley-hamilton}
对$A = \begin{pmatrix}1&2\\3&4\end{pmatrix}$验证这个定理，并用它求$A^{-1}$和$A^3$。
::: solution
$p_A(t) = t^2 - 5t - 2$（迹为$5$，行列式为$-2$）。而$A^2 = \begin{pmatrix}7&10\\15&22\end{pmatrix}$，并且

$$
A^2 - 5A - 2I = \begin{pmatrix}7 - 5 - 2&10 - 10\\15 - 15&22 - 20 - 2\end{pmatrix} = O.
$$

把$A^2 - 5A = 2I$改写为$A\cdot\frac12(A - 5I) = I$，即得$A^{-1} = \frac12(A - 5I) = \begin{pmatrix}-2&1\\ \frac32&-\frac12\end{pmatrix}$，与[[linear-algebra/matrices#ex-elementary]]的结果一致。至于幂，利用$A^2 = 5A + 2I$，可以把$A$的任意多项式化为$I$和$A$的线性组合：$A^3 = 5A^2 + 2A = 5(5A + 2I) + 2A = 27A + 10I$。
:::
:::

## 极小多项式

特征多项式把$A$零化，但它未必是具有这一性质的最简单的多项式。

::: definition 极小多项式 {#def-minimal-poly}
方阵$A$的**极小多项式**$m_A$是满足$m_A(A) = O$的次数最小的首一多项式（首项系数为$1$）。
:::

由凯莱-哈密顿定理，零化$A$的非零多项式是存在的；把它除以首项系数就得到首一多项式；所以次数最小的首一零化多项式存在。

::: theorem 极小多项式的性质 {#thm-minimal-poly}
1. 多项式$q$满足$q(A) = O$当且仅当$m_A$整除$q$。特别地，$m_A$是唯一的，并且$m_A$整除$p_A$。
2. $m_A$的根恰好是$A$的特征值。
3. 相似矩阵有相同的极小多项式。
:::

::: proof
1. 若$q = sm_A$，则$q(A) = s(A)m_A(A) = O$。反之，作带余除法：$q = sm_A + r$，其中$\deg r < \deg m_A$（见[[abstract-algebra/polynomials]]）。则$r(A) = q(A) - s(A)m_A(A) = O$。若$r\neq 0$，把$r$除以其首项系数就得到一个次数小于$m_A$的首一零化多项式，这是不可能的；所以$r = 0$。若$m$和$m'$都是极小多项式，则它们互相整除，并且都是首一的，所以$m = m'$。由凯莱-哈密顿定理，$m_A$整除$p_A$。
2. 若$\lambda$是特征值，$\mathbf{v}$是相应的特征向量，则由[[#eq-poly-eigen]]，$\mathbf{0} = m_A(A)\mathbf{v} = m_A(\lambda)\mathbf{v}$，所以$m_A(\lambda) = 0$。反之，由于$m_A$整除$p_A$，$m_A$的每个根都是$p_A$的根，因而是特征值。
3. 若$B = P^{-1}AP$，则对每个多项式$q$有$q(B) = P^{-1}q(A)P$，所以$q(B) = O$当且仅当$q(A) = O$。
:::

所以，若$p_A(t) = \pm(t - \lambda_1)^{m_1}\cdots(t - \lambda_k)^{m_k}$，其中各$\lambda_i$互异，则$m_A(t) = (t - \lambda_1)^{e_1}\cdots(t - \lambda_k)^{e_k}$，其中$1\le e_i\le m_i$。指数$e_i$恰好承载了关于可对角化性的信息。

::: theorem 极小多项式判别法 {#thm-diag-minpoly}
$A$在$\F$上可对角化，当且仅当它的极小多项式是**互异的**一次因式的乘积：$m_A(t) = (t - \lambda_1)(t - \lambda_2)\cdots(t - \lambda_k)$，其中$\lambda_1, \dots, \lambda_k\in\F$互异。
:::

::: proof
设$A = PDP^{-1}$，其中$D$是对角矩阵，并设$\lambda_1, \dots, \lambda_k$是互异的特征值。对$q(t) = \prod_i(t - \lambda_i)$，对角矩阵$q(D)$的元素为$q(d_{jj}) = 0$，所以$q(A) = Pq(D)P^{-1} = O$。于是$m_A$整除$q$；而每个$\lambda_i$都是$m_A$的根，所以$m_A = q$。

反之，设$m_A(t) = \prod_{i=1}^k(t - \lambda_i)$，其中各$\lambda_i$互异。考虑拉格朗日多项式

$$
\ell_i(t) = \prod_{j\neq i}\frac{t - \lambda_j}{\lambda_i - \lambda_j}, \qquad i = 1, \dots, k.
$$

多项式$\ell_1 + \dots + \ell_k - 1$的次数小于$k$，并且在$k$个点$\lambda_1, \dots, \lambda_k$处取零值（因为当$j = i$时$\ell_i(\lambda_j)$为$1$，否则为$0$），所以它是零多项式：$\sum_i\ell_i(t) = 1$。因此每个向量都满足$\mathbf{v} = \sum_i\ell_i(A)\mathbf{v}$。此外，$(t - \lambda_i)\ell_i(t)$是$m_A(t)$的常数倍，所以$(A - \lambda_iI)\ell_i(A)\mathbf{v} = \mathbf{0}$：每个$\ell_i(A)\mathbf{v}$都位于特征空间$E_{\lambda_i}$中。所以特征向量张成$\F^n$，可以从中选出一组基，从而$A$可对角化（[[linear-algebra/eigenvalues#thm-diagonalisation]]）。
:::

::: example 特征多项式相同的两个矩阵 {#ex-minpoly}
求[[linear-algebra/eigenvalues#ex-diag3]]和[[linear-algebra/eigenvalues#ex-defective]]中的矩阵$A = \begin{pmatrix}2&1&-1\\0&0&2\\0&-1&3\end{pmatrix}$和$B = \begin{pmatrix}0&1&2\\0&2&0\\-1&1&3\end{pmatrix}$的极小多项式。
::: solution
两者都有$p(t) = (2 - t)^2(1 - t)$，所以各自的极小多项式是$(t - 2)(t - 1)$或$(t - 2)^2(t - 1)$。先检验次数较低的候选者：

$$
(A - 2I)(A - I) = \begin{pmatrix}0&1&-1\\0&-2&2\\0&-1&1\end{pmatrix}\begin{pmatrix}1&1&-1\\0&-1&2\\0&-1&2\end{pmatrix} = O,
$$

所以$m_A(t) = (t - 2)(t - 1)$，各因式互异——这与$A$可对角化相符。对于$B$，

$$
(B - 2I)(B - I) = \begin{pmatrix}-2&1&2\\0&0&0\\-1&1&1\end{pmatrix}\begin{pmatrix}-1&1&2\\0&1&0\\-1&1&2\end{pmatrix} = \begin{pmatrix}0&1&0\\0&0&0\\0&1&0\end{pmatrix}\neq O,
$$

所以$m_B(t) = (t - 2)^2(t - 1)$。由[[#thm-diag-minpoly]]，$B$不可对角化。我们将会看到，重复因式$(t - 2)^2$预示着特征值$2$有一个大小为$2$的若尔当块。
:::
:::

::: quiz
某$3\times 3$矩阵的特征多项式为$-(t - 1)^2(t - 3)$。下列哪些多项式可能是它的极小多项式？（选出所有正确的选项。）
- [x] $(t - 1)(t - 3)$
- [x] $(t - 1)^2(t - 3)$
- [ ] $(t - 1)^2$
- [ ] $(t - 1)(t - 3)^2$
::: solution
由[[#thm-minimal-poly]]，极小多项式整除特征多项式，并且以每个特征值（$1$和$3$）为根。这样就只剩下$(t - 1)(t - 3)$（可对角化的情形）和$(t - 1)^2(t - 3)$（特征值$1$有一个大小为$2$的若尔当块）。$(t - 1)^2$漏掉了特征值$3$，而$(t - 3)^2$不整除特征多项式。
:::
:::

## 广义特征向量与准素分解

当特征向量太少时，我们就扩大特征空间。

::: definition 广义特征向量 {#def-generalised}
如果非零向量$\mathbf{v}$对某个$k\ge 1$满足$(A - \lambda I)^k\mathbf{v} = \mathbf{0}$，就称$\mathbf{v}$是$A$的属于特征值$\lambda$的**广义特征向量**。
:::

普通的特征向量就是$k = 1$的情形。对于剪切矩阵$S = \begin{pmatrix}1&1\\0&1\end{pmatrix}$，$(S - I)^2 = O$，所以$\R^2$中的每个非零向量都是属于$\lambda = 1$的广义特征向量，尽管只有$(1,0)$的倍数才是特征向量。

::: theorem 准素分解 {#thm-primary}
设$p_A(t) = \pm(t - \lambda_1)^{m_1}\cdots(t - \lambda_k)^{m_k}$，其中$\lambda_i\in\F$互异，并令$K_i = \operatorname{Nul}\bigl((A - \lambda_iI)^{m_i}\bigr)$。则

1. $\F^n = K_1\oplus K_2\oplus\dots\oplus K_k$；
2. 每个$K_i$都是$A$的**不变**子空间（只要$\mathbf{v}\in K_i$，就有$A\mathbf{v}\in K_i$）；
3. $\dim K_i = m_i$，即$\lambda_i$的代数重数；
4. $K_i$由$\mathbf{0}$和属于$\lambda_i$的全部广义特征向量组成——它是$\lambda_i$的**广义特征空间**。
:::

::: proof
令$q_i(t) = \prod_{j\neq i}(t - \lambda_j)^{m_j}$。这些多项式没有公共根，所以由多项式的欧几里得算法（裴蜀（Bézout）等式，[[abstract-algebra/polynomials]]），存在多项式$a_i$使得$a_1q_1 + \dots + a_kq_k = 1$。因此

$$
I = a_1(A)q_1(A) + \dots + a_k(A)q_k(A).
$$

**(1)的张成部分。**对$\mathbf{v}\in\F^n$，令$\mathbf{v}_i = a_i(A)q_i(A)\mathbf{v}$，则$\mathbf{v} = \sum\mathbf{v}_i$。由凯莱-哈密顿定理，$(A - \lambda_iI)^{m_i}\mathbf{v}_i = a_i(A)\bigl[(t - \lambda_i)^{m_i}q_i\bigr](A)\mathbf{v} = \pm a_i(A)p_A(A)\mathbf{v} = \mathbf{0}$，所以$\mathbf{v}_i\in K_i$。

**(1)的直和部分。**设$\mathbf{w}_1 + \dots + \mathbf{w}_k = \mathbf{0}$，其中$\mathbf{w}_j\in K_j$。当$j\neq i$时，$q_i$含有因式$(t - \lambda_j)^{m_j}$，所以$q_i(A)\mathbf{w}_j = \mathbf{0}$。因此把$a_i(A)q_i(A)$作用于这个和，得到$a_i(A)q_i(A)\mathbf{w}_i = \mathbf{0}$。另一方面，$\mathbf{w}_i = \sum_ja_j(A)q_j(A)\mathbf{w}_i$，而当$j\neq i$时，$q_j$中的因式$(t - \lambda_i)^{m_i}$把$\mathbf{w}_i$零化；所以$\mathbf{w}_i = a_i(A)q_i(A)\mathbf{w}_i = \mathbf{0}$。

**(2)**$A$与$(A - \lambda_iI)^{m_i}$可交换，所以对$\mathbf{v}\in K_i$有$(A - \lambda_iI)^{m_i}A\mathbf{v} = A(A - \lambda_iI)^{m_i}\mathbf{v} = \mathbf{0}$。

**(3)**取每个$K_i$的一组基，把它们合成$\F^n$的一组基（由(1)这是可以做到的）。由于每个$K_i$都是不变子空间，$A$相似于分块对角矩阵$\diag(A_1, \dots, A_k)$，其中$A_i$表示$A$在$K_i$上的作用。若对$K_i$中某个$\mathbf{u}\neq\mathbf{0}$有$A_i\mathbf{u} = \mu\mathbf{u}$，则$\mathbf{0} = (A - \lambda_iI)^{m_i}\mathbf{u} = (\mu - \lambda_i)^{m_i}\mathbf{u}$，所以$\mu = \lambda_i$：$A_i$唯一的特征值是$\lambda_i$；又由于$p_{A_i}$整除$p_A$，它能分解为一次因式的乘积，所以$p_{A_i}(t) = (\lambda_i - t)^{\dim K_i}$。分块对角矩阵的行列式等于各块行列式的乘积，所以$p_A = \prod_ip_{A_i}$，比较根$\lambda_i$的重数即得$\dim K_i = m_i$。

**(4)**设$(A - \lambda_iI)^k\mathbf{v} = \mathbf{0}$，写$\mathbf{v} = \sum_j\mathbf{v}_j$，其中$\mathbf{v}_j\in K_j$。每个$(A - \lambda_iI)^k\mathbf{v}_j$都在$K_j$中，且它们的和为$\mathbf{0}$，所以由直和性，每一项都是$\mathbf{0}$。当$j\neq i$时，矩阵$A_j - \lambda_iI$可逆（$\lambda_i$不是$A_j$的特征值），所以$\mathbf{v}_j = \mathbf{0}$。于是$\mathbf{v} = \mathbf{v}_i\in K_i$。
:::

所以，即使特征空间做不到，广义特征空间也总是具有“正确的”维数，并且总能充满整个空间。在$K_i$上，矩阵$A$的作用是$\lambda_iI + N_i$，其中$N_i = (A - \lambda_iI)$限制在$K_i$上，满足$N_i^{m_i} = O$：它是**幂零**的。剩下的任务就是弄清幂零映射的结构。

## 若尔当链与若尔当标准形

::: definition 若尔当块与若尔当矩阵 {#def-jordan-block}
特征值为$\lambda$的$k\times k$**若尔当块**是这样的矩阵$J_k(\lambda)$：对角线上的每个位置都是$\lambda$，紧挨在对角线上方的每个位置都是$1$，其余位置都是$0$。**若尔当矩阵**是各块都是若尔当块的分块对角矩阵$\diag\bigl(J_{k_1}(\lambda_1), \dots, J_{k_s}(\lambda_s)\bigr)$（各$\lambda_i$不必互异）。
:::

写$J_k(\lambda) = \lambda I + N$，其中$N$在紧挨对角线上方的位置为$1$。则$N\mathbf{e}_1 = \mathbf{0}$，且当$j\ge 2$时$N\mathbf{e}_j = \mathbf{e}_{j-1}$：标准基向量构成一条**链**

$$
\mathbf{e}_k\xrightarrow{\ N\ }\mathbf{e}_{k-1}\xrightarrow{\ N\ }\cdots\xrightarrow{\ N\ }\mathbf{e}_1\xrightarrow{\ N\ }\mathbf{0},
$$

所以$N^k = O$，但$N^{k-1}\neq O$。只有$\mathbf{e}_1$是$J_k(\lambda)$的特征向量；其余的都是广义特征向量。反之，若幂零映射$N$和向量$\mathbf{v}$满足$N^k\mathbf{v} = \mathbf{0}\neq N^{k-1}\mathbf{v}$，则在这些向量张成的子空间中，以$N^{k-1}\mathbf{v}, \dots, N\mathbf{v}, \mathbf{v}$为基，$N$的矩阵为$J_k(0)$。若尔当标准形的核心在于：每个幂零映射都有一组由这样的链构成的基。

::: lemma 幂零映射的结构 {#lem-nilpotent}
设$N$是有限维空间$V$上的幂零线性算子。则存在向量$\mathbf{w}_1, \dots, \mathbf{w}_s\in V$和整数$k_1, \dots, k_s\ge 1$，使得$N^{k_i}\mathbf{w}_i = \mathbf{0}$，并且向量

$$
N^j\mathbf{w}_i \qquad (1\le i\le s,\ 0\le j < k_i)
$$

构成$V$的一组基。因此，在适当的基下，$N$的矩阵为$\diag\bigl(J_{k_1}(0), \dots, J_{k_s}(0)\bigr)$。
:::

::: proof
对$\dim V$用归纳法；$\dim V\le 1$的情形是显然的（这时$N = 0$）。由于$N$是幂零的，它不是单射，所以$U = \Img N$的维数小于$V$的维数，并且$N$把$U$映到自身。对$U$上的$N$应用归纳假设，存在$\mathbf{u}_1, \dots, \mathbf{u}_p\in U$和整数$l_i\ge 1$，使得向量$N^j\mathbf{u}_i$（$0\le j < l_i$）构成$U$的一组基，且$N^{l_i}\mathbf{u}_i = \mathbf{0}$。由于$\mathbf{u}_i\in\Img N$，可以选取$\mathbf{w}_i$使得$N\mathbf{w}_i = \mathbf{u}_i$。

**向量$N^j\mathbf{w}_i$（$1\le i\le p$，$0\le j\le l_i$）线性无关。**设$\sum_{i,j}c_{ij}N^j\mathbf{w}_i = \mathbf{0}$。作用$N$得$\sum_{i,j}c_{ij}N^j\mathbf{u}_i = \mathbf{0}$；其中$j = l_i$的项为零，其余的项都是$U$的基向量，所以当$j < l_i$时$c_{ij} = 0$。剩下的是$\sum_ic_{il_i}N^{l_i}\mathbf{w}_i = \sum_ic_{il_i}N^{l_i - 1}\mathbf{u}_i = \mathbf{0}$，而这些又都是$U$的基向量，所以其余的系数也都为零。

**补全为基。**用向量$\mathbf{y}_1, \dots, \mathbf{y}_q$把这个线性无关组$\mathcal{L}$扩充为$V$的一组基。每个$N\mathbf{y}_k$都在$U$中，而$U$由向量$N^j\mathbf{u}_i = N(N^j\mathbf{w}_i)$张成；所以存在$\mathbf{x}_k\in\Span\mathcal{L}$使得$N\mathbf{y}_k = N\mathbf{x}_k$。用$\mathbf{z}_k = \mathbf{y}_k - \mathbf{x}_k$代替$\mathbf{y}_k$：向量组$\mathcal{L}, \mathbf{z}_1, \dots, \mathbf{z}_q$仍然是一组基（我们减去的是$\mathcal{L}$张成的空间中的向量），并且$N\mathbf{z}_k = \mathbf{0}$。这组基由链$\mathbf{w}_i, N\mathbf{w}_i, \dots, N^{l_i}\mathbf{w}_i$（长度为$k_i = l_i + 1$）和长度为$1$的链$\mathbf{z}_k$组成，这正是所要证明的。
:::

::: theorem 若尔当标准形 {#thm-jordan}
设$A$是$n\times n$矩阵，其特征多项式在$\F$上能分解为一次因式的乘积（例如，任何复矩阵）。则$A$相似于一个若尔当矩阵$J$，称为$A$的**若尔当标准形**，它在不计块的次序的意义下是唯一的。对每个特征值$\lambda$：

1. 特征值为$\lambda$的块的个数等于几何重数$\dim E_\lambda$；
2. 这些块的大小之和等于$\lambda$的代数重数；
3. 这些块中最大的块的大小等于极小多项式中$(t - \lambda)$的指数；
4. 对每个$j\ge 1$，大小至少为$j$的块的个数为

$$
\dim\operatorname{Nul}(A - \lambda I)^j - \dim\operatorname{Nul}(A - \lambda I)^{j-1} = \rank(A - \lambda I)^{j-1} - \rank(A - \lambda I)^j.
$$ {#eq-block-count}
:::

::: proof
**存在性。**由[[#thm-primary]]，$\F^n$是不变子空间$K_i$的直和，并且在$K_i$上矩阵的作用是$\lambda_iI + N_i$，其中$N_i$幂零。由[[#lem-nilpotent]]，$K_i$有一组基，在这组基下$N_i$是若干块$J_k(0)$的直和，所以$\lambda_iI + N_i$是若干块$J_k(\lambda_i)$的直和。把所有$K_i$的基合在一起，就得到$\F^n$的一组基，在这组基下$A$是若尔当矩阵。

**计数公式与唯一性。**对单个块，$(J_k(\lambda) - \lambda I)^j = N^j$的秩为$\max(k - j, 0)$，所以$\dim\operatorname{Nul}(J_k(\lambda) - \lambda I)^j = \min(j, k)$；对于特征值为另一个值$\mu$的块，$J_k(\mu) - \lambda I$可逆，对零空间没有贡献。零空间的维数对$J$的各块是可加的，并且是相似不变量，所以

$$
\dim\operatorname{Nul}(A - \lambda I)^j - \dim\operatorname{Nul}(A - \lambda I)^{j-1} = \sum_{\text{所有块 } J_k(\lambda)}\bigl(\min(j, k) - \min(j - 1, k)\bigr),
$$

而和式中的每一项当$k\ge j$时为$1$，否则为$0$。这就证明了[[#eq-block-count]]（秩的形式由秩-零化度定理得到）。由于右边只依赖于$A$，各种大小的块的个数都由$A$决定：若尔当标准形在不计次序的意义下是唯一的。结论1是$j = 1$的情形；结论2由[[#thm-primary]]的第3部分得出；对于结论3，对$q = (t - \lambda)^e$，$q(J_k(\lambda)) = O$当且仅当$e\ge k$，而一个多项式零化分块对角矩阵当且仅当它零化每一块。
:::

特别地，**两个特征多项式都能分解为一次因式乘积的矩阵相似，当且仅当它们有相同的若尔当标准形**——这完全回答了[[linear-algebra/linear-maps]]一章中提出的相似性问题。使$A$化为若尔当标准形的基由**若尔当链**组成：对于特征值为$\lambda$、大小为$k$的块，链是满足下式的向量$\mathbf{v}_1, \dots, \mathbf{v}_k$：

$$
(A - \lambda I)\mathbf{v}_1 = \mathbf{0}, \qquad (A - \lambda I)\mathbf{v}_j = \mathbf{v}_{j-1}\quad(j = 2, \dots, k),
$$

于是$A\mathbf{v}_j = \lambda\mathbf{v}_j + \mathbf{v}_{j-1}$——这正是$J_k(\lambda)$的各列所表达的。

::: widget transform2d
matrix: 1,1; 0,1
eigen: true
caption: 剪切矩阵$J_2(1)$，最简单的不可对角化矩阵。它只有一条特征向量直线，即$x$轴。向量$\mathbf{e}_2$是广义特征向量：$(A - I)\mathbf{e}_2 = \mathbf{e}_1$，所以$A\mathbf{e}_2 = \mathbf{e}_2 + \mathbf{e}_1$——它沿特征向量方向被推移。把左下角的元素从$0$改为一个小数，例如$0.05$：就会出现两条非常靠近的特征向量直线。若尔当块是不同的特征向量合并时的极限情形。
:::

## 若尔当标准形的计算

计算步骤与理论相对应：求出特征值及其代数重数；对每个特征值计算$(A - \lambda I)^j$的秩，并由[[#eq-block-count]]读出各块的大小；然后自顶向下构造若尔当链：选取属于$\operatorname{Nul}(A - \lambda I)^k$但不属于$\operatorname{Nul}(A - \lambda I)^{k-1}$的$\mathbf{v}_k$，并令$\mathbf{v}_{j-1} = (A - \lambda I)\mathbf{v}_j$。

::: example 3×3矩阵的若尔当标准形 {#ex-jordan3}
求$B = \begin{pmatrix}0&1&2\\0&2&0\\-1&1&3\end{pmatrix}$的若尔当标准形$J$，以及满足$B = PJP^{-1}$的可逆矩阵$P$。
::: solution
由[[#ex-minpoly]]：$p_B(t) = (2 - t)^2(1 - t)$，特征值$2$的特征空间是$1$维的，由$\mathbf{v}_1 = (1, 0, 1)$张成；特征值$1$有特征向量$\mathbf{w} = (2, 0, 1)$。所以特征值$2$只有一个块，其大小为$2$：

$$
J = \begin{pmatrix}2&1&0\\0&2&0\\0&0&1\end{pmatrix}.
$$

为构造链，需要求满足$(B - 2I)\mathbf{v}_2 = \mathbf{v}_1$的$\mathbf{v}_2$：

$$
\begin{pmatrix}-2&1&2\\0&0&0\\-1&1&1\end{pmatrix}\begin{pmatrix}a\\b\\c\end{pmatrix} = \begin{pmatrix}1\\0\\1\end{pmatrix} \iff -2a + b + 2c = 1,\ -a + b + c = 1.
$$

两式相减得$c = a$，进而$b = 1$；取$\mathbf{v}_2 = (0, 1, 0)$。令$P = (\mathbf{v}_1\ \mathbf{v}_2\ \mathbf{w}) = \begin{pmatrix}1&0&2\\0&1&0\\1&0&1\end{pmatrix}$，则$BP = PJ$。**验证**中间一列：$B\mathbf{v}_2 = (1, 2, 1) = \mathbf{v}_1 + 2\mathbf{v}_2$，正如$J$的第二列所要求的。
:::
:::

::: example 由秩确定块的大小 {#ex-jordan4}
求$M = \begin{pmatrix}2&2&0&-1\\-1&2&1&0\\0&2&2&-1\\-1&0&1&2\end{pmatrix}$的若尔当标准形和一组若尔当基。
::: solution
特征多项式为$(t - 2)^4$，所以$2$是唯一的特征值。令$N = M - 2I$：

$$
N = \begin{pmatrix}0&2&0&-1\\-1&0&1&0\\0&2&0&-1\\-1&0&1&0\end{pmatrix}, \qquad N^2 = \begin{pmatrix}-1&0&1&0\\0&0&0&0\\-1&0&1&0\\0&0&0&0\end{pmatrix}, \qquad N^3 = O.
$$

各秩为$\rank N = 2$（第3、4行重复了第1、2行），$\rank N^2 = 1$，$\rank N^3 = 0$。由[[#eq-block-count]]，大小$\ge 1$的块有$4 - 2 = 2$个，大小$\ge 2$的有$2 - 1 = 1$个，大小$\ge 3$的有$1 - 0 = 1$个。所以有一个大小为$3$的块和一个大小为$1$的块：

$$
J = \begin{pmatrix}2&1&0&0\\0&2&1&0\\0&0&2&0\\0&0&0&2\end{pmatrix}, \qquad m_M(t) = (t - 2)^3.
$$

对于长链，选取满足$N^2\mathbf{v}_3\neq\mathbf{0}$的$\mathbf{v}_3$，例如$\mathbf{v}_3 = \mathbf{e}_3$；则$\mathbf{v}_2 = N\mathbf{v}_3 = (0,1,0,1)$，$\mathbf{v}_1 = N\mathbf{v}_2 = (1,0,1,0)$，后者是特征向量。特征空间$\operatorname{Nul}(N)$是$2$维的，由$(1,0,1,0)$和$(0,1,0,2)$张成；取与$\mathbf{v}_1$线性无关的$\mathbf{w} = (0,1,0,2)$作为长度为$1$的链。于是$P = (\mathbf{v}_1\ \mathbf{v}_2\ \mathbf{v}_3\ \mathbf{w})$可逆，且$M = PJP^{-1}$。
:::
:::

::: quiz
某$4\times 4$矩阵的特征多项式为$(t - 2)^4$，极小多项式为$(t - 2)^2$。它的若尔当标准形可能是哪些？（选出所有正确的选项。）
- [x] $J_2(2)\oplus J_2(2)$
- [x] $J_2(2)\oplus J_1(2)\oplus J_1(2)$
- [ ] $J_4(2)$
- [ ] $J_3(2)\oplus J_1(2)$
::: solution
各块大小之和为$4$，最大块的大小为$2$（极小多项式中的指数）。可能的情形是$2 + 2$和$2 + 1 + 1$。它们可以用几何重数区分：前者$\dim E_2 = 2$，后者为$3$。大小为$4$或$3$的块会要求极小多项式中出现$(t - 2)^4$或$(t - 2)^3$。
:::
:::

## 幂、指数与微分方程

若尔当块很便于计算，因为$J_k(\lambda) = \lambda I + N$，其中$\lambda I$与$N$可交换，且$N^k = O$。因此可以应用二项式定理，并且展开式在$k$项之后就终止：

$$
J_k(\lambda)^m = \sum_{j=0}^{k-1}\binom{m}{j}\lambda^{m-j}N^j, \qquad\text{例如}\qquad J_3(\lambda)^m = \begin{pmatrix}\lambda^m & m\lambda^{m-1} & \binom m2\lambda^{m-2}\\ 0&\lambda^m&m\lambda^{m-1}\\0&0&\lambda^m\end{pmatrix}.
$$ {#eq-jordan-power}

类似地，若尔当块的**矩阵指数**$e^{tA} = \sum_{m\ge 0}\frac{t^m}{m!}A^m$为

$$
e^{tJ_3(\lambda)} = e^{\lambda t}\left(I + tN + \frac{t^2}{2}N^2\right) = e^{\lambda t}\begin{pmatrix}1&t&\frac{t^2}{2}\\0&1&t\\0&0&1\end{pmatrix}.
$$

由于$A = PJP^{-1}$给出$A^m = PJ^mP^{-1}$和$e^{tA} = Pe^{tJ}P^{-1}$，这些公式适用于每个矩阵。与可对角化的情形相比，新的特点是由对角线外的$1$所产生的**多项式因子**$m\lambda^{m-1}$和$te^{\lambda t}$。

::: example 一个亏损的线性方程组 {#ex-jordan-ode}
求解$\mathbf{x}'(t) = A\mathbf{x}(t)$，其中$A = J_2(-1) = \begin{pmatrix}-1&1\\0&-1\end{pmatrix}$，$\mathbf{x}(0) = (0, 1)$。
::: solution
解为$\mathbf{x}(t) = e^{tA}\mathbf{x}(0)$，其中$e^{tA} = e^{-t}\begin{pmatrix}1&t\\0&1\end{pmatrix}$，所以$\mathbf{x}(t) = (te^{-t}, e^{-t})$。也可以直接求解：由第二个方程$x_2' = -x_2$得$x_2 = e^{-t}$，然后满足$x_1(0) = 0$的方程$x_1' = -x_1 + e^{-t}$的解为$x_1 = te^{-t}$（验证：$x_1' = e^{-t} - te^{-t} = -x_1 + e^{-t}$）。因子$t$是若尔当块的标志；在力学中它出现在临界阻尼时，在受迫振动中则出现在共振时（[[ode/linear-systems]]）。
:::
:::

::: widget phaseplane
matrix: -1,1; 0,-1
x: -3, 3
y: -3, 3
caption: $\mathbf{x}' = J_2(-1)\mathbf{x}$的相图，这是一个**退化结点**。所有解都衰减到原点，并且在趋近原点时都与唯一的特征向量直线（$x$轴）相切——没有第二条直线解。把右上角的元素改为$0$，得到$-I$，其相图是由直线组成的星形；或者使两个对角元稍有不同，就会看到出现两条特征向量直线。
:::

::: application 瞬态增长
当$\abs{\lambda} < 1$时，$J_k(\lambda)^m$的每个元素都随$m\to\infty$趋于$0$，所以只要$A$的所有特征值都位于单位圆内，就有$A^m\to O$。但对角线外的元素$m\lambda^{m-1}$起初会**增长**：对$\lambda = 0.8$，元素$m(0.8)^{m-1}$在$m = 4$和$m = 5$时升至约$2.05$，然后才衰减；在$3\times 3$的块中，角上的元素$\binom m2(0.8)^{m-2}$会攀升到约$7.5$。在人口、经济或流体流动的模型中，这种瞬态放大可能比最终的衰减更重要，而单凭特征值是看不出它的。（对于$\abs{\lambda}$接近$1$的大块，瞬态峰值可能极其巨大。）
:::

::: widget plot
f: 0.8^x; x*0.8^(x - 1); x*(x - 1)/2*0.8^(x - 2)
x: 0, 40
y: 0, 8
labels: \lambda^m; m\lambda^{m-1}; \binom m2\lambda^{m-2}
caption: 由[[#eq-jordan-power]]得到的$J_3(0.8)^m$的三个不同元素随$m$变化的图像。对角元$0.8^m$稳定地衰减，而对角线上方的元素起初会增长——$m\,0.8^{m-1}$的峰值约为$2.05$（在$m = 4, 5$处），$\binom m2 0.8^{m-2}$的峰值约为$7.55$（在$m = 9, 10$处）——然后指数衰减才占上风。特征值预言长期行为；若尔当结构支配瞬态过程。
:::

::: remark 若尔当标准形不用数值方法计算
若尔当标准形不连续地依赖于矩阵的元素：对每个$\eps > 0$，$\begin{pmatrix}1&1\\ \eps&1\end{pmatrix}$都是可对角化的，特征值为$1\pm\sqrt\eps$；但在$\eps = 0$时它是若尔当块$J_2(1)$。由于舍入误差会扰动每个元素，浮点计算无法可靠地判定一个矩阵的若尔当标准形是什么。数值软件改用**舒尔（Schur）分解**：每个复矩阵都酉相似于一个上三角矩阵，$A = UTU^*$，这一分解可以稳定地计算（用QR算法）。对于特征多项式不能分解为一次因式乘积的矩阵——例如在$\Q$上——有一个替代品，即由友矩阵构成的**有理标准形**。
:::

::: history
卡米尔·若尔当（Camille Jordan）在他的《置换与代数方程论》（*Traité des substitutions et des équations algébriques*，1870）中发表了这一标准形，其背景是源于伽罗瓦理论的有限域上的线性代换。卡尔·魏尔斯特拉斯（Karl Weierstrass）已于1868年针对成对的二次型和双线性型建立了与之等价的初等因子理论；1874年，若尔当与利奥波德·克罗内克（Leopold Kronecker）就这两种方法的优劣和优先权展开了一场尖锐的公开争论。凯莱-哈密顿定理以阿瑟·凯莱（Arthur Cayley）和威廉·罗恩·哈密顿（William Rowan Hamilton）的名字命名：凯莱在1858年关于矩阵的论文中叙述了这一定理，对$2\times 2$矩阵验证了它，并称已验证了$3\times 3$的情形；哈密顿则在1853年对四元数的线性函数证明了它的一个版本。对任意阶矩阵的第一个证明是费迪南德·格奥尔格·弗罗贝尼乌斯（Ferdinand Georg Frobenius）于1878年给出的，他也正是在这篇论文中引入了极小多项式。
:::

## 后续内容

若尔当标准形完成了方阵在相似意义下的分类，它也是研究矩阵指数和求解线性微分方程组（[[ode/linear-systems]]）——包括[[ode/nonlinear-systems]]一章中的稳定性理论——的自然框架。它的代数基础是主理想整环上有限生成模的结构定理：让$t$以$A$的方式作用，空间$\F^n$就成为多项式环$\F[t]$上的模，而若尔当标准形和有理标准形是分解这个模的两种方式（[[abstract-algebra/rings]]，[[abstract-algebra/polynomials]]）。在数值计算中，舒尔分解和奇异值分解（[[linear-algebra/svd]]）取代了它的位置。无穷维的类似理论——非自伴算子的谱理论——是泛函分析的核心课题之一。

::: summary
- 每个矩阵都满足它的特征方程，$p_A(A) = O$（凯莱-哈密顿定理，[[#thm-cayley-hamilton]]）；所以$A^{-1}$和$A$的所有幂都是$A$的次数小于$n$的多项式。
- 极小多项式整除每个零化多项式，特别地整除$p_A$，并且与$p_A$有相同的根（[[#thm-minimal-poly]]）；$A$可对角化当且仅当$m_A$没有重因式（[[#thm-diag-minpoly]]）。
- 广义特征空间$\operatorname{Nul}(A - \lambda_iI)^{m_i}$的维数等于代数重数，并且把$\F^n$分解为直和（[[#thm-primary]]）。
- 每个幂零映射都有一组由链构成的基（[[#lem-nilpotent]]）；因此每个特征多项式能分解为一次因式乘积的矩阵都相似于一个若尔当矩阵，并且这个若尔当矩阵在不计块的次序的意义下是唯一的（[[#thm-jordan]]）。
- 属于$\lambda$的块数等于几何重数；块的总大小等于代数重数；最大块的大小等于$m_A$中的指数；大小$\ge j$的块数为$\rank(A - \lambda I)^{j-1} - \rank(A - \lambda I)^j$。
- 若尔当块的幂和指数含有多项式因子$m\lambda^{m-1}$、$te^{\lambda t}$，它们导致退化结点和瞬态增长。
- 若尔当标准形是一种理论工具；在数值计算中使用的是舒尔分解和奇异值分解。
:::

## 习题

::: exercise 用凯莱-哈密顿定理求逆矩阵 {level=1 check="3/5"}
对$A = \begin{pmatrix}2&1\\1&3\end{pmatrix}$验证凯莱-哈密顿定理，并用它求$A^{-1}$。$A^{-1}$的$(1,1)$元是多少？
::: solution
$p_A(t) = t^2 - 5t + 5$。于是$A^2 = \begin{pmatrix}5&5\\5&10\end{pmatrix}$，$A^2 - 5A + 5I = \begin{pmatrix}5 - 10 + 5&5 - 5\\5 - 5&10 - 15 + 5\end{pmatrix} = O$。移项得$A(5I - A) = 5I$，所以$A^{-1} = \frac15(5I - A) = \frac15\begin{pmatrix}3&-1\\-1&2\end{pmatrix}$，其$(1,1)$元为$\frac35$。
:::
:::

::: exercise 极小多项式的次数 {level=1 check="3"}
若尔当矩阵$J_3(2)\oplus J_1(2)$的极小多项式是什么？它的次数是多少？
::: solution
由[[#thm-jordan]]，极小多项式为$(t - \lambda)^{e}$，其中$e$是最大块的大小：$m(t) = (t - 2)^3$，次数为$3$——而特征多项式$(t - 2)^4$的次数为$4$。（[[#ex-jordan4]]中矩阵$M$的若尔当标准形正是如此。）
:::
:::

::: exercise 2×2矩阵的若尔当标准形 {level=1}
求$A = \begin{pmatrix}3&1\\-1&1\end{pmatrix}$的若尔当标准形，以及满足$A = PJP^{-1}$的矩阵$P$。
::: solution
$p(t) = t^2 - 4t + 4 = (t - 2)^2$。由于$A - 2I = \begin{pmatrix}1&1\\-1&-1\end{pmatrix}\neq O$，特征空间是$1$维的（由$\mathbf{v}_1 = (1, -1)$张成），从而$J = J_2(2) = \begin{pmatrix}2&1\\0&2\end{pmatrix}$。为构造链，解$(A - 2I)\mathbf{v}_2 = \mathbf{v}_1$：$a + b = 1$，于是取$\mathbf{v}_2 = (1, 0)$。则$P = \begin{pmatrix}1&1\\-1&0\end{pmatrix}$，并且确实有$A\mathbf{v}_2 = (3, -1) = \mathbf{v}_1 + 2\mathbf{v}_2$。
:::
:::

::: exercise 读出块的大小 {level=2 check="3"}
$6\times 6$矩阵$A$只有一个特征值$5$，且$\rank(A - 5I) = 3$，$\rank(A - 5I)^2 = 1$，$(A - 5I)^3 = O$。求它的若尔当标准形。最大块的大小是多少？
::: solution
由[[#eq-block-count]]：大小$\ge 1$的块有$6 - 3 = 3$个；大小$\ge 2$的有$3 - 1 = 2$个；大小$\ge 3$的有$1 - 0 = 1$个；大小$\ge 4$的有$0$个。所以有一个大小为$3$的块，一个大小为$2$的块（$2 - 1$），一个大小为$1$的块（$3 - 2$）：$J = J_3(5)\oplus J_2(5)\oplus J_1(5)$，各块大小之和为$6$。最大块的大小为$3$，且$m_A(t) = (t - 5)^3$。
:::
:::

::: exercise 亏损矩阵的幂 {level=2 check="112"}
对$A = \begin{pmatrix}3&1\\-1&1\end{pmatrix}$，证明$(A - 2I)^2 = O$，并由此推出$A^m$的公式。$A^5$的$(1,1)$元是多少？
::: solution
$(A - 2I)^2 = \begin{pmatrix}1&1\\-1&-1\end{pmatrix}^2 = O$（由凯莱-哈密顿定理，因为$p_A(t) = (t - 2)^2$）。令$N = A - 2I$，由二项式定理得$A^m = (2I + N)^m = 2^mI + m2^{m-1}N$，所有更高次的项都为零。对$m = 5$：$A^5 = 32I + 80N = \begin{pmatrix}112&80\\-80&-48\end{pmatrix}$。$(1,1)$元为$112$。
:::
:::

::: exercise 退化结点 {level=2 check="1/e"}
对$\mathbf{x}' = \begin{pmatrix}-1&1\\0&-1\end{pmatrix}\mathbf{x}$满足$\mathbf{x}(0) = (0, 1)$的解$\mathbf{x}(t) = (x_1(t), x_2(t))$，求$x_1(1)$，以及$x_1$取最大值的时刻。
::: solution
由[[#ex-jordan-ode]]，$x_1(t) = te^{-t}$，所以$x_1(1) = e^{-1} = \frac1e$。由于$x_1'(t) = (1 - t)e^{-t}$，最大值在$t = 1$处取到：分量$x_1$先被$x_2$推高，然后两者才一起衰减——这是瞬态增长的连续时间版本。
:::
:::

::: exercise 可能的若尔当标准形 {level=2}
列出特征多项式为$-(t - 1)^3(t - 4)^2$、极小多项式为$(t - 1)^2(t - 4)$的$5\times 5$矩阵所有可能的若尔当标准形（不计块的次序）。
::: solution
对特征值$4$：块的总大小为$2$，最大块为$1$，所以是$J_1(4)\oplus J_1(4)$。对特征值$1$：总大小为$3$，最大块为$2$，所以是$J_2(1)\oplus J_1(1)$。恰有一种可能：$J = J_2(1)\oplus J_1(1)\oplus J_1(4)\oplus J_1(4)$。
:::
:::

::: exercise 幂零矩阵 {level=3}
证明：若$n\times n$矩阵$A$对某个$k\ge 1$满足$A^k = O$，则$A^n = O$。由此推出幂零矩阵的特征多项式为$p_A(t) = (-t)^n$。
::: solution
由[[#thm-minimal-poly]]，$m_A$整除$t^k$，所以对某个$j\ge 1$有$m_A(t) = t^j$。它也整除次数为$n$的$p_A$；所以$j\le n$，从而$A^n = A^{n-j}A^j = O$。每个特征值都是$m_A = t^j$的根，因而都是$0$；所以在$\C$上，首项为$(-t)^n$且只有根$0$的特征多项式就是$(-t)^n$。
:::
:::

::: exercise 矩阵与其转置相似 {level=3}
证明：每个复方阵$A$都与$A\T$相似。
::: hint
先利用把基的次序颠倒过来的置换矩阵，证明$J_k(\lambda)\T$与$J_k(\lambda)$相似。
:::
::: solution
设$R$是反对角线上元素为$1$的$k\times k$矩阵（$R\mathbf{e}_j = \mathbf{e}_{k+1-j}$），则$R = R^{-1}$。用$R$作共轭会把行和列的次序都颠倒过来，从而把$J_k(\lambda)$对角线上方的$1$变成对角线下方的$1$：$RJ_k(\lambda)R = J_k(\lambda)\T$。因此每个若尔当块都与它的转置相似，任何若尔当矩阵$J$也是如此（逐块作共轭）。现在若$A = PJP^{-1}$，则$A\T = (P^{-1})\T J\T P\T$与$J\T$相似，$J\T$与$J$相似，而$J$与$A$相似。由于相似关系具有传递性，$A\T$与$A$相似。
:::
:::

::: exercise 可对角化部分加幂零部分 {level=3}
证明：每个复方阵都可以写成$A = D + N$，其中$D$可对角化，$N$幂零，且$DN = ND$。（这就是**若尔当-谢瓦莱（Jordan–Chevalley）分解**。）
::: solution
写$A = PJP^{-1}$，其中$J$是若尔当矩阵，并把$J$拆成$J = \Lambda + M$，其中$\Lambda$是$J$的对角部分，$M$由对角线上方的那些$1$构成。$M$是幂零的（它是严格上三角矩阵）。在每一块上，$\Lambda$是数量矩阵$\lambda I$，它与任何矩阵都可交换；所以$\Lambda M = M\Lambda$。令$D = P\Lambda P^{-1}$，$N = PMP^{-1}$。则$A = D + N$，$D$可对角化，$N^n = PM^nP^{-1} = O$，并且$DN = P\Lambda MP^{-1} = PM\Lambda P^{-1} = ND$。（可以证明$D$和$N$是唯一确定的，并且都是$A$的多项式。）
:::
:::
