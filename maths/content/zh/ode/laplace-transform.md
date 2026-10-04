一个电路在$t = 0$时接通，在$t = \pi$时又断开；一把锤子在某一瞬间敲击一根梁；一剂药物以短时推注的方式注入体内。这类强迫项要么是间断的，要么集中在一点上，而[[ode/nonhomogeneous]]一章的方法处理它们相当笨拙——我们不得不在每个区间上分别求解，再把各段拼接起来。**拉普拉斯变换**一举解决了所有这些问题。它把常系数线性微分方程转化为关于解的变换的**代数**方程，自动纳入初始条件，并且处理开关和脉冲就像处理指数函数一样容易。

其思想是用新变量$s$的函数

$$
F(s) = \int_0^\infty e^{-st}f(t)\,dt
$$

来代替函数$f(t)$（$t \ge 0$）。对$t$求导变为乘以$s$；时间上的延迟变为乘以一个指数函数；而系统对输入的响应变为变换的乘积。本章将证明这些性质，学习如何求逆变换，并用它求解初值问题，包括含有阶跃函数、脉冲和卷积积分的问题。

## 定义与初步例子

::: definition 拉普拉斯变换 {#def-laplace}
设$f$在$t \ge 0$上有定义。它的**拉普拉斯变换**是函数

$$
\mathcal{L}\{f\}(s) = F(s) = \int_0^{\infty}e^{-st}f(t)\,dt = \lim_{R\to\infty}\int_0^Re^{-st}f(t)\,dt,
$$ {#eq-laplace}

其定义域是使该反常积分收敛的那些实数$s$。
:::

我们用小写字母表示$t$的函数，用相应的大写字母表示它们的变换：$\mathcal{L}\{y\} = Y$，$\mathcal{L}\{g\} = G$。由于积分是线性的，只要两个变换都存在，变换就是**线性**的：$\mathcal{L}\{af + bg\} = aF + bG$。

::: example 基本的变换 {#ex-basic}
计算$\mathcal{L}\{1\}$、$\mathcal{L}\{e^{at}\}$和$\mathcal{L}\{t^n\}$。
::: solution
当$s > 0$时，$\displaystyle\int_0^R e^{-st}\,dt = \frac{1 - e^{-sR}}{s} \to \frac1s$，所以$\mathcal{L}\{1\} = \dfrac1s$（$s > 0$）；当$s \le 0$时该积分发散。

当$s > a$时，$\displaystyle\int_0^\infty e^{-st}e^{at}\,dt = \int_0^\infty e^{-(s-a)t}\,dt = \frac{1}{s-a}$，所以$\mathcal{L}\{e^{at}\} = \dfrac{1}{s-a}$（$s > a$）。

对于$t^n$（$n \ge 1$），用分部积分：当$s > 0$时，

$$
\int_0^\infty e^{-st}t^n\,dt = \Bigl[-\frac{t^ne^{-st}}{s}\Bigr]_0^\infty + \frac ns\int_0^\infty e^{-st}t^{n-1}\,dt = \frac ns\,\mathcal{L}\{t^{n-1}\},
$$

这是因为当$t\to\infty$时$t^ne^{-st}\to0$。从$\mathcal{L}\{1\} = 1/s$出发，用数学归纳法得

$$
\mathcal{L}\{t^n\} = \frac{n!}{s^{n+1}} \qquad (s > 0).
$$
:::
:::

::: widget plot
f: exp(-s*x)*x^2
x: 0, 30
y: 0, 6
sliders: s=1:0.3:3:0.01
shade: 0, 30
labels: e^{-st}\,t^2
caption: 把拉普拉斯变换看作面积。$e^{-st}t^2$下方的阴影区域的面积为$F(s) = 2/s^3$（横轴为$t$）。增大$s$：指数因子使被积函数更早地衰减为零，面积缩小并趋于$0$。把$s$减小并趋向$0$：峰向右移动并且变高，到$s = 0$时面积将为无穷大。
:::

并非每个函数都有拉普拉斯变换：$e^{t^2}$增长得太快，以至于对每个$s$都有$e^{-st}e^{t^2}\to\infty$。下面这类函数已足以涵盖本课程中的所有应用。

::: definition 分段连续性与指数阶 {#def-exp-order}
如果$[0,\infty)$上的函数$f$在每个有界区间$[0,R]$上至多有有限个间断点，并且每个间断点都是跳跃间断点（单侧极限存在且有限），就称$f$是**分段连续**的。如果存在常数$K$和$T$，使得

$$
\lvert f(t)\rvert \le K\,e^{at} \qquad\text{对所有 } t \ge T.
$$

就称$f$具有**指数阶**$a$。
:::

多项式、$e^{bt}$、$\sin bt$、$\cos bt$以及它们的乘积与和都具有指数阶，每个有界的分段连续函数也是如此（取$a = 0$）。

::: theorem 变换的存在性 {#thm-existence}
若$f$在$[0,\infty)$上分段连续且具有指数阶$a$，则对每个$s > a$，$\mathcal{L}\{f\}(s)$都存在，并且当$s\to\infty$时$F(s)\to0$。
:::

::: proof
设$K, T$如[[#def-exp-order]]中所述，并令$M = \sup_{[0,T]}\lvert f\rvert$；由于分段连续函数在有界区间上有界，$M$是有限的。在$T$处把积分拆开。$[0,T]$上的积分是分段连续函数的常义黎曼积分。在$[T,\infty)$上，$\lvert e^{-st}f(t)\rvert \le Ke^{-(s-a)t}$，而当$s > a$时$\int_T^\infty Ke^{-(s-a)t}\,dt$收敛；由反常积分的比较判别法（[[calculus-1/improper-integrals]]），$\int_T^\infty e^{-st}f(t)\,dt$绝对收敛。此外，当$s > \max(a, 0)$时，

$$
\lvert F(s)\rvert \le M\int_0^Te^{-st}\,dt + K\int_T^\infty e^{-(s-a)t}\,dt \le \frac{M}{s} + \frac{K}{s - a} \longrightarrow 0 \qquad (s\to\infty).
$$
:::

一个有用的推论：像$F(s) = 1$或$F(s) = \frac{s}{s+1}$这样不趋于$0$的函数，不是任何具有指数阶的分段连续函数的变换。（后面会看到，它是某种更奇特的对象的变换——见下文的狄拉克δ函数。）

## 导数的变换

使拉普拉斯变换在微分方程中大有用武之地的性质是：它把求导变成乘法。

::: theorem 导数的变换 {#thm-derivative}
设$f$在$[0,\infty)$上连续且具有指数阶$a$，$f'$在$[0,\infty)$上分段连续。则当$s > a$时

$$
\mathcal{L}\{f'\}(s) = s\,F(s) - f(0).
$$ {#eq-derivative}

如果还有$f'$连续且具有指数阶$a$，$f''$分段连续，那么

$$
\mathcal{L}\{f''\}(s) = s^2F(s) - s\,f(0) - f'(0).
$$ {#eq-second-derivative}
:::

::: proof
固定$R > 0$，设$0 < t_1 < \dots < t_k < R$是$f'$的间断点；令$t_0 = 0$，$t_{k+1} = R$。在每个$[t_j, t_{j+1}]$上$f$连续可微（端点处取单侧导数），所以分部积分给出

$$
\int_{t_j}^{t_{j+1}}e^{-st}f'(t)\,dt = \Bigl[e^{-st}f(t)\Bigr]_{t_j}^{t_{j+1}} + s\int_{t_j}^{t_{j+1}}e^{-st}f(t)\,dt .
$$

对$j$求和，由于$f$连续，边界项逐项相消：

$$
\int_0^Re^{-st}f'(t)\,dt = e^{-sR}f(R) - f(0) + s\int_0^Re^{-st}f(t)\,dt .
$$

当$s > a$时，对$R \ge T$有$\lvert e^{-sR}f(R)\rvert \le Ke^{-(s-a)R}\to0$（$R\to\infty$），而最后一个积分趋于$sF(s)$。这就证明了[[#eq-derivative]]。用$f'$代替$f$应用这一结果，得$\mathcal{L}\{f''\} = s\,\mathcal{L}\{f'\} - f'(0) = s\bigl(sF - f(0)\bigr) - f'(0)$。
:::

由数学归纳法，在类似的假设下有$\mathcal{L}\{f^{(n)}\} = s^nF(s) - s^{n-1}f(0) - \dots - f^{(n-1)}(0)$。这个定理还可以用来计算变换。若$f = \sin bt$，则$f'' = -b^2f$，$f(0) = 0$，$f'(0) = b$，于是[[#eq-second-derivative]]给出$s^2F - b = -b^2F$，即

$$
\mathcal{L}\{\sin bt\} = \frac{b}{s^2 + b^2}, \qquad\text{类似地}\qquad \mathcal{L}\{\cos bt\} = \frac{s}{s^2+b^2} \qquad (s > 0).
$$

::: proposition 初值定理 {#prop-ivt}
设$f$在$[0,\infty)$上连续，$f'$分段连续，并且$f$和$f'$都具有指数阶。则$\displaystyle\lim_{s\to\infty}s\,F(s) = f(0)$。
:::

::: proof
由[[#eq-derivative]]，$sF(s) - f(0) = \mathcal{L}\{f'\}(s)$；而对$f'$应用[[#thm-existence]]可知，当$s\to\infty$时$\mathcal{L}\{f'\}(s)\to0$。
:::

初值定理使我们无须求逆变换就能从$F$读出$f(0)$——这是检验所算变换的一个有用手段。还有一个**终值**定理$\lim_{t\to\infty}f(t) = \lim_{s\to0^+}sF(s)$，但它只在$f(t)$确实有极限时成立（例如当$sF(s)$的所有极点都具有负实部时）；如果把它用于$f = \sin t$，就会得出$\lim\sin t = 0$这一错误结论。

::: intuition 为什么变换能把微积分化为代数
指数函数$e^{st}$正是那些在求导下仅仅被伸缩的函数：$\frac{d}{dt}e^{st} = s\,e^{st}$。拉普拉斯变换度量的是一个函数“含有多少”各个$e^{-st}$，因此在变换的一侧，求导就变成了乘以$s$——只差一个边界项$f(0)$，它来源于我们只考虑$t \ge 0$这一事实。这与[[ode/second-order-linear]]一章中尝试$y = e^{rt}$的想法相同，只不过同时用于所有的指数函数。
:::

再补充两条法则，基本工具就齐全了。

::: theorem 第一平移定理 {#thm-shift-s}
若$\mathcal{L}\{f\}(s) = F(s)$对$s > a$存在，则对任意实数$c$，

$$
\mathcal{L}\{e^{ct}f(t)\}(s) = F(s - c) \qquad (s > a + c).
$$
:::

::: proof
$\displaystyle\mathcal{L}\{e^{ct}f\}(s) = \int_0^\infty e^{-st}e^{ct}f(t)\,dt = \int_0^\infty e^{-(s-c)t}f(t)\,dt = F(s - c)$，当$s - c > a$时该积分收敛。
:::

::: proposition 乘以 t {#prop-mult-t}
若$f$分段连续且具有指数阶$a$，则$F$在$s > a$时可导，且

$$
\mathcal{L}\{t\,f(t)\}(s) = -F'(s).
$$
:::

::: proof
形式上，只需在积分号下对[[#eq-laplace]]求导：$\frac{d}{ds}e^{-st}f(t) = -te^{-st}f(t)$。为了严格论证这一点，固定$s_0 > a$以及$a < a' < s_0$。由于对适当的常数$C$有$t\le Ce^{(a' - a)t}$，函数$t\,f(t)$具有指数阶$a'$，所以当$s \ge s_0$时，被积函数$-te^{-st}f(t)$被可积函数$CK e^{-(s_0 - a')t}$控制（当$t\ge T$时）。因此，对$s$求导后所得被积函数的积分在$s\ge s_0$上一致收敛，而这正是反常积分可以在积分号下求导的标准条件（[[real-analysis/uniform-convergence]]）。
:::

例如，$\mathcal{L}\{t\sin bt\} = -\frac{d}{ds}\frac{b}{s^2+b^2} = \frac{2bs}{(s^2+b^2)^2}$——这正是共振背后的变换。

| $f(t)$ | $F(s)$ | | $f(t)$ | $F(s)$ |
|---|---|---|---|---|
| $1$ | $\dfrac1s$ | | $e^{at}$ | $\dfrac{1}{s-a}$ |
| $t^n$ | $\dfrac{n!}{s^{n+1}}$ | | $t^ne^{at}$ | $\dfrac{n!}{(s-a)^{n+1}}$ |
| $\sin bt$ | $\dfrac{b}{s^2+b^2}$ | | $e^{at}\sin bt$ | $\dfrac{b}{(s-a)^2+b^2}$ |
| $\cos bt$ | $\dfrac{s}{s^2+b^2}$ | | $e^{at}\cos bt$ | $\dfrac{s-a}{(s-a)^2+b^2}$ |
| $u(t-c)$ | $\dfrac{e^{-cs}}{s}$ | | $\delta(t-c)$ | $e^{-cs}$ |

::: quiz
$\mathcal{L}\{e^{3t}\sin 2t\}$等于什么？
- [x] $\dfrac{2}{(s-3)^2 + 4}$
- [ ] $\dfrac{2}{(s+3)^2 + 4}$
- [ ] $\dfrac{2}{s - 3}\cdot\dfrac{1}{s^2 + 4}$
- [ ] $\dfrac{s - 3}{(s-3)^2 + 4}$
::: solution
$\mathcal{L}\{\sin2t\} = \frac{2}{s^2+4}$，而由第一平移定理，乘以$e^{3t}$相当于把$s$换成$s - 3$。乘积的变换**不是**变换的乘积。最后一个选项是$e^{3t}\cos 2t$的变换。
:::
:::

## 求逆变换与求解初值问题

要使用变换，就必须能够变换回去：给定$F$，求出满足$\mathcal{L}\{f\} = F$的$f$。记作$f = \mathcal{L}^{-1}\{F\}$。只有当$f$由$F$唯一确定时，这样做才有意义。

::: theorem 逆变换的唯一性（Lerch） {#thm-lerch}
设$f$和$g$在$[0,\infty)$上连续且具有指数阶，并且对所有充分大的$s$有$\mathcal{L}\{f\}(s) = \mathcal{L}\{g\}(s)$。则在$[0,\infty)$上$f = g$。（对于分段连续函数，则除了可能在间断点处不同以外，$f = g$。）
:::

::: proof
令$h = f - g$，它具有指数阶$a$，于是对所有$s \ge s_1$有$\mathcal{L}\{h\}(s) = 0$，其中可以取$s_1 > a + 1$。作代换$x = e^{-t}$，它把$[0,\infty)$映成$(0,1]$，且$dt = -dx/x$。对$n = 0,1,2,\dots$，

$$
0 = \mathcal{L}\{h\}(s_1 + n) = \int_0^1 x^{\,s_1 + n - 1}\,h(-\ln x)\,dx = \int_0^1x^n\varphi(x)\,dx, \qquad \varphi(x) = x^{s_1 - 1}h(-\ln x).
$$

函数$\varphi$在$(0,1]$上连续，且当$x\to0^+$时$\lvert\varphi(x)\rvert \le Kx^{s_1 - 1 - a}\to0$，所以$\varphi$可以延拓为$[0,1]$上的连续函数，并且它的各阶矩$\int_0^1x^n\varphi$全都为零。因此对每个多项式$p$都有$\int_0^1 p\,\varphi = 0$。由魏尔斯特拉斯逼近定理，存在多项式序列，使得在$[0,1]$上一致地有$p_k\to\varphi$，从而$\int_0^1\varphi^2 = \lim_k\int_0^1p_k\varphi = 0$。满足$\int\varphi^2 = 0$的连续函数恒为零，所以$\varphi\equiv0$，从而$h\equiv 0$。分段连续的情形可以按同样的思路证明。
:::

实际中，我们先用**部分分式**（[[calculus-1/integration-techniques]]）和**配方**把$F$变形，再对照表中的条目来求逆变换。（还有一个显式的反演公式，即复$s$平面上的一个围道积分，可以用[[complex-analysis/residues]]一章的方法计算，不过我们不需要它。）

求解初值问题$ay'' + by' + cy = g(t)$，$y(0) = y_0$，$y'(0) = y_1$的方法分三步：

1. **变换**：利用[[#eq-second-derivative]]对方程作变换：$a\bigl(s^2Y - sy_0 - y_1\bigr) + b\bigl(sY - y_0\bigr) + cY = G(s)$。
2. **求解**：从这个代数方程中解出$Y(s)$：$Y(s) = \dfrac{G(s) + (as + b)y_0 + ay_1}{as^2 + bs + c}$。
3. **求逆**：求逆变换，得到$y(t) = \mathcal{L}^{-1}\{Y\}$。

特征多项式重新作为分母出现，而初始条件被自动纳入：最后不需要再确定任何任意常数。（严格地说，第1步假定了$y$和$y'$具有指数阶；当$g$具有指数阶时，这类方程的解确实如此，因此该方法是自洽的；何况答案总可以通过代入原方程来检验。）

::: example 部分分式 {#ex-ivp1}
求解$y'' - y' - 2y = 0$，$y(0) = 1$，$y'(0) = 0$。
::: solution
作变换，得$\bigl(s^2Y - s\bigr) - \bigl(sY - 1\bigr) - 2Y = 0$，所以$(s^2 - s - 2)Y = s - 1$，且

$$
Y(s) = \frac{s - 1}{(s - 2)(s + 1)} = \frac{A}{s - 2} + \frac{B}{s+1}.
$$

去分母得$s - 1 = A(s+1) + B(s - 2)$；令$s = 2$得$A = \tfrac13$，令$s = -1$得$B = \tfrac23$。查表得

$$
y(t) = \tfrac13e^{2t} + \tfrac23e^{-t}.
$$

验证：$y(0) = 1$，$y'(0) = \tfrac23 - \tfrac23 = 0$。
:::
:::

::: example 复根与第一平移定理 {#ex-ivp2}
求解$y'' + 2y' + 5y = 5$，$y(0) = y'(0) = 0$。
::: solution
作变换，得$(s^2 + 2s + 5)Y = \dfrac5s$，所以$Y = \dfrac{5}{s(s^2 + 2s + 5)}$。分母含不可约二次因式时的部分分式分解：由$\dfrac{5}{s(s^2+2s+5)} = \dfrac As + \dfrac{Bs + C}{s^2 + 2s + 5}$得$5 = A(s^2 + 2s + 5) + (Bs + C)s$，所以$A = 1$，$B = -1$，$C = -2$。配方得$s^2 + 2s + 5 = (s+1)^2 + 4$，于是

$$
Y = \frac1s - \frac{s + 2}{(s+1)^2 + 4} = \frac1s - \frac{s+1}{(s+1)^2 + 4} - \frac12\cdot\frac{2}{(s+1)^2+4}.
$$

由变换表和第一平移定理，

$$
y(t) = 1 - e^{-t}\cos 2t - \tfrac12e^{-t}\sin 2t .
$$

解从静止状态出发，向稳态值$1$上升，略有超调，并伴有逐渐衰减的振荡——这就是欠阻尼系统的阶跃响应。
:::
:::

::: example 用变换处理共振 {#ex-resonance}
求解$y'' + y = \cos t$，$y(0) = y'(0) = 0$。
::: solution
作变换，得$(s^2 + 1)Y = \dfrac{s}{s^2+1}$，所以$Y = \dfrac{s}{(s^2+1)^2}$，它不在基本变换表中。但是

$$
\frac{s}{(s^2+1)^2} = -\frac12\,\frac{d}{ds}\left(\frac{1}{s^2+1}\right),
$$

而由[[#prop-mult-t]]，$-\frac{d}{ds}\mathcal{L}\{\sin t\} = \mathcal{L}\{t\sin t\}$。因此$y(t) = \tfrac12t\sin t$：这正是[[ode/nonhomogeneous]]一章中的共振解，而这里无须猜测试探解的形式就得到了它。分母中的重因子$(s^2 + 1)^2$——即$s = \pm i$处的二重极点——是共振在变换一侧的标志。
:::
:::

::: warning 初始条件必须在 t = 0 处给出
变换中纳入的是$y(0)$和$y'(0)$。如果数据是在其他时刻给出的，比如$y(2) = 1$，$y'(2) = 0$，就要先平移时间变量：令$\tau = t - 2$，$w(\tau) = y(\tau + 2)$，就把问题化为关于$w$、数据在$\tau = 0$处给出的问题（强迫项也相应地平移）。对于常系数方程，方程本身在这一平移下保持不变。
:::

### 方程组

拉普拉斯变换同样可以轻松地处理几个相互耦合的方程：每个方程都变成一个代数方程，再求解所得的**线性方程组**，就得到各个变换。

::: example 两个耦合的容器 {#ex-system}
求解$x' = -2x + y$，$y' = x - 2y$，$x(0) = 1$，$y(0) = 0$。（它们描述两个相连的隔室，二者相互交换物质，同时也向外界流失物质。）
::: solution
对两个方程作变换，得$sX - 1 = -2X + Y$和$sY = X - 2Y$，即

$$
(s + 2)X - Y = 1, \qquad -X + (s+2)Y = 0 .
$$

由克拉默法则，系数行列式为$(s+2)^2 - 1 = (s+1)(s+3)$，

$$
X = \frac{s + 2}{(s+1)(s+3)} = \frac{1/2}{s+1} + \frac{1/2}{s+3}, \qquad Y = \frac{1}{(s+1)(s+3)} = \frac{1/2}{s+1} - \frac{1/2}{s+3}.
$$

因此$x(t) = \tfrac12\bigl(e^{-t} + e^{-3t}\bigr)$，$y(t) = \tfrac12\bigl(e^{-t} - e^{-3t}\bigr)$。指数中的数$-1$和$-3$是系数矩阵$\begin{pmatrix}-2 & 1\\ 1 & -2\end{pmatrix}$的特征值——这正是[[ode/linear-systems]]一章的出发点。
:::
:::

## 阶跃函数与第二平移定理

::: definition 亥维赛阶跃函数 {#def-heaviside}
**单位阶跃**函数（亥维赛函数）定义为：当$t < 0$时$u(t) = 0$，当$t \ge 0$时$u(t) = 1$。它的平移$u(t - c)$（$c \ge 0$）在时刻$c$接通。
:::

开关可以由阶跃函数构造出来：$u(t - a) - u(t - b)$在$[a, b)$上等于$1$，在其他地方等于$0$（矩形脉冲）；而$f(t)\bigl(1 - u(t - c)\bigr) + g(t)u(t - c)$在时刻$c$从$f$切换到$g$。直接计算得$\mathcal{L}\{u(t-c)\} = \int_c^\infty e^{-st}\,dt = e^{-cs}/s$。更一般地，把一个信号延迟，相当于把它的变换乘以一个指数函数。

::: theorem 第二平移定理 {#thm-shift-t}
若$\mathcal{L}\{f\}(s) = F(s)$对$s > a$存在，且$c \ge 0$，则

$$
\mathcal{L}\bigl\{u(t - c)\,f(t - c)\bigr\}(s) = e^{-cs}F(s) \qquad (s > a).
$$

等价地，$\mathcal{L}^{-1}\{e^{-cs}F(s)\} = u(t-c)\,f(t-c)$。
:::

::: proof
当$t < c$时被积函数为零，所以作代换$\tau = t - c$，得

$$
\int_0^\infty e^{-st}u(t-c)f(t-c)\,dt = \int_c^\infty e^{-st}f(t - c)\,dt = \int_0^\infty e^{-s(\tau + c)}f(\tau)\,d\tau = e^{-cs}F(s).
$$
:::

::: warning 要平移整个函数
$u(t - c)f(t - c)$的图像是把$f$的图像向右平移$c$个单位——$u(t - c)f(t)$则不是。要对$u(t - c)f(t)$作变换，先把$f(t) = f\bigl((t - c) + c\bigr)$写成$t - c$的函数。例如$u(t - 1)\,t^2 = u(t-1)\bigl((t-1)^2 + 2(t-1) + 1\bigr)$，它的变换是$e^{-s}\bigl(\frac{2}{s^3} + \frac{2}{s^2} + \frac1s\bigr)$，而不是$e^{-s}\cdot\frac{2}{s^3}$。
:::

::: example 矩形脉冲 {#ex-pulse}
一个静止的无阻尼振子从$t = 0$到$t = \pi$受到单位力的推动：$y'' + y = 1 - u(t - \pi)$，$y(0) = y'(0) = 0$。求其运动。
::: solution
作变换，得$(s^2 + 1)Y = \dfrac{1 - e^{-\pi s}}{s}$，所以

$$
Y = \bigl(1 - e^{-\pi s}\bigr)\,\frac{1}{s(s^2+1)} = \bigl(1 - e^{-\pi s}\bigr)\left(\frac1s - \frac{s}{s^2+1}\right).
$$

由于$\mathcal{L}^{-1}\left\{\frac1s - \frac{s}{s^2+1}\right\} = 1 - \cos t$，由第二平移定理得

$$
y(t) = (1 - \cos t) - u(t - \pi)\bigl(1 - \cos(t - \pi)\bigr) = \begin{cases} 1 - \cos t, & 0 \le t < \pi, \\ -2\cos t, & t \ge \pi, \end{cases}
$$

这里用到了$\cos(t - \pi) = -\cos t$。在推动期间，质点围绕新的平衡位置$y = 1$振动；在$t = \pi$时它位于$y = 2$处且速度为零；外力撤去后，它以振幅$2$围绕$0$振动。解及其导数在$t = \pi$处连续，而$y''$有跳跃，这正是方程所要求的。
:::
:::

::: widget plot
f: (1 - cos(x)) - heaviside(x - a)*(1 - cos(x - a)); if(x < a, 1, 0)
x: 0, 20
y: -2.5, 2.5
sliders: a=3.14:0.5:12.6:0.02
labels: y(t); \text{外力}
caption: 从静止出发时$y'' + y = 1 - u(t-a)$的响应（横轴为$t$）。推动结束后，$y = \cos(t - a) - \cos t$，这是振幅为$2\lvert\sin(a/2)\rvert$的振动。调节$a$：恰好持续一个周期（$a = 2\pi \approx 6.28$）的推动使振子完全静止，而持续半个周期（$a = \pi$）的推动留下的运动最大。
:::

## 脉冲与狄拉克δ函数

锤击在极短的时间内施加一个很大的力。重要的不是力的具体细节，而是它的总**冲量**$\int F\,dt$。为了模拟时刻$c$处的单位脉冲，考虑脉冲

$$
d_w(t - c) = \frac{1}{w}\bigl(u(t - c) - u(t - c - w)\bigr),
$$

它们在$[c, c + w)$上的高度为$1/w$，总积分为$1$。它们的变换为

$$
\mathcal{L}\{d_w(t-c)\} = \frac{e^{-cs}}{w}\cdot\frac{1 - e^{-ws}}{s} \longrightarrow e^{-cs} \qquad (w\to0^+),
$$

这是因为$\frac{1 - e^{-ws}}{ws}\to1$。没有任何函数具有这些极限性质——它必须在$t\neq c$处为零，而积分仍为$1$——但假装存在这样的函数会带来极大的方便。

::: definition 狄拉克δ函数 {#def-delta}
**狄拉克δ函数**$\delta(t - c)$（$c \ge 0$）是时刻$c$处理想化的单位脉冲，它由**筛选性质**刻画：对连续函数$f$（$c > 0$），$\int_0^\infty f(t)\,\delta(t - c)\,dt = f(c)$。特别地，

$$
\mathcal{L}\{\delta(t - c)\} = e^{-cs}.
$$
:::

::: remark 使δ函数严格化
δ函数并不是函数，而是一个**广义函数**（分布）：它是一个法则，把每个光滑的检验函数$f$对应到数$f(c)$。洛朗·施瓦茨（Laurent Schwartz）在20世纪40年代建立的广义函数论使本节中的每一步运算都变得严格。就我们的目的而言，有一个朴素的解释：$L[y] = \delta(t - c)$的解，是当$w\to0^+$时$L[y] = d_w(t-c)$的解的极限，下面的图让你亲眼看到这个极限过程。还要注意，$\mathcal{L}\{\delta\} = 1$不趋于$0$，这与[[#thm-existence]]是一致的：δ函数不属于那里所考虑的函数类。
:::

::: example 锤击 {#ex-impulse}
一个静止的阻尼振子在$t = \pi$时受到一个单位脉冲：$y'' + 2y' + 2y = \delta(t - \pi)$，$y(0) = y'(0) = 0$。求其运动。
::: solution
作变换，得$(s^2 + 2s + 2)Y = e^{-\pi s}$，所以

$$
Y = e^{-\pi s}\,\frac{1}{(s+1)^2 + 1}.
$$

由第一平移定理，$\mathcal{L}^{-1}\left\{\frac{1}{(s+1)^2+1}\right\} = e^{-t}\sin t$，于是第二平移定理给出

$$
y(t) = u(t - \pi)\,e^{-(t-\pi)}\sin(t - \pi).
$$

在$t = \pi$之前什么也不发生。此后$y$连续（$y(\pi) = 0$），但$y'$从$0$跳到$1$：单位脉冲作用在单位质量上，使其速度瞬间改变一个单位。之后质点作阻尼振动。
:::
:::

::: widget plot
f: ((1 - cos(x)) - heaviside(x - w)*(1 - cos(x - w)))/w; sin(x)
x: 0, 12
y: -1.5, 1.5
sliders: w=2:0.05:3:0.01
labels: y_w(t); \sin t
caption: 从静止出发时$y'' + y = d_w(t)$的响应，其中$d_w$是高度为$1/w$、宽度为$w$的脉冲（横轴为$t$）。缩小宽度$w$：响应收敛于$\sin t$，即$y'' + y = \delta(t)$的解，也就是**脉冲响应**。在极限下，起作用的只是总冲量，而不是脉冲的形状。
:::

::: quiz
$\mathcal{L}^{-1}\left\{\dfrac{e^{-2s}}{s^2}\right\}$等于什么？
- [ ] $t^2u(t - 2)$
- [ ] $u(t - 2)\,t$
- [x] $u(t - 2)\,(t - 2)$
- [ ] $e^{-2t}\,t$
::: solution
$\mathcal{L}^{-1}\{1/s^2\} = t$，而由第二平移定理，因子$e^{-2s}$把它延迟$2$：$u(t-2)(t-2)$，这是一个从$t = 2$开始的斜坡函数。选项$e^{-2t}t$混淆了两个平移定理：它是$1/(s+2)^2$的逆变换。
:::
:::

## 卷积

乘积的变换不是变换的乘积。但存在一种函数运算，它的变换**恰好就是**乘积。

::: definition 卷积 {#def-convolution}
$[0,\infty)$上两个分段连续函数$f, g$的**卷积**为

$$
(f * g)(t) = \int_0^tf(\tau)\,g(t - \tau)\,d\tau \qquad (t \ge 0).
$$
:::

作代换$\tau\mapsto t - \tau$可知$f * g = g * f$；卷积还满足结合律以及对加法的分配律。它不是普通的乘积：$1 * 1 = \int_0^t 1\,d\tau = t$。

::: theorem 卷积定理 {#thm-convolution}
若$f$和$g$分段连续且具有指数阶$a$，则对每个$\eps > 0$，$f * g$具有指数阶$a + \eps$，并且

$$
\mathcal{L}\{f * g\}(s) = F(s)\,G(s) \qquad (s > a).
$$
:::

::: proof
先作增长估计：如果对所有$t\ge0$都有$\lvert f(t)\rvert, \lvert g(t)\rvert \le Ke^{at}$（把$K$放大以覆盖$[0,T]$），那么$\lvert(f*g)(t)\rvert \le \int_0^tK^2e^{a\tau}e^{a(t-\tau)}\,d\tau = K^2te^{at}$，它是$O(e^{(a+\eps)t})$。现在设$s > a$，

$$
F(s)G(s) = \int_0^\infty e^{-s\tau}f(\tau)\,d\tau\int_0^\infty e^{-s\sigma}g(\sigma)\,d\sigma = \int_0^\infty\!\!\int_0^\infty e^{-s(\tau+\sigma)}f(\tau)g(\sigma)\,d\sigma\,d\tau .
$$

在内层积分中作代换$t = \tau + \sigma$（$\tau$固定）：

$$
F(s)G(s) = \int_0^\infty\int_\tau^\infty e^{-st}f(\tau)\,g(t - \tau)\,dt\,d\tau .
$$

积分区域为$\set{(\tau, t) : 0 \le \tau \le t}$。这个二重积分绝对收敛——用$\lvert f\rvert, \lvert g\rvert$代替$f, g$作同样的计算，得到有限的乘积$\int_0^\infty e^{-s\tau}\lvert f\rvert\,d\tau\int_0^\infty e^{-s\sigma}\lvert g\rvert\,d\sigma$——所以由富比尼定理（[[multivariable/multiple-integrals]]），可以交换积分次序，先对$\tau$从$0$到$t$积分：

$$
F(s)G(s) = \int_0^\infty e^{-st}\left(\int_0^tf(\tau)\,g(t-\tau)\,d\tau\right)dt = \mathcal{L}\{f*g\}(s).
$$
:::

下面两个推论说明了卷积为什么在线性系统理论中处于核心地位。

- **乘积的逆变换。**$\mathcal{L}^{-1}\{F\,G\} = f * g$，这是求逆变换的一种新方法。
- **传递函数。**对于$ay'' + by' + cy = g(t)$，$y(0) = y'(0) = 0$，变换后的方程为$Y = H(s)G(s)$，其中$H(s) = \dfrac{1}{as^2 + bs + c}$称为**传递函数**。它的逆变换$h = \mathcal{L}^{-1}\{H\}$是对$g = \delta$的响应，称为**脉冲响应**，并且

$$
y(t) = (h * g)(t) = \int_0^th(t - \tau)\,g(\tau)\,d\tau .
$$ {#eq-duhamel}

这正是[[ode/nonhomogeneous#cor-green]]中的格林函数公式，而这里只用两行就推导出来了：对任意输入的响应，是延迟的脉冲响应的叠加。

::: example 用卷积求逆变换 {#ex-convolution}
求$\mathcal{L}^{-1}\left\{\dfrac{1}{s^2(s^2+1)}\right\}$。
::: solution
把这个变换写成$\frac{1}{s^2}\cdot\frac{1}{s^2+1} = \mathcal{L}\{t\}\,\mathcal{L}\{\sin t\}$。由[[#thm-convolution]]，

$$
\mathcal{L}^{-1}\left\{\frac{1}{s^2(s^2+1)}\right\} = \int_0^t\tau\sin(t - \tau)\,d\tau = \Bigl[\tau\cos(t - \tau)\Bigr]_0^t - \int_0^t\cos(t-\tau)\,d\tau = t - \sin t,
$$

其中用到了分部积分。用部分分式$\frac{1}{s^2(s^2+1)} = \frac{1}{s^2} - \frac{1}{s^2+1}$可以验证这个答案。
:::
:::

::: example 积分方程 {#ex-volterra}
求解**沃尔泰拉积分方程**$y(t) = t + \displaystyle\int_0^t\sin(t - \tau)\,y(\tau)\,d\tau$。
::: solution
其中的积分是$(\sin * y)(t)$，所以作变换得$Y = \dfrac{1}{s^2} + \dfrac{1}{s^2+1}Y$。解得

$$
Y\cdot\frac{s^2}{s^2+1} = \frac{1}{s^2} \quad\Longrightarrow\quad Y = \frac{s^2 + 1}{s^4} = \frac{1}{s^2} + \frac{1}{s^4},
$$

从而$y(t) = t + \dfrac{t^3}{6}$。代回原方程可以验证$t + \int_0^t\sin(t-\tau)\bigl(\tau + \frac{\tau^3}{6}\bigr)\,d\tau = t + \frac{t^3}{6}$。这类积分方程用来为具有记忆的系统建模，例如黏弹性材料和带时滞的种群模型。
:::
:::

::: quiz
常值函数$1$与自身的卷积$(1 * 1)(t)$等于什么？
- [ ] $1$
- [x] $t$
- [ ] $t^2/2$
- [ ] $0$
::: solution
$(1 * 1)(t) = \int_0^t 1\cdot1\,d\tau = t$。用变换的语言来说，$\frac1s\cdot\frac1s = \frac{1}{s^2} = \mathcal{L}\{t\}$。卷积不是逐点相乘。
:::
:::

::: application 控制工程
传递函数$H(s)$是控制工程的语言。系统对任意输入的响应是$H(s)G(s)$；把系统串联起来，就是把它们的传递函数相乘；而$H$的极点（特征多项式的根）的位置决定了稳定性：当所有极点都具有负实部时，系统是稳定的。从恒温器到飞机的自动驾驶仪，各种反馈控制器都是通过塑造$H(s)$来设计的，而卷积定理则把设计结果翻译回时域。
:::

::: history
形如$\int e^{-st}f(t)\,dt$的积分出现在欧拉（Euler）的著作中，皮埃尔-西蒙·拉普拉斯（Pierre-Simon Laplace）在他的概率论中大量使用了这类积分，特别是在1812年的《概率的解析理论》（*Théorie analytique des probabilités*）中。而本章的方法则源于奥利弗·亥维赛（Oliver Heaviside）：他在19世纪80年代和90年代把$d/dt$当作代数符号$p$来处理，以此求解电路的微分方程。他的“运算微积分”能给出正确的答案，但所用的方法在当时的数学家看来缺乏依据。1916年，托马斯·布罗姆维奇（Thomas Bromwich）说明了如何用围道积分为它提供严格的论证；从20世纪30年代起，古斯塔夫·德奇（Gustav Doetsch）等人用拉普拉斯变换重新表述了它，它正是以这种形式进入了工程教学。
:::

## 后续内容

拉普拉斯变换可以直接推广到方程组：此时$\mathcal{L}\{\mathbf{x}'\} = s\mathbf{X} - \mathbf{x}(0)$把$\mathbf{x}' = A\mathbf{x}$化为$(sI - A)\mathbf{X} = \mathbf{x}(0)$；预解矩阵$(sI - A)^{-1}$正是[[ode/linear-systems]]一章中矩阵指数的变换。用围道积分求逆变换是[[complex-analysis/residues]]一章的一个精彩应用。拉普拉斯变换的近亲——[[pde/fourier-transform]]一章中的傅里叶变换——在整条直线上使用$e^{-i\xi x}$，而不是在半直线上使用$e^{-st}$；它对偏微分方程所起的作用，正如拉普拉斯变换在本章中所起的作用。同样这些问题的数值解法是[[numerical-analysis/numerical-odes]]一章的主题。

::: summary
- 当$f$分段连续且具有指数阶$a$时，$F(s) = \int_0^\infty e^{-st}f(t)\,dt$对$s > a$存在，并且$F(s)\to0$（[[#thm-existence]]）。
- 求导变成代数运算：$\mathcal{L}\{y'\} = sY - y(0)$，$\mathcal{L}\{y''\} = s^2Y - sy(0) - y'(0)$（[[#thm-derivative]]）；常系数线性初值问题化为$Y = (\text{数据})/P(s)$。
- 平移定理：$e^{ct}f(t) \leftrightarrow F(s - c)$，$u(t-c)f(t-c)\leftrightarrow e^{-cs}F(s)$；还有$tf(t)\leftrightarrow -F'(s)$。
- 变换是可逆的（Lerch）；借助变换表、部分分式和配方来求逆变换。
- 阶跃函数用来模拟开关；狄拉克δ函数用来模拟脉冲，且$\mathcal{L}\{\delta(t-c)\} = e^{-cs}$；脉冲使速度发生跳跃。
- 卷积：$\mathcal{L}\{f*g\} = FG$。在零初始数据下，响应为$h*g$，其中$h$是传递函数$1/P(s)$的逆变换，即脉冲响应。
:::

## 习题

::: exercise 利用线性性求变换 {level=1 check="1/12"}
设$F = \mathcal{L}\{3t^2 - 2e^{-t}\}$。求$F(s)$，并计算$F(2)$。
::: solution
由线性性和变换表，当$s > 0$时$F(s) = 3\cdot\frac{2}{s^3} - \frac{2}{s+1} = \frac{6}{s^3} - \frac{2}{s+1}$。于是$F(2) = \frac68 - \frac23 = \frac{1}{12}$。
:::
:::

::: exercise 配方 {level=1 check="-2*exp(-2*pi/3)"}
求$f = \mathcal{L}^{-1}\left\{\dfrac{2s + 3}{s^2 + 4s + 13}\right\}$，并计算$f(\pi/3)$。
::: solution
$s^2 + 4s + 13 = (s + 2)^2 + 9$，$2s + 3 = 2(s + 2) - 1$，所以

$$
\frac{2s+3}{(s+2)^2 + 9} = 2\,\frac{s + 2}{(s+2)^2 + 9} - \frac13\cdot\frac{3}{(s+2)^2 + 9},
$$

从而$f(t) = e^{-2t}\bigl(2\cos 3t - \tfrac13\sin 3t\bigr)$。在$t = \pi/3$处，$\cos\pi = -1$，$\sin\pi = 0$，所以$f(\pi/3) = -2e^{-2\pi/3}$。
:::
:::

::: exercise 一阶初值问题 {level=1 check="14"}
用拉普拉斯变换求解$y' - 2y = e^{t}$，$y(0) = 3$，并计算$y(\ln 2)$。
::: solution
$sY - 3 - 2Y = \frac{1}{s-1}$，所以$Y = \frac{3}{s-2} + \frac{1}{(s-1)(s-2)} = \frac{3}{s-2} + \frac{1}{s-2} - \frac{1}{s-1}$。因此$y = 4e^{2t} - e^{t}$，$y(\ln 2) = 16 - 2 = 14$。
:::
:::

::: exercise 开关 {level=2 check="1 - exp(-1)"}
求解$y' + y = u(t - 1)$，$y(0) = 0$，并计算$y(2)$。
::: solution
$(s + 1)Y = \frac{e^{-s}}{s}$，所以$Y = e^{-s}\frac{1}{s(s+1)} = e^{-s}\left(\frac1s - \frac{1}{s+1}\right)$。由第二平移定理，$y(t) = u(t - 1)\bigl(1 - e^{-(t-1)}\bigr)$：在$t = 1$之前什么也不发生，之后$y$逐渐趋向$1$。因此$y(2) = 1 - e^{-1}$。
:::
:::

::: exercise 带初值的脉冲 {level=2 check="1/2"}
求解$y'' + 4y = \delta(t - \pi)$，$y(0) = 1$，$y'(0) = 0$，并计算$y(5\pi/4)$。
::: solution
$s^2Y - s + 4Y = e^{-\pi s}$，所以$Y = \frac{s}{s^2+4} + e^{-\pi s}\frac{1}{s^2+4}$，且

$$
y(t) = \cos 2t + \tfrac12u(t-\pi)\sin\bigl(2(t - \pi)\bigr) = \cos 2t + \tfrac12u(t - \pi)\sin 2t .
$$

在$t = 5\pi/4$处，$\cos\frac{5\pi}{2} = 0$，$\frac12\sin\frac{5\pi}{2} = \frac12$，所以$y(5\pi/4) = \frac12$。
:::
:::

::: exercise 卷积与部分分式 {level=2 check="2"}
用卷积定理求$f = \mathcal{L}^{-1}\left\{\dfrac{1}{s(s^2+1)}\right\}$，用部分分式加以验证，并计算$f(\pi)$。
::: solution
写成乘积，$\frac1s\cdot\frac{1}{s^2+1} = \mathcal{L}\{1\}\mathcal{L}\{\sin t\}$，所以$f = 1 * \sin = \int_0^t\sin(t - \tau)\,d\tau = \int_0^t\sin u\,du = 1 - \cos t$。部分分式：$\frac{1}{s(s^2+1)} = \frac1s - \frac{s}{s^2+1}$，得到同样的$1 - \cos t$。所以$f(\pi) = 2$。
:::
:::

::: exercise 积分方程 {level=2 check="-1"}
求解$y(t) = 1 - \displaystyle\int_0^t(t - \tau)\,y(\tau)\,d\tau$，并计算$y(\pi)$。
::: solution
其中的积分是$(t * y)$，其变换为$\frac{1}{s^2}Y$。所以$Y = \frac1s - \frac{Y}{s^2}$，即$Y\frac{s^2 + 1}{s^2} = \frac1s$，$Y = \frac{s}{s^2+1}$。因此$y = \cos t$，$y(\pi) = -1$。（把积分方程求导两次可知，它等价于$y'' = -y$，$y(0) = 1$，$y'(0) = 0$。）
:::
:::

::: exercise 积分的变换 {level=2}
(a) 证明：若$f$分段连续且具有指数阶$a > 0$，则当$s > a$时$\mathcal{L}\left\{\int_0^tf(\tau)\,d\tau\right\} = \dfrac{F(s)}{s}$。(b) 利用这一结果求$\mathcal{L}^{-1}\left\{\dfrac{1}{s(s^2+4)}\right\}$。
::: solution
(a) $g(t) = \int_0^tf$连续，$g(0) = 0$，且除$f$的跳跃点外$g' = f$；由于$\lvert g(t)\rvert\le C + \int_T^tKe^{a\tau}d\tau \le C + \frac Ka e^{at}$，$g$具有指数阶$a$。由[[#thm-derivative]]，$F = \mathcal{L}\{g'\} = sG - g(0) = sG$，所以$G = F/s$。（等价地，$g = 1 * f$，由[[#thm-convolution]]得$G = \frac1s F$。）

(b) $\frac{1}{s^2+4} = \mathcal{L}\{\frac12\sin 2t\}$，所以$\mathcal{L}^{-1}\left\{\frac{1}{s(s^2+4)}\right\} = \int_0^t\frac12\sin2\tau\,d\tau = \frac{1 - \cos 2t}{4}$。
:::
:::

::: exercise 周期函数 {level=3}
设$f$分段连续，且是周期为$p > 0$的周期函数。证明

$$
\mathcal{L}\{f\}(s) = \frac{1}{1 - e^{-ps}}\int_0^pe^{-st}f(t)\,dt \qquad (s > 0).
$$

并由此推出：在$[0,1)$上等于$1$、在$[1,2)$上等于$-1$、并以$2$为周期延拓的方波，其变换为$\dfrac1s\tanh\dfrac s2$。
::: hint
把$[0,\infty)$分成区间$[np, (n+1)p)$，再利用周期性对一个几何级数求和。
:::
::: solution
$f$有界，所以具有指数阶$0$，从而$F(s)$对$s > 0$存在。把积分拆开，并在第$n$段中作代换$t = \tau + np$，得

$$
F(s) = \sum_{n=0}^\infty\int_{np}^{(n+1)p}e^{-st}f(t)\,dt = \sum_{n=0}^\infty e^{-nps}\int_0^pe^{-s\tau}f(\tau)\,d\tau = \frac{1}{1 - e^{-ps}}\int_0^pe^{-s\tau}f(\tau)\,d\tau,
$$

这里对几何级数求了和（$0 < e^{-ps} < 1$）。对于方波，$p = 2$，且

$$
\int_0^2e^{-st}f(t)\,dt = \frac{1 - e^{-s}}{s} - \frac{e^{-s} - e^{-2s}}{s} = \frac{(1 - e^{-s})^2}{s}.
$$

除以$1 - e^{-2s} = (1 - e^{-s})(1 + e^{-s})$，得$F(s) = \dfrac{1 - e^{-s}}{s(1 + e^{-s})} = \dfrac{1}{s}\tanh\dfrac s2$。
:::
:::

::: exercise 除以 t {level=3 check="pi/2"}
(a) 设$f$分段连续且具有指数阶，并设$g(t) = f(t)/t$在$t\to0^+$时有有限极限（从而$g$也分段连续且具有指数阶）。证明$\mathcal{L}\{g\}(s) = \displaystyle\int_s^\infty F(\sigma)\,d\sigma$。
(b) 求$\mathcal{L}\left\{\dfrac{\sin t}{t}\right\}$。假定只要反常积分收敛，就有$\lim_{s\to0^+}\mathcal{L}\{g\}(s) = \int_0^\infty g(t)\,dt$（这是一个“阿贝尔型定理”），计算$\displaystyle\int_0^\infty\frac{\sin t}{t}\,dt$。
::: solution
(a) 由于$f = t\,g$，[[#prop-mult-t]]给出$F(s) = -G'(s)$，其中$G = \mathcal{L}\{g\}$。从$s$到$R$积分：$G(s) - G(R) = \int_s^RF(\sigma)\,d\sigma$。由[[#thm-existence]]，当$R\to\infty$时$G(R)\to0$，所以积分$\int_s^\infty F$收敛且等于$G(s)$。

(b) 取$F(\sigma) = \frac{1}{\sigma^2+1}$，

$$
\mathcal{L}\left\{\frac{\sin t}{t}\right\}(s) = \int_s^\infty\frac{d\sigma}{\sigma^2+1} = \frac\pi2 - \arctan s = \arctan\frac1s .
$$

令$s\to0^+$，得$\displaystyle\int_0^\infty\frac{\sin t}{t}\,dt = \frac\pi2$，这就是狄利克雷积分。（这个反常积分收敛，但不绝对收敛：相继各区间$[n\pi, (n+1)\pi]$上的贡献符号交替，且其大小递减趋于$0$。）
:::
:::
