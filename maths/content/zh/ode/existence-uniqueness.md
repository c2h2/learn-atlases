下面是三个初值问题，它们的右端看起来同样无害：

$$
\text{(a)}\;\; y' = y^2,\; y(0) = 1; \qquad \text{(b)}\;\; y' = 3y^{2/3},\; y(0) = 0; \qquad \text{(c)}\;\; y' = \sin(ty),\; y(0) = 1.
$$

问题(a)的解为$y = 1/(1-t)$，它在$t = 1$处不复存在（[[ode/first-order#ex-blowup-intro]]）。问题(b)有**两个**明显的解，$y \equiv 0$和$y = t^3$，而事实上它有无穷多个解。问题(c)无法用[[ode/first-order]]一章中的任何方法求解，但我们将证明它恰有一个解，并且这个解对所有实数$t$都有定义。在进行任何计算之前，我们希望知道应当预期哪一种行为。

这正是本章的目的。本章的核心是**皮卡-林德勒夫（Picard–Lindelöf）定理**：如果$f$连续，并且关于$y$变化得不太剧烈（即满足**利普希茨（Lipschitz）条件**），那么初值问题$y' = f(t,y)$，$y(t_0) = y_0$在$t_0$附近恰有一个解。它的证明是构造性的——把解构造为一列显式近似的极限——这是分析学中最重要的论证之一。围绕这个定理，我们还将介绍几何图像（斜率场和相线）以及最简单的数值方法（欧拉（Euler）法），并证明欧拉法是收敛的。

## 斜率场与等斜线

方程$y' = f(t,y)$给$(t,y)$平面上的每一点指定一个斜率。在许多点处画出具有该斜率的短线段，就得到**斜率场**（或方向场），而解就是处处与这个场相切的曲线。你已经在[[calculus-2/intro-odes]]一章中见过斜率场；下面介绍两种能高效地画出斜率场草图的技巧。

- **等斜线**是一条曲线$f(t,y) = c$，沿着它，每条线段都具有相同的斜率$c$。画出几条等斜线及其上的常数斜率，就能很快把整个场填满。
- 当$f$不依赖于$t$时，场沿每条水平直线都相同，所以整个图像由单个函数$f(y)$决定；我们将在[[#sec-phase-line]]中利用这一点。

::: example 等斜线与直线解 {#ex-isoclines}
利用等斜线画出$y' = y - t$的斜率场的草图，并求一个图像为直线的解。
::: solution
斜率为$c$的等斜线是直线$y = t + c$，其斜率为$1$。在$y = t$上，线段是水平的；在$y = t + 1$上，线段的斜率为$1$；在$y = t - 1$上斜率为$-1$；在$y = t + 2$上斜率为$2$，依此类推。

等斜线$c = 1$很特殊：它是一条斜率为$1$的直线，而它上面的线段斜率也是$1$，所以它本身就是一条解曲线。确实，由$y = t + 1$得$y' = 1 = (t+1) - t$。这个方程是线性的，$y' - y = -t$，由[[ode/first-order#thm-linear]]得通解$y = t + 1 + Ce^{t}$。位于这条直线上方的解（$C > 0$）向上弯曲、远离它，位于下方的解（$C < 0$）向下弯曲：这个直线解把解分成了两族，斜率场让人一眼就能看出这一点。
:::
:::

斜率场给人的印象是：经过每一点恰有一条解曲线。上面的问题(b)表明情况并非总是如此，而找出正确的假设条件就是我们接下来的任务。

::: example 无穷多个解 {#ex-nonunique}
求$y' = 3y^{2/3}$，$y(0) = 0$的所有解。
::: solution
常数$y \equiv 0$是一个解。在$y \neq 0$处可以分离变量：由$\int \tfrac13 y^{-2/3}\,dy = \int dt$得$y^{1/3} = t - c$，所以$y = (t - c)^3$。现在可以把若干段拼接起来。对任意$a \le 0 \le b$，函数

$$
y(t) = \begin{cases} (t - a)^3, & t < a, \\ 0, & a \le t \le b, \\ (t - b)^3, & t > b, \end{cases}
$$

是可导的（在$a$和$b$处的单侧导数都是$0$），并且处处满足$y' = 3y^{2/3}$，$y(0) = 0$。解可以在零处停留任意长的时间，然后在任意时刻离开。解有无穷多个——如果取$a = -\infty$或$b = +\infty$（即省略某一段），还能得到更多的解。
:::
:::

这个例子中出问题的地方是$f(y) = 3y^{2/3}$在$y = 0$附近的行为：它的图像在那里有竖直切线，$f'(y) = 2y^{-1/3} \to \infty$。$y$的微小变化会引起斜率不成比例的巨大变化，这使得解可以从平衡解上剥离开来。解决的办法就是禁止这种行为。

## 利普希茨条件

::: definition 利普希茨条件 {#def-lipschitz}
设函数$f(t,y)$定义在集合$D \subseteq \R^2$上。称$f$在$D$上**关于$y$满足利普希茨条件**（关于$t$一致），如果存在常数$L \ge 0$（称为**利普希茨常数**），使得

$$
\lvert f(t, y) - f(t, z)\rvert \le L\,\lvert y - z\rvert \qquad\text{对所有 } (t,y),\,(t,z) \in D.
$$ {#eq-lipschitz}
:::

这个条件用$L$界定了$y \mapsto f(t,y)$的各条弦的斜率。关于$y$的偏导数有界的函数满足这一条件。

::: proposition 导数有界蕴涵利普希茨条件 {#prop-c1-lipschitz}
设集合$D$满足：只要$(t, y)$和$(t, z)$在$D$中，连接它们的线段也在$D$中（例如矩形或带形区域）。若$\partial f/\partial y$在$D$上存在，并且在$D$上$\lvert \partial f/\partial y\rvert \le L$，则$f$在$D$上关于$y$满足利普希茨条件，利普希茨常数为$L$。特别地，若$f$和$\partial f/\partial y$在一个闭矩形上连续，则$f$在该矩形上关于$y$满足利普希茨条件。
:::

::: proof
固定$t$，在$y$与$z$之间的线段上对$u \mapsto f(t,u)$应用中值定理（[[calculus-1/mean-value-theorem]]）：存在介于两者之间的某个$\xi$，使得

$$
\lvert f(t,y) - f(t,z)\rvert = \left\lvert\frac{\partial f}{\partial y}(t,\xi)\right\rvert\,\lvert y - z\rvert \le L\,\lvert y - z\rvert .
$$

若$\partial f/\partial y$在闭矩形上连续，则由于矩形是紧的，它在那里有界，于是可以取$L = \max\lvert\partial f/\partial y\rvert$。
:::

所以$f(t,y) = y^2$在每个矩形$\lvert y\rvert \le b$上满足利普希茨条件（$L = 2b$），但在整个平面上不满足，因为$\lvert y^2 - z^2\rvert = \lvert y + z\rvert\,\lvert y - z\rvert$，而$\lvert y + z\rvert$无界。函数$\lvert y\rvert$满足利普希茨条件，$L = 1$，尽管它在$0$处不可导。而$3y^{2/3}$在任何包含满足$y = 0$的点的矩形上都不满足利普希茨条件：取$z = 0$，则当$y\to0$时$\lvert f(y) - f(0)\rvert/\lvert y\rvert = 3\lvert y\rvert^{-1/3}$无界。

## 皮卡迭代

存在性定理的关键是把微分方程换成一个等价的**积分**方程，后者更适合于逼近。

::: lemma 积分方程 {#lem-integral}
设$f$在集合$D$上连续，$I$是包含$t_0$的区间。图像位于$D$中的连续函数$y\colon I\to\R$在$I$上是初值问题$y' = f(t,y)$，$y(t_0) = y_0$的解，当且仅当

$$
y(t) = y_0 + \int_{t_0}^{t} f\bigl(s, y(s)\bigr)\,ds \qquad\text{对所有 } t \in I.
$$ {#eq-integral}
:::

::: proof
若$y$是该初值问题的解，则$y'(s) = f(s,y(s))$连续，所以从$t_0$到$t$积分（微积分基本定理）就得到[[#eq-integral]]。反过来，若$y$连续并满足[[#eq-integral]]，则被积函数$s\mapsto f(s, y(s))$连续，所以右边可导，导数为$f(t,y(t))$；因此$y' = f(t,y)$，而令$t = t_0$即得$y(t_0) = y_0$。
:::

方程[[#eq-integral]]是说，$y$是映射$\Phi$的一个**不动点**，其中$\Phi$把函数$y$映为函数$\Phi[y](t) = y_0 + \int_{t_0}^t f(s,y(s))\,ds$。寻找不动点的自然方法是迭代：从一个猜测出发，反复应用$\Phi$，就像[[numerical-analysis/root-finding]]一章中对数所做的不动点迭代$x_{n+1} = g(x_n)$那样。

::: definition 皮卡迭代序列 {#def-picard}
初值问题$y' = f(t,y)$，$y(t_0) = y_0$的**皮卡迭代序列**是指函数

$$
y_0(t) \equiv y_0, \qquad y_{n+1}(t) = y_0 + \int_{t_0}^{t} f\bigl(s, y_n(s)\bigr)\,ds \quad (n = 0, 1, 2, \dots).
$$
:::

::: example 皮卡迭代实例 {#ex-picard}
对$y' = 2t(1 + y)$，$y(0) = 0$计算皮卡迭代序列，并确定它的极限。
::: solution
从$y_0 \equiv 0$出发：

$$
\begin{aligned}
y_1(t) &= \int_0^t 2s\,(1 + 0)\,ds = t^2, \\
y_2(t) &= \int_0^t 2s\,(1 + s^2)\,ds = t^2 + \frac{t^4}{2}, \\
y_3(t) &= \int_0^t 2s\left(1 + s^2 + \frac{s^4}{2}\right)ds = t^2 + \frac{t^4}{2} + \frac{t^6}{6}.
\end{aligned}
$$

由归纳法，$y_n(t) = \sum_{k=1}^{n} \dfrac{t^{2k}}{k!}$，这是$e^{t^2} - 1$的级数的第$n$个部分和。所以迭代序列（对每个$t$）收敛于$y = e^{t^2} - 1$，而确实有$y' = 2te^{t^2} = 2t(1 + y)$，$y(0) = 0$。每个迭代函数都比前一个多精确一阶（按$t$的幂次计）。
:::
:::

::: widget plot
f: exp(x^2) - 1; sum(x^(2k)/fact(k), k, 1, n)
x: -1.6, 1.6
y: -0.5, 8
sliders: n=1:1:8:1
labels: e^{t^2}-1; y_n(t)
caption: $y' = 2t(1+y)$，$y(0) = 0$的皮卡迭代序列$y_n$（横轴为$t$）。增大$n$：每个迭代函数都在$t_0 = 0$周围更宽的区间上紧贴真实的解，并且在初始点附近收敛最快——这恰好是[[#thm-picard]]的证明中阶乘所定量刻画的行为。
:::

## 皮卡-林德勒夫定理

现在我们证明：在利普希茨条件下，皮卡迭代序列总是收敛的，并且它的极限是唯一的解。唯一性依赖于一个不等式，它的用处远远超出了这个证明。

::: lemma 格朗沃尔（Gronwall）不等式 {#lem-gronwall}
设$w$在$[t_0, t_1]$上连续且非负，$C \ge 0$和$L \ge 0$是常数，满足

$$
w(t) \le C + L\int_{t_0}^{t} w(s)\,ds \qquad (t_0 \le t \le t_1).
$$

则对$t_0 \le t \le t_1$有$w(t) \le C\,e^{L(t - t_0)}$。如果把$\int_{t_0}^t$换成$\int_t^{t_0}$，把$t - t_0$换成$t_0 - t$，那么在$t_0$左侧的区间$[t_1, t_0]$上同样的结论成立。
:::

::: proof
令$W(t) = C + L\int_{t_0}^t w(s)\,ds$。则$W$可导，并且$W' = Lw \le LW$，因为由假设$w \le W$。因此

$$
\frac{d}{dt}\Bigl(e^{-L(t - t_0)}W(t)\Bigr) = e^{-L(t-t_0)}\bigl(W'(t) - LW(t)\bigr) \le 0,
$$

所以$e^{-L(t-t_0)}W(t) \le W(t_0) = C$，从而$w(t) \le W(t) \le Ce^{L(t-t_0)}$。对$t\mapsto w(2t_0 - t)$应用这一结论，即得左侧的情形。
:::

::: theorem 皮卡-林德勒夫定理 {#thm-picard}
设$R = \set{(t,y) : \lvert t - t_0\rvert \le a,\ \lvert y - y_0\rvert \le b}$，其中$a, b > 0$。假设$f$在$R$上连续，并且在$R$上关于$y$满足利普希茨条件，利普希茨常数为$L$。令$M = \max_R \lvert f\rvert$，以及

$$
h = \min\left(a, \frac{b}{M}\right) \qquad (h = a \text{ 若 } M = 0).
$$

则初值问题$y' = f(t,y)$，$y(t_0) = y_0$在$I = [t_0 - h, t_0 + h]$上恰有一个图像位于$R$中的解$y$，并且皮卡迭代序列在$I$上一致收敛于它。
:::

::: proof
以下总设$t \in I$，并且可以假设$L > 0$（利普希茨常数总可以增大）。

**第1步：迭代函数都有定义，并且停留在$R$中。**我们用归纳法证明：每个$y_n$都在$I$上连续，并且$\lvert y_n(t) - y_0\rvert \le b$。对$y_0$这是显然的。若它对$y_n$成立，则$s \mapsto f(s, y_n(s))$在$I$上连续，所以$y_{n+1}$有确切的定义并且连续，而且

$$
\lvert y_{n+1}(t) - y_0\rvert = \left\lvert\int_{t_0}^{t} f(s, y_n(s))\,ds\right\rvert \le M\,\lvert t - t_0\rvert \le Mh \le b .
$$

这里用到了$h \le b/M$的选取：斜率至多为$M$，所以在时间$h$内，迭代函数不可能爬出这个矩形。

**第2步：相邻两项之差很小。**我们断言

$$
\lvert y_{n+1}(t) - y_n(t)\rvert \le \frac{M L^{n}\,\lvert t - t_0\rvert^{n+1}}{(n+1)!} \qquad (t \in I,\ n \ge 0).
$$ {#eq-picard-estimate}

当$n = 0$时，这就是第1步中的估计$\lvert y_1(t) - y_0\rvert \le M\lvert t-t_0\rvert$。若它对$n$成立，则由利普希茨条件（对$t \ge t_0$；$t < t_0$的情形是对称的），

$$
\lvert y_{n+2}(t) - y_{n+1}(t)\rvert \le \int_{t_0}^{t} \bigl\lvert f(s, y_{n+1}(s)) - f(s,y_n(s))\bigr\rvert\,ds \le L\int_{t_0}^t \frac{ML^n (s - t_0)^{n+1}}{(n+1)!}\,ds = \frac{ML^{n+1}(t - t_0)^{n+2}}{(n+2)!}.
$$

**第3步：一致收敛。**把$y_n$写成$y_n = y_0 + \sum_{k=0}^{n-1}(y_{k+1} - y_k)$。由[[#eq-picard-estimate]]，第$k$项在$I$上以常数$M L^k h^{k+1}/(k+1)!$为界，并且

$$
\sum_{k=0}^{\infty}\frac{ML^k h^{k+1}}{(k+1)!} = \frac{M}{L}\bigl(e^{Lh} - 1\bigr) < \infty .
$$

由魏尔斯特拉斯（Weierstrass）M判别法（[[real-analysis/uniform-convergence]]），这个级数在$I$上一致收敛，所以存在$I$上的连续函数$y$，使得$y_n \to y$一致成立。由于每个$\lvert y_n(t) - y_0\rvert \le b$，也有$\lvert y(t) - y_0\rvert \le b$：$y$的图像位于$R$中。

**第4步：极限是初值问题的解。**对$s \in I$，$\lvert f(s, y_n(s)) - f(s, y(s))\rvert \le L\lvert y_n(s) - y(s)\rvert$，它一致地趋于$0$。因此$\int_{t_0}^t f(s,y_n(s))\,ds \to \int_{t_0}^t f(s, y(s))\,ds$，在$y_{n+1}$的定义中令$n\to\infty$，得

$$
y(t) = y_0 + \int_{t_0}^{t} f(s, y(s))\,ds \qquad (t \in I).
$$

由[[#lem-integral]]，$y$在$I$上是该初值问题的解。

**第5步：唯一性。**设$z$是$I$上另一个图像位于$R$中的解。把$y$和$z$的积分方程相减并利用利普希茨条件，可知$w = \lvert y - z\rvert$对$t \ge t_0$满足

$$
w(t) \le \int_{t_0}^{t} L\,w(s)\,ds .
$$

由格朗沃尔不等式（[[#lem-gronwall]]），取$C = 0$，得$w(t) \le 0$，所以当$t \ge t_0$时$w \equiv 0$；左侧的情形则处理$t \le t_0$。因此$z = y$。
:::

::: remark 解不会过早逃离
如果$f$定义在比$R$更大的集合上，那么初值问题的解原则上可能离开$R$。但当$\lvert t - t_0\rvert < h$时它不可能这样做：如果$t_1 > t_0$是使$\lvert z(t_1) - y_0\rvert = b$成立的第一个时刻，那么由在$[t_0, t_1]$上$\lvert z'\rvert \le M$可得$b \le M(t_1 - t_0)$，所以$t_1 - t_0 \ge b/M \ge h$。因此唯一性在$I$上的**所有**解中都成立，而不仅仅是在图像位于$R$中的那些解中成立。
:::

同样的格朗沃尔论证表明，解连续地依赖于它的初值——这就是“确定性模型能够作出预测”这一说法的数学内涵。

::: corollary 解对初值的连续依赖性 {#cor-dependence}
在[[#thm-picard]]的假设下，设$y$和$z$在区间$J \ni t_0$上是$y' = f(t,y)$的解，图像都位于$R$中，初值分别为$y(t_0) = y_0$，$z(t_0) = z_0$。则

$$
\lvert y(t) - z(t)\rvert \le \lvert y_0 - z_0\rvert\,e^{L\lvert t - t_0\rvert} \qquad (t \in J).
$$
:::

::: proof
把积分方程相减，得$\lvert y(t) - z(t)\rvert \le \lvert y_0 - z_0\rvert + L\bigl\lvert\int_{t_0}^t \lvert y(s) - z(s)\rvert\,ds\bigr\rvert$。在$t_0$的两侧分别应用[[#lem-gronwall]]，取$C = \lvert y_0 - z_0\rvert$。
:::

因子$e^{L\lvert t - t_0\rvert}$既是一种保证，也是一种警告：初始误差可能被指数式地放大。在天气这样的混沌系统中，这种放大是真实存在的，它限制了任何预报可信的时间跨度。

::: example 所保证的区间有多长？ {#ex-interval}
对$y' = y^2$，$y(0) = 1$应用[[#thm-picard]]。定理所能保证的最佳区间是什么？它与真实的存在区间相比如何？
::: solution
在$R = \set{\lvert t\rvert \le a,\ \lvert y - 1\rvert \le b}$上，$M = \max\lvert y^2\rvert = (1+b)^2$，并且由[[#prop-c1-lipschitz]]，$f$满足利普希茨条件，$L = 2(1+b)$。定理给出在$\lvert t\rvert \le h$上的存在性，其中

$$
h = \min\left(a, \frac{b}{(1+b)^2}\right).
$$

取$a$很大，我们来最大化$b/(1+b)^2$：它的导数$\frac{1-b}{(1+b)^3}$在$b = 1$处为零，这给出$h = \tfrac14$。因此定理保证在$[-\tfrac14, \tfrac14]$上存在解，而实际的解$1/(1 - t)$在$(-\infty, 1)$上存在。这个定理是**局部**的，而且有意地保守：它只用到了$f$在一个固定矩形上的粗略信息（界$M$）。
:::
:::

::: quiz
对于哪些初始条件，[[#thm-picard]]保证$y' = y^{2/3}$在$t_0$附近有唯一解？（选出所有符合条件的选项。）
- [x] $y(0) = 1$
- [x] $y(2) = -3$
- [ ] $y(0) = 0$
- [ ] $y(5) = 0$
::: solution
$f(y) = y^{2/3}$的导数$f'(y) = \tfrac23 y^{-1/3}$在任何避开直线$y = 0$的矩形上连续且有界。所以对$y_0 = 1$和$y_0 = -3$，可以选取$b < \lvert y_0\rvert$，于是由[[#prop-c1-lipschitz]]得到利普希茨条件。当$y_0 = 0$时，每个矩形都包含满足$y = 0$的点，而$f$在那里不满足利普希茨条件；定理不适用，而且事实上唯一性不成立，就像[[#ex-nonunique]]中那样。
:::
:::

### 整体解与爆破

[[#thm-picard]]是局部的，[[#ex-interval]]说明了原因：在矩形上，斜率的界$M$限制了我们能保证解停留在矩形内的时间长度。如果$f$在整个竖直带形区域上满足利普希茨条件，那么就没有可以离开的矩形，同样的证明在整个区间上都有效。

::: theorem 整体存在性 {#thm-global}
设$f$在带形区域$S = [\alpha, \beta]\times\R$上连续，并且在$S$上关于$y$满足利普希茨条件，利普希茨常数为$L$。则对每个$t_0 \in [\alpha,\beta]$和$y_0\in\R$，初值问题$y' = f(t,y)$，$y(t_0) = y_0$在整个区间$[\alpha,\beta]$上恰有一个解。
:::

::: proof
现在皮卡迭代序列在整个$[\alpha,\beta]$上都有定义，不受任何限制。令$K = \max_{[\alpha,\beta]}\lvert f(t, y_0)\rvert$。则$\lvert y_1(t) - y_0\rvert \le K\lvert t - t_0\rvert$，而与第2步完全相同的归纳给出$\lvert y_{n+1}(t) - y_n(t)\rvert \le KL^n\lvert t-t_0\rvert^{n+1}/(n+1)!$。把$M$换成$K$、把$h$换成$\beta - \alpha$之后，第3—5步可以逐字逐句地照搬。
:::

::: corollary 线性方程有整体解 {#cor-linear-global}
若$p$和$q$在区间$I$上连续，则$y' = -p(t)y + q(t)$经过$I\times\R$中一点的每个解都在整个$I$上存在，并且是唯一的。
:::

::: proof
在每个闭子区间$[\alpha,\beta]\subseteq I$上，$\lvert f(t,y) - f(t,z)\rvert = \lvert p(t)\rvert\,\lvert y - z\rvert \le L\lvert y - z\rvert$，其中$L = \max_{[\alpha,\beta]}\lvert p\rvert$，所以[[#thm-global]]适用。$I$的每一点都位于某个包含$t_0$的这种子区间中，而唯一性使我们可以把这些解拼接起来。
:::

这就在不借助公式的情况下重新得到了[[ode/first-order#thm-linear]]的存在性部分。它也解决了引言中的问题(c)：对$f(t,y) = \sin(ty)$，在任何带形区域上都有$\lvert\partial f/\partial y\rvert = \lvert t\cos(ty)\rvert \le \max(\lvert\alpha\rvert,\lvert\beta\rvert)$，所以解在每个$[\alpha, \beta]$上存在，从而在整个$\R$上存在（[[#exr-2-7]]）。

对于不满足整体利普希茨条件的非线性方程，一般的图景如下。我们不加证明地叙述它（证明并不难，但很繁琐：它利用唯一性把局部解拼接起来）；参见 Teschl 的讲义或 Coddington–Levinson 一书的第1章。

::: theorem 最大解 {#thm-maximal}
设$f$和$\partial f/\partial y$在开集$D\subseteq\R^2$上连续，$(t_0, y_0) \in D$。则该初值问题在一个最大的开区间$(\omega_-, \omega_+) \ni t_0$上有唯一解。若$\omega_+ < \infty$，则当$t\to\omega_+$时，$(t, y(t))$最终会离开$D$的每个紧子集；特别地，若$D = \R^2$，则当$t \to \omega_+$时$\lvert y(t)\rvert\to\infty$。在$\omega_-$处同样如此。
:::

用文字来说：**定义在整个平面上的方程的解，只有通过爆破才会不复存在。**$y = 1/(1 - t)$在$t = 1$处发生的正是这种情况。

::: remark 只有存在性，没有唯一性
皮亚诺（Peano）在1886年证明了（1890年给出完整的证明）：仅凭$f$的连续性，就已经能保证初值问题至少有一个解。他的定理需要用紧性论证（阿尔泽拉-阿斯科利（Arzelà–Ascoli）定理）来代替上面那种类似压缩映射的估计，而且正如[[#ex-nonunique]]所示，它不能保证唯一性。对于应用中几乎所有的方程，$f$都有连续的偏导数，皮卡-林德勒夫定理适用。
:::

## 自治方程与相线 {#sec-phase-line}

右端不依赖于$t$的方程$y' = f(y)$称为**自治**方程。它的斜率场沿每条水平直线都相同，所有本质的信息都可以画在一条竖直直线上，这条直线称为**相线**。

::: definition 平衡点及其稳定性 {#def-equilibrium}
满足$f(y^*) = 0$的数$y^*$称为$y' = f(y)$的**平衡点**（或临界点）；这时常数函数$y\equiv y^*$是一个解。如果从充分接近$y^*$处出发的每个解在$t\to\infty$时都趋于$y^*$，就称这个平衡点是**渐近稳定**的；如果存在从任意接近$y^*$处出发、却离开它的解，就称它是**不稳定**的。
:::

::: proposition 自治方程的解的性态 {#prop-autonomous}
设$f$在$\R$上连续可微。

1. 非常数的解永远不会取到平衡点的值，并且它严格递增或严格递减。
2. 若一个解在它的最大区间$[t_0, \omega_+)$上有界，则$\omega_+ = \infty$，并且当$t \to \infty$时$y(t)$收敛于一个平衡点。
3. 若$f(y^*) = 0$且$f'(y^*) < 0$，则$y^*$是渐近稳定的；若$f'(y^*) > 0$，则它是不稳定的。
:::

::: proof
1. 若$y(t_1) = y^*$，其中$f(y^*) = 0$，则$y$和常数$y^*$在$t_1$处是同一个初值问题的解，所以由唯一性（[[#thm-picard]]；由[[#prop-c1-lipschitz]]，$f$在每一点附近都满足利普希茨条件），$y \equiv y^*$。所以非常数的解对所有$t$都有$f(y(t)) \ne 0$；由于$t\mapsto f(y(t))$连续，由介值定理知它的符号不变。于是$y'$的符号不变，$y$严格单调。

2. 有界的解不会爆破，所以由[[#thm-maximal]]，$\omega_+ = \infty$。由第1部分，它是单调的，所以有极限$\ell$。若$f(\ell) > 0$，则由连续性，对所有充分大的$t$有$y'(t) = f(y(t)) > f(\ell)/2$，这迫使$y(t)\to\infty$，矛盾；类似地，$f(\ell) < 0$也不可能。所以$f(\ell) = 0$。

3. 若$f'(y^*) < 0$，则存在$\delta > 0$，使得在$(y^* - \delta, y^*)$上$f > 0$，在$(y^*, y^* + \delta)$上$f < 0$，并且$y^*$是$(y^* - \delta, y^* + \delta)$中唯一的平衡点。从$(y^*, y^*+\delta)$中出发的解是递减的（第1部分），不能越过$y^*$（仍由第1部分），并且有界，所以由第2部分，它收敛于$[y^*, y^*+\delta)$中的一个平衡点，而这个平衡点只能是$y^*$。从$y^*$下方出发的解可以同样处理。若$f'(y^*) > 0$，则从略高于$y^*$处出发的解递增，不可能收敛于$y^*$，所以它们会离开$y^*$。
:::

画相线时，先标出$f$的零点，然后在相邻两个零点之间，在$f > 0$处画向上的箭头，在$f < 0$处画向下的箭头。两侧箭头都指向它的平衡点是稳定的；这就是[[#prop-autonomous]]背后的图像。

::: example 种群的捕捞 {#ex-harvest}
一个鱼类种群（以其环境容纳量为单位来度量）满足$y' = y(1 - y) - h$，其中常数$h \ge 0$是捕捞率。画出$h = 3/16$时的相线，并描述$h$更大时会发生什么。
::: solution
当$h = \tfrac{3}{16}$时，$f(y) = -y^2 + y - \tfrac3{16} = -(y - \tfrac14)(y - \tfrac34)$。平衡点为$\tfrac14$和$\tfrac34$，而$f'(y) = 1 - 2y$在这两点的值分别为$\tfrac12$和$-\tfrac12$。所以$\tfrac34$是渐近稳定的，$\tfrac14$是不稳定的。在相线上：在$\tfrac14$下方$f < 0$（箭头向下），在两者之间$f > 0$（箭头向上），在$\tfrac34$上方$f < 0$（箭头向下）。

从$\tfrac14$上方出发的种群最终稳定在$\tfrac34$；从$\tfrac14$下方出发的种群递减，并且由于$f(0) = -h < 0$，它在有限时间内降到$0$——渔业崩溃了。一般地，平衡点为$\tfrac12 \pm \sqrt{\tfrac14 - h}$。当$h$增大并趋向$\tfrac14$时，它们彼此靠近，在$h = \tfrac14$时合而为一，并在$h > \tfrac14$时消失，这时处处$f < 0$，每个种群都会崩溃。当参数越过某个临界值时行为发生的这种突变称为**分岔**（这里是鞍结分岔）：捕捞强度稍稍超过$h = \tfrac14$，就会摧毁稳定状态。
:::
:::

::: widget slopefield
f: y*(1 - y) - h
x: 0, 12
y: -0.4, 1.4
sliders: h=0.1875:0:0.35:0.0125
points: 0, 0.2; 0, 0.3; 0, 1.2
caption: 有捕捞的逻辑斯谛增长$y' = y(1-y) - h$（横轴为$t$）。由于方程是自治的，各条解曲线彼此只差一个水平平移。把$h$向上滑到$0.25$，观察稳定平衡点和不稳定平衡点如何相互靠近并湮灭；超过这个值之后，每个解都会崩溃。
:::

::: quiz
对于$y' = y^2 - 1$，下列哪个说法正确？
- [ ] 两个平衡点$y = \pm1$都是稳定的。
- [x] $y = -1$是渐近稳定的，$y = 1$是不稳定的。
- [ ] $y = 1$是渐近稳定的，$y = -1$是不稳定的。
- [ ] 每个解都趋于$-1$。
::: solution
$f(y) = y^2 - 1$满足$f'(-1) = -2 < 0$和$f'(1) = 2 > 0$，所以由[[#prop-autonomous]]，$-1$是渐近稳定的，$1$是不稳定的。并非每个解都趋于$-1$：从$1$上方出发的解递增，而且事实上会在有限时间内爆破（比较$y' = y^2$）。
:::
:::

## 欧拉法

当没有公式可用时，我们就作近似。最简单的想法是沿着斜率场一小段一小段地走直线。

::: algorithm 欧拉法 {#alg-euler}
给定$y' = f(t,y)$，$y(t_0) = y_0$和步长$h > 0$，令$t_n = t_0 + nh$，并且

$$
y_{n+1} = y_n + h\,f(t_n, y_n) \qquad (n = 0, 1, 2, \dots).
$$

则$y_n$就是$y(t_n)$的近似值。
:::

每一步都沿着经过当前点的那个解的切线前进，所以每一步产生$h^2$阶的误差（即解在一步之内的弯曲程度）。在一个固定的时间区间上大约有$1/h$步，这提示总误差是$h$阶的。危险在于，早先产生的误差会被带到后面，并且可能被放大，正如[[#cor-dependence]]中那样。下面的定理表明，这种放大由同一个因子$e^{L(t - t_0)}$控制。

::: theorem 欧拉法的收敛性 {#thm-euler}
设$f$在带形区域$[t_0, T]\times\R$上关于$y$满足利普希茨条件，利普希茨常数为$L > 0$，并且初值问题的解$y$在$[t_0, T]$上二阶连续可导，$\lvert y''\rvert \le K$。则对所有满足$t_n \le T$的$n$，欧拉近似值满足

$$
\lvert y(t_n) - y_n\rvert \le \frac{Kh}{2L}\left(e^{L(t_n - t_0)} - 1\right).
$$

特别地，在固定时刻的误差为$O(h)$：欧拉法**具有一阶精度**。
:::

::: proof
由带余项的泰勒（Taylor）定理，存在某个$\xi_n \in (t_n, t_{n+1})$，使得

$$
y(t_{n+1}) = y(t_n) + h\,y'(t_n) + \frac{h^2}{2}\,y''(\xi_n) = y(t_n) + h\,f\bigl(t_n, y(t_n)\bigr) + \tau_n, \qquad \lvert\tau_n\rvert \le \frac{Kh^2}{2}.
$$

减去欧拉步$y_{n+1} = y_n + hf(t_n, y_n)$，并记$e_n = y(t_n) - y_n$：

$$
\lvert e_{n+1}\rvert \le \lvert e_n\rvert + h\,\bigl\lvert f(t_n, y(t_n)) - f(t_n, y_n)\bigr\rvert + \lvert\tau_n\rvert \le (1 + hL)\,\lvert e_n\rvert + \frac{Kh^2}{2}.
$$

由于$e_0 = 0$，由归纳法得

$$
\lvert e_n\rvert \le \frac{Kh^2}{2}\sum_{j=0}^{n-1}(1 + hL)^j = \frac{Kh^2}{2}\cdot\frac{(1+hL)^n - 1}{hL} = \frac{Kh}{2L}\bigl((1 + hL)^n - 1\bigr).
$$

最后，$1 + hL \le e^{hL}$，所以$(1 + hL)^n \le e^{nhL} = e^{L(t_n - t_0)}$。
:::

::: example 用欧拉法求解指数增长问题 {#ex-euler}
在$[0,1]$上以$h = 0.1$对$y' = y$，$y(0) = 1$应用欧拉法，并把误差与[[#thm-euler]]作比较。
::: solution
这里$y_{n+1} = y_n + hy_n = (1 + h)y_n$，所以$y_n = (1+h)^n$。取$h = 0.1$，$y_{10} = 1.1^{10} \approx 2.5937$，而$y(1) = e \approx 2.7183$。误差约为$0.1245$。

再看误差界：$f(t,y) = y$的$L = 1$，并且在$[0,1]$上$y'' = e^t \le e = K$。定理给出

$$
\lvert e - y_{10}\rvert \le \frac{e\cdot 0.1}{2}\,(e - 1) \approx 0.234,
$$

这个界是成立的，但大约悲观了两倍。把步长减半到$h = 0.05$，得到$1.05^{20} \approx 2.6533$，误差为$0.0650$；再减半一次，误差为$0.0332$。$h$每减半一次，误差大约也减半，这正是一阶方法所应有的表现。（误差接近于$\tfrac{e}{2}h$；比较[[#exr-2-8]]。）
:::
:::

::: widget odesolver
f: y
y0: 1
t: 0, 2
exact: exp(t)
h: 0.25
methods: euler; heun; rk4
caption: 对$y' = y$，$y(0) = 1$应用欧拉法（以及两种更高阶的方法），并与精确解$e^t$作比较。缩小步长，观察整体误差：$h$减半时，欧拉法的误差减半，休恩（Heun）法的误差缩小为四分之一，RK4的误差缩小为十六分之一。这里欧拉法的结果始终偏低，因为解是下凸的，而每一步都沿着一条切线前进，切线位于曲线下方。
:::

::: warning 小步长并非万能
[[#thm-euler]]说的是当$h\to0$时误差趋于零，但在长区间上，常数$e^{L(t_n-t_0)}$可能大得惊人；而且在浮点运算中，非常小的步长会累积舍入误差（[[numerical-analysis/floating-point]]）。此外，数值方法会若无其事地越过爆破时刻、或者穿过解不唯一的点，继续算出数来。在相信计算结果之前，一定要先根据本章的理论弄清楚解能做什么、不能做什么。
:::

::: application 天气预报为什么有预报期限
数值天气预报从今天测得的状态出发，向前积分一个庞大的微分方程组。[[#cor-dependence]]保证初始数据中的小误差在预报中只产生小误差——但误差可能会被放大，放大因子随时间指数增长。对大气来说，这种增长是真实的，而不是某个粗糙误差界造成的假象：1963年，爱德华·洛伦茨（Edward Lorenz）证明了一个简单的三变量对流模型对其初始条件极为敏感。这就是为什么无论计算机有多好，天气预报大约在两周之后就失去了预报能力。
:::

::: history
柯西（Cauchy）在19世纪20年代于巴黎综合理工学院（École polytechnique）讲课时，给出了初值问题的第一个存在性证明：他证明了当$f$和$\partial f/\partial y$连续时，欧拉的折线近似是收敛的；欧拉（Euler）曾在1768年的《积分学原理》（*Institutionum calculi integralis*）中描述过这种折线法。后来，鲁道夫·利普希茨（Rudolf Lipschitz）把关于$\partial f/\partial y$的假设换成了现在以他的名字命名的条件。朱塞佩·皮亚诺（Giuseppe Peano）仅在连续性的假设下证明了存在性（1886年宣布，1890年给出完整的证明）；1890年，埃米尔·皮卡（Émile Picard）发表了逐次逼近法。1894年，恩斯特·林德勒夫（Ernst Lindelöf）改进了皮卡的论证，使这个定理基本上具有了上面所证明的形式。在法国，这一结果常被称为柯西-利普希茨定理。
:::

## 后续内容

[[#thm-picard]]的证明是[[real-analysis/metric-spaces]]一章中所证明的**压缩映射原理**的原型，它可以不加改变地推广到方程组：这时$y$成为向量，绝对值成为范数；我们将用这种方法论证[[ode/second-order-linear]]和[[ode/linear-systems]]两章中解的存在性。欧拉法只是众多数值格式中的第一个；[[numerical-analysis/numerical-odes]]一章将介绍龙格-库塔（Runge–Kutta）法、误差控制和刚性问题。相线是[[ode/nonlinear-systems]]一章中相平面的一维情形，在相平面上，平衡点及其稳定性要丰富得多。

::: summary
- 斜率场把解显示为与线段场相切的曲线；等斜线$f(t,y) = c$可以加快作图。
- 初值问题等价于积分方程$y = y_0 + \int_{t_0}^t f(s,y(s))\,ds$，它的不动点可以由皮卡迭代序列逼近（[[#lem-integral]]，[[#def-picard]]）。
- **皮卡-林德勒夫定理**：若$f$在一个矩形上连续并且关于$y$满足利普希茨条件，则在$\lvert t - t_0\rvert \le \min(a, b/M)$上恰有一个解（[[#thm-picard]]）。$\partial f/\partial y$连续就足以保证利普希茨条件。
- 没有利普希茨条件，唯一性可能不成立（$y' = 3y^{2/3}$）；没有整体的利普希茨条件，解可能爆破（$y' = y^2$）。在整个平面上，爆破是解终止的唯一方式（[[#thm-maximal]]）。
- 格朗沃尔不等式给出唯一性和连续依赖性：$\lvert y(t) - z(t)\rvert \le \lvert y_0 - z_0\rvert e^{L\lvert t-t_0\rvert}$。
- 对于自治方程，非常数的解是单调的，有界的解收敛于平衡点；$f'(y^*) < 0$意味着稳定，$f'(y^*) > 0$意味着不稳定。
- 欧拉法$y_{n+1} = y_n + hf(t_n,y_n)$收敛，误差为$O(h)$（[[#thm-euler]]）。
:::

## 习题

::: exercise 皮卡迭代 {level=1 check="1/3"}
对$y' = -y$，$y(0) = 1$计算前三个皮卡迭代函数$y_1, y_2, y_3$，并求$y_3(1)$的值。
::: solution
$y_1 = 1 + \int_0^t (-1)\,ds = 1 - t$，$y_2 = 1 - \int_0^t (1 - s)\,ds = 1 - t + \frac{t^2}{2}$，$y_3 = 1 - \int_0^t\bigl(1 - s + \frac{s^2}{2}\bigr)ds = 1 - t + \frac{t^2}{2} - \frac{t^3}{6}$。它们是解$e^{-t}$的泰勒多项式，并且$y_3(1) = 1 - 1 + \frac12 - \frac16 = \frac13$（相比之下$e^{-1}\approx 0.368$）。
:::
:::

::: exercise 两步欧拉法 {level=1 check="5/2"}
用$h = 0.5$的欧拉法近似计算$y' = t + y$，$y(0) = 1$的$y(1)$。与精确解$y = 2e^t - t - 1$作比较。
::: solution
$y_1 = 1 + 0.5\,(0 + 1) = 1.5$，$y_2 = 1.5 + 0.5\,(0.5 + 1.5) = 2.5$。精确值为$2e - 2 \approx 3.437$，所以误差约为$0.94$——误差很大，因为$h$很大，而且解下凸得很厉害。
:::
:::

::: exercise 相线 {level=1 check="1"}
画出$y' = y^2 - 4y + 3$的相线，对平衡点进行分类，并对满足$y(0) = 2$的解求$\lim_{t\to\infty} y(t)$。
::: solution
$f(y) = (y - 1)(y - 3)$，$f'(y) = 2y - 4$：$f'(1) = -2 < 0$，所以$y = 1$是渐近稳定的；$f'(3) = 2 > 0$，所以$y = 3$是不稳定的。当$1 < y < 3$时$f < 0$，所以从$2$出发的解递减，并始终保持在$1$的上方，由[[#prop-autonomous]]，它收敛于$1$。
:::
:::

::: exercise 最佳利普希茨常数 {level=2 check="2 + cos(1)"}
求$f(t,y) = t\sin y + y^2$在正方形$\lvert t\rvert \le 1$，$\lvert y\rvert \le 1$上关于$y$的最小利普希茨常数。
::: hint
对于在矩形上$\partial f/\partial y$连续的函数，最小的利普希茨常数是$\max\lvert\partial f/\partial y\rvert$。
:::
::: solution
由[[#prop-c1-lipschitz]]，$L = \max\lvert f_y\rvert$是一个利普希茨常数；它也是最小的，因为$f_y(t,y)$是差商$\frac{f(t,z) - f(t,y)}{z - y}$的极限，而每个差商的绝对值都不超过任何一个利普希茨常数。这里$f_y = t\cos y + 2y$。由于当$\lvert y\rvert \le 1$时$\cos y > 0$，$\lvert t\cos y + 2y\rvert$的最大值在$t = \sgn(y)$时取到，此时它等于$\cos y + 2\lvert y\rvert$，而这个式子关于$\lvert y\rvert$递增，因为它的导数$2 - \sin\lvert y\rvert > 0$。所以最小的常数是$L = \cos 1 + 2 \approx 2.540$。
:::
:::

::: exercise 所保证的区间 {level=2 check="1/2"}
在矩形$\lvert t\rvert\le a$，$\lvert y\rvert\le b$（$a \ge 1$）上对$y' = 1 + y^2$，$y(0) = 0$应用[[#thm-picard]]。定理所能给出的最大的$h$是多少？与真实的解作比较。
::: solution
$M = 1 + b^2$，所以$h = \min\bigl(a, \frac{b}{1+b^2}\bigr)$。函数$b/(1+b^2)$的导数为$(1 - b^2)/(1+b^2)^2$，所以它的最大值在$b = 1$处取到，等于$\frac12$。因此最好的保证是$h = \frac12$。真实的解是$y = \tan t$，它在$(-\frac\pi2, \frac\pi2)$上存在，这个区间大约是前者的三倍长。
:::
:::

::: exercise 全部解 {level=2}
求$y' = \sqrt{\lvert y\rvert}$，$y(0) = 0$在$\R$上有定义的所有解。
::: solution
由于$y' \ge 0$，每个解都是单调不减的。在$y > 0$处，分离变量得$2\sqrt y = t - c$，即当$t > c$时$y = (t-c)^2/4$；在$y < 0$处，由$y' = \sqrt{-y}$得$-2\sqrt{-y} = t - c'$，即当$t < c'$时$y = -(c' - t)^2/4$。像[[#ex-nonunique]]中那样拼接起来，所有的解为：对任意$c' \le 0 \le c$（允许$c' = -\infty$或$c = +\infty$），

$$
y(t) = \begin{cases} -\tfrac14 (c' - t)^2, & t < c', \\ 0, & c' \le t \le c, \\ \tfrac14 (t - c)^2, & t > c. \end{cases}
$$

每一段都满足方程，并且在连接点处导数相等（$=0$）。唯一性不成立，因为$\sqrt{\lvert y\rvert}$在$y = 0$附近不满足利普希茨条件。
:::
:::

::: exercise 永远存在的解 {level=3}
证明初值问题$y' = \sin(ty)$，$y(0) = 1$有定义在整个$\R$上的唯一解。
::: solution
设$\beta > 0$，考虑带形区域$S = [-\beta, \beta]\times\R$。函数$f(t,y) = \sin(ty)$连续，并且在$S$上$\lvert\partial f/\partial y\rvert = \lvert t\cos(ty)\rvert \le \beta$，所以由[[#prop-c1-lipschitz]]（对于带形区域中具有相同$t$的任意两点，连接它们的竖直线段也在带形区域中），$f$在$S$上关于$y$满足利普希茨条件，$L = \beta$。由[[#thm-global]]，在$[-\beta,\beta]$上恰有一个解$y_\beta$。若$\beta < \gamma$，则$y_\gamma$限制在$[-\beta,\beta]$上也是那里的初值问题的解，所以它等于$y_\beta$。因此，对任意$\beta > \lvert t\rvert$令$y(t) = y_\beta(t)$，就得到$\R$上一个确切定义的函数，它是该初值问题的解；而$\R$上的任何解在每个$[-\beta,\beta]$上都与它重合。
:::
:::

::: exercise 欧拉法与数 e {level=3}
对$[0, t]$上的$y' = y$，$y(0) = 1$，取$h = t/n$，利用[[#thm-euler]]证明：对每个$t > 0$，$(1 + t/n)^n \to e^t$，并且误差至多为$\frac{t\,e^{t}(e^t - 1)}{2n}$。
::: solution
欧拉法给出$y_{k+1} = (1 + h)y_k$，所以$n$步之后$y_n = (1 + t/n)^n$，它是$y(t) = e^t$的近似值。在$[0,t]$上，利普希茨常数为$L = 1$，并且$\lvert y''\rvert = e^s \le e^t = K$。定理给出

$$
\left\lvert e^t - \left(1 + \frac tn\right)^n\right\rvert \le \frac{e^t\,(t/n)}{2}\bigl(e^t - 1\bigr) = \frac{t\,e^t(e^t - 1)}{2n} \longrightarrow 0
$$

（$n\to\infty$）。（当$t = 1$时，误差至多为$e(e-1)/(2n)\approx 2.34/n$；真实的误差接近于$e/(2n)\approx 1.36/n$。）
:::
:::

::: exercise 用比较法证明爆破 {level=3}
设$y$是$y' = t^2 + y^2$，$y(0) = 1$在其最大区间$[0,\omega_+)$上的解。证明$\omega_+ \le 1$，从而解至迟在$t = 1$时爆破。
::: hint
只要$y > 0$，就计算$\frac{d}{dt}\left(-\frac1y\right)$，并与$y' = y^2$的解作比较。
:::
::: solution
由于$y' \ge y^2 \ge 0$，$y$单调不减，所以在$[0,\omega_+)$上$y(t) \ge 1 > 0$。在那里，

$$
\frac{d}{dt}\left(-\frac{1}{y}\right) = \frac{y'}{y^2} = \frac{t^2 + y^2}{y^2} \ge 1 .
$$

从$0$到$t$积分：$-\frac{1}{y(t)} + 1 \ge t$，所以$\frac{1}{y(t)} \le 1 - t$。假设$\omega_+ > 1$。则$y$在$[0,1]$上连续，因而在那里有界；然而对$t < 1$有$y(t) \ge \frac{1}{1 - t}\to\infty$（当$t\to1^-$时）：矛盾。因此$\omega_+ \le 1$，并且由[[#thm-maximal]]，当$t\to\omega_+$时$y(t)\to\infty$。（数值计算表明$\omega_+ \approx 0.97$。）
:::
:::
