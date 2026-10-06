求导把多项式$5 - x + 4x^2 + 2x^3$变成$-1 + 8x + 6x^2$。旋转把平面上的一个向量变成另一个向量。转置把一个矩阵变成一个矩阵，而在$x = 3$处求值则把一个多项式变成一个数。这些都不是用矩阵去乘一个列向量，但它们都具有使矩阵与向量的乘法如此易于处理的两条性质：它们保持加法和数乘。和的导数等于导数的和；把$2\mathbf{v}$旋转，得到的是$\mathbf{v}$旋转结果的两倍。

具有这两条性质的函数称为**线性映射**，它们才是线性代数真正的研究对象——向量空间不过是它们发挥作用的舞台。本章介绍线性映射的两个关键子空间——**核**与**像**，并证明在两者之间建立平衡的**秩-零化度定理**。接着我们证明：一旦选定了基，有限维空间之间的每个线性映射**就是**一个矩阵；我们还要弄清楚基改变时矩阵会怎样变化。最后这个问题引出**相似**矩阵的概念，它贯穿本课程的其余部分。

## 线性映射

::: definition 线性映射 {#def-linear-map}
设$V$和$W$是同一个域$\F$上的向量空间。函数$T\colon V\to W$称为**线性映射**（或**线性变换**），如果对所有$u, v\in V$和$a\in\F$都有

$$
T(u + v) = T(u) + T(v) \qquad\text{且}\qquad T(av) = a\,T(v).
$$

从$V$到其自身的线性映射称为$V$上的**线性算子**。从$V$到$W$的全体线性映射构成的集合记为$\mathcal{L}(V, W)$。
:::

我们常把$T(v)$写成$Tv$。有两个推论会经常用到。取$a = 0$，得$T(0) = T(0\cdot 0) = 0\cdot T(0) = 0$：**线性映射把$0$映到$0$**。另外，对项数用归纳法可得

$$
T(a_1v_1 + \dots + a_kv_k) = a_1T(v_1) + \dots + a_kT(v_k):
$$ {#eq-preserve-comb}

线性映射把线性组合映成具有相同系数的线性组合。下面是一些基本的例子。

- **矩阵映射。**对$m\times n$矩阵$A$，由[[linear-algebra/linear-systems#eq-linear]]，映射$T_A\colon\F^n\to\F^m$，$T_A(\mathbf{x}) = A\mathbf{x}$是线性的。
- **求导**$D\colon\mathcal{P}_n(\R)\to\mathcal{P}_{n}(\R)$，$Dp = p'$，以及**积分**$p\mapsto\int_0^x p(t)\,dt$；由微积分中的和法则与常数倍法则知它们是线性的。
- **转置**$M_{m\times n}(\F)\to M_{n\times m}(\F)$，**迹**$M_n(\F)\to\F$，以及**求值**$\mathcal{P}_n(\F)\to\F$，$p\mapsto p(3)$。
- **零映射**$v\mapsto 0$与**恒等映射**$\id_V\colon v\mapsto v$。
- 平面上绕原点的旋转、关于过原点的直线的反射，以及到这类直线上的投影（见下文）。

反例同样富有启发性：当$\mathbf{b}\neq\mathbf{0}$时，**平移**$\mathbf{x}\mapsto\mathbf{x} + \mathbf{b}$不是线性的，因为它移动了原点；$\R$上的$x\mapsto x^2$（因为$(2x)^2 \neq 2x^2$）和$\R^2$上的$(x, y)\mapsto xy$也都不是线性的。

::: example 验证线性 {#ex-check-linear}
证明$T\colon\mathcal{P}_2(\R)\to\R^2$，$T(p) = \bigl(p(0), p'(1)\bigr)$是线性的，而$S\colon\R^2\to\R^2$，$S(x,y) = (x + y, xy)$不是线性的。
::: solution
对多项式$p, q$和标量$a$，由法则$(p + q)(0) = p(0) + q(0)$与$(p + q)' = p' + q'$得

$$
T(p + q) = \bigl(p(0) + q(0),\ p'(1) + q'(1)\bigr) = T(p) + T(q), \qquad T(ap) = \bigl(ap(0),\ ap'(1)\bigr) = aT(p).
$$

所以$T$是线性的。对$S$，一个反例就够了：$S(1,1) = (2, 1)$，但$S(2,2) = (4, 4) \neq 2S(1,1) = (4, 2)$。（注意$S(0,0) = (0,0)$；把$0$映到$0$是线性的必要条件，但不是充分条件。）
:::
:::

::: quiz
下列映射中哪些是线性的？（选出所有正确的选项。）
- [x] $T\colon\R^2\to\R^2$，$T(x, y) = (2x - y,\ 3y)$
- [ ] $T\colon\R^2\to\R^2$，$T(x, y) = (x + 1,\ y)$
- [x] $T\colon\mathcal{P}(\R)\to\mathcal{P}(\R)$，$T(p) = p'' + x\,p$
- [ ] $T\colon M_2(\R)\to M_2(\R)$，$T(A) = A\T A$
::: solution
第一个是$\begin{pmatrix}2&-1\\0&3\end{pmatrix}$的矩阵映射。第二个把$(0,0)$映到$(1,0)$，所以不是线性的。第三个是线性的：$(p + q)'' + x(p + q) = (p'' + xp) + (q'' + xq)$，数乘的情形类似（乘以固定的多项式$x$是线性运算）。第四个不是线性的：除非$A\T A = O$，否则$T(2A) = 4A\T A\neq 2T(A)$。
:::
:::

线性映射完全由它在一组基上的作用决定，而在基上它的取值可以完全任意。

::: theorem 线性映射与基 {#thm-basis-determines}
设$v_1, \dots, v_n$是$V$的一组基，$w_1, \dots, w_n$是$W$中任意的向量。则存在唯一的线性映射$T\colon V\to W$，使得对$j = 1, \dots, n$有$T(v_j) = w_j$。
:::

::: proof
*存在性*。每个$v\in V$都可以唯一地写成$v = a_1v_1 + \dots + a_nv_n$（[[linear-algebra/basis-dimension#thm-coordinates]]），因此可以定义$T(v) = a_1w_1 + \dots + a_nw_n$。于是$T(v_j) = w_j$。若又有$u = \sum b_jv_j$，则$u + v = \sum(a_j + b_j)v_j$，所以$T(u + v) = \sum(a_j + b_j)w_j = T(u) + T(v)$；类似地，$T(cv) = \sum ca_jw_j = cT(v)$。所以$T$是线性的。

*唯一性*。若$T'$是线性映射且$T'(v_j) = w_j$，则由[[#eq-preserve-comb]]，对每个向量都有$T'(\sum a_jv_j) = \sum a_jw_j = T(\sum a_jv_j)$，所以$T' = T$。
:::

把这个定理用于$\F^n$的标准基，就得到：**每个线性映射$T\colon\F^n\to\F^m$都是矩阵映射**：$T(\mathbf{x}) = A\mathbf{x}$，其中**标准矩阵**为

$$
A = \begin{pmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) & \cdots & T(\mathbf{e}_n)\end{pmatrix},
$$

因为$T(\mathbf{x}) = T(\sum x_j\mathbf{e}_j) = \sum x_jT(\mathbf{e}_j) = A\mathbf{x}$。例如，转角为$\theta$的旋转把$\mathbf{e}_1 = (1,0)$映到$(\cos\theta, \sin\theta)$，把$\mathbf{e}_2 = (0,1)$映到$(-\sin\theta, \cos\theta)$，所以它的标准矩阵是

$$
R_\theta = \begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}.
$$ {#eq-rotation}

::: widget transform2d
matrix: 0.866,-0.5; 0.5,0.866
caption: 旋转$30^\circ$，矩阵为$R_{\pi/6}$（元素已取近似值）。图中可以直观地看出线性：原点保持不动，直线变为直线，等距的平行网格线仍然等距且平行。矩阵的两列恰好是$\mathbf{e}_1$和$\mathbf{e}_2$的落点——而由[[#thm-basis-determines]]，这两个像决定了整个映射。编辑矩阵元素，用$\mathbf{e}_1$和$\mathbf{e}_2$的像构造你自己的映射。
:::

## 核与像

::: definition 核与像 {#def-kernel-image}
线性映射$T\colon V\to W$的**核**（或称零空间）与**像**（或称值域）分别是

$$
\ker T = \set{v\in V : T(v) = 0}\subseteq V, \qquad \Img T = \set{T(v) : v\in V}\subseteq W.
$$
:::

对矩阵映射$T_A$，核就是零空间$\operatorname{Nul}(A)$，像就是列空间$\operatorname{Col}(A)$。对$\mathcal{P}_n(\R)$上的求导映射$D$，核由常数多项式组成，像是$\mathcal{P}_{n-1}(\R)$。

::: proposition 核、像与单射性 {#prop-kernel}
设$T\colon V\to W$是线性映射。则$\ker T$是$V$的子空间，$\Img T$是$W$的子空间。此外，$T$是单射（一对一）当且仅当$\ker T = \{0\}$。
:::

::: proof
$T(0) = 0$，所以$0\in\ker T$且$0 \in\Img T$。若$T(u) = T(v) = 0$，则$T(au + bv) = aT(u) + bT(v) = 0$；所以由[[linear-algebra/vector-spaces#thm-subspace-test]]，$\ker T$是子空间。若$w = T(u)$和$w' = T(v)$在像中，则$aw + bw' = T(au + bv)$也在像中；所以$\Img T$是子空间。

若$T$是单射且$T(v) = 0 = T(0)$，则$v = 0$；所以$\ker T = \{0\}$。反之，设$\ker T = \{0\}$且$T(u) = T(v)$。则$T(u - v) = T(u) - T(v) = 0$，所以$u - v\in\ker T$，从而$u = v$。
:::

“单射当且仅当核平凡”这一判别法能省去大量功夫：不必比较所有的输入对，只需知道哪些输入被映到$0$。它是[[linear-algebra/linear-systems#thm-structure]]的抽象形式：方程$T(v) = w$的解（如果有的话）构成核的一个平移$v_0 + \ker T$，所以当解存在时，它唯一当且仅当$\ker T = \{0\}$。

::: widget projection
u: 2,1
v: 1,2
mode: projection
caption: 到过$\mathbf{u}$的直线$L$上的正交投影是平面上的一个线性映射$P$。拖动$\mathbf{v}$，观察它在$L$上的影子$P\mathbf{v}$。$P$的像是直线$L$；它的核是过原点且与$L$垂直的直线——把$\mathbf{v}$拖到那里，它的投影就缩为$\mathbf{0}$。一个维度被保留，一个维度被丢失：$2 = 1 + 1$。
:::

本章的核心定理是说，核的维数与像的维数之和总等于定义域的维数：$T$在核中“看不见”的部分，恰好就是像中缺失的部分。

::: theorem 秩-零化度定理 {#thm-rank-nullity}
设$V$是有限维的，$T\colon V\to W$是线性映射。则$\Img T$是有限维的，并且

$$
\dim V = \dim\ker T + \dim\Img T.
$$ {#eq-rank-nullity}
:::

::: proof
核是$V$的子空间，所以它是有限维的（[[linear-algebra/basis-dimension#thm-dim-facts]]）；设$u_1, \dots, u_k$是它的一组基。把它扩充为$V$的一组基$u_1, \dots, u_k, v_1, \dots, v_r$，于是$\dim V = k + r$。我们来证明$T(v_1), \dots, T(v_r)$是$\Img T$的一组基；这样$\dim\Img T = r$，公式随之得证。

*张成*。$\Img T$的每个元素都是某个$v = \sum a_iu_i + \sum b_jv_j$的像$T(v)$，并且

$$
T(v) = \textstyle\sum a_iT(u_i) + \sum b_jT(v_j) = \sum b_jT(v_j),
$$

这是因为$T(u_i) = 0$。所以$T(v_1), \dots, T(v_r)$张成$\Img T$。

*线性无关*。设$\sum b_jT(v_j) = 0$。则$T(\sum b_jv_j) = 0$，所以$\sum b_jv_j\in\ker T$，从而可以写成$\sum b_jv_j = \sum c_iu_i$，其中$c_i$是某些标量。于是$\sum c_iu_i - \sum b_jv_j = 0$是$V$的一组基中各向量之间的一个线性关系，所以所有$b_j$（以及$c_i$）都等于$0$。
:::

[[#eq-rank-nullity]]中的这些数各有名称：$\dim\Img T$称为$T$的**秩**，$\dim\ker T$称为$T$的**零化度**。对矩阵映射而言，秩-零化度定理就是[[linear-algebra/basis-dimension#thm-rank]]中的等式$\rank A + \dim\operatorname{Nul}(A) = n$，但上面的证明完全没有提到矩阵或主元。由此立即得到三个推论。

::: corollary 维数计数 {#cor-counting}
设$V$和$W$是有限维的，$T\colon V\to W$是线性映射。

1. 若$\dim V > \dim W$，则$T$不是单射。
2. 若$\dim V < \dim W$，则$T$不是满射。
3. 若$\dim V = \dim W$，则$T$是单射当且仅当它是满射（此时它是双射）。
:::

::: proof
1. $\dim\ker T = \dim V - \dim\Img T\ge\dim V - \dim W > 0$，所以$\ker T\neq\{0\}$。
2. $\dim\Img T = \dim V - \dim\ker T\le\dim V < \dim W$，所以$\Img T\neq W$。
3. $T$是单射当且仅当$\dim\ker T = 0$，当且仅当$\dim\Img T = \dim V = \dim W$，当且仅当$\Img T = W$（由[[linear-algebra/basis-dimension#thm-dim-facts]]，维数与全空间相同的子空间就是全空间）。
:::

第3部分是一条引人注目的“唯一性蕴涵存在性”原理，下一个例子就会用到它。

::: example 用秩-零化度定理解决插值问题 {#ex-interpolation}
设$x_0, x_1, \dots, x_n$是互不相同的实数。证明：对任意给定的值$y_0, \dots, y_n$，存在唯一的次数不超过$n$的多项式$p$，使得对所有$i$都有$p(x_i) = y_i$。
::: solution
考虑求值映射

$$
E\colon\mathcal{P}_n(\R)\to\R^{n+1}, \qquad E(p) = \bigl(p(x_0), p(x_1), \dots, p(x_n)\bigr).
$$

与[[#ex-check-linear]]中同样的论证表明它是线性的。若$E(p) = \mathbf{0}$，则$p$有$n + 1$个互不相同的根$x_0, \dots, x_n$；而次数不超过$n$的非零多项式至多有$n$个根，所以$p = 0$。因此$\ker E = \{0\}$，$E$是单射（**唯一性**）。两个空间的维数都是$n + 1$，所以由[[#cor-counting]]，$E$也是满射（**存在性**）：每个数组$(y_0, \dots, y_n)$都恰好是一个$p$的像$E(p)$。

我们根本不需要解方程组。当$n = 2$、节点为$1, 2, 3$时，这就是[[linear-algebra/linear-systems#ex-parabola]]中的抛物线，在那里我们是用消元法证明其唯一性的。
:::
:::

::: example 一个导数映射的核与像 {#ex-kernel-image}
求$T\colon\mathcal{P}_2(\R)\to\R^2$，$T(p) = \bigl(p(0), p'(1)\bigr)$的核与像，并验证秩-零化度定理。
::: solution
设$p = a + bx + cx^2$。则$p(0) = a$，$p'(1) = b + 2c$，所以$T(p) = (a, b + 2c)$。核由满足$a = 0$和$b = -2c$的$p$组成：它们恰是$x^2 - 2x$的倍数，所以$\ker T = \Span(x^2 - 2x)$的维数为$1$。像包含$T(1) = (1, 0)$和$T(x) = (0, 1)$，所以像是整个$\R^2$，维数为$2$。秩-零化度定理：$\dim\mathcal{P}_2 = 3 = 1 + 2$。（验证：对$p = x^2 - 2x$，有$p(0) = 0$，$p'(1) = 2 - 2 = 0$。）
:::
:::

::: quiz
$T\colon\R^5\to\R^3$是线性映射。下列哪些命题一定成立？（选出所有正确的选项。）
- [x] $T$不是单射。
- [x] $\dim\ker T\ge 2$。
- [ ] $T$是满射。
- [x] 若$\dim\Img T = 3$，则$\dim\ker T = 2$。
::: solution
由秩-零化度定理，$\dim\ker T = 5 - \dim\Img T\ge 5 - 3 = 2$，所以核非平凡，$T$不是单射；若像的维数为$3$，则核的维数恰为$2$。但$T$不一定是满射——零映射是线性的，而它的像是$\{\mathbf{0}\}$。
:::
:::

## 同构

::: definition 同构 {#def-isomorphism}
双射的线性映射$T\colon V\to W$称为**同构**。若存在同构$V\to W$，则称$V$与$W$**同构**，记作$V\cong W$。
:::

同构的反函数$T^{-1}\colon W\to V$自动是线性的：任给$w, w'\in W$，令$v = T^{-1}w$，$v' = T^{-1}w'$；则$T(av + bv') = aw + bw'$，所以$T^{-1}(aw + bw') = av + bv' = aT^{-1}w + bT^{-1}w'$。同构的空间就是把元素换了名字的同一个空间：其中一个空间里关于向量、张成、线性无关性或维数的每个命题，都可以翻译成另一个空间里的同样命题。

::: theorem 有限维空间的分类 {#thm-isomorphic}
$\F$上的两个有限维向量空间同构当且仅当它们的维数相同。特别地，每个$n$维空间都与$\F^n$同构。
:::

::: proof
若$T\colon V\to W$是同构，则$\ker T = \{0\}$且$\Img T = W$，于是由秩-零化度定理得$\dim V = 0 + \dim W$。反之，设$\mathcal{B} = (v_1, \dots, v_n)$是$V$的一组基。由[[linear-algebra/basis-dimension#eq-coord-linear]]，**坐标映射**$v\mapsto[v]_{\mathcal{B}}$是线性的；它是单射，因为只有$0$的坐标是$\mathbf{0}$；它是满射，因为每个列向量$(a_1, \dots, a_n)$都是$\sum a_jv_j$的坐标向量。所以$V\cong\F^n$。若又有$\dim W = n$，则也有$W\cong\F^n$，把其中一个同构与另一个同构的逆复合，就得到$V\cong W$。
:::

因此，$\mathcal{P}_3(\R)$、$M_2(\R)$和$\R^4$都是“同一个”$4$维实向量空间。但同构依赖于基的选取，而线性代数的技巧很大程度上就在于选好基。

## 线性映射的矩阵

坐标把向量变成列向量；它们也把线性映射变成矩阵。

::: definition 线性映射的矩阵 {#def-matrix-of-map}
设$T\colon V\to W$是线性映射，$\mathcal{B} = (v_1, \dots, v_n)$是$V$的一组基，$\mathcal{C} = (w_1, \dots, w_m)$是$W$的一组基。**$T$关于$\mathcal{B}$和$\mathcal{C}$的矩阵**是$m\times n$矩阵

$$
[T]_{\mathcal{C}\leftarrow\mathcal{B}} = \begin{pmatrix}[T(v_1)]_{\mathcal{C}} & [T(v_2)]_{\mathcal{C}} & \cdots & [T(v_n)]_{\mathcal{C}}\end{pmatrix},
$$

它的第$j$列是第$j$个基向量的像的$\mathcal{C}$坐标。对$V$上的算子取$\mathcal{C} = \mathcal{B}$时，简记为$[T]_{\mathcal{B}}$。
:::

::: theorem 矩阵完成映射的工作 {#thm-matrix-of-map}
沿用[[#def-matrix-of-map]]中的记号，对每个$v\in V$有

$$
[T(v)]_{\mathcal{C}} = [T]_{\mathcal{C}\leftarrow\mathcal{B}}\,[v]_{\mathcal{B}}.
$$

此外，若$S\colon W\to U$是线性映射，$\mathcal{D}$是$U$的一组基，则

$$
[S\circ T]_{\mathcal{D}\leftarrow\mathcal{B}} = [S]_{\mathcal{D}\leftarrow\mathcal{C}}\,[T]_{\mathcal{C}\leftarrow\mathcal{B}}.
$$ {#eq-composition}
:::

::: proof
设$v = \sum a_jv_j$，则$[v]_{\mathcal{B}} = (a_1, \dots, a_n)$。由$T$的线性和坐标的线性，

$$
[T(v)]_{\mathcal{C}} = \Bigl[\textstyle\sum_j a_jT(v_j)\Bigr]_{\mathcal{C}} = \sum_j a_j[T(v_j)]_{\mathcal{C}} = [T]_{\mathcal{C}\leftarrow\mathcal{B}}\,[v]_{\mathcal{B}},
$$

最后一步就是矩阵与向量乘积的定义（各列的线性组合）。对于复合，把第一部分用两次：$[S(T(v))]_{\mathcal{D}} = [S]_{\mathcal{D}\leftarrow\mathcal{C}}[T(v)]_{\mathcal{C}} = [S]_{\mathcal{D}\leftarrow\mathcal{C}}[T]_{\mathcal{C}\leftarrow\mathcal{B}}[v]_{\mathcal{B}}$。取$v = v_j$，使得$[v]_{\mathcal{B}} = \mathbf{e}_j$，就说明[[#eq-composition]]两边的第$j$列相等。
:::

所以矩阵乘法**就是**线性映射的复合，而且现在是在完全一般的情形下——这就是[[linear-algebra/matrices#def-product]]背后更深层的原因。

::: example 求导的矩阵 {#ex-diff-matrix}
求$D\colon\mathcal{P}_3(\R)\to\mathcal{P}_2(\R)$，$Dp = p'$关于基$\mathcal{B} = (1, x, x^2, x^3)$和$\mathcal{C} = (1, x, x^2)$的矩阵，并用它对$p = 5 - x + 4x^2 + 2x^3$求导。
::: solution
各基向量的像为$D1 = 0$，$Dx = 1$，$Dx^2 = 2x$，$Dx^3 = 3x^2$，它们的$\mathcal{C}$坐标分别为$(0,0,0)$，$(1,0,0)$，$(0,2,0)$，$(0,0,3)$。这些就是矩阵的各列：

$$
[D]_{\mathcal{C}\leftarrow\mathcal{B}} = \begin{pmatrix}0&1&0&0\\0&0&2&0\\0&0&0&3\end{pmatrix}.
$$

而$[p]_{\mathcal{B}} = (5, -1, 4, 2)$，并且

$$
\begin{pmatrix}0&1&0&0\\0&0&2&0\\0&0&0&3\end{pmatrix}\begin{pmatrix}5\\-1\\4\\2\end{pmatrix} = \begin{pmatrix}-1\\8\\6\end{pmatrix},
$$

所以$p' = -1 + 8x + 6x^2$，与预期一致。该矩阵的秩为$3$，零空间是由$(1, 0, 0, 0)$张成的$1$维空间——对应于常数多项式——这与秩-零化度定理相符：$4 = 1 + 3$。
:::
:::

## 基变换与相似

映射的矩阵依赖于基。为了比较不同基下的矩阵，我们先比较坐标。

设$\mathcal{B} = (v_1, \dots, v_n)$和$\mathcal{B}'$是$V$的两组基。从$\mathcal{B}'$到$\mathcal{B}$的**坐标变换矩阵**是恒等映射的矩阵：

$$
P_{\mathcal{B}\leftarrow\mathcal{B}'} = [\id]_{\mathcal{B}\leftarrow\mathcal{B}'}, \qquad\text{从而}\qquad [v]_{\mathcal{B}} = P_{\mathcal{B}\leftarrow\mathcal{B}'}[v]_{\mathcal{B}'}\quad\text{对所有 } v.
$$

它的各列是$\mathcal{B}'$中各向量的$\mathcal{B}$坐标。由[[#eq-composition]]，$P_{\mathcal{B}'\leftarrow\mathcal{B}}P_{\mathcal{B}\leftarrow\mathcal{B}'} = [\id]_{\mathcal{B}'\leftarrow\mathcal{B}'} = I$，所以这两个坐标变换矩阵互逆。当$V = \F^n$且$\mathcal{B}$是标准基$\mathcal{E}$时，矩阵$P_{\mathcal{E}\leftarrow\mathcal{B}'}$的各列就是$\mathcal{B}'$中的向量。

::: theorem 基变换 {#thm-change-basis}
设$T$是有限维空间$V$上的线性算子，$\mathcal{B}$和$\mathcal{B}'$是$V$的两组基，令$P = P_{\mathcal{B}\leftarrow\mathcal{B}'}$。则

$$
[T]_{\mathcal{B}'} = P^{-1}\,[T]_{\mathcal{B}}\,P.
$$ {#eq-change-basis}
:::

::: proof
由于$T = \id\circ T\circ\id$，两次应用[[#eq-composition]]得

$$
[T]_{\mathcal{B}'\leftarrow\mathcal{B}'} = [\id]_{\mathcal{B}'\leftarrow\mathcal{B}}\,[T]_{\mathcal{B}\leftarrow\mathcal{B}}\,[\id]_{\mathcal{B}\leftarrow\mathcal{B}'} = P^{-1}[T]_{\mathcal{B}}P.
$$
:::

从右往左读[[#eq-change-basis]]：$P$把$\mathcal{B}'$坐标转换为$\mathcal{B}$坐标，$[T]_{\mathcal{B}}$施行$T$，$P^{-1}$再转换回来。

::: definition 相似矩阵 {#def-similar}
若存在可逆矩阵$P$使得$B = P^{-1}AP$，则称两个$n\times n$矩阵$A$与$B$**相似**。
:::

由[[#thm-change-basis]]，同一个算子关于不同基的矩阵是相似的；反之，若$B = P^{-1}AP$，则$A$和$B$分别是算子$\mathbf{x}\mapsto A\mathbf{x}$关于标准基和关于由$P$的各列构成的基的矩阵。因此，只依赖于算子而不依赖于基的量，对相似矩阵必然相同。秩就是这样的量（它等于$\dim\Img T$）；迹是另一个，因为由[[linear-algebra/matrices#exr-trace]]中的恒等式$\tr(XY) = \tr(YX)$，有$\tr(P^{-1}AP) = \tr(APP^{-1}) = \tr A$。行列式和特征值（[[linear-algebra/determinants]]，[[linear-algebra/eigenvalues]]）是所有相似不变量中最重要的。

::: example 让反射变得简单 {#ex-reflection}
求$\R^2$关于直线$y = 2x$的反射$T$的标准矩阵。
::: solution
在标准基下答案并不明显，所以选取一组与几何相适应的基：沿该直线的$\mathbf{v}_1 = (1, 2)$和垂直于它的$\mathbf{v}_2 = (-2, 1)$。反射保持$\mathbf{v}_1$不动而把$\mathbf{v}_2$反向：$T\mathbf{v}_1 = \mathbf{v}_1$，$T\mathbf{v}_2 = -\mathbf{v}_2$。所以关于$\mathcal{B}' = (\mathbf{v}_1, \mathbf{v}_2)$，

$$
[T]_{\mathcal{B}'} = \begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

取$P = P_{\mathcal{E}\leftarrow\mathcal{B}'} = \begin{pmatrix}1&-2\\2&1\end{pmatrix}$，$P^{-1} = \frac15\begin{pmatrix}1&2\\-2&1\end{pmatrix}$（由[[linear-algebra/matrices#eq-inv2]]），基变换公式[[#eq-change-basis]]可改写为$[T]_{\mathcal{E}} = P[T]_{\mathcal{B}'}P^{-1}$：

$$
[T]_{\mathcal{E}} = \begin{pmatrix}1&-2\\2&1\end{pmatrix}\begin{pmatrix}1&0\\0&-1\end{pmatrix}\cdot\frac15\begin{pmatrix}1&2\\-2&1\end{pmatrix} = \frac15\begin{pmatrix}1&2\\2&-1\end{pmatrix}\begin{pmatrix}1&2\\-2&1\end{pmatrix} = \frac15\begin{pmatrix}-3&4\\4&3\end{pmatrix}.
$$

*验证*：$\frac15(-3 + 8,\ 4 + 6) = (1, 2)$，所以$\mathbf{v}_1$保持不动；$\frac15(6 + 4,\ -8 + 3) = (2, -1) = -\mathbf{v}_2$。两组基下的迹都是$0$，这是必然的。
:::
:::

::: widget transform2d
matrix: -0.6,0.8; 0.8,0.6
eigen: true
caption: [[#ex-reflection]]中的反射，矩阵为$\frac15\begin{pmatrix}-3&4\\4&3\end{pmatrix}$。在标准基下它看起来很复杂，但有两个方向很特殊：沿$(1,2)$的向量保持不变，沿$(-2,1)$的向量被反向。在由这两个向量构成的基下，矩阵就是简单的$\operatorname{diag}(1,-1)$。寻找这种相适应的基，正是[[linear-algebra/eigenvalues]]的目标。
:::

::: warning P 朝哪个方向转换？
基变换中最常见的错误是在需要$P^{-1}$的地方用了$P$。要根据$P$对坐标的作用来确定它的含义：$P_{\mathcal{B}\leftarrow\mathcal{B}'}$**输入$\mathcal{B}'$坐标，输出$\mathcal{B}$坐标**，它的各列是用旧基表示的新基向量。然后像[[#thm-change-basis]]之后的说明那样，追踪一个向量经过公式的过程来检验公式，或者像[[#ex-reflection]]中的验证那样，用一个基向量来检验。
:::

::: quiz
设$B = P^{-1}AP$，其中$P$可逆。下列哪些一定成立？（选出所有正确的选项。）
- [x] $\tr B = \tr A$
- [x] $\rank B = \rank A$
- [ ] $B = A$
- [x] $B^2 = P^{-1}A^2P$
::: solution
如上所述，迹和秩是相似不变量。对于幂，$B^2 = (P^{-1}AP)(P^{-1}AP) = P^{-1}A(PP^{-1})AP = P^{-1}A^2P$——这就是在新基下把同一个算子作用两次。但相似矩阵通常并不相等：[[#ex-reflection]]中的反射有相似矩阵$\frac15\begin{pmatrix}-3&4\\4&3\end{pmatrix}$和$\begin{pmatrix}1&0\\0&-1\end{pmatrix}$。
:::
:::

::: history
抽象向量空间之间的线性映射是由朱塞佩·皮亚诺（Giuseppe Peano）在《几何演算》（*Calcolo geometrico*，1888）中定义的，他在书中还指出，从一个空间到另一个空间的全体线性映射本身构成一个向量空间。这些思想在分析学中显示出了价值。伊瓦尔·弗雷德霍姆（Ivar Fredholm）于1903年证明，对于一类重要的积分方程，解的唯一性蕴涵存在性——这是[[#cor-counting]]第3部分在无穷维情形下的类比，今天称为弗雷德霍姆择一定理——而大卫·希尔伯特（David Hilbert）学派则发展了函数空间上的线性算子理论。斯特凡·巴拿赫（Stefan Banach）的《线性运算理论》（*Théorie des opérations linéaires*，1932）奠定了无穷维赋范空间之间线性映射的一般理论，即今天所说的泛函分析。
:::

## 后续内容

基变换引出了后面几章的核心问题：给定一个算子，能否选取一组基，使它的矩阵尽可能简单——最好是对角矩阵，就像上面的反射那样？行列式（[[linear-algebra/determinants]]）提供了一个能判别可逆性的相似不变量，而特征向量（[[linear-algebra/eigenvalues]]）恰好就是使矩阵成为对角矩阵的那些基向量。当做不到这一点时，若尔当标准形（[[linear-algebra/jordan-form]]）是最好的替代。线性映射无处不在：多元函数的导数是线性映射（[[multivariable/partial-derivatives]]），线性微分算子作用在函数空间上（[[ode/second-order-linear]]），而在[[abstract-algebra/homomorphisms]]中，群同态是线性映射的类比。

::: summary
- 线性映射保持加法与数乘，从而保持所有线性组合；它把$0$映到$0$（[[#def-linear-map]]）。
- 线性映射由一组基的像决定，而这些像可以任意指定（[[#thm-basis-determines]]）；每个线性映射$\F^n\to\F^m$都是$\mathbf{x}\mapsto A\mathbf{x}$，其中$A$的各列为$T(\mathbf{e}_j)$。
- $\ker T$和$\Img T$都是子空间，且$T$是单射当且仅当$\ker T = \{0\}$（[[#prop-kernel]]）。
- 秩-零化度定理：$\dim V = \dim\ker T + \dim\Img T$（[[#thm-rank-nullity]]）；在维数相同的有限维空间之间，单射$\iff$满射。
- 有限维空间同构当且仅当它们的维数相同；坐标给出$V\cong\F^n$。
- $[T]_{\mathcal{C}\leftarrow\mathcal{B}}$的各列为$[T(v_j)]_{\mathcal{C}}$；它满足$[Tv]_{\mathcal{C}} = [T][v]_{\mathcal{B}}$，而映射的复合对应于矩阵乘法。
- 基变换把$[T]_{\mathcal{B}}$换成与之相似的矩阵$P^{-1}[T]_{\mathcal{B}}P$（[[#thm-change-basis]]）；迹和秩是相似不变量。
:::

## 习题

::: exercise 是否线性？ {level=1}
下列映射中哪些是线性的？(a) $T\colon\R^3\to\R^2$，$T(x,y,z) = (x - 2y + z,\ 3y - z)$；(b) $T\colon\R^2\to\R$，$T(x,y) = \abs{x} + \abs{y}$；(c) $T\colon\mathcal{P}_2\to\mathcal{P}_3$，$T(p) = x\,p(x)$；(d) $T\colon M_2(\R)\to\R$，$T(A) = a_{11}a_{22}$。
::: solution
(a) 线性：它是$\begin{pmatrix}1&-2&1\\0&3&-1\end{pmatrix}$的矩阵映射。(b) 不是线性的：$T(-1, 0) = 1\neq -T(1,0) = -1$。(c) 线性：$x(p + q) = xp + xq$，$x(ap) = a(xp)$。(d) 不是线性的：$T(2I) = 4\neq 2T(I) = 2$。
:::
:::

::: exercise 求标准矩阵 {level=1}
线性映射$T\colon\R^2\to\R^2$先作关于$x$轴的反射，再逆时针旋转$90^\circ$。求它的标准矩阵。它是旋转还是反射？
::: solution
关于$x$轴的反射的矩阵为$F = \begin{pmatrix}1&0\\0&-1\end{pmatrix}$，旋转$90^\circ$的矩阵为$R = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$（由[[#eq-rotation]]）。先作$F$，所以$T = R\circ F$的矩阵为$RF = \begin{pmatrix}0&1\\1&0\end{pmatrix}$。它交换$\mathbf{e}_1$和$\mathbf{e}_2$：它是关于直线$y = x$的反射（它保持$(1,1)$不动，把$(1,-1)$反向）。
:::
:::

::: exercise 核的维数计算 {level=1 check="3"}
线性映射$T\colon\R^6\to\R^4$的核是$3$维的。它的像的维数是多少？$T$是满射吗？
::: solution
由秩-零化度定理，$\dim\Img T = 6 - 3 = 3$。像是$\R^4$的$3$维子空间，所以$T$不是满射。
:::
:::

::: exercise 一个可逆的微分算子 {level=2}
设$T\colon\mathcal{P}_2(\R)\to\mathcal{P}_2(\R)$，$T(p) = p' + p$。对$\mathcal{B} = (1, x, x^2)$求$[T]_{\mathcal{B}}$，证明$T$可逆，并求满足$p' + p = x^2$的多项式$p$。
::: solution
$T(1) = 1$，$T(x) = 1 + x$，$T(x^2) = 2x + x^2$，所以

$$
[T]_{\mathcal{B}} = \begin{pmatrix}1&1&0\\0&1&2\\0&0&1\end{pmatrix}.
$$

这是对角元全不为零的上三角矩阵，所以它可逆（有三个主元）；因此$T$是同构。为解$T(p) = x^2$，用回代法解$[T]_{\mathcal{B}}\mathbf{a} = (0, 0, 1)$：$a_3 = 1$；由$a_2 + 2a_3 = 0$得$a_2 = -2$；由$a_1 + a_2 = 0$得$a_1 = 2$。所以$p = 2 - 2x + x^2$。*验证*：$p' + p = (2x - 2) + (x^2 - 2x + 2) = x^2$。
:::
:::

::: exercise 对称部分与反对称部分 {level=2 check="1"}
设$T\colon M_2(\R)\to M_2(\R)$，$T(A) = A - A\T$。求$\ker T$和$\Img T$以及它们的维数。$\dim\Img T$是多少？
::: solution
$T(A) = O$当且仅当$A = A\T$，所以$\ker T$是$2\times 2$对称矩阵构成的空间，维数为$3$。对$A = \begin{pmatrix}a&b\\c&d\end{pmatrix}$，有$T(A) = \begin{pmatrix}0&b-c\\c-b&0\end{pmatrix} = (b - c)\begin{pmatrix}0&1\\-1&0\end{pmatrix}$，所以$\Img T$是$2\times 2$反对称矩阵构成的$1$维空间。用秩-零化度定理验证：$4 = 3 + 1$。
:::
:::

::: exercise 到直线上的投影 {level=2}
像[[#ex-reflection]]那样，利用与几何相适应的基，求$\R^2$到直线$y = x$上的正交投影的标准矩阵。求它的核与像。
::: solution
取直线上的$\mathbf{v}_1 = (1,1)$和与之垂直的$\mathbf{v}_2 = (1,-1)$，投影满足$P\mathbf{v}_1 = \mathbf{v}_1$，$P\mathbf{v}_2 = \mathbf{0}$，所以它在这组基下的矩阵为$\operatorname{diag}(1, 0)$。取$Q = \begin{pmatrix}1&1\\1&-1\end{pmatrix}$，$Q^{-1} = \frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix}$，

$$
[P]_{\mathcal{E}} = Q\begin{pmatrix}1&0\\0&0\end{pmatrix}Q^{-1} = \begin{pmatrix}1&0\\1&0\end{pmatrix}\cdot\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix} = \frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$

像是直线$y = x$，核是直线$y = -x$。
:::
:::

::: exercise 在好的基下成为对角矩阵 {level=2}
设$A = \begin{pmatrix}4&-2\\1&1\end{pmatrix}$，$\mathcal{B} = \bigl((2,1), (1,1)\bigr)$。计算$\mathbf{x}\mapsto A\mathbf{x}$关于$\mathcal{B}$的矩阵。
::: solution
取$P = \begin{pmatrix}2&1\\1&1\end{pmatrix}$（各列为基向量），$P^{-1} = \begin{pmatrix}1&-1\\-1&2\end{pmatrix}$，

$$
P^{-1}AP = \begin{pmatrix}1&-1\\-1&2\end{pmatrix}\begin{pmatrix}6&2\\3&2\end{pmatrix} = \begin{pmatrix}3&0\\0&2\end{pmatrix}.
$$

所以在这组基下该映射是对角的：$A(2,1) = (6,3) = 3(2,1)$，$A(1,1) = (2,2) = 2(1,1)$。这些基向量是特征向量，这一概念将在[[linear-algebra/eigenvalues]]中研究。
:::
:::

::: exercise 投影分解空间 {level=3 #exr-projection}
设$T\colon V\to V$是线性映射，且$T\circ T = T$（这样的$T$称为**投影**）。证明$V = \ker T\oplus\Img T$。
::: hint
把$v$写成$v = (v - Tv) + Tv$。
:::
::: solution
对任意$v\in V$，$v = (v - Tv) + Tv$。第二项属于$\Img T$；第一项属于$\ker T$，因为$T(v - Tv) = Tv - T^2v = Tv - Tv = 0$。所以$V = \ker T + \Img T$。若$w\in\ker T\cap\Img T$，记$w = Tu$；则$0 = Tw = T^2u = Tu = w$。所以$\ker T\cap\Img T = \{0\}$，由[[linear-algebra/vector-spaces#prop-direct-sum]]，这个和是直和。
:::
:::

::: exercise 核等于像 {level=3}
证明不存在满足$\ker T = \Img T$的线性映射$T\colon\R^3\to\R^3$，并举出一个满足$\ker T = \Img T$的线性映射$T\colon\R^2\to\R^2$的例子。
::: solution
若$\ker T = \Img T$，则由秩-零化度定理得$3 = \dim\ker T + \dim\Img T = 2\dim\ker T$，这不可能，因为$3$是奇数。在$\R^2$中，取$T(x, y) = (y, 0)$，其矩阵为$\begin{pmatrix}0&1\\0&0\end{pmatrix}$：它的核是$\set{(x, 0)}$（即$x$轴），它的像也是$x$轴。注意$T\circ T = 0$；只要$\Img T\subseteq\ker T$，这一点就是必然的。
:::
:::

::: exercise 线性映射构成的空间 {level=3}
证明$\mathcal{L}(V, W)$在运算$(S + T)(v) = S(v) + T(v)$和$(aT)(v) = aT(v)$下构成向量空间，并证明：若$\dim V = n$，$\dim W = m$，则$\dim\mathcal{L}(V, W) = mn$。
::: solution
$S + T$和$aT$都是线性的（例如$(S + T)(u + v) = Su + Sv + Tu + Tv = (S+T)u + (S+T)v$），而向量空间的各条公理成立，因为它们在$W$中逐点成立；零向量是零映射。取定$V$的基$\mathcal{B}$和$W$的基$\mathcal{C}$，考虑$\Phi\colon\mathcal{L}(V, W)\to M_{m\times n}(\F)$，$\Phi(T) = [T]_{\mathcal{C}\leftarrow\mathcal{B}}$。它是线性的，因为$[S + T]$和$[aT]$的各列分别是$[Sv_j + Tv_j]_{\mathcal{C}} = [Sv_j]_{\mathcal{C}} + [Tv_j]_{\mathcal{C}}$和$a[Tv_j]_{\mathcal{C}}$。它是单射，因为$[T] = O$意味着对每个基向量都有$T(v_j) = 0$，于是由[[#thm-basis-determines]]得$T = 0$。它是满射，因为由同一定理，任何矩阵$M$都是满足$T(v_j) = \sum_i m_{ij}w_i$的线性映射的矩阵$[T]$。所以$\Phi$是同构，$\dim\mathcal{L}(V,W) = \dim M_{m\times n}(\F) = mn$。
:::
:::
