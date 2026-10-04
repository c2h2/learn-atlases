测量员使用的**求积仪**是一种小型机械臂，装有一根描迹针和一个测量轮。让描迹针沿地图上一块田地的边界绕行一周，读出测量轮上的读数，就知道了这块田地的面积。这台仪器从未进入区域内部——它怎么会知道面积呢？答案是一个定理：它把平面区域上的积分转化为沿区域边界的积分。

这个思想你以前见过。微积分基本定理说$\int_a^b F'(x)\,dx = F(b) - F(a)$：导数在区间上的积分只取决于它在区间边界——即两个端点——上的值。曲线积分基本定理（[[multivariable/line-integrals#thm-ftli]]）对曲线说的是同一件事。**格林（Green）公式**则是平面区域上的版本：

$$
\oint_{\partial D} P\,dx + Q\,dy = \iint_D\left(\pdv{Q}{x} - \pdv{P}{y}\right)dA .
$$

左边是向量场$(P, Q)$沿边界$\partial D$的环量；右边是该场的某个导数在$D$上的积分。本章将证明这个定理，用它来计算曲线积分、二重积分和面积，把被积函数解释为环量的密度，导出涉及散度的第二种形式——“通量”形式，最后解决[[multivariable/line-integrals]]一章遗留的问题：$P_y = Q_x$在什么情况下能保证一个场是保守场？

## 定向与定理的叙述

如果一条闭曲线不与自身相交，就称它是**简单**的：它有一个除$\mathbf{r}(a) = \mathbf{r}(b)$之外一一的参数化$\mathbf{r}\colon[a,b]\to\R^2$。圆、椭圆、正方形的边界和三角形的边界都是简单闭曲线；“8”字形曲线则不是。拓扑学中的**若尔当（Jordan）曲线定理**说：简单闭曲线$C$恰好把平面分成两个连通的部分，即有界的**内部**和无界的**外部**，$C$是它们的公共边界。这听起来显而易见，但对任意连续曲线而言，它的证明出人意料地困难；对于本章中的分段光滑曲线，你可以直接承认它。

这个定理把沿$\partial D$的环量与$D$上的积分联系起来，所以我们必须说明沿边界朝哪个方向绕行。

