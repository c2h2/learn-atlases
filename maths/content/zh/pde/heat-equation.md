把一根金属杆的中部加热，然后把它的两端插入冰水中。随着时间推移，杆上各处的温度如何变化？直觉告诉我们：热的中部会冷却，冷的两端会使邻近部分变冷，尖锐的温差会被抹平，最终一切都稳定在两端的温度上。**热方程**（又称热传导方程）

$$
u_t = k\,u_{xx}
$$

把这种直觉变成了数学。这里$u(x, t)$是时刻$t$位于$x$处的温度，下标表示偏导数，$k > 0$是一个材料常数。这正是约瑟夫·傅里叶（Joseph Fourier）在1807年写下的方程，他正是为了求解它才发明了傅里叶级数。

本章由能量守恒推导出这个方程，用**分离变量法**在区间上求解它，并处理最常见的边界条件：两端保持固定温度，以及两端绝热。然后我们证明两个与任何公式同样重要的定性定理：用能量论证证明的**唯一性**，以及**最大值原理**——它是说，没有热源的杆绝不会变得比它的初始温度和边界温度中的最高者更热。在此过程中，我们将看到扩散的本质特征：它瞬间就把一切变得光滑，并且以指数速度忘掉自己的过去。

## 热方程的推导

考虑沿$x$轴从$x = 0$到$x = L$放置的一根细杆，其横截面积$A$为常数，侧面绝热，所以热量只能沿杆流动。设$u(x,t)$为温度，$\rho$为密度，$c$为比热容（使单位质量的温度升高一度所需的能量）。于是小段$[a, b]$中的热能为

$$
\int_a^b c\rho A\,u(x, t)\,dx.
$$

设$\phi(x,t)$为**热通量**：单位时间内沿$x$轴正方向流过$x$处横截面单位面积的能量。能量是守恒的，所以$[a, b]$中的能量只能通过穿过两端的热通量而改变（如果存在内部热源，还要加上单位体积强度为$Q(x,t)$的热源的贡献）：

$$
\frac{d}{dt}\int_a^b c\rho A\,u\,dx = A\,\phi(a, t) - A\,\phi(b, t) + \int_a^b A\,Q\,dx.
$$

利用$\phi(a,t) - \phi(b,t) = -\int_a^b\phi_x\,dx$，并在积分号下求导，就得到对**每个**区间$[a, b]$都有$\int_a^b\bigl(c\rho\,u_t + \phi_x - Q\bigr)\,dx = 0$。如果被积函数连续，它就必须恒为零：假如它在某一点处为正，它就会在该点附近的一个小区间上为正，从而它在这个区间上的积分为正。因此

$$
c\rho\,u_t = -\phi_x + Q.
$$

这个守恒律还需要一个把热通量与温度联系起来的**本构关系**。**傅里叶热传导定律**是说，热量从热处流向冷处，流动的速率与温度梯度成正比：$\phi = -K_0\,u_x$，其中$K_0 > 0$是热导率。代入上式，并假定$c$、$\rho$、$K_0$为常数且没有热源，得

