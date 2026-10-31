把一罐蜂蜜和一罐水并排倾斜。两者密度相近，而 [[continuum/ideal-flow]] 的理想理论对它们一视同仁。可是水一秒钟就倒了出来，蜂蜜却要一分钟。差别在于**黏性**——一层流体在另一层上滑过时抵抗它的内摩擦。河流中间比岸边流得快是黏性的缘故，血液需要心脏来推动是黏性的缘故，雾滴下落得慢是黏性的缘故，运动物体感到阻力也是黏性的缘故——达朗贝尔佯谬的答案。

本章在欧拉方程上加上黏性应力，导出**纳维-斯托克斯（Navier–Stokes）方程**。它的精确解不多但都有启发性：两板拖曳间的流动、管中流动（哈根-泊肃叶定律）、球体的缓慢运动（斯托克斯阻力）。它的标度性质更有用处。一个无量纲数——**雷诺数**——决定黏性是主导还是小修正，决定流动是平顺还是湍流。雷诺数很大时，黏性只在壁面附近薄薄的**边界层**里要紧，而边界层的行为调和了理想理论与每个游泳者都感到的阻力。

原料是 [[continuum/stress-strain]] 的柯西运动方程、[[continuum/fluid-kinematics]] 的变形速率张量 $e_{ij} = \frac12(\partial_iv_j + \partial_jv_i)$ 与涡量，以及 [[continuum/elasticity]] 的各向同性张量论证。精确流动由 [[math-methods/odes]] 一类的常微分方程解出。

## 牛顿黏性 {#newtonian}

想象两平行板之间一层薄油，相距 $h$，下板固定，上板以速度 $U$ 运动。实验表明，使上板保持运动所需的单位面积的力正比于 $U/h$：

$$
\tau = \eta\,\frac{U}{h} .
$$

常数 $\eta$ 是**动力黏度**，单位 $\mathrm{Pa\,s}$。牛顿（Newton）在《自然哲学的数学原理》（*Principia*）中提出过这条正比律；遵从它的流体称为**牛顿流体**。空气与水的牛顿性极高；血液、油漆、番茄酱和牙膏则不然。

要把这变成一般流动的定律，需要一个依赖速度梯度的应力。它对刚体运动必须为零——均匀平动或刚体转动的流体没有被剪切，感觉不到摩擦——所以它只通过变形速率 $e_{ij}$ 依赖 $\nabla\mathbf v$，而不通过涡量。

