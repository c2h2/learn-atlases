到目前为止的一切——张成、基、维数、线性映射、特征值——都无需任何长度或角度的概念就有意义。但我们希望从向量中得到的东西，很多是几何性的。一个点离一个平面有多远？子空间中哪个向量最接近给定的向量？在$[-1, 1]$上用二次多项式逼近$e^x$，最佳的逼近是什么？这些问题都需要一种度量的方法，而在线性代数中，度量的工具就是**内积**——点积的抽象形式。

有了内积，就有了长度、角度，尤其是**正交性**。正交基是所有基中最好的：关于正交基的每个坐标只需计算一次内积，无需解方程组。本章发展内积空间的几何，证明柯西-施瓦茨（Cauchy–Schwarz）不等式，构造正交投影——它解决了最近点问题——并给出格拉姆-施密特（Gram–Schmidt）过程，它把任意一组基变成正交基，用矩阵形式表述则得到分解$A = QR$。

## 内积与范数

$\mathbf{u}, \mathbf{v}\in\R^n$的点积是$\mathbf{u}\cdot\mathbf{v} = \mathbf{u}\T\mathbf{v} = u_1v_1 + \dots + u_nv_n$。在$\R^2$和$\R^3$中，它通过$\mathbf{u}\cdot\mathbf{u} = \norm{\mathbf{u}}^2$（勾股定理）以及$\mathbf{u}\cdot\mathbf{v} = \norm{\mathbf{u}}\norm{\mathbf{v}}\cos\theta$（其中$\theta$是两向量的夹角；余弦定理）与几何联系起来。我们把它的三条基本性质保留下来作为公理。

