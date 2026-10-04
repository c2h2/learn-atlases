在[[complex-analysis/analytic-functions]]一章中我们看到，导数不为零的解析函数在非常小的尺度上的作用就像乘以复数$f'(z_0)$：旋转与伸缩的复合。旋转和伸缩都保持角度不变。所以，无论解析映射把大的图形扭曲得多么厉害，它都保持在$f'\neq0$的点处相交的任意两条曲线之间的夹角——前面几章中$z^2$和$e^z$的网格图里，处处都是被映成直角的直角。具有这种性质的映射称为**共形**的。

共形映射是复分析的几何面貌，它们的用处极大。拉普拉斯方程在共形映射下保持不变，所以一个复杂区域上的静电学、热传导或流体力学问题，可以搬到一个简单的区域——圆盘或半平面——上去，在那里求解，再搬回来。**黎曼映射定理**保证了这在原则上总是可行的：除$\C$本身以外的每个单连通区域都可以共形地映射到单位圆盘上。本章将证明解析映射是共形的，研究最重要的一类共形映射——**默比乌斯（Möbius）变换**，借助**施瓦茨（Schwarz）引理**确定圆盘到自身的全部共形映射，构造标准区域之间的映射，并用它们求解边值问题。

## 共形性

设$\gamma_1$和$\gamma_2$是过点$z_0$的光滑曲线，比如说$\gamma_1(0) = \gamma_2(0) = z_0$，其切向量$\gamma_1'(0)$和$\gamma_2'(0)$都不为零。在$z_0$处从$\gamma_1$到$\gamma_2$的**夹角**是指从$\gamma_1'(0)$到$\gamma_2'(0)$的角，即$\arg\gamma_2'(0) - \arg\gamma_1'(0)$（模$2\pi$）。

