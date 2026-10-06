拨动一根吉他弦，它就会振动，发出一个乐音。声音、光、池塘上的涟漪以及地震时大地的震动都是波，在最简单的情形下，它们服从**波动方程**

$$
u_{tt} = c^2u_{xx}.
$$

它与[[pde/heat-equation]]一章中的热方程$u_t = k\,u_{xx}$的区别仅在于：它含有对时间的二阶导数，而不是一阶导数；然而它的解的性态却截然不同。热会扩散、变得光滑、遗忘过去；而波以确定的速度$c$传播，保持自己的形状，带着自己的尖角一起运动，并且永远保持能量守恒。

本章推导弦振动方程，然后用两种互补的方法求解它。**达朗贝尔（d'Alembert）公式**把直线上的每个解写成一个左行波与一个右行波之和；它使有限的传播速度以及波在固定端的反射变得一目了然。对有界弦使用**分离变量法**，可以得到**简正模**——基音及其泛音——并解释为什么弦发出的是乐音。一个三角恒等式把这两种图景统一起来。最后，能量守恒给出唯一性，而与热方程的比较则总结了双曲型方程与抛物型方程的不同之处。

## 弦振动

考虑一根张紧在$x$轴上两点之间的弦，张力为$T_0$，单位长度的质量为$\rho$。设$u(x,t)$为水平位置$x$处的点在时刻$t$的竖直位移。我们假定振动是微小的，即斜率$u_x$很小，并且弦上每一点都只在竖直方向上运动。我们忽略重力和空气阻力。

张力沿弦的方向作用。在一小段$[a, b]$的右端，张力以大小$T_0$、沿与水平方向成角$\theta(b,t)$的方向拉动这一小段，其中$\tan\theta = u_x$；在左端，它朝相反的方向拉。竖直分量为$T_0\sin\theta$。对于很小的斜率，$\sin\theta \approx \tan\theta = u_x$（误差为$u_x^3$量级），所以这一小段所受的竖直方向的合力为

$$
T_0u_x(b,t) - T_0u_x(a,t) = \int_a^b T_0u_{xx}(x,t)\,dx.
$$

（水平分量$T_0\cos\theta \approx T_0$在同样的精度下相互抵消，这与假定弦在水平方向不动、张力为常数是一致的。）这一小段的动量为$\int_a^b\rho u_t\,dx$，对它应用牛顿第二定律，得到对每个区间$[a, b]$都有$\int_a^b\rho\,u_{tt}\,dx = \int_a^bT_0u_{xx}\,dx$，因此，与推导热方程时一样，