::: definition 牛顿流体 {#def-newtonian}
若流体的应力张量为

$$
\sigma_{ij} = -p\,\delta_{ij} + 2\eta\Bigl(e_{ij} - \tfrac13e_{kk}\delta_{ij}\Bigr) + \zeta\,e_{kk}\,\delta_{ij} ,
$$ {#eq-newtonian}

其中 $e_{ij} = \frac12(\partial_iv_j + \partial_jv_i)$、$e_{kk} = \nabla\cdot\mathbf v$，常数 $\eta \ge 0$（**剪切黏度**）与 $\zeta \ge 0$（**体黏度**），则称它是**牛顿**的。这里 $p$ 是物态方程给出的热力学压强。比值 $\nu = \eta/\rho$ 是**运动黏度**。
:::

[[#eq-newtonian]] 的形式由两条假设逼出：黏性应力是 $e_{ij}$ 的线性函数；流体各向同性。论证就是 [[continuum/elasticity#thm-hooke]] 的那个，只是把应变换成变形速率：黏性应力必为 $\lambda'e_{kk}\delta_{ij} + 2\eta e_{ij}$，即取 $\zeta = \lambda' + \frac23\eta$ 的 [[#eq-newtonian]]。这一拆分与弹性完全相同。剪切黏度抵抗速率 $e_{ij} - \frac13e_{kk}\delta_{ij}$ 的形状改变；体黏度抵抗体积改变，在不可压缩流动（$e_{kk} = 0$）中无关紧要。$\eta$ 与 $\zeta$ 的非负性由热力学第二定律要求：黏性应力必须把动能变成热，而决不能相反。

$20\,^\circ\mathrm C$、常压下的典型数值取自标准手册表（Kaye 与 Laby；CRC 手册）：

| 流体 | $\eta$ (Pa s) | $\rho$ (kg/m³) | $\nu$ (m²/s) |
|---|---|---|---|
| 空气 | $1.81\times10^{-5}$ | $1.20$ | $1.51\times10^{-5}$ |
| 水 | $1.00\times10^{-3}$ | $998$ | $1.00\times10^{-6}$ |
| 橄榄油 | $\approx 0.08$ | $910$ | $\approx 9\times10^{-5}$ |
| 甘油 | $1.41$ | $1260$ | $1.12\times10^{-3}$ |
| 蜂蜜 | $\approx 10$ | $1400$ | $\approx 7\times10^{-3}$ |

注意空气的运动黏度*大于*水，大十五倍。运动方程中衡量动量扩散快慢的是 $\nu$ 而不是 $\eta$，从这个意义上说空气是更黏的流体。气体的黏度随温度升高，大致按 $\sqrt T$，因为更快的分子跨层输运动量更快（[[thermodynamics/kinetic-theory]] 导出 $\eta \approx \frac13\rho\bar v\lambda$）。液体的黏度随温度陡降，热蜂蜜流动更快便是明证。

## 纳维-斯托克斯方程 {#navier-stokes}

::: theorem 纳维-斯托克斯方程 {#thm-ns}
$\eta$ 与 $\zeta$ 均匀的牛顿流体在重力场 $\mathbf g$ 中，

$$
\rho\Bigl(\pdv{\mathbf v}{t} + (\mathbf v\cdot\nabla)\mathbf v\Bigr) = -\nabla p + \eta\nabla^2\mathbf v + \Bigl(\zeta + \tfrac13\eta\Bigr)\nabla(\nabla\cdot\mathbf v) + \rho\mathbf g .
$$

若流动不可压缩，$\nabla\cdot\mathbf v = 0$，化为

$$
\pdv{\mathbf v}{t} + (\mathbf v\cdot\nabla)\mathbf v = -\frac1\rho\nabla p + \nu\nabla^2\mathbf v + \mathbf g, \qquad \nabla\cdot\mathbf v = 0 .
$$ {#eq-ns}
:::

::: proof
对 [[#eq-newtonian]] 逐项取散度。压强项给出 $-\partial_ip$。由 $2e_{ij} = \partial_iv_j + \partial_jv_i$，

$$
\partial_j(2\eta e_{ij}) = \eta\bigl(\partial_i\partial_jv_j + \partial_j\partial_jv_i\bigr) = \eta\,\partial_i(\nabla\cdot\mathbf v) + \eta\nabla^2v_i .
$$

各向同性项给出 $\partial_i\bigl[(\zeta - \frac23\eta)\nabla\cdot\mathbf v\bigr]$。相加得 $\partial_j\sigma_{ij} = -\partial_ip + \eta\nabla^2v_i + (\zeta + \frac13\eta)\partial_i(\nabla\cdot\mathbf v)$。代入柯西运动方程 $\rho\,Dv_i/Dt = \partial_j\sigma_{ij} + \rho g_i$ 得第一个方程；取 $\nabla\cdot\mathbf v = 0$ 并除以 $\rho$ 即得 [[#eq-ns]]。
:::

新项 $\nu\nabla^2\mathbf v$ 是扩散项。它说每个速度分量像热一样在流体中扩散，扩散率为 $\nu$：比邻近各层运动得快的一层把邻层拖着走，又被邻层拖慢。对常 $\rho$ 的 [[#eq-ns]] 取旋度，压强与重力被消去，得到**涡量方程**

$$
\frac{D\boldsymbol\omega}{Dt} = (\boldsymbol\omega\cdot\nabla)\mathbf v + \nu\nabla^2\boldsymbol\omega ,
$$ {#eq-vorticity}

其中第一项是开尔文定理中遇到的涡线拉伸与转动，第二项是涡线的扩散。$\nu = 0$ 时涡量只能被携带和拉伸；$\nu > 0$ 时它还能在壁面产生并扩散进流体。

微分方程的阶从一升到二，需要多一个边界条件。它就是**无滑移条件**：固体壁处流体具有壁面的速度，切向分量也包括在内。对普通液体和气体这是实验事实，微观上可以理解为分子撞击粗糙壁面后被朝随机方向弹开。只有在稀薄气体中、以及液体在极光滑的疏液表面上，它才有例外（后者只是略有偏离）。工程师对这方程的处理——它的各种形式与边界条件——见机械工程图谱的[纳维-斯托克斯方程](/learn/mechanical/lesson.php?c=fluid-mechanics&l=navier-stokes)一课。

## 精确解：库埃特流与泊肃叶流 {#exact}

对**单向**流动 $\mathbf v = u(y, z, t)\,\mathbf e_x$，非线性项 $(\mathbf v\cdot\nabla)\mathbf v$ 恒为零：速度不沿流动方向变化，正如不可压缩性所要求的。于是 [[#eq-ns]] 是线性的，经典解随之而来。

### 平面库埃特流与泊肃叶流

在 $y = 0$ 与 $y = h$ 两板之间，定常流动 $u(y)$ 沿 $x$，忽略重力，[[#eq-ns]] 的 $y$ 分量给出 $\partial p/\partial y = 0$，$x$ 分量给出

$$
\eta\deriv{^2u}{y^2} = \pdv{p}{x} .
$$

左端只依赖 $y$，右端只依赖 $x$，所以都等于常数 $-G$，即给定的单位长度压降。两次积分并用无滑移条件 $u(0) = 0$、$u(h) = U$：

$$
u(y) = \frac{Uy}{h} + \frac{G}{2\eta}y(h - y) .
$$ {#eq-couette}

$G = 0$ 时是**库埃特（Couette）流**：线性剖面，剪应力均匀，为 $\eta U/h$，正是出发时的那个实验。$U = 0$ 时是**平面泊肃叶流**：抛物线，最大值为中线处的 $Gh^2/8\eta$。轴颈轴承——旋转的轴靠一层薄油膜同轴承壳隔开——就是一个库埃特流加上轴的偏心产生的压强驱动部分——正是使轴不磨到金属的那份升托之力。

::: widget plot
f: U*(1+x)/2 + P*(1-x^2)
x: -1, 1
y: -1, 2
sliders: U=1:-1:1:0.05; P=0:-1:1:0.05
caption: 渠道横截面上的速度剖面 [[#eq-couette]]，横轴上的 $-1$ 与 $+1$ 是两壁，上壁以速度 $U$ 运动，压强驱动部分在中心线上的强度为 $P$。$P = 0$ 时看到纯库埃特流，一条直线。设 $U = 0$、$P = 1$ 得泊肃叶流，一条抛物线。再设 $U = 1$ 并把 $P$ 拖成负值：逆压梯度（沿运动方向压强升高）一旦使 $P < -0.25$，固定壁附近的流体就*倒流*。壁面附近这种流动反向，正是边界层分离的种子。
:::

### 管流

::: theorem 哈根-泊肃叶定律 {#thm-poiseuille}
不可压缩牛顿流体在半径 $R$ 的直圆管中作定常层流，由长度 $L$ 上的压降 $\Delta p$ 驱动，速度剖面为

$$
u(r) = \frac{\Delta p}{4\eta L}\bigl(R^2 - r^2\bigr),
$$ {#eq-poiseuille-profile}

体积流量为

$$
Q = \frac{\pi R^4\,\Delta p}{8\eta L} .
$$ {#eq-poiseuille}

平均速度是轴线速度之半，壁面剪应力为 $\tau_w = R\,\Delta p/2L$。
:::

::: proof
流动沿轴 $x$，$\mathbf v = u(r)\,\mathbf e_x$。[[#eq-ns]] 的径向与周向分量给出 $\partial p/\partial r = \partial p/\partial\theta = 0$，故 $p = p(x)$。轴向分量，配上轴对称函数的拉普拉斯算符，是

$$
\frac{\eta}{r}\deriv{}{r}\Bigl(r\deriv{u}{r}\Bigr) = \deriv{p}{x} .
$$

与前面一样，两端等于常数 $-\Delta p/L$。乘以 $r/\eta$ 并积分：

$$
r\deriv{u}{r} = -\frac{\Delta p}{2\eta L}r^2 + A .
$$

轴线上速度必须有限，所以 $u'$ 在 $r = 0$ 处有限，迫使 $A = 0$。再积分一次，$u = -\frac{\Delta p}{4\eta L}r^2 + B$，$r = R$ 处无滑移给出 $B = \Delta pR^2/4\eta L$，即 [[#eq-poiseuille-profile]]。流量为

$$
Q = \int_0^R u(r)\,2\pi r\,\dd r = \frac{2\pi\Delta p}{4\eta L}\Bigl[\frac{R^2r^2}{2} - \frac{r^4}{4}\Bigr]_0^R = \frac{\pi R^4\Delta p}{8\eta L} .
$$

轴线速度 $u(0) = \Delta pR^2/4\eta L$，平均速度 $Q/\pi R^2 = \Delta pR^2/8\eta L$，恰为其一半。壁面剪应力为 $\eta\abs{u'(R)} = \eta\cdot\frac{\Delta p}{2\eta L}R = R\Delta p/2L$。
:::

最引人注目的是半径的四次方。管径减半，同样压降下流量缩到十六分之一。它解释了为什么动脉的局部狭窄如此严重，为什么身体靠小动脉半径的微小变化来调节血流。哈根（Hagen）1839 年在黄铜管中测出了这一定律；研究血流的医生泊肃叶（Poiseuille）于 1840–46 年间在玻璃毛细管中独立测得。从纳维-斯托克斯方程出发的推导在此后几十年中出现，尤其是哈根巴赫（Hagenbach）1860 年的工作。

::: example 细管中的水 {#ex-tube}
水（$\eta = 1.00\times10^{-3}\,\mathrm{Pa\,s}$）在半径 $1.00\,\mathrm{mm}$、长 $1.00\,\mathrm m$ 的管中被 $1.00\,\mathrm{kPa}$ 的压强差驱动。求流量、平均速度和轴线速度。校核流动是层流。
::: solution
由 [[#eq-poiseuille]]，

$$
Q = \frac{\pi(1.00\times10^{-3})^4\times1000}{8\times1.00\times10^{-3}\times1.00} = \frac{\pi\times10^{-9}}{8\times10^{-3}} = 3.93\times10^{-7}\,\mathrm{m^3/s},
$$

约每分钟 $24\,\mathrm{ml}$。平均速度 $Q/\pi R^2 = 3.93\times10^{-7}/3.14\times10^{-6} = 0.125\,\mathrm{m/s}$，轴线速度是它的两倍，$0.250\,\mathrm{m/s}$。以下一节定义的、基于直径的雷诺数 $\rho\bar u\,2R/\eta = 1000\times0.125\times0.00200/10^{-3} = 250$，远低于转捩值约 $2000$，所以实现的正是层流解。同样压强梯度下，半径 $1\,\mathrm{cm}$ 的管由 [[#eq-poiseuille]] 将载送一万倍的水，速度一百倍，雷诺数 $250\,000$——那时层流解就根本观察不到了。
:::
:::

::: warning 抛物线剖面并非自动成立
[[#eq-poiseuille-profile]] 说的是**充分发展层流**。管道入口附近剖面仍在发展，长度约 $0.06\,\mathrm{Re}$ 倍直径。雷诺数超过约 $2000$ 后流动变为湍流，剖面平得多，压降远大于 [[#eq-poiseuille]] 的预言，大致按 $Q^{1.75}$ 而非 $Q$ 增长。用哈根-泊肃叶定律给水管或通风管道定尺寸，得到的答案会差一个量级。湍流管流的经验规律见机械工程图谱的[管流](/learn/mechanical/lesson.php?c=fluid-mechanics&l=pipe-flow)一课。
:::

## 雷诺数与动力相似 {#reynolds}

多数流动求不出精确解，但 [[#eq-ns]] 仍然告诉我们它们的解如何随尺度变换。设流动由长度 $L$（物体或管道的尺度）与速度 $U$ 刻画。长度以 $L$ 为单位，速度以 $U$ 为单位，时间以 $L/U$ 为单位，压强以 $\rho U^2$ 为单位：$\mathbf x = L\mathbf x^*$、$\mathbf v = U\mathbf v^*$、$t = (L/U)t^*$、$p = \rho U^2p^*$。于是忽略重力时 [[#eq-ns]] 化为

$$
\pdv{\mathbf v^*}{t^*} + (\mathbf v^*\cdot\nabla^*)\mathbf v^* = -\nabla^*p^* + \frac{1}{\mathrm{Re}}\nabla^{*2}\mathbf v^*, \qquad \nabla^*\cdot\mathbf v^* = 0 ,
$$ {#eq-ns-dimensionless}

只带一个参数，**雷诺（Reynolds）数**

$$
\mathrm{Re} = \frac{UL}{\nu} = \frac{\rho UL}{\eta} .
$$

::: theorem 动力相似 {#thm-similarity}
两个不可压缩牛顿流体的流动，无自由表面，过几何相似的物体、边界条件相似，若雷诺数相同，则它们由同一个无量纲解 $\mathbf v^*(\mathbf x^*, t^*)$、$p^*(\mathbf x^*, t^*)$ 描述。特别地，物体上的阻力形如

$$
F = \rho U^2L^2\,f(\mathrm{Re})
$$

同族流动共用同一个函数 $f$。
:::

::: proof
无量纲问题——[[#eq-ns-dimensionless]]，无量纲物面上无滑移，远处 $\mathbf v^* \to \mathbf e_x$——除 $\mathrm{Re}$ 外不含任何参数。所以雷诺数相等的两个流动提出同一个无量纲问题，只要它有唯一解（或二者实现的是同一个解），就有相同的 $\mathbf v^*$ 与 $p^*$。力是应力在物体上的积分，$F = \oint\sigma_{ij}n_j\,\dd A$；无量纲形式下应力是 $\rho U^2$ 乘一个无量纲解的函数，面积是 $L^2$ 乘一个无量纲面积，于是 $F = \rho U^2L^2f(\mathrm{Re})$。
:::

雷诺数估计惯性项与黏性项之比：$\abs{(\mathbf v\cdot\nabla)\mathbf v} \sim U^2/L$ 对 $\abs{\nu\nabla^2\mathbf v} \sim \nu U/L^2$。它在自然界中的范围大得惊人：

| 流动 | $L$ | $U$ | $\mathrm{Re}$ |
|---|---|---|---|
| 水中游动的细菌 | $2\,\mu\mathrm m$ | $30\,\mu\mathrm m/\mathrm s$ | $6\times10^{-5}$ |
| $1\,\mathrm{mm}$ 管中的水（上节） | $2\,\mathrm{mm}$ | $0.125\,\mathrm{m/s}$ | $250$ |
| 游泳的人 | $2\,\mathrm m$ | $1\,\mathrm{m/s}$ | $2\times10^{6}$ |
| 高速公路上的汽车 | $4\,\mathrm m$ | $30\,\mathrm{m/s}$ | $8\times10^{6}$ |

雷诺数很小时黏性主导、惯性无足轻重：停止游动的细菌滑行不到一个原子直径的十分之一。雷诺数很大时惯性主导，但如我们将看到的，黏性不能一丢了之。

相似性是风洞与拖曳水池一切试验的基础。雷诺于 1883 年通过向玻璃管的水流中注入一缕染料发现了它的重要性。低于以他名字命名的这个数的临界值——普通入口扰动下约 $2000$，尽管他极其小心时能把层流维持到 $12\,000$——染料保持一条直线。超过它，细丝破碎、染料充满管道：流动变为**湍流**。不同直径的管子与不同温度（从而不同黏度）的水给出同一个 $\bar uD/\nu$ 临界值，这是转捩中动力相似的第一次演示。工程实践中的量纲分析见机械工程图谱的[量纲分析](/learn/mechanical/lesson.php?c=fluid-mechanics&l=dimensional-analysis)一课。

::: quiz
一辆汽车的 1:5 模型要在水洞中试验，以复现全尺寸汽车在空气中 $25\,\mathrm{m/s}$ 时的雷诺数。大约需要多大的水流速度？（$\nu_{\mathrm{air}} \approx 15\,\nu_{\mathrm{water}}$。）
- [ ] $125\,\mathrm{m/s}$
- [ ] $5\,\mathrm{m/s}$
- [x] 约 $8\,\mathrm{m/s}$
- [ ] $25\,\mathrm{m/s}$
::: solution
雷诺数相等要求 $U_mL_m/\nu_w = U_pL_p/\nu_a$，所以 $U_m = U_p(L_p/L_m)(\nu_w/\nu_a) = 25\times5/15 = 8.3\,\mathrm{m/s}$。若在空气中试验模型就需要 $125\,\mathrm{m/s}$，快到可压缩性会破坏相似程序的程度；水的运动黏度较小，使试验得以实现。
:::
:::
## 缓慢流动：斯托克斯阻力 {#stokes}

$\mathrm{Re} \ll 1$ 时惯性项可以丢掉，[[#eq-ns]] 化为线性的**斯托克斯方程** $\nabla p = \eta\nabla^2\mathbf v$，$\nabla\cdot\mathbf v = 0$。密度消失了；由量纲分析，尺寸 $a$、速度 $U$ 运动的物体所受的力此时只能正比于 $\eta aU$。

::: theorem 斯托克斯阻力定律 {#thm-stokes}
半径 $a$ 的球以恒定速度 $U$ 在静止的无界黏性流体中运动，在 $\mathrm{Re} = \rho Ua/\eta \to 0$ 的极限下受到的阻力为

$$
F = 6\pi\eta aU .
$$ {#eq-stokes}

其中三分之一（$2\pi\eta aU$）是压力的净力，三分之二（$4\pi\eta aU$）是表面的黏性剪应力。
:::

::: proof
**证明概要。**在球的参考系中，求斯托克斯方程满足 $r = a$ 处无滑移、远处 $\mathbf v \to U\mathbf e_z$ 的解。由线性与对称性，流函数具有 $\psi = \sin^2\theta\,f(r)$ 的形式（斯托克斯轴对称流函数），斯托克斯方程化为关于 $f$ 的四阶欧拉型常微分方程，其幂律解为 $r^4, r^2, r, r^{-1}$。远场条件排除 $r^4$ 并定下 $r^2$ 的系数；无滑移定下另外两个，得

$$
\psi = \tfrac12U\sin^2\theta\Bigl(r^2 - \tfrac32ar + \tfrac12\frac{a^3}{r}\Bigr), \qquad p = p_\infty - \frac{3\eta Ua}{2r^2}\cos\theta .
$$

对压力和黏性剪应力在球面上积分，得 $2\pi\eta aU$ 与 $4\pi\eta aU$。完整计算见朗道（Landau）与栗弗席兹（Lifshitz）《流体力学》（*Fluid Mechanics*）第 20 节，以及阿奇森（Acheson）《初等流体力学》（*Elementary Fluid Dynamics*）第 7 章。
:::

斯托克斯于 1851 年发表了这一结果，论文主题是空气对摆的阻尼。直到 $\mathrm{Re} \approx 1$（基于直径）它都有约 $10\,\%$ 的精度；奥森（Oseen）1910 年的修正把它乘以 $1 + \frac38\mathrm{Re}_a$，其中 $\mathrm{Re}_a = \rho Ua/\eta$。阻力与 $U$ 成线性，不同于大物体的二次阻力 $\frac12C_D\rho U^2A$，而这线性使它成为物理学中使用最广的公式之一。

::: example 下落的小雾滴 {#ex-droplet}
半径 $10.0\,\mu\mathrm m$ 的水滴在静止空气（$\eta = 1.81\times10^{-5}\,\mathrm{Pa\,s}$，$\rho_a = 1.20\,\mathrm{kg/m^3}$）中下落。求收尾速度，并校核斯托克斯定律适用。
::: solution
达到收尾速度时，重力减去浮力与阻力平衡：

$$
\tfrac43\pi a^3(\rho_w - \rho_a)g = 6\pi\eta av_t, \qquad v_t = \frac{2(\rho_w - \rho_a)ga^2}{9\eta} .
$$ {#eq-terminal}

代入数值，

$$
v_t = \frac{2\times998.8\times9.80\times(1.00\times10^{-5})^2}{9\times1.81\times10^{-5}} = 1.20\times10^{-2}\,\mathrm{m/s},
$$

约 $1.2\,\mathrm{cm/s}$。基于直径的雷诺数为 $\rho_av_t\,2a/\eta = 1.20\times0.0120\times2.00\times10^{-5}/1.81\times10^{-5} = 0.016$，所以斯托克斯定律是极好的近似。因为 $v_t \propto a^2$，$1\,\mu\mathrm m$ 的液滴以 $0.12\,\mathrm{mm/s}$ 下落，任何最微弱的气流上升都能使它长期悬在空中：这就是云能漂浮的原因。$100\,\mu\mathrm m$ 的毛毛雨滴由 [[#eq-terminal]] 算出的下落速度为 $1.2\,\mathrm{m/s}$，但那个尺寸下 $\mathrm{Re} \approx 16$，真实速度低些，约 $0.7\,\mathrm{m/s}$。
:::
:::

::: application 密立根的油滴
1909–13 年，密立根（Millikan）通过观察电场中半径约 $1\,\mu\mathrm m$ 的油滴测出了电子电荷。他先让每滴油自由下落并计时，由 [[#eq-terminal]] 求出它的半径；再让它在电场中上升并计时，求出它的电荷。对这么小的液滴，空气的分子平均自由程 $0.07\,\mu\mathrm m$ 与 $a$ 相比不可忽略，密立根必须对斯托克斯定律作坎宁安（Cunningham）滑移修正，约几个百分点。他所用空气黏度值中的一个残余误差，使他给出的电子电荷偏小约 $0.6\,\%$，这一分歧到 1930 年代才得以解决。由 [[#eq-terminal]] 描述的颗粒沉降，以及借助爱因斯坦（Einstein）关系 $D = k_BT/6\pi\eta a$ 与它对应的扩散过程，也是佩兰（Perrin）测定阿伏伽德罗数与超离心机的基础。
:::

## 边界层 {#boundary-layers}

雷诺数很大时，[[#eq-ns-dimensionless]] 中的黏性项带着小因子 $1/\mathrm{Re}$，人们很想干脆把它丢掉、回到欧拉方程。但丢掉最高阶导数会降低方程的阶数，无滑移条件便再无法满足。普朗特（Prandtl）1904 年的洞见在于：黏性在壁面附近的薄层内仍然重要，速度在这一层里从零上升到理想理论给出的数值。在那一层内，垂直于它的导数足够大，使 $\nu\nabla^2\mathbf v$ 与惯性项同量级。

### 有多厚？

先看黏性在时间 $t$ 内把动量传出去多远。让一块平板在静止流体中沿自身方向突然以速度 $U$ 启动（**斯托克斯第一问题**）。流动为 $u(y, t)\,\mathbf e_x$，[[#eq-ns]] 化为扩散方程 $\partial_tu = \nu\,\partial_y^2u$，边界条件 $u(0, t) = U$。它的解是

$$
u(y, t) = U\operatorname{erfc}\Bigl(\frac{y}{2\sqrt{\nu t}}\Bigr),
$$

只通过 $y/\sqrt{\nu t}$ 依赖 $y$。运动起来的一层按 $\sqrt{\nu t}$ 增厚：在水中一秒后是一毫米，在空气中是四毫米。

::: widget plot
f: 1 - erf(x/(2*sqrt(t)))
x: 0, 10
y: 0, 1.05
sliders: t=1:0.1:20:0.1
caption: 在 $t = 0$ 突然启动的平板上方流体的速度 $u/U$，纵轴为高度 $y$（取 $\nu = 1$ 的单位），时间 $t$ 由滑块给出。把 $t$ 从 $1$ 增大到 $4$：剖面形状不变，却拉伸为两倍，因为厚度按 $\sqrt{\nu t}$ 增长。$t = 1$ 时，流体在上方约 $2.3$ 个单位处以板速的十分之一运动；到 $t = 16$，那一点位于 $9.3$，高了四倍。动量的扩散在长距离上很慢：厚十倍的层需要一百倍的时间才能形成。
:::

现在回到沿平板的定常来流 $U$，平板前缘在 $x = 0$。距前缘 $x$ 处的流体质点已在板旁待了约 $x/U$ 的时间，所以黏性把板的影响传开了约 $\sqrt{\nu x/U}$ 的距离。这就是边界层厚度：

$$
\delta(x) \sim \sqrt{\frac{\nu x}{U}}, \qquad \frac{\delta}{x} \sim \frac{1}{\sqrt{\mathrm{Re}_x}}, \qquad \mathrm{Re}_x = \frac{Ux}{\nu} .
$$ {#eq-bl}

项平衡也能得到同一结果：惯性项 $u\,\partial_xu \sim U^2/x$ 对黏性项 $\nu\,\partial_y^2u \sim \nu U/\delta^2$。普朗特的学生布拉休斯（Blasius）1908 年用一个相似变换精确解出了由此得到的边界层方程。速度在

$$
\delta_{99} \approx 4.9\sqrt{\frac{\nu x}{U}}
$$

处达到 $U$ 的 $99\,\%$，壁面剪应力为 $\tau_w = 0.332\,\rho U^2/\sqrt{\mathrm{Re}_x}$。在光滑平板上层流边界层直到 $\mathrm{Re}_x$ 为几十万仍然稳定；超过后它变为湍流，增厚得更快。

::: example 风平板上的边界层 {#ex-plate}
$10.0\,\mathrm{m/s}$ 的空气（$\nu = 1.50\times10^{-5}\,\mathrm{m^2/s}$，$\rho = 1.20\,\mathrm{kg/m^3}$）沿一块长 $0.500\,\mathrm m$ 的光滑平板流动。求后缘处的雷诺数与边界层厚度，以及单侧每米宽度的摩擦阻力。
::: solution
后缘处 $\mathrm{Re}_x = 10.0\times0.500/1.50\times10^{-5} = 3.33\times10^{5}$，层流勉强还维持着。厚度为

$$
\delta_{99} = 4.9\sqrt{\frac{1.50\times10^{-5}\times0.500}{10.0}} = 4.9\times8.66\times10^{-4} = 4.2\,\mathrm{mm},
$$

不及板长的百分之一：$\delta/x = 4.9/\sqrt{\mathrm{Re}_x} = 0.0085$。把布拉休斯的壁面应力 $0.332\rho U^2(\nu/Ux)^{1/2}$ 从 $0$ 积分到 $L$，得单位宽度的阻力 $0.664\,\rho U^2L/\sqrt{\mathrm{Re}_L}$：

$$
D = \frac{0.664\times1.20\times100\times0.500}{\sqrt{3.33\times10^5}} = \frac{39.8}{577} = 0.0690\,\mathrm{N/m}.
$$

这是个很小的力——薄板的摩擦阻力很小。钝体的阻力主要来自分离，而不是摩擦。
:::
:::

::: quiz
[[#ex-plate]] 上方的风速加倍到 $20\,\mathrm{m/s}$。后缘处层流边界层的厚度和摩擦阻力各发生什么变化？
- [ ] 厚度减半，阻力加倍。
- [x] 厚度除以 $\sqrt2$，阻力乘以 $2\sqrt2$。
- [ ] 厚度不变，阻力变为四倍。
- [ ] 厚度加倍，阻力不变。
::: solution
由 [[#eq-bl]]，$\delta \propto U^{-1/2}$，所以厚度降为 $4.2/\sqrt2 = 3.0\,\mathrm{mm}$。单位宽度的阻力 $0.664\,\rho U^2L/\sqrt{\mathrm{Re}_L} \propto U^{3/2}$，所以它乘以 $2^{3/2} = 2.83$。壁面应力大致是 $\eta U/\delta \propto U^{3/2}$：速度差 $U$ 加倍，而它发生的层高变薄。因此层流摩擦比压差的 $U^2$ 增长得慢。（$20\,\mathrm{m/s}$ 时后缘雷诺数为 $6.7\times10^5$，实际上后部的边界层可能已经湍流化。）
:::
:::
### 分离与达朗贝尔佯谬的解决

边界层之外，压强就是理想流动的压强，它原封不动地穿过这薄薄一层（$y$ 方向动量方程给出 $\partial p/\partial y \approx 0$）。在圆柱前部，理想流动的压强沿流动方向下降——**顺压梯度**——边界层保持薄而附着。越过肩部后，压强朝后驻点升高。近壁处那些已因摩擦损失了动量的慢速流体被这个**逆压梯度**减速，直到停下并倒流，正如上文库埃特-泊肃叶图中 $P$ 为负时的情形。边界层随即离开物面——发生**分离**——并把涡量带进宽阔的尾流。尾流中的压强维持在分离点附近的低值，于是物体前部受到的推挤强于后部。这就是压差阻力，也是 $\mathrm{Re} = 10^4$ 的圆柱阻力系数 $C_D \approx 1.2$ 而非零的原因。

流线型化的道理是让后部的压强升高得足够平缓，使边界层保持附着：形状良好的支柱的阻力只有同厚度圆柱的十分之一。边界层中的湍流把快速流体混向壁面，帮助它抵抗分离：这就是圆柱或球在 $\mathrm{Re} \approx 3\times10^5$ 附近出现**阻力危机**——阻力系数骤降三到五倍——的原因，也是高尔夫球表面布满凹坑的原因。阻力的工程问题见机械工程图谱的[边界层与阻力](/learn/mechanical/lesson.php?c=fluid-mechanics&l=boundary-layers-drag)一课。

## 湍流：定性一瞥 {#turbulence}

超过临界雷诺数后，定常层流对小扰动失稳，流动变为**湍流**：在空间与时间上都不规则，包含许多尺度的涡，混合热、质量和动量的能力远超分子黏性。还没有能把湍流从 [[#eq-ns]] 推导出来的一般理论，而三维解的存在性与光滑性正是克雷数学研究所的千禧年问题之一。但有一个统计结果既著名又得到很好的验证。

在充分发展湍流中，能量在流动的大尺度 $L$ 上注入——由搅勺、翻过山丘的风——注入率为单位质量 $\varepsilon$。大涡失稳，碎成小涡，小涡再碎成更小的涡：**能量级串**，由 [[#eq-vorticity]] 中的涡拉伸驱动。直到涡小到自身的雷诺数约为 $1$，黏性才可以忽略。柯尔莫哥洛夫（Kolmogorov）1941 年论证，介于这两个极端之间的尺度上，统计性质只依赖 $\varepsilon$ 与波数 $k$。量纲分析随即定出能量谱（单位质量、单位波数的能量，单位 $\mathrm{m^3/s^2}$）：

$$
E(k) = C\,\varepsilon^{2/3}k^{-5/3},
$$ {#eq-kolmogorov}

实验测得普适常数 $C \approx 1.5$。级串终结于**柯尔莫哥洛夫尺度**

$$
\eta_K = \Bigl(\frac{\nu^3}{\varepsilon}\Bigr)^{1/4},
$$

由 $\nu$ 与 $\varepsilon$ 能构成的唯一长度。比值 $L/\eta_K$ 按 $\mathrm{Re}^{3/4}$ 增长，所以湍流的直接数值模拟大约需要 $\mathrm{Re}^{9/4}$ 个网格点——对一辆汽车约 $10^{16}$ 个——这就是工程计算不去解析湍流而只能为它建模的原因（[[computation]]）。$-5/3$ 律已在潮汐水道、大气和风洞中于几个数量级的波数范围内得到验证。理查德森（Richardson）1922 年就已对级串作过定性描述。

::: example 最小的涡 {#ex-kolmogorov}
大风天的大气低层，湍流耗散率约为 $\varepsilon = 1\times10^{-3}\,\mathrm{W/kg}$。装满水的家用搅拌机中约为 $10\,\mathrm{W/kg}$。求两种情形下的柯尔莫哥洛夫尺度。
::: solution
空气的 $\nu = 1.5\times10^{-5}\,\mathrm{m^2/s}$，故 $\nu^3 = 3.4\times10^{-15}$，

$$
\eta_K = \Bigl(\frac{3.4\times10^{-15}}{1\times10^{-3}}\Bigr)^{1/4} = (3.4\times10^{-12})^{1/4} = 1.4\,\mathrm{mm}.
$$

水的 $\nu = 1.0\times10^{-6}$，$\nu^3 = 10^{-18}$，$\eta_K = (10^{-19})^{1/4} = 1.8\times10^{-5}\,\mathrm m = 18\,\mu\mathrm m$。大气中的涡从几千米一直小到毫米；在搅拌机里，从厘米小到细胞大小——这就是剧烈搅拌会伤害细胞培养物的原因。
:::
:::

::: history 纳维、斯托克斯、雷诺与普朗特
牛顿（Newton, Isaac）在《自然哲学的数学原理》（*Principia*，1687）第二卷中给出了流体摩擦的线性定律。纳维（Navier, Claude-Louis）1822 年从一个分子力模型导出了黏性流动的方程。泊松（Poisson, Siméon Denis）（1829）与圣维南（Saint-Venant, Adhémar Barré de）（1843）给出了另外几种推导；斯托克斯（Stokes, George Gabriel）1845 年给出了本书采用的连续介质推导——假定应力与应变率之间是各向同性的线性关系；1851 年他解出了绕过球体的缓慢流动。哈根（Hagen, Gotthilf）（1839）与泊肃叶（Poiseuille, Jean Léonard Marie）（1840–46）测量了层流管流。雷诺（Reynolds, Osborne）1883 年的染料实验展示了向湍流的转捩与这个无量纲数的作用；1895 年他引入了湍流的平均方法。普朗特（Prandtl, Ludwig）1904 年在海德堡国际数学家大会上作了关于边界层的报告，论文只有八页；他的学生布拉休斯（Blasius, Heinrich）1908 年解出了平板边界层。柯尔莫哥洛夫（Kolmogorov, Andrey）1941 年发表了他的惯性区理论。
:::

## 后续内容 {#leads}

加上热传导的纳维-斯托克斯方程支配对流，加上科里奥利力则支配大气与海洋。声音与水波的黏性阻尼——决定声音能传播多远的衰减——在 [[continuum/waves-in-fluids]] 中同样出自这同一个黏度。分子运动论从分子碰撞导出 $\eta$（[[thermodynamics/kinetic-theory]]、[[statistical-mechanics]]），[[#eq-ns]] 的数值求解是 [[computation]] 的一个重要分支；计算流体力学的工程实践本身是机械工程图谱中一整门课程的主题。

::: summary
- 牛顿流体的黏性应力 $2\eta(e_{ij} - \frac13e_{kk}\delta_{ij}) + \zeta e_{kk}\delta_{ij}$ 与应变率成线性；$\nu = \eta/\rho$ 是动量扩散率，而空气的 $\nu$ 是水的十五倍。
- 代入柯西方程便得纳维-斯托克斯方程 $\partial_t\mathbf v + (\mathbf v\cdot\nabla)\mathbf v = -\nabla p/\rho + \nu\nabla^2\mathbf v + \mathbf g$，壁面处满足无滑移。
- 库埃特流是线性的，泊肃叶流是抛物线的；圆管中 $Q = \pi R^4\Delta p/8\eta L$，仅当 $\mathrm{Re} \lesssim 2000$ 时为层流。
- 雷诺数 $UL/\nu$ 相同的流动彼此相似；力按 $\rho U^2L^2f(\mathrm{Re})$ 缩放。
- $\mathrm{Re} \ll 1$ 时球体的阻力为 $6\pi\eta aU$，下落速度 $v_t = 2\Delta\rho\,ga^2/9\eta$。
- $\mathrm{Re} \gg 1$ 时黏性在厚度 $\delta \approx 4.9\sqrt{\nu x/U}$（布拉休斯）的边界层内起作用；边界层在逆压梯度下的分离产生压差阻力，解决了达朗贝尔佯谬。
- 湍流把能量从大涡带向小涡，柯尔莫哥洛夫谱 $E(k) \propto \varepsilon^{2/3}k^{-5/3}$ 一直延续到 $\eta_K = (\nu^3/\varepsilon)^{1/4}$。
:::

## 习题

::: exercise 轴承中的剪应力 {level=1 check="300"}
一根轴在轴瓦内转动。油膜厚 $1.00\,\mathrm{mm}$，黏度为 $0.300\,\mathrm{Pa\,s}$，轴表面以 $1.00\,\mathrm{m/s}$ 运动。把油膜当作平面库埃特流处理，求轴上的剪应力，单位 Pa。
::: solution
由 [[#eq-couette]] 取 $G = 0$，剖面是线性的，$\tau = \eta U/h = 0.300\times1.00/1.00\times10^{-3} = 300\,\mathrm{Pa}$。在半径 $25\,\mathrm{mm}$、长 $50\,\mathrm{mm}$ 的轴上，摩擦力矩为 $\tau\times2\pi rl\times r = 300\times2\pi\times0.025\times0.050\times0.025 = 0.059\,\mathrm{N\,m}$。
:::
:::

::: exercise 管中的雷诺数 {level=1 check="1e4"}
水（$\nu = 1.00\times10^{-6}\,\mathrm{m^2/s}$）在直径 $2.00\,\mathrm{cm}$ 的管中以平均速度 $0.500\,\mathrm{m/s}$ 流动。求基于直径的雷诺数。流动是层流吗？
::: solution
$\mathrm{Re} = \bar uD/\nu = 0.500\times0.0200/1.00\times10^{-6} = 1.00\times10^{4}$。这远高于 $2000$：家用自来水管中的流动是湍流，[[#eq-poiseuille]] 并不适用。
:::
:::

::: exercise 甘油中的玻璃球 {level=1 check="2*1240*9.8*1e-6/(9*1.41)"}
半径 $1.00\,\mathrm{mm}$、密度 $2500\,\mathrm{kg/m^3}$ 的玻璃球在甘油（$\rho = 1260\,\mathrm{kg/m^3}$，$\eta = 1.41\,\mathrm{Pa\,s}$）中下落。求收尾速度，单位 m/s，并校核雷诺数。
::: solution
由 [[#eq-terminal]]，$v_t = 2\times(2500 - 1260)\times9.80\times(1.00\times10^{-3})^2/(9\times1.41) = 0.02430/12.69 = 1.92\times10^{-3}\,\mathrm{m/s}$，约 $2\,\mathrm{mm/s}$。基于直径的雷诺数为 $1260\times1.92\times10^{-3}\times2.00\times10^{-3}/1.41 = 3.4\times10^{-3}$，斯托克斯定律成立。落球黏度计把这个计算反过来用以测定 $\eta$；容器壁须离球至少十个半径，否则会增加阻力。
:::
:::

::: exercise 狭窄的动脉 {level=2 check="0.8^4"}
某段动脉一部分长度的半径减小了 $20\,\%$。若该段两端的压降固定，通过它的泊肃叶流量乘以多少？要恢复原来的流量，压降必须乘以多少？
::: solution
由 [[#eq-poiseuille]]，$\Delta p$ 固定时 $Q \propto R^4$，所以因子为 $0.8^4 = 0.410$：变窄 $20\,\%$ 使流量减少 $59\,\%$。要恢复原流量，$\Delta p$ 须增大为 $1/0.410 = 2.44$ 倍。血液并非严格牛顿流体，动脉有弹性且流动是脉动的，但强烈的 $R^4$ 依赖仍然存在，这正是身体依靠细小动脉的半径调节血流的原因。
:::
:::

::: exercise 水中的边界层 {level=2 check="4.9*sqrt(1e-6*0.2/1)*1000"}
水（$\nu = 1.00\times10^{-6}\,\mathrm{m^2/s}$）以 $1.00\,\mathrm{m/s}$ 流过一块长 $20.0\,\mathrm{cm}$ 的薄板。求后缘处的厚度 $\delta_{99}$，单位毫米，以及该处的雷诺数。
::: solution
$\mathrm{Re}_x = 1.00\times0.200/10^{-6} = 2.00\times10^{5}$，层流。于是 $\delta_{99} = 4.9\sqrt{10^{-6}\times0.200/1.00} = 4.9\times4.47\times10^{-4} = 2.19\times10^{-3}\,\mathrm m = 2.2\,\mathrm{mm}$。对比 [[#ex-plate]]：尽管板更短、流速更慢，水里的边界层却只有一半厚，因为水的运动黏度小十五倍。
:::
:::

::: exercise 海洋中的柯尔莫哥洛夫尺度 {level=2 check="(1e-18/1e-8)^(1/4)*1000"}
深海中湍流耗散率典型为 $\varepsilon = 1\times10^{-8}\,\mathrm{W/kg}$。取 $\nu = 1.0\times10^{-6}\,\mathrm{m^2/s}$，求柯尔莫哥洛夫尺度，单位毫米。
::: solution
$\eta_K = (\nu^3/\varepsilon)^{1/4} = (10^{-18}/10^{-8})^{1/4} = (10^{-10})^{1/4} = 10^{-2.5}\,\mathrm m = 3.2\,\mathrm{mm}$。海洋学家用能在这一尺度分辨速度切变的探头投放入海测量 $\varepsilon$，再按各向同性湍流的耗散率 $\approx 7.5\,\nu\langle(\partial u/\partial z)^2\rangle$ 算出耗散率。
:::
:::

::: exercise 在水洞中试验模型 {level=2 check="25*5/15"}
一辆长 $4.5\,\mathrm m$ 的汽车在空气（$\nu_a = 1.5\times10^{-5}\,\mathrm{m^2/s}$）中以 $25.0\,\mathrm{m/s}$ 行驶。按 1:5 缩比的模型在水洞（$\nu_w = 1.0\times10^{-6}\,\mathrm{m^2/s}$，$\rho_w = 1000$，$\rho_a = 1.2\,\mathrm{kg/m^3}$）中试验。(a) 求满足动力相似所需的水速，单位 m/s。(b) 若测得模型的阻力为 $F_m$，全尺寸汽车的阻力是多少？
::: solution
(a) 雷诺数相等：$U_m = U_p\,(L_p/L_m)(\nu_w/\nu_a) = 25.0\times5\times(1/15) = 8.33\,\mathrm{m/s}$。

(b) 由 [[#thm-similarity]]，$F/\rho U^2L^2$ 对二者相同，所以

$$
\frac{F_p}{F_m} = \frac{\rho_aU_p^2L_p^2}{\rho_wU_m^2L_m^2} = \frac{1.2}{1000}\times\Bigl(\frac{25.0}{8.33}\Bigr)^2\times25 = 1.2\times10^{-3}\times9.0\times25 = 0.27 .
$$

全尺寸汽车受到的阻力约为水中模型的四分之一。试验必须避免空化和自由表面的影响，这些都在相似论证之外。
:::
:::

::: exercise 两圆柱之间的库埃特流 {level=3}
半径 $R_1$ 的圆柱以角速度 $\Omega$ 转动，与它同轴的固定圆柱半径为 $R_2 > R_1$，两者之间充满流体。(a) 证明 $v_\theta = Ar + B/r$ 满足 [[#eq-ns]] 的周向分量 $\nabla^2v_\theta - v_\theta/r^2 = 0$，并由无滑移定出 $A$ 与 $B$。(b) 剪应力为 $\sigma_{r\theta} = \eta\,r\,\dd(v_\theta/r)/\dd r$。证明穿过间隙中任一圆柱面 $r$ 所传递的单位长度力矩都相同，为 $4\pi\eta\abs B$，并解释为什么必须如此。
::: solution
(a) 对 $v_\theta(r)$，定常流动的周向方程化为 $\frac{\dd}{\dd r}\bigl(\frac1r\frac{\dd}{\dd r}(rv_\theta)\bigr) = 0$，与题述形式等价。对 $v_\theta = Ar$：$rv_\theta = Ar^2$，$\frac1r(rv_\theta)' = 2A$，再求导为 $0$。对 $v_\theta = B/r$：$rv_\theta = B$，导数为 $0$。所以二者及其和都是解。无滑移：$AR_1 + B/R_1 = \Omega R_1$ 且 $AR_2 + B/R_2 = 0$。于是 $B = -AR_2^2$，$A(R_1^2 - R_2^2) = \Omega R_1^2$，得

$$
A = -\frac{\Omega R_1^2}{R_2^2 - R_1^2}, \qquad B = \frac{\Omega R_1^2R_2^2}{R_2^2 - R_1^2} .
$$

(b) $v_\theta/r = A + B/r^2$，故 $\sigma_{r\theta} = \eta r(-2B/r^3) = -2\eta B/r^2$。刚性转动部分 $Ar$ 不携带应力，牛顿流体必须如此。半径 $r$ 内流体所受的单位长度力矩为 $\sigma_{r\theta}\times2\pi r\times r = -4\pi\eta B$，与 $r$ 无关。它必须如此：定常流动中两个半径面之间流体的角动量不变，其内外表面所受力矩必然相消。在已知 $\Omega$ 下测量这一力矩，正是库埃特黏度计测定 $\eta$ 的方法；$\Omega$ 很大时，流动会对 G. I. 泰勒（Taylor）1923 年发现的泰勒涡失稳。
:::
:::

::: exercise 用受力平衡求壁面剪应力 {level=3}
不求解任何微分方程，证明：在半径 $R$ 的直圆管中任何定常充分发展的流动里——无论层流还是湍流——壁面平均剪应力都是 $\tau_w = R\,\Delta p/2L$。再证明层流情形由此给出达西摩擦因子 $f \equiv 8\tau_w/\rho\bar u^2 = 64/\mathrm{Re}$，其中 $\mathrm{Re} = 2R\bar u/\nu$。
::: solution
取长 $L$ 的一段管内流体为控制体。流动充分发展，故流入一端的动量通量等于流出另一端的；流动定常，故内部动量不变。因此流体所受的净轴向力必须为零。压力为 $\Delta p\,\pi R^2$，壁面摩擦 $\tau_w\times2\pi RL$ 方向相反，故 $\tau_w = R\Delta p/2L$。整个论证没有用到速度剖面的任何信息；这就是湍流中压降能度量壁面应力的原因。

层流情形，[[#thm-poiseuille]] 给出 $\bar u = \Delta pR^2/8\eta L$，于是 $\Delta p/L = 8\eta\bar u/R^2$，$\tau_w = 4\eta\bar u/R$。从而

$$
f = \frac{8\tau_w}{\rho\bar u^2} = \frac{32\eta}{\rho\bar uR} = \frac{64\eta}{\rho\bar u\,2R} = \frac{64}{\mathrm{Re}} .
$$

这正是穆迪（Moody）图的层流直线。湍流中 $f$ 随 $\mathrm{Re}$ 下降得慢得多（光滑管中约按 $\mathrm{Re}^{-1/4}$，布拉休斯 1913 年的经验公式），所以 $\mathrm{Re} = 10^5$ 时湍流摩擦约为层流值的十倍。
:::
:::
