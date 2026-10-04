$\R^3$中过原点的平面可以由两个向量张成。它也可以由三个或四个向量张成，但那时其中有些向量是多余的；而它永远不能由一个向量张成。数字二是平面本身的性质，与我们碰巧选取的向量无关——它就是平面的**维数**。要把这一点说清楚，需要一个真正的定理：在任何向量空间中，每个**极小的**张成组（即**基**）都具有相同的长度。一旦证明了这个定理，基就把每个向量变成一组坐标，每个有限维空间都成为$\F^n$的一个副本，我们也就能够计数了：解空间的维数、列空间的维数、子空间之交的维数。

本章证明维数的不变性及其主要推论，然后把它们应用于线性方程组的矩阵$A$。在那里，计数变得非常具体——$A$的**秩**，即主元的个数，决定了与$A$相关联的全部四个子空间的维数——并且它一劳永逸地解释了我们在高斯消元法中看到的那些规律。

## 基与坐标

::: definition 基 {#def-basis}
向量空间$V$的**基**是指$V$中一个线性无关且张成$V$的向量组$v_1, \dots, v_n$。
:::

标准的例子如下：

- $\F^n$的**标准基**$\mathbf{e}_1, \dots, \mathbf{e}_n$：由于$(x_1, \dots, x_n) = x_1\mathbf{e}_1 + \dots + x_n\mathbf{e}_n$，这个向量组张成$\F^n$，并且只有当每个$x_j = 0$时这个组合才是$\mathbf{0}$。
- 单项式$1, x, x^2, \dots, x^n$构成$\mathcal{P}_n(\F)$的一组基：每个次数不超过$n$的多项式都是它们的组合，而一个多项式只有在所有系数都为零时才是零多项式。
- 在$(i,j)$位置为$1$、其余位置为$0$的矩阵$E_{ij}$构成$M_{m\times n}(\F)$的一组基。
- 向量$(1,1)$和$(1,-1)$构成$\R^2$的一组基；更一般地，任何可逆$n\times n$矩阵的各列构成$\F^n$的一组基：由[[linear-algebra/matrices#thm-imt]]，它们线性无关（只有$\mathbf{x} = \mathbf{0}$时才有$A\mathbf{x} = \mathbf{0}$），并且张成$\F^n$（对每个$\mathbf{b}$，$A\mathbf{x} = \mathbf{b}$都有解）。

基恰好就是这样一个向量组：它能表示每一个向量，而且没有冗余。

::: theorem 坐标 {#thm-coordinates}
$V$中的向量组$v_1, \dots, v_n$是基，当且仅当每个$v\in V$都能以唯一一种方式写成

$$
v = a_1v_1 + a_2v_2 + \dots + a_nv_n \qquad (a_1, \dots, a_n\in\F).
$$
:::

::: proof
“每个$v$都至少能以一种方式写出”意味着这个向量组张成$V$；而由[[linear-algebra/vector-spaces#prop-unique-coeffs]]，“至多能以一种方式写出”等价于线性无关。
:::

这些唯一确定的数$a_1, \dots, a_n$称为$v$关于基$\mathcal{B} = (v_1, \dots, v_n)$的**坐标**，而列

$$
[v]_{\mathcal{B}} = \begin{pmatrix}a_1\\ \vdots\\ a_n\end{pmatrix}\in\F^n
$$

称为$v$的**坐标向量**。基向量的次序是重要的，这就是为什么基是一个**有序的向量组**，而不是一个集合。坐标与运算相容：若$v = \sum a_jv_j$，$w = \sum b_jv_j$，则$v + w = \sum(a_j + b_j)v_j$，$cv = \sum (ca_j)v_j$，所以

$$
[v + w]_{\mathcal{B}} = [v]_{\mathcal{B}} + [w]_{\mathcal{B}}, \qquad [cv]_{\mathcal{B}} = c\,[v]_{\mathcal{B}}.
$$ {#eq-coord-linear}

因此，基把关于$V$的任何问题转化为关于$\F^n$中列向量的问题——而消元法可以回答这类问题。

::: example 多项式的坐标 {#ex-coords}
证明$\mathcal{B} = \bigl(1,\ 1 + x,\ (1 + x)^2\bigr)$是$\mathcal{P}_2(\R)$的一组基，并求$p(x) = 3 + 2x + x^2$的坐标向量。
::: solution
记$t = 1 + x$。每个关于$x$的次数不超过$2$的多项式都是关于$t$的次数不超过$2$的多项式（代入$x = t - 1$并展开），而且这个关于$t$的多项式是唯一的，因为$1, t, t^2$线性无关。所以每个$p$都能唯一地写成组合$a_1 + a_2t + a_3t^2$，由[[#thm-coordinates]]，$\mathcal{B}$是一组基。

对给定的$p$，代入$x = t - 1$：

$$
3 + 2(t - 1) + (t - 1)^2 = 3 + 2t - 2 + t^2 - 2t + 1 = 2 + t^2.
$$

所以$p(x) = 2\cdot 1 + 0\cdot(1 + x) + 1\cdot(1+x)^2$，$[p]_{\mathcal{B}} = (2, 0, 1)$。**验证：**$2 + (1 + 2x + x^2) = 3 + 2x + x^2$。（这些正是$p$在$x = -1$处的泰勒系数——见[[calculus-2/taylor-series]]。）
:::
:::

基何时存在？如果$V$可以由某个有限的向量组张成，就称$V$是**有限维的**。在我们的例子中，除了$\mathcal{P}(\F)$和无限集上的函数空间之外，都是有限维的。

::: theorem 每个张成组都包含一组基 {#thm-reduce}
若$v_1, \dots, v_k$张成$V$，则$v_1, \dots, v_k$的某个子组是$V$的一组基。特别地，每个有限维向量空间都有基。
:::

::: proof
如果这个向量组线性无关，它已经是一组基。否则，由线性相关性引理（[[linear-algebra/vector-spaces#lem-dependence]]），某个$v_j$属于它前面那些向量的张成空间，去掉它就得到一个更短的、张成空间仍为$V$的向量组。重复这一步骤。向量组每次都变短，所以这个过程会终止，而且它只能终止于一个线性无关的张成组——即一组基。（如果所有向量都被去掉，那么$V = \{0\}$，空组就是它的基。）
:::

## 维数

问题的核心是比较线性无关组与张成组。

::: theorem 交换引理 {#thm-exchange}
设$V$是向量空间。若$u_1, \dots, u_m$在$V$中线性无关，$w_1, \dots, w_n$张成$V$，则$m\le n$。
:::

::: proof
我们把各个$u$逐个放进张成组，每放进一个就扔掉一个$w$，同时保持它仍是张成组。

**第1步。**由于$w_1, \dots, w_n$张成$V$，向量$u_1$是它们的组合，所以向量组$u_1, w_1, \dots, w_n$线性相关。由线性相关性引理，这个向量组中的某个向量属于它前面那些向量的张成空间，去掉它不改变张成空间。这个向量不是$u_1$，因为$u_1\neq 0$（线性无关组不含零向量）。所以它是某个$w$。去掉它之后，剩下的是由$u_1$和$n - 1$个$w$组成的张成组。

**第$k$步**（$2 \le k\le m$）。设第$k-1$步之后，我们得到一个张成组，它由$u_1, \dots, u_{k-1}$以及其后的$n - (k-1)$个$w$组成。把$u_k$插在$u_{k-1}$之后。新的向量组线性相关，因为$u_k$属于原向量组的张成空间。由线性相关性引理，新向量组中的某个向量属于它前面那些向量的张成空间。它不可能是$u_1, \dots, u_k$中的某一个，因为这些向量线性无关，所以没有哪个$u_j$属于$u_1, \dots, u_{j-1}$的张成空间。所以它是某个$w$，去掉它之后，剩下的是由$u_1, \dots, u_k$和$n - k$个$w$组成的张成组。

在$m$步中的每一步，都有一个$w$可供去掉。因此$w$至少有$m$个：$m\le n$。
:::

::: corollary 维数的不变性 {#cor-invariance}
有限维向量空间的任意两组基的长度相同。
:::

::: proof
设$v_1, \dots, v_m$和$w_1, \dots, w_n$都是基。第一个向量组线性无关，第二个张成整个空间，所以由[[#thm-exchange]]，$m\le n$。交换二者的角色，得$n\le m$。
:::

::: definition 维数 {#def-dimension}
有限维向量空间$V$的**维数**$\dim V$是$V$的任意一组基的长度。不是有限维的向量空间称为**无穷维的**。
:::

由标准基可知：$\dim\F^n = n$，$\dim\mathcal{P}_n(\F) = n + 1$，$\dim M_{m\times n}(\F) = mn$，$\dim\{0\} = 0$。维数依赖于域：$\C$作为复向量空间的维数是$1$（基：$1$），作为实向量空间的维数却是$2$（基：$1, i$）。全体多项式构成的空间$\mathcal{P}(\F)$是无穷维的：如果有限个多项式张成了它，设$d$是它们次数中的最大者，那么$x^{d+1}$就不在它们的张成空间中。

::: theorem 已知维数的空间中的基 {#thm-dim-facts}
设$V$是有限维的，$\dim V = n$。

1. $V$中的每个线性无关组都可以扩充为$V$的一组基；特别地，它的长度至多为$n$。
2. $V$中恰含$n$个向量的向量组，只要线性无关就是一组基；只要张成$V$，也是一组基。
3. $V$的每个子空间$U$都是有限维的，且$\dim U\le n$；并且只有当$U = V$时才有$\dim U = n$。
:::

::: proof
1. 设$u_1, \dots, u_k$线性无关。由[[#thm-exchange]]（以$V$的一组基作为张成组），$V$中每个线性无关组的长度都至多为$n$。若$u_1, \dots, u_k$不张成$V$，选取不在它们张成空间中的$v\in V$；那么$u_1, \dots, u_k, v$仍然线性无关：在关系式$a_1u_1 + \dots + a_ku_k + bv = 0$中必有$b = 0$（否则$v$将属于各$u_i$的张成空间），从而由各$u_i$的线性无关性，所有$a_i = 0$。重复这一步骤。由于线性无关组的长度至多为$n$，这个过程会终止，而且只有当向量组张成$V$时才会终止：这时它就是一组基。
2. 若这$n$个向量线性无关，由第1部分可把它们扩充为一组基；基的长度是$n$，所以没有添加任何向量。若它们张成$V$，由[[#thm-reduce]]可把它们缩减为一组基；基的长度是$n$，所以没有去掉任何向量。
3. 在$U$内部从空组出发执行第1部分的过程：只要当前的线性无关组不张成$U$，就添加一个不在其张成空间中的$U$中向量。这些向量组在$V$中线性无关，所以这个过程至多经过$n$步就会终止，并得到$U$的一组基；因此$\dim U\le n$。若$\dim U = n$，则$U$的一组基是$V$中由$n$个向量组成的线性无关组，因而由第2部分，它是$V$的一组基，所以$U = V$。
:::

::: quiz
$V$是维数为$4$的向量空间。下列哪些说法正确？（选出所有正确的选项。）
- [x] $V$中任意$5$个向量都线性相关。
- [ ] $V$中任意$3$个向量都线性无关。
- [x] $V$中任意$4$个线性无关的向量都张成$V$。
- [ ] 存在由$3$个向量组成的张成$V$的向量组。
::: solution
$V$的基是长度为$4$的张成组，所以由[[#thm-exchange]]，线性无关组的长度至多为$4$：五个向量必线性相关。由[[#thm-dim-facts]]的第2部分，四个线性无关的向量构成一组基，所以它们张成$V$。三个向量可能线性相关（例如其中一个是$0$），而且它们永远不能张成$V$，因为长度为$3$的张成组将迫使线性无关组的长度至多为$3$。
:::
:::

第3部分按维数对子空间进行了分类。$\R^2$的子空间的维数为$0$、$1$或$2$：它们是$\{\mathbf{0}\}$、过原点的直线（一个非零向量的张成空间）以及$\R^2$。同样，$\R^3$的子空间是$\{\mathbf{0}\}$、过原点的直线和平面，以及$\R^3$。

::: example 扩充为基 {#ex-extend}
把线性无关组$\mathbf{u}_1 = (1, 0, 1, 0)$，$\mathbf{u}_2 = (0, 1, 0, 1)$扩充为$\R^4$的一组基。
::: solution
标准基张成$\R^4$，所以$\mathbf{u}_1, \mathbf{u}_2, \mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3, \mathbf{e}_4$张成$\R^4$，由[[#thm-reduce]]，它的某个子组是一组基。对以这六个向量为列的矩阵作行化简；它的主元列将构成列空间的一组基（这就是下面的[[#thm-four-bases]]；由于$\mathbf{u}_1, \mathbf{u}_2$线性无关，主元列包括前两列）：

$$
\begin{pmatrix}1&0&1&0&0&0\\0&1&0&1&0&0\\1&0&0&0&1&0\\0&1&0&0&0&1\end{pmatrix}
\xrightarrow[R_4 - R_2]{R_3 - R_1}
\begin{pmatrix}1&0&1&0&0&0\\0&1&0&1&0&0\\0&0&-1&0&1&0\\0&0&0&-1&0&1\end{pmatrix}.
$$

这已经是阶梯形，主元位于第$1, 2, 3, 4$列。所以$\mathbf{u}_1, \mathbf{u}_2, \mathbf{e}_1, \mathbf{e}_2$是$\R^4$的一组基。（由[[#thm-dim-facts]]的第2部分，只需验证这四个向量线性无关也就够了。）
:::
:::

::: quiz
全体$3\times 3$实对称矩阵构成的空间的维数是多少？
- [ ] $3$
- [ ] $5$
- [x] $6$
- [ ] $9$
::: solution
$3\times 3$对称矩阵由它在对角线上及对角线上方的元素决定：$3$个对角元和对角线上方的$3$个元素，它们都可以自由选取。一组基是$E_{11}, E_{22}, E_{33}, E_{12} + E_{21}, E_{13} + E_{31}, E_{23} + E_{32}$，所以维数是$6$。一般地，$n\times n$对称矩阵构成一个维数为$n(n+1)/2$的空间。
:::
:::

维数还决定了子空间如何相交。

::: theorem 和的维数 {#thm-sum-dim}
若$U$和$W$是有限维向量空间的子空间，则

$$
\dim(U + W) = \dim U + \dim W - \dim(U\cap W).
$$
:::

::: proof
设$z_1, \dots, z_k$是$U\cap W$的一组基。由[[#thm-dim-facts]]，它可以扩充为$U$的一组基$z_1,\dots,z_k, u_1, \dots, u_p$，也可以扩充为$W$的一组基$z_1, \dots, z_k, w_1, \dots, w_q$。我们断言$z_1, \dots, z_k, u_1, \dots, u_p, w_1, \dots, w_q$是$U + W$的一组基；这样就有$\dim(U + W) = k + p + q = (k + p) + (k + q) - k$，即为所求。

这个向量组张成$U + W$，因为$U + W$的每个元素$u + w$都是$U$和$W$的基向量的组合。为证线性无关，设

$$
\textstyle\sum_i a_iz_i + \sum_j b_ju_j + \sum_l c_lw_l = 0.
$$

那么$\sum_l c_lw_l = -\sum_i a_iz_i - \sum_j b_ju_j$既属于$W$（看左边）又属于$U$（看右边），从而属于$U\cap W$，因此对某些标量$d_i$有$\sum_l c_lw_l = \sum_i d_iz_i$。由于$z_1, \dots, z_k, w_1, \dots, w_q$线性无关，所有$c_l$（以及$d_i$）都为零。于是原来的关系式变为$\sum a_iz_i + \sum b_ju_j = 0$，由$U$的基的线性无关性得$a_i = b_j = 0$。
:::

例如，$\R^3$中两个不同的过原点平面$U, W$满足$U + W = \R^3$（真包含一个平面的子空间的维数是$3$），所以$\dim(U\cap W) = 2 + 2 - 3 = 1$：两个不同的过原点平面交于一条直线——这是你在几何中熟知的一个事实的线性代数证明。

## 矩阵的四个基本子空间

设$A$是元素属于$\F$的$m\times n$矩阵。与它相关联的有四个子空间：

| 子空间 | 定义 | 所在空间 |
|---|---|---|
| 列空间$\operatorname{Col}(A)$ | 各列的张成空间$=\set{A\mathbf{x}}$ | $\F^m$ |
| 零空间$\operatorname{Nul}(A)$ | $A\mathbf{x} = \mathbf{0}$的解 | $\F^n$ |
| 行空间$\operatorname{Row}(A)$ | 各行的张成空间$= \operatorname{Col}(A\T)$ | $\F^n$ |
| 左零空间$\operatorname{Nul}(A\T)$ | $A\T\mathbf{y} = \mathbf{0}$的解 | $\F^m$ |

（斯特朗（Strang）把它们记作$C(A)$、$N(A)$、$C(A\T)$和$N(A\T)$。）列空间回答了$A\mathbf{x} = \mathbf{b}$的存在性问题——解存在当且仅当$\mathbf{b}\in\operatorname{Col}(A)$——而零空间回答了唯一性问题，因为由[[linear-algebra/linear-systems#thm-structure]]，解集是$\operatorname{Nul}(A)$的一个平移。这四个子空间都可以从一次消元中读出来。

::: theorem 基本子空间的基 {#thm-four-bases}
设$R$是$A$的简化行阶梯形。

1. **$A$的主元列**（原来的列，而不是$R$的列）构成$\operatorname{Col}(A)$的一组基。
2. $R$的非零行构成$\operatorname{Row}(A)$的一组基。
3. 对每个自由变量$x_f$，设$\mathbf{s}_f$是$A\mathbf{x} = \mathbf{0}$的满足$x_f = 1$、其余自由变量都为$0$的解（称为**特殊解**）。这些特殊解构成$\operatorname{Nul}(A)$的一组基。
:::

::: proof
1. 行变换不改变齐次方程组的解（[[linear-algebra/linear-systems#thm-row-ops]]），所以$A\mathbf{x} = \mathbf{0}$当且仅当$R\mathbf{x} = \mathbf{0}$。由于$A\mathbf{x} = \sum x_j\mathbf{a}_j$，这就是说：**$A$的各列与$R$的各列满足完全相同的线性关系。**在$R$中，主元列是互不相同的标准基向量$\mathbf{e}_1, \dots, \mathbf{e}_r$，因而线性无关；而$R$的每个非主元列在第$r$行以下都是零，所以它是$\mathbf{e}_1, \dots, \mathbf{e}_r$的组合。这两个事实都是关于列之间线性关系的命题，所以它们可以转移到$A$上：$A$的主元列线性无关，并且$A$的其他每一列都是它们的组合。因此$A$的主元列张成$\operatorname{Col}(A)$，并构成一组基。
2. 每个初等行变换都把各行换成原来各行的组合，所以它不会扩大行空间；而它又是可逆的，所以也不会缩小行空间。因此$\operatorname{Row}(A) = \operatorname{Row}(R)$，它由$R$的非零行张成。这些非零行线性无关：每一行在自己的主元列中有一个$1$，而$R$的其他各行在该列中都是$0$，所以在任何等于零的组合中，每一行的系数都必须是$0$。
3. 由[[linear-algebra/linear-systems#thm-exist-unique]]，$A\mathbf{x} = \mathbf{0}$的解由它的自由变量的值决定，而自由变量取值为$(t_f)$的解就是$\sum_f t_f\mathbf{s}_f$（两者都是方程组的解，并且自由变量的值相同）。所以特殊解张成$\operatorname{Nul}(A)$。它们线性无关，因为在自由变量$x_f$对应的坐标上，向量$\mathbf{s}_f$是$1$，而其他每个特殊解都是$0$。
:::

::: warning 要取 A 的列，而不是 R 的列
行变换会改变列空间：$\begin{pmatrix}1&2\\2&4\end{pmatrix}$的列空间由$(1,2)$张成，但它的简化行阶梯形$\begin{pmatrix}1&2\\0&0\end{pmatrix}$的列空间由$(1, 0)$张成。简化行阶梯形告诉你**哪些**列是主元列；$\operatorname{Col}(A)$的基由原矩阵中相应的列组成。对于行空间则恰好相反：$R$的非零行是一组基，而$A$中处于相同位置的行却未必是（对换行可能使它们移动位置）。
:::

数一数[[#thm-four-bases]]中基向量的个数，就得到各个维数。

::: definition 秩与零化度 {#def-rank}
矩阵的**秩**是$\rank A = \dim\operatorname{Col}(A)$，它的**零化度**是$\dim\operatorname{Nul}(A)$。
:::

::: theorem 秩定理 {#thm-rank}
设$A$是有$r$个主元的$m\times n$矩阵。那么

$$
\dim\operatorname{Col}(A) = \dim\operatorname{Row}(A) = r, \qquad \dim\operatorname{Nul}(A) = n - r, \qquad \dim\operatorname{Nul}(A\T) = m - r.
$$

特别地，**行秩等于列秩**，$\rank A = \rank A\T$，并且

$$
\rank A + \dim\operatorname{Nul}(A) = n.
$$ {#eq-rank-nullity}
:::

::: proof
由[[#thm-four-bases]]，$\operatorname{Col}(A)$有一组由$r$个主元列组成的基，$\operatorname{Row}(A)$有一组由$R$的$r$个非零行组成的基（每个主元位于不同的非零行中，并且每个非零行都含有一个主元），而$\operatorname{Nul}(A)$有一组基，其中$n - r$个自由变量各对应一个特殊解。由于$\operatorname{Col}(A\T) = \operatorname{Row}(A)$，矩阵$A\T$的秩为$r$；它有$m$列，所以对$A\T$应用$\dim\operatorname{Nul} = (\text{列数}) - \text{秩}$，得$\dim\operatorname{Nul}(A\T) = m - r$。
:::

列秩等于行秩，这一点远非显然：对一个$3\times 100$矩阵，它是说$\R^3$中$100$个列向量的张成空间与$\R^{100}$中$3$个行向量的张成空间维数相同。恒等式[[#eq-rank-nullity]]是**秩-零化度定理**的矩阵形式，[[linear-algebra/linear-maps]]将对任意线性映射证明这个定理。

::: example 全部四个子空间 {#ex-four}
求下列矩阵的四个基本子空间的基与维数：

$$
A = \begin{pmatrix}1&2&0&1\\2&4&1&3\\3&6&1&4\end{pmatrix}.
$$
::: solution
作行化简：

$$
A \xrightarrow[R_3 - 3R_1]{R_2 - 2R_1} \begin{pmatrix}1&2&0&1\\0&0&1&1\\0&0&1&1\end{pmatrix} \xrightarrow{R_3 - R_2} \begin{pmatrix}1&2&0&1\\0&0&1&1\\0&0&0&0\end{pmatrix} = R.
$$

主元列是第$1$列和第$3$列，所以$r = 2$。

- $\operatorname{Col}(A)$：基为$(1,2,3)$，$(0,1,1)$——即**$A$的**第1列和第3列。维数为$2$：$\R^3$中的一个平面。
- $\operatorname{Row}(A)$：基为$(1,2,0,1)$，$(0,0,1,1)$——即$R$的非零行。维数为$2$。
- $\operatorname{Nul}(A)$：$x_2, x_4$是自由变量，$R\mathbf{x} = \mathbf{0}$给出$x_1 = -2x_2 - x_4$，$x_3 = -x_4$。特殊解为$(-2, 1, 0, 0)$（取$x_2 = 1$，$x_4 = 0$）和$(-1, 0, -1, 1)$（取$x_2 = 0$，$x_4 = 1$）。维数为$4 - 2 = 2$。
- $\operatorname{Nul}(A\T)$：维数为$3 - 2 = 1$。由于$A$的第3行是第1行与第2行之和，关系式$(\text{行 }1) + (\text{行 }2) - (\text{行 }3) = \mathbf{0}$说明$A\T(1, 1, -1) = \mathbf{0}$；所以$(1, 1, -1)$是一组基。

注意其中的两个正交关系：$\operatorname{Row}(A)$的每个基向量与$\operatorname{Nul}(A)$的每个基向量的点积都是$0$（例如$(1,2,0,1)\cdot(-1,0,-1,1) = -1 + 0 + 0 + 1 = 0$），而$(1,1,-1)$与$\operatorname{Col}(A)$的两个基向量都垂直。这并非偶然：$A\mathbf{x} = \mathbf{0}$恰好是说$\mathbf{x}$与$A$的每一行都垂直。完整的故事将在[[linear-algebra/inner-products]]中讲述。
:::
:::

::: widget rowreduce
matrix: 1,2,0,1; 2,4,1,3; 3,6,1,4
augmented: false
caption: [[#ex-four]]背后的消元过程。主元落在第1列和第3列，所以秩为$2$。从最终的矩阵可以读出四个基本子空间中的三个：$\operatorname{Col}(A)$取**原**矩阵的主元列，$\operatorname{Row}(A)$取非零行，$\operatorname{Nul}(A)$则对每个自由列（$x_2$和$x_4$）取一个特殊解。
:::

::: widget transform2d
matrix: 1,2; 2,4
vector: 2,-1
caption: 平面上的一个秩为一的映射。每个向量都落在直线$\operatorname{Col}(A) = \Span\bigl((1,2)\bigr)$上，所以网格塌缩成一条直线。高亮显示的向量$(2,-1)$张成$\operatorname{Nul}(A)$，它被映到$\mathbf{0}$。把它拖离那条直线，它的像就沿着列空间移动。这里$\rank A + \dim\operatorname{Nul}(A) = 1 + 1 = 2$。
:::

::: quiz
$A$是秩为$3$的$5\times 7$矩阵。下列哪些说法正确？（选出所有正确的选项。）
- [x] $\dim\operatorname{Nul}(A) = 4$
- [x] $\dim\operatorname{Nul}(A\T) = 2$
- [ ] $\operatorname{Col}(A) = \R^5$
- [x] $\dim\operatorname{Row}(A) = 3$
::: solution
由[[#thm-rank]]，取$m = 5$，$n = 7$，$r = 3$：$\dim\operatorname{Nul}(A) = 7 - 3 = 4$，$\dim\operatorname{Nul}(A\T) = 5 - 3 = 2$，$\dim\operatorname{Row}(A) = 3$。列空间是$\R^5$的$3$维子空间，所以它不是整个$\R^5$：某些方程组$A\mathbf{x} = \mathbf{b}$是不相容的。
:::
:::

对方阵而言，秩为可逆矩阵定理又增添了四个条件。

::: corollary 可逆矩阵定理（续） {#cor-imt-rank}
对$n\times n$矩阵$A$，下列条件都与[[linear-algebra/matrices#thm-imt]]中的条件等价：(a) $A$的各列构成$\F^n$的一组基；(b) $\rank A = n$；(c) $\dim\operatorname{Nul}(A) = 0$；(d) $A$的各行线性无关。
:::

::: proof
$A$可逆当且仅当它有$n$个主元，即$\rank A = n$，这就是(b)。由[[#eq-rank-nullity]]，(b)与(c)等价。由[[#thm-dim-facts]]，$\F^n$中的$n$个列向量构成一组基当且仅当它们张成$\F^n$，即当且仅当$\operatorname{Col}(A) = \F^n$，也即当且仅当$\rank A = n$：所以(a)与(b)等价。最后，各行是张成$\operatorname{Row}(A)$的$n$个向量，而$\operatorname{Row}(A)$的维数是$\rank A$；它们线性无关当且仅当它们构成$\operatorname{Row}(A)$的一组基，也即当且仅当$\rank A = n$。
:::

::: example 检验多项式组是否为基 {#ex-poly-basis}
$1 + x,\ 1 - x + x^2,\ 2 + x^2$是$\mathcal{P}_2(\R)$的一组基吗？
::: solution
使用关于标准基$1, x, x^2$的坐标：这三个多项式的坐标向量分别为$(1,1,0)$、$(1,-1,1)$、$(2,0,1)$。由[[#eq-coord-linear]]，多项式之间的线性关系与它们的坐标向量之间的线性关系是一回事。作行化简：

$$
\begin{pmatrix}1&1&2\\1&-1&0\\0&1&1\end{pmatrix}\xrightarrow{R_2 - R_1}\begin{pmatrix}1&1&2\\0&-2&-2\\0&1&1\end{pmatrix}\xrightarrow{R_3 + \frac12R_2}\begin{pmatrix}1&1&2\\0&-2&-2\\0&0&0\end{pmatrix}.
$$

只有两个主元：这些向量线性相关，所以它们**不是**一组基。解出相关关系得$(1 + x) + (1 - x + x^2) - (2 + x^2) = 0$，你可以直接验证这一点。它们的张成空间只有$2$维。
:::
:::

::: history
这些术语来自不同的时代。赫尔曼·格拉斯曼（Hermann Grassmann）早在1844年就已运用线性无关和维数的概念，朱塞佩·皮亚诺（Giuseppe Peano）1888年的公理中也包含了维数的定义——线性无关元素的最大个数。矩阵的“秩”（*rank*）这一术语由费迪南德·格奥尔格·弗罗贝尼乌斯（Ferdinand Georg Frobenius）于1879年引入，詹姆斯·约瑟夫·西尔维斯特（James Joseph Sylvester）则在1884年创造了“零化度”（*nullity*）一词。[[#thm-exchange]]中的交换论证传统上以恩斯特·施泰尼茨（Ernst Steinitz，1913年）的名字命名。围绕四个子空间$\operatorname{Col}(A)$、$\operatorname{Nul}(A)$、$\operatorname{Row}(A)$和$\operatorname{Nul}(A\T)$来组织整个理论的做法，由吉尔伯特·斯特朗（Gilbert Strang）推广开来，特别是通过他1993年发表在《美国数学月刊》（*American Mathematical Monthly*）上的文章《线性代数基本定理》（“The fundamental theorem of linear algebra”）。
:::

## 后续内容

维数计数是数学中最有力的工具之一。在[[linear-algebra/linear-maps]]中，秩定理将成为线性映射的秩-零化度定理，而坐标则成为用矩阵表示每个线性映射的桥梁。在[[linear-algebra/inner-products]]中我们将看到，$\operatorname{Row}(A)$与$\operatorname{Nul}(A)$是$\F^n$中互为正交补的子空间，$\operatorname{Col}(A)$与$\operatorname{Nul}(A\T)$在$\F^m$中也是如此；而在[[linear-algebra/svd]]中，奇异值分解同时为全部四个子空间提供了特别好的基。维数论证还能证明$n$阶线性微分方程的解空间是$n$维的（[[ode/second-order-linear]]），并推动了域扩张理论的发展（[[abstract-algebra/fields-galois]]），在那里扩张的次数就是一个维数。

::: summary
- 基是线性无关的张成组；等价地说，每个向量关于它都有唯一的坐标（[[#thm-coordinates]]）。坐标把一个有长度为$n$的基的空间变成$\F^n$。
- 每个张成组都可以缩减为一组基，每个线性无关组都可以扩充为一组基。
- 在任何向量空间中，线性无关组的长度都不会超过张成组的长度（[[#thm-exchange]]）；因此所有的基都有相同的长度，即维数。
- 在$n$维空间中，$n$个向量只要线性无关**或者**张成整个空间，就构成一组基；子空间的维数至多为$n$。
- $\dim(U + W) = \dim U + \dim W - \dim(U\cap W)$（[[#thm-sum-dim]]）。
- 由简化行阶梯形：$A$的主元列是$\operatorname{Col}(A)$的一组基，$R$的非零行是$\operatorname{Row}(A)$的一组基，特殊解是$\operatorname{Nul}(A)$的一组基（[[#thm-four-bases]]）。
- 若$A$是秩为$r$的$m\times n$矩阵，则$\dim\operatorname{Col}A = \dim\operatorname{Row}A = r$，$\dim\operatorname{Nul}A = n - r$，$\dim\operatorname{Nul}A\T = m - r$（[[#thm-rank]]）。
:::

## 习题

::: exercise 解空间的维数 {level=1 check="2"}
求子空间$\set{(x, y, z, w)\in\R^4 : x + y - z = 0,\ y + w = 0}$的一组基。它的维数是多少？
::: solution
系数矩阵$\begin{pmatrix}1&1&-1&0\\0&1&0&1\end{pmatrix}$已是阶梯形；作$R_1\to R_1 - R_2$得到简化行阶梯形$\begin{pmatrix}1&0&-1&-1\\0&1&0&1\end{pmatrix}$。自由变量是$z, w$，且$x = z + w$，$y = -w$。特殊解$(1, 0, 1, 0)$（取$z = 1, w = 0$）和$(1, -1, 0, 1)$（取$z = 0$，$w = 1$）构成一组基，所以维数是$2 = 4 - 2$。
:::
:::

::: exercise 平面上的坐标 {level=1}
证明$\mathcal{B} = \bigl((1,1), (1,-1)\bigr)$是$\R^2$的一组基，并对$\mathbf{v} = (3, 1)$以及一般的$\mathbf{v} = (x, y)$求$[\mathbf{v}]_{\mathcal{B}}$。
::: solution
$\R^2$中两个互不成倍数的向量线性无关，因而由[[#thm-dim-facts]]，它们是一组基。解$a(1,1) + b(1,-1) = (x,y)$得$a + b = x$，$a - b = y$，所以$a = \frac{x + y}{2}$，$b = \frac{x - y}{2}$。对$(3, 1)$：$[\mathbf{v}]_{\mathcal{B}} = (2, 1)$；验证：$2(1,1) + (1, -1) = (3, 1)$。
:::
:::

::: exercise 有两个根的多项式 {level=1 check="3"}
子空间$U = \set{p\in\mathcal{P}_4(\R) : p(1) = p(-1) = 0}$的维数是多少？给出一组基。
::: solution
每个$p\in U$都能被$(x - 1)(x + 1) = x^2 - 1$整除，所以$p = (x^2 - 1)q$，其中$q\in\mathcal{P}_2(\R)$；反之，每个这样的乘积都属于$U$。由于$1, x, x^2$是$\mathcal{P}_2$的一组基，多项式$x^2 - 1$、$x(x^2-1)$、$x^2(x^2-1)$张成$U$，并且它们线性无关（它们的次数$2, 3, 4$互不相同，所以任何非平凡组合都不可能为零——看最高次项即可）。所以$\dim U = 3$。另一种方法：映射$p\mapsto(p(1), p(-1))$的秩为$2$，由秩-零化度定理（[[linear-algebra/linear-maps]]），维数为$5 - 2 = 3$。
:::
:::

::: exercise 多项式空间的一组基 {level=2}
证明$1 + x$、$x + x^2$、$1 + x^2$是$\mathcal{P}_2(\R)$的一组基，并求$2 + 2x + 2x^2$关于这组基的坐标。
::: solution
它们关于$1, x, x^2$的坐标向量分别是$(1,1,0)$、$(0,1,1)$、$(1,0,1)$。对以这些向量为列的矩阵作行化简：

$$
\begin{pmatrix}1&0&1\\1&1&0\\0&1&1\end{pmatrix}\xrightarrow{R_2 - R_1}\begin{pmatrix}1&0&1\\0&1&-1\\0&1&1\end{pmatrix}\xrightarrow{R_3 - R_2}\begin{pmatrix}1&0&1\\0&1&-1\\0&0&2\end{pmatrix}.
$$

有三个主元，所以这三个多项式线性无关，而由[[#thm-dim-facts]]，$3$维空间$\mathcal{P}_2$中三个线性无关的向量构成一组基。由于$(1 + x) + (x + x^2) + (1 + x^2) = 2 + 2x + 2x^2$，坐标是$(1, 1, 1)$。
:::
:::

::: exercise 四个子空间 {level=2}
求$B = \begin{pmatrix}1&3&1\\2&6&3\\-1&-3&1\end{pmatrix}$的四个基本子空间的基，并验证[[#thm-rank]]。
::: solution
$R_2 - 2R_1$得到$(0,0,1)$，$R_3 + R_1$得到$(0,0,2)$；再作$R_3 - 2R_2$和$R_1 - R_2$，得$R = \begin{pmatrix}1&3&0\\0&0&1\\0&0&0\end{pmatrix}$。主元列是第$1, 3$列，所以$r = 2$。
$\operatorname{Col}(B)$：$(1, 2, -1)$，$(1, 3, 1)$。$\operatorname{Row}(B)$：$(1, 3, 0)$，$(0, 0, 1)$。$\operatorname{Nul}(B)$：$x_2$是自由变量，$x_1 = -3x_2$，$x_3 = 0$：基为$(-3, 1, 0)$。$\operatorname{Nul}(B\T)$：解$B\T\mathbf{y} = \mathbf{0}$，即$y_1 + 2y_2 - y_3 = 0$，$3y_1 + 6y_2 - 3y_3 = 0$，$y_1 + 3y_2 + y_3 = 0$；第三个方程减去第一个方程得$y_2 + 2y_3 = 0$，所以$y_3 = t$，$y_2 = -2t$，$y_1 = 5t$：基为$(5, -2, 1)$。维数依次为$2, 2, 1, 1$，与$r = 2$，$n - r = 1$，$m - r = 1$相符。验证：$5(1,3,1) - 2(2,6,3) + (-1,-3,1) = (0,0,0)$。
:::
:::

::: exercise 相交的子空间 {level=2 check="1"}
在$\R^4$中，设$U = \Span\bigl((1,0,0,1), (0,1,0,1)\bigr)$，$W = \Span\bigl((1,1,0,2), (0,0,1,0)\bigr)$。求$\dim(U + W)$和$\dim(U\cap W)$，并描述$U\cap W$。
::: solution
两对张成向量都线性无关，所以$\dim U = \dim W = 2$。由于$(1,1,0,2) = (1,0,0,1) + (0,1,0,1)\in U$，空间$U + W$由$(1,0,0,1), (0,1,0,1), (0,0,1,0)$张成，而它们线性无关（看第1、2、3个坐标）；所以$\dim(U + W) = 3$。由[[#thm-sum-dim]]，$\dim(U\cap W) = 2 + 2 - 3 = 1$。向量$(1,1,0,2)$同时属于两者，所以$U\cap W = \Span\bigl((1,1,0,2)\bigr)$。
:::
:::

::: exercise 乘积的秩 {level=3}
设$A$是$m\times n$矩阵，$B$是$n\times p$矩阵。证明$\rank(AB)\le\rank A$且$\rank(AB)\le\rank B$。
::: hint
对于第一个不等式，比较列空间；对于第二个，比较零空间并利用[[#eq-rank-nullity]]。
:::
::: solution
$AB$的每一列都是$A\mathbf{b}_j\in\operatorname{Col}(A)$，所以$\operatorname{Col}(AB)\subseteq\operatorname{Col}(A)$，从而由[[#thm-dim-facts]]，$\rank(AB)\le\rank A$。其次，若$B\mathbf{x} = \mathbf{0}$，则$AB\mathbf{x} = \mathbf{0}$，所以$\operatorname{Nul}(B)\subseteq\operatorname{Nul}(AB)$，$\dim\operatorname{Nul}(B)\le\dim\operatorname{Nul}(AB)$。$B$和$AB$都有$p$列，所以由[[#eq-rank-nullity]]，

$$
\rank(AB) = p - \dim\operatorname{Nul}(AB) \le p - \dim\operatorname{Nul}(B) = \rank B.
$$

（另一种方法：由第一部分，$\rank(AB) = \rank\bigl((AB)\T\bigr) = \rank(B\T A\T)\le\rank B\T = \rank B$。）
:::
:::

::: exercise 子空间必然相交 {level=3}
设$U$和$W$是$\R^7$的$4$维子空间。证明$U\cap W$含有非零向量。更一般地，证明：在$n$维空间中，只要$p + q > n$，维数为$p$和$q$的两个子空间就有非平凡的交。
::: solution
$U + W$是这个$n$维空间的子空间，所以由[[#thm-dim-facts]]，$\dim(U + W)\le n$。由[[#thm-sum-dim]]，

$$
\dim(U\cap W) = p + q - \dim(U + W)\ge p + q - n > 0,
$$

所以$U\cap W\neq\{0\}$。取$p = q = 4$，$n = 7$，就得到$\dim(U\cap W)\ge 1$。
:::
:::

::: exercise 每个子空间都有补空间 {level=3}
设$U$是有限维空间$V$的子空间。证明存在子空间$W$，使得$V = U\oplus W$。$W$是唯一的吗？
::: solution
选取$U$的一组基$u_1, \dots, u_k$，并把它扩充为$V$的一组基$u_1, \dots, u_k, w_1, \dots, w_l$（[[#thm-dim-facts]]）。令$W = \Span(w_1, \dots, w_l)$。每个$v\in V$都是整组基的组合，因而具有$u + w$的形式，所以$U + W = V$。若$v\in U\cap W$，记$v = \sum a_iu_i = \sum b_jw_j$；则$\sum a_iu_i - \sum b_jw_j = 0$，由基的线性无关性，所有系数都为零，所以$v = 0$。由[[linear-algebra/vector-spaces#prop-direct-sum]]，$V = U\oplus W$。补空间不是唯一的：在$\R^2$中取$U$为$x$轴，则除$U$以外的**每一条**过原点直线都是它的补空间。
:::
:::

::: exercise 函数空间的基 {level=3}
设$V = \Span(\cos^2 x, \sin^2 x, \cos 2x, 1)$，它是$\mathcal{F}(\R, \R)$的子空间。求$\dim V$和一组基。
::: solution
恒等式$\cos^2x + \sin^2 x = 1$和$\cos^2 x - \sin^2 x = \cos 2x$表明$1$和$\cos 2x$属于$\Span(\cos^2 x, \sin^2 x)$，所以由[[linear-algebra/vector-spaces#lem-dependence]]，$V = \Span(\cos^2 x, \sin^2x)$。这两个函数线性无关：若对所有$x$有$a\cos^2 x + b\sin^2 x = 0$，则令$x = 0$得$a = 0$，令$x = \pi/2$得$b = 0$。所以$\dim V = 2$，一组基为$\cos^2 x, \sin^2 x$（另一组基是$1, \cos 2x$）。
:::
:::
