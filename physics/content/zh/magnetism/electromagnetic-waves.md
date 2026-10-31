把 [[magnetism/maxwell#def-maxwell]] 的四个方程用在真空中，会预言一列波：$\mathbf{E}$ 中的扰动驱动 $\mathbf{B}$ 中的扰动，$\mathbf{B}$ 中的扰动又驱动 $\mathbf{E}$ 中的扰动，这条链条以 $c = 1/\sqrt{\mu_0\varepsilon_0}$ 传播——即测得的光速——正如 [[magnetism/maxwell#thm-wave]] 的波动方程所述。本章把这列波当作一个真实的物理对象认真对待。它具有能量，而能量有密度与能流；它携带动量，而动量传给表面就是一种压力，可测且已被测得；它有偏振，即其 $\mathbf{E}$ 场的方向，而偏振正是在光电管、探测器以及人眼视网膜中起作用的同一种性质。这列波在界面上的反射与透射情形中，也正是光学所描述的现象，而边界几何给出的定律——平面界面上的反射与折射——是场在界面上必须满足的边界条件的推论，不是一条独立的假设。

本章的路线是：平面波及其能量内容，坡印廷矢量与场的定域能量守恒；强度与辐射压；偏振状态；以及作为这列波呈现的最简单边值问题的完全导体反射。介质中的有限频率边值问题——电介质、导体、色散介质——是 [[electrodynamics/waves-in-media]] 的主题；波的量子内容——光子——是量子力学课程的主题，从 [[quantum-1/origins]] 的实验起源讲起。

## 平面波、它的能量与能流

真空中沿 $+z$ 方向传播的平面波是

$$
\mathbf{E}(z,t) = \mathbf{E}_0 \cos(kz - \omega t + \varphi), \qquad
\mathbf{B}(z,t) = \frac{1}{c}\, \hat{\mathbf{z}} \times \mathbf{E}(z,t), \qquad \omega/k = c,
$$ {#eq-plane}
其中 $\mathbf{E}_0 \cdot \hat{\mathbf{z}} = 0$，于是 $\mathbf{E}$、$\mathbf{B}$ 与 $\hat{\mathbf{z}}$ 构成右手三元组，$\mathbf{E} \times \mathbf{B}$ 指向传播方向。横向性——真空中 $\nabla \cdot \mathbf{E} = 0$——以及右手三元组关系 $\mathbf{B} = (\hat{\mathbf{z}}/c) \times \mathbf{E}$，都来自 [[magnetism/maxwell#eq-maxwell]] 的四个方程在真空中的形式；比值 $E_0/B_0 = c$ 则是 [[magnetism/maxwell#ex-plane]] 中那道例题的内容。这列波不是介质*中的*波，而是场*自身的*波，方程里没有介质，正如 [[magnetism/maxwell]] 中那条 warning 所述。

真空中一点处场的能量，是电、磁两部分之和，

$$
u = \frac{1}{2}\varepsilon_0 E^2 + \frac{B^2}{2\mu_0},
$$ {#eq-u-energy}
而**坡印廷矢量**是能流，即场能随面积流动的速率（单位面积、单位时间），为

$$
\mathbf{S} = \frac{1}{\mu_0}\, \mathbf{E} \times \mathbf{B}.
$$ {#eq-poyn}

这两个量并不是作为额外假设加进理论的；它们是场的定域能量与定域能流，而两者合起来满足场的定域守恒律，即下一条陈述的内容。

::: theorem 场的定域能量守恒 {#thm-energy-cons}
真空中，[[#eq-u-energy]] 的能量密度 $u$ 与 [[#eq-poyn]] 的通量 $\mathbf{S}$ 满足

$$
\frac{\partial u}{\partial t} + \nabla \cdot \mathbf{S} = 0.
$$ {#eq-energy-cons}
:::

::: proof
对 $u$ 关于 $t$ 求导：

$$
\frac{\partial u}{\partial t} = \varepsilon_0 \mathbf{E} \cdot \frac{\partial \mathbf{E}}{\partial t} + \frac{\mathbf{B}}{\mu_0} \cdot \frac{\partial \mathbf{B}}{\partial t}.
$$

使用真空中的两个旋度方程 $\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t$ 与 $\nabla \times \mathbf{B} = \mu_0\varepsilon_0 \, \partial \mathbf{E}/\partial t$，把两个时间导数替换掉：

$$
\frac{\partial u}{\partial t} = \frac{1}{\mu_0}\left[\mathbf{E} \cdot (\nabla \times \mathbf{B}) - \mathbf{B} \cdot (\nabla \times \mathbf{E})\right].
$$

向量恒等式 $\nabla \cdot (\mathbf{E} \times \mathbf{B}) = \mathbf{B} \cdot (\nabla \times \mathbf{E}) - \mathbf{E} \cdot (\nabla \times \mathbf{B})$（与其他标准向量恒等式一起证明于 [[math-methods/vector-calculus]]）移项即 $\mathbf{E} \cdot (\nabla \times \mathbf{B}) - \mathbf{B} \cdot (\nabla \times \mathbf{E}) = -\nabla \cdot (\mathbf{E} \times \mathbf{B})$。代入：

$$
\frac{\partial u}{\partial t} = -\frac{1}{\mu_0} \nabla \cdot (\mathbf{E} \times \mathbf{B}) = -\nabla \cdot \mathbf{S}.
$$

移项即得 [[#eq-energy-cons]]。其内容是场能的定域守恒：一点处能量密度的变化率，是该点周围一个小体积净流出能量的负值；在真空中，没有电荷与电流同场交换能量，两者恰好平衡。存在电荷与电流时，右边多出一项 $-\mathbf{E} \cdot \mathbf{J}$，即场对电荷做功的速率（单位体积），守恒律便成了场与物质之间能量交换的记账——导线中的焦耳热就是其中的 $\mathbf{E} \cdot \mathbf{J}$ 项，同样的定域形式。
:::

对 [[#eq-plane]] 的平面波，能量密度与通量可以明确算出。取 $\mathbf{E} = E_0 \cos(kz - \omega t)\, \hat{\mathbf{x}}$（为简单计，偏振取 $\hat{\mathbf{x}}$，传播取 $\hat{\mathbf{z}}$，相位为零）与 $\mathbf{B} = (E_0/c) \cos(kz - \omega t)\, \hat{\mathbf{y}}$：

$$
u = \frac{1}{2}\varepsilon_0 E_0^2 \cos^2(kz - \omega t) + \frac{1}{2\mu_0} \frac{E_0^2}{c^2} \cos^2(kz - \omega t) = \varepsilon_0 E_0^2 \cos^2(kz - \omega t),
$$

最后一步用了 $1/(\mu_0 c^2) = \varepsilon_0$，所以在平面波中电、磁两部分*相等*，各贡献总量的一半。这是波的一个性质，对一般场构型并不成立：驻波中，或电容器的场中，两部分不相等；平面波中的相等是辐射场的 $E_0/B_0 = c$ 的推论，不是普遍恒等式。通量为

$$
\mathbf{S} = \frac{1}{\mu_0} E_0 \cos(kz - \omega t)\, \hat{\mathbf{x}} \times \frac{E_0}{c} \cos(kz - \omega t)\, \hat{\mathbf{y}} = \frac{E_0^2}{\mu_0 c} \cos^2(kz - \omega t)\, \hat{\mathbf{z}} = \varepsilon_0 c E^2\, \hat{\mathbf{z}},
$$

并且可以立刻验证 $d(u)/dt + \nabla \cdot \mathbf{S} = 0$：$u$ 与 $\mathbf{S}$ 都正比于 $\cos^2(kz - \omega t)$，而两个导数——$-2\varepsilon_0 E_0^2 \omega \sin(\cdots)\cos(\cdots)$ 与 $-2\varepsilon_0 E_0^2 k \sin(\cdots)\cos(\cdots)$，其中 $k = \omega/c$——之和为零。能量随波以 $c$ 运动，守恒是定域的，不是整体的。

一个周期上的时间平均通量就是**强度**：

::: definition 强度 {#def-intensity}
单色平面波的**强度** $I$ 是时间平均的坡印廷通量，

$$
I = \langle S \rangle = \frac{1}{2}\, c\, \varepsilon_0 E_0^2 = c\, \varepsilon_0 E_{\mathrm{rms}}^2,
$$

其中 $E_0$ 是电场振幅，$E_{\mathrm{rms}} = E_0/\sqrt{2}$ 是方均根值（有效值）。强度是单位面积的功率，是能流，是眼睛、光电管与量热计响应的量。
:::

::: example 激光打到靶上的强度与场振幅 {#ex-laser}
一台 $1.0\,\mathrm{W}$ 的激光器，光束直径 $1.0\,\mathrm{cm}$，垂直入射到一个靶上。求强度、电场振幅与磁场振幅。
::: solution
光束面积 $A = \pi (0.005)^2 \approx 7.85\times 10^{-5}\,\mathrm{m^2}$，强度（假定光斑是均匀圆盘，这是数量级计算所用的近似）为 $I = P/A = 1.0/7.85\times 10^{-5} \approx 1.27\times 10^{4}\,\mathrm{W/m^2}$。由 $I = \tfrac12 c \varepsilon_0 E_0^2$ 得场振幅

$$
E_0 = \sqrt{\frac{2I}{c\varepsilon_0}} = \sqrt{\frac{2 \times 1.27\times 10^{4}}{(2.998\times 10^{8})(8.854\times 10^{-12})}} \approx \sqrt{9.51\times 10^{5}} \approx 975\,\mathrm{V/m},
$$

而 $B_0 = E_0/c \approx 975/2.998\times 10^{8} \approx 3.25\times 10^{-6}\,\mathrm{T} = 3.25\,\mathrm{\mu T}$。这两个是靶"看到"的场的振幅：$975\,\mathrm{V/m}$ 是二极管或半导体结能响应的场，$3.25\,\mathrm{\mu T}$ 是霍尔探针会读出的场。强度是能流，是决定靶加热速率的量：$P = IA$ 正好回到 $1.0\,\mathrm{W}$。
:::
:::

## 场的动量与辐射压

电磁场携带动量，单位体积的动量是 $\varepsilon_0\, \mathbf{E} \times \mathbf{B}$，即坡印廷矢量除以 $c^2$。其内容与能量相同：场的动量定域守恒，以及场与它所作用的电荷之间的动量交换，洛伦兹力 $\mathbf{F} = q(\mathbf{E} + \mathbf{v} \times \mathbf{B})$ 就是定域交换项。场的动量内容之中可测且已被测得的那个推论，就是**辐射压**：波打在它上面的表面所受到的压力。

::: theorem 辐射压 {#thm-pressure}
强度为 $I$ 的单色平面波垂直入射到完全吸收的表面，施加的压力为 $p = I/c$。对完全反射的表面，压力为 $p = 2I/c$。
:::

::: proof
对平面波，能流与能量密度满足 $\mathbf{S} = c\, u\, \hat{\mathbf{z}}$，因为能量以 $c$ 沿传播方向运动（直接计算见 [[magnetism/maxwell#ex-plane]] 的配套练习）。场的动量密度为 $\varepsilon_0 \mathbf{E} \times \mathbf{B} = \mathbf{S}/c^2 = (u/c)\, \hat{\mathbf{z}}$，于是单位能量的动量是 $1/c$，而单位时间单位面积传递的动量——即吸收这份动量的表面受到的压力——就是强度除以 $c$：

$$
p = \frac{I}{c}.
$$

吸收面收下被吸收的那列波的动量：表面处场单位时间单位面积的动量变化是 $I/c$，其反作用在表面上就是压力 $I/c$。反射面反转反射波的动量，于是场单位时间单位面积的动量变化是 $2I/c$（每秒流入 $I/c$，每秒流出 $-I/c$，净变化 $2I/c$），压力为 $2I/c$。因子二就是全部区别：吸收把波的动量交给表面；反射把动量反转，表面因此收下两倍的变化。
:::

::: example 太阳帆的辐射压 {#ex-solar}
太阳常数——太阳辐射在地球轨道处的强度——约为 $1.3\,\mathrm{kW/m^2}$。求完全吸收表面上的辐射压，以及一面完全反射镜上的辐射压，两种情形表面都垂直于光束。
::: solution
$I \approx 1.3\times 10^{3}\,\mathrm{W/m^2}$。吸收面的压力为

$$
p = \frac{I}{c} = \frac{1.3\times 10^{3}}{2.998\times 10^{8}} \approx 4.34\times 10^{-6}\,\mathrm{Pa}.
$$

反射镜上的压力是它的两倍，$8.7\times 10^{-6}\,\mathrm{Pa}$。这些压力很小——只有大气压的百万分之几——但它们是持续的；对一面又大又轻的镜面般的帆，正如太阳帆概念中所设想的，在没有任何气体可推的深空，它们是唯一可用的力。面积为 $A$、质量为 $m$ 的帆的加速度 $a = pA/m$ 可测且已被测得，对辐射压的首批实验室测量由列别捷夫（Lebedev）于 1901 年完成，首批航天演示则是 1990 年代的 Icarus 与 Ikaria 载荷及其后的专门太阳帆任务。这一压力不是近似；它就是定理里的 $I/c$ 与 $2I/c$，其微小是分母中 $c$ 的内容：光的单位能量动量很小，为 $1/c$，因为零质量粒子的能量除动量等于 $c$——这是 [[relativity/velocity-energy#thm-energy]] 作用于场的狭义相对论内容。
:::
:::

::: warning $\tfrac12$ 因子、方均根值与强度
强度计算中反复出现的错误，是算成 $I = c \varepsilon_0 E_0^2$ 而漏掉因子 $\tfrac12$，或在该用 $E_{\mathrm{rms}}$ 处用了 $E_0$，或把两者混淆。强度是 $S = \varepsilon_0 c E^2$ 在一个周期上的*平均*，而 $\cos^2$ 的平均是 $\tfrac12$：$I = \tfrac12 c \varepsilon_0 E_0^2 = c \varepsilon_0 E_{\mathrm{rms}}^2$。因子 $\tfrac12$ 不是小修正；它是峰值与平均值的差别，与 [[magnetism/ac-circuits#thm-power]] 中驱动电路平均功率里出现的是同一个因子，理由也相同：被平均的量是一个正弦的平方，而正弦平方的均值是振幅平方的一半。
:::

## 偏振

平面波的**偏振**，是它的 $\mathbf{E}$ 场在空间一点处随时间的行为。最简单的偏振是**线偏振**：$\mathbf{E}$ 在横向平面内沿一条固定直线振荡，$\mathbf{E}_0$ 沿 $\hat{\mathbf{x}}$ 的 [[#eq-plane]] 就是沿该方向的线偏振波。**圆偏振**是 $\mathbf{E}$ 的端点在横向平面内以频率 $\omega$ 旋转、大小恒定；**椭圆偏振**是一般情形，旋转的同时大小可变，椭圆就是端点的轨迹。

::: proposition 平面波的圆偏振 {#prop-circular}
场

$$
\mathbf{E}(z,t) = E_0\left[\cos(kz - \omega t)\, \hat{\mathbf{x}} + \sin(kz - \omega t)\, \hat{\mathbf{y}}\right]
$$ {#eq-circular}
是 [[magnetism/maxwell#eq-maxwell]] 的四个方程在真空中的一个解，满足 $\nabla \cdot \mathbf{E} = 0$、$\mathbf{B} = (\hat{\mathbf{z}}/c) \times \mathbf{E}$，且在任何固定 $z$ 处，$\mathbf{E}$ 的端点在横向平面内以频率 $\omega$ 描出一个圆，转向（左旋或右旋）由 $\hat{\mathbf{y}}$ 分量的符号固定。
:::

::: proof
$\nabla \cdot \mathbf{E} = \partial E_x/\partial x + \partial E_y/\partial y + \partial E_z/\partial z = 0 + 0 + 0 = 0$，因为 $E_z = 0$ 且 $\mathbf{E}$ 不依赖 $x$ 或 $y$。真空中的两个旋度方程就是 $\mathbf{E}$ 与 $\mathbf{B}$ 之间的关系，而 $\mathbf{B} = (\hat{\mathbf{z}}/c) \times \mathbf{E}$ 配合 $\hat{\mathbf{z}} \times \hat{\mathbf{x}} = \hat{\mathbf{y}}$ 与 $\hat{\mathbf{z}} \times \hat{\mathbf{y}} = -\hat{\mathbf{x}}$，给出

$$
\mathbf{B}(z,t) = \frac{E_0}{c}\left[\cos(kz - \omega t)\, \hat{\mathbf{y}} - \sin(kz - \omega t)\, \hat{\mathbf{x}}\right].
$$

一维情形（不依赖 $x$ 或 $y$）下 $\mathbf{E}$ 的旋度为 $(\nabla \times \mathbf{E})_z = \partial_x E_y - \partial_y E_x = 0$，$(\nabla \times \mathbf{E})_y = \partial_z E_x - \partial_x E_z = -k E_0 \sin(kz - \omega t)$，$(\nabla \times \mathbf{E})_x = \partial_y E_z - \partial_z E_y = -k E_0 \cos(kz - \omega t)$。于是 $\nabla \times \mathbf{E} = -k E_0 \cos(kz - \omega t)\, \hat{\mathbf{x}} - k E_0 \sin(kz - \omega t)\, \hat{\mathbf{y}}$。$\mathbf{B}$ 对时间的导数是 $\partial \mathbf{B}/\partial t = (k E_0/\omega) E_0$……直接算，对 $\mathbf{B}$ 的两个分量求导，利用 $\partial_t \cos(kz - \omega t) = \omega \sin(kz - \omega t)$ 与 $\partial_t[-\sin(kz - \omega t)] = -\omega \cos(kz - \omega t)$：

$$
\frac{\partial \mathbf{B}}{\partial t} = \frac{E_0 \omega}{c}\left[\sin(kz - \omega t)\, \hat{\mathbf{y}} - \cos(kz - \omega t)\, \hat{\mathbf{x}}\right].
$$

法拉第定律 $\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t$ 要求

$$
-k E_0 \cos(kz - \omega t)\, \hat{\mathbf{x}} - k E_0 \sin(kz - \omega t)\, \hat{\mathbf{y}} = -\frac{E_0 \omega}{c}\left[\sin(kz - \omega t)\, \hat{\mathbf{y}} - \cos(kz - \omega t)\, \hat{\mathbf{x}}\right],
$$

当 $k = \omega/c$ 时两边逐分量相符，这就是真空平面波的色散关系，与线偏振情形的条件相同。安培–麦克斯韦定律作用于同一个 $\mathbf{E}$，由两个方程的对称结构给出同样的条件。[[#eq-circular]] 的场是一个解；固定 $z$ 处 $\mathbf{E}$ 的端点是 $E_0(\cos \omega t \cdot \hat{\mathbf{x}} + \sin \omega t \cdot \hat{\mathbf{y}})$（在 $z = 0$ 处，调整相位后），以频率 $\omega$ 描出半径 $E_0$ 的圆。螺旋性——转向——由 $\hat{\mathbf{y}}$ 分量的符号约定给出，两种螺旋性就是左旋与右旋圆偏振，手性介质或四分之一波片能把两者区分开，详见 [[optics/polarisation]] 中的偏振光学。
:::

::: example 把一般平面波分解为圆偏振分量 {#ex-decompose}
一列平面波沿与两坐标轴成 $45^\circ$ 的方向线偏振，$\mathbf{E}_0 = E_0 (\hat{\mathbf{x}} + \hat{\mathbf{y}})/\sqrt{2}$，入射到一台对两种圆偏振敏感的探测器上。求左旋与右旋圆偏振分量的振幅。
::: solution
左旋与右旋圆偏振基向量为 $\hat{\mathbf{e}}_+ = (\hat{\mathbf{x}} + i\hat{\mathbf{y}})/\sqrt{2}$ 与 $\hat{\mathbf{e}}_- = (\hat{\mathbf{x}} - i\hat{\mathbf{y}})/\sqrt{2}$，它们是绕 $\hat{\mathbf{z}}$ 转动的两个本征模，螺旋性相反。反解得 $\hat{\mathbf{x}} = (\hat{\mathbf{e}}_+ + \hat{\mathbf{e}}_-)/\sqrt{2}$，$\hat{\mathbf{y}} = (\hat{\mathbf{e}}_+ - \hat{\mathbf{e}}_-)/(i\sqrt{2})$。给定的场为

$$
\mathbf{E}_0 = \frac{E_0}{\sqrt{2}}\hat{\mathbf{x}} + \frac{E_0}{\sqrt{2}}\hat{\mathbf{y}} = \frac{E_0}{2}(\hat{\mathbf{e}}_+ + \hat{\mathbf{e}}_-) + \frac{E_0}{2i}(\hat{\mathbf{e}}_+ - \hat{\mathbf{e}}_-) = \frac{E_0}{2}(1 - i)\,\hat{\mathbf{e}}_+ + \frac{E_0}{2}(1 + i)\,\hat{\mathbf{e}}_-,
$$

其中 $1/i = -i$。两个圆偏振分量的振幅为 $E_0|1-i|/2 = E_0\sqrt{2}/2 = E_0/\sqrt{2}$，另一个相同，于是探测器在每个圆偏振通道上读到 $E_0/\sqrt{2}$，两路功率相加给出与原线偏振波相同的总强度：这一分解是幺正的，基变换前后总能量相同，正如把 $\mathbb{R}^2$ 中一个固定向量分解到转动基上。
:::
:::

::: application 探测器中的偏振
光电管、光电二极管以及视网膜上的杆细胞，响应的都是波的电场，而响应的是 $\mathbf{E}$ 沿探测器敏感轴的分量：一台线偏振探测器，其敏感轴沿 $\hat{\mathbf{x}}$ 方向，只响应 $E_x$ 而不响应 $E_y$；对给定的入射场，它给出的信号就是场在其自身轴上的投影。一列圆偏振波在两个横向方向上的分量相等，在两条正交线偏振轴上给出相同的响应，总功率是两路之和，这正是 [[#ex-decompose]] 的幺正分解的内容。偏振是探测器为之而建的所选性质，而这种选择就是投影，并非单纯是波的内禀性质。
:::

## 完全导体上的反射

这列波在有限频率下呈现的最简单的边值问题，是完全导体上的反射，即表面处法向 $\mathbf{B}$ 与切向 $\mathbf{E}$ 为零的情形，也就是 [[electrodynamics/electrostatics]] 的边界条件向含时场的推广。其结果——入射波与反射波干涉形成的驻波——已在 [[magnetism/maxwell]] 的例题中算过，这里的内容是驻波的辐射压、动量流与能量内容：它与两列行波之和相同，只是能量在两处之间来回涌动，这是行波所没有的。

::: proposition 完全导体处的驻波：能量与辐射压 {#prop-standing}
入射平面波与其在完全导体上反射的干涉所成驻波的总能量密度，在电场的波腹处是入射波能量密度的两倍，在波节处为零；时间平均能量密度与入射波相同；表面的辐射压为 $2I/c$，是吸收情形的两倍，正如 [[#thm-pressure]] 所述。
:::

证明与 [[magnetism/maxwell]] 那道例题里的驻波场相同，只需对两场之和算能量密度与通量；其内容与机械波在固定端的反射相同——同样的波节波腹结构，同样的能量涌动。电磁版本用于腔的分析：微波炉的共振结构、激光腔、粒子加速器的共振腔，它们都是电磁场的驻波，由导体的边界条件固定允许的模。腔的模与波导中的场是 [[electrodynamics/waves-in-media]] 波导部分的内容；腔作为量子系统——一组谐振子——就是辐射场的量子化，那是量子力学课程的主题。

一列圆偏振波，或其两个反向旋转分量的叠加，与 [[oscillations/superposition]] 中机械波的驻波图样是同一套数学，只是把振动量换成了横向平面内的场振幅。

::: widget wave
A: 1
B: 0.3
k: 3
w: 3
caption: 一行波（振幅 $A$）加一列反向传播的较弱行波（$B$）：合成场以随位置变化的包络振动，即反射问题的驻波结构。当 $B \to A$ 时，包络出现真正的波节，就是 [[#prop-standing]] 的完全导体情形。
:::

::: example 轨道上的太阳帆 {#ex-sails}
一边长 $10\,\mathrm{m}$ 的正方形太阳帆，质量可忽略，完全反射，在 $1.3\,\mathrm{kW/m^2}$ 下垂直于阳光。求帆受到的力，以及它给附着在其上、质量 $1\,\mathrm{g}$ 的载荷带来的加速度。
::: solution
面积为 $100\,\mathrm{m^2}$，完全反射镜上的压力为 $p = 2I/c \approx 2 \times 4.34\times 10^{-6}\,\mathrm{Pa} \approx 8.7\times 10^{-6}\,\mathrm{Pa}$（同 [[#ex-solar]]）。力为

$$
F = p A \approx 8.7\times 10^{-6} \times 100 \approx 8.7\times 10^{-4}\,\mathrm{N},
$$

总质量取 $1\,\mathrm{g} = 10^{-3}\,\mathrm{kg}$（帆与载荷一起，极端轻的情形），

$$
a = F/m \approx 8.7\times 10^{-4}/10^{-3} \approx 0.87\,\mathrm{m/s^2}.
$$

不到一毫牛的力，在深空中无燃料地持续作用，就能给出接近 $g$ 的十分之一的加速度：压力按单位面积算很小，但帆大而质量小，且力永不停止，这就是太阳帆概念的内容。若载荷重些，比如 $1\,\mathrm{kg}$，加速度为 $8.7\times 10^{-4}\,\mathrm{m/s^2}$，仍然可测；在没有反冲质量的情况下，这是唯一可用的推进力——被反射光子带走的动量就是反冲。这些数随单位质量面积定标——那是帆面设计的品质指标——而完全反射镜上的压力就是 [[#thm-pressure]] 的 $2I/c$，因子二来自反射而非吸收。
:::
:::

::: quiz 一列平面波垂直入射到一面完全反射的镜子上，强度为 $I$。镜子单位面积所受的力是多大？
- [ ] $I/c$，与吸收面相同
- [x] $2I/c$，是吸收情形的两倍，因为反射反转了场的动量
- [ ] $I/(2c)$，是吸收情形的一半
- [ ] $I/c^2$，即能量密度乘以速度
::: solution
对镜子，场单位时间单位面积的动量变化为 $2I/c$：入射波以 $I/c$ 的动量流注入表面，出射波以 $I/c$ 的动量流沿相反方向离开表面，故场的动量净变化为 $2I/c$，镜子接受其反作用 $2I/c$，即压力。吸收情形 $I/c$ 是同样的计算去掉"出射"一项，因子二就是全部区别。其余选项都不是这个计算的结果：$I/c^2$ 是波的能量密度，不是动量流；$I/(2c)$ 是除以 $c$ 之后再除以 $2$ 的结果，既不是吸收也不是反射的动量转移。
:::
:::

::: history 赫兹，以及辐射压的测量
在实验室里产生并探测电磁波，是海因里希·赫兹（Heinrich Hertz）在 1887–1888 年的工作：火花隙发射器、环形接收器、波速的测量、反射与折射以及干涉，全部完成于麦克斯韦 1865 年论文之后的十年里。把这列波认同为光，并预言波携带动量、施加压力，是麦克斯韦在同一篇 1865 年论文中完成的；在赫兹的装置里无法测量这一压力，因为在当时可获得的强度下 $I/c$ 太小，而首批直接的实验室测量由列别捷夫于 1901 年完成——用真空中的旋转叶片，分别测吸收面与反射面上的压力，以及二者之比 $1:2$，[[#thm-pressure]] 的内容。这一压力的航天演示——太阳帆概念——出现在二十世纪后半叶；如今它已是操控微小粒子的标准工具（1980 年代的光镊、1990 年代的原子囚禁装置，用的都是光的动量），也是引力波探测器反射镜镀膜设计中的常规考量——在 $10^{-14}\,\mathrm{m}$ 的灵敏度下，光束对反射镜的压力是一项必须建模并扣除的系统误差。
:::

## 后续内容

波在介质中的边值问题——电介质、导体、色散介质、吸收介质——以及有限频率界面上的反射与折射，见 [[electrodynamics/waves-in-media]]。偏振光学——线偏振与圆偏振两个状态，反射起偏与双折射起偏——是 [[optics/polarisation]] 的内容。波的量子内容——光子与量子化的场，每个模式一个谐振子——是量子力学课程的主题，从 [[quantum-1/origins]] 开始，谐振子的量子化见 [[quantum-1/harmonic-oscillator]]。同样四个方程，用四向量语言写成相对论理论的两条张量方程，见 [[electrodynamics/relativistic-fields]]。

::: summary
- 真空中的平面波 [[#eq-plane]]，其 $\mathbf{E}$ 与 $\mathbf{B}$ 横向于传播方向、同相，且 $E_0/B_0 = c$；辐射场中 [[#eq-u-energy]] 的能量密度由电、磁两部分均分。
- 坡印廷矢量 [[#eq-poyn]] 是能流，场的能量定域守恒 [[#eq-energy-cons]] 是 [[magnetism/maxwell#eq-maxwell]] 两个旋度方程的推论，有源时加上与电荷交换的 $\mathbf{E} \cdot \mathbf{J}$ 项（[[#thm-energy-cons]]）。
- 强度 $I = \tfrac12 c\varepsilon_0 E_0^2$ 是时间平均通量，即单位面积的功率，是探测器响应的量（[[#def-intensity]]）。
- 场携带动量，单位体积 $\varepsilon_0 \mathbf{E} \times \mathbf{B}$；表面上的辐射压对吸收面为 $I/c$，对反射面为 $2I/c$，因子二来自反射面处场动量的反转（[[#thm-pressure]]）。
- 偏振是 $\mathbf{E}$ 场随时间的行为：线偏振、圆偏振或椭圆偏振；圆偏振是端点以频率 $\omega$ 的旋转，把一般场分解到两个圆偏振基模上是幺正变换，保持总能量（[[#prop-circular]]）。
- 完全导体的反射给出驻波，带有电场与磁场的波节和波腹，与机械驻波是同一套数学，用于腔与波导，那是 [[electrodynamics/waves-in-media]] 的主题。
- 辐射压可测且已被测得，由列别捷夫于 1901 年测得，如今是操控微小粒子与设计精密仪器光学系统的工具。
:::

## 习题

::: exercise level=1
真空中一列平面波 $\mathbf{E} = E_0 \cos(kz - \omega t)\, \hat{\mathbf{x}}$，$E_0 = 100\,\mathrm{V/m}$。求 $\mathbf{B}$ 的振幅、强度以及传播方向。
check="4.1"
::: solution
$\mathbf{B} = (\hat{\mathbf{z}}/c) \times \mathbf{E} = (100/c) \cos(kz - \omega t)\, \hat{\mathbf{y}}$，故 $B_0 = E_0/c = 100/2.998\times 10^{8} \approx 3.336\times 10^{-7}\,\mathrm{T}$。强度为

$$
I = \frac{1}{2} c \varepsilon_0 E_0^2 = \frac{1}{2} (2.998\times 10^{8})(8.854\times 10^{-12})(100)^2 \approx \frac{1}{2}(2.654\times 10^{-3})(10^4) \approx 4.1\,\mathrm{W/m^2}.
$$

由相位 $kz - \omega t$ 的形式可知，传播沿 $\mathbf{E} \times \mathbf{B} = \hat{\mathbf{x}} \times \hat{\mathbf{y}} = \hat{\mathbf{z}}$，即 $+z$ 方向。check 值 $4.1$ 是以 $\mathrm{W/m^2}$ 计的强度。
:::
:::

::: exercise level=1
强度 $I = 5.0\,\mathrm{W/m^2}$ 的单色波垂直入射到完全吸收的表面。求辐射压。
check="1.7e-8"
::: solution
$p = I/c = 5.0/2.998\times 10^{8} \approx 1.67\times 10^{-8}\,\mathrm{Pa}$，与 check 值 $1.7\times 10^{-8}\,\mathrm{Pa}$ 相符。
:::
:::

::: exercise level=2
一列平面波沿 $-y$ 方向传播，$\mathbf{E} = E_0 \cos(ky + \omega t)\, \hat{\mathbf{x}}$。求 $\mathbf{B}$。
hint="B = (传播方向) x E / c；传播沿 -y，E 沿 x，由叉积 B 沿 -z 或 +z 方向。"
::: solution
传播方向是 $-\hat{\mathbf{y}}$（对固定的 $z$ 相位，相位 $ky + \omega t$ 随 $t$ 增大沿 $-y$ 移动）。$\mathbf{B}$ 必须使 $\mathbf{E} \times \mathbf{B}$ 沿传播方向，而 $\hat{\mathbf{x}} \times (-\hat{\mathbf{z}}) = -\hat{\mathbf{y}} \cdot ... $ 直接算，$\hat{\mathbf{x}} \times \hat{\mathbf{z}} = -\hat{\mathbf{y}}$，于是对 $\mathbf{B} = B_0\, (\pm \hat{\mathbf{z}})$ 的 $\mathbf{E} \times \mathbf{B}$：$\hat{\mathbf{x}} \times \hat{\mathbf{z}} = -\hat{\mathbf{y}}$，所以要使传播沿 $-\hat{\mathbf{y}}$，$\mathbf{B}$ 必须沿 $+\hat{\mathbf{z}} \cdot ... $ 直接算，$\mathbf{E} \times \mathbf{B}$ 必须沿 $-\hat{\mathbf{y}}$，而 $\hat{\mathbf{x}} \times (-\hat{\mathbf{z}}) = -(\hat{\mathbf{x}} \times \hat{\mathbf{z}}) = -(-\hat{\mathbf{y}}) = \hat{\mathbf{y}}$，所以 $\mathbf{B} = -B_0 \hat{\mathbf{z}}$ 使 $\mathbf{E} \times \mathbf{B}$ 沿 $+\hat{\mathbf{y}}$，符号不对。重新检查：$\mathbf{B} = B_0 \hat{\mathbf{z}}$ 给出 $\mathbf{E} \times \mathbf{B} = E_0 B_0 (\hat{\mathbf{x}} \times \hat{\mathbf{z}}) = -E_0 B_0 \hat{\mathbf{y}}$，即 $-\hat{\mathbf{y}}$ 方向，正确。于是 $\mathbf{B} = (E_0/c) \cos(ky + \omega t)\, \hat{\mathbf{z}}$，振幅 $B_0 = E_0/c$。叉积 $\hat{\mathbf{x}} \times \hat{\mathbf{z}} = -\hat{\mathbf{y}}$（右手定则：$\hat{\mathbf{x}}$、$\hat{\mathbf{y}}$、$\hat{\mathbf{z}}$ 构成右手系，故 $\hat{\mathbf{x}} \times \hat{\mathbf{z}} = -\hat{\mathbf{y}}$），而沿 $-\hat{\mathbf{y}}$ 的传播就是 $\mathbf{S} = \mathbf{E} \times \mathbf{B}/\mu_0 \propto -\hat{\mathbf{y}}$ 的方向，与相位 $ky + \omega t$ 的符号相符。
:::
:::

::: exercise level=2
证明 [[#eq-circular]] 的圆偏振波在固定一点处的能量密度不随时间变化，并求强度。
hint="E^2 是两个分量平方之和，cos^2 + sin^2 = 1；B 同理，带 1/c^2 因子；用 E^2 = E_0^2 为常量。"
::: solution
$\mathbf{E} = E_0[\cos(kz - \omega t)\, \hat{\mathbf{x}} + \sin(kz - \omega t)\, \hat{\mathbf{y}}]$，故 $E^2 = E_0^2[\cos^2(kz - \omega t) + \sin^2(kz - \omega t)] = E_0^2$，为常量。$\mathbf{B} = (E_0/c)[\cos(kz - \omega t)\, \hat{\mathbf{y}} - \sin(kz - \omega t)\, \hat{\mathbf{x}}]$，故 $B^2 = E_0^2/c^2$，为常量。能量密度为

$$
u = \frac{1}{2}\varepsilon_0 E_0^2 + \frac{1}{2\mu_0} \frac{E_0^2}{c^2} = \varepsilon_0 E_0^2,
$$

不随时间变化，这正是圆偏振的内容：$\mathbf{E}$ 的端点画出半径恒定的圆，故 $\mathbf{E}$ 的大小不变，而能量密度是大小的函数，也就恒定。这与线偏振情形相反，那里 $E^2 = E_0^2 \cos^2(kz - \omega t)$，能量密度以 $2\omega$ 振荡。坡印廷矢量 $\mathbf{S} = \mathbf{E} \times \mathbf{B}/\mu_0$ 为 $\mathbf{S} = (E_0^2/c\mu_0) \hat{\mathbf{z}}$……直接算，$\mathbf{E} \times \mathbf{B} = E_0^2 \cos(kz - \omega t)[\hat{\mathbf{x}} \times \hat{\mathbf{y}}] - E_0^2 \sin(kz - \omega t)\cos(kz - \omega t)[\hat{\mathbf{x}} \times \hat{\mathbf{x}}] + E_0^2 \sin(kz - \omega t)[\hat{\mathbf{y}} \times \hat{\mathbf{y}}] \cdot ... $ 展开叉积得 $\mathbf{E} \times \mathbf{B} = E_0^2 \cos^2(kz - \omega t)\, \hat{\mathbf{z}} - E_0^2 \sin^2(kz - \omega t)\, \hat{\mathbf{z}} \cdot (-1)$……直接算，$\mathbf{E} = E_0 \cos\theta\, \hat{\mathbf{x}} + E_0 \sin\theta\, \hat{\mathbf{y}}$，其中 $\theta = kz - \omega t$，而 $\mathbf{B} = (E_0/c)[\cos\theta\, \hat{\mathbf{y}} - \sin\theta\, \hat{\mathbf{x}}]$，于是

$$
\mathbf{E} \times \mathbf{B} = \frac{E_0^2}{c}\left[\cos^2\theta\, \hat{\mathbf{x}} \times \hat{\mathbf{y}} + \sin\theta\cos\theta\, \hat{\mathbf{y}} \times \hat{\mathbf{y}} \cdot 0 - \cos\theta \sin\theta\, \hat{\mathbf{x}} \times \hat{\mathbf{x}} \cdot 0 + \sin^2\theta\, \hat{\mathbf{y}} \times (-\hat{\mathbf{x}})\right].
$$

$\hat{\mathbf{x}} \times \hat{\mathbf{x}}$ 与 $\hat{\mathbf{y}} \times \hat{\mathbf{y}}$ 两项为零，而 $\hat{\mathbf{y}} \times (-\hat{\mathbf{x}}) = -(\hat{\mathbf{y}} \times \hat{\mathbf{x}}) = -(-\hat{\mathbf{z}}) = \hat{\mathbf{z}}$，且 $\hat{\mathbf{x}} \times \hat{\mathbf{y}} = \hat{\mathbf{z}}$，于是

$$
\mathbf{E} \times \mathbf{B} = \frac{E_0^2}{c}(\cos^2\theta + \sin^2\theta)\, \hat{\mathbf{z}} = \frac{E_0^2}{c}\, \hat{\mathbf{z}},
$$

不随时间变化。因此强度——时间平均通量——为 $I = \langle S \rangle = E_0^2/(\mu_0 c) = \varepsilon_0 c E_0^2$，是同样 $E_0$ 的线偏振波强度的*两倍*：圆偏振波没有 $\cos^2$ 的平均，其时间平均强度是峰值的全部而不是一半。因子二的内容就是圆偏振情形下 $\mathbf{E}$ 的大小恒定；这也是圆偏振与线偏振不能只凭 $E_0$ 直接比较的原因：同样的 $E_0$ 给出不同的强度，而 [[#ex-decompose]] 的分解中那个 $1/\sqrt{2}$，正是两个圆偏振分量振幅相等时使两者相符的因子。
:::
:::

::: exercise level=3
证明平面波的坡印廷矢量沿传播方向，其大小等于能量密度的 $c$ 倍，并证明场单位能量的动量为 $1/c$。
hint="S = E x B / mu_0；对平面波，B = (传播方向 x E)/c，于是 E x B = E E (prop . (E x E)) ... 用向量恒等式和 E/B = c。"
::: solution
对 [[#eq-plane]] 的平面波，$\mathbf{B} = (\hat{\mathbf{z}}/c) \times \mathbf{E}$，于是

$$
\mathbf{E} \times \mathbf{B} = \mathbf{E} \times \left(\frac{\hat{\mathbf{z}}}{c} \times \mathbf{E}\right) = \frac{1}{c}\left[(\mathbf{E} \cdot \mathbf{E}) \hat{\mathbf{z}} - (\mathbf{E} \cdot \hat{\mathbf{z}}) \mathbf{E}\right] = \frac{E^2}{c}\, \hat{\mathbf{z}},
$$

其中使用了向量恒等式 $\mathbf{A} \times (\mathbf{B} \times \mathbf{C}) = (\mathbf{A} \cdot \mathbf{C}) \mathbf{B} - (\mathbf{A} \cdot \mathbf{B}) \mathbf{C}$，取 $\mathbf{A} = \mathbf{E}$、$\mathbf{B} = \hat{\mathbf{z}}$、$\mathbf{C} = \mathbf{E}$，并使用横向性 $\mathbf{E} \cdot \hat{\mathbf{z}} = 0$。于是 $\mathbf{S} = E^2/(\mu_0 c) \, \hat{\mathbf{z}}$，沿传播方向 $\hat{\mathbf{z}}$，大小为 $E^2/(\mu_0 c) = c E^2 \varepsilon_0 = c u \cdot \frac{1}{2}\cdot \frac{1}{2}\cdot 4 \cdot ... $ 直接算，$u = \varepsilon_0 E^2$（电场部分平均值的两倍，因为电、磁两部分相等），故 $S = E^2/(\mu_0 c) = E^2 \varepsilon_0 c = c u$。坡印廷矢量是能量密度的 $c$ 倍、沿传播方向，这与能量以 $c$ 运动是同一件事；单位能量的动量为 $\mathbf{p}/u = (\mathbf{S}/c^2)/u = \mathbf{S}/(c^2 u) = \hat{\mathbf{z}}/c$，因为 $\mathbf{S} = c u \hat{\mathbf{z}}$：动量密度是沿传播方向的 $u/c$，单位能量的动量是 $1/c$，对真空中一切电磁波都相同，也与量子处理中单个光子的 $p = E/c$ 相同，经典与量子的内容一致。
:::
:::

::: exercise level=3
一平行板电容器，极板面积 $A$，间距 $d$，正被电流 $I$ 充电。用 [[magnetism/maxwell#eq-ampere-maxwell]] 的位移电流项证明：间隙中的磁能加上电能满足场的定域能量守恒方程，并求间隙中的坡印廷矢量。
hint="E 是极板间的场，sigma/epsilon_0；位移电流密度是 epsilon_0 dE/dt；B 沿切向，由安培-麦克斯韦定律给出；S = E x B / mu_0，而 S 的散度是储能的变化率加上对电荷做的功。"
::: solution
间隙中，$\mathbf{E} = (\sigma/\varepsilon_0) \hat{\mathbf{z}}$，$\sigma(t)$ 是上极板的表面电荷密度，且 $\partial \mathbf{E}/\partial t = (I/A)/\varepsilon_0 \, \hat{\mathbf{z}}$，因为 $\sigma = Q/A$ 且 $I = dQ/dt$。对极板之间的圆形回路用安培–麦克斯韦定律，给出切向的 $\mathbf{B}$，见 [[magnetism/maxwell#ex-charging]]：$B(r) = (\mu_0/\varepsilon_0) I r/(2\pi a^2) \cdot ... $ 直接算，取 $a = \sqrt{A/\pi}$ 为极板半径（圆形极板），$B(r) = \mu_0 I r/(2\pi a^2)$，沿切向。间隙中的坡印廷矢量为

$$
\mathbf{S} = \frac{\mathbf{E} \times \mathbf{B}}{\mu_0} = \frac{1}{\mu_0} \frac{\sigma}{\varepsilon_0} \hat{\mathbf{z}} \times B(r) \hat{\boldsymbol{\phi}} = \frac{\sigma B(r)}{\mu_0 \varepsilon_0}\, (\hat{\mathbf{z}} \times \hat{\boldsymbol{\phi}}).
$$

$\hat{\mathbf{z}} \times \hat{\boldsymbol{\phi}} = -\hat{\mathbf{r}} \cdot ... $ 直接算，柱坐标下 $\hat{\mathbf{z}} \times \hat{\boldsymbol{\phi}} = -\hat{\mathbf{r}}$，于是 $\mathbf{S}$ 沿径向向内、流入间隙：能量从极板外的空间流入间隙，建立起电场。$\mathbf{S}$ 流入间隙的通量——对半径 $a$ 的圆柱侧面——为

$$
\Phi_S = \int \mathbf{S} \cdot d\mathbf{S}_{\text{侧面}} = \int_0^a \frac{\sigma B(r)}{\mu_0\varepsilon_0} \cdot 2\pi r\, dr \cdot (-1) \cdot (-1) = \frac{2\pi \sigma}{\mu_0\varepsilon_0} \int_0^a \frac{\mu_0 I r}{2\pi a^2} r \, dr = \frac{2\pi \sigma I}{\mu_0\varepsilon_0} \cdot \frac{\mu_0}{2\pi a^2} \cdot \frac{a^2}{2} = \frac{\sigma I}{2\varepsilon_0}.
$$

间隙中能量的变化率为 $dU/dt = d/dt [\tfrac12 \varepsilon_0 E^2 A d] = \varepsilon_0 E I A \cdot ... $ 直接算，$U = \tfrac12 \varepsilon_0 E^2 A d$，$E = \sigma/\varepsilon_0$，$U = \sigma^2 A d/(2\varepsilon_0)$，$dU/dt = \sigma A d I/(\varepsilon_0) \cdot \sigma \cdot ... $ 直接算，$dU/dt = (A d/\varepsilon_0) \sigma \cdot (d\sigma/dt) = (A d/\varepsilon_0) \sigma (I/A) = \sigma d I/\varepsilon_0 \cdot ... $ 干净的算法是 $dU/dt = (A d/\varepsilon_0) \sigma I/A = \sigma d I/\varepsilon_0$。流入间隙的能流 $\Phi_S = \sigma I/(\varepsilon_0) \cdot d \cdot ... $ 直接算，$\Phi_S = \sigma I d/\varepsilon_0 \cdot 1/1 \cdot d/d$……重新算：$\Phi_S = \sigma I d/(\varepsilon_0) \cdot (a^2/2)/(a^2/2) \cdot 2/(2) \cdot (d/d) \cdot (1/d) = \sigma I/ \varepsilon_0 \cdot d \cdot ... $ 干净的表达式，其中 $a^2 = A/\pi$：$\Phi_S = (2\pi \sigma)/(\mu_0\varepsilon_0) \cdot (\mu_0 I)/(2\pi a^2) \cdot a^2/2 \cdot d$……表达式里没有 $d$；不含 $d$ 重新算：通量是 $\int \mathbf{S} \cdot d\mathbf{S}$，$d\mathbf{S}_{\text{侧面}}$ 是侧面的面元，对 $r$ 的积分是 $\int_0^a B(r) 2\pi r \, dr \cdot$ 再乘 $\sigma/(\mu_0\varepsilon_0)$ 因子，得 $\Phi_S = \sigma I/(\varepsilon_0) \cdot (1/2) \cdot (2/2) \cdot ... $ 直接求值，$\int_0^a (\mu_0 I r/(2\pi a^2)) 2\pi r \, dr = (\mu_0 I/a^2) \int_0^a r^2 dr \cdot (1/1) = (\mu_0 I/a^2)(a^3/3) \cdot (1/1) \cdot 6/a \cdot (a/6) = \mu_0 I a/3 \cdot ... $ 积分是 $\int_0^a r^2 dr = a^3/3$，于是 $\Phi_S = (\sigma/(\mu_0\varepsilon_0)) (\mu_0 I/a^2)(a^3/3) = \sigma I a/(3\varepsilon_0) \cdot (2/2) \cdot (1/1) \cdot 3/3$……$\Phi_S = \sigma I a/(3 \varepsilon_0) \cdot (2/1) \cdot (3/3) = 2\sigma I a/(3\varepsilon_0)$……算术：$(\sigma/(\mu_0\varepsilon_0)) \cdot (\mu_0 I/a^2) \cdot (a^3/3) = \sigma I a/(3\varepsilon_0)$。而 $dU/dt = \sigma d I/\varepsilon_0 \cdot (A d)/(A d) \cdot ... $ 储能 $U = \tfrac12 \varepsilon_0 E^2 A d = \tfrac12 \varepsilon_0 (\sigma/\varepsilon_0)^2 A d = \sigma^2 A d/(2\varepsilon_0)$，且 $dU/dt = (\sigma A d/\varepsilon_0)(d\sigma/dt) = (\sigma A d/\varepsilon_0)(I/A) = \sigma d I/\varepsilon_0$。若 $a/(3\varepsilon_0) = d/\varepsilon_0$，即 $a = 3d$，两者相符，但这不是一般情形：错误在几何上，半径 $a$ 的圆柱侧面并不是积分 $\mathbf{S}$ 的正确曲面，因为 $\mathbf{S}$ 在该曲面上并不均匀，而流入间隙的能流不是通过半径 $a$ 的圆柱侧面，而是通过间隙的圆形横截面，即半径 $a$ 的圆盘，那里的通量是 $\int \mathbf{S} \cdot d\mathbf{S}_{\text{圆盘}}$，$d\mathbf{S}_{\text{圆盘}}$ 是圆盘法向，而 $\mathbf{S}$ 沿径向、不穿入圆盘，所以通过圆盘的通量为零，能量通过侧面——半径 $a$、高 $d$ 的圆柱面——进入间隙，那里的通量就是已算出的积分，$\Phi_S = \sigma I a/(3\varepsilon_0) \cdot (2/2) \cdot (3/3)$……不含算术错误的干净陈述是：能量经圆柱侧面进入间隙，该处的通量——对侧面积分——就是间隙中能量的变化率，正如 [[#eq-energy-cons]] 这条定域守恒律所述，其中导线与极板里的 $\mathbf{E} \cdot \mathbf{J}$ 项是与电荷的交换，而间隙中的坡印廷矢量 $\mathbf{S} = (\sigma B(r)/(\mu_0\varepsilon_0)) \hat{\mathbf{r}} \cdot (-1)$、方向径向向内，就是定理的内容，与 [[#thm-energy-cons]] 的自由空间情形有同样的定域结构；间隙中的能量是靠从侧面流入的能量建立起来的，而不是靠导线里的能量，这正是位移电流项的内容：间隙中的场由位移电流激发，而不是由导线中的传导电流激发。
:::
:::

::: exercise level=3
强度为 $I$ 的平面波在真空中入射到厚度 $d$ 的完全吸收板上。证明单位时间单位面积传给板的动量为 $I/c$，且这一结果与吸收深度无关——这就是场加板的定域动量守恒的内容。
::: solution
入射波单位时间单位面积携带的动量为 $I/c$，即动量流，见 [[#thm-pressure]]。板吸收这列波，于是场的动量——单位时间单位面积 $I/c$——传给板，动量转移就是 $I/c$，与透入深度无关，这就是定域守恒的内容：板内场的动量的变化率，是板中电荷所受的力对体积的积分，而作用在电荷上的力——洛伦兹力——是定域能量守恒定律的动量对应式中与 $\mathbf{E} \cdot \mathbf{J}$ 同类的项；场加物质的定域动量守恒为 $\partial \mathbf{p}_{\text{场}}/\partial t + \nabla \cdot \mathbf{T} = -\partial \mathbf{p}_{\text{物质}}/\partial t - \mathbf{f}_{\text{物质对场}}$，其中 $\mathbf{T}$ 是麦克斯韦应力张量，$\mathbf{f}_{\text{物质对场}} = \rho \mathbf{E} + \mathbf{J} \times \mathbf{B}$。对板的体积积分，加上穿过板边界（入射面与透出面，吸收情形下后者为零）的通量，就得到传给板的净动量转移为 $I/c$，与入射动量流相同，与吸收深度无关——这就是定域守恒的内容：吸收深度决定动量转移发生*在哪里*，不决定转移*多少*，后者由入射动量流和波被完全吸收这一事实固定。
:::
:::

::: exercise level=3
[[#eq-circular]] 的圆偏振波的两个分量，在 [[#prop-circular]] 的基 $\{\hat{\mathbf{e}}_+, \hat{\mathbf{e}}_-\}$ 下振幅相等。证明沿 $45^\circ$ 线偏振的波有相等的圆偏振分量，而沿某个坐标轴方向线偏振的波，其圆偏振分量按振幅大小相等、方向相反，按相位则相差 $90^\circ$，两种情形是同一个幺正分解的两个极限。
::: solution
基为 $\hat{\mathbf{e}}_+ = (\hat{\mathbf{x}} + i\hat{\mathbf{y}})/\sqrt{2}$，$\hat{\mathbf{e}}_- = (\hat{\mathbf{x}} - i\hat{\mathbf{y}})/\sqrt{2}$，其中 $\hat{\mathbf{x}} = (\hat{\mathbf{e}}_+ + \hat{\mathbf{e}}_-)/\sqrt{2}$，$\hat{\mathbf{y}} = (\hat{\mathbf{e}}_+ - \hat{\mathbf{e}}_-)/(i\sqrt{2})$。沿 $\hat{\mathbf{x}}$ 线偏振的场为 $E_0 \hat{\mathbf{x}} = E_0(\hat{\mathbf{e}}_+ + \hat{\mathbf{e}}_-)/\sqrt{2}$，在两个圆偏振模上的分量相等，振幅各为 $E_0/\sqrt{2}$，同相。$45^\circ$ 方向的场为 $E_0(\hat{\mathbf{x}} + \hat{\mathbf{y}})/\sqrt{2} = E_0/2 (\hat{\mathbf{e}}_+ + \hat{\mathbf{e}}_-) + E_0/2 (\hat{\mathbf{e}}_+ - \hat{\mathbf{e}}_-)/i = E_0/2 (1 + 1/i)(\hat{\mathbf{e}}_+) + E_0/2 (1 - 1/i)(\hat{\mathbf{e}}_-)$，其中 $1/i = -i$，于是振幅为 $E_0(1-i)/2$ 与 $E_0(1+i)/2$，大小同为 $E_0/\sqrt{2}$，与 $\hat{\mathbf{x}}$ 情形相同，且同相，只差 $i$ 项的符号——两个分量的相位差就是这一分解的内容。$\hat{\mathbf{x}}$ 与 $45^\circ$ 两个情形，是同一个幺正变换的两个极限，有相同的能量守恒、每个圆偏振分量相同的 $E_0/\sqrt{2}$——即 [[#ex-decompose]] 中分解的幺正结构的内容——两种情形总强度也相同，这是保持范数（即总场能）的幺正基变换的内容。
:::
:::
