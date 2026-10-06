傅里叶（Fourier）级数把**周期**函数分解为谐波$e^{inx}$，这些谐波的频率$n$构成一个离散集。许多我们感兴趣的函数并不是周期的：单个声脉冲、一道闪光、一根无限长的杆在某处热而别处冷的初始温度。对于这些函数，我们需要**每一个**频率$\xi\in\R$，于是对$n$的求和变成对$\xi$的积分：

$$
f(x) = \frac{1}{2\pi}\int_{-\infty}^{\infty}\hat f(\xi)\,e^{i\xi x}\,d\xi, \qquad \hat f(\xi) = \int_{-\infty}^{\infty}f(x)\,e^{-i\xi x}\,dx.
$$

函数$\hat f$称为$f$的**傅里叶变换**：它记录了$f$中各个频率$\xi$的成分各有多少。它把求导变为乘以$i\xi$，把卷积变为乘法；这两个事实使它成为求解整条直线上常系数线性微分方程的自然工具。

本章先把傅里叶变换作为傅里叶级数的极限引入，证明它的主要性质和卷积定理，计算每个使用者都应当熟记的几个变换——指数函数、矩形脉冲和高斯函数——讨论反演定理和普朗歇尔（Plancherel）恒等式，然后求解无限长杆上的热方程。它的解是与**热核**（一个逐渐展宽的高斯函数）的卷积，并且揭示了有界区间上的级数只能暗示的一件事：热以无穷大的速度传播。最后我们讨论不确定性原理，它说的是一个函数和它的傅里叶变换不可能同时高度集中。

## 从傅里叶级数到傅里叶变换

