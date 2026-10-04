你站在一片山坡上，所在位置的海拔高度为$z = f(x, y)$，其中$x$和$y$分别是你所在位置向东和向北的坐标。偏导数$f_x$和$f_y$告诉你：朝正东或正北行走时，地面有多陡。但你可以朝**任何**方向走。朝东北方向走的路有多陡？地面朝哪个方向上升得最陡，那里的坡度有多大？朝哪些方向走可以完全不用爬坡？

这三个问题的答案相同，都装在同一个向量里：**梯度**$\nabla f$。它指向正上坡方向，它的长度就是最陡的坡度，它与地图上的等高线垂直，而它与任一单位向量的点积就给出该方向上的坡度。本章将证明这些事实，用梯度写出曲面的切平面和线性近似，介绍一个在每个方向上都有斜率却不可微的函数，最后讨论梯度下降法——现代机器学习中的大多数模型都是用这个算法训练出来的。

本章中，$f$始终表示开集$U \subseteq \R^n$上的实值函数，通常$n = 2$或$3$；$\R^n$中的点写成向量$\mathbf{a}, \mathbf{x}$。我们要用到[[multivariable/partial-derivatives]]一章中的可微性概念和链式法则。

## 方向导数

偏导数$f_x(\mathbf{a})$是从$\mathbf{a}$出发沿$\mathbf{i}$的方向移动时$f$的变化率，$f_y(\mathbf{a})$则是沿$\mathbf{j}$方向的变化率。自然的推广是允许任意方向，方向用一个单位向量来描述。

