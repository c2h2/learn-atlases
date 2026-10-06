把一块金属板的边缘保持在固定的温度上，经过足够长的时间，它就会达到**稳态**：温度不再随时间变化。这时在二维热方程$u_t = k(u_{xx} + u_{yy})$中有$u_t = 0$，于是温度满足**拉普拉斯（Laplace）方程**

$$
\Delta u = u_{xx} + u_{yy} = 0.
$$

同一个方程还描述了无电荷区域中的静电势、真空中的引力势、理想流体的速度势，以及斜率很小的肥皂膜的形状。它的解，即**调和函数**，是分析学中最优美的对象之一：它们无穷次可微，在每个圆周上的平均值都等于自身在圆心处的值，并且局部上是复解析函数的实部。

拉普拉斯方程中没有时间变量，因此没有初始条件；解完全由它在区域边界上的值（或法向导数）决定。本章用分离变量法求解矩形和圆盘上的这类**边值问题**，推导圆盘上的泊松（Poisson）积分公式，并证明**平均值性质**和**最大值原理**；它们给出解的唯一性与稳定性，并解释了调和函数为什么不会有山峰或凹坑。

## 调和函数

::: definition 调和函数 {#def-harmonic}
设$\Omega \subseteq \R^2$为开集。如果函数$u\colon\Omega\to\R$具有连续的二阶偏导数，并且满足**拉普拉斯方程**

$$
\Delta u = \frac{\partial^2u}{\partial x^2} + \frac{\partial^2u}{\partial y^2} = 0 \quad\text{于 } \Omega.
$$

就称$u$是**调和**的。算子$\Delta$称为**拉普拉斯算子**。非齐次方程$\Delta u = f$称为**泊松方程**。在$\R^3$中，$\Delta u = u_{xx} + u_{yy} + u_{zz}$。
:::

下面是一些例子，求两次导数即可验证：

- 每个线性函数$a + bx + cy$；
- $x^2 - y^2$和$xy$，但$x^2 + y^2$**不是**，拉普拉斯算子作用于它得到$4$；
- $e^x\cos y$和$e^x\sin y$；
- $x^3 - 3xy^2$，以及极坐标下对每个$n \ge 0$的$r^n\cos n\theta$和$r^n\sin n\theta$；
- $\ln(x^2 + y^2) = 2\ln r$，它在$\R^2\setminus\{0\}$上调和，但在含原点的区域上不调和。

这些并非偶然。若$f = u + iv$是复解析函数，则由柯西-黎曼（Cauchy–Riemann）方程$u_x = v_y$，$u_y = -v_x$得$u_{xx} = v_{yx} = v_{xy} = -u_{yy}$，所以$\Delta u = 0$，同理$\Delta v = 0$（[[complex-analysis/analytic-functions]]）。上面的例子正是$z^2$、$e^z$、$z^3$、$z^n$和$2\log z$的实部和虚部。反过来，在单连通区域上，每个调和函数都是某个解析函数的实部，因此这两套理论有着密切的联系。

有三类物理问题会导出拉普拉斯方程。

- **稳态热传导。**无热源的平板中的稳态温度满足$\Delta u = 0$（在[[pde/heat-equation]]一章的热方程中令$u_t = 0$）。
- **静电学。**电场为$\mathbf E = -\nabla V$，而高斯（Gauss）定律表明$\divg\mathbf E = \rho/\eps_0$。所以电势满足泊松方程$\Delta V = -\rho/\eps_0$，在没有电荷的地方则满足拉普拉斯方程。
- **理想流体的流动。**不可压缩（$\divg\mathbf v = 0$）、无旋（$\curl\mathbf v = 0$）的流动具有速度势$\mathbf v = \nabla\phi$，于是$\Delta\phi = \divg\nabla\phi = 0$。

::: intuition 调和意味着“等于邻点的平均值”
与热方程中一样，$u_{xx}(x,y) \approx \frac{u(x+h,y) + u(x-h,y) - 2u(x,y)}{h^2}$，对$y$也类似。两式相加，得

$$
\Delta u(x,y) \approx \frac{4}{h^2}\left[\frac{u(x+h,y) + u(x-h,y) + u(x,y+h) + u(x,y-h)}{4} - u(x,y)\right].
$$

所以$\Delta u = 0$是说：每一点处的值（精确到二阶）等于它的四个邻点处的值的平均。稳态温度不可能有热点，因为热点处的温度会高于周围的平均值，因而会逐渐冷却。我们将用平均值性质把这一点严格化。
:::

### 边值问题

设$\Omega$是有界区域，其边界为$\partial\Omega$，单位外法向量为$\mathbf n$。两个基本问题是：

- **狄利克雷（Dirichlet）问题**：在$\Omega$内$\Delta u = 0$，在$\partial\Omega$上$u = g$（给定边界上的温度或电势）；
- **诺伊曼（Neumann）问题**：在$\Omega$内$\Delta u = 0$，在$\partial\Omega$上$\dfrac{\partial u}{\partial n} = \nabla u\cdot\mathbf n = h$（给定通过边界的热通量）。

诺伊曼问题并非对任意的$h$都可解。

::: proposition 诺伊曼问题的相容性条件 {#prop-compatibility}
设$\Omega$是边界分段光滑的有界区域，$u$在$\overline\Omega$上具有连续的二阶导数，在$\Omega$内$\Delta u = f$，在$\partial\Omega$上$\partial u/\partial n = h$。则

$$
\iint_\Omega f\,dA = \oint_{\partial\Omega}h\,ds.
$$

特别地，拉普拉斯方程的诺伊曼问题仅当$\oint_{\partial\Omega}h\,ds = 0$时才可能有解；如果解存在，那么给它加上任意常数后仍是解。
:::

::: proof
对向量场$\nabla u$应用散度定理（[[multivariable/stokes-divergence]]）：$\iint_\Omega\divg(\nabla u)\,dA = \oint_{\partial\Omega}\nabla u\cdot\mathbf n\,ds$。左边是$\iint_\Omega\Delta u\,dA = \iint_\Omega f\,dA$，右边是$\oint_{\partial\Omega}h\,ds$。给$u$加上一个常数，既不改变$\Delta u$，也不改变$\partial u/\partial n$。
:::

物理意义是：只有当通过边界流入的净热量为零时，才可能存在稳态温度。

::: quiz
下列函数中，哪些在所指定的区域上是调和的？选出所有正确的选项。
- [x] $\R^2$上的$e^{2x}\cos 2y$
- [ ] $\R^2$上的$x^2 + y^2$
- [x] $\R^2\setminus\{0\}$上的$\ln\sqrt{x^2+y^2}$
- [x] $\R^2$上的$x^4 - 6x^2y^2 + y^4$
::: solution
$e^{2x}\cos2y = \operatorname{Re}e^{2z}$和$x^4 - 6x^2y^2 + y^4 = \operatorname{Re}z^4$都是解析函数的实部，因而是调和的（也可以直接验证：对第一个函数，$u_{xx} = 4u$，$u_{yy} = -4u$）。$\ln r$在原点以外调和：在极坐标下它只依赖于$r$，且$u_{rr} + \frac1ru_r = -\frac{1}{r^2} + \frac{1}{r^2} = 0$。但$\Delta(x^2 + y^2) = 4 \neq 0$。
:::
:::

## 矩形上的狄利克雷问题

设$\Omega = (0, a)\times(0, b)$。先考虑边界数据在三条边上为零的情形：

$$
\Delta u = 0 \ \text{于 } \Omega, \qquad u(0, y) = u(a, y) = 0, \qquad u(x, 0) = 0, \qquad u(x, b) = f(x).
$$ {#eq-rect-problem}

试取$u = X(x)Y(y)$。则$X''Y + XY'' = 0$，所以$\frac{X''}{X} = -\frac{Y''}{Y} = -\lambda$。两条竖直边上的齐次条件给出熟悉的特征值问题$X'' + \lambda X = 0$，$X(0) = X(a) = 0$，其特征值为$\lambda_n = (n\pi/a)^2$，特征函数为$X_n = \sin\frac{n\pi x}{a}$（[[pde/heat-equation#prop-dirichlet-eigen]]）。这时关于$y$的方程为$Y'' = \lambda_nY$，它的解是指数函数而不是振荡函数，条件$Y(0) = 0$选出$Y_n = \sinh\frac{n\pi y}{a}$。叠加起来，得

$$
u(x,y) = \sum_{n=1}^\infty c_n\sinh\frac{n\pi y}{a}\sin\frac{n\pi x}{a}.
$$

在$y = b$处需要$\sum c_n\sinh\frac{n\pi b}{a}\sin\frac{n\pi x}{a} = f(x)$，所以$c_n\sinh\frac{n\pi b}{a} = b_n$，即$f$在$[0, a]$上的第$n$个正弦系数。因此

$$
u(x,y) = \sum_{n=1}^{\infty}b_n\,\frac{\sinh(n\pi y/a)}{\sinh(n\pi b/a)}\,\sin\frac{n\pi x}{a}, \qquad b_n = \frac{2}{a}\int_0^af(x)\sin\frac{n\pi x}{a}\,dx.
$$ {#eq-rect-solution}

当$y < b$时，比值$\frac{\sinh(n\pi y/a)}{\sinh(n\pi b/a)}$约为$e^{-n\pi(b - y)/a}$，所以边界数据中的高频起伏在进入矩形内部时按指数衰减：与热方程一样，即使$f$很粗糙，解在内部也是光滑的。如果四条边上的数据都不为零，就求解四个这种类型的问题（每个问题只在一条边上给出数据），再把解相加——又是叠加原理。

::: example 一条边被加热 {#ex-square}
正方形平板$0 \le x, y \le \pi$的三条边温度为$0$，上边$y = \pi$的温度为$1$。求稳态温度及其在中心处的值。
::: solution
$f = 1$在$[0,\pi]$上的正弦系数为：$n$为奇数时$b_n = \frac{4}{n\pi}$，$n$为偶数时为$0$。在[[#eq-rect-solution]]中取$a = b = \pi$，得

$$
u(x,y) = \frac{4}{\pi}\sum_{n\ \text{为奇数}}\frac{\sinh ny}{n\sinh n\pi}\sin nx.
$$

中心处的值无须对级数求和就能求出。令$u_1 = u$，并设$u_2, u_3, u_4$分别是右边、下边和左边温度为$1$（其余三条边为$0$）时的解。由正方形的对称性，每个解都由$u_1$旋转得到，所以四者在中心处取相同的值。它们的和是调和函数，并且在每条边上的边界值都是$1$，所以由唯一性（见下文[[#cor-unique]]），这个和就是常数$1$。（严格地说，[[#cor-unique]]要求边界值连续，而这里的边界值在角点处跳跃；不过对于边界数据只在有限个点处跳跃的有界解，唯一性仍然成立，这一推广我们不加证明。）因此

$$
u\bigl(\tfrac\pi2, \tfrac\pi2\bigr) = \frac14.
$$

（数值上，$\frac4\pi\sum_{n\text{ 为奇数}}\frac{\sinh(n\pi/2)\sin(n\pi/2)}{n\sinh n\pi} = 0.2500\ldots$；仅取第一项得$0.2537$，取前两项得$0.2499$。）边界值在上方的两个角点处跳跃，所以级数在$y = \pi$附近收敛得很慢，并沿上边出现吉布斯（Gibbs）过冲；在正方形内部，级数收敛得非常快。
:::
:::

::: widget surface
f: sum(4/(pi*(2*j + 1))*sinh((2*j + 1)*y)/sinh((2*j + 1)*pi)*sin((2*j + 1)*x), j, 0, 30)
x: 0, pi
y: 0, pi
contours: true
caption: [[#ex-square]]中的稳态温度：边$y = \pi$保持为$1$，其余三条边保持为$0$。旋转曲面。沿受热的边，部分和出现振荡（吉布斯现象），但只要进入平板内部不远，曲面就完全光滑了，并且大致像$\sinh y/\sinh\pi$那样减小。注意内部任何地方都没有凸起或凹陷——最大值和最小值都位于边界上。
:::

## 圆盘上的拉普拉斯方程

对圆盘，自然要用极坐标$x = r\cos\theta$，$y = r\sin\theta$。由链式法则（见[[multivariable/partial-derivatives]]），拉普拉斯算子化为

$$
\Delta u = u_{rr} + \frac1r u_r + \frac{1}{r^2}u_{\theta\theta}.
$$ {#eq-polar-laplacian}

考虑圆盘$r < a$上的狄利克雷问题，边界条件为$u(a,\theta) = g(\theta)$，其中$g$以$2\pi$为周期。在[[#eq-polar-laplacian]]中令$u = R(r)\Theta(\theta)$分离变量，再乘以$r^2/(R\Theta)$，得

$$
\frac{r^2R'' + rR'}{R} = -\frac{\Theta''}{\Theta} = \lambda.
$$

角向方程$\Theta'' + \lambda\Theta = 0$带有一个隐含的边界条件：$\Theta$必须以$2\pi$为周期，因为$(r, \theta)$和$(r, \theta + 2\pi)$是同一个点。$\lambda$为负时得到指数函数，它们不是周期函数；$\lambda = 0$时得到$A + B\theta$，仅当$B = 0$时才是周期的；$\lambda = \mu^2 > 0$时得到$A\cos\mu\theta + B\sin\mu\theta$，它恰好在$\mu = n$为整数时是周期的。所以$\lambda = n^2$，$n = 0, 1, 2, \dots$。

径向方程$r^2R'' + rR' - n^2R = 0$是柯西-欧拉（Cauchy–Euler）方程：试取$R = r^m$，得$m^2 = n^2$，所以当$n \ge 1$时$R = r^n$或$r^{-n}$，当$n = 0$时$R = 1$或$\ln r$。解$r^{-n}$和$\ln r$在圆盘中心无界，所以舍去。把余下的解叠加起来，并与边界数据相匹配，得

$$
u(r,\theta) = \frac{a_0}{2} + \sum_{n=1}^{\infty}\left(\frac ra\right)^n\bigl(a_n\cos n\theta + b_n\sin n\theta\bigr),
$$ {#eq-disc-series}

其中$a_n$，$b_n$是$g$的傅里叶（Fourier）系数。每一项都是调和的，因为$r^n\cos n\theta$和$r^n\sin n\theta$是$z^n$的实部和虚部。因子$(r/a)^n$使边界数据变得光滑：越靠近中心，它对高频的衰减就越强。在中心处只剩下常数项：$u(0) = \frac{a_0}{2} = \frac{1}{2\pi}\int_{-\pi}^{\pi}g(\theta)\,d\theta$，即**边界值的平均**——这是平均值性质的初次显现。

::: warning 区域不含原点时要保留奇异解
我们舍去$r^{-n}$和$\ln r$，仅仅是因为原点在圆盘内，而解在那里必须有界。在**圆环**$a < r < b$中或在圆盘外部，这些解完全合理，必须保留：例如，两个同心圆分别保持在不同的常数温度时，两圆之间的稳态温度是$A + B\ln r$，而不是常数。在舍弃任何解之前，总要先问一问：区域的几何形状允许哪些解。
:::

::: example 边界数据为三角多项式 {#ex-cos3}
求解单位圆盘上边界条件为$u(1,\theta) = \cos^3\theta$的狄利克雷问题，用直角坐标表示结果，并求$u$在闭圆盘上的最大值。
::: solution
不需要计算任何积分：由$\cos3\theta = 4\cos^3\theta - 3\cos\theta$得$\cos^3\theta = \frac34\cos\theta + \frac14\cos3\theta$，它本身已经是傅里叶级数。由[[#eq-disc-series]]（取$a = 1$），每个$\cos n\theta$都乘以$r^n$：

$$
u(r,\theta) = \frac34r\cos\theta + \frac14r^3\cos3\theta = \frac34x + \frac14\bigl(x^3 - 3xy^2\bigr),
$$

这里用到了$r^3\cos3\theta = \operatorname{Re}z^3 = x^3 - 3xy^2$。结果是一个调和多项式，这是理所当然的（每一项都是$z$的某个幂的实部）。由最大值原理（见下文[[#cor-unique]]和[[#thm-strong-max]]），它在闭圆盘上的最大值等于边界值$\cos^3\theta$的最大值，即$1$，且仅在$(1, 0)$处取到；在圆盘内部，$u < 1$。
:::
:::

::: example 圆周的两半 {#ex-semicircle}
单位圆盘的边界在上半圆周$0 < \theta < \pi$上保持温度$1$，在下半圆周上保持温度$0$。求稳态温度。
::: solution
$g$的傅里叶系数为$a_0 = 1$，$a_n = 0$，以及$b_n = \frac1\pi\int_0^\pi\sin n\theta\,d\theta = \frac{1 - (-1)^n}{n\pi}$，即$n$为奇数时等于$\frac{2}{n\pi}$。所以

$$
u(r,\theta) = \frac12 + \frac{2}{\pi}\sum_{n\ \text{为奇数}}\frac{r^n\sin n\theta}{n}.
$$

这个级数可以求和。令$z = re^{i\theta}$，当$\abs z < 1$时$\sum_{n\ \text{为奇数}}\frac{z^n}{n} = \frac12\log\frac{1 + z}{1 - z}$，而$\log w$的虚部是$\arg w$。由于$\frac{1+z}{1-z} = \frac{(1 + z)(1 - \bar z)}{\abs{1-z}^2} = \frac{1 - r^2 + 2ir\sin\theta}{\abs{1 - z}^2}$的实部为正，

$$
u(r,\theta) = \frac12 + \frac1\pi\arctan\frac{2r\sin\theta}{1 - r^2} = \frac12 + \frac1\pi\arctan\frac{2y}{1 - x^2 - y^2}.
$$

在水平直径（$y = 0$）上温度为$\frac12$，这正是对称性所要求的；等温线$u = c$是曲线$\frac{2y}{1 - x^2 - y^2} = \tan\bigl(\pi(c - \tfrac12)\bigr)$，它们是经过边界数据发生跳跃的两点$(\pm1, 0)$的圆弧。
:::
:::

::: widget surface
fx: u*cos(v)
fy: u*sin(v)
fz: 0.5 + atan(2*u*sin(v)/(1 - u^2))/pi
u: 0, 0.995
v: 0, 2pi
color: height
caption: [[#ex-semicircle]]中单位圆盘上的稳态温度，用极坐标画在圆盘上方。旋转它：曲面是一张光滑的“扭曲的薄片”，从边缘下半部分的$0$攀升到上半部分的$1$，沿整条水平直径取值$\tfrac12$。在边界数据发生跳跃的两点$(\pm1, 0)$附近，介于$0$和$1$之间的所有等值线都挤在一起。
:::

### 泊松积分公式

把$a_n$和$b_n$的公式代入[[#eq-disc-series]]，再对所得的几何级数求和，就得到解的一个封闭形式的公式。

::: theorem 泊松积分公式 {#thm-poisson}
设$g$连续且以$2\pi$为周期。对$0 \le r < a$，定义

$$
u(r,\theta) = \frac{1}{2\pi}\int_{-\pi}^{\pi}P(r, \theta - \phi)\,g(\phi)\,d\phi, \qquad P(r,\alpha) = \frac{a^2 - r^2}{a^2 - 2ar\cos\alpha + r^2},
$$ {#eq-poisson}

并令$u(a,\theta) = g(\theta)$。则当$r < a$时$u$等于级数[[#eq-disc-series]]，$u$在开圆盘内调和，并且在闭圆盘上连续。所以$u$是狄利克雷问题的解。函数$P$称为**泊松核**。
:::

::: proof
**调和性。**连续函数$g$的傅里叶系数有界，设其界为$B$。在较小的圆盘$r \le r_0 < a$上，[[#eq-disc-series]]的第$n$项及其直到二阶的各偏导数都不超过某个常数与$n^2(r_0/a)^n$的乘积，而以后者为通项的级数收敛。由M判别法，该级数及其各导数的级数在那里一致收敛，所以$u$在开圆盘内是$C^2$的，并且$\Delta u$等于各项的拉普拉斯算子作用结果之和，而这些结果都为零。

**核函数。**记$\rho = r/a < 1$。代入系数公式，并交换求和与积分的次序（由于级数关于$\phi$一致收敛，这是允许的），得

$$
u(r,\theta) = \frac{1}{2\pi}\int_{-\pi}^{\pi}g(\phi)\left[1 + 2\sum_{n=1}^{\infty}\rho^n\cos n(\theta - \phi)\right]d\phi.
$$

令$w = \rho e^{i\alpha}$，方括号中的式子等于$\operatorname{Re}\bigl(1 + 2\sum_{n\ge1}w^n\bigr) = \operatorname{Re}\frac{1 + w}{1 - w} = \operatorname{Re}\frac{(1 + w)(1 - \bar w)}{\abs{1 - w}^2} = \frac{1 - \rho^2}{1 - 2\rho\cos\alpha + \rho^2}$，分子分母同乘以$a^2$即得$P(r, \alpha)$。

**边界值。**核函数具有三条性质：(i)$P > 0$，因为$a^2 - 2ar\cos\alpha + r^2 = \abs{a - re^{i\alpha}}^2 > 0$；(ii)$\frac1{2\pi}\int_{-\pi}^{\pi}P(r,\alpha)\,d\alpha = 1$，这可由对级数逐项积分得到；(iii)当$0 < \delta \le \abs\alpha \le \pi$时，$a^2 - 2ar\cos\alpha + r^2 = (a - r)^2 + 2ar(1 - \cos\alpha) \ge 2ar(1 - \cos\delta)$，所以当$r \to a$时$P(r,\alpha) \le \frac{a^2 - r^2}{2ar(1 - \cos\delta)} \to 0$。现在固定$\theta_0$和$\eps > 0$，并设$\abs g \le K$。由一致连续性，可取$\delta > 0$，使得只要$\abs{\phi - \theta_0} < 2\delta$，就有$\abs{g(\phi) - g(\theta_0)} < \eps$。对$r < a$和$\abs{\theta - \theta_0} < \delta$，由(ii)，

$$
u(r,\theta) - g(\theta_0) = \frac{1}{2\pi}\int_{-\pi}^{\pi}P(r,\theta - \phi)\bigl(g(\phi) - g(\theta_0)\bigr)\,d\phi.
$$

把（在以$\theta$为中心的一个周期上的）积分分成两部分：一部分是$\abs{\phi - \theta} < \delta$，这时$\abs{\phi - \theta_0} < 2\delta$，于是由(i)和(ii)，这部分的贡献小于$\eps$；另一部分是$\abs{\phi - \theta}\ge\delta$，由(iii)，这部分的贡献至多为$2K\max_{\delta\le\abs\alpha\le\pi}P(r,\alpha) \to 0$。因此，对所有充分接近$(a, \theta_0)$且$r < a$的$(r,\theta)$，都有$\abs{u(r,\theta) - g(\theta_0)} < 2\eps$；再结合$g$在边界上本身的连续性，就证明了$u$在闭圆盘上连续。
:::

泊松核起着加权平均的作用：$u$在内点处的值是边界值的平均，其中离该点最近的那部分边界所占的权重最大。在中心处$P \equiv 1$，又回到了普通的平均值。

## 平均值性质与最大值原理

$u(0)$等于边界值的平均，这一事实并非以原点为圆心的圆盘所特有：它对区域内的每个圆周都成立。

::: theorem 平均值性质 {#thm-mean-value}
设$u$在开集$\Omega\subseteq\R^2$内调和，以$p = (p_1, p_2)$为圆心、$R$为半径的闭圆盘$\overline D$含于$\Omega$。则

$$
u(p) = \frac{1}{2\pi}\int_0^{2\pi}u(p_1 + R\cos\theta,\ p_2 + R\sin\theta)\,d\theta = \frac{1}{\pi R^2}\iint_{D}u\,dA.
$$

圆心处的值既等于在圆周上的平均值，也等于在圆盘上的平均值。
:::

::: proof
对$0 < r \le R$，令$m(r) = \frac{1}{2\pi}\int_0^{2\pi}u(p + r\mathbf e_\theta)\,d\theta$，其中$\mathbf e_\theta = (\cos\theta, \sin\theta)$。在积分号下求导（由于$u$在$\overline D$的某个邻域上是$C^1$的，这是允许的），得

$$
m'(r) = \frac1{2\pi}\int_0^{2\pi}\nabla u(p + r\mathbf e_\theta)\cdot\mathbf e_\theta\,d\theta = \frac{1}{2\pi r}\oint_{\abs{x - p} = r}\frac{\partial u}{\partial n}\,ds = \frac{1}{2\pi r}\iint_{\abs{x-p}<r}\Delta u\,dA = 0,
$$

这里用到了$ds = r\,d\theta$、$\mathbf e_\theta$是圆周的外法向量，以及散度定理。所以$m$在$(0, R]$上是常数。由于$u$连续，当$r\to0^+$时$m(r) \to u(p)$：$\abs{m(r) - u(p)} \le \max_{\abs{x - p} = r}\abs{u(x) - u(p)} \to 0$。因此$m(R) = u(p)$。对于圆盘上的平均值，采用以$p$为中心的极坐标：$\iint_Du\,dA = \int_0^R2\pi r\,m(r)\,dr = \pi R^2u(p)$。
:::

平均值性质刻画了调和函数：在每个小圆周上都满足平均值性质的连续函数自动是调和的（而且无穷次可微）。我们用不到这个逆命题，但它解释了调和函数为什么如此“刚硬”。平均值性质最重要的推论是最大值原理。

::: theorem 强最大值原理 {#thm-strong-max}
设$\Omega\subseteq\R^2$是连通开集，$u$在$\Omega$内调和。若$u$在$\Omega$的某一点处取到它在$\Omega$上的最大值（或最小值），则$u$在$\Omega$内为常数。
:::

::: proof
设最大值$M = \max_\Omega u$可以取到，令$S = \set{x\in\Omega : u(x) = M}$，它非空。由于$u$连续，$S$在$\Omega$中是闭的。$S$也是开的：若$p \in S$，取以$p$为圆心的圆盘$D$，使$\overline D\subset\Omega$。由[[#thm-mean-value]]，$M = u(p) = \frac{1}{\abs D}\iint_Du\,dA$，所以$\iint_D(M - u)\,dA = 0$，而被积函数连续且非负。因此在整个$D$上$u = M$（如果$M - u$在某一点处为正，那么它在该点周围的一个小圆盘上都为正，积分就会是正的）。所以$D\subseteq S$。连通集的既开又闭的非空子集就是它本身，所以$S = \Omega$。对最小值，只需把上述论证用于$-u$。
:::

::: corollary 弱最大值原理与唯一性 {#cor-unique}
设$\Omega$有界，$u$在$\overline\Omega$上连续，在$\Omega$内调和。则

$$
\max_{\overline\Omega}u = \max_{\partial\Omega}u, \qquad \min_{\overline\Omega}u = \min_{\partial\Omega}u.
$$

因此，狄利克雷问题在$\overline\Omega$上连续的解至多有一个；并且边界数据分别为$g_1, g_2$的两个解$u_1, u_2$满足$\max_{\overline\Omega}\abs{u_1 - u_2} = \max_{\partial\Omega}\abs{g_1 - g_2}$。
:::

::: proof
$\overline\Omega$是紧的，所以$u$在某一点$p$处取到最大值$M$。若$p\in\partial\Omega$，结论已经成立。若$p\in\Omega$，设$U$是$\Omega$的含$p$的连通分支；由[[#thm-strong-max]]，在$U$上$u = M$，从而由连续性，在$\overline U$上也有$u = M$。有界开集$U$的边界非空，且含于$\partial\Omega$，所以$M$在$\partial\Omega$上取到。最小值的情形类似。至于唯一性和稳定性，只需把这一结论用于$\pm(u_1 - u_2)$，它们是调和的，边界值为$\pm(g_1 - g_2)$。
:::

所以平板中的稳态温度既不会高于边缘上最热的点，也不会低于边缘上最冷的点；边缘温度的微小变化只会在内部各处引起一致微小的变化。这是[[pde/heat-equation#thm-max]]中热方程的最大值原理在椭圆型方程中的对应结果。

::: widget contour
f: x^3 - 3*x*y^2
x: -2, 2
y: -2, 2
levels: 16
gradient: true
point: 1, 0.5
caption: 调和函数$x^3 - 3xy^2 = \operatorname{Re}z^3$的等值线，以及它在可拖动点处的梯度。四处移动该点：除原点外梯度处处不为零，而在原点处，三条“山谷”和三条“山脊”交汇在一起（猴鞍面）。任何地方都没有局部极大值或局部极小值，这与最大值原理的预言完全一致：在你画出的任何圆盘上，函数的最大值和最小值都位于边界圆周上，而绝不在内部。
:::

::: quiz
函数$u$在闭单位圆盘的某个邻域上调和，且在单位圆周上$u(\cos\theta, \sin\theta) = 3 + \sin\theta + \cos2\theta$。$u(0,0)$等于多少？$u$在闭圆盘上的最大值是多少？
- [x] $u(0,0) = 3$，$\max u = 33/8$
- [ ] $u(0,0) = 4$，$\max u = 5$
- [ ] $u(0,0) = 3$，$\max u = 5$
- [ ] 仅凭边界值无法确定$u(0,0)$
::: solution
由平均值性质，$u(0,0)$等于边界值的平均，而$\sin\theta$和$\cos2\theta$的平均值都是零，所以$u(0,0) = 3$。由最大值原理，$u$的最大值就是$g(\theta) = 3 + \sin\theta + \cos2\theta = 4 + \sin\theta - 2\sin^2\theta$在圆周上的最大值。把它看作$s = \sin\theta\in[-1,1]$的函数，$4 + s - 2s^2$在$s = \frac14$处最大，其值为$4 + \frac14 - \frac18 = \frac{33}{8}$。（值$5$永远取不到：$\sin\theta = 1$迫使$\cos2\theta = -1$。）
:::
:::

::: warning 唯一性要求区域有界
在无界区域上，狄利克雷问题可能有许多解。在上半平面$y > 0$中，$u = 0$和$u = y$都是调和的，并且都在边界$y = 0$上为零。[[#cor-unique]]的证明在这里失效，因为$\overline\Omega$不是紧的，最大值未必能取到。加上一个无穷远处的条件（例如要求$u$有界），唯一性就恢复了。
:::

### 径向解与圆环

只依赖于$r$的调和函数满足$u_{rr} + \frac1ru_r = \frac1r(ru_r)_r = 0$，所以$ru_r$是常数，$u = A + B\ln r$。它们是圆环上的狄利克雷问题的解，其中边界数据在每个圆周上都是常数。

::: example 管壁中的温度 {#ex-annulus}
一根长管的管壁占据区域$1 \le r \le e$（取适当的单位）。其内表面温度为$100^\circ$，外表面温度为$0^\circ$。求稳态温度，并求管壁中温度等于$50^\circ$的位置。
::: solution
由对称性，我们寻找形如$u = A + B\ln r$的解。由条件$u(1) = A = 100$和$u(e) = A + B = 0$得$B = -100$，所以$u = 100(1 - \ln r)$。由唯一性（[[#cor-unique]]），这就是所求的解。当$\ln r = \frac12$，即$r = \sqrt e \approx 1.65$时，它等于$50$——而不是在管壁的中点$r = \frac{1 + e}{2} \approx 1.86$处。温度在内表面附近下降得最快，因为那里的热通量$-u_r = 100/r$集中在较小的圆周上；通过每个圆周的总通量$2\pi r\cdot\frac{100}{r} = 200\pi$都相同，这在稳态下是必然的。
:::
:::

::: example 绕圆柱的理想流动 {#ex-cylinder}
沿$x$方向、速度为$U$的均匀来流绕过一根半径为$a$的长圆柱。速度势$\phi$在圆柱外满足$\Delta\phi = 0$，在$r = a$上满足$\partial\phi/\partial r = 0$（没有流体穿过柱壁），并且在远处$\phi \approx Ux$。证明$\phi = U\bigl(r + \frac{a^2}{r}\bigr)\cos\theta$是这样的速度势，并求圆柱表面上流体的速率。
::: solution
函数$r\cos\theta = x$是调和的，$r^{-1}\cos\theta = \operatorname{Re}\frac1z$在$r > 0$上也是调和的——它是一个奇异解，由于原点不在流体中，我们可以保留它。所以$\phi$在$r > a$上调和。它的径向导数为$\phi_r = U\bigl(1 - \frac{a^2}{r^2}\bigr)\cos\theta$，在$r = a$上为零；并且当$r\to\infty$时$\phi - Ux = \frac{Ua^2}{r}\cos\theta \to 0$。在圆柱表面上，速度完全沿切向，其分量为

$$
\frac1r\phi_\theta\Big|_{r=a} = -U\left(1 + \frac{a^2}{a^2}\right)\sin\theta = -2U\sin\theta.
$$

流体在圆柱的前端和后端（$\theta = \pi$和$\theta = 0$，即**驻点**）处静止，而在顶部和底部以两倍于来流的速率运动。（在这个理想模型中，压力分布前后对称，所以圆柱不受阻力——这就是达朗贝尔（d'Alembert）佯谬，只有把黏性考虑进去才能消解。）
:::
:::

::: application 位势理论的应用
在静电学中，[[#cor-unique]]正是“镜像法”和法拉第（Faraday）笼背后的唯一性定理：在保持恒定电势的封闭导体壳内部，电势是常数，因而不论外面有什么电荷，壳内都没有电场。在数值计算中，离散的平均值性质——每个网格点上的值等于其四个相邻网格点上的值的平均——把狄利克雷问题转化为一个大型线性方程组，经典的解法是[[numerical-analysis/iterative-methods]]中的雅可比（Jacobi）迭代和高斯-赛德尔（Gauss–Seidel）迭代，其迭代步骤恰恰就是把每个值换成其邻点上的值的平均。角谷静夫（Shizuo Kakutani，1944年）给出了一种概率解释：$u(p)$等于从$p$出发的布朗运动首次离开$\Omega$时所到达的边界点处的边界值的数学期望；这是求解椭圆型方程的蒙特卡罗方法的基础。
:::

::: history
拉普拉斯方程出现在欧拉（Euler）18世纪50年代关于流体流动的工作中；18世纪80年代，皮埃尔-西蒙·拉普拉斯（Pierre-Simon Laplace）证明了物体的引力势在物体之外的空旷空间中满足这个方程，此后它成为核心课题。1813年，西梅翁·德尼·泊松（Siméon Denis Poisson）证明了在物质内部，引力势满足$\Delta V = -4\pi\rho$（按他所用的单位）。诺丁汉一位磨坊主的儿子、自学成才的乔治·格林（George Green）于1828年发表了《论数学分析在电磁理论中的应用》，其中引入了格林恒等式和格林函数；这篇论文几乎无人知晓，直到1845年才被威廉·汤姆森（William Thomson，即开尔文勋爵）重新发现。卡尔·弗里德里希·高斯（Carl Friedrich Gauss）于1840年证明了位势的平均值性质。伯恩哈德·黎曼（Bernhard Riemann）在狄利克雷（Dirichlet）讲课内容的基础上，假定狄利克雷问题总可以通过使能量$\iint\abs{\nabla u}^2$取最小值来求解——这就是“狄利克雷原理”；但在1870年，卡尔·魏尔斯特拉斯（Karl Weierstrass）证明了这类极小化问题未必存在极小元。大约在1900年，戴维·希尔伯特（David Hilbert）为这一原理恢复了名誉，为现代变分法中的直接方法开辟了道路。
:::

## 后续内容

在其他坐标系中进行分离变量，会得到新的特殊函数族：柱坐标导出贝塞尔（Bessel）方程，球坐标导出勒让德（Legendre）方程和球谐函数——它们是引力物理和原子物理的基本构件（[[ode/series-solutions]]，[[pde/sturm-liouville]]）。与复分析的联系可以通过共形映射加以系统的利用：共形映射把调和函数变为调和函数，并把难以处理的区域变为圆盘（[[complex-analysis/conformal-maps]]）。一般区域上的泊松方程用格林函数（逆矩阵的连续类比）求解，全平面上的泊松方程则用卷积求解，就像[[pde/fourier-transform]]中的热核那样。

::: summary
- 拉普拉斯方程$\Delta u = 0$支配着稳态温度、静电势和引力势以及理想流体的流动；它的解是调和函数，例如解析函数的实部和虚部。
- 边值问题在边界上给定$u$（狄利克雷问题）或$\partial u/\partial n$（诺伊曼问题）；诺伊曼问题要求$\oint h\,ds = 0$，并且只能在相差一个常数的意义下确定$u$（[[#prop-compatibility]]）。
- 在矩形上，分离变量法对一个变量给出$\sinh$，对另一个变量给出$\sin$（[[#eq-rect-solution]]）；一般的边界数据通过叠加四个问题来处理。
- 在圆盘上，$u = \frac{a_0}{2} + \sum(r/a)^n(a_n\cos n\theta + b_n\sin n\theta)$，求和后得到泊松积分公式（[[#thm-poisson]]）；在圆环上，要保留$\ln r$和$r^{-n}$。
- 调和函数在圆心处的值等于它在定义域内每个圆周以及每个圆盘上的平均值（[[#thm-mean-value]]）。
- 最大值原理：非常数的调和函数在内部没有最大值或最小值，所以在有界区域上，最大值和最小值都在边界上取到；由此得到狄利克雷问题解的唯一性与稳定性（[[#cor-unique]]）。
:::

## 习题

::: exercise 使多项式成为调和函数 {level=1 check="-3"}
常数$a$取何值时，$u(x,y) = x^3 + axy^2$是调和函数？
::: solution
$u_{xx} = 6x$，$u_{yy} = 2ax$，所以$\Delta u = (6 + 2a)x$，它恒为零当且仅当$a = -3$。（这时$u = \operatorname{Re}z^3$。）
:::
:::

::: exercise 极坐标形式的边界数据 {level=1 check="5/8"}
求解单位圆盘上边界条件为$u(1,\theta) = \cos^2\theta$的狄利克雷问题，并求$u$在点$(x, y) = (\frac12, 0)$处的值。
::: solution
由于$\cos^2\theta = \frac12 + \frac12\cos2\theta$，级数[[#eq-disc-series]]只有两项：$u = \frac12 + \frac12r^2\cos2\theta = \frac12 + \frac12(x^2 - y^2)$。在$(\frac12, 0)$处，$u = \frac12 + \frac18 = \frac58$。
:::
:::

::: exercise 正方形上的单个模态 {level=1 check="1/(2*cosh(3*pi/2))"}
在$0 < x, y < \pi$上求解$\Delta u = 0$，边界条件为：在边$x = 0$，$x = \pi$，$y = 0$上$u = 0$，且$u(x, \pi) = \sin 3x$。求$u(\pi/6, \pi/2)$。
::: solution
边界数据只是单个特征函数，所以由[[#eq-rect-solution]]，$u = \frac{\sinh 3y}{\sinh 3\pi}\sin3x$。在$(\pi/6,\pi/2)$处，$\sin\frac\pi2 = 1$，利用$\sinh2s = 2\sinh s\cosh s$得$u = \frac{\sinh(3\pi/2)}{\sinh 3\pi} = \frac{1}{2\cosh(3\pi/2)} \approx 0.009$。正方形半高处的值非常小：三次谐波离开边缘后衰减得很快。
:::
:::

::: exercise 圆环 {level=2 check="5"}
求圆环$1 < r < 2$内的调和函数，使得在$r = 1$上$u = 0$，在$r = 2$上$u = 10$，并求它在圆周$r = \sqrt2$上的值。
::: solution
试取$u = A + B\ln r$。则$A = 0$，$B\ln 2 = 10$，所以$u = \frac{10\ln r}{\ln2}$；由[[#cor-unique]]，它是唯一的解。在$r = \sqrt2$上，$u = \frac{10\cdot\frac12\ln2}{\ln2} = 5$。（取到平均温度的是两半径的几何平均，而不是算术平均。）
:::
:::

::: exercise 一个诺伊曼问题 {level=2 check="1/2"}
常数$c$取何值时，诺伊曼问题——在单位圆盘内$\Delta u = 0$，$\frac{\partial u}{\partial r}(1,\theta) = \cos^2\theta - c$——有解？对这个$c$求出所有的解。
::: solution
由[[#prop-compatibility]]，需要$\int_0^{2\pi}(\cos^2\theta - c)\,d\theta = \pi - 2\pi c = 0$，所以$c = \frac12$。这时边界数据为$\frac12\cos2\theta$。试取$u = Ar^2\cos2\theta$，得$u_r(1,\theta) = 2A\cos2\theta$，所以$A = \frac14$，解为$u = \frac14r^2\cos2\theta + C = \frac14(x^2 - y^2) + C$，其中$C$为任意常数（由下一道习题，没有其他的解）。
:::
:::

::: exercise 诺伊曼问题解的唯一性 {level=2}
设$\Omega$是边界分段光滑的有界连通区域，$w$在$\overline\Omega$上具有连续的二阶导数，在$\Omega$内$\Delta w = 0$，在$\partial\Omega$上$\partial w/\partial n = 0$。证明$w$是常数。由此推出：同一个诺伊曼问题的两个解只相差一个常数。
::: hint
对$w\nabla w$应用散度定理。
:::
::: solution
我们有$\divg(w\nabla w) = \abs{\nabla w}^2 + w\Delta w = \abs{\nabla w}^2$。由散度定理，

$$
\iint_\Omega\abs{\nabla w}^2\,dA = \oint_{\partial\Omega}w\frac{\partial w}{\partial n}\,ds = 0.
$$

被积函数连续且非负，所以在整个$\Omega$内$\nabla w = 0$；由于$\Omega$连通，$w$是常数。若$u_1$和$u_2$是同一个诺伊曼问题的解，则$w = u_1 - u_2$满足上述假设，所以$u_1 - u_2$是常数。
:::
:::

::: exercise 圆周上的最大值 {level=2}
设$u$在整个平面上调和，令$M(r) = \max_{\abs{x} = r}u(x)$。证明$M$单调不减，并且若对某个$r_1 < r_2$有$M(r_1) = M(r_2)$，则$u$在圆盘$\abs x < r_2$上为常数。
::: solution
设$r_1 < r_2$。对闭圆盘$\abs x \le r_2$应用[[#cor-unique]]，$u$在该圆盘中的每个值——特别是在圆周$\abs x = r_1$上的值——都不超过$\max_{\abs x = r_2}u = M(r_2)$。因此$M(r_1) \le M(r_2)$。

若$M(r_1) = M(r_2)$，取一点$p$，使$\abs p = r_1$且$u(p) = M(r_1)$。则$u(p) = M(r_2)$是$u$在开圆盘$\abs x < r_2$上的最大值，且在内点$p$处取到。开圆盘是连通的，所以由[[#thm-strong-max]]，$u$在其上为常数。（事实上，这时$u$在整个平面上都是常数，因为调和函数与解析函数一样，如果在某个开集上是常数，那么在包含该开集的每个连通集上都是常数；这里不加证明。）
:::
:::

::: exercise 哈纳克（Harnack）不等式 {level=3}
设$u$在闭圆盘$r \le a$上连续，在其内部调和，并且非负。证明当$r < a$时，

$$
\frac{a - r}{a + r}\,u(0) \le u(r,\theta) \le \frac{a + r}{a - r}\,u(0).
$$
::: hint
利用$(a - r)^2 \le a^2 - 2ar\cos\alpha + r^2 \le (a + r)^2$给出泊松核的上界和下界。
:::
::: solution
令$g(\theta) = u(a,\theta) \ge 0$。由[[#thm-poisson]]和[[#cor-unique]]，$u$由$g$的泊松积分给出。由于$(a - r)^2 \le a^2 - 2ar\cos\alpha + r^2 \le (a + r)^2$，且$a^2 - r^2 = (a - r)(a + r)$，

$$
\frac{a - r}{a + r} \le P(r, \alpha) \le \frac{a + r}{a - r}.
$$

乘以$g(\phi) \ge 0$，再对$\phi$求平均，得

$$
\frac{a - r}{a + r}\cdot\frac1{2\pi}\int_{-\pi}^{\pi}g \le u(r,\theta) \le \frac{a + r}{a - r}\cdot\frac{1}{2\pi}\int_{-\pi}^{\pi}g,
$$

而由于$P(0,\alpha) = 1$，$\frac{1}{2\pi}\int g = u(0)$（这就是半径为$a$的圆周上的平均值性质）。例如，单位圆盘上的正调和函数在距中心$\frac12$处的值至多为$3u(0)$。
:::
:::

::: exercise 调和函数的刘维尔（Liouville）定理 {level=3}
证明整个$\R^2$上的有界调和函数是常数。
::: hint
比较$u$在分别以$p$和$q$为圆心、半径同为$R$的两个大圆盘上的平均值。
:::
::: solution
设$\abs u \le K$，并固定点$p, q$。对任意$R > 0$，由圆盘上的平均值性质得

$$
u(p) - u(q) = \frac{1}{\pi R^2}\left(\iint_{D(p,R)}u\,dA - \iint_{D(q,R)}u\,dA\right).
$$

公共部分$D(p,R)\cap D(q,R)$上的积分相互抵消，所以$\abs{u(p) - u(q)} \le \frac{K}{\pi R^2}\operatorname{area}\bigl(D(p,R)\,\triangle\,D(q,R)\bigr)$。对称差包含在与以$p$为圆心、$R$为半径的圆周距离不超过$\abs{p-q}$的点所成的集合中（$D(q,R)\setminus D(p,R)$中的点到$p$的距离介于$R$与$R + \abs{p - q}$之间，反过来也类似），这个集合的面积为$\pi\bigl((R + d)^2 - (R - d)^2\bigr) = 4\pi Rd$，其中$d = \abs{p - q}$（设$R > d$）。因此

$$
\abs{u(p) - u(q)} \le \frac{K\cdot4\pi R\,d}{\pi R^2} = \frac{4Kd}{R} \longrightarrow 0 \quad (R\to\infty).
$$

所以对所有$p, q$都有$u(p) = u(q)$：$u$是常数。
:::
:::
