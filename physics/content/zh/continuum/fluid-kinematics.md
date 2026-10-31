水通过喷嘴从浇花的水管里稳定地流出。流动这一秒与下一秒毫无二致：任意固定点上的压力表或测速探头读数恒定。然而每一滴水经过喷嘴时都在变快，也就是每一滴都在被加速，必须有东西在推它。定常不等于无加速度。要把这笔账理清，需要一套描述连续介质中运动的精确语言，在其中“某一点的速度”和“某一块流体的速度”是两回事，只是每一时刻恰好共用同一个数。

流体不像 [[continuum/elasticity]] 里的弹性固体，没有什么特殊的参考形状。一杯水里的一滴墨，先被拉成细丝，再拉成片；搅动一分钟，起初并排的两个质点可能已经相隔一个杯宽。因此相对某个参考状态的位移是无用的变量。要紧的是速度场，而本章讲的就是速度场的几何：怎样从中算出流体的加速度、怎样把它画出来、它对局部转动说了些什么、流体运动时质量怎样守恒。力到现在还没出场；它们要到 [[continuum/ideal-flow]] 和 [[continuum/viscous-flow]] 才进来。

先修知识是 [[math-methods/vector-calculus]] 的向量分析——梯度、散度、旋度——以及 [[math-methods/integral-theorems]] 里的高斯（Gauss）定理与斯托克斯（Stokes）定理。[[mechanics/fluids]] 中定常流动的连续性方程 $Av = \text{常数}$ 将作为特例被重新得到。

## 运动的两种描述 {#descriptions}

描述一个流动有两种自然的方式，流体力学里每个结果在其中一种方式下都最容易做。

