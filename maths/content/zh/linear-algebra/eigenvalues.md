两个城镇每年都互相迁移居民：城镇$A$中$20\%$的人迁往城镇$B$，而$B$中$30\%$的人迁往$A$。若$\mathbf{x}_k = (a_k, b_k)$记录$k$年后两镇的人口，则

$$
\mathbf{x}_{k+1} = A\mathbf{x}_k, \qquad A = \begin{pmatrix}0.8&0.3\\0.2&0.7\end{pmatrix},
$$

所以$\mathbf{x}_k = A^k\mathbf{x}_0$。长期来看会发生什么？硬算$A^{100}$既乏味，也解释不了任何问题。但有两个向量在$A$的作用下表现得非常简单：

$$
A\begin{pmatrix}3\\2\end{pmatrix} = \begin{pmatrix}3\\2\end{pmatrix}, \qquad A\begin{pmatrix}1\\-1\end{pmatrix} = \begin{pmatrix}0.5\\-0.5\end{pmatrix} = 0.5\begin{pmatrix}1\\-1\end{pmatrix}.
$$

$A$使第一个向量保持不变，使第二个减半。任何初始向量都是一个组合$\mathbf{x}_0 = c_1(3,2) + c_2(1,-1)$，于是

$$
\mathbf{x}_k = A^k\mathbf{x}_0 = c_1\begin{pmatrix}3\\2\end{pmatrix} + c_2\,(0.5)^k\begin{pmatrix}1\\-1\end{pmatrix} \longrightarrow c_1\begin{pmatrix}3\\2\end{pmatrix}.
$$

无论初始人口如何，两镇人口最终都稳定在$3 : 2$的比例，而偏离这一比例的部分每年减半。向量$(3,2)$和$(1,-1)$是$A$的**特征向量**，数$1$和$0.5$是相应的**特征值**。本章介绍如何求出它们，什么时候它们多到足以构成一组基——这时矩阵就变成对角矩阵——以及它们如何支配矩阵的幂、递推关系和动力系统。

## 特征值与特征向量

