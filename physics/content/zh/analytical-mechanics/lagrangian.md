一块上抛的石子一秒钟内上升又落下。在它离开手又回到手之间所有可能经过的方式中，它为什么偏偏走那条抛物线？牛顿的回答是局部的：每一时刻，力决定加速度，路径是一步一步搭起来的。还有第二个回答，它是总体的而非局部的：真实路径是使某个遍及全程的积分驻定的那条路径。这个积分就是**作用量**，这条陈述就是**哈密顿（Hamilton）原理**。

两个回答给出同样的运动。第二个回答值得拥有，有三个理由。它不依赖坐标：作用量是一个数，因此可以在任何你喜欢的坐标下计算，而运动方程在那套坐标下跟出来，不必变换加速度。它把对称性与守恒律联系起来，其精确程度是牛顿的表述所没有的，这就是诺特（Noether）定理。而且这是力学得以推广的形式：推广到场、相对论，并且经由费曼的路径积分推广到量子力学。

[[analytical-mechanics/constraints]] 从达朗贝尔原理导出了拉格朗日方程。本章用变分法从一个变分原理导出同一批方程，然后研究拉格朗日量直接告诉我们的东西：哪些动量守恒，哪个能量守恒，以及磁力这类依赖速度的力如何安插进来。

## 变分法 {#variations}

通常的微积分求的是几个变量的函数在哪些点驻定。变分法求的是"函数的函数"在哪些 *函数* 处驻定。

