一块金属薄板的密度逐点变化。它有多重？它的平衡点在哪里？一座小山由矩形地块上的高度函数$z = f(x, y)$描述；堆成这座山需要多少土？还有一个看起来与多元函数毫无关系的问题：正态分布背后的积分$\int_{-\infty}^{\infty} e^{-x^2}\,dx$等于多少？$e^{-x^2}$的原函数无法用初等函数表示，然而只要把这个积分的**平方**看作平面上的积分，答案$\sqrt{\pi}$只需三行就能得出。

在一元情形中，$\int_a^b f(x)\,dx$把$f$在一个区间上累加起来；**二重积分**$\iint_D f\,dA$把$f$在平面区域$D$上累加起来，**三重积分**$\iiint_E f\,dV$则在空间立体$E$上累加。本章把它们定义为黎曼和的极限，证明富比尼（Fubini）定理——它把重积分化为逐次进行的一元积分——并说明如何描述区域，以及如何选取使积分易于计算的坐标（极坐标、柱面坐标、球面坐标）。本章始终要用到[[calculus-1/integrals]]一章中的一元积分理论和[[calculus-1/integration-techniques]]一章中的积分技巧。

## 矩形上的二重积分

先考虑矩形$R = [a,b]\times[c,d]$上的函数$f(x,y) \ge 0$，以及位于$R$上方、$f$的图像下方的立体。为了估计它的体积，用分点$a = x_0 < x_1 < \dots < x_m = b$把$[a,b]$分成若干小段，用分点$c = y_0 < \dots < y_n = d$分割$[c,d]$。这样就把$R$分成$mn$个小矩形$R_{ij} = [x_{i-1}, x_i]\times[y_{j-1}, y_j]$，其面积为$\Delta A_{ij} = \Delta x_i\,\Delta y_j$。在每个$R_{ij}$上选取一个样本点$(x_{ij}^*, y_{ij}^*)$，并用高为$f(x_{ij}^*, y_{ij}^*)$的长方体近似该处的立体。这些长方体的总体积就是**黎曼和**

$$
S = \sum_{i=1}^m\sum_{j=1}^n f(x_{ij}^*, y_{ij}^*)\,\Delta A_{ij}.
$$

随着分割越来越细，这些长方体与立体贴合得越来越好；我们把体积——对于任意符号的函数，则是积分——定义为这个极限。分割的**细度**是所有$\Delta x_i$和$\Delta y_j$中的最大者。

