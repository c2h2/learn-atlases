拖牵索道拉着滑雪者沿一条蜿蜒的雪道上行，同时侧风从旁边吹来；风做了多少功？一根细金属丝被弯成弹簧，其密度沿长度方向变化；它的质量是多少？物理学家究竟为什么能够谈论卫星的“势能”——为什么引力对运动物体所做的功只取决于物体的起点和终点，而与途中所走的路线无关？

这三个问题都涉及沿曲线而不是沿区间积分。本章引入**向量场**——它给空间中的每一点附上一个向量（一个力、一个速度）——以及两类**曲线积分**：一类沿曲线累加一个标量，如质量；另一类沿曲线累加向量场的分量，如功。然后我们证明曲线积分基本定理，它说明了功在什么情况下与路径无关；我们还将遇到一个场——涡旋场，它表明这个问题实际上有多么微妙。

与[[multivariable/vector-functions]]一章一样，曲线用向量值函数$\mathbf{r}(t)$来描述；梯度的含义同[[multivariable/gradient]]一章。

## 向量场

::: definition 向量场 {#def-vector-field}
集合$D\subseteq\R^n$上的**向量场**是一个函数$\mathbf{F}\colon D\to\R^n$，它给每一点$\mathbf{x}\in D$指定一个向量$\mathbf{F}(\mathbf{x})$。在平面上记$\mathbf{F} = (P, Q)$，在空间中记$\mathbf{F} = (P, Q, R)$，其中**分量**$P, Q, R$是关于位置的实值函数。如果各分量连续，或属于$C^1$类，就称该向量场**连续**，或**属于$C^1$类**。
:::

为了描绘一个向量场，我们在一组网格采样点上画出箭头$\mathbf{F}(\mathbf{x})$，箭尾放在$\mathbf{x}$处。下面几个场将在本课程余下的部分中一路陪伴我们：

- **旋转**：$\mathbf{F}(x,y) = (-y, x)$。每个箭头都垂直于位置向量，长度等于该点到原点的距离，所以这个场描述的是绕原点的刚性转动（如同转盘）。
- **径向场**：$\mathbf{F}(x,y) = (x, y)$径直指向远离原点的方向，就像从源头涌出的流体。
- **引力**：位于原点的质量$M$吸引位于$\mathbf{r} \ne \mathbf{0}$处的质量$m$，引力为
  $$
  \mathbf{F}(\mathbf{r}) = -\frac{GMm}{\norm{\mathbf{r}}^3}\,\mathbf{r},
  $$
  其大小为$GMm/\norm{\mathbf{r}}^2$，方向指向原点——这是一个**平方反比场**。静电力也具有同样的形式。
- **梯度场**：对可微函数$f$，场$\nabla f$指向$f$的最速上升方向（见[[multivariable/gradient#thm-steepest]]）。例如$f = \sqrt{x^2+y^2+z^2}$的梯度为$\nabla f = \mathbf{r}/\norm{\mathbf{r}}$，即单位径向场。

若$\mathbf{F}$是流体的速度场，则随流体运动的质点沿满足$\mathbf{r}'(t) = \mathbf{F}(\mathbf{r}(t))$的曲线$\mathbf{r}(t)$运动；这样的曲线称为**流线**（flow line，也称 streamline）。旋转场的流线是以原点为圆心的圆；径向场的流线是从原点出发的射线。求流线就是解一个微分方程组，这是[[ode/linear-systems]]和[[ode/nonlinear-systems]]两章的主题。

::: widget vectorfield
P: a*x - b*y
Q: b*x + a*y
x: -3, 3
y: -3, 3
streamlines: true
sliders: a=0.3:-1:1:0.1; b=1:-1:1:0.1
caption: 线性场$\mathbf{F} = (ax - by,\; bx + ay)$及其流线。令$a = 0$：流线是圆，该场是纯旋转。令$b = 0$：流线是射线，该场是纯膨胀（$a > 0$）或纯收缩（$a < 0$）。介于两者之间时，流动呈螺旋状。在[[multivariable/greens-theorem]]一章中，这两种效应分别由旋度（$2b$）和散度（$2a$）来度量。
:::

## 标量函数的曲线积分

设想一根细金属丝沿曲线$C$放置，其线密度（单位长度的质量）$\delta(x,y,z)$随点而变。把金属丝切成长度为$\Delta s_1, \dots, \Delta s_N$的小段，并在每段中取一点$\mathbf{x}_i^*$。质量近似等于$\sum \delta(\mathbf{x}_i^*)\,\Delta s_i$，而且小段越短，近似越好。若$C$由$\mathbf{r}(t)$（$a\le t\le b$）参数化，则对应于$[t_{i-1}, t_i]$的小段长度为$\Delta s_i \approx \norm{\mathbf{r}'(t_i)}\,\Delta t_i$（见[[multivariable/vector-functions#def-arc-length]]），于是这些和就成为关于$t$的普通积分的黎曼（Riemann）和。

首先确定积分所沿的曲线类型。**光滑曲线**$C$是映射$\mathbf{r}\colon[a,b]\to\R^n$的像，其中$\mathbf{r}$具有连续导数且$\mathbf{r}'(t)\ne\mathbf{0}$，并且是一一的，只是可能有$\mathbf{r}(a) = \mathbf{r}(b)$（此时称为**闭**曲线）。**分段光滑**曲线是由有限条光滑曲线$C_1, \dots, C_k$连成的链，每一条都从前一条的终点出发；记作$C = C_1 + \dots + C_k$。多边形和正方形的边界都是分段光滑的。

::: definition 标量函数的曲线积分 {#def-scalar-line-integral}
设光滑曲线$C$如上由$\mathbf{r}\colon[a,b]\to\R^n$参数化，$f$在$C$上连续。$f$**沿$C$对弧长的曲线积分**为

$$
\int_C f\,ds = \int_a^b f(\mathbf{r}(t))\,\norm{\mathbf{r}'(t)}\,dt .
$$ {#eq-scalar-li}

对分段光滑曲线，$\int_C f\,ds$定义为它在各光滑段上的积分之和。
:::

符号$ds = \norm{\mathbf{r}'(t)}\,dt$称为**弧长元素**。取$f = 1$，积分就是$C$的长度；取$f = \delta$，积分就是金属丝的质量；而$\frac{1}{L}\int_C f\,ds$是$f$沿长度为$L$的曲线的平均值。对平面曲线且$f \ge 0$，$\int_C f\,ds$是立在$C$上、位于$f$的图像之下的那块“幕布”的面积。

这个定义用到了一个特定的参数化，但结果不应依赖于它——金属丝的质量不可能取决于我们怎样标记它上面的点。

::: theorem 与参数化无关 {#thm-scalar-invariance}
设$\mathbf{r}\colon[a,b]\to\R^n$是光滑曲线$C$的参数化，令$\boldsymbol\rho(u) = \mathbf{r}(\varphi(u))$，$c\le u\le d$，其中$\varphi\colon[c,d]\to[a,b]$是双射，具有连续且处处不为零的导数。则

$$
\int_c^d f(\boldsymbol\rho(u))\,\norm{\boldsymbol\rho'(u)}\,du = \int_a^b f(\mathbf{r}(t))\,\norm{\mathbf{r}'(t)}\,dt .
$$

特别地，无论沿哪个方向走过$C$，$\int_C f\,ds$都相同。
:::

::: proof
由于$\varphi'$连续且处处不为零，它的符号不变。由链式法则，$\boldsymbol\rho'(u) = \varphi'(u)\,\mathbf{r}'(\varphi(u))$，所以$\norm{\boldsymbol\rho'(u)} = \abs{\varphi'(u)}\,\norm{\mathbf{r}'(\varphi(u))}$。若$\varphi' > 0$，则$\varphi(c) = a$，$\varphi(d) = b$，作代换$t = \varphi(u)$得

$$
\int_c^d f(\mathbf{r}(\varphi(u)))\,\norm{\mathbf{r}'(\varphi(u))}\,\varphi'(u)\,du = \int_a^b f(\mathbf{r}(t))\,\norm{\mathbf{r}'(t)}\,dt .
$$

若$\varphi' < 0$，则$\varphi(c) = b$，$\varphi(d) = a$，且$\abs{\varphi'} = -\varphi'$，所以同样的代换给出$-\int_b^a(\cdots)\,dt = \int_a^b(\cdots)\,dt$。无论哪种情形，两个积分都相等。
:::

::: example 弹簧的质量 {#ex-spring}
一根金属丝沿螺旋线$\mathbf{r}(t) = (\cos t, \sin t, t)$，$0 \le t\le 2\pi$放置，其密度等于高度：$\delta(x,y,z) = z$。求它的质量。
::: solution
$\mathbf{r}'(t) = (-\sin t, \cos t, 1)$，所以$\norm{\mathbf{r}'(t)} = \sqrt{\sin^2t + \cos^2t + 1} = \sqrt2$。沿曲线有$\delta(\mathbf{r}(t)) = t$。因此

$$
m = \int_C z\,ds = \int_0^{2\pi} t\,\sqrt2\,dt = \sqrt2\cdot\frac{(2\pi)^2}{2} = 2\sqrt2\,\pi^2 \approx 27.9 .
$$
:::
:::

::: example 半圆形金属丝的质心 {#ex-semicircle}
一根均匀的金属丝被弯成半圆$x^2 + y^2 = 1$，$y\ge0$。它的质心在哪里？
::: solution
对均匀的金属丝，质心就是平均位置$(\bar x, \bar y) = \frac1L\left(\int_C x\,ds, \int_C y\,ds\right)$，其中$L = \pi$是长度。由对称性，$\bar x = 0$。取$\mathbf{r}(t) = (\cos t, \sin t)$，$0\le t\le\pi$，则$\norm{\mathbf{r}'(t)} = 1$，所以

$$
\bar y = \frac{1}{\pi}\int_0^\pi \sin t\,dt = \frac{2}{\pi} \approx 0.64 .
$$

质心$(0, 2/\pi)$位于对称轴上，却不在金属丝上——就像圆环的中心一样。
:::
:::

::: warning 不要忘记速率
一个常见的疏忽是写成$\int_C f\,ds = \int_a^b f(\mathbf{r}(t))\,dt$，漏掉了因子$\norm{\mathbf{r}'(t)}$。这样一来，结果就会依赖于走过曲线的快慢：以两倍的速度绕单位圆一周，即取$\mathbf{r}(t) = (\cos 2t, \sin 2t)$，$0\le t\le\pi$，会使“长度”减半。正是因子$\norm{\mathbf{r}'(t)}$保证了[[#thm-scalar-invariance]]成立。还要注意，参数化必须只描出$C$一次：绕圆走两圈的参数化算出的是积分的两倍。
:::

## 向量场的曲线积分

现在设力场$\mathbf{F}$作用于沿曲线$C$运动的质点。在路径的一小段上，力几乎不变，位移几乎就是直线向量$\Delta\mathbf{r}_i = \mathbf{r}(t_i) - \mathbf{r}(t_{i-1}) \approx \mathbf{r}'(t_i)\,\Delta t_i$，所以所做的功近似为$\mathbf{F}(\mathbf{r}(t_i))\cdot\Delta\mathbf{r}_i$（功 = 力 · 位移，见[[multivariable/vectors-geometry]]）。求和并不断加细，就得到第二类曲线积分。与质量不同，功依赖于运动的方向，所以我们在**有向**曲线上积分：有向曲线是指取定了走向的曲线，其走向就是$t$增大的方向。

::: definition 向量场的曲线积分 {#def-line-integral}
设$\mathbf{F}$是有向光滑曲线$C$上的连续向量场，$C$按其定向由$\mathbf{r}\colon[a,b]\to\R^n$参数化。$\mathbf{F}$**沿$C$的曲线积分**为

$$
\int_C \mathbf{F}\cdot d\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,dt .
$$ {#eq-vector-li}

对分段光滑的有向曲线，它是各光滑段上的积分之和。当$C$是闭曲线时，常写作$\oint_C$，并称$\oint_C\mathbf{F}\cdot d\mathbf{r}$为$\mathbf{F}$沿$C$的**环量**。
:::

由于$\mathbf{r}'(t) = \norm{\mathbf{r}'(t)}\,\mathbf{T}(t)$，其中$\mathbf{T}$是单位切向量，我们也可以写成

$$
\int_C\mathbf{F}\cdot d\mathbf{r} = \int_C \mathbf{F}\cdot\mathbf{T}\,ds :
$$

也就是说，向量场的曲线积分就是它的**切向分量**的标量曲线积分。与运动方向垂直的力不做功。用分量表示，若$\mathbf{F} = (P,Q,R)$，$\mathbf{r} = (x(t), y(t), z(t))$，则被积函数为$Px' + Qy' + Rz'$，由此引出常用的记号

$$
\int_C \mathbf{F}\cdot d\mathbf{r} = \int_C P\,dx + Q\,dy + R\,dz .
$$

::: theorem 定向 {#thm-orientation}
在满足$\varphi' > 0$的重新参数化$\mathbf{r}\circ\varphi$（它保持走向不变）下，曲线积分$\int_C\mathbf{F}\cdot d\mathbf{r}$不变。若$-C$表示取相反定向的$C$，则

$$
\int_{-C}\mathbf{F}\cdot d\mathbf{r} = -\int_C\mathbf{F}\cdot d\mathbf{r}.
$$
:::

::: proof
对$\boldsymbol\rho(u) = \mathbf{r}(\varphi(u))$，有$\boldsymbol\rho'(u) = \varphi'(u)\,\mathbf{r}'(\varphi(u))$，所以

$$
\int_c^d\mathbf{F}(\boldsymbol\rho(u))\cdot\boldsymbol\rho'(u)\,du = \int_c^d \mathbf{F}(\mathbf{r}(\varphi(u)))\cdot\mathbf{r}'(\varphi(u))\,\varphi'(u)\,du = \int_{\varphi(c)}^{\varphi(d)}\mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,dt
$$

这里用了代换$t = \varphi(u)$。若$\varphi' > 0$，积分限为$a$和$b$，积分不变。取$\varphi' < 0$（例如在$[a,b]$上取$\varphi(u) = a + b - u$）就得到$-C$的一个参数化；这时积分限为$b$和$a$，交换上下限会改变符号。与[[#thm-scalar-invariance]]的证明不同，这里没有绝对值$\abs{\varphi'}$来吸收这个符号。
:::

::: example 沿扭三次曲线所做的功 {#ex-twisted-cubic}
对$\mathbf{F}(x,y,z) = (y, z, x)$，沿扭三次曲线$\mathbf{r}(t) = (t, t^2, t^3)$从$(0,0,0)$到$(1,1,1)$计算$\int_C \mathbf{F}\cdot d\mathbf{r}$。
::: solution
沿曲线有$\mathbf{F}(\mathbf{r}(t)) = (t^2, t^3, t)$，$\mathbf{r}'(t) = (1, 2t, 3t^2)$，所以

$$
\int_C\mathbf{F}\cdot d\mathbf{r} = \int_0^1\bigl(t^2 + 2t^4 + 3t^3\bigr)\,dt = \frac13 + \frac25 + \frac34 = \frac{20 + 24 + 45}{60} = \frac{89}{60}.
$$
:::
:::

::: example 三条路径，三个答案 {#ex-three-paths}
设$\mathbf{F}(x,y) = (-y, x)$。分别沿 (a) 单位圆的上半部分，(b) 直线段，(c) 单位圆的下半部分，计算从$(1,0)$到$(-1,0)$的$\int_C\mathbf{F}\cdot d\mathbf{r}$。
::: solution
(a) $\mathbf{r}(t) = (\cos t, \sin t)$，$0\le t\le\pi$：$\mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t) = (-\sin t)(-\sin t) + (\cos t)(\cos t) = 1$，所以积分为$\pi$。

(b) $\mathbf{r}(t) = (1-2t, 0)$，$0\le t\le 1$：$\mathbf{F}(\mathbf{r}(t)) = (0, 1-2t)$，$\mathbf{r}'(t) = (-2, 0)$，二者的点积为$0$。积分为$0$：在$x$轴上，场处处与$x$轴垂直。

(c) $\mathbf{r}(t) = (\cos t, -\sin t)$，$0\le t\le\pi$：被积函数为$(\sin t)(-\sin t) + (\cos t)(-\cos t) = -1$，积分为$-\pi$。

这个场所做的功依赖于路径，而不仅仅取决于端点。沿(a)出发、再沿$-(c)$返回，恰好是逆时针绕行一整圈，环量为$\pi - (-\pi) = 2\pi$。
:::
:::

::: quiz
设$-C$是沿相反方向走过的曲线$C$。对每个连续的$f$和$\mathbf{F}$，下列哪些说法成立？（选出所有正确的选项。）
- [ ] $\int_{-C} f\,ds = -\int_C f\,ds$
- [x] $\int_{-C} f\,ds = \int_C f\,ds$
- [x] $\int_{-C} \mathbf{F}\cdot d\mathbf{r} = -\int_C \mathbf{F}\cdot d\mathbf{r}$
- [ ] $\int_{-C} \mathbf{F}\cdot d\mathbf{r} = \int_C \mathbf{F}\cdot d\mathbf{r}$
::: solution
无论朝哪个方向走，弧长都是正的，所以标量曲线积分与定向无关（[[#thm-scalar-invariance]]）。走向反转时切向量也随之反向，所以切向分量$\mathbf{F}\cdot\mathbf{T}$改变符号，功也随之变号（[[#thm-orientation]]）。
:::
:::

## 曲线积分基本定理

在一元情形中，$\int_a^b f'(t)\,dt = f(b) - f(a)$。曲线上的类似结论是把$f'$换成梯度。

::: theorem 曲线积分基本定理 {#thm-ftli}
设$f$是某个开集上的$C^1$函数，该开集包含一条从$A$出发、到$B$终止的分段光滑曲线$C$。则

$$
\int_C \nabla f\cdot d\mathbf{r} = f(B) - f(A).
$$
:::

::: proof
先设$C$光滑，由$\mathbf{r}\colon[a,b]\to\R^n$参数化，且$\mathbf{r}(a) = A$，$\mathbf{r}(b) = B$。由链式法则（[[multivariable/partial-derivatives#thm-chain-rule]]），函数$g(t) = f(\mathbf{r}(t))$具有连续导数$g'(t) = \nabla f(\mathbf{r}(t))\cdot\mathbf{r}'(t)$。由微积分基本定理，

$$
\int_C\nabla f\cdot d\mathbf{r} = \int_a^b g'(t)\,dt = g(b) - g(a) = f(B) - f(A).
$$

若$C = C_1 + \dots + C_k$分段光滑，$C_i$从$A_{i-1}$走到$A_i$，其中$A_0 = A$，$A_k = B$，则把各段的结果相加，得到一个裂项相消的和$\sum_i\bigl(f(A_i) - f(A_{i-1})\bigr) = f(B) - f(A)$。
:::

由此立即得到两个推论。对梯度场，曲线积分**与路径无关**：对于端点相同的所有曲线，积分都相同。而且沿每条闭曲线都有$\oint_C\nabla f\cdot d\mathbf{r} = 0$，因为这时$A = B$。在[[#ex-three-paths]]中各个答案互不相同，所以$(-y, x)$不是梯度场。

::: example 通过求势函数计算曲线积分 {#ex-potential-2d}
计算$\int_C 2xy\,dx + (x^2 + 3y^2)\,dy$，其中$C$是从$(0,0)$到$(1,2)$的任意一条分段光滑曲线。
::: solution
我们寻找满足$f_x = 2xy$和$f_y = x^2 + 3y^2$的$f$。函数$f(x,y) = x^2y + y^3$满足要求：$f_x = 2xy$，$f_y = x^2 + 3y^2$。由[[#thm-ftli]]，

$$
\int_C 2xy\,dx + (x^2+3y^2)\,dy = f(1,2) - f(0,0) = 2 + 8 = 10,
$$

不论$C$是什么形状——直线段、抛物线，还是一条远远绕出去又绕回来的狂乱螺线。（下面我们将学习如何系统地**求出**$f$。）
:::
:::

::: widget vectorfield
P: (1 - k)*2*x*y - k*y
Q: (1 - k)*x^2 + k*x
cx: t
cy: t + a*sin(pi*t)
t: 0, 1
x: -1, 2
y: -1, 2
sliders: a=0.5:-1:1:0.05; k=0:0:1:1
caption: 从$(0,0)$到$(1,1)$的路径$\mathbf{r}(t) = (t,\; t + a\sin \pi t)$。当$k = 0$时，场为$\nabla(x^2y)$：用$a$使路径弯曲，功始终恰好等于$1 = f(1,1) - f(0,0)$。切换到$k = 1$，即旋转场$(-y, x)$：此时功为$-4a/\pi$，路径每弯曲一下，功都随之改变。
:::

::: quiz
$f$是$\R^3$上的$C^1$函数，$C$是一条分段光滑的闭曲线。$\oint_C\nabla f\cdot d\mathbf{r}$等于什么？
- [ ] 它依赖于$C$的形状
- [ ] 它等于$C$的长度乘以$\norm{\nabla f}$的平均值
- [x] $0$
- [ ] $f$在起点处的值
::: solution
由[[#thm-ftli]]，积分等于$f(B) - f(A)$，而对闭曲线而言，终点$B$就是起点$A$。所以梯度场沿任何闭曲线的环量都为零。
:::
:::

::: application 势能与能量守恒
形如$\mathbf{F} = -\nabla U$的力场称为**保守**力场，$U$称为它的**势能**。前面的引力场就具有这种形式，其中$U(\mathbf{r}) = -GMm/\norm{\mathbf{r}}$，因为$\nabla(1/\norm{\mathbf{r}}) = -\mathbf{r}/\norm{\mathbf{r}}^3$。由[[#thm-ftli]]，物体从$A$运动到$B$时，引力对它所做的功为$U(A) - U(B)$，与路线无关。还有更强的结论。若质量为$m$的质点按牛顿（Newton）定律$m\mathbf{r}'' = \mathbf{F}(\mathbf{r}) = -\nabla U(\mathbf{r})$运动，则**总能量**$E = \tfrac12m\norm{\mathbf{r}'}^2 + U(\mathbf{r})$保持不变，因为

$$
\frac{dE}{dt} = m\,\mathbf{r}'\cdot\mathbf{r}'' + \nabla U(\mathbf{r})\cdot\mathbf{r}' = \mathbf{r}'\cdot\bigl(m\mathbf{r}'' + \nabla U(\mathbf{r})\bigr) = 0 .
$$

例如，从质量为$M$、半径为$R$的行星表面发射的火箭，只有当$E \ge 0$，即$\tfrac12mv^2 \ge GMm/R$时，才能逃逸到无穷远处（那里$U \to 0$）：**逃逸速度**为$\sqrt{2GM/R}$，对地球而言约为$11.2$ km/s，与火箭的发射方向无关。
:::

## 保守场与势函数

我们已经看到，梯度场的曲线积分与路径无关。其逆命题才是问题的核心。

::: definition 保守场 {#def-conservative}
若开集$D$上的向量场$\mathbf{F}$对某个$C^1$函数$f\colon D\to\R$满足$\mathbf{F} = \nabla f$，就称$\mathbf{F}$是**保守**的，并称$f$为$\mathbf{F}$的一个**势函数**。如果对$D$中任意两条起点相同、终点也相同的分段光滑曲线$C_1, C_2$，都有$\int_{C_1}\mathbf{F}\cdot d\mathbf{r} = \int_{C_2}\mathbf{F}\cdot d\mathbf{r}$，就称$\mathbf{F}$的曲线积分在$D$中**与路径无关**。
:::

（物理学家像上面那样加一个负号，写成$\mathbf{F} = -\nabla U$；这在数学上没有任何区别。）我们需要关于开集的一个事实：如果开集$D$中任意两点都能用$D$中的一条路径连接起来，就称$D$是**连通**的；这时这两点甚至可以用一条由有限条平行于坐标轴的线段组成的折线连接起来（见[[topology/connectedness]]）。

::: theorem 与路径无关 {#thm-path-independence}
设$\mathbf{F}$是连通开集$D\subseteq\R^n$上的连续向量场。下列条件等价：

1. $\mathbf{F}$在$D$上是保守的；
2. $\mathbf{F}$的曲线积分在$D$中与路径无关；
3. 对$D$中每条分段光滑闭曲线$C$，都有$\oint_C\mathbf{F}\cdot d\mathbf{r} = 0$。

此外，$\mathbf{F}$在$D$上的任意两个势函数只相差一个常数。
:::

::: proof
(1) ⇒ (2) 就是[[#thm-ftli]]。

(2) ⇒ (3)：设$C$是起点和终点都为$A$的闭曲线。在另一点$B$处把它分成从$A$到$B$的$C_1$和从$B$回到$A$的$C_2$。于是$C_1$和$-C_2$都从$A$走到$B$，所以由(2)和[[#thm-orientation]]，$\oint_C = \int_{C_1} + \int_{C_2} = \int_{C_1} - \int_{-C_2} = 0$。

(3) ⇒ (2)：若$C_1$和$C_2$都从$A$走到$B$，则$C_1 + (-C_2)$是闭曲线，所以$0 = \int_{C_1} - \int_{C_2}$。

(2) ⇒ (1)：固定一点$\mathbf{a}\in D$，定义

$$
f(\mathbf{x}) = \int_{C_{\mathbf{x}}}\mathbf{F}\cdot d\mathbf{r},
$$

其中$C_{\mathbf{x}}$是$D$中从$\mathbf{a}$到$\mathbf{x}$的任意一条分段光滑曲线。由于$D$连通，这样的曲线存在；由(2)，积分值与曲线的选取无关。下面证明$\pdv{f}{x_1} = F_1$；其他分量的证明完全相同。由于$D$是开集，存在球$B(\mathbf{x}, \rho)\subseteq D$。当$0 < \abs{h} < \rho$时，先走$C_{\mathbf{x}}$、再走线段$\mathbf{r}(s) = \mathbf{x} + s\mathbf{e}_1$（$s$从$0$到$h$），就得到一条从$\mathbf{a}$到$\mathbf{x} + h\mathbf{e}_1$的曲线，而这条线段始终位于球内。沿这条线段，$\mathbf{F}\cdot\mathbf{r}'(s) = F_1(\mathbf{x} + s\mathbf{e}_1)$，所以

$$
\frac{f(\mathbf{x} + h\mathbf{e}_1) - f(\mathbf{x})}{h} = \frac1h\int_0^h F_1(\mathbf{x} + s\mathbf{e}_1)\,ds \longrightarrow F_1(\mathbf{x}) \quad (h\to0),
$$

这里用到了微积分基本定理，因为$s\mapsto F_1(\mathbf{x}+s\mathbf{e}_1)$连续。因此$\nabla f = \mathbf{F}$；又因为$\mathbf{F}$连续，所以$f$是$C^1$的。

最后，若$\nabla f = \nabla g = \mathbf{F}$，则在连通开集$D$上$\nabla(f - g) = \mathbf{0}$，所以$f - g$是常数（[[multivariable/gradient#cor-constant]]及其后的注记）。
:::

这个证明是构造性的——势函数就是“从基点走到$\mathbf{x}$所做的功”——但它的前提是我们已经知道曲线积分与路径无关。我们需要一个可以通过求导来验证的判别法。

::: theorem 一个必要条件 {#thm-curl-test}
设$\mathbf{F} = (P, Q)$是开集$D\subseteq\R^2$上的$C^1$保守场。则

$$
\pdv{P}{y} = \pdv{Q}{x} \quad\text{于 } D .
$$

类似地，若$\mathbf{F} = (P, Q, R)$是$\R^3$中某个开集上的$C^1$保守场，则$P_y = Q_x$，$P_z = R_x$，$Q_z = R_y$。
:::

::: proof
设$\mathbf{F} = \nabla f$。则$f_x = P$和$f_y = Q$都是$C^1$的，所以$f$是$C^2$的，由克莱罗（Clairaut）定理（[[multivariable/partial-derivatives#thm-clairaut]]），$P_y = f_{xy} = f_{yx} = Q_x$。三维情形的结论只需对每一对变量运用同样的论证。
:::

所以$\mathbf{F} = (-y, x)$不可能是保守场，因为$P_y = -1 \ne 1 = Q_x$。真正的问题是：这个条件是否也是**充分**的？下面的例子表明，答案取决于定义域的形状。

::: example 涡旋场 {#ex-vortex}
在去心平面$D = \R^2\setminus\set{\mathbf{0}}$上令$\mathbf{F}(x,y) = \left(\dfrac{-y}{x^2+y^2},\; \dfrac{x}{x^2+y^2}\right)$。证明在$D$上$P_y = Q_x$，但$\mathbf{F}$在$D$上不是保守场。
::: solution
由商的求导法则，

$$
\pdv{P}{y} = \frac{-(x^2+y^2) + 2y^2}{(x^2+y^2)^2} = \frac{y^2 - x^2}{(x^2+y^2)^2}, \qquad \pdv{Q}{x} = \frac{(x^2+y^2) - 2x^2}{(x^2+y^2)^2} = \frac{y^2 - x^2}{(x^2+y^2)^2},
$$

所以[[#thm-curl-test]]中的必要条件在$D$中处处成立。但沿单位圆$\mathbf{r}(t) = (\cos t, \sin t)$，$0\le t\le 2\pi$，有$\mathbf{F}(\mathbf{r}(t)) = (-\sin t, \cos t)$，$\mathbf{r}'(t) = (-\sin t, \cos t)$，所以

$$
\oint_C\mathbf{F}\cdot d\mathbf{r} = \int_0^{2\pi}\bigl(\sin^2t + \cos^2t\bigr)\,dt = 2\pi \ne 0 .
$$

由[[#thm-path-independence]]，$\mathbf{F}$在$D$上不是保守场。

这是怎么回事？在负$x$轴以外，$\mathbf{F}$是极角$\theta(x,y)$的梯度：例如在右半平面上$\theta = \arctan(y/x)$，而$\nabla\theta = \left(\frac{-y}{x^2+y^2}, \frac{x}{x^2+y^2}\right)$。所以$\int_C\mathbf{F}\cdot d\mathbf{r}$度量的是沿$C$角度的总变化量。绕原点走一圈，角度增加$2\pi$，又回到“同一个”方向，所以在整个$D$上不存在单值连续函数$\theta$。正是原点处的这个洞破坏了势函数的存在。
:::
:::

::: widget vectorfield
P: -y/(x^2 + y^2)
Q: x/(x^2 + y^2)
cx: c + r*cos(t)
cy: r*sin(t)
t: 0, 2pi
x: -3, 3
y: -3, 3
sliders: c=0:-2:2:0.1; r=1:0.3:2:0.1
caption: [[#ex-vortex]]中的涡旋场，以及以$(c, 0)$为圆心、半径为$r$的圆。只要圆包围着原点，无论怎样移动或缩放，环量都恰好是$2\pi$；一旦原点落在圆外，环量就降为$0$。（当圆经过原点时，积分没有定义。）对包含原点的圆盘，格林（Green）公式不能直接应用，因为$\mathbf{F}$在原点处没有定义——这就是图中$\iint_D\curl\mathbf{F}\,dA$的估计值与环量不符的原因；但解释这一跳变正是格林公式最早的应用之一。
:::

::: warning 仅凭 P_y = Q_x 还不够
验证$P_y = Q_x$**并不能**证明一个场是保守场：涡旋场在$\R^2\setminus\set{\mathbf{0}}$上通过了这个检验，却不是那里的保守场。只有当定义域没有洞时——例如整个平面、圆盘或半平面，如下一个定理所示——这个检验才能证明场是保守的。务必弄清定义域是什么。
:::

::: theorem 星形集上的充分性 {#thm-star-shaped}
设开集$D\subseteq\R^2$关于原点是**星形**的：只要$\mathbf{x}\in D$，从$\mathbf{0}$到$\mathbf{x}$的整条线段就都在$D$中（包含$\mathbf{0}$的凸集以及$\R^2$本身都是这样的例子）。若$\mathbf{F} = (P, Q)$在$D$上是$C^1$的，且在$D$上$P_y = Q_x$，则$\mathbf{F}$在$D$上是保守场，其势函数为

$$
f(x, y) = \int_0^1\bigl(x\,P(tx, ty) + y\,Q(tx, ty)\bigr)\,dt .
$$ {#eq-star-potential}
:::

::: proof
这个公式就是$\mathbf{F}$沿线段$\mathbf{r}(t) = t\mathbf{x}$，$0\le t\le1$的曲线积分，而这条线段位于$D$中。由于被积函数及其关于$x$和$y$的偏导数都连续，可以在积分号下求导（这是分析学中的一个标准结果）：

$$
\pdv{f}{x} = \int_0^1\Bigl(P(tx,ty) + tx\,P_x(tx,ty) + ty\,Q_x(tx,ty)\Bigr)\,dt .
$$

现在在最后一项中利用假设$Q_x = P_y$：

$$
\pdv{f}{x} = \int_0^1\Bigl(P(tx,ty) + t\bigl(x\,P_x(tx,ty) + y\,P_y(tx,ty)\bigr)\Bigr)\,dt = \int_0^1\frac{d}{dt}\Bigl(t\,P(tx,ty)\Bigr)\,dt = P(x,y),
$$

这是因为由乘积法则和链式法则，$\frac{d}{dt}\bigl(tP(tx,ty)\bigr) = P(tx,ty) + t\bigl(xP_x + yP_y\bigr)(tx,ty)$。同理$\pdv{f}{y} = Q(x,y)$。所以$\nabla f = \mathbf{F}$。
:::

同样的证明在$\R^3$中也适用，只需用[[#thm-curl-test]]中的三个条件（[[#exr-star-3d]]）。星形集没有洞；在[[multivariable/greens-theorem]]一章中，我们将利用格林公式把这个定理推广到平面上的每个**单连通**区域。去心平面不是单连通的，而涡旋场正说明了这一推广为什么不能再往前推进。

### 实际中如何求势函数

在实际中，我们通过逐个变量积分来求势函数。

::: example 三维空间中的势函数 {#ex-find-potential}
证明$\mathbf{F} = (y^2 + 2xz,\; 2xy + z,\; x^2 + y)$是$\R^3$上的保守场，求出一个势函数，并沿从$(0,0,0)$到$(1,2,3)$的任意曲线计算$\int_C\mathbf{F}\cdot d\mathbf{r}$。
::: solution
*检验*。$P_y = 2y = Q_x$，$P_z = 2x = R_x$，$Q_z = 1 = R_y$。由于$\R^3$是星形的，$\mathbf{F}$是保守场。

*势函数*。我们需要$f_x = y^2 + 2xz$。固定$y$和$z$，对$x$积分，得

$$
f(x,y,z) = xy^2 + x^2z + g(y, z),
$$

其中“积分常数”$g$可以依赖于$y$和$z$。接着，$f_y = 2xy + g_y$必须等于$2xy + z$，所以$g_y = z$，$g = yz + h(z)$。最后，$f_z = x^2 + y + h'(z)$必须等于$x^2 + y$，所以$h' = 0$，$h$是常数，我们取它为$0$。于是

$$
f(x,y,z) = xy^2 + x^2z + yz .
$$

*积分*。由[[#thm-ftli]]，$\int_C\mathbf{F}\cdot d\mathbf{r} = f(1,2,3) - f(0,0,0) = 4 + 3 + 6 = 13$。
:::
:::

::: warning 不要简单地把各个积分相加
一个诱人的捷径是把$P$对$x$积分、$Q$对$y$积分、$R$对$z$积分，再把三个结果相加。对上面的场，这样得到$(xy^2 + x^2z) + (xy^2 + yz) + (x^2z + yz)$，其中$xy^2$、$x^2z$和$yz$各项都被算了两次，它的梯度也不是$\mathbf{F}$。后面的每一次积分只确定$f$中前面的积分看不到的那一部分；务必对求得的候选函数求导加以验证。
:::

::: quiz
考虑[[#ex-vortex]]中的涡旋场$\mathbf{F}$。下列哪个说法是正确的？
- [ ] $\mathbf{F}$在$\R^2\setminus\set{\mathbf{0}}$上是保守场，因为在那里$P_y = Q_x$
- [x] $\mathbf{F}$在右半平面$x > 0$上是保守场，但在$\R^2\setminus\set{\mathbf{0}}$上不是
- [ ] $\mathbf{F}$在任何开集上都不是保守场，因为它沿单位圆的环量为$2\pi$
- [ ] $\mathbf{F}$在任何包含单位圆的集合上都不是保守场，但它沿每条闭曲线的环量都是$2\pi$
::: solution
半平面$x > 0$是凸集，在其上检验$P_y = Q_x$就足够了（[[#thm-star-shaped]]，先作平移使基点落在其内部），事实上那里$\mathbf{F} = \nabla\arctan(y/x)$。在去心平面上，沿单位圆的环量为$2\pi \ne 0$，所以$\mathbf{F}$在那里不是保守场。沿不绕原点的闭曲线，环量为$0$，而不是$2\pi$。
:::
:::

::: history
力可以由单个函数导出，这一思想可以追溯到约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）：他在1773年注意到，一个物体的引力的各个分量是同一个函数的偏导数。乔治·格林（George Green）在他1828年的《论文》（*Essay*）中把这样的函数命名为“势函数”；卡尔·弗里德里希·高斯（Carl Friedrich Gauss）在1840年论述平方反比力时，使“势”成为一个标准术语。用“功”这个词表示力乘以距离，是加斯帕尔-古斯塔夫·科里奥利（Gaspard-Gustave Coriolis）在1829年关于机器效应的著作中引入的。曲线积分作为一种数学工具，同时也在复分析中发展起来：1825年，奥古斯丁-路易·柯西（Augustin-Louis Cauchy）研究了复函数沿平面上路径的积分，并提出了这些积分何时只依赖于端点的问题——本章正是对向量场回答了这个问题，而它的答案同样取决于定义域中的洞。
:::

## 后续内容

涡旋场表明，“$P_y = Q_x$”能否推出“保守”，是一个关于定义域形状的问题。[[multivariable/greens-theorem]]一章在平面上解决了这个问题：量$Q_x - P_y$（标量旋度）度量单位面积上的环量，它在一个区域上的积分等于沿边界的环量。在三维空间中，[[#thm-curl-test]]中的条件是说旋度$\nabla\times\mathbf{F}$为零，而斯托克斯（Stokes）公式（[[multivariable/stokes-divergence]]）扮演着格林公式的角色。在复分析中，解析函数的曲线积分在单连通区域上与路径无关（柯西定理，[[complex-analysis/cauchy-theorem]]），而涡旋场又以$1/z$的积分的形式重新出现，这个积分计算的是曲线绕原点的圈数（[[complex-analysis/contour-integrals]]）。这种计数正是代数拓扑的出发点（[[topology/fundamental-group]]）。

::: summary
- 向量场给每一点指定一个向量；流线满足$\mathbf{r}' = \mathbf{F}(\mathbf{r})$（[[#def-vector-field]]）。
- $\int_C f\,ds = \int_a^b f(\mathbf{r}(t))\norm{\mathbf{r}'(t)}\,dt$沿$C$累加$f$（质量、平均值、长度）；它与参数化和定向都无关（[[#def-scalar-line-integral]]）。
- $\int_C\mathbf{F}\cdot d\mathbf{r} = \int_a^b\mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,dt = \int_C\mathbf{F}\cdot\mathbf{T}\,ds$是$\mathbf{F}$沿$C$所做的功；定向反转时它改变符号（[[#def-line-integral]]）。
- 基本定理：$\int_C\nabla f\cdot d\mathbf{r} = f(B) - f(A)$（[[#thm-ftli]]）。
- 在连通开集上：保守 ⇔ 与路径无关 ⇔ 沿每条闭曲线的环量为零；势函数在相差一个常数的意义下唯一（[[#thm-path-independence]]）。
- $C^1$保守场满足$P_y = Q_x$（在三维中：满足全部三个交叉偏导数条件）。逆命题在星形集上成立，但在去心平面上不成立，涡旋场就是例证（[[#ex-vortex]]）。
- 求势函数时，先对一个分量积分，再通过求导并与其他分量比较来确定那个“常数”。
:::

## 习题

::: exercise 沿线段积分 {level=1 check="35/2"}
计算$\int_C (x + y)\,ds$，其中$C$是从$(0,0)$到$(3,4)$的线段。
::: solution
取$\mathbf{r}(t) = (3t, 4t)$，$0\le t\le1$，则$\norm{\mathbf{r}'(t)} = 5$，$x + y = 7t$，所以$\int_C(x+y)\,ds = \int_0^1 7t\cdot5\,dt = \tfrac{35}{2}$。
:::
:::

::: exercise 沿抛物线所做的功 {level=1 check="-1/3"}
沿抛物线$y = x^2$从$(0,0)$到$(1,1)$计算$\int_C y\,dx - x\,dy$。
::: solution
取参数化$\mathbf{r}(t) = (t, t^2)$，$0\le t\le 1$，则$dx = dt$，$dy = 2t\,dt$。积分为$\int_0^1\bigl(t^2 - t\cdot2t\bigr)\,dt = \int_0^1(-t^2)\,dt = -\tfrac13$。
:::
:::

::: exercise 与路径无关的积分 {level=1 check="13"}
沿从$(1,2)$到$(3,5)$的任意分段光滑曲线计算$\int_C y\,dx + x\,dy$。
::: solution
$(y, x) = \nabla(xy)$，所以由[[#thm-ftli]]，积分为$3\cdot5 - 1\cdot2 = 13$。
:::
:::

::: exercise 先检验，再积分 {level=2 check="1 + e"}
证明$\mathbf{F} = (3x^2y + y,\; x^3 + x + e^y)$是$\R^2$上的保守场，并沿曲线$\mathbf{r}(t) = \bigl(t, \sin(\pi t/2)\bigr)$，$0\le t\le1$计算$\int_C\mathbf{F}\cdot d\mathbf{r}$。
::: solution
在整个平面上$P_y = 3x^2 + 1 = Q_x$，而整个平面是星形的，所以$\mathbf{F}$是保守场。把$P$对$x$积分：$f = x^3y + xy + g(y)$；再由$f_y = x^3 + x + g'(y) = x^3 + x + e^y$得$g = e^y$。所以$f = x^3y + xy + e^y$。曲线从$(0,0)$走到$(1,1)$，所以积分为$f(1,1) - f(0,0) = (1 + 1 + e) - 1 = 1 + e$。
:::
:::

::: exercise 一根沉重的弹簧 {level=2 check="sqrt(5)*(8*pi + 8*pi^3/3)"}
一根金属丝沿螺旋线$\mathbf{r}(t) = (2\cos t, 2\sin t, t)$，$0\le t\le 2\pi$放置，密度为$\delta(x,y,z) = x^2 + y^2 + z^2$，求它的质量。
::: solution
$\norm{\mathbf{r}'(t)} = \sqrt{4\sin^2t + 4\cos^2t + 1} = \sqrt5$，$\delta(\mathbf{r}(t)) = 4 + t^2$。所以

$$
m = \int_0^{2\pi}(4 + t^2)\sqrt5\,dt = \sqrt5\left(8\pi + \frac{8\pi^3}{3}\right) \approx 241.1 .
$$
:::
:::

::: exercise 旋转场的环量 {level=2 check="18*pi"}
计算$\mathbf{F} = (-y, x)$沿以原点为圆心、半径为$3$的逆时针圆周的环量$\oint_C\mathbf{F}\cdot d\mathbf{r}$，并与圆盘的面积作比较。
::: solution
取$\mathbf{r}(t) = (3\cos t, 3\sin t)$：$\mathbf{F}\cdot\mathbf{r}' = (-3\sin t)(-3\sin t) + (3\cos t)(3\cos t) = 9$，所以环量为$\int_0^{2\pi}9\,dt = 18\pi$——恰好是面积$9\pi$的两倍。格林公式解释了其中的原因：处处有$Q_x - P_y = 2$。
:::
:::

::: exercise 一个径向场 {level=2}
证明$\mathbf{G}(x,y) = \left(\dfrac{x}{x^2+y^2}, \dfrac{y}{x^2+y^2}\right)$在$\R^2\setminus\set{\mathbf{0}}$上是保守场，尽管这个集合不是星形的。沿单位圆的$\oint_C\mathbf{G}\cdot d\mathbf{r}$等于多少？
::: solution
$f(x,y) = \tfrac12\ln(x^2+y^2)$在去心平面上是$C^1$的，且$f_x = \dfrac{x}{x^2+y^2}$，$f_y = \dfrac{y}{x^2+y^2}$。所以$\mathbf{G} = \nabla f$是保守场，它的每个环量都为$0$；特别地，沿单位圆有$\oint_C\mathbf{G}\cdot d\mathbf{r} = 0$（也可以直接看出：$\mathbf{G}$是径向的，因而与圆周垂直）。定义域中的洞使得**检验**$P_y = Q_x$不能保证势函数存在，但势函数仍然可能存在。
:::
:::

::: exercise 作为势函数的角度函数 {level=3}
设$D$是去掉原点和负$x$轴后的平面，$\theta\colon D\to(-\pi,\pi)$是极角。证明$\theta$是涡旋场在$D$上的一个$C^1$势函数。由此推出：涡旋场沿$D$中任意闭曲线的环量为$0$，并且对$D$中从$A$到$B$的任意曲线，都有$\int_C\mathbf{F}\cdot d\mathbf{r} = \theta(B) - \theta(A)$。
::: hint
在$D$上，角度可以写成$\theta = 2\arctan\dfrac{y}{x + \sqrt{x^2+y^2}}$。
:::
::: solution
对$(x,y)\in D$有$x + \sqrt{x^2+y^2} > 0$（它仅当$y = 0$且$x\le0$时为零），所以$\theta = 2\arctan\frac{y}{x+\sqrt{x^2+y^2}}$在$D$上是$C^1$的。由半角公式$\tan(\theta/2) = \frac{\sin\theta}{1+\cos\theta} = \frac{y}{r + x}$，其中$\theta/2\in(-\pi/2,\pi/2)$，可知这个公式给出的正是极角。对$x = r\cos\theta$，$y = r\sin\theta$作隐函数求导（或直接对该公式求导），得$\theta_x = -y/(x^2+y^2)$，$\theta_y = x/(x^2+y^2)$，所以在$D$上$\nabla\theta = \mathbf{F}$。由[[#thm-ftli]]，对$D$中的曲线有$\int_C\mathbf{F}\cdot d\mathbf{r} = \theta(B) - \theta(A)$，当$C$是闭曲线时它等于$0$。绕原点的闭曲线必定穿过负$x$轴，因而不在$D$中——这与沿单位圆的环量为$2\pi$并不矛盾。
:::
:::

::: exercise 涡旋场沿椭圆的环量 {level=3 check="2*pi"}
计算涡旋场沿椭圆$\mathbf{r}(t) = (2\cos t, \sin t)$，$0\le t\le2\pi$的环量。
::: hint
可以在$[0, 2\pi]$上对$\dfrac{2}{4\cos^2t + \sin^2t}$积分（在每个四分之一区间上作代换$u = \tan t$），也可以利用“该积分是极角的总变化量”这一解释。
:::
::: solution
$\mathbf{F}(\mathbf{r}(t)) = \dfrac{(-\sin t, 2\cos t)}{4\cos^2t + \sin^2t}$，$\mathbf{r}'(t) = (-2\sin t, \cos t)$，所以被积函数为$\dfrac{2\sin^2t + 2\cos^2t}{4\cos^2t + \sin^2t} = \dfrac{2}{4\cos^2t + \sin^2t}$。在$(-\pi/2, \pi/2)$上作代换$u = \tan t$：$\int\frac{2\,dt}{4\cos^2t + \sin^2t} = \int\frac{2\sec^2t\,dt}{4 + \tan^2t} = \int\frac{2\,du}{4 + u^2} = \arctan\frac u2$，当$u$取遍$\R$时，它增加$\pi$。由周期性，另一半的结果相同，所以环量为$2\pi$。从几何上看：沿椭圆走一圈，极角恰好增加一整圈$2\pi$，与圆的情形一样。
:::
:::

::: exercise 空间中的星形集定理 {#exr-star-3d level=3}
设$\mathbf{F} = (P, Q, R)$在$\R^3$上是$C^1$的，且$P_y = Q_x$，$P_z = R_x$，$Q_z = R_y$。证明$f(\mathbf{x}) = \int_0^1\mathbf{F}(t\mathbf{x})\cdot\mathbf{x}\,dt$是$\mathbf{F}$的一个势函数。
::: solution
记$\mathbf{x} = (x,y,z)$，并约定$P, Q, R$及其导数都在$t\mathbf{x}$处取值。在积分号下求导，得

$$
\pdv{f}{x} = \int_0^1\Bigl(P + t\bigl(xP_x + yQ_x + zR_x\bigr)\Bigr)\,dt = \int_0^1\Bigl(P + t\bigl(xP_x + yP_y + zP_z\bigr)\Bigr)\,dt,
$$

这里用到了$Q_x = P_y$和$R_x = P_z$。由链式法则，$\frac{d}{dt}P(t\mathbf{x}) = xP_x + yP_y + zP_z$（在$t\mathbf{x}$处取值），所以被积函数等于$\frac{d}{dt}\bigl(tP(t\mathbf{x})\bigr)$，从而$\pdv{f}{x} = 1\cdot P(\mathbf{x}) - 0 = P(\mathbf{x})$。同样的计算，先利用$P_y = Q_x$，$R_y = Q_z$，再利用$P_z = R_x$，$Q_z = R_y$，即得$f_y = Q$和$f_z = R$。
:::
:::