$$
u_{tt} = c^2u_{xx}, \qquad c = \sqrt{\frac{T_0}{\rho}}.
$$ {#eq-wave}

常数$c$具有速度的量纲，我们将会看到，它就是扰动沿弦传播的速度。绷得更紧的弦（$T_0$更大）和更轻的弦（$\rho$更小）上的波传播得更快。外力密度$F(x,t)$（例如重力）会增加一项：$\rho u_{tt} = T_0u_{xx} + F$；与速度成正比的空气阻力则给出阻尼方程$u_{tt} + 2\gamma u_t = c^2u_{xx}$。

同一个方程还描述弹性杆的微小纵振动、管中的声波（这时$u$是压强的扰动）以及真空中电磁场的每个分量（这时$c$是光速）。在二维和三维情形，它变为$u_{tt} = c^2\Delta u$，即膜振动方程或空气中的声波方程。

由于方程关于时间是二阶的，我们需要**两个**初始条件：初始位移$u(x,0) = \varphi(x)$和初始速度$u_t(x,0) = \psi(x)$。被拨动的弦从静止的偏离形状开始运动（$\psi = 0$）；钢琴弦则被琴槌敲击，从而获得初始速度（$\varphi = 0$）。

## 整条直线上的达朗贝尔解

我们先不考虑弦的端点，对所有$x \in \R$求解[[#eq-wave]]。关键是换成**特征坐标**

$$
\xi = x + ct, \qquad \eta = x - ct,
$$

我们将会看到，信息正是沿着这些坐标线传播的。

::: theorem 波动方程的通解 {#thm-general}
函数$u \in C^2(\R^2)$在$\R^2$上满足$u_{tt} = c^2u_{xx}$，当且仅当

$$
u(x,t) = F(x + ct) + G(x - ct)
$$

其中$F, G \in C^2(\R)$是某两个函数。
:::

::: proof
若$u = F(x+ct) + G(x-ct)$，则由链式法则得$u_{tt} = c^2F'' + c^2G''$，$u_{xx} = F'' + G''$，所以$u_{tt} = c^2u_{xx}$。

反之，设$u$是$C^2$解，定义$v(\xi, \eta) = u\bigl(\frac{\xi + \eta}{2}, \frac{\xi - \eta}{2c}\bigr)$，于是$u(x,t) = v(x + ct, x - ct)$。由链式法则，$v_\xi = \frac12u_x + \frac{1}{2c}u_t$；再对$\eta$求导（其中$\partial x/\partial\eta = \frac12$，$\partial t/\partial\eta = -\frac1{2c}$），得

$$
v_{\xi\eta} = \frac14u_{xx} - \frac{1}{4c}u_{xt} + \frac{1}{4c}u_{tx} - \frac{1}{4c^2}u_{tt} = \frac{1}{4c^2}\bigl(c^2u_{xx} - u_{tt}\bigr) = 0,
$$

这里用到了$C^2$函数的混合偏导数相等。所以$v_\xi$与$\eta$无关：$v_\xi(\xi,\eta) = f(\xi)$，其中$f$是一个连续函数（即$f(\xi) = v_\xi(\xi, 0)$）。设$F$是$f$的一个原函数。则$\partial_\xi\bigl(v - F(\xi)\bigr) = 0$，所以$v - F(\xi)$只依赖于$\eta$，记为$G(\eta)$。于是$v = F(\xi) + G(\eta)$。最后，$F' = v_\xi(\cdot, 0)$是$C^1$的，所以$F \in C^2$，而$G(\eta) = v(0, \eta) - F(0)$也是$C^2$的。
:::

函数$G(x - ct)$的图像是把$G$的图像向右平移$ct$得到的：这是一个形状固定、以速度$c$向右运动的波。同样，$F(x + ct)$向左运动。**直线上波动方程的每个解都是一个右行波与一个左行波的叠加。**现在我们来满足初始条件。

::: theorem 达朗贝尔公式 {#thm-dalembert}
设$\varphi \in C^2(\R)$，$\psi \in C^1(\R)$。初值问题

$$
u_{tt} = c^2u_{xx}\ \ (x\in\R,\ t\in\R), \qquad u(x,0) = \varphi(x), \qquad u_t(x,0) = \psi(x)
$$

恰有一个解$u \in C^2(\R^2)$，即

$$
u(x,t) = \frac{\varphi(x + ct) + \varphi(x - ct)}{2} + \frac{1}{2c}\int_{x-ct}^{x+ct}\psi(s)\,ds.
$$ {#eq-dalembert}
:::

::: proof
**唯一性与推导。**由[[#thm-general]]，任何解都具有$u = F(x+ct) + G(x-ct)$的形式。初始条件是说

$$
F(x) + G(x) = \varphi(x), \qquad cF'(x) - cG'(x) = \psi(x).
$$

把第二个方程从$0$到$x$积分，得$F(x) - G(x) = \frac1c\int_0^x\psi(s)\,ds + K$，其中$K = F(0) - G(0)$。把它与第一个方程相加、相减，得

$$
F(x) = \frac{\varphi(x)}{2} + \frac{1}{2c}\int_0^x\psi + \frac K2, \qquad G(x) = \frac{\varphi(x)}{2} - \frac{1}{2c}\int_0^x\psi - \frac K2.
$$

于是$F(x + ct) + G(x - ct)$恰好就是[[#eq-dalembert]]——常数$\pm\frac K2$相互抵消，且$\int_0^{x+ct}\psi - \int_0^{x-ct}\psi = \int_{x-ct}^{x+ct}\psi$。所以至多有一个解，并且它必定是[[#eq-dalembert]]。

**存在性。**反过来，上面的函数$F$和$G$是$C^2$的（因为$\varphi\in C^2$，而$\int_0^x\psi$的导数$\psi$是$C^1$的），所以由[[#thm-general]]，该公式定义了一个$C^2$解。在$t = 0$时它给出$\varphi(x)$；对积分项求导（由微积分基本定理），得

$$
u_t(x, 0) = \frac{c\varphi'(x) - c\varphi'(x)}{2} + \frac{1}{2c}\bigl(c\,\psi(x) + c\,\psi(x)\bigr) = \psi(x). 
$$
:::

::: example 一个隆起一分为二 {#ex-hump}
求解$\varphi(x) = e^{-x^2}$，$\psi = 0$时的波动方程。
::: solution
由[[#eq-dalembert]]，

$$
u(x,t) = \tfrac12e^{-(x + ct)^2} + \tfrac12e^{-(x - ct)^2}.
$$

在$t = 0$时，两半重合，构成原来的隆起。随着时间推移，一个高度减半的副本向左传播，另一个向右传播，速度都是$c$，形状保持不变。一旦二者分开（比如当$ct > 3$时），原点附近的弦就基本上回到了静止状态。
:::
:::

::: widget plot
f: 0.5*exp(-4*(x + t)^2) + 0.5*exp(-4*(x - t)^2); 0.5*exp(-4*(x - t)^2)
x: -6, 6
y: -0.2, 1.1
sliders: t=0:0:5:0.01
labels: u(x,t); \text{右行波}
caption: $c = 1$时初始静止的隆起的达朗贝尔解。拖动$t$：隆起分裂为两个高度减半的副本，它们以速度$1$彼此分离，各自精确地保持形状。第二条曲线单独显示右行的一半$\tfrac12\varphi(x - t)$；完整的解是它加上它的镜像。
:::

::: example 直线上受击的弦 {#ex-struck-line}
求解$\varphi = 0$，$\psi(x) = \dfrac{1}{1 + x^2}$时的波动方程，并求$\lim_{t\to\infty}u(x,t)$。
::: solution
这时只有积分项有贡献：

$$
u(x,t) = \frac{1}{2c}\int_{x - ct}^{x + ct}\frac{ds}{1 + s^2} = \frac{1}{2c}\Bigl(\arctan(x + ct) - \arctan(x - ct)\Bigr).
$$

对固定的$x$，当$t\to\infty$时，$\arctan(x + ct) \to \frac\pi2$，$\arctan(x - ct) \to -\frac\pi2$，所以$u(x,t) \to \frac{\pi}{2c}$。与初始位移不同，初始**速度**会使弦永久地偏离原位：积分区间最终吞没了整个$\psi$，而$\psi$的总积分为$\pi$。在无限长的弦上，没有恢复力能把它拉回来。
:::
:::

### 有限传播速度

公式[[#eq-dalembert]]准确地显示了哪些初始数据会影响解在点$(x_0, t_0)$（$t_0 > 0$）处的值：$\varphi$在两点$x_0 \pm ct_0$处的值，以及$\psi$在这两点之间的区间上的值。

::: definition 依赖域与影响域 {#def-dependence}
设$t_0 > 0$。区间$[x_0 - ct_0, x_0 + ct_0]$称为点$(x_0, t_0)$的**依赖域**：解在该点的值只依赖于这个区间上的初始数据。与之对偶，初始点$x_0$的**影响域**是楔形区域$\set{(x,t) : \abs{x - x_0} \le ct,\ t \ge 0}$，即解可能受到$x_0$处数据影响的点的集合。它的边界$x = x_0 \pm ct$是**特征线**。
:::

所以信号恰好以速度$c$传播：如果初始数据在$[-R, R]$之外为零，那么只要$\abs{x} > R + c\abs{t}$，就有$u(x,t) = 0$。这是与热方程最鲜明的对比：在热方程中，一个热点会立即——尽管很微弱——在整根杆上被感受到。奇异性也以同样的方式传播：若$\varphi$在$x_0$处有尖角，则$u(\cdot, t)$在$x_0 \pm ct$处有尖角，它们沿特征线传播。波动方程没有光滑化作用。

::: quiz
对于$u_{tt} = 4u_{xx}$（从而$c = 2$），哪些初始数据可能影响$u(1, 3)$的值？
- [ ] $[-2, 4]$上的$\varphi$和$\psi$
- [x] $\varphi$在$x = -5$和$x = 7$处的值，以及$[-5, 7]$上的$\psi$
- [ ] 整条实直线上的$\varphi$和$\psi$
- [ ] 仅$\varphi$和$\psi$在$x = 1$处的值
::: solution
由$c = 2$，$t_0 = 3$得$ct_0 = 6$，所以依赖域为$[1 - 6, 1 + 6] = [-5, 7]$。达朗贝尔公式只用到$\varphi$在端点$-5$和$7$处的值，以及$\psi$在两端点之间整个区间上的值。$[-5,7]$之外的数据在时刻$3$之前不可能到达$x = 1$。
:::
:::

::: remark 尖角与广义解
被拨动的弦从三角形开始运动，而三角形不是$C^2$的，所以严格地说[[#thm-dalembert]]并不适用。然而公式$\frac12\bigl(\varphi(x+ct) + \varphi(x-ct)\bigr)$仍然完全有意义，并且描述了真实的弦的行为：尖角分裂为两个沿弦运动的尖角。这样的函数称为**广义解**（或**弱解**）：它们是初始数据经光滑化后得到的真正$C^2$解的极限，并且在积分的意义下满足波动方程。1748年，欧拉（Euler）恰恰是为这种“不连续”的解辩护，反对要求解析表达式的达朗贝尔。
:::

## 反射：有端点的弦

### 固定端

考虑端点固定的半无界弦$x \ge 0$：$u(0, t) = 0$。技巧是把数据延拓为整条直线上的**奇**函数，

$$
\varphi_{\text{奇}}(x) = \begin{cases}\varphi(x) & x \ge 0,\\ -\varphi(-x) & x < 0,\end{cases}
$$

对$\psi$也作同样的延拓，然后在直线上应用达朗贝尔公式。对所有$t$，具有奇数据的解都是$x$的奇函数（因为$-u(-x, t)$满足同一个问题，由唯一性得$u(-x,t) = -u(x,t)$），所以它在$x = 0$处为零，满足要求。当$x > ct$时，公式不变。当$0 \le x < ct$时，位于左侧的宗量$x - ct$为负，把奇延拓展开写出，得

$$
u(x,t) = \frac{\varphi(x + ct) - \varphi(ct - x)}{2} + \frac{1}{2c}\int_{ct - x}^{x + ct}\psi(s)\,ds \qquad (0 \le x < ct).
$$ {#eq-reflection}

项$-\varphi(ct - x)$是波的左行部分撞到端点之后的样子：它向右返回，并且**上下颠倒**。射向固定端的脉冲返回时是倒置的。（在**自由端**$u_x(0,t) = 0$处，改用偶延拓，脉冲返回时是正立的。）

::: example 脉冲遇到自由端 {#ex-free-end}
半无界弦$x \ge 0$在$x = 0$处为自由端，所以$u_x(0, t) = 0$，且$c = 1$。弦从静止开始运动，$\varphi(x) = e^{-4(x - 3)^2}$。求解，并求端点在$t = 3$时的位移。
::: solution
现在把$\varphi$作**偶**延拓：$\varphi_{\text{偶}}(x) = \varphi(\abs{x})$。对所有$t$，具有偶数据的达朗贝尔解都是$x$的偶函数，所以自动满足$u_x(0,t) = 0$。当$0 \le x < t$时，它为

$$
u(x,t) = \frac{\varphi(x + t) + \varphi(t - x)}{2}.
$$

高度为$\frac12$的左行半隆起在$t = 3$时到达端点，这时

$$
u(0, 3) = \frac{\varphi(3) + \varphi(3)}{2} = \varphi(3) = 1.
$$

在反射的那一刻，自由端摆到入射脉冲高度的**两倍**，因为入射波与它正立的反射波恰好重叠；此后，反射脉冲以正立的姿态向右传回。与之相比，在固定端，入射波与它倒置的反射波在端点处相互抵消，所以端点保持静止。
:::
:::

::: widget plot
f: 0.5*(exp(-4*(x + t - 3)^2) - exp(-4*(x + t + 3)^2) + exp(-4*(x - t - 3)^2) - exp(-4*(x - t + 3)^2))
x: 0, 9
y: -0.7, 1.1
sliders: t=0:0:6:0.01
labels: u(x,t)
caption: 在$x = 0$处有固定端的弦上，位于$x = 3$的一个隆起（$c = 1$）。慢慢拖动$t$。右行的一半离去；左行的一半在$t \approx 3$时到达端点，与它的奇对称“镜像”暂时相互抵消，使弦在端点附近看起来几乎是平的，然后上下颠倒地返回。端点本身始终不动。
:::

### 有界弦与简正模

现在把长为$L$的弦的两端都固定：$u(0,t) = u(L,t) = 0$，初始数据$\varphi$、$\psi$给定在$[0, L]$上。分离变量$u = X(x)T(t)$给出$XT'' = c^2X''T$，所以

$$
\frac{T''}{c^2T} = \frac{X''}{X} = -\lambda, \qquad X'' + \lambda X = 0,\quad X(0) = X(L) = 0.
$$

这与热方程的特征值问题（[[pde/heat-equation#prop-dirichlet-eigen]]）相同：$\lambda_n = (n\pi/L)^2$，$X_n = \sin\frac{n\pi x}{L}$。现在关于时间的方程是$T'' + c^2\lambda_nT = 0$，它的解是振荡的，而不是衰减的：

$$
T_n(t) = A_n\cos\omega_nt + B_n\sin\omega_nt, \qquad \omega_n = \frac{n\pi c}{L}.
$$

把这些**简正模**叠加起来，

$$
u(x,t) = \sum_{n=1}^\infty\Bigl(A_n\cos\frac{n\pi ct}{L} + B_n\sin\frac{n\pi ct}{L}\Bigr)\sin\frac{n\pi x}{L}.
$$ {#eq-string-series}

在$t = 0$时，我们需要$\sum A_n\sin\frac{n\pi x}{L} = \varphi(x)$和$\sum\frac{n\pi c}{L}B_n\sin\frac{n\pi x}{L} = \psi(x)$，所以

$$
A_n = \frac{2}{L}\int_0^L\varphi(x)\sin\frac{n\pi x}{L}\,dx, \qquad B_n = \frac{2}{n\pi c}\int_0^L\psi(x)\sin\frac{n\pi x}{L}\,dx.
$$ {#eq-string-coeffs}

在每个模中，弦上的每一点都以相同的频率$\omega_n$振荡，而点$x = jL/n$——即**波节**——始终不动。这就是**驻波**。恒等式

$$
\sin\frac{n\pi x}{L}\cos\frac{n\pi ct}{L} = \frac12\left[\sin\frac{n\pi(x + ct)}{L} + \sin\frac{n\pi(x - ct)}{L}\right]
$$

表明驻波是两个沿相反方向运动的行波的叠加，两种求解方法正是这样衔接起来的。

::: theorem 级数解就是达朗贝尔解 {#thm-string-series}
设$\varphi$和$\psi$在$[0, L]$上连续且分段光滑，在$0$和$L$处为零，并设$\Phi$和$\Psi$是它们到$\R$上的以$2L$为周期的奇延拓。则对所有$x \in [0, L]$和$t \in \R$，以[[#eq-string-coeffs]]为系数的级数[[#eq-string-series]]收敛，并且

$$
u(x,t) = \frac{\Phi(x + ct) + \Phi(x - ct)}{2} + \frac{1}{2c}\int_{x - ct}^{x+ct}\Psi(s)\,ds.
$$

如果此外$\Phi \in C^2$，$\Psi \in C^1$，那么$u$是$[0,L]\times\R$上满足$u(0,t) = u(L,t) = 0$，$u(x,0) = \varphi$，$u_t(x,0) = \psi$的波动方程的唯一$C^2$解。
:::

::: proof
$A_n$是$\varphi$的正弦系数，也就是$\Phi$的傅里叶系数，而$\Phi$连续且分段光滑。由上面的积化和差公式，

$$
\sum_{n=1}^{\infty}A_n\sin\frac{n\pi x}{L}\cos\frac{n\pi ct}{L} = \frac12\sum_{n=1}^\infty A_n\sin\frac{n\pi(x + ct)}{L} + \frac12\sum_{n=1}^{\infty}A_n\sin\frac{n\pi(x - ct)}{L} = \frac{\Phi(x + ct) + \Phi(x - ct)}{2},
$$

这是因为$\Phi$的傅里叶级数在每一点处都收敛到$\Phi$（[[pde/fourier-series#thm-dirichlet]]）。对于第二部分，$\beta_n = \frac{n\pi c}{L}B_n$是$\Psi$的傅里叶正弦系数，而积化和差公式$\sin a\sin b = \frac12[\cos(a - b) - \cos(a+b)]$给出

$$
B_n\sin\frac{n\pi x}{L}\sin\frac{n\pi ct}{L} = \frac{\beta_n L}{2n\pi c}\left[\cos\frac{n\pi(x - ct)}{L} - \cos\frac{n\pi(x + ct)}{L}\right] = \frac{1}{2c}\int_{x-ct}^{x+ct}\beta_n\sin\frac{n\pi s}{L}\,ds.
$$

对$n$求和，并把$\Psi$的傅里叶级数逐项积分（这总是允许的：见[[pde/fourier-series#thm-integrate]]的周期为$2L$的形式），得到$\frac{1}{2c}\int_{x-ct}^{x+ct}\Psi$。这就证明了该公式。

若$\Phi\in C^2$，$\Psi \in C^1$，则由[[#thm-dalembert]]，该公式是$\R^2$上初始数据为$\Phi$、$\Psi$的$C^2$解，因而在$[0,L]$上初始数据为$\varphi$、$\psi$。它满足边界条件：由于$\Phi$和$\Psi$是奇函数，$u(0,t) = \frac12\bigl(\Phi(ct) + \Phi(-ct)\bigr) + \frac1{2c}\int_{-ct}^{ct}\Psi = 0$；又由于$\Phi$和$\Psi$关于$x = L$也是奇对称的（例如，由周期性和奇性，$\Phi(L - y) = \Phi(-L - y) = -\Phi(L + y)$），所以$u(L,t) = 0$。唯一性由下面的[[#cor-wave-unique]]得出。
:::

所以，有界弦就是数据按奇周期方式重复排列的达朗贝尔无限长弦：波在两端之间来回反弹，每反射一次就倒置一次。每个模的周期为$2\pi/\omega_n = \frac{2L}{nc}$，而$\frac{2L}{c}$是它的整数倍，所以**整个运动关于时间是周期的，周期为$2L/c$**——这是一个扰动传到一端、再折返传到另一端、最后回到原处所需的时间。

::: example 拨弦 {#ex-plucked}
把长为$L$的弦在中点处拉开到高度$h$，然后从静止释放。求弦的运动以及每个模所占的能量份额。
::: solution
初始形状是三角形：当$0 \le x \le \frac L2$时$\varphi(x) = \frac{2hx}{L}$，当$\frac{L}2 \le x \le L$时$\varphi(x) = \frac{2h(L - x)}{L}$；并且$\psi = 0$，所以$B_n = 0$。计算正弦系数（在两半上分别分部积分；边界项在$x = L/2$处相互抵消），得

$$
A_n = \frac{2}{L}\int_0^L\varphi(x)\sin\frac{n\pi x}{L}\,dx = \frac{8h}{n^2\pi^2}\sin\frac{n\pi}{2}.
$$

于是

$$
u(x,t) = \frac{8h}{\pi^2}\left(\sin\frac{\pi x}{L}\cos\frac{\pi ct}{L} - \frac19\sin\frac{3\pi x}{L}\cos\frac{3\pi ct}{L} + \frac{1}{25}\sin\frac{5\pi x}{L}\cos\frac{5\pi ct}{L} - \cdots\right).
$$

所有偶数阶模都不出现：它们在拨弦的中点处有波节，所以（关于中点对称的）初始形状不能激发它们。更一般地，在$x = a$处拨弦给出$A_n = \frac{2hL^2}{n^2\pi^2a(L - a)}\sin\frac{n\pi a}{L}$，在$a$处有波节的每个模都不发声——这就是吉他的声音随拨弦位置而变化的原因。

第$n$个模的能量（在下一节中定义）在$t = 0$时为$E_n = \frac{T_0}{2}\int_0^L(\partial_xu_n)^2\,dx$，对奇数$n$，它等于$\frac{T_0n^2\pi^2A_n^2}{4L} = \frac{16T_0h^2}{\pi^2Ln^2}$。总能量为$\frac{T_0}{2}\int_0^L\varphi'^2\,dx = \frac{T_0}{2}\cdot\frac{4h^2}{L^2}\cdot L = \frac{2T_0h^2}{L}$，而确实有$\sum_{n\ \text{为奇数}}\frac{16T_0h^2}{\pi^2Ln^2} = \frac{16T_0h^2}{\pi^2L}\cdot\frac{\pi^2}{8} = \frac{2T_0h^2}{L}$。基模携带了能量的$\frac{8}{\pi^2} \approx 81\%$。
:::
:::

::: widget heat
equation: wave
f: if(x < pi/3, x, (pi - x)/2)
L: pi
k: 1
boundary: dirichlet
terms: 60
caption: 长为$\pi$的弦在其长度的三分之一处被拨动，然后从静止释放，$c = 1$。播放动画。尖角分裂为两个尖角，它们沿弦传播，并在两端倒置反射；弦的形状始终由直线段组成，没有任何东西被抹平。经过时间$2L/c = 2\pi$后，初始的三角形精确地重新出现。
:::

::: example 被敲击的弦 {#ex-hammer}
宽为$2\delta$的钢琴琴槌敲击一根静止的弦的中部，使它获得初始速度：当$\abs{x - L/2} < \delta$时$\psi(x) = v_0$，其他情形$\psi(x) = 0$；并且$\varphi = 0$。求各个模的系数，并把它的声音与拨弦的声音作比较。
::: solution
这时$A_n = 0$，而由[[#eq-string-coeffs]]，

$$
B_n = \frac{2v_0}{n\pi c}\int_{L/2-\delta}^{L/2+\delta}\sin\frac{n\pi x}{L}\,dx = \frac{2v_0L}{n^2\pi^2c}\left[\cos\frac{n\pi(L/2 - \delta)}{L} - \cos\frac{n\pi(L/2+\delta)}{L}\right] = \frac{4v_0L}{n^2\pi^2c}\sin\frac{n\pi}{2}\sin\frac{n\pi\delta}{L}.
$$

偶数阶模同样不出现（它们在敲击点处有波节）。对于窄的琴槌以及远小于$L/\delta$的$n$，$\sin\frac{n\pi\delta}{L} \approx \frac{n\pi\delta}{L}$，所以$B_n \approx \frac{4v_0\delta}{n\pi c}\sin\frac{n\pi}{2}$：振幅只像$1/n$那样衰减，而拨弦的振幅像$1/n^2$那样衰减。从能量来看，对每个满足$n \ll L/\delta$的奇数$n$，第$n$个模携带的能量为$E_n = \frac{\rho L}{4}\omega_n^2B_n^2 \approx \frac{4\rho v_0^2\delta^2}{L}$——能量均匀地分布在许多谐波上，而不是集中在基模上。这就是敲击的弦听起来比拨动的弦更明亮的原因，也是钢琴制造者使用宽度经过精心选择的毛毡琴槌的原因。
:::
:::

::: quiz
一根长为$L = \pi$、$c = 1$的弦（两端固定）以任意方式开始运动。下列哪个说法正确？
- [ ] 运动衰减直至静止，就像杆中的温度那样。
- [x] 运动关于时间是周期的，周期为$2\pi$。
- [ ] 运动是周期的，周期为$\pi$，即横穿弦一次所需的时间。
- [ ] 经过很长时间后，只有基模保留下来。
::: solution
每个模$\sin nx\cos nt$或$\sin nx\sin nt$的周期为$2\pi/n$，而$2\pi = 2L/c$是它的整数倍，所以每个叠加在时间$2\pi$之后都会重复。在达朗贝尔的图景中，一个扰动需要时间$2L/c$才能传到一端、反射、传到另一端、再次反射并返回：对于从静止释放的弦，经过一次横穿时间$L/c$后，形状上下颠倒并且左右反转，即$u(x, L/c) = -\varphi(L - x)$；只有经过$2L/c$后它才恢复原状。在理想的波动方程中，没有任何东西会衰减。
:::
:::

### 来自数学的音乐

简正模的频率为$\nu_n = \frac{\omega_n}{2\pi} = \frac{nc}{2L}$，它们都是下面的**基频**的整数倍：

$$
\nu_1 = \frac{1}{2L}\sqrt{\frac{T_0}{\rho}}.
$$ {#eq-fundamental}

倍频$2\nu_1, 3\nu_1, \dots$称为**谐波**或泛音。由于它们恰好是基频的整数倍，运动是周期的，耳朵听到的是单一的音高$\nu_1$，而各次谐波的相对强度决定了音色。公式[[#eq-fundamental]]包含了梅森（Mersenne）定律（1636年）：音高与弦长成反比，与张力的平方根成正比，与单位长度质量的平方根成反比。把弦长减半——在第十二品处按弦——音高就升高一个八度。鼓则不同：圆膜的频率与贝塞尔函数的零点成正比（[[ode/series-solutions]]），而这些零点彼此之间不成整数倍关系，所以鼓声的音高不那么确定。

## 能量与唯一性

振动的弦每单位长度具有动能$\frac12\rho u_t^2$，还具有因被拉伸而产生的势能。长为$dx$的一小段被拉伸到长度$\sqrt{1 + u_x^2}\,dx \approx (1 + \frac12u_x^2)\,dx$，所以克服张力所做的功约为$\frac12T_0u_x^2\,dx$。

::: definition 弦的能量 {#def-energy}
$[0, L]$上[[#eq-wave]]的解在时刻$t$的**能量**为

$$
E(t) = \frac12\int_0^L\Bigl(\rho\,u_t(x,t)^2 + T_0\,u_x(x,t)^2\Bigr)\,dx.
$$
:::

::: theorem 能量守恒 {#thm-energy}
设$u \in C^2\bigl([0, L]\times\R\bigr)$满足$u_{tt} = c^2u_{xx}$，其中$c^2 = T_0/\rho$，并设在每个端点处，或者对所有$t$都有$u = 0$（固定端），或者对所有$t$都有$u_x = 0$（自由端）。则$E(t)$是常数。
:::

::: proof
在积分号下求导，利用$\rho u_{tt} = T_0u_{xx}$，并认出其中关于$x$的导数，得

$$
E'(t) = \int_0^L\bigl(\rho u_tu_{tt} + T_0u_xu_{xt}\bigr)\,dx = T_0\int_0^L\bigl(u_tu_{xx} + u_xu_{xt}\bigr)\,dx = T_0\int_0^L\partial_x\bigl(u_tu_x\bigr)\,dx = T_0\bigl[u_tu_x\bigr]_{x=0}^{x=L}.
$$

在固定端，对所有$t$有$u(0, t) = 0$，所以$u_t(0,t) = 0$；在自由端，$u_x = 0$。无论哪种情形，边界项都为零，从而$E' = 0$。
:::

::: corollary 弦振动问题的唯一性 {#cor-wave-unique}
$[0,L]$上的问题$u_{tt} = c^2u_{xx} + F(x,t)$，给定初始位移和初始速度，且每个端点或者给定位移（$u = g(t)$），或者是自由型的（$u_x = g(t)$），至多有一个$C^2$解。
:::

::: proof
两个解之差$w$满足齐次波动方程、零初始数据和齐次边界条件（在每个端点处$w = 0$或$w_x = 0$）。由[[#thm-energy]]，它的能量是常数；而在$t = 0$时能量为$0$，因为$w_t(x,0) = 0$且$w_x(x,0) = 0$（后者是因为对所有$x$有$w(x,0) = 0$）。所以$w_t \equiv 0$，$w_x \equiv 0$，从而$w$是常数；由于$w(x,0) = 0$，这个常数为$0$。
:::

对于单个简正模，能量在动能和势能两种形式之间来回转换：在$u_n = A_n\cos\omega_nt\sin\frac{n\pi x}{L}$中，动能与$\sin^2\omega_nt$成正比，势能与$\cos^2\omega_nt$成正比，二者之和为常数。对于一般的解，由模的正交性可知$E = \sum_nE_n$：每个模永远保持自己的能量。因此理想的弦永远不会改变音色；真实的弦则会，因为频率越高，阻尼越强。

::: warning 最大值原理对波动不成立
人们自然会像对热方程那样，期望位移永远不会超过它的初始最大值。但事实并非如此。取$\varphi = 0$，在$[0,\pi]$上取$\psi(x) = \sin x$，$c = 1$，则解为$u = \sin x\sin t$：弦从平直状态开始，在$t = \frac\pi2$时达到高度$1$。即使$\psi = 0$，也没有最大值原理：$u = -\sin x\cos t$在$t = 0$时$\le 0$，在两端始终为零，但在$t = \pi$时它等于$\sin x$，达到高度$1$。对于波动方程，衡量解的大小的恰当尺度是守恒的**能量**，而不是最大值。
:::

::: quiz
一根弦的张力变为原来的四倍，而长度和质量保持不变。它的基频以及运动重复一次所需的时间会怎样变化？
- [ ] 频率$\times 4$，周期$\div 4$
- [x] 频率$\times 2$，周期$\div 2$
- [ ] 频率$\times 2$，周期不变
- [ ] 频率不变，因为它只依赖于弦长
::: solution
由[[#eq-fundamental]]，$\nu_1 = \frac{1}{2L}\sqrt{T_0/\rho}$与$\sqrt{T_0}$成正比，所以它加倍。运动以周期$2L/c = 1/\nu_1$重复，这个周期减半。（波速$c = \sqrt{T_0/\rho}$加倍，所以脉冲横穿弦所需的时间减半。）
:::
:::

## 热与波的对比

两个方程都是用同样的分离变量法、借助同样的特征函数$\sin\frac{n\pi x}{L}$求解的，但时间因子$e^{-k(n\pi/L)^2t}$与$\cos\frac{n\pi ct}{L}$导致了截然相反的性态。

| | 热方程$u_t = k\,u_{xx}$（抛物型） | 波动方程$u_{tt} = c^2u_{xx}$（双曲型） |
|---|---|---|
| 初始数据 | 仅$u(x,0)$ | $u(x,0)$和$u_t(x,0)$ |
| 模 | 像$e^{-k(n\pi/L)^2t}$那样衰减 | 以频率$n\pi c/L$永远振荡 |
| 光滑性 | $t > 0$时立即成为$C^\infty$ | 尖角和跳跃一直存在并传播 |
| 传播速度 | 无穷大 | 恰好为$c$ |
| 时间反演 | 不适定 | 方程在$t\mapsto -t$下对称 |
| 守恒量 / 单调量 | $\int u^2$递减；最大值原理 | 能量守恒；没有最大值原理 |
| 长时间性态 | 趋于稳态 | 周期的（有界弦）或向外辐射散去（直线） |

::: application 地震学、音乐与光纤
地震学家根据地震波到达不同台站的时间来确定震源的位置，这之所以可能，只是因为波以确定的速度传播——这正是有限传播速度的体现（真实的地震波分为两种——传播较快的压缩波 P 波和传播较慢的剪切波 S 波，二者到达时间之差可以用来测定距离）。乐器是围绕弦、空气柱和板的简正模来设计的。在光纤中，携带数据的光脉冲必须在长距离上保持形状：在理想的波动方程中，所有频率都以同样的速度$c$传播，所以脉冲不会展宽；而真实的光纤是**色散**的（速度依赖于频率），脉冲会慢慢展宽。
:::

::: history
弦振动方程是第一个得到认真研究的偏微分方程。布鲁克·泰勒（Brook Taylor）于1713年求出了基模的频率。1747年，让·勒朗·达朗贝尔（Jean le Rond d'Alembert）推导出波动方程，并证明它的解是行波之和$F(x+ct) + G(x - ct)$。莱昂哈德·欧拉（Leonhard Euler，1748年）坚持认为，初始形状可以是手能画出的任何曲线，包括拨弦时的三角形；而达朗贝尔只接受由单个解析公式给出的形状。1753年，丹尼尔·伯努利（Daniel Bernoulli）从物理出发，断言弦的每一种运动都是正弦型的模$\sin\frac{n\pi x}{L}\cos\frac{n\pi ct}{L}$的叠加。欧拉和达朗贝尔都拒绝接受这一点：正弦函数之和怎么能表示任意曲线呢？约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）于1759年加入了这场争论，他把弦看作有限个珠子组成的系统的极限来研究。这场争论实质上是关于“函数”究竟是什么的争论，直到19世纪才得到解决：傅里叶（Fourier）关于热的工作和狄利克雷（Dirichlet）的收敛定理表明，伯努利是对的。
:::

## 后续内容

高维波动方程$u_{tt} = c^2\Delta u$支配着膜的振动和声学；在矩形上，它分离为正弦函数的乘积，在圆盘上则分离为贝塞尔函数（[[ode/series-solutions]]，[[pde/sturm-liouville]]）。在三维情形，基尔霍夫（Kirchhoff）公式取代了达朗贝尔公式，并具有一个引人注目的性质——**惠更斯（Huygens）原理**：尖锐的信号始终保持尖锐，这就是为什么我们听到的拍手声是一声清脆的拍手，而不是拖长的回响（在二维情形这一原理不成立，池塘上的涟漪就说明了这一点）。变密度的弦引出施图姆-刘维尔（Sturm–Liouville）问题，而傅里叶变换（[[pde/fourier-transform]]）逐个模地求解整条直线上的波动方程。拉普拉斯方程（[[pde/laplace-equation]]）描述热与波两者的不随时间变化的状态。

::: summary
- 对斜率很小的弦应用牛顿定律，得到$u_{tt} = c^2u_{xx}$，波速为$c = \sqrt{T_0/\rho}$；它需要两个初始条件：位移和速度。
- 直线上的每个$C^2$解都具有$F(x + ct) + G(x - ct)$的形式，达朗贝尔公式[[#eq-dalembert]]给出初值问题的唯一解。
- 解在$(x_0, t_0)$处的值只依赖于$[x_0 - ct_0, x_0 + ct_0]$中的数据：信号和奇异性都恰好以速度$c$传播。
- 固定端把波倒置地反射回来（奇延拓）；自由端把波正立地反射回来（偶延拓）。
- 在有界弦上，简正模$\sin\frac{n\pi x}{L}\cos\frac{n\pi ct}{L}$的频率为$n\nu_1$，其中$\nu_1 = \frac{1}{2L}\sqrt{T_0/\rho}$；运动是周期的，周期为$2L/c$，并且级数解等于数据作奇周期延拓后的达朗贝尔公式（[[#thm-string-series]]）。
- 能量$\frac12\int(\rho u_t^2 + T_0u_x^2)\,dx$守恒，由此证明唯一性；没有最大值原理，也没有光滑化。
:::

## 习题

::: exercise 直线上的单个模 {level=1 check="-1/2"}
用达朗贝尔公式求解$u_{tt} = 4u_{xx}$，其中$u(x,0) = \sin x$，$u_t(x,0) = 0$。计算$u(\pi/2, \pi/3)$。
::: solution
这里$c = 2$，并且

$$
u(x,t) = \frac{\sin(x + 2t) + \sin(x - 2t)}{2} = \sin x\cos 2t,
$$

这里用到了和差化积公式。所以$u(\pi/2,\pi/3) = \sin\frac\pi2\cos\frac{2\pi}3 = -\frac12$。
:::
:::

::: exercise 初始速度 {level=1 check="1"}
求解$u_{tt} = u_{xx}$，其中$u(x,0) = 0$，$u_t(x,0) = \cos x$，并计算$u(0, \pi/2)$。
::: solution
由[[#eq-dalembert]]（$c = 1$），

$$
u(x,t) = \frac12\int_{x-t}^{x+t}\cos s\,ds = \frac{\sin(x + t) - \sin(x - t)}{2} = \cos x\sin t,
$$

所以$u(0,\pi/2) = 1$。验证：$u_t = \cos x\cos t$在$t = 0$时等于$\cos x$。
:::
:::

::: exercise 给弦调音 {level=1 check="312.5"}
一根长$0.64\ \mathrm{m}$、单位长度质量为$4\times10^{-4}\ \mathrm{kg/m}$的钢弦，张力为$64\ \mathrm N$。求它的基频（以赫兹为单位）。要使音高升高一个八度，张力必须变为原来的多少倍？（输入基频。）
::: solution
波速为$c = \sqrt{64/(4\times10^{-4})} = \sqrt{160\,000} = 400\ \mathrm{m/s}$，所以由[[#eq-fundamental]]，$\nu_1 = \frac{c}{2L} = \frac{400}{1.28} = 312.5\ \mathrm{Hz}$。升高一个八度就是使频率加倍；由于$\nu_1 \propto \sqrt{T_0}$，张力必须乘以$4$。
:::
:::

::: exercise 来自固定端的回波 {level=2 check="(exp(-4) - 1)/2"}
端点固定（$u(0,t) = 0$）的半无界弦$x \ge 0$，$c = 1$，从静止开始运动，$\varphi(x) = e^{-(x - 5)^2}$。求$u(1, 6)$，并解释答案的符号。
::: solution
由于$x = 1 < ct = 6$，公式[[#eq-reflection]]适用，其中$\psi = 0$：

$$
u(1,6) = \frac{\varphi(7) - \varphi(5)}{2} = \frac{e^{-4} - 1}{2} \approx -0.491.
$$

隆起的左行一半以$5 - t$为中心，在$t = 5$时撞到固定端，然后倒置返回，在时刻$t = 6$时以$t - 5 = 1$为中心。点$x = 1$正位于反射回来的、上下颠倒的、高度为$-\frac12$的半隆起的中心；小的正修正项$\frac12e^{-4} = \frac12\varphi(7)$来自左行一半本身的尾部：在奇延拓的图景中，它的中心现在位于端点之外的$x = -1$处，但它在$x = 0$右侧的那部分尚未被反射。
:::
:::

::: exercise 在三分之一处拨弦 {level=2 check="1/4"}
长为$L$的弦在$x = L/3$处被拉到高度$h$，然后从静止释放。利用[[#ex-plucked]]中$A_n$的一般公式，求比值$A_2/A_1$，并指出哪些谐波不出现。
::: solution
取$a = L/3$，$A_n = \frac{2hL^2}{n^2\pi^2a(L - a)}\sin\frac{n\pi}{3} = \frac{9h}{n^2\pi^2}\sin\frac{n\pi}{3}$。由于$\sin\frac{2\pi}{3} = \sin\frac\pi3$，$\frac{A_2}{A_1} = \frac{1}{4}$。满足$\sin\frac{n\pi}3 = 0$的谐波，即$n = 3, 6, 9, \dots$，不出现：它们在$x = L/3$处有波节。
:::
:::

::: exercise 一个模的能量 {level=2 check="pi/4"}
直接验证$u(x,t) = \sin x\cos t$（$c = 1$，$\rho = T_0 = 1$时的一个解）的能量$E(t) = \frac12\int_0^\pi(u_t^2 + u_x^2)\,dx$是常数，并求出它的值。
::: solution
$u_t = -\sin x\sin t$，$u_x = \cos x\cos t$，所以

$$
E(t) = \frac12\left(\sin^2t\int_0^\pi\sin^2x\,dx + \cos^2t\int_0^\pi\cos^2x\,dx\right) = \frac12\cdot\frac\pi2\left(\sin^2t + \cos^2t\right) = \frac\pi4.
$$

动能部分$\frac\pi4\sin^2t$与势能部分$\frac\pi4\cos^2t$此消彼长，二者之和为常数。
:::
:::

::: exercise 阻尼耗散能量 {level=2}
设$u \in C^2$在$[0,L]$上满足阻尼波动方程$u_{tt} + 2\gamma u_t = c^2u_{xx}$，其中$\gamma > 0$，两端固定。证明$\mathcal E(t) = \frac12\int_0^L(u_t^2 + c^2u_x^2)\,dx$满足$\mathcal E'(t) = -2\gamma\int_0^Lu_t^2\,dx \le 0$，并由此推出：对给定的初始数据，该问题至多有一个解。
::: solution
与[[#thm-energy]]中一样，

$$
\mathcal E'(t) = \int_0^L\bigl(u_tu_{tt} + c^2u_xu_{xt}\bigr)dx = \int_0^L u_t\bigl(c^2u_{xx} - 2\gamma u_t\bigr)dx + c^2\int_0^Lu_xu_{xt}\,dx = c^2\bigl[u_tu_x\bigr]_0^L - 2\gamma\int_0^Lu_t^2\,dx.
$$

由于在固定端$u_t = 0$，边界项为零，所以$\mathcal E' = -2\gamma\int u_t^2 \le 0$。若$u_1, u_2$满足同一个问题，则它们的差$w$满足零数据的阻尼方程，所以当$t \ge 0$时$0 \le \mathcal E_w(t) \le \mathcal E_w(0) = 0$。因此当$t \ge 0$时$w_t = w_x = 0$，$w \equiv 0$，与[[#cor-wave-unique]]完全一样。
:::
:::

::: exercise 有限传播速度 {level=3}
设$\varphi \in C^2$和$\psi \in C^1$在$[-R, R]$之外为零，$u$是解[[#eq-dalembert]]。证明只要$\abs{x} > R + ct$（$t \ge 0$），就有$u(x,t) = 0$。再证明当$\abs{x} < ct - R$时，解等于常数$\frac{1}{2c}\int_{-R}^R\psi$，并解释这一结果。
::: solution
若$x > R + ct$，则$x - ct > R$，所以$x \pm ct > R$都成立，从而$\varphi(x\pm ct) = 0$；另外，区间$[x - ct, x + ct]$位于$(R, \infty)$中，而在那里$\psi = 0$。所以$u(x,t) = 0$。$x < -R - ct$的情形是对称的。若$\abs{x} < ct - R$，则$x + ct > R$且$x - ct < -R$，所以$\varphi(x\pm ct) = 0$，而$[x - ct, x + ct] \supset [-R, R]$，$\psi$在其上的积分为$\int_{-R}^R\psi$。所以在两个向外传播的波前之间的区域里，弦偏离原位一个常数$\frac1{2c}\int\psi$：初始位移干净利落地经过，而初始速度却留下永久的尾迹。（这就是惠更斯原理在一维情形下的失效。）
:::
:::

::: exercise 能量均分 {level=3}
设$u$是直线上的解，$\varphi$、$\psi$与上一题相同，并设$K(t) = \frac12\int_{\R}u_t^2\,dx$和$P(t) = \frac{c^2}{2}\int_\R u_x^2\,dx$分别是动能和势能。证明对所有$t > R/c$有$K(t) = P(t)$。
::: hint
写出$u = F(x + ct) + G(x - ct)$，并计算$u_t^2 - c^2u_x^2$。
:::
::: solution
由[[#thm-general]]，$u = F(x + ct) + G(x - ct)$，其中由[[#thm-dalembert]]的证明，$F' = \frac12\varphi' + \frac{1}{2c}\psi$，$G' = \frac12\varphi' - \frac1{2c}\psi$；二者在$[-R, R]$之外都为零。于是$u_t = c\bigl(F'(x+ct) - G'(x-ct)\bigr)$，$u_x = F'(x+ct) + G'(x - ct)$，所以

$$
u_t^2 - c^2u_x^2 = c^2\Bigl[(F' - G')^2 - (F' + G')^2\Bigr] = -4c^2F'(x + ct)\,G'(x - ct).
$$

除非$x \in [-R - ct, R - ct]$，否则第一个因子为零；除非$x \in [-R + ct, R + ct]$，否则第二个因子为零。当$ct > R$时，这两个区间不相交（$R - ct < -R + ct$），所以乘积恒为零，从而$K(t) - P(t) = \frac12\int(u_t^2 - c^2u_x^2)\,dx = 0$。
:::
:::