::: definition 共形映射 {#def-conformal}
设映射$f$在$z_0$附近有定义。若对过$z_0$且切向量不为零的每一对光滑曲线，像曲线$f\circ\gamma_1$和$f\circ\gamma_2$在$f(z_0)$处的切向量都不为零，并且它们之间的夹角在大小和方向上都等于$\gamma_1$与$\gamma_2$之间的夹角，则称$f$**在$z_0$处共形**。区域$D$到区域$D'$上的**共形映射**是指双射的解析映射$f\colon D\to D'$。
:::

::: theorem 解析映射保持角度 {#thm-conformal}
若$f$在$z_0$处解析且$f'(z_0)\neq0$，则$f$在$z_0$处共形。$z_0$处的每个切向量都旋转$\Arg f'(z_0)$，并伸缩$\abs{f'(z_0)}$倍。
:::

::: proof
由[[complex-analysis/analytic-functions#lem-curve]]，像曲线$f\circ\gamma_k$的切向量为

$$
(f\circ\gamma_k)'(0) = f'(z_0)\,\gamma_k'(0),
$$

由于两个因子都不为零，它也不为零。乘以固定的数$f'(z_0) = \rho e^{i\varphi}$，就是把长度乘以$\rho$，把辐角加上$\varphi$。因此$\arg(f\circ\gamma_2)'(0) - \arg(f\circ\gamma_1)'(0) = \big(\arg\gamma_2'(0) + \varphi\big) - \big(\arg\gamma_1'(0) + \varphi\big) = \arg\gamma_2'(0) - \arg\gamma_1'(0)$。
:::

在$f'(z_0) = 0$的点处，角度不能保持。若$f(z) - f(z_0)$在$z_0$处有$k\ge2$阶零点，则在$z_0$附近$f(z)\approx f(z_0) + c(z - z_0)^k$，并且**$z_0$处的角度被乘以$k$**。映射$z\mapsto z^2$把正实轴与正虚轴之间的直角加倍，变成正实轴与负实轴之间的平角。反过来（这一点我们不加证明），平面区域上连续可微、在大小和方向上都保持角度、且雅可比行列式处处不为零的映射是解析的：共形性与“解析且$f'\neq0$”是一回事。

::: quiz
$f(z) = z^3 - 3z$在哪些点处**不**共形？
- [ ] 没有这样的点：多项式处处共形
- [ ] 只在$z = 0$处
- [x] 在$z = \pm1$处
- [ ] 在$f$的零点处，即$0$和$\pm\sqrt3$
::: solution
由[[#thm-conformal]]，$f$在$f'(z) = 3z^2 - 3\neq0$的点处都共形；共形性恰好在临界点$z = \pm1$处不成立。在这两点处$f(z) - f(\pm1)$有$2$阶零点，所以角度加倍。$f$本身的零点与此无关：在$z = 0$处，$f'(0) = -3\neq0$。
:::
:::

区域之间的共形映射是**双射**的解析映射。有两个事实使这一定义显得很自然：这样的映射自动满足处处$f'\neq0$（若$f'(z_0) = 0$，辐角原理表明$f$在$z_0$附近取其附近的值至少两次，所以$f$不是单射）；并且由下面的定理，它的逆映射自动是解析的。

::: theorem 反函数定理 {#thm-inverse}
设$f$在包含$z_0$的某个开集上解析，且$f'(z_0)\neq0$，则存在开集$U\ni z_0$和$V\ni f(z_0)$，使得$f$把$U$双射地映到$V$上，并且逆映射$g\colon V\to U$解析，$g'(w) = \dfrac{1}{f'(g(w))}$。
:::

::: proof
把$f = u + iv$看作$\R^2$上的映射。它是连续可微的（解析函数的导数连续，[[complex-analysis/cauchy-theorem#thm-derivatives]]），它在$z_0$处的雅可比矩阵为$\begin{pmatrix} a & -b\\ b & a\end{pmatrix}$，其中$a + bi = f'(z_0)$，其行列式$a^2 + b^2 = \abs{f'(z_0)}^2$不为零。由$\R^2$上映射的反函数定理（多元分析中的一个标准结果），存在开集$U$、$V$，使得$f\colon U\to V$是双射，其逆映射$g$连续可微，且$Dg(w) = Df(g(w))^{-1}$；缩小$U$，可以假定在$U$上$f'\neq0$。形如$\begin{pmatrix} a & -b\\ b & a\end{pmatrix}$的非零矩阵的逆是$\frac{1}{a^2 + b^2}\begin{pmatrix} a & b\\ -b & a\end{pmatrix}$，仍具有这种形式——它就是乘以$1/(a + bi)$的矩阵。所以$g$的雅可比矩阵在每一点都满足柯西-黎曼方程，由[[complex-analysis/analytic-functions#thm-cr-sufficient]]，$g$解析，且$g'(w) = 1/f'(g(w))$。
:::

## 默比乌斯变换

除线性映射$z\mapsto az + b$之外，最简单的共形映射是线性函数之商。

::: definition 默比乌斯变换 {#def-mobius}
**默比乌斯变换**（或称分式线性变换）是指映射

$$
T(z) = \frac{az + b}{cz + d}, \qquad a, b, c, d\in\C,\quad ad - bc\neq0,
$$

并把它看作扩充复平面$\C_\infty$上的映射：若$c\neq0$，规定$T(-d/c) = \infty$，$T(\infty) = a/c$；若$c = 0$，规定$T(\infty) = \infty$。
:::

条件$ad - bc\neq0$排除了常值映射。由于

$$
T'(z) = \frac{a(cz + d) - c(az + b)}{(cz + d)^2} = \frac{ad - bc}{(cz + d)^2}\neq0,
$$

$T$在$\C$中除极点$-d/c$以外的每一点处都共形（若借助$w = 1/z$来解释$\infty$处的角度，它在那里也共形）。从$w = \frac{az + b}{cz + d}$中解出$z$，得到逆映射$T^{-1}(w) = \frac{dw - b}{-cw + a}$，它仍是默比乌斯变换，所以每个默比乌斯变换都是$\C_\infty$到自身的双射。直接计算表明，默比乌斯变换的复合对应于它们的系数矩阵$\begin{pmatrix} a & b\\ c & d\end{pmatrix}$的乘积：默比乌斯变换在复合运算下构成一个**群**（[[abstract-algebra/groups]]），并且两个矩阵给出同一个映射，当且仅当其中一个是另一个的非零倍数。

每个默比乌斯变换都是三类简单映射的复合：**平移**$z\mapsto z + b$，**旋转伸缩**$z\mapsto az$，以及**反演**$z\mapsto1/z$。事实上，若$c = 0$，则$T(z) = \frac ad z + \frac bd$；若$c\neq0$，则

$$
T(z) = \frac{a}{c} + \frac{bc - ad}{c}\cdot\frac{1}{cz + d},
$$

即：先乘以$c$再加$d$，取倒数，乘以$\frac{bc - ad}{c}$，再加$\frac ac$。

::: theorem 圆与直线 {#thm-circles}
默比乌斯变换把$\C$中的每个圆或直线映为圆或直线（直线被看作过$\infty$的圆）。
:::

::: proof
圆或直线是如下形式的方程的解集：

$$
A\abs z^2 + \bar Bz + B\bar z + C = 0, \qquad A, C\in\R,\ B\in\C,\ \abs B^2 > AC,
$$

其中圆对应于$A\neq0$（$\abs{z - z_0}^2 = r^2$展开即为$\abs z^2 - \bar z_0z - z_0\bar z + \abs{z_0}^2 - r^2 = 0$），直线对应于$A = 0$（$\operatorname{Re}(\bar B z) = -C/2$）。由上面的分解，只需验证三类基本映射。平移和旋转伸缩是平面的相似变换，它们把圆映为圆，把直线映为直线。对反演$w = 1/z$，代入$z = 1/w$并乘以$\abs w^2$，得

$$
A + \bar B\bar w + Bw + C\abs w^2 = 0 ,
$$

这是同一形式的方程，只是$A$与$C$的角色互换，$B$换成了$\bar B$（条件$\abs B^2 > AC$不变）。所以像仍是圆或直线。
:::

该定理表明，过极点$-d/c$的圆被映为直线（它经过$\infty$），而其他的圆都被映为圆。在[[complex-analysis/complex-numbers]]一章的黎曼球面上，直线就是过$\infty$的圆，默比乌斯变换干脆就是把圆映为圆。

::: example 直线的反演 {#ex-invert-line}
求直线$\operatorname{Re} z = 1$在$w = 1/z$下的像。
::: solution
这条直线不经过$1/z$的极点$0$，所以它的像是一个过$1/\infty = 0$的圆。这个圆还包含$w = 1$（$z = 1$的像），并且由于直线关于$z\mapsto\bar z$对称，像关于实轴对称。过$0$和$1$且关于实轴对称的圆，圆心为$\frac12$，半径为$\frac12$。验证：对$z = 1 + iy$，

$$
w - \frac12 = \frac{1}{1 + iy} - \frac12 = \frac{1 - iy}{2(1 + iy)}, \qquad\text{所以}\qquad \left\lvert w - \frac12\right\rvert = \frac{\abs{1 - iy}}{2\abs{1 + iy}} = \frac12 .
$$

像是去掉点$0$的圆周$\abs{w - \frac12} = \frac12$（点$0$是$\infty$的像）。
:::
:::

::: quiz
圆周$\abs{z - 1} = 1$在$w = 1/z$下的像是什么？
- [ ] 圆周$\abs{w - 1} = 1$
- [ ] 一个过$0$的圆
- [x] 直线$\operatorname{Re} w = \tfrac12$
- [ ] 一条过$0$的直线
::: solution
该圆经过$1/z$的极点$0$，所以由[[#thm-circles]]，它的像是过$\infty$的圆，即一条直线。像上的两个点是$1/2$（$z = 2$的像）和$\frac{1}{1 + i} = \frac{1 - i}{2}$，它们的实部都是$\frac12$。所以像是直线$\operatorname{Re}w = \frac12$——这正是[[#ex-invert-line]]的逆过程，理应如此，因为$1/z$是它自身的逆（这里还要结合放缩$2$倍）。
:::
:::

默比乌斯变换有多少个？映射$\frac{az + b}{cz + d}$有四个系数，但只有三个自由度（把矩阵乘以常数不改变映射），而事实上三个点就能确定它。

::: theorem 三点确定一个默比乌斯变换 {#thm-three-points}
给定互不相同的$z_1, z_2, z_3\in\C_\infty$以及互不相同的$w_1, w_2, w_3\in\C_\infty$，恰有一个默比乌斯变换$T$，使得$T(z_k) = w_k$，$k = 1, 2, 3$。
:::

::: proof
**存在性。**对互不相同的有限点$z_1, z_2, z_3$，映射

$$
S(z) = \frac{(z - z_1)(z_2 - z_3)}{(z - z_3)(z_2 - z_1)}
$$ {#eq-cross-ratio}

是一个默比乌斯变换（它的系数为$a = z_2 - z_3$，$b = -z_1(z_2 - z_3)$，$c = z_2 - z_1$，$d = -z_3(z_2 - z_1)$，所以$ad - bc = (z_2 - z_3)(z_2 - z_1)(z_1 - z_3)\neq0$），并且$S(z_1) = 0$，$S(z_2) = 1$，$S(z_3) = \infty$。若某个$z_k$为$\infty$，就删去含它的两个因子。设$R$是对$w_k$作出的类似映射，则$T = R^{-1}\circ S$把$z_k$映为$w_k$。

**唯一性。**若$T_1$和$T_2$都满足要求，则$U = T_2^{-1}\circ T_1$是保持$z_1, z_2, z_3$不动的默比乌斯变换。用$S$作共轭，映射$V = S\circ U\circ S^{-1}$保持$0$、$1$和$\infty$不动。$\infty$不动迫使$c = 0$，所以$V(z) = \alpha z + \beta$；$0$不动给出$\beta = 0$，$1$不动给出$\alpha = 1$。所以$V$是恒等映射，从而$U$也是，于是$T_1 = T_2$。
:::

[[#eq-cross-ratio]]中的数$S(z)$称为**交比**$(z, z_1, z_2, z_3)$。由该定理可知，默比乌斯变换保持交比不变，并且四个点位于同一个圆或同一条直线上，当且仅当它们的交比是实数（因为$S$把过$z_1, z_2, z_3$的圆映为过$0, 1, \infty$的圆，即实轴）。

::: example 由三点确定的映射 {#ex-three-points}
求满足$T(0) = 1$，$T(1) = i$，$T(\infty) = -1$的默比乌斯变换，并确定上半平面的像。
::: solution
写$T(z) = \frac{az + b}{cz + d}$。$T(\infty) = a/c = -1$；规范化取$c = 1$，则$a = -1$。$T(0) = b/d = 1$，所以$b = d$。由$T(1) = \frac{-1 + d}{1 + d} = i$得$-1 + d = i + id$，所以$d(1 - i) = 1 + i$，$d = \frac{1 + i}{1 - i} = i$。因此

$$
T(z) = \frac{-z + i}{z + i} = \frac{i - z}{i + z} .
$$

实轴（过$0$、$1$、$\infty$的“圆”）被映为过$1$、$i$、$-1$的圆，即单位圆周。上半平面是连通的，且与实轴不相交，所以被映到单位圆周的一侧；由于$T(i) = 0$，这一侧是内部。所以$T$把上半平面共形地映到单位圆盘上。
:::
:::

这类映射中最著名的是**凯莱（Cayley）变换**$C(z) = \dfrac{z - i}{z + i}$。对实数$z$，点$i$和$-i$到$z$的距离相等，所以$\abs{C(z)} = 1$；当$\operatorname{Im} z > 0$时，$z$离$i$比离$-i$近，所以$\abs{C(z)} < 1$。因此$C$把上半平面映到单位圆盘上，且$C(i) = 0$。

::: widget complexmap
f: (z - i)/(z + i)
mode: grid
x: -3, 3
y: 0, 3
caption: 凯莱变换$\frac{z-i}{z+i}$作用于上半平面中的网格。水平线和竖直线都变成圆，它们都经过点$1$（$\infty$的像），并且仍然以直角相交。整个半平面被压进单位圆盘；实轴绕边界圆周一圈，点$i$落在圆心。
:::

## 圆盘的自同构与施瓦茨引理

哪些共形映射把单位圆盘$\mathbb D = \set{z : \abs z < 1}$映到自身上？旋转$z\mapsto e^{i\theta}z$是这样的映射；在[[complex-analysis/complex-numbers]]一章中我们还见过另一族：对$\abs a < 1$，

$$
\varphi_a(z) = \frac{z - a}{1 - \bar az}
$$

满足$\abs{1 - \bar az}^2 - \abs{z - a}^2 = (1 - \abs a^2)(1 - \abs z^2)$，所以当$\abs z < 1$时$\abs{\varphi_a(z)} < 1$，而当$\abs z = 1$时它$=1$。它是满足$\varphi_a(a) = 0$的默比乌斯变换，并且直接验证可知$\varphi_{-a}$是它的逆（$\varphi_{-a}(\varphi_a(z)) = z$）。所以$\varphi_a$把$\mathbb D$共形地映到自身上，并把$a$移到圆心。要证明没有其他的自同构，关键是一个简单而深刻的引理。

::: lemma 施瓦茨引理 {#lem-schwarz}
设$f\colon\mathbb D\to\mathbb D$解析，且$f(0) = 0$，则对所有$z\in\mathbb D$有$\abs{f(z)}\le\abs z$，并且$\abs{f'(0)}\le1$。若对某个$z_0\neq0$有$\abs{f(z_0)} = \abs{z_0}$，或者$\abs{f'(0)} = 1$，则对某个实数$\theta$有$f(z) = e^{i\theta}z$。
:::

::: proof
由于$f(0) = 0$，函数$g(z) = f(z)/z$以$0$为可去奇点，且$g(0) = f'(0)$（$f$的泰勒级数没有常数项）；所以$g$在$\mathbb D$上解析。固定$0 < r < 1$。在圆周$\abs z = r$上，$\abs{g(z)} = \abs{f(z)}/r < 1/r$。由最大模原理（[[complex-analysis/cauchy-theorem#thm-max]]），当$\abs z\le r$时$\abs{g(z)} < 1/r$。令$r\to1$，得在$\mathbb D$上$\abs{g(z)}\le1$，这就是$\abs{f(z)}\le\abs z$以及$\abs{f'(0)} = \abs{g(0)}\le1$。若在$\mathbb D$的某一点处等式$\abs{g(z_0)} = 1$成立（或者$z_0\neq0$且$\abs{f(z_0)} = \abs{z_0}$，或者$z_0 = 0$且$\abs{f'(0)} = 1$），则$\abs g$在$\mathbb D$内部取到最大值，所以$g$是模为$1$的常数，设为$e^{i\theta}$，从而$f(z) = e^{i\theta}z$。
:::

::: theorem 圆盘的自同构 {#thm-disc-auto}
$\mathbb D$到自身上的共形映射恰好是映射

$$
f(z) = e^{i\theta}\,\frac{z - a}{1 - \bar az}, \qquad \theta\in\R,\ \abs a < 1 .
$$
:::

::: proof
由上面的讨论，这些映射都是$\mathbb D$上的共形双射。反之，设$f\colon\mathbb D\to\mathbb D$是共形双射，令$a = f^{-1}(0)$，并令$h = f\circ\varphi_a^{-1} = f\circ\varphi_{-a}$。则$h$是$\mathbb D$上的共形双射，$h(0) = f(a) = 0$，它的逆$h^{-1}$也是如此（由[[#thm-inverse]]，$h^{-1}$解析）。对$h$和$h^{-1}$应用施瓦茨引理，得$\abs{h(z)}\le\abs z$以及$\abs z = \abs{h^{-1}(h(z))}\le\abs{h(z)}$。所以对所有$z$有$\abs{h(z)} = \abs z$，由等号成立的情形，$h(z) = e^{i\theta}z$。因此$f = h\circ\varphi_a$，即$f(z) = e^{i\theta}\varphi_a(z)$。
:::

同样的思想，再结合一个困难的存在性论证，就给出了这一学科的核心定理。我们只叙述而不证明它；利用正规族理论的完整证明见 Stein 与 Shakarchi《复分析》（*Complex Analysis*）第8章，以及 Ahlfors《复分析》（*Complex Analysis*）第6章。

::: theorem 黎曼映射定理 {#thm-riemann}
设$D\subsetneq\C$是单连通区域，$z_0\in D$，则存在唯一的从$D$到单位圆盘上的共形映射$f$，使得$f(z_0) = 0$且$f'(z_0) > 0$。
:::

至少唯一性可以由我们已经证明的结论推出：若$f$和$g$是两个这样的映射，则$f\circ g^{-1}$是圆盘的一个保持$0$不动的自同构，所以由[[#thm-disc-auto]]，它是旋转$e^{i\theta}z$，而关于导数的条件迫使$e^{i\theta} = 1$。条件$D\neq\C$是必不可少的：由刘维尔定理，不存在从$\C$到圆盘上的共形映射（[[#exr-plane-disc]]）。值得注意的是，该定理表明平面的任意两个单连通真子区域——正方形、割缝平面、分形雪花的内部——都是共形等价的。

## 共形映射的构造

在实际中，给定区域之间的共形映射是由几个标准映射复合而成的。下面是这个工具箱。

- **默比乌斯变换**把圆盘和半平面映为圆盘和半平面；例如凯莱变换把上半平面映到圆盘上。
- **幂函数**$z\mapsto z^\alpha$（取主支）可以张开或收拢角形区域：只要$\alpha\beta\le2\pi$，角形区域$\set{0 < \arg z < \beta}$就被映到角形区域$\set{0 < \arg w < \alpha\beta}$上。特别地，$z\mapsto z^{\pi/\beta}$把张角为$\beta$的角形区域映到上半平面上。
- **指数函数**把水平带形区域$\set{0 < \operatorname{Im} z < \pi}$映到上半平面上，而对数函数把它映回去（[[complex-analysis/elementary-functions]]）。
- **茹科夫斯基（Joukowski）映射**$J(z) = \frac12\big(z + \frac1z\big)$，见下文。

::: example 从象限和带形区域到圆盘 {#ex-quadrant}
求把下列区域映到单位圆盘上的共形映射：(a)象限$Q = \set{z : \operatorname{Re} z > 0,\ \operatorname{Im} z > 0}$；(b)带形区域$S = \set{z : 0 < \operatorname{Im} z < \pi}$。
::: solution
(a)$z\mapsto z^2$把$Q$（角形区域$0 < \arg z < \frac\pi2$）双射地映到上半平面（角形区域$0 < \arg w < \pi$）上，然后凯莱变换把半平面映到圆盘上。所以

$$
f(z) = \frac{z^2 - i}{z^2 + i}
$$

满足要求；例如$f(1 + i) = \frac{2i - i}{2i + i} = \frac13$，位于圆盘内。

(b)$z\mapsto e^z$把$S$映到上半平面上，再用凯莱变换完成：$g(z) = \dfrac{e^z - i}{e^z + i}$。边界直线$\operatorname{Im} z = 0$和$\operatorname{Im} z = \pi$先被映为正实轴和负实轴，然后被映为单位圆周上被$\pm1$分开的两段圆弧；带形区域的两端$\operatorname{Re} z\to\mp\infty$分别被映到$-1$和$1$。
:::
:::

::: example 半圆盘 {#ex-half-disc}
把上半圆盘$H = \set{z : \abs z < 1,\ \operatorname{Im} z > 0}$共形地映到上半平面上。
::: solution
$H$的边界由线段$[-1, 1]$和上半圆周组成，它们在$\pm1$处以直角相交。把$-1$映为$0$、把$1$映为$\infty$的默比乌斯映射会把这两段边界弧都变成从$0$出发的射线，并且由共形性，这两条射线仍以直角相交。取$T(z) = \frac{1 + z}{1 - z}$。它把$(-1, 1)$映到正实轴上（$T(0) = 1$，且$T$在$(-1,1)$上递增），把半圆周映到从$0$出发、经过$T(i) = \frac{1 + i}{1 - i} = i$的射线上，即正虚轴。所以$T$把$H$映到以这两条射线为边界的四个象限之一，由于$T(\frac i2) = \frac{3 + 4i}{5}$位于第一象限，$T(H)$就是第一象限。平方运算把该象限映到上半平面上，所以

$$
f(z) = \Big(\frac{1 + z}{1 - z}\Big)^2
$$

把$H$共形地映到上半平面上。
:::
:::

**茹科夫斯基映射**$J(z) = \frac12\big(z + \frac1z\big)$是经典翼型理论的关键。写$z = re^{it}$，得

$$
J(re^{it}) = \frac12\Big(r + \frac1r\Big)\cos t + \frac i2\Big(r - \frac1r\Big)\sin t,
$$

所以当$r\neq1$时，圆周$\abs z = r$被映为半轴为$\frac12(r + \frac1r)$和$\frac12\abs{r - \frac1r}$、焦点为$\pm1$的椭圆，而单位圆周被压扁成线段$[-1, 1]$，并被走过两次。射线$\arg z = t$被映为具有相同焦点的双曲线。由于$J(z) = J(1/z)$，并且$J'(z) = \frac12(1 - z^{-2})$只在$\pm1$处为零，$J$把外部区域$\set{\abs z > 1}$共形地映到$\C\setminus[-1,1]$上。

::: widget complexmap
f: (z + 1/z)/2
mode: polar
x: -2.5, 2.5
y: -2.5, 2.5
caption: 茹科夫斯基映射$\frac12(z + 1/z)$作用于极坐标网格。圆周$\lvert z\rvert = r$变成以$\pm1$为焦点的共焦椭圆，射线变成共焦双曲线，它们以直角相交。当$r$减小到$1$时，椭圆被压扁成割缝$[-1,1]$。一个经过$-1$、包围点$1$且圆心稍有偏移的圆，被映成茹科夫斯基翼型那种弯曲而带尖端的轮廓。
:::

## 调和函数与边值问题

共形映射在应用中之所以重要，是因为它们保持调和性。

::: theorem 拉普拉斯方程的共形不变性 {#thm-harmonic-invariance}
设$f\colon D\to D'$解析，$h$在$D'$上调和，则$h\circ f$在$D$上调和。
:::

::: proof
调和性是局部性质，所以固定$z_0\in D$以及以$f(z_0)$为圆心的圆盘$B\subseteq D'$。由[[complex-analysis/analytic-functions#thm-conjugate]]，存在$B$上的解析函数$G$，使得在$B$上$h = \operatorname{Re}G$。在包含$z_0$的开集$f^{-1}(B)$上，$h\circ f = \operatorname{Re}(G\circ f)$是一个解析函数的实部，由[[complex-analysis/analytic-functions#thm-harmonic]]，它是调和的（由[[complex-analysis/cauchy-theorem#thm-derivatives]]，它的各阶偏导数都连续）。
:::

所以，要解**狄利克雷（Dirichlet）问题**——在区域上求一个具有给定边界值的调和函数——我们可以把该区域共形地映到一个已知解的区域上，在那里求解，再作复合。最基本的构件位于上半平面中：$\Arg z$在那里调和（它是$\Log z$的虚部），在正实轴上等于$0$，在负实轴上等于$\pi$。因此

$$
u(z) = \frac1\pi\Arg z
$$

是上半平面中边界值在$x > 0$时为$0$、在$x < 0$时为$1$的调和函数。更一般地，$\frac{1}{\pi}\Arg(z - x_0)$在$x_0$处有一个跳跃。

::: example 半平面上的温度 {#ex-dirichlet-halfplane}
在上半平面中求一个有界调和函数$u$，使得当$-1 < x < 1$时$u(x) = 1$，当$\abs x > 1$时$u(x) = 0$，并计算$u(i)$。
::: solution
把两个跳跃组合起来：

$$
u(z) = \frac1\pi\big(\Arg(z - 1) - \Arg(z + 1)\big).
$$

它是调和的（它是$\frac1\pi(\Log(z - 1) - \Log(z + 1))$的虚部，而后者在上半平面中解析），并且取值于$[0,1]$。在实轴上：当$x > 1$时，两个辐角都是$0$，所以$u = 0$；当$-1 < x < 1$时，$\Arg(x - 1) = \pi$，$\Arg(x + 1) = 0$，所以$u = 1$；当$x < -1$时，两个辐角都是$\pi$，所以$u = 0$。从几何上看，$\pi u(z)$是线段$[-1, 1]$在$z$处所张的角。在$z = i$处，该线段所张的角是直角（$\Arg(i - 1) = \frac{3\pi}{4}$，$\Arg(i + 1) = \frac\pi4$），所以$u(i) = \frac12$。
:::
:::

要在单位圆盘中解类似的问题（边界值在上半圆周上为$1$，在下半圆周上为$0$），可以用凯莱型映射的逆$w = i\frac{1 + z}{1 - z}$把圆盘映到半平面：它把上半圆周映为负实轴，把下半圆周映为正实轴。于是$u(z) = \frac1\pi\Arg\big(i\frac{1 + z}{1 - z}\big)$。在圆心处，$u(0) = \frac{1}{\pi}\Arg i = \frac12$——这正是边界值的平均值，与平均值性质的要求一致。

::: application 绕圆柱的流动与机翼的升力
在[[complex-analysis/analytic-functions]]一章的理想流体模型中，复势

$$
F(z) = U\Big(z + \frac{a^2}{z}\Big)
$$

描述了速度为$U$的均匀流绕过半径为$a$的圆柱的流动：当$\abs z$很大时，$F\approx Uz$；在$\abs z = a$上，流函数$\psi = \operatorname{Im}F = U\big(y - \frac{a^2y}{x^2 + y^2}\big)$为零，所以这个圆周是一条流线，流体沿着它绕流而过。与茹科夫斯基映射复合，就把这一流动变换为绕翼型的流动；再加上一个环量项$\frac{\Gamma}{2\pi i}\Log z$（其选取使流动平滑地离开尖锐的后缘），就得到机翼单位翼展上的升力$\rho U\Gamma$，其中$\rho$是空气的密度（库塔-茹科夫斯基定理）。马丁·库塔（Martin Kutta）和尼古拉·茹科夫斯基（Nikolai Zhukovsky）在1902年至1910年间建立了这一理论，这是第一个定量的升力理论。
:::

::: widget contour
f: y - y/(x^2 + y^2)
x: -3, 3
y: -2, 2
levels: 24
caption: 绕单位圆柱流动的流线$\psi = \text{常数}$，其中$\psi = \operatorname{Im}\big(z + 1/z\big) = y - \frac{y}{x^2+y^2}$。在远处，流线是水平的（均匀流）；在圆柱附近，流线分开并绕过圆柱，而单位圆周本身就是等值线$\psi = 0$。流动在圆柱的顶部和底部最快，那里的流线最密集。
:::

::: warning 共形不等于处处解析
共形性可能在孤立点处不成立，这在边界上很要紧。映射$z\mapsto z^2$是开象限到半平面上的共形双射，但在角点$0$处，它把直角加倍成平角——而这恰恰是它有用的原因。在$f'$为零或无定义的点处，不要指望边界上的角度保持不变。此外，处处满足$f'\neq0$的解析函数未必是单射：$e^z$的导数处处不为零，但它取每个值无穷多次。局部共形性（[[#thm-conformal]]）并不等于整体的双射性。
:::

::: history
伯恩哈德·黎曼（Bernhard Riemann）在1851年的博士论文中叙述了映射定理，其证明基于“狄利克雷原理”，而卡尔·魏尔斯特拉斯（Karl Weierstrass）在1870年对这一原理的有效性提出了质疑。第一个完整的证明由威廉·福格·奥斯古德（William Fogg Osgood）于1900年给出；保罗·克贝（Paul Koebe）和康斯坦丁·卡拉泰奥多里（Constantin Carathéodory）在1912年前后给出了另外的证明，并且卡拉泰奥多里证明了：对于由若尔当曲线围成的区域，映射可以延拓为闭包之间的同胚。如今大多数教材所采用的、借助一个极值问题的简短论证，是利波特·费耶尔（Lipót Fejér）和弗里杰什·里斯（Frigyes Riesz）于1922年发现的。奥古斯特·费迪南德·默比乌斯（August Ferdinand Möbius）在19世纪50年代研究了以他命名的变换，作为他的圆几何的一部分；尼古拉·茹科夫斯基（Nikolai Zhukovsky，又拼作 Joukowski）于1910年引入了他的翼型。
:::

## 后续内容

共形映射把复分析与几何和物理联系了起来。拉普拉斯方程及其边值问题将在[[pde/laplace-equation]]一章中展开，在那里泊松积分公式显式地给出圆盘中的解。作用在圆盘和半平面上的默比乌斯群，是双曲平面的等距变换群，而双曲平面是一种常负曲率的几何（[[differential-geometry/geodesics-gauss-bonnet]]）。黎曼曲面以及黎曼映射定理的深远推广——单值化定理，属于复分析和几何的研究生课程。

::: summary
- 解析函数在$f'\neq0$的点处都是共形的（保持角度和定向）；在$f'$的$k - 1$阶零点处，角度被乘以$k$。
- 在$f'(z_0)\neq0$的点附近，$f$有局部的解析逆映射，其导数为$1/f'$；区域之间的共形映射是解析双射，它的逆映射也是解析的。
- 默比乌斯变换$\frac{az + b}{cz + d}$（$ad - bc\neq0$）是$\C_\infty$上的共形双射；它们构成一个群，把圆和直线映为圆和直线，并且由三个点的像唯一确定。
- 凯莱变换$\frac{z - i}{z + i}$把上半平面映到圆盘上；圆盘的自同构是$e^{i\theta}\frac{z - a}{1 - \bar az}$，这是借助施瓦茨引理$\abs{f(z)}\le\abs z$证明的。
- 黎曼映射定理：除$\C$以外的每个单连通区域都与圆盘共形等价。
- 把幂函数、指数函数、默比乌斯映射和茹科夫斯基映射复合起来，可以把标准区域相互变换。
- 调和函数在解析映射下保持调和，所以狄利克雷问题可以搬到半平面上，在那里$\frac1\pi\Arg(z - x_0)$解决了基本的跳跃问题。
:::

## 习题

::: exercise 凯莱变换 {level=1 check="1/3"}
设$C(z) = \dfrac{z - i}{z + i}$。计算$\abs{C(2i)}$。
::: solution
$C(2i) = \dfrac{2i - i}{2i + i} = \dfrac{i}{3i} = \dfrac13$，所以$\abs{C(2i)} = \frac13$，位于单位圆盘内，上半平面中的点理应如此。
:::
:::

::: exercise 不动点 {level=1}
求默比乌斯变换$T(z) = \dfrac{2z + 1}{z + 2}$的不动点，并验证$T$把单位圆盘映到自身上。
::: solution
$T(z) = z$即$2z + 1 = z^2 + 2z$，也就是$z^2 = 1$：不动点为$\pm1$。当$\abs z = 1$时，$\abs{2z + 1} = \abs{z + 2}$：事实上$\abs{2z + 1}^2 = 4 + 4\operatorname{Re}z + 1$，$\abs{z + 2}^2 = 1 + 4\operatorname{Re}z + 4$。所以$T$把单位圆周映到自身上，又由于$T(0) = \frac12$位于圆内，它把圆盘映到圆盘上。（用正文中的记号，它就是$\varphi_{-1/2}$。）
:::
:::

::: exercise 临界点 {level=1}
求$f(z) = z^3 - 3z$不共形的所有点，以及在这些点处角度被乘的倍数。$g(z) = e^{z^2}$在哪些点处不共形？
::: solution
$f'(z) = 3(z^2 - 1)$在$z = \pm1$处为零，在这两点处$f(z) - f(\pm1) = (z \mp 1)^2(z \pm 2)$有二重零点：角度加倍。对$g$，$g'(z) = 2ze^{z^2}$只在$0$处为零，在该点$g(z) - 1 = z^2 + \cdots$有二重零点，所以$0$处的角度加倍。
:::
:::

::: exercise 直线的像 {level=2 check="1/2"}
证明$w = 1/z$把直线$\operatorname{Im} z = -1$映为一个圆，并求其半径。
::: solution
这条直线不经过$0$，所以它的像是一个过$0$的圆。像包含$1/(-i) = i$。直线关于$z\mapsto-\bar z$（关于虚轴的反射）对称，而$1/z$把这一对称变为反射$w\mapsto-\bar w$，所以像关于虚轴对称。因此像是以$[0, i]$为直径的圆：圆心为$\frac i2$，半径为$\frac12$。验证：对$z = x - i$，$w - \frac i2 = \frac{1}{x - i} - \frac i2 = \frac{2 - ix - 1}{2(x - i)} = \frac{1 - ix}{2(x - i)}$，其模为$\frac{\sqrt{1 + x^2}}{2\sqrt{x^2 + 1}} = \frac12$。
:::
:::

::: exercise 由三点确定的映射 {level=2}
求把$-1, 0, 1$分别映为$-i, 1, i$的默比乌斯变换。它把上半平面映到哪里？
::: solution
写$T(z) = \frac{az + b}{cz + d}$。由$T(0) = 1$得$b = d$。规范化取$b = d = 1$。由$T(1) = i$得$a + 1 = i(c + 1)$。由$T(-1) = -i$得$-a + 1 = -i(-c + 1)$，即$1 - a = ic - i$。两式相加：$2 = 2ic$，所以$c = -i$，进而$a = i(1 - i) - 1 = i$。因此$T(z) = \frac{iz + 1}{-iz + 1} = \frac{1 + iz}{1 - iz}$。实轴被映为过$-i, 1, i$的圆，即单位圆周。由于$T(i) = \frac{1 - 1}{1 + 1} = 0$，上半平面被映到单位圆盘上。
:::
:::

::: exercise 一个边值问题 {level=2 check="1/4"}
设$u$是上半平面中的有界调和函数，其边界值在负实轴上为$1$，在正实轴上为$0$。求$u(1 + i)$。
::: solution
由正文，$u(z) = \frac1\pi\Arg z$。在$1 + i$处，$\Arg(1+i) = \frac\pi4$，所以$u(1 + i) = \frac14$。（这个值是从$1 + i$看去，负实轴所占“视角”的比例。）
:::
:::

::: exercise 茹科夫斯基椭圆 {level=2 check="5/4"}
求圆周$\abs z = 2$在$J(z) = \frac12\big(z + \frac1z\big)$下的像，并给出它的半长轴。
::: solution
对$z = 2e^{it}$，$J(z) = \frac12\big(2e^{it} + \frac12e^{-it}\big) = \frac54\cos t + \frac34 i\sin t$。它把椭圆$\frac{u^2}{(5/4)^2} + \frac{v^2}{(3/4)^2} = 1$描画一遍，半轴为$\frac54$和$\frac34$；焦点位于$\pm\sqrt{(5/4)^2 - (3/4)^2} = \pm1$。
:::
:::

::: exercise 施瓦茨引理的一个推论 {level=2}
设$f\colon\mathbb D\to\mathbb D$解析，$f(0) = 0$且$f(\frac12) = \frac12$。求$f$。是否存在解析函数$g\colon\mathbb D\to\mathbb D$，使得$g(0) = 0$且$g(\frac12) = \frac34$？
::: solution
由施瓦茨引理，$\abs{f(z)}\le\abs z$，且在非零点$z_0 = \frac12$处等号成立。所以$f(z) = e^{i\theta}z$，而$f(\frac12) = \frac12$迫使$e^{i\theta} = 1$：$f(z) = z$。这样的$g$不存在，因为施瓦茨引理要求$\abs{g(\frac12)}\le\frac12 < \frac34$。
:::
:::

::: exercise 半平面的自同构 {level=3}
设$a, b, c, d$是实数，$ad - bc > 0$，$T(z) = \dfrac{az + b}{cz + d}$。证明$\operatorname{Im}T(z) = \dfrac{(ad - bc)\operatorname{Im}z}{\abs{cz + d}^2}$，并由此推出$T$把上半平面$\mathbb H$共形地映到自身上。（事实上，这些就是$\mathbb H$的全部共形自同构；这可以借助凯莱变换由[[#thm-disc-auto]]推出。）
::: solution
分子分母同乘以$\overline{cz + d} = c\bar z + d$（系数是实数）：

$$
T(z) = \frac{(az + b)(c\bar z + d)}{\abs{cz + d}^2} = \frac{ac\abs z^2 + adz + bc\bar z + bd}{\abs{cz + d}^2}.
$$

$ac\abs z^2$和$bd$两项是实数，而$\operatorname{Im}(adz + bc\bar z) = (ad - bc)\operatorname{Im}z$。这就证明了该公式。若$\operatorname{Im}z > 0$，则$cz + d\neq0$（因为$c, d$是实数且不全为零），并且$\operatorname{Im}T(z) > 0$；所以$T(\mathbb H)\subseteq\mathbb H$。逆映射$T^{-1}(w) = \frac{dw - b}{-cw + a}$的系数也是实数，且行列式$da - bc > 0$，所以同样有$T^{-1}(\mathbb H)\subseteq\mathbb H$。因此$T$是$\mathbb H$到自身上的双射，解析且$T'\neq0$，即$T$是一个共形自同构。
:::
:::

::: exercise 平面不是圆盘 {#exr-plane-disc level=3}
证明不存在从$\C$到单位圆盘$\mathbb D$上的共形映射，事实上也不存在从$\C$到$\mathbb D$内的非常数解析映射。为什么这与黎曼映射定理不矛盾？
::: solution
解析映射$f\colon\C\to\mathbb D$是满足$\abs f < 1$的整函数，因而由刘维尔定理（[[complex-analysis/cauchy-theorem#thm-liouville]]）是常数。特别地，它不可能是到$\mathbb D$上的双射。这并不矛盾：黎曼映射定理只适用于单连通区域$D\neq\C$。从拓扑上看，$\C$与$\mathbb D$是一样的（它们是同胚的，例如通过$z\mapsto\frac{z}{1 + \abs z}$），但从共形的角度看它们是不同的——复分析能区分它们，而拓扑学不能。
:::
:::