$$
u_t = k\,u_{xx}, \qquad k = \frac{K_0}{c\rho}.
$$ {#eq-heat}

常数$k$称为**热扩散系数**，单位为$(\text{长度})^2/\text{时间}$。铜的$k \approx 1.1\ \mathrm{cm^2/s}$，钢约为$0.12\ \mathrm{cm^2/s}$，水约为$0.0014\ \mathrm{cm^2/s}$。在二维或三维情形，利用散度定理（[[multivariable/stokes-divergence]]）作同样的论证，得到$u_t = k\,\Delta u$，其中$\Delta u = u_{xx} + u_{yy} + u_{zz}$是拉普拉斯算子。

::: intuition 方程说了什么
二阶导数把一个值与它邻近的值相比较：由泰勒定理，

$$
u_{xx}(x,t) \approx \frac{u(x+h, t) + u(x-h, t) - 2u(x,t)}{h^2} = \frac{2}{h^2}\left[\frac{u(x+h,t) + u(x-h,t)}{2} - u(x,t)\right].
$$

所以热方程是说：**一点处的温度上升的速率，与它低于邻近温度平均值的程度成正比**；如果它高于平均值，温度就下降。峰（$u_{xx} < 0$）被削平，谷（$u_{xx} > 0$）被填平。本章的每一个定性性质背后都是这一机制。
:::

仅凭偏微分方程并不能确定温度；我们还必须说明杆的初始状态，以及杆的两端发生什么。

::: definition 热方程的初边值问题 {#def-ibvp}
$0 < x < L$，$t > 0$上的**初边值问题**（IBVP）由热方程[[#eq-heat]]、**初始条件**$u(x, 0) = f(x)$（$0 \le x \le L$）以及每个端点处的一个边界条件组成。标准的边界条件类型（写在$x = 0$处）有：

- **狄利克雷（Dirichlet）条件**（第一类边界条件）：$u(0,t) = g(t)$——端点保持在给定的温度；
- **诺伊曼（Neumann）条件**（第二类边界条件）：$u_x(0,t) = g(t)$——给定通过端点的热通量；$u_x(0,t) = 0$表示该端点**绝热**；
- **罗宾（Robin）条件**（第三类边界条件）：$u_x(0, t) = h\,\bigl(u(0,t) - g(t)\bigr)$，其中$h > 0$——端点按牛顿冷却定律向温度为$g(t)$的周围环境散热（在$x = L$处，$h$的符号相反）。

若$g = 0$，就称边界条件是**齐次**的。**古典解**是指这样的函数$u$：它在$[0, L]\times[0,\infty)$上连续，$u_t$和$u_{xx}$在$t > 0$时连续，并且满足上述全部三项要求。
:::

## 分离变量法

从最简单的完整问题开始：两端保持温度为$0$。

$$
u_t = k\,u_{xx} \ \ (0 < x < L,\ t > 0), \qquad u(0, t) = u(L, t) = 0, \qquad u(x, 0) = f(x).
$$ {#eq-dirichlet-problem}

**分离变量法**的思想是：暂时不管初始条件，先寻找具有特殊形式$u(x,t) = X(x)\,T(t)$的解。代入偏微分方程得$X(x)T'(t) = k\,X''(x)T(t)$，再除以$kXT$，得

$$
\frac{T'(t)}{k\,T(t)} = \frac{X''(x)}{X(x)}.
$$

左边与$x$无关，右边与$t$无关。一个只依赖于$t$的函数若等于一个只依赖于$x$的函数，它就必为常数，所以两边都等于同一个常数，记为$-\lambda$：

$$
X'' + \lambda X = 0, \qquad T' = -\lambda k\,T.
$$

边界条件$u(0,t) = X(0)T(t) = 0$和$u(L, t) = 0$要求（对非零解而言）$X(0) = X(L) = 0$。所以$X$必须满足一个常微分方程的**边值问题**，而只有某些特殊的$\lambda$值才允许非零解。

::: proposition 狄利克雷特征值问题 {#prop-dirichlet-eigen}
问题$X'' + \lambda X = 0$，$X(0) = X(L) = 0$有非零解，当且仅当

$$
\lambda = \lambda_n = \left(\frac{n\pi}{L}\right)^2, \quad n = 1, 2, 3, \dots,
$$

此时$X$是$X_n(x) = \sin\dfrac{n\pi x}{L}$的非零倍数。数$\lambda_n$称为该问题的**特征值**，$X_n$称为该问题的**特征函数**。
:::

::: proof
我们分三种情形求解这个常系数常微分方程（见[[ode/second-order-linear]]）。

**情形$\lambda < 0$。**记$\lambda = -\mu^2$，$\mu > 0$。则$X = A\cosh\mu x + B\sinh\mu x$。条件$X(0) = 0$给出$A = 0$，而由于$\sinh\mu L > 0$，$X(L) = B\sinh\mu L = 0$迫使$B = 0$。只有零解。

**情形$\lambda = 0$。**此时$X = A + Bx$，由$X(0) = X(L) = 0$得$A = B = 0$。

**情形$\lambda > 0$。**记$\lambda = \mu^2$，$\mu > 0$。则$X = A\cos\mu x + B\sin\mu x$。由$X(0) = 0$得$A = 0$；于是$X(L) = B\sin\mu L = 0$有$B \ne 0$的解，当且仅当$\sin\mu L = 0$，即对某个正整数$n$有$\mu L = n\pi$。所以$\lambda = (n\pi/L)^2$，$X = B\sin(n\pi x/L)$。
:::

证明$\lambda > 0$的另一种论证可以推广得远得多。用$X$乘$X'' + \lambda X = 0$并分部积分：$\lambda\int_0^LX^2\,dx = -\int_0^L XX''\,dx = -\bigl[XX'\bigr]_0^L + \int_0^L(X')^2\,dx = \int_0^L(X')^2\,dx$，这是因为$X(0) = X(L) = 0$。所以$\lambda \ge 0$；而$\lambda = 0$会迫使$X' \equiv 0$，从而$X$是常数，因而为零。这一“能量”论证是[[pde/sturm-liouville]]的萌芽。

当$\lambda = \lambda_n$时，关于时间的方程给出$T(t) = e^{-k\lambda_n t}$，所以每个

$$
u_n(x,t) = e^{-k(n\pi/L)^2t}\sin\frac{n\pi x}{L}
$$

都满足偏微分方程和边界条件。它们是杆的**简正模**：每个简正模保持自身的形状并按指数衰减，第$n$个的衰减率为$k(n\pi/L)^2$。偏微分方程和边界条件都是线性齐次的，所以简正模的任何（收敛的）叠加仍然是解。为了满足初始条件，我们选取系数，使叠加在$t = 0$时等于$f$：

$$
u(x,t) = \sum_{n=1}^{\infty}b_n\,e^{-k(n\pi/L)^2t}\sin\frac{n\pi x}{L}, \qquad b_n = \frac{2}{L}\int_0^Lf(x)\sin\frac{n\pi x}{L}\,dx.
$$ {#eq-heat-series}

$b_n$恰好是$f$的半区间正弦级数的系数（[[pde/fourier-series#def-half-range]]）。这正是傅里叶当初需要他的级数的原因。

::: theorem 级数解 {#thm-heat-series}
设$f$在$[0, L]$上分段连续，并由[[#eq-heat-series]]定义$u$。

1. 级数在$0 \le x \le L$，$t > 0$时收敛；$u$在$[0, L]\times(0, \infty)$上无穷次可微，在那里满足$u_t = k\,u_{xx}$，并且$u(0, t) = u(L, t) = 0$。
2. 如果此外$f$连续且分段光滑，并且$f(0) = f(L) = 0$，那么$u$在$[0, L]\times[0,\infty)$上连续且$u(x, 0) = f(x)$，所以$u$是[[#eq-dirichlet-problem]]的古典解。
:::

::: proof
1. 对$f$的奇延拓应用贝塞尔（Bessel）不等式（[[pde/fourier-series#cor-bessel]]），可知$b_n$有界，设$\abs{b_n} \le B$。固定$t_0 > 0$和整数$i, j \ge 0$。把第$n$项对$t$求$i$次导数、对$x$求$j$次导数，所得函数在$t \ge t_0$时以下式为界：

$$
M_n = B\left(k\frac{n^2\pi^2}{L^2}\right)^i\left(\frac{n\pi}{L}\right)^je^{-k(n\pi/L)^2t_0}.
$$

指数因子压倒$n$的任何幂次，所以$\sum M_n < \infty$（例如可用比值判别法）。由魏尔斯特拉斯（Weierstrass）M 判别法，级数的每个逐项导数都在$[0, L]\times[t_0, \infty)$上一致收敛，因此（[[real-analysis/uniform-convergence]]）$u$在那里具有各阶连续偏导数，并且它们可以通过逐项求导得到。每一项都满足$\partial_t u_n = -k\lambda_n u_n = k\,\partial_{xx}u_n$，并在$x = 0$和$x = L$处为零，所以$u$也是如此。由于$t_0 > 0$是任意的，第1部分得证。

2. 现在$f$的以$2L$为周期的奇延拓是连续的（这里需要$f(0) = f(L) = 0$），并且分段光滑，所以由[[pde/fourier-series#thm-uniform]]，$\sum\abs{b_n} < \infty$。对所有$t \ge 0$，第$n$项以$\abs{b_n}$为界，所以级数在$[0, L]\times[0,\infty)$上一致收敛，$u$在那里连续。在$t = 0$时，它就是$f$的正弦级数，由[[pde/fourier-series#thm-dirichlet]]，它收敛到$f$。
:::

::: remark 不相容的数据
物理上重要的初始数据常常不满足$f(0) = f(L) = 0$：例如一根温度均匀为$100^\circ$的杆，两端突然被放入冰中。第1部分仍然给出$t > 0$时的光滑解，并且该解在均方意义下取到初始数据：由帕塞瓦尔（Parseval）恒等式，

$$
\int_0^L\bigl(u(x,t) - f(x)\bigr)^2\,dx = \frac{L}{2}\sum_{n=1}^{\infty}b_n^2\bigl(1 - e^{-k\lambda_nt}\bigr)^2 \longrightarrow 0 \quad (t\to0^+),
$$

这是因为每一项都趋于$0$且至多为$b_n^2$，而$\sum b_n^2 < \infty$。（还可以证明，在$f$连续的每个内点处都有$u(x,t) \to f(x)$。）
:::

::: example 抛物线形的初始温度分布 {#ex-parabola}
在$0 < x < \pi$上求解$u_t = u_{xx}$，其中$u(0, t) = u(\pi, t) = 0$，$u(x, 0) = x(\pi - x)$，并描述$t$很大时解的性态。
::: solution
这里$L = \pi$，$k = 1$，$\lambda_n = n^2$。$x(\pi - x)$的正弦系数已在[[pde/fourier-series#ex-half-range]]中算出：当$n$为奇数时$b_n = \frac{8}{\pi n^3}$，当$n$为偶数时为$0$。由于$f$连续、分段光滑且在两端为零，由[[#thm-heat-series]]得到古典解

$$
u(x,t) = \frac{8}{\pi}\left(e^{-t}\sin x + \frac{e^{-9t}}{27}\sin 3x + \frac{e^{-25t}}{125}\sin 5x + \cdots\right).
$$

每个更高阶的模都衰减得更快，**而且**初始振幅更小。在$t = 0.5$时，第二个非零项与第一个非零项的振幅之比为$\frac{1}{27}e^{-8\cdot 0.5} \approx 7\times10^{-4}$，所以从那时起，$u(x,t) \approx \frac{8}{\pi}e^{-t}\sin x$的精度极高：杆忘掉了初始状态的细节，按第一个模的形状冷却。
:::
:::

::: widget heat
equation: heat
f: if(x < pi/2, x, pi - x)
L: pi
k: 1
boundary: dirichlet
terms: 40
caption: 两端保持为$0$的杆上的三角形温度分布。播放动画，观察顶部的尖角立即消失——对每个$t>0$，解都是光滑的——同时整个温度分布逐渐趋向第一个模$\sin x$的形状，并像$e^{-t}$那样衰减。试试更大的扩散系数$k$：同样的图像会按比例提前出现。
:::

::: example 热杆的骤冷 {#ex-cooling}
一根长$L = 50\ \mathrm{cm}$的铜杆（$k = 1.11\ \mathrm{cm^2/s}$），侧面绝热，温度均匀为$100^\circ\mathrm{C}$，此时把它的两端放入$0^\circ\mathrm C$的冰水中。求温度分布，并估计杆的中心何时冷却到$50^\circ\mathrm C$。
::: solution
$f = 100$的正弦系数为$b_n = \frac{2}{L}\int_0^L100\sin\frac{n\pi x}{L}\,dx = \frac{200\bigl(1 - (-1)^n\bigr)}{n\pi}$，即当$n$为奇数时为$\frac{400}{n\pi}$，当$n$为偶数时为$0$。所以

$$
u(x,t) = \frac{400}{\pi}\sum_{n\ \text{为奇数}}\frac1n\,e^{-k n^2\pi^2t/L^2}\sin\frac{n\pi x}{L}.
$$

在中心处，当$n = 2j + 1$时$\sin(n\pi/2) = (-1)^j$，所以

$$
u\bigl(\tfrac L2, t\bigr) = \frac{400}{\pi}\left(e^{-t/\tau} - \frac13e^{-9t/\tau} + \frac15e^{-25t/\tau} - \cdots\right), \qquad \tau = \frac{L^2}{k\pi^2} = \frac{2500}{1.11\,\pi^2}\ \mathrm{s} \approx 228\ \mathrm{s}.
$$

只保留第一项，由$\frac{400}{\pi}e^{-t/\tau} = 50$得$t = \tau\ln\frac{8}{\pi} \approx 228 \times 0.935 \approx 213\ \mathrm{s}$。此时第二项的大小为$\frac{400}{3\pi}e^{-9\times0.935} \approx 0.01^\circ$，所以这个近似非常好：中心大约在$3.6$分钟后达到$50^\circ\mathrm C$。（取很多项求解得到$213.3\ \mathrm{s}$。）时间尺度$\tau$与$L^2$成正比：长度加倍的杆，冷却所需的时间是原来的四倍。
:::
:::

::: widget plot
f: sum(4/(pi*(2*j + 1))*exp(-(2*j + 1)^2*t)*sin((2*j + 1)*x), j, 0, 40); 4/pi*exp(-t)*sin(x)
x: 0, pi
y: 0, 1.3
sliders: t=0:0:1.5:0.005
labels: u(x,t)\ \text{（41 项）}; \tfrac{4}{\pi}e^{-t}\sin x
caption: [[#ex-cooling]]中的杆的无量纲形式（$L = \pi$，$k = 1$，初始温度为$1$）。在$t = 0$时，部分和呈现出方形的初始温度分布及其吉布斯过冲。把$t$移到略大于$0$处：尖角立刻变圆。到$t \approx 0.3$时，解已经与单独的第一个模（第二条曲线）无法区分，此后它只是单纯地衰减。
:::

::: quiz
在对[[#eq-dirichlet-problem]]作分离变量$u = X(x)T(t)$时，为什么不需要分离常数$\lambda \le 0$的解？
- [ ] 它们随时间按指数增长，这不符合物理实际。
- [x] 当$\lambda \le 0$时，$X'' + \lambda X = 0$满足$X(0) = X(L) = 0$的唯一解是$X \equiv 0$。
- [ ] 它们不满足热方程。
- [ ] 它们是需要的，只是其系数结果为零。
::: solution
[[#prop-dirichlet-eigen]]表明，当$\lambda < 0$和$\lambda = 0$时，边界条件迫使$X = 0$。物理上是否合理，本身并不是有效的论据——排除这些值的是边界条件。（在其他边界条件下，例如两端绝热时，$\lambda = 0$**确实**是特征值，必须保留。）
:::
:::

## 绝热端与非零端点温度

### 绝热端

如果两端都绝热，边界条件就变为$u_x(0, t) = u_x(L, t) = 0$。这时分离变量导出$X'' + \lambda X = 0$，$X'(0) = X'(L) = 0$。重复[[#prop-dirichlet-eigen]]中的分情形讨论：当$\lambda < 0$时只有$X = 0$；当$\lambda = 0$时每个**常数**都满足；当$\lambda = \mu^2 > 0$时，$X = A\cos\mu x + B\sin\mu x$，由$X'(0) = \mu B = 0$和$X'(L) = -\mu A\sin\mu L = 0$得$\mu = n\pi/L$。特征函数为$1, \cos\frac{\pi x}{L}, \cos\frac{2\pi x}{L}, \dots$，解是一个**余弦级数**：

$$
u(x,t) = \frac{a_0}{2} + \sum_{n=1}^{\infty}a_n\,e^{-k(n\pi/L)^2t}\cos\frac{n\pi x}{L}, \qquad a_n = \frac2L\int_0^Lf(x)\cos\frac{n\pi x}{L}\,dx.
$$ {#eq-neumann-series}

当$t\to\infty$时，$u \to \frac{a_0}{2} = \frac1L\int_0^Lf\,dx$：杆的温度趋于初始温度的平均值。这恰好是能量守恒所预言的。

::: proposition 热量守恒 {#prop-conservation}
若$u$是$[0, L]$上两端绝热的热方程的古典解，且$u_x$在$[0, L]\times(0,\infty)$上连续，则总热量$H(t) = \int_0^L u(x,t)\,dx$是常数。
:::

::: proof
在积分号下求导，并利用偏微分方程，得

$$
H'(t) = \int_0^Lu_t\,dx = k\int_0^Lu_{xx}\,dx = k\bigl[u_x(L,t) - u_x(0,t)\bigr] = 0.
$$
:::

::: warning 不要丢掉常数模
两端绝热时，$\lambda = 0$是特征值，常数项$\frac{a_0}{2}$是解中最重要的一项：它就是最终状态。一个常见的错误是照搬狄利克雷情形的分析，舍弃$\lambda = 0$，从而得出温度趋于$0$的结论——这意味着热量会从完全绝热的两端逸出。对每一组新的边界条件，务必重新逐一讨论$\lambda<0$、$\lambda=0$、$\lambda>0$三种情形。
:::

::: example 绝热杆 {#ex-insulated}
一根长为$L$、两端绝热的杆，初始温度为$f(x) = x$。求$u(x,t)$及其极限。
::: solution
余弦系数为$a_0 = \frac{2}{L}\int_0^Lx\,dx = L$；当$n \ge 1$时，分部积分得

$$
a_n = \frac{2}{L}\int_0^Lx\cos\frac{n\pi x}{L}\,dx = \frac{2}{L}\left[\frac{Lx}{n\pi}\sin\frac{n\pi x}{L} + \frac{L^2}{n^2\pi^2}\cos\frac{n\pi x}{L}\right]_0^L = \frac{2L\bigl((-1)^n - 1\bigr)}{n^2\pi^2},
$$

当$n$为奇数时它等于$-\frac{4L}{n^2\pi^2}$，当$n$为偶数时等于$0$。由[[#eq-neumann-series]]，

$$
u(x,t) = \frac L2 - \frac{4L}{\pi^2}\sum_{n\ \text{为奇数}}\frac{1}{n^2}e^{-kn^2\pi^2t/L^2}\cos\frac{n\pi x}{L}.
$$

当$t\to\infty$时，杆达到均匀温度$\frac L2$，即$f$的平均值。热量从热端流向冷端，但无法离开杆。
:::
:::

::: widget heat
equation: heat
f: if(x < pi/2, 1, 0)
L: pi
k: 1
boundary: neumann
terms: 40
caption: 两端绝热：杆的左半部分初始温度为$1$，右半部分为$0$。播放动画。跳跃瞬间被抹平，两端的斜率始终为零，温度分布最终拉平为平均温度$\tfrac12$——曲线下方的面积始终不变。与上面狄利克雷情形的图比较，那里的一切都流失到$0$。
:::

### 非零端点温度

设两端保持恒定温度$u(0,t) = T_1$和$u(L,t) = T_2$。这时不能直接应用叠加原理，因为两个解之和的端点值是$2T_1$、$2T_2$。补救的办法是减去**稳态**：即与时间无关的解$v(x)$，它满足$v'' = 0$，$v(0) = T_1$，$v(L) = T_2$，所以

$$
v(x) = T_1 + (T_2 - T_1)\frac{x}{L}.
$$

于是$w = u - v$满足热方程（因为$v_t = 0 = k\,v_{xx}$）、**齐次**条件$w(0,t) = w(L,t) = 0$以及$w(x,0) = f(x) - v(x)$。用[[#eq-heat-series]]求出$w$，再令$u = v + w$。当$t\to\infty$时，$w \to 0$，$u \to v$：温度在两端值之间变成线性分布。

::: example 加热一端 {#ex-steady}
一根$L = \pi$、$k = 1$的杆初始温度为$0$。从$t = 0$起，端点$x = \pi$保持在$100$，端点$x = 0$保持在$0$。求$u(x,t)$。
::: solution
稳态为$v(x) = \frac{100x}{\pi}$。于是$w = u - v$的端点值为零，且$w(x,0) = -\frac{100x}{\pi}$。$x$在$(0,\pi)$上的正弦系数为$\frac{2(-1)^{n+1}}{n}$（[[pde/fourier-series#ex-sawtooth]]），所以$w(x, 0)$的正弦系数为$-\frac{100}{\pi}\cdot\frac{2(-1)^{n+1}}{n} = \frac{200(-1)^n}{n\pi}$。因此

$$
u(x,t) = \frac{100x}{\pi} + \frac{200}{\pi}\sum_{n=1}^{\infty}\frac{(-1)^n}{n}e^{-n^2t}\sin nx.
$$

在$t = 0$处验证：当$0 \le x < \pi$时，级数等于$-\frac{100}{\pi}\cdot 2\sum\frac{(-1)^{n+1}}{n}\sin nx = -\frac{100x}{\pi}$，所以在那里$u(x,0) = 0$。当$t$很大时，衰减最慢的修正项是$-\frac{200}{\pi}e^{-t}\sin x$，它是负的：杆从下方趋于它的线性稳态。
:::
:::

## 用能量方法证明唯一性

我们已经构造出了解；它们是唯一的解吗？如果同样的数据可以演化出两个不同的温度分布，这个模型就毫无用处了。第一个唯一性证明使用一种只会减小的“能量”（严格地说，是温度平方的积分）。

::: theorem 唯一性 {#thm-energy-unique}
设$F(x,t)$、$f(x)$、$g(t)$和$h(t)$是给定的函数。问题

$$
u_t = k\,u_{xx} + F \ \ (0<x<L,\ 0 < t \le T), \qquad u(x,0) = f(x), \qquad u(0,t) = g(t),\ \ u(L,t) = h(t)
$$

至多有一个这样的解$u$：它在$[0, L]\times[0, T]$上连续，且$u_t$、$u_x$、$u_{xx}$在$[0, L]\times(0, T]$上连续。把其中任一个狄利克雷条件换成诺伊曼条件，结论同样成立。
:::

::: proof
设$u_1, u_2$是两个这样的解，$w = u_1 - u_2$。则$w_t = k\,w_{xx}$（源项$F$相互抵消），$w(x,0) = 0$，并且在每个端点处$w = 0$（在诺伊曼情形下为$w_x = 0$）。定义

$$
E(t) = \int_0^Lw(x,t)^2\,dx \ge 0.
$$

$E$在$[0, T]$上连续，$E(0) = 0$；当$0 < t \le T$时，在积分号下求导并分部积分，得

$$
E'(t) = 2\int_0^Lw\,w_t\,dx = 2k\int_0^Lw\,w_{xx}\,dx = 2k\bigl[w\,w_x\bigr]_{x=0}^{x=L} - 2k\int_0^Lw_x^2\,dx = -2k\int_0^Lw_x^2\,dx \le 0,
$$

这是因为在每个端点处，$w$或$w_x$为零。由中值定理，$E$在$[0,T]$上不增，所以$0 \le E(t) \le E(0) = 0$。因此$E \equiv 0$，又由于$w$连续，$w \equiv 0$：两个解相同。
:::

把同样的计算应用于满足齐次边界条件的单个解，可知$\int_0^Lu^2\,dx$随时间减小：扩散是耗散的。在习题中，你将把这一结论加强为指数衰减。

## 最大值原理

第二个定性定理是“热量从热处流向冷处”的精确表述。在矩形$R = [0, L]\times[0,T]$中，把底边和两条侧边

$$
\Gamma = \bigl\{(x, 0) : 0 \le x \le L\bigr\}\cup\bigl\{(0, t) : 0 \le t \le T\bigr\}\cup\bigl\{(L, t) : 0 \le t \le T\bigr\},
$$

称为**抛物边界**。初边值问题的数据就给在这里；顶边$t = T$不属于抛物边界。

::: theorem 弱最大值原理 {#thm-max}
设$u$在$R = [0,L]\times[0,T]$上连续，$u_t$和$u_{xx}$在$(0,L)\times(0,T]$上连续，并且在那里$u_t = k\,u_{xx}$。则

$$
\max_R u = \max_\Gamma u \qquad\text{且}\qquad \min_R u = \min_\Gamma u.
$$

用文字来说：$u$的最大值和最小值在矩形的底边或侧边上取到。
:::

::: proof
对$-u$应用关于最大值的结论，即得关于最小值的结论，所以我们只证明前者。令$M = \max_\Gamma u$。

**第1步：严格版本。**设$\eps > 0$，$v(x,t) = u(x,t) + \eps x^2$。则在$(0, L)\times(0,T]$中$v_t - k\,v_{xx} = u_t - k\,u_{xx} - 2k\eps = -2k\eps < 0$。连续函数$v$在紧集$R$上于某点$(x_0, t_0)$处取到最大值。假设该点不在$\Gamma$上，于是$0 < x_0 < L$且$0 < t_0 \le T$。作为$x$的函数，$v(\cdot, t_0)$在内点$x_0$处取到最大值，所以$v_{xx}(x_0, t_0) \le 0$。作为$(0, t_0]$上$t$的函数，$v(x_0, \cdot)$在$t_0$处最大，所以$v_t(x_0, t_0) \ge 0$（若$t_0 < T$，它等于$0$；若$t_0 = T$，则从下方取的单侧差商都$\ge 0$）。于是在$(x_0, t_0)$处$v_t - k\,v_{xx} \ge 0$，这与$v_t - k\,v_{xx} < 0$矛盾。因此$v$的最大值在$\Gamma$上取到。

**第2步：令$\eps\to0$。**对$R$中的每一点，

$$
u(x,t) \le v(x,t) \le \max_\Gamma v \le \max_\Gamma u + \eps L^2 = M + \eps L^2.
$$

由于$\eps > 0$是任意的，在$R$上$u \le M$。最大值$M$在$\Gamma$上取到，所以$\max_R u = M$。
:::

::: intuition 为什么要排除顶边
最大值**可以**出现在顶边$t = T$上——但前提是它也出现在$\Gamma$上。这个定理真正的内容是：杆的内部不会产生新的热点。在内部的最大值点处，温度高于邻近温度的平均值，所以按照上面的直观解释，温度必定在下降，而不是上升。证明中的扰动$\eps x^2$把“不上升”变成了导出矛盾所需的严格不等式。
:::

::: corollary 唯一性、稳定性与比较原理 {#cor-max}
设$u_1$和$u_2$是$R$上热方程的解，具有[[#thm-max]]中的正则性。

1. **比较原理：**若在$\Gamma$上$u_1 \le u_2$，则在整个$R$上$u_1 \le u_2$。
2. **稳定性：**$\displaystyle\max_R\abs{u_1 - u_2} = \max_\Gamma\abs{u_1 - u_2}$。
3. **唯一性：**狄利克雷问题（给定$f$、$g$、$h$）至多有一个在$R$上连续的解。
:::

::: proof
差$w = u_2 - u_1$满足热方程。对于1，$\min_R w = \min_\Gamma w \ge 0$。对于2，对$w$和$-w$应用[[#thm-max]]：$\max_R w \le \max_\Gamma\abs{w}$，$\max_R(-w) \le \max_\Gamma\abs{w}$。对于3，同一狄利克雷问题的两个解在$\Gamma$上相同，所以由2，它们在$R$上相同。
:::

第2部分就是**解对数据的连续依赖性**：如果初始温度和边界温度的改变量至多为$\delta$，那么解在任何地点、任何时刻的改变量也至多为$\delta$。注意，与[[#thm-energy-unique]]不同，这个唯一性证明不需要导数一直连续到边界。存在性（[[#thm-heat-series]]）、唯一性和连续依赖性合在一起，表明狄利克雷问题在阿达马（Hadamard）意义下是**适定**的。

::: example 由最大值原理得到的界 {#ex-bounds}
证明[[#ex-parabola]]的解在$0 \le x \le \pi$，$t \ge 0$时满足$\frac{\pi^2}{4}e^{-t}\sin x \le u(x,t) \le \pi e^{-t}\sin x$。
::: solution
函数$v_\pm(x,t) = c_\pm e^{-t}\sin x$（其中$c_- = \frac{\pi^2}{4}$，$c_+ = \pi$）是端点值为零的热方程的解。在$\Gamma$的两条侧边上，$v_-$、$u$、$v_+$三者都为零，所以由[[#cor-max]]，只需比较初始值：

$$
\frac{\pi^2}{4}\sin x \le x(\pi - x) \le \pi\sin x \qquad (0 \le x \le \pi).
$$

对于右边的不等式，令$g(x) = \pi\sin x - x(\pi - x)$，它关于$\frac\pi2$对称，所以只需考虑$[0, \frac\pi2]$。我们有$g(0) = g'(0) = 0$以及$g''(x) = 2 - \pi\sin x$，它在$[0, x_*]$上$\ge 0$，在$[x_*, \frac\pi2]$上$\le 0$，其中$\sin x_* = \frac2\pi$。在$[0, x_*]$上，$g$是凸函数，所以位于它在$0$处的切线（即零直线）上方。在$[x_*, \frac\pi2]$上，$g$是凹函数，所以位于连接其端点值$g(x_*) \ge 0$与$g(\frac\pi2) = \pi - \frac{\pi^2}{4} > 0$的弦的上方。因此$g \ge 0$。左边的不等式可用$h(x) = x(\pi - x) - \frac{\pi^2}{4}\sin x$同样地证明：这里$h(0) = h(\frac\pi2) = h'(\frac\pi2) = 0$，而$h''(x) = \frac{\pi^2}{4}\sin x - 2$在$[0, \frac\pi2]$上恰好变号一次，由负变正。在凸的部分，$h$位于它在$\frac\pi2$处的切线（零直线）上方；在凹的部分，它位于一条端点值非负的弦的上方，所以$h \ge 0$。所以对所有$t$，最高温度$u(\frac\pi2, t)$介于$2.467e^{-t}$与$3.142e^{-t}$之间；事实上，$u(\frac\pi2, \frac12) \approx 1.543$确实介于$1.497$与$1.905$之间。
:::
:::

::: quiz
$u_t = u_{xx}$在$[0,1]\times[0,2]$上的一个解满足$u(x,0) = \sin\pi x$，$u(0,t) = 0$，$u(1,t) = t/4$。下列哪些结论必定成立？
- [x] 对矩形中的所有$(x,t)$，$0 \le u(x,t) \le 1$。
- [ ] 对每个$x$，$u(x, 2) \le u(x, 0)$。
- [ ] $u$的最大值只在$t = 0$处取到。
- [x] 对矩形中的所有$(x,t)$，$u(x,t) \ge 0$。
::: solution
在抛物边界上，$u$的值分别为$\sin\pi x \in [0,1]$、$0$和$t/4 \in [0, \tfrac12]$。由[[#thm-max]]，$\min_\Gamma u = 0 \le u \le 1 = \max_\Gamma u$，这就给出了两个正确选项。最大值原理是把内部与**整个**抛物边界相比较，而不是只与初始值相比较，所以它不能推出逐点的$u(x,2) \le u(x,0)$（在$x = 1$附近，$u(x,2)$接近$\tfrac12 > \sin\pi x$）。另外，最大值也可能在别处取到；定理只保证它在$\Gamma$上取到。
:::
:::

## 光滑化、衰减与不可逆性

[[#eq-heat-series]]中的因子$e^{-k(n\pi/L)^2t}$解释了扩散的特性。

- **瞬时光滑化。**对任何$t > 0$，高频成分都被$e^{-cn^2t}$这样的因子抑制，所以即使$f$有跳跃，解也是无穷次可微的（[[#thm-heat-series]]）。尖角和间断立即消失。
- **遗忘。**当$t$很大时，第一个模占主导地位，$u \approx b_1e^{-k\pi^2t/L^2}\sin\frac{\pi x}{L}$。弛豫时间$L^2/(k\pi^2)$随长度的**平方**增长：在时间$t$内，扩散把热量传播到量级为$\sqrt{kt}$的距离上。
- **不可逆性。**让时间倒流会把第$n$个模乘以$e^{+k(n\pi/L)^2t}$，它会爆炸性地增长。

::: warning 热方程不能倒过来求解
人们很容易想到：从今天的测量值出发，“沿时间倒退”地求解热方程，以恢复早先的温度分布。这个问题是**不适定**的。在$(0,\pi)$上、时刻$t = 1$的数据$\frac1n\sin nx$在$n$很大时极小，但取到这些数据的、端点值为零的唯一解却来自$u(x, 0) = \frac{e^{n^2}}{n}\sin nx$，而它大得像天文数字。终值数据中任意小的误差（所有测量都有误差）可能对应于初始数据中任意大的差异。扩散会破坏信息，没有额外的假设，这些信息就无法恢复。
:::

::: application 无处不在的扩散
同一个方程支配着一切通过局部随机运动而扩散的量。由菲克（Fick）扩散定律，溶解物质的浓度满足$c_t = D\,c_{xx}$。布朗粒子的概率密度服从热方程，这把本章与随机游走和中心极限定理（[[probability/limit-theorems]]）联系了起来。期权定价的布莱克-斯科尔斯（Black–Scholes）方程经过变量代换后就成为热方程。在图像处理中，用方差为$\sigma^2$的高斯滤波器模糊一幅图像，恰好就是让二维热方程运行时间$t = \sigma^2/(2k)$，这就是高斯模糊首先去除细微细节（高频成分）的原因。
:::

::: history
约瑟夫·傅里叶（Joseph Fourier，1768—1830）是在格勒诺布尔担任伊泽尔省省长期间发展出他的热理论的，这一行政职务是拿破仑（Napoleon）授予他的。1807年，他向法兰西研究院（Institut de France）提交了一篇论文，从如今以他命名的热传导定律推导出热方程，并用三角级数求解。包括拉格朗日（Lagrange）和拉普拉斯（Laplace）在内的审查人反对他对“任意”函数随意使用级数，论文没有发表。随后，研究院把热的传播定为1811年有奖征文的题目；傅里叶修改后的应征论文于1812年获奖，尽管评审报告仍然批评它不够严格。他的结果最终发表在1822年的《热的解析理论》（*Théorie analytique de la chaleur*）中；这本书中的方法——分离变量法、特征函数展开和傅里叶积分——塑造了此后两个世纪的数学物理。
:::

## 后续内容

分离变量法把偏微分方程化成了带边界条件的特征值问题$X'' + \lambda X = 0$。把它换成一般的二阶算子（带罗宾条件或变系数），就引出了[[pde/sturm-liouville]]，该理论在一般情形下保证特征值是实的、特征函数是正交的。在无限长的杆上，对模的求和变成积分，热方程通过与热核作卷积来求解（[[pde/fourier-transform]]）。二维或三维热方程的稳态满足拉普拉斯方程（[[pde/laplace-equation]]），它的最大值原理与这里证明的最大值原理相对应。波动方程（[[pde/wave-equation]]）用同样的分离变量法求解，性态却完全不同：没有光滑化，没有衰减，而且传播速度有限。在空间上离散化之后，热方程成为刚性常微分方程组的标准例子（[[numerical-analysis/numerical-odes]]）。

::: summary
- 能量守恒加上傅里叶定律$\phi = -K_0u_x$，给出热方程$u_t = k\,u_{xx}$，其中扩散系数$k = K_0/(c\rho)$；一个适定的问题需要一个初始温度，以及每个端点处的一个边界条件（狄利克雷条件、诺伊曼条件或罗宾条件）。
- 分离变量$u = X(x)T(t)$导出特征值问题$X'' + \lambda X = 0$；当端点温度为零时，特征值为$(n\pi/L)^2$，解是正弦级数[[#eq-heat-series]]，每个模都像$e^{-k(n\pi/L)^2t}$那样衰减。
- 两端绝热时得到余弦级数，其常数项（即初始温度的平均值）就是最终状态；总热量守恒。
- 非零的恒定端点温度通过减去线性稳态来处理。
- 能量$\int u^2\,dx$递减，由此证明唯一性（[[#thm-energy-unique]]）。
- 最大值原理：解的最大值和最小值出现在时空矩形的底边或侧边上（[[#thm-max]]）；由它可以得到比较原理、稳定性和唯一性。
- 扩散瞬间使解变得光滑，在时间尺度$L^2/(k\pi^2)$上以指数速度遗忘过去，并且不能稳定地逆转。
:::

## 习题

::: exercise 有限个模之和 {level=1 check="3/4"}
对$0 < x < \pi$，$t > 0$，求解$u_t = 2u_{xx}$，其中$u(0,t) = u(\pi,t) = 0$，$u(x,0) = 3\sin x - \sin 4x$。计算$u(\pi/2, \ln 2)$。
::: solution
这里$k = 2$，各个模为$e^{-2n^2t}\sin nx$。初始数据本身已经是两个特征函数的组合，所以$b_1 = 3$，$b_4 = -1$，其余$b_n = 0$：

$$
u(x,t) = 3e^{-2t}\sin x - e^{-32t}\sin 4x.
$$

在$x = \pi/2$处，$\sin 4x = \sin 2\pi = 0$，所以$u(\pi/2, \ln 2) = 3e^{-2\ln 2} = 3\cdot\frac14 = \frac34$。
:::
:::

::: exercise 稳态 {level=1 check="35"}
一根长为$10$的杆，两端保持在$u(0,t) = 20$和$u(10, t) = 80$。无论初始温度如何，经过很长时间后，$x = 2.5$处的温度是多少？
::: solution
解趋于稳态$v(x) = 20 + (80 - 20)\frac{x}{10} = 20 + 6x$，因为$u - v$满足端点值为零的问题，并按指数衰减。所以$x = 2.5$处的极限为$20 + 15 = 35$。
:::
:::

::: exercise 绝热杆 {level=1 check="pi^2/3"}
一根两端绝热的杆$0 \le x \le \pi$，初始温度为$f(x) = x^2$，$k = 1$。求$u(x,t)$和$\lim_{t\to\infty}u(x,t)$。
::: solution
我们需要$x^2$在$[0,\pi]$上的余弦级数，它就是偶函数$x^2$在$[-\pi,\pi]$上的傅里叶级数：$a_0 = \frac{2\pi^2}{3}$，$a_n = \frac{4(-1)^n}{n^2}$（[[pde/fourier-series#ex-xsq]]）。由[[#eq-neumann-series]]，

$$
u(x,t) = \frac{\pi^2}{3} + 4\sum_{n=1}^{\infty}\frac{(-1)^n}{n^2}e^{-n^2t}\cos nx \;\longrightarrow\; \frac{\pi^2}{3},
$$

即平均值$\frac1\pi\int_0^\pi x^2\,dx$，正如热量守恒所要求的那样。
:::
:::

::: exercise 一端绝热 {level=2 check="1/4"}
求$X'' + \lambda X = 0$，$X(0) = 0$，$X'(\pi) = 0$的特征值和特征函数，并在$(0,\pi)$上求解$u_t = u_{xx}$，其中$u(0,t) = 0$，$u_x(\pi,t) = 0$，$u(x,0) = \sin\frac x2 + 3\sin\frac{5x}{2}$。当$t$很大时，解以怎样的指数速率衰减？
::: solution
与[[#prop-dirichlet-eigen]]一样，$\lambda \le 0$只给出$X = 0$（当$\lambda = -\mu^2$时，$X = B\sinh\mu x$，而$X'(\pi) = B\mu\cosh\mu\pi = 0$迫使$B = 0$；当$\lambda = 0$时，$X = Bx$，而$X'(\pi) = B = 0$）。当$\lambda = \mu^2 > 0$时，由$X(0) = 0$得$X = B\sin\mu x$，而$X'(\pi) = B\mu\cos\mu\pi = 0$要求$\mu = n - \frac12$。所以

$$
\lambda_n = \left(n - \tfrac12\right)^2, \qquad X_n(x) = \sin\left(n - \tfrac12\right)x, \qquad n = 1, 2, \dots
$$

初始数据为$X_1 + 3X_3$，所以$u(x,t) = e^{-t/4}\sin\frac x2 + 3e^{-25t/4}\sin\frac{5x}{2}$。当$t$很大时，它像$e^{-t/4}$那样衰减：衰减率为$\frac14$。（一端绝热时，杆冷却得比两端都保持为零时慢；后一情形中最慢的衰减率为$1$。）
:::
:::

::: exercise 通过侧面散热 {level=2 check="exp(-1)"}
如果杆通过侧面散热，散热速率与其温度成正比，方程就变为$u_t = u_{xx} - hu$，其中$h > 0$。证明代换$u = e^{-ht}w$把它变为$w_t = w_{xx}$。求解$h = 3$，$u(0,t) = u(\pi,t) = 0$，$u(x,0) = \sin x$的问题，并计算$u(\pi/2, 1/4)$。
::: solution
令$u = e^{-ht}w$，得$u_t = e^{-ht}(w_t - hw)$，$u_{xx} = e^{-ht}w_{xx}$，所以$u_t - u_{xx} + hu = e^{-ht}(w_t - w_{xx})$，它为零当且仅当$w_t = w_{xx}$。边界条件和初始条件不变（$t = 0$时$w = u$），所以$w = e^{-t}\sin x$，$u = e^{-(1+h)t}\sin x = e^{-4t}\sin x$。于是$u(\pi/2, 1/4) = e^{-1}$。
:::
:::

::: exercise 恢复过去 {level=2}
证明：对每个$n$，$(0,\pi)$上的问题$u_t = u_{xx}$，$u(0,t) = u(\pi,t) = 0$在$0 \le t \le 1$上有满足$u(x, 1) = \frac1n\sin nx$的解，并且它是形如[[#eq-heat-series]]的唯一解。计算$\max_x\abs{u(x,0)}$，并说明这对于由终值温度确定初始温度意味着什么。
::: solution
$u_n(x,t) = \frac{1}{n}e^{n^2(1-t)}\sin nx$满足方程，在两端为零，且在$t = 1$时等于$\frac1n\sin nx$。若$u = \sum b_me^{-m^2t}\sin mx$，则$u(x,1) = \sum b_me^{-m^2}\sin mx$，由正弦系数的唯一性，它等于$\frac1n\sin nx$仅当对$m\ne n$有$b_m = 0$，且$b_ne^{-n^2} = \frac1n$。所以$u = u_n$，且$\max_x\abs{u_n(x,0)} = \frac{e^{n^2}}{n}$。当$n\to\infty$时，终值数据一致地趋于$0$，而初始数据却爆炸性地增大。因此，终值温度中大小为$\frac1n$的测量误差，可能掩盖大小为$\frac{e^{n^2}}{n}$的初始差异：反向问题的解不连续依赖于数据。
:::
:::

::: exercise 两端绝热时的唯一性 {level=2}
用能量方法证明：问题$u_t = k\,u_{xx}$，$u_x(0,t) = u_x(L,t) = 0$，$u(x,0) = f(x)$至多有一个解（具有[[#thm-energy-unique]]中的正则性）。为什么在这里仅靠最大值原理不能证明唯一性？
::: solution
若$u_1, u_2$都是解，则$w = u_1 - u_2$满足热方程，且$w(x, 0) = 0$，在两端$w_x = 0$。对$E(t) = \int_0^Lw^2\,dx$，

$$
E'(t) = 2k\int_0^Lw\,w_{xx}\,dx = 2k\bigl[w\,w_x\bigr]_0^L - 2k\int_0^Lw_x^2\,dx = -2k\int_0^Lw_x^2\,dx \le 0,
$$

这是因为$w_x(0,t) = w_x(L,t) = 0$。所以$0 \le E(t) \le E(0) = 0$，$w \equiv 0$。最大值原理只说明$w$的最大值和最小值在抛物边界上取到；在诺伊曼条件下，我们不知道$w$在侧边上的**值**，只知道它在那里的斜率，所以不能直接由[[#thm-max]]得出$w = 0$。
:::
:::

::: exercise 能量的指数衰减 {level=3}
证明**维尔丁格（Wirtinger）不等式**：若$w$在$[0, L]$上连续且分段光滑，$w(0) = w(L) = 0$，则$\int_0^L(w')^2\,dx \ge \frac{\pi^2}{L^2}\int_0^Lw^2\,dx$。由此推出：狄利克雷问题[[#eq-dirichlet-problem]]的解（当$t>0$时直到边界都正则）满足

$$
\int_0^Lu(x,t)^2\,dx \le e^{-2k\pi^2t/L^2}\int_0^Lf(x)^2\,dx.
$$
::: hint
把$w$展开为正弦级数，把$w'$展开为余弦级数，并用帕塞瓦尔恒等式进行比较。对于第二部分，证明$\frac{d}{dt}\bigl(e^{2k\pi^2t/L^2}E(t)\bigr) \le 0$。
:::
::: solution
设$w = \sum b_n\sin\frac{n\pi x}{L}$是它的正弦级数。由于$w$的奇周期延拓连续且分段光滑，$w'$的余弦系数为$\frac{n\pi}{L}b_n$（像[[pde/fourier-series#thm-uniform]]中那样分部积分；由于$w(0) = w(L) = 0$，边界项为零），而$w'$的常数项系数为$\frac{2}{L}\int_0^Lw' = 0$。在$[-L, L]$上应用帕塞瓦尔恒等式，再利用对称性取一半，得

$$
\int_0^Lw^2\,dx = \frac L2\sum_{n\ge1}b_n^2, \qquad \int_0^L(w')^2\,dx = \frac{L}{2}\sum_{n\ge1}\frac{n^2\pi^2}{L^2}b_n^2 \ge \frac{\pi^2}{L^2}\cdot\frac L2\sum_{n\ge1}b_n^2,
$$

这就是所要的不等式（等号仅当$w = b_1\sin\frac{\pi x}{L}$时成立）。现在令$E(t) = \int_0^Lu^2\,dx$。与[[#thm-energy-unique]]中一样，当$t > 0$时$E'(t) = -2k\int_0^Lu_x^2\,dx \le -\frac{2k\pi^2}{L^2}E(t)$。因此

$$
\frac{d}{dt}\Bigl(e^{2k\pi^2t/L^2}E(t)\Bigr) = e^{2k\pi^2t/L^2}\Bigl(E'(t) + \frac{2k\pi^2}{L^2}E(t)\Bigr) \le 0,
$$

所以$e^{2k\pi^2t/L^2}E(t) \le E(0) = \int_0^Lf^2\,dx$（这里用到了$E$在$t = 0$处的连续性）。
:::
:::

::: exercise 最高温度永不上升 {level=3}
设$u$是[[#eq-dirichlet-problem]]（端点温度为零）的古典解，令$M(t) = \max_{0\le x\le L}\abs{u(x,t)}$。证明$M$在$[0,\infty)$上不增。
::: solution
设$0 \le t_1 < t_2$。在矩形$[0, L]\times[t_1, t_2]$上应用[[#thm-max]]（把时间原点平移到$t_1$，定理及其证明都不变）。它的抛物边界由线段$t = t_1$（在那里$\abs{u} \le M(t_1)$）和两条侧边（在那里$u = 0$）组成。因此对所有$x$，$-M(t_1) \le \min_\Gamma u \le u(x, t_2) \le \max_\Gamma u \le M(t_1)$，所以$M(t_2) \le M(t_1)$。（[[#thm-max]]所要求的正则性是满足的，因为古典解在$t > 0$时$u_t$、$u_{xx}$连续，并且在$[0, L]\times[t_1, t_2]$上连续。）
:::
:::