::: definition 正向 {#def-positive-orientation}
设$D$是有界区域，其边界$\partial D$由有限条互不相交的分段光滑简单闭曲线组成。如果沿每条边界曲线行进时$D$总在左侧，就称边界取**正向**：在$\partial D$上单位切向量为$\mathbf{T} = (T_1, T_2)$的每一点处，向量$(-T_2, T_1)$（即把切向量逆时针旋转一个直角）指向$D$的内部。等价地说，**单位外法向量**为$\mathbf{n} = (T_2, -T_1)$。
:::

对圆盘或正方形，正向就是逆时针方向。对有洞的区域，例如圆环$1\le x^2 + y^2\le 4$，外圆按逆时针方向绕行，内圆则按**顺时针**方向绕行——沿顺时针方向绕洞行走，圆环才会始终在你的左侧。

::: theorem 格林公式 {#thm-green}
设$D$是平面上的有界区域，其边界$\partial D$由有限条分段光滑的简单闭曲线组成，并取正向。若$P$和$Q$在包含$D$和$\partial D$的某个开集上具有连续偏导数，则

$$
\oint_{\partial D} P\,dx + Q\,dy = \iint_D\left(\pdv{Q}{x} - \pdv{P}{y}\right)dA .
$$ {#eq-green}
:::

用向量记号，令$\mathbf{F} = (P, Q)$，则左边是$\oint_{\partial D}\mathbf{F}\cdot d\mathbf{r} = \oint_{\partial D}\mathbf{F}\cdot\mathbf{T}\,ds$，即$\mathbf{F}$沿边界的环量。

::: quiz
圆环$1 \le x^2 + y^2 \le 4$的边界取哪种定向是正向？
- [ ] 两个圆都取逆时针方向
- [ ] 两个圆都取顺时针方向
- [x] 外圆取逆时针方向，内圆取顺时针方向
- [ ] 外圆取顺时针方向，内圆取逆时针方向
::: solution
区域必须始终在你的左侧。在外圆上，这意味着按逆时针方向走。在内圆上，圆环位于圆的**外面**，所以必须按顺时针方向走，才能让圆环保持在左侧。[[#ex-annulus]]验证了正是这种定向使格林公式成立。
:::
:::

## 证明

我们对最常见的区域完整地证明这个定理，然后说明如何推广。回忆[[multivariable/multiple-integrals]]一章：若

$$
D = \set{(x, y) : a\le x\le b,\; g_1(x)\le y\le g_2(x)}
$$

其中$g_1\le g_2$是连续函数，则称$D$为**I型**区域；若$D = \set{(x,y) : c\le y\le d,\; h_1(y)\le x\le h_2(y)}$，则称$D$为**II型**区域。我们假定这些边界函数是分段$C^1$的，从而$\partial D$分段光滑。圆盘、矩形和三角形同时属于这两种类型。

::: proof
格林公式[[#eq-green]]是两个独立的恒等式之和：

$$
\oint_{\partial D} P\,dx = -\iint_D\pdv{P}{y}\,dA \qquad\text{和}\qquad \oint_{\partial D}Q\,dy = \iint_D\pdv{Q}{x}\,dA,
$$ {#eq-green-halves}

我们对I型区域证明第一个恒等式，对II型区域证明第二个恒等式。于是定理对同时属于两种类型的每个区域都成立。

*I型区域上关于$P$的恒等式*。取正向的边界由四部分组成：下方的图像$C_1$，按$\mathbf{r}(x) = (x, g_1(x))$，$a\le x\le b$从左向右走；直线$x = b$上的竖直线段$C_2$，向上走；上方的图像$C_3$，从右向左走；以及$x = a$上的竖直线段$C_4$，向下走。（两条竖直线段都可能退化为一个点。）在$C_2$和$C_4$上$x$是常数，所以$dx = 0$，它们对$\oint P\,dx$没有贡献。在$C_1$上，$dx$就是参数的增量；而$C_3$是图像$(x, g_2(x))$的反向，所以由[[multivariable/line-integrals#thm-orientation]]，

$$
\oint_{\partial D}P\,dx = \int_a^b P(x, g_1(x))\,dx - \int_a^b P(x, g_2(x))\,dx = -\int_a^b\Bigl[P(x, g_2(x)) - P(x, g_1(x))\Bigr]dx .
$$

另一方面，由富比尼（Fubini）定理（[[multivariable/multiple-integrals#thm-fubini]]）以及关于$y$的微积分基本定理（由于$P_y$连续，它适用），

$$
\iint_D\pdv{P}{y}\,dA = \int_a^b\int_{g_1(x)}^{g_2(x)}\pdv{P}{y}(x, y)\,dy\,dx = \int_a^b\Bigl[P(x, g_2(x)) - P(x, g_1(x))\Bigr]dx .
$$

比较以上两式，就证明了[[#eq-green-halves]]中的第一个恒等式。

*II型区域上关于$Q$的恒等式*。这时边界由向上走（$y$从$c$到$d$）的右侧图像$x = h_2(y)$、向下走的左侧图像$x = h_1(y)$，以及两条水平线段组成，在水平线段上$dy = 0$。因此

$$
\oint_{\partial D}Q\,dy = \int_c^d Q(h_2(y), y)\,dy - \int_c^d Q(h_1(y), y)\,dy = \int_c^d\int_{h_1(y)}^{h_2(y)}\pdv{Q}{x}\,dx\,dy = \iint_D\pdv{Q}{x}\,dA .
$$

把两个恒等式相加，就对同时属于两种类型的区域证明了格林公式。
:::

**定理的推广。**设$D$被一条线段切成两块$D_1$和$D_2$，每一块都满足格林公式。把$D_1$和$D_2$上的公式相加，二重积分加起来就是$D$上的积分。在边界一侧，切口出现两次——一次在$\partial D_1$中，一次在$\partial D_2$中——而且绕行方向**相反**（每一块都必须保持在左侧），所以由[[multivariable/line-integrals#thm-orientation]]，这两部分贡献相互抵消，剩下的恰好是沿$\partial D$的环量。由归纳法，对每个能切成有限个同时属于两种类型的区域的区域，格林公式都成立。（事实上，关于$P$的恒等式只需要把区域分解成I型的小块，关于$Q$的恒等式只需要分解成II型的小块，而且这两种分解可以不同。）这涵盖了所有多边形以及你可能遇到的每一个有洞的区域：例如，圆环可以被两条坐标轴切成四个四分之一圆环。定理在上面所叙述的一般性下成立，即对由有限条分段光滑简单闭曲线围成的任何区域都成立，但一般情形的证明需要用到逼近论证；参见 Apostol 的 *Calculus* 第二卷第11章。

::: warning 场必须在整个区域上光滑
格林公式要求$P$和$Q$在$D$的**每一点**处都是$C^1$的，而不只是在边界上。[[multivariable/line-integrals#ex-vortex]]中的涡旋场$\mathbf{F} = \left(\frac{-y}{x^2+y^2}, \frac{x}{x^2+y^2}\right)$在其有定义的地方都满足$Q_x - P_y = 0$，但它沿单位圆的环量却是$2\pi$而不是$0$。这并不矛盾：该场在原点处没有定义，而原点位于圆盘内部，所以定理不能用于这个圆盘。但定理确实适用于避开原点的区域，并由此得出一些引人注目的结论（[[#ex-vortex-again]]）。
:::

## 格林公式的应用

格林公式可以双向使用：难以计算的曲线积分可能变成容易的二重积分，反之亦然。

::: example 无法直接计算的曲线积分 {#ex-impossible}
计算$\displaystyle\oint_C\bigl(e^{x^2} - y^3\bigr)\,dx + \bigl(x^3 + \ln(1 + y^2)\bigr)\,dy$，其中$C$是按逆时针方向绕行的圆$x^2 + y^2 = 4$。
::: solution
将圆参数化会得到$\int e^{4\cos^2t}\sin t\,\dots\,dt$这样的积分，它们没有初等原函数。但$P = e^{x^2} - y^3$和$Q = x^3 + \ln(1+y^2)$在整个平面上都是$C^1$的，并且

$$
\pdv{Q}{x} - \pdv{P}{y} = 3x^2 - (-3y^2) = 3(x^2 + y^2).
$$

麻烦的项$e^{x^2}$（只含$x$的函数，对$y$求导）和$\ln(1+y^2)$（只含$y$的函数，对$x$求导）都消失了。由格林公式，并利用极坐标（[[multivariable/multiple-integrals#eq-polar]]），

$$
\oint_C P\,dx + Q\,dy = \iint_{x^2+y^2\le4}3(x^2+y^2)\,dA = \int_0^{2\pi}\int_0^2 3r^2\cdot r\,dr\,d\theta = 2\pi\cdot\frac{3\cdot 2^4}{4} = 24\pi .
$$
:::
:::

::: example 有洞的区域 {#ex-annulus}
对$\mathbf{F} = (-y^3, x^3)$在圆环$D\colon 1\le x^2+y^2\le4$上验证格林公式。
::: solution
*二重积分*。$Q_x - P_y = 3x^2 + 3y^2$，所以

$$
\iint_D 3(x^2 + y^2)\,dA = \int_0^{2\pi}\int_1^2 3r^3\,dr\,d\theta = 2\pi\cdot\frac34\bigl(2^4 - 1^4\bigr) = \frac{45\pi}{2}.
$$

*曲线积分*。在按逆时针方向绕行的半径为$\rho$的圆$\mathbf{r}(t) = (\rho\cos t, \rho\sin t)$上，被积函数为$(-\rho^3\sin^3t)(-\rho\sin t) + (\rho^3\cos^3t)(\rho\cos t) = \rho^4(\sin^4t + \cos^4t)$，而$\int_0^{2\pi}(\sin^4t + \cos^4t)\,dt = \tfrac{3\pi}{4} + \tfrac{3\pi}{4} = \tfrac{3\pi}{2}$。所以逆时针方向的环量为$\tfrac{3\pi}{2}\rho^4$。取正向的边界是逆时针方向的外圆（$\rho = 2$）和顺时针方向的内圆（$\rho = 1$）：

$$
\oint_{\partial D}\mathbf{F}\cdot d\mathbf{r} = \frac{3\pi}{2}\cdot16 - \frac{3\pi}{2}\cdot 1 = 24\pi - \frac{3\pi}{2} = \frac{45\pi}{2}.
$$

两边相等。如果两个圆都取逆时针方向，就会得到$24\pi + \tfrac{3\pi}{2}$，这是错误的——洞的定向至关重要。
:::
:::

## 由边界求面积

如果选取满足$Q_x - P_y = 1$的$P$和$Q$，格林公式的右边就变成$\iint_D 1\,dA$，即$D$的面积。三种方便的选择是$(P, Q) = (0, x)$、$(-y, 0)$和$(-\tfrac12y, \tfrac12x)$。

::: corollary 用曲线积分表示面积 {#cor-area}
若$D$满足格林公式的条件，则它的面积为

$$
A(D) = \oint_{\partial D}x\,dy = -\oint_{\partial D}y\,dx = \frac12\oint_{\partial D}\bigl(x\,dy - y\,dx\bigr).
$$ {#eq-green-area}
:::

::: proof
对这三个场分别应用[[#thm-green]]：每种情形都有$Q_x - P_y = 1$，所以环量等于$\iint_D 1\,dA = A(D)$。
:::

对椭圆$\mathbf{r}(t) = (a\cos t, b\sin t)$，对称形式给出$x\,dy - y\,dx = (ab\cos^2t + ab\sin^2t)\,dt = ab\,dt$，所以$A = \tfrac12\int_0^{2\pi}ab\,dt = \pi ab$，完全不涉及平方根。被积式$\tfrac12(x\,dy - y\,dx)$有一个很好的含义：它是位置向量从$\mathbf{r}$移动到$\mathbf{r} + d\mathbf{r}$时扫过的细长三角形的面积（叉积$\mathbf{r}\times d\mathbf{r}$的一半，参看[[multivariable/vectors-geometry#thm-cross-length]]）。所以[[#eq-green-area]]累加的是半径沿曲线绕行一周所扫过的面积，开普勒（Kepler）第二定律正是这样度量面积的。

::: widget parametric
fx: cos(t)^3
fy: sin(t)^3
t: 0, 2pi
trace: true
equal: true
caption: 星形线$\mathbf{r}(t) = (\cos^3t, \sin^3t)$。让点沿曲线移动：半径扫过面积的速率为$\tfrac12(xy' - yx') = \tfrac32\sin^2t\cos^2t$，它在四个尖点处为零，点在那里有一瞬间是停住的。对一整圈积分，得到所围的面积$\tfrac{3\pi}{8}$，约为单位圆盘面积的$37.5\%$。
:::

对星形线，$x\,dy - y\,dx = \bigl(\cos^3t\cdot3\sin^2t\cos t + \sin^3t\cdot3\cos^2t\sin t\bigr)\,dt = 3\sin^2t\cos^2t\,dt$，所以$A = \tfrac32\int_0^{2\pi}\sin^2t\cos^2t\,dt = \tfrac32\cdot\tfrac{\pi}{4} = \tfrac{3\pi}{8}$。

::: example 鞋带公式 {#ex-shoelace}
证明：顶点按逆时针顺序依次为$(x_1, y_1), \dots, (x_n, y_n)$的多边形的面积为

$$
A = \frac12\sum_{i=1}^{n}\bigl(x_iy_{i+1} - x_{i+1}y_i\bigr), \qquad (x_{n+1}, y_{n+1}) = (x_1, y_1),
$$

并求顶点为$(0,0)$、$(4,0)$、$(4,3)$、$(1,5)$、$(0,2)$的五边形的面积。
::: solution
边界由从$(x_i, y_i)$到$(x_{i+1}, y_{i+1})$的各条边组成。把其中一条边参数化为$\mathbf{r}(t) = (x_i + t\Delta x, y_i + t\Delta y)$，$0\le t\le1$，其中$\Delta x = x_{i+1} - x_i$，$\Delta y = y_{i+1} - y_i$。则

$$
\int_{\text{边}}x\,dy - y\,dx = \int_0^1\Bigl[(x_i + t\Delta x)\Delta y - (y_i + t\Delta y)\Delta x\Bigr]dt = x_i\Delta y - y_i\Delta x = x_iy_{i+1} - x_{i+1}y_i ,
$$

因为含$t$的项相互抵消。对所有边求和再取一半，由[[#eq-green-area]]即得上述公式。对这个五边形，各项$x_iy_{i+1} - x_{i+1}y_i$为

$$
0\cdot0 - 4\cdot0 = 0,\quad 4\cdot3 - 4\cdot0 = 12,\quad 4\cdot5 - 1\cdot3 = 17,\quad 1\cdot2 - 0\cdot5 = 2,\quad 0\cdot0 - 0\cdot2 = 0,
$$

所以$A = \tfrac12(0 + 12 + 17 + 2 + 0) = \tfrac{31}{2}$。这个名称来自把坐标写成两列时各乘积所形成的交叉图案。测量员和计算机图形程序用的正是这个公式。
:::
:::

::: application 求积仪的工作原理
在直线式求积仪中，一根长为$\ell$的臂的一端（肘节）沿一条固定的直导轨滑动，取这条导轨为$x$轴；另一端（描迹针）则被引导着沿曲线绕行。描迹针处装有一个测量轮，其轮轴沿着臂的方向，因此它只随描迹针运动中垂直于臂的分量而滚动。若描迹针位于$(x, y)$，则臂的方向为$\bigl(\sqrt{\ell^2 - y^2}, y\bigr)/\ell$，与之垂直的一个单位向量为$\bigl(-y, \sqrt{\ell^2 - y^2}\bigr)/\ell$。所以测量轮滚动的总距离为

$$
\frac1\ell\oint_C\Bigl(-y\,dx + \sqrt{\ell^2 - y^2}\,dy\Bigr) = \frac1\ell\iint_D\bigl(0 - (-1)\bigr)\,dA = \frac{A}{\ell},
$$

这里用了格林公式，因为$\sqrt{\ell^2-y^2}$与$x$无关。测量轮的读数与面积成正比。（把测量轮装在臂上的其他位置，会多出一项与臂的总转角成正比的量，而绕行一个闭合回路之后，这一项为零。）雅各布·阿姆斯勒（Jakob Amsler）于1854年发明的极式求积仪，在一个世纪里一直为工程师、测量员和医生所使用，它的原理相同，只是肘节在一个圆上运动。
:::

## 环量与通量

格林公式还有第二种形式，可以通过把它应用于一个旋转后的场得到。在边界上，$\mathbf{F}\cdot\mathbf{T}$度量场**沿着**曲线流动的多少；沿外法线方向的分量$\mathbf{F}\cdot\mathbf{n}$则度量场**穿过**曲线、流出$D$的多少。积分$\oint_{\partial D}\mathbf{F}\cdot\mathbf{n}\,ds$称为$\mathbf{F}$流出$D$的**通量**：若$\mathbf{F}$是一薄层流体的速度场，它就是流体离开$D$的速率（单位时间内的面积）。

::: definition 标量旋度与散度 {#def-curl-div}
对平面上的$C^1$场$\mathbf{F} = (P, Q)$，$\mathbf{F}$的**标量旋度**和**散度**分别为

$$
\curl\mathbf{F} = \pdv{Q}{x} - \pdv{P}{y}, \qquad \divg\mathbf{F} = \nabla\cdot\mathbf{F} = \pdv{P}{x} + \pdv{Q}{y}.
$$
:::

用这个记号，格林公式可写成$\oint_{\partial D}\mathbf{F}\cdot\mathbf{T}\,ds = \iint_D\curl\mathbf{F}\,dA$：沿边界的环量等于旋度的积分。通量形式随之可得。

::: theorem 格林公式的通量形式 {#thm-green-flux}
在[[#thm-green]]的条件下，记$\mathbf{n}$为$\partial D$上的单位外法向量，则

$$
\oint_{\partial D}\mathbf{F}\cdot\mathbf{n}\,ds = \iint_D\divg\mathbf{F}\,dA = \iint_D\left(\pdv{P}{x} + \pdv{Q}{y}\right)dA .
$$
:::

::: proof
由[[#def-positive-orientation]]，外法向量为$\mathbf{n} = (T_2, -T_1)$，而沿曲线有$T_1\,ds = dx$，$T_2\,ds = dy$。因此

$$
\mathbf{F}\cdot\mathbf{n}\,ds = (PT_2 - QT_1)\,ds = -Q\,dx + P\,dy .
$$

对场$(-Q, P)$应用格林公式（凡是$\mathbf{F}$为$C^1$的地方，它也是$C^1$的）：

$$
\oint_{\partial D}(-Q)\,dx + P\,dy = \iint_D\left(\pdv{P}{x} - \pdv{(-Q)}{y}\right)dA = \iint_D\left(\pdv{P}{x} + \pdv{Q}{y}\right)dA .
$$
:::

定理的这两种形式赋予了旋度和散度局部的含义：旋度度量**单位面积上的环量**，散度度量**单位面积上的通量**。

::: theorem 作为密度的旋度与散度 {#thm-densities}
设$\mathbf{F}$在$\mathbf{a}$附近是$C^1$的，$D_\rho$是以$\mathbf{a}$为圆心、半径为$\rho$的圆盘，$C_\rho$是它取正向的边界。则

$$
\curl\mathbf{F}(\mathbf{a}) = \lim_{\rho\to0}\frac{1}{\pi\rho^2}\oint_{C_\rho}\mathbf{F}\cdot\mathbf{T}\,ds, \qquad \divg\mathbf{F}(\mathbf{a}) = \lim_{\rho\to0}\frac{1}{\pi\rho^2}\oint_{C_\rho}\mathbf{F}\cdot\mathbf{n}\,ds .
$$
:::

::: proof
由格林公式，$\dfrac{1}{\pi\rho^2}\oint_{C_\rho}\mathbf{F}\cdot\mathbf{T}\,ds = \dfrac{1}{\pi\rho^2}\iint_{D_\rho}\curl\mathbf{F}\,dA$，即$\curl\mathbf{F}$在圆盘上的平均值。由于$\iint_{D_\rho}\curl\mathbf{F}(\mathbf{a})\,dA = \pi\rho^2\curl\mathbf{F}(\mathbf{a})$，

$$
\left|\frac{1}{\pi\rho^2}\iint_{D_\rho}\curl\mathbf{F}\,dA - \curl\mathbf{F}(\mathbf{a})\right| \le \frac{1}{\pi\rho^2}\iint_{D_\rho}\bigl|\curl\mathbf{F}(\mathbf{x}) - \curl\mathbf{F}(\mathbf{a})\bigr|\,dA \le \max_{\mathbf{x}\in D_\rho}\bigl|\curl\mathbf{F}(\mathbf{x}) - \curl\mathbf{F}(\mathbf{a})\bigr|,
$$

由于$\curl\mathbf{F}$连续，当$\rho\to0$时它趋于$0$。关于散度的结论可以同样地由[[#thm-green-flux]]得到。
:::

这些极限完全没有提到坐标，所以旋度和散度是几何量：旋转坐标轴时它们不变。某点处散度为正，意味着流体在那里产生——这是一个**源**；散度为负则意味着一个**汇**。旋度为正意味着存在净的逆时针旋转。

::: intuition 桨轮检验
把一个可绕竖直轮轴自由转动的小桨轮放进流动的薄层流体中。在$\curl\mathbf{F} > 0$的地方它逆时针转动，在$\curl\mathbf{F} < 0$的地方它顺时针转动；事实上，它的角速度就是$\tfrac12\curl\mathbf{F}$。旋度关心的是**局部**的自转，这与沿圆周流动不是一回事。在**剪切流**$\mathbf{F} = (y, 0)$中，流体沿直线运动，越往上流得越快，然而$\curl\mathbf{F} = 0 - 1 = -1$：桨轮上方较快的水流把它的顶部向前推，于是桨轮顺时针转动。反过来，在[[multivariable/line-integrals#ex-vortex]]的涡旋场中，流体绕着原点转圈，但在原点以外旋度为$0$：桨轮被带着绕圈，自身却不转动，因为外侧较慢的水流恰好与内侧较快的水流相互平衡。
:::

::: widget vectorfield
P: y
Q: 0
cx: a + r*cos(t)
cy: b + r*sin(t)
t: 0, 2pi
x: -3, 3
y: -3, 3
shade: curl
sliders: a=0:-2:2:0.1; b=0:-2:2:0.1; r=1:0.2:1.5:0.1
caption: 剪切流$\mathbf{F} = (y, 0)$的旋度处处为$-1$（着色均匀）。用$a$和$b$把圆移到任何位置：它的环量总是$-\pi r^2$，即圆面积的相反数，正如格林公式所预言的那样。流线是直的，但每个小回路上的环量都是顺时针方向的。
:::

::: example 流出圆盘的通量 {#ex-flux}
分别直接计算和利用[[#thm-green-flux]]，求$\mathbf{F} = (x^3, y^3)$流出单位圆盘的通量。
::: solution
*直接计算*。在单位圆$\mathbf{r}(t) = (\cos t, \sin t)$上，单位外法向量为$\mathbf{n} = (\cos t, \sin t)$，$ds = dt$，所以$\mathbf{F}\cdot\mathbf{n} = \cos^4t + \sin^4t$，通量为$\int_0^{2\pi}(\cos^4t + \sin^4t)\,dt = \tfrac{3\pi}{2}$。

*利用散度形式*。$\divg\mathbf{F} = 3x^2 + 3y^2$，所以通量为$\iint 3r^2\cdot r\,dr\,d\theta = 2\pi\cdot\tfrac34 = \tfrac{3\pi}{2}$。

两种方法都得到$\tfrac{3\pi}{2}$。散度在原点处为零，并向外增大，所以大部分流出量是在边缘附近产生的。
:::
:::

::: widget vectorfield
P: x^2
Q: y^2
cx: a + r*cos(t)
cy: b + r*sin(t)
t: 0, 2pi
x: -3, 3
y: -3, 3
shade: divergence
sliders: a=1:-2:2:0.1; b=0.5:-2:2:0.1; r=0.8:0.2:1.5:0.1
caption: 场$\mathbf{F} = (x^2, y^2)$的散度为$2x + 2y$：直线$x + y = 0$上方是源，下方是汇。让圆滑过这条直线，观察通量如何变号；由[[#thm-green-flux]]，通量等于$2(a + b)\pi r^2$，即散度在圆盘上的积分。
:::

::: quiz
整个平面上的某个$C^1$场处处满足$\divg\mathbf{F} = 0$。对于任何可以应用格林公式的区域$D$，$\mathbf{F}$流出$D$的通量是多少？
- [x] $0$
- [ ] $D$的面积
- [ ] 它取决于沿$\partial D$的环量
- [ ] 不知道$\mathbf{F}$就无法确定
::: solution
由[[#thm-green-flux]]，通量为$\iint_D\divg\mathbf{F}\,dA = 0$。这样的场描述不可压缩流动：流入一个区域的流体必定会流出。环量是另一个量，由旋度控制。
:::
:::

::: warning 正确选取法向量
通量的被积式为$\mathbf{F}\cdot\mathbf{n}\,ds = P\,dy - Q\,dx$，其中对取正向的边界，$\mathbf{n} = (T_2, -T_1)$是**外**法向量。写成$Q\,dx - P\,dy$（内法向量），或者使用顺时针方向的参数化而不修正符号，得到的通量符号都是错的。拿不准时，可以用径向场$(x, y)$来检验，它流出单位圆盘的通量必定为正：$\divg = 2$，通量$= 2\pi$。
:::

## 再谈涡旋场

格林公式解释了[[multivariable/line-integrals]]一章中涡旋场令人困惑的性态。

::: example 绕原点的每一条闭路 {#ex-vortex-again}
设$\mathbf{F} = \left(\frac{-y}{x^2+y^2}, \frac{x}{x^2+y^2}\right)$。证明：对于内部包含原点的每一条取正向的分段光滑简单闭曲线$C$，都有$\oint_C\mathbf{F}\cdot d\mathbf{r} = 2\pi$；而对于内部不包含原点（且不经过原点）的每一条这样的曲线，该积分为$0$。
::: solution
在$\R^2\setminus\set{\mathbf{0}}$上，该场是$C^1$的，且$\curl\mathbf{F} = Q_x - P_y = 0$（[[multivariable/line-integrals#ex-vortex]]）。

*原点在$C$的外部*。这时$\mathbf{F}$在$C$的内部$D$上以及$C$上都是$C^1$的，由格林公式得$\oint_C\mathbf{F}\cdot d\mathbf{r} = \iint_D 0\,dA = 0$。

*原点在$C$的内部*。我们不能用$C$的内部，因为它包含奇点。改为取足够小的$\eps > 0$，使以原点为圆心、半径为$\eps$的圆$C_\eps$位于$C$的内部，并设$D$为$C$与$C_\eps$之间的区域。它取正向的边界由$C$（逆时针方向）和按顺时针方向绕行的$C_\eps$组成。该场在$D$上是$C^1$的，所以

$$
\oint_C\mathbf{F}\cdot d\mathbf{r} - \oint_{C_\eps}\mathbf{F}\cdot d\mathbf{r} = \iint_D 0\,dA = 0,
$$

这里的两个积分现在都是沿逆时针方向的。因此$\oint_C\mathbf{F}\cdot d\mathbf{r} = \oint_{C_\eps}\mathbf{F}\cdot d\mathbf{r} = 2\pi$，即对圆算出的值（同样的计算对任何半径都适用）。

对正方形、椭圆或弯弯曲曲的闭路，答案都一样：唯一要紧的是曲线是否绕过原点。（一条按符号计算绕原点$k$圈的闭曲线给出$2\pi k$，由此引出[[complex-analysis/cauchy-theorem]]一章中的**环绕数**。）
:::
:::

::: definition 单连通区域 {#def-simply-connected}
如果连通开集$D\subseteq\R^2$中每一条简单闭曲线的内部都包含在$D$中，就称$D$是**单连通**的。
:::

通俗地说，$D$没有洞：$D$中的闭路永远不会围住$D$中缺失的点。圆盘、半平面、整个平面以及去掉一条射线后的平面都是单连通的；去心平面和圆环则不是。（在拓扑学中，单连通性的定义是要求每条闭路都能在$D$内收缩成一点；对平面上的开集，这两个定义是一致的。见[[topology/fundamental-group]]。）

::: theorem 单连通区域上的无旋场是保守场 {#thm-simply-connected}
设$D\subseteq\R^2$是单连通开集，$\mathbf{F} = (P, Q)$在$D$上是$C^1$的，且在整个$D$中$\pdv{Q}{x} = \pdv{P}{y}$。则$\mathbf{F}$在$D$上是保守场。
:::

::: proof
固定$\mathbf{a}\in D$。由于$D$是连通开集，每一点$\mathbf{x}\in D$都能用一条**阶梯路径**与$\mathbf{a}$相连：阶梯路径是$D$中各段均为水平或竖直线段的折线。我们先证明$\mathbf{F}$沿$D$中每条闭阶梯路径$\Gamma$的环量为零。

若$\Gamma$是简单闭曲线，则由于$D$单连通，它的内部$R$位于$D$中。区域$R$是一个各边均为水平或竖直的多边形，可以用竖直线和水平线把它切成有限个矩形，所以格林公式适用于它，并且

$$
\oint_\Gamma\mathbf{F}\cdot d\mathbf{r} = \pm\iint_R\left(\pdv{Q}{x} - \pdv{P}{y}\right)dA = 0,
$$

其中的符号取决于$\Gamma$的定向。*（以下只给出概要。）*与自身相交或沿原路折返的闭阶梯路径，可以在它的有限个自交点处分成有限个简单闭阶梯回路，外加一些正反方向各走一次的线段，这些线段的贡献相互抵消；每个回路的环量为零，所以$\Gamma$的环量也为零。

现在定义$f(\mathbf{x}) = \int_{\Gamma_\mathbf{x}}\mathbf{F}\cdot d\mathbf{r}$，其中$\Gamma_\mathbf{x}$是$D$中从$\mathbf{a}$到$\mathbf{x}$的任意一条阶梯路径。两条这样的路径$\Gamma_\mathbf{x}, \Gamma'_\mathbf{x}$给出相同的值，因为先走$\Gamma_\mathbf{x}$、再走$-\Gamma'_\mathbf{x}$是一条闭阶梯路径。[[multivariable/line-integrals#thm-path-independence]]的证明中用一小段水平或竖直线段延长路径的论证，现在就表明$f_x = P$，$f_y = Q$。所以$\mathbf{F} = \nabla f$是保守场。
:::

这个定理与涡旋场合在一起，给出了一幅完整的图景。在单连通区域上，局部检验$Q_x = P_y$与保守等价。在有洞的区域上，无旋场仍然可以绕着洞环流，而且绕洞的每一条闭路上的环量都相同——这正是涡旋场的性态。

::: quiz
下列开集中哪一个是单连通的？
- [ ] 去心圆盘$0 < x^2 + y^2 < 1$
- [ ] 圆环$1 < x^2 + y^2 < 4$
- [x] 去掉闭半直线$\set{(x, 0) : x\le0}$后的平面
- [ ] 去掉两点$(\pm1, 0)$后的平面
::: solution
在第一、第二和第四个集合中，都存在一个圆，其内部含有缺失的点。第三个选项中的割缝平面关于$(1, 0)$是星形的：从$(1,0)$到该集合中任一点的线段都避开了被去掉的半直线。其中每条简单闭曲线的内部都在该集合之中，因为一条围住被去掉的半直线上某一点的曲线，要绕过这一点就必须穿过这条半直线。正因为如此，极角$\theta\in(-\pi,\pi)$在割缝平面上是涡旋场的一个真正的势函数。
:::
:::

::: application 复分析中的柯西定理
把复函数写成$f(z) = u(x,y) + i\,v(x,y)$，其中$z = x + iy$，$dz = dx + i\,dy$。则

$$
\oint_C f(z)\,dz = \oint_C(u\,dx - v\,dy) + i\oint_C(v\,dx + u\,dy).
$$

若$f$在$C$的内部和$C$上复可微，且导数连续，则格林公式把这两个实积分分别变成$\iint(-v_x - u_y)\,dA$和$\iint(u_x - v_y)\,dA$，由柯西-黎曼方程$u_x = v_y$，$u_y = -v_x$，它们都等于零。这就是柯西（Cauchy）定理$\oint_C f(z)\,dz = 0$，它是[[complex-analysis/cauchy-theorem]]一章的基石（那里证明它时不需要假设导数连续）。对于在$0$处不可微的$f(z) = 1/z$，$\oint_C dz/z$的虚部恰好就是涡旋场的环量$2\pi$。
:::

::: history
乔治·格林（George Green，1793—1841）是诺丁汉一位磨坊主的儿子，几乎没有受过正规的学校教育。1828年，他以预约认购的方式出版了《论数学分析在电磁理论中的应用》（*An Essay on the Application of Mathematical Analysis …*），书中引入了“势函数”一词，以及体积分与曲面积分之间的一些恒等式，我们今天称之为格林恒等式。这篇论文几乎无人注意；格林四十岁时才作为本科生进入剑桥大学，1841年去世。1845年，年轻的威廉·汤姆森（William Thomson，即后来的开尔文勋爵）偶然得到一本，认识到它的重要性，并设法让它在克雷勒（Crelle）的杂志上重印。如今以格林命名的这个平面定理，并没有以这种形式出现在这篇《论文》中：它是奥古斯丁-路易·柯西（Augustin-Louis Cauchy）在1846年结合复积分提出的，并由波恩哈德·黎曼（Bernhard Riemann）在1851年的博士论文中给出了证明。
:::

## 后续内容

格林公式是一个定理家族中的二维成员。在空间中，环量形式变为**斯托克斯（Stokes）公式**：对曲面$S$，$\oint_{\partial S}\mathbf{F}\cdot d\mathbf{r} = \iint_S(\nabla\times\mathbf{F})\cdot d\mathbf{S}$；通量形式则变为**散度定理**（高斯公式）：对立体$E$，$\iint_{\partial E}\mathbf{F}\cdot d\mathbf{S} = \iiint_E\nabla\cdot\mathbf{F}\,dV$。在[[multivariable/surface-integrals]]一章定义了穿过曲面的通量之后，这两个定理都将在[[multivariable/stokes-divergence]]一章中得到证明。把通量形式应用于$\mathbf{F} = \nabla u$，得到$\oint_{\partial D}\frac{\partial u}{\partial n}\,ds = \iint_D\Delta u\,dA$（[[#exr-harmonic]]），这是[[pde/laplace-equation]]一章研究调和函数的出发点。柯西定理（[[complex-analysis/cauchy-theorem]]）就是格林公式与柯西-黎曼方程的结合，而涡旋场的$2\pi$则演变成留数定理。在微分几何中，格林公式是证明高斯-博内（Gauss–Bonnet）定理的关键一步（[[differential-geometry/geodesics-gauss-bonnet]]）。

::: summary
- 对边界取正向（区域在左侧：外边界逆时针，洞的边界顺时针）的区域$D$和$C^1$函数$P, Q$：$\oint_{\partial D}P\,dx + Q\,dy = \iint_D(Q_x - P_y)\,dA$（[[#thm-green]]）。
- 证明把定理拆成$\oint P\,dx = -\iint P_y\,dA$（I型区域）和$\oint Q\,dy = \iint Q_x\,dA$（II型区域）；沿内部的边切割可以推广定理，因为切口沿相反方向各走了一次。
- 面积：$A = \oint x\,dy = -\oint y\,dx = \tfrac12\oint(x\,dy - y\,dx)$；对多边形，这就是鞋带公式，求积仪也正是根据这一原理工作的（[[#cor-area]]）。
- 通量形式：$\oint_{\partial D}\mathbf{F}\cdot\mathbf{n}\,ds = \iint_D\divg\mathbf{F}\,dA$，其中取外法向量（[[#thm-green-flux]]）。
- 标量旋度$Q_x - P_y$是单位面积上的环量，散度$P_x + Q_y$是单位面积上的通量（[[#thm-densities]]）。
- 格林公式要求场在整个区域上是$C^1$的：涡旋场的旋度为$0$，但沿每条围住原点的闭路的环量都是$2\pi$（[[#ex-vortex-again]]）。
- 在单连通区域上，由$Q_x = P_y$可推出$\mathbf{F}$是保守场（[[#thm-simply-connected]]）。
:::

## 习题

::: exercise 沿正方形 {level=1 check="1/2"}
用格林公式计算$\oint_C xy\,dx + x^2\,dy$，其中$C$是正方形$[0,1]\times[0,1]$的边界，按逆时针方向绕行。
::: solution
$Q_x - P_y = 2x - x = x$，所以积分为$\int_0^1\int_0^1 x\,dx\,dy = \tfrac12$。
:::
:::

::: exercise 椭圆的面积 {level=1 check="6*pi"}
用[[#eq-green-area]]求椭圆$\dfrac{x^2}{9} + \dfrac{y^2}{4} = 1$所围的面积。
::: solution
取$\mathbf{r}(t) = (3\cos t, 2\sin t)$，则$x\,dy - y\,dx = (6\cos^2t + 6\sin^2t)\,dt = 6\,dt$，所以$A = \tfrac12\int_0^{2\pi}6\,dt = 6\pi$。
:::
:::

::: exercise 一个环量 {level=1 check="3*pi/2"}
用格林公式计算沿单位圆按逆时针方向的$\oint_C -y^3\,dx + x^3\,dy$。
::: solution
$Q_x - P_y = 3x^2 + 3y^2$，所以积分为$\int_0^{2\pi}\int_0^1 3r^2\cdot r\,dr\,d\theta = 2\pi\cdot\tfrac34 = \tfrac{3\pi}{2}$（与[[#ex-annulus]]中$\rho = 1$的结果一致）。
:::
:::

::: exercise 一个五边形 {level=2 check="20"}
求依次以$(0,0)$、$(4,0)$、$(5,3)$、$(2,5)$、$(-1,2)$为顶点的五边形的面积。
::: solution
这些顶点是按逆时针顺序排列的。鞋带公式中的各项$x_iy_{i+1} - x_{i+1}y_i$为$0$、$4\cdot3 - 5\cdot0 = 12$、$5\cdot5 - 2\cdot3 = 19$、$2\cdot2 - (-1)\cdot5 = 9$和$(-1)\cdot0 - 0\cdot2 = 0$。所以$A = \tfrac12(12 + 19 + 9) = 20$。
:::
:::

::: exercise 流出圆盘的通量 {level=2 check="8*pi"}
求$\mathbf{F} = (x + y^2,\; y - x^2)$穿过圆$x^2 + y^2 = 4$向外的通量。
::: solution
$\divg\mathbf{F} = 1 + 1 = 2$，所以由[[#thm-green-flux]]，通量为$2\times(\text{面积}) = 2\cdot 4\pi = 8\pi$。（直接计算：在圆上$\mathbf{F}\cdot\mathbf{n}\,ds = P\,dy - Q\,dx$，而$y^2\,dy$和$x^2\,dx$两项沿闭曲线的积分为零，剩下$\oint x\,dy - y\,dx = 2\cdot 4\pi$。）
:::
:::

::: exercise 玫瑰线的一片花瓣 {level=2 check="pi/8"}
证明：对用极坐标给出的曲线，$x\,dy - y\,dx = r^2\,d\theta$，并由此推出闭的极坐标曲线所围的面积为$\tfrac12\int r^2\,d\theta$。用这一结果求玫瑰线$r = \sin 2\theta$，$0\le\theta\le\pi/2$的一片花瓣的面积。
::: solution
由$x = r\cos\theta$，$y = r\sin\theta$得：$dx = \cos\theta\,dr - r\sin\theta\,d\theta$，$dy = \sin\theta\,dr + r\cos\theta\,d\theta$，所以

$$
x\,dy - y\,dx = r\cos\theta(\sin\theta\,dr + r\cos\theta\,d\theta) - r\sin\theta(\cos\theta\,dr - r\sin\theta\,d\theta) = r^2\,d\theta .
$$

由[[#eq-green-area]]，面积为$\tfrac12\oint r^2\,d\theta$。当$\theta$从$0$变到$\pi/2$时，花瓣按逆时针方向被描出，所以它的面积为$\tfrac12\int_0^{\pi/2}\sin^22\theta\,d\theta = \tfrac12\cdot\tfrac{\pi}{4} = \tfrac{\pi}{8}$。
:::
:::

::: exercise 涡旋场沿三角形的环量 {level=2 check="2*pi"}
计算$\oint_C\dfrac{-y\,dx + x\,dy}{x^2+y^2}$，其中$C$是以$(-1,-1)$、$(2,0)$、$(0,2)$为顶点的三角形的边界，按逆时针方向绕行。
::: solution
先验证原点在三角形内部：对每条边，原点都与该边所对的顶点位于这条边的同一侧（例如，从$(2,0)$到$(0,2)$的边在直线$x + y = 2$上，而原点和$(-1,-1)$都满足$x + y < 2$；其他边类似）。由[[#ex-vortex-again]]，积分为$2\pi$。
:::
:::

::: exercise 由边界求形心 {level=3}
证明：面积为$A$、满足格林公式条件的区域$D$的形心为

$$
\bar x = \frac{1}{2A}\oint_{\partial D}x^2\,dy, \qquad \bar y = -\frac{1}{2A}\oint_{\partial D}y^2\,dx,
$$

并用第二个公式求半圆盘$x^2 + y^2\le1$，$y\ge0$的形心。
::: solution
形心为$\bar x = \frac1A\iint_D x\,dA$，$\bar y = \frac1A\iint_D y\,dA$。对$(P, Q) = (0, \tfrac12x^2)$应用格林公式得$\oint\tfrac12x^2\,dy = \iint x\,dA$，对$(P,Q) = (-\tfrac12y^2, 0)$应用则得$\oint-\tfrac12y^2\,dx = \iint y\,dA$。对半圆盘，$A = \pi/2$。在直径上$y = 0$，所以直径没有贡献；在圆弧$(\cos t, \sin t)$，$0\le t\le\pi$上，

$$
-\oint\frac{y^2}{2}\,dx = -\int_0^\pi\frac{\sin^2t}{2}(-\sin t)\,dt = \frac12\int_0^\pi\sin^3t\,dt = \frac12\cdot\frac43 = \frac23 .
$$

所以$\bar y = \dfrac{2/3}{\pi/2} = \dfrac{4}{3\pi}\approx0.42$，而由对称性$\bar x = 0$。
:::
:::

::: exercise 调和函数 {#exr-harmonic level=3}
设$u$是$C^2$函数，$D$是满足格林公式条件的区域。记外法向导数为$\dfrac{\partial u}{\partial n} = \nabla u\cdot\mathbf{n}$，拉普拉斯算子为$\Delta u = u_{xx} + u_{yy}$，证明

$$
\oint_{\partial D}\frac{\partial u}{\partial n}\,ds = \iint_D\Delta u\,dA .
$$

由此推出：若$u$在平面上**调和**（$\Delta u = 0$），则$\nabla u$穿过每一条这样的边界的净通量都为零；并对单位圆盘上的$u = x^2 - y^2$验证这一点。
::: solution
对$C^1$场$\mathbf{F} = \nabla u = (u_x, u_y)$应用[[#thm-green-flux]]：左边是$\oint\nabla u\cdot\mathbf{n}\,ds = \oint\frac{\partial u}{\partial n}\,ds$，而$\divg\nabla u = u_{xx} + u_{yy} = \Delta u$。若$\Delta u = 0$，右边为零。对$u = x^2 - y^2$：$\Delta u = 2 - 2 = 0$，在单位圆上$\mathbf{n} = (\cos t, \sin t)$，$\nabla u = (2\cos t, -2\sin t)$，所以$\frac{\partial u}{\partial n} = 2\cos^2t - 2\sin^2t = 2\cos2t$，它在$[0,2\pi]$上的积分确实为$0$。
:::
:::

::: exercise 绕洞的环量 {level=3}
设$\mathbf{F} = (P, Q)$在$\R^2\setminus\set{\mathbf{0}}$上是$C^1$的，且在那里$Q_x = P_y$。证明：对于内部包含原点的每一个取正向的圆$C$，$\oint_C\mathbf{F}\cdot d\mathbf{r}$都取相同的值，即使这些圆不同心。
::: hint
像[[#ex-vortex-again]]中那样，把每个圆与一个以原点为圆心的小圆作比较。
:::
::: solution
设$C$是这样一个圆，取足够小的$\eps > 0$，使以原点为圆心、半径为$\eps$的圆$C_\eps$位于$C$的内部（这是可以做到的，因为原点是$C$所围圆盘的内点）。$C$与$C_\eps$之间的区域$D$避开了原点，所以$\mathbf{F}$在$D$上是$C^1$的；对取正向的边界（$C$逆时针，$C_\eps$顺时针）应用格林公式，得$\oint_C\mathbf{F}\cdot d\mathbf{r} - \oint_{C_\eps}\mathbf{F}\cdot d\mathbf{r} = \iint_D(Q_x - P_y)\,dA = 0$。对两个同心圆$C_\eps$和$C_{\eps'}$运用同样的论证，可知$\oint_{C_\eps}$与$\eps$无关；记它为$c$。于是绕原点的每个圆$C$上的环量都是$c$。（对涡旋场，$c = 2\pi$；对保守场，$c = 0$。）
:::
:::