::: definition 方向导数 {#def-directional}
设$\mathbf{u}$为单位向量。$f$在$\mathbf{a}$处沿方向$\mathbf{u}$的**方向导数**为

$$
D_{\mathbf{u}}f(\mathbf{a}) = \lim_{h\to 0}\frac{f(\mathbf{a} + h\mathbf{u}) - f(\mathbf{a})}{h},
$$

这里要求该极限存在。
:::

从几何上看，$D_{\mathbf{u}}f(\mathbf{a})$是过$\mathbf{a}$、沿方向$\mathbf{u}$的竖直平面截$f$的图像所得曲线的斜率：它是一元函数$g(t) = f(\mathbf{a} + t\mathbf{u})$在$t = 0$处的普通导数，而$g(t)$记录的是你以单位速率沿方向$\mathbf{u}$经过$\mathbf{a}$时$f$的高度。取$\mathbf{u} = \mathbf{i}$或$\mathbf{j}$，就回到偏导数：$D_{\mathbf{i}}f = f_x$，$D_{\mathbf{j}}f = f_y$。用$-\mathbf{u}$代替$\mathbf{u}$，符号随之改变：$D_{-\mathbf{u}}f(\mathbf{a}) = -D_{\mathbf{u}}f(\mathbf{a})$（在极限中作代换$h \mapsto -h$即可）。

为什么坚持要求$\mathbf{u}$是单位向量？因为我们要的是**每单位距离**的变化率。如果用$2\mathbf{u}$，就相当于以两倍的速度行走，极限也会加倍。

::: example 由定义计算方向导数 {#ex-directional}
设$f(x, y) = x^2 + 3xy$。求$f$在点$(1, 2)$处沿$\mathbf{u} = \left(\tfrac35, \tfrac45\right)$方向的方向导数。
::: solution
首先，$\norm{\mathbf{u}} = \sqrt{9/25 + 16/25} = 1$，所以$\mathbf{u}$是单位向量。我们有$f(1, 2) = 1 + 6 = 7$，以及

$$
\begin{aligned}
f\left(1 + \tfrac{3h}{5},\, 2 + \tfrac{4h}{5}\right) &= \left(1 + \tfrac{3h}{5}\right)^2 + 3\left(1 + \tfrac{3h}{5}\right)\left(2 + \tfrac{4h}{5}\right) \\
&= 1 + \tfrac{6h}{5} + \tfrac{9h^2}{25} + 6 + 6h + \tfrac{36h^2}{25} = 7 + \tfrac{36}{5}h + \tfrac{9}{5}h^2 .
\end{aligned}
$$

因此

$$
D_{\mathbf{u}}f(1,2) = \lim_{h\to0}\frac{\tfrac{36}{5}h + \tfrac95 h^2}{h} = \lim_{h\to0}\left(\tfrac{36}{5} + \tfrac95 h\right) = \frac{36}{5}.
$$

注意在点$(1,2)$处，$f_x = 2x + 3y = 8$，$f_y = 3x = 3$，而$8\cdot\tfrac35 + 3\cdot\tfrac45 = \tfrac{24 + 12}{5} = \tfrac{36}{5}$。这并非巧合，下面就来证明这一点。
:::
:::

## 梯度

::: definition 梯度 {#def-gradient}
若$f$在$\mathbf{a} \in \R^n$处的各偏导数都存在，则$f$在$\mathbf{a}$处的**梯度**是由这些偏导数构成的向量

$$
\nabla f(\mathbf{a}) = \left(\pdv{f}{x_1}(\mathbf{a}),\, \pdv{f}{x_2}(\mathbf{a}),\, \dots,\, \pdv{f}{x_n}(\mathbf{a})\right).
$$

当$n = 3$时，即$\nabla f = (f_x, f_y, f_z) = f_x\,\mathbf{i} + f_y\,\mathbf{j} + f_z\,\mathbf{k}$。符号$\nabla$读作“nabla”或“del”。
:::

梯度就是[[multivariable/partial-derivatives]]一章中的$1\times n$导数矩阵$Df(\mathbf{a})$写成向量的形式。回忆[[multivariable/partial-derivatives#def-differentiable]]：如果$f$在$\mathbf{a}$处有良好的线性近似，就称$f$在$\mathbf{a}$处**可微**；对实值函数而言，这恰好是说

$$
f(\mathbf{a} + \mathbf{h}) = f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\mathbf{h} + R(\mathbf{h}), \qquad\text{其中}\quad \frac{R(\mathbf{h})}{\norm{\mathbf{h}}} \to 0 \text{ 当 } \mathbf{h}\to\mathbf{0}.
$$ {#eq-differentiable}

由[[multivariable/partial-derivatives#thm-c1-differentiable]]，只要各偏导数在$\mathbf{a}$附近存在且在$\mathbf{a}$处连续，上式就成立。由多项式、指数函数、三角函数等构造出来的函数，除了公式失去意义的点之外，都满足这一条件。

::: theorem 用梯度表示方向导数 {#thm-directional-gradient}
若$f$在$\mathbf{a}$处可微，则对每个单位向量$\mathbf{u}$，方向导数都存在，并且

$$
D_{\mathbf{u}}f(\mathbf{a}) = \nabla f(\mathbf{a})\cdot\mathbf{u}.
$$
:::

::: proof
在[[#eq-differentiable]]中令$\mathbf{h} = t\mathbf{u}$，其中$t \ne 0$很小。由于$\norm{t\mathbf{u}} = \abs{t}$，

$$
\frac{f(\mathbf{a} + t\mathbf{u}) - f(\mathbf{a})}{t} = \nabla f(\mathbf{a})\cdot\mathbf{u} + \frac{R(t\mathbf{u})}{t}, \qquad \abs{\frac{R(t\mathbf{u})}{t}} = \frac{\abs{R(t\mathbf{u})}}{\norm{t\mathbf{u}}} .
$$

当$t \to 0$时$t\mathbf{u}\to\mathbf{0}$，于是由可微性，最后这个量趋于$0$。因此差商趋于$\nabla f(\mathbf{a})\cdot\mathbf{u}$。
:::

（等价地说：$g(t) = f(\mathbf{a} + t\mathbf{u})$是一个复合函数，由链式法则（[[multivariable/partial-derivatives#thm-chain-rule]]）得$g'(0) = \nabla f(\mathbf{a})\cdot\mathbf{u}$。）

于是，一个由$n$个数组成的向量就编码了**所有**方向上的斜率。把这一点与点积的几何意义结合起来，就能回答登山者的问题。

::: theorem 梯度方向是最速上升方向 {#thm-steepest}
设$f$在$\mathbf{a}$处可微，且$\nabla f(\mathbf{a}) \ne \mathbf{0}$。当$\mathbf{u}$取遍所有单位向量时：

1. $D_{\mathbf{u}}f(\mathbf{a})$的最大值为$\norm{\nabla f(\mathbf{a})}$，且仅在$\mathbf{u} = \nabla f(\mathbf{a})/\norm{\nabla f(\mathbf{a})}$时取到；
2. 最小值为$-\norm{\nabla f(\mathbf{a})}$，且仅在相反方向上取到；
3. $D_{\mathbf{u}}f(\mathbf{a}) = 0$当且仅当$\mathbf{u}$与$\nabla f(\mathbf{a})$正交。
:::

::: proof
由[[#thm-directional-gradient]]和柯西-施瓦茨（Cauchy–Schwarz）不等式（[[multivariable/vectors-geometry#thm-cauchy-schwarz]]），

$$
\abs{D_{\mathbf{u}}f(\mathbf{a})} = \abs{\nabla f(\mathbf{a})\cdot\mathbf{u}} \le \norm{\nabla f(\mathbf{a})}\,\norm{\mathbf{u}} = \norm{\nabla f(\mathbf{a})},
$$

所以每个方向导数都落在$[-\norm{\nabla f(\mathbf{a})}, \norm{\nabla f(\mathbf{a})}]$中。柯西-施瓦茨不等式中的等号仅当$\mathbf{u}$是$\nabla f(\mathbf{a})$的倍数时成立；这样的单位向量为$\pm\nabla f(\mathbf{a})/\norm{\nabla f(\mathbf{a})}$，对应的值为$\pm\norm{\nabla f(\mathbf{a})}$。这就证明了(1)和(2)。结论(3)可由$D_{\mathbf{u}}f(\mathbf{a}) = \nabla f(\mathbf{a})\cdot\mathbf{u}$直接得到。
:::

用[[multivariable/vectors-geometry#thm-dot-geometric]]的语言来说：$D_{\mathbf{u}}f(\mathbf{a}) = \norm{\nabla f(\mathbf{a})}\cos\theta$，其中$\theta$是$\mathbf{u}$与梯度的夹角。斜率在$\theta = 0$时最大，在$\theta = \pi/2$时为零，在$\theta = \pi$时最负。

::: example 最陡的上山路线 {#ex-hill}
一座山的高度为$f(x, y) = 4 - x^2 - 2y^2$，一名登山者站在$(1, 1)$处。求最速上升方向及该方向上的坡度、使登山者保持高度不变的方向，以及径直朝山顶走去的路径的坡度。
::: solution
$\nabla f = (-2x, -4y)$，所以$\nabla f(1,1) = (-2, -4)$。最速上升方向为$\mathbf{u} = (-2,-4)/\sqrt{20} = (-1,-2)/\sqrt5$，坡度为$\norm{\nabla f(1,1)} = \sqrt{20} = 2\sqrt5 \approx 4.47$。

高度不变的方向是与$(-2,-4)$正交的单位向量，即$\pm(2,-1)/\sqrt5$。

山顶在原点（那里$\nabla f = \mathbf{0}$）。从$(1,1)$指向山顶的方向是$\mathbf{v} = (-1,-1)/\sqrt2$，而

$$
D_{\mathbf{v}}f(1,1) = (-2,-4)\cdot\frac{(-1,-1)}{\sqrt2} = \frac{6}{\sqrt2} = 3\sqrt2 \approx 4.24 .
$$

径直朝山顶走**并不是**最陡的上山路线：由于山在$y$方向上更陡，最陡的路径一开始会偏向$x$轴。（[[#exr-steepest-path]]将在一个类似的曲面上求出整条最速下降路径。）
:::
:::

::: widget contour
f: x*exp(-x^2 - y^2)
x: -2, 2
y: -2, 2
levels: 16
gradient: true
point: 0.3, 0.6
caption: $f(x,y) = x e^{-x^2-y^2}$的等高线：右边是一座山丘，左边是一个洼地。拖动该点。梯度箭头总是垂直于过该点的等高线，并指向上坡方向；在等高线密集处（地面陡峭）箭头较长，在山顶$(1/\sqrt2, 0)$和洼地底部$(-1/\sqrt2, 0)$处缩为零。旋转方向时读出方向导数：沿梯度方向最大，沿等高线方向为零。
:::

::: quiz
某可微函数在点$\mathbf{a}$处有$\nabla f(\mathbf{a}) = (3, -4)$。$f$在$\mathbf{a}$处每单位距离的最大增长率是多少？
- [ ] $-1$
- [ ] $7$
- [x] $5$
- [ ] $25$
::: solution
由[[#thm-steepest]]，最大的方向导数是$\norm{\nabla f(\mathbf{a})} = \sqrt{3^2 + 4^2} = 5$，在方向$(3,-4)/5$上取到。各分量之和$-1$是沿非单位向量$(1,1)$的导数；而$7 = 3 + 4$不是沿任何单位方向的方向导数（它超过了$5$）。
:::
:::

## 梯度与等值集

$f$的**等值集**是形如$\set{\mathbf{x} : f(\mathbf{x}) = c}$的集合：当$n = 2$时它是地图上的一条等高线，当$n = 3$时它是一个曲面（例如球面）。沿等值集移动时$f$不变，所以$f$沿等值集的变化率为零。结合[[#thm-steepest]](3)，这提示我们梯度与等值集垂直。链式法则可以使这一点严格化。

::: theorem 梯度是等值集的法向量 {#thm-gradient-normal}
设$f$在包含等值集$S = \set{\mathbf{x} : f(\mathbf{x}) = c}$的某个开集上可微，$\mathbf{r}\colon I \to \R^n$是位于$S$内的一条可微曲线，且$\mathbf{r}(t_0) = \mathbf{a}$。则

$$
\nabla f(\mathbf{a})\cdot\mathbf{r}'(t_0) = 0 .
$$

也就是说，$\nabla f(\mathbf{a})$与等值集中过$\mathbf{a}$的每条曲线的速度向量都正交。
:::

::: proof
由于对所有$t \in I$，$\mathbf{r}(t)$都在$S$中，函数$g(t) = f(\mathbf{r}(t))$恒等于$c$，所以$g'(t_0) = 0$。另一方面，由链式法则（[[multivariable/partial-derivatives#thm-chain-rule]]），$g'(t_0) = \nabla f(\mathbf{r}(t_0))\cdot\mathbf{r}'(t_0) = \nabla f(\mathbf{a})\cdot\mathbf{r}'(t_0)$。
:::

因此，在地形图上，高度函数的梯度与等高线成直角相交；顺坡而下的水流（沿$-\nabla f$）所走的路径垂直地穿过每一条等高线。等高线密集意味着梯度大：如果相邻两条等高线的高度差为$\Delta c$，相距$\Delta s$，那么最陡的坡度大约为$\Delta c/\Delta s$。

### 切平面

对于$\R^3$中由等值集$F(x, y, z) = c$给出的曲面，[[#thm-gradient-normal]]表明：曲面上过$\mathbf{a}$的每一条曲线，在$\mathbf{a}$处都沿着垂直于$\nabla F(\mathbf{a})$的方向运动。所有这些速度向量都位于同一个平面内，这个平面自然就是“贴着”曲面的那个平面的候选者。

::: definition 切平面与法线 {#def-tangent-plane}
设$F$在等值面$S\colon F(x,y,z) = c$上一点$\mathbf{a}$的附近可微，且$\nabla F(\mathbf{a}) \ne \mathbf{0}$。$S$在$\mathbf{a} = (a_1, a_2, a_3)$处的**切平面**是过$\mathbf{a}$、以$\nabla F(\mathbf{a})$为法向量的平面：

$$
F_x(\mathbf{a})(x - a_1) + F_y(\mathbf{a})(y - a_2) + F_z(\mathbf{a})(z - a_3) = 0 ,
$$

$S$在$\mathbf{a}$处的**法线**是直线$\mathbf{a} + t\,\nabla F(\mathbf{a})$，$t\in\R$。
:::

条件$\nabla F(\mathbf{a}) \ne \mathbf{0}$很重要：在圆锥面$x^2 + y^2 - z^2 = 0$的顶点处，梯度$(2x, 2y, -2z)$为零，而那里确实没有任何平面与圆锥面相切。当梯度不为零时，隐函数定理（[[multivariable/partial-derivatives#thm-implicit]]）表明，在$\mathbf{a}$附近等值集确实是一张光滑曲面，并且切平面中的**每一个**向量都是曲面上某条曲线的速度向量；[[differential-geometry/regular-surfaces]]一章将仔细讨论这一点。

函数的**图像**$z = f(x, y)$就是等值集$F(x, y, z) = f(x, y) - z = 0$，而$\nabla F = (f_x, f_y, -1)$永不为零。由定义得$f_x(a,b)(x - a) + f_y(a,b)(y - b) - (z - f(a,b)) = 0$，即

$$
z = f(a, b) + f_x(a, b)\,(x - a) + f_y(a, b)\,(y - b).
$$ {#eq-tangent-plane}

注意它熟悉的形式：它就是一元微积分中的切线$y = f(a) + f'(a)(x-a)$，只不过每个变量各有一个斜率。这个平面与平面$y = b$和$x = a$的交线，分别是曲线$z = f(x, b)$和$z = f(a, y)$的切线，其斜率分别为$f_x(a,b)$和$f_y(a,b)$。

::: example 椭球面的切平面 {#ex-tangent-ellipsoid}
求椭球面$x^2 + 2y^2 + 3z^2 = 6$在点$(1,1,1)$处的切平面和法线。
::: solution
由于$1 + 2 + 3 = 6$，该点在曲面上。令$F = x^2 + 2y^2 + 3z^2$，则$\nabla F = (2x, 4y, 6z)$，所以$\nabla F(1,1,1) = (2, 4, 6)$。切平面为

$$
2(x - 1) + 4(y - 1) + 6(z - 1) = 0, \qquad\text{即}\qquad x + 2y + 3z = 6,
$$

法线为$(x, y, z) = (1 + 2t,\, 1 + 4t,\, 1 + 6t)$，或者更简单地写成$(1,1,1) + s(1,2,3)$。
:::
:::

::: example 函数图像的切平面 {#ex-tangent-graph}
求曲面$z = x e^{xy}$在$(x, y) = (1, 0)$所对应的点处的切平面。
::: solution
这里$f(1,0) = 1$，$f_x = e^{xy} + xy\,e^{xy}$，$f_y = x^2e^{xy}$，所以$f_x(1,0) = 1$，$f_y(1,0) = 1$。由[[#eq-tangent-plane]]，

$$
z = 1 + (x - 1) + (y - 0) = x + y .
$$

在$(1,0)$附近，曲面与平面$z = x + y$非常接近；例如$f(1.1, -0.05) = 1.1\,e^{-0.055} \approx 1.0411$，而平面给出的值是$1.05$。
:::
:::

::: widget surface
f: x*y*exp(-(x^2 + y^2)/2)
x: -2.5, 2.5
y: -2.5, 2.5
tangent: 1, 0.5
color: height
caption: $f(x,y) = xy\,e^{-(x^2+y^2)/2}$的图像及其在$(1, 0.5)$处的切平面。旋转视角，直到你沿着平面的边缘方向看过去：在切点附近，曲面与平面几乎无法区分，离开切点时二者只以二次的速度分开。在四个凸起处切平面是水平的，因为那里梯度为零。
:::

## 线性近似与微分

切平面是$f$在$\mathbf{a}$处的**线性化**函数

$$
L(\mathbf{x}) = f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot(\mathbf{x} - \mathbf{a})
$$ {#eq-linearisation}

的图像，而[[#eq-differentiable]]恰好是说，与$\norm{\mathbf{x} - \mathbf{a}}$相比，$f(\mathbf{x}) - L(\mathbf{x})$很小。因此，当$\mathbf{x}$靠近$\mathbf{a}$时，有**线性近似**$f(\mathbf{x}) \approx L(\mathbf{x})$。用传统的**微分**记号，把各变量的微小改变量记为$dx, dy, dz$，则$f$相应的改变量近似为

$$
df = f_x\,dx + f_y\,dy + f_z\,dz = \nabla f\cdot d\mathbf{x}.
$$

::: example 线性近似 {#ex-linear-approx}
不用计算器，估计$\sqrt{(3.02)^2 + (3.97)^2}$的值。
::: solution
令$f(x,y) = \sqrt{x^2 + y^2}$，$\mathbf{a} = (3, 4)$，则$f(\mathbf{a}) = 5$。又$f_x = x/\sqrt{x^2+y^2}$，$f_y = y/\sqrt{x^2+y^2}$，所以$\nabla f(3,4) = \left(\tfrac35, \tfrac45\right)$。取$dx = 0.02$，$dy = -0.03$，得

$$
f(3.02, 3.97) \approx 5 + \tfrac35(0.02) + \tfrac45(-0.03) = 5 + 0.012 - 0.024 = 4.988 .
$$

真实值为$4.98812\ldots$，所以误差约为$10^{-4}$，与增量的平方同阶，这正是一阶近似所预期的。
:::
:::

::: example 测量误差的传播 {#ex-error}
测得一个圆柱形储罐的半径$r = 3$ m，高$h = 10$ m，其中$r$的误差至多为$0.02$ m，$h$的误差至多为$0.05$ m。估计由此算出的体积$V = \pi r^2 h$可能的最大误差。
::: solution
$dV = V_r\,dr + V_h\,dh = 2\pi rh\,dr + \pi r^2\,dh$。当两项同号时误差最大，所以

$$
\abs{dV} \le 2\pi(3)(10)(0.02) + \pi(9)(0.05) = 1.2\pi + 0.45\pi = 1.65\pi \approx 5.2 \text{ m}^3 .
$$

由于$V = 90\pi \approx 283$ m³，相对误差约为$1.83\%$。一个有用的捷径是取对数：$\ln V = \ln\pi + 2\ln r + \ln h$，所以$\dfrac{dV}{V} = 2\dfrac{dr}{r} + \dfrac{dh}{h} = 2\cdot\dfrac{0.02}{3} + \dfrac{0.05}{10} \approx 0.0183$。也就是说，各相对误差以相应的幂次为权相加。
:::
:::

::: application 实验室中的误差分析
[[#ex-error]]中的规则是实验科学中误差传播的基础：如果一个量由测量值按$Q = k\,x^\alpha y^\beta z^\gamma$算出，那么在一阶近似下，它的相对误差至多为$\abs{\alpha}\frac{\abs{dx}}{x} + \abs{\beta}\frac{\abs{dy}}{y} + \abs{\gamma}\frac{\abs{dz}}{z}$。由此可以看出哪个测量最需要小心：误差被乘以最大幂次的那个。如果各误差相互独立且是随机的，而不是按最坏情形考虑，统计学家则改为把它们的平方相加（[[statistics/estimation]]）。
:::

## 各方向的斜率都存在还不够

[[#thm-directional-gradient]]要求$f$可微。人们很容易以为：只要所有方向导数都存在，$f$就自动可微，公式也就成立。事实并非如此。

::: example 不是线性的方向导数 {#ex-not-differentiable}
当$(x,y) \ne (0,0)$时令$f(x, y) = \dfrac{x^2y}{x^2 + y^2}$，并令$f(0,0) = 0$。证明$f$在原点处连续，且沿每个方向都有方向导数，但在原点处不可微。
::: solution
*连续性*。由于$x^2 \le x^2 + y^2$，当$(x,y)\to(0,0)$时，$\abs{f(x,y)} \le \abs{y} \to 0$。

*方向导数*。对单位向量$\mathbf{u} = (u_1, u_2)$和$h \ne 0$，

$$
\frac{f(hu_1, hu_2) - f(0,0)}{h} = \frac{1}{h}\cdot\frac{h^3u_1^2u_2}{h^2(u_1^2 + u_2^2)} = u_1^2u_2 ,
$$

所以对每个$\mathbf{u}$，$D_{\mathbf{u}}f(0,0) = u_1^2u_2$都存在。特别地，$f_x(0,0) = 0$（取$\mathbf{u} = \mathbf{i}$），$f_y(0,0) = 0$（取$\mathbf{u} = \mathbf{j}$），所以$\nabla f(0,0) = \mathbf{0}$。

*不可微*。如果$f$在原点处可微，那么由[[#thm-directional-gradient]]，对每个$\mathbf{u}$都有$D_{\mathbf{u}}f(0,0) = \nabla f(0,0)\cdot\mathbf{u} = 0$。但对$\mathbf{u} = (1,1)/\sqrt2$，我们算得$D_{\mathbf{u}}f(0,0) = \tfrac12\cdot\tfrac{1}{\sqrt2} \ne 0$。所以$f$在原点处不可微。从几何上看，图像在过原点的每个竖直平面内都有一条切**线**，但这些切线不在同一个平面内。
:::
:::

问题在于映射$\mathbf{u} \mapsto D_{\mathbf{u}}f(\mathbf{a})$不是线性的。还有更糟的例子：[[multivariable/partial-derivatives]]一章中的函数$x^2y/(x^4 + y^2)$在原点处沿每个方向都有方向导数（当$u_2 \ne 0$时等于$u_1^2/u_2$，当$u_2 = 0$时等于$0$），但它在原点处甚至不连续，因为它沿抛物线$y = x^2$取值恒为$\tfrac12$。

::: warning 使用 ∇f · u 之前先检查可微性
公式$D_{\mathbf{u}}f = \nabla f\cdot\mathbf{u}$是关于**可微**函数的定理。在可微性不成立的点（典型的情形是函数分段定义，或者含有$\abs{\cdot}$或分数次幂的地方），应改用[[#def-directional]]来计算方向导数。对于偏导数连续的函数（你将遇到的几乎所有函数都是如此），这个公式可以放心使用。
:::

::: quiz
设所有方向导数$D_{\mathbf{u}}f(\mathbf{a})$都存在。下列哪个结论是有根据的？
- [ ] $f$在$\mathbf{a}$处可微
- [ ] $f$在$\mathbf{a}$处连续
- [ ] 对所有单位向量$\mathbf{u}$，$D_{\mathbf{u}}f(\mathbf{a}) = \nabla f(\mathbf{a})\cdot\mathbf{u}$
- [x] $f$在$\mathbf{a}$处的偏导数都存在，因而$\nabla f(\mathbf{a})$有定义
::: solution
偏导数就是沿坐标轴方向的方向导数，所以它们存在，$\nabla f(\mathbf{a})$也就有意义。除此之外推不出更多结论：[[#ex-not-differentiable]]中的函数连续但不可微，而$x^2y/(x^4+y^2)$甚至不连续，尽管两者在原点处都具有所有方向导数；并且在这两个例子中，对某些$\mathbf{u}$都有$D_{\mathbf{u}}f \ne \nabla f\cdot\mathbf{u}$。
:::
:::

## 多元函数的中值定理

一元函数的中值定理（[[calculus-1/mean-value-theorem]]）可以沿线段推广到多元情形。用$[\mathbf{a}, \mathbf{b}] = \set{\mathbf{a} + t(\mathbf{b} - \mathbf{a}) : 0 \le t \le 1}$表示连接$\mathbf{a}$和$\mathbf{b}$的线段。

::: theorem 中值定理 {#thm-mvt}
设$f$在包含线段$[\mathbf{a}, \mathbf{b}]$的开集$U$上可微，则线段上存在严格介于$\mathbf{a}$与$\mathbf{b}$之间的一点$\mathbf{c}$，使得

$$
f(\mathbf{b}) - f(\mathbf{a}) = \nabla f(\mathbf{c})\cdot(\mathbf{b} - \mathbf{a}).
$$
:::

::: proof
对包含$[0,1]$的某个开区间中的$t$，令$g(t) = f(\mathbf{a} + t(\mathbf{b} - \mathbf{a}))$（由于$U$是开集，这样的开区间存在）。由链式法则，$g$可导，且$g'(t) = \nabla f(\mathbf{a} + t(\mathbf{b}-\mathbf{a}))\cdot(\mathbf{b} - \mathbf{a})$；特别地，$g$在$[0,1]$上连续。由一元函数的中值定理，存在$t_0 \in (0,1)$使得$g(1) - g(0) = g'(t_0)$。由于$g(1) = f(\mathbf{b})$，$g(0) = f(\mathbf{a})$，点$\mathbf{c} = \mathbf{a} + t_0(\mathbf{b} - \mathbf{a})$即满足要求。
:::

::: corollary 梯度为零则函数为常数 {#cor-constant}
若$U$是凸开集（即它包含其中任意两点之间的线段），且在$U$上$\nabla f = \mathbf{0}$，则$f$在$U$上为常数。若在$U$上$\norm{\nabla f} \le M$，则对所有$\mathbf{a}, \mathbf{b} \in U$，有$\abs{f(\mathbf{b}) - f(\mathbf{a})} \le M\norm{\mathbf{b} - \mathbf{a}}$。
:::

::: proof
对$\mathbf{a}, \mathbf{b}\in U$，由[[#thm-mvt]]和柯西-施瓦茨不等式得$\abs{f(\mathbf{b}) - f(\mathbf{a})} = \abs{\nabla f(\mathbf{c})\cdot(\mathbf{b}-\mathbf{a})} \le \norm{\nabla f(\mathbf{c})}\norm{\mathbf{b}-\mathbf{a}}$；在第一种情形下它等于$0$，在第二种情形下它至多为$M\norm{\mathbf{b}-\mathbf{a}}$。
:::

更一般地，第一个结论在任何**连通**开集上都成立，因为这样的集合中任意两点都可以用其内部由有限条线段组成的折线连接起来（见[[topology/connectedness]]）；而在由两个分离部分组成的集合上，$f$可以在每一部分上取不同的常数值。正是这个推论保证了[[multivariable/line-integrals]]一章中的势函数在相差一个常数的意义下是唯一的。

## 梯度下降法

由于$-\nabla f$指向最速**下降**的方向，寻找$f$的极小值的一种自然方法，就是反复地朝下坡方向迈出一小步：

$$
\mathbf{x}_{k+1} = \mathbf{x}_k - \eta\,\nabla f(\mathbf{x}_k), \qquad k = 0, 1, 2, \dots
$$ {#eq-gd}

其中**步长**（或称**学习率**）$\eta > 0$由使用者选定。只要$\eta$足够小，每一步都会使$f$减小：由线性近似，$f(\mathbf{x}_{k+1}) \approx f(\mathbf{x}_k) - \eta\norm{\nabla f(\mathbf{x}_k)}^2$。但正如下面的例子所示，“足够小”是一个实实在在的限制。

::: example 狭长碗形曲面上的梯度下降 {#ex-gd}
对$f(x, y) = x^2 + 10y^2$应用[[#eq-gd]]。步长$\eta$取哪些值时，从任意初始点出发，迭代点都收敛到原点处的极小值点？
::: solution
这里$\nabla f = (2x, 20y)$，所以迭代为

$$
x_{k+1} = x_k - 2\eta x_k = (1 - 2\eta)\,x_k, \qquad y_{k+1} = (1 - 20\eta)\,y_k ,
$$

因此$x_k = (1-2\eta)^k x_0$，$y_k = (1-20\eta)^k y_0$。二者对所有初始点都趋于$0$，当且仅当$\abs{1 - 2\eta} < 1$且$\abs{1 - 20\eta} < 1$，即$0 < \eta < 0.1$。例如取$\eta = 0.09$，两个因子分别为$0.82$和$-0.8$：$y$坐标每一步都改变符号，于是迭代点在狭窄的山谷两侧来回呈锯齿状跳动，同时沿山谷缓慢前进。当$\eta > 0.1$时，$y$坐标不断增大，方法发散。陡峭的方向限制了步长，而平缓的方向因此收敛得很慢——这就是梯度下降法在尺度不良的问题上的根本困难。
:::
:::

::: widget gradientdescent
f: x^2 + 10y^2
start: 2.5, 1
rate: 0.09
steps: 30
method: gd
x: -3, 3
y: -1.5, 1.5
caption: $f = x^2 + 10y^2$上的梯度下降。学习率为$0.09$时，路径在山谷两侧呈锯齿状来回，正如[[#ex-gd]]所预言的那样。试试$0.05$（平稳但缓慢）、$0.099$（剧烈的锯齿）和$0.11$（发散：损失曲线急剧上升）。每一步都与当前的等高线成直角离开，因为它是沿$-\nabla f$移动的。
:::

::: application 训练神经网络
神经网络是一个带有数以百万计可调参数$\mathbf{w}$的函数，训练它就是使一个衡量它在样本数据上误差的损失函数$f(\mathbf{w})$达到最小。最主要的算法就是梯度下降法[[#eq-gd]]及其变体（随机梯度下降、动量法、Adam）。梯度本身则是通过高效组织的链式法则来计算的，这种算法称为反向传播。如何选择学习率，以及[[#ex-gd]]中的锯齿现象，都是实际工作者天天要面对的问题；另一种考虑曲率的方法是牛顿法，它要用到[[multivariable/extrema]]一章中的二阶导数。
:::

::: history
算子$\nabla$源于威廉·罗恩·哈密顿（William Rowan Hamilton）19世纪40年代关于四元数的工作：他用这个符号（画成一个横放的三角形）把三个偏导数合成为一个记号。彼得·格思里·泰特（Peter Guthrie Tait）发展了它的用法；据说“nabla”这个名称是他的朋友、圣经学者威廉·罗伯逊·史密斯（William Robertson Smith）向他建议的，取自一种古代竖琴的形状。在19世纪80年代吉布斯（Gibbs）和亥维赛（Heaviside）的向量分析中，$\nabla f$成为我们今天使用的梯度向量。最速下降法比这个记号还要古老：1847年，奥古斯丁-路易·柯西（Augustin-Louis Cauchy）在提交给巴黎科学院的一篇短文中提出，沿函数下降最快的方向逐步减小函数值，以此求解计算行星轨道时出现的方程组。170多年后，柯西方法的各种变体仍在训练现存最大的计算机模型。
:::

## 后续内容

梯度是多元函数的一阶导数。[[multivariable/extrema]]一章将引入二阶导数（黑塞矩阵），在$\nabla f = \mathbf{0}$处寻找极大值和极小值，并利用[[#thm-gradient-normal]]推导出在约束$g = c$下求最优值的拉格朗日乘数法。梯度场$\mathbf{F} = \nabla f$就是[[multivariable/line-integrals]]一章中的保守向量场，那里的曲线积分基本定理推广了中值定理；在[[multivariable/stokes-divergence]]一章中，$\nabla$又以散度$\nabla\cdot\mathbf{F}$和旋度$\nabla\times\mathbf{F}$的形式重新出现。切平面和单位法向量是[[differential-geometry/regular-surfaces]]一章中曲面几何的出发点，而梯度方法将在[[numerical-analysis/iterative-methods]]一章中深入研究。

::: summary
- 方向导数$D_{\mathbf{u}}f(\mathbf{a})$是$f$在$\mathbf{a}$处沿单位向量$\mathbf{u}$的方向、每单位距离的变化率（[[#def-directional]]）。
- 梯度$\nabla f = (f_{x_1}, \dots, f_{x_n})$汇集了各个偏导数。对可微的$f$，$D_{\mathbf{u}}f = \nabla f\cdot\mathbf{u}$（[[#thm-directional-gradient]]）。
- $\nabla f$指向最速上升方向，$\norm{\nabla f}$是最陡的坡度；$-\nabla f$是最速下降方向（[[#thm-steepest]]）。
- $\nabla f$垂直于等值线和等值面（[[#thm-gradient-normal]]）。$F = c$在$\mathbf{a}$处的切平面为$\nabla F(\mathbf{a})\cdot(\mathbf{x} - \mathbf{a}) = 0$；对于函数图像，切平面为$z = f(a,b) + f_x(x-a) + f_y(y-b)$。
- 线性化$f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot(\mathbf{x}-\mathbf{a})$给出线性近似和一阶误差估计。
- 所有方向导数都存在并不能推出可微，甚至不能推出连续。
- 由中值定理$f(\mathbf{b}) - f(\mathbf{a}) = \nabla f(\mathbf{c})\cdot(\mathbf{b}-\mathbf{a})$可知，若在连通开集上$\nabla f = \mathbf{0}$，则$f$必为常数。
- 梯度下降法$\mathbf{x}_{k+1} = \mathbf{x}_k - \eta\nabla f(\mathbf{x}_k)$需要足够小的步长；在尺度不良的问题上，迭代路径会呈锯齿状。
:::

## 习题

::: exercise 方向导数 {level=1 check="8/3"}
设$f(x,y,z) = xy^2 + z e^x$。求$f$在点$(0, 1, 2)$处沿向量$(2, -1, 2)$方向的方向导数。
::: solution
$\nabla f = (y^2 + ze^x,\; 2xy,\; e^x)$，所以$\nabla f(0,1,2) = (1 + 2,\, 0,\, 1) = (3, 0, 1)$。向量$(2,-1,2)$的长度为$3$，所以$\mathbf{u} = \tfrac13(2,-1,2)$，从而

$$
D_{\mathbf{u}}f(0,1,2) = (3,0,1)\cdot\tfrac13(2,-1,2) = \tfrac13(6 + 0 + 2) = \tfrac83 .
$$
:::
:::

::: exercise 最陡的坡度 {level=1 check="sqrt(185)"}
求$f(x,y) = x^2y + y^3$在点$(1, 2)$处的最大变化率，以及取得最大变化率的方向。
::: solution
$\nabla f = (2xy,\; x^2 + 3y^2)$，所以$\nabla f(1,2) = (4, 13)$。最大变化率为$\norm{(4,13)} = \sqrt{16 + 169} = \sqrt{185} \approx 13.6$，方向为$(4,13)/\sqrt{185}$。
:::
:::

::: exercise 函数图像的切平面 {level=1}
求$z = x^2 + xy$在点$(1, 2, 3)$处的切平面。
::: solution
$f_x = 2x + y$，$f_y = x$，所以$f_x(1,2) = 4$，$f_y(1,2) = 1$。由[[#eq-tangent-plane]]，$z = 3 + 4(x - 1) + (y - 2)$，即$z = 4x + y - 3$。
:::
:::

::: exercise 线性近似 {level=2 check="15.58"}
用线性近似估计$(1.98)^3\sqrt{4.03}$。
::: solution
在$(2, 4)$附近考虑$f(x,y) = x^3\sqrt{y}$，在该点$f = 8\cdot 2 = 16$。在$(2,4)$处，$f_x = 3x^2\sqrt y = 24$，$f_y = \dfrac{x^3}{2\sqrt y} = 2$。取$dx = -0.02$，$dy = 0.03$：

$$
f(1.98, 4.03) \approx 16 + 24(-0.02) + 2(0.03) = 16 - 0.48 + 0.06 = 15.58 .
$$

（精确值为$15.5829\ldots$。）
:::
:::

::: exercise 单摆周期的误差 {level=2 check="0.75"}
单摆的周期为$T = 2\pi\sqrt{L/g}$。若测量$L$的相对误差至多为$1\%$，测量$g$的相对误差至多为$0.5\%$，估计$T$可能的最大相对误差（用百分数表示）。
::: solution
$\ln T = \ln 2\pi + \tfrac12\ln L - \tfrac12\ln g$，所以$\dfrac{dT}{T} = \dfrac12\dfrac{dL}{L} - \dfrac12\dfrac{dg}{g}$。最坏的情形是两项同号：$\abs{dT/T} \le \tfrac12(1\%) + \tfrac12(0.5\%) = 0.75\%$。
:::
:::

::: exercise 平行的切平面 {level=2}
求椭球面$x^2 + 2y^2 + 3z^2 = 12$上切平面平行于平面$x + 4y + 6z = 0$的点，并写出这些切平面的方程。
::: solution
法向量$\nabla F = (2x, 4y, 6z)$必须与$(1, 4, 6)$平行：$2x = \lambda$，$4y = 4\lambda$，$6z = 6\lambda$，所以$(x,y,z) = (\lambda/2, \lambda, \lambda)$。代入方程得$\tfrac{\lambda^2}{4} + 2\lambda^2 + 3\lambda^2 = \tfrac{21}{4}\lambda^2 = 12$，所以$\lambda = \pm\tfrac{4}{\sqrt7}$。所求的点为$\pm\left(\tfrac{2}{\sqrt7}, \tfrac{4}{\sqrt7}, \tfrac{4}{\sqrt7}\right)$，切平面为$x + 4y + 6z = \pm\tfrac{2 + 16 + 24}{\sqrt7} = \pm 6\sqrt7$。
:::
:::

::: exercise 圆锥面的切平面 {level=2}
证明：圆锥面$z^2 = x^2 + y^2$在顶点以外任一点处的切平面都经过原点。
::: solution
令$F = x^2 + y^2 - z^2$，设$\mathbf{a} = (a_1, a_2, a_3) \ne \mathbf{0}$在圆锥面上，于是$a_1^2 + a_2^2 = a_3^2$。则$\nabla F(\mathbf{a}) = (2a_1, 2a_2, -2a_3) \ne \mathbf{0}$，切平面为$a_1(x - a_1) + a_2(y - a_2) - a_3(z - a_3) = 0$，即$a_1x + a_2y - a_3z = a_1^2 + a_2^2 - a_3^2 = 0$。原点满足这个方程。（从几何上看，切平面包含了过顶点和$\mathbf{a}$的整条直线，而这条直线就在圆锥面上。）
:::
:::

::: exercise 最速下降路径 {#exr-steepest-path level=3}
一个小球在曲面$z = x^2 + 2y^2$上滚动，其水平运动方向始终为$-\nabla f$的方向。若小球从$(1, 1)$的正上方出发，证明它的水平路径是抛物线$y = x^2$。
::: hint
速度为$-\nabla f$的路径满足$x'(t) = -f_x$，$y'(t) = -f_y$。分别解这两个微分方程。
:::
::: solution
路径$(x(t), y(t))$满足$x' = -2x$，$y' = -4y$，且$x(0) = y(0) = 1$，所以$x = e^{-2t}$，$y = e^{-4t} = x^2$。当$t\to\infty$时，小球沿抛物线$y = x^2$（$0 < x \le 1$）趋近原点。路径的形状只取决于速度的方向，所以只要小球沿$-\nabla f$方向以任意（正的）速率运动，得到的都是同一条抛物线。注意，与[[#ex-hill]]一样，路径离开$(1,1)$时比通往原点的直线更陡地偏向$x$轴。
:::
:::

::: exercise 关于齐次函数的欧拉（Euler）定理 {level=3}
如果$\R^n\setminus\set{\mathbf{0}}$上的函数$f$对所有$t > 0$和$\mathbf{x} \ne \mathbf{0}$满足$f(t\mathbf{x}) = t^k f(\mathbf{x})$，就称$f$是$k$**次齐次**函数。证明：若这样的$f$可微，则$\mathbf{x}\cdot\nabla f(\mathbf{x}) = k\,f(\mathbf{x})$。并对$f(x,y) = x^2y + y^3$验证这一结果。
::: hint
将$f(t\mathbf{x}) = t^kf(\mathbf{x})$两边对$t$求导，再令$t = 1$。
:::
::: solution
固定$\mathbf{x} \ne \mathbf{0}$。左边$g(t) = f(t\mathbf{x})$是$f$与曲线$t\mapsto t\mathbf{x}$的复合，该曲线的速度为$\mathbf{x}$，所以由链式法则，$g'(t) = \nabla f(t\mathbf{x})\cdot\mathbf{x}$。右边的导数为$kt^{k-1}f(\mathbf{x})$。令$t = 1$，即得$\nabla f(\mathbf{x})\cdot\mathbf{x} = k f(\mathbf{x})$。对于$f = x^2y + y^3$（$3$次齐次）：$x f_x + y f_y = x(2xy) + y(x^2 + 3y^2) = 3x^2y + 3y^3 = 3f$。
:::
:::

::: exercise 偏导数存在但不可微 {level=3}
设$f(x, y) = \sqrt{\abs{xy}}$。证明$f_x(0,0) = f_y(0,0) = 0$，但$f$在原点处不可微。
::: solution
对所有$x$有$f(x, 0) = 0$，对所有$y$有$f(0, y) = 0$，所以原点处的两个偏导数都是$0$，$\nabla f(0,0) = \mathbf{0}$。如果$f$在原点处可微，它的线性化就是$L = 0$，而[[#eq-differentiable]]要求$f(\mathbf{h})/\norm{\mathbf{h}} \to 0$。但沿对角线$\mathbf{h} = (t, t)$（$t > 0$），

$$
\frac{f(t,t)}{\norm{(t,t)}} = \frac{t}{\sqrt2\,t} = \frac{1}{\sqrt2},
$$

它不趋于$0$。因此$f$在原点处不可微。（等价地说，对$\mathbf{u} = (1,1)/\sqrt2$，$D_{\mathbf{u}}f(0,0)$不存在：商$f(t\mathbf{u})/t = \abs{t}/(\sqrt2\,t)$随$t$的符号不同而等于$\pm 1/\sqrt2$。）
:::
:::