::: definition 泛函与驻定路径 {#def-functional}
设 $f(y, y', x)$ 是三个变量的二次连续可微函数。对 $[a, b]$ 上端点取值固定（$y(a) = y_a$、$y(b) = y_b$）的每个二次连续可微函数 $y(x)$，**泛函**

$$
J[y] = \int_a^b f\bigl(y(x), y'(x), x\bigr)\,\dd x
$$ {#eq-functional}

指定一个数。$y$ 的一次**变分**是指一族曲线 $y(x) + \eps\,\eta(x)$，其中 $\eta$ 二次连续可微且 $\eta(a) = \eta(b) = 0$，于是族中每条曲线都有同样的端点值。若对每个这样的 $\eta$ 都有

$$
\deriv{}{\eps}J[y + \eps\eta]\Big|_{\eps = 0} = 0
$$

则称路径 $y$ 是 $J$ 的**驻定**路径。这个导数称为**一阶变分**，记作 $\delta J$。
:::

驻定包括极小、极大和鞍点，与通常的函数完全一样。求两点间最短的曲线、张在金属丝上的最小面积曲面、悬链线的形状，都是这类问题。我们将在下文看到，质点的运动也是。

关键的一步是一条引理，它把"一个积分对每个 $\eta$ 都为零"转化为"被积函数为零"。

::: lemma 变分法基本引理 {#lem-fundamental}
设 $g$ 在 $[a, b]$ 上连续。若对每个满足 $\eta(a) = \eta(b) = 0$ 的二次连续可微函数 $\eta$ 都有 $\int_a^b g(x)\eta(x)\,\dd x = 0$，则 $g(x) = 0$ 对 $[a, b]$ 上的一切 $x$ 成立。
:::

::: proof
反设开区间 $(a, b)$ 内有一点 $x_0$ 使 $g(x_0) \neq 0$；必要时把 $g$ 换成 $-g$，可设 $g(x_0) > 0$。由连续性，$(a, b)$ 内存在一个含 $x_0$ 的区间 $[x_1, x_2]$，在其上 $g > 0$。令

$$
\eta(x) = \begin{cases} (x - x_1)^3 (x_2 - x)^3, & x_1 \le x \le x_2, \\ 0, & \text{其他} \end{cases}
$$

这个 $\eta$ 二次连续可微（其一、二阶导数在 $x_1$ 与 $x_2$ 处左右都为零），在 $a$、$b$ 处为零，且在 $(x_1, x_2)$ 上为正。于是 $\int_a^b g\eta\,\dd x = \int_{x_1}^{x_2} g\eta\,\dd x > 0$，与假设矛盾。故在 $(a, b)$ 上 $g = 0$，再由连续性在端点处亦然。
:::

::: theorem 欧拉–拉格朗日方程 {#thm-euler-lagrange}
端点固定的二次连续可微路径 $y(x)$ 是泛函 [[#eq-functional]] 的驻定路径，当且仅当它满足

$$
\deriv{}{x}\left(\pdv{f}{y'}\right) - \pdv{f}{y} = 0 \qquad\text{对 } a \le x \le b.
$$ {#eq-euler-lagrange}
:::

::: proof
在积分号下求导，在固定 $x$ 处用链式法则：

$$
\deriv{}{\eps}J[y + \eps\eta]\Big|_{\eps=0} = \int_a^b\left(\pdv{f}{y}\,\eta + \pdv{f}{y'}\,\eta'\right)\dd x,
$$

其中各偏导数沿路径 $y$ 取值。第二项分部积分：

$$
\int_a^b \pdv{f}{y'}\,\eta'\,\dd x = \left[\pdv{f}{y'}\,\eta\right]_a^b - \int_a^b \deriv{}{x}\left(\pdv{f}{y'}\right)\eta\,\dd x.
$$

边界项因 $\eta(a) = \eta(b) = 0$ 而消失。于是

$$
\delta J = \int_a^b\left[\pdv{f}{y} - \deriv{}{x}\left(\pdv{f}{y'}\right)\right]\eta(x)\,\dd x.
$$ {#eq-first-variation}

若 [[#eq-euler-lagrange]] 成立，则方括号为零，对每个 $\eta$ 都有 $\delta J = 0$。反过来，若对每个容许的 $\eta$ 都有 $\delta J = 0$，由于 $f$ 与 $y$ 都二次连续可微，方括号是连续函数，由 [[#lem-fundamental]] 它必化为零。
:::

欧拉–拉格朗日方程是 $y(x)$ 的二阶常微分方程，它的两个积分常数由两个端点值固定。若有若干未知函数 $y_1, \dots, y_n$，同样的论证——每次只对其中一个函数作变分——对每个函数各给出一个方程。

::: example 平面内最短的曲线 {#ex-shortest}
证明连接平面内两点的曲线中最短的是直线。
::: solution
$y(x)$ 的图像从 $x = a$ 到 $x = b$ 的长度是

$$
J[y] = \int_a^b\sqrt{1 + y'^2}\,\dd x, \qquad f(y, y', x) = \sqrt{1 + y'^2}.
$$

这里 $\partial f/\partial y = 0$，$\partial f/\partial y' = y'/\sqrt{1 + y'^2}$。欧拉–拉格朗日方程 [[#eq-euler-lagrange]] 说

$$
\deriv{}{x}\left(\frac{y'}{\sqrt{1 + y'^2}}\right) = 0, \qquad\text{故}\qquad \frac{y'}{\sqrt{1 + y'^2}} = C.
$$

解出 $y'$ 得 $y'^2 = C^2/(1 - C^2)$，是常数。于是 $y' = m$ 为常数而 $y = mx + c$，是一条直线；两个常数由两个端点固定。欧拉–拉格朗日方程只说明这条直线是驻定的。它之所以是极小，在这里由三角不等式可知，或由 $f$ 是 $y'$ 的凸函数可知。
:::
:::

当 $f$ 不显含 $x$ 时，有一个首次积分，可以省掉一次积分。

::: corollary 贝尔特拉米恒等式 {#cor-beltrami}
若 $\partial f/\partial x = 0$，则沿 [[#eq-euler-lagrange]] 的每条解，

$$
f - y'\pdv{f}{y'} = \text{常数}.
$$ {#eq-beltrami}
:::

::: proof
由链式法则，沿一条路径有 $\dd f/\dd x = f_y y' + f_{y'}y'' + f_x$，其中由假设 $f_x = 0$。于是

$$
\deriv{}{x}\left(f - y'f_{y'}\right) = f_y y' + f_{y'}y'' - y''f_{y'} - y'\deriv{}{x}f_{y'} = y'\left(f_y - \deriv{}{x}f_{y'}\right) = 0
$$

最后一步用了欧拉–拉格朗日方程。
:::

在力学里，$x$ 变成时间、$f$ 变成拉格朗日量，贝尔特拉米恒等式就是能量守恒，我们将在 [[#thm-energy]] 中以那个形式再证一次。它最有名的应用比力学的这个形式还要古老。

::: example 最速降线 {#ex-brachistochrone}
珠子沿一根导线从原点由静止开始无摩擦地滑向一个较低的点。取 $y$ *向下*为正。导线是什么形状时下滑时间最短？
::: solution
由静止出发的能量守恒给出，下降 $y$ 后的速率为 $v = \sqrt{2gy}$。沿导线的时间是 $\int\dd s/v$，于是

$$
J[y] = \int_0^{x_1}\frac{\sqrt{1 + y'^2}}{\sqrt{2gy}}\,\dd x.
$$

被积函数不显含 $x$，故贝尔特拉米恒等式 [[#eq-beltrami]] 可用。由 $f \propto \sqrt{1 + y'^2}/\sqrt{y}$，

$$
f - y'f_{y'} = \frac{1}{\sqrt{y}}\left(\sqrt{1 + y'^2} - \frac{y'^2}{\sqrt{1 + y'^2}}\right) = \frac{1}{\sqrt{y}\sqrt{1 + y'^2}},
$$

只差常数因子 $1/\sqrt{2g}$。令其等于常数，得

$$
y\bigl(1 + y'^2\bigr) = 2R
$$

其中 $2R > 0$ 是某个常数。试参数化 $x = R(\varphi - \sin\varphi)$，$y = R(1 - \cos\varphi)$。则 $\dd x/\dd\varphi = R(1 - \cos\varphi)$，$\dd y/\dd\varphi = R\sin\varphi$，于是

$$
y' = \frac{\sin\varphi}{1 - \cos\varphi}, \qquad 1 + y'^2 = \frac{(1 - \cos\varphi)^2 + \sin^2\varphi}{(1 - \cos\varphi)^2} = \frac{2}{1 - \cos\varphi},
$$

且 $y(1 + y'^2) = R(1 - \cos\varphi)\cdot 2/(1 - \cos\varphi) = 2R$。最快下降的曲线是一条**摆线**（cycloid），即半径 $R$ 的车轮沿直线 $y = 0$ 的下侧滚过时，轮缘上一点描出的曲线。半径 $R$ 的选取使摆线经过终点。[[#exr-cycloid-time]] 把它的下滑时间与直导线的时间相比较。
:::
:::

## 哈密顿原理 {#hamilton}

现在让自变量是时间，未知函数是 $n$ 自由度系统的广义坐标 $q_1(t), \dots, q_n(t)$。

::: definition 作用量 {#def-action}
对拉格朗日量为 $L(q, \dot q, t)$ 的系统，一条从时刻 $t_1$ 的位形 $q^{(1)}$ 走到时刻 $t_2$ 的位形 $q^{(2)}$ 的路径 $q(t)$ 的**作用量**是

$$
S[q] = \int_{t_1}^{t_2} L\bigl(q(t), \dot q(t), t\bigr)\,\dd t.
$$ {#eq-action}
:::

::: theorem 哈密顿原理 {#thm-hamilton}
对具有理想完整约束、力可由势 $V(q, t)$ 导出的系统，取 $L = T - V$。在给定时刻具有给定两端位形的所有路径中，真实运动使作用量 [[#eq-action]] 驻定。等价地说，真实运动满足拉格朗日方程

$$
\deriv{}{t}\left(\pdv{L}{\dot q_j}\right) - \pdv{L}{q_j} = 0, \qquad j = 1, \dots, n.
$$ {#eq-lagrange}
:::

::: proof
把 [[#thm-euler-lagrange]] 依次用于每个 $q_j$，其中 $x$ 换成 $t$、$y$ 换成 $q_j$、$f$ 换成 $L$，则作用量在一切端点固定的变分下驻定，恰好当 $n$ 个方程 [[#eq-lagrange]] 成立。[[analytical-mechanics/constraints#thm-lagrange]] 已经表明，在上述假设下牛顿定律蕴含这些方程。反过来，拉格朗日方程是 $n$ 个二阶方程；由常微分方程的存在唯一性定理，其解由 $q$ 与 $\dot q$ 的初值固定。牛顿运动是其中一个解，所以任何具有相同初数据的 [[#eq-lagrange]] 解都是那个牛顿运动。
:::

哈密顿原理常被称为*最小*作用量原理。时间区间足够短时，驻定确实是极小；但区间较长时，它可以是鞍点。摆动超过半个周期的单摆就是一例。"驻作用量"才是准确的名字。

这条原理有一个惊人的实用推论。要求出任一坐标下的运动方程，只需在那套坐标下写出 $T$ 与 $V$。不需要变换任何加速度，因为作用量是一个标量，它沿一条路径的取值不在乎用哪套坐标来描述这条路径。

::: example 上抛石子的驻作用量 {#ex-stone-action}
质量 $m = 1.00\,\mathrm{kg}$ 的石子竖直上抛，$1.00\,\mathrm{s}$ 后回到抛出高度。以 SI 单位，比较真实路径 $y_0(t) = \frac12 gt(1 - t)$ 的作用量与变分路径 $y_0(t) + a\sin\pi t + b\sin 2\pi t$ 的作用量。
::: solution
取 $L = \frac12 m\dot y^2 - mgy$ 且 $m = 1$，$y_0 + \eps\eta$ 的作用量是

$$
S[y_0 + \eps\eta] = S[y_0] + \eps\int_0^1\bigl(\dot y_0\dot\eta - g\eta\bigr)\dd t + \frac{\eps^2}{2}\int_0^1\dot\eta^2\,\dd t.
$$

线性项是一阶变分。把 $\dot y_0\dot\eta$ 分部积分并用 $\eta(0) = \eta(1) = 0$，它化为 $-\int_0^1(\ddot y_0 + g)\eta\,\dd t$，因 $\ddot y_0 = -g$ 而为零。所以真实路径是驻定的。二次项对任何非零的 $\eta$ 都是正的，所以这里真实路径是极小，而多余的作用量恰为 $\frac12\int\dot\eta^2\,\dd t$。因为 $\cos\pi t\cos 2\pi t$ 在 $[0,1]$ 上的积分为零，两个正弦项各贡献各的：

$$
S = S[y_0] + \frac{\pi^2}{4}a^2 + \pi^2 b^2.
$$

真实路径的作用量为

$$
S[y_0] = \int_0^1\left[\tfrac12\bigl(4.90(1 - 2t)\bigr)^2 - (9.80)(4.90)\,t(1-t)\right]\dd t = \frac{24.01}{6} - \frac{48.02}{6} = -4.00\,\mathrm{J\,s}.
$$

取 $a = 1.00\,\mathrm{m}$ 的一条"错"路径，作用量为 $-4.00 + 2.47 = -1.53\,\mathrm{J\,s}$，比真实值大。对作用量作数值求积可证实这三个数。
:::
:::

::: widget plot
f: 4.9*x*(1-x); 4.9*x*(1-x) + a*sin(pi*x) + b*sin(2*pi*x)
x: 0, 1
y: -1.5, 3
sliders: a=0.5:-1.5:1.5:0.05; b=0:-1:1:0.05
labels: 真实路径; 变分路径
caption: 算例中石子的高度随时间的变化。第一条曲线是真实路径；第二条加上 $a\sin\pi t + b\sin 2\pi t$，两个端点都保持固定。变分路径的作用量为 $-4.00 + 2.47a^2 + 9.87b^2$，单位 $\mathrm{J\,s}$。把任一滑块拖离零，作用量只会增大。注意：一条升得更高的路径（$a$ 为正）并不是单为它的势能买单；付出作用量代价的，是在同样的时间内到达那里再回来所需的额外动能。
:::

### 哈密顿原理不能确定的东西

一个给定系统的拉格朗日量并不唯一。把 $L$ 乘一个常数不改变任何东西，加一个常数也一样。一种不那么显眼的自由度非常有用。

::: proposition 加上一个全导数 {#prop-gauge}
设 $F(q, t)$ 是关于坐标与时间的任一二次连续可微函数。则 $L$ 与

$$
L' = L + \deriv{F}{t} = L + \sum_j\pdv{F}{q_j}\dot q_j + \pdv{F}{t}
$$

给出同样的拉格朗日方程。
:::

::: proof
两个作用量只相差一个仅依赖端点的常数：

$$
S'[q] = S[q] + \int_{t_1}^{t_2}\deriv{F}{t}\,\dd t = S[q] + F\bigl(q^{(2)}, t_2\bigr) - F\bigl(q^{(1)}, t_1\bigr).
$$

比较中的所有路径共用同样的端点，所以对每条路径 $S'$ 与 $S$ 都差同一个常数，它们在同一批路径上驻定。由 [[#thm-hamilton]]，运动方程一致。
:::

每当我们换参考系或换规范，都会出现这种自由度。它在诺特定理里也很要紧：一个变换即使改变了 $L$，只要它只把 $L$ 改变一个全导数，它仍然可以是物理的对称性。

::: quiz
下列哪些拉格朗日量给出的运动方程与 $L = \frac12 m\dot x^2 - \frac12 kx^2$ 相同？
- [x] $L_1 = \frac12 m\dot x^2 - \frac12 kx^2 + 3x\dot x$
- [ ] $L_2 = \frac12 m\dot x^2 - \frac12 kx^2 + 3x\dot x^2$
- [x] $L_3 = m\dot x^2 - kx^2$
- [ ] $L_4 = \frac12 m\dot x^2 + \frac12 kx^2$
::: solution
$L_1$ 加上了 $3x\dot x = \dd(\frac32 x^2)/\dd t$，这是一个全导数，故由 [[#prop-gauge]] 方程不变；直接验证 $\partial(3x\dot x)/\partial\dot x = 3x$ 的时间导数是 $3\dot x$，恰好抵消 $\partial(3x\dot x)/\partial x = 3\dot x$。$L_3$ 就是 $2L$，整体因子约掉。$L_2$ 加上 $3x\dot x^2$，它不是全导数，会给方程添上 $6x\ddot x + 3\dot x^2$ 这些项。$L_4$ 翻掉了势能的符号，描述的是一个不稳定平衡，其解按 $e^{\sqrt{k/m}\,t}$ 增长。
:::
:::

## 使用拉格朗日量 {#examples}

下面的例子都遵循 [[analytical-mechanics/constraints#dalembert]] 的四步：坐标，$T$ 与 $V$，$L$，方程。每个例子都留意为：哪个坐标没有出现在 $L$ 里。

::: example 挂在滑动小车上的单摆 {#ex-cart}
质量 $M$ 的小车在无摩擦的水平轨道上滑动。车上挂着一个长度 $\ell$、摆球质量 $m$ 的单摆，在包含轨道的竖直平面内摆动。求运动方程、一个守恒量，以及小振动的角频率。
::: solution
两个自由度：小车的位置 $x$，以及摆与竖直向下方向的夹角 $\phi$。摆球在 $(x + \ell\sin\phi, -\ell\cos\phi)$ 处，速度为 $(\dot x + \ell\dot\phi\cos\phi, \ell\dot\phi\sin\phi)$。于是

$$
T = \tfrac12 M\dot x^2 + \tfrac12 m\bigl(\dot x^2 + 2\ell\dot x\dot\phi\cos\phi + \ell^2\dot\phi^2\bigr), \qquad V = -mg\ell\cos\phi.
$$

坐标 $x$ 没有出现在 $L = T - V$ 中，出现的只有它的速度。于是 $x$ 的拉格朗日方程是

$$
\deriv{}{t}\left(\pdv{L}{\dot x}\right) = 0, \qquad p_x \equiv \pdv{L}{\dot x} = (M + m)\dot x + m\ell\dot\phi\cos\phi = \text{常数}.
$$

这就是小车与摆球整体的水平动量守恒，我们从牛顿第三定律早已知道；这里它从 $x$ 在 $L$ 中的缺席掉了下来。$\phi$ 的方程是

$$
m\ell^2\ddot\phi + m\ell\ddot x\cos\phi - m\ell\dot x\dot\phi\sin\phi + m\ell\dot x\dot\phi\sin\phi + mg\ell\sin\phi = 0,
$$

即 $\ell\ddot\phi + \ddot x\cos\phi + g\sin\phi = 0$。对 $p_x = 0$、从静止开始的小振动作线性化：$\cos\phi \approx 1$，$\sin\phi \approx \phi$，动量守恒给出 $(M + m)\ddot x = -m\ell\ddot\phi$。代入得

$$
\ell\ddot\phi\left(1 - \frac{m}{M + m}\right) + g\phi = 0, \qquad \omega^2 = \frac{(M + m)\,g}{M\ell}.
$$

沉重的车（$M \gg m$）给出普通的单摆 $\omega^2 = g/\ell$。轻小车则让支点回退，从而抬高频率：摆球与小车绕它们的共同质心摆动，而质心比支点更靠摆球一侧。
:::
:::

::: definition 广义动量与循环坐标 {#def-cyclic}
与 $q_j$ 共轭的**广义动量**是 $p_j = \partial L/\partial\dot q_j$。不出现在 $L$ 中（但 $\dot q_j$ 可能出现）的坐标 $q_j$ 称为**循环坐标**（亦称**可遗坐标**）。由 [[#eq-lagrange]]，与循环坐标共轭的动量守恒。
:::

广义动量不一定是线动量。平面内质点取 $L = \frac12 m(\dot r^2 + r^2\dot\phi^2) - V(r)$，对角度 $\phi$ 就有 $p_\phi = mr^2\dot\phi$，它是角动量，守恒是因为 $V$ 不依赖 $\phi$。在磁场中（如下所示），$p$ 甚至不是 $m\mathbf{v}$。

## 对称性与守恒律 {#noether}

循环坐标是一段深刻联系的特例。系统的一个**连续对称性**是一族光滑依赖某个参数的变换，它使拉格朗日量保持不变。自由粒子的平移、中心力场中粒子的转动，以及把拉格朗日量不显含时间的系统的时间原点平移，都是例子。

::: theorem 诺特定理 {#thm-noether}
设对每个实数 $\eps$，变换 $q_j \mapsto q_j + \eps K_j(q)$（伴随速度诱导的改变 $\dot q_j \mapsto \dot q_j + \eps\sum_k(\partial K_j/\partial q_k)\dot q_k$）使拉格朗日量在 $\eps$ 的一阶保持不变：

$$
\sum_j\left(\pdv{L}{q_j}K_j + \pdv{L}{\dot q_j}\dot K_j\right) = 0, \qquad \dot K_j = \sum_k\pdv{K_j}{q_k}\dot q_k,
$$ {#eq-symmetry}

对一切 $q$、$\dot q$ 与 $t$ 成立。则沿拉格朗日方程的每条解，量

$$
I = \sum_{j=1}^n p_j K_j(q) = \sum_j\pdv{L}{\dot q_j}K_j
$$ {#eq-noether-charge}

守恒。
:::

::: proof
沿一个运动，用乘积法则对 $I$ 求导，并把拉格朗日方程写成 $\dot p_j = \partial L/\partial q_j$ 的形式：

$$
\deriv{I}{t} = \sum_j\bigl(\dot p_j K_j + p_j\dot K_j\bigr) = \sum_j\left(\pdv{L}{q_j}K_j + \pdv{L}{\dot q_j}\dot K_j\right).
$$

这里 $\dot K_j$ 是 $K_j(q(t))$ 沿运动的时间导数，由链式法则它就是 [[#eq-symmetry]] 中的表达式。于是右端正是 [[#eq-symmetry]] 的左端，由假设它为零。
:::

循环坐标是这样一个特例：某个 $j$ 有 $K_j = 1$，其余 $K_k = 0$；平移 $q_j$ 不改变 $L$，而 $I = p_j$。这定理说得更多，因为对称性未必表现为你所选坐标里少了某个坐标。

::: example 由诺特定理得到动量与角动量 {#ex-noether}
一个 $N$ 体质点系的拉格朗日量为 $L = \sum_i\frac12 m_i\dot{\mathbf{r}}_i^2 - V$，其中 $V$ 只依赖差 $\mathbf{r}_i - \mathbf{r}_k$。用诺特定理证明总线动量守恒。若此外 $V$ 只依赖距离 $\abs{\mathbf{r}_i - \mathbf{r}_k}$，证明总角动量守恒。
::: solution
平移：对某个固定的单位向量 $\hat{\mathbf{n}}$，把每个质点移动 $\eps\hat{\mathbf{n}}$，于是对每个质点 $K_i = \hat{\mathbf{n}}$（每个三个分量）。速度不变，$\dot K_i = 0$，位置之差不变，所以 $L$ 不变。守恒量 [[#eq-noether-charge]] 是

$$
I = \sum_i\pdv{L}{\dot{\mathbf{r}}_i}\cdot\hat{\mathbf{n}} = \sum_i m_i\dot{\mathbf{r}}_i\cdot\hat{\mathbf{n}} = \mathbf{P}\cdot\hat{\mathbf{n}}.
$$

由于 $\hat{\mathbf{n}}$ 是任意的，总动量 $\mathbf{P}$ 的每个分量都守恒。

转动：绕轴 $\hat{\mathbf{n}}$ 转过角 $\eps$ 的无穷小转动把每个质点移动 $\eps\,\hat{\mathbf{n}}\times\mathbf{r}_i$，所以 $K_i = \hat{\mathbf{n}}\times\mathbf{r}_i$，$\dot K_i = \hat{\mathbf{n}}\times\dot{\mathbf{r}}_i$。转动保持距离，所以 $V$ 不变。动能的改变是 $\eps\sum_i m_i\dot{\mathbf{r}}_i\cdot(\hat{\mathbf{n}}\times\dot{\mathbf{r}}_i) = 0$，因为出现重复向量的混合积为零。于是 [[#eq-symmetry]] 成立，而

$$
I = \sum_i m_i\dot{\mathbf{r}}_i\cdot\bigl(\hat{\mathbf{n}}\times\mathbf{r}_i\bigr) = \hat{\mathbf{n}}\cdot\sum_i\mathbf{r}_i\times m_i\dot{\mathbf{r}}_i = \hat{\mathbf{n}}\cdot\mathbf{L}
$$

守恒，最后一步用了混合积的轮换性质。同样由于 $\hat{\mathbf{n}}$ 任意，整个角动量向量守恒。空间均匀性给出动量；空间各向同性给出角动量。
:::
:::

第三个经典对称性是时间均匀性。它不符合 [[#eq-symmetry]] 的形式，因为它平移的是 $t$ 而不是 $q$，但相应的守恒律有一个直接的证明。

::: definition 能量函数 {#def-energy-function}
拉格朗日量 $L(q, \dot q, t)$ 的**能量函数**（或**雅可比积分**）是

$$
h(q, \dot q, t) = \sum_{j=1}^n\dot q_j\pdv{L}{\dot q_j} - L.
$$ {#eq-energy-function}
:::

::: theorem 能量函数守恒 {#thm-energy}
沿拉格朗日方程的每条解，$\dd h/\dd t = -\partial L/\partial t$。特别地，若 $L$ 不显含时间，$h$ 守恒。
:::

::: proof
沿一个运动，$L$ 对时间的总导数由链式法则是

$$
\deriv{L}{t} = \sum_j\left(\pdv{L}{q_j}\dot q_j + \pdv{L}{\dot q_j}\ddot q_j\right) + \pdv{L}{t}.
$$

$h$ 第一项的时间导数是 $\sum_j(\ddot q_j\,\partial L/\partial\dot q_j + \dot q_j\,\dd(\partial L/\partial\dot q_j)/\dd t)$。相减得

$$
\deriv{h}{t} = \sum_j\dot q_j\left[\deriv{}{t}\left(\pdv{L}{\dot q_j}\right) - \pdv{L}{q_j}\right] - \pdv{L}{t} = -\pdv{L}{t},
$$

其中每个方括号都由 [[#eq-lagrange]] 为零。
:::

什么时候 $h$ 就是熟悉的 $T + V$？设约束是定常的，于是 $T = \frac12\sum_{j,k}M_{jk}(q)\dot q_j\dot q_k$ 是速度上的二次齐次函数，且 $V$ 不依赖速度。那么 $\sum_j\dot q_j\,\partial T/\partial\dot q_j = 2T$（齐次函数的欧拉定理，在 [[#exr-euler-homog]] 中验证），而 $h = 2T - (T - V) = T + V$。若约束在运动，$T$ 就含有 $\dot q$ 的一次项与零次项，$h$ 便是一个与能量不同的函数。下面两种情况都会发生：$h$ 守恒而 $T + V$ 不守恒，以及 $T + V$ 守恒而 $h$ 不守恒。

::: example 再谈转动圆环上的珠子 {#ex-hoop-h}
无摩擦珠子套在以恒定 $\omega$ 转动的圆环上（见 [[analytical-mechanics/constraints]]），$L = \frac12 mR^2(\dot\theta^2 + \omega^2\sin^2\theta) + mgR\cos\theta$，求守恒量并说明 $T + V$ 不守恒。
::: solution
$L$ 不显含 $t$，故 [[#thm-energy]] 给出一个常量

$$
h = \dot\theta\,mR^2\dot\theta - L = \tfrac12 mR^2\dot\theta^2 - \tfrac12 mR^2\omega^2\sin^2\theta - mgR\cos\theta.
$$

能量 $E = T + V = \frac12 mR^2\dot\theta^2 + \frac12 mR^2\omega^2\sin^2\theta - mgR\cos\theta$ 与 $h$ 相差 $mR^2\omega^2\sin^2\theta$：

$$
E = h + mR^2\omega^2\sin^2\theta, \qquad \deriv{E}{t} = 2mR^2\omega^2\sin\theta\cos\theta\,\dot\theta.
$$

珠子向外移动（$\sin\theta$ 增大）时能量增大。能量来自维持 $\omega$ 恒定的电动机：珠子对转轴的角动量 $mR^2\omega\sin^2\theta$ 必须增大，而提供它的力矩以 $\omega\,\dd(mR^2\omega\sin^2\theta)/\dd t$ 的功率做功，恰好就是 $\dd E/\dd t$。函数 $h$ 是转动系中的能量：相对圆环的动能，加上引力势能与离心势能。
:::
:::

::: warning 缺一个坐标不等于缺一个对称性
某个坐标是不是循环坐标，取决于你选的坐标；系统有没有对称性则不然。自由粒子在直角坐标下有三个循环坐标，角动量守恒则看不见；在球坐标下 $\phi$ 是循环坐标，$x$ 不是。不要因为少一个循环坐标就断定某个量不守恒。用合适的 $K_j$ 的诺特定理，在任何坐标下都能找到守恒律。反过来，不检查就把 $p_j$ 叫"动量"、把 $h$ 叫"能量"也要不得：它们是这套形式体系所守恒的东西，只有在上述条件下才与牛顿力学中的相应量一致。
:::

## 依赖速度的势：带电粒子 {#charged}

[[analytical-mechanics/constraints]] 中的推导需要形如 $-\nabla V$ 的力。磁场中的带电粒子受到的力依赖它的速度，然而它照样有拉格朗日量。

::: proposition 带电粒子的拉格朗日量 {#prop-charged}
质量 $m$、电荷 $q$ 的粒子在电磁场中，标势为 $\varphi(\mathbf{r}, t)$、矢势为 $\mathbf{A}(\mathbf{r}, t)$，即 $\mathbf{E} = -\nabla\varphi - \partial\mathbf{A}/\partial t$、$\mathbf{B} = \nabla\times\mathbf{A}$，其拉格朗日量为

$$
L = \tfrac12 m\dot{\mathbf{r}}^2 - q\varphi + q\,\dot{\mathbf{r}}\cdot\mathbf{A}.
$$ {#eq-charged}

它的拉格朗日方程是 $m\ddot{\mathbf{r}} = q(\mathbf{E} + \dot{\mathbf{r}}\times\mathbf{B})$。
:::

::: proof
只算 $x$ 分量；其余分量由循环置换得到。正则动量是 $p_x = \partial L/\partial\dot x = m\dot x + qA_x$。它沿路径对时间的全导数是

$$
\deriv{p_x}{t} = m\ddot x + q\left(\pdv{A_x}{t} + \dot x\pdv{A_x}{x} + \dot y\pdv{A_x}{y} + \dot z\pdv{A_x}{z}\right).
$$

拉格朗日方程的另一边是

$$
\pdv{L}{x} = -q\pdv{\varphi}{x} + q\left(\dot x\pdv{A_x}{x} + \dot y\pdv{A_y}{x} + \dot z\pdv{A_z}{x}\right).
$$

令两边相等，$\dot x\,\partial A_x/\partial x$ 这些项相消，得

$$
m\ddot x = q\left(-\pdv{\varphi}{x} - \pdv{A_x}{t}\right) + q\left[\dot y\left(\pdv{A_y}{x} - \pdv{A_x}{y}\right) - \dot z\left(\pdv{A_x}{z} - \pdv{A_z}{x}\right)\right].
$$

第一个方括号是 $E_x$。第二个是 $\dot y B_z - \dot z B_y = (\dot{\mathbf{r}}\times\mathbf{B})_x$，因为 $B_z = \partial_x A_y - \partial_y A_x$，$B_y = \partial_z A_x - \partial_x A_z$。
:::

这个结果里藏着两个教训。第一，广义动量 $\mathbf{p} = m\dot{\mathbf{r}} + q\mathbf{A}$ 不是动能动量 $m\dot{\mathbf{r}}$。在量子力学中成为算符 $-i\hbar\nabla$ 的是 $\mathbf{p}$ 而不是 $m\dot{\mathbf{r}}$。第二，规范变换 $\mathbf{A} \to \mathbf{A} + \nabla\chi$、$\varphi \to \varphi - \partial\chi/\partial t$ 使 $\mathbf{E}$ 与 $\mathbf{B}$ 保持不变，而把 $L$ 改变 $q(\dot{\mathbf{r}}\cdot\nabla\chi + \partial\chi/\partial t) = q\,\dd\chi/\dd t$，恰是一个全导数。[[#prop-gauge]] 说的正是规范变换不改变运动。

::: history 从最小作用量到诺特
皮埃尔-路易·莫罗·德·莫佩尔蒂（Pierre-Louis Moreau de Maupertuis）在 1744 年提出了最小作用量原理，带一点神学色彩。同年，莱昂哈德·欧拉（Leonhard Euler）在《求作曲线的方法》（*Methodus inveniendi lineas curvas*）中给出了对粒子的精确版本，并用离散化的论证导出了我们称为欧拉–拉格朗日方程的方程。十九岁的约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）在 1755 年写信给欧拉，带来了变分的方法——也就是这里用的 $\delta$——欧拉采纳了它，并把这个学科命名为变分法。拉格朗日在《分析力学》（*Mécanique analytique*，1788）中把整个力学建立在其上。威廉·罗恩·哈密顿（William Rowan Hamilton）在他 1834 与 1835 年发表于《哲学会刊》（*Philosophical Transactions*）的论文《动力学中的一般方法》中，以这里采用的形式——两端时间固定、$L = T - V$——陈述了这条原理。最速降线问题还要早：约翰·伯努利（Johann Bernoulli）1696 年在《学术杂志》（*Acta Eruditorum*）上提出，约翰与雅各布·伯努利（Jacob Bernoulli）、莱布尼茨（Leibniz）、洛必达（l'Hôpital）的解答以及牛顿的一篇匿名解答发表于 1697 年。艾米·诺特（Emmy Noether）在《不变变分问题》（*Invariante Variationsprobleme*，哥廷根，1918）中证明了关于对称性与守恒律的一般联系，力学与场论都在内；写作该文时她正协助希尔伯特（Hilbert）与克莱因（Klein）理解广义相对论中的能量守恒。
:::

## 后续内容 {#leads}

[[analytical-mechanics/central-forces]] 会利用有心力拉格朗日量中的循环角坐标，把三维问题化为一维。[[analytical-mechanics/rigid-bodies]] 把拉格朗日量用于转动，需要这里证明的能量与角动量首次积分。[[analytical-mechanics/hamiltonian]] 把广义动量 $p_j$ 与 $q_j$ 并列为独立变量；[[#def-energy-function]] 的能量函数 $h$ 就变成哈密顿量。同一个变分原理，把 $L$ 换成拉格朗日密度，就给出麦克斯韦方程组与粒子物理的场方程；而在 [[quantum-1]] 中，费曼的路径积分给每条路径配上权重 $e^{iS/\hbar}$，驻作用量作为经典极限浮现出来。

关于 [[#eq-lagrange]] 产生的那类二阶方程的更多知识，见数学图谱中的[二阶线性方程](/learn/maths/lesson.php?c=ode&l=second-order-linear)与[存在唯一性](/learn/maths/lesson.php?c=ode&l=existence-uniqueness)。

::: summary
- 泛函 $J[y] = \int f(y, y', x)\,\dd x$ 在端点固定的变分下驻定，当且仅当 $y$ 满足欧拉–拉格朗日方程 $\frac{\dd}{\dd x}\frac{\partial f}{\partial y'} = \frac{\partial f}{\partial y}$；证明就是分部积分加上变分法基本引理。
- 哈密顿原理：真实运动在端点与时刻都相同的路径中使作用量 $S = \int L\,\dd t$ 驻定。它的欧拉–拉格朗日方程就是拉格朗日方程。
- 驻定不一定是最小；而 $L$ 只在一个常数因子和一个加上来的全导数 $\dd F(q, t)/\dd t$ 的意义下唯一。
- 循环坐标的广义动量 $p_j = \partial L/\partial\dot q_j$ 守恒。
- 诺特定理：若 $q \to q + \eps K(q)$ 使 $L$ 不变，则 $\sum_j p_j K_j$ 守恒。平移给动量，转动给角动量。
- 若 $\partial L/\partial t = 0$，则 $h = \sum\dot q_j\,\partial L/\partial\dot q_j - L$ 守恒；只有当 $T$ 关于速度二次、$V$ 不依赖速度时它才等于 $T + V$。
- 带电粒子有 $L = \frac12 mv^2 - q\varphi + q\mathbf{v}\cdot\mathbf{A}$，它给出洛伦兹力；其正则动量是 $m\mathbf{v} + q\mathbf{A}$。
:::

## 习题 {#exercises}

::: exercise 谐振子 {level=1 check="2"}
质量 $m = 1.00\,\mathrm{kg}$ 的质点，拉格朗日量为 $L = \frac12 m\dot x^2 - \frac12 kx^2$，其中 $k = 4.00\,\mathrm{N/m}$。写出拉格朗日方程，求运动角频率（$\mathrm{rad/s}$）。
::: solution
$\partial L/\partial\dot x = m\dot x$，$\partial L/\partial x = -kx$，故拉格朗日方程 [[#eq-lagrange]] 为 $m\ddot x + kx = 0$。其解为 $x = A\cos(\omega t + \delta)$，其中 $\omega = \sqrt{k/m} = \sqrt{4.00/1.00} = 2.00\,\mathrm{rad/s}$。
:::
:::

::: exercise 小车与摆的动量 {level=1 check="1.9"}
对 [[#ex-cart]] 的小车与单摆，$M = 2.00\,\mathrm{kg}$、$m = 1.00\,\mathrm{kg}$、$\ell = 0.500\,\mathrm{m}$。在 $\dot x = 0.300\,\mathrm{m/s}$、$\phi = 0$、$\dot\phi = 2.00\,\mathrm{rad/s}$ 的时刻，求守恒动量 $p_x$（$\mathrm{kg\,m/s}$）。
::: solution
由算例，$p_x = (M + m)\dot x + m\ell\dot\phi\cos\phi = (3.00)(0.300) + (1.00)(0.500)(2.00)(1) = 0.900 + 1.00 = 1.90\,\mathrm{kg\,m/s}$。第二项是摆球摆动带来的水平动量 $m\ell\dot\phi\cos\phi$。这个值在其后的整个运动中保持不变。
:::
:::

::: exercise 球面摆 {level=1}
质量 $m$ 的摆球系在长度 $\ell$ 的轻杆上，绕固定支点自由地在半径 $\ell$ 的球面上运动。以偏离竖直向下的极角 $\theta$ 与方位角 $\phi$ 为坐标，写出拉格朗日量，指出循环坐标及其守恒动量，并写出守恒的能量函数。
::: solution
摆球在 $\ell(\sin\theta\cos\phi, \sin\theta\sin\phi, -\cos\theta)$ 处，故速率平方为 $\ell^2(\dot\theta^2 + \sin^2\theta\,\dot\phi^2)$，于是

$$
L = \tfrac12 m\ell^2\bigl(\dot\theta^2 + \sin^2\theta\,\dot\phi^2\bigr) + mg\ell\cos\theta.
$$

方位角 $\phi$ 是循环坐标，所以 $p_\phi = m\ell^2\sin^2\theta\,\dot\phi$ 守恒；它是对过支点的竖直轴的角动量，之所以守恒，是因为重力与杆的张力对该轴的力矩为零。$L$ 不显含 $t$，且 $T$ 关于速度是二次的，所以 $h = T + V = \frac12 m\ell^2(\dot\theta^2 + \sin^2\theta\,\dot\phi^2) - mg\ell\cos\theta$ 守恒。消去 $\dot\phi = p_\phi/(m\ell^2\sin^2\theta)$，能量守恒就化为关于 $\theta$ 的一维问题，这正是 [[analytical-mechanics/central-forces]] 中采用的约化。
:::
:::

::: exercise 沿摆线下滑的时间 {level=2 check="pi/sqrt(9.8)" #exr-cycloid-time}
对 [[#ex-brachistochrone]] 的最速降线，$R = 1.00\,\mathrm{m}$，珠子从 $\varphi = 0$ 由静止出发，滑到最低点 $\varphi = \pi$，即 $(\pi R, 2R)$。证明下滑时间为 $\pi\sqrt{R/g}$ 并求值（秒）。与连接同两点的直导线上的时间比较。
::: hint
在摆线上，$\dd s = 2R\sin(\varphi/2)\,\dd\varphi$，$v = \sqrt{2gy} = 2\sqrt{gR}\sin(\varphi/2)$。在直导线上加速度是常量。
:::
::: solution
由 $\dd x/\dd\varphi = R(1 - \cos\varphi)$、$\dd y/\dd\varphi = R\sin\varphi$，

$$
\left(\deriv{s}{\varphi}\right)^2 = R^2\bigl[(1 - \cos\varphi)^2 + \sin^2\varphi\bigr] = 2R^2(1 - \cos\varphi) = 4R^2\sin^2(\varphi/2).
$$

下降 $y = R(1 - \cos\varphi) = 2R\sin^2(\varphi/2)$ 后的速率为 $v = \sqrt{2gy} = 2\sqrt{gR}\sin(\varphi/2)$。于是 $\dd t = \dd s/v = \sqrt{R/g}\,\dd\varphi$，从 $\varphi = 0$ 到 $\varphi = \pi$ 的时间是 $\pi\sqrt{R/g} = \pi/\sqrt{9.80} = 1.00\,\mathrm{s}$。

从 $(0, 0)$ 到 $(\pi R, 2R)$ 的直导线长 $D = R\sqrt{\pi^2 + 4}$，倾角 $\alpha$ 满足 $\sin\alpha = 2R/D$。沿它的加速度是 $g\sin\alpha$，由 $D = \frac12 g\sin\alpha\,t^2$ 得

$$
t = \sqrt{\frac{2D}{g\sin\alpha}} = \sqrt{\frac{D^2}{gR}} = \sqrt{\frac{(\pi^2 + 4)R}{g}} = 1.19\,\mathrm{s}.
$$

摆线赢了约 $16\%$，靠的是开头陡降、早早积累速度。还有一个了不起的性质：在摆线上，$\dd t = \sqrt{R/g}\,\dd\varphi$ 意味着从任意一点由静止释放的珠子都在同样的时间 $\pi\sqrt{R/g}$ 内到达最低点——这就是惠更斯（Huygens）用于摆钟的**等时**（tautochrone）性质。
:::
:::

::: exercise 小车摆的小振动 {level=2 check="sqrt(29.4)"}
对 [[#ex-cart]]，$M = 2.00\,\mathrm{kg}$、$m = 1.00\,\mathrm{kg}$、$\ell = 0.500\,\mathrm{m}$，求小振动的角频率（$\mathrm{rad/s}$），以及 $x$ 与 $\ell\phi$ 的振幅之比。
::: solution
由算例，$\omega^2 = (M + m)g/(M\ell) = (3.00)(9.80)/((2.00)(0.500)) = 29.4\,\mathrm{s^{-2}}$，故 $\omega = \sqrt{29.4} = 5.42\,\mathrm{rad/s}$，而固定支点时是 $\sqrt{g/\ell} = 4.43\,\mathrm{rad/s}$。$p_x = 0$ 时，线性化的动量守恒给出 $(M + m)\dot x = -m\ell\dot\phi$，所以 $x = -\frac{m}{M + m}\ell\phi$（取质心静止于原点）：小车朝摆球的反方向运动，位移是摆球水平位移的三分之一。
:::
:::

::: exercise 均匀磁场中的带电粒子 {level=2 check="12"}
质量 $m = 0.500$、电荷 $q = 2.00$（以某套自洽单位计）的粒子在均匀场 $\mathbf{B} = B\hat{\mathbf{z}}$（$B = 3.00$）中运动，由 $\mathbf{A} = (0, Bx, 0)$ 与 $\varphi = 0$ 描述。写出拉格朗日量，找出循环坐标及其守恒动量，并求 $xy$ 平面内圆周运动的角频率。
::: solution
先核对矢势：$\nabla\times\mathbf{A} = (0, 0, \partial_x(Bx)) = B\hat{\mathbf{z}}$。由 [[#eq-charged]]，

$$
L = \tfrac12 m\bigl(\dot x^2 + \dot y^2 + \dot z^2\bigr) + qB x\dot y.
$$

$y$ 与 $z$ 都是循环坐标。动量 $p_y = m\dot y + qBx$ 守恒，$p_z = m\dot z$ 也守恒。$x$ 方程是 $m\ddot x = qB\dot y$。用 $\dot y = (p_y - qBx)/m$，

$$
m\ddot x = \frac{qB}{m}\bigl(p_y - qBx\bigr), \qquad \ddot x = -\left(\frac{qB}{m}\right)^2\left(x - \frac{p_y}{qB}\right),
$$

这是绕 $x_0 = p_y/(qB)$ 的简谐振动，角频率 $\omega_c = qB/m = (2.00)(3.00)/0.500 = 12.0$，即回旋频率。注意：尽管动能动量 $m\dot y$ 在振荡，$p_y$ 却守恒；这个守恒量固定了圆周运动圆心的 $x$ 坐标。若改用规范 $\mathbf{A} = (-By, 0, 0)$，则循环的将是 $x$，而 $p_x$ 固定圆心的 $y$ 坐标。
:::
:::

::: exercise 全导数的实例 {level=2}
直接验证 $L = \frac12 m\dot x^2 - mgx$ 与 $L' = \frac12 m\dot x^2 + mgt\,\dot x$ 给出同样的运动方程，并求 [[#prop-gauge]] 中满足 $L' = L + \dd F/\dd t$ 的函数 $F(x, t)$。求两者的能量函数，并说明哪个守恒。
::: solution
对 $L$，拉格朗日方程是 $m\ddot x = -mg$。对 $L'$，$\partial L'/\partial\dot x = m\dot x + mgt$，其时间导数为 $m\ddot x + mg$，而 $\partial L'/\partial x = 0$。拉格朗日方程是 $m\ddot x + mg = 0$，完全相同。

差为 $L' - L = mgt\dot x + mgx$。试 $F = mgxt$：则 $\dd F/\dd t = mg\dot x t + mgx$，恰为此差。故 $F(x, t) = mgxt$。

能量函数 [[#eq-energy-function]] 分别为

$$
h = \dot x(m\dot x) - L = \tfrac12 m\dot x^2 + mgx, \qquad h' = \dot x(m\dot x + mgt) - L' = \tfrac12 m\dot x^2.
$$

第一个守恒，因为 $L$ 不显含时间。第二个不守恒：$\partial L'/\partial t = mg\dot x \neq 0$，而且 [[#thm-energy]] 给出 $\dd h'/\dd t = -mg\dot x$——自由落体中 $\frac12 m\dot x^2$ 正是这样变的。加上一个全导数从不改变运动，但它可能改变形式体系把哪个函数标为能量。逆命题也要当心：形如"速度乘以某物"的项，只有当它等于某个 $F$ 的 $\dd F(q, t)/\dd t$ 时才是全导数，而单独的 $mgt\dot x$ 就不是。
:::
:::

::: exercise 欧拉定理与能量函数 {level=3 #exr-euler-homog}
设 $T(q, \dot q) = \frac12\sum_{j,k}M_{jk}(q)\dot q_j\dot q_k$，$M$ 对称。证明 $\sum_j\dot q_j\,\partial T/\partial\dot q_j = 2T$。由此推出：若 $L = T - V(q)$，则 $h = T + V$。再设 $T = T_2 + T_1 + T_0$，其中 $T_k$ 关于 $\dot q$ 是 $k$ 次齐次的，证明 $h = T_2 - T_0 + V$。
::: solution
求导：$\partial T/\partial\dot q_l = \frac12\sum_{j,k}M_{jk}(\delta_{jl}\dot q_k + \dot q_j\delta_{kl}) = \frac12(\sum_k M_{lk}\dot q_k + \sum_j M_{jl}\dot q_j) = \sum_k M_{lk}\dot q_k$，用了 $M$ 的对称性。于是

$$
\sum_l\dot q_l\pdv{T}{\dot q_l} = \sum_{l,k}M_{lk}\dot q_l\dot q_k = 2T.
$$

由 $L = T - V(q)$，$\partial L/\partial\dot q_j = \partial T/\partial\dot q_j$，故 $h = 2T - (T - V) = T + V$。

更一般地，若 $T_k$ 是 $k$ 次齐次的，即 $T_k(q, \lambda\dot q) = \lambda^k T_k(q, \dot q)$，把这个恒等式对 $\lambda$ 求导并令 $\lambda = 1$：$\sum_j\dot q_j\,\partial T_k/\partial\dot q_j = kT_k$。于是 $\sum_j\dot q_j\,\partial L/\partial\dot q_j = 2T_2 + T_1$，从而

$$
h = 2T_2 + T_1 - (T_2 + T_1 + T_0 - V) = T_2 - T_0 + V.
$$

对 [[#ex-hoop-h]] 的转动圆环，$T_2 = \frac12 mR^2\dot\theta^2$、$T_1 = 0$、$T_0 = \frac12 mR^2\omega^2\sin^2\theta$，正好重得那里的 $h$。
:::
:::

::: exercise 伽利略提升下的诺特定理 {level=3}
把 [[#thm-noether]] 推广：设变换 $q_j \to q_j + \eps K_j(q, t)$ 使 $L$ 改变 $\eps\,\dd\Lambda(q, t)/\dd t$（到 $\eps$ 的一阶）。证明 $\sum_j p_jK_j - \Lambda$ 守恒。把它用于自由质点系在提升（boost）$\mathbf{r}_i \to \mathbf{r}_i + \eps\mathbf{u}t$（$\mathbf{u}$ 是固定单位向量）下的情形，并解释守恒量。
::: hint
当 $K$ 依赖 $t$ 时，速度的改变是 $\eps\,\dd K_j/\dd t$，其中包含 $\partial K_j/\partial t$。假设把 [[#eq-symmetry]] 右端的零换成 $\dd\Lambda/\dd t$。
:::
::: solution
$L$ 的一阶改变是 $\eps\sum_j(\partial L/\partial q_j\,K_j + \partial L/\partial\dot q_j\,\dot K_j)$，其中 $\dot K_j = \dd K_j(q(t), t)/\dd t$。假设它等于 $\eps\,\dd\Lambda/\dd t$。沿一个运动，如同 [[#thm-noether]] 的证明，

$$
\deriv{}{t}\sum_j p_jK_j = \sum_j\left(\pdv{L}{q_j}K_j + p_j\dot K_j\right) = \deriv{\Lambda}{t},
$$

所以 $\sum_j p_jK_j - \Lambda$ 守恒。

对自由质点系，$L = \sum_i\frac12 m_i\dot{\mathbf{r}}_i^2$，$K_i = \mathbf{u}t$，故 $\dot K_i = \mathbf{u}$。$L$ 的改变是 $\eps\sum_i m_i\dot{\mathbf{r}}_i\cdot\mathbf{u} = \eps\,\dd(\sum_i m_i\mathbf{r}_i\cdot\mathbf{u})/\dd t$，所以 $\Lambda = \sum_i m_i\mathbf{r}_i\cdot\mathbf{u} = M\mathbf{R}\cdot\mathbf{u}$，其中 $M$ 是总质量，$\mathbf{R}$ 是质心。守恒量是

$$
\sum_i m_i\dot{\mathbf{r}}_i\cdot\mathbf{u}\,t - M\mathbf{R}\cdot\mathbf{u} = \bigl(\mathbf{P}t - M\mathbf{R}\bigr)\cdot\mathbf{u}.
$$

由于 $\mathbf{u}$ 任意，$M\mathbf{R} - \mathbf{P}t$ 是一个常向量，记作 $M\mathbf{R}_0$。于是 $\mathbf{R}(t) = \mathbf{R}_0 + (\mathbf{P}/M)t$：质心作匀速运动。伽利略提升下的不变性，就是质心匀速运动背后的对称性；它与能量、动量的三个分量、角动量的三个分量并列，是 $N$ 体问题的第十个经典首次积分。
:::
:::
