旋转楼梯、一条DNA链、过山车的轨道，以及带电粒子在磁场中的运动路径，都在空间中描出曲线，而我们可以描述其中每一条曲线如何弯曲和扭转。光滑曲线在每一点都有一个方向；**曲率**度量这个方向转动得有多快，**挠率**则度量曲线扭离它此刻正在其中弯曲的那个平面有多快。本章的主要定理表明，这两个以弧长为自变量的函数构成了完全的描述：曲率和挠率都相同的两条曲线只相差空间的一个刚体运动。对曲线而言，形状恰好就是曲率加上挠率。

在[[multivariable/vector-functions]]一章中，我们把弧长和曲率$\kappa = \norm{\mathbf{r}'\times\mathbf{r}''}/\norm{\mathbf{r}'}^3$作为描述运动的工具。这里我们采取几何的观点：追问哪些性质属于曲线本身，而不属于它的参数化方式；引入平面曲线的**有向曲率**和空间曲线的**弗勒内（Frenet）标架**；证明**弗勒内-塞雷（Frenet–Serret）公式**，并用它们来证明一些定理——挠率为零的曲线是平面曲线，曲率和挠率决定一条曲线，习题中还有更多结论。本章中，**光滑**始终指无穷次可微；我们要用到[[multivariable/vectors-geometry]]一章中$\R^3$的线性代数。

## 参数曲线与正则性

::: definition 参数曲线与正则曲线 {#def-regular-curve}
**参数曲线**是从开区间$I\subseteq\R$到$\R^n$的光滑映射$\boldsymbol\gamma\colon I\to\R^n$，其中$n = 2$（**平面曲线**）或$n = 3$（**空间曲线**）。它的像$\boldsymbol\gamma(I)$称为曲线的**迹**。如果曲线的速度处处不为零，即对所有$t\in I$有$\boldsymbol\gamma'(t) \ne \mathbf{0}$，就称曲线是**正则**的。如果对所有$t$有$\norm{\boldsymbol\gamma'(t)} = 1$，就称曲线是**单位速率**的。
:::

曲线是一个**映射**，而不是一个集合：绕一圈的圆和绕两圈的圆有相同的迹，却是不同的曲线。正则性是对映射提出的条件，它恰好是保证曲线在每一点都有明确定义的切线$\boldsymbol\gamma(t) + \lambda\boldsymbol\gamma'(t)$所需要的条件。