::: definition 二重积分 {#def-double-integral}
设$f$是矩形$R$上的有界函数。如果存在数$I$，使得对每个$\eps > 0$，都存在$\delta > 0$，使细度小于$\delta$的分割的每个黎曼和$S$（样本点任意选取）都满足$\abs{S - I} < \eps$，就称$f$在$R$上**可积**，并称$I$为它的**二重积分**。记作

$$
I = \iint_R f(x,y)\,dA = \lim_{\text{细度}\to0}\sum_{i,j} f(x_{ij}^*, y_{ij}^*)\,\Delta A_{ij}.
$$
:::

当$f \ge 0$时，积分就是图像下方的体积；一般情况下，它是$xy$平面上方的体积减去下方的体积。与一元情形一样，关键的存在性结论是：$R$上的每个连续函数都可积；更一般地，间断点都位于有限条光滑曲线（它们的面积为零）上的每个有界函数都可积。证明要用到连续函数在有界闭集上的一致连续性，与[[real-analysis/riemann-integral]]一章中一元积分的证明完全类似；我们将直接使用这一结论。积分的基本性质可以直接由定义得出。

::: proposition 二重积分的性质 {#prop-properties}
设$f$和$g$在矩形$R$上可积，$\alpha, \beta\in\R$。则

1. （线性性）$\alpha f + \beta g$可积，且$\iint_R(\alpha f + \beta g)\,dA = \alpha\iint_R f\,dA + \beta\iint_R g\,dA$；
2. （单调性）若在$R$上$f\le g$，则$\iint_R f\,dA \le \iint_R g\,dA$；
3. 若$\abs{f}$可积（例如$f$连续时），则$\abs{\iint_R f\,dA} \le \iint_R\abs{f}\,dA$；
4. （可加性）若一条平行于坐标轴的直线把$R$分成矩形$R_1$和$R_2$，则$\iint_R f\,dA = \iint_{R_1}f\,dA + \iint_{R_2}f\,dA$；
5. $\iint_R 1\,dA = \text{面积}(R)$。
:::

::: proof
对于固定的分割和固定的样本点，黎曼和关于函数是线性的：$S(\alpha f + \beta g) = \alpha S(f) + \beta S(g)$；也是单调的：由$f\le g$可以逐项得到$S(f)\le S(g)$。令细度趋于$0$，就得到(1)和(2)，因为极限运算保持和、常数倍以及非严格不等式。结论(3)可由对$-\abs{f}\le f\le\abs{f}$应用(2)得到。对于(4)，使用包含这条分界线的$R$的分割；细度任意小的这种分割是存在的，而它们的每个黎曼和都可以拆成$R_1$上的一个黎曼和加上$R_2$上的一个黎曼和。最后，常数$1$的每个黎曼和都等于$\sum\Delta A_{ij} = \text{面积}(R)$。
:::

## 累次积分与富比尼定理

用黎曼和来计算二重积分，就像用和式来计算$\int_0^1 x^2\,dx$一样不切实际。我们改用切片的方法。固定$x$，对$y$积分：

$$
A(x) = \int_c^d f(x,y)\,dy
$$

就是过点$x$且垂直于$x$轴的平面截立体所得截面的面积。把厚度为$dx$的薄片累加起来，可以猜想体积为$\int_a^b A(x)\,dx$。这个**累次积分**记作$\int_a^b\int_c^d f(x,y)\,dy\,dx$，先计算内层积分。沿另一个方向切片，则得到$\int_c^d\int_a^b f(x,y)\,dx\,dy$。

::: theorem 富比尼定理 {#thm-fubini}
若$f$在矩形$R = [a,b]\times[c,d]$上连续，则

$$
\iint_R f\,dA = \int_a^b\left(\int_c^d f(x,y)\,dy\right)dx = \int_c^d\left(\int_a^b f(x,y)\,dx\right)dy .
$$
:::

::: proof
令$F(x) = \int_c^d f(x,y)\,dy$。由于$f$在有界闭集$R$上连续，它是一致连续的（[[real-analysis/continuity]]），由此可知$F$在$[a,b]$上连续，因而可积。

像上面那样，任取$R$的一个分割，把它分成小矩形$R_{ij}$，并设$m_{ij}$和$M_{ij}$分别是$f$在$R_{ij}$上的最小值和最大值。对$x\in[x_{i-1}, x_i]$，把$m_{ij} \le f(x,y) \le M_{ij}$在$y \in[y_{j-1}, y_j]$上积分，再对$j$求和，得

$$
\sum_j m_{ij}\,\Delta y_j \;\le\; F(x) \;\le\; \sum_j M_{ij}\,\Delta y_j .
$$

在$x\in[x_{i-1}, x_i]$上积分，再对$i$求和：

$$
L = \sum_{i,j} m_{ij}\,\Delta x_i\,\Delta y_j \;\le\; \int_a^b F(x)\,dx \;\le\; \sum_{i,j}M_{ij}\,\Delta x_i\,\Delta y_j = U .
$$

这个分割的任何**加细**的每个黎曼和都介于$L$与$U$之间，因为加细后的每个小矩形都包含在某个$R_{ij}$中，而在$R_{ij}$上$m_{ij}\le f\le M_{ij}$。细度任意小的加细是存在的，而它们的黎曼和收敛于$\iint_R f\,dA$；所以同样有$L \le \iint_R f\,dA \le U$。现在设$\eps > 0$。由一致连续性，存在$\delta > 0$，使得只要$\norm{\mathbf{p} - \mathbf{q}} < \delta$，就有$\abs{f(\mathbf{p}) - f(\mathbf{q})} < \eps$；对于所有小矩形的直径都小于$\delta$的分割，有$M_{ij} - m_{ij} < \eps$，因此$U - L < \eps\cdot\text{面积}(R)$。对每个$\eps > 0$，$\int_a^bF\,dx$与$\iint_R f\,dA$都落在长度小于$\eps\cdot\text{面积}(R)$的区间$[L, U]$中；所以二者相等。交换$x$与$y$的角色，同样的论证可得第二个等式。
:::

只要$f$在$R$上可积且内层积分存在，同样的证明就适用；特别地，它适用于除有限条光滑曲线外处处连续的有界函数。对勒贝格可积函数成立的最一般形式是测度论中的定理，它建立在[[measure-theory/lebesgue-integral]]一章的积分之上。

::: example 选择积分次序 {#ex-order}
计算$\displaystyle\iint_R x\,e^{xy}\,dA$，其中$R = [0,1]\times[0,1]$。
::: solution
先对$y$积分，因子$x$恰好是求内层原函数所需要的：

$$
\int_0^1 x\,e^{xy}\,dy = \Bigl[e^{xy}\Bigr]_{y=0}^{y=1} = e^x - 1, \qquad\text{所以}\qquad \iint_R x\,e^{xy}\,dA = \int_0^1 (e^x - 1)\,dx = e - 2 .
$$

若按另一种次序，内层积分$\int_0^1 x e^{xy}\,dx$需要分部积分，并且会得到一个难以处理的$y$的函数；富比尼定理保证结果相同，都是$e - 2 \approx 0.718$，但要多花许多功夫。选择积分次序往往是计算重积分时最主要的决定。
:::
:::

::: warning 富比尼定理需要前提条件
对于$(0,1]\times(0,1]$上的无界函数$f(x,y) = \dfrac{x^2 - y^2}{(x^2+y^2)^2}$，两个累次积分都存在，但并不相等：

$$
\int_0^1\int_0^1 f\,dy\,dx = \int_0^1\frac{dx}{1+x^2} = \frac{\pi}{4}, \qquad \int_0^1\int_0^1 f\,dx\,dy = -\frac{\pi}{4},
$$

这是因为$\int_0^1 f\,dy = \bigl[\tfrac{y}{x^2+y^2}\bigr]_0^1 = \tfrac{1}{1+x^2}$，且$f(y,x) = -f(x,y)$。二重积分不存在：$f$在原点附近无界，并且$\iint\abs{f}\,dA = \infty$。对矩形上的连续函数、非负函数，以及绝对值的积分有限的任何函数，交换积分次序都是安全的——但一般情况下则不然。
:::

一个值得记住的特殊情形：若$f(x,y) = g(x)h(y)$，则$\iint_R f\,dA = \left(\int_a^b g\,dx\right)\left(\int_c^d h\,dy\right)$，因为内层积分$\int_c^d g(x)h(y)\,dy = g(x)\int_c^d h$，常数$\int_c^d h$可以提到外层积分之外。

## 一般区域上的积分

我们感兴趣的区域很少是矩形。对有界区域$D$，用一个矩形$R$把它包含在内，并用零延拓$f$：在$D$上$\tilde f = f$，在$R\setminus D$上$\tilde f = 0$。然后定义$\iint_D f\,dA = \iint_R\tilde f\,dA$。若$f$在$D$上连续，且$D$的边界由有限条光滑曲线组成，则$\tilde f$除$D$的边界外处处连续，所以该积分存在。就计算而言，有两种形状的区域是最基本的。

::: definition I 型区域与 II 型区域 {#def-region-types}
若区域位于两个关于$x$的连续函数的图像之间，即

$$
D = \set{(x,y) : a \le x \le b,\ g_1(x) \le y \le g_2(x)},
$$

则称它为**I 型**区域；若区域位于两个关于$y$的连续函数的图像之间，即$D = \set{(x,y) : c\le y\le d,\ h_1(y) \le x \le h_2(y)}$，则称它为**II 型**区域。
:::

::: theorem I 型和 II 型区域上的累次积分 {#thm-general-fubini}
若$f$在上述 I 型区域$D$上连续，则

$$
\iint_D f\,dA = \int_a^b\int_{g_1(x)}^{g_2(x)} f(x,y)\,dy\,dx ,
$$

类似地，对 II 型区域有$\iint_D f\,dA = \int_c^d\int_{h_1(y)}^{h_2(y)} f(x,y)\,dx\,dy$。
:::

::: proof
取包含$D$的矩形$R = [a,b]\times[c,d]$，对$\tilde f$应用富比尼定理（采用刚才提到的推广形式），$\tilde f$除$D$的边界曲线外处处连续。对固定的$x$，除非$g_1(x)\le y\le g_2(x)$，否则$\tilde f(x, y)$为零，所以$\int_c^d\tilde f(x,y)\,dy = \int_{g_1(x)}^{g_2(x)} f(x,y)\,dy$。
:::

对 I 型区域的计算方法：**画出区域**，让一条竖直线从$x = a$到$x = b$扫过区域，记下这条直线进入区域的位置（$y = g_1(x)$）和离开区域的位置（$y = g_2(x)$）。它们就是内层积分的上下限；外层积分的上下限是常数。

::: example 同一区域，两种次序 {#ex-two-orders}
设$D$是曲线$y = x^2$与$y = \sqrt{x}$之间的区域。按两种次序分别计算$\iint_D xy\,dA$。
::: solution
两条曲线在$x^2 = \sqrt x$处相交，即在$x = 0$和$x = 1$处，在两者之间$\sqrt{x} \ge x^2$。看作 I 型区域，$0 \le x\le1$，$x^2 \le y\le\sqrt x$：

$$
\int_0^1\int_{x^2}^{\sqrt x} xy\,dy\,dx = \int_0^1 x\cdot\frac{x - x^4}{2}\,dx = \frac12\left(\frac13 - \frac16\right) = \frac{1}{12}.
$$

看作 II 型区域，高度为$y\in[0,1]$的水平线在$x = y^2$（曲线$y = \sqrt x$）处进入区域，在$x = \sqrt y$（曲线$y = x^2$）处离开区域：

$$
\int_0^1\int_{y^2}^{\sqrt y} xy\,dx\,dy = \int_0^1 y\cdot\frac{y - y^4}{2}\,dy = \frac{1}{12}.
$$

区域关于直线$y = x$对称，这就是两种计算看起来完全一样的原因。
:::
:::

::: widget region
lower: x^2
upper: sqrt(x)
a: 0
b: 1
left: y^2
right: sqrt(y)
c: 0
d: 1
f: x*y
caption: [[#ex-two-orders]]中的区域。让切片在区域上移动：在 I 型视角下，竖直线段从$y = x^2$向上延伸到$y = \sqrt x$；在 II 型视角下，水平线段从$x = y^2$延伸到$x = \sqrt y$。内层积分的上下限就是切片进入和离开区域的位置；两种次序都给出$\iint_D xy\,dA = 1/12$。
:::

::: example 交换积分次序，使积分可以算出 {#ex-reverse}
计算$\displaystyle\int_0^1\int_x^1 e^{y^2}\,dy\,dx$。
::: solution
按所写的次序，内层积分需要$e^{y^2}$的原函数，而它不是初等函数。积分限描述的是三角形$0\le x\le1$，$x\le y\le1$，其顶点为$(0,0)$、$(0,1)$和$(1,1)$。看作 II 型区域，它是$0\le y\le 1$，$0\le x\le y$。由[[#thm-general-fubini]]，

$$
\int_0^1\int_x^1 e^{y^2}\,dy\,dx = \int_0^1\int_0^y e^{y^2}\,dx\,dy = \int_0^1 y\,e^{y^2}\,dy = \Bigl[\tfrac12 e^{y^2}\Bigr]_0^1 = \frac{e - 1}{2}.
$$

关于$x$的内层积分是平凡的，因为被积函数与$x$无关；而它恰好产生了换元$u = y^2$所需要的因子$y$。
:::
:::

::: widget region
lower: x
upper: 1
a: 0
b: 1
left: 0
right: y
c: 0
d: 1
f: exp(y^2)
caption: [[#ex-reverse]]中的三角形。在 I 型描述中，竖直切片从$y = x$延伸到$y = 1$，而$e^{y^2}$的内层积分无法以闭合形式算出。切换到 II 型：水平切片从$x = 0$延伸到$x = y$，积分就变成初等的了。两种方式得到的值都是$(e-1)/2 \approx 0.859$。
:::

::: quiz
对每个连续函数$f$，下列哪个累次积分都等于$\displaystyle\int_0^2\int_{x/2}^{1} f(x,y)\,dy\,dx$？
- [x] $\displaystyle\int_0^1\int_0^{2y} f(x,y)\,dx\,dy$
- [ ] $\displaystyle\int_0^1\int_{2y}^{2} f(x,y)\,dx\,dy$
- [ ] $\displaystyle\int_{x/2}^1\int_0^2 f(x,y)\,dx\,dy$
- [ ] $\displaystyle\int_0^2\int_0^{y/2} f(x,y)\,dx\,dy$
::: solution
积分区域为$0\le x\le2$，$x/2\le y\le1$：即顶点为$(0,0)$、$(0,1)$和$(2,1)$的三角形。高度为$y\in[0,1]$的水平线与它相交的部分为$0\le x\le 2y$（条件$y \ge x/2$就是$x\le 2y$）。第三个选项的外层积分限是变量，这绝不可能正确：外层积分限必须是常数。
:::
:::

### 面积、质量与质心

对常数$1$积分就得到**面积**：$\text{面积}(D) = \iint_D 1\,dA$。若占据$D$的薄板的**密度**为$\sigma(x,y)$（单位面积的质量），则它的**质量**和**质心**$(\bar x, \bar y)$为

$$
m = \iint_D \sigma\,dA, \qquad \bar x = \frac1m\iint_D x\,\sigma\,dA, \qquad \bar y = \frac1m\iint_D y\,\sigma\,dA,
$$

这些公式是把各小块的质量$\sigma\,\Delta A$及其矩$x\,\sigma\,\Delta A$、$y\,\sigma\,\Delta A$累加起来得到的。当密度为常数时，质心就是**形心**，它是一个纯几何的点。类似地，$f$在$D$上的**平均值**为$\frac{1}{\text{面积}(D)}\iint_D f\,dA$；在连成一片的区域上，连续函数能取到它的平均值。

::: theorem 二重积分中值定理 {#thm-mvt-integral}
设$D$是面积为正的有界闭区域，并且$D$中任意两点都可以用$D$中的一条连续路径连接，$f$在$D$上连续。则存在一点$\mathbf{p}\in D$，使得

$$
\iint_D f\,dA = f(\mathbf{p})\,\text{面积}(D).
$$
:::

::: proof
由最值定理（[[multivariable/extrema#thm-evt]]），$f$在$D$上取到最小值$m = f(\mathbf{p}_1)$和最大值$M = f(\mathbf{p}_2)$。把$m\le f\le M$在$D$上积分（单调性），得$m\,\text{面积}(D) \le \iint_D f\,dA \le M\,\text{面积}(D)$，所以平均值$\mu = \iint_D f\,dA/\text{面积}(D)$落在$[m, M]$中。设$\boldsymbol{\gamma}\colon[0,1]\to D$是从$\mathbf{p}_1$到$\mathbf{p}_2$的一条连续路径。函数$f\circ\boldsymbol\gamma$在$[0,1]$上连续，在两个端点处的值分别为$m$和$M$，所以由介值定理，它在某个$t_0$处取值$\mu$；令$\mathbf{p} = \boldsymbol\gamma(t_0)$即可。
:::

把这个定理应用于以点$\mathbf{a}$为中心、半径为$r$的圆盘$D_r$，就得到一点$\mathbf{p}_r\in D_r$，使得$\frac{1}{\pi r^2}\iint_{D_r}f\,dA = f(\mathbf{p}_r)$，并且当$r\to0$时$\mathbf{p}_r\to\mathbf{a}$。因此，对连续函数$f$，

$$
\lim_{r\to0}\frac{1}{\pi r^2}\iint_{D_r}f\,dA = f(\mathbf{a}):
$$ {#eq-density}

也就是说，连续函数可以由它在小圆盘上的积分还原出来。在[[multivariable/greens-theorem]]和[[multivariable/stokes-divergence]]两章中，正是借助这一点把散度和旋度解释为通量密度和环量密度。

## 三重积分

以上一切都可以推广到三元函数。如果长方体$B = [a,b]\times[c,d]\times[p,q]$上的有界函数关于分成小长方体的分割的黎曼和$\sum f(\mathbf{x}^*_{ijk})\,\Delta V_{ijk}$收敛，就称它是可积的；富比尼定理成立，证明也相同（现在有六种可能的积分次序）；对于位于两个曲面之间的立体，

$$
E = \set{(x,y,z) : (x,y)\in D,\ u_1(x,y)\le z\le u_2(x,y)}, \qquad \iiint_E f\,dV = \iint_D\left(\int_{u_1(x,y)}^{u_2(x,y)} f\,dz\right)dA .
$$

$E$的体积为$\iiint_E 1\,dV$；密度为$\rho$的立体的质量为$\iiint_E\rho\,dV$，质心坐标为$\bar z = \frac1m\iiint_E z\rho\,dV$，等等。

::: example 四面体的形心 {#ex-tetrahedron}
设$E$是由三个坐标平面和平面$x + y + z = 1$围成的四面体。求它的体积及其形心的高度$\bar z$。
::: solution
该立体位于$xy$平面上的三角形$D$：$0 \le x\le1$，$0\le y\le 1-x$的上方，以及平面$z = 1 - x - y$的下方。所以

$$
\iiint_E z\,dV = \int_0^1\int_0^{1-x}\int_0^{1-x-y} z\,dz\,dy\,dx = \int_0^1\int_0^{1-x}\frac{(1-x-y)^2}{2}\,dy\,dx = \int_0^1\frac{(1-x)^3}{6}\,dx = \frac{1}{24},
$$

同样地，$\text{体积}(E) = \int_0^1\int_0^{1-x}(1-x-y)\,dy\,dx = \int_0^1\frac{(1-x)^2}{2}\,dx = \frac16$。因此$\bar z = \dfrac{1/24}{1/6} = \dfrac14$。由对称性，也有$\bar x = \bar y = \tfrac14$：四面体的形心位于从每个面到相对顶点的四分之一处。
:::
:::

## 极坐标

在圆盘、圆环和扇形上的积分，用$x$和$y$来算很麻烦——积分限中含有平方根——但用**极坐标**$x = r\cos\theta$，$y = r\sin\theta$（[[calculus-2/parametric-polar]]）来算就很简单。问题是：用什么来代替$dA = dx\,dy$？

用圆$r = r_i$和射线$\theta = \theta_j$分割平面。典型的一小块，即**极坐标矩形**$r_{i-1}\le r\le r_i$，$\theta_{j-1}\le\theta\le\theta_j$，是两个扇形之差，所以它的面积恰好是

$$
\Delta A = \tfrac12 r_i^2\,\Delta\theta - \tfrac12 r_{i-1}^2\,\Delta\theta = \frac{r_i + r_{i-1}}{2}\,(r_i - r_{i-1})\,\Delta\theta = r_i^*\,\Delta r\,\Delta\theta,
$$

其中$r_i^*$是中点处的半径。极坐标矩形**不是**边长为$\Delta r$和$\Delta\theta$的矩形：它的两边分别是$\Delta r$和近似为$r\,\Delta\theta$的一段弧，弧长随到原点的距离增大而增大。这个精确的公式是下面定理的核心。

::: theorem 极坐标下的积分 {#thm-polar}
设$D$为满足$\alpha\le\theta\le\beta$、$h_1(\theta)\le r\le h_2(\theta)$的点$(r\cos\theta, r\sin\theta)$构成的集合，其中$0\le\beta - \alpha\le2\pi$，且$0\le h_1\le h_2$都是连续函数。若$f$在$D$上连续，则

$$
\iint_D f(x,y)\,dA = \int_\alpha^\beta\int_{h_1(\theta)}^{h_2(\theta)} f(r\cos\theta, r\sin\theta)\,r\,dr\,d\theta, \qquad D = \set{\alpha\le\theta\le\beta,\ h_1(\theta)\le r\le h_2(\theta)}.
$$ {#eq-polar}

:::

::: proof
*证明概要*。把参数矩形$[r_{\min}, r_{\max}]\times[\alpha, \beta]$分成若干小矩形；它们的像是覆盖$D$的极坐标矩形。把每个样本点都取在中点半径$r_i^*$处，恒等式$\Delta A = r_i^*\,\Delta r\,\Delta\theta$就把$\iint_D f\,dA$的黎曼和$\sum f(\mathbf{x}^*)\,\Delta A$变成了函数$f(r\cos\theta, r\sin\theta)\,r$在参数矩形上的黎曼和，令细度趋于$0$即得公式。这个概要略去的一点是：极坐标矩形并不是[[#def-double-integral]]中的普通矩形；这个漏洞将在[[multivariable/change-of-variables#thm-change-of-variables]]中补上，[[#eq-polar]]是该定理的特例，其中因子$r$作为雅可比行列式出现。
:::

简言之，$dA = r\,dr\,d\theta$。

::: example 抛物面下方的体积 {#ex-paraboloid}
求位于$xy$平面上方、抛物面$z = 4 - x^2 - y^2$下方的立体的体积。
::: solution
抛物面与平面$z = 0$相交于圆$x^2 + y^2 = 4$，所以该立体位于圆盘$r \le 2$上方，那里的高度为$4 - r^2$。由[[#eq-polar]]，

$$
V = \int_0^{2\pi}\int_0^2(4 - r^2)\,r\,dr\,d\theta = 2\pi\left[2r^2 - \frac{r^4}{4}\right]_0^2 = 2\pi(8 - 4) = 8\pi .
$$

在直角坐标中，同一个体积为$\int_{-2}^2\int_{-\sqrt{4-x^2}}^{\sqrt{4-x^2}}(4 - x^2 - y^2)\,dy\,dx$，计算起来要麻烦得多。
:::
:::

::: example 高斯积分 {#ex-gaussian}
证明$\displaystyle\int_{-\infty}^{\infty}e^{-x^2}\,dx = \sqrt{\pi}$。
::: solution
令$I(a) = \int_{-a}^{a}e^{-x^2}\,dx$，它随$a$增大而增大，并且当$a\to\infty$时收敛（当$\abs{x}\ge1$时与$e^{-\abs{x}}$比较；见[[calculus-1/improper-integrals]]）。由上面提到的富比尼定理的乘积情形，在正方形$S_a = [-a,a]^2$上，

$$
I(a)^2 = \int_{-a}^a e^{-x^2}\,dx\int_{-a}^a e^{-y^2}\,dy = \iint_{S_a} e^{-(x^2+y^2)}\,dA .
$$

被积函数为正，而正方形$S_a$包含半径为$a$的圆盘$D_a$，又包含于圆盘$D_{a\sqrt2}$中。在半径为$b$的圆盘上，用极坐标得

$$
\iint_{D_b}e^{-(x^2+y^2)}\,dA = \int_0^{2\pi}\int_0^b e^{-r^2}\,r\,dr\,d\theta = 2\pi\left[-\tfrac12e^{-r^2}\right]_0^b = \pi\left(1 - e^{-b^2}\right).
$$

因此$\pi(1 - e^{-a^2}) \le I(a)^2 \le \pi(1 - e^{-2a^2})$。令$a\to\infty$，上下界都趋于$\pi$，所以$\left(\int_{-\infty}^\infty e^{-x^2}\,dx\right)^2 = \pi$，而该积分（为正数）等于$\sqrt\pi$。正是$dA = r\,dr\,d\theta$中的因子$r$，使得$e^{-r^2}$的积分能以闭合形式求出。
:::
:::

::: widget surface
f: exp(-x^2 - y^2)
x: -2.5, 2.5
y: -2.5, 2.5
contours: true
color: height
caption: 钟形曲面$z = e^{-(x^2+y^2)}$。它的等值线是圆，这正是极坐标适用于它的原因；它下方的体积恰好是$\pi$（[[#ex-gaussian]]）。每个竖直截面$y = $常数都是一元钟形曲线$e^{-x^2}$按比例缩放后的副本。
:::

::: application 正态分布
标准正态密度$\varphi(x) = \frac{1}{\sqrt{2\pi}}e^{-x^2/2}$是统计学中最重要的函数。它的总积分为$1$，这一点可以通过换元$x = \sqrt2\,u$由[[#ex-gaussian]]得到。若$X$和$Y$是相互独立的标准正态随机变量，则它们的联合密度$\varphi(x)\varphi(y) = \frac{1}{2\pi}e^{-(x^2+y^2)/2}$（[[probability/joint-distributions]]）只依赖于到原点的距离，所以$(X,Y)$的分布是旋转对称的——这正是生成正态随机数的 Box–Muller 方法的出发点（[[multivariable/change-of-variables]]）。
:::

## 柱面坐标与球面坐标

在空间中，有两种与对称性相适应的坐标系经常被使用。

**柱面坐标**$(r, \theta, z)$就是$xy$平面上的极坐标再加上高度$z$：$x = r\cos\theta$，$y = r\sin\theta$，$z = z$。一个小的柱面坐标块的底面积为$r\,\Delta r\,\Delta\theta$，高为$\Delta z$，所以

$$
\iiint_E f\,dV = \iiint f(r\cos\theta, r\sin\theta, z)\,r\,dz\,dr\,d\theta .
$$ {#eq-cylindrical}

柱面坐标适用于有对称轴的立体：圆柱、圆锥和旋转抛物面。

::: example 圆柱体的转动惯量 {#ex-inertia}
一个半径为$R$、高为$h$、密度为常数$\rho$的实心圆柱体绕其轴旋转。用它的质量$M$表示它的转动惯量$I = \iiint_E \rho\,(x^2+y^2)\,dV$。
::: solution
取圆柱体的轴为$z$轴，则$E$为$0\le r\le R$，$0\le\theta\le2\pi$，$0\le z\le h$，且$x^2 + y^2 = r^2$。由[[#eq-cylindrical]]，

$$
I = \rho\int_0^{2\pi}\int_0^R\int_0^h r^2\cdot r\,dz\,dr\,d\theta = \rho\cdot2\pi\cdot\frac{R^4}{4}\cdot h = \frac{\pi\rho R^4h}{2}.
$$

质量为$M = \rho\pi R^2h$，所以$I = \tfrac12MR^2$。质量相同的空心圆管，其全部质量都位于距离$R$处，转动惯量为$I = MR^2$：实心圆柱体更容易转动起来，这就是装满的罐头沿斜坡滚下时比空罐头更快的原因。
:::
:::

**球面坐标**$(\rho, \phi, \theta)$用以下三个量确定一个点：它到原点的距离$\rho\ge0$，它的位置向量与$z$轴正向的夹角$\phi\in[0,\pi]$，以及与柱面坐标中相同的方位角$\theta$：

$$
x = \rho\sin\phi\cos\theta, \qquad y = \rho\sin\phi\sin\theta, \qquad z = \rho\cos\phi .
$$

小区域$\rho\in[\rho_1,\rho_2]$，$\phi\in[\phi_1,\phi_2]$，$\theta\in[\theta_1,\theta_2]$近似于一个长方体，其棱长分别为$\Delta\rho$（沿径向）、$\rho\,\Delta\phi$（沿经线）和$\rho\sin\phi\,\Delta\theta$（沿纬线圈，其半径为$\rho\sin\phi$）。实际上，利用阿基米德（Archimedes）的球扇形体积公式，它的体积恰好是$\tfrac13(\rho_2^3 - \rho_1^3)(\cos\phi_1 - \cos\phi_2)\,\Delta\theta$，由中值定理，它等于$\tilde\rho^2\sin\tilde\phi\,\Delta\rho\,\Delta\phi\,\Delta\theta$，其中$\tilde\rho, \tilde\phi$是某些中间值。因此$dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$：

$$
\iiint_E f\,dV = \iiint f(\rho\sin\phi\cos\theta,\ \rho\sin\phi\sin\theta,\ \rho\cos\phi)\,\rho^2\sin\phi\,d\rho\,d\phi\,d\theta .
$$ {#eq-spherical}

对半径为$R$的球体，由此立即得到$\int_0^{2\pi}\int_0^\pi\int_0^R\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot2\cdot\tfrac{R^3}{3} = \tfrac43\pi R^3$。

::: example 冰淇淋蛋筒 {#ex-icecream}
求位于球面$x^2 + y^2 + z^2 = 1$内部、锥面$z = \sqrt{x^2 + y^2}$上方的立体的体积。
::: solution
在球面坐标中，球面为$\rho = 1$，锥面$z = \sqrt{x^2+y^2}$为$\rho\cos\phi = \rho\sin\phi$，即$\phi = \pi/4$。该立体为$0\le\rho\le1$，$0\le\phi\le\pi/4$，$0\le\theta\le2\pi$，所以

$$
V = \int_0^{2\pi}\int_0^{\pi/4}\int_0^1\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot\Bigl[-\cos\phi\Bigr]_0^{\pi/4}\cdot\frac13 = \frac{2\pi}{3}\left(1 - \frac{\sqrt2}{2}\right) = \frac{\pi(2-\sqrt2)}{3} \approx 0.613 .
$$
:::
:::

::: quiz
下列哪个积分给出半径为$2$的球体的体积？
- [ ] $\displaystyle\int_0^{2\pi}\int_0^{2\pi}\int_0^2 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$
- [x] $\displaystyle\int_0^{2\pi}\int_0^{\pi}\int_0^2 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$
- [ ] $\displaystyle\int_0^{2\pi}\int_0^{\pi}\int_0^2 d\rho\,d\phi\,d\theta$
- [ ] $\displaystyle\int_0^{2\pi}\int_0^{\pi}\int_0^2 \rho\,d\rho\,d\phi\,d\theta$
::: solution
极角$\phi$只从$0$（北极）变到$\pi$（南极）；让它变到$2\pi$会把球体覆盖两次，更糟的是，在$(\pi, 2\pi)$上$\sin\phi < 0$，会使积分为$0$。体积元是$\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$；没有因子$\rho^2\sin\phi$，我们算的就是坐标空间中长方体$[0,2]\times[0,\pi]\times[0,2\pi]$的体积，而不是球体的体积。正确的积分给出$\tfrac{32\pi}{3}$。
:::
:::

::: warning 不要忘记体积因子，也不要混淆记号约定
使用曲线坐标时最常见的错误是写成$dA = dr\,d\theta$或$dV = d\rho\,d\phi\,d\theta$；因子$r$和$\rho^2\sin\phi$必不可少，它们衡量坐标网格被拉伸的程度。第二个陷阱是记号：许多物理书把名称互换，用$\theta$表示从$z$轴量起的极角，用$\phi$表示方位角，并用$r$表示到原点的距离。无论用哪种记号，体积元都是同一个几何对象——正弦总是属于从轴量起的那个角。
:::

::: history
通过切片求立体体积的做法可以追溯到博纳文图拉·卡瓦列里（Bonaventura Cavalieri），他在《不可分量几何学》（*Geometria indivisibilibus*，1635）中通过比较截面来比较立体；还可以更早追溯到阿基米德（Archimedes），他通过让薄片保持平衡求出了球的体积。一般区域上的二重积分及其化为累次积分的计算方法，是莱昂哈德·欧拉（Leonhard Euler）在18世纪发展起来的；1773年，约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）在研究椭球体的引力时把体积写成三重积分，并把它们变换到球面坐标。对于18、19世纪的积分，人们对性质良好的函数随意交换积分次序；交换次序成立的确切条件，对勒贝格积分是由圭多·富比尼（Guido Fubini）在1907年确定的，对非负函数则是由莱昂尼达·托内利（Leonida Tonelli）在1909年确定的。
:::

## 后续内容

因子$r$和$\rho^2\sin\phi$都是雅可比行列式的特例；[[multivariable/change-of-variables]]一章将证明一般的换元公式，它使我们能够针对任意区域选取与之相适应的坐标。由曲线围成的区域上的二重积分与沿其边界的曲线积分通过格林公式联系起来（[[multivariable/greens-theorem]]），三重积分与曲面积分则通过散度定理（高斯公式）联系起来（[[multivariable/stokes-divergence]]）。在概率论中，把联合密度在平面区域上积分，就可以计算概率和数学期望（[[probability/joint-distributions]]）；当积分无法以闭合形式求出时，可以用[[numerical-analysis/numerical-integration]]一章中的方法或蒙特卡罗抽样来近似计算。[[measure-theory/lebesgue-integral]]一章引入的勒贝格积分，正是富比尼定理取得其天然一般形式的框架，即测度论中的富比尼–托内利定理。

::: summary
- $\iint_R f\,dA$是黎曼和$\sum f(\mathbf{x}_{ij}^*)\,\Delta A_{ij}$的极限；当$f\ge0$时，它是图像下方的体积（[[#def-double-integral]]）。
- 富比尼定理：对矩形上的连续函数$f$，二重积分等于两个累次积分中的任何一个（[[#thm-fubini]]）。没有前提条件时（例如$f$无界），两个累次积分可能不相等。
- 在 I 型区域上，$\iint_D f\,dA = \int_a^b\int_{g_1(x)}^{g_2(x)}f\,dy\,dx$：画出区域，由扫过区域的切片读出内层积分的上下限；外层积分的上下限是常数。
- 交换积分次序可以把无法计算的积分变成容易计算的积分；重新画出区域来确定新的积分限。
- 面积、质量、质心和平均值都是积分；三重积分的用法与此相同。
- 极坐标：$dA = r\,dr\,d\theta$（[[#eq-polar]]）；柱面坐标：$dV = r\,dz\,dr\,d\theta$（[[#eq-cylindrical]]）；球面坐标：$dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$，其中$0\le\phi\le\pi$（[[#eq-spherical]]）。
- 利用极坐标可得$\int_{-\infty}^\infty e^{-x^2}\,dx = \sqrt\pi$。
:::

## 习题

::: exercise 矩形区域 {level=1 check="11/3"}
计算$\displaystyle\iint_R (x + y^2)\,dA$，其中$R = [0,1]\times[0,2]$。
::: solution
$\displaystyle\int_0^1\int_0^2(x + y^2)\,dy\,dx = \int_0^1\left(2x + \frac83\right)dx = 1 + \frac83 = \frac{11}{3}$。
:::
:::

::: exercise 三角形区域 {level=1 check="1/3"}
计算$\displaystyle\iint_D (x + y)\,dA$，其中$D$是顶点为$(0,0)$、$(1,0)$和$(0,1)$的三角形。
::: solution
$D$为$0\le x\le1$，$0\le y\le1-x$。内层积分为$\int_0^{1-x}(x + y)\,dy = x(1-x) + \tfrac12(1-x)^2 = \tfrac12(1-x)(1+x)$，而$\tfrac12\int_0^1(1 - x^2)\,dx = \tfrac12\cdot\tfrac23 = \tfrac13$。
:::
:::

::: exercise 极坐标 {level=1 check="pi*(1 - exp(-4))"}
在圆盘$x^2 + y^2\le 4$上计算$\displaystyle\iint_D e^{-(x^2+y^2)}\,dA$。
::: solution
用极坐标，$\int_0^{2\pi}\int_0^2 e^{-r^2}r\,dr\,d\theta = 2\pi\left[-\tfrac12e^{-r^2}\right]_0^2 = \pi(1 - e^{-4})$。
:::
:::

::: exercise 交换积分次序 {level=2 check="2*(2*sqrt(2) - 1)/9"}
计算$\displaystyle\int_0^1\int_{\sqrt x}^1\sqrt{y^3 + 1}\,dy\,dx$。
::: hint
画出积分区域的草图，并把它描述为 II 型区域。
:::
::: solution
积分区域为$0\le x\le 1$，$\sqrt x\le y\le1$，即$0\le y\le1$，$0\le x\le y^2$。所以积分等于

$$
\int_0^1\int_0^{y^2}\sqrt{y^3+1}\,dx\,dy = \int_0^1 y^2\sqrt{y^3+1}\,dy = \Bigl[\tfrac29(y^3+1)^{3/2}\Bigr]_0^1 = \tfrac29\left(2\sqrt2 - 1\right).
$$
:::
:::

::: exercise 半圆盘的形心 {level=2 check="4/(3*pi)"}
求半圆盘$x^2 + y^2\le1$，$y\ge0$的形心的高度$\bar y$。
::: solution
面积为$\pi/2$。用极坐标，$\iint y\,dA = \int_0^\pi\int_0^1 (r\sin\theta)\,r\,dr\,d\theta = \tfrac13\bigl[-\cos\theta\bigr]_0^\pi = \tfrac23$。所以$\bar y = \dfrac{2/3}{\pi/2} = \dfrac{4}{3\pi}\approx 0.424$。
:::
:::

::: exercise 密度不均匀的球体 {level=2 check="pi"}
一个半径为$1$的球体，其密度等于到球心的距离。求它的质量。
::: solution
在球面坐标中，密度为$\rho$，所以$m = \int_0^{2\pi}\int_0^\pi\int_0^1\rho\cdot\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot2\cdot\tfrac14 = \pi$。
:::
:::

::: exercise 斜截圆柱体 {level=2 check="2*pi"}
求位于圆柱面$x^2 + y^2 = 1$内部、平面$z = 0$上方、平面$z = 2 - y$下方的立体的体积。
::: solution
在单位圆盘$D$中的点$(x,y)$上方，立体的高度为$2 - y > 0$。所以$V = \iint_D(2 - y)\,dA = 2\cdot\text{面积}(D) - \iint_D y\,dA = 2\pi - 0$，这是因为由对称性$\iint_D y\,dA = 0$（$y\mapsto -y$把$D$映到自身，并改变被积函数的符号）。所以$V = 2\pi$。
:::
:::

::: exercise 球体的转动惯量 {level=3 check="8*pi/15"}
在单位球体$B$上计算$\iiint_B (x^2 + y^2)\,dV$，并由此推出：质量为$M$、半径为$R$的实心球体关于一条直径的转动惯量为$\tfrac25MR^2$。
::: solution
在球面坐标中$x^2 + y^2 = \rho^2\sin^2\phi$，所以该积分为

$$
\int_0^{2\pi}\int_0^\pi\int_0^1\rho^4\sin^3\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot\frac43\cdot\frac15 = \frac{8\pi}{15},
$$

这里用到了$\int_0^\pi\sin^3\phi\,d\phi = \int_{-1}^1(1 - u^2)\,du = \tfrac43$（令$u = \cos\phi$）。对于半径为$R$、密度为$\rho_0$的球体，把每个坐标都放大$R$倍会使积分乘以$R^5$，所以$I = \rho_0\cdot\tfrac{8\pi}{15}R^5$。由于$M = \rho_0\cdot\tfrac43\pi R^3$，所以$I = \tfrac{8\pi}{15}\cdot\tfrac{3}{4\pi}MR^2 = \tfrac25MR^2$。
:::
:::

::: exercise 不相等的累次积分 {level=3}
设$f(x,y) = \dfrac{x^2-y^2}{(x^2+y^2)^2}$。证明$\displaystyle\int_0^1\int_0^1 f\,dy\,dx = \frac\pi4$，而$\displaystyle\int_0^1\int_0^1 f\,dx\,dy = -\frac\pi4$，并解释为什么这与富比尼定理并不矛盾。
::: hint
验证$\pdv{}{y}\left(\dfrac{y}{x^2+y^2}\right) = f(x,y)$。
:::
::: solution
当$x > 0$时，$\pdv{}{y}\dfrac{y}{x^2+y^2} = \dfrac{(x^2+y^2) - 2y^2}{(x^2+y^2)^2} = f(x,y)$，所以$\int_0^1 f\,dy = \dfrac{1}{x^2+1}$，且$\int_0^1\frac{dx}{1+x^2} = \arctan 1 = \frac\pi4$。由于$f(y,x) = -f(x,y)$，另一个累次积分的计算与此相同，只是两个变量的角色互换、符号相反：结果为$-\frac\pi4$。这并不矛盾，因为$f$在$[0,1]^2$上不连续——它在原点附近无界（例如$f(x,0) = 1/x^2$）——并且$\iint\abs{f}\,dA = \infty$：在极坐标下$\abs{f} = \abs{\cos2\theta}/r^2$，仅四分之一圆盘$r\le1$的贡献就已是$\int_0^{\pi/2}\abs{\cos2\theta}\,d\theta\int_0^1\frac{dr}{r} = \infty$。所以富比尼定理的任何一种形式都不适用。
:::
:::

::: exercise 柱壳法 {level=3}
设$0\le a<b$，$f\ge0$在$[a,b]$上连续。把区域$0\le y\le f(x)$，$a\le x\le b$绕$y$轴旋转。利用柱面坐标（以$y$轴为轴）证明所得旋转体的体积为$2\pi\displaystyle\int_a^b x f(x)\,dx$。
::: solution
使用以$y$轴为轴的柱面坐标：一个点由它的高度$y$、它到$y$轴的距离$r$以及一个角$\theta$来描述，体积元为$r\,dy\,dr\,d\theta$（[[#eq-cylindrical]]中$y$与$z$的角色互换）。该立体恰好是集合$a\le r\le b$，$0\le y\le f(r)$，$0\le\theta\le2\pi$，因为到轴的距离为$r$的点位于立体中，当且仅当点$(r, y)$位于原来的区域中。因此

$$
V = \int_0^{2\pi}\int_a^b\int_0^{f(r)} r\,dy\,dr\,d\theta = 2\pi\int_a^b r\,f(r)\,dr,
$$

把$r$改记为$x$，这就是所要证明的公式。每个半径为$x$、高为$f(x)$、厚为$dx$的薄柱壳贡献$2\pi x f(x)\,dx$。
:::
:::
