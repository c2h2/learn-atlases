微积分基本定理说，把导数在一个区间上积分，得到的是函数在两个端点处的值：$\int_a^b F'(x)\,dx = F(b) - F(a)$。格林（Green）公式（[[multivariable/greens-theorem#thm-green]]）在平面上说的是类似的事情：把导数的某种组合在一个区域上积分，得到的是沿区域边界的曲线积分。本章用两个定理在空间中完成这一模式，它们是整个应用数学中最有用的定理之一。

**斯托克斯（Stokes）公式**说：向量场沿一条闭曲线的环量，等于它的**旋度**穿过以这条曲线为边界的任一曲面的通量。**散度定理**（即高斯（Gauss）公式）说：向量场流出一个闭曲面的通量，等于它的**散度**在曲面所围立体上的积分。这两个定理一起把局部信息（各点处的导数）转化为整体信息（沿边界的积分），反过来也一样。它们是高斯定律、质量守恒与热量守恒以及麦克斯韦（Maxwell）方程组的数学内容。我们先定义旋度和散度这两种导数，然后对形状简单的区域证明这两个定理，并概述一般情形如何由此得出。全章都要用到曲线积分（[[multivariable/line-integrals]]）、格林公式和通量积分（[[multivariable/surface-integrals#def-flux]]）。

## 散度与旋度

用$\nabla$表示由偏导数算子组成的向量$\nabla = \left(\pdv{}{x}, \pdv{}{y}, \pdv{}{z}\right)$。把它作用于函数，得到梯度$\nabla f$；把它与向量场作“点积”和“叉积”，就得到两种新的导数。

::: definition 散度 {#def-divergence}
$\R^3$中某开集上的$C^1$向量场$\mathbf{F} = (P, Q, R)$的**散度**是函数

$$
\nabla\cdot\mathbf{F} = \divg\mathbf{F} = \pdv{P}{x} + \pdv{Q}{y} + \pdv{R}{z}.
$$
:::

::: definition 旋度 {#def-curl}
$\mathbf{F} = (P, Q, R)$的**旋度**是向量场

$$
\nabla\times\mathbf{F} = \curl\mathbf{F} = \begin{vmatrix}\mathbf{i} & \mathbf{j} & \mathbf{k}\\ \partial_x & \partial_y & \partial_z\\ P & Q & R\end{vmatrix} = \left(\pdv{R}{y} - \pdv{Q}{z},\ \ \pdv{P}{z} - \pdv{R}{x},\ \ \pdv{Q}{x} - \pdv{P}{y}\right).
$$
:::

旋度的第三个分量就是格林公式中的标量旋度$Q_x - P_y$。下面三个例子展示了基本模式：

| 场 | 散度 | 旋度 | 图景 |
|---|---|---|---|
| $(x, y, z)$ | $3$ | $\mathbf{0}$ | 从原点向外的纯膨胀 |
| $(-y, x, 0)$ | $0$ | $(0, 0, 2)$ | 绕$z$轴的刚性转动 |
| $\mathbf{x}/\norm{\mathbf{x}}^3$ | $0$（当$\mathbf{x}\ne\mathbf{0}$时） | $\mathbf{0}$ | 点源的平方反比场 |

对最后一个场，$\pdv{}{x}\dfrac{x}{\norm{\mathbf{x}}^3} = \dfrac{1}{\norm{\mathbf{x}}^3} - \dfrac{3x^2}{\norm{\mathbf{x}}^5}$，把三个类似的项相加，得$\dfrac{3}{\norm{\mathbf{x}}^3} - \dfrac{3\norm{\mathbf{x}}^2}{\norm{\mathbf{x}}^5} = 0$。更一般地，角速度向量为$\boldsymbol{\omega}$的刚性转动具有速度场$\mathbf{v} = \boldsymbol{\omega}\times\mathbf{x}$，简单计算可得$\nabla\times\mathbf{v} = 2\boldsymbol{\omega}$：旋度度量转动，散度度量膨胀。我们将在本章后面把这两种说法严格化（[[#thm-curl-density]]和[[#thm-div-density]]）。

::: example 计算散度和旋度 {#ex-div-curl}
求$\mathbf{F} = (x^2y,\ yz,\ xz^2)$的散度和旋度，以及在$(1,1,1)$处的散度。
::: solution
$\nabla\cdot\mathbf{F} = \pdv{}{x}(x^2y) + \pdv{}{y}(yz) + \pdv{}{z}(xz^2) = 2xy + z + 2xz$，它在$(1,1,1)$处等于$5$。对于旋度，取$P = x^2y$，$Q = yz$，$R = xz^2$：

$$
\nabla\times\mathbf{F} = \bigl(R_y - Q_z,\ P_z - R_x,\ Q_x - P_y\bigr) = \bigl(0 - y,\ 0 - z^2,\ 0 - x^2\bigr) = (-y,\ -z^2,\ -x^2).
$$
:::
:::

有两个二阶恒等式会经常用到。

::: theorem 梯度的旋度与旋度的散度 {#thm-identities}
若$f$是$\R^3$中某开集上的$C^2$函数，$\mathbf{F}$是该开集上的$C^2$向量场，则

$$
\nabla\times(\nabla f) = \mathbf{0} \qquad\text{和}\qquad \nabla\cdot(\nabla\times\mathbf{F}) = 0 .
$$
:::

::: proof
由克莱罗（Clairaut）定理（[[multivariable/partial-derivatives#thm-clairaut]]），$\nabla\times\nabla f$的第一个分量为$\pdv{}{y}f_z - \pdv{}{z}f_y = f_{zy} - f_{yz} = 0$，另外两个分量类似。对于第二个恒等式，

$$
\nabla\cdot(\nabla\times\mathbf{F}) = (R_y - Q_z)_x + (P_z - R_x)_y + (Q_x - P_y)_z = (R_{yx} - R_{xy}) + (P_{zy} - P_{yz}) + (Q_{xz} - Q_{zx}) = 0,
$$

这里再次用到了克莱罗定理。
:::

第一个恒等式给出了[[multivariable/line-integrals#thm-curl-test]]中场为保守场的必要条件：若$\mathbf{F} = \nabla f$，则$\nabla\times\mathbf{F} = \mathbf{0}$。第二个恒等式说旋度场没有源：我们将会看到，它流出每个闭曲面的通量都为零。由求导的乘积法则还可以得到其他有用的法则；例如，对$C^1$函数$f$和$C^1$场$\mathbf{F}$，

$$
\nabla\cdot(f\mathbf{F}) = f\,\nabla\cdot\mathbf{F} + \nabla f\cdot\mathbf{F}, \qquad \nabla\times(f\mathbf{F}) = f\,\nabla\times\mathbf{F} + \nabla f\times\mathbf{F},
$$

这可以逐个分量地验证。最后，梯度的散度就是**拉普拉斯（Laplace）算子**

$$
\Delta f = \nabla\cdot\nabla f = f_{xx} + f_{yy} + f_{zz},
$$

它是拉普拉斯方程$\Delta f = 0$（[[pde/laplace-equation]]）、热方程和波动方程中出现的算子。

::: quiz
设$f$是$\R^3$上的函数，$\mathbf{F}$是$\R^3$上的向量场，二者都是光滑的。下列哪个表达式**没有意义**？
- [ ] $\nabla\cdot(\nabla\times\mathbf{F})$
- [x] $\nabla\times(\nabla\cdot\mathbf{F})$
- [ ] $\nabla(\nabla\cdot\mathbf{F})$
- [ ] $\nabla\cdot(\nabla f)$
::: solution
$\nabla\cdot\mathbf{F}$是标量函数，而旋度只对向量场有定义，所以$\nabla\times(\nabla\cdot\mathbf{F})$没有意义。其余几个分别是一个向量场的散度（由[[#thm-identities]]，这里它恒为$0$）、一个标量函数的梯度，以及拉普拉斯算子$\Delta f$。
:::
:::

在平面上，场$(P, Q)$的标量旋度$Q_x - P_y$和散度$P_x + Q_y$可以用着色来直观地表示，如下面两幅图所示。

::: widget vectorfield
P: sin(x)
Q: sin(y)
x: -3.5, 3.5
y: -3.5, 3.5
shade: divergence
cx: a + cos(t)
cy: b + sin(t)
t: 0, 2pi
mode: flux
sliders: a=0:-2.4:2.4:0.1; b=0:-2.4:2.4:0.1
caption: 场$(\sin x, \sin y)$，按其散度$\cos x + \cos y$着色。在原点附近，箭头向四周散开（散度为正：源区域）；在角点$(\pm\pi, \pm\pi)$附近，箭头汇聚（散度为负：汇区域）。流出单位圆的通量为正，因为它等于散度在圆盘上的积分。用$a$和$b$把圆移到汇区域中，通量就变为负的。
:::

::: widget vectorfield
P: y
Q: 0
x: -2, 2
y: -2, 2
shade: curl
streamlines: true
cx: a + 0.5*cos(t)
cy: b + 0.5*sin(t)
t: 0, 2pi
sliders: a=1:-1.4:1.4:0.1; b=0:-1.4:1.4:0.1
caption: 剪切流$(y, 0)$：每条流线都是水平直线，但旋度处处为$-1$。放在流中的小桨轮会顺时针转动，因为它上方的水（向右）流得比下方的水快。沿任何半径为$\tfrac12$的圆的环量都是$-\pi/4$，即旋度乘以面积——无论把圆放在哪里（用$a$和$b$移动它）。旋度度量的是局部的旋转，而不是流线的弯曲。
:::

## 斯托克斯公式

格林公式把沿平面区域边界的环量与区域内部的标量旋度联系起来。斯托克斯公式则允许这个区域是空间中的曲面。我们首先必须使定向相互匹配。

::: definition 正向边界 {#def-positive-boundary}
设$S$是单位法向量为$\mathbf{n}$的有向曲面，其边界为一条（或若干条）闭曲线$C$。如果你头朝$\mathbf{n}$的方向沿$C$行走时，曲面总在你的左侧，就称$C$的定向是**正向**（或称是由$\mathbf{n}$**诱导**的定向）。等价地说：若右手四指沿$C$的方向弯曲，则拇指指向$\mathbf{n}$。
:::

对$xy$平面中法向量为$\mathbf{k}$的区域，这就是格林公式中的逆时针定向。对取朝外（朝上）法向量的上半球面，其边界——赤道——在从上方看按逆时针方向绕行时取正向。

::: theorem 斯托克斯公式 {#thm-stokes}
设$S$是分段光滑的有向曲面，其边界$C$由有限条取正向的分段光滑简单闭曲线组成，$\mathbf{F}$是包含$S$的某个开集上的$C^1$向量场。则

$$
\oint_C\mathbf{F}\cdot d\mathbf{r} = \iint_S(\nabla\times\mathbf{F})\cdot d\mathbf{S} .
$$ {#eq-stokes}
:::

我们对$S$是函数图像的情形证明这个定理，方法是把它化为格林公式；这正是问题的核心。

::: proof
*函数图像的情形*。设$S$是$C^2$函数$z = g(x,y)$在某个可以应用格林公式的平面区域$D$上的图像，取朝上的定向，并设$\mathbf{F} = (P, Q, R)$。设边界$\partial D$按逆时针方向参数化为$(x(t), y(t))$，$a\le t\le b$。于是$S$的边界可参数化为$\mathbf{r}(t) = \bigl(x(t), y(t), g(x(t), y(t))\bigr)$，对朝上的法向量而言，这正是正向。由链式法则，沿这条边界有$z' = g_x x' + g_y y'$，所以

$$
\oint_C\mathbf{F}\cdot d\mathbf{r} = \int_a^b\bigl(Px' + Qy' + R(g_xx' + g_yy')\bigr)\,dt = \oint_{\partial D}\bigl(P + Rg_x\bigr)\,dx + \bigl(Q + Rg_y\bigr)\,dy,
$$

其中$P, Q, R$在$(x, y, g(x,y))$处取值。由格林公式，它等于

$$
\iint_D\left[\pdv{}{x}\bigl(Q + Rg_y\bigr) - \pdv{}{y}\bigl(P + Rg_x\bigr)\right]dA .
$$

现在求导，注意$P, Q, R$还通过$z = g(x,y)$依赖于$x$和$y$：

$$
\begin{aligned}
\pdv{}{x}\bigl(Q + Rg_y\bigr) &= Q_x + Q_zg_x + (R_x + R_zg_x)\,g_y + R\,g_{yx},\\
\pdv{}{y}\bigl(P + Rg_x\bigr) &= P_y + P_zg_y + (R_y + R_zg_y)\,g_x + R\,g_{xy}.
\end{aligned}
$$

两式相减，$R_zg_xg_y$项相互抵消；由克莱罗定理，$Rg_{yx}$与$Rg_{xy}$也相互抵消。剩下的是

$$
(Q_x - P_y) + g_x(Q_z - R_y) + g_y(R_x - P_z) = -(R_y - Q_z)\,g_x - (P_z - R_x)\,g_y + (Q_x - P_y).
$$

由[[multivariable/surface-integrals#eq-flux-graph]]，这个表达式在$D$上的积分恰好就是$\nabla\times\mathbf{F} = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y)$向上穿过$S$的通量。这就对函数图像证明了[[#eq-stokes]]。

*一般曲面（概要）*。分段光滑曲面可以切成有限块，每一块都是某个坐标平面上的函数图像。对每一块应用函数图像的情形（边界取正向），再把结果相加。每条切口都是两块的公共边界的一部分，且两次的绕行方向相反，所以沿切口的曲线积分相互抵消；剩下的就是沿$C$的积分。详细内容（包括在某些点附近不能表示为任何平面上的函数图像的曲面）见 Marsden 和 Tromba 的 *Vector Calculus* §8.2，以及 Apostol 的 *Calculus* 第二卷§12.11。
:::

::: example 半球面上的斯托克斯公式 {#ex-hemisphere}
对$\mathbf{F} = (-y,\ x,\ z)$和取朝外定向的上半单位球面$S$验证斯托克斯公式。
::: solution
边界是$xy$平面上的单位圆，从上方看按逆时针方向绕行：$\mathbf{r}(t) = (\cos t, \sin t, 0)$。于是

$$
\oint_C\mathbf{F}\cdot d\mathbf{r} = \int_0^{2\pi}\bigl((-\sin t)(-\sin t) + \cos t\cos t + 0\bigr)\,dt = 2\pi .
$$

另一方面，$\nabla\times\mathbf{F} = (0 - 0,\ 0 - 0,\ 1 - (-1)) = (0, 0, 2)$。在单位球面上$\mathbf{n} = (x, y, z)$，所以$(\nabla\times\mathbf{F})\cdot\mathbf{n} = 2z$；利用$z = \cos\phi$，$dS = \sin\phi\,d\phi\,d\theta$，得

$$
\iint_S(\nabla\times\mathbf{F})\cdot d\mathbf{S} = \int_0^{2\pi}\int_0^{\pi/2}2\cos\phi\sin\phi\,d\phi\,d\theta = 2\pi\Bigl[\sin^2\phi\Bigr]_0^{\pi/2} = 2\pi .
$$

两边都等于$2\pi$。注意，取法向量为$\mathbf{k}$的平坦单位圆盘，可以更快地得到通量$\iint 2\,dA = 2\pi$——这是下面这个推论的第一个实例。
:::
:::

::: corollary 与曲面无关 {#cor-surface-independence}
若$S_1$和$S_2$是两个有向曲面，它们具有同一条取正向的边界曲线$C$，则$\iint_{S_1}(\nabla\times\mathbf{F})\cdot d\mathbf{S} = \iint_{S_2}(\nabla\times\mathbf{F})\cdot d\mathbf{S}$。特别地，旋度场流出闭曲面（它没有边界）的通量为零。
:::

::: proof
由斯托克斯公式，两个积分都等于$\oint_C\mathbf{F}\cdot d\mathbf{r}$。闭曲面可以被一条曲线$C$切成两块，它们在$C$上诱导的边界定向相反；两块上的通量分别为$\oint_C\mathbf{F}\cdot d\mathbf{r}$和$-\oint_C\mathbf{F}\cdot d\mathbf{r}$，相加为零。
:::

所以，当需要求旋度的通量时，我们可以把给定的曲面换成任何一个边界相同、更方便的曲面——通常是平坦的曲面。

::: widget surface
fx: u*cos(v)
fy: u*sin(v)
fz: h*(1 - u^2)
u: 0, 1
v: 0, 2pi
sliders: h=1:-1:1.5:0.05
color: height
caption: 单位圆盘上的一族帽形曲面$z = h(1 - x^2 - y^2)$，它们都有同一个边界圆。调节$h$，使曲面从圆顶经过平坦的圆盘（$h = 0$）变成碗形。由[[#cor-surface-independence]]，任何旋度场穿过所有这些曲面的通量都相同——都等于沿公共边界的环量。只有边界才起作用。
:::

::: example 选取方便的曲面 {#ex-stokes-plane}
设$C$是平面$z = 2 - x$与圆柱面$x^2 + y^2 = 1$的交线，从上方看按逆时针方向绕行。对$\mathbf{F} = (-y^3,\ x^3,\ z)$计算$\oint_C\mathbf{F}\cdot d\mathbf{r}$。
::: solution
$\nabla\times\mathbf{F} = \bigl(0 - 0,\ 0 - 0,\ 3x^2 + 3y^2\bigr)$。取$S$为平面$z = 2 - x$位于圆柱面内部的部分，它是单位圆盘$D$上的函数图像，取朝上的定向以与$C$的方向相匹配。由[[multivariable/surface-integrals#eq-flux-graph]]，只有旋度的第三个分量有贡献：

$$
\oint_C\mathbf{F}\cdot d\mathbf{r} = \iint_D3(x^2 + y^2)\,dA = \int_0^{2\pi}\int_0^1 3r^2\cdot r\,dr\,d\theta = \frac{3\pi}{2}.
$$

若直接计算，取$\mathbf{r}(t) = (\cos t, \sin t, 2 - \cos t)$，被积函数为$\sin^4t + \cos^4t + (2 - \cos t)\sin t$，它在$[0, 2\pi]$上的积分同样是$\tfrac{3\pi}{2}$——但用斯托克斯公式要省事得多。
:::
:::

::: quiz
$S$是锥面$z = \sqrt{x^2+y^2}$，$0\le z\le1$，其法向量指向下方和外侧（背离$z$轴）。要使斯托克斯公式成立，它的边界圆$z = 1$应当按什么方向绕行？
- [ ] 从上方看按逆时针方向
- [x] 从上方看按顺时针方向
- [ ] 两个方向都可以：曲线积分与方向无关
- [ ] 斯托克斯公式不适用，因为锥面有顶点
::: solution
头朝法向量（它指向下方和外侧）沿边缘行走；要使锥面在你的左侧，从上方看你必须按顺时针方向走。（法向量反向，绕行方向也随之反向。）方向确实重要：把它反过来，曲线积分就会改变符号。顶点只是一个点，带有这样一个点的分段光滑曲面是允许的。
:::
:::

### 旋度作为环量密度

斯托克斯公式赋予旋度一个与坐标无关的含义。

::: theorem 旋度是单位面积上的环量 {#thm-curl-density}
设$\mathbf{F}$在点$\mathbf{p}$附近是$C^1$的，$\mathbf{n}$是单位向量，$C_r$是过$\mathbf{p}$且垂直于$\mathbf{n}$的平面内、以$\mathbf{p}$为圆心、半径为$r$的圆，其定向相对于$\mathbf{n}$为正向。则

$$
(\nabla\times\mathbf{F})(\mathbf{p})\cdot\mathbf{n} = \lim_{r\to0}\frac{1}{\pi r^2}\oint_{C_r}\mathbf{F}\cdot d\mathbf{r}.
$$
:::

::: proof
设$D_r$是以$C_r$为边界、法向量为$\mathbf{n}$的平坦圆盘。由斯托克斯公式，$\oint_{C_r}\mathbf{F}\cdot d\mathbf{r} = \iint_{D_r}(\nabla\times\mathbf{F})\cdot\mathbf{n}\,dS$。被积函数连续，所以由积分中值定理（[[multivariable/multiple-integrals#thm-mvt-integral]]，在圆盘所在的平面内应用），右边等于$\pi r^2\,(\nabla\times\mathbf{F})(\mathbf{q}_r)\cdot\mathbf{n}$，其中$\mathbf{q}_r\in D_r$是某一点。除以$\pi r^2$并令$r\to0$：$\mathbf{q}_r\to\mathbf{p}$，由连续性即得结论。
:::

所以，旋度沿$\mathbf{n}$的分量就是在垂直于$\mathbf{n}$的平面内单位面积上的环量，而旋度本身指向使环量最大的那根轴的方向。在速度为$\mathbf{v}$的流体中，小桨轮的轴与$\nabla\times\mathbf{v}$方向一致时转得最快，角速率为$\tfrac12\norm{\nabla\times\mathbf{v}}$——这与刚性转动的$\nabla\times(\boldsymbol\omega\times\mathbf{x}) = 2\boldsymbol\omega$相一致。

## 散度定理

现在设$E$是空间中的立体区域，其边界是取朝外定向的闭曲面$S$。若$\mathbf{F}$是流体的速度，则通量$\iint_S\mathbf{F}\cdot d\mathbf{S}$就是流体离开$E$的净速率。如果流体在内部既不产生也不消失，这一流出量就必定是由$E$内部流体的膨胀产生的——而这正是散度所度量的。

::: theorem 散度定理 {#thm-divergence}
设$E$是有界立体区域，其边界$S$是一个（或若干个）分段光滑的闭曲面，取朝外的定向，$\mathbf{F}$是包含$E$的某个开集上的$C^1$向量场。则

$$
\iint_S\mathbf{F}\cdot d\mathbf{S} = \iiint_E\nabla\cdot\mathbf{F}\,dV .
$$ {#eq-divergence}
:::

::: proof
我们对**简单立体区域**证明这个定理：所谓简单立体区域，是指可以同时用以下三种方式描述的区域

$$
u_1(x,y)\le z\le u_2(x,y), \qquad v_1(x,z)\le y\le v_2(x,z), \qquad w_1(y,z)\le x\le w_2(y,z),
$$

其中$(x,y)$、$(x,z)$、$(y,z)$分别取遍各坐标平面中的区域，且各边界函数连续可微。球体、长方体、圆柱体和四面体都是简单的。记$\mathbf{F} = (P, Q, R)$，$\mathbf{n} = (n_1, n_2, n_3)$。由于$\mathbf{F}\cdot\mathbf{n} = Pn_1 + Qn_2 + Rn_3$，$\nabla\cdot\mathbf{F} = P_x + Q_y + R_z$，只需证明三个恒等式

$$
\iint_S Pn_1\,dS = \iiint_E P_x\,dV, \qquad \iint_S Qn_2\,dS = \iiint_E Q_y\,dV, \qquad \iint_S Rn_3\,dS = \iiint_E R_z\,dV .
$$

我们证明第三个；另外两个的证明相同，只需置换变量的角色，并利用$E$的另外两种描述。利用第一种描述：$E$由满足$(x,y)\in D$且$u_1(x,y)\le z\le u_2(x,y)$的点$(x,y,z)$组成。由富比尼（Fubini）定理以及关于$z$的微积分基本定理，

$$
\iiint_E R_z\,dV = \iint_D\left(\int_{u_1(x,y)}^{u_2(x,y)}R_z\,dz\right)dA = \iint_D\bigl[R(x,y,u_2(x,y)) - R(x,y,u_1(x,y))\bigr]\,dA .
$$

边界$S$由顶面$S_2$（$u_2$的图像）、底面$S_1$（$u_1$的图像）以及可能存在的、位于$D$的边界上方的竖直侧面$S_3$组成。在$S_3$上外法向量是水平的，所以$n_3 = 0$，$S_3$没有贡献。在$S_2$上外法向量朝上，所以对场$(0, 0, R)$应用[[multivariable/surface-integrals#eq-flux-graph]]，得$\iint_{S_2}Rn_3\,dS = \iint_D R(x,y,u_2(x,y))\,dA$。在$S_1$上外法向量朝下，符号随之反转：$\iint_{S_1}Rn_3\,dS = -\iint_D R(x,y,u_1(x,y))\,dA$。把三部分贡献相加，恰好得到上面的表达式。

*一般区域（概要）*。由分段光滑曲面围成的区域可以切成有限个简单的小块。对每一块应用定理再相加，体积分加起来就是$\iiint_E$；而在每个切面上，相邻两块的外法向量方向相反，所以这些通量相互抵消，只剩下穿过$S$的通量。这也涵盖了有洞的区域，其边界由几个闭曲面组成。参见 Marsden 和 Tromba 的 *Vector Calculus* §8.4。
:::

::: example 穿过球面的通量 {#ex-ball-flux}
求$\mathbf{F} = (xy^2,\ yz^2,\ zx^2)$穿过单位球面向外的通量。
::: solution
直接计算会很麻烦，但$\nabla\cdot\mathbf{F} = y^2 + z^2 + x^2 = \rho^2$。由散度定理，并利用球面坐标，

$$
\iint_S\mathbf{F}\cdot d\mathbf{S} = \iiint_B\rho^2\,dV = \int_0^{2\pi}\int_0^\pi\int_0^1\rho^2\cdot\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot2\cdot\frac15 = \frac{4\pi}{5}.
$$

对于散度为$3$的场$(x, y, z)$，同一定理给出它穿过半径为$R$的球面的通量为$3\cdot\tfrac43\pi R^3 = 4\pi R^3$，与直接计算一致：在球面上$\mathbf{F}\cdot\mathbf{n} = R$，所以通量为$R\cdot4\pi R^2$。
:::
:::

::: quiz
$\mathbf{F} = (x,\ 0,\ 0)$穿过立方体$[0,2]^3$表面向外的通量是多少？
- [ ] $0$，因为该场与其中四个面平行
- [ ] $4$
- [x] $8$
- [ ] $24$
::: solution
$\nabla\cdot\mathbf{F} = 1$，所以通量等于立方体的体积$8$。直接计算：只有面$x = 0$（其上$\mathbf{F} = \mathbf{0}$）和面$x = 2$（其上$\mathbf{F}\cdot\mathbf{n} = 2$，面积为$4$）有贡献，结果为$0 + 8 = 8$。
:::
:::

::: theorem 散度是通量密度 {#thm-div-density}
若$\mathbf{F}$在$\mathbf{p}$附近是$C^1$的，$S_r$是以$\mathbf{p}$为球心、半径为$r$、取朝外定向的球面，则

$$
(\nabla\cdot\mathbf{F})(\mathbf{p}) = \lim_{r\to0}\frac{1}{\tfrac43\pi r^3}\iint_{S_r}\mathbf{F}\cdot d\mathbf{S} .
$$
:::

::: proof
由散度定理，通量等于$\iiint_{B_r}\nabla\cdot\mathbf{F}\,dV$；由三重积分的中值定理（其证明与[[multivariable/multiple-integrals#thm-mvt-integral]]完全相同），它等于$\tfrac43\pi r^3\,(\nabla\cdot\mathbf{F})(\mathbf{q}_r)$，其中$\mathbf{q}_r$是球体中的某一点。当$r\to0$时$\mathbf{q}_r\to\mathbf{p}$，由连续性即得结论。
:::

所以散度就是单位体积的净流出通量：在源处为正，在汇处为负，在流动既不膨胀也不压缩的地方为零。处处散度为零的场称为**不可压缩**场或**无源场**（管形场）。

### 高斯定律

平方反比场$\mathbf{F} = \mathbf{x}/\norm{\mathbf{x}}^3$除原点外处处散度为零，它在原点处没有定义。散度定理解释了为什么它穿过以原点为球心的球面的通量总是$4\pi$（[[multivariable/surface-integrals]]）。

::: example 点电荷的高斯定律 {#ex-gauss-law}
设$S$是任一取朝外定向、不经过原点的分段光滑闭曲面。证明：若$S$包围原点，则$\mathbf{F} = \mathbf{x}/\norm{\mathbf{x}}^3$穿过$S$的通量为$4\pi$；若不包围原点，则通量为$0$。
::: solution
设$E$是由$S$围成的立体。若原点不在$E$中，则$\mathbf{F}$在包含$E$的某个开集上是$C^1$的，且在那里$\nabla\cdot\mathbf{F} = 0$，所以通量为$\iiint_E0\,dV = 0$。

若原点在$E$的内部，就不能直接对$E$应用定理。取足够小的$\eps > 0$，使以原点为球心、半径为$\eps$的球体$B_\eps$位于$E$的内部，然后对区域$E' = E\setminus B_\eps$应用散度定理，在这个区域上$\mathbf{F}$是$C^1$的且散度为零。$E'$的边界由取朝外定向的$S$和小球面$S_\eps$组成，而$S_\eps$的**相对于$E'$**的外法向量指向原点。因此

$$
0 = \iiint_{E'}\nabla\cdot\mathbf{F}\,dV = \iint_S\mathbf{F}\cdot d\mathbf{S} - \iint_{S_\eps,\ \text{朝外}}\mathbf{F}\cdot d\mathbf{S},
$$

于是穿过$S$的通量等于穿过小球面向外的通量，由[[multivariable/surface-integrals#ex-inverse-square]]，它等于$4\pi$。
:::
:::

::: application 高斯定律与平方反比定律
位于原点的点电荷$q$的电场为$\mathbf{E} = \dfrac{q}{4\pi\varepsilon_0}\dfrac{\mathbf{x}}{\norm{\mathbf{x}}^3}$，所以由[[#ex-gauss-law]]，它穿过任一闭曲面的通量在曲面包围电荷时为$q/\varepsilon_0$，否则为$0$。由叠加原理，对任意电荷分布，$\mathbf{E}$流出闭曲面的通量等于所包围的总电荷除以$\varepsilon_0$——这就是**高斯定律**。对连续的电荷密度$\rho$应用[[#thm-div-density]]，就把这一积分形式的定律变成微分形式的定律$\nabla\cdot\mathbf{E} = \rho/\varepsilon_0$，即麦克斯韦方程组中的第一个方程。牛顿（Newton）引力也是同样的道理，这就是为什么球形行星对外部物体的吸引，就好像它的全部质量都集中在球心一样。
:::

::: application 守恒律
设$\rho(\mathbf{x}, t)$是以速度$\mathbf{v}(\mathbf{x}, t)$运动的流体的密度。对任一边界为$S$的固定区域$E$，其内部的质量只能通过穿过$S$的流动而改变：

$$
\frac{d}{dt}\iiint_E\rho\,dV = -\iint_S\rho\mathbf{v}\cdot d\mathbf{S} = -\iiint_E\nabla\cdot(\rho\mathbf{v})\,dV .
$$

所以对**每个**区域$E$都有$\iiint_E\left(\pdv{\rho}{t} + \nabla\cdot(\rho\mathbf{v})\right)dV = 0$；由于被积函数连续，它必定恒为零（否则它会在某个小球上保持固定的符号）。这就得到**连续性方程**$\pdv{\rho}{t} + \nabla\cdot(\rho\mathbf{v}) = 0$。对热量作同样的论证，并对热流使用傅里叶（Fourier）定律$\mathbf{q} = -k\nabla u$，就得到热方程$\pdv{u}{t} = \kappa\,\Delta u$（[[pde/heat-equation]]）。把对每个区域都成立的平衡律转化为在每一点都成立的微分方程，是散度定理的主要用途之一。
:::

::: warning 检查条件：光滑性与闭曲面
散度定理要求$\mathbf{F}$在**整个**立体上是$C^1$的，并且曲面是**闭**的。平方反比场在其有定义的地方都满足$\nabla\cdot\mathbf{F} = 0$，但它穿过单位球面的通量是$4\pi$而不是$0$——因为该场在球面内部的原点处没有定义。而对于像半球面这样的非闭曲面，并没有它所围成的立体：要使用这个定理，先把曲面补成闭曲面（加上平坦的圆盘），再减去穿过所补部分的通量。类似地，斯托克斯公式要求$\mathbf{F}$在整个曲面上是$C^1$的，而不只是在曲面的边界上。
:::

## 同一个定理的多种面貌

本课程中的各个定理具有同一种形式：

| 定理 | 区域 | 边界 | 内容 |
|---|---|---|---|
| 微积分基本定理 | 区间$[a,b]$ | 两个点 | $\int_a^bF'\,dx = F(b) - F(a)$ |
| 曲线积分基本定理（[[multivariable/line-integrals#thm-ftli]]） | 曲线$C$ | 两个端点 | $\int_C\nabla f\cdot d\mathbf{r} = f(B) - f(A)$ |
| 格林公式 | 平面区域$D$ | 闭曲线 | $\iint_D(Q_x - P_y)\,dA = \oint_{\partial D}P\,dx + Q\,dy$ |
| 斯托克斯公式 | 曲面$S$ | 闭曲线 | $\iint_S(\nabla\times\mathbf{F})\cdot d\mathbf{S} = \oint_{\partial S}\mathbf{F}\cdot d\mathbf{r}$ |
| 散度定理 | 立体$E$ | 闭曲面 | $\iiint_E\nabla\cdot\mathbf{F}\,dV = \oiint_{\partial E}\mathbf{F}\cdot d\mathbf{S}$ |

在每种情形中，把导数在一个区域上积分，都等于把原来的对象在边界上积分，且两边的定向相互匹配。还请注意梯度$\to$旋度$\to$散度这条链，其中$\nabla\times\nabla f = \mathbf{0}$，$\nabla\cdot(\nabla\times\mathbf{F}) = 0$：连续作用两次导数总是得到零，这与“区域的边界本身没有边界”这一事实相呼应。

::: remark 一般的斯托克斯公式
用微分形式的语言来说，这五个命题是同一个命题：对边界为$\partial M$的$k$维紧有向流形$M$和$(k-1)$-形式$\omega$，

$$
\int_M d\omega = \int_{\partial M}\omega .
$$

这里$d$是外微分，在$\R^3$中，它作用于函数时相当于梯度，作用于1-形式时相当于旋度，作用于2-形式时相当于散度；而$d(d\omega) = 0$就是[[#thm-identities]]。这个**广义斯托克斯公式**在任何维数中都成立；它在 Spivak 的 *Calculus on Manifolds* 第5章以及 Hubbard 和 Hubbard 的 *Vector Calculus, Linear Algebra, and Differential Forms* 第6章中有系统的阐述。
:::

::: history
散度定理的一些特殊情形出现在拉格朗日（Lagrange）1762年关于声音传播的工作和高斯（Gauss）1813年关于引力的工作中；米哈伊尔·奥斯特罗格拉茨基（Mikhail Ostrogradsky）以一般形式证明了这个定理，他于1826年把它提交给巴黎科学院，并于1831年在圣彼得堡发表；因此这个定理常被称为高斯-奥斯特罗格拉茨基定理。乔治·格林（George Green）1828年的论文中包含了与之密切相关的恒等式。如今称为斯托克斯公式的定理，最早出现在威廉·汤姆森（William Thomson，即后来的开尔文勋爵）1850年7月写给乔治·加布里埃尔·斯托克斯（George Gabriel Stokes）的一封信中；斯托克斯在1854年剑桥大学史密斯奖的考试中把它出成一道试题，而参加了那次考试的詹姆斯·克拉克·麦克斯韦（James Clerk Maxwell）在他的《电磁通论》（*Treatise on Electricity and Magnetism*，1873年）中把这个定理归功于斯托克斯，在这部著作中，这些定理成为物理学的核心。统一的公式$\int_M d\omega = \int_{\partial M}\omega$则是在20世纪初从埃利·嘉当（Élie Cartan）的微分形式演算中产生的。
:::

## 后续内容

斯托克斯公式和高斯公式是物理定律的积分形式与微分形式之间的桥梁：麦克斯韦方程组、流体动力学方程，以及一般的守恒律（[[pde/heat-equation]]、[[pde/wave-equation]]、[[pde/laplace-equation]]）都是如此。在复分析中，把格林公式应用于解析函数的实部和虚部，就证明了柯西（Cauchy）定理（[[complex-analysis/cauchy-theorem]]）。在微分几何中，高斯-博内（Gauss–Bonnet）定理（[[differential-geometry/geodesics-gauss-bonnet]]）是通过在曲面的坐标中应用格林公式来证明的。而“当定义域有洞时，无旋场未必是梯度场”这一观察，正是德拉姆（de Rham）上同调的起点，它用微积分来度量空间中的洞，正如基本群（[[topology/fundamental-group]]）用闭路来度量它们一样。

::: summary
- $\nabla\cdot\mathbf{F} = P_x + Q_y + R_z$度量膨胀（单位体积的向外通量，[[#thm-div-density]]）；$\nabla\times\mathbf{F} = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y)$度量转动（单位面积上的环量，[[#thm-curl-density]]）。
- 对$C^2$场，$\nabla\times\nabla f = \mathbf{0}$，$\nabla\cdot(\nabla\times\mathbf{F}) = 0$（[[#thm-identities]]）；$\Delta f = \nabla\cdot\nabla f$是拉普拉斯算子。
- 斯托克斯公式：$\oint_{\partial S}\mathbf{F}\cdot d\mathbf{r} = \iint_S(\nabla\times\mathbf{F})\cdot d\mathbf{S}$，其中边界按右手法则定向（[[#thm-stokes]]）。对函数图像的证明归结为格林公式。
- 旋度的通量只取决于边界曲线；可以把曲面换成一个方便的曲面，通常是平坦的（[[#cor-surface-independence]]）。
- 散度定理：取朝外定向时，$\oiint_{\partial E}\mathbf{F}\cdot d\mathbf{S} = \iiint_E\nabla\cdot\mathbf{F}\,dV$（[[#thm-divergence]]）；它是通过在每个坐标方向上应用微积分基本定理来证明的。
- 区域内部的奇点必须挖掉：平方反比场穿过每个包围原点的闭曲面的通量都是$4\pi$（高斯定律）。
- 这两个定理都把对每个区域成立的平衡律转化为微分方程，而且它们都是$\int_M d\omega = \int_{\partial M}\omega$的特例。
:::

## 习题

::: exercise 求散度 {level=1 check="5"}
对$\mathbf{F} = (x^2y,\ yz,\ xz^2)$，求$\nabla\cdot\mathbf{F}$在$(1, 1, 1)$处的值。
::: solution
$\nabla\cdot\mathbf{F} = 2xy + z + 2xz$，它在$(1,1,1)$处等于$2 + 1 + 2 = 5$（见[[#ex-div-curl]]）。
:::
:::

::: exercise 一个无旋场 {level=1}
证明$\mathbf{F} = (yz,\ xz,\ xy)$的旋度为零，并求一个满足$\nabla f = \mathbf{F}$的函数$f$。
::: solution
$\nabla\times\mathbf{F} = (x - x,\ y - y,\ z - z) = \mathbf{0}$。由于$\R^3$是星形的，$\mathbf{F}$是保守场（[[multivariable/line-integrals#exr-star-3d]]），而$f = xyz$满足要求：$\nabla(xyz) = (yz, xz, xy)$。
:::
:::

::: exercise 流出立方体的通量 {level=1 check="3"}
求$\mathbf{F} = (x, y, z)$穿过单位立方体$[0,1]^3$表面向外的通量。
::: solution
$\nabla\cdot\mathbf{F} = 3$，所以由散度定理，通量为$3\cdot\text{体积} = 3$。（直接计算：只有$x = 1$、$y = 1$、$z = 1$这三个面有贡献，每个面上$\mathbf{F}\cdot\mathbf{n} = 1$，面积为$1$。）
:::
:::

::: exercise 三次场的通量 {level=2 check="12*pi/5"}
求$\mathbf{F} = (x^3,\ y^3,\ z^3)$穿过单位球面向外的通量。
::: solution
$\nabla\cdot\mathbf{F} = 3(x^2 + y^2 + z^2) = 3\rho^2$，所以通量为$\int_0^{2\pi}\int_0^\pi\int_0^1 3\rho^2\cdot\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 3\cdot\tfrac{4\pi}{5} = \tfrac{12\pi}{5}$。
:::
:::

::: exercise 用斯托克斯公式求环量 {level=2 check="-pi"}
用斯托克斯公式计算$\oint_C\mathbf{F}\cdot d\mathbf{r}$，其中$\mathbf{F} = (y,\ z,\ x)$，$C$是单位圆$x^2 + y^2 = 1$，$z = 0$，从上方看按逆时针方向绕行。再直接计算曲线积分加以验证。
::: solution
$\nabla\times\mathbf{F} = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y) = (0 - 1,\ 0 - 1,\ 0 - 1) = (-1,-1,-1)$。取$S$为法向量为$\mathbf{k}$的单位圆盘：旋度的通量为$\iint_S(-1)\,dA = -\pi$。直接计算，取$\mathbf{r}(t) = (\cos t, \sin t, 0)$：$\mathbf{F}\cdot\mathbf{r}' = \sin t\cdot(-\sin t) + 0 + 0$，而$\int_0^{2\pi}-\sin^2t\,dt = -\pi$。
:::
:::

::: exercise 旋度穿过半球面的通量 {level=2 check="0"}
设$\mathbf{F} = (xz,\ yz,\ xy)$，$S$是取朝上定向的上半单位球面。求$\iint_S(\nabla\times\mathbf{F})\cdot d\mathbf{S}$。
::: solution
由斯托克斯公式，通量等于沿平面$z = 0$上单位圆的$\oint_C\mathbf{F}\cdot d\mathbf{r}$。在那里$\mathbf{F} = (0, 0, xy)$，$d\mathbf{r} = (dx, dy, 0)$，所以被积式为零，通量为$0$。（验证：$\nabla\times\mathbf{F} = (x - y,\ x - y,\ 0)$，在球面上$(\nabla\times\mathbf{F})\cdot\mathbf{n} = (x - y)x + (x - y)y = x^2 - y^2$，由对称性$x\leftrightarrow y$，它在半球面上的积分为零。）
:::
:::

::: exercise 椭球面的高斯定律 {level=2 check="4*pi"}
求$\mathbf{F} = \mathbf{x}/\norm{\mathbf{x}}^3$穿过椭球面$\dfrac{x^2}{4} + \dfrac{y^2}{9} + z^2 = 1$向外的通量。
::: solution
椭球面是包围原点的闭曲面，所以由[[#ex-gauss-law]]，通量为$4\pi$——根本不需要对椭球面进行参数化。
:::
:::

::: exercise 用通量表示体积 {level=2}
证明：边界$S$取朝外定向的立体$E$的体积为$\dfrac13\iint_S\mathbf{x}\cdot d\mathbf{S}$，其中$\mathbf{x} = (x, y, z)$；并对半径为$R$的球体验证这个公式。
::: solution
$\nabla\cdot\mathbf{x} = 3$，所以由散度定理，$\iint_S\mathbf{x}\cdot d\mathbf{S} = \iiint_E3\,dV = 3\,\text{体积}(E)$。对半径为$R$的球面，处处有$\mathbf{x}\cdot\mathbf{n} = R$，所以$\tfrac13\iint_S\mathbf{x}\cdot d\mathbf{S} = \tfrac13R\cdot4\pi R^2 = \tfrac43\pi R^3$。（这是[[multivariable/greens-theorem#cor-area]]中面积公式$\tfrac12\oint(x\,dy - y\,dx)$在三维中的类似物。）
:::
:::

::: exercise 旋度的旋度 {level=3}
证明：对$C^2$向量场$\mathbf{F}$，$\nabla\times(\nabla\times\mathbf{F}) = \nabla(\nabla\cdot\mathbf{F}) - \Delta\mathbf{F}$，其中$\Delta\mathbf{F} = (\Delta P, \Delta Q, \Delta R)$。由此推出：若$\nabla\cdot\mathbf{E} = 0$，且$\nabla\times\mathbf{E} = -\pdv{\mathbf{B}}{t}$，$\nabla\times\mathbf{B} = \mu_0\varepsilon_0\pdv{\mathbf{E}}{t}$（真空中的麦克斯韦方程组），则$\mathbf{E}$的每个分量都满足波动方程$\pdv{^2E}{t^2} = c^2\Delta E$，其中$c^2 = 1/(\mu_0\varepsilon_0)$。
::: solution
比较第一个分量。$\nabla\times\mathbf{G}$的第一个分量是$G_{3,y} - G_{2,z}$；当$\mathbf{G} = \nabla\times\mathbf{F} = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y)$时，它等于

$$
(Q_x - P_y)_y - (P_z - R_x)_z = Q_{xy} + R_{xz} - P_{yy} - P_{zz} .
$$

$\nabla(\nabla\cdot\mathbf{F}) - \Delta\mathbf{F}$的第一个分量是$(P_x + Q_y + R_z)_x - (P_{xx} + P_{yy} + P_{zz}) = Q_{yx} + R_{zx} - P_{yy} - P_{zz}$，由克莱罗定理，两者相同。其他分量由轮换对称性得到。对于麦克斯韦方程组，对$\nabla\times\mathbf{E} = -\partial_t\mathbf{B}$两边取旋度，并交换空间导数与时间导数的次序：

$$
\nabla(\nabla\cdot\mathbf{E}) - \Delta\mathbf{E} = -\pdv{}{t}(\nabla\times\mathbf{B}) = -\mu_0\varepsilon_0\pdv{^2\mathbf{E}}{t^2}.
$$

由于$\nabla\cdot\mathbf{E} = 0$，这就是说$\pdv{^2\mathbf{E}}{t^2} = \frac{1}{\mu_0\varepsilon_0}\Delta\mathbf{E}$：电磁波以速度$c = 1/\sqrt{\mu_0\varepsilon_0}$传播，这正是光速——这是麦克斯韦的伟大发现（[[pde/wave-equation]]）。
:::
:::

::: exercise 无散场与曲面无关性 {level=3}
设$\mathbf{G}$是$\R^3$上满足$\nabla\cdot\mathbf{G} = 0$的$C^1$场。设$S_1$和$S_2$是两个有向曲面，它们有同一条边界曲线$C$，在$C$上诱导出相同的定向，并且合在一起围成一个立体区域$E$。证明$\iint_{S_1}\mathbf{G}\cdot d\mathbf{S} = \iint_{S_2}\mathbf{G}\cdot d\mathbf{S}$。这与[[#cor-surface-independence]]有什么关系？
::: hint
$E$的边界由$S_1$和$S_2$组成，但对于外法向量而言，其中一个的定向是“错误”的。
:::
::: solution
由于$S_1$和$S_2$在$C$上诱导出相同的定向，它们的法向量不可能都指向$E$的外部：沿$C$绕行时，两个曲面从$C$的两侧离开$C$，所以若$S_1$的定向朝$E$的外部，则$S_2$的定向朝内部（如果情况相反，就交换两者的名称）。因此，$E$取朝外定向的边界由$S_1$和反转定向后的$S_2$组成，于是散度定理给出

$$
\iint_{S_1}\mathbf{G}\cdot d\mathbf{S} - \iint_{S_2}\mathbf{G}\cdot d\mathbf{S} = \iiint_E\nabla\cdot\mathbf{G}\,dV = 0 .
$$

[[#cor-surface-independence]]是$\mathbf{G} = \nabla\times\mathbf{F}$的特殊情形，由[[#thm-identities]]，这样的$\mathbf{G}$是无散的。事实上，在$\R^3$上每个无散场都是某个场的旋度，所以这两个命题是等价的——但要证明这一点，需要构造一个“向量势”，就像[[multivariable/line-integrals#thm-star-shaped]]中构造势函数那样。
:::
:::