$a > 0$的螺旋线$\boldsymbol\gamma(t) = (a\cos t, a\sin t, bt)$是正则的，因为$\norm{\boldsymbol\gamma'(t)} = \sqrt{a^2 + b^2} > 0$。**半立方抛物线**$\boldsymbol\gamma(t) = (t^2, t^3)$是光滑的，但不是正则的：$\boldsymbol\gamma'(0) = \mathbf{0}$，而且它的迹在原点处有一个尖点。不过，非正则性并不总会在迹上表现出来——$(t^3, t^3)$是一条完全笔直的直线的非正则参数化。

::: warning 光滑映射也可能有角点
映射$\boldsymbol\gamma$光滑，并不能使它的迹看起来光滑。当$t > 0$时令$\varphi(t) = e^{-1/t}$，当$t\le0$时令$\varphi(t) = 0$；这个函数无穷次可微，并且它的各阶导数在$t = 0$处都为零。曲线$\boldsymbol\gamma(t) = \bigl(\varphi(t) - \varphi(-t),\ \varphi(t) + \varphi(-t)\bigr)$是光滑的，但它的迹在原点附近就是$y = \abs{x}$的图像，连角点也一模一样。曲线在角点处减速直至停下（$\boldsymbol\gamma'(0) = \mathbf{0}$），转向，然后重新出发。正则性恰好就是排除这种情况的假设，从现在起我们总假定它成立。
:::

同一个迹可以用不同的快慢来走过。$\boldsymbol\gamma\colon I\to\R^n$的一个**重新参数化**是指曲线$\tilde{\boldsymbol\gamma} = \boldsymbol\gamma\circ\phi\colon J\to\R^n$，其中$\phi\colon J\to I$是开区间之间的光滑双射，并且它的逆也是光滑的；等价地（由一元函数的反函数定理），$\phi$是处处满足$\phi' \ne 0$的光滑双射。若$\phi' > 0$，就称这个重新参数化**保持定向**，否则称它反转定向。由链式法则，$\tilde{\boldsymbol\gamma}'(u) = \phi'(u)\,\boldsymbol\gamma'(\phi(u))$，所以正则曲线的重新参数化仍是正则的。所谓几何量，就是在重新参数化下不变（或至多改变符号）的量。

最重要的例子是弧长。对正则曲线，$s(t) = \int_{t_0}^t\norm{\boldsymbol\gamma'(u)}\,du$是曲线从$\boldsymbol\gamma(t_0)$到$\boldsymbol\gamma(t)$的长度（见[[multivariable/vector-functions#def-arc-length]]，那里还证明了长度与参数化无关）。

::: proposition 单位速率重新参数化 {#prop-unit-speed}
参数曲线具有单位速率的重新参数化，当且仅当它是正则的。若$\boldsymbol\gamma$正则，则弧长函数$s$是一个保持定向的参数变换，并且$\boldsymbol\gamma$的任意两个单位速率重新参数化$\tilde{\boldsymbol\gamma}$，$\hat{\boldsymbol\gamma}$之间满足关系$\hat{\boldsymbol\gamma}(u) = \tilde{\boldsymbol\gamma}(\pm u + c)$，其中$c$为常数。
:::

::: proof
设$\boldsymbol\gamma$正则。那么$s'(t) = \norm{\boldsymbol\gamma'(t)} = \sqrt{\boldsymbol\gamma'\cdot\boldsymbol\gamma'}$光滑（平方根函数在$(0,\infty)$上光滑）且为正，所以$s$是从$I$到某个开区间$J$上的光滑严格递增双射，它的逆$t = t(s)$光滑，且$t'(s) = 1/s'(t(s))$。曲线$\tilde{\boldsymbol\gamma}(s) = \boldsymbol\gamma(t(s))$满足$\norm{\tilde{\boldsymbol\gamma}'(s)} = \norm{\boldsymbol\gamma'(t)}\,t'(s) = 1$。

反之，若$\tilde{\boldsymbol\gamma} = \boldsymbol\gamma\circ\phi$是单位速率的，则$1 = \norm{\tilde{\boldsymbol\gamma}'(u)} = \abs{\phi'(u)}\,\norm{\boldsymbol\gamma'(\phi(u))}$，所以对每个$u$，$\boldsymbol\gamma'$在$\phi(u)$处都不为零；由于$\phi$是到$I$上的满射，$\boldsymbol\gamma$是正则的。

最后，若$\hat{\boldsymbol\gamma} = \tilde{\boldsymbol\gamma}\circ\psi$，且两条曲线都是单位速率的，则同样的计算给出$\abs{\psi'} = 1$；由于$\psi'$连续且处处不为零，必有$\psi' \equiv 1$或$\psi'\equiv -1$，所以$\psi(u) = \pm u + c$。
:::

因此，正则曲线有一个本质上自然的参数——弧长，它除了起点和方向的选取之外是唯一确定的。我们用$s$表示单位速率参数，并对单位速率曲线建立理论；然后为了计算，再推导对任意正则参数化都成立的公式，因为显式的弧长参数化很少见——对椭圆来说，弧长是一个椭圆积分。

::: example 以弧长为参数的悬链线 {#ex-catenary}
把悬链线$\boldsymbol\gamma(t) = (t, \cosh t)$按从它的最低点量起的弧长重新参数化。
::: solution
$\boldsymbol\gamma'(t) = (1, \sinh t)$的长度为$\sqrt{1 + \sinh^2 t} = \cosh t$，所以$s(t) = \int_0^t\cosh u\,du = \sinh t$，这是一个$\R\to\R$的双射，其逆为$t = \operatorname{arsinh} s$。由于$\cosh(\operatorname{arsinh}s) = \sqrt{1 + s^2}$，

$$
\tilde{\boldsymbol\gamma}(s) = \left(\operatorname{arsinh} s,\ \sqrt{1 + s^2}\right).
$$

验证：$\tilde{\boldsymbol\gamma}'(s) = \left(\dfrac{1}{\sqrt{1+s^2}},\ \dfrac{s}{\sqrt{1+s^2}}\right)$的长度为$1$。我们将在[[#exr-catenary]]中再次讨论这条曲线。
:::
:::

::: quiz
下列参数曲线中哪些是正则的？（选出所有正确的选项。）
- [x] $(\cos t, \sin t)$，$t\in\R$
- [ ] $(t - \sin t,\ 1 - \cos t)$，$t\in\R$（摆线）
- [ ] $(t^3, t^3)$，$t\in\R$
- [x] $(t, t^2, t^3)$，$t\in\R$
::: solution
圆的速率为$1$，扭三次曲线的速度$(1, 2t, 3t^2)\ne\mathbf{0}$。摆线的速度为$(1 - \cos t, \sin t)$，它在$t = 2\pi k$处为零，迹在这些地方有尖点。曲线$(t^3, t^3)$在$t = 0$处速度为零，尽管它的迹是一条直线：正则性是参数化的性质。
:::
:::

## 曲率

对单位速率曲线，$\mathbf{T}(s) = \boldsymbol\gamma'(s)$称为**单位切向量**。它的变化率度量了每走过单位长度，曲线的方向转动得有多快。

::: definition 曲率 {#def-curvature}
单位速率曲线$\boldsymbol\gamma$在$s$处的**曲率**为$\kappa(s) = \norm{\mathbf{T}'(s)} = \norm{\boldsymbol\gamma''(s)}$。正则曲线在一点处的曲率，定义为它的任一单位速率重新参数化在对应点处的曲率；在$\kappa > 0$处，数$1/\kappa$称为**曲率半径**。
:::

这个定义是自洽的：由[[#prop-unit-speed]]，两个单位速率重新参数化相差一个变换$u\mapsto\pm u + c$，它使$\boldsymbol\gamma''$乘上因子$(\pm1)^2 = 1$。半径为$r$的圆$\boldsymbol\gamma(s) = (r\cos(s/r), r\sin(s/r))$满足$\norm{\boldsymbol\gamma''} = 1/r$：小圆弯曲得厉害。此外，曲线的曲率处处为零当且仅当它是一条直线（或直线的一部分），因为对$\boldsymbol\gamma'' \equiv\mathbf{0}$积分得$\boldsymbol\gamma(s) = \mathbf{a} + s\mathbf{b}$。

由于$\mathbf{T}\cdot\mathbf{T} = 1$，求导得$2\,\mathbf{T}'\cdot\mathbf{T} = 0$：向量$\mathbf{T}'$总是垂直于曲线。在平面上，与$\mathbf{T}$垂直的单位向量只有两个，这使我们能够给曲率赋予符号。

## 平面曲线与有向曲率

用$J$表示把平面旋转$+\pi/2$的变换，即$J(a, b) = (-b, a)$。对单位速率平面曲线，**有向单位法向量**$\mathbf{n}_s = J\mathbf{T}$由切向量按逆时针方向旋转得到，并且在每一点$(\mathbf{T}, \mathbf{n}_s)$都是一个正定向的标准正交基。

::: definition 有向曲率 {#def-signed-curvature}
单位速率平面曲线的**有向曲率**（也称相对曲率）$\kappa_s$由下式定义：

$$
\mathbf{T}'(s) = \kappa_s(s)\,\mathbf{n}_s(s).
$$

于是$\abs{\kappa_s} = \kappa$；在曲线向左（逆时针）转弯处$\kappa_s > 0$，在向右转弯处$\kappa_s < 0$。
:::

反转行进方向会改变$\kappa_s$的符号（$\mathbf{T}$和$\mathbf{n}_s$都反向，但$\mathbf{T}'$不变）。有向曲率可以漂亮地解释为转动的速率。

::: proposition 转角 {#prop-turning-angle}
设$\boldsymbol\gamma\colon I\to\R^2$是单位速率曲线。存在光滑函数$\theta\colon I\to\R$，使得对所有$s$有$\mathbf{T}(s) = (\cos\theta(s), \sin\theta(s))$；它在相差$2\pi$的一个常数倍的意义下唯一，并且

$$
\theta'(s) = \kappa_s(s).
$$
:::

::: proof
把$\R^2$与$\C$等同，记$w(s) = T_1(s) + iT_2(s)$，则$\abs{w} = 1$。于是$\bar w\,w' = (T_1T_1' + T_2T_2') + i(T_1T_2' - T_2T_1')$，其实部为$\tfrac12(\abs{w}^2)' = 0$。定义实函数$\omega = T_1T_2' - T_2T_1'$，则$\bar w w' = i\omega$，从而$w' = i\omega w$（两边乘以$w$，并利用$w\bar w = 1$）。取定$s_0\in I$，选取$\theta_0$使$w(s_0) = e^{i\theta_0}$，并令$\theta(s) = \theta_0 + \int_{s_0}^s\omega$。那么$z = w\,e^{-i\theta}$满足$z' = (w' - i\theta' w)e^{-i\theta} = 0$，所以$z\equiv z(s_0) = 1$，$w = e^{i\theta}$，即$\mathbf{T} = (\cos\theta, \sin\theta)$。

求导得$\mathbf{T}' = \theta'(-\sin\theta, \cos\theta) = \theta'\,J\mathbf{T} = \theta'\,\mathbf{n}_s$，所以$\theta' = \kappa_s$。若$\tilde\theta$是另一个连续的角函数，则$(\tilde\theta - \theta)/2\pi$是区间上取整数值的连续函数，由介值定理，它是常数。
:::

所以有向曲率就是切线方向转动的速率，单位是弧度每单位长度。对闭曲线，总转角$\int\kappa_s\,ds = \theta(\text{终点}) - \theta(\text{起点})$是$2\pi$的倍数；霍普夫（Hopf）的旋转指标定理（*Umlaufsatz*，1935）指出，对简单闭曲线，它恰好等于$\pm2\pi$——沿任何一个简单闭环走一圈，你恰好转过一整周。

为了计算，我们需要$\kappa_s$在任意参数化下的表达式。

::: proposition 任意参数化下的有向曲率 {#prop-signed-formula}
若$\boldsymbol\gamma(t) = (x(t), y(t))$是正则平面曲线，则它的有向曲率（相对于$t$增加的定向）为

$$
\kappa_s = \frac{x'y'' - x''y'}{\left(x'^2 + y'^2\right)^{3/2}}.
$$
:::

::: proof
令$v = \norm{\boldsymbol\gamma'} = ds/dt$。则$\boldsymbol\gamma' = v\mathbf{T}$，并且由链式法则和$\kappa_s$的定义，$\boldsymbol\gamma'' = v'\mathbf{T} + v\,\dfrac{d\mathbf{T}}{ds}\,v = v'\mathbf{T} + v^2\kappa_s\mathbf{n}_s$。因此，以$\boldsymbol\gamma', \boldsymbol\gamma''$为列的矩阵的行列式为

$$
x'y'' - x''y' = \det(v\mathbf{T},\ v'\mathbf{T} + v^2\kappa_s\mathbf{n}_s) = v^3\kappa_s\det(\mathbf{T}, \mathbf{n}_s) = v^3\kappa_s,
$$

这是因为$(\mathbf{T}, \mathbf{n}_s)$是正定向的标准正交基。再除以$v^3 = (x'^2 + y'^2)^{3/2}$即可。
:::

对以$x$为参数的函数图像$y = f(x)$，上式给出$\kappa_s = f''/(1 + f'^2)^{3/2}$，它在图像下凸处为正。

::: example 椭圆的曲率 {#ex-ellipse}
求椭圆$\boldsymbol\gamma(t) = (a\cos t, b\sin t)$（$a > b > 0$）的有向曲率，以及曲率最大和最小的点。
::: solution
这里$x' = -a\sin t$，$y' = b\cos t$，$x'' = -a\cos t$，$y'' = -b\sin t$，所以$x'y'' - x''y' = ab\sin^2 t + ab\cos^2 t = ab$，并且

$$
\kappa_s(t) = \frac{ab}{\left(a^2\sin^2t + b^2\cos^2t\right)^{3/2}} > 0 .
$$

椭圆沿逆时针方向走过，所以它总是向左转。分母在$t = 0, \pi$（长轴的端点）处最小，此时$\kappa_s = ab/b^3 = a/b^2$；在$t = \pm\pi/2$（短轴的端点）处最大，此时$\kappa_s = b/a^2$。当$a = 2$，$b = 1$时，曲率的取值范围是从$\tfrac14$到$2$。满足$\kappa_s' = 0$的点称为**顶点**；椭圆恰好有四个顶点。
:::
:::

::: widget curvature
fx: 2cos(t)
fy: sin(t)
t: 0, 2pi
at: 0.5
x: -3.5, 3.5
y: -2.5, 2.5
caption: 椭圆$(2\cos t, \sin t)$及其密切圆：密切圆是以$\boldsymbol\gamma + \frac{1}{\kappa}\mathbf{n}_s$为圆心、半径为$1/\kappa$、与曲线拟合得最好的圆。移动该点：在长轴的端点处，圆的半径为$\tfrac12$（$\kappa = 2$）；在短轴的端点处，半径为$4$（$\kappa = \tfrac14$）。这四个极值点就是顶点；四顶点定理指出，每条简单闭平面曲线至少有四个顶点。
:::

有向曲率完全决定了一条平面曲线。

::: theorem 平面曲线基本定理 {#thm-plane-fundamental}
设$k\colon I\to\R$是开区间上的任一光滑函数。则存在单位速率曲线$\boldsymbol\gamma\colon I\to\R^2$，其有向曲率为$k$。若$\tilde{\boldsymbol\gamma}$是另一条这样的曲线，则存在旋转$R$和向量$\mathbf{b}$，使$\tilde{\boldsymbol\gamma} = R\boldsymbol\gamma + \mathbf{b}$。
:::

::: proof
**存在性。**取定$s_0\in I$，令$\theta(s) = \int_{s_0}^s k(u)\,du$，以及

$$
\boldsymbol\gamma(s) = \left(\int_{s_0}^s\cos\theta(u)\,du,\ \int_{s_0}^s\sin\theta(u)\,du\right).
$$

则$\boldsymbol\gamma' = (\cos\theta, \sin\theta)$的长度为$1$，且$\boldsymbol\gamma'' = \theta'(-\sin\theta, \cos\theta) = k\,J\boldsymbol\gamma'$，所以有向曲率为$k$。

**唯一性。**设$\tilde{\boldsymbol\gamma}$是有向曲率为$k$的单位速率曲线，$\tilde\theta$是它的一个转角函数（[[#prop-turning-angle]]）。则$\tilde\theta' = k = \theta'$，所以$\tilde\theta = \theta + c$，其中$c$为常数。令$R$为转过角度$c$的旋转。则$\tilde{\boldsymbol\gamma}' = (\cos(\theta + c), \sin(\theta + c)) = R\boldsymbol\gamma'$，所以$(\tilde{\boldsymbol\gamma} - R\boldsymbol\gamma)' = \mathbf{0}$，从而$\tilde{\boldsymbol\gamma} - R\boldsymbol\gamma$是一个常向量$\mathbf{b}$。
:::

反射会改变$\kappa_s$的符号，所以这里只出现保持定向的刚体运动。常值函数$k = 1/r$给出$\theta = s/r$和半径为$r$的圆；因此由唯一性，平面上**每一条**曲率为非零常数的曲线都是一段圆弧。

::: application 公路与铁路上的回旋线
火车从直线轨道驶入半径为$r$的圆曲线时，如果曲率从$0$突变为$1/r$，火车就会感到侧向加速度从$0$突变为$v^2/r$。因此工程师会插入一段曲率随距离线性增长的**缓和曲线**：$\kappa_s(s) = cs$。由[[#thm-plane-fundamental]]，这就决定了曲线：$\theta = cs^2/2$，$\boldsymbol\gamma(s) = \left(\int_0^s\cos\tfrac{cu^2}{2}\,du,\ \int_0^s\sin\tfrac{cu^2}{2}\,du\right)$，这就是**回旋线**，也称欧拉螺线，由菲涅耳（Fresnel）积分给出。高速公路的匝道也按同样的方式铺设：以恒定速率沿回旋线行驶时，你以恒定的速率转动方向盘。
:::

::: quiz
一条单位速率平面曲线的转角为$\theta(s) = 3s - s^2$。它在哪里沿顺时针方向转弯？
- [ ] 在$\theta(s) < 0$处
- [x] 在$s > 3/2$处
- [ ] 在$s < 3/2$处
- [ ] 任何地方都不会：转角不可能减小
::: solution
由[[#prop-turning-angle]]，$\kappa_s = \theta' = 3 - 2s$，它恰好在$s > 3/2$时为负。顺时针转弯意味着$\kappa_s < 0$：切向量沿负方向转动。$\theta$本身的值（行进方向）无关紧要；起作用的只是它的变化率。
:::
:::

## 空间曲线与弗勒内标架

在空间中，$\mathbf{T}'$与$\mathbf{T}$垂直，但可以指向无穷多个方向中的任何一个，所以无法给曲率赋予符号。取而代之的是：在$\kappa > 0$处，$\mathbf{T}'$的方向提供了第二个特定的向量，而第三个向量由前两个决定。

::: definition 弗勒内标架与挠率 {#def-torsion}
设$\boldsymbol\gamma$是单位速率空间曲线，且对所有$s$有$\kappa(s) > 0$。它的**主法向量**和**副法向量**分别为

$$
\mathbf{N} = \frac{\mathbf{T}'}{\kappa}, \qquad \mathbf{B} = \mathbf{T}\times\mathbf{N}.
$$

向量$\mathbf{T}, \mathbf{N}, \mathbf{B}$在每一点构成一个正定向的标准正交基，称为**弗勒内标架**。**挠率**$\tau(s)$由下式定义：

$$
\mathbf{B}'(s) = -\tau(s)\,\mathbf{N}(s).
$$
:::

为使挠率的定义有意义，必须验证$\mathbf{B}'$是$\mathbf{N}$的倍数。由于$\mathbf{B}$是单位向量，$\mathbf{B}'\perp\mathbf{B}$。又$\mathbf{B}' = \mathbf{T}'\times\mathbf{N} + \mathbf{T}\times\mathbf{N}' = \kappa\,\mathbf{N}\times\mathbf{N} + \mathbf{T}\times\mathbf{N}' = \mathbf{T}\times\mathbf{N}'$，它与$\mathbf{T}$垂直。既然$\mathbf{B}'$同时垂直于$\mathbf{T}$和$\mathbf{B}$，它就平行于$\mathbf{N}$。由$\mathbf{T}$和$\mathbf{N}$张成的平面称为**密切平面**，即曲线此刻正在其中弯曲的平面；它的法向量是$\mathbf{B}$，而$\abs{\tau} = \norm{\mathbf{B}'}$就是密切平面转动的速率。（$\mathbf{B}' = -\tau\mathbf{N}$中的负号是一种约定，这样选取是为了使右旋螺旋线的挠率为正；有些书采用相反的符号。）

::: theorem 弗勒内-塞雷公式 {#thm-frenet}
对$\kappa > 0$的单位速率曲线，

$$
\mathbf{T}' = \kappa\mathbf{N}, \qquad \mathbf{N}' = -\kappa\mathbf{T} + \tau\mathbf{B}, \qquad \mathbf{B}' = -\tau\mathbf{N};
$$

写成矩阵形式（以标架向量为行），即

$$
\begin{pmatrix}\mathbf{T}\\ \mathbf{N}\\ \mathbf{B}\end{pmatrix}' = \begin{pmatrix} 0 & \kappa & 0\\ -\kappa & 0 & \tau\\ 0 & -\tau & 0\end{pmatrix}\begin{pmatrix}\mathbf{T}\\ \mathbf{N}\\ \mathbf{B}\end{pmatrix}.
$$ {#eq-frenet}
:::

::: proof
第一个和第三个公式就是$\mathbf{N}$和$\tau$的定义。对于第二个公式，写出$\mathbf{N} = \mathbf{B}\times\mathbf{T}$（这对任何正定向的标准正交基都成立）并求导：

$$
\mathbf{N}' = \mathbf{B}'\times\mathbf{T} + \mathbf{B}\times\mathbf{T}' = -\tau\,\mathbf{N}\times\mathbf{T} + \kappa\,\mathbf{B}\times\mathbf{N} = \tau\mathbf{B} - \kappa\mathbf{T},
$$

这里用到了$\mathbf{N}\times\mathbf{T} = -\mathbf{B}$和$\mathbf{B}\times\mathbf{N} = -\mathbf{T}$。
:::

系数矩阵是反对称的，这是必然的：对$\mathbf{T}\cdot\mathbf{N} = 0$等关系式求导可知，标准正交标架的导数用该标架本身表示时，其系数矩阵总是反对称的。

::: intuition 像陀螺一样旋转的标架
带着标架$(\mathbf{T}, \mathbf{N}, \mathbf{B})$以单位速率沿曲线行走。标架的运动是绕**达布（Darboux）向量**$\boldsymbol\omega = \tau\mathbf{T} + \kappa\mathbf{B}$所在轴的瞬时转动：由[[#eq-frenet]]可以直接验证$\mathbf{T}' = \boldsymbol\omega\times\mathbf{T}$，$\mathbf{N}' = \boldsymbol\omega\times\mathbf{N}$，$\mathbf{B}' = \boldsymbol\omega\times\mathbf{B}$。曲率是绕副法向量转动的速率（偏航，即在密切平面内转向），挠率是绕切向量转动的速率（横滚，即扭离密切平面）。平面曲线只有偏航；螺旋线则以恒定的速率既偏航又横滚。
:::

弗勒内公式告诉我们曲线在一点附近是什么样子。对$\boldsymbol\gamma(s_0 + h)$应用泰勒定理，并利用$\boldsymbol\gamma' = \mathbf{T}$，$\boldsymbol\gamma'' = \kappa\mathbf{N}$以及

$$
\boldsymbol\gamma''' = \kappa'\mathbf{N} + \kappa\mathbf{N}' = -\kappa^2\mathbf{T} + \kappa'\mathbf{N} + \kappa\tau\mathbf{B},
$$

就得到下面的结果。

::: proposition 局部标准形式 {#prop-canonical}
对$\kappa(s_0) > 0$的单位速率曲线，记$\kappa, \tau, \mathbf{T}, \mathbf{N}, \mathbf{B}$为它们在$s_0$处的值，则

$$
\boldsymbol\gamma(s_0 + h) - \boldsymbol\gamma(s_0) = \Bigl(h - \frac{\kappa^2h^3}{6}\Bigr)\mathbf{T} + \Bigl(\frac{\kappa h^2}{2} + \frac{\kappa'h^3}{6}\Bigr)\mathbf{N} + \frac{\kappa\tau h^3}{6}\,\mathbf{B} + o(h^3).
$$
:::

::: proof
这就是逐个分量应用的三阶泰勒展开式$\boldsymbol\gamma(s_0 + h) = \boldsymbol\gamma + h\boldsymbol\gamma' + \frac{h^2}{2}\boldsymbol\gamma'' + \frac{h^3}{6}\boldsymbol\gamma''' + o(h^3)$，其中各阶导数如上用弗勒内标架表示。
:::

在$s_0$处的标架中，曲线在密切平面上的投影近似于抛物线$y = \tfrac{\kappa}{2}x^2$，在从切平面（由$\mathbf{T}$和$\mathbf{B}$张成）上的投影近似于三次曲线$z = \tfrac{\kappa\tau}{6}x^3$，在法平面（由$\mathbf{N}$和$\mathbf{B}$张成）上的投影则近似于一个尖点。特别地，若$\tau(s_0) > 0$，曲线从$-\mathbf{B}$一侧穿过密切平面到达$+\mathbf{B}$一侧，像右旋螺钉那样扭转；若$\tau(s_0) < 0$，则方向相反。

::: example 圆柱螺线 {#ex-helix}
计算螺旋线$\boldsymbol\gamma(t) = (a\cos t, a\sin t, bt)$（$a > 0$）的弗勒内标架、曲率和挠率。
::: solution
速率为$c = \sqrt{a^2 + b^2}$，所以$s = ct$，单位速率曲线为$\boldsymbol\gamma(s) = (a\cos\frac sc, a\sin\frac sc, \frac{bs}{c})$。记$t = s/c$，则

$$
\mathbf{T} = \frac1c(-a\sin t,\ a\cos t,\ b), \qquad \mathbf{T}' = -\frac{a}{c^2}(\cos t,\ \sin t,\ 0),
$$

所以$\kappa = \dfrac{a}{a^2 + b^2}$，$\mathbf{N} = (-\cos t, -\sin t, 0)$，它水平地指向螺旋线的轴。于是

$$
\mathbf{B} = \mathbf{T}\times\mathbf{N} = \frac1c(b\sin t,\ -b\cos t,\ a), \qquad \mathbf{B}' = \frac{b}{c^2}(\cos t,\ \sin t,\ 0) = -\frac{b}{a^2+b^2}\,\mathbf{N},
$$

所以$\tau = \dfrac{b}{a^2 + b^2}$。两者都是常数。当$b > 0$时，螺旋线是右旋的（就像普通的螺钉），且$\tau > 0$；把$b$换成$-b$就得到它的镜像，即$\tau < 0$的左旋螺旋线。当$b\to0$时，螺旋线压扁成曲率为$1/a$的圆；当$a\to0$时，它伸直成一条直线。
:::
:::

::: widget frenet
fx: cos(t)
fy: sin(t)
fz: b*t
t: 0, 4pi
sliders: b=0.3:-1:1:0.05
caption: 螺旋线$(\cos t, \sin t, bt)$及其活动标架$\mathbf{T}, \mathbf{N}, \mathbf{B}$。主法向量总是径直指向轴。调节$b$：曲率$1/(1+b^2)$和挠率$b/(1+b^2)$沿曲线保持不变；挠率在$b = 1$时最大，在$b = 0$时为零（此时是圆，副法向量为常向量），并随螺旋线的旋向改变符号。
:::

大多数曲线并不是以弧长为参数给出的，所以我们需要适用于任意正则参数化的公式。曲率公式就是[[multivariable/vector-functions#thm-curvature-formula]]中的那个公式；我们把它和挠率公式一起重新推导一遍。

::: theorem 任意参数化下的曲率与挠率 {#thm-kappa-tau}
设$\boldsymbol\gamma(t)$是正则空间曲线，导数都对$t$求。则

$$
\kappa = \frac{\norm{\boldsymbol\gamma'\times\boldsymbol\gamma''}}{\norm{\boldsymbol\gamma'}^3},
$$

并且在$\boldsymbol\gamma'\times\boldsymbol\gamma''\ne\mathbf{0}$（即$\kappa\ne0$）的地方，

$$
\tau = \frac{(\boldsymbol\gamma'\times\boldsymbol\gamma'')\cdot\boldsymbol\gamma'''}{\norm{\boldsymbol\gamma'\times\boldsymbol\gamma''}^2}.
$$
:::

::: proof
令$v = \norm{\boldsymbol\gamma'} = ds/dt$，则$\boldsymbol\gamma' = v\mathbf{T}$。对$t$求导，并利用$d/dt = v\,d/ds$和弗勒内公式，得

$$
\begin{aligned}
\boldsymbol\gamma'' &= v'\mathbf{T} + v^2\kappa\mathbf{N},\\
\boldsymbol\gamma''' &= v''\mathbf{T} + v'v\kappa\mathbf{N} + (v^2\kappa)'\mathbf{N} + v^3\kappa(-\kappa\mathbf{T} + \tau\mathbf{B}) = (v'' - v^3\kappa^2)\mathbf{T} + (3vv'\kappa + v^2\kappa')\mathbf{N} + v^3\kappa\tau\,\mathbf{B},
\end{aligned}
$$

其中$\kappa' = d\kappa/dt$。（在$\kappa = 0$处只需要第一行，并且它对任意单位向量$\mathbf{N}$都成立。）因此$\boldsymbol\gamma'\times\boldsymbol\gamma'' = v\mathbf{T}\times(v'\mathbf{T} + v^2\kappa\mathbf{N}) = v^3\kappa\,\mathbf{B}$，其长度为$v^3\kappa$；这就是曲率公式。其次，由于$\mathbf{B}$与$\mathbf{T}$和$\mathbf{N}$都正交，$(\boldsymbol\gamma'\times\boldsymbol\gamma'')\cdot\boldsymbol\gamma''' = v^3\kappa\cdot v^3\kappa\tau = v^6\kappa^2\tau$，而$\norm{\boldsymbol\gamma'\times\boldsymbol\gamma''}^2 = v^6\kappa^2$。两式相除即得挠率公式。
:::

证明还表明，在任何保持定向的参数化下都有$\mathbf{B} = \dfrac{\boldsymbol\gamma'\times\boldsymbol\gamma''}{\norm{\boldsymbol\gamma'\times\boldsymbol\gamma''}}$和$\mathbf{N} = \mathbf{B}\times\mathbf{T}$，这通常是计算标架最快的方法。

::: example 维维亚尼曲线 {#ex-viviani}
**维维亚尼（Viviani）曲线**$\boldsymbol\gamma(t) = (1 + \cos t,\ \sin t,\ 2\sin\tfrac t2)$是球面$x^2 + y^2 + z^2 = 4$与圆柱面$(x - 1)^2 + y^2 = 1$的交线。求它在$t = 0$处的曲率和挠率。
::: solution
首先，$(1 + \cos t)^2 + \sin^2t + 4\sin^2\tfrac t2 = 2 + 2\cos t + 2(1 - \cos t) = 4$，所以这条曲线确实位于球面上。在$t = 0$处：

$$
\boldsymbol\gamma' = \left(-\sin t,\ \cos t,\ \cos\tfrac t2\right) = (0, 1, 1), \quad \boldsymbol\gamma'' = \left(-\cos t,\ -\sin t,\ -\tfrac12\sin\tfrac t2\right) = (-1, 0, 0), \quad \boldsymbol\gamma''' = \left(\sin t,\ -\cos t,\ -\tfrac14\cos\tfrac t2\right) = \left(0, -1, -\tfrac14\right).
$$

于是$\boldsymbol\gamma'\times\boldsymbol\gamma'' = (1\cdot0 - 1\cdot0,\ 1\cdot(-1) - 0\cdot 0,\ 0\cdot 0 - 1\cdot(-1)) = (0, -1, 1)$，且$\norm{\boldsymbol\gamma'\times\boldsymbol\gamma''} = \sqrt2$，$\norm{\boldsymbol\gamma'} = \sqrt2$。由[[#thm-kappa-tau]]，

$$
\kappa = \frac{\sqrt2}{(\sqrt2)^3} = \frac12, \qquad \tau = \frac{(0,-1,1)\cdot(0,-1,-\tfrac14)}{2} = \frac{1 - \tfrac14}{2} = \frac38 .
$$

对一般的$t$做同样的计算，得$\kappa = \dfrac{\sqrt{13 + 3\cos t}}{(3 + \cos t)^{3/2}}$，$\tau = \dfrac{6\cos(t/2)}{13 + 3\cos t}$，所以挠率在$t = \pi$和$t = 3\pi$处改变符号，这两处是这条8字形曲线的最高点和最低点$(0, 0, \pm2)$；曲线在$(2, 0, 0)$处（对应$t = 0$和$t = 2\pi$）与自身相交。
:::
:::

曲率和挠率是真正的几何量：它们与曲线在空间中的位置无关。

::: proposition 刚体运动下的不变性 {#prop-invariance}
设$M(\mathbf{x}) = Q\mathbf{x} + \mathbf{b}$，其中$Q$是正交矩阵。则$M\circ\boldsymbol\gamma$与$\boldsymbol\gamma$有相同的曲率；若$\det Q = 1$，两者的挠率也相同；若$\det Q = -1$（含有反射），挠率改变符号。
:::

::: proof
$M\circ\boldsymbol\gamma$是单位速率曲线，$(M\circ\boldsymbol\gamma)' = Q\mathbf{T}$，$(M\circ\boldsymbol\gamma)'' = Q\mathbf{T}'$，由于$Q$保持长度，后者的长度为$\kappa$；它的主法向量为$Q\mathbf{N}$。对正交矩阵$Q$有$Q\mathbf{u}\times Q\mathbf{v} = (\det Q)\,Q(\mathbf{u}\times\mathbf{v})$，所以新的副法向量为$(\det Q)\,Q\mathbf{B}$，其导数为$(\det Q)\,Q\mathbf{B}' = -(\det Q)\,\tau\,Q\mathbf{N}$。因此新的挠率为$(\det Q)\,\tau$。
:::

::: quiz
对$\kappa > 0$的单位速率曲线，挠率度量的是什么？
- [ ] 切向量转动的速率
- [x] 密切平面绕切线转动的速率
- [ ] 曲线到其密切平面的距离
- [ ] 曲率的变化率
::: solution
$\abs{\tau} = \norm{\mathbf{B}'}$，而$\mathbf{B}$是密切平面的法向量，所以$\abs\tau$是该平面转动的速率；由于$\mathbf{B}' = -\tau\mathbf{N}$与$\mathbf{T}$垂直，这个平面绕切线转动。切向量转动的速率是曲率。曲线确实会离开它的密切平面，但只是三阶的，系数为$\kappa\tau/6$（[[#prop-canonical]]）。
:::
:::

::: warning 弗勒内标架要求κ > 0
在$\kappa = 0$处主法向量没有定义，并且可能发生跳跃。当$t\ne0$时令$\varphi(t) = e^{-1/t^2}$，并令$\varphi(0) = 0$；当$t\ge0$时令$\boldsymbol\gamma(t) = (t, \varphi(t), 0)$，当$t < 0$时令$\boldsymbol\gamma(t) = (t, 0, \varphi(t))$。这是一条光滑的正则曲线。在挠率有定义的地方，挠率都为零，因为每一半都位于一个平面内——然而这条曲线并不是平面曲线：一半位于$xy$平面内，另一半位于$xz$平面内。曲率在$t = 0$处为零，密切平面在那里跳过一个直角。下面的[[#thm-planar]]等结果都要求处处$\kappa > 0$。
:::

## 由曲率和挠率决定的曲线

弗勒内公式把关于曲线的几何问题转化为关于函数$\kappa$和$\tau$的问题。下面是两个最基本的例子。

::: theorem 挠率为零的曲线 {#thm-planar}
设$\boldsymbol\gamma$是处处$\kappa > 0$的单位速率空间曲线。则$\boldsymbol\gamma$位于一个平面内，当且仅当$\tau\equiv0$。
:::

::: proof
设$\tau\equiv0$。则$\mathbf{B}' = \mathbf{0}$，所以$\mathbf{B}$是常单位向量$\mathbf{B}_0$，并且$(\boldsymbol\gamma\cdot\mathbf{B}_0)' = \mathbf{T}\cdot\mathbf{B}_0 = 0$。所以$\boldsymbol\gamma\cdot\mathbf{B}_0$是常数$c$，曲线位于平面$\mathbf{x}\cdot\mathbf{B}_0 = c$内。

反之，设对某个单位向量$\mathbf{u}$有$\boldsymbol\gamma\cdot\mathbf{u} = c$。求导两次得$\mathbf{T}\cdot\mathbf{u} = 0$和$\kappa\,\mathbf{N}\cdot\mathbf{u} = 0$，由于$\kappa > 0$，有$\mathbf{N}\cdot\mathbf{u} = 0$。与$\mathbf{T}$和$\mathbf{N}$都正交的单位向量只有$\pm\mathbf{B}$，所以在每一点$\mathbf{B} = \pm\mathbf{u}$；由于$\mathbf{B}$连续，符号保持不变。因此$\mathbf{B}$是常向量，$\mathbf{B}' = \mathbf{0}$，$\tau\equiv0$。
:::

::: proposition 曲率为常数且挠率为零 {#prop-circle}
曲率为常数$\kappa > 0$且$\tau\equiv0$的单位速率曲线是半径为$1/\kappa$的一段圆弧。
:::

::: proof
令$\mathbf{c}(s) = \boldsymbol\gamma(s) + \frac1\kappa\mathbf{N}(s)$。由弗勒内公式，$\mathbf{c}' = \mathbf{T} + \frac1\kappa(-\kappa\mathbf{T} + 0\cdot\mathbf{B}) = \mathbf{0}$，所以$\mathbf{c}$是一个定点，且$\norm{\boldsymbol\gamma - \mathbf{c}} = 1/\kappa$。由[[#thm-planar]]，曲线还位于一个平面内，而球面与平面交于一个圆——这里是以$\mathbf{c}$为圆心、半径为$1/\kappa$的圆。
:::

对任何$\kappa > 0$的曲线，点$\boldsymbol\gamma + \frac1\kappa\mathbf{N}$称为曲线在该点的**曲率中心**。对一般的曲线，同样的计算给出$\mathbf{c}' = -(\kappa'/\kappa^2)\mathbf{N} + (\tau/\kappa)\mathbf{B}$，所以只有对圆，曲率中心才保持不动。

现在可以证明核心定理了：曲率和挠率构成一组完全不变量。

::: theorem 空间曲线基本定理 {#thm-fundamental-curves}
设$k, t\colon I\to\R$是开区间上的光滑函数，且$k > 0$。则存在单位速率曲线$\boldsymbol\gamma\colon I\to\R^3$，其曲率为$k$，挠率为$t$。任意两条这样的曲线只相差一个保持定向的刚体运动：$\tilde{\boldsymbol\gamma} = Q\boldsymbol\gamma + \mathbf{b}$，其中$Q$是旋转（$Q\T Q = I$，$\det Q = 1$）。
:::

::: proof
**唯一性。**设$\boldsymbol\gamma$和$\tilde{\boldsymbol\gamma}$的曲率都是$k$，挠率都是$t$，取定$s_0\in I$。存在唯一的旋转$Q$，把$\boldsymbol\gamma$在$s_0$处的正定向标准正交标架变为$\tilde{\boldsymbol\gamma}$在$s_0$处的标架；又存在平移$\mathbf{b}$，把$Q\boldsymbol\gamma(s_0)$移到$\tilde{\boldsymbol\gamma}(s_0)$。由[[#prop-invariance]]，$Q\boldsymbol\gamma + \mathbf{b}$的曲率仍为$k$，挠率仍为$t$，所以用它代替$\boldsymbol\gamma$，我们可以假定两条曲线在$s_0$处有相同的位置和相同的标架。考虑

$$
f(s) = \mathbf{T}\cdot\tilde{\mathbf{T}} + \mathbf{N}\cdot\tilde{\mathbf{N}} + \mathbf{B}\cdot\tilde{\mathbf{B}} .
$$

对两条曲线（具有相同的$k$和$t$）应用弗勒内公式，得

$$
\begin{aligned}
f' &= k\,\mathbf{N}\cdot\tilde{\mathbf{T}} + k\,\mathbf{T}\cdot\tilde{\mathbf{N}} + (-k\mathbf{T} + t\mathbf{B})\cdot\tilde{\mathbf{N}} + \mathbf{N}\cdot(-k\tilde{\mathbf{T}} + t\tilde{\mathbf{B}}) - t\,\mathbf{N}\cdot\tilde{\mathbf{B}} - t\,\mathbf{B}\cdot\tilde{\mathbf{N}} = 0,
\end{aligned}
$$

因为各项两两抵消。所以$f\equiv f(s_0) = 3$。三个单位向量点积中的每一个都至多为$1$，所以每一个都等于$1$，这就迫使对所有$s$有$\mathbf{T} = \tilde{\mathbf{T}}$（以及$\mathbf{N} = \tilde{\mathbf{N}}$，$\mathbf{B} = \tilde{\mathbf{B}}$）。于是$(\boldsymbol\gamma - \tilde{\boldsymbol\gamma})' = \mathbf{0}$，而两条曲线在$s_0$处重合，所以它们相等。

**存在性。**令$A(s)$是[[#eq-frenet]]中取$\kappa = k$，$\tau = t$的反对称矩阵，考虑关于未知$3\times3$矩阵函数$F(s)$的线性微分方程组$F' = AF$，初始条件为$F(s_0) = I$。系数连续的线性方程组在整个区间$I$上有唯一解，并且解是光滑的（[[ode/linear-systems]]，[[ode/existence-uniqueness]]）。令$\mathbf{T}, \mathbf{N}, \mathbf{B}$为$F$的各行。由于$A\T = -A$，

$$
(FF\T)' = AFF\T + FF\T A\T = A(FF\T) - (FF\T)A ,
$$

而常矩阵$I$满足同一个线性方程$X' = AX - XA$，并且在$s_0$处取值相同；由唯一性，$FF\T\equiv I$，所以对每个$s$，$F$的各行都是标准正交的。此外，$\det F$连续，只取值$\pm1$，并且在$s_0$处等于$1$，所以$\det F\equiv1$，$\mathbf{B} = \mathbf{T}\times\mathbf{N}$。现在令$\boldsymbol\gamma(s) = \int_{s_0}^s\mathbf{T}(u)\,du$。则$\boldsymbol\gamma' = \mathbf{T}$是单位向量，$\boldsymbol\gamma'' = \mathbf{T}' = k\mathbf{N}$，其中$k > 0$，$\norm{\mathbf{N}} = 1$，所以曲率为$k$，主法向量为$\mathbf{N}$；副法向量为$\mathbf{T}\times\mathbf{N} = \mathbf{B}$，而$\mathbf{B}' = -t\mathbf{N}$说明挠率为$t$。
:::

::: corollary 曲率和挠率都是常数的曲线 {#cor-helix}
曲率为常数$\kappa > 0$、挠率为常数$\tau\ne0$的单位速率曲线是一条圆柱螺线的一部分，其半径为$a = \kappa/(\kappa^2 + \tau^2)$，螺距参数为$b = \tau/(\kappa^2 + \tau^2)$。
:::

::: proof
由[[#ex-helix]]，取这样的$a$和$b$，螺旋线$(a\cos t, a\sin t, bt)$的曲率为$a/(a^2 + b^2) = \kappa$，挠率为$b/(a^2 + b^2) = \tau$，因为$a^2 + b^2 = 1/(\kappa^2 + \tau^2)$。由[[#thm-fundamental-curves]]的唯一性部分，具有相同常曲率和常挠率的每条曲线都可以由它经过一个刚体运动得到。
:::

因此，螺旋线之于空间，正如圆之于平面：它们是在每一点看起来都一样的曲线。这就是螺旋线在自然界中随处可见的原因——任何在每一步都重复同样扭转的过程，比如往一条链上逐个添加相同的构件，都会产生螺旋线。

::: application 生物学中的螺旋线
蛋白质的主链可以用离散版本的曲率和挠率来描述：相邻化学键之间的夹角，以及相邻键平面之间的二面角。当这些角在每个残基处都相同时，[[#cor-helix]]的离散类比就迫使这条链形成螺旋线——这正是α螺旋背后的几何原因，而α螺旋是蛋白质的两种基本结构模体之一。DNA双螺旋同样由相同的重复单元构成，每个单元与前一个单元之间都相差同一个螺旋运动。
:::

::: widget frenet
fx: sin(t) + 2sin(2t)
fy: cos(t) - 2cos(2t)
fz: -sin(3t)
t: 0, 2pi
caption: 三叶结及其弗勒内标架。注意观察副法向量：它随着密切平面的转动而摆动，并且挠率多次改变符号。这条曲线的全曲率$\int\kappa\,ds$约为$4.44\pi$。芬切尔（Fenchel）定理指出，每条闭空间曲线的全曲率至少为$2\pi$；法里-米尔诺（Fáry–Milnor）定理则指出，打了结的闭曲线的全曲率必须大于$4\pi$：一个结必须弯曲得很厉害。
:::

::: history
最早系统研究空间曲线的是克莱罗（Alexis Clairaut），他在《关于双重曲率曲线的研究》（*Recherches sur les courbes à double courbure*，1731）中把空间曲线看作曲面的交线，并提出了空间曲线同时沿两种方式弯曲的思想。整个18世纪，欧拉（Euler）以及蒙日（Gaspard Monge）和他的学派都研究过曲率和密切平面；蒙日的学生兰克雷（Michel-Ange Lancret）于1802年提出：切线与一个固定方向成定角的曲线，恰好就是$\tau/\kappa$为常数的曲线（[[#exr-lancret]]）；第一个证明通常归功于圣维南（Barré de Saint-Venant，1845）。[[#thm-frenet]]中的公式由两人独立发现：一位是弗勒内（Jean Frédéric Frenet），见于他1847年在图卢兹完成的博士论文（1852年发表）；另一位是塞雷（Joseph Alfred Serret），他于1851年发表了这组公式。借助随几何对象一起运动的标架来研究该对象，这一思想由达布（Gaston Darboux）在他的曲面讲义（1887–1896）中发展成一种一般方法，并由嘉当（Élie Cartan）在20世纪进一步发展；嘉当的**活动标架法**至今仍是微分几何的基本工具。
:::

## 后续内容

在本课程的其余部分，曲线会不断再次出现。位于曲面上的曲线，其曲率向量可以分解为两部分：垂直于曲面的部分由第二基本形式度量（[[differential-geometry/surface-curvature]]），与曲面相切的部分则是测地曲率；测地曲率为零的曲线就是测地线，即曲面上“最直”的曲线（[[differential-geometry/geodesics-gauss-bonnet]]）。有向曲率沿闭平面曲线的积分（对简单闭环为$\pm2\pi$）是高斯-博内定理在一维情形的前身。[[#thm-fundamental-curves]]的存在性证明是通过求解微分方程来构造几何对象的第一个例子（[[ode/linear-systems]]），而像三叶结这样打了结的曲线，则用代数拓扑来研究：三叶结周围空间的基本群（[[topology/fundamental-group]]）与一个未打结的圆周围空间的基本群不同。

::: summary
- 若$\boldsymbol\gamma'\ne\mathbf{0}$，参数曲线就是正则的；恰好正则曲线可以用弧长重新参数化，并且这种参数化在相差$s\mapsto\pm s + c$的意义下唯一（[[#prop-unit-speed]]）。
- 对单位速率曲线，$\kappa = \norm{\boldsymbol\gamma''}$（[[#def-curvature]]）。平面曲线具有有向曲率$\kappa_s$，满足$\mathbf{T}' = \kappa_s J\mathbf{T}$；它是转角的变化率（[[#prop-turning-angle]]），并且在相差旋转和平移的意义下决定曲线（[[#thm-plane-fundamental]]）。
- 在$\kappa > 0$处，空间曲线具有弗勒内标架$\mathbf{T}, \mathbf{N} = \mathbf{T}'/\kappa, \mathbf{B} = \mathbf{T}\times\mathbf{N}$，以及由$\mathbf{B}' = -\tau\mathbf{N}$定义的挠率（[[#def-torsion]]）。
- 弗勒内-塞雷公式：$\mathbf{T}' = \kappa\mathbf{N}$，$\mathbf{N}' = -\kappa\mathbf{T} + \tau\mathbf{B}$，$\mathbf{B}' = -\tau\mathbf{N}$（[[#thm-frenet]]）。
- 在任意参数化下：$\kappa = \norm{\boldsymbol\gamma'\times\boldsymbol\gamma''}/\norm{\boldsymbol\gamma'}^3$，$\tau = (\boldsymbol\gamma'\times\boldsymbol\gamma'')\cdot\boldsymbol\gamma'''/\norm{\boldsymbol\gamma'\times\boldsymbol\gamma''}^2$（[[#thm-kappa-tau]]）。螺旋线$(a\cos t, a\sin t, bt)$的$\kappa = a/(a^2+b^2)$，$\tau = b/(a^2+b^2)$。
- 当$\kappa > 0$时：$\tau\equiv0$当且仅当曲线是平面曲线（[[#thm-planar]]）；$\kappa$为常数且$\tau = 0$给出圆，$\kappa$为常数且$\tau\ne0$（为常数）给出螺旋线。
- 曲率和挠率在相差一个保持定向的刚体运动的意义下决定一条空间曲线，并且任意给定的$\kappa > 0$和$\tau$都能实现（[[#thm-fundamental-curves]]）。
:::

## 习题

::: exercise 螺旋线的一圈 {level=1 check="10*pi"}
求螺旋线$\boldsymbol\gamma(t) = (3\cos t, 3\sin t, 4t)$一圈（$0\le t\le2\pi$）的长度。
::: solution
$\boldsymbol\gamma'(t) = (-3\sin t, 3\cos t, 4)$的长度恒为$\sqrt{9 + 16} = 5$，所以所求长度为$\int_0^{2\pi}5\,dt = 10\pi$。
:::
:::

::: exercise 螺旋线的挠率 {level=1 check="4/25"}
求螺旋线$(3\cos t, 3\sin t, 4t)$的挠率。
::: solution
由[[#ex-helix]]，取$a = 3$，$b = 4$：$\tau = \dfrac{b}{a^2 + b^2} = \dfrac{4}{25}$（而$\kappa = \dfrac{3}{25}$）。
:::
:::

::: exercise 抛物线 {level=1 check="2/(5*sqrt(5))"}
求以$x$为参数的抛物线$y = x^2$在点$(1, 1)$处的有向曲率。
::: solution
对函数图像应用[[#prop-signed-formula]]，得$\kappa_s = \dfrac{f''}{(1 + f'^2)^{3/2}} = \dfrac{2}{(1 + 4)^{3/2}} = \dfrac{2}{5\sqrt5}\approx0.179$。
:::
:::

::: exercise 对数螺线 {level=2 check="1/sqrt(2)"}
求对数螺线$\boldsymbol\gamma(t) = (e^t\cos t, e^t\sin t)$在$t = 0$处的曲率，并证明一般地有$\kappa = 1/s$，其中$s = \sqrt2\,e^t$是从中心（即$t\to-\infty$时的极限点）量起的弧长。
::: solution
$x' = e^t(\cos t - \sin t)$，$y' = e^t(\sin t + \cos t)$，$x'' = -2e^t\sin t$，$y'' = 2e^t\cos t$。于是$x'^2 + y'^2 = 2e^{2t}$，$x'y'' - x''y' = 2e^{2t}(\cos^2t - \sin t\cos t) + 2e^{2t}(\sin^2 t + \sin t\cos t) = 2e^{2t}$，所以

$$
\kappa_s = \frac{2e^{2t}}{(2e^{2t})^{3/2}} = \frac{1}{\sqrt2\,e^t},
$$

它在$t = 0$处等于$\tfrac{1}{\sqrt2}$。速率为$\sqrt2\,e^t$，所以从$t = -\infty$量起的弧长为$\int_{-\infty}^t\sqrt2\,e^u\,du = \sqrt2\,e^t = s$，从而$\kappa = 1/s$。
:::
:::

::: exercise 扭三次曲线 {level=2 check="3"}
求扭三次曲线$\boldsymbol\gamma(t) = (t, t^2, t^3)$在原点处的挠率。
::: solution
$\boldsymbol\gamma' = (1, 2t, 3t^2)$，$\boldsymbol\gamma'' = (0, 2, 6t)$，$\boldsymbol\gamma''' = (0, 0, 6)$，所以$\boldsymbol\gamma'\times\boldsymbol\gamma'' = (6t^2, -6t, 2)$，并且

$$
\tau = \frac{(6t^2, -6t, 2)\cdot(0,0,6)}{36t^4 + 36t^2 + 4} = \frac{3}{9t^4 + 9t^2 + 1},
$$

它在$t = 0$处等于$3$。挠率处处为正，并且当$\abs{t}\to\infty$时趋于$0$。
:::
:::

::: exercise 乔装的曲线 {level=2}
证明曲线$\boldsymbol\gamma(t) = \left(t,\ \dfrac{1+t}{t},\ \dfrac{1-t^2}{t}\right)$（$t > 0$）位于一个平面内，并求出这个平面。
::: solution
$\boldsymbol\gamma' = (1, -t^{-2}, -t^{-2} - 1)$，$\boldsymbol\gamma'' = (0, 2t^{-3}, 2t^{-3})$，$\boldsymbol\gamma''' = (0, -6t^{-4}, -6t^{-4})$。于是$\boldsymbol\gamma'\times\boldsymbol\gamma'' = \tfrac{2}{t^3}(1, -1, 1)\ne\mathbf{0}$，所以$\kappa > 0$；又$(\boldsymbol\gamma'\times\boldsymbol\gamma'')\cdot\boldsymbol\gamma''' = \tfrac{2}{t^3}(0 + 6t^{-4} - 6t^{-4}) = 0$，所以$\tau\equiv0$，由[[#thm-planar]]，这条曲线是平面曲线。它的副法向量是常向量$(1,-1,1)/\sqrt3$，而且确实有$x - y + z = t - \frac{1+t}{t} + \frac{1-t^2}{t} = -1$：曲线位于平面$x - y + z = -1$内。
:::
:::

::: exercise 由曲率求曲线 {#exr-catenary level=2}
在相差旋转和平移的意义下，求有向曲率为$\kappa_s(s) = \dfrac{1}{1 + s^2}$（$s\in\R$）的单位速率平面曲线，并指出它是什么曲线。
::: hint
仿照[[#thm-plane-fundamental]]的存在性证明，取$\theta(s) = \arctan s$。
:::
::: solution
$\theta(s) = \int_0^s\frac{du}{1+u^2} = \arctan s$，所以$\cos\theta = \dfrac{1}{\sqrt{1+s^2}}$，$\sin\theta = \dfrac{s}{\sqrt{1+s^2}}$。积分得，在相差一个平移的意义下$\boldsymbol\gamma(s) = \left(\operatorname{arsinh}s,\ \sqrt{1+s^2}\right)$（我们在第二个分量上加了常数$1$）。这就是[[#ex-catenary]]中的悬链线$y = \cosh x$。由唯一性，具有这个曲率函数的每条曲线都与这条悬链线合同。
:::
:::

::: exercise 兰克雷定理 {#exr-lancret level=3}
设$\boldsymbol\gamma$是$\kappa > 0$的单位速率曲线。证明：$\tau/\kappa$为常数，当且仅当存在常单位向量$\mathbf{u}$，使$\mathbf{T}\cdot\mathbf{u}$为常数。（这样的曲线称为**一般螺线**。）
::: hint
对其中一个方向，可以试取与$c\,\mathbf{T} + \mathbf{B}$成比例的$\mathbf{u}$，其中$c = \tau/\kappa$。
:::
::: solution
设$\mathbf{T}\cdot\mathbf{u} = \cos\alpha$为常数。求导得$\kappa\,\mathbf{N}\cdot\mathbf{u} = 0$，所以$\mathbf{N}\cdot\mathbf{u} = 0$，从而$\mathbf{u} = \cos\alpha\,\mathbf{T} + \sin\alpha\,\mathbf{B}$（适当选取$\alpha$的符号，因为$\mathbf{u}$是$\mathbf{T}$和$\mathbf{B}$所张成的空间中的单位向量）。再求导得$\mathbf{0} = \cos\alpha\,\kappa\mathbf{N} - \sin\alpha\,\tau\mathbf{N}$，所以$\kappa\cos\alpha = \tau\sin\alpha$。这里$\sin\alpha\ne0$，否则$\cos\alpha = \pm1$，从而$\kappa\cos\alpha = 0$，与$\kappa > 0$矛盾；因此$\tau/\kappa = \cot\alpha$为常数。

反之，设$\tau = c\kappa$，其中$c$为常数，令单位向量$\mathbf{u} = (c\,\mathbf{T} + \mathbf{B})/\sqrt{1 + c^2}$。则$\mathbf{u}' = (c\kappa\mathbf{N} - \tau\mathbf{N})/\sqrt{1 + c^2} = \mathbf{0}$，所以$\mathbf{u}$是常向量，并且$\mathbf{T}\cdot\mathbf{u} = c/\sqrt{1 + c^2}$为常数。
:::
:::

::: exercise 球面上的曲线 {level=3}
设$\boldsymbol\gamma$是位于以原点为球心、半径为$R$的球面上的单位速率曲线，且$\kappa > 0$，$\tau\ne0$。记$\rho = 1/\kappa$，证明

$$
R^2 = \rho^2 + \left(\frac{\rho'}{\tau}\right)^2 .
$$
::: solution
对$\boldsymbol\gamma\cdot\boldsymbol\gamma = R^2$反复求导。首先，$\boldsymbol\gamma\cdot\mathbf{T} = 0$。其次，$\mathbf{T}\cdot\mathbf{T} + \kappa\,\boldsymbol\gamma\cdot\mathbf{N} = 0$，所以$\boldsymbol\gamma\cdot\mathbf{N} = -1/\kappa = -\rho$。对此式求导，得$\mathbf{T}\cdot\mathbf{N} + \boldsymbol\gamma\cdot(-\kappa\mathbf{T} + \tau\mathbf{B}) = -\rho'$；由于$\mathbf{T}\cdot\mathbf{N} = 0$，$\boldsymbol\gamma\cdot\mathbf{T} = 0$，得$\tau\,\boldsymbol\gamma\cdot\mathbf{B} = -\rho'$，即$\boldsymbol\gamma\cdot\mathbf{B} = -\rho'/\tau$。把$\boldsymbol\gamma$在标准正交标架下展开，得

$$
R^2 = \norm{\boldsymbol\gamma}^2 = (\boldsymbol\gamma\cdot\mathbf{T})^2 + (\boldsymbol\gamma\cdot\mathbf{N})^2 + (\boldsymbol\gamma\cdot\mathbf{B})^2 = 0 + \rho^2 + \left(\frac{\rho'}{\tau}\right)^2 .
$$

（例如，球面上的纬线圆有常值的$\rho\le R$，此时$\rho' = 0$，因而除非$\tau = 0$，否则必有$\rho = R$：小圆的挠率为零，这正是应有的结果。）
:::
:::

::: exercise 过同一点的主法线 {level=3}
设$\boldsymbol\gamma$是$\kappa > 0$的单位速率曲线，它的所有主法线$\boldsymbol\gamma(s) + \lambda\mathbf{N}(s)$（$\lambda\in\R$）都经过一个定点$\mathbf{c}$。证明$\boldsymbol\gamma$是以$\mathbf{c}$为圆心的一段圆弧。
::: solution
由假设，存在函数$\lambda$使$\mathbf{c} = \boldsymbol\gamma(s) + \lambda(s)\mathbf{N}(s)$；由于$\lambda = (\mathbf{c} - \boldsymbol\gamma)\cdot\mathbf{N}$，$\lambda$是光滑的。求导得

$$
\mathbf{0} = \mathbf{T} + \lambda'\mathbf{N} + \lambda(-\kappa\mathbf{T} + \tau\mathbf{B}) = (1 - \lambda\kappa)\mathbf{T} + \lambda'\mathbf{N} + \lambda\tau\mathbf{B} .
$$

标架是一组基，所以$\lambda\kappa = 1$，$\lambda' = 0$，$\lambda\tau = 0$。于是$\lambda$是非零常数，$\kappa = 1/\lambda$是常数，且$\tau\equiv0$。由[[#prop-circle]]，曲线是半径为$\abs\lambda$的一段圆弧，其圆心$\boldsymbol\gamma + \frac1\kappa\mathbf{N}$就是$\mathbf{c}$。
:::
:::