::: definition 拉格朗日描述与欧拉描述 {#def-descriptions}
在**拉格朗日描述**中，每个流体质点用它在参考时刻 $t = 0$ 的位置 $\mathbf a$ 来标记，运动是映射 $\mathbf x = \mathbf X(\mathbf a, t)$，给出该质点在时刻 $t$ 所在之处。其速度是固定 $\mathbf a$ 的 $\partial\mathbf X/\partial t$。

在**欧拉描述**中，我们在空间的每个固定点 $\mathbf x$、每个时刻 $t$，记录此刻恰好位于 $\mathbf x$ 的那个质点的速度 $\mathbf v(\mathbf x, t)$。两者由下式相连：

$$
\pdv{\mathbf X}{t}(\mathbf a, t) = \mathbf v\bigl(\mathbf X(\mathbf a, t), t\bigr).
$$ {#eq-link}
:::

随风飘动的气象气球报告的是拉格朗日数据；固定的风速计报告的是欧拉数据。给定欧拉场，对每个起点求解常微分方程 [[#eq-link]] 就得到拉格朗日运动。流体力学的方程本来就是为欧拉场写的，因为它们是定义在固定空间上的场，可以在那里求导数。而牛顿定律本来就是为拉格朗日图像写的，因为牛顿第二定律适用于固定的一块物质。两者之间的桥梁是物质导数（随体导数）。

固定 $\mathbf x$ 处 $\mathbf v$ 不依赖 $t$ 的流动称为**定常**的。定常性是一个欧拉概念，而且依赖于参考系：匀速航行的船外的流动，从船上看是定常的，从岸上看是不定常的。

## 物质导数 {#material}

设 $F(\mathbf x, t)$ 是任意欧拉场：温度、密度、速度的某个分量。跟踪一个质点。它所经历的 $F$ 值是 $F(\mathbf X(\mathbf a, t), t)$，其变化率是固定标签 $\mathbf a$ 的导数。

::: theorem 物质导数 {#thm-material}
沿流体质点，$F$ 的变化率为

$$
\frac{DF}{Dt} \equiv \pdv{}{t}F\bigl(\mathbf X(\mathbf a, t), t\bigr)\Big|_{\mathbf a} = \pdv{F}{t} + (\mathbf v\cdot\nabla)F,
$$ {#eq-material}

右端的导数取欧拉形式，在 $\mathbf x = \mathbf X(\mathbf a, t)$ 处求值。特别地，$\mathbf x$ 处流体质点的加速度为

$$
\mathbf a = \frac{D\mathbf v}{Dt} = \pdv{\mathbf v}{t} + (\mathbf v\cdot\nabla)\mathbf v .
$$ {#eq-acceleration}
:::

::: proof
对复合函数 $t \mapsto F(X_1(\mathbf a, t), X_2(\mathbf a, t), X_3(\mathbf a, t), t)$ 使用链式法则，

$$
\pdv{}{t}F\bigl(\mathbf X(\mathbf a, t), t\bigr) = \pdv{F}{t} + \pdv{F}{x_j}\pdv{X_j}{t} = \pdv{F}{t} + v_j\pdv{F}{x_j},
$$

最后一步用了 [[#eq-link]]。对每个分量 $F = v_i$ 应用此式即得 [[#eq-acceleration]]。
:::

第一项 $\partial F/\partial t$ 是固定观察者看到的**局部**变化率。第二项 $(\mathbf v\cdot\nabla)F$ 是**输运**（对流）变化率：质点穿过一个不均匀的场，在时间 $\dd t$ 内移动 $\mathbf v\,\dd t$，到达 $F$ 相差 $(\mathbf v\,\dd t\cdot\nabla)F$ 的地方。在水管喷嘴里，局部项为零，输运项就是全部加速度。

输运加速度 $(\mathbf v\cdot\nabla)\mathbf v$ 对速度是*二次*的。流体力学中几乎一切困难——湍流也在内——都源于这一个非线性。它与力毫不相干；它是纯粹的运动学。

::: example 喷嘴中的加速度 {#ex-nozzle}
在一个收缩喷嘴中，沿轴线的流速建模为 $u(x) = U(1 + x/L)$，$0 \le x \le L$，其中 $U = 2.00\,\mathrm{m/s}$、$L = 0.100\,\mathrm m$，流动定常。求水在入口和出口处的加速度。
::: solution
流动定常，所以 $\partial u/\partial t = 0$，沿轴线 [[#eq-acceleration]] 化为

$$
a = u\deriv{u}{x} = U\Bigl(1 + \frac{x}{L}\Bigr)\cdot\frac{U}{L} = \frac{U^2}{L}\Bigl(1 + \frac{x}{L}\Bigr).
$$

入口处 $x = 0$：$a = (2.00)^2/0.100 = 40.0\,\mathrm{m/s^2}$。出口处 $x = L$：$a = 80.0\,\mathrm{m/s^2}$，是 $g$ 的八倍，尽管喷嘴里的每一块表读数都恒定。在 [[continuum/ideal-flow]] 中我们会看到，是沿喷嘴的压强梯度提供了这个力。单位校核：$U^2/L$ 是速度平方除以长度，正是一个加速度。
:::
:::

::: example 输运造成的天气 {#ex-advection}
气象员报告一条南北方向的温度梯度：越往北越冷，每 $100\,\mathrm{km}$ 降低 $3.0\,\mathrm K$。一股 $10\,\mathrm{m/s}$ 的定常北风（从北方吹来）。若每团空气都保持自己的温度，固定气象站处的温度变化有多快？
::: solution
取 $y$ 指向北。则 $\partial T/\partial y = -3.0\,\mathrm K/10^5\,\mathrm m = -3.0\times10^{-5}\,\mathrm{K/m}$，而*从*北方吹来的风有 $v_y = -10\,\mathrm{m/s}$。气团保持自己的温度，所以 $DT/Dt = 0$，由 [[#eq-material]] 得

$$
\pdv{T}{t} = -\mathbf v\cdot\nabla T = -(-10)(-3.0\times10^{-5}) = -3.0\times10^{-4}\,\mathrm{K/s},
$$

即每小时降低 $1.1\,\mathrm K$。没有任何一团空气变冷，测站却在变冷：只是更冷的空气被输送了进来。真实的预报还要加上日照、云和上升空气绝热膨胀贡献的 $DT/Dt$，但在小时尺度上，输运项通常是最大的一项。
:::
:::

::: warning 定常不等于无加速度
定常流动有 $\partial\mathbf v/\partial t = 0$，而不是 $D\mathbf v/Dt = 0$。凡是流线弯曲、或流速沿流线变化的定常流动，其中的流体都在加速。反过来，各处速率按相同比例增大的均匀流动有 $(\mathbf v\cdot\nabla)\mathbf v = 0$ 且 $D\mathbf v/Dt = \partial\mathbf v/\partial t$。把牛顿第二定律写成 $\rho\,\partial\mathbf v/\partial t = \mathbf F$——丢掉输运项——是一个经典的错误，它预言定常流动里没有任何东西受到净力。
:::

## 流线、迹线与脉线 {#lines}

描绘一个流动常用到三族曲线，只有在定常流动中它们才重合。

::: definition 流线、迹线、脉线 {#def-lines}
在固定时刻 $t$，**流线**是处处与 $\mathbf v(\cdot, t)$ 相切的曲线：以 $s$ 为参数，它满足固定 $t$ 的 $\dd\mathbf x/\dd s = \mathbf v(\mathbf x, t)$。等价地，在二维下 $\dd y/\dd x = v_y/v_x$。

**迹线**是一个流体质点随时间的轨迹：$\dd\mathbf x/\dd t = \mathbf v(\mathbf x, t)$ 的解。

时刻 $t$ 的**脉线**是所有在更早时刻经过给定固定点 $\mathbf x_0$ 的质点构成的曲线——在 $\mathbf x_0$ 处连续注入染料所看到的就是它。
:::

::: proposition 定常流动 {#prop-steady}
若流动定常，则过 $\mathbf x_0$ 的流线、任何时刻位于 $\mathbf x_0$ 的质点的迹线、以及从 $\mathbf x_0$ 出发的脉线是同一条曲线。
:::

::: proof
对定常的 $\mathbf v$，迹线方程 $\dd\mathbf x/\dd t = \mathbf v(\mathbf x)$ 就是把流线方程的参数 $s$ 改名为 $t$，所以过 $\mathbf x_0$ 的迹线描出的正是过 $\mathbf x_0$ 的流线。此后每个经过 $\mathbf x_0$ 的质点都沿这同一条曲线运动，只是时间上有所平移，所以从 $\mathbf x_0$ 出发的脉线也落在它上面。
:::

在非定常流动中它们不同，而且往往差别很大。大风天里烟囱冒出的烟画出的是一条脉线，它的弯曲并不是瞬时流线的形状。用示踪粒子长时间曝光拍到的流动照片显示的是迹线。

::: example 摆动的流动 {#ex-flapping}
一个二维流动有 $v_x = U$、$v_y = V\cos\omega t$，在空间上均匀而随时间振荡。求时刻 $t$ 的流线、$t = 0$ 时位于原点的质点的迹线，以及从 $t = 0$ 起连续从原点释放的染料在时刻 $t$ 的脉线。
::: solution
**流线。** 固定 $t$ 时速度处处相同，所以流线是一族平行的直线，斜率 $\dd y/\dd x = (V/U)\cos\omega t$。过原点的那条是 $y = (V/U)x\cos\omega t$。它们随 $t$ 来回摆动。

**迹线。** 从原点积分 $\dot x = U$、$\dot y = V\cos\omega t$：$x = Ut$、$y = (V/\omega)\sin\omega t$。消去 $t$，

$$
y = \frac{V}{\omega}\sin\frac{\omega x}{U},
$$

一条波长为 $2\pi U/\omega$ 的正弦曲线——任何时刻都没有哪条流线是这个样子。

**脉线。** 时刻 $\tau$ 从原点释放的质点，在 $t \ge \tau$ 时位于 $x = U(t - \tau)$、$y = (V/\omega)(\sin\omega t - \sin\omega\tau)$。消去 $\tau = t - x/U$，

$$
y = \frac{V}{\omega}\Bigl[\sin\omega t - \sin\Bigl(\omega t - \frac{\omega x}{U}\Bigr)\Bigr], \qquad 0 \le x \le Ut ,
$$

又是一条波长相等的正弦曲线，但随着 $t$ 增大以速度 $U$ 向下游移动，且始终经过原点。一个流动，三条不同的曲线。
:::
:::

::: widget plot
f: sin(x); sin(T) - sin(T - x); cos(T)*x
x: 0, 12
y: -2.5, 2.5
sliders: T=6:0:12:0.1
labels: t = 0 时释放质点的迹线; T 时刻的脉线; T 时刻过原点的流线
caption: [[#ex-flapping]] 的摆动流动，取 $U = V = \omega = 1$。迹线是固定不变的。拖动时间 $T$：过原点的流线在斜率 $+1$ 与 $-1$ 之间摆动，而脉线（从原点释放的染料，只有 $x \le T$ 部分有意义）像旗子上的波浪一样向下游移动。$T = 0$ 或 $2\pi$ 的整数倍时，脉线与迹线互为镜像；任何时刻都没有哪条流线像它们中的任何一条。在一条定常流里加上摆动，流线就不再是流体去向的图像了。
:::

::: quiz
风向缓慢转变的一天，烟从工厂烟囱排出。照片显示烟羽向左弯曲。烟羽的形状显示的是什么？
- [ ] 拍照那一刻的流线。
- [ ] 一股烟的迹线。
- [x] 一条脉线：从烟囱口排出的所有烟的当前位置。
- [ ] 三者都是，因为它们总是重合。
::: solution
连续排出的烟标记的是所有更早时刻经过烟囱口的质点，这正是 [[#def-lines]] 中脉线的定义。因为风在变，流动是不定常的，[[#prop-steady]] 不适用：瞬时流线可能近乎笔直，一股烟的轨迹又是另一条曲线，而烟羽的弯曲记录着风的历史。
:::
:::

### 流函数

在 $\nabla\cdot\mathbf v = 0$ 的二维流动中——我们很快就会看到，这就是不可压缩——存在单个标量，两个速度分量都由它得出。

::: theorem 流函数 {#thm-stream}
设 $\mathbf v = (u, v)$ 是光滑的二维速度场，在单连通区域内 $\partial_xu + \partial_yv = 0$。则存在函数 $\psi(x, y)$，称为**流函数**，使得

$$
u = \pdv{\psi}{y}, \qquad v = -\pdv{\psi}{x}.
$$ {#eq-stream}

流线就是曲线 $\psi = \text{常数}$，从点 $A$ 到点 $B$ 的任意曲线之间的体积流量（沿单位深度）为 $\psi(B) - \psi(A)$。
:::

::: proof
条件 $\partial_x u = \partial_y(-v)$ 说明 1-形式 $u\,\dd y - v\,\dd x$ 是闭的，所以在单连通区域内它是恰当的：对某个 $\psi$ 有 $\dd\psi = u\,\dd y - v\,\dd x$，这就是 [[#eq-stream]]。沿流线 $\dd y/\dd x = v/u$，故 $\dd\psi = u\,\dd y - v\,\dd x = 0$：$\psi$ 为常数。对曲线微元 $(\dd x, \dd y)$，法向（顺时针旋转）是 $(\dd y, -\dd x)$，单位时间穿过的体积是 $u\,\dd y - v\,\dd x = \dd\psi$。从 $A$ 积分到 $B$ 得 $\psi(B) - \psi(A)$，与路径无关。
:::

因此流线密集处意味着流动快，稀疏处意味着流动慢：相邻两条流线之间的通量是固定的。这就是 $Av = \text{常数}$ 的二维版本。

::: example 驻点流 {#ex-stagnation}
流动 $u = \alpha x$、$v = -\alpha y$（$\alpha > 0$）描述流体从上方逼近壁面 $y = 0$ 并被转向两侧。求流函数、流线、加速度和迹线。
::: solution
散度为 $\alpha - \alpha = 0$。积分 $\partial\psi/\partial y = \alpha x$ 得 $\psi = \alpha xy + g(x)$，而 $-\partial\psi/\partial x = -\alpha y - g'(x)$ 必须等于 $-\alpha y$，所以 $g$ 是常数，舍去：$\psi = \alpha xy$。流线 $xy = \text{常数}$ 是以两坐标轴为渐近线的等轴双曲线。原点，即 $\mathbf v = 0$ 之处，是一个**驻点**。

流动定常，所以加速度只有输运部分：

$$
\mathbf a = (\mathbf v\cdot\nabla)\mathbf v = \Bigl(\alpha x\pdv{}{x} - \alpha y\pdv{}{y}\Bigr)(\alpha x, -\alpha y) = (\alpha^2x, \alpha^2y).
$$

它径直指离驻点，并随距离线性增大。沿 $y$ 轴下冲的流体在减速（$a_y = \alpha^2 y > 0$ 而 $v_y < 0$）；沿 $x$ 轴流出的流体在加速。

从 $(x_0, y_0)$ 出发的迹线满足 $\dot x = \alpha x$、$\dot y = -\alpha y$：$x = x_0e^{\alpha t}$、$y = y_0e^{-\alpha t}$。于是 $xy = x_0y_0$，还是同一条双曲线，正如 [[#prop-steady]] 所要求。$y$ 轴上的质点永远到不了壁面：它以指数趋慢的方式逼近视驻点。
:::
:::

::: widget slopefield
f: -y/x
x: -3, 3
y: -3, 3
points: 0.3, 3; -0.3, 3; 1, 2; -1, 2; 2, 1.5
caption: [[#ex-stagnation]] 驻点流的流线 $\dd y/\dd x = v/u = -y/x$ 的方向场。播下的曲线是双曲线 $xy = \text{常数}$；点击任意位置再生成一条。设想 $x$ 轴上有一堵墙：流体从上方下冲，被转向两侧。注意方向场本身既说不出流体沿曲线朝哪个方向运动，也说不出多快。流线的疏密却能做到：双曲线在远离原点的轴附近挤在一起的地方流动快，驻点附近流动慢。
:::

## 质量守恒 {#continuity}

质量不生不灭。在空间中取定一个区域 $V$（一个**控制体**），边界为 $S$，外法向为 $\mathbf n$。其中的质量只能因为流体穿过 $S$ 而改变。时间 $\dd t$ 内穿过面元 $\dd A$ 的流体恰好填满一个体积为 $\mathbf v\cdot\mathbf n\,\dd A\,\dd t$ 的斜柱体，所以单位面积的质量外流率为 $\rho\mathbf v\cdot\mathbf n$。

::: theorem 连续性方程 {#thm-continuity}
若 $\rho$ 与 $\mathbf v$ 连续可微，则每个控制体中的质量守恒，

$$
\deriv{}{t}\int_V\rho\,\dd V = -\oint_S\rho\,\mathbf v\cdot\mathbf n\,\dd A ,
$$

等价于局部**连续性方程**

$$
\pdv{\rho}{t} + \nabla\cdot(\rho\mathbf v) = 0, \qquad\text{等价地}\qquad \frac{D\rho}{Dt} + \rho\,\nabla\cdot\mathbf v = 0 .
$$ {#eq-continuity}
:::

::: proof
区域固定，时间导数可以移进积分号内。散度定理把通量转化：

$$
\int_V\Bigl(\pdv{\rho}{t} + \nabla\cdot(\rho\mathbf v)\Bigr)\dd V = 0 .
$$

这对每个区域都成立，而被积函数连续，所以它处处为零（这里的论证就是 [[continuum/stress-strain]] 中对柯西（Cauchy）运动方程用过的那个）。反过来，局部方程积分回去就是整体方程。第二种形式来自 $\nabla\cdot(\rho\mathbf v) = \mathbf v\cdot\nabla\rho + \rho\nabla\cdot\mathbf v$ 和 [[#eq-material]]。
:::

第二种形式说，质点的密度按分数变化率 $\nabla\cdot\mathbf v$ 减小。速度的散度是流体微团的膨胀速率，是 [[continuum/stress-strain]] 中体应变 $\varepsilon_{kk} = \nabla\cdot\mathbf u$ 对时间的对应物。

::: definition 不可压缩流动 {#def-incompressible}
若每个流体质点的密度都恒定，$D\rho/Dt = 0$，则流动是**不可压缩**的。由 [[#eq-continuity]]，这等价于

$$
\nabla\cdot\mathbf v = 0 .
$$ {#eq-incompressible}
:::

不可压缩是流动的性质，不只是流体的性质。空气很易压缩，但绕汽车的空气流动在百分之几的精度上不可压缩。速度为 $v$ 的流动造成的密度变化量级为 $\Delta\rho/\rho \approx \frac12\mathrm{Ma}^2$，其中 $\mathrm{Ma} = v/c$ 是**马赫（Mach）数**、$c$ 是声速（这一估计在 [[continuum/ideal-flow]] 中导出）。空气中 $100\,\mathrm{m/s}$ 时 $\mathrm{Ma} = 0.29$，$\Delta\rho/\rho \approx 0.04$。通常的经验法则把 $\mathrm{Ma} < 0.3$ 的流动当作不可压缩。不可压缩流动的密度未必均匀：在海洋里，咸水和淡水各自在运动中保持密度，各层以 $\nabla\cdot\mathbf v = 0$ 相互滑过。

::: example 变截面管中的定常流动 {#ex-pipe}
对截面 $A(x)$ 缓慢变化的管子，导出沿管的定常流动的一维连续性方程，并把它用于水（$\rho$ 常数）：水以 $1.50\,\mathrm{m/s}$ 进入直径 $20.0\,\mathrm{mm}$ 的喷嘴，从直径 $8.00\,\mathrm{mm}$ 处流出。
::: solution
取管中截面 $x_1$ 与 $x_2$ 之间的部分为控制体。流动定常，其中的质量不变，净流出为零。没有流体穿过侧壁；两端截面上，若速度在截面上近似均匀，外流率是 $-\rho_1v_1A_1$ 与 $+\rho_2v_2A_2$。于是 $\rho_1v_1A_1 = \rho_2v_2A_2$：质量流量 $\dot m = \rho vA$ 在每个截面都相同。

对水，$\rho$ 约去，$vA$ 恒定：

$$
v_2 = v_1\frac{A_1}{A_2} = 1.50\times\Bigl(\frac{20.0}{8.00}\Bigr)^2 = 1.50\times6.25 = 9.38\,\mathrm{m/s}.
$$

体积流量为 $vA = 1.50\times\pi(0.0100)^2 = 4.71\times10^{-4}\,\mathrm{m^3/s}$，约每分钟 $28$ 升。这正是 [[mechanics/fluids]] 中使用的关系；在这里，它是 [[#thm-continuity]] 用于特定控制体的结果。
:::
:::

## 运动体积：雷诺输运定理 {#rtt}

牛顿第二定律说的是固定的一块物质，一个边界随流体一起运动的**物质体积** $V(t)$。要用欧拉语言使用它，就需要对这种运动区域上的积分求导。关键是一个小体积怎样变化。

::: lemma 欧拉膨胀公式 {#lem-jacobian}
设 $J(\mathbf a, t) = \det\bigl(\partial X_i/\partial a_j\bigr)$ 为流动映射的雅可比行列式，即 $t$ 时刻一小块物质体的体积与它在 $t = 0$ 时刻体积之比。则

$$
\frac{DJ}{Dt} = J\,\nabla\cdot\mathbf v .
$$ {#eq-jacobian}
:::

::: proof
记 $F_{ij} = \partial X_i/\partial a_j$。固定 $\mathbf a$ 求导，并用 [[#eq-link]] 与链式法则，

$$
\pdv{F_{ij}}{t} = \pdv{}{a_j}v_i\bigl(\mathbf X(\mathbf a, t), t\bigr) = \pdv{v_i}{x_k}F_{kj} .
$$

行列式的导数为 $\partial_t\det F = \det F\,\tr(F^{-1}\partial_tF)$（雅可比（Jacobi）公式），而此处 $F^{-1}\partial_tF = F^{-1}(\nabla\mathbf v)F$，其迹等于 $\tr(\nabla\mathbf v) = \nabla\cdot\mathbf v$。所以 $\partial_tJ = J\,\nabla\cdot\mathbf v$。
:::

::: theorem 雷诺输运定理 {#thm-rtt}
对光滑场 $F(\mathbf x, t)$ 与边界为 $S(t)$ 的物质体积 $V(t)$，

$$
\deriv{}{t}\int_{V(t)}F\,\dd V = \int_{V(t)}\Bigl(\frac{DF}{Dt} + F\,\nabla\cdot\mathbf v\Bigr)\dd V = \int_{V(t)}\pdv{F}{t}\,\dd V + \oint_{S(t)}F\,\mathbf v\cdot\mathbf n\,\dd A .
$$ {#eq-rtt}
:::

::: proof
换元到标签：$\dd V = J\,\dd^3a$，运动区域 $V(t)$ 变成标签空间中固定的区域 $V(0)$。于是导数可以移进积分号：

$$
\deriv{}{t}\int_{V(0)}F\bigl(\mathbf X(\mathbf a, t), t\bigr)J\,\dd^3a = \int_{V(0)}\Bigl(\frac{DF}{Dt}J + F\frac{DJ}{Dt}\Bigr)\dd^3a = \int_{V(t)}\Bigl(\frac{DF}{Dt} + F\nabla\cdot\mathbf v\Bigr)\dd V,
$$

这里用了 [[#lem-jacobian]]。至于第二种形式，$DF/Dt + F\nabla\cdot\mathbf v = \partial_tF + \nabla\cdot(F\mathbf v)$，再用散度定理把最后一项化为面积分。
:::

第二种形式的读法很直白：运动体积上积分的变化，一部分来自 $F$ 在各点的变化，另一部分来自边界在空间中扫过——向外运动的地方每单位时间获得 $F\,\mathbf v\cdot\mathbf n\,\dd A$。下面两个推论会不断用到。

::: corollary 质量加权积分 {#cor-mass}
若质量守恒，则对任意场 $G$，

$$
\deriv{}{t}\int_{V(t)}\rho\,G\,\dd V = \int_{V(t)}\rho\,\frac{DG}{Dt}\,\dd V .
$$

取 $G = 1$，每个物质体积的质量不变；取 $G = v_i$，物质体积的动量变化率为 $\int\rho\,a_i\,\dd V$。不可压缩流动中取 $F = 1$，每个物质区域的体积不变。
:::

::: proof
对 $F = \rho G$ 用 [[#eq-rtt]]：被积函数是 $\rho\,DG/Dt + G\bigl(D\rho/Dt + \rho\nabla\cdot\mathbf v\bigr)$，方括号由 [[#eq-continuity]] 为零。至于最后一句，[[#eq-rtt]] 取 $F = 1$ 得 $\dd V/\dd t = \int\nabla\cdot\mathbf v\,\dd V = 0$。
:::

这补上了 [[continuum/stress-strain]] 中柯西运动方程证明留下的缺口：物质体的动量变化率等于密度乘加速度的积分。工程师把 [[#eq-rtt]] 用到有进有出的固定控制体上——弯管受到的力、喷流的推力——机械工程图谱的[控制体分析](/learn/mechanical/lesson.php?c=fluid-mechanics&l=control-volume-analysis)一课对此有展开。

::: quiz
下列流动中，哪些使得每个物质区域的体积保持不变？
- [x] $\mathbf v = (y, x, 0)$
- [ ] $\mathbf v = (x, y, 0)$
- [x] $\mathbf v = (-\Omega y, \Omega x, 0)$
- [ ] $\mathbf v = (x^2, 0, 0)$
::: solution
由 [[#cor-mass]]，物质体积保持不变当且仅当 $\nabla\cdot\mathbf v = 0$。四个场的散度依次是 $0$、$2$、$0$ 和 $2x$。第一个是纯拉伸流（沿 $x = y$ 拉长、沿 $x = -y$ 压扁），第三个是刚体转动；两者都保体积。第二个是均匀膨胀，第四个在 $x > 0$ 处膨胀、在 $x < 0$ 处压缩。
:::
:::

## 旋转与变形：涡量 {#vorticity}

在点 $\mathbf x$ 附近，速度为 $\mathbf v(\mathbf x + \mathbf r) \approx \mathbf v(\mathbf x) + (\nabla\mathbf v)\mathbf r$，其中 $(\nabla\mathbf v)_{ij} = \partial v_i/\partial x_j$。把速度梯度分成对称与反对称两部分，正如 [[continuum/stress-strain]] 中分割位移梯度的做法：

$$
\pdv{v_i}{x_j} = e_{ij} + \frac12\bigl(\partial_jv_i - \partial_iv_j\bigr), \qquad e_{ij} = \frac12\bigl(\partial_jv_i + \partial_iv_j\bigr).
$$ {#eq-decomp}

对称部分 $e_{ij}$ 是**变形速率张量**：对角元是线元的伸长速率，非对角元是直角减小速率的一半，迹为 $\nabla\cdot\mathbf v$。反对称部分是一个刚体转动，可以用一个向量写成 $\frac12\boldsymbol\omega\times\mathbf r$。

::: definition 涡量与环量 {#def-vorticity}
**涡量**为 $\boldsymbol\omega = \nabla\times\mathbf v$。沿闭曲线 $C$ 的**环量**为

$$
\Gamma_C = \oint_C\mathbf v\cdot\dd\mathbf l .
$$

由斯托克斯定理，对任何以 $C$ 为边界的曲面 $\Sigma$，$\Gamma_C = \int_\Sigma\boldsymbol\omega\cdot\mathbf n\,\dd A$：环量就是涡量的通量。处处 $\boldsymbol\omega = 0$ 的流动是**无旋**的。
:::

::: theorem 涡量是局部角速度的两倍 {#thm-spin}
相对自身中心，一小块流体微团以速度 $\mathbf e\,\mathbf r + \frac12\boldsymbol\omega\times\mathbf r$ 运动。第一项使微团变形，而不转动其变形速率的主轴；第二项使微团以角速度 $\frac12\boldsymbol\omega$ 作刚体转动。在二维下，$\frac12\omega_z$ 是过该点的所有物质线元角速度的平均。
:::

::: proof
反对称矩阵 $A_{ij} = \frac12(\partial_jv_i - \partial_iv_j)$ 有 $A_{12} = \frac12(\partial_2v_1 - \partial_1v_2) = -\frac12\omega_3$，其余分量类似，所以 $A\mathbf r = \frac12\boldsymbol\omega\times\mathbf r$——角速度为 $\frac12\boldsymbol\omega$ 的刚体转动。对称部分有三个正交的特征向量；沿其中一个的线元只是被拉伸，$\dot{\mathbf r} = \lambda\mathbf r$，其方向的改变只通过转动项发生。

再证二维的平均：取与 $x$ 轴成 $\theta$ 角的线元，$\mathbf r = r(\cos\theta, \sin\theta)$。其角速度为 $\dot\theta = (\mathbf r\times\dot{\mathbf r})_z/r^2$，其中 $\dot{\mathbf r} = (\nabla\mathbf v)\mathbf r$：

$$
\dot\theta = \partial_xv_y\cos^2\theta + (\partial_yv_y - \partial_xv_x)\sin\theta\cos\theta - \partial_yv_x\sin^2\theta .
$$

$\cos^2\theta$、$\sin^2\theta$ 与 $\sin\theta\cos\theta$ 在整圈上的平均值是 $\frac12$、$\frac12$ 与 $0$，所以平均角速度为 $\frac12(\partial_xv_y - \partial_yv_x) = \frac12\omega_z$。
:::

一个被流动带着走的微小桨轮，叶片朝向各个方向，就以平均速率 $\frac12\omega$ 转动。这就是涡量的操作性含义。它是一个局域性质，与流线是否弯曲关系不大，下面的例子会说明这一点。

::: example 三种流动，三种涡量 {#ex-three}
对 (a) 刚体转动 $\mathbf v = \Omega(-y, x)$、(b) 简单剪切流 $\mathbf v = (\dot\gamma y, 0)$ 和 (c) **直线涡** $\mathbf v = \dfrac{\kappa}{2\pi r}\hat{\boldsymbol\theta}$，计算涡量以及绕原点半径 $R$ 圆周的环量。
::: solution
(a) $\omega_z = \partial_x(\Omega x) - \partial_y(-\Omega y) = 2\Omega$：角速度的两倍，正如 [[#thm-spin]] 所说。圆周上的速率是 $\Omega R$，所以 $\Gamma = 2\pi R\cdot\Omega R = 2\pi\Omega R^2$，正是 $\omega_z$ 乘面积 $\pi R^2$，符合斯托克斯定理。

(b) $\omega_z = 0 - \partial_y(\dot\gamma y) = -\dot\gamma$。流线是直的，流动却是有旋的：放在其中的桨轮会顺时针转，因为上面的流体比下面的快。变形速率张量中 $e_{xy} = \frac12\dot\gamma$。绕圆周，$\Gamma = \oint\dot\gamma y\,\dd x = -\dot\gamma\pi R^2$（取参数 $x = R\cos\phi$、$y = R\sin\phi$：$\int_0^{2\pi}\dot\gamma R\sin\phi(-R\sin\phi)\,\dd\phi = -\pi\dot\gamma R^2$），仍是 $\omega_z$ 乘面积。

(c) 极坐标下 $\omega_z = \frac1r\partial_r(rv_\theta) - \frac1r\partial_\theta v_r = \frac1r\partial_r(\kappa/2\pi) = 0$（$r > 0$）。流线是圆，被带着转的桨轮却不转：内侧较快的流体把它朝一个方向转，路径的弯曲又以同样大小把它朝另一个方向转。绕任何以轴线为圆心的圆周的环量仍是 $2\pi R\cdot\kappa/2\pi R = \kappa$，与 $R$ 无关。斯托克斯定理并没有被违反：速度在 $r = 0$ 处奇异，全部涡量都集中在那里，而圆内的区域并不是 $\mathbf v$ 光滑的区域。常数 $\kappa$ 称为涡的**强度**。
:::
:::

::: warning 流线弯曲不等于涡量
圆形流线可以与零涡量并存（直线涡），直线流线也可以与非零涡量并存（剪切流）。涡量度量的是流体微团的局部自转，不是它们路径的形状。旋入下水口的近于一个小核心之外的直线涡，那里几乎无旋；搅拌过、已经转到像刚体一样的杯中之水恰好相反。
:::

::: remark 兰金（Rankine）涡
真实的涡——浴缸排水口、龙卷风、机翼后的尾涡——都有核心。兰金给出的最简单模型是：$r < a$ 时刚体转动 $v_\theta = \Omega r$，$r > a$ 时接上直线涡 $v_\theta = \Omega a^2/r$。全部涡量 $2\Omega$ 都在核心内；核心外任何圆周上的环量都是 $2\pi\Omega a^2$，即核心的涡量乘核心的面积。速度在核心边缘最大，这就是龙卷风的破坏路径集中在一个环带上的原因。
:::

::: history 欧拉、拉格朗日、亥姆霍兹与雷诺
欧拉（Euler）在 1755 年写成、1757 年发表的《流体运动的一般原理》（*Principes généraux du mouvement des fluides*）一文中给出了流体的场描述、连续性方程和加速度 $\partial_t\mathbf v + (\mathbf v\cdot\nabla)\mathbf v$；达朗贝尔（d'Alembert, Jean le Rond）早在 1752 年就已得到连续性方程的一种形式。用质点标签描述——如今称为拉格朗日描述——也为欧拉所用；拉格朗日（Lagrange, Joseph-Louis）在其 1788 年的《分析力学》（*Mécanique analytique*）中使之广为人知。斯托克斯（Stokes, George Gabriel）在 1845 年把一点附近的运动分解为平动、转动和纯拉伸。亥姆霍兹（Helmholtz, Hermann von）在 1858 年创立了涡量理论；汤姆孙（Thomson, William，即后来的开尔文勋爵）在其 1869 年关于涡运动的论文中引入了*环量*一词。输运定理以雷诺（Reynolds, Osborne）的名字命名，他于 1903 年陈述了这一定理。
:::

## 后续内容 {#leads}

运动学现在已经就位。[[continuum/ideal-flow]] 加上力：取 $\sigma_{ij} = -p\,\delta_{ij}$，柯西运动方程化为欧拉方程，它与 [[#eq-continuity]] 一起决定流动；伯努利（Bernoulli）方程与开尔文（Kelvin）的环量守恒定理随之而来。[[continuum/viscous-flow]] 加上与 [[#eq-decomp]] 的变形速率张量 $e_{ij}$ 成正比的应力，得到纳维-斯托克斯方程。只要有任何守恒量被流动携带，连续性方程就会重新出现——[[electrodynamics]] 中的电荷、量子力学（[[quantum-1]]）中的概率、[[analytical-mechanics/hamiltonian]] 中刘维尔（Liouville）定理的相空间密度——而拉格朗日与欧拉两种观点正是数值求解它的两条路（[[computation]]）。同一内容的工程处理见机械工程图谱的[流体运动学](/learn/mechanical/lesson.php?c=fluid-mechanics&l=fluid-kinematics)一课。

::: summary
- 欧拉速度场 $\mathbf v(\mathbf x, t)$ 与拉格朗日运动 $\mathbf X(\mathbf a, t)$ 由 $\partial_t\mathbf X = \mathbf v(\mathbf X, t)$ 相连。
- 沿质点的变化率是 $DF/Dt = \partial_tF + (\mathbf v\cdot\nabla)F$；加速度 $\partial_t\mathbf v + (\mathbf v\cdot\nabla)\mathbf v$ 在多数定常流动中不为零。
- 流线、迹线与脉线在定常流动中重合，否则不同；二维不可压缩流动中，流线是流函数的等值线，两条流线之间的通量是 $\psi$ 之差。
- 质量守恒是 $\partial_t\rho + \nabla\cdot(\rho\mathbf v) = 0$；不可压缩流动指 $\nabla\cdot\mathbf v = 0$，在 $\mathrm{Ma} \lesssim 0.3$ 时是很好的近似。
- 雷诺输运定理对运动的物质体积上的积分求导；结合质量守恒，$\frac{\dd}{\dd t}\int\rho G\,\dd V = \int\rho\,DG/Dt\,\dd V$。
- 速度梯度是变形速率加上角速度为 $\frac12\boldsymbol\omega$ 的刚体转动，其中 $\boldsymbol\omega = \nabla\times\mathbf v$；环量是涡量的通量。
- 涡量不是流线的弯曲：直线涡在轴外无旋，剪切流有旋。
:::

## 习题

::: exercise 物质导数 {level=1 check="9"}
在流动 $\mathbf v = (2x, -y, 0)\,\mathrm{s^{-1}}$（坐标以米计）中，某染料的浓度为 $c(x, y, t) = x^2y + 3t$（某个单位制）。求 $t = 0$ 时在点 $(1, 2)$ 的 $Dc/Dt$。
::: solution
局部变化率是 $\partial c/\partial t = 3$。梯度 $\nabla c = (2xy, x^2)$ 在 $(1, 2)$ 处为 $(4, 1)$，该处速度为 $(v_x, v_y) = (2x, -y) = (2, -2)$。由 [[#eq-material]]，

$$
\frac{Dc}{Dt} = 3 + (2)(4) + (-2)(1) = 3 + 8 - 2 = 9 .
$$

输运部分 $6$ 是局部部分的两倍：随流体一起运动的传感器看到的浓度上升速率，是同一位置固定传感器的三倍。
:::
:::

::: exercise 一点的加速度 {level=1 check="4*sqrt(2)"}
对 [[#ex-stagnation]] 的驻点流取 $\alpha = 2.00\,\mathrm{s^{-1}}$，求点 $(1.00, 1.00)\,\mathrm m$ 处流体加速度的大小（单位 $\mathrm{m/s^2}$）。
::: solution
由 [[#ex-stagnation]]，$\mathbf a = \alpha^2(x, y) = 4.00\times(1.00, 1.00)\,\mathrm{m/s^2}$，所以 $\abs{\mathbf a} = 4.00\sqrt2 = 5.66\,\mathrm{m/s^2}$。该处速度为 $(2.00, -2.00)\,\mathrm{m/s}$，与加速度垂直：这一瞬间质点在转向而不改变速率，因为 $\mathbf v\cdot\mathbf a = 0$。
:::
:::

::: exercise 补全一个不可压缩流场 {level=1 check="-6"}
一个定常二维流动有 $u = 3x^2 - 3y^2$、$v = kxy$。求使流动不可压缩的常数 $k$。
::: solution
由 [[#eq-incompressible]]，$\partial_xu + \partial_yv = 6x + kx = 0$ 对一切 $x$ 成立，所以 $k = -6$。流函数于是为 $\psi = 3x^2y - y^3$（校核：$\partial_y\psi = 3x^2 - 3y^2 = u$，$-\partial_x\psi = -6xy = v$）。这是流入 $60^\circ$ 楔角的流动，因为 $\psi = r^3\sin3\theta$ 在 $\theta = 0$ 与 $\theta = \pi/3$ 上为零。
:::
:::

::: exercise 两条流线之间的流量 {level=2 check="7.5"}
对驻点流 $\psi = \alpha xy$，取 $\alpha = 1.50\,\mathrm{s^{-1}}$，求过点 $(1.00, 2.00)\,\mathrm m$ 的流线与过点 $(2.00, 3.50)\,\mathrm m$ 的流线之间的体积流量（沿单位深度，单位 $\mathrm{m^2/s}$）。
::: solution
由 [[#thm-stream]]，流量就是流函数值之差，无论用什么曲线连接两点：

$$
\psi_1 = 1.50\times1.00\times2.00 = 3.00\,\mathrm{m^2/s}, \qquad \psi_2 = 1.50\times2.00\times3.50 = 10.5\,\mathrm{m^2/s},
$$

所以 $Q = 10.5 - 3.00 = 7.50\,\mathrm{m^2/s}$。作为校核，沿直线 $x = 1.00\,\mathrm m$ 横跨两条流线。第一条流线在 $y = 2.00$ 处与之相交，第二条 $xy = 10.5/1.50 = 7.00$ 在 $y = 7.00$ 处与之相交。穿过这一段的通量为 $\int u\,\dd y = \alpha x\,\Delta y = 1.50\times1.00\times5.00 = 7.50\,\mathrm{m^2/s}$，同一个答案——对两条流线之间的任何路径都必然如此。
:::
:::

::: exercise 逼近视驻点所需的时间 {level=2 check="log(10)/0.5"}
在 $\alpha = 0.500\,\mathrm{s^{-1}}$ 的驻点流中，一个质点从 $(0.100, 1.00)\,\mathrm m$ 出发。它要花多少秒到达 $y = 0.100\,\mathrm m$？那时它在哪里？
::: solution
由 [[#ex-stagnation]]，$y = y_0e^{-\alpha t}$，所以 $t = \alpha^{-1}\ln(y_0/y) = 2.00\ln10 = 4.61\,\mathrm s$。此时 $x = x_0e^{\alpha t} = 0.100\times10 = 1.00\,\mathrm m$；质点在 $(1.00, 0.100)$，同一条双曲线 $xy = 0.100\,\mathrm{m^2}$ 上。每再靠近壁面一个数量级都要再花 $4.61\,\mathrm s$，所以质点永远到不了。
:::
:::

::: exercise 兰金涡 {level=2 check="2*pi*2*0.05^2"}
一个兰金涡的核心半径 $a = 5.00\,\mathrm{cm}$，以 $\Omega = 2.00\,\mathrm{rad/s}$ 作刚体转动。求绕轴线外半径 $20.0\,\mathrm{cm}$ 圆周的环量（单位 $\mathrm{m^2/s}$）、该处的流速，以及核心内外的涡量。
::: solution
核心外 $v_\theta = \Omega a^2/r$，所以在 $r = 0.200\,\mathrm m$ 处，$v_\theta = 2.00\times0.0025/0.200 = 0.0250\,\mathrm{m/s}$，且 $\Gamma = 2\pi rv_\theta = 2\pi\Omega a^2 = 2\pi\times2.00\times0.00250 = 0.0314\,\mathrm{m^2/s}$。涡量在核心内为 $2\Omega = 4.00\,\mathrm{s^{-1}}$，核心外为零；$\Gamma$ 等于 $4.00\times\pi a^2 = 0.0314\,\mathrm{m^2/s}$，符合斯托克斯定理。速度在核心边缘最大，为 $\Omega a = 0.100\,\mathrm{m/s}$。
:::
:::

::: exercise 压缩气体 {level=2 check="4.8"}
长 $L$ 的气缸中的气体被一个以速度 $V$ 向封闭端 $x = 0$ 运动的活塞压缩，于是所考察的瞬时各处速度为 $v_x = -Vx/L$。取 $V = 2.00\,\mathrm{m/s}$、$L = 0.500\,\mathrm m$、密度 $\rho = 1.20\,\mathrm{kg/m^3}$（均匀），求每个气体质点密度的增长率 $D\rho/Dt$，单位 $\mathrm{kg\,m^{-3}\,s^{-1}}$。$\partial\rho/\partial t$ 与它相同吗？
::: solution
散度为 $\partial v_x/\partial x = -V/L = -4.00\,\mathrm{s^{-1}}$。由 [[#eq-continuity]] 的第二形式，

$$
\frac{D\rho}{Dt} = -\rho\,\nabla\cdot\mathbf v = 1.20\times4.00 = 4.80\,\mathrm{kg\,m^{-3}\,s^{-1}}.
$$

因为密度均匀，$\nabla\rho = 0$，输运项为零，所以 $\partial\rho/\partial t$ 也是 $4.80$。这与整体说法一致：$L$ 缩小时质量 $\rho AL$ 保持不变，$\dot\rho/\rho = -\dot L/L = V/L$。
:::
:::

::: exercise 物质体的膨胀 {level=3}
用 [[#lem-jacobian]] 证明：在流动 $\mathbf v = (\beta x, \beta y, -2\beta z)$ 中每个物质体的体积不变，而在流动 $\mathbf v = \beta(x, y, z)$ 中体积按 $e^{3\beta t}$ 增长。然后直接求出流动映射 $\mathbf X(\mathbf a, t)$ 及其雅可比行列式，验证第二个结果。
::: solution
第一个流动 $\nabla\cdot\mathbf v = \beta + \beta - 2\beta = 0$，所以 $DJ/Dt = 0$、$J = 1$：一个轴对称拉伸流，把物质元沿径向拉长、沿 $z$ 压扁，体积不变。第二个流动 $\nabla\cdot\mathbf v = 3\beta$，所以 $DJ/Dt = 3\beta J$，由 $J(0) = 1$ 得 $J = e^{3\beta t}$。

直接计算：$\dot X_i = \beta X_i$ 给出 $X_i = a_ie^{\beta t}$，于是 $\partial X_i/\partial a_j = e^{\beta t}\delta_{ij}$，$J = \det = e^{3\beta t}$，与前面一致。由 [[#eq-continuity]]，每个质点的密度按 $\rho_0e^{-3\beta t}$ 衰减：这就是共动坐标下宇宙膨胀的运动学，其中 $\beta$ 起着哈勃（Hubble）速率的作用。
:::
:::

::: exercise 直线涡中的桨轮 {level=3}
在直线涡 $v_\theta = \kappa/2\pi r$ 中，考察过点 $(r, 0)$ 的两个短物质线元，一个沿 $\hat{\mathbf r}$，一个沿 $\hat{\boldsymbol\theta}$。分别计算它们的转动速率，并证明其平均为 $\frac12\omega_z = 0$，而沿 $\hat{\boldsymbol\theta}$ 的线元单独以 $v_\theta/r$ 转动——那正是该点绕轴转动的速率。
::: hint
在点 $(r, 0)$ 处用笛卡尔坐标计算，那里 $\hat{\mathbf r} = \mathbf e_x$、$\hat{\boldsymbol\theta} = \mathbf e_y$，且 $u = -\kappa y/2\pi(x^2 + y^2)$、$v = \kappa x/2\pi(x^2 + y^2)$。沿 $\mathbf e_x$ 的线元的转动速率是 $\partial_xv$，沿 $\mathbf e_y$ 的是 $-\partial_yu$。
:::
::: solution
记 $k = \kappa/2\pi$。则 $u = -ky/(x^2 + y^2)$、$v = kx/(x^2 + y^2)$。在 $(r, 0)$ 处：

$$
\pdv{v}{x} = k\frac{(x^2 + y^2) - 2x^2}{(x^2 + y^2)^2} = -\frac{k}{r^2}, \qquad \pdv{u}{y} = -k\frac{(x^2 + y^2) - 2y^2}{(x^2 + y^2)^2} = -\frac{k}{r^2} .
$$

沿 $\mathbf e_x$（径向）的线元以 $\partial_xv = -k/r^2$ 转动：顺时针，因为它的外端比内端绕得慢。沿 $\mathbf e_y$（切向）的线元以 $-\partial_yu = +k/r^2$ 转动：逆时针，恰好是该点绕轴转动的角速度 $v_\theta/r = k/r^2$——它始终与自己所在的圆相切。平均为 $\frac12(-k/r^2 + k/r^2) = 0 = \frac12\omega_z$，与 [[#thm-spin]]、[[#ex-three]] 一致。一叶径向、一叶切向的桨轮受到同样大小、方向相反的推压，不会转动；它保持自身朝向不变地被带着绕轴转，像一根指南针。
:::
:::