::: definition 特征值与特征向量 {#def-eigen}
设$T$是域$\F$上向量空间$V$上的线性算子（例如对$n\times n$矩阵$A$取$T(\mathbf{x}) = A\mathbf{x}$）。标量$\lambda\in\F$称为$T$的**特征值**，如果存在**非零**向量$v\in V$使得

$$
T(v) = \lambda v.
$$

这样的$v$称为属于$\lambda$的**特征向量**。集合$E_\lambda = \ker(T - \lambda I) = \set{v\in V : Tv = \lambda v}$称为$\lambda$的**特征空间**；它由属于$\lambda$的全部特征向量以及$0$组成，并且是一个子空间（一个核）。
:::

特征向量是$T$不使之转向的方向：它只是按因子$\lambda$被拉伸、压缩或反向。几何在平面上提供了许多例子：

- 到直线$L$上的投影有特征值$1$（特征空间为$L$）和特征值$0$（特征空间为与$L$垂直的直线）；
- 关于$L$的反射有特征值$1$（在$L$上）和$-1$（垂直于$L$），如[[linear-algebra/linear-maps#ex-reflection]]；
- 剪切$\begin{pmatrix}1&1\\0&1\end{pmatrix}$只有一个特征值$1$，其特征空间是$x$轴；
- 旋转$90^\circ$使每个非零向量都转向，所以它**没有**实特征值。

特征值并不局限于矩阵。在无穷次可微函数构成的空间上，$D(e^{\lambda x}) = \lambda e^{\lambda x}$，所以每个实数$\lambda$都是求导运算的特征值，相应的特征向量是$e^{\lambda x}$——这正是指数函数能解线性微分方程的原因。

::: widget transform2d
matrix: 4,1; 2,3
eigen: true
vector: 1,0
caption: 作用该矩阵（播放动画或把$t$移到$1$），然后拖动向量$\mathbf{v}$。在大多数方向上，$A\mathbf{x}$指向别处；只有沿两条高亮的直线，$A\mathbf{x}$才与$\mathbf{x}$平行。沿$(1,1)$的向量被拉伸为$5$倍，沿$(1,-2)$的被拉伸为$2$倍——它们正是[[#ex-2x2]]中的特征向量。把矩阵改成旋转矩阵，例如$\begin{pmatrix}0&-1\\1&0\end{pmatrix}$，特征向量所在的直线就消失了。
:::

怎样求特征值？$\lambda$是特征值当且仅当方程$(A - \lambda I)\mathbf{v} = \mathbf{0}$有非平凡解，而行列式恰好能检测这一点。

::: theorem 特征方程 {#thm-char-eq}
设$A$是$n\times n$矩阵。标量$\lambda$是$A$的特征值当且仅当

$$
\det(A - \lambda I) = 0.
$$
:::

::: proof
$\lambda$是特征值，当且仅当存在$\mathbf{v}\neq\mathbf{0}$使$(A - \lambda I)\mathbf{v} = \mathbf{0}$，当且仅当$A - \lambda I$奇异（由[[linear-algebra/matrices#thm-imt]]），当且仅当$\det(A - \lambda I) = 0$（由[[linear-algebra/determinants#thm-det-invertible]]）。
:::

::: definition 特征多项式 {#def-charpoly}
$n\times n$矩阵$A$的**特征多项式**是$p_A(\lambda) = \det(A - \lambda I)$。
:::

把行列式展开可知，$p_A$是$\lambda$的$n$次多项式。（有些书用$\det(\lambda I - A)$，它与前者相差因子$(-1)^n$，根相同。）对$2\times 2$矩阵，

$$
p_A(\lambda) = \begin{vmatrix}a - \lambda & b\\ c & d-\lambda\end{vmatrix} = \lambda^2 - (a + d)\lambda + (ad - bc) = \lambda^2 - (\tr A)\lambda + \det A.
$$ {#eq-char2}

所以求法是：**先求出$p_A$的根，即特征值；然后对每个特征值，求出$A - \lambda I$的零空间，即特征空间**，后者用消元法求。

::: example 一个2×2矩阵 {#ex-2x2}
求$A = \begin{pmatrix}4&1\\2&3\end{pmatrix}$的特征值和特征向量。
::: solution
由[[#eq-char2]]，$p_A(\lambda) = \lambda^2 - 7\lambda + 10 = (\lambda - 2)(\lambda - 5)$，所以特征值为$2$和$5$。

对$\lambda = 5$：$A - 5I = \begin{pmatrix}-1&1\\2&-2\end{pmatrix}$，它化简为$\begin{pmatrix}1&-1\\0&0\end{pmatrix}$；所以$v_1 = v_2$，$E_5 = \Span\bigl((1,1)\bigr)$。

对$\lambda = 2$：$A - 2I = \begin{pmatrix}2&1\\2&1\end{pmatrix}$，所以$2v_1 + v_2 = 0$，$E_2 = \Span\bigl((1,-2)\bigr)$。

*验证*：$A(1,1) = (5,5)$，$A(1,-2) = (2, -4)$。注意$2 + 5 = 7 = \tr A$，$2\cdot 5 = 10 = \det A$。
:::
:::

这个验证结果并非巧合。

::: proposition 迹、行列式与相似 {#prop-trace-det}
1. 相似矩阵有相同的特征多项式，从而有相同的特征值。
2. 若$p_A$在$\C$上分解为$p_A(\lambda) = (\lambda_1 - \lambda)(\lambda_2 - \lambda)\cdots(\lambda_n - \lambda)$（特征值按重复次数列出），则

$$
\det A = \lambda_1\lambda_2\cdots\lambda_n \qquad\text{以及}\qquad \tr A = \lambda_1 + \lambda_2 + \dots + \lambda_n.
$$
3. 三角矩阵的特征值就是它的对角元。
:::

::: proof
1. 若$B = P^{-1}AP$，则$B - \lambda I = P^{-1}(A - \lambda I)P$，所以由乘积法则，$\det(B - \lambda I) = \det(A - \lambda I)$。
2. 令$\lambda = 0$：$\det A = p_A(0) = \lambda_1\cdots\lambda_n$。对于迹，比较$\lambda^{n-1}$的系数。右边的系数是$(-1)^{n-1}(\lambda_1 + \dots + \lambda_n)$。左边，在$\det(A - \lambda I)$的莱布尼茨展开式中，恒等置换以外的每个置换都至少漏掉两个对角元，所以它对应的项关于$\lambda$的次数至多为$n - 2$；因此$\lambda^{n-1}$的系数只来自对角元之积$(a_{11} - \lambda)\cdots(a_{nn} - \lambda)$，等于$(-1)^{n-1}(a_{11} + \dots + a_{nn})$。
3. $A - \lambda I$是三角矩阵，所以由[[linear-algebra/determinants#thm-triangular]]，$p_A(\lambda) = (a_{11} - \lambda)\cdots(a_{nn} - \lambda)$。
:::

第1部分意味着特征值属于**算子**，而不属于在某组特定基下表示它的矩阵——这是理所当然的，因为$Tv = \lambda v$根本没有涉及基。

::: warning 行化简会改变特征值
行变换保持解集、零空间和秩，但**不**保持特征值：$\begin{pmatrix}4&1\\2&3\end{pmatrix}$的特征值是$2$和$5$，而它的阶梯形$\begin{pmatrix}4&1\\0&5/2\end{pmatrix}$的特征值是$4$和$\tfrac52$。先由$\det(A - \lambda I)$求出特征值；之后才对$A - \lambda I$用消元法求出各个特征空间。
:::

::: widget plot
f: x^2 - t*x + d
x: -2, 9
y: -6, 12
sliders: t=7:-4:10:0.5; d=10:-5:20:0.5
labels: p(\lambda) = \lambda^2 - t\lambda + d
hlines: 0
caption: 迹为$t$、行列式为$d$的$2\times 2$矩阵的特征多项式（这里$x$扮演$\lambda$的角色）。它的根就是特征值——初始时为$2$和$5$，与[[#ex-2x2]]相同。把$d$增大到超过$t^2/4 = 12.25$：抛物线离开横轴，特征值变成一对共轭复数。恰好在$d = t^2/4$时有一个重特征值。
:::

::: quiz
$\mathbf{v}$是$A$的属于特征值$3$的特征向量。$A^2\mathbf{v} - 2A\mathbf{v}$等于什么？
- [ ] $\mathbf{0}$
- [x] $3\mathbf{v}$
- [ ] $9\mathbf{v}$
- [ ] 不知道$A$就无法确定。
::: solution
$A\mathbf{v} = 3\mathbf{v}$，所以$A^2\mathbf{v} = A(3\mathbf{v}) = 3A\mathbf{v} = 9\mathbf{v}$。因此$A^2\mathbf{v} - 2A\mathbf{v} = 9\mathbf{v} - 6\mathbf{v} = 3\mathbf{v}$。一般地，对任意多项式$q$有$q(A)\mathbf{v} = q(\lambda)\mathbf{v}$——这里$q(x) = x^2 - 2x$，$q(3) = 3$。
:::
:::

## 重数

特征值可以在两种不同的意义下重复。

::: definition 代数重数与几何重数 {#def-multiplicity}
设$\lambda$是$A$的特征值。它的**代数重数**是它作为$p_A$的根的重数（即$p_A(t)$的因式分解中$(\lambda - t)$的指数），它的**几何重数**是$\dim E_\lambda = \dim\operatorname{Nul}(A - \lambda I)$，即属于$\lambda$的线性无关特征向量的个数。
:::

对剪切$\begin{pmatrix}1&1\\0&1\end{pmatrix}$，$p(t) = (1 - t)^2$，所以特征值$1$的代数重数为$2$；但$A - I = \begin{pmatrix}0&1\\0&0\end{pmatrix}$的零空间是$1$维的，所以几何重数为$1$。反向的不等式永远不会出现。

::: theorem 几何重数不超过代数重数 {#thm-geo-alg}
对$n\times n$矩阵$A$的每个特征值$\lambda$，$\quad 1\le\dim E_\lambda\le$（$\lambda$的代数重数）。
:::

::: proof
$\dim E_\lambda\ge 1$，因为特征值总有特征向量。令$k = \dim E_\lambda$，取$E_\lambda$的一组基$\mathbf{v}_1, \dots, \mathbf{v}_k$，并把它扩充为$\F^n$的一组基$\mathbf{v}_1, \dots, \mathbf{v}_n$（[[linear-algebra/basis-dimension#thm-dim-facts]]）。令$P$为以这些向量为列的可逆矩阵。由于对$j\le k$有$A\mathbf{v}_j = \lambda\mathbf{v}_j$，$P^{-1}AP$的前$k$列为$\lambda\mathbf{e}_1, \dots, \lambda\mathbf{e}_k$：

$$
P^{-1}AP = \begin{pmatrix}\lambda I_k & B\\ O & C\end{pmatrix}
$$

其中$B$和$C$是某些子块。把$\det(P^{-1}AP - tI)$按第一列展开$k$次（每次第一列唯一的非零元都是顶端的$\lambda - t$），再利用[[#prop-trace-det]]，得$p_A(t) = (\lambda - t)^k\det(C - tI)$。所以$(\lambda - t)^k$整除$p_A(t)$，代数重数至少为$k$。
:::

## 对角化

理想的情形就是引言中的那种：特征向量多到足以构成一组基。

::: definition 可对角化 {#def-diagonalisable}
如果方阵$A$相似于一个对角矩阵，即存在可逆矩阵$P$和对角矩阵$D$使$A = PDP^{-1}$，则称$A$**可对角化**。如果有限维空间有一组由某个线性算子的特征向量构成的基，则称该算子可对角化。
:::

::: theorem 对角化定理 {#thm-diagonalisation}
$n\times n$矩阵$A$可对角化当且仅当它有$n$个线性无关的特征向量。此时$A = PDP^{-1}$，其中$P$的各列是$n$个线性无关的特征向量，$D$的对角元是按同样顺序排列的相应特征值。
:::

::: proof
设$P$的各列为$\mathbf{v}_1, \dots, \mathbf{v}_n$，$D = \diag(\lambda_1, \dots, \lambda_n)$。$AP$的第$j$列是$A\mathbf{v}_j$，$PD$的第$j$列是$\lambda_j\mathbf{v}_j$。所以

$$
AP = PD \iff A\mathbf{v}_j = \lambda_j\mathbf{v}_j \text{ 对每个 } j.
$$

若$A$有线性无关的特征向量$\mathbf{v}_1,\dots,\mathbf{v}_n$，则$P$可逆（它的各列线性无关，[[linear-algebra/matrices#thm-imt]]），由$AP = PD$得$A = PDP^{-1}$。反之，若$A = PDP^{-1}$，则$AP = PD$，所以$P$的各列都是特征向量（它们非零，因为$P$可逆），并且线性无关。
:::

用[[linear-algebra/linear-maps#thm-change-basis]]的语言来说：$D$是$\mathbf{x}\mapsto A\mathbf{x}$在特征向量构成的基下的矩阵。线性无关的特征向量从哪里来？互不相同的特征值会自动提供它们。

::: theorem 不同特征值给出线性无关的特征向量 {#thm-distinct}
若$v_1, \dots, v_k$是$T$的分别属于互不相同的特征值$\lambda_1, \dots, \lambda_k$的特征向量，则$v_1, \dots, v_k$线性无关。
:::

::: proof
假设不然。由线性相关引理（[[linear-algebra/vector-spaces#lem-dependence]]），存在最小的$j$使$v_j\in\Span(v_1, \dots, v_{j-1})$；于是$v_1, \dots, v_{j-1}$线性无关（由$j$的最小性），且$v_j = c_1v_1 + \dots + c_{j-1}v_{j-1}$。对此式作用$T$，并另外乘以$\lambda_j$：

$$
\lambda_jv_j = c_1\lambda_1v_1 + \dots + c_{j-1}\lambda_{j-1}v_{j-1}, \qquad \lambda_jv_j = c_1\lambda_jv_1 + \dots + c_{j-1}\lambda_jv_{j-1}.
$$

两式相减，得$0 = c_1(\lambda_1 - \lambda_j)v_1 + \dots + c_{j-1}(\lambda_{j-1} - \lambda_j)v_{j-1}$。由线性无关性，每个$c_i(\lambda_i - \lambda_j) = 0$，又因为特征值互不相同，每个$c_i = 0$。于是$v_j = 0$，这对特征向量来说是不可能的。
:::

::: corollary {#cor-distinct}
有$n$个互不相同特征值的$n\times n$矩阵可对角化。
:::

::: proof
对每个特征值取一个特征向量。由[[#thm-distinct]]，这$n$个向量线性无关，所以可以应用[[#thm-diagonalisation]]。
:::

当有重复的特征值时，我们需要更仔细地计数。完整的答案是下面的判别准则。

::: theorem 可对角化的判别准则 {#thm-diag-criterion}
$\F$上的$n\times n$矩阵$A$在$\F$上可对角化当且仅当

1. 它的特征多项式在$\F$上分解为一次因式之积：$p_A(t) = (\lambda_1 - t)^{m_1}\cdots(\lambda_r - t)^{m_r}$，其中$\lambda_1, \dots, \lambda_r\in\F$互不相同；并且
2. 对每个特征值，几何重数等于代数重数：$\dim E_{\lambda_i} = m_i$。

此时，把各特征空间的基合在一起，就得到$\F^n$的一组由特征向量构成的基。
:::

::: proof
先证一个引理：*若对$i = 1, \dots, r$有$w_i\in E_{\lambda_i}$，且$w_1 + \dots + w_r = 0$，则每个$w_i = 0$*。事实上，否则那些非零的$w_i$就是属于互不相同特征值的特征向量，而它们满足一个线性相关关系（所有系数都是$1$），这与[[#thm-distinct]]矛盾。由此可知，若在每个特征空间中各取一组基，则合并起来的向量组$\mathcal{L}$线性无关：在一个线性关系中，把各项按特征空间分组，得到满足$\sum w_i = 0$的向量$w_i \in E_{\lambda_i}$；于是每个$w_i = 0$，再由每组基的线性无关性，所有系数都为零。

设1和2成立。则$\mathcal{L}$含有$\sum\dim E_{\lambda_i} = \sum m_i = \deg p_A = n$个线性无关的特征向量，所以由[[#thm-diagonalisation]]，$A$可对角化。

反之，设$A = PDP^{-1}$，其中$D$是对角矩阵。由[[#prop-trace-det]]，$p_A = p_D = \prod_j (d_{jj} - t)$，它分解为一次因式之积。对每个特征值$\lambda$，代数重数等于$D$中等于$\lambda$的对角元的个数，这也等于$\dim\operatorname{Nul}(D - \lambda I)$。最后，$\mathbf{x}\mapsto P\mathbf{x}$把$\operatorname{Nul}(D - \lambda I)$同构地映满$\operatorname{Nul}(A - \lambda I)$，因为$(A - \lambda I)P\mathbf{x} = P(D - \lambda I)\mathbf{x}$。所以两种重数相等。
:::

由代数基本定理（[[complex-analysis/cauchy-theorem]]），在$\C$上条件1总是成立；在$\R$上，旋转就不满足它。条件2才是真正的障碍，下面两个例子说明了这一点：特征多项式相同，结果却相反。

::: example 对角化一个3×3矩阵 {#ex-diag3}
把$A = \begin{pmatrix}2&1&-1\\0&0&2\\0&-1&3\end{pmatrix}$对角化。
::: solution
*特征值*。把$\det(A - tI)$按第一列展开：

$$
p_A(t) = (2 - t)\begin{vmatrix}-t&2\\-1&3 - t\end{vmatrix} = (2 - t)\bigl(t^2 - 3t + 2\bigr) = (2 - t)^2(1 - t).
$$

所以$\lambda = 2$的代数重数为$2$，$\lambda = 1$的重数为$1$。

*特征空间*。对$\lambda = 2$：

$$
A - 2I = \begin{pmatrix}0&1&-1\\0&-2&2\\0&-1&1\end{pmatrix}\sim\begin{pmatrix}0&1&-1\\0&0&0\\0&0&0\end{pmatrix},
$$

所以$x_2 = x_3$，$x_1, x_3$为自由变量：$E_2 = \Span\bigl((1,0,0),\ (0,1,1)\bigr)$，维数为$2$。对$\lambda = 1$：$A - I = \begin{pmatrix}1&1&-1\\0&-1&2\\0&-1&2\end{pmatrix}$，得$x_2 = 2x_3$，$x_1 = -x_2 + x_3 = -x_3$，所以$E_1 = \Span\bigl((-1, 2, 1)\bigr)$。

*结论*。几何重数与代数重数相等（$2 = 2$，$1 = 1$），所以$A$可对角化：

$$
A = PDP^{-1}, \qquad P = \begin{pmatrix}1&0&-1\\0&1&2\\0&1&1\end{pmatrix}, \qquad D = \begin{pmatrix}2&0&0\\0&2&0\\0&0&1\end{pmatrix}.
$$

*验证*：对其中一列，$A(-1, 2, 1) = (-2 + 2 - 1,\ 0 + 0 + 2,\ 0 - 2 + 3) = (-1, 2, 1)$。与其计算$P^{-1}$，不如逐列验证$AP = PD$来得容易。
:::
:::

::: example 一个不能对角化的矩阵 {#ex-defective}
证明$B = \begin{pmatrix}0&1&2\\0&2&0\\-1&1&3\end{pmatrix}$与[[#ex-diag3]]中的$A$有相同的特征多项式，但不可对角化。
::: solution
按第二行展开（该行唯一的非零元是$2 - t$），

$$
p_B(t) = (2 - t)\begin{vmatrix}-t&2\\-1&3 - t\end{vmatrix} = (2 - t)(t^2 - 3t + 2) = (2 - t)^2(1 - t).
$$

对$\lambda = 2$：

$$
B - 2I = \begin{pmatrix}-2&1&2\\0&0&0\\-1&1&1\end{pmatrix}\sim\begin{pmatrix}1&0&-1\\0&1&0\\0&0&0\end{pmatrix},
$$

其秩为$2$，所以$E_2 = \Span\bigl((1, 0, 1)\bigr)$只是$1$维的，而代数重数为$2$。由[[#thm-diag-criterion]]，$B$不可对角化：它的特征向量——$(1,0,1)$以及属于$\lambda = 1$的特征向量$(2,0,1)$——只张成一个平面。这样的矩阵称为**亏损矩阵**；对角化的最佳替代是[[linear-algebra/jordan-form]]中的若尔当标准形。
:::
:::

::: quiz
某个$3\times 3$实矩阵的特征值为$1$，$2$和$3$。下列哪些命题一定成立？（选出所有正确的选项。）
- [x] 它可对角化。
- [x] 它可逆。
- [x] 它的行列式为$6$，迹也为$6$。
- [ ] 它是对称矩阵。
::: solution
三个互不相同的特征值给出三个线性无关的特征向量，所以它可对角化（[[#cor-distinct]]）。由[[#prop-trace-det]]，$\det A = 1\cdot2\cdot3 = 6\neq 0$，所以它可逆，且$\tr A = 1 + 2 + 3 = 6$。但它不一定是对称矩阵：$\begin{pmatrix}1&1&0\\0&2&1\\0&0&3\end{pmatrix}$就是一个反例。
:::
:::

## 矩阵的幂

若$A = PDP^{-1}$，则在$k$个$A$的乘积中，因子$P^{-1}P$成对相消：

$$
A^k = PD^kP^{-1}, \qquad D^k = \diag(\lambda_1^k, \dots, \lambda_n^k).
$$ {#eq-powers}

等价地，在关于特征向量基的坐标下，$A^k$只是把第$j$个坐标乘以$\lambda_j^k$。这使长期行为一目了然：沿$\abs{\lambda} < 1$的特征向量的分量逐渐消失，沿$\abs{\lambda} > 1$的特征向量的分量不断增长，而最大的$\abs{\lambda}$最终占主导地位。

::: example 斐波那契数 {#ex-fibonacci}
斐波那契数定义为$F_0 = 0$，$F_1 = 1$，$F_{k+1} = F_k + F_{k-1}$。求$F_k$的公式。
::: solution
令$\mathbf{u}_k = (F_{k+1}, F_k)$。递推关系说的是

$$
\mathbf{u}_k = \begin{pmatrix}1&1\\1&0\end{pmatrix}\mathbf{u}_{k-1}, \qquad\text{所以}\qquad \mathbf{u}_k = A^k\mathbf{u}_0, \quad \mathbf{u}_0 = \begin{pmatrix}1\\0\end{pmatrix}.
$$

这里$p_A(\lambda) = \lambda^2 - \lambda - 1$，其根为$\varphi = \frac{1 + \sqrt5}{2}\approx 1.618$和$\psi = \frac{1-\sqrt5}{2}\approx -0.618$。由于两者都满足$\lambda^2 = \lambda + 1$，有$A(\lambda, 1) = (\lambda + 1, \lambda) = \lambda(\lambda, 1)$：特征向量为$(\varphi, 1)$和$(\psi, 1)$。用它们表示$\mathbf{u}_0$：$(1, 0) = \frac{1}{\varphi - \psi}\bigl[(\varphi, 1) - (\psi, 1)\bigr]$，其中$\varphi - \psi = \sqrt5$。于是

$$
\mathbf{u}_k = \frac{1}{\sqrt5}\left[\varphi^k\begin{pmatrix}\varphi\\1\end{pmatrix} - \psi^k\begin{pmatrix}\psi\\1\end{pmatrix}\right],
$$

取第二个分量，就得到**比内公式**

$$
F_k = \frac{\varphi^k - \psi^k}{\sqrt5}.
$$

由于$\abs{\psi} < 1$，项$\psi^k/\sqrt5$非常小（$F_k$是最接近$\varphi^k/\sqrt5$的整数），并且$F_{k+1}/F_k\to\varphi$，即黄金分割比。*验证*：$k = 2$时得$\frac{\varphi^2 - \psi^2}{\sqrt5} = \frac{(\varphi - \psi)(\varphi + \psi)}{\sqrt5} = \varphi + \psi = 1 = F_2$。
:::
:::

引言中的例子是一个**马尔可夫链**：$A$的各列元素非负且和为$1$，所以总人口守恒。这样的矩阵总有特征值$1$（$A - I$的各行相加为零，所以$A - I$奇异），而属于$1$且各分量之和为$1$的特征向量称为**稳态**。对这两个城镇，稳态是$(0.6, 0.4)$。下图按照概率论的惯例展示同一个链：在那里转移矩阵作用于行向量，因而是$A$的转置。

::: widget markov
matrix: 0.8,0.2; 0.3,0.7
states: 城镇A; 城镇B
start: 0
steps: 20
caption: 引言中的两镇链，初始时所有人都在城镇A。分布收敛到平稳分布$(0.6, 0.4)$——即属于特征值$1$、经缩放使各分量之和为$1$的特征向量。另一个特征值$0.5$决定收敛速度：与平衡状态的距离每一步减半。
:::

::: application 谷歌的 PageRank
一位在网上随机浏览的用户，在每个页面上随机点击一个链接（偶尔也会随机跳到某个页面）。长期来看，他在每个页面上停留的时间比例，就是一个巨大的马尔可夫链的稳态——一个有数十亿行的矩阵的属于特征值$1$的特征向量。按这个特征向量给网页排序，正是谷歌搜索引擎最初的思想。它用**幂法**计算，幂法只是反复地作用该矩阵：由[[#eq-powers]]，$A^k\mathbf{x}_0$会逐渐与主特征值的特征向量方向一致。见[[probability/markov-chains]]和[[numerical-analysis/iterative-methods]]。
:::

## 复特征值

实矩阵可以有复特征值，而且它们成共轭对出现：$p_A$的系数是实数，所以若$p_A(\lambda) = 0$，则$p_A(\bar\lambda) = \overline{p_A(\lambda)} = 0$；对$A\mathbf{v} = \lambda\mathbf{v}$取共轭，得$A\bar{\mathbf{v}} = \bar\lambda\bar{\mathbf{v}}$。在$\C$上，[[linear-algebra/linear-maps#eq-rotation]]中的旋转$R_\theta$有特征值$e^{\pm i\theta} = \cos\theta\pm i\sin\theta$，它在$\C$上可对角化，但在$\R$上不可对角化。用实数的语言来说，一对复特征值意味着旋转与缩放的结合。

::: proposition 旋转-缩放形式 {#prop-rotation-scaling}
设$A$是$2\times 2$实矩阵，有非实特征值$\lambda = a - bi$（$b\neq 0$）及相应的特征向量$\mathbf{v} = \mathbf{x} + i\mathbf{y}$，其中$\mathbf{x}, \mathbf{y}\in\R^2$。则$P = (\mathbf{x}\ \ \mathbf{y})$可逆，并且

$$
P^{-1}AP = \begin{pmatrix}a&-b\\b&a\end{pmatrix} = r\begin{pmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{pmatrix},
$$

其中$r = \abs{\lambda} = \sqrt{a^2 + b^2}$，$\theta$是满足$\cos\theta = a/r$，$\sin\theta = b/r$的角。
:::

::: proof
比较$A(\mathbf{x} + i\mathbf{y}) = (a - bi)(\mathbf{x} + i\mathbf{y}) = (a\mathbf{x} + b\mathbf{y}) + i(a\mathbf{y} - b\mathbf{x})$的实部和虚部，得$A\mathbf{x} = a\mathbf{x} + b\mathbf{y}$，$A\mathbf{y} = -b\mathbf{x} + a\mathbf{y}$，这恰好说明$AP = P\begin{pmatrix}a&-b\\b&a\end{pmatrix}$。若$\mathbf{x}, \mathbf{y}$在$\R$上线性相关，则$\mathbf{v}$是某个实向量$\mathbf{w}\neq\mathbf{0}$的复数倍，而由$A$和$\mathbf{w}$都是实的且$A\mathbf{w} = \lambda\mathbf{w}$，可推出$\lambda$是实数。所以$P$可逆。
:::

::: example 向外盘旋 {#ex-complex}
求$A = \begin{pmatrix}1&-2\\1&3\end{pmatrix}$的特征值，并描述$A^k\mathbf{x}$的行为。
::: solution
$p_A(\lambda) = \lambda^2 - 4\lambda + 5$，其根为$\lambda = 2\pm i$。对$\lambda = 2 - i$：$A - \lambda I = \begin{pmatrix}-1 + i & -2\\ 1 & 1 + i\end{pmatrix}$；由第二行得$v_1 = -(1 + i)v_2$，所以$\mathbf{v} = (-1 - i, 1) = (-1, 1) + i(-1, 0)$。取$P = \begin{pmatrix}-1&-1\\1&0\end{pmatrix}$，由[[#prop-rotation-scaling]]得

$$
P^{-1}AP = \begin{pmatrix}2&-1\\1&2\end{pmatrix} = \sqrt5\begin{pmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{pmatrix}, \qquad \tan\theta = \tfrac12.
$$

（验证：$AP = \begin{pmatrix}-3&-1\\2&-1\end{pmatrix}$，$P\begin{pmatrix}2&-1\\1&2\end{pmatrix} = \begin{pmatrix}-3&-1\\2&-1\end{pmatrix}$。）所以在由$P$给出的坐标下，每作用一次$A$，就旋转$\theta\approx 26.6^\circ$并拉伸为$\abs{\lambda} = \sqrt5$倍：点$A^k\mathbf{x}$沿一条变形的螺线向外盘旋。如果$\abs{\lambda}$小于$1$，它们就会盘旋着趋向$\mathbf{0}$。
:::
:::

::: application 线性微分方程
对方程组$\mathbf{x}'(t) = A\mathbf{x}(t)$，属于特征值$\lambda$的特征向量$\mathbf{v}$给出解$\mathbf{x}(t) = e^{\lambda t}\mathbf{v}$，因为两边都等于$\lambda e^{\lambda t}\mathbf{v}$。若$A$可对角化，则每个解都是这些解的线性组合，而特征值实部的符号决定稳定性：实部全为负意味着每个解都衰减到$\mathbf{0}$。复特征值产生振荡——即相平面上的螺线。这是[[ode/linear-systems]]的主题。
:::

::: history
特征值问题起源于18世纪的力学。莱昂哈德·欧拉（Leonhard Euler）研究刚体的转动，找到了刚体的主轴；约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）认识到，这些主轴就是我们今天所说的惯性矩阵的特征向量。特征方程也出现在拉格朗日和皮埃尔-西蒙·拉普拉斯（Pierre-Simon Laplace）关于微小振动以及行星轨道的缓慢（“长期”）摄动的研究中。1829年，奥古斯丁-路易·柯西（Augustin-Louis Cauchy）把这些思想推广到任意多个变量，特别地证明了对称系统的根都是实数。他把这些根称为“特征根”（*characteristic roots*），这个名称在“特征多项式”一词中保留了下来。德语前缀 *eigen-*（意为“自己的”“固有的”）是大卫·希尔伯特（David Hilbert）于1904年在研究积分方程时引入的（*Eigenwert*、*Eigenfunktion*）；英语保留了“eigenvalue”和“eigenvector”这两个混合词，不过“characteristic value”和“proper value”的说法也长期沿用。
:::

## 后续内容

对称矩阵总是可对角化的，而且可以用正交矩阵对角化——这就是[[linear-algebra/spectral-theorem]]中的谱定理；奇异值分解（[[linear-algebra/svd]]）把这一思想推广到所有长方矩阵。不可对角化的矩阵将在[[linear-algebra/jordan-form]]中化为若尔当标准形，凯莱-哈密顿定理也将在那里出现。特征值支配着微分方程平衡点的稳定性（[[ode/linear-systems]]，[[ode/nonlinear-systems]]）、马尔可夫链的长期行为（[[probability/markov-chains]]）、线性递推关系（[[discrete/recurrences]]）、振动模态和量子能级；而大型矩阵特征值的计算是数值分析的一个重要课题。

::: summary
- 若对某个$\mathbf{v}\neq\mathbf{0}$有$A\mathbf{v} = \lambda\mathbf{v}$，则$\lambda$是$A$的特征值；特征空间$E_\lambda = \operatorname{Nul}(A - \lambda I)$。
- 特征值是特征多项式$\det(A - \lambda I)$的根（[[#thm-char-eq]]）；对$2\times2$矩阵，特征多项式为$\lambda^2 - (\tr A)\lambda + \det A$。
- 相似矩阵有相同的特征多项式；特征值之积为$\det A$，特征值之和为$\tr A$（[[#prop-trace-det]]）。
- 存在对角矩阵$D$使$A = PDP^{-1}$，当且仅当$A$有$n$个线性无关的特征向量，它们构成$P$的各列（[[#thm-diagonalisation]]）。
- 属于不同特征值的特征向量线性无关；$n$个互不相同的特征值保证可对角化（[[#thm-distinct]]）。
- 一般地：可对角化当且仅当$p_A$分解为一次因式之积，且每个特征值的几何重数$=$代数重数（[[#thm-diag-criterion]]）；总有$1\le$几何重数$\le$代数重数。
- $A^k = PD^kP^{-1}$把矩阵的幂、递推关系和马尔可夫链化为标量问题；实矩阵的复特征值意味着旋转并伴随$\abs{\lambda}$倍的缩放。
:::

## 习题

::: exercise 一个2×2对称矩阵 {level=1 check="3"}
求$\begin{pmatrix}1&2\\2&1\end{pmatrix}$的特征值和特征向量。最大的特征值是多少？
::: solution
$p(\lambda) = \lambda^2 - 2\lambda - 3 = (\lambda - 3)(\lambda + 1)$。对$\lambda = 3$：$A - 3I = \begin{pmatrix}-2&2\\2&-2\end{pmatrix}$，特征向量为$(1, 1)$。对$\lambda = -1$：$A + I = \begin{pmatrix}2&2\\2&2\end{pmatrix}$，特征向量为$(1, -1)$。最大的特征值是$3$。（这两个特征向量互相垂直——这是对称矩阵的一个特点，将在[[linear-algebra/spectral-theorem]]中解释。）
:::
:::

::: exercise 检验候选值 {level=1}
$\lambda = 2$是$\begin{pmatrix}3&2\\3&8\end{pmatrix}$的特征值吗？如果是，求一个特征向量，并在不解二次方程的情况下求出另一个特征值。
::: solution
$A - 2I = \begin{pmatrix}1&2\\3&6\end{pmatrix}$的行列式为$6 - 6 = 0$，所以$2$是特征值；其零空间由$(-2, 1)$张成（验证：$A(-2,1) = (-4, 2)$）。由于特征值之和为$\tr A = 11$，另一个特征值是$9$（确实，$2\cdot 9 = 18 = \det A$）。
:::
:::

::: exercise 由特征值求行列式 {level=1 check="-8"}
某个$3\times 3$矩阵的特征值为$2$，$-1$和$4$。它的行列式是多少？迹是多少？
::: solution
由[[#prop-trace-det]]，$\det A = 2\cdot(-1)\cdot 4 = -8$，$\tr A = 2 - 1 + 4 = 5$。
:::
:::

::: exercise 高次幂 {level=2 check="2047"}
把$A = \begin{pmatrix}3&-2\\1&0\end{pmatrix}$对角化，并求$A^k$的公式。$A^{10}$的$(1,1)$元是多少？
::: solution
$p(\lambda) = \lambda^2 - 3\lambda + 2 = (\lambda - 1)(\lambda - 2)$。特征向量：对$\lambda = 1$，由$A - I = \begin{pmatrix}2&-2\\1&-1\end{pmatrix}$得$(1,1)$；对$\lambda = 2$，由$A - 2I = \begin{pmatrix}1&-2\\1&-2\end{pmatrix}$得$(2, 1)$。取$P = \begin{pmatrix}1&2\\1&1\end{pmatrix}$，$P^{-1} = \begin{pmatrix}-1&2\\1&-1\end{pmatrix}$：

$$
A^k = P\begin{pmatrix}1&0\\0&2^k\end{pmatrix}P^{-1} = \begin{pmatrix}1&2^{k+1}\\1&2^k\end{pmatrix}\begin{pmatrix}-1&2\\1&-1\end{pmatrix} = \begin{pmatrix}2^{k+1} - 1 & 2 - 2^{k+1}\\ 2^k - 1 & 2 - 2^k\end{pmatrix}.
$$

当$k = 1$时它回到$A$。$A^{10}$的$(1,1)$元是$2^{11} - 1 = 2047$。
:::
:::

::: exercise 长期比例 {level=2 check="5/6"}
一台机器每天要么正常运转，要么出故障。正常运转的机器第二天仍正常运转的概率为$0.9$；出故障的机器到第二天被修好的概率为$0.5$。记第$k$天的$\mathbf{x}_k = (\text{P(正常运转)}, \text{P(故障)})$，写出$\mathbf{x}_{k+1} = M\mathbf{x}_k$，并求机器长期处于正常运转状态的概率。
::: solution
$M = \begin{pmatrix}0.9&0.5\\0.1&0.5\end{pmatrix}$（第$j$列列出状态$j$转到各状态的概率）。稳态满足$(M - I)\mathbf{x} = \mathbf{0}$：$-0.1x_1 + 0.5x_2 = 0$，所以$x_1 = 5x_2$；用$x_1 + x_2 = 1$归一化，得$\mathbf{x} = (\tfrac56, \tfrac16)$。另一个特征值是$\tr M - 1 = 0.4$，且$\abs{0.4} < 1$，所以每个初始分布都收敛到这个稳态。长期处于正常运转状态的概率是$\tfrac56$。
:::
:::

::: exercise 含参数的矩阵 {level=2}
实数$k$取何值时，$\begin{pmatrix}1&k\\1&1\end{pmatrix}$在$\R$上可对角化？
::: solution
$p(\lambda) = (1 - \lambda)^2 - k$，其根为$\lambda = 1\pm\sqrt k$。若$k > 0$，则有两个互不相同的实特征值，所以由[[#cor-distinct]]，该矩阵可对角化。若$k < 0$，则特征值不是实数，所以它在$\R$上不可对角化（尽管在$\C$上可以）。若$k = 0$，矩阵为$\begin{pmatrix}1&0\\1&1\end{pmatrix}$，只有一个特征值$1$，其代数重数为$2$，但$A - I = \begin{pmatrix}0&0\\1&0\end{pmatrix}$的秩为$1$，所以特征空间是$1$维的，该矩阵不可对角化。答案：当且仅当$k > 0$。
:::
:::

::: exercise 八次幂为数量矩阵的矩阵 {level=2}
设$A = \begin{pmatrix}3&-5\\1&-1\end{pmatrix}$。求它的特征值，并证明$A^8 = 16I$。
::: solution
$p(\lambda) = \lambda^2 - 2\lambda + 2$，所以$\lambda = 1\pm i = \sqrt2\,e^{\pm i\pi/4}$。特征值互不相同，所以在$\C$上$A = PDP^{-1}$，其中$D = \diag(1 + i, 1 - i)$，从而$A^8 = PD^8P^{-1}$。而$(1\pm i)^8 = (\sqrt2)^8e^{\pm 2\pi i} = 16$，所以$D^8 = 16I$，$A^8 = P(16I)P^{-1} = 16I$。（直接计算：$A^2 = \begin{pmatrix}4&-10\\2&-4\end{pmatrix}$，$A^4 = (A^2)^2 = -4I$，所以$A^8 = 16I$。）
:::
:::

::: exercise 逆与幂 {level=2}
设$\mathbf{v}$是$A$的属于特征值$\lambda$的特征向量。证明：对每个$k\ge 1$，$\mathbf{v}$是$A^k$的特征向量（特征值为$\lambda^k$）；并且若$A$可逆，则$\lambda\neq 0$，且$\mathbf{v}$是$A^{-1}$的属于特征值$1/\lambda$的特征向量。
::: solution
由归纳法，$A^k\mathbf{v} = A(A^{k-1}\mathbf{v}) = A(\lambda^{k-1}\mathbf{v}) = \lambda^{k-1}A\mathbf{v} = \lambda^k\mathbf{v}$。若$A$可逆而$\lambda = 0$，则$A\mathbf{v} = \mathbf{0}$且$\mathbf{v}\neq\mathbf{0}$，与可逆性矛盾；所以$\lambda\neq 0$。对$A\mathbf{v} = \lambda\mathbf{v}$两边作用$A^{-1}$，得$\mathbf{v} = \lambda A^{-1}\mathbf{v}$，所以$A^{-1}\mathbf{v} = \lambda^{-1}\mathbf{v}$。
:::
:::

::: exercise AB 与 BA {level=3}
设$A$和$B$是$n\times n$矩阵。证明$AB$与$BA$有相同的特征值。
::: hint
分别处理$\lambda\neq 0$和$\lambda = 0$的情形。对$\lambda\neq 0$，若$AB\mathbf{v} = \lambda\mathbf{v}$，考察$B\mathbf{v}$。
:::
::: solution
设$\lambda\neq 0$是$AB$的特征值，$\mathbf{v}$是相应的特征向量。则$\mathbf{w} = B\mathbf{v}\neq\mathbf{0}$，否则$\lambda\mathbf{v} = AB\mathbf{v} = \mathbf{0}$。而$BA\mathbf{w} = B(AB\mathbf{v}) = \lambda B\mathbf{v} = \lambda\mathbf{w}$，所以$\lambda$是$BA$的特征值。由对称性，$BA$的每个非零特征值也是$AB$的特征值。最后，$0$是$AB$的特征值，当且仅当$\det(AB) = 0$，当且仅当$\det A\det B = 0$，当且仅当$\det(BA) = 0$，当且仅当$0$是$BA$的特征值。（事实上，$AB$与$BA$甚至有相同的特征多项式。）
:::
:::

::: exercise 投影可对角化 {level=3}
设$A$是满足$A^2 = A$的$n\times n$矩阵。证明$A$的每个特征值都是$0$或$1$，并且$A$可对角化。
::: hint
第二部分可利用[[linear-algebra/linear-maps#exr-projection]]中的分解$\F^n = \operatorname{Nul}(A)\oplus\operatorname{Col}(A)$。
:::
::: solution
若$A\mathbf{v} = \lambda\mathbf{v}$且$\mathbf{v}\neq\mathbf{0}$，则$\lambda\mathbf{v} = A\mathbf{v} = A^2\mathbf{v} = \lambda^2\mathbf{v}$，所以$\lambda^2 = \lambda$，$\lambda\in\{0, 1\}$。关于可对角化：每个$\mathbf{x}$都可分解为$\mathbf{x} = (\mathbf{x} - A\mathbf{x}) + A\mathbf{x}$，其中$A(\mathbf{x} - A\mathbf{x}) = \mathbf{0}$，$A(A\mathbf{x}) = A\mathbf{x}$；所以$\F^n = E_0 + E_1$，其中$E_0 = \operatorname{Nul}(A)$，$E_1 = \operatorname{Col}(A)$（$\operatorname{Col}(A)$中的每个向量都被$A$保持不动）。由[[#thm-distinct]]，这个和是直和，所以$E_0$的一组基与$E_1$的一组基合起来，就是$\F^n$的一组由特征向量构成的基。由[[#thm-diagonalisation]]，$A$可对角化，且$D$的对角线上有$\rank A$个$1$和$n - \rank A$个$0$。
:::
:::