设$f$在$\R$上有定义，考虑它在$[-L, L]$上的限制。周期为$2L$的复傅里叶级数（见[[pde/fourier-series#eq-complex-coeffs]]和[[pde/fourier-series#eq-period-2L]]）为

$$
f(x) = \sum_{n=-\infty}^{\infty}c_ne^{in\pi x/L}, \qquad c_n = \frac{1}{2L}\int_{-L}^{L}f(y)e^{-in\pi y/L}\,dy.
$$

记$\xi_n = n\pi/L$，于是相邻频率的间隔为$\Delta\xi = \pi/L$；再令$F_L(\xi) = \int_{-L}^{L}f(y)e^{-i\xi y}\,dy$。则$c_n = \frac{1}{2L}F_L(\xi_n) = \frac{\Delta\xi}{2\pi}F_L(\xi_n)$，并且

$$
f(x) = \frac{1}{2\pi}\sum_{n=-\infty}^{\infty}F_L(\xi_n)\,e^{i\xi_nx}\,\Delta\xi.
$$

当$L\to\infty$时，频率充满整条直线，$F_L$趋于$\hat f$，而这个和看起来就像$\frac1{2\pi}\int\hat f(\xi)e^{i\xi x}\,d\xi$的黎曼和。这只是启发性的论证，而不是证明——其中交换了两个极限的次序——但它解释了公式的来历，包括因子$\frac1{2\pi}$；我们将看到结论是正确的。

::: definition 傅里叶变换 {#def-fourier-transform}
如果函数$f\colon\R\to\C$在每个有界区间上分段连续，并且$\int_{-\infty}^{\infty}\abs{f(x)}\,dx < \infty$，就称$f$是**可积**的。它的**傅里叶变换**为

$$
\hat f(\xi) = \int_{-\infty}^{\infty}f(x)\,e^{-i\xi x}\,dx \qquad (\xi\in\R).
$$ {#eq-ft}

由于$\abs{f(x)e^{-i\xi x}} = \abs{f(x)}$，这个积分绝对收敛。我们也记$\mathcal F f = \hat f$。
:::

::: warning 约定各不相同
各书对$2\pi$放在哪里看法不一。除了我们的$\hat f(\xi) = \int f(x)e^{-i\xi x}\,dx$（逆变换中带有$\frac{1}{2\pi}$）之外，你还会遇到正、逆两个方向都带$\frac{1}{\sqrt{2\pi}}$的对称形式，以及两个方向都不带常数的形式$\int f(x)e^{-2\pi i\xi x}\,dx$。所有定理都相同，但普朗歇尔恒等式和不确定性原理等公式中的常数会改变。使用变换表时，要先查明它所用的约定。
:::

由于$\abs{\hat f(\xi)} \le \int\abs f$，傅里叶变换是有界的。它还是连续的，并且在无穷远处衰减。

::: proposition 连续性与黎曼-勒贝格（Riemann–Lebesgue）引理 {#prop-rl}
若$f$可积，则$\hat f$以$\int\abs{f}$为界，在$\R$上一致连续，并且当$\abs\xi\to\infty$时$\hat f(\xi)\to0$。
:::

::: proof
**连续性。**设$\eps > 0$，取$R$使$\int_{\abs x > R}\abs f < \eps$。由于$\abs{e^{-i\eta x} - 1} \le \abs{\eta x}$且$\abs{e^{-i\eta x} - 1}\le 2$，

$$
\abs{\hat f(\xi + \eta) - \hat f(\xi)} \le \int\abs{f(x)}\,\abs{e^{-i\eta x} - 1}\,dx \le \abs\eta R\int_{\abs x\le R}\abs f + 2\eps,
$$

只要$\abs\eta$足够小，它就小于$3\eps$，而且与$\xi$无关。

**衰减性。**对区间$[c, d]$的示性函数，$\hat f(\xi) = \frac{e^{-ic\xi} - e^{-id\xi}}{i\xi}$，其绝对值至多为$\frac{2}{\abs\xi}$；所以结论对阶梯函数（有限个这种示性函数的线性组合）成立。分段连续的可积函数$f$可以用阶梯函数$s$逼近，使$\int\abs{f - s} < \eps$（先截去两端的尾部，再在有界区间上用黎曼和型的阶梯函数逼近这个分段连续函数）。于是当$\abs\xi$充分大时，$\abs{\hat f(\xi)} \le \abs{\hat s(\xi)} + \int\abs{f - s} < 2\eps$。
:::

## 三个基本变换

::: example 双边指数函数 {#ex-exp-abs}
求$f(x) = e^{-a\abs x}$的傅里叶变换，其中$a > 0$。
::: solution
在$0$处把积分拆开：

$$
\hat f(\xi) = \int_{-\infty}^0e^{(a - i\xi)x}\,dx + \int_0^\infty e^{-(a + i\xi)x}\,dx = \frac{1}{a - i\xi} + \frac{1}{a + i\xi} = \frac{2a}{a^2 + \xi^2}.
$$

$e^{-a\abs x}$在$0$处的尖角表现为变换的缓慢衰减$\sim 2a/\xi^2$。（由于$f$是偶函数，变换是实的：虚部$-\int f(x)\sin\xi x\,dx$为零。）
:::
:::

::: example 矩形脉冲 {#ex-rect}
设$f = \chi_{[-a,a]}$，即在$[-a, a]$上等于$1$、在其他地方等于$0$的函数。求$\hat f$。
::: solution
$$
\hat f(\xi) = \int_{-a}^ae^{-i\xi x}\,dx = \frac{e^{-ia\xi} - e^{ia\xi}}{-i\xi} = \frac{2\sin a\xi}{\xi} \quad (\xi\ne0), \qquad \hat f(0) = 2a.
$$

这个变换是振荡的，并且只像$1/\abs\xi$那样衰减——这是跳跃的标志——它**不是**可积的。注意这种互为倒数的伸缩关系：宽的脉冲（$a$大）的变换又高又窄，其第一个零点位于$\xi = \pm\pi/a$；窄的脉冲的变换则很宽。
:::
:::

::: widget plot
f: if(abs(x) < a, 1, 0); 2*sin(a*x)/x
x: -10, 10
y: -1.5, 6.5
sliders: a=1:0.2:3:0.05
labels: f(x) = \chi_{[-a,a]}(x); \hat f(\xi) = 2\sin(a\xi)/\xi
caption: 矩形脉冲及其傅里叶变换画在同一坐标系中（对脉冲，把横轴读作$x$；对变换，把横轴读作$\xi$）。用滑块加宽脉冲：变换变得更高（$\hat f(0) = 2a$是脉冲下方的面积），而它位于$\pm\pi/a$之间的主瓣变得更窄。在$x$上展宽意味着在$\xi$上集中，反之亦然。
:::

高斯函数是傅里叶分析中最重要的函数，因为它的变换仍是高斯函数。

::: proposition 高斯函数 {#prop-gaussian}
对$a > 0$，

$$
\int_{-\infty}^{\infty}e^{-ax^2}e^{-i\xi x}\,dx = \sqrt{\frac\pi a}\,e^{-\xi^2/(4a)}.
$$
:::

::: proof
记左边为$g(\xi)$。在积分号下求导——这是合理的，因为被积函数关于$\xi$的导数以可积函数$\abs x e^{-ax^2}$为界（例如可以用控制收敛定理，[[measure-theory/lebesgue-integral]]）——再分部积分，得

$$
g'(\xi) = \int_{-\infty}^\infty(-ix)e^{-ax^2}e^{-i\xi x}\,dx = \frac{i}{2a}\int_{-\infty}^\infty\Bigl(\frac{d}{dx}e^{-ax^2}\Bigr)e^{-i\xi x}\,dx = \frac{i}{2a}\cdot i\xi\int_{-\infty}^\infty e^{-ax^2}e^{-i\xi x}\,dx = -\frac{\xi}{2a}g(\xi).
$$

（边界项$\bigl[e^{-ax^2}e^{-i\xi x}\bigr]_{-R}^{R}$趋于$0$。）这个线性常微分方程的解为$g(\xi) = g(0)e^{-\xi^2/(4a)}$，而$g(0) = \int e^{-ax^2}\,dx = \sqrt{\pi/a}$就是高斯积分（[[multivariable/multiple-integrals]]）。
:::

特别地，$e^{-x^2/2}$的变换为$\sqrt{2\pi}\,e^{-\xi^2/2}$：除了一个常数因子之外，它就是自身的傅里叶变换。窄的高斯函数（$a$大）的变换宽，反之亦然；两者宽度的乘积是固定的。这是不确定性原理的第一个实例。

## 傅里叶变换的性质

::: theorem 运算法则 {#thm-rules}
设$f$可积，$\hat f = \mathcal Ff$，并设$a\in\R$，$b \neq 0$。

1. **平移**：$f(x - a)$的变换为$e^{-ia\xi}\hat f(\xi)$。
2. **调制**：$e^{iax}f(x)$的变换为$\hat f(\xi - a)$。
3. **伸缩**：$f(bx)$的变换为$\frac{1}{\abs b}\hat f\bigl(\frac\xi b\bigr)$。
4. **求导**：若$f$连续且分段光滑，$f'$可积，则$\widehat{f'}(\xi) = i\xi\,\hat f(\xi)$。
5. **乘以$x$**：若$xf(x)$可积，则$\hat f$可导，并且$\widehat{xf}(\xi) = i\,\hat f\,'(\xi)$。
:::

::: proof
第1—3条都是变量替换：$\int f(x - a)e^{-i\xi x}\,dx = \int f(y)e^{-i\xi(y + a)}\,dy = e^{-ia\xi}\hat f(\xi)$；$\int e^{iax}f(x)e^{-i\xi x}\,dx = \int f(x)e^{-i(\xi - a)x}\,dx$；令$y = bx$，则$\int f(bx)e^{-i\xi x}\,dx = \frac{1}{\abs b}\int f(y)e^{-i(\xi/b)y}\,dy$（之所以出现绝对值，是因为当$b < 0$时积分上下限要交换）。

4. 首先，当$x\to\pm\infty$时$f(x)\to0$：由于$f(x) = f(0) + \int_0^xf'$且$f'$可积，极限$\lim_{x\to\pm\infty}f(x)$存在，又因为$f$可积，这些极限必为$0$。在$[-R, R]$上分部积分（逐段进行；由于$f$连续，内部分点处的边界项相互抵消），得

$$
\int_{-R}^Rf'(x)e^{-i\xi x}\,dx = \Bigl[f(x)e^{-i\xi x}\Bigr]_{-R}^R + i\xi\int_{-R}^Rf(x)e^{-i\xi x}\,dx,
$$

令$R\to\infty$即得$\widehat{f'} = i\xi\hat f$。

5. 差商$\frac{\hat f(\xi + h) - \hat f(\xi)}{h} = \int f(x)e^{-i\xi x}\frac{e^{-ihx} - 1}{h}\,dx$的被积函数当$h\to0$时收敛于$-ixf(x)e^{-i\xi x}$，并且由于$\abs{e^{-ihx} - 1} \le \abs{hx}$，它以$\abs{xf(x)}$为界。由控制收敛定理，$\hat f\,'(\xi) = \int(-ix)f(x)e^{-i\xi x}\,dx = -i\,\widehat{xf}(\xi)$，这正是所要证明的。
:::

法则4正是傅里叶变换对微分方程有用的原因：$\frac{d}{dx}$变为乘以$i\xi$，所以常系数线性常微分方程变为代数方程，而关于$(x, t)$的偏微分方程对每个固定的$\xi$都变为关于$t$的常微分方程。法则4和法则5合起来表达了一种对偶性：**$f$的光滑性对应于$\hat f$的衰减性，$f$的衰减性对应于$\hat f$的光滑性。**如果$f$直到$k$阶的导数都可积，那么$\abs{\xi}^k\abs{\hat f(\xi)} = \abs{\widehat{f^{(k)}}(\xi)}$有界，所以$\hat f$至少像$\abs\xi^{-k}$那样衰减。

::: quiz
设$\hat f = F$。$g(x) = f(2x - 3)$的傅里叶变换是哪一个？
- [ ] $\frac12e^{-3i\xi}F(\xi/2)$
- [x] $\frac12e^{-3i\xi/2}F(\xi/2)$
- [ ] $2e^{-3i\xi}F(2\xi)$
- [ ] $\frac12e^{3i\xi/2}F(\xi/2)$
::: solution
把$g$写成$g(x) = h\bigl(x - \frac32\bigr)$，其中$h(x) = f(2x)$。由伸缩法则，$\hat h(\xi) = \frac12F(\xi/2)$；再由平移$\frac32$的平移法则，$\hat g(\xi) = e^{-3i\xi/2}\cdot\frac12F(\xi/2)$。常见的错误是平移$3$而不是平移$\frac32$：$f(2x - 3)$是$f(2x)$平移$\frac32$，而不是平移$3$。
:::
:::

## 卷积

::: definition 卷积 {#def-convolution}
设可积函数$f$和$g$中至少有一个有界，它们的**卷积**为

$$
(f*g)(x) = \int_{-\infty}^{\infty}f(x - y)\,g(y)\,dy.
$$
:::

卷积是一种滑动加权平均：$(f*g)(x)$以$g$给出的权重对$f$在$x$附近的值求平均（若$g\ge0$且$\int g = 1$）。卷积满足交换律（$f*g = g*f$，作代换$y\mapsto x - y$即得），并且具有光滑化作用：一个函数与光滑的“鼓包”函数的卷积是光滑的。在概率论中，两个独立随机变量之和的密度是它们的密度的卷积（[[probability/joint-distributions]]）。

::: theorem 卷积定理 {#thm-convolution}
若$f$和$g$可积，且其中一个有界，则$f*g$可积，并且

$$
\widehat{f*g}(\xi) = \hat f(\xi)\,\hat g(\xi).
$$
:::

::: proof
由托内利（Tonelli）定理（对非负函数交换积分次序），

$$
\int\!\!\int\abs{f(x - y)}\,\abs{g(y)}\,dy\,dx = \int\abs{g(y)}\left(\int\abs{f(x - y)}\,dx\right)dy = \int\abs f\cdot\int\abs g < \infty.
$$

所以$f*g$可积，并且由富比尼（Fubini）定理，可以交换下式中的积分次序：

$$
\widehat{f*g}(\xi) = \int\!\!\int f(x - y)g(y)\,e^{-i\xi x}\,dy\,dx = \int g(y)e^{-i\xi y}\left(\int f(x - y)e^{-i\xi(x - y)}\,dx\right)dy = \hat f(\xi)\int g(y)e^{-i\xi y}\,dy,
$$

这里我们写$e^{-i\xi x} = e^{-i\xi y}e^{-i\xi(x-y)}$，并在内层积分中作代换$z = x - y$。（对于本章中的分段连续函数，这些二重积分可以理解为反常黎曼积分；一般情形下的托内利定理和富比尼定理属于勒贝格积分理论，这一理论从[[measure-theory/lebesgue-integral]]开始建立。）
:::

::: example 用两种方法计算卷积 {#ex-conv}
设$f(x) = e^{-\abs x}$。直接计算$f*f$，并验证卷积定理。
::: solution
对$x \ge 0$，在$y = 0$和$y = x$处把积分$\int e^{-\abs{x - y}}e^{-\abs y}\,dy$拆开：

$$
\int_{-\infty}^0e^{-(x - y)}e^{y}\,dy + \int_0^xe^{-(x-y)}e^{-y}\,dy + \int_x^\infty e^{-(y - x)}e^{-y}\,dy = \frac{e^{-x}}{2} + xe^{-x} + \frac{e^{-x}}{2} = (1 + x)e^{-x}.
$$

由对称性，$(f*f)(x) = (1 + \abs x)e^{-\abs x}$。由[[#ex-exp-abs]]和卷积定理，它的变换应当是$\bigl(\frac{2}{1 + \xi^2}\bigr)^2 = \frac{4}{(1+\xi^2)^2}$。确实，$\abs xe^{-\abs x}$是偶函数，其变换为$2\int_0^\infty xe^{-x}\cos\xi x\,dx = \frac{2(1 - \xi^2)}{(1+\xi^2)^2}$，再加上$\frac{2}{1 + \xi^2} = \frac{2(1 + \xi^2)}{(1 + \xi^2)^2}$，就得到$\frac{4}{(1 + \xi^2)^2}$。
:::
:::

## 反演与普朗歇尔定理

能否由$\hat f$恢复$f$？第一节的启发性论证提示了反演公式；下面是它的精确表述，它是傅里叶级数的狄利克雷（Dirichlet）定理的类比。

::: theorem 傅里叶反演 {#thm-inversion}
设$f$可积，且在每个有界区间上分段光滑。则对每个$x\in\R$，

$$
\lim_{R\to\infty}\frac{1}{2\pi}\int_{-R}^{R}\hat f(\xi)\,e^{i\xi x}\,d\xi = \frac{f(x^+) + f(x^-)}{2}.
$$

如果此外$f$连续且$\hat f$可积，那么对每个$x$，$f(x) = \dfrac{1}{2\pi}\displaystyle\int_{-\infty}^{\infty}\hat f(\xi)e^{i\xi x}\,d\xi$。
:::

::: proof {collapsed}
**证明概要。**代入$\hat f$的定义并交换积分次序（这是合理的，因为$\xi$在有界区间$[-R, R]$上变化，而$f$可积）：

$$
\frac{1}{2\pi}\int_{-R}^R\hat f(\xi)e^{i\xi x}\,d\xi = \frac1{2\pi}\int_{-\infty}^\infty f(y)\left(\int_{-R}^Re^{i\xi(x - y)}\,d\xi\right)dy = \frac1\pi\int_{-\infty}^\infty f(x + t)\,\frac{\sin Rt}{t}\,dt.
$$

核$\frac{\sin Rt}{\pi t}$所起的作用相当于[[pde/fourier-series#lem-dirichlet]]中的狄利克雷核，并且对每个$R > 0$都有$\int_0^\infty\frac{\sin Rt}{t}\,dt = \frac\pi2$（这就是狄利克雷积分，[[ode/laplace-transform]]和[[complex-analysis/residues]]中都计算过它）。减去$\frac12f(x^+) + \frac12f(x^-)$，再完全按照[[pde/fourier-series#thm-dirichlet]]的证明来论证——由分段光滑性，商$\frac{f(x+t) - f(x^\pm)}{t}$在$t = 0$附近有界，而其余部分（包括由$f$的可积性控制的尾部）用黎曼-勒贝格型的论证处理——就得到第一个结论。若$\hat f$可积，则这个极限就是绝对收敛的积分，而在连续点处右边等于$f(x)$。完整的细节见斯坦（Stein）与沙卡尔奇（Shakarchi）的《傅里叶分析》（*Fourier Analysis*）第5章，或福兰德（Folland）的《傅里叶分析及其应用》（*Fourier Analysis and Its Applications*）第7章。
:::

反演定理表明傅里叶变换是单射：可积的分段光滑函数（在其连续点处）由它的变换唯一确定。反演还能毫不费力地给出新的变换。由于$\frac{2a}{a^2+\xi^2}$可积，对[[#ex-exp-abs]]作反演得$e^{-a\abs x} = \frac1{2\pi}\int\frac{2a}{a^2 + \xi^2}e^{i\xi x}\,d\xi$；交换变量的名称并把$x$换成$-x$，得

$$
\mathcal F\left[\frac{1}{a^2 + x^2}\right](\xi) = \frac{\pi}{a}e^{-a\abs\xi}.
$$ {#eq-lorentzian}

（这也可以用留数来计算，[[complex-analysis/residues]]。）而在连续点$x = 0$处对矩形脉冲作反演，得$1 = \frac{1}{2\pi}\lim_{R\to\infty}\int_{-R}^R\frac{2\sin a\xi}{\xi}\,d\xi$，这就是著名的**狄利克雷积分**：当$a > 0$时，$\int_{-\infty}^\infty\frac{\sin a\xi}{\xi}\,d\xi = \pi$。（这只是一个自洽性检验，而不是新的证明，因为[[#thm-inversion]]的证明用到了这个积分。）

::: theorem 普朗歇尔恒等式 {#thm-plancherel}
若$f$可积且$\int\abs f^2 < \infty$，则$\hat f$平方可积，并且

$$
\int_{-\infty}^{\infty}\abs{f(x)}^2\,dx = \frac{1}{2\pi}\int_{-\infty}^{\infty}\abs{\hat f(\xi)}^2\,d\xi.
$$
:::

::: proof {collapsed}
**证明概要。**令$\tilde f(x) = \overline{f(-x)}$，它的变换为$\overline{\hat f(\xi)}$。函数$g = f*\tilde f$连续，且$g(0) = \int\abs{f(y)}^2\,dy$；由[[#thm-convolution]]，$\hat g = \hat f\,\overline{\hat f} = \abs{\hat f}^2 \ge 0$。在$x = 0$处作反演，得$g(0) = \frac{1}{2\pi}\int\abs{\hat f}^2$。为了避免事先假定$\hat g$可积，可以插入收敛因子$e^{-\eps\xi^2}$，利用[[#prop-gaussian]]把$\frac1{2\pi}\int\hat g(\xi)e^{-\eps\xi^2}\,d\xi$写成$g$关于一个窄高斯函数的加权平均，再令$\eps\to0$，左边用单调收敛定理，右边用$g$的连续性。参见斯坦与沙卡尔奇的书第5章。
:::

普朗歇尔恒等式是帕塞瓦尔（Parseval）恒等式（[[pde/fourier-series#thm-parseval]]）的连续版本：信号的能量等于其各频率分量的总能量。它可以用来计算积分。取$f = \chi_{[-1,1]}$，则$\int\abs f^2 = 2$，$\hat f = \frac{2\sin\xi}{\xi}$，所以$2 = \frac1{2\pi}\int\frac{4\sin^2\xi}{\xi^2}\,d\xi$，即$\int_{-\infty}^\infty\frac{\sin^2\xi}{\xi^2}\,d\xi = \pi$。

## 整条直线上的热方程

考虑一根初始温度为$f$的无限长杆：

$$
u_t = k\,u_{xx}\quad(x\in\R,\ t > 0), \qquad u(x, 0) = f(x).
$$ {#eq-heat-line}

这里没有边界条件，因此没有离散的模态集合；取而代之的是，每个频率$\xi$都是一个模态。对$x$作傅里叶变换，记$\hat u(\xi, t) = \int u(x,t)e^{-i\xi x}\,dx$。由[[#thm-rules]]的法则4（用两次），$\widehat{u_{xx}} = (i\xi)^2\hat u = -\xi^2\hat u$；再假定可以在积分号下对$t$求导，得

$$
\frac{\partial\hat u}{\partial t}(\xi, t) = -k\xi^2\,\hat u(\xi, t), \qquad \hat u(\xi, 0) = \hat f(\xi).
$$

对每个固定的$\xi$，这是关于$t$的一阶线性常微分方程，其解为

$$
\hat u(\xi, t) = \hat f(\xi)\,e^{-k\xi^2t}.
$$

每个频率都以速率$k\xi^2$衰减，与有限长杆上第$n$个模态$e^{-k(n\pi/L)^2t}$完全一样。为了回到$u$，要认出$e^{-k\xi^2t}$是某个函数的变换：由[[#prop-gaussian]]（取$a = \frac{1}{4kt}$），

$$
G_t(x) = \frac{1}{\sqrt{4\pi kt}}\,e^{-x^2/(4kt)} \qquad\text{满足}\qquad \widehat{G_t}(\xi) = e^{-k\xi^2t}.
$$ {#eq-heat-kernel}

所以$\hat u = \hat f\,\widehat{G_t}$，由卷积定理，$u(\cdot, t) = G_t*f$。这一形式推导提示了下面的定理，我们随后直接证明它。

::: theorem 用热核表示的解 {#thm-heat-kernel}
设$f$在$\R$上有界且连续，$\abs f \le M$。则

$$
u(x,t) = \frac{1}{\sqrt{4\pi kt}}\int_{-\infty}^{\infty}e^{-(x - y)^2/(4kt)}\,f(y)\,dy
$$ {#eq-heat-solution}

在$\R\times(0,\infty)$上无穷次可微，在那里满足$u_t = k\,u_{xx}$，满足$\abs{u} \le M$，并且对每个$x_0\in\R$，当$(x,t)\to(x_0, 0^+)$时$u(x,t)\to f(x_0)$。
:::

::: proof
**热核**$G_t$具有三条性质：它是正的；对每个$t > 0$，$\int G_t(x)\,dx = 1$（由高斯积分，或由$\widehat{G_t}(0) = 1$）；并且它满足热方程，因为

$$
\partial_tG_t = G_t\left(-\frac{1}{2t} + \frac{x^2}{4kt^2}\right), \qquad \partial_xG_t = -\frac{x}{2kt}G_t, \qquad k\,\partial_x^2G_t = G_t\left(\frac{x^2}{4kt^2} - \frac{1}{2t}\right).
$$

**光滑性与方程。**$G_t(x - y)$关于$x$和$t$的每个偏导数都是$x - y$与$t^{-1/2}$的多项式乘以$e^{-(x-y)^2/(4kt)}$。当$(x, t)$位于$\R\times(0,\infty)$的紧子集中时，这些偏导数都以$y$的某个可积函数（多项式乘以高斯函数）为界，所以可以在积分号下对[[#eq-heat-solution]]求任意多次导数。特别地，$u_t - k\,u_{xx} = \int(\partial_t - k\,\partial_x^2)G_t(x - y)\,f(y)\,dy = 0$。

**有界性。**$\abs{u(x,t)} \le \int G_t(x - y)\abs{f(y)}\,dy \le M\int G_t = M$。

**初值。**固定$x_0$和$\eps > 0$，取$\delta > 0$，使得当$\abs{y - x_0} < 2\delta$时$\abs{f(y) - f(x_0)} < \eps$。由于$\int G_t = 1$，当$\abs{x - x_0} < \delta$时，

$$
\abs{u(x,t) - f(x_0)} \le \int_{\abs{y - x}<\delta}G_t(x - y)\abs{f(y) - f(x_0)}\,dy + \int_{\abs{y - x}\ge\delta}G_t(x - y)\,2M\,dy < \eps + 2M\int_{\abs z\ge\delta}G_t(z)\,dz,
$$

这是因为由$\abs{y - x} < \delta$可推出$\abs{y - x_0} < 2\delta$。作代换$z = \sqrt{4kt}\,s$可知，最后一个积分等于$\frac{1}{\sqrt\pi}\int_{\abs s\ge\delta/\sqrt{4kt}}e^{-s^2}\,ds$，当$t\to0^+$时它趋于$0$。所以当$\abs{x - x_0} < \delta$且$t$足够小时，$\abs{u(x,t) - f(x_0)} < 2\eps$。
:::

热核$G_t$本身就是在时刻$0$于原点释放单位热量所产生的温度——一个“点源”。它是标准差为$\sqrt{2kt}$的高斯函数：热量扩散的距离与$\sqrt t$成正比，这是扩散的标志。公式[[#eq-heat-solution]]是说：时刻$t$的温度是初始热量在每一点$y$处释放的、不断扩散的点源的叠加。

::: widget plot
f: exp(-x^2/(4*t))/sqrt(4*pi*t); 0.5*(erf((x + 1)/sqrt(4*t)) - erf((x - 1)/sqrt(4*t)))
x: -6, 6
y: 0, 1.3
sliders: t=0.25:0.02:4:0.01
labels: G_t(x); u(x,t)\ \text{当 } f = \chi_{[-1,1]}
caption: $k = 1$时的热核$G_t$，以及一根无限长杆的温度，杆的初始温度在$[-1,1]$上为$1$，在其他地方为$0$。把$t$向$0$拖动：热核变成一个面积为$1$的又高又窄的尖峰，而矩形又恢复了它陡峭的边缘。把$t$向上拖动：热核像$\sqrt t$那样展宽，峰值像$1/\sqrt t$那样下降（$t$较大时矩形也是如此），而每条曲线下方的面积保持不变——总热量守恒。
:::

::: example 加热的一段 {#ex-box}
一根无限长杆的初始温度在$[-a, a]$上为$1$，在其他地方为$0$。求$u(x,t)$以及中心处的温度。
::: solution
公式[[#eq-heat-solution]]对有界的分段连续函数$f$也成立（在$f$的连续点处，证明不必改动）。利用**误差函数**$\erf(z) = \frac{2}{\sqrt\pi}\int_0^ze^{-s^2}\,ds$，并作代换$s = \frac{y - x}{\sqrt{4kt}}$，得

$$
u(x,t) = \frac{1}{\sqrt{4\pi kt}}\int_{-a}^ae^{-(x-y)^2/(4kt)}\,dy = \frac{1}{\sqrt\pi}\int_{(-a - x)/\sqrt{4kt}}^{(a - x)/\sqrt{4kt}}e^{-s^2}\,ds = \frac12\left[\erf\frac{x + a}{\sqrt{4kt}} - \erf\frac{x - a}{\sqrt{4kt}}\right].
$$

在中心处，$u(0, t) = \erf\frac{a}{\sqrt{4kt}}$。当$t$很大时，由$\erf z \approx \frac{2z}{\sqrt\pi}$得$u(0,t)\approx\frac{a}{\sqrt{\pi kt}}$：在无限长杆上，温度只像$t^{-1/2}$那样衰减，而不像两端保持低温的有限长杆那样按指数衰减，因为热量从未被移走——它只是扩散开了。
:::
:::

::: example 高斯型温度分布 {#ex-gauss-heat}
用傅里叶变换求解$f(x) = e^{-x^2}$时的[[#eq-heat-line]]。
::: solution
由[[#prop-gaussian]]（取$a = 1$），$\hat f(\xi) = \sqrt\pi\,e^{-\xi^2/4}$，所以

$$
\hat u(\xi,t) = \sqrt\pi\,e^{-\xi^2/4}e^{-k\xi^2t} = \sqrt\pi\,e^{-\xi^2(1 + 4kt)/4}.
$$

这又是一个高斯函数的变换：由[[#prop-gaussian]]（取$a = \frac{1}{1 + 4kt}$）得$\mathcal F\bigl[e^{-x^2/(1+4kt)}\bigr] = \sqrt{\pi(1 + 4kt)}\,e^{-\xi^2(1 + 4kt)/4}$。两式相除，得

$$
u(x,t) = \frac{1}{\sqrt{1 + 4kt}}\,e^{-x^2/(1 + 4kt)}.
$$

可以直接验证$u_t = k\,u_{xx}$且$u(x,0) = e^{-x^2}$。温度分布始终是高斯型的；它的“方差”$\frac{1 + 4kt}{2}$随时间线性增长——卷积时方差相加，正如独立正态随机变量之和的情形——而它的高度不断下降，使面积$\sqrt\pi$保持不变。
:::
:::

::: warning 无穷大的传播速度，以及唯一性需要增长条件
[[#thm-heat-kernel]]有两个令人惊讶的特点。第一，若$f \ge 0$仅在$[-a,a]$上不为零，则只要$t > 0$，对**每个**$x$都有$u(x,t) > 0$，因为处处有$G_t > 0$：热以无穷大的速度传播（尽管在远处其幅度像高斯函数的尾部一样小）。热方程是一个忽略了分子速度有限这一事实的模型；在幅度重要的地方它极为精确，但不应把它推广到关于远距离处微小效应的论断。第二，问题[[#eq-heat-line]]的解只在某一类合理的函数中才是唯一的：吉洪诺夫（Tychonoff）在1935年构造了一个初始数据为零的非零解，它在$\abs x\to\infty$时增长得极快。在对某些常数满足$\abs{u(x,t)} \le Ce^{bx^2}$的解中，[[#eq-heat-solution]]是唯一的。
:::

::: quiz
一根无限长杆（$k = 1$）的初始温度$f \ge 0$在$(0,1)$上为正，在其他地方为零。$u(100, 0.001)$是多少？
- [ ] 恰好为$0$，因为热不可能在这么短的时间内传播这么远。
- [x] 为正，但小得出奇。
- [ ] 由最大值原理，为负。
- [ ] 没有定义，因为$f$不连续。
::: solution
由[[#eq-heat-solution]]，$u(100, 0.001) = \int_0^1G_{0.001}(100 - y)f(y)\,dy$，而热核处处为正，所以这个值为正。但$G_{0.001}(99) = \frac{1}{\sqrt{0.004\pi}}e^{-99^2/0.004}$是一个小得荒唐的数（约为$10^{-1\,064\,000}$）。在数学上，热的传播速度是无穷大；在物理上，这种效应完全可以忽略。
:::
:::

## 不确定性原理

矩形脉冲和高斯函数都表现出一种此消彼长的关系：使$f$集中，就会使$\hat f$展宽。这种关系可以用二阶矩来度量。

::: theorem 海森伯（Heisenberg）不等式 {#thm-heisenberg}
设$f$连续可微，$f$和$f'$可积，$f$，$xf$和$f'$平方可积，并且当$\abs x\to\infty$时$x\abs{f(x)}^2\to0$（例如，任何多项式乘以高斯函数都满足这些条件）。则

$$
\left(\int_{-\infty}^{\infty}x^2\abs{f(x)}^2\,dx\right)\left(\int_{-\infty}^{\infty}\xi^2\abs{\hat f(\xi)}^2\,d\xi\right) \ge \frac\pi2\left(\int_{-\infty}^{\infty}\abs{f(x)}^2\,dx\right)^2,
$$

当$f$是高斯函数$e^{-ax^2}$时等号成立。
:::

::: proof
利用$(\abs f^2)' = 2\operatorname{Re}(\bar ff')$以及$x\abs f^2$的衰减性，作分部积分：

$$
\int_{-\infty}^\infty\abs f^2\,dx = \Bigl[x\abs f^2\Bigr]_{-\infty}^\infty - \int_{-\infty}^\infty x\,\bigl(\abs f^2\bigr)'\,dx = -2\operatorname{Re}\int_{-\infty}^\infty x\bar f f'\,dx.
$$

由柯西-施瓦茨（Cauchy–Schwarz）不等式，$\bigl(\int\abs f^2\bigr)^2 \le 4\int x^2\abs f^2\cdot\int\abs{f'}^2$。由普朗歇尔恒等式（[[#thm-plancherel]]）和[[#thm-rules]]的法则4，$\int\abs{f'}^2 = \frac{1}{2\pi}\int\abs{i\xi\hat f(\xi)}^2\,d\xi = \frac1{2\pi}\int\xi^2\abs{\hat f}^2$。代入即得所要的不等式。对$f = e^{-x^2/2}$，可以算出$\int x^2e^{-x^2}\,dx = \frac{\sqrt\pi}2$，$\hat f = \sqrt{2\pi}e^{-\xi^2/2}$，$\int\xi^2\cdot2\pi e^{-\xi^2}\,d\xi = \pi^{3/2}$，以及$\int e^{-x^2}\,dx = \sqrt\pi$：两边都等于$\frac{\pi^2}{2}$。（柯西-施瓦茨不等式中等号成立要求$f' = cxf$，这迫使$f$是高斯函数。）
:::

::: widget plot
f: exp(-a*x^2); sqrt(pi/a)*exp(-x^2/(4*a))
x: -8, 8
y: 0, 4
sliders: a=1:0.05:5:0.05
labels: e^{-ax^2}; \sqrt{\pi/a}\,e^{-\xi^2/(4a)}
caption: 高斯函数（第一条曲线，变量为$x$）及其傅里叶变换（第二条曲线，变量为$\xi$）。增大$a$以压窄高斯函数：它的变换变得更低、更宽。减小$a$：高斯函数展宽，而它的变换收窄成一个尖峰。两者宽度的乘积始终不变——高斯函数恰好就是使海森伯不等式取等号的函数。
:::

::: application 信号、光学与量子力学
在信号处理中，持续约$T$秒的信号$f(t)$所占的频带宽度至少是$1/T$的量级：短脉冲需要宽的带宽，这就是快速数据传输需要高带宽信道的原因。在光学中，光通过孔径后的远场衍射图样（除了尺度变换之外）就是孔径的傅里叶变换，所以窄缝会产生宽的衍射图样，其形状就是上面算出的$\frac{\sin^2}{\xi^2}$。在量子力学中，动量波函数是位置波函数的傅里叶变换，而[[#thm-heisenberg]]就变成不确定关系$\Delta x\,\Delta p \ge \hbar/2$。在计算方面，$N$个采样值的离散傅里叶变换可以用快速傅里叶变换以$O(N\log N)$次运算求出；快速傅里叶变换是科学与工程中应用最广泛的算法之一。
:::

::: history
傅里叶（Fourier）在关于无限物体中热传导的工作中引入了非周期函数的积分表示，这项工作于1811年提交，发表于1822年的《热的解析理论》（*Théorie analytique de la chaleur*）；19世纪10年代，柯西（Cauchy）和泊松（Poisson）也研究过类似的积分，部分是与水波问题相联系。严格的反演定理随着勒贝格（Lebesgue）积分的发展而出现：米歇尔·普朗歇尔（Michel Plancherel）于1910年证明了他关于平方可积函数的定理，诺伯特·维纳（Norbert Wiener）、萨洛蒙·博赫纳（Salomon Bochner）等人在20世纪20年代和30年代建立了现代理论。维尔纳·海森伯（Werner Heisenberg）于1927年提出了不确定性原理，同年厄尔·肯纳德（Earle Kennard）证明了精确的不等式，不久之后赫尔曼·外尔（Hermann Weyl）也给出了证明。在计算方面，詹姆斯·库利（James Cooley）和约翰·图基（John Tukey）于1965年发表了快速傅里叶变换；后来人们发现，卡尔·弗里德里希·高斯（Carl Friedrich Gauss）早在1805年前后就用本质上相同的思想对小行星轨道进行插值，而这项工作直到他去世后才发表。
:::

## 后续内容

傅里叶变换可以用同样的方法求解整条直线上其他的常系数问题：波动方程——其中每个频率按$\cos c\xi t$振荡，反演后就得到达朗贝尔（d'Alembert）公式（[[pde/wave-equation]]）；半平面上的拉普拉斯方程——其核是泊松核$\frac{y}{\pi(x^2 + y^2)}$，它与[[#eq-lorentzian]]密切相关；以及$\R$上的常微分方程。[[ode/laplace-transform]]中的**拉普拉斯变换**是傅里叶变换的单边版本，适用于初值问题；形式上，记$s = \sigma + i\tau$，则$\mathcal L f(s)$就是限制在$t \ge 0$上的$f(t)e^{-\sigma t}$的傅里叶变换在$\xi = \tau = \operatorname{Im}s$处的值。把傅里叶变换推广到所有平方可积函数以及狄拉克δ函数这样的广义函数，就通向以[[measure-theory/lp-spaces]]为基础的分布理论和现代调和分析。在概率论中，具有密度$p$的随机变量$X$的特征函数$\E e^{i\xi X}$等于$\hat p(-\xi)$，即采用相反符号约定的傅里叶变换；它是证明中心极限定理的主要工具（[[probability/limit-theorems]]）。

::: summary
- 傅里叶变换$\hat f(\xi) = \int f(x)e^{-i\xi x}\,dx$是周期趋于无穷时傅里叶级数的极限；它有界、连续，并且在无穷远处趋于$0$（黎曼-勒贝格引理）。
- 重要的变换：$e^{-a\abs x}\mapsto\frac{2a}{a^2+\xi^2}$；$\chi_{[-a,a]}\mapsto\frac{2\sin a\xi}{\xi}$；$e^{-ax^2}\mapsto\sqrt{\pi/a}\,e^{-\xi^2/(4a)}$；$\frac{1}{a^2+x^2}\mapsto\frac\pi ae^{-a\abs\xi}$。
- 平移变为乘以相位因子，伸缩使宽度按倒数关系变化，$\frac{d}{dx}$变为乘以$i\xi$，乘以$x$变为$i\frac{d}{d\xi}$；$f$的光滑性对应于$\hat f$的衰减性。
- 卷积定理$\widehat{f*g} = \hat f\,\hat g$可由富比尼定理证明。
- 反演公式$f = \frac{1}{2\pi}\int\hat fe^{i\xi x}\,d\xi$（在跳跃点处取中点值）和普朗歇尔恒等式$\int\abs f^2 = \frac1{2\pi}\int\abs{\hat f}^2$分别对应于狄利克雷定理和帕塞瓦尔恒等式。
- $\R$上的热方程的解为$u = G_t*f$，其中热核为$G_t(x) = (4\pi kt)^{-1/2}e^{-x^2/(4kt)}$；热量像$\sqrt t$那样扩散，并且在数学上以无穷大的速度传播。
- 海森伯不等式：$f$和$\hat f$不可能同时集中；高斯函数是极端情形。
:::

## 习题

::: exercise 一个指数函数 {level=1 check="6/25"}
求$f(x) = e^{-3\abs x}$的傅里叶变换，并计算$\hat f(4)$。
::: solution
由[[#ex-exp-abs]]（取$a = 3$），$\hat f(\xi) = \frac{6}{9 + \xi^2}$，所以$\hat f(4) = \frac{6}{25}$。
:::
:::

::: exercise 更宽的脉冲 {level=1 check="8/pi"}
设$f = \chi_{[-2,2]}$。求$\hat f(0)$和$\hat f(\pi/4)$。（输入$\hat f(\pi/4)$。）
::: solution
由[[#ex-rect]]（取$a = 2$），$\hat f(\xi) = \frac{2\sin2\xi}{\xi}$，$\hat f(0) = 4$，即$f$下方的面积。在$\xi = \pi/4$处，$\hat f = \frac{2\sin(\pi/2)}{\pi/4} = \frac{8}{\pi}$。
:::
:::

::: exercise 利用求导法则 {level=1 check="sqrt(pi)/e"}
用两种方法——分别利用[[#thm-rules]]的法则4和法则5——求$g(x) = xe^{-x^2}$的傅里叶变换，并计算$i\,\hat g(2)$。
::: solution
令$f = e^{-x^2}$，则$\hat f = \sqrt\pi e^{-\xi^2/4}$。法则4：$g = -\frac12f'$，所以$\hat g = -\frac12i\xi\hat f = -\frac{i\sqrt\pi}{2}\xi e^{-\xi^2/4}$。法则5：$\hat g = \widehat{xf} = i\hat f\,' = i\sqrt\pi\cdot\bigl(-\frac\xi2\bigr)e^{-\xi^2/4}$，结果相同。于是$i\hat g(2) = i\cdot\bigl(-\frac{i\sqrt\pi}{2}\cdot2e^{-1}\bigr) = \frac{\sqrt\pi}{e}$。
:::
:::

::: exercise 由普朗歇尔恒等式计算积分 {level=2 check="pi/2"}
对$f(x) = e^{-\abs x}$应用普朗歇尔恒等式，计算$\displaystyle\int_{-\infty}^\infty\frac{d\xi}{(1 + \xi^2)^2}$。
::: solution
$\int\abs f^2 = \int e^{-2\abs x}\,dx = 1$，$\hat f = \frac{2}{1 + \xi^2}$。由[[#thm-plancherel]]，$1 = \frac1{2\pi}\int\frac{4}{(1+\xi^2)^2}\,d\xi$，所以所求积分为$\frac{2\pi}{4} = \frac\pi2$。
:::
:::

::: exercise 高斯型温度的扩散 {level=2 check="1/3"}
设$k = 1$，无限长杆的初始温度为$e^{-x^2}$。求时刻$t = 2$时$x = 0$处的温度，以及中心温度降到初始值一半的时刻。（输入$u(0,2)$。）
::: solution
由[[#ex-gauss-heat]]，$u(0,t) = (1 + 4t)^{-1/2}$，所以$u(0,2) = \frac{1}{\sqrt9} = \frac13$。降到初始值的一半要求$1 + 4t = 4$，即$t = \frac34$。
:::
:::

::: exercise 自卷积 {level=2 check="2/e"}
对$f = e^{-\abs x}$，直接由定义计算$(f*f)(1)$，并验证$\int(f*f)\,dx = \bigl(\int f\bigr)^2$。
::: solution
由[[#ex-conv]]，$(f*f)(x) = (1 + \abs x)e^{-\abs x}$，所以$(f*f)(1) = 2e^{-1} = \frac2e$。而$\int(1 + \abs x)e^{-\abs x}\,dx = 2\int_0^\infty(1 + x)e^{-x}\,dx = 2(1 + 1) = 4 = 2^2 = \bigl(\int e^{-\abs x}\,dx\bigr)^2$。这就是卷积定理在$\xi = 0$处的情形：$\widehat{f*f}(0) = \hat f(0)^2$。
:::
:::

::: exercise 无穷大的传播速度 {level=2}
设$f$有界、连续，$f \ge 0$且不恒为零。证明解[[#eq-heat-solution]]对所有$x\in\R$和$t > 0$满足$u(x,t) > 0$。
::: solution
由于$f$连续、非负且不恒为零，存在$y_0$以及$\delta, c > 0$，使得在$[y_0 - \delta, y_0 + \delta]$上$f \ge c$。热核严格为正，所以

$$
u(x,t) = \int G_t(x - y)f(y)\,dy \ge c\int_{y_0-\delta}^{y_0+\delta}G_t(x - y)\,dy > 0,
$$

最后一个积分是连续正函数在长度为正的区间上的积分。
:::
:::

::: exercise 半群性质 {level=3}
证明对$s, t > 0$有$G_s*G_t = G_{s+t}$，并用热方程的语言解释这一结果。由此推出：若$u$由[[#eq-heat-solution]]给出，则$u(\cdot, s + t) = G_t*u(\cdot, s)$。
::: hint
比较两边的傅里叶变换，并利用反演定理。
:::
::: solution
由[[#thm-convolution]]和[[#eq-heat-kernel]]，$\widehat{G_s*G_t}(\xi) = e^{-k\xi^2s}e^{-k\xi^2t} = e^{-k\xi^2(s+t)} = \widehat{G_{s+t}}(\xi)$。$G_s*G_t$和$G_{s+t}$都是连续、可积且分段光滑的（在积分号下求导可知，两个高斯函数的卷积是光滑的），并且它们共同的变换可积，所以由[[#thm-inversion]]，它们相等。（也可以在指数中配方，直接计算高斯积分。）解释：让热量先扩散时间$s$、再扩散时间$t$，与让它扩散时间$s + t$是一样的。至于第二个结论，由卷积的结合律（这又是富比尼定理的一个应用），$G_t*u(\cdot, s) = G_t*(G_s*f) = (G_t*G_s)*f = G_{s+t}*f = u(\cdot, s+t)$。
:::
:::

::: exercise 无限长杆上的衰减 {level=3}
设$f$有界、连续且可积，$u$由[[#eq-heat-solution]]给出。证明对所有$t > 0$都有$\int u(x,t)\,dx = \int f(x)\,dx$（热量守恒），并且

$$
\abs{u(x,t)} \le \frac{1}{\sqrt{4\pi kt}}\int_{-\infty}^\infty\abs{f(y)}\,dy,
$$

从而当$t\to\infty$时一致地有$u\to0$。
::: solution
对第一个结论，利用富比尼定理（这是合理的，因为$\int\!\!\int G_t(x - y)\abs{f(y)}\,dy\,dx = \int\abs f < \infty$）：

$$
\int u(x,t)\,dx = \int f(y)\left(\int G_t(x - y)\,dx\right)dy = \int f(y)\,dy,
$$

这是因为每个$G_t(\cdot - y)$的积分都是$1$。对于上界估计，对所有$z$有$G_t(z) \le G_t(0) = \frac{1}{\sqrt{4\pi kt}}$，所以$\abs{u(x,t)} \le \int G_t(x - y)\abs{f(y)}\,dy \le \frac{1}{\sqrt{4\pi kt}}\int\abs f$，它关于$x$一致地趋于$0$。总热量保持不变，而其最大密度像$t^{-1/2}$那样下降：热量扩散到宽度与$\sqrt{kt}$成正比的区域上。（比较[[#ex-box]]，那里$u(0,t)\approx\frac{a}{\sqrt{\pi kt}}$，$\int f = 2a$。）
:::
:::