::: definition 内积 {#def-inner-product}
实向量空间$V$上的**内积**是一个函数，它给每一对$u, v\in V$指定一个实数$\inner{u}{v}$，使得对所有$u, v, w\in V$和$a, b\in\R$有：

1. $\inner{u}{v} = \inner{v}{u}$（对称性）；
2. $\inner{au + bv}{w} = a\inner{u}{w} + b\inner{v}{w}$（对第一个变元的线性）；
3. 对每个$v\neq 0$有$\inner{v}{v} > 0$（正定性）。

带有内积的向量空间称为**内积空间**。$v$的**范数**（长度）是$\norm{v} = \sqrt{\inner{v}{v}}$，$u$与$v$之间的**距离**是$\norm{u - v}$。
:::

由对称性，内积对第二个变元也是线性的，且$\inner{0}{v} = 0$。对于**复**向量空间，对称性换成共轭对称性$\inner{u}{v} = \overline{\inner{v}{u}}$，从而$\inner{v}{v}$是实数；这时内积对第二个变元是共轭线性的。$\C^n$上的标准例子是$\inner{\mathbf{z}}{\mathbf{w}} = z_1\overline{w_1} + \dots + z_n\overline{w_n}$。（物理学家则把共轭放在第一个变元上。）我们集中讨论实的情形；下面的一切经过显而易见的修改后，对复空间也成立。

重要的例子有：

- $\R^n$上的**点积**$\inner{\mathbf{u}}{\mathbf{v}} = \mathbf{u}\T\mathbf{v}$。
- **加权**点积$\inner{\mathbf{u}}{\mathbf{v}} = w_1u_1v_1 + \dots + w_nu_nv_n$，其中所有权重$w_i > 0$；当某些测量比其他测量更可靠时使用。
- 在连续函数空间$C[a,b]$上，$\inner{f}{g} = \int_a^b f(x)g(x)\,dx$。正定性成立，因为若$f$连续且不恒为零，则$f^2 \ge 0$在某个区间上为正，所以$\int_a^b f^2\,dx > 0$。
- 在$M_{m\times n}(\R)$上，$\inner{A}{B} = \tr(A\T B) = \sum_{i,j}a_{ij}b_{ij}$——即把矩阵看作长向量时的点积。

若$\inner{u}{v} = 0$，则称两个向量**正交**，记作$u\perp v$。满足$\norm{u} = 1$的向量称为**单位向量**；任何非零向量$v$都可以**单位化**为单位向量$v/\norm{v}$，因为$\norm{cv} = \abs{c}\norm{v}$。

::: theorem 勾股定理 {#thm-pythagoras}
若$u\perp v$，则$\norm{u + v}^2 = \norm{u}^2 + \norm{v}^2$。
:::

::: proof
利用线性展开，$\norm{u + v}^2 = \inner{u + v}{u + v} = \inner{u}{u} + 2\inner{u}{v} + \inner{v}{v} = \norm{u}^2 + 0 + \norm{v}^2$。
:::

最简单的投影是把一个向量沿另一个向量分解。给定$v\neq 0$和任意$u$，令$c = \inner{u}{v}/\inner{v}{v}$。则$w = u - cv$满足$\inner{w}{v} = \inner{u}{v} - c\inner{v}{v} = 0$，所以

$$
u = cv + w, \qquad w\perp v, \qquad c = \frac{\inner{u}{v}}{\inner{v}{v}}.
$$ {#eq-decompose-line}

向量$cv$称为$u$在过$v$的直线上的**投影**。这个简单的分解可以证明线性代数中最重要的不等式。

::: theorem 柯西-施瓦茨不等式 {#thm-cauchy-schwarz}
对内积空间中的所有向量$u, v$，

$$
\abs{\inner{u}{v}}\le\norm{u}\,\norm{v},
$$

等号成立当且仅当$u$与$v$线性相关。
:::

::: proof
若$v = 0$，则两边都为$0$，且两向量线性相关。否则，按[[#eq-decompose-line]]分解$u = cv + w$。由勾股定理，

$$
\norm{u}^2 = \abs{c}^2\norm{v}^2 + \norm{w}^2\ge\abs{c}^2\norm{v}^2 = \frac{\inner{u}{v}^2}{\norm{v}^2}.
$$

两边乘以$\norm{v}^2$再开平方，即得不等式。等号成立当且仅当$w = 0$，即当且仅当$u = cv$是$v$的倍数。
:::

::: corollary 三角不等式 {#cor-triangle}
对所有$u, v$，$\norm{u + v}\le\norm{u} + \norm{v}$。
:::

::: proof
由柯西-施瓦茨不等式，$\norm{u + v}^2 = \norm{u}^2 + 2\inner{u}{v} + \norm{v}^2\le\norm{u}^2 + 2\norm{u}\norm{v} + \norm{v}^2 = (\norm{u} + \norm{v})^2$。
:::

柯西-施瓦茨不等式保证了对非零的$u, v$，$\inner{u}{v}/(\norm{u}\norm{v})$位于$[-1, 1]$中，所以我们可以用下式来**定义**它们之间的**夹角**$\theta\in[0,\pi]$：

$$
\cos\theta = \frac{\inner{u}{v}}{\norm{u}\,\norm{v}}.
$$

在$\R^2$和$\R^3$中，这就是熟悉的夹角；在其他空间中它是一个定义，而且是一个有用的定义。对不同的内积，柯西-施瓦茨不等式给出了一些看起来毫不相干的不等式：

$$
\Bigl(\sum_{i=1}^n u_iv_i\Bigr)^2\le\sum_{i=1}^n u_i^2\sum_{i=1}^n v_i^2, \qquad \Bigl(\int_a^b fg\,dx\Bigr)^2\le\int_a^b f^2\,dx\int_a^b g^2\,dx.
$$

::: example 两个空间中的夹角 {#ex-angles}
(a) 求$\R^4$中$\mathbf{u} = (1,1,1,1)$与$\mathbf{v} = (1,2,2,0)$的夹角。(b) 求$C[0,1]$中函数$1$与$x$的夹角。
::: solution
(a) $\mathbf{u}\cdot\mathbf{v} = 5$，$\norm{\mathbf{u}} = 2$，$\norm{\mathbf{v}} = 3$，所以$\cos\theta = \frac56$，$\theta = \arccos\frac56\approx 33.6^\circ$。

(b) $\inner{1}{x} = \int_0^1 x\,dx = \frac12$，$\norm{1}^2 = \int_0^1 1\,dx = 1$，$\norm{x}^2 = \int_0^1 x^2\,dx = \frac13$。所以$\cos\theta = \dfrac{1/2}{1\cdot 1/\sqrt3} = \dfrac{\sqrt3}{2}$，常值函数$1$与函数$x$的夹角为$30^\circ$。若换成$[-1, 1]$，则$\int_{-1}^1 x\,dx = 0$，两个函数正交：夹角依赖于内积。
:::
:::

## 正交组与正交矩阵

::: definition 正交组与标准正交组 {#def-orthonormal}
若对所有$i\neq j$都有$\inner{u_i}{u_j} = 0$，则称向量组$u_1, \dots, u_k$是**正交**的；若此外每个$u_i$都是单位向量，则称它是**标准正交**的。本身是正交向量组的基称为**正交基**；**标准正交基**的定义类似。
:::

::: theorem 正交坐标 {#thm-orthogonal-coords}
由非零向量构成的正交向量组线性无关。若$u_1, \dots, u_n$是$V$的正交基，则每个$v\in V$满足

$$
v = \frac{\inner{v}{u_1}}{\inner{u_1}{u_1}}u_1 + \dots + \frac{\inner{v}{u_n}}{\inner{u_n}{u_n}}u_n,
$$ {#eq-fourier-coeffs}

而对于标准正交基，就简单地有$v = \inner{v}{u_1}u_1 + \dots + \inner{v}{u_n}u_n$。
:::

::: proof
设$c_1u_1 + \dots + c_ku_k = 0$。与$u_j$作内积，除一项外其余各项都消失：$c_j\inner{u_j}{u_j} = 0$，而$\inner{u_j}{u_j} > 0$，所以$c_j = 0$。对于公式，写$v = \sum c_iu_i$，同样与$u_j$作内积：$\inner{v}{u_j} = c_j\inner{u_j}{u_j}$。
:::

与一般的基作个比较：在一般的基下，求坐标意味着解一个线性方程组。数$\inner{v}{u_i}$称为$v$的**傅里叶系数**，这个名称来自三角函数的情形（[[pde/fourier-series]]）。

::: example 正交基下的坐标 {#ex-orth-coords}
验证$\mathbf{u}_1 = (1,1,1)$，$\mathbf{u}_2 = (1,-1,0)$，$\mathbf{u}_3 = (1,1,-2)$构成$\R^3$的一组正交基，并用这组基表示$\mathbf{v} = (3, 1, -2)$。
::: solution
$\mathbf{u}_1\cdot\mathbf{u}_2 = 0$，$\mathbf{u}_1\cdot\mathbf{u}_3 = 1 + 1 - 2 = 0$，$\mathbf{u}_2\cdot\mathbf{u}_3 = 1 - 1 + 0 = 0$。三个非零的正交向量线性无关，从而构成$\R^3$的一组基。由[[#eq-fourier-coeffs]]，利用$\mathbf{v}\cdot\mathbf{u}_1 = 2$，$\mathbf{v}\cdot\mathbf{u}_2 = 2$，$\mathbf{v}\cdot\mathbf{u}_3 = 8$以及$\norm{\mathbf{u}_1}^2 = 3$，$\norm{\mathbf{u}_2}^2 = 2$，$\norm{\mathbf{u}_3}^2 = 6$，得

$$
\mathbf{v} = \tfrac23\mathbf{u}_1 + 1\,\mathbf{u}_2 + \tfrac43\mathbf{u}_3.
$$

*验证*：$\tfrac23(1,1,1) + (1,-1,0) + \tfrac43(1,1,-2) = (3, 1, -2)$。
:::
:::

::: quiz
下列向量中哪些与$(1, 2, -1)$正交？（选出所有正确的选项。）
- [x] $(1, 0, 1)$
- [x] $(2, -1, 0)$
- [ ] $(1, 1, 1)$
- [x] $(0, 1, 2)$
::: solution
计算它们与$(1,2,-1)$的点积：$1 + 0 - 1 = 0$；$2 - 2 + 0 = 0$；$1 + 2 - 1 = 2$；$0 + 2 - 2 = 0$。所以除$(1,1,1)$外都正交。这些正交的向量合起来充满平面$x + 2y - z = 0$，它是过$(1,2,-1)$的直线的正交补。
:::
:::

各列标准正交的方阵值得专门命名。

::: definition 正交矩阵 {#def-orthogonal-matrix}
若$n\times n$实矩阵$Q$满足$Q\T Q = I$，即它的各列构成$\R^n$的一组标准正交基，则称$Q$为**正交矩阵**。此时$Q^{-1} = Q\T$。
:::

（$Q\T Q$的元素是$Q$的各列之间的点积，所以$Q\T Q = I$恰好是说各列标准正交。由[[linear-algebra/matrices#cor-one-sided]]，$Q\T Q = I$已经蕴涵$QQ\T = I$，所以各行也标准正交。）旋转矩阵、反射矩阵和置换矩阵都是正交矩阵。**复**的类比是满足$\overline{U}\T U = I$的**酉**矩阵。

::: proposition 正交矩阵保持几何 {#prop-orthogonal}
对$n\times n$实矩阵$Q$，下列条件等价：(a) $Q$是正交矩阵；(b) 对所有$\mathbf{x}, \mathbf{y}$有$(Q\mathbf{x})\cdot(Q\mathbf{y}) = \mathbf{x}\cdot\mathbf{y}$；(c) 对所有$\mathbf{x}$有$\norm{Q\mathbf{x}} = \norm{\mathbf{x}}$。此外，正交矩阵满足$\det Q = \pm 1$。
:::

::: proof
(a)$\Rightarrow$(b)：$(Q\mathbf{x})\T(Q\mathbf{y}) = \mathbf{x}\T Q\T Q\mathbf{y} = \mathbf{x}\T\mathbf{y}$。(b)$\Rightarrow$(c)：取$\mathbf{y} = \mathbf{x}$。(c)$\Rightarrow$(a)：**极化恒等式**$\mathbf{x}\cdot\mathbf{y} = \frac14\bigl(\norm{\mathbf{x} + \mathbf{y}}^2 - \norm{\mathbf{x} - \mathbf{y}}^2\bigr)$用长度表示点积，所以(c)蕴涵(b)；而在(b)中取$\mathbf{x} = \mathbf{e}_i$，$\mathbf{y} = \mathbf{e}_j$，就说明各列$Q\mathbf{e}_i$标准正交。最后，$1 = \det I = \det(Q\T Q) = (\det Q)^2$。
:::

## 正交补与投影

::: definition 正交补 {#def-complement}
$V$的子空间$W$的**正交补**是$W^\perp = \set{v\in V : \inner{v}{w} = 0 \text{ 对所有 } w\in W}$。
:::

$W^\perp$是子空间（它对线性组合封闭，因为内积对第一个变元是线性的），并且$W\cap W^\perp = \{0\}$，因为同时属于两者的向量与自身正交。若$W = \Span(w_1, \dots, w_k)$，则由线性，只要对每个$i$都有$v\perp w_i$，就有$v\in W^\perp$。在$\R^3$中，过原点的平面的正交补是它的法线，反之亦然。对于矩阵，正交补揭示了四个基本子空间是如何相互配合的。

::: theorem 四个子空间两两成对正交 {#thm-fundamental}
对$m\times n$实矩阵$A$，

$$
\operatorname{Row}(A)^\perp = \operatorname{Nul}(A) \quad\text{位于 } \R^n, \qquad \operatorname{Col}(A)^\perp = \operatorname{Nul}(A\T) \quad\text{位于 } \R^m.
$$
:::

::: proof
$A\mathbf{x}$的第$i$个分量是$A$的第$i$行与$\mathbf{x}$的点积。所以$A\mathbf{x} = \mathbf{0}$当且仅当$\mathbf{x}$与每一行正交，当且仅当$\mathbf{x}$与各行张成的空间正交。这就是第一个结论；第二个结论就是把第一个结论应用于$A\T$，而$A\T$的各行就是$A$的各列。
:::

这解释了我们在[[linear-algebra/basis-dimension#ex-four]]中注意到的正交性，再结合[[linear-algebra/basis-dimension#thm-rank]]中的维数计数，就得到斯特朗（Strang）的图景：$\R^n$分解为互相垂直的子空间$\operatorname{Row}(A)$（维数为$r$）和$\operatorname{Nul}(A)$（维数为$n - r$），$\R^m$分解为$\operatorname{Col}(A)$和$\operatorname{Nul}(A\T)$。这种分解是下一个定理的特例，而该定理是本章的核心。

::: theorem 正交分解 {#thm-decomposition}
设$W$是内积空间$V$的有限维子空间，$u_1, \dots, u_k$是$W$的一组正交基。则每个$v\in V$都可以唯一地写成

$$
v = \hat{v} + z, \qquad \hat{v}\in W,\quad z\in W^\perp,
$$

而$\hat v$，即$v$在$W$上的**正交投影**，为

$$
\hat{v} = \proj_W v = \frac{\inner{v}{u_1}}{\inner{u_1}{u_1}}u_1 + \dots + \frac{\inner{v}{u_k}}{\inner{u_k}{u_k}}u_k.
$$ {#eq-projection}
:::

::: proof
用[[#eq-projection]]定义$\hat v$，并令$z = v - \hat v$。对每个$j$，$\inner{\hat v}{u_j}$展开后除一项外都为零，剩下$\inner{\hat v}{u_j} = \inner{v}{u_j}$；因此$\inner{z}{u_j} = 0$。$z$与$W$的每个基向量都正交，所以$z$属于$W^\perp$。至于唯一性，若$\hat v + z = \hat v' + z'$，其中$\hat v, \hat v'\in W$，$z, z'\in W^\perp$，则$\hat v - \hat v' = z' - z$属于$W\cap W^\perp = \{0\}$。
:::

（每个有限维子空间都有正交基——下面的格拉姆-施密特过程就能构造出一组——所以这种分解总是存在的。由于分解是唯一的，$\proj_W v$不依赖于所用的是哪一组正交基。）投影解决了最近点问题。

::: theorem 最佳逼近 {#thm-best-approx}
设$W$如[[#thm-decomposition]]所述，则$\proj_W v$是$W$中最接近$v$的点：对每个满足$w\neq\proj_W v$的$w\in W$，

$$
\norm{v - \proj_W v} < \norm{v - w}.
$$
:::

::: proof
写$v - w = (v - \hat v) + (\hat v - w)$。第一项属于$W^\perp$，第二项属于$W$，所以两者正交，由勾股定理得$\norm{v - w}^2 = \norm{v - \hat v}^2 + \norm{\hat v - w}^2 > \norm{v - \hat v}^2$，因为$\hat v - w\neq 0$。
:::

::: widget projection
u: 3,1
v: 1,2
mode: projection
caption: 拖动$\mathbf{v}$和$\mathbf{u}$。$\mathbf{v}$在过$\mathbf{u}$的直线上的投影$\hat{\mathbf{v}}$是从$\mathbf{v}$向该直线所作垂线的垂足，而剩余部分$\mathbf{v} - \hat{\mathbf{v}}$总是垂直于$\mathbf{u}$——这就是[[#eq-decompose-line]]。在直线上的所有点中，$\hat{\mathbf{v}}$离$\mathbf{v}$最近（[[#thm-best-approx]]）；$\mathbf{v}$到直线的距离就是垂直部分的长度。
:::

::: example 到平面上的投影 {#ex-proj-plane}
设$W = \Span(\mathbf{u}_1, \mathbf{u}_2)$，其中$\mathbf{u}_1 = (1,1,0)$，$\mathbf{u}_2 = (1,-1,1)$。求$W$中最接近$\mathbf{y} = (2,3,4)$的点，以及$\mathbf{y}$到$W$的距离。
::: solution
这组基是正交的：$\mathbf{u}_1\cdot\mathbf{u}_2 = 1 - 1 + 0 = 0$。利用$\mathbf{y}\cdot\mathbf{u}_1 = 5$，$\mathbf{y}\cdot\mathbf{u}_2 = 3$，$\norm{\mathbf{u}_1}^2 = 2$和$\norm{\mathbf{u}_2}^2 = 3$，由公式[[#eq-projection]]得

$$
\hat{\mathbf{y}} = \tfrac52(1,1,0) + 1\cdot(1,-1,1) = \left(\tfrac72, \tfrac32, 1\right).
$$

垂直部分为$\mathbf{z} = \mathbf{y} - \hat{\mathbf{y}} = \left(-\tfrac32, \tfrac32, 3\right)$；验证：$\mathbf{z}\cdot\mathbf{u}_1 = 0$，$\mathbf{z}\cdot\mathbf{u}_2 = -\tfrac32 - \tfrac32 + 3 = 0$。由[[#thm-best-approx]]，$\hat{\mathbf{y}}$就是最近点，距离为

$$
\norm{\mathbf{z}} = \sqrt{\tfrac94 + \tfrac94 + 9} = \sqrt{\tfrac{27}{2}} = \tfrac{3\sqrt6}{2}\approx 3.67.
$$
:::
:::

::: warning 投影公式需要正交基
公式[[#eq-projection]]仅当$u_1, \dots, u_k$两两正交时才成立。对$W = \Span\bigl((1,0), (1,1)\bigr) = \R^2$，把公式盲目地用于$v = (0, 1)$，得到$0\cdot(1,0) + \frac12(1,1) = (\frac12, \frac12)$，它不等于$v$——尽管$v$位于$W$中，因而它的投影就是它自身。对于非正交的基，要先正交化（格拉姆-施密特过程），或者解[[linear-algebra/least-squares]]中的正规方程。
:::

若$W$在$\R^n$中有**标准正交**基$\mathbf{q}_1, \dots, \mathbf{q}_k$，则公式变为$\proj_W\mathbf{v} = \sum(\mathbf{q}_i\T\mathbf{v})\mathbf{q}_i = QQ\T\mathbf{v}$，其中$Q = (\mathbf{q}_1\ \cdots\ \mathbf{q}_k)$。所以$QQ\T$是到$W$上的**投影矩阵**。注意$Q\T Q = I_k$总成立，但$QQ\T$仅当$k = n$时才是单位矩阵。

::: corollary 有限维空间中的正交补 {#cor-complement}
若$V$是有限维的，$W$是其子空间，则$V = W\oplus W^\perp$，$\dim W + \dim W^\perp = \dim V$，且$(W^\perp)^\perp = W$。
:::

::: proof
由[[#thm-decomposition]]（$W$的正交基由下一节给出），$V = W + W^\perp$，又$W\cap W^\perp = \{0\}$，所以这个和是直和，维数相加（[[linear-algebra/basis-dimension#thm-sum-dim]]）。显然$W\subseteq(W^\perp)^\perp$，而两次应用维数公式可知两者的维数都是$\dim V - \dim W^\perp = \dim W$，所以两者相等。
:::

## 格拉姆-施密特过程

每个有限维内积空间都有正交基，而且有一个简单的算法可以求出一组：从任意一组基出发，逐个取出其中的向量，从每个向量中减去它在前面各向量张成的空间上的投影。

::: algorithm 格拉姆-施密特过程 {#alg-gram-schmidt}
输入：线性无关的向量$x_1, \dots, x_k$。定义

$$
\begin{aligned}
v_1 &= x_1,\\
v_2 &= x_2 - \frac{\inner{x_2}{v_1}}{\inner{v_1}{v_1}}v_1,\\
&\;\;\vdots\\
v_j &= x_j - \frac{\inner{x_j}{v_1}}{\inner{v_1}{v_1}}v_1 - \dots - \frac{\inner{x_j}{v_{j-1}}}{\inner{v_{j-1}}{v_{j-1}}}v_{j-1}.
\end{aligned}
$$

输出：正交向量$v_1, \dots, v_k$；也可以再把它们单位化：$q_j = v_j/\norm{v_j}$。
:::

::: theorem 格拉姆-施密特过程的有效性 {#thm-gram-schmidt}
由[[#alg-gram-schmidt]]得到的向量$v_1, \dots, v_k$都非零且两两正交，并且对每个$j$有

$$
\Span(v_1, \dots, v_j) = \Span(x_1, \dots, x_j).
$$

因此，每个有限维内积空间都有标准正交基。
:::

::: proof
对$j$用归纳法。当$j = 1$时，$v_1 = x_1\neq 0$。设$v_1, \dots, v_{j-1}$非零、两两正交，且张成$W_{j-1} = \Span(x_1, \dots, x_{j-1})$。公式说的是$v_j = x_j - \proj_{W_{j-1}}x_j$，所以由[[#thm-decomposition]]，$v_j\in W_{j-1}^\perp$：它与$v_1, \dots, v_{j-1}$正交。它非零，因为由线性无关性$x_j\notin W_{j-1}$，而$\proj_{W_{j-1}}x_j\in W_{j-1}$。最后，$v_j$是$x_j$与$v_1, \dots, v_{j-1}$的线性组合，而$x_j$是$v_j$与$v_1, \dots, v_{j-1}$的线性组合；结合归纳假设，即得$\Span(v_1, \dots, v_j) = \Span(x_1, \dots, x_j)$。对任意一组基施行这一过程再单位化，就得到一组标准正交基。
:::

::: widget projection
u: 3,1
v: 1,2
mode: gram-schmidt
caption: 平面上的格拉姆-施密特过程。第一个基向量保持不变（至多改变长度）；从第二个基向量中减去它在第一个上的投影，剩下一个与第一个垂直的向量。单位化后得到张成同一平面的标准正交基。把$\mathbf{v}$拖到靠近$\mathbf{u}$所在直线的位置：垂直部分变得很短，在浮点运算中它的计算会不准确——这正是数值线性代数中采用“修正的”格拉姆-施密特方法和豪斯霍尔德（Householder）方法的原因。
:::

用矩阵形式表述，格拉姆-施密特过程就是一种分解。

::: theorem QR 分解 {#thm-qr}
设$A$是各列线性无关的$m\times n$实矩阵。则$A = QR$，其中$Q$是各列标准正交（构成$\operatorname{Col}(A)$的一组基）的$m\times n$矩阵，$R$是对角元为正的$n\times n$上三角矩阵。
:::

::: proof
对各列$\mathbf{a}_1, \dots, \mathbf{a}_n$施行格拉姆-施密特过程并单位化，得到$\mathbf{q}_1, \dots, \mathbf{q}_n$，令$Q$以它们为列。由[[#thm-gram-schmidt]]，$\mathbf{a}_j\in\Span(\mathbf{q}_1, \dots, \mathbf{q}_j)$，所以由[[#thm-orthogonal-coords]]，

$$
\mathbf{a}_j = r_{1j}\mathbf{q}_1 + \dots + r_{jj}\mathbf{q}_j, \qquad r_{ij} = \mathbf{q}_i\cdot\mathbf{a}_j,
$$

这就是说$A = QR$，其中$R = (r_{ij})$是上三角矩阵。此外，$r_{jj} = \mathbf{q}_j\cdot\mathbf{a}_j = \mathbf{q}_j\cdot\mathbf{v}_j = \norm{\mathbf{v}_j} > 0$，因为$\mathbf{a}_j - \mathbf{v}_j$位于前面那些$\mathbf{q}$张成的空间中，而该空间与$\mathbf{q}_j$正交。
:::

由于$Q\T Q = I$，三角因子就是$R = Q\T A$。

::: example 格拉姆-施密特过程与 QR 分解 {#ex-qr}
对$A = \begin{pmatrix}1&1&1\\1&2&4\\1&3&9\\1&4&16\end{pmatrix}$的各列（即函数$1, x, x^2$在$x = 1, 2, 3, 4$处的取样值）施行格拉姆-施密特过程，并求 QR 分解。
::: solution
$\mathbf{v}_1 = \mathbf{x}_1 = (1,1,1,1)$，$\norm{\mathbf{v}_1}^2 = 4$。

$\mathbf{x}_2\cdot\mathbf{v}_1 = 10$，所以$\mathbf{v}_2 = (1,2,3,4) - \tfrac{10}{4}(1,1,1,1) = \left(-\tfrac32, -\tfrac12, \tfrac12, \tfrac32\right)$。伸缩不影响正交性，所以可以改用$\mathbf{v}_2' = (-3,-1,1,3)$，$\norm{\mathbf{v}_2'}^2 = 20$。

$\mathbf{x}_3\cdot\mathbf{v}_1 = 1 + 4 + 9 + 16 = 30$，$\mathbf{x}_3\cdot\mathbf{v}_2' = -3 - 4 + 9 + 48 = 50$，所以

$$
\mathbf{v}_3 = (1,4,9,16) - \tfrac{30}{4}(1,1,1,1) - \tfrac{50}{20}(-3,-1,1,3) = (1, -1, -1, 1).
$$

验证：$\mathbf{v}_3\cdot\mathbf{v}_1 = 0$，$\mathbf{v}_3\cdot\mathbf{v}_2' = -3 + 1 - 1 + 3 = 0$。单位化，得

$$
Q = \begin{pmatrix}\tfrac12&-\tfrac{3}{2\sqrt5}&\tfrac12\\[5pt] \tfrac12&-\tfrac{1}{2\sqrt5}&-\tfrac12\\[5pt] \tfrac12&\tfrac{1}{2\sqrt5}&-\tfrac12\\[5pt] \tfrac12&\tfrac{3}{2\sqrt5}&\tfrac12\end{pmatrix}, \qquad R = Q\T A = \begin{pmatrix}2&5&15\\0&\sqrt5&5\sqrt5\\0&0&2\end{pmatrix}.
$$

（例如$r_{23} = \mathbf{q}_2\cdot\mathbf{x}_3 = 50/(2\sqrt5) = 5\sqrt5$。）列向量$(1,1,1,1)$，$(-3,-1,1,3)$，$(1,-1,-1,1)$是$0, 1, 2$次多项式的取值，这些多项式在点$1,2,3,4$上正交——在[[linear-algebra/least-squares]]中用曲线拟合数据时，它们将再次出现。
:::
:::

::: example 勒让德多项式与最佳逼近 {#ex-legendre}
在带有内积$\inner{f}{g} = \int_{-1}^1 fg\,dx$的$C[-1,1]$中，对$1, x, x^2$施行格拉姆-施密特过程，并求在这个内积意义下最接近$e^x$的二次多项式。
::: solution
$v_1 = 1$，$\inner{1}{1} = 2$。其次，$\inner{x}{1} = \int_{-1}^1 x\,dx = 0$，所以$v_2 = x$，$\inner{x}{x} = \frac23$。再次，$\inner{x^2}{1} = \frac23$，$\inner{x^2}{x} = 0$，所以

$$
v_3 = x^2 - \frac{2/3}{2}\cdot 1 - 0 = x^2 - \tfrac13, \qquad \inner{v_3}{v_3} = \int_{-1}^1\left(x^2 - \tfrac13\right)^2dx = \tfrac{8}{45}.
$$

不计伸缩，这些就是**勒让德多项式**$1$，$x$，$\frac12(3x^2 - 1)$。由[[#thm-best-approx]]，$e^x$的最佳二次逼近是它在$\Span(v_1, v_2, v_3)$上的投影，系数为$\inner{e^x}{v_i}/\inner{v_i}{v_i}$。用分部积分，$\int_{-1}^1 e^x\,dx = e - e^{-1}$，$\int_{-1}^1 xe^x\,dx = 2e^{-1}$，$\int_{-1}^1 x^2e^x\,dx = e - 5e^{-1}$，所以

$$
p(x) = \frac{e - e^{-1}}{2} + \frac{3}{e}\,x + \frac{15}{4}\left(e - \frac7e\right)\left(x^2 - \frac13\right)\approx 0.996 + 1.104x + 0.537x^2.
$$

它在$[-1,1]$上的均方根误差$\norm{e^x - p}/\sqrt2$约为$0.027$，而泰勒多项式$1 + x + \frac12x^2$——在$0$附近极好，但在$\pm1$附近较差——的误差约为它的$2.5$倍。投影把误差均匀地分摊到整个区间上。
:::
:::

::: widget plot
f: exp(x); sinh(1) + 3*x/e + 15/4*(e - 7/e)*(x^2 - 1/3); 1 + x + x^2/2
x: -1.2, 1.2
y: 0, 3.5
labels: e^x; \text{最佳 } L^2 \text{ 二次逼近}; \text{泰勒二次多项式}
caption: $e^x$（蓝色）及其两个二次逼近。泰勒多项式在$0$处与$e^x$完全吻合，但向$x = \pm1$逐渐偏离（在$x = 1$处误差为$0.22$）。[[#ex-legendre]]中的正交投影是积分意义下最接近的二次多项式；它在$[-1, 1]$上的误差始终不超过约$0.08$。将鼠标悬停在图上可比较数值。
:::

::: application 傅里叶级数与信号压缩
在$[-\pi, \pi]$上，对内积$\inner{f}{g} = \int_{-\pi}^{\pi}fg\,dx$，函数$1, \cos x, \sin x, \cos 2x, \sin 2x, \dots$两两正交。$f$的傅里叶级数的部分和，恰好是$f$在前若干个这些函数张成的空间上的正交投影，所以由[[#thm-best-approx]]，它们是在均方意义下用三角多项式对$f$的最佳逼近（[[pde/fourier-series]]）。同样的原理——在正交基下展开，保留大的系数——是 JPEG 图像压缩（使用余弦基）和 MP3 音频的基础。
:::

::: quiz
$W$是$\R^3$中过原点的平面，$P$是到$W$上的正交投影的矩阵。下列哪些命题成立？（选出所有正确的选项。）
- [x] $\dim W^\perp = 1$
- [x] $P^2 = P$
- [ ] $P$可逆
- [x] 对每个$\mathbf{v}\in W$有$P\mathbf{v} = \mathbf{v}$
::: solution
由$\dim W + \dim W^\perp = 3$得$\dim W^\perp = 1$（法线）。投影两次与投影一次相同，因为$W$中的向量的投影就是它自身；所以$P^2 = P$，且在$W$上$P\mathbf{v} = \mathbf{v}$。但$P$把法向量映到$\mathbf{0}$，所以它有非平凡的核，不可逆。
:::
:::

::: history
[[#thm-cauchy-schwarz]]中针对有限和的不等式出现在奥古斯丁-路易·柯西（Augustin-Louis Cauchy）的《分析教程》（*Cours d'analyse*，1821）中。维克托·布尼亚科夫斯基（Viktor Bunyakovsky）于1859年证明了积分形式的版本，赫尔曼·施瓦茨（Hermann Schwarz）则在19世纪80年代研究极小曲面时重新发现了它，这就是这个不等式在不同国家有不同名称的原因。这一正交化过程以两个人命名：一位是丹麦精算师约尔根·佩德森·格拉姆（Jørgen Pedersen Gram），他于1883年在用函数级数作最小二乘拟合时使用了它；另一位是艾哈德·施密特（Erhard Schmidt），他于1907年在研究积分方程时给出了它的现代形式。皮埃尔-西蒙·拉普拉斯（Pierre-Simon Laplace）早已用过这一方法。20世纪初，大卫·希尔伯特（David Hilbert）及其学派研究了由函数和数列构成的无穷维内积空间；20世纪20年代后期，约翰·冯·诺伊曼（John von Neumann）给出了抽象希尔伯特空间的公理，作为量子力学的数学框架。
:::

## 后续内容

正交投影是[[linear-algebra/least-squares]]的关键：在那里，不相容方程组$A\mathbf{x} = \mathbf{b}$通过把$\mathbf{b}$投影到$\operatorname{Col}(A)$上来求解，而 QR 分解提供了数值上可靠的方法。满足$\inner{A\mathbf{x}}{\mathbf{y}} = \inner{\mathbf{x}}{A\mathbf{y}}$的对称矩阵有由特征向量构成的标准正交基（[[linear-algebra/spectral-theorem]]），而奇异值分解（[[linear-algebra/svd]]）能为任意矩阵找到与之相适应的标准正交基。无穷维内积空间是傅里叶分析（[[pde/fourier-series]]，[[pde/sturm-liouville]]）、[[measure-theory/lp-spaces]]中的$L^2$空间以及量子力学的基础；由内积定义的范数是[[real-analysis/metric-spaces]]中度量的例子。

::: summary
- 内积是对称的、对每个变元线性的、正定的；它定义了范数$\norm{v} = \sqrt{\inner{v}{v}}$、距离和夹角。例子：点积、加权点积、$\int_a^b fg\,dx$、$\tr(A\T B)$。
- 柯西-施瓦茨不等式$\abs{\inner{u}{v}}\le\norm{u}\norm{v}$（[[#thm-cauchy-schwarz]]）给出三角不等式，并使夹角是良定义的。
- 两两正交的非零向量线性无关，正交基下的坐标为$\inner{v}{u_i}/\inner{u_i}{u_i}$（[[#thm-orthogonal-coords]]）。
- 正交矩阵（$Q\T Q = I$）保持长度和夹角，且$\det Q = \pm1$。
- $\operatorname{Row}(A)^\perp = \operatorname{Nul}(A)$，$\operatorname{Col}(A)^\perp = \operatorname{Nul}(A\T)$（[[#thm-fundamental]]）。
- 每个$v$都可唯一地分解为$\proj_W v + z$，其中$z\perp W$，且$\proj_W v$是$W$中最接近$v$的点（[[#thm-decomposition]]，[[#thm-best-approx]]）。
- 格拉姆-施密特过程把任意一组基变成一组正交基，且逐级张成的子空间不变（[[#thm-gram-schmidt]]）；用矩阵形式表述即$A = QR$（[[#thm-qr]]）。
:::

## 习题

::: exercise 四维空间中的夹角 {level=1 check="5/6"}
设$\theta$是$(1,1,1,1)$与$(1,2,2,0)$的夹角，求$\cos\theta$，并对这两个向量验证柯西-施瓦茨不等式。
::: solution
点积为$5$，长度分别为$2$和$3$，所以$\cos\theta = \frac56$。柯西-施瓦茨不等式说$5\le 2\cdot 3 = 6$，这确实成立，而且是严格不等式，因为两向量不平行。
:::
:::

::: exercise 到直线的距离 {level=1 check="sqrt(2)/2"}
求点$(2, 3)$到过原点、方向为$(1,1)$的直线的距离。
::: solution
$\mathbf{v} = (2,3)$在$\mathbf{u} = (1,1)$上的投影是$\frac{5}{2}(1,1)$，垂直部分是$(2,3) - (\frac52,\frac52) = (-\frac12, \frac12)$。距离就是它的长度$\sqrt{\frac14 + \frac14} = \frac{\sqrt2}{2}$。
:::
:::

::: exercise 一个正交矩阵 {level=1 check="-1"}
证明$Q = \frac13\begin{pmatrix}1&2&2\\2&1&-2\\2&-2&1\end{pmatrix}$是正交矩阵，并求$\det Q$。
::: solution
每一列的长度都是$\frac13\sqrt{1 + 4 + 4} = 1$，不同列之间的点积为$\frac19(2 + 2 - 4) = 0$，$\frac19(2 - 4 + 2) = 0$，$\frac19(4 - 2 - 2) = 0$。所以$Q\T Q = I$，$\det Q = \pm1$。展开得$\det(3Q) = 1(1 - 4) - 2(2 + 4) + 2(-4 - 2) = -3 - 12 - 12 = -27$，从而$\det Q = -27/27 = -1$。所以$Q$反转定向：事实上，它是关于与$(1, -1, -1)$垂直的平面的反射。
:::
:::

::: exercise 标准正交化 {level=2}
求$W = \Span\bigl((1,2,2), (3,0,3)\bigr)$的一组标准正交基以及$W^\perp$的一组基。
::: solution
格拉姆-施密特过程：$\mathbf{v}_1 = (1,2,2)$，$\norm{\mathbf{v}_1}^2 = 9$；$(3,0,3)\cdot\mathbf{v}_1 = 9$，所以$\mathbf{v}_2 = (3,0,3) - (1,2,2) = (2,-2,1)$。两者的长度都是$3$，所以$\frac13(1,2,2)$，$\frac13(2,-2,1)$是$W$的一组标准正交基。正交补是一条直线；$\mathbf{n} = (a, b, c)$必须满足$a + 2b + 2c = 0$和$2a - 2b + c = 0$，由此得$\mathbf{n} = (2, 1, -2)$（即这两个向量的叉积除以$3$）。所以$W^\perp = \Span\bigl((2,1,-2)\bigr)$。
:::
:::

::: exercise 四维空间中的正交补 {level=2}
对$W = \Span\bigl((1,0,1,0), (0,1,1,1)\bigr)\subseteq\R^4$，求$W^\perp$的一组基，并验证$\dim W + \dim W^\perp = 4$。
::: solution
$\mathbf{x}\in W^\perp$当且仅当$x_1 + x_3 = 0$且$x_2 + x_3 + x_4 = 0$，即$\mathbf{x}\in\operatorname{Nul}\begin{pmatrix}1&0&1&0\\0&1&1&1\end{pmatrix}$（这就是[[#thm-fundamental]]）。取$x_3, x_4$为自由变量：$x_1 = -x_3$，$x_2 = -x_3 - x_4$，得基$(-1,-1,1,0)$，$(0,-1,0,1)$。维数：$2 + 2 = 4$。
:::
:::

::: exercise 到平面的距离 {level=2 check="5/3"}
求点$(1,1,1)$到平面$x + 2y + 2z = 0$的距离。
::: solution
该平面是$W = \mathbf{n}^\perp$，其中$\mathbf{n} = (1,2,2)$。$\mathbf{y} = (1,1,1)$垂直于$W$的分量就是它在$\mathbf{n}$上的投影，即$\frac{\mathbf{y}\cdot\mathbf{n}}{\mathbf{n}\cdot\mathbf{n}}\mathbf{n} = \frac59\mathbf{n}$，距离就是它的长度$\frac59\cdot 3 = \frac53$。
:::
:::

::: exercise 最佳线性逼近 {level=2 check="-1/6"}
在带有内积$\inner{f}{g} = \int_0^1 fg\,dx$的$C[0,1]$中，求最接近$x^2$的函数$a + bx$。常数项$a$是多少？
::: hint
先使$1, x$正交：用$x - c$代替$x$，其中$c$是适当的常数。
:::
::: solution
$\inner{x - c}{1} = \frac12 - c$，所以$1$与$x - \frac12$正交。而$\inner{x^2}{1} = \frac13$，$\inner{1}{1} = 1$，$\inner{x^2}{x - \frac12} = \frac14 - \frac16 = \frac1{12}$，$\inner{x - \frac12}{x - \frac12} = \int_0^1(x - \frac12)^2dx = \frac1{12}$。投影为

$$
\tfrac13\cdot 1 + \frac{1/12}{1/12}\left(x - \tfrac12\right) = x - \tfrac16.
$$

所以最佳逼近是$x - \frac16$，$a = -\frac16$（且$b = 1$）。
:::
:::

::: exercise 平行四边形法则 {level=3}
证明在任何内积空间中都有$\norm{u + v}^2 + \norm{u - v}^2 = 2\norm{u}^2 + 2\norm{v}^2$，并就平行四边形解释其含义。证明$\R^2$上的范数$\norm{(x,y)}_1 = \abs{x} + \abs{y}$不来自任何内积。
::: solution
展开得$\norm{u\pm v}^2 = \norm{u}^2\pm 2\inner{u}{v} + \norm{v}^2$；两式相加，中间项相互抵消。几何上：平行四边形两条对角线的平方和等于四条边的平方和。对$\norm{\cdot}_1$，取$u = (1,0)$，$v = (0,1)$：$\norm{u + v}_1^2 + \norm{u - v}_1^2 = 4 + 4 = 8$，但$2\norm{u}_1^2 + 2\norm{v}_1^2 = 4$。由于每个由内积定义的范数都满足这一法则，$\norm{\cdot}_1$不是这样的范数。
:::
:::

::: exercise 正交矩阵的特征值 {level=3}
设$Q$是实正交矩阵，$\lambda\in\C$是$Q$的特征值（相应的特征向量可能是复的）。证明$\abs{\lambda} = 1$。
::: solution
设$Q\mathbf{z} = \lambda\mathbf{z}$，其中$\mathbf{z}\in\C^n$，$\mathbf{z}\neq\mathbf{0}$，并使用复内积$\inner{\mathbf{z}}{\mathbf{w}} = \overline{\mathbf{w}}\T\mathbf{z}$。由于$Q$是实矩阵，$\overline{Q\mathbf{z}}\T Q\mathbf{z} = \overline{\mathbf{z}}\T Q\T Q\mathbf{z} = \overline{\mathbf{z}}\T\mathbf{z}$，即$\norm{Q\mathbf{z}} = \norm{\mathbf{z}}$。而$\norm{Q\mathbf{z}} = \norm{\lambda\mathbf{z}} = \abs{\lambda}\norm{\mathbf{z}}$。两边除以$\norm{\mathbf{z}}\neq 0$，得$\abs{\lambda} = 1$。（对于平面上转角为$\theta$的旋转，特征值为$e^{\pm i\theta}$。）
:::
:::

::: exercise 贝塞尔不等式 {level=3}
设$e_1, \dots, e_k$是内积空间$V$中的标准正交向量组。证明对每个$v\in V$有

$$
\sum_{i=1}^k\inner{v}{e_i}^2\le\norm{v}^2,
$$

等号成立当且仅当$v\in\Span(e_1, \dots, e_k)$。
::: solution
令$W = \Span(e_1, \dots, e_k)$。由[[#thm-decomposition]]，$v = \hat v + z$，其中$\hat v = \sum\inner{v}{e_i}e_i$，$z\perp W$。由勾股定理（对两两正交的各部分反复应用），$\norm{\hat v}^2 = \sum\inner{v}{e_i}^2$，且$\norm{v}^2 = \norm{\hat v}^2 + \norm{z}^2\ge\norm{\hat v}^2$。等号成立当且仅当$z = 0$，即当且仅当$v = \hat v\in W$。（对于三角函数这样的无穷标准正交族，令$k\to\infty$可知，$f$的傅里叶系数的平方构成一个收敛级数。）
:::
:::
